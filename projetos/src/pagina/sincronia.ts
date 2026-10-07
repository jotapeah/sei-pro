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
 */

import type { Area } from "@comum/armazenamento/area";
import { type ArmazemTexto, ControleTextoPadrao } from "@comum/sincronia/controlePagina";
import type { StatusSync } from "@comum/sincronia/motor";
import type { Travar, TravarEsperando } from "@comum/sincronia/trava";
import type { EnvelopeProjetos, Vis } from "../modelo/tipos";
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
  travarEsperando?: TravarEsperando;
  atrasoEnvio?: number;
}

export interface ResultadoSincronizar {
  unidade: StatusSync;
  /** null: o texto pessoal está desligado. */
  eu: StatusSync | null;
}

export class SincroniaPagina {
  private readonly controles: Record<Vis, ControleTextoPadrao<EnvelopeProjetos>>;

  constructor(private readonly d: DepsSincroniaPagina) {
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

  /** `puxar`: ler já (o Controle de Processos); sem ele, só com pendência de uma carga anterior. */
  async iniciar(o: { puxar: boolean }): Promise<void> {
    await this.controles.unidade.iniciar(o);
    await this.controles.eu.iniciar(o);
  }

  /** A aba ganhou foco: puxa os ligados, respeitando os 2 min. */
  async puxar(): Promise<void> {
    await Promise.all([this.controles.unidade.puxar(), this.controles.eu.puxar()]);
  }

  /** "Sincronizar agora" (RPC do app): a unidade sempre; o pessoal só se ligado. */
  async agora(): Promise<ResultadoSincronizar> {
    const unidade = await this.controles.unidade.agora();
    const eu = (await this.consentimento("eu").estado()) === "ligado" ? await this.controles.eu.agora() : null;
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
