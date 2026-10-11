/* GERADO por grade-controle/build.mjs. NAO EDITE. Rode: npm run build */
"use strict";(()=>{function Pn(o){let e={};for(let[t,r]of Object.entries(o)){let a={};r&&"newValue"in r&&(a.novo=r.newValue),r&&"oldValue"in r&&(a.antigo=r.oldValue),e[t]=a}return e}function Ge(o,e){return{obter:(t=null)=>o.get(t),gravar:t=>o.set(t),remover:t=>o.remove(t),chaves:typeof o.getKeys=="function"?()=>o.getKeys():void 0,aoMudar(t){let r=(a,n)=>{n===e&&t(Pn(a))};return chrome.storage.onChanged.addListener(r),()=>chrome.storage.onChanged.removeListener(r)}}}var Yr=o=>String(o).padStart(2,"0");function se(o=new Date){return`${o.getFullYear()}-${Yr(o.getMonth()+1)}-${Yr(o.getDate())}`}function ne(o){let e=/^(\d{4})-(\d{2})-(\d{2})$/.exec(o);if(!e)throw new Error(`Data inv\xE1lida: ${o}`);return new Date(Number(e[1]),Number(e[2])-1,Number(e[3]),12)}function Fo(o,e){return Math.round((ne(e).getTime()-ne(o).getTime())/864e5)}function fo(o){let[e,t,r]=o.split("-");return`${r}/${t}/${e}`}function Mn(o,e){let t=o;if(typeof o=="string"){if(!o.trim())return;try{t=JSON.parse(o)}catch{return}}return!Array.isArray(t)||t.length===0?void 0:t.map(a=>a?.configGeral).find(Array.isArray)?.find(a=>a?.name===e)?.value}function Ue(o,e){let t=Mn(o,e);return t===!0||t===1||t==="1"}function ot(o){try{return!!o.getItem("darkModePro")}catch{return!1}}function et(o=crypto){if(typeof o.randomUUID=="function")return o.randomUUID();let e=o.getRandomValues(new Uint8Array(16));e[6]=(e[6]??0)&15|64,e[8]=(e[8]??0)&63|128;let t=[...e].map(r=>r.toString(16).padStart(2,"0")).join("");return`${t.slice(0,8)}-${t.slice(8,12)}-${t.slice(12,16)}-${t.slice(16,20)}-${t.slice(20)}`}var rt=`/*
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
`;function p(o,e={},...t){let r=document.createElement(o);for(let[a,n]of Object.entries(e))n===void 0||n===!1||(typeof n=="function"?r.addEventListener(a.replace(/^on/,""),n):n===!0?r.setAttribute(a,""):a==="class"?r.className=n:a==="value"&&o==="textarea"?r.value=n:r.setAttribute(a,n));for(let a of t)a!=null&&a!==!1&&r.append(a);return r}var io={fill:"currentColor",stroke:"none"},tt="M12 3.2l2.7 5.5 6 .9-4.35 4.25 1 6L12 17l-5.35 2.85 1-6L3.3 9.6l6-.9z",at={estrela:[["path",{d:tt}]],estrelaCheia:[["path",{d:tt,fill:"currentColor"}]],alvo:[["circle",{cx:"12",cy:"12",r:"7.5"}],["circle",{cx:"12",cy:"12",r:"3.2"}]],alvoAtivo:[["circle",{cx:"12",cy:"12",r:"6.6"}],["circle",{cx:"12",cy:"12",r:"2.4",fill:"currentColor"}],["path",{d:"M12 2.2v3.4M12 18.4v3.4M2.2 12h3.4M18.4 12h3.4"}]],pasta:[["path",{d:"M3.5 7.5a2 2 0 0 1 2-2h4l2 2h7a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2z"}]],etiqueta:[["path",{d:"M3.5 12.2V4.5a1 1 0 0 1 1-1h7.7l8.3 8.3a1 1 0 0 1 0 1.4l-7.1 7.1a1 1 0 0 1-1.4 0z"}],["circle",{cx:"8",cy:"8",r:"1.4",...io}]],relogio:[["circle",{cx:"12",cy:"12",r:"9"}],["path",{d:"M12 7.2V12l3.2 1.9"}]],nota:[["path",{d:"M6 3.5h9l3.5 3.5v13.5H6z"}],["path",{d:"M9 11h6"}],["path",{d:"M9 15h6"}]],lixeira:[["path",{d:"M4.5 6.5h15"}],["path",{d:"M9.5 6.5V4.8c0-.7.6-1.3 1.3-1.3h2.4c.7 0 1.3.6 1.3 1.3v1.7"}],["path",{d:"M6.8 6.5 7.6 19c0 .8.7 1.5 1.5 1.5h5.8c.8 0 1.5-.7 1.5-1.5l.8-12.5"}]],lapis:[["path",{d:"M17.5 3.5a2.1 2.1 0 0 1 3 3L9 18l-4.5 1.5L6 15z"}],["path",{d:"M15 6l3 3"}]],fechar:[["path",{d:"M18 6 6 18"}],["path",{d:"M6 6l12 12"}]],mais:[["path",{d:"M12 5v14"}],["path",{d:"M5 12h14"}]],busca:[["circle",{cx:"11",cy:"11",r:"6.5"}],["path",{d:"M20.5 20.5l-4.8-4.8"}]],baixar:[["path",{d:"M12 3.5v11"}],["path",{d:"M7.5 10.2 12 14.7l4.5-4.5"}],["path",{d:"M4.5 19.5h15"}]],subir:[["path",{d:"M12 14.5v-11"}],["path",{d:"M7.5 7.8 12 3.3l4.5 4.5"}],["path",{d:"M4.5 19.5h15"}]],copiar:[["rect",{x:"8.5",y:"8.5",width:"12",height:"12",rx:"2"}],["path",{d:"M15.5 8.5V5.5a2 2 0 0 0-2-2h-8a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h3"}]],restaurar:[["path",{d:"M9 14 4 9l5-5"}],["path",{d:"M4 9h9a7 7 0 0 1 7 7v4"}]],check:[["path",{d:"M20 6.5 9.2 17.3 4 12.1"}]],alerta:[["path",{d:"M10.3 4.4 2.8 17.6a2 2 0 0 0 1.7 3h15a2 2 0 0 0 1.7-3L13.7 4.4a2 2 0 0 0-3.4 0z"}],["path",{d:"M12 9.5v4"}],["circle",{cx:"12",cy:"16.8",r:"1",...io}]],menu:[["circle",{cx:"5",cy:"12",r:"1.4",...io}],["circle",{cx:"12",cy:"12",r:"1.4",...io}],["circle",{cx:"19",cy:"12",r:"1.4",...io}]],alca:[["circle",{cx:"9",cy:"6",r:"1.3",...io}],["circle",{cx:"15",cy:"6",r:"1.3",...io}],["circle",{cx:"9",cy:"12",r:"1.3",...io}],["circle",{cx:"15",cy:"12",r:"1.3",...io}],["circle",{cx:"9",cy:"18",r:"1.3",...io}],["circle",{cx:"15",cy:"18",r:"1.3",...io}]],ajustes:[["path",{d:"M4 7h5"}],["path",{d:"M13 7h7"}],["circle",{cx:"11",cy:"7",r:"2.1"}],["path",{d:"M4 17h9"}],["path",{d:"M17 17h3"}],["circle",{cx:"15",cy:"17",r:"2.1"}]],setaCima:[["path",{d:"M12 19V6"}],["path",{d:"M6 12l6-6 6 6"}]],setaBaixo:[["path",{d:"M12 5v13"}],["path",{d:"M18 12l-6 6-6-6"}]],recolher:[["path",{d:"M6 15l6-6 6 6"}]],expandir:[["path",{d:"M6 9l6 6 6-6"}]],local:[["path",{d:"M12 21s-6.5-6.1-6.5-11a6.5 6.5 0 0 1 13 0c0 4.9-6.5 11-6.5 11z"}],["circle",{cx:"12",cy:"10",r:"2.3"}]],sino:[["path",{d:"M6.5 16.5V11a5.5 5.5 0 0 1 11 0v5.5l1.5 1.5h-14z"}],["path",{d:"M10 20.5a2 2 0 0 0 4 0"}]],documento:[["path",{d:"M7 3.5h7l4 4v13H7z"}],["path",{d:"M14 3.5v4h4"}]],painel:[["rect",{x:"3.5",y:"4.5",width:"17",height:"15",rx:"2"}],["path",{d:"M14.5 4.5v15"}]],atualizar:[["path",{d:"M19.5 12a7.5 7.5 0 1 1-2.2-5.3"}],["path",{d:"M19.5 4.5v4h-4"}]],nuvem:[["path",{d:"M7 18.5h10a4 4 0 0 0 .6-7.95A5.5 5.5 0 0 0 7 9.5a4.5 4.5 0 0 0 0 9z"}]],chevron:[["path",{d:"M7 9.5l5 5 5-5"}]],pino:[["path",{d:"M9.5 3.5h5l-.8 5.2 3.3 3.1v1.7H7v-1.7l3.3-3.1z"}],["path",{d:"M12 13.5v7"}]],pinoCheio:[["path",{d:"M9.5 3.5h5l-.8 5.2 3.3 3.1v1.7H7v-1.7l3.3-3.1z",fill:"currentColor"}],["path",{d:"M12 13.5v7"}]],filtro:[["path",{d:"M4 5.5h16l-6.2 7.3v5.4l-3.6 1.8v-7.2z"}]],ordenar:[["path",{d:"M7.5 4.5v15"}],["path",{d:"M4 16l3.5 3.5L11 16"}],["path",{d:"M16.5 19.5v-15"}],["path",{d:"M13 8l3.5-3.5L20 8"}]],mapa:[["path",{d:"M9 4.5 3.5 6.6v13l5.5-2.1 6 2.1 5.5-2.1v-13L15 6.6z"}],["path",{d:"M9 4.5v13"}],["path",{d:"M15 6.6v13"}]],olho:[["path",{d:"M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z"}],["circle",{cx:"12",cy:"12",r:"2.8"}]],camadas:[["path",{d:"M12 3.5 20.5 8 12 12.5 3.5 8z"}],["path",{d:"M3.5 12 12 16.5 20.5 12"}],["path",{d:"M3.5 16 12 20.5 20.5 16"}]],historico:[["path",{d:"M3.8 12.5A8.3 8.3 0 1 0 6.2 6"}],["path",{d:"M3.8 4.2v4.3h4.3"}],["path",{d:"M12 8v4.2l2.8 1.7"}]],pessoa:[["circle",{cx:"12",cy:"8",r:"3.6"}],["path",{d:"M5 20c.9-3.7 3.6-5.6 7-5.6s6.1 1.9 7 5.6"}]],predio:[["path",{d:"M5 20.5v-15a1 1 0 0 1 1-1h7.5a1 1 0 0 1 1 1v15"}],["path",{d:"M14.5 9.5H18a1 1 0 0 1 1 1v10"}],["path",{d:"M3 20.5h18"}],["path",{d:"M8.5 8.5h3"}],["path",{d:"M8.5 12h3"}],["path",{d:"M8.5 15.5h3"}]],brilho:[["path",{d:"M12 3.5l1.9 5.1 5.1 1.9-5.1 1.9L12 17.5l-1.9-5.1L5 10.5l5.1-1.9z"}],["path",{d:"M18.5 16.5v4"}],["path",{d:"M16.5 18.5h4"}]],calendario:[["rect",{x:"4",y:"5.5",width:"16",height:"15",rx:"2"}],["path",{d:"M4 10h16"}],["path",{d:"M8.5 3.5v4"}],["path",{d:"M15.5 3.5v4"}]],cadeado:[["rect",{x:"5.5",y:"10.5",width:"13",height:"10",rx:"2"}],["path",{d:"M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5"}]],saida:[["path",{d:"M14 4.5h4.5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H14"}],["path",{d:"M10 16l4-4-4-4"}],["path",{d:"M14 12H4.5"}]],planilha:[["rect",{x:"4",y:"4",width:"16",height:"16",rx:"2"}],["path",{d:"M4 9.5h16"}],["path",{d:"M4 15h16"}],["path",{d:"M10 9.5V20"}]],mover:[["path",{d:"M4.5 12h14"}],["path",{d:"M13.5 6.5 19 12l-5.5 5.5"}]],sol:[["circle",{cx:"12",cy:"12",r:"3.8"}],["path",{d:"M12 2.8v2M12 19.2v2M2.8 12h2M19.2 12h2M5.5 5.5l1.4 1.4M17.1 17.1l1.4 1.4M5.5 18.5l1.4-1.4M17.1 6.9l1.4-1.4"}]],teclado:[["rect",{x:"3",y:"6.5",width:"18",height:"11",rx:"2"}],["path",{d:"M7 10h.01M10.3 10h.01M13.7 10h.01M17 10h.01M8 14h8"}]],gantt:[["path",{d:"M4 5h9M7 12h11M4 19h7"}],["path",{d:"M3 3v18"}]],demandas:[["circle",{cx:"10",cy:"7.8",r:"3.2"}],["path",{d:"M3.8 19.5a6.2 5.2 0 0 1 11.8-2.6"}],["circle",{cx:"17.6",cy:"17.6",r:"4.2"}],["path",{d:"m15.6 17.7 1.5 1.5 2.5-3"}]]},Ci=Object.keys(at);function V(o,e=18,t=document){let r="http://www.w3.org/2000/svg",a=t.createElementNS(r,"svg"),n={viewBox:"0 0 24 24",width:String(e),height:String(e),fill:"none",stroke:"currentColor","stroke-width":"1.8","stroke-linecap":"round","stroke-linejoin":"round","aria-hidden":"true",focusable:"false",class:"spro-icone"};for(let[s,i]of Object.entries(n))a.setAttribute(s,i);for(let[s,i]of at[o]){let c=t.createElementNS(r,s);for(let[l,d]of Object.entries(i))c.setAttribute(l,d);a.append(c)}return a}function nt(o,e,t,r=1e4){let a=URL.createObjectURL(new Blob([e],{type:t})),n=p("a",{href:a,download:o});document.body.append(n),n.click(),n.remove(),setTimeout(()=>URL.revokeObjectURL(a),r).unref?.()}var S=class extends Error{codigo;detalhe;constructor(e,t,r){super(t),this.name="ErroSei",this.codigo=e,this.detalhe=r}paraJSON(){return{codigo:this.codigo,mensagem:this.message,detalhe:this.detalhe}}};function Be(o){if(o instanceof S)return o;if(o instanceof DOMException&&o.name==="AbortError")return new S("CANCELADO","Opera\xE7\xE3o cancelada.");let e=o instanceof Error?o.message:String(o);return new S("SEI_REDE",`Falha ao falar com o SEI: ${e}`)}var Cn={AElig:198,Aacute:193,Acirc:194,Agrave:192,Aring:197,Atilde:195,Auml:196,Ccedil:199,ETH:208,Eacute:201,Ecirc:202,Egrave:200,Euml:203,Iacute:205,Icirc:206,Igrave:204,Iuml:207,Ntilde:209,Oacute:211,Ocirc:212,Ograve:210,Oslash:216,Otilde:213,Ouml:214,THORN:222,Uacute:218,Ucirc:219,Ugrave:217,Uuml:220,Yacute:221,aacute:225,acirc:226,acute:180,aelig:230,agrave:224,amp:38,apos:39,aring:229,atilde:227,auml:228,brvbar:166,bull:8226,ccedil:231,cedil:184,cent:162,copy:169,curren:164,deg:176,divide:247,eacute:233,ecirc:234,egrave:232,eth:240,euml:235,euro:8364,frac12:189,frac14:188,frac34:190,gt:62,hellip:8230,iacute:237,icirc:238,iexcl:161,igrave:236,iquest:191,iuml:239,laquo:171,ldquo:8220,lsquo:8216,lt:60,macr:175,mdash:8212,micro:181,middot:183,nbsp:160,ndash:8211,not:172,ntilde:241,oacute:243,ocirc:244,ograve:242,ordf:170,ordm:186,oslash:248,otilde:245,ouml:246,para:182,plusmn:177,pound:163,quot:34,raquo:187,rdquo:8221,reg:174,rsquo:8217,sect:167,shy:173,sup1:185,sup2:178,sup3:179,szlig:223,thorn:254,times:215,trade:8482,uacute:250,ucirc:251,ugrave:249,uml:168,uuml:252,yacute:253,yen:165,yuml:255};function U(o){return o.includes("&")?o.replace(/&(#x[0-9a-fA-F]+|#\d+|[a-zA-Z][a-zA-Z0-9]*);/g,(e,t)=>{let r=t[0]==="#"?t[1]==="x"||t[1]==="X"?parseInt(t.slice(2),16):parseInt(t.slice(1),10):Cn[t];return r===void 0||Number.isNaN(r)?e:String.fromCodePoint(r)}):o}var st={128:8364,130:8218,131:402,132:8222,133:8230,134:8224,135:8225,136:710,137:8240,138:352,139:8249,140:338,142:381,145:8216,146:8217,147:8220,148:8221,149:8226,150:8211,151:8212,152:732,153:8482,154:353,155:8250,156:339,158:382,159:376};var it=null;function ie(o){return it?it(o):new DOMParser().parseFromString(o,"text/html")}function H(o){return(o?.textContent??"").replace(/\s+/g," ").trim()}var On={n:`
`,r:"\r",t:"	",b:"\b",f:"\f",v:"\v",0:"\0"};function Qe(o,e){let t=o[e],r="";for(e+=1;e<o.length;){let a=o[e];if(a==="\\"){let n=o[e+1];if(n==="u"&&/^[0-9a-fA-F]{4}$/.test(o.slice(e+2,e+6))){r+=String.fromCharCode(parseInt(o.slice(e+2,e+6),16)),e+=6;continue}r+=On[n]??n,e+=2;continue}if(a===t)return[r,e+1];r+=a,e+=1}return[r,e]}function ce(o,e){let t=[],r=e;for(;r<o.length;){let a=o[r];if(a===")")return[t,r+1];if(a===","||/\s/.test(a)){r+=1;continue}if(a==='"'||a==="'"){let[i,c]=Qe(o,r);t.push(i),r=c;continue}let n=/^(null|true|false|-?\d+(?:\.\d+)?)/.exec(o.slice(r,r+32));if(n){let i=n[1];t.push(i==="null"?null:i==="true"?!0:i==="false"?!1:Number(i)),r+=i.length;continue}let s=0;for(;r<o.length;){let i=o[r];if(i==="(")s+=1;else if(i===")"){if(s===0)break;s-=1}else if(i===","&&s===0)break;r+=1}t.push(null)}return[t,r]}function go(o,e){let t=[],r=new RegExp(`\\b${e}\\(`,"g");for(let a of o.matchAll(r)){let[n]=ce(o,a.index+a[0].length);t.push(n)}return t}function D(o){return typeof o=="string"?U(o):o==null?"":String(o)}var Ln=/controlador(?:_ajax)?\.php\?acao=[^"'\s<>\\]*?infra_hash=[0-9a-f]{64,192}/g;function ho(o){let e=new Set;for(let t of o.replace(/&amp;/g,"&").matchAll(Ln))e.add(t[0]);return[...e]}function K(o){let e=o.indexOf("?");return new URLSearchParams(e>=0?o.slice(e+1):"")}function to(o,e,t={}){let r=Array.isArray(o)?o:ho(o);for(let a of r){let n=K(a),s=n.get("acao")??"";if(!(typeof e=="string"?s!==e:!e.test(s))&&Object.entries(t).every(([i,c])=>n.get(i)===c))return a}return null}function ct(o,e){let t=[...o.doc.querySelectorAll("#infraMenu a[href], #main-menu a[href], .infraMenu a[href]")].map(s=>s.getAttribute("href")??"").join(`
`),r=ho(t).filter(s=>K(s).get("acao")===e),n=(r.length?r:ho(o.html).filter(s=>K(s).get("acao")===e)).sort((s,i)=>[...K(s).keys()].length-[...K(i).keys()].length)[0];if(!n)throw new S("SEI_ACAO_INDISPONIVEL",`O menu do SEI n\xE3o oferece "${e}" para este usu\xE1rio.`);return n}function Dn(o){let e=new Map;for(let t of o.matchAll(/Nos\[(\d+)\]\s*=\s*new\s+infraArvoreNo\(/g)){let[r]=ce(o,t.index+t[0].length);e.set(Number(t[1]),{indice:Number(t[1]),args:r,props:{}})}for(let t of o.matchAll(/Nos\[(\d+)\]\.(\w+)\s*=\s*(['"])/g)){let r=e.get(Number(t[1]));if(!r)continue;let[a]=Qe(o,t.index+t[0].length-1);r.props[t[2]]=a}return[...e.values()].sort((t,r)=>t.indice-r.indice)}function In(o){let e=[];for(let t of o.matchAll(/new\s+infraArvoreAcao\(/g)){let[r]=ce(o,t.index+t[0].length);e.push({tipo:D(r[0]),idPai:D(r[2]),href:D(r[3]),titulo:D(r[5]),icone:D(r[6]),extra:r[8]==null?void 0:D(r[8])})}return e}function lt(o,e){let t=o.find(s=>s.tipo==="NIVEL_ACESSO"&&s.idPai===e);if(!t)return{nivel:"publico"};let[r,...a]=t.titulo.split(`
`);return{nivel:/sigilos/i.test(r)||/sigiloso/.test(t.icone)?"sigiloso":"restrito",hipotese:a.join(" ").trim()||void 0}}function pt(o){return[...new Set([...o.matchAll(/<img[^>]*\btitle="([^"]+)"/g)].map(e=>D(e[1])))]}var $n=/\s*\(\d{5,}\)\s*$/;function zn(o){let e=o.html,t=Dn(e),r=In(e),a=t.find(c=>c.args[0]==="PROCESSO");if(!a)throw new S("SEI_VERSAO_NAO_SUPORTADA","A \xE1rvore do processo n\xE3o tem o n\xF3 do processo.");let n=D(a.args[1]),s=lt(r,n),i=t.filter(c=>c.args[0]==="DOCUMENTO").map(c=>{let l=D(c.args[1]),d=D(c.args[5]),g=D(c.args[7]),m=(c.props.src??"").replace(/&amp;/g,"&"),y=r.find(A=>A.tipo==="ASSINATURA"&&A.idPai===l),{nivel:b,hipotese:E}=lt(r,l),q=(/documento_([a-z0-9]+)\.svg/.exec(g)?.[1]??"interno").replace("cancelado","interno");return{id:l,numero:D(c.args[15])||(/\((\d{5,})\)\s*$/.exec(d)?.[1]??""),titulo:d.replace($n,""),pasta:c.args[2]&&String(c.args[2]).startsWith("PASTA")?String(c.args[2]):null,externo:/documento_download_anexo/.test(m)||!/documento_interno|documento_cancelado|formulario|email/.test(g),formato:q,nivel:b,hipotese:E,assinado:!!y,assinaturas:y?y.titulo.split(`
`).slice(1).filter(Boolean):[],cancelado:/documento_cancelado/.test(g),unidadeGeradora:r.find(A=>A.tipo==="UNIDADE_GERADORA"&&A.idPai===l)?.extra,link:D(c.args[3]).replace(/&amp;/g,"&"),src:m,acoes:ho(c.props.acoes??""),botoes:pt(c.props.acoes??"")}});return{idProcedimento:n,protocolo:D(a.args[5])||D(a.args[15]),tipo:D(a.args[6]),nivel:s.nivel,hipotese:s.hipotese,marcadores:r.filter(c=>c.tipo==="MARCADOR"&&c.idPai===n).map(c=>c.titulo.replace(/^Marcador\n/,"").replace(/\n/g," \u2014 ")),documentos:i,acoesProcesso:ho(a.props.acoes??""),botoesProcesso:pt(a.props.acoes??""),linkProcesso:D(a.args[3]).replace(/&amp;/g,"&"),sinais:r.filter(c=>c.idPai===n),links:ho(e),pagina:o}}async function dt(o,e,t){let r=await o.obter(e,t);if(!/acao=procedimento_visualizar/.test(r.url)){let a=r.doc.querySelector("#ifrArvore")?.getAttribute("src");if(!a)throw new S("SEI_NAO_ENCONTRADO","N\xE3o foi poss\xEDvel abrir a \xE1rvore do processo.");r=await o.obter(a,t)}if(/infraArvoreNo\("PASTA"/.test(r.html)){let a=to(r.html,"procedimento_visualizar")&&ho(r.html).find(n=>/abrir_pastas=1/.test(n));a&&(r=await o.obter(a,t))}return zn(r)}function vo(o,e,t){if(t){let r=o.documentos.find(a=>a.id===t);return r?to(r.acoes,e):null}return to(o.acoesProcesso,e)??to(o.links,e,{id_procedimento:o.idProcedimento})}function ao(o,e,t){let r=(e??"").trim(),a=(t??"").trim();return t===void 0||r===a?[]:[{campo:o,antes:r,depois:a}]}var jo={publico:"0",restrito:"1"},le={0:"P\xFAblico",1:"Restrito",2:"Sigiloso"};async function Go(o,e,t,r){let a=/controlador_ajax\.php\?acao_ajax=hipotese_legal_select[^'"]*/.exec(e.pagina.html)?.[0];return a?o.ajax(U(a),[["primeiroItemValor","null"],["primeiroItemDescricao"," "],["valorItemSelecionado",""],["staNivelAcesso",t]],{sinal:r}):e.opcoes("selHipoteseLegal").filter(n=>n.valor!=="null").map(n=>({id:n.valor,texto:n.texto}))}var gt="\xA5",Xe="\xB1";function ut(o){return o.map(e=>`${e.id}${Xe}${e.texto}`).join(gt)}function Rn(o){return o?o.split(gt).map(e=>{let[t,...r]=e.split(Xe);return{id:t,texto:r.join(Xe)}}):[]}function mt(o){let e=[];for(let t of o.matchAll(/new\s+infraLupaSelect\(\s*['"]([\w-]+)['"]\s*,\s*['"]([\w-]+)['"]/g))e.push([t[1],t[2]]);return e}var F=class o{constructor(e,t,r){this.http=e;this.pagina=t;this.elemento=r,this.id=r.id,this.action=(r.getAttribute("action")??"").replace(/&amp;/g,"&"),this.campos=Tn(r),this.sincronizarLupas()}id;action;campos;elemento;static async abrir(e,t,r,a){let n=await e.obter(t,a);return o.de(n,r,e)}static de(e,t,r=null){let a=e.doc.querySelector(t);if(!a)throw new S("SEI_VERSAO_NAO_SUPORTADA",`A tela do SEI n\xE3o tem o formul\xE1rio esperado (${t}).`,H(e.doc.querySelector("title")));return new o(r,e,a)}pares(){return this.campos.map(e=>[e.nome,e.valor])}valor(e){return this.campos.find(t=>t.nome===e)?.valor}tem(e){return this.elemento.querySelector(`[name="${e}"]`)!==null||this.campos.some(t=>t.nome===e)}opcoes(e){let t=this.elemento.querySelector(`select[name="${e}"], select#${ft(e)}`);return t?[...t.querySelectorAll("option")].map(r=>({valor:r.getAttribute("value")??H(r),texto:H(r),selecionada:r.hasAttribute("selected")})):[]}definir(e){for(let[t,r]of Object.entries(e)){if(r===void 0)continue;if(r===null){this.campos=this.campos.filter(n=>n.nome!==t);continue}let a=this.campos.find(n=>n.nome===t);a?a.valor=r:this.campos.push({nome:t,valor:r})}return this}escolher(e,t){let r=this.opcoes(e),a=J(t),n=r.find(s=>s.valor===t)??r.find(s=>J(s.texto)===a)??Ke(r.filter(s=>J(s.texto).includes(a)));if(!n)throw new S("ARGUMENTO_INVALIDO",`"${t}" n\xE3o \xE9 uma op\xE7\xE3o de ${e}.`,r.slice(0,40).map(s=>s.texto).join(" | "));return this.definir({[e]:n.valor}),n}linhas(e){return[...this.elemento.querySelectorAll(`${e} tr`)].filter(t=>t.querySelector("input[type=checkbox]"))}itensLupa(e){let t=this.hiddenDaLupa(e);return t?Rn(this.valor(t)??""):[]}definirLupa(e,t){let r=this.hiddenDaLupa(e);if(!r)throw new S("SEI_VERSAO_NAO_SUPORTADA",`A lupa ${e} n\xE3o existe nesta tela.`);return this.definir({[r]:ut(t)}),this.campos=this.campos.filter(a=>a.nome!==e&&a.nome!==`${e}[]`),this}async enviar(e={}){if(!this.http)throw new S("SEI_RESPOSTA_INESPERADA","Formul\xE1rio sem transporte HTTP.");if(!this.action)throw new S("SEI_VERSAO_NAO_SUPORTADA",`O formul\xE1rio ${this.id} n\xE3o tem action.`);let t=this.pares();e.botao&&t.push(this.botaoDeEnvio(e.botao));let r=await this.http.enviar(this.action,t,e);if(e.sucesso&&!e.sucesso(r))throw new S("SEI_RESPOSTA_INESPERADA",`O SEI n\xE3o confirmou ${e.operacao??"a opera\xE7\xE3o"}.`,`${H(r.doc.querySelector("title"))} \u2014 ${r.url.replace(/infra_hash=\w+/,"infra_hash=\u2026")}`);return r}botaoDeEnvio(e){let t=this.elemento.querySelector(`[name="${e}"]`)??Ke([...this.elemento.querySelectorAll('button[type="submit"][name^="sbm"], input[type="submit"][name^="sbm"]')]);return t?[t.getAttribute("name")??e,t.getAttribute("value")??H(t)??e]:[e,e]}hiddenDaLupa(e){let t=mt(this.pagina.html).find(([r])=>r===e);return t?t[1]:null}sincronizarLupas(){for(let[e,t]of mt(this.pagina.html)){let r=this.elemento.querySelector(`select#${ft(e)}`);if(!r)continue;let a=[...r.querySelectorAll("option")].map(n=>({id:n.getAttribute("value")??"",texto:H(n)}));(this.valor(t)??"")||this.definir({[t]:ut(a)}),this.campos=this.campos.filter(n=>n.nome!==e&&n.nome!==`${e}[]`)}}};function Tn(o){let e=[];for(let t of o.querySelectorAll("input, select, textarea")){let r=t.getAttribute("name");if(!r||t.hasAttribute("disabled"))continue;let a=t.tagName.toLowerCase();if(a==="input"){let n=(t.getAttribute("type")??"text").toLowerCase();if(["submit","button","image","reset","file"].includes(n)||(n==="checkbox"||n==="radio")&&!t.hasAttribute("checked"))continue;e.push({nome:r,valor:t.getAttribute("value")??(n==="checkbox"||n==="radio"?"on":"")})}else if(a==="textarea")e.push({nome:r,valor:t.textContent??""});else{let n=[...t.querySelectorAll("option")],s=n.filter(l=>l.hasAttribute("selected")),i=t.hasAttribute("multiple"),c=s.length?s:!i&&n.length?[n[0]]:[];for(let l of c)e.push({nome:r,valor:l.getAttribute("value")??H(l)})}}return e}function J(o){return o.normalize("NFD").replace(/[\u0300-\u036F]/g,"").toLowerCase().replace(/\s+/g," ").trim()}function Je(o,e,t){let r=J(e),a=o.find(n=>n.id===e)??o.find(n=>J(n.texto)===r)??Ke(o.filter(n=>J(n.texto).includes(r)));if(!a)throw new S("ARGUMENTO_INVALIDO",`${t} "${e}" n\xE3o encontrado(a) ou amb\xEDguo(a).`,o.slice(0,40).map(n=>n.texto).join(" | "));return a}function Ke(o){return o.length===1?o[0]:void 0}function ft(o){return o.replace(/([^\w-])/g,"\\$1")}async function Nn(o,e,t){let r=vo(e,"documento_escolher_tipo");if(!r)throw new S("SEI_ACAO_INDISPONIVEL",`N\xE3o \xE9 poss\xEDvel incluir documento no processo ${e.protocolo} (fechado na unidade?).`);let a=await F.abrir(o.http,r,"#frmDocumentoEscolherTipo",{sinal:t});if(a.tem("hdnFiltroSerie")&&a.valor("hdnFiltroSerie")!=="T"){let n=await a.definir({hdnFiltroSerie:"T"}).enviar({sinal:t});a=F.de(n,"#frmDocumentoEscolherTipo",o.http)}return a}function _n(o){let e=new Map;for(let t of o.doc.querySelectorAll("[onclick*='escolher(']")){let r=/escolher\((-?\d+)\)/.exec(t.getAttribute("onclick")??"")?.[1];r&&!e.has(r)&&e.set(r,H(t))}for(let t of o.doc.querySelectorAll("a[href*='id_serie=']")){let r=K(t.getAttribute("href")??"").get("id_serie");r&&!e.has(r)&&e.set(r,H(t))}return[...e].filter(([,t])=>t).map(([t,r])=>({id:t,nome:r}))}async function ht(o,e,t){let r=await o.arvore(e,{sinal:t});return _n((await Nn(o,r,t)).pagina)}var vt={tipos_processo:{acao:"procedimento_alterar",form:"#frmProcedimentoCadastro",campo:"selTipoProcedimento"},hipoteses_legais:{acao:"procedimento_alterar",form:"#frmProcedimentoCadastro",campo:"selHipoteseLegal"},usuarios:{acao:"procedimento_atribuicao_cadastrar",form:"#frmAtividadeAtribuir",campo:"selAtribuicao"},marcadores:{acao:"andamento_marcador_gerenciar",form:"#frmAndamentoMarcadorCadastro",campo:"selMarcador"},grupos_acompanhamento:{acao:"acompanhamento_gerenciar",form:"#frmAcompanhamentoCadastro",campo:"selGrupoAcompanhamento"}};async function bt(o,e,t,r={}){let a;if(e==="tipos_documento")a=(await ht(o,t,r.sinal)).map(s=>({id:s.id,nome:s.nome}));else{let s=vt[e];if(!s)throw new S("ARGUMENTO_INVALIDO",`Lista desconhecida: ${e}.`,Object.keys(vt).concat("tipos_documento").join(" | "));let i=await o.arvore(t,{sinal:r.sinal}),c=vo(i,s.acao);if(!c)throw new S("SEI_ACAO_INDISPONIVEL",`Para listar ${e} use um processo aberto na sua unidade.`);if(e==="marcadores"&&(c=to((await o.http.obter(c,{sinal:r.sinal,aceitarValidacao:!0})).html,"andamento_marcador_cadastrar"),!c))throw new S("SEI_VERSAO_NAO_SUPORTADA","Tela de marcadores n\xE3o reconhecida.");let l=await F.abrir(o.http,c,s.form,{sinal:r.sinal,aceitarValidacao:!0});a=e==="hipoteses_legais"?(await Go(o,l,"1",r.sinal)).map(d=>({id:d.id,nome:d.texto})):l.opcoes(s.campo).filter(d=>d.valor&&d.valor!=="null"&&d.texto).map(d=>({id:d.valor,nome:d.texto}))}let n=r.filtro?J(r.filtro):"";return n?a.filter(s=>J(s.nome).includes(n)):a}function xt(o,e){let t=o.valor(e);return o.opcoes(e).find(r=>r.valor===t&&t!=="null")?.texto??""}async function qn(o,e,t){let r=vo(e,"procedimento_alterar"),a=r??vo(e,"procedimento_consultar");if(!a)throw new S("SEI_ACAO_INDISPONIVEL",`O SEI n\xE3o oferece a consulta do processo ${e.protocolo} para voc\xEA.`);return{form:await F.abrir(o,a,"#frmProcedimentoCadastro",t),editavel:!!r}}function yt(o){return o.map(e=>e.texto).filter(Boolean)}async function At(o,e,t,r){let a=await o.arvore(e,{sinal:r.sinal});if(a.nivel==="sigiloso")throw new S("SEI_SIGILOSO","Processo sigiloso: o agente n\xE3o atua nele.");let{form:n,editavel:s}=await qn(o.http,a,{sinal:r.sinal});if(!s)throw new S("SEI_ACAO_INDISPONIVEL",`O processo ${a.protocolo} n\xE3o est\xE1 aberto na sua unidade.`);let i=[];if(t.especificacao!==void 0&&(i.push(...ao("Especifica\xE7\xE3o",n.valor("txtDescricao"),t.especificacao)),n.definir({txtDescricao:t.especificacao.slice(0,100)})),t.tipo!==void 0){let l=xt(n,"selTipoProcedimento"),d=n.escolher("selTipoProcedimento",t.tipo);n.definir({hdnIdTipoProcedimento:d.valor}),i.push(...ao("Tipo",l,d.texto))}if(t.nivel!==void 0){let l=le[n.valor("rdoNivelAcesso")??""]??"";n.definir({rdoNivelAcesso:jo[t.nivel]}),i.push(...ao("N\xEDvel de acesso",l,le[jo[t.nivel]])),t.nivel==="publico"&&n.definir({selHipoteseLegal:"null"})}if(t.hipotese!==void 0){let l=xt(n,"selHipoteseLegal"),d=n.valor("rdoNivelAcesso")||jo.restrito,g=Je(await Go(o,n,d,r.sinal),t.hipotese,"Hip\xF3tese legal");n.definir({selHipoteseLegal:g.id}),i.push(...ao("Hip\xF3tese legal",l,g.texto))}if(n.valor("rdoNivelAcesso")==="1"&&(n.valor("selHipoteseLegal")??"null")==="null")throw new S("ARGUMENTO_INVALIDO","Processo restrito exige hip\xF3tese legal. Informe a hip\xF3tese.");t.observacoes!==void 0&&(i.push(...ao("Observa\xE7\xF5es da unidade",n.valor("txaObservacoes"),t.observacoes)),n.definir({txaObservacoes:t.observacoes})),t.interessados!==void 0&&(i.push(...ao("Interessados",yt(n.itensLupa("selInteressadosProcedimento")).join("; "),yt(t.interessados).join("; "))),n.definirLupa("selInteressadosProcedimento",t.interessados));let c={alvo:a.protocolo,mudancas:i,aplicado:!1,resumo:""};return i.length?r.aplicar?(n.definir({hdnFlagProcedimentoCadastro:"2"}),await n.enviar({sinal:r.sinal,operacao:`a altera\xE7\xE3o do processo ${a.protocolo}`,sucesso:l=>K(l.url).get("acao")!=="procedimento_alterar"}),o.invalidar(a.idProcedimento),{...c,aplicado:!0,resumo:`Processo ${a.protocolo} alterado.`}):{...c,resumo:`${i.length} campo(s) a alterar.`}:{...c,resumo:"Nada a alterar: os valores j\xE1 s\xE3o esses."}}async function St(o,e,t){let r=await o.arvore(e,{sinal:t});if(r.nivel==="sigiloso")throw new S("SEI_SIGILOSO","Processo sigiloso: o agente n\xE3o atua nele.");return r}function wt(o,e,t){let r=vo(o,e);if(!r)throw new S("SEI_ACAO_INDISPONIVEL",`"${t}" n\xE3o est\xE1 dispon\xEDvel no processo ${o.protocolo} (processo fechado na unidade ou sem permiss\xE3o).`);return r}var Pt=o=>e=>K(e.url).get("acao")!==o;async function Vn(o,e,t,r){let a=await o.http.obter(wt(e,t.acao,t.nomeAcao),{sinal:r,aceitarValidacao:!0});if(a.doc.querySelector(t.form))return F.de(a,t.form,o.http);let n=(t.formularios??[]).map(s=>to(a.html,s)).find(Boolean);if(!n)throw new S("SEI_VERSAO_NAO_SUPORTADA",`A tela "${t.nomeAcao}" n\xE3o tem o formul\xE1rio esperado.`);return F.abrir(o.http,n,t.form,{sinal:r,aceitarValidacao:!0})}async function Mt(o,e,t,r){let a=await St(o,e,r.sinal),n=await Vn(o,a,t,r.sinal),s=t.preparar(n),i={alvo:a.protocolo,mudancas:s,aplicado:!1,resumo:""};return s.length?r.aplicar?(await n.enviar({sinal:r.sinal,botao:t.botao,operacao:`${t.nomeAcao} em ${a.protocolo}`,sucesso:t.sucesso??Pt(t.acao)}),o.invalidar(a.idProcedimento),{...i,aplicado:!0,resumo:t.resumo(a.protocolo).replace(/^Vai /,"")}):{...i,resumo:t.resumo(a.protocolo)}:{...i,resumo:"Nada a alterar: j\xE1 est\xE1 assim."}}function kt(o,e,t,r){return Mt(o,e,{acao:"anotacao_registrar",nomeAcao:"Anota\xE7\xF5es",form:"#frmAnotacaoCadastro",botao:"sbmRegistrarAnotacao",preparar:a=>{let n=t.texto.slice(0,500),s=ao("Anota\xE7\xE3o",a.valor("txaDescricao"),n),i=a.valor("chkSinPrioridade")?"sim":"n\xE3o",c=n?t.prioridade===void 0?i:t.prioridade?"sim":"n\xE3o":"n\xE3o";return a.definir({txaDescricao:n,chkSinPrioridade:c==="sim"?"on":null}),[...s,...ao("Prioridade",i,c)]},resumo:a=>t.texto?`Anota\xE7\xE3o definida em ${a}.`:`Anota\xE7\xE3o removida de ${a}.`},r)}function Ct(o,e,t,r){return Mt(o,e,{acao:"procedimento_atribuicao_cadastrar",nomeAcao:"Atribuir Processo",form:"#frmAtividadeAtribuir",botao:"sbmSalvar",preparar:a=>{let n=a.opcoes("selAtribuicao").find(l=>l.valor===a.valor("selAtribuicao")&&l.valor!=="null")?.texto??"";if(t===null)return a.definir({selAtribuicao:"null"}),[{campo:"Atribui\xE7\xE3o",antes:n||"(atribui\xE7\xE3o atual)",depois:"(nenhuma)"}];let s=J(t),i=a.opcoes("selAtribuicao").filter(l=>l.valor!=="null"),c=i.find(l=>l.valor===t)??i.find(l=>J(l.texto.split(" - ")[0])===s)??i.find(l=>J(l.texto.split(" - ").slice(1).join(" - "))===s)??(i.filter(l=>J(l.texto).includes(s)).length===1?i.find(l=>J(l.texto).includes(s)):void 0);if(!c)throw new S("ARGUMENTO_INVALIDO",`Usu\xE1rio "${t}" n\xE3o encontrado (ou amb\xEDguo) na unidade.`,i.map(l=>l.texto).join(" | "));return a.definir({selAtribuicao:c.valor}),ao("Atribui\xE7\xE3o",n,c.texto)},resumo:a=>t?`Processo ${a} atribu\xEDdo.`:`Atribui\xE7\xE3o removida de ${a}.`},r)}async function Hn(o,e,t){let r=wt(e,"andamento_marcador_gerenciar","Gerenciar Marcador");return o.http.obter(r,{sinal:t,aceitarValidacao:!0})}function Et(o){return[...o.doc.querySelectorAll("#tblMarcadores tr")].filter(t=>t.querySelector("input[type=checkbox]")).map(t=>{let r=[...t.querySelectorAll("td")];return{id:t.querySelector("input[type=checkbox]")?.getAttribute("value")??"",marcador:H(r[1]),texto:H(r[2]),usuario:H(r[3]),data:H(r[4])}})}async function Ot(o,e,t,r){let a=await St(o,e,r.sinal),n=await Hn(o,a,r.sinal),s=Et(n),i=J(t.marcador),c=s.find(m=>J(m.marcador)===i),l={alvo:a.protocolo,mudancas:[],aplicado:!1,resumo:""};if(t.remover){if(!c)return{...l,resumo:`O processo ${a.protocolo} n\xE3o tem o marcador "${t.marcador}".`};if(l.mudancas=[{campo:"Marcador",antes:`${c.marcador}${c.texto?`: ${c.texto}`:""}`,depois:""}],!r.aplicar)return{...l,resumo:`Vai remover o marcador "${c.marcador}" de ${a.protocolo}.`};let m=to(n.html,"andamento_marcador_remover");if(!m)throw new S("SEI_ACAO_INDISPONIVEL","A tela de marcadores n\xE3o oferece remo\xE7\xE3o.");let y=F.de(n,"#frmGerenciarMarcador",o.http);y.definir({hdnInfraItemId:c.id,hdnInfraItensSelecionados:c.id});let b=await o.http.enviar(m,y.pares(),{sinal:r.sinal,aceitarValidacao:!0});if(Et(b).some(E=>E.id===c.id))throw new S("SEI_RESPOSTA_INESPERADA",`O SEI n\xE3o removeu o marcador "${c.marcador}".`);return o.invalidar(a.idProcedimento),{...l,aplicado:!0,resumo:`Marcador "${c.marcador}" removido de ${a.protocolo}.`}}let d;if(n.doc.querySelector("#frmAndamentoMarcadorCadastro"))d=F.de(n,"#frmAndamentoMarcadorCadastro",o.http);else{let m=to(n.html,"andamento_marcador_cadastrar");if(!m)throw new S("SEI_VERSAO_NAO_SUPORTADA","Esta vers\xE3o do SEI n\xE3o tem a tela de marcadores esperada (4.1 ou superior).");d=await F.abrir(o.http,m,"#frmAndamentoMarcadorCadastro",{sinal:r.sinal})}let g=d.escolher("selMarcador",t.marcador);return d.definir({hdnIdMarcador:g.valor,txaTexto:(t.texto??c?.texto??"").slice(0,250)}),l.mudancas=c?ao(`Texto do marcador ${g.texto}`,c.texto,t.texto):[{campo:"Marcador",antes:"",depois:`${g.texto}${t.texto?`: ${t.texto}`:""}`}],l.mudancas.length?r.aplicar?(await d.enviar({sinal:r.sinal,botao:"sbmSalvar",operacao:`o marcador em ${a.protocolo}`,sucesso:Pt("andamento_marcador_cadastrar")}),o.invalidar(a.idProcedimento),{...l,aplicado:!0,resumo:`Marcador "${g.texto}" aplicado em ${a.protocolo}.`}):{...l,resumo:`Vai marcar ${a.protocolo} com "${g.texto}".`}:{...l,resumo:"Nada a alterar: o marcador j\xE1 est\xE1 assim."}}var Fn={"\u2010":"-","\u2011":"-","\u2012":"-","\u2013":"-","\u2014":"-","\u2015":"-","\u2212":"-","\u2018":"'","\u2019":"'","\u201A":"'","\u201B":"'","\u2032":"'","\u201C":'"',"\u201D":'"',"\u201E":'"',"\u201F":'"',"\u2033":'"',"\u2026":"...","\u2022":"-","\u2002":" ","\u2003":" ","\u2009":" ","\u202F":" ","\u205F":" ","\u200B":"","\u200C":"","\u200D":"","\u2060":"","\uFEFF":"","\u20AC":"EUR","\u2122":"(TM)","\u2192":"->","\u2190":"<-"};function Lt(o,e="texto"){let t="";for(let r of o){let a=r.codePointAt(0);if(a<=255){t+=r;continue}let n=Fn[r];if(e==="html"){t+=n===""?"":`&#${a};`;continue}if(n!==void 0){t+=n;continue}let s=r.normalize("NFKD").replace(/[\u0300-\u036F]/g,"");t+=[...s].every(i=>i.codePointAt(0)<=255)?s:""}return t}var jn=/[A-Za-z0-9\-_.*]/;function Dt(o){let e="";for(let t of o)t===" "?e+="+":jn.test(t)?e+=t:e+="%"+t.charCodeAt(0).toString(16).toUpperCase().padStart(2,"0");return e}function It(o,e={}){return o.map(([t,r])=>{let a=e[t]??"texto";return`${Dt(Lt(t))}=${Dt(Lt(r??"",a))}`}).join("&")}function We(o){let e=o instanceof Uint8Array?o:new Uint8Array(o),t=[],r=16384;for(let a=0;a<e.length;a+=r){let n=e.subarray(a,a+r),s=new Array(n.length);for(let i=0;i<n.length;i+=1)s[i]=st[n[i]]??n[i];t.push(String.fromCharCode(...s))}return t.join("")}var $t="application/x-www-form-urlencoded; charset=ISO-8859-1";function zt(o,e,t){let r=null;return{url:o,status:e,html:t,get doc(){return r??=ie(t)}}}function Rt(o,e={}){if(/\/login\.php/i.test(o.url)||/[?&]acao=(?:infra_)?sair\b/.test(o.url))throw new S("SEI_SESSAO_EXPIRADA","A sess\xE3o do SEI foi encerrada. Fa\xE7a login de novo no SEI e repita o pedido.");if(o.status>=500)throw new S("SEI_EXCECAO",`O SEI respondeu com erro ${o.status}.`);if(o.html.includes('id="divInfraExcecao"')){let t=o.doc.querySelector("#divInfraExcecao");if(t){let r=H(t);throw new S("SEI_EXCECAO",r||"O SEI exibiu uma p\xE1gina de erro.",r)}}if(!e.aceitarValidacao&&o.html.includes("txaInfraValidacao")){let t=o.doc.querySelector("#txaInfraValidacao")?.textContent?.trim()??"";if(t)throw new S("SEI_VALIDACAO",t,t)}return o}function Tt(o,e={}){let t=new URL(".",o),r=e.fetch??((...g)=>fetch(...g)),a=Math.max(1,e.concorrencia??3),n=0,s=[];async function i(g){n>=a&&await new Promise(m=>s.push(m)),n+=1;try{return await g()}finally{n-=1,s.shift()?.()}}let c=g=>new URL(g.replace(/&amp;/g,"&"),t).href;async function l(g,m,y){return i(async()=>{try{let b=await r(c(g),{credentials:"same-origin",redirect:"follow",...m,signal:y.sinal}),E=We(await b.arrayBuffer());return Rt(zt(b.url||c(g),b.status,E),y)}catch(b){throw Be(b)}})}async function d(g,m={}){return i(async()=>{try{let y=await r(c(g),{credentials:"same-origin",redirect:"follow",signal:m.sinal}),b=new Uint8Array(await y.arrayBuffer()),E=(y.headers?.get("content-type")??"").split(";")[0].trim().toLowerCase();E==="text/html"&&Rt(zt(y.url||c(g),y.status,We(b)),m);let q=y.headers?.get("content-disposition")??"",A=decodeURIComponent(/filename\*=UTF-8''([^;]+)/i.exec(q)?.[1]??/filename="?([^";]+)"?/i.exec(q)?.[1]??"");return{bytes:b,tipo:E,nome:A}}catch(y){throw Be(y)}})}return{base:t,absoluta:c,baixar:d,obter:(g,m={})=>l(g,{method:"GET"},m),enviar:(g,m,y={})=>l(g,{method:"POST",headers:{"Content-Type":$t},body:It(m,y.modos)},y)}}function Gn(o){let e=/Sistema Eletr(?:\u00F4|&ocirc;|\\u00F4)nico de Informa[^"]*?Vers(?:\u00E3|&atilde;)o\s*([\d.]+)/i.exec(o);return e?e[1]:/\.(?:js|svg|css)\?(\d+\.\d+\.\d+)-/.exec(o)?.[1]??""}function Un(o){let e=o.doc.querySelector("#lnkInfraUnidade")?.getAttribute("onclick")??"",t=/infra_unidade_atual=(\d+)/.exec(e)?.[1];if(t)return t;let r=/[?&]infra_unidade_atual=(\d+)/.exec(o.url)?.[1];return r||(o.doc.querySelector("#selInfraUnidades option[selected]")?.getAttribute("value")??"")}function Ze(o){let e=o.doc,t=e.querySelector("#lnkInfraUnidade"),r=e.querySelector("#lnkUsuarioSistema")?.getAttribute("title")??"",[,a="",n="",s=""]=/^(.*?)\s*\(([^/)]+)(?:\/([^)]+))?/.exec(r)??[],i=Gn(o.html);return{host:new URL(o.url).host,versao:i,maior:Number(i.split(".")[0])||0,unidade:{id:Un(o),sigla:H(t)||H(e.querySelector("#selInfraUnidades option[selected]")),nome:t?.getAttribute("title")??""},usuario:{nome:a.trim(),login:n.trim(),orgao:s.trim()}}}var Bn=3e4,pe=class{constructor(e,t=null,r){this.paginaViva=t;this.http=Tt(e,r)}http;paginaBase=null;arvores=new Map;localizados=new Map;base(){let e=this.paginaViva?.();if(e&&e.html.includes("frmProtocoloPesquisaRapida"))return e;if(this.paginaBase)return this.paginaBase;if(e)return e;throw new S("SEI_NAO_ENCONTRADO","Abra uma tela do SEI (por exemplo, Controle de Processos) nesta aba.")}contexto(){return Ze(this.base())}linkMenu(e){return ct(this.base(),e)}async renovarBase(e){return this.paginaBase=await this.http.obter(this.linkMenu("procedimento_controlar"),e),this.arvores.clear(),this.localizados.clear(),this.paginaBase}async localizar(e,t){let r=e.trim();if(!r)throw new S("ARGUMENTO_INVALIDO","Informe o n\xFAmero do processo ou o n\xBA SEI do documento.");let a=this.localizados.get(r);if(a)return a;let n=F.de(this.base(),"#frmProtocoloPesquisaRapida",this.http);n.definir({txtPesquisaRapida:r});let s=await n.enviar(t),i=K(s.url);if(i.get("acao")!=="procedimento_trabalhar")throw new S("SEI_NAO_ENCONTRADO",`Nada encontrado no SEI para "${r}", ou voc\xEA n\xE3o tem acesso a ele.`);let c=s.doc.querySelector("#ifrArvore")?.getAttribute("src");if(!c)throw new S("SEI_VERSAO_NAO_SUPORTADA","A tela do processo n\xE3o trouxe a \xE1rvore.");let d=K(U(c)).get("id_procedimento")??"",g=i.get("id_protocolo")??"",m={idProcedimento:d,idDocumento:g&&g!==d?g:void 0,linkArvore:U(c)};return this.localizados.set(r,m),m}async arvore(e,t={}){let r=await this.localizar(e,t),a=this.arvores.get(r.idProcedimento);if(a&&!t.forcar&&Date.now()-a.quando<Bn)return a.arvore;let n=await dt(this.http,r.linkArvore,t);return this.arvores.set(r.idProcedimento,{quando:Date.now(),arvore:n}),n}invalidar(e){e?this.arvores.delete(e):this.arvores.clear()}async ajax(e,t,r){let a=await this.http.enviar(e,t,{...r,aceitarValidacao:!0}),n=[];for(let s of a.html.matchAll(/<option[^>]*value="([^"]*)"[^>]*>([^<]*)<\/option>/g))n.push({id:U(s[1]),texto:U(s[2]).trim()});for(let s of a.html.matchAll(/<item\s+([^>]*)>/g)){let i=ie(`<i ${s[1]}></i>`).querySelector("i");n.push({id:i?.getAttribute("id")??"",texto:i?.getAttribute("descricao")??i?.getAttribute("complemento")??""})}return n.filter(s=>s.id&&s.id!=="null")}};function Uo(o,e=o.location?.href??"https://sei.invalido/sei/controlador.php"){return{url:e,status:200,get html(){return o.documentElement.outerHTML},doc:o}}var Qn='a[onclick*="acaoControleProcessos"]';function Nt(o){let e=new Set,t=[];for(let r of o.querySelectorAll(Qn)){let a=/[?&]acao=([a-z0-9_]+)/.exec(r.getAttribute("onclick")??"")?.[1],n=r.querySelector("img");if(!a||!n||e.has(a))continue;e.add(a);let s=n.getAttribute("title")||n.getAttribute("alt")||a,i=n.getAttribute("src")??"";try{i=new URL(i,o.baseURI||o.location?.href).href}catch{}t.push({acao:a,rotulo:s,icone:i,elemento:r})}return t}var de="data-tip";var Xn=`
:host { all: initial; }
.dica { position: fixed; z-index: 2147483647; max-width: 320px; padding: 6px 10px; font: 12px/1.45 system-ui, -apple-system, "Segoe UI", Roboto, sans-serif; color: #fff; white-space: pre-line; pointer-events: none; background: #1b1f24; border-radius: 8px; box-shadow: 0 6px 18px rgb(0 0 0 / 28%); opacity: 0; transform: translateY(2px); transition: opacity 120ms ease, transform 120ms ease; }
.dica.claro { color: #1b1f24; background: #fff; box-shadow: 0 6px 18px rgb(0 0 0 / 22%), 0 0 0 1px rgb(0 0 0 / 10%); }
.dica.on { opacity: 1; transform: none; }
.dica[hidden] { display: none; }
@media (prefers-reduced-motion: reduce) { .dica { transition: none; } }
`,Vt=o=>o.nodeType===1,Kn=o=>o.some(e=>Vt(e)&&(e.id==="spro-grade"||e.classList.contains("spro-grade-botao")));function _t(o){if(!Kn(o))return null;for(let e of o)if(Vt(e)){if(e.id==="spro-grade")return null;if(e.hasAttribute(de)||e.hasAttribute("title"))return e}return null}function qt(o){let e=o.getAttribute("title");return e&&(o.hasAttribute(de)||o.setAttribute(de,e),!o.hasAttribute("aria-label")&&!(o.textContent??"").trim()&&o.setAttribute("aria-label",e.split(`
`)[0]),o.removeAttribute("title")),o.getAttribute(de)??""}function Jn(o,e,t){let a=o.bottom+8,n=!1;a+e.altura>t.h-4&&o.top-8-e.altura>=4&&(a=o.top-8-e.altura,n=!0);let s=o.left+o.width/2-e.largura/2;return s=Math.max(4,Math.min(s,t.w-e.largura-4)),{x:Math.round(s),y:Math.round(Math.max(4,a)),acima:n}}function Ht(o,e=()=>!1){let t=o.defaultView;if(!t)return()=>{};let r=o.createElement("div");r.id="spro-dica-host";let a=r.attachShadow({mode:"open"}),n=o.createElement("style");n.textContent=Xn;let s=o.createElement("div");s.className="dica",s.setAttribute("role","tooltip"),s.hidden=!0,a.append(n,s),o.documentElement.append(r);let i=null,c;function l(){clearTimeout(c),i=null,s.classList.remove("on"),s.hidden=!0}function d(){if(!i||!i.isConnected)return l();let b=qt(i);if(!b)return l();s.textContent=b,s.classList.toggle("claro",!e()),s.hidden=!1;let E=i.getBoundingClientRect(),q=s.getBoundingClientRect(),A=Jn(E,{largura:q.width,altura:q.height},{w:t.innerWidth,h:t.innerHeight});s.style.left=`${A.x}px`,s.style.top=`${A.y}px`,s.classList.add("on")}let g=b=>{let E=_t(b.composedPath());E!==i&&(l(),E&&(qt(E),i=E,c=setTimeout(d,350)))},m=b=>{if(!i)return;let E=b.relatedTarget;E&&i.contains(E)||l()},y=b=>{let E=_t(b.composedPath());!E||!E.matches?.(":focus-visible")||(l(),i=E,d())};return o.addEventListener("pointerover",g,!0),o.addEventListener("pointerout",m,!0),o.addEventListener("focusin",y,!0),o.addEventListener("focusout",l,!0),o.addEventListener("pointerdown",l,!0),o.addEventListener("keydown",l,!0),o.addEventListener("scroll",l,!0),()=>{l(),o.removeEventListener("pointerover",g,!0),o.removeEventListener("pointerout",m,!0),o.removeEventListener("focusin",y,!0),o.removeEventListener("focusout",l,!0),o.removeEventListener("pointerdown",l,!0),o.removeEventListener("keydown",l,!0),o.removeEventListener("scroll",l,!0),r.remove()}}var Y="data-spro-grade",bo="data-spro-grade-pronta",Bo="data-spro-grade-escuro",Ye="spro_grade",or="spro-grade-pre";var Wn="#tblProcessosRecebidos, #tblProcessosGerados, #tblProcessosDetalhado";function Zn(){let o=Wn.split(", ").map(r=>`html[${Y}] ${r}`).join(`,
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
html[${Y}][${Bo}]:not([${bo}]) #divTabelaProcesso::before,
html[${Y}][${Bo}]:not([${bo}]) #frmProcedimentoControlar:not(:has(#divTabelaProcesso))::before { --spro-sk: #2c333b; --spro-sk-2: #232a31; }
@keyframes spro-grade-pulso { 0%, 100% { opacity: 1; } 50% { opacity: 0.55; } }
@media (prefers-reduced-motion: reduce) {
  html[${Y}]:not([${bo}]) #divTabelaProcesso::before,
  html[${Y}]:not([${bo}]) #frmProcedimentoControlar:not(:has(#divTabelaProcesso))::before { animation: none; }
}`}function Ft(o){try{return o.getItem(Ye)==="1"}catch{return!1}}function jt(o,e){try{e?o.setItem(Ye,"1"):o.removeItem(Ye)}catch{}}function ue(o,e){let t=o.documentElement;if(t.setAttribute(Y,"1"),t.removeAttribute(bo),e?t.setAttribute(Bo,"1"):t.removeAttribute(Bo),!o.getElementById(or)){let r=o.createElement("style");r.id=or,r.textContent=Zn(),(o.head??t).append(r)}}function me(o){let e=o.documentElement;e.removeAttribute(Y),e.removeAttribute(bo),e.removeAttribute(Bo),o.getElementById(or)?.remove()}var Co=o=>o.documentElement.hasAttribute(Y);function er(o){o.documentElement.setAttribute(bo,"1")}function rr(o,e={setTimeout:(t,r)=>setTimeout(t,r),clearTimeout:t=>clearTimeout(t)}){let t=!1,r,a=s=>{t||(t=!0,e.clearTimeout(n),e.clearTimeout(r),o(s))},n=e.setTimeout(()=>a("teto"),1e4);return{iniciarContagem(){t||(r=e.setTimeout(()=>a("prazo"),1500))},pronta(){t=!0,e.clearTimeout(n),e.clearTimeout(r)},falhou:s=>a(s),encerrada:()=>t}}var Gt="http://www.w3.org/2000/svg",Yn={grade:[["rect",{x:"3.5",y:"4.5",width:"17",height:"15",rx:"2"}],["path",{d:"M3.5 9.5h17M9 9.5v10M3.5 14.5h17"}]],quadro:[["rect",{x:"3.5",y:"4.5",width:"4.6",height:"15",rx:"1.2"}],["rect",{x:"9.7",y:"4.5",width:"4.6",height:"9",rx:"1.2"}],["rect",{x:"15.9",y:"4.5",width:"4.6",height:"12",rx:"1.2"}]],lista:[["path",{d:"M8 6.5h12M8 12h12M8 17.5h12M4 6.5h.01M4 12h.01M4 17.5h.01"}]],agrupar:[["path",{d:"M4 6h16M4 12h10M4 18h13"}],["path",{d:"M18 10l3 2-3 2"}]],colunas:[["rect",{x:"3.5",y:"4.5",width:"17",height:"15",rx:"2"}],["path",{d:"M9.2 4.5v15M14.8 4.5v15"}]],disquete:[["path",{d:"M5 4.5h11l3.5 3.5v11a1.5 1.5 0 0 1-1.5 1.5H6.5A1.5 1.5 0 0 1 5 19z"}],["path",{d:"M8 4.5v5h7v-5M8 20v-6h8v6"}]],densidade:[["path",{d:"M4 6h16M4 10h16M4 14h16M4 18h16"}]],semPessoa:[["circle",{cx:"12",cy:"8.5",r:"3.6"}],["path",{d:"M5 20c.8-3.6 3.5-5.5 7-5.5s6.2 1.9 7 5.5M4 4l16 16"}]],olhoFechado:[["path",{d:"M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z"}],["circle",{cx:"12",cy:"12",r:"2.8"}],["path",{d:"M4 4l16 16"}]],seta:[["path",{d:"M6 9l6 6 6-6"}]],setaDireita:[["path",{d:"M9 6l6 6-6 6"}]],desfazer:[["path",{d:"M9 14L4 9l5-5M4 9h10a6 6 0 0 1 0 12h-3"}]],bloquear:[["circle",{cx:"12",cy:"12",r:"8.5"}],["path",{d:"M6 6l12 12"}]],informacao:[["circle",{cx:"12",cy:"12",r:"8.5"}],["path",{d:"M12 11v5M12 8h.01"}]]};function lo(o,e=16,t=document){let r=t.createElementNS(Gt,"svg"),a={viewBox:"0 0 24 24",width:String(e),height:String(e),fill:"none",stroke:"currentColor","stroke-width":"1.8","stroke-linecap":"round","stroke-linejoin":"round","aria-hidden":"true",focusable:"false",class:"spro-icone"};for(let[n,s]of Object.entries(a))r.setAttribute(n,s);for(let[n,s]of Yn[o]){let i=t.createElementNS(Gt,n);for(let[c,l]of Object.entries(s))i.setAttribute(c,l);r.append(i)}return r}var fe="spro-grade-botao",os="#processosSEIPro .titlePanelHome, #processosSEIPro #divInfraBarraLocalizacao, #divInfraBarraLocalizacao.titlePanelHome, #divInfraBarraLocalizacao",es="Usar a vis\xE3o nova do controle de processos",rs="Voltar \xE0 vis\xE3o nativa do SEI";function ts(o,e,t){let r=o.querySelector(os);if(!r)return!1;let a=e?rs:es,n=r.querySelector(`.${fe}`);if(!n){n=o.createElement("button"),n.type="button",n.className=fe,n.append(lo("grade",18,o));let s=r.querySelector(".spro-fav-recolher");s?s.before(n):r.append(n)}return n.setAttribute("data-tip",a),n.removeAttribute("title"),n.setAttribute("aria-label",a),n.setAttribute("aria-pressed",String(e)),!0}function Bt(o,e){let t=r=>{(r.composedPath?.()[0]??r.target)?.closest?.(`.${fe}`)&&(r.preventDefault(),r.stopPropagation(),e())};return o.addEventListener("click",t,!0),()=>o.removeEventListener("click",t,!0)}var Ut=o=>{for(let e of o.querySelectorAll(`.${fe}`))e.remove()};function ge(o,e,t){let r=()=>ts(o,e(),t);r();let a=o.defaultView?.MutationObserver;if(!a||!o.body)return()=>Ut(o);let n=!1,s=new a(()=>{n||(n=!0,queueMicrotask(()=>{n=!1,s.disconnect(),r(),s.observe(o.body,{childList:!0,subtree:!0})}))});return s.observe(o.body,{childList:!0,subtree:!0}),()=>{s.disconnect(),Ut(o)}}function Q(o){return o.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/\s+/g," ").trim()}var as=/<div(?: style="text-decoration: line-through;")?><i class="(far fa-square|fas fa-check-square)"><\/i> ?([\s\S]*?)<\/div>/g;function ns(o){return o.includes("<div")?o.replace(as,(e,t,r)=>`
${t==="far fa-square"?"[ ]":"[X]"} ${r}
`).replace(/\n{2,}/g,`
`).trim():o}var ss=/^Anota[\u00e7c][\u00e3a]o( com prioridade)?\s+\/\s+([\s\S]*)\s+\/\s+(.*)$/i;function Qt(o){let e=o.querySelector('a[href*="acao=anotacao_registrar"]');if(!e)return null;let t=e.querySelector("img")?.getAttribute("src")??"",r=/anotacao2\.|prioridade/i.test(t),a=ss.exec(e.getAttribute("aria-label")??"");if(a){let i=U(a[2]).replace(/\r\n?/g,`
`).trim();return i?{texto:i,autor:a[3].trim(),prioridade:!!a[1]||r}:null}let n=go(e.getAttribute("onmouseover")??"","infraTooltipMostrar")[0];if(typeof n?.[0]!="string")return null;let s=ns(D(n[0])).trim();return s?{texto:s,autor:D(n[1]).trim(),prioridade:r}:null}function Xt(o,e,t){if(e){let a={idProcedimento:o,origem:"nativo",vencimento:e.data,idControlePrazo:e.idControlePrazo,sigla:e.sigla,linkNativo:e.link,...e.concluidoEm?{concluidoEm:e.concluidoEm}:{}};return t?.vencimento&&t.data===e.data?{...a,origem:"ambos",hora:t.hora,texto:t.texto||void 0}:a}if(!t)return null;let r={idProcedimento:o,origem:"marcador",hora:t.hora,texto:t.texto||void 0};return t.vencimento?{...r,vencimento:t.data}:{...r,inicio:t.data}}var is='a[href*="acao=controle_prazo_definir"]',cs=/^Controle de Prazo\s*\/\s*(\S+)\s+(\d{2})\/(\d{2})\/(\d{4})\s*\(([^)]*)\)\s*$/s,Kt=(o,e,t)=>`${t}-${e}-${o}`;function ls(o){let e=o.trim().toLowerCase(),t=/^conclu[i\u00ED]do em (\d{2})\/(\d{2})\/(\d{4})$/.exec(e);return t?{estado:"concluido",concluidoEm:Kt(t[1],t[2],t[3])}:/^at[e\u00E9] hoje$/.test(e)?{estado:"hoje"}:/^atrasado \d+ dias?$/.test(e)?{estado:"atrasado"}:/^\d+ dias?$/.test(e)?{estado:"noPrazo"}:null}function tr(o){let e=o.querySelector(is);if(!e)return null;let t=e.getAttribute("aria-label")??"";if(!t){let l=go(e.getAttribute("onmouseover")??"","infraTooltipMostrar")[0];typeof l?.[0]=="string"&&(t=`Controle de Prazo / ${D(l[0])}`)}let r=cs.exec(U(t).replace(/\s+/g," ").trim());if(!r)return null;let a=ls(r[5]);if(!a)return null;let n=U(e.getAttribute("href")??""),s=K(n),i=s.get("id_controle_prazo")??"",c=s.get("id_procedimento")??o.id.replace(/^P/,"");return!i||!c?null:{idControlePrazo:i,idProcedimento:c,sigla:r[1],data:Kt(r[2],r[3],r[4]),link:n,...a}}var Jt=/(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(\d{4})/,Wt=/\b([01]?\d|2[0-3]):([0-5]\d)\b/,Zt=new RegExp("(?<!\\p{L})at[e\\u00E9](?!\\p{L})","iu");function ps(o,e,t){let r=`${t}-${e}-${o}`;try{return se(ne(r))===r?r:null}catch{return null}}var ds=o=>o.padStart(2,"0");function ar(o){let e=o.replace(/\r\n?/g,`
`),t=Jt.exec(e);if(!t)return null;let r=ps(t[1],t[2],t[3]);if(!r)return null;let a=Wt.exec(e),n=a?`${ds(a[1])}:${a[2]}`:void 0,s=Zt.test(e),i=e.replace(Zt,"").replace(Jt,"");return a&&(i=i.replace(Wt,"")),i=i.replace(/[ \t]+/g," ").replace(/^[ \t]*\n+|\n+[ \t]*$/g,"").trim(),{data:r,hora:n,vencimento:s,texto:i}}function Yt(o){let e=[];for(let t of o.querySelectorAll('a[href*="acao=andamento_marcador_gerenciar"]')){let r=go(t.getAttribute("onmouseover")??"","infraTooltipMostrar")[0];typeof r?.[0]=="string"&&e.push({texto:D(r[0]),nome:D(r[1])})}return e}function oa(o,e){let t=o.querySelector("input[type=checkbox]"),r=o.querySelector("a[href*='procedimento_trabalhar']");if(!t||!r)return null;let a=t.getAttribute("aria-label")??"",n=/^Sigiloso\b/.test(a)||/Sigiloso/.test(r.getAttribute("class")??""),s=[...o.querySelectorAll("td")],i=n?[]:[...s[1]?.querySelectorAll("a[aria-label]")??[]].map(c=>c.getAttribute("aria-label")??"");return{idProcedimento:t.getAttribute("value")??K(r.getAttribute("href")??"").get("id_procedimento")??"",protocolo:t.getAttribute("title")??H(r),grupo:e,tipo:/Tipo (.*?)(?: \/ Especifica|$)/.exec(a)?.[1]?.trim()??"",especificacao:n?"":/Especifica\S* (.*)$/.exec(a)?.[1]?.trim()??"",sigiloso:n,novo:/NaoVisualizado/.test(r.getAttribute("class")??""),atribuido:H(s[s.length-1]).replace(/^\(|\)$/g,""),sinais:i,documentoNovo:!!s[1]?.querySelector("img[src*='exclamacao']")||i.some(c=>/documento foi inclu/i.test(c))}}var us=/marcador_([a-z0-9_]+)\.svg/i;function ms(o){let e=[];for(let t of o.querySelectorAll('a[href*="acao=andamento_marcador_gerenciar"]')){let r=go(t.getAttribute("onmouseover")??"","infraTooltipMostrar")[0],a=/^Marcador\s*\/\s*(.*)$/s.exec(U(t.getAttribute("aria-label")??"").trim()),n=(typeof r?.[1]=="string"&&r[1]?D(r[1]):a?.[1]??"").trim();n&&e.push({nome:n,cor:us.exec(t.querySelector("img")?.getAttribute("src")??"")?.[1]??"",texto:typeof r?.[0]=="string"?D(r[0]).trim():""})}return e}function fs(o){let e=[];for(let t of o.querySelectorAll("a")){let r=t.querySelector("img")?.getAttribute("src")??"",a=/retorno_(programado|aguardando)(\d)?\.svg/.exec(r);if(!a)continue;let n=U(t.getAttribute("aria-label")??"").trim();e.push({tipo:a[1],descricao:n,atrasado:a[2]==="3"||/atrasad/i.test(n)})}return e}function gs(o){let e=o.querySelector('a[href*="acao=procedimento_atribuicao_listar"], a.ancoraSigla'),t=e?.textContent?.trim();if(!e||!t)return;let r=U(e.getAttribute("title")??"").replace(/^Atribu[i\u00ED]do para\s+/i,"").trim();return{sigla:t,nome:r||t}}function nr(o,e){let t=oa(o,e.grupo);if(!t?.idProcedimento)return null;let r=ms(o),a=null;for(let d of Yt(o)){let g=ar(d.texto);if(g){a=g;break}}let n={id:t.idProcedimento,protocolo:t.protocolo,grupo:e.grupo,tipo:t.tipo,especificacao:t.especificacao,sigiloso:t.sigiloso,naoVisualizado:t.novo,marcadores:t.sigiloso?[]:r,retornos:t.sigiloso?[]:fs(o),acompanhamentoEspecial:!t.sigiloso&&!!o.querySelector('a[href*="acao=acompanhamento"] , img[src*="acompanhamento_especial"], .acompanhamentoesp_icon'),documentoNovo:t.documentoNovo,pagina:e.pagina,naPaginaAtual:e.naPaginaAtual},s=o.querySelector('a[href*="acao=procedimento_trabalhar"]')?.getAttribute("onmouseover")??"";/\(URGENTE\)/.test(s)&&(n.urgente=!0),/\(TRANCADO\)/.test(s)&&(n.trancado=!0);let i=o.querySelector(".acompanhamentoesp_icon");if(i){let d=go(i.getAttribute("onmouseover")??"","infraTooltipMostrar")[0];typeof d?.[1]=="string"&&d[1]&&(n.acompanhamentoGrupo=D(d[1]))}let c=o.querySelector('a[href*="acao=procedimento_trabalhar"]')?.getAttribute("href");c&&(n.link=U(c));let l=gs(o);if(l&&(n.atribuicao=l),!t.sigiloso){let d=Qt(o);d&&(n.anotacao=d);let g=Xt(n.id,tr(o),a);g&&(n.prazo=g)}return n}var ra="#tblProcessosRecebidos, #tblProcessosGerados, #tblProcessosDetalhado",hs={recebidos:"tblProcessosRecebidos",gerados:"tblProcessosGerados"},vs=[[/^tipo( do processo)?$/,"tipo"],[/^especificacao$/,"especificacao"],[/^(atribuicao|atribuido( para)?|responsavel)$/,"atribuicao"],[/^marcador(es)?$/,"marcador"],[/^prioridade$/,"prioridade"],[/^interessados?$/,"interessados"],[/^observacao$/,"observacao"],[/^ultima mov/,"ultimaMov"]];function bs(o){let e=new Map;return[...(o.querySelector("thead tr")??[...o.querySelectorAll("tr")].find(r=>r.querySelector("th")))?.children??[]].forEach((r,a)=>{let n=Q(r.textContent??""),s=vs.find(([i])=>i.test(n));s&&e.set(a,s[1])}),e}function ea(o){let e=(o?.querySelector("caption")?.textContent??"").replace(/\s+/g," "),t=Number(/(\d+)\s+registro/.exec(e)?.[1]??0),r=/(\d+)\s+a\s+(\d+)\s*\)?/.exec(e);return{total:t,porPagina:r?Number(r[2])-Number(r[1])+1:0}}function xs(o,e,t){if(!t.size)return;let r=[...e.children];for(let[a,n]of t){let s=(r[a]?.textContent??"").replace(/\s+/g," ").trim();if(s)if(n==="tipo"&&!o.tipo)o.tipo=s;else if(n==="especificacao"&&!o.especificacao&&!o.sigiloso)o.especificacao=s;else if(n==="atribuicao"&&!o.atribuicao){let i=s.replace(/^\(|\)$/g,"");o.atribuicao={sigla:i,nome:i}}else if(n==="marcador"&&!o.marcadores.length&&!o.sigiloso)o.marcadores=[{nome:s,cor:"",texto:""}];else{if(o.sigiloso&&(n==="interessados"||n==="observacao"))continue;if(n==="prioridade")o.prioridade=s;else if(n==="interessados")o.interessados=s;else if(n==="observacao")o.observacao=s;else if(n==="ultimaMov"){let i=/(\d{2})\/(\d{2})\/(\d{4})/.exec(s);i&&(o.ultimaMov=`${i[3]}-${i[2]}-${i[1]}`)}}}}function ys(o){let e=o.querySelector("input[type=checkbox]")?.getAttribute("name")??"";return/^chkGerados/i.test(e)?"gerados":"recebidos"}function zo(o,e={}){let t=e.pagina??0,r=e.naPaginaAtual??!0,a=[],n={recebidos:0,gerados:0},s={recebidos:0,gerados:0},i=o.getElementById("tblProcessosDetalhado"),c=new Set,l=d=>{d&&!c.has(d.id)&&(c.add(d.id),a.push(d))};for(let d of["recebidos","gerados"]){let g=o.getElementById(hs[d]),{total:m,porPagina:y}=ea(g);n[d]=m,s[d]=y;for(let b of g?.querySelectorAll('tr[id^="P"]')??[])l(nr(b,{grupo:d,pagina:t,naPaginaAtual:r}))}if(i){let d=bs(i),{total:g,porPagina:m}=ea(i);for(let y of i.querySelectorAll("tr")){if(!y.querySelector('a[href*="procedimento_trabalhar"]'))continue;let b=ys(y),E=nr(y,{grupo:b,pagina:t,naPaginaAtual:r});E&&!c.has(E.id)&&(xs(E,y,d),l(E),n[b]=Math.max(n[b],g),s[b]=Math.max(s[b],m))}}return{processos:a,totais:n,porPagina:s,visao:i?"detalhada":"resumida"}}var As=60;async function ta(o,e,t={}){let r=t.maxPaginas??As,a=[],n=new Set(o.processos.map(l=>l.id)),s=!0,i,c=!1;try{for(let l of["recebidos","gerados"]){let d=o.totais[l],g=o.processos.filter(b=>b.grupo===l).length,m=o.porPagina[l]||g||1,y=Math.max(1,Math.ceil(d/m));for(let b=1;g<d;b+=1){if(t.sinal?.aborted)return s=!1,{processos:a,completo:s,...i?{erro:i}:{}};if(b>=r){s=!1;break}c=!0;let E=await e.pagina(l,b,t.sinal),A=zo(E,{pagina:b,naPaginaAtual:!1}).processos.filter(P=>P.grupo===l&&!n.has(P.id));if(!A.length)break;for(let P of A)n.add(P.id);g+=A.length,a.push(...A),t.aoPagina?.(A),t.aoProgresso?.({grupo:l,paginasLidas:b+1,paginasTotal:y,processos:g,total:d})}g<d&&(s=!1)}}catch(l){s=!1,i=l instanceof Error?l.message:String(l)}finally{if(c)try{await e.restaurar()}catch(l){i??=`N\xE3o foi poss\xEDvel voltar \xE0 primeira p\xE1gina: ${l instanceof Error?l.message:String(l)}`}}return{processos:a,completo:s,...i?{erro:i}:{}}}var Es=["hdnRecebidosItensSelecionados","hdnGeradosItensSelecionados","hdnRecebidosItemId","hdnGeradosItemId"];function sr(o,e){let t="#frmProcedimentoControlar",r=()=>({hdnRecebidosPaginaAtual:"0",hdnGeradosPaginaAtual:"0",...Object.fromEntries(Es.map(a=>[a,""]))});return{async pagina(a,n,s){let i=a==="recebidos"?"hdnRecebidosPaginaAtual":"hdnGeradosPaginaAtual";return(await F.de(e,t,o).definir({...r(),[i]:String(n)}).enviar({sinal:s,aceitarValidacao:!0})).doc},async restaurar(a){await F.de(e,t,o).definir(r()).enviar({sinal:a,aceitarValidacao:!0})},restaurarAoSair(){try{let a=F.de(e,t,o);fetch(o.absoluta(a.action),{method:"POST",keepalive:!0,credentials:"include",headers:{"content-type":"application/x-www-form-urlencoded"},body:new URLSearchParams(a.definir(r()).pares()).toString()}).catch(()=>{})}catch{}}}}var Ss=30*6e4,aa=5e3,ir=()=>({vistoEm:{}});function sa(o){if(!o||typeof o!="object")return ir();let e=o,t={};if(e.vistoEm&&typeof e.vistoEm=="object")for(let[i,c]of Object.entries(e.vistoEm))typeof c=="number"&&Number.isFinite(c)&&c>0&&(t[i]=c);let r=i=>typeof i=="number"&&Number.isFinite(i)?i:void 0,a={vistoEm:t},n=r(e.visitaAtual),s=r(e.visitaAnterior);return n!==void 0&&(a.visitaAtual=n),s!==void 0&&(a.visitaAnterior=s),a}function ia(o,e){return o.visitaAtual===void 0?{...o,visitaAtual:e}:e-o.visitaAtual>Ss?{...o,visitaAnterior:o.visitaAtual,visitaAtual:e}:o}function cr(o,e,t,r){let a={...o.vistoEm};for(let s of e)a[s]===void 0&&(a[s]=t);if(r){let s=new Set(e);for(let i of Object.keys(a))s.has(i)||delete a[i]}let n=Object.keys(a);if(n.length>aa)for(let s of n.sort((i,c)=>a[c]-a[i]).slice(aa))delete a[s];return{...o,vistoEm:a}}function ca(o,e){return o.map(t=>e.vistoEm[t.id]!==void 0?{...t,vistoEm:e.vistoEm[t.id]}:t)}function Ro(o){if(o===null)return"";if(o<1)return"hoje";if(o===1)return"1 dia";if(o<60)return`${o} dias`;let e=Math.floor(o/30);return e<24?`${e} meses`:`${Math.floor(o/365)} anos`}var la="Contado desde a primeira vez que o SEI Pro viu o processo nesta unidade (o SEI n\xE3o informa a data de chegada).";var To=["processo","especificacao","tipo","responsavel","marcadores","prazo","anotacao","caixa","parado","sinais"],Oo={processo:"Processo",tipo:"Tipo",especificacao:"Especifica\xE7\xE3o",responsavel:"Respons\xE1vel",marcadores:"Marcadores",prazo:"Prazo",anotacao:"Anota\xE7\xE3o",caixa:"Na caixa",parado:"Parado h\xE1",sinais:"Sinais"};var ws=30,Ps=40,Ms=()=>({colunas:"marcador",limite:0,raiasPorResponsavel:!1}),ks=["processo","especificacao","tipo","responsavel","marcadores","prazo","anotacao"],lr=2;function No(){return{id:"",nome:"Padr\xE3o",busca:"",ordem:[],agrupar:"nenhum",modo:"tabela",colv:lr,colunas:[...ks],densidade:"confortavel",quadro:Ms()}}var Cs=["nenhum","responsavel","tipo","marcador","prazo","situacao","grupo","anotacao","acompanhamento","retorno","caixa"],Os=["protocolo","tipo","responsavel","marcador","prazo","caixa","parado","novo"],Ls=["marcador","responsavel","prazo","tipo"];function he(o){let e=No();if(!o||typeof o!="object")return e;let t=o,r=Array.isArray(t.ordem)?t.ordem.filter(s=>!!s&&typeof s=="object"&&Os.includes(s.campo)).slice(0,4).map(s=>({campo:s.campo,decrescente:s.decrescente===!0})):[],a=Array.isArray(t.colunas)?[...new Set(t.colunas.filter(s=>To.includes(s)))]:[];if(a.includes("processo")&&t.colv!==lr&&!a.includes("especificacao")){let s=a.indexOf("processo");a=[...a.slice(0,s+1),"especificacao",...a.slice(s+1)]}let n=t.quadro&&typeof t.quadro=="object"?t.quadro:{};return{id:typeof t.id=="string"?t.id:"",colv:lr,nome:typeof t.nome=="string"&&t.nome.trim()?t.nome.trim().slice(0,Ps):e.nome,busca:typeof t.busca=="string"?t.busca.slice(0,500):"",ordem:r,agrupar:Cs.includes(t.agrupar)?t.agrupar:"nenhum",modo:t.modo==="quadro"?"quadro":"tabela",colunas:a.length?a:e.colunas,densidade:t.densidade==="compacta"?"compacta":"confortavel",quadro:{colunas:Ls.includes(n.colunas)?n.colunas:"marcador",limite:typeof n.limite=="number"&&n.limite>0?Math.min(99,Math.floor(n.limite)):0,raiasPorResponsavel:n.raiasPorResponsavel===!0}}}function pa(o,e,t){let r=he(e),a=r.id?o.findIndex(s=>s.id===r.id):-1;if(a>=0){let s=[...o];return s[a]=r,{lista:s,visao:r}}if(o.length>=ws)return null;let n={...r,id:t()};return{lista:[...o,n],visao:n}}var da=(o,e)=>o.filter(t=>t.id!==e);function ua(o,e){let t=r=>JSON.stringify({...r,id:"",nome:""});return t(o)!==t(e)}var ve="spro_grade_v_ids",be=o=>`spro_grade_v:${o}`,Ds=o=>`spro_grade:${o||"x"}`;function Is(){return{visao:No(),idade:ir(),recolhidos:[]}}function $s(o){if(!o||typeof o!="object")return Is();let e=o;return{visao:he(e.visao),idade:sa(e.idade),recolhidos:Array.isArray(e.recolhidos)?e.recolhidos.filter(t=>typeof t=="string").slice(0,200):[]}}function ma(o,e){let{local:t,sync:r}=o,a=Ds(e);async function n(){return $s((await t.obter(a))[a])}async function s(l){let d=await n();await t.gravar({[a]:{...d,...l}})}async function i(){let l=(await r.obter(ve))[ve],d=Array.isArray(l)?l.filter(m=>typeof m=="string"):[];if(!d.length)return[];let g=await r.obter(d.map(be));return d.flatMap(m=>{let y=g[be(m)];return y?[{...he(y),id:m}]:[]})}async function c(l,d=[]){let g=new Set(l.map(b=>b.id)),m={[ve]:l.map(b=>b.id)};for(let b of l)m[be(b.id)]=b;await r.gravar(m);let y=d.filter(b=>!g.has(b.id)).map(b=>be(b.id));y.length&&await r.remover(y)}return{lerEstado:n,gravarVisao:l=>s({visao:l}),gravarIdade:l=>s({idade:l}),gravarRecolhidos:l=>s({recolhidos:l}),lerVisoes:i,gravarVisoes:c,aoMudarVisoes:l=>r.aoMudar(d=>ve in d||Object.keys(d).some(g=>g.startsWith("spro_grade_v:"))?l():void 0)}}function fa(o){let e=t=>{let r=/^[=+\-@\t\r]/.test(t)?`'${t}`:t;return/[;"\n\r]/.test(r)?`"${r.replace(/"/g,'""')}"`:r};return`\uFEFF${o.map(t=>t.map(e).join(";")).join(`\r
`)}`}var ga=new Set;var zs=null;function Rs(o){let e=o.closest?.("dialog[open]");if(e)return e;let t=o.getRootNode?.(),r=o.ownerDocument;return t&&t!==r&&t.host?t:r.body??r.documentElement}function ha(o,e){let t=o;try{t?.CustomEvent&&t.dispatchEvent(new t.CustomEvent("spro-popover",{detail:{fundo:e}}))}catch{}}function va(o,e,t){let r=o.ownerDocument,a=r.defaultView;Rs(o).append(e);let n=!0,s=()=>{if(!n)return;let m=o.getBoundingClientRect?.();if(!m)return;let y=a?.innerHeight??0,b=a?.innerWidth??0,E=Math.min(t.largura??Math.max(m.width,t.larguraMinima??0),Math.max(180,b-16)),q=t.alinharDireita?m.right-E:m.left,A=Math.max(8,Math.min(q,b-E-8)),P=t.alturaMaxima??360;e.style.maxHeight="none";let w=Math.min(e.scrollHeight||P,P),L=y-m.bottom-8,N=m.top-8,z=zs?.()??!1,T=!z&&L<Math.min(w,200)&&N>L;e.style.left=`${A}px`,e.style.width=`${E}px`,e.style.maxHeight=`${z?P:Math.max(140,Math.min(P,T?N:L>140?L:P))}px`,e.classList.toggle("spro-flutuante-cima",T),T?(e.style.top="",e.style.bottom=`${y-m.top+4}px`):(e.style.bottom="",e.style.top=`${m.bottom+4}px`),ha(a,T?0:Math.ceil(m.bottom+4+w+12))},i=m=>{let y=m.composedPath?.()??[],b=m.target,E=q=>y.includes(q)||!!b&&!!q.contains?.(b);E(e)||E(o)||t.aoFechar()},c=()=>{o.isConnected?s():t.aoFechar()},l=m=>{m.target instanceof Node&&e.contains(m.target)||c()},d=()=>t.aoFechar();r.addEventListener("pointerdown",i,!0),a?.addEventListener("scroll",l,!0),a?.addEventListener("resize",c),a?.addEventListener("blur",d);let g={ancora:o,fechar:()=>t.aoFechar()};return ga.add(g),s(),{posicionar:s,fechar(){n&&(n=!1,ga.delete(g),r.removeEventListener("pointerdown",i,!0),a?.removeEventListener("scroll",l,!0),a?.removeEventListener("resize",c),a?.removeEventListener("blur",d),e.remove(),ha(a,0))}}}function ba(o,e){let t=Q(e);if(!t)return[...o];let r=t.split(" "),a=[];return o.forEach((n,s)=>{let i=Q(n.rotulo),c=`${i} ${Q(n.descricao??"")}`;if(!r.every(d=>c.includes(d)))return;let l=i.startsWith(t)?0:i.split(" ").some(d=>d.startsWith(r[0]))?1:2;a.push({o:n,nota:l,i:s})}),a.sort((n,s)=>n.nota-s.nota||n.i-s.i).map(n=>n.o)}function Ts(o,e){let t=o.normalize("NFC"),r=Q(e).split(" ").filter(Boolean);if(!r.length)return[{texto:t,marcado:!1}];let a=[...t],n="",s=[];a.forEach((l,d)=>{let g=l.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase();for(let m of g)n+=m,s.push(d)});let i=new Array(a.length).fill(!1);for(let l of r){let d=n.indexOf(l);if(!(d<0))for(let g=d;g<d+l.length;g++)i[s[g]]=!0}let c=[];return a.forEach((l,d)=>{let g=c[c.length-1];g&&g.marcado===i[d]?g.texto+=l:c.push({texto:l,marcado:i[d]})}),c}var Ns=0;function Ao(o){let e=`spro-combo-${++Ns}`,t=()=>typeof o.opcoes=="function"?o.opcoes():o.opcoes,r=new Map,a=v=>t().find(M=>M.valor===v)??r.get(v),n=[...o.valor??[]],s=null,i="",c=0,l=[],d=null,g=p("button",{type:"button",class:`spro-combo${o.classe?` ${o.classe}`:""}`,role:"combobox","aria-haspopup":"listbox","aria-expanded":"false","aria-label":o.rotulo,title:o.rotulo}),m=()=>o.aoMudar?.([...n]);function y(){let v=[];o.icone&&v.push(V(o.icone,15));let M=n.map(_=>a(_)).filter(_=>!!_),C=p("span",{class:"spro-combo-texto"});if(!M.length)C.classList.add("spro-combo-vazio"),C.append(o.vazio??"Escolher\u2026");else{let _=M[0];_.cor&&C.append(p("span",{class:"spro-combo-cor",style:`background:${_.cor}`})),C.append(p("span",{class:"spro-combo-rotulo"},_.rotulo)),M.length>1&&C.append(p("span",{class:"spro-combo-mais"},`+${M.length-1}`))}v.push(C,V("chevron",14)),g.classList.toggle("spro-combo-ativo",o.multiplo===!0&&M.length>0),g.replaceChildren(...v)}let b=()=>o.busca??(t().length>7||!!o.multiplo||!!o.criar);function E(v){if(o.multiplo){n=n.includes(v.valor)?n.filter(C=>C!==v.valor):[...n,v.valor],m(),y(),w();return}let M=n.length!==1||n[0]!==v.valor;n=[v.valor],y(),T(!0),M&&m()}async function q(){if(!o.criar)return;let v=i.trim();if(!v)return;let M=await o.criar(v);if(M){if(r.set(M.valor,M),i="",s){let C=s.querySelector(".spro-combo-busca");C&&(C.value="")}o.multiplo&&n.includes(M.valor)?w():E(M)}}function A(v,M){let C=n.includes(v.valor),_=p("span",{class:"spro-combo-op-rotulo"});for(let R of Ts(v.rotulo,i))_.append(R.marcado?p("mark",{},R.texto):R.texto);let $=p("li",{role:"option",id:`${e}-op-${M}`,class:`spro-combo-op${M===c?" spro-combo-op-ativa":""}`,"data-valor":v.valor,"aria-selected":C?"true":"false"},o.multiplo?p("span",{class:"spro-combo-caixa","aria-hidden":"true"},C?V("check",12):null):null,v.cor?p("span",{class:"spro-combo-cor",style:`background:${v.cor}`}):null,v.icone?V(v.icone,15):null,p("span",{class:"spro-combo-op-textos"},_,v.descricao?p("span",{class:"spro-combo-op-desc"},v.descricao):null),v.contagem!==void 0?p("span",{class:"spro-combo-conta"},String(v.contagem)):null,!o.multiplo&&C?p("span",{class:"spro-combo-marca"},V("check",14)):null);return $.addEventListener("pointerdown",R=>R.preventDefault()),$.addEventListener("click",()=>{c=M,E(v)}),$.addEventListener("pointermove",()=>{c!==M&&(c=M,P())}),$}function P(){if(!s)return;let v=[...s.querySelectorAll('[role="option"]')];v.forEach(($,R)=>{$.classList.toggle("spro-combo-op-ativa",R===c)});let M=v[c],_=s.querySelector(".spro-combo-busca")??s.querySelector('[role="listbox"]');M?(_?.setAttribute("aria-activedescendant",M.id),M.scrollIntoView?.({block:"nearest"})):_?.removeAttribute("aria-activedescendant")}function w(){if(!s)return;l=ba(t(),i),c>=l.length&&(c=Math.max(0,l.length-1)),s.querySelector('[role="listbox"]').replaceChildren(...l.map(A));let M=s.querySelector(".spro-combo-extras");M.replaceChildren();let C=i.trim();l.length||M.append(p("p",{class:"spro-combo-nada"},C?"Nada encontrado.":"Nenhuma op\xE7\xE3o."));let _=t().some(R=>Q(R.rotulo)===Q(C));if(o.criar&&C&&!_){let R=p("button",{type:"button",class:"spro-combo-criar"},V("mais",14),p("span",{},o.rotuloCriar?o.rotuloCriar(C):`Criar \u201C${C}\u201D`));R.addEventListener("pointerdown",j=>j.preventDefault()),R.addEventListener("click",()=>void q()),M.append(R)}let $=s.querySelector(".spro-combo-rodape");if($){let R=l.filter(so=>!n.includes(so.valor)),j=p("button",{type:"button",class:"spro-combo-acao",disabled:!C||!R.length},`Marcar os filtrados${C&&R.length?` (${R.length})`:""}`);j.addEventListener("click",()=>{n=[...n,...R.map(so=>so.valor)],m(),y(),w()});let Po=p("button",{type:"button",class:"spro-combo-acao spro-combo-limpar",disabled:!n.length},"Limpar");Po.addEventListener("click",()=>{n=[],m(),y(),w()}),$.replaceChildren(p("span",{class:"spro-combo-total"},n.length?`${n.length} marcado${n.length>1?"s":""}`:""),j,Po)}P()}let L=()=>d?.posicionar();function N(v){let M=l.length,C=v.target,_=s?[...s.querySelectorAll(".spro-combo-rodape button:not(:disabled)")]:[],$=!!C?.closest?.(".spro-combo-rodape, .spro-combo-criar");if(v.key==="Tab"){let j=_.indexOf(C);if(!v.shiftKey&&j<_.length-1)_[j+1]?.focus();else if(v.shiftKey&&j>=0)j>0?_[j-1]?.focus():(s?.querySelector(".spro-combo-busca")??s?.querySelector('[role="listbox"]'))?.focus();else{T(!0);return}v.preventDefault(),v.stopPropagation();return}if($&&v.key!=="Escape")return;let R=!s?.querySelector(".spro-combo-busca");if(R&&v.key===" "){let j=l[c];j&&E(j),v.preventDefault(),v.stopPropagation();return}if(R&&v.key.length===1&&!v.ctrlKey&&!v.metaKey&&!v.altKey){let j=Q(v.key),so=[...l.keys()].map(xo=>(c+1+xo)%Math.max(1,M)).find(xo=>Q(l[xo]?.rotulo??"").startsWith(j));so!==void 0&&(c=so,P()),v.preventDefault(),v.stopPropagation();return}switch(v.key){case"ArrowDown":c=M?(c+1)%M:0,P();break;case"ArrowUp":c=M?(c-1+M)%M:0,P();break;case"Home":if(v.target?.classList?.contains("spro-combo-busca")&&i)return;c=0,P();break;case"End":if(v.target?.classList?.contains("spro-combo-busca")&&i)return;c=Math.max(0,M-1),P();break;case"Enter":{let j=l[c];j?E(j):q();break}case"Escape":T(!0);break;case"Backspace":if(!o.multiplo||i||!n.length)return;n=n.slice(0,-1),m(),y(),w();break;default:return}v.preventDefault(),v.stopPropagation()}function z(v=""){if(s)return;i=v,c=v?0:(()=>{let $=ba(t(),i).findIndex(R=>R.valor===n[n.length-1]);return $<0?0:$})();let C=b()?p("input",{type:"text",class:"spro-combo-busca",placeholder:o.criar?"Buscar ou criar\u2026":"Buscar\u2026","aria-label":`Filtrar ${o.rotulo.toLowerCase()}`,"aria-controls":`${e}-lista`,"aria-autocomplete":"list",autocomplete:"off",spellcheck:"false",value:v}):null;if(C&&(C.value=v,C.addEventListener("input",()=>{i=C.value,c=0,w(),L()})),s=p("div",{class:`spro-combo-pop${o.multiplo?" spro-combo-pop-multi":""}`},C?p("div",{class:"spro-combo-cabeca"},V("busca",15),C):null,p("ul",{role:"listbox",id:`${e}-lista`,class:"spro-combo-lista",tabindex:C?void 0:"-1","aria-label":o.rotulo,"aria-multiselectable":o.multiplo?"true":void 0}),p("div",{class:"spro-combo-extras"}),o.multiplo?p("div",{class:"spro-combo-rodape"}):null),s.addEventListener("keydown",N),d=va(g,s,{larguraMinima:o.larguraLista??220,alturaMaxima:360,aoFechar:()=>T(!1)}),g.setAttribute("aria-expanded","true"),g.setAttribute("aria-controls",`${e}-lista`),g.classList.add("spro-combo-aberto"),w(),L(),!s)return;(C??s.querySelector('[role="listbox"]'))?.focus?.({preventScroll:!0}),C&&v&&C.setSelectionRange?.(v.length,v.length)}function T(v=!1){s&&(d?.fechar(),d=null,s=null,i="",g.setAttribute("aria-expanded","false"),g.removeAttribute("aria-controls"),g.classList.remove("spro-combo-aberto"),v&&g.focus?.({preventScroll:!0}))}return g.addEventListener("click",()=>s?T(!0):z()),g.addEventListener("keydown",v=>{s||(v.key==="ArrowDown"||v.key==="ArrowUp"?(v.preventDefault(),z()):v.key.length===1&&v.key!==" "&&!v.ctrlKey&&!v.metaKey&&!v.altKey&&b()&&(v.preventDefault(),z(v.key)))}),y(),{el:g,valor:()=>[...n],definir(v,M=!1){n=[...v],y(),w(),M&&m()},atualizar(){y(),w()},abrir:z,fechar:()=>T(!1)}}var xa="#tblProcessosRecebidos input[type=checkbox], #tblProcessosGerados input[type=checkbox], #tblProcessosDetalhado input[type=checkbox]",pr=o=>o.getAttribute("value")??o.closest("tr")?.id.replace(/^P/,"")??"";function dr(o){let e=new Set;for(let t of o.querySelectorAll(xa))t.checked&&pr(t)&&e.add(pr(t));return e}function ya(o,e){let t=new Set(e);for(let r of o.querySelectorAll(xa)){let a=pr(r);a&&(t.delete(a),!r.disabled&&!!r.checked!==e.has(a)&&r.click())}return[...t]}function Aa(o,e){let t=!1,r=()=>{t||(t=!0,queueMicrotask(()=>{t=!1,e(dr(o))}))};return o.addEventListener("click",r,!0),o.addEventListener("change",r,!0),()=>{o.removeEventListener("click",r,!0),o.removeEventListener("change",r,!0)}}function _s(o){return/acaoControleProcessos\(\s*['"][^'"]*['"]\s*,\s*true/.test(o.elemento.getAttribute("onclick")??"")}function Ea(o,e){return _s(o)&&e===0?{ok:!1,motivo:"Marque ao menos um processo."}:(o.elemento.click(),{ok:!0})}var qs=o=>o instanceof Error?o.message:String(o);function Sa(o){if(o.tipo==="atribuicao")return{...o,para:o.de,de:o.para};let e={tipo:"marcador",id:o.id,protocolo:o.protocolo};return o.adicionar&&(e.remover=o.adicionar),o.remover&&(e.adicionar=o.remover,o.texto&&(e.texto=o.texto)),e}async function Vs(o,e){try{if(o.tipo==="atribuicao")return await e.atribuir(o.protocolo,o.para),{ok:!0,desfazer:Sa(o)};if(o.adicionar&&await e.marcador(o.protocolo,{marcador:o.adicionar,...o.texto?{texto:o.texto}:{}}),o.remover)try{await e.marcador(o.protocolo,{marcador:o.remover,remover:!0})}catch(t){throw o.adicionar&&await e.marcador(o.protocolo,{marcador:o.adicionar,remover:!0}).catch(()=>{}),t}return{ok:!0,desfazer:Sa(o)}}catch(t){return{ok:!1,erro:qs(t)}}}function wa(o){let e=Promise.resolve();return{mover(t){let r=e.then(()=>Vs(t,o));return e=r.catch(()=>{}),r}}}var xe=o=>`${o} ${Math.abs(o)===1?"dia":"dias"}`,Pa=Number.MAX_SAFE_INTEGER;function ur(o,e){let t=[e];return o.hora&&o.vencimento&&(t[0]=e.replace(/\.$/,"")+` \xE0s ${o.hora}.`),o.texto&&t.push(o.texto),o.sigla&&t.push(`Definido por ${o.sigla} no controle de prazo do SEI.`),t.join(`
`)}function Ma(o,e){let t=o.vencimento;if(o.concluidoEm&&t)return{situacao:"concluido",texto:`conclu\xEDdo em ${fo(o.concluidoEm).slice(0,5)}`,dica:ur(o,`Prazo de ${fo(t)} conclu\xEDdo em ${fo(o.concluidoEm)}.`),ordem:Pa,sorter:`${t} 23:59:59`};if(t){let s=Fo(e,t),i=`${t} ${o.hora??"23:59"}:00`,c=ur(o,`Vence em ${fo(t)}.`);return s===0?{situacao:"hoje",texto:"vence hoje",dica:c,ordem:0,sorter:i}:s<0?{situacao:"atrasado",texto:`${xe(-s)} de atraso`,dica:c,ordem:s,sorter:i}:{situacao:"noPrazo",texto:`vence em ${xe(s)}`,dica:c,ordem:s,sorter:i}}let r=o.inicio??e,a=Fo(r,e);return{situacao:"desde",texto:a===0?"hoje":a>0?`h\xE1 ${xe(a)}`:`em ${xe(-a)}`,dica:ur(o,`Contando desde ${fo(r)}.`),ordem:Pa-1,sorter:`${r} ${o.hora??"23:59"}:00`}}function no(o,e){return o.prazo?Ma(o.prazo,e.hoje):null}function po(o,e){return o.vistoEm===void 0?null:Math.max(0,Math.floor((e.agora-o.vistoEm)/864e5))}function Eo(o,e){return o.ultimaMov?Math.max(0,Fo(o.ultimaMov,e.hoje)):null}function ka(o,e){return e.visitaAnterior!==void 0&&o.vistoEm!==void 0&&o.vistoEm>e.visitaAnterior}function Qo(o,e){let t=no(o,e);return!t||t.situacao==="concluido"||t.situacao==="desde"?null:t.ordem}var Hs={resp:"resp",responsavel:"resp",atribuido:"resp",atribuicao:"resp",tipo:"tipo",marcador:"marcador",marcadores:"marcador",marc:"marcador",espec:"espec",especificacao:"espec",anot:"anot",anotacao:"anot",nota:"anot",prazo:"prazo",caixa:"caixa",idade:"caixa",novo:"novo",sigilo:"sigilo",sigiloso:"sigilo",grupo:"grupo",retorno:"retorno",protocolo:"protocolo",proc:"protocolo",processo:"protocolo",parado:"parado",mov:"parado",prio:"prio",prioridade:"prio",interessado:"interessado",interessados:"interessado"};function gr(o){let e=[],t="",r=!1;for(let a of o)a==='"'?(r=!r,t+=a):/\s/.test(a)&&!r?(t&&e.push(t),t=""):t+=a;return t&&e.push(t),e}var Fs=o=>o.replace(/^"|"$/g,"");function hr(o){let e=[],t=[];for(let r of gr(o)){let a=r,n=!1;a.startsWith("-")&&a.length>1&&(n=!0,a=a.slice(1));let s,i=/^([a-zA-Z\u00C0-\u017F]+):(.*)$/.exec(a);if(i){let g=Hs[Q(i[1])];g&&(s=g,a=i[2])}let c="=";s&&/^[<>]/.test(a)&&(c=a[0],a=a.slice(1));let l=Q(Fs(a));if(!l&&!s)continue;let d={...s?{campo:s}:{},valor:l,original:r,negado:n,comparador:c};e.push(d),t.push({texto:r,termo:d})}return{termos:e,tokens:t}}var js=o=>Q([o.protocolo,o.protocolo.replace(/\D/g,""),o.tipo,o.especificacao,o.atribuicao?.sigla,o.atribuicao?.nome,...o.marcadores.flatMap(e=>[e.nome,e.texto]),o.anotacao?.texto,o.prazo?.texto,o.prioridade,o.interessados,o.observacao].filter(Boolean).join(" ")),uo=(o,e)=>Q(o??"").includes(e),Ca=/^(s|sim|1|true|yes)$/;function mr(o){let e=/^(\d+)\s*(d|dia|dias)?$/.exec(o);return e?Number(e[1]):null}function fr(o,e,t){return o===null?!1:e==="<"?o<t:e===">"?o>t:o===t}function Gs(o,e,t){let r=no(o,t),a=e.valor;if(a==="sem"||a==="nenhum"||a==="nao")return!o.prazo;if(a==="com"||a==="sim")return!!o.prazo;if(!r)return!1;if(a==="atrasado"||a==="atrasados"||a==="vencido")return r.situacao==="atrasado";if(a==="hoje")return r.situacao==="hoje";if(a==="concluido"||a==="concluidos")return r.situacao==="concluido";if(a==="semana"){let s=Qo(o,t);return s!==null&&s>=0&&s<=7}let n=mr(a);return n!==null?fr(Qo(o,t),e.comparador==="="?"<":e.comparador,n):uo(o.prazo?.texto,a)}function Us(o,e,t){let r=e.valor;switch(e.campo){case"resp":return r==="sem"||r==="ninguem"?!o.atribuicao:r==="eu"?!!t.eu&&Q(o.atribuicao?.sigla??"")===Q(t.eu):uo(o.atribuicao?.sigla,r)||uo(o.atribuicao?.nome,r);case"tipo":return uo(o.tipo,r);case"marcador":return r==="sem"||r==="nenhum"?o.marcadores.length===0:r==="com"?o.marcadores.length>0:o.marcadores.some(a=>uo(a.nome,r)||uo(a.texto,r));case"espec":return uo(o.especificacao,r);case"anot":return r==="sem"||r==="nao"?!o.anotacao:r==="com"||r==="sim"?!!o.anotacao:r==="prioridade"||r==="prioritaria"?!!o.anotacao?.prioridade:uo(o.anotacao?.texto,r);case"prazo":return Gs(o,e,t);case"caixa":{let a=mr(r);return a===null?!1:fr(po(o,t),e.comparador==="="?">":e.comparador,a)}case"novo":return r==="visita"?ka(o,t):Ca.test(r)?o.naoVisualizado:r==="nao"?!o.naoVisualizado:!1;case"sigilo":return Ca.test(r)?o.sigiloso:!o.sigiloso;case"grupo":return r.startsWith("rec")?o.grupo==="recebidos":r.startsWith("ger")?o.grupo==="gerados":!1;case"retorno":return r==="sem"||r==="nao"?o.retornos.length===0:r==="atrasado"?o.retornos.some(a=>a.atrasado):r==="aguardando"?o.retornos.some(a=>a.tipo==="aguardando"):r==="programado"?o.retornos.some(a=>a.tipo==="programado"):o.retornos.length>0;case"parado":{let a=mr(r);return a===null?!1:fr(Eo(o,t),e.comparador==="="?">":e.comparador,a)}case"prio":return uo(o.prioridade,r);case"interessado":return uo(o.interessados,r);case"protocolo":return Q(o.protocolo).includes(r)||o.protocolo.replace(/\D/g,"").includes(r.replace(/\D/g,"")||"\0");default:return!0}}function Bs(o,e,t){if(!o.termos.length)return!0;let r;for(let a of o.termos){let n;if(a.campo?n=Us(e,a,t):(r??=js(e),n=r.includes(a.valor)),a.negado?n:!n)return!1}return!0}var Oa=(o,e,t)=>{let r=hr(e);return r.termos.length?o.filter(a=>Bs(r,a,t)):o};function vr(o,e){return gr(o).filter(t=>t!==e).join(" ")}function La(o,e,t){let r=/\s/.test(t)?`"${t}"`:t,a=`${e}:${r}`,n=gr(o);return n.includes(a)?o:[...n,a].join(" ")}var Qs=new Intl.Collator("pt-BR",{sensitivity:"base",numeric:!0});function Xs(o,e=[]){return[...o.values()].sort((t,r)=>{let a=e.indexOf(t.chave),n=e.indexOf(r.chave);return a>=0||n>=0?(a<0?-1:a)-(n<0?-1:n):Qs.compare(t.rotulo,r.rotulo)})}function X(o,e,t,r){let a=o.get(e);return a||(a={chave:e,rotulo:t,itens:[],...r?{tom:r}:{}},o.set(e,a)),a}var _o=[["atrasado","Atrasados","perigo"],["hoje","Vencem hoje","aviso"],["semana","Pr\xF3ximos 7 dias","aviso"],["mes","Pr\xF3ximos 30 dias","neutro"],["depois","Depois de 30 dias","neutro"],["desde","Contando desde uma data","neutro"],["concluido","Prazo conclu\xEDdo","neutro"],["sem","Sem prazo","neutro"]];function Xo(o,e){let t=no(o,e);if(!t)return"sem";if(t.situacao==="concluido")return"concluido";if(t.situacao==="desde")return"desde";if(t.situacao==="atrasado")return"atrasado";if(t.situacao==="hoje")return"hoje";let r=Qo(o,e)??0;return r<=7?"semana":r<=30?"mes":"depois"}var Da=[["recente","Chegaram hoje"],["semana","Nos \xFAltimos 7 dias"],["mes","Nos \xFAltimos 30 dias"],["antigo","H\xE1 mais de 30 dias"],["desconhecido","Sem registro"]];function Ks(o,e){let t=po(o,e);return t===null?"desconhecido":t<1?"recente":t<=7?"semana":t<=30?"mes":"antigo"}function Lo(o,e){return e.map(t=>o.get(t[0])).filter(t=>!!t)}function ye(o,e,t){if(e==="nenhum")return[{chave:"todos",rotulo:"Todos",itens:o}];let r=new Map;for(let a of o)switch(e){case"responsavel":a.atribuicao?X(r,`u:${a.atribuicao.sigla}`,a.atribuicao.nome===a.atribuicao.sigla?a.atribuicao.sigla:`${a.atribuicao.nome} (${a.atribuicao.sigla})`).itens.push(a):X(r,"sem","Sem respons\xE1vel").itens.push(a);break;case"tipo":X(r,`t:${a.tipo||"-"}`,a.tipo||"Sem tipo").itens.push(a);break;case"marcador":if(a.marcadores.length)for(let n of a.marcadores)X(r,`m:${n.nome}`,n.nome).itens.push(a);else X(r,"sem","Sem marcador").itens.push(a);break;case"prazo":{let n=Xo(a,t),s=_o.find(i=>i[0]===n);X(r,n,s[1],s[2]).itens.push(a);break}case"situacao":a.naoVisualizado?X(r,"novo","N\xE3o visualizados","aviso").itens.push(a):X(r,"lido","Visualizados").itens.push(a);break;case"grupo":X(r,a.grupo,a.grupo==="recebidos"?"Recebidos":"Gerados").itens.push(a);break;case"anotacao":a.anotacao?.prioridade?X(r,"prio","Anota\xE7\xE3o com prioridade","aviso").itens.push(a):a.anotacao?X(r,"com","Com anota\xE7\xE3o").itens.push(a):X(r,"sem","Sem anota\xE7\xE3o").itens.push(a);break;case"acompanhamento":a.acompanhamentoEspecial?X(r,"com","Em acompanhamento especial").itens.push(a):X(r,"sem","Fora do acompanhamento especial").itens.push(a);break;case"retorno":a.retornos.some(n=>n.atrasado)?X(r,"atrasado","Retorno atrasado","perigo").itens.push(a):a.retornos.some(n=>n.tipo==="aguardando")?X(r,"aguardando","Aguardando retorno").itens.push(a):a.retornos.length?X(r,"programado","Retorno programado").itens.push(a):X(r,"sem","Sem retorno").itens.push(a);break;case"caixa":{let n=Ks(a,t);X(r,n,Da.find(s=>s[0]===n)[1]).itens.push(a);break}}return e==="prazo"?Lo(r,_o):e==="caixa"?Lo(r,Da):e==="situacao"?Lo(r,[["novo",""],["lido",""]]):e==="grupo"?Lo(r,[["recebidos",""],["gerados",""]]):e==="anotacao"?Lo(r,[["prio",""],["com",""],["sem",""]]):e==="acompanhamento"?Lo(r,[["com",""],["sem",""]]):e==="retorno"?Lo(r,[["atrasado",""],["aguardando",""],["programado",""],["sem",""]]):Xs(r,["sem"])}var br={nenhum:"Sem agrupamento",responsavel:"Respons\xE1vel",tipo:"Tipo de processo",marcador:"Marcador",prazo:"Prazo",situacao:"Visualiza\xE7\xE3o",grupo:"Recebidos e gerados",anotacao:"Anota\xE7\xE3o",acompanhamento:"Acompanhamento especial",retorno:"Retorno programado",caixa:"Tempo na caixa"};var Js=new Intl.Collator("pt-BR",{sensitivity:"base",numeric:!0});function Ae(o,e){let t=new Map;for(let r of o)for(let a of e(r)){let n=t.get(a.valor)??{valor:a.valor,rotulo:a.rotulo,n:0};n.n+=1,t.set(a.valor,n)}return[...t.values()].sort((r,a)=>a.n-r.n||Js.compare(r.rotulo,a.rotulo))}function xr(o,e){let t=Ae(o,r=>{let a=Xo(r,e),n=_o.find(i=>i[0]===a)[1],s=a==="atrasado"?"atrasado":a==="hoje"?"hoje":a==="semana"?"semana":a==="sem"?"sem":a==="concluido"?"concluido":"";return s?[{valor:s,rotulo:n}]:[]});return{responsaveis:Ae(o,r=>r.atribuicao?[{valor:r.atribuicao.sigla,rotulo:`${r.atribuicao.nome} (${r.atribuicao.sigla})`}]:[{valor:"sem",rotulo:"Sem respons\xE1vel"}]),tipos:Ae(o,r=>r.tipo?[{valor:r.tipo,rotulo:r.tipo}]:[]),marcadores:Ae(o,r=>r.marcadores.length?r.marcadores.map(a=>({valor:a.nome,rotulo:a.nome})):[{valor:"sem",rotulo:"Sem marcador"}]),prazos:t}}function yr(o){let e=[];o.sigiloso&&e.push("Sigiloso"),o.naoVisualizado&&e.push("N\xE3o visualizado"),o.documentoNovo&&e.push("Documento novo"),o.urgente&&e.push("Urgente"),o.trancado&&e.push("Trancado"),o.acompanhamentoEspecial&&e.push(o.acompanhamentoGrupo?`Acompanhamento especial (${o.acompanhamentoGrupo})`:"Acompanhamento especial");for(let t of o.retornos)e.push(`${t.tipo==="aguardando"?"Aguardando retorno":"Retorno programado"}${t.atrasado?" (atrasado)":""}`);return e}function Ar(o,e){let t=no(o,e);if(!o.prazo||!t)return"";let r=o.prazo.vencimento??o.prazo.inicio;return`${r?fo(r):""}${o.prazo.hora?` ${o.prazo.hora}`:""} (${t.texto})`.trim()}var Ws=(o,e,t)=>{switch(e){case"processo":return o.protocolo;case"tipo":return o.tipo;case"especificacao":return o.especificacao;case"responsavel":return o.atribuicao?o.atribuicao.nome===o.atribuicao.sigla?o.atribuicao.sigla:`${o.atribuicao.nome} (${o.atribuicao.sigla})`:"";case"marcadores":return o.marcadores.map(r=>r.texto?`${r.nome}: ${r.texto}`:r.nome).join("; ");case"prazo":return Ar(o,t);case"anotacao":return o.anotacao?.texto.replace(/\s*\n\s*/g," / ")??"";case"caixa":return Ro(po(o,t));case"parado":return Ro(Eo(o,t));case"sinais":return yr(o).join("; ")}};function Ia(o,e,t){return[e.map(r=>Oo[r]),...o.map(r=>e.map(a=>Ws(r,a,t)))]}var $a=o=>`processos-${o}.csv`;function za(o,e,t){let r=[];for(let a of o){let n=t&&e.has(a.chave);if(t&&r.push({tipo:"grupo",grupo:a,recolhido:n}),!n)for(let s of a.itens)r.push({tipo:"processo",processo:s,grupo:a.chave})}return r}var Er=new Intl.Collator("pt-BR",{numeric:!0,sensitivity:"base"});function Ra(o){let e=/(\d+)\/(\d{4})-\d+\s*$/.exec(o);if(!e)return null;let t=/(\d+)\s*$/.exec(e[1].split(/[.-]/).pop()??"")?.[1]??e[1];return[Number(e[2]),Number(t)]}function Zs(o,e){let t=Ra(o),r=Ra(e);return t&&r&&(t[0]-r[0]||t[1]-r[1])||Er.compare(o,e)}function Ta(o,e,t){switch(e){case"tipo":return o.tipo||null;case"responsavel":return o.atribuicao?.sigla??null;case"marcador":return o.marcadores[0]?.nome??null;case"prazo":{let r=no(o,t);return r?r.ordem:null}case"caixa":return po(o,t);case"parado":return Eo(o,t);case"novo":return o.naoVisualizado?0:1}}function Ys(o,e){return(t,r)=>{for(let a of o){let n;if(a.campo==="protocolo")n=Zs(t.protocolo,r.protocolo),a.decrescente&&(n=-n);else{let s=Ta(t,a.campo,e),i=Ta(r,a.campo,e);if(s===null&&i===null)continue;if(s===null)return 1;if(i===null)return-1;n=typeof s=="number"&&typeof i=="number"?s-i:Er.compare(String(s),String(i)),a.decrescente&&(n=-n)}if(n)return n}return 0}}function Na(o,e,t){return e.length?[...o].sort(Ys(e,t)):o}function _a(o,e,t){let r=o.findIndex(s=>s.campo===e),a=r<0?{campo:e,decrescente:!1}:o[r].decrescente?null:{campo:e,decrescente:!0};if(!t)return a?[a]:[];if(r<0)return[...o,a];let n=[...o];return a?n[r]=a:n.splice(r,1),n}var Sr=new Intl.Collator("pt-BR",{sensitivity:"base",numeric:!0}),mo="sem";function qa(o,e,t,r={}){let a=new Map,n=(i,c,l,d,g)=>{let m=a.get(i);return m||(m={chave:i,titulo:c,itens:[],aceitaSoltar:l,excedeu:!1,...d?{motivoSomenteLeitura:d}:{},...g?{tom:g}:{}},a.set(i,m)),m};if(e.colunas==="marcador"){n(mo,"Sem marcador",!0);for(let i of[...r.marcadores??[]].sort(Sr.compare))n(`m:${i}`,i,!0);for(let i of o){i.marcadores.length||n(mo,"Sem marcador",!0).itens.push(i);for(let c of i.marcadores)n(`m:${c.nome}`,c.nome,!0).itens.push(i)}}else if(e.colunas==="responsavel"){n(mo,"Sem respons\xE1vel",!0);for(let i of r.responsaveis??[])n(`u:${i.sigla}`,`${i.nome} (${i.sigla})`,!0);for(let i of o)i.atribuicao?n(`u:${i.atribuicao.sigla}`,`${i.atribuicao.nome} (${i.atribuicao.sigla})`,!0).itens.push(i):n(mo,"Sem respons\xE1vel",!0).itens.push(i)}else if(e.colunas==="prazo"){for(let[i,c,l]of _o)i!=="desde"&&n(i,c,!1,"O prazo \xE9 definido pelo bot\xE3o de prazo, n\xE3o arrastando.",l);for(let i of o){let c=Xo(i,t);n(c==="desde"?"sem":c,"",!1).itens.push(i)}}else for(let i of o)n(`t:${i.tipo}`,i.tipo||"Sem tipo",!1,"O tipo do processo n\xE3o muda arrastando.").itens.push(i);let s=[...a.values()];if(e.colunas==="prazo"&&(s=s.filter(i=>i.itens.length||i.titulo)),e.colunas==="marcador"||e.colunas==="responsavel"?s.sort((i,c)=>i.chave===mo?-1:c.chave===mo?1:Sr.compare(i.titulo,c.titulo)):e.colunas==="tipo"&&s.sort((i,c)=>Sr.compare(i.titulo,c.titulo)),e.limite>0)for(let i of s)i.excedeu=i.itens.length>e.limite;return s}var Ee=o=>o.slice(o.indexOf(":")+1);function Va(o,e,t,r){if(t===r)return{ok:!1,motivo:"Mesma coluna."};if(o==="marcador"){let a=t===mo?void 0:Ee(t),n=r===mo?void 0:Ee(r);if(a&&!e.marcadores.some(l=>l.nome===a))return{ok:!1,motivo:"O processo j\xE1 n\xE3o tem esse marcador."};let s=n?e.marcadores.some(l=>l.nome===n):!1,i=a?e.marcadores.find(l=>l.nome===a)?.texto:void 0,c={tipo:"marcador",id:e.id,protocolo:e.protocolo};return a&&(c.remover=a),n&&!s&&(c.adicionar=n,i&&(c.texto=i)),!c.remover&&!c.adicionar?{ok:!1,motivo:"Nada a mudar."}:{ok:!0,movimento:c}}return o==="responsavel"?{ok:!0,movimento:{tipo:"atribuicao",id:e.id,protocolo:e.protocolo,para:r===mo?null:Ee(r),de:t===mo?null:Ee(t)}}:{ok:!1,motivo:"Esta divis\xE3o do quadro \xE9 s\xF3 de leitura."}}function wr(o,e,t={}){if(e.tipo==="atribuicao"){if(e.para===null){let{atribuicao:a,...n}=o;return n}return{...o,atribuicao:{sigla:e.para,nome:t[e.para]??e.para}}}let r=o.marcadores;return e.remover&&(r=r.filter(a=>a.nome!==e.remover)),e.adicionar&&(r=[...r,{nome:e.adicionar,cor:"",texto:e.texto??""}]),{...o,marcadores:r}}var Pr="application/x-spro-cartao";function oi(o,e,t){let r=no(o,t.ctx),a=p("input",{type:"checkbox",class:"spro-cb","aria-label":`Marcar ${o.protocolo}`,disabled:!o.naPaginaAtual});a.checked=t.selecionados.has(o.id),a.addEventListener("change",()=>t.aoSelecionar(o.id,a.checked));let n=p("div",{class:`spro-cartao${a.checked?" spro-sel":""}`,draggable:"true","data-id":o.id,"data-de":e},p("div",{class:"spro-cartao-topo"},a,p("a",{class:`spro-proc${o.naoVisualizado?" spro-novo":""}`,href:o.link??"#",draggable:"false"},o.protocolo)),o.tipo?p("div",{class:"spro-cartao-tipo"},o.tipo):null,o.especificacao?p("div",{class:"spro-cartao-espec"},o.especificacao):null,p("div",{class:"spro-cartao-rodape"},r?p("span",{class:`spro-prazo spro-prazo-${r.situacao}`,title:r.dica},r.texto):null,o.atribuicao?p("span",{class:"spro-avatar",title:o.atribuicao.nome},o.atribuicao.sigla.slice(0,2).toUpperCase()):null));return n.addEventListener("dragstart",s=>{s.dataTransfer?.setData(Pr,JSON.stringify({id:o.id,de:e})),s.dataTransfer?.setData("text/plain",o.protocolo),s.dataTransfer&&(s.dataTransfer.effectAllowed="move"),n.classList.add("spro-arrastando")}),n.addEventListener("dragend",()=>n.classList.remove("spro-arrastando")),n}function ei(o,e){let t=p("div",{class:"spro-col-corpo"},...o.itens.map(s=>oi(s,o.chave,e)));o.itens.length||t.append(p("div",{class:"spro-col-vazia"},o.aceitaSoltar?"Solte aqui":"Vazia"));let r=e.cfg.limite,a=p("div",{class:"spro-col-topo"},p("span",{class:"spro-col-titulo",title:o.titulo},o.titulo),p("span",{class:`spro-col-n${o.excedeu?" spro-excedeu":""}`,title:o.excedeu?`Passou do limite de ${r}`:void 0},r>0?`${o.itens.length}/${r}`:String(o.itens.length)),o.aceitaSoltar?null:p("span",{class:"spro-col-trava",title:o.motivoSomenteLeitura},lo("bloquear",13))),n=p("section",{class:`spro-col${o.tom?` spro-tom-${o.tom}`:""}${o.excedeu?" spro-col-cheia":""}`,"data-chave":o.chave},a,t);return n.addEventListener("dragover",s=>{s.dataTransfer?.types.includes(Pr)&&o.aceitaSoltar&&(s.preventDefault(),n.classList.add("spro-alvo"))}),n.addEventListener("dragleave",()=>n.classList.remove("spro-alvo")),n.addEventListener("drop",s=>{n.classList.remove("spro-alvo");let i=s.dataTransfer?.getData(Pr);if(i){s.preventDefault();try{let{id:c,de:l}=JSON.parse(i);e.aoMover(c,l,o.chave)}catch{}}}),n}function Ha(o){let e=p("div",{class:"spro-quadro"}),t=r=>p("div",{class:"spro-colunas"},...qa(r,o.cfg,o.ctx,o.extras).map(a=>ei(a,o)));if(o.cfg.raiasPorResponsavel&&o.cfg.colunas!=="responsavel")for(let r of ye(o.processos,"responsavel",o.ctx))e.append(p("div",{class:"spro-raia"},p("div",{class:"spro-raia-nome"},r.rotulo,p("span",{class:"spro-grupo-n"},String(r.itens.length))),t(r.itens)));else e.append(t(o.processos));return o.processos.length||e.prepend(p("div",{class:"spro-vazio"},"Nenhum processo corresponde ao filtro.")),e}var Fa=".spro-fav-estrela, .spro-prj-ic, .spro-dem-cx",ri=[".spro-fav-",".spro-prj-",".spro-dem-cx"],ja=(o,e)=>o.getElementById(`P${e}`)?.querySelectorAll("td")[1],Se=["spro-fav-estrela","spro-prj-ic","spro-dem-cx"],Mr=o=>Se.find(e=>o.classList.contains(e))??"";function ti(o,e,t){for(let r of Array.from(o.attributes))!e.hasAttribute(r.name)&&r.name!=="data-spro-id"&&o.removeAttribute(r.name);for(let r of Array.from(e.attributes))r.name!=="aria-busy"&&o.getAttribute(r.name)!==r.value&&o.setAttribute(r.name,r.value);o.removeAttribute("aria-busy"),o.setAttribute("data-spro-id",t),o.innerHTML!==e.innerHTML&&o.replaceChildren(...Array.from(e.cloneNode(!0).childNodes))}function Ga(){let o=new Map;return function(t,r){let a=ja(t,r),n=new Set,s=[];if(a){let i=[...a.querySelectorAll(Fa)].sort((c,l)=>Se.indexOf(Mr(c))-Se.indexOf(Mr(l)));for(let c of i){let l=`${r}|${Mr(c)}`;n.add(l);let d=o.get(l);d?ti(d,c,r):(d=c.cloneNode(!0),d.removeAttribute("aria-busy"),d.setAttribute("data-spro-id",r),o.set(l,d)),s.push(d)}}for(let i of Se)n.has(`${r}|${i}`)||o.delete(`${r}|${i}`);return s}}function kr(o,e){let t=ja(o,e);return t?[...t.querySelectorAll(`${Fa}, .acompanhamentoesp_icon`)].map(r=>`${r.className}|${r.getAttribute("aria-pressed")??""}|${r.getAttribute("aria-label")??""}|${r.hasAttribute("data-atraso")?1:0}|${r.querySelector('[class$="-n"]')?.textContent??""}`).join(";"):""}function Ua(o){let e=[];for(let t of Array.from(o.styleSheets??[])){let r;try{r=t.cssRules}catch{continue}for(let a of Array.from(r)){let n=a.cssText;ri.some(s=>n.includes(s))&&e.push(n)}}return e.join(`
`)}function Ba(o,e){let t=s=>s.trim().toLowerCase(),r=new Map;for(let s of e)s.nome.trim()&&!r.has(t(s.nome))&&r.set(t(s.nome),{nome:s.nome.trim(),texto:s.texto.trim().slice(0,250)});let a=new Map(o.map(s=>[t(s.nome),s])),n=[];for(let s of o)r.has(t(s.nome))||n.push({tipo:"remover",nome:s.nome});for(let[s,i]of r)a.has(s)||n.push({tipo:"adicionar",nome:i.nome,texto:i.texto});for(let[s,i]of r){let c=a.get(s);c&&c.texto.trim()!==i.texto&&n.push({tipo:"texto",nome:c.nome,texto:i.texto})}return n}function Qa(o,e,t=()=>""){let r=[...o.marcadores];for(let a of e)a.tipo==="remover"?r=r.filter(n=>n.nome!==a.nome):a.tipo==="adicionar"?r.push({nome:a.nome,cor:t(a.nome),texto:a.texto}):r=r.map(n=>n.nome===a.nome?{...n,texto:a.texto}:n);return{...o,marcadores:r}}function we(o){return o.replace(/\r\n?/g,`
`).trim().slice(0,500)}function Xa(o,e,t,r=""){let a=we(e);if(!a){let{anotacao:n,...s}=o;return s}return{...o,anotacao:{texto:a,autor:o.anotacao?.autor??r,prioridade:t}}}function Ka(o,e){if(!e){let{atribuicao:t,...r}=o;return r}return{...o,atribuicao:e}}function Pe(o,e,t,r,a){let n=new Set([o.id]);if(r)for(let s of e)n.add(s);return t.filter(s=>n.has(s.id)&&a(s))}function Cr(o,e){let t=new Set(e.marcadores.map(r=>r.nome.trim().toLowerCase()));return o.filter(r=>{let a=t.has(r.nome.trim().toLowerCase());return r.tipo==="adicionar"?!a:a})}function Me(o,e){let t=o.ownerDocument??document;for(let n of Array.from(o.querySelectorAll("dialog.spro-dialogo-grade")))n.remove();let r=p("dialog",{class:"spro-dialogo spro-dialogo-grade","aria-label":e.titulo}),a=()=>{r.open?r.close():r.remove()};return r.append(p("header",{},e.icone?p("span",{class:"spro-dialogo-icone","aria-hidden":"true"},V(e.icone,18)):null,p("h2",{},e.titulo,e.subtitulo?p("small",{class:"spro-dialogo-sub"},e.subtitulo):null),p("button",{type:"button",class:"spro-botao-icone","aria-label":"Fechar",title:"Fechar (Esc)",onclick:a},V("fechar",16))),p("div",{class:"spro-dialogo-corpo"},e.conteudo)),r.addEventListener("close",()=>{r.remove(),e.aoFechar?.()}),o.append(r),typeof r.showModal=="function"?r.showModal():r.setAttribute("open",""),r.querySelector(".spro-combo, textarea, input:not([type=checkbox])")?.focus({preventScroll:!0}),{fechar:a,dlg:r}}var ai=[[/azul_marinho|marinho/,"#1d3557"],[/azul_claro|ciano|celeste/,"#2a9fd6"],[/azul/,"#2563c9"],[/verde_escuro/,"#166534"],[/verde|lima/,"#2e9e4f"],[/amarelo/,"#e0b000"],[/laranja/,"#ee7d11"],[/vermelho/,"#d1352b"],[/rosa|magenta/,"#d6409f"],[/roxo|violeta|lilas/,"#7048c6"],[/marrom/,"#8a5a3c"],[/preto/,"#222831"],[/cinza/,"#7b838c"]];function Ko(o){let e=o.toLowerCase();return ai.find(([t])=>t.test(e))?.[1]??"#8b939c"}var si=o=>o instanceof Error?o.message:String(o);async function Or(o,e,t,r,a){let n=0,s=[],i=0;for(let c of e){let l=o.todos().find(d=>d.id===c.id)??c;o.aplicarLocal(l.id,t(l));try{await o.gravar(()=>r(l)),n+=1}catch(d){o.aplicarLocal(l.id,l),s.push(`${l.protocolo}: ${si(d)}`)}a?.(i+=1,e.length)}return{ok:n,falhas:s}}function Lr(o,e,t){e.falhas.length?o.aviso(`${t}: ${e.ok} ok, ${e.falhas.length} com erro \u2014 ${e.falhas[0]}`):o.aviso(`${t}: ${e.ok} ${e.ok===1?"processo atualizado":"processos atualizados"}.`)}function Wa(o,e,t){let r=Pe(e,o.selecionados(),o.todos(),!0,t).filter(n=>n.id!==e.id);if(!r.length)return null;let a=p("input",{type:"checkbox"});return{el:p("label",{class:"spro-rotulo-linha spro-estender"},a,` Aplicar tamb\xE9m aos ${r.length} ${r.length===1?"outro selecionado":"outros selecionados"}`),marcado:()=>a.checked,n:()=>r.length}}var Dr=(...o)=>p("div",{class:"spro-dialogo-rodape"},...o),Ir=(o="Salvar")=>p("button",{type:"button",class:"spro-botao primario"},V("check",15),o);function Za(o,e){let t=[],r=e.atribuicao?.sigla??"",a=Ao({rotulo:"Respons\xE1vel",icone:"pessoa",busca:!0,larguraLista:320,vazio:"Escolher o respons\xE1vel\u2026",opcoes:()=>[{valor:"",rotulo:"Sem respons\xE1vel",descricao:"Remove a atribui\xE7\xE3o"},...t.map(d=>({valor:d.sigla,rotulo:d.nome===d.sigla?d.sigla:d.nome,descricao:d.sigla}))],valor:[r],aoMudar:([d])=>{r=d??"",c()}}),n=Wa(o,e,()=>!0),s=Ir(),i=p("p",{class:"spro-suave"},"Carregando os usu\xE1rios da unidade\u2026"),c=()=>{s.disabled=!t.length||r===(e.atribuicao?.sigla??"")},l=Me(o.raiz,{titulo:"Respons\xE1vel",subtitulo:e.protocolo,icone:"pessoa",conteudo:p("div",{class:"spro-form"},p("label",{class:"spro-campo-rotulo"},"Atribuir a",a.el),i,n?.el??null,Dr(s))});o.extras().then(d=>{t=d.responsaveis??[],i.textContent=t.length?"":"N\xE3o foi poss\xEDvel ler os usu\xE1rios da unidade.",a.atualizar(),c()}).catch(()=>{i.textContent="N\xE3o foi poss\xEDvel ler os usu\xE1rios da unidade."}),c(),s.addEventListener("click",async()=>{let d=r?t.find(m=>m.sigla===r)??{sigla:r,nome:r}:null,g=n?.marcado()?Pe(e,o.selecionados(),o.todos(),!0,()=>!0):[e];s.disabled=!0,l.fechar(),Lr(o,await Or(o,g,m=>Ka(m,d),m=>o.atribuir(m.protocolo,d?.sigla??null)),d?`Respons\xE1vel: ${d.nome}`:"Atribui\xE7\xE3o removida")})}function Ya(o,e){let t=p("textarea",{class:"spro-campo spro-area",rows:"6",maxlength:String(500),placeholder:"Escreva a anota\xE7\xE3o deste processo\u2026","aria-label":"Anota\xE7\xE3o",value:e.anotacao?.texto??""}),r=p("input",{type:"checkbox"});r.checked=e.anotacao?.prioridade??!1;let a=p("span",{class:"spro-suave spro-contador"}),n=Ir(),s=e.anotacao?p("button",{type:"button",class:"spro-botao perigo"},V("lixeira",15),"Remover anota\xE7\xE3o"):null,i=()=>{let d=we(t.value);a.textContent=`${t.value.length}/${500}`,n.disabled=!d||d===(e.anotacao?.texto??"")&&r.checked===(e.anotacao?.prioridade??!1)};t.addEventListener("input",i),r.addEventListener("change",i);let c=Me(o.raiz,{titulo:"Anota\xE7\xE3o",subtitulo:e.protocolo,icone:"nota",conteudo:p("div",{class:"spro-form"},t,p("div",{class:"spro-linha-form"},p("label",{class:"spro-rotulo-linha"},r," Prioridade"),a),e.anotacao?.autor?p("p",{class:"spro-suave"},`\xDAltima edi\xE7\xE3o: ${e.anotacao.autor}`):null,Dr(s,n))});i();let l=async(d,g,m)=>{c.fechar(),Lr(o,await Or(o,[e],y=>Xa(y,d,g,o.autor),y=>o.anotar(y.protocolo,{texto:d,prioridade:g})),m)};n.addEventListener("click",()=>void l(we(t.value),r.checked,"Anota\xE7\xE3o salva")),s?.addEventListener("click",()=>void l("",!1,"Anota\xE7\xE3o removida"))}function on(o,e){let t=e.marcadores.map(m=>({nome:m.nome,texto:m.texto})),r=[],a=p("div",{class:"spro-marcadores-lista"}),n=Wa(o,e,m=>!m.sigiloso),s=Ir(),i=p("p",{class:"spro-suave"},"Carregando os marcadores da unidade\u2026"),c=Ao({rotulo:"Adicionar marcador",icone:"etiqueta",busca:!0,larguraLista:320,vazio:"Adicionar marcador\u2026",opcoes:()=>r.filter(m=>!t.some(y=>y.nome.toLowerCase()===m.toLowerCase())).map(m=>({valor:m,rotulo:m,cor:Ko(o.corDoMarcador(m))})),aoMudar:([m])=>{m&&(t=[...t,{nome:m,texto:""}],c.definir([],!1),d())}}),l=()=>Ba(e.marcadores,t);function d(){a.replaceChildren(...t.length?t.map((m,y)=>{let b=p("input",{type:"text",class:"spro-campo",maxlength:String(250),placeholder:"Texto do marcador (opcional)","aria-label":`Texto de ${m.nome}`,value:m.texto});return b.addEventListener("input",()=>{t[y]={...m,texto:b.value},s.disabled=!l().length}),p("div",{class:"spro-marcador-linha"},p("span",{class:"spro-marcador",title:m.nome},p("i",{style:`background:${Ko(o.corDoMarcador(m.nome))}`}),m.nome),b,p("button",{type:"button",class:"spro-botao-icone pequeno",title:`Remover ${m.nome}`,"aria-label":`Remover ${m.nome}`,onclick:()=>{t=t.filter((E,q)=>q!==y),d()}},V("fechar",13)))}):[p("p",{class:"spro-suave"},"Nenhum marcador. Adicione abaixo.")]),c.atualizar(),s.disabled=!l().length}let g=Me(o.raiz,{titulo:"Marcadores",subtitulo:e.protocolo,icone:"etiqueta",conteudo:p("div",{class:"spro-form"},a,c.el,i,n?.el??null,Dr(s))});d(),o.extras().then(m=>{r=m.marcadores??[],i.textContent=r.length?"":"N\xE3o foi poss\xEDvel ler os marcadores da unidade.",d()}).catch(()=>{i.textContent="N\xE3o foi poss\xEDvel ler os marcadores da unidade."}),s.addEventListener("click",async()=>{let m=l();if(!m.length)return;let y=n?.marcado()?Pe(e,o.selecionados(),o.todos(),!0,b=>!b.sigiloso):[e];g.fechar(),Lr(o,await Or(o,y,b=>Qa(b,Cr(m,b),o.corDoMarcador),async b=>{for(let E of Cr(m,b))E.tipo==="remover"?await o.marcar(b.protocolo,{marcador:E.nome,remover:!0}):await o.marcar(b.protocolo,{marcador:E.nome,texto:E.texto})}),"Marcadores")})}function en(o,e,t,r,a=8){let n=Math.max(1,e),s=r>0?r:n*40,i=Math.max(0,Math.min(o,Math.floor(t/n)-a)),c=Math.min(o,Math.ceil((t+s)/n)+a);return{inicio:i,fim:c,antes:i*n,depois:Math.max(0,o-c)*n}}var ke={compacta:34,confortavel:48},ii={processo:"minmax(300px, 330px)",tipo:"minmax(120px, 1.2fr)",especificacao:"minmax(200px, 2fr)",responsavel:"minmax(90px, 130px)",marcadores:"minmax(120px, 1.3fr)",prazo:"minmax(120px, 150px)",anotacao:"minmax(130px, 1.4fr)",caixa:"84px",parado:"84px",sinais:"minmax(110px, 150px)"},ci={processo:"protocolo",tipo:"tipo",responsavel:"responsavel",marcadores:"marcador",prazo:"prazo",caixa:"caixa",parado:"parado",sinais:"novo"};function li(o){let e=o.trim().split(/\s+/);return e.length>2?`${e[0]} ${e[e.length-1]}`:o}function Ce(o,e){return p("button",{type:"button",class:"spro-lapis",title:o,"aria-label":o,onclick:t=>{t.preventDefault(),t.stopPropagation(),e()}},V("lapis",13))}var oo=(o,e,t)=>p(o,{class:e},t);function pi(o,e,t,r){let a=oo("div",`spro-c spro-c-${e}`);switch(e){case"processo":{let n=r.icones(o.id),s=l=>n.find(d=>d.classList.contains(l))??p("span",{class:"spro-slot"}),i=o.acompanhamentoEspecial?p("span",{class:"spro-acomp",title:o.acompanhamentoGrupo?`Acompanhamento especial: ${o.acompanhamentoGrupo}`:"Acompanhamento especial"},V("olho",15)):p("span",{class:"spro-slot"});a.append(p("span",{class:"spro-icones"},s("spro-fav-estrela"),s("spro-prj-ic"),s("spro-dem-cx"),i));let c=p("a",{class:`spro-proc${o.naoVisualizado?" spro-novo":""}`,href:o.link??"#",title:"Abrir o processo"},o.protocolo);a.append(c),o.sigiloso&&a.append(p("span",{class:"spro-sigilo",title:"Processo sigiloso"},"sigiloso")),o.urgente&&a.append(p("span",{class:"spro-urgente",title:"Marcado como urgente"},"urgente")),o.trancado&&a.append(p("span",{class:"spro-sigilo",title:"Processo trancado"},"trancado"));break}case"tipo":a.append(oo("span","spro-corta",o.tipo)),a.title=o.tipo;break;case"especificacao":{if(a.classList.add("spro-editavel"),r.editando===o.id){let n=p("input",{type:"text",class:"spro-espec-input",maxlength:"100",value:r.rascunho,"aria-label":"Especifica\xE7\xE3o do processo"});n.addEventListener("input",()=>r.aoDigitarEspec(n.value)),n.addEventListener("keydown",l=>{l.stopPropagation(),l.key==="Enter"?r.aoSalvarEspec(o.id):l.key==="Escape"&&r.aoCancelarEspec()});let s=l=>l.preventDefault(),i=p("button",{type:"button",class:"spro-lapis spro-lapis-ok",title:"Salvar (Enter)","aria-label":"Salvar",onclick:()=>r.aoSalvarEspec(o.id)},V("check",14)),c=p("button",{type:"button",class:"spro-lapis",title:"Cancelar (Esc)","aria-label":"Cancelar",onclick:()=>r.aoCancelarEspec()},V("fechar",14));i.addEventListener("pointerdown",s),c.addEventListener("pointerdown",s),a.append(p("span",{class:"spro-edicao"},n,i,c));break}a.append(oo("span","spro-corta",o.especificacao)),a.title=o.especificacao,o.sigiloso||a.append(Ce("Editar a especifica\xE7\xE3o",()=>r.aoEditarEspec(o.id)));break}case"responsavel":a.classList.add("spro-editavel"),o.atribuicao?(a.append(oo("span","spro-corta",r.nomesCompletos?li(o.atribuicao.nome):o.atribuicao.sigla)),a.title=r.nomesCompletos?o.atribuicao.sigla:o.atribuicao.nome):a.append(p("span",{class:"spro-prazo-vazio spro-vazio-edicao"},"atribuir")),a.append(Ce(o.atribuicao?"Mudar o respons\xE1vel":"Atribuir a algu\xE9m",()=>r.aoEditar(o.id,"responsavel")));break;case"marcadores":a.classList.add("spro-editavel","spro-editavel-quebra");for(let n of o.marcadores){let s=p("span",{class:"spro-marcador",title:n.texto?`${n.nome}: ${n.texto}`:n.nome},p("i",{style:`background:${Ko(n.cor)}`}),n.nome);a.append(s)}o.sigiloso||(o.marcadores.length||a.append(p("span",{class:"spro-prazo-vazio spro-vazio-edicao"},"marcar")),a.append(Ce(o.marcadores.length?"Editar os marcadores":"Adicionar marcador",()=>r.aoEditar(o.id,"marcadores"))));break;case"prazo":{let n=no(o,t);a.classList.add("spro-editavel");let s=n?"Editar o prazo":"Definir um prazo",i=p("button",{type:"button",class:"spro-prazo-b",title:n?`${Ar(o,t)}
${n.dica}

${s}`:s,"aria-label":s,onclick:c=>{c.preventDefault(),c.stopPropagation(),r.aoAbrirPrazo(o.id)}},n?oo("span",`spro-prazo spro-prazo-${n.situacao}`,n.texto):oo("span","spro-prazo-vazio","definir"));a.append(i,p("span",{class:"spro-lapis spro-lapis-fixo","aria-hidden":"true"},V("lapis",13)));break}case"anotacao":a.classList.add("spro-editavel"),o.anotacao?(a.append(oo("span",`spro-corta${o.anotacao.prioridade?" spro-prio":""}`,o.anotacao.texto.replace(/\s*\n\s*/g," / "))),a.title=`${o.anotacao.texto}
${o.anotacao.autor}`):o.sigiloso||a.append(p("span",{class:"spro-prazo-vazio spro-vazio-edicao"},"anotar")),o.sigiloso||a.append(Ce(o.anotacao?"Editar a anota\xE7\xE3o":"Adicionar anota\xE7\xE3o",()=>r.aoEditar(o.id,"anotacao")));break;case"caixa":{let n=Ro(po(o,t));a.append(oo("span","spro-suave",n)),n&&(a.title=la);break}case"parado":{let n=Eo(o,t);a.append(oo("span","spro-suave",Ro(n))),n!==null&&(a.title="Dias desde a \xFAltima movimenta\xE7\xE3o (vis\xE3o detalhada do SEI).");break}case"sinais":for(let n of yr(o))a.append(oo("span","spro-sinal",n));break}return a}function rn(o){let e=o,t=oo("div","spro-cab"),r=oo("div","spro-corpo"),a=p("div",{class:"spro-rolagem",tabindex:"-1"},r),n=p("div",{class:"spro-tabela",role:"table"},t,a),s="",i=!1,c=!1,l=()=>`36px ${e.colunas.map(A=>ii[A]).join(" ")}`;function d(){t.replaceChildren(),t.style.gridTemplateColumns=l();let A=e.linhas.filter(L=>L.tipo==="processo"&&L.processo.naPaginaAtual).map(L=>L.processo.id),P=A.filter(L=>e.selecionados.has(L)).length,w=p("input",{type:"checkbox",class:"spro-cb","aria-label":"Marcar todos os processos vis\xEDveis",title:"Marcar todos os vis\xEDveis (desta p\xE1gina do SEI)",disabled:!A.length});w.checked=A.length>0&&P===A.length,w.indeterminate=P>0&&P<A.length,w.addEventListener("change",()=>e.aoMarcarGrupo(A,w.checked)),t.append(oo("div","spro-c spro-c-cb")),t.firstElementChild.append(w);for(let L of e.colunas){let N=ci[L],z=N?e.ordem.findIndex(v=>v.campo===N):-1,T=p("div",{class:`spro-c spro-th${N?" spro-ordenavel":""}`,role:"columnheader",...z>=0?{"aria-sort":e.ordem[z].decrescente?"descending":"ascending"}:{}});if(N){let v=p("button",{type:"button",class:"spro-th-b",title:"Ordenar (Shift acrescenta outro crit\xE9rio)",onclick:M=>e.aoOrdenar(N,M.shiftKey)},Oo[L]);z>=0&&v.append(p("span",{class:"spro-seta-ordem"},`${e.ordem[z].decrescente?"\u2193":"\u2191"}${e.ordem.length>1?z+1:""}`)),T.append(v)}else T.append(Oo[L]);t.append(T)}}function g(A,P){let w=e.selecionados.has(A.id),L=p("input",{type:"checkbox",class:"spro-cb","aria-label":`Marcar ${A.protocolo}`,disabled:!A.naPaginaAtual,title:A.naPaginaAtual?void 0:"Este processo est\xE1 em outra p\xE1gina do SEI; abra-o ou use o quadro para mover."});L.checked=w,L.addEventListener("change",()=>e.aoSelecionar(A.id,L.checked));let N=p("div",{class:`spro-linha${w?" spro-sel":""}${e.foco===A.id?" spro-foco":""}${A.urgente?" spro-linha-urgente":""}`,role:"row","data-id":A.id,"data-grupo":P});N.style.gridTemplateColumns=l(),N.style.height=`${ke[e.densidade]}px`;let z=oo("div","spro-c spro-c-cb");return z.append(L),N.append(z,...e.colunas.map(T=>pi(A,T,e.ctx,e))),N}function m(A){let P=A.grupo.itens.filter(N=>N.naPaginaAtual).map(N=>N.id),w=p("button",{type:"button",class:"spro-grupo-b","aria-expanded":String(!A.recolhido),onclick:()=>e.aoGrupo(A.grupo.chave)},p("span",{class:`spro-grupo-seta${A.recolhido?" spro-fechado":""}`},lo("seta",14)),p("span",{class:"spro-grupo-nome"},A.grupo.rotulo),p("span",{class:"spro-grupo-n"},String(A.grupo.itens.length))),L=p("div",{class:`spro-grupo${A.grupo.tom?` spro-tom-${A.grupo.tom}`:""}`,role:"row"},w);if(P.length){let N=P.every(z=>e.selecionados.has(z));L.append(p("button",{type:"button",class:"spro-link",onclick:()=>e.aoMarcarGrupo(P,!N)},N?"Desmarcar grupo":"Marcar grupo"))}return L.style.height=`${ke[e.densidade]}px`,L}function y(){let A=ke[e.densidade],P=en(e.linhas.length,A,a.scrollTop||0,a.clientHeight||0);r.style.paddingTop=`${P.antes}px`,r.style.paddingBottom=`${P.depois}px`,r.replaceChildren(...e.linhas.slice(P.inicio,P.fim).map(L=>L.tipo==="grupo"?m(L):g(L.processo,L.grupo)));let w=r.querySelector(".spro-espec-input");w&&i?(i=!1,w.focus(),w.setSelectionRange?.(w.value.length,w.value.length)):w&&w.getRootNode()instanceof ShadowRoot&&w.getRootNode().activeElement!==w&&c&&w.focus()}let b=0;a.addEventListener("scroll",()=>{if(b)return;let A=a.ownerDocument.defaultView;if(!A?.requestAnimationFrame)return y();b=A.requestAnimationFrame(()=>{b=0,y()})});function E(A){let P=A.colunas.join()!==e.colunas.join()||A.ordem!==e.ordem||A.selecionados!==e.selecionados;A.editando&&A.editando!==e.editando&&(i=!0),c=!!A.editando,e=A;let w=`${e.colunas.join()}|${e.densidade}`;if((P||w!==s)&&(d(),s=w),!e.linhas.length){r.style.paddingTop=r.style.paddingBottom="0",r.replaceChildren(p("div",{class:"spro-vazio"},"Nenhum processo corresponde ao filtro."));return}y()}function q(A){let P=e.linhas.findIndex(L=>L.tipo==="processo"&&L.processo.id===A);if(P<0)return!1;let w=ke[e.densidade];return P*w<a.scrollTop?a.scrollTop=P*w:(P+1)*w>a.scrollTop+a.clientHeight&&a.clientHeight>0&&(a.scrollTop=(P+1)*w-a.clientHeight),y(),!0}return E(o),{el:n,atualizar:E,mostrar:q,rolagem:a}}var di=[["/","Buscar"],["j / k","Linha seguinte / anterior"],["x","Marcar a linha"],["Enter","Abrir o processo"],["g t","Ver a tabela"],["g q","Ver o quadro"],["Esc","Limpar a busca ou a sele\xE7\xE3o"],["?","Esta ajuda"]],ui=[["Meus","resp:eu",{comum:"pessoa"},""],["Atrasados","prazo:atrasado",{comum:"alerta"},"perigo"],["Vencem na semana","prazo:semana",{comum:"calendario"},"aviso"],["Sem respons\xE1vel","resp:sem",{grade:"semPessoa"},""],["N\xE3o visualizados","novo:sim",{grade:"olhoFechado"},""],["Novos desde a \xFAltima visita","novo:visita",{comum:"brilho"},"novo"],["Parados h\xE1 +30 dias","parado:>30d",{comum:"historico"},""]];function tn(o){let{doc:e}=o,t=o.inicial.processos,r=No(),a=[],n="",s=new Set,i=new Set(dr(e)),c=null,l={vistoEm:{}},d,g=null,m=!1,y=!1,b="",E={},q=!1,A=!1,P,w=!1,L=wa(o.mover),N=new AbortController,z=()=>({hoje:o.hoje(),agora:o.agora(),...o.eu?{eu:o.eu}:{},...d!==void 0?{visitaAnterior:d}:{}}),T=e.createElement("div");T.id="spro-grade",T.setAttribute("data-spro-grade-host","1"),T.setAttribute("data-tema",o.escuro?"escuro":"claro");let v=T.attachShadow({mode:"open"}),M=e.createElement("style");M.textContent=o.css;let C=p("div",{class:`spro-app${o.escuro?" spro-escuro":""}`}),_=e.createElement("style");v.append(M,_,C);let $=p("input",{type:"search",class:"spro-busca",placeholder:"Buscar: texto, resp:ana, prazo:<7d, marcador:urgente...","aria-label":"Buscar processos",spellcheck:"false",autocomplete:"off"}),R=p("div",{class:"spro-chips"}),j=p("div",{class:"spro-rapidos"}),Po=p("div",{class:"spro-status",role:"status","aria-live":"polite"}),so=p("div",{class:"spro-lote",hidden:!0}),xo=p("div",{class:"spro-conteudo"}),yo=p("div",{class:"spro-painel",hidden:!0}),zr=p("div",{class:"spro-avisos","aria-live":"polite"}),Vo=p("div",{class:"spro-ajuda-atalhos",hidden:!0},p("strong",{},"Atalhos"),...di.map(([u,f])=>p("div",{},p("kbd",{},u),` ${f}`))),ln=[["protocolo","N\xFAmero do processo"],["prazo","Prazo"],["tipo","Tipo"],["responsavel","Respons\xE1vel"],["marcador","Marcador"],["caixa","Tempo na caixa"],["parado","Parado h\xE1"],["novo","N\xE3o visualizados"]],De=Ao({rotulo:"Agrupar por",icone:"camadas",classe:"spro-combo-compacto",busca:!1,vazio:"Sem agrupamento",opcoes:Object.keys(br).map(u=>({valor:u,rotulo:u==="nenhum"?"Sem agrupamento":`Agrupar: ${br[u]}`})),valor:["nenhum"],aoMudar:([u])=>B({agrupar:u??"nenhum"})}),Rr=Ao({rotulo:"Ordenar por",icone:"ordenar",classe:"spro-combo-compacto",busca:!1,vazio:"Ordem do SEI",opcoes:[{valor:"",rotulo:"Ordem do SEI"},...ln.flatMap(([u,f])=>[{valor:`${u}:a`,rotulo:`${f} \u2191`,descricao:"Crescente"},{valor:`${u}:d`,rotulo:`${f} \u2193`,descricao:"Decrescente"}])],valor:[""],aoMudar:([u])=>{let[f,x]=(u??"").split(":");B({ordem:f?[{campo:f,decrescente:x==="d"}]:[]})}}),Zo=xr([],z()),Ie=(u,f,x,h,k)=>{let O=Ao({rotulo:u,vazio:f,icone:h,classe:"spro-combo-compacto",busca:!0,larguraLista:260,opcoes:()=>k().map(I=>({valor:I.valor,rotulo:I.rotulo,contagem:I.n})),aoMudar:([I])=>{I&&(B({busca:La(r.busca,x,I)}),$.value=r.busca,O.definir([],!1))}});return O},Tr=Ie("Filtrar por respons\xE1vel","Respons\xE1vel\u2026","resp","pessoa",()=>Zo.responsaveis),Nr=Ie("Filtrar por tipo","Tipo\u2026","tipo","documento",()=>Zo.tipos),_r=Ie("Filtrar por marcador","Marcador\u2026","marcador","etiqueta",()=>Zo.marcadores),qr=(u,f)=>p("button",{type:"button",class:"spro-seg-b","data-modo":u,title:f,onclick:()=>B({modo:u})},lo(u==="tabela"?"lista":"quadro",16),p("span",{},f)),Vr=p("div",{class:"spro-seg",role:"group","aria-label":"Modo de exibi\xE7\xE3o"},qr("tabela","Tabela"),qr("quadro","Quadro")),Yo=(u,f,x,h="")=>p("button",{type:"button",class:`spro-bt ${h}`.trim(),title:f,"aria-label":f,onclick:x},lo(u,16),p("span",{},f)),Hr=Yo("colunas","Colunas",()=>$o("colunas")),pn=Yo("disquete","Vis\xF5es",()=>$o("visoes")),dn=Yo("lista","Exportar CSV",()=>yn()),un=p("button",{type:"button",class:"spro-bt spro-bt-icone",title:"Atalhos de teclado (?)","aria-label":"Atalhos de teclado",onclick:()=>{Vo.hidden=!Vo.hidden}},"?"),Fr=Yo("densidade","Densidade",()=>B({densidade:r.densidade==="compacta"?"confortavel":"compacta"})),oe=p("div",{class:"spro-quadro-cfg",hidden:!0});C.append(p("div",{class:"spro-barra"},Vr,p("div",{class:"spro-busca-caixa"},$),De.el,Rr.el,Hr,Fr,pn,dn,un),R,p("div",{class:"spro-faixa"},j,Tr.el,Nr.el,_r.el),oe,Vo,yo,Po,so,xo,zr);let jr=()=>ca(t,l),Ho=()=>Oa(jr(),r.busca,z()),$e=()=>Na(Ho(),r.ordem,z());function B(u){r={...r,...u},u.busca===void 0?o.armazem.gravarVisao(r).catch(()=>{}):mn(),Z()}let ze;function mn(){clearTimeout(ze),ze=setTimeout(()=>void o.armazem.gravarVisao(r).catch(()=>{}),400)}function eo(u,f){let x=p("div",{class:"spro-aviso",role:"status"},p("span",{},u));f&&x.append(p("button",{type:"button",class:"spro-link",onclick:()=>{f.fazer(),x.remove()}},f.rotulo)),x.append(p("button",{type:"button",class:"spro-aviso-x","aria-label":"Fechar aviso",onclick:()=>x.remove()},"\xD7")),zr.append(x),setTimeout(()=>x.remove(),f?9e3:6e3).unref?.()}function Io(u,f){let x=new Set(i);for(let h of u)f?x.add(h):x.delete(h);i=x,ya(e,x),Ne(),co()}let ee=new Map;function Mo(u,f){let x=t.find(h=>h.id===u);if(x){let h=ee.get(u)??{};for(let k of new Set([...Object.keys(x),...Object.keys(f)]))JSON.stringify(x[k])!==JSON.stringify(f[k])&&(h[k]=f[k]);ee.set(u,h)}t=t.map(h=>h.id===u?f:h)}let Gr=Promise.resolve();function fn(u){ko+=1;let f=Gr.then(u,u);return Gr=f.catch(()=>{}).finally(()=>{ko-=1}),f}let Re=null,Te={raiz:v,extras:()=>(Re??=(o.extras?o.extras().then(u=>(E=u,u)):Promise.resolve({})).catch(u=>{throw Re=null,u}),Re),todos:()=>t,selecionados:()=>i,corDoMarcador:u=>t.flatMap(f=>f.marcadores).find(f=>f.nome===u)?.cor??"",autor:o.eu??"",aplicarLocal:(u,f)=>{Mo(u,f),Z()},gravar:fn,atribuir:(u,f)=>o.mover.atribuir(u,f),marcar:(u,f)=>o.mover.marcador(u,f),anotar:(u,f)=>o.anotar(u,f),aviso:u=>eo(u)};async function gn(u,f,x){let h=t.find(G=>G.id===u);if(!h)return;let k=Va(r.quadro.colunas,h,f,x);if(!k.ok)return eo(k.motivo);let O=Object.fromEntries((E.responsaveis??[]).map(G=>[G.sigla,G.nome]));Mo(u,wr(h,k.movimento,O)),Z(),ko+=1;let I=await L.mover(k.movimento).finally(()=>{ko-=1});if(!A){if(!I.ok)return Mo(u,h),Z(),eo(`N\xE3o foi poss\xEDvel mover ${h.protocolo}: ${I.erro}`);eo(`${h.protocolo} movido.`,{rotulo:"Desfazer",fazer:()=>{let G=t.find(ro=>ro.id===u)??h;Mo(u,wr(G,I.desfazer,O)),Z(),L.mover(I.desfazer).then(ro=>{ro.ok||A||(Mo(u,G),Z(),eo(`N\xE3o foi poss\xEDvel desfazer: ${ro.erro}`))})}})}}let hn=Ga(),ko=0,re=null,te="",Ur=!1,Br=u=>({linhas:u,colunas:r.colunas,densidade:r.densidade,ctx:z(),ordem:r.ordem,selecionados:i,foco:c,icones:f=>hn(e,f),nomesCompletos:Ur,editando:re,rascunho:te,aoOrdenar:(f,x)=>B({ordem:_a(r.ordem,f,x)}),aoSelecionar:(f,x)=>Io([f],x),aoGrupo:f=>{let x=new Set(s);x.has(f)?x.delete(f):x.add(f),s=x,o.armazem.gravarRecolhidos([...x]).catch(()=>{}),co()},aoMarcarGrupo:(f,x)=>Io(f,x),aoEditarEspec:f=>{re=f,te=t.find(x=>x.id===f)?.especificacao??"",co()},aoDigitarEspec:f=>{te=f},aoCancelarEspec:()=>{re=null,co()},aoSalvarEspec:f=>void vn(f),aoAbrirPrazo:f=>o.abrirPrazo(f),aoEditar:(f,x)=>{let h=t.find(k=>k.id===f);h&&(x==="responsavel"?Za(Te,h):x==="anotacao"?Ya(Te,h):on(Te,h))}}),ae=rn(Br([]));async function vn(u){let f=t.find(h=>h.id===u),x=te.trim();if(re=null,!f||x===f.especificacao.trim())return co();if(!x)return eo("A especifica\xE7\xE3o n\xE3o pode ficar vazia."),co();Mo(u,{...f,especificacao:x}),Z(),ko+=1;try{await o.editarEspecificacao(f.protocolo,x),eo(`Especifica\xE7\xE3o de ${f.protocolo} salva.`)}catch(h){Mo(u,f),Z(),eo(`N\xE3o foi poss\xEDvel salvar a especifica\xE7\xE3o: ${h instanceof Error?h.message:String(h)}`)}finally{ko-=1}}function co(){let u=$e();if(r.modo==="quadro"){xo.replaceChildren(Ha({processos:u,cfg:r.quadro,ctx:z(),extras:E,selecionados:i,aoMover:(x,h,k)=>void gn(x,h,k),aoSelecionar:(x,h)=>Io([x],h)}));return}let f=ye(u,r.agrupar,z());ae.atualizar(Br(za(f,s,r.agrupar!=="nenhum"))),xo.firstElementChild!==ae.el&&xo.replaceChildren(ae.el)}function Qr(u){let f=[`${u} de ${t.length} processo${t.length===1?"":"s"}`],x=o.inicial.totais.recebidos+o.inicial.totais.gerados;m&&g?f.push(`carregando ${g.grupo} (${g.paginasLidas}/${g.paginasTotal})\u2026`):!y&&x>t.length&&f.push(`o SEI informa ${x}; os demais n\xE3o foram carregados`),b&&f.push(`aviso: ${b}`),Po.replaceChildren(f.join(" \xB7 ")),Po.classList.toggle("spro-status-alerta",!!b||!y&&!m&&x>t.length)}function Ne(){let u=i.size;if(so.hidden=u===0,!u)return so.replaceChildren();let f=new Set(Ho().map(h=>h.id)),x=[...i].filter(h=>!f.has(h)).length;so.replaceChildren(p("strong",{},`${u} selecionado${u===1?"":"s"}`),...x?[p("span",{class:"spro-suave"},`(${x} fora do filtro atual)`)]:[],...o.acoes().map(h=>p("button",{type:"button",class:"spro-bt",title:h.rotulo,onclick:()=>{let k=Ea(h,i.size);!k.ok&&k.motivo&&eo(k.motivo)}},p("img",{src:h.icone,alt:"",width:"16",height:"16"}),p("span",{},h.rotulo))),p("button",{type:"button",class:"spro-link",onclick:()=>Io([...i],!1)},"Limpar sele\xE7\xE3o"))}function bn(){let u=hr(r.busca);R.replaceChildren(...u.tokens.map(x=>p("span",{class:`spro-chip${x.termo.negado?" spro-chip-neg":""}`},x.texto,p("button",{type:"button","aria-label":`Remover ${x.texto}`,onclick:()=>{B({busca:vr(r.busca,x.texto)}),$.value=r.busca}},"\xD7")))),R.hidden=!u.tokens.length;let f=new Set(u.tokens.map(x=>x.texto));j.replaceChildren(...ui.map(([x,h,k,O])=>p("button",{type:"button",title:`Filtrar: ${h}`,class:`spro-rapido${O?` spro-rapido-${O}`:""}${f.has(h)?" spro-rapido-on":""}`,"aria-pressed":String(f.has(h)),onclick:()=>{B({busca:f.has(h)?vr(r.busca,h):`${r.busca} ${h}`.trim()}),$.value=r.busca}},"comum"in k?V(k.comum,14,e):lo(k.grade,14,e),x)))}function Z(){if(A)return;Zo=xr(jr(),z());for(let f of[Tr,Nr,_r])f.atualizar();De.definir([r.agrupar],!1),De.el.disabled=r.modo==="quadro",Rr.definir([r.ordem[0]?`${r.ordem[0].campo}:${r.ordem[0].decrescente?"d":"a"}`:""],!1);for(let f of Vr.querySelectorAll("[data-modo]"))f.setAttribute("aria-pressed",String(f.getAttribute("data-modo")===r.modo));Fr.title=r.densidade==="compacta"?"Linhas confort\xE1veis":"Linhas compactas",Hr.hidden=r.modo==="quadro",xn(),bn(),co(),Qr(Ho().length),Ne(),r.modo==="quadro"&&!q&&o.extras&&(q=!0,o.extras().then(f=>{E=f,A||co()}).catch(()=>{}))}function xn(){if(oe.hidden=r.modo!=="quadro",oe.hidden)return;let u=r.quadro,f=Ao({rotulo:"Colunas do quadro",icone:"mapa",classe:"spro-combo-compacto",busca:!1,opcoes:[{valor:"marcador",rotulo:"Colunas: marcador"},{valor:"responsavel",rotulo:"Colunas: respons\xE1vel"},{valor:"prazo",rotulo:"Colunas: prazo (leitura)"},{valor:"tipo",rotulo:"Colunas: tipo (leitura)"}],valor:[u.colunas],aoMudar:([k])=>{q=!1,B({quadro:{...u,colunas:k??"marcador"}})}}),x=p("input",{type:"number",min:"0",max:"99",class:"spro-num",value:String(u.limite),"aria-label":"Limite de cart\xF5es por coluna (0 = sem limite)",title:"Limite de cart\xF5es por coluna (0 = sem limite)",onchange:k=>B({quadro:{...u,limite:Math.max(0,Math.min(99,Number(k.target.value)||0))}})}),h=p("input",{type:"checkbox",onchange:k=>B({quadro:{...u,raiasPorResponsavel:k.target.checked}})});h.checked=u.raiasPorResponsavel,oe.replaceChildren(f.el,p("label",{class:"spro-rotulo-inline"},"Limite ",x),p("label",{class:"spro-rotulo-inline"},h," Raias por respons\xE1vel"),p("span",{class:"spro-suave"},u.colunas==="marcador"||u.colunas==="responsavel"?"Arraste os cart\xF5es entre as colunas.":"Esta divis\xE3o \xE9 s\xF3 de leitura."))}function $o(u){if(!yo.hidden&&yo.getAttribute("data-qual")===u){yo.hidden=!0;return}if(yo.setAttribute("data-qual",u),yo.hidden=!1,u==="colunas"){yo.replaceChildren(p("strong",{},"Colunas"),...To.map(O=>{let I=p("input",{type:"checkbox",disabled:O==="processo"});return I.checked=r.colunas.includes(O),I.addEventListener("change",()=>{let G=I.checked?To.filter(ro=>ro===O||r.colunas.includes(ro)):r.colunas.filter(ro=>ro!==O);B({colunas:G})}),p("label",{class:"spro-rotulo-linha"},I,` ${Oo[O]}`)}),p("button",{type:"button",class:"spro-link",onclick:()=>B({colunas:No().colunas})},"Restaurar padr\xE3o"));return}let f=p("input",{type:"text",class:"spro-nome",maxlength:"40",placeholder:"Nome da vis\xE3o","aria-label":"Nome da vis\xE3o"}),x=a.find(O=>O.id===n);f.value=x?.nome??"";let h=async(O,I=a)=>{a=O,await o.armazem.gravarVisoes(O,I).catch(()=>eo("N\xE3o foi poss\xEDvel sincronizar as vis\xF5es."))},k=async O=>{let I={...r,nome:f.value.trim()||"Minha vis\xE3o",id:O==="atualizar"?n:""},G=pa(a,I,o.novoId);if(!G)return eo("Limite de vis\xF5es salvas atingido.");n=G.visao.id,await h(G.lista),eo(`Vis\xE3o "${G.visao.nome}" salva.`),$o("visoes"),$o("visoes")};yo.replaceChildren(p("strong",{},"Vis\xF5es salvas"),a.length?p("ul",{class:"spro-lista-visoes"},...a.map(O=>p("li",{},p("button",{type:"button",class:`spro-link${O.id===n?" spro-ativa":""}`,onclick:()=>{n=O.id,$.value=O.busca,B({...O,id:""})}},O.nome),p("button",{type:"button",class:"spro-aviso-x","aria-label":`Excluir ${O.nome}`,title:"Excluir",onclick:async()=>{await h(da(a,O.id),a),n===O.id&&(n=""),$o("visoes"),$o("visoes")}},"\xD7")))):p("p",{class:"spro-suave"},"Nenhuma vis\xE3o salva ainda."),p("div",{class:"spro-linha-form"},f,p("button",{type:"button",class:"spro-bt",onclick:()=>void k("nova")},"Salvar como nova"),x&&ua(r,x)?p("button",{type:"button",class:"spro-bt",onclick:()=>void k("atualizar")},"Atualizar"):null))}function yn(){let u=Ia($e(),r.modo==="quadro"?[...To]:r.colunas,z());o.baixar($a(o.hoje()),fa(u),"text/csv;charset=utf-8"),eo(`${u.length-1} processos exportados.`)}$.addEventListener("input",()=>{let u=$.value;if(o.semDebounce)return B({busca:u});clearTimeout(P),P=setTimeout(()=>B({busca:u}),120)}),$.addEventListener("keydown",u=>{u.key==="Escape"&&($.value="",B({busca:""}),$.blur())});function Xr(u){if(A||u.ctrlKey||u.metaKey||u.altKey)return;let f=u.target;if(f&&(/^(input|textarea|select)$/i.test(f.tagName)||f.isContentEditable)||T.hidden)return;let h=u.key;if(w){w=!1,h==="t"?B({modo:"tabela"}):h==="q"&&B({modo:"quadro"});return}let k=$e().map(I=>I.id),O=c?k.indexOf(c):-1;if(h==="/")u.preventDefault(),$.focus();else if(h==="?")Vo.hidden=!Vo.hidden;else if(h==="g")w=!0;else if(h==="Escape")i.size&&Io([...i],!1);else if((h==="j"||h==="k")&&r.modo==="tabela"&&k.length)c=k[Math.max(0,Math.min(k.length-1,O+(h==="j"?1:-1)))],co(),ae.mostrar(c);else if(h==="x"&&c)t.find(G=>G.id===c)?.naPaginaAtual&&Io([c],!i.has(c));else if(h==="Enter"&&c){let I=t.find(G=>G.id===c)?.link;I&&e.defaultView?.location.assign(I)}}e.addEventListener("keydown",Xr);let An=Aa(e,u=>{i=u,Ne(),co()}),En=o.armazem.aoMudarVisoes(()=>void o.armazem.lerVisoes().then(u=>{a=u}).catch(()=>{})),_e=new Map;function qe(){if(A||ko>0)return;let u=zo(e),f=new Map(u.processos.map(h=>[h.id,h])),x=!1;t=t.map(h=>{if(!h.naPaginaAtual)return h;let k=f.get(h.id);if(!k)return h;let O=ee.get(h.id),I=kr(e,h.id),G=_e.get(h.id);_e.set(h.id,I);let ro=k;if(O){for(let je of Object.keys(O))JSON.stringify(k[je])===JSON.stringify(O[je])&&delete O[je];Object.keys(O).length?ro={...k,...O}:ee.delete(h.id)}let Zr=JSON.stringify(ro)===JSON.stringify(h);return Zr&&G===I?h:(x=!0,Zr?h:ro)}),x&&(Fe(),Z())}let Ve,Kr=e.defaultView?.MutationObserver,He=Kr?new Kr(()=>{clearTimeout(Ve),Ve=setTimeout(qe,o.semDebounce?0:150)}):null,Jr=e.querySelector("#frmProcedimentoControlar")??e.body;He&&Jr&&He.observe(Jr,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["aria-pressed","aria-label","onmouseover","src","href","class"]});function Fe(){let u=Ua(e);_.textContent!==u&&(_.textContent=u)}async function Sn(){if(!o.fonte)return y=!0,Wr(!0);m=!0,Z();let u=()=>o.fonte?.restaurarAoSair?.();e.defaultView?.addEventListener("pagehide",u);let f=await ta(o.inicial,o.fonte,{sinal:N.signal,aoProgresso:x=>{g=x,Qr(Ho().length)},aoPagina:x=>{t=[...t,...x],Z()}});e.defaultView?.removeEventListener("pagehide",u),m=!1,y=f.completo,f.erro&&(b=f.erro),Wr(f.completo)}function Wr(u){l=cr(l,t.map(f=>f.id),o.agora(),u),o.armazem.gravarIdade(l).catch(()=>{}),Z()}async function wn(){try{let u=await o.armazem.lerEstado();r=u.visao,s=new Set(u.recolhidos),l=ia(u.idade,o.agora()),d=l.visitaAnterior,a=await o.armazem.lerVisoes()}catch{}l=cr(l,t.map(u=>u.id),o.agora(),!1),$.value=r.busca,Fe();for(let[u]of t.map(f=>[f.id]))_e.set(u,kr(e,u));Z(),Sn();for(let u of[1200,3500])setTimeout(()=>{Fe(),qe()},u).unref?.()}return{host:T,iniciar:wn,render:Z,estado:()=>({visao:r,todos:t,selecionados:i,completo:y,carregando:m,filtrados:Ho().length}),definirVisao:u=>{r={...r,...u},$.value=r.busca,Z()},fechar(){A=!0,N.abort(),clearTimeout(P),clearTimeout(ze),clearTimeout(Ve),He?.disconnect(),e.removeEventListener("keydown",Xr),An(),En(),T.remove()},mostrar:u=>{T.hidden=!u},definirNomesCompletos:u=>{Ur=u,Z()},sincronizar:qe}}var an=`/* Dentro do Shadow DOM: o base.css do sei-comum (tokens) vem antes deste arquivo. */
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
`;var nn=`/* Na p\xE1gina do SEI (fora do Shadow DOM): o bot\xE3o alternador e o espa\xE7o da grade. */
.spro-grade-botao { display: inline-flex; align-items: center; margin-left: 4px; padding: 2px; line-height: 0; color: inherit; cursor: pointer; background: none; border: 0; border-radius: 6px; }
.spro-grade-botao:hover { background: color-mix(in srgb, currentColor 14%, transparent); }
.spro-grade-botao[aria-pressed="true"] { color: #1f5fbf; }
.spro-grade-botao:focus-visible { outline: 2px solid #1f5fbf; outline-offset: 1px; }
/* Com a grade ativa a barra de acoes sobe um pouco e ganha respiro antes da barra de ferramentas da grade. */
html[data-spro-grade] #collapseControle { margin-top: -6px; margin-bottom: 22px; }
#spro-grade { display: block; width: 100%; flex: 0 0 100%; }
#spro-grade[hidden] { display: none; }
`;var gi="gradecontrole";function hi(){return new URL(location.href).searchParams.get("acao")==="procedimento_controlar"}var Jo=()=>!!document.body?.classList.contains("dark-mode")||ot(localStorage),So=!1,W=null,wo=null,qo=null,sn=0,$r=!1,Oe=null,cn=document.readyState!=="loading";function vi(){let o=document.querySelector(ra);return document.getElementById("divTabelaProcesso")??o?.parentElement??null}function Do(o){wo?.pronta(),W?.mostrar(!1),me(document),o&&o!=="usuario"&&console.warn("[SEI Pro] Grade do controle indispon\xEDvel, usando a vis\xE3o nativa:",o)}function Le(){if(W||!So)return;let o=new pe(location.href,()=>Uo(document,location.href)),e=Ze(Uo(document,location.href)),t=e.unidade.id,r=ma({local:Ge(chrome.storage.local,"local"),sync:Ge(chrome.storage.sync,"sync")},String(t));if(["hdnRecebidosPaginaAtual","hdnGeradosPaginaAtual"].some(c=>document.getElementById(c)?.value&&document.getElementById(c).value!=="0")&&!sessionStorage.getItem("spro_grade_reset")){try{sessionStorage.setItem("spro_grade_reset","1")}catch{}sr(o.http,Uo(document,location.href)).restaurar().then(()=>location.reload()).catch(()=>Do("pagina intermediaria"));return}try{sessionStorage.removeItem("spro_grade_reset")}catch{}let n=zo(document);if(!n.processos.length&&!n.totais.recebidos&&!n.totais.gerados)return wo?.pronta(),Do("caixa vazia");let s=vi();if(!s)return Do("sem ponto de encaixe");let i=n.processos.filter(c=>!c.sigiloso&&c.naPaginaAtual).slice(0,6).map(c=>c.protocolo);W=tn({doc:document,inicial:n,agora:()=>Date.now(),hoje:()=>se(),eu:e.usuario.login||void 0,armazem:r,fonte:sr(o.http,Uo(document,location.href)),mover:{marcador:async(c,l)=>void await Ot(o,c,l,{aplicar:!0}),atribuir:async(c,l)=>void await Ct(o,c,l,{aplicar:!0})},acoes:()=>Nt(document),css:`${rt}
${an}`,escuro:Jo(),baixar:(c,l,d)=>nt(c,l,d),novoId:()=>et(),extras:i.length?async()=>{let c=async g=>{let m;for(let y of i)try{return await bt(o,g,y)}catch(b){m=b}return console.warn(`[SEI Pro] Grade: nao foi possivel ler a lista de ${g}`,m instanceof Error?m.message:m),[]},[l,d]=await Promise.all([c("marcadores"),c("usuarios")]);return{marcadores:l.map(g=>g.nome),responsaveis:d.map(g=>{let[m,...y]=g.nome.split(" - ");return{sigla:m.trim(),nome:y.join(" - ").trim()||m.trim()}})}}:void 0,aoVoltarNativa:()=>Wo(),editarEspecificacao:async(c,l)=>void await At(o,c,{especificacao:l},{aplicar:!0}),abrirPrazo:c=>{document.documentElement.setAttribute("data-spro-prazos-alvo",c),document.dispatchEvent(new CustomEvent("spro-prazos-abrir"))},anotar:async(c,l)=>void await kt(o,c,l,{aplicar:!0})}),W.definirNomesCompletos($r),s.before(W.host),bi(),W.iniciar().then(()=>{wo?.pronta(),Co(document)&&er(document)}).catch(c=>Do(String(c)))}function bi(){Oe?.disconnect();let o=window.MutationObserver,e=!1;Oe=new o(()=>{e||(e=!0,setTimeout(()=>{if(e=!1,!(!W||!So||W.host.isConnected&&!!W.host.shadowRoot&&document.querySelectorAll("#spro-grade").length===1||sn>=6)){sn+=1,W.fechar(),W=null;for(let r of document.querySelectorAll("#spro-grade"))r.remove();(Co(document)||So)&&Le()}},150))}),Oe.observe(document.body??document.documentElement,{childList:!0,subtree:!0})}function Wo(){Co(document)?(W?.mostrar(!1),me(document)):(ue(document,Jo()),W?(W.mostrar(!0),er(document)):Le()),qo?.(),qo=ge(document,()=>Co(document),Wo)}function xi(o){o!==So&&(So=o,jt(localStorage,o),o?(ue(document,Jo()),wo=rr(Do),cn&&(wo.iniciarContagem(),Le()),qo=ge(document,()=>Co(document),Wo)):(qo?.(),qo=null,Oe?.disconnect(),W?.fechar(),W=null,wo?.pronta(),me(document)))}function yi(){if(!hi())return;let o=document.createElement("style");o.textContent=nn,(document.head??document.documentElement).append(o),Ft(localStorage)&&(So=!0,ue(document,Jo()),wo=rr(Do)),Bt(document,Wo),Ht(document,Jo);let e=()=>{cn=!0,So&&(wo?.iniciarContagem(),Le(),qo??=ge(document,()=>Co(document),Wo))};document.readyState==="loading"?document.addEventListener("DOMContentLoaded",e,{once:!0}):e();let t=a=>{$r=Ue(a,"nomesusuarios"),W?.definirNomesCompletos($r),xi(Ue(a,gi))},r=!1;chrome.storage.onChanged.addListener((a,n)=>{n!=="sync"||!("dataValues"in a)||(r=!0,t(a.dataValues.newValue))}),chrome.storage.sync.get("dataValues").then(a=>{r||t(a.dataValues)}).catch(()=>{So&&Do("sem prefer\xEAncias")})}yi();})();
