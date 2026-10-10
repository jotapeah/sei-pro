/**
 * CSS mínimo do botão "Demandas" na barra de ações do processo, injetado uma vez por documento (prefixo `spro-dem-` para
 * não colidir com o SEI nem com o legado). A barra do SEI 4.1 é escura (ícones brancos) e a do SEI 5 é clara: a cor sai
 * do fundo real da barra (`corDoIcone`). O balão tem o CSS dele, no Shadow DOM (pagina/balaoDemandas.ts).
 */

const ID = "spro-dem-estilo-sei";

const CSS = `.spro-dem-ic{position:relative;display:inline-block;box-sizing:border-box;width:32px;height:32px;margin:0 2px;padding:0;border:0;border-radius:6px;background:none;color:var(--spro-dem-cor,#1f5fbf);cursor:pointer;vertical-align:middle;line-height:0;text-decoration:none}
.spro-dem-ic:hover,.spro-dem-ic[aria-expanded="true"]{background:rgb(128 128 128 / 22%)}
.spro-dem-ic:focus-visible{outline:2px solid #1a73e8;outline-offset:1px}
.spro-dem-ic svg{display:block;width:22px;height:22px;margin:5px auto}
.spro-dem-ic[data-ativo]::after{content:"";position:absolute;top:3px;right:3px;width:7px;height:7px;border-radius:50%;background:#e8710a;border:1.5px solid #fff}
.spro-dem-ic[data-atraso]::after{background:#d1352b}`;

export function instalarEstiloNaPagina(doc: Document): void {
  if (doc.getElementById(ID)) return;
  const s = doc.createElement("style");
  s.id = ID;
  s.textContent = CSS;
  (doc.head ?? doc.documentElement).append(s);
}

/** "rgb(r, g, b)" ou "rgba(r, g, b, a)" -> [r, g, b, a]; qualquer outra coisa: null. */
function lerRgb(css: string): [number, number, number, number] | null {
  const m = /^rgba?\(\s*(\d+)[,\s]+(\d+)[,\s]+(\d+)(?:[,\s/]+([\d.]+))?\s*\)$/.exec(css.trim());
  if (!m) return null;
  return [Number(m[1]), Number(m[2]), Number(m[3]), m[4] === undefined ? 1 : Number(m[4])];
}

/**
 * Branco sobre fundo escuro, azul sobre fundo claro: o primeiro fundo com cor, da barra para cima. Sem leitura (o
 * navegador de provas não calcula estilo), o azul da barra clara.
 */
export function corDoIcone(barra: Element): string {
  const v = barra.ownerDocument.defaultView;
  for (let e: Element | null = barra; e; e = e.parentElement) {
    const rgb = lerRgb(v?.getComputedStyle?.(e)?.backgroundColor ?? "");
    if (!rgb || rgb[3] < 0.5) continue;
    const luz = (0.299 * rgb[0] + 0.587 * rgb[1] + 0.114 * rgb[2]) / 255;
    return luz < 0.55 ? "#ffffff" : "#1f5fbf";
  }
  return "#1f5fbf";
}
