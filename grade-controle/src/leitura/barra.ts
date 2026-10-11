/**
 * As ações da barra nativa (Enviar, Atribuir, Concluir, Marcador, Prazo...). A grade NÃO as reimplementa:
 * oferece botões com o ícone e o rótulo do próprio SEI e repassa o clique ao link nativo, que age sobre os
 * checkboxes marcados na tabela nativa.
 */
export interface AcaoNativa {
  /** Valor do parâmetro `acao` do link (estável entre versões). */
  acao: string;
  rotulo: string;
  /** Endereço do SVG já resolvido contra a página. */
  icone: string;
  elemento: HTMLElement;
}

const BARRAS = '#divInfraBarraComandosSuperior a[onclick], #divInfraBarraComandosInferior a[onclick]';

export function acoesDaBarra(doc: Document): AcaoNativa[] {
  const vistos = new Set<string>();
  const saida: AcaoNativa[] = [];
  for (const a of doc.querySelectorAll<HTMLElement>(BARRAS)) {
    const acao = /[?&]acao=([a-z0-9_]+)/.exec(a.getAttribute('onclick') ?? '')?.[1];
    const img = a.querySelector('img');
    if (!acao || !img || vistos.has(acao)) continue;
    vistos.add(acao);
    const rotulo = img.getAttribute('title') || img.getAttribute('alt') || acao;
    let icone = img.getAttribute('src') ?? '';
    try {
      icone = new URL(icone, doc.baseURI || doc.location?.href).href;
    } catch {
      /* mantém o relativo */
    }
    saida.push({ acao, rotulo, icone, elemento: a });
  }
  return saida;
}
