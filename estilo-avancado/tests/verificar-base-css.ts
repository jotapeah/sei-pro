import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { checar, secao } from "./util";

export function verificarBaseCss(): void {
  secao("folha base");
  const css = readFileSync(join(dirname(fileURLToPath(import.meta.url)), "..", "estatico", "base.css"), "utf8");
  const semComentario = css.replace(/\/\*[\s\S]*?\*\//g, "");
  checar(
    "nenhuma cor literal (#hex, rgb(), hsl())",
    !/#[0-9a-f]{3,8}\b|rgba?\(|hsla?\(/i.test(semComentario.replace(/\[type="[^"]*"\]/g, "")),
  );
  checar("sem recurso externo", !/@import|url\(/i.test(semComentario));
  const seletores = semComentario
    .split("{")
    .slice(0, -1)
    .map((b) => b.split("}").pop() ?? "")
    .join(",")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  const fora = seletores.filter((s) => !s.startsWith(":root[data-spro-tema-ativo]") && !s.startsWith(':root[data-spro-tema="escuro"]'));
  checar(
    "todo seletor fica sob o tema ativo (:root[data-spro-tema-ativo] ou o atributo de esquema, que so existe com ele ligado)",
    fora.length === 0,
    fora.slice(0, 3),
  );
  // !important so nas regras que vencem os esquemas de cor do SEI (que o usam).
  const comImportante = semComentario
    .split("}")
    .filter((bloco) => /!important/.test(bloco))
    .map((bloco) => bloco.split("{")[0]?.trim() ?? "");
  const proibidas = comImportante.filter(
    (sel) =>
      !/\.infraCor|sparkling-modal-title|pesquisaPaginaSelecionada|infraAcaoBarraConjugada|body\.cke_editable|openNewTab|checkNaoAssinados/.test(
        sel,
      ),
  );
  checar("!important so nas classes de tema do SEI (.infraCor*, modal, paginacao)", proibidas.length === 0, proibidas.slice(0, 3));
}
