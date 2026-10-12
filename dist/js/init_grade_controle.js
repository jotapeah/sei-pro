/* GERADO por grade-controle/build.mjs. NAO EDITE. Rode: npm run build */
"use strict";(()=>{function es(o){let e={};for(let[r,t]of Object.entries(o)){let a={};t&&"newValue"in t&&(a.novo=t.newValue),t&&"oldValue"in t&&(a.antigo=t.oldValue),e[r]=a}return e}function tr(o,e){return{obter:(r=null)=>o.get(r),gravar:r=>o.set(r),remover:r=>o.remove(r),chaves:typeof o.getKeys=="function"?()=>o.getKeys():void 0,aoMudar(r){let t=(a,n)=>{n===e&&r(es(a))};return chrome.storage.onChanged.addListener(t),()=>chrome.storage.onChanged.removeListener(t)}}}var ht=o=>String(o).padStart(2,"0");function To(o=new Date){return`${o.getFullYear()}-${ht(o.getMonth()+1)}-${ht(o.getDate())}`}function pe(o){let e=/^(\d{4})-(\d{2})-(\d{2})$/.exec(o);if(!e)throw new Error(`Data inv\xE1lida: ${o}`);return new Date(Number(e[1]),Number(e[2])-1,Number(e[3]),12)}function Bo(o,e){return Math.round((pe(e).getTime()-pe(o).getTime())/864e5)}function io(o){let[e,r,t]=o.split("-");return`${t}/${r}/${e}`}function bt(o,e){let r=o;if(typeof o=="string"){if(!o.trim())return;try{r=JSON.parse(o)}catch{return}}return!Array.isArray(r)||r.length===0?void 0:r.map(a=>a?.configGeral).find(Array.isArray)?.find(a=>a?.name===e)?.value}function vt(o,e){let r=bt(o,e);return!(r===!1||r===0||r==="")}function xt(o,e){let r=bt(o,e);return r===!0||r===1||r==="1"}function yt(o){try{return!!o.getItem("darkModePro")}catch{return!1}}function At(o=crypto){if(typeof o.randomUUID=="function")return o.randomUUID();let e=o.getRandomValues(new Uint8Array(16));e[6]=(e[6]??0)&15|64,e[8]=(e[8]??0)&63|128;let r=[...e].map(t=>t.toString(16).padStart(2,"0")).join("");return`${r.slice(0,8)}-${r.slice(8,12)}-${r.slice(12,16)}-${r.slice(16,20)}-${r.slice(20)}`}var Et=`/*
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
`;function d(o,e={},...r){let t=document.createElement(o);for(let[a,n]of Object.entries(e))n===void 0||n===!1||(typeof n=="function"?t.addEventListener(a.replace(/^on/,""),n):n===!0?t.setAttribute(a,""):a==="class"?t.className=n:a==="value"&&o==="textarea"?t.value=n:t.setAttribute(a,n));for(let a of r)a!=null&&a!==!1&&t.append(a);return t}var co={fill:"currentColor",stroke:"none"},St="M12 3.2l2.7 5.5 6 .9-4.35 4.25 1 6L12 17l-5.35 2.85 1-6L3.3 9.6l6-.9z",wt={estrela:[["path",{d:St}]],estrelaCheia:[["path",{d:St,fill:"currentColor"}]],alvo:[["circle",{cx:"12",cy:"12",r:"7.5"}],["circle",{cx:"12",cy:"12",r:"3.2"}]],alvoAtivo:[["circle",{cx:"12",cy:"12",r:"6.6"}],["circle",{cx:"12",cy:"12",r:"2.4",fill:"currentColor"}],["path",{d:"M12 2.2v3.4M12 18.4v3.4M2.2 12h3.4M18.4 12h3.4"}]],pasta:[["path",{d:"M3.5 7.5a2 2 0 0 1 2-2h4l2 2h7a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2z"}]],etiqueta:[["path",{d:"M3.5 12.2V4.5a1 1 0 0 1 1-1h7.7l8.3 8.3a1 1 0 0 1 0 1.4l-7.1 7.1a1 1 0 0 1-1.4 0z"}],["circle",{cx:"8",cy:"8",r:"1.4",...co}]],relogio:[["circle",{cx:"12",cy:"12",r:"9"}],["path",{d:"M12 7.2V12l3.2 1.9"}]],nota:[["path",{d:"M6 3.5h9l3.5 3.5v13.5H6z"}],["path",{d:"M9 11h6"}],["path",{d:"M9 15h6"}]],lixeira:[["path",{d:"M4.5 6.5h15"}],["path",{d:"M9.5 6.5V4.8c0-.7.6-1.3 1.3-1.3h2.4c.7 0 1.3.6 1.3 1.3v1.7"}],["path",{d:"M6.8 6.5 7.6 19c0 .8.7 1.5 1.5 1.5h5.8c.8 0 1.5-.7 1.5-1.5l.8-12.5"}]],lapis:[["path",{d:"M17.5 3.5a2.1 2.1 0 0 1 3 3L9 18l-4.5 1.5L6 15z"}],["path",{d:"M15 6l3 3"}]],fechar:[["path",{d:"M18 6 6 18"}],["path",{d:"M6 6l12 12"}]],mais:[["path",{d:"M12 5v14"}],["path",{d:"M5 12h14"}]],busca:[["circle",{cx:"11",cy:"11",r:"6.5"}],["path",{d:"M20.5 20.5l-4.8-4.8"}]],baixar:[["path",{d:"M12 3.5v11"}],["path",{d:"M7.5 10.2 12 14.7l4.5-4.5"}],["path",{d:"M4.5 19.5h15"}]],subir:[["path",{d:"M12 14.5v-11"}],["path",{d:"M7.5 7.8 12 3.3l4.5 4.5"}],["path",{d:"M4.5 19.5h15"}]],copiar:[["rect",{x:"8.5",y:"8.5",width:"12",height:"12",rx:"2"}],["path",{d:"M15.5 8.5V5.5a2 2 0 0 0-2-2h-8a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h3"}]],restaurar:[["path",{d:"M9 14 4 9l5-5"}],["path",{d:"M4 9h9a7 7 0 0 1 7 7v4"}]],check:[["path",{d:"M20 6.5 9.2 17.3 4 12.1"}]],alerta:[["path",{d:"M10.3 4.4 2.8 17.6a2 2 0 0 0 1.7 3h15a2 2 0 0 0 1.7-3L13.7 4.4a2 2 0 0 0-3.4 0z"}],["path",{d:"M12 9.5v4"}],["circle",{cx:"12",cy:"16.8",r:"1",...co}]],menu:[["circle",{cx:"5",cy:"12",r:"1.4",...co}],["circle",{cx:"12",cy:"12",r:"1.4",...co}],["circle",{cx:"19",cy:"12",r:"1.4",...co}]],alca:[["circle",{cx:"9",cy:"6",r:"1.3",...co}],["circle",{cx:"15",cy:"6",r:"1.3",...co}],["circle",{cx:"9",cy:"12",r:"1.3",...co}],["circle",{cx:"15",cy:"12",r:"1.3",...co}],["circle",{cx:"9",cy:"18",r:"1.3",...co}],["circle",{cx:"15",cy:"18",r:"1.3",...co}]],ajustes:[["path",{d:"M4 7h5"}],["path",{d:"M13 7h7"}],["circle",{cx:"11",cy:"7",r:"2.1"}],["path",{d:"M4 17h9"}],["path",{d:"M17 17h3"}],["circle",{cx:"15",cy:"17",r:"2.1"}]],setaCima:[["path",{d:"M12 19V6"}],["path",{d:"M6 12l6-6 6 6"}]],setaBaixo:[["path",{d:"M12 5v13"}],["path",{d:"M18 12l-6 6-6-6"}]],recolher:[["path",{d:"M6 15l6-6 6 6"}]],expandir:[["path",{d:"M6 9l6 6 6-6"}]],local:[["path",{d:"M12 21s-6.5-6.1-6.5-11a6.5 6.5 0 0 1 13 0c0 4.9-6.5 11-6.5 11z"}],["circle",{cx:"12",cy:"10",r:"2.3"}]],sino:[["path",{d:"M6.5 16.5V11a5.5 5.5 0 0 1 11 0v5.5l1.5 1.5h-14z"}],["path",{d:"M10 20.5a2 2 0 0 0 4 0"}]],documento:[["path",{d:"M7 3.5h7l4 4v13H7z"}],["path",{d:"M14 3.5v4h4"}]],painel:[["rect",{x:"3.5",y:"4.5",width:"17",height:"15",rx:"2"}],["path",{d:"M14.5 4.5v15"}]],atualizar:[["path",{d:"M19.5 12a7.5 7.5 0 1 1-2.2-5.3"}],["path",{d:"M19.5 4.5v4h-4"}]],nuvem:[["path",{d:"M7 18.5h10a4 4 0 0 0 .6-7.95A5.5 5.5 0 0 0 7 9.5a4.5 4.5 0 0 0 0 9z"}]],chevron:[["path",{d:"M7 9.5l5 5 5-5"}]],pino:[["path",{d:"M9.5 3.5h5l-.8 5.2 3.3 3.1v1.7H7v-1.7l3.3-3.1z"}],["path",{d:"M12 13.5v7"}]],pinoCheio:[["path",{d:"M9.5 3.5h5l-.8 5.2 3.3 3.1v1.7H7v-1.7l3.3-3.1z",fill:"currentColor"}],["path",{d:"M12 13.5v7"}]],filtro:[["path",{d:"M4 5.5h16l-6.2 7.3v5.4l-3.6 1.8v-7.2z"}]],ordenar:[["path",{d:"M7.5 4.5v15"}],["path",{d:"M4 16l3.5 3.5L11 16"}],["path",{d:"M16.5 19.5v-15"}],["path",{d:"M13 8l3.5-3.5L20 8"}]],mapa:[["path",{d:"M9 4.5 3.5 6.6v13l5.5-2.1 6 2.1 5.5-2.1v-13L15 6.6z"}],["path",{d:"M9 4.5v13"}],["path",{d:"M15 6.6v13"}]],olho:[["path",{d:"M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z"}],["circle",{cx:"12",cy:"12",r:"2.8"}]],camadas:[["path",{d:"M12 3.5 20.5 8 12 12.5 3.5 8z"}],["path",{d:"M3.5 12 12 16.5 20.5 12"}],["path",{d:"M3.5 16 12 20.5 20.5 16"}]],historico:[["path",{d:"M3.8 12.5A8.3 8.3 0 1 0 6.2 6"}],["path",{d:"M3.8 4.2v4.3h4.3"}],["path",{d:"M12 8v4.2l2.8 1.7"}]],pessoa:[["circle",{cx:"12",cy:"8",r:"3.6"}],["path",{d:"M5 20c.9-3.7 3.6-5.6 7-5.6s6.1 1.9 7 5.6"}]],predio:[["path",{d:"M5 20.5v-15a1 1 0 0 1 1-1h7.5a1 1 0 0 1 1 1v15"}],["path",{d:"M14.5 9.5H18a1 1 0 0 1 1 1v10"}],["path",{d:"M3 20.5h18"}],["path",{d:"M8.5 8.5h3"}],["path",{d:"M8.5 12h3"}],["path",{d:"M8.5 15.5h3"}]],brilho:[["path",{d:"M12 3.5l1.9 5.1 5.1 1.9-5.1 1.9L12 17.5l-1.9-5.1L5 10.5l5.1-1.9z"}],["path",{d:"M18.5 16.5v4"}],["path",{d:"M16.5 18.5h4"}]],calendario:[["rect",{x:"4",y:"5.5",width:"16",height:"15",rx:"2"}],["path",{d:"M4 10h16"}],["path",{d:"M8.5 3.5v4"}],["path",{d:"M15.5 3.5v4"}]],cadeado:[["rect",{x:"5.5",y:"10.5",width:"13",height:"10",rx:"2"}],["path",{d:"M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5"}]],saida:[["path",{d:"M14 4.5h4.5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H14"}],["path",{d:"M10 16l4-4-4-4"}],["path",{d:"M14 12H4.5"}]],planilha:[["rect",{x:"4",y:"4",width:"16",height:"16",rx:"2"}],["path",{d:"M4 9.5h16"}],["path",{d:"M4 15h16"}],["path",{d:"M10 9.5V20"}]],mover:[["path",{d:"M4.5 12h14"}],["path",{d:"M13.5 6.5 19 12l-5.5 5.5"}]],sol:[["circle",{cx:"12",cy:"12",r:"3.8"}],["path",{d:"M12 2.8v2M12 19.2v2M2.8 12h2M19.2 12h2M5.5 5.5l1.4 1.4M17.1 17.1l1.4 1.4M5.5 18.5l1.4-1.4M17.1 6.9l1.4-1.4"}]],teclado:[["rect",{x:"3",y:"6.5",width:"18",height:"11",rx:"2"}],["path",{d:"M7 10h.01M10.3 10h.01M13.7 10h.01M17 10h.01M8 14h8"}]],gantt:[["path",{d:"M4 5h9M7 12h11M4 19h7"}],["path",{d:"M3 3v18"}]],demandas:[["circle",{cx:"10",cy:"7.8",r:"3.2"}],["path",{d:"M3.8 19.5a6.2 5.2 0 0 1 11.8-2.6"}],["circle",{cx:"17.6",cy:"17.6",r:"4.2"}],["path",{d:"m15.6 17.7 1.5 1.5 2.5-3"}]]},gc=Object.keys(wt);function _(o,e=18,r=document){let t="http://www.w3.org/2000/svg",a=r.createElementNS(t,"svg"),n={viewBox:"0 0 24 24",width:String(e),height:String(e),fill:"none",stroke:"currentColor","stroke-width":"1.8","stroke-linecap":"round","stroke-linejoin":"round","aria-hidden":"true",focusable:"false",class:"spro-icone"};for(let[s,i]of Object.entries(n))a.setAttribute(s,i);for(let[s,i]of wt[o]){let c=r.createElementNS(t,s);for(let[l,p]of Object.entries(i))c.setAttribute(l,p);a.append(c)}return a}function Pt(o,e,r,t=1e4){let a=URL.createObjectURL(new Blob([e],{type:r})),n=d("a",{href:a,download:o});document.body.append(n),n.click(),n.remove(),setTimeout(()=>URL.revokeObjectURL(a),t).unref?.()}var C=class extends Error{codigo;detalhe;constructor(e,r,t){super(r),this.name="ErroSei",this.codigo=e,this.detalhe=t}paraJSON(){return{codigo:this.codigo,mensagem:this.message,detalhe:this.detalhe}}};function ar(o){if(o instanceof C)return o;if(o instanceof DOMException&&o.name==="AbortError")return new C("CANCELADO","Opera\xE7\xE3o cancelada.");let e=o instanceof Error?o.message:String(o);return new C("SEI_REDE",`Falha ao falar com o SEI: ${e}`)}var ts={AElig:198,Aacute:193,Acirc:194,Agrave:192,Aring:197,Atilde:195,Auml:196,Ccedil:199,ETH:208,Eacute:201,Ecirc:202,Egrave:200,Euml:203,Iacute:205,Icirc:206,Igrave:204,Iuml:207,Ntilde:209,Oacute:211,Ocirc:212,Ograve:210,Oslash:216,Otilde:213,Ouml:214,THORN:222,Uacute:218,Ucirc:219,Ugrave:217,Uuml:220,Yacute:221,aacute:225,acirc:226,acute:180,aelig:230,agrave:224,amp:38,apos:39,aring:229,atilde:227,auml:228,brvbar:166,bull:8226,ccedil:231,cedil:184,cent:162,copy:169,curren:164,deg:176,divide:247,eacute:233,ecirc:234,egrave:232,eth:240,euml:235,euro:8364,frac12:189,frac14:188,frac34:190,gt:62,hellip:8230,iacute:237,icirc:238,iexcl:161,igrave:236,iquest:191,iuml:239,laquo:171,ldquo:8220,lsquo:8216,lt:60,macr:175,mdash:8212,micro:181,middot:183,nbsp:160,ndash:8211,not:172,ntilde:241,oacute:243,ocirc:244,ograve:242,ordf:170,ordm:186,oslash:248,otilde:245,ouml:246,para:182,plusmn:177,pound:163,quot:34,raquo:187,rdquo:8221,reg:174,rsquo:8217,sect:167,shy:173,sup1:185,sup2:178,sup3:179,szlig:223,thorn:254,times:215,trade:8482,uacute:250,ucirc:251,ugrave:249,uml:168,uuml:252,yacute:253,yen:165,yuml:255};function G(o){return o.includes("&")?o.replace(/&(#x[0-9a-fA-F]+|#\d+|[a-zA-Z][a-zA-Z0-9]*);/g,(e,r)=>{let t=r[0]==="#"?r[1]==="x"||r[1]==="X"?parseInt(r.slice(2),16):parseInt(r.slice(1),10):ts[r];return t===void 0||Number.isNaN(t)?e:String.fromCodePoint(t)}):o}var Mt={128:8364,130:8218,131:402,132:8222,133:8230,134:8224,135:8225,136:710,137:8240,138:352,139:8249,140:338,142:381,145:8216,146:8217,147:8220,148:8221,149:8226,150:8211,151:8212,152:732,153:8482,154:353,155:8250,156:339,158:382,159:376};var kt=null;function ue(o){return kt?kt(o):new DOMParser().parseFromString(o,"text/html")}function V(o){return(o?.textContent??"").replace(/\s+/g," ").trim()}var as={n:`
`,r:"\r",t:"	",b:"\b",f:"\f",v:"\v",0:"\0"};function nr(o,e){let r=o[e],t="";for(e+=1;e<o.length;){let a=o[e];if(a==="\\"){let n=o[e+1];if(n==="u"&&/^[0-9a-fA-F]{4}$/.test(o.slice(e+2,e+6))){t+=String.fromCharCode(parseInt(o.slice(e+2,e+6),16)),e+=6;continue}t+=as[n]??n,e+=2;continue}if(a===r)return[t,e+1];t+=a,e+=1}return[t,e]}function me(o,e){let r=[],t=e;for(;t<o.length;){let a=o[t];if(a===")")return[r,t+1];if(a===","||/\s/.test(a)){t+=1;continue}if(a==='"'||a==="'"){let[i,c]=nr(o,t);r.push(i),t=c;continue}let n=/^(null|true|false|-?\d+(?:\.\d+)?)/.exec(o.slice(t,t+32));if(n){let i=n[1];r.push(i==="null"?null:i==="true"?!0:i==="false"?!1:Number(i)),t+=i.length;continue}let s=0;for(;t<o.length;){let i=o[t];if(i==="(")s+=1;else if(i===")"){if(s===0)break;s-=1}else if(i===","&&s===0)break;t+=1}r.push(null)}return[r,t]}function xo(o,e){let r=[],t=new RegExp(`\\b${e}\\(`,"g");for(let a of o.matchAll(t)){let[n]=me(o,a.index+a[0].length);r.push(n)}return r}function N(o){return typeof o=="string"?G(o):o==null?"":String(o)}var ns=/controlador(?:_ajax)?\.php\?acao=[^"'\s<>\\]*?infra_hash=[0-9a-f]{64,192}/g;function yo(o){let e=new Set;for(let r of o.replace(/&amp;/g,"&").matchAll(ns))e.add(r[0]);return[...e]}function X(o){let e=o.indexOf("?");return new URLSearchParams(e>=0?o.slice(e+1):"")}function ao(o,e,r={}){let t=Array.isArray(o)?o:yo(o);for(let a of t){let n=X(a),s=n.get("acao")??"";if(!(typeof e=="string"?s!==e:!e.test(s))&&Object.entries(r).every(([i,c])=>n.get(i)===c))return a}return null}function Ct(o,e){let r=[...o.doc.querySelectorAll("#infraMenu a[href], #main-menu a[href], .infraMenu a[href]")].map(s=>s.getAttribute("href")??"").join(`
`),t=yo(r).filter(s=>X(s).get("acao")===e),n=(t.length?t:yo(o.html).filter(s=>X(s).get("acao")===e)).sort((s,i)=>[...X(s).keys()].length-[...X(i).keys()].length)[0];if(!n)throw new C("SEI_ACAO_INDISPONIVEL",`O menu do SEI n\xE3o oferece "${e}" para este usu\xE1rio.`);return n}function ss(o){let e=new Map;for(let r of o.matchAll(/Nos\[(\d+)\]\s*=\s*new\s+infraArvoreNo\(/g)){let[t]=me(o,r.index+r[0].length);e.set(Number(r[1]),{indice:Number(r[1]),args:t,props:{}})}for(let r of o.matchAll(/Nos\[(\d+)\]\.(\w+)\s*=\s*(['"])/g)){let t=e.get(Number(r[1]));if(!t)continue;let[a]=nr(o,r.index+r[0].length-1);t.props[r[2]]=a}return[...e.values()].sort((r,t)=>r.indice-t.indice)}function is(o){let e=[];for(let r of o.matchAll(/new\s+infraArvoreAcao\(/g)){let[t]=me(o,r.index+r[0].length);e.push({tipo:N(t[0]),idPai:N(t[2]),href:N(t[3]),titulo:N(t[5]),icone:N(t[6]),extra:t[8]==null?void 0:N(t[8])})}return e}function Lt(o,e){let r=o.find(s=>s.tipo==="NIVEL_ACESSO"&&s.idPai===e);if(!r)return{nivel:"publico"};let[t,...a]=r.titulo.split(`
`);return{nivel:/sigilos/i.test(t)||/sigiloso/.test(r.icone)?"sigiloso":"restrito",hipotese:a.join(" ").trim()||void 0}}function Ot(o){return[...new Set([...o.matchAll(/<img[^>]*\btitle="([^"]+)"/g)].map(e=>N(e[1])))]}var cs=/\s*\(\d{5,}\)\s*$/;function ls(o){let e=o.html,r=ss(e),t=is(e),a=r.find(c=>c.args[0]==="PROCESSO");if(!a)throw new C("SEI_VERSAO_NAO_SUPORTADA","A \xE1rvore do processo n\xE3o tem o n\xF3 do processo.");let n=N(a.args[1]),s=Lt(t,n),i=r.filter(c=>c.args[0]==="DOCUMENTO").map(c=>{let l=N(c.args[1]),p=N(c.args[5]),f=N(c.args[7]),m=(c.props.src??"").replace(/&amp;/g,"&"),A=t.find(v=>v.tipo==="ASSINATURA"&&v.idPai===l),{nivel:E,hipotese:M}=Lt(t,l),w=(/documento_([a-z0-9]+)\.svg/.exec(f)?.[1]??"interno").replace("cancelado","interno");return{id:l,numero:N(c.args[15])||(/\((\d{5,})\)\s*$/.exec(p)?.[1]??""),titulo:p.replace(cs,""),pasta:c.args[2]&&String(c.args[2]).startsWith("PASTA")?String(c.args[2]):null,externo:/documento_download_anexo/.test(m)||!/documento_interno|documento_cancelado|formulario|email/.test(f),formato:w,nivel:E,hipotese:M,assinado:!!A,assinaturas:A?A.titulo.split(`
`).slice(1).filter(Boolean):[],cancelado:/documento_cancelado/.test(f),unidadeGeradora:t.find(v=>v.tipo==="UNIDADE_GERADORA"&&v.idPai===l)?.extra,link:N(c.args[3]).replace(/&amp;/g,"&"),src:m,acoes:yo(c.props.acoes??""),botoes:Ot(c.props.acoes??"")}});return{idProcedimento:n,protocolo:N(a.args[5])||N(a.args[15]),tipo:N(a.args[6]),nivel:s.nivel,hipotese:s.hipotese,marcadores:t.filter(c=>c.tipo==="MARCADOR"&&c.idPai===n).map(c=>c.titulo.replace(/^Marcador\n/,"").replace(/\n/g," \u2014 ")),documentos:i,acoesProcesso:yo(a.props.acoes??""),botoesProcesso:Ot(a.props.acoes??""),linkProcesso:N(a.args[3]).replace(/&amp;/g,"&"),sinais:t.filter(c=>c.idPai===n),links:yo(e),pagina:o}}async function Dt(o,e,r){let t=await o.obter(e,r);if(!/acao=procedimento_visualizar/.test(t.url)){let a=t.doc.querySelector("#ifrArvore")?.getAttribute("src");if(!a)throw new C("SEI_NAO_ENCONTRADO","N\xE3o foi poss\xEDvel abrir a \xE1rvore do processo.");t=await o.obter(a,r)}if(/infraArvoreNo\("PASTA"/.test(t.html)){let a=ao(t.html,"procedimento_visualizar")&&yo(t.html).find(n=>/abrir_pastas=1/.test(n));a&&(t=await o.obter(a,r))}return ls(t)}function Ao(o,e,r){if(r){let t=o.documentos.find(a=>a.id===r);return t?ao(t.acoes,e):null}return ao(o.acoesProcesso,e)??ao(o.links,e,{id_procedimento:o.idProcedimento})}function no(o,e,r){let t=(e??"").trim(),a=(r??"").trim();return r===void 0||t===a?[]:[{campo:o,antes:t,depois:a}]}var Qo={publico:"0",restrito:"1"},fe={0:"P\xFAblico",1:"Restrito",2:"Sigiloso"};async function Xo(o,e,r,t){let a=/controlador_ajax\.php\?acao_ajax=hipotese_legal_select[^'"]*/.exec(e.pagina.html)?.[0];return a?o.ajax(G(a),[["primeiroItemValor","null"],["primeiroItemDescricao"," "],["valorItemSelecionado",""],["staNivelAcesso",r]],{sinal:t}):e.opcoes("selHipoteseLegal").filter(n=>n.valor!=="null").map(n=>({id:n.valor,texto:n.texto}))}var zt="\xA5",sr="\xB1";function It(o){return o.map(e=>`${e.id}${sr}${e.texto}`).join(zt)}function ds(o){return o?o.split(zt).map(e=>{let[r,...t]=e.split(sr);return{id:r,texto:t.join(sr)}}):[]}function $t(o){let e=[];for(let r of o.matchAll(/new\s+infraLupaSelect\(\s*['"]([\w-]+)['"]\s*,\s*['"]([\w-]+)['"]/g))e.push([r[1],r[2]]);return e}var j=class o{constructor(e,r,t){this.http=e;this.pagina=r;this.elemento=t,this.id=t.id,this.action=(t.getAttribute("action")??"").replace(/&amp;/g,"&"),this.campos=ps(t),this.sincronizarLupas()}id;action;campos;elemento;static async abrir(e,r,t,a){let n=await e.obter(r,a);return o.de(n,t,e)}static de(e,r,t=null){let a=e.doc.querySelector(r);if(!a)throw new C("SEI_VERSAO_NAO_SUPORTADA",`A tela do SEI n\xE3o tem o formul\xE1rio esperado (${r}).`,V(e.doc.querySelector("title")));return new o(t,e,a)}pares(){return this.campos.map(e=>[e.nome,e.valor])}valor(e){return this.campos.find(r=>r.nome===e)?.valor}tem(e){return this.elemento.querySelector(`[name="${e}"]`)!==null||this.campos.some(r=>r.nome===e)}opcoes(e){let r=this.elemento.querySelector(`select[name="${e}"], select#${Rt(e)}`);return r?[...r.querySelectorAll("option")].map(t=>({valor:t.getAttribute("value")??V(t),texto:V(t),selecionada:t.hasAttribute("selected")})):[]}definir(e){for(let[r,t]of Object.entries(e)){if(t===void 0)continue;if(t===null){this.campos=this.campos.filter(n=>n.nome!==r);continue}let a=this.campos.find(n=>n.nome===r);a?a.valor=t:this.campos.push({nome:r,valor:t})}return this}escolher(e,r){let t=this.opcoes(e),a=W(r),n=t.find(s=>s.valor===r)??t.find(s=>W(s.texto)===a)??ir(t.filter(s=>W(s.texto).includes(a)));if(!n)throw new C("ARGUMENTO_INVALIDO",`"${r}" n\xE3o \xE9 uma op\xE7\xE3o de ${e}.`,t.slice(0,40).map(s=>s.texto).join(" | "));return this.definir({[e]:n.valor}),n}linhas(e){return[...this.elemento.querySelectorAll(`${e} tr`)].filter(r=>r.querySelector("input[type=checkbox]"))}itensLupa(e){let r=this.hiddenDaLupa(e);return r?ds(this.valor(r)??""):[]}definirLupa(e,r){let t=this.hiddenDaLupa(e);if(!t)throw new C("SEI_VERSAO_NAO_SUPORTADA",`A lupa ${e} n\xE3o existe nesta tela.`);return this.definir({[t]:It(r)}),this.campos=this.campos.filter(a=>a.nome!==e&&a.nome!==`${e}[]`),this}async enviar(e={}){if(!this.http)throw new C("SEI_RESPOSTA_INESPERADA","Formul\xE1rio sem transporte HTTP.");if(!this.action)throw new C("SEI_VERSAO_NAO_SUPORTADA",`O formul\xE1rio ${this.id} n\xE3o tem action.`);let r=this.pares();e.botao&&r.push(this.botaoDeEnvio(e.botao));let t=await this.http.enviar(this.action,r,e);if(e.sucesso&&!e.sucesso(t))throw new C("SEI_RESPOSTA_INESPERADA",`O SEI n\xE3o confirmou ${e.operacao??"a opera\xE7\xE3o"}.`,`${V(t.doc.querySelector("title"))} \u2014 ${t.url.replace(/infra_hash=\w+/,"infra_hash=\u2026")}`);return t}botaoDeEnvio(e){let r=this.elemento.querySelector(`[name="${e}"]`)??ir([...this.elemento.querySelectorAll('button[type="submit"][name^="sbm"], input[type="submit"][name^="sbm"]')]);return r?[r.getAttribute("name")??e,r.getAttribute("value")??V(r)??e]:[e,e]}hiddenDaLupa(e){let r=$t(this.pagina.html).find(([t])=>t===e);return r?r[1]:null}sincronizarLupas(){for(let[e,r]of $t(this.pagina.html)){let t=this.elemento.querySelector(`select#${Rt(e)}`);if(!t)continue;let a=[...t.querySelectorAll("option")].map(n=>({id:n.getAttribute("value")??"",texto:V(n)}));(this.valor(r)??"")||this.definir({[r]:It(a)}),this.campos=this.campos.filter(n=>n.nome!==e&&n.nome!==`${e}[]`)}}};function ps(o){let e=[];for(let r of o.querySelectorAll("input, select, textarea")){let t=r.getAttribute("name");if(!t||r.hasAttribute("disabled"))continue;let a=r.tagName.toLowerCase();if(a==="input"){let n=(r.getAttribute("type")??"text").toLowerCase();if(["submit","button","image","reset","file"].includes(n)||(n==="checkbox"||n==="radio")&&!r.hasAttribute("checked"))continue;e.push({nome:t,valor:r.getAttribute("value")??(n==="checkbox"||n==="radio"?"on":"")})}else if(a==="textarea")e.push({nome:t,valor:r.textContent??""});else{let n=[...r.querySelectorAll("option")],s=n.filter(l=>l.hasAttribute("selected")),i=r.hasAttribute("multiple"),c=s.length?s:!i&&n.length?[n[0]]:[];for(let l of c)e.push({nome:t,valor:l.getAttribute("value")??V(l)})}}return e}function W(o){return o.normalize("NFD").replace(/[\u0300-\u036F]/g,"").toLowerCase().replace(/\s+/g," ").trim()}function cr(o,e,r){let t=W(e),a=o.find(n=>n.id===e)??o.find(n=>W(n.texto)===t)??ir(o.filter(n=>W(n.texto).includes(t)));if(!a)throw new C("ARGUMENTO_INVALIDO",`${r} "${e}" n\xE3o encontrado(a) ou amb\xEDguo(a).`,o.slice(0,40).map(n=>n.texto).join(" | "));return a}function ir(o){return o.length===1?o[0]:void 0}function Rt(o){return o.replace(/([^\w-])/g,"\\$1")}async function us(o,e,r){let t=Ao(e,"documento_escolher_tipo");if(!t)throw new C("SEI_ACAO_INDISPONIVEL",`N\xE3o \xE9 poss\xEDvel incluir documento no processo ${e.protocolo} (fechado na unidade?).`);let a=await j.abrir(o.http,t,"#frmDocumentoEscolherTipo",{sinal:r});if(a.tem("hdnFiltroSerie")&&a.valor("hdnFiltroSerie")!=="T"){let n=await a.definir({hdnFiltroSerie:"T"}).enviar({sinal:r});a=j.de(n,"#frmDocumentoEscolherTipo",o.http)}return a}function ms(o){let e=new Map;for(let r of o.doc.querySelectorAll("[onclick*='escolher(']")){let t=/escolher\((-?\d+)\)/.exec(r.getAttribute("onclick")??"")?.[1];t&&!e.has(t)&&e.set(t,V(r))}for(let r of o.doc.querySelectorAll("a[href*='id_serie=']")){let t=X(r.getAttribute("href")??"").get("id_serie");t&&!e.has(t)&&e.set(t,V(r))}return[...e].filter(([,r])=>r).map(([r,t])=>({id:r,nome:t}))}async function Nt(o,e,r){let t=await o.arvore(e,{sinal:r});return ms((await us(o,t,r)).pagina)}var Tt={tipos_processo:{acao:"procedimento_alterar",form:"#frmProcedimentoCadastro",campo:"selTipoProcedimento"},hipoteses_legais:{acao:"procedimento_alterar",form:"#frmProcedimentoCadastro",campo:"selHipoteseLegal"},usuarios:{acao:"procedimento_atribuicao_cadastrar",form:"#frmAtividadeAtribuir",campo:"selAtribuicao"},marcadores:{acao:"andamento_marcador_gerenciar",form:"#frmAndamentoMarcadorCadastro",campo:"selMarcador"},grupos_acompanhamento:{acao:"acompanhamento_gerenciar",form:"#frmAcompanhamentoCadastro",campo:"selGrupoAcompanhamento"}};async function _t(o,e,r,t={}){let a;if(e==="tipos_documento")a=(await Nt(o,r,t.sinal)).map(s=>({id:s.id,nome:s.nome}));else{let s=Tt[e];if(!s)throw new C("ARGUMENTO_INVALIDO",`Lista desconhecida: ${e}.`,Object.keys(Tt).concat("tipos_documento").join(" | "));let i=await o.arvore(r,{sinal:t.sinal}),c=Ao(i,s.acao);if(!c)throw new C("SEI_ACAO_INDISPONIVEL",`Para listar ${e} use um processo aberto na sua unidade.`);if(e==="marcadores"&&(c=ao((await o.http.obter(c,{sinal:t.sinal,aceitarValidacao:!0})).html,"andamento_marcador_cadastrar"),!c))throw new C("SEI_VERSAO_NAO_SUPORTADA","Tela de marcadores n\xE3o reconhecida.");let l=await j.abrir(o.http,c,s.form,{sinal:t.sinal,aceitarValidacao:!0});a=e==="hipoteses_legais"?(await Xo(o,l,"1",t.sinal)).map(p=>({id:p.id,nome:p.texto})):l.opcoes(s.campo).filter(p=>p.valor&&p.valor!=="null"&&p.texto).map(p=>({id:p.valor,nome:p.texto}))}let n=t.filtro?W(t.filtro):"";return n?a.filter(s=>W(s.nome).includes(n)):a}function qt(o,e){let r=o.valor(e);return o.opcoes(e).find(t=>t.valor===r&&r!=="null")?.texto??""}async function fs(o,e,r){let t=Ao(e,"procedimento_alterar"),a=t??Ao(e,"procedimento_consultar");if(!a)throw new C("SEI_ACAO_INDISPONIVEL",`O SEI n\xE3o oferece a consulta do processo ${e.protocolo} para voc\xEA.`);return{form:await j.abrir(o,a,"#frmProcedimentoCadastro",r),editavel:!!t}}function Vt(o){return o.map(e=>e.texto).filter(Boolean)}async function Ht(o,e,r,t){let a=await o.arvore(e,{sinal:t.sinal});if(a.nivel==="sigiloso")throw new C("SEI_SIGILOSO","Processo sigiloso: o agente n\xE3o atua nele.");let{form:n,editavel:s}=await fs(o.http,a,{sinal:t.sinal});if(!s)throw new C("SEI_ACAO_INDISPONIVEL",`O processo ${a.protocolo} n\xE3o est\xE1 aberto na sua unidade.`);let i=[];if(r.especificacao!==void 0&&(i.push(...no("Especifica\xE7\xE3o",n.valor("txtDescricao"),r.especificacao)),n.definir({txtDescricao:r.especificacao.slice(0,100)})),r.tipo!==void 0){let l=qt(n,"selTipoProcedimento"),p=n.escolher("selTipoProcedimento",r.tipo);n.definir({hdnIdTipoProcedimento:p.valor}),i.push(...no("Tipo",l,p.texto))}if(r.nivel!==void 0){let l=fe[n.valor("rdoNivelAcesso")??""]??"";n.definir({rdoNivelAcesso:Qo[r.nivel]}),i.push(...no("N\xEDvel de acesso",l,fe[Qo[r.nivel]])),r.nivel==="publico"&&n.definir({selHipoteseLegal:"null"})}if(r.hipotese!==void 0){let l=qt(n,"selHipoteseLegal"),p=n.valor("rdoNivelAcesso")||Qo.restrito,f=cr(await Xo(o,n,p,t.sinal),r.hipotese,"Hip\xF3tese legal");n.definir({selHipoteseLegal:f.id}),i.push(...no("Hip\xF3tese legal",l,f.texto))}if(n.valor("rdoNivelAcesso")==="1"&&(n.valor("selHipoteseLegal")??"null")==="null")throw new C("ARGUMENTO_INVALIDO","Processo restrito exige hip\xF3tese legal. Informe a hip\xF3tese.");r.observacoes!==void 0&&(i.push(...no("Observa\xE7\xF5es da unidade",n.valor("txaObservacoes"),r.observacoes)),n.definir({txaObservacoes:r.observacoes})),r.interessados!==void 0&&(i.push(...no("Interessados",Vt(n.itensLupa("selInteressadosProcedimento")).join("; "),Vt(r.interessados).join("; "))),n.definirLupa("selInteressadosProcedimento",r.interessados));let c={alvo:a.protocolo,mudancas:i,aplicado:!1,resumo:""};return i.length?t.aplicar?(n.definir({hdnFlagProcedimentoCadastro:"2"}),await n.enviar({sinal:t.sinal,operacao:`a altera\xE7\xE3o do processo ${a.protocolo}`,sucesso:l=>X(l.url).get("acao")!=="procedimento_alterar"}),o.invalidar(a.idProcedimento),{...c,aplicado:!0,resumo:`Processo ${a.protocolo} alterado.`}):{...c,resumo:`${i.length} campo(s) a alterar.`}:{...c,resumo:"Nada a alterar: os valores j\xE1 s\xE3o esses."}}async function Ft(o,e,r){let t=await o.arvore(e,{sinal:r});if(t.nivel==="sigiloso")throw new C("SEI_SIGILOSO","Processo sigiloso: o agente n\xE3o atua nele.");return t}function Gt(o,e,r){let t=Ao(o,e);if(!t)throw new C("SEI_ACAO_INDISPONIVEL",`"${r}" n\xE3o est\xE1 dispon\xEDvel no processo ${o.protocolo} (processo fechado na unidade ou sem permiss\xE3o).`);return t}var Ut=o=>e=>X(e.url).get("acao")!==o;async function gs(o,e,r,t){let a=await o.http.obter(Gt(e,r.acao,r.nomeAcao),{sinal:t,aceitarValidacao:!0});if(a.doc.querySelector(r.form))return j.de(a,r.form,o.http);let n=(r.formularios??[]).map(s=>ao(a.html,s)).find(Boolean);if(!n)throw new C("SEI_VERSAO_NAO_SUPORTADA",`A tela "${r.nomeAcao}" n\xE3o tem o formul\xE1rio esperado.`);return j.abrir(o.http,n,r.form,{sinal:t,aceitarValidacao:!0})}async function Bt(o,e,r,t){let a=await Ft(o,e,t.sinal),n=await gs(o,a,r,t.sinal),s=r.preparar(n),i={alvo:a.protocolo,mudancas:s,aplicado:!1,resumo:""};return s.length?t.aplicar?(await n.enviar({sinal:t.sinal,botao:r.botao,operacao:`${r.nomeAcao} em ${a.protocolo}`,sucesso:r.sucesso??Ut(r.acao)}),o.invalidar(a.idProcedimento),{...i,aplicado:!0,resumo:r.resumo(a.protocolo).replace(/^Vai /,"")}):{...i,resumo:r.resumo(a.protocolo)}:{...i,resumo:"Nada a alterar: j\xE1 est\xE1 assim."}}function Qt(o,e,r,t){return Bt(o,e,{acao:"anotacao_registrar",nomeAcao:"Anota\xE7\xF5es",form:"#frmAnotacaoCadastro",botao:"sbmRegistrarAnotacao",preparar:a=>{let n=r.texto.slice(0,500),s=no("Anota\xE7\xE3o",a.valor("txaDescricao"),n),i=a.valor("chkSinPrioridade")?"sim":"n\xE3o",c=n?r.prioridade===void 0?i:r.prioridade?"sim":"n\xE3o":"n\xE3o";return a.definir({txaDescricao:n,chkSinPrioridade:c==="sim"?"on":null}),[...s,...no("Prioridade",i,c)]},resumo:a=>r.texto?`Anota\xE7\xE3o definida em ${a}.`:`Anota\xE7\xE3o removida de ${a}.`},t)}function Xt(o,e,r,t){return Bt(o,e,{acao:"procedimento_atribuicao_cadastrar",nomeAcao:"Atribuir Processo",form:"#frmAtividadeAtribuir",botao:"sbmSalvar",preparar:a=>{let n=a.opcoes("selAtribuicao").find(l=>l.valor===a.valor("selAtribuicao")&&l.valor!=="null")?.texto??"";if(r===null)return a.definir({selAtribuicao:"null"}),[{campo:"Atribui\xE7\xE3o",antes:n||"(atribui\xE7\xE3o atual)",depois:"(nenhuma)"}];let s=W(r),i=a.opcoes("selAtribuicao").filter(l=>l.valor!=="null"),c=i.find(l=>l.valor===r)??i.find(l=>W(l.texto.split(" - ")[0])===s)??i.find(l=>W(l.texto.split(" - ").slice(1).join(" - "))===s)??(i.filter(l=>W(l.texto).includes(s)).length===1?i.find(l=>W(l.texto).includes(s)):void 0);if(!c)throw new C("ARGUMENTO_INVALIDO",`Usu\xE1rio "${r}" n\xE3o encontrado (ou amb\xEDguo) na unidade.`,i.map(l=>l.texto).join(" | "));return a.definir({selAtribuicao:c.valor}),no("Atribui\xE7\xE3o",n,c.texto)},resumo:a=>r?`Processo ${a} atribu\xEDdo.`:`Atribui\xE7\xE3o removida de ${a}.`},t)}async function hs(o,e,r){let t=Gt(e,"andamento_marcador_gerenciar","Gerenciar Marcador");return o.http.obter(t,{sinal:r,aceitarValidacao:!0})}function jt(o){return[...o.doc.querySelectorAll("#tblMarcadores tr")].filter(r=>r.querySelector("input[type=checkbox]")).map(r=>{let t=[...r.querySelectorAll("td")];return{id:r.querySelector("input[type=checkbox]")?.getAttribute("value")??"",marcador:V(t[1]),texto:V(t[2]),usuario:V(t[3]),data:V(t[4])}})}async function Kt(o,e,r,t){let a=await Ft(o,e,t.sinal),n=await hs(o,a,t.sinal),s=jt(n),i=W(r.marcador),c=s.find(m=>W(m.marcador)===i),l={alvo:a.protocolo,mudancas:[],aplicado:!1,resumo:""};if(r.remover){if(!c)return{...l,resumo:`O processo ${a.protocolo} n\xE3o tem o marcador "${r.marcador}".`};if(l.mudancas=[{campo:"Marcador",antes:`${c.marcador}${c.texto?`: ${c.texto}`:""}`,depois:""}],!t.aplicar)return{...l,resumo:`Vai remover o marcador "${c.marcador}" de ${a.protocolo}.`};let m=ao(n.html,"andamento_marcador_remover");if(!m)throw new C("SEI_ACAO_INDISPONIVEL","A tela de marcadores n\xE3o oferece remo\xE7\xE3o.");let A=j.de(n,"#frmGerenciarMarcador",o.http);A.definir({hdnInfraItemId:c.id,hdnInfraItensSelecionados:c.id});let E=await o.http.enviar(m,A.pares(),{sinal:t.sinal,aceitarValidacao:!0});if(jt(E).some(M=>M.id===c.id))throw new C("SEI_RESPOSTA_INESPERADA",`O SEI n\xE3o removeu o marcador "${c.marcador}".`);return o.invalidar(a.idProcedimento),{...l,aplicado:!0,resumo:`Marcador "${c.marcador}" removido de ${a.protocolo}.`}}let p;if(n.doc.querySelector("#frmAndamentoMarcadorCadastro"))p=j.de(n,"#frmAndamentoMarcadorCadastro",o.http);else{let m=ao(n.html,"andamento_marcador_cadastrar");if(!m)throw new C("SEI_VERSAO_NAO_SUPORTADA","Esta vers\xE3o do SEI n\xE3o tem a tela de marcadores esperada (4.1 ou superior).");p=await j.abrir(o.http,m,"#frmAndamentoMarcadorCadastro",{sinal:t.sinal})}let f=p.escolher("selMarcador",r.marcador);return p.definir({hdnIdMarcador:f.valor,txaTexto:(r.texto??c?.texto??"").slice(0,250)}),l.mudancas=c?no(`Texto do marcador ${f.texto}`,c.texto,r.texto):[{campo:"Marcador",antes:"",depois:`${f.texto}${r.texto?`: ${r.texto}`:""}`}],l.mudancas.length?t.aplicar?(await p.enviar({sinal:t.sinal,botao:"sbmSalvar",operacao:`o marcador em ${a.protocolo}`,sucesso:Ut("andamento_marcador_cadastrar")}),o.invalidar(a.idProcedimento),{...l,aplicado:!0,resumo:`Marcador "${f.texto}" aplicado em ${a.protocolo}.`}):{...l,resumo:`Vai marcar ${a.protocolo} com "${f.texto}".`}:{...l,resumo:"Nada a alterar: o marcador j\xE1 est\xE1 assim."}}var bs={"\u2010":"-","\u2011":"-","\u2012":"-","\u2013":"-","\u2014":"-","\u2015":"-","\u2212":"-","\u2018":"'","\u2019":"'","\u201A":"'","\u201B":"'","\u2032":"'","\u201C":'"',"\u201D":'"',"\u201E":'"',"\u201F":'"',"\u2033":'"',"\u2026":"...","\u2022":"-","\u2002":" ","\u2003":" ","\u2009":" ","\u202F":" ","\u205F":" ","\u200B":"","\u200C":"","\u200D":"","\u2060":"","\uFEFF":"","\u20AC":"EUR","\u2122":"(TM)","\u2192":"->","\u2190":"<-"};function Jt(o,e="texto"){let r="";for(let t of o){let a=t.codePointAt(0);if(a<=255){r+=t;continue}let n=bs[t];if(e==="html"){r+=n===""?"":`&#${a};`;continue}if(n!==void 0){r+=n;continue}let s=t.normalize("NFKD").replace(/[\u0300-\u036F]/g,"");r+=[...s].every(i=>i.codePointAt(0)<=255)?s:""}return r}var vs=/[A-Za-z0-9\-_.*]/;function Wt(o){let e="";for(let r of o)r===" "?e+="+":vs.test(r)?e+=r:e+="%"+r.charCodeAt(0).toString(16).toUpperCase().padStart(2,"0");return e}function Zt(o,e={}){return o.map(([r,t])=>{let a=e[r]??"texto";return`${Wt(Jt(r))}=${Wt(Jt(t??"",a))}`}).join("&")}function lr(o){let e=o instanceof Uint8Array?o:new Uint8Array(o),r=[],t=16384;for(let a=0;a<e.length;a+=t){let n=e.subarray(a,a+t),s=new Array(n.length);for(let i=0;i<n.length;i+=1)s[i]=Mt[n[i]]??n[i];r.push(String.fromCharCode(...s))}return r.join("")}var Yt="application/x-www-form-urlencoded; charset=ISO-8859-1";function oa(o,e,r){let t=null;return{url:o,status:e,html:r,get doc(){return t??=ue(r)}}}function ea(o,e={}){if(/\/login\.php/i.test(o.url)||/[?&]acao=(?:infra_)?sair\b/.test(o.url))throw new C("SEI_SESSAO_EXPIRADA","A sess\xE3o do SEI foi encerrada. Fa\xE7a login de novo no SEI e repita o pedido.");if(o.status>=500)throw new C("SEI_EXCECAO",`O SEI respondeu com erro ${o.status}.`);if(o.html.includes('id="divInfraExcecao"')){let r=o.doc.querySelector("#divInfraExcecao");if(r){let t=V(r);throw new C("SEI_EXCECAO",t||"O SEI exibiu uma p\xE1gina de erro.",t)}}if(!e.aceitarValidacao&&o.html.includes("txaInfraValidacao")){let r=o.doc.querySelector("#txaInfraValidacao")?.textContent?.trim()??"";if(r)throw new C("SEI_VALIDACAO",r,r)}return o}function ra(o,e={}){let r=new URL(".",o),t=e.fetch??((...f)=>fetch(...f)),a=Math.max(1,e.concorrencia??3),n=0,s=[];async function i(f){n>=a&&await new Promise(m=>s.push(m)),n+=1;try{return await f()}finally{n-=1,s.shift()?.()}}let c=f=>new URL(f.replace(/&amp;/g,"&"),r).href;async function l(f,m,A){return i(async()=>{try{let E=await t(c(f),{credentials:"same-origin",redirect:"follow",...m,signal:A.sinal}),M=lr(await E.arrayBuffer());return ea(oa(E.url||c(f),E.status,M),A)}catch(E){throw ar(E)}})}async function p(f,m={}){return i(async()=>{try{let A=await t(c(f),{credentials:"same-origin",redirect:"follow",signal:m.sinal}),E=new Uint8Array(await A.arrayBuffer()),M=(A.headers?.get("content-type")??"").split(";")[0].trim().toLowerCase();M==="text/html"&&ea(oa(A.url||c(f),A.status,lr(E)),m);let w=A.headers?.get("content-disposition")??"",v=decodeURIComponent(/filename\*=UTF-8''([^;]+)/i.exec(w)?.[1]??/filename="?([^";]+)"?/i.exec(w)?.[1]??"");return{bytes:E,tipo:M,nome:v}}catch(A){throw ar(A)}})}return{base:r,absoluta:c,baixar:p,obter:(f,m={})=>l(f,{method:"GET"},m),enviar:(f,m,A={})=>l(f,{method:"POST",headers:{"Content-Type":Yt},body:Zt(m,A.modos)},A)}}function xs(o){let e=/Sistema Eletr(?:\u00F4|&ocirc;|\\u00F4)nico de Informa[^"]*?Vers(?:\u00E3|&atilde;)o\s*([\d.]+)/i.exec(o);return e?e[1]:/\.(?:js|svg|css)\?(\d+\.\d+\.\d+)-/.exec(o)?.[1]??""}function ys(o){let e=o.doc.querySelector("#lnkInfraUnidade")?.getAttribute("onclick")??"",r=/infra_unidade_atual=(\d+)/.exec(e)?.[1];if(r)return r;let t=/[?&]infra_unidade_atual=(\d+)/.exec(o.url)?.[1];return t||(o.doc.querySelector("#selInfraUnidades option[selected]")?.getAttribute("value")??"")}function dr(o){let e=o.doc,r=e.querySelector("#lnkInfraUnidade"),t=e.querySelector("#lnkUsuarioSistema")?.getAttribute("title")??"",[,a="",n="",s=""]=/^(.*?)\s*\(([^/)]+)(?:\/([^)]+))?/.exec(t)??[],i=xs(o.html);return{host:new URL(o.url).host,versao:i,maior:Number(i.split(".")[0])||0,unidade:{id:ys(o),sigla:V(r)||V(e.querySelector("#selInfraUnidades option[selected]")),nome:r?.getAttribute("title")??""},usuario:{nome:a.trim(),login:n.trim(),orgao:s.trim()}}}var As=3e4,ge=class{constructor(e,r=null,t){this.paginaViva=r;this.http=ra(e,t)}http;paginaBase=null;arvores=new Map;localizados=new Map;base(){let e=this.paginaViva?.();if(e&&e.html.includes("frmProtocoloPesquisaRapida"))return e;if(this.paginaBase)return this.paginaBase;if(e)return e;throw new C("SEI_NAO_ENCONTRADO","Abra uma tela do SEI (por exemplo, Controle de Processos) nesta aba.")}contexto(){return dr(this.base())}linkMenu(e){return Ct(this.base(),e)}async renovarBase(e){return this.paginaBase=await this.http.obter(this.linkMenu("procedimento_controlar"),e),this.arvores.clear(),this.localizados.clear(),this.paginaBase}async localizar(e,r){let t=e.trim();if(!t)throw new C("ARGUMENTO_INVALIDO","Informe o n\xFAmero do processo ou o n\xBA SEI do documento.");let a=this.localizados.get(t);if(a)return a;let n=j.de(this.base(),"#frmProtocoloPesquisaRapida",this.http);n.definir({txtPesquisaRapida:t});let s=await n.enviar(r),i=X(s.url);if(i.get("acao")!=="procedimento_trabalhar")throw new C("SEI_NAO_ENCONTRADO",`Nada encontrado no SEI para "${t}", ou voc\xEA n\xE3o tem acesso a ele.`);let c=s.doc.querySelector("#ifrArvore")?.getAttribute("src");if(!c)throw new C("SEI_VERSAO_NAO_SUPORTADA","A tela do processo n\xE3o trouxe a \xE1rvore.");let p=X(G(c)).get("id_procedimento")??"",f=i.get("id_protocolo")??"",m={idProcedimento:p,idDocumento:f&&f!==p?f:void 0,linkArvore:G(c)};return this.localizados.set(t,m),m}async arvore(e,r={}){let t=await this.localizar(e,r),a=this.arvores.get(t.idProcedimento);if(a&&!r.forcar&&Date.now()-a.quando<As)return a.arvore;let n=await Dt(this.http,t.linkArvore,r);return this.arvores.set(t.idProcedimento,{quando:Date.now(),arvore:n}),n}invalidar(e){e?this.arvores.delete(e):this.arvores.clear()}async ajax(e,r,t){let a=await this.http.enviar(e,r,{...t,aceitarValidacao:!0}),n=[];for(let s of a.html.matchAll(/<option[^>]*value="([^"]*)"[^>]*>([^<]*)<\/option>/g))n.push({id:G(s[1]),texto:G(s[2]).trim()});for(let s of a.html.matchAll(/<item\s+([^>]*)>/g)){let i=ue(`<i ${s[1]}></i>`).querySelector("i");n.push({id:i?.getAttribute("id")??"",texto:i?.getAttribute("descricao")??i?.getAttribute("complemento")??""})}return n.filter(s=>s.id&&s.id!=="null")}};function Ko(o,e=o.location?.href??"https://sei.invalido/sei/controlador.php"){return{url:e,status:200,get html(){return o.documentElement.outerHTML},doc:o}}var ta={recebidos:"Recebidos",gerados:"Gerados",detalhado:"Detalhado"},Lo=(o,e)=>`${o}:${e}`;function aa(o,e,r="resumida"){let t={},a=r==="detalhada"?["detalhado"]:["recebidos","gerados"];for(let n of a){let s=n==="detalhado"?[...o]:o.filter(f=>f.grupo===n);if(!s.length)continue;let i=[...new Set(s.map(f=>f.pagina))].sort((f,m)=>f-m),c=n==="detalhado"?"na lista":`em ${ta[n]}`;if(i.length>1){let f=i.map(m=>m+1).join(" e ");return{ok:!1,motivo:`O SEI s\xF3 aceita, de uma vez, processos de uma mesma p\xE1gina ${c} (marcados nas p\xE1ginas ${f}). Deixe s\xF3 uma p\xE1gina marcada.`}}let l=i[0],p=e.get(Lo(n,l));if(!p?.itens||!p.hash)return{ok:!1,motivo:`Os dados da p\xE1gina ${l+1} ainda n\xE3o foram lidos. Espere o carregamento terminar.`};t[n]={ids:s.map(f=>f.id),pagina:l,selecao:p}}return{ok:!0,plano:{porGrupo:t,todosNaPaginaAtual:o.every(n=>n.naPaginaAtual)}}}function Es(o){let e={},r=o.porGrupo.detalhado?["detalhado"]:["recebidos","gerados"];for(let t of r){let a=o.porGrupo[t],n=ta[t];if(e[`hdn${n}ItemId`]="",!a){e[`hdn${n}ItensSelecionados`]="";continue}e[`hdn${n}ItensSelecionados`]=a.ids.join(","),e[`hdn${n}Itens`]=a.selecao.itens,e[`hdn${n}ItensHash`]=a.selecao.hash}return e}function na(o,e,r){let t=o.getElementById("frmProcedimentoControlar");if(!t)throw new Error("Formul\xE1rio do Controle de Processos n\xE3o encontrado.");let a=o.createElement("form");a.setAttribute("method","post"),a.setAttribute("action",e),a.style.display="none";let n=new Map;for(let s of Array.from(t.querySelectorAll("input, select, textarea")))!s.name||s.disabled||s.type==="checkbox"||s.type==="radio"||s.type==="button"||s.type==="submit"||n.set(s.name,s.value);for(let[s,i]of Object.entries(Es(r)))n.set(s,i);for(let[s,i]of n){let c=o.createElement("input");c.setAttribute("type","hidden"),c.setAttribute("name",s),c.setAttribute("value",i),a.append(c)}o.body.append(a),a.submit()}var sa=o=>o.some(e=>e.sigiloso);var Ss='a[onclick*="acaoControleProcessos"]';function ia(o){let e=/acaoControleProcessos\(\s*'([^']*)'\s*,\s*(true|false)\s*,\s*(true|false)/.exec(o.elemento.getAttribute("onclick")??"");return e?{url:e[1].replace(/&amp;/g,"&"),requerSelecao:e[2]==="true",aceitaSigiloso:e[3]==="true"}:null}function ca(o){let e=new Set,r=[];for(let t of o.querySelectorAll(Ss)){let a=/[?&]acao=([a-z0-9_]+)/.exec(t.getAttribute("onclick")??"")?.[1],n=t.querySelector("img");if(!a||!n||e.has(a))continue;e.add(a);let s=n.getAttribute("title")||n.getAttribute("alt")||a,i=n.getAttribute("src")??"";try{i=new URL(i,o.baseURI||o.location?.href).href}catch{}r.push({acao:a,rotulo:s,icone:i,elemento:t})}return r}var ws="data-spro-recolhido",Ps=".collapseTabelaProcesso";function Ms(o){let e=[...o.querySelectorAll(Ps)].filter(r=>r.id!=="spro-grade");return e.length>0&&e.some(r=>r.classList.contains("displayNone"))}function la(o,e,r=o.defaultView?.MutationObserver){let t=()=>e.toggleAttribute(ws,Ms(o));if(t(),!r)return()=>{};let a=new r(t);return a.observe(o.body??o.documentElement,{attributes:!0,attributeFilter:["class"],subtree:!0}),()=>a.disconnect()}var ks=/^\s*\[( |x|X)\]\s?(.*)$/;function Jo(o){return o.replace(/\r\n?/g,`
`).split(`
`).map(e=>{let r=ks.exec(e);return r?{marca:r[1]!==" ",texto:r[2]}:{marca:null,texto:e}})}function da(o){return o.map(e=>e.marca===null?e.texto:`${e.marca?"[X]":"[ ]"} ${e.texto}`).join(`
`)}function pr(o,e){let r=new Set(e.filter(a=>a>=0&&a<o.length));if(!r.size)return[...o];let t=[...r].every(a=>o[a].marca!==null);return o.map((a,n)=>r.has(n)?{...a,marca:t?null:a.marca??!1}:a)}function pa(o,e){return o.map((r,t)=>t===e&&r.marca!==null?{...r,marca:!r.marca}:r)}function ua(o){return Jo(o).filter(e=>e.marca!==null||e.texto.trim()).map(e=>e.marca===null?e.texto:`${e.marca?"\u2611":"\u2610"} ${e.texto}`).join(" / ")}var be="data-tip",ma="data-tip-nota",Cs="data-tip-autor",he=0,Ls=`
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
`,fa=o=>o.nodeType===1,Os=o=>o.some(e=>fa(e)&&(e.id==="spro-grade"||e.classList.contains("spro-grade-botao")));function ur(o){if(!Os(o))return null;for(let e of o)if(fa(e)){if(e.id==="spro-grade")return null;if(e.hasAttribute(be)||e.hasAttribute(ma)||e.hasAttribute("title"))return e}return null}function Oo(o){let e=o.getAttribute("title");return e&&(o.hasAttribute(be)||o.setAttribute(be,e),!o.hasAttribute("aria-label")&&!(o.textContent??"").trim()&&o.setAttribute("aria-label",e.split(`
`)[0]),o.removeAttribute("title")),o.getAttribute(be)??""}function Ds(o,e,r){let t=o.ownerDocument,a=t.createElement("div");a.className="nota";for(let n of Jo(e)){if(n.marca===null&&!n.texto.trim())continue;let s=t.createElement("div");s.className="nota-l",n.marca!==null&&s.setAttribute("data-t",n.marca?"x":"o"),s.textContent=n.texto,a.append(s)}if(r){let n=t.createElement("div");n.className="nota-autor",n.textContent=r,a.append(n)}o.replaceChildren(a)}var mr=null;function ga(o){let e=a=>{if(a.nodeType!==1)return;let n=a;n.hasAttribute("title")&&Oo(n);for(let s of Array.from(n.querySelectorAll("[title]")))Oo(s)};if(e(o.nodeType===11?o.host:o),o.nodeType===11)for(let a of Array.from(o.querySelectorAll("[title]")))Oo(a);let r=(o.ownerDocument??o).defaultView?.MutationObserver;if(!r)return()=>{};let t=new r(a=>{for(let n of a)if(n.type==="attributes")e(n.target);else for(let s of Array.from(n.addedNodes))e(s);mr?.()});return t.observe(o,{attributes:!0,attributeFilter:["title"],childList:!0,subtree:!0}),()=>t.disconnect()}function Is(o){let e=[],r=o;for(;r;)e.push(r),r=r.nodeType===11?r.host??null:r.parentNode;return e}function $s(o,e,r){let a=o.bottom+8,n=!1;a+e.altura>r.h-4&&o.top-8-e.altura>=4&&(a=o.top-8-e.altura,n=!0);let s=o.left+o.width/2-e.largura/2;return s=Math.max(4,Math.min(s,r.w-e.largura-4)),{x:Math.round(s),y:Math.round(Math.max(4,a)),acima:n}}function ha(o,e=()=>!1){let r=o.defaultView;if(!r)return()=>{};let t=o.createElement("div");t.id="spro-dica-host";let a=t.attachShadow({mode:"open"}),n=o.createElement("style");n.textContent=Ls;let s=o.createElement("div");s.className="dica",s.setAttribute("role","tooltip"),s.hidden=!0,s.setAttribute("popover","manual"),a.append(n,s),o.documentElement.append(t);let i=null,c,l=!1,p=null;function f(){clearTimeout(c),i=null,l=!1,s.classList.remove("on"),s.hidden=!0;try{s.matches?.(":popover-open")&&s.hidePopover()}catch{}}function m(){if(!i||!i.isConnected)return E();let S=i.getAttribute(ma),y=S!==null?S:Oo(i);if(!y)return f();S!==null?Ds(s,S,i.getAttribute(Cs)??""):s.textContent=y,s.classList.toggle("claro",!e()),s.hidden=!1;try{typeof s.showPopover=="function"&&!s.matches(":popover-open")&&s.showPopover()}catch{}let P=i.getBoundingClientRect(),R=s.getBoundingClientRect(),$=$s(P,{largura:R.width,altura:R.height},{w:r.innerWidth,h:r.innerHeight});s.style.left=`${$.x}px`,s.style.top=`${$.y}px`,s.classList.add("on"),l=!0}function A(S,y){let P=o.elementFromPoint(S,y);for(let R=0;R<4&&P?.shadowRoot;R++){let $=P.shadowRoot.elementFromPoint(S,y);if(!$||$===P)break;P=$}return P}function E(){if(!p)return f();let S=A(p.x,p.y),y=S?ur(Is(S)):null;if(y===i&&i?.isConnected)return;let P=l;f(),y&&(Oo(y),i=y,P||he===0?m():c=setTimeout(m,he))}mr=()=>{i&&!i.isConnected&&E()};let M=S=>{let y=S;typeof y.clientX=="number"&&(p={x:y.clientX,y:y.clientY});let P=ur(S.composedPath());P===i&&i?.isConnected||(f(),P&&(Oo(P),i=P,he>0?c=setTimeout(m,he):m()))},w=S=>{let y=ur(S.composedPath());!y||!y.matches?.(":focus-visible")||(f(),Oo(y),i=y,m())},v=()=>f();return o.addEventListener("pointerover",M,!0),o.addEventListener("mouseover",M,!0),o.addEventListener("pointermove",M,!0),o.addEventListener("mousemove",M,!0),o.addEventListener("focusin",w,!0),o.addEventListener("focusout",f,!0),o.addEventListener("pointerdown",f,!0),o.addEventListener("keydown",f,!0),o.addEventListener("scroll",f,!0),o.documentElement.addEventListener("pointerleave",v),()=>{f(),mr=null,o.removeEventListener("pointerover",M,!0),o.removeEventListener("mouseover",M,!0),o.removeEventListener("pointermove",M,!0),o.removeEventListener("mousemove",M,!0),o.documentElement.removeEventListener("pointerleave",v),o.removeEventListener("focusin",w,!0),o.removeEventListener("focusout",f,!0),o.removeEventListener("pointerdown",f,!0),o.removeEventListener("keydown",f,!0),o.removeEventListener("scroll",f,!0),t.remove()}}var oo="data-spro-grade",uo="data-spro-grade-pronta",Wo="data-spro-grade-escuro",fr="spro_grade",gr="spro-grade-pre";var Rs="#tblProcessosRecebidos, #tblProcessosGerados, #tblProcessosDetalhado";function zs(){let o=Rs.split(", ").map(t=>`html[${oo}] ${t}`).join(`,
`),e=`html[${oo}]:not([${uo}]) #divTabelaProcesso::before,
html[${oo}]:not([${uo}]) #frmProcedimentoControlar:not(:has(#divTabelaProcesso))::before`,r=["#divFiltro","#newFiltro","#processosProActions"].map(t=>`html[${oo}] ${t}`).join(`,
`);return`${o} { display: none !important; }
/* Com a grade pronta, o container nativo das tabelas (min-height: 200px) so deixaria um vazio entre a grade e o painel de baixo. */
html[${oo}][${uo}] #divTabelaProcesso { display: none !important; }
${r} { display: none !important; }
html[${oo}] #divRecebidosAreaPaginacaoSuperior, html[${oo}] #divRecebidosAreaPaginacaoInferior,
html[${oo}] #divGeradosAreaPaginacaoSuperior, html[${oo}] #divGeradosAreaPaginacaoInferior { display: none !important; }
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
html[${oo}][${Wo}]:not([${uo}]) #divTabelaProcesso::before,
html[${oo}][${Wo}]:not([${uo}]) #frmProcedimentoControlar:not(:has(#divTabelaProcesso))::before { --spro-sk: #2c333b; --spro-sk-2: #232a31; }
@keyframes spro-grade-pulso { 0%, 100% { opacity: 1; } 50% { opacity: 0.55; } }
@media (prefers-reduced-motion: reduce) {
  html[${oo}]:not([${uo}]) #divTabelaProcesso::before,
  html[${oo}]:not([${uo}]) #frmProcedimentoControlar:not(:has(#divTabelaProcesso))::before { animation: none; }
}`}function ba(o){try{return o.getItem(fr)==="1"}catch{return!1}}function ve(o,e){try{e?o.setItem(fr,"1"):o.removeItem(fr)}catch{}}function xe(o,e){let r=o.documentElement;if(r.setAttribute(oo,"1"),r.removeAttribute(uo),e?r.setAttribute(Wo,"1"):r.removeAttribute(Wo),!o.getElementById(gr)){let t=o.createElement("style");t.id=gr,t.textContent=zs(),(o.head??r).append(t)}}function ye(o){let e=o.documentElement;e.removeAttribute(oo),e.removeAttribute(uo),e.removeAttribute(Wo),o.getElementById(gr)?.remove()}var Do=o=>o.documentElement.hasAttribute(oo);function hr(o){o.documentElement.setAttribute(uo,"1")}function Ae(o,e={setTimeout:(r,t)=>setTimeout(r,t),clearTimeout:r=>clearTimeout(r)}){let r=!1,t,a=s=>{r||(r=!0,e.clearTimeout(n),e.clearTimeout(t),o(s))},n=e.setTimeout(()=>a("teto"),1e4);return{iniciarContagem(){r||(t=e.setTimeout(()=>a("prazo"),1500))},pronta(){r=!0,e.clearTimeout(n),e.clearTimeout(t)},falhou:s=>a(s),encerrada:()=>r}}var va="http://www.w3.org/2000/svg",Ns={grade:[["rect",{x:"3.5",y:"4.5",width:"17",height:"15",rx:"2"}],["path",{d:"M3.5 9.5h17M9 9.5v10M3.5 14.5h17"}]],quadro:[["rect",{x:"3.5",y:"4.5",width:"4.6",height:"15",rx:"1.2"}],["rect",{x:"9.7",y:"4.5",width:"4.6",height:"9",rx:"1.2"}],["rect",{x:"15.9",y:"4.5",width:"4.6",height:"12",rx:"1.2"}]],lista:[["path",{d:"M8 6.5h12M8 12h12M8 17.5h12M4 6.5h.01M4 12h.01M4 17.5h.01"}]],agrupar:[["path",{d:"M4 6h16M4 12h10M4 18h13"}],["path",{d:"M18 10l3 2-3 2"}]],colunas:[["rect",{x:"3.5",y:"4.5",width:"17",height:"15",rx:"2"}],["path",{d:"M9.2 4.5v15M14.8 4.5v15"}]],disquete:[["path",{d:"M5 4.5h11l3.5 3.5v11a1.5 1.5 0 0 1-1.5 1.5H6.5A1.5 1.5 0 0 1 5 19z"}],["path",{d:"M8 4.5v5h7v-5M8 20v-6h8v6"}]],densidade:[["path",{d:"M4 6h16M4 10h16M4 14h16M4 18h16"}]],semPessoa:[["circle",{cx:"12",cy:"8.5",r:"3.6"}],["path",{d:"M5 20c.8-3.6 3.5-5.5 7-5.5s6.2 1.9 7 5.5M4 4l16 16"}]],olhoFechado:[["path",{d:"M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z"}],["circle",{cx:"12",cy:"12",r:"2.8"}],["path",{d:"M4 4l16 16"}]],recebido:[["path",{d:"M4 13.5l2.2-7A1.6 1.6 0 0 1 7.7 5.4h8.6a1.6 1.6 0 0 1 1.5 1.1l2.2 7"}],["path",{d:"M4 13.5V18a1.6 1.6 0 0 0 1.6 1.6h12.8A1.6 1.6 0 0 0 20 18v-4.5h-4.6a3.4 3.4 0 0 1-6.8 0z"}]],gerado:[["path",{d:"M14 3.5H7.5A1.5 1.5 0 0 0 6 5v14a1.5 1.5 0 0 0 1.5 1.5h9A1.5 1.5 0 0 0 18 19V7.5z"}],["path",{d:"M14 3.5V7.5h4M9.5 14.5h5M9.5 17h3"}],["path",{d:"M9.5 11.5l2-2 2 2M11.5 9.5v3.5"}]],novaGuia:[["path",{d:"M14 4.5h5.5V10M19.5 4.5L11 13"}],["path",{d:"M17.5 14v4a1.5 1.5 0 0 1-1.5 1.5H6A1.5 1.5 0 0 1 4.5 18V8A1.5 1.5 0 0 1 6 6.5h4"}]],prioridade:[["circle",{cx:"12",cy:"12",r:"8.5"}],["path",{d:"M12 7.5v5.5M12 16.4h.01"}]],seta:[["path",{d:"M6 9l6 6 6-6"}]],setaDireita:[["path",{d:"M9 6l6 6-6 6"}]],desfazer:[["path",{d:"M9 14L4 9l5-5M4 9h10a6 6 0 0 1 0 12h-3"}]],bloquear:[["circle",{cx:"12",cy:"12",r:"8.5"}],["path",{d:"M6 6l12 12"}]],informacao:[["circle",{cx:"12",cy:"12",r:"8.5"}],["path",{d:"M12 11v5M12 8h.01"}]]};function eo(o,e=16,r=document){let t=r.createElementNS(va,"svg"),a={viewBox:"0 0 24 24",width:String(e),height:String(e),fill:"none",stroke:"currentColor","stroke-width":"1.8","stroke-linecap":"round","stroke-linejoin":"round","aria-hidden":"true",focusable:"false",class:"spro-icone"};for(let[n,s]of Object.entries(a))t.setAttribute(n,s);for(let[n,s]of Ns[o]){let i=r.createElementNS(va,n);for(let[c,l]of Object.entries(s))i.setAttribute(c,l);t.append(i)}return t}var Ee="spro-grade-botao",Ts="#processosSEIPro .titlePanelHome, #processosSEIPro #divInfraBarraLocalizacao, #divInfraBarraLocalizacao.titlePanelHome, #divInfraBarraLocalizacao",_s="Usar o Novo Controle de Processos",qs="Voltar \xE0 vis\xE3o nativa do SEI";function Vs(o,e,r){let t=o.querySelector(Ts);if(!t)return!1;let a=e?qs:_s,n=t.querySelector(`.${Ee}`);n||(n=o.createElement("button"),n.type="button",n.className=Ee,n.append(eo("grade",18,o)),t.append(n));let s=[...t.children].filter(i=>i.classList.contains("spro-pnl-botao")).at(-1);return s&&s.compareDocumentPosition(n)&2&&s.after(n),n.setAttribute("data-tip",a),n.removeAttribute("title"),n.setAttribute("aria-label",a),n.setAttribute("aria-pressed",String(e)),!0}function ya(o,e){let r=t=>{(t.composedPath?.()[0]??t.target)?.closest?.(`.${Ee}`)&&(t.preventDefault(),t.stopPropagation(),e())};return o.addEventListener("click",r,!0),()=>o.removeEventListener("click",r,!0)}var xa=o=>{for(let e of o.querySelectorAll(`.${Ee}`))e.remove()};function Se(o,e,r){let t=()=>Vs(o,e(),r);t();let a=o.defaultView?.MutationObserver;if(!a||!o.body)return()=>xa(o);let n=!1,s=new a(()=>{n||(n=!0,queueMicrotask(()=>{n=!1,s.disconnect(),t(),s.observe(o.body,{childList:!0,subtree:!0})}))});return s.observe(o.body,{childList:!0,subtree:!0}),()=>{s.disconnect(),xa(o)}}function B(o){return o.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/\s+/g," ").trim()}var Hs=/<div(?: style="text-decoration: line-through;")?><i class="(far fa-square|fas fa-check-square)"><\/i> ?([\s\S]*?)<\/div>/g;function js(o){return o.includes("<div")?o.replace(Hs,(e,r,t)=>`
${r==="far fa-square"?"[ ]":"[X]"} ${t}
`).replace(/\n{2,}/g,`
`).trim():o}var Fs=/^Anota[\u00e7c][\u00e3a]o( com prioridade)?\s+\/\s+([\s\S]*)\s+\/\s+(.*)$/i;function Aa(o){let e=o.querySelector('a[href*="acao=anotacao_registrar"]');if(!e)return null;let r=e.querySelector("img")?.getAttribute("src")??"",t=/anotacao2\.|prioridade/i.test(r),a=Fs.exec(e.getAttribute("aria-label")??"");if(a){let i=G(a[2]).replace(/\r\n?/g,`
`).trim();return i?{texto:i,autor:a[3].trim(),prioridade:!!a[1]||t}:null}let n=xo(e.getAttribute("onmouseover")??"","infraTooltipMostrar")[0];if(typeof n?.[0]!="string")return null;let s=js(N(n[0])).trim();return s?{texto:s,autor:N(n[1]).trim(),prioridade:t}:null}function Ea(o,e,r){if(e){let a={idProcedimento:o,origem:"nativo",vencimento:e.data,idControlePrazo:e.idControlePrazo,sigla:e.sigla,linkNativo:e.link,...e.concluidoEm?{concluidoEm:e.concluidoEm}:{}};return r?.vencimento&&r.data===e.data?{...a,origem:"ambos",hora:r.hora,texto:r.texto||void 0}:a}if(!r)return null;let t={idProcedimento:o,origem:"marcador",hora:r.hora,texto:r.texto||void 0};return r.vencimento?{...t,vencimento:r.data}:{...t,inicio:r.data}}var Gs='a[href*="acao=controle_prazo_definir"]',Us=/^Controle de Prazo\s*\/\s*(\S+)\s+(\d{2})\/(\d{2})\/(\d{4})\s*\(([^)]*)\)\s*$/s,Sa=(o,e,r)=>`${r}-${e}-${o}`;function Bs(o){let e=o.trim().toLowerCase(),r=/^conclu[i\u00ED]do em (\d{2})\/(\d{2})\/(\d{4})$/.exec(e);return r?{estado:"concluido",concluidoEm:Sa(r[1],r[2],r[3])}:/^at[e\u00E9] hoje$/.test(e)?{estado:"hoje"}:/^atrasado \d+ dias?$/.test(e)?{estado:"atrasado"}:/^\d+ dias?$/.test(e)?{estado:"noPrazo"}:null}function br(o){let e=o.querySelector(Gs);if(!e)return null;let r=e.getAttribute("aria-label")??"";if(!r){let l=xo(e.getAttribute("onmouseover")??"","infraTooltipMostrar")[0];typeof l?.[0]=="string"&&(r=`Controle de Prazo / ${N(l[0])}`)}let t=Us.exec(G(r).replace(/\s+/g," ").trim());if(!t)return null;let a=Bs(t[5]);if(!a)return null;let n=G(e.getAttribute("href")??""),s=X(n),i=s.get("id_controle_prazo")??"",c=s.get("id_procedimento")??o.id.replace(/^P/,"");return!i||!c?null:{idControlePrazo:i,idProcedimento:c,sigla:t[1],data:Sa(t[2],t[3],t[4]),link:n,...a}}var wa=/(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(\d{4})/,Pa=/\b([01]?\d|2[0-3]):([0-5]\d)\b/,Ma=new RegExp("(?<!\\p{L})at[e\\u00E9](?!\\p{L})","iu");function Qs(o,e,r){let t=`${r}-${e}-${o}`;try{return To(pe(t))===t?t:null}catch{return null}}var Xs=o=>o.padStart(2,"0");function vr(o){let e=o.replace(/\r\n?/g,`
`),r=wa.exec(e);if(!r)return null;let t=Qs(r[1],r[2],r[3]);if(!t)return null;let a=Pa.exec(e),n=a?`${Xs(a[1])}:${a[2]}`:void 0,s=Ma.test(e),i=e.replace(Ma,"").replace(wa,"");return a&&(i=i.replace(Pa,"")),i=i.replace(/[ \t]+/g," ").replace(/^[ \t]*\n+|\n+[ \t]*$/g,"").trim(),{data:t,hora:n,vencimento:s,texto:i}}function ka(o){let e=[];for(let r of o.querySelectorAll('a[href*="acao=andamento_marcador_gerenciar"]')){let t=xo(r.getAttribute("onmouseover")??"","infraTooltipMostrar")[0];typeof t?.[0]=="string"&&e.push({texto:N(t[0]),nome:N(t[1])})}return e}function Ca(o,e){let r=o.querySelector("input[type=checkbox]"),t=o.querySelector("a[href*='procedimento_trabalhar']");if(!r||!t)return null;let a=r.getAttribute("aria-label")??"",n=/^Sigiloso\b/.test(a)||/Sigiloso/.test(t.getAttribute("class")??""),s=[...o.querySelectorAll("td")],i=n?[]:[...s[1]?.querySelectorAll("a[aria-label]")??[]].map(c=>c.getAttribute("aria-label")??"");return{idProcedimento:r.getAttribute("value")??X(t.getAttribute("href")??"").get("id_procedimento")??"",protocolo:r.getAttribute("title")??V(t),grupo:e,tipo:/Tipo (.*?)(?: \/ Especifica|$)/.exec(a)?.[1]?.trim()??"",especificacao:n?"":/Especifica\S* (.*)$/.exec(a)?.[1]?.trim()??"",sigiloso:n,novo:/NaoVisualizado/.test(t.getAttribute("class")??""),atribuido:V(s[s.length-1]).replace(/^\(|\)$/g,""),sinais:i,documentoNovo:!!s[1]?.querySelector("img[src*='exclamacao']")||i.some(c=>/documento foi inclu/i.test(c))}}var Ks=/marcador_([a-z0-9_]+)\.svg/i;function Js(o){let e=[];for(let r of o.querySelectorAll('a[href*="acao=andamento_marcador_gerenciar"]')){let t=xo(r.getAttribute("onmouseover")??"","infraTooltipMostrar")[0],a=/^Marcador\s*\/\s*(.*)$/s.exec(G(r.getAttribute("aria-label")??"").trim()),n=(typeof t?.[1]=="string"&&t[1]?N(t[1]):a?.[1]??"").trim();n&&e.push({nome:n,cor:Ks.exec(r.querySelector("img")?.getAttribute("src")??"")?.[1]??"",texto:typeof t?.[0]=="string"?N(t[0]).trim():""})}return e}function Ws(o){let e=[];for(let r of o.querySelectorAll("a")){let t=r.querySelector("img")?.getAttribute("src")??"",a=/retorno_(programado|aguardando)(\d)?\.svg/.exec(t);if(!a)continue;let n=G(r.getAttribute("aria-label")??"").trim();e.push({tipo:a[1],descricao:n,atrasado:a[2]==="3"||/atrasad/i.test(n)})}return e}function Zs(o){let e=o.querySelector('a[href*="acao=procedimento_atribuicao_listar"], a.ancoraSigla'),r=e?.textContent?.trim();if(!e||!r)return;let t=G(e.getAttribute("title")??"").replace(/^Atribu[i\u00ED]do para\s+/i,"").trim();return{sigla:r,nome:t||r}}function xr(o,e){let r=Ca(o,e.grupo);if(!r?.idProcedimento)return null;let t=Js(o),a=null;for(let p of ka(o)){let f=vr(p.texto);if(f){a=f;break}}let n={id:r.idProcedimento,protocolo:r.protocolo,grupo:e.grupo,tipo:r.tipo,especificacao:r.especificacao,sigiloso:r.sigiloso,naoVisualizado:r.novo,marcadores:r.sigiloso?[]:t,retornos:r.sigiloso?[]:Ws(o),acompanhamentoEspecial:!r.sigiloso&&!!o.querySelector('a[href*="acao=acompanhamento"] , img[src*="acompanhamento_especial"], .acompanhamentoesp_icon'),documentoNovo:r.documentoNovo,pagina:e.pagina,naPaginaAtual:e.naPaginaAtual},s=o.querySelector('a[href*="acao=procedimento_trabalhar"]')?.getAttribute("onmouseover")??"";/\(URGENTE\)/.test(s)&&(n.urgente=!0),/\(TRANCADO\)/.test(s)&&(n.trancado=!0);let i=o.querySelector(".acompanhamentoesp_icon");if(i){let p=xo(i.getAttribute("onmouseover")??"","infraTooltipMostrar")[0];typeof p?.[1]=="string"&&p[1]&&(n.acompanhamentoGrupo=N(p[1]))}let c=o.querySelector('a[href*="acao=procedimento_trabalhar"]')?.getAttribute("href");c&&(n.link=G(c));let l=Zs(o);if(l&&(n.atribuicao=l),!r.sigiloso){let p=Aa(o);p&&(n.anotacao=p);let f=Ea(n.id,br(o),a);f&&(n.prazo=f)}return n}var Oa="#tblProcessosRecebidos, #tblProcessosGerados, #tblProcessosDetalhado",Ys={recebidos:"tblProcessosRecebidos",gerados:"tblProcessosGerados"},oi=[[/^tipo( do processo)?$/,"tipo"],[/^especificacao$/,"especificacao"],[/^(atribuicao|atribuido( para)?|responsavel)$/,"atribuicao"],[/^marcador(es)?$/,"marcador"],[/^prioridade$/,"prioridade"],[/^interessados?$/,"interessados"],[/^observacao$/,"observacao"],[/^ultima mov/,"ultimaMov"]];function ei(o){let e=new Map;return[...(o.querySelector("thead tr")??[...o.querySelectorAll("tr")].find(t=>t.querySelector("th")))?.children??[]].forEach((t,a)=>{let n=B(t.textContent??""),s=oi.find(([i])=>i.test(n));s&&e.set(a,s[1])}),e}function La(o){let e=(o?.querySelector("caption")?.textContent??"").replace(/\s+/g," "),r=Number(/(\d+)\s+registro/.exec(e)?.[1]??0),t=/(\d+)\s+a\s+(\d+)\s*\)?/.exec(e);return{total:r,porPagina:t?Number(t[2])-Number(t[1])+1:0}}function ri(o,e,r){if(!r.size)return;let t=[...e.children];for(let[a,n]of r){let s=(t[a]?.textContent??"").replace(/\s+/g," ").trim();if(s)if(n==="tipo"&&!o.tipo)o.tipo=s;else if(n==="especificacao"&&!o.especificacao&&!o.sigiloso)o.especificacao=s;else if(n==="atribuicao"&&!o.atribuicao){let i=s.replace(/^\(|\)$/g,"");o.atribuicao={sigla:i,nome:i}}else if(n==="marcador"&&!o.marcadores.length&&!o.sigiloso)o.marcadores=[{nome:s,cor:"",texto:""}];else{if(o.sigiloso&&(n==="interessados"||n==="observacao"))continue;if(n==="prioridade")o.prioridade=s;else if(n==="interessados")o.interessados=s;else if(n==="observacao")o.observacao=s;else if(n==="ultimaMov"){let i=/(\d{2})\/(\d{2})\/(\d{4})/.exec(s);i&&(o.ultimaMov=`${i[3]}-${i[2]}-${i[1]}`)}}}}function ti(o){let e=o.querySelector("input[type=checkbox]")?.getAttribute("name")??"";return/^chkGerados/i.test(e)?"gerados":"recebidos"}function _o(o,e={}){let r=e.pagina??0,t=e.naPaginaAtual??!0,a=[],n={recebidos:0,gerados:0},s={recebidos:0,gerados:0},i=o.getElementById("tblProcessosDetalhado"),c=new Set,l=m=>{m&&!c.has(m.id)&&(c.add(m.id),a.push(m))};for(let m of["recebidos","gerados"]){let A=o.getElementById(Ys[m]),{total:E,porPagina:M}=La(A);n[m]=E,s[m]=M;for(let w of A?.querySelectorAll('tr[id^="P"]')??[])l(xr(w,{grupo:m,pagina:r,naPaginaAtual:t}))}if(i){let m=ei(i),{total:A,porPagina:E}=La(i);for(let M of i.querySelectorAll("tr")){if(!M.querySelector('a[href*="procedimento_trabalhar"]'))continue;let w=ti(M),v=xr(M,{grupo:w,pagina:r,naPaginaAtual:t});v&&!c.has(v.id)&&(ri(v,M,m),l(v),n[w]=Math.max(n[w],A),s[w]=Math.max(s[w],E))}}let p=m=>o.getElementById(m)?.getAttribute("value")??"",f={recebidos:{itens:p("hdnRecebidosItens"),hash:p("hdnRecebidosItensHash")},gerados:{itens:p("hdnGeradosItens"),hash:p("hdnGeradosItensHash")},detalhado:{itens:p("hdnDetalhadoItens"),hash:p("hdnDetalhadoItensHash")}};return{processos:a,totais:n,porPagina:s,visao:i?"detalhada":"resumida",selecoes:f}}var ai=60;async function Da(o,e,r={}){let t=r.maxPaginas??ai,a=[],n=new Set(o.processos.map(l=>l.id)),s=!0,i,c=!1;try{for(let l of["recebidos","gerados"]){let p=o.totais[l],f=o.processos.filter(E=>E.grupo===l).length,m=o.porPagina[l]||f||1,A=Math.max(1,Math.ceil(p/m));for(let E=1;f<p;E+=1){if(r.sinal?.aborted)return s=!1,{processos:a,completo:s,...i?{erro:i}:{}};if(E>=t){s=!1;break}c=!0;let M=await e.pagina(l,E,r.sinal),w=_o(M,{pagina:E,naPaginaAtual:!1}),v=w.processos.filter(S=>S.grupo===l&&!n.has(S.id));if(!v.length)break;for(let S of v)n.add(S.id);f+=v.length,a.push(...v),w.visao==="detalhada"?r.aoSelecao?.("detalhado",E,w.selecoes.detalhado):r.aoSelecao?.(l,E,w.selecoes[l]),r.aoPagina?.(v),r.aoProgresso?.({grupo:l,paginasLidas:E+1,paginasTotal:A,processos:f,total:p})}f<p&&(s=!1)}}catch(l){s=!1,i=l instanceof Error?l.message:String(l)}finally{if(c)try{await e.restaurar()}catch(l){i??=`N\xE3o foi poss\xEDvel voltar \xE0 primeira p\xE1gina: ${l instanceof Error?l.message:String(l)}`}}return{processos:a,completo:s,...i?{erro:i}:{}}}var ni=["hdnRecebidosItensSelecionados","hdnGeradosItensSelecionados","hdnRecebidosItemId","hdnGeradosItemId","hdnDetalhadoItensSelecionados","hdnDetalhadoItemId"];function yr(o,e,r="resumida"){let t="#frmProcedimentoControlar",a=()=>({hdnRecebidosPaginaAtual:"0",hdnGeradosPaginaAtual:"0",hdnDetalhadoPaginaAtual:"0",...Object.fromEntries(ni.map(n=>[n,""]))});return{async pagina(n,s,i){let c=r==="detalhada"?"hdnDetalhadoPaginaAtual":n==="recebidos"?"hdnRecebidosPaginaAtual":"hdnGeradosPaginaAtual";return(await j.de(e,t,o).definir({...a(),[c]:String(s)}).enviar({sinal:i,aceitarValidacao:!0})).doc},async restaurar(n){await j.de(e,t,o).definir(a()).enviar({sinal:n,aceitarValidacao:!0})},restaurarAoSair(){try{let n=j.de(e,t,o);fetch(o.absoluta(n.action),{method:"POST",keepalive:!0,credentials:"include",headers:{"content-type":"application/x-www-form-urlencoded"},body:new URLSearchParams(n.definir(a()).pares()).toString()}).catch(()=>{})}catch{}}}}var si=30*6e4,Ia=5e3,Ar=()=>({vistoEm:{}});function Ra(o){if(!o||typeof o!="object")return Ar();let e=o,r={};if(e.vistoEm&&typeof e.vistoEm=="object")for(let[i,c]of Object.entries(e.vistoEm))typeof c=="number"&&Number.isFinite(c)&&c>0&&(r[i]=c);let t=i=>typeof i=="number"&&Number.isFinite(i)?i:void 0,a={vistoEm:r},n=t(e.visitaAtual),s=t(e.visitaAnterior);return n!==void 0&&(a.visitaAtual=n),s!==void 0&&(a.visitaAnterior=s),a}function za(o,e){return o.visitaAtual===void 0?{...o,visitaAtual:e}:e-o.visitaAtual>si?{...o,visitaAnterior:o.visitaAtual,visitaAtual:e}:o}function Er(o,e,r,t){let a={...o.vistoEm};for(let s of e)a[s]===void 0&&(a[s]=r);if(t){let s=new Set(e);for(let i of Object.keys(a))s.has(i)||delete a[i]}let n=Object.keys(a);if(n.length>Ia)for(let s of n.sort((i,c)=>a[c]-a[i]).slice(Ia))delete a[s];return{...o,vistoEm:a}}function Na(o,e){return o.map(r=>e.vistoEm[r.id]!==void 0?{...r,vistoEm:e.vistoEm[r.id]}:r)}function qo(o){if(o===null)return"";if(o<1)return"hoje";if(o===1)return"1 dia";if(o<60)return`${o} dias`;let e=Math.floor(o/30);return e<24?`${e} meses`:`${Math.floor(o/365)} anos`}var Ta="Contado desde a primeira vez que o SEI Pro viu o processo nesta unidade (o SEI n\xE3o informa a data de chegada).";var Vo=["processo","especificacao","tipo","responsavel","marcadores","prazo","anotacao","caixa","parado","sinais"],Io={processo:"Processo",tipo:"Tipo",especificacao:"Especifica\xE7\xE3o",responsavel:"Respons\xE1vel",marcadores:"Marcadores",prazo:"Prazo",anotacao:"Anota\xE7\xE3o",caixa:"Na caixa",parado:"Parado h\xE1",sinais:"Sinais"};var ii=30,ci=40,li=()=>({colunas:"marcador",limite:0,raiasPorResponsavel:!1}),di=["processo","especificacao","tipo","responsavel","marcadores","prazo","anotacao"],Sr=2;function Ho(){return{id:"",nome:"Padr\xE3o",busca:"",ordem:[],agrupar:"nenhum",modo:"tabela",colv:Sr,colunas:[...di],densidade:"confortavel",quadro:li()}}var pi=["nenhum","responsavel","tipo","marcador","prazo","situacao","grupo","anotacao","acompanhamento","retorno","caixa"],ui=["protocolo","tipo","responsavel","marcador","prazo","caixa","parado","novo"],mi=["marcador","responsavel","prazo","tipo"];function we(o){let e=Ho();if(!o||typeof o!="object")return e;let r=o,t=Array.isArray(r.ordem)?r.ordem.filter(s=>!!s&&typeof s=="object"&&ui.includes(s.campo)).slice(0,4).map(s=>({campo:s.campo,decrescente:s.decrescente===!0})):[],a=Array.isArray(r.colunas)?[...new Set(r.colunas.filter(s=>Vo.includes(s)))]:[];if(a.includes("processo")&&r.colv!==Sr&&!a.includes("especificacao")){let s=a.indexOf("processo");a=[...a.slice(0,s+1),"especificacao",...a.slice(s+1)]}let n=r.quadro&&typeof r.quadro=="object"?r.quadro:{};return{id:typeof r.id=="string"?r.id:"",colv:Sr,nome:typeof r.nome=="string"&&r.nome.trim()?r.nome.trim().slice(0,ci):e.nome,busca:typeof r.busca=="string"?r.busca.slice(0,500):"",ordem:t,agrupar:pi.includes(r.agrupar)?r.agrupar:"nenhum",modo:r.modo==="quadro"?"quadro":"tabela",colunas:a.length?a:e.colunas,densidade:r.densidade==="compacta"?"compacta":"confortavel",quadro:{colunas:mi.includes(n.colunas)?n.colunas:"marcador",limite:typeof n.limite=="number"&&n.limite>0?Math.min(99,Math.floor(n.limite)):0,raiasPorResponsavel:n.raiasPorResponsavel===!0}}}function _a(o,e,r){let t=we(e),a=t.id?o.findIndex(s=>s.id===t.id):-1;if(a>=0){let s=[...o];return s[a]=t,{lista:s,visao:t}}if(o.length>=ii)return null;let n={...t,id:r()};return{lista:[...o,n],visao:n}}var qa=(o,e)=>o.filter(r=>r.id!==e);function Va(o,e){let r=t=>JSON.stringify({...t,id:"",nome:""});return r(o)!==r(e)}var Pe="spro_grade_v_ids",Me=o=>`spro_grade_v:${o}`,fi=o=>`spro_grade:${o||"x"}`;function gi(){return{visao:Ho(),idade:Ar(),recolhidos:[]}}function hi(o){if(!o||typeof o!="object")return gi();let e=o;return{visao:we(e.visao),idade:Ra(e.idade),recolhidos:Array.isArray(e.recolhidos)?e.recolhidos.filter(r=>typeof r=="string").slice(0,200):[]}}function Ha(o,e){let{local:r,sync:t}=o,a=fi(e);async function n(){return hi((await r.obter(a))[a])}async function s(l){let p=await n();await r.gravar({[a]:{...p,...l}})}async function i(){let l=(await t.obter(Pe))[Pe],p=Array.isArray(l)?l.filter(m=>typeof m=="string"):[];if(!p.length)return[];let f=await t.obter(p.map(Me));return p.flatMap(m=>{let A=f[Me(m)];return A?[{...we(A),id:m}]:[]})}async function c(l,p=[]){let f=new Set(l.map(E=>E.id)),m={[Pe]:l.map(E=>E.id)};for(let E of l)m[Me(E.id)]=E;await t.gravar(m);let A=p.filter(E=>!f.has(E.id)).map(E=>Me(E.id));A.length&&await t.remover(A)}return{lerEstado:n,gravarVisao:l=>s({visao:l}),gravarIdade:l=>s({idade:l}),gravarRecolhidos:l=>s({recolhidos:l}),lerVisoes:i,gravarVisoes:c,aoMudarVisoes:l=>t.aoMudar(p=>Pe in p||Object.keys(p).some(f=>f.startsWith("spro_grade_v:"))?l():void 0)}}function ja(o){let e=r=>{let t=/^[=+\-@\t\r]/.test(r)?`'${r}`:r;return/[;"\n\r]/.test(t)?`"${t.replace(/"/g,'""')}"`:t};return`\uFEFF${o.map(r=>r.map(e).join(";")).join(`\r
`)}`}var Fa=new Set;var bi=null;function vi(o){let e=o.closest?.("dialog[open]");if(e)return e;let r=o.getRootNode?.(),t=o.ownerDocument;return r&&r!==t&&r.host?r:t.body??t.documentElement}function Ga(o,e){let r=o;try{r?.CustomEvent&&r.dispatchEvent(new r.CustomEvent("spro-popover",{detail:{fundo:e}}))}catch{}}function Ua(o,e,r){let t=o.ownerDocument,a=t.defaultView;vi(o).append(e);let n=!0,s=()=>{if(!n)return;let m=o.getBoundingClientRect?.();if(!m)return;let A=a?.innerHeight??0,E=a?.innerWidth??0,M=Math.min(r.largura??Math.max(m.width,r.larguraMinima??0),Math.max(180,E-16)),w=r.alinharDireita?m.right-M:m.left,v=Math.max(8,Math.min(w,E-M-8)),S=r.alturaMaxima??360;e.style.maxHeight="none";let y=Math.min(e.scrollHeight||S,S),P=A-m.bottom-8,R=m.top-8,$=bi?.()??!1,z=!$&&P<Math.min(y,200)&&R>P;e.style.left=`${v}px`,e.style.width=`${M}px`,e.style.maxHeight=`${$?S:Math.max(140,Math.min(S,z?R:P>140?P:S))}px`,e.classList.toggle("spro-flutuante-cima",z),z?(e.style.top="",e.style.bottom=`${A-m.top+4}px`):(e.style.bottom="",e.style.top=`${m.bottom+4}px`),Ga(a,z?0:Math.ceil(m.bottom+4+y+12))},i=m=>{let A=m.composedPath?.()??[],E=m.target,M=w=>A.includes(w)||!!E&&!!w.contains?.(E);M(e)||M(o)||r.aoFechar()},c=()=>{o.isConnected?s():r.aoFechar()},l=m=>{m.target instanceof Node&&e.contains(m.target)||c()},p=()=>r.aoFechar();t.addEventListener("pointerdown",i,!0),a?.addEventListener("scroll",l,!0),a?.addEventListener("resize",c),a?.addEventListener("blur",p);let f={ancora:o,fechar:()=>r.aoFechar()};return Fa.add(f),s(),{posicionar:s,fechar(){n&&(n=!1,Fa.delete(f),t.removeEventListener("pointerdown",i,!0),a?.removeEventListener("scroll",l,!0),a?.removeEventListener("resize",c),a?.removeEventListener("blur",p),e.remove(),Ga(a,0))}}}function Ba(o,e){let r=B(e);if(!r)return[...o];let t=r.split(" "),a=[];return o.forEach((n,s)=>{let i=B(n.rotulo),c=`${i} ${B(n.descricao??"")}`;if(!t.every(p=>c.includes(p)))return;let l=i.startsWith(r)?0:i.split(" ").some(p=>p.startsWith(t[0]))?1:2;a.push({o:n,nota:l,i:s})}),a.sort((n,s)=>n.nota-s.nota||n.i-s.i).map(n=>n.o)}function xi(o,e){let r=o.normalize("NFC"),t=B(e).split(" ").filter(Boolean);if(!t.length)return[{texto:r,marcado:!1}];let a=[...r],n="",s=[];a.forEach((l,p)=>{let f=l.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase();for(let m of f)n+=m,s.push(p)});let i=new Array(a.length).fill(!1);for(let l of t){let p=n.indexOf(l);if(!(p<0))for(let f=p;f<p+l.length;f++)i[s[f]]=!0}let c=[];return a.forEach((l,p)=>{let f=c[c.length-1];f&&f.marcado===i[p]?f.texto+=l:c.push({texto:l,marcado:i[p]})}),c}var yi=0;function wo(o){let e=`spro-combo-${++yi}`,r=()=>typeof o.opcoes=="function"?o.opcoes():o.opcoes,t=new Map,a=b=>r().find(L=>L.valor===b)??t.get(b),n=[...o.valor??[]],s=null,i="",c=0,l=[],p=null,f=d("button",{type:"button",class:`spro-combo${o.classe?` ${o.classe}`:""}`,role:"combobox","aria-haspopup":"listbox","aria-expanded":"false","aria-label":o.rotulo,title:o.rotulo}),m=()=>o.aoMudar?.([...n]);function A(){let b=[];o.icone&&b.push(_(o.icone,15));let L=n.map(q=>a(q)).filter(q=>!!q),O=d("span",{class:"spro-combo-texto"});if(!L.length)O.classList.add("spro-combo-vazio"),O.append(o.vazio??"Escolher\u2026");else{let q=L[0];q.cor&&O.append(d("span",{class:"spro-combo-cor",style:`background:${q.cor}`})),O.append(d("span",{class:"spro-combo-rotulo"},q.rotulo)),L.length>1&&O.append(d("span",{class:"spro-combo-mais"},`+${L.length-1}`))}b.push(O,_("chevron",14)),f.classList.toggle("spro-combo-ativo",o.multiplo===!0&&L.length>0),f.replaceChildren(...b)}let E=()=>o.busca??(r().length>7||!!o.multiplo||!!o.criar);function M(b){if(o.multiplo){n=n.includes(b.valor)?n.filter(O=>O!==b.valor):[...n,b.valor],m(),A(),y();return}let L=n.length!==1||n[0]!==b.valor;n=[b.valor],A(),z(!0),L&&m()}async function w(){if(!o.criar)return;let b=i.trim();if(!b)return;let L=await o.criar(b);if(L){if(t.set(L.valor,L),i="",s){let O=s.querySelector(".spro-combo-busca");O&&(O.value="")}o.multiplo&&n.includes(L.valor)?y():M(L)}}function v(b,L){let O=n.includes(b.valor),q=d("span",{class:"spro-combo-op-rotulo"});for(let I of xi(b.rotulo,i))q.append(I.marcado?d("mark",{},I.texto):I.texto);let Z=d("li",{role:"option",id:`${e}-op-${L}`,class:`spro-combo-op${L===c?" spro-combo-op-ativa":""}`,"data-valor":b.valor,"aria-selected":O?"true":"false"},o.multiplo?d("span",{class:"spro-combo-caixa","aria-hidden":"true"},O?_("check",12):null):null,b.cor?d("span",{class:"spro-combo-cor",style:`background:${b.cor}`}):null,b.icone?_(b.icone,15):null,d("span",{class:"spro-combo-op-textos"},q,b.descricao?d("span",{class:"spro-combo-op-desc"},b.descricao):null),b.contagem!==void 0?d("span",{class:"spro-combo-conta"},String(b.contagem)):null,!o.multiplo&&O?d("span",{class:"spro-combo-marca"},_("check",14)):null);return Z.addEventListener("pointerdown",I=>I.preventDefault()),Z.addEventListener("click",()=>{c=L,M(b)}),Z.addEventListener("pointermove",()=>{c!==L&&(c=L,S())}),Z}function S(){if(!s)return;let b=[...s.querySelectorAll('[role="option"]')];b.forEach((Z,I)=>{Z.classList.toggle("spro-combo-op-ativa",I===c)});let L=b[c],q=s.querySelector(".spro-combo-busca")??s.querySelector('[role="listbox"]');L?(q?.setAttribute("aria-activedescendant",L.id),L.scrollIntoView?.({block:"nearest"})):q?.removeAttribute("aria-activedescendant")}function y(){if(!s)return;l=Ba(r(),i),c>=l.length&&(c=Math.max(0,l.length-1)),s.querySelector('[role="listbox"]').replaceChildren(...l.map(v));let L=s.querySelector(".spro-combo-extras");L.replaceChildren();let O=i.trim();l.length||L.append(d("p",{class:"spro-combo-nada"},O?"Nada encontrado.":"Nenhuma op\xE7\xE3o."));let q=r().some(I=>B(I.rotulo)===B(O));if(o.criar&&O&&!q){let I=d("button",{type:"button",class:"spro-combo-criar"},_("mais",14),d("span",{},o.rotuloCriar?o.rotuloCriar(O):`Criar \u201C${O}\u201D`));I.addEventListener("pointerdown",H=>H.preventDefault()),I.addEventListener("click",()=>void w()),L.append(I)}let Z=s.querySelector(".spro-combo-rodape");if(Z){let I=l.filter(lo=>!n.includes(lo.valor)),H=d("button",{type:"button",class:"spro-combo-acao",disabled:!O||!I.length},`Marcar os filtrados${O&&I.length?` (${I.length})`:""}`);H.addEventListener("click",()=>{n=[...n,...I.map(lo=>lo.valor)],m(),A(),y()});let Ro=d("button",{type:"button",class:"spro-combo-acao spro-combo-limpar",disabled:!n.length},"Limpar");Ro.addEventListener("click",()=>{n=[],m(),A(),y()}),Z.replaceChildren(d("span",{class:"spro-combo-total"},n.length?`${n.length} marcado${n.length>1?"s":""}`:""),H,Ro)}S()}let P=()=>p?.posicionar();function R(b){let L=l.length,O=b.target,q=s?[...s.querySelectorAll(".spro-combo-rodape button:not(:disabled)")]:[],Z=!!O?.closest?.(".spro-combo-rodape, .spro-combo-criar");if(b.key==="Tab"){let H=q.indexOf(O);if(!b.shiftKey&&H<q.length-1)q[H+1]?.focus();else if(b.shiftKey&&H>=0)H>0?q[H-1]?.focus():(s?.querySelector(".spro-combo-busca")??s?.querySelector('[role="listbox"]'))?.focus();else{z(!0);return}b.preventDefault(),b.stopPropagation();return}if(Z&&b.key!=="Escape")return;let I=!s?.querySelector(".spro-combo-busca");if(I&&b.key===" "){let H=l[c];H&&M(H),b.preventDefault(),b.stopPropagation();return}if(I&&b.key.length===1&&!b.ctrlKey&&!b.metaKey&&!b.altKey){let H=B(b.key),lo=[...l.keys()].map(Eo=>(c+1+Eo)%Math.max(1,L)).find(Eo=>B(l[Eo]?.rotulo??"").startsWith(H));lo!==void 0&&(c=lo,S()),b.preventDefault(),b.stopPropagation();return}switch(b.key){case"ArrowDown":c=L?(c+1)%L:0,S();break;case"ArrowUp":c=L?(c-1+L)%L:0,S();break;case"Home":if(b.target?.classList?.contains("spro-combo-busca")&&i)return;c=0,S();break;case"End":if(b.target?.classList?.contains("spro-combo-busca")&&i)return;c=Math.max(0,L-1),S();break;case"Enter":{let H=l[c];H?M(H):w();break}case"Escape":z(!0);break;case"Backspace":if(!o.multiplo||i||!n.length)return;n=n.slice(0,-1),m(),A(),y();break;default:return}b.preventDefault(),b.stopPropagation()}function $(b=""){if(s)return;i=b,c=b?0:(()=>{let Z=Ba(r(),i).findIndex(I=>I.valor===n[n.length-1]);return Z<0?0:Z})();let O=E()?d("input",{type:"text",class:"spro-combo-busca",placeholder:o.criar?"Buscar ou criar\u2026":"Buscar\u2026","aria-label":`Filtrar ${o.rotulo.toLowerCase()}`,"aria-controls":`${e}-lista`,"aria-autocomplete":"list",autocomplete:"off",spellcheck:"false",value:b}):null;if(O&&(O.value=b,O.addEventListener("input",()=>{i=O.value,c=0,y(),P()})),s=d("div",{class:`spro-combo-pop${o.multiplo?" spro-combo-pop-multi":""}`},O?d("div",{class:"spro-combo-cabeca"},_("busca",15),O):null,d("ul",{role:"listbox",id:`${e}-lista`,class:"spro-combo-lista",tabindex:O?void 0:"-1","aria-label":o.rotulo,"aria-multiselectable":o.multiplo?"true":void 0}),d("div",{class:"spro-combo-extras"}),o.multiplo?d("div",{class:"spro-combo-rodape"}):null),s.addEventListener("keydown",R),p=Ua(f,s,{larguraMinima:o.larguraLista??220,alturaMaxima:360,aoFechar:()=>z(!1)}),f.setAttribute("aria-expanded","true"),f.setAttribute("aria-controls",`${e}-lista`),f.classList.add("spro-combo-aberto"),y(),P(),!s)return;(O??s.querySelector('[role="listbox"]'))?.focus?.({preventScroll:!0}),O&&b&&O.setSelectionRange?.(b.length,b.length)}function z(b=!1){s&&(p?.fechar(),p=null,s=null,i="",f.setAttribute("aria-expanded","false"),f.removeAttribute("aria-controls"),f.classList.remove("spro-combo-aberto"),b&&f.focus?.({preventScroll:!0}))}return f.addEventListener("click",()=>s?z(!0):$()),f.addEventListener("keydown",b=>{s||(b.key==="ArrowDown"||b.key==="ArrowUp"?(b.preventDefault(),$()):b.key.length===1&&b.key!==" "&&!b.ctrlKey&&!b.metaKey&&!b.altKey&&E()&&(b.preventDefault(),$(b.key)))}),A(),{el:f,valor:()=>[...n],definir(b,L=!1){n=[...b],A(),y(),L&&m()},atualizar(){A(),y()},abrir:$,fechar:()=>z(!1)}}var Qa="#tblProcessosRecebidos input[type=checkbox], #tblProcessosGerados input[type=checkbox], #tblProcessosDetalhado input[type=checkbox]",wr=o=>o.getAttribute("value")??o.closest("tr")?.id.replace(/^P/,"")??"";function Pr(o){let e=new Set;for(let r of o.querySelectorAll(Qa))r.checked&&wr(r)&&e.add(wr(r));return e}function Xa(o,e){let r=new Set(e);for(let t of o.querySelectorAll(Qa)){let a=wr(t);a&&(r.delete(a),!t.disabled&&!!t.checked!==e.has(a)&&t.click())}return[...r]}function Ai(o){let e=o.composedPath?.()??[];if(e.length)return e.some(r=>r.id==="spro-grade");for(let r=o.target;r;r=r.parentNode)if(r.id==="spro-grade")return!0;return!1}function Ka(o,e){let r=!1,t=a=>{a&&Ai(a)||r||(r=!0,queueMicrotask(()=>{r=!1,e(Pr(o))}))};return o.addEventListener("click",t,!0),o.addEventListener("change",t,!0),()=>{o.removeEventListener("click",t,!0),o.removeEventListener("change",t,!0)}}function Ei(o){return/acaoControleProcessos\(\s*['"][^'"]*['"]\s*,\s*true/.test(o.elemento.getAttribute("onclick")??"")}function Ja(o,e){return Ei(o)&&e===0?{ok:!1,motivo:"Marque ao menos um processo."}:(o.elemento.click(),{ok:!0})}var Si=o=>o instanceof Error?o.message:String(o);function Wa(o){if(o.tipo==="atribuicao")return{...o,para:o.de,de:o.para};let e={tipo:"marcador",id:o.id,protocolo:o.protocolo};return o.adicionar&&(e.remover=o.adicionar),o.remover&&(e.adicionar=o.remover,o.texto&&(e.texto=o.texto)),e}async function wi(o,e){try{if(o.tipo==="atribuicao")return await e.atribuir(o.protocolo,o.para),{ok:!0,desfazer:Wa(o)};if(o.adicionar&&await e.marcador(o.protocolo,{marcador:o.adicionar,...o.texto?{texto:o.texto}:{}}),o.remover)try{await e.marcador(o.protocolo,{marcador:o.remover,remover:!0})}catch(r){throw o.adicionar&&await e.marcador(o.protocolo,{marcador:o.adicionar,remover:!0}).catch(()=>{}),r}return{ok:!0,desfazer:Wa(o)}}catch(r){return{ok:!1,erro:Si(r)}}}function Za(o){let e=Promise.resolve();return{mover(r){let t=e.then(()=>wi(r,o));return e=t.catch(()=>{}),t}}}var ke=o=>`${o} ${Math.abs(o)===1?"dia":"dias"}`,Ya=Number.MAX_SAFE_INTEGER;function Mr(o,e){let r=[e];return o.hora&&o.vencimento&&(r[0]=e.replace(/\.$/,"")+` \xE0s ${o.hora}.`),o.texto&&r.push(o.texto),o.sigla&&r.push(`Definido por ${o.sigla} no controle de prazo do SEI.`),r.join(`
`)}function on(o,e){let r=o.vencimento;if(o.concluidoEm&&r)return{situacao:"concluido",texto:`conclu\xEDdo em ${io(o.concluidoEm).slice(0,5)}`,dica:Mr(o,`Prazo de ${io(r)} conclu\xEDdo em ${io(o.concluidoEm)}.`),ordem:Ya,sorter:`${r} 23:59:59`};if(r){let s=Bo(e,r),i=`${r} ${o.hora??"23:59"}:00`,c=Mr(o,`Vence em ${io(r)}.`);return s===0?{situacao:"hoje",texto:"vence hoje",dica:c,ordem:0,sorter:i}:s<0?{situacao:"atrasado",texto:`${ke(-s)} de atraso`,dica:c,ordem:s,sorter:i}:{situacao:"noPrazo",texto:`vence em ${ke(s)}`,dica:c,ordem:s,sorter:i}}let t=o.inicio??e,a=Bo(t,e);return{situacao:"desde",texto:a===0?"hoje":a>0?`h\xE1 ${ke(a)}`:`em ${ke(-a)}`,dica:Mr(o,`Contando desde ${io(t)}.`),ordem:Ya-1,sorter:`${t} ${o.hora??"23:59"}:00`}}function so(o,e){return o.prazo?on(o.prazo,e.hoje):null}function mo(o,e){return o.vistoEm===void 0?null:Math.max(0,Math.floor((e.agora-o.vistoEm)/864e5))}function Po(o,e){return o.ultimaMov?Math.max(0,Bo(o.ultimaMov,e.hoje)):null}function en(o,e){return e.visitaAnterior!==void 0&&o.vistoEm!==void 0&&o.vistoEm>e.visitaAnterior}function Zo(o,e){let r=so(o,e);return!r||r.situacao==="concluido"||r.situacao==="desde"?null:r.ordem}var Pi={resp:"resp",responsavel:"resp",atribuido:"resp",atribuicao:"resp",tipo:"tipo",marcador:"marcador",marcadores:"marcador",marc:"marcador",espec:"espec",especificacao:"espec",anot:"anot",anotacao:"anot",nota:"anot",prazo:"prazo",caixa:"caixa",idade:"caixa",novo:"novo",sigilo:"sigilo",sigiloso:"sigilo",grupo:"grupo",retorno:"retorno",protocolo:"protocolo",proc:"protocolo",processo:"protocolo",parado:"parado",mov:"parado",prio:"prio",prioridade:"prio",interessado:"interessado",interessados:"interessado"};function Lr(o){let e=[],r="",t=!1;for(let a of o)a==='"'?(t=!t,r+=a):/\s/.test(a)&&!t?(r&&e.push(r),r=""):r+=a;return r&&e.push(r),e}var Mi=o=>o.replace(/^"|"$/g,"");function Or(o){let e=[],r=[];for(let t of Lr(o)){let a=t,n=!1;a.startsWith("-")&&a.length>1&&(n=!0,a=a.slice(1));let s,i=/^([a-zA-Z\u00C0-\u017F]+):(.*)$/.exec(a);if(i){let f=Pi[B(i[1])];f&&(s=f,a=i[2])}let c="=";s&&/^[<>]/.test(a)&&(c=a[0],a=a.slice(1));let l=B(Mi(a));if(!l&&!s)continue;let p={...s?{campo:s}:{},valor:l,original:t,negado:n,comparador:c};e.push(p),r.push({texto:t,termo:p})}return{termos:e,tokens:r}}var ki=o=>B([o.protocolo,o.protocolo.replace(/\D/g,""),o.tipo,o.especificacao,o.atribuicao?.sigla,o.atribuicao?.nome,...o.marcadores.flatMap(e=>[e.nome,e.texto]),o.anotacao?.texto,o.prazo?.texto,o.prioridade,o.interessados,o.observacao].filter(Boolean).join(" ")),fo=(o,e)=>B(o??"").includes(e),rn=/^(s|sim|1|true|yes)$/;function kr(o){let e=/^(\d+)\s*(d|dia|dias)?$/.exec(o);return e?Number(e[1]):null}function Cr(o,e,r){return o===null?!1:e==="<"?o<r:e===">"?o>r:o===r}function Ci(o,e,r){let t=so(o,r),a=e.valor;if(a==="sem"||a==="nenhum"||a==="nao")return!o.prazo;if(a==="com"||a==="sim")return!!o.prazo;if(!t)return!1;if(a==="atrasado"||a==="atrasados"||a==="vencido")return t.situacao==="atrasado";if(a==="hoje")return t.situacao==="hoje";if(a==="concluido"||a==="concluidos")return t.situacao==="concluido";if(a==="semana"){let s=Zo(o,r);return s!==null&&s>=0&&s<=7}let n=kr(a);return n!==null?Cr(Zo(o,r),e.comparador==="="?"<":e.comparador,n):fo(o.prazo?.texto,a)}function Li(o,e,r){let t=e.valor;switch(e.campo){case"resp":return t==="sem"||t==="ninguem"?!o.atribuicao:t==="eu"?!!r.eu&&B(o.atribuicao?.sigla??"")===B(r.eu):fo(o.atribuicao?.sigla,t)||fo(o.atribuicao?.nome,t);case"tipo":return fo(o.tipo,t);case"marcador":return t==="sem"||t==="nenhum"?o.marcadores.length===0:t==="com"?o.marcadores.length>0:o.marcadores.some(a=>fo(a.nome,t)||fo(a.texto,t));case"espec":return fo(o.especificacao,t);case"anot":return t==="sem"||t==="nao"?!o.anotacao:t==="com"||t==="sim"?!!o.anotacao:t==="prioridade"||t==="prioritaria"?!!o.anotacao?.prioridade:fo(o.anotacao?.texto,t);case"prazo":return Ci(o,e,r);case"caixa":{let a=kr(t);return a===null?!1:Cr(mo(o,r),e.comparador==="="?">":e.comparador,a)}case"novo":return t==="visita"?en(o,r):rn.test(t)?o.naoVisualizado:t==="nao"?!o.naoVisualizado:!1;case"sigilo":return rn.test(t)?o.sigiloso:!o.sigiloso;case"grupo":return t.startsWith("rec")?o.grupo==="recebidos":t.startsWith("ger")?o.grupo==="gerados":!1;case"retorno":return t==="sem"||t==="nao"?o.retornos.length===0:t==="atrasado"?o.retornos.some(a=>a.atrasado):t==="aguardando"?o.retornos.some(a=>a.tipo==="aguardando"):t==="programado"?o.retornos.some(a=>a.tipo==="programado"):o.retornos.length>0;case"parado":{let a=kr(t);return a===null?!1:Cr(Po(o,r),e.comparador==="="?">":e.comparador,a)}case"prio":return fo(o.prioridade,t);case"interessado":return fo(o.interessados,t);case"protocolo":return B(o.protocolo).includes(t)||o.protocolo.replace(/\D/g,"").includes(t.replace(/\D/g,"")||"\0");default:return!0}}function Oi(o,e,r){if(!o.termos.length)return!0;let t;for(let a of o.termos){let n;if(a.campo?n=Li(e,a,r):(t??=ki(e),n=t.includes(a.valor)),a.negado?n:!n)return!1}return!0}var tn=(o,e,r)=>{let t=Or(e);return t.termos.length?o.filter(a=>Oi(t,a,r)):o};function Ce(o,e){return Lr(o).filter(r=>r!==e).join(" ")}function an(o,e,r){let t=/\s/.test(r)?`"${r}"`:r,a=`${e}:${t}`,n=Lr(o);return n.includes(a)?o:[...n,a].join(" ")}var Di=new Intl.Collator("pt-BR",{sensitivity:"base",numeric:!0});function Ii(o,e=[]){return[...o.values()].sort((r,t)=>{let a=e.indexOf(r.chave),n=e.indexOf(t.chave);return a>=0||n>=0?(a<0?-1:a)-(n<0?-1:n):Di.compare(r.rotulo,t.rotulo)})}function Q(o,e,r,t){let a=o.get(e);return a||(a={chave:e,rotulo:r,itens:[],...t?{tom:t}:{}},o.set(e,a)),a}var jo=[["atrasado","Atrasados","perigo"],["hoje","Vencem hoje","aviso"],["semana","Pr\xF3ximos 7 dias","aviso"],["mes","Pr\xF3ximos 30 dias","neutro"],["depois","Depois de 30 dias","neutro"],["desde","Contando desde uma data","neutro"],["concluido","Prazo conclu\xEDdo","neutro"],["sem","Sem prazo","neutro"]];function Yo(o,e){let r=so(o,e);if(!r)return"sem";if(r.situacao==="concluido")return"concluido";if(r.situacao==="desde")return"desde";if(r.situacao==="atrasado")return"atrasado";if(r.situacao==="hoje")return"hoje";let t=Zo(o,e)??0;return t<=7?"semana":t<=30?"mes":"depois"}var nn=[["recente","Chegaram hoje"],["semana","Nos \xFAltimos 7 dias"],["mes","Nos \xFAltimos 30 dias"],["antigo","H\xE1 mais de 30 dias"],["desconhecido","Sem registro"]];function $i(o,e){let r=mo(o,e);return r===null?"desconhecido":r<1?"recente":r<=7?"semana":r<=30?"mes":"antigo"}function $o(o,e){return e.map(r=>o.get(r[0])).filter(r=>!!r)}function Le(o,e,r){if(e==="nenhum")return[{chave:"todos",rotulo:"Todos",itens:o}];let t=new Map;for(let a of o)switch(e){case"responsavel":a.atribuicao?Q(t,`u:${a.atribuicao.sigla}`,a.atribuicao.nome===a.atribuicao.sigla?a.atribuicao.sigla:`${a.atribuicao.nome} (${a.atribuicao.sigla})`).itens.push(a):Q(t,"sem","Sem respons\xE1vel").itens.push(a);break;case"tipo":Q(t,`t:${a.tipo||"-"}`,a.tipo||"Sem tipo").itens.push(a);break;case"marcador":if(a.marcadores.length)for(let n of a.marcadores)Q(t,`m:${n.nome}`,n.nome).itens.push(a);else Q(t,"sem","Sem marcador").itens.push(a);break;case"prazo":{let n=Yo(a,r),s=jo.find(i=>i[0]===n);Q(t,n,s[1],s[2]).itens.push(a);break}case"situacao":a.naoVisualizado?Q(t,"novo","N\xE3o visualizados","aviso").itens.push(a):Q(t,"lido","Visualizados").itens.push(a);break;case"grupo":Q(t,a.grupo,a.grupo==="recebidos"?"Recebidos":"Gerados").itens.push(a);break;case"anotacao":a.anotacao?.prioridade?Q(t,"prio","Anota\xE7\xE3o com prioridade","aviso").itens.push(a):a.anotacao?Q(t,"com","Com anota\xE7\xE3o").itens.push(a):Q(t,"sem","Sem anota\xE7\xE3o").itens.push(a);break;case"acompanhamento":a.acompanhamentoEspecial?Q(t,"com","Em acompanhamento especial").itens.push(a):Q(t,"sem","Fora do acompanhamento especial").itens.push(a);break;case"retorno":a.retornos.some(n=>n.atrasado)?Q(t,"atrasado","Retorno atrasado","perigo").itens.push(a):a.retornos.some(n=>n.tipo==="aguardando")?Q(t,"aguardando","Aguardando retorno").itens.push(a):a.retornos.length?Q(t,"programado","Retorno programado").itens.push(a):Q(t,"sem","Sem retorno").itens.push(a);break;case"caixa":{let n=$i(a,r);Q(t,n,nn.find(s=>s[0]===n)[1]).itens.push(a);break}}return e==="prazo"?$o(t,jo):e==="caixa"?$o(t,nn):e==="situacao"?$o(t,[["novo",""],["lido",""]]):e==="grupo"?$o(t,[["recebidos",""],["gerados",""]]):e==="anotacao"?$o(t,[["prio",""],["com",""],["sem",""]]):e==="acompanhamento"?$o(t,[["com",""],["sem",""]]):e==="retorno"?$o(t,[["atrasado",""],["aguardando",""],["programado",""],["sem",""]]):Ii(t,["sem"])}var Dr={nenhum:"Sem agrupamento",responsavel:"Respons\xE1vel",tipo:"Tipo de processo",marcador:"Marcador",prazo:"Prazo",situacao:"Visualiza\xE7\xE3o",grupo:"Recebidos e gerados",anotacao:"Anota\xE7\xE3o",acompanhamento:"Acompanhamento especial",retorno:"Retorno programado",caixa:"Tempo na caixa"};var Ri=new Intl.Collator("pt-BR",{sensitivity:"base",numeric:!0});function Oe(o,e){let r=new Map;for(let t of o)for(let a of e(t)){let n=r.get(a.valor)??{valor:a.valor,rotulo:a.rotulo,n:0};n.n+=1,r.set(a.valor,n)}return[...r.values()].sort((t,a)=>a.n-t.n||Ri.compare(t.rotulo,a.rotulo))}function Ir(o,e){let r=Oe(o,t=>{let a=Yo(t,e),n=jo.find(i=>i[0]===a)[1],s=a==="atrasado"?"atrasado":a==="hoje"?"hoje":a==="semana"?"semana":a==="sem"?"sem":a==="concluido"?"concluido":"";return s?[{valor:s,rotulo:n}]:[]});return{responsaveis:Oe(o,t=>t.atribuicao?[{valor:t.atribuicao.sigla,rotulo:`${t.atribuicao.nome} (${t.atribuicao.sigla})`}]:[{valor:"sem",rotulo:"Sem respons\xE1vel"}]),tipos:Oe(o,t=>t.tipo?[{valor:t.tipo,rotulo:t.tipo}]:[]),marcadores:Oe(o,t=>t.marcadores.length?t.marcadores.map(a=>({valor:a.nome,rotulo:a.nome})):[{valor:"sem",rotulo:"Sem marcador"}]),prazos:r}}function $r(o){let e=[];o.sigiloso&&e.push("Sigiloso"),o.naoVisualizado&&e.push("N\xE3o visualizado"),o.documentoNovo&&e.push("Documento novo"),o.urgente&&e.push("Urgente"),o.trancado&&e.push("Trancado"),o.acompanhamentoEspecial&&e.push(o.acompanhamentoGrupo?`Acompanhamento especial (${o.acompanhamentoGrupo})`:"Acompanhamento especial");for(let r of o.retornos)e.push(`${r.tipo==="aguardando"?"Aguardando retorno":"Retorno programado"}${r.atrasado?" (atrasado)":""}`);return e}function Rr(o,e){let r=so(o,e);if(!o.prazo||!r)return"";let t=o.prazo.vencimento??o.prazo.inicio;return`${t?io(t):""}${o.prazo.hora?` ${o.prazo.hora}`:""} (${r.texto})`.trim()}var zi=(o,e,r)=>{switch(e){case"processo":return o.protocolo;case"tipo":return o.tipo;case"especificacao":return o.especificacao;case"responsavel":return o.atribuicao?o.atribuicao.nome===o.atribuicao.sigla?o.atribuicao.sigla:`${o.atribuicao.nome} (${o.atribuicao.sigla})`:"";case"marcadores":return o.marcadores.map(t=>t.texto?`${t.nome}: ${t.texto}`:t.nome).join("; ");case"prazo":return Rr(o,r);case"anotacao":return o.anotacao?.texto.replace(/\s*\n\s*/g," / ")??"";case"caixa":return qo(mo(o,r));case"parado":return qo(Po(o,r));case"sinais":return $r(o).join("; ")}};function sn(o,e,r){return[e.map(t=>Io[t]),...o.map(t=>e.map(a=>zi(t,a,r)))]}var cn=o=>`processos-${o}.csv`;function ln(o,e,r){let t=[];for(let a of o){let n=r&&e.has(a.chave);if(r&&t.push({tipo:"grupo",grupo:a,recolhido:n}),!n)for(let s of a.itens)t.push({tipo:"processo",processo:s,grupo:a.chave})}return t}var zr=new Intl.Collator("pt-BR",{numeric:!0,sensitivity:"base"});function dn(o){let e=/(\d+)\/(\d{4})-\d+\s*$/.exec(o);if(!e)return null;let r=/(\d+)\s*$/.exec(e[1].split(/[.-]/).pop()??"")?.[1]??e[1];return[Number(e[2]),Number(r)]}function Ni(o,e){let r=dn(o),t=dn(e);return r&&t&&(r[0]-t[0]||r[1]-t[1])||zr.compare(o,e)}function pn(o,e,r){switch(e){case"tipo":return o.tipo||null;case"responsavel":return o.atribuicao?.sigla??null;case"marcador":return o.marcadores[0]?.nome??null;case"prazo":{let t=so(o,r);return t?t.ordem:null}case"caixa":return mo(o,r);case"parado":return Po(o,r);case"novo":return o.naoVisualizado?0:1}}function Ti(o,e){return(r,t)=>{for(let a of o){let n;if(a.campo==="protocolo")n=Ni(r.protocolo,t.protocolo),a.decrescente&&(n=-n);else{let s=pn(r,a.campo,e),i=pn(t,a.campo,e);if(s===null&&i===null)continue;if(s===null)return 1;if(i===null)return-1;n=typeof s=="number"&&typeof i=="number"?s-i:zr.compare(String(s),String(i)),a.decrescente&&(n=-n)}if(n)return n}return 0}}function un(o,e,r){return e.length?[...o].sort(Ti(e,r)):o}function mn(o,e,r){let t=o.findIndex(s=>s.campo===e),a=t<0?{campo:e,decrescente:!1}:o[t].decrescente?null:{campo:e,decrescente:!0};if(!r)return a?[a]:[];if(t<0)return[...o,a];let n=[...o];return a?n[t]=a:n.splice(t,1),n}var Nr=new Intl.Collator("pt-BR",{sensitivity:"base",numeric:!0}),go="sem";function fn(o,e,r,t={}){let a=new Map,n=(i,c,l,p,f)=>{let m=a.get(i);return m||(m={chave:i,titulo:c,itens:[],aceitaSoltar:l,excedeu:!1,...p?{motivoSomenteLeitura:p}:{},...f?{tom:f}:{}},a.set(i,m)),m};if(e.colunas==="marcador"){n(go,"Sem marcador",!0);for(let i of[...t.marcadores??[]].sort(Nr.compare))n(`m:${i}`,i,!0);for(let i of o){i.marcadores.length||n(go,"Sem marcador",!0).itens.push(i);for(let c of i.marcadores)n(`m:${c.nome}`,c.nome,!0).itens.push(i)}}else if(e.colunas==="responsavel"){n(go,"Sem respons\xE1vel",!0);for(let i of t.responsaveis??[])n(`u:${i.sigla}`,`${i.nome} (${i.sigla})`,!0);for(let i of o)i.atribuicao?n(`u:${i.atribuicao.sigla}`,`${i.atribuicao.nome} (${i.atribuicao.sigla})`,!0).itens.push(i):n(go,"Sem respons\xE1vel",!0).itens.push(i)}else if(e.colunas==="prazo"){for(let[i,c,l]of jo)i!=="desde"&&n(i,c,!1,"O prazo \xE9 definido pelo bot\xE3o de prazo, n\xE3o arrastando.",l);for(let i of o){let c=Yo(i,r);n(c==="desde"?"sem":c,"",!1).itens.push(i)}}else for(let i of o)n(`t:${i.tipo}`,i.tipo||"Sem tipo",!1,"O tipo do processo n\xE3o muda arrastando.").itens.push(i);let s=[...a.values()];if(e.colunas==="prazo"&&(s=s.filter(i=>i.itens.length||i.titulo)),e.colunas==="marcador"||e.colunas==="responsavel"?s.sort((i,c)=>i.chave===go?-1:c.chave===go?1:Nr.compare(i.titulo,c.titulo)):e.colunas==="tipo"&&s.sort((i,c)=>Nr.compare(i.titulo,c.titulo)),e.limite>0)for(let i of s)i.excedeu=i.itens.length>e.limite;return s}var De=o=>o.slice(o.indexOf(":")+1);function gn(o,e,r,t){if(r===t)return{ok:!1,motivo:"Mesma coluna."};if(o==="marcador"){let a=r===go?void 0:De(r),n=t===go?void 0:De(t);if(a&&!e.marcadores.some(l=>l.nome===a))return{ok:!1,motivo:"O processo j\xE1 n\xE3o tem esse marcador."};let s=n?e.marcadores.some(l=>l.nome===n):!1,i=a?e.marcadores.find(l=>l.nome===a)?.texto:void 0,c={tipo:"marcador",id:e.id,protocolo:e.protocolo};return a&&(c.remover=a),n&&!s&&(c.adicionar=n,i&&(c.texto=i)),!c.remover&&!c.adicionar?{ok:!1,motivo:"Nada a mudar."}:{ok:!0,movimento:c}}return o==="responsavel"?{ok:!0,movimento:{tipo:"atribuicao",id:e.id,protocolo:e.protocolo,para:t===go?null:De(t),de:r===go?null:De(r)}}:{ok:!1,motivo:"Esta divis\xE3o do quadro \xE9 s\xF3 de leitura."}}function Tr(o,e,r={}){if(e.tipo==="atribuicao"){if(e.para===null){let{atribuicao:a,...n}=o;return n}return{...o,atribuicao:{sigla:e.para,nome:r[e.para]??e.para}}}let t=o.marcadores;return e.remover&&(t=t.filter(a=>a.nome!==e.remover)),e.adicionar&&(t=[...t,{nome:e.adicionar,cor:"",texto:e.texto??""}]),{...o,marcadores:t}}var _r="application/x-spro-cartao";function _i(o,e,r){let t=so(o,r.ctx),a=d("input",{type:"checkbox",class:"spro-cb","aria-label":`Marcar ${o.protocolo}`});a.checked=r.selecionados.has(o.id),a.addEventListener("change",()=>r.aoSelecionar(o.id,a.checked));let n=d("div",{class:`spro-cartao${a.checked?" spro-sel":""}`,draggable:"true","data-id":o.id,"data-de":e},d("div",{class:"spro-cartao-topo"},a,d("a",{class:`spro-proc${o.naoVisualizado?" spro-novo":""}`,href:o.link??"#",draggable:"false"},o.protocolo)),o.tipo?d("div",{class:"spro-cartao-tipo"},o.tipo):null,o.especificacao?d("div",{class:"spro-cartao-espec"},o.especificacao):null,d("div",{class:"spro-cartao-rodape"},t?d("span",{class:`spro-prazo spro-prazo-${t.situacao}`,title:t.dica},t.texto):null,o.atribuicao?d("span",{class:"spro-avatar",title:o.atribuicao.nome},o.atribuicao.sigla.slice(0,2).toUpperCase()):null));return n.addEventListener("dragstart",s=>{s.dataTransfer?.setData(_r,JSON.stringify({id:o.id,de:e})),s.dataTransfer?.setData("text/plain",o.protocolo),s.dataTransfer&&(s.dataTransfer.effectAllowed="move"),n.classList.add("spro-arrastando")}),n.addEventListener("dragend",()=>n.classList.remove("spro-arrastando")),n}function qi(o,e){let r=d("div",{class:"spro-col-corpo"},...o.itens.map(s=>_i(s,o.chave,e)));o.itens.length||r.append(d("div",{class:"spro-col-vazia"},o.aceitaSoltar?"Solte aqui":"Vazia"));let t=e.cfg.limite,a=d("div",{class:"spro-col-topo"},d("span",{class:"spro-col-titulo",title:o.titulo},o.titulo),d("span",{class:`spro-col-n${o.excedeu?" spro-excedeu":""}`,title:o.excedeu?`Passou do limite de ${t}`:void 0},t>0?`${o.itens.length}/${t}`:String(o.itens.length)),o.aceitaSoltar?null:d("span",{class:"spro-col-trava",title:o.motivoSomenteLeitura},eo("bloquear",13))),n=d("section",{class:`spro-col${o.tom?` spro-tom-${o.tom}`:""}${o.excedeu?" spro-col-cheia":""}`,"data-chave":o.chave},a,r);return n.addEventListener("dragover",s=>{s.dataTransfer?.types.includes(_r)&&o.aceitaSoltar&&(s.preventDefault(),n.classList.add("spro-alvo"))}),n.addEventListener("dragleave",()=>n.classList.remove("spro-alvo")),n.addEventListener("drop",s=>{n.classList.remove("spro-alvo");let i=s.dataTransfer?.getData(_r);if(i){s.preventDefault();try{let{id:c,de:l}=JSON.parse(i);e.aoMover(c,l,o.chave)}catch{}}}),n}function hn(o){let e=d("div",{class:"spro-quadro"}),r=t=>d("div",{class:"spro-colunas"},...fn(t,o.cfg,o.ctx,o.extras).map(a=>qi(a,o)));if(o.cfg.raiasPorResponsavel&&o.cfg.colunas!=="responsavel")for(let t of Le(o.processos,"responsavel",o.ctx))e.append(d("div",{class:"spro-raia"},d("div",{class:"spro-raia-nome"},t.rotulo,d("span",{class:"spro-grupo-n"},String(t.itens.length))),r(t.itens)));else e.append(r(o.processos));return o.processos.length||e.prepend(d("div",{class:"spro-vazio"},"Nenhum processo corresponde ao filtro.")),e}var bn=".spro-fav-estrela, .spro-prj-ic, .spro-dem-cx",Vi=[".spro-fav-",".spro-prj-",".spro-dem-cx"],vn=(o,e)=>o.getElementById(`P${e}`)?.querySelectorAll("td")[1],Ie=["spro-fav-estrela","spro-prj-ic","spro-dem-cx"],qr=o=>Ie.find(e=>o.classList.contains(e))??"";function Hi(o,e,r){for(let t of Array.from(o.attributes))!e.hasAttribute(t.name)&&t.name!=="data-spro-id"&&t.name!=="data-tip"&&o.removeAttribute(t.name);for(let t of Array.from(e.attributes))t.name!=="aria-busy"&&t.name!=="title"&&o.getAttribute(t.name)!==t.value&&o.setAttribute(t.name,t.value);e.getAttribute("title")&&o.getAttribute("data-tip")!==e.getAttribute("title")&&o.setAttribute("data-tip",e.getAttribute("title")),o.removeAttribute("aria-busy"),o.setAttribute("data-spro-id",r),o.innerHTML!==e.innerHTML&&o.replaceChildren(...Array.from(e.cloneNode(!0).childNodes))}function xn(){let o=new Map;return function(r,t){let a=vn(r,t),n=new Set,s=[];if(a){let i=[...a.querySelectorAll(bn)].sort((c,l)=>Ie.indexOf(qr(c))-Ie.indexOf(qr(l)));for(let c of i){let l=`${t}|${qr(c)}`;n.add(l);let p=o.get(l);p?Hi(p,c,t):(p=c.cloneNode(!0),p.removeAttribute("aria-busy"),p.setAttribute("data-spro-id",t),o.set(l,p)),s.push(p)}}for(let i of Ie)n.has(`${t}|${i}`)||o.delete(`${t}|${i}`);return s}}function Vr(o,e){let r=vn(o,e);return r?[...r.querySelectorAll(`${bn}, .acompanhamentoesp_icon`)].map(t=>`${t.className}|${t.getAttribute("aria-pressed")??""}|${t.getAttribute("aria-label")??""}|${t.hasAttribute("data-atraso")?1:0}|${t.querySelector('[class$="-n"]')?.textContent??""}`).join(";"):""}function yn(o){let e=[];for(let r of Array.from(o.styleSheets??[])){let t;try{t=r.cssRules}catch{continue}for(let a of Array.from(t)){let n=a.cssText;Vi.some(s=>n.includes(s))&&e.push(n)}}return e.join(`
`)}function An(o,e){let r=s=>s.trim().toLowerCase(),t=new Map;for(let s of e)s.nome.trim()&&!t.has(r(s.nome))&&t.set(r(s.nome),{nome:s.nome.trim(),texto:s.texto.trim().slice(0,250)});let a=new Map(o.map(s=>[r(s.nome),s])),n=[];for(let s of o)t.has(r(s.nome))||n.push({tipo:"remover",nome:s.nome});for(let[s,i]of t)a.has(s)||n.push({tipo:"adicionar",nome:i.nome,texto:i.texto});for(let[s,i]of t){let c=a.get(s);c&&c.texto.trim()!==i.texto&&n.push({tipo:"texto",nome:c.nome,texto:i.texto})}return n}function En(o,e,r=()=>""){let t=[...o.marcadores];for(let a of e)a.tipo==="remover"?t=t.filter(n=>n.nome!==a.nome):a.tipo==="adicionar"?t.push({nome:a.nome,cor:r(a.nome),texto:a.texto}):t=t.map(n=>n.nome===a.nome?{...n,texto:a.texto}:n);return{...o,marcadores:t}}function $e(o){return o.replace(/\r\n?/g,`
`).trim().slice(0,500)}function Sn(o,e,r,t=""){let a=$e(e);if(!a){let{anotacao:n,...s}=o;return s}return{...o,anotacao:{texto:a,autor:o.anotacao?.autor??t,prioridade:r}}}function wn(o,e){if(!e){let{atribuicao:r,...t}=o;return t}return{...o,atribuicao:e}}function Re(o,e,r,t,a){let n=new Set([o.id]);if(t)for(let s of e)n.add(s);return r.filter(s=>n.has(s.id)&&a(s))}function Hr(o,e){let r=new Set(e.marcadores.map(t=>t.nome.trim().toLowerCase()));return o.filter(t=>{let a=r.has(t.nome.trim().toLowerCase());return t.tipo==="adicionar"?!a:a})}function ze(o,e){let r=o.ownerDocument??document;for(let n of Array.from(o.querySelectorAll("dialog.spro-dialogo-grade")))n.remove();let t=d("dialog",{class:`spro-dialogo spro-dialogo-grade${e.largo?" spro-dialogo-largo":""}`,"aria-label":e.titulo}),a=()=>{t.open?t.close():t.remove()};return t.append(d("header",{},e.icone?d("span",{class:"spro-dialogo-icone","aria-hidden":"true"},_(e.icone,18)):null,d("h2",{},e.titulo,e.subtitulo?d("small",{class:"spro-dialogo-sub"},e.subtitulo):null),d("button",{type:"button",class:"spro-botao-icone","aria-label":"Fechar",title:"Fechar (Esc)",onclick:a},_("fechar",16))),d("div",{class:"spro-dialogo-corpo"},e.conteudo)),t.addEventListener("close",()=>{t.remove(),e.aoFechar?.()}),o.append(t),typeof t.showModal=="function"?t.showModal():t.setAttribute("open",""),t.querySelector(".spro-combo, textarea, input:not([type=checkbox])")?.focus({preventScroll:!0}),{fechar:a,dlg:t}}var ji=30;function Fi(o){let e=[],r=(a,n)=>{let s=a?.getAttribute("data-tarefa");e.push({marca:s==null?null:s==="x",texto:n.replace(/\u00a0/g," ").replace(/\n+$/,"")})},t="";for(let a of Array.from(o.childNodes))if(a.nodeType===3)t+=a.textContent??"";else if(a.nodeType===1){let n=a;if(t){for(let s of t.split(`
`))r(null,s);t=""}n.tagName==="BR"?r(null,""):r(n,n.textContent??"")}if(t)for(let a of t.split(`
`))r(null,a);return e.length?e:[{marca:null,texto:""}]}function Pn(o,e){let r=o.ownerDocument;o.replaceChildren(...e.map(t=>{let a=r.createElement("div");return a.className="spro-pi-linha",t.marca!==null&&a.setAttribute("data-tarefa",t.marca?"x":"o"),t.texto?a.textContent=t.texto:a.append(r.createElement("br")),a}))}function Mn(o,e){let r=o.prioridade,t=()=>{},a=d("div",{class:"spro-pi-editor",contenteditable:"true",role:"textbox","aria-multiline":"true","aria-label":"Anota\xE7\xE3o",spellcheck:"true"}),n=d("span",{class:"spro-pi-contador"}),s=d("button",{type:"button",class:"spro-pi-bt","data-tip":"Lista de tarefas (nas linhas selecionadas)","aria-label":"Lista de tarefas"},_("check",16)),i=d("button",{type:"button",class:"spro-pi-bt","data-tip":"Prioridade","aria-label":"Prioridade"},eo("prioridade",16)),c=d("button",{type:"button",class:"spro-pi-bt","data-tip":"Inserir a data de hoje","aria-label":"Inserir a data de hoje"},_("calendario",16)),l=d("div",{class:"spro-pi-barra"},s,c,i,n),p=d("div",{class:"spro-pi"},a,l),f=()=>Fi(a),m=()=>da(f());function A(){p.classList.toggle("spro-pi-prio",r),i.setAttribute("aria-pressed",String(r));let w=m().length;n.textContent=`${w}/${500}`,n.classList.toggle("spro-pi-estouro",w>500),t()}Pn(a,Jo(o.texto)),A();function E(){let w=e.getSelection?.()??e.ownerDocument.getSelection?.()??null,v=Array.from(a.children),S=z=>{let b=z;for(;b&&b.parentNode!==a;)b=b.parentNode;return b?v.indexOf(b):-1};if(!w||!w.rangeCount)return[];let y=S(w.anchorNode),P=S(w.focusNode);if(y<0&&P<0)return[];let[R,$]=[Math.min(y<0?P:y,P<0?y:P),Math.max(y,P)];return Array.from({length:$-R+1},(z,b)=>R+b)}let M=w=>{Pn(a,w),A()};for(let w of[s,c,i])w.addEventListener("mousedown",v=>v.preventDefault());return s.addEventListener("click",()=>{let w=f(),v=E();M(pr(w,v.length?v:w.map((S,y)=>y).filter(S=>S===w.length-1))),a.focus()}),i.addEventListener("click",()=>{r=!r,A()}),c.addEventListener("click",()=>{a.focus();let w=io(To());e.ownerDocument.execCommand?.("insertText",!1,w)||(a.append(w),A())}),a.addEventListener("input",A),a.addEventListener("paste",w=>{w.preventDefault();let v=w.clipboardData?.getData("text/plain")??"";e.ownerDocument.execCommand?.("insertText",!1,v.replace(/\r\n?/g,`
`))}),a.addEventListener("mousedown",w=>{let v=w.target.closest?.(".spro-pi-linha");!v||!v.hasAttribute("data-tarefa")||w.clientX-v.getBoundingClientRect().left>ji||(w.preventDefault(),M(pa(f(),Array.from(a.children).indexOf(v))))}),a.addEventListener("keydown",w=>{if(w.key!=="Enter"||w.shiftKey)return;let v=e.getSelection?.()??e.ownerDocument.getSelection?.()??null,S=E(),y=f();v?.isCollapsed&&S.length===1&&y[S[0]]?.marca!==null&&!y[S[0]].texto.trim()&&(w.preventDefault(),M(pr(y,[S[0]])))}),{el:p,texto:m,prioridade:()=>r,aoMudar:w=>{t=w},foco:()=>{a.focus()}}}var Gi=[[/azul_marinho|marinho/,"#1d3557"],[/azul_claro|ciano|celeste/,"#2a9fd6"],[/azul/,"#2563c9"],[/verde_escuro/,"#166534"],[/verde|lima/,"#2e9e4f"],[/amarelo/,"#e0b000"],[/laranja/,"#ee7d11"],[/vermelho/,"#d1352b"],[/rosa|magenta/,"#d6409f"],[/roxo|violeta|lilas/,"#7048c6"],[/marrom/,"#8a5a3c"],[/preto/,"#222831"],[/cinza/,"#7b838c"]];function oe(o){let e=o.toLowerCase();return Gi.find(([r])=>r.test(e))?.[1]??"#8b939c"}var Bi=o=>o instanceof Error?o.message:String(o);async function jr(o,e,r,t,a){let n=0,s=[],i=0;for(let c of e){let l=o.todos().find(p=>p.id===c.id)??c;o.aplicarLocal(l.id,r(l));try{await o.gravar(()=>t(l)),n+=1}catch(p){o.aplicarLocal(l.id,l),s.push(`${l.protocolo}: ${Bi(p)}`)}a?.(i+=1,e.length)}return{ok:n,falhas:s}}function Fr(o,e,r){e.falhas.length?o.aviso(`${r}: ${e.ok} ok, ${e.falhas.length} com erro \u2014 ${e.falhas[0]}`):o.aviso(`${r}: ${e.ok} ${e.ok===1?"processo atualizado":"processos atualizados"}.`)}function kn(o,e,r){let t=Re(e,o.selecionados(),o.todos(),!0,r).filter(n=>n.id!==e.id);if(!t.length)return null;let a=d("input",{type:"checkbox"});return{el:d("label",{class:"spro-rotulo-linha spro-estender"},a,` Aplicar tamb\xE9m aos ${t.length} ${t.length===1?"outro selecionado":"outros selecionados"}`),marcado:()=>a.checked,n:()=>t.length}}var Gr=(...o)=>d("div",{class:"spro-dialogo-rodape"},...o),Ur=(o="Salvar")=>d("button",{type:"button",class:"spro-botao primario"},_("check",15),o);function Cn(o,e){let r=[],t=e.atribuicao?.sigla??"",a=wo({rotulo:"Respons\xE1vel",icone:"pessoa",busca:!0,larguraLista:320,vazio:"Escolher o respons\xE1vel\u2026",opcoes:()=>[{valor:"",rotulo:"Sem respons\xE1vel",descricao:"Remove a atribui\xE7\xE3o"},...r.map(p=>({valor:p.sigla,rotulo:p.nome===p.sigla?p.sigla:p.nome,descricao:p.sigla}))],valor:[t],aoMudar:([p])=>{t=p??"",c()}}),n=kn(o,e,()=>!0),s=Ur(),i=d("p",{class:"spro-suave"},"Carregando os usu\xE1rios da unidade\u2026"),c=()=>{s.disabled=!r.length||t===(e.atribuicao?.sigla??"")},l=ze(o.raiz,{titulo:"Respons\xE1vel",subtitulo:e.protocolo,icone:"pessoa",conteudo:d("div",{class:"spro-form"},d("label",{class:"spro-campo-rotulo"},"Atribuir a",a.el),i,n?.el??null,Gr(s))});o.extras().then(p=>{r=p.responsaveis??[],i.textContent=r.length?"":"N\xE3o foi poss\xEDvel ler os usu\xE1rios da unidade.",a.atualizar(),c()}).catch(()=>{i.textContent="N\xE3o foi poss\xEDvel ler os usu\xE1rios da unidade."}),c(),s.addEventListener("click",async()=>{let p=t?r.find(m=>m.sigla===t)??{sigla:t,nome:t}:null,f=n?.marcado()?Re(e,o.selecionados(),o.todos(),!0,()=>!0):[e];s.disabled=!0,l.fechar(),Fr(o,await jr(o,f,m=>wn(m,p),m=>o.atribuir(m.protocolo,p?.sigla??null)),p?`Respons\xE1vel: ${p.nome}`:"Atribui\xE7\xE3o removida")})}function Ln(o,e){let r=Mn({texto:e.anotacao?.texto??"",prioridade:e.anotacao?.prioridade??!1},o.raiz),t=Ur(),a=e.anotacao?d("button",{type:"button",class:"spro-botao perigo"},_("lixeira",15),"Remover anota\xE7\xE3o"):null,n=()=>{let c=$e(r.texto()),l=r.texto().length>500;t.disabled=!c||l||c===(e.anotacao?.texto??"")&&r.prioridade()===(e.anotacao?.prioridade??!1)};r.aoMudar(n);let s=ze(o.raiz,{titulo:"Anota\xE7\xE3o",subtitulo:e.protocolo,icone:"nota",largo:!0,conteudo:d("div",{class:"spro-form"},r.el,e.anotacao?.autor?d("p",{class:"spro-suave"},`\xDAltima edi\xE7\xE3o: ${e.anotacao.autor}`):null,Gr(a,t))});r.foco(),n();let i=async(c,l,p)=>{s.fechar(),Fr(o,await jr(o,[e],f=>Sn(f,c,l,o.autor),f=>o.anotar(f.protocolo,{texto:c,prioridade:l})),p)};t.addEventListener("click",()=>void i($e(r.texto()),r.prioridade(),"Anota\xE7\xE3o salva")),a?.addEventListener("click",()=>void i("",!1,"Anota\xE7\xE3o removida"))}function On(o,e){let r=e.marcadores.map(m=>({nome:m.nome,texto:m.texto})),t=[],a=d("div",{class:"spro-marcadores-lista"}),n=kn(o,e,m=>!m.sigiloso),s=Ur(),i=d("p",{class:"spro-suave"},"Carregando os marcadores da unidade\u2026"),c=wo({rotulo:"Adicionar marcador",icone:"etiqueta",busca:!0,larguraLista:320,vazio:"Adicionar marcador\u2026",opcoes:()=>t.filter(m=>!r.some(A=>A.nome.toLowerCase()===m.toLowerCase())).map(m=>({valor:m,rotulo:m,cor:oe(o.corDoMarcador(m))})),aoMudar:([m])=>{m&&(r=[...r,{nome:m,texto:""}],c.definir([],!1),p())}}),l=()=>An(e.marcadores,r);function p(){a.replaceChildren(...r.length?r.map((m,A)=>{let E=d("input",{type:"text",class:"spro-campo",maxlength:String(250),placeholder:"Texto do marcador (opcional)","aria-label":`Texto de ${m.nome}`,value:m.texto});return E.addEventListener("input",()=>{r[A]={...m,texto:E.value},s.disabled=!l().length}),d("div",{class:"spro-marcador-linha"},d("span",{class:"spro-marcador",title:m.nome},d("i",{style:`background:${oe(o.corDoMarcador(m.nome))}`}),m.nome),E,d("button",{type:"button",class:"spro-botao-icone pequeno",title:`Remover ${m.nome}`,"aria-label":`Remover ${m.nome}`,onclick:()=>{r=r.filter((M,w)=>w!==A),p()}},_("fechar",13)))}):[d("p",{class:"spro-suave"},"Nenhum marcador. Adicione abaixo.")]),c.atualizar(),s.disabled=!l().length}let f=ze(o.raiz,{titulo:"Marcadores",subtitulo:e.protocolo,icone:"etiqueta",conteudo:d("div",{class:"spro-form"},a,c.el,i,n?.el??null,Gr(s))});p(),o.extras().then(m=>{t=m.marcadores??[],i.textContent=t.length?"":"N\xE3o foi poss\xEDvel ler os marcadores da unidade.",p()}).catch(()=>{i.textContent="N\xE3o foi poss\xEDvel ler os marcadores da unidade."}),s.addEventListener("click",async()=>{let m=l();if(!m.length)return;let A=n?.marcado()?Re(e,o.selecionados(),o.todos(),!0,E=>!E.sigiloso):[e];f.fechar(),Fr(o,await jr(o,A,E=>En(E,Hr(m,E),o.corDoMarcador),async E=>{for(let M of Hr(m,E))M.tipo==="remover"?await o.marcar(E.protocolo,{marcador:M.nome,remover:!0}):await o.marcar(E.protocolo,{marcador:M.nome,texto:M.texto})}),"Marcadores")})}function Dn(o,e,r,t,a=8){let n=Math.max(1,e),s=t>0?t:n*40,i=Math.max(0,Math.min(o,Math.floor(r/n)-a)),c=Math.min(o,Math.ceil((r+s)/n)+a);return{inicio:i,fim:c,antes:i*n,depois:Math.max(0,o-c)*n}}var Te={compacta:34,confortavel:48},Qi={processo:"minmax(340px, 370px)",tipo:"minmax(120px, 1.2fr)",especificacao:"minmax(200px, 2fr)",responsavel:"minmax(90px, 130px)",marcadores:"minmax(120px, 1.3fr)",prazo:"minmax(120px, 150px)",anotacao:"minmax(130px, 1.4fr)",caixa:"84px",parado:"84px",sinais:"minmax(110px, 150px)"},Xi={processo:"protocolo",tipo:"tipo",responsavel:"responsavel",marcadores:"marcador",prazo:"prazo",caixa:"caixa",parado:"parado",sinais:"novo"};function Ki(o){let e=o.trim().split(/\s+/);return e.length>2?`${e[0]} ${e[e.length-1]}`:o}function _e(o,e){return d("button",{type:"button",class:"spro-lapis",title:o,"aria-label":o,onclick:r=>{r.preventDefault(),r.stopPropagation(),e()}},_("lapis",13))}var ro=(o,e,r)=>d(o,{class:e},r);function Ji(o,e,r,t){let a=ro("div",`spro-c spro-c-${e}`);switch(e){case"processo":{let n=t.icones(o.id),s=p=>n.find(f=>f.classList.contains(p))??d("span",{class:"spro-slot"}),i=o.acompanhamentoEspecial?d("span",{class:"spro-acomp",title:o.acompanhamentoGrupo?`Acompanhamento especial: ${o.acompanhamentoGrupo}`:"Acompanhamento especial"},_("olho",15)):d("span",{class:"spro-slot"});a.append(d("span",{class:"spro-icones"},s("spro-fav-estrela"),s("spro-prj-ic"),s("spro-dem-cx"),i));let c=o.grupo==="recebidos";t.semOrigem||a.append(d("span",{class:`spro-origem spro-origem-${o.grupo}`,title:c?"Processo recebido: veio de outra unidade":"Processo gerado: autuado nesta unidade",role:"img","aria-label":c?"Processo recebido":"Processo gerado"},eo(c?"recebido":"gerado",16)));let l=d("a",{class:`spro-proc${o.naoVisualizado?" spro-novo":""}`,href:o.link??"#",title:"Abrir o processo"},o.protocolo);a.append(l),o.link&&a.append(d("a",{class:"spro-nova-guia",href:o.link,target:"_blank",rel:"noopener",title:"Abrir em nova guia","aria-label":`Abrir ${o.protocolo} em nova guia`},eo("novaGuia",14))),o.sigiloso&&a.append(d("span",{class:"spro-sigilo",title:"Processo sigiloso"},"sigiloso")),o.urgente&&a.append(d("span",{class:"spro-urgente",title:"Marcado como urgente"},"urgente")),o.trancado&&a.append(d("span",{class:"spro-sigilo",title:"Processo trancado"},"trancado"));break}case"tipo":a.append(ro("span","spro-corta",o.tipo)),a.title=o.tipo;break;case"especificacao":{if(a.classList.add("spro-editavel"),t.editando===o.id){let n=d("input",{type:"text",class:"spro-espec-input",maxlength:"100",value:t.rascunho,"aria-label":"Especifica\xE7\xE3o do processo"});n.addEventListener("input",()=>t.aoDigitarEspec(n.value)),n.addEventListener("keydown",l=>{l.stopPropagation(),l.key==="Enter"?t.aoSalvarEspec(o.id):l.key==="Escape"&&t.aoCancelarEspec()});let s=l=>l.preventDefault(),i=d("button",{type:"button",class:"spro-lapis spro-lapis-ok",title:"Salvar (Enter)","aria-label":"Salvar",onclick:()=>t.aoSalvarEspec(o.id)},_("check",14)),c=d("button",{type:"button",class:"spro-lapis",title:"Cancelar (Esc)","aria-label":"Cancelar",onclick:()=>t.aoCancelarEspec()},_("fechar",14));i.addEventListener("pointerdown",s),c.addEventListener("pointerdown",s),a.append(d("span",{class:"spro-edicao"},n,i,c));break}a.append(ro("span","spro-corta",o.especificacao)),a.title=o.especificacao,o.sigiloso||a.append(_e("Editar a especifica\xE7\xE3o",()=>t.aoEditarEspec(o.id)));break}case"responsavel":a.classList.add("spro-editavel"),o.atribuicao?(a.append(ro("span","spro-corta",t.nomesCompletos?Ki(o.atribuicao.nome):o.atribuicao.sigla)),a.title=t.nomesCompletos?o.atribuicao.sigla:o.atribuicao.nome):a.append(d("span",{class:"spro-prazo-vazio spro-vazio-edicao"},"atribuir")),a.append(_e(o.atribuicao?"Mudar o respons\xE1vel":"Atribuir a algu\xE9m",()=>t.aoEditar(o.id,"responsavel")));break;case"marcadores":a.classList.add("spro-editavel","spro-editavel-quebra");for(let n of o.marcadores){let s=d("span",{class:"spro-marcador",title:n.texto?`${n.nome}: ${n.texto}`:n.nome},d("i",{style:`background:${oe(n.cor)}`}),n.nome);a.append(s)}o.sigiloso||(o.marcadores.length||a.append(d("span",{class:"spro-prazo-vazio spro-vazio-edicao"},"marcar")),a.append(_e(o.marcadores.length?"Editar os marcadores":"Adicionar marcador",()=>t.aoEditar(o.id,"marcadores"))));break;case"prazo":{let n=so(o,r);a.classList.add("spro-editavel");let s=n?"Editar o prazo":"Definir um prazo",i=d("button",{type:"button",class:"spro-prazo-b",title:n?`${Rr(o,r)}
${n.dica}

${s}`:s,"aria-label":s,onclick:c=>{c.preventDefault(),c.stopPropagation(),t.aoAbrirPrazo(o.id)}},n?ro("span",`spro-prazo spro-prazo-${n.situacao}`,n.texto):ro("span","spro-prazo-vazio","definir"));a.append(i,d("span",{class:"spro-lapis spro-lapis-fixo","aria-hidden":"true"},_("lapis",13)));break}case"anotacao":a.classList.add("spro-editavel"),o.anotacao?(a.append(ro("span",`spro-corta${o.anotacao.prioridade?" spro-prio":""}`,ua(o.anotacao.texto))),a.setAttribute("data-tip-nota",o.anotacao.texto),a.setAttribute("data-tip-autor",o.anotacao.autor)):o.sigiloso||a.append(d("span",{class:"spro-prazo-vazio spro-vazio-edicao"},"anotar")),o.sigiloso||a.append(_e(o.anotacao?"Editar a anota\xE7\xE3o":"Adicionar anota\xE7\xE3o",()=>t.aoEditar(o.id,"anotacao")));break;case"caixa":{let n=qo(mo(o,r));a.append(ro("span","spro-suave",n)),n&&(a.title=Ta);break}case"parado":{let n=Po(o,r);a.append(ro("span","spro-suave",qo(n))),n!==null&&(a.title="Dias desde a \xFAltima movimenta\xE7\xE3o (vis\xE3o detalhada do SEI).");break}case"sinais":for(let n of $r(o))a.append(ro("span","spro-sinal",n));break}return a}function In(o){let e=o,r=ro("div","spro-cab"),t=ro("div","spro-corpo"),a=d("div",{class:"spro-rolagem",tabindex:"-1"},t),n=d("div",{class:"spro-tabela",role:"table"},r,a),s="",i=!1,c=!1,l=()=>`36px ${e.colunas.map(v=>Qi[v]).join(" ")}`;function p(){r.replaceChildren(),r.style.gridTemplateColumns=l();let v=e.linhas.filter(P=>P.tipo==="processo").map(P=>P.processo.id),S=v.filter(P=>e.selecionados.has(P)).length,y=d("input",{type:"checkbox",class:"spro-cb","aria-label":"Marcar todos os processos vis\xEDveis",title:"Marcar todos os vis\xEDveis",disabled:!v.length});y.checked=v.length>0&&S===v.length,y.indeterminate=S>0&&S<v.length,y.addEventListener("change",()=>e.aoMarcarGrupo(v,y.checked)),r.append(ro("div","spro-c spro-c-cb")),r.firstElementChild.append(y);for(let P of e.colunas){let R=Xi[P],$=R?e.ordem.findIndex(b=>b.campo===R):-1,z=d("div",{class:`spro-c spro-th${R?" spro-ordenavel":""}`,role:"columnheader",...$>=0?{"aria-sort":e.ordem[$].decrescente?"descending":"ascending"}:{}});if(R){let b=d("button",{type:"button",class:"spro-th-b",title:"Ordenar (Shift acrescenta outro crit\xE9rio)",onclick:L=>e.aoOrdenar(R,L.shiftKey)},Io[P]);$>=0&&b.append(d("span",{class:"spro-seta-ordem"},`${e.ordem[$].decrescente?"\u2193":"\u2191"}${e.ordem.length>1?$+1:""}`)),z.append(b)}else z.append(Io[P]);r.append(z)}}function f(v,S){let y=e.selecionados.has(v.id),P=d("input",{type:"checkbox",class:"spro-cb","aria-label":`Marcar ${v.protocolo}`,title:v.naPaginaAtual?void 0:`Est\xE1 na p\xE1gina ${v.pagina+1} do SEI: as a\xE7\xF5es do SEI aceitam processos de uma p\xE1gina por vez`});P.checked=y,P.addEventListener("change",()=>e.aoSelecionar(v.id,P.checked));let R=d("div",{class:`spro-linha${y?" spro-sel":""}${e.foco===v.id?" spro-foco":""}${v.urgente?" spro-linha-urgente":""}`,role:"row","data-id":v.id,"data-grupo":S});R.style.gridTemplateColumns=l(),R.style.height=`${Te[e.densidade]}px`;let $=ro("div","spro-c spro-c-cb");return $.append(P),R.append($,...e.colunas.map(z=>Ji(v,z,e.ctx,e))),R}function m(v){let S=v.grupo.itens.map(R=>R.id),y=d("button",{type:"button",class:"spro-grupo-b","aria-expanded":String(!v.recolhido),onclick:()=>e.aoGrupo(v.grupo.chave)},d("span",{class:`spro-grupo-seta${v.recolhido?" spro-fechado":""}`},eo("seta",14)),d("span",{class:"spro-grupo-nome"},v.grupo.rotulo),d("span",{class:"spro-grupo-n"},String(v.grupo.itens.length))),P=d("div",{class:`spro-grupo${v.grupo.tom?` spro-tom-${v.grupo.tom}`:""}`,role:"row"},y);if(S.length){let R=S.every($=>e.selecionados.has($));P.append(d("button",{type:"button",class:"spro-link",onclick:()=>e.aoMarcarGrupo(S,!R)},R?"Desmarcar grupo":"Marcar grupo"))}return P.style.height=`${Te[e.densidade]}px`,P}function A(){let v=Te[e.densidade],S=Dn(e.linhas.length,v,a.scrollTop||0,a.clientHeight||0);t.style.paddingTop=`${S.antes}px`,t.style.paddingBottom=`${S.depois}px`,t.replaceChildren(...e.linhas.slice(S.inicio,S.fim).map(P=>P.tipo==="grupo"?m(P):f(P.processo,P.grupo)));let y=t.querySelector(".spro-espec-input");y&&i?(i=!1,y.focus(),y.setSelectionRange?.(y.value.length,y.value.length)):y&&y.getRootNode()instanceof ShadowRoot&&y.getRootNode().activeElement!==y&&c&&y.focus()}let E=0;a.addEventListener("scroll",()=>{if(E)return;let v=a.ownerDocument.defaultView;if(!v?.requestAnimationFrame)return A();E=v.requestAnimationFrame(()=>{E=0,A()})});function M(v){let S=v.colunas.join()!==e.colunas.join()||v.ordem!==e.ordem||v.selecionados!==e.selecionados;v.editando&&v.editando!==e.editando&&(i=!0),c=!!v.editando,e=v;let y=`${e.colunas.join()}|${e.densidade}`;if((S||y!==s)&&(p(),s=y),!e.linhas.length){t.style.paddingTop=t.style.paddingBottom="0",t.replaceChildren(d("div",{class:"spro-vazio"},"Nenhum processo corresponde ao filtro."));return}A()}function w(v){let S=e.linhas.findIndex(P=>P.tipo==="processo"&&P.processo.id===v);if(S<0)return!1;let y=Te[e.densidade];return S*y<a.scrollTop?a.scrollTop=S*y:(S+1)*y>a.scrollTop+a.clientHeight&&a.clientHeight>0&&(a.scrollTop=(S+1)*y-a.clientHeight),A(),!0}return M(o),{el:n,atualizar:M,mostrar:w,rolagem:a}}var Wi=[["/","Buscar"],["j / k","Linha seguinte / anterior"],["x","Marcar a linha"],["Enter","Abrir o processo"],["g t","Ver a tabela"],["g q","Ver o quadro"],["Esc","Limpar a busca ou a sele\xE7\xE3o"],["?","Esta ajuda"]],$n=o=>o==="grupo:recebidos"?"grupo:gerados":o==="grupo:gerados"?"grupo:recebidos":null,Zi={"resp:eu":"Processos atribu\xEDdos a voc\xEA","grupo:recebidos":"Processos que vieram de outra unidade","grupo:gerados":"Processos autuados nesta unidade","prazo:atrasado":"Prazo vencido e ainda n\xE3o conclu\xEDdo","prazo:semana":"Vencem nos pr\xF3ximos 7 dias","resp:sem":"Processos sem respons\xE1vel","novo:sim":"Ainda n\xE3o abertos nesta unidade","novo:visita":"Chegaram depois da sua \xFAltima visita","parado:>30d":"Sem movimenta\xE7\xE3o h\xE1 mais de 30 dias (vis\xE3o detalhada do SEI)"},Yi=[["Meus","resp:eu",{comum:"pessoa"},""],["Recebidos","grupo:recebidos",{grade:"recebido"},""],["Gerados","grupo:gerados",{grade:"gerado"},""],["Atrasados","prazo:atrasado",{comum:"alerta"},"perigo"],["Vencem na semana","prazo:semana",{comum:"calendario"},"aviso"],["Sem respons\xE1vel","resp:sem",{grade:"semPessoa"},""],["N\xE3o visualizados","novo:sim",{grade:"olhoFechado"},""],["Novos desde a \xFAltima visita","novo:visita",{comum:"brilho"},"novo"],["Parados h\xE1 +30 dias","parado:>30d",{comum:"historico"},""]];function Rn(o){let{doc:e}=o,r=o.inicial.processos,t=Ho(),a=[],n="",s=new Set,i=new Set(Pr(e)),c=null,l={vistoEm:{}},p,f=null,m=!1,A=!1,E="",M={},w=!1,v=!1,S,y=!1,P=Za(o.mover),R=new AbortController,$=()=>({hoje:o.hoje(),agora:o.agora(),...o.eu?{eu:o.eu}:{},...p!==void 0?{visitaAnterior:p}:{}}),z=e.createElement("div");z.id="spro-grade",z.setAttribute("data-spro-grade-host","1"),z.setAttribute("data-tema",o.escuro?"escuro":"claro");let b=z.attachShadow({mode:"open"}),L=e.createElement("style");L.textContent=o.css;let O=d("div",{class:`spro-app${o.escuro?" spro-escuro":""}`}),q=e.createElement("style");b.append(L,q,O);let Z=ga(b),I=d("input",{type:"search",class:"spro-busca",placeholder:"Buscar: texto, resp:ana, prazo:<7d, marcador:urgente...","aria-label":"Buscar processos",spellcheck:"false",autocomplete:"off"}),H=d("div",{class:"spro-chips"}),Ro=d("div",{class:"spro-rapidos"}),lo=d("div",{class:"spro-status",role:"status","aria-live":"polite"}),Eo=d("div",{class:"spro-lote",hidden:!0}),te=d("div",{class:"spro-conteudo"}),So=d("div",{class:"spro-painel",hidden:!0}),Xr=d("div",{class:"spro-avisos","aria-live":"polite"}),Go=d("div",{class:"spro-ajuda-atalhos",hidden:!0},d("strong",{},"Atalhos"),...Wi.map(([u,g])=>d("div",{},d("kbd",{},u),` ${g}`))),_n=[["protocolo","N\xFAmero do processo"],["prazo","Prazo"],["tipo","Tipo"],["responsavel","Respons\xE1vel"],["marcador","Marcador"],["caixa","Tempo na caixa"],["parado","Parado h\xE1"],["novo","N\xE3o visualizados"]],je=wo({rotulo:"Agrupar por",icone:"camadas",classe:"spro-combo-compacto",busca:!1,vazio:"Sem agrupamento",opcoes:Object.keys(Dr).map(u=>({valor:u,rotulo:u==="nenhum"?"Sem agrupamento":`Agrupar: ${Dr[u]}`})),valor:["nenhum"],aoMudar:([u])=>U({agrupar:u??"nenhum"})}),Kr=wo({rotulo:"Ordenar por",icone:"ordenar",classe:"spro-combo-compacto",busca:!1,vazio:"Ordem do SEI",opcoes:[{valor:"",rotulo:"Ordem do SEI"},..._n.flatMap(([u,g])=>[{valor:`${u}:a`,rotulo:`${g} \u2191`,descricao:"Crescente"},{valor:`${u}:d`,rotulo:`${g} \u2193`,descricao:"Decrescente"}])],valor:[""],aoMudar:([u])=>{let[g,x]=(u??"").split(":");U({ordem:g?[{campo:g,decrescente:x==="d"}]:[]})}}),ae=Ir([],$()),Fe=(u,g,x,h,k)=>{let D=wo({rotulo:u,vazio:g,icone:h,classe:"spro-combo-compacto",busca:!0,larguraLista:260,opcoes:()=>k().map(T=>({valor:T.valor,rotulo:T.rotulo,contagem:T.n})),aoMudar:([T])=>{T&&(U({busca:an(t.busca,x,T)}),I.value=t.busca,D.definir([],!1))}});return D},Jr=Fe("Filtrar por respons\xE1vel","Respons\xE1vel\u2026","resp","pessoa",()=>ae.responsaveis),Wr=Fe("Filtrar por tipo","Tipo\u2026","tipo","documento",()=>ae.tipos),Zr=Fe("Filtrar por marcador","Marcador\u2026","marcador","etiqueta",()=>ae.marcadores),Yr=(u,g)=>d("button",{type:"button",class:"spro-seg-b","data-modo":u,title:g,onclick:()=>U({modo:u})},eo(u==="tabela"?"lista":"quadro",16),d("span",{},g)),ot=d("div",{class:"spro-seg",role:"group","aria-label":"Modo de exibi\xE7\xE3o"},Yr("tabela","Tabela"),Yr("quadro","Quadro")),ne=(u,g,x,h="")=>d("button",{type:"button",class:`spro-bt ${h}`.trim(),title:g,"aria-label":g,onclick:x},eo(u,16),d("span",{},g)),et=ne("colunas","Colunas",()=>No("colunas")),qn=ne("disquete","Vis\xF5es",()=>No("visoes")),Vn=ne("lista","Exportar CSV",()=>Jn()),Hn=d("button",{type:"button",class:"spro-bt spro-bt-icone",title:"Atalhos de teclado (?)","aria-label":"Atalhos de teclado",onclick:()=>{Go.hidden=!Go.hidden}},"?"),rt=ne("densidade","Densidade",()=>U({densidade:t.densidade==="compacta"?"confortavel":"compacta"})),se=d("div",{class:"spro-quadro-cfg",hidden:!0});O.append(d("div",{class:"spro-barra"},ot,d("div",{class:"spro-busca-caixa"},I),je.el,Kr.el,et,rt,qn,Vn,Hn),H,d("div",{class:"spro-faixa"},Ro,Jr.el,Wr.el,Zr.el),se,Go,So,lo,Eo,te,Xr);let tt=()=>Na(r,l),Uo=()=>tn(tt(),t.busca,$()),Ge=()=>un(Uo(),t.ordem,$());function U(u){t={...t,...u},u.busca===void 0?o.armazem.gravarVisao(t).catch(()=>{}):jn(),Y()}let Ue;function jn(){clearTimeout(Ue),Ue=setTimeout(()=>void o.armazem.gravarVisao(t).catch(()=>{}),400)}function J(u,g){let x=d("div",{class:"spro-aviso",role:"status"},d("span",{},u));g&&x.append(d("button",{type:"button",class:"spro-link",onclick:()=>{g.fazer(),x.remove()}},g.rotulo)),x.append(d("button",{type:"button",class:"spro-aviso-x","aria-label":"Fechar aviso",onclick:()=>x.remove()},"\xD7")),Xr.append(x),setTimeout(()=>x.remove(),g?9e3:6e3).unref?.()}function zo(u,g){let x=new Set(i);for(let h of u)g?x.add(h):x.delete(h);i=x,Xa(e,x),Je(),po()}let ie=new Map;function ko(u,g){let x=r.find(h=>h.id===u);if(x){let h=ie.get(u)??{};for(let k of new Set([...Object.keys(x),...Object.keys(g)]))JSON.stringify(x[k])!==JSON.stringify(g[k])&&(h[k]=g[k]);ie.set(u,h)}r=r.map(h=>h.id===u?g:h)}let at=Promise.resolve();function Fn(u){Co+=1;let g=at.then(u,u);return at=g.catch(()=>{}).finally(()=>{Co-=1}),g}let Be=null,Qe={raiz:b,extras:()=>(Be??=(o.extras?o.extras().then(u=>(M=u,u)):Promise.resolve({})).catch(u=>{throw Be=null,u}),Be),todos:()=>r,selecionados:()=>i,corDoMarcador:u=>r.flatMap(g=>g.marcadores).find(g=>g.nome===u)?.cor??"",autor:o.eu??"",aplicarLocal:(u,g)=>{ko(u,g),Y()},gravar:Fn,atribuir:(u,g)=>o.mover.atribuir(u,g),marcar:(u,g)=>o.mover.marcador(u,g),anotar:(u,g)=>o.anotar(u,g),aviso:u=>J(u)};async function Gn(u,g,x){let h=r.find(F=>F.id===u);if(!h)return;let k=gn(t.quadro.colunas,h,g,x);if(!k.ok)return J(k.motivo);let D=Object.fromEntries((M.responsaveis??[]).map(F=>[F.sigla,F.nome]));ko(u,Tr(h,k.movimento,D)),Y(),Co+=1;let T=await P.mover(k.movimento).finally(()=>{Co-=1});if(!v){if(!T.ok)return ko(u,h),Y(),J(`N\xE3o foi poss\xEDvel mover ${h.protocolo}: ${T.erro}`);J(`${h.protocolo} movido.`,{rotulo:"Desfazer",fazer:()=>{let F=r.find(to=>to.id===u)??h;ko(u,Tr(F,T.desfazer,D)),Y(),P.mover(T.desfazer).then(to=>{to.ok||v||(ko(u,F),Y(),J(`N\xE3o foi poss\xEDvel desfazer: ${to.erro}`))})}})}}let Un=xn(),Xe=new Map([[Lo("recebidos",0),o.inicial.selecoes.recebidos],[Lo("gerados",0),o.inicial.selecoes.gerados],[Lo("detalhado",0),o.inicial.selecoes.detalhado]]),Ke=o.inicial.visao==="detalhada";function Bn(u){let g=r.filter(k=>i.has(k.id)),x=ia(u);if(x?.requerSelecao&&!g.length)return J("Marque ao menos um processo.");if(x&&!x.aceitaSigiloso&&sa(g))return J("Opera\xE7\xE3o n\xE3o aplic\xE1vel em processo sigiloso.");let h=aa(g,Xe,Ke?"detalhada":"resumida");if(!h.ok)return J(h.motivo);if(h.plano.todosNaPaginaAtual||!x){let k=Ja(u,g.length);!k.ok&&k.motivo&&J(k.motivo);return}try{o.enviarAcao(x.url,h.plano)}catch(k){J(`N\xE3o foi poss\xEDvel enviar a a\xE7\xE3o: ${k instanceof Error?k.message:String(k)}`)}}let Co=0,ce=null,le="",nt=!1,st=u=>({linhas:u,colunas:t.colunas,densidade:t.densidade,ctx:$(),ordem:t.ordem,selecionados:i,foco:c,icones:g=>Un(e,g),nomesCompletos:nt,editando:ce,rascunho:le,semOrigem:Ke,aoOrdenar:(g,x)=>U({ordem:mn(t.ordem,g,x)}),aoSelecionar:(g,x)=>zo([g],x),aoGrupo:g=>{let x=new Set(s);x.has(g)?x.delete(g):x.add(g),s=x,o.armazem.gravarRecolhidos([...x]).catch(()=>{}),po()},aoMarcarGrupo:(g,x)=>zo(g,x),aoEditarEspec:g=>{ce=g,le=r.find(x=>x.id===g)?.especificacao??"",po()},aoDigitarEspec:g=>{le=g},aoCancelarEspec:()=>{ce=null,po()},aoSalvarEspec:g=>void Qn(g),aoAbrirPrazo:g=>o.abrirPrazo(g),aoEditar:(g,x)=>{let h=r.find(k=>k.id===g);h&&(x==="responsavel"?Cn(Qe,h):x==="anotacao"?Ln(Qe,h):On(Qe,h))}}),de=In(st([]));async function Qn(u){let g=r.find(h=>h.id===u),x=le.trim();if(ce=null,!g||x===g.especificacao.trim())return po();if(!x)return J("A especifica\xE7\xE3o n\xE3o pode ficar vazia."),po();ko(u,{...g,especificacao:x}),Y(),Co+=1;try{await o.editarEspecificacao(g.protocolo,x),J(`Especifica\xE7\xE3o de ${g.protocolo} salva.`)}catch(h){ko(u,g),Y(),J(`N\xE3o foi poss\xEDvel salvar a especifica\xE7\xE3o: ${h instanceof Error?h.message:String(h)}`)}finally{Co-=1}}function po(){let u=Ge();if(t.modo==="quadro"){te.replaceChildren(hn({processos:u,cfg:t.quadro,ctx:$(),extras:M,selecionados:i,aoMover:(x,h,k)=>void Gn(x,h,k),aoSelecionar:(x,h)=>zo([x],h)}));return}let g=Le(u,t.agrupar,$());de.atualizar(st(ln(g,s,t.agrupar!=="nenhum"))),te.firstElementChild!==de.el&&te.replaceChildren(de.el)}function it(u){let g=[`${u} de ${r.length} processo${r.length===1?"":"s"}`],x=o.inicial.totais.recebidos+o.inicial.totais.gerados;m&&f?g.push(`carregando ${f.grupo} (${f.paginasLidas}/${f.paginasTotal})\u2026`):!A&&x>r.length&&g.push(`o SEI informa ${x}; os demais n\xE3o foram carregados`),E&&g.push(`aviso: ${E}`),lo.replaceChildren(g.join(" \xB7 ")),lo.classList.toggle("spro-status-alerta",!!E||!A&&!m&&x>r.length)}function Je(){let u=i.size;if(Eo.hidden=u===0,!u)return Eo.replaceChildren();let g=new Set(Uo().map(h=>h.id)),x=[...i].filter(h=>!g.has(h)).length;Eo.replaceChildren(d("strong",{},`${u} selecionado${u===1?"":"s"}`),...x?[d("span",{class:"spro-suave"},`(${x} fora do filtro atual)`)]:[],...o.acoes().map(h=>d("button",{type:"button",class:"spro-bt",title:h.rotulo,onclick:()=>Bn(h)},d("img",{src:h.icone,alt:"",width:"16",height:"16"}),d("span",{},h.rotulo))),d("button",{type:"button",class:"spro-link",onclick:()=>zo([...i],!1)},"Limpar sele\xE7\xE3o"))}function Xn(){let u=Or(t.busca);H.replaceChildren(...u.tokens.map(x=>d("span",{class:`spro-chip${x.termo.negado?" spro-chip-neg":""}`},x.texto,d("button",{type:"button","aria-label":`Remover ${x.texto}`,onclick:()=>{U({busca:Ce(t.busca,x.texto)}),I.value=t.busca}},"\xD7")))),H.hidden=!u.tokens.length;let g=new Set(u.tokens.map(x=>x.texto));Ro.replaceChildren(...Yi.filter(([,x])=>!(Ke&&x.startsWith("grupo:"))).map(([x,h,k,D])=>d("button",{type:"button","data-tip":`${x}
${Zi[h]??""}
Busca: ${h}${g.has(h)?`
Clique para desligar`:""}`,"aria-label":x,class:`spro-rapido${D?` spro-rapido-${D}`:""}${g.has(h)?" spro-rapido-on":""}`,"aria-pressed":String(g.has(h)),onclick:()=>{U({busca:g.has(h)?Ce(t.busca,h):`${$n(h)?Ce(t.busca,$n(h)):t.busca} ${h}`.trim()}),I.value=t.busca}},"comum"in k?_(k.comum,14,e):eo(k.grade,14,e),d("span",{class:"spro-rapido-rotulo"},x)))),ct()}let vo=z.shadowRoot.querySelector(".spro-faixa");function ct(){v||(vo.classList.remove("spro-faixa-c1","spro-faixa-c2"),vo.clientWidth&&(vo.scrollWidth>vo.clientWidth+1&&vo.classList.add("spro-faixa-c1"),vo.scrollWidth>vo.clientWidth+1&&vo.classList.add("spro-faixa-c2")))}let lt=e.defaultView?.ResizeObserver,dt=lt?new lt(()=>ct()):null;dt?.observe(vo);function Y(){if(v)return;ae=Ir(tt(),$());for(let g of[Jr,Wr,Zr])g.atualizar();je.definir([t.agrupar],!1),je.el.disabled=t.modo==="quadro",Kr.definir([t.ordem[0]?`${t.ordem[0].campo}:${t.ordem[0].decrescente?"d":"a"}`:""],!1);for(let g of ot.querySelectorAll("[data-modo]"))g.setAttribute("aria-pressed",String(g.getAttribute("data-modo")===t.modo));rt.title=t.densidade==="compacta"?"Linhas confort\xE1veis":"Linhas compactas",et.hidden=t.modo==="quadro",Kn(),Xn(),po(),it(Uo().length),Je(),t.modo==="quadro"&&!w&&o.extras&&(w=!0,o.extras().then(g=>{M=g,v||po()}).catch(()=>{}))}function Kn(){if(se.hidden=t.modo!=="quadro",se.hidden)return;let u=t.quadro,g=wo({rotulo:"Colunas do quadro",icone:"mapa",classe:"spro-combo-compacto",busca:!1,opcoes:[{valor:"marcador",rotulo:"Colunas: marcador"},{valor:"responsavel",rotulo:"Colunas: respons\xE1vel"},{valor:"prazo",rotulo:"Colunas: prazo (leitura)"},{valor:"tipo",rotulo:"Colunas: tipo (leitura)"}],valor:[u.colunas],aoMudar:([k])=>{w=!1,U({quadro:{...u,colunas:k??"marcador"}})}}),x=d("input",{type:"number",min:"0",max:"99",class:"spro-num",value:String(u.limite),"aria-label":"Limite de cart\xF5es por coluna (0 = sem limite)",title:"Limite de cart\xF5es por coluna (0 = sem limite)",onchange:k=>U({quadro:{...u,limite:Math.max(0,Math.min(99,Number(k.target.value)||0))}})}),h=d("input",{type:"checkbox",onchange:k=>U({quadro:{...u,raiasPorResponsavel:k.target.checked}})});h.checked=u.raiasPorResponsavel,se.replaceChildren(g.el,d("label",{class:"spro-rotulo-inline"},"Limite ",x),d("label",{class:"spro-rotulo-inline"},h," Raias por respons\xE1vel"),d("span",{class:"spro-suave"},u.colunas==="marcador"||u.colunas==="responsavel"?"Arraste os cart\xF5es entre as colunas.":"Esta divis\xE3o \xE9 s\xF3 de leitura."))}function No(u){if(!So.hidden&&So.getAttribute("data-qual")===u){So.hidden=!0;return}if(So.setAttribute("data-qual",u),So.hidden=!1,u==="colunas"){So.replaceChildren(d("strong",{},"Colunas"),...Vo.map(D=>{let T=d("input",{type:"checkbox",disabled:D==="processo"});return T.checked=t.colunas.includes(D),T.addEventListener("change",()=>{let F=T.checked?Vo.filter(to=>to===D||t.colunas.includes(to)):t.colunas.filter(to=>to!==D);U({colunas:F})}),d("label",{class:"spro-rotulo-linha"},T,` ${Io[D]}`)}),d("button",{type:"button",class:"spro-link",onclick:()=>U({colunas:Ho().colunas})},"Restaurar padr\xE3o"));return}let g=d("input",{type:"text",class:"spro-nome",maxlength:"40",placeholder:"Nome da vis\xE3o","aria-label":"Nome da vis\xE3o"}),x=a.find(D=>D.id===n);g.value=x?.nome??"";let h=async(D,T=a)=>{a=D,await o.armazem.gravarVisoes(D,T).catch(()=>J("N\xE3o foi poss\xEDvel sincronizar as vis\xF5es."))},k=async D=>{let T={...t,nome:g.value.trim()||"Minha vis\xE3o",id:D==="atualizar"?n:""},F=_a(a,T,o.novoId);if(!F)return J("Limite de vis\xF5es salvas atingido.");n=F.visao.id,await h(F.lista),J(`Vis\xE3o "${F.visao.nome}" salva.`),No("visoes"),No("visoes")};So.replaceChildren(d("strong",{},"Vis\xF5es salvas"),a.length?d("ul",{class:"spro-lista-visoes"},...a.map(D=>d("li",{},d("button",{type:"button",class:`spro-link${D.id===n?" spro-ativa":""}`,onclick:()=>{n=D.id,I.value=D.busca,U({...D,id:""})}},D.nome),d("button",{type:"button",class:"spro-aviso-x","aria-label":`Excluir ${D.nome}`,title:"Excluir",onclick:async()=>{await h(qa(a,D.id),a),n===D.id&&(n=""),No("visoes"),No("visoes")}},"\xD7")))):d("p",{class:"spro-suave"},"Nenhuma vis\xE3o salva ainda."),d("div",{class:"spro-linha-form"},g,d("button",{type:"button",class:"spro-bt",onclick:()=>void k("nova")},"Salvar como nova"),x&&Va(t,x)?d("button",{type:"button",class:"spro-bt",onclick:()=>void k("atualizar")},"Atualizar"):null))}function Jn(){let u=sn(Ge(),t.modo==="quadro"?[...Vo]:t.colunas,$());o.baixar(cn(o.hoje()),ja(u),"text/csv;charset=utf-8"),J(`${u.length-1} processos exportados.`)}I.addEventListener("input",()=>{let u=I.value;if(o.semDebounce)return U({busca:u});clearTimeout(S),S=setTimeout(()=>U({busca:u}),120)}),I.addEventListener("keydown",u=>{u.key==="Escape"&&(I.value="",U({busca:""}),I.blur())});function pt(u){if(v||u.ctrlKey||u.metaKey||u.altKey)return;let g=u.target;if(g&&(/^(input|textarea|select)$/i.test(g.tagName)||g.isContentEditable)||z.hidden)return;let h=u.key;if(y){y=!1,h==="t"?U({modo:"tabela"}):h==="q"&&U({modo:"quadro"});return}let k=Ge().map(T=>T.id),D=c?k.indexOf(c):-1;if(h==="/")u.preventDefault(),I.focus();else if(h==="?")Go.hidden=!Go.hidden;else if(h==="g")y=!0;else if(h==="Escape")i.size&&zo([...i],!1);else if((h==="j"||h==="k")&&t.modo==="tabela"&&k.length)c=k[Math.max(0,Math.min(k.length-1,D+(h==="j"?1:-1)))],po(),de.mostrar(c);else if(h==="x"&&c)r.find(F=>F.id===c)&&zo([c],!i.has(c));else if(h==="Enter"&&c){let T=r.find(F=>F.id===c)?.link;T&&e.defaultView?.location.assign(T)}}e.addEventListener("keydown",pt);let Wn=Ka(e,u=>{i=u,Je(),po()}),Zn=o.armazem.aoMudarVisoes(()=>void o.armazem.lerVisoes().then(u=>{a=u}).catch(()=>{})),We=new Map;function Ze(){if(v||Co>0)return;let u=_o(e),g=new Map(u.processos.map(h=>[h.id,h])),x=!1;r=r.map(h=>{if(!h.naPaginaAtual)return h;let k=g.get(h.id);if(!k)return h;let D=ie.get(h.id),T=Vr(e,h.id),F=We.get(h.id);We.set(h.id,T);let to=k;if(D){for(let rr of Object.keys(D))JSON.stringify(k[rr])===JSON.stringify(D[rr])&&delete D[rr];Object.keys(D).length?to={...k,...D}:ie.delete(h.id)}let gt=JSON.stringify(to)===JSON.stringify(h);return gt&&F===T?h:(x=!0,gt?h:to)}),x&&(er(),Y())}let Ye,ut=e.defaultView?.MutationObserver,or=ut?new ut(()=>{clearTimeout(Ye),Ye=setTimeout(Ze,o.semDebounce?0:150)}):null,mt=e.querySelector("#frmProcedimentoControlar")??e.body;or&&mt&&or.observe(mt,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["aria-pressed","aria-label","onmouseover","src","href","class"]});function er(){let u=yn(e);q.textContent!==u&&(q.textContent=u)}async function Yn(){if(!o.fonte)return A=!0,ft(!0);m=!0,Y();let u=()=>o.fonte?.restaurarAoSair?.();e.defaultView?.addEventListener("pagehide",u);let g=await Da(o.inicial,o.fonte,{sinal:R.signal,aoProgresso:x=>{f=x,it(Uo().length)},aoSelecao:(x,h,k)=>{Xe.set(Lo(x,h),k)},aoPagina:x=>{r=[...r,...x],Y()}});e.defaultView?.removeEventListener("pagehide",u),m=!1,A=g.completo,g.erro&&(E=g.erro),ft(g.completo)}function ft(u){l=Er(l,r.map(g=>g.id),o.agora(),u),o.armazem.gravarIdade(l).catch(()=>{}),Y()}async function os(){try{let u=await o.armazem.lerEstado();t=u.visao,s=new Set(u.recolhidos),l=za(u.idade,o.agora()),p=l.visitaAnterior,a=await o.armazem.lerVisoes()}catch{}l=Er(l,r.map(u=>u.id),o.agora(),!1),I.value=t.busca,er();for(let[u]of r.map(g=>[g.id]))We.set(u,Vr(e,u));Y(),Yn();for(let u of[1200,3500])setTimeout(()=>{er(),Ze()},u).unref?.()}return{host:z,iniciar:os,render:Y,estado:()=>({visao:t,todos:r,selecionados:i,completo:A,carregando:m,filtrados:Uo().length}),definirVisao:u=>{t={...t,...u},I.value=t.busca,Y()},fechar(){v=!0,R.abort(),clearTimeout(S),clearTimeout(Ue),clearTimeout(Ye),or?.disconnect(),dt?.disconnect(),Z(),e.removeEventListener("keydown",pt),Wn(),Zn(),z.remove()},mostrar:u=>{z.hidden=!u},definirNomesCompletos:u=>{nt=u,Y()},sincronizar:Ze,registrarSelecaoParaTeste:(u,g,x)=>void Xe.set(Lo(u,g),x)}}var zn=`/* Dentro do Shadow DOM: o base.css do sei-comum (tokens) vem antes deste arquivo. */
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
.spro-corta { display: block; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.spro-proc { font-weight: 600; white-space: nowrap; }
.spro-novo { font-weight: 800; color: var(--spro-perigo); }
.spro-novo:hover { color: var(--spro-perigo); }
.spro-novo::before { content: ""; display: inline-block; width: 7px; height: 7px; margin-right: 5px; background: var(--spro-perigo); border-radius: 50%; }
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
.spro-editavel-quebra { flex-wrap: wrap; }
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
`;var Nn=`/* Na p\xE1gina do SEI (fora do Shadow DOM): o bot\xE3o alternador e o espa\xE7o da grade. */
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
`;var rc="gradecontrole";function tc(){return new URL(location.href).searchParams.get("acao")==="procedimento_controlar"}var ee=()=>!!document.body?.classList.contains("dark-mode")||yt(localStorage),Ve=null,ho=!1,K=null,bo=null,Fo=null,Tn=0,Br=!1,qe=null,Qr=document.readyState!=="loading";function ac(){let o=document.querySelector(Oa);return document.getElementById("divTabelaProcesso")??o?.parentElement??null}function Mo(o){bo?.pronta(),K?.mostrar(!1),ye(document),o&&o!=="usuario"&&console.warn("[SEI Pro] Grade do controle indispon\xEDvel, usando a vis\xE3o nativa:",o)}function He(){if(K||!ho)return;let o=new ge(location.href,()=>Ko(document,location.href)),e=dr(Ko(document,location.href)),r=e.unidade.id,t=Ha({local:tr(chrome.storage.local,"local"),sync:tr(chrome.storage.sync,"sync")},String(r));if(["hdnRecebidosPaginaAtual","hdnGeradosPaginaAtual","hdnDetalhadoPaginaAtual"].some(c=>document.getElementById(c)?.value&&document.getElementById(c).value!=="0")&&!sessionStorage.getItem("spro_grade_reset")){try{sessionStorage.setItem("spro_grade_reset","1")}catch{}yr(o.http,Ko(document,location.href)).restaurar().then(()=>location.reload()).catch(()=>Mo("pagina intermediaria"));return}try{sessionStorage.removeItem("spro_grade_reset")}catch{}let n=_o(document);if(!n.processos.length&&!n.totais.recebidos&&!n.totais.gerados)return bo?.pronta(),Mo("caixa vazia");let s=ac();if(!s)return Mo("sem ponto de encaixe");let i=n.processos.filter(c=>!c.sigiloso&&c.naPaginaAtual).slice(0,6).map(c=>c.protocolo);K=Rn({doc:document,inicial:n,agora:()=>Date.now(),hoje:()=>To(),eu:e.usuario.login||void 0,armazem:t,fonte:yr(o.http,Ko(document,location.href),n.visao),mover:{marcador:async(c,l)=>void await Kt(o,c,l,{aplicar:!0}),atribuir:async(c,l)=>void await Xt(o,c,l,{aplicar:!0})},acoes:()=>ca(document),css:`${Et}
${zn}`,escuro:ee(),baixar:(c,l,p)=>Pt(c,l,p),novoId:()=>At(),extras:i.length?async()=>{let c=async f=>{let m;for(let A of i)try{return await _t(o,f,A)}catch(E){m=E}return console.warn(`[SEI Pro] Grade: nao foi possivel ler a lista de ${f}`,m instanceof Error?m.message:m),[]},[l,p]=await Promise.all([c("marcadores"),c("usuarios")]);return{marcadores:l.map(f=>f.nome),responsaveis:p.map(f=>{let[m,...A]=f.nome.split(" - ");return{sigla:m.trim(),nome:A.join(" - ").trim()||m.trim()}})}}:void 0,aoVoltarNativa:()=>re(),enviarAcao:(c,l)=>na(document,c,l),editarEspecificacao:async(c,l)=>void await Ht(o,c,{especificacao:l},{aplicar:!0}),abrirPrazo:c=>{document.documentElement.setAttribute("data-spro-prazos-alvo",c),document.dispatchEvent(new CustomEvent("spro-prazos-abrir"))},anotar:async(c,l)=>void await Qt(o,c,l,{aplicar:!0})}),K.definirNomesCompletos(Br),s.before(K.host),la(document,K.host),nc(),K.iniciar().then(()=>{bo?.pronta(),Do(document)&&hr(document)}).catch(c=>Mo(String(c)))}function nc(){qe?.disconnect();let o=window.MutationObserver,e=!1;qe=new o(()=>{e||(e=!0,setTimeout(()=>{if(e=!1,!(!K||!ho||K.host.isConnected&&!!K.host.shadowRoot&&document.querySelectorAll("#spro-grade").length===1||Tn>=6)){Tn+=1,K.fechar(),K=null;for(let t of document.querySelectorAll("#spro-grade"))t.remove();(Do(document)||ho)&&He()}},150))}),qe.observe(document.body??document.documentElement,{childList:!0,subtree:!0})}function re(){Ve&&(Do(document)?(ho=!1,ve(localStorage,!1),K?.mostrar(!1),ye(document)):(ho=!0,ve(localStorage,!0),xe(document,ee()),K?(K.mostrar(!0),hr(document)):(bo=Ae(Mo),bo.iniciarContagem(),He())),Fo?.(),Fo=Se(document,()=>Do(document),re))}function sc(o){o!==Ve&&(Ve=o,o?(Qr&&(Fo??=Se(document,()=>Do(document),re)),ho&&(xe(document,ee()),bo??=Ae(Mo),Qr&&(bo.iniciarContagem(),He()))):(ho=!1,ve(localStorage,!1),Fo?.(),Fo=null,qe?.disconnect(),K?.fechar(),K=null,bo?.pronta(),ye(document)))}function ic(){if(!tc())return;let o=document.createElement("style");o.textContent=Nn,(document.head??document.documentElement).append(o),ba(localStorage)&&(ho=!0,xe(document,ee()),bo=Ae(Mo)),ya(document,re),ha(document,ee);let e=()=>{Qr=!0,ho&&(bo?.iniciarContagem(),He()),Ve&&(Fo??=Se(document,()=>Do(document),re))};document.readyState==="loading"?document.addEventListener("DOMContentLoaded",e,{once:!0}):e();let r=a=>{Br=xt(a,"nomesusuarios"),K?.definirNomesCompletos(Br),sc(vt(a,rc))},t=!1;chrome.storage.onChanged.addListener((a,n)=>{n!=="sync"||!("dataValues"in a)||(t=!0,r(a.dataValues.newValue))}),chrome.storage.sync.get("dataValues").then(a=>{t||r(a.dataValues)}).catch(()=>{ho&&Mo("sem prefer\xEAncias")})}ic();})();
