/**
 * Sincronia por Texto Padrão do lado da aba do SEI (o content script tem a
 * sessão): um controle por texto, com o adaptador dos projetos
 * (`sincronia/textoPadrao.ts`) e o motor genérico do sei-comum.
 *
 * - "Toda a unidade" (`[_SEIPRO_PRJ_UNIDADE]`): lido sempre, mesmo sem
 *   consentimento (são os projetos dos colegas); gravado só depois do aviso
 *   único ("Entendi"), que o app pergunta. No recuo de "indisponível" (quem lê
 *   mas não pode alterar) continua lendo. Não há "apagar" para ele: o texto é
 *   de todos.
 * - "Só eu" (`[_SEIPRO_PRJ_<login>]`): desligado por padrão; liga com o
 *   consentimento do diálogo do app; "apagar" exclui o texto e desliga.
 *
 * Puxa ao iniciar (o Controle de Processos), ao ganhar foco (no máximo a cada
 * 2 min) e com pendência; mudança local vai 15 s depois. As duas gravações
 * conferem o conteúdo lido no formulário de alterar (armazém do núcleo).
 *
 * A mescla e a montagem do texto leem a memória do sigilo e lançam se ela
 * estiver ilegível (falha fechada): isso acontece dentro da rodada do motor,
 * que o trata como falha comum (o status do texto fica em "erro" com o motivo,
 * nada é gravado nem mesclado), sem derrubar a aba; nenhum método daqui lança
 * por causa dela.
 *
 * Os dois textos são independentes: um que não inicia (o storage.sync que não
 * lê o consentimento, o armazém que não monta) não impede o outro, e o
 * "Sincronizar agora" devolve o status de cada um (o que falhou, em erro com o
 * motivo). O construtor confere que os repositórios são desta unidade e deste
 * usuário: o consentimento de um texto nunca libera a gravação dos dados de
 * outro escopo.
 */

import type { Area } from "@comum/armazenamento/area";
import { type ArmazemTexto, ControleTextoPadrao } from "@comum/sincronia/controlePagina";
import { type StatusSync, textoDoErro } from "@comum/sincronia/motor";
import { type Travar, type TravarEsperando, travarComLocks, travarEsperando } from "@comum/sincronia/trava";
import { chaveEscopo, escoposDaUnidade } from "../modelo/escopo";
import type { EnvelopeProjetos, Vis } from "../modelo/tipos";
import type { ContextoProjetos } from "../ponte/tipos";
import type { RepositorioProjetos } from "../repositorio";
import { consentimentoProjetos } from "../sincronia/consentimento";
import { adaptadorProjetos } from "../sincronia/textoPadrao";

export const INTERVALO_PUXAR = 2 * 60_000;

export interface DepsSincroniaPagina {
  host: string;
  login: string;
  nomeUsuario: string;
  unidade: { id: string; sigla: string };
  /** chrome.storage.local: os dados, o status e o relatório. */
  area: Area;
  /** chrome.storage.sync: o consentimento. */
  sync: Area;
  repos: Readonly<Record<Vis, RepositorioProjetos>>;
  /** O armazém do núcleo para o texto de cada escopo (criado só na primeira rodada). */
  armazem(vis: Vis): ArmazemTexto;
  travar: Travar;
  /** A mesma trava, esperando a vez: o "apagar" do pessoal nunca é pulado por uma rodada em curso. */
  travarEsperando: TravarEsperando;
  atrasoEnvio?: number;
}

export interface ResultadoSincronizar {
  unidade: StatusSync;
  /** null: o texto pessoal está desligado. */
  eu: StatusSync | null;
}

const VISES: readonly Vis[] = ["unidade", "eu"];

/** O que um texto devolve ao "Sincronizar agora" quando nem chegou a rodar (o motivo vai na mensagem). */
function statusDaFalha(e: unknown): StatusSync {
  const t = textoDoErro(e);
  return { estado: t.estado, mensagem: t.mensagem, quando: Date.now(), pendente: false };
}

/** Roda e devolve o status; o que lança (também de forma síncrona) vira o status de erro. */
async function semLancar<T extends StatusSync | null>(f: () => Promise<T>): Promise<T | StatusSync> {
  try {
    return await f();
  } catch (e) {
    return statusDaFalha(e);
  }
}

export class SincroniaPagina {
  private readonly controles: Record<Vis, ControleTextoPadrao<EnvelopeProjetos>>;

  constructor(private readonly d: DepsSincroniaPagina) {
    const esperado = escoposDaUnidade(d.host, d.login, d.unidade.id);
    for (const vis of VISES)
      if (chaveEscopo(d.repos[vis].escopo) !== chaveEscopo(esperado[vis]))
        throw new Error(`Sincronia da aba: o repositório de "${vis}" não é desta unidade e deste usuário.`);
    const controle = (vis: Vis) =>
      new ControleTextoPadrao<EnvelopeProjetos>({
        area: d.area,
        adaptador: adaptadorProjetos({ repo: d.repos[vis], area: d.area, sigla: d.unidade.sigla, nomeUsuario: d.nomeUsuario }),
        armazem: () => d.armazem(vis),
        consentimento: this.consentimento(vis),
        aoMudarLocal: (cb) => d.repos[vis].aoMudar(cb),
        travar: d.travar,
        travarEsperando: d.travarEsperando,
        atrasoEnvio: d.atrasoEnvio,
        intervaloPuxar: INTERVALO_PUXAR,
        // O texto da unidade é de todos: conferência na gravação; até 3 tentativas por rodada.
        releituras: 3,
        lerSemConsentimento: vis === "unidade",
        lerNoRecuo: vis === "unidade",
      });
    this.controles = { unidade: controle("unidade"), eu: controle("eu") };
  }

  consentimento(vis: Vis) {
    return consentimentoProjetos(this.d.sync, this.d.host, this.d.login, this.d.unidade.id, vis);
  }

  /**
   * `puxar`: ler já (o Controle de Processos); sem ele, só com pendência de uma carga anterior. Nunca rejeita: o
   * texto que não inicia fica parado até a próxima carga (o "Sincronizar agora" ainda roda) e o outro segue.
   */
  async iniciar(o: { puxar: boolean }): Promise<void> {
    await Promise.all(
      VISES.map(async (vis) => {
        try {
          await this.controles[vis].iniciar(o);
        } catch (e) {
          console.warn(`[SEI Pro] projetos: a sincronia do texto "${vis}" não iniciou:`, e);
        }
      }),
    );
  }

  /** A aba ganhou foco: puxa os ligados, respeitando os 2 min (um que falha não segura o outro). */
  async puxar(): Promise<void> {
    await Promise.all(VISES.map((vis) => semLancar(() => this.controles[vis].puxar())));
  }

  /**
   * "Sincronizar agora" (RPC do app): a unidade sempre; o pessoal só se ligado. Nunca rejeita: cada texto devolve
   * o seu status, e o que não rodou (nem o consentimento do pessoal se leu) volta em erro com o motivo.
   */
  async agora(): Promise<ResultadoSincronizar> {
    const unidade = await semLancar(() => this.controles.unidade.agora());
    const eu = await semLancar(async () =>
      (await this.consentimento("eu").estado()) === "ligado" ? await this.controles.eu.agora() : null,
    );
    return { unidade, eu };
  }

  /** "Desligar e apagar do SEI" (RPC do app): só o texto pessoal. O da unidade é de todos. */
  apagarPessoal(): Promise<boolean> {
    return this.controles.eu.apagar();
  }

  parar(): void {
    this.controles.unidade.parar();
    this.controles.eu.parar();
  }
}

export interface DepsLigarSincronia {
  ctx: Pick<ContextoProjetos, "host" | "login" | "nome">;
  unidade: { id: string; sigla: string };
  area: Area;
  sync: Area;
  repos: Readonly<Record<Vis, RepositorioProjetos>>;
  armazem(vis: Vis): ArmazemTexto;
  /** A janela (foco) e o documento (visibilidade) da aba. */
  janela: Pick<EventTarget, "addEventListener">;
  doc: Pick<EventTarget, "addEventListener"> & { readonly visibilityState: DocumentVisibilityState };
  atrasoEnvio?: number;
}

/**
 * P4 (o main.ts do content script, na janela de topo do Controle de Processos): os dois Textos Padrão desta
 * unidade, lidos e gravados por esta aba. Lê ao abrir, puxa ao ganhar foco e ao voltar a ficar visível (no máximo
 * a cada 2 min), grava 15 s depois de mudar; trava por Web Locks quando a página tem (o "apagar" espera a vez).
 * null se não montou (o executor responde `SEM_SINCRONIA`); nada daqui lança nem deixa rejeição solta.
 */
export function ligarSincronia(d: DepsLigarSincronia): SincroniaPagina | null {
  let s: SincroniaPagina;
  try {
    s = new SincroniaPagina({
      host: d.ctx.host,
      login: d.ctx.login,
      nomeUsuario: d.ctx.nome || d.ctx.login,
      unidade: d.unidade,
      area: d.area,
      sync: d.sync,
      repos: d.repos,
      armazem: d.armazem,
      travar: travarComLocks,
      travarEsperando,
      atrasoEnvio: d.atrasoEnvio,
    });
  } catch (e) {
    console.warn("[SEI Pro] projetos: a sincronia não foi ligada:", e);
    return null;
  }
  void s.iniciar({ puxar: true }).catch((e) => console.warn("[SEI Pro] projetos: sincronia", e));
  const puxar = () => void s.puxar().catch(() => undefined);
  d.janela.addEventListener("focus", puxar);
  d.doc.addEventListener("visibilitychange", () => {
    if (d.doc.visibilityState === "visible") puxar();
  });
  return s;
}
