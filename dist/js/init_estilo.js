/* GERADO por estilo-avancado/build.mjs. NAO EDITE ESTE ARQUIVO. Rode: npm run build */
"use strict";(()=>{var z="#1f5fbf",Ho="#79acff",ao="#14181d",Vo={claro:"#ffffff",escuro:"#1a1d21"},ro=4.5,D=[{id:"sei-pro",nome:"SEI Pro",cor:"#1f5fbf"},{id:"oceano",nome:"Oceano",cor:"#0b6e99"},{id:"floresta",nome:"Floresta",cor:"#1f7a4d"},{id:"esmeralda",nome:"Esmeralda",cor:"#0e7c66"},{id:"grafite",nome:"Grafite",cor:"#3a4350"},{id:"vinho",nome:"Vinho",cor:"#8a2a43"},{id:"roxo",nome:"Roxo",cor:"#5b43b8"},{id:"ambar",nome:"\xC2mbar",cor:"#a85d00"},{id:"ardosia",nome:"Ard\xF3sia",cor:"#475c7a"},{id:"preto",nome:"Preto",cor:"#14181d"}],U=(a,o=0,r=1)=>Math.min(r,Math.max(o,a));function A(a){let o=String(a).trim().toLowerCase(),r=/^#([0-9a-f])([0-9a-f])([0-9a-f])$/.exec(o);if(r)return[r[1],r[2],r[3]].map(e=>Number.parseInt(e+e,16));let t=/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/.exec(o);return t?[t[1],t[2],t[3]].map(e=>Number.parseInt(e,16)):null}var $=a=>`#${a.map(o=>Math.round(U(o,0,255)).toString(16).padStart(2,"0")).join("")}`,so=a=>a<=.04045?a/12.92:((a+.055)/1.055)**2.4,jo=a=>a<=.0031308?12.92*a:1.055*a**(1/2.4)-.055;function Fo(a){let[o,r,t]=a.map(p=>so(p/255)),e=Math.cbrt(.4122214708*o+.5363325363*r+.0514459929*t),s=Math.cbrt(.2119034982*o+.6806995451*r+.1073969566*t),n=Math.cbrt(.0883024619*o+.2817188376*r+.6299787005*t);return[.2104542553*e+.793617785*s-.0040720468*n,1.9779984951*e-2.428592205*s+.4505937099*n,.0259040371*e+.7827717662*s-.808675766*n]}function Uo(a,o,r){let t=(a+.3963377774*o+.2158037573*r)**3,e=(a-.1055613458*o-.0638541728*r)**3,s=(a-.0894841775*o-1.291485548*r)**3;return[4.0767416621*t-3.3077115913*e+.2309699292*s,-1.2684380046*t+2.6097574011*e-.3413193965*s,-.0041960863*t-.7034186147*e+1.707614701*s]}function B(a){let o=A(a)??A(z),[r,t,e]=Fo(o),s=Math.hypot(t,e);return{l:r,c:s,h:s<1e-4?0:(Math.atan2(e,t)*180/Math.PI+360)%360}}var to=a=>a.every(o=>o>=-5e-4&&o<=1.0005);function k({l:a,c:o,h:r}){let t=U(a),e=r*Math.PI/180,s=p=>Uo(t,p*Math.cos(e),p*Math.sin(e)),n=s(o);if(!to(n)){let p=0,u=o;for(let v=0;v<24;v++){let c=(p+u)/2;to(s(c))?p=c:u=c}n=s(p)}return $(n.map(p=>jo(U(p))*255))}function eo(a){let o=A(a)??[0,0,0],[r,t,e]=o.map(s=>so(s/255));return .2126*r+.7152*t+.0722*e}function q(a,o){let[r,t]=[eo(a),eo(o)];return(Math.max(r,t)+.05)/(Math.min(r,t)+.05)}function N(a,o){let r=A(a)?a:z,{l:t,c:e,h:s}=B(r),n=e<.03;o==="escuro"&&(t=Math.min(t,.42),e*=.85);let p=k({l:t,c:e,h:s}),u=q("#ffffff",p)>=q(ao,p)?"#ffffff":ao;for(let g=0;g<100&&q(u,p)<ro;g++)t+=u==="#ffffff"?-.01:.01,p=k({l:t,c:e,h:s});let c=k({l:t+(o==="escuro"?.05:-.05),c:e,h:s}),i=k({l:t-.08,c:e,h:s}),l=k({l:Math.min(t,.26),c:e*.55,h:s}),f=Vo[o],m=B(n?o==="escuro"?Ho:z:r),h=o==="escuro"?Math.max(m.l,.7):Math.min(m.l,.55),E=k({l:h,c:m.c,h:m.h});for(let g=0;g<100&&q(E,f)<ro;g++)h+=o==="escuro"?.01:-.01,E=k({l:h,c:m.c,h:m.h});return{barra:p,texto:u,hover:c,borda:i,menu:l,destaque:E}}var M="spro_tema",H="spro_tema_cache",T={versao:1,ativo:!1,modo:"auto",paleta:"sei-pro",corBarra:z,escurecerDocumentos:!0};function S(a){if(typeof a=="string")try{return S(JSON.parse(a))}catch{return{...T}}if(!a||typeof a!="object"||a.versao!==1)return{...T};let o=a,r=o.modo==="claro"||o.modo==="escuro"||o.modo==="auto"?o.modo:T.modo,t=D.find(u=>u.id===o.paleta),e=typeof o.corBarra=="string"?o.corBarra.trim().toLowerCase():"",s=A(e)&&/^#[0-9a-f]{6}$/.test(e)?e:null,n=t?t.id:"livre",p=t?t.cor:s??T.corBarra;return{versao:1,ativo:o.ativo===!0,modo:r,paleta:t||s?n:T.paleta,corBarra:p,escurecerDocumentos:o.escurecerDocumentos!==!1}}function O(a,o){return a.modo==="claro"?"claro":a.modo==="escuro"||o?"escuro":"claro"}var io=`/*
 * Folha base do Estilo Avan\xE7ado (sub-projeto 1): barra, p\xE1gina, links, tabelas, campos,
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
/* No escuro, a "cor escura" do esquema serve de texto de destaque (r\xF3tulos de cart\xF5es do Painel de Controle): precisa ser clara */
:root[data-spro-tema="escuro"] {
  --infra-esquema-cor-escura: var(--spro-destaque);
}
:root[data-spro-tema-ativo] .infraCorBarraSuperior {
  background-color: var(--spro-barra-borda) !important;
}
:root[data-spro-tema-ativo] .infraCorBarraSistema:not(img):not(#divInfraBarraSistemaPadraoE) {
  background-color: var(--spro-barra) !important;
  color: var(--spro-barra-texto);
}
/* O SEI Pro p\xF5e infraCorBarraSistema nas imagens dos bot\xF5es que injeta (Monitorados, PDF, Agente de IA, Fluxos):
   o esquema do SEI as pintaria com a cor da barra. \xCDcone \xE9 \xEDcone: sem fundo, como os bot\xF5es nativos. */
:root[data-spro-tema-ativo] img.infraCorBarraSistema,
:root[data-spro-tema-ativo] .botaoSEI img {
  background-color: transparent !important;
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
:root[data-spro-tema-ativo] .infraCorBarraSistema {
  background-color: var(--spro-barra);
  color: var(--spro-barra-texto);
}
/* O bloco da logo n\xE3o tem cor pr\xF3pria: deixa o degrad\xEA da barra (no pai) aparecer */
:root[data-spro-tema-ativo] #divInfraBarraSistemaPadraoE {
  background-color: transparent;
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

/* Linhas de status das listas (o SEI Pro injeta o fundo rosado das atrasadas com !important) */
:root[data-spro-tema-ativo] tr.infraTrAtrasada,
:root[data-spro-tema-ativo] td.infraTdAtrasada,
:root[data-spro-tema-ativo] tr.infraTrVermelha {
  background-color: color-mix(in srgb, var(--spro-perigo) 16%, var(--spro-fundo)) !important;
}
:root[data-spro-tema-ativo] tr.infraTrAlerta {
  background-color: color-mix(in srgb, var(--spro-aviso) 16%, var(--spro-fundo)) !important;
}
/* Caixa do menu do SEI 5 (aplicativo do SEI) com fundo claro inline */
:root[data-spro-tema-ativo] #divInfraAreaTelaE div[style*="f5f6f7"] {
  background-color: var(--spro-fundo-2) !important;
  color: var(--spro-menu-texto) !important;
}
/* Bot\xF5es claros do Bootstrap do SEI 5 e o quadro do modal */
:root[data-spro-tema-ativo] .btn-light,
:root[data-spro-tema-ativo] .btn-default {
  background-color: var(--spro-fundo-3);
  color: var(--spro-texto);
  border-color: var(--spro-borda-forte);
}
:root[data-spro-tema-ativo] .btn-light.active,
:root[data-spro-tema-ativo] .btn-light:hover,
:root[data-spro-tema-ativo] .btn-default:hover {
  background-color: var(--spro-destaque-medio);
}
:root[data-spro-tema-ativo] .sparkling-modal-frame {
  background-color: var(--spro-fundo);
}

/* Selos de prazo do SEI Pro e bot\xF5es do Bootstrap: as variantes escuras deles s\xE3o do modo noturno antigo (.seiSlim.dark-mode) */
:root[data-spro-tema="escuro"] .dateboxDisplay.spro-prazo-atrasado,
:root[data-spro-tema="escuro"] .dateboxDisplay.spro-prazo-atrasado .spro-prazo-icone {
  color: var(--spro-perigo);
}
:root[data-spro-tema="escuro"] .dateboxDisplay.spro-prazo-concluido {
  color: var(--spro-suave);
}
:root[data-spro-tema="escuro"] .dateboxDisplay.spro-prazo-concluido .spro-prazo-icone {
  color: var(--spro-ok);
}
:root[data-spro-tema="escuro"] .dateboxDisplay.spro-prazo-hoje .spro-prazo-icone {
  color: var(--spro-aviso);
}
:root[data-spro-tema="escuro"] .dateboxDisplay.spro-prazo-desde .spro-prazo-icone {
  color: var(--spro-suave);
}
:root[data-spro-tema-ativo] .btn-light *,
:root[data-spro-tema-ativo] .btn-default * {
  color: inherit;
}

/* O SEI Pro reinjeta cor fixa em .btn-light:not(:disabled):not(.disabled):active; precisa da mesma especificidade */
:root[data-spro-tema-ativo] .btn-light:not(:disabled):not(.disabled),
:root[data-spro-tema-ativo] .btn-default:not(:disabled):not(.disabled) {
  color: var(--spro-texto);
}
:root[data-spro-tema-ativo] .btn-light:not(:disabled):not(.disabled):active,
:root[data-spro-tema-ativo] .btn-default:not(:disabled):not(.disabled):active {
  background-color: var(--spro-destaque-medio);
}

/* Listagens do SEI: a tabela orden\xE1vel (tablesorter) traz fundo #ccc inline, e a legenda fica sobre ele */
:root[data-spro-tema-ativo] table.tablesorter,
:root[data-spro-tema-ativo] table.infraTable {
  background-color: var(--spro-fundo) !important;
}
:root[data-spro-tema-ativo] caption.infraCaption {
  color: var(--spro-suave);
  background-color: transparent;
}
/* Linhas de destaque das listas (Blocos de Assinatura etc.): tom do tema, texto normal */
:root[data-spro-tema-ativo] tr.trVermelha,
:root[data-spro-tema-ativo] tr.trVermelha > td {
  background-color: color-mix(in srgb, var(--spro-perigo) 16%, var(--spro-fundo));
}
/* Os !important do SEI para a linha marcada (ciano) e o destaque de "sigiloso" (vermelho puro) */
:root[data-spro-tema-ativo] tr.infraTrMarcada,
:root[data-spro-tema-ativo] tr.infraTrMarcada td,
:root[data-spro-tema-ativo] td.infraTdMarcada {
  background-color: var(--spro-destaque-medio) !important;
}
/* Iniciar Processo: a lista de tipos (SEI 5 for\xE7a branco com !important) e os tipos sigilosos (vermelho do SEI) */
:root[data-spro-tema-ativo] table.tabelaOpcoes,
:root[data-spro-tema-ativo] table.tabelaOpcoes tr {
  background-color: var(--spro-fundo) !important;
}
:root[data-spro-tema-ativo] td.tdOpcaoSigiloso,
:root[data-spro-tema-ativo] td.tdOpcaoSigiloso a {
  background-color: color-mix(in srgb, var(--spro-perigo) 24%, var(--spro-fundo)) !important;
  color: var(--spro-texto);
}
/* Calend\xE1rio do SEI (Retorno Programado, datas) */
:root[data-spro-tema-ativo] #divCalendario td.diaUtil {
  background-color: var(--spro-fundo-3);
  color: var(--spro-texto);
}
:root[data-spro-tema-ativo] #divCalendario td.diaFimDeSemana {
  background-color: var(--spro-fundo-2);
  color: var(--spro-texto);
}
/* Texto vermelho inline (#ed1c24) do Painel de Controle: no escuro usa o vermelho do tema */
:root[data-spro-tema="escuro"] [style*="color:#ed1c24"] {
  color: var(--spro-perigo) !important;
}

/* Bootstrap do SEI 5 (telas de administra\xE7\xE3o e dos m\xF3dulos): campos, fieldsets, alertas e r\xF3tulos */
:root[data-spro-tema-ativo] .form-control,
:root[data-spro-tema-ativo] fieldset.infraFieldset {
  background-color: var(--spro-fundo);
  color: var(--spro-texto);
  border-color: var(--spro-borda-forte);
}
:root[data-spro-tema-ativo] .input-group-text {
  background-color: var(--spro-fundo-3);
  color: var(--spro-texto);
  border-color: var(--spro-borda-forte);
}
:root[data-spro-tema-ativo] .alert {
  color: var(--spro-texto);
}
:root[data-spro-tema-ativo] .alert-danger {
  background-color: color-mix(in srgb, var(--spro-perigo) 16%, var(--spro-fundo));
  border-color: color-mix(in srgb, var(--spro-perigo) 40%, transparent);
}
:root[data-spro-tema-ativo] .alert-warning {
  background-color: color-mix(in srgb, var(--spro-aviso) 16%, var(--spro-fundo));
  border-color: color-mix(in srgb, var(--spro-aviso) 40%, transparent);
}
:root[data-spro-tema-ativo] .alert-success {
  background-color: color-mix(in srgb, var(--spro-ok) 16%, var(--spro-fundo));
  border-color: color-mix(in srgb, var(--spro-ok) 40%, transparent);
}
:root[data-spro-tema-ativo] .alert-info {
  background-color: var(--spro-destaque-suave);
  border-color: var(--spro-destaque-medio);
}
:root[data-spro-tema-ativo] label.input-label-first,
:root[data-spro-tema-ativo] label.input-label-second {
  color: var(--spro-suave) !important;
}
:root[data-spro-tema-ativo] .cke_inner,
:root[data-spro-tema-ativo] iframe.cke_wysiwyg_frame {
  background-color: var(--spro-fundo);
}
/* Linha de destaque laranja que um m\xF3dulo grava no atributo bgcolor (#F4A460) */
:root[data-spro-tema-ativo] tr[bgcolor="#f4a460" i],
:root[data-spro-tema-ativo] tr[bgcolor="#f4a460" i] > td {
  background-color: color-mix(in srgb, var(--spro-aviso) 18%, var(--spro-fundo));
}
/* Linha de destaque verde que um m\xF3dulo grava inline (#d8f5b9) */
:root[data-spro-tema-ativo] tr[style*="d8f5b9"] {
  background-color: color-mix(in srgb, var(--spro-ok) 16%, var(--spro-fundo)) !important;
}

/* Seletor m\xFAltiplo (multiple-select), campos somente leitura e cart\xF5es do Bootstrap (Painel de Controle) */
:root[data-spro-tema-ativo] button.ms-choice,
:root[data-spro-tema-ativo] .ms-drop {
  background-color: var(--spro-fundo);
  color: var(--spro-texto);
  border-color: var(--spro-borda-forte);
}
:root[data-spro-tema-ativo] input.infraReadOnly,
:root[data-spro-tema-ativo] input.infraText[readonly],
:root[data-spro-tema-ativo] input.infraText:disabled {
  background-color: var(--spro-fundo-2);
  color: var(--spro-suave);
}
:root[data-spro-tema-ativo] .card,
:root[data-spro-tema-ativo] .card-body,
:root[data-spro-tema-ativo] .card-header {
  background-color: var(--spro-fundo);
  color: var(--spro-texto);
  border-color: var(--spro-borda);
}

/* O SEI pinta o r\xF3tulo do menu de branco com !important (div.infraSidebarMenu span); o menu agora \xE9 uma superf\xEDcie neutra */
:root[data-spro-tema-ativo] #infraMenu li > a {
  color: var(--spro-texto) !important;
}
:root[data-spro-tema-ativo] #infraMenu li > a > span {
  color: inherit !important;
}
:root[data-spro-tema-ativo] #infraMenu li > a.infraMenuSelecionado,
:root[data-spro-tema-ativo] #infraMenu li > a[aria-current] {
  color: var(--spro-destaque) !important;
}

/* Controles do Estilo Avan\xE7ado v1 (interruptor do modo noturno e paleta) no mesmo eixo dos \xEDcones da barra.
   O SEI Pro os escreve com style inline (display, float, margin): s\xF3 !important vence. */
:root[data-spro-tema-ativo] div[data-ref="infraAcaoBarraSistema"] {
  display: flex !important;
  align-items: center;
  float: none !important;
  gap: 10px;
  height: 40px;
  margin: 5px 10px 0 4px !important;
}
:root[data-spro-tema-ativo] div[data-ref="infraAcaoBarraSistema"] > i {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 999px;
  cursor: pointer;
  transition: background-color var(--spro-dur) var(--spro-curva);
}
:root[data-spro-tema-ativo] div[data-ref="infraAcaoBarraSistema"] > i:hover {
  background-color: color-mix(in srgb, var(--spro-barra-texto) 18%, transparent);
}

/* Menu suspenso dos documentos e do processo na \xE1rvore (jquery.toolbar do SEI Pro): o plugin for\xE7a cores com !important */
:root[data-spro-tema-ativo] .tool-container {
  background-color: var(--spro-fundo);
  border: 1px solid var(--spro-borda);
  border-radius: 12px;
  box-shadow: var(--spro-sombra-3);
}
:root[data-spro-tema-ativo] .tool-container .tool-item {
  color: var(--spro-texto) !important;
  border-radius: 8px;
}
:root[data-spro-tema-ativo] .tool-container .tool-item > .fa {
  color: var(--spro-suave);
}
:root[data-spro-tema-ativo] .tool-container .tool-item .info {
  color: var(--spro-texto);
  font-size: 13px;
}
:root[data-spro-tema-ativo] .tool-container .tool-item:hover,
:root[data-spro-tema-ativo] .tool-container .tool-item.selected {
  background: var(--spro-destaque-suave);
  color: var(--spro-texto) !important;
  border-radius: 8px;
}
:root[data-spro-tema-ativo] .tool-container .tool-item:hover > .fa,
:root[data-spro-tema-ativo] .tool-container .tool-item.selected > .fa {
  color: var(--spro-destaque);
}
:root[data-spro-tema-ativo] .tool-container .tool-item:hover .info,
:root[data-spro-tema-ativo] .tool-container .tool-item.selected .info {
  color: var(--spro-texto);
}
:root[data-spro-tema-ativo] .tool-container.tool-bottom .arrow {
  border-color: transparent transparent var(--spro-borda);
}
:root[data-spro-tema-ativo] .tool-container.tool-top .arrow {
  border-color: var(--spro-borda) transparent transparent;
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
:root[data-spro-tema-ativo] table.infraTable td {
  border-color: var(--spro-borda);
}
:root[data-spro-tema-ativo] tr.infraTrMarcada,
:root[data-spro-tema-ativo] tr.infraTrAcessada {
  background-color: var(--spro-destaque-suave);
}
/* O hover do SEI marca a linha com infraTrSelecionada (via JS) e o esquema pinta #e5e5e5 com !important:
   no tema, a linha ganha o destaque suave e o texto continua leg\xEDvel */
:root[data-spro-tema-ativo] tr.infraTrSelecionada,
:root[data-spro-tema-ativo] tr.infraTrSelecionada td,
:root[data-spro-tema-ativo] td.infraTdSelecionada {
  background-color: var(--spro-destaque-suave) !important;
  color: var(--spro-texto);
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

/* A borda superior das se\xE7\xF5es da \xE1rvore \xE9 inline (SEI Pro): zerada aqui; o fio degrad\xEA est\xE1 em casca.css. */
:root[data-spro-tema-ativo] #divConsultarAndamento,
:root[data-spro-tema-ativo] .panelDadosArvore,
:root[data-spro-tema-ativo] .panelDadosArvorePro,
:root[data-spro-tema-ativo] .stickDadosArvore,
:root[data-spro-tema-ativo] #divRelacionados {
  border-top: 0 !important;
}

/* Barra de a\xE7\xF5es fixa: o legado grava o top inline (altura da barra no instante da rolagem); acompanha a altura atual. */
:root[data-spro-tema-ativo]:has(#navInfraBarraNavegacao) #divComandos.fixed,
:root[data-spro-tema-ativo]:has(#navInfraBarraNavegacao) #divBotoesControleProcessos.fixed {
  top: var(--spro-nav-total) !important;
  transition: top var(--spro-dur) var(--spro-curva);
}
`;var no=`/*
 * Casca do SEI (sub-projeto 2): a barra superior, o menu lateral, a barra de a\xE7\xF5es, os t\xEDtulos, os
 * tooltips e a \xE1rvore do processo, redesenhados no vocabul\xE1rio dos pain\xE9is (Favoritos, Projetos,
 * Demandas): superf\xEDcies em camadas, raios generosos, \xEDcones de tra\xE7o (m\xE1scaras geradas em
 * src/icones) e estados de hover, foco e sele\xE7\xE3o bem marcados. S\xF3 var(--spro-*): nenhuma cor
 * literal e nenhum !important aqui (o teste confere). As cores base v\xEAm da folha base.
 */

/* ============================== Barra superior ============================== */
/* Profundidade: um brilho sutil sobre a cor escolhida (a cor em si vem da folha base, com !important do SEI) */
:root[data-spro-tema-ativo] #divInfraBarraSistemaPadrao,
:root[data-spro-tema-ativo] #divInfraBarraSistema .infraCorBarraSistema {
  background-image: linear-gradient(180deg, color-mix(in srgb, var(--spro-barra-texto) 10%, transparent), transparent 70%);
  box-shadow: 0 1px 0 var(--spro-barra-borda), 0 6px 18px -8px color-mix(in srgb, var(--spro-barra) 70%, transparent);
}
:root[data-spro-tema-ativo] #divInfraBarraSistemaPadrao img.infraImg,
:root[data-spro-tema-ativo] #divInfraBarraSistemaPadrao a > img[src*="svg/"] {
  color: var(--spro-barra-texto);
}
/* Altura da barra: mais alta no topo da p\xE1gina, normal depois de rolar (navbar.ts liga data-spro-nav-compacta).
   A barra de a\xE7\xF5es fixa acompanha por --spro-nav-total, com a mesma transi\xE7\xE3o. */
:root[data-spro-tema-ativo] {
  --spro-nav-base: 65px;
  --spro-nav-extra: 14px;
  --spro-nav-total: calc(var(--spro-nav-base) + var(--spro-nav-extra));
}
:root[data-spro-tema-ativo][data-spro-nav-compacta] {
  --spro-nav-extra: 0px;
}
:root[data-spro-tema-ativo] #navInfraBarraNavegacao {
  height: var(--spro-nav-total);
  min-height: var(--spro-nav-total);
  transition:
    height var(--spro-dur) var(--spro-curva),
    min-height var(--spro-dur) var(--spro-curva);
}
:root[data-spro-tema-ativo] #divInfraBarraSistemaPadrao {
  height: calc(50px + var(--spro-nav-extra));
  min-height: calc(50px + var(--spro-nav-extra));
  align-items: center;
  transition:
    height var(--spro-dur) var(--spro-curva),
    min-height var(--spro-dur) var(--spro-curva);
}
/* \xCDcones da barra: bot\xF5es redondos de 40 px */
:root[data-spro-tema-ativo] #divInfraBarraSistemaPadrao a.align-self-center,
:root[data-spro-tema-ativo] #lnkInfraMenuSistema,
:root[data-spro-tema-ativo] #lnkInfraMenuSistemaMovel {
  /* O Bootstrap do SEI for\xE7a display:block (d-md-block): o centro vem do respiro, n\xE3o do flex */
  box-sizing: border-box;
  width: 40px;
  height: 40px;
  padding: 8px;
  border-radius: 999px;
  transition:
    background-color var(--spro-dur) var(--spro-curva),
    transform var(--spro-dur) var(--spro-curva);
}
:root[data-spro-tema-ativo] #divInfraBarraSistemaPadrao a.align-self-center:hover,
:root[data-spro-tema-ativo] #lnkInfraMenuSistema:hover,
:root[data-spro-tema-ativo] #lnkInfraMenuSistemaMovel:hover {
  background-color: color-mix(in srgb, var(--spro-barra-texto) 18%, transparent);
}
:root[data-spro-tema-ativo] #divInfraBarraSistemaPadrao a.align-self-center:active {
  transform: scale(0.94);
}
:root[data-spro-tema-ativo] #divInfraBarraSistemaPadrao a:focus-visible,
:root[data-spro-tema-ativo] #lnkInfraMenuSistema:focus-visible {
  outline: 2px solid var(--spro-barra-texto);
  outline-offset: 1px;
}
/* O bot\xE3o "Menu" tem texto: vira uma p\xEDlula com respiro, afastada da pesquisa */
:root[data-spro-tema-ativo] #divInfraBarraSistemaPadrao a#lnkInfraMenuSistema {
  display: flex;
  align-items: center;
  width: auto;
  margin-right: 10px;
  padding: 0 14px;
}
:root[data-spro-tema-ativo] #divInfraBarraSistemaPadrao a#lnkInfraMenuSistema > span {
  padding: 0;
  font-size: 14px;
  letter-spacing: 0.2px;
}
/* Pesquisa r\xE1pida: p\xEDlula transl\xFAcida que vira superf\xEDcie ao focar */
:root[data-spro-tema-ativo] #txtPesquisaRapida {
  height: 36px;
  padding-left: 16px;
  color: var(--spro-barra-texto);
  background-color: color-mix(in srgb, var(--spro-barra-texto) 16%, transparent);
  border: 1px solid color-mix(in srgb, var(--spro-barra-texto) 22%, transparent);
  border-radius: 999px 0 0 999px;
  transition:
    background-color var(--spro-dur),
    border-color var(--spro-dur);
}
:root[data-spro-tema-ativo] #txtPesquisaRapida::placeholder {
  color: color-mix(in srgb, var(--spro-barra-texto) 72%, transparent);
}
:root[data-spro-tema-ativo] #txtPesquisaRapida:focus {
  color: var(--spro-texto);
  background-color: var(--spro-fundo);
  border-color: transparent;
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--spro-barra-texto) 28%, transparent);
}
:root[data-spro-tema-ativo] #txtPesquisaRapida:focus::placeholder {
  color: var(--spro-fraco);
}
/* O bot\xE3o da lupa fecha a p\xEDlula da pesquisa; fica sobre superf\xEDcie clara, ent\xE3o o \xEDcone usa a cor do texto */
:root[data-spro-tema-ativo] #divInfraBarraSistemaPadrao span.infraAcaoBarraConjugada {
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  width: 46px;
  height: 36px;
  min-height: 0;
  padding: 0;
  background-color: var(--spro-fundo);
  border: 0;
  border-radius: 0 999px 999px 0;
}
:root[data-spro-tema-ativo] #divInfraBarraSistemaPadrao .infraAcaoBarraConjugada img {
  color: var(--spro-texto);
}
/* A unidade vira uma p\xEDlula */
:root[data-spro-tema-ativo] a#lnkInfraUnidade {
  display: inline-flex;
  align-items: center;
  min-height: 34px;
  padding: 0 14px;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.3px;
  border-radius: 999px;
  border: 1px solid color-mix(in srgb, var(--spro-barra-texto) 24%, transparent);
  box-shadow: var(--spro-sombra-1);
}

/* ============================== Menu lateral ============================== */
:root[data-spro-tema-ativo] .divInfraAreaTelaE,
:root[data-spro-tema-ativo] #divInfraAreaTelaE {
  background-color: var(--spro-fundo);
  color: var(--spro-texto);
  border-right: 1px solid var(--spro-borda);
}
:root[data-spro-tema-ativo] #divInfraPesquisarMenu {
  background-color: var(--spro-fundo);
  /* respiro antes e depois do campo: ele n\xE3o cola na barra nem no primeiro item.
     O SEI fixa a altura do cont\xEAiner (36px, sticky): sem altura autom\xE1tica o campo vaza para fora dele. */
  box-sizing: border-box;
  height: auto;
  min-height: 0;
  padding: 18px 12px 16px;
}
:root[data-spro-tema-ativo] #txtInfraPesquisarMenu {
  height: 38px;
  padding-left: 14px;
  color: var(--spro-texto);
  background-color: var(--spro-fundo-2);
  border: 1px solid var(--spro-borda);
  border-radius: 999px;
}
:root[data-spro-tema-ativo] #txtInfraPesquisarMenu:focus {
  background-color: var(--spro-fundo);
  border-color: var(--spro-destaque);
  box-shadow: var(--spro-anel);
}
:root[data-spro-tema-ativo] #infraMenu {
  padding: 4px 0 16px;
}
:root[data-spro-tema-ativo] #infraMenu li > a {
  display: flex;
  align-items: center;
  gap: 10px;
  min-height: 42px;
  margin: 2px 10px;
  padding-right: 10px;
  font-size: 14px;
  font-weight: 500;
  border-radius: 12px;
  transition:
    background-color var(--spro-dur) var(--spro-curva),
    color var(--spro-dur) var(--spro-curva);
}
:root[data-spro-tema-ativo] #infraMenu li > a > img:not(.infraImgSetaMenu),
:root[data-spro-tema-ativo] #infraMenu li > a > svg.iconMenuPro {
  flex: none;
  margin-left: 6px;
  color: var(--spro-suave);
  transition: color var(--spro-dur) var(--spro-curva);
}
:root[data-spro-tema-ativo] #infraMenu li > a > span {
  flex: 1;
  min-width: 0;
}
:root[data-spro-tema-ativo] #infraMenu li > a:hover {
  background-color: var(--spro-fundo-3);
}
:root[data-spro-tema-ativo] #infraMenu li > a:hover > img:not(.infraImgSetaMenu),
:root[data-spro-tema-ativo] #infraMenu li > a:hover > svg.iconMenuPro {
  color: var(--spro-destaque);
}
:root[data-spro-tema-ativo] #infraMenu li > a:focus-visible {
  outline: none;
  box-shadow: var(--spro-anel);
}
/* Item da tela atual (o SEI marca com a classe infraMenuSelecionado): faixa de destaque */
:root[data-spro-tema-ativo] #infraMenu li > a.infraMenuSelecionado,
:root[data-spro-tema-ativo] #infraMenu li > a.active,
:root[data-spro-tema-ativo] #infraMenu li > a[aria-current] {
  font-weight: 650;
  background-color: var(--spro-destaque-suave);
  box-shadow: inset 3px 0 0 var(--spro-destaque);
}
:root[data-spro-tema-ativo] #infraMenu li > a.infraMenuSelecionado > img:not(.infraImgSetaMenu) {
  color: var(--spro-destaque);
}
/* Itens do SEI Pro: mesmo ritmo dos nativos (o r\xF3tulo vem sem <span>) */
:root[data-spro-tema-ativo] #infraMenu a.newLinksMenuPro {
  padding-left: 5px;
  padding-right: 12px;
}

/* A seta dos submenus vira um chevron de tra\xE7o */
:root[data-spro-tema-ativo] #infraMenu img.infraImgSetaMenu {
  flex: none;
  width: 16px;
  height: 16px;
  margin-right: 2px;
  content: url("data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7");
  background-color: var(--spro-fraco);
  -webkit-mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23000' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E") center / contain no-repeat;
  transition: transform var(--spro-dur) var(--spro-curva);
}
:root[data-spro-tema-ativo] #infraMenu a[aria-expanded="true"] img.infraImgSetaMenu {
  transform: rotate(180deg);
}
/* Submenus: recuados, com uma guia \xE0 esquerda */
:root[data-spro-tema-ativo] #infraMenu ul.collapse,
:root[data-spro-tema-ativo] #infraMenu ul.collapsing,
:root[data-spro-tema-ativo] #infraMenu ul.show {
  margin-left: 28px;
  border-left: 1px solid var(--spro-borda);
}

/* ============================== T\xEDtulos ============================== */
:root[data-spro-tema-ativo] div.infraBarraLocalizacao {
  font-size: 24px;
  font-weight: 750;
  letter-spacing: -0.015em;
  line-height: 1.2;
  color: var(--spro-texto);
}

/* ============================== Barra de a\xE7\xF5es (processo e Controle) ============================== */
:root[data-spro-tema-ativo] div.barraBotoesSEI {
  padding: 6px;
  background-color: var(--spro-fundo);
  border: 1px solid var(--spro-borda);
  border-radius: var(--spro-raio-g);
  box-shadow: var(--spro-sombra-2);
}
:root[data-spro-tema-ativo] a.botaoSEI {
  border-radius: 12px;
  transition:
    background-color var(--spro-dur) var(--spro-curva),
    color var(--spro-dur) var(--spro-curva),
    transform var(--spro-dur) var(--spro-curva);
}
:root[data-spro-tema-ativo] a.botaoSEI > img {
  color: var(--spro-suave);
  transition: color var(--spro-dur) var(--spro-curva);
}
:root[data-spro-tema-ativo] a.botaoSEI:hover {
  background-color: var(--spro-fundo-3);
  transform: translateY(-1px);
}
:root[data-spro-tema-ativo] a.botaoSEI:active {
  transform: translateY(0) scale(0.96);
}
:root[data-spro-tema-ativo] a.botaoSEI:focus-visible {
  outline: none;
  box-shadow: var(--spro-anel);
}

/* ============================== Tooltips ============================== */
:root[data-spro-tema-ativo] div.infraTooltip,
:root[data-spro-tema-ativo] div#divInfraTooltip,
:root[data-spro-tema-ativo] div[data-spro-dica-caixa] {
  padding: 6px 10px;
  font-size: 12px;
  font-weight: 500;
  line-height: 1.3;
  color: var(--spro-fundo);
  background-color: var(--spro-texto);
  border: 0;
  border-radius: var(--spro-raio);
  box-shadow: var(--spro-sombra-3);
}
/* A caixa pr\xF3pria (bot\xF5es que s\xF3 tinham title): flutua sobre tudo e nunca captura o mouse */
:root[data-spro-tema-ativo] div[data-spro-dica-caixa] {
  position: fixed;
  z-index: 2147483600;
  max-width: 280px;
  font-family: var(--spro-fonte);
  pointer-events: none;
  animation: spro-dica-entra var(--spro-dur) var(--spro-curva);
}
@keyframes spro-dica-entra {
  from {
    opacity: 0;
    transform: translateY(-3px);
  }
}

/* ============================== \xC1rvore do processo ============================== */
:root[data-spro-tema-ativo] a.infraArvoreNo span {
  padding: 2px 6px;
  border-radius: var(--spro-raio-p);
  transition: background-color var(--spro-dur) var(--spro-curva);
}
:root[data-spro-tema-ativo] a.infraArvoreNo:hover span {
  background-color: var(--spro-fundo-3);
}
:root[data-spro-tema-ativo] a.infraArvoreNo span.infraArvoreNoSelecionado {
  background-color: var(--spro-destaque-medio);
  color: var(--spro-texto);
  box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--spro-destaque) 45%, transparent);
}

/* ============================== P\xE1gina do processo: divisor, selo da unidade e se\xE7\xF5es ============================== */
/* Divisor vertical entre a \xE1rvore e o visualizador: fio fino com uma al\xE7a que acende ao passar o mouse. */
:root[data-spro-tema-ativo] #divIframeArvore > .ui-resizable-e {
  background: linear-gradient(var(--spro-borda), var(--spro-borda)) center / 1px 100% no-repeat var(--spro-pagina);
  transition: background-color var(--spro-dur) var(--spro-curva);
}
:root[data-spro-tema-ativo] #divIframeArvore > .ui-resizable-e::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  width: 5px;
  height: 44px;
  transform: translate(-50%, -50%);
  border-radius: 999px;
  background-color: var(--spro-borda-forte);
  box-shadow: 0 0 0 2px var(--spro-pagina);
  transition:
    background-color var(--spro-dur) var(--spro-curva),
    height var(--spro-dur) var(--spro-curva);
}
:root[data-spro-tema-ativo] #divIframeArvore > .ui-resizable-e:hover {
  background: linear-gradient(var(--spro-destaque), var(--spro-destaque)) center / 2px 100% no-repeat var(--spro-pagina);
}
:root[data-spro-tema-ativo] #divIframeArvore > .ui-resizable-e:hover::before {
  height: 64px;
  background-color: var(--spro-destaque);
}

/* Selo da unidade ao lado de cada documento. */
:root[data-spro-tema-ativo] a.infraArvoreInformacao > span {
  display: inline-block;
  padding: 1px 8px;
  border: 0;
  border-radius: 999px;
  background-color: var(--spro-destaque-suave);
  color: var(--spro-destaque);
  box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--spro-destaque) 30%, transparent);
  font-size: 10px;
  font-weight: 600;
  line-height: 1.5;
  letter-spacing: 0.04em;
  transition:
    background-color var(--spro-dur) var(--spro-curva),
    color var(--spro-dur) var(--spro-curva);
}
:root[data-spro-tema-ativo] a.infraArvoreInformacao:hover > span {
  background-color: var(--spro-destaque);
  color: var(--spro-destaque-texto);
}

/* Divisores das se\xE7\xF5es da coluna da \xE1rvore: fio que some nas pontas, no lugar da linha cheia
   (a linha cheia vem de estilo inline, zerada em base.css). */
:root[data-spro-tema-ativo] #divConsultarAndamento,
:root[data-spro-tema-ativo] .panelDadosArvore,
:root[data-spro-tema-ativo] .panelDadosArvorePro,
:root[data-spro-tema-ativo] .stickDadosArvore,
:root[data-spro-tema-ativo] #divRelacionados {
  background-image: linear-gradient(
    90deg,
    transparent,
    var(--spro-borda-forte) 14%,
    var(--spro-borda-forte) 86%,
    transparent
  );
  background-position: top;
  background-repeat: no-repeat;
  background-size: 100% 1px;
}
`;var po=`/*
 * Tabelas e bot\xF5es do SEI e do SEI Pro no vocabul\xE1rio dos pain\xE9is refatorados (Favoritos, Projetos,
 * Demandas): as medidas, os raios e os estados de .spro-botao (sei-comum/src/ui/base.css) e de
 * .dem-tabela (demandas.css), s\xF3 que sobre os elementos nativos. S\xF3 var(--spro-*): nenhuma cor
 * literal e nenhum !important aqui. Vem depois da base e da casca, ent\xE3o ganha dela no empate.
 */

/* ---------- Bot\xF5es nativos (infraButton) ---------- */
:root[data-spro-tema-ativo] input.infraButton,
:root[data-spro-tema-ativo] button.infraButton,
:root[data-spro-tema-ativo] a.infraAnchorButton {
  min-height: 36px;
  padding: 0 18px;
  font-size: 13.5px;
  font-weight: 600;
  letter-spacing: 0.1px;
  line-height: 1.2;
  color: var(--spro-texto);
  background-color: var(--spro-fundo);
  border: 1px solid var(--spro-borda-forte);
  border-radius: 10px;
  box-shadow: var(--spro-sombra-1);
  cursor: pointer;
  transition:
    background-color var(--spro-dur) var(--spro-curva),
    border-color var(--spro-dur) var(--spro-curva),
    box-shadow var(--spro-dur) var(--spro-curva),
    transform var(--spro-dur) var(--spro-curva),
    color var(--spro-dur);
}
:root[data-spro-tema-ativo] input.infraButton:hover,
:root[data-spro-tema-ativo] button.infraButton:hover,
:root[data-spro-tema-ativo] a.infraAnchorButton:hover {
  color: var(--spro-texto);
  background-color: var(--spro-fundo-2);
  border-color: color-mix(in srgb, var(--spro-destaque) 45%, var(--spro-borda-forte));
  box-shadow: var(--spro-sombra-2);
  transform: translateY(-1px);
}
:root[data-spro-tema-ativo] input.infraButton:active,
:root[data-spro-tema-ativo] button.infraButton:active,
:root[data-spro-tema-ativo] a.infraAnchorButton:active {
  background-color: var(--spro-fundo-3);
  box-shadow: none;
  transform: translateY(0);
}
:root[data-spro-tema-ativo] input.infraButton:focus-visible,
:root[data-spro-tema-ativo] button.infraButton:focus-visible,
:root[data-spro-tema-ativo] a.infraAnchorButton:focus-visible {
  outline: none;
  box-shadow: var(--spro-anel);
}
/* O bot\xE3o que envia o formul\xE1rio (Salvar, Pesquisar...) \xE9 o prim\xE1rio: gradiente, brilho interno e halo na cor de destaque */
:root[data-spro-tema-ativo] input[type="submit"].infraButton,
:root[data-spro-tema-ativo] button[type="submit"].infraButton {
  color: var(--spro-destaque-texto);
  background-color: var(--spro-destaque);
  background-image: linear-gradient(180deg, color-mix(in srgb, var(--spro-destaque-texto) 16%, transparent), transparent 60%);
  border-color: transparent;
  box-shadow:
    inset 0 1px 0 color-mix(in srgb, var(--spro-destaque-texto) 28%, transparent),
    0 6px 14px -6px color-mix(in srgb, var(--spro-destaque) 70%, transparent);
}
:root[data-spro-tema-ativo] input[type="submit"].infraButton:hover,
:root[data-spro-tema-ativo] button[type="submit"].infraButton:hover {
  color: var(--spro-destaque-texto);
  background-color: color-mix(in srgb, var(--spro-destaque) 90%, var(--spro-texto));
  border-color: transparent;
  box-shadow:
    inset 0 1px 0 color-mix(in srgb, var(--spro-destaque-texto) 28%, transparent),
    0 10px 20px -8px color-mix(in srgb, var(--spro-destaque) 80%, transparent);
}
:root[data-spro-tema-ativo] input.infraButton:disabled,
:root[data-spro-tema-ativo] button.infraButton:disabled {
  opacity: 0.5;
  cursor: default;
}

/* ---------- Grupo de bot\xF5es da tabela (Baixar, Copiar, Pesquisar) e bot\xF5es dos di\xE1logos do SEI Pro ---------- */
:root[data-spro-tema-ativo] .btn-group.filterIfraTable .btn,
:root[data-spro-tema-ativo] .ui-dialog .ui-dialog-buttonpane button {
  min-height: 34px;
  font-size: 13px;
  font-weight: 600;
  line-height: 1.2;
  color: var(--spro-texto);
  background-color: var(--spro-fundo);
  border: 1px solid var(--spro-borda-forte);
  box-shadow: var(--spro-sombra-1);
  transition:
    background-color var(--spro-dur),
    border-color var(--spro-dur);
}
:root[data-spro-tema-ativo] .ui-dialog .ui-dialog-buttonpane button {
  border-radius: 10px;
  padding: 0 16px;
  cursor: pointer;
}
:root[data-spro-tema-ativo] .btn-group.filterIfraTable .btn:hover,
:root[data-spro-tema-ativo] .ui-dialog .ui-dialog-buttonpane button:hover {
  background-color: var(--spro-fundo-2);
  border-color: color-mix(in srgb, var(--spro-borda-forte) 60%, var(--spro-texto));
}
:root[data-spro-tema-ativo] .btn-group.filterIfraTable .btn:focus-visible,
:root[data-spro-tema-ativo] .ui-dialog .ui-dialog-buttonpane button:focus-visible {
  outline: none;
  box-shadow: var(--spro-anel);
}
:root[data-spro-tema-ativo] .btn-group.filterIfraTable .btn:first-child {
  border-radius: var(--spro-raio) 0 0 var(--spro-raio);
}
:root[data-spro-tema-ativo] .btn-group.filterIfraTable .btn:last-child {
  border-radius: 0 var(--spro-raio) var(--spro-raio) 0;
}

/* ---------- Tabelas (infraTable): a caixa, o cabe\xE7alho e as linhas como em .dem-tabela ---------- */
:root[data-spro-tema-ativo] table.infraTable {
  border-collapse: separate;
  border-spacing: 0;
  border: 1px solid var(--spro-borda);
  border-radius: var(--spro-raio-g);
}
/* Os cantos s\xE3o das c\xE9lulas das pontas (overflow: hidden cortaria o grupo de bot\xF5es que mora na legenda da tabela) */
:root[data-spro-tema-ativo] table.infraTable > thead > tr:first-child > th:first-child {
  border-top-left-radius: calc(var(--spro-raio-g) - 1px);
}
:root[data-spro-tema-ativo] table.infraTable > thead > tr:first-child > th:last-child {
  border-top-right-radius: calc(var(--spro-raio-g) - 1px);
}
:root[data-spro-tema-ativo] table.infraTable > tbody > tr:last-child > td:first-child {
  border-bottom-left-radius: calc(var(--spro-raio-g) - 1px);
}
:root[data-spro-tema-ativo] table.infraTable > tbody > tr:last-child > td:last-child {
  border-bottom-right-radius: calc(var(--spro-raio-g) - 1px);
}
:root[data-spro-tema-ativo] table.infraTable thead tr,
:root[data-spro-tema-ativo] table.infraTable tr > th.infraTh,
:root[data-spro-tema-ativo] th.infraTh {
  padding: 8px 10px;
  font-size: 11.5px;
  font-weight: 600;
  letter-spacing: 0.4px;
  text-transform: uppercase;
  color: var(--spro-suave);
  background-color: var(--spro-fundo-2);
  border-top: 0;
  border-bottom: 1px solid var(--spro-borda);
}
:root[data-spro-tema-ativo] th.infraTh a,
:root[data-spro-tema-ativo] th.infraTh span {
  color: inherit;
}
:root[data-spro-tema-ativo] th.infraTh div.tablesorter-header-inner,
:root[data-spro-tema-ativo] th.infraTh div.infraDivRotuloOrdenacao,
:root[data-spro-tema-ativo] th.infraTh div.infraDivThCheckRotulo {
  color: inherit;
}
:root[data-spro-tema-ativo] table.infraTable td {
  padding: 8px 10px;
  border-top: 0;
  border-bottom: 1px solid color-mix(in srgb, var(--spro-borda) 60%, transparent);
}
:root[data-spro-tema-ativo] table.infraTable tr:last-child > td {
  border-bottom: 0;
}
/* Sem zebra, como nos pain\xE9is */
:root[data-spro-tema-ativo] tr.infraTrClara,
:root[data-spro-tema-ativo] td.infraTdClara,
:root[data-spro-tema-ativo] tr.infraTrEscura,
:root[data-spro-tema-ativo] td.infraTdEscura {
  background-color: var(--spro-fundo);
}
:root[data-spro-tema-ativo] tr.infraTrClara:hover,
:root[data-spro-tema-ativo] tr.infraTrEscura:hover {
  background-color: var(--spro-destaque-suave);
}

/* ---------- Campos e formul\xE1rios ---------- */
:root[data-spro-tema-ativo] input.infraText,
:root[data-spro-tema-ativo] select.infraSelect,
:root[data-spro-tema-ativo] input[type="text"],
:root[data-spro-tema-ativo] input[type="password"],
:root[data-spro-tema-ativo] input[type="search"],
:root[data-spro-tema-ativo] input[type="date"],
:root[data-spro-tema-ativo] input[type="number"],
:root[data-spro-tema-ativo] select {
  min-height: 36px;
  padding: 0 12px;
  border-radius: 10px;
  transition:
    border-color var(--spro-dur),
    box-shadow var(--spro-dur);
}
:root[data-spro-tema-ativo] textarea.infraTextarea,
:root[data-spro-tema-ativo] textarea {
  padding: 10px 12px;
  border-radius: 10px;
}
:root[data-spro-tema-ativo] label.infraLabelObrigatorio,
:root[data-spro-tema-ativo] label.infraLabelOpcional {
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.1px;
  color: var(--spro-suave);
}
/* Respiro entre r\xF3tulo e campo, e entre um campo e o r\xF3tulo seguinte (nas telas internas eles vinham colados) */
:root[data-spro-tema-ativo] label.infraLabelObrigatorio:has(+ :is(input, select, textarea, .chosen-container, div.infraAreaDados)),
:root[data-spro-tema-ativo] label.infraLabelOpcional:has(+ :is(input, select, textarea, .chosen-container, div.infraAreaDados)) {
  display: inline-block;
  margin-bottom: 6px;
}
:root[data-spro-tema-ativo] :is(input.infraText, select.infraSelect, textarea.infraTextarea, .chosen-container):has(+ label) {
  margin-bottom: 16px;
}

/* Quadros de formul\xE1rio viram cart\xF5es; a legenda vira uma etiqueta pequena */
:root[data-spro-tema-ativo] fieldset.infraFieldset {
  padding: 16px 18px 14px;
  border: 1px solid var(--spro-borda);
  border-radius: var(--spro-raio-g);
  box-shadow: var(--spro-sombra-1);
}
:root[data-spro-tema-ativo] legend.infraLegend {
  padding: 3px 12px;
  font-size: 11.5px;
  font-weight: 700;
  letter-spacing: 0.6px;
  text-transform: uppercase;
  border-radius: 999px;
}
:root[data-spro-tema-ativo] input[type="checkbox"],
:root[data-spro-tema-ativo] input[type="radio"] {
  accent-color: var(--spro-destaque);
}

/* ---------- Di\xE1logos (jQuery UI e do SEI Pro) ---------- */
:root[data-spro-tema-ativo] .ui-dialog {
  border-radius: 16px;
  box-shadow: var(--spro-sombra-3);
  overflow: hidden;
}
:root[data-spro-tema-ativo] .ui-dialog .ui-dialog-titlebar {
  padding: 14px 18px;
  font-size: 15px;
  font-weight: 650;
  background-color: var(--spro-fundo);
  border: 0;
  border-bottom: 1px solid var(--spro-borda);
  border-radius: 0;
}
:root[data-spro-tema-ativo] .ui-dialog .ui-dialog-buttonpane {
  padding: 12px 18px;
  background-color: var(--spro-fundo-2);
  border-top: 1px solid var(--spro-borda);
}
:root[data-spro-tema-ativo] .ui-widget-overlay {
  backdrop-filter: blur(3px);
}

/* ---------- Sele\xE7\xE3o de texto e barras de rolagem ---------- */
:root[data-spro-tema-ativo] ::selection {
  background-color: var(--spro-destaque-medio);
}
:root[data-spro-tema-ativo] ::-webkit-scrollbar {
  width: 11px;
  height: 11px;
}
:root[data-spro-tema-ativo] ::-webkit-scrollbar-thumb {
  background-color: var(--spro-borda-forte);
  background-clip: padding-box;
  border: 3px solid transparent;
  border-radius: 999px;
}
:root[data-spro-tema-ativo] ::-webkit-scrollbar-thumb:hover {
  background-color: var(--spro-fraco);
}
:root[data-spro-tema-ativo] ::-webkit-scrollbar-track {
  background: transparent;
}

/* ---------- O documento como papel (s\xF3 nas telas de leitura) ---------- */
:root[data-spro-tema-ativo][data-spro-papel] {
  background-color: var(--spro-pagina);
}
:root[data-spro-tema-ativo][data-spro-papel] body {
  box-sizing: border-box;
  max-width: 940px;
  margin: 28px auto;
  padding: 40px 56px;
  background-color: var(--spro-fundo);
  border: 1px solid var(--spro-borda);
  border-radius: var(--spro-raio-g);
  box-shadow: var(--spro-sombra-2);
}
`;function d(a,o={},...r){let t=document.createElement(a);for(let[e,s]of Object.entries(o))s===void 0||s===!1||(typeof s=="function"?t.addEventListener(e.replace(/^on/,""),s):s===!0?t.setAttribute(e,""):e==="class"?t.className=s:e==="value"&&a==="textarea"?t.value=s:t.setAttribute(e,s));for(let e of r)e!=null&&e!==!1&&t.append(e);return t}var y={fill:"currentColor",stroke:"none"},co="M12 3.2l2.7 5.5 6 .9-4.35 4.25 1 6L12 17l-5.35 2.85 1-6L3.3 9.6l6-.9z",G={estrela:[["path",{d:co}]],estrelaCheia:[["path",{d:co,fill:"currentColor"}]],alvo:[["circle",{cx:"12",cy:"12",r:"7.5"}],["circle",{cx:"12",cy:"12",r:"3.2"}]],alvoAtivo:[["circle",{cx:"12",cy:"12",r:"6.6"}],["circle",{cx:"12",cy:"12",r:"2.4",fill:"currentColor"}],["path",{d:"M12 2.2v3.4M12 18.4v3.4M2.2 12h3.4M18.4 12h3.4"}]],pasta:[["path",{d:"M3.5 7.5a2 2 0 0 1 2-2h4l2 2h7a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2z"}]],etiqueta:[["path",{d:"M3.5 12.2V4.5a1 1 0 0 1 1-1h7.7l8.3 8.3a1 1 0 0 1 0 1.4l-7.1 7.1a1 1 0 0 1-1.4 0z"}],["circle",{cx:"8",cy:"8",r:"1.4",...y}]],relogio:[["circle",{cx:"12",cy:"12",r:"9"}],["path",{d:"M12 7.2V12l3.2 1.9"}]],nota:[["path",{d:"M6 3.5h9l3.5 3.5v13.5H6z"}],["path",{d:"M9 11h6"}],["path",{d:"M9 15h6"}]],lixeira:[["path",{d:"M4.5 6.5h15"}],["path",{d:"M9.5 6.5V4.8c0-.7.6-1.3 1.3-1.3h2.4c.7 0 1.3.6 1.3 1.3v1.7"}],["path",{d:"M6.8 6.5 7.6 19c0 .8.7 1.5 1.5 1.5h5.8c.8 0 1.5-.7 1.5-1.5l.8-12.5"}]],lapis:[["path",{d:"M17.5 3.5a2.1 2.1 0 0 1 3 3L9 18l-4.5 1.5L6 15z"}],["path",{d:"M15 6l3 3"}]],fechar:[["path",{d:"M18 6 6 18"}],["path",{d:"M6 6l12 12"}]],mais:[["path",{d:"M12 5v14"}],["path",{d:"M5 12h14"}]],busca:[["circle",{cx:"11",cy:"11",r:"6.5"}],["path",{d:"M20.5 20.5l-4.8-4.8"}]],baixar:[["path",{d:"M12 3.5v11"}],["path",{d:"M7.5 10.2 12 14.7l4.5-4.5"}],["path",{d:"M4.5 19.5h15"}]],subir:[["path",{d:"M12 14.5v-11"}],["path",{d:"M7.5 7.8 12 3.3l4.5 4.5"}],["path",{d:"M4.5 19.5h15"}]],copiar:[["rect",{x:"8.5",y:"8.5",width:"12",height:"12",rx:"2"}],["path",{d:"M15.5 8.5V5.5a2 2 0 0 0-2-2h-8a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h3"}]],restaurar:[["path",{d:"M9 14 4 9l5-5"}],["path",{d:"M4 9h9a7 7 0 0 1 7 7v4"}]],check:[["path",{d:"M20 6.5 9.2 17.3 4 12.1"}]],alerta:[["path",{d:"M10.3 4.4 2.8 17.6a2 2 0 0 0 1.7 3h15a2 2 0 0 0 1.7-3L13.7 4.4a2 2 0 0 0-3.4 0z"}],["path",{d:"M12 9.5v4"}],["circle",{cx:"12",cy:"16.8",r:"1",...y}]],menu:[["circle",{cx:"5",cy:"12",r:"1.4",...y}],["circle",{cx:"12",cy:"12",r:"1.4",...y}],["circle",{cx:"19",cy:"12",r:"1.4",...y}]],alca:[["circle",{cx:"9",cy:"6",r:"1.3",...y}],["circle",{cx:"15",cy:"6",r:"1.3",...y}],["circle",{cx:"9",cy:"12",r:"1.3",...y}],["circle",{cx:"15",cy:"12",r:"1.3",...y}],["circle",{cx:"9",cy:"18",r:"1.3",...y}],["circle",{cx:"15",cy:"18",r:"1.3",...y}]],ajustes:[["path",{d:"M4 7h5"}],["path",{d:"M13 7h7"}],["circle",{cx:"11",cy:"7",r:"2.1"}],["path",{d:"M4 17h9"}],["path",{d:"M17 17h3"}],["circle",{cx:"15",cy:"17",r:"2.1"}]],setaCima:[["path",{d:"M12 19V6"}],["path",{d:"M6 12l6-6 6 6"}]],setaBaixo:[["path",{d:"M12 5v13"}],["path",{d:"M18 12l-6 6-6-6"}]],recolher:[["path",{d:"M6 15l6-6 6 6"}]],expandir:[["path",{d:"M6 9l6 6 6-6"}]],local:[["path",{d:"M12 21s-6.5-6.1-6.5-11a6.5 6.5 0 0 1 13 0c0 4.9-6.5 11-6.5 11z"}],["circle",{cx:"12",cy:"10",r:"2.3"}]],sino:[["path",{d:"M6.5 16.5V11a5.5 5.5 0 0 1 11 0v5.5l1.5 1.5h-14z"}],["path",{d:"M10 20.5a2 2 0 0 0 4 0"}]],documento:[["path",{d:"M7 3.5h7l4 4v13H7z"}],["path",{d:"M14 3.5v4h4"}]],painel:[["rect",{x:"3.5",y:"4.5",width:"17",height:"15",rx:"2"}],["path",{d:"M14.5 4.5v15"}]],atualizar:[["path",{d:"M19.5 12a7.5 7.5 0 1 1-2.2-5.3"}],["path",{d:"M19.5 4.5v4h-4"}]],nuvem:[["path",{d:"M7 18.5h10a4 4 0 0 0 .6-7.95A5.5 5.5 0 0 0 7 9.5a4.5 4.5 0 0 0 0 9z"}]],chevron:[["path",{d:"M7 9.5l5 5 5-5"}]],pino:[["path",{d:"M9.5 3.5h5l-.8 5.2 3.3 3.1v1.7H7v-1.7l3.3-3.1z"}],["path",{d:"M12 13.5v7"}]],pinoCheio:[["path",{d:"M9.5 3.5h5l-.8 5.2 3.3 3.1v1.7H7v-1.7l3.3-3.1z",fill:"currentColor"}],["path",{d:"M12 13.5v7"}]],filtro:[["path",{d:"M4 5.5h16l-6.2 7.3v5.4l-3.6 1.8v-7.2z"}]],ordenar:[["path",{d:"M7.5 4.5v15"}],["path",{d:"M4 16l3.5 3.5L11 16"}],["path",{d:"M16.5 19.5v-15"}],["path",{d:"M13 8l3.5-3.5L20 8"}]],mapa:[["path",{d:"M9 4.5 3.5 6.6v13l5.5-2.1 6 2.1 5.5-2.1v-13L15 6.6z"}],["path",{d:"M9 4.5v13"}],["path",{d:"M15 6.6v13"}]],olho:[["path",{d:"M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z"}],["circle",{cx:"12",cy:"12",r:"2.8"}]],camadas:[["path",{d:"M12 3.5 20.5 8 12 12.5 3.5 8z"}],["path",{d:"M3.5 12 12 16.5 20.5 12"}],["path",{d:"M3.5 16 12 20.5 20.5 16"}]],historico:[["path",{d:"M3.8 12.5A8.3 8.3 0 1 0 6.2 6"}],["path",{d:"M3.8 4.2v4.3h4.3"}],["path",{d:"M12 8v4.2l2.8 1.7"}]],pessoa:[["circle",{cx:"12",cy:"8",r:"3.6"}],["path",{d:"M5 20c.9-3.7 3.6-5.6 7-5.6s6.1 1.9 7 5.6"}]],predio:[["path",{d:"M5 20.5v-15a1 1 0 0 1 1-1h7.5a1 1 0 0 1 1 1v15"}],["path",{d:"M14.5 9.5H18a1 1 0 0 1 1 1v10"}],["path",{d:"M3 20.5h18"}],["path",{d:"M8.5 8.5h3"}],["path",{d:"M8.5 12h3"}],["path",{d:"M8.5 15.5h3"}]],brilho:[["path",{d:"M12 3.5l1.9 5.1 5.1 1.9-5.1 1.9L12 17.5l-1.9-5.1L5 10.5l5.1-1.9z"}],["path",{d:"M18.5 16.5v4"}],["path",{d:"M16.5 18.5h4"}]],calendario:[["rect",{x:"4",y:"5.5",width:"16",height:"15",rx:"2"}],["path",{d:"M4 10h16"}],["path",{d:"M8.5 3.5v4"}],["path",{d:"M15.5 3.5v4"}]],cadeado:[["rect",{x:"5.5",y:"10.5",width:"13",height:"10",rx:"2"}],["path",{d:"M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5"}]],saida:[["path",{d:"M14 4.5h4.5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H14"}],["path",{d:"M10 16l4-4-4-4"}],["path",{d:"M14 12H4.5"}]],planilha:[["rect",{x:"4",y:"4",width:"16",height:"16",rx:"2"}],["path",{d:"M4 9.5h16"}],["path",{d:"M4 15h16"}],["path",{d:"M10 9.5V20"}]],mover:[["path",{d:"M4.5 12h14"}],["path",{d:"M13.5 6.5 19 12l-5.5 5.5"}]],sol:[["circle",{cx:"12",cy:"12",r:"3.8"}],["path",{d:"M12 2.8v2M12 19.2v2M2.8 12h2M19.2 12h2M5.5 5.5l1.4 1.4M17.1 17.1l1.4 1.4M5.5 18.5l1.4-1.4M17.1 6.9l1.4-1.4"}]],teclado:[["rect",{x:"3",y:"6.5",width:"18",height:"11",rx:"2"}],["path",{d:"M7 10h.01M10.3 10h.01M13.7 10h.01M17 10h.01M8 14h8"}]],gantt:[["path",{d:"M4 5h9M7 12h11M4 19h7"}],["path",{d:"M3 3v18"}]],demandas:[["circle",{cx:"10",cy:"7.8",r:"3.2"}],["path",{d:"M3.8 19.5a6.2 5.2 0 0 1 11.8-2.6"}],["circle",{cx:"17.6",cy:"17.6",r:"4.2"}],["path",{d:"m15.6 17.7 1.5 1.5 2.5-3"}]]},Da=Object.keys(G);function Ko(a=8,o=6.4,r=8.6){let t=[],e=Math.PI*2/a,s=n=>Number(n.toFixed(2));for(let n=0;n<a;n++){let p=n*e-Math.PI/2;for(let[u,v]of[[o,-.32],[r,-.2],[r,.2],[o,.32]]){let c=p+v*e*1.2;t.push(`${s(12+u*Math.cos(c))} ${s(12+u*Math.sin(c))}`)}}return[["path",{d:`M${t.join("L")}z`}],["circle",{cx:"12",cy:"12",r:"2.7"}]]}var lo={engrenagem:Ko(),livro:[["path",{d:"M5 4.5A1.5 1.5 0 0 1 6.5 3H19v15H6.5A1.5 1.5 0 0 0 5 19.5z"}],["path",{d:"M5 19.5A1.5 1.5 0 0 0 6.5 21H19v-3"}],["path",{d:"M9 7.5h6"}]],lista:[["path",{d:"M9.5 6.5H20M9.5 12H20M9.5 17.5H20"}],["circle",{cx:"4.8",cy:"6.5",r:"1",fill:"currentColor"}],["circle",{cx:"4.8",cy:"12",r:"1",fill:"currentColor"}],["circle",{cx:"4.8",cy:"17.5",r:"1",fill:"currentColor"}]],pessoas:[["circle",{cx:"9",cy:"8.2",r:"3.2"}],["path",{d:"M3.2 19.2a5.8 5.8 0 0 1 11.6 0"}],["circle",{cx:"17.2",cy:"9",r:"2.4"}],["path",{d:"M16.4 13.6a4.7 4.7 0 0 1 4.6 4.2"}]],pastaMais:[["path",{d:"M3.5 7.5a2 2 0 0 1 2-2h4l2 2h7a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2z"}],["path",{d:"M12 11v5M9.5 13.5h5"}]],escudoCheck:[["path",{d:"M12 3 5 6v5.5c0 4.4 3 7.9 7 9.5 4-1.6 7-5.1 7-9.5V6z"}],["path",{d:"m9.2 12 2 2 3.6-3.8"}]],escudo:[["path",{d:"M12 3 5 6v5.5c0 4.4 3 7.9 7 9.5 4-1.6 7-5.1 7-9.5V6z"}]],bandeira:[["path",{d:"M5.5 21V4.2"}],["path",{d:"M5.5 4.8c2.4-1.2 4.6-1.2 7 0s4.6 1.2 7 0v8.6c-2.4 1.2-4.6 1.2-7 0s-4.6-1.2-7 0"}]],pausa:[["circle",{cx:"12",cy:"12",r:"9"}],["path",{d:"M10 9v6M14 9v6"}]],retorno:[["path",{d:"M4 9h13l-3-3M20 15H7l3 3"}]],codigo:[["path",{d:"m8.5 8-4 4 4 4M15.5 8l4 4-4 4M13.2 6.5l-2.4 11"}]],megafone:[["path",{d:"M4 10v4a1 1 0 0 0 1 1h2.5l6 4V5l-6 4H5a1 1 0 0 0-1 1z"}],["path",{d:"M17.2 9.4a3.6 3.6 0 0 1 0 5.2"}]],acessibilidade:[["circle",{cx:"12",cy:"5",r:"1.8"}],["path",{d:"M5 8.5l7 1.6 7-1.6M12 10.2V15m0 0-3 6m3-6 3 6"}]],enviar:[["path",{d:"M21 3 10.5 13.5M21 3l-6.5 18-4-7.5L3 9.5z"}]],pessoaMais:[["circle",{cx:"9.5",cy:"8",r:"3.4"}],["path",{d:"M3.5 19.5a6 6 0 0 1 12 0"}],["path",{d:"M19 8v6M16 11h6"}]],blocoMais:[["path",{d:"M12 3 3.5 7.5 12 12l8.5-4.5z"}],["path",{d:"M3.5 12 12 16.5l3.5-1.9"}],["path",{d:"M19 15v6M16 18h6"}]],documentoMais:[["path",{d:"M6 3.5h8.5L19 8v12.5H6z"}],["path",{d:"M14.5 3.5V8H19"}],["path",{d:"M12.5 11.5v5M10 14h5"}]],etiquetaMais:[["path",{d:"M3.5 12.2V4.5a1 1 0 0 1 1-1h7.7l7.3 7.3"}],["circle",{cx:"8",cy:"8",r:"1.4",fill:"currentColor"}],["path",{d:"M18.5 15.5v6M15.5 18.5h6"}]],etiquetaMenos:[["path",{d:"M3.5 12.2V4.5a1 1 0 0 1 1-1h7.7l7.3 7.3"}],["circle",{cx:"8",cy:"8",r:"1.4",fill:"currentColor"}],["path",{d:"M15.5 18.5h6"}]],concluir:[["circle",{cx:"12",cy:"12",r:"9"}],["path",{d:"m8.4 12.3 2.4 2.4 4.8-5.1"}]],chave:[["circle",{cx:"8",cy:"15.5",r:"4"}],["path",{d:"m10.8 12.7 9.2-9.2M17 6.5l3 3M14.5 9l2 2"}]],robo:[["rect",{x:"4.5",y:"8",width:"15",height:"10.5",rx:"3.2"}],["path",{d:"M12 4.3V8"}],["circle",{cx:"12",cy:"3.6",r:"1",fill:"currentColor"}],["circle",{cx:"9",cy:"13",r:"1.1",fill:"currentColor"}],["circle",{cx:"15",cy:"13",r:"1.1",fill:"currentColor"}],["path",{d:"M2.8 12v2M21.2 12v2"}]],fluxo:[["rect",{x:"3.5",y:"3.8",width:"7",height:"5.2",rx:"1.4"}],["rect",{x:"13.5",y:"15",width:"7",height:"5.2",rx:"1.4"}],["path",{d:"M7 9v3.5h10V15"}]],seta:[["path",{d:"M9 6l6 6-6 6"}]],assinar:[["path",{d:"M16.5 3.2l4.3 4.3L10.2 18.1l-4.7 1 1-4.7z"}],["path",{d:"m14.2 5.5 4.3 4.3"}],["path",{d:"M2.8 21.3c1.6-1.5 2.7-1.5 3.3 0s1.7 1.3 2.7-.4 2.3-1.3 3.3.2"}]],documentoLupa:[["path",{d:"M6 3.5h8.5L19 8v4.5"}],["path",{d:"M14.5 3.5V8H19"}],["path",{d:"M6 3.5v17h5.5"}],["circle",{cx:"15.4",cy:"16.4",r:"3.2"}],["path",{d:"m17.8 18.8 3 3"}]],documentoLapis:[["path",{d:"M6 3.5h8.5L19 8v3.5"}],["path",{d:"M14.5 3.5V8H19"}],["path",{d:"M6 3.5v17h6"}],["path",{d:"M9 10.5h4M9 14h2.5"}],["path",{d:"M17.9 12.6a1.6 1.6 0 0 1 2.3 2.3l-6.7 6.7-3 .8.8-3z"}]],certidao:[["path",{d:"M6 3.5h8.5L19 8v5.5"}],["path",{d:"M14.5 3.5V8H19"}],["path",{d:"M6 3.5v17h6"}],["circle",{cx:"16.2",cy:"16.6",r:"3.1"}],["path",{d:"m14.9 19.1-.9 2.4 2.2-1.1 2.2 1.1-.9-2.4"}]],desativar:[["circle",{cx:"12",cy:"12",r:"9"}],["path",{d:"m5.7 5.7 12.6 12.6"}]],paginaAnterior:[["path",{d:"m15 6-6 6 6 6"}]],paginaPrimeira:[["path",{d:"m17 6-6 6 6 6M9 6v12"}]],paginaUltima:[["path",{d:"m7 6 6 6-6 6M15 6v12"}]],polegar:[["path",{d:"M3.5 10.5h3.2v9.5H3.5z"}],["path",{d:"M6.7 10.5 10.8 3.6c1.4 0 2.4 1.2 2.1 2.6L12.2 9.5H18a2 2 0 0 1 1.9 2.5l-1.6 6.3a2 2 0 0 1-1.9 1.5H6.7"}]],selo:[["circle",{cx:"12",cy:"9",r:"5.2"}],["path",{d:"m9 13.6-1.3 7 4.3-2.3 4.3 2.3-1.3-7"}],["path",{d:"m10.2 9 1.3 1.3 2.4-2.6"}]],documentoX:[["path",{d:"M6 3.5h8.5L19 8v12.5H6z"}],["path",{d:"M14.5 3.5V8H19"}],["path",{d:"m10 12.5 5 5M15 12.5l-5 5"}]],email:[["rect",{x:"3.5",y:"5.5",width:"17",height:"13",rx:"2.2"}],["path",{d:"m4 7.8 8 5.8 8-5.8"}]],pdf:[["path",{d:"M6 3.5h8.5L19 8v12.5H6z"}],["path",{d:"M14.5 3.5V8H19"}],["path",{d:"M9 16.5h1.6a1.3 1.3 0 0 0 0-2.6H9v4M13.5 18v-4h1a2 2 0 0 1 0 4z"}]],gerarPdf:[["path",{d:"M6 3.5h8.5L19 8v12.5H6z"}],["path",{d:"M14.5 3.5V8H19"}],["path",{d:"M12.5 11.5V17m0 0-2-2m2 2 2-2"}]],imprimir:[["path",{d:"M7 8.5V3.5h10v5"}],["rect",{x:"3.5",y:"8.5",width:"17",height:"8",rx:"2"}],["path",{d:"M7 14h10v6.5H7z"}]],comentario:[["path",{d:"M4 5.5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-6.5L7 20.5v-4H6a2 2 0 0 1-2-2z"}]],duplicar:[["rect",{x:"8.5",y:"8.5",width:"12",height:"12",rx:"2"}],["path",{d:"M15.5 8.5V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v7.5a2 2 0 0 0 2 2h2.5"}]],link:[["path",{d:"M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"}]],ordenarLista:[["path",{d:"M4 6.5h16M4 12h10M4 17.5h6"}]]};var b=(a,o)=>({src:`menu/${a}.svg`,icone:o,contexto:"menu"}),I=(a,o)=>({src:`${a}.svg`,icone:o,contexto:"topo"}),x=(a,o,r={})=>({src:`svg/${a}.svg`,icone:o,contexto:"tabela",...r}),V=(a,o,r={})=>({src:`${a}.svg`,icone:o,contexto:"barra",...r}),uo=[b("acompanhamento_especial","olho"),b("administracao","engrenagem"),b("base_conhecimento","livro"),b("blocos","camadas"),b("contatos","pessoas"),b("controle_prazo","relogio"),b("controle_processos","lista"),b("favoritos","estrela"),b("grupos","pessoas"),b("iniciar_processo","pastaMais"),b("inspecao_administrativa","escudoCheck"),b("marcadores","etiqueta"),b("painel_controle","painel"),b("pesquisa","busca"),b("pontos_controle","bandeira"),b("processos_sobrestados","pausa"),b("reabertura_programada","historico"),b("relatorios","planilha"),b("retorno_programado","retorno"),b("texto_padrao","documento"),b("infra","codigo"),I("menu_pontos_topo","menu"),I("pesquisa_rapida","busca"),I("controle_processos_barra","lista"),I("painel_controle_barra","painel"),I("novidades","megafone"),I("acessibilidade_topo","acessibilidade"),I("configuracao","engrenagem"),I("usuario_topo","pessoa"),I("sair","saida"),V("ferramentas_pdf","pdf",{daExtensao:!0,proprio:!0}),V("acao_lote","camadas",{daExtensao:!0,proprio:!0}),V("doc_lote","documentos",{daExtensao:!0,proprio:!0}),V("compare_doc","comparar",{daExtensao:!0,proprio:!0}),{src:"spro-historico",icone:"historico",contexto:"barra",proprio:!0},{src:"#iconDocCertidao",seletor:"a#iconDocCertidao > img",icone:"certidao",contexto:"barra",proprio:!0},x("consultar","olho"),x("pre_visualizar","olho"),x("alterar","lapis"),x("desativar","desativar"),x("excluir","lixeira",{tom:"perigo"}),x("clonar","duplicar"),x("valores","lista"),x("historico","historico"),x("check","check"),x("federacao","mapa"),x("paginacao_anterior","paginaAnterior"),x("paginacao_proxima","seta"),x("paginacao_primeira","paginaPrimeira"),x("paginacao_ultima","paginaUltima")],vo=[{id:"seiProAgenteMenu",icone:"robo"},{id:"pesquisaLinkPermanentePro",icone:"link"},{id:"historicoProcessosPro",icone:"historico"},{id:"ferramentasPdfPro",icone:"pdf"},{id:"processosLotePro",icone:"camadas"}];var C=a=>`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">${a}</svg>`,mo={alvo:C('<circle cx="12" cy="12" r="10" fill="#e5484d"/><circle cx="12" cy="12" r="6.8" fill="#fff"/><circle cx="12" cy="12" r="3.9" fill="#e5484d"/><circle cx="12" cy="12" r="1.4" fill="#fff"/><path d="M12 1.5v4M12 18.5v4M1.5 12h4M18.5 12h4" stroke="#9f2a2e" stroke-width="1.6" stroke-linecap="round"/>'),pdf:C('<path d="M5 3.5A1.5 1.5 0 0 1 6.5 2H14l5 5v13.5A1.5 1.5 0 0 1 17.5 22h-11A1.5 1.5 0 0 1 5 20.5z" fill="#f4f4f5"/><path d="M14 2l5 5h-3.5A1.5 1.5 0 0 1 14 5.5z" fill="#c9ccd1"/><rect x="2.5" y="11.5" width="14" height="7" rx="1.8" fill="#e5484d"/><path d="M5 17v-4h1.6a1.2 1.2 0 0 1 0 2.4H5M9 17v-4h1a2 2 0 0 1 0 4zM13.8 13H12.5v4" fill="none" stroke="#fff" stroke-width="1.1" stroke-linecap="round" stroke-linejoin="round"/>'),camadas:C('<path d="M12 12.8 21.5 17.5 12 22.2 2.5 17.5z" fill="#6d3fd1"/><path d="M12 8.4 21.5 13.1 12 17.8 2.5 13.1z" fill="#8f67ea"/><path d="M12 2 21.5 6.7 12 11.4 2.5 6.7z" fill="#c4b0f7"/><path d="M12 4.9v3.7M10.2 6.8h3.6" stroke="#fff" stroke-width="1.5" stroke-linecap="round"/>'),documentos:C('<path d="M3.5 5.5A1.5 1.5 0 0 1 5 4h7l3.5 3.5V19A1.5 1.5 0 0 1 14 20.5H5A1.5 1.5 0 0 1 3.5 19z" fill="#2f9e5b"/><path d="M8.5 7.5A1.5 1.5 0 0 1 10 6h7l3.5 3.5V21A1.5 1.5 0 0 1 19 22.5h-9A1.5 1.5 0 0 1 8.5 21z" transform="translate(0 -1)" fill="#5fd38d"/><path d="M14.5 10.2v6.6M11.2 13.5h6.6" stroke="#fff" stroke-width="1.7" stroke-linecap="round"/>'),comparar:C('<rect x="2" y="4" width="10" height="16" rx="2" fill="#0e8fb0"/><rect x="12" y="4" width="10" height="16" rx="2" fill="#5fd0ea"/><path d="M5 9h4M5 12h4M5 15h4" stroke="#fff" stroke-width="1.4" stroke-linecap="round"/><path d="M15 9h4M15 12h4M15 15h2.5" stroke="#0e6f88" stroke-width="1.4" stroke-linecap="round"/>'),historico:C('<circle cx="13" cy="12" r="8.6" fill="#3b82f6"/><circle cx="13" cy="12" r="6.2" fill="#dbeafe"/><path d="M13 8v4.4l3 1.8" fill="none" stroke="#1d4ed8" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/><path d="M2.2 6.2v4.6h4.6" fill="none" stroke="#1d4ed8" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/><path d="M3 10.8a9.6 9.6 0 0 1 2-4.8" fill="none" stroke="#1d4ed8" stroke-width="1.9" stroke-linecap="round"/>'),certidao:C('<path d="M4.5 3.5A1.5 1.5 0 0 1 6 2h9l4.5 4.5V20A1.5 1.5 0 0 1 18 21.5H6A1.5 1.5 0 0 1 4.5 20z" fill="#f4f4f5"/><path d="M15 2l4.5 4.5H16.5A1.5 1.5 0 0 1 15 5z" fill="#c9ccd1"/><path d="M8 8.5h5M8 11.5h8" stroke="#9aa1ab" stroke-width="1.4" stroke-linecap="round"/><path d="m14.2 16.5-1 5 2.3-1.3 2.3 1.3-1-5z" fill="#1f8a4c"/><circle cx="15.5" cy="15" r="3.4" fill="#2fb464"/><path d="m14 15 1 1 2-2.2" fill="none" stroke="#fff" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>')};var Yo={...G,...lo},Jo={menu:"0",topo:"0",barra:"7px",tabela:"2px"},Wo={topo:`width: 24px;
  height: 24px;
  `,tabela:`width: 24px;
  height: 24px;
  `},Zo={menu:"currentColor",topo:"currentColor",barra:"currentColor !important",tabela:"currentColor"},bo={menu:"#infraMenu",topo:"#divInfraBarraSistemaPadrao",barra:":is(div.barraBotoesSEI, #divArvoreAcoes)",tabela:"table"},oa={tabela:`
  color: var(--spro-suave);`};function fo(a,o=0){let r=Yo[a];if(!r)throw new Error(`\xCDcone desconhecido: ${a}`);return`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${r.map(([e,s])=>{let n=e==="circle"||e==="rect"||e==="path"&&/z/i.test(String(s.d??"")),p=o>0&&n&&!s.fill?` fill="#000" fill-opacity="${o}"`:"",u=Object.entries(s).map(([v,c])=>v==="fill"&&c==="currentColor"?'fill="#000"':v==="stroke"&&c==="none"?'stroke="none"':`${v}="${c}"`).join(" ");return`<${e} ${u}${p}/>`}).join("")}</svg>`}var aa={barra:.62},X=a=>`url("data:image/svg+xml,${encodeURIComponent(a).replace(/'/g,"%27").replace(/"/g,"%22")}")`,ra='url("data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7")',j=a=>a.seletor?`:root[data-spro-tema-ativo] ${bo[a.contexto]} ${a.seletor}`:`:root[data-spro-tema-ativo] ${bo[a.contexto]} img${a.daExtensao?'[src^="chrome-extension"]':""}[src*="${a.src}"]`;function ho(a=uo){let o=[],r=a.filter(t=>t.proprio);if(r.length>0){o.push(`${r.map(j).join(`,
`)} {
  box-sizing: border-box;
  padding: 0;
  background: none !important;
}`);for(let t of r){let e=mo[t.icone];if(!e)throw new Error(`\xCDcone pr\xF3prio desconhecido: ${t.icone}`);o.push(`${j(t)} {
  content: ${X(e)};
}`)}}for(let t of["menu","topo","barra","tabela"]){let e=a.filter(s=>s.contexto===t&&!s.proprio);e.length!==0&&o.push(`${e.map(j).join(`,
`)} {
  content: ${ra};
  box-sizing: border-box;
  ${Wo[t]??""}padding: ${Jo[t]};
  background-color: ${Zo[t]};
  background-clip: content-box;${oa[t]??""}
  -webkit-mask-repeat: no-repeat;
  -webkit-mask-position: center;
  -webkit-mask-size: contain;
  -webkit-mask-origin: content-box;
  -webkit-mask-clip: content-box;
}`)}for(let t of a.filter(e=>!e.proprio))o.push(`${j(t)} {
  -webkit-mask-image: ${X(fo(t.icone,aa[t.contexto]??0))};${t.tom?`
  color: var(--${t.tom==="perigo"?"spro-perigo":`spro-tom-${t.tom}`});`:""}
}`);return o.join(`
`)}function go(a=vo){let o=":root[data-spro-tema-ativo] #infraMenu a.newLinksMenuPro > svg.iconMenuPro",r=[`${o} {
  box-sizing: border-box;
  flex: none;
  margin: 0 5px 0 6px !important;
  background-color: currentColor;
  -webkit-mask-repeat: no-repeat;
  -webkit-mask-position: center;
  -webkit-mask-size: contain;
}`,`${o} > * {
  display: none;
}`];for(let t of a)r.push(`:root[data-spro-tema-ativo] #infraMenu a#${t.id} > svg.iconMenuPro {
  -webkit-mask-image: ${X(fo(t.icone))};
}`);return r.join(`
`)}var ta={claro:{"--spro-fundo":"#ffffff","--spro-fundo-2":"#f6f7f9","--spro-fundo-3":"#eceef2","--spro-pagina":"#f3f4f7","--spro-texto":"#1b1f24","--spro-suave":"#5d6772","--spro-fraco":"#8b939c","--spro-borda":"#e3e6eb","--spro-borda-forte":"#cfd4db","--spro-perigo":"#d1352b","--spro-aviso":"#b45c0a","--spro-ok":"#12805c","--spro-tom-azul":"#2563eb","--spro-tom-verde":"#12805c","--spro-tom-ambar":"#b45c0a","--spro-tom-laranja":"#c2410c","--spro-tom-roxo":"#6d4fd8","--spro-tom-rosa":"#be2f78","--spro-tom-ciano":"#0e7490","--spro-sombra-1":"0 1px 2px rgb(16 24 40 / 6%)","--spro-sombra-2":"0 2px 4px -2px rgb(16 24 40 / 8%), 0 6px 14px -4px rgb(16 24 40 / 12%)","--spro-sombra-3":"0 10px 24px -6px rgb(16 24 40 / 18%), 0 24px 56px -12px rgb(16 24 40 / 24%)","--spro-veu":"rgb(17 21 28 / 46%)"},escuro:{"--spro-fundo":"#1a1d21","--spro-fundo-2":"#22262b","--spro-fundo-3":"#2b3036","--spro-pagina":"#141619","--spro-texto":"#e7e9ec","--spro-suave":"#a4abb3","--spro-fraco":"#767e87","--spro-borda":"#2f343a","--spro-borda-forte":"#3d434a","--spro-perigo":"#ff7d73","--spro-aviso":"#e8b04a","--spro-ok":"#4fcf96","--spro-tom-azul":"#7aa8ff","--spro-tom-verde":"#4fcf96","--spro-tom-ambar":"#e8b04a","--spro-tom-laranja":"#fb923c","--spro-tom-roxo":"#ab98ff","--spro-tom-rosa":"#f58bbd","--spro-tom-ciano":"#5fd3e6","--spro-sombra-1":"0 1px 2px rgb(0 0 0 / 30%)","--spro-sombra-2":"0 2px 4px -2px rgb(0 0 0 / 40%), 0 6px 14px -4px rgb(0 0 0 / 45%)","--spro-sombra-3":"0 10px 24px -6px rgb(0 0 0 / 50%), 0 24px 56px -12px rgb(0 0 0 / 60%)","--spro-veu":"rgb(0 0 0 / 58%)"}},ea={claro:"#ffffff",escuro:"#0a1526"};function Q(a,o){let r=N(a.corBarra,o);return{...ta[o],"--spro-barra":r.barra,"--spro-barra-texto":r.texto,"--spro-barra-hover":r.hover,"--spro-barra-borda":r.borda,"--spro-menu":r.menu,"--spro-menu-texto":"#f2f4f7","--spro-destaque":r.destaque,"--spro-destaque-texto":ea[o],"--spro-destaque-suave":"color-mix(in srgb, var(--spro-destaque) 12%, transparent)","--spro-destaque-medio":"color-mix(in srgb, var(--spro-destaque) 22%, transparent)","--spro-anel":"0 0 0 3px color-mix(in srgb, var(--spro-destaque) 30%, transparent)","--spro-raio-p":"6px","--spro-raio":"8px","--spro-raio-g":"12px","--spro-raio-xg":"16px","--spro-fonte":'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',"--spro-dur":"150ms"}}function xo(a,o,r=""){return`:root[data-spro-tema-ativo] {
${Object.entries(Q(a,o)).map(([e,s])=>`  ${e}: ${s};`).join(`
`)}
  color-scheme: ${o==="escuro"?"dark":"light"};
}
${r}`}var Mo="data-spro-tema",ko="data-spro-tema-ativo",K="data-spro-tema-estilo";function Ao(a,o,r,t){if(!o.ativo){sa(a);return}let e=O(o,r),s=a.documentElement;if(!s)return;let n=a.querySelector(`style[${K}]`);n||(n=a.createElement("style"),n.setAttribute(K,""),(a.head??s).appendChild(n));let p=xo(o,e,t);n.textContent!==p&&(n.textContent=p),s.setAttribute(ko,""),s.setAttribute(Mo,e),s.style.colorScheme=e==="escuro"?"dark":"light"}function sa(a){for(let r of a.querySelectorAll(`style[${K}]`))r.remove();let o=a.documentElement;o&&(o.removeAttribute(ko),o.removeAttribute(Mo),o.style.removeProperty("color-scheme"),o.getAttribute("style")||o.removeAttribute("style"))}function yo(a){try{let o=a.getItem(H);return o?S(o):null}catch{return null}}function Eo(a,o){try{a.setItem(H,JSON.stringify(o))}catch{}}var _="data-spro-dica",ia="data-spro-dica-caixa",na=["#divInfraBarraSistemaPadrao","div.barraBotoesSEI","#divArvoreAcoes","#infraMenu","#divInfraAreaTelaE","#divArvore"],da=na.map(a=>`${a} [title]`).join(","),pa=250,ca=a=>a.closest('[onmouseover*="infraTooltipMostrar"]')!==null;function So(a){let o=0;for(let r of a.querySelectorAll(da)){let t=(r.getAttribute("title")??"").trim();r.removeAttribute("title"),!(!t||/^(input|textarea|select)$/i.test(r.tagName))&&(r.setAttribute(_,t),!r.getAttribute("aria-label")&&!(r.textContent??"").trim()&&r.setAttribute("aria-label",t),o++)}return o}function la(a){for(let o of a.querySelectorAll(`[${_}]`))o.setAttribute("title",o.getAttribute(_)??""),o.removeAttribute(_)}function Io(a){let o=a.defaultView,r=null,t,e=()=>{clearTimeout(t),r?.remove(),r=null},s=c=>{let i=c.getAttribute(_);if(!i||!a.body)return;e(),r=a.createElement("div"),r.setAttribute(ia,""),r.setAttribute("role","tooltip"),r.textContent=i,a.body.appendChild(r);let l=c.getBoundingClientRect(),f=r.getBoundingClientRect(),m=o?.innerWidth??1200,h=Math.min(Math.max(8,l.left+l.width/2-f.width/2),Math.max(8,m-f.width-8)),E=l.bottom+8,g=E+f.height<(o?.innerHeight??800)-4;r.style.left=`${Math.round(h)}px`,r.style.top=`${Math.round(g?E:Math.max(4,l.top-f.height-8))}px`},n=c=>{let i=c.target?.closest?.(`[${_}]`);!i||ca(i)||(clearTimeout(t),t=setTimeout(()=>s(i),pa))},p=c=>{c.target?.closest?.(`[${_}]`)&&e()};So(a),a.addEventListener("mouseover",n,!0),a.addEventListener("mouseout",p,!0),a.addEventListener("mousedown",e,!0),a.addEventListener("scroll",e,!0);let u=o?.MutationObserver??globalThis.MutationObserver,v=null;return typeof u=="function"&&a.documentElement&&(v=new u(c=>{let i=!1;for(let l of c)(l.type==="childList"&&l.addedNodes.length>0||l.type==="attributes"&&l.attributeName==="title")&&(i=!0);i&&So(a)}),v.observe(a.documentElement,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["title"]})),()=>{v?.disconnect(),a.removeEventListener("mouseover",n,!0),a.removeEventListener("mouseout",p,!0),a.removeEventListener("mousedown",e,!0),a.removeEventListener("scroll",e,!0),e(),la(a)}}var Y="#1a1d21",ua="#e7e9ec",va=B(Y).l,wo={black:"#000000",white:"#ffffff",red:"#ff0000",blue:"#0000ff",green:"#008000",lime:"#00ff00",yellow:"#ffff00",orange:"#ffa500",purple:"#800080",gray:"#808080",grey:"#808080",silver:"#c0c0c0",navy:"#000080",maroon:"#800000",teal:"#008080",aqua:"#00ffff",cyan:"#00ffff",fuchsia:"#ff00ff",magenta:"#ff00ff",olive:"#808000",brown:"#a52a2a",pink:"#ffc0cb"};function ma(a){let o=a.trim().toLowerCase();if(!o||o==="transparent"||o==="inherit"||o==="initial"||o==="unset"||o==="currentcolor")return null;if(wo[o])return wo[o];if(o.startsWith("#"))return A(o)?$(A(o)):null;let r=/^rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)(?:[,\s/]+([\d.]+%?))?\s*\)$/.exec(o);if(!r||!((r[4]===void 0?1:r[4].endsWith("%")?Number.parseFloat(r[4])/100:Number.parseFloat(r[4]))>0))return null;let e=[r[1],r[2],r[3]].map(s=>Number(s));return e.some(s=>!Number.isFinite(s)||s<0||s>255)?null:$(e)}function J(a,o){let r=ma(a);if(!r)return null;let{l:t,c:e,h:s}=B(r),n=e<.02;if(o==="texto"){if(n&&(t<.3||t>.9))return ua;let u=t>=.75?Math.max(.85,t):.62+(1-t)*.33,v=k({l:u,c:e,h:s});for(let c=0;c<40&&q(v,Y)<4.5;c++)u+=.01,v=k({l:u,c:e,h:s});return v}if(n&&t>.97)return Y;let p=Math.min(.36,va+(1-t)*.16+Math.min(e,.2)*.8);return k({l:p,c:e,h:s})}var L="data-spro-adaptado",P="data-spro-original",Z="--spro-doc-texto",oo="--spro-doc-fundo",W="data-spro-tema-doc",w="data-spro-ver-original",ba=400,To="[style],[bgcolor],[color],font,td,th,table",fa=new Set(["IMG","CANVAS","SVG","IFRAME","EMBED","OBJECT","VIDEO","SCRIPT","STYLE","LINK"]),ha=`
:root[data-spro-tema="escuro"]:not([${P}]) [${L}~="t"] { color: var(${Z}) !important; }
:root[data-spro-tema="escuro"]:not([${P}]) [${L}~="f"] { background-color: var(${oo}) !important; }
:root[${P}] body { background: #fff; color: #000; }
[${w}] { position: fixed; bottom: 12px; left: 12px; z-index: 2147483000; padding: 4px 10px;
  font: 12px/1.4 var(--spro-fonte, system-ui, sans-serif); color: var(--spro-texto); background: var(--spro-fundo);
  border: 1px solid var(--spro-borda-forte); border-radius: var(--spro-raio, 8px); cursor: pointer; box-shadow: var(--spro-sombra-2); }
[${w}]:hover { background: var(--spro-destaque); color: var(--spro-destaque-texto); }
[${w}][aria-pressed="true"] { outline: 2px solid var(--spro-destaque); }
`;function ga(a,o,r){let t=a.style;return t?.getPropertyValue?.(o)||(o==="background-color"?t?.getPropertyValue?.("background"):"")||""||a.getAttribute(r)||""}function Co(a,o){let e=ga(a,o==="texto"?"color":"background-color",o==="texto"?"color":"bgcolor");if(e)return e;if(o==="fundo"&&/^(TD|TH|TABLE)$/.test(a.tagName))try{return a.ownerDocument.defaultView?.getComputedStyle(a).backgroundColor??""}catch{return""}return""}function xa(a,o){if(fa.has(a.tagName.toUpperCase())||a.closest?.(`[${w}]`))return;let r="",t=()=>{o.has(a)||o.set(a,a.getAttribute("style"))},e=J(Co(a,"texto"),"texto");e&&(t(),a.style.setProperty(Z,e),r+="t");let s=J(Co(a,"fundo"),"fundo");s&&(t(),a.style.setProperty(oo,s),r+="f"),r&&a.setAttribute(L,r)}function Ma(a){for(let o of[a,...a.querySelectorAll(`[${L}]`)]){if(!o.hasAttribute(L))continue;o.removeAttribute(L);let r=o.style;r.removeProperty(Z),r.removeProperty(oo),o.getAttribute("style")||o.removeAttribute("style")}}function _o(a){let o=globalThis;typeof o.requestIdleCallback=="function"?o.requestIdleCallback(a):setTimeout(a,0)}function Po(a,o={}){let r=(o.raizes??["body"]).flatMap(i=>[...a.querySelectorAll(i)]);if(r.length===0)return()=>{};if(!a.querySelector(`style[${W}]`)){let i=a.createElement("style");i.setAttribute(W,""),i.textContent=ha,(a.head??a.documentElement).appendChild(i)}let t=new WeakSet,e=new Map,s=[],n=!1,p=!0,u=()=>{if(n=!1,!!p){for(let i of s.splice(0,ba))t.has(i)||(t.add(i),xa(i,e));s.length>0&&(n=!0,_o(u))}},v=i=>{if(i.nodeType===1){i.matches?.(To)&&s.push(i);for(let l of i.querySelectorAll?.(To)??[])s.push(l);!n&&s.length>0&&(n=!0,_o(u))}};for(let i of r)v(i);let c=null;if(typeof MutationObserver=="function"){c=new MutationObserver(i=>{for(let l of i)if(l.type==="childList")for(let f of l.addedNodes)v(f);else l.type==="attributes"&&l.target.nodeType===1&&(t.delete(l.target),v(l.target))});for(let i of r)c.observe(i,{childList:!0,subtree:!0})}return o.botao&&Aa(a),()=>{p=!1,c?.disconnect(),s=[],Ma(a.documentElement);for(let[i,l]of e)l===null?i.removeAttribute("style"):i.setAttribute("style",l);e.clear();for(let i of a.querySelectorAll(`style[${W}], [${w}]`))i.remove();a.documentElement.removeAttribute(P)}}function ka(a){let o=a.documentElement,r=!o.hasAttribute(P);return r?o.setAttribute(P,""):o.removeAttribute(P),a.querySelector(`[${w}]`)?.setAttribute("aria-pressed",String(r)),r}function Aa(a){if(a.querySelector(`[${w}]`)||!a.body)return;let o=a.createElement("button");o.type="button",o.setAttribute(w,""),o.setAttribute("aria-pressed","false"),o.title="Mostra o documento com as cores originais, como ser\xE1 assinado",o.textContent="Ver original",o.addEventListener("click",()=>ka(a)),a.body.appendChild(o)}var ya=[{id:"claro",rotulo:"Claro"},{id:"escuro",rotulo:"Escuro"},{id:"auto",rotulo:"Autom\xE1tico"}],Oo=`
.spro-ap-corpo{display:grid;gap:0}
.spro-ap-linha{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:12px;align-items:center;padding:14px 20px;border-top:1px solid var(--linha)}
.spro-ap-linha:first-child{border-top:0}
.spro-ap-rotulo{display:grid;gap:2px;line-height:1.35}
.spro-ap-dica{font-size:13px;color:var(--tinta-2)}
.spro-ap-selo{padding:2px 10px;border-radius:999px;background:var(--azul-claro);color:var(--azul);font-size:12px;font-weight:600}
.spro-ap-seg{display:inline-flex;border:1px solid var(--linha);border-radius:10px;overflow:hidden}
.spro-ap-seg button{min-height:38px;padding:0 14px;border:0;background:var(--superficie);color:var(--tinta);font:600 14px var(--texto);cursor:pointer}
.spro-ap-seg button+button{border-left:1px solid var(--linha)}
.spro-ap-seg button[aria-checked="true"]{background:var(--azul);color:var(--sobre-azul)}
.spro-ap-cores{display:grid;gap:10px;padding:14px 20px;border-top:1px solid var(--linha)}
.spro-ap-grade{display:flex;flex-wrap:wrap;gap:8px}
.spro-ap-cor{display:inline-flex;align-items:center;gap:8px;min-height:38px;padding:0 12px 0 8px;border:1px solid var(--linha);border-radius:10px;background:var(--superficie);color:var(--tinta);font:600 13px var(--texto);cursor:pointer}
.spro-ap-cor i{width:20px;height:20px;border-radius:6px;border:1px solid rgb(0 0 0/20%)}
.spro-ap-cor[aria-pressed="true"]{border-color:var(--azul);box-shadow:0 0 0 2px var(--azul-claro)}
.spro-ap-livre{display:flex;align-items:center;gap:10px;flex-wrap:wrap}
.spro-ap-livre input[type=color]{width:44px;height:38px;padding:2px;border:1px solid var(--linha);border-radius:8px;background:var(--superficie);cursor:pointer}
.spro-ap-aviso{font-size:13px;color:var(--tinta-2);min-height:1.2em}
.spro-ap-previa{margin:0 20px 16px;border:1px solid var(--spro-borda);border-radius:var(--spro-raio-g);overflow:hidden;background:var(--spro-pagina);color:var(--spro-texto);font-family:var(--spro-fonte)}
.spro-ap-previa-barra{display:flex;align-items:center;gap:10px;padding:10px 14px;background:var(--spro-barra);color:var(--spro-barra-texto);font-weight:600;border-bottom:1px solid var(--spro-barra-borda)}
.spro-ap-previa-barra span{padding:2px 8px;border-radius:6px;background:var(--spro-barra-hover);font-weight:500;font-size:12px}
.spro-ap-previa-corpo{padding:14px;display:grid;gap:10px}
.spro-ap-previa-tab{width:100%;border-collapse:collapse;font-size:13px;background:var(--spro-fundo);border:1px solid var(--spro-borda);border-radius:var(--spro-raio);overflow:hidden}
.spro-ap-previa-tab th{padding:6px 10px;text-align:left;background:var(--spro-fundo-3)}
.spro-ap-previa-tab td{padding:6px 10px;border-top:1px solid var(--spro-borda)}
.spro-ap-previa-tab tr:nth-child(even) td{background:var(--spro-fundo-2)}
.spro-ap-previa a{color:var(--spro-destaque)}
.spro-ap-previa-botoes{display:flex;gap:8px;align-items:center}
.spro-ap-previa button{min-height:34px;padding:0 14px;border-radius:var(--spro-raio);font:600 13px var(--spro-fonte)}
.spro-ap-previa .p{background:var(--spro-destaque);color:var(--spro-destaque-texto);border:1px solid var(--spro-destaque)}
.spro-ap-previa .s{background:var(--spro-fundo);color:var(--spro-texto);border:1px solid var(--spro-borda-forte)}
.spro-ap-rodape{display:flex;gap:8px;flex-wrap:wrap;padding:0 20px 16px}
`;function qo(a,o,r){let t=d("input",{type:"checkbox",role:"switch","aria-label":o});return t.checked=a,t.addEventListener("change",()=>r(t.checked)),d("label",{class:"chave"},t,d("span",{class:"trilho"}))}async function Lo(a){let o=S(await a.ler()),r=d("div",{class:"spro-ap-previa","aria-hidden":"true"},d("div",{class:"spro-ap-previa-barra"},"SEI",d("span",{},"Controle de Processos")),d("div",{class:"spro-ap-previa-corpo"},d("table",{class:"spro-ap-previa-tab"},d("tr",{},d("th",{},"Processo"),d("th",{},"Tipo")),d("tr",{},d("td",{},d("a",{href:"#"},"00000.000000/2026-00")),d("td",{},"Of\xEDcio")),d("tr",{},d("td",{},"00000.000001/2026-11"),d("td",{},"Parecer"))),d("div",{class:"spro-ap-previa-botoes"},d("button",{type:"button",class:"p"},"Salvar"),d("button",{type:"button",class:"s"},"Cancelar")))),t=d("div",{class:"spro-ap-aviso",role:"status"}),e=d("div",{class:"spro-ap-seg",role:"radiogroup","aria-label":"Modo do tema"}),s=d("div",{class:"spro-ap-grade"}),n=d("input",{type:"color","aria-label":"Cor livre da barra"}),p=d("code",{},""),u=d("div",{class:"spro-ap-corpo"}),v=()=>{let m=O(o,a.sistemaEscuro());for(let[g,No]of Object.entries(Q(o,m)))r.style.setProperty(g,No);for(let g of e.querySelectorAll("button"))g.setAttribute("aria-checked",String(g.dataset.modo===o.modo));for(let g of s.querySelectorAll("button"))g.setAttribute("aria-pressed",String(g.dataset.paleta===o.paleta));n.value=o.corBarra,p.textContent=o.corBarra;let h=N(o.corBarra,"claro"),E=A(h.barra)&&h.barra.toLowerCase()!==o.corBarra.toLowerCase();t.textContent=E?"Ajustamos o tom para manter o texto leg\xEDvel.":"",u.toggleAttribute("data-inativo",!o.ativo)},c=async m=>{o=S({...o,...m}),v(),await a.gravar(o)};for(let m of ya){let h=d("button",{type:"button",role:"radio","data-modo":m.id,onclick:()=>void c({modo:m.id})},m.rotulo);e.append(h)}for(let m of D)s.append(d("button",{type:"button",class:"spro-ap-cor","data-paleta":m.id,"aria-pressed":"false",onclick:()=>void c({paleta:m.id,corBarra:m.cor})},d("i",{style:`background:${m.cor}`}),m.nome));n.addEventListener("input",()=>void c({paleta:"livre",corBarra:n.value}));let i=(m,h,E)=>d("div",{class:"spro-ap-linha"},d("div",{class:"spro-ap-rotulo"},d("strong",{},m),d("span",{class:"spro-ap-dica"},h)),E),l=d("button",{type:"button",class:"btn btn-secundario",onclick:()=>void c({...T,ativo:o.ativo})},"Restaurar padr\xE3o");u.append(i("Modo","Autom\xE1tico segue o tema do seu sistema operacional.",e),d("div",{class:"spro-ap-cores"},d("strong",{},"Cor da barra superior"),s,d("div",{class:"spro-ap-livre"},"Outra cor:",n,p),t),i("Escurecer o conte\xFAdo dos documentos","No modo escuro, o texto dos documentos \xE9 adaptado e h\xE1 um bot\xE3o \u201CVer original\u201D para conferir antes de assinar.",qo(o.escurecerDocumentos,"Escurecer o conte\xFAdo dos documentos",m=>void c({escurecerDocumentos:m}))),r,d("div",{class:"spro-ap-rodape"},l));let f=d("div",{class:"secao-corpo"},i("Ativar o Estilo Avan\xE7ado","Visual novo do SEI, no mesmo estilo das telas do SEI Pro. As mudan\xE7as valem na hora, sem precisar salvar.",qo(o.ativo,"Ativar o Estilo Avan\xE7ado",m=>void c({ativo:m}))),u);return v(),{conteudo:f,atualizar:m=>{o=S(m),v();let h=f.querySelectorAll('input[role="switch"]');h[0]&&(h[0].checked=o.ativo),h[1]&&(h[1].checked=o.escurecerDocumentos)}}}var zo="spro-estilo2-modal",Ea={claro:"--linha:#e3e6eb;--tinta:#1f2328;--tinta-2:#5b6470;--superficie:#fff;--azul:#1f5fbf;--azul-claro:#e8f0fb;--sobre-azul:#fff;--fundo-modal:#fff;--sombra:0 24px 64px rgb(0 0 0/28%)",escuro:"--linha:#2f343a;--tinta:#e8eaed;--tinta-2:#9aa0a8;--superficie:#1a1d21;--azul:#5f9dff;--azul-claro:#1d2635;--sobre-azul:#0b1220;--fundo-modal:#141619;--sombra:0 24px 64px rgb(0 0 0/60%)"},Sa=`
:host{all:initial}
.fundo{position:fixed;inset:0;z-index:2147483600;display:grid;place-items:center;padding:16px;background:rgb(10 12 16/55%);font:14px/1.45 system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;color:var(--tinta);animation:entra .14s ease-out}
@keyframes entra{from{opacity:0}}
.caixa{width:min(680px,100%);max-height:calc(100vh - 32px);display:flex;flex-direction:column;border:1px solid var(--linha);border-radius:16px;background:var(--fundo-modal);box-shadow:var(--sombra);overflow:hidden}
.topo{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:16px 20px;border-bottom:1px solid var(--linha)}
.topo h2{margin:0;font-size:17px;font-weight:700}
.fechar{display:grid;place-items:center;width:36px;height:36px;border:0;border-radius:10px;background:transparent;color:var(--tinta-2);font-size:22px;line-height:1;cursor:pointer}
.fechar:hover{background:var(--azul-claro);color:var(--tinta)}
.corpo{overflow:auto}
.chave{position:relative;display:inline-block;width:44px;height:26px;cursor:pointer}
.chave input{position:absolute;inset:0;width:100%;height:100%;margin:0;opacity:0;cursor:pointer}
.trilho{position:absolute;inset:0;border-radius:999px;background:var(--linha);transition:background .15s}
.trilho::after{content:"";position:absolute;top:3px;left:3px;width:20px;height:20px;border-radius:50%;background:#fff;box-shadow:0 1px 3px rgb(0 0 0/30%);transition:transform .15s}
.chave input:checked+.trilho{background:var(--azul)}
.chave input:checked+.trilho::after{transform:translateX(18px)}
.chave input:focus-visible+.trilho{outline:2px solid var(--azul);outline-offset:2px}
.btn{min-height:38px;padding:0 14px;border:1px solid var(--linha);border-radius:10px;background:var(--superficie);color:var(--tinta);font:600 14px system-ui,sans-serif;cursor:pointer}
.btn:hover{border-color:var(--azul)}
.secao-corpo{display:block}
[data-inativo]{opacity:.5;pointer-events:none}
button:focus-visible{outline:2px solid var(--azul);outline-offset:2px}
`;async function Bo(a,o){a.getElementById(zo)?.remove();let r=a.documentElement.getAttribute("data-spro-tema")==="escuro"||!a.documentElement.hasAttribute("data-spro-tema")&&o.sistemaEscuro(),t=a.createElement("div");t.id=zo;let e=t.attachShadow({mode:"open"}),{conteudo:s,atualizar:n}=await Lo(o),p=()=>{a.removeEventListener("keydown",u,!0),chrome.storage.onChanged.removeListener(v),t.remove()},u=l=>{l.key==="Escape"&&(l.stopPropagation(),p())},v=(l,f)=>{f==="sync"&&l[M]&&n(l[M].newValue)};chrome.storage.onChanged.addListener(v),a.addEventListener("keydown",u,!0);let c=d("div",{class:"caixa",role:"dialog","aria-modal":"true","aria-label":"Apar\xEAncia do SEI"},d("div",{class:"topo"},d("h2",{},"Apar\xEAncia do SEI"),d("button",{type:"button",class:"fechar","aria-label":"Fechar",onclick:p},"\xD7")),d("div",{class:"corpo"},s)),i=d("div",{class:"fundo"},c);return i.addEventListener("mousedown",l=>{l.target===i&&p()}),e.append(d("style",{},`:host{${Ea[r?"escuro":"claro"]}}${Sa}${Oo}`),i),(a.body??a.documentElement).append(t),c.querySelector(".fechar")?.focus(),p}var F="data-spro-nav-compacta",Ia="#divInfraAreaTelaD";function Ro(a){let o=a.documentElement,r=null,t=!0,e=()=>{if(!r)return;let n=r.scrollTop,p=r.scrollHeight-r.clientHeight,u=o.hasAttribute(F);!u&&n>24&&p>54?o.setAttribute(F,""):u&&n<=4&&o.removeAttribute(F)},s=()=>{t&&(r=a.querySelector(Ia),!(!r||!a.querySelector("#navInfraBarraNavegacao"))&&r.addEventListener("scroll",e,{passive:!0}))};return a.readyState==="loading"?a.addEventListener("DOMContentLoaded",s,{once:!0}):s(),()=>{t=!1,r?.removeEventListener("scroll",e),o.removeAttribute(F)}}var R="data-spro-altura";var wa='div.infraAreaDados[style*="height"]';function Ta(a){try{return a.ownerDocument.defaultView?.getComputedStyle(a).position==="absolute"}catch{return!1}}function Ca(a,o=Ta,r=t=>t.getBoundingClientRect().height){let t=0;for(let e of a.querySelectorAll(wa)){if(e.hasAttribute(R))continue;let s=[...e.querySelectorAll(":scope > label, :scope > input, :scope > select, :scope > textarea")];if(s.length===0||!s.some(o))continue;let n=r(e);n>0&&(e.setAttribute(R,e.style.height),e.style.height=`${Math.round(n*1.3)}px`,t++)}return t}function _a(a){for(let o of a.querySelectorAll(`[${R}]`)){let r=o.getAttribute(R)??"";r?o.style.height=r:o.style.removeProperty("height"),o.removeAttribute(R),o.getAttribute("style")||o.removeAttribute("style")}}function Do(a){let o=()=>void Ca(a);a.readyState==="loading"?a.addEventListener("DOMContentLoaded",o,{once:!0}):o();let r=a.defaultView;return r?.addEventListener("load",o,{once:!0}),()=>{a.removeEventListener("DOMContentLoaded",o),r?.removeEventListener("load",o),_a(a)}}var Pa=`${ho()}
${go()}`,$o=window;if(!$o.__seiProEstilo2){$o.__seiProEstilo2=!0,document.documentElement.setAttribute("data-spro-estilo2","");try{localStorage.removeItem("seiSlim")}catch{}let a=typeof matchMedia=="function"?matchMedia("(prefers-color-scheme: dark)"):null,o=null,r=/[?&]acao=(documento_visualizar|documento_imprimir_web)\b/.test(location.search),t=null,e=null,s=null,n=null,p=()=>{let i=document.getElementById("changeSlimPro");i&&o&&(i.checked=o.ativo)},u=()=>{if(!o)return;p();let i=a?.matches??!1;Ao(document,o,i,`${io}
${no}
${po}
${Pa}`),r&&o.ativo?document.documentElement.setAttribute("data-spro-papel",""):document.documentElement.removeAttribute("data-spro-papel");let l=r&&o.ativo&&o.escurecerDocumentos&&O(o,i)==="escuro";if(o.ativo&&!s?s=Do(document):!o.ativo&&s&&(s(),s=null),o.ativo&&!n?n=Ro(document):!o.ativo&&n&&(n(),n=null),o.ativo&&!e){let f=()=>{e!==null&&(e=Io(document))};e=()=>{},document.readyState==="loading"?document.addEventListener("DOMContentLoaded",f,{once:!0}):f()}else!o.ativo&&e&&(e(),e=null);if(l&&!t){let f=()=>{t!==null&&(t=Po(document,{botao:!0}))};t=()=>{},document.readyState==="loading"?document.addEventListener("DOMContentLoaded",f,{once:!0}):f()}else!l&&t&&(t(),t=null)};o=yo(localStorage),u(),a?.addEventListener("change",u);let v=i=>{o=S(i),Eo(localStorage,o),u()};chrome.storage.sync.get(M).then(i=>v(i[M])).catch(i=>console.warn("[SEI Pro] estilo avancado 2:",i));let c={ler:async()=>(await chrome.storage.sync.get(M))[M],gravar:async i=>{await chrome.storage.sync.set({[M]:i})},sistemaEscuro:()=>a?.matches??!1};document.addEventListener("spro-estilo2-alternar",()=>{let i=S(o);c.gravar({...i,ativo:!i.ativo}),v({...i,ativo:!i.ativo})}),document.addEventListener("spro-estilo2-paleta",()=>void Bo(document,c)),window.addEventListener("load",()=>setTimeout(p,1500)),chrome.storage.onChanged.addListener((i,l)=>{l==="sync"&&i[M]&&v(i[M].newValue)})}})();
