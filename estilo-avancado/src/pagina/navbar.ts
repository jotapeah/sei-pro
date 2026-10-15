/**
 * Barra superior com duas alturas: mais alta no topo da página e normal depois de rolar. A rolagem do SEI 4/5 é
 * a da área da direita (`#divInfraAreaTelaD`), que começa logo abaixo da barra: quando a barra encolhe, a área
 * cresce. Por isso há histerese (compacta além de 24 px, volta abaixo de 4 px) e a página só compacta se sobra
 * rolagem suficiente, para o encolhimento não tirar a própria rolagem e fazer a barra oscilar.
 * O CSS (casca.css) lê `data-spro-nav-compacta` e mexe nas alturas; a barra de ações fixa acompanha pelo `top`.
 */

export const ATRIBUTO_COMPACTA = "data-spro-nav-compacta";
const ROLADOR = "#divInfraAreaTelaD";
const LIMITE_COMPACTAR = 24;
const LIMITE_EXPANDIR = 4;
/** Altura extra da barra expandida (igual ao `--spro-nav-extra` do CSS) mais uma folga. */
const FOLGA = 14 + 40;

export function iniciarNavbarCompacta(doc: Document): () => void {
  const raiz = doc.documentElement;
  let rolador: Element | null = null;
  let ligado = true;

  const avaliar = () => {
    if (!rolador) return;
    const topo = rolador.scrollTop;
    const sobra = rolador.scrollHeight - rolador.clientHeight;
    const compacta = raiz.hasAttribute(ATRIBUTO_COMPACTA);
    if (!compacta && topo > LIMITE_COMPACTAR && sobra > FOLGA) raiz.setAttribute(ATRIBUTO_COMPACTA, "");
    else if (compacta && topo <= LIMITE_EXPANDIR) raiz.removeAttribute(ATRIBUTO_COMPACTA);
  };

  const ligar = () => {
    if (!ligado) return;
    rolador = doc.querySelector(ROLADOR);
    if (!rolador || !doc.querySelector("#navInfraBarraNavegacao")) return;
    rolador.addEventListener("scroll", avaliar, { passive: true });
  };
  if (doc.readyState === "loading") doc.addEventListener("DOMContentLoaded", ligar, { once: true });
  else ligar();

  return () => {
    ligado = false;
    rolador?.removeEventListener("scroll", avaliar);
    raiz.removeAttribute(ATRIBUTO_COMPACTA);
  };
}
