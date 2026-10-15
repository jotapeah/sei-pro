/**
 * Tooltips da casca: o `title` nativo do navegador (caixa cinza do sistema, que se soma ao tooltip do SEI)
 * sai dos botões da casca e vira `data-spro-dica`; uma única caixa, no mesmo visual do tooltip do SEI no
 * tema, mostra o texto. Elementos que já têm o tooltip do SEI (`infraTooltipMostrar`) só perdem o `title`.
 * Autocontido: não depende de nenhuma função da página, e desligar o tema devolve cada `title`.
 */

export const ATRIBUTO_DICA = "data-spro-dica";
export const MARCA_CAIXA = "data-spro-dica-caixa";

/** Onde os botões da casca vivem (barra superior, barras de ações, menu e árvore). */
export const ESCOPOS_DICAS = [
  "#divInfraBarraSistemaPadrao",
  "div.barraBotoesSEI",
  "#divArvoreAcoes",
  "#infraMenu",
  "#divInfraAreaTelaE",
  "#divArvore",
];

const SELETOR_TITULO = ESCOPOS_DICAS.map((e) => `${e} [title]`).join(",");
const ATRASO_MS = 250;

const temTooltipDoSei = (el: Element) => /infraTooltipMostrar/.test(el.getAttribute("onmouseover") ?? "");

/** Troca `title` por `data-spro-dica` nos botões da casca dentro de `raiz`. Devolve quantos converteu. */
export function converterTitulos(raiz: ParentNode): number {
  let n = 0;
  for (const el of raiz.querySelectorAll(SELETOR_TITULO)) {
    const texto = (el.getAttribute("title") ?? "").trim();
    el.removeAttribute("title");
    if (!texto) continue;
    el.setAttribute(ATRIBUTO_DICA, texto);
    // Quem só tem ícone precisa de nome acessível (o title fazia esse papel).
    if (!el.getAttribute("aria-label") && !(el.textContent ?? "").trim()) el.setAttribute("aria-label", texto);
    n++;
  }
  return n;
}

/** Devolve cada `title` e tira o que este módulo acrescentou. */
export function restaurarTitulos(raiz: ParentNode): void {
  for (const el of raiz.querySelectorAll(`[${ATRIBUTO_DICA}]`)) {
    el.setAttribute("title", el.getAttribute(ATRIBUTO_DICA) ?? "");
    el.removeAttribute(ATRIBUTO_DICA);
  }
}

/** Liga os tooltips no documento. Devolve o desligador (restaura os `title` e remove a caixa). */
export function iniciarDicas(doc: Document): () => void {
  const visao = doc.defaultView;
  let caixa: HTMLElement | null = null;
  let timer: ReturnType<typeof setTimeout> | undefined;

  const esconder = () => {
    clearTimeout(timer);
    caixa?.remove();
    caixa = null;
  };

  const mostrar = (alvo: Element) => {
    const texto = alvo.getAttribute(ATRIBUTO_DICA);
    if (!texto || !doc.body) return;
    esconder();
    caixa = doc.createElement("div");
    caixa.setAttribute(MARCA_CAIXA, "");
    caixa.setAttribute("role", "tooltip");
    caixa.textContent = texto;
    doc.body.appendChild(caixa);
    const r = alvo.getBoundingClientRect();
    const c = caixa.getBoundingClientRect();
    const largura = visao?.innerWidth ?? 1200;
    const esquerda = Math.min(Math.max(8, r.left + r.width / 2 - c.width / 2), Math.max(8, largura - c.width - 8));
    const abaixo = r.bottom + 8;
    const cabeEmbaixo = abaixo + c.height < (visao?.innerHeight ?? 800) - 4;
    caixa.style.left = `${Math.round(esquerda)}px`;
    caixa.style.top = `${Math.round(cabeEmbaixo ? abaixo : Math.max(4, r.top - c.height - 8))}px`;
  };

  const aoEntrar = (ev: Event) => {
    const alvo = (ev.target as Element | null)?.closest?.(`[${ATRIBUTO_DICA}]`);
    if (!alvo || temTooltipDoSei(alvo)) return;
    clearTimeout(timer);
    timer = setTimeout(() => mostrar(alvo), ATRASO_MS);
  };
  const aoSair = (ev: Event) => {
    if ((ev.target as Element | null)?.closest?.(`[${ATRIBUTO_DICA}]`)) esconder();
  };

  converterTitulos(doc);
  doc.addEventListener("mouseover", aoEntrar, true);
  doc.addEventListener("mouseout", aoSair, true);
  doc.addEventListener("mousedown", esconder, true);
  doc.addEventListener("scroll", esconder, true);

  // Botões que o SEI e o SEI Pro injetam depois (barra de ações, itens do menu...).
  const Observador =
    (visao as unknown as { MutationObserver?: typeof MutationObserver } | null)?.MutationObserver ?? globalThis.MutationObserver;
  let observador: MutationObserver | null = null;
  if (typeof Observador === "function" && doc.documentElement) {
    observador = new Observador((registros) => {
      let precisa = false;
      for (const r of registros) {
        if (r.type === "childList" && r.addedNodes.length > 0) precisa = true;
        else if (r.type === "attributes" && r.attributeName === "title") precisa = true;
      }
      if (precisa) converterTitulos(doc);
    });
    observador.observe(doc.documentElement, { childList: true, subtree: true, attributes: true, attributeFilter: ["title"] });
  }

  return () => {
    observador?.disconnect();
    doc.removeEventListener("mouseover", aoEntrar, true);
    doc.removeEventListener("mouseout", aoSair, true);
    doc.removeEventListener("mousedown", esconder, true);
    doc.removeEventListener("scroll", esconder, true);
    esconder();
    restaurarTitulos(doc);
  };
}
