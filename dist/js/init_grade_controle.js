/* GERADO por grade-controle/build.mjs. NAO EDITE. Rode: npm run build */
"use strict";(()=>{function na(o){let e={};for(let[t,r]of Object.entries(o)){let a={};r&&"newValue"in r&&(a.novo=r.newValue),r&&"oldValue"in r&&(a.antigo=r.oldValue),e[t]=a}return e}function mr(o,e){return{obter:(t=null)=>o.get(t),gravar:t=>o.set(t),remover:t=>o.remove(t),chaves:typeof o.getKeys=="function"?()=>o.getKeys():void 0,aoMudar(t){let r=(a,n)=>{n===e&&t(na(a))};return chrome.storage.onChanged.addListener(r),()=>chrome.storage.onChanged.removeListener(r)}}}var pe=o=>String(o).padStart(2,"0");function jo(o=new Date){return`${o.getFullYear()}-${pe(o.getMonth()+1)}-${pe(o.getDate())}`}function Vo(o){let e=/^(\d{4})-(\d{2})-(\d{2})$/.exec(o);if(!e)throw new Error(`Data inv\xE1lida: ${o}`);return new Date(Number(e[1]),Number(e[2])-1,Number(e[3]),12)}function Co(o,e){return Math.round((Vo(e).getTime()-Vo(o).getTime())/864e5)}function ro(o){let[e,t,r]=o.split("-");return`${r}/${t}/${e}`}function sa(o,e){let t=o;if(typeof o=="string"){if(!o.trim())return;try{t=JSON.parse(o)}catch{return}}return!Array.isArray(t)||t.length===0?void 0:t.map(a=>a?.configGeral).find(Array.isArray)?.find(a=>a?.name===e)?.value}function le(o,e){let t=sa(o,e);return t===!0||t===1||t==="1"}function de(o){try{return!!o.getItem("darkModePro")}catch{return!1}}function ue(o=crypto){if(typeof o.randomUUID=="function")return o.randomUUID();let e=o.getRandomValues(new Uint8Array(16));e[6]=(e[6]??0)&15|64,e[8]=(e[8]??0)&63|128;let t=[...e].map(r=>r.toString(16).padStart(2,"0")).join("");return`${t.slice(0,8)}-${t.slice(8,12)}-${t.slice(12,16)}-${t.slice(16,20)}-${t.slice(20)}`}var me=`/*
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
`;function d(o,e={},...t){let r=document.createElement(o);for(let[a,n]of Object.entries(e))n===void 0||n===!1||(typeof n=="function"?r.addEventListener(a.replace(/^on/,""),n):n===!0?r.setAttribute(a,""):a==="class"?r.className=n:a==="value"&&o==="textarea"?r.value=n:r.setAttribute(a,n));for(let a of t)a!=null&&a!==!1&&r.append(a);return r}var B={fill:"currentColor",stroke:"none"},fe="M12 3.2l2.7 5.5 6 .9-4.35 4.25 1 6L12 17l-5.35 2.85 1-6L3.3 9.6l6-.9z",ca={estrela:[["path",{d:fe}]],estrelaCheia:[["path",{d:fe,fill:"currentColor"}]],alvo:[["circle",{cx:"12",cy:"12",r:"7.5"}],["circle",{cx:"12",cy:"12",r:"3.2"}]],alvoAtivo:[["circle",{cx:"12",cy:"12",r:"6.6"}],["circle",{cx:"12",cy:"12",r:"2.4",fill:"currentColor"}],["path",{d:"M12 2.2v3.4M12 18.4v3.4M2.2 12h3.4M18.4 12h3.4"}]],pasta:[["path",{d:"M3.5 7.5a2 2 0 0 1 2-2h4l2 2h7a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2z"}]],etiqueta:[["path",{d:"M3.5 12.2V4.5a1 1 0 0 1 1-1h7.7l8.3 8.3a1 1 0 0 1 0 1.4l-7.1 7.1a1 1 0 0 1-1.4 0z"}],["circle",{cx:"8",cy:"8",r:"1.4",...B}]],relogio:[["circle",{cx:"12",cy:"12",r:"9"}],["path",{d:"M12 7.2V12l3.2 1.9"}]],nota:[["path",{d:"M6 3.5h9l3.5 3.5v13.5H6z"}],["path",{d:"M9 11h6"}],["path",{d:"M9 15h6"}]],lixeira:[["path",{d:"M4.5 6.5h15"}],["path",{d:"M9.5 6.5V4.8c0-.7.6-1.3 1.3-1.3h2.4c.7 0 1.3.6 1.3 1.3v1.7"}],["path",{d:"M6.8 6.5 7.6 19c0 .8.7 1.5 1.5 1.5h5.8c.8 0 1.5-.7 1.5-1.5l.8-12.5"}]],lapis:[["path",{d:"M17.5 3.5a2.1 2.1 0 0 1 3 3L9 18l-4.5 1.5L6 15z"}],["path",{d:"M15 6l3 3"}]],fechar:[["path",{d:"M18 6 6 18"}],["path",{d:"M6 6l12 12"}]],mais:[["path",{d:"M12 5v14"}],["path",{d:"M5 12h14"}]],busca:[["circle",{cx:"11",cy:"11",r:"6.5"}],["path",{d:"M20.5 20.5l-4.8-4.8"}]],baixar:[["path",{d:"M12 3.5v11"}],["path",{d:"M7.5 10.2 12 14.7l4.5-4.5"}],["path",{d:"M4.5 19.5h15"}]],subir:[["path",{d:"M12 14.5v-11"}],["path",{d:"M7.5 7.8 12 3.3l4.5 4.5"}],["path",{d:"M4.5 19.5h15"}]],copiar:[["rect",{x:"8.5",y:"8.5",width:"12",height:"12",rx:"2"}],["path",{d:"M15.5 8.5V5.5a2 2 0 0 0-2-2h-8a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h3"}]],restaurar:[["path",{d:"M9 14 4 9l5-5"}],["path",{d:"M4 9h9a7 7 0 0 1 7 7v4"}]],check:[["path",{d:"M20 6.5 9.2 17.3 4 12.1"}]],alerta:[["path",{d:"M10.3 4.4 2.8 17.6a2 2 0 0 0 1.7 3h15a2 2 0 0 0 1.7-3L13.7 4.4a2 2 0 0 0-3.4 0z"}],["path",{d:"M12 9.5v4"}],["circle",{cx:"12",cy:"16.8",r:"1",...B}]],menu:[["circle",{cx:"5",cy:"12",r:"1.4",...B}],["circle",{cx:"12",cy:"12",r:"1.4",...B}],["circle",{cx:"19",cy:"12",r:"1.4",...B}]],alca:[["circle",{cx:"9",cy:"6",r:"1.3",...B}],["circle",{cx:"15",cy:"6",r:"1.3",...B}],["circle",{cx:"9",cy:"12",r:"1.3",...B}],["circle",{cx:"15",cy:"12",r:"1.3",...B}],["circle",{cx:"9",cy:"18",r:"1.3",...B}],["circle",{cx:"15",cy:"18",r:"1.3",...B}]],ajustes:[["path",{d:"M4 7h5"}],["path",{d:"M13 7h7"}],["circle",{cx:"11",cy:"7",r:"2.1"}],["path",{d:"M4 17h9"}],["path",{d:"M17 17h3"}],["circle",{cx:"15",cy:"17",r:"2.1"}]],setaCima:[["path",{d:"M12 19V6"}],["path",{d:"M6 12l6-6 6 6"}]],setaBaixo:[["path",{d:"M12 5v13"}],["path",{d:"M18 12l-6 6-6-6"}]],recolher:[["path",{d:"M6 15l6-6 6 6"}]],expandir:[["path",{d:"M6 9l6 6 6-6"}]],local:[["path",{d:"M12 21s-6.5-6.1-6.5-11a6.5 6.5 0 0 1 13 0c0 4.9-6.5 11-6.5 11z"}],["circle",{cx:"12",cy:"10",r:"2.3"}]],sino:[["path",{d:"M6.5 16.5V11a5.5 5.5 0 0 1 11 0v5.5l1.5 1.5h-14z"}],["path",{d:"M10 20.5a2 2 0 0 0 4 0"}]],documento:[["path",{d:"M7 3.5h7l4 4v13H7z"}],["path",{d:"M14 3.5v4h4"}]],painel:[["rect",{x:"3.5",y:"4.5",width:"17",height:"15",rx:"2"}],["path",{d:"M14.5 4.5v15"}]],atualizar:[["path",{d:"M19.5 12a7.5 7.5 0 1 1-2.2-5.3"}],["path",{d:"M19.5 4.5v4h-4"}]],nuvem:[["path",{d:"M7 18.5h10a4 4 0 0 0 .6-7.95A5.5 5.5 0 0 0 7 9.5a4.5 4.5 0 0 0 0 9z"}]],chevron:[["path",{d:"M7 9.5l5 5 5-5"}]],pino:[["path",{d:"M9.5 3.5h5l-.8 5.2 3.3 3.1v1.7H7v-1.7l3.3-3.1z"}],["path",{d:"M12 13.5v7"}]],pinoCheio:[["path",{d:"M9.5 3.5h5l-.8 5.2 3.3 3.1v1.7H7v-1.7l3.3-3.1z",fill:"currentColor"}],["path",{d:"M12 13.5v7"}]],filtro:[["path",{d:"M4 5.5h16l-6.2 7.3v5.4l-3.6 1.8v-7.2z"}]],ordenar:[["path",{d:"M7.5 4.5v15"}],["path",{d:"M4 16l3.5 3.5L11 16"}],["path",{d:"M16.5 19.5v-15"}],["path",{d:"M13 8l3.5-3.5L20 8"}]],mapa:[["path",{d:"M9 4.5 3.5 6.6v13l5.5-2.1 6 2.1 5.5-2.1v-13L15 6.6z"}],["path",{d:"M9 4.5v13"}],["path",{d:"M15 6.6v13"}]],olho:[["path",{d:"M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z"}],["circle",{cx:"12",cy:"12",r:"2.8"}]],camadas:[["path",{d:"M12 3.5 20.5 8 12 12.5 3.5 8z"}],["path",{d:"M3.5 12 12 16.5 20.5 12"}],["path",{d:"M3.5 16 12 20.5 20.5 16"}]],historico:[["path",{d:"M3.8 12.5A8.3 8.3 0 1 0 6.2 6"}],["path",{d:"M3.8 4.2v4.3h4.3"}],["path",{d:"M12 8v4.2l2.8 1.7"}]],pessoa:[["circle",{cx:"12",cy:"8",r:"3.6"}],["path",{d:"M5 20c.9-3.7 3.6-5.6 7-5.6s6.1 1.9 7 5.6"}]],predio:[["path",{d:"M5 20.5v-15a1 1 0 0 1 1-1h7.5a1 1 0 0 1 1 1v15"}],["path",{d:"M14.5 9.5H18a1 1 0 0 1 1 1v10"}],["path",{d:"M3 20.5h18"}],["path",{d:"M8.5 8.5h3"}],["path",{d:"M8.5 12h3"}],["path",{d:"M8.5 15.5h3"}]],brilho:[["path",{d:"M12 3.5l1.9 5.1 5.1 1.9-5.1 1.9L12 17.5l-1.9-5.1L5 10.5l5.1-1.9z"}],["path",{d:"M18.5 16.5v4"}],["path",{d:"M16.5 18.5h4"}]],calendario:[["rect",{x:"4",y:"5.5",width:"16",height:"15",rx:"2"}],["path",{d:"M4 10h16"}],["path",{d:"M8.5 3.5v4"}],["path",{d:"M15.5 3.5v4"}]],cadeado:[["rect",{x:"5.5",y:"10.5",width:"13",height:"10",rx:"2"}],["path",{d:"M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5"}]],saida:[["path",{d:"M14 4.5h4.5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H14"}],["path",{d:"M10 16l4-4-4-4"}],["path",{d:"M14 12H4.5"}]],planilha:[["rect",{x:"4",y:"4",width:"16",height:"16",rx:"2"}],["path",{d:"M4 9.5h16"}],["path",{d:"M4 15h16"}],["path",{d:"M10 9.5V20"}]],mover:[["path",{d:"M4.5 12h14"}],["path",{d:"M13.5 6.5 19 12l-5.5 5.5"}]],sol:[["circle",{cx:"12",cy:"12",r:"3.8"}],["path",{d:"M12 2.8v2M12 19.2v2M2.8 12h2M19.2 12h2M5.5 5.5l1.4 1.4M17.1 17.1l1.4 1.4M5.5 18.5l1.4-1.4M17.1 6.9l1.4-1.4"}]],teclado:[["rect",{x:"3",y:"6.5",width:"18",height:"11",rx:"2"}],["path",{d:"M7 10h.01M10.3 10h.01M13.7 10h.01M17 10h.01M8 14h8"}]],gantt:[["path",{d:"M4 5h9M7 12h11M4 19h7"}],["path",{d:"M3 3v18"}]],demandas:[["circle",{cx:"10",cy:"7.8",r:"3.2"}],["path",{d:"M3.8 19.5a6.2 5.2 0 0 1 11.8-2.6"}],["circle",{cx:"17.6",cy:"17.6",r:"4.2"}],["path",{d:"m15.6 17.7 1.5 1.5 2.5-3"}]]},Jn=Object.keys(ca);function ge(o,e,t,r=1e4){let a=URL.createObjectURL(new Blob([e],{type:t})),n=d("a",{href:a,download:o});document.body.append(n),n.click(),n.remove(),setTimeout(()=>URL.revokeObjectURL(a),r).unref?.()}var E=class extends Error{codigo;detalhe;constructor(e,t,r){super(t),this.name="ErroSei",this.codigo=e,this.detalhe=r}paraJSON(){return{codigo:this.codigo,mensagem:this.message,detalhe:this.detalhe}}};function fr(o){if(o instanceof E)return o;if(o instanceof DOMException&&o.name==="AbortError")return new E("CANCELADO","Opera\xE7\xE3o cancelada.");let e=o instanceof Error?o.message:String(o);return new E("SEI_REDE",`Falha ao falar com o SEI: ${e}`)}var pa={AElig:198,Aacute:193,Acirc:194,Agrave:192,Aring:197,Atilde:195,Auml:196,Ccedil:199,ETH:208,Eacute:201,Ecirc:202,Egrave:200,Euml:203,Iacute:205,Icirc:206,Igrave:204,Iuml:207,Ntilde:209,Oacute:211,Ocirc:212,Ograve:210,Oslash:216,Otilde:213,Ouml:214,THORN:222,Uacute:218,Ucirc:219,Ugrave:217,Uuml:220,Yacute:221,aacute:225,acirc:226,acute:180,aelig:230,agrave:224,amp:38,apos:39,aring:229,atilde:227,auml:228,brvbar:166,bull:8226,ccedil:231,cedil:184,cent:162,copy:169,curren:164,deg:176,divide:247,eacute:233,ecirc:234,egrave:232,eth:240,euml:235,euro:8364,frac12:189,frac14:188,frac34:190,gt:62,hellip:8230,iacute:237,icirc:238,iexcl:161,igrave:236,iquest:191,iuml:239,laquo:171,ldquo:8220,lsquo:8216,lt:60,macr:175,mdash:8212,micro:181,middot:183,nbsp:160,ndash:8211,not:172,ntilde:241,oacute:243,ocirc:244,ograve:242,ordf:170,ordm:186,oslash:248,otilde:245,ouml:246,para:182,plusmn:177,pound:163,quot:34,raquo:187,rdquo:8221,reg:174,rsquo:8217,sect:167,shy:173,sup1:185,sup2:178,sup3:179,szlig:223,thorn:254,times:215,trade:8482,uacute:250,ucirc:251,ugrave:249,uml:168,uuml:252,yacute:253,yen:165,yuml:255};function D(o){return o.includes("&")?o.replace(/&(#x[0-9a-fA-F]+|#\d+|[a-zA-Z][a-zA-Z0-9]*);/g,(e,t)=>{let r=t[0]==="#"?t[1]==="x"||t[1]==="X"?parseInt(t.slice(2),16):parseInt(t.slice(1),10):pa[t];return r===void 0||Number.isNaN(r)?e:String.fromCodePoint(r)}):o}var he={128:8364,130:8218,131:402,132:8222,133:8230,134:8224,135:8225,136:710,137:8240,138:352,139:8249,140:338,142:381,145:8216,146:8217,147:8220,148:8221,149:8226,150:8211,151:8212,152:732,153:8482,154:353,155:8250,156:339,158:382,159:376};var xe=null;function Fo(o){return xe?xe(o):new DOMParser().parseFromString(o,"text/html")}function C(o){return(o?.textContent??"").replace(/\s+/g," ").trim()}var la={n:`
`,r:"\r",t:"	",b:"\b",f:"\f",v:"\v",0:"\0"};function gr(o,e){let t=o[e],r="";for(e+=1;e<o.length;){let a=o[e];if(a==="\\"){let n=o[e+1];if(n==="u"&&/^[0-9a-fA-F]{4}$/.test(o.slice(e+2,e+6))){r+=String.fromCharCode(parseInt(o.slice(e+2,e+6),16)),e+=6;continue}r+=la[n]??n,e+=2;continue}if(a===t)return[r,e+1];r+=a,e+=1}return[r,e]}function Uo(o,e){let t=[],r=e;for(;r<o.length;){let a=o[r];if(a===")")return[t,r+1];if(a===","||/\s/.test(a)){r+=1;continue}if(a==='"'||a==="'"){let[i,c]=gr(o,r);t.push(i),r=c;continue}let n=/^(null|true|false|-?\d+(?:\.\d+)?)/.exec(o.slice(r,r+32));if(n){let i=n[1];t.push(i==="null"?null:i==="true"?!0:i==="false"?!1:Number(i)),r+=i.length;continue}let s=0;for(;r<o.length;){let i=o[r];if(i==="(")s+=1;else if(i===")"){if(s===0)break;s-=1}else if(i===","&&s===0)break;r+=1}t.push(null)}return[t,r]}function co(o,e){let t=[],r=new RegExp(`\\b${e}\\(`,"g");for(let a of o.matchAll(r)){let[n]=Uo(o,a.index+a[0].length);t.push(n)}return t}function k(o){return typeof o=="string"?D(o):o==null?"":String(o)}var da=/controlador(?:_ajax)?\.php\?acao=[^"'\s<>\\]*?infra_hash=[0-9a-f]{64,192}/g;function eo(o){let e=new Set;for(let t of o.replace(/&amp;/g,"&").matchAll(da))e.add(t[0]);return[...e]}function N(o){let e=o.indexOf("?");return new URLSearchParams(e>=0?o.slice(e+1):"")}function G(o,e,t={}){let r=Array.isArray(o)?o:eo(o);for(let a of r){let n=N(a),s=n.get("acao")??"";if(!(typeof e=="string"?s!==e:!e.test(s))&&Object.entries(t).every(([i,c])=>n.get(i)===c))return a}return null}function be(o,e){let t=[...o.doc.querySelectorAll("#infraMenu a[href], #main-menu a[href], .infraMenu a[href]")].map(s=>s.getAttribute("href")??"").join(`
`),r=eo(t).filter(s=>N(s).get("acao")===e),n=(r.length?r:eo(o.html).filter(s=>N(s).get("acao")===e)).sort((s,i)=>[...N(s).keys()].length-[...N(i).keys()].length)[0];if(!n)throw new E("SEI_ACAO_INDISPONIVEL",`O menu do SEI n\xE3o oferece "${e}" para este usu\xE1rio.`);return n}function ua(o){let e=new Map;for(let t of o.matchAll(/Nos\[(\d+)\]\s*=\s*new\s+infraArvoreNo\(/g)){let[r]=Uo(o,t.index+t[0].length);e.set(Number(t[1]),{indice:Number(t[1]),args:r,props:{}})}for(let t of o.matchAll(/Nos\[(\d+)\]\.(\w+)\s*=\s*(['"])/g)){let r=e.get(Number(t[1]));if(!r)continue;let[a]=gr(o,t.index+t[0].length-1);r.props[t[2]]=a}return[...e.values()].sort((t,r)=>t.indice-r.indice)}function ma(o){let e=[];for(let t of o.matchAll(/new\s+infraArvoreAcao\(/g)){let[r]=Uo(o,t.index+t[0].length);e.push({tipo:k(r[0]),idPai:k(r[2]),href:k(r[3]),titulo:k(r[5]),icone:k(r[6]),extra:r[8]==null?void 0:k(r[8])})}return e}function ve(o,e){let t=o.find(s=>s.tipo==="NIVEL_ACESSO"&&s.idPai===e);if(!t)return{nivel:"publico"};let[r,...a]=t.titulo.split(`
`);return{nivel:/sigilos/i.test(r)||/sigiloso/.test(t.icone)?"sigiloso":"restrito",hipotese:a.join(" ").trim()||void 0}}function Ae(o){return[...new Set([...o.matchAll(/<img[^>]*\btitle="([^"]+)"/g)].map(e=>k(e[1])))]}var fa=/\s*\(\d{5,}\)\s*$/;function ga(o){let e=o.html,t=ua(e),r=ma(e),a=t.find(c=>c.args[0]==="PROCESSO");if(!a)throw new E("SEI_VERSAO_NAO_SUPORTADA","A \xE1rvore do processo n\xE3o tem o n\xF3 do processo.");let n=k(a.args[1]),s=ve(r,n),i=t.filter(c=>c.args[0]==="DOCUMENTO").map(c=>{let p=k(c.args[1]),m=k(c.args[5]),f=k(c.args[7]),b=(c.props.src??"").replace(/&amp;/g,"&"),A=r.find(y=>y.tipo==="ASSINATURA"&&y.idPai===p),{nivel:v,hipotese:h}=ve(r,p),P=(/documento_([a-z0-9]+)\.svg/.exec(f)?.[1]??"interno").replace("cancelado","interno");return{id:p,numero:k(c.args[15])||(/\((\d{5,})\)\s*$/.exec(m)?.[1]??""),titulo:m.replace(fa,""),pasta:c.args[2]&&String(c.args[2]).startsWith("PASTA")?String(c.args[2]):null,externo:/documento_download_anexo/.test(b)||!/documento_interno|documento_cancelado|formulario|email/.test(f),formato:P,nivel:v,hipotese:h,assinado:!!A,assinaturas:A?A.titulo.split(`
`).slice(1).filter(Boolean):[],cancelado:/documento_cancelado/.test(f),unidadeGeradora:r.find(y=>y.tipo==="UNIDADE_GERADORA"&&y.idPai===p)?.extra,link:k(c.args[3]).replace(/&amp;/g,"&"),src:b,acoes:eo(c.props.acoes??""),botoes:Ae(c.props.acoes??"")}});return{idProcedimento:n,protocolo:k(a.args[5])||k(a.args[15]),tipo:k(a.args[6]),nivel:s.nivel,hipotese:s.hipotese,marcadores:r.filter(c=>c.tipo==="MARCADOR"&&c.idPai===n).map(c=>c.titulo.replace(/^Marcador\n/,"").replace(/\n/g," \u2014 ")),documentos:i,acoesProcesso:eo(a.props.acoes??""),botoesProcesso:Ae(a.props.acoes??""),linkProcesso:k(a.args[3]).replace(/&amp;/g,"&"),sinais:r.filter(c=>c.idPai===n),links:eo(e),pagina:o}}async function ye(o,e,t){let r=await o.obter(e,t);if(!/acao=procedimento_visualizar/.test(r.url)){let a=r.doc.querySelector("#ifrArvore")?.getAttribute("src");if(!a)throw new E("SEI_NAO_ENCONTRADO","N\xE3o foi poss\xEDvel abrir a \xE1rvore do processo.");r=await o.obter(a,t)}if(/infraArvoreNo\("PASTA"/.test(r.html)){let a=G(r.html,"procedimento_visualizar")&&eo(r.html).find(n=>/abrir_pastas=1/.test(n));a&&(r=await o.obter(a,t))}return ga(r)}function ho(o,e,t){if(t){let r=o.documentos.find(a=>a.id===t);return r?G(r.acoes,e):null}return G(o.acoesProcesso,e)??G(o.links,e,{id_procedimento:o.idProcedimento})}function Go(o,e,t){let r=(e??"").trim(),a=(t??"").trim();return t===void 0||r===a?[]:[{campo:o,antes:r,depois:a}]}async function hr(o,e,t,r){let a=/controlador_ajax\.php\?acao_ajax=hipotese_legal_select[^'"]*/.exec(e.pagina.html)?.[0];return a?o.ajax(D(a),[["primeiroItemValor","null"],["primeiroItemDescricao"," "],["valorItemSelecionado",""],["staNivelAcesso",t]],{sinal:r}):e.opcoes("selHipoteseLegal").filter(n=>n.valor!=="null").map(n=>({id:n.valor,texto:n.texto}))}var Me="\xA5",xr="\xB1";function Ee(o){return o.map(e=>`${e.id}${xr}${e.texto}`).join(Me)}function ha(o){return o?o.split(Me).map(e=>{let[t,...r]=e.split(xr);return{id:t,texto:r.join(xr)}}):[]}function Se(o){let e=[];for(let t of o.matchAll(/new\s+infraLupaSelect\(\s*['"]([\w-]+)['"]\s*,\s*['"]([\w-]+)['"]/g))e.push([t[1],t[2]]);return e}var z=class o{constructor(e,t,r){this.http=e;this.pagina=t;this.elemento=r,this.id=r.id,this.action=(r.getAttribute("action")??"").replace(/&amp;/g,"&"),this.campos=xa(r),this.sincronizarLupas()}id;action;campos;elemento;static async abrir(e,t,r,a){let n=await e.obter(t,a);return o.de(n,r,e)}static de(e,t,r=null){let a=e.doc.querySelector(t);if(!a)throw new E("SEI_VERSAO_NAO_SUPORTADA",`A tela do SEI n\xE3o tem o formul\xE1rio esperado (${t}).`,C(e.doc.querySelector("title")));return new o(r,e,a)}pares(){return this.campos.map(e=>[e.nome,e.valor])}valor(e){return this.campos.find(t=>t.nome===e)?.valor}tem(e){return this.elemento.querySelector(`[name="${e}"]`)!==null||this.campos.some(t=>t.nome===e)}opcoes(e){let t=this.elemento.querySelector(`select[name="${e}"], select#${we(e)}`);return t?[...t.querySelectorAll("option")].map(r=>({valor:r.getAttribute("value")??C(r),texto:C(r),selecionada:r.hasAttribute("selected")})):[]}definir(e){for(let[t,r]of Object.entries(e)){if(r===void 0)continue;if(r===null){this.campos=this.campos.filter(n=>n.nome!==t);continue}let a=this.campos.find(n=>n.nome===t);a?a.valor=r:this.campos.push({nome:t,valor:r})}return this}escolher(e,t){let r=this.opcoes(e),a=T(t),n=r.find(s=>s.valor===t)??r.find(s=>T(s.texto)===a)??Pe(r.filter(s=>T(s.texto).includes(a)));if(!n)throw new E("ARGUMENTO_INVALIDO",`"${t}" n\xE3o \xE9 uma op\xE7\xE3o de ${e}.`,r.slice(0,40).map(s=>s.texto).join(" | "));return this.definir({[e]:n.valor}),n}linhas(e){return[...this.elemento.querySelectorAll(`${e} tr`)].filter(t=>t.querySelector("input[type=checkbox]"))}itensLupa(e){let t=this.hiddenDaLupa(e);return t?ha(this.valor(t)??""):[]}definirLupa(e,t){let r=this.hiddenDaLupa(e);if(!r)throw new E("SEI_VERSAO_NAO_SUPORTADA",`A lupa ${e} n\xE3o existe nesta tela.`);return this.definir({[r]:Ee(t)}),this.campos=this.campos.filter(a=>a.nome!==e&&a.nome!==`${e}[]`),this}async enviar(e={}){if(!this.http)throw new E("SEI_RESPOSTA_INESPERADA","Formul\xE1rio sem transporte HTTP.");if(!this.action)throw new E("SEI_VERSAO_NAO_SUPORTADA",`O formul\xE1rio ${this.id} n\xE3o tem action.`);let t=this.pares();e.botao&&t.push(this.botaoDeEnvio(e.botao));let r=await this.http.enviar(this.action,t,e);if(e.sucesso&&!e.sucesso(r))throw new E("SEI_RESPOSTA_INESPERADA",`O SEI n\xE3o confirmou ${e.operacao??"a opera\xE7\xE3o"}.`,`${C(r.doc.querySelector("title"))} \u2014 ${r.url.replace(/infra_hash=\w+/,"infra_hash=\u2026")}`);return r}botaoDeEnvio(e){let t=this.elemento.querySelector(`[name="${e}"]`)??Pe([...this.elemento.querySelectorAll('button[type="submit"][name^="sbm"], input[type="submit"][name^="sbm"]')]);return t?[t.getAttribute("name")??e,t.getAttribute("value")??C(t)??e]:[e,e]}hiddenDaLupa(e){let t=Se(this.pagina.html).find(([r])=>r===e);return t?t[1]:null}sincronizarLupas(){for(let[e,t]of Se(this.pagina.html)){let r=this.elemento.querySelector(`select#${we(e)}`);if(!r)continue;let a=[...r.querySelectorAll("option")].map(n=>({id:n.getAttribute("value")??"",texto:C(n)}));(this.valor(t)??"")||this.definir({[t]:Ee(a)}),this.campos=this.campos.filter(n=>n.nome!==e&&n.nome!==`${e}[]`)}}};function xa(o){let e=[];for(let t of o.querySelectorAll("input, select, textarea")){let r=t.getAttribute("name");if(!r||t.hasAttribute("disabled"))continue;let a=t.tagName.toLowerCase();if(a==="input"){let n=(t.getAttribute("type")??"text").toLowerCase();if(["submit","button","image","reset","file"].includes(n)||(n==="checkbox"||n==="radio")&&!t.hasAttribute("checked"))continue;e.push({nome:r,valor:t.getAttribute("value")??(n==="checkbox"||n==="radio"?"on":"")})}else if(a==="textarea")e.push({nome:r,valor:t.textContent??""});else{let n=[...t.querySelectorAll("option")],s=n.filter(p=>p.hasAttribute("selected")),i=t.hasAttribute("multiple"),c=s.length?s:!i&&n.length?[n[0]]:[];for(let p of c)e.push({nome:r,valor:p.getAttribute("value")??C(p)})}}return e}function T(o){return o.normalize("NFD").replace(/[\u0300-\u036F]/g,"").toLowerCase().replace(/\s+/g," ").trim()}function Pe(o){return o.length===1?o[0]:void 0}function we(o){return o.replace(/([^\w-])/g,"\\$1")}async function ba(o,e,t){let r=ho(e,"documento_escolher_tipo");if(!r)throw new E("SEI_ACAO_INDISPONIVEL",`N\xE3o \xE9 poss\xEDvel incluir documento no processo ${e.protocolo} (fechado na unidade?).`);let a=await z.abrir(o.http,r,"#frmDocumentoEscolherTipo",{sinal:t});if(a.tem("hdnFiltroSerie")&&a.valor("hdnFiltroSerie")!=="T"){let n=await a.definir({hdnFiltroSerie:"T"}).enviar({sinal:t});a=z.de(n,"#frmDocumentoEscolherTipo",o.http)}return a}function va(o){let e=new Map;for(let t of o.doc.querySelectorAll("[onclick*='escolher(']")){let r=/escolher\((-?\d+)\)/.exec(t.getAttribute("onclick")??"")?.[1];r&&!e.has(r)&&e.set(r,C(t))}for(let t of o.doc.querySelectorAll("a[href*='id_serie=']")){let r=N(t.getAttribute("href")??"").get("id_serie");r&&!e.has(r)&&e.set(r,C(t))}return[...e].filter(([,t])=>t).map(([t,r])=>({id:t,nome:r}))}async function ke(o,e,t){let r=await o.arvore(e,{sinal:t});return va((await ba(o,r,t)).pagina)}var Ce={tipos_processo:{acao:"procedimento_alterar",form:"#frmProcedimentoCadastro",campo:"selTipoProcedimento"},hipoteses_legais:{acao:"procedimento_alterar",form:"#frmProcedimentoCadastro",campo:"selHipoteseLegal"},usuarios:{acao:"procedimento_atribuicao_cadastrar",form:"#frmAtividadeAtribuir",campo:"selAtribuicao"},marcadores:{acao:"andamento_marcador_gerenciar",form:"#frmAndamentoMarcadorCadastro",campo:"selMarcador"},grupos_acompanhamento:{acao:"acompanhamento_gerenciar",form:"#frmAcompanhamentoCadastro",campo:"selGrupoAcompanhamento"}};async function br(o,e,t,r={}){let a;if(e==="tipos_documento")a=(await ke(o,t,r.sinal)).map(s=>({id:s.id,nome:s.nome}));else{let s=Ce[e];if(!s)throw new E("ARGUMENTO_INVALIDO",`Lista desconhecida: ${e}.`,Object.keys(Ce).concat("tipos_documento").join(" | "));let i=await o.arvore(t,{sinal:r.sinal}),c=ho(i,s.acao);if(!c)throw new E("SEI_ACAO_INDISPONIVEL",`Para listar ${e} use um processo aberto na sua unidade.`);if(e==="marcadores"&&(c=G((await o.http.obter(c,{sinal:r.sinal,aceitarValidacao:!0})).html,"andamento_marcador_cadastrar"),!c))throw new E("SEI_VERSAO_NAO_SUPORTADA","Tela de marcadores n\xE3o reconhecida.");let p=await z.abrir(o.http,c,s.form,{sinal:r.sinal,aceitarValidacao:!0});a=e==="hipoteses_legais"?(await hr(o,p,"1",r.sinal)).map(m=>({id:m.id,nome:m.texto})):p.opcoes(s.campo).filter(m=>m.valor&&m.valor!=="null"&&m.texto).map(m=>({id:m.valor,nome:m.texto}))}let n=r.filtro?T(r.filtro):"";return n?a.filter(s=>T(s.nome).includes(n)):a}async function Ie(o,e,t){let r=await o.arvore(e,{sinal:t});if(r.nivel==="sigiloso")throw new E("SEI_SIGILOSO","Processo sigiloso: o agente n\xE3o atua nele.");return r}function De(o,e,t){let r=ho(o,e);if(!r)throw new E("SEI_ACAO_INDISPONIVEL",`"${t}" n\xE3o est\xE1 dispon\xEDvel no processo ${o.protocolo} (processo fechado na unidade ou sem permiss\xE3o).`);return r}var Le=o=>e=>N(e.url).get("acao")!==o;async function Aa(o,e,t,r){let a=await o.http.obter(De(e,t.acao,t.nomeAcao),{sinal:r,aceitarValidacao:!0});if(a.doc.querySelector(t.form))return z.de(a,t.form,o.http);let n=(t.formularios??[]).map(s=>G(a.html,s)).find(Boolean);if(!n)throw new E("SEI_VERSAO_NAO_SUPORTADA",`A tela "${t.nomeAcao}" n\xE3o tem o formul\xE1rio esperado.`);return z.abrir(o.http,n,t.form,{sinal:r,aceitarValidacao:!0})}async function ya(o,e,t,r){let a=await Ie(o,e,r.sinal),n=await Aa(o,a,t,r.sinal),s=t.preparar(n),i={alvo:a.protocolo,mudancas:s,aplicado:!1,resumo:""};return s.length?r.aplicar?(await n.enviar({sinal:r.sinal,botao:t.botao,operacao:`${t.nomeAcao} em ${a.protocolo}`,sucesso:t.sucesso??Le(t.acao)}),o.invalidar(a.idProcedimento),{...i,aplicado:!0,resumo:t.resumo(a.protocolo).replace(/^Vai /,"")}):{...i,resumo:t.resumo(a.protocolo)}:{...i,resumo:"Nada a alterar: j\xE1 est\xE1 assim."}}function ze(o,e,t,r){return ya(o,e,{acao:"procedimento_atribuicao_cadastrar",nomeAcao:"Atribuir Processo",form:"#frmAtividadeAtribuir",botao:"sbmSalvar",preparar:a=>{let n=a.opcoes("selAtribuicao").find(p=>p.valor===a.valor("selAtribuicao")&&p.valor!=="null")?.texto??"";if(t===null)return a.definir({selAtribuicao:"null"}),[{campo:"Atribui\xE7\xE3o",antes:n||"(atribui\xE7\xE3o atual)",depois:"(nenhuma)"}];let s=T(t),i=a.opcoes("selAtribuicao").filter(p=>p.valor!=="null"),c=i.find(p=>p.valor===t)??i.find(p=>T(p.texto.split(" - ")[0])===s)??i.find(p=>T(p.texto.split(" - ").slice(1).join(" - "))===s)??(i.filter(p=>T(p.texto).includes(s)).length===1?i.find(p=>T(p.texto).includes(s)):void 0);if(!c)throw new E("ARGUMENTO_INVALIDO",`Usu\xE1rio "${t}" n\xE3o encontrado (ou amb\xEDguo) na unidade.`,i.map(p=>p.texto).join(" | "));return a.definir({selAtribuicao:c.valor}),Go("Atribui\xE7\xE3o",n,c.texto)},resumo:a=>t?`Processo ${a} atribu\xEDdo.`:`Atribui\xE7\xE3o removida de ${a}.`},r)}async function Ea(o,e,t){let r=De(e,"andamento_marcador_gerenciar","Gerenciar Marcador");return o.http.obter(r,{sinal:t,aceitarValidacao:!0})}function Oe(o){return[...o.doc.querySelectorAll("#tblMarcadores tr")].filter(t=>t.querySelector("input[type=checkbox]")).map(t=>{let r=[...t.querySelectorAll("td")];return{id:t.querySelector("input[type=checkbox]")?.getAttribute("value")??"",marcador:C(r[1]),texto:C(r[2]),usuario:C(r[3]),data:C(r[4])}})}async function $e(o,e,t,r){let a=await Ie(o,e,r.sinal),n=await Ea(o,a,r.sinal),s=Oe(n),i=T(t.marcador),c=s.find(b=>T(b.marcador)===i),p={alvo:a.protocolo,mudancas:[],aplicado:!1,resumo:""};if(t.remover){if(!c)return{...p,resumo:`O processo ${a.protocolo} n\xE3o tem o marcador "${t.marcador}".`};if(p.mudancas=[{campo:"Marcador",antes:`${c.marcador}${c.texto?`: ${c.texto}`:""}`,depois:""}],!r.aplicar)return{...p,resumo:`Vai remover o marcador "${c.marcador}" de ${a.protocolo}.`};let b=G(n.html,"andamento_marcador_remover");if(!b)throw new E("SEI_ACAO_INDISPONIVEL","A tela de marcadores n\xE3o oferece remo\xE7\xE3o.");let A=z.de(n,"#frmGerenciarMarcador",o.http);A.definir({hdnInfraItemId:c.id,hdnInfraItensSelecionados:c.id});let v=await o.http.enviar(b,A.pares(),{sinal:r.sinal,aceitarValidacao:!0});if(Oe(v).some(h=>h.id===c.id))throw new E("SEI_RESPOSTA_INESPERADA",`O SEI n\xE3o removeu o marcador "${c.marcador}".`);return o.invalidar(a.idProcedimento),{...p,aplicado:!0,resumo:`Marcador "${c.marcador}" removido de ${a.protocolo}.`}}let m;if(n.doc.querySelector("#frmAndamentoMarcadorCadastro"))m=z.de(n,"#frmAndamentoMarcadorCadastro",o.http);else{let b=G(n.html,"andamento_marcador_cadastrar");if(!b)throw new E("SEI_VERSAO_NAO_SUPORTADA","Esta vers\xE3o do SEI n\xE3o tem a tela de marcadores esperada (4.1 ou superior).");m=await z.abrir(o.http,b,"#frmAndamentoMarcadorCadastro",{sinal:r.sinal})}let f=m.escolher("selMarcador",t.marcador);return m.definir({hdnIdMarcador:f.valor,txaTexto:(t.texto??c?.texto??"").slice(0,250)}),p.mudancas=c?Go(`Texto do marcador ${f.texto}`,c.texto,t.texto):[{campo:"Marcador",antes:"",depois:`${f.texto}${t.texto?`: ${t.texto}`:""}`}],p.mudancas.length?r.aplicar?(await m.enviar({sinal:r.sinal,botao:"sbmSalvar",operacao:`o marcador em ${a.protocolo}`,sucesso:Le("andamento_marcador_cadastrar")}),o.invalidar(a.idProcedimento),{...p,aplicado:!0,resumo:`Marcador "${f.texto}" aplicado em ${a.protocolo}.`}):{...p,resumo:`Vai marcar ${a.protocolo} com "${f.texto}".`}:{...p,resumo:"Nada a alterar: o marcador j\xE1 est\xE1 assim."}}var Sa={"\u2010":"-","\u2011":"-","\u2012":"-","\u2013":"-","\u2014":"-","\u2015":"-","\u2212":"-","\u2018":"'","\u2019":"'","\u201A":"'","\u201B":"'","\u2032":"'","\u201C":'"',"\u201D":'"',"\u201E":'"',"\u201F":'"',"\u2033":'"',"\u2026":"...","\u2022":"-","\u2002":" ","\u2003":" ","\u2009":" ","\u202F":" ","\u205F":" ","\u200B":"","\u200C":"","\u200D":"","\u2060":"","\uFEFF":"","\u20AC":"EUR","\u2122":"(TM)","\u2192":"->","\u2190":"<-"};function Re(o,e="texto"){let t="";for(let r of o){let a=r.codePointAt(0);if(a<=255){t+=r;continue}let n=Sa[r];if(e==="html"){t+=n===""?"":`&#${a};`;continue}if(n!==void 0){t+=n;continue}let s=r.normalize("NFKD").replace(/[\u0300-\u036F]/g,"");t+=[...s].every(i=>i.codePointAt(0)<=255)?s:""}return t}var Pa=/[A-Za-z0-9\-_.*]/;function Ne(o){let e="";for(let t of o)t===" "?e+="+":Pa.test(t)?e+=t:e+="%"+t.charCodeAt(0).toString(16).toUpperCase().padStart(2,"0");return e}function _e(o,e={}){return o.map(([t,r])=>{let a=e[t]??"texto";return`${Ne(Re(t))}=${Ne(Re(r??"",a))}`}).join("&")}function vr(o){let e=o instanceof Uint8Array?o:new Uint8Array(o),t=[],r=16384;for(let a=0;a<e.length;a+=r){let n=e.subarray(a,a+r),s=new Array(n.length);for(let i=0;i<n.length;i+=1)s[i]=he[n[i]]??n[i];t.push(String.fromCharCode(...s))}return t.join("")}var Te="application/x-www-form-urlencoded; charset=ISO-8859-1";function qe(o,e,t){let r=null;return{url:o,status:e,html:t,get doc(){return r??=Fo(t)}}}function Ve(o,e={}){if(/\/login\.php/i.test(o.url)||/[?&]acao=(?:infra_)?sair\b/.test(o.url))throw new E("SEI_SESSAO_EXPIRADA","A sess\xE3o do SEI foi encerrada. Fa\xE7a login de novo no SEI e repita o pedido.");if(o.status>=500)throw new E("SEI_EXCECAO",`O SEI respondeu com erro ${o.status}.`);if(o.html.includes('id="divInfraExcecao"')){let t=o.doc.querySelector("#divInfraExcecao");if(t){let r=C(t);throw new E("SEI_EXCECAO",r||"O SEI exibiu uma p\xE1gina de erro.",r)}}if(!e.aceitarValidacao&&o.html.includes("txaInfraValidacao")){let t=o.doc.querySelector("#txaInfraValidacao")?.textContent?.trim()??"";if(t)throw new E("SEI_VALIDACAO",t,t)}return o}function je(o,e={}){let t=new URL(".",o),r=e.fetch??((...f)=>fetch(...f)),a=Math.max(1,e.concorrencia??3),n=0,s=[];async function i(f){n>=a&&await new Promise(b=>s.push(b)),n+=1;try{return await f()}finally{n-=1,s.shift()?.()}}let c=f=>new URL(f.replace(/&amp;/g,"&"),t).href;async function p(f,b,A){return i(async()=>{try{let v=await r(c(f),{credentials:"same-origin",redirect:"follow",...b,signal:A.sinal}),h=vr(await v.arrayBuffer());return Ve(qe(v.url||c(f),v.status,h),A)}catch(v){throw fr(v)}})}async function m(f,b={}){return i(async()=>{try{let A=await r(c(f),{credentials:"same-origin",redirect:"follow",signal:b.sinal}),v=new Uint8Array(await A.arrayBuffer()),h=(A.headers?.get("content-type")??"").split(";")[0].trim().toLowerCase();h==="text/html"&&Ve(qe(A.url||c(f),A.status,vr(v)),b);let P=A.headers?.get("content-disposition")??"",y=decodeURIComponent(/filename\*=UTF-8''([^;]+)/i.exec(P)?.[1]??/filename="?([^";]+)"?/i.exec(P)?.[1]??"");return{bytes:v,tipo:h,nome:y}}catch(A){throw fr(A)}})}return{base:t,absoluta:c,baixar:m,obter:(f,b={})=>p(f,{method:"GET"},b),enviar:(f,b,A={})=>p(f,{method:"POST",headers:{"Content-Type":Te},body:_e(b,A.modos)},A)}}function wa(o){let e=/Sistema Eletr(?:\u00F4|&ocirc;|\\u00F4)nico de Informa[^"]*?Vers(?:\u00E3|&atilde;)o\s*([\d.]+)/i.exec(o);return e?e[1]:/\.(?:js|svg|css)\?(\d+\.\d+\.\d+)-/.exec(o)?.[1]??""}function Ma(o){let e=o.doc.querySelector("#lnkInfraUnidade")?.getAttribute("onclick")??"",t=/infra_unidade_atual=(\d+)/.exec(e)?.[1];if(t)return t;let r=/[?&]infra_unidade_atual=(\d+)/.exec(o.url)?.[1];return r||(o.doc.querySelector("#selInfraUnidades option[selected]")?.getAttribute("value")??"")}function Ar(o){let e=o.doc,t=e.querySelector("#lnkInfraUnidade"),r=e.querySelector("#lnkUsuarioSistema")?.getAttribute("title")??"",[,a="",n="",s=""]=/^(.*?)\s*\(([^/)]+)(?:\/([^)]+))?/.exec(r)??[],i=wa(o.html);return{host:new URL(o.url).host,versao:i,maior:Number(i.split(".")[0])||0,unidade:{id:Ma(o),sigla:C(t)||C(e.querySelector("#selInfraUnidades option[selected]")),nome:t?.getAttribute("title")??""},usuario:{nome:a.trim(),login:n.trim(),orgao:s.trim()}}}var ka=3e4,Ho=class{constructor(e,t=null,r){this.paginaViva=t;this.http=je(e,r)}http;paginaBase=null;arvores=new Map;localizados=new Map;base(){let e=this.paginaViva?.();if(e&&e.html.includes("frmProtocoloPesquisaRapida"))return e;if(this.paginaBase)return this.paginaBase;if(e)return e;throw new E("SEI_NAO_ENCONTRADO","Abra uma tela do SEI (por exemplo, Controle de Processos) nesta aba.")}contexto(){return Ar(this.base())}linkMenu(e){return be(this.base(),e)}async renovarBase(e){return this.paginaBase=await this.http.obter(this.linkMenu("procedimento_controlar"),e),this.arvores.clear(),this.localizados.clear(),this.paginaBase}async localizar(e,t){let r=e.trim();if(!r)throw new E("ARGUMENTO_INVALIDO","Informe o n\xFAmero do processo ou o n\xBA SEI do documento.");let a=this.localizados.get(r);if(a)return a;let n=z.de(this.base(),"#frmProtocoloPesquisaRapida",this.http);n.definir({txtPesquisaRapida:r});let s=await n.enviar(t),i=N(s.url);if(i.get("acao")!=="procedimento_trabalhar")throw new E("SEI_NAO_ENCONTRADO",`Nada encontrado no SEI para "${r}", ou voc\xEA n\xE3o tem acesso a ele.`);let c=s.doc.querySelector("#ifrArvore")?.getAttribute("src");if(!c)throw new E("SEI_VERSAO_NAO_SUPORTADA","A tela do processo n\xE3o trouxe a \xE1rvore.");let m=N(D(c)).get("id_procedimento")??"",f=i.get("id_protocolo")??"",b={idProcedimento:m,idDocumento:f&&f!==m?f:void 0,linkArvore:D(c)};return this.localizados.set(r,b),b}async arvore(e,t={}){let r=await this.localizar(e,t),a=this.arvores.get(r.idProcedimento);if(a&&!t.forcar&&Date.now()-a.quando<ka)return a.arvore;let n=await ye(this.http,r.linkArvore,t);return this.arvores.set(r.idProcedimento,{quando:Date.now(),arvore:n}),n}invalidar(e){e?this.arvores.delete(e):this.arvores.clear()}async ajax(e,t,r){let a=await this.http.enviar(e,t,{...r,aceitarValidacao:!0}),n=[];for(let s of a.html.matchAll(/<option[^>]*value="([^"]*)"[^>]*>([^<]*)<\/option>/g))n.push({id:D(s[1]),texto:D(s[2]).trim()});for(let s of a.html.matchAll(/<item\s+([^>]*)>/g)){let i=Fo(`<i ${s[1]}></i>`).querySelector("i");n.push({id:i?.getAttribute("id")??"",texto:i?.getAttribute("descricao")??i?.getAttribute("complemento")??""})}return n.filter(s=>s.id&&s.id!=="null")}};function Bo(o,e=o.location?.href??"https://sei.invalido/sei/controlador.php"){return{url:e,status:200,get html(){return o.documentElement.outerHTML},doc:o}}var Ca="#divInfraBarraComandosSuperior a[onclick], #divInfraBarraComandosInferior a[onclick]";function Fe(o){let e=new Set,t=[];for(let r of o.querySelectorAll(Ca)){let a=/[?&]acao=([a-z0-9_]+)/.exec(r.getAttribute("onclick")??"")?.[1],n=r.querySelector("img");if(!a||!n||e.has(a))continue;e.add(a);let s=n.getAttribute("title")||n.getAttribute("alt")||a,i=n.getAttribute("src")??"";try{i=new URL(i,o.baseURI||o.location?.href).href}catch{}t.push({acao:a,rotulo:s,icone:i,elemento:r})}return t}var _="data-spro-grade",to="data-spro-grade-pronta",Oo="data-spro-grade-escuro",yr="spro_grade",Er="spro-grade-pre";var Oa="#tblProcessosRecebidos, #tblProcessosGerados, #tblProcessosDetalhado";function Ia(){let o=Oa.split(", ").map(r=>`html[${_}] ${r}`).join(`,
`),e=`html[${_}]:not([${to}]) #divTabelaProcesso::before,
html[${_}]:not([${to}]) #frmProcedimentoControlar:not(:has(#divTabelaProcesso))::before`,t=["#divFiltro","#newFiltro","#processosProActions"].map(r=>`html[${_}] ${r}`).join(`,
`);return`${o} { display: none !important; }
${t} { display: none !important; }
html[${_}] #divRecebidosAreaPaginacaoSuperior, html[${_}] #divRecebidosAreaPaginacaoInferior,
html[${_}] #divGeradosAreaPaginacaoSuperior, html[${_}] #divGeradosAreaPaginacaoInferior { display: none !important; }
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
html[${_}][${Oo}]:not([${to}]) #divTabelaProcesso::before,
html[${_}][${Oo}]:not([${to}]) #frmProcedimentoControlar:not(:has(#divTabelaProcesso))::before { --spro-sk: #2c333b; --spro-sk-2: #232a31; }
@keyframes spro-grade-pulso { 0%, 100% { opacity: 1; } 50% { opacity: 0.55; } }
@media (prefers-reduced-motion: reduce) {
  html[${_}]:not([${to}]) #divTabelaProcesso::before,
  html[${_}]:not([${to}]) #frmProcedimentoControlar:not(:has(#divTabelaProcesso))::before { animation: none; }
}`}function Ue(o){try{return o.getItem(yr)==="1"}catch{return!1}}function Ge(o,e){try{e?o.setItem(yr,"1"):o.removeItem(yr)}catch{}}function Qo(o,e){let t=o.documentElement;if(t.setAttribute(_,"1"),t.removeAttribute(to),e?t.setAttribute(Oo,"1"):t.removeAttribute(Oo),!o.getElementById(Er)){let r=o.createElement("style");r.id=Er,r.textContent=Ia(),(o.head??t).append(r)}}function Xo(o){let e=o.documentElement;e.removeAttribute(_),e.removeAttribute(to),e.removeAttribute(Oo),o.getElementById(Er)?.remove()}var xo=o=>o.documentElement.hasAttribute(_);function Sr(o){o.documentElement.setAttribute(to,"1")}function Pr(o,e={setTimeout:(t,r)=>setTimeout(t,r),clearTimeout:t=>clearTimeout(t)}){let t=!1,r,a=s=>{t||(t=!0,e.clearTimeout(n),e.clearTimeout(r),o(s))},n=e.setTimeout(()=>a("teto"),1e4);return{iniciarContagem(){t||(r=e.setTimeout(()=>a("prazo"),1500))},pronta(){t=!0,e.clearTimeout(n),e.clearTimeout(r)},falhou:s=>a(s),encerrada:()=>t}}var He="http://www.w3.org/2000/svg",Da={grade:[["rect",{x:"3.5",y:"4.5",width:"17",height:"15",rx:"2"}],["path",{d:"M3.5 9.5h17M9 9.5v10M3.5 14.5h17"}]],quadro:[["rect",{x:"3.5",y:"4.5",width:"4.6",height:"15",rx:"1.2"}],["rect",{x:"9.7",y:"4.5",width:"4.6",height:"9",rx:"1.2"}],["rect",{x:"15.9",y:"4.5",width:"4.6",height:"12",rx:"1.2"}]],lista:[["path",{d:"M8 6.5h12M8 12h12M8 17.5h12M4 6.5h.01M4 12h.01M4 17.5h.01"}]],agrupar:[["path",{d:"M4 6h16M4 12h10M4 18h13"}],["path",{d:"M18 10l3 2-3 2"}]],colunas:[["rect",{x:"3.5",y:"4.5",width:"17",height:"15",rx:"2"}],["path",{d:"M9.2 4.5v15M14.8 4.5v15"}]],disquete:[["path",{d:"M5 4.5h11l3.5 3.5v11a1.5 1.5 0 0 1-1.5 1.5H6.5A1.5 1.5 0 0 1 5 19z"}],["path",{d:"M8 4.5v5h7v-5M8 20v-6h8v6"}]],densidade:[["path",{d:"M4 6h16M4 10h16M4 14h16M4 18h16"}]],seta:[["path",{d:"M6 9l6 6 6-6"}]],setaDireita:[["path",{d:"M9 6l6 6-6 6"}]],desfazer:[["path",{d:"M9 14L4 9l5-5M4 9h10a6 6 0 0 1 0 12h-3"}]],bloquear:[["circle",{cx:"12",cy:"12",r:"8.5"}],["path",{d:"M6 6l12 12"}]],informacao:[["circle",{cx:"12",cy:"12",r:"8.5"}],["path",{d:"M12 11v5M12 8h.01"}]]};function ao(o,e=16,t=document){let r=t.createElementNS(He,"svg"),a={viewBox:"0 0 24 24",width:String(e),height:String(e),fill:"none",stroke:"currentColor","stroke-width":"1.8","stroke-linecap":"round","stroke-linejoin":"round","aria-hidden":"true",focusable:"false",class:"spro-icone"};for(let[n,s]of Object.entries(a))r.setAttribute(n,s);for(let[n,s]of Da[o]){let i=t.createElementNS(He,n);for(let[c,p]of Object.entries(s))i.setAttribute(c,p);r.append(i)}return r}var wr="spro-grade-botao",La="#processosSEIPro .titlePanelHome, #processosSEIPro #divInfraBarraLocalizacao, #divInfraBarraLocalizacao.titlePanelHome, #divInfraBarraLocalizacao",za="Usar a vis\xE3o nova do controle de processos",$a="Voltar \xE0 vis\xE3o nativa do SEI";function Ra(o,e,t){let r=o.querySelector(La);if(!r)return!1;let a=e?$a:za,n=r.querySelector(`.${wr}`);if(!n){n=o.createElement("button"),n.type="button",n.className=wr,n.addEventListener("click",i=>{i.preventDefault(),i.stopPropagation(),t()}),n.append(ao("grade",18,o));let s=r.querySelector(".spro-fav-recolher");s?s.before(n):r.append(n)}return n.title=a,n.setAttribute("aria-label",a),n.setAttribute("aria-pressed",String(e)),!0}var Be=o=>{for(let e of o.querySelectorAll(`.${wr}`))e.remove()};function Ko(o,e,t){let r=()=>Ra(o,e(),t);r();let a=o.defaultView?.MutationObserver;if(!a||!o.body)return()=>Be(o);let n=!1,s=new a(()=>{n||(n=!0,queueMicrotask(()=>{n=!1,s.disconnect(),r(),s.observe(o.body,{childList:!0,subtree:!0})}))});return s.observe(o.body,{childList:!0,subtree:!0}),()=>{s.disconnect(),Be(o)}}function X(o){return o.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/\s+/g," ").trim()}var Na=/<div(?: style="text-decoration: line-through;")?><i class="(far fa-square|fas fa-check-square)"><\/i> ?([\s\S]*?)<\/div>/g;function _a(o){return o.includes("<div")?o.replace(Na,(e,t,r)=>`
${t==="far fa-square"?"[ ]":"[X]"} ${r}
`).replace(/\n{2,}/g,`
`).trim():o}var Ta=/^Anota[\u00e7c][\u00e3a]o( com prioridade)?\s+\/\s+([\s\S]*)\s+\/\s+(.*)$/i;function Qe(o){let e=o.querySelector('a[href*="acao=anotacao_registrar"]');if(!e)return null;let t=e.querySelector("img")?.getAttribute("src")??"",r=/anotacao2\.|prioridade/i.test(t),a=Ta.exec(e.getAttribute("aria-label")??"");if(a){let i=D(a[2]).replace(/\r\n?/g,`
`).trim();return i?{texto:i,autor:a[3].trim(),prioridade:!!a[1]||r}:null}let n=co(e.getAttribute("onmouseover")??"","infraTooltipMostrar")[0];if(typeof n?.[0]!="string")return null;let s=_a(k(n[0])).trim();return s?{texto:s,autor:k(n[1]).trim(),prioridade:r}:null}function Xe(o,e,t){if(e){let a={idProcedimento:o,origem:"nativo",vencimento:e.data,idControlePrazo:e.idControlePrazo,sigla:e.sigla,linkNativo:e.link,...e.concluidoEm?{concluidoEm:e.concluidoEm}:{}};return t?.vencimento&&t.data===e.data?{...a,origem:"ambos",hora:t.hora,texto:t.texto||void 0}:a}if(!t)return null;let r={idProcedimento:o,origem:"marcador",hora:t.hora,texto:t.texto||void 0};return t.vencimento?{...r,vencimento:t.data}:{...r,inicio:t.data}}var qa='a[href*="acao=controle_prazo_definir"]',Va=/^Controle de Prazo\s*\/\s*(\S+)\s+(\d{2})\/(\d{2})\/(\d{4})\s*\(([^)]*)\)\s*$/s,Ke=(o,e,t)=>`${t}-${e}-${o}`;function ja(o){let e=o.trim().toLowerCase(),t=/^conclu[i\u00ED]do em (\d{2})\/(\d{2})\/(\d{4})$/.exec(e);return t?{estado:"concluido",concluidoEm:Ke(t[1],t[2],t[3])}:/^at[e\u00E9] hoje$/.test(e)?{estado:"hoje"}:/^atrasado \d+ dias?$/.test(e)?{estado:"atrasado"}:/^\d+ dias?$/.test(e)?{estado:"noPrazo"}:null}function Mr(o){let e=o.querySelector(qa);if(!e)return null;let t=e.getAttribute("aria-label")??"";if(!t){let p=co(e.getAttribute("onmouseover")??"","infraTooltipMostrar")[0];typeof p?.[0]=="string"&&(t=`Controle de Prazo / ${k(p[0])}`)}let r=Va.exec(D(t).replace(/\s+/g," ").trim());if(!r)return null;let a=ja(r[5]);if(!a)return null;let n=D(e.getAttribute("href")??""),s=N(n),i=s.get("id_controle_prazo")??"",c=s.get("id_procedimento")??o.id.replace(/^P/,"");return!i||!c?null:{idControlePrazo:i,idProcedimento:c,sigla:r[1],data:Ke(r[2],r[3],r[4]),link:n,...a}}var Je=/(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(\d{4})/,Ze=/\b([01]?\d|2[0-3]):([0-5]\d)\b/,We=new RegExp("(?<!\\p{L})at[e\\u00E9](?!\\p{L})","iu");function Fa(o,e,t){let r=`${t}-${e}-${o}`;try{return jo(Vo(r))===r?r:null}catch{return null}}var Ua=o=>o.padStart(2,"0");function kr(o){let e=o.replace(/\r\n?/g,`
`),t=Je.exec(e);if(!t)return null;let r=Fa(t[1],t[2],t[3]);if(!r)return null;let a=Ze.exec(e),n=a?`${Ua(a[1])}:${a[2]}`:void 0,s=We.test(e),i=e.replace(We,"").replace(Je,"");return a&&(i=i.replace(Ze,"")),i=i.replace(/[ \t]+/g," ").replace(/^[ \t]*\n+|\n+[ \t]*$/g,"").trim(),{data:r,hora:n,vencimento:s,texto:i}}function Ye(o){let e=[];for(let t of o.querySelectorAll('a[href*="acao=andamento_marcador_gerenciar"]')){let r=co(t.getAttribute("onmouseover")??"","infraTooltipMostrar")[0];typeof r?.[0]=="string"&&e.push({texto:k(r[0]),nome:k(r[1])})}return e}function ot(o,e){let t=o.querySelector("input[type=checkbox]"),r=o.querySelector("a[href*='procedimento_trabalhar']");if(!t||!r)return null;let a=t.getAttribute("aria-label")??"",n=/^Sigiloso\b/.test(a)||/Sigiloso/.test(r.getAttribute("class")??""),s=[...o.querySelectorAll("td")],i=n?[]:[...s[1]?.querySelectorAll("a[aria-label]")??[]].map(c=>c.getAttribute("aria-label")??"");return{idProcedimento:t.getAttribute("value")??N(r.getAttribute("href")??"").get("id_procedimento")??"",protocolo:t.getAttribute("title")??C(r),grupo:e,tipo:/Tipo (.*?)(?: \/ Especifica|$)/.exec(a)?.[1]?.trim()??"",especificacao:n?"":/Especifica\S* (.*)$/.exec(a)?.[1]?.trim()??"",sigiloso:n,novo:/NaoVisualizado/.test(r.getAttribute("class")??""),atribuido:C(s[s.length-1]).replace(/^\(|\)$/g,""),sinais:i,documentoNovo:!!s[1]?.querySelector("img[src*='exclamacao']")||i.some(c=>/documento foi inclu/i.test(c))}}var Ga=/marcador_([a-z0-9_]+)\.svg/i;function Ha(o){let e=[];for(let t of o.querySelectorAll('a[href*="acao=andamento_marcador_gerenciar"]')){let r=co(t.getAttribute("onmouseover")??"","infraTooltipMostrar")[0],a=/^Marcador\s*\/\s*(.*)$/s.exec(D(t.getAttribute("aria-label")??"").trim()),n=(typeof r?.[1]=="string"&&r[1]?k(r[1]):a?.[1]??"").trim();n&&e.push({nome:n,cor:Ga.exec(t.querySelector("img")?.getAttribute("src")??"")?.[1]??"",texto:typeof r?.[0]=="string"?k(r[0]).trim():""})}return e}function Ba(o){let e=[];for(let t of o.querySelectorAll("a")){let r=t.querySelector("img")?.getAttribute("src")??"",a=/retorno_(programado|aguardando)(\d)?\.svg/.exec(r);if(!a)continue;let n=D(t.getAttribute("aria-label")??"").trim();e.push({tipo:a[1],descricao:n,atrasado:a[2]==="3"||/atrasad/i.test(n)})}return e}function Qa(o){let e=o.querySelector('a[href*="acao=procedimento_atribuicao_listar"], a.ancoraSigla'),t=e?.textContent?.trim();if(!e||!t)return;let r=D(e.getAttribute("title")??"").replace(/^Atribu[i\u00ED]do para\s+/i,"").trim();return{sigla:t,nome:r||t}}function Cr(o,e){let t=ot(o,e.grupo);if(!t?.idProcedimento)return null;let r=Ha(o),a=null;for(let c of Ye(o)){let p=kr(c.texto);if(p){a=p;break}}let n={id:t.idProcedimento,protocolo:t.protocolo,grupo:e.grupo,tipo:t.tipo,especificacao:t.especificacao,sigiloso:t.sigiloso,naoVisualizado:t.novo,marcadores:t.sigiloso?[]:r,retornos:t.sigiloso?[]:Ba(o),acompanhamentoEspecial:!t.sigiloso&&!!o.querySelector('a[href*="acao=acompanhamento"] , img[src*="acompanhamento_especial"]'),documentoNovo:t.documentoNovo,pagina:e.pagina,naPaginaAtual:e.naPaginaAtual},s=o.querySelector('a[href*="acao=procedimento_trabalhar"]')?.getAttribute("href");s&&(n.link=D(s));let i=Qa(o);if(i&&(n.atribuicao=i),!t.sigiloso){let c=Qe(o);c&&(n.anotacao=c);let p=Xe(n.id,Mr(o),a);p&&(n.prazo=p)}return n}var et="#tblProcessosRecebidos, #tblProcessosGerados, #tblProcessosDetalhado",Xa={recebidos:"tblProcessosRecebidos",gerados:"tblProcessosGerados"},Ka=[[/^tipo( do processo)?$/,"tipo"],[/^especificacao$/,"especificacao"],[/^(atribuicao|atribuido( para)?|responsavel)$/,"atribuicao"],[/^marcador(es)?$/,"marcador"],[/^prioridade$/,"prioridade"],[/^interessados?$/,"interessados"],[/^observacao$/,"observacao"],[/^ultima mov/,"ultimaMov"]];function Ja(o){let e=new Map;return[...(o.querySelector("thead tr")??[...o.querySelectorAll("tr")].find(r=>r.querySelector("th")))?.children??[]].forEach((r,a)=>{let n=X(r.textContent??""),s=Ka.find(([i])=>i.test(n));s&&e.set(a,s[1])}),e}function rt(o){let e=(o?.querySelector("caption")?.textContent??"").replace(/\s+/g," "),t=Number(/(\d+)\s+registro/.exec(e)?.[1]??0),r=/(\d+)\s+a\s+(\d+)\s*\)?/.exec(e);return{total:t,porPagina:r?Number(r[2])-Number(r[1])+1:0}}function Za(o,e,t){if(!t.size)return;let r=[...e.children];for(let[a,n]of t){let s=(r[a]?.textContent??"").replace(/\s+/g," ").trim();if(s)if(n==="tipo"&&!o.tipo)o.tipo=s;else if(n==="especificacao"&&!o.especificacao&&!o.sigiloso)o.especificacao=s;else if(n==="atribuicao"&&!o.atribuicao){let i=s.replace(/^\(|\)$/g,"");o.atribuicao={sigla:i,nome:i}}else if(n==="marcador"&&!o.marcadores.length&&!o.sigiloso)o.marcadores=[{nome:s,cor:"",texto:""}];else{if(o.sigiloso&&(n==="interessados"||n==="observacao"))continue;if(n==="prioridade")o.prioridade=s;else if(n==="interessados")o.interessados=s;else if(n==="observacao")o.observacao=s;else if(n==="ultimaMov"){let i=/(\d{2})\/(\d{2})\/(\d{4})/.exec(s);i&&(o.ultimaMov=`${i[3]}-${i[2]}-${i[1]}`)}}}}function Wa(o){let e=o.querySelector("input[type=checkbox]")?.getAttribute("name")??"";return/^chkGerados/i.test(e)?"gerados":"recebidos"}function Jo(o,e={}){let t=e.pagina??0,r=e.naPaginaAtual??!0,a=[],n={recebidos:0,gerados:0},s={recebidos:0,gerados:0},i=o.getElementById("tblProcessosDetalhado"),c=new Set,p=m=>{m&&!c.has(m.id)&&(c.add(m.id),a.push(m))};for(let m of["recebidos","gerados"]){let f=o.getElementById(Xa[m]),{total:b,porPagina:A}=rt(f);n[m]=b,s[m]=A;for(let v of f?.querySelectorAll('tr[id^="P"]')??[])p(Cr(v,{grupo:m,pagina:t,naPaginaAtual:r}))}if(i){let m=Ja(i),{total:f,porPagina:b}=rt(i);for(let A of i.querySelectorAll("tr")){if(!A.querySelector('a[href*="procedimento_trabalhar"]'))continue;let v=Wa(A),h=Cr(A,{grupo:v,pagina:t,naPaginaAtual:r});h&&!c.has(h.id)&&(Za(h,A,m),p(h),n[v]=Math.max(n[v],f),s[v]=Math.max(s[v],b))}}return{processos:a,totais:n,porPagina:s,visao:i?"detalhada":"resumida"}}var Ya=60;async function tt(o,e,t={}){let r=t.maxPaginas??Ya,a=[],n=new Set(o.processos.map(p=>p.id)),s=!0,i,c=!1;try{for(let p of["recebidos","gerados"]){let m=o.totais[p],f=o.processos.filter(v=>v.grupo===p).length,b=o.porPagina[p]||f||1,A=Math.max(1,Math.ceil(m/b));for(let v=1;f<m;v+=1){if(t.sinal?.aborted)return s=!1,{processos:a,completo:s,...i?{erro:i}:{}};if(v>=r){s=!1;break}c=!0;let h=await e.pagina(p,v,t.sinal),y=Jo(h,{pagina:v,naPaginaAtual:!1}).processos.filter(w=>w.grupo===p&&!n.has(w.id));if(!y.length)break;for(let w of y)n.add(w.id);f+=y.length,a.push(...y),t.aoPagina?.(y),t.aoProgresso?.({grupo:p,paginasLidas:v+1,paginasTotal:A,processos:f,total:m})}f<m&&(s=!1)}}catch(p){s=!1,i=p instanceof Error?p.message:String(p)}finally{if(c)try{await e.restaurar()}catch(p){i??=`N\xE3o foi poss\xEDvel voltar \xE0 primeira p\xE1gina: ${p instanceof Error?p.message:String(p)}`}}return{processos:a,completo:s,...i?{erro:i}:{}}}var on=["hdnRecebidosItensSelecionados","hdnGeradosItensSelecionados","hdnRecebidosItemId","hdnGeradosItemId"];function at(o,e){let t="#frmProcedimentoControlar",r=()=>({hdnRecebidosPaginaAtual:"0",hdnGeradosPaginaAtual:"0",...Object.fromEntries(on.map(a=>[a,""]))});return{async pagina(a,n,s){let i=a==="recebidos"?"hdnRecebidosPaginaAtual":"hdnGeradosPaginaAtual";return(await z.de(e,t,o).definir({...r(),[i]:String(n)}).enviar({sinal:s,aceitarValidacao:!0})).doc},async restaurar(a){await z.de(e,t,o).definir(r()).enviar({sinal:a,aceitarValidacao:!0})}}}var rn=30*6e4,nt=5e3,Or=()=>({vistoEm:{}});function it(o){if(!o||typeof o!="object")return Or();let e=o,t={};if(e.vistoEm&&typeof e.vistoEm=="object")for(let[i,c]of Object.entries(e.vistoEm))typeof c=="number"&&Number.isFinite(c)&&c>0&&(t[i]=c);let r=i=>typeof i=="number"&&Number.isFinite(i)?i:void 0,a={vistoEm:t},n=r(e.visitaAtual),s=r(e.visitaAnterior);return n!==void 0&&(a.visitaAtual=n),s!==void 0&&(a.visitaAnterior=s),a}function ct(o,e){return o.visitaAtual===void 0?{...o,visitaAtual:e}:e-o.visitaAtual>rn?{...o,visitaAnterior:o.visitaAtual,visitaAtual:e}:o}function Ir(o,e,t,r){let a={...o.vistoEm};for(let s of e)a[s]===void 0&&(a[s]=t);if(r){let s=new Set(e);for(let i of Object.keys(a))s.has(i)||delete a[i]}let n=Object.keys(a);if(n.length>nt)for(let s of n.sort((i,c)=>a[c]-a[i]).slice(nt))delete a[s];return{...o,vistoEm:a}}function pt(o,e){return o.map(t=>e.vistoEm[t.id]!==void 0?{...t,vistoEm:e.vistoEm[t.id]}:t)}function bo(o){if(o===null)return"";if(o<1)return"hoje";if(o===1)return"1 dia";if(o<60)return`${o} dias`;let e=Math.floor(o/30);return e<24?`${e} meses`:`${Math.floor(o/365)} anos`}var lt="Contado desde a primeira vez que o SEI Pro viu o processo nesta unidade (o SEI n\xE3o informa a data de chegada).";var vo=["processo","tipo","especificacao","responsavel","marcadores","prazo","anotacao","caixa","parado","sinais"],mo={processo:"Processo",tipo:"Tipo",especificacao:"Especifica\xE7\xE3o",responsavel:"Respons\xE1vel",marcadores:"Marcadores",prazo:"Prazo",anotacao:"Anota\xE7\xE3o",caixa:"Na caixa",parado:"Parado h\xE1",sinais:"Sinais"};var en=30,tn=40,an=()=>({colunas:"marcador",limite:0,raiasPorResponsavel:!1}),nn=["processo","tipo","responsavel","marcadores","prazo","anotacao"];function Ao(){return{id:"",nome:"Padr\xE3o",busca:"",ordem:[],agrupar:"nenhum",modo:"tabela",colunas:[...nn],densidade:"confortavel",quadro:an()}}var sn=["nenhum","responsavel","tipo","marcador","prazo","situacao","grupo","anotacao","acompanhamento","retorno","caixa"],cn=["protocolo","tipo","responsavel","marcador","prazo","caixa","parado","novo"],pn=["marcador","responsavel","prazo","tipo"];function Zo(o){let e=Ao();if(!o||typeof o!="object")return e;let t=o,r=Array.isArray(t.ordem)?t.ordem.filter(s=>!!s&&typeof s=="object"&&cn.includes(s.campo)).slice(0,4).map(s=>({campo:s.campo,decrescente:s.decrescente===!0})):[],a=Array.isArray(t.colunas)?[...new Set(t.colunas.filter(s=>vo.includes(s)))]:[],n=t.quadro&&typeof t.quadro=="object"?t.quadro:{};return{id:typeof t.id=="string"?t.id:"",nome:typeof t.nome=="string"&&t.nome.trim()?t.nome.trim().slice(0,tn):e.nome,busca:typeof t.busca=="string"?t.busca.slice(0,500):"",ordem:r,agrupar:sn.includes(t.agrupar)?t.agrupar:"nenhum",modo:t.modo==="quadro"?"quadro":"tabela",colunas:a.length?a:e.colunas,densidade:t.densidade==="compacta"?"compacta":"confortavel",quadro:{colunas:pn.includes(n.colunas)?n.colunas:"marcador",limite:typeof n.limite=="number"&&n.limite>0?Math.min(99,Math.floor(n.limite)):0,raiasPorResponsavel:n.raiasPorResponsavel===!0}}}function dt(o,e,t){let r=Zo(e),a=r.id?o.findIndex(s=>s.id===r.id):-1;if(a>=0){let s=[...o];return s[a]=r,{lista:s,visao:r}}if(o.length>=en)return null;let n={...r,id:t()};return{lista:[...o,n],visao:n}}var ut=(o,e)=>o.filter(t=>t.id!==e);function mt(o,e){let t=r=>JSON.stringify({...r,id:"",nome:""});return t(o)!==t(e)}var Wo="spro_grade_v_ids",Yo=o=>`spro_grade_v:${o}`,ln=o=>`spro_grade:${o||"x"}`;function dn(){return{visao:Ao(),idade:Or(),recolhidos:[]}}function un(o){if(!o||typeof o!="object")return dn();let e=o;return{visao:Zo(e.visao),idade:it(e.idade),recolhidos:Array.isArray(e.recolhidos)?e.recolhidos.filter(t=>typeof t=="string").slice(0,200):[]}}function ft(o,e){let{local:t,sync:r}=o,a=ln(e);async function n(){return un((await t.obter(a))[a])}async function s(p){let m=await n();await t.gravar({[a]:{...m,...p}})}async function i(){let p=(await r.obter(Wo))[Wo],m=Array.isArray(p)?p.filter(b=>typeof b=="string"):[];if(!m.length)return[];let f=await r.obter(m.map(Yo));return m.flatMap(b=>{let A=f[Yo(b)];return A?[{...Zo(A),id:b}]:[]})}async function c(p,m=[]){let f=new Set(p.map(v=>v.id)),b={[Wo]:p.map(v=>v.id)};for(let v of p)b[Yo(v.id)]=v;await r.gravar(b);let A=m.filter(v=>!f.has(v.id)).map(v=>Yo(v.id));A.length&&await r.remover(A)}return{lerEstado:n,gravarVisao:p=>s({visao:p}),gravarIdade:p=>s({idade:p}),gravarRecolhidos:p=>s({recolhidos:p}),lerVisoes:i,gravarVisoes:c,aoMudarVisoes:p=>r.aoMudar(m=>Wo in m||Object.keys(m).some(f=>f.startsWith("spro_grade_v:"))?p():void 0)}}function gt(o){let e=t=>{let r=/^[=+\-@\t\r]/.test(t)?`'${t}`:t;return/[;"\n\r]/.test(r)?`"${r.replace(/"/g,'""')}"`:r};return`\uFEFF${o.map(t=>t.map(e).join(";")).join(`\r
`)}`}var ht="#tblProcessosRecebidos input[type=checkbox], #tblProcessosGerados input[type=checkbox], #tblProcessosDetalhado input[type=checkbox]",Dr=o=>o.getAttribute("value")??o.closest("tr")?.id.replace(/^P/,"")??"";function Lr(o){let e=new Set;for(let t of o.querySelectorAll(ht))t.checked&&Dr(t)&&e.add(Dr(t));return e}function xt(o,e){let t=new Set(e);for(let r of o.querySelectorAll(ht)){let a=Dr(r);a&&(t.delete(a),!r.disabled&&!!r.checked!==e.has(a)&&r.click())}return[...t]}function bt(o,e){let t=!1,r=()=>{t||(t=!0,queueMicrotask(()=>{t=!1,e(Lr(o))}))};return o.addEventListener("click",r,!0),o.addEventListener("change",r,!0),()=>{o.removeEventListener("click",r,!0),o.removeEventListener("change",r,!0)}}function mn(o){return/acaoControleProcessos\(\s*['"][^'"]*['"]\s*,\s*true/.test(o.elemento.getAttribute("onclick")??"")}function vt(o,e){return mn(o)&&e===0?{ok:!1,motivo:"Marque ao menos um processo."}:(o.elemento.click(),{ok:!0})}var fn=o=>o instanceof Error?o.message:String(o);function At(o){if(o.tipo==="atribuicao")return{...o,para:o.de,de:o.para};let e={tipo:"marcador",id:o.id,protocolo:o.protocolo};return o.adicionar&&(e.remover=o.adicionar),o.remover&&(e.adicionar=o.remover,o.texto&&(e.texto=o.texto)),e}async function gn(o,e){try{if(o.tipo==="atribuicao")return await e.atribuir(o.protocolo,o.para),{ok:!0,desfazer:At(o)};if(o.adicionar&&await e.marcador(o.protocolo,{marcador:o.adicionar,...o.texto?{texto:o.texto}:{}}),o.remover)try{await e.marcador(o.protocolo,{marcador:o.remover,remover:!0})}catch(t){throw o.adicionar&&await e.marcador(o.protocolo,{marcador:o.adicionar,remover:!0}).catch(()=>{}),t}return{ok:!0,desfazer:At(o)}}catch(t){return{ok:!1,erro:fn(t)}}}function yt(o){let e=Promise.resolve();return{mover(t){let r=e.then(()=>gn(t,o));return e=r.catch(()=>{}),r}}}var or=o=>`${o} ${Math.abs(o)===1?"dia":"dias"}`,Et=Number.MAX_SAFE_INTEGER;function zr(o,e){let t=[e];return o.hora&&o.vencimento&&(t[0]=e.replace(/\.$/,"")+` \xE0s ${o.hora}.`),o.texto&&t.push(o.texto),o.sigla&&t.push(`Definido por ${o.sigla} no controle de prazo do SEI.`),t.join(`
`)}function St(o,e){let t=o.vencimento;if(o.concluidoEm&&t)return{situacao:"concluido",texto:`conclu\xEDdo em ${ro(o.concluidoEm).slice(0,5)}`,dica:zr(o,`Prazo de ${ro(t)} conclu\xEDdo em ${ro(o.concluidoEm)}.`),ordem:Et,sorter:`${t} 23:59:59`};if(t){let s=Co(e,t),i=`${t} ${o.hora??"23:59"}:00`,c=zr(o,`Vence em ${ro(t)}.`);return s===0?{situacao:"hoje",texto:"vence hoje",dica:c,ordem:0,sorter:i}:s<0?{situacao:"atrasado",texto:`${or(-s)} de atraso`,dica:c,ordem:s,sorter:i}:{situacao:"noPrazo",texto:`vence em ${or(s)}`,dica:c,ordem:s,sorter:i}}let r=o.inicio??e,a=Co(r,e);return{situacao:"desde",texto:a===0?"hoje":a>0?`h\xE1 ${or(a)}`:`em ${or(-a)}`,dica:zr(o,`Contando desde ${ro(r)}.`),ordem:Et-1,sorter:`${r} ${o.hora??"23:59"}:00`}}function F(o,e){return o.prazo?St(o.prazo,e.hoje):null}function K(o,e){return o.vistoEm===void 0?null:Math.max(0,Math.floor((e.agora-o.vistoEm)/864e5))}function po(o,e){return o.ultimaMov?Math.max(0,Co(o.ultimaMov,e.hoje)):null}function Pt(o,e){return e.visitaAnterior!==void 0&&o.vistoEm!==void 0&&o.vistoEm>e.visitaAnterior}function Io(o,e){let t=F(o,e);return!t||t.situacao==="concluido"||t.situacao==="desde"?null:t.ordem}var hn={resp:"resp",responsavel:"resp",atribuido:"resp",atribuicao:"resp",tipo:"tipo",marcador:"marcador",marcadores:"marcador",marc:"marcador",espec:"espec",especificacao:"espec",anot:"anot",anotacao:"anot",nota:"anot",prazo:"prazo",caixa:"caixa",idade:"caixa",novo:"novo",sigilo:"sigilo",sigiloso:"sigilo",grupo:"grupo",retorno:"retorno",protocolo:"protocolo",proc:"protocolo",processo:"protocolo",parado:"parado",mov:"parado",prio:"prio",prioridade:"prio",interessado:"interessado",interessados:"interessado"};function Nr(o){let e=[],t="",r=!1;for(let a of o)a==='"'?(r=!r,t+=a):/\s/.test(a)&&!r?(t&&e.push(t),t=""):t+=a;return t&&e.push(t),e}var xn=o=>o.replace(/^"|"$/g,"");function _r(o){let e=[],t=[];for(let r of Nr(o)){let a=r,n=!1;a.startsWith("-")&&a.length>1&&(n=!0,a=a.slice(1));let s,i=/^([a-zA-Z\u00C0-\u017F]+):(.*)$/.exec(a);if(i){let f=hn[X(i[1])];f&&(s=f,a=i[2])}let c="=";s&&/^[<>]/.test(a)&&(c=a[0],a=a.slice(1));let p=X(xn(a));if(!p&&!s)continue;let m={...s?{campo:s}:{},valor:p,original:r,negado:n,comparador:c};e.push(m),t.push({texto:r,termo:m})}return{termos:e,tokens:t}}var bn=o=>X([o.protocolo,o.protocolo.replace(/\D/g,""),o.tipo,o.especificacao,o.atribuicao?.sigla,o.atribuicao?.nome,...o.marcadores.flatMap(e=>[e.nome,e.texto]),o.anotacao?.texto,o.prazo?.texto,o.prioridade,o.interessados,o.observacao].filter(Boolean).join(" ")),J=(o,e)=>X(o??"").includes(e),wt=/^(s|sim|1|true|yes)$/;function $r(o){let e=/^(\d+)\s*(d|dia|dias)?$/.exec(o);return e?Number(e[1]):null}function Rr(o,e,t){return o===null?!1:e==="<"?o<t:e===">"?o>t:o===t}function vn(o,e,t){let r=F(o,t),a=e.valor;if(a==="sem"||a==="nenhum"||a==="nao")return!o.prazo;if(a==="com"||a==="sim")return!!o.prazo;if(!r)return!1;if(a==="atrasado"||a==="atrasados"||a==="vencido")return r.situacao==="atrasado";if(a==="hoje")return r.situacao==="hoje";if(a==="concluido"||a==="concluidos")return r.situacao==="concluido";if(a==="semana"){let s=Io(o,t);return s!==null&&s>=0&&s<=7}let n=$r(a);return n!==null?Rr(Io(o,t),e.comparador==="="?"<":e.comparador,n):J(o.prazo?.texto,a)}function An(o,e,t){let r=e.valor;switch(e.campo){case"resp":return r==="sem"||r==="ninguem"?!o.atribuicao:r==="eu"?!!t.eu&&X(o.atribuicao?.sigla??"")===X(t.eu):J(o.atribuicao?.sigla,r)||J(o.atribuicao?.nome,r);case"tipo":return J(o.tipo,r);case"marcador":return r==="sem"||r==="nenhum"?o.marcadores.length===0:r==="com"?o.marcadores.length>0:o.marcadores.some(a=>J(a.nome,r)||J(a.texto,r));case"espec":return J(o.especificacao,r);case"anot":return r==="sem"||r==="nao"?!o.anotacao:r==="com"||r==="sim"?!!o.anotacao:r==="prioridade"||r==="prioritaria"?!!o.anotacao?.prioridade:J(o.anotacao?.texto,r);case"prazo":return vn(o,e,t);case"caixa":{let a=$r(r);return a===null?!1:Rr(K(o,t),e.comparador==="="?">":e.comparador,a)}case"novo":return r==="visita"?Pt(o,t):wt.test(r)?o.naoVisualizado:r==="nao"?!o.naoVisualizado:!1;case"sigilo":return wt.test(r)?o.sigiloso:!o.sigiloso;case"grupo":return r.startsWith("rec")?o.grupo==="recebidos":r.startsWith("ger")?o.grupo==="gerados":!1;case"retorno":return r==="sem"||r==="nao"?o.retornos.length===0:r==="atrasado"?o.retornos.some(a=>a.atrasado):r==="aguardando"?o.retornos.some(a=>a.tipo==="aguardando"):r==="programado"?o.retornos.some(a=>a.tipo==="programado"):o.retornos.length>0;case"parado":{let a=$r(r);return a===null?!1:Rr(po(o,t),e.comparador==="="?">":e.comparador,a)}case"prio":return J(o.prioridade,r);case"interessado":return J(o.interessados,r);case"protocolo":return X(o.protocolo).includes(r)||o.protocolo.replace(/\D/g,"").includes(r.replace(/\D/g,"")||"\0");default:return!0}}function yn(o,e,t){if(!o.termos.length)return!0;let r;for(let a of o.termos){let n;if(a.campo?n=An(e,a,t):(r??=bn(e),n=r.includes(a.valor)),a.negado?n:!n)return!1}return!0}var Mt=(o,e,t)=>{let r=_r(e);return r.termos.length?o.filter(a=>yn(r,a,t)):o};function Tr(o,e){return Nr(o).filter(t=>t!==e).join(" ")}function kt(o,e,t){let r=/\s/.test(t)?`"${t}"`:t,a=`${e}:${r}`,n=Nr(o);return n.includes(a)?o:[...n,a].join(" ")}var En=new Intl.Collator("pt-BR",{sensitivity:"base",numeric:!0});function Sn(o,e=[]){return[...o.values()].sort((t,r)=>{let a=e.indexOf(t.chave),n=e.indexOf(r.chave);return a>=0||n>=0?(a<0?-1:a)-(n<0?-1:n):En.compare(t.rotulo,r.rotulo)})}function $(o,e,t,r){let a=o.get(e);return a||(a={chave:e,rotulo:t,itens:[],...r?{tom:r}:{}},o.set(e,a)),a}var yo=[["atrasado","Atrasados","perigo"],["hoje","Vencem hoje","aviso"],["semana","Pr\xF3ximos 7 dias","aviso"],["mes","Pr\xF3ximos 30 dias","neutro"],["depois","Depois de 30 dias","neutro"],["desde","Contando desde uma data","neutro"],["concluido","Prazo conclu\xEDdo","neutro"],["sem","Sem prazo","neutro"]];function Do(o,e){let t=F(o,e);if(!t)return"sem";if(t.situacao==="concluido")return"concluido";if(t.situacao==="desde")return"desde";if(t.situacao==="atrasado")return"atrasado";if(t.situacao==="hoje")return"hoje";let r=Io(o,e)??0;return r<=7?"semana":r<=30?"mes":"depois"}var Ct=[["recente","Chegaram hoje"],["semana","Nos \xFAltimos 7 dias"],["mes","Nos \xFAltimos 30 dias"],["antigo","H\xE1 mais de 30 dias"],["desconhecido","Sem registro"]];function Pn(o,e){let t=K(o,e);return t===null?"desconhecido":t<1?"recente":t<=7?"semana":t<=30?"mes":"antigo"}function fo(o,e){return e.map(t=>o.get(t[0])).filter(t=>!!t)}function rr(o,e,t){if(e==="nenhum")return[{chave:"todos",rotulo:"Todos",itens:o}];let r=new Map;for(let a of o)switch(e){case"responsavel":a.atribuicao?$(r,`u:${a.atribuicao.sigla}`,a.atribuicao.nome===a.atribuicao.sigla?a.atribuicao.sigla:`${a.atribuicao.nome} (${a.atribuicao.sigla})`).itens.push(a):$(r,"sem","Sem respons\xE1vel").itens.push(a);break;case"tipo":$(r,`t:${a.tipo||"-"}`,a.tipo||"Sem tipo").itens.push(a);break;case"marcador":if(a.marcadores.length)for(let n of a.marcadores)$(r,`m:${n.nome}`,n.nome).itens.push(a);else $(r,"sem","Sem marcador").itens.push(a);break;case"prazo":{let n=Do(a,t),s=yo.find(i=>i[0]===n);$(r,n,s[1],s[2]).itens.push(a);break}case"situacao":a.naoVisualizado?$(r,"novo","N\xE3o visualizados","aviso").itens.push(a):$(r,"lido","Visualizados").itens.push(a);break;case"grupo":$(r,a.grupo,a.grupo==="recebidos"?"Recebidos":"Gerados").itens.push(a);break;case"anotacao":a.anotacao?.prioridade?$(r,"prio","Anota\xE7\xE3o com prioridade","aviso").itens.push(a):a.anotacao?$(r,"com","Com anota\xE7\xE3o").itens.push(a):$(r,"sem","Sem anota\xE7\xE3o").itens.push(a);break;case"acompanhamento":a.acompanhamentoEspecial?$(r,"com","Em acompanhamento especial").itens.push(a):$(r,"sem","Fora do acompanhamento especial").itens.push(a);break;case"retorno":a.retornos.some(n=>n.atrasado)?$(r,"atrasado","Retorno atrasado","perigo").itens.push(a):a.retornos.some(n=>n.tipo==="aguardando")?$(r,"aguardando","Aguardando retorno").itens.push(a):a.retornos.length?$(r,"programado","Retorno programado").itens.push(a):$(r,"sem","Sem retorno").itens.push(a);break;case"caixa":{let n=Pn(a,t);$(r,n,Ct.find(s=>s[0]===n)[1]).itens.push(a);break}}return e==="prazo"?fo(r,yo):e==="caixa"?fo(r,Ct):e==="situacao"?fo(r,[["novo",""],["lido",""]]):e==="grupo"?fo(r,[["recebidos",""],["gerados",""]]):e==="anotacao"?fo(r,[["prio",""],["com",""],["sem",""]]):e==="acompanhamento"?fo(r,[["com",""],["sem",""]]):e==="retorno"?fo(r,[["atrasado",""],["aguardando",""],["programado",""],["sem",""]]):Sn(r,["sem"])}var qr={nenhum:"Sem agrupamento",responsavel:"Respons\xE1vel",tipo:"Tipo de processo",marcador:"Marcador",prazo:"Prazo",situacao:"Visualiza\xE7\xE3o",grupo:"Recebidos e gerados",anotacao:"Anota\xE7\xE3o",acompanhamento:"Acompanhamento especial",retorno:"Retorno programado",caixa:"Tempo na caixa"};var wn=new Intl.Collator("pt-BR",{sensitivity:"base",numeric:!0});function er(o,e){let t=new Map;for(let r of o)for(let a of e(r)){let n=t.get(a.valor)??{valor:a.valor,rotulo:a.rotulo,n:0};n.n+=1,t.set(a.valor,n)}return[...t.values()].sort((r,a)=>a.n-r.n||wn.compare(r.rotulo,a.rotulo))}function Ot(o,e){let t=er(o,r=>{let a=Do(r,e),n=yo.find(i=>i[0]===a)[1],s=a==="atrasado"?"atrasado":a==="hoje"?"hoje":a==="semana"?"semana":a==="sem"?"sem":a==="concluido"?"concluido":"";return s?[{valor:s,rotulo:n}]:[]});return{responsaveis:er(o,r=>r.atribuicao?[{valor:r.atribuicao.sigla,rotulo:`${r.atribuicao.nome} (${r.atribuicao.sigla})`}]:[{valor:"sem",rotulo:"Sem respons\xE1vel"}]),tipos:er(o,r=>r.tipo?[{valor:r.tipo,rotulo:r.tipo}]:[]),marcadores:er(o,r=>r.marcadores.length?r.marcadores.map(a=>({valor:a.nome,rotulo:a.nome})):[{valor:"sem",rotulo:"Sem marcador"}]),prazos:t}}function Vr(o){let e=[];o.sigiloso&&e.push("Sigiloso"),o.naoVisualizado&&e.push("N\xE3o visualizado"),o.documentoNovo&&e.push("Documento novo"),o.acompanhamentoEspecial&&e.push("Acompanhamento especial");for(let t of o.retornos)e.push(`${t.tipo==="aguardando"?"Aguardando retorno":"Retorno programado"}${t.atrasado?" (atrasado)":""}`);return e}function jr(o,e){let t=F(o,e);if(!o.prazo||!t)return"";let r=o.prazo.vencimento??o.prazo.inicio;return`${r?ro(r):""}${o.prazo.hora?` ${o.prazo.hora}`:""} (${t.texto})`.trim()}var Mn=(o,e,t)=>{switch(e){case"processo":return o.protocolo;case"tipo":return o.tipo;case"especificacao":return o.especificacao;case"responsavel":return o.atribuicao?o.atribuicao.nome===o.atribuicao.sigla?o.atribuicao.sigla:`${o.atribuicao.nome} (${o.atribuicao.sigla})`:"";case"marcadores":return o.marcadores.map(r=>r.texto?`${r.nome}: ${r.texto}`:r.nome).join("; ");case"prazo":return jr(o,t);case"anotacao":return o.anotacao?.texto.replace(/\s*\n\s*/g," / ")??"";case"caixa":return bo(K(o,t));case"parado":return bo(po(o,t));case"sinais":return Vr(o).join("; ")}};function It(o,e,t){return[e.map(r=>mo[r]),...o.map(r=>e.map(a=>Mn(r,a,t)))]}var Dt=o=>`processos-${o}.csv`;function Lt(o,e,t){let r=[];for(let a of o){let n=t&&e.has(a.chave);if(t&&r.push({tipo:"grupo",grupo:a,recolhido:n}),!n)for(let s of a.itens)r.push({tipo:"processo",processo:s,grupo:a.chave})}return r}var Fr=new Intl.Collator("pt-BR",{numeric:!0,sensitivity:"base"});function zt(o){let e=/(\d+)\/(\d{4})-\d+\s*$/.exec(o);if(!e)return null;let t=/(\d+)\s*$/.exec(e[1].split(/[.-]/).pop()??"")?.[1]??e[1];return[Number(e[2]),Number(t)]}function kn(o,e){let t=zt(o),r=zt(e);return t&&r&&(t[0]-r[0]||t[1]-r[1])||Fr.compare(o,e)}function $t(o,e,t){switch(e){case"tipo":return o.tipo||null;case"responsavel":return o.atribuicao?.sigla??null;case"marcador":return o.marcadores[0]?.nome??null;case"prazo":{let r=F(o,t);return r?r.ordem:null}case"caixa":return K(o,t);case"parado":return po(o,t);case"novo":return o.naoVisualizado?0:1}}function Cn(o,e){return(t,r)=>{for(let a of o){let n;if(a.campo==="protocolo")n=kn(t.protocolo,r.protocolo),a.decrescente&&(n=-n);else{let s=$t(t,a.campo,e),i=$t(r,a.campo,e);if(s===null&&i===null)continue;if(s===null)return 1;if(i===null)return-1;n=typeof s=="number"&&typeof i=="number"?s-i:Fr.compare(String(s),String(i)),a.decrescente&&(n=-n)}if(n)return n}return 0}}function Rt(o,e,t){return e.length?[...o].sort(Cn(e,t)):o}function Ur(o,e,t){let r=o.findIndex(s=>s.campo===e),a=r<0?{campo:e,decrescente:!1}:o[r].decrescente?null:{campo:e,decrescente:!0};if(!t)return a?[a]:[];if(r<0)return[...o,a];let n=[...o];return a?n[r]=a:n.splice(r,1),n}var Gr=new Intl.Collator("pt-BR",{sensitivity:"base",numeric:!0}),Z="sem";function Nt(o,e,t,r={}){let a=new Map,n=(i,c,p,m,f)=>{let b=a.get(i);return b||(b={chave:i,titulo:c,itens:[],aceitaSoltar:p,excedeu:!1,...m?{motivoSomenteLeitura:m}:{},...f?{tom:f}:{}},a.set(i,b)),b};if(e.colunas==="marcador"){n(Z,"Sem marcador",!0);for(let i of[...r.marcadores??[]].sort(Gr.compare))n(`m:${i}`,i,!0);for(let i of o){i.marcadores.length||n(Z,"Sem marcador",!0).itens.push(i);for(let c of i.marcadores)n(`m:${c.nome}`,c.nome,!0).itens.push(i)}}else if(e.colunas==="responsavel"){n(Z,"Sem respons\xE1vel",!0);for(let i of r.responsaveis??[])n(`u:${i.sigla}`,`${i.nome} (${i.sigla})`,!0);for(let i of o)i.atribuicao?n(`u:${i.atribuicao.sigla}`,`${i.atribuicao.nome} (${i.atribuicao.sigla})`,!0).itens.push(i):n(Z,"Sem respons\xE1vel",!0).itens.push(i)}else if(e.colunas==="prazo"){for(let[i,c,p]of yo)i!=="desde"&&n(i,c,!1,"O prazo \xE9 definido pelo bot\xE3o de prazo, n\xE3o arrastando.",p);for(let i of o){let c=Do(i,t);n(c==="desde"?"sem":c,"",!1).itens.push(i)}}else for(let i of o)n(`t:${i.tipo}`,i.tipo||"Sem tipo",!1,"O tipo do processo n\xE3o muda arrastando.").itens.push(i);let s=[...a.values()];if(e.colunas==="prazo"&&(s=s.filter(i=>i.itens.length||i.titulo)),e.colunas==="marcador"||e.colunas==="responsavel"?s.sort((i,c)=>i.chave===Z?-1:c.chave===Z?1:Gr.compare(i.titulo,c.titulo)):e.colunas==="tipo"&&s.sort((i,c)=>Gr.compare(i.titulo,c.titulo)),e.limite>0)for(let i of s)i.excedeu=i.itens.length>e.limite;return s}var tr=o=>o.slice(o.indexOf(":")+1);function _t(o,e,t,r){if(t===r)return{ok:!1,motivo:"Mesma coluna."};if(o==="marcador"){let a=t===Z?void 0:tr(t),n=r===Z?void 0:tr(r);if(a&&!e.marcadores.some(p=>p.nome===a))return{ok:!1,motivo:"O processo j\xE1 n\xE3o tem esse marcador."};let s=n?e.marcadores.some(p=>p.nome===n):!1,i=a?e.marcadores.find(p=>p.nome===a)?.texto:void 0,c={tipo:"marcador",id:e.id,protocolo:e.protocolo};return a&&(c.remover=a),n&&!s&&(c.adicionar=n,i&&(c.texto=i)),!c.remover&&!c.adicionar?{ok:!1,motivo:"Nada a mudar."}:{ok:!0,movimento:c}}return o==="responsavel"?{ok:!0,movimento:{tipo:"atribuicao",id:e.id,protocolo:e.protocolo,para:r===Z?null:tr(r),de:t===Z?null:tr(t)}}:{ok:!1,motivo:"Esta divis\xE3o do quadro \xE9 s\xF3 de leitura."}}function Hr(o,e,t={}){if(e.tipo==="atribuicao"){if(e.para===null){let{atribuicao:a,...n}=o;return n}return{...o,atribuicao:{sigla:e.para,nome:t[e.para]??e.para}}}let r=o.marcadores;return e.remover&&(r=r.filter(a=>a.nome!==e.remover)),e.adicionar&&(r=[...r,{nome:e.adicionar,cor:"",texto:e.texto??""}]),{...o,marcadores:r}}var Br="application/x-spro-cartao";function On(o,e,t){let r=F(o,t.ctx),a=d("input",{type:"checkbox",class:"spro-cb","aria-label":`Marcar ${o.protocolo}`,disabled:!o.naPaginaAtual});a.checked=t.selecionados.has(o.id),a.addEventListener("change",()=>t.aoSelecionar(o.id,a.checked));let n=d("div",{class:`spro-cartao${a.checked?" spro-sel":""}`,draggable:"true","data-id":o.id,"data-de":e},d("div",{class:"spro-cartao-topo"},a,d("a",{class:`spro-proc${o.naoVisualizado?" spro-novo":""}`,href:o.link??"#",draggable:"false"},o.protocolo)),o.tipo?d("div",{class:"spro-cartao-tipo"},o.tipo):null,o.especificacao?d("div",{class:"spro-cartao-espec"},o.especificacao):null,d("div",{class:"spro-cartao-rodape"},r?d("span",{class:`spro-prazo spro-prazo-${r.situacao}`,title:r.dica},r.texto):null,o.atribuicao?d("span",{class:"spro-avatar",title:o.atribuicao.nome},o.atribuicao.sigla.slice(0,2).toUpperCase()):null));return n.addEventListener("dragstart",s=>{s.dataTransfer?.setData(Br,JSON.stringify({id:o.id,de:e})),s.dataTransfer?.setData("text/plain",o.protocolo),s.dataTransfer&&(s.dataTransfer.effectAllowed="move"),n.classList.add("spro-arrastando")}),n.addEventListener("dragend",()=>n.classList.remove("spro-arrastando")),n}function In(o,e){let t=d("div",{class:"spro-col-corpo"},...o.itens.map(s=>On(s,o.chave,e)));o.itens.length||t.append(d("div",{class:"spro-col-vazia"},o.aceitaSoltar?"Solte aqui":"Vazia"));let r=e.cfg.limite,a=d("div",{class:"spro-col-topo"},d("span",{class:"spro-col-titulo",title:o.titulo},o.titulo),d("span",{class:`spro-col-n${o.excedeu?" spro-excedeu":""}`,title:o.excedeu?`Passou do limite de ${r}`:void 0},r>0?`${o.itens.length}/${r}`:String(o.itens.length)),o.aceitaSoltar?null:d("span",{class:"spro-col-trava",title:o.motivoSomenteLeitura},ao("bloquear",13))),n=d("section",{class:`spro-col${o.tom?` spro-tom-${o.tom}`:""}${o.excedeu?" spro-col-cheia":""}`,"data-chave":o.chave},a,t);return n.addEventListener("dragover",s=>{s.dataTransfer?.types.includes(Br)&&o.aceitaSoltar&&(s.preventDefault(),n.classList.add("spro-alvo"))}),n.addEventListener("dragleave",()=>n.classList.remove("spro-alvo")),n.addEventListener("drop",s=>{n.classList.remove("spro-alvo");let i=s.dataTransfer?.getData(Br);if(i){s.preventDefault();try{let{id:c,de:p}=JSON.parse(i);e.aoMover(c,p,o.chave)}catch{}}}),n}function Tt(o){let e=d("div",{class:"spro-quadro"}),t=r=>d("div",{class:"spro-colunas"},...Nt(r,o.cfg,o.ctx,o.extras).map(a=>In(a,o)));if(o.cfg.raiasPorResponsavel&&o.cfg.colunas!=="responsavel")for(let r of rr(o.processos,"responsavel",o.ctx))e.append(d("div",{class:"spro-raia"},d("div",{class:"spro-raia-nome"},r.rotulo,d("span",{class:"spro-grupo-n"},String(r.itens.length))),t(r.itens)));else e.append(t(o.processos));return o.processos.length||e.prepend(d("div",{class:"spro-vazio"},"Nenhum processo corresponde ao filtro.")),e}function qt(o,e,t,r,a=8){let n=Math.max(1,e),s=r>0?r:n*40,i=Math.max(0,Math.min(o,Math.floor(t/n)-a)),c=Math.min(o,Math.ceil((t+s)/n)+a);return{inicio:i,fim:c,antes:i*n,depois:Math.max(0,o-c)*n}}var Dn=[[/azul_marinho|marinho/,"#1d3557"],[/azul_claro|ciano|celeste/,"#2a9fd6"],[/azul/,"#2563c9"],[/verde_escuro/,"#166534"],[/verde|lima/,"#2e9e4f"],[/amarelo/,"#e0b000"],[/laranja/,"#ee7d11"],[/vermelho/,"#d1352b"],[/rosa|magenta/,"#d6409f"],[/roxo|violeta|lilas/,"#7048c6"],[/marrom/,"#8a5a3c"],[/preto/,"#222831"],[/cinza/,"#7b838c"]];function Vt(o){let e=o.toLowerCase();return Dn.find(([t])=>t.test(e))?.[1]??"#8b939c"}var ar={compacta:34,confortavel:48},Ln={processo:"minmax(220px, 240px)",tipo:"minmax(120px, 1.2fr)",especificacao:"minmax(140px, 1.6fr)",responsavel:"minmax(90px, 130px)",marcadores:"minmax(120px, 1.3fr)",prazo:"minmax(120px, 150px)",anotacao:"minmax(130px, 1.4fr)",caixa:"84px",parado:"84px",sinais:"minmax(110px, 150px)"},zn={processo:"protocolo",tipo:"tipo",responsavel:"responsavel",marcadores:"marcador",prazo:"prazo",caixa:"caixa",parado:"parado",sinais:"novo"},U=(o,e,t)=>d(o,{class:e},t);function $n(o,e,t){let r=U("div",`spro-c spro-c-${e}`);switch(e){case"processo":{let a=d("a",{class:`spro-proc${o.naoVisualizado?" spro-novo":""}`,href:o.link??"#",title:"Abrir o processo"},o.protocolo);r.append(a),o.sigiloso&&r.append(d("span",{class:"spro-sigilo",title:"Processo sigiloso"},"sigiloso"));break}case"tipo":r.append(U("span","spro-corta",o.tipo)),r.title=o.tipo;break;case"especificacao":r.append(U("span","spro-corta",o.especificacao)),r.title=o.especificacao;break;case"responsavel":o.atribuicao&&(r.append(U("span","spro-corta",o.atribuicao.sigla)),r.title=o.atribuicao.nome);break;case"marcadores":for(let a of o.marcadores){let n=d("span",{class:"spro-marcador",title:a.texto?`${a.nome}: ${a.texto}`:a.nome},d("i",{style:`background:${Vt(a.cor)}`}),a.nome);r.append(n)}break;case"prazo":{let a=F(o,t);a&&(r.append(U("span",`spro-prazo spro-prazo-${a.situacao}`,a.texto)),r.title=`${jr(o,t)}
${a.dica}`);break}case"anotacao":o.anotacao&&(r.append(U("span",`spro-corta${o.anotacao.prioridade?" spro-prio":""}`,o.anotacao.texto.replace(/\s*\n\s*/g," / "))),r.title=`${o.anotacao.texto}
${o.anotacao.autor}`);break;case"caixa":{let a=bo(K(o,t));r.append(U("span","spro-suave",a)),a&&(r.title=lt);break}case"parado":{let a=po(o,t);r.append(U("span","spro-suave",bo(a))),a!==null&&(r.title="Dias desde a \xFAltima movimenta\xE7\xE3o (vis\xE3o detalhada do SEI).");break}case"sinais":for(let a of Vr(o))r.append(U("span","spro-sinal",a));break}return r}function jt(o){let e=o,t=U("div","spro-cab"),r=U("div","spro-corpo"),a=d("div",{class:"spro-rolagem",tabindex:"-1"},r),n=d("div",{class:"spro-tabela",role:"table"},t,a),s="",i=()=>`36px ${e.colunas.map(h=>Ln[h]).join(" ")}`;function c(){t.replaceChildren(),t.style.gridTemplateColumns=i();let h=e.linhas.filter(w=>w.tipo==="processo"&&w.processo.naPaginaAtual).map(w=>w.processo.id),P=h.filter(w=>e.selecionados.has(w)).length,y=d("input",{type:"checkbox",class:"spro-cb","aria-label":"Marcar todos os processos vis\xEDveis",title:"Marcar todos os vis\xEDveis (desta p\xE1gina do SEI)",disabled:!h.length});y.checked=h.length>0&&P===h.length,y.indeterminate=P>0&&P<h.length,y.addEventListener("change",()=>e.aoMarcarGrupo(h,y.checked)),t.append(U("div","spro-c spro-c-cb")),t.firstElementChild.append(y);for(let w of e.colunas){let O=zn[w],q=O?e.ordem.findIndex(V=>V.campo===O):-1,no=d("div",{class:`spro-c spro-th${O?" spro-ordenavel":""}`,role:"columnheader",...q>=0?{"aria-sort":e.ordem[q].decrescente?"descending":"ascending"}:{}});if(O){let V=d("button",{type:"button",class:"spro-th-b",title:"Ordenar (Shift acrescenta outro crit\xE9rio)",onclick:Q=>e.aoOrdenar(O,Q.shiftKey)},mo[w]);q>=0&&V.append(d("span",{class:"spro-seta-ordem"},`${e.ordem[q].decrescente?"\u2193":"\u2191"}${e.ordem.length>1?q+1:""}`)),no.append(V)}else no.append(mo[w]);t.append(no)}}function p(h,P){let y=e.selecionados.has(h.id),w=d("input",{type:"checkbox",class:"spro-cb","aria-label":`Marcar ${h.protocolo}`,disabled:!h.naPaginaAtual,title:h.naPaginaAtual?void 0:"Este processo est\xE1 em outra p\xE1gina do SEI; abra-o ou use o quadro para mover."});w.checked=y,w.addEventListener("change",()=>e.aoSelecionar(h.id,w.checked));let O=d("div",{class:`spro-linha${y?" spro-sel":""}${e.foco===h.id?" spro-foco":""}`,role:"row","data-id":h.id,"data-grupo":P});O.style.gridTemplateColumns=i(),O.style.height=`${ar[e.densidade]}px`;let q=U("div","spro-c spro-c-cb");return q.append(w),O.append(q,...e.colunas.map(no=>$n(h,no,e.ctx))),O}function m(h){let P=h.grupo.itens.filter(O=>O.naPaginaAtual).map(O=>O.id),y=d("button",{type:"button",class:"spro-grupo-b","aria-expanded":String(!h.recolhido),onclick:()=>e.aoGrupo(h.grupo.chave)},d("span",{class:`spro-grupo-seta${h.recolhido?" spro-fechado":""}`},ao("seta",14)),d("span",{class:"spro-grupo-nome"},h.grupo.rotulo),d("span",{class:"spro-grupo-n"},String(h.grupo.itens.length))),w=d("div",{class:`spro-grupo${h.grupo.tom?` spro-tom-${h.grupo.tom}`:""}`,role:"row"},y);if(P.length){let O=P.every(q=>e.selecionados.has(q));w.append(d("button",{type:"button",class:"spro-link",onclick:()=>e.aoMarcarGrupo(P,!O)},O?"Desmarcar grupo":"Marcar grupo"))}return w.style.height=`${ar[e.densidade]}px`,w}function f(){let h=ar[e.densidade],P=qt(e.linhas.length,h,a.scrollTop||0,a.clientHeight||0);r.style.paddingTop=`${P.antes}px`,r.style.paddingBottom=`${P.depois}px`,r.replaceChildren(...e.linhas.slice(P.inicio,P.fim).map(y=>y.tipo==="grupo"?m(y):p(y.processo,y.grupo)))}let b=0;a.addEventListener("scroll",()=>{if(b)return;let h=a.ownerDocument.defaultView;if(!h?.requestAnimationFrame)return f();b=h.requestAnimationFrame(()=>{b=0,f()})});function A(h){let P=h.colunas.join()!==e.colunas.join()||h.ordem!==e.ordem||h.selecionados!==e.selecionados;e=h;let y=`${e.colunas.join()}|${e.densidade}`;if((P||y!==s)&&(c(),s=y),!e.linhas.length){r.style.paddingTop=r.style.paddingBottom="0",r.replaceChildren(d("div",{class:"spro-vazio"},"Nenhum processo corresponde ao filtro."));return}f()}function v(h){let P=e.linhas.findIndex(w=>w.tipo==="processo"&&w.processo.id===h);if(P<0)return!1;let y=ar[e.densidade];return P*y<a.scrollTop?a.scrollTop=P*y:(P+1)*y>a.scrollTop+a.clientHeight&&a.clientHeight>0&&(a.scrollTop=(P+1)*y-a.clientHeight),f(),!0}return A(o),{el:n,atualizar:A,mostrar:v,rolagem:a}}var Rn=[["/","Buscar"],["j / k","Linha seguinte / anterior"],["x","Marcar a linha"],["Enter","Abrir o processo"],["g t","Ver a tabela"],["g q","Ver o quadro"],["Esc","Limpar a busca ou a sele\xE7\xE3o"],["?","Esta ajuda"]],Nn=[["Meus","resp:eu"],["Atrasados","prazo:atrasado"],["Vencem na semana","prazo:semana"],["Sem respons\xE1vel","resp:sem"],["N\xE3o visualizados","novo:sim"],["Novos desde a \xFAltima visita","novo:visita"],["Parados h\xE1 +30 dias","parado:>30d"]];function Lo(o,e){for(let t of o.querySelectorAll("option"))t.getAttribute("value")===e?t.setAttribute("selected",""):t.removeAttribute("selected"),t.selected=t.getAttribute("value")===e}function Ft(o){let{doc:e}=o,t=o.inicial.processos,r=Ao(),a=[],n="",s=new Set,i=new Set(Lr(e)),c=null,p={vistoEm:{}},m,f=null,b=!1,A=!1,v="",h={},P=!1,y=!1,w,O=!1,q=yt(o.mover),no=new AbortController,V=()=>({hoje:o.hoje(),agora:o.agora(),...o.eu?{eu:o.eu}:{},...m!==void 0?{visitaAnterior:m}:{}}),Q=e.createElement("div");Q.id="spro-grade",Q.setAttribute("data-spro-grade-host","1"),Q.setAttribute("data-tema",o.escuro?"escuro":"claro");let Bt=Q.attachShadow({mode:"open"}),Xr=e.createElement("style");Xr.textContent=o.css;let Kr=d("div",{class:`spro-app${o.escuro?" spro-escuro":""}`});Bt.append(Xr,Kr);let j=d("input",{type:"search",class:"spro-busca",placeholder:"Buscar: texto, resp:ana, prazo:<7d, marcador:urgente...","aria-label":"Buscar processos",spellcheck:"false",autocomplete:"off"}),ir=d("div",{class:"spro-chips"}),Jr=d("div",{class:"spro-rapidos"}),cr=d("div",{class:"spro-status",role:"status","aria-live":"polite"}),zo=d("div",{class:"spro-lote",hidden:!0}),$o=d("div",{class:"spro-conteudo"}),so=d("div",{class:"spro-painel",hidden:!0}),Zr=d("div",{class:"spro-avisos","aria-live":"polite"}),wo=d("div",{class:"spro-ajuda-atalhos",hidden:!0},d("strong",{},"Atalhos"),...Rn.map(([l,u])=>d("div",{},d("kbd",{},l),` ${u}`))),Mo=d("select",{class:"spro-sel-campo","aria-label":"Agrupar por"},...Object.keys(qr).map(l=>d("option",{value:l},l==="nenhum"?"Sem agrupamento":`Agrupar: ${qr[l]}`))),Ro=d("select",{class:"spro-sel-campo","aria-label":"Ordenar por"},d("option",{value:""},"Ordem do SEI"),...[["protocolo","N\xFAmero do processo"],["prazo","Prazo"],["tipo","Tipo"],["responsavel","Respons\xE1vel"],["marcador","Marcador"],["caixa","Tempo na caixa"],["parado","Parado h\xE1"],["novo","N\xE3o visualizados"]].flatMap(([l,u])=>[d("option",{value:`${l}:a`},`${u} \u2191`),d("option",{value:`${l}:d`},`${u} \u2193`)])),Wr=d("select",{class:"spro-sel-campo","aria-label":"Filtrar por respons\xE1vel"}),Yr=d("select",{class:"spro-sel-campo","aria-label":"Filtrar por tipo"}),oe=d("select",{class:"spro-sel-campo","aria-label":"Filtrar por marcador"}),re=(l,u)=>d("button",{type:"button",class:"spro-seg-b","data-modo":l,title:u,onclick:()=>I({modo:l})},ao(l==="tabela"?"lista":"quadro",16),d("span",{},u)),ee=d("div",{class:"spro-seg",role:"group","aria-label":"Modo de exibi\xE7\xE3o"},re("tabela","Tabela"),re("quadro","Quadro")),No=(l,u,x,g="")=>d("button",{type:"button",class:`spro-bt ${g}`.trim(),title:u,"aria-label":u,onclick:x},ao(l,16),d("span",{},u)),te=No("colunas","Colunas",()=>go("colunas")),Qt=No("disquete","Vis\xF5es",()=>go("visoes")),Xt=No("lista","Exportar CSV",()=>oa()),Kt=d("button",{type:"button",class:"spro-bt spro-bt-icone",title:"Atalhos de teclado (?)","aria-label":"Atalhos de teclado",onclick:()=>{wo.hidden=!wo.hidden}},"?"),ae=No("densidade","Densidade",()=>I({densidade:r.densidade==="compacta"?"confortavel":"compacta"})),_o=d("div",{class:"spro-quadro-cfg",hidden:!0});Kr.append(d("div",{class:"spro-barra"},ee,d("div",{class:"spro-busca-caixa"},j),Mo,Ro,te,ae,Qt,Xt,Kt),ir,d("div",{class:"spro-faixa"},Jr,Wr,Yr,oe),_o,wo,so,cr,zo,$o,Zr),Mo.addEventListener("change",()=>I({agrupar:Mo.value})),Ro.addEventListener("change",()=>{let[l,u]=Ro.value.split(":");I({ordem:l?[{campo:l,decrescente:u==="d"}]:[]})});let ne=()=>pt(t,p),ko=()=>Mt(ne(),r.busca,V()),pr=()=>Rt(ko(),r.ordem,V());function I(l){r={...r,...l},l.busca===void 0?o.armazem.gravarVisao(r).catch(()=>{}):Jt(),H()}let lr;function Jt(){clearTimeout(lr),lr=setTimeout(()=>void o.armazem.gravarVisao(r).catch(()=>{}),400)}function Y(l,u){let x=d("div",{class:"spro-aviso",role:"status"},d("span",{},l));u&&x.append(d("button",{type:"button",class:"spro-link",onclick:()=>{u.fazer(),x.remove()}},u.rotulo)),x.append(d("button",{type:"button",class:"spro-aviso-x","aria-label":"Fechar aviso",onclick:()=>x.remove()},"\xD7")),Zr.append(x),setTimeout(()=>x.remove(),u?9e3:6e3).unref?.()}function io(l,u){let x=new Set(i);for(let g of l)u?x.add(g):x.delete(g);i=x,xt(e,x),dr(),uo()}function To(l,u){t=t.map(x=>x.id===l?u:x)}async function Zt(l,u,x){let g=t.find(R=>R.id===l);if(!g)return;let M=_t(r.quadro.colunas,g,u,x);if(!M.ok)return Y(M.motivo);let S=Object.fromEntries((h.responsaveis??[]).map(R=>[R.sigla,R.nome]));To(l,Hr(g,M.movimento,S)),H();let L=await q.mover(M.movimento);if(!y){if(!L.ok)return To(l,g),H(),Y(`N\xE3o foi poss\xEDvel mover ${g.protocolo}: ${L.erro}`);Y(`${g.protocolo} movido.`,{rotulo:"Desfazer",fazer:()=>{let R=t.find(oo=>oo.id===l)??g;To(l,Hr(R,L.desfazer,S)),H(),q.mover(L.desfazer).then(oo=>{oo.ok||y||(To(l,R),H(),Y(`N\xE3o foi poss\xEDvel desfazer: ${oo.erro}`))})}})}}let qo=jt({linhas:[],colunas:r.colunas,densidade:r.densidade,ctx:V(),ordem:r.ordem,selecionados:i,foco:c,aoOrdenar:(l,u)=>I({ordem:Ur(r.ordem,l,u)}),aoSelecionar:(l,u)=>io([l],u),aoGrupo:l=>{let u=new Set(s);u.has(l)?u.delete(l):u.add(l),s=u,o.armazem.gravarRecolhidos([...u]).catch(()=>{}),uo()},aoMarcarGrupo:(l,u)=>io(l,u)});function uo(){let l=pr();if(r.modo==="quadro"){$o.replaceChildren(Tt({processos:l,cfg:r.quadro,ctx:V(),extras:h,selecionados:i,aoMover:(x,g,M)=>void Zt(x,g,M),aoSelecionar:(x,g)=>io([x],g)}));return}let u=rr(l,r.agrupar,V());qo.atualizar({linhas:Lt(u,s,r.agrupar!=="nenhum"),colunas:r.colunas,densidade:r.densidade,ctx:V(),ordem:r.ordem,selecionados:i,foco:c,aoOrdenar:(x,g)=>I({ordem:Ur(r.ordem,x,g)}),aoSelecionar:(x,g)=>io([x],g),aoGrupo:x=>{let g=new Set(s);g.has(x)?g.delete(x):g.add(x),s=g,o.armazem.gravarRecolhidos([...g]).catch(()=>{}),uo()},aoMarcarGrupo:(x,g)=>io(x,g)}),$o.firstElementChild!==qo.el&&$o.replaceChildren(qo.el)}function se(l){let u=[`${l} de ${t.length} processo${t.length===1?"":"s"}`],x=o.inicial.totais.recebidos+o.inicial.totais.gerados;b&&f?u.push(`carregando ${f.grupo} (${f.paginasLidas}/${f.paginasTotal})\u2026`):!A&&x>t.length&&u.push(`o SEI informa ${x}; os demais n\xE3o foram carregados`),v&&u.push(`aviso: ${v}`),cr.replaceChildren(u.join(" \xB7 ")),cr.classList.toggle("spro-status-alerta",!!v||!A&&!b&&x>t.length)}function dr(){let l=i.size;if(zo.hidden=l===0,!l)return zo.replaceChildren();let u=new Set(ko().map(g=>g.id)),x=[...i].filter(g=>!u.has(g)).length;zo.replaceChildren(d("strong",{},`${l} selecionado${l===1?"":"s"}`),...x?[d("span",{class:"spro-suave"},`(${x} fora do filtro atual)`)]:[],...o.acoes().map(g=>d("button",{type:"button",class:"spro-bt",title:g.rotulo,onclick:()=>{let M=vt(g,i.size);!M.ok&&M.motivo&&Y(M.motivo)}},d("img",{src:g.icone,alt:"",width:"16",height:"16"}),d("span",{},g.rotulo))),d("button",{type:"button",class:"spro-link",onclick:()=>io([...i],!1)},"Limpar sele\xE7\xE3o"))}function Wt(){let l=_r(r.busca);ir.replaceChildren(...l.tokens.map(x=>d("span",{class:`spro-chip${x.termo.negado?" spro-chip-neg":""}`},x.texto,d("button",{type:"button","aria-label":`Remover ${x.texto}`,onclick:()=>{I({busca:Tr(r.busca,x.texto)}),j.value=r.busca}},"\xD7")))),ir.hidden=!l.tokens.length;let u=new Set(l.tokens.map(x=>x.texto));Jr.replaceChildren(...Nn.map(([x,g])=>d("button",{type:"button",class:`spro-rapido${u.has(g)?" spro-rapido-on":""}`,"aria-pressed":String(u.has(g)),onclick:()=>{I({busca:u.has(g)?Tr(r.busca,g):`${r.busca} ${g}`.trim()}),j.value=r.busca}},x)))}function ur(l,u,x,g){let M=l.querySelector("option[selected]")?.getAttribute("value")??"";l.replaceChildren(d("option",{value:""},u),...g.map(S=>d("option",{value:S.valor},`${S.rotulo} (${S.n})`))),Lo(l,g.some(S=>S.valor===M)?M:""),l.onchange=()=>{let S=l.value;S&&(I({busca:kt(r.busca,x,S)}),j.value=r.busca,Lo(l,""))}}function H(){if(y)return;let l=Ot(ne(),V());ur(Wr,"Respons\xE1vel\u2026","resp",l.responsaveis),ur(Yr,"Tipo\u2026","tipo",l.tipos),ur(oe,"Marcador\u2026","marcador",l.marcadores),Lo(Mo,r.agrupar),Mo.disabled=r.modo==="quadro",Lo(Ro,r.ordem[0]?`${r.ordem[0].campo}:${r.ordem[0].decrescente?"d":"a"}`:"");for(let u of ee.querySelectorAll("[data-modo]"))u.setAttribute("aria-pressed",String(u.getAttribute("data-modo")===r.modo));ae.title=r.densidade==="compacta"?"Linhas confort\xE1veis":"Linhas compactas",te.hidden=r.modo==="quadro",Yt(),Wt(),uo(),se(ko().length),dr(),r.modo==="quadro"&&!P&&o.extras&&(P=!0,o.extras().then(u=>{h=u,y||uo()}).catch(()=>{}))}function Yt(){if(_o.hidden=r.modo!=="quadro",_o.hidden)return;let l=r.quadro,u=d("select",{class:"spro-sel-campo","aria-label":"Colunas do quadro",onchange:M=>{P=!1,I({quadro:{...l,colunas:M.target.value}})}},...[["marcador","Colunas: marcador"],["responsavel","Colunas: respons\xE1vel"],["prazo","Colunas: prazo (leitura)"],["tipo","Colunas: tipo (leitura)"]].map(([M,S])=>d("option",{value:M},S)));Lo(u,l.colunas);let x=d("input",{type:"number",min:"0",max:"99",class:"spro-num",value:String(l.limite),"aria-label":"Limite de cart\xF5es por coluna (0 = sem limite)",title:"Limite de cart\xF5es por coluna (0 = sem limite)",onchange:M=>I({quadro:{...l,limite:Math.max(0,Math.min(99,Number(M.target.value)||0))}})}),g=d("input",{type:"checkbox",onchange:M=>I({quadro:{...l,raiasPorResponsavel:M.target.checked}})});g.checked=l.raiasPorResponsavel,_o.replaceChildren(u,d("label",{class:"spro-rotulo-inline"},"Limite ",x),d("label",{class:"spro-rotulo-inline"},g," Raias por respons\xE1vel"),d("span",{class:"spro-suave"},l.colunas==="marcador"||l.colunas==="responsavel"?"Arraste os cart\xF5es entre as colunas.":"Esta divis\xE3o \xE9 s\xF3 de leitura."))}function go(l){if(!so.hidden&&so.getAttribute("data-qual")===l){so.hidden=!0;return}if(so.setAttribute("data-qual",l),so.hidden=!1,l==="colunas"){so.replaceChildren(d("strong",{},"Colunas"),...vo.map(S=>{let L=d("input",{type:"checkbox",disabled:S==="processo"});return L.checked=r.colunas.includes(S),L.addEventListener("change",()=>{let R=L.checked?vo.filter(oo=>oo===S||r.colunas.includes(oo)):r.colunas.filter(oo=>oo!==S);I({colunas:R})}),d("label",{class:"spro-rotulo-linha"},L,` ${mo[S]}`)}),d("button",{type:"button",class:"spro-link",onclick:()=>I({colunas:Ao().colunas})},"Restaurar padr\xE3o"));return}let u=d("input",{type:"text",class:"spro-nome",maxlength:"40",placeholder:"Nome da vis\xE3o","aria-label":"Nome da vis\xE3o"}),x=a.find(S=>S.id===n);u.value=x?.nome??"";let g=async(S,L=a)=>{a=S,await o.armazem.gravarVisoes(S,L).catch(()=>Y("N\xE3o foi poss\xEDvel sincronizar as vis\xF5es."))},M=async S=>{let L={...r,nome:u.value.trim()||"Minha vis\xE3o",id:S==="atualizar"?n:""},R=dt(a,L,o.novoId);if(!R)return Y("Limite de vis\xF5es salvas atingido.");n=R.visao.id,await g(R.lista),Y(`Vis\xE3o "${R.visao.nome}" salva.`),go("visoes"),go("visoes")};so.replaceChildren(d("strong",{},"Vis\xF5es salvas"),a.length?d("ul",{class:"spro-lista-visoes"},...a.map(S=>d("li",{},d("button",{type:"button",class:`spro-link${S.id===n?" spro-ativa":""}`,onclick:()=>{n=S.id,j.value=S.busca,I({...S,id:""})}},S.nome),d("button",{type:"button",class:"spro-aviso-x","aria-label":`Excluir ${S.nome}`,title:"Excluir",onclick:async()=>{await g(ut(a,S.id),a),n===S.id&&(n=""),go("visoes"),go("visoes")}},"\xD7")))):d("p",{class:"spro-suave"},"Nenhuma vis\xE3o salva ainda."),d("div",{class:"spro-linha-form"},u,d("button",{type:"button",class:"spro-bt",onclick:()=>void M("nova")},"Salvar como nova"),x&&mt(r,x)?d("button",{type:"button",class:"spro-bt",onclick:()=>void M("atualizar")},"Atualizar"):null))}function oa(){let l=It(pr(),r.modo==="quadro"?[...vo]:r.colunas,V());o.baixar(Dt(o.hoje()),gt(l),"text/csv;charset=utf-8"),Y(`${l.length-1} processos exportados.`)}j.addEventListener("input",()=>{let l=j.value;if(o.semDebounce)return I({busca:l});clearTimeout(w),w=setTimeout(()=>I({busca:l}),120)}),j.addEventListener("keydown",l=>{l.key==="Escape"&&(j.value="",I({busca:""}),j.blur())});function ie(l){if(y||l.ctrlKey||l.metaKey||l.altKey)return;let u=l.target;if(u&&(/^(input|textarea|select)$/i.test(u.tagName)||u.isContentEditable)||Q.hidden)return;let g=l.key;if(O){O=!1,g==="t"?I({modo:"tabela"}):g==="q"&&I({modo:"quadro"});return}let M=pr().map(L=>L.id),S=c?M.indexOf(c):-1;if(g==="/")l.preventDefault(),j.focus();else if(g==="?")wo.hidden=!wo.hidden;else if(g==="g")O=!0;else if(g==="Escape")i.size&&io([...i],!1);else if((g==="j"||g==="k")&&r.modo==="tabela"&&M.length)c=M[Math.max(0,Math.min(M.length-1,S+(g==="j"?1:-1)))],uo(),qo.mostrar(c);else if(g==="x"&&c)t.find(R=>R.id===c)?.naPaginaAtual&&io([c],!i.has(c));else if(g==="Enter"&&c){let L=t.find(R=>R.id===c)?.link;L&&e.defaultView?.location.assign(L)}}e.addEventListener("keydown",ie);let ra=bt(e,l=>{i=l,dr(),uo()}),ea=o.armazem.aoMudarVisoes(()=>void o.armazem.lerVisoes().then(l=>{a=l}).catch(()=>{}));async function ta(){if(!o.fonte)return A=!0,ce(!0);b=!0,H();let l=await tt(o.inicial,o.fonte,{sinal:no.signal,aoProgresso:u=>{f=u,se(ko().length)},aoPagina:u=>{t=[...t,...u],H()}});b=!1,A=l.completo,l.erro&&(v=l.erro),ce(l.completo)}function ce(l){p=Ir(p,t.map(u=>u.id),o.agora(),l),o.armazem.gravarIdade(p).catch(()=>{}),H()}async function aa(){try{let l=await o.armazem.lerEstado();r=l.visao,s=new Set(l.recolhidos),p=ct(l.idade,o.agora()),m=p.visitaAnterior,a=await o.armazem.lerVisoes()}catch{}p=Ir(p,t.map(l=>l.id),o.agora(),!1),j.value=r.busca,H(),ta()}return{host:Q,iniciar:aa,render:H,estado:()=>({visao:r,todos:t,selecionados:i,completo:A,carregando:b,filtrados:ko().length}),definirVisao:l=>{r={...r,...l},j.value=r.busca,H()},fechar(){y=!0,no.abort(),clearTimeout(w),clearTimeout(lr),e.removeEventListener("keydown",ie),ra(),ea(),Q.remove()},mostrar:l=>{Q.hidden=!l}}}var Ut=`/* Dentro do Shadow DOM: o base.css do sei-comum (tokens) vem antes deste arquivo. */
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
`;var Gt=`/* Na p\xE1gina do SEI (fora do Shadow DOM): o bot\xE3o alternador e o espa\xE7o da grade. */
.spro-grade-botao { display: inline-flex; align-items: center; margin-left: 4px; padding: 2px; line-height: 0; color: inherit; cursor: pointer; background: none; border: 0; border-radius: 6px; }
.spro-grade-botao:hover { background: color-mix(in srgb, currentColor 14%, transparent); }
.spro-grade-botao[aria-pressed="true"] { color: #1f5fbf; }
.spro-grade-botao:focus-visible { outline: 2px solid #1f5fbf; outline-offset: 1px; }
#spro-grade { display: block; width: 100%; flex: 0 0 100%; }
#spro-grade[hidden] { display: none; }
`;var qn="gradecontrole";function Vn(){return new URL(location.href).searchParams.get("acao")==="procedimento_controlar"}var nr=()=>!!document.body?.classList.contains("dark-mode")||de(localStorage),Eo=!1,W=null,lo=null,So=null,Ht=document.readyState!=="loading";function jn(){let o=document.querySelector(et);return document.getElementById("divTabelaProcesso")??o?.parentElement??null}function Po(o){lo?.pronta(),W?.mostrar(!1),Xo(document),o&&o!=="usuario"&&console.warn("[SEI Pro] Grade do controle indispon\xEDvel, usando a vis\xE3o nativa:",o)}function Qr(){if(W||!Eo)return;let o=new Ho(location.href,()=>Bo(document,location.href)),e=Ar(Bo(document,location.href)),t=e.unidade.id,r=ft({local:mr(chrome.storage.local,"local"),sync:mr(chrome.storage.sync,"sync")},String(t)),a=Jo(document);if(!a.processos.length&&!a.totais.recebidos&&!a.totais.gerados)return lo?.pronta(),Po("caixa vazia");let n=jn();if(!n)return Po("sem ponto de encaixe");let s=a.processos[0]?.id??"";W=Ft({doc:document,inicial:a,agora:()=>Date.now(),hoje:()=>jo(),eu:e.usuario.login||void 0,armazem:r,fonte:at(o.http,Bo(document,location.href)),mover:{marcador:async(i,c)=>void await $e(o,i,c,{aplicar:!0}),atribuir:async(i,c)=>void await ze(o,i,c,{aplicar:!0})},acoes:()=>Fe(document),css:`${me}
${Ut}`,escuro:nr(),baixar:(i,c,p)=>ge(i,c,p),novoId:()=>ue(),extras:s?async()=>{let[i,c]=await Promise.all([br(o,"marcadores",s),br(o,"usuarios",s)]);return{marcadores:i.map(p=>p.nome),responsaveis:c.map(p=>{let[m,...f]=p.nome.split(" - ");return{sigla:m.trim(),nome:f.join(" - ").trim()||m.trim()}})}}:void 0,aoVoltarNativa:()=>sr()}),n.before(W.host),W.iniciar().then(()=>{lo?.pronta(),xo(document)&&Sr(document)}).catch(i=>Po(String(i)))}function sr(){xo(document)?(W?.mostrar(!1),Xo(document)):(Qo(document,nr()),W?(W.mostrar(!0),Sr(document)):Qr()),So?.(),So=Ko(document,()=>xo(document),sr)}function Fn(o){o!==Eo&&(Eo=o,Ge(localStorage,o),o?(Qo(document,nr()),lo=Pr(Po),Ht&&(lo.iniciarContagem(),Qr()),So=Ko(document,()=>xo(document),sr)):(So?.(),So=null,W?.fechar(),W=null,lo?.pronta(),Xo(document)))}function Un(){if(!Vn())return;let o=document.createElement("style");o.textContent=Gt,(document.head??document.documentElement).append(o),Ue(localStorage)&&(Eo=!0,Qo(document,nr()),lo=Pr(Po));let e=()=>{Ht=!0,Eo&&(lo?.iniciarContagem(),Qr(),So??=Ko(document,()=>xo(document),sr))};document.readyState==="loading"?document.addEventListener("DOMContentLoaded",e,{once:!0}):e();let t=a=>Fn(le(a,qn)),r=!1;chrome.storage.onChanged.addListener((a,n)=>{n!=="sync"||!("dataValues"in a)||(r=!0,t(a.dataValues.newValue))}),chrome.storage.sync.get("dataValues").then(a=>{r||t(a.dataValues)}).catch(()=>{Eo&&Po("sem prefer\xEAncias")})}Un();})();
