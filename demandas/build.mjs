#!/usr/bin/env node
/**
 * Build do Gestor de Demandas.
 *
 *   dist/js/init_demandas.js   content script (IIFE, mundo isolado)
 *   dist/js/demandas/app.js    app de html/demandas.html (ESM): painel embutido, lateral e pagina
 *   dist/html/demandas.html    copia de estatico/
 *   dist/css/demandas.css      sei-comum/src/ui/base.css + sei-comum/src/ui/lista.css + estatico/demandas.css
 *
 * Portoes (o build grava e depois reprova; confira que a saida nao tem linha "ERRO:"):
 *   - JS so ASCII; CSS e HTML gerados tambem;
 *   - DOM seguro: nenhuma escrita de innerHTML/outerHTML, nenhum insertAdjacentHTML, nenhuma acao em atributo on*;
 *   - nada que roda no SEI BUSCA a arvore do processo nem o formulario de atribuicao (grava "Processo recebido");
 *   - as saidas estao no web_accessible_resources do dist/manifest.json (desligado por DEMANDAS_SEM_WAR=1 ate a D13).
 */
import { copyFile, mkdir, readFile, rm, stat, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { build } from "esbuild";

const AQUI = dirname(fileURLToPath(import.meta.url));
const DIST = resolve(AQUI, "..", "dist");

const comum = {
  bundle: true,
  minify: true,
  target: ["chrome116", "firefox115"],
  // Acentos saem como \uXXXX: regra do projeto para JS da extensao.
  charset: "ascii",
  logLevel: "warning",
  legalComments: "none",
  loader: { ".css": "text" },
  banner: { js: "/* GERADO por demandas/build.mjs. NAO EDITE ESTE ARQUIVO. Rode: npm run build */" },
};

const CONTENT_SCRIPT = "js/init_demandas.js";
const APP = "js/demandas/app.js";
const SAIDAS = [CONTENT_SCRIPT, APP];

const ESCRITA_HTML = /\.(innerHTML|outerHTML)\s*=(?!=)|insertAdjacentHTML/;
const HANDLER = /\bon[a-z]+\s*=\s*\\?["']/;
const SEI_PROIBIDO = ["procedimento_visualizar", "arvore_montar", "procedimento_atribuicao_cadastrar"];

let falhou = false;
const erro = (m) => {
  console.error(`ERRO: ${m}`);
  falhou = true;
};
const primeiroNaoAscii = (bytes) => bytes.findIndex((b) => b > 0x7f);
const trecho = (bytes, i) => bytes.subarray(Math.max(0, i - 40), i + 10).toString("utf8");

await rm(join(DIST, "js", "demandas"), { recursive: true, force: true });
await mkdir(join(DIST, "js", "demandas"), { recursive: true });
await mkdir(join(DIST, "html"), { recursive: true });
await mkdir(join(DIST, "css"), { recursive: true });

await build({ ...comum, entryPoints: [resolve(AQUI, "src/app/main.ts")], outfile: join(DIST, APP), format: "esm" });
await build({ ...comum, entryPoints: [resolve(AQUI, "src/pagina/main.ts")], outfile: join(DIST, CONTENT_SCRIPT), format: "iife" });

await copyFile(resolve(AQUI, "estatico/demandas.html"), join(DIST, "html", "demandas.html"));
// Os dois do sei-comum sem os comentarios (tem acento): a saida fica ASCII.
const semComentarios = (c) => c.replace(/\/\*[\s\S]*?\*\//g, "");
const css = [
  ...(await Promise.all(
    ["../sei-comum/src/ui/base.css", "../sei-comum/src/ui/lista.css"].map(async (f) =>
      semComentarios(await readFile(resolve(AQUI, f), "utf8")),
    ),
  )),
  await readFile(resolve(AQUI, "estatico/demandas.css"), "utf8"),
];
await writeFile(join(DIST, "css", "demandas.css"), `/* GERADO por demandas/build.mjs. NAO EDITE ESTE ARQUIVO. */\n${css.join("\n")}`);

// Portoes de bytes, DOM e enderecos em todo JS gerado.
for (const saida of SAIDAS) {
  const bytes = await readFile(join(DIST, saida));
  const i = primeiroNaoAscii(bytes);
  if (i >= 0) erro(`byte nao-ASCII em dist/${saida} (posicao ${i}): ${trecho(bytes, i)}`);
  const texto = bytes.toString("utf8");
  if (ESCRITA_HTML.test(texto)) erro(`dist/${saida}: innerHTML/outerHTML/insertAdjacentHTML no pacote`);
  if (HANDLER.test(texto)) erro(`dist/${saida}: acao em atributo on* no pacote`);
  for (const p of SEI_PROIBIDO) if (texto.includes(p)) erro(`dist/${saida}: "${p}" (busca da arvore do processo / atribuicao)`);
}
for (const f of [join(DIST, "css", "demandas.css"), join(DIST, "html", "demandas.html")]) {
  const bytes = await readFile(f);
  const j = primeiroNaoAscii(bytes);
  if (j >= 0) erro(`byte nao-ASCII em ${f} (posicao ${j}): ${trecho(bytes, j)}`);
}

if (process.env.DEMANDAS_SEM_WAR !== "1") {
  const manifest = JSON.parse(await readFile(join(DIST, "manifest.json"), "utf8"));
  const war = (manifest.web_accessible_resources ?? []).flatMap((w) => w.resources ?? []);
  for (const saida of [APP, "html/demandas.html", "css/demandas.css"])
    if (!war.includes(saida)) erro(`dist/manifest.json: ${saida} fora do web_accessible_resources`);
}

const kb = async (f) => `${((await stat(join(DIST, f))).size / 1024).toFixed(1)} KB`;
console.log("\nDemandas -- build");
for (const f of [...SAIDAS, "html/demandas.html", "css/demandas.css"]) console.log(`  ${f.padEnd(28)} ${await kb(f)}`);
if (falhou) process.exit(1);
console.log("  portoes: ASCII, DOM seguro e sem busca de arvore/atribuicao ok");
