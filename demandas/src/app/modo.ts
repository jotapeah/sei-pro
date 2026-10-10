/**
 * O modo `pagina` (sem aba do SEI) e para a janela inteira: a pagina e web-accessible, e um site qualquer a poderia
 * pôr num iframe e induzir cliques (clickjacking) sobre excluir, arquivar e concluir. Dentro de um quadro, recusa.
 */
export const MSG_PAGINA_EM_QUADRO = "O modo página só abre em tela cheia.";

export function recusaDoModo(modo: string, noTopo: boolean): string | null {
  return modo === "pagina" && !noTopo ? MSG_PAGINA_EM_QUADRO : null;
}
