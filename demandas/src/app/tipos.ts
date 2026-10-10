/** Tipos do app do Gestor de Demandas: o contexto do SEI e as dependências injetadas (testes e D13). */

import type { DataISO } from "@comum/datas/dias";
import type { AbrirModal } from "@comum/ui/dialogo";
import type { montarGantt } from "@projetos/gantt/montar";
import type { ProcessoDaCaixa, UsuarioDaUnidade } from "@projetos/ponte/tipos";
import type { Vis } from "../modelo/tipos";
import type { PreferenciasDemandas } from "../preferencias";
import type { RepositorioDemandas } from "../repositorio";
import type { EstadoTabela } from "../sincronia/orquestrador";

export interface ContextoDemandas {
  host: string;
  login: string;
  nome: string;
  unidade: { id: string; sigla: string; nome: string } | null;
  versao: string;
  temaEscuro: boolean;
  corTema?: string;
}

export interface EtapaDoProjeto {
  projeto: string;
  etapa: string;
  rotulo: string;
  concluida: boolean;
}

/** A colaboração entre computadores (D12); ausente nos testes da D8 a D11. */
export interface Colaboracao {
  /** O diálogo "Arquivar concluídas antigas…" (faixa de limite e menu de ajustes). */
  arquivarAntigas?(): void;
  readonly [outro: string]: unknown;
}

export interface DepsApp {
  raiz: HTMLElement;
  repos: Readonly<Record<Vis, RepositorioDemandas>>;
  contexto: ContextoDemandas;
  modo: "embutido" | "lateral" | "pagina";
  hoje(): DataISO;
  usuarios(): Promise<UsuarioDaUnidade[]>;
  processosDaCaixa(): Promise<ProcessoDaCaixa[]>;
  /** D15; antes disso: `async () => []`. */
  etapasDoProjetos(): Promise<EtapaDoProjeto[]>;
  tabelas(): Promise<EstadoTabela[]>;
  preferencias: {
    ler(): Promise<PreferenciasDemandas>;
    gravar(p: Partial<PreferenciasDemandas>): Promise<PreferenciasDemandas>;
  };
  abrirModal: AbrirModal;
  confirmar(texto: string, rotuloOk?: string): Promise<boolean>;
  abrirProcesso?(protocolo: string, idProcedimento?: string): void;
  colaboracao?: Colaboracao;
  /** Só as provas trocam (a Frappe de verdade precisa de medidas). */
  montarGantt?: typeof montarGantt;
}

export interface AppMontado {
  atualizar(): Promise<void>;
  destruir(): void;
  aoRedimensionar(): void;
}

/** O que os diálogos e as ações precisam do app. */
export type ContextoDialogo = Pick<
  DepsApp,
  "abrirModal" | "confirmar" | "hoje" | "repos" | "usuarios" | "processosDaCaixa" | "etapasDoProjetos" | "tabelas" | "contexto"
>;
