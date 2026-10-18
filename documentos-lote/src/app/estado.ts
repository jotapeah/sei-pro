/**
 * O estado do app entre as etapas e o contrato de cada etapa (tela).
 *
 * O app guarda UM `EstadoApp` e passa a mesma referência a cada tela. A tela lê dele ao nascer (Voltar e Avançar
 * recriam a tela e ela mostra o que já foi escolhido, sem pedir de novo à aba) e escreve nele o que o usuário
 * decide. O app não conhece os campos: só pergunta `completa()` para habilitar o Avançar.
 *
 * Regra para as etapas seguintes: um campo só fica no estado quando está pronto para a próxima etapa (o modelo
 * lido, o arquivo válido). Enquanto lê ou depois de um erro, a tela apaga o seu campo, e o Avançar fica desabilitado.
 */

import type { Rpc } from "@comum/ponte/rpc";
import type { TipoProcesso } from "@pl/sei/tipos";
import type { CsvLido } from "../modelo/csv";
import type { ConfigLote } from "../modelo/lote";
import type { Modelo, ModelosDisponiveis } from "../sei/modelo";

export interface EstadoApp {
  /* ---- Etapa 1: Modelo ---- */
  /** O que a aba listou (documentos da árvore, Textos Padrão, tipos): guardado para o Voltar não listar de novo. */
  disponiveis?: ModelosDisponiveis;
  /** Protocolo do processo da tela (o de onde o modelo foi listado). */
  protocolo?: string;
  /** O valor escolhido no seletor do modelo (`doc:NUMERO` ou `tp:ID`), mesmo antes de ler. */
  escolha?: string;
  /** O tipo escolhido para o Texto Padrão (id da lista `disponiveis.tipos`). */
  tipoTextoPadrao?: string;
  /** O modelo lido pela aba: só existe quando pronto (com tipo, no Texto Padrão). */
  modelo?: Modelo;

  /* ---- Etapa 2: Planilha ---- */
  nomeArquivo?: string;
  colunas?: string[];
  registros?: Record<string, string>[];
  codificacao?: CsvLido["codificacao"];
  /** Avisos da leitura do CSV (não bloqueiam). */
  avisosCsv?: string[];

  /* ---- Etapa 3: Cruzamento e destino ---- */
  /** Os tipos de processo da unidade (só pedidos se o destino for novo processo). */
  tiposProcesso?: TipoProcesso[];
  /** O que a tela tem preenchido (sobrevive ao Voltar); recomeça quando o modelo ou as colunas mudam. */
  cruzamento?: RascunhoCruzamento;
  /** O modelo e as colunas a que o `cruzamento` se refere (comparados por referência). */
  baseCruzamento?: { modelo: Modelo; colunas: string[] };
  /** Só existe quando a tela está completa; apagada quando incompleta ou quando o modelo/a planilha mudam. */
  config?: ConfigLote;
}

/** O preenchimento bruto da etapa 3 (a `config` é derivada dele quando completo). */
export interface RascunhoCruzamento {
  /** Campo do modelo → coluna; só os campos com coluna escolhida. */
  cruzados: Record<string, string>;
  colunaNome?: string;
  descricao: string;
  destino: "tela" | "novo-processo" | "coluna";
  idTipo?: string;
  especificacao: string;
  colunaProcesso?: string;
  colunaNivel?: string;
  colunaHipotese?: string;
  /** Texto do campo (pode estar fora da faixa até ser corrigido). */
  pausa: string;
}

/** Id de cada etapa, na ordem do app. As próximas tarefas acrescentam as suas (cruzamento, verificação, prévia...). */
export type IdEtapa = "modelo" | "planilha" | "cruzamento";

/** O que o app entrega a cada tela de etapa. */
export interface DepsEtapa {
  rpc: Pick<Rpc, "chamar">;
  estado: EstadoApp;
  /** A tela mudou algo que conta para `completa()`: o app redesenha o rodapé (Avançar). */
  aoMudar(): void;
}

/** Uma tela de etapa. O app a cria ao entrar na etapa e a destrói ao sair (Avançar, Voltar ou fechar). */
export interface TelaEtapa {
  readonly el: HTMLElement;
  /** Tem o que a etapa seguinte precisa: habilita o Avançar. */
  completa(): boolean;
  /** Texto do botão do rodapé (padrão "Avançar"); o app o relê a cada `aoMudar()`. */
  rotuloAvancar?(): string;
  /** Chamado depois de `el` entrar na página (carregar listas da aba, por exemplo). */
  iniciar?(): Promise<void> | void;
  /** Para o que estiver pendente: resposta que chegar depois não pode mexer no estado. */
  destruir?(): void;
}

export interface DefinicaoEtapa {
  id: IdEtapa;
  /** Nome no indicador de etapas. */
  rotulo: string;
  criar(d: DepsEtapa): TelaEtapa;
}

export const mensagemDe = (e: unknown): string => (e instanceof Error ? e.message : String(e));
