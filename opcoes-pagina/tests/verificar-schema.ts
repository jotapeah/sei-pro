import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { parseHTML } from "linkedom";
import { OPCOES_COMPLEMENTOS, SECOES_GERAL, todasAsOpcoes } from "../src/schema";
import { checar, secao } from "./util";

const FIXTURE = join(dirname(fileURLToPath(import.meta.url)), "fixtures", "options-legado.html");
const norm = (s: string) => s.replace(/\s+/g, " ").trim();
const nomeDe = (el: Element) => el.getAttribute("data-name") ?? "";

export function verificarSchema(): void {
  secao("schema: paridade com a pagina de opcoes legada");
  const { document: doc } = parseHTML(readFileSync(FIXTURE, "latin1")) as unknown as { document: Document };
  const legados = [...doc.querySelectorAll<HTMLElement>('[id^="itemConfigGeral_"]')];
  const schema = new Map(todasAsOpcoes().map((o) => [o.nome, o]));

  checar("73 opcoes no legado e no schema", legados.length === 73 && schema.size === 73 && todasAsOpcoes().length === 73, {
    legado: legados.length,
    schema: schema.size,
  });

  for (const el of legados) {
    const nome = nomeDe(el);
    const o = schema.get(nome);
    if (!o) {
      checar(`${nome}: existe no schema`, false);
      continue;
    }
    const linha = el.closest("tr") as Element;
    const tipoAttr = el.getAttribute("type");
    const tipo = el.tagName === "SELECT" ? "selecao" : tipoAttr === "checkbox" ? "chave" : tipoAttr === "number" ? "numero" : "texto";
    const padrao =
      tipo === "chave"
        ? el.hasAttribute("checked")
        : tipo === "numero"
          ? Number(el.getAttribute("value"))
          : tipo === "texto"
            ? (el.getAttribute("value") ?? "")
            : (el.querySelector("option")?.getAttribute("value") ?? "");
    const icone = (linha.querySelector("i.iconPopup")?.className ?? "")
      .split(/\s+/)
      .filter((c) => c && c !== "iconPopup" && !/Color$/.test(c))
      .join(" ");
    const href = linha.querySelector("a[href]")?.getAttribute("href") ?? undefined;
    const manual = href ? (/\/pages\/([A-Z0-9]+)\.html$/.exec(href)?.[1] ?? href) : undefined;

    checar(`${nome}: id`, el.getAttribute("id") === `itemConfigGeral_${nome}`);
    checar(`${nome}: tipo`, o.tipo === tipo, { schema: o.tipo, legado: tipo });
    checar(`${nome}: padrao`, o.padrao === padrao, { schema: o.padrao, legado: padrao });
    checar(`${nome}: rotulo`, o.rotulo === norm(linha.querySelector(".info")?.textContent ?? ""), o.rotulo);
    checar(`${nome}: icone`, o.icone === icone, { schema: o.icone, legado: icone });
    checar(`${nome}: manual`, o.manual === manual, { schema: o.manual, legado: manual });
    checar(
      `${nome}: visibilidade por produto`,
      (o.visivelEm === "lab") === linha.classList.contains("lab") && (o.visivelEm === "fora-antaq") === linha.classList.contains("notatq"),
    );
    if (tipo === "selecao") checar(`${nome}: escolhas`, (o.escolhas?.length ?? -1) === el.querySelectorAll("option").length);
    if (tipo === "numero") checar(`${nome}: faixa`, o.min === Number(el.getAttribute("min")) && o.max === Number(el.getAttribute("max")));
  }

  const secoesLegado = [...doc.querySelectorAll("#accordion > div")].map((d) =>
    [...d.querySelectorAll('[id^="itemConfigGeral_"]')].map(nomeDe),
  );
  for (const [i, s] of SECOES_GERAL.entries())
    checar(`secao ${s.id}: mesmas opcoes, mesma ordem`, JSON.stringify(s.opcoes.map((o) => o.nome)) === JSON.stringify(secoesLegado[i]));
  checar(
    "complementos: mesmas opcoes, mesma ordem",
    JSON.stringify(OPCOES_COMPLEMENTOS.map((o) => o.nome)) ===
      JSON.stringify([...doc.querySelectorAll('#options-complements [id^="itemConfigGeral_"]')].map(nomeDe)),
  );

  secao("schema: dependencias");
  const chaves = new Set(
    todasAsOpcoes()
      .filter((o) => o.tipo === "chave")
      .map((o) => o.nome),
  );
  for (const o of todasAsOpcoes())
    for (const d of o.dependencias ?? []) checar(`${o.nome}: depende de chave existente (${d.de})`, chaves.has(d.de));
  const dep = (n: string) => JSON.stringify(schema.get(n)?.dependencias ?? []);
  checar(
    "sortbeforeupload desmarca ao esconder",
    dep("sortbeforeupload") === JSON.stringify([{ de: "uploaddocsexternos", quando: true, limparAoEsconder: true }]),
  );
  checar("newdocsigilo: newdocdefault ligado e newdocnivel desligado", dep("newdocsigilo").includes('"newdocnivel","quando":false'));
  checar("salvamentoautomatico fica oculta", schema.get("salvamentoautomatico")?.oculta === true);
  checar(
    "so salvamentoautomatico e oculta sempre (as linhas do Lab aparecem no Lab)",
    todasAsOpcoes().filter((o) => o.oculta).length === 1,
  );
}
