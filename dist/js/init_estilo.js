/* GERADO por estilo-avancado/build.mjs. NAO EDITE ESTE ARQUIVO. Rode: npm run build */
"use strict";(()=>{var E="#1f5fbf",no="#79acff",N="#14181d",so={claro:"#ffffff",escuro:"#1a1d21"},U=4.5,F=[{id:"sei-pro",nome:"SEI Pro",cor:"#1f5fbf"},{id:"oceano",nome:"Oceano",cor:"#0b6e99"},{id:"floresta",nome:"Floresta",cor:"#1f7a4d"},{id:"esmeralda",nome:"Esmeralda",cor:"#0e7c66"},{id:"grafite",nome:"Grafite",cor:"#3a4350"},{id:"vinho",nome:"Vinho",cor:"#8a2a43"},{id:"roxo",nome:"Roxo",cor:"#5b43b8"},{id:"ambar",nome:"\xC2mbar",cor:"#a85d00"},{id:"ardosia",nome:"Ard\xF3sia",cor:"#475c7a"},{id:"preto",nome:"Preto",cor:"#14181d"}],B=(r,o=0,t=1)=>Math.min(t,Math.max(o,r));function f(r){let o=String(r).trim().toLowerCase(),t=/^#([0-9a-f])([0-9a-f])([0-9a-f])$/.exec(o);if(t)return[t[1],t[2],t[3]].map(e=>Number.parseInt(e+e,16));let a=/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/.exec(o);return a?[a[1],a[2],a[3]].map(e=>Number.parseInt(e,16)):null}var k=r=>`#${r.map(o=>Math.round(B(o,0,255)).toString(16).padStart(2,"0")).join("")}`,z=r=>r<=.04045?r/12.92:((r+.055)/1.055)**2.4,io=r=>r<=.0031308?12.92*r:1.055*r**(1/2.4)-.055;function co(r){let[o,t,a]=r.map(i=>z(i/255)),e=Math.cbrt(.4122214708*o+.5363325363*t+.0514459929*a),n=Math.cbrt(.2119034982*o+.6806995451*t+.1073969566*a),s=Math.cbrt(.0883024619*o+.2817188376*t+.6299787005*a);return[.2104542553*e+.793617785*n-.0040720468*s,1.9779984951*e-2.428592205*n+.4505937099*s,.0259040371*e+.7827717662*n-.808675766*s]}function po(r,o,t){let a=(r+.3963377774*o+.2158037573*t)**3,e=(r-.1055613458*o-.0638541728*t)**3,n=(r-.0894841775*o-1.291485548*t)**3;return[4.0767416621*a-3.3077115913*e+.2309699292*n,-1.2684380046*a+2.6097574011*e-.3413193965*n,-.0041960863*a-.7034186147*e+1.707614701*n]}function y(r){let o=f(r)??f(E),[t,a,e]=co(o),n=Math.hypot(a,e);return{l:t,c:n,h:n<1e-4?0:(Math.atan2(e,a)*180/Math.PI+360)%360}}var H=r=>r.every(o=>o>=-5e-4&&o<=1.0005);function m({l:r,c:o,h:t}){let a=B(r),e=t*Math.PI/180,n=i=>po(a,i*Math.cos(e),i*Math.sin(e)),s=n(o);if(!H(s)){let i=0,p=o;for(let l=0;l<24;l++){let d=(i+p)/2;H(n(d))?i=d:p=d}s=n(i)}return k(s.map(i=>io(B(i))*255))}function V(r){let o=f(r)??[0,0,0],[t,a,e]=o.map(n=>z(n/255));return .2126*t+.7152*a+.0722*e}function x(r,o){let[t,a]=[V(r),V(o)];return(Math.max(t,a)+.05)/(Math.min(t,a)+.05)}function G(r,o){let t=f(r)?r:E,{l:a,c:e,h:n}=y(t),s=e<.03;o==="escuro"&&(a=Math.min(a,.42),e*=.85);let i=m({l:a,c:e,h:n}),p=x("#ffffff",i)>=x(N,i)?"#ffffff":N;for(let A=0;A<100&&x(p,i)<U;A++)a+=p==="#ffffff"?-.01:.01,i=m({l:a,c:e,h:n});let d=m({l:a+(o==="escuro"?.05:-.05),c:e,h:n}),c=m({l:a-.08,c:e,h:n}),u=m({l:Math.min(a,.26),c:e*.55,h:n}),I=so[o],g=y(s?o==="escuro"?no:E:t),M=o==="escuro"?Math.max(g.l,.7):Math.min(g.l,.55),O=m({l:M,c:g.c,h:g.h});for(let A=0;A<100&&x(O,I)<U;A++)M+=o==="escuro"?.01:-.01,O=m({l:M,c:g.c,h:g.h});return{barra:i,texto:p,hover:d,borda:c,menu:u,destaque:O}}var S="spro_tema",P="spro_tema_cache",T={versao:1,ativo:!1,modo:"auto",paleta:"sei-pro",corBarra:E,escurecerDocumentos:!0};function C(r){if(typeof r=="string")try{return C(JSON.parse(r))}catch{return{...T}}if(!r||typeof r!="object"||r.versao!==1)return{...T};let o=r,t=o.modo==="claro"||o.modo==="escuro"||o.modo==="auto"?o.modo:T.modo,a=F.find(p=>p.id===o.paleta),e=typeof o.corBarra=="string"?o.corBarra.trim().toLowerCase():"",n=f(e)&&/^#[0-9a-f]{6}$/.test(e)?e:null,s=a?a.id:"livre",i=a?a.cor:n??T.corBarra;return{versao:1,ativo:o.ativo===!0,modo:t,paleta:a||n?s:T.paleta,corBarra:i,escurecerDocumentos:o.escurecerDocumentos!==!1}}function q(r,o){return r.modo==="claro"?"claro":r.modo==="escuro"||o?"escuro":"claro"}var j=`/*
 * Folha base do Estilo Avan\xE7ado 2 (sub-projeto 1): barra, p\xE1gina, links, tabelas, campos,
 * bot\xF5es e di\xE1logos. S\xF3 var(--spro-*): nenhuma cor literal aqui (h\xE1 um teste que confere).
 * Tudo sob :root[data-spro-tema-ativo], que s\xF3 existe com a op\xE7\xE3o ligada.
 *
 * Seletores do SEI 4.1.5 e do 5.0.x (infra-global-esquema-3.css). A casca completa
 * (menu, \xE1rvore, barra de a\xE7\xF5es) \xE9 do sub-projeto 2; telas nativas, do 3.
 */

/*
 * Tema nativo do SEI (esquemas de cor do infra): o SEI define as cores da barra, do menu e do
 * t\xEDtulo dos di\xE1logos em classes com !important e em vari\xE1veis no :root. S\xF3 aqui o !important
 * \xE9 permitido (o teste confere): \xE9 a \xFAnica forma de uma regra de tema vencer outra de tema.
 */
:root[data-spro-tema-ativo] {
  --infra-esquema-cor-barra-superior: var(--spro-barra-borda);
  --infra-esquema-cor-barra-sistema: var(--spro-barra);
  --infra-esquema-cor-clara: var(--spro-destaque);
  --infra-esquema-cor-escura: var(--spro-barra-borda);
  --infra-esquema-cor-texto: var(--spro-texto);
}
:root[data-spro-tema-ativo] .infraCorBarraSuperior {
  background-color: var(--spro-barra-borda) !important;
}
:root[data-spro-tema-ativo] .infraCorBarraSistema {
  background-color: var(--spro-barra) !important;
  color: var(--spro-barra-texto);
}
:root[data-spro-tema-ativo] .infraCorMenu {
  background-color: var(--spro-menu) !important;
}
:root[data-spro-tema-ativo] .sparkling-modal-title {
  background-color: var(--spro-barra) !important;
  color: var(--spro-barra-texto);
}
:root[data-spro-tema-ativo] div.pesquisaPaginaSelecionada {
  background-color: var(--spro-destaque) !important;
  color: var(--spro-destaque-texto);
}
:root[data-spro-tema-ativo] .divInfraAreaTelaE,
:root[data-spro-tema-ativo] #divInfraPesquisarMenu {
  background-color: var(--spro-menu);
  color: var(--spro-menu-texto);
}

/* P\xE1gina */
:root[data-spro-tema-ativo] body,
:root[data-spro-tema-ativo] #divInfraAreaGlobal,
:root[data-spro-tema-ativo] div.infraAreaGlobal,
:root[data-spro-tema-ativo] #divInfraAreaTela,
:root[data-spro-tema-ativo] div.infraAreaTela {
  background-color: var(--spro-pagina);
  color: var(--spro-texto);
  font-family: var(--spro-fonte);
}
:root[data-spro-tema-ativo] div.infraAreaTela {
  background-image: none;
}
:root[data-spro-tema-ativo] div.infraBarraLocalizacao,
:root[data-spro-tema-ativo] label,
:root[data-spro-tema-ativo] .infraLegend,
:root[data-spro-tema-ativo] legend {
  color: var(--spro-texto);
}

/* Barra superior */
:root[data-spro-tema-ativo] #divInfraBarraSistemaPadrao,
:root[data-spro-tema-ativo] #divInfraBarraSistema,
:root[data-spro-tema-ativo] div.infraBarraSistema,
:root[data-spro-tema-ativo] .infraBarraSistemaPadraoE,
:root[data-spro-tema-ativo] .infraCorBarraSistema,
:root[data-spro-tema-ativo] #divInfraBarraSistemaPadraoE {
  background-color: var(--spro-barra);
  color: var(--spro-barra-texto);
}
:root[data-spro-tema-ativo] #divInfraBarraSistemaLinha {
  background-color: var(--spro-barra-borda);
}
:root[data-spro-tema-ativo] #divInfraBarraSistemaPadrao a,
:root[data-spro-tema-ativo] #divInfraBarraSistema a,
:root[data-spro-tema-ativo] div.infraBarraSistema a,
:root[data-spro-tema-ativo] div.infraBarraSistema h6,
:root[data-spro-tema-ativo] #spnInfraIdentificacaoSistema,
:root[data-spro-tema-ativo] .infraBarraSistemaPadraoE span {
  color: var(--spro-barra-texto);
}
:root[data-spro-tema-ativo] #divInfraBarraSistemaPadrao a:hover,
:root[data-spro-tema-ativo] div.infraAcaoBarraSistema a:hover {
  background-color: var(--spro-barra-hover);
}

/* Links */
:root[data-spro-tema-ativo] a,
:root[data-spro-tema-ativo] a.ancoraPadraoAzul,
:root[data-spro-tema-ativo] a.ancoraPadraoPreta,
:root[data-spro-tema-ativo] a.infraAncoraSigla {
  color: var(--spro-destaque);
}
:root[data-spro-tema-ativo] #divInfraBarraSistemaPadrao a {
  color: var(--spro-barra-texto);
}

/* Tabelas */
:root[data-spro-tema-ativo] table.infraTable {
  color: var(--spro-texto);
  border-color: var(--spro-borda);
}
:root[data-spro-tema-ativo] table.infraTable thead tr,
:root[data-spro-tema-ativo] table.infraTable tr > th.infraTh,
:root[data-spro-tema-ativo] th.infraTh {
  background-color: var(--spro-fundo-3);
  color: var(--spro-texto);
  border-color: var(--spro-borda);
}
:root[data-spro-tema-ativo] table.infraTable td {
  border-color: var(--spro-borda);
}
:root[data-spro-tema-ativo] tr.infraTrClara,
:root[data-spro-tema-ativo] td.infraTdClara {
  background-color: var(--spro-fundo);
}
:root[data-spro-tema-ativo] tr.infraTrEscura,
:root[data-spro-tema-ativo] td.infraTdEscura {
  background-color: var(--spro-fundo-2);
}
:root[data-spro-tema-ativo] tr.infraTrSelecionada,
:root[data-spro-tema-ativo] tr.infraTrMarcada,
:root[data-spro-tema-ativo] tr.infraTrAcessada {
  background-color: var(--spro-destaque-suave);
}
:root[data-spro-tema-ativo] tr.infraTrClara:hover,
:root[data-spro-tema-ativo] tr.infraTrEscura:hover {
  background-color: var(--spro-destaque-suave);
}
:root[data-spro-tema-ativo] caption.infraCaption {
  color: var(--spro-suave);
}

/* Campos */
:root[data-spro-tema-ativo] input.infraText,
:root[data-spro-tema-ativo] textarea.infraTextarea,
:root[data-spro-tema-ativo] select.infraSelect,
:root[data-spro-tema-ativo] input[type="text"],
:root[data-spro-tema-ativo] input[type="password"],
:root[data-spro-tema-ativo] input[type="search"],
:root[data-spro-tema-ativo] input[type="date"],
:root[data-spro-tema-ativo] input[type="number"],
:root[data-spro-tema-ativo] textarea,
:root[data-spro-tema-ativo] select,
:root[data-spro-tema-ativo] .chosen-container-single .chosen-single,
:root[data-spro-tema-ativo] .chosen-container-multi .chosen-choices {
  background-color: var(--spro-fundo);
  color: var(--spro-texto);
  border: 1px solid var(--spro-borda-forte);
  border-radius: var(--spro-raio-p);
}
:root[data-spro-tema-ativo] input.infraText:focus,
:root[data-spro-tema-ativo] textarea.infraTextarea:focus,
:root[data-spro-tema-ativo] select.infraSelect:focus,
:root[data-spro-tema-ativo] input:focus,
:root[data-spro-tema-ativo] textarea:focus,
:root[data-spro-tema-ativo] select:focus {
  outline: none;
  border-color: var(--spro-destaque);
  box-shadow: var(--spro-anel);
}
:root[data-spro-tema-ativo] input:disabled,
:root[data-spro-tema-ativo] input[readonly],
:root[data-spro-tema-ativo] textarea:disabled,
:root[data-spro-tema-ativo] select:disabled {
  background-color: var(--spro-fundo-2);
  color: var(--spro-suave);
}
:root[data-spro-tema-ativo] ::placeholder {
  color: var(--spro-fraco);
}

/* Bot\xF5es */
:root[data-spro-tema-ativo] input.infraButton,
:root[data-spro-tema-ativo] button.infraButton,
:root[data-spro-tema-ativo] a.infraAnchorButton {
  background-color: var(--spro-fundo);
  color: var(--spro-texto);
  border: 1px solid var(--spro-borda-forte);
  border-radius: var(--spro-raio);
  transition: background-color var(--spro-dur), border-color var(--spro-dur), box-shadow var(--spro-dur);
}
:root[data-spro-tema-ativo] input.infraButton span,
:root[data-spro-tema-ativo] button.infraButton span,
:root[data-spro-tema-ativo] button.infraButton:hover span,
:root[data-spro-tema-ativo] input.infraButton:hover span {
  color: inherit;
}
:root[data-spro-tema-ativo] input.infraButton:hover,
:root[data-spro-tema-ativo] button.infraButton:hover,
:root[data-spro-tema-ativo] a.infraAnchorButton:hover {
  background-color: var(--spro-destaque);
  border-color: var(--spro-destaque);
  color: var(--spro-destaque-texto);
}
:root[data-spro-tema-ativo] input.infraButton:focus-visible,
:root[data-spro-tema-ativo] button.infraButton:focus-visible {
  outline: none;
  box-shadow: var(--spro-anel);
}

/* Di\xE1logos (jQuery UI e Bootstrap do SEI 5) */
:root[data-spro-tema-ativo] .ui-dialog,
:root[data-spro-tema-ativo] .modal-content,
:root[data-spro-tema-ativo] .ui-widget-content {
  background-color: var(--spro-fundo);
  color: var(--spro-texto);
  border-color: var(--spro-borda);
}
:root[data-spro-tema-ativo] .ui-dialog {
  border-radius: var(--spro-raio-g);
  box-shadow: var(--spro-sombra-3);
}
:root[data-spro-tema-ativo] .ui-dialog-titlebar,
:root[data-spro-tema-ativo] .ui-widget-header,
:root[data-spro-tema-ativo] .modal-header,
:root[data-spro-tema-ativo] .modal-footer,
:root[data-spro-tema-ativo] .ui-dialog-buttonpane {
  background-color: var(--spro-fundo-2);
  color: var(--spro-texto);
  border-color: var(--spro-borda);
}
:root[data-spro-tema-ativo] .ui-widget-overlay {
  background: var(--spro-veu);
  opacity: 1;
}

/* Rolagem */
:root[data-spro-tema-ativo] {
  scrollbar-color: var(--spro-borda-forte) var(--spro-pagina);
}
`;var lo={claro:{"--spro-fundo":"#ffffff","--spro-fundo-2":"#f6f7f9","--spro-fundo-3":"#eceef2","--spro-pagina":"#f3f4f7","--spro-texto":"#1b1f24","--spro-suave":"#5d6772","--spro-fraco":"#8b939c","--spro-borda":"#e3e6eb","--spro-borda-forte":"#cfd4db","--spro-perigo":"#d1352b","--spro-aviso":"#b45c0a","--spro-ok":"#12805c","--spro-sombra-1":"0 1px 2px rgb(16 24 40 / 6%)","--spro-sombra-2":"0 2px 4px -2px rgb(16 24 40 / 8%), 0 6px 14px -4px rgb(16 24 40 / 12%)","--spro-sombra-3":"0 10px 24px -6px rgb(16 24 40 / 18%), 0 24px 56px -12px rgb(16 24 40 / 24%)","--spro-veu":"rgb(17 21 28 / 46%)"},escuro:{"--spro-fundo":"#1a1d21","--spro-fundo-2":"#22262b","--spro-fundo-3":"#2b3036","--spro-pagina":"#141619","--spro-texto":"#e7e9ec","--spro-suave":"#a4abb3","--spro-fraco":"#767e87","--spro-borda":"#2f343a","--spro-borda-forte":"#3d434a","--spro-perigo":"#ff7d73","--spro-aviso":"#e8b04a","--spro-ok":"#4fcf96","--spro-sombra-1":"0 1px 2px rgb(0 0 0 / 30%)","--spro-sombra-2":"0 2px 4px -2px rgb(0 0 0 / 40%), 0 6px 14px -4px rgb(0 0 0 / 45%)","--spro-sombra-3":"0 10px 24px -6px rgb(0 0 0 / 50%), 0 24px 56px -12px rgb(0 0 0 / 60%)","--spro-veu":"rgb(0 0 0 / 58%)"}},mo={claro:"#ffffff",escuro:"#0a1526"};function fo(r,o){let t=G(r.corBarra,o);return{...lo[o],"--spro-barra":t.barra,"--spro-barra-texto":t.texto,"--spro-barra-hover":t.hover,"--spro-barra-borda":t.borda,"--spro-menu":t.menu,"--spro-menu-texto":"#f2f4f7","--spro-destaque":t.destaque,"--spro-destaque-texto":mo[o],"--spro-destaque-suave":"color-mix(in srgb, var(--spro-destaque) 12%, transparent)","--spro-destaque-medio":"color-mix(in srgb, var(--spro-destaque) 22%, transparent)","--spro-anel":"0 0 0 3px color-mix(in srgb, var(--spro-destaque) 30%, transparent)","--spro-raio-p":"6px","--spro-raio":"8px","--spro-raio-g":"12px","--spro-raio-xg":"16px","--spro-fonte":'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',"--spro-dur":"150ms"}}function Q(r,o,t=""){return`:root[data-spro-tema-ativo] {
${Object.entries(fo(r,o)).map(([e,n])=>`  ${e}: ${n};`).join(`
`)}
  color-scheme: ${o==="escuro"?"dark":"light"};
}
${t}`}var X="data-spro-tema",J="data-spro-tema-ativo",R="data-spro-tema-estilo";function W(r,o,t,a){if(!o.ativo){bo(r);return}let e=q(o,t),n=r.documentElement;if(!n)return;let s=r.querySelector(`style[${R}]`);s||(s=r.createElement("style"),s.setAttribute(R,""),(r.head??n).appendChild(s));let i=Q(o,e,a);s.textContent!==i&&(s.textContent=i),n.setAttribute(J,""),n.setAttribute(X,e),n.style.colorScheme=e==="escuro"?"dark":"light"}function bo(r){for(let t of r.querySelectorAll(`style[${R}]`))t.remove();let o=r.documentElement;o&&(o.removeAttribute(J),o.removeAttribute(X),o.style.removeProperty("color-scheme"),o.getAttribute("style")||o.removeAttribute("style"))}function Z(r){try{let o=r.getItem(P);return o?C(o):null}catch{return null}}function K(r,o){try{r.setItem(P,JSON.stringify(o))}catch{}}var _="#1a1d21",vo="#e7e9ec",go=y(_).l,Y={black:"#000000",white:"#ffffff",red:"#ff0000",blue:"#0000ff",green:"#008000",lime:"#00ff00",yellow:"#ffff00",orange:"#ffa500",purple:"#800080",gray:"#808080",grey:"#808080",silver:"#c0c0c0",navy:"#000080",maroon:"#800000",teal:"#008080",aqua:"#00ffff",cyan:"#00ffff",fuchsia:"#ff00ff",magenta:"#ff00ff",olive:"#808000",brown:"#a52a2a",pink:"#ffc0cb"};function xo(r){let o=r.trim().toLowerCase();if(!o||o==="transparent"||o==="inherit"||o==="initial"||o==="unset"||o==="currentcolor")return null;if(Y[o])return Y[o];if(o.startsWith("#"))return f(o)?k(f(o)):null;let t=/^rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)(?:[,\s/]+([\d.]+%?))?\s*\)$/.exec(o);if(!t||!((t[4]===void 0?1:t[4].endsWith("%")?Number.parseFloat(t[4])/100:Number.parseFloat(t[4]))>0))return null;let e=[t[1],t[2],t[3]].map(n=>Number(n));return e.some(n=>!Number.isFinite(n)||n<0||n>255)?null:k(e)}function L(r,o){let t=xo(r);if(!t)return null;let{l:a,c:e,h:n}=y(t),s=e<.02;if(o==="texto"){if(s&&(a<.3||a>.9))return vo;let p=a>=.75?Math.max(.85,a):.62+(1-a)*.33,l=m({l:p,c:e,h:n});for(let d=0;d<40&&x(l,_)<4.5;d++)p+=.01,l=m({l:p,c:e,h:n});return l}if(s&&a>.97)return _;let i=Math.min(.36,go+(1-a)*.16+Math.min(e,.2)*.8);return m({l:i,c:e,h:n})}var h="data-spro-adaptado",v="data-spro-original",w="--spro-doc-texto",$="--spro-doc-fundo",D="data-spro-tema-doc",b="data-spro-ver-original",ho=400,oo="[style],[bgcolor],[color],font,td,th,table",Ao=new Set(["IMG","CANVAS","SVG","IFRAME","EMBED","OBJECT","VIDEO","SCRIPT","STYLE","LINK"]),Eo=`
:root[data-spro-tema="escuro"]:not([${v}]) [${h}~="t"] { color: var(${w}) !important; }
:root[data-spro-tema="escuro"]:not([${v}]) [${h}~="f"] { background-color: var(${$}) !important; }
:root[${v}] body { background: #fff; color: #000; }
[${b}] { position: fixed; bottom: 12px; left: 12px; z-index: 2147483000; padding: 4px 10px;
  font: 12px/1.4 var(--spro-fonte, system-ui, sans-serif); color: var(--spro-texto); background: var(--spro-fundo);
  border: 1px solid var(--spro-borda-forte); border-radius: var(--spro-raio, 8px); cursor: pointer; box-shadow: var(--spro-sombra-2); }
[${b}]:hover { background: var(--spro-destaque); color: var(--spro-destaque-texto); }
[${b}][aria-pressed="true"] { outline: 2px solid var(--spro-destaque); }
`;function yo(r,o,t){let a=r.style;return a?.getPropertyValue?.(o)||(o==="background-color"?a?.getPropertyValue?.("background"):"")||""||r.getAttribute(t)||""}function ro(r,o){let e=yo(r,o==="texto"?"color":"background-color",o==="texto"?"color":"bgcolor");if(e)return e;if(o==="fundo"&&/^(TD|TH|TABLE)$/.test(r.tagName))try{return r.ownerDocument.defaultView?.getComputedStyle(r).backgroundColor??""}catch{return""}return""}function To(r,o){if(Ao.has(r.tagName.toUpperCase())||r.closest?.(`[${b}]`))return;let t="",a=()=>{o.has(r)||o.set(r,r.getAttribute("style"))},e=L(ro(r,"texto"),"texto");e&&(a(),r.style.setProperty(w,e),t+="t");let n=L(ro(r,"fundo"),"fundo");n&&(a(),r.style.setProperty($,n),t+="f"),t&&r.setAttribute(h,t)}function So(r){for(let o of[r,...r.querySelectorAll(`[${h}]`)]){if(!o.hasAttribute(h))continue;o.removeAttribute(h);let t=o.style;t.removeProperty(w),t.removeProperty($),o.getAttribute("style")||o.removeAttribute("style")}}function to(r){let o=globalThis;typeof o.requestIdleCallback=="function"?o.requestIdleCallback(r):setTimeout(r,0)}function ao(r,o={}){let t=(o.raizes??["body"]).flatMap(c=>[...r.querySelectorAll(c)]);if(t.length===0)return()=>{};if(!r.querySelector(`style[${D}]`)){let c=r.createElement("style");c.setAttribute(D,""),c.textContent=Eo,(r.head??r.documentElement).appendChild(c)}let a=new WeakSet,e=new Map,n=[],s=!1,i=!0,p=()=>{if(s=!1,!!i){for(let c of n.splice(0,ho))a.has(c)||(a.add(c),To(c,e));n.length>0&&(s=!0,to(p))}},l=c=>{if(c.nodeType===1){c.matches?.(oo)&&n.push(c);for(let u of c.querySelectorAll?.(oo)??[])n.push(u);!s&&n.length>0&&(s=!0,to(p))}};for(let c of t)l(c);let d=null;if(typeof MutationObserver=="function"){d=new MutationObserver(c=>{for(let u of c)if(u.type==="childList")for(let I of u.addedNodes)l(I);else u.type==="attributes"&&u.target.nodeType===1&&(a.delete(u.target),l(u.target))});for(let c of t)d.observe(c,{childList:!0,subtree:!0})}return o.botao&&ko(r),()=>{i=!1,d?.disconnect(),n=[],So(r.documentElement);for(let[c,u]of e)u===null?c.removeAttribute("style"):c.setAttribute("style",u);e.clear();for(let c of r.querySelectorAll(`style[${D}], [${b}]`))c.remove();r.documentElement.removeAttribute(v)}}function Co(r){let o=r.documentElement,t=!o.hasAttribute(v);return t?o.setAttribute(v,""):o.removeAttribute(v),r.querySelector(`[${b}]`)?.setAttribute("aria-pressed",String(t)),t}function ko(r){if(r.querySelector(`[${b}]`)||!r.body)return;let o=r.createElement("button");o.type="button",o.setAttribute(b,""),o.setAttribute("aria-pressed","false"),o.title="Mostra o documento com as cores originais, como ser\xE1 assinado",o.textContent="Ver original",o.addEventListener("click",()=>Co(r)),r.body.appendChild(o)}var eo=window;if(!eo.__seiProEstilo2){eo.__seiProEstilo2=!0;let r=typeof matchMedia=="function"?matchMedia("(prefers-color-scheme: dark)"):null,o=null,t=/[?&]acao=(documento_visualizar|documento_imprimir_web)\b/.test(location.search),a=null,e=()=>{if(!o)return;let s=r?.matches??!1;W(document,o,s,j);let i=t&&o.ativo&&o.escurecerDocumentos&&q(o,s)==="escuro";if(i&&!a){let p=()=>{a!==null&&(a=ao(document,{botao:!0}))};a=()=>{},document.readyState==="loading"?document.addEventListener("DOMContentLoaded",p,{once:!0}):p()}else!i&&a&&(a(),a=null)};o=Z(localStorage),e(),r?.addEventListener("change",e);let n=s=>{o=C(s),K(localStorage,o),e()};chrome.storage.sync.get(S).then(s=>n(s[S])).catch(s=>console.warn("[SEI Pro] estilo avancado 2:",s)),chrome.storage.onChanged.addListener((s,i)=>{i==="sync"&&s[S]&&n(s[S].newValue)})}})();
