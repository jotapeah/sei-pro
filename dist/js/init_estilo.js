/* GERADO por estilo-avancado/build.mjs. NAO EDITE ESTE ARQUIVO. Rode: npm run build */
"use strict";(()=>{var _="#1f5fbf",so="#79acff",N="#14181d",no={claro:"#ffffff",escuro:"#1a1d21"},U=4.5,H=[{id:"sei-pro",nome:"SEI Pro",cor:"#1f5fbf"},{id:"oceano",nome:"Oceano",cor:"#0b6e99"},{id:"floresta",nome:"Floresta",cor:"#1f7a4d"},{id:"esmeralda",nome:"Esmeralda",cor:"#0e7c66"},{id:"grafite",nome:"Grafite",cor:"#3a4350"},{id:"vinho",nome:"Vinho",cor:"#8a2a43"},{id:"roxo",nome:"Roxo",cor:"#5b43b8"},{id:"ambar",nome:"\xC2mbar",cor:"#a85d00"},{id:"ardosia",nome:"Ard\xF3sia",cor:"#475c7a"},{id:"preto",nome:"Preto",cor:"#14181d"}],P=(r,o=0,a=1)=>Math.min(a,Math.max(o,r));function v(r){let o=String(r).trim().toLowerCase(),a=/^#([0-9a-f])([0-9a-f])([0-9a-f])$/.exec(o);if(a)return[a[1],a[2],a[3]].map(e=>Number.parseInt(e+e,16));let t=/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/.exec(o);return t?[t[1],t[2],t[3]].map(e=>Number.parseInt(e,16)):null}var S=r=>`#${r.map(o=>Math.round(P(o,0,255)).toString(16).padStart(2,"0")).join("")}`,F=r=>r<=.04045?r/12.92:((r+.055)/1.055)**2.4,io=r=>r<=.0031308?12.92*r:1.055*r**(1/2.4)-.055;function co(r){let[o,a,t]=r.map(i=>F(i/255)),e=Math.cbrt(.4122214708*o+.5363325363*a+.0514459929*t),s=Math.cbrt(.2119034982*o+.6806995451*a+.1073969566*t),n=Math.cbrt(.0883024619*o+.2817188376*a+.6299787005*t);return[.2104542553*e+.793617785*s-.0040720468*n,1.9779984951*e-2.428592205*s+.4505937099*n,.0259040371*e+.7827717662*s-.808675766*n]}function po(r,o,a){let t=(r+.3963377774*o+.2158037573*a)**3,e=(r-.1055613458*o-.0638541728*a)**3,s=(r-.0894841775*o-1.291485548*a)**3;return[4.0767416621*t-3.3077115913*e+.2309699292*s,-1.2684380046*t+2.6097574011*e-.3413193965*s,-.0041960863*t-.7034186147*e+1.707614701*s]}function E(r){let o=v(r)??v(_),[a,t,e]=co(o),s=Math.hypot(t,e);return{l:a,c:s,h:s<1e-4?0:(Math.atan2(e,t)*180/Math.PI+360)%360}}var V=r=>r.every(o=>o>=-5e-4&&o<=1.0005);function m({l:r,c:o,h:a}){let t=P(r),e=a*Math.PI/180,s=i=>po(t,i*Math.cos(e),i*Math.sin(e)),n=s(o);if(!V(n)){let i=0,c=o;for(let l=0;l<24;l++){let u=(i+c)/2;V(s(u))?i=u:c=u}n=s(i)}return S(n.map(i=>io(P(i))*255))}function z(r){let o=v(r)??[0,0,0],[a,t,e]=o.map(s=>F(s/255));return .2126*a+.7152*t+.0722*e}function x(r,o){let[a,t]=[z(r),z(o)];return(Math.max(a,t)+.05)/(Math.min(a,t)+.05)}function G(r,o){let a=v(r)?r:_,{l:t,c:e,h:s}=E(a),n=e<.03;o==="escuro"&&(t=Math.min(t,.42),e*=.85);let i=m({l:t,c:e,h:s}),c=x("#ffffff",i)>=x(N,i)?"#ffffff":N;for(let k=0;k<100&&x(c,i)<U;k++)t+=c==="#ffffff"?-.01:.01,i=m({l:t,c:e,h:s});let u=m({l:t+(o==="escuro"?.05:-.05),c:e,h:s}),d=m({l:t-.08,c:e,h:s}),p=m({l:Math.min(t,.26),c:e*.55,h:s}),I=no[o],g=E(n?o==="escuro"?so:_:a),q=o==="escuro"?Math.max(g.l,.7):Math.min(g.l,.55),O=m({l:q,c:g.c,h:g.h});for(let k=0;k<100&&x(O,I)<U;k++)q+=o==="escuro"?.01:-.01,O=m({l:q,c:g.c,h:g.h});return{barra:i,texto:c,hover:u,borda:d,menu:p,destaque:O}}var T="spro_tema",M="spro_tema_cache",A={versao:1,ativo:!1,modo:"auto",paleta:"sei-pro",corBarra:_,escurecerDocumentos:!0};function y(r){if(typeof r=="string")try{return y(JSON.parse(r))}catch{return{...A}}if(!r||typeof r!="object"||r.versao!==1)return{...A};let o=r,a=o.modo==="claro"||o.modo==="escuro"||o.modo==="auto"?o.modo:A.modo,t=H.find(c=>c.id===o.paleta),e=typeof o.corBarra=="string"?o.corBarra.trim().toLowerCase():"",s=v(e)&&/^#[0-9a-f]{6}$/.test(e)?e:null,n=t?t.id:"livre",i=t?t.cor:s??A.corBarra;return{versao:1,ativo:o.ativo===!0,modo:a,paleta:t||s?n:A.paleta,corBarra:i,escurecerDocumentos:o.escurecerDocumentos!==!1}}function C(r,o){return r.modo==="claro"?"claro":r.modo==="escuro"||o?"escuro":"claro"}var j=`/*
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

/* O bot\xE3o da unidade e os da barra conjugada t\xEAm cor fixa com !important no SEI */
:root[data-spro-tema-ativo] a.infraAcaoBarraConjugada {
  color: var(--spro-texto) !important;
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

/* Painel de visualiza\xE7\xE3o (SEI 4.1 aninha a tela da \xE1rvore dentro dele; o 5 usa os mesmos cont\xEAineres) */
:root[data-spro-tema-ativo] #divArvoreConteudo,
:root[data-spro-tema-ativo] #divArvoreConteudoIfr,
:root[data-spro-tema-ativo] #divArvoreAcoes,
:root[data-spro-tema-ativo] div.barraBotoesSEI,
:root[data-spro-tema-ativo] iframe.ifrVisualizacao {
  background-color: var(--spro-fundo);
  color: var(--spro-texto);
}

/* T\xEDtulos de bloco dos formul\xE1rios (o esquema do SEI pinta com a cor dele) */
:root[data-spro-tema-ativo] label.infraLabelTitulo,
:root[data-spro-tema-ativo] legend.infraLegend {
  background: var(--spro-barra);
  color: var(--spro-barra-texto);
  border-radius: var(--spro-raio-p);
}

/* \xC1rea ao redor do documento, \xE1rvore do processo e capa (SEI Pro e SEI 4.1/5) */
:root[data-spro-tema-ativo] #divInfraAreaTelaD,
:root[data-spro-tema-ativo] .divInfraAreaTelaD {
  background-color: var(--spro-pagina);
}
:root[data-spro-tema-ativo] span.noVisitado,
:root[data-spro-tema-ativo] span.noVisitado a {
  background-color: var(--spro-destaque-suave);
  color: var(--spro-texto);
  border-radius: var(--spro-raio-p);
}
:root[data-spro-tema-ativo] a.newLink,
:root[data-spro-tema-ativo] .newLink {
  color: var(--spro-texto);
}
:root[data-spro-tema-ativo] a.newLink:hover {
  color: var(--spro-destaque);
}
:root[data-spro-tema-ativo] .txt_cinza,
:root[data-spro-tema-ativo] .label.txt_cinza {
  color: var(--spro-suave);
}
:root[data-spro-tema-ativo] a#lnkInfraUnidade {
  background-color: var(--spro-fundo);
  color: var(--spro-texto);
  border: 1px solid var(--spro-borda-forte);
}

/* Capa do processo (o SEI Pro injeta cores fixas com #capaProcessoPro) */
:root[data-spro-tema-ativo] div#capaProcessoPro .data a.newLink,
:root[data-spro-tema-ativo] div#capaProcessoPro a.newLink {
  color: var(--spro-texto);
}
:root[data-spro-tema-ativo] div#capaProcessoPro .label,
:root[data-spro-tema-ativo] div#capaProcessoPro .label i {
  color: var(--spro-suave);
}

/* Destaques e superf\xEDcies que o SEI e o SEI Pro pintam de claro */
:root[data-spro-tema-ativo] a.infraArvoreNo.highlight,
:root[data-spro-tema-ativo] .highlight,
:root[data-spro-tema-ativo] .highlight span {
  background-color: var(--spro-destaque-medio);
  color: var(--spro-texto);
}
:root[data-spro-tema-ativo] a.openNewTab {
  background-color: var(--spro-fundo-2) !important;
  color: var(--spro-texto) !important;
}
:root[data-spro-tema-ativo] table.infraTable {
  background-color: var(--spro-fundo);
}
:root[data-spro-tema-ativo] span.spanRealce {
  background-color: var(--spro-destaque-medio);
  color: var(--spro-texto);
}

/* Tooltips do SEI (o que aparece ao passar o mouse) e caixas de alerta */
:root[data-spro-tema-ativo] div.infraTooltip,
:root[data-spro-tema-ativo] div#divInfraTooltip {
  background-color: var(--spro-fundo-3);
  color: var(--spro-texto);
  border: 1px solid var(--spro-borda-forte);
  border-radius: var(--spro-raio);
  box-shadow: var(--spro-sombra-2);
}
:root[data-spro-tema-ativo] .infoAlerta {
  background-color: color-mix(in srgb, var(--spro-perigo) 18%, var(--spro-fundo));
  color: var(--spro-texto);
  border-color: color-mix(in srgb, var(--spro-perigo) 45%, transparent);
}
/* O fundo deste alerta \xE9 inline (gravado pelo SEI Pro): s\xF3 !important vence */
:root[data-spro-tema-ativo] #checkNaoAssinados {
  background-color: color-mix(in srgb, var(--spro-perigo) 18%, var(--spro-fundo)) !important;
  color: var(--spro-texto);
  border-color: color-mix(in srgb, var(--spro-perigo) 45%, transparent);
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

/* Editor CKEditor 4 (SEI 4.x e as \xE1reas edit\xE1veis, que s\xE3o iframes about:srcdoc) */
:root[data-spro-tema-ativo] .cke_chrome {
  border-color: var(--spro-borda);
  background: var(--spro-fundo);
  box-shadow: none;
}
:root[data-spro-tema-ativo] .cke_top,
:root[data-spro-tema-ativo] .cke_bottom,
:root[data-spro-tema-ativo] .cke_dialog_footer {
  background: var(--spro-fundo-2);
  border-color: var(--spro-borda);
  box-shadow: none;
}
:root[data-spro-tema-ativo] .cke_toolgroup,
:root[data-spro-tema-ativo] .cke_combo_button {
  background: var(--spro-fundo-3);
  border-color: var(--spro-borda-forte);
  box-shadow: none;
  border-radius: var(--spro-raio-p);
}
:root[data-spro-tema-ativo] a.cke_button,
:root[data-spro-tema-ativo] .cke_button_label,
:root[data-spro-tema-ativo] .cke_combo_text,
:root[data-spro-tema-ativo] .cke_combo_label,
:root[data-spro-tema-ativo] .cke_path_item,
:root[data-spro-tema-ativo] .cke_voice_label {
  color: var(--spro-texto);
}
:root[data-spro-tema-ativo] a.cke_button_on,
:root[data-spro-tema-ativo] a.cke_button_off:hover,
:root[data-spro-tema-ativo] a.cke_button_off:focus {
  background: var(--spro-destaque-medio);
  border-color: var(--spro-destaque);
}
/* Os \xEDcones do CK4 s\xE3o imagens escuras: no escuro viram claros (s\xF3 decora\xE7\xE3o, n\xE3o conte\xFAdo). */
:root[data-spro-tema="escuro"] .cke_button_icon,
:root[data-spro-tema="escuro"] .cke_combo_arrow,
:root[data-spro-tema="escuro"] .cke_toolbox_collapser {
  filter: invert(0.88) hue-rotate(180deg);
}
:root[data-spro-tema-ativo] .cke_contents {
  background: var(--spro-pagina);
}
:root[data-spro-tema-ativo] .cke_dialog,
:root[data-spro-tema-ativo] .cke_dialog_body,
:root[data-spro-tema-ativo] .cke_dialog_contents,
:root[data-spro-tema-ativo] .cke_dialog_contents_body,
:root[data-spro-tema-ativo] .cke_dialog_title,
:root[data-spro-tema-ativo] .cke_dialog_tabs {
  background: var(--spro-fundo);
  color: var(--spro-texto);
  border-color: var(--spro-borda);
}
:root[data-spro-tema-ativo] a.cke_dialog_tab {
  background: var(--spro-fundo-2);
  color: var(--spro-texto);
  border-color: var(--spro-borda);
}
:root[data-spro-tema-ativo] a.cke_dialog_tab_selected {
  background: var(--spro-fundo);
  color: var(--spro-destaque);
}
:root[data-spro-tema-ativo] .cke_dialog_ui_input_text input,
:root[data-spro-tema-ativo] .cke_dialog_ui_input_password input,
:root[data-spro-tema-ativo] .cke_dialog_ui_input_textarea textarea,
:root[data-spro-tema-ativo] .cke_dialog_ui_input_select select {
  background: var(--spro-fundo-2);
  color: var(--spro-texto);
  border-color: var(--spro-borda-forte);
}
:root[data-spro-tema-ativo] a.cke_dialog_ui_button {
  background: var(--spro-fundo-3);
  color: var(--spro-texto);
  border-color: var(--spro-borda-forte);
}
:root[data-spro-tema-ativo] a.cke_dialog_ui_button_ok {
  background: var(--spro-destaque);
  color: var(--spro-destaque-texto);
}

/* Se\xE7\xF5es do documento no editor: o body das somente-leitura traz fundo cinza inline (s\xF3 !important vence, sem tocar no DOM) */
:root[data-spro-tema-ativo] body.cke_editable {
  background-color: var(--spro-pagina) !important;
  color: var(--spro-texto);
}
:root[data-spro-tema-ativo] a.cke_button_off:hover,
:root[data-spro-tema-ativo] a.cke_button_on {
  background-image: none;
}
`;var lo={claro:{"--spro-fundo":"#ffffff","--spro-fundo-2":"#f6f7f9","--spro-fundo-3":"#eceef2","--spro-pagina":"#f3f4f7","--spro-texto":"#1b1f24","--spro-suave":"#5d6772","--spro-fraco":"#8b939c","--spro-borda":"#e3e6eb","--spro-borda-forte":"#cfd4db","--spro-perigo":"#d1352b","--spro-aviso":"#b45c0a","--spro-ok":"#12805c","--spro-sombra-1":"0 1px 2px rgb(16 24 40 / 6%)","--spro-sombra-2":"0 2px 4px -2px rgb(16 24 40 / 8%), 0 6px 14px -4px rgb(16 24 40 / 12%)","--spro-sombra-3":"0 10px 24px -6px rgb(16 24 40 / 18%), 0 24px 56px -12px rgb(16 24 40 / 24%)","--spro-veu":"rgb(17 21 28 / 46%)"},escuro:{"--spro-fundo":"#1a1d21","--spro-fundo-2":"#22262b","--spro-fundo-3":"#2b3036","--spro-pagina":"#141619","--spro-texto":"#e7e9ec","--spro-suave":"#a4abb3","--spro-fraco":"#767e87","--spro-borda":"#2f343a","--spro-borda-forte":"#3d434a","--spro-perigo":"#ff7d73","--spro-aviso":"#e8b04a","--spro-ok":"#4fcf96","--spro-sombra-1":"0 1px 2px rgb(0 0 0 / 30%)","--spro-sombra-2":"0 2px 4px -2px rgb(0 0 0 / 40%), 0 6px 14px -4px rgb(0 0 0 / 45%)","--spro-sombra-3":"0 10px 24px -6px rgb(0 0 0 / 50%), 0 24px 56px -12px rgb(0 0 0 / 60%)","--spro-veu":"rgb(0 0 0 / 58%)"}},mo={claro:"#ffffff",escuro:"#0a1526"};function vo(r,o){let a=G(r.corBarra,o);return{...lo[o],"--spro-barra":a.barra,"--spro-barra-texto":a.texto,"--spro-barra-hover":a.hover,"--spro-barra-borda":a.borda,"--spro-menu":a.menu,"--spro-menu-texto":"#f2f4f7","--spro-destaque":a.destaque,"--spro-destaque-texto":mo[o],"--spro-destaque-suave":"color-mix(in srgb, var(--spro-destaque) 12%, transparent)","--spro-destaque-medio":"color-mix(in srgb, var(--spro-destaque) 22%, transparent)","--spro-anel":"0 0 0 3px color-mix(in srgb, var(--spro-destaque) 30%, transparent)","--spro-raio-p":"6px","--spro-raio":"8px","--spro-raio-g":"12px","--spro-raio-xg":"16px","--spro-fonte":'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',"--spro-dur":"150ms"}}function Q(r,o,a=""){return`:root[data-spro-tema-ativo] {
${Object.entries(vo(r,o)).map(([e,s])=>`  ${e}: ${s};`).join(`
`)}
  color-scheme: ${o==="escuro"?"dark":"light"};
}
${a}`}var X="data-spro-tema",J="data-spro-tema-ativo",B="data-spro-tema-estilo";function K(r,o,a,t){if(!o.ativo){fo(r);return}let e=C(o,a),s=r.documentElement;if(!s)return;let n=r.querySelector(`style[${B}]`);n||(n=r.createElement("style"),n.setAttribute(B,""),(r.head??s).appendChild(n));let i=Q(o,e,t);n.textContent!==i&&(n.textContent=i),s.setAttribute(J,""),s.setAttribute(X,e),s.style.colorScheme=e==="escuro"?"dark":"light"}function fo(r){for(let a of r.querySelectorAll(`style[${B}]`))a.remove();let o=r.documentElement;o&&(o.removeAttribute(J),o.removeAttribute(X),o.style.removeProperty("color-scheme"),o.getAttribute("style")||o.removeAttribute("style"))}function W(r){try{let o=r.getItem(M);return o?y(o):null}catch{return null}}function Z(r,o){try{r.setItem(M,JSON.stringify(o))}catch{}}var w="#1a1d21",bo="#e7e9ec",go=E(w).l,Y={black:"#000000",white:"#ffffff",red:"#ff0000",blue:"#0000ff",green:"#008000",lime:"#00ff00",yellow:"#ffff00",orange:"#ffa500",purple:"#800080",gray:"#808080",grey:"#808080",silver:"#c0c0c0",navy:"#000080",maroon:"#800000",teal:"#008080",aqua:"#00ffff",cyan:"#00ffff",fuchsia:"#ff00ff",magenta:"#ff00ff",olive:"#808000",brown:"#a52a2a",pink:"#ffc0cb"};function xo(r){let o=r.trim().toLowerCase();if(!o||o==="transparent"||o==="inherit"||o==="initial"||o==="unset"||o==="currentcolor")return null;if(Y[o])return Y[o];if(o.startsWith("#"))return v(o)?S(v(o)):null;let a=/^rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)(?:[,\s/]+([\d.]+%?))?\s*\)$/.exec(o);if(!a||!((a[4]===void 0?1:a[4].endsWith("%")?Number.parseFloat(a[4])/100:Number.parseFloat(a[4]))>0))return null;let e=[a[1],a[2],a[3]].map(s=>Number(s));return e.some(s=>!Number.isFinite(s)||s<0||s>255)?null:S(e)}function R(r,o){let a=xo(r);if(!a)return null;let{l:t,c:e,h:s}=E(a),n=e<.02;if(o==="texto"){if(n&&(t<.3||t>.9))return bo;let c=t>=.75?Math.max(.85,t):.62+(1-t)*.33,l=m({l:c,c:e,h:s});for(let u=0;u<40&&x(l,w)<4.5;u++)c+=.01,l=m({l:c,c:e,h:s});return l}if(n&&t>.97)return w;let i=Math.min(.36,go+(1-t)*.16+Math.min(e,.2)*.8);return m({l:i,c:e,h:s})}var h="data-spro-adaptado",b="data-spro-original",D="--spro-doc-texto",$="--spro-doc-fundo",L="data-spro-tema-doc",f="data-spro-ver-original",ho=400,oo="[style],[bgcolor],[color],font,td,th,table",ko=new Set(["IMG","CANVAS","SVG","IFRAME","EMBED","OBJECT","VIDEO","SCRIPT","STYLE","LINK"]),_o=`
:root[data-spro-tema="escuro"]:not([${b}]) [${h}~="t"] { color: var(${D}) !important; }
:root[data-spro-tema="escuro"]:not([${b}]) [${h}~="f"] { background-color: var(${$}) !important; }
:root[${b}] body { background: #fff; color: #000; }
[${f}] { position: fixed; bottom: 12px; left: 12px; z-index: 2147483000; padding: 4px 10px;
  font: 12px/1.4 var(--spro-fonte, system-ui, sans-serif); color: var(--spro-texto); background: var(--spro-fundo);
  border: 1px solid var(--spro-borda-forte); border-radius: var(--spro-raio, 8px); cursor: pointer; box-shadow: var(--spro-sombra-2); }
[${f}]:hover { background: var(--spro-destaque); color: var(--spro-destaque-texto); }
[${f}][aria-pressed="true"] { outline: 2px solid var(--spro-destaque); }
`;function Eo(r,o,a){let t=r.style;return t?.getPropertyValue?.(o)||(o==="background-color"?t?.getPropertyValue?.("background"):"")||""||r.getAttribute(a)||""}function ro(r,o){let e=Eo(r,o==="texto"?"color":"background-color",o==="texto"?"color":"bgcolor");if(e)return e;if(o==="fundo"&&/^(TD|TH|TABLE)$/.test(r.tagName))try{return r.ownerDocument.defaultView?.getComputedStyle(r).backgroundColor??""}catch{return""}return""}function Ao(r,o){if(ko.has(r.tagName.toUpperCase())||r.closest?.(`[${f}]`))return;let a="",t=()=>{o.has(r)||o.set(r,r.getAttribute("style"))},e=R(ro(r,"texto"),"texto");e&&(t(),r.style.setProperty(D,e),a+="t");let s=R(ro(r,"fundo"),"fundo");s&&(t(),r.style.setProperty($,s),a+="f"),a&&r.setAttribute(h,a)}function To(r){for(let o of[r,...r.querySelectorAll(`[${h}]`)]){if(!o.hasAttribute(h))continue;o.removeAttribute(h);let a=o.style;a.removeProperty(D),a.removeProperty($),o.getAttribute("style")||o.removeAttribute("style")}}function ao(r){let o=globalThis;typeof o.requestIdleCallback=="function"?o.requestIdleCallback(r):setTimeout(r,0)}function to(r,o={}){let a=(o.raizes??["body"]).flatMap(d=>[...r.querySelectorAll(d)]);if(a.length===0)return()=>{};if(!r.querySelector(`style[${L}]`)){let d=r.createElement("style");d.setAttribute(L,""),d.textContent=_o,(r.head??r.documentElement).appendChild(d)}let t=new WeakSet,e=new Map,s=[],n=!1,i=!0,c=()=>{if(n=!1,!!i){for(let d of s.splice(0,ho))t.has(d)||(t.add(d),Ao(d,e));s.length>0&&(n=!0,ao(c))}},l=d=>{if(d.nodeType===1){d.matches?.(oo)&&s.push(d);for(let p of d.querySelectorAll?.(oo)??[])s.push(p);!n&&s.length>0&&(n=!0,ao(c))}};for(let d of a)l(d);let u=null;if(typeof MutationObserver=="function"){u=new MutationObserver(d=>{for(let p of d)if(p.type==="childList")for(let I of p.addedNodes)l(I);else p.type==="attributes"&&p.target.nodeType===1&&(t.delete(p.target),l(p.target))});for(let d of a)u.observe(d,{childList:!0,subtree:!0})}return o.botao&&So(r),()=>{i=!1,u?.disconnect(),s=[],To(r.documentElement);for(let[d,p]of e)p===null?d.removeAttribute("style"):d.setAttribute("style",p);e.clear();for(let d of r.querySelectorAll(`style[${L}], [${f}]`))d.remove();r.documentElement.removeAttribute(b)}}function yo(r){let o=r.documentElement,a=!o.hasAttribute(b);return a?o.setAttribute(b,""):o.removeAttribute(b),r.querySelector(`[${f}]`)?.setAttribute("aria-pressed",String(a)),a}function So(r){if(r.querySelector(`[${f}]`)||!r.body)return;let o=r.createElement("button");o.type="button",o.setAttribute(f,""),o.setAttribute("aria-pressed","false"),o.title="Mostra o documento com as cores originais, como ser\xE1 assinado",o.textContent="Ver original",o.addEventListener("click",()=>yo(r)),r.body.appendChild(o)}var eo=window;if(!eo.__seiProEstilo2){eo.__seiProEstilo2=!0;let r=typeof matchMedia=="function"?matchMedia("(prefers-color-scheme: dark)"):null,o=null,a=/[?&]acao=(documento_visualizar|documento_imprimir_web)\b/.test(location.search),t=null,e=()=>{if(!o)return;let n=r?.matches??!1;K(document,o,n,j);let i=a&&o.ativo&&o.escurecerDocumentos&&C(o,n)==="escuro";if(i&&!t){let c=()=>{t!==null&&(t=to(document,{botao:!0}))};t=()=>{},document.readyState==="loading"?document.addEventListener("DOMContentLoaded",c,{once:!0}):c()}else!i&&t&&(t(),t=null)};o=W(localStorage),e(),r?.addEventListener("change",e);let s=n=>{o=y(n),Z(localStorage,o),e()};chrome.storage.sync.get(T).then(n=>s(n[T])).catch(n=>console.warn("[SEI Pro] estilo avancado 2:",n)),chrome.storage.onChanged.addListener((n,i)=>{i==="sync"&&n[T]&&s(n[T].newValue)})}})();
