/**
 * Os modos `pagina` (sem aba do SEI) e `lateral` (painel lateral do navegador) são de janela inteira: a página é
 * web-accessible, e um site qualquer a poderia pôr num iframe e induzir cliques (clickjacking) sobre excluir, arquivar
 * e concluir. Dentro de um quadro, recusa. O `embutido` fica de fora: é o iframe legítimo do SEI e só recebe dados pela
 * porta da própria aba.
 */
export const MSG_PAGINA_EM_QUADRO = "Este modo só abre em tela cheia.";

export function recusaDoModo(modo: string, noTopo: boolean): string | null {
  return (modo === "pagina" || modo === "lateral") && !noTopo ? MSG_PAGINA_EM_QUADRO : null;
}
