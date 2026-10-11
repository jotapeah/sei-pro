/* GERADO por grade-controle/build.mjs. NAO EDITE. Rode: npm run build */
"use strict";(()=>{function Qa(o){let e={};for(let[t,r]of Object.entries(o)){let a={};r&&"newValue"in r&&(a.novo=r.newValue),r&&"oldValue"in r&&(a.antigo=r.oldValue),e[t]=a}return e}function ze(o,e){return{obter:(t=null)=>o.get(t),gravar:t=>o.set(t),remover:t=>o.remove(t),chaves:typeof o.getKeys=="function"?()=>o.getKeys():void 0,aoMudar(t){let r=(a,n)=>{n===e&&t(Qa(a))};return chrome.storage.onChanged.addListener(r),()=>chrome.storage.onChanged.removeListener(r)}}}var Tr=o=>String(o).padStart(2,"0");function te(o=new Date){return`${o.getFullYear()}-${Tr(o.getMonth()+1)}-${Tr(o.getDate())}`}function re(o){let e=/^(\d{4})-(\d{2})-(\d{2})$/.exec(o);if(!e)throw new Error(`Data inv\xE1lida: ${o}`);return new Date(Number(e[1]),Number(e[2])-1,Number(e[3]),12)}function Ho(o,e){return Math.round((re(e).getTime()-re(o).getTime())/864e5)}function fo(o){let[e,t,r]=o.split("-");return`${r}/${t}/${e}`}function Ka(o,e){let t=o;if(typeof o=="string"){if(!o.trim())return;try{t=JSON.parse(o)}catch{return}}return!Array.isArray(t)||t.length===0?void 0:t.map(a=>a?.configGeral).find(Array.isArray)?.find(a=>a?.name===e)?.value}function Re(o,e){let t=Ka(o,e);return t===!0||t===1||t==="1"}function _r(o){try{return!!o.getItem("darkModePro")}catch{return!1}}function qr(o=crypto){if(typeof o.randomUUID=="function")return o.randomUUID();let e=o.getRandomValues(new Uint8Array(16));e[6]=(e[6]??0)&15|64,e[8]=(e[8]??0)&63|128;let t=[...e].map(r=>r.toString(16).padStart(2,"0")).join("");return`${t.slice(0,8)}-${t.slice(8,12)}-${t.slice(12,16)}-${t.slice(16,20)}-${t.slice(20)}`}var Vr=`/*
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
`;function p(o,e={},...t){let r=document.createElement(o);for(let[a,n]of Object.entries(e))n===void 0||n===!1||(typeof n=="function"?r.addEventListener(a.replace(/^on/,""),n):n===!0?r.setAttribute(a,""):a==="class"?r.className=n:a==="value"&&o==="textarea"?r.value=n:r.setAttribute(a,n));for(let a of t)a!=null&&a!==!1&&r.append(a);return r}var no={fill:"currentColor",stroke:"none"},Hr="M12 3.2l2.7 5.5 6 .9-4.35 4.25 1 6L12 17l-5.35 2.85 1-6L3.3 9.6l6-.9z",Fr={estrela:[["path",{d:Hr}]],estrelaCheia:[["path",{d:Hr,fill:"currentColor"}]],alvo:[["circle",{cx:"12",cy:"12",r:"7.5"}],["circle",{cx:"12",cy:"12",r:"3.2"}]],alvoAtivo:[["circle",{cx:"12",cy:"12",r:"6.6"}],["circle",{cx:"12",cy:"12",r:"2.4",fill:"currentColor"}],["path",{d:"M12 2.2v3.4M12 18.4v3.4M2.2 12h3.4M18.4 12h3.4"}]],pasta:[["path",{d:"M3.5 7.5a2 2 0 0 1 2-2h4l2 2h7a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2z"}]],etiqueta:[["path",{d:"M3.5 12.2V4.5a1 1 0 0 1 1-1h7.7l8.3 8.3a1 1 0 0 1 0 1.4l-7.1 7.1a1 1 0 0 1-1.4 0z"}],["circle",{cx:"8",cy:"8",r:"1.4",...no}]],relogio:[["circle",{cx:"12",cy:"12",r:"9"}],["path",{d:"M12 7.2V12l3.2 1.9"}]],nota:[["path",{d:"M6 3.5h9l3.5 3.5v13.5H6z"}],["path",{d:"M9 11h6"}],["path",{d:"M9 15h6"}]],lixeira:[["path",{d:"M4.5 6.5h15"}],["path",{d:"M9.5 6.5V4.8c0-.7.6-1.3 1.3-1.3h2.4c.7 0 1.3.6 1.3 1.3v1.7"}],["path",{d:"M6.8 6.5 7.6 19c0 .8.7 1.5 1.5 1.5h5.8c.8 0 1.5-.7 1.5-1.5l.8-12.5"}]],lapis:[["path",{d:"M17.5 3.5a2.1 2.1 0 0 1 3 3L9 18l-4.5 1.5L6 15z"}],["path",{d:"M15 6l3 3"}]],fechar:[["path",{d:"M18 6 6 18"}],["path",{d:"M6 6l12 12"}]],mais:[["path",{d:"M12 5v14"}],["path",{d:"M5 12h14"}]],busca:[["circle",{cx:"11",cy:"11",r:"6.5"}],["path",{d:"M20.5 20.5l-4.8-4.8"}]],baixar:[["path",{d:"M12 3.5v11"}],["path",{d:"M7.5 10.2 12 14.7l4.5-4.5"}],["path",{d:"M4.5 19.5h15"}]],subir:[["path",{d:"M12 14.5v-11"}],["path",{d:"M7.5 7.8 12 3.3l4.5 4.5"}],["path",{d:"M4.5 19.5h15"}]],copiar:[["rect",{x:"8.5",y:"8.5",width:"12",height:"12",rx:"2"}],["path",{d:"M15.5 8.5V5.5a2 2 0 0 0-2-2h-8a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h3"}]],restaurar:[["path",{d:"M9 14 4 9l5-5"}],["path",{d:"M4 9h9a7 7 0 0 1 7 7v4"}]],check:[["path",{d:"M20 6.5 9.2 17.3 4 12.1"}]],alerta:[["path",{d:"M10.3 4.4 2.8 17.6a2 2 0 0 0 1.7 3h15a2 2 0 0 0 1.7-3L13.7 4.4a2 2 0 0 0-3.4 0z"}],["path",{d:"M12 9.5v4"}],["circle",{cx:"12",cy:"16.8",r:"1",...no}]],menu:[["circle",{cx:"5",cy:"12",r:"1.4",...no}],["circle",{cx:"12",cy:"12",r:"1.4",...no}],["circle",{cx:"19",cy:"12",r:"1.4",...no}]],alca:[["circle",{cx:"9",cy:"6",r:"1.3",...no}],["circle",{cx:"15",cy:"6",r:"1.3",...no}],["circle",{cx:"9",cy:"12",r:"1.3",...no}],["circle",{cx:"15",cy:"12",r:"1.3",...no}],["circle",{cx:"9",cy:"18",r:"1.3",...no}],["circle",{cx:"15",cy:"18",r:"1.3",...no}]],ajustes:[["path",{d:"M4 7h5"}],["path",{d:"M13 7h7"}],["circle",{cx:"11",cy:"7",r:"2.1"}],["path",{d:"M4 17h9"}],["path",{d:"M17 17h3"}],["circle",{cx:"15",cy:"17",r:"2.1"}]],setaCima:[["path",{d:"M12 19V6"}],["path",{d:"M6 12l6-6 6 6"}]],setaBaixo:[["path",{d:"M12 5v13"}],["path",{d:"M18 12l-6 6-6-6"}]],recolher:[["path",{d:"M6 15l6-6 6 6"}]],expandir:[["path",{d:"M6 9l6 6 6-6"}]],local:[["path",{d:"M12 21s-6.5-6.1-6.5-11a6.5 6.5 0 0 1 13 0c0 4.9-6.5 11-6.5 11z"}],["circle",{cx:"12",cy:"10",r:"2.3"}]],sino:[["path",{d:"M6.5 16.5V11a5.5 5.5 0 0 1 11 0v5.5l1.5 1.5h-14z"}],["path",{d:"M10 20.5a2 2 0 0 0 4 0"}]],documento:[["path",{d:"M7 3.5h7l4 4v13H7z"}],["path",{d:"M14 3.5v4h4"}]],painel:[["rect",{x:"3.5",y:"4.5",width:"17",height:"15",rx:"2"}],["path",{d:"M14.5 4.5v15"}]],atualizar:[["path",{d:"M19.5 12a7.5 7.5 0 1 1-2.2-5.3"}],["path",{d:"M19.5 4.5v4h-4"}]],nuvem:[["path",{d:"M7 18.5h10a4 4 0 0 0 .6-7.95A5.5 5.5 0 0 0 7 9.5a4.5 4.5 0 0 0 0 9z"}]],chevron:[["path",{d:"M7 9.5l5 5 5-5"}]],pino:[["path",{d:"M9.5 3.5h5l-.8 5.2 3.3 3.1v1.7H7v-1.7l3.3-3.1z"}],["path",{d:"M12 13.5v7"}]],pinoCheio:[["path",{d:"M9.5 3.5h5l-.8 5.2 3.3 3.1v1.7H7v-1.7l3.3-3.1z",fill:"currentColor"}],["path",{d:"M12 13.5v7"}]],filtro:[["path",{d:"M4 5.5h16l-6.2 7.3v5.4l-3.6 1.8v-7.2z"}]],ordenar:[["path",{d:"M7.5 4.5v15"}],["path",{d:"M4 16l3.5 3.5L11 16"}],["path",{d:"M16.5 19.5v-15"}],["path",{d:"M13 8l3.5-3.5L20 8"}]],mapa:[["path",{d:"M9 4.5 3.5 6.6v13l5.5-2.1 6 2.1 5.5-2.1v-13L15 6.6z"}],["path",{d:"M9 4.5v13"}],["path",{d:"M15 6.6v13"}]],olho:[["path",{d:"M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z"}],["circle",{cx:"12",cy:"12",r:"2.8"}]],camadas:[["path",{d:"M12 3.5 20.5 8 12 12.5 3.5 8z"}],["path",{d:"M3.5 12 12 16.5 20.5 12"}],["path",{d:"M3.5 16 12 20.5 20.5 16"}]],historico:[["path",{d:"M3.8 12.5A8.3 8.3 0 1 0 6.2 6"}],["path",{d:"M3.8 4.2v4.3h4.3"}],["path",{d:"M12 8v4.2l2.8 1.7"}]],pessoa:[["circle",{cx:"12",cy:"8",r:"3.6"}],["path",{d:"M5 20c.9-3.7 3.6-5.6 7-5.6s6.1 1.9 7 5.6"}]],predio:[["path",{d:"M5 20.5v-15a1 1 0 0 1 1-1h7.5a1 1 0 0 1 1 1v15"}],["path",{d:"M14.5 9.5H18a1 1 0 0 1 1 1v10"}],["path",{d:"M3 20.5h18"}],["path",{d:"M8.5 8.5h3"}],["path",{d:"M8.5 12h3"}],["path",{d:"M8.5 15.5h3"}]],brilho:[["path",{d:"M12 3.5l1.9 5.1 5.1 1.9-5.1 1.9L12 17.5l-1.9-5.1L5 10.5l5.1-1.9z"}],["path",{d:"M18.5 16.5v4"}],["path",{d:"M16.5 18.5h4"}]],calendario:[["rect",{x:"4",y:"5.5",width:"16",height:"15",rx:"2"}],["path",{d:"M4 10h16"}],["path",{d:"M8.5 3.5v4"}],["path",{d:"M15.5 3.5v4"}]],cadeado:[["rect",{x:"5.5",y:"10.5",width:"13",height:"10",rx:"2"}],["path",{d:"M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5"}]],saida:[["path",{d:"M14 4.5h4.5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H14"}],["path",{d:"M10 16l4-4-4-4"}],["path",{d:"M14 12H4.5"}]],planilha:[["rect",{x:"4",y:"4",width:"16",height:"16",rx:"2"}],["path",{d:"M4 9.5h16"}],["path",{d:"M4 15h16"}],["path",{d:"M10 9.5V20"}]],mover:[["path",{d:"M4.5 12h14"}],["path",{d:"M13.5 6.5 19 12l-5.5 5.5"}]],sol:[["circle",{cx:"12",cy:"12",r:"3.8"}],["path",{d:"M12 2.8v2M12 19.2v2M2.8 12h2M19.2 12h2M5.5 5.5l1.4 1.4M17.1 17.1l1.4 1.4M5.5 18.5l1.4-1.4M17.1 6.9l1.4-1.4"}]],teclado:[["rect",{x:"3",y:"6.5",width:"18",height:"11",rx:"2"}],["path",{d:"M7 10h.01M10.3 10h.01M13.7 10h.01M17 10h.01M8 14h8"}]],gantt:[["path",{d:"M4 5h9M7 12h11M4 19h7"}],["path",{d:"M3 3v18"}]],demandas:[["circle",{cx:"10",cy:"7.8",r:"3.2"}],["path",{d:"M3.8 19.5a6.2 5.2 0 0 1 11.8-2.6"}],["circle",{cx:"17.6",cy:"17.6",r:"4.2"}],["path",{d:"m15.6 17.7 1.5 1.5 2.5-3"}]]},Bs=Object.keys(Fr);function X(o,e=18,t=document){let r="http://www.w3.org/2000/svg",a=t.createElementNS(r,"svg"),n={viewBox:"0 0 24 24",width:String(e),height:String(e),fill:"none",stroke:"currentColor","stroke-width":"1.8","stroke-linecap":"round","stroke-linejoin":"round","aria-hidden":"true",focusable:"false",class:"spro-icone"};for(let[s,i]of Object.entries(n))a.setAttribute(s,i);for(let[s,i]of Fr[o]){let c=t.createElementNS(r,s);for(let[l,d]of Object.entries(i))c.setAttribute(l,d);a.append(c)}return a}function jr(o,e,t,r=1e4){let a=URL.createObjectURL(new Blob([e],{type:t})),n=p("a",{href:a,download:o});document.body.append(n),n.click(),n.remove(),setTimeout(()=>URL.revokeObjectURL(a),r).unref?.()}var E=class extends Error{codigo;detalhe;constructor(e,t,r){super(t),this.name="ErroSei",this.codigo=e,this.detalhe=r}paraJSON(){return{codigo:this.codigo,mensagem:this.message,detalhe:this.detalhe}}};function Ne(o){if(o instanceof E)return o;if(o instanceof DOMException&&o.name==="AbortError")return new E("CANCELADO","Opera\xE7\xE3o cancelada.");let e=o instanceof Error?o.message:String(o);return new E("SEI_REDE",`Falha ao falar com o SEI: ${e}`)}var Ja={AElig:198,Aacute:193,Acirc:194,Agrave:192,Aring:197,Atilde:195,Auml:196,Ccedil:199,ETH:208,Eacute:201,Ecirc:202,Egrave:200,Euml:203,Iacute:205,Icirc:206,Igrave:204,Iuml:207,Ntilde:209,Oacute:211,Ocirc:212,Ograve:210,Oslash:216,Otilde:213,Ouml:214,THORN:222,Uacute:218,Ucirc:219,Ugrave:217,Uuml:220,Yacute:221,aacute:225,acirc:226,acute:180,aelig:230,agrave:224,amp:38,apos:39,aring:229,atilde:227,auml:228,brvbar:166,bull:8226,ccedil:231,cedil:184,cent:162,copy:169,curren:164,deg:176,divide:247,eacute:233,ecirc:234,egrave:232,eth:240,euml:235,euro:8364,frac12:189,frac14:188,frac34:190,gt:62,hellip:8230,iacute:237,icirc:238,iexcl:161,igrave:236,iquest:191,iuml:239,laquo:171,ldquo:8220,lsquo:8216,lt:60,macr:175,mdash:8212,micro:181,middot:183,nbsp:160,ndash:8211,not:172,ntilde:241,oacute:243,ocirc:244,ograve:242,ordf:170,ordm:186,oslash:248,otilde:245,ouml:246,para:182,plusmn:177,pound:163,quot:34,raquo:187,rdquo:8221,reg:174,rsquo:8217,sect:167,shy:173,sup1:185,sup2:178,sup3:179,szlig:223,thorn:254,times:215,trade:8482,uacute:250,ucirc:251,ugrave:249,uml:168,uuml:252,yacute:253,yen:165,yuml:255};function F(o){return o.includes("&")?o.replace(/&(#x[0-9a-fA-F]+|#\d+|[a-zA-Z][a-zA-Z0-9]*);/g,(e,t)=>{let r=t[0]==="#"?t[1]==="x"||t[1]==="X"?parseInt(t.slice(2),16):parseInt(t.slice(1),10):Ja[t];return r===void 0||Number.isNaN(r)?e:String.fromCodePoint(r)}):o}var Gr={128:8364,130:8218,131:402,132:8222,133:8230,134:8224,135:8225,136:710,137:8240,138:352,139:8249,140:338,142:381,145:8216,146:8217,147:8220,148:8221,149:8226,150:8211,151:8212,152:732,153:8482,154:353,155:8250,156:339,158:382,159:376};var Ur=null;function ae(o){return Ur?Ur(o):new DOMParser().parseFromString(o,"text/html")}function q(o){return(o?.textContent??"").replace(/\s+/g," ").trim()}var Wa={n:`
`,r:"\r",t:"	",b:"\b",f:"\f",v:"\v",0:"\0"};function Te(o,e){let t=o[e],r="";for(e+=1;e<o.length;){let a=o[e];if(a==="\\"){let n=o[e+1];if(n==="u"&&/^[0-9a-fA-F]{4}$/.test(o.slice(e+2,e+6))){r+=String.fromCharCode(parseInt(o.slice(e+2,e+6),16)),e+=6;continue}r+=Wa[n]??n,e+=2;continue}if(a===t)return[r,e+1];r+=a,e+=1}return[r,e]}function ne(o,e){let t=[],r=e;for(;r<o.length;){let a=o[r];if(a===")")return[t,r+1];if(a===","||/\s/.test(a)){r+=1;continue}if(a==='"'||a==="'"){let[i,c]=Te(o,r);t.push(i),r=c;continue}let n=/^(null|true|false|-?\d+(?:\.\d+)?)/.exec(o.slice(r,r+32));if(n){let i=n[1];t.push(i==="null"?null:i==="true"?!0:i==="false"?!1:Number(i)),r+=i.length;continue}let s=0;for(;r<o.length;){let i=o[r];if(i==="(")s+=1;else if(i===")"){if(s===0)break;s-=1}else if(i===","&&s===0)break;r+=1}t.push(null)}return[t,r]}function go(o,e){let t=[],r=new RegExp(`\\b${e}\\(`,"g");for(let a of o.matchAll(r)){let[n]=ne(o,a.index+a[0].length);t.push(n)}return t}function I(o){return typeof o=="string"?F(o):o==null?"":String(o)}var Za=/controlador(?:_ajax)?\.php\?acao=[^"'\s<>\\]*?infra_hash=[0-9a-f]{64,192}/g;function ho(o){let e=new Set;for(let t of o.replace(/&amp;/g,"&").matchAll(Za))e.add(t[0]);return[...e]}function K(o){let e=o.indexOf("?");return new URLSearchParams(e>=0?o.slice(e+1):"")}function ro(o,e,t={}){let r=Array.isArray(o)?o:ho(o);for(let a of r){let n=K(a),s=n.get("acao")??"";if(!(typeof e=="string"?s!==e:!e.test(s))&&Object.entries(t).every(([i,c])=>n.get(i)===c))return a}return null}function Br(o,e){let t=[...o.doc.querySelectorAll("#infraMenu a[href], #main-menu a[href], .infraMenu a[href]")].map(s=>s.getAttribute("href")??"").join(`
`),r=ho(t).filter(s=>K(s).get("acao")===e),n=(r.length?r:ho(o.html).filter(s=>K(s).get("acao")===e)).sort((s,i)=>[...K(s).keys()].length-[...K(i).keys()].length)[0];if(!n)throw new E("SEI_ACAO_INDISPONIVEL",`O menu do SEI n\xE3o oferece "${e}" para este usu\xE1rio.`);return n}function Ya(o){let e=new Map;for(let t of o.matchAll(/Nos\[(\d+)\]\s*=\s*new\s+infraArvoreNo\(/g)){let[r]=ne(o,t.index+t[0].length);e.set(Number(t[1]),{indice:Number(t[1]),args:r,props:{}})}for(let t of o.matchAll(/Nos\[(\d+)\]\.(\w+)\s*=\s*(['"])/g)){let r=e.get(Number(t[1]));if(!r)continue;let[a]=Te(o,t.index+t[0].length-1);r.props[t[2]]=a}return[...e.values()].sort((t,r)=>t.indice-r.indice)}function on(o){let e=[];for(let t of o.matchAll(/new\s+infraArvoreAcao\(/g)){let[r]=ne(o,t.index+t[0].length);e.push({tipo:I(r[0]),idPai:I(r[2]),href:I(r[3]),titulo:I(r[5]),icone:I(r[6]),extra:r[8]==null?void 0:I(r[8])})}return e}function Qr(o,e){let t=o.find(s=>s.tipo==="NIVEL_ACESSO"&&s.idPai===e);if(!t)return{nivel:"publico"};let[r,...a]=t.titulo.split(`
`);return{nivel:/sigilos/i.test(r)||/sigiloso/.test(t.icone)?"sigiloso":"restrito",hipotese:a.join(" ").trim()||void 0}}function Kr(o){return[...new Set([...o.matchAll(/<img[^>]*\btitle="([^"]+)"/g)].map(e=>I(e[1])))]}var en=/\s*\(\d{5,}\)\s*$/;function rn(o){let e=o.html,t=Ya(e),r=on(e),a=t.find(c=>c.args[0]==="PROCESSO");if(!a)throw new E("SEI_VERSAO_NAO_SUPORTADA","A \xE1rvore do processo n\xE3o tem o n\xF3 do processo.");let n=I(a.args[1]),s=Qr(r,n),i=t.filter(c=>c.args[0]==="DOCUMENTO").map(c=>{let l=I(c.args[1]),d=I(c.args[5]),m=I(c.args[7]),h=(c.props.src??"").replace(/&amp;/g,"&"),A=r.find(x=>x.tipo==="ASSINATURA"&&x.idPai===l),{nivel:y,hipotese:O}=Qr(r,l),j=(/documento_([a-z0-9]+)\.svg/.exec(m)?.[1]??"interno").replace("cancelado","interno");return{id:l,numero:I(c.args[15])||(/\((\d{5,})\)\s*$/.exec(d)?.[1]??""),titulo:d.replace(en,""),pasta:c.args[2]&&String(c.args[2]).startsWith("PASTA")?String(c.args[2]):null,externo:/documento_download_anexo/.test(h)||!/documento_interno|documento_cancelado|formulario|email/.test(m),formato:j,nivel:y,hipotese:O,assinado:!!A,assinaturas:A?A.titulo.split(`
`).slice(1).filter(Boolean):[],cancelado:/documento_cancelado/.test(m),unidadeGeradora:r.find(x=>x.tipo==="UNIDADE_GERADORA"&&x.idPai===l)?.extra,link:I(c.args[3]).replace(/&amp;/g,"&"),src:h,acoes:ho(c.props.acoes??""),botoes:Kr(c.props.acoes??"")}});return{idProcedimento:n,protocolo:I(a.args[5])||I(a.args[15]),tipo:I(a.args[6]),nivel:s.nivel,hipotese:s.hipotese,marcadores:r.filter(c=>c.tipo==="MARCADOR"&&c.idPai===n).map(c=>c.titulo.replace(/^Marcador\n/,"").replace(/\n/g," \u2014 ")),documentos:i,acoesProcesso:ho(a.props.acoes??""),botoesProcesso:Kr(a.props.acoes??""),linkProcesso:I(a.args[3]).replace(/&amp;/g,"&"),sinais:r.filter(c=>c.idPai===n),links:ho(e),pagina:o}}async function Xr(o,e,t){let r=await o.obter(e,t);if(!/acao=procedimento_visualizar/.test(r.url)){let a=r.doc.querySelector("#ifrArvore")?.getAttribute("src");if(!a)throw new E("SEI_NAO_ENCONTRADO","N\xE3o foi poss\xEDvel abrir a \xE1rvore do processo.");r=await o.obter(a,t)}if(/infraArvoreNo\("PASTA"/.test(r.html)){let a=ro(r.html,"procedimento_visualizar")&&ho(r.html).find(n=>/abrir_pastas=1/.test(n));a&&(r=await o.obter(a,t))}return rn(r)}function bo(o,e,t){if(t){let r=o.documentos.find(a=>a.id===t);return r?ro(r.acoes,e):null}return ro(o.acoesProcesso,e)??ro(o.links,e,{id_procedimento:o.idProcedimento})}function so(o,e,t){let r=(e??"").trim(),a=(t??"").trim();return t===void 0||r===a?[]:[{campo:o,antes:r,depois:a}]}var Fo={publico:"0",restrito:"1"},se={0:"P\xFAblico",1:"Restrito",2:"Sigiloso"};async function jo(o,e,t,r){let a=/controlador_ajax\.php\?acao_ajax=hipotese_legal_select[^'"]*/.exec(e.pagina.html)?.[0];return a?o.ajax(F(a),[["primeiroItemValor","null"],["primeiroItemDescricao"," "],["valorItemSelecionado",""],["staNivelAcesso",t]],{sinal:r}):e.opcoes("selHipoteseLegal").filter(n=>n.valor!=="null").map(n=>({id:n.valor,texto:n.texto}))}var Yr="\xA5",_e="\xB1";function Jr(o){return o.map(e=>`${e.id}${_e}${e.texto}`).join(Yr)}function tn(o){return o?o.split(Yr).map(e=>{let[t,...r]=e.split(_e);return{id:t,texto:r.join(_e)}}):[]}function Wr(o){let e=[];for(let t of o.matchAll(/new\s+infraLupaSelect\(\s*['"]([\w-]+)['"]\s*,\s*['"]([\w-]+)['"]/g))e.push([t[1],t[2]]);return e}var V=class o{constructor(e,t,r){this.http=e;this.pagina=t;this.elemento=r,this.id=r.id,this.action=(r.getAttribute("action")??"").replace(/&amp;/g,"&"),this.campos=an(r),this.sincronizarLupas()}id;action;campos;elemento;static async abrir(e,t,r,a){let n=await e.obter(t,a);return o.de(n,r,e)}static de(e,t,r=null){let a=e.doc.querySelector(t);if(!a)throw new E("SEI_VERSAO_NAO_SUPORTADA",`A tela do SEI n\xE3o tem o formul\xE1rio esperado (${t}).`,q(e.doc.querySelector("title")));return new o(r,e,a)}pares(){return this.campos.map(e=>[e.nome,e.valor])}valor(e){return this.campos.find(t=>t.nome===e)?.valor}tem(e){return this.elemento.querySelector(`[name="${e}"]`)!==null||this.campos.some(t=>t.nome===e)}opcoes(e){let t=this.elemento.querySelector(`select[name="${e}"], select#${Zr(e)}`);return t?[...t.querySelectorAll("option")].map(r=>({valor:r.getAttribute("value")??q(r),texto:q(r),selecionada:r.hasAttribute("selected")})):[]}definir(e){for(let[t,r]of Object.entries(e)){if(r===void 0)continue;if(r===null){this.campos=this.campos.filter(n=>n.nome!==t);continue}let a=this.campos.find(n=>n.nome===t);a?a.valor=r:this.campos.push({nome:t,valor:r})}return this}escolher(e,t){let r=this.opcoes(e),a=J(t),n=r.find(s=>s.valor===t)??r.find(s=>J(s.texto)===a)??qe(r.filter(s=>J(s.texto).includes(a)));if(!n)throw new E("ARGUMENTO_INVALIDO",`"${t}" n\xE3o \xE9 uma op\xE7\xE3o de ${e}.`,r.slice(0,40).map(s=>s.texto).join(" | "));return this.definir({[e]:n.valor}),n}linhas(e){return[...this.elemento.querySelectorAll(`${e} tr`)].filter(t=>t.querySelector("input[type=checkbox]"))}itensLupa(e){let t=this.hiddenDaLupa(e);return t?tn(this.valor(t)??""):[]}definirLupa(e,t){let r=this.hiddenDaLupa(e);if(!r)throw new E("SEI_VERSAO_NAO_SUPORTADA",`A lupa ${e} n\xE3o existe nesta tela.`);return this.definir({[r]:Jr(t)}),this.campos=this.campos.filter(a=>a.nome!==e&&a.nome!==`${e}[]`),this}async enviar(e={}){if(!this.http)throw new E("SEI_RESPOSTA_INESPERADA","Formul\xE1rio sem transporte HTTP.");if(!this.action)throw new E("SEI_VERSAO_NAO_SUPORTADA",`O formul\xE1rio ${this.id} n\xE3o tem action.`);let t=this.pares();e.botao&&t.push(this.botaoDeEnvio(e.botao));let r=await this.http.enviar(this.action,t,e);if(e.sucesso&&!e.sucesso(r))throw new E("SEI_RESPOSTA_INESPERADA",`O SEI n\xE3o confirmou ${e.operacao??"a opera\xE7\xE3o"}.`,`${q(r.doc.querySelector("title"))} \u2014 ${r.url.replace(/infra_hash=\w+/,"infra_hash=\u2026")}`);return r}botaoDeEnvio(e){let t=this.elemento.querySelector(`[name="${e}"]`)??qe([...this.elemento.querySelectorAll('button[type="submit"][name^="sbm"], input[type="submit"][name^="sbm"]')]);return t?[t.getAttribute("name")??e,t.getAttribute("value")??q(t)??e]:[e,e]}hiddenDaLupa(e){let t=Wr(this.pagina.html).find(([r])=>r===e);return t?t[1]:null}sincronizarLupas(){for(let[e,t]of Wr(this.pagina.html)){let r=this.elemento.querySelector(`select#${Zr(e)}`);if(!r)continue;let a=[...r.querySelectorAll("option")].map(n=>({id:n.getAttribute("value")??"",texto:q(n)}));(this.valor(t)??"")||this.definir({[t]:Jr(a)}),this.campos=this.campos.filter(n=>n.nome!==e&&n.nome!==`${e}[]`)}}};function an(o){let e=[];for(let t of o.querySelectorAll("input, select, textarea")){let r=t.getAttribute("name");if(!r||t.hasAttribute("disabled"))continue;let a=t.tagName.toLowerCase();if(a==="input"){let n=(t.getAttribute("type")??"text").toLowerCase();if(["submit","button","image","reset","file"].includes(n)||(n==="checkbox"||n==="radio")&&!t.hasAttribute("checked"))continue;e.push({nome:r,valor:t.getAttribute("value")??(n==="checkbox"||n==="radio"?"on":"")})}else if(a==="textarea")e.push({nome:r,valor:t.textContent??""});else{let n=[...t.querySelectorAll("option")],s=n.filter(l=>l.hasAttribute("selected")),i=t.hasAttribute("multiple"),c=s.length?s:!i&&n.length?[n[0]]:[];for(let l of c)e.push({nome:r,valor:l.getAttribute("value")??q(l)})}}return e}function J(o){return o.normalize("NFD").replace(/[\u0300-\u036F]/g,"").toLowerCase().replace(/\s+/g," ").trim()}function Ve(o,e,t){let r=J(e),a=o.find(n=>n.id===e)??o.find(n=>J(n.texto)===r)??qe(o.filter(n=>J(n.texto).includes(r)));if(!a)throw new E("ARGUMENTO_INVALIDO",`${t} "${e}" n\xE3o encontrado(a) ou amb\xEDguo(a).`,o.slice(0,40).map(n=>n.texto).join(" | "));return a}function qe(o){return o.length===1?o[0]:void 0}function Zr(o){return o.replace(/([^\w-])/g,"\\$1")}async function nn(o,e,t){let r=bo(e,"documento_escolher_tipo");if(!r)throw new E("SEI_ACAO_INDISPONIVEL",`N\xE3o \xE9 poss\xEDvel incluir documento no processo ${e.protocolo} (fechado na unidade?).`);let a=await V.abrir(o.http,r,"#frmDocumentoEscolherTipo",{sinal:t});if(a.tem("hdnFiltroSerie")&&a.valor("hdnFiltroSerie")!=="T"){let n=await a.definir({hdnFiltroSerie:"T"}).enviar({sinal:t});a=V.de(n,"#frmDocumentoEscolherTipo",o.http)}return a}function sn(o){let e=new Map;for(let t of o.doc.querySelectorAll("[onclick*='escolher(']")){let r=/escolher\((-?\d+)\)/.exec(t.getAttribute("onclick")??"")?.[1];r&&!e.has(r)&&e.set(r,q(t))}for(let t of o.doc.querySelectorAll("a[href*='id_serie=']")){let r=K(t.getAttribute("href")??"").get("id_serie");r&&!e.has(r)&&e.set(r,q(t))}return[...e].filter(([,t])=>t).map(([t,r])=>({id:t,nome:r}))}async function ot(o,e,t){let r=await o.arvore(e,{sinal:t});return sn((await nn(o,r,t)).pagina)}var et={tipos_processo:{acao:"procedimento_alterar",form:"#frmProcedimentoCadastro",campo:"selTipoProcedimento"},hipoteses_legais:{acao:"procedimento_alterar",form:"#frmProcedimentoCadastro",campo:"selHipoteseLegal"},usuarios:{acao:"procedimento_atribuicao_cadastrar",form:"#frmAtividadeAtribuir",campo:"selAtribuicao"},marcadores:{acao:"andamento_marcador_gerenciar",form:"#frmAndamentoMarcadorCadastro",campo:"selMarcador"},grupos_acompanhamento:{acao:"acompanhamento_gerenciar",form:"#frmAcompanhamentoCadastro",campo:"selGrupoAcompanhamento"}};async function He(o,e,t,r={}){let a;if(e==="tipos_documento")a=(await ot(o,t,r.sinal)).map(s=>({id:s.id,nome:s.nome}));else{let s=et[e];if(!s)throw new E("ARGUMENTO_INVALIDO",`Lista desconhecida: ${e}.`,Object.keys(et).concat("tipos_documento").join(" | "));let i=await o.arvore(t,{sinal:r.sinal}),c=bo(i,s.acao);if(!c)throw new E("SEI_ACAO_INDISPONIVEL",`Para listar ${e} use um processo aberto na sua unidade.`);if(e==="marcadores"&&(c=ro((await o.http.obter(c,{sinal:r.sinal,aceitarValidacao:!0})).html,"andamento_marcador_cadastrar"),!c))throw new E("SEI_VERSAO_NAO_SUPORTADA","Tela de marcadores n\xE3o reconhecida.");let l=await V.abrir(o.http,c,s.form,{sinal:r.sinal,aceitarValidacao:!0});a=e==="hipoteses_legais"?(await jo(o,l,"1",r.sinal)).map(d=>({id:d.id,nome:d.texto})):l.opcoes(s.campo).filter(d=>d.valor&&d.valor!=="null"&&d.texto).map(d=>({id:d.valor,nome:d.texto}))}let n=r.filtro?J(r.filtro):"";return n?a.filter(s=>J(s.nome).includes(n)):a}function rt(o,e){let t=o.valor(e);return o.opcoes(e).find(r=>r.valor===t&&t!=="null")?.texto??""}async function cn(o,e,t){let r=bo(e,"procedimento_alterar"),a=r??bo(e,"procedimento_consultar");if(!a)throw new E("SEI_ACAO_INDISPONIVEL",`O SEI n\xE3o oferece a consulta do processo ${e.protocolo} para voc\xEA.`);return{form:await V.abrir(o,a,"#frmProcedimentoCadastro",t),editavel:!!r}}function tt(o){return o.map(e=>e.texto).filter(Boolean)}async function at(o,e,t,r){let a=await o.arvore(e,{sinal:r.sinal});if(a.nivel==="sigiloso")throw new E("SEI_SIGILOSO","Processo sigiloso: o agente n\xE3o atua nele.");let{form:n,editavel:s}=await cn(o.http,a,{sinal:r.sinal});if(!s)throw new E("SEI_ACAO_INDISPONIVEL",`O processo ${a.protocolo} n\xE3o est\xE1 aberto na sua unidade.`);let i=[];if(t.especificacao!==void 0&&(i.push(...so("Especifica\xE7\xE3o",n.valor("txtDescricao"),t.especificacao)),n.definir({txtDescricao:t.especificacao.slice(0,100)})),t.tipo!==void 0){let l=rt(n,"selTipoProcedimento"),d=n.escolher("selTipoProcedimento",t.tipo);n.definir({hdnIdTipoProcedimento:d.valor}),i.push(...so("Tipo",l,d.texto))}if(t.nivel!==void 0){let l=se[n.valor("rdoNivelAcesso")??""]??"";n.definir({rdoNivelAcesso:Fo[t.nivel]}),i.push(...so("N\xEDvel de acesso",l,se[Fo[t.nivel]])),t.nivel==="publico"&&n.definir({selHipoteseLegal:"null"})}if(t.hipotese!==void 0){let l=rt(n,"selHipoteseLegal"),d=n.valor("rdoNivelAcesso")||Fo.restrito,m=Ve(await jo(o,n,d,r.sinal),t.hipotese,"Hip\xF3tese legal");n.definir({selHipoteseLegal:m.id}),i.push(...so("Hip\xF3tese legal",l,m.texto))}if(n.valor("rdoNivelAcesso")==="1"&&(n.valor("selHipoteseLegal")??"null")==="null")throw new E("ARGUMENTO_INVALIDO","Processo restrito exige hip\xF3tese legal. Informe a hip\xF3tese.");t.observacoes!==void 0&&(i.push(...so("Observa\xE7\xF5es da unidade",n.valor("txaObservacoes"),t.observacoes)),n.definir({txaObservacoes:t.observacoes})),t.interessados!==void 0&&(i.push(...so("Interessados",tt(n.itensLupa("selInteressadosProcedimento")).join("; "),tt(t.interessados).join("; "))),n.definirLupa("selInteressadosProcedimento",t.interessados));let c={alvo:a.protocolo,mudancas:i,aplicado:!1,resumo:""};return i.length?r.aplicar?(n.definir({hdnFlagProcedimentoCadastro:"2"}),await n.enviar({sinal:r.sinal,operacao:`a altera\xE7\xE3o do processo ${a.protocolo}`,sucesso:l=>K(l.url).get("acao")!=="procedimento_alterar"}),o.invalidar(a.idProcedimento),{...c,aplicado:!0,resumo:`Processo ${a.protocolo} alterado.`}):{...c,resumo:`${i.length} campo(s) a alterar.`}:{...c,resumo:"Nada a alterar: os valores j\xE1 s\xE3o esses."}}async function st(o,e,t){let r=await o.arvore(e,{sinal:t});if(r.nivel==="sigiloso")throw new E("SEI_SIGILOSO","Processo sigiloso: o agente n\xE3o atua nele.");return r}function it(o,e,t){let r=bo(o,e);if(!r)throw new E("SEI_ACAO_INDISPONIVEL",`"${t}" n\xE3o est\xE1 dispon\xEDvel no processo ${o.protocolo} (processo fechado na unidade ou sem permiss\xE3o).`);return r}var ct=o=>e=>K(e.url).get("acao")!==o;async function ln(o,e,t,r){let a=await o.http.obter(it(e,t.acao,t.nomeAcao),{sinal:r,aceitarValidacao:!0});if(a.doc.querySelector(t.form))return V.de(a,t.form,o.http);let n=(t.formularios??[]).map(s=>ro(a.html,s)).find(Boolean);if(!n)throw new E("SEI_VERSAO_NAO_SUPORTADA",`A tela "${t.nomeAcao}" n\xE3o tem o formul\xE1rio esperado.`);return V.abrir(o.http,n,t.form,{sinal:r,aceitarValidacao:!0})}async function pn(o,e,t,r){let a=await st(o,e,r.sinal),n=await ln(o,a,t,r.sinal),s=t.preparar(n),i={alvo:a.protocolo,mudancas:s,aplicado:!1,resumo:""};return s.length?r.aplicar?(await n.enviar({sinal:r.sinal,botao:t.botao,operacao:`${t.nomeAcao} em ${a.protocolo}`,sucesso:t.sucesso??ct(t.acao)}),o.invalidar(a.idProcedimento),{...i,aplicado:!0,resumo:t.resumo(a.protocolo).replace(/^Vai /,"")}):{...i,resumo:t.resumo(a.protocolo)}:{...i,resumo:"Nada a alterar: j\xE1 est\xE1 assim."}}function lt(o,e,t,r){return pn(o,e,{acao:"procedimento_atribuicao_cadastrar",nomeAcao:"Atribuir Processo",form:"#frmAtividadeAtribuir",botao:"sbmSalvar",preparar:a=>{let n=a.opcoes("selAtribuicao").find(l=>l.valor===a.valor("selAtribuicao")&&l.valor!=="null")?.texto??"";if(t===null)return a.definir({selAtribuicao:"null"}),[{campo:"Atribui\xE7\xE3o",antes:n||"(atribui\xE7\xE3o atual)",depois:"(nenhuma)"}];let s=J(t),i=a.opcoes("selAtribuicao").filter(l=>l.valor!=="null"),c=i.find(l=>l.valor===t)??i.find(l=>J(l.texto.split(" - ")[0])===s)??i.find(l=>J(l.texto.split(" - ").slice(1).join(" - "))===s)??(i.filter(l=>J(l.texto).includes(s)).length===1?i.find(l=>J(l.texto).includes(s)):void 0);if(!c)throw new E("ARGUMENTO_INVALIDO",`Usu\xE1rio "${t}" n\xE3o encontrado (ou amb\xEDguo) na unidade.`,i.map(l=>l.texto).join(" | "));return a.definir({selAtribuicao:c.valor}),so("Atribui\xE7\xE3o",n,c.texto)},resumo:a=>t?`Processo ${a} atribu\xEDdo.`:`Atribui\xE7\xE3o removida de ${a}.`},r)}async function dn(o,e,t){let r=it(e,"andamento_marcador_gerenciar","Gerenciar Marcador");return o.http.obter(r,{sinal:t,aceitarValidacao:!0})}function nt(o){return[...o.doc.querySelectorAll("#tblMarcadores tr")].filter(t=>t.querySelector("input[type=checkbox]")).map(t=>{let r=[...t.querySelectorAll("td")];return{id:t.querySelector("input[type=checkbox]")?.getAttribute("value")??"",marcador:q(r[1]),texto:q(r[2]),usuario:q(r[3]),data:q(r[4])}})}async function pt(o,e,t,r){let a=await st(o,e,r.sinal),n=await dn(o,a,r.sinal),s=nt(n),i=J(t.marcador),c=s.find(h=>J(h.marcador)===i),l={alvo:a.protocolo,mudancas:[],aplicado:!1,resumo:""};if(t.remover){if(!c)return{...l,resumo:`O processo ${a.protocolo} n\xE3o tem o marcador "${t.marcador}".`};if(l.mudancas=[{campo:"Marcador",antes:`${c.marcador}${c.texto?`: ${c.texto}`:""}`,depois:""}],!r.aplicar)return{...l,resumo:`Vai remover o marcador "${c.marcador}" de ${a.protocolo}.`};let h=ro(n.html,"andamento_marcador_remover");if(!h)throw new E("SEI_ACAO_INDISPONIVEL","A tela de marcadores n\xE3o oferece remo\xE7\xE3o.");let A=V.de(n,"#frmGerenciarMarcador",o.http);A.definir({hdnInfraItemId:c.id,hdnInfraItensSelecionados:c.id});let y=await o.http.enviar(h,A.pares(),{sinal:r.sinal,aceitarValidacao:!0});if(nt(y).some(O=>O.id===c.id))throw new E("SEI_RESPOSTA_INESPERADA",`O SEI n\xE3o removeu o marcador "${c.marcador}".`);return o.invalidar(a.idProcedimento),{...l,aplicado:!0,resumo:`Marcador "${c.marcador}" removido de ${a.protocolo}.`}}let d;if(n.doc.querySelector("#frmAndamentoMarcadorCadastro"))d=V.de(n,"#frmAndamentoMarcadorCadastro",o.http);else{let h=ro(n.html,"andamento_marcador_cadastrar");if(!h)throw new E("SEI_VERSAO_NAO_SUPORTADA","Esta vers\xE3o do SEI n\xE3o tem a tela de marcadores esperada (4.1 ou superior).");d=await V.abrir(o.http,h,"#frmAndamentoMarcadorCadastro",{sinal:r.sinal})}let m=d.escolher("selMarcador",t.marcador);return d.definir({hdnIdMarcador:m.valor,txaTexto:(t.texto??c?.texto??"").slice(0,250)}),l.mudancas=c?so(`Texto do marcador ${m.texto}`,c.texto,t.texto):[{campo:"Marcador",antes:"",depois:`${m.texto}${t.texto?`: ${t.texto}`:""}`}],l.mudancas.length?r.aplicar?(await d.enviar({sinal:r.sinal,botao:"sbmSalvar",operacao:`o marcador em ${a.protocolo}`,sucesso:ct("andamento_marcador_cadastrar")}),o.invalidar(a.idProcedimento),{...l,aplicado:!0,resumo:`Marcador "${m.texto}" aplicado em ${a.protocolo}.`}):{...l,resumo:`Vai marcar ${a.protocolo} com "${m.texto}".`}:{...l,resumo:"Nada a alterar: o marcador j\xE1 est\xE1 assim."}}var un={"\u2010":"-","\u2011":"-","\u2012":"-","\u2013":"-","\u2014":"-","\u2015":"-","\u2212":"-","\u2018":"'","\u2019":"'","\u201A":"'","\u201B":"'","\u2032":"'","\u201C":'"',"\u201D":'"',"\u201E":'"',"\u201F":'"',"\u2033":'"',"\u2026":"...","\u2022":"-","\u2002":" ","\u2003":" ","\u2009":" ","\u202F":" ","\u205F":" ","\u200B":"","\u200C":"","\u200D":"","\u2060":"","\uFEFF":"","\u20AC":"EUR","\u2122":"(TM)","\u2192":"->","\u2190":"<-"};function dt(o,e="texto"){let t="";for(let r of o){let a=r.codePointAt(0);if(a<=255){t+=r;continue}let n=un[r];if(e==="html"){t+=n===""?"":`&#${a};`;continue}if(n!==void 0){t+=n;continue}let s=r.normalize("NFKD").replace(/[\u0300-\u036F]/g,"");t+=[...s].every(i=>i.codePointAt(0)<=255)?s:""}return t}var mn=/[A-Za-z0-9\-_.*]/;function ut(o){let e="";for(let t of o)t===" "?e+="+":mn.test(t)?e+=t:e+="%"+t.charCodeAt(0).toString(16).toUpperCase().padStart(2,"0");return e}function mt(o,e={}){return o.map(([t,r])=>{let a=e[t]??"texto";return`${ut(dt(t))}=${ut(dt(r??"",a))}`}).join("&")}function Fe(o){let e=o instanceof Uint8Array?o:new Uint8Array(o),t=[],r=16384;for(let a=0;a<e.length;a+=r){let n=e.subarray(a,a+r),s=new Array(n.length);for(let i=0;i<n.length;i+=1)s[i]=Gr[n[i]]??n[i];t.push(String.fromCharCode(...s))}return t.join("")}var ft="application/x-www-form-urlencoded; charset=ISO-8859-1";function gt(o,e,t){let r=null;return{url:o,status:e,html:t,get doc(){return r??=ae(t)}}}function ht(o,e={}){if(/\/login\.php/i.test(o.url)||/[?&]acao=(?:infra_)?sair\b/.test(o.url))throw new E("SEI_SESSAO_EXPIRADA","A sess\xE3o do SEI foi encerrada. Fa\xE7a login de novo no SEI e repita o pedido.");if(o.status>=500)throw new E("SEI_EXCECAO",`O SEI respondeu com erro ${o.status}.`);if(o.html.includes('id="divInfraExcecao"')){let t=o.doc.querySelector("#divInfraExcecao");if(t){let r=q(t);throw new E("SEI_EXCECAO",r||"O SEI exibiu uma p\xE1gina de erro.",r)}}if(!e.aceitarValidacao&&o.html.includes("txaInfraValidacao")){let t=o.doc.querySelector("#txaInfraValidacao")?.textContent?.trim()??"";if(t)throw new E("SEI_VALIDACAO",t,t)}return o}function bt(o,e={}){let t=new URL(".",o),r=e.fetch??((...m)=>fetch(...m)),a=Math.max(1,e.concorrencia??3),n=0,s=[];async function i(m){n>=a&&await new Promise(h=>s.push(h)),n+=1;try{return await m()}finally{n-=1,s.shift()?.()}}let c=m=>new URL(m.replace(/&amp;/g,"&"),t).href;async function l(m,h,A){return i(async()=>{try{let y=await r(c(m),{credentials:"same-origin",redirect:"follow",...h,signal:A.sinal}),O=Fe(await y.arrayBuffer());return ht(gt(y.url||c(m),y.status,O),A)}catch(y){throw Ne(y)}})}async function d(m,h={}){return i(async()=>{try{let A=await r(c(m),{credentials:"same-origin",redirect:"follow",signal:h.sinal}),y=new Uint8Array(await A.arrayBuffer()),O=(A.headers?.get("content-type")??"").split(";")[0].trim().toLowerCase();O==="text/html"&&ht(gt(A.url||c(m),A.status,Fe(y)),h);let j=A.headers?.get("content-disposition")??"",x=decodeURIComponent(/filename\*=UTF-8''([^;]+)/i.exec(j)?.[1]??/filename="?([^";]+)"?/i.exec(j)?.[1]??"");return{bytes:y,tipo:O,nome:x}}catch(A){throw Ne(A)}})}return{base:t,absoluta:c,baixar:d,obter:(m,h={})=>l(m,{method:"GET"},h),enviar:(m,h,A={})=>l(m,{method:"POST",headers:{"Content-Type":ft},body:mt(h,A.modos)},A)}}function fn(o){let e=/Sistema Eletr(?:\u00F4|&ocirc;|\\u00F4)nico de Informa[^"]*?Vers(?:\u00E3|&atilde;)o\s*([\d.]+)/i.exec(o);return e?e[1]:/\.(?:js|svg|css)\?(\d+\.\d+\.\d+)-/.exec(o)?.[1]??""}function gn(o){let e=o.doc.querySelector("#lnkInfraUnidade")?.getAttribute("onclick")??"",t=/infra_unidade_atual=(\d+)/.exec(e)?.[1];if(t)return t;let r=/[?&]infra_unidade_atual=(\d+)/.exec(o.url)?.[1];return r||(o.doc.querySelector("#selInfraUnidades option[selected]")?.getAttribute("value")??"")}function je(o){let e=o.doc,t=e.querySelector("#lnkInfraUnidade"),r=e.querySelector("#lnkUsuarioSistema")?.getAttribute("title")??"",[,a="",n="",s=""]=/^(.*?)\s*\(([^/)]+)(?:\/([^)]+))?/.exec(r)??[],i=fn(o.html);return{host:new URL(o.url).host,versao:i,maior:Number(i.split(".")[0])||0,unidade:{id:gn(o),sigla:q(t)||q(e.querySelector("#selInfraUnidades option[selected]")),nome:t?.getAttribute("title")??""},usuario:{nome:a.trim(),login:n.trim(),orgao:s.trim()}}}var hn=3e4,ie=class{constructor(e,t=null,r){this.paginaViva=t;this.http=bt(e,r)}http;paginaBase=null;arvores=new Map;localizados=new Map;base(){let e=this.paginaViva?.();if(e&&e.html.includes("frmProtocoloPesquisaRapida"))return e;if(this.paginaBase)return this.paginaBase;if(e)return e;throw new E("SEI_NAO_ENCONTRADO","Abra uma tela do SEI (por exemplo, Controle de Processos) nesta aba.")}contexto(){return je(this.base())}linkMenu(e){return Br(this.base(),e)}async renovarBase(e){return this.paginaBase=await this.http.obter(this.linkMenu("procedimento_controlar"),e),this.arvores.clear(),this.localizados.clear(),this.paginaBase}async localizar(e,t){let r=e.trim();if(!r)throw new E("ARGUMENTO_INVALIDO","Informe o n\xFAmero do processo ou o n\xBA SEI do documento.");let a=this.localizados.get(r);if(a)return a;let n=V.de(this.base(),"#frmProtocoloPesquisaRapida",this.http);n.definir({txtPesquisaRapida:r});let s=await n.enviar(t),i=K(s.url);if(i.get("acao")!=="procedimento_trabalhar")throw new E("SEI_NAO_ENCONTRADO",`Nada encontrado no SEI para "${r}", ou voc\xEA n\xE3o tem acesso a ele.`);let c=s.doc.querySelector("#ifrArvore")?.getAttribute("src");if(!c)throw new E("SEI_VERSAO_NAO_SUPORTADA","A tela do processo n\xE3o trouxe a \xE1rvore.");let d=K(F(c)).get("id_procedimento")??"",m=i.get("id_protocolo")??"",h={idProcedimento:d,idDocumento:m&&m!==d?m:void 0,linkArvore:F(c)};return this.localizados.set(r,h),h}async arvore(e,t={}){let r=await this.localizar(e,t),a=this.arvores.get(r.idProcedimento);if(a&&!t.forcar&&Date.now()-a.quando<hn)return a.arvore;let n=await Xr(this.http,r.linkArvore,t);return this.arvores.set(r.idProcedimento,{quando:Date.now(),arvore:n}),n}invalidar(e){e?this.arvores.delete(e):this.arvores.clear()}async ajax(e,t,r){let a=await this.http.enviar(e,t,{...r,aceitarValidacao:!0}),n=[];for(let s of a.html.matchAll(/<option[^>]*value="([^"]*)"[^>]*>([^<]*)<\/option>/g))n.push({id:F(s[1]),texto:F(s[2]).trim()});for(let s of a.html.matchAll(/<item\s+([^>]*)>/g)){let i=ae(`<i ${s[1]}></i>`).querySelector("i");n.push({id:i?.getAttribute("id")??"",texto:i?.getAttribute("descricao")??i?.getAttribute("complemento")??""})}return n.filter(s=>s.id&&s.id!=="null")}};function Go(o,e=o.location?.href??"https://sei.invalido/sei/controlador.php"){return{url:e,status:200,get html(){return o.documentElement.outerHTML},doc:o}}var bn='a[onclick*="acaoControleProcessos"]';function vt(o){let e=new Set,t=[];for(let r of o.querySelectorAll(bn)){let a=/[?&]acao=([a-z0-9_]+)/.exec(r.getAttribute("onclick")??"")?.[1],n=r.querySelector("img");if(!a||!n||e.has(a))continue;e.add(a);let s=n.getAttribute("title")||n.getAttribute("alt")||a,i=n.getAttribute("src")??"";try{i=new URL(i,o.baseURI||o.location?.href).href}catch{}t.push({acao:a,rotulo:s,icone:i,elemento:r})}return t}var Y="data-spro-grade",vo="data-spro-grade-pronta",Uo="data-spro-grade-escuro",Ge="spro_grade",Ue="spro-grade-pre";var vn="#tblProcessosRecebidos, #tblProcessosGerados, #tblProcessosDetalhado";function xn(){let o=vn.split(", ").map(r=>`html[${Y}] ${r}`).join(`,
`),e=`html[${Y}]:not([${vo}]) #divTabelaProcesso::before,
html[${Y}]:not([${vo}]) #frmProcedimentoControlar:not(:has(#divTabelaProcesso))::before`,t=["#divFiltro","#newFiltro","#processosProActions"].map(r=>`html[${Y}] ${r}`).join(`,
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
html[${Y}][${Uo}]:not([${vo}]) #divTabelaProcesso::before,
html[${Y}][${Uo}]:not([${vo}]) #frmProcedimentoControlar:not(:has(#divTabelaProcesso))::before { --spro-sk: #2c333b; --spro-sk-2: #232a31; }
@keyframes spro-grade-pulso { 0%, 100% { opacity: 1; } 50% { opacity: 0.55; } }
@media (prefers-reduced-motion: reduce) {
  html[${Y}]:not([${vo}]) #divTabelaProcesso::before,
  html[${Y}]:not([${vo}]) #frmProcedimentoControlar:not(:has(#divTabelaProcesso))::before { animation: none; }
}`}function xt(o){try{return o.getItem(Ge)==="1"}catch{return!1}}function At(o,e){try{e?o.setItem(Ge,"1"):o.removeItem(Ge)}catch{}}function ce(o,e){let t=o.documentElement;if(t.setAttribute(Y,"1"),t.removeAttribute(vo),e?t.setAttribute(Uo,"1"):t.removeAttribute(Uo),!o.getElementById(Ue)){let r=o.createElement("style");r.id=Ue,r.textContent=xn(),(o.head??t).append(r)}}function le(o){let e=o.documentElement;e.removeAttribute(Y),e.removeAttribute(vo),e.removeAttribute(Uo),o.getElementById(Ue)?.remove()}var wo=o=>o.documentElement.hasAttribute(Y);function Be(o){o.documentElement.setAttribute(vo,"1")}function Qe(o,e={setTimeout:(t,r)=>setTimeout(t,r),clearTimeout:t=>clearTimeout(t)}){let t=!1,r,a=s=>{t||(t=!0,e.clearTimeout(n),e.clearTimeout(r),o(s))},n=e.setTimeout(()=>a("teto"),1e4);return{iniciarContagem(){t||(r=e.setTimeout(()=>a("prazo"),1500))},pronta(){t=!0,e.clearTimeout(n),e.clearTimeout(r)},falhou:s=>a(s),encerrada:()=>t}}var yt="http://www.w3.org/2000/svg",An={grade:[["rect",{x:"3.5",y:"4.5",width:"17",height:"15",rx:"2"}],["path",{d:"M3.5 9.5h17M9 9.5v10M3.5 14.5h17"}]],quadro:[["rect",{x:"3.5",y:"4.5",width:"4.6",height:"15",rx:"1.2"}],["rect",{x:"9.7",y:"4.5",width:"4.6",height:"9",rx:"1.2"}],["rect",{x:"15.9",y:"4.5",width:"4.6",height:"12",rx:"1.2"}]],lista:[["path",{d:"M8 6.5h12M8 12h12M8 17.5h12M4 6.5h.01M4 12h.01M4 17.5h.01"}]],agrupar:[["path",{d:"M4 6h16M4 12h10M4 18h13"}],["path",{d:"M18 10l3 2-3 2"}]],colunas:[["rect",{x:"3.5",y:"4.5",width:"17",height:"15",rx:"2"}],["path",{d:"M9.2 4.5v15M14.8 4.5v15"}]],disquete:[["path",{d:"M5 4.5h11l3.5 3.5v11a1.5 1.5 0 0 1-1.5 1.5H6.5A1.5 1.5 0 0 1 5 19z"}],["path",{d:"M8 4.5v5h7v-5M8 20v-6h8v6"}]],densidade:[["path",{d:"M4 6h16M4 10h16M4 14h16M4 18h16"}]],semPessoa:[["circle",{cx:"12",cy:"8.5",r:"3.6"}],["path",{d:"M5 20c.8-3.6 3.5-5.5 7-5.5s6.2 1.9 7 5.5M4 4l16 16"}]],olhoFechado:[["path",{d:"M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z"}],["circle",{cx:"12",cy:"12",r:"2.8"}],["path",{d:"M4 4l16 16"}]],seta:[["path",{d:"M6 9l6 6 6-6"}]],setaDireita:[["path",{d:"M9 6l6 6-6 6"}]],desfazer:[["path",{d:"M9 14L4 9l5-5M4 9h10a6 6 0 0 1 0 12h-3"}]],bloquear:[["circle",{cx:"12",cy:"12",r:"8.5"}],["path",{d:"M6 6l12 12"}]],informacao:[["circle",{cx:"12",cy:"12",r:"8.5"}],["path",{d:"M12 11v5M12 8h.01"}]]};function co(o,e=16,t=document){let r=t.createElementNS(yt,"svg"),a={viewBox:"0 0 24 24",width:String(e),height:String(e),fill:"none",stroke:"currentColor","stroke-width":"1.8","stroke-linecap":"round","stroke-linejoin":"round","aria-hidden":"true",focusable:"false",class:"spro-icone"};for(let[n,s]of Object.entries(a))r.setAttribute(n,s);for(let[n,s]of An[o]){let i=t.createElementNS(yt,n);for(let[c,l]of Object.entries(s))i.setAttribute(c,l);r.append(i)}return r}var pe="spro-grade-botao",yn="#processosSEIPro .titlePanelHome, #processosSEIPro #divInfraBarraLocalizacao, #divInfraBarraLocalizacao.titlePanelHome, #divInfraBarraLocalizacao",En="Usar a vis\xE3o nova do controle de processos",Sn="Voltar \xE0 vis\xE3o nativa do SEI";function Pn(o,e,t){let r=o.querySelector(yn);if(!r)return!1;let a=e?Sn:En,n=r.querySelector(`.${pe}`);if(!n){n=o.createElement("button"),n.type="button",n.className=pe,n.append(co("grade",18,o));let s=r.querySelector(".spro-fav-recolher");s?s.before(n):r.append(n)}return n.title=a,n.setAttribute("aria-label",a),n.setAttribute("aria-pressed",String(e)),!0}function St(o,e){let t=r=>{(r.composedPath?.()[0]??r.target)?.closest?.(`.${pe}`)&&(r.preventDefault(),r.stopPropagation(),e())};return o.addEventListener("click",t,!0),()=>o.removeEventListener("click",t,!0)}var Et=o=>{for(let e of o.querySelectorAll(`.${pe}`))e.remove()};function de(o,e,t){let r=()=>Pn(o,e(),t);r();let a=o.defaultView?.MutationObserver;if(!a||!o.body)return()=>Et(o);let n=!1,s=new a(()=>{n||(n=!0,queueMicrotask(()=>{n=!1,s.disconnect(),r(),s.observe(o.body,{childList:!0,subtree:!0})}))});return s.observe(o.body,{childList:!0,subtree:!0}),()=>{s.disconnect(),Et(o)}}function U(o){return o.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/\s+/g," ").trim()}var wn=/<div(?: style="text-decoration: line-through;")?><i class="(far fa-square|fas fa-check-square)"><\/i> ?([\s\S]*?)<\/div>/g;function Mn(o){return o.includes("<div")?o.replace(wn,(e,t,r)=>`
${t==="far fa-square"?"[ ]":"[X]"} ${r}
`).replace(/\n{2,}/g,`
`).trim():o}var Cn=/^Anota[\u00e7c][\u00e3a]o( com prioridade)?\s+\/\s+([\s\S]*)\s+\/\s+(.*)$/i;function Pt(o){let e=o.querySelector('a[href*="acao=anotacao_registrar"]');if(!e)return null;let t=e.querySelector("img")?.getAttribute("src")??"",r=/anotacao2\.|prioridade/i.test(t),a=Cn.exec(e.getAttribute("aria-label")??"");if(a){let i=F(a[2]).replace(/\r\n?/g,`
`).trim();return i?{texto:i,autor:a[3].trim(),prioridade:!!a[1]||r}:null}let n=go(e.getAttribute("onmouseover")??"","infraTooltipMostrar")[0];if(typeof n?.[0]!="string")return null;let s=Mn(I(n[0])).trim();return s?{texto:s,autor:I(n[1]).trim(),prioridade:r}:null}function wt(o,e,t){if(e){let a={idProcedimento:o,origem:"nativo",vencimento:e.data,idControlePrazo:e.idControlePrazo,sigla:e.sigla,linkNativo:e.link,...e.concluidoEm?{concluidoEm:e.concluidoEm}:{}};return t?.vencimento&&t.data===e.data?{...a,origem:"ambos",hora:t.hora,texto:t.texto||void 0}:a}if(!t)return null;let r={idProcedimento:o,origem:"marcador",hora:t.hora,texto:t.texto||void 0};return t.vencimento?{...r,vencimento:t.data}:{...r,inicio:t.data}}var kn='a[href*="acao=controle_prazo_definir"]',On=/^Controle de Prazo\s*\/\s*(\S+)\s+(\d{2})\/(\d{2})\/(\d{4})\s*\(([^)]*)\)\s*$/s,Mt=(o,e,t)=>`${t}-${e}-${o}`;function Ln(o){let e=o.trim().toLowerCase(),t=/^conclu[i\u00ED]do em (\d{2})\/(\d{2})\/(\d{4})$/.exec(e);return t?{estado:"concluido",concluidoEm:Mt(t[1],t[2],t[3])}:/^at[e\u00E9] hoje$/.test(e)?{estado:"hoje"}:/^atrasado \d+ dias?$/.test(e)?{estado:"atrasado"}:/^\d+ dias?$/.test(e)?{estado:"noPrazo"}:null}function Ke(o){let e=o.querySelector(kn);if(!e)return null;let t=e.getAttribute("aria-label")??"";if(!t){let l=go(e.getAttribute("onmouseover")??"","infraTooltipMostrar")[0];typeof l?.[0]=="string"&&(t=`Controle de Prazo / ${I(l[0])}`)}let r=On.exec(F(t).replace(/\s+/g," ").trim());if(!r)return null;let a=Ln(r[5]);if(!a)return null;let n=F(e.getAttribute("href")??""),s=K(n),i=s.get("id_controle_prazo")??"",c=s.get("id_procedimento")??o.id.replace(/^P/,"");return!i||!c?null:{idControlePrazo:i,idProcedimento:c,sigla:r[1],data:Mt(r[2],r[3],r[4]),link:n,...a}}var Ct=/(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(\d{4})/,kt=/\b([01]?\d|2[0-3]):([0-5]\d)\b/,Ot=new RegExp("(?<!\\p{L})at[e\\u00E9](?!\\p{L})","iu");function In(o,e,t){let r=`${t}-${e}-${o}`;try{return te(re(r))===r?r:null}catch{return null}}var Dn=o=>o.padStart(2,"0");function Xe(o){let e=o.replace(/\r\n?/g,`
`),t=Ct.exec(e);if(!t)return null;let r=In(t[1],t[2],t[3]);if(!r)return null;let a=kt.exec(e),n=a?`${Dn(a[1])}:${a[2]}`:void 0,s=Ot.test(e),i=e.replace(Ot,"").replace(Ct,"");return a&&(i=i.replace(kt,"")),i=i.replace(/[ \t]+/g," ").replace(/^[ \t]*\n+|\n+[ \t]*$/g,"").trim(),{data:r,hora:n,vencimento:s,texto:i}}function Lt(o){let e=[];for(let t of o.querySelectorAll('a[href*="acao=andamento_marcador_gerenciar"]')){let r=go(t.getAttribute("onmouseover")??"","infraTooltipMostrar")[0];typeof r?.[0]=="string"&&e.push({texto:I(r[0]),nome:I(r[1])})}return e}function It(o,e){let t=o.querySelector("input[type=checkbox]"),r=o.querySelector("a[href*='procedimento_trabalhar']");if(!t||!r)return null;let a=t.getAttribute("aria-label")??"",n=/^Sigiloso\b/.test(a)||/Sigiloso/.test(r.getAttribute("class")??""),s=[...o.querySelectorAll("td")],i=n?[]:[...s[1]?.querySelectorAll("a[aria-label]")??[]].map(c=>c.getAttribute("aria-label")??"");return{idProcedimento:t.getAttribute("value")??K(r.getAttribute("href")??"").get("id_procedimento")??"",protocolo:t.getAttribute("title")??q(r),grupo:e,tipo:/Tipo (.*?)(?: \/ Especifica|$)/.exec(a)?.[1]?.trim()??"",especificacao:n?"":/Especifica\S* (.*)$/.exec(a)?.[1]?.trim()??"",sigiloso:n,novo:/NaoVisualizado/.test(r.getAttribute("class")??""),atribuido:q(s[s.length-1]).replace(/^\(|\)$/g,""),sinais:i,documentoNovo:!!s[1]?.querySelector("img[src*='exclamacao']")||i.some(c=>/documento foi inclu/i.test(c))}}var $n=/marcador_([a-z0-9_]+)\.svg/i;function zn(o){let e=[];for(let t of o.querySelectorAll('a[href*="acao=andamento_marcador_gerenciar"]')){let r=go(t.getAttribute("onmouseover")??"","infraTooltipMostrar")[0],a=/^Marcador\s*\/\s*(.*)$/s.exec(F(t.getAttribute("aria-label")??"").trim()),n=(typeof r?.[1]=="string"&&r[1]?I(r[1]):a?.[1]??"").trim();n&&e.push({nome:n,cor:$n.exec(t.querySelector("img")?.getAttribute("src")??"")?.[1]??"",texto:typeof r?.[0]=="string"?I(r[0]).trim():""})}return e}function Rn(o){let e=[];for(let t of o.querySelectorAll("a")){let r=t.querySelector("img")?.getAttribute("src")??"",a=/retorno_(programado|aguardando)(\d)?\.svg/.exec(r);if(!a)continue;let n=F(t.getAttribute("aria-label")??"").trim();e.push({tipo:a[1],descricao:n,atrasado:a[2]==="3"||/atrasad/i.test(n)})}return e}function Nn(o){let e=o.querySelector('a[href*="acao=procedimento_atribuicao_listar"], a.ancoraSigla'),t=e?.textContent?.trim();if(!e||!t)return;let r=F(e.getAttribute("title")??"").replace(/^Atribu[i\u00ED]do para\s+/i,"").trim();return{sigla:t,nome:r||t}}function Je(o,e){let t=It(o,e.grupo);if(!t?.idProcedimento)return null;let r=zn(o),a=null;for(let d of Lt(o)){let m=Xe(d.texto);if(m){a=m;break}}let n={id:t.idProcedimento,protocolo:t.protocolo,grupo:e.grupo,tipo:t.tipo,especificacao:t.especificacao,sigiloso:t.sigiloso,naoVisualizado:t.novo,marcadores:t.sigiloso?[]:r,retornos:t.sigiloso?[]:Rn(o),acompanhamentoEspecial:!t.sigiloso&&!!o.querySelector('a[href*="acao=acompanhamento"] , img[src*="acompanhamento_especial"], .acompanhamentoesp_icon'),documentoNovo:t.documentoNovo,pagina:e.pagina,naPaginaAtual:e.naPaginaAtual},s=o.querySelector('a[href*="acao=procedimento_trabalhar"]')?.getAttribute("onmouseover")??"";/\(URGENTE\)/.test(s)&&(n.urgente=!0),/\(TRANCADO\)/.test(s)&&(n.trancado=!0);let i=o.querySelector(".acompanhamentoesp_icon");if(i){let d=go(i.getAttribute("onmouseover")??"","infraTooltipMostrar")[0];typeof d?.[1]=="string"&&d[1]&&(n.acompanhamentoGrupo=I(d[1]))}let c=o.querySelector('a[href*="acao=procedimento_trabalhar"]')?.getAttribute("href");c&&(n.link=F(c));let l=Nn(o);if(l&&(n.atribuicao=l),!t.sigiloso){let d=Pt(o);d&&(n.anotacao=d);let m=wt(n.id,Ke(o),a);m&&(n.prazo=m)}return n}var $t="#tblProcessosRecebidos, #tblProcessosGerados, #tblProcessosDetalhado",Tn={recebidos:"tblProcessosRecebidos",gerados:"tblProcessosGerados"},_n=[[/^tipo( do processo)?$/,"tipo"],[/^especificacao$/,"especificacao"],[/^(atribuicao|atribuido( para)?|responsavel)$/,"atribuicao"],[/^marcador(es)?$/,"marcador"],[/^prioridade$/,"prioridade"],[/^interessados?$/,"interessados"],[/^observacao$/,"observacao"],[/^ultima mov/,"ultimaMov"]];function qn(o){let e=new Map;return[...(o.querySelector("thead tr")??[...o.querySelectorAll("tr")].find(r=>r.querySelector("th")))?.children??[]].forEach((r,a)=>{let n=U(r.textContent??""),s=_n.find(([i])=>i.test(n));s&&e.set(a,s[1])}),e}function Dt(o){let e=(o?.querySelector("caption")?.textContent??"").replace(/\s+/g," "),t=Number(/(\d+)\s+registro/.exec(e)?.[1]??0),r=/(\d+)\s+a\s+(\d+)\s*\)?/.exec(e);return{total:t,porPagina:r?Number(r[2])-Number(r[1])+1:0}}function Vn(o,e,t){if(!t.size)return;let r=[...e.children];for(let[a,n]of t){let s=(r[a]?.textContent??"").replace(/\s+/g," ").trim();if(s)if(n==="tipo"&&!o.tipo)o.tipo=s;else if(n==="especificacao"&&!o.especificacao&&!o.sigiloso)o.especificacao=s;else if(n==="atribuicao"&&!o.atribuicao){let i=s.replace(/^\(|\)$/g,"");o.atribuicao={sigla:i,nome:i}}else if(n==="marcador"&&!o.marcadores.length&&!o.sigiloso)o.marcadores=[{nome:s,cor:"",texto:""}];else{if(o.sigiloso&&(n==="interessados"||n==="observacao"))continue;if(n==="prioridade")o.prioridade=s;else if(n==="interessados")o.interessados=s;else if(n==="observacao")o.observacao=s;else if(n==="ultimaMov"){let i=/(\d{2})\/(\d{2})\/(\d{4})/.exec(s);i&&(o.ultimaMov=`${i[3]}-${i[2]}-${i[1]}`)}}}}function Hn(o){let e=o.querySelector("input[type=checkbox]")?.getAttribute("name")??"";return/^chkGerados/i.test(e)?"gerados":"recebidos"}function Do(o,e={}){let t=e.pagina??0,r=e.naPaginaAtual??!0,a=[],n={recebidos:0,gerados:0},s={recebidos:0,gerados:0},i=o.getElementById("tblProcessosDetalhado"),c=new Set,l=d=>{d&&!c.has(d.id)&&(c.add(d.id),a.push(d))};for(let d of["recebidos","gerados"]){let m=o.getElementById(Tn[d]),{total:h,porPagina:A}=Dt(m);n[d]=h,s[d]=A;for(let y of m?.querySelectorAll('tr[id^="P"]')??[])l(Je(y,{grupo:d,pagina:t,naPaginaAtual:r}))}if(i){let d=qn(i),{total:m,porPagina:h}=Dt(i);for(let A of i.querySelectorAll("tr")){if(!A.querySelector('a[href*="procedimento_trabalhar"]'))continue;let y=Hn(A),O=Je(A,{grupo:y,pagina:t,naPaginaAtual:r});O&&!c.has(O.id)&&(Vn(O,A,d),l(O),n[y]=Math.max(n[y],m),s[y]=Math.max(s[y],h))}}return{processos:a,totais:n,porPagina:s,visao:i?"detalhada":"resumida"}}var Fn=60;async function zt(o,e,t={}){let r=t.maxPaginas??Fn,a=[],n=new Set(o.processos.map(l=>l.id)),s=!0,i,c=!1;try{for(let l of["recebidos","gerados"]){let d=o.totais[l],m=o.processos.filter(y=>y.grupo===l).length,h=o.porPagina[l]||m||1,A=Math.max(1,Math.ceil(d/h));for(let y=1;m<d;y+=1){if(t.sinal?.aborted)return s=!1,{processos:a,completo:s,...i?{erro:i}:{}};if(y>=r){s=!1;break}c=!0;let O=await e.pagina(l,y,t.sinal),x=Do(O,{pagina:y,naPaginaAtual:!1}).processos.filter(P=>P.grupo===l&&!n.has(P.id));if(!x.length)break;for(let P of x)n.add(P.id);m+=x.length,a.push(...x),t.aoPagina?.(x),t.aoProgresso?.({grupo:l,paginasLidas:y+1,paginasTotal:A,processos:m,total:d})}m<d&&(s=!1)}}catch(l){s=!1,i=l instanceof Error?l.message:String(l)}finally{if(c)try{await e.restaurar()}catch(l){i??=`N\xE3o foi poss\xEDvel voltar \xE0 primeira p\xE1gina: ${l instanceof Error?l.message:String(l)}`}}return{processos:a,completo:s,...i?{erro:i}:{}}}var jn=["hdnRecebidosItensSelecionados","hdnGeradosItensSelecionados","hdnRecebidosItemId","hdnGeradosItemId"];function We(o,e){let t="#frmProcedimentoControlar",r=()=>({hdnRecebidosPaginaAtual:"0",hdnGeradosPaginaAtual:"0",...Object.fromEntries(jn.map(a=>[a,""]))});return{async pagina(a,n,s){let i=a==="recebidos"?"hdnRecebidosPaginaAtual":"hdnGeradosPaginaAtual";return(await V.de(e,t,o).definir({...r(),[i]:String(n)}).enviar({sinal:s,aceitarValidacao:!0})).doc},async restaurar(a){await V.de(e,t,o).definir(r()).enviar({sinal:a,aceitarValidacao:!0})},restaurarAoSair(){try{let a=V.de(e,t,o);fetch(o.absoluta(a.action),{method:"POST",keepalive:!0,credentials:"include",headers:{"content-type":"application/x-www-form-urlencoded"},body:new URLSearchParams(a.definir(r()).pares()).toString()}).catch(()=>{})}catch{}}}}var Gn=30*6e4,Rt=5e3,Ze=()=>({vistoEm:{}});function Tt(o){if(!o||typeof o!="object")return Ze();let e=o,t={};if(e.vistoEm&&typeof e.vistoEm=="object")for(let[i,c]of Object.entries(e.vistoEm))typeof c=="number"&&Number.isFinite(c)&&c>0&&(t[i]=c);let r=i=>typeof i=="number"&&Number.isFinite(i)?i:void 0,a={vistoEm:t},n=r(e.visitaAtual),s=r(e.visitaAnterior);return n!==void 0&&(a.visitaAtual=n),s!==void 0&&(a.visitaAnterior=s),a}function _t(o,e){return o.visitaAtual===void 0?{...o,visitaAtual:e}:e-o.visitaAtual>Gn?{...o,visitaAnterior:o.visitaAtual,visitaAtual:e}:o}function Ye(o,e,t,r){let a={...o.vistoEm};for(let s of e)a[s]===void 0&&(a[s]=t);if(r){let s=new Set(e);for(let i of Object.keys(a))s.has(i)||delete a[i]}let n=Object.keys(a);if(n.length>Rt)for(let s of n.sort((i,c)=>a[c]-a[i]).slice(Rt))delete a[s];return{...o,vistoEm:a}}function qt(o,e){return o.map(t=>e.vistoEm[t.id]!==void 0?{...t,vistoEm:e.vistoEm[t.id]}:t)}function $o(o){if(o===null)return"";if(o<1)return"hoje";if(o===1)return"1 dia";if(o<60)return`${o} dias`;let e=Math.floor(o/30);return e<24?`${e} meses`:`${Math.floor(o/365)} anos`}var Vt="Contado desde a primeira vez que o SEI Pro viu o processo nesta unidade (o SEI n\xE3o informa a data de chegada).";var zo=["processo","especificacao","tipo","responsavel","marcadores","prazo","anotacao","caixa","parado","sinais"],Mo={processo:"Processo",tipo:"Tipo",especificacao:"Especifica\xE7\xE3o",responsavel:"Respons\xE1vel",marcadores:"Marcadores",prazo:"Prazo",anotacao:"Anota\xE7\xE3o",caixa:"Na caixa",parado:"Parado h\xE1",sinais:"Sinais"};var Un=30,Bn=40,Qn=()=>({colunas:"marcador",limite:0,raiasPorResponsavel:!1}),Kn=["processo","especificacao","tipo","responsavel","marcadores","prazo","anotacao"],or=2;function Ro(){return{id:"",nome:"Padr\xE3o",busca:"",ordem:[],agrupar:"nenhum",modo:"tabela",colv:or,colunas:[...Kn],densidade:"confortavel",quadro:Qn()}}var Xn=["nenhum","responsavel","tipo","marcador","prazo","situacao","grupo","anotacao","acompanhamento","retorno","caixa"],Jn=["protocolo","tipo","responsavel","marcador","prazo","caixa","parado","novo"],Wn=["marcador","responsavel","prazo","tipo"];function ue(o){let e=Ro();if(!o||typeof o!="object")return e;let t=o,r=Array.isArray(t.ordem)?t.ordem.filter(s=>!!s&&typeof s=="object"&&Jn.includes(s.campo)).slice(0,4).map(s=>({campo:s.campo,decrescente:s.decrescente===!0})):[],a=Array.isArray(t.colunas)?[...new Set(t.colunas.filter(s=>zo.includes(s)))]:[];if(a.includes("processo")&&t.colv!==or&&!a.includes("especificacao")){let s=a.indexOf("processo");a=[...a.slice(0,s+1),"especificacao",...a.slice(s+1)]}let n=t.quadro&&typeof t.quadro=="object"?t.quadro:{};return{id:typeof t.id=="string"?t.id:"",colv:or,nome:typeof t.nome=="string"&&t.nome.trim()?t.nome.trim().slice(0,Bn):e.nome,busca:typeof t.busca=="string"?t.busca.slice(0,500):"",ordem:r,agrupar:Xn.includes(t.agrupar)?t.agrupar:"nenhum",modo:t.modo==="quadro"?"quadro":"tabela",colunas:a.length?a:e.colunas,densidade:t.densidade==="compacta"?"compacta":"confortavel",quadro:{colunas:Wn.includes(n.colunas)?n.colunas:"marcador",limite:typeof n.limite=="number"&&n.limite>0?Math.min(99,Math.floor(n.limite)):0,raiasPorResponsavel:n.raiasPorResponsavel===!0}}}function Ht(o,e,t){let r=ue(e),a=r.id?o.findIndex(s=>s.id===r.id):-1;if(a>=0){let s=[...o];return s[a]=r,{lista:s,visao:r}}if(o.length>=Un)return null;let n={...r,id:t()};return{lista:[...o,n],visao:n}}var Ft=(o,e)=>o.filter(t=>t.id!==e);function jt(o,e){let t=r=>JSON.stringify({...r,id:"",nome:""});return t(o)!==t(e)}var me="spro_grade_v_ids",fe=o=>`spro_grade_v:${o}`,Zn=o=>`spro_grade:${o||"x"}`;function Yn(){return{visao:Ro(),idade:Ze(),recolhidos:[]}}function os(o){if(!o||typeof o!="object")return Yn();let e=o;return{visao:ue(e.visao),idade:Tt(e.idade),recolhidos:Array.isArray(e.recolhidos)?e.recolhidos.filter(t=>typeof t=="string").slice(0,200):[]}}function Gt(o,e){let{local:t,sync:r}=o,a=Zn(e);async function n(){return os((await t.obter(a))[a])}async function s(l){let d=await n();await t.gravar({[a]:{...d,...l}})}async function i(){let l=(await r.obter(me))[me],d=Array.isArray(l)?l.filter(h=>typeof h=="string"):[];if(!d.length)return[];let m=await r.obter(d.map(fe));return d.flatMap(h=>{let A=m[fe(h)];return A?[{...ue(A),id:h}]:[]})}async function c(l,d=[]){let m=new Set(l.map(y=>y.id)),h={[me]:l.map(y=>y.id)};for(let y of l)h[fe(y.id)]=y;await r.gravar(h);let A=d.filter(y=>!m.has(y.id)).map(y=>fe(y.id));A.length&&await r.remover(A)}return{lerEstado:n,gravarVisao:l=>s({visao:l}),gravarIdade:l=>s({idade:l}),gravarRecolhidos:l=>s({recolhidos:l}),lerVisoes:i,gravarVisoes:c,aoMudarVisoes:l=>r.aoMudar(d=>me in d||Object.keys(d).some(m=>m.startsWith("spro_grade_v:"))?l():void 0)}}function Ut(o){let e=t=>{let r=/^[=+\-@\t\r]/.test(t)?`'${t}`:t;return/[;"\n\r]/.test(r)?`"${r.replace(/"/g,'""')}"`:r};return`\uFEFF${o.map(t=>t.map(e).join(";")).join(`\r
`)}`}var Bt=new Set;var es=null;function rs(o){let e=o.closest?.("dialog[open]");if(e)return e;let t=o.getRootNode?.(),r=o.ownerDocument;return t&&t!==r&&t.host?t:r.body??r.documentElement}function Qt(o,e){let t=o;try{t?.CustomEvent&&t.dispatchEvent(new t.CustomEvent("spro-popover",{detail:{fundo:e}}))}catch{}}function Kt(o,e,t){let r=o.ownerDocument,a=r.defaultView;rs(o).append(e);let n=!0,s=()=>{if(!n)return;let h=o.getBoundingClientRect?.();if(!h)return;let A=a?.innerHeight??0,y=a?.innerWidth??0,O=Math.min(t.largura??Math.max(h.width,t.larguraMinima??0),Math.max(180,y-16)),j=t.alinharDireita?h.right-O:h.left,x=Math.max(8,Math.min(j,y-O-8)),P=t.alturaMaxima??360;e.style.maxHeight="none";let S=Math.min(e.scrollHeight||P,P),C=A-h.bottom-8,T=h.top-8,z=es?.()??!1,N=!z&&C<Math.min(S,200)&&T>C;e.style.left=`${x}px`,e.style.width=`${O}px`,e.style.maxHeight=`${z?P:Math.max(140,Math.min(P,N?T:C>140?C:P))}px`,e.classList.toggle("spro-flutuante-cima",N),N?(e.style.top="",e.style.bottom=`${A-h.top+4}px`):(e.style.bottom="",e.style.top=`${h.bottom+4}px`),Qt(a,N?0:Math.ceil(h.bottom+4+S+12))},i=h=>{let A=h.composedPath?.()??[],y=h.target,O=j=>A.includes(j)||!!y&&!!j.contains?.(y);O(e)||O(o)||t.aoFechar()},c=()=>{o.isConnected?s():t.aoFechar()},l=h=>{h.target instanceof Node&&e.contains(h.target)||c()},d=()=>t.aoFechar();r.addEventListener("pointerdown",i,!0),a?.addEventListener("scroll",l,!0),a?.addEventListener("resize",c),a?.addEventListener("blur",d);let m={ancora:o,fechar:()=>t.aoFechar()};return Bt.add(m),s(),{posicionar:s,fechar(){n&&(n=!1,Bt.delete(m),r.removeEventListener("pointerdown",i,!0),a?.removeEventListener("scroll",l,!0),a?.removeEventListener("resize",c),a?.removeEventListener("blur",d),e.remove(),Qt(a,0))}}}function Xt(o,e){let t=U(e);if(!t)return[...o];let r=t.split(" "),a=[];return o.forEach((n,s)=>{let i=U(n.rotulo),c=`${i} ${U(n.descricao??"")}`;if(!r.every(d=>c.includes(d)))return;let l=i.startsWith(t)?0:i.split(" ").some(d=>d.startsWith(r[0]))?1:2;a.push({o:n,nota:l,i:s})}),a.sort((n,s)=>n.nota-s.nota||n.i-s.i).map(n=>n.o)}function ts(o,e){let t=o.normalize("NFC"),r=U(e).split(" ").filter(Boolean);if(!r.length)return[{texto:t,marcado:!1}];let a=[...t],n="",s=[];a.forEach((l,d)=>{let m=l.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase();for(let h of m)n+=h,s.push(d)});let i=new Array(a.length).fill(!1);for(let l of r){let d=n.indexOf(l);if(!(d<0))for(let m=d;m<d+l.length;m++)i[s[m]]=!0}let c=[];return a.forEach((l,d)=>{let m=c[c.length-1];m&&m.marcado===i[d]?m.texto+=l:c.push({texto:l,marcado:i[d]})}),c}var as=0;function Bo(o){let e=`spro-combo-${++as}`,t=()=>typeof o.opcoes=="function"?o.opcoes():o.opcoes,r=new Map,a=g=>t().find(w=>w.valor===g)??r.get(g),n=[...o.valor??[]],s=null,i="",c=0,l=[],d=null,m=p("button",{type:"button",class:`spro-combo${o.classe?` ${o.classe}`:""}`,role:"combobox","aria-haspopup":"listbox","aria-expanded":"false","aria-label":o.rotulo,title:o.rotulo}),h=()=>o.aoMudar?.([...n]);function A(){let g=[];o.icone&&g.push(X(o.icone,15));let w=n.map(_=>a(_)).filter(_=>!!_),M=p("span",{class:"spro-combo-texto"});if(!w.length)M.classList.add("spro-combo-vazio"),M.append(o.vazio??"Escolher\u2026");else{let _=w[0];_.cor&&M.append(p("span",{class:"spro-combo-cor",style:`background:${_.cor}`})),M.append(p("span",{class:"spro-combo-rotulo"},_.rotulo)),w.length>1&&M.append(p("span",{class:"spro-combo-mais"},`+${w.length-1}`))}g.push(M,X("chevron",14)),m.classList.toggle("spro-combo-ativo",o.multiplo===!0&&w.length>0),m.replaceChildren(...g)}let y=()=>o.busca??(t().length>7||!!o.multiplo||!!o.criar);function O(g){if(o.multiplo){n=n.includes(g.valor)?n.filter(M=>M!==g.valor):[...n,g.valor],h(),A(),S();return}let w=n.length!==1||n[0]!==g.valor;n=[g.valor],A(),N(!0),w&&h()}async function j(){if(!o.criar)return;let g=i.trim();if(!g)return;let w=await o.criar(g);if(w){if(r.set(w.valor,w),i="",s){let M=s.querySelector(".spro-combo-busca");M&&(M.value="")}o.multiplo&&n.includes(w.valor)?S():O(w)}}function x(g,w){let M=n.includes(g.valor),_=p("span",{class:"spro-combo-op-rotulo"});for(let R of ts(g.rotulo,i))_.append(R.marcado?p("mark",{},R.texto):R.texto);let D=p("li",{role:"option",id:`${e}-op-${w}`,class:`spro-combo-op${w===c?" spro-combo-op-ativa":""}`,"data-valor":g.valor,"aria-selected":M?"true":"false"},o.multiplo?p("span",{class:"spro-combo-caixa","aria-hidden":"true"},M?X("check",12):null):null,g.cor?p("span",{class:"spro-combo-cor",style:`background:${g.cor}`}):null,g.icone?X(g.icone,15):null,p("span",{class:"spro-combo-op-textos"},_,g.descricao?p("span",{class:"spro-combo-op-desc"},g.descricao):null),g.contagem!==void 0?p("span",{class:"spro-combo-conta"},String(g.contagem)):null,!o.multiplo&&M?p("span",{class:"spro-combo-marca"},X("check",14)):null);return D.addEventListener("pointerdown",R=>R.preventDefault()),D.addEventListener("click",()=>{c=w,O(g)}),D.addEventListener("pointermove",()=>{c!==w&&(c=w,P())}),D}function P(){if(!s)return;let g=[...s.querySelectorAll('[role="option"]')];g.forEach((D,R)=>{D.classList.toggle("spro-combo-op-ativa",R===c)});let w=g[c],_=s.querySelector(".spro-combo-busca")??s.querySelector('[role="listbox"]');w?(_?.setAttribute("aria-activedescendant",w.id),w.scrollIntoView?.({block:"nearest"})):_?.removeAttribute("aria-activedescendant")}function S(){if(!s)return;l=Xt(t(),i),c>=l.length&&(c=Math.max(0,l.length-1)),s.querySelector('[role="listbox"]').replaceChildren(...l.map(x));let w=s.querySelector(".spro-combo-extras");w.replaceChildren();let M=i.trim();l.length||w.append(p("p",{class:"spro-combo-nada"},M?"Nada encontrado.":"Nenhuma op\xE7\xE3o."));let _=t().some(R=>U(R.rotulo)===U(M));if(o.criar&&M&&!_){let R=p("button",{type:"button",class:"spro-combo-criar"},X("mais",14),p("span",{},o.rotuloCriar?o.rotuloCriar(M):`Criar \u201C${M}\u201D`));R.addEventListener("pointerdown",H=>H.preventDefault()),R.addEventListener("click",()=>void j()),w.append(R)}let D=s.querySelector(".spro-combo-rodape");if(D){let R=l.filter(ao=>!n.includes(ao.valor)),H=p("button",{type:"button",class:"spro-combo-acao",disabled:!M||!R.length},`Marcar os filtrados${M&&R.length?` (${R.length})`:""}`);H.addEventListener("click",()=>{n=[...n,...R.map(ao=>ao.valor)],h(),A(),S()});let Po=p("button",{type:"button",class:"spro-combo-acao spro-combo-limpar",disabled:!n.length},"Limpar");Po.addEventListener("click",()=>{n=[],h(),A(),S()}),D.replaceChildren(p("span",{class:"spro-combo-total"},n.length?`${n.length} marcado${n.length>1?"s":""}`:""),H,Po)}P()}let C=()=>d?.posicionar();function T(g){let w=l.length,M=g.target,_=s?[...s.querySelectorAll(".spro-combo-rodape button:not(:disabled)")]:[],D=!!M?.closest?.(".spro-combo-rodape, .spro-combo-criar");if(g.key==="Tab"){let H=_.indexOf(M);if(!g.shiftKey&&H<_.length-1)_[H+1]?.focus();else if(g.shiftKey&&H>=0)H>0?_[H-1]?.focus():(s?.querySelector(".spro-combo-busca")??s?.querySelector('[role="listbox"]'))?.focus();else{N(!0);return}g.preventDefault(),g.stopPropagation();return}if(D&&g.key!=="Escape")return;let R=!s?.querySelector(".spro-combo-busca");if(R&&g.key===" "){let H=l[c];H&&O(H),g.preventDefault(),g.stopPropagation();return}if(R&&g.key.length===1&&!g.ctrlKey&&!g.metaKey&&!g.altKey){let H=U(g.key),ao=[...l.keys()].map(xo=>(c+1+xo)%Math.max(1,w)).find(xo=>U(l[xo]?.rotulo??"").startsWith(H));ao!==void 0&&(c=ao,P()),g.preventDefault(),g.stopPropagation();return}switch(g.key){case"ArrowDown":c=w?(c+1)%w:0,P();break;case"ArrowUp":c=w?(c-1+w)%w:0,P();break;case"Home":if(g.target?.classList?.contains("spro-combo-busca")&&i)return;c=0,P();break;case"End":if(g.target?.classList?.contains("spro-combo-busca")&&i)return;c=Math.max(0,w-1),P();break;case"Enter":{let H=l[c];H?O(H):j();break}case"Escape":N(!0);break;case"Backspace":if(!o.multiplo||i||!n.length)return;n=n.slice(0,-1),h(),A(),S();break;default:return}g.preventDefault(),g.stopPropagation()}function z(g=""){if(s)return;i=g,c=g?0:(()=>{let D=Xt(t(),i).findIndex(R=>R.valor===n[n.length-1]);return D<0?0:D})();let M=y()?p("input",{type:"text",class:"spro-combo-busca",placeholder:o.criar?"Buscar ou criar\u2026":"Buscar\u2026","aria-label":`Filtrar ${o.rotulo.toLowerCase()}`,"aria-controls":`${e}-lista`,"aria-autocomplete":"list",autocomplete:"off",spellcheck:"false",value:g}):null;if(M&&(M.value=g,M.addEventListener("input",()=>{i=M.value,c=0,S(),C()})),s=p("div",{class:`spro-combo-pop${o.multiplo?" spro-combo-pop-multi":""}`},M?p("div",{class:"spro-combo-cabeca"},X("busca",15),M):null,p("ul",{role:"listbox",id:`${e}-lista`,class:"spro-combo-lista",tabindex:M?void 0:"-1","aria-label":o.rotulo,"aria-multiselectable":o.multiplo?"true":void 0}),p("div",{class:"spro-combo-extras"}),o.multiplo?p("div",{class:"spro-combo-rodape"}):null),s.addEventListener("keydown",T),d=Kt(m,s,{larguraMinima:o.larguraLista??220,alturaMaxima:360,aoFechar:()=>N(!1)}),m.setAttribute("aria-expanded","true"),m.setAttribute("aria-controls",`${e}-lista`),m.classList.add("spro-combo-aberto"),S(),C(),!s)return;(M??s.querySelector('[role="listbox"]'))?.focus?.({preventScroll:!0}),M&&g&&M.setSelectionRange?.(g.length,g.length)}function N(g=!1){s&&(d?.fechar(),d=null,s=null,i="",m.setAttribute("aria-expanded","false"),m.removeAttribute("aria-controls"),m.classList.remove("spro-combo-aberto"),g&&m.focus?.({preventScroll:!0}))}return m.addEventListener("click",()=>s?N(!0):z()),m.addEventListener("keydown",g=>{s||(g.key==="ArrowDown"||g.key==="ArrowUp"?(g.preventDefault(),z()):g.key.length===1&&g.key!==" "&&!g.ctrlKey&&!g.metaKey&&!g.altKey&&y()&&(g.preventDefault(),z(g.key)))}),A(),{el:m,valor:()=>[...n],definir(g,w=!1){n=[...g],A(),S(),w&&h()},atualizar(){A(),S()},abrir:z,fechar:()=>N(!1)}}var Jt="#tblProcessosRecebidos input[type=checkbox], #tblProcessosGerados input[type=checkbox], #tblProcessosDetalhado input[type=checkbox]",er=o=>o.getAttribute("value")??o.closest("tr")?.id.replace(/^P/,"")??"";function rr(o){let e=new Set;for(let t of o.querySelectorAll(Jt))t.checked&&er(t)&&e.add(er(t));return e}function Wt(o,e){let t=new Set(e);for(let r of o.querySelectorAll(Jt)){let a=er(r);a&&(t.delete(a),!r.disabled&&!!r.checked!==e.has(a)&&r.click())}return[...t]}function Zt(o,e){let t=!1,r=()=>{t||(t=!0,queueMicrotask(()=>{t=!1,e(rr(o))}))};return o.addEventListener("click",r,!0),o.addEventListener("change",r,!0),()=>{o.removeEventListener("click",r,!0),o.removeEventListener("change",r,!0)}}function ns(o){return/acaoControleProcessos\(\s*['"][^'"]*['"]\s*,\s*true/.test(o.elemento.getAttribute("onclick")??"")}function Yt(o,e){return ns(o)&&e===0?{ok:!1,motivo:"Marque ao menos um processo."}:(o.elemento.click(),{ok:!0})}var ss=o=>o instanceof Error?o.message:String(o);function oa(o){if(o.tipo==="atribuicao")return{...o,para:o.de,de:o.para};let e={tipo:"marcador",id:o.id,protocolo:o.protocolo};return o.adicionar&&(e.remover=o.adicionar),o.remover&&(e.adicionar=o.remover,o.texto&&(e.texto=o.texto)),e}async function is(o,e){try{if(o.tipo==="atribuicao")return await e.atribuir(o.protocolo,o.para),{ok:!0,desfazer:oa(o)};if(o.adicionar&&await e.marcador(o.protocolo,{marcador:o.adicionar,...o.texto?{texto:o.texto}:{}}),o.remover)try{await e.marcador(o.protocolo,{marcador:o.remover,remover:!0})}catch(t){throw o.adicionar&&await e.marcador(o.protocolo,{marcador:o.adicionar,remover:!0}).catch(()=>{}),t}return{ok:!0,desfazer:oa(o)}}catch(t){return{ok:!1,erro:ss(t)}}}function ea(o){let e=Promise.resolve();return{mover(t){let r=e.then(()=>is(t,o));return e=r.catch(()=>{}),r}}}var ge=o=>`${o} ${Math.abs(o)===1?"dia":"dias"}`,ra=Number.MAX_SAFE_INTEGER;function tr(o,e){let t=[e];return o.hora&&o.vencimento&&(t[0]=e.replace(/\.$/,"")+` \xE0s ${o.hora}.`),o.texto&&t.push(o.texto),o.sigla&&t.push(`Definido por ${o.sigla} no controle de prazo do SEI.`),t.join(`
`)}function ta(o,e){let t=o.vencimento;if(o.concluidoEm&&t)return{situacao:"concluido",texto:`conclu\xEDdo em ${fo(o.concluidoEm).slice(0,5)}`,dica:tr(o,`Prazo de ${fo(t)} conclu\xEDdo em ${fo(o.concluidoEm)}.`),ordem:ra,sorter:`${t} 23:59:59`};if(t){let s=Ho(e,t),i=`${t} ${o.hora??"23:59"}:00`,c=tr(o,`Vence em ${fo(t)}.`);return s===0?{situacao:"hoje",texto:"vence hoje",dica:c,ordem:0,sorter:i}:s<0?{situacao:"atrasado",texto:`${ge(-s)} de atraso`,dica:c,ordem:s,sorter:i}:{situacao:"noPrazo",texto:`vence em ${ge(s)}`,dica:c,ordem:s,sorter:i}}let r=o.inicio??e,a=Ho(r,e);return{situacao:"desde",texto:a===0?"hoje":a>0?`h\xE1 ${ge(a)}`:`em ${ge(-a)}`,dica:tr(o,`Contando desde ${fo(r)}.`),ordem:ra-1,sorter:`${r} ${o.hora??"23:59"}:00`}}function to(o,e){return o.prazo?ta(o.prazo,e.hoje):null}function lo(o,e){return o.vistoEm===void 0?null:Math.max(0,Math.floor((e.agora-o.vistoEm)/864e5))}function yo(o,e){return o.ultimaMov?Math.max(0,Ho(o.ultimaMov,e.hoje)):null}function aa(o,e){return e.visitaAnterior!==void 0&&o.vistoEm!==void 0&&o.vistoEm>e.visitaAnterior}function Qo(o,e){let t=to(o,e);return!t||t.situacao==="concluido"||t.situacao==="desde"?null:t.ordem}var cs={resp:"resp",responsavel:"resp",atribuido:"resp",atribuicao:"resp",tipo:"tipo",marcador:"marcador",marcadores:"marcador",marc:"marcador",espec:"espec",especificacao:"espec",anot:"anot",anotacao:"anot",nota:"anot",prazo:"prazo",caixa:"caixa",idade:"caixa",novo:"novo",sigilo:"sigilo",sigiloso:"sigilo",grupo:"grupo",retorno:"retorno",protocolo:"protocolo",proc:"protocolo",processo:"protocolo",parado:"parado",mov:"parado",prio:"prio",prioridade:"prio",interessado:"interessado",interessados:"interessado"};function sr(o){let e=[],t="",r=!1;for(let a of o)a==='"'?(r=!r,t+=a):/\s/.test(a)&&!r?(t&&e.push(t),t=""):t+=a;return t&&e.push(t),e}var ls=o=>o.replace(/^"|"$/g,"");function ir(o){let e=[],t=[];for(let r of sr(o)){let a=r,n=!1;a.startsWith("-")&&a.length>1&&(n=!0,a=a.slice(1));let s,i=/^([a-zA-Z\u00C0-\u017F]+):(.*)$/.exec(a);if(i){let m=cs[U(i[1])];m&&(s=m,a=i[2])}let c="=";s&&/^[<>]/.test(a)&&(c=a[0],a=a.slice(1));let l=U(ls(a));if(!l&&!s)continue;let d={...s?{campo:s}:{},valor:l,original:r,negado:n,comparador:c};e.push(d),t.push({texto:r,termo:d})}return{termos:e,tokens:t}}var ps=o=>U([o.protocolo,o.protocolo.replace(/\D/g,""),o.tipo,o.especificacao,o.atribuicao?.sigla,o.atribuicao?.nome,...o.marcadores.flatMap(e=>[e.nome,e.texto]),o.anotacao?.texto,o.prazo?.texto,o.prioridade,o.interessados,o.observacao].filter(Boolean).join(" ")),po=(o,e)=>U(o??"").includes(e),na=/^(s|sim|1|true|yes)$/;function ar(o){let e=/^(\d+)\s*(d|dia|dias)?$/.exec(o);return e?Number(e[1]):null}function nr(o,e,t){return o===null?!1:e==="<"?o<t:e===">"?o>t:o===t}function ds(o,e,t){let r=to(o,t),a=e.valor;if(a==="sem"||a==="nenhum"||a==="nao")return!o.prazo;if(a==="com"||a==="sim")return!!o.prazo;if(!r)return!1;if(a==="atrasado"||a==="atrasados"||a==="vencido")return r.situacao==="atrasado";if(a==="hoje")return r.situacao==="hoje";if(a==="concluido"||a==="concluidos")return r.situacao==="concluido";if(a==="semana"){let s=Qo(o,t);return s!==null&&s>=0&&s<=7}let n=ar(a);return n!==null?nr(Qo(o,t),e.comparador==="="?"<":e.comparador,n):po(o.prazo?.texto,a)}function us(o,e,t){let r=e.valor;switch(e.campo){case"resp":return r==="sem"||r==="ninguem"?!o.atribuicao:r==="eu"?!!t.eu&&U(o.atribuicao?.sigla??"")===U(t.eu):po(o.atribuicao?.sigla,r)||po(o.atribuicao?.nome,r);case"tipo":return po(o.tipo,r);case"marcador":return r==="sem"||r==="nenhum"?o.marcadores.length===0:r==="com"?o.marcadores.length>0:o.marcadores.some(a=>po(a.nome,r)||po(a.texto,r));case"espec":return po(o.especificacao,r);case"anot":return r==="sem"||r==="nao"?!o.anotacao:r==="com"||r==="sim"?!!o.anotacao:r==="prioridade"||r==="prioritaria"?!!o.anotacao?.prioridade:po(o.anotacao?.texto,r);case"prazo":return ds(o,e,t);case"caixa":{let a=ar(r);return a===null?!1:nr(lo(o,t),e.comparador==="="?">":e.comparador,a)}case"novo":return r==="visita"?aa(o,t):na.test(r)?o.naoVisualizado:r==="nao"?!o.naoVisualizado:!1;case"sigilo":return na.test(r)?o.sigiloso:!o.sigiloso;case"grupo":return r.startsWith("rec")?o.grupo==="recebidos":r.startsWith("ger")?o.grupo==="gerados":!1;case"retorno":return r==="sem"||r==="nao"?o.retornos.length===0:r==="atrasado"?o.retornos.some(a=>a.atrasado):r==="aguardando"?o.retornos.some(a=>a.tipo==="aguardando"):r==="programado"?o.retornos.some(a=>a.tipo==="programado"):o.retornos.length>0;case"parado":{let a=ar(r);return a===null?!1:nr(yo(o,t),e.comparador==="="?">":e.comparador,a)}case"prio":return po(o.prioridade,r);case"interessado":return po(o.interessados,r);case"protocolo":return U(o.protocolo).includes(r)||o.protocolo.replace(/\D/g,"").includes(r.replace(/\D/g,"")||"\0");default:return!0}}function ms(o,e,t){if(!o.termos.length)return!0;let r;for(let a of o.termos){let n;if(a.campo?n=us(e,a,t):(r??=ps(e),n=r.includes(a.valor)),a.negado?n:!n)return!1}return!0}var sa=(o,e,t)=>{let r=ir(e);return r.termos.length?o.filter(a=>ms(r,a,t)):o};function cr(o,e){return sr(o).filter(t=>t!==e).join(" ")}function ia(o,e,t){let r=/\s/.test(t)?`"${t}"`:t,a=`${e}:${r}`,n=sr(o);return n.includes(a)?o:[...n,a].join(" ")}var fs=new Intl.Collator("pt-BR",{sensitivity:"base",numeric:!0});function gs(o,e=[]){return[...o.values()].sort((t,r)=>{let a=e.indexOf(t.chave),n=e.indexOf(r.chave);return a>=0||n>=0?(a<0?-1:a)-(n<0?-1:n):fs.compare(t.rotulo,r.rotulo)})}function B(o,e,t,r){let a=o.get(e);return a||(a={chave:e,rotulo:t,itens:[],...r?{tom:r}:{}},o.set(e,a)),a}var No=[["atrasado","Atrasados","perigo"],["hoje","Vencem hoje","aviso"],["semana","Pr\xF3ximos 7 dias","aviso"],["mes","Pr\xF3ximos 30 dias","neutro"],["depois","Depois de 30 dias","neutro"],["desde","Contando desde uma data","neutro"],["concluido","Prazo conclu\xEDdo","neutro"],["sem","Sem prazo","neutro"]];function Ko(o,e){let t=to(o,e);if(!t)return"sem";if(t.situacao==="concluido")return"concluido";if(t.situacao==="desde")return"desde";if(t.situacao==="atrasado")return"atrasado";if(t.situacao==="hoje")return"hoje";let r=Qo(o,e)??0;return r<=7?"semana":r<=30?"mes":"depois"}var ca=[["recente","Chegaram hoje"],["semana","Nos \xFAltimos 7 dias"],["mes","Nos \xFAltimos 30 dias"],["antigo","H\xE1 mais de 30 dias"],["desconhecido","Sem registro"]];function hs(o,e){let t=lo(o,e);return t===null?"desconhecido":t<1?"recente":t<=7?"semana":t<=30?"mes":"antigo"}function Co(o,e){return e.map(t=>o.get(t[0])).filter(t=>!!t)}function he(o,e,t){if(e==="nenhum")return[{chave:"todos",rotulo:"Todos",itens:o}];let r=new Map;for(let a of o)switch(e){case"responsavel":a.atribuicao?B(r,`u:${a.atribuicao.sigla}`,a.atribuicao.nome===a.atribuicao.sigla?a.atribuicao.sigla:`${a.atribuicao.nome} (${a.atribuicao.sigla})`).itens.push(a):B(r,"sem","Sem respons\xE1vel").itens.push(a);break;case"tipo":B(r,`t:${a.tipo||"-"}`,a.tipo||"Sem tipo").itens.push(a);break;case"marcador":if(a.marcadores.length)for(let n of a.marcadores)B(r,`m:${n.nome}`,n.nome).itens.push(a);else B(r,"sem","Sem marcador").itens.push(a);break;case"prazo":{let n=Ko(a,t),s=No.find(i=>i[0]===n);B(r,n,s[1],s[2]).itens.push(a);break}case"situacao":a.naoVisualizado?B(r,"novo","N\xE3o visualizados","aviso").itens.push(a):B(r,"lido","Visualizados").itens.push(a);break;case"grupo":B(r,a.grupo,a.grupo==="recebidos"?"Recebidos":"Gerados").itens.push(a);break;case"anotacao":a.anotacao?.prioridade?B(r,"prio","Anota\xE7\xE3o com prioridade","aviso").itens.push(a):a.anotacao?B(r,"com","Com anota\xE7\xE3o").itens.push(a):B(r,"sem","Sem anota\xE7\xE3o").itens.push(a);break;case"acompanhamento":a.acompanhamentoEspecial?B(r,"com","Em acompanhamento especial").itens.push(a):B(r,"sem","Fora do acompanhamento especial").itens.push(a);break;case"retorno":a.retornos.some(n=>n.atrasado)?B(r,"atrasado","Retorno atrasado","perigo").itens.push(a):a.retornos.some(n=>n.tipo==="aguardando")?B(r,"aguardando","Aguardando retorno").itens.push(a):a.retornos.length?B(r,"programado","Retorno programado").itens.push(a):B(r,"sem","Sem retorno").itens.push(a);break;case"caixa":{let n=hs(a,t);B(r,n,ca.find(s=>s[0]===n)[1]).itens.push(a);break}}return e==="prazo"?Co(r,No):e==="caixa"?Co(r,ca):e==="situacao"?Co(r,[["novo",""],["lido",""]]):e==="grupo"?Co(r,[["recebidos",""],["gerados",""]]):e==="anotacao"?Co(r,[["prio",""],["com",""],["sem",""]]):e==="acompanhamento"?Co(r,[["com",""],["sem",""]]):e==="retorno"?Co(r,[["atrasado",""],["aguardando",""],["programado",""],["sem",""]]):gs(r,["sem"])}var lr={nenhum:"Sem agrupamento",responsavel:"Respons\xE1vel",tipo:"Tipo de processo",marcador:"Marcador",prazo:"Prazo",situacao:"Visualiza\xE7\xE3o",grupo:"Recebidos e gerados",anotacao:"Anota\xE7\xE3o",acompanhamento:"Acompanhamento especial",retorno:"Retorno programado",caixa:"Tempo na caixa"};var bs=new Intl.Collator("pt-BR",{sensitivity:"base",numeric:!0});function be(o,e){let t=new Map;for(let r of o)for(let a of e(r)){let n=t.get(a.valor)??{valor:a.valor,rotulo:a.rotulo,n:0};n.n+=1,t.set(a.valor,n)}return[...t.values()].sort((r,a)=>a.n-r.n||bs.compare(r.rotulo,a.rotulo))}function pr(o,e){let t=be(o,r=>{let a=Ko(r,e),n=No.find(i=>i[0]===a)[1],s=a==="atrasado"?"atrasado":a==="hoje"?"hoje":a==="semana"?"semana":a==="sem"?"sem":a==="concluido"?"concluido":"";return s?[{valor:s,rotulo:n}]:[]});return{responsaveis:be(o,r=>r.atribuicao?[{valor:r.atribuicao.sigla,rotulo:`${r.atribuicao.nome} (${r.atribuicao.sigla})`}]:[{valor:"sem",rotulo:"Sem respons\xE1vel"}]),tipos:be(o,r=>r.tipo?[{valor:r.tipo,rotulo:r.tipo}]:[]),marcadores:be(o,r=>r.marcadores.length?r.marcadores.map(a=>({valor:a.nome,rotulo:a.nome})):[{valor:"sem",rotulo:"Sem marcador"}]),prazos:t}}function dr(o){let e=[];o.sigiloso&&e.push("Sigiloso"),o.naoVisualizado&&e.push("N\xE3o visualizado"),o.documentoNovo&&e.push("Documento novo"),o.urgente&&e.push("Urgente"),o.trancado&&e.push("Trancado"),o.acompanhamentoEspecial&&e.push(o.acompanhamentoGrupo?`Acompanhamento especial (${o.acompanhamentoGrupo})`:"Acompanhamento especial");for(let t of o.retornos)e.push(`${t.tipo==="aguardando"?"Aguardando retorno":"Retorno programado"}${t.atrasado?" (atrasado)":""}`);return e}function ur(o,e){let t=to(o,e);if(!o.prazo||!t)return"";let r=o.prazo.vencimento??o.prazo.inicio;return`${r?fo(r):""}${o.prazo.hora?` ${o.prazo.hora}`:""} (${t.texto})`.trim()}var vs=(o,e,t)=>{switch(e){case"processo":return o.protocolo;case"tipo":return o.tipo;case"especificacao":return o.especificacao;case"responsavel":return o.atribuicao?o.atribuicao.nome===o.atribuicao.sigla?o.atribuicao.sigla:`${o.atribuicao.nome} (${o.atribuicao.sigla})`:"";case"marcadores":return o.marcadores.map(r=>r.texto?`${r.nome}: ${r.texto}`:r.nome).join("; ");case"prazo":return ur(o,t);case"anotacao":return o.anotacao?.texto.replace(/\s*\n\s*/g," / ")??"";case"caixa":return $o(lo(o,t));case"parado":return $o(yo(o,t));case"sinais":return dr(o).join("; ")}};function la(o,e,t){return[e.map(r=>Mo[r]),...o.map(r=>e.map(a=>vs(r,a,t)))]}var pa=o=>`processos-${o}.csv`;function da(o,e,t){let r=[];for(let a of o){let n=t&&e.has(a.chave);if(t&&r.push({tipo:"grupo",grupo:a,recolhido:n}),!n)for(let s of a.itens)r.push({tipo:"processo",processo:s,grupo:a.chave})}return r}var mr=new Intl.Collator("pt-BR",{numeric:!0,sensitivity:"base"});function ua(o){let e=/(\d+)\/(\d{4})-\d+\s*$/.exec(o);if(!e)return null;let t=/(\d+)\s*$/.exec(e[1].split(/[.-]/).pop()??"")?.[1]??e[1];return[Number(e[2]),Number(t)]}function xs(o,e){let t=ua(o),r=ua(e);return t&&r&&(t[0]-r[0]||t[1]-r[1])||mr.compare(o,e)}function ma(o,e,t){switch(e){case"tipo":return o.tipo||null;case"responsavel":return o.atribuicao?.sigla??null;case"marcador":return o.marcadores[0]?.nome??null;case"prazo":{let r=to(o,t);return r?r.ordem:null}case"caixa":return lo(o,t);case"parado":return yo(o,t);case"novo":return o.naoVisualizado?0:1}}function As(o,e){return(t,r)=>{for(let a of o){let n;if(a.campo==="protocolo")n=xs(t.protocolo,r.protocolo),a.decrescente&&(n=-n);else{let s=ma(t,a.campo,e),i=ma(r,a.campo,e);if(s===null&&i===null)continue;if(s===null)return 1;if(i===null)return-1;n=typeof s=="number"&&typeof i=="number"?s-i:mr.compare(String(s),String(i)),a.decrescente&&(n=-n)}if(n)return n}return 0}}function fa(o,e,t){return e.length?[...o].sort(As(e,t)):o}function ga(o,e,t){let r=o.findIndex(s=>s.campo===e),a=r<0?{campo:e,decrescente:!1}:o[r].decrescente?null:{campo:e,decrescente:!0};if(!t)return a?[a]:[];if(r<0)return[...o,a];let n=[...o];return a?n[r]=a:n.splice(r,1),n}var fr=new Intl.Collator("pt-BR",{sensitivity:"base",numeric:!0}),uo="sem";function ha(o,e,t,r={}){let a=new Map,n=(i,c,l,d,m)=>{let h=a.get(i);return h||(h={chave:i,titulo:c,itens:[],aceitaSoltar:l,excedeu:!1,...d?{motivoSomenteLeitura:d}:{},...m?{tom:m}:{}},a.set(i,h)),h};if(e.colunas==="marcador"){n(uo,"Sem marcador",!0);for(let i of[...r.marcadores??[]].sort(fr.compare))n(`m:${i}`,i,!0);for(let i of o){i.marcadores.length||n(uo,"Sem marcador",!0).itens.push(i);for(let c of i.marcadores)n(`m:${c.nome}`,c.nome,!0).itens.push(i)}}else if(e.colunas==="responsavel"){n(uo,"Sem respons\xE1vel",!0);for(let i of r.responsaveis??[])n(`u:${i.sigla}`,`${i.nome} (${i.sigla})`,!0);for(let i of o)i.atribuicao?n(`u:${i.atribuicao.sigla}`,`${i.atribuicao.nome} (${i.atribuicao.sigla})`,!0).itens.push(i):n(uo,"Sem respons\xE1vel",!0).itens.push(i)}else if(e.colunas==="prazo"){for(let[i,c,l]of No)i!=="desde"&&n(i,c,!1,"O prazo \xE9 definido pelo bot\xE3o de prazo, n\xE3o arrastando.",l);for(let i of o){let c=Ko(i,t);n(c==="desde"?"sem":c,"",!1).itens.push(i)}}else for(let i of o)n(`t:${i.tipo}`,i.tipo||"Sem tipo",!1,"O tipo do processo n\xE3o muda arrastando.").itens.push(i);let s=[...a.values()];if(e.colunas==="prazo"&&(s=s.filter(i=>i.itens.length||i.titulo)),e.colunas==="marcador"||e.colunas==="responsavel"?s.sort((i,c)=>i.chave===uo?-1:c.chave===uo?1:fr.compare(i.titulo,c.titulo)):e.colunas==="tipo"&&s.sort((i,c)=>fr.compare(i.titulo,c.titulo)),e.limite>0)for(let i of s)i.excedeu=i.itens.length>e.limite;return s}var ve=o=>o.slice(o.indexOf(":")+1);function ba(o,e,t,r){if(t===r)return{ok:!1,motivo:"Mesma coluna."};if(o==="marcador"){let a=t===uo?void 0:ve(t),n=r===uo?void 0:ve(r);if(a&&!e.marcadores.some(l=>l.nome===a))return{ok:!1,motivo:"O processo j\xE1 n\xE3o tem esse marcador."};let s=n?e.marcadores.some(l=>l.nome===n):!1,i=a?e.marcadores.find(l=>l.nome===a)?.texto:void 0,c={tipo:"marcador",id:e.id,protocolo:e.protocolo};return a&&(c.remover=a),n&&!s&&(c.adicionar=n,i&&(c.texto=i)),!c.remover&&!c.adicionar?{ok:!1,motivo:"Nada a mudar."}:{ok:!0,movimento:c}}return o==="responsavel"?{ok:!0,movimento:{tipo:"atribuicao",id:e.id,protocolo:e.protocolo,para:r===uo?null:ve(r),de:t===uo?null:ve(t)}}:{ok:!1,motivo:"Esta divis\xE3o do quadro \xE9 s\xF3 de leitura."}}function gr(o,e,t={}){if(e.tipo==="atribuicao"){if(e.para===null){let{atribuicao:a,...n}=o;return n}return{...o,atribuicao:{sigla:e.para,nome:t[e.para]??e.para}}}let r=o.marcadores;return e.remover&&(r=r.filter(a=>a.nome!==e.remover)),e.adicionar&&(r=[...r,{nome:e.adicionar,cor:"",texto:e.texto??""}]),{...o,marcadores:r}}var hr="application/x-spro-cartao";function ys(o,e,t){let r=to(o,t.ctx),a=p("input",{type:"checkbox",class:"spro-cb","aria-label":`Marcar ${o.protocolo}`,disabled:!o.naPaginaAtual});a.checked=t.selecionados.has(o.id),a.addEventListener("change",()=>t.aoSelecionar(o.id,a.checked));let n=p("div",{class:`spro-cartao${a.checked?" spro-sel":""}`,draggable:"true","data-id":o.id,"data-de":e},p("div",{class:"spro-cartao-topo"},a,p("a",{class:`spro-proc${o.naoVisualizado?" spro-novo":""}`,href:o.link??"#",draggable:"false"},o.protocolo)),o.tipo?p("div",{class:"spro-cartao-tipo"},o.tipo):null,o.especificacao?p("div",{class:"spro-cartao-espec"},o.especificacao):null,p("div",{class:"spro-cartao-rodape"},r?p("span",{class:`spro-prazo spro-prazo-${r.situacao}`,title:r.dica},r.texto):null,o.atribuicao?p("span",{class:"spro-avatar",title:o.atribuicao.nome},o.atribuicao.sigla.slice(0,2).toUpperCase()):null));return n.addEventListener("dragstart",s=>{s.dataTransfer?.setData(hr,JSON.stringify({id:o.id,de:e})),s.dataTransfer?.setData("text/plain",o.protocolo),s.dataTransfer&&(s.dataTransfer.effectAllowed="move"),n.classList.add("spro-arrastando")}),n.addEventListener("dragend",()=>n.classList.remove("spro-arrastando")),n}function Es(o,e){let t=p("div",{class:"spro-col-corpo"},...o.itens.map(s=>ys(s,o.chave,e)));o.itens.length||t.append(p("div",{class:"spro-col-vazia"},o.aceitaSoltar?"Solte aqui":"Vazia"));let r=e.cfg.limite,a=p("div",{class:"spro-col-topo"},p("span",{class:"spro-col-titulo",title:o.titulo},o.titulo),p("span",{class:`spro-col-n${o.excedeu?" spro-excedeu":""}`,title:o.excedeu?`Passou do limite de ${r}`:void 0},r>0?`${o.itens.length}/${r}`:String(o.itens.length)),o.aceitaSoltar?null:p("span",{class:"spro-col-trava",title:o.motivoSomenteLeitura},co("bloquear",13))),n=p("section",{class:`spro-col${o.tom?` spro-tom-${o.tom}`:""}${o.excedeu?" spro-col-cheia":""}`,"data-chave":o.chave},a,t);return n.addEventListener("dragover",s=>{s.dataTransfer?.types.includes(hr)&&o.aceitaSoltar&&(s.preventDefault(),n.classList.add("spro-alvo"))}),n.addEventListener("dragleave",()=>n.classList.remove("spro-alvo")),n.addEventListener("drop",s=>{n.classList.remove("spro-alvo");let i=s.dataTransfer?.getData(hr);if(i){s.preventDefault();try{let{id:c,de:l}=JSON.parse(i);e.aoMover(c,l,o.chave)}catch{}}}),n}function va(o){let e=p("div",{class:"spro-quadro"}),t=r=>p("div",{class:"spro-colunas"},...ha(r,o.cfg,o.ctx,o.extras).map(a=>Es(a,o)));if(o.cfg.raiasPorResponsavel&&o.cfg.colunas!=="responsavel")for(let r of he(o.processos,"responsavel",o.ctx))e.append(p("div",{class:"spro-raia"},p("div",{class:"spro-raia-nome"},r.rotulo,p("span",{class:"spro-grupo-n"},String(r.itens.length))),t(r.itens)));else e.append(t(o.processos));return o.processos.length||e.prepend(p("div",{class:"spro-vazio"},"Nenhum processo corresponde ao filtro.")),e}var xa=".spro-fav-estrela, .spro-prj-ic, .spro-dem-cx",Ss=[".spro-fav-",".spro-prj-",".spro-dem-cx"],Aa=(o,e)=>o.getElementById(`P${e}`)?.querySelectorAll("td")[1],xe=["spro-fav-estrela","spro-prj-ic","spro-dem-cx"],br=o=>xe.find(e=>o.classList.contains(e))??"";function Ps(o,e,t){for(let r of Array.from(o.attributes))!e.hasAttribute(r.name)&&r.name!=="data-spro-id"&&o.removeAttribute(r.name);for(let r of Array.from(e.attributes))r.name!=="aria-busy"&&o.getAttribute(r.name)!==r.value&&o.setAttribute(r.name,r.value);o.removeAttribute("aria-busy"),o.setAttribute("data-spro-id",t),o.innerHTML!==e.innerHTML&&o.replaceChildren(...Array.from(e.cloneNode(!0).childNodes))}function ya(){let o=new Map;return function(t,r){let a=Aa(t,r),n=new Set,s=[];if(a){let i=[...a.querySelectorAll(xa)].sort((c,l)=>xe.indexOf(br(c))-xe.indexOf(br(l)));for(let c of i){let l=`${r}|${br(c)}`;n.add(l);let d=o.get(l);d?Ps(d,c,r):(d=c.cloneNode(!0),d.removeAttribute("aria-busy"),d.setAttribute("data-spro-id",r),o.set(l,d)),s.push(d)}}for(let i of xe)n.has(`${r}|${i}`)||o.delete(`${r}|${i}`);return s}}function vr(o,e){let t=Aa(o,e);return t?[...t.querySelectorAll(`${xa}, .acompanhamentoesp_icon`)].map(r=>`${r.className}|${r.getAttribute("aria-pressed")??""}|${r.getAttribute("aria-label")??""}|${r.hasAttribute("data-atraso")?1:0}|${r.querySelector('[class$="-n"]')?.textContent??""}`).join(";"):""}function Ea(o){let e=[];for(let t of Array.from(o.styleSheets??[])){let r;try{r=t.cssRules}catch{continue}for(let a of Array.from(r)){let n=a.cssText;Ss.some(s=>n.includes(s))&&e.push(n)}}return e.join(`
`)}function Sa(o,e,t,r,a=8){let n=Math.max(1,e),s=r>0?r:n*40,i=Math.max(0,Math.min(o,Math.floor(t/n)-a)),c=Math.min(o,Math.ceil((t+s)/n)+a);return{inicio:i,fim:c,antes:i*n,depois:Math.max(0,o-c)*n}}var ws=[[/azul_marinho|marinho/,"#1d3557"],[/azul_claro|ciano|celeste/,"#2a9fd6"],[/azul/,"#2563c9"],[/verde_escuro/,"#166534"],[/verde|lima/,"#2e9e4f"],[/amarelo/,"#e0b000"],[/laranja/,"#ee7d11"],[/vermelho/,"#d1352b"],[/rosa|magenta/,"#d6409f"],[/roxo|violeta|lilas/,"#7048c6"],[/marrom/,"#8a5a3c"],[/preto/,"#222831"],[/cinza/,"#7b838c"]];function Pa(o){let e=o.toLowerCase();return ws.find(([t])=>t.test(e))?.[1]??"#8b939c"}var Ae={compacta:34,confortavel:48},Ms={processo:"minmax(300px, 330px)",tipo:"minmax(120px, 1.2fr)",especificacao:"minmax(200px, 2fr)",responsavel:"minmax(90px, 130px)",marcadores:"minmax(120px, 1.3fr)",prazo:"minmax(120px, 150px)",anotacao:"minmax(130px, 1.4fr)",caixa:"84px",parado:"84px",sinais:"minmax(110px, 150px)"},Cs={processo:"protocolo",tipo:"tipo",responsavel:"responsavel",marcadores:"marcador",prazo:"prazo",caixa:"caixa",parado:"parado",sinais:"novo"};function ks(o){let e=o.trim().split(/\s+/);return e.length>2?`${e[0]} ${e[e.length-1]}`:o}function wa(o,e){return p("button",{type:"button",class:"spro-lapis",title:o,"aria-label":o,onclick:t=>{t.preventDefault(),t.stopPropagation(),e()}},X("lapis",13))}var oo=(o,e,t)=>p(o,{class:e},t);function Os(o,e,t,r){let a=oo("div",`spro-c spro-c-${e}`);switch(e){case"processo":{let n=r.icones(o.id),s=l=>n.find(d=>d.classList.contains(l))??p("span",{class:"spro-slot"}),i=o.acompanhamentoEspecial?p("span",{class:"spro-acomp",title:o.acompanhamentoGrupo?`Acompanhamento especial: ${o.acompanhamentoGrupo}`:"Acompanhamento especial"},X("olho",15)):p("span",{class:"spro-slot"});a.append(p("span",{class:"spro-icones"},s("spro-fav-estrela"),s("spro-prj-ic"),s("spro-dem-cx"),i));let c=p("a",{class:`spro-proc${o.naoVisualizado?" spro-novo":""}`,href:o.link??"#",title:"Abrir o processo"},o.protocolo);a.append(c),o.sigiloso&&a.append(p("span",{class:"spro-sigilo",title:"Processo sigiloso"},"sigiloso")),o.urgente&&a.append(p("span",{class:"spro-urgente",title:"Marcado como urgente"},"urgente")),o.trancado&&a.append(p("span",{class:"spro-sigilo",title:"Processo trancado"},"trancado"));break}case"tipo":a.append(oo("span","spro-corta",o.tipo)),a.title=o.tipo;break;case"especificacao":{if(a.classList.add("spro-editavel"),r.editando===o.id){let n=p("input",{type:"text",class:"spro-espec-input",maxlength:"100",value:r.rascunho,"aria-label":"Especifica\xE7\xE3o do processo"});n.addEventListener("input",()=>r.aoDigitarEspec(n.value)),n.addEventListener("keydown",l=>{l.stopPropagation(),l.key==="Enter"?r.aoSalvarEspec(o.id):l.key==="Escape"&&r.aoCancelarEspec()});let s=l=>l.preventDefault(),i=p("button",{type:"button",class:"spro-lapis spro-lapis-ok",title:"Salvar (Enter)","aria-label":"Salvar",onclick:()=>r.aoSalvarEspec(o.id)},X("check",14)),c=p("button",{type:"button",class:"spro-lapis",title:"Cancelar (Esc)","aria-label":"Cancelar",onclick:()=>r.aoCancelarEspec()},X("fechar",14));i.addEventListener("pointerdown",s),c.addEventListener("pointerdown",s),a.append(p("span",{class:"spro-edicao"},n,i,c));break}a.append(oo("span","spro-corta",o.especificacao)),a.title=o.especificacao,o.sigiloso||a.append(wa("Editar a especifica\xE7\xE3o",()=>r.aoEditarEspec(o.id)));break}case"responsavel":o.atribuicao&&(a.append(oo("span","spro-corta",r.nomesCompletos?ks(o.atribuicao.nome):o.atribuicao.sigla)),a.title=r.nomesCompletos?o.atribuicao.sigla:o.atribuicao.nome);break;case"marcadores":for(let n of o.marcadores){let s=p("span",{class:"spro-marcador",title:n.texto?`${n.nome}: ${n.texto}`:n.nome},p("i",{style:`background:${Pa(n.cor)}`}),n.nome);a.append(s)}break;case"prazo":{let n=to(o,t);a.classList.add("spro-editavel");let s=n?"Editar o prazo":"Definir um prazo",i=p("button",{type:"button",class:"spro-prazo-b",title:n?`${ur(o,t)}
${n.dica}

${s}`:s,"aria-label":s,onclick:c=>{c.preventDefault(),c.stopPropagation(),r.aoAbrirPrazo(o.id)}},n?oo("span",`spro-prazo spro-prazo-${n.situacao}`,n.texto):oo("span","spro-prazo-vazio","definir"));a.append(i,p("span",{class:"spro-lapis spro-lapis-fixo","aria-hidden":"true"},X("lapis",13)));break}case"anotacao":o.anotacao&&(a.classList.add("spro-editavel"),a.append(oo("span",`spro-corta${o.anotacao.prioridade?" spro-prio":""}`,o.anotacao.texto.replace(/\s*\n\s*/g," / "))),a.title=`${o.anotacao.texto}
${o.anotacao.autor}`,a.append(wa("Editar a anota\xE7\xE3o",()=>r.aoAbrirAnotacao(o.id))));break;case"caixa":{let n=$o(lo(o,t));a.append(oo("span","spro-suave",n)),n&&(a.title=Vt);break}case"parado":{let n=yo(o,t);a.append(oo("span","spro-suave",$o(n))),n!==null&&(a.title="Dias desde a \xFAltima movimenta\xE7\xE3o (vis\xE3o detalhada do SEI).");break}case"sinais":for(let n of dr(o))a.append(oo("span","spro-sinal",n));break}return a}function Ma(o){let e=o,t=oo("div","spro-cab"),r=oo("div","spro-corpo"),a=p("div",{class:"spro-rolagem",tabindex:"-1"},r),n=p("div",{class:"spro-tabela",role:"table"},t,a),s="",i=!1,c=!1,l=()=>`36px ${e.colunas.map(x=>Ms[x]).join(" ")}`;function d(){t.replaceChildren(),t.style.gridTemplateColumns=l();let x=e.linhas.filter(C=>C.tipo==="processo"&&C.processo.naPaginaAtual).map(C=>C.processo.id),P=x.filter(C=>e.selecionados.has(C)).length,S=p("input",{type:"checkbox",class:"spro-cb","aria-label":"Marcar todos os processos vis\xEDveis",title:"Marcar todos os vis\xEDveis (desta p\xE1gina do SEI)",disabled:!x.length});S.checked=x.length>0&&P===x.length,S.indeterminate=P>0&&P<x.length,S.addEventListener("change",()=>e.aoMarcarGrupo(x,S.checked)),t.append(oo("div","spro-c spro-c-cb")),t.firstElementChild.append(S);for(let C of e.colunas){let T=Cs[C],z=T?e.ordem.findIndex(g=>g.campo===T):-1,N=p("div",{class:`spro-c spro-th${T?" spro-ordenavel":""}`,role:"columnheader",...z>=0?{"aria-sort":e.ordem[z].decrescente?"descending":"ascending"}:{}});if(T){let g=p("button",{type:"button",class:"spro-th-b",title:"Ordenar (Shift acrescenta outro crit\xE9rio)",onclick:w=>e.aoOrdenar(T,w.shiftKey)},Mo[C]);z>=0&&g.append(p("span",{class:"spro-seta-ordem"},`${e.ordem[z].decrescente?"\u2193":"\u2191"}${e.ordem.length>1?z+1:""}`)),N.append(g)}else N.append(Mo[C]);t.append(N)}}function m(x,P){let S=e.selecionados.has(x.id),C=p("input",{type:"checkbox",class:"spro-cb","aria-label":`Marcar ${x.protocolo}`,disabled:!x.naPaginaAtual,title:x.naPaginaAtual?void 0:"Este processo est\xE1 em outra p\xE1gina do SEI; abra-o ou use o quadro para mover."});C.checked=S,C.addEventListener("change",()=>e.aoSelecionar(x.id,C.checked));let T=p("div",{class:`spro-linha${S?" spro-sel":""}${e.foco===x.id?" spro-foco":""}${x.urgente?" spro-linha-urgente":""}`,role:"row","data-id":x.id,"data-grupo":P});T.style.gridTemplateColumns=l(),T.style.height=`${Ae[e.densidade]}px`;let z=oo("div","spro-c spro-c-cb");return z.append(C),T.append(z,...e.colunas.map(N=>Os(x,N,e.ctx,e))),T}function h(x){let P=x.grupo.itens.filter(T=>T.naPaginaAtual).map(T=>T.id),S=p("button",{type:"button",class:"spro-grupo-b","aria-expanded":String(!x.recolhido),onclick:()=>e.aoGrupo(x.grupo.chave)},p("span",{class:`spro-grupo-seta${x.recolhido?" spro-fechado":""}`},co("seta",14)),p("span",{class:"spro-grupo-nome"},x.grupo.rotulo),p("span",{class:"spro-grupo-n"},String(x.grupo.itens.length))),C=p("div",{class:`spro-grupo${x.grupo.tom?` spro-tom-${x.grupo.tom}`:""}`,role:"row"},S);if(P.length){let T=P.every(z=>e.selecionados.has(z));C.append(p("button",{type:"button",class:"spro-link",onclick:()=>e.aoMarcarGrupo(P,!T)},T?"Desmarcar grupo":"Marcar grupo"))}return C.style.height=`${Ae[e.densidade]}px`,C}function A(){let x=Ae[e.densidade],P=Sa(e.linhas.length,x,a.scrollTop||0,a.clientHeight||0);r.style.paddingTop=`${P.antes}px`,r.style.paddingBottom=`${P.depois}px`,r.replaceChildren(...e.linhas.slice(P.inicio,P.fim).map(C=>C.tipo==="grupo"?h(C):m(C.processo,C.grupo)));let S=r.querySelector(".spro-espec-input");S&&i?(i=!1,S.focus(),S.setSelectionRange?.(S.value.length,S.value.length)):S&&S.getRootNode()instanceof ShadowRoot&&S.getRootNode().activeElement!==S&&c&&S.focus()}let y=0;a.addEventListener("scroll",()=>{if(y)return;let x=a.ownerDocument.defaultView;if(!x?.requestAnimationFrame)return A();y=x.requestAnimationFrame(()=>{y=0,A()})});function O(x){let P=x.colunas.join()!==e.colunas.join()||x.ordem!==e.ordem||x.selecionados!==e.selecionados;x.editando&&x.editando!==e.editando&&(i=!0),c=!!x.editando,e=x;let S=`${e.colunas.join()}|${e.densidade}`;if((P||S!==s)&&(d(),s=S),!e.linhas.length){r.style.paddingTop=r.style.paddingBottom="0",r.replaceChildren(p("div",{class:"spro-vazio"},"Nenhum processo corresponde ao filtro."));return}A()}function j(x){let P=e.linhas.findIndex(C=>C.tipo==="processo"&&C.processo.id===x);if(P<0)return!1;let S=Ae[e.densidade];return P*S<a.scrollTop?a.scrollTop=P*S:(P+1)*S>a.scrollTop+a.clientHeight&&a.clientHeight>0&&(a.scrollTop=(P+1)*S-a.clientHeight),A(),!0}return O(o),{el:n,atualizar:O,mostrar:j,rolagem:a}}var Ls=[["/","Buscar"],["j / k","Linha seguinte / anterior"],["x","Marcar a linha"],["Enter","Abrir o processo"],["g t","Ver a tabela"],["g q","Ver o quadro"],["Esc","Limpar a busca ou a sele\xE7\xE3o"],["?","Esta ajuda"]],Is=[["Meus","resp:eu",{comum:"pessoa"},""],["Atrasados","prazo:atrasado",{comum:"alerta"},"perigo"],["Vencem na semana","prazo:semana",{comum:"calendario"},"aviso"],["Sem respons\xE1vel","resp:sem",{grade:"semPessoa"},""],["N\xE3o visualizados","novo:sim",{grade:"olhoFechado"},""],["Novos desde a \xFAltima visita","novo:visita",{comum:"brilho"},"novo"],["Parados h\xE1 +30 dias","parado:>30d",{comum:"historico"},""]];function Ca(o){let{doc:e}=o,t=o.inicial.processos,r=Ro(),a=[],n="",s=new Set,i=new Set(rr(e)),c=null,l={vistoEm:{}},d,m=null,h=!1,A=!1,y="",O={},j=!1,x=!1,P,S=!1,C=ea(o.mover),T=new AbortController,z=()=>({hoje:o.hoje(),agora:o.agora(),...o.eu?{eu:o.eu}:{},...d!==void 0?{visitaAnterior:d}:{}}),N=e.createElement("div");N.id="spro-grade",N.setAttribute("data-spro-grade-host","1"),N.setAttribute("data-tema",o.escuro?"escuro":"claro");let g=N.attachShadow({mode:"open"}),w=e.createElement("style");w.textContent=o.css;let M=p("div",{class:`spro-app${o.escuro?" spro-escuro":""}`}),_=e.createElement("style");g.append(w,_,M);let D=p("input",{type:"search",class:"spro-busca",placeholder:"Buscar: texto, resp:ana, prazo:<7d, marcador:urgente...","aria-label":"Buscar processos",spellcheck:"false",autocomplete:"off"}),R=p("div",{class:"spro-chips"}),H=p("div",{class:"spro-rapidos"}),Po=p("div",{class:"spro-status",role:"status","aria-live":"polite"}),ao=p("div",{class:"spro-lote",hidden:!0}),xo=p("div",{class:"spro-conteudo"}),Ao=p("div",{class:"spro-painel",hidden:!0}),Ar=p("div",{class:"spro-avisos","aria-live":"polite"}),_o=p("div",{class:"spro-ajuda-atalhos",hidden:!0},p("strong",{},"Atalhos"),...Ls.map(([u,f])=>p("div",{},p("kbd",{},u),` ${f}`))),Da=[["protocolo","N\xFAmero do processo"],["prazo","Prazo"],["tipo","Tipo"],["responsavel","Respons\xE1vel"],["marcador","Marcador"],["caixa","Tempo na caixa"],["parado","Parado h\xE1"],["novo","N\xE3o visualizados"]],Pe=Bo({rotulo:"Agrupar por",icone:"camadas",classe:"spro-combo-compacto",busca:!1,vazio:"Sem agrupamento",opcoes:Object.keys(lr).map(u=>({valor:u,rotulo:u==="nenhum"?"Sem agrupamento":`Agrupar: ${lr[u]}`})),valor:["nenhum"],aoMudar:([u])=>G({agrupar:u??"nenhum"})}),yr=Bo({rotulo:"Ordenar por",icone:"ordenar",classe:"spro-combo-compacto",busca:!1,vazio:"Ordem do SEI",opcoes:[{valor:"",rotulo:"Ordem do SEI"},...Da.flatMap(([u,f])=>[{valor:`${u}:a`,rotulo:`${f} \u2191`,descricao:"Crescente"},{valor:`${u}:d`,rotulo:`${f} \u2193`,descricao:"Decrescente"}])],valor:[""],aoMudar:([u])=>{let[f,b]=(u??"").split(":");G({ordem:f?[{campo:f,decrescente:b==="d"}]:[]})}}),Jo=pr([],z()),we=(u,f,b,v,L)=>{let k=Bo({rotulo:u,vazio:f,icone:v,classe:"spro-combo-compacto",busca:!0,larguraLista:260,opcoes:()=>L().map($=>({valor:$.valor,rotulo:$.rotulo,contagem:$.n})),aoMudar:([$])=>{$&&(G({busca:ia(r.busca,b,$)}),D.value=r.busca,k.definir([],!1))}});return k},Er=we("Filtrar por respons\xE1vel","Respons\xE1vel\u2026","resp","pessoa",()=>Jo.responsaveis),Sr=we("Filtrar por tipo","Tipo\u2026","tipo","documento",()=>Jo.tipos),Pr=we("Filtrar por marcador","Marcador\u2026","marcador","etiqueta",()=>Jo.marcadores),wr=(u,f)=>p("button",{type:"button",class:"spro-seg-b","data-modo":u,title:f,onclick:()=>G({modo:u})},co(u==="tabela"?"lista":"quadro",16),p("span",{},f)),Mr=p("div",{class:"spro-seg",role:"group","aria-label":"Modo de exibi\xE7\xE3o"},wr("tabela","Tabela"),wr("quadro","Quadro")),Wo=(u,f,b,v="")=>p("button",{type:"button",class:`spro-bt ${v}`.trim(),title:f,"aria-label":f,onclick:b},co(u,16),p("span",{},f)),Cr=Wo("colunas","Colunas",()=>Io("colunas")),$a=Wo("disquete","Vis\xF5es",()=>Io("visoes")),za=Wo("lista","Exportar CSV",()=>Fa()),Ra=p("button",{type:"button",class:"spro-bt spro-bt-icone",title:"Atalhos de teclado (?)","aria-label":"Atalhos de teclado",onclick:()=>{_o.hidden=!_o.hidden}},"?"),kr=Wo("densidade","Densidade",()=>G({densidade:r.densidade==="compacta"?"confortavel":"compacta"})),Zo=p("div",{class:"spro-quadro-cfg",hidden:!0});M.append(p("div",{class:"spro-barra"},Mr,p("div",{class:"spro-busca-caixa"},D),Pe.el,yr.el,Cr,kr,$a,za,Ra),R,p("div",{class:"spro-faixa"},H,Er.el,Sr.el,Pr.el),Zo,_o,Ao,Po,ao,xo,Ar);let Or=()=>qt(t,l),qo=()=>sa(Or(),r.busca,z()),Me=()=>fa(qo(),r.ordem,z());function G(u){r={...r,...u},u.busca===void 0?o.armazem.gravarVisao(r).catch(()=>{}):Na(),Z()}let Ce;function Na(){clearTimeout(Ce),Ce=setTimeout(()=>void o.armazem.gravarVisao(r).catch(()=>{}),400)}function eo(u,f){let b=p("div",{class:"spro-aviso",role:"status"},p("span",{},u));f&&b.append(p("button",{type:"button",class:"spro-link",onclick:()=>{f.fazer(),b.remove()}},f.rotulo)),b.append(p("button",{type:"button",class:"spro-aviso-x","aria-label":"Fechar aviso",onclick:()=>b.remove()},"\xD7")),Ar.append(b),setTimeout(()=>b.remove(),f?9e3:6e3).unref?.()}function Oo(u,f){let b=new Set(i);for(let v of u)f?b.add(v):b.delete(v);i=b,Wt(e,b),ke(),io()}function Lo(u,f){t=t.map(b=>b.id===u?f:b)}async function Ta(u,f,b){let v=t.find(Q=>Q.id===u);if(!v)return;let L=ba(r.quadro.colunas,v,f,b);if(!L.ok)return eo(L.motivo);let k=Object.fromEntries((O.responsaveis??[]).map(Q=>[Q.sigla,Q.nome]));Lo(u,gr(v,L.movimento,k)),Z(),Vo+=1;let $=await C.mover(L.movimento).finally(()=>{Vo-=1});if(!x){if(!$.ok)return Lo(u,v),Z(),eo(`N\xE3o foi poss\xEDvel mover ${v.protocolo}: ${$.erro}`);eo(`${v.protocolo} movido.`,{rotulo:"Desfazer",fazer:()=>{let Q=t.find(mo=>mo.id===u)??v;Lo(u,gr(Q,$.desfazer,k)),Z(),C.mover($.desfazer).then(mo=>{mo.ok||x||(Lo(u,Q),Z(),eo(`N\xE3o foi poss\xEDvel desfazer: ${mo.erro}`))})}})}}let _a=ya(),Vo=0,Yo=null,oe="",Lr=!1,Ir=u=>({linhas:u,colunas:r.colunas,densidade:r.densidade,ctx:z(),ordem:r.ordem,selecionados:i,foco:c,icones:f=>_a(e,f),nomesCompletos:Lr,editando:Yo,rascunho:oe,aoOrdenar:(f,b)=>G({ordem:ga(r.ordem,f,b)}),aoSelecionar:(f,b)=>Oo([f],b),aoGrupo:f=>{let b=new Set(s);b.has(f)?b.delete(f):b.add(f),s=b,o.armazem.gravarRecolhidos([...b]).catch(()=>{}),io()},aoMarcarGrupo:(f,b)=>Oo(f,b),aoEditarEspec:f=>{Yo=f,oe=t.find(b=>b.id===f)?.especificacao??"",io()},aoDigitarEspec:f=>{oe=f},aoCancelarEspec:()=>{Yo=null,io()},aoSalvarEspec:f=>void qa(f),aoAbrirPrazo:f=>o.abrirPrazo(f),aoAbrirAnotacao:f=>{o.abrirAnotacao(f)||eo("Este processo n\xE3o tem o \xEDcone de anota\xE7\xE3o na tela do SEI (est\xE1 em outra p\xE1gina). Use o bot\xE3o Anota\xE7\xF5es da barra.")}}),ee=Ma(Ir([]));async function qa(u){let f=t.find(v=>v.id===u),b=oe.trim();if(Yo=null,!f||b===f.especificacao.trim())return io();if(!b)return eo("A especifica\xE7\xE3o n\xE3o pode ficar vazia."),io();Lo(u,{...f,especificacao:b}),Z(),Vo+=1;try{await o.editarEspecificacao(f.protocolo,b),eo(`Especifica\xE7\xE3o de ${f.protocolo} salva.`)}catch(v){Lo(u,f),Z(),eo(`N\xE3o foi poss\xEDvel salvar a especifica\xE7\xE3o: ${v instanceof Error?v.message:String(v)}`)}finally{Vo-=1}}function io(){let u=Me();if(r.modo==="quadro"){xo.replaceChildren(va({processos:u,cfg:r.quadro,ctx:z(),extras:O,selecionados:i,aoMover:(b,v,L)=>void Ta(b,v,L),aoSelecionar:(b,v)=>Oo([b],v)}));return}let f=he(u,r.agrupar,z());ee.atualizar(Ir(da(f,s,r.agrupar!=="nenhum"))),xo.firstElementChild!==ee.el&&xo.replaceChildren(ee.el)}function Dr(u){let f=[`${u} de ${t.length} processo${t.length===1?"":"s"}`],b=o.inicial.totais.recebidos+o.inicial.totais.gerados;h&&m?f.push(`carregando ${m.grupo} (${m.paginasLidas}/${m.paginasTotal})\u2026`):!A&&b>t.length&&f.push(`o SEI informa ${b}; os demais n\xE3o foram carregados`),y&&f.push(`aviso: ${y}`),Po.replaceChildren(f.join(" \xB7 ")),Po.classList.toggle("spro-status-alerta",!!y||!A&&!h&&b>t.length)}function ke(){let u=i.size;if(ao.hidden=u===0,!u)return ao.replaceChildren();let f=new Set(qo().map(v=>v.id)),b=[...i].filter(v=>!f.has(v)).length;ao.replaceChildren(p("strong",{},`${u} selecionado${u===1?"":"s"}`),...b?[p("span",{class:"spro-suave"},`(${b} fora do filtro atual)`)]:[],...o.acoes().map(v=>p("button",{type:"button",class:"spro-bt",title:v.rotulo,onclick:()=>{let L=Yt(v,i.size);!L.ok&&L.motivo&&eo(L.motivo)}},p("img",{src:v.icone,alt:"",width:"16",height:"16"}),p("span",{},v.rotulo))),p("button",{type:"button",class:"spro-link",onclick:()=>Oo([...i],!1)},"Limpar sele\xE7\xE3o"))}function Va(){let u=ir(r.busca);R.replaceChildren(...u.tokens.map(b=>p("span",{class:`spro-chip${b.termo.negado?" spro-chip-neg":""}`},b.texto,p("button",{type:"button","aria-label":`Remover ${b.texto}`,onclick:()=>{G({busca:cr(r.busca,b.texto)}),D.value=r.busca}},"\xD7")))),R.hidden=!u.tokens.length;let f=new Set(u.tokens.map(b=>b.texto));H.replaceChildren(...Is.map(([b,v,L,k])=>p("button",{type:"button",title:`Filtrar: ${v}`,class:`spro-rapido${k?` spro-rapido-${k}`:""}${f.has(v)?" spro-rapido-on":""}`,"aria-pressed":String(f.has(v)),onclick:()=>{G({busca:f.has(v)?cr(r.busca,v):`${r.busca} ${v}`.trim()}),D.value=r.busca}},"comum"in L?X(L.comum,14,e):co(L.grade,14,e),b)))}function Z(){if(x)return;Jo=pr(Or(),z());for(let f of[Er,Sr,Pr])f.atualizar();Pe.definir([r.agrupar],!1),Pe.el.disabled=r.modo==="quadro",yr.definir([r.ordem[0]?`${r.ordem[0].campo}:${r.ordem[0].decrescente?"d":"a"}`:""],!1);for(let f of Mr.querySelectorAll("[data-modo]"))f.setAttribute("aria-pressed",String(f.getAttribute("data-modo")===r.modo));kr.title=r.densidade==="compacta"?"Linhas confort\xE1veis":"Linhas compactas",Cr.hidden=r.modo==="quadro",Ha(),Va(),io(),Dr(qo().length),ke(),r.modo==="quadro"&&!j&&o.extras&&(j=!0,o.extras().then(f=>{O=f,x||io()}).catch(()=>{}))}function Ha(){if(Zo.hidden=r.modo!=="quadro",Zo.hidden)return;let u=r.quadro,f=Bo({rotulo:"Colunas do quadro",icone:"mapa",classe:"spro-combo-compacto",busca:!1,opcoes:[{valor:"marcador",rotulo:"Colunas: marcador"},{valor:"responsavel",rotulo:"Colunas: respons\xE1vel"},{valor:"prazo",rotulo:"Colunas: prazo (leitura)"},{valor:"tipo",rotulo:"Colunas: tipo (leitura)"}],valor:[u.colunas],aoMudar:([L])=>{j=!1,G({quadro:{...u,colunas:L??"marcador"}})}}),b=p("input",{type:"number",min:"0",max:"99",class:"spro-num",value:String(u.limite),"aria-label":"Limite de cart\xF5es por coluna (0 = sem limite)",title:"Limite de cart\xF5es por coluna (0 = sem limite)",onchange:L=>G({quadro:{...u,limite:Math.max(0,Math.min(99,Number(L.target.value)||0))}})}),v=p("input",{type:"checkbox",onchange:L=>G({quadro:{...u,raiasPorResponsavel:L.target.checked}})});v.checked=u.raiasPorResponsavel,Zo.replaceChildren(f.el,p("label",{class:"spro-rotulo-inline"},"Limite ",b),p("label",{class:"spro-rotulo-inline"},v," Raias por respons\xE1vel"),p("span",{class:"spro-suave"},u.colunas==="marcador"||u.colunas==="responsavel"?"Arraste os cart\xF5es entre as colunas.":"Esta divis\xE3o \xE9 s\xF3 de leitura."))}function Io(u){if(!Ao.hidden&&Ao.getAttribute("data-qual")===u){Ao.hidden=!0;return}if(Ao.setAttribute("data-qual",u),Ao.hidden=!1,u==="colunas"){Ao.replaceChildren(p("strong",{},"Colunas"),...zo.map(k=>{let $=p("input",{type:"checkbox",disabled:k==="processo"});return $.checked=r.colunas.includes(k),$.addEventListener("change",()=>{let Q=$.checked?zo.filter(mo=>mo===k||r.colunas.includes(mo)):r.colunas.filter(mo=>mo!==k);G({colunas:Q})}),p("label",{class:"spro-rotulo-linha"},$,` ${Mo[k]}`)}),p("button",{type:"button",class:"spro-link",onclick:()=>G({colunas:Ro().colunas})},"Restaurar padr\xE3o"));return}let f=p("input",{type:"text",class:"spro-nome",maxlength:"40",placeholder:"Nome da vis\xE3o","aria-label":"Nome da vis\xE3o"}),b=a.find(k=>k.id===n);f.value=b?.nome??"";let v=async(k,$=a)=>{a=k,await o.armazem.gravarVisoes(k,$).catch(()=>eo("N\xE3o foi poss\xEDvel sincronizar as vis\xF5es."))},L=async k=>{let $={...r,nome:f.value.trim()||"Minha vis\xE3o",id:k==="atualizar"?n:""},Q=Ht(a,$,o.novoId);if(!Q)return eo("Limite de vis\xF5es salvas atingido.");n=Q.visao.id,await v(Q.lista),eo(`Vis\xE3o "${Q.visao.nome}" salva.`),Io("visoes"),Io("visoes")};Ao.replaceChildren(p("strong",{},"Vis\xF5es salvas"),a.length?p("ul",{class:"spro-lista-visoes"},...a.map(k=>p("li",{},p("button",{type:"button",class:`spro-link${k.id===n?" spro-ativa":""}`,onclick:()=>{n=k.id,D.value=k.busca,G({...k,id:""})}},k.nome),p("button",{type:"button",class:"spro-aviso-x","aria-label":`Excluir ${k.nome}`,title:"Excluir",onclick:async()=>{await v(Ft(a,k.id),a),n===k.id&&(n=""),Io("visoes"),Io("visoes")}},"\xD7")))):p("p",{class:"spro-suave"},"Nenhuma vis\xE3o salva ainda."),p("div",{class:"spro-linha-form"},f,p("button",{type:"button",class:"spro-bt",onclick:()=>void L("nova")},"Salvar como nova"),b&&jt(r,b)?p("button",{type:"button",class:"spro-bt",onclick:()=>void L("atualizar")},"Atualizar"):null))}function Fa(){let u=la(Me(),r.modo==="quadro"?[...zo]:r.colunas,z());o.baixar(pa(o.hoje()),Ut(u),"text/csv;charset=utf-8"),eo(`${u.length-1} processos exportados.`)}D.addEventListener("input",()=>{let u=D.value;if(o.semDebounce)return G({busca:u});clearTimeout(P),P=setTimeout(()=>G({busca:u}),120)}),D.addEventListener("keydown",u=>{u.key==="Escape"&&(D.value="",G({busca:""}),D.blur())});function $r(u){if(x||u.ctrlKey||u.metaKey||u.altKey)return;let f=u.target;if(f&&(/^(input|textarea|select)$/i.test(f.tagName)||f.isContentEditable)||N.hidden)return;let v=u.key;if(S){S=!1,v==="t"?G({modo:"tabela"}):v==="q"&&G({modo:"quadro"});return}let L=Me().map($=>$.id),k=c?L.indexOf(c):-1;if(v==="/")u.preventDefault(),D.focus();else if(v==="?")_o.hidden=!_o.hidden;else if(v==="g")S=!0;else if(v==="Escape")i.size&&Oo([...i],!1);else if((v==="j"||v==="k")&&r.modo==="tabela"&&L.length)c=L[Math.max(0,Math.min(L.length-1,k+(v==="j"?1:-1)))],io(),ee.mostrar(c);else if(v==="x"&&c)t.find(Q=>Q.id===c)?.naPaginaAtual&&Oo([c],!i.has(c));else if(v==="Enter"&&c){let $=t.find(Q=>Q.id===c)?.link;$&&e.defaultView?.location.assign($)}}e.addEventListener("keydown",$r);let ja=Zt(e,u=>{i=u,ke(),io()}),Ga=o.armazem.aoMudarVisoes(()=>void o.armazem.lerVisoes().then(u=>{a=u}).catch(()=>{})),Oe=new Map;function Le(){if(x||Vo>0)return;let u=Do(e),f=new Map(u.processos.map(v=>[v.id,v])),b=!1;t=t.map(v=>{if(!v.naPaginaAtual)return v;let L=f.get(v.id);if(!L)return v;let k=vr(e,v.id),$=JSON.stringify(L)===JSON.stringify(v)&&Oe.get(v.id)===k;return Oe.set(v.id,k),$?v:(b=!0,L)}),b&&($e(),Z())}let Ie,zr=e.defaultView?.MutationObserver,De=zr?new zr(()=>{clearTimeout(Ie),Ie=setTimeout(Le,o.semDebounce?0:150)}):null,Rr=e.querySelector("#frmProcedimentoControlar")??e.body;De&&Rr&&De.observe(Rr,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["aria-pressed","aria-label","onmouseover","src","href","class"]});function $e(){let u=Ea(e);_.textContent!==u&&(_.textContent=u)}async function Ua(){if(!o.fonte)return A=!0,Nr(!0);h=!0,Z();let u=()=>o.fonte?.restaurarAoSair?.();e.defaultView?.addEventListener("pagehide",u);let f=await zt(o.inicial,o.fonte,{sinal:T.signal,aoProgresso:b=>{m=b,Dr(qo().length)},aoPagina:b=>{t=[...t,...b],Z()}});e.defaultView?.removeEventListener("pagehide",u),h=!1,A=f.completo,f.erro&&(y=f.erro),Nr(f.completo)}function Nr(u){l=Ye(l,t.map(f=>f.id),o.agora(),u),o.armazem.gravarIdade(l).catch(()=>{}),Z()}async function Ba(){try{let u=await o.armazem.lerEstado();r=u.visao,s=new Set(u.recolhidos),l=_t(u.idade,o.agora()),d=l.visitaAnterior,a=await o.armazem.lerVisoes()}catch{}l=Ye(l,t.map(u=>u.id),o.agora(),!1),D.value=r.busca,$e();for(let[u]of t.map(f=>[f.id]))Oe.set(u,vr(e,u));Z(),Ua();for(let u of[1200,3500])setTimeout(()=>{$e(),Le()},u).unref?.()}return{host:N,iniciar:Ba,render:Z,estado:()=>({visao:r,todos:t,selecionados:i,completo:A,carregando:h,filtrados:qo().length}),definirVisao:u=>{r={...r,...u},D.value=r.busca,Z()},fechar(){x=!0,T.abort(),clearTimeout(P),clearTimeout(Ce),clearTimeout(Ie),De?.disconnect(),e.removeEventListener("keydown",$r),ja(),Ga(),N.remove()},mostrar:u=>{N.hidden=!u},definirNomesCompletos:u=>{Lr=u,Z()},sincronizar:Le}}var ka=`/* Dentro do Shadow DOM: o base.css do sei-comum (tokens) vem antes deste arquivo. */
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
`;var Oa=`/* Na p\xE1gina do SEI (fora do Shadow DOM): o bot\xE3o alternador e o espa\xE7o da grade. */
.spro-grade-botao { display: inline-flex; align-items: center; margin-left: 4px; padding: 2px; line-height: 0; color: inherit; cursor: pointer; background: none; border: 0; border-radius: 6px; }
.spro-grade-botao:hover { background: color-mix(in srgb, currentColor 14%, transparent); }
.spro-grade-botao[aria-pressed="true"] { color: #1f5fbf; }
.spro-grade-botao:focus-visible { outline: 2px solid #1f5fbf; outline-offset: 1px; }
/* Com a grade ativa a barra de acoes sobe um pouco e ganha respiro antes da barra de ferramentas da grade. */
html[data-spro-grade] #collapseControle { margin-top: -6px; margin-bottom: 22px; }
#spro-grade { display: block; width: 100%; flex: 0 0 100%; }
#spro-grade[hidden] { display: none; }
`;var zs="gradecontrole";function Rs(){return new URL(location.href).searchParams.get("acao")==="procedimento_controlar"}var Ee=()=>!!document.body?.classList.contains("dark-mode")||_r(localStorage),Eo=!1,W=null,So=null,To=null,La=0,xr=!1,ye=null,Ia=document.readyState!=="loading";function Ns(){let o=document.querySelector($t);return document.getElementById("divTabelaProcesso")??o?.parentElement??null}function ko(o){So?.pronta(),W?.mostrar(!1),le(document),o&&o!=="usuario"&&console.warn("[SEI Pro] Grade do controle indispon\xEDvel, usando a vis\xE3o nativa:",o)}function Se(){if(W||!Eo)return;let o=new ie(location.href,()=>Go(document,location.href)),e=je(Go(document,location.href)),t=e.unidade.id,r=Gt({local:ze(chrome.storage.local,"local"),sync:ze(chrome.storage.sync,"sync")},String(t));if(["hdnRecebidosPaginaAtual","hdnGeradosPaginaAtual"].some(c=>document.getElementById(c)?.value&&document.getElementById(c).value!=="0")&&!sessionStorage.getItem("spro_grade_reset")){try{sessionStorage.setItem("spro_grade_reset","1")}catch{}We(o.http,Go(document,location.href)).restaurar().then(()=>location.reload()).catch(()=>ko("pagina intermediaria"));return}try{sessionStorage.removeItem("spro_grade_reset")}catch{}let n=Do(document);if(!n.processos.length&&!n.totais.recebidos&&!n.totais.gerados)return So?.pronta(),ko("caixa vazia");let s=Ns();if(!s)return ko("sem ponto de encaixe");let i=n.processos[0]?.id??"";W=Ca({doc:document,inicial:n,agora:()=>Date.now(),hoje:()=>te(),eu:e.usuario.login||void 0,armazem:r,fonte:We(o.http,Go(document,location.href)),mover:{marcador:async(c,l)=>void await pt(o,c,l,{aplicar:!0}),atribuir:async(c,l)=>void await lt(o,c,l,{aplicar:!0})},acoes:()=>vt(document),css:`${Vr}
${ka}`,escuro:Ee(),baixar:(c,l,d)=>jr(c,l,d),novoId:()=>qr(),extras:i?async()=>{let[c,l]=await Promise.all([He(o,"marcadores",i),He(o,"usuarios",i)]);return{marcadores:c.map(d=>d.nome),responsaveis:l.map(d=>{let[m,...h]=d.nome.split(" - ");return{sigla:m.trim(),nome:h.join(" - ").trim()||m.trim()}})}}:void 0,aoVoltarNativa:()=>Xo(),editarEspecificacao:async(c,l)=>void await at(o,c,{especificacao:l},{aplicar:!0}),abrirPrazo:c=>{document.documentElement.setAttribute("data-spro-prazos-alvo",c),document.dispatchEvent(new CustomEvent("spro-prazos-abrir"))},abrirAnotacao:c=>{let l=document.querySelector(`tr#P${c} a[href*="acao=anotacao_registrar"]`);return l?.click(),!!l}}),W.definirNomesCompletos(xr),s.before(W.host),Ts(),W.iniciar().then(()=>{So?.pronta(),wo(document)&&Be(document)}).catch(c=>ko(String(c)))}function Ts(){ye?.disconnect();let o=window.MutationObserver,e=!1;ye=new o(()=>{e||(e=!0,setTimeout(()=>{if(e=!1,!(!W||!Eo||W.host.isConnected&&!!W.host.shadowRoot&&document.querySelectorAll("#spro-grade").length===1||La>=6)){La+=1,W.fechar(),W=null;for(let r of document.querySelectorAll("#spro-grade"))r.remove();(wo(document)||Eo)&&Se()}},150))}),ye.observe(document.body??document.documentElement,{childList:!0,subtree:!0})}function Xo(){wo(document)?(W?.mostrar(!1),le(document)):(ce(document,Ee()),W?(W.mostrar(!0),Be(document)):Se()),To?.(),To=de(document,()=>wo(document),Xo)}function _s(o){o!==Eo&&(Eo=o,At(localStorage,o),o?(ce(document,Ee()),So=Qe(ko),Ia&&(So.iniciarContagem(),Se()),To=de(document,()=>wo(document),Xo)):(To?.(),To=null,ye?.disconnect(),W?.fechar(),W=null,So?.pronta(),le(document)))}function qs(){if(!Rs())return;let o=document.createElement("style");o.textContent=Oa,(document.head??document.documentElement).append(o),xt(localStorage)&&(Eo=!0,ce(document,Ee()),So=Qe(ko)),St(document,Xo);let e=()=>{Ia=!0,Eo&&(So?.iniciarContagem(),Se(),To??=de(document,()=>wo(document),Xo))};document.readyState==="loading"?document.addEventListener("DOMContentLoaded",e,{once:!0}):e();let t=a=>{xr=Re(a,"nomesusuarios"),W?.definirNomesCompletos(xr),_s(Re(a,zs))},r=!1;chrome.storage.onChanged.addListener((a,n)=>{n!=="sync"||!("dataValues"in a)||(r=!0,t(a.dataValues.newValue))}),chrome.storage.sync.get("dataValues").then(a=>{r||t(a.dataValues)}).catch(()=>{Eo&&ko("sem prefer\xEAncias")})}qs();})();
