/* GERADO por grade-controle/build.mjs. NAO EDITE. Rode: npm run build */
"use strict";(()=>{function Ps(o){let e={};for(let[r,t]of Object.entries(o)){let a={};t&&"newValue"in t&&(a.novo=t.newValue),t&&"oldValue"in t&&(a.antigo=t.oldValue),e[r]=a}return e}function dr(o,e){return{obter:(r=null)=>o.get(r),gravar:r=>o.set(r),remover:r=>o.remove(r),chaves:typeof o.getKeys=="function"?()=>o.getKeys():void 0,aoMudar(r){let t=(a,n)=>{n===e&&r(Ps(a))};return chrome.storage.onChanged.addListener(t),()=>chrome.storage.onChanged.removeListener(t)}}}var wt=o=>String(o).padStart(2,"0");function Vo(o=new Date){return`${o.getFullYear()}-${wt(o.getMonth()+1)}-${wt(o.getDate())}`}function ve(o){let e=/^(\d{4})-(\d{2})-(\d{2})$/.exec(o);if(!e)throw new Error(`Data inv\xE1lida: ${o}`);return new Date(Number(e[1]),Number(e[2])-1,Number(e[3]),12)}function Lo(o,e){return Math.round((ve(e).getTime()-ve(o).getTime())/864e5)}function co(o){let[e,r,t]=o.split("-");return`${t}/${r}/${e}`}function Mt(o,e){let r=o;if(typeof o=="string"){if(!o.trim())return;try{r=JSON.parse(o)}catch{return}}return!Array.isArray(r)||r.length===0?void 0:r.map(a=>a?.configGeral).find(Array.isArray)?.find(a=>a?.name===e)?.value}function Dt(o,e){let r=Mt(o,e);return!(r===!1||r===0||r==="")}function Ct(o,e){let r=Mt(o,e);return r===!0||r===1||r==="1"}function kt(o){try{return!!o.getItem("darkModePro")}catch{return!1}}function Ot(o){let e=o.documentElement?.getAttribute("data-spro-tema");return e==="claro"||e==="escuro"?e:null}function Lt(o,e){let r=o.defaultView?.MutationObserver??globalThis.MutationObserver;if(typeof r!="function"||!o.documentElement)return()=>{};let t=new r(e);return t.observe(o.documentElement,{attributes:!0,attributeFilter:["data-spro-tema"]}),()=>t.disconnect()}function It(o=crypto){if(typeof o.randomUUID=="function")return o.randomUUID();let e=o.getRandomValues(new Uint8Array(16));e[6]=(e[6]??0)&15|64,e[8]=(e[8]??0)&63|128;let r=[...e].map(t=>t.toString(16).padStart(2,"0")).join("");return`${r.slice(0,8)}-${r.slice(8,12)}-${r.slice(12,16)}-${r.slice(16,20)}-${r.slice(20)}`}var $t=`/*
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
`;function d(o,e={},...r){let t=document.createElement(o);for(let[a,n]of Object.entries(e))n===void 0||n===!1||(typeof n=="function"?t.addEventListener(a.replace(/^on/,""),n):n===!0?t.setAttribute(a,""):a==="class"?t.className=n:a==="value"&&o==="textarea"?t.value=n:t.setAttribute(a,n));for(let a of r)a!=null&&a!==!1&&t.append(a);return t}var lo={fill:"currentColor",stroke:"none"},Tt="M12 3.2l2.7 5.5 6 .9-4.35 4.25 1 6L12 17l-5.35 2.85 1-6L3.3 9.6l6-.9z",Rt={estrela:[["path",{d:Tt}]],estrelaCheia:[["path",{d:Tt,fill:"currentColor"}]],alvo:[["circle",{cx:"12",cy:"12",r:"7.5"}],["circle",{cx:"12",cy:"12",r:"3.2"}]],alvoAtivo:[["circle",{cx:"12",cy:"12",r:"6.6"}],["circle",{cx:"12",cy:"12",r:"2.4",fill:"currentColor"}],["path",{d:"M12 2.2v3.4M12 18.4v3.4M2.2 12h3.4M18.4 12h3.4"}]],pasta:[["path",{d:"M3.5 7.5a2 2 0 0 1 2-2h4l2 2h7a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2z"}]],etiqueta:[["path",{d:"M3.5 12.2V4.5a1 1 0 0 1 1-1h7.7l8.3 8.3a1 1 0 0 1 0 1.4l-7.1 7.1a1 1 0 0 1-1.4 0z"}],["circle",{cx:"8",cy:"8",r:"1.4",...lo}]],relogio:[["circle",{cx:"12",cy:"12",r:"9"}],["path",{d:"M12 7.2V12l3.2 1.9"}]],nota:[["path",{d:"M6 3.5h9l3.5 3.5v13.5H6z"}],["path",{d:"M9 11h6"}],["path",{d:"M9 15h6"}]],lixeira:[["path",{d:"M4.5 6.5h15"}],["path",{d:"M9.5 6.5V4.8c0-.7.6-1.3 1.3-1.3h2.4c.7 0 1.3.6 1.3 1.3v1.7"}],["path",{d:"M6.8 6.5 7.6 19c0 .8.7 1.5 1.5 1.5h5.8c.8 0 1.5-.7 1.5-1.5l.8-12.5"}]],lapis:[["path",{d:"M17.5 3.5a2.1 2.1 0 0 1 3 3L9 18l-4.5 1.5L6 15z"}],["path",{d:"M15 6l3 3"}]],fechar:[["path",{d:"M18 6 6 18"}],["path",{d:"M6 6l12 12"}]],mais:[["path",{d:"M12 5v14"}],["path",{d:"M5 12h14"}]],busca:[["circle",{cx:"11",cy:"11",r:"6.5"}],["path",{d:"M20.5 20.5l-4.8-4.8"}]],baixar:[["path",{d:"M12 3.5v11"}],["path",{d:"M7.5 10.2 12 14.7l4.5-4.5"}],["path",{d:"M4.5 19.5h15"}]],subir:[["path",{d:"M12 14.5v-11"}],["path",{d:"M7.5 7.8 12 3.3l4.5 4.5"}],["path",{d:"M4.5 19.5h15"}]],copiar:[["rect",{x:"8.5",y:"8.5",width:"12",height:"12",rx:"2"}],["path",{d:"M15.5 8.5V5.5a2 2 0 0 0-2-2h-8a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h3"}]],restaurar:[["path",{d:"M9 14 4 9l5-5"}],["path",{d:"M4 9h9a7 7 0 0 1 7 7v4"}]],check:[["path",{d:"M20 6.5 9.2 17.3 4 12.1"}]],alerta:[["path",{d:"M10.3 4.4 2.8 17.6a2 2 0 0 0 1.7 3h15a2 2 0 0 0 1.7-3L13.7 4.4a2 2 0 0 0-3.4 0z"}],["path",{d:"M12 9.5v4"}],["circle",{cx:"12",cy:"16.8",r:"1",...lo}]],menu:[["circle",{cx:"5",cy:"12",r:"1.4",...lo}],["circle",{cx:"12",cy:"12",r:"1.4",...lo}],["circle",{cx:"19",cy:"12",r:"1.4",...lo}]],alca:[["circle",{cx:"9",cy:"6",r:"1.3",...lo}],["circle",{cx:"15",cy:"6",r:"1.3",...lo}],["circle",{cx:"9",cy:"12",r:"1.3",...lo}],["circle",{cx:"15",cy:"12",r:"1.3",...lo}],["circle",{cx:"9",cy:"18",r:"1.3",...lo}],["circle",{cx:"15",cy:"18",r:"1.3",...lo}]],ajustes:[["path",{d:"M4 7h5"}],["path",{d:"M13 7h7"}],["circle",{cx:"11",cy:"7",r:"2.1"}],["path",{d:"M4 17h9"}],["path",{d:"M17 17h3"}],["circle",{cx:"15",cy:"17",r:"2.1"}]],setaCima:[["path",{d:"M12 19V6"}],["path",{d:"M6 12l6-6 6 6"}]],setaBaixo:[["path",{d:"M12 5v13"}],["path",{d:"M18 12l-6 6-6-6"}]],recolher:[["path",{d:"M6 15l6-6 6 6"}]],expandir:[["path",{d:"M6 9l6 6 6-6"}]],local:[["path",{d:"M12 21s-6.5-6.1-6.5-11a6.5 6.5 0 0 1 13 0c0 4.9-6.5 11-6.5 11z"}],["circle",{cx:"12",cy:"10",r:"2.3"}]],sino:[["path",{d:"M6.5 16.5V11a5.5 5.5 0 0 1 11 0v5.5l1.5 1.5h-14z"}],["path",{d:"M10 20.5a2 2 0 0 0 4 0"}]],documento:[["path",{d:"M7 3.5h7l4 4v13H7z"}],["path",{d:"M14 3.5v4h4"}]],painel:[["rect",{x:"3.5",y:"4.5",width:"17",height:"15",rx:"2"}],["path",{d:"M14.5 4.5v15"}]],atualizar:[["path",{d:"M19.5 12a7.5 7.5 0 1 1-2.2-5.3"}],["path",{d:"M19.5 4.5v4h-4"}]],nuvem:[["path",{d:"M7 18.5h10a4 4 0 0 0 .6-7.95A5.5 5.5 0 0 0 7 9.5a4.5 4.5 0 0 0 0 9z"}]],chevron:[["path",{d:"M7 9.5l5 5 5-5"}]],pino:[["path",{d:"M9.5 3.5h5l-.8 5.2 3.3 3.1v1.7H7v-1.7l3.3-3.1z"}],["path",{d:"M12 13.5v7"}]],pinoCheio:[["path",{d:"M9.5 3.5h5l-.8 5.2 3.3 3.1v1.7H7v-1.7l3.3-3.1z",fill:"currentColor"}],["path",{d:"M12 13.5v7"}]],filtro:[["path",{d:"M4 5.5h16l-6.2 7.3v5.4l-3.6 1.8v-7.2z"}]],ordenar:[["path",{d:"M7.5 4.5v15"}],["path",{d:"M4 16l3.5 3.5L11 16"}],["path",{d:"M16.5 19.5v-15"}],["path",{d:"M13 8l3.5-3.5L20 8"}]],mapa:[["path",{d:"M9 4.5 3.5 6.6v13l5.5-2.1 6 2.1 5.5-2.1v-13L15 6.6z"}],["path",{d:"M9 4.5v13"}],["path",{d:"M15 6.6v13"}]],olho:[["path",{d:"M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z"}],["circle",{cx:"12",cy:"12",r:"2.8"}]],camadas:[["path",{d:"M12 3.5 20.5 8 12 12.5 3.5 8z"}],["path",{d:"M3.5 12 12 16.5 20.5 12"}],["path",{d:"M3.5 16 12 20.5 20.5 16"}]],historico:[["path",{d:"M3.8 12.5A8.3 8.3 0 1 0 6.2 6"}],["path",{d:"M3.8 4.2v4.3h4.3"}],["path",{d:"M12 8v4.2l2.8 1.7"}]],pessoa:[["circle",{cx:"12",cy:"8",r:"3.6"}],["path",{d:"M5 20c.9-3.7 3.6-5.6 7-5.6s6.1 1.9 7 5.6"}]],predio:[["path",{d:"M5 20.5v-15a1 1 0 0 1 1-1h7.5a1 1 0 0 1 1 1v15"}],["path",{d:"M14.5 9.5H18a1 1 0 0 1 1 1v10"}],["path",{d:"M3 20.5h18"}],["path",{d:"M8.5 8.5h3"}],["path",{d:"M8.5 12h3"}],["path",{d:"M8.5 15.5h3"}]],brilho:[["path",{d:"M12 3.5l1.9 5.1 5.1 1.9-5.1 1.9L12 17.5l-1.9-5.1L5 10.5l5.1-1.9z"}],["path",{d:"M18.5 16.5v4"}],["path",{d:"M16.5 18.5h4"}]],calendario:[["rect",{x:"4",y:"5.5",width:"16",height:"15",rx:"2"}],["path",{d:"M4 10h16"}],["path",{d:"M8.5 3.5v4"}],["path",{d:"M15.5 3.5v4"}]],cadeado:[["rect",{x:"5.5",y:"10.5",width:"13",height:"10",rx:"2"}],["path",{d:"M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5"}]],saida:[["path",{d:"M14 4.5h4.5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H14"}],["path",{d:"M10 16l4-4-4-4"}],["path",{d:"M14 12H4.5"}]],planilha:[["rect",{x:"4",y:"4",width:"16",height:"16",rx:"2"}],["path",{d:"M4 9.5h16"}],["path",{d:"M4 15h16"}],["path",{d:"M10 9.5V20"}]],mover:[["path",{d:"M4.5 12h14"}],["path",{d:"M13.5 6.5 19 12l-5.5 5.5"}]],sol:[["circle",{cx:"12",cy:"12",r:"3.8"}],["path",{d:"M12 2.8v2M12 19.2v2M2.8 12h2M19.2 12h2M5.5 5.5l1.4 1.4M17.1 17.1l1.4 1.4M5.5 18.5l1.4-1.4M17.1 6.9l1.4-1.4"}]],teclado:[["rect",{x:"3",y:"6.5",width:"18",height:"11",rx:"2"}],["path",{d:"M7 10h.01M10.3 10h.01M13.7 10h.01M17 10h.01M8 14h8"}]],gantt:[["path",{d:"M4 5h9M7 12h11M4 19h7"}],["path",{d:"M3 3v18"}]],demandas:[["circle",{cx:"10",cy:"7.8",r:"3.2"}],["path",{d:"M3.8 19.5a6.2 5.2 0 0 1 11.8-2.6"}],["circle",{cx:"17.6",cy:"17.6",r:"4.2"}],["path",{d:"m15.6 17.7 1.5 1.5 2.5-3"}]]},Yc=Object.keys(Rt);function z(o,e=18,r=document){let t="http://www.w3.org/2000/svg",a=r.createElementNS(t,"svg"),n={viewBox:"0 0 24 24",width:String(e),height:String(e),fill:"none",stroke:"currentColor","stroke-width":"1.8","stroke-linecap":"round","stroke-linejoin":"round","aria-hidden":"true",focusable:"false",class:"spro-icone"};for(let[s,i]of Object.entries(n))a.setAttribute(s,i);for(let[s,i]of Rt[o]){let c=r.createElementNS(t,s);for(let[l,m]of Object.entries(i))c.setAttribute(l,m);a.append(c)}return a}function Nt(o,e,r,t=1e4){let a=URL.createObjectURL(new Blob([e],{type:r})),n=d("a",{href:a,download:o});document.body.append(n),n.click(),n.remove(),setTimeout(()=>URL.revokeObjectURL(a),t).unref?.()}var D=class extends Error{codigo;detalhe;constructor(e,r,t){super(r),this.name="ErroSei",this.codigo=e,this.detalhe=t}paraJSON(){return{codigo:this.codigo,mensagem:this.message,detalhe:this.detalhe}}};function pr(o){if(o instanceof D)return o;if(o instanceof DOMException&&o.name==="AbortError")return new D("CANCELADO","Opera\xE7\xE3o cancelada.");let e=o instanceof Error?o.message:String(o);return new D("SEI_REDE",`Falha ao falar com o SEI: ${e}`)}var Ms={AElig:198,Aacute:193,Acirc:194,Agrave:192,Aring:197,Atilde:195,Auml:196,Ccedil:199,ETH:208,Eacute:201,Ecirc:202,Egrave:200,Euml:203,Iacute:205,Icirc:206,Igrave:204,Iuml:207,Ntilde:209,Oacute:211,Ocirc:212,Ograve:210,Oslash:216,Otilde:213,Ouml:214,THORN:222,Uacute:218,Ucirc:219,Ugrave:217,Uuml:220,Yacute:221,aacute:225,acirc:226,acute:180,aelig:230,agrave:224,amp:38,apos:39,aring:229,atilde:227,auml:228,brvbar:166,bull:8226,ccedil:231,cedil:184,cent:162,copy:169,curren:164,deg:176,divide:247,eacute:233,ecirc:234,egrave:232,eth:240,euml:235,euro:8364,frac12:189,frac14:188,frac34:190,gt:62,hellip:8230,iacute:237,icirc:238,iexcl:161,igrave:236,iquest:191,iuml:239,laquo:171,ldquo:8220,lsquo:8216,lt:60,macr:175,mdash:8212,micro:181,middot:183,nbsp:160,ndash:8211,not:172,ntilde:241,oacute:243,ocirc:244,ograve:242,ordf:170,ordm:186,oslash:248,otilde:245,ouml:246,para:182,plusmn:177,pound:163,quot:34,raquo:187,rdquo:8221,reg:174,rsquo:8217,sect:167,shy:173,sup1:185,sup2:178,sup3:179,szlig:223,thorn:254,times:215,trade:8482,uacute:250,ucirc:251,ugrave:249,uml:168,uuml:252,yacute:253,yen:165,yuml:255};function X(o){return o.includes("&")?o.replace(/&(#x[0-9a-fA-F]+|#\d+|[a-zA-Z][a-zA-Z0-9]*);/g,(e,r)=>{let t=r[0]==="#"?r[1]==="x"||r[1]==="X"?parseInt(r.slice(2),16):parseInt(r.slice(1),10):Ms[r];return t===void 0||Number.isNaN(t)?e:String.fromCodePoint(t)}):o}var zt={128:8364,130:8218,131:402,132:8222,133:8230,134:8224,135:8225,136:710,137:8240,138:352,139:8249,140:338,142:381,145:8216,146:8217,147:8220,148:8221,149:8226,150:8211,151:8212,152:732,153:8482,154:353,155:8250,156:339,158:382,159:376};var _t=null;function xe(o){return _t?_t(o):new DOMParser().parseFromString(o,"text/html")}function _(o){return(o?.textContent??"").replace(/\s+/g," ").trim()}var Ds={n:`
`,r:"\r",t:"	",b:"\b",f:"\f",v:"\v",0:"\0"};function ur(o,e){let r=o[e],t="";for(e+=1;e<o.length;){let a=o[e];if(a==="\\"){let n=o[e+1];if(n==="u"&&/^[0-9a-fA-F]{4}$/.test(o.slice(e+2,e+6))){t+=String.fromCharCode(parseInt(o.slice(e+2,e+6),16)),e+=6;continue}t+=Ds[n]??n,e+=2;continue}if(a===r)return[t,e+1];t+=a,e+=1}return[t,e]}function Ae(o,e){let r=[],t=e;for(;t<o.length;){let a=o[t];if(a===")")return[r,t+1];if(a===","||/\s/.test(a)){t+=1;continue}if(a==='"'||a==="'"){let[i,c]=ur(o,t);r.push(i),t=c;continue}let n=/^(null|true|false|-?\d+(?:\.\d+)?)/.exec(o.slice(t,t+32));if(n){let i=n[1];r.push(i==="null"?null:i==="true"?!0:i==="false"?!1:Number(i)),t+=i.length;continue}let s=0;for(;t<o.length;){let i=o[t];if(i==="(")s+=1;else if(i===")"){if(s===0)break;s-=1}else if(i===","&&s===0)break;t+=1}r.push(null)}return[r,t]}function yo(o,e){let r=[],t=new RegExp(`\\b${e}\\(`,"g");for(let a of o.matchAll(t)){let[n]=Ae(o,a.index+a[0].length);r.push(n)}return r}function q(o){return typeof o=="string"?X(o):o==null?"":String(o)}var Cs=/controlador(?:_ajax)?\.php\?acao=[^"'\s<>\\]*?infra_hash=[0-9a-f]{64,192}/g;function Eo(o){let e=new Set;for(let r of o.replace(/&amp;/g,"&").matchAll(Cs))e.add(r[0]);return[...e]}function Y(o){let e=o.indexOf("?");return new URLSearchParams(e>=0?o.slice(e+1):"")}function eo(o,e,r={}){let t=Array.isArray(o)?o:Eo(o);for(let a of t){let n=Y(a),s=n.get("acao")??"";if(!(typeof e=="string"?s!==e:!e.test(s))&&Object.entries(r).every(([i,c])=>n.get(i)===c))return a}return null}function qt(o,e){let r=[...o.doc.querySelectorAll("#infraMenu a[href], #main-menu a[href], .infraMenu a[href]")].map(s=>s.getAttribute("href")??"").join(`
`),t=Eo(r).filter(s=>Y(s).get("acao")===e),n=(t.length?t:Eo(o.html).filter(s=>Y(s).get("acao")===e)).sort((s,i)=>[...Y(s).keys()].length-[...Y(i).keys()].length)[0];if(!n)throw new D("SEI_ACAO_INDISPONIVEL",`O menu do SEI n\xE3o oferece "${e}" para este usu\xE1rio.`);return n}function ks(o){let e=new Map;for(let r of o.matchAll(/Nos\[(\d+)\]\s*=\s*new\s+infraArvoreNo\(/g)){let[t]=Ae(o,r.index+r[0].length);e.set(Number(r[1]),{indice:Number(r[1]),args:t,props:{}})}for(let r of o.matchAll(/Nos\[(\d+)\]\.(\w+)\s*=\s*(['"])/g)){let t=e.get(Number(r[1]));if(!t)continue;let[a]=ur(o,r.index+r[0].length-1);t.props[r[2]]=a}return[...e.values()].sort((r,t)=>r.indice-t.indice)}function Os(o){let e=[];for(let r of o.matchAll(/new\s+infraArvoreAcao\(/g)){let[t]=Ae(o,r.index+r[0].length);e.push({tipo:q(t[0]),idPai:q(t[2]),href:q(t[3]),titulo:q(t[5]),icone:q(t[6]),extra:t[8]==null?void 0:q(t[8])})}return e}function Vt(o,e){let r=o.find(s=>s.tipo==="NIVEL_ACESSO"&&s.idPai===e);if(!r)return{nivel:"publico"};let[t,...a]=r.titulo.split(`
`);return{nivel:/sigilos/i.test(t)||/sigiloso/.test(r.icone)?"sigiloso":"restrito",hipotese:a.join(" ").trim()||void 0}}function Ht(o){return[...new Set([...o.matchAll(/<img[^>]*\btitle="([^"]+)"/g)].map(e=>q(e[1])))]}var Ls=/\s*\(\d{5,}\)\s*$/;function Is(o){let e=o.html,r=ks(e),t=Os(e),a=r.find(c=>c.args[0]==="PROCESSO");if(!a)throw new D("SEI_VERSAO_NAO_SUPORTADA","A \xE1rvore do processo n\xE3o tem o n\xF3 do processo.");let n=q(a.args[1]),s=Vt(t,n),i=r.filter(c=>c.args[0]==="DOCUMENTO").map(c=>{let l=q(c.args[1]),m=q(c.args[5]),g=q(c.args[7]),u=(c.props.src??"").replace(/&amp;/g,"&"),x=t.find(b=>b.tipo==="ASSINATURA"&&b.idPai===l),{nivel:y,hipotese:M}=Vt(t,l),E=(/documento_([a-z0-9]+)\.svg/.exec(g)?.[1]??"interno").replace("cancelado","interno");return{id:l,numero:q(c.args[15])||(/\((\d{5,})\)\s*$/.exec(m)?.[1]??""),titulo:m.replace(Ls,""),pasta:c.args[2]&&String(c.args[2]).startsWith("PASTA")?String(c.args[2]):null,externo:/documento_download_anexo/.test(u)||!/documento_interno|documento_cancelado|formulario|email/.test(g),formato:E,nivel:y,hipotese:M,assinado:!!x,assinaturas:x?x.titulo.split(`
`).slice(1).filter(Boolean):[],cancelado:/documento_cancelado/.test(g),unidadeGeradora:t.find(b=>b.tipo==="UNIDADE_GERADORA"&&b.idPai===l)?.extra,link:q(c.args[3]).replace(/&amp;/g,"&"),src:u,acoes:Eo(c.props.acoes??""),botoes:Ht(c.props.acoes??"")}});return{idProcedimento:n,protocolo:q(a.args[5])||q(a.args[15]),tipo:q(a.args[6]),nivel:s.nivel,hipotese:s.hipotese,marcadores:t.filter(c=>c.tipo==="MARCADOR"&&c.idPai===n).map(c=>c.titulo.replace(/^Marcador\n/,"").replace(/\n/g," \u2014 ")),documentos:i,acoesProcesso:Eo(a.props.acoes??""),botoesProcesso:Ht(a.props.acoes??""),linkProcesso:q(a.args[3]).replace(/&amp;/g,"&"),sinais:t.filter(c=>c.idPai===n),links:Eo(e),pagina:o}}async function jt(o,e,r){let t=await o.obter(e,r);if(!/acao=procedimento_visualizar/.test(t.url)){let a=t.doc.querySelector("#ifrArvore")?.getAttribute("src");if(!a)throw new D("SEI_NAO_ENCONTRADO","N\xE3o foi poss\xEDvel abrir a \xE1rvore do processo.");t=await o.obter(a,r)}if(/infraArvoreNo\("PASTA"/.test(t.html)){let a=eo(t.html,"procedimento_visualizar")&&Eo(t.html).find(n=>/abrir_pastas=1/.test(n));a&&(t=await o.obter(a,r))}return Is(t)}function mo(o,e,r){if(r){let t=o.documentos.find(a=>a.id===r);return t?eo(t.acoes,e):null}return eo(o.acoesProcesso,e)??eo(o.links,e,{id_procedimento:o.idProcedimento})}function so(o,e,r){let t=(e??"").trim(),a=(r??"").trim();return r===void 0||t===a?[]:[{campo:o,antes:t,depois:a}]}var Zo={publico:"0",restrito:"1"},ye={0:"P\xFAblico",1:"Restrito",2:"Sigiloso"};async function Yo(o,e,r,t){let a=/controlador_ajax\.php\?acao_ajax=hipotese_legal_select[^'"]*/.exec(e.pagina.html)?.[0];return a?o.ajax(X(a),[["primeiroItemValor","null"],["primeiroItemDescricao"," "],["valorItemSelecionado",""],["staNivelAcesso",r]],{sinal:t}):e.opcoes("selHipoteseLegal").filter(n=>n.valor!=="null").map(n=>({id:n.valor,texto:n.texto}))}var Bt="\xA5",mr="\xB1";function Ft(o){return o.map(e=>`${e.id}${mr}${e.texto}`).join(Bt)}function $s(o){return o?o.split(Bt).map(e=>{let[r,...t]=e.split(mr);return{id:r,texto:t.join(mr)}}):[]}function Gt(o){let e=[];for(let r of o.matchAll(/new\s+infraLupaSelect\(\s*['"]([\w-]+)['"]\s*,\s*['"]([\w-]+)['"]/g))e.push([r[1],r[2]]);return e}var F=class o{constructor(e,r,t){this.http=e;this.pagina=r;this.elemento=t,this.id=t.id,this.action=(t.getAttribute("action")??"").replace(/&amp;/g,"&"),this.campos=Ts(t),this.sincronizarLupas()}id;action;campos;elemento;static async abrir(e,r,t,a){let n=await e.obter(r,a);return o.de(n,t,e)}static de(e,r,t=null){let a=e.doc.querySelector(r);if(!a)throw new D("SEI_VERSAO_NAO_SUPORTADA",`A tela do SEI n\xE3o tem o formul\xE1rio esperado (${r}).`,_(e.doc.querySelector("title")));return new o(t,e,a)}pares(){return this.campos.map(e=>[e.nome,e.valor])}valor(e){return this.campos.find(r=>r.nome===e)?.valor}tem(e){return this.elemento.querySelector(`[name="${e}"]`)!==null||this.campos.some(r=>r.nome===e)}opcoes(e){let r=this.elemento.querySelector(`select[name="${e}"], select#${Ut(e)}`);return r?[...r.querySelectorAll("option")].map(t=>({valor:t.getAttribute("value")??_(t),texto:_(t),selecionada:t.hasAttribute("selected")})):[]}definir(e){for(let[r,t]of Object.entries(e)){if(t===void 0)continue;if(t===null){this.campos=this.campos.filter(n=>n.nome!==r);continue}let a=this.campos.find(n=>n.nome===r);a?a.valor=t:this.campos.push({nome:r,valor:t})}return this}escolher(e,r){let t=this.opcoes(e),a=oo(r),n=t.find(s=>s.valor===r)??t.find(s=>oo(s.texto)===a)??fr(t.filter(s=>oo(s.texto).includes(a)));if(!n)throw new D("ARGUMENTO_INVALIDO",`"${r}" n\xE3o \xE9 uma op\xE7\xE3o de ${e}.`,t.slice(0,40).map(s=>s.texto).join(" | "));return this.definir({[e]:n.valor}),n}linhas(e){return[...this.elemento.querySelectorAll(`${e} tr`)].filter(r=>r.querySelector("input[type=checkbox]"))}itensLupa(e){let r=this.hiddenDaLupa(e);return r?$s(this.valor(r)??""):[]}definirLupa(e,r){let t=this.hiddenDaLupa(e);if(!t)throw new D("SEI_VERSAO_NAO_SUPORTADA",`A lupa ${e} n\xE3o existe nesta tela.`);return this.definir({[t]:Ft(r)}),this.campos=this.campos.filter(a=>a.nome!==e&&a.nome!==`${e}[]`),this}async enviar(e={}){if(!this.http)throw new D("SEI_RESPOSTA_INESPERADA","Formul\xE1rio sem transporte HTTP.");if(!this.action)throw new D("SEI_VERSAO_NAO_SUPORTADA",`O formul\xE1rio ${this.id} n\xE3o tem action.`);let r=this.pares();e.botao&&r.push(this.botaoDeEnvio(e.botao));let t=await this.http.enviar(this.action,r,e);if(e.sucesso&&!e.sucesso(t))throw new D("SEI_RESPOSTA_INESPERADA",`O SEI n\xE3o confirmou ${e.operacao??"a opera\xE7\xE3o"}.`,`${_(t.doc.querySelector("title"))} \u2014 ${t.url.replace(/infra_hash=\w+/,"infra_hash=\u2026")}`);return t}botaoDeEnvio(e){let r=this.elemento.querySelector(`[name="${e}"]`)??fr([...this.elemento.querySelectorAll('button[type="submit"][name^="sbm"], input[type="submit"][name^="sbm"]')]);return r?[r.getAttribute("name")??e,r.getAttribute("value")??_(r)??e]:[e,e]}hiddenDaLupa(e){let r=Gt(this.pagina.html).find(([t])=>t===e);return r?r[1]:null}sincronizarLupas(){for(let[e,r]of Gt(this.pagina.html)){let t=this.elemento.querySelector(`select#${Ut(e)}`);if(!t)continue;let a=[...t.querySelectorAll("option")].map(n=>({id:n.getAttribute("value")??"",texto:_(n)}));(this.valor(r)??"")||this.definir({[r]:Ft(a)}),this.campos=this.campos.filter(n=>n.nome!==e&&n.nome!==`${e}[]`)}}};function Ts(o){let e=[];for(let r of o.querySelectorAll("input, select, textarea")){let t=r.getAttribute("name");if(!t||r.hasAttribute("disabled"))continue;let a=r.tagName.toLowerCase();if(a==="input"){let n=(r.getAttribute("type")??"text").toLowerCase();if(["submit","button","image","reset","file"].includes(n)||(n==="checkbox"||n==="radio")&&!r.hasAttribute("checked"))continue;e.push({nome:t,valor:r.getAttribute("value")??(n==="checkbox"||n==="radio"?"on":"")})}else if(a==="textarea")e.push({nome:t,valor:r.textContent??""});else{let n=[...r.querySelectorAll("option")],s=n.filter(l=>l.hasAttribute("selected")),i=r.hasAttribute("multiple"),c=s.length?s:!i&&n.length?[n[0]]:[];for(let l of c)e.push({nome:t,valor:l.getAttribute("value")??_(l)})}}return e}function oo(o){return o.normalize("NFD").replace(/[\u0300-\u036F]/g,"").toLowerCase().replace(/\s+/g," ").trim()}function gr(o,e,r){let t=oo(e),a=o.find(n=>n.id===e)??o.find(n=>oo(n.texto)===t)??fr(o.filter(n=>oo(n.texto).includes(t)));if(!a)throw new D("ARGUMENTO_INVALIDO",`${r} "${e}" n\xE3o encontrado(a) ou amb\xEDguo(a).`,o.slice(0,40).map(n=>n.texto).join(" | "));return a}function fr(o){return o.length===1?o[0]:void 0}function Ut(o){return o.replace(/([^\w-])/g,"\\$1")}async function Rs(o,e,r){let t=mo(e,"documento_escolher_tipo");if(!t)throw new D("SEI_ACAO_INDISPONIVEL",`N\xE3o \xE9 poss\xEDvel incluir documento no processo ${e.protocolo} (fechado na unidade?).`);let a=await F.abrir(o.http,t,"#frmDocumentoEscolherTipo",{sinal:r});if(a.tem("hdnFiltroSerie")&&a.valor("hdnFiltroSerie")!=="T"){let n=await a.definir({hdnFiltroSerie:"T"}).enviar({sinal:r});a=F.de(n,"#frmDocumentoEscolherTipo",o.http)}return a}function Ns(o){let e=new Map;for(let r of o.doc.querySelectorAll("[onclick*='escolher(']")){let t=/escolher\((-?\d+)\)/.exec(r.getAttribute("onclick")??"")?.[1];t&&!e.has(t)&&e.set(t,_(r))}for(let r of o.doc.querySelectorAll("a[href*='id_serie=']")){let t=Y(r.getAttribute("href")??"").get("id_serie");t&&!e.has(t)&&e.set(t,_(r))}return[...e].filter(([,r])=>r).map(([r,t])=>({id:r,nome:t}))}async function Qt(o,e,r){let t=await o.arvore(e,{sinal:r});return Ns((await Rs(o,t,r)).pagina)}var Xt={tipos_processo:{acao:"procedimento_alterar",form:"#frmProcedimentoCadastro",campo:"selTipoProcedimento"},hipoteses_legais:{acao:"procedimento_alterar",form:"#frmProcedimentoCadastro",campo:"selHipoteseLegal"},usuarios:{acao:"procedimento_atribuicao_cadastrar",form:"#frmAtividadeAtribuir",campo:"selAtribuicao"},marcadores:{acao:"andamento_marcador_gerenciar",form:"#frmAndamentoMarcadorCadastro",campo:"selMarcador"},grupos_acompanhamento:{acao:"acompanhamento_gerenciar",form:"#frmAcompanhamentoCadastro",campo:"selGrupoAcompanhamento"}};async function Kt(o,e,r,t={}){let a;if(e==="tipos_documento")a=(await Qt(o,r,t.sinal)).map(s=>({id:s.id,nome:s.nome}));else{let s=Xt[e];if(!s)throw new D("ARGUMENTO_INVALIDO",`Lista desconhecida: ${e}.`,Object.keys(Xt).concat("tipos_documento").join(" | "));let i=await o.arvore(r,{sinal:t.sinal}),c=mo(i,s.acao);if(!c)throw new D("SEI_ACAO_INDISPONIVEL",`Para listar ${e} use um processo aberto na sua unidade.`);if(e==="marcadores"&&(c=eo((await o.http.obter(c,{sinal:t.sinal,aceitarValidacao:!0})).html,"andamento_marcador_cadastrar"),!c))throw new D("SEI_VERSAO_NAO_SUPORTADA","Tela de marcadores n\xE3o reconhecida.");let l=await F.abrir(o.http,c,s.form,{sinal:t.sinal,aceitarValidacao:!0});a=e==="hipoteses_legais"?(await Yo(o,l,"1",t.sinal)).map(m=>({id:m.id,nome:m.texto})):l.opcoes(s.campo).filter(m=>m.valor&&m.valor!=="null"&&m.texto).map(m=>({id:m.valor,nome:m.texto}))}let n=t.filtro?oo(t.filtro):"";return n?a.filter(s=>oo(s.nome).includes(n)):a}function Jt(o,e){let r=o.valor(e);return o.opcoes(e).find(t=>t.valor===r&&r!=="null")?.texto??""}async function zs(o,e,r){let t=mo(e,"procedimento_alterar"),a=t??mo(e,"procedimento_consultar");if(!a)throw new D("SEI_ACAO_INDISPONIVEL",`O SEI n\xE3o oferece a consulta do processo ${e.protocolo} para voc\xEA.`);return{form:await F.abrir(o,a,"#frmProcedimentoCadastro",r),editavel:!!t}}function Wt(o){return o.map(e=>e.texto).filter(Boolean)}async function Zt(o,e,r,t){let a=await o.arvore(e,{sinal:t.sinal});if(a.nivel==="sigiloso")throw new D("SEI_SIGILOSO","Processo sigiloso: o agente n\xE3o atua nele.");let{form:n,editavel:s}=await zs(o.http,a,{sinal:t.sinal});if(!s)throw new D("SEI_ACAO_INDISPONIVEL",`O processo ${a.protocolo} n\xE3o est\xE1 aberto na sua unidade.`);let i=[];if(r.especificacao!==void 0&&(i.push(...so("Especifica\xE7\xE3o",n.valor("txtDescricao"),r.especificacao)),n.definir({txtDescricao:r.especificacao.slice(0,100)})),r.tipo!==void 0){let l=Jt(n,"selTipoProcedimento"),m=n.escolher("selTipoProcedimento",r.tipo);n.definir({hdnIdTipoProcedimento:m.valor}),i.push(...so("Tipo",l,m.texto))}if(r.nivel!==void 0){let l=ye[n.valor("rdoNivelAcesso")??""]??"";n.definir({rdoNivelAcesso:Zo[r.nivel]}),i.push(...so("N\xEDvel de acesso",l,ye[Zo[r.nivel]])),r.nivel==="publico"&&n.definir({selHipoteseLegal:"null"})}if(r.hipotese!==void 0){let l=Jt(n,"selHipoteseLegal"),m=n.valor("rdoNivelAcesso")||Zo.restrito,g=gr(await Yo(o,n,m,t.sinal),r.hipotese,"Hip\xF3tese legal");n.definir({selHipoteseLegal:g.id}),i.push(...so("Hip\xF3tese legal",l,g.texto))}if(n.valor("rdoNivelAcesso")==="1"&&(n.valor("selHipoteseLegal")??"null")==="null")throw new D("ARGUMENTO_INVALIDO","Processo restrito exige hip\xF3tese legal. Informe a hip\xF3tese.");r.observacoes!==void 0&&(i.push(...so("Observa\xE7\xF5es da unidade",n.valor("txaObservacoes"),r.observacoes)),n.definir({txaObservacoes:r.observacoes})),r.interessados!==void 0&&(i.push(...so("Interessados",Wt(n.itensLupa("selInteressadosProcedimento")).join("; "),Wt(r.interessados).join("; "))),n.definirLupa("selInteressadosProcedimento",r.interessados));let c={alvo:a.protocolo,mudancas:i,aplicado:!1,resumo:""};return i.length?t.aplicar?(n.definir({hdnFlagProcedimentoCadastro:"2"}),await n.enviar({sinal:t.sinal,operacao:`a altera\xE7\xE3o do processo ${a.protocolo}`,sucesso:l=>Y(l.url).get("acao")!=="procedimento_alterar"}),o.invalidar(a.idProcedimento),{...c,aplicado:!0,resumo:`Processo ${a.protocolo} alterado.`}):{...c,resumo:`${i.length} campo(s) a alterar.`}:{...c,resumo:"Nada a alterar: os valores j\xE1 s\xE3o esses."}}async function oa(o,e,r){let t=await o.arvore(e,{sinal:r});if(t.nivel==="sigiloso")throw new D("SEI_SIGILOSO","Processo sigiloso: o agente n\xE3o atua nele.");return t}function ea(o,e,r){let t=mo(o,e);if(!t)throw new D("SEI_ACAO_INDISPONIVEL",`"${r}" n\xE3o est\xE1 dispon\xEDvel no processo ${o.protocolo} (processo fechado na unidade ou sem permiss\xE3o).`);return t}var ra=o=>e=>Y(e.url).get("acao")!==o;async function _s(o,e,r,t){let a=await o.http.obter(ea(e,r.acao,r.nomeAcao),{sinal:t,aceitarValidacao:!0});if(a.doc.querySelector(r.form))return F.de(a,r.form,o.http);let n=(r.formularios??[]).map(s=>eo(a.html,s)).find(Boolean);if(!n)throw new D("SEI_VERSAO_NAO_SUPORTADA",`A tela "${r.nomeAcao}" n\xE3o tem o formul\xE1rio esperado.`);return F.abrir(o.http,n,r.form,{sinal:t,aceitarValidacao:!0})}async function ta(o,e,r,t){let a=await oa(o,e,t.sinal),n=await _s(o,a,r,t.sinal),s=r.preparar(n),i={alvo:a.protocolo,mudancas:s,aplicado:!1,resumo:""};return s.length?t.aplicar?(await n.enviar({sinal:t.sinal,botao:r.botao,operacao:`${r.nomeAcao} em ${a.protocolo}`,sucesso:r.sucesso??ra(r.acao)}),o.invalidar(a.idProcedimento),{...i,aplicado:!0,resumo:r.resumo(a.protocolo).replace(/^Vai /,"")}):{...i,resumo:r.resumo(a.protocolo)}:{...i,resumo:"Nada a alterar: j\xE1 est\xE1 assim."}}function aa(o,e,r,t){return ta(o,e,{acao:"anotacao_registrar",nomeAcao:"Anota\xE7\xF5es",form:"#frmAnotacaoCadastro",botao:"sbmRegistrarAnotacao",preparar:a=>{let n=r.texto.slice(0,500),s=so("Anota\xE7\xE3o",a.valor("txaDescricao"),n),i=a.valor("chkSinPrioridade")?"sim":"n\xE3o",c=n?r.prioridade===void 0?i:r.prioridade?"sim":"n\xE3o":"n\xE3o";return a.definir({txaDescricao:n,chkSinPrioridade:c==="sim"?"on":null}),[...s,...so("Prioridade",i,c)]},resumo:a=>r.texto?`Anota\xE7\xE3o definida em ${a}.`:`Anota\xE7\xE3o removida de ${a}.`},t)}function na(o,e,r,t){return ta(o,e,{acao:"procedimento_atribuicao_cadastrar",nomeAcao:"Atribuir Processo",form:"#frmAtividadeAtribuir",botao:"sbmSalvar",preparar:a=>{let n=a.opcoes("selAtribuicao").find(l=>l.valor===a.valor("selAtribuicao")&&l.valor!=="null")?.texto??"";if(r===null)return a.definir({selAtribuicao:"null"}),[{campo:"Atribui\xE7\xE3o",antes:n||"(atribui\xE7\xE3o atual)",depois:"(nenhuma)"}];let s=oo(r),i=a.opcoes("selAtribuicao").filter(l=>l.valor!=="null"),c=i.find(l=>l.valor===r)??i.find(l=>oo(l.texto.split(" - ")[0])===s)??i.find(l=>oo(l.texto.split(" - ").slice(1).join(" - "))===s)??(i.filter(l=>oo(l.texto).includes(s)).length===1?i.find(l=>oo(l.texto).includes(s)):void 0);if(!c)throw new D("ARGUMENTO_INVALIDO",`Usu\xE1rio "${r}" n\xE3o encontrado (ou amb\xEDguo) na unidade.`,i.map(l=>l.texto).join(" | "));return a.definir({selAtribuicao:c.valor}),so("Atribui\xE7\xE3o",n,c.texto)},resumo:a=>r?`Processo ${a} atribu\xEDdo.`:`Atribui\xE7\xE3o removida de ${a}.`},t)}async function qs(o,e,r){let t=ea(e,"andamento_marcador_gerenciar","Gerenciar Marcador");return o.http.obter(t,{sinal:r,aceitarValidacao:!0})}function Yt(o){return[...o.doc.querySelectorAll("#tblMarcadores tr")].filter(r=>r.querySelector("input[type=checkbox]")).map(r=>{let t=[...r.querySelectorAll("td")];return{id:r.querySelector("input[type=checkbox]")?.getAttribute("value")??"",marcador:_(t[1]),texto:_(t[2]),usuario:_(t[3]),data:_(t[4])}})}async function sa(o,e,r,t){let a=await oa(o,e,t.sinal),n=await qs(o,a,t.sinal),s=Yt(n),i=oo(r.marcador),c=s.find(u=>oo(u.marcador)===i),l={alvo:a.protocolo,mudancas:[],aplicado:!1,resumo:""};if(r.remover){if(!c)return{...l,resumo:`O processo ${a.protocolo} n\xE3o tem o marcador "${r.marcador}".`};if(l.mudancas=[{campo:"Marcador",antes:`${c.marcador}${c.texto?`: ${c.texto}`:""}`,depois:""}],!t.aplicar)return{...l,resumo:`Vai remover o marcador "${c.marcador}" de ${a.protocolo}.`};let u=eo(n.html,"andamento_marcador_remover");if(!u)throw new D("SEI_ACAO_INDISPONIVEL","A tela de marcadores n\xE3o oferece remo\xE7\xE3o.");let x=F.de(n,"#frmGerenciarMarcador",o.http);x.definir({hdnInfraItemId:c.id,hdnInfraItensSelecionados:c.id});let y=await o.http.enviar(u,x.pares(),{sinal:t.sinal,aceitarValidacao:!0});if(Yt(y).some(M=>M.id===c.id))throw new D("SEI_RESPOSTA_INESPERADA",`O SEI n\xE3o removeu o marcador "${c.marcador}".`);return o.invalidar(a.idProcedimento),{...l,aplicado:!0,resumo:`Marcador "${c.marcador}" removido de ${a.protocolo}.`}}let m;if(n.doc.querySelector("#frmAndamentoMarcadorCadastro"))m=F.de(n,"#frmAndamentoMarcadorCadastro",o.http);else{let u=eo(n.html,"andamento_marcador_cadastrar");if(!u)throw new D("SEI_VERSAO_NAO_SUPORTADA","Esta vers\xE3o do SEI n\xE3o tem a tela de marcadores esperada (4.1 ou superior).");m=await F.abrir(o.http,u,"#frmAndamentoMarcadorCadastro",{sinal:t.sinal})}let g=m.escolher("selMarcador",r.marcador);return m.definir({hdnIdMarcador:g.valor,txaTexto:(r.texto??c?.texto??"").slice(0,250)}),l.mudancas=c?so(`Texto do marcador ${g.texto}`,c.texto,r.texto):[{campo:"Marcador",antes:"",depois:`${g.texto}${r.texto?`: ${r.texto}`:""}`}],l.mudancas.length?t.aplicar?(await m.enviar({sinal:t.sinal,botao:"sbmSalvar",operacao:`o marcador em ${a.protocolo}`,sucesso:ra("andamento_marcador_cadastrar")}),o.invalidar(a.idProcedimento),{...l,aplicado:!0,resumo:`Marcador "${g.texto}" aplicado em ${a.protocolo}.`}):{...l,resumo:`Vai marcar ${a.protocolo} com "${g.texto}".`}:{...l,resumo:"Nada a alterar: o marcador j\xE1 est\xE1 assim."}}var Vs={resumido:"R",completo:"P",total:"T"};function ia(o){let e=o.doc.querySelector("#tblHistorico"),r=Number(/\((\d+)\s+registro/.exec(_(e?.querySelector("caption")))?.[1]??0);return{itens:[...e?.querySelectorAll("tr")??[]].filter(a=>a.querySelector("td")).map(a=>{let n=[...a.querySelectorAll("td")],s=n[1]?.querySelector("a")?.getAttribute("title")??"";return{data:_(n[0]),unidade:_(n[1]),...s?{unidadeNome:s}:{},usuario:_(n[2]),descricao:_(n[3])}}),total:r}}async function ca(o,e,r={}){let t=r.limite??500,a=await o.http.obter(e,{sinal:r.sinal}),n=Vs[r.tipo??"resumido"];n!=="R"&&(a=await F.de(a,"#frmProcedimentoHistorico",o.http).definir({hdnTipoHistorico:n,hdnInfraPaginaAtual:"0"}).enviar({sinal:r.sinal}));let{itens:s,total:i}=ia(a),c=[...s];for(let l=1;c.length<Math.min(i,t)&&s.length>0;l+=1)a=await F.de(a,"#frmProcedimentoHistorico",o.http).definir({hdnTipoHistorico:n,hdnInfraPaginaAtual:String(l)}).enviar({sinal:r.sinal}),{itens:s}=ia(a),c.push(...s);return{total:i||c.length,andamentos:c.slice(0,t)}}function la(o){let e=/^(\d{2})\/(\d{2})\/(\d{4})/.exec(o.trim());return e?`${e[3]}-${e[2]}-${e[1]}`:void 0}var Hs=["Processo recebido na unidade","Reabertura do processo na unidade"],da=/^Processo (?:p\u00FAblico|restrito|sigiloso) gerado/i,js=/^Processo remetido pela unidade\s+(.+)$/i;function Fs(o,e){return o.unidade.trim()===e.sigla.trim()&&e.sigla.trim()?!0:!!e.nome?.trim()&&o.unidadeNome?.trim()===e.nome.trim()}function pa(o,e){let r=typeof e=="string"?{sigla:e}:e,t={},a=o.filter(i=>da.test(i.descricao.trim())),n=a[a.length-1],s=n?la(n.data):void 0;s&&(t.autuacao=s);for(let i of o){if(!Fs(i,r))continue;let c=i.descricao.trim(),l=la(i.data);if(l&&(!t.recebimento&&(Hs.includes(c)||da.test(c))&&(t.recebimento=l),!t.envio)){let m=js.exec(c);m&&(t.envio=l,t.unidadeEnvio=m[1].trim())}}return t}var hr=[["hoje","Hoje"],["semana","Nos \xFAltimos 7 dias"],["mes","Nos \xFAltimos 30 dias"],["trimestre","Nos \xFAltimos 90 dias"],["antigo","H\xE1 mais de 90 dias"],["sem","Sem informa\xE7\xE3o"]];function ua(o,e){if(!o)return"sem";let r=Lo(o,e);return Number.isNaN(r)||r<0?"sem":r<1?"hoje":r<=7?"semana":r<=30?"mes":r<=90?"trimestre":"antigo"}var br=1440*6e4,oe=(o,e)=>e-o.consultadoEm>=0&&e-o.consultadoEm<br;var Ee=class extends Error{sessao=!0},Gs=2,Us=250,Bs=5,Qs=o=>new Promise(e=>setTimeout(e,o));async function ma(o){let e=[...o.alvos],r=o.esperar??Qs,t={feitos:0,total:e.length,semDados:0},a="concluida",n=0,s=o.limiteErros??Bs;async function i(){for(;a==="concluida";){if(o.sinal.aborted){a="cancelada";return}let c=e.shift();if(!c)return;try{let l=await o.consultar(c,o.sinal);n=0,t.feitos+=1,l||(t.semDados+=1),o.aoResolver(c,l,{...t},!1)}catch(l){if(o.sinal.aborted){a="cancelada";return}if(l.sessao){a="sessao";return}if(n+=1,t.feitos+=1,t.semDados+=1,o.aoResolver(c,null,{...t},!0),n>=s){a="erros";return}}e.length&&await r(o.pausaMs??Us)}}return await Promise.all(Array.from({length:Math.max(1,o.simultaneas??Gs)},()=>i())),{motivo:a,progresso:t}}var Xs=500;async function fa(o,e,r,t){if(!e.link)return null;try{let a=await o.http.obter(e.link,{sinal:t});if(!/acao=procedimento_visualizar/.test(a.url)){let c=a.doc.querySelector("#ifrArvore")?.getAttribute("src");if(!c)return null;a=await o.http.obter(c.replace(/&amp;/g,"&"),{sinal:t})}let n=eo(a.html,"procedimento_consultar_historico");if(!n)return null;let{andamentos:s}=await ca(o,n,{tipo:"resumido",limite:Xs,sinal:t}),i=pa(s,r);return Object.keys(i).length?i:null}catch(a){if(a instanceof D&&a.codigo==="SEI_SESSAO_EXPIRADA")throw new Ee(a.message);if(a instanceof D&&(a.codigo==="SEI_SIGILOSO"||a.codigo==="SEI_ACAO_INDISPONIVEL"||a.codigo==="SEI_NAO_ENCONTRADO"))return null;throw a}}var Ks={"\u2010":"-","\u2011":"-","\u2012":"-","\u2013":"-","\u2014":"-","\u2015":"-","\u2212":"-","\u2018":"'","\u2019":"'","\u201A":"'","\u201B":"'","\u2032":"'","\u201C":'"',"\u201D":'"',"\u201E":'"',"\u201F":'"',"\u2033":'"',"\u2026":"...","\u2022":"-","\u2002":" ","\u2003":" ","\u2009":" ","\u202F":" ","\u205F":" ","\u200B":"","\u200C":"","\u200D":"","\u2060":"","\uFEFF":"","\u20AC":"EUR","\u2122":"(TM)","\u2192":"->","\u2190":"<-"};function ga(o,e="texto"){let r="";for(let t of o){let a=t.codePointAt(0);if(a<=255){r+=t;continue}let n=Ks[t];if(e==="html"){r+=n===""?"":`&#${a};`;continue}if(n!==void 0){r+=n;continue}let s=t.normalize("NFKD").replace(/[\u0300-\u036F]/g,"");r+=[...s].every(i=>i.codePointAt(0)<=255)?s:""}return r}var Js=/[A-Za-z0-9\-_.*]/;function ha(o){let e="";for(let r of o)r===" "?e+="+":Js.test(r)?e+=r:e+="%"+r.charCodeAt(0).toString(16).toUpperCase().padStart(2,"0");return e}function ba(o,e={}){return o.map(([r,t])=>{let a=e[r]??"texto";return`${ha(ga(r))}=${ha(ga(t??"",a))}`}).join("&")}function vr(o){let e=o instanceof Uint8Array?o:new Uint8Array(o),r=[],t=16384;for(let a=0;a<e.length;a+=t){let n=e.subarray(a,a+t),s=new Array(n.length);for(let i=0;i<n.length;i+=1)s[i]=zt[n[i]]??n[i];r.push(String.fromCharCode(...s))}return r.join("")}var va="application/x-www-form-urlencoded; charset=ISO-8859-1";function xa(o,e,r){let t=null;return{url:o,status:e,html:r,get doc(){return t??=xe(r)}}}function Aa(o,e={}){if(/\/login\.php/i.test(o.url)||/[?&]acao=(?:infra_)?sair\b/.test(o.url))throw new D("SEI_SESSAO_EXPIRADA","A sess\xE3o do SEI foi encerrada. Fa\xE7a login de novo no SEI e repita o pedido.");if(o.status>=500)throw new D("SEI_EXCECAO",`O SEI respondeu com erro ${o.status}.`);if(o.html.includes('id="divInfraExcecao"')){let r=o.doc.querySelector("#divInfraExcecao");if(r){let t=_(r);throw new D("SEI_EXCECAO",t||"O SEI exibiu uma p\xE1gina de erro.",t)}}if(!e.aceitarValidacao&&o.html.includes("txaInfraValidacao")){let r=o.doc.querySelector("#txaInfraValidacao")?.textContent?.trim()??"";if(r)throw new D("SEI_VALIDACAO",r,r)}return o}function ya(o,e={}){let r=new URL(".",o),t=e.fetch??((...g)=>fetch(...g)),a=Math.max(1,e.concorrencia??3),n=0,s=[];async function i(g){n>=a&&await new Promise(u=>s.push(u)),n+=1;try{return await g()}finally{n-=1,s.shift()?.()}}let c=g=>new URL(g.replace(/&amp;/g,"&"),r).href;async function l(g,u,x){return i(async()=>{try{let y=await t(c(g),{credentials:"same-origin",redirect:"follow",...u,signal:x.sinal}),M=vr(await y.arrayBuffer());return Aa(xa(y.url||c(g),y.status,M),x)}catch(y){throw pr(y)}})}async function m(g,u={}){return i(async()=>{try{let x=await t(c(g),{credentials:"same-origin",redirect:"follow",signal:u.sinal}),y=new Uint8Array(await x.arrayBuffer()),M=(x.headers?.get("content-type")??"").split(";")[0].trim().toLowerCase();M==="text/html"&&Aa(xa(x.url||c(g),x.status,vr(y)),u);let E=x.headers?.get("content-disposition")??"",b=decodeURIComponent(/filename\*=UTF-8''([^;]+)/i.exec(E)?.[1]??/filename="?([^";]+)"?/i.exec(E)?.[1]??"");return{bytes:y,tipo:M,nome:b}}catch(x){throw pr(x)}})}return{base:r,absoluta:c,baixar:m,obter:(g,u={})=>l(g,{method:"GET"},u),enviar:(g,u,x={})=>l(g,{method:"POST",headers:{"Content-Type":va},body:ba(u,x.modos)},x)}}function Ws(o){let e=/Sistema Eletr(?:\u00F4|&ocirc;|\\u00F4)nico de Informa[^"]*?Vers(?:\u00E3|&atilde;)o\s*([\d.]+)/i.exec(o);return e?e[1]:/\.(?:js|svg|css)\?(\d+\.\d+\.\d+)-/.exec(o)?.[1]??""}function Zs(o){let e=o.doc.querySelector("#lnkInfraUnidade")?.getAttribute("onclick")??"",r=/infra_unidade_atual=(\d+)/.exec(e)?.[1];if(r)return r;let t=/[?&]infra_unidade_atual=(\d+)/.exec(o.url)?.[1];return t||(o.doc.querySelector("#selInfraUnidades option[selected]")?.getAttribute("value")??"")}function xr(o){let e=o.doc,r=e.querySelector("#lnkInfraUnidade"),t=e.querySelector("#lnkUsuarioSistema")?.getAttribute("title")??"",[,a="",n="",s=""]=/^(.*?)\s*\(([^/)]+)(?:\/([^)]+))?/.exec(t)??[],i=Ws(o.html);return{host:new URL(o.url).host,versao:i,maior:Number(i.split(".")[0])||0,unidade:{id:Zs(o),sigla:_(r)||_(e.querySelector("#selInfraUnidades option[selected]")),nome:r?.getAttribute("title")??""},usuario:{nome:a.trim(),login:n.trim(),orgao:s.trim()}}}var Ys=3e4,Se=class{constructor(e,r=null,t){this.paginaViva=r;this.http=ya(e,t)}http;paginaBase=null;arvores=new Map;localizados=new Map;base(){let e=this.paginaViva?.();if(e&&e.html.includes("frmProtocoloPesquisaRapida"))return e;if(this.paginaBase)return this.paginaBase;if(e)return e;throw new D("SEI_NAO_ENCONTRADO","Abra uma tela do SEI (por exemplo, Controle de Processos) nesta aba.")}contexto(){return xr(this.base())}linkMenu(e){return qt(this.base(),e)}async renovarBase(e){return this.paginaBase=await this.http.obter(this.linkMenu("procedimento_controlar"),e),this.arvores.clear(),this.localizados.clear(),this.paginaBase}async localizar(e,r){let t=e.trim();if(!t)throw new D("ARGUMENTO_INVALIDO","Informe o n\xFAmero do processo ou o n\xBA SEI do documento.");let a=this.localizados.get(t);if(a)return a;let n=F.de(this.base(),"#frmProtocoloPesquisaRapida",this.http);n.definir({txtPesquisaRapida:t});let s=await n.enviar(r),i=Y(s.url);if(i.get("acao")!=="procedimento_trabalhar")throw new D("SEI_NAO_ENCONTRADO",`Nada encontrado no SEI para "${t}", ou voc\xEA n\xE3o tem acesso a ele.`);let c=s.doc.querySelector("#ifrArvore")?.getAttribute("src");if(!c)throw new D("SEI_VERSAO_NAO_SUPORTADA","A tela do processo n\xE3o trouxe a \xE1rvore.");let m=Y(X(c)).get("id_procedimento")??"",g=i.get("id_protocolo")??"",u={idProcedimento:m,idDocumento:g&&g!==m?g:void 0,linkArvore:X(c)};return this.localizados.set(t,u),u}async arvore(e,r={}){let t=await this.localizar(e,r),a=this.arvores.get(t.idProcedimento);if(a&&!r.forcar&&Date.now()-a.quando<Ys)return a.arvore;let n=await jt(this.http,t.linkArvore,r);return this.arvores.set(t.idProcedimento,{quando:Date.now(),arvore:n}),n}invalidar(e){e?this.arvores.delete(e):this.arvores.clear()}async ajax(e,r,t){let a=await this.http.enviar(e,r,{...t,aceitarValidacao:!0}),n=[];for(let s of a.html.matchAll(/<option[^>]*value="([^"]*)"[^>]*>([^<]*)<\/option>/g))n.push({id:X(s[1]),texto:X(s[2]).trim()});for(let s of a.html.matchAll(/<item\s+([^>]*)>/g)){let i=xe(`<i ${s[1]}></i>`).querySelector("i");n.push({id:i?.getAttribute("id")??"",texto:i?.getAttribute("descricao")??i?.getAttribute("complemento")??""})}return n.filter(s=>s.id&&s.id!=="null")}};function ee(o,e=o.location?.href??"https://sei.invalido/sei/controlador.php"){return{url:e,status:200,get html(){return o.documentElement.outerHTML},doc:o}}var Ea={recebidos:"Recebidos",gerados:"Gerados",detalhado:"Detalhado"},Io=(o,e)=>`${o}:${e}`;function Sa(o,e,r="resumida"){let t={},a=r==="detalhada"?["detalhado"]:["recebidos","gerados"];for(let n of a){let s=n==="detalhado"?[...o]:o.filter(g=>g.grupo===n);if(!s.length)continue;let i=[...new Set(s.map(g=>g.pagina))].sort((g,u)=>g-u),c=n==="detalhado"?"na lista":`em ${Ea[n]}`;if(i.length>1){let g=i.map(u=>u+1).join(" e ");return{ok:!1,motivo:`O SEI s\xF3 aceita, de uma vez, processos de uma mesma p\xE1gina ${c} (marcados nas p\xE1ginas ${g}). Deixe s\xF3 uma p\xE1gina marcada.`}}let l=i[0],m=e.get(Io(n,l));if(!m?.itens||!m.hash)return{ok:!1,motivo:`Os dados da p\xE1gina ${l+1} ainda n\xE3o foram lidos. Espere o carregamento terminar.`};t[n]={ids:s.map(g=>g.id),pagina:l,selecao:m}}return{ok:!0,plano:{porGrupo:t,todosNaPaginaAtual:o.every(n=>n.naPaginaAtual)}}}function oi(o){let e={},r=o.porGrupo.detalhado?["detalhado"]:["recebidos","gerados"];for(let t of r){let a=o.porGrupo[t],n=Ea[t];if(e[`hdn${n}ItemId`]="",!a){e[`hdn${n}ItensSelecionados`]="";continue}e[`hdn${n}ItensSelecionados`]=a.ids.join(","),e[`hdn${n}Itens`]=a.selecao.itens,e[`hdn${n}ItensHash`]=a.selecao.hash}return e}function Pa(o,e,r){let t=o.getElementById("frmProcedimentoControlar");if(!t)throw new Error("Formul\xE1rio do Controle de Processos n\xE3o encontrado.");let a=o.createElement("form");a.setAttribute("method","post"),a.setAttribute("action",e),a.style.display="none";let n=new Map;for(let s of Array.from(t.querySelectorAll("input, select, textarea")))!s.name||s.disabled||s.type==="checkbox"||s.type==="radio"||s.type==="button"||s.type==="submit"||n.set(s.name,s.value);for(let[s,i]of Object.entries(oi(r)))n.set(s,i);for(let[s,i]of n){let c=o.createElement("input");c.setAttribute("type","hidden"),c.setAttribute("name",s),c.setAttribute("value",i),a.append(c)}o.body.append(a),a.submit()}var wa=o=>o.some(e=>e.sigiloso);var ei='a[onclick*="acaoControleProcessos"]';function Ma(o){let e=/acaoControleProcessos\(\s*'([^']*)'\s*,\s*(true|false)\s*,\s*(true|false)/.exec(o.elemento.getAttribute("onclick")??"");return e?{url:e[1].replace(/&amp;/g,"&"),requerSelecao:e[2]==="true",aceitaSigiloso:e[3]==="true"}:null}function Da(o){let e=new Set,r=[];for(let t of o.querySelectorAll(ei)){let a=/[?&]acao=([a-z0-9_]+)/.exec(t.getAttribute("onclick")??"")?.[1],n=t.querySelector("img");if(!a||!n||e.has(a))continue;e.add(a);let s=n.getAttribute("title")||n.getAttribute("alt")||a,i=n.getAttribute("src")??"";try{i=new URL(i,o.baseURI||o.location?.href).href}catch{}r.push({acao:a,rotulo:s,icone:i,elemento:t})}return r}var ri="data-spro-recolhido",ti=".collapseTabelaProcesso";function ai(o){let e=[...o.querySelectorAll(ti)].filter(r=>r.id!=="spro-grade");return e.length>0&&e.some(r=>r.classList.contains("displayNone"))}function Ca(o,e,r=o.defaultView?.MutationObserver){let t=()=>e.toggleAttribute(ri,ai(o));if(t(),!r)return()=>{};let a=new r(t);return a.observe(o.body??o.documentElement,{attributes:!0,attributeFilter:["class"],subtree:!0}),()=>a.disconnect()}var ni=/^\s*\[( |x|X)\]\s?(.*)$/;function re(o){return o.replace(/\r\n?/g,`
`).split(`
`).map(e=>{let r=ni.exec(e);return r?{marca:r[1]!==" ",texto:r[2]}:{marca:null,texto:e}})}function ka(o){return o.map(e=>e.marca===null?e.texto:`${e.marca?"[X]":"[ ]"} ${e.texto}`).join(`
`)}function Ar(o,e){let r=new Set(e.filter(a=>a>=0&&a<o.length));if(!r.size)return[...o];let t=[...r].every(a=>o[a].marca!==null);return o.map((a,n)=>r.has(n)?{...a,marca:t?null:a.marca??!1}:a)}function Oa(o,e){return o.map((r,t)=>t===e&&r.marca!==null?{...r,marca:!r.marca}:r)}function La(o){return re(o).filter(e=>e.marca!==null||e.texto.trim()).map(e=>e.marca===null?e.texto:`${e.marca?"\u2611":"\u2610"} ${e.texto}`).join(" / ")}var we="data-tip",Ia="data-tip-nota",si="data-tip-autor",Pe=0,ii=`
:host { all: initial; }
.dica { position: fixed; inset: auto; margin: 0; border: 0; overflow: visible; z-index: 2147483647; max-width: 320px; padding: 6px 10px; font: 12px/1.45 system-ui, -apple-system, "Segoe UI", Roboto, sans-serif; color: #fff; white-space: pre-line; pointer-events: none; background: #1b1f24; border-radius: 8px; box-shadow: 0 6px 18px rgb(0 0 0 / 28%); opacity: 0; transform: translateY(2px); transition: opacity 120ms ease, transform 120ms ease; }
.dica.claro { color: #1b1f24; background: #fff; box-shadow: 0 6px 18px rgb(0 0 0 / 22%), 0 0 0 1px rgb(0 0 0 / 10%); }
.dica.on { opacity: 1; transform: none; }
.nota { display: flex; flex-direction: column; gap: 3px; }
.nota-l { position: relative; min-height: 1.45em; }
.nota-l[data-t] { padding-left: 22px; }
.nota-l[data-t]::before { content: ""; position: absolute; left: 1px; top: 0.2em; box-sizing: border-box; width: 14px; height: 14px; border: 1.6px solid currentColor; border-radius: 4px; opacity: 0.75; }
.nota-l[data-t="x"] { text-decoration: line-through; opacity: 0.8; }
.nota-l[data-t="x"]::before { content: "\\2713"; opacity: 1; text-align: center; font: 700 11px/11px system-ui; color: #fff; background: #4a8f5a; border-color: #4a8f5a; }
.nota-autor { margin-top: 4px; font-size: 11px; opacity: 0.7; }
.dica[hidden] { display: none; }
@media (prefers-reduced-motion: reduce) { .dica { transition: none; } }
`,$a=o=>o.nodeType===1,ci=o=>o.some(e=>$a(e)&&(e.id==="spro-grade"||e.classList.contains("spro-grade-botao")));function yr(o){if(!ci(o))return null;for(let e of o)if($a(e)){if(e.id==="spro-grade")return null;if(e.hasAttribute(we)||e.hasAttribute(Ia)||e.hasAttribute("title"))return e}return null}function $o(o){let e=o.getAttribute("title");return e&&(o.hasAttribute(we)||o.setAttribute(we,e),!o.hasAttribute("aria-label")&&!(o.textContent??"").trim()&&o.setAttribute("aria-label",e.split(`
`)[0]),o.removeAttribute("title")),o.getAttribute(we)??""}function li(o,e,r){let t=o.ownerDocument,a=t.createElement("div");a.className="nota";for(let n of re(e)){if(n.marca===null&&!n.texto.trim())continue;let s=t.createElement("div");s.className="nota-l",n.marca!==null&&s.setAttribute("data-t",n.marca?"x":"o"),s.textContent=n.texto,a.append(s)}if(r){let n=t.createElement("div");n.className="nota-autor",n.textContent=r,a.append(n)}o.replaceChildren(a)}var Er=null;function Ta(o){let e=a=>{if(a.nodeType!==1)return;let n=a;n.hasAttribute("title")&&$o(n);for(let s of Array.from(n.querySelectorAll("[title]")))$o(s)};if(e(o.nodeType===11?o.host:o),o.nodeType===11)for(let a of Array.from(o.querySelectorAll("[title]")))$o(a);let r=(o.ownerDocument??o).defaultView?.MutationObserver;if(!r)return()=>{};let t=new r(a=>{for(let n of a)if(n.type==="attributes")e(n.target);else for(let s of Array.from(n.addedNodes))e(s);Er?.()});return t.observe(o,{attributes:!0,attributeFilter:["title"],childList:!0,subtree:!0}),()=>t.disconnect()}function di(o){let e=[],r=o;for(;r;)e.push(r),r=r.nodeType===11?r.host??null:r.parentNode;return e}function pi(o,e,r){let a=o.bottom+8,n=!1;a+e.altura>r.h-4&&o.top-8-e.altura>=4&&(a=o.top-8-e.altura,n=!0);let s=o.left+o.width/2-e.largura/2;return s=Math.max(4,Math.min(s,r.w-e.largura-4)),{x:Math.round(s),y:Math.round(Math.max(4,a)),acima:n}}function Ra(o,e=()=>!1){let r=o.defaultView;if(!r)return()=>{};let t=o.createElement("div");t.id="spro-dica-host";let a=t.attachShadow({mode:"open"}),n=o.createElement("style");n.textContent=ii;let s=o.createElement("div");s.className="dica",s.setAttribute("role","tooltip"),s.hidden=!0,s.setAttribute("popover","manual"),a.append(n,s),o.documentElement.append(t);let i=null,c,l=!1,m=null;function g(){clearTimeout(c),i=null,l=!1,s.classList.remove("on"),s.hidden=!0;try{s.matches?.(":popover-open")&&s.hidePopover()}catch{}}function u(){if(!i||!i.isConnected)return y();let w=i.getAttribute(Ia),h=w!==null?w:$o(i);if(!h)return g();w!==null?li(s,w,i.getAttribute(si)??""):s.textContent=h,s.classList.toggle("claro",!e()),s.hidden=!1;try{typeof s.showPopover=="function"&&!s.matches(":popover-open")&&s.showPopover()}catch{}let P=i.getBoundingClientRect(),L=s.getBoundingClientRect(),O=pi(P,{largura:L.width,altura:L.height},{w:r.innerWidth,h:r.innerHeight});s.style.left=`${O.x}px`,s.style.top=`${O.y}px`,s.classList.add("on"),l=!0}function x(w,h){let P=o.elementFromPoint(w,h);for(let L=0;L<4&&P?.shadowRoot;L++){let O=P.shadowRoot.elementFromPoint(w,h);if(!O||O===P)break;P=O}return P}function y(){if(!m)return g();let w=x(m.x,m.y),h=w?yr(di(w)):null;if(h===i&&i?.isConnected)return;let P=l;g(),h&&($o(h),i=h,P||Pe===0?u():c=setTimeout(u,Pe))}Er=()=>{i&&!i.isConnected&&y()};let M=w=>{let h=w;typeof h.clientX=="number"&&(m={x:h.clientX,y:h.clientY});let P=yr(w.composedPath());P===i&&i?.isConnected||(g(),P&&($o(P),i=P,Pe>0?c=setTimeout(u,Pe):u()))},E=w=>{let h=yr(w.composedPath());!h||!h.matches?.(":focus-visible")||(g(),$o(h),i=h,u())},b=()=>g();return o.addEventListener("pointerover",M,!0),o.addEventListener("mouseover",M,!0),o.addEventListener("pointermove",M,!0),o.addEventListener("mousemove",M,!0),o.addEventListener("focusin",E,!0),o.addEventListener("focusout",g,!0),o.addEventListener("pointerdown",g,!0),o.addEventListener("keydown",g,!0),o.addEventListener("scroll",g,!0),o.documentElement.addEventListener("pointerleave",b),()=>{g(),Er=null,o.removeEventListener("pointerover",M,!0),o.removeEventListener("mouseover",M,!0),o.removeEventListener("pointermove",M,!0),o.removeEventListener("mousemove",M,!0),o.documentElement.removeEventListener("pointerleave",b),o.removeEventListener("focusin",E,!0),o.removeEventListener("focusout",g,!0),o.removeEventListener("pointerdown",g,!0),o.removeEventListener("keydown",g,!0),o.removeEventListener("scroll",g,!0),t.remove()}}var ro="data-spro-grade",fo="data-spro-grade-pronta",te="data-spro-grade-escuro",Sr="spro_grade",Pr="spro-grade-pre";var ui="#tblProcessosRecebidos, #tblProcessosGerados, #tblProcessosDetalhado";function mi(){let o=ui.split(", ").map(t=>`html[${ro}] ${t}`).join(`,
`),e=`html[${ro}]:not([${fo}]) #divTabelaProcesso::before,
html[${ro}]:not([${fo}]) #frmProcedimentoControlar:not(:has(#divTabelaProcesso))::before`,r=["#divFiltro","#newFiltro","#processosProActions"].map(t=>`html[${ro}] ${t}`).join(`,
`);return`${o} { display: none !important; }
/* Com a grade pronta, o container nativo das tabelas (min-height: 200px) so deixaria um vazio entre a grade e o painel de baixo. */
html[${ro}][${fo}] #divTabelaProcesso { display: none !important; }
${r} { display: none !important; }
html[${ro}] #divRecebidosAreaPaginacaoSuperior, html[${ro}] #divRecebidosAreaPaginacaoInferior,
html[${ro}] #divGeradosAreaPaginacaoSuperior, html[${ro}] #divGeradosAreaPaginacaoInferior { display: none !important; }
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
html[${ro}][${te}]:not([${fo}]) #divTabelaProcesso::before,
html[${ro}][${te}]:not([${fo}]) #frmProcedimentoControlar:not(:has(#divTabelaProcesso))::before { --spro-sk: #2c333b; --spro-sk-2: #232a31; }
@keyframes spro-grade-pulso { 0%, 100% { opacity: 1; } 50% { opacity: 0.55; } }
@media (prefers-reduced-motion: reduce) {
  html[${ro}]:not([${fo}]) #divTabelaProcesso::before,
  html[${ro}]:not([${fo}]) #frmProcedimentoControlar:not(:has(#divTabelaProcesso))::before { animation: none; }
}`}function Na(o){try{return o.getItem(Sr)==="1"}catch{return!1}}function Me(o,e){try{e?o.setItem(Sr,"1"):o.removeItem(Sr)}catch{}}function De(o,e){let r=o.documentElement;if(r.setAttribute(ro,"1"),r.removeAttribute(fo),e?r.setAttribute(te,"1"):r.removeAttribute(te),!o.getElementById(Pr)){let t=o.createElement("style");t.id=Pr,t.textContent=mi(),(o.head??r).append(t)}}function Ce(o){let e=o.documentElement;e.removeAttribute(ro),e.removeAttribute(fo),e.removeAttribute(te),o.getElementById(Pr)?.remove()}var To=o=>o.documentElement.hasAttribute(ro);function wr(o){o.documentElement.setAttribute(fo,"1")}function ke(o,e={setTimeout:(r,t)=>setTimeout(r,t),clearTimeout:r=>clearTimeout(r)}){let r=!1,t,a=s=>{r||(r=!0,e.clearTimeout(n),e.clearTimeout(t),o(s))},n=e.setTimeout(()=>a("teto"),1e4);return{iniciarContagem(){r||(t=e.setTimeout(()=>a("prazo"),1500))},pronta(){r=!0,e.clearTimeout(n),e.clearTimeout(t)},falhou:s=>a(s),encerrada:()=>r}}var za="http://www.w3.org/2000/svg",fi={grade:[["rect",{x:"3.5",y:"4.5",width:"17",height:"15",rx:"2"}],["path",{d:"M3.5 9.5h17M9 9.5v10M3.5 14.5h17"}]],quadro:[["rect",{x:"3.5",y:"4.5",width:"4.6",height:"15",rx:"1.2"}],["rect",{x:"9.7",y:"4.5",width:"4.6",height:"9",rx:"1.2"}],["rect",{x:"15.9",y:"4.5",width:"4.6",height:"12",rx:"1.2"}]],lista:[["path",{d:"M8 6.5h12M8 12h12M8 17.5h12M4 6.5h.01M4 12h.01M4 17.5h.01"}]],agrupar:[["path",{d:"M4 6h16M4 12h10M4 18h13"}],["path",{d:"M18 10l3 2-3 2"}]],colunas:[["rect",{x:"3.5",y:"4.5",width:"17",height:"15",rx:"2"}],["path",{d:"M9.2 4.5v15M14.8 4.5v15"}]],disquete:[["path",{d:"M5 4.5h11l3.5 3.5v11a1.5 1.5 0 0 1-1.5 1.5H6.5A1.5 1.5 0 0 1 5 19z"}],["path",{d:"M8 4.5v5h7v-5M8 20v-6h8v6"}]],densidade:[["path",{d:"M4 6h16M4 10h16M4 14h16M4 18h16"}]],semPessoa:[["circle",{cx:"12",cy:"8.5",r:"3.6"}],["path",{d:"M5 20c.8-3.6 3.5-5.5 7-5.5s6.2 1.9 7 5.5M4 4l16 16"}]],olhoFechado:[["path",{d:"M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z"}],["circle",{cx:"12",cy:"12",r:"2.8"}],["path",{d:"M4 4l16 16"}]],recebido:[["path",{d:"M4 13.5l2.2-7A1.6 1.6 0 0 1 7.7 5.4h8.6a1.6 1.6 0 0 1 1.5 1.1l2.2 7"}],["path",{d:"M4 13.5V18a1.6 1.6 0 0 0 1.6 1.6h12.8A1.6 1.6 0 0 0 20 18v-4.5h-4.6a3.4 3.4 0 0 1-6.8 0z"}]],gerado:[["path",{d:"M14 3.5H7.5A1.5 1.5 0 0 0 6 5v14a1.5 1.5 0 0 0 1.5 1.5h9A1.5 1.5 0 0 0 18 19V7.5z"}],["path",{d:"M14 3.5V7.5h4M9.5 14.5h5M9.5 17h3"}],["path",{d:"M9.5 11.5l2-2 2 2M11.5 9.5v3.5"}]],novaGuia:[["path",{d:"M14 4.5h5.5V10M19.5 4.5L11 13"}],["path",{d:"M17.5 14v4a1.5 1.5 0 0 1-1.5 1.5H6A1.5 1.5 0 0 1 4.5 18V8A1.5 1.5 0 0 1 6 6.5h4"}]],prioridade:[["circle",{cx:"12",cy:"12",r:"8.5"}],["path",{d:"M12 7.5v5.5M12 16.4h.01"}]],seta:[["path",{d:"M6 9l6 6 6-6"}]],setaDireita:[["path",{d:"M9 6l6 6-6 6"}]],desfazer:[["path",{d:"M9 14L4 9l5-5M4 9h10a6 6 0 0 1 0 12h-3"}]],bloquear:[["circle",{cx:"12",cy:"12",r:"8.5"}],["path",{d:"M6 6l12 12"}]],informacao:[["circle",{cx:"12",cy:"12",r:"8.5"}],["path",{d:"M12 11v5M12 8h.01"}]]};function to(o,e=16,r=document){let t=r.createElementNS(za,"svg"),a={viewBox:"0 0 24 24",width:String(e),height:String(e),fill:"none",stroke:"currentColor","stroke-width":"1.8","stroke-linecap":"round","stroke-linejoin":"round","aria-hidden":"true",focusable:"false",class:"spro-icone"};for(let[n,s]of Object.entries(a))t.setAttribute(n,s);for(let[n,s]of fi[o]){let i=r.createElementNS(za,n);for(let[c,l]of Object.entries(s))i.setAttribute(c,l);t.append(i)}return t}var Oe="spro-grade-botao",gi="#processosSEIPro .titlePanelHome, #processosSEIPro #divInfraBarraLocalizacao, #divInfraBarraLocalizacao.titlePanelHome, #divInfraBarraLocalizacao",hi="Usar o Novo Controle de Processos",bi="Voltar \xE0 vis\xE3o nativa do SEI";function vi(o,e,r){let t=o.querySelector(gi);if(!t)return!1;let a=e?bi:hi,n=t.querySelector(`.${Oe}`);n||(n=o.createElement("button"),n.type="button",n.className=Oe,n.append(to("grade",18,o)),t.append(n));let s=[...t.children].filter(i=>i.classList.contains("spro-pnl-botao")).at(-1);return s&&s.compareDocumentPosition(n)&2&&s.after(n),n.setAttribute("data-tip",a),n.removeAttribute("title"),n.setAttribute("aria-label",a),n.setAttribute("aria-pressed",String(e)),!0}function qa(o,e){let r=t=>{(t.composedPath?.()[0]??t.target)?.closest?.(`.${Oe}`)&&(t.preventDefault(),t.stopPropagation(),e())};return o.addEventListener("click",r,!0),()=>o.removeEventListener("click",r,!0)}var _a=o=>{for(let e of o.querySelectorAll(`.${Oe}`))e.remove()};function Le(o,e,r){let t=()=>vi(o,e(),r);t();let a=o.defaultView?.MutationObserver;if(!a||!o.body)return()=>_a(o);let n=!1,s=new a(()=>{n||(n=!0,queueMicrotask(()=>{n=!1,s.disconnect(),t(),s.observe(o.body,{childList:!0,subtree:!0})}))});return s.observe(o.body,{childList:!0,subtree:!0}),()=>{s.disconnect(),_a(o)}}function J(o){return o.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/\s+/g," ").trim()}var xi=/<div(?: style="text-decoration: line-through;")?><i class="(far fa-square|fas fa-check-square)"><\/i> ?([\s\S]*?)<\/div>/g;function Ai(o){return o.includes("<div")?o.replace(xi,(e,r,t)=>`
${r==="far fa-square"?"[ ]":"[X]"} ${t}
`).replace(/\n{2,}/g,`
`).trim():o}var yi=/^Anota[\u00e7c][\u00e3a]o( com prioridade)?\s+\/\s+([\s\S]*)\s+\/\s+(.*)$/i;function Va(o){let e=o.querySelector('a[href*="acao=anotacao_registrar"]');if(!e)return null;let r=e.querySelector("img")?.getAttribute("src")??"",t=/anotacao2\.|prioridade/i.test(r),a=yi.exec(e.getAttribute("aria-label")??"");if(a){let i=X(a[2]).replace(/\r\n?/g,`
`).trim();return i?{texto:i,autor:a[3].trim(),prioridade:!!a[1]||t}:null}let n=yo(e.getAttribute("onmouseover")??"","infraTooltipMostrar")[0];if(typeof n?.[0]!="string")return null;let s=Ai(q(n[0])).trim();return s?{texto:s,autor:q(n[1]).trim(),prioridade:t}:null}function Ha(o,e,r){if(e){let a={idProcedimento:o,origem:"nativo",vencimento:e.data,idControlePrazo:e.idControlePrazo,sigla:e.sigla,linkNativo:e.link,...e.concluidoEm?{concluidoEm:e.concluidoEm}:{}};return r?.vencimento&&r.data===e.data?{...a,origem:"ambos",hora:r.hora,texto:r.texto||void 0}:a}if(!r)return null;let t={idProcedimento:o,origem:"marcador",hora:r.hora,texto:r.texto||void 0};return r.vencimento?{...t,vencimento:r.data}:{...t,inicio:r.data}}var Ei='a[href*="acao=controle_prazo_definir"]',Si=/^Controle de Prazo\s*\/\s*(\S+)\s+(\d{2})\/(\d{2})\/(\d{4})\s*\(([^)]*)\)\s*$/s,ja=(o,e,r)=>`${r}-${e}-${o}`;function Pi(o){let e=o.trim().toLowerCase(),r=/^conclu[i\u00ED]do em (\d{2})\/(\d{2})\/(\d{4})$/.exec(e);return r?{estado:"concluido",concluidoEm:ja(r[1],r[2],r[3])}:/^at[e\u00E9] hoje$/.test(e)?{estado:"hoje"}:/^atrasado \d+ dias?$/.test(e)?{estado:"atrasado"}:/^\d+ dias?$/.test(e)?{estado:"noPrazo"}:null}function Mr(o){let e=o.querySelector(Ei);if(!e)return null;let r=e.getAttribute("aria-label")??"";if(!r){let l=yo(e.getAttribute("onmouseover")??"","infraTooltipMostrar")[0];typeof l?.[0]=="string"&&(r=`Controle de Prazo / ${q(l[0])}`)}let t=Si.exec(X(r).replace(/\s+/g," ").trim());if(!t)return null;let a=Pi(t[5]);if(!a)return null;let n=X(e.getAttribute("href")??""),s=Y(n),i=s.get("id_controle_prazo")??"",c=s.get("id_procedimento")??o.id.replace(/^P/,"");return!i||!c?null:{idControlePrazo:i,idProcedimento:c,sigla:t[1],data:ja(t[2],t[3],t[4]),link:n,...a}}var Fa=/(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(\d{4})/,Ga=/\b([01]?\d|2[0-3]):([0-5]\d)\b/,Ua=new RegExp("(?<!\\p{L})at[e\\u00E9](?!\\p{L})","iu");function wi(o,e,r){let t=`${r}-${e}-${o}`;try{return Vo(ve(t))===t?t:null}catch{return null}}var Mi=o=>o.padStart(2,"0");function Dr(o){let e=o.replace(/\r\n?/g,`
`),r=Fa.exec(e);if(!r)return null;let t=wi(r[1],r[2],r[3]);if(!t)return null;let a=Ga.exec(e),n=a?`${Mi(a[1])}:${a[2]}`:void 0,s=Ua.test(e),i=e.replace(Ua,"").replace(Fa,"");return a&&(i=i.replace(Ga,"")),i=i.replace(/[ \t]+/g," ").replace(/^[ \t]*\n+|\n+[ \t]*$/g,"").trim(),{data:t,hora:n,vencimento:s,texto:i}}function Ba(o){let e=[];for(let r of o.querySelectorAll('a[href*="acao=andamento_marcador_gerenciar"]')){let t=yo(r.getAttribute("onmouseover")??"","infraTooltipMostrar")[0];typeof t?.[0]=="string"&&e.push({texto:q(t[0]),nome:q(t[1])})}return e}function Qa(o,e){let r=o.querySelector("input[type=checkbox]"),t=o.querySelector("a[href*='procedimento_trabalhar']");if(!r||!t)return null;let a=r.getAttribute("aria-label")??"",n=/^Sigiloso\b/.test(a)||/Sigiloso/.test(t.getAttribute("class")??""),s=[...o.querySelectorAll("td")],i=n?[]:[...s[1]?.querySelectorAll("a[aria-label]")??[]].map(c=>c.getAttribute("aria-label")??"");return{idProcedimento:r.getAttribute("value")??Y(t.getAttribute("href")??"").get("id_procedimento")??"",protocolo:r.getAttribute("title")??_(t),grupo:e,tipo:/Tipo (.*?)(?: \/ Especifica|$)/.exec(a)?.[1]?.trim()??"",especificacao:n?"":/Especifica\S* (.*)$/.exec(a)?.[1]?.trim()??"",sigiloso:n,novo:/NaoVisualizado/.test(t.getAttribute("class")??""),atribuido:_(s[s.length-1]).replace(/^\(|\)$/g,""),sinais:i,documentoNovo:!!s[1]?.querySelector("img[src*='exclamacao']")||i.some(c=>/documento foi inclu/i.test(c))}}var Di=/marcador_([a-z0-9_]+)\.svg/i;function Ci(o){let e=[];for(let r of o.querySelectorAll('a[href*="acao=andamento_marcador_gerenciar"]')){let t=yo(r.getAttribute("onmouseover")??"","infraTooltipMostrar")[0],a=/^Marcador\s*\/\s*(.*)$/s.exec(X(r.getAttribute("aria-label")??"").trim()),n=(typeof t?.[1]=="string"&&t[1]?q(t[1]):a?.[1]??"").trim();n&&e.push({nome:n,cor:Di.exec(r.querySelector("img")?.getAttribute("src")??"")?.[1]??"",texto:typeof t?.[0]=="string"?q(t[0]).trim():""})}return e}function ki(o){let e=[];for(let r of o.querySelectorAll("a")){let t=r.querySelector("img")?.getAttribute("src")??"",a=/retorno_(programado|aguardando)(\d)?\.svg/.exec(t);if(!a)continue;let n=X(r.getAttribute("aria-label")??"").trim();e.push({tipo:a[1],descricao:n,atrasado:a[2]==="3"||/atrasad/i.test(n)})}return e}function Oi(o){let e=o.querySelector('a[href*="acao=procedimento_atribuicao_listar"], a.ancoraSigla'),r=e?.textContent?.trim();if(!e||!r)return;let t=X(e.getAttribute("title")??"").replace(/^Atribu[i\u00ED]do para\s+/i,"").trim();return{sigla:r,nome:t||r}}function Cr(o,e){let r=Qa(o,e.grupo);if(!r?.idProcedimento)return null;let t=Ci(o),a=null;for(let m of Ba(o)){let g=Dr(m.texto);if(g){a=g;break}}let n={id:r.idProcedimento,protocolo:r.protocolo,grupo:e.grupo,tipo:r.tipo,especificacao:r.especificacao,sigiloso:r.sigiloso,naoVisualizado:r.novo,marcadores:r.sigiloso?[]:t,retornos:r.sigiloso?[]:ki(o),acompanhamentoEspecial:!r.sigiloso&&!!o.querySelector('a[href*="acao=acompanhamento"] , img[src*="acompanhamento_especial"], .acompanhamentoesp_icon'),documentoNovo:r.documentoNovo,pagina:e.pagina,naPaginaAtual:e.naPaginaAtual},s=o.querySelector('a[href*="acao=procedimento_trabalhar"]')?.getAttribute("onmouseover")??"";/\(URGENTE\)/.test(s)&&(n.urgente=!0),/\(TRANCADO\)/.test(s)&&(n.trancado=!0);let i=o.querySelector(".acompanhamentoesp_icon");if(i){let m=yo(i.getAttribute("onmouseover")??"","infraTooltipMostrar")[0];typeof m?.[1]=="string"&&m[1]&&(n.acompanhamentoGrupo=q(m[1]))}let c=o.querySelector('a[href*="acao=procedimento_trabalhar"]')?.getAttribute("href");c&&(n.link=X(c));let l=Oi(o);if(l&&(n.atribuicao=l),!r.sigiloso){let m=Va(o);m&&(n.anotacao=m);let g=Ha(n.id,Mr(o),a);g&&(n.prazo=g)}return n}var Ka="#tblProcessosRecebidos, #tblProcessosGerados, #tblProcessosDetalhado",Li={recebidos:"tblProcessosRecebidos",gerados:"tblProcessosGerados"},Ii=[[/^tipo( do processo)?$/,"tipo"],[/^especificacao$/,"especificacao"],[/^(atribuicao|atribuido( para)?|responsavel)$/,"atribuicao"],[/^marcador(es)?$/,"marcador"],[/^prioridade$/,"prioridade"],[/^interessados?$/,"interessados"],[/^observacao$/,"observacao"],[/^ultima mov/,"ultimaMov"]];function $i(o){let e=new Map;return[...(o.querySelector("thead tr")??[...o.querySelectorAll("tr")].find(t=>t.querySelector("th")))?.children??[]].forEach((t,a)=>{let n=J(t.textContent??""),s=Ii.find(([i])=>i.test(n));s&&e.set(a,s[1])}),e}function Xa(o){let e=(o?.querySelector("caption")?.textContent??"").replace(/\s+/g," "),r=Number(/(\d+)\s+registro/.exec(e)?.[1]??0),t=/(\d+)\s+a\s+(\d+)\s*\)?/.exec(e);return{total:r,porPagina:t?Number(t[2])-Number(t[1])+1:0}}function Ti(o,e,r){if(!r.size)return;let t=[...e.children];for(let[a,n]of r){let s=(t[a]?.textContent??"").replace(/\s+/g," ").trim();if(s)if(n==="tipo"&&!o.tipo)o.tipo=s;else if(n==="especificacao"&&!o.especificacao&&!o.sigiloso)o.especificacao=s;else if(n==="atribuicao"&&!o.atribuicao){let i=s.replace(/^\(|\)$/g,"");o.atribuicao={sigla:i,nome:i}}else if(n==="marcador"&&!o.marcadores.length&&!o.sigiloso)o.marcadores=[{nome:s,cor:"",texto:""}];else{if(o.sigiloso&&(n==="interessados"||n==="observacao"))continue;if(n==="prioridade")o.prioridade=s;else if(n==="interessados")o.interessados=s;else if(n==="observacao")o.observacao=s;else if(n==="ultimaMov"){let i=/(\d{2})\/(\d{2})\/(\d{4})/.exec(s);i&&(o.ultimaMov=`${i[3]}-${i[2]}-${i[1]}`)}}}}function Ri(o){let e=o.querySelector("input[type=checkbox]")?.getAttribute("name")??"";return/^chkGerados/i.test(e)?"gerados":"recebidos"}function Ho(o,e={}){let r=e.pagina??0,t=e.naPaginaAtual??!0,a=[],n={recebidos:0,gerados:0},s={recebidos:0,gerados:0},i=o.getElementById("tblProcessosDetalhado"),c=new Set,l=u=>{u&&!c.has(u.id)&&(c.add(u.id),a.push(u))};for(let u of["recebidos","gerados"]){let x=o.getElementById(Li[u]),{total:y,porPagina:M}=Xa(x);n[u]=y,s[u]=M;for(let E of x?.querySelectorAll('tr[id^="P"]')??[])l(Cr(E,{grupo:u,pagina:r,naPaginaAtual:t}))}if(i){let u=$i(i),{total:x,porPagina:y}=Xa(i);for(let M of i.querySelectorAll("tr")){if(!M.querySelector('a[href*="procedimento_trabalhar"]'))continue;let E=Ri(M),b=Cr(M,{grupo:E,pagina:r,naPaginaAtual:t});b&&!c.has(b.id)&&(Ti(b,M,u),l(b),n[E]=Math.max(n[E],x),s[E]=Math.max(s[E],y))}}let m=u=>o.getElementById(u)?.getAttribute("value")??"",g={recebidos:{itens:m("hdnRecebidosItens"),hash:m("hdnRecebidosItensHash")},gerados:{itens:m("hdnGeradosItens"),hash:m("hdnGeradosItensHash")},detalhado:{itens:m("hdnDetalhadoItens"),hash:m("hdnDetalhadoItensHash")}};return{processos:a,totais:n,porPagina:s,visao:i?"detalhada":"resumida",selecoes:g}}var Ni=60;async function Ja(o,e,r={}){let t=r.maxPaginas??Ni,a=[],n=new Set(o.processos.map(l=>l.id)),s=!0,i,c=!1;try{for(let l of["recebidos","gerados"]){let m=o.totais[l],g=o.processos.filter(y=>y.grupo===l).length,u=o.porPagina[l]||g||1,x=Math.max(1,Math.ceil(m/u));for(let y=1;g<m;y+=1){if(r.sinal?.aborted)return s=!1,{processos:a,completo:s,...i?{erro:i}:{}};if(y>=t){s=!1;break}c=!0;let M=await e.pagina(l,y,r.sinal),E=Ho(M,{pagina:y,naPaginaAtual:!1}),b=E.processos.filter(w=>w.grupo===l&&!n.has(w.id));if(!b.length)break;for(let w of b)n.add(w.id);g+=b.length,a.push(...b),E.visao==="detalhada"?r.aoSelecao?.("detalhado",y,E.selecoes.detalhado):r.aoSelecao?.(l,y,E.selecoes[l]),r.aoPagina?.(b),r.aoProgresso?.({grupo:l,paginasLidas:y+1,paginasTotal:x,processos:g,total:m})}g<m&&(s=!1)}}catch(l){s=!1,i=l instanceof Error?l.message:String(l)}finally{if(c)try{await e.restaurar()}catch(l){i??=`N\xE3o foi poss\xEDvel voltar \xE0 primeira p\xE1gina: ${l instanceof Error?l.message:String(l)}`}}return{processos:a,completo:s,...i?{erro:i}:{}}}var zi=["hdnRecebidosItensSelecionados","hdnGeradosItensSelecionados","hdnRecebidosItemId","hdnGeradosItemId","hdnDetalhadoItensSelecionados","hdnDetalhadoItemId"];function kr(o,e,r="resumida"){let t="#frmProcedimentoControlar",a=()=>({hdnRecebidosPaginaAtual:"0",hdnGeradosPaginaAtual:"0",hdnDetalhadoPaginaAtual:"0",...Object.fromEntries(zi.map(n=>[n,""]))});return{async pagina(n,s,i){let c=r==="detalhada"?"hdnDetalhadoPaginaAtual":n==="recebidos"?"hdnRecebidosPaginaAtual":"hdnGeradosPaginaAtual";return(await F.de(e,t,o).definir({...a(),[c]:String(s)}).enviar({sinal:i,aceitarValidacao:!0})).doc},async restaurar(n){await F.de(e,t,o).definir(a()).enviar({sinal:n,aceitarValidacao:!0})},restaurarAoSair(){try{let n=F.de(e,t,o);fetch(o.absoluta(n.action),{method:"POST",keepalive:!0,credentials:"include",headers:{"content-type":"application/x-www-form-urlencoded"},body:new URLSearchParams(n.definir(a()).pares()).toString()}).catch(()=>{})}catch{}}}}var _i=30*6e4,Wa=5e3,Or=()=>({vistoEm:{}});function Ya(o){if(!o||typeof o!="object")return Or();let e=o,r={};if(e.vistoEm&&typeof e.vistoEm=="object")for(let[i,c]of Object.entries(e.vistoEm))typeof c=="number"&&Number.isFinite(c)&&c>0&&(r[i]=c);let t=i=>typeof i=="number"&&Number.isFinite(i)?i:void 0,a={vistoEm:r},n=t(e.visitaAtual),s=t(e.visitaAnterior);return n!==void 0&&(a.visitaAtual=n),s!==void 0&&(a.visitaAnterior=s),a}function on(o,e){return o.visitaAtual===void 0?{...o,visitaAtual:e}:e-o.visitaAtual>_i?{...o,visitaAnterior:o.visitaAtual,visitaAtual:e}:o}function Lr(o,e,r,t){let a={...o.vistoEm};for(let s of e)a[s]===void 0&&(a[s]=r);if(t){let s=new Set(e);for(let i of Object.keys(a))s.has(i)||delete a[i]}let n=Object.keys(a);if(n.length>Wa)for(let s of n.sort((i,c)=>a[c]-a[i]).slice(Wa))delete a[s];return{...o,vistoEm:a}}function en(o,e){return o.map(r=>e.vistoEm[r.id]!==void 0?{...r,vistoEm:e.vistoEm[r.id]}:r)}function jo(o){if(o===null)return"";if(o<1)return"hoje";if(o===1)return"1 dia";if(o<60)return`${o} dias`;let e=Math.floor(o/30);return e<24?`${e} meses`:`${Math.floor(o/365)} anos`}var rn="Contado desde a primeira vez que o SEI Pro viu o processo nesta unidade (o SEI n\xE3o informa a data de chegada).";var Fo=["processo","especificacao","tipo","responsavel","marcadores","prazo","anotacao","caixa","parado","sinais"],Ro={processo:"Processo",tipo:"Tipo",especificacao:"Especifica\xE7\xE3o",responsavel:"Respons\xE1vel",marcadores:"Marcadores",prazo:"Prazo",anotacao:"Anota\xE7\xE3o",caixa:"Na caixa",parado:"Parado h\xE1",sinais:"Sinais"};var qi=30,Vi=40,Hi=()=>({colunas:"marcador",limite:0,raiasPorResponsavel:!1}),ji=["processo","especificacao","tipo","responsavel","marcadores","prazo","anotacao"],Ir=2;function Go(){return{id:"",nome:"Padr\xE3o",busca:"",ordem:[],agrupar:"nenhum",modo:"tabela",colv:Ir,colunas:[...ji],densidade:"confortavel",quadro:Hi()}}var Fi=["nenhum","responsavel","tipo","marcador","prazo","situacao","grupo","anotacao","acompanhamento","retorno","caixa","autuacao","recebimento","envio","unidadeEnvio"],Gi=["protocolo","tipo","responsavel","marcador","prazo","caixa","parado","novo"],Ui=["marcador","responsavel","prazo","tipo"];function Ie(o){let e=Go();if(!o||typeof o!="object")return e;let r=o,t=Array.isArray(r.ordem)?r.ordem.filter(s=>!!s&&typeof s=="object"&&Gi.includes(s.campo)).slice(0,4).map(s=>({campo:s.campo,decrescente:s.decrescente===!0})):[],a=Array.isArray(r.colunas)?[...new Set(r.colunas.filter(s=>Fo.includes(s)))]:[];if(a.includes("processo")&&r.colv!==Ir&&!a.includes("especificacao")){let s=a.indexOf("processo");a=[...a.slice(0,s+1),"especificacao",...a.slice(s+1)]}let n=r.quadro&&typeof r.quadro=="object"?r.quadro:{};return{id:typeof r.id=="string"?r.id:"",colv:Ir,nome:typeof r.nome=="string"&&r.nome.trim()?r.nome.trim().slice(0,Vi):e.nome,busca:typeof r.busca=="string"?r.busca.slice(0,500):"",ordem:t,agrupar:Fi.includes(r.agrupar)?r.agrupar:"nenhum",modo:r.modo==="quadro"?"quadro":"tabela",colunas:a.length?a:e.colunas,densidade:r.densidade==="compacta"?"compacta":"confortavel",quadro:{colunas:Ui.includes(n.colunas)?n.colunas:"marcador",limite:typeof n.limite=="number"&&n.limite>0?Math.min(99,Math.floor(n.limite)):0,raiasPorResponsavel:n.raiasPorResponsavel===!0}}}function tn(o,e,r){let t=Ie(e),a=t.id?o.findIndex(s=>s.id===t.id):-1;if(a>=0){let s=[...o];return s[a]=t,{lista:s,visao:t}}if(o.length>=qi)return null;let n={...t,id:r()};return{lista:[...o,n],visao:n}}var an=(o,e)=>o.filter(r=>r.id!==e);function nn(o,e){let r=t=>JSON.stringify({...t,id:"",nome:""});return r(o)!==r(e)}var $e="spro_grade_v_ids",Te=o=>`spro_grade_v:${o}`,Bi=o=>`spro_grade:${o||"x"}`,Qi=(o,e)=>`spro_grade_and:${o||"x"}:${e||"x"}`,sn=5e3;function Xi(){return{visao:Go(),idade:Or(),recolhidos:[]}}function Ki(o){if(!o||typeof o!="object")return Xi();let e=o;return{visao:Ie(e.visao),idade:Ya(e.idade),recolhidos:Array.isArray(e.recolhidos)?e.recolhidos.filter(r=>typeof r=="string").slice(0,200):[]}}var Ji=/^\d{4}-\d{2}-\d{2}$/;function Wi(o){if(!o||typeof o!="object")return null;let e=o;if(typeof e.consultadoEm!="number"||!Number.isFinite(e.consultadoEm))return null;let r={consultadoEm:e.consultadoEm};for(let t of["autuacao","recebimento","envio"])typeof e[t]=="string"&&Ji.test(e[t])&&(r[t]=e[t]);return typeof e.unidadeEnvio=="string"&&e.unidadeEnvio&&(r.unidadeEnvio=e.unidadeEnvio.slice(0,120)),r}function cn(o,e,r=""){let{local:t,sync:a}=o,n=Bi(e),s=Qi(e,r);async function i(){return Ki((await t.obter(n))[n])}async function c(x){let y=await i();await t.gravar({[n]:{...y,...x}})}async function l(){let x=(await a.obter($e))[$e],y=Array.isArray(x)?x.filter(E=>typeof E=="string"):[];if(!y.length)return[];let M=await a.obter(y.map(Te));return y.flatMap(E=>{let b=M[Te(E)];return b?[{...Ie(b),id:E}]:[]})}async function m(x,y=[]){let M=new Set(x.map(w=>w.id)),E={[$e]:x.map(w=>w.id)};for(let w of x)E[Te(w.id)]=w;await a.gravar(E);let b=y.filter(w=>!M.has(w.id)).map(w=>Te(w.id));b.length&&await a.remover(b)}async function g(x){let y=(await t.obter(s))[s],M=y&&typeof y=="object"?y.itens:void 0,E={};if(!M||typeof M!="object")return E;for(let[b,w]of Object.entries(M)){let h=Wi(w);h&&oe(h,x)&&(E[b]=h)}return E}async function u(x){let y=Object.keys(x),M=y.length>sn?Object.fromEntries(y.sort((E,b)=>x[b].consultadoEm-x[E].consultadoEm).slice(0,sn).map(E=>[E,x[E]])):x;await t.gravar({[s]:{itens:M}})}return{lerAndamentos:g,gravarAndamentos:u,lerEstado:i,gravarVisao:x=>c({visao:x}),gravarIdade:x=>c({idade:x}),gravarRecolhidos:x=>c({recolhidos:x}),lerVisoes:l,gravarVisoes:m,aoMudarVisoes:x=>a.aoMudar(y=>$e in y||Object.keys(y).some(M=>M.startsWith("spro_grade_v:"))?x():void 0)}}function ln(o){let e=r=>{let t=/^[=+\-@\t\r]/.test(r)?`'${r}`:r;return/[;"\n\r]/.test(t)?`"${t.replace(/"/g,'""')}"`:t};return`\uFEFF${o.map(r=>r.map(e).join(";")).join(`\r
`)}`}var dn=new Set;var Zi=null;function Yi(o){let e=o.closest?.("dialog[open]");if(e)return e;let r=o.getRootNode?.(),t=o.ownerDocument;return r&&r!==t&&r.host?r:t.body??t.documentElement}function pn(o,e){let r=o;try{r?.CustomEvent&&r.dispatchEvent(new r.CustomEvent("spro-popover",{detail:{fundo:e}}))}catch{}}function un(o,e,r){let t=o.ownerDocument,a=t.defaultView;Yi(o).append(e);let n=!0,s=()=>{if(!n)return;let u=o.getBoundingClientRect?.();if(!u)return;let x=a?.innerHeight??0,y=a?.innerWidth??0,M=Math.min(r.largura??Math.max(u.width,r.larguraMinima??0),Math.max(180,y-16)),E=r.alinharDireita?u.right-M:u.left,b=Math.max(8,Math.min(E,y-M-8)),w=r.alturaMaxima??360;e.style.maxHeight="none";let h=Math.min(e.scrollHeight||w,w),P=x-u.bottom-8,L=u.top-8,O=Zi?.()??!1,$=!O&&P<Math.min(h,200)&&L>P;e.style.left=`${b}px`,e.style.width=`${M}px`,e.style.maxHeight=`${O?w:Math.max(140,Math.min(w,$?L:P>140?P:w))}px`,e.classList.toggle("spro-flutuante-cima",$),$?(e.style.top="",e.style.bottom=`${x-u.top+4}px`):(e.style.bottom="",e.style.top=`${u.bottom+4}px`),pn(a,$?0:Math.ceil(u.bottom+4+h+12))},i=u=>{let x=u.composedPath?.()??[],y=u.target,M=E=>x.includes(E)||!!y&&!!E.contains?.(y);M(e)||M(o)||r.aoFechar()},c=()=>{o.isConnected?s():r.aoFechar()},l=u=>{u.target instanceof Node&&e.contains(u.target)||c()},m=()=>r.aoFechar();t.addEventListener("pointerdown",i,!0),a?.addEventListener("scroll",l,!0),a?.addEventListener("resize",c),a?.addEventListener("blur",m);let g={ancora:o,fechar:()=>r.aoFechar()};return dn.add(g),s(),{posicionar:s,fechar(){n&&(n=!1,dn.delete(g),t.removeEventListener("pointerdown",i,!0),a?.removeEventListener("scroll",l,!0),a?.removeEventListener("resize",c),a?.removeEventListener("blur",m),e.remove(),pn(a,0))}}}function mn(o,e){let r=J(e);if(!r)return[...o];let t=r.split(" "),a=[];return o.forEach((n,s)=>{let i=J(n.rotulo),c=`${i} ${J(n.descricao??"")}`;if(!t.every(m=>c.includes(m)))return;let l=i.startsWith(r)?0:i.split(" ").some(m=>m.startsWith(t[0]))?1:2;a.push({o:n,nota:l,i:s})}),a.sort((n,s)=>n.nota-s.nota||n.i-s.i).map(n=>n.o)}function oc(o,e){let r=o.normalize("NFC"),t=J(e).split(" ").filter(Boolean);if(!t.length)return[{texto:r,marcado:!1}];let a=[...r],n="",s=[];a.forEach((l,m)=>{let g=l.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase();for(let u of g)n+=u,s.push(m)});let i=new Array(a.length).fill(!1);for(let l of t){let m=n.indexOf(l);if(!(m<0))for(let g=m;g<m+l.length;g++)i[s[g]]=!0}let c=[];return a.forEach((l,m)=>{let g=c[c.length-1];g&&g.marcado===i[m]?g.texto+=l:c.push({texto:l,marcado:i[m]})}),c}var ec=0;function wo(o){let e=`spro-combo-${++ec}`,r=()=>typeof o.opcoes=="function"?o.opcoes():o.opcoes,t=new Map,a=S=>r().find(k=>k.valor===S)??t.get(S),n=[...o.valor??[]],s=null,i="",c=0,l=[],m=null,g=o.vazio??"Escolher\u2026",u=d("button",{type:"button",class:`spro-combo${o.classe?` ${o.classe}`:""}`,role:"combobox","aria-haspopup":"listbox","aria-expanded":"false","aria-label":o.rotulo,title:o.rotulo}),x=()=>o.aoMudar?.([...n]);function y(){let S=[];o.icone&&S.push(z(o.icone,15));let k=n.map(j=>a(j)).filter(j=>!!j),I=d("span",{class:"spro-combo-texto"});if(!k.length)I.classList.add("spro-combo-vazio"),I.append(g);else{let j=k[0];j.cor&&I.append(d("span",{class:"spro-combo-cor",style:`background:${j.cor}`})),I.append(d("span",{class:"spro-combo-rotulo"},j.rotulo)),k.length>1&&I.append(d("span",{class:"spro-combo-mais"},`+${k.length-1}`))}S.push(I,z("chevron",14)),u.classList.toggle("spro-combo-ativo",o.multiplo===!0&&k.length>0),u.replaceChildren(...S)}let M=()=>o.busca??(r().length>7||!!o.multiplo||!!o.criar);function E(S){if(o.multiplo){n=n.includes(S.valor)?n.filter(I=>I!==S.valor):[...n,S.valor],x(),y(),P();return}let k=n.length!==1||n[0]!==S.valor;n=[S.valor],y(),R(!0),k&&x()}async function b(){if(!o.criar)return;let S=i.trim();if(!S)return;let k=await o.criar(S);if(k){if(t.set(k.valor,k),i="",s){let I=s.querySelector(".spro-combo-busca");I&&(I.value="")}o.multiplo&&n.includes(k.valor)?P():E(k)}}function w(S,k){let I=n.includes(S.valor),j=d("span",{class:"spro-combo-op-rotulo"});for(let N of oc(S.rotulo,i))j.append(N.marcado?d("mark",{},N.texto):N.texto);let H=d("li",{role:"option",id:`${e}-op-${k}`,class:`spro-combo-op${k===c?" spro-combo-op-ativa":""}`,"data-valor":S.valor,"aria-selected":I?"true":"false"},o.multiplo?d("span",{class:"spro-combo-caixa","aria-hidden":"true"},I?z("check",12):null):null,S.cor?d("span",{class:"spro-combo-cor",style:`background:${S.cor}`}):null,S.icone?z(S.icone,15):null,d("span",{class:"spro-combo-op-textos"},j,S.descricao?d("span",{class:"spro-combo-op-desc"},S.descricao):null),S.contagem!==void 0?d("span",{class:"spro-combo-conta"},String(S.contagem)):null,!o.multiplo&&I?d("span",{class:"spro-combo-marca"},z("check",14)):null);return H.addEventListener("pointerdown",N=>N.preventDefault()),H.addEventListener("click",()=>{c=k,E(S)}),H.addEventListener("pointermove",()=>{c!==k&&(c=k,h())}),H}function h(){if(!s)return;let S=[...s.querySelectorAll('[role="option"]')];S.forEach((H,N)=>{H.classList.toggle("spro-combo-op-ativa",N===c)});let k=S[c],j=s.querySelector(".spro-combo-busca")??s.querySelector('[role="listbox"]');k?(j?.setAttribute("aria-activedescendant",k.id),k.scrollIntoView?.({block:"nearest"})):j?.removeAttribute("aria-activedescendant")}function P(){if(!s)return;l=mn(r(),i),c>=l.length&&(c=Math.max(0,l.length-1)),s.querySelector('[role="listbox"]').replaceChildren(...l.map(w));let k=s.querySelector(".spro-combo-extras");k.replaceChildren();let I=i.trim();l.length||k.append(d("p",{class:"spro-combo-nada"},I?"Nada encontrado.":"Nenhuma op\xE7\xE3o."));let j=r().some(N=>J(N.rotulo)===J(I));if(o.criar&&I&&!j){let N=d("button",{type:"button",class:"spro-combo-criar"},z("mais",14),d("span",{},o.rotuloCriar?o.rotuloCriar(I):`Criar \u201C${I}\u201D`));N.addEventListener("pointerdown",G=>G.preventDefault()),N.addEventListener("click",()=>void b()),k.append(N)}let H=s.querySelector(".spro-combo-rodape");if(H){let N=l.filter(po=>!n.includes(po.valor)),G=d("button",{type:"button",class:"spro-combo-acao",disabled:!I||!N.length},`Marcar os filtrados${I&&N.length?` (${N.length})`:""}`);G.addEventListener("click",()=>{n=[...n,...N.map(po=>po.valor)],x(),y(),P()});let zo=d("button",{type:"button",class:"spro-combo-acao spro-combo-limpar",disabled:!n.length},"Limpar");zo.addEventListener("click",()=>{n=[],x(),y(),P()}),H.replaceChildren(d("span",{class:"spro-combo-total"},n.length?`${n.length} marcado${n.length>1?"s":""}`:""),G,zo)}h()}let L=()=>m?.posicionar();function O(S){let k=l.length,I=S.target,j=s?[...s.querySelectorAll(".spro-combo-rodape button:not(:disabled)")]:[],H=!!I?.closest?.(".spro-combo-rodape, .spro-combo-criar");if(S.key==="Tab"){let G=j.indexOf(I);if(!S.shiftKey&&G<j.length-1)j[G+1]?.focus();else if(S.shiftKey&&G>=0)G>0?j[G-1]?.focus():(s?.querySelector(".spro-combo-busca")??s?.querySelector('[role="listbox"]'))?.focus();else{R(!0);return}S.preventDefault(),S.stopPropagation();return}if(H&&S.key!=="Escape")return;let N=!s?.querySelector(".spro-combo-busca");if(N&&S.key===" "){let G=l[c];G&&E(G),S.preventDefault(),S.stopPropagation();return}if(N&&S.key.length===1&&!S.ctrlKey&&!S.metaKey&&!S.altKey){let G=J(S.key),po=[...l.keys()].map(So=>(c+1+So)%Math.max(1,k)).find(So=>J(l[So]?.rotulo??"").startsWith(G));po!==void 0&&(c=po,h()),S.preventDefault(),S.stopPropagation();return}switch(S.key){case"ArrowDown":c=k?(c+1)%k:0,h();break;case"ArrowUp":c=k?(c-1+k)%k:0,h();break;case"Home":if(S.target?.classList?.contains("spro-combo-busca")&&i)return;c=0,h();break;case"End":if(S.target?.classList?.contains("spro-combo-busca")&&i)return;c=Math.max(0,k-1),h();break;case"Enter":{let G=l[c];G?E(G):b();break}case"Escape":R(!0);break;case"Backspace":if(!o.multiplo||i||!n.length)return;n=n.slice(0,-1),x(),y(),P();break;default:return}S.preventDefault(),S.stopPropagation()}function $(S=""){if(s)return;i=S,c=S?0:(()=>{let H=mn(r(),i).findIndex(N=>N.valor===n[n.length-1]);return H<0?0:H})();let I=M()?d("input",{type:"text",class:"spro-combo-busca",placeholder:o.criar?"Buscar ou criar\u2026":"Buscar\u2026","aria-label":`Filtrar ${o.rotulo.toLowerCase()}`,"aria-controls":`${e}-lista`,"aria-autocomplete":"list",autocomplete:"off",spellcheck:"false",value:S}):null;if(I&&(I.value=S,I.addEventListener("input",()=>{i=I.value,c=0,P(),L()})),s=d("div",{class:`spro-combo-pop${o.multiplo?" spro-combo-pop-multi":""}`},I?d("div",{class:"spro-combo-cabeca"},z("busca",15),I):null,d("ul",{role:"listbox",id:`${e}-lista`,class:"spro-combo-lista",tabindex:I?void 0:"-1","aria-label":o.rotulo,"aria-multiselectable":o.multiplo?"true":void 0}),d("div",{class:"spro-combo-extras"}),o.multiplo?d("div",{class:"spro-combo-rodape"}):null),s.addEventListener("keydown",O),m=un(u,s,{larguraMinima:o.larguraLista??220,alturaMaxima:360,aoFechar:()=>R(!1)}),u.setAttribute("aria-expanded","true"),u.setAttribute("aria-controls",`${e}-lista`),u.classList.add("spro-combo-aberto"),P(),L(),!s)return;(I??s.querySelector('[role="listbox"]'))?.focus?.({preventScroll:!0}),I&&S&&I.setSelectionRange?.(S.length,S.length)}function R(S=!1){s&&(m?.fechar(),m=null,s=null,i="",u.setAttribute("aria-expanded","false"),u.removeAttribute("aria-controls"),u.classList.remove("spro-combo-aberto"),S&&u.focus?.({preventScroll:!0}))}return u.addEventListener("click",()=>s?R(!0):$()),u.addEventListener("keydown",S=>{s||(S.key==="ArrowDown"||S.key==="ArrowUp"?(S.preventDefault(),$()):S.key.length===1&&S.key!==" "&&!S.ctrlKey&&!S.metaKey&&!S.altKey&&M()&&(S.preventDefault(),$(S.key)))}),y(),{el:u,valor:()=>[...n],definir(S,k=!1){n=[...S],y(),P(),k&&x()},atualizar(){y(),P()},definirVazio(S){g=S,y()},abrir:$,fechar:()=>R(!1)}}var fn="#tblProcessosRecebidos input[type=checkbox], #tblProcessosGerados input[type=checkbox], #tblProcessosDetalhado input[type=checkbox]",$r=o=>o.getAttribute("value")??o.closest("tr")?.id.replace(/^P/,"")??"";function Tr(o){let e=new Set;for(let r of o.querySelectorAll(fn))r.checked&&$r(r)&&e.add($r(r));return e}function gn(o,e){let r=new Set(e);for(let t of o.querySelectorAll(fn)){let a=$r(t);a&&(r.delete(a),!t.disabled&&!!t.checked!==e.has(a)&&t.click())}return[...r]}function rc(o){let e=o.composedPath?.()??[];if(e.length)return e.some(r=>r.id==="spro-grade");for(let r=o.target;r;r=r.parentNode)if(r.id==="spro-grade")return!0;return!1}function hn(o,e){let r=!1,t=a=>{a&&rc(a)||r||(r=!0,queueMicrotask(()=>{r=!1,e(Tr(o))}))};return o.addEventListener("click",t,!0),o.addEventListener("change",t,!0),()=>{o.removeEventListener("click",t,!0),o.removeEventListener("change",t,!0)}}function tc(o){return/acaoControleProcessos\(\s*['"][^'"]*['"]\s*,\s*true/.test(o.elemento.getAttribute("onclick")??"")}function bn(o,e){return tc(o)&&e===0?{ok:!1,motivo:"Marque ao menos um processo."}:(o.elemento.click(),{ok:!0})}var ac=o=>o instanceof Error?o.message:String(o);function vn(o){if(o.tipo==="atribuicao")return{...o,para:o.de,de:o.para};let e={tipo:"marcador",id:o.id,protocolo:o.protocolo};return o.adicionar&&(e.remover=o.adicionar),o.remover&&(e.adicionar=o.remover,o.texto&&(e.texto=o.texto)),e}async function nc(o,e){try{if(o.tipo==="atribuicao")return await e.atribuir(o.protocolo,o.para),{ok:!0,desfazer:vn(o)};if(o.adicionar&&await e.marcador(o.protocolo,{marcador:o.adicionar,...o.texto?{texto:o.texto}:{}}),o.remover)try{await e.marcador(o.protocolo,{marcador:o.remover,remover:!0})}catch(r){throw o.adicionar&&await e.marcador(o.protocolo,{marcador:o.adicionar,remover:!0}).catch(()=>{}),r}return{ok:!0,desfazer:vn(o)}}catch(r){return{ok:!1,erro:ac(r)}}}function xn(o){let e=Promise.resolve();return{mover(r){let t=e.then(()=>nc(r,o));return e=t.catch(()=>{}),t}}}var Re=o=>`${o} ${Math.abs(o)===1?"dia":"dias"}`,An=Number.MAX_SAFE_INTEGER;function Rr(o,e){let r=[e];return o.hora&&o.vencimento&&(r[0]=e.replace(/\.$/,"")+` \xE0s ${o.hora}.`),o.texto&&r.push(o.texto),o.sigla&&r.push(`Definido por ${o.sigla} no controle de prazo do SEI.`),r.join(`
`)}function yn(o,e){let r=o.vencimento;if(o.concluidoEm&&r)return{situacao:"concluido",texto:`conclu\xEDdo em ${co(o.concluidoEm).slice(0,5)}`,dica:Rr(o,`Prazo de ${co(r)} conclu\xEDdo em ${co(o.concluidoEm)}.`),ordem:An,sorter:`${r} 23:59:59`};if(r){let s=Lo(e,r),i=`${r} ${o.hora??"23:59"}:00`,c=Rr(o,`Vence em ${co(r)}.`);return s===0?{situacao:"hoje",texto:"vence hoje",dica:c,ordem:0,sorter:i}:s<0?{situacao:"atrasado",texto:`${Re(-s)} de atraso`,dica:c,ordem:s,sorter:i}:{situacao:"noPrazo",texto:`vence em ${Re(s)}`,dica:c,ordem:s,sorter:i}}let t=o.inicio??e,a=Lo(t,e);return{situacao:"desde",texto:a===0?"hoje":a>0?`h\xE1 ${Re(a)}`:`em ${Re(-a)}`,dica:Rr(o,`Contando desde ${co(t)}.`),ordem:An-1,sorter:`${t} ${o.hora??"23:59"}:00`}}function io(o,e){return o.prazo?yn(o.prazo,e.hoje):null}function go(o,e){return o.vistoEm===void 0?null:Math.max(0,Math.floor((e.agora-o.vistoEm)/864e5))}function Mo(o,e){return o.ultimaMov?Math.max(0,Lo(o.ultimaMov,e.hoje)):null}function En(o,e){return e.visitaAnterior!==void 0&&o.vistoEm!==void 0&&o.vistoEm>e.visitaAnterior}function ae(o,e){let r=io(o,e);return!r||r.situacao==="concluido"||r.situacao==="desde"?null:r.ordem}var sc={resp:"resp",responsavel:"resp",atribuido:"resp",atribuicao:"resp",tipo:"tipo",marcador:"marcador",marcadores:"marcador",marc:"marcador",espec:"espec",especificacao:"espec",anot:"anot",anotacao:"anot",nota:"anot",prazo:"prazo",caixa:"caixa",idade:"caixa",novo:"novo",sigilo:"sigilo",sigiloso:"sigilo",grupo:"grupo",retorno:"retorno",protocolo:"protocolo",proc:"protocolo",processo:"protocolo",parado:"parado",mov:"parado",prio:"prio",prioridade:"prio",interessado:"interessado",interessados:"interessado"};function _r(o){let e=[],r="",t=!1;for(let a of o)a==='"'?(t=!t,r+=a):/\s/.test(a)&&!t?(r&&e.push(r),r=""):r+=a;return r&&e.push(r),e}var ic=o=>o.replace(/^"|"$/g,"");function qr(o){let e=[],r=[];for(let t of _r(o)){let a=t,n=!1;a.startsWith("-")&&a.length>1&&(n=!0,a=a.slice(1));let s,i=/^([a-zA-Z\u00C0-\u017F]+):(.*)$/.exec(a);if(i){let g=sc[J(i[1])];g&&(s=g,a=i[2])}let c="=";s&&/^[<>]/.test(a)&&(c=a[0],a=a.slice(1));let l=J(ic(a));if(!l&&!s)continue;let m={...s?{campo:s}:{},valor:l,original:t,negado:n,comparador:c};e.push(m),r.push({texto:t,termo:m})}return{termos:e,tokens:r}}var cc=o=>J([o.protocolo,o.protocolo.replace(/\D/g,""),o.tipo,o.especificacao,o.atribuicao?.sigla,o.atribuicao?.nome,...o.marcadores.flatMap(e=>[e.nome,e.texto]),o.anotacao?.texto,o.prazo?.texto,o.prioridade,o.interessados,o.observacao].filter(Boolean).join(" ")),ho=(o,e)=>J(o??"").includes(e),Sn=/^(s|sim|1|true|yes)$/;function Nr(o){let e=/^(\d+)\s*(d|dia|dias)?$/.exec(o);return e?Number(e[1]):null}function zr(o,e,r){return o===null?!1:e==="<"?o<r:e===">"?o>r:o===r}function lc(o,e,r){let t=io(o,r),a=e.valor;if(a==="sem"||a==="nenhum"||a==="nao")return!o.prazo;if(a==="com"||a==="sim")return!!o.prazo;if(!t)return!1;if(a==="atrasado"||a==="atrasados"||a==="vencido")return t.situacao==="atrasado";if(a==="hoje")return t.situacao==="hoje";if(a==="concluido"||a==="concluidos")return t.situacao==="concluido";if(a==="semana"){let s=ae(o,r);return s!==null&&s>=0&&s<=7}let n=Nr(a);return n!==null?zr(ae(o,r),e.comparador==="="?"<":e.comparador,n):ho(o.prazo?.texto,a)}function dc(o,e,r){let t=e.valor;switch(e.campo){case"resp":return t==="sem"||t==="ninguem"?!o.atribuicao:t==="eu"?!!r.eu&&J(o.atribuicao?.sigla??"")===J(r.eu):ho(o.atribuicao?.sigla,t)||ho(o.atribuicao?.nome,t);case"tipo":return ho(o.tipo,t);case"marcador":return t==="sem"||t==="nenhum"?o.marcadores.length===0:t==="com"?o.marcadores.length>0:o.marcadores.some(a=>ho(a.nome,t)||ho(a.texto,t));case"espec":return ho(o.especificacao,t);case"anot":return t==="sem"||t==="nao"?!o.anotacao:t==="com"||t==="sim"?!!o.anotacao:t==="prioridade"||t==="prioritaria"?!!o.anotacao?.prioridade:ho(o.anotacao?.texto,t);case"prazo":return lc(o,e,r);case"caixa":{let a=Nr(t);return a===null?!1:zr(go(o,r),e.comparador==="="?">":e.comparador,a)}case"novo":return t==="visita"?En(o,r):Sn.test(t)?o.naoVisualizado:t==="nao"?!o.naoVisualizado:!1;case"sigilo":return Sn.test(t)?o.sigiloso:!o.sigiloso;case"grupo":return t.startsWith("rec")?o.grupo==="recebidos":t.startsWith("ger")?o.grupo==="gerados":!1;case"retorno":return t==="sem"||t==="nao"?o.retornos.length===0:t==="atrasado"?o.retornos.some(a=>a.atrasado):t==="aguardando"?o.retornos.some(a=>a.tipo==="aguardando"):t==="programado"?o.retornos.some(a=>a.tipo==="programado"):o.retornos.length>0;case"parado":{let a=Nr(t);return a===null?!1:zr(Mo(o,r),e.comparador==="="?">":e.comparador,a)}case"prio":return ho(o.prioridade,t);case"interessado":return ho(o.interessados,t);case"protocolo":return J(o.protocolo).includes(t)||o.protocolo.replace(/\D/g,"").includes(t.replace(/\D/g,"")||"\0");default:return!0}}function pc(o,e,r){if(!o.termos.length)return!0;let t;for(let a of o.termos){let n;if(a.campo?n=dc(e,a,r):(t??=cc(e),n=t.includes(a.valor)),a.negado?n:!n)return!1}return!0}var Pn=(o,e,r)=>{let t=qr(e);return t.termos.length?o.filter(a=>pc(t,a,r)):o};function Ne(o,e){return _r(o).filter(r=>r!==e).join(" ")}function wn(o,e,r){let t=/\s/.test(r)?`"${r}"`:r,a=`${e}:${t}`,n=_r(o);return n.includes(a)?o:[...n,a].join(" ")}var uc=new Intl.Collator("pt-BR",{sensitivity:"base",numeric:!0});function mc(o,e=[]){return[...o.values()].sort((r,t)=>{let a=e.indexOf(r.chave),n=e.indexOf(t.chave);return a>=0||n>=0?(a<0?-1:a)-(n<0?-1:n):uc.compare(r.rotulo,t.rotulo)})}function U(o,e,r,t){let a=o.get(e);return a||(a={chave:e,rotulo:r,itens:[],...t?{tom:t}:{}},o.set(e,a)),a}var Uo=[["atrasado","Atrasados","perigo"],["hoje","Vencem hoje","aviso"],["semana","Pr\xF3ximos 7 dias","aviso"],["mes","Pr\xF3ximos 30 dias","neutro"],["depois","Depois de 30 dias","neutro"],["desde","Contando desde uma data","neutro"],["concluido","Prazo conclu\xEDdo","neutro"],["sem","Sem prazo","neutro"]];function ne(o,e){let r=io(o,e);if(!r)return"sem";if(r.situacao==="concluido")return"concluido";if(r.situacao==="desde")return"desde";if(r.situacao==="atrasado")return"atrasado";if(r.situacao==="hoje")return"hoje";let t=ae(o,e)??0;return t<=7?"semana":t<=30?"mes":"depois"}var Mn=[["recente","Chegaram hoje"],["semana","Nos \xFAltimos 7 dias"],["mes","Nos \xFAltimos 30 dias"],["antigo","H\xE1 mais de 30 dias"],["desconhecido","Sem registro"]];function fc(o,e){let r=go(o,e);return r===null?"desconhecido":r<1?"recente":r<=7?"semana":r<=30?"mes":"antigo"}function Do(o,e){return e.map(r=>o.get(r[0])).filter(r=>!!r)}function ze(o,e,r){if(e==="nenhum")return[{chave:"todos",rotulo:"Todos",itens:o}];let t=new Map;for(let a of o)switch(e){case"responsavel":a.atribuicao?U(t,`u:${a.atribuicao.sigla}`,a.atribuicao.nome===a.atribuicao.sigla?a.atribuicao.sigla:`${a.atribuicao.nome} (${a.atribuicao.sigla})`).itens.push(a):U(t,"sem","Sem respons\xE1vel").itens.push(a);break;case"tipo":U(t,`t:${a.tipo||"-"}`,a.tipo||"Sem tipo").itens.push(a);break;case"marcador":if(a.marcadores.length)for(let n of a.marcadores)U(t,`m:${n.nome}`,n.nome).itens.push(a);else U(t,"sem","Sem marcador").itens.push(a);break;case"prazo":{let n=ne(a,r),s=Uo.find(i=>i[0]===n);U(t,n,s[1],s[2]).itens.push(a);break}case"situacao":a.naoVisualizado?U(t,"novo","N\xE3o visualizados","aviso").itens.push(a):U(t,"lido","Visualizados").itens.push(a);break;case"grupo":U(t,a.grupo,a.grupo==="recebidos"?"Recebidos":"Gerados").itens.push(a);break;case"anotacao":a.anotacao?.prioridade?U(t,"prio","Anota\xE7\xE3o com prioridade","aviso").itens.push(a):a.anotacao?U(t,"com","Com anota\xE7\xE3o").itens.push(a):U(t,"sem","Sem anota\xE7\xE3o").itens.push(a);break;case"acompanhamento":a.acompanhamentoEspecial?U(t,"com","Em acompanhamento especial").itens.push(a):U(t,"sem","Fora do acompanhamento especial").itens.push(a);break;case"retorno":a.retornos.some(n=>n.atrasado)?U(t,"atrasado","Retorno atrasado","perigo").itens.push(a):a.retornos.some(n=>n.tipo==="aguardando")?U(t,"aguardando","Aguardando retorno").itens.push(a):a.retornos.length?U(t,"programado","Retorno programado").itens.push(a):U(t,"sem","Sem retorno").itens.push(a);break;case"caixa":{let n=fc(a,r);U(t,n,Mn.find(s=>s[0]===n)[1]).itens.push(a);break}case"autuacao":case"recebimento":case"envio":{let n=ua(r.andamentos?.[a.id]?.[e],r.hoje);U(t,n,hr.find(s=>s[0]===n)[1]).itens.push(a);break}case"unidadeEnvio":{let n=r.andamentos?.[a.id]?.unidadeEnvio;n?U(t,`u:${n}`,n).itens.push(a):U(t,"sem","Sem informa\xE7\xE3o").itens.push(a);break}}return e==="prazo"?Do(t,Uo):e==="caixa"?Do(t,Mn):e==="autuacao"||e==="recebimento"||e==="envio"?Do(t,hr):e==="situacao"?Do(t,[["novo",""],["lido",""]]):e==="grupo"?Do(t,[["recebidos",""],["gerados",""]]):e==="anotacao"?Do(t,[["prio",""],["com",""],["sem",""]]):e==="acompanhamento"?Do(t,[["com",""],["sem",""]]):e==="retorno"?Do(t,[["atrasado",""],["aguardando",""],["programado",""],["sem",""]]):mc(t,["sem"])}var Vr={nenhum:"Sem agrupamento",responsavel:"Respons\xE1vel",tipo:"Tipo de processo",marcador:"Marcador",prazo:"Prazo",situacao:"Visualiza\xE7\xE3o",grupo:"Recebidos e gerados",anotacao:"Anota\xE7\xE3o",acompanhamento:"Acompanhamento especial",retorno:"Retorno programado",caixa:"Tempo na caixa",autuacao:"Data de autua\xE7\xE3o",recebimento:"Data de recebimento",envio:"Data de envio",unidadeEnvio:"Unidade de envio"};var gc=new Intl.Collator("pt-BR",{sensitivity:"base",numeric:!0});function _e(o,e){let r=new Map;for(let t of o)for(let a of e(t)){let n=r.get(a.valor)??{valor:a.valor,rotulo:a.rotulo,n:0};n.n+=1,r.set(a.valor,n)}return[...r.values()].sort((t,a)=>a.n-t.n||gc.compare(t.rotulo,a.rotulo))}function Hr(o,e){let r=_e(o,t=>{let a=ne(t,e),n=Uo.find(i=>i[0]===a)[1],s=a==="atrasado"?"atrasado":a==="hoje"?"hoje":a==="semana"?"semana":a==="sem"?"sem":a==="concluido"?"concluido":"";return s?[{valor:s,rotulo:n}]:[]});return{responsaveis:_e(o,t=>t.atribuicao?[{valor:t.atribuicao.sigla,rotulo:`${t.atribuicao.nome} (${t.atribuicao.sigla})`}]:[{valor:"sem",rotulo:"Sem respons\xE1vel"}]),tipos:_e(o,t=>t.tipo?[{valor:t.tipo,rotulo:t.tipo}]:[]),marcadores:_e(o,t=>t.marcadores.length?t.marcadores.map(a=>({valor:a.nome,rotulo:a.nome})):[{valor:"sem",rotulo:"Sem marcador"}]),prazos:r}}function jr(o){let e=[];o.sigiloso&&e.push("Sigiloso"),o.naoVisualizado&&e.push("N\xE3o visualizado"),o.documentoNovo&&e.push("Documento novo"),o.urgente&&e.push("Urgente"),o.trancado&&e.push("Trancado"),o.acompanhamentoEspecial&&e.push(o.acompanhamentoGrupo?`Acompanhamento especial (${o.acompanhamentoGrupo})`:"Acompanhamento especial");for(let r of o.retornos)e.push(`${r.tipo==="aguardando"?"Aguardando retorno":"Retorno programado"}${r.atrasado?" (atrasado)":""}`);return e}function Fr(o,e){let r=io(o,e);if(!o.prazo||!r)return"";let t=o.prazo.vencimento??o.prazo.inicio;return`${t?co(t):""}${o.prazo.hora?` ${o.prazo.hora}`:""} (${r.texto})`.trim()}var hc=(o,e,r)=>{switch(e){case"processo":return o.protocolo;case"tipo":return o.tipo;case"especificacao":return o.especificacao;case"responsavel":return o.atribuicao?o.atribuicao.nome===o.atribuicao.sigla?o.atribuicao.sigla:`${o.atribuicao.nome} (${o.atribuicao.sigla})`:"";case"marcadores":return o.marcadores.map(t=>t.texto?`${t.nome}: ${t.texto}`:t.nome).join("; ");case"prazo":return Fr(o,r);case"anotacao":return o.anotacao?.texto.replace(/\s*\n\s*/g," / ")??"";case"caixa":return jo(go(o,r));case"parado":return jo(Mo(o,r));case"sinais":return jr(o).join("; ")}};function Dn(o,e,r){return[e.map(t=>Ro[t]),...o.map(t=>e.map(a=>hc(t,a,r)))]}var Cn=o=>`processos-${o}.csv`;function kn(o,e,r){let t=[];for(let a of o){let n=r&&e.has(a.chave);if(r&&t.push({tipo:"grupo",grupo:a,recolhido:n}),!n)for(let s of a.itens)t.push({tipo:"processo",processo:s,grupo:a.chave})}return t}var Gr=new Intl.Collator("pt-BR",{numeric:!0,sensitivity:"base"});function On(o){let e=/(\d+)\/(\d{4})-\d+\s*$/.exec(o);if(!e)return null;let r=/(\d+)\s*$/.exec(e[1].split(/[.-]/).pop()??"")?.[1]??e[1];return[Number(e[2]),Number(r)]}function bc(o,e){let r=On(o),t=On(e);return r&&t&&(r[0]-t[0]||r[1]-t[1])||Gr.compare(o,e)}function Ln(o,e,r){switch(e){case"tipo":return o.tipo||null;case"responsavel":return o.atribuicao?.sigla??null;case"marcador":return o.marcadores[0]?.nome??null;case"prazo":{let t=io(o,r);return t?t.ordem:null}case"caixa":return go(o,r);case"parado":return Mo(o,r);case"novo":return o.naoVisualizado?0:1}}function vc(o,e){return(r,t)=>{for(let a of o){let n;if(a.campo==="protocolo")n=bc(r.protocolo,t.protocolo),a.decrescente&&(n=-n);else{let s=Ln(r,a.campo,e),i=Ln(t,a.campo,e);if(s===null&&i===null)continue;if(s===null)return 1;if(i===null)return-1;n=typeof s=="number"&&typeof i=="number"?s-i:Gr.compare(String(s),String(i)),a.decrescente&&(n=-n)}if(n)return n}return 0}}function In(o,e,r){return e.length?[...o].sort(vc(e,r)):o}function $n(o,e,r){let t=o.findIndex(s=>s.campo===e),a=t<0?{campo:e,decrescente:!1}:o[t].decrescente?null:{campo:e,decrescente:!0};if(!r)return a?[a]:[];if(t<0)return[...o,a];let n=[...o];return a?n[t]=a:n.splice(t,1),n}var Ur=new Intl.Collator("pt-BR",{sensitivity:"base",numeric:!0}),bo="sem";function Tn(o,e,r,t={}){let a=new Map,n=(i,c,l,m,g)=>{let u=a.get(i);return u||(u={chave:i,titulo:c,itens:[],aceitaSoltar:l,excedeu:!1,...m?{motivoSomenteLeitura:m}:{},...g?{tom:g}:{}},a.set(i,u)),u};if(e.colunas==="marcador"){n(bo,"Sem marcador",!0);for(let i of[...t.marcadores??[]].sort(Ur.compare))n(`m:${i}`,i,!0);for(let i of o){i.marcadores.length||n(bo,"Sem marcador",!0).itens.push(i);for(let c of i.marcadores)n(`m:${c.nome}`,c.nome,!0).itens.push(i)}}else if(e.colunas==="responsavel"){n(bo,"Sem respons\xE1vel",!0);for(let i of t.responsaveis??[])n(`u:${i.sigla}`,`${i.nome} (${i.sigla})`,!0);for(let i of o)i.atribuicao?n(`u:${i.atribuicao.sigla}`,`${i.atribuicao.nome} (${i.atribuicao.sigla})`,!0).itens.push(i):n(bo,"Sem respons\xE1vel",!0).itens.push(i)}else if(e.colunas==="prazo"){for(let[i,c,l]of Uo)i!=="desde"&&n(i,c,!1,"O prazo \xE9 definido pelo bot\xE3o de prazo, n\xE3o arrastando.",l);for(let i of o){let c=ne(i,r);n(c==="desde"?"sem":c,"",!1).itens.push(i)}}else for(let i of o)n(`t:${i.tipo}`,i.tipo||"Sem tipo",!1,"O tipo do processo n\xE3o muda arrastando.").itens.push(i);let s=[...a.values()];if(e.colunas==="prazo"&&(s=s.filter(i=>i.itens.length||i.titulo)),e.colunas==="marcador"||e.colunas==="responsavel"?s.sort((i,c)=>i.chave===bo?-1:c.chave===bo?1:Ur.compare(i.titulo,c.titulo)):e.colunas==="tipo"&&s.sort((i,c)=>Ur.compare(i.titulo,c.titulo)),e.limite>0)for(let i of s)i.excedeu=i.itens.length>e.limite;return s}var qe=o=>o.slice(o.indexOf(":")+1);function Rn(o,e,r,t){if(r===t)return{ok:!1,motivo:"Mesma coluna."};if(o==="marcador"){let a=r===bo?void 0:qe(r),n=t===bo?void 0:qe(t);if(a&&!e.marcadores.some(l=>l.nome===a))return{ok:!1,motivo:"O processo j\xE1 n\xE3o tem esse marcador."};let s=n?e.marcadores.some(l=>l.nome===n):!1,i=a?e.marcadores.find(l=>l.nome===a)?.texto:void 0,c={tipo:"marcador",id:e.id,protocolo:e.protocolo};return a&&(c.remover=a),n&&!s&&(c.adicionar=n,i&&(c.texto=i)),!c.remover&&!c.adicionar?{ok:!1,motivo:"Nada a mudar."}:{ok:!0,movimento:c}}return o==="responsavel"?{ok:!0,movimento:{tipo:"atribuicao",id:e.id,protocolo:e.protocolo,para:t===bo?null:qe(t),de:r===bo?null:qe(r)}}:{ok:!1,motivo:"Esta divis\xE3o do quadro \xE9 s\xF3 de leitura."}}function Br(o,e,r={}){if(e.tipo==="atribuicao"){if(e.para===null){let{atribuicao:a,...n}=o;return n}return{...o,atribuicao:{sigla:e.para,nome:r[e.para]??e.para}}}let t=o.marcadores;return e.remover&&(t=t.filter(a=>a.nome!==e.remover)),e.adicionar&&(t=[...t,{nome:e.adicionar,cor:"",texto:e.texto??""}]),{...o,marcadores:t}}function Bo(o,e){let r=o.ownerDocument??document;for(let n of Array.from(o.querySelectorAll("dialog.spro-dialogo-grade")))n.remove();let t=d("dialog",{class:`spro-dialogo spro-dialogo-grade${e.largo?" spro-dialogo-largo":""}`,"aria-label":e.titulo}),a=()=>{t.open?t.close():t.remove()};return t.append(d("header",{},e.icone?d("span",{class:"spro-dialogo-icone","aria-hidden":"true"},z(e.icone,18)):null,d("h2",{},e.titulo,e.subtitulo?d("small",{class:"spro-dialogo-sub"},e.subtitulo):null),d("button",{type:"button",class:"spro-botao-icone","aria-label":"Fechar",title:"Fechar (Esc)",onclick:a},z("fechar",16))),d("div",{class:"spro-dialogo-corpo"},e.conteudo)),t.addEventListener("close",()=>{t.remove(),e.aoFechar?.()}),o.append(t),typeof t.showModal=="function"?t.showModal():t.setAttribute("open",""),t.querySelector(".spro-combo, textarea, input:not([type=checkbox])")?.focus({preventScroll:!0}),{fechar:a,dlg:t}}var xc=["autuacao","recebimento","envio","unidadeEnvio"],ie=o=>xc.includes(o);function Ac(o){let e=Math.floor(o/6e4);return e<1?"agora h\xE1 pouco":e<60?`h\xE1 ${e} min`:`h\xE1 ${Math.floor(e/60)} h`}var se=(o,e,r)=>`${o} ${o===1?e:r}`;function Nn(o){let e={},r=null,t=!1,a=!1,n,s=d("div",{class:"spro-andamento",hidden:!0,role:"status","aria-live":"polite"}),i=()=>o.processos().filter(h=>!!h.link&&!h.sigiloso&&!h.naoVisualizado),c=()=>Object.values(e).filter(h=>oe(h,o.agora())),l=()=>i().filter(h=>!e[h.id]||!oe(e[h.id],o.agora())),m=()=>{let h=o.processos();return{naoVistos:h.filter(P=>P.naoVisualizado&&!P.sigiloso).length,sigilosos:h.filter(P=>P.sigiloso).length,semLink:h.filter(P=>!P.link&&!P.sigiloso&&!P.naoVisualizado).length}};async function g(){try{e=await o.armazem.lerAndamentos(o.agora())}catch{e={}}o.aoMudar()}function u(h,P){return new Promise(L=>{let O=!1,$=m(),R=[];$.naoVistos&&R.push(`${se($.naoVistos,"processo ainda n\xE3o visualizado","processos ainda n\xE3o visualizados")} nesta unidade (abrir o andamento o marcaria como visualizado ou recebido em seu nome)`),$.sigilosos&&R.push(`${se($.sigilosos,"processo sigiloso","processos sigilosos")}`);let S=d("button",{type:"button",class:"spro-botao primario",onclick:()=>{O=!0,L(!0),I.fechar()}},z("busca",15),"Consultar andamento"),k=d("div",{class:"spro-confirma-andamento"},d("p",{},"Para agrupar por data ou por unidade de envio, o SEI Pro precisa ",d("strong",{},"abrir o andamento de cada processo, um por um")," no SEI. A consulta \xE9 s\xF3 de leitura, mas faz v\xE1rias requisi\xE7\xF5es por processo e pode levar alguns minutos."),d("p",{},d("strong",{},`Ser\xE3o consultados ${se(h,"processo","processos")}.`),P?` Outros ${P} j\xE1 est\xE3o guardados e ficam como est\xE3o.`:""),R.length?d("div",{},d("p",{},"Ficam de fora:"),d("ul",{},...R.map(j=>d("li",{},j)))):null,d("p",{class:"spro-suave"},"O resultado fica guardado neste navegador por 24 horas: ao recarregar a p\xE1gina, ele reaparece sem nova consulta. Voc\xEA pode cancelar a consulta a qualquer momento."),d("div",{class:"spro-dialogo-rodape"},S)),I=Bo(o.sombra,{titulo:"Consultar o andamento dos processos",icone:"alerta",conteudo:k,aoFechar:()=>L(O)})})}function x(){if(o.semDebounce)return o.aoMudar();n||(n=setTimeout(()=>{n=void 0,t||o.aoMudar()},400))}async function y(){try{await o.armazem.gravarAndamentos(e)}catch{}}async function M(h){if(r||!h.length||t)return;let P=new AbortController;r={ctl:P,progresso:{feitos:0,total:h.length,semDados:0}},w();let L=0,O=await ma({alvos:h,sinal:P.signal,simultaneas:o.simultaneas,pausaMs:o.pausaMs,esperar:o.esperar,consultar:($,R)=>o.consultar($,R),aoResolver:($,R,S,k)=>{r&&(r.progresso=S),k||(e[$.id]={...R??{},consultadoEm:o.agora()}),L+=1,L>=10&&(L=0,y()),w(),x()}});r=null,await y(),clearTimeout(n),n=void 0,!t&&(o.aoMudar(),O.motivo==="sessao"?o.aviso("A sess\xE3o do SEI expirou: a consulta parou. O que j\xE1 foi lido ficou guardado."):O.motivo==="erros"?o.aviso("O SEI parou de responder: a consulta foi interrompida. O que j\xE1 foi lido ficou guardado."):O.motivo==="concluida"&&o.aviso(`Andamento consultado: ${se(O.progresso.feitos-O.progresso.semDados,"processo","processos")} com dados${O.progresso.semDados?`, ${O.progresso.semDados} sem informa\xE7\xE3o`:""}.`))}async function E(h){if(r)return!0;let P=h==="todos"?i():l();if(!P.length)return o.aviso(h==="todos"?"Nenhum processo eleg\xEDvel para consultar.":"Todos os processos j\xE1 t\xEAm o andamento guardado."),!1;let L=h==="todos"?0:i().length-P.length;return await u(P.length,L)?(M(P),!0):!1}async function b(){return r||!l().length?!0:await E("novo")||c().length>0}function w(){if(s.hidden=!a||t,s.hidden)return;if(r){let{feitos:$,total:R}=r.progresso;s.replaceChildren(d("span",{},`Consultando o andamento dos processos\u2026 ${$} de ${R}`),d("progress",{max:String(R),value:String($),"aria-label":"Progresso da consulta"}),d("button",{type:"button",class:"spro-link",onclick:()=>r?.ctl.abort()},"Cancelar"));return}let h=c();if(!h.length){s.replaceChildren(d("span",{},'O andamento dos processos ainda n\xE3o foi consultado, por isso todos aparecem em "Sem informa\xE7\xE3o".'),d("button",{type:"button",class:"spro-link",onclick:()=>void E("novo")},"Consultar agora"));return}let P=Math.min(...h.map($=>$.consultadoEm)),L=P+br,O=l().length;s.replaceChildren(d("span",{},`Andamento consultado ${Ac(o.agora()-P)} (guardado at\xE9 ${new Date(L).toLocaleString("pt-BR",{day:"2-digit",month:"2-digit",hour:"2-digit",minute:"2-digit"})})`,O?` \xB7 ${se(O,"processo ainda sem consulta","processos ainda sem consulta")}`:""),d("button",{type:"button",class:"spro-link",onclick:()=>void E("todos")},z("atualizar",13)," Atualizar"))}return{faixa:s,carregar:g,dados:()=>e,definirAtivo(h){a=h,w()},atualizarFaixa:w,aoEscolherAgrupamento:b,pedir:E,emAndamento:()=>!!r,fechar(){t=!0,r?.ctl.abort(),clearTimeout(n)}}}var Qr="application/x-spro-cartao";function yc(o,e,r){let t=io(o,r.ctx),a=d("input",{type:"checkbox",class:"spro-cb","aria-label":`Marcar ${o.protocolo}`});a.checked=r.selecionados.has(o.id),a.addEventListener("change",()=>r.aoSelecionar(o.id,a.checked));let n=d("div",{class:`spro-cartao${a.checked?" spro-sel":""}`,draggable:"true","data-id":o.id,"data-de":e},d("div",{class:"spro-cartao-topo"},a,d("a",{class:`spro-proc${o.naoVisualizado?" spro-novo":""}`,href:o.link??"#",draggable:"false"},o.protocolo)),o.tipo?d("div",{class:"spro-cartao-tipo"},o.tipo):null,o.especificacao?d("div",{class:"spro-cartao-espec"},o.especificacao):null,d("div",{class:"spro-cartao-rodape"},t?d("span",{class:`spro-prazo spro-prazo-${t.situacao}`,title:t.dica},t.texto):null,o.atribuicao?d("span",{class:"spro-avatar",title:o.atribuicao.nome},o.atribuicao.sigla.slice(0,2).toUpperCase()):null));return n.addEventListener("dragstart",s=>{s.dataTransfer?.setData(Qr,JSON.stringify({id:o.id,de:e})),s.dataTransfer?.setData("text/plain",o.protocolo),s.dataTransfer&&(s.dataTransfer.effectAllowed="move"),n.classList.add("spro-arrastando")}),n.addEventListener("dragend",()=>n.classList.remove("spro-arrastando")),n}function Ec(o,e){let r=d("div",{class:"spro-col-corpo"},...o.itens.map(s=>yc(s,o.chave,e)));o.itens.length||r.append(d("div",{class:"spro-col-vazia"},o.aceitaSoltar?"Solte aqui":"Vazia"));let t=e.cfg.limite,a=d("div",{class:"spro-col-topo"},d("span",{class:"spro-col-titulo",title:o.titulo},o.titulo),d("span",{class:`spro-col-n${o.excedeu?" spro-excedeu":""}`,title:o.excedeu?`Passou do limite de ${t}`:void 0},t>0?`${o.itens.length}/${t}`:String(o.itens.length)),o.aceitaSoltar?null:d("span",{class:"spro-col-trava",title:o.motivoSomenteLeitura},to("bloquear",13))),n=d("section",{class:`spro-col${o.tom?` spro-tom-${o.tom}`:""}${o.excedeu?" spro-col-cheia":""}`,"data-chave":o.chave},a,r);return n.addEventListener("dragover",s=>{s.dataTransfer?.types.includes(Qr)&&o.aceitaSoltar&&(s.preventDefault(),n.classList.add("spro-alvo"))}),n.addEventListener("dragleave",()=>n.classList.remove("spro-alvo")),n.addEventListener("drop",s=>{n.classList.remove("spro-alvo");let i=s.dataTransfer?.getData(Qr);if(i){s.preventDefault();try{let{id:c,de:l}=JSON.parse(i);e.aoMover(c,l,o.chave)}catch{}}}),n}function zn(o){let e=d("div",{class:"spro-quadro"}),r=t=>d("div",{class:"spro-colunas"},...Tn(t,o.cfg,o.ctx,o.extras).map(a=>Ec(a,o)));if(o.cfg.raiasPorResponsavel&&o.cfg.colunas!=="responsavel")for(let t of ze(o.processos,"responsavel",o.ctx))e.append(d("div",{class:"spro-raia"},d("div",{class:"spro-raia-nome"},t.rotulo,d("span",{class:"spro-grupo-n"},String(t.itens.length))),r(t.itens)));else e.append(r(o.processos));return o.processos.length||e.prepend(d("div",{class:"spro-vazio"},"Nenhum processo corresponde ao filtro.")),e}var _n=".spro-fav-estrela, .spro-prj-ic, .spro-dem-cx",Sc=[".spro-fav-",".spro-prj-",".spro-dem-cx"],qn=(o,e)=>o.getElementById(`P${e}`)?.querySelectorAll("td")[1],Ve=["spro-fav-estrela","spro-prj-ic","spro-dem-cx"],Xr=o=>Ve.find(e=>o.classList.contains(e))??"";function Pc(o,e,r){for(let t of Array.from(o.attributes))!e.hasAttribute(t.name)&&t.name!=="data-spro-id"&&t.name!=="data-tip"&&o.removeAttribute(t.name);for(let t of Array.from(e.attributes))t.name!=="aria-busy"&&t.name!=="title"&&o.getAttribute(t.name)!==t.value&&o.setAttribute(t.name,t.value);e.getAttribute("title")&&o.getAttribute("data-tip")!==e.getAttribute("title")&&o.setAttribute("data-tip",e.getAttribute("title")),o.removeAttribute("aria-busy"),o.setAttribute("data-spro-id",r),o.innerHTML!==e.innerHTML&&o.replaceChildren(...Array.from(e.cloneNode(!0).childNodes))}function Vn(){let o=new Map;return function(r,t){let a=qn(r,t),n=new Set,s=[];if(a){let i=[...a.querySelectorAll(_n)].sort((c,l)=>Ve.indexOf(Xr(c))-Ve.indexOf(Xr(l)));for(let c of i){let l=`${t}|${Xr(c)}`;n.add(l);let m=o.get(l);m?Pc(m,c,t):(m=c.cloneNode(!0),m.removeAttribute("aria-busy"),m.setAttribute("data-spro-id",t),o.set(l,m)),s.push(m)}}for(let i of Ve)n.has(`${t}|${i}`)||o.delete(`${t}|${i}`);return s}}function Kr(o,e){let r=qn(o,e);return r?[...r.querySelectorAll(`${_n}, .acompanhamentoesp_icon`)].map(t=>`${t.className}|${t.getAttribute("aria-pressed")??""}|${t.getAttribute("aria-label")??""}|${t.hasAttribute("data-atraso")?1:0}|${t.querySelector('[class$="-n"]')?.textContent??""}`).join(";"):""}function Hn(o){let e=[];for(let r of Array.from(o.styleSheets??[])){let t;try{t=r.cssRules}catch{continue}for(let a of Array.from(t)){let n=a.cssText;Sc.some(s=>n.includes(s))&&e.push(n)}}return e.join(`
`)}function jn(o,e){let r=s=>s.trim().toLowerCase(),t=new Map;for(let s of e)s.nome.trim()&&!t.has(r(s.nome))&&t.set(r(s.nome),{nome:s.nome.trim(),texto:s.texto.trim().slice(0,250)});let a=new Map(o.map(s=>[r(s.nome),s])),n=[];for(let s of o)t.has(r(s.nome))||n.push({tipo:"remover",nome:s.nome});for(let[s,i]of t)a.has(s)||n.push({tipo:"adicionar",nome:i.nome,texto:i.texto});for(let[s,i]of t){let c=a.get(s);c&&c.texto.trim()!==i.texto&&n.push({tipo:"texto",nome:c.nome,texto:i.texto})}return n}function Fn(o,e,r=()=>""){let t=[...o.marcadores];for(let a of e)a.tipo==="remover"?t=t.filter(n=>n.nome!==a.nome):a.tipo==="adicionar"?t.push({nome:a.nome,cor:r(a.nome),texto:a.texto}):t=t.map(n=>n.nome===a.nome?{...n,texto:a.texto}:n);return{...o,marcadores:t}}function He(o){return o.replace(/\r\n?/g,`
`).trim().slice(0,500)}function Gn(o,e,r,t=""){let a=He(e);if(!a){let{anotacao:n,...s}=o;return s}return{...o,anotacao:{texto:a,autor:o.anotacao?.autor??t,prioridade:r}}}function Un(o,e){if(!e){let{atribuicao:r,...t}=o;return t}return{...o,atribuicao:e}}function je(o,e,r,t,a){let n=new Set([o.id]);if(t)for(let s of e)n.add(s);return r.filter(s=>n.has(s.id)&&a(s))}function Jr(o,e){let r=new Set(e.marcadores.map(t=>t.nome.trim().toLowerCase()));return o.filter(t=>{let a=r.has(t.nome.trim().toLowerCase());return t.tipo==="adicionar"?!a:a})}var wc=30;function Mc(o){let e=[],r=(a,n)=>{let s=a?.getAttribute("data-tarefa");e.push({marca:s==null?null:s==="x",texto:n.replace(/\u00a0/g," ").replace(/\n+$/,"")})},t="";for(let a of Array.from(o.childNodes))if(a.nodeType===3)t+=a.textContent??"";else if(a.nodeType===1){let n=a;if(t){for(let s of t.split(`
`))r(null,s);t=""}n.tagName==="BR"?r(null,""):r(n,n.textContent??"")}if(t)for(let a of t.split(`
`))r(null,a);return e.length?e:[{marca:null,texto:""}]}function Bn(o,e){let r=o.ownerDocument;o.replaceChildren(...e.map(t=>{let a=r.createElement("div");return a.className="spro-pi-linha",t.marca!==null&&a.setAttribute("data-tarefa",t.marca?"x":"o"),t.texto?a.textContent=t.texto:a.append(r.createElement("br")),a}))}function Qn(o,e){let r=o.prioridade,t=()=>{},a=d("div",{class:"spro-pi-editor",contenteditable:"true",role:"textbox","aria-multiline":"true","aria-label":"Anota\xE7\xE3o",spellcheck:"true"}),n=d("span",{class:"spro-pi-contador"}),s=d("button",{type:"button",class:"spro-pi-bt","data-tip":"Lista de tarefas (nas linhas selecionadas)","aria-label":"Lista de tarefas"},z("check",16)),i=d("button",{type:"button",class:"spro-pi-bt","data-tip":"Prioridade","aria-label":"Prioridade"},to("prioridade",16)),c=d("button",{type:"button",class:"spro-pi-bt","data-tip":"Inserir a data de hoje","aria-label":"Inserir a data de hoje"},z("calendario",16)),l=d("div",{class:"spro-pi-barra"},s,c,i,n),m=d("div",{class:"spro-pi"},a,l),g=()=>Mc(a),u=()=>ka(g());function x(){m.classList.toggle("spro-pi-prio",r),i.setAttribute("aria-pressed",String(r));let E=u().length;n.textContent=`${E}/${500}`,n.classList.toggle("spro-pi-estouro",E>500),t()}Bn(a,re(o.texto)),x();function y(){let E=e.getSelection?.()??e.ownerDocument.getSelection?.()??null,b=Array.from(a.children),w=$=>{let R=$;for(;R&&R.parentNode!==a;)R=R.parentNode;return R?b.indexOf(R):-1};if(!E||!E.rangeCount)return[];let h=w(E.anchorNode),P=w(E.focusNode);if(h<0&&P<0)return[];let[L,O]=[Math.min(h<0?P:h,P<0?h:P),Math.max(h,P)];return Array.from({length:O-L+1},($,R)=>L+R)}let M=E=>{Bn(a,E),x()};for(let E of[s,c,i])E.addEventListener("mousedown",b=>b.preventDefault());return s.addEventListener("click",()=>{let E=g(),b=y();M(Ar(E,b.length?b:E.map((w,h)=>h).filter(w=>w===E.length-1))),a.focus()}),i.addEventListener("click",()=>{r=!r,x()}),c.addEventListener("click",()=>{a.focus();let E=co(Vo());e.ownerDocument.execCommand?.("insertText",!1,E)||(a.append(E),x())}),a.addEventListener("input",x),a.addEventListener("paste",E=>{E.preventDefault();let b=E.clipboardData?.getData("text/plain")??"";e.ownerDocument.execCommand?.("insertText",!1,b.replace(/\r\n?/g,`
`))}),a.addEventListener("mousedown",E=>{let b=E.target.closest?.(".spro-pi-linha");!b||!b.hasAttribute("data-tarefa")||E.clientX-b.getBoundingClientRect().left>wc||(E.preventDefault(),M(Oa(g(),Array.from(a.children).indexOf(b))))}),a.addEventListener("keydown",E=>{if(E.key!=="Enter"||E.shiftKey)return;let b=e.getSelection?.()??e.ownerDocument.getSelection?.()??null,w=y(),h=g();b?.isCollapsed&&w.length===1&&h[w[0]]?.marca!==null&&!h[w[0]].texto.trim()&&(E.preventDefault(),M(Ar(h,[w[0]])))}),{el:m,texto:u,prioridade:()=>r,aoMudar:E=>{t=E},foco:()=>{a.focus()}}}var Dc=[[/azul_marinho|marinho/,"#1d3557"],[/azul_claro|ciano|celeste/,"#2a9fd6"],[/azul/,"#2563c9"],[/verde_escuro/,"#166534"],[/verde|lima/,"#2e9e4f"],[/amarelo/,"#e0b000"],[/laranja/,"#ee7d11"],[/vermelho/,"#d1352b"],[/rosa|magenta/,"#d6409f"],[/roxo|violeta|lilas/,"#7048c6"],[/marrom/,"#8a5a3c"],[/preto/,"#222831"],[/cinza/,"#7b838c"]];function ce(o){let e=o.toLowerCase();return Dc.find(([r])=>r.test(e))?.[1]??"#8b939c"}var kc=o=>o instanceof Error?o.message:String(o);async function Wr(o,e,r,t,a){let n=0,s=[],i=0;for(let c of e){let l=o.todos().find(m=>m.id===c.id)??c;o.aplicarLocal(l.id,r(l));try{await o.gravar(()=>t(l)),n+=1}catch(m){o.aplicarLocal(l.id,l),s.push(`${l.protocolo}: ${kc(m)}`)}a?.(i+=1,e.length)}return{ok:n,falhas:s}}function Zr(o,e,r){e.falhas.length?o.aviso(`${r}: ${e.ok} ok, ${e.falhas.length} com erro \u2014 ${e.falhas[0]}`):o.aviso(`${r}: ${e.ok} ${e.ok===1?"processo atualizado":"processos atualizados"}.`)}function Xn(o,e,r){let t=je(e,o.selecionados(),o.todos(),!0,r).filter(n=>n.id!==e.id);if(!t.length)return null;let a=d("input",{type:"checkbox"});return{el:d("label",{class:"spro-rotulo-linha spro-estender"},a,` Aplicar tamb\xE9m aos ${t.length} ${t.length===1?"outro selecionado":"outros selecionados"}`),marcado:()=>a.checked,n:()=>t.length}}var Yr=(...o)=>d("div",{class:"spro-dialogo-rodape"},...o),ot=(o="Salvar")=>d("button",{type:"button",class:"spro-botao primario"},z("check",15),o);function Kn(o,e){let r=[],t=e.atribuicao?.sigla??"",a=wo({rotulo:"Respons\xE1vel",icone:"pessoa",busca:!0,larguraLista:320,vazio:"Escolher o respons\xE1vel\u2026",opcoes:()=>[{valor:"",rotulo:"Sem respons\xE1vel",descricao:"Remove a atribui\xE7\xE3o"},...r.map(m=>({valor:m.sigla,rotulo:m.nome===m.sigla?m.sigla:m.nome,descricao:m.sigla}))],valor:[t],aoMudar:([m])=>{t=m??"",c()}}),n=Xn(o,e,()=>!0),s=ot(),i=d("p",{class:"spro-suave"},"Carregando os usu\xE1rios da unidade\u2026"),c=()=>{s.disabled=!r.length||t===(e.atribuicao?.sigla??"")},l=Bo(o.raiz,{titulo:"Respons\xE1vel",subtitulo:e.protocolo,icone:"pessoa",conteudo:d("div",{class:"spro-form"},d("label",{class:"spro-campo-rotulo"},"Atribuir a",a.el),i,n?.el??null,Yr(s))});o.extras().then(m=>{r=m.responsaveis??[],i.textContent=r.length?"":"N\xE3o foi poss\xEDvel ler os usu\xE1rios da unidade.",a.atualizar(),c()}).catch(()=>{i.textContent="N\xE3o foi poss\xEDvel ler os usu\xE1rios da unidade."}),c(),s.addEventListener("click",async()=>{let m=t?r.find(u=>u.sigla===t)??{sigla:t,nome:t}:null,g=n?.marcado()?je(e,o.selecionados(),o.todos(),!0,()=>!0):[e];s.disabled=!0,l.fechar(),Zr(o,await Wr(o,g,u=>Un(u,m),u=>o.atribuir(u.protocolo,m?.sigla??null)),m?`Respons\xE1vel: ${m.nome}`:"Atribui\xE7\xE3o removida")})}function Jn(o,e){let r=Qn({texto:e.anotacao?.texto??"",prioridade:e.anotacao?.prioridade??!1},o.raiz),t=ot(),a=e.anotacao?d("button",{type:"button",class:"spro-botao perigo"},z("lixeira",15),"Remover anota\xE7\xE3o"):null,n=()=>{let c=He(r.texto()),l=r.texto().length>500;t.disabled=!c||l||c===(e.anotacao?.texto??"")&&r.prioridade()===(e.anotacao?.prioridade??!1)};r.aoMudar(n);let s=Bo(o.raiz,{titulo:"Anota\xE7\xE3o",subtitulo:e.protocolo,icone:"nota",largo:!0,conteudo:d("div",{class:"spro-form"},r.el,e.anotacao?.autor?d("p",{class:"spro-suave"},`\xDAltima edi\xE7\xE3o: ${e.anotacao.autor}`):null,Yr(a,t))});r.foco(),n();let i=async(c,l,m)=>{s.fechar(),Zr(o,await Wr(o,[e],g=>Gn(g,c,l,o.autor),g=>o.anotar(g.protocolo,{texto:c,prioridade:l})),m)};t.addEventListener("click",()=>void i(He(r.texto()),r.prioridade(),"Anota\xE7\xE3o salva")),a?.addEventListener("click",()=>void i("",!1,"Anota\xE7\xE3o removida"))}function Wn(o,e){let r=e.marcadores.map(u=>({nome:u.nome,texto:u.texto})),t=[],a=d("div",{class:"spro-marcadores-lista"}),n=Xn(o,e,u=>!u.sigiloso),s=ot(),i=d("p",{class:"spro-suave"},"Carregando os marcadores da unidade\u2026"),c=wo({rotulo:"Adicionar marcador",icone:"etiqueta",busca:!0,larguraLista:320,vazio:"Adicionar marcador\u2026",opcoes:()=>t.filter(u=>!r.some(x=>x.nome.toLowerCase()===u.toLowerCase())).map(u=>({valor:u,rotulo:u,cor:ce(o.corDoMarcador(u))})),aoMudar:([u])=>{u&&(r=[...r,{nome:u,texto:""}],c.definir([],!1),m())}}),l=()=>jn(e.marcadores,r);function m(){a.replaceChildren(...r.length?r.map((u,x)=>{let y=d("input",{type:"text",class:"spro-campo",maxlength:String(250),placeholder:"Texto do marcador (opcional)","aria-label":`Texto de ${u.nome}`,value:u.texto});return y.addEventListener("input",()=>{r[x]={...u,texto:y.value},s.disabled=!l().length}),d("div",{class:"spro-marcador-linha"},d("span",{class:"spro-marcador",title:u.nome},d("i",{style:`background:${ce(o.corDoMarcador(u.nome))}`}),u.nome),y,d("button",{type:"button",class:"spro-botao-icone pequeno",title:`Remover ${u.nome}`,"aria-label":`Remover ${u.nome}`,onclick:()=>{r=r.filter((M,E)=>E!==x),m()}},z("fechar",13)))}):[d("p",{class:"spro-suave"},"Nenhum marcador. Adicione abaixo.")]),c.atualizar(),s.disabled=!l().length}let g=Bo(o.raiz,{titulo:"Marcadores",subtitulo:e.protocolo,icone:"etiqueta",conteudo:d("div",{class:"spro-form"},a,c.el,i,n?.el??null,Yr(s))});m(),o.extras().then(u=>{t=u.marcadores??[],i.textContent=t.length?"":"N\xE3o foi poss\xEDvel ler os marcadores da unidade.",m()}).catch(()=>{i.textContent="N\xE3o foi poss\xEDvel ler os marcadores da unidade."}),s.addEventListener("click",async()=>{let u=l();if(!u.length)return;let x=n?.marcado()?je(e,o.selecionados(),o.todos(),!0,y=>!y.sigiloso):[e];g.fechar(),Zr(o,await Wr(o,x,y=>Fn(y,Jr(u,y),o.corDoMarcador),async y=>{for(let M of Jr(u,y))M.tipo==="remover"?await o.marcar(y.protocolo,{marcador:M.nome,remover:!0}):await o.marcar(y.protocolo,{marcador:M.nome,texto:M.texto})}),"Marcadores")})}function Zn(o,e,r,t,a=8){let n=Math.max(1,e),s=t>0?t:n*40,i=Math.max(0,Math.min(o,Math.floor(r/n)-a)),c=Math.min(o,Math.ceil((r+s)/n)+a);return{inicio:i,fim:c,antes:i*n,depois:Math.max(0,o-c)*n}}var Ge={compacta:34,confortavel:48},Oc={processo:"minmax(340px, 370px)",tipo:"minmax(120px, 1.2fr)",especificacao:"minmax(200px, 2fr)",responsavel:"minmax(90px, 130px)",marcadores:"minmax(120px, 1.3fr)",prazo:"minmax(120px, 150px)",anotacao:"minmax(130px, 1.4fr)",caixa:"84px",parado:"84px",sinais:"minmax(110px, 150px)"},Lc={processo:"protocolo",tipo:"tipo",responsavel:"responsavel",marcadores:"marcador",prazo:"prazo",caixa:"caixa",parado:"parado",sinais:"novo"};function Ic(o){let e=o.trim().split(/\s+/);return e.length>2?`${e[0]} ${e[e.length-1]}`:o}function Ue(o,e){return d("button",{type:"button",class:"spro-lapis",title:o,"aria-label":o,onclick:r=>{r.preventDefault(),r.stopPropagation(),e()}},z("lapis",13))}var ao=(o,e,r)=>d(o,{class:e},r);function $c(o,e,r,t){let a=ao("div",`spro-c spro-c-${e}`);switch(e){case"processo":{let n=t.icones(o.id),s=m=>n.find(g=>g.classList.contains(m))??d("span",{class:"spro-slot"}),i=o.acompanhamentoEspecial?d("span",{class:"spro-acomp",title:o.acompanhamentoGrupo?`Acompanhamento especial: ${o.acompanhamentoGrupo}`:"Acompanhamento especial"},z("olho",15)):d("span",{class:"spro-slot"});a.append(d("span",{class:"spro-icones"},s("spro-fav-estrela"),s("spro-prj-ic"),s("spro-dem-cx"),i));let c=o.grupo==="recebidos";t.semOrigem||a.append(d("span",{class:`spro-origem spro-origem-${o.grupo}`,title:c?"Processo recebido: veio de outra unidade":"Processo gerado: autuado nesta unidade",role:"img","aria-label":c?"Processo recebido":"Processo gerado"},to(c?"recebido":"gerado",16)));let l=d("a",{class:`spro-proc${o.naoVisualizado?" spro-novo":""}`,href:o.link??"#",title:"Abrir o processo"},o.protocolo);a.append(l),o.link&&a.append(d("a",{class:"spro-nova-guia",href:o.link,target:"_blank",rel:"noopener",title:"Abrir em nova guia","aria-label":`Abrir ${o.protocolo} em nova guia`},to("novaGuia",14))),o.sigiloso&&a.append(d("span",{class:"spro-sigilo",title:"Processo sigiloso"},"sigiloso")),o.urgente&&a.append(d("span",{class:"spro-urgente",title:"Marcado como urgente"},"urgente")),o.trancado&&a.append(d("span",{class:"spro-sigilo",title:"Processo trancado"},"trancado"));break}case"tipo":a.append(ao("span","spro-corta",o.tipo)),a.title=o.tipo;break;case"especificacao":{if(a.classList.add("spro-editavel"),t.editando===o.id){let n=d("input",{type:"text",class:"spro-espec-input",maxlength:"100",value:t.rascunho,"aria-label":"Especifica\xE7\xE3o do processo"});n.addEventListener("input",()=>t.aoDigitarEspec(n.value)),n.addEventListener("keydown",l=>{l.stopPropagation(),l.key==="Enter"?t.aoSalvarEspec(o.id):l.key==="Escape"&&t.aoCancelarEspec()});let s=l=>l.preventDefault(),i=d("button",{type:"button",class:"spro-lapis spro-lapis-ok",title:"Salvar (Enter)","aria-label":"Salvar",onclick:()=>t.aoSalvarEspec(o.id)},z("check",14)),c=d("button",{type:"button",class:"spro-lapis",title:"Cancelar (Esc)","aria-label":"Cancelar",onclick:()=>t.aoCancelarEspec()},z("fechar",14));i.addEventListener("pointerdown",s),c.addEventListener("pointerdown",s),a.append(d("span",{class:"spro-edicao"},n,i,c));break}a.append(ao("span","spro-corta",o.especificacao)),a.title=o.especificacao,o.sigiloso||a.append(Ue("Editar a especifica\xE7\xE3o",()=>t.aoEditarEspec(o.id)));break}case"responsavel":a.classList.add("spro-editavel"),o.atribuicao?(a.append(ao("span","spro-corta",t.nomesCompletos?Ic(o.atribuicao.nome):o.atribuicao.sigla)),a.title=t.nomesCompletos?o.atribuicao.sigla:o.atribuicao.nome):a.append(d("span",{class:"spro-prazo-vazio spro-vazio-edicao"},"atribuir")),a.append(Ue(o.atribuicao?"Mudar o respons\xE1vel":"Atribuir a algu\xE9m",()=>t.aoEditar(o.id,"responsavel")));break;case"marcadores":a.classList.add("spro-editavel"),o.marcadores.length&&a.append(d("span",{class:"spro-pilulas"},...o.marcadores.map(n=>d("span",{class:"spro-marcador",title:n.texto?`${n.nome}: ${n.texto}`:n.nome},d("i",{style:`background:${ce(n.cor)}`}),n.nome)))),o.sigiloso||(o.marcadores.length||a.append(d("span",{class:"spro-prazo-vazio spro-vazio-edicao"},"marcar")),a.append(Ue(o.marcadores.length?"Editar os marcadores":"Adicionar marcador",()=>t.aoEditar(o.id,"marcadores"))));break;case"prazo":{let n=io(o,r);a.classList.add("spro-editavel");let s=n?"Editar o prazo":"Definir um prazo",i=d("button",{type:"button",class:"spro-prazo-b",title:n?`${Fr(o,r)}
${n.dica}

${s}`:s,"aria-label":s,onclick:c=>{c.preventDefault(),c.stopPropagation(),t.aoAbrirPrazo(o.id)}},n?ao("span",`spro-prazo spro-prazo-${n.situacao}`,n.texto):ao("span","spro-prazo-vazio","definir"));a.append(i,d("span",{class:"spro-lapis spro-lapis-fixo","aria-hidden":"true"},z("lapis",13)));break}case"anotacao":a.classList.add("spro-editavel"),o.anotacao?(a.append(ao("span",`spro-corta${o.anotacao.prioridade?" spro-prio":""}`,La(o.anotacao.texto))),a.setAttribute("data-tip-nota",o.anotacao.texto),a.setAttribute("data-tip-autor",o.anotacao.autor)):o.sigiloso||a.append(d("span",{class:"spro-prazo-vazio spro-vazio-edicao"},"anotar")),o.sigiloso||a.append(Ue(o.anotacao?"Editar a anota\xE7\xE3o":"Adicionar anota\xE7\xE3o",()=>t.aoEditar(o.id,"anotacao")));break;case"caixa":{let n=jo(go(o,r));a.append(ao("span","spro-suave",n)),n&&(a.title=rn);break}case"parado":{let n=Mo(o,r);a.append(ao("span","spro-suave",jo(n))),n!==null&&(a.title="Dias desde a \xFAltima movimenta\xE7\xE3o (vis\xE3o detalhada do SEI).");break}case"sinais":for(let n of jr(o))a.append(ao("span","spro-sinal",n));break}return a}function Yn(o){let e=o,r=ao("div","spro-cab"),t=ao("div","spro-corpo"),a=d("div",{class:"spro-rolagem",tabindex:"-1"},t),n=d("div",{class:"spro-tabela",role:"table"},r,a),s="",i=!1,c=!1,l=()=>`36px ${e.colunas.map(b=>Oc[b]).join(" ")}`;function m(){r.replaceChildren(),r.style.gridTemplateColumns=l();let b=e.linhas.filter(P=>P.tipo==="processo").map(P=>P.processo.id),w=b.filter(P=>e.selecionados.has(P)).length,h=d("input",{type:"checkbox",class:"spro-cb","aria-label":"Marcar todos os processos vis\xEDveis",title:"Marcar todos os vis\xEDveis",disabled:!b.length});h.checked=b.length>0&&w===b.length,h.indeterminate=w>0&&w<b.length,h.addEventListener("change",()=>e.aoMarcarGrupo(b,h.checked)),r.append(ao("div","spro-c spro-c-cb")),r.firstElementChild.append(h);for(let P of e.colunas){let L=Lc[P],O=L?e.ordem.findIndex(R=>R.campo===L):-1,$=d("div",{class:`spro-c spro-th${L?" spro-ordenavel":""}`,role:"columnheader",...O>=0?{"aria-sort":e.ordem[O].decrescente?"descending":"ascending"}:{}});if(L){let R=d("button",{type:"button",class:"spro-th-b",title:"Ordenar (Shift acrescenta outro crit\xE9rio)",onclick:S=>e.aoOrdenar(L,S.shiftKey)},Ro[P]);O>=0&&R.append(d("span",{class:"spro-seta-ordem"},`${e.ordem[O].decrescente?"\u2193":"\u2191"}${e.ordem.length>1?O+1:""}`)),$.append(R)}else $.append(Ro[P]);r.append($)}}function g(b,w){let h=e.selecionados.has(b.id),P=d("input",{type:"checkbox",class:"spro-cb","aria-label":`Marcar ${b.protocolo}`,title:b.naPaginaAtual?void 0:`Est\xE1 na p\xE1gina ${b.pagina+1} do SEI: as a\xE7\xF5es do SEI aceitam processos de uma p\xE1gina por vez`});P.checked=h,P.addEventListener("change",()=>e.aoSelecionar(b.id,P.checked));let L=d("div",{class:`spro-linha${h?" spro-sel":""}${e.foco===b.id?" spro-foco":""}${b.urgente?" spro-linha-urgente":""}`,role:"row","data-id":b.id,"data-grupo":w});L.style.gridTemplateColumns=l(),L.style.height=`${Ge[e.densidade]}px`;let O=ao("div","spro-c spro-c-cb");return O.append(P),L.append(O,...e.colunas.map($=>$c(b,$,e.ctx,e))),L}function u(b){let w=b.grupo.itens.map(L=>L.id),h=d("button",{type:"button",class:"spro-grupo-b","aria-expanded":String(!b.recolhido),onclick:()=>e.aoGrupo(b.grupo.chave)},d("span",{class:`spro-grupo-seta${b.recolhido?" spro-fechado":""}`},to("seta",14)),d("span",{class:"spro-grupo-nome"},b.grupo.rotulo),d("span",{class:"spro-grupo-n"},String(b.grupo.itens.length))),P=d("div",{class:`spro-grupo${b.grupo.tom?` spro-tom-${b.grupo.tom}`:""}`,role:"row"},h);if(w.length){let L=w.every(O=>e.selecionados.has(O));P.append(d("button",{type:"button",class:"spro-link",onclick:()=>e.aoMarcarGrupo(w,!L)},L?"Desmarcar grupo":"Marcar grupo"))}return P.style.height=`${Ge[e.densidade]}px`,P}function x(){let b=Ge[e.densidade],w=Zn(e.linhas.length,b,a.scrollTop||0,a.clientHeight||0);t.style.paddingTop=`${w.antes}px`,t.style.paddingBottom=`${w.depois}px`,t.replaceChildren(...e.linhas.slice(w.inicio,w.fim).map(P=>P.tipo==="grupo"?u(P):g(P.processo,P.grupo)));let h=t.querySelector(".spro-espec-input");h&&i?(i=!1,h.focus(),h.setSelectionRange?.(h.value.length,h.value.length)):h&&h.getRootNode()instanceof ShadowRoot&&h.getRootNode().activeElement!==h&&c&&h.focus()}let y=0;a.addEventListener("scroll",()=>{if(y)return;let b=a.ownerDocument.defaultView;if(!b?.requestAnimationFrame)return x();y=b.requestAnimationFrame(()=>{y=0,x()})});function M(b){let w=b.colunas.join()!==e.colunas.join()||b.ordem!==e.ordem||b.selecionados!==e.selecionados;b.editando&&b.editando!==e.editando&&(i=!0),c=!!b.editando,e=b;let h=`${e.colunas.join()}|${e.densidade}`;if((w||h!==s)&&(m(),s=h),!e.linhas.length){t.style.paddingTop=t.style.paddingBottom="0",t.replaceChildren(d("div",{class:"spro-vazio"},"Nenhum processo corresponde ao filtro."));return}x()}function E(b){let w=e.linhas.findIndex(P=>P.tipo==="processo"&&P.processo.id===b);if(w<0)return!1;let h=Ge[e.densidade];return w*h<a.scrollTop?a.scrollTop=w*h:(w+1)*h>a.scrollTop+a.clientHeight&&a.clientHeight>0&&(a.scrollTop=(w+1)*h-a.clientHeight),x(),!0}return M(o),{el:n,atualizar:M,mostrar:E,rolagem:a}}var Tc=[["/","Buscar"],["j / k","Linha seguinte / anterior"],["x","Marcar a linha"],["Enter","Abrir o processo"],["g t","Ver a tabela"],["g q","Ver o quadro"],["Esc","Limpar a busca ou a sele\xE7\xE3o"],["?","Esta ajuda"]],os=o=>o==="grupo:recebidos"?"grupo:gerados":o==="grupo:gerados"?"grupo:recebidos":null,Rc={"resp:eu":"Processos atribu\xEDdos a voc\xEA","grupo:recebidos":"Processos que vieram de outra unidade","grupo:gerados":"Processos autuados nesta unidade","prazo:atrasado":"Prazo vencido e ainda n\xE3o conclu\xEDdo","prazo:semana":"Vencem nos pr\xF3ximos 7 dias","resp:sem":"Processos sem respons\xE1vel","novo:sim":"Ainda n\xE3o abertos nesta unidade","novo:visita":"Chegaram depois da sua \xFAltima visita","parado:>30d":"Sem movimenta\xE7\xE3o h\xE1 mais de 30 dias (vis\xE3o detalhada do SEI)"},Nc=[["Meus","resp:eu",{comum:"pessoa"},""],["Recebidos","grupo:recebidos",{grade:"recebido"},""],["Gerados","grupo:gerados",{grade:"gerado"},""],["Atrasados","prazo:atrasado",{comum:"alerta"},"perigo"],["Vencem na semana","prazo:semana",{comum:"calendario"},"aviso"],["Sem respons\xE1vel","resp:sem",{grade:"semPessoa"},""],["N\xE3o visualizados","novo:sim",{grade:"olhoFechado"},""],["Novos desde a \xFAltima visita","novo:visita",{comum:"brilho"},"novo"],["Parados h\xE1 +30 dias","parado:>30d",{comum:"historico"},""]];function es(o){let{doc:e}=o,r=o.inicial.processos,t=Go(),a=[],n="",s=new Set,i=new Set(Tr(e)),c=null,l={vistoEm:{}},m,g=null,u=!1,x=!1,y="",M={},E=!1,b=!1,w,h=!1,P=xn(o.mover),L=new AbortController,O=()=>({hoje:o.hoje(),agora:o.agora(),...o.eu?{eu:o.eu}:{},...m!==void 0?{visitaAnterior:m}:{},...H?{andamentos:H.dados()}:{}}),$=e.createElement("div");$.id="spro-grade",$.setAttribute("data-spro-grade-host","1"),$.setAttribute("data-tema",o.escuro?"escuro":"claro");let R=$.attachShadow({mode:"open"}),S=e.createElement("style");S.textContent=o.css;let k=d("div",{class:`spro-app${o.escuro?" spro-escuro":""}`}),I=e.createElement("style");R.append(S,I,k);let j=Ta(R),H=o.consultarAndamento?Nn({sombra:R,agora:()=>o.agora(),armazem:o.armazem,consultar:(p,f)=>o.consultarAndamento(p,f),processos:()=>r,aoMudar:()=>Z(),aviso:p=>W(p),simultaneas:o.andamentoSimultaneas,pausaMs:o.andamentoPausaMs,semDebounce:o.semDebounce}):null,N=d("input",{type:"search",class:"spro-busca",placeholder:"Buscar: texto, resp:ana, prazo:<7d, marcador:urgente...","aria-label":"Buscar processos",spellcheck:"false",autocomplete:"off"}),G=d("div",{class:"spro-chips"}),zo=d("div",{class:"spro-rapidos"}),po=d("div",{class:"spro-status",role:"status","aria-live":"polite"}),So=d("div",{class:"spro-lote",hidden:!0}),de=d("div",{class:"spro-conteudo"}),Po=d("div",{class:"spro-painel",hidden:!0}),tt=d("div",{class:"spro-avisos","aria-live":"polite"}),Ko=d("div",{class:"spro-ajuda-atalhos",hidden:!0},d("strong",{},"Atalhos"),...Tc.map(([p,f])=>d("div",{},d("kbd",{},p),` ${f}`))),is=[["protocolo","N\xFAmero do processo"],["prazo","Prazo"],["tipo","Tipo"],["responsavel","Respons\xE1vel"],["marcador","Marcador"],["caixa","Tempo na caixa"],["parado","Parado h\xE1"],["novo","N\xE3o visualizados"]],Ke=wo({rotulo:"Agrupar por",icone:"camadas",classe:"spro-combo-compacto",busca:!1,vazio:"Sem agrupamento",opcoes:Object.keys(Vr).filter(p=>H||!ie(p)).map(p=>({valor:p,rotulo:p==="nenhum"?"Sem agrupamento":`Agrupar: ${Vr[p]}`,...ie(p)?{descricao:"Consulta o andamento de cada processo"}:{}})),valor:["nenhum"],aoMudar:([p])=>{let f=p??"nenhum",A=t.agrupar;B({agrupar:f}),H&&ie(f)&&H.aoEscolherAgrupamento().then(v=>{!v&&t.agrupar===f&&B({agrupar:A})})}}),at=wo({rotulo:"Ordenar por",icone:"ordenar",classe:"spro-combo-compacto",busca:!1,vazio:"Ordem do SEI",opcoes:[{valor:"",rotulo:"Ordem do SEI"},...is.flatMap(([p,f])=>[{valor:`${p}:a`,rotulo:`${f} \u2191`,descricao:"Crescente"},{valor:`${p}:d`,rotulo:`${f} \u2193`,descricao:"Decrescente"}])],valor:[""],aoMudar:([p])=>{let[f,A]=(p??"").split(":");B({ordem:f?[{campo:f,decrescente:A==="d"}]:[]})}}),pe=Hr([],O()),Je=(p,f,A,v,C)=>{let T=wo({rotulo:p,vazio:f,icone:v,classe:"spro-combo-compacto",busca:!0,larguraLista:260,opcoes:()=>C().map(V=>({valor:V.valor,rotulo:V.rotulo,contagem:V.n})),aoMudar:([V])=>{V&&(B({busca:wn(t.busca,A,V)}),N.value=t.busca,T.definir([],!1))}});return T},nt=Je("Filtrar por respons\xE1vel","Respons\xE1vel\u2026","resp","pessoa",()=>pe.responsaveis),st=Je("Filtrar por tipo","Tipo\u2026","tipo","documento",()=>pe.tipos),it=Je("Filtrar por marcador","Marcador\u2026","marcador","etiqueta",()=>pe.marcadores),ct=(p,f)=>d("button",{type:"button",class:"spro-seg-b","data-modo":p,title:f,onclick:()=>B({modo:p})},to(p==="tabela"?"lista":"quadro",16),d("span",{},f)),lt=d("div",{class:"spro-seg",role:"group","aria-label":"Modo de exibi\xE7\xE3o"},ct("tabela","Tabela"),ct("quadro","Quadro")),ue=(p,f,A,v="")=>d("button",{type:"button",class:`spro-bt ${v}`.trim(),title:f,"aria-label":f,onclick:A},to(p,16),d("span",{},f)),dt=ue("colunas","Colunas",()=>qo("colunas")),cs=ue("disquete","Vis\xF5es",()=>qo("visoes")),ls=ue("lista","Exportar CSV",()=>xs()),ds=d("button",{type:"button",class:"spro-bt spro-bt-icone",title:"Atalhos de teclado (?)","aria-label":"Atalhos de teclado",onclick:()=>{Ko.hidden=!Ko.hidden}},"?"),pt=ue("densidade","Densidade",()=>B({densidade:t.densidade==="compacta"?"confortavel":"compacta"})),me=d("div",{class:"spro-quadro-cfg",hidden:!0});k.append(d("div",{class:"spro-barra"},lt,d("div",{class:"spro-busca-caixa"},N),Ke.el,at.el,dt,pt,cs,ls,ds),G,d("div",{class:"spro-faixa"},zo,nt.el,st.el,it.el),me,Ko,Po,po,...H?[H.faixa]:[],So,de,tt);let ut=()=>en(r,l),Jo="",Wo=()=>Pn(ut(),`${t.busca} ${Jo}`.trim(),O()),We=()=>In(Wo(),t.ordem,O());function B(p){t={...t,...p},p.busca===void 0?o.armazem.gravarVisao(t).catch(()=>{}):ps(),Z()}let Ze;function ps(){clearTimeout(Ze),Ze=setTimeout(()=>void o.armazem.gravarVisao(t).catch(()=>{}),400)}function W(p,f){let A=d("div",{class:"spro-aviso",role:"status"},d("span",{},p));f&&A.append(d("button",{type:"button",class:"spro-link",onclick:()=>{f.fazer(),A.remove()}},f.rotulo)),A.append(d("button",{type:"button",class:"spro-aviso-x","aria-label":"Fechar aviso",onclick:()=>A.remove()},"\xD7")),tt.append(A),setTimeout(()=>A.remove(),f?9e3:6e3).unref?.()}function _o(p,f){let A=new Set(i);for(let v of p)f?A.add(v):A.delete(v);i=A,gn(e,A),tr(),uo()}let fe=new Map;function ko(p,f){let A=r.find(v=>v.id===p);if(A){let v=fe.get(p)??{};for(let C of new Set([...Object.keys(A),...Object.keys(f)]))JSON.stringify(A[C])!==JSON.stringify(f[C])&&(v[C]=f[C]);fe.set(p,v)}r=r.map(v=>v.id===p?f:v)}let mt=Promise.resolve();function us(p){Oo+=1;let f=mt.then(p,p);return mt=f.catch(()=>{}).finally(()=>{Oo-=1}),f}let Ye=null,or={raiz:R,extras:()=>(Ye??=(o.extras?o.extras().then(p=>(M=p,p)):Promise.resolve({})).catch(p=>{throw Ye=null,p}),Ye),todos:()=>r,selecionados:()=>i,corDoMarcador:p=>r.flatMap(f=>f.marcadores).find(f=>f.nome===p)?.cor??"",autor:o.eu??"",aplicarLocal:(p,f)=>{ko(p,f),Z()},gravar:us,atribuir:(p,f)=>o.mover.atribuir(p,f),marcar:(p,f)=>o.mover.marcador(p,f),anotar:(p,f)=>o.anotar(p,f),aviso:p=>W(p)};async function ms(p,f,A){let v=r.find(Q=>Q.id===p);if(!v)return;let C=Rn(t.quadro.colunas,v,f,A);if(!C.ok)return W(C.motivo);let T=Object.fromEntries((M.responsaveis??[]).map(Q=>[Q.sigla,Q.nome]));ko(p,Br(v,C.movimento,T)),Z(),Oo+=1;let V=await P.mover(C.movimento).finally(()=>{Oo-=1});if(!b){if(!V.ok)return ko(p,v),Z(),W(`N\xE3o foi poss\xEDvel mover ${v.protocolo}: ${V.erro}`);W(`${v.protocolo} movido.`,{rotulo:"Desfazer",fazer:()=>{let Q=r.find(no=>no.id===p)??v;ko(p,Br(Q,V.desfazer,T)),Z(),P.mover(V.desfazer).then(no=>{no.ok||b||(ko(p,Q),Z(),W(`N\xE3o foi poss\xEDvel desfazer: ${no.erro}`))})}})}}let fs=Vn(),er=new Map([[Io("recebidos",0),o.inicial.selecoes.recebidos],[Io("gerados",0),o.inicial.selecoes.gerados],[Io("detalhado",0),o.inicial.selecoes.detalhado]]),rr=o.inicial.visao==="detalhada";function gs(p){let f=r.filter(C=>i.has(C.id)),A=Ma(p);if(A?.requerSelecao&&!f.length)return W("Marque ao menos um processo.");if(A&&!A.aceitaSigiloso&&wa(f))return W("Opera\xE7\xE3o n\xE3o aplic\xE1vel em processo sigiloso.");let v=Sa(f,er,rr?"detalhada":"resumida");if(!v.ok)return W(v.motivo);if(v.plano.todosNaPaginaAtual||!A){let C=bn(p,f.length);!C.ok&&C.motivo&&W(C.motivo);return}try{o.enviarAcao(A.url,v.plano)}catch(C){W(`N\xE3o foi poss\xEDvel enviar a a\xE7\xE3o: ${C instanceof Error?C.message:String(C)}`)}}let Oo=0,ge=null,he="",ft=!1,gt=p=>({linhas:p,colunas:t.colunas,densidade:t.densidade,ctx:O(),ordem:t.ordem,selecionados:i,foco:c,icones:f=>fs(e,f),nomesCompletos:ft,editando:ge,rascunho:he,semOrigem:rr,aoOrdenar:(f,A)=>B({ordem:$n(t.ordem,f,A)}),aoSelecionar:(f,A)=>_o([f],A),aoGrupo:f=>{let A=new Set(s);A.has(f)?A.delete(f):A.add(f),s=A,o.armazem.gravarRecolhidos([...A]).catch(()=>{}),uo()},aoMarcarGrupo:(f,A)=>_o(f,A),aoEditarEspec:f=>{ge=f,he=r.find(A=>A.id===f)?.especificacao??"",uo()},aoDigitarEspec:f=>{he=f},aoCancelarEspec:()=>{ge=null,uo()},aoSalvarEspec:f=>void hs(f),aoAbrirPrazo:f=>o.abrirPrazo(f),aoEditar:(f,A)=>{let v=r.find(C=>C.id===f);v&&(A==="responsavel"?Kn(or,v):A==="anotacao"?Jn(or,v):Wn(or,v))}}),be=Yn(gt([]));async function hs(p){let f=r.find(v=>v.id===p),A=he.trim();if(ge=null,!f||A===f.especificacao.trim())return uo();if(!A)return W("A especifica\xE7\xE3o n\xE3o pode ficar vazia."),uo();ko(p,{...f,especificacao:A}),Z(),Oo+=1;try{await o.editarEspecificacao(f.protocolo,A),W(`Especifica\xE7\xE3o de ${f.protocolo} salva.`)}catch(v){ko(p,f),Z(),W(`N\xE3o foi poss\xEDvel salvar a especifica\xE7\xE3o: ${v instanceof Error?v.message:String(v)}`)}finally{Oo-=1}}function uo(){let p=We();if(t.modo==="quadro"){de.replaceChildren(zn({processos:p,cfg:t.quadro,ctx:O(),extras:M,selecionados:i,aoMover:(A,v,C)=>void ms(A,v,C),aoSelecionar:(A,v)=>_o([A],v)}));return}let f=ze(p,t.agrupar,O());be.atualizar(gt(kn(f,s,t.agrupar!=="nenhum"))),de.firstElementChild!==be.el&&de.replaceChildren(be.el)}function ht(p){let f=[`${p} de ${r.length} processo${r.length===1?"":"s"}`];Jo&&f.push(`filtro da pesquisa r\xE1pida: ${Jo}`);let A=o.inicial.totais.recebidos+o.inicial.totais.gerados;u&&g?f.push(`carregando ${g.grupo} (${g.paginasLidas}/${g.paginasTotal})\u2026`):!x&&A>r.length&&f.push(`o SEI informa ${A}; os demais n\xE3o foram carregados`),y&&f.push(`aviso: ${y}`),po.replaceChildren(f.join(" \xB7 ")),po.classList.toggle("spro-status-alerta",!!y||!x&&!u&&A>r.length)}function tr(){let p=i.size;if(So.hidden=p===0,!p)return So.replaceChildren();let f=new Set(Wo().map(v=>v.id)),A=[...i].filter(v=>!f.has(v)).length;So.replaceChildren(d("strong",{},`${p} selecionado${p===1?"":"s"}`),...A?[d("span",{class:"spro-suave"},`(${A} fora do filtro atual)`)]:[],...o.acoes().map(v=>d("button",{type:"button",class:"spro-bt",title:v.rotulo,onclick:()=>gs(v)},d("img",{src:v.icone,alt:"",width:"16",height:"16"}),d("span",{},v.rotulo))),d("button",{type:"button",class:"spro-link",onclick:()=>_o([...i],!1)},"Limpar sele\xE7\xE3o"))}function bs(){let p=qr(t.busca);G.replaceChildren(...p.tokens.map(A=>d("span",{class:`spro-chip${A.termo.negado?" spro-chip-neg":""}`},A.texto,d("button",{type:"button","aria-label":`Remover ${A.texto}`,onclick:()=>{B({busca:Ne(t.busca,A.texto)}),N.value=t.busca}},"\xD7")))),G.hidden=!p.tokens.length;let f=new Set(p.tokens.map(A=>A.texto));zo.replaceChildren(...Nc.filter(([,A])=>!(rr&&A.startsWith("grupo:"))).map(([A,v,C,T])=>d("button",{type:"button","data-tip":`${A}
${Rc[v]??""}
Busca: ${v}${f.has(v)?`
Clique para desligar`:""}`,"aria-label":A,class:`spro-rapido${T?` spro-rapido-${T}`:""}${f.has(v)?" spro-rapido-on":""}`,"aria-pressed":String(f.has(v)),onclick:()=>{B({busca:f.has(v)?Ne(t.busca,v):`${os(v)?Ne(t.busca,os(v)):t.busca} ${v}`.trim()}),N.value=t.busca}},"comum"in C?z(C.comum,14,e):to(C.grade,14,e),d("span",{class:"spro-rapido-rotulo"},A)))),bt()}let Ao=$.shadowRoot.querySelector(".spro-faixa");function bt(){b||(Ao.classList.remove("spro-faixa-c1","spro-faixa-c2"),Ao.clientWidth&&(Ao.scrollWidth>Ao.clientWidth+1&&Ao.classList.add("spro-faixa-c1"),Ao.scrollWidth>Ao.clientWidth+1&&Ao.classList.add("spro-faixa-c2")))}let vt=e.defaultView?.ResizeObserver,xt=vt?new vt(()=>bt()):null;xt?.observe(Ao);function Z(){if(b)return;pe=Hr(ut(),O());for(let f of[nt,st,it])f.atualizar();Ke.definir([t.agrupar],!1),Ke.el.disabled=t.modo==="quadro",at.definir([t.ordem[0]?`${t.ordem[0].campo}:${t.ordem[0].decrescente?"d":"a"}`:""],!1);for(let f of lt.querySelectorAll("[data-modo]"))f.setAttribute("aria-pressed",String(f.getAttribute("data-modo")===t.modo));pt.title=t.densidade==="compacta"?"Linhas confort\xE1veis":"Linhas compactas",dt.hidden=t.modo==="quadro",vs(),bs(),H?.definirAtivo(ie(t.agrupar)&&t.modo==="tabela"),uo(),ht(Wo().length),tr(),t.modo==="quadro"&&!E&&o.extras&&(E=!0,o.extras().then(f=>{M=f,b||uo()}).catch(()=>{}))}function vs(){if(me.hidden=t.modo!=="quadro",me.hidden)return;let p=t.quadro,f=wo({rotulo:"Colunas do quadro",icone:"mapa",classe:"spro-combo-compacto",busca:!1,opcoes:[{valor:"marcador",rotulo:"Colunas: marcador"},{valor:"responsavel",rotulo:"Colunas: respons\xE1vel"},{valor:"prazo",rotulo:"Colunas: prazo (leitura)"},{valor:"tipo",rotulo:"Colunas: tipo (leitura)"}],valor:[p.colunas],aoMudar:([C])=>{E=!1,B({quadro:{...p,colunas:C??"marcador"}})}}),A=d("input",{type:"number",min:"0",max:"99",class:"spro-num",value:String(p.limite),"aria-label":"Limite de cart\xF5es por coluna (0 = sem limite)",title:"Limite de cart\xF5es por coluna (0 = sem limite)",onchange:C=>B({quadro:{...p,limite:Math.max(0,Math.min(99,Number(C.target.value)||0))}})}),v=d("input",{type:"checkbox",onchange:C=>B({quadro:{...p,raiasPorResponsavel:C.target.checked}})});v.checked=p.raiasPorResponsavel,me.replaceChildren(f.el,d("label",{class:"spro-rotulo-inline"},"Limite ",A),d("label",{class:"spro-rotulo-inline"},v," Raias por respons\xE1vel"),d("span",{class:"spro-suave"},p.colunas==="marcador"||p.colunas==="responsavel"?"Arraste os cart\xF5es entre as colunas.":"Esta divis\xE3o \xE9 s\xF3 de leitura."))}function qo(p){if(!Po.hidden&&Po.getAttribute("data-qual")===p){Po.hidden=!0;return}if(Po.setAttribute("data-qual",p),Po.hidden=!1,p==="colunas"){Po.replaceChildren(d("strong",{},"Colunas"),...Fo.map(T=>{let V=d("input",{type:"checkbox",disabled:T==="processo"});return V.checked=t.colunas.includes(T),V.addEventListener("change",()=>{let Q=V.checked?Fo.filter(no=>no===T||t.colunas.includes(no)):t.colunas.filter(no=>no!==T);B({colunas:Q})}),d("label",{class:"spro-rotulo-linha"},V,` ${Ro[T]}`)}),d("button",{type:"button",class:"spro-link",onclick:()=>B({colunas:Go().colunas})},"Restaurar padr\xE3o"));return}let f=d("input",{type:"text",class:"spro-nome",maxlength:"40",placeholder:"Nome da vis\xE3o","aria-label":"Nome da vis\xE3o"}),A=a.find(T=>T.id===n);f.value=A?.nome??"";let v=async(T,V=a)=>{a=T,await o.armazem.gravarVisoes(T,V).catch(()=>W("N\xE3o foi poss\xEDvel sincronizar as vis\xF5es."))},C=async T=>{let V={...t,nome:f.value.trim()||"Minha vis\xE3o",id:T==="atualizar"?n:""},Q=tn(a,V,o.novoId);if(!Q)return W("Limite de vis\xF5es salvas atingido.");n=Q.visao.id,await v(Q.lista),W(`Vis\xE3o "${Q.visao.nome}" salva.`),qo("visoes"),qo("visoes")};Po.replaceChildren(d("strong",{},"Vis\xF5es salvas"),a.length?d("ul",{class:"spro-lista-visoes"},...a.map(T=>d("li",{},d("button",{type:"button",class:`spro-link${T.id===n?" spro-ativa":""}`,onclick:()=>{n=T.id,N.value=T.busca,B({...T,id:""})}},T.nome),d("button",{type:"button",class:"spro-aviso-x","aria-label":`Excluir ${T.nome}`,title:"Excluir",onclick:async()=>{await v(an(a,T.id),a),n===T.id&&(n=""),qo("visoes"),qo("visoes")}},"\xD7")))):d("p",{class:"spro-suave"},"Nenhuma vis\xE3o salva ainda."),d("div",{class:"spro-linha-form"},f,d("button",{type:"button",class:"spro-bt",onclick:()=>void C("nova")},"Salvar como nova"),A&&nn(t,A)?d("button",{type:"button",class:"spro-bt",onclick:()=>void C("atualizar")},"Atualizar"):null))}function xs(){let p=Dn(We(),t.modo==="quadro"?[...Fo]:t.colunas,O());o.baixar(Cn(o.hoje()),ln(p),"text/csv;charset=utf-8"),W(`${p.length-1} processos exportados.`)}N.addEventListener("input",()=>{let p=N.value;if(o.semDebounce)return B({busca:p});clearTimeout(w),w=setTimeout(()=>B({busca:p}),120)}),N.addEventListener("keydown",p=>{p.key==="Escape"&&(N.value="",B({busca:""}),N.blur())});function At(p){if(b||p.ctrlKey||p.metaKey||p.altKey)return;let f=p.target;if(f&&(/^(input|textarea|select)$/i.test(f.tagName)||f.isContentEditable)||$.hidden)return;let v=p.key;if(h){h=!1,v==="t"?B({modo:"tabela"}):v==="q"&&B({modo:"quadro"});return}let C=We().map(V=>V.id),T=c?C.indexOf(c):-1;if(v==="/")p.preventDefault(),N.focus();else if(v==="?")Ko.hidden=!Ko.hidden;else if(v==="g")h=!0;else if(v==="Escape")i.size&&_o([...i],!1);else if((v==="j"||v==="k")&&t.modo==="tabela"&&C.length)c=C[Math.max(0,Math.min(C.length-1,T+(v==="j"?1:-1)))],uo(),be.mostrar(c);else if(v==="x"&&c)r.find(Q=>Q.id===c)&&_o([c],!i.has(c));else if(v==="Enter"&&c){let V=r.find(Q=>Q.id===c)?.link;V&&e.defaultView?.location.assign(V)}}e.addEventListener("keydown",At);let As=hn(e,p=>{i=p,tr(),uo()}),ys=o.armazem.aoMudarVisoes(()=>void o.armazem.lerVisoes().then(p=>{a=p}).catch(()=>{})),ar=new Map;function nr(){if(b||Oo>0)return;let p=Ho(e),f=new Map(p.processos.map(v=>[v.id,v])),A=!1;r=r.map(v=>{if(!v.naPaginaAtual)return v;let C=f.get(v.id);if(!C)return v;let T=fe.get(v.id),V=Kr(e,v.id),Q=ar.get(v.id);ar.set(v.id,V);let no=C;if(T){for(let lr of Object.keys(T))JSON.stringify(C[lr])===JSON.stringify(T[lr])&&delete T[lr];Object.keys(T).length?no={...C,...T}:fe.delete(v.id)}let Pt=JSON.stringify(no)===JSON.stringify(v);return Pt&&Q===V?v:(A=!0,Pt?v:no)}),A&&(cr(),Z())}let sr,yt=e.defaultView?.MutationObserver,ir=yt?new yt(()=>{clearTimeout(sr),sr=setTimeout(nr,o.semDebounce?0:150)}):null,Et=e.querySelector("#frmProcedimentoControlar")??e.body;ir&&Et&&ir.observe(Et,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["aria-pressed","aria-label","onmouseover","src","href","class"]});function cr(){let p=Hn(e);I.textContent!==p&&(I.textContent=p)}async function Es(){if(!o.fonte)return x=!0,St(!0);u=!0,Z();let p=()=>o.fonte?.restaurarAoSair?.();e.defaultView?.addEventListener("pagehide",p);let f=await Ja(o.inicial,o.fonte,{sinal:L.signal,aoProgresso:A=>{g=A,ht(Wo().length)},aoSelecao:(A,v,C)=>{er.set(Io(A,v),C)},aoPagina:A=>{r=[...r,...A],Z()}});e.defaultView?.removeEventListener("pagehide",p),u=!1,x=f.completo,f.erro&&(y=f.erro),St(f.completo)}function St(p){l=Lr(l,r.map(f=>f.id),o.agora(),p),o.armazem.gravarIdade(l).catch(()=>{}),Z()}async function Ss(){try{let p=await o.armazem.lerEstado();t=p.visao,s=new Set(p.recolhidos),l=on(p.idade,o.agora()),m=l.visitaAnterior,a=await o.armazem.lerVisoes()}catch{}l=Lr(l,r.map(p=>p.id),o.agora(),!1),H&&await H.carregar(),N.value=t.busca,cr();for(let[p]of r.map(f=>[f.id]))ar.set(p,Kr(e,p));Z(),Es();for(let p of[1200,3500])setTimeout(()=>{cr(),nr()},p).unref?.()}return{host:$,iniciar:Ss,render:Z,estado:()=>({visao:t,todos:r,selecionados:i,completo:x,carregando:u,filtrados:Wo().length}),definirVisao:p=>{t={...t,...p},N.value=t.busca,Z()},fechar(){b=!0,L.abort(),H?.fechar(),clearTimeout(w),clearTimeout(Ze),clearTimeout(sr),ir?.disconnect(),xt?.disconnect(),j(),e.removeEventListener("keydown",At),As(),ys(),$.remove()},mostrar:p=>{$.hidden=!p},definirTema:p=>{$.setAttribute("data-tema",p?"escuro":"claro"),k.classList.toggle("spro-escuro",p)},definirNomesCompletos:p=>{ft=p,Z()},definirFiltroExterno:p=>{let f=p.trim();f!==Jo&&(Jo=f,Z())},sincronizar:nr,registrarSelecaoParaTeste:(p,f,A)=>void er.set(Io(p,f),A)}}var rs=`/* Dentro do Shadow DOM: o base.css do sei-comum (tokens) vem antes deste arquivo. */
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
.spro-faixa { display: flex; flex-wrap: nowrap; gap: 6px; align-items: center; margin-bottom: 8px; overflow: hidden; }
.spro-rapidos { display: flex; flex: none; flex-wrap: nowrap; gap: 6px; }
.spro-faixa .spro-rapido { flex: none; white-space: nowrap; }
.spro-faixa .spro-combo-compacto { flex: none; }
/* Sem espaco: os filtros rapidos viram so icone (o nome fica na dica). */
/* Os tres primeiros (Meus, Recebidos, Gerados) mantem o rotulo sempre. */
.spro-faixa-c1 .spro-rapido:nth-child(n+4) .spro-rapido-rotulo { display: none; }
.spro-faixa-c1 .spro-rapido:nth-child(n+4) { width: 30px; padding: 0; justify-content: center; }
/* Ainda sem espaco: os seletores encolhem e cortam o texto com reticencias. */
.spro-faixa-c2 .spro-combo-compacto { flex: 0 1 auto; min-width: 74px; }
.spro-faixa-c2 .spro-combo-compacto .spro-combo-texto { min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
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
/* Marcadores: as p\xEDlulas quebram dentro de .spro-pilulas; o l\xE1pis nunca desce para a linha de baixo. */
.spro-c-marcadores { flex-wrap: nowrap; }
.spro-corta { display: block; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.spro-proc { font-weight: 600; white-space: nowrap; }
.spro-novo { font-weight: 800; color: var(--spro-perigo); }
.spro-novo:hover { color: var(--spro-perigo); }
.spro-novo::before { content: ""; display: inline-block; width: 7px; height: 7px; margin-right: 5px; background: var(--spro-perigo); border-radius: 50%; }
.spro-sigilo { margin-left: 6px; padding: 0 5px; font-size: 11px; color: var(--spro-perigo); border: 1px solid currentColor; border-radius: 99px; }
.spro-pilulas { display: flex; flex: 0 1 auto; flex-wrap: wrap; gap: 4px; align-items: center; min-width: 0; }
.spro-marcador { display: inline-flex; gap: 4px; align-items: center; max-width: 100%; box-sizing: border-box; height: 20px; padding: 0 7px; overflow: hidden; font-size: 12px; text-overflow: ellipsis; white-space: nowrap; background: var(--spro-fundo-3); border-radius: 99px; }
.spro-marcador i { flex: none; width: 8px; height: 8px; border-radius: 50%; }
.spro-prazo { display: inline-flex; align-items: center; box-sizing: border-box; height: 20px; padding: 0 7px; font-size: 12px; white-space: nowrap; border-radius: 99px; background: var(--spro-fundo-3); }
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
.spro-icones > * { box-sizing: border-box; flex: 0 0 22px; width: 22px; min-width: 0; max-width: 22px; height: 24px; padding: 0 !important; margin: 0 !important; }
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
.spro-linha:hover .spro-vazio-edicao { opacity: 1; }

/* ---- Origem do processo e abrir em nova guia ---- */
.spro-origem { display: inline-flex; flex: none; align-items: center; justify-content: center; width: 22px; height: 24px; margin-right: 4px; color: var(--spro-suave); }
.spro-origem-recebidos { color: var(--spro-destaque); }
.spro-origem-gerados { color: var(--spro-ok); }
.spro-nova-guia { display: inline-flex; flex: none; align-items: center; justify-content: center; width: 22px; height: 22px; margin-left: 4px; color: var(--spro-suave); border-radius: 6px; opacity: 0; transition: opacity var(--spro-dur); }
.spro-linha:hover .spro-nova-guia, .spro-nova-guia:focus-visible { opacity: 1; }
.spro-nova-guia:hover { color: var(--spro-destaque); background: var(--spro-fundo-3); text-decoration: none; }

/* ---- Anotacao em post-it com lista de tarefas ---- */
.spro-dialogo-largo { width: min(640px, 94vw); }
.spro-dialogo-largo .spro-form { min-width: 0; }
.spro-pi { position: relative; display: flex; flex-direction: column; border-radius: 3px; background: linear-gradient(rgb(249, 239, 175), rgb(247, 233, 141)); box-shadow: rgb(0 0 0 / 14%) 0 4px 8px; transition: background 300ms linear; }
.spro-pi-prio { background: linear-gradient(rgb(253, 221, 221), rgb(250, 194, 195)); }
.spro-pi-prio::after { content: "!"; position: absolute; top: 6px; right: 20px; font: 700 54px/1 var(--spro-fonte); color: #e46f642d; pointer-events: none; }
.spro-pi-editor { min-height: 170px; max-height: 46vh; padding: 20px 34px 16px; overflow-y: auto; outline: none; font-size: 14.5px; line-height: 1.55; color: rgb(97, 97, 97); word-break: break-word; white-space: pre-wrap; }
.spro-pi-linha { position: relative; min-height: 1.55em; }
.spro-pi-linha[data-tarefa] { padding-left: 30px; }
.spro-pi-linha[data-tarefa]::before { content: ""; position: absolute; left: 2px; top: 0.28em; width: 16px; height: 16px; box-sizing: border-box; cursor: pointer; border: 1.8px solid rgb(120, 110, 60); border-radius: 4px; background: rgb(255 255 255 / 55%); }
.spro-pi-linha[data-tarefa="x"] { text-decoration: line-through; opacity: 0.8; }
.spro-pi-linha[data-tarefa="x"]::before { content: "\\2713"; text-align: center; font: 700 13px/13px system-ui; color: #fff; background: #4a8f5a; border-color: #4a8f5a; }
.spro-pi-barra { display: flex; gap: 4px; align-items: center; padding: 6px 12px 10px 28px; }
.spro-pi-bt { display: inline-flex; align-items: center; justify-content: center; width: 28px; height: 28px; padding: 0; cursor: pointer; color: #4285f4; background: none; border: 0; border-radius: 6px; }
.spro-pi-bt:hover { background: rgb(0 0 0 / 7%); }
.spro-pi-bt[aria-pressed="true"] { color: #e46e64; background: rgb(228 110 100 / 14%); }
.spro-pi-contador { margin-left: auto; font-size: 11px; color: #666; }
.spro-pi-estouro { color: var(--spro-perigo); font-weight: 700; }
.spro-escuro .spro-pi-editor { color: #4b4b4b; }

/* ---- Consulta do andamento (agrupar por data de recebimento, envio, autuacao e unidade de envio) ---- */
.spro-andamento { display: flex; flex-wrap: wrap; gap: 10px; align-items: center; margin: 0 0 8px; padding: 6px 10px; font-size: 12px; color: var(--spro-suave); background: var(--spro-fundo-2); border: 1px solid var(--spro-borda); border-radius: var(--spro-raio); }
.spro-andamento[hidden] { display: none; }
.spro-andamento progress { flex: 1 1 120px; max-width: 260px; height: 8px; accent-color: var(--spro-destaque); }
.spro-andamento .spro-link { display: inline-flex; gap: 4px; align-items: center; }
.spro-confirma-andamento p { margin: 0 0 10px; line-height: 1.45; }
.spro-confirma-andamento ul { margin: 0 0 10px 18px; padding: 0; }
.spro-confirma-andamento .spro-dialogo-rodape { margin-top: 14px; }
`;var ts=`/* Na p\xE1gina do SEI (fora do Shadow DOM): o bot\xE3o alternador e o espa\xE7o da grade. */
/* Mesmo tamanho, margem e cor dos botoes vizinhos da barra de titulo (seta de recolher e ordenar os paineis). */
.spro-grade-botao { display: inline-flex; flex: none; align-items: center; justify-content: center; margin-left: 4px; padding: 2px; line-height: 0; color: inherit; vertical-align: middle; position: relative; top: -3px; cursor: pointer; background: none; border: 0; border-radius: 6px; }
.spro-grade-botao:hover { background: color-mix(in srgb, currentColor 14%, transparent); }
.spro-grade-botao[aria-pressed="true"] { background: color-mix(in srgb, currentColor 9%, transparent); }
.spro-grade-botao:focus-visible { outline: 2px solid #1f5fbf; outline-offset: 1px; }
/* Com a grade ativa a barra de acoes sobe um pouco e ganha respiro antes da barra de ferramentas da grade. */
html[data-spro-grade] #collapseControle { margin-top: -6px; margin-bottom: 22px; }
#spro-grade { display: block; width: 100%; flex: 0 0 100%; }
#spro-grade[hidden], #spro-grade[data-spro-recolhido] { display: none !important; }

/* A seta de recolher (do legado) e os outros botoes da barra de titulo ficam na mesma linha de centro. */
#divInfraBarraLocalizacao:has(.spro-grade-botao) .spro-fav-recolher { vertical-align: middle; position: relative; top: -3px; }
`;var qc="gradecontrole",as="data-spro-pesquisa-rapida";function Vc(){return new URL(location.href).searchParams.get("acao")==="procedimento_controlar"}var Xo=()=>{let o=Ot(document);return o?o==="escuro":!!document.body?.classList.contains("dark-mode")||kt(localStorage)},Qe=null,vo=!1,K=null,xo=null,Qo=null,ns=0,et=!1,Be=null,ss=null,No=null,rt=document.readyState!=="loading";function Hc(){let o=document.querySelector(Ka);return document.getElementById("divTabelaProcesso")??o?.parentElement??null}function Co(o){xo?.pronta(),K?.mostrar(!1),Ce(document),o&&o!=="usuario"&&console.warn("[SEI Pro] Grade do controle indispon\xEDvel, usando a vis\xE3o nativa:",o)}function Xe(){if(K||!vo)return;let o=new Se(location.href,()=>ee(document,location.href)),e=xr(ee(document,location.href)),r=e.unidade.id,t=cn({local:dr(chrome.storage.local,"local"),sync:dr(chrome.storage.sync,"sync")},String(r),e.usuario.login);if(["hdnRecebidosPaginaAtual","hdnGeradosPaginaAtual","hdnDetalhadoPaginaAtual"].some(c=>document.getElementById(c)?.value&&document.getElementById(c).value!=="0")&&!sessionStorage.getItem("spro_grade_reset")){try{sessionStorage.setItem("spro_grade_reset","1")}catch{}kr(o.http,ee(document,location.href)).restaurar().then(()=>location.reload()).catch(()=>Co("pagina intermediaria"));return}try{sessionStorage.removeItem("spro_grade_reset")}catch{}let n=Ho(document);if(!n.processos.length&&!n.totais.recebidos&&!n.totais.gerados)return xo?.pronta(),Co("caixa vazia");let s=Hc();if(!s)return Co("sem ponto de encaixe");let i=n.processos.filter(c=>!c.sigiloso&&c.naPaginaAtual).slice(0,6).map(c=>c.protocolo);K=es({doc:document,inicial:n,agora:()=>Date.now(),hoje:()=>Vo(),eu:e.usuario.login||void 0,armazem:t,fonte:kr(o.http,ee(document,location.href),n.visao),mover:{marcador:async(c,l)=>void await sa(o,c,l,{aplicar:!0}),atribuir:async(c,l)=>void await na(o,c,l,{aplicar:!0})},acoes:()=>Da(document),css:`${$t}
${rs}`,escuro:Xo(),baixar:(c,l,m)=>Nt(c,l,m),novoId:()=>It(),extras:i.length?async()=>{let c=async g=>{let u;for(let x of i)try{return await Kt(o,g,x)}catch(y){u=y}return console.warn(`[SEI Pro] Grade: nao foi possivel ler a lista de ${g}`,u instanceof Error?u.message:u),[]},[l,m]=await Promise.all([c("marcadores"),c("usuarios")]);return{marcadores:l.map(g=>g.nome),responsaveis:m.map(g=>{let[u,...x]=g.nome.split(" - ");return{sigla:u.trim(),nome:x.join(" - ").trim()||u.trim()}})}}:void 0,aoVoltarNativa:()=>le(),enviarAcao:(c,l)=>Pa(document,c,l),editarEspecificacao:async(c,l)=>void await Zt(o,c,{especificacao:l},{aplicar:!0}),abrirPrazo:c=>{document.documentElement.setAttribute("data-spro-prazos-alvo",c),document.dispatchEvent(new CustomEvent("spro-prazos-abrir"))},anotar:async(c,l)=>void await aa(o,c,l,{aplicar:!0}),consultarAndamento:(c,l)=>fa(o,c,{sigla:e.unidade.sigla,nome:e.unidade.nome},l)}),K.definirNomesCompletos(et),jc(K),ss?.(),ss=Lt(document,()=>K?.definirTema(Xo())),s.before(K.host),Ca(document,K.host),Fc(),K.iniciar().then(()=>{xo?.pronta(),To(document)&&wr(document)}).catch(c=>Co(String(c)))}function jc(o){No?.disconnect();let e=()=>o.definirFiltroExterno(document.documentElement.getAttribute(as)??"");e(),No=new window.MutationObserver(e),No.observe(document.documentElement,{attributes:!0,attributeFilter:[as]})}function Fc(){Be?.disconnect();let o=window.MutationObserver,e=!1;Be=new o(()=>{e||(e=!0,setTimeout(()=>{if(e=!1,!(!K||!vo||K.host.isConnected&&!!K.host.shadowRoot&&document.querySelectorAll("#spro-grade").length===1||ns>=6)){ns+=1,K.fechar(),K=null,No?.disconnect(),No=null;for(let t of document.querySelectorAll("#spro-grade"))t.remove();(To(document)||vo)&&Xe()}},150))}),Be.observe(document.body??document.documentElement,{childList:!0,subtree:!0})}function le(){Qe&&(To(document)?(vo=!1,Me(localStorage,!1),K?.mostrar(!1),Ce(document)):(vo=!0,Me(localStorage,!0),De(document,Xo()),K?(K.mostrar(!0),wr(document)):(xo=ke(Co),xo.iniciarContagem(),Xe())),Qo?.(),Qo=Le(document,()=>To(document),le))}function Gc(o){o!==Qe&&(Qe=o,o?(rt&&(Qo??=Le(document,()=>To(document),le)),vo&&(De(document,Xo()),xo??=ke(Co),rt&&(xo.iniciarContagem(),Xe()))):(vo=!1,Me(localStorage,!1),Qo?.(),Qo=null,Be?.disconnect(),No?.disconnect(),No=null,K?.fechar(),K=null,xo?.pronta(),Ce(document)))}function Uc(){if(!Vc())return;let o=document.createElement("style");o.textContent=ts,(document.head??document.documentElement).append(o),Na(localStorage)&&(vo=!0,De(document,Xo()),xo=ke(Co)),qa(document,le),Ra(document,Xo);let e=()=>{rt=!0,vo&&(xo?.iniciarContagem(),Xe()),Qe&&(Qo??=Le(document,()=>To(document),le))};document.readyState==="loading"?document.addEventListener("DOMContentLoaded",e,{once:!0}):e();let r=a=>{et=Ct(a,"nomesusuarios"),K?.definirNomesCompletos(et),Gc(Dt(a,qc))},t=!1;chrome.storage.onChanged.addListener((a,n)=>{n!=="sync"||!("dataValues"in a)||(t=!0,r(a.dataValues.newValue))}),chrome.storage.sync.get("dataValues").then(a=>{t||r(a.dataValues)}).catch(()=>{vo&&Co("sem prefer\xEAncias")})}Uc();})();
