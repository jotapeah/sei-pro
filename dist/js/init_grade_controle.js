/* GERADO por grade-controle/build.mjs. NAO EDITE. Rode: npm run build */
"use strict";(()=>{function Vn(o){let e={};for(let[r,t]of Object.entries(o)){let a={};t&&"newValue"in t&&(a.novo=t.newValue),t&&"oldValue"in t&&(a.antigo=t.oldValue),e[r]=a}return e}function Ke(o,e){return{obter:(r=null)=>o.get(r),gravar:r=>o.set(r),remover:r=>o.remove(r),chaves:typeof o.getKeys=="function"?()=>o.getKeys():void 0,aoMudar(r){let t=(a,n)=>{n===e&&r(Vn(a))};return chrome.storage.onChanged.addListener(t),()=>chrome.storage.onChanged.removeListener(t)}}}var pt=o=>String(o).padStart(2,"0");function No(o=new Date){return`${o.getFullYear()}-${pt(o.getMonth()+1)}-${pt(o.getDate())}`}function le(o){let e=/^(\d{4})-(\d{2})-(\d{2})$/.exec(o);if(!e)throw new Error(`Data inv\xE1lida: ${o}`);return new Date(Number(e[1]),Number(e[2])-1,Number(e[3]),12)}function Uo(o,e){return Math.round((le(e).getTime()-le(o).getTime())/864e5)}function io(o){let[e,r,t]=o.split("-");return`${t}/${r}/${e}`}function Hn(o,e){let r=o;if(typeof o=="string"){if(!o.trim())return;try{r=JSON.parse(o)}catch{return}}return!Array.isArray(r)||r.length===0?void 0:r.map(a=>a?.configGeral).find(Array.isArray)?.find(a=>a?.name===e)?.value}function Je(o,e){let r=Hn(o,e);return r===!0||r===1||r==="1"}function dt(o){try{return!!o.getItem("darkModePro")}catch{return!1}}function ut(o=crypto){if(typeof o.randomUUID=="function")return o.randomUUID();let e=o.getRandomValues(new Uint8Array(16));e[6]=(e[6]??0)&15|64,e[8]=(e[8]??0)&63|128;let r=[...e].map(t=>t.toString(16).padStart(2,"0")).join("");return`${r.slice(0,8)}-${r.slice(8,12)}-${r.slice(12,16)}-${r.slice(16,20)}-${r.slice(20)}`}var mt=`/*
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
`;function p(o,e={},...r){let t=document.createElement(o);for(let[a,n]of Object.entries(e))n===void 0||n===!1||(typeof n=="function"?t.addEventListener(a.replace(/^on/,""),n):n===!0?t.setAttribute(a,""):a==="class"?t.className=n:a==="value"&&o==="textarea"?t.value=n:t.setAttribute(a,n));for(let a of r)a!=null&&a!==!1&&t.append(a);return t}var co={fill:"currentColor",stroke:"none"},ft="M12 3.2l2.7 5.5 6 .9-4.35 4.25 1 6L12 17l-5.35 2.85 1-6L3.3 9.6l6-.9z",gt={estrela:[["path",{d:ft}]],estrelaCheia:[["path",{d:ft,fill:"currentColor"}]],alvo:[["circle",{cx:"12",cy:"12",r:"7.5"}],["circle",{cx:"12",cy:"12",r:"3.2"}]],alvoAtivo:[["circle",{cx:"12",cy:"12",r:"6.6"}],["circle",{cx:"12",cy:"12",r:"2.4",fill:"currentColor"}],["path",{d:"M12 2.2v3.4M12 18.4v3.4M2.2 12h3.4M18.4 12h3.4"}]],pasta:[["path",{d:"M3.5 7.5a2 2 0 0 1 2-2h4l2 2h7a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2z"}]],etiqueta:[["path",{d:"M3.5 12.2V4.5a1 1 0 0 1 1-1h7.7l8.3 8.3a1 1 0 0 1 0 1.4l-7.1 7.1a1 1 0 0 1-1.4 0z"}],["circle",{cx:"8",cy:"8",r:"1.4",...co}]],relogio:[["circle",{cx:"12",cy:"12",r:"9"}],["path",{d:"M12 7.2V12l3.2 1.9"}]],nota:[["path",{d:"M6 3.5h9l3.5 3.5v13.5H6z"}],["path",{d:"M9 11h6"}],["path",{d:"M9 15h6"}]],lixeira:[["path",{d:"M4.5 6.5h15"}],["path",{d:"M9.5 6.5V4.8c0-.7.6-1.3 1.3-1.3h2.4c.7 0 1.3.6 1.3 1.3v1.7"}],["path",{d:"M6.8 6.5 7.6 19c0 .8.7 1.5 1.5 1.5h5.8c.8 0 1.5-.7 1.5-1.5l.8-12.5"}]],lapis:[["path",{d:"M17.5 3.5a2.1 2.1 0 0 1 3 3L9 18l-4.5 1.5L6 15z"}],["path",{d:"M15 6l3 3"}]],fechar:[["path",{d:"M18 6 6 18"}],["path",{d:"M6 6l12 12"}]],mais:[["path",{d:"M12 5v14"}],["path",{d:"M5 12h14"}]],busca:[["circle",{cx:"11",cy:"11",r:"6.5"}],["path",{d:"M20.5 20.5l-4.8-4.8"}]],baixar:[["path",{d:"M12 3.5v11"}],["path",{d:"M7.5 10.2 12 14.7l4.5-4.5"}],["path",{d:"M4.5 19.5h15"}]],subir:[["path",{d:"M12 14.5v-11"}],["path",{d:"M7.5 7.8 12 3.3l4.5 4.5"}],["path",{d:"M4.5 19.5h15"}]],copiar:[["rect",{x:"8.5",y:"8.5",width:"12",height:"12",rx:"2"}],["path",{d:"M15.5 8.5V5.5a2 2 0 0 0-2-2h-8a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h3"}]],restaurar:[["path",{d:"M9 14 4 9l5-5"}],["path",{d:"M4 9h9a7 7 0 0 1 7 7v4"}]],check:[["path",{d:"M20 6.5 9.2 17.3 4 12.1"}]],alerta:[["path",{d:"M10.3 4.4 2.8 17.6a2 2 0 0 0 1.7 3h15a2 2 0 0 0 1.7-3L13.7 4.4a2 2 0 0 0-3.4 0z"}],["path",{d:"M12 9.5v4"}],["circle",{cx:"12",cy:"16.8",r:"1",...co}]],menu:[["circle",{cx:"5",cy:"12",r:"1.4",...co}],["circle",{cx:"12",cy:"12",r:"1.4",...co}],["circle",{cx:"19",cy:"12",r:"1.4",...co}]],alca:[["circle",{cx:"9",cy:"6",r:"1.3",...co}],["circle",{cx:"15",cy:"6",r:"1.3",...co}],["circle",{cx:"9",cy:"12",r:"1.3",...co}],["circle",{cx:"15",cy:"12",r:"1.3",...co}],["circle",{cx:"9",cy:"18",r:"1.3",...co}],["circle",{cx:"15",cy:"18",r:"1.3",...co}]],ajustes:[["path",{d:"M4 7h5"}],["path",{d:"M13 7h7"}],["circle",{cx:"11",cy:"7",r:"2.1"}],["path",{d:"M4 17h9"}],["path",{d:"M17 17h3"}],["circle",{cx:"15",cy:"17",r:"2.1"}]],setaCima:[["path",{d:"M12 19V6"}],["path",{d:"M6 12l6-6 6 6"}]],setaBaixo:[["path",{d:"M12 5v13"}],["path",{d:"M18 12l-6 6-6-6"}]],recolher:[["path",{d:"M6 15l6-6 6 6"}]],expandir:[["path",{d:"M6 9l6 6 6-6"}]],local:[["path",{d:"M12 21s-6.5-6.1-6.5-11a6.5 6.5 0 0 1 13 0c0 4.9-6.5 11-6.5 11z"}],["circle",{cx:"12",cy:"10",r:"2.3"}]],sino:[["path",{d:"M6.5 16.5V11a5.5 5.5 0 0 1 11 0v5.5l1.5 1.5h-14z"}],["path",{d:"M10 20.5a2 2 0 0 0 4 0"}]],documento:[["path",{d:"M7 3.5h7l4 4v13H7z"}],["path",{d:"M14 3.5v4h4"}]],painel:[["rect",{x:"3.5",y:"4.5",width:"17",height:"15",rx:"2"}],["path",{d:"M14.5 4.5v15"}]],atualizar:[["path",{d:"M19.5 12a7.5 7.5 0 1 1-2.2-5.3"}],["path",{d:"M19.5 4.5v4h-4"}]],nuvem:[["path",{d:"M7 18.5h10a4 4 0 0 0 .6-7.95A5.5 5.5 0 0 0 7 9.5a4.5 4.5 0 0 0 0 9z"}]],chevron:[["path",{d:"M7 9.5l5 5 5-5"}]],pino:[["path",{d:"M9.5 3.5h5l-.8 5.2 3.3 3.1v1.7H7v-1.7l3.3-3.1z"}],["path",{d:"M12 13.5v7"}]],pinoCheio:[["path",{d:"M9.5 3.5h5l-.8 5.2 3.3 3.1v1.7H7v-1.7l3.3-3.1z",fill:"currentColor"}],["path",{d:"M12 13.5v7"}]],filtro:[["path",{d:"M4 5.5h16l-6.2 7.3v5.4l-3.6 1.8v-7.2z"}]],ordenar:[["path",{d:"M7.5 4.5v15"}],["path",{d:"M4 16l3.5 3.5L11 16"}],["path",{d:"M16.5 19.5v-15"}],["path",{d:"M13 8l3.5-3.5L20 8"}]],mapa:[["path",{d:"M9 4.5 3.5 6.6v13l5.5-2.1 6 2.1 5.5-2.1v-13L15 6.6z"}],["path",{d:"M9 4.5v13"}],["path",{d:"M15 6.6v13"}]],olho:[["path",{d:"M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z"}],["circle",{cx:"12",cy:"12",r:"2.8"}]],camadas:[["path",{d:"M12 3.5 20.5 8 12 12.5 3.5 8z"}],["path",{d:"M3.5 12 12 16.5 20.5 12"}],["path",{d:"M3.5 16 12 20.5 20.5 16"}]],historico:[["path",{d:"M3.8 12.5A8.3 8.3 0 1 0 6.2 6"}],["path",{d:"M3.8 4.2v4.3h4.3"}],["path",{d:"M12 8v4.2l2.8 1.7"}]],pessoa:[["circle",{cx:"12",cy:"8",r:"3.6"}],["path",{d:"M5 20c.9-3.7 3.6-5.6 7-5.6s6.1 1.9 7 5.6"}]],predio:[["path",{d:"M5 20.5v-15a1 1 0 0 1 1-1h7.5a1 1 0 0 1 1 1v15"}],["path",{d:"M14.5 9.5H18a1 1 0 0 1 1 1v10"}],["path",{d:"M3 20.5h18"}],["path",{d:"M8.5 8.5h3"}],["path",{d:"M8.5 12h3"}],["path",{d:"M8.5 15.5h3"}]],brilho:[["path",{d:"M12 3.5l1.9 5.1 5.1 1.9-5.1 1.9L12 17.5l-1.9-5.1L5 10.5l5.1-1.9z"}],["path",{d:"M18.5 16.5v4"}],["path",{d:"M16.5 18.5h4"}]],calendario:[["rect",{x:"4",y:"5.5",width:"16",height:"15",rx:"2"}],["path",{d:"M4 10h16"}],["path",{d:"M8.5 3.5v4"}],["path",{d:"M15.5 3.5v4"}]],cadeado:[["rect",{x:"5.5",y:"10.5",width:"13",height:"10",rx:"2"}],["path",{d:"M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5"}]],saida:[["path",{d:"M14 4.5h4.5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H14"}],["path",{d:"M10 16l4-4-4-4"}],["path",{d:"M14 12H4.5"}]],planilha:[["rect",{x:"4",y:"4",width:"16",height:"16",rx:"2"}],["path",{d:"M4 9.5h16"}],["path",{d:"M4 15h16"}],["path",{d:"M10 9.5V20"}]],mover:[["path",{d:"M4.5 12h14"}],["path",{d:"M13.5 6.5 19 12l-5.5 5.5"}]],sol:[["circle",{cx:"12",cy:"12",r:"3.8"}],["path",{d:"M12 2.8v2M12 19.2v2M2.8 12h2M19.2 12h2M5.5 5.5l1.4 1.4M17.1 17.1l1.4 1.4M5.5 18.5l1.4-1.4M17.1 6.9l1.4-1.4"}]],teclado:[["rect",{x:"3",y:"6.5",width:"18",height:"11",rx:"2"}],["path",{d:"M7 10h.01M10.3 10h.01M13.7 10h.01M17 10h.01M8 14h8"}]],gantt:[["path",{d:"M4 5h9M7 12h11M4 19h7"}],["path",{d:"M3 3v18"}]],demandas:[["circle",{cx:"10",cy:"7.8",r:"3.2"}],["path",{d:"M3.8 19.5a6.2 5.2 0 0 1 11.8-2.6"}],["circle",{cx:"17.6",cy:"17.6",r:"4.2"}],["path",{d:"m15.6 17.7 1.5 1.5 2.5-3"}]]},Xi=Object.keys(gt);function _(o,e=18,r=document){let t="http://www.w3.org/2000/svg",a=r.createElementNS(t,"svg"),n={viewBox:"0 0 24 24",width:String(e),height:String(e),fill:"none",stroke:"currentColor","stroke-width":"1.8","stroke-linecap":"round","stroke-linejoin":"round","aria-hidden":"true",focusable:"false",class:"spro-icone"};for(let[s,i]of Object.entries(n))a.setAttribute(s,i);for(let[s,i]of gt[o]){let c=r.createElementNS(t,s);for(let[l,d]of Object.entries(i))c.setAttribute(l,d);a.append(c)}return a}function ht(o,e,r,t=1e4){let a=URL.createObjectURL(new Blob([e],{type:r})),n=p("a",{href:a,download:o});document.body.append(n),n.click(),n.remove(),setTimeout(()=>URL.revokeObjectURL(a),t).unref?.()}var k=class extends Error{codigo;detalhe;constructor(e,r,t){super(r),this.name="ErroSei",this.codigo=e,this.detalhe=t}paraJSON(){return{codigo:this.codigo,mensagem:this.message,detalhe:this.detalhe}}};function We(o){if(o instanceof k)return o;if(o instanceof DOMException&&o.name==="AbortError")return new k("CANCELADO","Opera\xE7\xE3o cancelada.");let e=o instanceof Error?o.message:String(o);return new k("SEI_REDE",`Falha ao falar com o SEI: ${e}`)}var jn={AElig:198,Aacute:193,Acirc:194,Agrave:192,Aring:197,Atilde:195,Auml:196,Ccedil:199,ETH:208,Eacute:201,Ecirc:202,Egrave:200,Euml:203,Iacute:205,Icirc:206,Igrave:204,Iuml:207,Ntilde:209,Oacute:211,Ocirc:212,Ograve:210,Oslash:216,Otilde:213,Ouml:214,THORN:222,Uacute:218,Ucirc:219,Ugrave:217,Uuml:220,Yacute:221,aacute:225,acirc:226,acute:180,aelig:230,agrave:224,amp:38,apos:39,aring:229,atilde:227,auml:228,brvbar:166,bull:8226,ccedil:231,cedil:184,cent:162,copy:169,curren:164,deg:176,divide:247,eacute:233,ecirc:234,egrave:232,eth:240,euml:235,euro:8364,frac12:189,frac14:188,frac34:190,gt:62,hellip:8230,iacute:237,icirc:238,iexcl:161,igrave:236,iquest:191,iuml:239,laquo:171,ldquo:8220,lsquo:8216,lt:60,macr:175,mdash:8212,micro:181,middot:183,nbsp:160,ndash:8211,not:172,ntilde:241,oacute:243,ocirc:244,ograve:242,ordf:170,ordm:186,oslash:248,otilde:245,ouml:246,para:182,plusmn:177,pound:163,quot:34,raquo:187,rdquo:8221,reg:174,rsquo:8217,sect:167,shy:173,sup1:185,sup2:178,sup3:179,szlig:223,thorn:254,times:215,trade:8482,uacute:250,ucirc:251,ugrave:249,uml:168,uuml:252,yacute:253,yen:165,yuml:255};function G(o){return o.includes("&")?o.replace(/&(#x[0-9a-fA-F]+|#\d+|[a-zA-Z][a-zA-Z0-9]*);/g,(e,r)=>{let t=r[0]==="#"?r[1]==="x"||r[1]==="X"?parseInt(r.slice(2),16):parseInt(r.slice(1),10):jn[r];return t===void 0||Number.isNaN(t)?e:String.fromCodePoint(t)}):o}var bt={128:8364,130:8218,131:402,132:8222,133:8230,134:8224,135:8225,136:710,137:8240,138:352,139:8249,140:338,142:381,145:8216,146:8217,147:8220,148:8221,149:8226,150:8211,151:8212,152:732,153:8482,154:353,155:8250,156:339,158:382,159:376};var vt=null;function pe(o){return vt?vt(o):new DOMParser().parseFromString(o,"text/html")}function V(o){return(o?.textContent??"").replace(/\s+/g," ").trim()}var Gn={n:`
`,r:"\r",t:"	",b:"\b",f:"\f",v:"\v",0:"\0"};function Ze(o,e){let r=o[e],t="";for(e+=1;e<o.length;){let a=o[e];if(a==="\\"){let n=o[e+1];if(n==="u"&&/^[0-9a-fA-F]{4}$/.test(o.slice(e+2,e+6))){t+=String.fromCharCode(parseInt(o.slice(e+2,e+6),16)),e+=6;continue}t+=Gn[n]??n,e+=2;continue}if(a===r)return[t,e+1];t+=a,e+=1}return[t,e]}function de(o,e){let r=[],t=e;for(;t<o.length;){let a=o[t];if(a===")")return[r,t+1];if(a===","||/\s/.test(a)){t+=1;continue}if(a==='"'||a==="'"){let[i,c]=Ze(o,t);r.push(i),t=c;continue}let n=/^(null|true|false|-?\d+(?:\.\d+)?)/.exec(o.slice(t,t+32));if(n){let i=n[1];r.push(i==="null"?null:i==="true"?!0:i==="false"?!1:Number(i)),t+=i.length;continue}let s=0;for(;t<o.length;){let i=o[t];if(i==="(")s+=1;else if(i===")"){if(s===0)break;s-=1}else if(i===","&&s===0)break;t+=1}r.push(null)}return[r,t]}function ho(o,e){let r=[],t=new RegExp(`\\b${e}\\(`,"g");for(let a of o.matchAll(t)){let[n]=de(o,a.index+a[0].length);r.push(n)}return r}function N(o){return typeof o=="string"?G(o):o==null?"":String(o)}var Un=/controlador(?:_ajax)?\.php\?acao=[^"'\s<>\\]*?infra_hash=[0-9a-f]{64,192}/g;function bo(o){let e=new Set;for(let r of o.replace(/&amp;/g,"&").matchAll(Un))e.add(r[0]);return[...e]}function X(o){let e=o.indexOf("?");return new URLSearchParams(e>=0?o.slice(e+1):"")}function ao(o,e,r={}){let t=Array.isArray(o)?o:bo(o);for(let a of t){let n=X(a),s=n.get("acao")??"";if(!(typeof e=="string"?s!==e:!e.test(s))&&Object.entries(r).every(([i,c])=>n.get(i)===c))return a}return null}function xt(o,e){let r=[...o.doc.querySelectorAll("#infraMenu a[href], #main-menu a[href], .infraMenu a[href]")].map(s=>s.getAttribute("href")??"").join(`
`),t=bo(r).filter(s=>X(s).get("acao")===e),n=(t.length?t:bo(o.html).filter(s=>X(s).get("acao")===e)).sort((s,i)=>[...X(s).keys()].length-[...X(i).keys()].length)[0];if(!n)throw new k("SEI_ACAO_INDISPONIVEL",`O menu do SEI n\xE3o oferece "${e}" para este usu\xE1rio.`);return n}function Bn(o){let e=new Map;for(let r of o.matchAll(/Nos\[(\d+)\]\s*=\s*new\s+infraArvoreNo\(/g)){let[t]=de(o,r.index+r[0].length);e.set(Number(r[1]),{indice:Number(r[1]),args:t,props:{}})}for(let r of o.matchAll(/Nos\[(\d+)\]\.(\w+)\s*=\s*(['"])/g)){let t=e.get(Number(r[1]));if(!t)continue;let[a]=Ze(o,r.index+r[0].length-1);t.props[r[2]]=a}return[...e.values()].sort((r,t)=>r.indice-t.indice)}function Qn(o){let e=[];for(let r of o.matchAll(/new\s+infraArvoreAcao\(/g)){let[t]=de(o,r.index+r[0].length);e.push({tipo:N(t[0]),idPai:N(t[2]),href:N(t[3]),titulo:N(t[5]),icone:N(t[6]),extra:t[8]==null?void 0:N(t[8])})}return e}function yt(o,e){let r=o.find(s=>s.tipo==="NIVEL_ACESSO"&&s.idPai===e);if(!r)return{nivel:"publico"};let[t,...a]=r.titulo.split(`
`);return{nivel:/sigilos/i.test(t)||/sigiloso/.test(r.icone)?"sigiloso":"restrito",hipotese:a.join(" ").trim()||void 0}}function At(o){return[...new Set([...o.matchAll(/<img[^>]*\btitle="([^"]+)"/g)].map(e=>N(e[1])))]}var Xn=/\s*\(\d{5,}\)\s*$/;function Kn(o){let e=o.html,r=Bn(e),t=Qn(e),a=r.find(c=>c.args[0]==="PROCESSO");if(!a)throw new k("SEI_VERSAO_NAO_SUPORTADA","A \xE1rvore do processo n\xE3o tem o n\xF3 do processo.");let n=N(a.args[1]),s=yt(t,n),i=r.filter(c=>c.args[0]==="DOCUMENTO").map(c=>{let l=N(c.args[1]),d=N(c.args[5]),m=N(c.args[7]),f=(c.props.src??"").replace(/&amp;/g,"&"),y=t.find(v=>v.tipo==="ASSINATURA"&&v.idPai===l),{nivel:A,hipotese:M}=yt(t,l),P=(/documento_([a-z0-9]+)\.svg/.exec(m)?.[1]??"interno").replace("cancelado","interno");return{id:l,numero:N(c.args[15])||(/\((\d{5,})\)\s*$/.exec(d)?.[1]??""),titulo:d.replace(Xn,""),pasta:c.args[2]&&String(c.args[2]).startsWith("PASTA")?String(c.args[2]):null,externo:/documento_download_anexo/.test(f)||!/documento_interno|documento_cancelado|formulario|email/.test(m),formato:P,nivel:A,hipotese:M,assinado:!!y,assinaturas:y?y.titulo.split(`
`).slice(1).filter(Boolean):[],cancelado:/documento_cancelado/.test(m),unidadeGeradora:t.find(v=>v.tipo==="UNIDADE_GERADORA"&&v.idPai===l)?.extra,link:N(c.args[3]).replace(/&amp;/g,"&"),src:f,acoes:bo(c.props.acoes??""),botoes:At(c.props.acoes??"")}});return{idProcedimento:n,protocolo:N(a.args[5])||N(a.args[15]),tipo:N(a.args[6]),nivel:s.nivel,hipotese:s.hipotese,marcadores:t.filter(c=>c.tipo==="MARCADOR"&&c.idPai===n).map(c=>c.titulo.replace(/^Marcador\n/,"").replace(/\n/g," \u2014 ")),documentos:i,acoesProcesso:bo(a.props.acoes??""),botoesProcesso:At(a.props.acoes??""),linkProcesso:N(a.args[3]).replace(/&amp;/g,"&"),sinais:t.filter(c=>c.idPai===n),links:bo(e),pagina:o}}async function Et(o,e,r){let t=await o.obter(e,r);if(!/acao=procedimento_visualizar/.test(t.url)){let a=t.doc.querySelector("#ifrArvore")?.getAttribute("src");if(!a)throw new k("SEI_NAO_ENCONTRADO","N\xE3o foi poss\xEDvel abrir a \xE1rvore do processo.");t=await o.obter(a,r)}if(/infraArvoreNo\("PASTA"/.test(t.html)){let a=ao(t.html,"procedimento_visualizar")&&bo(t.html).find(n=>/abrir_pastas=1/.test(n));a&&(t=await o.obter(a,r))}return Kn(t)}function vo(o,e,r){if(r){let t=o.documentos.find(a=>a.id===r);return t?ao(t.acoes,e):null}return ao(o.acoesProcesso,e)??ao(o.links,e,{id_procedimento:o.idProcedimento})}function no(o,e,r){let t=(e??"").trim(),a=(r??"").trim();return r===void 0||t===a?[]:[{campo:o,antes:t,depois:a}]}var Bo={publico:"0",restrito:"1"},ue={0:"P\xFAblico",1:"Restrito",2:"Sigiloso"};async function Qo(o,e,r,t){let a=/controlador_ajax\.php\?acao_ajax=hipotese_legal_select[^'"]*/.exec(e.pagina.html)?.[0];return a?o.ajax(G(a),[["primeiroItemValor","null"],["primeiroItemDescricao"," "],["valorItemSelecionado",""],["staNivelAcesso",r]],{sinal:t}):e.opcoes("selHipoteseLegal").filter(n=>n.valor!=="null").map(n=>({id:n.valor,texto:n.texto}))}var Mt="\xA5",Ye="\xB1";function wt(o){return o.map(e=>`${e.id}${Ye}${e.texto}`).join(Mt)}function Jn(o){return o?o.split(Mt).map(e=>{let[r,...t]=e.split(Ye);return{id:r,texto:t.join(Ye)}}):[]}function St(o){let e=[];for(let r of o.matchAll(/new\s+infraLupaSelect\(\s*['"]([\w-]+)['"]\s*,\s*['"]([\w-]+)['"]/g))e.push([r[1],r[2]]);return e}var F=class o{constructor(e,r,t){this.http=e;this.pagina=r;this.elemento=t,this.id=t.id,this.action=(t.getAttribute("action")??"").replace(/&amp;/g,"&"),this.campos=Wn(t),this.sincronizarLupas()}id;action;campos;elemento;static async abrir(e,r,t,a){let n=await e.obter(r,a);return o.de(n,t,e)}static de(e,r,t=null){let a=e.doc.querySelector(r);if(!a)throw new k("SEI_VERSAO_NAO_SUPORTADA",`A tela do SEI n\xE3o tem o formul\xE1rio esperado (${r}).`,V(e.doc.querySelector("title")));return new o(t,e,a)}pares(){return this.campos.map(e=>[e.nome,e.valor])}valor(e){return this.campos.find(r=>r.nome===e)?.valor}tem(e){return this.elemento.querySelector(`[name="${e}"]`)!==null||this.campos.some(r=>r.nome===e)}opcoes(e){let r=this.elemento.querySelector(`select[name="${e}"], select#${Pt(e)}`);return r?[...r.querySelectorAll("option")].map(t=>({valor:t.getAttribute("value")??V(t),texto:V(t),selecionada:t.hasAttribute("selected")})):[]}definir(e){for(let[r,t]of Object.entries(e)){if(t===void 0)continue;if(t===null){this.campos=this.campos.filter(n=>n.nome!==r);continue}let a=this.campos.find(n=>n.nome===r);a?a.valor=t:this.campos.push({nome:r,valor:t})}return this}escolher(e,r){let t=this.opcoes(e),a=K(r),n=t.find(s=>s.valor===r)??t.find(s=>K(s.texto)===a)??or(t.filter(s=>K(s.texto).includes(a)));if(!n)throw new k("ARGUMENTO_INVALIDO",`"${r}" n\xE3o \xE9 uma op\xE7\xE3o de ${e}.`,t.slice(0,40).map(s=>s.texto).join(" | "));return this.definir({[e]:n.valor}),n}linhas(e){return[...this.elemento.querySelectorAll(`${e} tr`)].filter(r=>r.querySelector("input[type=checkbox]"))}itensLupa(e){let r=this.hiddenDaLupa(e);return r?Jn(this.valor(r)??""):[]}definirLupa(e,r){let t=this.hiddenDaLupa(e);if(!t)throw new k("SEI_VERSAO_NAO_SUPORTADA",`A lupa ${e} n\xE3o existe nesta tela.`);return this.definir({[t]:wt(r)}),this.campos=this.campos.filter(a=>a.nome!==e&&a.nome!==`${e}[]`),this}async enviar(e={}){if(!this.http)throw new k("SEI_RESPOSTA_INESPERADA","Formul\xE1rio sem transporte HTTP.");if(!this.action)throw new k("SEI_VERSAO_NAO_SUPORTADA",`O formul\xE1rio ${this.id} n\xE3o tem action.`);let r=this.pares();e.botao&&r.push(this.botaoDeEnvio(e.botao));let t=await this.http.enviar(this.action,r,e);if(e.sucesso&&!e.sucesso(t))throw new k("SEI_RESPOSTA_INESPERADA",`O SEI n\xE3o confirmou ${e.operacao??"a opera\xE7\xE3o"}.`,`${V(t.doc.querySelector("title"))} \u2014 ${t.url.replace(/infra_hash=\w+/,"infra_hash=\u2026")}`);return t}botaoDeEnvio(e){let r=this.elemento.querySelector(`[name="${e}"]`)??or([...this.elemento.querySelectorAll('button[type="submit"][name^="sbm"], input[type="submit"][name^="sbm"]')]);return r?[r.getAttribute("name")??e,r.getAttribute("value")??V(r)??e]:[e,e]}hiddenDaLupa(e){let r=St(this.pagina.html).find(([t])=>t===e);return r?r[1]:null}sincronizarLupas(){for(let[e,r]of St(this.pagina.html)){let t=this.elemento.querySelector(`select#${Pt(e)}`);if(!t)continue;let a=[...t.querySelectorAll("option")].map(n=>({id:n.getAttribute("value")??"",texto:V(n)}));(this.valor(r)??"")||this.definir({[r]:wt(a)}),this.campos=this.campos.filter(n=>n.nome!==e&&n.nome!==`${e}[]`)}}};function Wn(o){let e=[];for(let r of o.querySelectorAll("input, select, textarea")){let t=r.getAttribute("name");if(!t||r.hasAttribute("disabled"))continue;let a=r.tagName.toLowerCase();if(a==="input"){let n=(r.getAttribute("type")??"text").toLowerCase();if(["submit","button","image","reset","file"].includes(n)||(n==="checkbox"||n==="radio")&&!r.hasAttribute("checked"))continue;e.push({nome:t,valor:r.getAttribute("value")??(n==="checkbox"||n==="radio"?"on":"")})}else if(a==="textarea")e.push({nome:t,valor:r.textContent??""});else{let n=[...r.querySelectorAll("option")],s=n.filter(l=>l.hasAttribute("selected")),i=r.hasAttribute("multiple"),c=s.length?s:!i&&n.length?[n[0]]:[];for(let l of c)e.push({nome:t,valor:l.getAttribute("value")??V(l)})}}return e}function K(o){return o.normalize("NFD").replace(/[\u0300-\u036F]/g,"").toLowerCase().replace(/\s+/g," ").trim()}function er(o,e,r){let t=K(e),a=o.find(n=>n.id===e)??o.find(n=>K(n.texto)===t)??or(o.filter(n=>K(n.texto).includes(t)));if(!a)throw new k("ARGUMENTO_INVALIDO",`${r} "${e}" n\xE3o encontrado(a) ou amb\xEDguo(a).`,o.slice(0,40).map(n=>n.texto).join(" | "));return a}function or(o){return o.length===1?o[0]:void 0}function Pt(o){return o.replace(/([^\w-])/g,"\\$1")}async function Zn(o,e,r){let t=vo(e,"documento_escolher_tipo");if(!t)throw new k("SEI_ACAO_INDISPONIVEL",`N\xE3o \xE9 poss\xEDvel incluir documento no processo ${e.protocolo} (fechado na unidade?).`);let a=await F.abrir(o.http,t,"#frmDocumentoEscolherTipo",{sinal:r});if(a.tem("hdnFiltroSerie")&&a.valor("hdnFiltroSerie")!=="T"){let n=await a.definir({hdnFiltroSerie:"T"}).enviar({sinal:r});a=F.de(n,"#frmDocumentoEscolherTipo",o.http)}return a}function Yn(o){let e=new Map;for(let r of o.doc.querySelectorAll("[onclick*='escolher(']")){let t=/escolher\((-?\d+)\)/.exec(r.getAttribute("onclick")??"")?.[1];t&&!e.has(t)&&e.set(t,V(r))}for(let r of o.doc.querySelectorAll("a[href*='id_serie=']")){let t=X(r.getAttribute("href")??"").get("id_serie");t&&!e.has(t)&&e.set(t,V(r))}return[...e].filter(([,r])=>r).map(([r,t])=>({id:r,nome:t}))}async function kt(o,e,r){let t=await o.arvore(e,{sinal:r});return Yn((await Zn(o,t,r)).pagina)}var Lt={tipos_processo:{acao:"procedimento_alterar",form:"#frmProcedimentoCadastro",campo:"selTipoProcedimento"},hipoteses_legais:{acao:"procedimento_alterar",form:"#frmProcedimentoCadastro",campo:"selHipoteseLegal"},usuarios:{acao:"procedimento_atribuicao_cadastrar",form:"#frmAtividadeAtribuir",campo:"selAtribuicao"},marcadores:{acao:"andamento_marcador_gerenciar",form:"#frmAndamentoMarcadorCadastro",campo:"selMarcador"},grupos_acompanhamento:{acao:"acompanhamento_gerenciar",form:"#frmAcompanhamentoCadastro",campo:"selGrupoAcompanhamento"}};async function Ct(o,e,r,t={}){let a;if(e==="tipos_documento")a=(await kt(o,r,t.sinal)).map(s=>({id:s.id,nome:s.nome}));else{let s=Lt[e];if(!s)throw new k("ARGUMENTO_INVALIDO",`Lista desconhecida: ${e}.`,Object.keys(Lt).concat("tipos_documento").join(" | "));let i=await o.arvore(r,{sinal:t.sinal}),c=vo(i,s.acao);if(!c)throw new k("SEI_ACAO_INDISPONIVEL",`Para listar ${e} use um processo aberto na sua unidade.`);if(e==="marcadores"&&(c=ao((await o.http.obter(c,{sinal:t.sinal,aceitarValidacao:!0})).html,"andamento_marcador_cadastrar"),!c))throw new k("SEI_VERSAO_NAO_SUPORTADA","Tela de marcadores n\xE3o reconhecida.");let l=await F.abrir(o.http,c,s.form,{sinal:t.sinal,aceitarValidacao:!0});a=e==="hipoteses_legais"?(await Qo(o,l,"1",t.sinal)).map(d=>({id:d.id,nome:d.texto})):l.opcoes(s.campo).filter(d=>d.valor&&d.valor!=="null"&&d.texto).map(d=>({id:d.valor,nome:d.texto}))}let n=t.filtro?K(t.filtro):"";return n?a.filter(s=>K(s.nome).includes(n)):a}function Ot(o,e){let r=o.valor(e);return o.opcoes(e).find(t=>t.valor===r&&r!=="null")?.texto??""}async function os(o,e,r){let t=vo(e,"procedimento_alterar"),a=t??vo(e,"procedimento_consultar");if(!a)throw new k("SEI_ACAO_INDISPONIVEL",`O SEI n\xE3o oferece a consulta do processo ${e.protocolo} para voc\xEA.`);return{form:await F.abrir(o,a,"#frmProcedimentoCadastro",r),editavel:!!t}}function Dt(o){return o.map(e=>e.texto).filter(Boolean)}async function It(o,e,r,t){let a=await o.arvore(e,{sinal:t.sinal});if(a.nivel==="sigiloso")throw new k("SEI_SIGILOSO","Processo sigiloso: o agente n\xE3o atua nele.");let{form:n,editavel:s}=await os(o.http,a,{sinal:t.sinal});if(!s)throw new k("SEI_ACAO_INDISPONIVEL",`O processo ${a.protocolo} n\xE3o est\xE1 aberto na sua unidade.`);let i=[];if(r.especificacao!==void 0&&(i.push(...no("Especifica\xE7\xE3o",n.valor("txtDescricao"),r.especificacao)),n.definir({txtDescricao:r.especificacao.slice(0,100)})),r.tipo!==void 0){let l=Ot(n,"selTipoProcedimento"),d=n.escolher("selTipoProcedimento",r.tipo);n.definir({hdnIdTipoProcedimento:d.valor}),i.push(...no("Tipo",l,d.texto))}if(r.nivel!==void 0){let l=ue[n.valor("rdoNivelAcesso")??""]??"";n.definir({rdoNivelAcesso:Bo[r.nivel]}),i.push(...no("N\xEDvel de acesso",l,ue[Bo[r.nivel]])),r.nivel==="publico"&&n.definir({selHipoteseLegal:"null"})}if(r.hipotese!==void 0){let l=Ot(n,"selHipoteseLegal"),d=n.valor("rdoNivelAcesso")||Bo.restrito,m=er(await Qo(o,n,d,t.sinal),r.hipotese,"Hip\xF3tese legal");n.definir({selHipoteseLegal:m.id}),i.push(...no("Hip\xF3tese legal",l,m.texto))}if(n.valor("rdoNivelAcesso")==="1"&&(n.valor("selHipoteseLegal")??"null")==="null")throw new k("ARGUMENTO_INVALIDO","Processo restrito exige hip\xF3tese legal. Informe a hip\xF3tese.");r.observacoes!==void 0&&(i.push(...no("Observa\xE7\xF5es da unidade",n.valor("txaObservacoes"),r.observacoes)),n.definir({txaObservacoes:r.observacoes})),r.interessados!==void 0&&(i.push(...no("Interessados",Dt(n.itensLupa("selInteressadosProcedimento")).join("; "),Dt(r.interessados).join("; "))),n.definirLupa("selInteressadosProcedimento",r.interessados));let c={alvo:a.protocolo,mudancas:i,aplicado:!1,resumo:""};return i.length?t.aplicar?(n.definir({hdnFlagProcedimentoCadastro:"2"}),await n.enviar({sinal:t.sinal,operacao:`a altera\xE7\xE3o do processo ${a.protocolo}`,sucesso:l=>X(l.url).get("acao")!=="procedimento_alterar"}),o.invalidar(a.idProcedimento),{...c,aplicado:!0,resumo:`Processo ${a.protocolo} alterado.`}):{...c,resumo:`${i.length} campo(s) a alterar.`}:{...c,resumo:"Nada a alterar: os valores j\xE1 s\xE3o esses."}}async function zt(o,e,r){let t=await o.arvore(e,{sinal:r});if(t.nivel==="sigiloso")throw new k("SEI_SIGILOSO","Processo sigiloso: o agente n\xE3o atua nele.");return t}function Tt(o,e,r){let t=vo(o,e);if(!t)throw new k("SEI_ACAO_INDISPONIVEL",`"${r}" n\xE3o est\xE1 dispon\xEDvel no processo ${o.protocolo} (processo fechado na unidade ou sem permiss\xE3o).`);return t}var Nt=o=>e=>X(e.url).get("acao")!==o;async function es(o,e,r,t){let a=await o.http.obter(Tt(e,r.acao,r.nomeAcao),{sinal:t,aceitarValidacao:!0});if(a.doc.querySelector(r.form))return F.de(a,r.form,o.http);let n=(r.formularios??[]).map(s=>ao(a.html,s)).find(Boolean);if(!n)throw new k("SEI_VERSAO_NAO_SUPORTADA",`A tela "${r.nomeAcao}" n\xE3o tem o formul\xE1rio esperado.`);return F.abrir(o.http,n,r.form,{sinal:t,aceitarValidacao:!0})}async function Rt(o,e,r,t){let a=await zt(o,e,t.sinal),n=await es(o,a,r,t.sinal),s=r.preparar(n),i={alvo:a.protocolo,mudancas:s,aplicado:!1,resumo:""};return s.length?t.aplicar?(await n.enviar({sinal:t.sinal,botao:r.botao,operacao:`${r.nomeAcao} em ${a.protocolo}`,sucesso:r.sucesso??Nt(r.acao)}),o.invalidar(a.idProcedimento),{...i,aplicado:!0,resumo:r.resumo(a.protocolo).replace(/^Vai /,"")}):{...i,resumo:r.resumo(a.protocolo)}:{...i,resumo:"Nada a alterar: j\xE1 est\xE1 assim."}}function _t(o,e,r,t){return Rt(o,e,{acao:"anotacao_registrar",nomeAcao:"Anota\xE7\xF5es",form:"#frmAnotacaoCadastro",botao:"sbmRegistrarAnotacao",preparar:a=>{let n=r.texto.slice(0,500),s=no("Anota\xE7\xE3o",a.valor("txaDescricao"),n),i=a.valor("chkSinPrioridade")?"sim":"n\xE3o",c=n?r.prioridade===void 0?i:r.prioridade?"sim":"n\xE3o":"n\xE3o";return a.definir({txaDescricao:n,chkSinPrioridade:c==="sim"?"on":null}),[...s,...no("Prioridade",i,c)]},resumo:a=>r.texto?`Anota\xE7\xE3o definida em ${a}.`:`Anota\xE7\xE3o removida de ${a}.`},t)}function qt(o,e,r,t){return Rt(o,e,{acao:"procedimento_atribuicao_cadastrar",nomeAcao:"Atribuir Processo",form:"#frmAtividadeAtribuir",botao:"sbmSalvar",preparar:a=>{let n=a.opcoes("selAtribuicao").find(l=>l.valor===a.valor("selAtribuicao")&&l.valor!=="null")?.texto??"";if(r===null)return a.definir({selAtribuicao:"null"}),[{campo:"Atribui\xE7\xE3o",antes:n||"(atribui\xE7\xE3o atual)",depois:"(nenhuma)"}];let s=K(r),i=a.opcoes("selAtribuicao").filter(l=>l.valor!=="null"),c=i.find(l=>l.valor===r)??i.find(l=>K(l.texto.split(" - ")[0])===s)??i.find(l=>K(l.texto.split(" - ").slice(1).join(" - "))===s)??(i.filter(l=>K(l.texto).includes(s)).length===1?i.find(l=>K(l.texto).includes(s)):void 0);if(!c)throw new k("ARGUMENTO_INVALIDO",`Usu\xE1rio "${r}" n\xE3o encontrado (ou amb\xEDguo) na unidade.`,i.map(l=>l.texto).join(" | "));return a.definir({selAtribuicao:c.valor}),no("Atribui\xE7\xE3o",n,c.texto)},resumo:a=>r?`Processo ${a} atribu\xEDdo.`:`Atribui\xE7\xE3o removida de ${a}.`},t)}async function rs(o,e,r){let t=Tt(e,"andamento_marcador_gerenciar","Gerenciar Marcador");return o.http.obter(t,{sinal:r,aceitarValidacao:!0})}function $t(o){return[...o.doc.querySelectorAll("#tblMarcadores tr")].filter(r=>r.querySelector("input[type=checkbox]")).map(r=>{let t=[...r.querySelectorAll("td")];return{id:r.querySelector("input[type=checkbox]")?.getAttribute("value")??"",marcador:V(t[1]),texto:V(t[2]),usuario:V(t[3]),data:V(t[4])}})}async function Vt(o,e,r,t){let a=await zt(o,e,t.sinal),n=await rs(o,a,t.sinal),s=$t(n),i=K(r.marcador),c=s.find(f=>K(f.marcador)===i),l={alvo:a.protocolo,mudancas:[],aplicado:!1,resumo:""};if(r.remover){if(!c)return{...l,resumo:`O processo ${a.protocolo} n\xE3o tem o marcador "${r.marcador}".`};if(l.mudancas=[{campo:"Marcador",antes:`${c.marcador}${c.texto?`: ${c.texto}`:""}`,depois:""}],!t.aplicar)return{...l,resumo:`Vai remover o marcador "${c.marcador}" de ${a.protocolo}.`};let f=ao(n.html,"andamento_marcador_remover");if(!f)throw new k("SEI_ACAO_INDISPONIVEL","A tela de marcadores n\xE3o oferece remo\xE7\xE3o.");let y=F.de(n,"#frmGerenciarMarcador",o.http);y.definir({hdnInfraItemId:c.id,hdnInfraItensSelecionados:c.id});let A=await o.http.enviar(f,y.pares(),{sinal:t.sinal,aceitarValidacao:!0});if($t(A).some(M=>M.id===c.id))throw new k("SEI_RESPOSTA_INESPERADA",`O SEI n\xE3o removeu o marcador "${c.marcador}".`);return o.invalidar(a.idProcedimento),{...l,aplicado:!0,resumo:`Marcador "${c.marcador}" removido de ${a.protocolo}.`}}let d;if(n.doc.querySelector("#frmAndamentoMarcadorCadastro"))d=F.de(n,"#frmAndamentoMarcadorCadastro",o.http);else{let f=ao(n.html,"andamento_marcador_cadastrar");if(!f)throw new k("SEI_VERSAO_NAO_SUPORTADA","Esta vers\xE3o do SEI n\xE3o tem a tela de marcadores esperada (4.1 ou superior).");d=await F.abrir(o.http,f,"#frmAndamentoMarcadorCadastro",{sinal:t.sinal})}let m=d.escolher("selMarcador",r.marcador);return d.definir({hdnIdMarcador:m.valor,txaTexto:(r.texto??c?.texto??"").slice(0,250)}),l.mudancas=c?no(`Texto do marcador ${m.texto}`,c.texto,r.texto):[{campo:"Marcador",antes:"",depois:`${m.texto}${r.texto?`: ${r.texto}`:""}`}],l.mudancas.length?t.aplicar?(await d.enviar({sinal:t.sinal,botao:"sbmSalvar",operacao:`o marcador em ${a.protocolo}`,sucesso:Nt("andamento_marcador_cadastrar")}),o.invalidar(a.idProcedimento),{...l,aplicado:!0,resumo:`Marcador "${m.texto}" aplicado em ${a.protocolo}.`}):{...l,resumo:`Vai marcar ${a.protocolo} com "${m.texto}".`}:{...l,resumo:"Nada a alterar: o marcador j\xE1 est\xE1 assim."}}var ts={"\u2010":"-","\u2011":"-","\u2012":"-","\u2013":"-","\u2014":"-","\u2015":"-","\u2212":"-","\u2018":"'","\u2019":"'","\u201A":"'","\u201B":"'","\u2032":"'","\u201C":'"',"\u201D":'"',"\u201E":'"',"\u201F":'"',"\u2033":'"',"\u2026":"...","\u2022":"-","\u2002":" ","\u2003":" ","\u2009":" ","\u202F":" ","\u205F":" ","\u200B":"","\u200C":"","\u200D":"","\u2060":"","\uFEFF":"","\u20AC":"EUR","\u2122":"(TM)","\u2192":"->","\u2190":"<-"};function Ht(o,e="texto"){let r="";for(let t of o){let a=t.codePointAt(0);if(a<=255){r+=t;continue}let n=ts[t];if(e==="html"){r+=n===""?"":`&#${a};`;continue}if(n!==void 0){r+=n;continue}let s=t.normalize("NFKD").replace(/[\u0300-\u036F]/g,"");r+=[...s].every(i=>i.codePointAt(0)<=255)?s:""}return r}var as=/[A-Za-z0-9\-_.*]/;function Ft(o){let e="";for(let r of o)r===" "?e+="+":as.test(r)?e+=r:e+="%"+r.charCodeAt(0).toString(16).toUpperCase().padStart(2,"0");return e}function jt(o,e={}){return o.map(([r,t])=>{let a=e[r]??"texto";return`${Ft(Ht(r))}=${Ft(Ht(t??"",a))}`}).join("&")}function rr(o){let e=o instanceof Uint8Array?o:new Uint8Array(o),r=[],t=16384;for(let a=0;a<e.length;a+=t){let n=e.subarray(a,a+t),s=new Array(n.length);for(let i=0;i<n.length;i+=1)s[i]=bt[n[i]]??n[i];r.push(String.fromCharCode(...s))}return r.join("")}var Gt="application/x-www-form-urlencoded; charset=ISO-8859-1";function Ut(o,e,r){let t=null;return{url:o,status:e,html:r,get doc(){return t??=pe(r)}}}function Bt(o,e={}){if(/\/login\.php/i.test(o.url)||/[?&]acao=(?:infra_)?sair\b/.test(o.url))throw new k("SEI_SESSAO_EXPIRADA","A sess\xE3o do SEI foi encerrada. Fa\xE7a login de novo no SEI e repita o pedido.");if(o.status>=500)throw new k("SEI_EXCECAO",`O SEI respondeu com erro ${o.status}.`);if(o.html.includes('id="divInfraExcecao"')){let r=o.doc.querySelector("#divInfraExcecao");if(r){let t=V(r);throw new k("SEI_EXCECAO",t||"O SEI exibiu uma p\xE1gina de erro.",t)}}if(!e.aceitarValidacao&&o.html.includes("txaInfraValidacao")){let r=o.doc.querySelector("#txaInfraValidacao")?.textContent?.trim()??"";if(r)throw new k("SEI_VALIDACAO",r,r)}return o}function Qt(o,e={}){let r=new URL(".",o),t=e.fetch??((...m)=>fetch(...m)),a=Math.max(1,e.concorrencia??3),n=0,s=[];async function i(m){n>=a&&await new Promise(f=>s.push(f)),n+=1;try{return await m()}finally{n-=1,s.shift()?.()}}let c=m=>new URL(m.replace(/&amp;/g,"&"),r).href;async function l(m,f,y){return i(async()=>{try{let A=await t(c(m),{credentials:"same-origin",redirect:"follow",...f,signal:y.sinal}),M=rr(await A.arrayBuffer());return Bt(Ut(A.url||c(m),A.status,M),y)}catch(A){throw We(A)}})}async function d(m,f={}){return i(async()=>{try{let y=await t(c(m),{credentials:"same-origin",redirect:"follow",signal:f.sinal}),A=new Uint8Array(await y.arrayBuffer()),M=(y.headers?.get("content-type")??"").split(";")[0].trim().toLowerCase();M==="text/html"&&Bt(Ut(y.url||c(m),y.status,rr(A)),f);let P=y.headers?.get("content-disposition")??"",v=decodeURIComponent(/filename\*=UTF-8''([^;]+)/i.exec(P)?.[1]??/filename="?([^";]+)"?/i.exec(P)?.[1]??"");return{bytes:A,tipo:M,nome:v}}catch(y){throw We(y)}})}return{base:r,absoluta:c,baixar:d,obter:(m,f={})=>l(m,{method:"GET"},f),enviar:(m,f,y={})=>l(m,{method:"POST",headers:{"Content-Type":Gt},body:jt(f,y.modos)},y)}}function ns(o){let e=/Sistema Eletr(?:\u00F4|&ocirc;|\\u00F4)nico de Informa[^"]*?Vers(?:\u00E3|&atilde;)o\s*([\d.]+)/i.exec(o);return e?e[1]:/\.(?:js|svg|css)\?(\d+\.\d+\.\d+)-/.exec(o)?.[1]??""}function ss(o){let e=o.doc.querySelector("#lnkInfraUnidade")?.getAttribute("onclick")??"",r=/infra_unidade_atual=(\d+)/.exec(e)?.[1];if(r)return r;let t=/[?&]infra_unidade_atual=(\d+)/.exec(o.url)?.[1];return t||(o.doc.querySelector("#selInfraUnidades option[selected]")?.getAttribute("value")??"")}function tr(o){let e=o.doc,r=e.querySelector("#lnkInfraUnidade"),t=e.querySelector("#lnkUsuarioSistema")?.getAttribute("title")??"",[,a="",n="",s=""]=/^(.*?)\s*\(([^/)]+)(?:\/([^)]+))?/.exec(t)??[],i=ns(o.html);return{host:new URL(o.url).host,versao:i,maior:Number(i.split(".")[0])||0,unidade:{id:ss(o),sigla:V(r)||V(e.querySelector("#selInfraUnidades option[selected]")),nome:r?.getAttribute("title")??""},usuario:{nome:a.trim(),login:n.trim(),orgao:s.trim()}}}var is=3e4,me=class{constructor(e,r=null,t){this.paginaViva=r;this.http=Qt(e,t)}http;paginaBase=null;arvores=new Map;localizados=new Map;base(){let e=this.paginaViva?.();if(e&&e.html.includes("frmProtocoloPesquisaRapida"))return e;if(this.paginaBase)return this.paginaBase;if(e)return e;throw new k("SEI_NAO_ENCONTRADO","Abra uma tela do SEI (por exemplo, Controle de Processos) nesta aba.")}contexto(){return tr(this.base())}linkMenu(e){return xt(this.base(),e)}async renovarBase(e){return this.paginaBase=await this.http.obter(this.linkMenu("procedimento_controlar"),e),this.arvores.clear(),this.localizados.clear(),this.paginaBase}async localizar(e,r){let t=e.trim();if(!t)throw new k("ARGUMENTO_INVALIDO","Informe o n\xFAmero do processo ou o n\xBA SEI do documento.");let a=this.localizados.get(t);if(a)return a;let n=F.de(this.base(),"#frmProtocoloPesquisaRapida",this.http);n.definir({txtPesquisaRapida:t});let s=await n.enviar(r),i=X(s.url);if(i.get("acao")!=="procedimento_trabalhar")throw new k("SEI_NAO_ENCONTRADO",`Nada encontrado no SEI para "${t}", ou voc\xEA n\xE3o tem acesso a ele.`);let c=s.doc.querySelector("#ifrArvore")?.getAttribute("src");if(!c)throw new k("SEI_VERSAO_NAO_SUPORTADA","A tela do processo n\xE3o trouxe a \xE1rvore.");let d=X(G(c)).get("id_procedimento")??"",m=i.get("id_protocolo")??"",f={idProcedimento:d,idDocumento:m&&m!==d?m:void 0,linkArvore:G(c)};return this.localizados.set(t,f),f}async arvore(e,r={}){let t=await this.localizar(e,r),a=this.arvores.get(t.idProcedimento);if(a&&!r.forcar&&Date.now()-a.quando<is)return a.arvore;let n=await Et(this.http,t.linkArvore,r);return this.arvores.set(t.idProcedimento,{quando:Date.now(),arvore:n}),n}invalidar(e){e?this.arvores.delete(e):this.arvores.clear()}async ajax(e,r,t){let a=await this.http.enviar(e,r,{...t,aceitarValidacao:!0}),n=[];for(let s of a.html.matchAll(/<option[^>]*value="([^"]*)"[^>]*>([^<]*)<\/option>/g))n.push({id:G(s[1]),texto:G(s[2]).trim()});for(let s of a.html.matchAll(/<item\s+([^>]*)>/g)){let i=pe(`<i ${s[1]}></i>`).querySelector("i");n.push({id:i?.getAttribute("id")??"",texto:i?.getAttribute("descricao")??i?.getAttribute("complemento")??""})}return n.filter(s=>s.id&&s.id!=="null")}};function Xo(o,e=o.location?.href??"https://sei.invalido/sei/controlador.php"){return{url:e,status:200,get html(){return o.documentElement.outerHTML},doc:o}}var cs='a[onclick*="acaoControleProcessos"]';function Xt(o){let e=new Set,r=[];for(let t of o.querySelectorAll(cs)){let a=/[?&]acao=([a-z0-9_]+)/.exec(t.getAttribute("onclick")??"")?.[1],n=t.querySelector("img");if(!a||!n||e.has(a))continue;e.add(a);let s=n.getAttribute("title")||n.getAttribute("alt")||a,i=n.getAttribute("src")??"";try{i=new URL(i,o.baseURI||o.location?.href).href}catch{}r.push({acao:a,rotulo:s,icone:i,elemento:t})}return r}var fe="data-tip";var ls=`
:host { all: initial; }
.dica { position: fixed; inset: auto; margin: 0; border: 0; overflow: visible; z-index: 2147483647; max-width: 320px; padding: 6px 10px; font: 12px/1.45 system-ui, -apple-system, "Segoe UI", Roboto, sans-serif; color: #fff; white-space: pre-line; pointer-events: none; background: #1b1f24; border-radius: 8px; box-shadow: 0 6px 18px rgb(0 0 0 / 28%); opacity: 0; transform: translateY(2px); transition: opacity 120ms ease, transform 120ms ease; }
.dica.claro { color: #1b1f24; background: #fff; box-shadow: 0 6px 18px rgb(0 0 0 / 22%), 0 0 0 1px rgb(0 0 0 / 10%); }
.dica.on { opacity: 1; transform: none; }
.dica[hidden] { display: none; }
@media (prefers-reduced-motion: reduce) { .dica { transition: none; } }
`,Kt=o=>o.nodeType===1,ps=o=>o.some(e=>Kt(e)&&(e.id==="spro-grade"||e.classList.contains("spro-grade-botao")));function ar(o){if(!ps(o))return null;for(let e of o)if(Kt(e)){if(e.id==="spro-grade")return null;if(e.hasAttribute(fe)||e.hasAttribute("title"))return e}return null}function Lo(o){let e=o.getAttribute("title");return e&&(o.hasAttribute(fe)||o.setAttribute(fe,e),!o.hasAttribute("aria-label")&&!(o.textContent??"").trim()&&o.setAttribute("aria-label",e.split(`
`)[0]),o.removeAttribute("title")),o.getAttribute(fe)??""}var nr=null;function Jt(o){let e=a=>{if(a.nodeType!==1)return;let n=a;n.hasAttribute("title")&&Lo(n);for(let s of Array.from(n.querySelectorAll("[title]")))Lo(s)};if(e(o.nodeType===11?o.host:o),o.nodeType===11)for(let a of Array.from(o.querySelectorAll("[title]")))Lo(a);let r=(o.ownerDocument??o).defaultView?.MutationObserver;if(!r)return()=>{};let t=new r(a=>{for(let n of a)if(n.type==="attributes")e(n.target);else for(let s of Array.from(n.addedNodes))e(s);nr?.()});return t.observe(o,{attributes:!0,attributeFilter:["title"],childList:!0,subtree:!0}),()=>t.disconnect()}function ds(o){let e=[],r=o;for(;r;)e.push(r),r=r.nodeType===11?r.host??null:r.parentNode;return e}function us(o,e,r){let a=o.bottom+8,n=!1;a+e.altura>r.h-4&&o.top-8-e.altura>=4&&(a=o.top-8-e.altura,n=!0);let s=o.left+o.width/2-e.largura/2;return s=Math.max(4,Math.min(s,r.w-e.largura-4)),{x:Math.round(s),y:Math.round(Math.max(4,a)),acima:n}}function Wt(o,e=()=>!1){let r=o.defaultView;if(!r)return()=>{};let t=o.createElement("div");t.id="spro-dica-host";let a=t.attachShadow({mode:"open"}),n=o.createElement("style");n.textContent=ls;let s=o.createElement("div");s.className="dica",s.setAttribute("role","tooltip"),s.hidden=!0,s.setAttribute("popover","manual"),a.append(n,s),o.documentElement.append(t);let i=null,c,l=!1,d=null;function m(){clearTimeout(c),i=null,l=!1,s.classList.remove("on"),s.hidden=!0;try{s.matches?.(":popover-open")&&s.hidePopover()}catch{}}function f(){if(!i||!i.isConnected)return A();let E=Lo(i);if(!E)return m();s.textContent=E,s.classList.toggle("claro",!e()),s.hidden=!1;try{typeof s.showPopover=="function"&&!s.matches(":popover-open")&&s.showPopover()}catch{}let w=i.getBoundingClientRect(),C=s.getBoundingClientRect(),z=us(w,{largura:C.width,altura:C.height},{w:r.innerWidth,h:r.innerHeight});s.style.left=`${z.x}px`,s.style.top=`${z.y}px`,s.classList.add("on"),l=!0}function y(E,w){let C=o.elementFromPoint(E,w);for(let z=0;z<4&&C?.shadowRoot;z++){let T=C.shadowRoot.elementFromPoint(E,w);if(!T||T===C)break;C=T}return C}function A(){if(!d)return m();let E=y(d.x,d.y),w=E?ar(ds(E)):null;if(w===i&&i?.isConnected)return;let C=l;m(),w&&(Lo(w),i=w,f())}nr=()=>{i&&!i.isConnected&&A()};let M=E=>{let w=E;typeof w.clientX=="number"&&(d={x:w.clientX,y:w.clientY});let C=ar(E.composedPath());C===i&&i?.isConnected||(m(),C&&(Lo(C),i=C,f()))},P=E=>{let w=E;typeof w.clientX=="number"&&(d={x:w.clientX,y:w.clientY})},v=E=>{let w=ar(E.composedPath());!w||!w.matches?.(":focus-visible")||(m(),Lo(w),i=w,f())},S=()=>m();return o.addEventListener("pointerover",M,!0),o.addEventListener("pointermove",P,!0),o.addEventListener("focusin",v,!0),o.addEventListener("focusout",m,!0),o.addEventListener("pointerdown",m,!0),o.addEventListener("keydown",m,!0),o.addEventListener("scroll",m,!0),o.documentElement.addEventListener("pointerleave",S),()=>{m(),nr=null,o.removeEventListener("pointerover",M,!0),o.removeEventListener("pointermove",P,!0),o.documentElement.removeEventListener("pointerleave",S),o.removeEventListener("focusin",v,!0),o.removeEventListener("focusout",m,!0),o.removeEventListener("pointerdown",m,!0),o.removeEventListener("keydown",m,!0),o.removeEventListener("scroll",m,!0),t.remove()}}var Y="data-spro-grade",xo="data-spro-grade-pronta",Ko="data-spro-grade-escuro",sr="spro_grade",ir="spro-grade-pre";var ms="#tblProcessosRecebidos, #tblProcessosGerados, #tblProcessosDetalhado";function fs(){let o=ms.split(", ").map(t=>`html[${Y}] ${t}`).join(`,
`),e=`html[${Y}]:not([${xo}]) #divTabelaProcesso::before,
html[${Y}]:not([${xo}]) #frmProcedimentoControlar:not(:has(#divTabelaProcesso))::before`,r=["#divFiltro","#newFiltro","#processosProActions"].map(t=>`html[${Y}] ${t}`).join(`,
`);return`${o} { display: none !important; }
${r} { display: none !important; }
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
html[${Y}][${Ko}]:not([${xo}]) #divTabelaProcesso::before,
html[${Y}][${Ko}]:not([${xo}]) #frmProcedimentoControlar:not(:has(#divTabelaProcesso))::before { --spro-sk: #2c333b; --spro-sk-2: #232a31; }
@keyframes spro-grade-pulso { 0%, 100% { opacity: 1; } 50% { opacity: 0.55; } }
@media (prefers-reduced-motion: reduce) {
  html[${Y}]:not([${xo}]) #divTabelaProcesso::before,
  html[${Y}]:not([${xo}]) #frmProcedimentoControlar:not(:has(#divTabelaProcesso))::before { animation: none; }
}`}function Zt(o){try{return o.getItem(sr)==="1"}catch{return!1}}function Yt(o,e){try{e?o.setItem(sr,"1"):o.removeItem(sr)}catch{}}function ge(o,e){let r=o.documentElement;if(r.setAttribute(Y,"1"),r.removeAttribute(xo),e?r.setAttribute(Ko,"1"):r.removeAttribute(Ko),!o.getElementById(ir)){let t=o.createElement("style");t.id=ir,t.textContent=fs(),(o.head??r).append(t)}}function he(o){let e=o.documentElement;e.removeAttribute(Y),e.removeAttribute(xo),e.removeAttribute(Ko),o.getElementById(ir)?.remove()}var Co=o=>o.documentElement.hasAttribute(Y);function cr(o){o.documentElement.setAttribute(xo,"1")}function lr(o,e={setTimeout:(r,t)=>setTimeout(r,t),clearTimeout:r=>clearTimeout(r)}){let r=!1,t,a=s=>{r||(r=!0,e.clearTimeout(n),e.clearTimeout(t),o(s))},n=e.setTimeout(()=>a("teto"),1e4);return{iniciarContagem(){r||(t=e.setTimeout(()=>a("prazo"),1500))},pronta(){r=!0,e.clearTimeout(n),e.clearTimeout(t)},falhou:s=>a(s),encerrada:()=>r}}var oa="http://www.w3.org/2000/svg",gs={grade:[["rect",{x:"3.5",y:"4.5",width:"17",height:"15",rx:"2"}],["path",{d:"M3.5 9.5h17M9 9.5v10M3.5 14.5h17"}]],quadro:[["rect",{x:"3.5",y:"4.5",width:"4.6",height:"15",rx:"1.2"}],["rect",{x:"9.7",y:"4.5",width:"4.6",height:"9",rx:"1.2"}],["rect",{x:"15.9",y:"4.5",width:"4.6",height:"12",rx:"1.2"}]],lista:[["path",{d:"M8 6.5h12M8 12h12M8 17.5h12M4 6.5h.01M4 12h.01M4 17.5h.01"}]],agrupar:[["path",{d:"M4 6h16M4 12h10M4 18h13"}],["path",{d:"M18 10l3 2-3 2"}]],colunas:[["rect",{x:"3.5",y:"4.5",width:"17",height:"15",rx:"2"}],["path",{d:"M9.2 4.5v15M14.8 4.5v15"}]],disquete:[["path",{d:"M5 4.5h11l3.5 3.5v11a1.5 1.5 0 0 1-1.5 1.5H6.5A1.5 1.5 0 0 1 5 19z"}],["path",{d:"M8 4.5v5h7v-5M8 20v-6h8v6"}]],densidade:[["path",{d:"M4 6h16M4 10h16M4 14h16M4 18h16"}]],semPessoa:[["circle",{cx:"12",cy:"8.5",r:"3.6"}],["path",{d:"M5 20c.8-3.6 3.5-5.5 7-5.5s6.2 1.9 7 5.5M4 4l16 16"}]],olhoFechado:[["path",{d:"M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z"}],["circle",{cx:"12",cy:"12",r:"2.8"}],["path",{d:"M4 4l16 16"}]],recebido:[["path",{d:"M4 13.5l2.2-7A1.6 1.6 0 0 1 7.7 5.4h8.6a1.6 1.6 0 0 1 1.5 1.1l2.2 7"}],["path",{d:"M4 13.5V18a1.6 1.6 0 0 0 1.6 1.6h12.8A1.6 1.6 0 0 0 20 18v-4.5h-4.6a3.4 3.4 0 0 1-6.8 0z"}]],gerado:[["path",{d:"M14 3.5H7.5A1.5 1.5 0 0 0 6 5v14a1.5 1.5 0 0 0 1.5 1.5h9A1.5 1.5 0 0 0 18 19V7.5z"}],["path",{d:"M14 3.5V7.5h4M9.5 14.5h5M9.5 17h3"}],["path",{d:"M9.5 11.5l2-2 2 2M11.5 9.5v3.5"}]],novaGuia:[["path",{d:"M14 4.5h5.5V10M19.5 4.5L11 13"}],["path",{d:"M17.5 14v4a1.5 1.5 0 0 1-1.5 1.5H6A1.5 1.5 0 0 1 4.5 18V8A1.5 1.5 0 0 1 6 6.5h4"}]],prioridade:[["circle",{cx:"12",cy:"12",r:"8.5"}],["path",{d:"M12 7.5v5.5M12 16.4h.01"}]],seta:[["path",{d:"M6 9l6 6 6-6"}]],setaDireita:[["path",{d:"M9 6l6 6-6 6"}]],desfazer:[["path",{d:"M9 14L4 9l5-5M4 9h10a6 6 0 0 1 0 12h-3"}]],bloquear:[["circle",{cx:"12",cy:"12",r:"8.5"}],["path",{d:"M6 6l12 12"}]],informacao:[["circle",{cx:"12",cy:"12",r:"8.5"}],["path",{d:"M12 11v5M12 8h.01"}]]};function oo(o,e=16,r=document){let t=r.createElementNS(oa,"svg"),a={viewBox:"0 0 24 24",width:String(e),height:String(e),fill:"none",stroke:"currentColor","stroke-width":"1.8","stroke-linecap":"round","stroke-linejoin":"round","aria-hidden":"true",focusable:"false",class:"spro-icone"};for(let[n,s]of Object.entries(a))t.setAttribute(n,s);for(let[n,s]of gs[o]){let i=r.createElementNS(oa,n);for(let[c,l]of Object.entries(s))i.setAttribute(c,l);t.append(i)}return t}var be="spro-grade-botao",hs="#processosSEIPro .titlePanelHome, #processosSEIPro #divInfraBarraLocalizacao, #divInfraBarraLocalizacao.titlePanelHome, #divInfraBarraLocalizacao",bs="Usar a vis\xE3o nova do controle de processos",vs="Voltar \xE0 vis\xE3o nativa do SEI";function xs(o,e,r){let t=o.querySelector(hs);if(!t)return!1;let a=e?vs:bs,n=t.querySelector(`.${be}`);n||(n=o.createElement("button"),n.type="button",n.className=be,n.append(oo("grade",18,o)),t.append(n));let s=[...t.children].filter(i=>i.classList.contains("spro-pnl-botao")).at(-1);return s&&s.compareDocumentPosition(n)&2&&s.after(n),n.setAttribute("data-tip",a),n.removeAttribute("title"),n.setAttribute("aria-label",a),n.setAttribute("aria-pressed",String(e)),!0}function ra(o,e){let r=t=>{(t.composedPath?.()[0]??t.target)?.closest?.(`.${be}`)&&(t.preventDefault(),t.stopPropagation(),e())};return o.addEventListener("click",r,!0),()=>o.removeEventListener("click",r,!0)}var ea=o=>{for(let e of o.querySelectorAll(`.${be}`))e.remove()};function ve(o,e,r){let t=()=>xs(o,e(),r);t();let a=o.defaultView?.MutationObserver;if(!a||!o.body)return()=>ea(o);let n=!1,s=new a(()=>{n||(n=!0,queueMicrotask(()=>{n=!1,s.disconnect(),t(),s.observe(o.body,{childList:!0,subtree:!0})}))});return s.observe(o.body,{childList:!0,subtree:!0}),()=>{s.disconnect(),ea(o)}}function B(o){return o.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/\s+/g," ").trim()}var ys=/<div(?: style="text-decoration: line-through;")?><i class="(far fa-square|fas fa-check-square)"><\/i> ?([\s\S]*?)<\/div>/g;function As(o){return o.includes("<div")?o.replace(ys,(e,r,t)=>`
${r==="far fa-square"?"[ ]":"[X]"} ${t}
`).replace(/\n{2,}/g,`
`).trim():o}var Es=/^Anota[\u00e7c][\u00e3a]o( com prioridade)?\s+\/\s+([\s\S]*)\s+\/\s+(.*)$/i;function ta(o){let e=o.querySelector('a[href*="acao=anotacao_registrar"]');if(!e)return null;let r=e.querySelector("img")?.getAttribute("src")??"",t=/anotacao2\.|prioridade/i.test(r),a=Es.exec(e.getAttribute("aria-label")??"");if(a){let i=G(a[2]).replace(/\r\n?/g,`
`).trim();return i?{texto:i,autor:a[3].trim(),prioridade:!!a[1]||t}:null}let n=ho(e.getAttribute("onmouseover")??"","infraTooltipMostrar")[0];if(typeof n?.[0]!="string")return null;let s=As(N(n[0])).trim();return s?{texto:s,autor:N(n[1]).trim(),prioridade:t}:null}function aa(o,e,r){if(e){let a={idProcedimento:o,origem:"nativo",vencimento:e.data,idControlePrazo:e.idControlePrazo,sigla:e.sigla,linkNativo:e.link,...e.concluidoEm?{concluidoEm:e.concluidoEm}:{}};return r?.vencimento&&r.data===e.data?{...a,origem:"ambos",hora:r.hora,texto:r.texto||void 0}:a}if(!r)return null;let t={idProcedimento:o,origem:"marcador",hora:r.hora,texto:r.texto||void 0};return r.vencimento?{...t,vencimento:r.data}:{...t,inicio:r.data}}var ws='a[href*="acao=controle_prazo_definir"]',Ss=/^Controle de Prazo\s*\/\s*(\S+)\s+(\d{2})\/(\d{2})\/(\d{4})\s*\(([^)]*)\)\s*$/s,na=(o,e,r)=>`${r}-${e}-${o}`;function Ps(o){let e=o.trim().toLowerCase(),r=/^conclu[i\u00ED]do em (\d{2})\/(\d{2})\/(\d{4})$/.exec(e);return r?{estado:"concluido",concluidoEm:na(r[1],r[2],r[3])}:/^at[e\u00E9] hoje$/.test(e)?{estado:"hoje"}:/^atrasado \d+ dias?$/.test(e)?{estado:"atrasado"}:/^\d+ dias?$/.test(e)?{estado:"noPrazo"}:null}function pr(o){let e=o.querySelector(ws);if(!e)return null;let r=e.getAttribute("aria-label")??"";if(!r){let l=ho(e.getAttribute("onmouseover")??"","infraTooltipMostrar")[0];typeof l?.[0]=="string"&&(r=`Controle de Prazo / ${N(l[0])}`)}let t=Ss.exec(G(r).replace(/\s+/g," ").trim());if(!t)return null;let a=Ps(t[5]);if(!a)return null;let n=G(e.getAttribute("href")??""),s=X(n),i=s.get("id_controle_prazo")??"",c=s.get("id_procedimento")??o.id.replace(/^P/,"");return!i||!c?null:{idControlePrazo:i,idProcedimento:c,sigla:t[1],data:na(t[2],t[3],t[4]),link:n,...a}}var sa=/(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(\d{4})/,ia=/\b([01]?\d|2[0-3]):([0-5]\d)\b/,ca=new RegExp("(?<!\\p{L})at[e\\u00E9](?!\\p{L})","iu");function Ms(o,e,r){let t=`${r}-${e}-${o}`;try{return No(le(t))===t?t:null}catch{return null}}var ks=o=>o.padStart(2,"0");function dr(o){let e=o.replace(/\r\n?/g,`
`),r=sa.exec(e);if(!r)return null;let t=Ms(r[1],r[2],r[3]);if(!t)return null;let a=ia.exec(e),n=a?`${ks(a[1])}:${a[2]}`:void 0,s=ca.test(e),i=e.replace(ca,"").replace(sa,"");return a&&(i=i.replace(ia,"")),i=i.replace(/[ \t]+/g," ").replace(/^[ \t]*\n+|\n+[ \t]*$/g,"").trim(),{data:t,hora:n,vencimento:s,texto:i}}function la(o){let e=[];for(let r of o.querySelectorAll('a[href*="acao=andamento_marcador_gerenciar"]')){let t=ho(r.getAttribute("onmouseover")??"","infraTooltipMostrar")[0];typeof t?.[0]=="string"&&e.push({texto:N(t[0]),nome:N(t[1])})}return e}function pa(o,e){let r=o.querySelector("input[type=checkbox]"),t=o.querySelector("a[href*='procedimento_trabalhar']");if(!r||!t)return null;let a=r.getAttribute("aria-label")??"",n=/^Sigiloso\b/.test(a)||/Sigiloso/.test(t.getAttribute("class")??""),s=[...o.querySelectorAll("td")],i=n?[]:[...s[1]?.querySelectorAll("a[aria-label]")??[]].map(c=>c.getAttribute("aria-label")??"");return{idProcedimento:r.getAttribute("value")??X(t.getAttribute("href")??"").get("id_procedimento")??"",protocolo:r.getAttribute("title")??V(t),grupo:e,tipo:/Tipo (.*?)(?: \/ Especifica|$)/.exec(a)?.[1]?.trim()??"",especificacao:n?"":/Especifica\S* (.*)$/.exec(a)?.[1]?.trim()??"",sigiloso:n,novo:/NaoVisualizado/.test(t.getAttribute("class")??""),atribuido:V(s[s.length-1]).replace(/^\(|\)$/g,""),sinais:i,documentoNovo:!!s[1]?.querySelector("img[src*='exclamacao']")||i.some(c=>/documento foi inclu/i.test(c))}}var Ls=/marcador_([a-z0-9_]+)\.svg/i;function Cs(o){let e=[];for(let r of o.querySelectorAll('a[href*="acao=andamento_marcador_gerenciar"]')){let t=ho(r.getAttribute("onmouseover")??"","infraTooltipMostrar")[0],a=/^Marcador\s*\/\s*(.*)$/s.exec(G(r.getAttribute("aria-label")??"").trim()),n=(typeof t?.[1]=="string"&&t[1]?N(t[1]):a?.[1]??"").trim();n&&e.push({nome:n,cor:Ls.exec(r.querySelector("img")?.getAttribute("src")??"")?.[1]??"",texto:typeof t?.[0]=="string"?N(t[0]).trim():""})}return e}function Os(o){let e=[];for(let r of o.querySelectorAll("a")){let t=r.querySelector("img")?.getAttribute("src")??"",a=/retorno_(programado|aguardando)(\d)?\.svg/.exec(t);if(!a)continue;let n=G(r.getAttribute("aria-label")??"").trim();e.push({tipo:a[1],descricao:n,atrasado:a[2]==="3"||/atrasad/i.test(n)})}return e}function Ds(o){let e=o.querySelector('a[href*="acao=procedimento_atribuicao_listar"], a.ancoraSigla'),r=e?.textContent?.trim();if(!e||!r)return;let t=G(e.getAttribute("title")??"").replace(/^Atribu[i\u00ED]do para\s+/i,"").trim();return{sigla:r,nome:t||r}}function ur(o,e){let r=pa(o,e.grupo);if(!r?.idProcedimento)return null;let t=Cs(o),a=null;for(let d of la(o)){let m=dr(d.texto);if(m){a=m;break}}let n={id:r.idProcedimento,protocolo:r.protocolo,grupo:e.grupo,tipo:r.tipo,especificacao:r.especificacao,sigiloso:r.sigiloso,naoVisualizado:r.novo,marcadores:r.sigiloso?[]:t,retornos:r.sigiloso?[]:Os(o),acompanhamentoEspecial:!r.sigiloso&&!!o.querySelector('a[href*="acao=acompanhamento"] , img[src*="acompanhamento_especial"], .acompanhamentoesp_icon'),documentoNovo:r.documentoNovo,pagina:e.pagina,naPaginaAtual:e.naPaginaAtual},s=o.querySelector('a[href*="acao=procedimento_trabalhar"]')?.getAttribute("onmouseover")??"";/\(URGENTE\)/.test(s)&&(n.urgente=!0),/\(TRANCADO\)/.test(s)&&(n.trancado=!0);let i=o.querySelector(".acompanhamentoesp_icon");if(i){let d=ho(i.getAttribute("onmouseover")??"","infraTooltipMostrar")[0];typeof d?.[1]=="string"&&d[1]&&(n.acompanhamentoGrupo=N(d[1]))}let c=o.querySelector('a[href*="acao=procedimento_trabalhar"]')?.getAttribute("href");c&&(n.link=G(c));let l=Ds(o);if(l&&(n.atribuicao=l),!r.sigiloso){let d=ta(o);d&&(n.anotacao=d);let m=aa(n.id,pr(o),a);m&&(n.prazo=m)}return n}var ua="#tblProcessosRecebidos, #tblProcessosGerados, #tblProcessosDetalhado",Is={recebidos:"tblProcessosRecebidos",gerados:"tblProcessosGerados"},$s=[[/^tipo( do processo)?$/,"tipo"],[/^especificacao$/,"especificacao"],[/^(atribuicao|atribuido( para)?|responsavel)$/,"atribuicao"],[/^marcador(es)?$/,"marcador"],[/^prioridade$/,"prioridade"],[/^interessados?$/,"interessados"],[/^observacao$/,"observacao"],[/^ultima mov/,"ultimaMov"]];function zs(o){let e=new Map;return[...(o.querySelector("thead tr")??[...o.querySelectorAll("tr")].find(t=>t.querySelector("th")))?.children??[]].forEach((t,a)=>{let n=B(t.textContent??""),s=$s.find(([i])=>i.test(n));s&&e.set(a,s[1])}),e}function da(o){let e=(o?.querySelector("caption")?.textContent??"").replace(/\s+/g," "),r=Number(/(\d+)\s+registro/.exec(e)?.[1]??0),t=/(\d+)\s+a\s+(\d+)\s*\)?/.exec(e);return{total:r,porPagina:t?Number(t[2])-Number(t[1])+1:0}}function Ts(o,e,r){if(!r.size)return;let t=[...e.children];for(let[a,n]of r){let s=(t[a]?.textContent??"").replace(/\s+/g," ").trim();if(s)if(n==="tipo"&&!o.tipo)o.tipo=s;else if(n==="especificacao"&&!o.especificacao&&!o.sigiloso)o.especificacao=s;else if(n==="atribuicao"&&!o.atribuicao){let i=s.replace(/^\(|\)$/g,"");o.atribuicao={sigla:i,nome:i}}else if(n==="marcador"&&!o.marcadores.length&&!o.sigiloso)o.marcadores=[{nome:s,cor:"",texto:""}];else{if(o.sigiloso&&(n==="interessados"||n==="observacao"))continue;if(n==="prioridade")o.prioridade=s;else if(n==="interessados")o.interessados=s;else if(n==="observacao")o.observacao=s;else if(n==="ultimaMov"){let i=/(\d{2})\/(\d{2})\/(\d{4})/.exec(s);i&&(o.ultimaMov=`${i[3]}-${i[2]}-${i[1]}`)}}}}function Ns(o){let e=o.querySelector("input[type=checkbox]")?.getAttribute("name")??"";return/^chkGerados/i.test(e)?"gerados":"recebidos"}function Ro(o,e={}){let r=e.pagina??0,t=e.naPaginaAtual??!0,a=[],n={recebidos:0,gerados:0},s={recebidos:0,gerados:0},i=o.getElementById("tblProcessosDetalhado"),c=new Set,l=d=>{d&&!c.has(d.id)&&(c.add(d.id),a.push(d))};for(let d of["recebidos","gerados"]){let m=o.getElementById(Is[d]),{total:f,porPagina:y}=da(m);n[d]=f,s[d]=y;for(let A of m?.querySelectorAll('tr[id^="P"]')??[])l(ur(A,{grupo:d,pagina:r,naPaginaAtual:t}))}if(i){let d=zs(i),{total:m,porPagina:f}=da(i);for(let y of i.querySelectorAll("tr")){if(!y.querySelector('a[href*="procedimento_trabalhar"]'))continue;let A=Ns(y),M=ur(y,{grupo:A,pagina:r,naPaginaAtual:t});M&&!c.has(M.id)&&(Ts(M,y,d),l(M),n[A]=Math.max(n[A],m),s[A]=Math.max(s[A],f))}}return{processos:a,totais:n,porPagina:s,visao:i?"detalhada":"resumida"}}var Rs=60;async function ma(o,e,r={}){let t=r.maxPaginas??Rs,a=[],n=new Set(o.processos.map(l=>l.id)),s=!0,i,c=!1;try{for(let l of["recebidos","gerados"]){let d=o.totais[l],m=o.processos.filter(A=>A.grupo===l).length,f=o.porPagina[l]||m||1,y=Math.max(1,Math.ceil(d/f));for(let A=1;m<d;A+=1){if(r.sinal?.aborted)return s=!1,{processos:a,completo:s,...i?{erro:i}:{}};if(A>=t){s=!1;break}c=!0;let M=await e.pagina(l,A,r.sinal),v=Ro(M,{pagina:A,naPaginaAtual:!1}).processos.filter(S=>S.grupo===l&&!n.has(S.id));if(!v.length)break;for(let S of v)n.add(S.id);m+=v.length,a.push(...v),r.aoPagina?.(v),r.aoProgresso?.({grupo:l,paginasLidas:A+1,paginasTotal:y,processos:m,total:d})}m<d&&(s=!1)}}catch(l){s=!1,i=l instanceof Error?l.message:String(l)}finally{if(c)try{await e.restaurar()}catch(l){i??=`N\xE3o foi poss\xEDvel voltar \xE0 primeira p\xE1gina: ${l instanceof Error?l.message:String(l)}`}}return{processos:a,completo:s,...i?{erro:i}:{}}}var _s=["hdnRecebidosItensSelecionados","hdnGeradosItensSelecionados","hdnRecebidosItemId","hdnGeradosItemId"];function mr(o,e){let r="#frmProcedimentoControlar",t=()=>({hdnRecebidosPaginaAtual:"0",hdnGeradosPaginaAtual:"0",...Object.fromEntries(_s.map(a=>[a,""]))});return{async pagina(a,n,s){let i=a==="recebidos"?"hdnRecebidosPaginaAtual":"hdnGeradosPaginaAtual";return(await F.de(e,r,o).definir({...t(),[i]:String(n)}).enviar({sinal:s,aceitarValidacao:!0})).doc},async restaurar(a){await F.de(e,r,o).definir(t()).enviar({sinal:a,aceitarValidacao:!0})},restaurarAoSair(){try{let a=F.de(e,r,o);fetch(o.absoluta(a.action),{method:"POST",keepalive:!0,credentials:"include",headers:{"content-type":"application/x-www-form-urlencoded"},body:new URLSearchParams(a.definir(t()).pares()).toString()}).catch(()=>{})}catch{}}}}var qs=30*6e4,fa=5e3,fr=()=>({vistoEm:{}});function ha(o){if(!o||typeof o!="object")return fr();let e=o,r={};if(e.vistoEm&&typeof e.vistoEm=="object")for(let[i,c]of Object.entries(e.vistoEm))typeof c=="number"&&Number.isFinite(c)&&c>0&&(r[i]=c);let t=i=>typeof i=="number"&&Number.isFinite(i)?i:void 0,a={vistoEm:r},n=t(e.visitaAtual),s=t(e.visitaAnterior);return n!==void 0&&(a.visitaAtual=n),s!==void 0&&(a.visitaAnterior=s),a}function ba(o,e){return o.visitaAtual===void 0?{...o,visitaAtual:e}:e-o.visitaAtual>qs?{...o,visitaAnterior:o.visitaAtual,visitaAtual:e}:o}function gr(o,e,r,t){let a={...o.vistoEm};for(let s of e)a[s]===void 0&&(a[s]=r);if(t){let s=new Set(e);for(let i of Object.keys(a))s.has(i)||delete a[i]}let n=Object.keys(a);if(n.length>fa)for(let s of n.sort((i,c)=>a[c]-a[i]).slice(fa))delete a[s];return{...o,vistoEm:a}}function va(o,e){return o.map(r=>e.vistoEm[r.id]!==void 0?{...r,vistoEm:e.vistoEm[r.id]}:r)}function _o(o){if(o===null)return"";if(o<1)return"hoje";if(o===1)return"1 dia";if(o<60)return`${o} dias`;let e=Math.floor(o/30);return e<24?`${e} meses`:`${Math.floor(o/365)} anos`}var xa="Contado desde a primeira vez que o SEI Pro viu o processo nesta unidade (o SEI n\xE3o informa a data de chegada).";var qo=["processo","especificacao","tipo","responsavel","marcadores","prazo","anotacao","caixa","parado","sinais"],Oo={processo:"Processo",tipo:"Tipo",especificacao:"Especifica\xE7\xE3o",responsavel:"Respons\xE1vel",marcadores:"Marcadores",prazo:"Prazo",anotacao:"Anota\xE7\xE3o",caixa:"Na caixa",parado:"Parado h\xE1",sinais:"Sinais"};var Vs=30,Hs=40,Fs=()=>({colunas:"marcador",limite:0,raiasPorResponsavel:!1}),js=["processo","especificacao","tipo","responsavel","marcadores","prazo","anotacao"],hr=2;function Vo(){return{id:"",nome:"Padr\xE3o",busca:"",ordem:[],agrupar:"nenhum",modo:"tabela",colv:hr,colunas:[...js],densidade:"confortavel",quadro:Fs()}}var Gs=["nenhum","responsavel","tipo","marcador","prazo","situacao","grupo","anotacao","acompanhamento","retorno","caixa"],Us=["protocolo","tipo","responsavel","marcador","prazo","caixa","parado","novo"],Bs=["marcador","responsavel","prazo","tipo"];function xe(o){let e=Vo();if(!o||typeof o!="object")return e;let r=o,t=Array.isArray(r.ordem)?r.ordem.filter(s=>!!s&&typeof s=="object"&&Us.includes(s.campo)).slice(0,4).map(s=>({campo:s.campo,decrescente:s.decrescente===!0})):[],a=Array.isArray(r.colunas)?[...new Set(r.colunas.filter(s=>qo.includes(s)))]:[];if(a.includes("processo")&&r.colv!==hr&&!a.includes("especificacao")){let s=a.indexOf("processo");a=[...a.slice(0,s+1),"especificacao",...a.slice(s+1)]}let n=r.quadro&&typeof r.quadro=="object"?r.quadro:{};return{id:typeof r.id=="string"?r.id:"",colv:hr,nome:typeof r.nome=="string"&&r.nome.trim()?r.nome.trim().slice(0,Hs):e.nome,busca:typeof r.busca=="string"?r.busca.slice(0,500):"",ordem:t,agrupar:Gs.includes(r.agrupar)?r.agrupar:"nenhum",modo:r.modo==="quadro"?"quadro":"tabela",colunas:a.length?a:e.colunas,densidade:r.densidade==="compacta"?"compacta":"confortavel",quadro:{colunas:Bs.includes(n.colunas)?n.colunas:"marcador",limite:typeof n.limite=="number"&&n.limite>0?Math.min(99,Math.floor(n.limite)):0,raiasPorResponsavel:n.raiasPorResponsavel===!0}}}function ya(o,e,r){let t=xe(e),a=t.id?o.findIndex(s=>s.id===t.id):-1;if(a>=0){let s=[...o];return s[a]=t,{lista:s,visao:t}}if(o.length>=Vs)return null;let n={...t,id:r()};return{lista:[...o,n],visao:n}}var Aa=(o,e)=>o.filter(r=>r.id!==e);function Ea(o,e){let r=t=>JSON.stringify({...t,id:"",nome:""});return r(o)!==r(e)}var ye="spro_grade_v_ids",Ae=o=>`spro_grade_v:${o}`,Qs=o=>`spro_grade:${o||"x"}`;function Xs(){return{visao:Vo(),idade:fr(),recolhidos:[]}}function Ks(o){if(!o||typeof o!="object")return Xs();let e=o;return{visao:xe(e.visao),idade:ha(e.idade),recolhidos:Array.isArray(e.recolhidos)?e.recolhidos.filter(r=>typeof r=="string").slice(0,200):[]}}function wa(o,e){let{local:r,sync:t}=o,a=Qs(e);async function n(){return Ks((await r.obter(a))[a])}async function s(l){let d=await n();await r.gravar({[a]:{...d,...l}})}async function i(){let l=(await t.obter(ye))[ye],d=Array.isArray(l)?l.filter(f=>typeof f=="string"):[];if(!d.length)return[];let m=await t.obter(d.map(Ae));return d.flatMap(f=>{let y=m[Ae(f)];return y?[{...xe(y),id:f}]:[]})}async function c(l,d=[]){let m=new Set(l.map(A=>A.id)),f={[ye]:l.map(A=>A.id)};for(let A of l)f[Ae(A.id)]=A;await t.gravar(f);let y=d.filter(A=>!m.has(A.id)).map(A=>Ae(A.id));y.length&&await t.remover(y)}return{lerEstado:n,gravarVisao:l=>s({visao:l}),gravarIdade:l=>s({idade:l}),gravarRecolhidos:l=>s({recolhidos:l}),lerVisoes:i,gravarVisoes:c,aoMudarVisoes:l=>t.aoMudar(d=>ye in d||Object.keys(d).some(m=>m.startsWith("spro_grade_v:"))?l():void 0)}}function Sa(o){let e=r=>{let t=/^[=+\-@\t\r]/.test(r)?`'${r}`:r;return/[;"\n\r]/.test(t)?`"${t.replace(/"/g,'""')}"`:t};return`\uFEFF${o.map(r=>r.map(e).join(";")).join(`\r
`)}`}var Pa=new Set;var Js=null;function Ws(o){let e=o.closest?.("dialog[open]");if(e)return e;let r=o.getRootNode?.(),t=o.ownerDocument;return r&&r!==t&&r.host?r:t.body??t.documentElement}function Ma(o,e){let r=o;try{r?.CustomEvent&&r.dispatchEvent(new r.CustomEvent("spro-popover",{detail:{fundo:e}}))}catch{}}function ka(o,e,r){let t=o.ownerDocument,a=t.defaultView;Ws(o).append(e);let n=!0,s=()=>{if(!n)return;let f=o.getBoundingClientRect?.();if(!f)return;let y=a?.innerHeight??0,A=a?.innerWidth??0,M=Math.min(r.largura??Math.max(f.width,r.larguraMinima??0),Math.max(180,A-16)),P=r.alinharDireita?f.right-M:f.left,v=Math.max(8,Math.min(P,A-M-8)),S=r.alturaMaxima??360;e.style.maxHeight="none";let E=Math.min(e.scrollHeight||S,S),w=y-f.bottom-8,C=f.top-8,z=Js?.()??!1,T=!z&&w<Math.min(E,200)&&C>w;e.style.left=`${v}px`,e.style.width=`${M}px`,e.style.maxHeight=`${z?S:Math.max(140,Math.min(S,T?C:w>140?w:S))}px`,e.classList.toggle("spro-flutuante-cima",T),T?(e.style.top="",e.style.bottom=`${y-f.top+4}px`):(e.style.bottom="",e.style.top=`${f.bottom+4}px`),Ma(a,T?0:Math.ceil(f.bottom+4+E+12))},i=f=>{let y=f.composedPath?.()??[],A=f.target,M=P=>y.includes(P)||!!A&&!!P.contains?.(A);M(e)||M(o)||r.aoFechar()},c=()=>{o.isConnected?s():r.aoFechar()},l=f=>{f.target instanceof Node&&e.contains(f.target)||c()},d=()=>r.aoFechar();t.addEventListener("pointerdown",i,!0),a?.addEventListener("scroll",l,!0),a?.addEventListener("resize",c),a?.addEventListener("blur",d);let m={ancora:o,fechar:()=>r.aoFechar()};return Pa.add(m),s(),{posicionar:s,fechar(){n&&(n=!1,Pa.delete(m),t.removeEventListener("pointerdown",i,!0),a?.removeEventListener("scroll",l,!0),a?.removeEventListener("resize",c),a?.removeEventListener("blur",d),e.remove(),Ma(a,0))}}}function La(o,e){let r=B(e);if(!r)return[...o];let t=r.split(" "),a=[];return o.forEach((n,s)=>{let i=B(n.rotulo),c=`${i} ${B(n.descricao??"")}`;if(!t.every(d=>c.includes(d)))return;let l=i.startsWith(r)?0:i.split(" ").some(d=>d.startsWith(t[0]))?1:2;a.push({o:n,nota:l,i:s})}),a.sort((n,s)=>n.nota-s.nota||n.i-s.i).map(n=>n.o)}function Zs(o,e){let r=o.normalize("NFC"),t=B(e).split(" ").filter(Boolean);if(!t.length)return[{texto:r,marcado:!1}];let a=[...r],n="",s=[];a.forEach((l,d)=>{let m=l.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase();for(let f of m)n+=f,s.push(d)});let i=new Array(a.length).fill(!1);for(let l of t){let d=n.indexOf(l);if(!(d<0))for(let m=d;m<d+l.length;m++)i[s[m]]=!0}let c=[];return a.forEach((l,d)=>{let m=c[c.length-1];m&&m.marcado===i[d]?m.texto+=l:c.push({texto:l,marcado:i[d]})}),c}var Ys=0;function Eo(o){let e=`spro-combo-${++Ys}`,r=()=>typeof o.opcoes=="function"?o.opcoes():o.opcoes,t=new Map,a=h=>r().find(L=>L.valor===h)??t.get(h),n=[...o.valor??[]],s=null,i="",c=0,l=[],d=null,m=p("button",{type:"button",class:`spro-combo${o.classe?` ${o.classe}`:""}`,role:"combobox","aria-haspopup":"listbox","aria-expanded":"false","aria-label":o.rotulo,title:o.rotulo}),f=()=>o.aoMudar?.([...n]);function y(){let h=[];o.icone&&h.push(_(o.icone,15));let L=n.map(q=>a(q)).filter(q=>!!q),D=p("span",{class:"spro-combo-texto"});if(!L.length)D.classList.add("spro-combo-vazio"),D.append(o.vazio??"Escolher\u2026");else{let q=L[0];q.cor&&D.append(p("span",{class:"spro-combo-cor",style:`background:${q.cor}`})),D.append(p("span",{class:"spro-combo-rotulo"},q.rotulo)),L.length>1&&D.append(p("span",{class:"spro-combo-mais"},`+${L.length-1}`))}h.push(D,_("chevron",14)),m.classList.toggle("spro-combo-ativo",o.multiplo===!0&&L.length>0),m.replaceChildren(...h)}let A=()=>o.busca??(r().length>7||!!o.multiplo||!!o.criar);function M(h){if(o.multiplo){n=n.includes(h.valor)?n.filter(D=>D!==h.valor):[...n,h.valor],f(),y(),E();return}let L=n.length!==1||n[0]!==h.valor;n=[h.valor],y(),T(!0),L&&f()}async function P(){if(!o.criar)return;let h=i.trim();if(!h)return;let L=await o.criar(h);if(L){if(t.set(L.valor,L),i="",s){let D=s.querySelector(".spro-combo-busca");D&&(D.value="")}o.multiplo&&n.includes(L.valor)?E():M(L)}}function v(h,L){let D=n.includes(h.valor),q=p("span",{class:"spro-combo-op-rotulo"});for(let $ of Zs(h.rotulo,i))q.append($.marcado?p("mark",{},$.texto):$.texto);let W=p("li",{role:"option",id:`${e}-op-${L}`,class:`spro-combo-op${L===c?" spro-combo-op-ativa":""}`,"data-valor":h.valor,"aria-selected":D?"true":"false"},o.multiplo?p("span",{class:"spro-combo-caixa","aria-hidden":"true"},D?_("check",12):null):null,h.cor?p("span",{class:"spro-combo-cor",style:`background:${h.cor}`}):null,h.icone?_(h.icone,15):null,p("span",{class:"spro-combo-op-textos"},q,h.descricao?p("span",{class:"spro-combo-op-desc"},h.descricao):null),h.contagem!==void 0?p("span",{class:"spro-combo-conta"},String(h.contagem)):null,!o.multiplo&&D?p("span",{class:"spro-combo-marca"},_("check",14)):null);return W.addEventListener("pointerdown",$=>$.preventDefault()),W.addEventListener("click",()=>{c=L,M(h)}),W.addEventListener("pointermove",()=>{c!==L&&(c=L,S())}),W}function S(){if(!s)return;let h=[...s.querySelectorAll('[role="option"]')];h.forEach((W,$)=>{W.classList.toggle("spro-combo-op-ativa",$===c)});let L=h[c],q=s.querySelector(".spro-combo-busca")??s.querySelector('[role="listbox"]');L?(q?.setAttribute("aria-activedescendant",L.id),L.scrollIntoView?.({block:"nearest"})):q?.removeAttribute("aria-activedescendant")}function E(){if(!s)return;l=La(r(),i),c>=l.length&&(c=Math.max(0,l.length-1)),s.querySelector('[role="listbox"]').replaceChildren(...l.map(v));let L=s.querySelector(".spro-combo-extras");L.replaceChildren();let D=i.trim();l.length||L.append(p("p",{class:"spro-combo-nada"},D?"Nada encontrado.":"Nenhuma op\xE7\xE3o."));let q=r().some($=>B($.rotulo)===B(D));if(o.criar&&D&&!q){let $=p("button",{type:"button",class:"spro-combo-criar"},_("mais",14),p("span",{},o.rotuloCriar?o.rotuloCriar(D):`Criar \u201C${D}\u201D`));$.addEventListener("pointerdown",H=>H.preventDefault()),$.addEventListener("click",()=>void P()),L.append($)}let W=s.querySelector(".spro-combo-rodape");if(W){let $=l.filter(lo=>!n.includes(lo.valor)),H=p("button",{type:"button",class:"spro-combo-acao",disabled:!D||!$.length},`Marcar os filtrados${D&&$.length?` (${$.length})`:""}`);H.addEventListener("click",()=>{n=[...n,...$.map(lo=>lo.valor)],f(),y(),E()});let $o=p("button",{type:"button",class:"spro-combo-acao spro-combo-limpar",disabled:!n.length},"Limpar");$o.addEventListener("click",()=>{n=[],f(),y(),E()}),W.replaceChildren(p("span",{class:"spro-combo-total"},n.length?`${n.length} marcado${n.length>1?"s":""}`:""),H,$o)}S()}let w=()=>d?.posicionar();function C(h){let L=l.length,D=h.target,q=s?[...s.querySelectorAll(".spro-combo-rodape button:not(:disabled)")]:[],W=!!D?.closest?.(".spro-combo-rodape, .spro-combo-criar");if(h.key==="Tab"){let H=q.indexOf(D);if(!h.shiftKey&&H<q.length-1)q[H+1]?.focus();else if(h.shiftKey&&H>=0)H>0?q[H-1]?.focus():(s?.querySelector(".spro-combo-busca")??s?.querySelector('[role="listbox"]'))?.focus();else{T(!0);return}h.preventDefault(),h.stopPropagation();return}if(W&&h.key!=="Escape")return;let $=!s?.querySelector(".spro-combo-busca");if($&&h.key===" "){let H=l[c];H&&M(H),h.preventDefault(),h.stopPropagation();return}if($&&h.key.length===1&&!h.ctrlKey&&!h.metaKey&&!h.altKey){let H=B(h.key),lo=[...l.keys()].map(yo=>(c+1+yo)%Math.max(1,L)).find(yo=>B(l[yo]?.rotulo??"").startsWith(H));lo!==void 0&&(c=lo,S()),h.preventDefault(),h.stopPropagation();return}switch(h.key){case"ArrowDown":c=L?(c+1)%L:0,S();break;case"ArrowUp":c=L?(c-1+L)%L:0,S();break;case"Home":if(h.target?.classList?.contains("spro-combo-busca")&&i)return;c=0,S();break;case"End":if(h.target?.classList?.contains("spro-combo-busca")&&i)return;c=Math.max(0,L-1),S();break;case"Enter":{let H=l[c];H?M(H):P();break}case"Escape":T(!0);break;case"Backspace":if(!o.multiplo||i||!n.length)return;n=n.slice(0,-1),f(),y(),E();break;default:return}h.preventDefault(),h.stopPropagation()}function z(h=""){if(s)return;i=h,c=h?0:(()=>{let W=La(r(),i).findIndex($=>$.valor===n[n.length-1]);return W<0?0:W})();let D=A()?p("input",{type:"text",class:"spro-combo-busca",placeholder:o.criar?"Buscar ou criar\u2026":"Buscar\u2026","aria-label":`Filtrar ${o.rotulo.toLowerCase()}`,"aria-controls":`${e}-lista`,"aria-autocomplete":"list",autocomplete:"off",spellcheck:"false",value:h}):null;if(D&&(D.value=h,D.addEventListener("input",()=>{i=D.value,c=0,E(),w()})),s=p("div",{class:`spro-combo-pop${o.multiplo?" spro-combo-pop-multi":""}`},D?p("div",{class:"spro-combo-cabeca"},_("busca",15),D):null,p("ul",{role:"listbox",id:`${e}-lista`,class:"spro-combo-lista",tabindex:D?void 0:"-1","aria-label":o.rotulo,"aria-multiselectable":o.multiplo?"true":void 0}),p("div",{class:"spro-combo-extras"}),o.multiplo?p("div",{class:"spro-combo-rodape"}):null),s.addEventListener("keydown",C),d=ka(m,s,{larguraMinima:o.larguraLista??220,alturaMaxima:360,aoFechar:()=>T(!1)}),m.setAttribute("aria-expanded","true"),m.setAttribute("aria-controls",`${e}-lista`),m.classList.add("spro-combo-aberto"),E(),w(),!s)return;(D??s.querySelector('[role="listbox"]'))?.focus?.({preventScroll:!0}),D&&h&&D.setSelectionRange?.(h.length,h.length)}function T(h=!1){s&&(d?.fechar(),d=null,s=null,i="",m.setAttribute("aria-expanded","false"),m.removeAttribute("aria-controls"),m.classList.remove("spro-combo-aberto"),h&&m.focus?.({preventScroll:!0}))}return m.addEventListener("click",()=>s?T(!0):z()),m.addEventListener("keydown",h=>{s||(h.key==="ArrowDown"||h.key==="ArrowUp"?(h.preventDefault(),z()):h.key.length===1&&h.key!==" "&&!h.ctrlKey&&!h.metaKey&&!h.altKey&&A()&&(h.preventDefault(),z(h.key)))}),y(),{el:m,valor:()=>[...n],definir(h,L=!1){n=[...h],y(),E(),L&&f()},atualizar(){y(),E()},abrir:z,fechar:()=>T(!1)}}var Ca="#tblProcessosRecebidos input[type=checkbox], #tblProcessosGerados input[type=checkbox], #tblProcessosDetalhado input[type=checkbox]",br=o=>o.getAttribute("value")??o.closest("tr")?.id.replace(/^P/,"")??"";function vr(o){let e=new Set;for(let r of o.querySelectorAll(Ca))r.checked&&br(r)&&e.add(br(r));return e}function Oa(o,e){let r=new Set(e);for(let t of o.querySelectorAll(Ca)){let a=br(t);a&&(r.delete(a),!t.disabled&&!!t.checked!==e.has(a)&&t.click())}return[...r]}function oi(o){let e=o.composedPath?.()??[];if(e.length)return e.some(r=>r.id==="spro-grade");for(let r=o.target;r;r=r.parentNode)if(r.id==="spro-grade")return!0;return!1}function Da(o,e){let r=!1,t=a=>{a&&oi(a)||r||(r=!0,queueMicrotask(()=>{r=!1,e(vr(o))}))};return o.addEventListener("click",t,!0),o.addEventListener("change",t,!0),()=>{o.removeEventListener("click",t,!0),o.removeEventListener("change",t,!0)}}function ei(o){return/acaoControleProcessos\(\s*['"][^'"]*['"]\s*,\s*true/.test(o.elemento.getAttribute("onclick")??"")}function Ia(o,e){return ei(o)&&e===0?{ok:!1,motivo:"Marque ao menos um processo."}:(o.elemento.click(),{ok:!0})}var ri=o=>o instanceof Error?o.message:String(o);function $a(o){if(o.tipo==="atribuicao")return{...o,para:o.de,de:o.para};let e={tipo:"marcador",id:o.id,protocolo:o.protocolo};return o.adicionar&&(e.remover=o.adicionar),o.remover&&(e.adicionar=o.remover,o.texto&&(e.texto=o.texto)),e}async function ti(o,e){try{if(o.tipo==="atribuicao")return await e.atribuir(o.protocolo,o.para),{ok:!0,desfazer:$a(o)};if(o.adicionar&&await e.marcador(o.protocolo,{marcador:o.adicionar,...o.texto?{texto:o.texto}:{}}),o.remover)try{await e.marcador(o.protocolo,{marcador:o.remover,remover:!0})}catch(r){throw o.adicionar&&await e.marcador(o.protocolo,{marcador:o.adicionar,remover:!0}).catch(()=>{}),r}return{ok:!0,desfazer:$a(o)}}catch(r){return{ok:!1,erro:ri(r)}}}function za(o){let e=Promise.resolve();return{mover(r){let t=e.then(()=>ti(r,o));return e=t.catch(()=>{}),t}}}var Ee=o=>`${o} ${Math.abs(o)===1?"dia":"dias"}`,Ta=Number.MAX_SAFE_INTEGER;function xr(o,e){let r=[e];return o.hora&&o.vencimento&&(r[0]=e.replace(/\.$/,"")+` \xE0s ${o.hora}.`),o.texto&&r.push(o.texto),o.sigla&&r.push(`Definido por ${o.sigla} no controle de prazo do SEI.`),r.join(`
`)}function Na(o,e){let r=o.vencimento;if(o.concluidoEm&&r)return{situacao:"concluido",texto:`conclu\xEDdo em ${io(o.concluidoEm).slice(0,5)}`,dica:xr(o,`Prazo de ${io(r)} conclu\xEDdo em ${io(o.concluidoEm)}.`),ordem:Ta,sorter:`${r} 23:59:59`};if(r){let s=Uo(e,r),i=`${r} ${o.hora??"23:59"}:00`,c=xr(o,`Vence em ${io(r)}.`);return s===0?{situacao:"hoje",texto:"vence hoje",dica:c,ordem:0,sorter:i}:s<0?{situacao:"atrasado",texto:`${Ee(-s)} de atraso`,dica:c,ordem:s,sorter:i}:{situacao:"noPrazo",texto:`vence em ${Ee(s)}`,dica:c,ordem:s,sorter:i}}let t=o.inicio??e,a=Uo(t,e);return{situacao:"desde",texto:a===0?"hoje":a>0?`h\xE1 ${Ee(a)}`:`em ${Ee(-a)}`,dica:xr(o,`Contando desde ${io(t)}.`),ordem:Ta-1,sorter:`${t} ${o.hora??"23:59"}:00`}}function so(o,e){return o.prazo?Na(o.prazo,e.hoje):null}function uo(o,e){return o.vistoEm===void 0?null:Math.max(0,Math.floor((e.agora-o.vistoEm)/864e5))}function wo(o,e){return o.ultimaMov?Math.max(0,Uo(o.ultimaMov,e.hoje)):null}function Ra(o,e){return e.visitaAnterior!==void 0&&o.vistoEm!==void 0&&o.vistoEm>e.visitaAnterior}function Jo(o,e){let r=so(o,e);return!r||r.situacao==="concluido"||r.situacao==="desde"?null:r.ordem}var ai={resp:"resp",responsavel:"resp",atribuido:"resp",atribuicao:"resp",tipo:"tipo",marcador:"marcador",marcadores:"marcador",marc:"marcador",espec:"espec",especificacao:"espec",anot:"anot",anotacao:"anot",nota:"anot",prazo:"prazo",caixa:"caixa",idade:"caixa",novo:"novo",sigilo:"sigilo",sigiloso:"sigilo",grupo:"grupo",retorno:"retorno",protocolo:"protocolo",proc:"protocolo",processo:"protocolo",parado:"parado",mov:"parado",prio:"prio",prioridade:"prio",interessado:"interessado",interessados:"interessado"};function Er(o){let e=[],r="",t=!1;for(let a of o)a==='"'?(t=!t,r+=a):/\s/.test(a)&&!t?(r&&e.push(r),r=""):r+=a;return r&&e.push(r),e}var ni=o=>o.replace(/^"|"$/g,"");function wr(o){let e=[],r=[];for(let t of Er(o)){let a=t,n=!1;a.startsWith("-")&&a.length>1&&(n=!0,a=a.slice(1));let s,i=/^([a-zA-Z\u00C0-\u017F]+):(.*)$/.exec(a);if(i){let m=ai[B(i[1])];m&&(s=m,a=i[2])}let c="=";s&&/^[<>]/.test(a)&&(c=a[0],a=a.slice(1));let l=B(ni(a));if(!l&&!s)continue;let d={...s?{campo:s}:{},valor:l,original:t,negado:n,comparador:c};e.push(d),r.push({texto:t,termo:d})}return{termos:e,tokens:r}}var si=o=>B([o.protocolo,o.protocolo.replace(/\D/g,""),o.tipo,o.especificacao,o.atribuicao?.sigla,o.atribuicao?.nome,...o.marcadores.flatMap(e=>[e.nome,e.texto]),o.anotacao?.texto,o.prazo?.texto,o.prioridade,o.interessados,o.observacao].filter(Boolean).join(" ")),mo=(o,e)=>B(o??"").includes(e),_a=/^(s|sim|1|true|yes)$/;function yr(o){let e=/^(\d+)\s*(d|dia|dias)?$/.exec(o);return e?Number(e[1]):null}function Ar(o,e,r){return o===null?!1:e==="<"?o<r:e===">"?o>r:o===r}function ii(o,e,r){let t=so(o,r),a=e.valor;if(a==="sem"||a==="nenhum"||a==="nao")return!o.prazo;if(a==="com"||a==="sim")return!!o.prazo;if(!t)return!1;if(a==="atrasado"||a==="atrasados"||a==="vencido")return t.situacao==="atrasado";if(a==="hoje")return t.situacao==="hoje";if(a==="concluido"||a==="concluidos")return t.situacao==="concluido";if(a==="semana"){let s=Jo(o,r);return s!==null&&s>=0&&s<=7}let n=yr(a);return n!==null?Ar(Jo(o,r),e.comparador==="="?"<":e.comparador,n):mo(o.prazo?.texto,a)}function ci(o,e,r){let t=e.valor;switch(e.campo){case"resp":return t==="sem"||t==="ninguem"?!o.atribuicao:t==="eu"?!!r.eu&&B(o.atribuicao?.sigla??"")===B(r.eu):mo(o.atribuicao?.sigla,t)||mo(o.atribuicao?.nome,t);case"tipo":return mo(o.tipo,t);case"marcador":return t==="sem"||t==="nenhum"?o.marcadores.length===0:t==="com"?o.marcadores.length>0:o.marcadores.some(a=>mo(a.nome,t)||mo(a.texto,t));case"espec":return mo(o.especificacao,t);case"anot":return t==="sem"||t==="nao"?!o.anotacao:t==="com"||t==="sim"?!!o.anotacao:t==="prioridade"||t==="prioritaria"?!!o.anotacao?.prioridade:mo(o.anotacao?.texto,t);case"prazo":return ii(o,e,r);case"caixa":{let a=yr(t);return a===null?!1:Ar(uo(o,r),e.comparador==="="?">":e.comparador,a)}case"novo":return t==="visita"?Ra(o,r):_a.test(t)?o.naoVisualizado:t==="nao"?!o.naoVisualizado:!1;case"sigilo":return _a.test(t)?o.sigiloso:!o.sigiloso;case"grupo":return t.startsWith("rec")?o.grupo==="recebidos":t.startsWith("ger")?o.grupo==="gerados":!1;case"retorno":return t==="sem"||t==="nao"?o.retornos.length===0:t==="atrasado"?o.retornos.some(a=>a.atrasado):t==="aguardando"?o.retornos.some(a=>a.tipo==="aguardando"):t==="programado"?o.retornos.some(a=>a.tipo==="programado"):o.retornos.length>0;case"parado":{let a=yr(t);return a===null?!1:Ar(wo(o,r),e.comparador==="="?">":e.comparador,a)}case"prio":return mo(o.prioridade,t);case"interessado":return mo(o.interessados,t);case"protocolo":return B(o.protocolo).includes(t)||o.protocolo.replace(/\D/g,"").includes(t.replace(/\D/g,"")||"\0");default:return!0}}function li(o,e,r){if(!o.termos.length)return!0;let t;for(let a of o.termos){let n;if(a.campo?n=ci(e,a,r):(t??=si(e),n=t.includes(a.valor)),a.negado?n:!n)return!1}return!0}var qa=(o,e,r)=>{let t=wr(e);return t.termos.length?o.filter(a=>li(t,a,r)):o};function we(o,e){return Er(o).filter(r=>r!==e).join(" ")}function Va(o,e,r){let t=/\s/.test(r)?`"${r}"`:r,a=`${e}:${t}`,n=Er(o);return n.includes(a)?o:[...n,a].join(" ")}var pi=new Intl.Collator("pt-BR",{sensitivity:"base",numeric:!0});function di(o,e=[]){return[...o.values()].sort((r,t)=>{let a=e.indexOf(r.chave),n=e.indexOf(t.chave);return a>=0||n>=0?(a<0?-1:a)-(n<0?-1:n):pi.compare(r.rotulo,t.rotulo)})}function Q(o,e,r,t){let a=o.get(e);return a||(a={chave:e,rotulo:r,itens:[],...t?{tom:t}:{}},o.set(e,a)),a}var Ho=[["atrasado","Atrasados","perigo"],["hoje","Vencem hoje","aviso"],["semana","Pr\xF3ximos 7 dias","aviso"],["mes","Pr\xF3ximos 30 dias","neutro"],["depois","Depois de 30 dias","neutro"],["desde","Contando desde uma data","neutro"],["concluido","Prazo conclu\xEDdo","neutro"],["sem","Sem prazo","neutro"]];function Wo(o,e){let r=so(o,e);if(!r)return"sem";if(r.situacao==="concluido")return"concluido";if(r.situacao==="desde")return"desde";if(r.situacao==="atrasado")return"atrasado";if(r.situacao==="hoje")return"hoje";let t=Jo(o,e)??0;return t<=7?"semana":t<=30?"mes":"depois"}var Ha=[["recente","Chegaram hoje"],["semana","Nos \xFAltimos 7 dias"],["mes","Nos \xFAltimos 30 dias"],["antigo","H\xE1 mais de 30 dias"],["desconhecido","Sem registro"]];function ui(o,e){let r=uo(o,e);return r===null?"desconhecido":r<1?"recente":r<=7?"semana":r<=30?"mes":"antigo"}function Do(o,e){return e.map(r=>o.get(r[0])).filter(r=>!!r)}function Se(o,e,r){if(e==="nenhum")return[{chave:"todos",rotulo:"Todos",itens:o}];let t=new Map;for(let a of o)switch(e){case"responsavel":a.atribuicao?Q(t,`u:${a.atribuicao.sigla}`,a.atribuicao.nome===a.atribuicao.sigla?a.atribuicao.sigla:`${a.atribuicao.nome} (${a.atribuicao.sigla})`).itens.push(a):Q(t,"sem","Sem respons\xE1vel").itens.push(a);break;case"tipo":Q(t,`t:${a.tipo||"-"}`,a.tipo||"Sem tipo").itens.push(a);break;case"marcador":if(a.marcadores.length)for(let n of a.marcadores)Q(t,`m:${n.nome}`,n.nome).itens.push(a);else Q(t,"sem","Sem marcador").itens.push(a);break;case"prazo":{let n=Wo(a,r),s=Ho.find(i=>i[0]===n);Q(t,n,s[1],s[2]).itens.push(a);break}case"situacao":a.naoVisualizado?Q(t,"novo","N\xE3o visualizados","aviso").itens.push(a):Q(t,"lido","Visualizados").itens.push(a);break;case"grupo":Q(t,a.grupo,a.grupo==="recebidos"?"Recebidos":"Gerados").itens.push(a);break;case"anotacao":a.anotacao?.prioridade?Q(t,"prio","Anota\xE7\xE3o com prioridade","aviso").itens.push(a):a.anotacao?Q(t,"com","Com anota\xE7\xE3o").itens.push(a):Q(t,"sem","Sem anota\xE7\xE3o").itens.push(a);break;case"acompanhamento":a.acompanhamentoEspecial?Q(t,"com","Em acompanhamento especial").itens.push(a):Q(t,"sem","Fora do acompanhamento especial").itens.push(a);break;case"retorno":a.retornos.some(n=>n.atrasado)?Q(t,"atrasado","Retorno atrasado","perigo").itens.push(a):a.retornos.some(n=>n.tipo==="aguardando")?Q(t,"aguardando","Aguardando retorno").itens.push(a):a.retornos.length?Q(t,"programado","Retorno programado").itens.push(a):Q(t,"sem","Sem retorno").itens.push(a);break;case"caixa":{let n=ui(a,r);Q(t,n,Ha.find(s=>s[0]===n)[1]).itens.push(a);break}}return e==="prazo"?Do(t,Ho):e==="caixa"?Do(t,Ha):e==="situacao"?Do(t,[["novo",""],["lido",""]]):e==="grupo"?Do(t,[["recebidos",""],["gerados",""]]):e==="anotacao"?Do(t,[["prio",""],["com",""],["sem",""]]):e==="acompanhamento"?Do(t,[["com",""],["sem",""]]):e==="retorno"?Do(t,[["atrasado",""],["aguardando",""],["programado",""],["sem",""]]):di(t,["sem"])}var Sr={nenhum:"Sem agrupamento",responsavel:"Respons\xE1vel",tipo:"Tipo de processo",marcador:"Marcador",prazo:"Prazo",situacao:"Visualiza\xE7\xE3o",grupo:"Recebidos e gerados",anotacao:"Anota\xE7\xE3o",acompanhamento:"Acompanhamento especial",retorno:"Retorno programado",caixa:"Tempo na caixa"};var mi=new Intl.Collator("pt-BR",{sensitivity:"base",numeric:!0});function Pe(o,e){let r=new Map;for(let t of o)for(let a of e(t)){let n=r.get(a.valor)??{valor:a.valor,rotulo:a.rotulo,n:0};n.n+=1,r.set(a.valor,n)}return[...r.values()].sort((t,a)=>a.n-t.n||mi.compare(t.rotulo,a.rotulo))}function Pr(o,e){let r=Pe(o,t=>{let a=Wo(t,e),n=Ho.find(i=>i[0]===a)[1],s=a==="atrasado"?"atrasado":a==="hoje"?"hoje":a==="semana"?"semana":a==="sem"?"sem":a==="concluido"?"concluido":"";return s?[{valor:s,rotulo:n}]:[]});return{responsaveis:Pe(o,t=>t.atribuicao?[{valor:t.atribuicao.sigla,rotulo:`${t.atribuicao.nome} (${t.atribuicao.sigla})`}]:[{valor:"sem",rotulo:"Sem respons\xE1vel"}]),tipos:Pe(o,t=>t.tipo?[{valor:t.tipo,rotulo:t.tipo}]:[]),marcadores:Pe(o,t=>t.marcadores.length?t.marcadores.map(a=>({valor:a.nome,rotulo:a.nome})):[{valor:"sem",rotulo:"Sem marcador"}]),prazos:r}}function Mr(o){let e=[];o.sigiloso&&e.push("Sigiloso"),o.naoVisualizado&&e.push("N\xE3o visualizado"),o.documentoNovo&&e.push("Documento novo"),o.urgente&&e.push("Urgente"),o.trancado&&e.push("Trancado"),o.acompanhamentoEspecial&&e.push(o.acompanhamentoGrupo?`Acompanhamento especial (${o.acompanhamentoGrupo})`:"Acompanhamento especial");for(let r of o.retornos)e.push(`${r.tipo==="aguardando"?"Aguardando retorno":"Retorno programado"}${r.atrasado?" (atrasado)":""}`);return e}function kr(o,e){let r=so(o,e);if(!o.prazo||!r)return"";let t=o.prazo.vencimento??o.prazo.inicio;return`${t?io(t):""}${o.prazo.hora?` ${o.prazo.hora}`:""} (${r.texto})`.trim()}var fi=(o,e,r)=>{switch(e){case"processo":return o.protocolo;case"tipo":return o.tipo;case"especificacao":return o.especificacao;case"responsavel":return o.atribuicao?o.atribuicao.nome===o.atribuicao.sigla?o.atribuicao.sigla:`${o.atribuicao.nome} (${o.atribuicao.sigla})`:"";case"marcadores":return o.marcadores.map(t=>t.texto?`${t.nome}: ${t.texto}`:t.nome).join("; ");case"prazo":return kr(o,r);case"anotacao":return o.anotacao?.texto.replace(/\s*\n\s*/g," / ")??"";case"caixa":return _o(uo(o,r));case"parado":return _o(wo(o,r));case"sinais":return Mr(o).join("; ")}};function Fa(o,e,r){return[e.map(t=>Oo[t]),...o.map(t=>e.map(a=>fi(t,a,r)))]}var ja=o=>`processos-${o}.csv`;function Ga(o,e,r){let t=[];for(let a of o){let n=r&&e.has(a.chave);if(r&&t.push({tipo:"grupo",grupo:a,recolhido:n}),!n)for(let s of a.itens)t.push({tipo:"processo",processo:s,grupo:a.chave})}return t}var Lr=new Intl.Collator("pt-BR",{numeric:!0,sensitivity:"base"});function Ua(o){let e=/(\d+)\/(\d{4})-\d+\s*$/.exec(o);if(!e)return null;let r=/(\d+)\s*$/.exec(e[1].split(/[.-]/).pop()??"")?.[1]??e[1];return[Number(e[2]),Number(r)]}function gi(o,e){let r=Ua(o),t=Ua(e);return r&&t&&(r[0]-t[0]||r[1]-t[1])||Lr.compare(o,e)}function Ba(o,e,r){switch(e){case"tipo":return o.tipo||null;case"responsavel":return o.atribuicao?.sigla??null;case"marcador":return o.marcadores[0]?.nome??null;case"prazo":{let t=so(o,r);return t?t.ordem:null}case"caixa":return uo(o,r);case"parado":return wo(o,r);case"novo":return o.naoVisualizado?0:1}}function hi(o,e){return(r,t)=>{for(let a of o){let n;if(a.campo==="protocolo")n=gi(r.protocolo,t.protocolo),a.decrescente&&(n=-n);else{let s=Ba(r,a.campo,e),i=Ba(t,a.campo,e);if(s===null&&i===null)continue;if(s===null)return 1;if(i===null)return-1;n=typeof s=="number"&&typeof i=="number"?s-i:Lr.compare(String(s),String(i)),a.decrescente&&(n=-n)}if(n)return n}return 0}}function Qa(o,e,r){return e.length?[...o].sort(hi(e,r)):o}function Xa(o,e,r){let t=o.findIndex(s=>s.campo===e),a=t<0?{campo:e,decrescente:!1}:o[t].decrescente?null:{campo:e,decrescente:!0};if(!r)return a?[a]:[];if(t<0)return[...o,a];let n=[...o];return a?n[t]=a:n.splice(t,1),n}var Cr=new Intl.Collator("pt-BR",{sensitivity:"base",numeric:!0}),fo="sem";function Ka(o,e,r,t={}){let a=new Map,n=(i,c,l,d,m)=>{let f=a.get(i);return f||(f={chave:i,titulo:c,itens:[],aceitaSoltar:l,excedeu:!1,...d?{motivoSomenteLeitura:d}:{},...m?{tom:m}:{}},a.set(i,f)),f};if(e.colunas==="marcador"){n(fo,"Sem marcador",!0);for(let i of[...t.marcadores??[]].sort(Cr.compare))n(`m:${i}`,i,!0);for(let i of o){i.marcadores.length||n(fo,"Sem marcador",!0).itens.push(i);for(let c of i.marcadores)n(`m:${c.nome}`,c.nome,!0).itens.push(i)}}else if(e.colunas==="responsavel"){n(fo,"Sem respons\xE1vel",!0);for(let i of t.responsaveis??[])n(`u:${i.sigla}`,`${i.nome} (${i.sigla})`,!0);for(let i of o)i.atribuicao?n(`u:${i.atribuicao.sigla}`,`${i.atribuicao.nome} (${i.atribuicao.sigla})`,!0).itens.push(i):n(fo,"Sem respons\xE1vel",!0).itens.push(i)}else if(e.colunas==="prazo"){for(let[i,c,l]of Ho)i!=="desde"&&n(i,c,!1,"O prazo \xE9 definido pelo bot\xE3o de prazo, n\xE3o arrastando.",l);for(let i of o){let c=Wo(i,r);n(c==="desde"?"sem":c,"",!1).itens.push(i)}}else for(let i of o)n(`t:${i.tipo}`,i.tipo||"Sem tipo",!1,"O tipo do processo n\xE3o muda arrastando.").itens.push(i);let s=[...a.values()];if(e.colunas==="prazo"&&(s=s.filter(i=>i.itens.length||i.titulo)),e.colunas==="marcador"||e.colunas==="responsavel"?s.sort((i,c)=>i.chave===fo?-1:c.chave===fo?1:Cr.compare(i.titulo,c.titulo)):e.colunas==="tipo"&&s.sort((i,c)=>Cr.compare(i.titulo,c.titulo)),e.limite>0)for(let i of s)i.excedeu=i.itens.length>e.limite;return s}var Me=o=>o.slice(o.indexOf(":")+1);function Ja(o,e,r,t){if(r===t)return{ok:!1,motivo:"Mesma coluna."};if(o==="marcador"){let a=r===fo?void 0:Me(r),n=t===fo?void 0:Me(t);if(a&&!e.marcadores.some(l=>l.nome===a))return{ok:!1,motivo:"O processo j\xE1 n\xE3o tem esse marcador."};let s=n?e.marcadores.some(l=>l.nome===n):!1,i=a?e.marcadores.find(l=>l.nome===a)?.texto:void 0,c={tipo:"marcador",id:e.id,protocolo:e.protocolo};return a&&(c.remover=a),n&&!s&&(c.adicionar=n,i&&(c.texto=i)),!c.remover&&!c.adicionar?{ok:!1,motivo:"Nada a mudar."}:{ok:!0,movimento:c}}return o==="responsavel"?{ok:!0,movimento:{tipo:"atribuicao",id:e.id,protocolo:e.protocolo,para:t===fo?null:Me(t),de:r===fo?null:Me(r)}}:{ok:!1,motivo:"Esta divis\xE3o do quadro \xE9 s\xF3 de leitura."}}function Or(o,e,r={}){if(e.tipo==="atribuicao"){if(e.para===null){let{atribuicao:a,...n}=o;return n}return{...o,atribuicao:{sigla:e.para,nome:r[e.para]??e.para}}}let t=o.marcadores;return e.remover&&(t=t.filter(a=>a.nome!==e.remover)),e.adicionar&&(t=[...t,{nome:e.adicionar,cor:"",texto:e.texto??""}]),{...o,marcadores:t}}var Dr="application/x-spro-cartao";function bi(o,e,r){let t=so(o,r.ctx),a=p("input",{type:"checkbox",class:"spro-cb","aria-label":`Marcar ${o.protocolo}`,disabled:!o.naPaginaAtual});a.checked=r.selecionados.has(o.id),a.addEventListener("change",()=>r.aoSelecionar(o.id,a.checked));let n=p("div",{class:`spro-cartao${a.checked?" spro-sel":""}`,draggable:"true","data-id":o.id,"data-de":e},p("div",{class:"spro-cartao-topo"},a,p("a",{class:`spro-proc${o.naoVisualizado?" spro-novo":""}`,href:o.link??"#",draggable:"false"},o.protocolo)),o.tipo?p("div",{class:"spro-cartao-tipo"},o.tipo):null,o.especificacao?p("div",{class:"spro-cartao-espec"},o.especificacao):null,p("div",{class:"spro-cartao-rodape"},t?p("span",{class:`spro-prazo spro-prazo-${t.situacao}`,title:t.dica},t.texto):null,o.atribuicao?p("span",{class:"spro-avatar",title:o.atribuicao.nome},o.atribuicao.sigla.slice(0,2).toUpperCase()):null));return n.addEventListener("dragstart",s=>{s.dataTransfer?.setData(Dr,JSON.stringify({id:o.id,de:e})),s.dataTransfer?.setData("text/plain",o.protocolo),s.dataTransfer&&(s.dataTransfer.effectAllowed="move"),n.classList.add("spro-arrastando")}),n.addEventListener("dragend",()=>n.classList.remove("spro-arrastando")),n}function vi(o,e){let r=p("div",{class:"spro-col-corpo"},...o.itens.map(s=>bi(s,o.chave,e)));o.itens.length||r.append(p("div",{class:"spro-col-vazia"},o.aceitaSoltar?"Solte aqui":"Vazia"));let t=e.cfg.limite,a=p("div",{class:"spro-col-topo"},p("span",{class:"spro-col-titulo",title:o.titulo},o.titulo),p("span",{class:`spro-col-n${o.excedeu?" spro-excedeu":""}`,title:o.excedeu?`Passou do limite de ${t}`:void 0},t>0?`${o.itens.length}/${t}`:String(o.itens.length)),o.aceitaSoltar?null:p("span",{class:"spro-col-trava",title:o.motivoSomenteLeitura},oo("bloquear",13))),n=p("section",{class:`spro-col${o.tom?` spro-tom-${o.tom}`:""}${o.excedeu?" spro-col-cheia":""}`,"data-chave":o.chave},a,r);return n.addEventListener("dragover",s=>{s.dataTransfer?.types.includes(Dr)&&o.aceitaSoltar&&(s.preventDefault(),n.classList.add("spro-alvo"))}),n.addEventListener("dragleave",()=>n.classList.remove("spro-alvo")),n.addEventListener("drop",s=>{n.classList.remove("spro-alvo");let i=s.dataTransfer?.getData(Dr);if(i){s.preventDefault();try{let{id:c,de:l}=JSON.parse(i);e.aoMover(c,l,o.chave)}catch{}}}),n}function Wa(o){let e=p("div",{class:"spro-quadro"}),r=t=>p("div",{class:"spro-colunas"},...Ka(t,o.cfg,o.ctx,o.extras).map(a=>vi(a,o)));if(o.cfg.raiasPorResponsavel&&o.cfg.colunas!=="responsavel")for(let t of Se(o.processos,"responsavel",o.ctx))e.append(p("div",{class:"spro-raia"},p("div",{class:"spro-raia-nome"},t.rotulo,p("span",{class:"spro-grupo-n"},String(t.itens.length))),r(t.itens)));else e.append(r(o.processos));return o.processos.length||e.prepend(p("div",{class:"spro-vazio"},"Nenhum processo corresponde ao filtro.")),e}var Za=".spro-fav-estrela, .spro-prj-ic, .spro-dem-cx",xi=[".spro-fav-",".spro-prj-",".spro-dem-cx"],Ya=(o,e)=>o.getElementById(`P${e}`)?.querySelectorAll("td")[1],ke=["spro-fav-estrela","spro-prj-ic","spro-dem-cx"],Ir=o=>ke.find(e=>o.classList.contains(e))??"";function yi(o,e,r){for(let t of Array.from(o.attributes))!e.hasAttribute(t.name)&&t.name!=="data-spro-id"&&t.name!=="data-tip"&&o.removeAttribute(t.name);for(let t of Array.from(e.attributes))t.name!=="aria-busy"&&t.name!=="title"&&o.getAttribute(t.name)!==t.value&&o.setAttribute(t.name,t.value);e.getAttribute("title")&&o.getAttribute("data-tip")!==e.getAttribute("title")&&o.setAttribute("data-tip",e.getAttribute("title")),o.removeAttribute("aria-busy"),o.setAttribute("data-spro-id",r),o.innerHTML!==e.innerHTML&&o.replaceChildren(...Array.from(e.cloneNode(!0).childNodes))}function on(){let o=new Map;return function(r,t){let a=Ya(r,t),n=new Set,s=[];if(a){let i=[...a.querySelectorAll(Za)].sort((c,l)=>ke.indexOf(Ir(c))-ke.indexOf(Ir(l)));for(let c of i){let l=`${t}|${Ir(c)}`;n.add(l);let d=o.get(l);d?yi(d,c,t):(d=c.cloneNode(!0),d.removeAttribute("aria-busy"),d.setAttribute("data-spro-id",t),o.set(l,d)),s.push(d)}}for(let i of ke)n.has(`${t}|${i}`)||o.delete(`${t}|${i}`);return s}}function $r(o,e){let r=Ya(o,e);return r?[...r.querySelectorAll(`${Za}, .acompanhamentoesp_icon`)].map(t=>`${t.className}|${t.getAttribute("aria-pressed")??""}|${t.getAttribute("aria-label")??""}|${t.hasAttribute("data-atraso")?1:0}|${t.querySelector('[class$="-n"]')?.textContent??""}`).join(";"):""}function en(o){let e=[];for(let r of Array.from(o.styleSheets??[])){let t;try{t=r.cssRules}catch{continue}for(let a of Array.from(t)){let n=a.cssText;xi.some(s=>n.includes(s))&&e.push(n)}}return e.join(`
`)}function rn(o,e){let r=s=>s.trim().toLowerCase(),t=new Map;for(let s of e)s.nome.trim()&&!t.has(r(s.nome))&&t.set(r(s.nome),{nome:s.nome.trim(),texto:s.texto.trim().slice(0,250)});let a=new Map(o.map(s=>[r(s.nome),s])),n=[];for(let s of o)t.has(r(s.nome))||n.push({tipo:"remover",nome:s.nome});for(let[s,i]of t)a.has(s)||n.push({tipo:"adicionar",nome:i.nome,texto:i.texto});for(let[s,i]of t){let c=a.get(s);c&&c.texto.trim()!==i.texto&&n.push({tipo:"texto",nome:c.nome,texto:i.texto})}return n}function tn(o,e,r=()=>""){let t=[...o.marcadores];for(let a of e)a.tipo==="remover"?t=t.filter(n=>n.nome!==a.nome):a.tipo==="adicionar"?t.push({nome:a.nome,cor:r(a.nome),texto:a.texto}):t=t.map(n=>n.nome===a.nome?{...n,texto:a.texto}:n);return{...o,marcadores:t}}function Le(o){return o.replace(/\r\n?/g,`
`).trim().slice(0,500)}function an(o,e,r,t=""){let a=Le(e);if(!a){let{anotacao:n,...s}=o;return s}return{...o,anotacao:{texto:a,autor:o.anotacao?.autor??t,prioridade:r}}}function nn(o,e){if(!e){let{atribuicao:r,...t}=o;return t}return{...o,atribuicao:e}}function Ce(o,e,r,t,a){let n=new Set([o.id]);if(t)for(let s of e)n.add(s);return r.filter(s=>n.has(s.id)&&a(s))}function zr(o,e){let r=new Set(e.marcadores.map(t=>t.nome.trim().toLowerCase()));return o.filter(t=>{let a=r.has(t.nome.trim().toLowerCase());return t.tipo==="adicionar"?!a:a})}function Oe(o,e){let r=o.ownerDocument??document;for(let n of Array.from(o.querySelectorAll("dialog.spro-dialogo-grade")))n.remove();let t=p("dialog",{class:`spro-dialogo spro-dialogo-grade${e.largo?" spro-dialogo-largo":""}`,"aria-label":e.titulo}),a=()=>{t.open?t.close():t.remove()};return t.append(p("header",{},e.icone?p("span",{class:"spro-dialogo-icone","aria-hidden":"true"},_(e.icone,18)):null,p("h2",{},e.titulo,e.subtitulo?p("small",{class:"spro-dialogo-sub"},e.subtitulo):null),p("button",{type:"button",class:"spro-botao-icone","aria-label":"Fechar",title:"Fechar (Esc)",onclick:a},_("fechar",16))),p("div",{class:"spro-dialogo-corpo"},e.conteudo)),t.addEventListener("close",()=>{t.remove(),e.aoFechar?.()}),o.append(t),typeof t.showModal=="function"?t.showModal():t.setAttribute("open",""),t.querySelector(".spro-combo, textarea, input:not([type=checkbox])")?.focus({preventScroll:!0}),{fechar:a,dlg:t}}var Ai=/^\s*\[( |x|X)\]\s?(.*)$/;function Tr(o){return o.replace(/\r\n?/g,`
`).split(`
`).map(e=>{let r=Ai.exec(e);return r?{marca:r[1]!==" ",texto:r[2]}:{marca:null,texto:e}})}function sn(o){return o.map(e=>e.marca===null?e.texto:`${e.marca?"[X]":"[ ]"} ${e.texto}`).join(`
`)}function Nr(o,e){let r=new Set(e.filter(a=>a>=0&&a<o.length));if(!r.size)return[...o];let t=[...r].every(a=>o[a].marca!==null);return o.map((a,n)=>r.has(n)?{...a,marca:t?null:a.marca??!1}:a)}function cn(o,e){return o.map((r,t)=>t===e&&r.marca!==null?{...r,marca:!r.marca}:r)}function ln(o){return Tr(o).filter(e=>e.marca!==null||e.texto.trim()).map(e=>e.marca===null?e.texto:`${e.marca?"\u2611":"\u2610"} ${e.texto}`).join(" / ")}var Ei=30;function wi(o){let e=[],r=(a,n)=>{let s=a?.getAttribute("data-tarefa");e.push({marca:s==null?null:s==="x",texto:n.replace(/\u00a0/g," ").replace(/\n+$/,"")})},t="";for(let a of Array.from(o.childNodes))if(a.nodeType===3)t+=a.textContent??"";else if(a.nodeType===1){let n=a;if(t){for(let s of t.split(`
`))r(null,s);t=""}n.tagName==="BR"?r(null,""):r(n,n.textContent??"")}if(t)for(let a of t.split(`
`))r(null,a);return e.length?e:[{marca:null,texto:""}]}function pn(o,e){let r=o.ownerDocument;o.replaceChildren(...e.map(t=>{let a=r.createElement("div");return a.className="spro-pi-linha",t.marca!==null&&a.setAttribute("data-tarefa",t.marca?"x":"o"),t.texto?a.textContent=t.texto:a.append(r.createElement("br")),a}))}function dn(o,e){let r=o.prioridade,t=()=>{},a=p("div",{class:"spro-pi-editor",contenteditable:"true",role:"textbox","aria-multiline":"true","aria-label":"Anota\xE7\xE3o",spellcheck:"true"}),n=p("span",{class:"spro-pi-contador"}),s=p("button",{type:"button",class:"spro-pi-bt","data-tip":"Lista de tarefas (nas linhas selecionadas)","aria-label":"Lista de tarefas"},_("check",16)),i=p("button",{type:"button",class:"spro-pi-bt","data-tip":"Prioridade","aria-label":"Prioridade"},oo("prioridade",16)),c=p("button",{type:"button",class:"spro-pi-bt","data-tip":"Inserir a data de hoje","aria-label":"Inserir a data de hoje"},_("calendario",16)),l=p("div",{class:"spro-pi-barra"},s,c,i,n),d=p("div",{class:"spro-pi"},a,l),m=()=>wi(a),f=()=>sn(m());function y(){d.classList.toggle("spro-pi-prio",r),i.setAttribute("aria-pressed",String(r));let P=f().length;n.textContent=`${P}/${500}`,n.classList.toggle("spro-pi-estouro",P>500),t()}pn(a,Tr(o.texto)),y();function A(){let P=e.getSelection?.()??e.ownerDocument.getSelection?.()??null,v=Array.from(a.children),S=T=>{let h=T;for(;h&&h.parentNode!==a;)h=h.parentNode;return h?v.indexOf(h):-1};if(!P||!P.rangeCount)return[];let E=S(P.anchorNode),w=S(P.focusNode);if(E<0&&w<0)return[];let[C,z]=[Math.min(E<0?w:E,w<0?E:w),Math.max(E,w)];return Array.from({length:z-C+1},(T,h)=>C+h)}let M=P=>{pn(a,P),y()};for(let P of[s,c,i])P.addEventListener("mousedown",v=>v.preventDefault());return s.addEventListener("click",()=>{let P=m(),v=A();M(Nr(P,v.length?v:P.map((S,E)=>E).filter(S=>S===P.length-1))),a.focus()}),i.addEventListener("click",()=>{r=!r,y()}),c.addEventListener("click",()=>{a.focus();let P=io(No());e.ownerDocument.execCommand?.("insertText",!1,P)||(a.append(P),y())}),a.addEventListener("input",y),a.addEventListener("paste",P=>{P.preventDefault();let v=P.clipboardData?.getData("text/plain")??"";e.ownerDocument.execCommand?.("insertText",!1,v.replace(/\r\n?/g,`
`))}),a.addEventListener("mousedown",P=>{let v=P.target.closest?.(".spro-pi-linha");!v||!v.hasAttribute("data-tarefa")||P.clientX-v.getBoundingClientRect().left>Ei||(P.preventDefault(),M(cn(m(),Array.from(a.children).indexOf(v))))}),a.addEventListener("keydown",P=>{if(P.key!=="Enter"||P.shiftKey)return;let v=e.getSelection?.()??e.ownerDocument.getSelection?.()??null,S=A(),E=m();v?.isCollapsed&&S.length===1&&E[S[0]]?.marca!==null&&!E[S[0]].texto.trim()&&(P.preventDefault(),M(Nr(E,[S[0]])))}),{el:d,texto:f,prioridade:()=>r,aoMudar:P=>{t=P},foco:()=>{a.focus()}}}var Si=[[/azul_marinho|marinho/,"#1d3557"],[/azul_claro|ciano|celeste/,"#2a9fd6"],[/azul/,"#2563c9"],[/verde_escuro/,"#166534"],[/verde|lima/,"#2e9e4f"],[/amarelo/,"#e0b000"],[/laranja/,"#ee7d11"],[/vermelho/,"#d1352b"],[/rosa|magenta/,"#d6409f"],[/roxo|violeta|lilas/,"#7048c6"],[/marrom/,"#8a5a3c"],[/preto/,"#222831"],[/cinza/,"#7b838c"]];function Zo(o){let e=o.toLowerCase();return Si.find(([r])=>r.test(e))?.[1]??"#8b939c"}var Mi=o=>o instanceof Error?o.message:String(o);async function Rr(o,e,r,t,a){let n=0,s=[],i=0;for(let c of e){let l=o.todos().find(d=>d.id===c.id)??c;o.aplicarLocal(l.id,r(l));try{await o.gravar(()=>t(l)),n+=1}catch(d){o.aplicarLocal(l.id,l),s.push(`${l.protocolo}: ${Mi(d)}`)}a?.(i+=1,e.length)}return{ok:n,falhas:s}}function _r(o,e,r){e.falhas.length?o.aviso(`${r}: ${e.ok} ok, ${e.falhas.length} com erro \u2014 ${e.falhas[0]}`):o.aviso(`${r}: ${e.ok} ${e.ok===1?"processo atualizado":"processos atualizados"}.`)}function un(o,e,r){let t=Ce(e,o.selecionados(),o.todos(),!0,r).filter(n=>n.id!==e.id);if(!t.length)return null;let a=p("input",{type:"checkbox"});return{el:p("label",{class:"spro-rotulo-linha spro-estender"},a,` Aplicar tamb\xE9m aos ${t.length} ${t.length===1?"outro selecionado":"outros selecionados"}`),marcado:()=>a.checked,n:()=>t.length}}var qr=(...o)=>p("div",{class:"spro-dialogo-rodape"},...o),Vr=(o="Salvar")=>p("button",{type:"button",class:"spro-botao primario"},_("check",15),o);function mn(o,e){let r=[],t=e.atribuicao?.sigla??"",a=Eo({rotulo:"Respons\xE1vel",icone:"pessoa",busca:!0,larguraLista:320,vazio:"Escolher o respons\xE1vel\u2026",opcoes:()=>[{valor:"",rotulo:"Sem respons\xE1vel",descricao:"Remove a atribui\xE7\xE3o"},...r.map(d=>({valor:d.sigla,rotulo:d.nome===d.sigla?d.sigla:d.nome,descricao:d.sigla}))],valor:[t],aoMudar:([d])=>{t=d??"",c()}}),n=un(o,e,()=>!0),s=Vr(),i=p("p",{class:"spro-suave"},"Carregando os usu\xE1rios da unidade\u2026"),c=()=>{s.disabled=!r.length||t===(e.atribuicao?.sigla??"")},l=Oe(o.raiz,{titulo:"Respons\xE1vel",subtitulo:e.protocolo,icone:"pessoa",conteudo:p("div",{class:"spro-form"},p("label",{class:"spro-campo-rotulo"},"Atribuir a",a.el),i,n?.el??null,qr(s))});o.extras().then(d=>{r=d.responsaveis??[],i.textContent=r.length?"":"N\xE3o foi poss\xEDvel ler os usu\xE1rios da unidade.",a.atualizar(),c()}).catch(()=>{i.textContent="N\xE3o foi poss\xEDvel ler os usu\xE1rios da unidade."}),c(),s.addEventListener("click",async()=>{let d=t?r.find(f=>f.sigla===t)??{sigla:t,nome:t}:null,m=n?.marcado()?Ce(e,o.selecionados(),o.todos(),!0,()=>!0):[e];s.disabled=!0,l.fechar(),_r(o,await Rr(o,m,f=>nn(f,d),f=>o.atribuir(f.protocolo,d?.sigla??null)),d?`Respons\xE1vel: ${d.nome}`:"Atribui\xE7\xE3o removida")})}function fn(o,e){let r=dn({texto:e.anotacao?.texto??"",prioridade:e.anotacao?.prioridade??!1},o.raiz),t=Vr(),a=e.anotacao?p("button",{type:"button",class:"spro-botao perigo"},_("lixeira",15),"Remover anota\xE7\xE3o"):null,n=()=>{let c=Le(r.texto()),l=r.texto().length>500;t.disabled=!c||l||c===(e.anotacao?.texto??"")&&r.prioridade()===(e.anotacao?.prioridade??!1)};r.aoMudar(n);let s=Oe(o.raiz,{titulo:"Anota\xE7\xE3o",subtitulo:e.protocolo,icone:"nota",largo:!0,conteudo:p("div",{class:"spro-form"},r.el,e.anotacao?.autor?p("p",{class:"spro-suave"},`\xDAltima edi\xE7\xE3o: ${e.anotacao.autor}`):null,qr(a,t))});r.foco(),n();let i=async(c,l,d)=>{s.fechar(),_r(o,await Rr(o,[e],m=>an(m,c,l,o.autor),m=>o.anotar(m.protocolo,{texto:c,prioridade:l})),d)};t.addEventListener("click",()=>void i(Le(r.texto()),r.prioridade(),"Anota\xE7\xE3o salva")),a?.addEventListener("click",()=>void i("",!1,"Anota\xE7\xE3o removida"))}function gn(o,e){let r=e.marcadores.map(f=>({nome:f.nome,texto:f.texto})),t=[],a=p("div",{class:"spro-marcadores-lista"}),n=un(o,e,f=>!f.sigiloso),s=Vr(),i=p("p",{class:"spro-suave"},"Carregando os marcadores da unidade\u2026"),c=Eo({rotulo:"Adicionar marcador",icone:"etiqueta",busca:!0,larguraLista:320,vazio:"Adicionar marcador\u2026",opcoes:()=>t.filter(f=>!r.some(y=>y.nome.toLowerCase()===f.toLowerCase())).map(f=>({valor:f,rotulo:f,cor:Zo(o.corDoMarcador(f))})),aoMudar:([f])=>{f&&(r=[...r,{nome:f,texto:""}],c.definir([],!1),d())}}),l=()=>rn(e.marcadores,r);function d(){a.replaceChildren(...r.length?r.map((f,y)=>{let A=p("input",{type:"text",class:"spro-campo",maxlength:String(250),placeholder:"Texto do marcador (opcional)","aria-label":`Texto de ${f.nome}`,value:f.texto});return A.addEventListener("input",()=>{r[y]={...f,texto:A.value},s.disabled=!l().length}),p("div",{class:"spro-marcador-linha"},p("span",{class:"spro-marcador",title:f.nome},p("i",{style:`background:${Zo(o.corDoMarcador(f.nome))}`}),f.nome),A,p("button",{type:"button",class:"spro-botao-icone pequeno",title:`Remover ${f.nome}`,"aria-label":`Remover ${f.nome}`,onclick:()=>{r=r.filter((M,P)=>P!==y),d()}},_("fechar",13)))}):[p("p",{class:"spro-suave"},"Nenhum marcador. Adicione abaixo.")]),c.atualizar(),s.disabled=!l().length}let m=Oe(o.raiz,{titulo:"Marcadores",subtitulo:e.protocolo,icone:"etiqueta",conteudo:p("div",{class:"spro-form"},a,c.el,i,n?.el??null,qr(s))});d(),o.extras().then(f=>{t=f.marcadores??[],i.textContent=t.length?"":"N\xE3o foi poss\xEDvel ler os marcadores da unidade.",d()}).catch(()=>{i.textContent="N\xE3o foi poss\xEDvel ler os marcadores da unidade."}),s.addEventListener("click",async()=>{let f=l();if(!f.length)return;let y=n?.marcado()?Ce(e,o.selecionados(),o.todos(),!0,A=>!A.sigiloso):[e];m.fechar(),_r(o,await Rr(o,y,A=>tn(A,zr(f,A),o.corDoMarcador),async A=>{for(let M of zr(f,A))M.tipo==="remover"?await o.marcar(A.protocolo,{marcador:M.nome,remover:!0}):await o.marcar(A.protocolo,{marcador:M.nome,texto:M.texto})}),"Marcadores")})}function hn(o,e,r,t,a=8){let n=Math.max(1,e),s=t>0?t:n*40,i=Math.max(0,Math.min(o,Math.floor(r/n)-a)),c=Math.min(o,Math.ceil((r+s)/n)+a);return{inicio:i,fim:c,antes:i*n,depois:Math.max(0,o-c)*n}}var Ie={compacta:34,confortavel:48},ki={processo:"minmax(340px, 370px)",tipo:"minmax(120px, 1.2fr)",especificacao:"minmax(200px, 2fr)",responsavel:"minmax(90px, 130px)",marcadores:"minmax(120px, 1.3fr)",prazo:"minmax(120px, 150px)",anotacao:"minmax(130px, 1.4fr)",caixa:"84px",parado:"84px",sinais:"minmax(110px, 150px)"},Li={processo:"protocolo",tipo:"tipo",responsavel:"responsavel",marcadores:"marcador",prazo:"prazo",caixa:"caixa",parado:"parado",sinais:"novo"};function Ci(o){let e=o.trim().split(/\s+/);return e.length>2?`${e[0]} ${e[e.length-1]}`:o}function $e(o,e){return p("button",{type:"button",class:"spro-lapis",title:o,"aria-label":o,onclick:r=>{r.preventDefault(),r.stopPropagation(),e()}},_("lapis",13))}var eo=(o,e,r)=>p(o,{class:e},r);function Oi(o,e,r,t){let a=eo("div",`spro-c spro-c-${e}`);switch(e){case"processo":{let n=t.icones(o.id),s=d=>n.find(m=>m.classList.contains(d))??p("span",{class:"spro-slot"}),i=o.acompanhamentoEspecial?p("span",{class:"spro-acomp",title:o.acompanhamentoGrupo?`Acompanhamento especial: ${o.acompanhamentoGrupo}`:"Acompanhamento especial"},_("olho",15)):p("span",{class:"spro-slot"});a.append(p("span",{class:"spro-icones"},s("spro-fav-estrela"),s("spro-prj-ic"),s("spro-dem-cx"),i));let c=o.grupo==="recebidos";a.append(p("span",{class:`spro-origem spro-origem-${o.grupo}`,title:c?"Processo recebido: veio de outra unidade":"Processo gerado: autuado nesta unidade",role:"img","aria-label":c?"Processo recebido":"Processo gerado"},oo(c?"recebido":"gerado",16)));let l=p("a",{class:`spro-proc${o.naoVisualizado?" spro-novo":""}`,href:o.link??"#",title:"Abrir o processo"},o.protocolo);a.append(l),o.link&&a.append(p("a",{class:"spro-nova-guia",href:o.link,target:"_blank",rel:"noopener",title:"Abrir em nova guia","aria-label":`Abrir ${o.protocolo} em nova guia`},oo("novaGuia",14))),o.sigiloso&&a.append(p("span",{class:"spro-sigilo",title:"Processo sigiloso"},"sigiloso")),o.urgente&&a.append(p("span",{class:"spro-urgente",title:"Marcado como urgente"},"urgente")),o.trancado&&a.append(p("span",{class:"spro-sigilo",title:"Processo trancado"},"trancado"));break}case"tipo":a.append(eo("span","spro-corta",o.tipo)),a.title=o.tipo;break;case"especificacao":{if(a.classList.add("spro-editavel"),t.editando===o.id){let n=p("input",{type:"text",class:"spro-espec-input",maxlength:"100",value:t.rascunho,"aria-label":"Especifica\xE7\xE3o do processo"});n.addEventListener("input",()=>t.aoDigitarEspec(n.value)),n.addEventListener("keydown",l=>{l.stopPropagation(),l.key==="Enter"?t.aoSalvarEspec(o.id):l.key==="Escape"&&t.aoCancelarEspec()});let s=l=>l.preventDefault(),i=p("button",{type:"button",class:"spro-lapis spro-lapis-ok",title:"Salvar (Enter)","aria-label":"Salvar",onclick:()=>t.aoSalvarEspec(o.id)},_("check",14)),c=p("button",{type:"button",class:"spro-lapis",title:"Cancelar (Esc)","aria-label":"Cancelar",onclick:()=>t.aoCancelarEspec()},_("fechar",14));i.addEventListener("pointerdown",s),c.addEventListener("pointerdown",s),a.append(p("span",{class:"spro-edicao"},n,i,c));break}a.append(eo("span","spro-corta",o.especificacao)),a.title=o.especificacao,o.sigiloso||a.append($e("Editar a especifica\xE7\xE3o",()=>t.aoEditarEspec(o.id)));break}case"responsavel":a.classList.add("spro-editavel"),o.atribuicao?(a.append(eo("span","spro-corta",t.nomesCompletos?Ci(o.atribuicao.nome):o.atribuicao.sigla)),a.title=t.nomesCompletos?o.atribuicao.sigla:o.atribuicao.nome):a.append(p("span",{class:"spro-prazo-vazio spro-vazio-edicao"},"atribuir")),a.append($e(o.atribuicao?"Mudar o respons\xE1vel":"Atribuir a algu\xE9m",()=>t.aoEditar(o.id,"responsavel")));break;case"marcadores":a.classList.add("spro-editavel","spro-editavel-quebra");for(let n of o.marcadores){let s=p("span",{class:"spro-marcador",title:n.texto?`${n.nome}: ${n.texto}`:n.nome},p("i",{style:`background:${Zo(n.cor)}`}),n.nome);a.append(s)}o.sigiloso||(o.marcadores.length||a.append(p("span",{class:"spro-prazo-vazio spro-vazio-edicao"},"marcar")),a.append($e(o.marcadores.length?"Editar os marcadores":"Adicionar marcador",()=>t.aoEditar(o.id,"marcadores"))));break;case"prazo":{let n=so(o,r);a.classList.add("spro-editavel");let s=n?"Editar o prazo":"Definir um prazo",i=p("button",{type:"button",class:"spro-prazo-b",title:n?`${kr(o,r)}
${n.dica}

${s}`:s,"aria-label":s,onclick:c=>{c.preventDefault(),c.stopPropagation(),t.aoAbrirPrazo(o.id)}},n?eo("span",`spro-prazo spro-prazo-${n.situacao}`,n.texto):eo("span","spro-prazo-vazio","definir"));a.append(i,p("span",{class:"spro-lapis spro-lapis-fixo","aria-hidden":"true"},_("lapis",13)));break}case"anotacao":a.classList.add("spro-editavel"),o.anotacao?(a.append(eo("span",`spro-corta${o.anotacao.prioridade?" spro-prio":""}`,ln(o.anotacao.texto))),a.title=`${o.anotacao.texto}
${o.anotacao.autor}`):o.sigiloso||a.append(p("span",{class:"spro-prazo-vazio spro-vazio-edicao"},"anotar")),o.sigiloso||a.append($e(o.anotacao?"Editar a anota\xE7\xE3o":"Adicionar anota\xE7\xE3o",()=>t.aoEditar(o.id,"anotacao")));break;case"caixa":{let n=_o(uo(o,r));a.append(eo("span","spro-suave",n)),n&&(a.title=xa);break}case"parado":{let n=wo(o,r);a.append(eo("span","spro-suave",_o(n))),n!==null&&(a.title="Dias desde a \xFAltima movimenta\xE7\xE3o (vis\xE3o detalhada do SEI).");break}case"sinais":for(let n of Mr(o))a.append(eo("span","spro-sinal",n));break}return a}function bn(o){let e=o,r=eo("div","spro-cab"),t=eo("div","spro-corpo"),a=p("div",{class:"spro-rolagem",tabindex:"-1"},t),n=p("div",{class:"spro-tabela",role:"table"},r,a),s="",i=!1,c=!1,l=()=>`36px ${e.colunas.map(v=>ki[v]).join(" ")}`;function d(){r.replaceChildren(),r.style.gridTemplateColumns=l();let v=e.linhas.filter(w=>w.tipo==="processo"&&w.processo.naPaginaAtual).map(w=>w.processo.id),S=v.filter(w=>e.selecionados.has(w)).length,E=p("input",{type:"checkbox",class:"spro-cb","aria-label":"Marcar todos os processos vis\xEDveis",title:"Marcar todos os vis\xEDveis (desta p\xE1gina do SEI)",disabled:!v.length});E.checked=v.length>0&&S===v.length,E.indeterminate=S>0&&S<v.length,E.addEventListener("change",()=>e.aoMarcarGrupo(v,E.checked)),r.append(eo("div","spro-c spro-c-cb")),r.firstElementChild.append(E);for(let w of e.colunas){let C=Li[w],z=C?e.ordem.findIndex(h=>h.campo===C):-1,T=p("div",{class:`spro-c spro-th${C?" spro-ordenavel":""}`,role:"columnheader",...z>=0?{"aria-sort":e.ordem[z].decrescente?"descending":"ascending"}:{}});if(C){let h=p("button",{type:"button",class:"spro-th-b",title:"Ordenar (Shift acrescenta outro crit\xE9rio)",onclick:L=>e.aoOrdenar(C,L.shiftKey)},Oo[w]);z>=0&&h.append(p("span",{class:"spro-seta-ordem"},`${e.ordem[z].decrescente?"\u2193":"\u2191"}${e.ordem.length>1?z+1:""}`)),T.append(h)}else T.append(Oo[w]);r.append(T)}}function m(v,S){let E=e.selecionados.has(v.id),w=p("input",{type:"checkbox",class:"spro-cb","aria-label":`Marcar ${v.protocolo}`,disabled:!v.naPaginaAtual,title:v.naPaginaAtual?void 0:"Este processo est\xE1 em outra p\xE1gina do SEI; abra-o ou use o quadro para mover."});w.checked=E,w.addEventListener("change",()=>e.aoSelecionar(v.id,w.checked));let C=p("div",{class:`spro-linha${E?" spro-sel":""}${e.foco===v.id?" spro-foco":""}${v.urgente?" spro-linha-urgente":""}`,role:"row","data-id":v.id,"data-grupo":S});C.style.gridTemplateColumns=l(),C.style.height=`${Ie[e.densidade]}px`;let z=eo("div","spro-c spro-c-cb");return z.append(w),C.append(z,...e.colunas.map(T=>Oi(v,T,e.ctx,e))),C}function f(v){let S=v.grupo.itens.filter(C=>C.naPaginaAtual).map(C=>C.id),E=p("button",{type:"button",class:"spro-grupo-b","aria-expanded":String(!v.recolhido),onclick:()=>e.aoGrupo(v.grupo.chave)},p("span",{class:`spro-grupo-seta${v.recolhido?" spro-fechado":""}`},oo("seta",14)),p("span",{class:"spro-grupo-nome"},v.grupo.rotulo),p("span",{class:"spro-grupo-n"},String(v.grupo.itens.length))),w=p("div",{class:`spro-grupo${v.grupo.tom?` spro-tom-${v.grupo.tom}`:""}`,role:"row"},E);if(S.length){let C=S.every(z=>e.selecionados.has(z));w.append(p("button",{type:"button",class:"spro-link",onclick:()=>e.aoMarcarGrupo(S,!C)},C?"Desmarcar grupo":"Marcar grupo"))}return w.style.height=`${Ie[e.densidade]}px`,w}function y(){let v=Ie[e.densidade],S=hn(e.linhas.length,v,a.scrollTop||0,a.clientHeight||0);t.style.paddingTop=`${S.antes}px`,t.style.paddingBottom=`${S.depois}px`,t.replaceChildren(...e.linhas.slice(S.inicio,S.fim).map(w=>w.tipo==="grupo"?f(w):m(w.processo,w.grupo)));let E=t.querySelector(".spro-espec-input");E&&i?(i=!1,E.focus(),E.setSelectionRange?.(E.value.length,E.value.length)):E&&E.getRootNode()instanceof ShadowRoot&&E.getRootNode().activeElement!==E&&c&&E.focus()}let A=0;a.addEventListener("scroll",()=>{if(A)return;let v=a.ownerDocument.defaultView;if(!v?.requestAnimationFrame)return y();A=v.requestAnimationFrame(()=>{A=0,y()})});function M(v){let S=v.colunas.join()!==e.colunas.join()||v.ordem!==e.ordem||v.selecionados!==e.selecionados;v.editando&&v.editando!==e.editando&&(i=!0),c=!!v.editando,e=v;let E=`${e.colunas.join()}|${e.densidade}`;if((S||E!==s)&&(d(),s=E),!e.linhas.length){t.style.paddingTop=t.style.paddingBottom="0",t.replaceChildren(p("div",{class:"spro-vazio"},"Nenhum processo corresponde ao filtro."));return}y()}function P(v){let S=e.linhas.findIndex(w=>w.tipo==="processo"&&w.processo.id===v);if(S<0)return!1;let E=Ie[e.densidade];return S*E<a.scrollTop?a.scrollTop=S*E:(S+1)*E>a.scrollTop+a.clientHeight&&a.clientHeight>0&&(a.scrollTop=(S+1)*E-a.clientHeight),y(),!0}return M(o),{el:n,atualizar:M,mostrar:P,rolagem:a}}var Di=[["/","Buscar"],["j / k","Linha seguinte / anterior"],["x","Marcar a linha"],["Enter","Abrir o processo"],["g t","Ver a tabela"],["g q","Ver o quadro"],["Esc","Limpar a busca ou a sele\xE7\xE3o"],["?","Esta ajuda"]],vn=o=>o==="grupo:recebidos"?"grupo:gerados":o==="grupo:gerados"?"grupo:recebidos":null,Ii=[["Meus","resp:eu",{comum:"pessoa"},""],["Recebidos","grupo:recebidos",{grade:"recebido"},""],["Gerados","grupo:gerados",{grade:"gerado"},""],["Atrasados","prazo:atrasado",{comum:"alerta"},"perigo"],["Vencem na semana","prazo:semana",{comum:"calendario"},"aviso"],["Sem respons\xE1vel","resp:sem",{grade:"semPessoa"},""],["N\xE3o visualizados","novo:sim",{grade:"olhoFechado"},""],["Novos desde a \xFAltima visita","novo:visita",{comum:"brilho"},"novo"],["Parados h\xE1 +30 dias","parado:>30d",{comum:"historico"},""]];function xn(o){let{doc:e}=o,r=o.inicial.processos,t=Vo(),a=[],n="",s=new Set,i=new Set(vr(e)),c=null,l={vistoEm:{}},d,m=null,f=!1,y=!1,A="",M={},P=!1,v=!1,S,E=!1,w=za(o.mover),C=new AbortController,z=()=>({hoje:o.hoje(),agora:o.agora(),...o.eu?{eu:o.eu}:{},...d!==void 0?{visitaAnterior:d}:{}}),T=e.createElement("div");T.id="spro-grade",T.setAttribute("data-spro-grade-host","1"),T.setAttribute("data-tema",o.escuro?"escuro":"claro");let h=T.attachShadow({mode:"open"}),L=e.createElement("style");L.textContent=o.css;let D=p("div",{class:`spro-app${o.escuro?" spro-escuro":""}`}),q=e.createElement("style");h.append(L,q,D);let W=Jt(h),$=p("input",{type:"search",class:"spro-busca",placeholder:"Buscar: texto, resp:ana, prazo:<7d, marcador:urgente...","aria-label":"Buscar processos",spellcheck:"false",autocomplete:"off"}),H=p("div",{class:"spro-chips"}),$o=p("div",{class:"spro-rapidos"}),lo=p("div",{class:"spro-status",role:"status","aria-live":"polite"}),yo=p("div",{class:"spro-lote",hidden:!0}),ee=p("div",{class:"spro-conteudo"}),Ao=p("div",{class:"spro-painel",hidden:!0}),Fr=p("div",{class:"spro-avisos","aria-live":"polite"}),jo=p("div",{class:"spro-ajuda-atalhos",hidden:!0},p("strong",{},"Atalhos"),...Di.map(([u,g])=>p("div",{},p("kbd",{},u),` ${g}`))),Sn=[["protocolo","N\xFAmero do processo"],["prazo","Prazo"],["tipo","Tipo"],["responsavel","Respons\xE1vel"],["marcador","Marcador"],["caixa","Tempo na caixa"],["parado","Parado h\xE1"],["novo","N\xE3o visualizados"]],Ne=Eo({rotulo:"Agrupar por",icone:"camadas",classe:"spro-combo-compacto",busca:!1,vazio:"Sem agrupamento",opcoes:Object.keys(Sr).map(u=>({valor:u,rotulo:u==="nenhum"?"Sem agrupamento":`Agrupar: ${Sr[u]}`})),valor:["nenhum"],aoMudar:([u])=>U({agrupar:u??"nenhum"})}),jr=Eo({rotulo:"Ordenar por",icone:"ordenar",classe:"spro-combo-compacto",busca:!1,vazio:"Ordem do SEI",opcoes:[{valor:"",rotulo:"Ordem do SEI"},...Sn.flatMap(([u,g])=>[{valor:`${u}:a`,rotulo:`${g} \u2191`,descricao:"Crescente"},{valor:`${u}:d`,rotulo:`${g} \u2193`,descricao:"Decrescente"}])],valor:[""],aoMudar:([u])=>{let[g,x]=(u??"").split(":");U({ordem:g?[{campo:g,decrescente:x==="d"}]:[]})}}),re=Pr([],z()),Re=(u,g,x,b,O)=>{let I=Eo({rotulo:u,vazio:g,icone:b,classe:"spro-combo-compacto",busca:!0,larguraLista:260,opcoes:()=>O().map(R=>({valor:R.valor,rotulo:R.rotulo,contagem:R.n})),aoMudar:([R])=>{R&&(U({busca:Va(t.busca,x,R)}),$.value=t.busca,I.definir([],!1))}});return I},Gr=Re("Filtrar por respons\xE1vel","Respons\xE1vel\u2026","resp","pessoa",()=>re.responsaveis),Ur=Re("Filtrar por tipo","Tipo\u2026","tipo","documento",()=>re.tipos),Br=Re("Filtrar por marcador","Marcador\u2026","marcador","etiqueta",()=>re.marcadores),Qr=(u,g)=>p("button",{type:"button",class:"spro-seg-b","data-modo":u,title:g,onclick:()=>U({modo:u})},oo(u==="tabela"?"lista":"quadro",16),p("span",{},g)),Xr=p("div",{class:"spro-seg",role:"group","aria-label":"Modo de exibi\xE7\xE3o"},Qr("tabela","Tabela"),Qr("quadro","Quadro")),te=(u,g,x,b="")=>p("button",{type:"button",class:`spro-bt ${b}`.trim(),title:g,"aria-label":g,onclick:x},oo(u,16),p("span",{},g)),Kr=te("colunas","Colunas",()=>To("colunas")),Pn=te("disquete","Vis\xF5es",()=>To("visoes")),Mn=te("lista","Exportar CSV",()=>Tn()),kn=p("button",{type:"button",class:"spro-bt spro-bt-icone",title:"Atalhos de teclado (?)","aria-label":"Atalhos de teclado",onclick:()=>{jo.hidden=!jo.hidden}},"?"),Jr=te("densidade","Densidade",()=>U({densidade:t.densidade==="compacta"?"confortavel":"compacta"})),ae=p("div",{class:"spro-quadro-cfg",hidden:!0});D.append(p("div",{class:"spro-barra"},Xr,p("div",{class:"spro-busca-caixa"},$),Ne.el,jr.el,Kr,Jr,Pn,Mn,kn),H,p("div",{class:"spro-faixa"},$o,Gr.el,Ur.el,Br.el),ae,jo,Ao,lo,yo,ee,Fr);let Wr=()=>va(r,l),Go=()=>qa(Wr(),t.busca,z()),_e=()=>Qa(Go(),t.ordem,z());function U(u){t={...t,...u},u.busca===void 0?o.armazem.gravarVisao(t).catch(()=>{}):Ln(),Z()}let qe;function Ln(){clearTimeout(qe),qe=setTimeout(()=>void o.armazem.gravarVisao(t).catch(()=>{}),400)}function ro(u,g){let x=p("div",{class:"spro-aviso",role:"status"},p("span",{},u));g&&x.append(p("button",{type:"button",class:"spro-link",onclick:()=>{g.fazer(),x.remove()}},g.rotulo)),x.append(p("button",{type:"button",class:"spro-aviso-x","aria-label":"Fechar aviso",onclick:()=>x.remove()},"\xD7")),Fr.append(x),setTimeout(()=>x.remove(),g?9e3:6e3).unref?.()}function zo(u,g){let x=new Set(i);for(let b of u)g?x.add(b):x.delete(b);i=x,Oa(e,x),Fe(),po()}let ne=new Map;function Mo(u,g){let x=r.find(b=>b.id===u);if(x){let b=ne.get(u)??{};for(let O of new Set([...Object.keys(x),...Object.keys(g)]))JSON.stringify(x[O])!==JSON.stringify(g[O])&&(b[O]=g[O]);ne.set(u,b)}r=r.map(b=>b.id===u?g:b)}let Zr=Promise.resolve();function Cn(u){ko+=1;let g=Zr.then(u,u);return Zr=g.catch(()=>{}).finally(()=>{ko-=1}),g}let Ve=null,He={raiz:h,extras:()=>(Ve??=(o.extras?o.extras().then(u=>(M=u,u)):Promise.resolve({})).catch(u=>{throw Ve=null,u}),Ve),todos:()=>r,selecionados:()=>i,corDoMarcador:u=>r.flatMap(g=>g.marcadores).find(g=>g.nome===u)?.cor??"",autor:o.eu??"",aplicarLocal:(u,g)=>{Mo(u,g),Z()},gravar:Cn,atribuir:(u,g)=>o.mover.atribuir(u,g),marcar:(u,g)=>o.mover.marcador(u,g),anotar:(u,g)=>o.anotar(u,g),aviso:u=>ro(u)};async function On(u,g,x){let b=r.find(j=>j.id===u);if(!b)return;let O=Ja(t.quadro.colunas,b,g,x);if(!O.ok)return ro(O.motivo);let I=Object.fromEntries((M.responsaveis??[]).map(j=>[j.sigla,j.nome]));Mo(u,Or(b,O.movimento,I)),Z(),ko+=1;let R=await w.mover(O.movimento).finally(()=>{ko-=1});if(!v){if(!R.ok)return Mo(u,b),Z(),ro(`N\xE3o foi poss\xEDvel mover ${b.protocolo}: ${R.erro}`);ro(`${b.protocolo} movido.`,{rotulo:"Desfazer",fazer:()=>{let j=r.find(to=>to.id===u)??b;Mo(u,Or(j,R.desfazer,I)),Z(),w.mover(R.desfazer).then(to=>{to.ok||v||(Mo(u,j),Z(),ro(`N\xE3o foi poss\xEDvel desfazer: ${to.erro}`))})}})}}let Dn=on(),ko=0,se=null,ie="",Yr=!1,ot=u=>({linhas:u,colunas:t.colunas,densidade:t.densidade,ctx:z(),ordem:t.ordem,selecionados:i,foco:c,icones:g=>Dn(e,g),nomesCompletos:Yr,editando:se,rascunho:ie,aoOrdenar:(g,x)=>U({ordem:Xa(t.ordem,g,x)}),aoSelecionar:(g,x)=>zo([g],x),aoGrupo:g=>{let x=new Set(s);x.has(g)?x.delete(g):x.add(g),s=x,o.armazem.gravarRecolhidos([...x]).catch(()=>{}),po()},aoMarcarGrupo:(g,x)=>zo(g,x),aoEditarEspec:g=>{se=g,ie=r.find(x=>x.id===g)?.especificacao??"",po()},aoDigitarEspec:g=>{ie=g},aoCancelarEspec:()=>{se=null,po()},aoSalvarEspec:g=>void In(g),aoAbrirPrazo:g=>o.abrirPrazo(g),aoEditar:(g,x)=>{let b=r.find(O=>O.id===g);b&&(x==="responsavel"?mn(He,b):x==="anotacao"?fn(He,b):gn(He,b))}}),ce=bn(ot([]));async function In(u){let g=r.find(b=>b.id===u),x=ie.trim();if(se=null,!g||x===g.especificacao.trim())return po();if(!x)return ro("A especifica\xE7\xE3o n\xE3o pode ficar vazia."),po();Mo(u,{...g,especificacao:x}),Z(),ko+=1;try{await o.editarEspecificacao(g.protocolo,x),ro(`Especifica\xE7\xE3o de ${g.protocolo} salva.`)}catch(b){Mo(u,g),Z(),ro(`N\xE3o foi poss\xEDvel salvar a especifica\xE7\xE3o: ${b instanceof Error?b.message:String(b)}`)}finally{ko-=1}}function po(){let u=_e();if(t.modo==="quadro"){ee.replaceChildren(Wa({processos:u,cfg:t.quadro,ctx:z(),extras:M,selecionados:i,aoMover:(x,b,O)=>void On(x,b,O),aoSelecionar:(x,b)=>zo([x],b)}));return}let g=Se(u,t.agrupar,z());ce.atualizar(ot(Ga(g,s,t.agrupar!=="nenhum"))),ee.firstElementChild!==ce.el&&ee.replaceChildren(ce.el)}function et(u){let g=[`${u} de ${r.length} processo${r.length===1?"":"s"}`],x=o.inicial.totais.recebidos+o.inicial.totais.gerados;f&&m?g.push(`carregando ${m.grupo} (${m.paginasLidas}/${m.paginasTotal})\u2026`):!y&&x>r.length&&g.push(`o SEI informa ${x}; os demais n\xE3o foram carregados`),A&&g.push(`aviso: ${A}`),lo.replaceChildren(g.join(" \xB7 ")),lo.classList.toggle("spro-status-alerta",!!A||!y&&!f&&x>r.length)}function Fe(){let u=i.size;if(yo.hidden=u===0,!u)return yo.replaceChildren();let g=new Set(Go().map(b=>b.id)),x=[...i].filter(b=>!g.has(b)).length;yo.replaceChildren(p("strong",{},`${u} selecionado${u===1?"":"s"}`),...x?[p("span",{class:"spro-suave"},`(${x} fora do filtro atual)`)]:[],...o.acoes().map(b=>p("button",{type:"button",class:"spro-bt",title:b.rotulo,onclick:()=>{let O=Ia(b,i.size);!O.ok&&O.motivo&&ro(O.motivo)}},p("img",{src:b.icone,alt:"",width:"16",height:"16"}),p("span",{},b.rotulo))),p("button",{type:"button",class:"spro-link",onclick:()=>zo([...i],!1)},"Limpar sele\xE7\xE3o"))}function $n(){let u=wr(t.busca);H.replaceChildren(...u.tokens.map(x=>p("span",{class:`spro-chip${x.termo.negado?" spro-chip-neg":""}`},x.texto,p("button",{type:"button","aria-label":`Remover ${x.texto}`,onclick:()=>{U({busca:we(t.busca,x.texto)}),$.value=t.busca}},"\xD7")))),H.hidden=!u.tokens.length;let g=new Set(u.tokens.map(x=>x.texto));$o.replaceChildren(...Ii.map(([x,b,O,I])=>p("button",{type:"button",title:`${x}
Filtro: ${b}`,"aria-label":x,class:`spro-rapido${I?` spro-rapido-${I}`:""}${g.has(b)?" spro-rapido-on":""}`,"aria-pressed":String(g.has(b)),onclick:()=>{U({busca:g.has(b)?we(t.busca,b):`${vn(b)?we(t.busca,vn(b)):t.busca} ${b}`.trim()}),$.value=t.busca}},"comum"in O?_(O.comum,14,e):oo(O.grade,14,e),p("span",{class:"spro-rapido-rotulo"},x)))),rt()}let go=T.shadowRoot.querySelector(".spro-faixa");function rt(){v||(go.classList.remove("spro-faixa-c1","spro-faixa-c2"),go.clientWidth&&(go.scrollWidth>go.clientWidth+1&&go.classList.add("spro-faixa-c1"),go.scrollWidth>go.clientWidth+1&&go.classList.add("spro-faixa-c2")))}let tt=e.defaultView?.ResizeObserver,at=tt?new tt(()=>rt()):null;at?.observe(go);function Z(){if(v)return;re=Pr(Wr(),z());for(let g of[Gr,Ur,Br])g.atualizar();Ne.definir([t.agrupar],!1),Ne.el.disabled=t.modo==="quadro",jr.definir([t.ordem[0]?`${t.ordem[0].campo}:${t.ordem[0].decrescente?"d":"a"}`:""],!1);for(let g of Xr.querySelectorAll("[data-modo]"))g.setAttribute("aria-pressed",String(g.getAttribute("data-modo")===t.modo));Jr.title=t.densidade==="compacta"?"Linhas confort\xE1veis":"Linhas compactas",Kr.hidden=t.modo==="quadro",zn(),$n(),po(),et(Go().length),Fe(),t.modo==="quadro"&&!P&&o.extras&&(P=!0,o.extras().then(g=>{M=g,v||po()}).catch(()=>{}))}function zn(){if(ae.hidden=t.modo!=="quadro",ae.hidden)return;let u=t.quadro,g=Eo({rotulo:"Colunas do quadro",icone:"mapa",classe:"spro-combo-compacto",busca:!1,opcoes:[{valor:"marcador",rotulo:"Colunas: marcador"},{valor:"responsavel",rotulo:"Colunas: respons\xE1vel"},{valor:"prazo",rotulo:"Colunas: prazo (leitura)"},{valor:"tipo",rotulo:"Colunas: tipo (leitura)"}],valor:[u.colunas],aoMudar:([O])=>{P=!1,U({quadro:{...u,colunas:O??"marcador"}})}}),x=p("input",{type:"number",min:"0",max:"99",class:"spro-num",value:String(u.limite),"aria-label":"Limite de cart\xF5es por coluna (0 = sem limite)",title:"Limite de cart\xF5es por coluna (0 = sem limite)",onchange:O=>U({quadro:{...u,limite:Math.max(0,Math.min(99,Number(O.target.value)||0))}})}),b=p("input",{type:"checkbox",onchange:O=>U({quadro:{...u,raiasPorResponsavel:O.target.checked}})});b.checked=u.raiasPorResponsavel,ae.replaceChildren(g.el,p("label",{class:"spro-rotulo-inline"},"Limite ",x),p("label",{class:"spro-rotulo-inline"},b," Raias por respons\xE1vel"),p("span",{class:"spro-suave"},u.colunas==="marcador"||u.colunas==="responsavel"?"Arraste os cart\xF5es entre as colunas.":"Esta divis\xE3o \xE9 s\xF3 de leitura."))}function To(u){if(!Ao.hidden&&Ao.getAttribute("data-qual")===u){Ao.hidden=!0;return}if(Ao.setAttribute("data-qual",u),Ao.hidden=!1,u==="colunas"){Ao.replaceChildren(p("strong",{},"Colunas"),...qo.map(I=>{let R=p("input",{type:"checkbox",disabled:I==="processo"});return R.checked=t.colunas.includes(I),R.addEventListener("change",()=>{let j=R.checked?qo.filter(to=>to===I||t.colunas.includes(to)):t.colunas.filter(to=>to!==I);U({colunas:j})}),p("label",{class:"spro-rotulo-linha"},R,` ${Oo[I]}`)}),p("button",{type:"button",class:"spro-link",onclick:()=>U({colunas:Vo().colunas})},"Restaurar padr\xE3o"));return}let g=p("input",{type:"text",class:"spro-nome",maxlength:"40",placeholder:"Nome da vis\xE3o","aria-label":"Nome da vis\xE3o"}),x=a.find(I=>I.id===n);g.value=x?.nome??"";let b=async(I,R=a)=>{a=I,await o.armazem.gravarVisoes(I,R).catch(()=>ro("N\xE3o foi poss\xEDvel sincronizar as vis\xF5es."))},O=async I=>{let R={...t,nome:g.value.trim()||"Minha vis\xE3o",id:I==="atualizar"?n:""},j=ya(a,R,o.novoId);if(!j)return ro("Limite de vis\xF5es salvas atingido.");n=j.visao.id,await b(j.lista),ro(`Vis\xE3o "${j.visao.nome}" salva.`),To("visoes"),To("visoes")};Ao.replaceChildren(p("strong",{},"Vis\xF5es salvas"),a.length?p("ul",{class:"spro-lista-visoes"},...a.map(I=>p("li",{},p("button",{type:"button",class:`spro-link${I.id===n?" spro-ativa":""}`,onclick:()=>{n=I.id,$.value=I.busca,U({...I,id:""})}},I.nome),p("button",{type:"button",class:"spro-aviso-x","aria-label":`Excluir ${I.nome}`,title:"Excluir",onclick:async()=>{await b(Aa(a,I.id),a),n===I.id&&(n=""),To("visoes"),To("visoes")}},"\xD7")))):p("p",{class:"spro-suave"},"Nenhuma vis\xE3o salva ainda."),p("div",{class:"spro-linha-form"},g,p("button",{type:"button",class:"spro-bt",onclick:()=>void O("nova")},"Salvar como nova"),x&&Ea(t,x)?p("button",{type:"button",class:"spro-bt",onclick:()=>void O("atualizar")},"Atualizar"):null))}function Tn(){let u=Fa(_e(),t.modo==="quadro"?[...qo]:t.colunas,z());o.baixar(ja(o.hoje()),Sa(u),"text/csv;charset=utf-8"),ro(`${u.length-1} processos exportados.`)}$.addEventListener("input",()=>{let u=$.value;if(o.semDebounce)return U({busca:u});clearTimeout(S),S=setTimeout(()=>U({busca:u}),120)}),$.addEventListener("keydown",u=>{u.key==="Escape"&&($.value="",U({busca:""}),$.blur())});function nt(u){if(v||u.ctrlKey||u.metaKey||u.altKey)return;let g=u.target;if(g&&(/^(input|textarea|select)$/i.test(g.tagName)||g.isContentEditable)||T.hidden)return;let b=u.key;if(E){E=!1,b==="t"?U({modo:"tabela"}):b==="q"&&U({modo:"quadro"});return}let O=_e().map(R=>R.id),I=c?O.indexOf(c):-1;if(b==="/")u.preventDefault(),$.focus();else if(b==="?")jo.hidden=!jo.hidden;else if(b==="g")E=!0;else if(b==="Escape")i.size&&zo([...i],!1);else if((b==="j"||b==="k")&&t.modo==="tabela"&&O.length)c=O[Math.max(0,Math.min(O.length-1,I+(b==="j"?1:-1)))],po(),ce.mostrar(c);else if(b==="x"&&c)r.find(j=>j.id===c)?.naPaginaAtual&&zo([c],!i.has(c));else if(b==="Enter"&&c){let R=r.find(j=>j.id===c)?.link;R&&e.defaultView?.location.assign(R)}}e.addEventListener("keydown",nt);let Nn=Da(e,u=>{i=u,Fe(),po()}),Rn=o.armazem.aoMudarVisoes(()=>void o.armazem.lerVisoes().then(u=>{a=u}).catch(()=>{})),je=new Map;function Ge(){if(v||ko>0)return;let u=Ro(e),g=new Map(u.processos.map(b=>[b.id,b])),x=!1;r=r.map(b=>{if(!b.naPaginaAtual)return b;let O=g.get(b.id);if(!O)return b;let I=ne.get(b.id),R=$r(e,b.id),j=je.get(b.id);je.set(b.id,R);let to=O;if(I){for(let Xe of Object.keys(I))JSON.stringify(O[Xe])===JSON.stringify(I[Xe])&&delete I[Xe];Object.keys(I).length?to={...O,...I}:ne.delete(b.id)}let lt=JSON.stringify(to)===JSON.stringify(b);return lt&&j===R?b:(x=!0,lt?b:to)}),x&&(Qe(),Z())}let Ue,st=e.defaultView?.MutationObserver,Be=st?new st(()=>{clearTimeout(Ue),Ue=setTimeout(Ge,o.semDebounce?0:150)}):null,it=e.querySelector("#frmProcedimentoControlar")??e.body;Be&&it&&Be.observe(it,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["aria-pressed","aria-label","onmouseover","src","href","class"]});function Qe(){let u=en(e);q.textContent!==u&&(q.textContent=u)}async function _n(){if(!o.fonte)return y=!0,ct(!0);f=!0,Z();let u=()=>o.fonte?.restaurarAoSair?.();e.defaultView?.addEventListener("pagehide",u);let g=await ma(o.inicial,o.fonte,{sinal:C.signal,aoProgresso:x=>{m=x,et(Go().length)},aoPagina:x=>{r=[...r,...x],Z()}});e.defaultView?.removeEventListener("pagehide",u),f=!1,y=g.completo,g.erro&&(A=g.erro),ct(g.completo)}function ct(u){l=gr(l,r.map(g=>g.id),o.agora(),u),o.armazem.gravarIdade(l).catch(()=>{}),Z()}async function qn(){try{let u=await o.armazem.lerEstado();t=u.visao,s=new Set(u.recolhidos),l=ba(u.idade,o.agora()),d=l.visitaAnterior,a=await o.armazem.lerVisoes()}catch{}l=gr(l,r.map(u=>u.id),o.agora(),!1),$.value=t.busca,Qe();for(let[u]of r.map(g=>[g.id]))je.set(u,$r(e,u));Z(),_n();for(let u of[1200,3500])setTimeout(()=>{Qe(),Ge()},u).unref?.()}return{host:T,iniciar:qn,render:Z,estado:()=>({visao:t,todos:r,selecionados:i,completo:y,carregando:f,filtrados:Go().length}),definirVisao:u=>{t={...t,...u},$.value=t.busca,Z()},fechar(){v=!0,C.abort(),clearTimeout(S),clearTimeout(qe),clearTimeout(Ue),Be?.disconnect(),at?.disconnect(),W(),e.removeEventListener("keydown",nt),Nn(),Rn(),T.remove()},mostrar:u=>{T.hidden=!u},definirNomesCompletos:u=>{Yr=u,Z()},sincronizar:Ge}}var yn=`/* Dentro do Shadow DOM: o base.css do sei-comum (tokens) vem antes deste arquivo. */
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
.spro-faixa-c1 .spro-rapido-rotulo { display: none; }
.spro-faixa-c1 .spro-rapido { width: 30px; padding: 0; justify-content: center; }
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
`;var An=`/* Na p\xE1gina do SEI (fora do Shadow DOM): o bot\xE3o alternador e o espa\xE7o da grade. */
/* Mesmo tamanho, margem e cor dos botoes vizinhos da barra de titulo (seta de recolher e ordenar os paineis). */
.spro-grade-botao { display: inline-flex; flex: none; align-items: center; justify-content: center; margin-left: 4px; padding: 2px; line-height: 0; color: inherit; vertical-align: middle; position: relative; top: -3px; cursor: pointer; background: none; border: 0; border-radius: 6px; }
.spro-grade-botao:hover { background: color-mix(in srgb, currentColor 14%, transparent); }
.spro-grade-botao[aria-pressed="true"] { background: color-mix(in srgb, currentColor 9%, transparent); }
.spro-grade-botao:focus-visible { outline: 2px solid #1f5fbf; outline-offset: 1px; }
/* Com a grade ativa a barra de acoes sobe um pouco e ganha respiro antes da barra de ferramentas da grade. */
html[data-spro-grade] #collapseControle { margin-top: -6px; margin-bottom: 22px; }
#spro-grade { display: block; width: 100%; flex: 0 0 100%; }
#spro-grade[hidden] { display: none; }
`;var Ti="gradecontrole";function Ni(){return new URL(location.href).searchParams.get("acao")==="procedimento_controlar"}var Yo=()=>!!document.body?.classList.contains("dark-mode")||dt(localStorage),So=!1,J=null,Po=null,Fo=null,En=0,Hr=!1,ze=null,wn=document.readyState!=="loading";function Ri(){let o=document.querySelector(ua);return document.getElementById("divTabelaProcesso")??o?.parentElement??null}function Io(o){Po?.pronta(),J?.mostrar(!1),he(document),o&&o!=="usuario"&&console.warn("[SEI Pro] Grade do controle indispon\xEDvel, usando a vis\xE3o nativa:",o)}function Te(){if(J||!So)return;let o=new me(location.href,()=>Xo(document,location.href)),e=tr(Xo(document,location.href)),r=e.unidade.id,t=wa({local:Ke(chrome.storage.local,"local"),sync:Ke(chrome.storage.sync,"sync")},String(r));if(["hdnRecebidosPaginaAtual","hdnGeradosPaginaAtual"].some(c=>document.getElementById(c)?.value&&document.getElementById(c).value!=="0")&&!sessionStorage.getItem("spro_grade_reset")){try{sessionStorage.setItem("spro_grade_reset","1")}catch{}mr(o.http,Xo(document,location.href)).restaurar().then(()=>location.reload()).catch(()=>Io("pagina intermediaria"));return}try{sessionStorage.removeItem("spro_grade_reset")}catch{}let n=Ro(document);if(!n.processos.length&&!n.totais.recebidos&&!n.totais.gerados)return Po?.pronta(),Io("caixa vazia");let s=Ri();if(!s)return Io("sem ponto de encaixe");let i=n.processos.filter(c=>!c.sigiloso&&c.naPaginaAtual).slice(0,6).map(c=>c.protocolo);J=xn({doc:document,inicial:n,agora:()=>Date.now(),hoje:()=>No(),eu:e.usuario.login||void 0,armazem:t,fonte:mr(o.http,Xo(document,location.href)),mover:{marcador:async(c,l)=>void await Vt(o,c,l,{aplicar:!0}),atribuir:async(c,l)=>void await qt(o,c,l,{aplicar:!0})},acoes:()=>Xt(document),css:`${mt}
${yn}`,escuro:Yo(),baixar:(c,l,d)=>ht(c,l,d),novoId:()=>ut(),extras:i.length?async()=>{let c=async m=>{let f;for(let y of i)try{return await Ct(o,m,y)}catch(A){f=A}return console.warn(`[SEI Pro] Grade: nao foi possivel ler a lista de ${m}`,f instanceof Error?f.message:f),[]},[l,d]=await Promise.all([c("marcadores"),c("usuarios")]);return{marcadores:l.map(m=>m.nome),responsaveis:d.map(m=>{let[f,...y]=m.nome.split(" - ");return{sigla:f.trim(),nome:y.join(" - ").trim()||f.trim()}})}}:void 0,aoVoltarNativa:()=>oe(),editarEspecificacao:async(c,l)=>void await It(o,c,{especificacao:l},{aplicar:!0}),abrirPrazo:c=>{document.documentElement.setAttribute("data-spro-prazos-alvo",c),document.dispatchEvent(new CustomEvent("spro-prazos-abrir"))},anotar:async(c,l)=>void await _t(o,c,l,{aplicar:!0})}),J.definirNomesCompletos(Hr),s.before(J.host),_i(),J.iniciar().then(()=>{Po?.pronta(),Co(document)&&cr(document)}).catch(c=>Io(String(c)))}function _i(){ze?.disconnect();let o=window.MutationObserver,e=!1;ze=new o(()=>{e||(e=!0,setTimeout(()=>{if(e=!1,!(!J||!So||J.host.isConnected&&!!J.host.shadowRoot&&document.querySelectorAll("#spro-grade").length===1||En>=6)){En+=1,J.fechar(),J=null;for(let t of document.querySelectorAll("#spro-grade"))t.remove();(Co(document)||So)&&Te()}},150))}),ze.observe(document.body??document.documentElement,{childList:!0,subtree:!0})}function oe(){Co(document)?(J?.mostrar(!1),he(document)):(ge(document,Yo()),J?(J.mostrar(!0),cr(document)):Te()),Fo?.(),Fo=ve(document,()=>Co(document),oe)}function qi(o){o!==So&&(So=o,Yt(localStorage,o),o?(ge(document,Yo()),Po=lr(Io),wn&&(Po.iniciarContagem(),Te()),Fo=ve(document,()=>Co(document),oe)):(Fo?.(),Fo=null,ze?.disconnect(),J?.fechar(),J=null,Po?.pronta(),he(document)))}function Vi(){if(!Ni())return;let o=document.createElement("style");o.textContent=An,(document.head??document.documentElement).append(o),Zt(localStorage)&&(So=!0,ge(document,Yo()),Po=lr(Io)),ra(document,oe),Wt(document,Yo);let e=()=>{wn=!0,So&&(Po?.iniciarContagem(),Te(),Fo??=ve(document,()=>Co(document),oe))};document.readyState==="loading"?document.addEventListener("DOMContentLoaded",e,{once:!0}):e();let r=a=>{Hr=Je(a,"nomesusuarios"),J?.definirNomesCompletos(Hr),qi(Je(a,Ti))},t=!1;chrome.storage.onChanged.addListener((a,n)=>{n!=="sync"||!("dataValues"in a)||(t=!0,r(a.dataValues.newValue))}),chrome.storage.sync.get("dataValues").then(a=>{t||r(a.dataValues)}).catch(()=>{So&&Io("sem prefer\xEAncias")})}Vi();})();
