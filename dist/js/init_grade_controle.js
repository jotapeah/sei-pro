/* GERADO por grade-controle/build.mjs. NAO EDITE. Rode: npm run build */
"use strict";(()=>{function Cn(o){let e={};for(let[t,r]of Object.entries(o)){let a={};r&&"newValue"in r&&(a.novo=r.newValue),r&&"oldValue"in r&&(a.antigo=r.oldValue),e[t]=a}return e}function Be(o,e){return{obter:(t=null)=>o.get(t),gravar:t=>o.set(t),remover:t=>o.remove(t),chaves:typeof o.getKeys=="function"?()=>o.getKeys():void 0,aoMudar(t){let r=(a,n)=>{n===e&&t(Cn(a))};return chrome.storage.onChanged.addListener(r),()=>chrome.storage.onChanged.removeListener(r)}}}var tt=o=>String(o).padStart(2,"0");function ce(o=new Date){return`${o.getFullYear()}-${tt(o.getMonth()+1)}-${tt(o.getDate())}`}function ie(o){let e=/^(\d{4})-(\d{2})-(\d{2})$/.exec(o);if(!e)throw new Error(`Data inv\xE1lida: ${o}`);return new Date(Number(e[1]),Number(e[2])-1,Number(e[3]),12)}function jo(o,e){return Math.round((ie(e).getTime()-ie(o).getTime())/864e5)}function fo(o){let[e,t,r]=o.split("-");return`${r}/${t}/${e}`}function On(o,e){let t=o;if(typeof o=="string"){if(!o.trim())return;try{t=JSON.parse(o)}catch{return}}return!Array.isArray(t)||t.length===0?void 0:t.map(a=>a?.configGeral).find(Array.isArray)?.find(a=>a?.name===e)?.value}function Qe(o,e){let t=On(o,e);return t===!0||t===1||t==="1"}function at(o){try{return!!o.getItem("darkModePro")}catch{return!1}}function nt(o=crypto){if(typeof o.randomUUID=="function")return o.randomUUID();let e=o.getRandomValues(new Uint8Array(16));e[6]=(e[6]??0)&15|64,e[8]=(e[8]??0)&63|128;let t=[...e].map(r=>r.toString(16).padStart(2,"0")).join("");return`${t.slice(0,8)}-${t.slice(8,12)}-${t.slice(12,16)}-${t.slice(16,20)}-${t.slice(20)}`}var st=`/*
 * Base visual dos m\xF3dulos novos do SEI Pro.
 *
 * Tokens no :root (e no :host, para valerem dentro de Shadow DOM: o bal\xE3o que o
 * content script abre na p\xE1gina do SEI). O modo escuro vem de duas formas:
 * for\xE7ado por data-tema (o painel abaixo da lista segue o SEI, que s\xF3 \xE9 escuro
 * com o modo noturno do SEI Pro) ou pelo sistema, quando ningu\xE9m for\xE7ou nada
 * (o painel lateral). A cor de destaque pode vir do tema do SEI
 * (--spro-cor-sei, posta pelo app embutido).
 */
:root,
:host {
  --spro-fundo: #ffffff;
  --spro-fundo-2: #f6f7f9;
  --spro-fundo-3: #eceef2;
  --spro-pagina: #f3f4f7;
  --spro-texto: #1b1f24;
  --spro-suave: #5d6772;
  --spro-fraco: #8b939c;
  --spro-borda: #e3e6eb;
  --spro-borda-forte: #cfd4db;
  --spro-destaque: #1f5fbf;
  --spro-destaque-texto: #ffffff;
  --spro-perigo: #d1352b;
  --spro-aviso: #b45c0a;
  --spro-ok: #12805c;
  --spro-novidade: #6d4fd8;
  --spro-estrela: #f2a516;
  --spro-sombra-1: 0 1px 2px rgb(16 24 40 / 6%);
  --spro-sombra-2: 0 2px 4px -2px rgb(16 24 40 / 8%), 0 6px 14px -4px rgb(16 24 40 / 12%);
  --spro-sombra-3: 0 10px 24px -6px rgb(16 24 40 / 18%), 0 24px 56px -12px rgb(16 24 40 / 24%);
  --spro-veu: rgb(17 21 28 / 46%);
  --spro-raio-p: 6px;
  --spro-raio: 8px;
  --spro-raio-g: 12px;
  --spro-raio-xg: 16px;
  --spro-fonte: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  --spro-mono: ui-monospace, "SF Mono", "Cascadia Mono", "Roboto Mono", Menlo, Consolas, monospace;
  --spro-dur: 150ms;
  --spro-curva: cubic-bezier(0.2, 0.8, 0.2, 1);
  --spro-destaque-suave: color-mix(in srgb, var(--spro-destaque) 10%, transparent);
  --spro-destaque-medio: color-mix(in srgb, var(--spro-destaque) 18%, transparent);
  --spro-anel: 0 0 0 3px color-mix(in srgb, var(--spro-destaque) 30%, transparent);
  color-scheme: light;
}
:root[data-tema="escuro"],
:host([data-tema="escuro"]) {
  --spro-fundo: #1a1d21;
  --spro-fundo-2: #22262b;
  --spro-fundo-3: #2b3036;
  --spro-pagina: #141619;
  --spro-texto: #e7e9ec;
  --spro-suave: #a4abb3;
  --spro-fraco: #767e87;
  --spro-borda: #2f343a;
  --spro-borda-forte: #3d434a;
  --spro-destaque: #79acff;
  --spro-destaque-texto: #0a1526;
  --spro-perigo: #ff7d73;
  --spro-aviso: #e8b04a;
  --spro-ok: #4fcf96;
  --spro-novidade: #ab98ff;
  --spro-estrela: #f6b73c;
  --spro-sombra-1: 0 1px 2px rgb(0 0 0 / 30%);
  --spro-sombra-2: 0 2px 4px -2px rgb(0 0 0 / 40%), 0 6px 14px -4px rgb(0 0 0 / 45%);
  --spro-sombra-3: 0 10px 24px -6px rgb(0 0 0 / 50%), 0 24px 56px -12px rgb(0 0 0 / 60%);
  --spro-veu: rgb(0 0 0 / 58%);
  --spro-destaque-suave: color-mix(in srgb, var(--spro-destaque) 14%, transparent);
  --spro-destaque-medio: color-mix(in srgb, var(--spro-destaque) 24%, transparent);
  color-scheme: dark;
}
@media (prefers-color-scheme: dark) {
  :root:not([data-tema]),
  :host(:not([data-tema])) {
    --spro-fundo: #1a1d21;
    --spro-fundo-2: #22262b;
    --spro-fundo-3: #2b3036;
    --spro-pagina: #141619;
    --spro-texto: #e7e9ec;
    --spro-suave: #a4abb3;
    --spro-fraco: #767e87;
    --spro-borda: #2f343a;
    --spro-borda-forte: #3d434a;
    --spro-destaque: #79acff;
    --spro-destaque-texto: #0a1526;
    --spro-perigo: #ff7d73;
    --spro-aviso: #e8b04a;
    --spro-ok: #4fcf96;
    --spro-novidade: #ab98ff;
    --spro-estrela: #f6b73c;
    --spro-sombra-1: 0 1px 2px rgb(0 0 0 / 30%);
    --spro-sombra-2: 0 2px 4px -2px rgb(0 0 0 / 40%), 0 6px 14px -4px rgb(0 0 0 / 45%);
    --spro-sombra-3: 0 10px 24px -6px rgb(0 0 0 / 50%), 0 24px 56px -12px rgb(0 0 0 / 60%);
    --spro-veu: rgb(0 0 0 / 58%);
    --spro-destaque-suave: color-mix(in srgb, var(--spro-destaque) 14%, transparent);
    --spro-destaque-medio: color-mix(in srgb, var(--spro-destaque) 24%, transparent);
    color-scheme: dark;
  }
}
/* Destaque na cor do tema do SEI (painel abaixo da lista). No escuro, clareado para ter contraste. */
:root[data-cor-sei] {
  --spro-destaque: var(--spro-cor-sei);
}
:root[data-cor-sei][data-tema="escuro"] {
  --spro-destaque: color-mix(in srgb, var(--spro-cor-sei) 45%, #ffffff);
}

/* [hidden] perde para display de classe; o agente aprendeu isso do jeito dif\xEDcil. */
[hidden] {
  /* biome-ignore lint/complexity/noImportantStyles: [hidden] precisa vencer o display das classes */
  display: none !important;
}
.spro-icone {
  flex: none;
  vertical-align: middle;
}

/* ---------- Bot\xF5es ---------- */
.spro-botao {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  min-height: 30px;
  padding: 0 12px;
  font: inherit;
  font-size: 13px;
  font-weight: 500;
  line-height: 1.2;
  white-space: nowrap;
  color: var(--spro-texto);
  background: var(--spro-fundo);
  border: 1px solid var(--spro-borda-forte);
  border-radius: var(--spro-raio);
  box-shadow: var(--spro-sombra-1);
  cursor: pointer;
  transition:
    background var(--spro-dur),
    border-color var(--spro-dur),
    box-shadow var(--spro-dur),
    color var(--spro-dur);
}
.spro-botao:hover {
  background: var(--spro-fundo-2);
  border-color: color-mix(in srgb, var(--spro-borda-forte) 60%, var(--spro-texto));
}
.spro-botao:active {
  background: var(--spro-fundo-3);
}
.spro-botao .spro-icone {
  color: var(--spro-suave);
}
.spro-botao.primario {
  color: var(--spro-destaque-texto);
  background: var(--spro-destaque);
  border-color: transparent;
  box-shadow:
    var(--spro-sombra-1),
    inset 0 1px 0 rgb(255 255 255 / 14%);
}
.spro-botao.primario .spro-icone {
  color: inherit;
}
.spro-botao.primario:hover {
  background: color-mix(in srgb, var(--spro-destaque) 88%, #000000);
}
.spro-botao.perigo {
  color: var(--spro-perigo);
}
.spro-botao.perigo .spro-icone {
  color: inherit;
}
.spro-botao.primario.perigo {
  color: #ffffff;
  background: var(--spro-perigo);
}
.spro-botao.fantasma {
  background: transparent;
  border-color: transparent;
  box-shadow: none;
}
.spro-botao.fantasma:hover {
  background: var(--spro-fundo-3);
}
.spro-botao.pequeno {
  min-height: 26px;
  padding: 0 9px;
  font-size: 12px;
}
.spro-botao:disabled,
.spro-botao-icone:disabled {
  opacity: 0.5;
  cursor: default;
  pointer-events: none;
}
.spro-botao-icone {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: none;
  width: 30px;
  height: 30px;
  padding: 0;
  color: var(--spro-suave);
  background: none;
  border: 0;
  border-radius: var(--spro-raio);
  cursor: pointer;
  transition:
    background var(--spro-dur),
    color var(--spro-dur);
}
.spro-botao-icone:hover,
.spro-botao-icone[aria-expanded="true"] {
  color: var(--spro-texto);
  background: var(--spro-fundo-3);
}
.spro-botao-icone.pequeno {
  width: 26px;
  height: 26px;
}

/* ---------- Campos ---------- */
.spro-campo {
  box-sizing: border-box;
  min-height: 32px;
  min-width: 0;
  padding: 5px 10px;
  font: inherit;
  font-size: 13px;
  color: var(--spro-texto);
  background: var(--spro-fundo);
  border: 1px solid var(--spro-borda-forte);
  border-radius: var(--spro-raio);
  transition:
    border-color var(--spro-dur),
    box-shadow var(--spro-dur);
}
.spro-campo::placeholder {
  color: var(--spro-fraco);
}
.spro-campo:hover {
  border-color: color-mix(in srgb, var(--spro-borda-forte) 70%, var(--spro-texto));
}
textarea.spro-campo {
  resize: vertical;
  line-height: 1.45;
  padding: 8px 10px;
}
.spro-campo:focus,
.spro-campo:focus-visible {
  outline: none;
  border-color: var(--spro-destaque);
  box-shadow: var(--spro-anel);
}
.spro-botao:focus-visible,
.spro-botao-icone:focus-visible,
.spro-combo:focus-visible,
.spro-chip:focus-visible,
.spro-segmentado button:focus-visible {
  outline: none;
  box-shadow: var(--spro-anel);
}
/* No menu o fundo j\xE1 mostra o item em foco (o foco anda junto com o mouse). */
.spro-menu-item:focus-visible {
  outline: none;
}
input[type="checkbox"],
input[type="radio"] {
  accent-color: var(--spro-destaque);
}

/* ---------- Controle segmentado ---------- */
.spro-segmentado {
  display: inline-flex;
  align-items: stretch;
  gap: 2px;
  padding: 2px;
  background: var(--spro-fundo-3);
  border-radius: calc(var(--spro-raio) + 1px);
}
.spro-segmentado button {
  all: unset;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  min-height: 26px;
  padding: 0 11px;
  font-size: 12.5px;
  font-weight: 500;
  color: var(--spro-suave);
  border-radius: var(--spro-raio-p);
  cursor: pointer;
  white-space: nowrap;
  transition:
    background var(--spro-dur),
    color var(--spro-dur),
    box-shadow var(--spro-dur);
}
.spro-segmentado button:hover {
  color: var(--spro-texto);
}
.spro-segmentado button[aria-selected="true"],
.spro-segmentado button[aria-pressed="true"],
.spro-segmentado button[aria-checked="true"] {
  color: var(--spro-texto);
  background: var(--spro-fundo);
  box-shadow: var(--spro-sombra-1);
  font-weight: 600;
}

/* ---------- Chips (etiquetas) e p\xEDlulas ---------- */
.spro-chip {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  min-height: 24px;
  padding: 0 10px;
  font: inherit;
  font-size: 12px;
  font-weight: 500;
  color: var(--spro-texto);
  background: color-mix(in srgb, var(--cor, var(--spro-fundo-3)) 30%, var(--spro-fundo));
  border: 1px solid color-mix(in srgb, var(--cor, var(--spro-borda-forte)) 60%, transparent);
  border-radius: 999px;
  cursor: pointer;
  transition:
    background var(--spro-dur),
    border-color var(--spro-dur),
    opacity var(--spro-dur);
}
:root[data-tema="escuro"] .spro-chip,
:host([data-tema="escuro"]) .spro-chip {
  background: color-mix(in srgb, var(--cor, var(--spro-fundo-3)) 16%, var(--spro-fundo));
}
@media (prefers-color-scheme: dark) {
  :root:not([data-tema]) .spro-chip,
  :host(:not([data-tema])) .spro-chip {
    background: color-mix(in srgb, var(--cor, var(--spro-fundo-3)) 16%, var(--spro-fundo));
  }
}
.spro-chip::before {
  content: "";
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--cor, var(--spro-fraco));
}
.spro-chip[aria-pressed="false"] {
  color: var(--spro-suave);
  background: transparent;
  border-color: var(--spro-borda-forte);
  border-style: dashed;
}
.spro-pilula {
  --tom: var(--spro-suave);
  display: inline-flex;
  align-items: center;
  gap: 4px;
  min-height: 20px;
  max-width: 100%;
  padding: 0 7px;
  font-size: 11.5px;
  font-weight: 500;
  line-height: 1;
  white-space: nowrap;
  color: var(--tom);
  background: color-mix(in srgb, var(--tom) 11%, transparent);
  border-radius: 999px;
  box-sizing: border-box;
}
.spro-pilula > span {
  overflow: hidden;
  text-overflow: ellipsis;
}

/* ---------- Seletor inteligente (combobox) ---------- */
.spro-combo {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  box-sizing: border-box;
  min-height: 30px;
  min-width: 0;
  max-width: 100%;
  padding: 0 8px 0 10px;
  font: inherit;
  font-size: 13px;
  text-align: left;
  color: var(--spro-texto);
  background: var(--spro-fundo);
  border: 1px solid var(--spro-borda-forte);
  border-radius: var(--spro-raio);
  box-shadow: var(--spro-sombra-1);
  cursor: pointer;
  transition:
    background var(--spro-dur),
    border-color var(--spro-dur),
    box-shadow var(--spro-dur);
}
.spro-combo:hover {
  background: var(--spro-fundo-2);
}
.spro-combo > .spro-icone {
  color: var(--spro-suave);
}
.spro-combo > .spro-icone:last-child {
  margin-left: auto;
  color: var(--spro-fraco);
  transition: transform var(--spro-dur) var(--spro-curva);
}
.spro-combo-aberto {
  border-color: var(--spro-destaque);
  box-shadow: var(--spro-anel);
}
.spro-combo-aberto > .spro-icone:last-child {
  transform: rotate(180deg);
}
.spro-combo-ativo {
  color: var(--spro-destaque);
  background: var(--spro-destaque-suave);
  border-color: color-mix(in srgb, var(--spro-destaque) 45%, transparent);
}
.spro-combo-ativo:hover {
  background: var(--spro-destaque-medio);
}
.spro-combo-ativo > .spro-icone {
  color: inherit;
}
.spro-combo-texto {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  min-width: 0;
  flex: 1 1 auto;
}
.spro-combo-rotulo {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.spro-combo-vazio {
  color: var(--spro-suave);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.spro-combo-mais {
  flex: none;
  padding: 1px 6px;
  font-size: 11px;
  font-weight: 600;
  color: var(--spro-destaque-texto);
  background: var(--spro-destaque);
  border-radius: 999px;
}
.spro-combo-cor {
  flex: none;
  width: 9px;
  height: 9px;
  border-radius: 50%;
  box-shadow: inset 0 0 0 1px rgb(0 0 0 / 12%);
}
.spro-combo-pop,
.spro-menu-pop {
  position: fixed;
  z-index: 2147483000;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  overflow: hidden;
  font-family: var(--spro-fonte);
  font-size: 13px;
  color: var(--spro-texto);
  background: var(--spro-fundo);
  border: 1px solid var(--spro-borda);
  border-radius: var(--spro-raio-g);
  box-shadow: var(--spro-sombra-3);
  animation: spro-surgir 140ms var(--spro-curva);
  transform-origin: top center;
}
.spro-flutuante-cima {
  transform-origin: bottom center;
}
@keyframes spro-surgir {
  from {
    opacity: 0;
    transform: translateY(-4px) scale(0.98);
  }
}
.spro-combo-cabeca {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 10px;
  color: var(--spro-fraco);
  border-bottom: 1px solid var(--spro-borda);
}
.spro-combo-busca {
  flex: 1;
  min-width: 0;
  height: 38px;
  padding: 0;
  font: inherit;
  color: var(--spro-texto);
  background: transparent;
  border: 0;
  outline: none;
}
.spro-combo-busca::placeholder {
  color: var(--spro-fraco);
}
.spro-combo-lista {
  flex: 1 1 auto;
  min-height: 0;
  margin: 0;
  padding: 4px;
  overflow: auto;
  list-style: none;
  outline: none;
  scrollbar-width: thin;
}
.spro-combo-op {
  display: flex;
  align-items: center;
  gap: 9px;
  padding: 6px 8px;
  border-radius: var(--spro-raio-p);
  cursor: pointer;
  user-select: none;
}
.spro-combo-op > .spro-icone {
  color: var(--spro-suave);
}
.spro-combo-op-ativa {
  background: var(--spro-fundo-3);
}
.spro-combo-op[aria-selected="true"] {
  font-weight: 600;
}
.spro-combo-op-textos {
  display: grid;
  gap: 1px;
  min-width: 0;
  flex: 1 1 auto;
}
.spro-combo-op-rotulo {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.spro-combo-op-rotulo mark {
  color: inherit;
  background: color-mix(in srgb, var(--spro-estrela) 35%, transparent);
  border-radius: 2px;
}
.spro-combo-op-desc {
  font-size: 11.5px;
  font-weight: 400;
  color: var(--spro-suave);
  white-space: normal;
}
.spro-combo-caixa {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: none;
  width: 16px;
  height: 16px;
  box-sizing: border-box;
  color: var(--spro-destaque-texto);
  border: 1.5px solid var(--spro-borda-forte);
  border-radius: 5px;
  transition:
    background var(--spro-dur),
    border-color var(--spro-dur);
}
.spro-combo-op[aria-selected="true"] .spro-combo-caixa {
  background: var(--spro-destaque);
  border-color: var(--spro-destaque);
}
.spro-combo-caixa .spro-icone {
  stroke-width: 3;
}
.spro-combo-conta {
  flex: none;
  margin-left: auto;
  min-width: 18px;
  padding: 0 6px;
  font-size: 11px;
  font-weight: 500;
  font-variant-numeric: tabular-nums;
  text-align: center;
  color: var(--spro-suave);
  background: var(--spro-fundo-3);
  border-radius: 999px;
}
.spro-combo-marca {
  flex: none;
  margin-left: auto;
  display: inline-flex;
  color: var(--spro-destaque);
}
.spro-combo-conta + .spro-combo-marca {
  margin-left: 0;
}
.spro-combo-extras:empty {
  display: none;
}
.spro-combo-nada {
  margin: 0;
  padding: 14px 12px;
  text-align: center;
  color: var(--spro-suave);
}
.spro-combo-criar {
  all: unset;
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0 4px 4px;
  padding: 7px 8px;
  font-weight: 500;
  color: var(--spro-destaque);
  border-radius: var(--spro-raio-p);
  cursor: pointer;
}
.spro-combo-criar:hover,
.spro-combo-criar:focus-visible {
  background: var(--spro-destaque-suave);
}
.spro-combo-rodape {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px 6px 6px 12px;
  background: var(--spro-fundo-2);
  border-top: 1px solid var(--spro-borda);
}
.spro-combo-total {
  flex: 1;
  font-size: 12px;
  color: var(--spro-suave);
  white-space: nowrap;
}
.spro-combo-acao {
  all: unset;
  padding: 4px 8px;
  font-size: 12px;
  font-weight: 500;
  color: var(--spro-destaque);
  border-radius: var(--spro-raio-p);
  cursor: pointer;
}
.spro-combo-acao:hover,
.spro-combo-acao:focus-visible {
  background: var(--spro-destaque-suave);
}
.spro-combo-acao:disabled {
  color: var(--spro-fraco);
  pointer-events: none;
}

/* ---------- Menu ---------- */
.spro-menu-pop {
  padding: 5px;
  overflow: auto;
}
.spro-menu-item {
  all: unset;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 7px 10px 7px 8px;
  border-radius: var(--spro-raio-p);
  cursor: pointer;
  white-space: nowrap;
}
.spro-menu-item:hover,
.spro-menu-item:focus {
  background: var(--spro-fundo-3);
}
.spro-menu-icone {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  flex: none;
  color: var(--spro-suave);
  background: var(--spro-fundo-2);
  border: 1px solid var(--spro-borda);
  border-radius: var(--spro-raio-p);
  box-sizing: border-box;
}
.spro-menu-item:hover .spro-menu-icone,
.spro-menu-item:focus .spro-menu-icone {
  color: var(--spro-destaque);
  background: var(--spro-fundo);
}
.spro-menu-rotulo {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
}
.spro-menu-dica {
  font-size: 11.5px;
  color: var(--spro-fraco);
  font-variant-numeric: tabular-nums;
}
.spro-menu-perigo {
  color: var(--spro-perigo);
}
.spro-menu-perigo .spro-menu-icone,
.spro-menu-perigo:hover .spro-menu-icone,
.spro-menu-perigo:focus .spro-menu-icone {
  color: var(--spro-perigo);
  background: color-mix(in srgb, var(--spro-perigo) 10%, transparent);
  border-color: color-mix(in srgb, var(--spro-perigo) 22%, transparent);
}
.spro-menu-sep {
  height: 1px;
  margin: 5px 6px;
  background: var(--spro-borda);
}

/* ---------- Di\xE1logo ---------- */
dialog.spro-dialogo {
  box-sizing: border-box;
  width: min(580px, calc(100vw - 24px));
  max-width: none;
  max-height: min(calc(100vh - 32px), 820px);
  padding: 0;
  font-family: var(--spro-fonte);
  font-size: 13px;
  color: var(--spro-texto);
  background: var(--spro-fundo);
  border: 1px solid var(--spro-borda);
  border-radius: var(--spro-raio-xg);
  box-shadow: var(--spro-sombra-3);
  overflow: hidden;
}
dialog.spro-dialogo[open] {
  display: flex;
  flex-direction: column;
  animation: spro-dialogo-entrar 180ms var(--spro-curva);
}
@keyframes spro-dialogo-entrar {
  from {
    opacity: 0;
    transform: translateY(8px) scale(0.985);
  }
}
dialog.spro-dialogo::backdrop {
  background: var(--spro-veu);
  backdrop-filter: blur(2px);
}
dialog.spro-dialogo > header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 16px 12px 18px;
  flex: none;
}
.spro-dialogo-icone {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: none;
  width: 34px;
  height: 34px;
  color: var(--spro-destaque);
  background: var(--spro-destaque-suave);
  border-radius: var(--spro-raio);
}
dialog.spro-dialogo > header h2 {
  flex: 1;
  min-width: 0;
  margin: 0;
  font-size: 15.5px;
  font-weight: 650;
  letter-spacing: -0.005em;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.spro-dialogo-corpo {
  display: grid;
  gap: 12px;
  min-height: 0;
  padding: 2px 18px 18px;
  overflow: auto;
  scrollbar-width: thin;
}
.spro-dialogo-rodape {
  position: sticky;
  bottom: -18px;
  z-index: 1;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 8px;
  margin: 6px -18px -18px;
  padding: 12px 18px;
  background: var(--spro-fundo-2);
  border-top: 1px solid var(--spro-borda);
}
.spro-dialogo-rodape > .spro-esquerda {
  margin-right: auto;
}

/* ---------- Aviso (toast) ---------- */
.spro-aviso {
  position: fixed;
  left: 50%;
  bottom: 16px;
  z-index: 2147483001;
  display: flex;
  align-items: center;
  gap: 12px;
  max-width: min(560px, calc(100vw - 24px));
  box-sizing: border-box;
  padding: 10px 10px 10px 14px;
  font-family: var(--spro-fonte);
  font-size: 13px;
  line-height: 1.35;
  color: #f3f5f8;
  background: #1f2329;
  border: 1px solid rgb(255 255 255 / 8%);
  border-radius: var(--spro-raio-g);
  box-shadow: var(--spro-sombra-3);
  transform: translateX(-50%);
  animation: spro-aviso-entrar 220ms var(--spro-curva);
}
/* Como popover (camada de cima, acima de di\xE1logo aberto): sem a posi\xE7\xE3o e a margem padr\xE3o do navegador. */
.spro-aviso[popover] {
  inset: auto auto 16px 50%;
  margin: 0;
  overflow: visible;
}
.spro-aviso > .spro-icone {
  color: #8fd6b4;
}
.spro-aviso > span {
  flex: 1;
}
@keyframes spro-aviso-entrar {
  from {
    opacity: 0;
    transform: translate(-50%, 10px);
  }
}
.spro-aviso button {
  flex: none;
  padding: 5px 10px;
  font: inherit;
  font-weight: 600;
  color: #9cc3ff;
  background: rgb(255 255 255 / 6%);
  border: 0;
  border-radius: var(--spro-raio-p);
  cursor: pointer;
}
.spro-aviso button:hover {
  background: rgb(255 255 255 / 12%);
}

@media (prefers-reduced-motion: reduce) {
  .spro-combo-pop,
  .spro-menu-pop,
  dialog.spro-dialogo[open],
  .spro-aviso {
    animation: none;
  }
  * {
    transition-duration: 0ms !important;
  }
}
`;function p(o,e={},...t){let r=document.createElement(o);for(let[a,n]of Object.entries(e))n===void 0||n===!1||(typeof n=="function"?r.addEventListener(a.replace(/^on/,""),n):n===!0?r.setAttribute(a,""):a==="class"?r.className=n:a==="value"&&o==="textarea"?r.value=n:r.setAttribute(a,n));for(let a of t)a!=null&&a!==!1&&r.append(a);return r}var so={fill:"currentColor",stroke:"none"},it="M12 3.2l2.7 5.5 6 .9-4.35 4.25 1 6L12 17l-5.35 2.85 1-6L3.3 9.6l6-.9z",ct={estrela:[["path",{d:it}]],estrelaCheia:[["path",{d:it,fill:"currentColor"}]],alvo:[["circle",{cx:"12",cy:"12",r:"7.5"}],["circle",{cx:"12",cy:"12",r:"3.2"}]],alvoAtivo:[["circle",{cx:"12",cy:"12",r:"6.6"}],["circle",{cx:"12",cy:"12",r:"2.4",fill:"currentColor"}],["path",{d:"M12 2.2v3.4M12 18.4v3.4M2.2 12h3.4M18.4 12h3.4"}]],pasta:[["path",{d:"M3.5 7.5a2 2 0 0 1 2-2h4l2 2h7a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2z"}]],etiqueta:[["path",{d:"M3.5 12.2V4.5a1 1 0 0 1 1-1h7.7l8.3 8.3a1 1 0 0 1 0 1.4l-7.1 7.1a1 1 0 0 1-1.4 0z"}],["circle",{cx:"8",cy:"8",r:"1.4",...so}]],relogio:[["circle",{cx:"12",cy:"12",r:"9"}],["path",{d:"M12 7.2V12l3.2 1.9"}]],nota:[["path",{d:"M6 3.5h9l3.5 3.5v13.5H6z"}],["path",{d:"M9 11h6"}],["path",{d:"M9 15h6"}]],lixeira:[["path",{d:"M4.5 6.5h15"}],["path",{d:"M9.5 6.5V4.8c0-.7.6-1.3 1.3-1.3h2.4c.7 0 1.3.6 1.3 1.3v1.7"}],["path",{d:"M6.8 6.5 7.6 19c0 .8.7 1.5 1.5 1.5h5.8c.8 0 1.5-.7 1.5-1.5l.8-12.5"}]],lapis:[["path",{d:"M17.5 3.5a2.1 2.1 0 0 1 3 3L9 18l-4.5 1.5L6 15z"}],["path",{d:"M15 6l3 3"}]],fechar:[["path",{d:"M18 6 6 18"}],["path",{d:"M6 6l12 12"}]],mais:[["path",{d:"M12 5v14"}],["path",{d:"M5 12h14"}]],busca:[["circle",{cx:"11",cy:"11",r:"6.5"}],["path",{d:"M20.5 20.5l-4.8-4.8"}]],baixar:[["path",{d:"M12 3.5v11"}],["path",{d:"M7.5 10.2 12 14.7l4.5-4.5"}],["path",{d:"M4.5 19.5h15"}]],subir:[["path",{d:"M12 14.5v-11"}],["path",{d:"M7.5 7.8 12 3.3l4.5 4.5"}],["path",{d:"M4.5 19.5h15"}]],copiar:[["rect",{x:"8.5",y:"8.5",width:"12",height:"12",rx:"2"}],["path",{d:"M15.5 8.5V5.5a2 2 0 0 0-2-2h-8a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h3"}]],restaurar:[["path",{d:"M9 14 4 9l5-5"}],["path",{d:"M4 9h9a7 7 0 0 1 7 7v4"}]],check:[["path",{d:"M20 6.5 9.2 17.3 4 12.1"}]],alerta:[["path",{d:"M10.3 4.4 2.8 17.6a2 2 0 0 0 1.7 3h15a2 2 0 0 0 1.7-3L13.7 4.4a2 2 0 0 0-3.4 0z"}],["path",{d:"M12 9.5v4"}],["circle",{cx:"12",cy:"16.8",r:"1",...so}]],menu:[["circle",{cx:"5",cy:"12",r:"1.4",...so}],["circle",{cx:"12",cy:"12",r:"1.4",...so}],["circle",{cx:"19",cy:"12",r:"1.4",...so}]],alca:[["circle",{cx:"9",cy:"6",r:"1.3",...so}],["circle",{cx:"15",cy:"6",r:"1.3",...so}],["circle",{cx:"9",cy:"12",r:"1.3",...so}],["circle",{cx:"15",cy:"12",r:"1.3",...so}],["circle",{cx:"9",cy:"18",r:"1.3",...so}],["circle",{cx:"15",cy:"18",r:"1.3",...so}]],ajustes:[["path",{d:"M4 7h5"}],["path",{d:"M13 7h7"}],["circle",{cx:"11",cy:"7",r:"2.1"}],["path",{d:"M4 17h9"}],["path",{d:"M17 17h3"}],["circle",{cx:"15",cy:"17",r:"2.1"}]],setaCima:[["path",{d:"M12 19V6"}],["path",{d:"M6 12l6-6 6 6"}]],setaBaixo:[["path",{d:"M12 5v13"}],["path",{d:"M18 12l-6 6-6-6"}]],recolher:[["path",{d:"M6 15l6-6 6 6"}]],expandir:[["path",{d:"M6 9l6 6 6-6"}]],local:[["path",{d:"M12 21s-6.5-6.1-6.5-11a6.5 6.5 0 0 1 13 0c0 4.9-6.5 11-6.5 11z"}],["circle",{cx:"12",cy:"10",r:"2.3"}]],sino:[["path",{d:"M6.5 16.5V11a5.5 5.5 0 0 1 11 0v5.5l1.5 1.5h-14z"}],["path",{d:"M10 20.5a2 2 0 0 0 4 0"}]],documento:[["path",{d:"M7 3.5h7l4 4v13H7z"}],["path",{d:"M14 3.5v4h4"}]],painel:[["rect",{x:"3.5",y:"4.5",width:"17",height:"15",rx:"2"}],["path",{d:"M14.5 4.5v15"}]],atualizar:[["path",{d:"M19.5 12a7.5 7.5 0 1 1-2.2-5.3"}],["path",{d:"M19.5 4.5v4h-4"}]],nuvem:[["path",{d:"M7 18.5h10a4 4 0 0 0 .6-7.95A5.5 5.5 0 0 0 7 9.5a4.5 4.5 0 0 0 0 9z"}]],chevron:[["path",{d:"M7 9.5l5 5 5-5"}]],pino:[["path",{d:"M9.5 3.5h5l-.8 5.2 3.3 3.1v1.7H7v-1.7l3.3-3.1z"}],["path",{d:"M12 13.5v7"}]],pinoCheio:[["path",{d:"M9.5 3.5h5l-.8 5.2 3.3 3.1v1.7H7v-1.7l3.3-3.1z",fill:"currentColor"}],["path",{d:"M12 13.5v7"}]],filtro:[["path",{d:"M4 5.5h16l-6.2 7.3v5.4l-3.6 1.8v-7.2z"}]],ordenar:[["path",{d:"M7.5 4.5v15"}],["path",{d:"M4 16l3.5 3.5L11 16"}],["path",{d:"M16.5 19.5v-15"}],["path",{d:"M13 8l3.5-3.5L20 8"}]],mapa:[["path",{d:"M9 4.5 3.5 6.6v13l5.5-2.1 6 2.1 5.5-2.1v-13L15 6.6z"}],["path",{d:"M9 4.5v13"}],["path",{d:"M15 6.6v13"}]],olho:[["path",{d:"M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z"}],["circle",{cx:"12",cy:"12",r:"2.8"}]],camadas:[["path",{d:"M12 3.5 20.5 8 12 12.5 3.5 8z"}],["path",{d:"M3.5 12 12 16.5 20.5 12"}],["path",{d:"M3.5 16 12 20.5 20.5 16"}]],historico:[["path",{d:"M3.8 12.5A8.3 8.3 0 1 0 6.2 6"}],["path",{d:"M3.8 4.2v4.3h4.3"}],["path",{d:"M12 8v4.2l2.8 1.7"}]],pessoa:[["circle",{cx:"12",cy:"8",r:"3.6"}],["path",{d:"M5 20c.9-3.7 3.6-5.6 7-5.6s6.1 1.9 7 5.6"}]],predio:[["path",{d:"M5 20.5v-15a1 1 0 0 1 1-1h7.5a1 1 0 0 1 1 1v15"}],["path",{d:"M14.5 9.5H18a1 1 0 0 1 1 1v10"}],["path",{d:"M3 20.5h18"}],["path",{d:"M8.5 8.5h3"}],["path",{d:"M8.5 12h3"}],["path",{d:"M8.5 15.5h3"}]],brilho:[["path",{d:"M12 3.5l1.9 5.1 5.1 1.9-5.1 1.9L12 17.5l-1.9-5.1L5 10.5l5.1-1.9z"}],["path",{d:"M18.5 16.5v4"}],["path",{d:"M16.5 18.5h4"}]],calendario:[["rect",{x:"4",y:"5.5",width:"16",height:"15",rx:"2"}],["path",{d:"M4 10h16"}],["path",{d:"M8.5 3.5v4"}],["path",{d:"M15.5 3.5v4"}]],cadeado:[["rect",{x:"5.5",y:"10.5",width:"13",height:"10",rx:"2"}],["path",{d:"M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5"}]],saida:[["path",{d:"M14 4.5h4.5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H14"}],["path",{d:"M10 16l4-4-4-4"}],["path",{d:"M14 12H4.5"}]],planilha:[["rect",{x:"4",y:"4",width:"16",height:"16",rx:"2"}],["path",{d:"M4 9.5h16"}],["path",{d:"M4 15h16"}],["path",{d:"M10 9.5V20"}]],mover:[["path",{d:"M4.5 12h14"}],["path",{d:"M13.5 6.5 19 12l-5.5 5.5"}]],sol:[["circle",{cx:"12",cy:"12",r:"3.8"}],["path",{d:"M12 2.8v2M12 19.2v2M2.8 12h2M19.2 12h2M5.5 5.5l1.4 1.4M17.1 17.1l1.4 1.4M5.5 18.5l1.4-1.4M17.1 6.9l1.4-1.4"}]],teclado:[["rect",{x:"3",y:"6.5",width:"18",height:"11",rx:"2"}],["path",{d:"M7 10h.01M10.3 10h.01M13.7 10h.01M17 10h.01M8 14h8"}]],gantt:[["path",{d:"M4 5h9M7 12h11M4 19h7"}],["path",{d:"M3 3v18"}]],demandas:[["circle",{cx:"10",cy:"7.8",r:"3.2"}],["path",{d:"M3.8 19.5a6.2 5.2 0 0 1 11.8-2.6"}],["circle",{cx:"17.6",cy:"17.6",r:"4.2"}],["path",{d:"m15.6 17.7 1.5 1.5 2.5-3"}]]},Ii=Object.keys(ct);function q(o,e=18,t=document){let r="http://www.w3.org/2000/svg",a=t.createElementNS(r,"svg"),n={viewBox:"0 0 24 24",width:String(e),height:String(e),fill:"none",stroke:"currentColor","stroke-width":"1.8","stroke-linecap":"round","stroke-linejoin":"round","aria-hidden":"true",focusable:"false",class:"spro-icone"};for(let[s,i]of Object.entries(n))a.setAttribute(s,i);for(let[s,i]of ct[o]){let c=t.createElementNS(r,s);for(let[l,d]of Object.entries(i))c.setAttribute(l,d);a.append(c)}return a}function lt(o,e,t,r=1e4){let a=URL.createObjectURL(new Blob([e],{type:t})),n=p("a",{href:a,download:o});document.body.append(n),n.click(),n.remove(),setTimeout(()=>URL.revokeObjectURL(a),r).unref?.()}var P=class extends Error{codigo;detalhe;constructor(e,t,r){super(t),this.name="ErroSei",this.codigo=e,this.detalhe=r}paraJSON(){return{codigo:this.codigo,mensagem:this.message,detalhe:this.detalhe}}};function Xe(o){if(o instanceof P)return o;if(o instanceof DOMException&&o.name==="AbortError")return new P("CANCELADO","Opera\xE7\xE3o cancelada.");let e=o instanceof Error?o.message:String(o);return new P("SEI_REDE",`Falha ao falar com o SEI: ${e}`)}var Dn={AElig:198,Aacute:193,Acirc:194,Agrave:192,Aring:197,Atilde:195,Auml:196,Ccedil:199,ETH:208,Eacute:201,Ecirc:202,Egrave:200,Euml:203,Iacute:205,Icirc:206,Igrave:204,Iuml:207,Ntilde:209,Oacute:211,Ocirc:212,Ograve:210,Oslash:216,Otilde:213,Ouml:214,THORN:222,Uacute:218,Ucirc:219,Ugrave:217,Uuml:220,Yacute:221,aacute:225,acirc:226,acute:180,aelig:230,agrave:224,amp:38,apos:39,aring:229,atilde:227,auml:228,brvbar:166,bull:8226,ccedil:231,cedil:184,cent:162,copy:169,curren:164,deg:176,divide:247,eacute:233,ecirc:234,egrave:232,eth:240,euml:235,euro:8364,frac12:189,frac14:188,frac34:190,gt:62,hellip:8230,iacute:237,icirc:238,iexcl:161,igrave:236,iquest:191,iuml:239,laquo:171,ldquo:8220,lsquo:8216,lt:60,macr:175,mdash:8212,micro:181,middot:183,nbsp:160,ndash:8211,not:172,ntilde:241,oacute:243,ocirc:244,ograve:242,ordf:170,ordm:186,oslash:248,otilde:245,ouml:246,para:182,plusmn:177,pound:163,quot:34,raquo:187,rdquo:8221,reg:174,rsquo:8217,sect:167,shy:173,sup1:185,sup2:178,sup3:179,szlig:223,thorn:254,times:215,trade:8482,uacute:250,ucirc:251,ugrave:249,uml:168,uuml:252,yacute:253,yen:165,yuml:255};function G(o){return o.includes("&")?o.replace(/&(#x[0-9a-fA-F]+|#\d+|[a-zA-Z][a-zA-Z0-9]*);/g,(e,t)=>{let r=t[0]==="#"?t[1]==="x"||t[1]==="X"?parseInt(t.slice(2),16):parseInt(t.slice(1),10):Dn[t];return r===void 0||Number.isNaN(r)?e:String.fromCodePoint(r)}):o}var pt={128:8364,130:8218,131:402,132:8222,133:8230,134:8224,135:8225,136:710,137:8240,138:352,139:8249,140:338,142:381,145:8216,146:8217,147:8220,148:8221,149:8226,150:8211,151:8212,152:732,153:8482,154:353,155:8250,156:339,158:382,159:376};var dt=null;function le(o){return dt?dt(o):new DOMParser().parseFromString(o,"text/html")}function V(o){return(o?.textContent??"").replace(/\s+/g," ").trim()}var In={n:`
`,r:"\r",t:"	",b:"\b",f:"\f",v:"\v",0:"\0"};function Ke(o,e){let t=o[e],r="";for(e+=1;e<o.length;){let a=o[e];if(a==="\\"){let n=o[e+1];if(n==="u"&&/^[0-9a-fA-F]{4}$/.test(o.slice(e+2,e+6))){r+=String.fromCharCode(parseInt(o.slice(e+2,e+6),16)),e+=6;continue}r+=In[n]??n,e+=2;continue}if(a===t)return[r,e+1];r+=a,e+=1}return[r,e]}function pe(o,e){let t=[],r=e;for(;r<o.length;){let a=o[r];if(a===")")return[t,r+1];if(a===","||/\s/.test(a)){r+=1;continue}if(a==='"'||a==="'"){let[i,c]=Ke(o,r);t.push(i),r=c;continue}let n=/^(null|true|false|-?\d+(?:\.\d+)?)/.exec(o.slice(r,r+32));if(n){let i=n[1];t.push(i==="null"?null:i==="true"?!0:i==="false"?!1:Number(i)),r+=i.length;continue}let s=0;for(;r<o.length;){let i=o[r];if(i==="(")s+=1;else if(i===")"){if(s===0)break;s-=1}else if(i===","&&s===0)break;r+=1}t.push(null)}return[t,r]}function go(o,e){let t=[],r=new RegExp(`\\b${e}\\(`,"g");for(let a of o.matchAll(r)){let[n]=pe(o,a.index+a[0].length);t.push(n)}return t}function R(o){return typeof o=="string"?G(o):o==null?"":String(o)}var $n=/controlador(?:_ajax)?\.php\?acao=[^"'\s<>\\]*?infra_hash=[0-9a-f]{64,192}/g;function ho(o){let e=new Set;for(let t of o.replace(/&amp;/g,"&").matchAll($n))e.add(t[0]);return[...e]}function X(o){let e=o.indexOf("?");return new URLSearchParams(e>=0?o.slice(e+1):"")}function to(o,e,t={}){let r=Array.isArray(o)?o:ho(o);for(let a of r){let n=X(a),s=n.get("acao")??"";if(!(typeof e=="string"?s!==e:!e.test(s))&&Object.entries(t).every(([i,c])=>n.get(i)===c))return a}return null}function ut(o,e){let t=[...o.doc.querySelectorAll("#infraMenu a[href], #main-menu a[href], .infraMenu a[href]")].map(s=>s.getAttribute("href")??"").join(`
`),r=ho(t).filter(s=>X(s).get("acao")===e),n=(r.length?r:ho(o.html).filter(s=>X(s).get("acao")===e)).sort((s,i)=>[...X(s).keys()].length-[...X(i).keys()].length)[0];if(!n)throw new P("SEI_ACAO_INDISPONIVEL",`O menu do SEI n\xE3o oferece "${e}" para este usu\xE1rio.`);return n}function zn(o){let e=new Map;for(let t of o.matchAll(/Nos\[(\d+)\]\s*=\s*new\s+infraArvoreNo\(/g)){let[r]=pe(o,t.index+t[0].length);e.set(Number(t[1]),{indice:Number(t[1]),args:r,props:{}})}for(let t of o.matchAll(/Nos\[(\d+)\]\.(\w+)\s*=\s*(['"])/g)){let r=e.get(Number(t[1]));if(!r)continue;let[a]=Ke(o,t.index+t[0].length-1);r.props[t[2]]=a}return[...e.values()].sort((t,r)=>t.indice-r.indice)}function Rn(o){let e=[];for(let t of o.matchAll(/new\s+infraArvoreAcao\(/g)){let[r]=pe(o,t.index+t[0].length);e.push({tipo:R(r[0]),idPai:R(r[2]),href:R(r[3]),titulo:R(r[5]),icone:R(r[6]),extra:r[8]==null?void 0:R(r[8])})}return e}function mt(o,e){let t=o.find(s=>s.tipo==="NIVEL_ACESSO"&&s.idPai===e);if(!t)return{nivel:"publico"};let[r,...a]=t.titulo.split(`
`);return{nivel:/sigilos/i.test(r)||/sigiloso/.test(t.icone)?"sigiloso":"restrito",hipotese:a.join(" ").trim()||void 0}}function ft(o){return[...new Set([...o.matchAll(/<img[^>]*\btitle="([^"]+)"/g)].map(e=>R(e[1])))]}var Tn=/\s*\(\d{5,}\)\s*$/;function Nn(o){let e=o.html,t=zn(e),r=Rn(e),a=t.find(c=>c.args[0]==="PROCESSO");if(!a)throw new P("SEI_VERSAO_NAO_SUPORTADA","A \xE1rvore do processo n\xE3o tem o n\xF3 do processo.");let n=R(a.args[1]),s=mt(r,n),i=t.filter(c=>c.args[0]==="DOCUMENTO").map(c=>{let l=R(c.args[1]),d=R(c.args[5]),m=R(c.args[7]),f=(c.props.src??"").replace(/&amp;/g,"&"),x=r.find(A=>A.tipo==="ASSINATURA"&&A.idPai===l),{nivel:y,hipotese:k}=mt(r,l),_=(/documento_([a-z0-9]+)\.svg/.exec(m)?.[1]??"interno").replace("cancelado","interno");return{id:l,numero:R(c.args[15])||(/\((\d{5,})\)\s*$/.exec(d)?.[1]??""),titulo:d.replace(Tn,""),pasta:c.args[2]&&String(c.args[2]).startsWith("PASTA")?String(c.args[2]):null,externo:/documento_download_anexo/.test(f)||!/documento_interno|documento_cancelado|formulario|email/.test(m),formato:_,nivel:y,hipotese:k,assinado:!!x,assinaturas:x?x.titulo.split(`
`).slice(1).filter(Boolean):[],cancelado:/documento_cancelado/.test(m),unidadeGeradora:r.find(A=>A.tipo==="UNIDADE_GERADORA"&&A.idPai===l)?.extra,link:R(c.args[3]).replace(/&amp;/g,"&"),src:f,acoes:ho(c.props.acoes??""),botoes:ft(c.props.acoes??"")}});return{idProcedimento:n,protocolo:R(a.args[5])||R(a.args[15]),tipo:R(a.args[6]),nivel:s.nivel,hipotese:s.hipotese,marcadores:r.filter(c=>c.tipo==="MARCADOR"&&c.idPai===n).map(c=>c.titulo.replace(/^Marcador\n/,"").replace(/\n/g," \u2014 ")),documentos:i,acoesProcesso:ho(a.props.acoes??""),botoesProcesso:ft(a.props.acoes??""),linkProcesso:R(a.args[3]).replace(/&amp;/g,"&"),sinais:r.filter(c=>c.idPai===n),links:ho(e),pagina:o}}async function gt(o,e,t){let r=await o.obter(e,t);if(!/acao=procedimento_visualizar/.test(r.url)){let a=r.doc.querySelector("#ifrArvore")?.getAttribute("src");if(!a)throw new P("SEI_NAO_ENCONTRADO","N\xE3o foi poss\xEDvel abrir a \xE1rvore do processo.");r=await o.obter(a,t)}if(/infraArvoreNo\("PASTA"/.test(r.html)){let a=to(r.html,"procedimento_visualizar")&&ho(r.html).find(n=>/abrir_pastas=1/.test(n));a&&(r=await o.obter(a,t))}return Nn(r)}function vo(o,e,t){if(t){let r=o.documentos.find(a=>a.id===t);return r?to(r.acoes,e):null}return to(o.acoesProcesso,e)??to(o.links,e,{id_procedimento:o.idProcedimento})}function ao(o,e,t){let r=(e??"").trim(),a=(t??"").trim();return t===void 0||r===a?[]:[{campo:o,antes:r,depois:a}]}var Go={publico:"0",restrito:"1"},de={0:"P\xFAblico",1:"Restrito",2:"Sigiloso"};async function Uo(o,e,t,r){let a=/controlador_ajax\.php\?acao_ajax=hipotese_legal_select[^'"]*/.exec(e.pagina.html)?.[0];return a?o.ajax(G(a),[["primeiroItemValor","null"],["primeiroItemDescricao"," "],["valorItemSelecionado",""],["staNivelAcesso",t]],{sinal:r}):e.opcoes("selHipoteseLegal").filter(n=>n.valor!=="null").map(n=>({id:n.valor,texto:n.texto}))}var xt="\xA5",Je="\xB1";function ht(o){return o.map(e=>`${e.id}${Je}${e.texto}`).join(xt)}function _n(o){return o?o.split(xt).map(e=>{let[t,...r]=e.split(Je);return{id:t,texto:r.join(Je)}}):[]}function vt(o){let e=[];for(let t of o.matchAll(/new\s+infraLupaSelect\(\s*['"]([\w-]+)['"]\s*,\s*['"]([\w-]+)['"]/g))e.push([t[1],t[2]]);return e}var F=class o{constructor(e,t,r){this.http=e;this.pagina=t;this.elemento=r,this.id=r.id,this.action=(r.getAttribute("action")??"").replace(/&amp;/g,"&"),this.campos=qn(r),this.sincronizarLupas()}id;action;campos;elemento;static async abrir(e,t,r,a){let n=await e.obter(t,a);return o.de(n,r,e)}static de(e,t,r=null){let a=e.doc.querySelector(t);if(!a)throw new P("SEI_VERSAO_NAO_SUPORTADA",`A tela do SEI n\xE3o tem o formul\xE1rio esperado (${t}).`,V(e.doc.querySelector("title")));return new o(r,e,a)}pares(){return this.campos.map(e=>[e.nome,e.valor])}valor(e){return this.campos.find(t=>t.nome===e)?.valor}tem(e){return this.elemento.querySelector(`[name="${e}"]`)!==null||this.campos.some(t=>t.nome===e)}opcoes(e){let t=this.elemento.querySelector(`select[name="${e}"], select#${bt(e)}`);return t?[...t.querySelectorAll("option")].map(r=>({valor:r.getAttribute("value")??V(r),texto:V(r),selecionada:r.hasAttribute("selected")})):[]}definir(e){for(let[t,r]of Object.entries(e)){if(r===void 0)continue;if(r===null){this.campos=this.campos.filter(n=>n.nome!==t);continue}let a=this.campos.find(n=>n.nome===t);a?a.valor=r:this.campos.push({nome:t,valor:r})}return this}escolher(e,t){let r=this.opcoes(e),a=K(t),n=r.find(s=>s.valor===t)??r.find(s=>K(s.texto)===a)??We(r.filter(s=>K(s.texto).includes(a)));if(!n)throw new P("ARGUMENTO_INVALIDO",`"${t}" n\xE3o \xE9 uma op\xE7\xE3o de ${e}.`,r.slice(0,40).map(s=>s.texto).join(" | "));return this.definir({[e]:n.valor}),n}linhas(e){return[...this.elemento.querySelectorAll(`${e} tr`)].filter(t=>t.querySelector("input[type=checkbox]"))}itensLupa(e){let t=this.hiddenDaLupa(e);return t?_n(this.valor(t)??""):[]}definirLupa(e,t){let r=this.hiddenDaLupa(e);if(!r)throw new P("SEI_VERSAO_NAO_SUPORTADA",`A lupa ${e} n\xE3o existe nesta tela.`);return this.definir({[r]:ht(t)}),this.campos=this.campos.filter(a=>a.nome!==e&&a.nome!==`${e}[]`),this}async enviar(e={}){if(!this.http)throw new P("SEI_RESPOSTA_INESPERADA","Formul\xE1rio sem transporte HTTP.");if(!this.action)throw new P("SEI_VERSAO_NAO_SUPORTADA",`O formul\xE1rio ${this.id} n\xE3o tem action.`);let t=this.pares();e.botao&&t.push(this.botaoDeEnvio(e.botao));let r=await this.http.enviar(this.action,t,e);if(e.sucesso&&!e.sucesso(r))throw new P("SEI_RESPOSTA_INESPERADA",`O SEI n\xE3o confirmou ${e.operacao??"a opera\xE7\xE3o"}.`,`${V(r.doc.querySelector("title"))} \u2014 ${r.url.replace(/infra_hash=\w+/,"infra_hash=\u2026")}`);return r}botaoDeEnvio(e){let t=this.elemento.querySelector(`[name="${e}"]`)??We([...this.elemento.querySelectorAll('button[type="submit"][name^="sbm"], input[type="submit"][name^="sbm"]')]);return t?[t.getAttribute("name")??e,t.getAttribute("value")??V(t)??e]:[e,e]}hiddenDaLupa(e){let t=vt(this.pagina.html).find(([r])=>r===e);return t?t[1]:null}sincronizarLupas(){for(let[e,t]of vt(this.pagina.html)){let r=this.elemento.querySelector(`select#${bt(e)}`);if(!r)continue;let a=[...r.querySelectorAll("option")].map(n=>({id:n.getAttribute("value")??"",texto:V(n)}));(this.valor(t)??"")||this.definir({[t]:ht(a)}),this.campos=this.campos.filter(n=>n.nome!==e&&n.nome!==`${e}[]`)}}};function qn(o){let e=[];for(let t of o.querySelectorAll("input, select, textarea")){let r=t.getAttribute("name");if(!r||t.hasAttribute("disabled"))continue;let a=t.tagName.toLowerCase();if(a==="input"){let n=(t.getAttribute("type")??"text").toLowerCase();if(["submit","button","image","reset","file"].includes(n)||(n==="checkbox"||n==="radio")&&!t.hasAttribute("checked"))continue;e.push({nome:r,valor:t.getAttribute("value")??(n==="checkbox"||n==="radio"?"on":"")})}else if(a==="textarea")e.push({nome:r,valor:t.textContent??""});else{let n=[...t.querySelectorAll("option")],s=n.filter(l=>l.hasAttribute("selected")),i=t.hasAttribute("multiple"),c=s.length?s:!i&&n.length?[n[0]]:[];for(let l of c)e.push({nome:r,valor:l.getAttribute("value")??V(l)})}}return e}function K(o){return o.normalize("NFD").replace(/[\u0300-\u036F]/g,"").toLowerCase().replace(/\s+/g," ").trim()}function Ze(o,e,t){let r=K(e),a=o.find(n=>n.id===e)??o.find(n=>K(n.texto)===r)??We(o.filter(n=>K(n.texto).includes(r)));if(!a)throw new P("ARGUMENTO_INVALIDO",`${t} "${e}" n\xE3o encontrado(a) ou amb\xEDguo(a).`,o.slice(0,40).map(n=>n.texto).join(" | "));return a}function We(o){return o.length===1?o[0]:void 0}function bt(o){return o.replace(/([^\w-])/g,"\\$1")}async function Vn(o,e,t){let r=vo(e,"documento_escolher_tipo");if(!r)throw new P("SEI_ACAO_INDISPONIVEL",`N\xE3o \xE9 poss\xEDvel incluir documento no processo ${e.protocolo} (fechado na unidade?).`);let a=await F.abrir(o.http,r,"#frmDocumentoEscolherTipo",{sinal:t});if(a.tem("hdnFiltroSerie")&&a.valor("hdnFiltroSerie")!=="T"){let n=await a.definir({hdnFiltroSerie:"T"}).enviar({sinal:t});a=F.de(n,"#frmDocumentoEscolherTipo",o.http)}return a}function Hn(o){let e=new Map;for(let t of o.doc.querySelectorAll("[onclick*='escolher(']")){let r=/escolher\((-?\d+)\)/.exec(t.getAttribute("onclick")??"")?.[1];r&&!e.has(r)&&e.set(r,V(t))}for(let t of o.doc.querySelectorAll("a[href*='id_serie=']")){let r=X(t.getAttribute("href")??"").get("id_serie");r&&!e.has(r)&&e.set(r,V(t))}return[...e].filter(([,t])=>t).map(([t,r])=>({id:t,nome:r}))}async function yt(o,e,t){let r=await o.arvore(e,{sinal:t});return Hn((await Vn(o,r,t)).pagina)}var At={tipos_processo:{acao:"procedimento_alterar",form:"#frmProcedimentoCadastro",campo:"selTipoProcedimento"},hipoteses_legais:{acao:"procedimento_alterar",form:"#frmProcedimentoCadastro",campo:"selHipoteseLegal"},usuarios:{acao:"procedimento_atribuicao_cadastrar",form:"#frmAtividadeAtribuir",campo:"selAtribuicao"},marcadores:{acao:"andamento_marcador_gerenciar",form:"#frmAndamentoMarcadorCadastro",campo:"selMarcador"},grupos_acompanhamento:{acao:"acompanhamento_gerenciar",form:"#frmAcompanhamentoCadastro",campo:"selGrupoAcompanhamento"}};async function Et(o,e,t,r={}){let a;if(e==="tipos_documento")a=(await yt(o,t,r.sinal)).map(s=>({id:s.id,nome:s.nome}));else{let s=At[e];if(!s)throw new P("ARGUMENTO_INVALIDO",`Lista desconhecida: ${e}.`,Object.keys(At).concat("tipos_documento").join(" | "));let i=await o.arvore(t,{sinal:r.sinal}),c=vo(i,s.acao);if(!c)throw new P("SEI_ACAO_INDISPONIVEL",`Para listar ${e} use um processo aberto na sua unidade.`);if(e==="marcadores"&&(c=to((await o.http.obter(c,{sinal:r.sinal,aceitarValidacao:!0})).html,"andamento_marcador_cadastrar"),!c))throw new P("SEI_VERSAO_NAO_SUPORTADA","Tela de marcadores n\xE3o reconhecida.");let l=await F.abrir(o.http,c,s.form,{sinal:r.sinal,aceitarValidacao:!0});a=e==="hipoteses_legais"?(await Uo(o,l,"1",r.sinal)).map(d=>({id:d.id,nome:d.texto})):l.opcoes(s.campo).filter(d=>d.valor&&d.valor!=="null"&&d.texto).map(d=>({id:d.valor,nome:d.texto}))}let n=r.filtro?K(r.filtro):"";return n?a.filter(s=>K(s.nome).includes(n)):a}function St(o,e){let t=o.valor(e);return o.opcoes(e).find(r=>r.valor===t&&t!=="null")?.texto??""}async function Fn(o,e,t){let r=vo(e,"procedimento_alterar"),a=r??vo(e,"procedimento_consultar");if(!a)throw new P("SEI_ACAO_INDISPONIVEL",`O SEI n\xE3o oferece a consulta do processo ${e.protocolo} para voc\xEA.`);return{form:await F.abrir(o,a,"#frmProcedimentoCadastro",t),editavel:!!r}}function wt(o){return o.map(e=>e.texto).filter(Boolean)}async function Pt(o,e,t,r){let a=await o.arvore(e,{sinal:r.sinal});if(a.nivel==="sigiloso")throw new P("SEI_SIGILOSO","Processo sigiloso: o agente n\xE3o atua nele.");let{form:n,editavel:s}=await Fn(o.http,a,{sinal:r.sinal});if(!s)throw new P("SEI_ACAO_INDISPONIVEL",`O processo ${a.protocolo} n\xE3o est\xE1 aberto na sua unidade.`);let i=[];if(t.especificacao!==void 0&&(i.push(...ao("Especifica\xE7\xE3o",n.valor("txtDescricao"),t.especificacao)),n.definir({txtDescricao:t.especificacao.slice(0,100)})),t.tipo!==void 0){let l=St(n,"selTipoProcedimento"),d=n.escolher("selTipoProcedimento",t.tipo);n.definir({hdnIdTipoProcedimento:d.valor}),i.push(...ao("Tipo",l,d.texto))}if(t.nivel!==void 0){let l=de[n.valor("rdoNivelAcesso")??""]??"";n.definir({rdoNivelAcesso:Go[t.nivel]}),i.push(...ao("N\xEDvel de acesso",l,de[Go[t.nivel]])),t.nivel==="publico"&&n.definir({selHipoteseLegal:"null"})}if(t.hipotese!==void 0){let l=St(n,"selHipoteseLegal"),d=n.valor("rdoNivelAcesso")||Go.restrito,m=Ze(await Uo(o,n,d,r.sinal),t.hipotese,"Hip\xF3tese legal");n.definir({selHipoteseLegal:m.id}),i.push(...ao("Hip\xF3tese legal",l,m.texto))}if(n.valor("rdoNivelAcesso")==="1"&&(n.valor("selHipoteseLegal")??"null")==="null")throw new P("ARGUMENTO_INVALIDO","Processo restrito exige hip\xF3tese legal. Informe a hip\xF3tese.");t.observacoes!==void 0&&(i.push(...ao("Observa\xE7\xF5es da unidade",n.valor("txaObservacoes"),t.observacoes)),n.definir({txaObservacoes:t.observacoes})),t.interessados!==void 0&&(i.push(...ao("Interessados",wt(n.itensLupa("selInteressadosProcedimento")).join("; "),wt(t.interessados).join("; "))),n.definirLupa("selInteressadosProcedimento",t.interessados));let c={alvo:a.protocolo,mudancas:i,aplicado:!1,resumo:""};return i.length?r.aplicar?(n.definir({hdnFlagProcedimentoCadastro:"2"}),await n.enviar({sinal:r.sinal,operacao:`a altera\xE7\xE3o do processo ${a.protocolo}`,sucesso:l=>X(l.url).get("acao")!=="procedimento_alterar"}),o.invalidar(a.idProcedimento),{...c,aplicado:!0,resumo:`Processo ${a.protocolo} alterado.`}):{...c,resumo:`${i.length} campo(s) a alterar.`}:{...c,resumo:"Nada a alterar: os valores j\xE1 s\xE3o esses."}}async function kt(o,e,t){let r=await o.arvore(e,{sinal:t});if(r.nivel==="sigiloso")throw new P("SEI_SIGILOSO","Processo sigiloso: o agente n\xE3o atua nele.");return r}function Ct(o,e,t){let r=vo(o,e);if(!r)throw new P("SEI_ACAO_INDISPONIVEL",`"${t}" n\xE3o est\xE1 dispon\xEDvel no processo ${o.protocolo} (processo fechado na unidade ou sem permiss\xE3o).`);return r}var Ot=o=>e=>X(e.url).get("acao")!==o;async function jn(o,e,t,r){let a=await o.http.obter(Ct(e,t.acao,t.nomeAcao),{sinal:r,aceitarValidacao:!0});if(a.doc.querySelector(t.form))return F.de(a,t.form,o.http);let n=(t.formularios??[]).map(s=>to(a.html,s)).find(Boolean);if(!n)throw new P("SEI_VERSAO_NAO_SUPORTADA",`A tela "${t.nomeAcao}" n\xE3o tem o formul\xE1rio esperado.`);return F.abrir(o.http,n,t.form,{sinal:r,aceitarValidacao:!0})}async function Lt(o,e,t,r){let a=await kt(o,e,r.sinal),n=await jn(o,a,t,r.sinal),s=t.preparar(n),i={alvo:a.protocolo,mudancas:s,aplicado:!1,resumo:""};return s.length?r.aplicar?(await n.enviar({sinal:r.sinal,botao:t.botao,operacao:`${t.nomeAcao} em ${a.protocolo}`,sucesso:t.sucesso??Ot(t.acao)}),o.invalidar(a.idProcedimento),{...i,aplicado:!0,resumo:t.resumo(a.protocolo).replace(/^Vai /,"")}):{...i,resumo:t.resumo(a.protocolo)}:{...i,resumo:"Nada a alterar: j\xE1 est\xE1 assim."}}function Dt(o,e,t,r){return Lt(o,e,{acao:"anotacao_registrar",nomeAcao:"Anota\xE7\xF5es",form:"#frmAnotacaoCadastro",botao:"sbmRegistrarAnotacao",preparar:a=>{let n=t.texto.slice(0,500),s=ao("Anota\xE7\xE3o",a.valor("txaDescricao"),n),i=a.valor("chkSinPrioridade")?"sim":"n\xE3o",c=n?t.prioridade===void 0?i:t.prioridade?"sim":"n\xE3o":"n\xE3o";return a.definir({txaDescricao:n,chkSinPrioridade:c==="sim"?"on":null}),[...s,...ao("Prioridade",i,c)]},resumo:a=>t.texto?`Anota\xE7\xE3o definida em ${a}.`:`Anota\xE7\xE3o removida de ${a}.`},r)}function It(o,e,t,r){return Lt(o,e,{acao:"procedimento_atribuicao_cadastrar",nomeAcao:"Atribuir Processo",form:"#frmAtividadeAtribuir",botao:"sbmSalvar",preparar:a=>{let n=a.opcoes("selAtribuicao").find(l=>l.valor===a.valor("selAtribuicao")&&l.valor!=="null")?.texto??"";if(t===null)return a.definir({selAtribuicao:"null"}),[{campo:"Atribui\xE7\xE3o",antes:n||"(atribui\xE7\xE3o atual)",depois:"(nenhuma)"}];let s=K(t),i=a.opcoes("selAtribuicao").filter(l=>l.valor!=="null"),c=i.find(l=>l.valor===t)??i.find(l=>K(l.texto.split(" - ")[0])===s)??i.find(l=>K(l.texto.split(" - ").slice(1).join(" - "))===s)??(i.filter(l=>K(l.texto).includes(s)).length===1?i.find(l=>K(l.texto).includes(s)):void 0);if(!c)throw new P("ARGUMENTO_INVALIDO",`Usu\xE1rio "${t}" n\xE3o encontrado (ou amb\xEDguo) na unidade.`,i.map(l=>l.texto).join(" | "));return a.definir({selAtribuicao:c.valor}),ao("Atribui\xE7\xE3o",n,c.texto)},resumo:a=>t?`Processo ${a} atribu\xEDdo.`:`Atribui\xE7\xE3o removida de ${a}.`},r)}async function Gn(o,e,t){let r=Ct(e,"andamento_marcador_gerenciar","Gerenciar Marcador");return o.http.obter(r,{sinal:t,aceitarValidacao:!0})}function Mt(o){return[...o.doc.querySelectorAll("#tblMarcadores tr")].filter(t=>t.querySelector("input[type=checkbox]")).map(t=>{let r=[...t.querySelectorAll("td")];return{id:t.querySelector("input[type=checkbox]")?.getAttribute("value")??"",marcador:V(r[1]),texto:V(r[2]),usuario:V(r[3]),data:V(r[4])}})}async function $t(o,e,t,r){let a=await kt(o,e,r.sinal),n=await Gn(o,a,r.sinal),s=Mt(n),i=K(t.marcador),c=s.find(f=>K(f.marcador)===i),l={alvo:a.protocolo,mudancas:[],aplicado:!1,resumo:""};if(t.remover){if(!c)return{...l,resumo:`O processo ${a.protocolo} n\xE3o tem o marcador "${t.marcador}".`};if(l.mudancas=[{campo:"Marcador",antes:`${c.marcador}${c.texto?`: ${c.texto}`:""}`,depois:""}],!r.aplicar)return{...l,resumo:`Vai remover o marcador "${c.marcador}" de ${a.protocolo}.`};let f=to(n.html,"andamento_marcador_remover");if(!f)throw new P("SEI_ACAO_INDISPONIVEL","A tela de marcadores n\xE3o oferece remo\xE7\xE3o.");let x=F.de(n,"#frmGerenciarMarcador",o.http);x.definir({hdnInfraItemId:c.id,hdnInfraItensSelecionados:c.id});let y=await o.http.enviar(f,x.pares(),{sinal:r.sinal,aceitarValidacao:!0});if(Mt(y).some(k=>k.id===c.id))throw new P("SEI_RESPOSTA_INESPERADA",`O SEI n\xE3o removeu o marcador "${c.marcador}".`);return o.invalidar(a.idProcedimento),{...l,aplicado:!0,resumo:`Marcador "${c.marcador}" removido de ${a.protocolo}.`}}let d;if(n.doc.querySelector("#frmAndamentoMarcadorCadastro"))d=F.de(n,"#frmAndamentoMarcadorCadastro",o.http);else{let f=to(n.html,"andamento_marcador_cadastrar");if(!f)throw new P("SEI_VERSAO_NAO_SUPORTADA","Esta vers\xE3o do SEI n\xE3o tem a tela de marcadores esperada (4.1 ou superior).");d=await F.abrir(o.http,f,"#frmAndamentoMarcadorCadastro",{sinal:r.sinal})}let m=d.escolher("selMarcador",t.marcador);return d.definir({hdnIdMarcador:m.valor,txaTexto:(t.texto??c?.texto??"").slice(0,250)}),l.mudancas=c?ao(`Texto do marcador ${m.texto}`,c.texto,t.texto):[{campo:"Marcador",antes:"",depois:`${m.texto}${t.texto?`: ${t.texto}`:""}`}],l.mudancas.length?r.aplicar?(await d.enviar({sinal:r.sinal,botao:"sbmSalvar",operacao:`o marcador em ${a.protocolo}`,sucesso:Ot("andamento_marcador_cadastrar")}),o.invalidar(a.idProcedimento),{...l,aplicado:!0,resumo:`Marcador "${m.texto}" aplicado em ${a.protocolo}.`}):{...l,resumo:`Vai marcar ${a.protocolo} com "${m.texto}".`}:{...l,resumo:"Nada a alterar: o marcador j\xE1 est\xE1 assim."}}var Un={"\u2010":"-","\u2011":"-","\u2012":"-","\u2013":"-","\u2014":"-","\u2015":"-","\u2212":"-","\u2018":"'","\u2019":"'","\u201A":"'","\u201B":"'","\u2032":"'","\u201C":'"',"\u201D":'"',"\u201E":'"',"\u201F":'"',"\u2033":'"',"\u2026":"...","\u2022":"-","\u2002":" ","\u2003":" ","\u2009":" ","\u202F":" ","\u205F":" ","\u200B":"","\u200C":"","\u200D":"","\u2060":"","\uFEFF":"","\u20AC":"EUR","\u2122":"(TM)","\u2192":"->","\u2190":"<-"};function zt(o,e="texto"){let t="";for(let r of o){let a=r.codePointAt(0);if(a<=255){t+=r;continue}let n=Un[r];if(e==="html"){t+=n===""?"":`&#${a};`;continue}if(n!==void 0){t+=n;continue}let s=r.normalize("NFKD").replace(/[\u0300-\u036F]/g,"");t+=[...s].every(i=>i.codePointAt(0)<=255)?s:""}return t}var Bn=/[A-Za-z0-9\-_.*]/;function Rt(o){let e="";for(let t of o)t===" "?e+="+":Bn.test(t)?e+=t:e+="%"+t.charCodeAt(0).toString(16).toUpperCase().padStart(2,"0");return e}function Tt(o,e={}){return o.map(([t,r])=>{let a=e[t]??"texto";return`${Rt(zt(t))}=${Rt(zt(r??"",a))}`}).join("&")}function Ye(o){let e=o instanceof Uint8Array?o:new Uint8Array(o),t=[],r=16384;for(let a=0;a<e.length;a+=r){let n=e.subarray(a,a+r),s=new Array(n.length);for(let i=0;i<n.length;i+=1)s[i]=pt[n[i]]??n[i];t.push(String.fromCharCode(...s))}return t.join("")}var Nt="application/x-www-form-urlencoded; charset=ISO-8859-1";function _t(o,e,t){let r=null;return{url:o,status:e,html:t,get doc(){return r??=le(t)}}}function qt(o,e={}){if(/\/login\.php/i.test(o.url)||/[?&]acao=(?:infra_)?sair\b/.test(o.url))throw new P("SEI_SESSAO_EXPIRADA","A sess\xE3o do SEI foi encerrada. Fa\xE7a login de novo no SEI e repita o pedido.");if(o.status>=500)throw new P("SEI_EXCECAO",`O SEI respondeu com erro ${o.status}.`);if(o.html.includes('id="divInfraExcecao"')){let t=o.doc.querySelector("#divInfraExcecao");if(t){let r=V(t);throw new P("SEI_EXCECAO",r||"O SEI exibiu uma p\xE1gina de erro.",r)}}if(!e.aceitarValidacao&&o.html.includes("txaInfraValidacao")){let t=o.doc.querySelector("#txaInfraValidacao")?.textContent?.trim()??"";if(t)throw new P("SEI_VALIDACAO",t,t)}return o}function Vt(o,e={}){let t=new URL(".",o),r=e.fetch??((...m)=>fetch(...m)),a=Math.max(1,e.concorrencia??3),n=0,s=[];async function i(m){n>=a&&await new Promise(f=>s.push(f)),n+=1;try{return await m()}finally{n-=1,s.shift()?.()}}let c=m=>new URL(m.replace(/&amp;/g,"&"),t).href;async function l(m,f,x){return i(async()=>{try{let y=await r(c(m),{credentials:"same-origin",redirect:"follow",...f,signal:x.sinal}),k=Ye(await y.arrayBuffer());return qt(_t(y.url||c(m),y.status,k),x)}catch(y){throw Xe(y)}})}async function d(m,f={}){return i(async()=>{try{let x=await r(c(m),{credentials:"same-origin",redirect:"follow",signal:f.sinal}),y=new Uint8Array(await x.arrayBuffer()),k=(x.headers?.get("content-type")??"").split(";")[0].trim().toLowerCase();k==="text/html"&&qt(_t(x.url||c(m),x.status,Ye(y)),f);let _=x.headers?.get("content-disposition")??"",A=decodeURIComponent(/filename\*=UTF-8''([^;]+)/i.exec(_)?.[1]??/filename="?([^";]+)"?/i.exec(_)?.[1]??"");return{bytes:y,tipo:k,nome:A}}catch(x){throw Xe(x)}})}return{base:t,absoluta:c,baixar:d,obter:(m,f={})=>l(m,{method:"GET"},f),enviar:(m,f,x={})=>l(m,{method:"POST",headers:{"Content-Type":Nt},body:Tt(f,x.modos)},x)}}function Qn(o){let e=/Sistema Eletr(?:\u00F4|&ocirc;|\\u00F4)nico de Informa[^"]*?Vers(?:\u00E3|&atilde;)o\s*([\d.]+)/i.exec(o);return e?e[1]:/\.(?:js|svg|css)\?(\d+\.\d+\.\d+)-/.exec(o)?.[1]??""}function Xn(o){let e=o.doc.querySelector("#lnkInfraUnidade")?.getAttribute("onclick")??"",t=/infra_unidade_atual=(\d+)/.exec(e)?.[1];if(t)return t;let r=/[?&]infra_unidade_atual=(\d+)/.exec(o.url)?.[1];return r||(o.doc.querySelector("#selInfraUnidades option[selected]")?.getAttribute("value")??"")}function or(o){let e=o.doc,t=e.querySelector("#lnkInfraUnidade"),r=e.querySelector("#lnkUsuarioSistema")?.getAttribute("title")??"",[,a="",n="",s=""]=/^(.*?)\s*\(([^/)]+)(?:\/([^)]+))?/.exec(r)??[],i=Qn(o.html);return{host:new URL(o.url).host,versao:i,maior:Number(i.split(".")[0])||0,unidade:{id:Xn(o),sigla:V(t)||V(e.querySelector("#selInfraUnidades option[selected]")),nome:t?.getAttribute("title")??""},usuario:{nome:a.trim(),login:n.trim(),orgao:s.trim()}}}var Kn=3e4,ue=class{constructor(e,t=null,r){this.paginaViva=t;this.http=Vt(e,r)}http;paginaBase=null;arvores=new Map;localizados=new Map;base(){let e=this.paginaViva?.();if(e&&e.html.includes("frmProtocoloPesquisaRapida"))return e;if(this.paginaBase)return this.paginaBase;if(e)return e;throw new P("SEI_NAO_ENCONTRADO","Abra uma tela do SEI (por exemplo, Controle de Processos) nesta aba.")}contexto(){return or(this.base())}linkMenu(e){return ut(this.base(),e)}async renovarBase(e){return this.paginaBase=await this.http.obter(this.linkMenu("procedimento_controlar"),e),this.arvores.clear(),this.localizados.clear(),this.paginaBase}async localizar(e,t){let r=e.trim();if(!r)throw new P("ARGUMENTO_INVALIDO","Informe o n\xFAmero do processo ou o n\xBA SEI do documento.");let a=this.localizados.get(r);if(a)return a;let n=F.de(this.base(),"#frmProtocoloPesquisaRapida",this.http);n.definir({txtPesquisaRapida:r});let s=await n.enviar(t),i=X(s.url);if(i.get("acao")!=="procedimento_trabalhar")throw new P("SEI_NAO_ENCONTRADO",`Nada encontrado no SEI para "${r}", ou voc\xEA n\xE3o tem acesso a ele.`);let c=s.doc.querySelector("#ifrArvore")?.getAttribute("src");if(!c)throw new P("SEI_VERSAO_NAO_SUPORTADA","A tela do processo n\xE3o trouxe a \xE1rvore.");let d=X(G(c)).get("id_procedimento")??"",m=i.get("id_protocolo")??"",f={idProcedimento:d,idDocumento:m&&m!==d?m:void 0,linkArvore:G(c)};return this.localizados.set(r,f),f}async arvore(e,t={}){let r=await this.localizar(e,t),a=this.arvores.get(r.idProcedimento);if(a&&!t.forcar&&Date.now()-a.quando<Kn)return a.arvore;let n=await gt(this.http,r.linkArvore,t);return this.arvores.set(r.idProcedimento,{quando:Date.now(),arvore:n}),n}invalidar(e){e?this.arvores.delete(e):this.arvores.clear()}async ajax(e,t,r){let a=await this.http.enviar(e,t,{...r,aceitarValidacao:!0}),n=[];for(let s of a.html.matchAll(/<option[^>]*value="([^"]*)"[^>]*>([^<]*)<\/option>/g))n.push({id:G(s[1]),texto:G(s[2]).trim()});for(let s of a.html.matchAll(/<item\s+([^>]*)>/g)){let i=le(`<i ${s[1]}></i>`).querySelector("i");n.push({id:i?.getAttribute("id")??"",texto:i?.getAttribute("descricao")??i?.getAttribute("complemento")??""})}return n.filter(s=>s.id&&s.id!=="null")}};function Bo(o,e=o.location?.href??"https://sei.invalido/sei/controlador.php"){return{url:e,status:200,get html(){return o.documentElement.outerHTML},doc:o}}var Jn='a[onclick*="acaoControleProcessos"]';function Ht(o){let e=new Set,t=[];for(let r of o.querySelectorAll(Jn)){let a=/[?&]acao=([a-z0-9_]+)/.exec(r.getAttribute("onclick")??"")?.[1],n=r.querySelector("img");if(!a||!n||e.has(a))continue;e.add(a);let s=n.getAttribute("title")||n.getAttribute("alt")||a,i=n.getAttribute("src")??"";try{i=new URL(i,o.baseURI||o.location?.href).href}catch{}t.push({acao:a,rotulo:s,icone:i,elemento:r})}return t}var me="data-tip";var Wn=`
:host { all: initial; }
.dica { position: fixed; inset: auto; margin: 0; border: 0; overflow: visible; z-index: 2147483647; max-width: 320px; padding: 6px 10px; font: 12px/1.45 system-ui, -apple-system, "Segoe UI", Roboto, sans-serif; color: #fff; white-space: pre-line; pointer-events: none; background: #1b1f24; border-radius: 8px; box-shadow: 0 6px 18px rgb(0 0 0 / 28%); opacity: 0; transform: translateY(2px); transition: opacity 120ms ease, transform 120ms ease; }
.dica.claro { color: #1b1f24; background: #fff; box-shadow: 0 6px 18px rgb(0 0 0 / 22%), 0 0 0 1px rgb(0 0 0 / 10%); }
.dica.on { opacity: 1; transform: none; }
.dica[hidden] { display: none; }
@media (prefers-reduced-motion: reduce) { .dica { transition: none; } }
`,Ft=o=>o.nodeType===1,Zn=o=>o.some(e=>Ft(e)&&(e.id==="spro-grade"||e.classList.contains("spro-grade-botao")));function er(o){if(!Zn(o))return null;for(let e of o)if(Ft(e)){if(e.id==="spro-grade")return null;if(e.hasAttribute(me)||e.hasAttribute("title"))return e}return null}function ko(o){let e=o.getAttribute("title");return e&&(o.hasAttribute(me)||o.setAttribute(me,e),!o.hasAttribute("aria-label")&&!(o.textContent??"").trim()&&o.setAttribute("aria-label",e.split(`
`)[0]),o.removeAttribute("title")),o.getAttribute(me)??""}var rr=null;function jt(o){let e=a=>{if(a.nodeType!==1)return;let n=a;n.hasAttribute("title")&&ko(n);for(let s of Array.from(n.querySelectorAll("[title]")))ko(s)};if(e(o.nodeType===11?o.host:o),o.nodeType===11)for(let a of Array.from(o.querySelectorAll("[title]")))ko(a);let t=(o.ownerDocument??o).defaultView?.MutationObserver;if(!t)return()=>{};let r=new t(a=>{for(let n of a)if(n.type==="attributes")e(n.target);else for(let s of Array.from(n.addedNodes))e(s);rr?.()});return r.observe(o,{attributes:!0,attributeFilter:["title"],childList:!0,subtree:!0}),()=>r.disconnect()}function Yn(o){let e=[],t=o;for(;t;)e.push(t),t=t.nodeType===11?t.host??null:t.parentNode;return e}function os(o,e,t){let a=o.bottom+8,n=!1;a+e.altura>t.h-4&&o.top-8-e.altura>=4&&(a=o.top-8-e.altura,n=!0);let s=o.left+o.width/2-e.largura/2;return s=Math.max(4,Math.min(s,t.w-e.largura-4)),{x:Math.round(s),y:Math.round(Math.max(4,a)),acima:n}}function Gt(o,e=()=>!1){let t=o.defaultView;if(!t)return()=>{};let r=o.createElement("div");r.id="spro-dica-host";let a=r.attachShadow({mode:"open"}),n=o.createElement("style");n.textContent=Wn;let s=o.createElement("div");s.className="dica",s.setAttribute("role","tooltip"),s.hidden=!0,s.setAttribute("popover","manual"),a.append(n,s),o.documentElement.append(r);let i=null,c,l=!1,d=null;function m(){clearTimeout(c),i=null,l=!1,s.classList.remove("on"),s.hidden=!0;try{s.matches?.(":popover-open")&&s.hidePopover()}catch{}}function f(){if(!i||!i.isConnected)return y();let E=ko(i);if(!E)return m();s.textContent=E,s.classList.toggle("claro",!e()),s.hidden=!1;try{typeof s.showPopover=="function"&&!s.matches(":popover-open")&&s.showPopover()}catch{}let S=i.getBoundingClientRect(),O=s.getBoundingClientRect(),$=os(S,{largura:O.width,altura:O.height},{w:t.innerWidth,h:t.innerHeight});s.style.left=`${$.x}px`,s.style.top=`${$.y}px`,s.classList.add("on"),l=!0}function x(E,S){let O=o.elementFromPoint(E,S);for(let $=0;$<4&&O?.shadowRoot;$++){let z=O.shadowRoot.elementFromPoint(E,S);if(!z||z===O)break;O=z}return O}function y(){if(!d)return m();let E=x(d.x,d.y),S=E?er(Yn(E)):null;if(S===i&&i?.isConnected)return;let O=l;m(),S&&(ko(S),i=S,f())}rr=()=>{i&&!i.isConnected&&y()};let k=E=>{let S=E;typeof S.clientX=="number"&&(d={x:S.clientX,y:S.clientY});let O=er(E.composedPath());O===i&&i?.isConnected||(m(),O&&(ko(O),i=O,f()))},_=E=>{let S=E;typeof S.clientX=="number"&&(d={x:S.clientX,y:S.clientY})},A=E=>{let S=er(E.composedPath());!S||!S.matches?.(":focus-visible")||(m(),ko(S),i=S,f())},w=()=>m();return o.addEventListener("pointerover",k,!0),o.addEventListener("pointermove",_,!0),o.addEventListener("focusin",A,!0),o.addEventListener("focusout",m,!0),o.addEventListener("pointerdown",m,!0),o.addEventListener("keydown",m,!0),o.addEventListener("scroll",m,!0),o.documentElement.addEventListener("pointerleave",w),()=>{m(),rr=null,o.removeEventListener("pointerover",k,!0),o.removeEventListener("pointermove",_,!0),o.documentElement.removeEventListener("pointerleave",w),o.removeEventListener("focusin",A,!0),o.removeEventListener("focusout",m,!0),o.removeEventListener("pointerdown",m,!0),o.removeEventListener("keydown",m,!0),o.removeEventListener("scroll",m,!0),r.remove()}}var Y="data-spro-grade",bo="data-spro-grade-pronta",Qo="data-spro-grade-escuro",tr="spro_grade",ar="spro-grade-pre";var es="#tblProcessosRecebidos, #tblProcessosGerados, #tblProcessosDetalhado";function rs(){let o=es.split(", ").map(r=>`html[${Y}] ${r}`).join(`,
`),e=`html[${Y}]:not([${bo}]) #divTabelaProcesso::before,
html[${Y}]:not([${bo}]) #frmProcedimentoControlar:not(:has(#divTabelaProcesso))::before`,t=["#divFiltro","#newFiltro","#processosProActions"].map(r=>`html[${Y}] ${r}`).join(`,
`);return`${o} { display: none !important; }
${t} { display: none !important; }
html[${Y}] #divRecebidosAreaPaginacaoSuperior, html[${Y}] #divRecebidosAreaPaginacaoInferior,
html[${Y}] #divGeradosAreaPaginacaoSuperior, html[${Y}] #divGeradosAreaPaginacaoInferior { display: none !important; }
${e} {
  content: "";
  display: block;
  flex: 0 0 100%;
  box-sizing: border-box;
  width: 100%;
  height: 392px;
  margin: 6px 0;
  border-radius: 10px;
  --spro-sk: #e6e9ee;
  --spro-sk-2: #f3f4f7;
  background:
    linear-gradient(var(--spro-sk), var(--spro-sk)) 0 0 / 38% 36px no-repeat,
    linear-gradient(var(--spro-sk-2), var(--spro-sk-2)) 100% 0 / 56% 36px no-repeat,
    linear-gradient(var(--spro-sk-2), var(--spro-sk-2)) 0 52px / 100% 34px no-repeat,
    repeating-linear-gradient(to bottom, var(--spro-sk) 0 20px, transparent 20px 44px) 0 100px / 100% 352px no-repeat;
  animation: spro-grade-pulso 1.3s ease-in-out infinite;
}
html[${Y}][${Qo}]:not([${bo}]) #divTabelaProcesso::before,
html[${Y}][${Qo}]:not([${bo}]) #frmProcedimentoControlar:not(:has(#divTabelaProcesso))::before { --spro-sk: #2c333b; --spro-sk-2: #232a31; }
@keyframes spro-grade-pulso { 0%, 100% { opacity: 1; } 50% { opacity: 0.55; } }
@media (prefers-reduced-motion: reduce) {
  html[${Y}]:not([${bo}]) #divTabelaProcesso::before,
  html[${Y}]:not([${bo}]) #frmProcedimentoControlar:not(:has(#divTabelaProcesso))::before { animation: none; }
}`}function Ut(o){try{return o.getItem(tr)==="1"}catch{return!1}}function Bt(o,e){try{e?o.setItem(tr,"1"):o.removeItem(tr)}catch{}}function fe(o,e){let t=o.documentElement;if(t.setAttribute(Y,"1"),t.removeAttribute(bo),e?t.setAttribute(Qo,"1"):t.removeAttribute(Qo),!o.getElementById(ar)){let r=o.createElement("style");r.id=ar,r.textContent=rs(),(o.head??t).append(r)}}function ge(o){let e=o.documentElement;e.removeAttribute(Y),e.removeAttribute(bo),e.removeAttribute(Qo),o.getElementById(ar)?.remove()}var Co=o=>o.documentElement.hasAttribute(Y);function nr(o){o.documentElement.setAttribute(bo,"1")}function sr(o,e={setTimeout:(t,r)=>setTimeout(t,r),clearTimeout:t=>clearTimeout(t)}){let t=!1,r,a=s=>{t||(t=!0,e.clearTimeout(n),e.clearTimeout(r),o(s))},n=e.setTimeout(()=>a("teto"),1e4);return{iniciarContagem(){t||(r=e.setTimeout(()=>a("prazo"),1500))},pronta(){t=!0,e.clearTimeout(n),e.clearTimeout(r)},falhou:s=>a(s),encerrada:()=>t}}var Qt="http://www.w3.org/2000/svg",ts={grade:[["rect",{x:"3.5",y:"4.5",width:"17",height:"15",rx:"2"}],["path",{d:"M3.5 9.5h17M9 9.5v10M3.5 14.5h17"}]],quadro:[["rect",{x:"3.5",y:"4.5",width:"4.6",height:"15",rx:"1.2"}],["rect",{x:"9.7",y:"4.5",width:"4.6",height:"9",rx:"1.2"}],["rect",{x:"15.9",y:"4.5",width:"4.6",height:"12",rx:"1.2"}]],lista:[["path",{d:"M8 6.5h12M8 12h12M8 17.5h12M4 6.5h.01M4 12h.01M4 17.5h.01"}]],agrupar:[["path",{d:"M4 6h16M4 12h10M4 18h13"}],["path",{d:"M18 10l3 2-3 2"}]],colunas:[["rect",{x:"3.5",y:"4.5",width:"17",height:"15",rx:"2"}],["path",{d:"M9.2 4.5v15M14.8 4.5v15"}]],disquete:[["path",{d:"M5 4.5h11l3.5 3.5v11a1.5 1.5 0 0 1-1.5 1.5H6.5A1.5 1.5 0 0 1 5 19z"}],["path",{d:"M8 4.5v5h7v-5M8 20v-6h8v6"}]],densidade:[["path",{d:"M4 6h16M4 10h16M4 14h16M4 18h16"}]],semPessoa:[["circle",{cx:"12",cy:"8.5",r:"3.6"}],["path",{d:"M5 20c.8-3.6 3.5-5.5 7-5.5s6.2 1.9 7 5.5M4 4l16 16"}]],olhoFechado:[["path",{d:"M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z"}],["circle",{cx:"12",cy:"12",r:"2.8"}],["path",{d:"M4 4l16 16"}]],seta:[["path",{d:"M6 9l6 6 6-6"}]],setaDireita:[["path",{d:"M9 6l6 6-6 6"}]],desfazer:[["path",{d:"M9 14L4 9l5-5M4 9h10a6 6 0 0 1 0 12h-3"}]],bloquear:[["circle",{cx:"12",cy:"12",r:"8.5"}],["path",{d:"M6 6l12 12"}]],informacao:[["circle",{cx:"12",cy:"12",r:"8.5"}],["path",{d:"M12 11v5M12 8h.01"}]]};function lo(o,e=16,t=document){let r=t.createElementNS(Qt,"svg"),a={viewBox:"0 0 24 24",width:String(e),height:String(e),fill:"none",stroke:"currentColor","stroke-width":"1.8","stroke-linecap":"round","stroke-linejoin":"round","aria-hidden":"true",focusable:"false",class:"spro-icone"};for(let[n,s]of Object.entries(a))r.setAttribute(n,s);for(let[n,s]of ts[o]){let i=t.createElementNS(Qt,n);for(let[c,l]of Object.entries(s))i.setAttribute(c,l);r.append(i)}return r}var he="spro-grade-botao",as="#processosSEIPro .titlePanelHome, #processosSEIPro #divInfraBarraLocalizacao, #divInfraBarraLocalizacao.titlePanelHome, #divInfraBarraLocalizacao",ns="Usar a vis\xE3o nova do controle de processos",ss="Voltar \xE0 vis\xE3o nativa do SEI";function is(o,e,t){let r=o.querySelector(as);if(!r)return!1;let a=e?ss:ns,n=r.querySelector(`.${he}`);n||(n=o.createElement("button"),n.type="button",n.className=he,n.append(lo("grade",18,o)),r.append(n));let s=[...r.children].filter(i=>i.classList.contains("spro-pnl-botao")).at(-1);return s&&s.compareDocumentPosition(n)&2&&s.after(n),n.setAttribute("data-tip",a),n.removeAttribute("title"),n.setAttribute("aria-label",a),n.setAttribute("aria-pressed",String(e)),!0}function Kt(o,e){let t=r=>{(r.composedPath?.()[0]??r.target)?.closest?.(`.${he}`)&&(r.preventDefault(),r.stopPropagation(),e())};return o.addEventListener("click",t,!0),()=>o.removeEventListener("click",t,!0)}var Xt=o=>{for(let e of o.querySelectorAll(`.${he}`))e.remove()};function ve(o,e,t){let r=()=>is(o,e(),t);r();let a=o.defaultView?.MutationObserver;if(!a||!o.body)return()=>Xt(o);let n=!1,s=new a(()=>{n||(n=!0,queueMicrotask(()=>{n=!1,s.disconnect(),r(),s.observe(o.body,{childList:!0,subtree:!0})}))});return s.observe(o.body,{childList:!0,subtree:!0}),()=>{s.disconnect(),Xt(o)}}function B(o){return o.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/\s+/g," ").trim()}var cs=/<div(?: style="text-decoration: line-through;")?><i class="(far fa-square|fas fa-check-square)"><\/i> ?([\s\S]*?)<\/div>/g;function ls(o){return o.includes("<div")?o.replace(cs,(e,t,r)=>`
${t==="far fa-square"?"[ ]":"[X]"} ${r}
`).replace(/\n{2,}/g,`
`).trim():o}var ps=/^Anota[\u00e7c][\u00e3a]o( com prioridade)?\s+\/\s+([\s\S]*)\s+\/\s+(.*)$/i;function Jt(o){let e=o.querySelector('a[href*="acao=anotacao_registrar"]');if(!e)return null;let t=e.querySelector("img")?.getAttribute("src")??"",r=/anotacao2\.|prioridade/i.test(t),a=ps.exec(e.getAttribute("aria-label")??"");if(a){let i=G(a[2]).replace(/\r\n?/g,`
`).trim();return i?{texto:i,autor:a[3].trim(),prioridade:!!a[1]||r}:null}let n=go(e.getAttribute("onmouseover")??"","infraTooltipMostrar")[0];if(typeof n?.[0]!="string")return null;let s=ls(R(n[0])).trim();return s?{texto:s,autor:R(n[1]).trim(),prioridade:r}:null}function Wt(o,e,t){if(e){let a={idProcedimento:o,origem:"nativo",vencimento:e.data,idControlePrazo:e.idControlePrazo,sigla:e.sigla,linkNativo:e.link,...e.concluidoEm?{concluidoEm:e.concluidoEm}:{}};return t?.vencimento&&t.data===e.data?{...a,origem:"ambos",hora:t.hora,texto:t.texto||void 0}:a}if(!t)return null;let r={idProcedimento:o,origem:"marcador",hora:t.hora,texto:t.texto||void 0};return t.vencimento?{...r,vencimento:t.data}:{...r,inicio:t.data}}var ds='a[href*="acao=controle_prazo_definir"]',us=/^Controle de Prazo\s*\/\s*(\S+)\s+(\d{2})\/(\d{2})\/(\d{4})\s*\(([^)]*)\)\s*$/s,Zt=(o,e,t)=>`${t}-${e}-${o}`;function ms(o){let e=o.trim().toLowerCase(),t=/^conclu[i\u00ED]do em (\d{2})\/(\d{2})\/(\d{4})$/.exec(e);return t?{estado:"concluido",concluidoEm:Zt(t[1],t[2],t[3])}:/^at[e\u00E9] hoje$/.test(e)?{estado:"hoje"}:/^atrasado \d+ dias?$/.test(e)?{estado:"atrasado"}:/^\d+ dias?$/.test(e)?{estado:"noPrazo"}:null}function ir(o){let e=o.querySelector(ds);if(!e)return null;let t=e.getAttribute("aria-label")??"";if(!t){let l=go(e.getAttribute("onmouseover")??"","infraTooltipMostrar")[0];typeof l?.[0]=="string"&&(t=`Controle de Prazo / ${R(l[0])}`)}let r=us.exec(G(t).replace(/\s+/g," ").trim());if(!r)return null;let a=ms(r[5]);if(!a)return null;let n=G(e.getAttribute("href")??""),s=X(n),i=s.get("id_controle_prazo")??"",c=s.get("id_procedimento")??o.id.replace(/^P/,"");return!i||!c?null:{idControlePrazo:i,idProcedimento:c,sigla:r[1],data:Zt(r[2],r[3],r[4]),link:n,...a}}var Yt=/(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(\d{4})/,oa=/\b([01]?\d|2[0-3]):([0-5]\d)\b/,ea=new RegExp("(?<!\\p{L})at[e\\u00E9](?!\\p{L})","iu");function fs(o,e,t){let r=`${t}-${e}-${o}`;try{return ce(ie(r))===r?r:null}catch{return null}}var gs=o=>o.padStart(2,"0");function cr(o){let e=o.replace(/\r\n?/g,`
`),t=Yt.exec(e);if(!t)return null;let r=fs(t[1],t[2],t[3]);if(!r)return null;let a=oa.exec(e),n=a?`${gs(a[1])}:${a[2]}`:void 0,s=ea.test(e),i=e.replace(ea,"").replace(Yt,"");return a&&(i=i.replace(oa,"")),i=i.replace(/[ \t]+/g," ").replace(/^[ \t]*\n+|\n+[ \t]*$/g,"").trim(),{data:r,hora:n,vencimento:s,texto:i}}function ra(o){let e=[];for(let t of o.querySelectorAll('a[href*="acao=andamento_marcador_gerenciar"]')){let r=go(t.getAttribute("onmouseover")??"","infraTooltipMostrar")[0];typeof r?.[0]=="string"&&e.push({texto:R(r[0]),nome:R(r[1])})}return e}function ta(o,e){let t=o.querySelector("input[type=checkbox]"),r=o.querySelector("a[href*='procedimento_trabalhar']");if(!t||!r)return null;let a=t.getAttribute("aria-label")??"",n=/^Sigiloso\b/.test(a)||/Sigiloso/.test(r.getAttribute("class")??""),s=[...o.querySelectorAll("td")],i=n?[]:[...s[1]?.querySelectorAll("a[aria-label]")??[]].map(c=>c.getAttribute("aria-label")??"");return{idProcedimento:t.getAttribute("value")??X(r.getAttribute("href")??"").get("id_procedimento")??"",protocolo:t.getAttribute("title")??V(r),grupo:e,tipo:/Tipo (.*?)(?: \/ Especifica|$)/.exec(a)?.[1]?.trim()??"",especificacao:n?"":/Especifica\S* (.*)$/.exec(a)?.[1]?.trim()??"",sigiloso:n,novo:/NaoVisualizado/.test(r.getAttribute("class")??""),atribuido:V(s[s.length-1]).replace(/^\(|\)$/g,""),sinais:i,documentoNovo:!!s[1]?.querySelector("img[src*='exclamacao']")||i.some(c=>/documento foi inclu/i.test(c))}}var hs=/marcador_([a-z0-9_]+)\.svg/i;function vs(o){let e=[];for(let t of o.querySelectorAll('a[href*="acao=andamento_marcador_gerenciar"]')){let r=go(t.getAttribute("onmouseover")??"","infraTooltipMostrar")[0],a=/^Marcador\s*\/\s*(.*)$/s.exec(G(t.getAttribute("aria-label")??"").trim()),n=(typeof r?.[1]=="string"&&r[1]?R(r[1]):a?.[1]??"").trim();n&&e.push({nome:n,cor:hs.exec(t.querySelector("img")?.getAttribute("src")??"")?.[1]??"",texto:typeof r?.[0]=="string"?R(r[0]).trim():""})}return e}function bs(o){let e=[];for(let t of o.querySelectorAll("a")){let r=t.querySelector("img")?.getAttribute("src")??"",a=/retorno_(programado|aguardando)(\d)?\.svg/.exec(r);if(!a)continue;let n=G(t.getAttribute("aria-label")??"").trim();e.push({tipo:a[1],descricao:n,atrasado:a[2]==="3"||/atrasad/i.test(n)})}return e}function xs(o){let e=o.querySelector('a[href*="acao=procedimento_atribuicao_listar"], a.ancoraSigla'),t=e?.textContent?.trim();if(!e||!t)return;let r=G(e.getAttribute("title")??"").replace(/^Atribu[i\u00ED]do para\s+/i,"").trim();return{sigla:t,nome:r||t}}function lr(o,e){let t=ta(o,e.grupo);if(!t?.idProcedimento)return null;let r=vs(o),a=null;for(let d of ra(o)){let m=cr(d.texto);if(m){a=m;break}}let n={id:t.idProcedimento,protocolo:t.protocolo,grupo:e.grupo,tipo:t.tipo,especificacao:t.especificacao,sigiloso:t.sigiloso,naoVisualizado:t.novo,marcadores:t.sigiloso?[]:r,retornos:t.sigiloso?[]:bs(o),acompanhamentoEspecial:!t.sigiloso&&!!o.querySelector('a[href*="acao=acompanhamento"] , img[src*="acompanhamento_especial"], .acompanhamentoesp_icon'),documentoNovo:t.documentoNovo,pagina:e.pagina,naPaginaAtual:e.naPaginaAtual},s=o.querySelector('a[href*="acao=procedimento_trabalhar"]')?.getAttribute("onmouseover")??"";/\(URGENTE\)/.test(s)&&(n.urgente=!0),/\(TRANCADO\)/.test(s)&&(n.trancado=!0);let i=o.querySelector(".acompanhamentoesp_icon");if(i){let d=go(i.getAttribute("onmouseover")??"","infraTooltipMostrar")[0];typeof d?.[1]=="string"&&d[1]&&(n.acompanhamentoGrupo=R(d[1]))}let c=o.querySelector('a[href*="acao=procedimento_trabalhar"]')?.getAttribute("href");c&&(n.link=G(c));let l=xs(o);if(l&&(n.atribuicao=l),!t.sigiloso){let d=Jt(o);d&&(n.anotacao=d);let m=Wt(n.id,ir(o),a);m&&(n.prazo=m)}return n}var na="#tblProcessosRecebidos, #tblProcessosGerados, #tblProcessosDetalhado",ys={recebidos:"tblProcessosRecebidos",gerados:"tblProcessosGerados"},As=[[/^tipo( do processo)?$/,"tipo"],[/^especificacao$/,"especificacao"],[/^(atribuicao|atribuido( para)?|responsavel)$/,"atribuicao"],[/^marcador(es)?$/,"marcador"],[/^prioridade$/,"prioridade"],[/^interessados?$/,"interessados"],[/^observacao$/,"observacao"],[/^ultima mov/,"ultimaMov"]];function Es(o){let e=new Map;return[...(o.querySelector("thead tr")??[...o.querySelectorAll("tr")].find(r=>r.querySelector("th")))?.children??[]].forEach((r,a)=>{let n=B(r.textContent??""),s=As.find(([i])=>i.test(n));s&&e.set(a,s[1])}),e}function aa(o){let e=(o?.querySelector("caption")?.textContent??"").replace(/\s+/g," "),t=Number(/(\d+)\s+registro/.exec(e)?.[1]??0),r=/(\d+)\s+a\s+(\d+)\s*\)?/.exec(e);return{total:t,porPagina:r?Number(r[2])-Number(r[1])+1:0}}function Ss(o,e,t){if(!t.size)return;let r=[...e.children];for(let[a,n]of t){let s=(r[a]?.textContent??"").replace(/\s+/g," ").trim();if(s)if(n==="tipo"&&!o.tipo)o.tipo=s;else if(n==="especificacao"&&!o.especificacao&&!o.sigiloso)o.especificacao=s;else if(n==="atribuicao"&&!o.atribuicao){let i=s.replace(/^\(|\)$/g,"");o.atribuicao={sigla:i,nome:i}}else if(n==="marcador"&&!o.marcadores.length&&!o.sigiloso)o.marcadores=[{nome:s,cor:"",texto:""}];else{if(o.sigiloso&&(n==="interessados"||n==="observacao"))continue;if(n==="prioridade")o.prioridade=s;else if(n==="interessados")o.interessados=s;else if(n==="observacao")o.observacao=s;else if(n==="ultimaMov"){let i=/(\d{2})\/(\d{2})\/(\d{4})/.exec(s);i&&(o.ultimaMov=`${i[3]}-${i[2]}-${i[1]}`)}}}}function ws(o){let e=o.querySelector("input[type=checkbox]")?.getAttribute("name")??"";return/^chkGerados/i.test(e)?"gerados":"recebidos"}function Ro(o,e={}){let t=e.pagina??0,r=e.naPaginaAtual??!0,a=[],n={recebidos:0,gerados:0},s={recebidos:0,gerados:0},i=o.getElementById("tblProcessosDetalhado"),c=new Set,l=d=>{d&&!c.has(d.id)&&(c.add(d.id),a.push(d))};for(let d of["recebidos","gerados"]){let m=o.getElementById(ys[d]),{total:f,porPagina:x}=aa(m);n[d]=f,s[d]=x;for(let y of m?.querySelectorAll('tr[id^="P"]')??[])l(lr(y,{grupo:d,pagina:t,naPaginaAtual:r}))}if(i){let d=Es(i),{total:m,porPagina:f}=aa(i);for(let x of i.querySelectorAll("tr")){if(!x.querySelector('a[href*="procedimento_trabalhar"]'))continue;let y=ws(x),k=lr(x,{grupo:y,pagina:t,naPaginaAtual:r});k&&!c.has(k.id)&&(Ss(k,x,d),l(k),n[y]=Math.max(n[y],m),s[y]=Math.max(s[y],f))}}return{processos:a,totais:n,porPagina:s,visao:i?"detalhada":"resumida"}}var Ps=60;async function sa(o,e,t={}){let r=t.maxPaginas??Ps,a=[],n=new Set(o.processos.map(l=>l.id)),s=!0,i,c=!1;try{for(let l of["recebidos","gerados"]){let d=o.totais[l],m=o.processos.filter(y=>y.grupo===l).length,f=o.porPagina[l]||m||1,x=Math.max(1,Math.ceil(d/f));for(let y=1;m<d;y+=1){if(t.sinal?.aborted)return s=!1,{processos:a,completo:s,...i?{erro:i}:{}};if(y>=r){s=!1;break}c=!0;let k=await e.pagina(l,y,t.sinal),A=Ro(k,{pagina:y,naPaginaAtual:!1}).processos.filter(w=>w.grupo===l&&!n.has(w.id));if(!A.length)break;for(let w of A)n.add(w.id);m+=A.length,a.push(...A),t.aoPagina?.(A),t.aoProgresso?.({grupo:l,paginasLidas:y+1,paginasTotal:x,processos:m,total:d})}m<d&&(s=!1)}}catch(l){s=!1,i=l instanceof Error?l.message:String(l)}finally{if(c)try{await e.restaurar()}catch(l){i??=`N\xE3o foi poss\xEDvel voltar \xE0 primeira p\xE1gina: ${l instanceof Error?l.message:String(l)}`}}return{processos:a,completo:s,...i?{erro:i}:{}}}var Ms=["hdnRecebidosItensSelecionados","hdnGeradosItensSelecionados","hdnRecebidosItemId","hdnGeradosItemId"];function pr(o,e){let t="#frmProcedimentoControlar",r=()=>({hdnRecebidosPaginaAtual:"0",hdnGeradosPaginaAtual:"0",...Object.fromEntries(Ms.map(a=>[a,""]))});return{async pagina(a,n,s){let i=a==="recebidos"?"hdnRecebidosPaginaAtual":"hdnGeradosPaginaAtual";return(await F.de(e,t,o).definir({...r(),[i]:String(n)}).enviar({sinal:s,aceitarValidacao:!0})).doc},async restaurar(a){await F.de(e,t,o).definir(r()).enviar({sinal:a,aceitarValidacao:!0})},restaurarAoSair(){try{let a=F.de(e,t,o);fetch(o.absoluta(a.action),{method:"POST",keepalive:!0,credentials:"include",headers:{"content-type":"application/x-www-form-urlencoded"},body:new URLSearchParams(a.definir(r()).pares()).toString()}).catch(()=>{})}catch{}}}}var ks=30*6e4,ia=5e3,dr=()=>({vistoEm:{}});function la(o){if(!o||typeof o!="object")return dr();let e=o,t={};if(e.vistoEm&&typeof e.vistoEm=="object")for(let[i,c]of Object.entries(e.vistoEm))typeof c=="number"&&Number.isFinite(c)&&c>0&&(t[i]=c);let r=i=>typeof i=="number"&&Number.isFinite(i)?i:void 0,a={vistoEm:t},n=r(e.visitaAtual),s=r(e.visitaAnterior);return n!==void 0&&(a.visitaAtual=n),s!==void 0&&(a.visitaAnterior=s),a}function pa(o,e){return o.visitaAtual===void 0?{...o,visitaAtual:e}:e-o.visitaAtual>ks?{...o,visitaAnterior:o.visitaAtual,visitaAtual:e}:o}function ur(o,e,t,r){let a={...o.vistoEm};for(let s of e)a[s]===void 0&&(a[s]=t);if(r){let s=new Set(e);for(let i of Object.keys(a))s.has(i)||delete a[i]}let n=Object.keys(a);if(n.length>ia)for(let s of n.sort((i,c)=>a[c]-a[i]).slice(ia))delete a[s];return{...o,vistoEm:a}}function da(o,e){return o.map(t=>e.vistoEm[t.id]!==void 0?{...t,vistoEm:e.vistoEm[t.id]}:t)}function To(o){if(o===null)return"";if(o<1)return"hoje";if(o===1)return"1 dia";if(o<60)return`${o} dias`;let e=Math.floor(o/30);return e<24?`${e} meses`:`${Math.floor(o/365)} anos`}var ua="Contado desde a primeira vez que o SEI Pro viu o processo nesta unidade (o SEI n\xE3o informa a data de chegada).";var No=["processo","especificacao","tipo","responsavel","marcadores","prazo","anotacao","caixa","parado","sinais"],Oo={processo:"Processo",tipo:"Tipo",especificacao:"Especifica\xE7\xE3o",responsavel:"Respons\xE1vel",marcadores:"Marcadores",prazo:"Prazo",anotacao:"Anota\xE7\xE3o",caixa:"Na caixa",parado:"Parado h\xE1",sinais:"Sinais"};var Cs=30,Os=40,Ls=()=>({colunas:"marcador",limite:0,raiasPorResponsavel:!1}),Ds=["processo","especificacao","tipo","responsavel","marcadores","prazo","anotacao"],mr=2;function _o(){return{id:"",nome:"Padr\xE3o",busca:"",ordem:[],agrupar:"nenhum",modo:"tabela",colv:mr,colunas:[...Ds],densidade:"confortavel",quadro:Ls()}}var Is=["nenhum","responsavel","tipo","marcador","prazo","situacao","grupo","anotacao","acompanhamento","retorno","caixa"],$s=["protocolo","tipo","responsavel","marcador","prazo","caixa","parado","novo"],zs=["marcador","responsavel","prazo","tipo"];function be(o){let e=_o();if(!o||typeof o!="object")return e;let t=o,r=Array.isArray(t.ordem)?t.ordem.filter(s=>!!s&&typeof s=="object"&&$s.includes(s.campo)).slice(0,4).map(s=>({campo:s.campo,decrescente:s.decrescente===!0})):[],a=Array.isArray(t.colunas)?[...new Set(t.colunas.filter(s=>No.includes(s)))]:[];if(a.includes("processo")&&t.colv!==mr&&!a.includes("especificacao")){let s=a.indexOf("processo");a=[...a.slice(0,s+1),"especificacao",...a.slice(s+1)]}let n=t.quadro&&typeof t.quadro=="object"?t.quadro:{};return{id:typeof t.id=="string"?t.id:"",colv:mr,nome:typeof t.nome=="string"&&t.nome.trim()?t.nome.trim().slice(0,Os):e.nome,busca:typeof t.busca=="string"?t.busca.slice(0,500):"",ordem:r,agrupar:Is.includes(t.agrupar)?t.agrupar:"nenhum",modo:t.modo==="quadro"?"quadro":"tabela",colunas:a.length?a:e.colunas,densidade:t.densidade==="compacta"?"compacta":"confortavel",quadro:{colunas:zs.includes(n.colunas)?n.colunas:"marcador",limite:typeof n.limite=="number"&&n.limite>0?Math.min(99,Math.floor(n.limite)):0,raiasPorResponsavel:n.raiasPorResponsavel===!0}}}function ma(o,e,t){let r=be(e),a=r.id?o.findIndex(s=>s.id===r.id):-1;if(a>=0){let s=[...o];return s[a]=r,{lista:s,visao:r}}if(o.length>=Cs)return null;let n={...r,id:t()};return{lista:[...o,n],visao:n}}var fa=(o,e)=>o.filter(t=>t.id!==e);function ga(o,e){let t=r=>JSON.stringify({...r,id:"",nome:""});return t(o)!==t(e)}var xe="spro_grade_v_ids",ye=o=>`spro_grade_v:${o}`,Rs=o=>`spro_grade:${o||"x"}`;function Ts(){return{visao:_o(),idade:dr(),recolhidos:[]}}function Ns(o){if(!o||typeof o!="object")return Ts();let e=o;return{visao:be(e.visao),idade:la(e.idade),recolhidos:Array.isArray(e.recolhidos)?e.recolhidos.filter(t=>typeof t=="string").slice(0,200):[]}}function ha(o,e){let{local:t,sync:r}=o,a=Rs(e);async function n(){return Ns((await t.obter(a))[a])}async function s(l){let d=await n();await t.gravar({[a]:{...d,...l}})}async function i(){let l=(await r.obter(xe))[xe],d=Array.isArray(l)?l.filter(f=>typeof f=="string"):[];if(!d.length)return[];let m=await r.obter(d.map(ye));return d.flatMap(f=>{let x=m[ye(f)];return x?[{...be(x),id:f}]:[]})}async function c(l,d=[]){let m=new Set(l.map(y=>y.id)),f={[xe]:l.map(y=>y.id)};for(let y of l)f[ye(y.id)]=y;await r.gravar(f);let x=d.filter(y=>!m.has(y.id)).map(y=>ye(y.id));x.length&&await r.remover(x)}return{lerEstado:n,gravarVisao:l=>s({visao:l}),gravarIdade:l=>s({idade:l}),gravarRecolhidos:l=>s({recolhidos:l}),lerVisoes:i,gravarVisoes:c,aoMudarVisoes:l=>r.aoMudar(d=>xe in d||Object.keys(d).some(m=>m.startsWith("spro_grade_v:"))?l():void 0)}}function va(o){let e=t=>{let r=/^[=+\-@\t\r]/.test(t)?`'${t}`:t;return/[;"\n\r]/.test(r)?`"${r.replace(/"/g,'""')}"`:r};return`\uFEFF${o.map(t=>t.map(e).join(";")).join(`\r
`)}`}var ba=new Set;var _s=null;function qs(o){let e=o.closest?.("dialog[open]");if(e)return e;let t=o.getRootNode?.(),r=o.ownerDocument;return t&&t!==r&&t.host?t:r.body??r.documentElement}function xa(o,e){let t=o;try{t?.CustomEvent&&t.dispatchEvent(new t.CustomEvent("spro-popover",{detail:{fundo:e}}))}catch{}}function ya(o,e,t){let r=o.ownerDocument,a=r.defaultView;qs(o).append(e);let n=!0,s=()=>{if(!n)return;let f=o.getBoundingClientRect?.();if(!f)return;let x=a?.innerHeight??0,y=a?.innerWidth??0,k=Math.min(t.largura??Math.max(f.width,t.larguraMinima??0),Math.max(180,y-16)),_=t.alinharDireita?f.right-k:f.left,A=Math.max(8,Math.min(_,y-k-8)),w=t.alturaMaxima??360;e.style.maxHeight="none";let E=Math.min(e.scrollHeight||w,w),S=x-f.bottom-8,O=f.top-8,$=_s?.()??!1,z=!$&&S<Math.min(E,200)&&O>S;e.style.left=`${A}px`,e.style.width=`${k}px`,e.style.maxHeight=`${$?w:Math.max(140,Math.min(w,z?O:S>140?S:w))}px`,e.classList.toggle("spro-flutuante-cima",z),z?(e.style.top="",e.style.bottom=`${x-f.top+4}px`):(e.style.bottom="",e.style.top=`${f.bottom+4}px`),xa(a,z?0:Math.ceil(f.bottom+4+E+12))},i=f=>{let x=f.composedPath?.()??[],y=f.target,k=_=>x.includes(_)||!!y&&!!_.contains?.(y);k(e)||k(o)||t.aoFechar()},c=()=>{o.isConnected?s():t.aoFechar()},l=f=>{f.target instanceof Node&&e.contains(f.target)||c()},d=()=>t.aoFechar();r.addEventListener("pointerdown",i,!0),a?.addEventListener("scroll",l,!0),a?.addEventListener("resize",c),a?.addEventListener("blur",d);let m={ancora:o,fechar:()=>t.aoFechar()};return ba.add(m),s(),{posicionar:s,fechar(){n&&(n=!1,ba.delete(m),r.removeEventListener("pointerdown",i,!0),a?.removeEventListener("scroll",l,!0),a?.removeEventListener("resize",c),a?.removeEventListener("blur",d),e.remove(),xa(a,0))}}}function Aa(o,e){let t=B(e);if(!t)return[...o];let r=t.split(" "),a=[];return o.forEach((n,s)=>{let i=B(n.rotulo),c=`${i} ${B(n.descricao??"")}`;if(!r.every(d=>c.includes(d)))return;let l=i.startsWith(t)?0:i.split(" ").some(d=>d.startsWith(r[0]))?1:2;a.push({o:n,nota:l,i:s})}),a.sort((n,s)=>n.nota-s.nota||n.i-s.i).map(n=>n.o)}function Vs(o,e){let t=o.normalize("NFC"),r=B(e).split(" ").filter(Boolean);if(!r.length)return[{texto:t,marcado:!1}];let a=[...t],n="",s=[];a.forEach((l,d)=>{let m=l.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase();for(let f of m)n+=f,s.push(d)});let i=new Array(a.length).fill(!1);for(let l of r){let d=n.indexOf(l);if(!(d<0))for(let m=d;m<d+l.length;m++)i[s[m]]=!0}let c=[];return a.forEach((l,d)=>{let m=c[c.length-1];m&&m.marcado===i[d]?m.texto+=l:c.push({texto:l,marcado:i[d]})}),c}var Hs=0;function Ao(o){let e=`spro-combo-${++Hs}`,t=()=>typeof o.opcoes=="function"?o.opcoes():o.opcoes,r=new Map,a=v=>t().find(M=>M.valor===v)??r.get(v),n=[...o.valor??[]],s=null,i="",c=0,l=[],d=null,m=p("button",{type:"button",class:`spro-combo${o.classe?` ${o.classe}`:""}`,role:"combobox","aria-haspopup":"listbox","aria-expanded":"false","aria-label":o.rotulo,title:o.rotulo}),f=()=>o.aoMudar?.([...n]);function x(){let v=[];o.icone&&v.push(q(o.icone,15));let M=n.map(N=>a(N)).filter(N=>!!N),L=p("span",{class:"spro-combo-texto"});if(!M.length)L.classList.add("spro-combo-vazio"),L.append(o.vazio??"Escolher\u2026");else{let N=M[0];N.cor&&L.append(p("span",{class:"spro-combo-cor",style:`background:${N.cor}`})),L.append(p("span",{class:"spro-combo-rotulo"},N.rotulo)),M.length>1&&L.append(p("span",{class:"spro-combo-mais"},`+${M.length-1}`))}v.push(L,q("chevron",14)),m.classList.toggle("spro-combo-ativo",o.multiplo===!0&&M.length>0),m.replaceChildren(...v)}let y=()=>o.busca??(t().length>7||!!o.multiplo||!!o.criar);function k(v){if(o.multiplo){n=n.includes(v.valor)?n.filter(L=>L!==v.valor):[...n,v.valor],f(),x(),E();return}let M=n.length!==1||n[0]!==v.valor;n=[v.valor],x(),z(!0),M&&f()}async function _(){if(!o.criar)return;let v=i.trim();if(!v)return;let M=await o.criar(v);if(M){if(r.set(M.valor,M),i="",s){let L=s.querySelector(".spro-combo-busca");L&&(L.value="")}o.multiplo&&n.includes(M.valor)?E():k(M)}}function A(v,M){let L=n.includes(v.valor),N=p("span",{class:"spro-combo-op-rotulo"});for(let I of Vs(v.rotulo,i))N.append(I.marcado?p("mark",{},I.texto):I.texto);let W=p("li",{role:"option",id:`${e}-op-${M}`,class:`spro-combo-op${M===c?" spro-combo-op-ativa":""}`,"data-valor":v.valor,"aria-selected":L?"true":"false"},o.multiplo?p("span",{class:"spro-combo-caixa","aria-hidden":"true"},L?q("check",12):null):null,v.cor?p("span",{class:"spro-combo-cor",style:`background:${v.cor}`}):null,v.icone?q(v.icone,15):null,p("span",{class:"spro-combo-op-textos"},N,v.descricao?p("span",{class:"spro-combo-op-desc"},v.descricao):null),v.contagem!==void 0?p("span",{class:"spro-combo-conta"},String(v.contagem)):null,!o.multiplo&&L?p("span",{class:"spro-combo-marca"},q("check",14)):null);return W.addEventListener("pointerdown",I=>I.preventDefault()),W.addEventListener("click",()=>{c=M,k(v)}),W.addEventListener("pointermove",()=>{c!==M&&(c=M,w())}),W}function w(){if(!s)return;let v=[...s.querySelectorAll('[role="option"]')];v.forEach((W,I)=>{W.classList.toggle("spro-combo-op-ativa",I===c)});let M=v[c],N=s.querySelector(".spro-combo-busca")??s.querySelector('[role="listbox"]');M?(N?.setAttribute("aria-activedescendant",M.id),M.scrollIntoView?.({block:"nearest"})):N?.removeAttribute("aria-activedescendant")}function E(){if(!s)return;l=Aa(t(),i),c>=l.length&&(c=Math.max(0,l.length-1)),s.querySelector('[role="listbox"]').replaceChildren(...l.map(A));let M=s.querySelector(".spro-combo-extras");M.replaceChildren();let L=i.trim();l.length||M.append(p("p",{class:"spro-combo-nada"},L?"Nada encontrado.":"Nenhuma op\xE7\xE3o."));let N=t().some(I=>B(I.rotulo)===B(L));if(o.criar&&L&&!N){let I=p("button",{type:"button",class:"spro-combo-criar"},q("mais",14),p("span",{},o.rotuloCriar?o.rotuloCriar(L):`Criar \u201C${L}\u201D`));I.addEventListener("pointerdown",H=>H.preventDefault()),I.addEventListener("click",()=>void _()),M.append(I)}let W=s.querySelector(".spro-combo-rodape");if(W){let I=l.filter(io=>!n.includes(io.valor)),H=p("button",{type:"button",class:"spro-combo-acao",disabled:!L||!I.length},`Marcar os filtrados${L&&I.length?` (${I.length})`:""}`);H.addEventListener("click",()=>{n=[...n,...I.map(io=>io.valor)],f(),x(),E()});let Io=p("button",{type:"button",class:"spro-combo-acao spro-combo-limpar",disabled:!n.length},"Limpar");Io.addEventListener("click",()=>{n=[],f(),x(),E()}),W.replaceChildren(p("span",{class:"spro-combo-total"},n.length?`${n.length} marcado${n.length>1?"s":""}`:""),H,Io)}w()}let S=()=>d?.posicionar();function O(v){let M=l.length,L=v.target,N=s?[...s.querySelectorAll(".spro-combo-rodape button:not(:disabled)")]:[],W=!!L?.closest?.(".spro-combo-rodape, .spro-combo-criar");if(v.key==="Tab"){let H=N.indexOf(L);if(!v.shiftKey&&H<N.length-1)N[H+1]?.focus();else if(v.shiftKey&&H>=0)H>0?N[H-1]?.focus():(s?.querySelector(".spro-combo-busca")??s?.querySelector('[role="listbox"]'))?.focus();else{z(!0);return}v.preventDefault(),v.stopPropagation();return}if(W&&v.key!=="Escape")return;let I=!s?.querySelector(".spro-combo-busca");if(I&&v.key===" "){let H=l[c];H&&k(H),v.preventDefault(),v.stopPropagation();return}if(I&&v.key.length===1&&!v.ctrlKey&&!v.metaKey&&!v.altKey){let H=B(v.key),io=[...l.keys()].map(xo=>(c+1+xo)%Math.max(1,M)).find(xo=>B(l[xo]?.rotulo??"").startsWith(H));io!==void 0&&(c=io,w()),v.preventDefault(),v.stopPropagation();return}switch(v.key){case"ArrowDown":c=M?(c+1)%M:0,w();break;case"ArrowUp":c=M?(c-1+M)%M:0,w();break;case"Home":if(v.target?.classList?.contains("spro-combo-busca")&&i)return;c=0,w();break;case"End":if(v.target?.classList?.contains("spro-combo-busca")&&i)return;c=Math.max(0,M-1),w();break;case"Enter":{let H=l[c];H?k(H):_();break}case"Escape":z(!0);break;case"Backspace":if(!o.multiplo||i||!n.length)return;n=n.slice(0,-1),f(),x(),E();break;default:return}v.preventDefault(),v.stopPropagation()}function $(v=""){if(s)return;i=v,c=v?0:(()=>{let W=Aa(t(),i).findIndex(I=>I.valor===n[n.length-1]);return W<0?0:W})();let L=y()?p("input",{type:"text",class:"spro-combo-busca",placeholder:o.criar?"Buscar ou criar\u2026":"Buscar\u2026","aria-label":`Filtrar ${o.rotulo.toLowerCase()}`,"aria-controls":`${e}-lista`,"aria-autocomplete":"list",autocomplete:"off",spellcheck:"false",value:v}):null;if(L&&(L.value=v,L.addEventListener("input",()=>{i=L.value,c=0,E(),S()})),s=p("div",{class:`spro-combo-pop${o.multiplo?" spro-combo-pop-multi":""}`},L?p("div",{class:"spro-combo-cabeca"},q("busca",15),L):null,p("ul",{role:"listbox",id:`${e}-lista`,class:"spro-combo-lista",tabindex:L?void 0:"-1","aria-label":o.rotulo,"aria-multiselectable":o.multiplo?"true":void 0}),p("div",{class:"spro-combo-extras"}),o.multiplo?p("div",{class:"spro-combo-rodape"}):null),s.addEventListener("keydown",O),d=ya(m,s,{larguraMinima:o.larguraLista??220,alturaMaxima:360,aoFechar:()=>z(!1)}),m.setAttribute("aria-expanded","true"),m.setAttribute("aria-controls",`${e}-lista`),m.classList.add("spro-combo-aberto"),E(),S(),!s)return;(L??s.querySelector('[role="listbox"]'))?.focus?.({preventScroll:!0}),L&&v&&L.setSelectionRange?.(v.length,v.length)}function z(v=!1){s&&(d?.fechar(),d=null,s=null,i="",m.setAttribute("aria-expanded","false"),m.removeAttribute("aria-controls"),m.classList.remove("spro-combo-aberto"),v&&m.focus?.({preventScroll:!0}))}return m.addEventListener("click",()=>s?z(!0):$()),m.addEventListener("keydown",v=>{s||(v.key==="ArrowDown"||v.key==="ArrowUp"?(v.preventDefault(),$()):v.key.length===1&&v.key!==" "&&!v.ctrlKey&&!v.metaKey&&!v.altKey&&y()&&(v.preventDefault(),$(v.key)))}),x(),{el:m,valor:()=>[...n],definir(v,M=!1){n=[...v],x(),E(),M&&f()},atualizar(){x(),E()},abrir:$,fechar:()=>z(!1)}}var Ea="#tblProcessosRecebidos input[type=checkbox], #tblProcessosGerados input[type=checkbox], #tblProcessosDetalhado input[type=checkbox]",fr=o=>o.getAttribute("value")??o.closest("tr")?.id.replace(/^P/,"")??"";function gr(o){let e=new Set;for(let t of o.querySelectorAll(Ea))t.checked&&fr(t)&&e.add(fr(t));return e}function Sa(o,e){let t=new Set(e);for(let r of o.querySelectorAll(Ea)){let a=fr(r);a&&(t.delete(a),!r.disabled&&!!r.checked!==e.has(a)&&r.click())}return[...t]}function wa(o,e){let t=!1,r=()=>{t||(t=!0,queueMicrotask(()=>{t=!1,e(gr(o))}))};return o.addEventListener("click",r,!0),o.addEventListener("change",r,!0),()=>{o.removeEventListener("click",r,!0),o.removeEventListener("change",r,!0)}}function Fs(o){return/acaoControleProcessos\(\s*['"][^'"]*['"]\s*,\s*true/.test(o.elemento.getAttribute("onclick")??"")}function Pa(o,e){return Fs(o)&&e===0?{ok:!1,motivo:"Marque ao menos um processo."}:(o.elemento.click(),{ok:!0})}var js=o=>o instanceof Error?o.message:String(o);function Ma(o){if(o.tipo==="atribuicao")return{...o,para:o.de,de:o.para};let e={tipo:"marcador",id:o.id,protocolo:o.protocolo};return o.adicionar&&(e.remover=o.adicionar),o.remover&&(e.adicionar=o.remover,o.texto&&(e.texto=o.texto)),e}async function Gs(o,e){try{if(o.tipo==="atribuicao")return await e.atribuir(o.protocolo,o.para),{ok:!0,desfazer:Ma(o)};if(o.adicionar&&await e.marcador(o.protocolo,{marcador:o.adicionar,...o.texto?{texto:o.texto}:{}}),o.remover)try{await e.marcador(o.protocolo,{marcador:o.remover,remover:!0})}catch(t){throw o.adicionar&&await e.marcador(o.protocolo,{marcador:o.adicionar,remover:!0}).catch(()=>{}),t}return{ok:!0,desfazer:Ma(o)}}catch(t){return{ok:!1,erro:js(t)}}}function ka(o){let e=Promise.resolve();return{mover(t){let r=e.then(()=>Gs(t,o));return e=r.catch(()=>{}),r}}}var Ae=o=>`${o} ${Math.abs(o)===1?"dia":"dias"}`,Ca=Number.MAX_SAFE_INTEGER;function hr(o,e){let t=[e];return o.hora&&o.vencimento&&(t[0]=e.replace(/\.$/,"")+` \xE0s ${o.hora}.`),o.texto&&t.push(o.texto),o.sigla&&t.push(`Definido por ${o.sigla} no controle de prazo do SEI.`),t.join(`
`)}function Oa(o,e){let t=o.vencimento;if(o.concluidoEm&&t)return{situacao:"concluido",texto:`conclu\xEDdo em ${fo(o.concluidoEm).slice(0,5)}`,dica:hr(o,`Prazo de ${fo(t)} conclu\xEDdo em ${fo(o.concluidoEm)}.`),ordem:Ca,sorter:`${t} 23:59:59`};if(t){let s=jo(e,t),i=`${t} ${o.hora??"23:59"}:00`,c=hr(o,`Vence em ${fo(t)}.`);return s===0?{situacao:"hoje",texto:"vence hoje",dica:c,ordem:0,sorter:i}:s<0?{situacao:"atrasado",texto:`${Ae(-s)} de atraso`,dica:c,ordem:s,sorter:i}:{situacao:"noPrazo",texto:`vence em ${Ae(s)}`,dica:c,ordem:s,sorter:i}}let r=o.inicio??e,a=jo(r,e);return{situacao:"desde",texto:a===0?"hoje":a>0?`h\xE1 ${Ae(a)}`:`em ${Ae(-a)}`,dica:hr(o,`Contando desde ${fo(r)}.`),ordem:Ca-1,sorter:`${r} ${o.hora??"23:59"}:00`}}function no(o,e){return o.prazo?Oa(o.prazo,e.hoje):null}function po(o,e){return o.vistoEm===void 0?null:Math.max(0,Math.floor((e.agora-o.vistoEm)/864e5))}function Eo(o,e){return o.ultimaMov?Math.max(0,jo(o.ultimaMov,e.hoje)):null}function La(o,e){return e.visitaAnterior!==void 0&&o.vistoEm!==void 0&&o.vistoEm>e.visitaAnterior}function Xo(o,e){let t=no(o,e);return!t||t.situacao==="concluido"||t.situacao==="desde"?null:t.ordem}var Us={resp:"resp",responsavel:"resp",atribuido:"resp",atribuicao:"resp",tipo:"tipo",marcador:"marcador",marcadores:"marcador",marc:"marcador",espec:"espec",especificacao:"espec",anot:"anot",anotacao:"anot",nota:"anot",prazo:"prazo",caixa:"caixa",idade:"caixa",novo:"novo",sigilo:"sigilo",sigiloso:"sigilo",grupo:"grupo",retorno:"retorno",protocolo:"protocolo",proc:"protocolo",processo:"protocolo",parado:"parado",mov:"parado",prio:"prio",prioridade:"prio",interessado:"interessado",interessados:"interessado"};function xr(o){let e=[],t="",r=!1;for(let a of o)a==='"'?(r=!r,t+=a):/\s/.test(a)&&!r?(t&&e.push(t),t=""):t+=a;return t&&e.push(t),e}var Bs=o=>o.replace(/^"|"$/g,"");function yr(o){let e=[],t=[];for(let r of xr(o)){let a=r,n=!1;a.startsWith("-")&&a.length>1&&(n=!0,a=a.slice(1));let s,i=/^([a-zA-Z\u00C0-\u017F]+):(.*)$/.exec(a);if(i){let m=Us[B(i[1])];m&&(s=m,a=i[2])}let c="=";s&&/^[<>]/.test(a)&&(c=a[0],a=a.slice(1));let l=B(Bs(a));if(!l&&!s)continue;let d={...s?{campo:s}:{},valor:l,original:r,negado:n,comparador:c};e.push(d),t.push({texto:r,termo:d})}return{termos:e,tokens:t}}var Qs=o=>B([o.protocolo,o.protocolo.replace(/\D/g,""),o.tipo,o.especificacao,o.atribuicao?.sigla,o.atribuicao?.nome,...o.marcadores.flatMap(e=>[e.nome,e.texto]),o.anotacao?.texto,o.prazo?.texto,o.prioridade,o.interessados,o.observacao].filter(Boolean).join(" ")),uo=(o,e)=>B(o??"").includes(e),Da=/^(s|sim|1|true|yes)$/;function vr(o){let e=/^(\d+)\s*(d|dia|dias)?$/.exec(o);return e?Number(e[1]):null}function br(o,e,t){return o===null?!1:e==="<"?o<t:e===">"?o>t:o===t}function Xs(o,e,t){let r=no(o,t),a=e.valor;if(a==="sem"||a==="nenhum"||a==="nao")return!o.prazo;if(a==="com"||a==="sim")return!!o.prazo;if(!r)return!1;if(a==="atrasado"||a==="atrasados"||a==="vencido")return r.situacao==="atrasado";if(a==="hoje")return r.situacao==="hoje";if(a==="concluido"||a==="concluidos")return r.situacao==="concluido";if(a==="semana"){let s=Xo(o,t);return s!==null&&s>=0&&s<=7}let n=vr(a);return n!==null?br(Xo(o,t),e.comparador==="="?"<":e.comparador,n):uo(o.prazo?.texto,a)}function Ks(o,e,t){let r=e.valor;switch(e.campo){case"resp":return r==="sem"||r==="ninguem"?!o.atribuicao:r==="eu"?!!t.eu&&B(o.atribuicao?.sigla??"")===B(t.eu):uo(o.atribuicao?.sigla,r)||uo(o.atribuicao?.nome,r);case"tipo":return uo(o.tipo,r);case"marcador":return r==="sem"||r==="nenhum"?o.marcadores.length===0:r==="com"?o.marcadores.length>0:o.marcadores.some(a=>uo(a.nome,r)||uo(a.texto,r));case"espec":return uo(o.especificacao,r);case"anot":return r==="sem"||r==="nao"?!o.anotacao:r==="com"||r==="sim"?!!o.anotacao:r==="prioridade"||r==="prioritaria"?!!o.anotacao?.prioridade:uo(o.anotacao?.texto,r);case"prazo":return Xs(o,e,t);case"caixa":{let a=vr(r);return a===null?!1:br(po(o,t),e.comparador==="="?">":e.comparador,a)}case"novo":return r==="visita"?La(o,t):Da.test(r)?o.naoVisualizado:r==="nao"?!o.naoVisualizado:!1;case"sigilo":return Da.test(r)?o.sigiloso:!o.sigiloso;case"grupo":return r.startsWith("rec")?o.grupo==="recebidos":r.startsWith("ger")?o.grupo==="gerados":!1;case"retorno":return r==="sem"||r==="nao"?o.retornos.length===0:r==="atrasado"?o.retornos.some(a=>a.atrasado):r==="aguardando"?o.retornos.some(a=>a.tipo==="aguardando"):r==="programado"?o.retornos.some(a=>a.tipo==="programado"):o.retornos.length>0;case"parado":{let a=vr(r);return a===null?!1:br(Eo(o,t),e.comparador==="="?">":e.comparador,a)}case"prio":return uo(o.prioridade,r);case"interessado":return uo(o.interessados,r);case"protocolo":return B(o.protocolo).includes(r)||o.protocolo.replace(/\D/g,"").includes(r.replace(/\D/g,"")||"\0");default:return!0}}function Js(o,e,t){if(!o.termos.length)return!0;let r;for(let a of o.termos){let n;if(a.campo?n=Ks(e,a,t):(r??=Qs(e),n=r.includes(a.valor)),a.negado?n:!n)return!1}return!0}var Ia=(o,e,t)=>{let r=yr(e);return r.termos.length?o.filter(a=>Js(r,a,t)):o};function Ar(o,e){return xr(o).filter(t=>t!==e).join(" ")}function $a(o,e,t){let r=/\s/.test(t)?`"${t}"`:t,a=`${e}:${r}`,n=xr(o);return n.includes(a)?o:[...n,a].join(" ")}var Ws=new Intl.Collator("pt-BR",{sensitivity:"base",numeric:!0});function Zs(o,e=[]){return[...o.values()].sort((t,r)=>{let a=e.indexOf(t.chave),n=e.indexOf(r.chave);return a>=0||n>=0?(a<0?-1:a)-(n<0?-1:n):Ws.compare(t.rotulo,r.rotulo)})}function Q(o,e,t,r){let a=o.get(e);return a||(a={chave:e,rotulo:t,itens:[],...r?{tom:r}:{}},o.set(e,a)),a}var qo=[["atrasado","Atrasados","perigo"],["hoje","Vencem hoje","aviso"],["semana","Pr\xF3ximos 7 dias","aviso"],["mes","Pr\xF3ximos 30 dias","neutro"],["depois","Depois de 30 dias","neutro"],["desde","Contando desde uma data","neutro"],["concluido","Prazo conclu\xEDdo","neutro"],["sem","Sem prazo","neutro"]];function Ko(o,e){let t=no(o,e);if(!t)return"sem";if(t.situacao==="concluido")return"concluido";if(t.situacao==="desde")return"desde";if(t.situacao==="atrasado")return"atrasado";if(t.situacao==="hoje")return"hoje";let r=Xo(o,e)??0;return r<=7?"semana":r<=30?"mes":"depois"}var za=[["recente","Chegaram hoje"],["semana","Nos \xFAltimos 7 dias"],["mes","Nos \xFAltimos 30 dias"],["antigo","H\xE1 mais de 30 dias"],["desconhecido","Sem registro"]];function Ys(o,e){let t=po(o,e);return t===null?"desconhecido":t<1?"recente":t<=7?"semana":t<=30?"mes":"antigo"}function Lo(o,e){return e.map(t=>o.get(t[0])).filter(t=>!!t)}function Ee(o,e,t){if(e==="nenhum")return[{chave:"todos",rotulo:"Todos",itens:o}];let r=new Map;for(let a of o)switch(e){case"responsavel":a.atribuicao?Q(r,`u:${a.atribuicao.sigla}`,a.atribuicao.nome===a.atribuicao.sigla?a.atribuicao.sigla:`${a.atribuicao.nome} (${a.atribuicao.sigla})`).itens.push(a):Q(r,"sem","Sem respons\xE1vel").itens.push(a);break;case"tipo":Q(r,`t:${a.tipo||"-"}`,a.tipo||"Sem tipo").itens.push(a);break;case"marcador":if(a.marcadores.length)for(let n of a.marcadores)Q(r,`m:${n.nome}`,n.nome).itens.push(a);else Q(r,"sem","Sem marcador").itens.push(a);break;case"prazo":{let n=Ko(a,t),s=qo.find(i=>i[0]===n);Q(r,n,s[1],s[2]).itens.push(a);break}case"situacao":a.naoVisualizado?Q(r,"novo","N\xE3o visualizados","aviso").itens.push(a):Q(r,"lido","Visualizados").itens.push(a);break;case"grupo":Q(r,a.grupo,a.grupo==="recebidos"?"Recebidos":"Gerados").itens.push(a);break;case"anotacao":a.anotacao?.prioridade?Q(r,"prio","Anota\xE7\xE3o com prioridade","aviso").itens.push(a):a.anotacao?Q(r,"com","Com anota\xE7\xE3o").itens.push(a):Q(r,"sem","Sem anota\xE7\xE3o").itens.push(a);break;case"acompanhamento":a.acompanhamentoEspecial?Q(r,"com","Em acompanhamento especial").itens.push(a):Q(r,"sem","Fora do acompanhamento especial").itens.push(a);break;case"retorno":a.retornos.some(n=>n.atrasado)?Q(r,"atrasado","Retorno atrasado","perigo").itens.push(a):a.retornos.some(n=>n.tipo==="aguardando")?Q(r,"aguardando","Aguardando retorno").itens.push(a):a.retornos.length?Q(r,"programado","Retorno programado").itens.push(a):Q(r,"sem","Sem retorno").itens.push(a);break;case"caixa":{let n=Ys(a,t);Q(r,n,za.find(s=>s[0]===n)[1]).itens.push(a);break}}return e==="prazo"?Lo(r,qo):e==="caixa"?Lo(r,za):e==="situacao"?Lo(r,[["novo",""],["lido",""]]):e==="grupo"?Lo(r,[["recebidos",""],["gerados",""]]):e==="anotacao"?Lo(r,[["prio",""],["com",""],["sem",""]]):e==="acompanhamento"?Lo(r,[["com",""],["sem",""]]):e==="retorno"?Lo(r,[["atrasado",""],["aguardando",""],["programado",""],["sem",""]]):Zs(r,["sem"])}var Er={nenhum:"Sem agrupamento",responsavel:"Respons\xE1vel",tipo:"Tipo de processo",marcador:"Marcador",prazo:"Prazo",situacao:"Visualiza\xE7\xE3o",grupo:"Recebidos e gerados",anotacao:"Anota\xE7\xE3o",acompanhamento:"Acompanhamento especial",retorno:"Retorno programado",caixa:"Tempo na caixa"};var oi=new Intl.Collator("pt-BR",{sensitivity:"base",numeric:!0});function Se(o,e){let t=new Map;for(let r of o)for(let a of e(r)){let n=t.get(a.valor)??{valor:a.valor,rotulo:a.rotulo,n:0};n.n+=1,t.set(a.valor,n)}return[...t.values()].sort((r,a)=>a.n-r.n||oi.compare(r.rotulo,a.rotulo))}function Sr(o,e){let t=Se(o,r=>{let a=Ko(r,e),n=qo.find(i=>i[0]===a)[1],s=a==="atrasado"?"atrasado":a==="hoje"?"hoje":a==="semana"?"semana":a==="sem"?"sem":a==="concluido"?"concluido":"";return s?[{valor:s,rotulo:n}]:[]});return{responsaveis:Se(o,r=>r.atribuicao?[{valor:r.atribuicao.sigla,rotulo:`${r.atribuicao.nome} (${r.atribuicao.sigla})`}]:[{valor:"sem",rotulo:"Sem respons\xE1vel"}]),tipos:Se(o,r=>r.tipo?[{valor:r.tipo,rotulo:r.tipo}]:[]),marcadores:Se(o,r=>r.marcadores.length?r.marcadores.map(a=>({valor:a.nome,rotulo:a.nome})):[{valor:"sem",rotulo:"Sem marcador"}]),prazos:t}}function wr(o){let e=[];o.sigiloso&&e.push("Sigiloso"),o.naoVisualizado&&e.push("N\xE3o visualizado"),o.documentoNovo&&e.push("Documento novo"),o.urgente&&e.push("Urgente"),o.trancado&&e.push("Trancado"),o.acompanhamentoEspecial&&e.push(o.acompanhamentoGrupo?`Acompanhamento especial (${o.acompanhamentoGrupo})`:"Acompanhamento especial");for(let t of o.retornos)e.push(`${t.tipo==="aguardando"?"Aguardando retorno":"Retorno programado"}${t.atrasado?" (atrasado)":""}`);return e}function Pr(o,e){let t=no(o,e);if(!o.prazo||!t)return"";let r=o.prazo.vencimento??o.prazo.inicio;return`${r?fo(r):""}${o.prazo.hora?` ${o.prazo.hora}`:""} (${t.texto})`.trim()}var ei=(o,e,t)=>{switch(e){case"processo":return o.protocolo;case"tipo":return o.tipo;case"especificacao":return o.especificacao;case"responsavel":return o.atribuicao?o.atribuicao.nome===o.atribuicao.sigla?o.atribuicao.sigla:`${o.atribuicao.nome} (${o.atribuicao.sigla})`:"";case"marcadores":return o.marcadores.map(r=>r.texto?`${r.nome}: ${r.texto}`:r.nome).join("; ");case"prazo":return Pr(o,t);case"anotacao":return o.anotacao?.texto.replace(/\s*\n\s*/g," / ")??"";case"caixa":return To(po(o,t));case"parado":return To(Eo(o,t));case"sinais":return wr(o).join("; ")}};function Ra(o,e,t){return[e.map(r=>Oo[r]),...o.map(r=>e.map(a=>ei(r,a,t)))]}var Ta=o=>`processos-${o}.csv`;function Na(o,e,t){let r=[];for(let a of o){let n=t&&e.has(a.chave);if(t&&r.push({tipo:"grupo",grupo:a,recolhido:n}),!n)for(let s of a.itens)r.push({tipo:"processo",processo:s,grupo:a.chave})}return r}var Mr=new Intl.Collator("pt-BR",{numeric:!0,sensitivity:"base"});function _a(o){let e=/(\d+)\/(\d{4})-\d+\s*$/.exec(o);if(!e)return null;let t=/(\d+)\s*$/.exec(e[1].split(/[.-]/).pop()??"")?.[1]??e[1];return[Number(e[2]),Number(t)]}function ri(o,e){let t=_a(o),r=_a(e);return t&&r&&(t[0]-r[0]||t[1]-r[1])||Mr.compare(o,e)}function qa(o,e,t){switch(e){case"tipo":return o.tipo||null;case"responsavel":return o.atribuicao?.sigla??null;case"marcador":return o.marcadores[0]?.nome??null;case"prazo":{let r=no(o,t);return r?r.ordem:null}case"caixa":return po(o,t);case"parado":return Eo(o,t);case"novo":return o.naoVisualizado?0:1}}function ti(o,e){return(t,r)=>{for(let a of o){let n;if(a.campo==="protocolo")n=ri(t.protocolo,r.protocolo),a.decrescente&&(n=-n);else{let s=qa(t,a.campo,e),i=qa(r,a.campo,e);if(s===null&&i===null)continue;if(s===null)return 1;if(i===null)return-1;n=typeof s=="number"&&typeof i=="number"?s-i:Mr.compare(String(s),String(i)),a.decrescente&&(n=-n)}if(n)return n}return 0}}function Va(o,e,t){return e.length?[...o].sort(ti(e,t)):o}function Ha(o,e,t){let r=o.findIndex(s=>s.campo===e),a=r<0?{campo:e,decrescente:!1}:o[r].decrescente?null:{campo:e,decrescente:!0};if(!t)return a?[a]:[];if(r<0)return[...o,a];let n=[...o];return a?n[r]=a:n.splice(r,1),n}var kr=new Intl.Collator("pt-BR",{sensitivity:"base",numeric:!0}),mo="sem";function Fa(o,e,t,r={}){let a=new Map,n=(i,c,l,d,m)=>{let f=a.get(i);return f||(f={chave:i,titulo:c,itens:[],aceitaSoltar:l,excedeu:!1,...d?{motivoSomenteLeitura:d}:{},...m?{tom:m}:{}},a.set(i,f)),f};if(e.colunas==="marcador"){n(mo,"Sem marcador",!0);for(let i of[...r.marcadores??[]].sort(kr.compare))n(`m:${i}`,i,!0);for(let i of o){i.marcadores.length||n(mo,"Sem marcador",!0).itens.push(i);for(let c of i.marcadores)n(`m:${c.nome}`,c.nome,!0).itens.push(i)}}else if(e.colunas==="responsavel"){n(mo,"Sem respons\xE1vel",!0);for(let i of r.responsaveis??[])n(`u:${i.sigla}`,`${i.nome} (${i.sigla})`,!0);for(let i of o)i.atribuicao?n(`u:${i.atribuicao.sigla}`,`${i.atribuicao.nome} (${i.atribuicao.sigla})`,!0).itens.push(i):n(mo,"Sem respons\xE1vel",!0).itens.push(i)}else if(e.colunas==="prazo"){for(let[i,c,l]of qo)i!=="desde"&&n(i,c,!1,"O prazo \xE9 definido pelo bot\xE3o de prazo, n\xE3o arrastando.",l);for(let i of o){let c=Ko(i,t);n(c==="desde"?"sem":c,"",!1).itens.push(i)}}else for(let i of o)n(`t:${i.tipo}`,i.tipo||"Sem tipo",!1,"O tipo do processo n\xE3o muda arrastando.").itens.push(i);let s=[...a.values()];if(e.colunas==="prazo"&&(s=s.filter(i=>i.itens.length||i.titulo)),e.colunas==="marcador"||e.colunas==="responsavel"?s.sort((i,c)=>i.chave===mo?-1:c.chave===mo?1:kr.compare(i.titulo,c.titulo)):e.colunas==="tipo"&&s.sort((i,c)=>kr.compare(i.titulo,c.titulo)),e.limite>0)for(let i of s)i.excedeu=i.itens.length>e.limite;return s}var we=o=>o.slice(o.indexOf(":")+1);function ja(o,e,t,r){if(t===r)return{ok:!1,motivo:"Mesma coluna."};if(o==="marcador"){let a=t===mo?void 0:we(t),n=r===mo?void 0:we(r);if(a&&!e.marcadores.some(l=>l.nome===a))return{ok:!1,motivo:"O processo j\xE1 n\xE3o tem esse marcador."};let s=n?e.marcadores.some(l=>l.nome===n):!1,i=a?e.marcadores.find(l=>l.nome===a)?.texto:void 0,c={tipo:"marcador",id:e.id,protocolo:e.protocolo};return a&&(c.remover=a),n&&!s&&(c.adicionar=n,i&&(c.texto=i)),!c.remover&&!c.adicionar?{ok:!1,motivo:"Nada a mudar."}:{ok:!0,movimento:c}}return o==="responsavel"?{ok:!0,movimento:{tipo:"atribuicao",id:e.id,protocolo:e.protocolo,para:r===mo?null:we(r),de:t===mo?null:we(t)}}:{ok:!1,motivo:"Esta divis\xE3o do quadro \xE9 s\xF3 de leitura."}}function Cr(o,e,t={}){if(e.tipo==="atribuicao"){if(e.para===null){let{atribuicao:a,...n}=o;return n}return{...o,atribuicao:{sigla:e.para,nome:t[e.para]??e.para}}}let r=o.marcadores;return e.remover&&(r=r.filter(a=>a.nome!==e.remover)),e.adicionar&&(r=[...r,{nome:e.adicionar,cor:"",texto:e.texto??""}]),{...o,marcadores:r}}var Or="application/x-spro-cartao";function ai(o,e,t){let r=no(o,t.ctx),a=p("input",{type:"checkbox",class:"spro-cb","aria-label":`Marcar ${o.protocolo}`,disabled:!o.naPaginaAtual});a.checked=t.selecionados.has(o.id),a.addEventListener("change",()=>t.aoSelecionar(o.id,a.checked));let n=p("div",{class:`spro-cartao${a.checked?" spro-sel":""}`,draggable:"true","data-id":o.id,"data-de":e},p("div",{class:"spro-cartao-topo"},a,p("a",{class:`spro-proc${o.naoVisualizado?" spro-novo":""}`,href:o.link??"#",draggable:"false"},o.protocolo)),o.tipo?p("div",{class:"spro-cartao-tipo"},o.tipo):null,o.especificacao?p("div",{class:"spro-cartao-espec"},o.especificacao):null,p("div",{class:"spro-cartao-rodape"},r?p("span",{class:`spro-prazo spro-prazo-${r.situacao}`,title:r.dica},r.texto):null,o.atribuicao?p("span",{class:"spro-avatar",title:o.atribuicao.nome},o.atribuicao.sigla.slice(0,2).toUpperCase()):null));return n.addEventListener("dragstart",s=>{s.dataTransfer?.setData(Or,JSON.stringify({id:o.id,de:e})),s.dataTransfer?.setData("text/plain",o.protocolo),s.dataTransfer&&(s.dataTransfer.effectAllowed="move"),n.classList.add("spro-arrastando")}),n.addEventListener("dragend",()=>n.classList.remove("spro-arrastando")),n}function ni(o,e){let t=p("div",{class:"spro-col-corpo"},...o.itens.map(s=>ai(s,o.chave,e)));o.itens.length||t.append(p("div",{class:"spro-col-vazia"},o.aceitaSoltar?"Solte aqui":"Vazia"));let r=e.cfg.limite,a=p("div",{class:"spro-col-topo"},p("span",{class:"spro-col-titulo",title:o.titulo},o.titulo),p("span",{class:`spro-col-n${o.excedeu?" spro-excedeu":""}`,title:o.excedeu?`Passou do limite de ${r}`:void 0},r>0?`${o.itens.length}/${r}`:String(o.itens.length)),o.aceitaSoltar?null:p("span",{class:"spro-col-trava",title:o.motivoSomenteLeitura},lo("bloquear",13))),n=p("section",{class:`spro-col${o.tom?` spro-tom-${o.tom}`:""}${o.excedeu?" spro-col-cheia":""}`,"data-chave":o.chave},a,t);return n.addEventListener("dragover",s=>{s.dataTransfer?.types.includes(Or)&&o.aceitaSoltar&&(s.preventDefault(),n.classList.add("spro-alvo"))}),n.addEventListener("dragleave",()=>n.classList.remove("spro-alvo")),n.addEventListener("drop",s=>{n.classList.remove("spro-alvo");let i=s.dataTransfer?.getData(Or);if(i){s.preventDefault();try{let{id:c,de:l}=JSON.parse(i);e.aoMover(c,l,o.chave)}catch{}}}),n}function Ga(o){let e=p("div",{class:"spro-quadro"}),t=r=>p("div",{class:"spro-colunas"},...Fa(r,o.cfg,o.ctx,o.extras).map(a=>ni(a,o)));if(o.cfg.raiasPorResponsavel&&o.cfg.colunas!=="responsavel")for(let r of Ee(o.processos,"responsavel",o.ctx))e.append(p("div",{class:"spro-raia"},p("div",{class:"spro-raia-nome"},r.rotulo,p("span",{class:"spro-grupo-n"},String(r.itens.length))),t(r.itens)));else e.append(t(o.processos));return o.processos.length||e.prepend(p("div",{class:"spro-vazio"},"Nenhum processo corresponde ao filtro.")),e}var Ua=".spro-fav-estrela, .spro-prj-ic, .spro-dem-cx",si=[".spro-fav-",".spro-prj-",".spro-dem-cx"],Ba=(o,e)=>o.getElementById(`P${e}`)?.querySelectorAll("td")[1],Pe=["spro-fav-estrela","spro-prj-ic","spro-dem-cx"],Lr=o=>Pe.find(e=>o.classList.contains(e))??"";function ii(o,e,t){for(let r of Array.from(o.attributes))!e.hasAttribute(r.name)&&r.name!=="data-spro-id"&&r.name!=="data-tip"&&o.removeAttribute(r.name);for(let r of Array.from(e.attributes))r.name!=="aria-busy"&&r.name!=="title"&&o.getAttribute(r.name)!==r.value&&o.setAttribute(r.name,r.value);e.getAttribute("title")&&o.getAttribute("data-tip")!==e.getAttribute("title")&&o.setAttribute("data-tip",e.getAttribute("title")),o.removeAttribute("aria-busy"),o.setAttribute("data-spro-id",t),o.innerHTML!==e.innerHTML&&o.replaceChildren(...Array.from(e.cloneNode(!0).childNodes))}function Qa(){let o=new Map;return function(t,r){let a=Ba(t,r),n=new Set,s=[];if(a){let i=[...a.querySelectorAll(Ua)].sort((c,l)=>Pe.indexOf(Lr(c))-Pe.indexOf(Lr(l)));for(let c of i){let l=`${r}|${Lr(c)}`;n.add(l);let d=o.get(l);d?ii(d,c,r):(d=c.cloneNode(!0),d.removeAttribute("aria-busy"),d.setAttribute("data-spro-id",r),o.set(l,d)),s.push(d)}}for(let i of Pe)n.has(`${r}|${i}`)||o.delete(`${r}|${i}`);return s}}function Dr(o,e){let t=Ba(o,e);return t?[...t.querySelectorAll(`${Ua}, .acompanhamentoesp_icon`)].map(r=>`${r.className}|${r.getAttribute("aria-pressed")??""}|${r.getAttribute("aria-label")??""}|${r.hasAttribute("data-atraso")?1:0}|${r.querySelector('[class$="-n"]')?.textContent??""}`).join(";"):""}function Xa(o){let e=[];for(let t of Array.from(o.styleSheets??[])){let r;try{r=t.cssRules}catch{continue}for(let a of Array.from(r)){let n=a.cssText;si.some(s=>n.includes(s))&&e.push(n)}}return e.join(`
`)}function Ka(o,e){let t=s=>s.trim().toLowerCase(),r=new Map;for(let s of e)s.nome.trim()&&!r.has(t(s.nome))&&r.set(t(s.nome),{nome:s.nome.trim(),texto:s.texto.trim().slice(0,250)});let a=new Map(o.map(s=>[t(s.nome),s])),n=[];for(let s of o)r.has(t(s.nome))||n.push({tipo:"remover",nome:s.nome});for(let[s,i]of r)a.has(s)||n.push({tipo:"adicionar",nome:i.nome,texto:i.texto});for(let[s,i]of r){let c=a.get(s);c&&c.texto.trim()!==i.texto&&n.push({tipo:"texto",nome:c.nome,texto:i.texto})}return n}function Ja(o,e,t=()=>""){let r=[...o.marcadores];for(let a of e)a.tipo==="remover"?r=r.filter(n=>n.nome!==a.nome):a.tipo==="adicionar"?r.push({nome:a.nome,cor:t(a.nome),texto:a.texto}):r=r.map(n=>n.nome===a.nome?{...n,texto:a.texto}:n);return{...o,marcadores:r}}function Me(o){return o.replace(/\r\n?/g,`
`).trim().slice(0,500)}function Wa(o,e,t,r=""){let a=Me(e);if(!a){let{anotacao:n,...s}=o;return s}return{...o,anotacao:{texto:a,autor:o.anotacao?.autor??r,prioridade:t}}}function Za(o,e){if(!e){let{atribuicao:t,...r}=o;return r}return{...o,atribuicao:e}}function ke(o,e,t,r,a){let n=new Set([o.id]);if(r)for(let s of e)n.add(s);return t.filter(s=>n.has(s.id)&&a(s))}function Ir(o,e){let t=new Set(e.marcadores.map(r=>r.nome.trim().toLowerCase()));return o.filter(r=>{let a=t.has(r.nome.trim().toLowerCase());return r.tipo==="adicionar"?!a:a})}function Ce(o,e){let t=o.ownerDocument??document;for(let n of Array.from(o.querySelectorAll("dialog.spro-dialogo-grade")))n.remove();let r=p("dialog",{class:"spro-dialogo spro-dialogo-grade","aria-label":e.titulo}),a=()=>{r.open?r.close():r.remove()};return r.append(p("header",{},e.icone?p("span",{class:"spro-dialogo-icone","aria-hidden":"true"},q(e.icone,18)):null,p("h2",{},e.titulo,e.subtitulo?p("small",{class:"spro-dialogo-sub"},e.subtitulo):null),p("button",{type:"button",class:"spro-botao-icone","aria-label":"Fechar",title:"Fechar (Esc)",onclick:a},q("fechar",16))),p("div",{class:"spro-dialogo-corpo"},e.conteudo)),r.addEventListener("close",()=>{r.remove(),e.aoFechar?.()}),o.append(r),typeof r.showModal=="function"?r.showModal():r.setAttribute("open",""),r.querySelector(".spro-combo, textarea, input:not([type=checkbox])")?.focus({preventScroll:!0}),{fechar:a,dlg:r}}var ci=[[/azul_marinho|marinho/,"#1d3557"],[/azul_claro|ciano|celeste/,"#2a9fd6"],[/azul/,"#2563c9"],[/verde_escuro/,"#166534"],[/verde|lima/,"#2e9e4f"],[/amarelo/,"#e0b000"],[/laranja/,"#ee7d11"],[/vermelho/,"#d1352b"],[/rosa|magenta/,"#d6409f"],[/roxo|violeta|lilas/,"#7048c6"],[/marrom/,"#8a5a3c"],[/preto/,"#222831"],[/cinza/,"#7b838c"]];function Jo(o){let e=o.toLowerCase();return ci.find(([t])=>t.test(e))?.[1]??"#8b939c"}var pi=o=>o instanceof Error?o.message:String(o);async function $r(o,e,t,r,a){let n=0,s=[],i=0;for(let c of e){let l=o.todos().find(d=>d.id===c.id)??c;o.aplicarLocal(l.id,t(l));try{await o.gravar(()=>r(l)),n+=1}catch(d){o.aplicarLocal(l.id,l),s.push(`${l.protocolo}: ${pi(d)}`)}a?.(i+=1,e.length)}return{ok:n,falhas:s}}function zr(o,e,t){e.falhas.length?o.aviso(`${t}: ${e.ok} ok, ${e.falhas.length} com erro \u2014 ${e.falhas[0]}`):o.aviso(`${t}: ${e.ok} ${e.ok===1?"processo atualizado":"processos atualizados"}.`)}function on(o,e,t){let r=ke(e,o.selecionados(),o.todos(),!0,t).filter(n=>n.id!==e.id);if(!r.length)return null;let a=p("input",{type:"checkbox"});return{el:p("label",{class:"spro-rotulo-linha spro-estender"},a,` Aplicar tamb\xE9m aos ${r.length} ${r.length===1?"outro selecionado":"outros selecionados"}`),marcado:()=>a.checked,n:()=>r.length}}var Rr=(...o)=>p("div",{class:"spro-dialogo-rodape"},...o),Tr=(o="Salvar")=>p("button",{type:"button",class:"spro-botao primario"},q("check",15),o);function en(o,e){let t=[],r=e.atribuicao?.sigla??"",a=Ao({rotulo:"Respons\xE1vel",icone:"pessoa",busca:!0,larguraLista:320,vazio:"Escolher o respons\xE1vel\u2026",opcoes:()=>[{valor:"",rotulo:"Sem respons\xE1vel",descricao:"Remove a atribui\xE7\xE3o"},...t.map(d=>({valor:d.sigla,rotulo:d.nome===d.sigla?d.sigla:d.nome,descricao:d.sigla}))],valor:[r],aoMudar:([d])=>{r=d??"",c()}}),n=on(o,e,()=>!0),s=Tr(),i=p("p",{class:"spro-suave"},"Carregando os usu\xE1rios da unidade\u2026"),c=()=>{s.disabled=!t.length||r===(e.atribuicao?.sigla??"")},l=Ce(o.raiz,{titulo:"Respons\xE1vel",subtitulo:e.protocolo,icone:"pessoa",conteudo:p("div",{class:"spro-form"},p("label",{class:"spro-campo-rotulo"},"Atribuir a",a.el),i,n?.el??null,Rr(s))});o.extras().then(d=>{t=d.responsaveis??[],i.textContent=t.length?"":"N\xE3o foi poss\xEDvel ler os usu\xE1rios da unidade.",a.atualizar(),c()}).catch(()=>{i.textContent="N\xE3o foi poss\xEDvel ler os usu\xE1rios da unidade."}),c(),s.addEventListener("click",async()=>{let d=r?t.find(f=>f.sigla===r)??{sigla:r,nome:r}:null,m=n?.marcado()?ke(e,o.selecionados(),o.todos(),!0,()=>!0):[e];s.disabled=!0,l.fechar(),zr(o,await $r(o,m,f=>Za(f,d),f=>o.atribuir(f.protocolo,d?.sigla??null)),d?`Respons\xE1vel: ${d.nome}`:"Atribui\xE7\xE3o removida")})}function rn(o,e){let t=p("textarea",{class:"spro-campo spro-area",rows:"6",maxlength:String(500),placeholder:"Escreva a anota\xE7\xE3o deste processo\u2026","aria-label":"Anota\xE7\xE3o",value:e.anotacao?.texto??""}),r=p("input",{type:"checkbox"});r.checked=e.anotacao?.prioridade??!1;let a=p("span",{class:"spro-suave spro-contador"}),n=Tr(),s=e.anotacao?p("button",{type:"button",class:"spro-botao perigo"},q("lixeira",15),"Remover anota\xE7\xE3o"):null,i=()=>{let d=Me(t.value);a.textContent=`${t.value.length}/${500}`,n.disabled=!d||d===(e.anotacao?.texto??"")&&r.checked===(e.anotacao?.prioridade??!1)};t.addEventListener("input",i),r.addEventListener("change",i);let c=Ce(o.raiz,{titulo:"Anota\xE7\xE3o",subtitulo:e.protocolo,icone:"nota",conteudo:p("div",{class:"spro-form"},t,p("div",{class:"spro-linha-form"},p("label",{class:"spro-rotulo-linha"},r," Prioridade"),a),e.anotacao?.autor?p("p",{class:"spro-suave"},`\xDAltima edi\xE7\xE3o: ${e.anotacao.autor}`):null,Rr(s,n))});i();let l=async(d,m,f)=>{c.fechar(),zr(o,await $r(o,[e],x=>Wa(x,d,m,o.autor),x=>o.anotar(x.protocolo,{texto:d,prioridade:m})),f)};n.addEventListener("click",()=>void l(Me(t.value),r.checked,"Anota\xE7\xE3o salva")),s?.addEventListener("click",()=>void l("",!1,"Anota\xE7\xE3o removida"))}function tn(o,e){let t=e.marcadores.map(f=>({nome:f.nome,texto:f.texto})),r=[],a=p("div",{class:"spro-marcadores-lista"}),n=on(o,e,f=>!f.sigiloso),s=Tr(),i=p("p",{class:"spro-suave"},"Carregando os marcadores da unidade\u2026"),c=Ao({rotulo:"Adicionar marcador",icone:"etiqueta",busca:!0,larguraLista:320,vazio:"Adicionar marcador\u2026",opcoes:()=>r.filter(f=>!t.some(x=>x.nome.toLowerCase()===f.toLowerCase())).map(f=>({valor:f,rotulo:f,cor:Jo(o.corDoMarcador(f))})),aoMudar:([f])=>{f&&(t=[...t,{nome:f,texto:""}],c.definir([],!1),d())}}),l=()=>Ka(e.marcadores,t);function d(){a.replaceChildren(...t.length?t.map((f,x)=>{let y=p("input",{type:"text",class:"spro-campo",maxlength:String(250),placeholder:"Texto do marcador (opcional)","aria-label":`Texto de ${f.nome}`,value:f.texto});return y.addEventListener("input",()=>{t[x]={...f,texto:y.value},s.disabled=!l().length}),p("div",{class:"spro-marcador-linha"},p("span",{class:"spro-marcador",title:f.nome},p("i",{style:`background:${Jo(o.corDoMarcador(f.nome))}`}),f.nome),y,p("button",{type:"button",class:"spro-botao-icone pequeno",title:`Remover ${f.nome}`,"aria-label":`Remover ${f.nome}`,onclick:()=>{t=t.filter((k,_)=>_!==x),d()}},q("fechar",13)))}):[p("p",{class:"spro-suave"},"Nenhum marcador. Adicione abaixo.")]),c.atualizar(),s.disabled=!l().length}let m=Ce(o.raiz,{titulo:"Marcadores",subtitulo:e.protocolo,icone:"etiqueta",conteudo:p("div",{class:"spro-form"},a,c.el,i,n?.el??null,Rr(s))});d(),o.extras().then(f=>{r=f.marcadores??[],i.textContent=r.length?"":"N\xE3o foi poss\xEDvel ler os marcadores da unidade.",d()}).catch(()=>{i.textContent="N\xE3o foi poss\xEDvel ler os marcadores da unidade."}),s.addEventListener("click",async()=>{let f=l();if(!f.length)return;let x=n?.marcado()?ke(e,o.selecionados(),o.todos(),!0,y=>!y.sigiloso):[e];m.fechar(),zr(o,await $r(o,x,y=>Ja(y,Ir(f,y),o.corDoMarcador),async y=>{for(let k of Ir(f,y))k.tipo==="remover"?await o.marcar(y.protocolo,{marcador:k.nome,remover:!0}):await o.marcar(y.protocolo,{marcador:k.nome,texto:k.texto})}),"Marcadores")})}function an(o,e,t,r,a=8){let n=Math.max(1,e),s=r>0?r:n*40,i=Math.max(0,Math.min(o,Math.floor(t/n)-a)),c=Math.min(o,Math.ceil((t+s)/n)+a);return{inicio:i,fim:c,antes:i*n,depois:Math.max(0,o-c)*n}}var Oe={compacta:34,confortavel:48},di={processo:"minmax(300px, 330px)",tipo:"minmax(120px, 1.2fr)",especificacao:"minmax(200px, 2fr)",responsavel:"minmax(90px, 130px)",marcadores:"minmax(120px, 1.3fr)",prazo:"minmax(120px, 150px)",anotacao:"minmax(130px, 1.4fr)",caixa:"84px",parado:"84px",sinais:"minmax(110px, 150px)"},ui={processo:"protocolo",tipo:"tipo",responsavel:"responsavel",marcadores:"marcador",prazo:"prazo",caixa:"caixa",parado:"parado",sinais:"novo"};function mi(o){let e=o.trim().split(/\s+/);return e.length>2?`${e[0]} ${e[e.length-1]}`:o}function Le(o,e){return p("button",{type:"button",class:"spro-lapis",title:o,"aria-label":o,onclick:t=>{t.preventDefault(),t.stopPropagation(),e()}},q("lapis",13))}var oo=(o,e,t)=>p(o,{class:e},t);function fi(o,e,t,r){let a=oo("div",`spro-c spro-c-${e}`);switch(e){case"processo":{let n=r.icones(o.id),s=l=>n.find(d=>d.classList.contains(l))??p("span",{class:"spro-slot"}),i=o.acompanhamentoEspecial?p("span",{class:"spro-acomp",title:o.acompanhamentoGrupo?`Acompanhamento especial: ${o.acompanhamentoGrupo}`:"Acompanhamento especial"},q("olho",15)):p("span",{class:"spro-slot"});a.append(p("span",{class:"spro-icones"},s("spro-fav-estrela"),s("spro-prj-ic"),s("spro-dem-cx"),i));let c=p("a",{class:`spro-proc${o.naoVisualizado?" spro-novo":""}`,href:o.link??"#",title:"Abrir o processo"},o.protocolo);a.append(c),o.sigiloso&&a.append(p("span",{class:"spro-sigilo",title:"Processo sigiloso"},"sigiloso")),o.urgente&&a.append(p("span",{class:"spro-urgente",title:"Marcado como urgente"},"urgente")),o.trancado&&a.append(p("span",{class:"spro-sigilo",title:"Processo trancado"},"trancado"));break}case"tipo":a.append(oo("span","spro-corta",o.tipo)),a.title=o.tipo;break;case"especificacao":{if(a.classList.add("spro-editavel"),r.editando===o.id){let n=p("input",{type:"text",class:"spro-espec-input",maxlength:"100",value:r.rascunho,"aria-label":"Especifica\xE7\xE3o do processo"});n.addEventListener("input",()=>r.aoDigitarEspec(n.value)),n.addEventListener("keydown",l=>{l.stopPropagation(),l.key==="Enter"?r.aoSalvarEspec(o.id):l.key==="Escape"&&r.aoCancelarEspec()});let s=l=>l.preventDefault(),i=p("button",{type:"button",class:"spro-lapis spro-lapis-ok",title:"Salvar (Enter)","aria-label":"Salvar",onclick:()=>r.aoSalvarEspec(o.id)},q("check",14)),c=p("button",{type:"button",class:"spro-lapis",title:"Cancelar (Esc)","aria-label":"Cancelar",onclick:()=>r.aoCancelarEspec()},q("fechar",14));i.addEventListener("pointerdown",s),c.addEventListener("pointerdown",s),a.append(p("span",{class:"spro-edicao"},n,i,c));break}a.append(oo("span","spro-corta",o.especificacao)),a.title=o.especificacao,o.sigiloso||a.append(Le("Editar a especifica\xE7\xE3o",()=>r.aoEditarEspec(o.id)));break}case"responsavel":a.classList.add("spro-editavel"),o.atribuicao?(a.append(oo("span","spro-corta",r.nomesCompletos?mi(o.atribuicao.nome):o.atribuicao.sigla)),a.title=r.nomesCompletos?o.atribuicao.sigla:o.atribuicao.nome):a.append(p("span",{class:"spro-prazo-vazio spro-vazio-edicao"},"atribuir")),a.append(Le(o.atribuicao?"Mudar o respons\xE1vel":"Atribuir a algu\xE9m",()=>r.aoEditar(o.id,"responsavel")));break;case"marcadores":a.classList.add("spro-editavel","spro-editavel-quebra");for(let n of o.marcadores){let s=p("span",{class:"spro-marcador",title:n.texto?`${n.nome}: ${n.texto}`:n.nome},p("i",{style:`background:${Jo(n.cor)}`}),n.nome);a.append(s)}o.sigiloso||(o.marcadores.length||a.append(p("span",{class:"spro-prazo-vazio spro-vazio-edicao"},"marcar")),a.append(Le(o.marcadores.length?"Editar os marcadores":"Adicionar marcador",()=>r.aoEditar(o.id,"marcadores"))));break;case"prazo":{let n=no(o,t);a.classList.add("spro-editavel");let s=n?"Editar o prazo":"Definir um prazo",i=p("button",{type:"button",class:"spro-prazo-b",title:n?`${Pr(o,t)}
${n.dica}

${s}`:s,"aria-label":s,onclick:c=>{c.preventDefault(),c.stopPropagation(),r.aoAbrirPrazo(o.id)}},n?oo("span",`spro-prazo spro-prazo-${n.situacao}`,n.texto):oo("span","spro-prazo-vazio","definir"));a.append(i,p("span",{class:"spro-lapis spro-lapis-fixo","aria-hidden":"true"},q("lapis",13)));break}case"anotacao":a.classList.add("spro-editavel"),o.anotacao?(a.append(oo("span",`spro-corta${o.anotacao.prioridade?" spro-prio":""}`,o.anotacao.texto.replace(/\s*\n\s*/g," / "))),a.title=`${o.anotacao.texto}
${o.anotacao.autor}`):o.sigiloso||a.append(p("span",{class:"spro-prazo-vazio spro-vazio-edicao"},"anotar")),o.sigiloso||a.append(Le(o.anotacao?"Editar a anota\xE7\xE3o":"Adicionar anota\xE7\xE3o",()=>r.aoEditar(o.id,"anotacao")));break;case"caixa":{let n=To(po(o,t));a.append(oo("span","spro-suave",n)),n&&(a.title=ua);break}case"parado":{let n=Eo(o,t);a.append(oo("span","spro-suave",To(n))),n!==null&&(a.title="Dias desde a \xFAltima movimenta\xE7\xE3o (vis\xE3o detalhada do SEI).");break}case"sinais":for(let n of wr(o))a.append(oo("span","spro-sinal",n));break}return a}function nn(o){let e=o,t=oo("div","spro-cab"),r=oo("div","spro-corpo"),a=p("div",{class:"spro-rolagem",tabindex:"-1"},r),n=p("div",{class:"spro-tabela",role:"table"},t,a),s="",i=!1,c=!1,l=()=>`36px ${e.colunas.map(A=>di[A]).join(" ")}`;function d(){t.replaceChildren(),t.style.gridTemplateColumns=l();let A=e.linhas.filter(S=>S.tipo==="processo"&&S.processo.naPaginaAtual).map(S=>S.processo.id),w=A.filter(S=>e.selecionados.has(S)).length,E=p("input",{type:"checkbox",class:"spro-cb","aria-label":"Marcar todos os processos vis\xEDveis",title:"Marcar todos os vis\xEDveis (desta p\xE1gina do SEI)",disabled:!A.length});E.checked=A.length>0&&w===A.length,E.indeterminate=w>0&&w<A.length,E.addEventListener("change",()=>e.aoMarcarGrupo(A,E.checked)),t.append(oo("div","spro-c spro-c-cb")),t.firstElementChild.append(E);for(let S of e.colunas){let O=ui[S],$=O?e.ordem.findIndex(v=>v.campo===O):-1,z=p("div",{class:`spro-c spro-th${O?" spro-ordenavel":""}`,role:"columnheader",...$>=0?{"aria-sort":e.ordem[$].decrescente?"descending":"ascending"}:{}});if(O){let v=p("button",{type:"button",class:"spro-th-b",title:"Ordenar (Shift acrescenta outro crit\xE9rio)",onclick:M=>e.aoOrdenar(O,M.shiftKey)},Oo[S]);$>=0&&v.append(p("span",{class:"spro-seta-ordem"},`${e.ordem[$].decrescente?"\u2193":"\u2191"}${e.ordem.length>1?$+1:""}`)),z.append(v)}else z.append(Oo[S]);t.append(z)}}function m(A,w){let E=e.selecionados.has(A.id),S=p("input",{type:"checkbox",class:"spro-cb","aria-label":`Marcar ${A.protocolo}`,disabled:!A.naPaginaAtual,title:A.naPaginaAtual?void 0:"Este processo est\xE1 em outra p\xE1gina do SEI; abra-o ou use o quadro para mover."});S.checked=E,S.addEventListener("change",()=>e.aoSelecionar(A.id,S.checked));let O=p("div",{class:`spro-linha${E?" spro-sel":""}${e.foco===A.id?" spro-foco":""}${A.urgente?" spro-linha-urgente":""}`,role:"row","data-id":A.id,"data-grupo":w});O.style.gridTemplateColumns=l(),O.style.height=`${Oe[e.densidade]}px`;let $=oo("div","spro-c spro-c-cb");return $.append(S),O.append($,...e.colunas.map(z=>fi(A,z,e.ctx,e))),O}function f(A){let w=A.grupo.itens.filter(O=>O.naPaginaAtual).map(O=>O.id),E=p("button",{type:"button",class:"spro-grupo-b","aria-expanded":String(!A.recolhido),onclick:()=>e.aoGrupo(A.grupo.chave)},p("span",{class:`spro-grupo-seta${A.recolhido?" spro-fechado":""}`},lo("seta",14)),p("span",{class:"spro-grupo-nome"},A.grupo.rotulo),p("span",{class:"spro-grupo-n"},String(A.grupo.itens.length))),S=p("div",{class:`spro-grupo${A.grupo.tom?` spro-tom-${A.grupo.tom}`:""}`,role:"row"},E);if(w.length){let O=w.every($=>e.selecionados.has($));S.append(p("button",{type:"button",class:"spro-link",onclick:()=>e.aoMarcarGrupo(w,!O)},O?"Desmarcar grupo":"Marcar grupo"))}return S.style.height=`${Oe[e.densidade]}px`,S}function x(){let A=Oe[e.densidade],w=an(e.linhas.length,A,a.scrollTop||0,a.clientHeight||0);r.style.paddingTop=`${w.antes}px`,r.style.paddingBottom=`${w.depois}px`,r.replaceChildren(...e.linhas.slice(w.inicio,w.fim).map(S=>S.tipo==="grupo"?f(S):m(S.processo,S.grupo)));let E=r.querySelector(".spro-espec-input");E&&i?(i=!1,E.focus(),E.setSelectionRange?.(E.value.length,E.value.length)):E&&E.getRootNode()instanceof ShadowRoot&&E.getRootNode().activeElement!==E&&c&&E.focus()}let y=0;a.addEventListener("scroll",()=>{if(y)return;let A=a.ownerDocument.defaultView;if(!A?.requestAnimationFrame)return x();y=A.requestAnimationFrame(()=>{y=0,x()})});function k(A){let w=A.colunas.join()!==e.colunas.join()||A.ordem!==e.ordem||A.selecionados!==e.selecionados;A.editando&&A.editando!==e.editando&&(i=!0),c=!!A.editando,e=A;let E=`${e.colunas.join()}|${e.densidade}`;if((w||E!==s)&&(d(),s=E),!e.linhas.length){r.style.paddingTop=r.style.paddingBottom="0",r.replaceChildren(p("div",{class:"spro-vazio"},"Nenhum processo corresponde ao filtro."));return}x()}function _(A){let w=e.linhas.findIndex(S=>S.tipo==="processo"&&S.processo.id===A);if(w<0)return!1;let E=Oe[e.densidade];return w*E<a.scrollTop?a.scrollTop=w*E:(w+1)*E>a.scrollTop+a.clientHeight&&a.clientHeight>0&&(a.scrollTop=(w+1)*E-a.clientHeight),x(),!0}return k(o),{el:n,atualizar:k,mostrar:_,rolagem:a}}var gi=[["/","Buscar"],["j / k","Linha seguinte / anterior"],["x","Marcar a linha"],["Enter","Abrir o processo"],["g t","Ver a tabela"],["g q","Ver o quadro"],["Esc","Limpar a busca ou a sele\xE7\xE3o"],["?","Esta ajuda"]],hi=[["Meus","resp:eu",{comum:"pessoa"},""],["Atrasados","prazo:atrasado",{comum:"alerta"},"perigo"],["Vencem na semana","prazo:semana",{comum:"calendario"},"aviso"],["Sem respons\xE1vel","resp:sem",{grade:"semPessoa"},""],["N\xE3o visualizados","novo:sim",{grade:"olhoFechado"},""],["Novos desde a \xFAltima visita","novo:visita",{comum:"brilho"},"novo"],["Parados h\xE1 +30 dias","parado:>30d",{comum:"historico"},""]];function sn(o){let{doc:e}=o,t=o.inicial.processos,r=_o(),a=[],n="",s=new Set,i=new Set(gr(e)),c=null,l={vistoEm:{}},d,m=null,f=!1,x=!1,y="",k={},_=!1,A=!1,w,E=!1,S=ka(o.mover),O=new AbortController,$=()=>({hoje:o.hoje(),agora:o.agora(),...o.eu?{eu:o.eu}:{},...d!==void 0?{visitaAnterior:d}:{}}),z=e.createElement("div");z.id="spro-grade",z.setAttribute("data-spro-grade-host","1"),z.setAttribute("data-tema",o.escuro?"escuro":"claro");let v=z.attachShadow({mode:"open"}),M=e.createElement("style");M.textContent=o.css;let L=p("div",{class:`spro-app${o.escuro?" spro-escuro":""}`}),N=e.createElement("style");v.append(M,N,L);let W=jt(v),I=p("input",{type:"search",class:"spro-busca",placeholder:"Buscar: texto, resp:ana, prazo:<7d, marcador:urgente...","aria-label":"Buscar processos",spellcheck:"false",autocomplete:"off"}),H=p("div",{class:"spro-chips"}),Io=p("div",{class:"spro-rapidos"}),io=p("div",{class:"spro-status",role:"status","aria-live":"polite"}),xo=p("div",{class:"spro-lote",hidden:!0}),Yo=p("div",{class:"spro-conteudo"}),yo=p("div",{class:"spro-painel",hidden:!0}),_r=p("div",{class:"spro-avisos","aria-live":"polite"}),Ho=p("div",{class:"spro-ajuda-atalhos",hidden:!0},p("strong",{},"Atalhos"),...gi.map(([u,g])=>p("div",{},p("kbd",{},u),` ${g}`))),un=[["protocolo","N\xFAmero do processo"],["prazo","Prazo"],["tipo","Tipo"],["responsavel","Respons\xE1vel"],["marcador","Marcador"],["caixa","Tempo na caixa"],["parado","Parado h\xE1"],["novo","N\xE3o visualizados"]],$e=Ao({rotulo:"Agrupar por",icone:"camadas",classe:"spro-combo-compacto",busca:!1,vazio:"Sem agrupamento",opcoes:Object.keys(Er).map(u=>({valor:u,rotulo:u==="nenhum"?"Sem agrupamento":`Agrupar: ${Er[u]}`})),valor:["nenhum"],aoMudar:([u])=>U({agrupar:u??"nenhum"})}),qr=Ao({rotulo:"Ordenar por",icone:"ordenar",classe:"spro-combo-compacto",busca:!1,vazio:"Ordem do SEI",opcoes:[{valor:"",rotulo:"Ordem do SEI"},...un.flatMap(([u,g])=>[{valor:`${u}:a`,rotulo:`${g} \u2191`,descricao:"Crescente"},{valor:`${u}:d`,rotulo:`${g} \u2193`,descricao:"Decrescente"}])],valor:[""],aoMudar:([u])=>{let[g,b]=(u??"").split(":");U({ordem:g?[{campo:g,decrescente:b==="d"}]:[]})}}),oe=Sr([],$()),ze=(u,g,b,h,C)=>{let D=Ao({rotulo:u,vazio:g,icone:h,classe:"spro-combo-compacto",busca:!0,larguraLista:260,opcoes:()=>C().map(T=>({valor:T.valor,rotulo:T.rotulo,contagem:T.n})),aoMudar:([T])=>{T&&(U({busca:$a(r.busca,b,T)}),I.value=r.busca,D.definir([],!1))}});return D},Vr=ze("Filtrar por respons\xE1vel","Respons\xE1vel\u2026","resp","pessoa",()=>oe.responsaveis),Hr=ze("Filtrar por tipo","Tipo\u2026","tipo","documento",()=>oe.tipos),Fr=ze("Filtrar por marcador","Marcador\u2026","marcador","etiqueta",()=>oe.marcadores),jr=(u,g)=>p("button",{type:"button",class:"spro-seg-b","data-modo":u,title:g,onclick:()=>U({modo:u})},lo(u==="tabela"?"lista":"quadro",16),p("span",{},g)),Gr=p("div",{class:"spro-seg",role:"group","aria-label":"Modo de exibi\xE7\xE3o"},jr("tabela","Tabela"),jr("quadro","Quadro")),ee=(u,g,b,h="")=>p("button",{type:"button",class:`spro-bt ${h}`.trim(),title:g,"aria-label":g,onclick:b},lo(u,16),p("span",{},g)),Ur=ee("colunas","Colunas",()=>zo("colunas")),mn=ee("disquete","Vis\xF5es",()=>zo("visoes")),fn=ee("lista","Exportar CSV",()=>Sn()),gn=p("button",{type:"button",class:"spro-bt spro-bt-icone",title:"Atalhos de teclado (?)","aria-label":"Atalhos de teclado",onclick:()=>{Ho.hidden=!Ho.hidden}},"?"),Br=ee("densidade","Densidade",()=>U({densidade:r.densidade==="compacta"?"confortavel":"compacta"})),re=p("div",{class:"spro-quadro-cfg",hidden:!0});L.append(p("div",{class:"spro-barra"},Gr,p("div",{class:"spro-busca-caixa"},I),$e.el,qr.el,Ur,Br,mn,fn,gn),H,p("div",{class:"spro-faixa"},Io,Vr.el,Hr.el,Fr.el),re,Ho,yo,io,xo,Yo,_r);let Qr=()=>da(t,l),Fo=()=>Ia(Qr(),r.busca,$()),Re=()=>Va(Fo(),r.ordem,$());function U(u){r={...r,...u},u.busca===void 0?o.armazem.gravarVisao(r).catch(()=>{}):hn(),Z()}let Te;function hn(){clearTimeout(Te),Te=setTimeout(()=>void o.armazem.gravarVisao(r).catch(()=>{}),400)}function eo(u,g){let b=p("div",{class:"spro-aviso",role:"status"},p("span",{},u));g&&b.append(p("button",{type:"button",class:"spro-link",onclick:()=>{g.fazer(),b.remove()}},g.rotulo)),b.append(p("button",{type:"button",class:"spro-aviso-x","aria-label":"Fechar aviso",onclick:()=>b.remove()},"\xD7")),_r.append(b),setTimeout(()=>b.remove(),g?9e3:6e3).unref?.()}function $o(u,g){let b=new Set(i);for(let h of u)g?b.add(h):b.delete(h);i=b,Sa(e,b),qe(),co()}let te=new Map;function Po(u,g){let b=t.find(h=>h.id===u);if(b){let h=te.get(u)??{};for(let C of new Set([...Object.keys(b),...Object.keys(g)]))JSON.stringify(b[C])!==JSON.stringify(g[C])&&(h[C]=g[C]);te.set(u,h)}t=t.map(h=>h.id===u?g:h)}let Xr=Promise.resolve();function vn(u){Mo+=1;let g=Xr.then(u,u);return Xr=g.catch(()=>{}).finally(()=>{Mo-=1}),g}let Ne=null,_e={raiz:v,extras:()=>(Ne??=(o.extras?o.extras().then(u=>(k=u,u)):Promise.resolve({})).catch(u=>{throw Ne=null,u}),Ne),todos:()=>t,selecionados:()=>i,corDoMarcador:u=>t.flatMap(g=>g.marcadores).find(g=>g.nome===u)?.cor??"",autor:o.eu??"",aplicarLocal:(u,g)=>{Po(u,g),Z()},gravar:vn,atribuir:(u,g)=>o.mover.atribuir(u,g),marcar:(u,g)=>o.mover.marcador(u,g),anotar:(u,g)=>o.anotar(u,g),aviso:u=>eo(u)};async function bn(u,g,b){let h=t.find(j=>j.id===u);if(!h)return;let C=ja(r.quadro.colunas,h,g,b);if(!C.ok)return eo(C.motivo);let D=Object.fromEntries((k.responsaveis??[]).map(j=>[j.sigla,j.nome]));Po(u,Cr(h,C.movimento,D)),Z(),Mo+=1;let T=await S.mover(C.movimento).finally(()=>{Mo-=1});if(!A){if(!T.ok)return Po(u,h),Z(),eo(`N\xE3o foi poss\xEDvel mover ${h.protocolo}: ${T.erro}`);eo(`${h.protocolo} movido.`,{rotulo:"Desfazer",fazer:()=>{let j=t.find(ro=>ro.id===u)??h;Po(u,Cr(j,T.desfazer,D)),Z(),S.mover(T.desfazer).then(ro=>{ro.ok||A||(Po(u,j),Z(),eo(`N\xE3o foi poss\xEDvel desfazer: ${ro.erro}`))})}})}}let xn=Qa(),Mo=0,ae=null,ne="",Kr=!1,Jr=u=>({linhas:u,colunas:r.colunas,densidade:r.densidade,ctx:$(),ordem:r.ordem,selecionados:i,foco:c,icones:g=>xn(e,g),nomesCompletos:Kr,editando:ae,rascunho:ne,aoOrdenar:(g,b)=>U({ordem:Ha(r.ordem,g,b)}),aoSelecionar:(g,b)=>$o([g],b),aoGrupo:g=>{let b=new Set(s);b.has(g)?b.delete(g):b.add(g),s=b,o.armazem.gravarRecolhidos([...b]).catch(()=>{}),co()},aoMarcarGrupo:(g,b)=>$o(g,b),aoEditarEspec:g=>{ae=g,ne=t.find(b=>b.id===g)?.especificacao??"",co()},aoDigitarEspec:g=>{ne=g},aoCancelarEspec:()=>{ae=null,co()},aoSalvarEspec:g=>void yn(g),aoAbrirPrazo:g=>o.abrirPrazo(g),aoEditar:(g,b)=>{let h=t.find(C=>C.id===g);h&&(b==="responsavel"?en(_e,h):b==="anotacao"?rn(_e,h):tn(_e,h))}}),se=nn(Jr([]));async function yn(u){let g=t.find(h=>h.id===u),b=ne.trim();if(ae=null,!g||b===g.especificacao.trim())return co();if(!b)return eo("A especifica\xE7\xE3o n\xE3o pode ficar vazia."),co();Po(u,{...g,especificacao:b}),Z(),Mo+=1;try{await o.editarEspecificacao(g.protocolo,b),eo(`Especifica\xE7\xE3o de ${g.protocolo} salva.`)}catch(h){Po(u,g),Z(),eo(`N\xE3o foi poss\xEDvel salvar a especifica\xE7\xE3o: ${h instanceof Error?h.message:String(h)}`)}finally{Mo-=1}}function co(){let u=Re();if(r.modo==="quadro"){Yo.replaceChildren(Ga({processos:u,cfg:r.quadro,ctx:$(),extras:k,selecionados:i,aoMover:(b,h,C)=>void bn(b,h,C),aoSelecionar:(b,h)=>$o([b],h)}));return}let g=Ee(u,r.agrupar,$());se.atualizar(Jr(Na(g,s,r.agrupar!=="nenhum"))),Yo.firstElementChild!==se.el&&Yo.replaceChildren(se.el)}function Wr(u){let g=[`${u} de ${t.length} processo${t.length===1?"":"s"}`],b=o.inicial.totais.recebidos+o.inicial.totais.gerados;f&&m?g.push(`carregando ${m.grupo} (${m.paginasLidas}/${m.paginasTotal})\u2026`):!x&&b>t.length&&g.push(`o SEI informa ${b}; os demais n\xE3o foram carregados`),y&&g.push(`aviso: ${y}`),io.replaceChildren(g.join(" \xB7 ")),io.classList.toggle("spro-status-alerta",!!y||!x&&!f&&b>t.length)}function qe(){let u=i.size;if(xo.hidden=u===0,!u)return xo.replaceChildren();let g=new Set(Fo().map(h=>h.id)),b=[...i].filter(h=>!g.has(h)).length;xo.replaceChildren(p("strong",{},`${u} selecionado${u===1?"":"s"}`),...b?[p("span",{class:"spro-suave"},`(${b} fora do filtro atual)`)]:[],...o.acoes().map(h=>p("button",{type:"button",class:"spro-bt",title:h.rotulo,onclick:()=>{let C=Pa(h,i.size);!C.ok&&C.motivo&&eo(C.motivo)}},p("img",{src:h.icone,alt:"",width:"16",height:"16"}),p("span",{},h.rotulo))),p("button",{type:"button",class:"spro-link",onclick:()=>$o([...i],!1)},"Limpar sele\xE7\xE3o"))}function An(){let u=yr(r.busca);H.replaceChildren(...u.tokens.map(b=>p("span",{class:`spro-chip${b.termo.negado?" spro-chip-neg":""}`},b.texto,p("button",{type:"button","aria-label":`Remover ${b.texto}`,onclick:()=>{U({busca:Ar(r.busca,b.texto)}),I.value=r.busca}},"\xD7")))),H.hidden=!u.tokens.length;let g=new Set(u.tokens.map(b=>b.texto));Io.replaceChildren(...hi.map(([b,h,C,D])=>p("button",{type:"button",title:`Filtrar: ${h}`,class:`spro-rapido${D?` spro-rapido-${D}`:""}${g.has(h)?" spro-rapido-on":""}`,"aria-pressed":String(g.has(h)),onclick:()=>{U({busca:g.has(h)?Ar(r.busca,h):`${r.busca} ${h}`.trim()}),I.value=r.busca}},"comum"in C?q(C.comum,14,e):lo(C.grade,14,e),b)))}function Z(){if(A)return;oe=Sr(Qr(),$());for(let g of[Vr,Hr,Fr])g.atualizar();$e.definir([r.agrupar],!1),$e.el.disabled=r.modo==="quadro",qr.definir([r.ordem[0]?`${r.ordem[0].campo}:${r.ordem[0].decrescente?"d":"a"}`:""],!1);for(let g of Gr.querySelectorAll("[data-modo]"))g.setAttribute("aria-pressed",String(g.getAttribute("data-modo")===r.modo));Br.title=r.densidade==="compacta"?"Linhas confort\xE1veis":"Linhas compactas",Ur.hidden=r.modo==="quadro",En(),An(),co(),Wr(Fo().length),qe(),r.modo==="quadro"&&!_&&o.extras&&(_=!0,o.extras().then(g=>{k=g,A||co()}).catch(()=>{}))}function En(){if(re.hidden=r.modo!=="quadro",re.hidden)return;let u=r.quadro,g=Ao({rotulo:"Colunas do quadro",icone:"mapa",classe:"spro-combo-compacto",busca:!1,opcoes:[{valor:"marcador",rotulo:"Colunas: marcador"},{valor:"responsavel",rotulo:"Colunas: respons\xE1vel"},{valor:"prazo",rotulo:"Colunas: prazo (leitura)"},{valor:"tipo",rotulo:"Colunas: tipo (leitura)"}],valor:[u.colunas],aoMudar:([C])=>{_=!1,U({quadro:{...u,colunas:C??"marcador"}})}}),b=p("input",{type:"number",min:"0",max:"99",class:"spro-num",value:String(u.limite),"aria-label":"Limite de cart\xF5es por coluna (0 = sem limite)",title:"Limite de cart\xF5es por coluna (0 = sem limite)",onchange:C=>U({quadro:{...u,limite:Math.max(0,Math.min(99,Number(C.target.value)||0))}})}),h=p("input",{type:"checkbox",onchange:C=>U({quadro:{...u,raiasPorResponsavel:C.target.checked}})});h.checked=u.raiasPorResponsavel,re.replaceChildren(g.el,p("label",{class:"spro-rotulo-inline"},"Limite ",b),p("label",{class:"spro-rotulo-inline"},h," Raias por respons\xE1vel"),p("span",{class:"spro-suave"},u.colunas==="marcador"||u.colunas==="responsavel"?"Arraste os cart\xF5es entre as colunas.":"Esta divis\xE3o \xE9 s\xF3 de leitura."))}function zo(u){if(!yo.hidden&&yo.getAttribute("data-qual")===u){yo.hidden=!0;return}if(yo.setAttribute("data-qual",u),yo.hidden=!1,u==="colunas"){yo.replaceChildren(p("strong",{},"Colunas"),...No.map(D=>{let T=p("input",{type:"checkbox",disabled:D==="processo"});return T.checked=r.colunas.includes(D),T.addEventListener("change",()=>{let j=T.checked?No.filter(ro=>ro===D||r.colunas.includes(ro)):r.colunas.filter(ro=>ro!==D);U({colunas:j})}),p("label",{class:"spro-rotulo-linha"},T,` ${Oo[D]}`)}),p("button",{type:"button",class:"spro-link",onclick:()=>U({colunas:_o().colunas})},"Restaurar padr\xE3o"));return}let g=p("input",{type:"text",class:"spro-nome",maxlength:"40",placeholder:"Nome da vis\xE3o","aria-label":"Nome da vis\xE3o"}),b=a.find(D=>D.id===n);g.value=b?.nome??"";let h=async(D,T=a)=>{a=D,await o.armazem.gravarVisoes(D,T).catch(()=>eo("N\xE3o foi poss\xEDvel sincronizar as vis\xF5es."))},C=async D=>{let T={...r,nome:g.value.trim()||"Minha vis\xE3o",id:D==="atualizar"?n:""},j=ma(a,T,o.novoId);if(!j)return eo("Limite de vis\xF5es salvas atingido.");n=j.visao.id,await h(j.lista),eo(`Vis\xE3o "${j.visao.nome}" salva.`),zo("visoes"),zo("visoes")};yo.replaceChildren(p("strong",{},"Vis\xF5es salvas"),a.length?p("ul",{class:"spro-lista-visoes"},...a.map(D=>p("li",{},p("button",{type:"button",class:`spro-link${D.id===n?" spro-ativa":""}`,onclick:()=>{n=D.id,I.value=D.busca,U({...D,id:""})}},D.nome),p("button",{type:"button",class:"spro-aviso-x","aria-label":`Excluir ${D.nome}`,title:"Excluir",onclick:async()=>{await h(fa(a,D.id),a),n===D.id&&(n=""),zo("visoes"),zo("visoes")}},"\xD7")))):p("p",{class:"spro-suave"},"Nenhuma vis\xE3o salva ainda."),p("div",{class:"spro-linha-form"},g,p("button",{type:"button",class:"spro-bt",onclick:()=>void C("nova")},"Salvar como nova"),b&&ga(r,b)?p("button",{type:"button",class:"spro-bt",onclick:()=>void C("atualizar")},"Atualizar"):null))}function Sn(){let u=Ra(Re(),r.modo==="quadro"?[...No]:r.colunas,$());o.baixar(Ta(o.hoje()),va(u),"text/csv;charset=utf-8"),eo(`${u.length-1} processos exportados.`)}I.addEventListener("input",()=>{let u=I.value;if(o.semDebounce)return U({busca:u});clearTimeout(w),w=setTimeout(()=>U({busca:u}),120)}),I.addEventListener("keydown",u=>{u.key==="Escape"&&(I.value="",U({busca:""}),I.blur())});function Zr(u){if(A||u.ctrlKey||u.metaKey||u.altKey)return;let g=u.target;if(g&&(/^(input|textarea|select)$/i.test(g.tagName)||g.isContentEditable)||z.hidden)return;let h=u.key;if(E){E=!1,h==="t"?U({modo:"tabela"}):h==="q"&&U({modo:"quadro"});return}let C=Re().map(T=>T.id),D=c?C.indexOf(c):-1;if(h==="/")u.preventDefault(),I.focus();else if(h==="?")Ho.hidden=!Ho.hidden;else if(h==="g")E=!0;else if(h==="Escape")i.size&&$o([...i],!1);else if((h==="j"||h==="k")&&r.modo==="tabela"&&C.length)c=C[Math.max(0,Math.min(C.length-1,D+(h==="j"?1:-1)))],co(),se.mostrar(c);else if(h==="x"&&c)t.find(j=>j.id===c)?.naPaginaAtual&&$o([c],!i.has(c));else if(h==="Enter"&&c){let T=t.find(j=>j.id===c)?.link;T&&e.defaultView?.location.assign(T)}}e.addEventListener("keydown",Zr);let wn=wa(e,u=>{i=u,qe(),co()}),Pn=o.armazem.aoMudarVisoes(()=>void o.armazem.lerVisoes().then(u=>{a=u}).catch(()=>{})),Ve=new Map;function He(){if(A||Mo>0)return;let u=Ro(e),g=new Map(u.processos.map(h=>[h.id,h])),b=!1;t=t.map(h=>{if(!h.naPaginaAtual)return h;let C=g.get(h.id);if(!C)return h;let D=te.get(h.id),T=Dr(e,h.id),j=Ve.get(h.id);Ve.set(h.id,T);let ro=C;if(D){for(let Ue of Object.keys(D))JSON.stringify(C[Ue])===JSON.stringify(D[Ue])&&delete D[Ue];Object.keys(D).length?ro={...C,...D}:te.delete(h.id)}let rt=JSON.stringify(ro)===JSON.stringify(h);return rt&&j===T?h:(b=!0,rt?h:ro)}),b&&(Ge(),Z())}let Fe,Yr=e.defaultView?.MutationObserver,je=Yr?new Yr(()=>{clearTimeout(Fe),Fe=setTimeout(He,o.semDebounce?0:150)}):null,ot=e.querySelector("#frmProcedimentoControlar")??e.body;je&&ot&&je.observe(ot,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["aria-pressed","aria-label","onmouseover","src","href","class"]});function Ge(){let u=Xa(e);N.textContent!==u&&(N.textContent=u)}async function Mn(){if(!o.fonte)return x=!0,et(!0);f=!0,Z();let u=()=>o.fonte?.restaurarAoSair?.();e.defaultView?.addEventListener("pagehide",u);let g=await sa(o.inicial,o.fonte,{sinal:O.signal,aoProgresso:b=>{m=b,Wr(Fo().length)},aoPagina:b=>{t=[...t,...b],Z()}});e.defaultView?.removeEventListener("pagehide",u),f=!1,x=g.completo,g.erro&&(y=g.erro),et(g.completo)}function et(u){l=ur(l,t.map(g=>g.id),o.agora(),u),o.armazem.gravarIdade(l).catch(()=>{}),Z()}async function kn(){try{let u=await o.armazem.lerEstado();r=u.visao,s=new Set(u.recolhidos),l=pa(u.idade,o.agora()),d=l.visitaAnterior,a=await o.armazem.lerVisoes()}catch{}l=ur(l,t.map(u=>u.id),o.agora(),!1),I.value=r.busca,Ge();for(let[u]of t.map(g=>[g.id]))Ve.set(u,Dr(e,u));Z(),Mn();for(let u of[1200,3500])setTimeout(()=>{Ge(),He()},u).unref?.()}return{host:z,iniciar:kn,render:Z,estado:()=>({visao:r,todos:t,selecionados:i,completo:x,carregando:f,filtrados:Fo().length}),definirVisao:u=>{r={...r,...u},I.value=r.busca,Z()},fechar(){A=!0,O.abort(),clearTimeout(w),clearTimeout(Te),clearTimeout(Fe),je?.disconnect(),W(),e.removeEventListener("keydown",Zr),wn(),Pn(),z.remove()},mostrar:u=>{z.hidden=!u},definirNomesCompletos:u=>{Kr=u,Z()},sincronizar:He}}var cn=`/* Dentro do Shadow DOM: o base.css do sei-comum (tokens) vem antes deste arquivo. */
:host { display: block; all: initial; font-family: var(--spro-fonte); }
:host([hidden]) { display: none; }
.spro-app { --fundo: var(--spro-fundo); display: block; box-sizing: border-box; margin: 4px 0 12px; color: var(--spro-texto); font: 13px/1.4 var(--spro-fonte); }
.spro-app *, .spro-app *::before, .spro-app *::after { box-sizing: border-box; }
.spro-escuro { color-scheme: dark; }
button, input, select { font: inherit; color: inherit; }
a { color: var(--spro-destaque); text-decoration: none; }
a:hover { text-decoration: underline; }
:focus-visible { outline: 2px solid var(--spro-destaque); outline-offset: 1px; }

.spro-barra { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; margin-bottom: 8px; }
.spro-busca-caixa { flex: 1 1 260px; min-width: 200px; }
.spro-busca { width: 100%; height: 34px; padding: 0 12px; background: var(--spro-fundo); border: 1px solid var(--spro-borda-forte); border-radius: var(--spro-raio); }
.spro-busca:focus { border-color: var(--spro-destaque); }
.spro-combo-compacto { height: 34px; min-width: 150px; max-width: 220px; }
.spro-faixa .spro-combo-compacto { height: 28px; font-size: 12px; min-width: 130px; }
.spro-sel-campo, .spro-nome, .spro-num { height: 34px; max-width: 190px; padding: 0 8px; background: var(--spro-fundo); border: 1px solid var(--spro-borda-forte); border-radius: var(--spro-raio); }
.spro-num { width: 64px; }
.spro-nome { max-width: none; flex: 1; }
.spro-bt { display: inline-flex; gap: 6px; align-items: center; height: 34px; padding: 0 10px; cursor: pointer; background: var(--spro-fundo); border: 1px solid var(--spro-borda-forte); border-radius: var(--spro-raio); }
.spro-bt:hover { background: var(--spro-fundo-2); }
.spro-bt-icone { width: 34px; justify-content: center; padding: 0; font-weight: 600; }
.spro-bt[hidden] { display: none; }
/* Botoes so com icone: o rotulo fica no tooltip (title) e no aria-label. */
.spro-barra .spro-bt span, .spro-seg-b span, .spro-lote .spro-bt span { display: none; }
.spro-barra .spro-bt, .spro-lote .spro-bt { width: 34px; justify-content: center; padding: 0; }
.spro-seg-b { width: 34px; justify-content: center; padding: 0; }
.spro-seg { display: inline-flex; border: 1px solid var(--spro-borda-forte); border-radius: var(--spro-raio); overflow: hidden; }
.spro-seg-b { display: inline-flex; gap: 6px; align-items: center; height: 32px; padding: 0 10px; cursor: pointer; background: var(--spro-fundo); border: 0; }
.spro-seg-b[aria-pressed="true"] { background: var(--spro-destaque); color: var(--spro-destaque-texto); }
.spro-link { padding: 0; cursor: pointer; background: none; border: 0; color: var(--spro-destaque); }
.spro-link:hover { text-decoration: underline; }
.spro-ativa { font-weight: 700; }

.spro-chips { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 6px; }
.spro-chip { display: inline-flex; gap: 4px; align-items: center; padding: 2px 4px 2px 10px; background: color-mix(in srgb, var(--spro-destaque) 14%, transparent); border-radius: 99px; }
.spro-chip-neg { background: color-mix(in srgb, var(--spro-perigo) 16%, transparent); }
.spro-chip button, .spro-aviso-x { width: 20px; height: 20px; line-height: 1; cursor: pointer; background: none; border: 0; border-radius: 99px; }
.spro-chip button:hover, .spro-aviso-x:hover { background: color-mix(in srgb, currentColor 16%, transparent); }
.spro-faixa { display: flex; flex-wrap: wrap; gap: 6px; align-items: center; margin-bottom: 8px; }
.spro-rapido { height: 26px; padding: 0 10px; cursor: pointer; background: var(--spro-fundo); border: 1px solid var(--spro-borda-forte); border-radius: 99px; font-size: 12px; }
.spro-rapido { display: inline-flex; gap: 5px; align-items: center; }
.spro-rapido-perigo .spro-icone { color: var(--spro-perigo); }
.spro-rapido-aviso .spro-icone { color: var(--spro-aviso); }
.spro-rapido-novo .spro-icone { color: var(--spro-novidade); }
.spro-rapido-on .spro-icone { color: inherit; }
.spro-rapido-on { color: var(--spro-destaque-texto); background: var(--spro-destaque); border-color: var(--spro-destaque); }
.spro-faixa .spro-sel-campo { height: 28px; font-size: 12px; }
.spro-quadro-cfg { display: flex; flex-wrap: wrap; gap: 10px; align-items: center; margin-bottom: 8px; }
.spro-rotulo-inline { display: inline-flex; gap: 4px; align-items: center; }
.spro-painel, .spro-ajuda-atalhos { display: flex; flex-direction: column; gap: 6px; max-width: 420px; padding: 12px; margin-bottom: 8px; background: var(--spro-fundo); border: 1px solid var(--spro-borda-forte); border-radius: var(--spro-raio); box-shadow: var(--spro-sombra-2); }
.spro-painel[hidden], .spro-ajuda-atalhos[hidden], .spro-lote[hidden], .spro-quadro-cfg[hidden], .spro-chips[hidden] { display: none; }
.spro-rotulo-linha { display: flex; gap: 6px; align-items: center; }
.spro-linha-form { display: flex; gap: 6px; flex-wrap: wrap; }
.spro-lista-visoes { padding: 0; margin: 0; list-style: none; }
.spro-lista-visoes li { display: flex; gap: 6px; align-items: center; justify-content: space-between; }
kbd { padding: 0 5px; font: 12px var(--spro-mono); background: var(--spro-fundo-3); border: 1px solid var(--spro-borda-forte); border-radius: 4px; }
.spro-status { margin: 4px 2px 8px; color: var(--spro-suave); font-size: 12px; }
.spro-status-alerta { color: var(--spro-aviso); }
.spro-suave { color: var(--spro-suave); }
.spro-lote { position: sticky; top: 0; z-index: 5; display: flex; flex-wrap: wrap; gap: 8px; align-items: center; padding: 8px 10px; margin-bottom: 8px; background: var(--spro-fundo); border: 1px solid var(--spro-destaque); border-radius: var(--spro-raio); box-shadow: var(--spro-sombra-2); }
.spro-lote .spro-bt { height: 30px; }

.spro-tabela { background: var(--spro-fundo); border: 1px solid var(--spro-borda); border-radius: var(--spro-raio-g); overflow: hidden; }
.spro-cab, .spro-linha { display: grid; align-items: center; column-gap: 8px; padding: 0 10px; }
.spro-cab { height: 38px; font-weight: 600; background: var(--spro-fundo-2); border-bottom: 1px solid var(--spro-borda); }
.spro-th-b { display: inline-flex; gap: 4px; align-items: center; padding: 0; font-weight: 600; cursor: pointer; background: none; border: 0; }
.spro-seta-ordem { color: var(--spro-destaque); font-size: 11px; }
.spro-rolagem { max-height: 68vh; overflow: auto; }
.spro-linha { border-bottom: 1px solid var(--spro-borda); }
.spro-linha:hover { background: var(--spro-fundo-2); }
.spro-sel { background: color-mix(in srgb, var(--spro-destaque) 10%, transparent); }
.spro-foco { box-shadow: inset 3px 0 0 var(--spro-destaque); }
.spro-c { min-width: 0; overflow: hidden; }
.spro-c-marcadores, .spro-c-sinais { display: flex; flex-wrap: wrap; gap: 4px; align-items: center; max-height: 100%; }
.spro-corta { display: block; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.spro-proc { font-weight: 600; white-space: nowrap; }
.spro-novo { font-weight: 800; }
.spro-novo::before { content: ""; display: inline-block; width: 7px; height: 7px; margin-right: 5px; background: var(--spro-novidade); border-radius: 50%; }
.spro-sigilo { margin-left: 6px; padding: 0 5px; font-size: 11px; color: var(--spro-perigo); border: 1px solid currentColor; border-radius: 99px; }
.spro-marcador { display: inline-flex; gap: 4px; align-items: center; max-width: 100%; padding: 0 7px; overflow: hidden; font-size: 12px; text-overflow: ellipsis; white-space: nowrap; background: var(--spro-fundo-3); border-radius: 99px; }
.spro-marcador i { flex: none; width: 8px; height: 8px; border-radius: 50%; }
.spro-prazo { padding: 1px 7px; font-size: 12px; white-space: nowrap; border-radius: 99px; background: var(--spro-fundo-3); }
.spro-prazo-atrasado { color: #fff; background: var(--spro-perigo); }
.spro-prazo-hoje { color: #fff; background: var(--spro-aviso); }
.spro-prazo-noPrazo { background: color-mix(in srgb, var(--spro-ok) 18%, transparent); }
.spro-prazo-concluido { color: var(--spro-suave); text-decoration: line-through; }
.spro-prio { color: var(--spro-aviso); font-weight: 600; }
.spro-sinal { padding: 0 6px; font-size: 11px; color: var(--spro-suave); border: 1px solid var(--spro-borda-forte); border-radius: 99px; white-space: nowrap; }
.spro-grupo { display: flex; gap: 12px; align-items: center; padding: 0 10px; background: var(--spro-fundo-2); border-bottom: 1px solid var(--spro-borda); }
.spro-tom-perigo > .spro-grupo-b, .spro-tom-perigo .spro-col-titulo { color: var(--spro-perigo); }
.spro-grupo-b { display: inline-flex; gap: 6px; align-items: center; font-weight: 700; cursor: pointer; background: none; border: 0; }
.spro-grupo-seta { display: inline-flex; transition: transform var(--spro-dur); }
.spro-fechado { transform: rotate(-90deg); }
.spro-grupo-n { padding: 0 7px; font-size: 11px; font-weight: 600; color: var(--spro-suave); background: var(--spro-fundo-3); border-radius: 99px; }
.spro-vazio { padding: 32px 16px; text-align: center; color: var(--spro-suave); }
.spro-cb { width: 16px; height: 16px; cursor: pointer; }

.spro-quadro { display: flex; flex-direction: column; gap: 14px; }
.spro-colunas { display: flex; gap: 10px; padding-bottom: 8px; overflow-x: auto; align-items: flex-start; }
.spro-raia-nome { margin-bottom: 6px; font-weight: 700; }
.spro-col { flex: 0 0 280px; max-height: 70vh; display: flex; flex-direction: column; background: var(--spro-fundo-2); border: 1px solid var(--spro-borda); border-radius: var(--spro-raio-g); }
.spro-col-topo { display: flex; gap: 8px; align-items: center; padding: 8px 10px; font-weight: 700; border-bottom: 1px solid var(--spro-borda); }
.spro-col-titulo { flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.spro-col-n { padding: 0 7px; font-size: 11px; color: var(--spro-suave); background: var(--spro-fundo-3); border-radius: 99px; }
.spro-excedeu { color: #fff; background: var(--spro-perigo); }
.spro-col-cheia { border-color: var(--spro-perigo); }
.spro-col-trava { color: var(--spro-fraco); display: inline-flex; }
.spro-col-corpo { display: flex; flex-direction: column; gap: 8px; padding: 8px; overflow-y: auto; min-height: 60px; }
.spro-col-vazia { padding: 18px 0; text-align: center; color: var(--spro-fraco); font-size: 12px; border: 1px dashed var(--spro-borda-forte); border-radius: var(--spro-raio); }
.spro-alvo { outline: 2px dashed var(--spro-destaque); outline-offset: -2px; }
.spro-cartao { display: flex; flex-direction: column; gap: 4px; padding: 8px 10px; cursor: grab; background: var(--spro-fundo); border: 1px solid var(--spro-borda); border-radius: var(--spro-raio); box-shadow: var(--spro-sombra-1); }
.spro-cartao:hover { border-color: var(--spro-borda-forte); box-shadow: var(--spro-sombra-2); }
.spro-arrastando { opacity: 0.45; }
.spro-cartao-topo { display: flex; gap: 6px; align-items: center; }
.spro-cartao-tipo { font-size: 12px; color: var(--spro-suave); }
.spro-cartao-espec { overflow: hidden; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; }
.spro-cartao-rodape { display: flex; gap: 6px; align-items: center; justify-content: space-between; }
.spro-avatar { display: inline-grid; place-items: center; width: 24px; height: 24px; font-size: 10px; font-weight: 700; color: var(--spro-destaque-texto); background: var(--spro-destaque); border-radius: 50%; }

.spro-avisos { position: fixed; right: 16px; bottom: 16px; z-index: 2147483000; display: flex; flex-direction: column; gap: 8px; }
.spro-aviso { display: flex; gap: 10px; align-items: center; max-width: 420px; padding: 10px 12px; color: var(--spro-texto); background: var(--spro-fundo); border: 1px solid var(--spro-borda-forte); border-radius: var(--spro-raio); box-shadow: var(--spro-sombra-3); }
@media (max-width: 760px) { .spro-seg-b span, .spro-bt span { display: none; } .spro-col { flex-basis: 240px; } }
@media (prefers-reduced-motion: reduce) { .spro-grupo-seta { transition: none; } }

/* ---- Icones dos outros modulos, edicao inline ---- */
.spro-icones { display: inline-flex; gap: 2px; align-items: center; margin-right: 6px; vertical-align: middle; }
.spro-icones > * { flex: none; width: 22px; height: 24px; }
.spro-slot { display: inline-block; }
.spro-acomp { align-items: center; justify-content: center; }
.spro-icones button { display: inline-flex; align-items: center; justify-content: center; padding: 2px; cursor: pointer; background: none; border: 0; border-radius: 6px; color: var(--spro-suave); position: relative; }
.spro-icones button:hover { background: var(--spro-fundo-3); }
.spro-icones .spro-fav-estrela[aria-pressed="true"] { color: var(--spro-estrela); }
.spro-acomp { display: inline-flex; color: var(--spro-destaque); }
.spro-urgente { margin-left: 6px; padding: 0 6px; font-size: 11px; font-weight: 700; color: #fff; background: var(--spro-perigo); border-radius: 99px; }
.spro-linha-urgente { box-shadow: inset 3px 0 0 var(--spro-perigo); }
.spro-c-processo { display: flex; align-items: center; min-width: 0; }
.spro-c-processo .spro-proc { flex: none; }
.spro-editavel { position: relative; display: flex; align-items: center; gap: 4px; }
.spro-lapis { display: inline-flex; flex: none; align-items: center; justify-content: center; width: 22px; height: 22px; padding: 0; cursor: pointer; color: var(--spro-suave); background: none; border: 0; border-radius: 6px; opacity: 0; transition: opacity var(--spro-dur); }
.spro-linha:hover .spro-lapis, .spro-lapis:focus-visible, .spro-edicao .spro-lapis { opacity: 1; }
.spro-lapis:hover { color: var(--spro-destaque); background: var(--spro-fundo-3); }
.spro-lapis-ok { color: var(--spro-ok); }
.spro-lapis-fixo { cursor: default; pointer-events: none; }
.spro-edicao { display: flex; flex: 1; gap: 2px; align-items: center; min-width: 0; }
.spro-espec-input { flex: 1; min-width: 0; height: 28px; padding: 0 8px; background: var(--spro-fundo); border: 1px solid var(--spro-destaque); border-radius: var(--spro-raio-p); }
.spro-prazo-b { display: inline-flex; padding: 0; cursor: pointer; background: none; border: 0; text-align: left; }
.spro-prazo-vazio { padding: 1px 8px; font-size: 12px; color: var(--spro-fraco); border: 1px dashed var(--spro-borda-forte); border-radius: 99px; opacity: 0; }
.spro-linha:hover .spro-prazo-vazio, .spro-prazo-b:focus-visible .spro-prazo-vazio { opacity: 1; }
.spro-prazo-b:hover .spro-prazo, .spro-prazo-b:hover .spro-prazo-vazio { outline: 2px solid color-mix(in srgb, var(--spro-destaque) 40%, transparent); }
.spro-corta { flex: 1; min-width: 0; }

/* ---- Modais de edicao (responsavel, anotacao, marcadores) ---- */
.spro-form { display: flex; flex-direction: column; gap: 12px; min-width: min(420px, 80vw); }
.spro-campo-rotulo { display: flex; flex-direction: column; gap: 6px; font-weight: 600; }
.spro-area { width: 100%; min-height: 120px; padding: 8px 10px; resize: vertical; font: inherit; }
.spro-contador { margin-left: auto; font-size: 12px; }
.spro-estender { padding: 8px 10px; background: var(--spro-fundo-2); border-radius: var(--spro-raio); }
.spro-dialogo-sub { display: block; margin-top: 2px; font-size: 12px; font-weight: 400; color: var(--spro-suave); }
.spro-marcadores-lista { display: flex; flex-direction: column; gap: 8px; }
.spro-marcador-linha { display: grid; grid-template-columns: minmax(120px, 190px) 1fr auto; gap: 8px; align-items: center; }
.spro-vazio-edicao { opacity: 0; font-size: 11px; }
.spro-editavel-quebra { flex-wrap: wrap; }
.spro-linha:hover .spro-vazio-edicao { opacity: 1; }
`;var ln=`/* Na p\xE1gina do SEI (fora do Shadow DOM): o bot\xE3o alternador e o espa\xE7o da grade. */
/* Mesmo tamanho, margem e cor dos botoes vizinhos da barra de titulo (seta de recolher e ordenar os paineis). */
.spro-grade-botao { display: inline-flex; flex: none; align-items: center; justify-content: center; margin-left: 4px; padding: 2px; line-height: 0; color: inherit; vertical-align: middle; position: relative; top: -3px; cursor: pointer; background: none; border: 0; border-radius: 6px; }
.spro-grade-botao:hover { background: color-mix(in srgb, currentColor 14%, transparent); }
.spro-grade-botao[aria-pressed="true"] { background: color-mix(in srgb, currentColor 9%, transparent); }
.spro-grade-botao:focus-visible { outline: 2px solid #1f5fbf; outline-offset: 1px; }
/* Com a grade ativa a barra de acoes sobe um pouco e ganha respiro antes da barra de ferramentas da grade. */
html[data-spro-grade] #collapseControle { margin-top: -6px; margin-bottom: 22px; }
#spro-grade { display: block; width: 100%; flex: 0 0 100%; }
#spro-grade[hidden] { display: none; }
`;var xi="gradecontrole";function yi(){return new URL(location.href).searchParams.get("acao")==="procedimento_controlar"}var Wo=()=>!!document.body?.classList.contains("dark-mode")||at(localStorage),So=!1,J=null,wo=null,Vo=null,pn=0,Nr=!1,De=null,dn=document.readyState!=="loading";function Ai(){let o=document.querySelector(na);return document.getElementById("divTabelaProcesso")??o?.parentElement??null}function Do(o){wo?.pronta(),J?.mostrar(!1),ge(document),o&&o!=="usuario"&&console.warn("[SEI Pro] Grade do controle indispon\xEDvel, usando a vis\xE3o nativa:",o)}function Ie(){if(J||!So)return;let o=new ue(location.href,()=>Bo(document,location.href)),e=or(Bo(document,location.href)),t=e.unidade.id,r=ha({local:Be(chrome.storage.local,"local"),sync:Be(chrome.storage.sync,"sync")},String(t));if(["hdnRecebidosPaginaAtual","hdnGeradosPaginaAtual"].some(c=>document.getElementById(c)?.value&&document.getElementById(c).value!=="0")&&!sessionStorage.getItem("spro_grade_reset")){try{sessionStorage.setItem("spro_grade_reset","1")}catch{}pr(o.http,Bo(document,location.href)).restaurar().then(()=>location.reload()).catch(()=>Do("pagina intermediaria"));return}try{sessionStorage.removeItem("spro_grade_reset")}catch{}let n=Ro(document);if(!n.processos.length&&!n.totais.recebidos&&!n.totais.gerados)return wo?.pronta(),Do("caixa vazia");let s=Ai();if(!s)return Do("sem ponto de encaixe");let i=n.processos.filter(c=>!c.sigiloso&&c.naPaginaAtual).slice(0,6).map(c=>c.protocolo);J=sn({doc:document,inicial:n,agora:()=>Date.now(),hoje:()=>ce(),eu:e.usuario.login||void 0,armazem:r,fonte:pr(o.http,Bo(document,location.href)),mover:{marcador:async(c,l)=>void await $t(o,c,l,{aplicar:!0}),atribuir:async(c,l)=>void await It(o,c,l,{aplicar:!0})},acoes:()=>Ht(document),css:`${st}
${cn}`,escuro:Wo(),baixar:(c,l,d)=>lt(c,l,d),novoId:()=>nt(),extras:i.length?async()=>{let c=async m=>{let f;for(let x of i)try{return await Et(o,m,x)}catch(y){f=y}return console.warn(`[SEI Pro] Grade: nao foi possivel ler a lista de ${m}`,f instanceof Error?f.message:f),[]},[l,d]=await Promise.all([c("marcadores"),c("usuarios")]);return{marcadores:l.map(m=>m.nome),responsaveis:d.map(m=>{let[f,...x]=m.nome.split(" - ");return{sigla:f.trim(),nome:x.join(" - ").trim()||f.trim()}})}}:void 0,aoVoltarNativa:()=>Zo(),editarEspecificacao:async(c,l)=>void await Pt(o,c,{especificacao:l},{aplicar:!0}),abrirPrazo:c=>{document.documentElement.setAttribute("data-spro-prazos-alvo",c),document.dispatchEvent(new CustomEvent("spro-prazos-abrir"))},anotar:async(c,l)=>void await Dt(o,c,l,{aplicar:!0})}),J.definirNomesCompletos(Nr),s.before(J.host),Ei(),J.iniciar().then(()=>{wo?.pronta(),Co(document)&&nr(document)}).catch(c=>Do(String(c)))}function Ei(){De?.disconnect();let o=window.MutationObserver,e=!1;De=new o(()=>{e||(e=!0,setTimeout(()=>{if(e=!1,!(!J||!So||J.host.isConnected&&!!J.host.shadowRoot&&document.querySelectorAll("#spro-grade").length===1||pn>=6)){pn+=1,J.fechar(),J=null;for(let r of document.querySelectorAll("#spro-grade"))r.remove();(Co(document)||So)&&Ie()}},150))}),De.observe(document.body??document.documentElement,{childList:!0,subtree:!0})}function Zo(){Co(document)?(J?.mostrar(!1),ge(document)):(fe(document,Wo()),J?(J.mostrar(!0),nr(document)):Ie()),Vo?.(),Vo=ve(document,()=>Co(document),Zo)}function Si(o){o!==So&&(So=o,Bt(localStorage,o),o?(fe(document,Wo()),wo=sr(Do),dn&&(wo.iniciarContagem(),Ie()),Vo=ve(document,()=>Co(document),Zo)):(Vo?.(),Vo=null,De?.disconnect(),J?.fechar(),J=null,wo?.pronta(),ge(document)))}function wi(){if(!yi())return;let o=document.createElement("style");o.textContent=ln,(document.head??document.documentElement).append(o),Ut(localStorage)&&(So=!0,fe(document,Wo()),wo=sr(Do)),Kt(document,Zo),Gt(document,Wo);let e=()=>{dn=!0,So&&(wo?.iniciarContagem(),Ie(),Vo??=ve(document,()=>Co(document),Zo))};document.readyState==="loading"?document.addEventListener("DOMContentLoaded",e,{once:!0}):e();let t=a=>{Nr=Qe(a,"nomesusuarios"),J?.definirNomesCompletos(Nr),Si(Qe(a,xi))},r=!1;chrome.storage.onChanged.addListener((a,n)=>{n!=="sync"||!("dataValues"in a)||(r=!0,t(a.dataValues.newValue))}),chrome.storage.sync.get("dataValues").then(a=>{r||t(a.dataValues)}).catch(()=>{So&&Do("sem prefer\xEAncias")})}wi();})();
