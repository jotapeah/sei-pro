/** Evento disparado no documento do SEI para abrir a janela de Processos em Lote. */
export const EVENTO_ABRIR = "spro-processos-lote-abrir";
/** Atributo posto no <html> pelo content script, para o resto do SEI Pro saber que ele esta ativo. */
export const ATRIBUTO_ATIVO = "data-seipro-processos-lote";
/** Canal de mensagens entre a pagina do SEI e o iframe da janela. */
export const CANAL_PROCESSOS_LOTE = "seipro-processos-lote";

/** Maximo de processos por execucao (limite do legado). */
export const TETO = 2000;
/** Pausa entre processos, em ms: padrao e limites (porta de PROCLOTE_PAUSA_* do legado). */
export const PAUSA_PADRAO = 500;
export const PAUSA_MINIMA = 200;
export const PAUSA_MAXIMA = 10000;
/** Custo medio de uma criacao de processo, em ms, somado a pausa na estimativa de duracao. */
export const CUSTO_REQUISICAO_MS = 900;
/** O campo Especificacao do SEI aceita no maximo 100 caracteres. */
export const MAX_ESPECIFICACAO = 100;
