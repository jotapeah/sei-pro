/**
 * Camada flutuante do app (balão da etapa, popover do filtro): um `<dialog>`
 * NÃO modal posto por `abrirFlutuante`. Sendo um `dialog[open]`, as listas dos
 * seletores e dos menus abertos dentro dela moram nela (`destinoDaCamada`), e
 * escolher uma opção não conta como "clique fora". Esc e clique fora fecham.
 */

import { h } from "@comum/ui/dom";
import { abrirFlutuante } from "@comum/ui/flutuante";

export interface OpcoesCamada {
  classe: string;
  largura?: number;
  rotulo?: string;
  aoFechar?: () => void;
}

export interface Camada {
  el: HTMLDialogElement;
  posicionar(): void;
  fechar(): void;
}

export function abrirCamada(ancora: Element, conteudo: Node, o: OpcoesCamada): Camada {
  const el = h("dialog", { class: `prj-camada ${o.classe}`, open: true, "aria-label": o.rotulo }, conteudo);
  let aberta = true;
  const doc = ancora.ownerDocument;
  const esc = (ev: Event) => {
    if ((ev as KeyboardEvent).key === "Escape") fechar();
  };
  const flut = abrirFlutuante(ancora as HTMLElement, el, {
    largura: o.largura,
    larguraMinima: o.largura,
    alturaMaxima: 640,
    aoFechar: () => fechar(),
  });
  function fechar(): void {
    if (!aberta) return;
    aberta = false;
    doc.removeEventListener("keydown", esc, true);
    flut.fechar();
    o.aoFechar?.();
  }
  doc.addEventListener("keydown", esc, true);
  return { el, posicionar: () => flut.posicionar(), fechar };
}
