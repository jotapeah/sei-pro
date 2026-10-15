import { gerarCssIcones, gerarCssMenuPro, nomesDeIcones, svgDoIcone } from "../src/icones/css";
import { engrenagem } from "../src/icones/extras";
import { MAPA_ICONES, MAPA_MENU_PRO } from "../src/icones/mapa";
import { checar, secao } from "./util";

export function verificarIcones(): void {
  secao("icones da casca");
  const nomes = new Set(nomesDeIcones());
  const sem = MAPA_ICONES.filter((e) => !nomes.has(e.icone)).map((e) => `${e.src} -> ${e.icone}`);
  checar("todo icone do mapa existe no conjunto", sem.length === 0, sem);
  const dup = MAPA_ICONES.filter((e, i) => MAPA_ICONES.findIndex((o) => o.src === e.src && !!o.daExtensao === !!e.daExtensao) !== i).map(
    (e) => e.src,
  );
  checar("nenhum src repetido no mapa", dup.length === 0, dup);

  let ruins = 0;
  for (const n of nomes) {
    const svg = svgDoIcone(n);
    const abre = (svg.match(/<(path|circle|rect|line|polyline|ellipse)\b/g) ?? []).length;
    const fecha = (svg.match(/\/>/g) ?? []).length;
    if (!svg.startsWith("<svg ") || !svg.endsWith("</svg>") || abre === 0 || abre !== fecha || /NaN|undefined/.test(svg)) ruins++;
  }
  checar(`${nomes.size} icones geram SVG bem formado, sem NaN`, ruins === 0, ruins);

  const css = gerarCssIcones();
  checar("css gerado so tem ASCII", !/[^\x00-\x7f]/.test(css));
  checar("css gerado sem recurso externo (so data:)", !/url\("(?!data:)/.test(css) && !/@import/.test(css));
  checar("uma regra de mascara por icone mapeado", (css.match(/-webkit-mask-image:/g) ?? []).length === MAPA_ICONES.length);
  checar(
    "todo seletor fica no escopo do seu contexto",
    /#infraMenu img/.test(css) && /#divInfraBarraSistemaPadrao img/.test(css) && /div\.barraBotoesSEI/.test(css) && /table img/.test(css),
  );
  checar("todo seletor fica sob o tema ativo", (css.match(/^:root\[data-spro-tema-ativo\]/gm) ?? []).length >= MAPA_ICONES.length);

  const pro = gerarCssMenuPro();
  checar(
    "itens do SEI Pro: um icone existente por id",
    MAPA_MENU_PRO.every((e) => nomes.has(e.icone)) && (pro.match(/-webkit-mask-image:/g) ?? []).length === MAPA_MENU_PRO.length,
  );
  checar("itens do SEI Pro: so ASCII e sem recurso externo", !/[^\x00-\x7f]/.test(pro) && !/url\("(?!data:)/.test(pro));
  const g = engrenagem(8);
  const d = String((g[0] as [string, Record<string, string>])[1].d);
  checar("engrenagem: 8 dentes (32 vertices) e sem NaN", (d.match(/L/g) ?? []).length === 31 && !/NaN/.test(d), d.slice(0, 60));
  checar(
    "icone desconhecido lanca",
    (() => {
      try {
        svgDoIcone("nao-existe");
        return false;
      } catch {
        return true;
      }
    })(),
  );
}
