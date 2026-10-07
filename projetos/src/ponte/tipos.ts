/**
 * O que atravessa a ponte entre a aba do SEI (content script) e o app do
 * painel (página da extensão). Sem DOM e sem `@nucleo`: o app importa daqui
 * sem puxar o núcleo do SEI para o pacote dele.
 */

/** Nome da porta `chrome.runtime.connect` do painel embutido. */
export const CANAL_PROJETOS = "seipro-projetos";

export interface ContextoProjetos {
  host: string;
  /** Em minúsculas. */
  login: string;
  /** Nome do usuário lido do SEI (vai para o histórico de alterações). */
  nome: string;
  unidade: { id: string; sigla: string; nome: string } | null;
  versao: string;
  /** Modo noturno do SEI Pro (o painel embutido segue o SEI). */
  temaEscuro: boolean;
  /** Cor da barra do SEI (destaque do painel). */
  corTema?: string;
  /** Há servidor do Atividades configurado (o legado convive; a importação é do P4). */
  atividades: boolean;
}

/** Processo da caixa já carregada (combo do diálogo; nenhuma requisição). */
export interface ProcessoDaCaixa {
  protocolo: string;
  idProcedimento: string;
  tipo?: string;
  /** Vazio para processo sigiloso (regra do núcleo). */
  especificacao?: string;
  sigiloso: boolean;
}

/** Responsável sugerido (usuários da unidade). */
export interface UsuarioDaUnidade {
  login?: string;
  nome: string;
}

/** Conferência de um número SEI pela pesquisa rápida (sem abrir a árvore). */
export interface DocumentoConferido {
  numero: string;
  /** Protocolo do processo onde o documento está. */
  protocolo?: string;
}

/** Pílula de alerta do título do painel. */
export type TipoAlerta = "atrasadas" | "semana";
