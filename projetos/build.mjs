#!/usr/bin/env node
/**
 * Build do Projetos.
 *
 *   dist/js/init_projetos.js   content script (IIFE, mundo isolado, todos os frames, document_start)
 *   dist/js/projetos/app.js    app de html/projetos.html (ESM): painel embutido e impressao (lateral: P5)
 *   dist/html/projetos.html    copia de estatico/
 *   dist/css/projetos.css      sei-comum/src/ui/base.css + lista.css + estatico/projetos.css + estatico/gantt.css
 *                              (os dois do sei-comum sem os comentarios, que tem acento: a saida fica ASCII)
 *
 * Portoes (o build grava e depois reprova; confira que a saida nao tem linha "ERRO:"):
 *   - JS so ASCII (o charset "ascii" do esbuild nao escapa caractere cru em regex literal, e o grep BSD
 *     nao enxerga); CSS e HTML gerados tambem;
 *   - DOM seguro: nenhuma escrita de innerHTML/outerHTML, nenhum insertAdjacentHTML, nenhuma acao em
 *     atributo on*; no app, que leva a Frappe, nem a palavra innerHTML/outerHTML (no content script o
 *     paginaDe do nucleo LE outerHTML);
 *   - o content script nao fala com a arvore do processo nem com o formulario de atribuicao: abrir a
 *     arvore grava "Processo recebido" em nome do usuario (ruling da T12). Nenhum destes enderecos do
 *     SEI pode estar no pacote, nem em codigo morto que um dia volte a ser chamado.
 */
import { copyFile, mkdir, readFile, rm, stat, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { build } from "esbuild";

const AQUI = dirname(fileURLToPath(import.meta.url));
const DIST = resolve(AQUI, "..", "dist");

// Opcoes comuns do esbuild (as mesmas do historico/build.mjs).
const comum = {
  bundle: true,
  minify: true,
  target: ["chrome116", "firefox115"],
  // Acentos saem como \uXXXX: regra do projeto para JS da extensao.
  charset: "ascii",
  logLevel: "warning",
  legalComments: "none",
  // O fonte original da Frappe 1.2.2 tem dois metodos view_is (vale o segundo, como no pacote publicado).
  logOverride: { "duplicate-class-member": "silent" },
  loader: { ".css": "text" },
  banner: { js: "/* GERADO por projetos/build.mjs. NAO EDITE ESTE ARQUIVO. Rode: npm run build */" },
};

const CONTENT_SCRIPT = "js/init_projetos.js";
const ENTRADAS = [
  { entrada: "src/pagina/main.ts", saida: CONTENT_SCRIPT, formato: "iife", estrito: false },
  { entrada: "src/app/main.ts", saida: "js/projetos/app.js", formato: "esm", estrito: true },
];

// Escrita de HTML cru em qualquer pacote; no app (com a Frappe vendorizada), nem a palavra.
const ESCRITA_HTML = /\.(innerHTML|outerHTML)\s*=(?!=)|insertAdjacentHTML/;
const PALAVRA_HTML = /innerHTML|outerHTML|insertAdjacentHTML/;
// on<evento>=" dentro de literal, como tools/check-dom-injection.mjs ("el.onclick = fn" nao casa).
const HANDLER = /\bon[a-z]+\s*=\s*\\?["']/;
// Enderecos do SEI que o content script nunca chama (arvore do processo e lista do formulario de atribuicao).
const SEI_PROIBIDO = ["procedimento_visualizar", "arvore_montar", "procedimento_atribuicao_cadastrar"];

let falhou = false;
const erro = (m) => {
  console.error(`ERRO: ${m}`);
  falhou = true;
};
const primeiroNaoAscii = (bytes) => bytes.findIndex((b) => b > 0x7f);
const trecho = (bytes, i) => bytes.subarray(Math.max(0, i - 40), i + 10).toString("utf8");

await rm(join(DIST, "js", "projetos"), { recursive: true, force: true });
await mkdir(join(DIST, "js", "projetos"), { recursive: true });
await mkdir(join(DIST, "html"), { recursive: true });
await mkdir(join(DIST, "css"), { recursive: true });

for (const { entrada, saida, formato } of ENTRADAS)
  await build({ ...comum, entryPoints: [resolve(AQUI, entrada)], outfile: join(DIST, saida), format: formato });

await copyFile(resolve(AQUI, "estatico/projetos.html"), join(DIST, "html", "projetos.html"));
const COMUNS = ["../sei-comum/src/ui/base.css", "../sei-comum/src/ui/lista.css"];
const PROPRIOS = ["estatico/projetos.css", "estatico/gantt.css"];
const semComentarios = (css) => css.replace(/\/\*[\s\S]*?\*\//g, "");
const css = [
  ...(await Promise.all(COMUNS.map(async (f) => semComentarios(await readFile(resolve(AQUI, f), "utf8"))))),
  ...(await Promise.all(PROPRIOS.map((f) => readFile(resolve(AQUI, f), "utf8")))),
];
await writeFile(join(DIST, "css", "projetos.css"), `/* GERADO por projetos/build.mjs. NAO EDITE ESTE ARQUIVO. */\n${css.join("\n")}`);

for (const { saida, estrito } of ENTRADAS) {
  const bytes = await readFile(join(DIST, saida));
  const i = primeiroNaoAscii(bytes);
  if (i >= 0) erro(`byte nao-ASCII em dist/${saida} (posicao ${i}): ${trecho(bytes, i)}`);
  const texto = bytes.toString("utf8");
  if ((estrito ? PALAVRA_HTML : ESCRITA_HTML).test(texto)) erro(`dist/${saida}: innerHTML/outerHTML/insertAdjacentHTML no pacote`);
  if (HANDLER.test(texto)) erro(`dist/${saida}: acao em atributo on* no pacote`);
  if (saida === CONTENT_SCRIPT)
    for (const p of SEI_PROIBIDO) if (texto.includes(p)) erro(`dist/${saida}: "${p}" no content script (arvore do processo / atribuicao)`);
}
for (const f of [...PROPRIOS.map((p) => resolve(AQUI, p)), join(DIST, "css", "projetos.css"), join(DIST, "html", "projetos.html")]) {
  const bytes = await readFile(f);
  const j = primeiroNaoAscii(bytes);
  if (j >= 0) erro(`byte nao-ASCII em ${f} (posicao ${j}): ${trecho(bytes, j)}`);
}

const kb = async (f) => `${((await stat(join(DIST, f))).size / 1024).toFixed(1)} KB`;
console.log("\nProjetos -- build");
for (const f of [...ENTRADAS.map((e) => e.saida), "html/projetos.html", "css/projetos.css"]) console.log(`  ${f.padEnd(26)} ${await kb(f)}`);
if (falhou) process.exit(1);
console.log("  portoes: ASCII, DOM seguro e content script sem arvore/atribuicao ok");
