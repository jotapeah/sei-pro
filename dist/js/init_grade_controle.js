/* GERADO por grade-controle/build.mjs. NAO EDITE. Rode: npm run build */
"use strict";(()=>{function sa(o){let r={};for(let[t,e]of Object.entries(o)){let a={};e&&"newValue"in e&&(a.novo=e.newValue),e&&"oldValue"in e&&(a.antigo=e.oldValue),r[t]=a}return r}function mr(o,r){return{obter:(t=null)=>o.get(t),gravar:t=>o.set(t),remover:t=>o.remove(t),chaves:typeof o.getKeys=="function"?()=>o.getKeys():void 0,aoMudar(t){let e=(a,n)=>{n===r&&t(sa(a))};return chrome.storage.onChanged.addListener(e),()=>chrome.storage.onChanged.removeListener(e)}}}var le=o=>String(o).padStart(2,"0");function jo(o=new Date){return`${o.getFullYear()}-${le(o.getMonth()+1)}-${le(o.getDate())}`}function Vo(o){let r=/^(\d{4})-(\d{2})-(\d{2})$/.exec(o);if(!r)throw new Error(`Data inv\xE1lida: ${o}`);return new Date(Number(r[1]),Number(r[2])-1,Number(r[3]),12)}function Oo(o,r){return Math.round((Vo(r).getTime()-Vo(o).getTime())/864e5)}function ro(o){let[r,t,e]=o.split("-");return`${e}/${t}/${r}`}function ia(o,r){let t=o;if(typeof o=="string"){if(!o.trim())return;try{t=JSON.parse(o)}catch{return}}return!Array.isArray(t)||t.length===0?void 0:t.map(a=>a?.configGeral).find(Array.isArray)?.find(a=>a?.name===r)?.value}function de(o,r){let t=ia(o,r);return t===!0||t===1||t==="1"}function ue(o){try{return!!o.getItem("darkModePro")}catch{return!1}}function me(o=crypto){if(typeof o.randomUUID=="function")return o.randomUUID();let r=o.getRandomValues(new Uint8Array(16));r[6]=(r[6]??0)&15|64,r[8]=(r[8]??0)&63|128;let t=[...r].map(e=>e.toString(16).padStart(2,"0")).join("");return`${t.slice(0,8)}-${t.slice(8,12)}-${t.slice(12,16)}-${t.slice(16,20)}-${t.slice(20)}`}var fe=`/*
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
`;function d(o,r={},...t){let e=document.createElement(o);for(let[a,n]of Object.entries(r))n===void 0||n===!1||(typeof n=="function"?e.addEventListener(a.replace(/^on/,""),n):n===!0?e.setAttribute(a,""):a==="class"?e.className=n:a==="value"&&o==="textarea"?e.value=n:e.setAttribute(a,n));for(let a of t)a!=null&&a!==!1&&e.append(a);return e}var B={fill:"currentColor",stroke:"none"},ge="M12 3.2l2.7 5.5 6 .9-4.35 4.25 1 6L12 17l-5.35 2.85 1-6L3.3 9.6l6-.9z",pa={estrela:[["path",{d:ge}]],estrelaCheia:[["path",{d:ge,fill:"currentColor"}]],alvo:[["circle",{cx:"12",cy:"12",r:"7.5"}],["circle",{cx:"12",cy:"12",r:"3.2"}]],alvoAtivo:[["circle",{cx:"12",cy:"12",r:"6.6"}],["circle",{cx:"12",cy:"12",r:"2.4",fill:"currentColor"}],["path",{d:"M12 2.2v3.4M12 18.4v3.4M2.2 12h3.4M18.4 12h3.4"}]],pasta:[["path",{d:"M3.5 7.5a2 2 0 0 1 2-2h4l2 2h7a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2z"}]],etiqueta:[["path",{d:"M3.5 12.2V4.5a1 1 0 0 1 1-1h7.7l8.3 8.3a1 1 0 0 1 0 1.4l-7.1 7.1a1 1 0 0 1-1.4 0z"}],["circle",{cx:"8",cy:"8",r:"1.4",...B}]],relogio:[["circle",{cx:"12",cy:"12",r:"9"}],["path",{d:"M12 7.2V12l3.2 1.9"}]],nota:[["path",{d:"M6 3.5h9l3.5 3.5v13.5H6z"}],["path",{d:"M9 11h6"}],["path",{d:"M9 15h6"}]],lixeira:[["path",{d:"M4.5 6.5h15"}],["path",{d:"M9.5 6.5V4.8c0-.7.6-1.3 1.3-1.3h2.4c.7 0 1.3.6 1.3 1.3v1.7"}],["path",{d:"M6.8 6.5 7.6 19c0 .8.7 1.5 1.5 1.5h5.8c.8 0 1.5-.7 1.5-1.5l.8-12.5"}]],lapis:[["path",{d:"M17.5 3.5a2.1 2.1 0 0 1 3 3L9 18l-4.5 1.5L6 15z"}],["path",{d:"M15 6l3 3"}]],fechar:[["path",{d:"M18 6 6 18"}],["path",{d:"M6 6l12 12"}]],mais:[["path",{d:"M12 5v14"}],["path",{d:"M5 12h14"}]],busca:[["circle",{cx:"11",cy:"11",r:"6.5"}],["path",{d:"M20.5 20.5l-4.8-4.8"}]],baixar:[["path",{d:"M12 3.5v11"}],["path",{d:"M7.5 10.2 12 14.7l4.5-4.5"}],["path",{d:"M4.5 19.5h15"}]],subir:[["path",{d:"M12 14.5v-11"}],["path",{d:"M7.5 7.8 12 3.3l4.5 4.5"}],["path",{d:"M4.5 19.5h15"}]],copiar:[["rect",{x:"8.5",y:"8.5",width:"12",height:"12",rx:"2"}],["path",{d:"M15.5 8.5V5.5a2 2 0 0 0-2-2h-8a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h3"}]],restaurar:[["path",{d:"M9 14 4 9l5-5"}],["path",{d:"M4 9h9a7 7 0 0 1 7 7v4"}]],check:[["path",{d:"M20 6.5 9.2 17.3 4 12.1"}]],alerta:[["path",{d:"M10.3 4.4 2.8 17.6a2 2 0 0 0 1.7 3h15a2 2 0 0 0 1.7-3L13.7 4.4a2 2 0 0 0-3.4 0z"}],["path",{d:"M12 9.5v4"}],["circle",{cx:"12",cy:"16.8",r:"1",...B}]],menu:[["circle",{cx:"5",cy:"12",r:"1.4",...B}],["circle",{cx:"12",cy:"12",r:"1.4",...B}],["circle",{cx:"19",cy:"12",r:"1.4",...B}]],alca:[["circle",{cx:"9",cy:"6",r:"1.3",...B}],["circle",{cx:"15",cy:"6",r:"1.3",...B}],["circle",{cx:"9",cy:"12",r:"1.3",...B}],["circle",{cx:"15",cy:"12",r:"1.3",...B}],["circle",{cx:"9",cy:"18",r:"1.3",...B}],["circle",{cx:"15",cy:"18",r:"1.3",...B}]],ajustes:[["path",{d:"M4 7h5"}],["path",{d:"M13 7h7"}],["circle",{cx:"11",cy:"7",r:"2.1"}],["path",{d:"M4 17h9"}],["path",{d:"M17 17h3"}],["circle",{cx:"15",cy:"17",r:"2.1"}]],setaCima:[["path",{d:"M12 19V6"}],["path",{d:"M6 12l6-6 6 6"}]],setaBaixo:[["path",{d:"M12 5v13"}],["path",{d:"M18 12l-6 6-6-6"}]],recolher:[["path",{d:"M6 15l6-6 6 6"}]],expandir:[["path",{d:"M6 9l6 6 6-6"}]],local:[["path",{d:"M12 21s-6.5-6.1-6.5-11a6.5 6.5 0 0 1 13 0c0 4.9-6.5 11-6.5 11z"}],["circle",{cx:"12",cy:"10",r:"2.3"}]],sino:[["path",{d:"M6.5 16.5V11a5.5 5.5 0 0 1 11 0v5.5l1.5 1.5h-14z"}],["path",{d:"M10 20.5a2 2 0 0 0 4 0"}]],documento:[["path",{d:"M7 3.5h7l4 4v13H7z"}],["path",{d:"M14 3.5v4h4"}]],painel:[["rect",{x:"3.5",y:"4.5",width:"17",height:"15",rx:"2"}],["path",{d:"M14.5 4.5v15"}]],atualizar:[["path",{d:"M19.5 12a7.5 7.5 0 1 1-2.2-5.3"}],["path",{d:"M19.5 4.5v4h-4"}]],nuvem:[["path",{d:"M7 18.5h10a4 4 0 0 0 .6-7.95A5.5 5.5 0 0 0 7 9.5a4.5 4.5 0 0 0 0 9z"}]],chevron:[["path",{d:"M7 9.5l5 5 5-5"}]],pino:[["path",{d:"M9.5 3.5h5l-.8 5.2 3.3 3.1v1.7H7v-1.7l3.3-3.1z"}],["path",{d:"M12 13.5v7"}]],pinoCheio:[["path",{d:"M9.5 3.5h5l-.8 5.2 3.3 3.1v1.7H7v-1.7l3.3-3.1z",fill:"currentColor"}],["path",{d:"M12 13.5v7"}]],filtro:[["path",{d:"M4 5.5h16l-6.2 7.3v5.4l-3.6 1.8v-7.2z"}]],ordenar:[["path",{d:"M7.5 4.5v15"}],["path",{d:"M4 16l3.5 3.5L11 16"}],["path",{d:"M16.5 19.5v-15"}],["path",{d:"M13 8l3.5-3.5L20 8"}]],mapa:[["path",{d:"M9 4.5 3.5 6.6v13l5.5-2.1 6 2.1 5.5-2.1v-13L15 6.6z"}],["path",{d:"M9 4.5v13"}],["path",{d:"M15 6.6v13"}]],olho:[["path",{d:"M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z"}],["circle",{cx:"12",cy:"12",r:"2.8"}]],camadas:[["path",{d:"M12 3.5 20.5 8 12 12.5 3.5 8z"}],["path",{d:"M3.5 12 12 16.5 20.5 12"}],["path",{d:"M3.5 16 12 20.5 20.5 16"}]],historico:[["path",{d:"M3.8 12.5A8.3 8.3 0 1 0 6.2 6"}],["path",{d:"M3.8 4.2v4.3h4.3"}],["path",{d:"M12 8v4.2l2.8 1.7"}]],pessoa:[["circle",{cx:"12",cy:"8",r:"3.6"}],["path",{d:"M5 20c.9-3.7 3.6-5.6 7-5.6s6.1 1.9 7 5.6"}]],predio:[["path",{d:"M5 20.5v-15a1 1 0 0 1 1-1h7.5a1 1 0 0 1 1 1v15"}],["path",{d:"M14.5 9.5H18a1 1 0 0 1 1 1v10"}],["path",{d:"M3 20.5h18"}],["path",{d:"M8.5 8.5h3"}],["path",{d:"M8.5 12h3"}],["path",{d:"M8.5 15.5h3"}]],brilho:[["path",{d:"M12 3.5l1.9 5.1 5.1 1.9-5.1 1.9L12 17.5l-1.9-5.1L5 10.5l5.1-1.9z"}],["path",{d:"M18.5 16.5v4"}],["path",{d:"M16.5 18.5h4"}]],calendario:[["rect",{x:"4",y:"5.5",width:"16",height:"15",rx:"2"}],["path",{d:"M4 10h16"}],["path",{d:"M8.5 3.5v4"}],["path",{d:"M15.5 3.5v4"}]],cadeado:[["rect",{x:"5.5",y:"10.5",width:"13",height:"10",rx:"2"}],["path",{d:"M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5"}]],saida:[["path",{d:"M14 4.5h4.5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H14"}],["path",{d:"M10 16l4-4-4-4"}],["path",{d:"M14 12H4.5"}]],planilha:[["rect",{x:"4",y:"4",width:"16",height:"16",rx:"2"}],["path",{d:"M4 9.5h16"}],["path",{d:"M4 15h16"}],["path",{d:"M10 9.5V20"}]],mover:[["path",{d:"M4.5 12h14"}],["path",{d:"M13.5 6.5 19 12l-5.5 5.5"}]],sol:[["circle",{cx:"12",cy:"12",r:"3.8"}],["path",{d:"M12 2.8v2M12 19.2v2M2.8 12h2M19.2 12h2M5.5 5.5l1.4 1.4M17.1 17.1l1.4 1.4M5.5 18.5l1.4-1.4M17.1 6.9l1.4-1.4"}]],teclado:[["rect",{x:"3",y:"6.5",width:"18",height:"11",rx:"2"}],["path",{d:"M7 10h.01M10.3 10h.01M13.7 10h.01M17 10h.01M8 14h8"}]],gantt:[["path",{d:"M4 5h9M7 12h11M4 19h7"}],["path",{d:"M3 3v18"}]],demandas:[["circle",{cx:"10",cy:"7.8",r:"3.2"}],["path",{d:"M3.8 19.5a6.2 5.2 0 0 1 11.8-2.6"}],["circle",{cx:"17.6",cy:"17.6",r:"4.2"}],["path",{d:"m15.6 17.7 1.5 1.5 2.5-3"}]]},Zn=Object.keys(pa);function he(o,r,t,e=1e4){let a=URL.createObjectURL(new Blob([r],{type:t})),n=d("a",{href:a,download:o});document.body.append(n),n.click(),n.remove(),setTimeout(()=>URL.revokeObjectURL(a),e).unref?.()}var E=class extends Error{codigo;detalhe;constructor(r,t,e){super(t),this.name="ErroSei",this.codigo=r,this.detalhe=e}paraJSON(){return{codigo:this.codigo,mensagem:this.message,detalhe:this.detalhe}}};function fr(o){if(o instanceof E)return o;if(o instanceof DOMException&&o.name==="AbortError")return new E("CANCELADO","Opera\xE7\xE3o cancelada.");let r=o instanceof Error?o.message:String(o);return new E("SEI_REDE",`Falha ao falar com o SEI: ${r}`)}var la={AElig:198,Aacute:193,Acirc:194,Agrave:192,Aring:197,Atilde:195,Auml:196,Ccedil:199,ETH:208,Eacute:201,Ecirc:202,Egrave:200,Euml:203,Iacute:205,Icirc:206,Igrave:204,Iuml:207,Ntilde:209,Oacute:211,Ocirc:212,Ograve:210,Oslash:216,Otilde:213,Ouml:214,THORN:222,Uacute:218,Ucirc:219,Ugrave:217,Uuml:220,Yacute:221,aacute:225,acirc:226,acute:180,aelig:230,agrave:224,amp:38,apos:39,aring:229,atilde:227,auml:228,brvbar:166,bull:8226,ccedil:231,cedil:184,cent:162,copy:169,curren:164,deg:176,divide:247,eacute:233,ecirc:234,egrave:232,eth:240,euml:235,euro:8364,frac12:189,frac14:188,frac34:190,gt:62,hellip:8230,iacute:237,icirc:238,iexcl:161,igrave:236,iquest:191,iuml:239,laquo:171,ldquo:8220,lsquo:8216,lt:60,macr:175,mdash:8212,micro:181,middot:183,nbsp:160,ndash:8211,not:172,ntilde:241,oacute:243,ocirc:244,ograve:242,ordf:170,ordm:186,oslash:248,otilde:245,ouml:246,para:182,plusmn:177,pound:163,quot:34,raquo:187,rdquo:8221,reg:174,rsquo:8217,sect:167,shy:173,sup1:185,sup2:178,sup3:179,szlig:223,thorn:254,times:215,trade:8482,uacute:250,ucirc:251,ugrave:249,uml:168,uuml:252,yacute:253,yen:165,yuml:255};function D(o){return o.includes("&")?o.replace(/&(#x[0-9a-fA-F]+|#\d+|[a-zA-Z][a-zA-Z0-9]*);/g,(r,t)=>{let e=t[0]==="#"?t[1]==="x"||t[1]==="X"?parseInt(t.slice(2),16):parseInt(t.slice(1),10):la[t];return e===void 0||Number.isNaN(e)?r:String.fromCodePoint(e)}):o}var xe={128:8364,130:8218,131:402,132:8222,133:8230,134:8224,135:8225,136:710,137:8240,138:352,139:8249,140:338,142:381,145:8216,146:8217,147:8220,148:8221,149:8226,150:8211,151:8212,152:732,153:8482,154:353,155:8250,156:339,158:382,159:376};var ve=null;function Fo(o){return ve?ve(o):new DOMParser().parseFromString(o,"text/html")}function C(o){return(o?.textContent??"").replace(/\s+/g," ").trim()}var da={n:`
`,r:"\r",t:"	",b:"\b",f:"\f",v:"\v",0:"\0"};function gr(o,r){let t=o[r],e="";for(r+=1;r<o.length;){let a=o[r];if(a==="\\"){let n=o[r+1];if(n==="u"&&/^[0-9a-fA-F]{4}$/.test(o.slice(r+2,r+6))){e+=String.fromCharCode(parseInt(o.slice(r+2,r+6),16)),r+=6;continue}e+=da[n]??n,r+=2;continue}if(a===t)return[e,r+1];e+=a,r+=1}return[e,r]}function Uo(o,r){let t=[],e=r;for(;e<o.length;){let a=o[e];if(a===")")return[t,e+1];if(a===","||/\s/.test(a)){e+=1;continue}if(a==='"'||a==="'"){let[i,c]=gr(o,e);t.push(i),e=c;continue}let n=/^(null|true|false|-?\d+(?:\.\d+)?)/.exec(o.slice(e,e+32));if(n){let i=n[1];t.push(i==="null"?null:i==="true"?!0:i==="false"?!1:Number(i)),e+=i.length;continue}let s=0;for(;e<o.length;){let i=o[e];if(i==="(")s+=1;else if(i===")"){if(s===0)break;s-=1}else if(i===","&&s===0)break;e+=1}t.push(null)}return[t,e]}function co(o,r){let t=[],e=new RegExp(`\\b${r}\\(`,"g");for(let a of o.matchAll(e)){let[n]=Uo(o,a.index+a[0].length);t.push(n)}return t}function k(o){return typeof o=="string"?D(o):o==null?"":String(o)}var ua=/controlador(?:_ajax)?\.php\?acao=[^"'\s<>\\]*?infra_hash=[0-9a-f]{64,192}/g;function eo(o){let r=new Set;for(let t of o.replace(/&amp;/g,"&").matchAll(ua))r.add(t[0]);return[...r]}function N(o){let r=o.indexOf("?");return new URLSearchParams(r>=0?o.slice(r+1):"")}function G(o,r,t={}){let e=Array.isArray(o)?o:eo(o);for(let a of e){let n=N(a),s=n.get("acao")??"";if(!(typeof r=="string"?s!==r:!r.test(s))&&Object.entries(t).every(([i,c])=>n.get(i)===c))return a}return null}function be(o,r){let t=[...o.doc.querySelectorAll("#infraMenu a[href], #main-menu a[href], .infraMenu a[href]")].map(s=>s.getAttribute("href")??"").join(`
`),e=eo(t).filter(s=>N(s).get("acao")===r),n=(e.length?e:eo(o.html).filter(s=>N(s).get("acao")===r)).sort((s,i)=>[...N(s).keys()].length-[...N(i).keys()].length)[0];if(!n)throw new E("SEI_ACAO_INDISPONIVEL",`O menu do SEI n\xE3o oferece "${r}" para este usu\xE1rio.`);return n}function ma(o){let r=new Map;for(let t of o.matchAll(/Nos\[(\d+)\]\s*=\s*new\s+infraArvoreNo\(/g)){let[e]=Uo(o,t.index+t[0].length);r.set(Number(t[1]),{indice:Number(t[1]),args:e,props:{}})}for(let t of o.matchAll(/Nos\[(\d+)\]\.(\w+)\s*=\s*(['"])/g)){let e=r.get(Number(t[1]));if(!e)continue;let[a]=gr(o,t.index+t[0].length-1);e.props[t[2]]=a}return[...r.values()].sort((t,e)=>t.indice-e.indice)}function fa(o){let r=[];for(let t of o.matchAll(/new\s+infraArvoreAcao\(/g)){let[e]=Uo(o,t.index+t[0].length);r.push({tipo:k(e[0]),idPai:k(e[2]),href:k(e[3]),titulo:k(e[5]),icone:k(e[6]),extra:e[8]==null?void 0:k(e[8])})}return r}function Ae(o,r){let t=o.find(s=>s.tipo==="NIVEL_ACESSO"&&s.idPai===r);if(!t)return{nivel:"publico"};let[e,...a]=t.titulo.split(`
`);return{nivel:/sigilos/i.test(e)||/sigiloso/.test(t.icone)?"sigiloso":"restrito",hipotese:a.join(" ").trim()||void 0}}function ye(o){return[...new Set([...o.matchAll(/<img[^>]*\btitle="([^"]+)"/g)].map(r=>k(r[1])))]}var ga=/\s*\(\d{5,}\)\s*$/;function ha(o){let r=o.html,t=ma(r),e=fa(r),a=t.find(c=>c.args[0]==="PROCESSO");if(!a)throw new E("SEI_VERSAO_NAO_SUPORTADA","A \xE1rvore do processo n\xE3o tem o n\xF3 do processo.");let n=k(a.args[1]),s=Ae(e,n),i=t.filter(c=>c.args[0]==="DOCUMENTO").map(c=>{let p=k(c.args[1]),m=k(c.args[5]),f=k(c.args[7]),v=(c.props.src??"").replace(/&amp;/g,"&"),A=e.find(y=>y.tipo==="ASSINATURA"&&y.idPai===p),{nivel:b,hipotese:h}=Ae(e,p),P=(/documento_([a-z0-9]+)\.svg/.exec(f)?.[1]??"interno").replace("cancelado","interno");return{id:p,numero:k(c.args[15])||(/\((\d{5,})\)\s*$/.exec(m)?.[1]??""),titulo:m.replace(ga,""),pasta:c.args[2]&&String(c.args[2]).startsWith("PASTA")?String(c.args[2]):null,externo:/documento_download_anexo/.test(v)||!/documento_interno|documento_cancelado|formulario|email/.test(f),formato:P,nivel:b,hipotese:h,assinado:!!A,assinaturas:A?A.titulo.split(`
`).slice(1).filter(Boolean):[],cancelado:/documento_cancelado/.test(f),unidadeGeradora:e.find(y=>y.tipo==="UNIDADE_GERADORA"&&y.idPai===p)?.extra,link:k(c.args[3]).replace(/&amp;/g,"&"),src:v,acoes:eo(c.props.acoes??""),botoes:ye(c.props.acoes??"")}});return{idProcedimento:n,protocolo:k(a.args[5])||k(a.args[15]),tipo:k(a.args[6]),nivel:s.nivel,hipotese:s.hipotese,marcadores:e.filter(c=>c.tipo==="MARCADOR"&&c.idPai===n).map(c=>c.titulo.replace(/^Marcador\n/,"").replace(/\n/g," \u2014 ")),documentos:i,acoesProcesso:eo(a.props.acoes??""),botoesProcesso:ye(a.props.acoes??""),linkProcesso:k(a.args[3]).replace(/&amp;/g,"&"),sinais:e.filter(c=>c.idPai===n),links:eo(r),pagina:o}}async function Ee(o,r,t){let e=await o.obter(r,t);if(!/acao=procedimento_visualizar/.test(e.url)){let a=e.doc.querySelector("#ifrArvore")?.getAttribute("src");if(!a)throw new E("SEI_NAO_ENCONTRADO","N\xE3o foi poss\xEDvel abrir a \xE1rvore do processo.");e=await o.obter(a,t)}if(/infraArvoreNo\("PASTA"/.test(e.html)){let a=G(e.html,"procedimento_visualizar")&&eo(e.html).find(n=>/abrir_pastas=1/.test(n));a&&(e=await o.obter(a,t))}return ha(e)}function ho(o,r,t){if(t){let e=o.documentos.find(a=>a.id===t);return e?G(e.acoes,r):null}return G(o.acoesProcesso,r)??G(o.links,r,{id_procedimento:o.idProcedimento})}function Go(o,r,t){let e=(r??"").trim(),a=(t??"").trim();return t===void 0||e===a?[]:[{campo:o,antes:e,depois:a}]}async function hr(o,r,t,e){let a=/controlador_ajax\.php\?acao_ajax=hipotese_legal_select[^'"]*/.exec(r.pagina.html)?.[0];return a?o.ajax(D(a),[["primeiroItemValor","null"],["primeiroItemDescricao"," "],["valorItemSelecionado",""],["staNivelAcesso",t]],{sinal:e}):r.opcoes("selHipoteseLegal").filter(n=>n.valor!=="null").map(n=>({id:n.valor,texto:n.texto}))}var ke="\xA5",xr="\xB1";function Se(o){return o.map(r=>`${r.id}${xr}${r.texto}`).join(ke)}function xa(o){return o?o.split(ke).map(r=>{let[t,...e]=r.split(xr);return{id:t,texto:e.join(xr)}}):[]}function Pe(o){let r=[];for(let t of o.matchAll(/new\s+infraLupaSelect\(\s*['"]([\w-]+)['"]\s*,\s*['"]([\w-]+)['"]/g))r.push([t[1],t[2]]);return r}var z=class o{constructor(r,t,e){this.http=r;this.pagina=t;this.elemento=e,this.id=e.id,this.action=(e.getAttribute("action")??"").replace(/&amp;/g,"&"),this.campos=va(e),this.sincronizarLupas()}id;action;campos;elemento;static async abrir(r,t,e,a){let n=await r.obter(t,a);return o.de(n,e,r)}static de(r,t,e=null){let a=r.doc.querySelector(t);if(!a)throw new E("SEI_VERSAO_NAO_SUPORTADA",`A tela do SEI n\xE3o tem o formul\xE1rio esperado (${t}).`,C(r.doc.querySelector("title")));return new o(e,r,a)}pares(){return this.campos.map(r=>[r.nome,r.valor])}valor(r){return this.campos.find(t=>t.nome===r)?.valor}tem(r){return this.elemento.querySelector(`[name="${r}"]`)!==null||this.campos.some(t=>t.nome===r)}opcoes(r){let t=this.elemento.querySelector(`select[name="${r}"], select#${Me(r)}`);return t?[...t.querySelectorAll("option")].map(e=>({valor:e.getAttribute("value")??C(e),texto:C(e),selecionada:e.hasAttribute("selected")})):[]}definir(r){for(let[t,e]of Object.entries(r)){if(e===void 0)continue;if(e===null){this.campos=this.campos.filter(n=>n.nome!==t);continue}let a=this.campos.find(n=>n.nome===t);a?a.valor=e:this.campos.push({nome:t,valor:e})}return this}escolher(r,t){let e=this.opcoes(r),a=_(t),n=e.find(s=>s.valor===t)??e.find(s=>_(s.texto)===a)??we(e.filter(s=>_(s.texto).includes(a)));if(!n)throw new E("ARGUMENTO_INVALIDO",`"${t}" n\xE3o \xE9 uma op\xE7\xE3o de ${r}.`,e.slice(0,40).map(s=>s.texto).join(" | "));return this.definir({[r]:n.valor}),n}linhas(r){return[...this.elemento.querySelectorAll(`${r} tr`)].filter(t=>t.querySelector("input[type=checkbox]"))}itensLupa(r){let t=this.hiddenDaLupa(r);return t?xa(this.valor(t)??""):[]}definirLupa(r,t){let e=this.hiddenDaLupa(r);if(!e)throw new E("SEI_VERSAO_NAO_SUPORTADA",`A lupa ${r} n\xE3o existe nesta tela.`);return this.definir({[e]:Se(t)}),this.campos=this.campos.filter(a=>a.nome!==r&&a.nome!==`${r}[]`),this}async enviar(r={}){if(!this.http)throw new E("SEI_RESPOSTA_INESPERADA","Formul\xE1rio sem transporte HTTP.");if(!this.action)throw new E("SEI_VERSAO_NAO_SUPORTADA",`O formul\xE1rio ${this.id} n\xE3o tem action.`);let t=this.pares();r.botao&&t.push(this.botaoDeEnvio(r.botao));let e=await this.http.enviar(this.action,t,r);if(r.sucesso&&!r.sucesso(e))throw new E("SEI_RESPOSTA_INESPERADA",`O SEI n\xE3o confirmou ${r.operacao??"a opera\xE7\xE3o"}.`,`${C(e.doc.querySelector("title"))} \u2014 ${e.url.replace(/infra_hash=\w+/,"infra_hash=\u2026")}`);return e}botaoDeEnvio(r){let t=this.elemento.querySelector(`[name="${r}"]`)??we([...this.elemento.querySelectorAll('button[type="submit"][name^="sbm"], input[type="submit"][name^="sbm"]')]);return t?[t.getAttribute("name")??r,t.getAttribute("value")??C(t)??r]:[r,r]}hiddenDaLupa(r){let t=Pe(this.pagina.html).find(([e])=>e===r);return t?t[1]:null}sincronizarLupas(){for(let[r,t]of Pe(this.pagina.html)){let e=this.elemento.querySelector(`select#${Me(r)}`);if(!e)continue;let a=[...e.querySelectorAll("option")].map(n=>({id:n.getAttribute("value")??"",texto:C(n)}));(this.valor(t)??"")||this.definir({[t]:Se(a)}),this.campos=this.campos.filter(n=>n.nome!==r&&n.nome!==`${r}[]`)}}};function va(o){let r=[];for(let t of o.querySelectorAll("input, select, textarea")){let e=t.getAttribute("name");if(!e||t.hasAttribute("disabled"))continue;let a=t.tagName.toLowerCase();if(a==="input"){let n=(t.getAttribute("type")??"text").toLowerCase();if(["submit","button","image","reset","file"].includes(n)||(n==="checkbox"||n==="radio")&&!t.hasAttribute("checked"))continue;r.push({nome:e,valor:t.getAttribute("value")??(n==="checkbox"||n==="radio"?"on":"")})}else if(a==="textarea")r.push({nome:e,valor:t.textContent??""});else{let n=[...t.querySelectorAll("option")],s=n.filter(p=>p.hasAttribute("selected")),i=t.hasAttribute("multiple"),c=s.length?s:!i&&n.length?[n[0]]:[];for(let p of c)r.push({nome:e,valor:p.getAttribute("value")??C(p)})}}return r}function _(o){return o.normalize("NFD").replace(/[\u0300-\u036F]/g,"").toLowerCase().replace(/\s+/g," ").trim()}function we(o){return o.length===1?o[0]:void 0}function Me(o){return o.replace(/([^\w-])/g,"\\$1")}async function ba(o,r,t){let e=ho(r,"documento_escolher_tipo");if(!e)throw new E("SEI_ACAO_INDISPONIVEL",`N\xE3o \xE9 poss\xEDvel incluir documento no processo ${r.protocolo} (fechado na unidade?).`);let a=await z.abrir(o.http,e,"#frmDocumentoEscolherTipo",{sinal:t});if(a.tem("hdnFiltroSerie")&&a.valor("hdnFiltroSerie")!=="T"){let n=await a.definir({hdnFiltroSerie:"T"}).enviar({sinal:t});a=z.de(n,"#frmDocumentoEscolherTipo",o.http)}return a}function Aa(o){let r=new Map;for(let t of o.doc.querySelectorAll("[onclick*='escolher(']")){let e=/escolher\((-?\d+)\)/.exec(t.getAttribute("onclick")??"")?.[1];e&&!r.has(e)&&r.set(e,C(t))}for(let t of o.doc.querySelectorAll("a[href*='id_serie=']")){let e=N(t.getAttribute("href")??"").get("id_serie");e&&!r.has(e)&&r.set(e,C(t))}return[...r].filter(([,t])=>t).map(([t,e])=>({id:t,nome:e}))}async function Ce(o,r,t){let e=await o.arvore(r,{sinal:t});return Aa((await ba(o,e,t)).pagina)}var Oe={tipos_processo:{acao:"procedimento_alterar",form:"#frmProcedimentoCadastro",campo:"selTipoProcedimento"},hipoteses_legais:{acao:"procedimento_alterar",form:"#frmProcedimentoCadastro",campo:"selHipoteseLegal"},usuarios:{acao:"procedimento_atribuicao_cadastrar",form:"#frmAtividadeAtribuir",campo:"selAtribuicao"},marcadores:{acao:"andamento_marcador_gerenciar",form:"#frmAndamentoMarcadorCadastro",campo:"selMarcador"},grupos_acompanhamento:{acao:"acompanhamento_gerenciar",form:"#frmAcompanhamentoCadastro",campo:"selGrupoAcompanhamento"}};async function vr(o,r,t,e={}){let a;if(r==="tipos_documento")a=(await Ce(o,t,e.sinal)).map(s=>({id:s.id,nome:s.nome}));else{let s=Oe[r];if(!s)throw new E("ARGUMENTO_INVALIDO",`Lista desconhecida: ${r}.`,Object.keys(Oe).concat("tipos_documento").join(" | "));let i=await o.arvore(t,{sinal:e.sinal}),c=ho(i,s.acao);if(!c)throw new E("SEI_ACAO_INDISPONIVEL",`Para listar ${r} use um processo aberto na sua unidade.`);if(r==="marcadores"&&(c=G((await o.http.obter(c,{sinal:e.sinal,aceitarValidacao:!0})).html,"andamento_marcador_cadastrar"),!c))throw new E("SEI_VERSAO_NAO_SUPORTADA","Tela de marcadores n\xE3o reconhecida.");let p=await z.abrir(o.http,c,s.form,{sinal:e.sinal,aceitarValidacao:!0});a=r==="hipoteses_legais"?(await hr(o,p,"1",e.sinal)).map(m=>({id:m.id,nome:m.texto})):p.opcoes(s.campo).filter(m=>m.valor&&m.valor!=="null"&&m.texto).map(m=>({id:m.valor,nome:m.texto}))}let n=e.filtro?_(e.filtro):"";return n?a.filter(s=>_(s.nome).includes(n)):a}async function De(o,r,t){let e=await o.arvore(r,{sinal:t});if(e.nivel==="sigiloso")throw new E("SEI_SIGILOSO","Processo sigiloso: o agente n\xE3o atua nele.");return e}function Le(o,r,t){let e=ho(o,r);if(!e)throw new E("SEI_ACAO_INDISPONIVEL",`"${t}" n\xE3o est\xE1 dispon\xEDvel no processo ${o.protocolo} (processo fechado na unidade ou sem permiss\xE3o).`);return e}var ze=o=>r=>N(r.url).get("acao")!==o;async function ya(o,r,t,e){let a=await o.http.obter(Le(r,t.acao,t.nomeAcao),{sinal:e,aceitarValidacao:!0});if(a.doc.querySelector(t.form))return z.de(a,t.form,o.http);let n=(t.formularios??[]).map(s=>G(a.html,s)).find(Boolean);if(!n)throw new E("SEI_VERSAO_NAO_SUPORTADA",`A tela "${t.nomeAcao}" n\xE3o tem o formul\xE1rio esperado.`);return z.abrir(o.http,n,t.form,{sinal:e,aceitarValidacao:!0})}async function Ea(o,r,t,e){let a=await De(o,r,e.sinal),n=await ya(o,a,t,e.sinal),s=t.preparar(n),i={alvo:a.protocolo,mudancas:s,aplicado:!1,resumo:""};return s.length?e.aplicar?(await n.enviar({sinal:e.sinal,botao:t.botao,operacao:`${t.nomeAcao} em ${a.protocolo}`,sucesso:t.sucesso??ze(t.acao)}),o.invalidar(a.idProcedimento),{...i,aplicado:!0,resumo:t.resumo(a.protocolo).replace(/^Vai /,"")}):{...i,resumo:t.resumo(a.protocolo)}:{...i,resumo:"Nada a alterar: j\xE1 est\xE1 assim."}}function $e(o,r,t,e){return Ea(o,r,{acao:"procedimento_atribuicao_cadastrar",nomeAcao:"Atribuir Processo",form:"#frmAtividadeAtribuir",botao:"sbmSalvar",preparar:a=>{let n=a.opcoes("selAtribuicao").find(p=>p.valor===a.valor("selAtribuicao")&&p.valor!=="null")?.texto??"";if(t===null)return a.definir({selAtribuicao:"null"}),[{campo:"Atribui\xE7\xE3o",antes:n||"(atribui\xE7\xE3o atual)",depois:"(nenhuma)"}];let s=_(t),i=a.opcoes("selAtribuicao").filter(p=>p.valor!=="null"),c=i.find(p=>p.valor===t)??i.find(p=>_(p.texto.split(" - ")[0])===s)??i.find(p=>_(p.texto.split(" - ").slice(1).join(" - "))===s)??(i.filter(p=>_(p.texto).includes(s)).length===1?i.find(p=>_(p.texto).includes(s)):void 0);if(!c)throw new E("ARGUMENTO_INVALIDO",`Usu\xE1rio "${t}" n\xE3o encontrado (ou amb\xEDguo) na unidade.`,i.map(p=>p.texto).join(" | "));return a.definir({selAtribuicao:c.valor}),Go("Atribui\xE7\xE3o",n,c.texto)},resumo:a=>t?`Processo ${a} atribu\xEDdo.`:`Atribui\xE7\xE3o removida de ${a}.`},e)}async function Sa(o,r,t){let e=Le(r,"andamento_marcador_gerenciar","Gerenciar Marcador");return o.http.obter(e,{sinal:t,aceitarValidacao:!0})}function Ie(o){return[...o.doc.querySelectorAll("#tblMarcadores tr")].filter(t=>t.querySelector("input[type=checkbox]")).map(t=>{let e=[...t.querySelectorAll("td")];return{id:t.querySelector("input[type=checkbox]")?.getAttribute("value")??"",marcador:C(e[1]),texto:C(e[2]),usuario:C(e[3]),data:C(e[4])}})}async function Re(o,r,t,e){let a=await De(o,r,e.sinal),n=await Sa(o,a,e.sinal),s=Ie(n),i=_(t.marcador),c=s.find(v=>_(v.marcador)===i),p={alvo:a.protocolo,mudancas:[],aplicado:!1,resumo:""};if(t.remover){if(!c)return{...p,resumo:`O processo ${a.protocolo} n\xE3o tem o marcador "${t.marcador}".`};if(p.mudancas=[{campo:"Marcador",antes:`${c.marcador}${c.texto?`: ${c.texto}`:""}`,depois:""}],!e.aplicar)return{...p,resumo:`Vai remover o marcador "${c.marcador}" de ${a.protocolo}.`};let v=G(n.html,"andamento_marcador_remover");if(!v)throw new E("SEI_ACAO_INDISPONIVEL","A tela de marcadores n\xE3o oferece remo\xE7\xE3o.");let A=z.de(n,"#frmGerenciarMarcador",o.http);A.definir({hdnInfraItemId:c.id,hdnInfraItensSelecionados:c.id});let b=await o.http.enviar(v,A.pares(),{sinal:e.sinal,aceitarValidacao:!0});if(Ie(b).some(h=>h.id===c.id))throw new E("SEI_RESPOSTA_INESPERADA",`O SEI n\xE3o removeu o marcador "${c.marcador}".`);return o.invalidar(a.idProcedimento),{...p,aplicado:!0,resumo:`Marcador "${c.marcador}" removido de ${a.protocolo}.`}}let m;if(n.doc.querySelector("#frmAndamentoMarcadorCadastro"))m=z.de(n,"#frmAndamentoMarcadorCadastro",o.http);else{let v=G(n.html,"andamento_marcador_cadastrar");if(!v)throw new E("SEI_VERSAO_NAO_SUPORTADA","Esta vers\xE3o do SEI n\xE3o tem a tela de marcadores esperada (4.1 ou superior).");m=await z.abrir(o.http,v,"#frmAndamentoMarcadorCadastro",{sinal:e.sinal})}let f=m.escolher("selMarcador",t.marcador);return m.definir({hdnIdMarcador:f.valor,txaTexto:(t.texto??c?.texto??"").slice(0,250)}),p.mudancas=c?Go(`Texto do marcador ${f.texto}`,c.texto,t.texto):[{campo:"Marcador",antes:"",depois:`${f.texto}${t.texto?`: ${t.texto}`:""}`}],p.mudancas.length?e.aplicar?(await m.enviar({sinal:e.sinal,botao:"sbmSalvar",operacao:`o marcador em ${a.protocolo}`,sucesso:ze("andamento_marcador_cadastrar")}),o.invalidar(a.idProcedimento),{...p,aplicado:!0,resumo:`Marcador "${f.texto}" aplicado em ${a.protocolo}.`}):{...p,resumo:`Vai marcar ${a.protocolo} com "${f.texto}".`}:{...p,resumo:"Nada a alterar: o marcador j\xE1 est\xE1 assim."}}var Pa={"\u2010":"-","\u2011":"-","\u2012":"-","\u2013":"-","\u2014":"-","\u2015":"-","\u2212":"-","\u2018":"'","\u2019":"'","\u201A":"'","\u201B":"'","\u2032":"'","\u201C":'"',"\u201D":'"',"\u201E":'"',"\u201F":'"',"\u2033":'"',"\u2026":"...","\u2022":"-","\u2002":" ","\u2003":" ","\u2009":" ","\u202F":" ","\u205F":" ","\u200B":"","\u200C":"","\u200D":"","\u2060":"","\uFEFF":"","\u20AC":"EUR","\u2122":"(TM)","\u2192":"->","\u2190":"<-"};function Ne(o,r="texto"){let t="";for(let e of o){let a=e.codePointAt(0);if(a<=255){t+=e;continue}let n=Pa[e];if(r==="html"){t+=n===""?"":`&#${a};`;continue}if(n!==void 0){t+=n;continue}let s=e.normalize("NFKD").replace(/[\u0300-\u036F]/g,"");t+=[...s].every(i=>i.codePointAt(0)<=255)?s:""}return t}var wa=/[A-Za-z0-9\-_.*]/;function _e(o){let r="";for(let t of o)t===" "?r+="+":wa.test(t)?r+=t:r+="%"+t.charCodeAt(0).toString(16).toUpperCase().padStart(2,"0");return r}function Te(o,r={}){return o.map(([t,e])=>{let a=r[t]??"texto";return`${_e(Ne(t))}=${_e(Ne(e??"",a))}`}).join("&")}function br(o){let r=o instanceof Uint8Array?o:new Uint8Array(o),t=[],e=16384;for(let a=0;a<r.length;a+=e){let n=r.subarray(a,a+e),s=new Array(n.length);for(let i=0;i<n.length;i+=1)s[i]=xe[n[i]]??n[i];t.push(String.fromCharCode(...s))}return t.join("")}var qe="application/x-www-form-urlencoded; charset=ISO-8859-1";function Ve(o,r,t){let e=null;return{url:o,status:r,html:t,get doc(){return e??=Fo(t)}}}function je(o,r={}){if(/\/login\.php/i.test(o.url)||/[?&]acao=(?:infra_)?sair\b/.test(o.url))throw new E("SEI_SESSAO_EXPIRADA","A sess\xE3o do SEI foi encerrada. Fa\xE7a login de novo no SEI e repita o pedido.");if(o.status>=500)throw new E("SEI_EXCECAO",`O SEI respondeu com erro ${o.status}.`);if(o.html.includes('id="divInfraExcecao"')){let t=o.doc.querySelector("#divInfraExcecao");if(t){let e=C(t);throw new E("SEI_EXCECAO",e||"O SEI exibiu uma p\xE1gina de erro.",e)}}if(!r.aceitarValidacao&&o.html.includes("txaInfraValidacao")){let t=o.doc.querySelector("#txaInfraValidacao")?.textContent?.trim()??"";if(t)throw new E("SEI_VALIDACAO",t,t)}return o}function Fe(o,r={}){let t=new URL(".",o),e=r.fetch??((...f)=>fetch(...f)),a=Math.max(1,r.concorrencia??3),n=0,s=[];async function i(f){n>=a&&await new Promise(v=>s.push(v)),n+=1;try{return await f()}finally{n-=1,s.shift()?.()}}let c=f=>new URL(f.replace(/&amp;/g,"&"),t).href;async function p(f,v,A){return i(async()=>{try{let b=await e(c(f),{credentials:"same-origin",redirect:"follow",...v,signal:A.sinal}),h=br(await b.arrayBuffer());return je(Ve(b.url||c(f),b.status,h),A)}catch(b){throw fr(b)}})}async function m(f,v={}){return i(async()=>{try{let A=await e(c(f),{credentials:"same-origin",redirect:"follow",signal:v.sinal}),b=new Uint8Array(await A.arrayBuffer()),h=(A.headers?.get("content-type")??"").split(";")[0].trim().toLowerCase();h==="text/html"&&je(Ve(A.url||c(f),A.status,br(b)),v);let P=A.headers?.get("content-disposition")??"",y=decodeURIComponent(/filename\*=UTF-8''([^;]+)/i.exec(P)?.[1]??/filename="?([^";]+)"?/i.exec(P)?.[1]??"");return{bytes:b,tipo:h,nome:y}}catch(A){throw fr(A)}})}return{base:t,absoluta:c,baixar:m,obter:(f,v={})=>p(f,{method:"GET"},v),enviar:(f,v,A={})=>p(f,{method:"POST",headers:{"Content-Type":qe},body:Te(v,A.modos)},A)}}function Ma(o){let r=/Sistema Eletr(?:\u00F4|&ocirc;|\\u00F4)nico de Informa[^"]*?Vers(?:\u00E3|&atilde;)o\s*([\d.]+)/i.exec(o);return r?r[1]:/\.(?:js|svg|css)\?(\d+\.\d+\.\d+)-/.exec(o)?.[1]??""}function ka(o){let r=o.doc.querySelector("#lnkInfraUnidade")?.getAttribute("onclick")??"",t=/infra_unidade_atual=(\d+)/.exec(r)?.[1];if(t)return t;let e=/[?&]infra_unidade_atual=(\d+)/.exec(o.url)?.[1];return e||(o.doc.querySelector("#selInfraUnidades option[selected]")?.getAttribute("value")??"")}function Ar(o){let r=o.doc,t=r.querySelector("#lnkInfraUnidade"),e=r.querySelector("#lnkUsuarioSistema")?.getAttribute("title")??"",[,a="",n="",s=""]=/^(.*?)\s*\(([^/)]+)(?:\/([^)]+))?/.exec(e)??[],i=Ma(o.html);return{host:new URL(o.url).host,versao:i,maior:Number(i.split(".")[0])||0,unidade:{id:ka(o),sigla:C(t)||C(r.querySelector("#selInfraUnidades option[selected]")),nome:t?.getAttribute("title")??""},usuario:{nome:a.trim(),login:n.trim(),orgao:s.trim()}}}var Ca=3e4,Ho=class{constructor(r,t=null,e){this.paginaViva=t;this.http=Fe(r,e)}http;paginaBase=null;arvores=new Map;localizados=new Map;base(){let r=this.paginaViva?.();if(r&&r.html.includes("frmProtocoloPesquisaRapida"))return r;if(this.paginaBase)return this.paginaBase;if(r)return r;throw new E("SEI_NAO_ENCONTRADO","Abra uma tela do SEI (por exemplo, Controle de Processos) nesta aba.")}contexto(){return Ar(this.base())}linkMenu(r){return be(this.base(),r)}async renovarBase(r){return this.paginaBase=await this.http.obter(this.linkMenu("procedimento_controlar"),r),this.arvores.clear(),this.localizados.clear(),this.paginaBase}async localizar(r,t){let e=r.trim();if(!e)throw new E("ARGUMENTO_INVALIDO","Informe o n\xFAmero do processo ou o n\xBA SEI do documento.");let a=this.localizados.get(e);if(a)return a;let n=z.de(this.base(),"#frmProtocoloPesquisaRapida",this.http);n.definir({txtPesquisaRapida:e});let s=await n.enviar(t),i=N(s.url);if(i.get("acao")!=="procedimento_trabalhar")throw new E("SEI_NAO_ENCONTRADO",`Nada encontrado no SEI para "${e}", ou voc\xEA n\xE3o tem acesso a ele.`);let c=s.doc.querySelector("#ifrArvore")?.getAttribute("src");if(!c)throw new E("SEI_VERSAO_NAO_SUPORTADA","A tela do processo n\xE3o trouxe a \xE1rvore.");let m=N(D(c)).get("id_procedimento")??"",f=i.get("id_protocolo")??"",v={idProcedimento:m,idDocumento:f&&f!==m?f:void 0,linkArvore:D(c)};return this.localizados.set(e,v),v}async arvore(r,t={}){let e=await this.localizar(r,t),a=this.arvores.get(e.idProcedimento);if(a&&!t.forcar&&Date.now()-a.quando<Ca)return a.arvore;let n=await Ee(this.http,e.linkArvore,t);return this.arvores.set(e.idProcedimento,{quando:Date.now(),arvore:n}),n}invalidar(r){r?this.arvores.delete(r):this.arvores.clear()}async ajax(r,t,e){let a=await this.http.enviar(r,t,{...e,aceitarValidacao:!0}),n=[];for(let s of a.html.matchAll(/<option[^>]*value="([^"]*)"[^>]*>([^<]*)<\/option>/g))n.push({id:D(s[1]),texto:D(s[2]).trim()});for(let s of a.html.matchAll(/<item\s+([^>]*)>/g)){let i=Fo(`<i ${s[1]}></i>`).querySelector("i");n.push({id:i?.getAttribute("id")??"",texto:i?.getAttribute("descricao")??i?.getAttribute("complemento")??""})}return n.filter(s=>s.id&&s.id!=="null")}};function Bo(o,r=o.location?.href??"https://sei.invalido/sei/controlador.php"){return{url:r,status:200,get html(){return o.documentElement.outerHTML},doc:o}}var Oa="#divInfraBarraComandosSuperior a[onclick], #divInfraBarraComandosInferior a[onclick]";function Ue(o){let r=new Set,t=[];for(let e of o.querySelectorAll(Oa)){let a=/[?&]acao=([a-z0-9_]+)/.exec(e.getAttribute("onclick")??"")?.[1],n=e.querySelector("img");if(!a||!n||r.has(a))continue;r.add(a);let s=n.getAttribute("title")||n.getAttribute("alt")||a,i=n.getAttribute("src")??"";try{i=new URL(i,o.baseURI||o.location?.href).href}catch{}t.push({acao:a,rotulo:s,icone:i,elemento:e})}return t}var T="data-spro-grade",to="data-spro-grade-pronta",Io="data-spro-grade-escuro",yr="spro_grade",Er="spro-grade-pre";var Ia="#tblProcessosRecebidos, #tblProcessosGerados, #tblProcessosDetalhado";function Da(){let o=Ia.split(", ").map(t=>`html[${T}] ${t}`).join(`,
`),r=`html[${T}]:not([${to}]) #divTabelaProcesso::before,
html[${T}]:not([${to}]) #frmProcedimentoControlar:not(:has(#divTabelaProcesso))::before`;return`${o} { display: none !important; }
html[${T}] #divRecebidosAreaPaginacaoSuperior, html[${T}] #divRecebidosAreaPaginacaoInferior,
html[${T}] #divGeradosAreaPaginacaoSuperior, html[${T}] #divGeradosAreaPaginacaoInferior { display: none !important; }
${r} {
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
html[${T}][${Io}]:not([${to}]) #divTabelaProcesso::before,
html[${T}][${Io}]:not([${to}]) #frmProcedimentoControlar:not(:has(#divTabelaProcesso))::before { --spro-sk: #2c333b; --spro-sk-2: #232a31; }
@keyframes spro-grade-pulso { 0%, 100% { opacity: 1; } 50% { opacity: 0.55; } }
@media (prefers-reduced-motion: reduce) {
  html[${T}]:not([${to}]) #divTabelaProcesso::before,
  html[${T}]:not([${to}]) #frmProcedimentoControlar:not(:has(#divTabelaProcesso))::before { animation: none; }
}`}function Ge(o){try{return o.getItem(yr)==="1"}catch{return!1}}function He(o,r){try{r?o.setItem(yr,"1"):o.removeItem(yr)}catch{}}function Qo(o,r){let t=o.documentElement;if(t.setAttribute(T,"1"),t.removeAttribute(to),r?t.setAttribute(Io,"1"):t.removeAttribute(Io),!o.getElementById(Er)){let e=o.createElement("style");e.id=Er,e.textContent=Da(),(o.head??t).append(e)}}function Xo(o){let r=o.documentElement;r.removeAttribute(T),r.removeAttribute(to),r.removeAttribute(Io),o.getElementById(Er)?.remove()}var xo=o=>o.documentElement.hasAttribute(T);function Sr(o){o.documentElement.setAttribute(to,"1")}function Pr(o,r={setTimeout:(t,e)=>setTimeout(t,e),clearTimeout:t=>clearTimeout(t)}){let t=!1,e,a=s=>{t||(t=!0,r.clearTimeout(n),r.clearTimeout(e),o(s))},n=r.setTimeout(()=>a("teto"),1e4);return{iniciarContagem(){t||(e=r.setTimeout(()=>a("prazo"),1500))},pronta(){t=!0,r.clearTimeout(n),r.clearTimeout(e)},falhou:s=>a(s),encerrada:()=>t}}var Be="http://www.w3.org/2000/svg",La={grade:[["rect",{x:"3.5",y:"4.5",width:"17",height:"15",rx:"2"}],["path",{d:"M3.5 9.5h17M9 9.5v10M3.5 14.5h17"}]],quadro:[["rect",{x:"3.5",y:"4.5",width:"4.6",height:"15",rx:"1.2"}],["rect",{x:"9.7",y:"4.5",width:"4.6",height:"9",rx:"1.2"}],["rect",{x:"15.9",y:"4.5",width:"4.6",height:"12",rx:"1.2"}]],lista:[["path",{d:"M8 6.5h12M8 12h12M8 17.5h12M4 6.5h.01M4 12h.01M4 17.5h.01"}]],agrupar:[["path",{d:"M4 6h16M4 12h10M4 18h13"}],["path",{d:"M18 10l3 2-3 2"}]],colunas:[["rect",{x:"3.5",y:"4.5",width:"17",height:"15",rx:"2"}],["path",{d:"M9.2 4.5v15M14.8 4.5v15"}]],disquete:[["path",{d:"M5 4.5h11l3.5 3.5v11a1.5 1.5 0 0 1-1.5 1.5H6.5A1.5 1.5 0 0 1 5 19z"}],["path",{d:"M8 4.5v5h7v-5M8 20v-6h8v6"}]],densidade:[["path",{d:"M4 6h16M4 10h16M4 14h16M4 18h16"}]],seta:[["path",{d:"M6 9l6 6 6-6"}]],setaDireita:[["path",{d:"M9 6l6 6-6 6"}]],desfazer:[["path",{d:"M9 14L4 9l5-5M4 9h10a6 6 0 0 1 0 12h-3"}]],bloquear:[["circle",{cx:"12",cy:"12",r:"8.5"}],["path",{d:"M6 6l12 12"}]],informacao:[["circle",{cx:"12",cy:"12",r:"8.5"}],["path",{d:"M12 11v5M12 8h.01"}]]};function ao(o,r=16,t=document){let e=t.createElementNS(Be,"svg"),a={viewBox:"0 0 24 24",width:String(r),height:String(r),fill:"none",stroke:"currentColor","stroke-width":"1.8","stroke-linecap":"round","stroke-linejoin":"round","aria-hidden":"true",focusable:"false",class:"spro-icone"};for(let[n,s]of Object.entries(a))e.setAttribute(n,s);for(let[n,s]of La[o]){let i=t.createElementNS(Be,n);for(let[c,p]of Object.entries(s))i.setAttribute(c,p);e.append(i)}return e}var wr="spro-grade-botao",za="#processosSEIPro .titlePanelHome, #processosSEIPro #divInfraBarraLocalizacao, #divInfraBarraLocalizacao.titlePanelHome, #divInfraBarraLocalizacao",$a="Usar a vis\xE3o nova do controle de processos",Ra="Voltar \xE0 vis\xE3o nativa do SEI";function Na(o,r,t){let e=o.querySelector(za);if(!e)return!1;let a=r?Ra:$a,n=e.querySelector(`.${wr}`);if(!n){n=o.createElement("button"),n.type="button",n.className=wr,n.addEventListener("click",i=>{i.preventDefault(),i.stopPropagation(),t()}),n.append(ao("grade",18,o));let s=e.querySelector(".spro-fav-recolher");s?s.before(n):e.append(n)}return n.title=a,n.setAttribute("aria-label",a),n.setAttribute("aria-pressed",String(r)),!0}var Qe=o=>{for(let r of o.querySelectorAll(`.${wr}`))r.remove()};function Ko(o,r,t){let e=()=>Na(o,r(),t);e();let a=o.defaultView?.MutationObserver;if(!a||!o.body)return()=>Qe(o);let n=!1,s=new a(()=>{n||(n=!0,queueMicrotask(()=>{n=!1,s.disconnect(),e(),s.observe(o.body,{childList:!0,subtree:!0})}))});return s.observe(o.body,{childList:!0,subtree:!0}),()=>{s.disconnect(),Qe(o)}}function X(o){return o.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/\s+/g," ").trim()}var _a=/<div(?: style="text-decoration: line-through;")?><i class="(far fa-square|fas fa-check-square)"><\/i> ?([\s\S]*?)<\/div>/g;function Ta(o){return o.includes("<div")?o.replace(_a,(r,t,e)=>`
${t==="far fa-square"?"[ ]":"[X]"} ${e}
`).replace(/\n{2,}/g,`
`).trim():o}var qa=/^Anota[\u00e7c][\u00e3a]o( com prioridade)?\s+\/\s+([\s\S]*)\s+\/\s+(.*)$/i;function Xe(o){let r=o.querySelector('a[href*="acao=anotacao_registrar"]');if(!r)return null;let t=r.querySelector("img")?.getAttribute("src")??"",e=/anotacao2\.|prioridade/i.test(t),a=qa.exec(r.getAttribute("aria-label")??"");if(a){let i=D(a[2]).replace(/\r\n?/g,`
`).trim();return i?{texto:i,autor:a[3].trim(),prioridade:!!a[1]||e}:null}let n=co(r.getAttribute("onmouseover")??"","infraTooltipMostrar")[0];if(typeof n?.[0]!="string")return null;let s=Ta(k(n[0])).trim();return s?{texto:s,autor:k(n[1]).trim(),prioridade:e}:null}function Ke(o,r,t){if(r){let a={idProcedimento:o,origem:"nativo",vencimento:r.data,idControlePrazo:r.idControlePrazo,sigla:r.sigla,linkNativo:r.link,...r.concluidoEm?{concluidoEm:r.concluidoEm}:{}};return t?.vencimento&&t.data===r.data?{...a,origem:"ambos",hora:t.hora,texto:t.texto||void 0}:a}if(!t)return null;let e={idProcedimento:o,origem:"marcador",hora:t.hora,texto:t.texto||void 0};return t.vencimento?{...e,vencimento:t.data}:{...e,inicio:t.data}}var Va='a[href*="acao=controle_prazo_definir"]',ja=/^Controle de Prazo\s*\/\s*(\S+)\s+(\d{2})\/(\d{2})\/(\d{4})\s*\(([^)]*)\)\s*$/s,Je=(o,r,t)=>`${t}-${r}-${o}`;function Fa(o){let r=o.trim().toLowerCase(),t=/^conclu[i\u00ED]do em (\d{2})\/(\d{2})\/(\d{4})$/.exec(r);return t?{estado:"concluido",concluidoEm:Je(t[1],t[2],t[3])}:/^at[e\u00E9] hoje$/.test(r)?{estado:"hoje"}:/^atrasado \d+ dias?$/.test(r)?{estado:"atrasado"}:/^\d+ dias?$/.test(r)?{estado:"noPrazo"}:null}function Mr(o){let r=o.querySelector(Va);if(!r)return null;let t=r.getAttribute("aria-label")??"";if(!t){let p=co(r.getAttribute("onmouseover")??"","infraTooltipMostrar")[0];typeof p?.[0]=="string"&&(t=`Controle de Prazo / ${k(p[0])}`)}let e=ja.exec(D(t).replace(/\s+/g," ").trim());if(!e)return null;let a=Fa(e[5]);if(!a)return null;let n=D(r.getAttribute("href")??""),s=N(n),i=s.get("id_controle_prazo")??"",c=s.get("id_procedimento")??o.id.replace(/^P/,"");return!i||!c?null:{idControlePrazo:i,idProcedimento:c,sigla:e[1],data:Je(e[2],e[3],e[4]),link:n,...a}}var Ze=/(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(\d{4})/,We=/\b([01]?\d|2[0-3]):([0-5]\d)\b/,Ye=new RegExp("(?<!\\p{L})at[e\\u00E9](?!\\p{L})","iu");function Ua(o,r,t){let e=`${t}-${r}-${o}`;try{return jo(Vo(e))===e?e:null}catch{return null}}var Ga=o=>o.padStart(2,"0");function kr(o){let r=o.replace(/\r\n?/g,`
`),t=Ze.exec(r);if(!t)return null;let e=Ua(t[1],t[2],t[3]);if(!e)return null;let a=We.exec(r),n=a?`${Ga(a[1])}:${a[2]}`:void 0,s=Ye.test(r),i=r.replace(Ye,"").replace(Ze,"");return a&&(i=i.replace(We,"")),i=i.replace(/[ \t]+/g," ").replace(/^[ \t]*\n+|\n+[ \t]*$/g,"").trim(),{data:e,hora:n,vencimento:s,texto:i}}function ot(o){let r=[];for(let t of o.querySelectorAll('a[href*="acao=andamento_marcador_gerenciar"]')){let e=co(t.getAttribute("onmouseover")??"","infraTooltipMostrar")[0];typeof e?.[0]=="string"&&r.push({texto:k(e[0]),nome:k(e[1])})}return r}function rt(o,r){let t=o.querySelector("input[type=checkbox]"),e=o.querySelector("a[href*='procedimento_trabalhar']");if(!t||!e)return null;let a=t.getAttribute("aria-label")??"",n=/^Sigiloso\b/.test(a)||/Sigiloso/.test(e.getAttribute("class")??""),s=[...o.querySelectorAll("td")],i=n?[]:[...s[1]?.querySelectorAll("a[aria-label]")??[]].map(c=>c.getAttribute("aria-label")??"");return{idProcedimento:t.getAttribute("value")??N(e.getAttribute("href")??"").get("id_procedimento")??"",protocolo:t.getAttribute("title")??C(e),grupo:r,tipo:/Tipo (.*?)(?: \/ Especifica|$)/.exec(a)?.[1]?.trim()??"",especificacao:n?"":/Especifica\S* (.*)$/.exec(a)?.[1]?.trim()??"",sigiloso:n,novo:/NaoVisualizado/.test(e.getAttribute("class")??""),atribuido:C(s[s.length-1]).replace(/^\(|\)$/g,""),sinais:i,documentoNovo:!!s[1]?.querySelector("img[src*='exclamacao']")||i.some(c=>/documento foi inclu/i.test(c))}}var Ha=/marcador_([a-z0-9_]+)\.svg/i;function Ba(o){let r=[];for(let t of o.querySelectorAll('a[href*="acao=andamento_marcador_gerenciar"]')){let e=co(t.getAttribute("onmouseover")??"","infraTooltipMostrar")[0],a=/^Marcador\s*\/\s*(.*)$/s.exec(D(t.getAttribute("aria-label")??"").trim()),n=(typeof e?.[1]=="string"&&e[1]?k(e[1]):a?.[1]??"").trim();n&&r.push({nome:n,cor:Ha.exec(t.querySelector("img")?.getAttribute("src")??"")?.[1]??"",texto:typeof e?.[0]=="string"?k(e[0]).trim():""})}return r}function Qa(o){let r=[];for(let t of o.querySelectorAll("a")){let e=t.querySelector("img")?.getAttribute("src")??"",a=/retorno_(programado|aguardando)(\d)?\.svg/.exec(e);if(!a)continue;let n=D(t.getAttribute("aria-label")??"").trim();r.push({tipo:a[1],descricao:n,atrasado:a[2]==="3"||/atrasad/i.test(n)})}return r}function Xa(o){let r=o.querySelector('a[href*="acao=procedimento_atribuicao_listar"], a.ancoraSigla'),t=r?.textContent?.trim();if(!r||!t)return;let e=D(r.getAttribute("title")??"").replace(/^Atribu[i\u00ED]do para\s+/i,"").trim();return{sigla:t,nome:e||t}}function Cr(o,r){let t=rt(o,r.grupo);if(!t?.idProcedimento)return null;let e=Ba(o),a=null;for(let c of ot(o)){let p=kr(c.texto);if(p){a=p;break}}let n={id:t.idProcedimento,protocolo:t.protocolo,grupo:r.grupo,tipo:t.tipo,especificacao:t.especificacao,sigiloso:t.sigiloso,naoVisualizado:t.novo,marcadores:t.sigiloso?[]:e,retornos:t.sigiloso?[]:Qa(o),acompanhamentoEspecial:!t.sigiloso&&!!o.querySelector('a[href*="acao=acompanhamento"] , img[src*="acompanhamento_especial"]'),documentoNovo:t.documentoNovo,pagina:r.pagina,naPaginaAtual:r.naPaginaAtual},s=o.querySelector('a[href*="acao=procedimento_trabalhar"]')?.getAttribute("href");s&&(n.link=D(s));let i=Xa(o);if(i&&(n.atribuicao=i),!t.sigiloso){let c=Xe(o);c&&(n.anotacao=c);let p=Ke(n.id,Mr(o),a);p&&(n.prazo=p)}return n}var tt="#tblProcessosRecebidos, #tblProcessosGerados, #tblProcessosDetalhado",Ka={recebidos:"tblProcessosRecebidos",gerados:"tblProcessosGerados"},Ja=[[/^tipo( do processo)?$/,"tipo"],[/^especificacao$/,"especificacao"],[/^(atribuicao|atribuido( para)?|responsavel)$/,"atribuicao"],[/^marcador(es)?$/,"marcador"],[/^prioridade$/,"prioridade"],[/^interessados?$/,"interessados"],[/^observacao$/,"observacao"],[/^ultima mov/,"ultimaMov"]];function Za(o){let r=new Map;return[...(o.querySelector("thead tr")??[...o.querySelectorAll("tr")].find(e=>e.querySelector("th")))?.children??[]].forEach((e,a)=>{let n=X(e.textContent??""),s=Ja.find(([i])=>i.test(n));s&&r.set(a,s[1])}),r}function et(o){let r=(o?.querySelector("caption")?.textContent??"").replace(/\s+/g," "),t=Number(/(\d+)\s+registro/.exec(r)?.[1]??0),e=/(\d+)\s+a\s+(\d+)\s*\)?/.exec(r);return{total:t,porPagina:e?Number(e[2])-Number(e[1])+1:0}}function Wa(o,r,t){if(!t.size)return;let e=[...r.children];for(let[a,n]of t){let s=(e[a]?.textContent??"").replace(/\s+/g," ").trim();if(s)if(n==="tipo"&&!o.tipo)o.tipo=s;else if(n==="especificacao"&&!o.especificacao&&!o.sigiloso)o.especificacao=s;else if(n==="atribuicao"&&!o.atribuicao){let i=s.replace(/^\(|\)$/g,"");o.atribuicao={sigla:i,nome:i}}else if(n==="marcador"&&!o.marcadores.length&&!o.sigiloso)o.marcadores=[{nome:s,cor:"",texto:""}];else{if(o.sigiloso&&(n==="interessados"||n==="observacao"))continue;if(n==="prioridade")o.prioridade=s;else if(n==="interessados")o.interessados=s;else if(n==="observacao")o.observacao=s;else if(n==="ultimaMov"){let i=/(\d{2})\/(\d{2})\/(\d{4})/.exec(s);i&&(o.ultimaMov=`${i[3]}-${i[2]}-${i[1]}`)}}}}function Ya(o){let r=o.querySelector("input[type=checkbox]")?.getAttribute("name")??"";return/^chkGerados/i.test(r)?"gerados":"recebidos"}function Jo(o,r={}){let t=r.pagina??0,e=r.naPaginaAtual??!0,a=[],n={recebidos:0,gerados:0},s={recebidos:0,gerados:0},i=o.getElementById("tblProcessosDetalhado"),c=new Set,p=m=>{m&&!c.has(m.id)&&(c.add(m.id),a.push(m))};for(let m of["recebidos","gerados"]){let f=o.getElementById(Ka[m]),{total:v,porPagina:A}=et(f);n[m]=v,s[m]=A;for(let b of f?.querySelectorAll('tr[id^="P"]')??[])p(Cr(b,{grupo:m,pagina:t,naPaginaAtual:e}))}if(i){let m=Za(i),{total:f,porPagina:v}=et(i);for(let A of i.querySelectorAll("tr")){if(!A.querySelector('a[href*="procedimento_trabalhar"]'))continue;let b=Ya(A),h=Cr(A,{grupo:b,pagina:t,naPaginaAtual:e});h&&!c.has(h.id)&&(Wa(h,A,m),p(h),n[b]=Math.max(n[b],f),s[b]=Math.max(s[b],v))}}return{processos:a,totais:n,porPagina:s,visao:i?"detalhada":"resumida"}}var on=60;async function at(o,r,t={}){let e=t.maxPaginas??on,a=[],n=new Set(o.processos.map(p=>p.id)),s=!0,i,c=!1;try{for(let p of["recebidos","gerados"]){let m=o.totais[p],f=o.processos.filter(b=>b.grupo===p).length,v=o.porPagina[p]||f||1,A=Math.max(1,Math.ceil(m/v));for(let b=1;f<m;b+=1){if(t.sinal?.aborted)return s=!1,{processos:a,completo:s,...i?{erro:i}:{}};if(b>=e){s=!1;break}c=!0;let h=await r.pagina(p,b,t.sinal),y=Jo(h,{pagina:b,naPaginaAtual:!1}).processos.filter(w=>w.grupo===p&&!n.has(w.id));if(!y.length)break;for(let w of y)n.add(w.id);f+=y.length,a.push(...y),t.aoPagina?.(y),t.aoProgresso?.({grupo:p,paginasLidas:b+1,paginasTotal:A,processos:f,total:m})}f<m&&(s=!1)}}catch(p){s=!1,i=p instanceof Error?p.message:String(p)}finally{if(c)try{await r.restaurar()}catch(p){i??=`N\xE3o foi poss\xEDvel voltar \xE0 primeira p\xE1gina: ${p instanceof Error?p.message:String(p)}`}}return{processos:a,completo:s,...i?{erro:i}:{}}}var rn=["hdnRecebidosItensSelecionados","hdnGeradosItensSelecionados","hdnRecebidosItemId","hdnGeradosItemId"];function nt(o,r){let t="#frmProcedimentoControlar",e=()=>({hdnRecebidosPaginaAtual:"0",hdnGeradosPaginaAtual:"0",...Object.fromEntries(rn.map(a=>[a,""]))});return{async pagina(a,n,s){let i=a==="recebidos"?"hdnRecebidosPaginaAtual":"hdnGeradosPaginaAtual";return(await z.de(r,t,o).definir({...e(),[i]:String(n)}).enviar({sinal:s,aceitarValidacao:!0})).doc},async restaurar(a){await z.de(r,t,o).definir(e()).enviar({sinal:a,aceitarValidacao:!0})}}}var en=30*6e4,st=5e3,Or=()=>({vistoEm:{}});function ct(o){if(!o||typeof o!="object")return Or();let r=o,t={};if(r.vistoEm&&typeof r.vistoEm=="object")for(let[i,c]of Object.entries(r.vistoEm))typeof c=="number"&&Number.isFinite(c)&&c>0&&(t[i]=c);let e=i=>typeof i=="number"&&Number.isFinite(i)?i:void 0,a={vistoEm:t},n=e(r.visitaAtual),s=e(r.visitaAnterior);return n!==void 0&&(a.visitaAtual=n),s!==void 0&&(a.visitaAnterior=s),a}function pt(o,r){return o.visitaAtual===void 0?{...o,visitaAtual:r}:r-o.visitaAtual>en?{...o,visitaAnterior:o.visitaAtual,visitaAtual:r}:o}function Ir(o,r,t,e){let a={...o.vistoEm};for(let s of r)a[s]===void 0&&(a[s]=t);if(e){let s=new Set(r);for(let i of Object.keys(a))s.has(i)||delete a[i]}let n=Object.keys(a);if(n.length>st)for(let s of n.sort((i,c)=>a[c]-a[i]).slice(st))delete a[s];return{...o,vistoEm:a}}function lt(o,r){return o.map(t=>r.vistoEm[t.id]!==void 0?{...t,vistoEm:r.vistoEm[t.id]}:t)}function vo(o){if(o===null)return"";if(o<1)return"hoje";if(o===1)return"1 dia";if(o<60)return`${o} dias`;let r=Math.floor(o/30);return r<24?`${r} meses`:`${Math.floor(o/365)} anos`}var dt="Contado desde a primeira vez que o SEI Pro viu o processo nesta unidade (o SEI n\xE3o informa a data de chegada).";var bo=["processo","tipo","especificacao","responsavel","marcadores","prazo","anotacao","caixa","parado","sinais"],mo={processo:"Processo",tipo:"Tipo",especificacao:"Especifica\xE7\xE3o",responsavel:"Respons\xE1vel",marcadores:"Marcadores",prazo:"Prazo",anotacao:"Anota\xE7\xE3o",caixa:"Na caixa",parado:"Parado h\xE1",sinais:"Sinais"};var tn=30,an=40,nn=()=>({colunas:"marcador",limite:0,raiasPorResponsavel:!1}),sn=["processo","tipo","responsavel","marcadores","prazo","anotacao"];function Ao(){return{id:"",nome:"Padr\xE3o",busca:"",ordem:[],agrupar:"nenhum",modo:"tabela",colunas:[...sn],densidade:"confortavel",quadro:nn()}}var cn=["nenhum","responsavel","tipo","marcador","prazo","situacao","grupo","anotacao","acompanhamento","retorno","caixa"],pn=["protocolo","tipo","responsavel","marcador","prazo","caixa","parado","novo"],ln=["marcador","responsavel","prazo","tipo"];function Zo(o){let r=Ao();if(!o||typeof o!="object")return r;let t=o,e=Array.isArray(t.ordem)?t.ordem.filter(s=>!!s&&typeof s=="object"&&pn.includes(s.campo)).slice(0,4).map(s=>({campo:s.campo,decrescente:s.decrescente===!0})):[],a=Array.isArray(t.colunas)?[...new Set(t.colunas.filter(s=>bo.includes(s)))]:[],n=t.quadro&&typeof t.quadro=="object"?t.quadro:{};return{id:typeof t.id=="string"?t.id:"",nome:typeof t.nome=="string"&&t.nome.trim()?t.nome.trim().slice(0,an):r.nome,busca:typeof t.busca=="string"?t.busca.slice(0,500):"",ordem:e,agrupar:cn.includes(t.agrupar)?t.agrupar:"nenhum",modo:t.modo==="quadro"?"quadro":"tabela",colunas:a.length?a:r.colunas,densidade:t.densidade==="compacta"?"compacta":"confortavel",quadro:{colunas:ln.includes(n.colunas)?n.colunas:"marcador",limite:typeof n.limite=="number"&&n.limite>0?Math.min(99,Math.floor(n.limite)):0,raiasPorResponsavel:n.raiasPorResponsavel===!0}}}function ut(o,r,t){let e=Zo(r),a=e.id?o.findIndex(s=>s.id===e.id):-1;if(a>=0){let s=[...o];return s[a]=e,{lista:s,visao:e}}if(o.length>=tn)return null;let n={...e,id:t()};return{lista:[...o,n],visao:n}}var mt=(o,r)=>o.filter(t=>t.id!==r);function ft(o,r){let t=e=>JSON.stringify({...e,id:"",nome:""});return t(o)!==t(r)}var Wo="spro_grade_v_ids",Yo=o=>`spro_grade_v:${o}`,dn=o=>`spro_grade:${o||"x"}`;function un(){return{visao:Ao(),idade:Or(),recolhidos:[]}}function mn(o){if(!o||typeof o!="object")return un();let r=o;return{visao:Zo(r.visao),idade:ct(r.idade),recolhidos:Array.isArray(r.recolhidos)?r.recolhidos.filter(t=>typeof t=="string").slice(0,200):[]}}function gt(o,r){let{local:t,sync:e}=o,a=dn(r);async function n(){return mn((await t.obter(a))[a])}async function s(p){let m=await n();await t.gravar({[a]:{...m,...p}})}async function i(){let p=(await e.obter(Wo))[Wo],m=Array.isArray(p)?p.filter(v=>typeof v=="string"):[];if(!m.length)return[];let f=await e.obter(m.map(Yo));return m.flatMap(v=>{let A=f[Yo(v)];return A?[{...Zo(A),id:v}]:[]})}async function c(p,m=[]){let f=new Set(p.map(b=>b.id)),v={[Wo]:p.map(b=>b.id)};for(let b of p)v[Yo(b.id)]=b;await e.gravar(v);let A=m.filter(b=>!f.has(b.id)).map(b=>Yo(b.id));A.length&&await e.remover(A)}return{lerEstado:n,gravarVisao:p=>s({visao:p}),gravarIdade:p=>s({idade:p}),gravarRecolhidos:p=>s({recolhidos:p}),lerVisoes:i,gravarVisoes:c,aoMudarVisoes:p=>e.aoMudar(m=>Wo in m||Object.keys(m).some(f=>f.startsWith("spro_grade_v:"))?p():void 0)}}function ht(o){let r=t=>{let e=/^[=+\-@\t\r]/.test(t)?`'${t}`:t;return/[;"\n\r]/.test(e)?`"${e.replace(/"/g,'""')}"`:e};return`\uFEFF${o.map(t=>t.map(r).join(";")).join(`\r
`)}`}var xt="#tblProcessosRecebidos input[type=checkbox], #tblProcessosGerados input[type=checkbox], #tblProcessosDetalhado input[type=checkbox]",Dr=o=>o.getAttribute("value")??o.closest("tr")?.id.replace(/^P/,"")??"";function Lr(o){let r=new Set;for(let t of o.querySelectorAll(xt))t.checked&&Dr(t)&&r.add(Dr(t));return r}function vt(o,r){let t=new Set(r);for(let e of o.querySelectorAll(xt)){let a=Dr(e);a&&(t.delete(a),!e.disabled&&!!e.checked!==r.has(a)&&e.click())}return[...t]}function bt(o,r){let t=!1,e=()=>{t||(t=!0,queueMicrotask(()=>{t=!1,r(Lr(o))}))};return o.addEventListener("click",e,!0),o.addEventListener("change",e,!0),()=>{o.removeEventListener("click",e,!0),o.removeEventListener("change",e,!0)}}function fn(o){return/acaoControleProcessos\(\s*['"][^'"]*['"]\s*,\s*true/.test(o.elemento.getAttribute("onclick")??"")}function At(o,r){return fn(o)&&r===0?{ok:!1,motivo:"Marque ao menos um processo."}:(o.elemento.click(),{ok:!0})}var gn=o=>o instanceof Error?o.message:String(o);function yt(o){if(o.tipo==="atribuicao")return{...o,para:o.de,de:o.para};let r={tipo:"marcador",id:o.id,protocolo:o.protocolo};return o.adicionar&&(r.remover=o.adicionar),o.remover&&(r.adicionar=o.remover,o.texto&&(r.texto=o.texto)),r}async function hn(o,r){try{if(o.tipo==="atribuicao")return await r.atribuir(o.protocolo,o.para),{ok:!0,desfazer:yt(o)};if(o.adicionar&&await r.marcador(o.protocolo,{marcador:o.adicionar,...o.texto?{texto:o.texto}:{}}),o.remover)try{await r.marcador(o.protocolo,{marcador:o.remover,remover:!0})}catch(t){throw o.adicionar&&await r.marcador(o.protocolo,{marcador:o.adicionar,remover:!0}).catch(()=>{}),t}return{ok:!0,desfazer:yt(o)}}catch(t){return{ok:!1,erro:gn(t)}}}function Et(o){let r=Promise.resolve();return{mover(t){let e=r.then(()=>hn(t,o));return r=e.catch(()=>{}),e}}}var or=o=>`${o} ${Math.abs(o)===1?"dia":"dias"}`,St=Number.MAX_SAFE_INTEGER;function zr(o,r){let t=[r];return o.hora&&o.vencimento&&(t[0]=r.replace(/\.$/,"")+` \xE0s ${o.hora}.`),o.texto&&t.push(o.texto),o.sigla&&t.push(`Definido por ${o.sigla} no controle de prazo do SEI.`),t.join(`
`)}function Pt(o,r){let t=o.vencimento;if(o.concluidoEm&&t)return{situacao:"concluido",texto:`conclu\xEDdo em ${ro(o.concluidoEm).slice(0,5)}`,dica:zr(o,`Prazo de ${ro(t)} conclu\xEDdo em ${ro(o.concluidoEm)}.`),ordem:St,sorter:`${t} 23:59:59`};if(t){let s=Oo(r,t),i=`${t} ${o.hora??"23:59"}:00`,c=zr(o,`Vence em ${ro(t)}.`);return s===0?{situacao:"hoje",texto:"vence hoje",dica:c,ordem:0,sorter:i}:s<0?{situacao:"atrasado",texto:`${or(-s)} de atraso`,dica:c,ordem:s,sorter:i}:{situacao:"noPrazo",texto:`vence em ${or(s)}`,dica:c,ordem:s,sorter:i}}let e=o.inicio??r,a=Oo(e,r);return{situacao:"desde",texto:a===0?"hoje":a>0?`h\xE1 ${or(a)}`:`em ${or(-a)}`,dica:zr(o,`Contando desde ${ro(e)}.`),ordem:St-1,sorter:`${e} ${o.hora??"23:59"}:00`}}function F(o,r){return o.prazo?Pt(o.prazo,r.hoje):null}function K(o,r){return o.vistoEm===void 0?null:Math.max(0,Math.floor((r.agora-o.vistoEm)/864e5))}function po(o,r){return o.ultimaMov?Math.max(0,Oo(o.ultimaMov,r.hoje)):null}function wt(o,r){return r.visitaAnterior!==void 0&&o.vistoEm!==void 0&&o.vistoEm>r.visitaAnterior}function Do(o,r){let t=F(o,r);return!t||t.situacao==="concluido"||t.situacao==="desde"?null:t.ordem}var xn={resp:"resp",responsavel:"resp",atribuido:"resp",atribuicao:"resp",tipo:"tipo",marcador:"marcador",marcadores:"marcador",marc:"marcador",espec:"espec",especificacao:"espec",anot:"anot",anotacao:"anot",nota:"anot",prazo:"prazo",caixa:"caixa",idade:"caixa",novo:"novo",sigilo:"sigilo",sigiloso:"sigilo",grupo:"grupo",retorno:"retorno",protocolo:"protocolo",proc:"protocolo",processo:"protocolo",parado:"parado",mov:"parado",prio:"prio",prioridade:"prio",interessado:"interessado",interessados:"interessado"};function Nr(o){let r=[],t="",e=!1;for(let a of o)a==='"'?(e=!e,t+=a):/\s/.test(a)&&!e?(t&&r.push(t),t=""):t+=a;return t&&r.push(t),r}var vn=o=>o.replace(/^"|"$/g,"");function _r(o){let r=[],t=[];for(let e of Nr(o)){let a=e,n=!1;a.startsWith("-")&&a.length>1&&(n=!0,a=a.slice(1));let s,i=/^([a-zA-Z\u00C0-\u017F]+):(.*)$/.exec(a);if(i){let f=xn[X(i[1])];f&&(s=f,a=i[2])}let c="=";s&&/^[<>]/.test(a)&&(c=a[0],a=a.slice(1));let p=X(vn(a));if(!p&&!s)continue;let m={...s?{campo:s}:{},valor:p,original:e,negado:n,comparador:c};r.push(m),t.push({texto:e,termo:m})}return{termos:r,tokens:t}}var bn=o=>X([o.protocolo,o.protocolo.replace(/\D/g,""),o.tipo,o.especificacao,o.atribuicao?.sigla,o.atribuicao?.nome,...o.marcadores.flatMap(r=>[r.nome,r.texto]),o.anotacao?.texto,o.prazo?.texto,o.prioridade,o.interessados,o.observacao].filter(Boolean).join(" ")),J=(o,r)=>X(o??"").includes(r),Mt=/^(s|sim|1|true|yes)$/;function $r(o){let r=/^(\d+)\s*(d|dia|dias)?$/.exec(o);return r?Number(r[1]):null}function Rr(o,r,t){return o===null?!1:r==="<"?o<t:r===">"?o>t:o===t}function An(o,r,t){let e=F(o,t),a=r.valor;if(a==="sem"||a==="nenhum"||a==="nao")return!o.prazo;if(a==="com"||a==="sim")return!!o.prazo;if(!e)return!1;if(a==="atrasado"||a==="atrasados"||a==="vencido")return e.situacao==="atrasado";if(a==="hoje")return e.situacao==="hoje";if(a==="concluido"||a==="concluidos")return e.situacao==="concluido";if(a==="semana"){let s=Do(o,t);return s!==null&&s>=0&&s<=7}let n=$r(a);return n!==null?Rr(Do(o,t),r.comparador==="="?"<":r.comparador,n):J(o.prazo?.texto,a)}function yn(o,r,t){let e=r.valor;switch(r.campo){case"resp":return e==="sem"||e==="ninguem"?!o.atribuicao:e==="eu"?!!t.eu&&X(o.atribuicao?.sigla??"")===X(t.eu):J(o.atribuicao?.sigla,e)||J(o.atribuicao?.nome,e);case"tipo":return J(o.tipo,e);case"marcador":return e==="sem"||e==="nenhum"?o.marcadores.length===0:e==="com"?o.marcadores.length>0:o.marcadores.some(a=>J(a.nome,e)||J(a.texto,e));case"espec":return J(o.especificacao,e);case"anot":return e==="sem"||e==="nao"?!o.anotacao:e==="com"||e==="sim"?!!o.anotacao:e==="prioridade"||e==="prioritaria"?!!o.anotacao?.prioridade:J(o.anotacao?.texto,e);case"prazo":return An(o,r,t);case"caixa":{let a=$r(e);return a===null?!1:Rr(K(o,t),r.comparador==="="?">":r.comparador,a)}case"novo":return e==="visita"?wt(o,t):Mt.test(e)?o.naoVisualizado:e==="nao"?!o.naoVisualizado:!1;case"sigilo":return Mt.test(e)?o.sigiloso:!o.sigiloso;case"grupo":return e.startsWith("rec")?o.grupo==="recebidos":e.startsWith("ger")?o.grupo==="gerados":!1;case"retorno":return e==="sem"||e==="nao"?o.retornos.length===0:e==="atrasado"?o.retornos.some(a=>a.atrasado):e==="aguardando"?o.retornos.some(a=>a.tipo==="aguardando"):e==="programado"?o.retornos.some(a=>a.tipo==="programado"):o.retornos.length>0;case"parado":{let a=$r(e);return a===null?!1:Rr(po(o,t),r.comparador==="="?">":r.comparador,a)}case"prio":return J(o.prioridade,e);case"interessado":return J(o.interessados,e);case"protocolo":return X(o.protocolo).includes(e)||o.protocolo.replace(/\D/g,"").includes(e.replace(/\D/g,"")||"\0");default:return!0}}function En(o,r,t){if(!o.termos.length)return!0;let e;for(let a of o.termos){let n;if(a.campo?n=yn(r,a,t):(e??=bn(r),n=e.includes(a.valor)),a.negado?n:!n)return!1}return!0}var kt=(o,r,t)=>{let e=_r(r);return e.termos.length?o.filter(a=>En(e,a,t)):o};function Tr(o,r){return Nr(o).filter(t=>t!==r).join(" ")}function Ct(o,r,t){let e=/\s/.test(t)?`"${t}"`:t,a=`${r}:${e}`,n=Nr(o);return n.includes(a)?o:[...n,a].join(" ")}var Sn=new Intl.Collator("pt-BR",{sensitivity:"base",numeric:!0});function Pn(o,r=[]){return[...o.values()].sort((t,e)=>{let a=r.indexOf(t.chave),n=r.indexOf(e.chave);return a>=0||n>=0?(a<0?-1:a)-(n<0?-1:n):Sn.compare(t.rotulo,e.rotulo)})}function $(o,r,t,e){let a=o.get(r);return a||(a={chave:r,rotulo:t,itens:[],...e?{tom:e}:{}},o.set(r,a)),a}var yo=[["atrasado","Atrasados","perigo"],["hoje","Vencem hoje","aviso"],["semana","Pr\xF3ximos 7 dias","aviso"],["mes","Pr\xF3ximos 30 dias","neutro"],["depois","Depois de 30 dias","neutro"],["desde","Contando desde uma data","neutro"],["concluido","Prazo conclu\xEDdo","neutro"],["sem","Sem prazo","neutro"]];function Lo(o,r){let t=F(o,r);if(!t)return"sem";if(t.situacao==="concluido")return"concluido";if(t.situacao==="desde")return"desde";if(t.situacao==="atrasado")return"atrasado";if(t.situacao==="hoje")return"hoje";let e=Do(o,r)??0;return e<=7?"semana":e<=30?"mes":"depois"}var Ot=[["recente","Chegaram hoje"],["semana","Nos \xFAltimos 7 dias"],["mes","Nos \xFAltimos 30 dias"],["antigo","H\xE1 mais de 30 dias"],["desconhecido","Sem registro"]];function wn(o,r){let t=K(o,r);return t===null?"desconhecido":t<1?"recente":t<=7?"semana":t<=30?"mes":"antigo"}function fo(o,r){return r.map(t=>o.get(t[0])).filter(t=>!!t)}function rr(o,r,t){if(r==="nenhum")return[{chave:"todos",rotulo:"Todos",itens:o}];let e=new Map;for(let a of o)switch(r){case"responsavel":a.atribuicao?$(e,`u:${a.atribuicao.sigla}`,a.atribuicao.nome===a.atribuicao.sigla?a.atribuicao.sigla:`${a.atribuicao.nome} (${a.atribuicao.sigla})`).itens.push(a):$(e,"sem","Sem respons\xE1vel").itens.push(a);break;case"tipo":$(e,`t:${a.tipo||"-"}`,a.tipo||"Sem tipo").itens.push(a);break;case"marcador":if(a.marcadores.length)for(let n of a.marcadores)$(e,`m:${n.nome}`,n.nome).itens.push(a);else $(e,"sem","Sem marcador").itens.push(a);break;case"prazo":{let n=Lo(a,t),s=yo.find(i=>i[0]===n);$(e,n,s[1],s[2]).itens.push(a);break}case"situacao":a.naoVisualizado?$(e,"novo","N\xE3o visualizados","aviso").itens.push(a):$(e,"lido","Visualizados").itens.push(a);break;case"grupo":$(e,a.grupo,a.grupo==="recebidos"?"Recebidos":"Gerados").itens.push(a);break;case"anotacao":a.anotacao?.prioridade?$(e,"prio","Anota\xE7\xE3o com prioridade","aviso").itens.push(a):a.anotacao?$(e,"com","Com anota\xE7\xE3o").itens.push(a):$(e,"sem","Sem anota\xE7\xE3o").itens.push(a);break;case"acompanhamento":a.acompanhamentoEspecial?$(e,"com","Em acompanhamento especial").itens.push(a):$(e,"sem","Fora do acompanhamento especial").itens.push(a);break;case"retorno":a.retornos.some(n=>n.atrasado)?$(e,"atrasado","Retorno atrasado","perigo").itens.push(a):a.retornos.some(n=>n.tipo==="aguardando")?$(e,"aguardando","Aguardando retorno").itens.push(a):a.retornos.length?$(e,"programado","Retorno programado").itens.push(a):$(e,"sem","Sem retorno").itens.push(a);break;case"caixa":{let n=wn(a,t);$(e,n,Ot.find(s=>s[0]===n)[1]).itens.push(a);break}}return r==="prazo"?fo(e,yo):r==="caixa"?fo(e,Ot):r==="situacao"?fo(e,[["novo",""],["lido",""]]):r==="grupo"?fo(e,[["recebidos",""],["gerados",""]]):r==="anotacao"?fo(e,[["prio",""],["com",""],["sem",""]]):r==="acompanhamento"?fo(e,[["com",""],["sem",""]]):r==="retorno"?fo(e,[["atrasado",""],["aguardando",""],["programado",""],["sem",""]]):Pn(e,["sem"])}var qr={nenhum:"Sem agrupamento",responsavel:"Respons\xE1vel",tipo:"Tipo de processo",marcador:"Marcador",prazo:"Prazo",situacao:"Visualiza\xE7\xE3o",grupo:"Recebidos e gerados",anotacao:"Anota\xE7\xE3o",acompanhamento:"Acompanhamento especial",retorno:"Retorno programado",caixa:"Tempo na caixa"};var Mn=new Intl.Collator("pt-BR",{sensitivity:"base",numeric:!0});function er(o,r){let t=new Map;for(let e of o)for(let a of r(e)){let n=t.get(a.valor)??{valor:a.valor,rotulo:a.rotulo,n:0};n.n+=1,t.set(a.valor,n)}return[...t.values()].sort((e,a)=>a.n-e.n||Mn.compare(e.rotulo,a.rotulo))}function It(o,r){let t=er(o,e=>{let a=Lo(e,r),n=yo.find(i=>i[0]===a)[1],s=a==="atrasado"?"atrasado":a==="hoje"?"hoje":a==="semana"?"semana":a==="sem"?"sem":a==="concluido"?"concluido":"";return s?[{valor:s,rotulo:n}]:[]});return{responsaveis:er(o,e=>e.atribuicao?[{valor:e.atribuicao.sigla,rotulo:`${e.atribuicao.nome} (${e.atribuicao.sigla})`}]:[{valor:"sem",rotulo:"Sem respons\xE1vel"}]),tipos:er(o,e=>e.tipo?[{valor:e.tipo,rotulo:e.tipo}]:[]),marcadores:er(o,e=>e.marcadores.length?e.marcadores.map(a=>({valor:a.nome,rotulo:a.nome})):[{valor:"sem",rotulo:"Sem marcador"}]),prazos:t}}function Vr(o){let r=[];o.sigiloso&&r.push("Sigiloso"),o.naoVisualizado&&r.push("N\xE3o visualizado"),o.documentoNovo&&r.push("Documento novo"),o.acompanhamentoEspecial&&r.push("Acompanhamento especial");for(let t of o.retornos)r.push(`${t.tipo==="aguardando"?"Aguardando retorno":"Retorno programado"}${t.atrasado?" (atrasado)":""}`);return r}function jr(o,r){let t=F(o,r);if(!o.prazo||!t)return"";let e=o.prazo.vencimento??o.prazo.inicio;return`${e?ro(e):""}${o.prazo.hora?` ${o.prazo.hora}`:""} (${t.texto})`.trim()}var kn=(o,r,t)=>{switch(r){case"processo":return o.protocolo;case"tipo":return o.tipo;case"especificacao":return o.especificacao;case"responsavel":return o.atribuicao?o.atribuicao.nome===o.atribuicao.sigla?o.atribuicao.sigla:`${o.atribuicao.nome} (${o.atribuicao.sigla})`:"";case"marcadores":return o.marcadores.map(e=>e.texto?`${e.nome}: ${e.texto}`:e.nome).join("; ");case"prazo":return jr(o,t);case"anotacao":return o.anotacao?.texto.replace(/\s*\n\s*/g," / ")??"";case"caixa":return vo(K(o,t));case"parado":return vo(po(o,t));case"sinais":return Vr(o).join("; ")}};function Dt(o,r,t){return[r.map(e=>mo[e]),...o.map(e=>r.map(a=>kn(e,a,t)))]}var Lt=o=>`processos-${o}.csv`;function zt(o,r,t){let e=[];for(let a of o){let n=t&&r.has(a.chave);if(t&&e.push({tipo:"grupo",grupo:a,recolhido:n}),!n)for(let s of a.itens)e.push({tipo:"processo",processo:s,grupo:a.chave})}return e}var Fr=new Intl.Collator("pt-BR",{numeric:!0,sensitivity:"base"});function $t(o){let r=/(\d+)\/(\d{4})-\d+\s*$/.exec(o);if(!r)return null;let t=/(\d+)\s*$/.exec(r[1].split(/[.-]/).pop()??"")?.[1]??r[1];return[Number(r[2]),Number(t)]}function Cn(o,r){let t=$t(o),e=$t(r);return t&&e&&(t[0]-e[0]||t[1]-e[1])||Fr.compare(o,r)}function Rt(o,r,t){switch(r){case"tipo":return o.tipo||null;case"responsavel":return o.atribuicao?.sigla??null;case"marcador":return o.marcadores[0]?.nome??null;case"prazo":{let e=F(o,t);return e?e.ordem:null}case"caixa":return K(o,t);case"parado":return po(o,t);case"novo":return o.naoVisualizado?0:1}}function On(o,r){return(t,e)=>{for(let a of o){let n;if(a.campo==="protocolo")n=Cn(t.protocolo,e.protocolo),a.decrescente&&(n=-n);else{let s=Rt(t,a.campo,r),i=Rt(e,a.campo,r);if(s===null&&i===null)continue;if(s===null)return 1;if(i===null)return-1;n=typeof s=="number"&&typeof i=="number"?s-i:Fr.compare(String(s),String(i)),a.decrescente&&(n=-n)}if(n)return n}return 0}}function Nt(o,r,t){return r.length?[...o].sort(On(r,t)):o}function Ur(o,r,t){let e=o.findIndex(s=>s.campo===r),a=e<0?{campo:r,decrescente:!1}:o[e].decrescente?null:{campo:r,decrescente:!0};if(!t)return a?[a]:[];if(e<0)return[...o,a];let n=[...o];return a?n[e]=a:n.splice(e,1),n}var Gr=new Intl.Collator("pt-BR",{sensitivity:"base",numeric:!0}),Z="sem";function _t(o,r,t,e={}){let a=new Map,n=(i,c,p,m,f)=>{let v=a.get(i);return v||(v={chave:i,titulo:c,itens:[],aceitaSoltar:p,excedeu:!1,...m?{motivoSomenteLeitura:m}:{},...f?{tom:f}:{}},a.set(i,v)),v};if(r.colunas==="marcador"){n(Z,"Sem marcador",!0);for(let i of[...e.marcadores??[]].sort(Gr.compare))n(`m:${i}`,i,!0);for(let i of o){i.marcadores.length||n(Z,"Sem marcador",!0).itens.push(i);for(let c of i.marcadores)n(`m:${c.nome}`,c.nome,!0).itens.push(i)}}else if(r.colunas==="responsavel"){n(Z,"Sem respons\xE1vel",!0);for(let i of e.responsaveis??[])n(`u:${i.sigla}`,`${i.nome} (${i.sigla})`,!0);for(let i of o)i.atribuicao?n(`u:${i.atribuicao.sigla}`,`${i.atribuicao.nome} (${i.atribuicao.sigla})`,!0).itens.push(i):n(Z,"Sem respons\xE1vel",!0).itens.push(i)}else if(r.colunas==="prazo"){for(let[i,c,p]of yo)i!=="desde"&&n(i,c,!1,"O prazo \xE9 definido pelo bot\xE3o de prazo, n\xE3o arrastando.",p);for(let i of o){let c=Lo(i,t);n(c==="desde"?"sem":c,"",!1).itens.push(i)}}else for(let i of o)n(`t:${i.tipo}`,i.tipo||"Sem tipo",!1,"O tipo do processo n\xE3o muda arrastando.").itens.push(i);let s=[...a.values()];if(r.colunas==="prazo"&&(s=s.filter(i=>i.itens.length||i.titulo)),r.colunas==="marcador"||r.colunas==="responsavel"?s.sort((i,c)=>i.chave===Z?-1:c.chave===Z?1:Gr.compare(i.titulo,c.titulo)):r.colunas==="tipo"&&s.sort((i,c)=>Gr.compare(i.titulo,c.titulo)),r.limite>0)for(let i of s)i.excedeu=i.itens.length>r.limite;return s}var tr=o=>o.slice(o.indexOf(":")+1);function Tt(o,r,t,e){if(t===e)return{ok:!1,motivo:"Mesma coluna."};if(o==="marcador"){let a=t===Z?void 0:tr(t),n=e===Z?void 0:tr(e);if(a&&!r.marcadores.some(p=>p.nome===a))return{ok:!1,motivo:"O processo j\xE1 n\xE3o tem esse marcador."};let s=n?r.marcadores.some(p=>p.nome===n):!1,i=a?r.marcadores.find(p=>p.nome===a)?.texto:void 0,c={tipo:"marcador",id:r.id,protocolo:r.protocolo};return a&&(c.remover=a),n&&!s&&(c.adicionar=n,i&&(c.texto=i)),!c.remover&&!c.adicionar?{ok:!1,motivo:"Nada a mudar."}:{ok:!0,movimento:c}}return o==="responsavel"?{ok:!0,movimento:{tipo:"atribuicao",id:r.id,protocolo:r.protocolo,para:e===Z?null:tr(e),de:t===Z?null:tr(t)}}:{ok:!1,motivo:"Esta divis\xE3o do quadro \xE9 s\xF3 de leitura."}}function Hr(o,r,t={}){if(r.tipo==="atribuicao"){if(r.para===null){let{atribuicao:a,...n}=o;return n}return{...o,atribuicao:{sigla:r.para,nome:t[r.para]??r.para}}}let e=o.marcadores;return r.remover&&(e=e.filter(a=>a.nome!==r.remover)),r.adicionar&&(e=[...e,{nome:r.adicionar,cor:"",texto:r.texto??""}]),{...o,marcadores:e}}var Br="application/x-spro-cartao";function In(o,r,t){let e=F(o,t.ctx),a=d("input",{type:"checkbox",class:"spro-cb","aria-label":`Marcar ${o.protocolo}`,disabled:!o.naPaginaAtual});a.checked=t.selecionados.has(o.id),a.addEventListener("change",()=>t.aoSelecionar(o.id,a.checked));let n=d("div",{class:`spro-cartao${a.checked?" spro-sel":""}`,draggable:"true","data-id":o.id,"data-de":r},d("div",{class:"spro-cartao-topo"},a,d("a",{class:`spro-proc${o.naoVisualizado?" spro-novo":""}`,href:o.link??"#",draggable:"false"},o.protocolo)),o.tipo?d("div",{class:"spro-cartao-tipo"},o.tipo):null,o.especificacao?d("div",{class:"spro-cartao-espec"},o.especificacao):null,d("div",{class:"spro-cartao-rodape"},e?d("span",{class:`spro-prazo spro-prazo-${e.situacao}`,title:e.dica},e.texto):null,o.atribuicao?d("span",{class:"spro-avatar",title:o.atribuicao.nome},o.atribuicao.sigla.slice(0,2).toUpperCase()):null));return n.addEventListener("dragstart",s=>{s.dataTransfer?.setData(Br,JSON.stringify({id:o.id,de:r})),s.dataTransfer?.setData("text/plain",o.protocolo),s.dataTransfer&&(s.dataTransfer.effectAllowed="move"),n.classList.add("spro-arrastando")}),n.addEventListener("dragend",()=>n.classList.remove("spro-arrastando")),n}function Dn(o,r){let t=d("div",{class:"spro-col-corpo"},...o.itens.map(s=>In(s,o.chave,r)));o.itens.length||t.append(d("div",{class:"spro-col-vazia"},o.aceitaSoltar?"Solte aqui":"Vazia"));let e=r.cfg.limite,a=d("div",{class:"spro-col-topo"},d("span",{class:"spro-col-titulo",title:o.titulo},o.titulo),d("span",{class:`spro-col-n${o.excedeu?" spro-excedeu":""}`,title:o.excedeu?`Passou do limite de ${e}`:void 0},e>0?`${o.itens.length}/${e}`:String(o.itens.length)),o.aceitaSoltar?null:d("span",{class:"spro-col-trava",title:o.motivoSomenteLeitura},ao("bloquear",13))),n=d("section",{class:`spro-col${o.tom?` spro-tom-${o.tom}`:""}${o.excedeu?" spro-col-cheia":""}`,"data-chave":o.chave},a,t);return n.addEventListener("dragover",s=>{s.dataTransfer?.types.includes(Br)&&o.aceitaSoltar&&(s.preventDefault(),n.classList.add("spro-alvo"))}),n.addEventListener("dragleave",()=>n.classList.remove("spro-alvo")),n.addEventListener("drop",s=>{n.classList.remove("spro-alvo");let i=s.dataTransfer?.getData(Br);if(i){s.preventDefault();try{let{id:c,de:p}=JSON.parse(i);r.aoMover(c,p,o.chave)}catch{}}}),n}function qt(o){let r=d("div",{class:"spro-quadro"}),t=e=>d("div",{class:"spro-colunas"},..._t(e,o.cfg,o.ctx,o.extras).map(a=>Dn(a,o)));if(o.cfg.raiasPorResponsavel&&o.cfg.colunas!=="responsavel")for(let e of rr(o.processos,"responsavel",o.ctx))r.append(d("div",{class:"spro-raia"},d("div",{class:"spro-raia-nome"},e.rotulo,d("span",{class:"spro-grupo-n"},String(e.itens.length))),t(e.itens)));else r.append(t(o.processos));return o.processos.length||r.prepend(d("div",{class:"spro-vazio"},"Nenhum processo corresponde ao filtro.")),r}function Vt(o,r,t,e,a=8){let n=Math.max(1,r),s=e>0?e:n*40,i=Math.max(0,Math.min(o,Math.floor(t/n)-a)),c=Math.min(o,Math.ceil((t+s)/n)+a);return{inicio:i,fim:c,antes:i*n,depois:Math.max(0,o-c)*n}}var Ln=[[/azul_marinho|marinho/,"#1d3557"],[/azul_claro|ciano|celeste/,"#2a9fd6"],[/azul/,"#2563c9"],[/verde_escuro/,"#166534"],[/verde|lima/,"#2e9e4f"],[/amarelo/,"#e0b000"],[/laranja/,"#ee7d11"],[/vermelho/,"#d1352b"],[/rosa|magenta/,"#d6409f"],[/roxo|violeta|lilas/,"#7048c6"],[/marrom/,"#8a5a3c"],[/preto/,"#222831"],[/cinza/,"#7b838c"]];function jt(o){let r=o.toLowerCase();return Ln.find(([t])=>t.test(r))?.[1]??"#8b939c"}var ar={compacta:34,confortavel:48},zn={processo:"minmax(220px, 240px)",tipo:"minmax(120px, 1.2fr)",especificacao:"minmax(140px, 1.6fr)",responsavel:"minmax(90px, 130px)",marcadores:"minmax(120px, 1.3fr)",prazo:"minmax(120px, 150px)",anotacao:"minmax(130px, 1.4fr)",caixa:"84px",parado:"84px",sinais:"minmax(110px, 150px)"},$n={processo:"protocolo",tipo:"tipo",responsavel:"responsavel",marcadores:"marcador",prazo:"prazo",caixa:"caixa",parado:"parado",sinais:"novo"},U=(o,r,t)=>d(o,{class:r},t);function Rn(o,r,t){let e=U("div",`spro-c spro-c-${r}`);switch(r){case"processo":{let a=d("a",{class:`spro-proc${o.naoVisualizado?" spro-novo":""}`,href:o.link??"#",title:"Abrir o processo"},o.protocolo);e.append(a),o.sigiloso&&e.append(d("span",{class:"spro-sigilo",title:"Processo sigiloso"},"sigiloso"));break}case"tipo":e.append(U("span","spro-corta",o.tipo)),e.title=o.tipo;break;case"especificacao":e.append(U("span","spro-corta",o.especificacao)),e.title=o.especificacao;break;case"responsavel":o.atribuicao&&(e.append(U("span","spro-corta",o.atribuicao.sigla)),e.title=o.atribuicao.nome);break;case"marcadores":for(let a of o.marcadores){let n=d("span",{class:"spro-marcador",title:a.texto?`${a.nome}: ${a.texto}`:a.nome},d("i",{style:`background:${jt(a.cor)}`}),a.nome);e.append(n)}break;case"prazo":{let a=F(o,t);a&&(e.append(U("span",`spro-prazo spro-prazo-${a.situacao}`,a.texto)),e.title=`${jr(o,t)}
${a.dica}`);break}case"anotacao":o.anotacao&&(e.append(U("span",`spro-corta${o.anotacao.prioridade?" spro-prio":""}`,o.anotacao.texto.replace(/\s*\n\s*/g," / "))),e.title=`${o.anotacao.texto}
${o.anotacao.autor}`);break;case"caixa":{let a=vo(K(o,t));e.append(U("span","spro-suave",a)),a&&(e.title=dt);break}case"parado":{let a=po(o,t);e.append(U("span","spro-suave",vo(a))),a!==null&&(e.title="Dias desde a \xFAltima movimenta\xE7\xE3o (vis\xE3o detalhada do SEI).");break}case"sinais":for(let a of Vr(o))e.append(U("span","spro-sinal",a));break}return e}function Ft(o){let r=o,t=U("div","spro-cab"),e=U("div","spro-corpo"),a=d("div",{class:"spro-rolagem",tabindex:"-1"},e),n=d("div",{class:"spro-tabela",role:"table"},t,a),s="",i=()=>`36px ${r.colunas.map(h=>zn[h]).join(" ")}`;function c(){t.replaceChildren(),t.style.gridTemplateColumns=i();let h=r.linhas.filter(w=>w.tipo==="processo"&&w.processo.naPaginaAtual).map(w=>w.processo.id),P=h.filter(w=>r.selecionados.has(w)).length,y=d("input",{type:"checkbox",class:"spro-cb","aria-label":"Marcar todos os processos vis\xEDveis",title:"Marcar todos os vis\xEDveis (desta p\xE1gina do SEI)",disabled:!h.length});y.checked=h.length>0&&P===h.length,y.indeterminate=P>0&&P<h.length,y.addEventListener("change",()=>r.aoMarcarGrupo(h,y.checked)),t.append(U("div","spro-c spro-c-cb")),t.firstElementChild.append(y);for(let w of r.colunas){let O=$n[w],q=O?r.ordem.findIndex(V=>V.campo===O):-1,no=d("div",{class:`spro-c spro-th${O?" spro-ordenavel":""}`,role:"columnheader",...q>=0?{"aria-sort":r.ordem[q].decrescente?"descending":"ascending"}:{}});if(O){let V=d("button",{type:"button",class:"spro-th-b",title:"Ordenar (Shift acrescenta outro crit\xE9rio)",onclick:Q=>r.aoOrdenar(O,Q.shiftKey)},mo[w]);q>=0&&V.append(d("span",{class:"spro-seta-ordem"},`${r.ordem[q].decrescente?"\u2193":"\u2191"}${r.ordem.length>1?q+1:""}`)),no.append(V)}else no.append(mo[w]);t.append(no)}}function p(h,P){let y=r.selecionados.has(h.id),w=d("input",{type:"checkbox",class:"spro-cb","aria-label":`Marcar ${h.protocolo}`,disabled:!h.naPaginaAtual,title:h.naPaginaAtual?void 0:"Este processo est\xE1 em outra p\xE1gina do SEI; abra-o ou use o quadro para mover."});w.checked=y,w.addEventListener("change",()=>r.aoSelecionar(h.id,w.checked));let O=d("div",{class:`spro-linha${y?" spro-sel":""}${r.foco===h.id?" spro-foco":""}`,role:"row","data-id":h.id,"data-grupo":P});O.style.gridTemplateColumns=i(),O.style.height=`${ar[r.densidade]}px`;let q=U("div","spro-c spro-c-cb");return q.append(w),O.append(q,...r.colunas.map(no=>Rn(h,no,r.ctx))),O}function m(h){let P=h.grupo.itens.filter(O=>O.naPaginaAtual).map(O=>O.id),y=d("button",{type:"button",class:"spro-grupo-b","aria-expanded":String(!h.recolhido),onclick:()=>r.aoGrupo(h.grupo.chave)},d("span",{class:`spro-grupo-seta${h.recolhido?" spro-fechado":""}`},ao("seta",14)),d("span",{class:"spro-grupo-nome"},h.grupo.rotulo),d("span",{class:"spro-grupo-n"},String(h.grupo.itens.length))),w=d("div",{class:`spro-grupo${h.grupo.tom?` spro-tom-${h.grupo.tom}`:""}`,role:"row"},y);if(P.length){let O=P.every(q=>r.selecionados.has(q));w.append(d("button",{type:"button",class:"spro-link",onclick:()=>r.aoMarcarGrupo(P,!O)},O?"Desmarcar grupo":"Marcar grupo"))}return w.style.height=`${ar[r.densidade]}px`,w}function f(){let h=ar[r.densidade],P=Vt(r.linhas.length,h,a.scrollTop||0,a.clientHeight||0);e.style.paddingTop=`${P.antes}px`,e.style.paddingBottom=`${P.depois}px`,e.replaceChildren(...r.linhas.slice(P.inicio,P.fim).map(y=>y.tipo==="grupo"?m(y):p(y.processo,y.grupo)))}let v=0;a.addEventListener("scroll",()=>{if(v)return;let h=a.ownerDocument.defaultView;if(!h?.requestAnimationFrame)return f();v=h.requestAnimationFrame(()=>{v=0,f()})});function A(h){let P=h.colunas.join()!==r.colunas.join()||h.ordem!==r.ordem||h.selecionados!==r.selecionados;r=h;let y=`${r.colunas.join()}|${r.densidade}`;if((P||y!==s)&&(c(),s=y),!r.linhas.length){e.style.paddingTop=e.style.paddingBottom="0",e.replaceChildren(d("div",{class:"spro-vazio"},"Nenhum processo corresponde ao filtro."));return}f()}function b(h){let P=r.linhas.findIndex(w=>w.tipo==="processo"&&w.processo.id===h);if(P<0)return!1;let y=ar[r.densidade];return P*y<a.scrollTop?a.scrollTop=P*y:(P+1)*y>a.scrollTop+a.clientHeight&&a.clientHeight>0&&(a.scrollTop=(P+1)*y-a.clientHeight),f(),!0}return A(o),{el:n,atualizar:A,mostrar:b,rolagem:a}}var Nn=[["/","Buscar"],["j / k","Linha seguinte / anterior"],["x","Marcar a linha"],["Enter","Abrir o processo"],["g t","Ver a tabela"],["g q","Ver o quadro"],["Esc","Limpar a busca ou a sele\xE7\xE3o"],["?","Esta ajuda"]],_n=[["Meus","resp:eu"],["Atrasados","prazo:atrasado"],["Vencem na semana","prazo:semana"],["Sem respons\xE1vel","resp:sem"],["N\xE3o visualizados","novo:sim"],["Novos desde a \xFAltima visita","novo:visita"],["Parados h\xE1 +30 dias","parado:>30d"]];function zo(o,r){for(let t of o.querySelectorAll("option"))t.getAttribute("value")===r?t.setAttribute("selected",""):t.removeAttribute("selected"),t.selected=t.getAttribute("value")===r}function Ut(o){let{doc:r}=o,t=o.inicial.processos,e=Ao(),a=[],n="",s=new Set,i=new Set(Lr(r)),c=null,p={vistoEm:{}},m,f=null,v=!1,A=!1,b="",h={},P=!1,y=!1,w,O=!1,q=Et(o.mover),no=new AbortController,V=()=>({hoje:o.hoje(),agora:o.agora(),...o.eu?{eu:o.eu}:{},...m!==void 0?{visitaAnterior:m}:{}}),Q=r.createElement("div");Q.id="spro-grade",Q.setAttribute("data-spro-grade-host","1"),Q.setAttribute("data-tema",o.escuro?"escuro":"claro");let Qt=Q.attachShadow({mode:"open"}),Xr=r.createElement("style");Xr.textContent=o.css;let Kr=d("div",{class:`spro-app${o.escuro?" spro-escuro":""}`});Qt.append(Xr,Kr);let j=d("input",{type:"search",class:"spro-busca",placeholder:"Buscar: texto, resp:ana, prazo:<7d, marcador:urgente...","aria-label":"Buscar processos",spellcheck:"false",autocomplete:"off"}),ir=d("div",{class:"spro-chips"}),Jr=d("div",{class:"spro-rapidos"}),cr=d("div",{class:"spro-status",role:"status","aria-live":"polite"}),$o=d("div",{class:"spro-lote",hidden:!0}),Ro=d("div",{class:"spro-conteudo"}),so=d("div",{class:"spro-painel",hidden:!0}),Zr=d("div",{class:"spro-avisos","aria-live":"polite"}),wo=d("div",{class:"spro-ajuda-atalhos",hidden:!0},d("strong",{},"Atalhos"),...Nn.map(([l,u])=>d("div",{},d("kbd",{},l),` ${u}`))),Mo=d("select",{class:"spro-sel-campo","aria-label":"Agrupar por"},...Object.keys(qr).map(l=>d("option",{value:l},l==="nenhum"?"Sem agrupamento":`Agrupar: ${qr[l]}`))),No=d("select",{class:"spro-sel-campo","aria-label":"Ordenar por"},d("option",{value:""},"Ordem do SEI"),...[["protocolo","N\xFAmero do processo"],["prazo","Prazo"],["tipo","Tipo"],["responsavel","Respons\xE1vel"],["marcador","Marcador"],["caixa","Tempo na caixa"],["parado","Parado h\xE1"],["novo","N\xE3o visualizados"]].flatMap(([l,u])=>[d("option",{value:`${l}:a`},`${u} \u2191`),d("option",{value:`${l}:d`},`${u} \u2193`)])),Wr=d("select",{class:"spro-sel-campo","aria-label":"Filtrar por respons\xE1vel"}),Yr=d("select",{class:"spro-sel-campo","aria-label":"Filtrar por tipo"}),oe=d("select",{class:"spro-sel-campo","aria-label":"Filtrar por marcador"}),re=(l,u)=>d("button",{type:"button",class:"spro-seg-b","data-modo":l,title:u,onclick:()=>I({modo:l})},ao(l==="tabela"?"lista":"quadro",16),d("span",{},u)),ee=d("div",{class:"spro-seg",role:"group","aria-label":"Modo de exibi\xE7\xE3o"},re("tabela","Tabela"),re("quadro","Quadro")),ko=(l,u,x,g="")=>d("button",{type:"button",class:`spro-bt ${g}`.trim(),title:u,"aria-label":u,onclick:x},ao(l,16),d("span",{},u)),te=ko("colunas","Colunas",()=>go("colunas")),Xt=ko("disquete","Vis\xF5es",()=>go("visoes")),Kt=ko("lista","Exportar CSV",()=>ra()),Jt=d("button",{type:"button",class:"spro-bt spro-bt-icone",title:"Atalhos de teclado (?)","aria-label":"Atalhos de teclado",onclick:()=>{wo.hidden=!wo.hidden}},"?"),ae=ko("setaDireita","Vis\xE3o nativa",()=>o.aoVoltarNativa());ae.title="Voltar \xE0 vis\xE3o nativa do SEI";let ne=ko("densidade","Densidade",()=>I({densidade:e.densidade==="compacta"?"confortavel":"compacta"})),_o=d("div",{class:"spro-quadro-cfg",hidden:!0});Kr.append(d("div",{class:"spro-barra"},ee,d("div",{class:"spro-busca-caixa"},j),Mo,No,te,ne,Xt,Kt,Jt,ae),ir,d("div",{class:"spro-faixa"},Jr,Wr,Yr,oe),_o,wo,so,cr,$o,Ro,Zr),Mo.addEventListener("change",()=>I({agrupar:Mo.value})),No.addEventListener("change",()=>{let[l,u]=No.value.split(":");I({ordem:l?[{campo:l,decrescente:u==="d"}]:[]})});let se=()=>lt(t,p),Co=()=>kt(se(),e.busca,V()),pr=()=>Nt(Co(),e.ordem,V());function I(l){e={...e,...l},l.busca===void 0?o.armazem.gravarVisao(e).catch(()=>{}):Zt(),H()}let lr;function Zt(){clearTimeout(lr),lr=setTimeout(()=>void o.armazem.gravarVisao(e).catch(()=>{}),400)}function Y(l,u){let x=d("div",{class:"spro-aviso",role:"status"},d("span",{},l));u&&x.append(d("button",{type:"button",class:"spro-link",onclick:()=>{u.fazer(),x.remove()}},u.rotulo)),x.append(d("button",{type:"button",class:"spro-aviso-x","aria-label":"Fechar aviso",onclick:()=>x.remove()},"\xD7")),Zr.append(x),setTimeout(()=>x.remove(),u?9e3:6e3).unref?.()}function io(l,u){let x=new Set(i);for(let g of l)u?x.add(g):x.delete(g);i=x,vt(r,x),dr(),uo()}function To(l,u){t=t.map(x=>x.id===l?u:x)}async function Wt(l,u,x){let g=t.find(R=>R.id===l);if(!g)return;let M=Tt(e.quadro.colunas,g,u,x);if(!M.ok)return Y(M.motivo);let S=Object.fromEntries((h.responsaveis??[]).map(R=>[R.sigla,R.nome]));To(l,Hr(g,M.movimento,S)),H();let L=await q.mover(M.movimento);if(!y){if(!L.ok)return To(l,g),H(),Y(`N\xE3o foi poss\xEDvel mover ${g.protocolo}: ${L.erro}`);Y(`${g.protocolo} movido.`,{rotulo:"Desfazer",fazer:()=>{let R=t.find(oo=>oo.id===l)??g;To(l,Hr(R,L.desfazer,S)),H(),q.mover(L.desfazer).then(oo=>{oo.ok||y||(To(l,R),H(),Y(`N\xE3o foi poss\xEDvel desfazer: ${oo.erro}`))})}})}}let qo=Ft({linhas:[],colunas:e.colunas,densidade:e.densidade,ctx:V(),ordem:e.ordem,selecionados:i,foco:c,aoOrdenar:(l,u)=>I({ordem:Ur(e.ordem,l,u)}),aoSelecionar:(l,u)=>io([l],u),aoGrupo:l=>{let u=new Set(s);u.has(l)?u.delete(l):u.add(l),s=u,o.armazem.gravarRecolhidos([...u]).catch(()=>{}),uo()},aoMarcarGrupo:(l,u)=>io(l,u)});function uo(){let l=pr();if(e.modo==="quadro"){Ro.replaceChildren(qt({processos:l,cfg:e.quadro,ctx:V(),extras:h,selecionados:i,aoMover:(x,g,M)=>void Wt(x,g,M),aoSelecionar:(x,g)=>io([x],g)}));return}let u=rr(l,e.agrupar,V());qo.atualizar({linhas:zt(u,s,e.agrupar!=="nenhum"),colunas:e.colunas,densidade:e.densidade,ctx:V(),ordem:e.ordem,selecionados:i,foco:c,aoOrdenar:(x,g)=>I({ordem:Ur(e.ordem,x,g)}),aoSelecionar:(x,g)=>io([x],g),aoGrupo:x=>{let g=new Set(s);g.has(x)?g.delete(x):g.add(x),s=g,o.armazem.gravarRecolhidos([...g]).catch(()=>{}),uo()},aoMarcarGrupo:(x,g)=>io(x,g)}),Ro.firstElementChild!==qo.el&&Ro.replaceChildren(qo.el)}function ie(l){let u=[`${l} de ${t.length} processo${t.length===1?"":"s"}`],x=o.inicial.totais.recebidos+o.inicial.totais.gerados;v&&f?u.push(`carregando ${f.grupo} (${f.paginasLidas}/${f.paginasTotal})\u2026`):!A&&x>t.length&&u.push(`o SEI informa ${x}; os demais n\xE3o foram carregados`),b&&u.push(`aviso: ${b}`),cr.replaceChildren(u.join(" \xB7 ")),cr.classList.toggle("spro-status-alerta",!!b||!A&&!v&&x>t.length)}function dr(){let l=i.size;if($o.hidden=l===0,!l)return $o.replaceChildren();let u=new Set(Co().map(g=>g.id)),x=[...i].filter(g=>!u.has(g)).length;$o.replaceChildren(d("strong",{},`${l} selecionado${l===1?"":"s"}`),...x?[d("span",{class:"spro-suave"},`(${x} fora do filtro atual)`)]:[],...o.acoes().map(g=>d("button",{type:"button",class:"spro-bt",title:g.rotulo,onclick:()=>{let M=At(g,i.size);!M.ok&&M.motivo&&Y(M.motivo)}},d("img",{src:g.icone,alt:"",width:"16",height:"16"}),d("span",{},g.rotulo))),d("button",{type:"button",class:"spro-link",onclick:()=>io([...i],!1)},"Limpar sele\xE7\xE3o"))}function Yt(){let l=_r(e.busca);ir.replaceChildren(...l.tokens.map(x=>d("span",{class:`spro-chip${x.termo.negado?" spro-chip-neg":""}`},x.texto,d("button",{type:"button","aria-label":`Remover ${x.texto}`,onclick:()=>{I({busca:Tr(e.busca,x.texto)}),j.value=e.busca}},"\xD7")))),ir.hidden=!l.tokens.length;let u=new Set(l.tokens.map(x=>x.texto));Jr.replaceChildren(..._n.map(([x,g])=>d("button",{type:"button",class:`spro-rapido${u.has(g)?" spro-rapido-on":""}`,"aria-pressed":String(u.has(g)),onclick:()=>{I({busca:u.has(g)?Tr(e.busca,g):`${e.busca} ${g}`.trim()}),j.value=e.busca}},x)))}function ur(l,u,x,g){let M=l.querySelector("option[selected]")?.getAttribute("value")??"";l.replaceChildren(d("option",{value:""},u),...g.map(S=>d("option",{value:S.valor},`${S.rotulo} (${S.n})`))),zo(l,g.some(S=>S.valor===M)?M:""),l.onchange=()=>{let S=l.value;S&&(I({busca:Ct(e.busca,x,S)}),j.value=e.busca,zo(l,""))}}function H(){if(y)return;let l=It(se(),V());ur(Wr,"Respons\xE1vel\u2026","resp",l.responsaveis),ur(Yr,"Tipo\u2026","tipo",l.tipos),ur(oe,"Marcador\u2026","marcador",l.marcadores),zo(Mo,e.agrupar),Mo.disabled=e.modo==="quadro",zo(No,e.ordem[0]?`${e.ordem[0].campo}:${e.ordem[0].decrescente?"d":"a"}`:"");for(let u of ee.querySelectorAll("[data-modo]"))u.setAttribute("aria-pressed",String(u.getAttribute("data-modo")===e.modo));ne.title=e.densidade==="compacta"?"Linhas confort\xE1veis":"Linhas compactas",te.hidden=e.modo==="quadro",oa(),Yt(),uo(),ie(Co().length),dr(),e.modo==="quadro"&&!P&&o.extras&&(P=!0,o.extras().then(u=>{h=u,y||uo()}).catch(()=>{}))}function oa(){if(_o.hidden=e.modo!=="quadro",_o.hidden)return;let l=e.quadro,u=d("select",{class:"spro-sel-campo","aria-label":"Colunas do quadro",onchange:M=>{P=!1,I({quadro:{...l,colunas:M.target.value}})}},...[["marcador","Colunas: marcador"],["responsavel","Colunas: respons\xE1vel"],["prazo","Colunas: prazo (leitura)"],["tipo","Colunas: tipo (leitura)"]].map(([M,S])=>d("option",{value:M},S)));zo(u,l.colunas);let x=d("input",{type:"number",min:"0",max:"99",class:"spro-num",value:String(l.limite),"aria-label":"Limite de cart\xF5es por coluna (0 = sem limite)",title:"Limite de cart\xF5es por coluna (0 = sem limite)",onchange:M=>I({quadro:{...l,limite:Math.max(0,Math.min(99,Number(M.target.value)||0))}})}),g=d("input",{type:"checkbox",onchange:M=>I({quadro:{...l,raiasPorResponsavel:M.target.checked}})});g.checked=l.raiasPorResponsavel,_o.replaceChildren(u,d("label",{class:"spro-rotulo-inline"},"Limite ",x),d("label",{class:"spro-rotulo-inline"},g," Raias por respons\xE1vel"),d("span",{class:"spro-suave"},l.colunas==="marcador"||l.colunas==="responsavel"?"Arraste os cart\xF5es entre as colunas.":"Esta divis\xE3o \xE9 s\xF3 de leitura."))}function go(l){if(!so.hidden&&so.getAttribute("data-qual")===l){so.hidden=!0;return}if(so.setAttribute("data-qual",l),so.hidden=!1,l==="colunas"){so.replaceChildren(d("strong",{},"Colunas"),...bo.map(S=>{let L=d("input",{type:"checkbox",disabled:S==="processo"});return L.checked=e.colunas.includes(S),L.addEventListener("change",()=>{let R=L.checked?bo.filter(oo=>oo===S||e.colunas.includes(oo)):e.colunas.filter(oo=>oo!==S);I({colunas:R})}),d("label",{class:"spro-rotulo-linha"},L,` ${mo[S]}`)}),d("button",{type:"button",class:"spro-link",onclick:()=>I({colunas:Ao().colunas})},"Restaurar padr\xE3o"));return}let u=d("input",{type:"text",class:"spro-nome",maxlength:"40",placeholder:"Nome da vis\xE3o","aria-label":"Nome da vis\xE3o"}),x=a.find(S=>S.id===n);u.value=x?.nome??"";let g=async(S,L=a)=>{a=S,await o.armazem.gravarVisoes(S,L).catch(()=>Y("N\xE3o foi poss\xEDvel sincronizar as vis\xF5es."))},M=async S=>{let L={...e,nome:u.value.trim()||"Minha vis\xE3o",id:S==="atualizar"?n:""},R=ut(a,L,o.novoId);if(!R)return Y("Limite de vis\xF5es salvas atingido.");n=R.visao.id,await g(R.lista),Y(`Vis\xE3o "${R.visao.nome}" salva.`),go("visoes"),go("visoes")};so.replaceChildren(d("strong",{},"Vis\xF5es salvas"),a.length?d("ul",{class:"spro-lista-visoes"},...a.map(S=>d("li",{},d("button",{type:"button",class:`spro-link${S.id===n?" spro-ativa":""}`,onclick:()=>{n=S.id,j.value=S.busca,I({...S,id:""})}},S.nome),d("button",{type:"button",class:"spro-aviso-x","aria-label":`Excluir ${S.nome}`,title:"Excluir",onclick:async()=>{await g(mt(a,S.id),a),n===S.id&&(n=""),go("visoes"),go("visoes")}},"\xD7")))):d("p",{class:"spro-suave"},"Nenhuma vis\xE3o salva ainda."),d("div",{class:"spro-linha-form"},u,d("button",{type:"button",class:"spro-bt",onclick:()=>void M("nova")},"Salvar como nova"),x&&ft(e,x)?d("button",{type:"button",class:"spro-bt",onclick:()=>void M("atualizar")},"Atualizar"):null))}function ra(){let l=Dt(pr(),e.modo==="quadro"?[...bo]:e.colunas,V());o.baixar(Lt(o.hoje()),ht(l),"text/csv;charset=utf-8"),Y(`${l.length-1} processos exportados.`)}j.addEventListener("input",()=>{let l=j.value;if(o.semDebounce)return I({busca:l});clearTimeout(w),w=setTimeout(()=>I({busca:l}),120)}),j.addEventListener("keydown",l=>{l.key==="Escape"&&(j.value="",I({busca:""}),j.blur())});function ce(l){if(y||l.ctrlKey||l.metaKey||l.altKey)return;let u=l.target;if(u&&(/^(input|textarea|select)$/i.test(u.tagName)||u.isContentEditable)||Q.hidden)return;let g=l.key;if(O){O=!1,g==="t"?I({modo:"tabela"}):g==="q"&&I({modo:"quadro"});return}let M=pr().map(L=>L.id),S=c?M.indexOf(c):-1;if(g==="/")l.preventDefault(),j.focus();else if(g==="?")wo.hidden=!wo.hidden;else if(g==="g")O=!0;else if(g==="Escape")i.size&&io([...i],!1);else if((g==="j"||g==="k")&&e.modo==="tabela"&&M.length)c=M[Math.max(0,Math.min(M.length-1,S+(g==="j"?1:-1)))],uo(),qo.mostrar(c);else if(g==="x"&&c)t.find(R=>R.id===c)?.naPaginaAtual&&io([c],!i.has(c));else if(g==="Enter"&&c){let L=t.find(R=>R.id===c)?.link;L&&r.defaultView?.location.assign(L)}}r.addEventListener("keydown",ce);let ea=bt(r,l=>{i=l,dr(),uo()}),ta=o.armazem.aoMudarVisoes(()=>void o.armazem.lerVisoes().then(l=>{a=l}).catch(()=>{}));async function aa(){if(!o.fonte)return A=!0,pe(!0);v=!0,H();let l=await at(o.inicial,o.fonte,{sinal:no.signal,aoProgresso:u=>{f=u,ie(Co().length)},aoPagina:u=>{t=[...t,...u],H()}});v=!1,A=l.completo,l.erro&&(b=l.erro),pe(l.completo)}function pe(l){p=Ir(p,t.map(u=>u.id),o.agora(),l),o.armazem.gravarIdade(p).catch(()=>{}),H()}async function na(){try{let l=await o.armazem.lerEstado();e=l.visao,s=new Set(l.recolhidos),p=pt(l.idade,o.agora()),m=p.visitaAnterior,a=await o.armazem.lerVisoes()}catch{}p=Ir(p,t.map(l=>l.id),o.agora(),!1),j.value=e.busca,H(),aa()}return{host:Q,iniciar:na,render:H,estado:()=>({visao:e,todos:t,selecionados:i,completo:A,carregando:v,filtrados:Co().length}),definirVisao:l=>{e={...e,...l},j.value=e.busca,H()},fechar(){y=!0,no.abort(),clearTimeout(w),clearTimeout(lr),r.removeEventListener("keydown",ce),ea(),ta(),Q.remove()},mostrar:l=>{Q.hidden=!l}}}var Gt=`/* Dentro do Shadow DOM: o base.css do sei-comum (tokens) vem antes deste arquivo. */
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
.spro-sel-campo, .spro-nome, .spro-num { height: 34px; max-width: 190px; padding: 0 8px; background: var(--spro-fundo); border: 1px solid var(--spro-borda-forte); border-radius: var(--spro-raio); }
.spro-num { width: 64px; }
.spro-nome { max-width: none; flex: 1; }
.spro-bt { display: inline-flex; gap: 6px; align-items: center; height: 34px; padding: 0 10px; cursor: pointer; background: var(--spro-fundo); border: 1px solid var(--spro-borda-forte); border-radius: var(--spro-raio); }
.spro-bt:hover { background: var(--spro-fundo-2); }
.spro-bt-icone { width: 34px; justify-content: center; padding: 0; font-weight: 600; }
.spro-bt[hidden] { display: none; }
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
`;var Ht=`/* Na p\xE1gina do SEI (fora do Shadow DOM): o bot\xE3o alternador e o espa\xE7o da grade. */
.spro-grade-botao { display: inline-flex; align-items: center; margin-left: 4px; padding: 2px; line-height: 0; color: inherit; cursor: pointer; background: none; border: 0; border-radius: 6px; }
.spro-grade-botao:hover { background: color-mix(in srgb, currentColor 14%, transparent); }
.spro-grade-botao[aria-pressed="true"] { color: #1f5fbf; }
.spro-grade-botao:focus-visible { outline: 2px solid #1f5fbf; outline-offset: 1px; }
#spro-grade { display: block; width: 100%; flex: 0 0 100%; }
#spro-grade[hidden] { display: none; }
`;var Vn="gradecontrole";function jn(){return new URL(location.href).searchParams.get("acao")==="procedimento_controlar"}var nr=()=>!!document.body?.classList.contains("dark-mode")||ue(localStorage),Eo=!1,W=null,lo=null,So=null,Bt=document.readyState!=="loading";function Fn(){let o=document.querySelector(tt);return document.getElementById("divTabelaProcesso")??o?.parentElement??null}function Po(o){lo?.pronta(),W?.mostrar(!1),Xo(document),o&&o!=="usuario"&&console.warn("[SEI Pro] Grade do controle indispon\xEDvel, usando a vis\xE3o nativa:",o)}function Qr(){if(W||!Eo)return;let o=new Ho(location.href,()=>Bo(document,location.href)),r=Ar(Bo(document,location.href)),t=r.unidade.id,e=gt({local:mr(chrome.storage.local,"local"),sync:mr(chrome.storage.sync,"sync")},String(t)),a=Jo(document);if(!a.processos.length&&!a.totais.recebidos&&!a.totais.gerados)return lo?.pronta(),Po("caixa vazia");let n=Fn();if(!n)return Po("sem ponto de encaixe");let s=a.processos[0]?.id??"";W=Ut({doc:document,inicial:a,agora:()=>Date.now(),hoje:()=>jo(),eu:r.usuario.login||void 0,armazem:e,fonte:nt(o.http,Bo(document,location.href)),mover:{marcador:async(i,c)=>void await Re(o,i,c,{aplicar:!0}),atribuir:async(i,c)=>void await $e(o,i,c,{aplicar:!0})},acoes:()=>Ue(document),css:`${fe}
${Gt}`,escuro:nr(),baixar:(i,c,p)=>he(i,c,p),novoId:()=>me(),extras:s?async()=>{let[i,c]=await Promise.all([vr(o,"marcadores",s),vr(o,"usuarios",s)]);return{marcadores:i.map(p=>p.nome),responsaveis:c.map(p=>{let[m,...f]=p.nome.split(" - ");return{sigla:m.trim(),nome:f.join(" - ").trim()||m.trim()}})}}:void 0,aoVoltarNativa:()=>sr()}),n.before(W.host),W.iniciar().then(()=>{lo?.pronta(),xo(document)&&Sr(document)}).catch(i=>Po(String(i)))}function sr(){xo(document)?(W?.mostrar(!1),Xo(document)):(Qo(document,nr()),W?(W.mostrar(!0),Sr(document)):Qr()),So?.(),So=Ko(document,()=>xo(document),sr)}function Un(o){o!==Eo&&(Eo=o,He(localStorage,o),o?(Qo(document,nr()),lo=Pr(Po),Bt&&(lo.iniciarContagem(),Qr()),So=Ko(document,()=>xo(document),sr)):(So?.(),So=null,W?.fechar(),W=null,lo?.pronta(),Xo(document)))}function Gn(){if(!jn())return;let o=document.createElement("style");o.textContent=Ht,(document.head??document.documentElement).append(o),Ge(localStorage)&&(Eo=!0,Qo(document,nr()),lo=Pr(Po));let r=()=>{Bt=!0,Eo&&(lo?.iniciarContagem(),Qr(),So??=Ko(document,()=>xo(document),sr))};document.readyState==="loading"?document.addEventListener("DOMContentLoaded",r,{once:!0}):r();let t=a=>Un(de(a,Vn)),e=!1;chrome.storage.onChanged.addListener((a,n)=>{n!=="sync"||!("dataValues"in a)||(e=!0,t(a.dataValues.newValue))}),chrome.storage.sync.get("dataValues").then(a=>{e||t(a.dataValues)}).catch(()=>{Eo&&Po("sem prefer\xEAncias")})}Gn();})();
