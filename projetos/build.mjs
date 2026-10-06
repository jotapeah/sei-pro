#!/usr/bin/env node
/**
 * Build do Projetos.
 *
 * Fase P2 (nucleo): nada vai para dist/. O manifest ainda nao conhece o modulo e um arquivo
 * gerado sem uso confundiria a revisao. O build empacota EM MEMORIA a API publica
 * (src/api.ts: modelo, repositorio, modelos, wrapper do Gantt e a Frappe ajustada) e roda
 * os portoes sobre o resultado:
 *   - JS so ASCII (regra do projeto para JS da extensao; o esbuild ja escapa, o portao confere);
 *   - sem innerHTML/outerHTML/insertAdjacentHTML nem acao em atributo on* (DOM seguro).
 * O P3 troca ENTRADAS pelas saidas reais (dist/js/init_projetos.js, dist/js/projetos/app.js,
 * dist/html/projetos.html, dist/css/projetos.css) e passa a gravar em dist/.
 */
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { build } from "esbuild";

const AQUI = dirname(fileURLToPath(import.meta.url));

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

const ENTRADAS = [{ nome: "api (verificacao P2)", entrada: "src/api.ts", formato: "esm", saida: ".verificacao/api.js" }];

const PROIBIDO = /innerHTML|outerHTML|insertAdjacentHTML/;
// on<evento>=" dentro de literal, como tools/check-dom-injection.mjs ("el.onclick = fn" nao casa).
const HANDLER = /\bon[a-z]+\s*=\s*\\?["']/;

let falhou = false;
const erro = (m) => {
  console.error(`ERRO: ${m}`);
  falhou = true;
};

console.log("\nProjetos -- build (P2: verificacao em memoria; nada vai para dist/)");
for (const { nome, entrada, formato, saida } of ENTRADAS) {
  const r = await build({ ...comum, entryPoints: [resolve(AQUI, entrada)], format: formato, write: false, outfile: resolve(AQUI, saida) });
  for (const f of r.outputFiles) {
    const i = f.contents.findIndex((b) => b > 0x7f);
    if (i >= 0) erro(`byte nao-ASCII em ${nome} (posicao ${i}): ${Buffer.from(f.contents.subarray(Math.max(0, i - 40), i + 10)).toString("utf8")}`);
    if (PROIBIDO.test(f.text)) erro(`${nome}: innerHTML/outerHTML/insertAdjacentHTML no pacote`);
    if (HANDLER.test(f.text)) erro(`${nome}: acao em atributo on* no pacote`);
    console.log(`  ${nome.padEnd(26)} ${Math.round(f.contents.length / 1024)} KB (em memoria)`);
  }
}

if (falhou) process.exit(1);
console.log("  portoes: ASCII e DOM seguro ok");
