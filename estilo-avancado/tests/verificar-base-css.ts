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
  const fora = seletores.filter((s) => !s.startsWith(":root[data-spro-tema-ativo]"));
  checar("todo seletor fica sob :root[data-spro-tema-ativo]", fora.length === 0, fora.slice(0, 3));
  checar("sem !important", !/!important/.test(semComentario));
}
