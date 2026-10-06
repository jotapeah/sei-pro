/**
 * Motor genérico da sincronia de UM Texto Padrão (um escopo de um módulo):
 * puxar → validar → mesclar → (se mudou) reler → gravar. O módulo entra por um
 * adaptador (envelope, mesclagem, assinatura, teto, mensagens). A mesclagem é
 * a do módulo (vence a versão mais recente de cada entidade, com lápides), então
 * a rodada pode se repetir sem medo, em qualquer aba e em qualquer ordem.
 *
 * - Puxa no máximo a cada `intervaloPuxar` (5 min), salvo pendência local ou pedido do usuário.
 * - Mudança local marca "pendente" NA HORA (persistido: se a página fechar, a
 *   próxima carga envia) e envia `atrasoEnvio` (15 s) depois da última.
 * - Texto inválido (editado à mão, corrompido, de outro escopo) nunca apaga
 *   nada: é regravado a partir do local. De versão mais nova: não é tocado.
 * - Acima do teto não grava (e explica); acima do aviso grava e avisa.
 * - Sem permissão de Texto Padrão: "indisponível", e não insiste por um dia.
 * - Releitura: logo antes de gravar, lê de novo. Se outra pessoa (o texto da
 *   unidade é de todos) ou outro computador gravou no meio, mescla de novo e
 *   recalcula, até `releituras` vezes (3). Esgotado, não grava e fica
 *   pendente: a próxima rodada tenta de novo, e ninguém perde o que gravou.
 *   `releituras: 0` desliga (os Favoritos: um texto por pessoa).
 * - Uma trava por texto (Web Locks, quando a página tem) evita duas abas
 *   juntas; e o conteúdo igual ao remoto não é regravado.
 */

import type { Area } from "../armazenamento/area";
import { gerarConteudoTexto, lerConteudoTexto, type ValidacaoTexto } from "./textoPadraoCodec";
import type { Travar } from "./trava";

export interface StatusSync {
  estado: "ok" | "erro" | "indisponivel" | "nunca";
  /** Última tentativa. */
  quando: number;
  ultimoOk?: number;
  ultimoPuxar?: number;
  mensagem?: string;
  /** Bytes do último conteúdo gravado ou lido. */
  tamanho?: number;
  /** Há mudança local ainda não enviada. */
  pendente: boolean;
  indisponivelAte?: number;
}

export interface DestinoTexto {
  ler(): Promise<string | null>;
  gravar(html: string): Promise<void>;
}

export interface MensagensMotor {
  maisNovo: string;
  grandeDemais(kb: number, tetoKb: number): string;
  pertoDoTeto(kb: number): string;
  invalidoRegravado(motivo: string): string;
  mudouDuranteGravacao: string;
}

export const MENSAGENS_MOTOR: MensagensMotor = {
  maisNovo:
    "Os dados no SEI foram gravados por uma versão mais nova do SEI Pro. Atualize a extensão neste computador; o texto não foi alterado.",
  grandeDemais: (kb, tetoKb) => `Os dados ficaram grandes demais para o Texto Padrão (${kb} KB de ${tetoKb} KB).`,
  pertoDoTeto: (kb) => `Os dados estão perto do limite do Texto Padrão (${kb} KB).`,
  invalidoRegravado: (motivo) => `O texto no SEI estava inválido (${motivo}) e foi regravado a partir deste computador.`,
  mudouDuranteGravacao: "O texto no SEI mudou enquanto era gravado (outra pessoa sincronizando). Nova tentativa na próxima rodada.",
};

/** O que o módulo ensina ao motor. Um adaptador por texto (escopo). */
export interface AdaptadorTexto<E> {
  /** Nome do módulo: a trava é `seipro-<modulo>-sync|<chaveStatus>`. */
  modulo: string;
  /** Onde o StatusSync deste texto fica na área local. */
  chaveStatus: string;
  /** Tamanho máximo do conteúdo (bytes do HTML): acima, não grava. */
  teto: number;
  /** Acima disto grava, mas avisa. */
  aviso: number;
  /** O parágrafo legível que abre o texto. */
  legivel(): string;
  /** O JSON lido do texto: envelope bom, inválido (motivo) ou de versão mais nova. */
  validar(bruto: unknown): ValidacaoTexto<E>;
  /** Mescla no armazenamento local (vence o mais recente; lápides valem). */
  importar(envelope: E): Promise<void>;
  /** O envelope a gravar. `remoto`: o que o texto tem agora (null se não há ou é inválido); `agora`: para podar lápides. */
  exportar(c: { remoto: E | null; agora: number }): Promise<E>;
  /** Igual para o mesmo conteúdo em qualquer computador (sem quem gravou nem quando). */
  assinatura(envelope: E): string;
  mensagens?: Partial<MensagensMotor>;
}

export interface DepsMotorTexto<E> {
  adaptador: AdaptadorTexto<E>;
  destino: DestinoTexto;
  /** Área local (o StatusSync). */
  area: Area;
  /** Roda `fn` com a trava; devolve null se outra aba já está com ela. */
  travar: Travar;
  agora?: () => number;
  /** Envio depois da última mudança local (15 s). */
  atrasoEnvio?: number;
  /** Intervalo mínimo entre duas puxadas sem pendência (5 min). */
  intervaloPuxar?: number;
  /** Releituras antes de gravar (3); 0 desliga. */
  releituras?: number;
  /** Ainda pode gravar? (O usuário pode ter desligado durante a rodada.) */
  permitido?: () => Promise<boolean>;
}

const CINCO_MIN = 5 * 60_000;
const UM_DIA = 86_400_000;

export const nomeDaTrava = (modulo: string, chaveStatus: string): string => `seipro-${modulo}-sync|${chaveStatus}`;

export function textoDoErro(e: unknown): { estado: StatusSync["estado"]; mensagem: string } {
  const codigo = (e as { codigo?: string } | null)?.codigo;
  if (codigo === "SEI_SESSAO_EXPIRADA") return { estado: "erro", mensagem: "Sessão do SEI expirada. Entre de novo no SEI." };
  if (codigo === "SEI_ACAO_INDISPONIVEL")
    return { estado: "indisponivel", mensagem: "Indisponível nesta unidade: o SEI não oferece Textos Padrão para você aqui." };
  return { estado: "erro", mensagem: e instanceof Error ? e.message : String(e) };
}

export class MotorTextoPadrao<E> {
  private espera: ReturnType<typeof setTimeout> | undefined;

  constructor(private readonly d: DepsMotorTexto<E>) {}

  private agora(): number {
    return this.d.agora?.() ?? Date.now();
  }

  async status(): Promise<StatusSync> {
    const k = this.d.adaptador.chaveStatus;
    const v = (await this.d.area.obter(k))[k] as StatusSync | undefined;
    return v ?? { estado: "nunca", quando: 0, pendente: false };
  }

  private async gravarStatus(m: Partial<StatusSync>): Promise<StatusSync> {
    const novo = { ...(await this.status()), ...m };
    await this.d.area.gravar({ [this.d.adaptador.chaveStatus]: novo });
    return novo;
  }

  async marcarPendente(): Promise<void> {
    const s = await this.status();
    if (!s.pendente) await this.gravarStatus({ pendente: true });
  }

  /** Mudança local: pendente na hora, envio `atrasoEnvio` depois da última. */
  agendarEnvio(): Promise<void> {
    clearTimeout(this.espera);
    this.espera = setTimeout(() => void this.sincronizar({ forcar: true }).catch(() => undefined), this.d.atrasoEnvio ?? 15_000);
    return this.marcarPendente();
  }

  parar(): void {
    clearTimeout(this.espera);
  }

  async sincronizar(o: { forcar?: boolean } = {}): Promise<StatusSync> {
    const agora = this.agora();
    const s = await this.status();
    if (!o.forcar) {
      if (s.estado === "indisponivel" && (s.indisponivelAte ?? 0) > agora) return s;
      if (!s.pendente && s.ultimoPuxar && agora - s.ultimoPuxar < (this.d.intervaloPuxar ?? CINCO_MIN)) return s;
    }
    const a = this.d.adaptador;
    const feito = await this.d.travar(nomeDaTrava(a.modulo, a.chaveStatus), () => this.rodada(agora));
    return feito ?? (await this.status());
  }

  private async validar(html: string): Promise<ValidacaoTexto<E>> {
    const r = await lerConteudoTexto(html);
    return "invalido" in r ? r : this.d.adaptador.validar(r.bruto);
  }

  private async rodada(agora: number): Promise<StatusSync> {
    const a = this.d.adaptador;
    const m = { ...MENSAGENS_MOTOR, ...a.mensagens };
    const releituras = this.d.releituras ?? 3;
    try {
      let remoto = await this.d.destino.ler();
      for (let tentativa = 0; ; tentativa++) {
        let lido: E | null = null;
        let invalido: string | null = null;
        if (remoto !== null) {
          const r = await this.validar(remoto);
          if ("maisNovo" in r) return this.gravarStatus({ estado: "erro", quando: agora, ultimoPuxar: agora, mensagem: m.maisNovo });
          if ("ok" in r) {
            await a.importar(r.ok);
            lido = r.ok;
          } else {
            invalido = r.invalido;
          }
        }
        const env = await a.exportar({ remoto: lido, agora });
        if (remoto !== null && lido !== null && a.assinatura(env) === a.assinatura(lido)) {
          return this.gravarStatus({
            estado: "ok",
            quando: agora,
            ultimoOk: agora,
            ultimoPuxar: agora,
            pendente: false,
            mensagem: undefined,
            tamanho: remoto.length,
          });
        }
        const html = await gerarConteudoTexto(a.legivel(), env);
        const kb = Math.ceil(html.length / 1024);
        if (html.length > a.teto) {
          return this.gravarStatus({
            estado: "erro",
            quando: agora,
            ultimoPuxar: agora,
            tamanho: html.length,
            mensagem: m.grandeDemais(kb, Math.round(a.teto / 1024)),
          });
        }
        if (releituras > 0) {
          const deNovo = await this.d.destino.ler();
          if (deNovo !== remoto) {
            if (tentativa + 1 >= releituras) {
              return this.gravarStatus({
                estado: "erro",
                quando: agora,
                ultimoPuxar: agora,
                pendente: true,
                mensagem: m.mudouDuranteGravacao,
              });
            }
            remoto = deNovo;
            continue;
          }
        }
        if (this.d.permitido && !(await this.d.permitido())) {
          return this.gravarStatus({ estado: "nunca", quando: agora, pendente: false, mensagem: undefined });
        }
        await this.d.destino.gravar(html);
        return this.gravarStatus({
          estado: "ok",
          quando: agora,
          ultimoOk: agora,
          ultimoPuxar: agora,
          pendente: false,
          tamanho: html.length,
          mensagem: invalido ? m.invalidoRegravado(invalido) : html.length > a.aviso ? m.pertoDoTeto(kb) : undefined,
        });
      }
    } catch (e) {
      const t = textoDoErro(e);
      return this.gravarStatus({
        estado: t.estado,
        mensagem: t.mensagem,
        quando: agora,
        indisponivelAte: t.estado === "indisponivel" ? agora + UM_DIA : undefined,
      });
    }
  }
}
