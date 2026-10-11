/* GERADO por favoritos/build.mjs. NAO EDITE ESTE ARQUIVO. Rode: npm run build */
"use strict";(()=>{function aa(e){let o={};for(let[t,r]of Object.entries(e)){let a={};r&&"newValue"in r&&(a.novo=r.newValue),r&&"oldValue"in r&&(a.antigo=r.oldValue),o[t]=a}return o}function jo(e,o){return{obter:(t=null)=>e.get(t),gravar:t=>e.set(t),remover:t=>e.remove(t),chaves:typeof e.getKeys=="function"?()=>e.getKeys():void 0,aoMudar(t){let r=(a,n)=>{n===o&&t(aa(a))};return chrome.storage.onChanged.addListener(r),()=>chrome.storage.onChanged.removeListener(r)}}}function po(e=crypto){if(typeof e.randomUUID=="function")return e.randomUUID();let o=e.getRandomValues(new Uint8Array(16));o[6]=(o[6]??0)&15|64,o[8]=(o[8]??0)&63|128;let t=[...o].map(r=>r.toString(16).padStart(2,"0")).join("");return`${t.slice(0,8)}-${t.slice(8,12)}-${t.slice(12,16)}-${t.slice(16,20)}-${t.slice(20)}`}async function xe(e,o="seipro/dispositivo"){let t=(await e.obter(o))[o];if(typeof t=="string"&&t)return t;let r=po();return await e.gravar({[o]:r}),r}var ye=e=>String(e).padStart(2,"0");function mo(e=new Date){return`${e.getFullYear()}-${ye(e.getMonth()+1)}-${ye(e.getDate())}`}function na(e){let o=/^(\d{4})-(\d{2})-(\d{2})$/.exec(e);if(!o)throw new Error(`Data inv\xE1lida: ${e}`);return new Date(Number(o[1]),Number(o[2])-1,Number(o[3]),12)}function fo(e,o){let t=na(e);return t.setDate(t.getDate()+o),mo(t)}function Eo(e){let[o,t,r]=e.split("-");return`${r}/${t}/${o}`}function ia(e,o){let t=e;if(typeof e=="string"){if(!e.trim())return;try{t=JSON.parse(e)}catch{return}}return!Array.isArray(t)||t.length===0?void 0:t.map(a=>a?.configGeral).find(Array.isArray)?.find(a=>a?.name===o)?.value}function sa(e,o){let t=ia(e,o);return!(t===!1||t===0||t==="")}async function Ae(e,o=chrome.storage.sync){let t=await o.get("dataValues");return sa(t.dataValues,e)}function Go(e){try{return!!e.getItem("darkModePro")}catch{return!1}}function Xo(e){let o=e.defaultView;for(let t of[".infraCorBarraSistema","#divInfraBarraSistema","#divInfraBarraSistemaE"]){let r=e.querySelector(t);if(r)try{let a=Pe(o?.getComputedStyle?.(r).backgroundColor??"");if(a)return a}catch{}}}function we(e){let o=/^#?([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})/i.exec(e);if(!o)return"#1f2328";let[t,r,a]=[o[1],o[2],o[3]].map(n=>Number.parseInt(n??"0",16));return(t*299+r*587+a*114)/1e3>140?"#1f2328":"#ffffff"}function Pe(e){let o=e.trim().toLowerCase(),t=null,r=/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/.exec(o);r&&(t=[r[1],r[2],r[3]].map(m=>Number.parseInt(m??"0",16)));let a=/^rgba?\(\s*(\d+)[,\s]+(\d+)[,\s]+(\d+)(?:[,\s/]+([\d.]+%?))?\s*\)$/.exec(o);if(a){if((a[4]===void 0?1:a[4].endsWith("%")?Number.parseFloat(a[4])/100:Number.parseFloat(a[4]))<.9)return null;t=[a[1],a[2],a[3]].map(d=>Number(d))}if(!t||t.some(m=>!Number.isFinite(m)||m<0||m>255))return null;let[n,i,s]=t,c=Math.max(n,i,s),l=Math.min(n,i,s);if(c===0||(c-l)/c<.25)return null;let u=[n,i,s];for(let m=0;m<12&&we(Ee(u))!=="#ffffff";m++)u=u.map(d=>Math.round(d*.88));return Ee(u)}function Ee(e){return`#${e.map(o=>o.toString(16).padStart(2,"0")).join("")}`}var L=class extends Error{constructor(t,r){super(r);this.codigo=t;this.name="ErroRpc"}};function wo(e,o={}){let t=0,r=!0,a=new Map,n=[],i=()=>{if(r){r=!1;for(let[,c]of a)clearTimeout(c.timer),c.erro(new L("DESCONECTADO","A conex\xE3o com a aba do SEI caiu."));a.clear();for(let c of n)c()}},s=c=>{r&&e.postMessage(c)};return e.onMessage.addListener(c=>{let l=c;if(l?.rpc==="resposta"&&typeof l.id=="number"){let d=a.get(l.id);if(!d)return;a.delete(l.id),clearTimeout(d.timer),l.ok?d.ok(l.valor):d.erro(new L(l.erro?.codigo??"ERRO",l.erro?.mensagem??"Falha."));return}if(l?.rpc!=="pedido"||typeof l.id!="number"||typeof l.op!="string")return;let u=l.id,m=l.op;(async()=>{try{let d=o[m];if(!d)throw new L("OP_DESCONHECIDA",`Opera\xE7\xE3o desconhecida: ${m}`);s({rpc:"resposta",id:u,ok:!0,valor:await d(l.args)})}catch(d){let p=d.codigo;s({rpc:"resposta",id:u,ok:!1,erro:{codigo:typeof p=="string"?p:"ERRO",mensagem:d instanceof Error?d.message:String(d)}})}})()}),e.onDisconnect.addListener(i),{get aberta(){return r},chamar(c,l,u=15e3){if(!r)return Promise.reject(new L("DESCONECTADO","A conex\xE3o com a aba do SEI caiu."));let m=++t;return new Promise((d,p)=>{let f=setTimeout(()=>{a.delete(m),p(new L("PRAZO",`A aba do SEI n\xE3o respondeu a tempo (${c}).`))},u);a.set(m,{ok:d,erro:p,timer:f}),e.postMessage({rpc:"pedido",id:m,op:c,args:l})})},aoFechar(c){n.push(c)},fechar(){r&&(e.disconnect(),i())}}}function v(e,o={},...t){let r=document.createElement(e);for(let[a,n]of Object.entries(o))n===void 0||n===!1||(typeof n=="function"?r.addEventListener(a.replace(/^on/,""),n):n===!0?r.setAttribute(a,""):a==="class"?r.className=n:a==="value"&&e==="textarea"?r.value=n:r.setAttribute(a,n));for(let a of t)a!=null&&a!==!1&&r.append(a);return r}var V={fill:"currentColor",stroke:"none"},Se="M12 3.2l2.7 5.5 6 .9-4.35 4.25 1 6L12 17l-5.35 2.85 1-6L3.3 9.6l6-.9z",Te={estrela:[["path",{d:Se}]],estrelaCheia:[["path",{d:Se,fill:"currentColor"}]],alvo:[["circle",{cx:"12",cy:"12",r:"7.5"}],["circle",{cx:"12",cy:"12",r:"3.2"}]],alvoAtivo:[["circle",{cx:"12",cy:"12",r:"6.6"}],["circle",{cx:"12",cy:"12",r:"2.4",fill:"currentColor"}],["path",{d:"M12 2.2v3.4M12 18.4v3.4M2.2 12h3.4M18.4 12h3.4"}]],pasta:[["path",{d:"M3.5 7.5a2 2 0 0 1 2-2h4l2 2h7a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2z"}]],etiqueta:[["path",{d:"M3.5 12.2V4.5a1 1 0 0 1 1-1h7.7l8.3 8.3a1 1 0 0 1 0 1.4l-7.1 7.1a1 1 0 0 1-1.4 0z"}],["circle",{cx:"8",cy:"8",r:"1.4",...V}]],relogio:[["circle",{cx:"12",cy:"12",r:"9"}],["path",{d:"M12 7.2V12l3.2 1.9"}]],nota:[["path",{d:"M6 3.5h9l3.5 3.5v13.5H6z"}],["path",{d:"M9 11h6"}],["path",{d:"M9 15h6"}]],lixeira:[["path",{d:"M4.5 6.5h15"}],["path",{d:"M9.5 6.5V4.8c0-.7.6-1.3 1.3-1.3h2.4c.7 0 1.3.6 1.3 1.3v1.7"}],["path",{d:"M6.8 6.5 7.6 19c0 .8.7 1.5 1.5 1.5h5.8c.8 0 1.5-.7 1.5-1.5l.8-12.5"}]],lapis:[["path",{d:"M17.5 3.5a2.1 2.1 0 0 1 3 3L9 18l-4.5 1.5L6 15z"}],["path",{d:"M15 6l3 3"}]],fechar:[["path",{d:"M18 6 6 18"}],["path",{d:"M6 6l12 12"}]],mais:[["path",{d:"M12 5v14"}],["path",{d:"M5 12h14"}]],busca:[["circle",{cx:"11",cy:"11",r:"6.5"}],["path",{d:"M20.5 20.5l-4.8-4.8"}]],baixar:[["path",{d:"M12 3.5v11"}],["path",{d:"M7.5 10.2 12 14.7l4.5-4.5"}],["path",{d:"M4.5 19.5h15"}]],subir:[["path",{d:"M12 14.5v-11"}],["path",{d:"M7.5 7.8 12 3.3l4.5 4.5"}],["path",{d:"M4.5 19.5h15"}]],copiar:[["rect",{x:"8.5",y:"8.5",width:"12",height:"12",rx:"2"}],["path",{d:"M15.5 8.5V5.5a2 2 0 0 0-2-2h-8a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h3"}]],restaurar:[["path",{d:"M9 14 4 9l5-5"}],["path",{d:"M4 9h9a7 7 0 0 1 7 7v4"}]],check:[["path",{d:"M20 6.5 9.2 17.3 4 12.1"}]],alerta:[["path",{d:"M10.3 4.4 2.8 17.6a2 2 0 0 0 1.7 3h15a2 2 0 0 0 1.7-3L13.7 4.4a2 2 0 0 0-3.4 0z"}],["path",{d:"M12 9.5v4"}],["circle",{cx:"12",cy:"16.8",r:"1",...V}]],menu:[["circle",{cx:"5",cy:"12",r:"1.4",...V}],["circle",{cx:"12",cy:"12",r:"1.4",...V}],["circle",{cx:"19",cy:"12",r:"1.4",...V}]],alca:[["circle",{cx:"9",cy:"6",r:"1.3",...V}],["circle",{cx:"15",cy:"6",r:"1.3",...V}],["circle",{cx:"9",cy:"12",r:"1.3",...V}],["circle",{cx:"15",cy:"12",r:"1.3",...V}],["circle",{cx:"9",cy:"18",r:"1.3",...V}],["circle",{cx:"15",cy:"18",r:"1.3",...V}]],ajustes:[["path",{d:"M4 7h5"}],["path",{d:"M13 7h7"}],["circle",{cx:"11",cy:"7",r:"2.1"}],["path",{d:"M4 17h9"}],["path",{d:"M17 17h3"}],["circle",{cx:"15",cy:"17",r:"2.1"}]],setaCima:[["path",{d:"M12 19V6"}],["path",{d:"M6 12l6-6 6 6"}]],setaBaixo:[["path",{d:"M12 5v13"}],["path",{d:"M18 12l-6 6-6-6"}]],recolher:[["path",{d:"M6 15l6-6 6 6"}]],expandir:[["path",{d:"M6 9l6 6 6-6"}]],local:[["path",{d:"M12 21s-6.5-6.1-6.5-11a6.5 6.5 0 0 1 13 0c0 4.9-6.5 11-6.5 11z"}],["circle",{cx:"12",cy:"10",r:"2.3"}]],sino:[["path",{d:"M6.5 16.5V11a5.5 5.5 0 0 1 11 0v5.5l1.5 1.5h-14z"}],["path",{d:"M10 20.5a2 2 0 0 0 4 0"}]],documento:[["path",{d:"M7 3.5h7l4 4v13H7z"}],["path",{d:"M14 3.5v4h4"}]],painel:[["rect",{x:"3.5",y:"4.5",width:"17",height:"15",rx:"2"}],["path",{d:"M14.5 4.5v15"}]],atualizar:[["path",{d:"M19.5 12a7.5 7.5 0 1 1-2.2-5.3"}],["path",{d:"M19.5 4.5v4h-4"}]],nuvem:[["path",{d:"M7 18.5h10a4 4 0 0 0 .6-7.95A5.5 5.5 0 0 0 7 9.5a4.5 4.5 0 0 0 0 9z"}]],chevron:[["path",{d:"M7 9.5l5 5 5-5"}]],pino:[["path",{d:"M9.5 3.5h5l-.8 5.2 3.3 3.1v1.7H7v-1.7l3.3-3.1z"}],["path",{d:"M12 13.5v7"}]],pinoCheio:[["path",{d:"M9.5 3.5h5l-.8 5.2 3.3 3.1v1.7H7v-1.7l3.3-3.1z",fill:"currentColor"}],["path",{d:"M12 13.5v7"}]],filtro:[["path",{d:"M4 5.5h16l-6.2 7.3v5.4l-3.6 1.8v-7.2z"}]],ordenar:[["path",{d:"M7.5 4.5v15"}],["path",{d:"M4 16l3.5 3.5L11 16"}],["path",{d:"M16.5 19.5v-15"}],["path",{d:"M13 8l3.5-3.5L20 8"}]],mapa:[["path",{d:"M9 4.5 3.5 6.6v13l5.5-2.1 6 2.1 5.5-2.1v-13L15 6.6z"}],["path",{d:"M9 4.5v13"}],["path",{d:"M15 6.6v13"}]],olho:[["path",{d:"M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z"}],["circle",{cx:"12",cy:"12",r:"2.8"}]],camadas:[["path",{d:"M12 3.5 20.5 8 12 12.5 3.5 8z"}],["path",{d:"M3.5 12 12 16.5 20.5 12"}],["path",{d:"M3.5 16 12 20.5 20.5 16"}]],historico:[["path",{d:"M3.8 12.5A8.3 8.3 0 1 0 6.2 6"}],["path",{d:"M3.8 4.2v4.3h4.3"}],["path",{d:"M12 8v4.2l2.8 1.7"}]],pessoa:[["circle",{cx:"12",cy:"8",r:"3.6"}],["path",{d:"M5 20c.9-3.7 3.6-5.6 7-5.6s6.1 1.9 7 5.6"}]],predio:[["path",{d:"M5 20.5v-15a1 1 0 0 1 1-1h7.5a1 1 0 0 1 1 1v15"}],["path",{d:"M14.5 9.5H18a1 1 0 0 1 1 1v10"}],["path",{d:"M3 20.5h18"}],["path",{d:"M8.5 8.5h3"}],["path",{d:"M8.5 12h3"}],["path",{d:"M8.5 15.5h3"}]],brilho:[["path",{d:"M12 3.5l1.9 5.1 5.1 1.9-5.1 1.9L12 17.5l-1.9-5.1L5 10.5l5.1-1.9z"}],["path",{d:"M18.5 16.5v4"}],["path",{d:"M16.5 18.5h4"}]],calendario:[["rect",{x:"4",y:"5.5",width:"16",height:"15",rx:"2"}],["path",{d:"M4 10h16"}],["path",{d:"M8.5 3.5v4"}],["path",{d:"M15.5 3.5v4"}]],cadeado:[["rect",{x:"5.5",y:"10.5",width:"13",height:"10",rx:"2"}],["path",{d:"M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5"}]],saida:[["path",{d:"M14 4.5h4.5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H14"}],["path",{d:"M10 16l4-4-4-4"}],["path",{d:"M14 12H4.5"}]],planilha:[["rect",{x:"4",y:"4",width:"16",height:"16",rx:"2"}],["path",{d:"M4 9.5h16"}],["path",{d:"M4 15h16"}],["path",{d:"M10 9.5V20"}]],mover:[["path",{d:"M4.5 12h14"}],["path",{d:"M13.5 6.5 19 12l-5.5 5.5"}]],sol:[["circle",{cx:"12",cy:"12",r:"3.8"}],["path",{d:"M12 2.8v2M12 19.2v2M2.8 12h2M19.2 12h2M5.5 5.5l1.4 1.4M17.1 17.1l1.4 1.4M5.5 18.5l1.4-1.4M17.1 6.9l1.4-1.4"}]],teclado:[["rect",{x:"3",y:"6.5",width:"18",height:"11",rx:"2"}],["path",{d:"M7 10h.01M10.3 10h.01M13.7 10h.01M17 10h.01M8 14h8"}]],gantt:[["path",{d:"M4 5h9M7 12h11M4 19h7"}],["path",{d:"M3 3v18"}]],demandas:[["circle",{cx:"10",cy:"7.8",r:"3.2"}],["path",{d:"M3.8 19.5a6.2 5.2 0 0 1 11.8-2.6"}],["circle",{cx:"17.6",cy:"17.6",r:"4.2"}],["path",{d:"m15.6 17.7 1.5 1.5 2.5-3"}]]},Hn=Object.keys(Te);function S(e,o=18,t=document){let r="http://www.w3.org/2000/svg",a=t.createElementNS(r,"svg"),n={viewBox:"0 0 24 24",width:String(o),height:String(o),fill:"none",stroke:"currentColor","stroke-width":"1.8","stroke-linecap":"round","stroke-linejoin":"round","aria-hidden":"true",focusable:"false",class:"spro-icone"};for(let[i,s]of Object.entries(n))a.setAttribute(i,s);for(let[i,s]of Te[e]){let c=t.createElementNS(r,i);for(let[l,u]of Object.entries(s))c.setAttribute(l,u);a.append(c)}return a}var ca=e=>`position:fixed;left:50%;bottom:20px;transform:translateX(-50%);z-index:2147483646;display:flex;align-items:center;gap:12px;max-width:min(560px,calc(100vw - 24px));box-sizing:border-box;padding:10px 10px 10px 16px;font:13px/1.35 system-ui,-apple-system,'Segoe UI',Roboto,sans-serif;color:#f3f5f8;background:#1f2329;border:1px solid rgb(255 255 255 / 8%);border-radius:12px;box-shadow:0 10px 24px -6px rgb(16 24 40 / 30%),0 24px 56px -12px rgb(16 24 40 / 35%);animation:${e}-aviso 220ms cubic-bezier(.2,.8,.2,1)`,la="flex:none;padding:5px 10px;font:inherit;font-weight:600;color:#9cc3ff;background:rgb(255 255 255 / 7%);border:0;border-radius:6px;cursor:pointer";function Po(e){if(!/^[a-z][a-z0-9-]*$/.test(e))throw new Error(`Prefixo de classe inv\xE1lido: ${e}`);return e}function da(e,o,t="spro-painel"){let r=`${Po(t)}-aviso`;return(a,n,i)=>new Promise(s=>{for(let m of e.querySelectorAll(`.${r}`))m.remove();let c=!1,l=m=>{c||(c=!0,u.remove(),s(m))},u=v("div",{class:r,role:"status",style:ca(t)+(o?";background:#2b3036":"")},v("span",{style:"flex:1"},a),...n.map((m,d)=>v("button",{type:"button",style:la,onclick:()=>l(d)},m)));(e.body??e.documentElement).append(u),setTimeout(()=>l(-1),Math.max(10,Math.min(i,6e4)))})}function Me(e,o,t="spro-painel"){let r=da(e,o,t);return(a,n,i)=>r(a,n?[n]:[],i).then(s=>s===0)}var ua="position:fixed;inset:0;left:0;top:0;width:100vw;height:100vh;max-width:none;max-height:none;margin:0;z-index:2147483646;background:transparent;";function Ce(e,o,t){let r=null,a=null,n=l=>{o.style.height=`${Math.max(80,Math.min(Math.round(l),2e4))}px`},i=()=>{let l=[e.documentElement];e.body&&l.push(e.body);let u=e.defaultView;for(let m=o.parentElement;m&&m!==e.body&&m!==e.documentElement;m=m.parentElement)try{let d=u?.getComputedStyle?.(m).overflowY??"";(d==="auto"||d==="scroll")&&m.scrollHeight>m.clientHeight&&l.push(m)}catch{}return l},s=()=>!o.isConnected||t.hidden||t.closest?.("[hidden]")?!1:typeof o.getClientRects!="function"||o.getClientRects().length>0,c={ligar(l){if(l&&!r&&!s())return!1;if(l&&!r){let u=o.getBoundingClientRect?.().height||Number.parseFloat(o.style.height)||0,m=i().map(d=>[d,d.style.overflow]);r={iframe:o.getAttribute("style")??"",reserva:t.style.minHeight,travados:m},u&&(t.style.minHeight=`${Math.round(u)}px`),o.setAttribute("style",`${r.iframe};${ua}`);for(let[d]of m)d.style.overflow="hidden"}else if(!l&&r){o.setAttribute("style",r.iframe),t.style.minHeight=r.reserva;for(let[u,m]of r.travados)u.style.overflow=m;r=null,a!==null&&n(a),a=null}return!0},altura(l){Number.isFinite(l)&&(r?a=l:n(l))}};return o.addEventListener("load",()=>c.ligar(!1)),c}function De(e,o){try{let t=JSON.parse(e.getItem("optionsPro")??"{}");if(!Array.isArray(t.orderPanelHome))return null;let r=t.orderPanelHome.find(n=>n?.name===o),a=Number(r?.index);return r&&Number.isFinite(a)?a:null}catch{return null}}function Ie(e,o,t){if(t!==null)for(let r of[...e.children]){if(!r.classList.contains("panelHomePro"))continue;let a=Number.parseInt(r.getAttribute("data-order")??"",10);if(Number.isFinite(a)&&a>t){r.before(o);return}}e.append(o)}function Le(e,o,t=r=>pa(e,r)){o.style.setProperty("font-weight","600","important"),t(()=>ke(e,o))}function ke(e,o){let t=e.querySelector("#divInfraBarraLocalizacao"),r=e.defaultView;if(!(!t||!r?.getComputedStyle))try{let a=r.getComputedStyle(t);if(!(Number.parseFloat(a.fontSize)>16))return;o.style.fontSize=a.fontSize,a.fontFamily&&(o.style.fontFamily=a.fontFamily)}catch{}}function pa(e,o){let t=e.defaultView,r=()=>t?.setTimeout(o,1500);e.readyState==="complete"?r():t?.addEventListener("load",r,{once:!0})}function ma(e,o){let t=Po(o),r=`${t}-painel-estilo`;if(e.getElementById(r))return;let a=e.createElement("style");a.id=r,a.textContent=[`.${t}-titulo{display:flex!important;align-items:center;gap:8px}`,`.${t}-recolher{margin-left:4px;background:none;border:0;cursor:pointer;color:inherit;line-height:0;padding:2px;border-radius:4px}`,`.${t}-recolher:hover{background:rgb(127 127 127 / 14%)}`,`.${t}-recolher:focus-visible{outline:2px solid #1a73e8;outline-offset:1px}`,`@keyframes ${t}-aviso{from{opacity:0;transform:translate(-50%,10px)}}`,`@media (prefers-reduced-motion:reduce){.${t}-aviso{animation:none!important}}`].join(`
`),(e.head??e.documentElement).append(a)}function Oe(e,o){let t=e.querySelector("#frmProcedimentoControlar");if(!t||e.querySelector("#tblMarcadores")||e.getElementById(o.id))return null;let r=Po(o.prefixo);(o.estilo??(d=>ma(d,r)))(e);let a=e.querySelector("#panelHomePro");a||(a=v("div",{id:"panelHomePro",style:"display: inline-block; width: 100%;"}),t.after(a));let n=v("iframe",{src:o.urlApp,title:o.tituloIframe,allow:"clipboard-write",style:`width: 100%; height: ${o.alturaInicial??120}px; border: 0; display: block; color-scheme: ${o.temaEscuro?"dark":"light"};`}),i=v("div",{class:`${r}-corpo`,hidden:o.recolhido},n),s=v("button",{type:"button",class:`${r}-recolher`}),c=()=>{let d=i.hidden,p=d?o.rotulos.mostrar:o.rotulos.recolher;s.setAttribute("aria-expanded",String(!d)),s.setAttribute("aria-label",p),s.title=p,s.replaceChildren(S(d?"expandir":"recolher",18))};s.addEventListener("click",()=>{i.hidden=!i.hidden,c(),o.aoRecolher(i.hidden)}),c();let l=v("div",{class:`infraBarraLocalizacao titlePanelHome ${r}-titulo`},o.icone(),o.titulo,s);Le(e,l);let u=v("div",{class:"panelHomePro",id:o.id,"data-order":o.ordem===null?"":String(o.ordem),style:"display: inline-block; width: 100%;"},l,i);Ie(a,u,o.ordem);let m=Ce(e,n,i);return{painel:u,iframe:n,corpo:i,sobreposicao:m,fechar:()=>{m.ligar(!1),u.remove()}}}function qe(e){return{altura:o=>{let t=Number(o?.px);return e.sobreposicao?e.sobreposicao.altura(t):e.iframe&&Number.isFinite(t)&&(e.iframe.style.height=`${Math.max(80,Math.min(Math.round(t),2e4))}px`),!0},sobrepor:o=>e.sobreposicao?e.sobreposicao.ligar(o?.ativo===!0):!1,aviso:o=>{let t=o??{},r=Number(t.ms),a=Number.isFinite(r)?r:7e3,n=String(t.texto??"").slice(0,400),i=Array.isArray(t.acoes)?t.acoes.slice(0,3).map(s=>String(s).slice(0,40)):[];return i.length>1&&e.avisarAcoes?e.avisarAcoes(n,i,a):e.avisar?e.avisar(n,t.acao?String(t.acao).slice(0,40):void 0,a):!1}}}function Re(e,o,t){let r=null;return e.iframe.addEventListener("load",()=>{r?.fechar(),r=wo(o(),t),r.aoFechar(()=>e.sobreposicao.ligar(!1))}),{fechar:()=>{r?.fechar(),e.fechar()},rpc:()=>r?.aberta?r:null}}function Ko(e){if(typeof e=="number"&&e)return String(e);let o=e?.id;return typeof o=="string"&&o?o:null}function Ne(e,o,t){let r=Ko(e);return r?!o||!t.has(r):!1}function ze(e){let o=null,t=!1,r=new Set,a=()=>{o?.aberta&&o.chamar("ola",e.estado(),5e3).catch(()=>{})},n=c=>{if(t||!Ne(c,!!o?.aberta,r))return;o?.fechar();let l;try{l=wo(e.conectar(),e.tratadores)}catch{o=null;return}o=l,l.aoFechar(()=>{o===l&&(o=null)});let u=Ko(c);u&&r.add(u),a()},i=()=>{t||e.area.obter(e.chave).then(c=>n(c[e.chave])).catch(()=>{})},s=e.area.aoMudar(c=>{e.chave in c&&n(c[e.chave]?.novo)});return i(),{apresentar:a,verificar:i,parar(){t=!0,s(),o?.fechar(),o=null}}}function Fe(){return globalThis.navigator?.locks??null}function _e(e,o,t=Fe()){return t?t.request(e,{ifAvailable:!0},async r=>r?o():null):o()}function $e(e,o,t=Fe()){return t?t.request(e,()=>o()):o()}var He=`/*
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
`;var w=class extends Error{codigo;detalhe;constructor(o,t,r){super(t),this.name="ErroSei",this.codigo=o,this.detalhe=r}paraJSON(){return{codigo:this.codigo,mensagem:this.message,detalhe:this.detalhe}}};function Ve(e){return e instanceof w}function Wo(e){if(e instanceof w)return e;if(e instanceof DOMException&&e.name==="AbortError")return new w("CANCELADO","Opera\xE7\xE3o cancelada.");let o=e instanceof Error?e.message:String(e);return new w("SEI_REDE",`Falha ao falar com o SEI: ${o}`)}var va={AElig:198,Aacute:193,Acirc:194,Agrave:192,Aring:197,Atilde:195,Auml:196,Ccedil:199,ETH:208,Eacute:201,Ecirc:202,Egrave:200,Euml:203,Iacute:205,Icirc:206,Igrave:204,Iuml:207,Ntilde:209,Oacute:211,Ocirc:212,Ograve:210,Oslash:216,Otilde:213,Ouml:214,THORN:222,Uacute:218,Ucirc:219,Ugrave:217,Uuml:220,Yacute:221,aacute:225,acirc:226,acute:180,aelig:230,agrave:224,amp:38,apos:39,aring:229,atilde:227,auml:228,brvbar:166,bull:8226,ccedil:231,cedil:184,cent:162,copy:169,curren:164,deg:176,divide:247,eacute:233,ecirc:234,egrave:232,eth:240,euml:235,euro:8364,frac12:189,frac14:188,frac34:190,gt:62,hellip:8230,iacute:237,icirc:238,iexcl:161,igrave:236,iquest:191,iuml:239,laquo:171,ldquo:8220,lsquo:8216,lt:60,macr:175,mdash:8212,micro:181,middot:183,nbsp:160,ndash:8211,not:172,ntilde:241,oacute:243,ocirc:244,ograve:242,ordf:170,ordm:186,oslash:248,otilde:245,ouml:246,para:182,plusmn:177,pound:163,quot:34,raquo:187,rdquo:8221,reg:174,rsquo:8217,sect:167,shy:173,sup1:185,sup2:178,sup3:179,szlig:223,thorn:254,times:215,trade:8482,uacute:250,ucirc:251,ugrave:249,uml:168,uuml:252,yacute:253,yen:165,yuml:255};function J(e){return e.includes("&")?e.replace(/&(#x[0-9a-fA-F]+|#\d+|[a-zA-Z][a-zA-Z0-9]*);/g,(o,t)=>{let r=t[0]==="#"?t[1]==="x"||t[1]==="X"?parseInt(t.slice(2),16):parseInt(t.slice(1),10):va[t];return r===void 0||Number.isNaN(r)?o:String.fromCodePoint(r)}):e}var Ue={128:8364,130:8218,131:402,132:8222,133:8230,134:8224,135:8225,136:710,137:8240,138:352,139:8249,140:338,142:381,145:8216,146:8217,147:8220,148:8221,149:8226,150:8211,151:8212,152:732,153:8482,154:353,155:8250,156:339,158:382,159:376};var Be=null;function So(e){return Be?Be(e):new DOMParser().parseFromString(e,"text/html")}function P(e){return(e?.textContent??"").replace(/\s+/g," ").trim()}var ga={n:`
`,r:"\r",t:"	",b:"\b",f:"\f",v:"\v",0:"\0"};function Jo(e,o){let t=e[o],r="";for(o+=1;o<e.length;){let a=e[o];if(a==="\\"){let n=e[o+1];if(n==="u"&&/^[0-9a-fA-F]{4}$/.test(e.slice(o+2,o+6))){r+=String.fromCharCode(parseInt(e.slice(o+2,o+6),16)),o+=6;continue}r+=ga[n]??n,o+=2;continue}if(a===t)return[r,o+1];r+=a,o+=1}return[r,o]}function Zo(e,o){let t=[],r=o;for(;r<e.length;){let a=e[r];if(a===")")return[t,r+1];if(a===","||/\s/.test(a)){r+=1;continue}if(a==='"'||a==="'"){let[s,c]=Jo(e,r);t.push(s),r=c;continue}let n=/^(null|true|false|-?\d+(?:\.\d+)?)/.exec(e.slice(r,r+32));if(n){let s=n[1];t.push(s==="null"?null:s==="true"?!0:s==="false"?!1:Number(s)),r+=s.length;continue}let i=0;for(;r<e.length;){let s=e[r];if(s==="(")i+=1;else if(s===")"){if(i===0)break;i-=1}else if(s===","&&i===0)break;r+=1}t.push(null)}return[t,r]}function q(e){return typeof e=="string"?J(e):e==null?"":String(e)}var ha=/controlador(?:_ajax)?\.php\?acao=[^"'\s<>\\]*?infra_hash=[0-9a-f]{64,192}/g;function j(e){let o=new Set;for(let t of e.replace(/&amp;/g,"&").matchAll(ha))o.add(t[0]);return[...o]}function z(e){let o=e.indexOf("?");return new URLSearchParams(o>=0?e.slice(o+1):"")}function G(e,o,t={}){let r=Array.isArray(e)?e:j(e);for(let a of r){let n=z(a),i=n.get("acao")??"";if(!(typeof o=="string"?i!==o:!o.test(i))&&Object.entries(t).every(([s,c])=>n.get(s)===c))return a}return null}function je(e,o){let t=[...e.doc.querySelectorAll("#infraMenu a[href], #main-menu a[href], .infraMenu a[href]")].map(i=>i.getAttribute("href")??"").join(`
`),r=j(t).filter(i=>z(i).get("acao")===o),n=(r.length?r:j(e.html).filter(i=>z(i).get("acao")===o)).sort((i,s)=>[...z(i).keys()].length-[...z(s).keys()].length)[0];if(!n)throw new w("SEI_ACAO_INDISPONIVEL",`O menu do SEI n\xE3o oferece "${o}" para este usu\xE1rio.`);return n}function ba(e){let o=new Map;for(let t of e.matchAll(/Nos\[(\d+)\]\s*=\s*new\s+infraArvoreNo\(/g)){let[r]=Zo(e,t.index+t[0].length);o.set(Number(t[1]),{indice:Number(t[1]),args:r,props:{}})}for(let t of e.matchAll(/Nos\[(\d+)\]\.(\w+)\s*=\s*(['"])/g)){let r=o.get(Number(t[1]));if(!r)continue;let[a]=Jo(e,t.index+t[0].length-1);r.props[t[2]]=a}return[...o.values()].sort((t,r)=>t.indice-r.indice)}function xa(e){let o=[];for(let t of e.matchAll(/new\s+infraArvoreAcao\(/g)){let[r]=Zo(e,t.index+t[0].length);o.push({tipo:q(r[0]),idPai:q(r[2]),href:q(r[3]),titulo:q(r[5]),icone:q(r[6]),extra:r[8]==null?void 0:q(r[8])})}return o}function Ge(e,o){let t=e.find(i=>i.tipo==="NIVEL_ACESSO"&&i.idPai===o);if(!t)return{nivel:"publico"};let[r,...a]=t.titulo.split(`
`);return{nivel:/sigilos/i.test(r)||/sigiloso/.test(t.icone)?"sigiloso":"restrito",hipotese:a.join(" ").trim()||void 0}}function Xe(e){return[...new Set([...e.matchAll(/<img[^>]*\btitle="([^"]+)"/g)].map(o=>q(o[1])))]}var ya=/\s*\(\d{5,}\)\s*$/;function X(e){let o=e.html,t=ba(o),r=xa(o),a=t.find(c=>c.args[0]==="PROCESSO");if(!a)throw new w("SEI_VERSAO_NAO_SUPORTADA","A \xE1rvore do processo n\xE3o tem o n\xF3 do processo.");let n=q(a.args[1]),i=Ge(r,n),s=t.filter(c=>c.args[0]==="DOCUMENTO").map(c=>{let l=q(c.args[1]),u=q(c.args[5]),m=q(c.args[7]),d=(c.props.src??"").replace(/&amp;/g,"&"),p=r.find(E=>E.tipo==="ASSINATURA"&&E.idPai===l),{nivel:f,hipotese:g}=Ge(r,l),b=(/documento_([a-z0-9]+)\.svg/.exec(m)?.[1]??"interno").replace("cancelado","interno");return{id:l,numero:q(c.args[15])||(/\((\d{5,})\)\s*$/.exec(u)?.[1]??""),titulo:u.replace(ya,""),pasta:c.args[2]&&String(c.args[2]).startsWith("PASTA")?String(c.args[2]):null,externo:/documento_download_anexo/.test(d)||!/documento_interno|documento_cancelado|formulario|email/.test(m),formato:b,nivel:f,hipotese:g,assinado:!!p,assinaturas:p?p.titulo.split(`
`).slice(1).filter(Boolean):[],cancelado:/documento_cancelado/.test(m),unidadeGeradora:r.find(E=>E.tipo==="UNIDADE_GERADORA"&&E.idPai===l)?.extra,link:q(c.args[3]).replace(/&amp;/g,"&"),src:d,acoes:j(c.props.acoes??""),botoes:Xe(c.props.acoes??"")}});return{idProcedimento:n,protocolo:q(a.args[5])||q(a.args[15]),tipo:q(a.args[6]),nivel:i.nivel,hipotese:i.hipotese,marcadores:r.filter(c=>c.tipo==="MARCADOR"&&c.idPai===n).map(c=>c.titulo.replace(/^Marcador\n/,"").replace(/\n/g," \u2014 ")),documentos:s,acoesProcesso:j(a.props.acoes??""),botoesProcesso:Xe(a.props.acoes??""),linkProcesso:q(a.args[3]).replace(/&amp;/g,"&"),sinais:r.filter(c=>c.idPai===n),links:j(o),pagina:e}}async function Ke(e,o,t){let r=await e.obter(o,t);if(!/acao=procedimento_visualizar/.test(r.url)){let a=r.doc.querySelector("#ifrArvore")?.getAttribute("src");if(!a)throw new w("SEI_NAO_ENCONTRADO","N\xE3o foi poss\xEDvel abrir a \xE1rvore do processo.");r=await e.obter(a,t)}if(/infraArvoreNo\("PASTA"/.test(r.html)){let a=G(r.html,"procedimento_visualizar")&&j(r.html).find(n=>/abrir_pastas=1/.test(n));a&&(r=await e.obter(a,t))}return X(r)}function ro(e,o,t){if(t){let r=e.documentos.find(a=>a.id===t);return r?G(r.acoes,o):null}return G(e.acoesProcesso,o)??G(e.links,o,{id_procedimento:e.idProcedimento})}var Qe="\xA5",Qo="\xB1";function We(e){return e.map(o=>`${o.id}${Qo}${o.texto}`).join(Qe)}function Aa(e){return e?e.split(Qe).map(o=>{let[t,...r]=o.split(Qo);return{id:t,texto:r.join(Qo)}}):[]}function Je(e){let o=[];for(let t of e.matchAll(/new\s+infraLupaSelect\(\s*['"]([\w-]+)['"]\s*,\s*['"]([\w-]+)['"]/g))o.push([t[1],t[2]]);return o}var ot=e=>o=>o.url.includes(e),F=class e{constructor(o,t,r){this.http=o;this.pagina=t;this.elemento=r,this.id=r.id,this.action=(r.getAttribute("action")??"").replace(/&amp;/g,"&"),this.campos=Ea(r),this.sincronizarLupas()}id;action;campos;elemento;static async abrir(o,t,r,a){let n=await o.obter(t,a);return e.de(n,r,o)}static de(o,t,r=null){let a=o.doc.querySelector(t);if(!a)throw new w("SEI_VERSAO_NAO_SUPORTADA",`A tela do SEI n\xE3o tem o formul\xE1rio esperado (${t}).`,P(o.doc.querySelector("title")));return new e(r,o,a)}pares(){return this.campos.map(o=>[o.nome,o.valor])}valor(o){return this.campos.find(t=>t.nome===o)?.valor}tem(o){return this.elemento.querySelector(`[name="${o}"]`)!==null||this.campos.some(t=>t.nome===o)}opcoes(o){let t=this.elemento.querySelector(`select[name="${o}"], select#${Ye(o)}`);return t?[...t.querySelectorAll("option")].map(r=>({valor:r.getAttribute("value")??P(r),texto:P(r),selecionada:r.hasAttribute("selected")})):[]}definir(o){for(let[t,r]of Object.entries(o)){if(r===void 0)continue;if(r===null){this.campos=this.campos.filter(n=>n.nome!==t);continue}let a=this.campos.find(n=>n.nome===t);a?a.valor=r:this.campos.push({nome:t,valor:r})}return this}escolher(o,t){let r=this.opcoes(o),a=Yo(t),n=r.find(i=>i.valor===t)??r.find(i=>Yo(i.texto)===a)??Ze(r.filter(i=>Yo(i.texto).includes(a)));if(!n)throw new w("ARGUMENTO_INVALIDO",`"${t}" n\xE3o \xE9 uma op\xE7\xE3o de ${o}.`,r.slice(0,40).map(i=>i.texto).join(" | "));return this.definir({[o]:n.valor}),n}linhas(o){return[...this.elemento.querySelectorAll(`${o} tr`)].filter(t=>t.querySelector("input[type=checkbox]"))}itensLupa(o){let t=this.hiddenDaLupa(o);return t?Aa(this.valor(t)??""):[]}definirLupa(o,t){let r=this.hiddenDaLupa(o);if(!r)throw new w("SEI_VERSAO_NAO_SUPORTADA",`A lupa ${o} n\xE3o existe nesta tela.`);return this.definir({[r]:We(t)}),this.campos=this.campos.filter(a=>a.nome!==o&&a.nome!==`${o}[]`),this}async enviar(o={}){if(!this.http)throw new w("SEI_RESPOSTA_INESPERADA","Formul\xE1rio sem transporte HTTP.");if(!this.action)throw new w("SEI_VERSAO_NAO_SUPORTADA",`O formul\xE1rio ${this.id} n\xE3o tem action.`);let t=this.pares();o.botao&&t.push(this.botaoDeEnvio(o.botao));let r=await this.http.enviar(this.action,t,o);if(o.sucesso&&!o.sucesso(r))throw new w("SEI_RESPOSTA_INESPERADA",`O SEI n\xE3o confirmou ${o.operacao??"a opera\xE7\xE3o"}.`,`${P(r.doc.querySelector("title"))} \u2014 ${r.url.replace(/infra_hash=\w+/,"infra_hash=\u2026")}`);return r}botaoDeEnvio(o){let t=this.elemento.querySelector(`[name="${o}"]`)??Ze([...this.elemento.querySelectorAll('button[type="submit"][name^="sbm"], input[type="submit"][name^="sbm"]')]);return t?[t.getAttribute("name")??o,t.getAttribute("value")??P(t)??o]:[o,o]}hiddenDaLupa(o){let t=Je(this.pagina.html).find(([r])=>r===o);return t?t[1]:null}sincronizarLupas(){for(let[o,t]of Je(this.pagina.html)){let r=this.elemento.querySelector(`select#${Ye(o)}`);if(!r)continue;let a=[...r.querySelectorAll("option")].map(n=>({id:n.getAttribute("value")??"",texto:P(n)}));(this.valor(t)??"")||this.definir({[t]:We(a)}),this.campos=this.campos.filter(n=>n.nome!==o&&n.nome!==`${o}[]`)}}};function Ea(e){let o=[];for(let t of e.querySelectorAll("input, select, textarea")){let r=t.getAttribute("name");if(!r||t.hasAttribute("disabled"))continue;let a=t.tagName.toLowerCase();if(a==="input"){let n=(t.getAttribute("type")??"text").toLowerCase();if(["submit","button","image","reset","file"].includes(n)||(n==="checkbox"||n==="radio")&&!t.hasAttribute("checked"))continue;o.push({nome:r,valor:t.getAttribute("value")??(n==="checkbox"||n==="radio"?"on":"")})}else if(a==="textarea")o.push({nome:r,valor:t.textContent??""});else{let n=[...t.querySelectorAll("option")],i=n.filter(l=>l.hasAttribute("selected")),s=t.hasAttribute("multiple"),c=i.length?i:!s&&n.length?[n[0]]:[];for(let l of c)o.push({nome:r,valor:l.getAttribute("value")??P(l)})}}return o}function Yo(e){return e.normalize("NFD").replace(/[\u0300-\u036F]/g,"").toLowerCase().replace(/\s+/g," ").trim()}function Ze(e){return e.length===1?e[0]:void 0}function Ye(e){return e.replace(/([^\w-])/g,"\\$1")}function oe(e,o){let t=e.querySelector("input[type=checkbox]"),r=e.querySelector("a[href*='procedimento_trabalhar']");if(!t||!r)return null;let a=t.getAttribute("aria-label")??"",n=/^Sigiloso\b/.test(a)||/Sigiloso/.test(r.getAttribute("class")??""),i=[...e.querySelectorAll("td")],s=n?[]:[...i[1]?.querySelectorAll("a[aria-label]")??[]].map(c=>c.getAttribute("aria-label")??"");return{idProcedimento:t.getAttribute("value")??z(r.getAttribute("href")??"").get("id_procedimento")??"",protocolo:t.getAttribute("title")??P(r),grupo:o,tipo:/Tipo (.*?)(?: \/ Especifica|$)/.exec(a)?.[1]?.trim()??"",especificacao:n?"":/Especifica\S* (.*)$/.exec(a)?.[1]?.trim()??"",sigiloso:n,novo:/NaoVisualizado/.test(r.getAttribute("class")??""),atribuido:P(i[i.length-1]).replace(/^\(|\)$/g,""),sinais:s,documentoNovo:!!i[1]?.querySelector("img[src*='exclamacao']")||s.some(c=>/documento foi inclu/i.test(c))}}function To(e,o){let t=o==="recebidos"?"#tblProcessosRecebidos":"#tblProcessosGerados",r=e.doc.querySelector(t),a=Number(/\((\d+)\s+registro/.exec(P(r?.querySelector("caption")))?.[1]??0),n=[];for(let i of r?.querySelectorAll("tr[id^='P']")??[]){let s=oe(i,o);s&&n.push(s)}return{itens:n,total:a}}function et(e){return[...To(e,"recebidos").itens,...To(e,"gerados").itens]}async function tt(e,o={}){let t=o.limite??2e3,r=await e.http.obter(e.linkMenu("procedimento_controlar"),{sinal:o.sinal,aceitarValidacao:!0}),a=[],n=0;for(let i of["recebidos","gerados"]){let s=i==="recebidos"?"hdnRecebidosPaginaAtual":"hdnGeradosPaginaAtual",{itens:c,total:l}=To(r,i);n+=l,a.push(...c);let u=c.length,m=!1;for(let d=1;u<l&&c.length>0&&a.length<t;d+=1)r=await F.de(r,"#frmProcedimentoControlar",e.http).definir({hdnRecebidosPaginaAtual:"0",hdnGeradosPaginaAtual:"0",[s]:String(d)}).enviar({sinal:o.sinal,aceitarValidacao:!0}),{itens:c}=To(r,i),u+=c.length,a.push(...c),m=!0;m&&(r=await F.de(r,"#frmProcedimentoControlar",e.http).definir({hdnRecebidosPaginaAtual:"0",hdnGeradosPaginaAtual:"0"}).enviar({sinal:o.sinal,aceitarValidacao:!0}))}return{total:n,processos:a.slice(0,t)}}function wa(e){let o=e.doc.querySelector("#tblHistorico"),t=Number(/\((\d+)\s+registro/.exec(P(o?.querySelector("caption")))?.[1]??0);return{itens:[...o?.querySelectorAll("tr")??[]].filter(a=>a.querySelector("td")).map(a=>{let n=[...a.querySelectorAll("td")];return{data:P(n[0]),unidade:P(n[1]),usuario:P(n[2]),descricao:P(n[3])}}),total:t}}function Mo(e){return wa(e).itens}var rt="#frmTextoPadraoInternoCadastro",at="#frmTextoPadraoInternoLista",Pa='textarea[name="txaConteudo"], #txaConteudo',Sa=40,Co=e=>(e??"").replace(/&amp;/g,"&"),Ta=(e,o)=>Number(e.id)-Number(o.id),nt=e=>e.doc.querySelector(Pa)?.textContent??"";function it(e,o){let t=()=>{if(!o.nome.trim()||o.nome.length>50)throw new w("ARGUMENTO_INVALIDO","O nome do texto padr\xE3o deve ter de 1 a 50 caracteres.");if(o.descricao.length>300)throw new w("ARGUMENTO_INVALIDO","A descri\xE7\xE3o do texto padr\xE3o passa de 300 caracteres.")},r=p=>[...p.doc.querySelectorAll("table.infraTable tr")].filter(f=>[...f.querySelectorAll("td")].some(g=>(g.textContent??"").trim()===o.nome)),a=p=>{let f=p.querySelector('input[type="checkbox"]')?.getAttribute("value")??/acaoExcluir\(\s*['"](\d+)/.exec(p.querySelector('a[onclick*="acaoExcluir"]')?.getAttribute("onclick")??"")?.[1],g=Co(p.querySelector('a[href*="acao=texto_padrao_interno_consultar"]')?.getAttribute("href")),b=Co(p.querySelector('a[href*="acao=texto_padrao_interno_alterar"]')?.getAttribute("href"));return!f||!g?null:b?{id:f,consultar:g,alterar:b}:{id:f,consultar:g}},n=async p=>{t();let f=await e.http.obter(e.linkMenu("texto_padrao_interno_listar"),p),g=f;for(let b=0;b<Sa;b++){let E=r(g),x=E.map(a).filter(C=>C!==null).sort(Ta);if(x.length)return{pagina:g,primeira:f,achado:x[0]??null,todos:x};if(E.length)throw new w("SEI_ACAO_INDISPONIVEL",`O texto padr\xE3o "${o.nome}" est\xE1 na lista, mas o SEI n\xE3o oferece a voc\xEA consult\xE1-lo nesta unidade.`);if(!/infraAcaoPaginar\(\s*['"]\+['"]/.test(g.html))break;g=await F.de(g,at,e.http).definir({hdnInfraPaginaAtual:String(b+1)}).enviar(p)}return{pagina:g,primeira:f,achado:null,todos:[]}},i=async(p,f)=>nt(await e.http.obter(p.consultar,f)),s=p=>({...p,modos:{txaConteudo:"html"},sucesso:ot("texto_padrao_interno_listar")}),c=async(p,f)=>{if(!p.alterar)throw new w("SEI_ACAO_INDISPONIVEL","O SEI n\xE3o permite a voc\xEA alterar este texto padr\xE3o nesta unidade.");return F.abrir(e.http,p.alterar,rt,f)},l=async(p,f,g)=>{await p.definir({txaConteudo:f}).enviar({...s(g),botao:"sbmAlterarTextoPadraoInterno",operacao:"a altera\xE7\xE3o do texto padr\xE3o"})},u=async(p,f,g)=>{let b=Co(/location\.href\s*=\s*'([^']+)'/.exec(p.doc.querySelector("#btnNovo")?.getAttribute("onclick")??"")?.[1]);if(!b)throw new w("SEI_ACAO_INDISPONIVEL","O SEI n\xE3o permite a voc\xEA criar textos padr\xE3o nesta unidade.");await(await F.abrir(e.http,b,rt,g)).definir({txtNome:o.nome,txtDescricao:o.descricao,txaConteudo:f}).enviar({...s(g),botao:"sbmCadastrarTextoPadraoInterno",operacao:"o cadastro do texto padr\xE3o"})},m=async(p,f,g)=>{let b=Co(/['"](controlador\.php\?acao=texto_padrao_interno_excluir[^'"]+)['"]/.exec(p.html)?.[1]);if(!b)throw new w("SEI_ACAO_INDISPONIVEL","O SEI n\xE3o oferece a exclus\xE3o de textos padr\xE3o para voc\xEA nesta unidade.");let E=F.de(p,at,e.http).definir({hdnInfraItemId:f});await e.http.enviar(b,E.pares(),{...g,aceitarValidacao:!0})},d=async(p,f,g)=>{let{todos:b,pagina:E}=await n(g),[x,...C]=b;if(!x||!C.length)return{gravado:!0};let B=await i(x,g);if(f.mesmo(B,p))return{gravado:!0};for(let to of C)if(f.mesmo(await i(to,g),p))try{await m(E,to.id,g)}catch($){if(!(Ve($)&&$.codigo==="SEI_ACAO_INDISPONIVEL"))throw $}return{gravado:!1,atual:B}};return{async localizar(p){return(await n(p)).achado},async ler(p){let{achado:f}=await n(p);return f?i(f,p):null},async gravar(p,f){let{achado:g,primeira:b}=await n(f);g?await l(await c(g,f),p,f):await u(b,p,f)},async gravarConferindo(p,f,g){let{achado:b,primeira:E}=await n(g);if(b){let x=await c(b,g),C=nt(x.pagina);return f.mesmo(C,f.anterior)?(await l(x,p,g),{gravado:!0}):{gravado:!1,atual:C}}return f.anterior!==null?{gravado:!1,atual:null}:(await u(E,p,g),d(p,f,g))},async excluir(p){let{achado:f,pagina:g}=await n(p);return f?(await m(g,f.id,p),!0):!1}}}var Ma={"\u2010":"-","\u2011":"-","\u2012":"-","\u2013":"-","\u2014":"-","\u2015":"-","\u2212":"-","\u2018":"'","\u2019":"'","\u201A":"'","\u201B":"'","\u2032":"'","\u201C":'"',"\u201D":'"',"\u201E":'"',"\u201F":'"',"\u2033":'"',"\u2026":"...","\u2022":"-","\u2002":" ","\u2003":" ","\u2009":" ","\u202F":" ","\u205F":" ","\u200B":"","\u200C":"","\u200D":"","\u2060":"","\uFEFF":"","\u20AC":"EUR","\u2122":"(TM)","\u2192":"->","\u2190":"<-"};function st(e,o="texto"){let t="";for(let r of e){let a=r.codePointAt(0);if(a<=255){t+=r;continue}let n=Ma[r];if(o==="html"){t+=n===""?"":`&#${a};`;continue}if(n!==void 0){t+=n;continue}let i=r.normalize("NFKD").replace(/[\u0300-\u036F]/g,"");t+=[...i].every(s=>s.codePointAt(0)<=255)?i:""}return t}var Ca=/[A-Za-z0-9\-_.*]/;function ct(e){let o="";for(let t of e)t===" "?o+="+":Ca.test(t)?o+=t:o+="%"+t.charCodeAt(0).toString(16).toUpperCase().padStart(2,"0");return o}function lt(e,o={}){return e.map(([t,r])=>{let a=o[t]??"texto";return`${ct(st(t))}=${ct(st(r??"",a))}`}).join("&")}function ee(e){let o=e instanceof Uint8Array?e:new Uint8Array(e),t=[],r=16384;for(let a=0;a<o.length;a+=r){let n=o.subarray(a,a+r),i=new Array(n.length);for(let s=0;s<n.length;s+=1)i[s]=Ue[n[s]]??n[s];t.push(String.fromCharCode(...i))}return t.join("")}var dt="application/x-www-form-urlencoded; charset=ISO-8859-1";function ut(e,o,t){let r=null;return{url:e,status:o,html:t,get doc(){return r??=So(t)}}}function pt(e,o={}){if(/\/login\.php/i.test(e.url)||/[?&]acao=(?:infra_)?sair\b/.test(e.url))throw new w("SEI_SESSAO_EXPIRADA","A sess\xE3o do SEI foi encerrada. Fa\xE7a login de novo no SEI e repita o pedido.");if(e.status>=500)throw new w("SEI_EXCECAO",`O SEI respondeu com erro ${e.status}.`);if(e.html.includes('id="divInfraExcecao"')){let t=e.doc.querySelector("#divInfraExcecao");if(t){let r=P(t);throw new w("SEI_EXCECAO",r||"O SEI exibiu uma p\xE1gina de erro.",r)}}if(!o.aceitarValidacao&&e.html.includes("txaInfraValidacao")){let t=e.doc.querySelector("#txaInfraValidacao")?.textContent?.trim()??"";if(t)throw new w("SEI_VALIDACAO",t,t)}return e}function Do(e,o={}){let t=new URL(".",e),r=o.fetch??((...m)=>fetch(...m)),a=Math.max(1,o.concorrencia??3),n=0,i=[];async function s(m){n>=a&&await new Promise(d=>i.push(d)),n+=1;try{return await m()}finally{n-=1,i.shift()?.()}}let c=m=>new URL(m.replace(/&amp;/g,"&"),t).href;async function l(m,d,p){return s(async()=>{try{let f=await r(c(m),{credentials:"same-origin",redirect:"follow",...d,signal:p.sinal}),g=ee(await f.arrayBuffer());return pt(ut(f.url||c(m),f.status,g),p)}catch(f){throw Wo(f)}})}async function u(m,d={}){return s(async()=>{try{let p=await r(c(m),{credentials:"same-origin",redirect:"follow",signal:d.sinal}),f=new Uint8Array(await p.arrayBuffer()),g=(p.headers?.get("content-type")??"").split(";")[0].trim().toLowerCase();g==="text/html"&&pt(ut(p.url||c(m),p.status,ee(f)),d);let b=p.headers?.get("content-disposition")??"",E=decodeURIComponent(/filename\*=UTF-8''([^;]+)/i.exec(b)?.[1]??/filename="?([^";]+)"?/i.exec(b)?.[1]??"");return{bytes:f,tipo:g,nome:E}}catch(p){throw Wo(p)}})}return{base:t,absoluta:c,baixar:u,obter:(m,d={})=>l(m,{method:"GET"},d),enviar:(m,d,p={})=>l(m,{method:"POST",headers:{"Content-Type":dt},body:lt(d,p.modos)},p)}}function Da(e){let o=/Sistema Eletr(?:\u00F4|&ocirc;|\\u00F4)nico de Informa[^"]*?Vers(?:\u00E3|&atilde;)o\s*([\d.]+)/i.exec(e);return o?o[1]:/\.(?:js|svg|css)\?(\d+\.\d+\.\d+)-/.exec(e)?.[1]??""}function Ia(e){let o=e.doc.querySelector("#lnkInfraUnidade")?.getAttribute("onclick")??"",t=/infra_unidade_atual=(\d+)/.exec(o)?.[1];if(t)return t;let r=/[?&]infra_unidade_atual=(\d+)/.exec(e.url)?.[1];return r||(e.doc.querySelector("#selInfraUnidades option[selected]")?.getAttribute("value")??"")}function te(e){let o=e.doc,t=o.querySelector("#lnkInfraUnidade"),r=o.querySelector("#lnkUsuarioSistema")?.getAttribute("title")??"",[,a="",n="",i=""]=/^(.*?)\s*\(([^/)]+)(?:\/([^)]+))?/.exec(r)??[],s=Da(e.html);return{host:new URL(e.url).host,versao:s,maior:Number(s.split(".")[0])||0,unidade:{id:Ia(e),sigla:P(t)||P(o.querySelector("#selInfraUnidades option[selected]")),nome:t?.getAttribute("title")??""},usuario:{nome:a.trim(),login:n.trim(),orgao:i.trim()}}}var La=3e4,ao=class{constructor(o,t=null,r){this.paginaViva=t;this.http=Do(o,r)}http;paginaBase=null;arvores=new Map;localizados=new Map;base(){let o=this.paginaViva?.();if(o&&o.html.includes("frmProtocoloPesquisaRapida"))return o;if(this.paginaBase)return this.paginaBase;if(o)return o;throw new w("SEI_NAO_ENCONTRADO","Abra uma tela do SEI (por exemplo, Controle de Processos) nesta aba.")}contexto(){return te(this.base())}linkMenu(o){return je(this.base(),o)}async renovarBase(o){return this.paginaBase=await this.http.obter(this.linkMenu("procedimento_controlar"),o),this.arvores.clear(),this.localizados.clear(),this.paginaBase}async localizar(o,t){let r=o.trim();if(!r)throw new w("ARGUMENTO_INVALIDO","Informe o n\xFAmero do processo ou o n\xBA SEI do documento.");let a=this.localizados.get(r);if(a)return a;let n=F.de(this.base(),"#frmProtocoloPesquisaRapida",this.http);n.definir({txtPesquisaRapida:r});let i=await n.enviar(t),s=z(i.url);if(s.get("acao")!=="procedimento_trabalhar")throw new w("SEI_NAO_ENCONTRADO",`Nada encontrado no SEI para "${r}", ou voc\xEA n\xE3o tem acesso a ele.`);let c=i.doc.querySelector("#ifrArvore")?.getAttribute("src");if(!c)throw new w("SEI_VERSAO_NAO_SUPORTADA","A tela do processo n\xE3o trouxe a \xE1rvore.");let u=z(J(c)).get("id_procedimento")??"",m=s.get("id_protocolo")??"",d={idProcedimento:u,idDocumento:m&&m!==u?m:void 0,linkArvore:J(c)};return this.localizados.set(r,d),d}async arvore(o,t={}){let r=await this.localizar(o,t),a=this.arvores.get(r.idProcedimento);if(a&&!t.forcar&&Date.now()-a.quando<La)return a.arvore;let n=await Ke(this.http,r.linkArvore,t);return this.arvores.set(r.idProcedimento,{quando:Date.now(),arvore:n}),n}invalidar(o){o?this.arvores.delete(o):this.arvores.clear()}async ajax(o,t,r){let a=await this.http.enviar(o,t,{...r,aceitarValidacao:!0}),n=[];for(let i of a.html.matchAll(/<option[^>]*value="([^"]*)"[^>]*>([^<]*)<\/option>/g))n.push({id:J(i[1]),texto:J(i[2]).trim()});for(let i of a.html.matchAll(/<item\s+([^>]*)>/g)){let s=So(`<i ${i[1]}></i>`).querySelector("i");n.push({id:s?.getAttribute("id")??"",texto:s?.getAttribute("descricao")??s?.getAttribute("complemento")??""})}return n.filter(i=>i.id&&i.id!=="null")}};function mt(e){let o=e.getItem("configDataFavoritesPro");if(!o)return null;try{return JSON.parse(o)}catch{return null}}function re(e=2e3){let o=window.webkitRequestFileSystem;return o?new Promise(t=>{let r=setTimeout(()=>t(null),e),a=()=>{clearTimeout(r),t(null)};try{o(1,0,n=>n.root.getFile("configPro.json",{},i=>i.file(async s=>{try{let c=JSON.parse(await s.text());clearTimeout(r),t(c)}catch{a()}},a),a),a)}catch{a()}}):Promise.resolve(null)}var ft="seipro-favoritos",Z="favoritos/preferencias";var vt="seipro-favoritos-lateral",gt="favoritos/lateralAberto";function so(e){let o=e.login.trim().toLowerCase();return`${e.host}|${o}|${e.lista==="pessoal"?"pessoal":`u:${e.unidade?.id??""}`}`}function ht(e){let o={host:e.host,login:e.login.trim().toLowerCase()};return{unidade:e.unidade?.id?{...o,lista:"unidade",unidade:{id:e.unidade.id,sigla:e.unidade.sigla}}:null,pessoal:{...o,lista:"pessoal"}}}function bt(e){return[e.host,e.login.trim().toLowerCase(),e.unidade?.id??""].join("|")}function xt(e){let o=e;return!!(o.side_panel||o.sidebar_action)}function ae(e,o){return o?{abaixo:e!=="lateral",lateral:e!=="abaixo"}:{abaixo:!0,lateral:!1}}function ne(e,o,t,r){let a=`${e}|${o.trim().toLowerCase()}|${t}`;return r?`${a}|${r}`:a}function yt(e,o){return e?.[o]??"nao-perguntado"}var At={exibir:"abaixo",perguntarAoFavoritar:!0,textoPadrao:"nao-perguntado",textoPadraoUnidades:{},recolhido:!1,agruparPorPasta:!1,ordem:"manual",faixaUnidadeDispensada:!1};async function Y(e){let o=(await e.obter(Z))[Z];return{...At,...o&&typeof o=="object"?o:{}}}async function ie(e,o){let t={...await Y(e),...o};return await e.gravar({[Z]:t}),t}function Et(e,o,t,r){return yt(e.textoPadraoUnidades,ne(o,t,r))}async function wt(e,o,t,r,a){let n=await Y(e);return ie(e,{textoPadraoUnidades:{...n.textoPadraoUnidades??{},[ne(o,t,r)]:a}})}async function Io(e,o){if(e.chaves){let r=(await e.chaves()).filter(a=>a.startsWith(o));return r.length?e.obter(r):{}}let t=await e.obter(null);return Object.fromEntries(Object.entries(t).filter(([r])=>r.startsWith(o)))}var Q=class{constructor(o,t){this.area=o;this.prefixo=t}chave(o){return this.prefixo+o}async listar(){return Object.values(await Io(this.area,this.prefixo))}async obter(o){let t=this.chave(o);return(await this.area.obter(t))[t]}async gravar(o,t){await this.area.gravar({[this.chave(o)]:t})}async gravarVarios(o){o.length&&await this.area.gravar(Object.fromEntries(o.map(([t,r])=>[this.chave(t),r])))}async apagar(o){o.length&&await this.area.remover(o.map(t=>this.chave(t)))}aoMudar(o){return this.area.aoMudar(t=>{Object.keys(t).some(r=>r.startsWith(this.prefixo))&&o()})}};var ka="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",Pt=new Map;function Oa(e){let o=Pt.get(e);if(o===void 0){o=new Uint8Array(256);for(let t=0;t<e.length;t++)o[e.charCodeAt(t)]=t;Pt.set(e,o)}return o}function co(e,o,t,r){let a=t[0];if(o!=null&&e>=o)throw new Error(e+" >= "+o);if(e.slice(-1)===a||o&&o.slice(-1)===a)throw new Error("trailing zero");if(o){let s=0;for(;(e[s]||a)===o[s];)s++;if(s>0)return o.slice(0,s)+co(e.slice(s),o.slice(s),t,r)}let n=e?r[e.charCodeAt(0)]:0,i=o!=null?r[o.charCodeAt(0)]:t.length;if(i-n>1){let s=Math.round(.5*(n+i));return t[s]}else return o&&o.length>1?o.slice(0,1):t[n]+co(e.slice(1),null,t,r)}function It(e,o){if(e.length!==lo(e[0],o))throw new Error("invalid integer part of order key: "+e)}function lo(e,o){if(o===void 0){let t=e.charCodeAt(0);if(t>=97&&t<=122)return t-97+2;if(t>=65&&t<=90)return 90-t+2}else{let t=o.indexOf(e);if(t!==-1){let r=o.length/2;return t<r?r-t+1:t-r+2}}throw new Error("invalid order key head: "+e)}function vo(e,o){let t=lo(e[0],o);if(t>e.length)throw new Error("invalid order key: "+e);return e.slice(0,t)}function St(e,o,t){if(Lt(e,o,t))throw new Error("invalid order key: "+e);let r=vo(e,t);if(e.slice(r.length).slice(-1)===o[0])throw new Error("invalid order key: "+e)}function Tt(e,o,t,r){It(e,r);let a=e[0],n=o[0],i="";for(let u=e.length-1;u>=1;u--){let m=t[e.charCodeAt(u)]+1;if(m===o.length)i=n+i;else return a+e.slice(1,u)+o[m]+i}if(r===void 0){if(a==="Z")return"a"+n;if(a==="z")return null;let u=String.fromCharCode(a.charCodeAt(0)+1);return u+(u>"a"?i+n:i.slice(1))}let s=r.indexOf(a);if(s===r.length-1)return null;let c=r[s+1],l=lo(c,r)-lo(a,r);return c+(l>0?i+n:l<0?i.slice(1):i)}function qa(e,o,t,r){It(e,r);let a=e[0],n=o[o.length-1],i="";for(let u=e.length-1;u>=1;u--){let m=t[e.charCodeAt(u)]-1;if(m===-1)i=n+i;else return a+e.slice(1,u)+o[m]+i}if(r===void 0){if(a==="a")return"Z"+n;if(a==="A")return null;let u=String.fromCharCode(a.charCodeAt(0)-1);return u+(u<"Z"?i+n:i.slice(1))}let s=r.indexOf(a);if(s===0)return null;let c=r[s-1],l=lo(c,r)-lo(a,r);return c+(l>0?i+n:l<0?i.slice(1):i)}var Mt=new Map;function Lt(e,o,t=""){let r=Mt.get(t);r===void 0&&(r=new Map,Mt.set(t,r));let a=o.charCodeAt(0),n=r.get(a);return n===void 0&&(n=t===""?"A"+o[0].repeat(26):t[0]+o[0].repeat(t.length/2),r.set(a,n)),e===n}function kt(e){for(let o=1;o<e.length;o++)if(e.charCodeAt(o-1)>=e.charCodeAt(o))return!1;return!0}function Ot(e){for(let o=0;o<e.length;o++)if(e.charCodeAt(o)>255)return!1;return!0}var Ct=new Set;function Ra(e){if(!Ct.has(e)){if(e.length<2||!kt(e))throw new Error("digits must be at least 2 characters in strictly ascending character code order: "+e);if(!Ot(e))throw new Error("digits must be single-byte (char code 0-255): "+e);Ct.add(e)}}var Dt=new Set;function Na(e){if(!Dt.has(e)){if(e.length<2||e.length%2!==0||!kt(e))throw new Error("intDigits must be an even number of at least 2 characters in strictly ascending character code order: "+e);if(!Ot(e))throw new Error("intDigits must be single-byte (char code 0-255): "+e);Dt.add(e)}}function se(e,o,t=ka,r=void 0){Ra(t),r!==void 0&&Na(r);let a=Oa(t);if(e!=null&&St(e,t,r),o!=null&&St(o,t,r),e!=null&&o!=null&&e>o){let u=e;e=o,o=u}if(e==null){if(o==null)return(r===void 0?"a":r[r.length/2])+t[0];let u=vo(o,r),m=o.slice(u.length);if(Lt(u,t,r))return u+co("",m,t,a);if(u<o)return u;let d=qa(u,t,a,r);if(d==null)throw new Error("cannot decrement any more");return d}if(o==null){let u=vo(e,r),m=e.slice(u.length),d=Tt(u,t,a,r);return d??u+co(m,null,t,a)}let n=vo(e,r),i=e.slice(n.length),s=vo(o,r),c=o.slice(s.length);if(n===s)return n+co(i,c,t,a);let l=Tt(n,t,a,r);if(l==null)throw new Error("cannot increment any more");return l<o?l:n+co(i,null,t,a)}function go(e,o){return se(e??null,o??null)}function ho(e){try{return se(e,null),!0}catch{return!1}}function qt(e,o){return e.atualizadoEm!==o.atualizadoEm?e.atualizadoEm>o.atualizadoEm:e.dispositivo!==o.dispositivo?e.dispositivo>o.dispositivo:JSON.stringify(e)>JSON.stringify(o)}function Rt(e,o,t=90){let r=o-t*864e5;return e.filter(a=>a.removidoEm===void 0||a.removidoEm>=r)}function I(e){return e.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/\s+/g," ").trim()}function no(e){let o=2166136261;for(let t of e)o^=t.codePointAt(0)??0,o=Math.imul(o,16777619)>>>0;return o.toString(16).padStart(8,"0")}var Nt=["#bfd5e8","#c8e6c9","#ffe0b2","#f8bbd0","#d1c4e9","#b2ebf2","#fff9c4","#d7ccc8"];function Lo(e){let o=Number.parseInt(no(I(e)).slice(0,6),16)%Nt.length;return Nt[o]??"#bfd5e8"}function zt(e,o){if(!o||!e)return[];let t=[];if(o.qtdDocumentos!==void 0&&e.qtdDocumentos!==void 0&&o.qtdDocumentos>e.qtdDocumentos){let n=o.qtdDocumentos-e.qtdDocumentos;t.push({tipo:"documentos",texto:n===1?"1 documento novo":`${n} documentos novos`})}let r=o.ultimoAndamento,a=e.ultimoAndamento;return r&&a&&(r.data!==a.data||r.descricao!==a.descricao)&&t.push({tipo:"andamento",texto:`andamento: ${r.descricao}${r.unidade?` (${r.unidade})`:""}`}),e.abertoNaUnidade===!0&&o.abertoNaUnidade===!1&&t.push({tipo:"saiu",texto:"saiu da sua unidade"}),e.abertoNaUnidade===!1&&o.abertoNaUnidade===!0&&t.push({tipo:"voltou",texto:"voltou para a sua unidade"}),o.naoVisualizado&&!e.naoVisualizado&&t.push({tipo:"naoVisualizado",texto:"n\xE3o visualizado"}),o.documentoNovo&&!e.documentoNovo&&t.push({tipo:"documentoNovo",texto:"documento novo"}),o.concluido&&!e.concluido&&t.push({tipo:"concluido",texto:"conclu\xEDdo"}),o.recebidoNaLeitura&&t.push({tipo:"recebido",texto:"chegou \xE0 sua unidade \u2014 o SEI registrou o recebimento"}),t}function Ft(e,o){if(!e||!o)return e===o;let t=r=>JSON.stringify([r.abertoNaUnidade,r.naoVisualizado,r.documentoNovo,r.atribuido,r.marcadores??[],r.concluido,r.qtdDocumentos,r.ultimoAndamento??null]);return t(e)===t(o)}function ce(e,o){return!!e.lembrete&&e.lembrete.em<=o}function _t(e){for(let o of Object.keys(e))e[o]===void 0&&delete e[o];return e}function $t(e,o,t){return _t({id:e.id,protocolo:e.protocolo,tipo:e.tipo||void 0,especificacao:e.sigiloso?void 0:e.especificacao||void 0,sigiloso:e.sigiloso?!0:void 0,sigiloAConfirmar:e.sigiloAConfirmar&&e.sigiloso===void 0?!0:void 0,etiquetas:[],ordem:o,criadoEm:t.agora,atualizadoEm:t.agora,dispositivo:t.dispositivo})}function K(e,o,t){return _t({...e,...o,atualizadoEm:t.agora,dispositivo:t.dispositivo})}function ko(e,o){return K(e,{removidoEm:o.agora},o)}function Ht(e,o){return K(e,{removidoEm:void 0},o)}var Vt=e=>e.reduce((o,t)=>ho(t.ordem)&&(o===null||t.ordem>o)?t.ordem:o,null),le=(e,o)=>e.nome.localeCompare(o.nome,"pt-BR"),uo=class{constructor(o,t,r){this.area=o;this.escopo=t;this.carimbo=r;let a=`favoritos/${so(t)}/`;this.favoritos=new Q(o,`${a}f/`),this.pastas=new Q(o,`${a}p/`),this.etiquetas=new Q(o,`${a}e/`),this.atuaisCol=new Q(o,`${a}a/`),this.vistosCol=new Q(o,`${a}v/`),this.chaveMeta=`${a}meta`,this.base=a}favoritos;pastas;etiquetas;atuaisCol;vistosCol;chaveMeta;base;async registrar(){await this.area.gravar({[this.chaveMeta]:{escopo:this.escopo}})}async instantaneo(){let o=Object.entries(await Io(this.area,this.base)),t=r=>o.filter(([a])=>a.startsWith(this.base+r)).map(([,a])=>a);return{todos:t("f/"),pastas:t("p/").filter(r=>r.removidoEm===void 0).sort(Ut),etiquetas:t("e/").filter(r=>r.removidoEm===void 0).sort(le)}}async gravarAtual(o,t){await this.atuaisCol.gravar(o,{...t,id:o})}async gravarAtuais(o){await this.atuaisCol.gravarVarios(o.map(([t,r])=>[t,{...r,id:t}]))}async atuais(){return new Map((await this.atuaisCol.listar()).map(({id:o,...t})=>[o,t]))}async vistosCompletos(){return this.vistosCol.listar()}async vistos(){return new Map((await this.vistosCol.listar()).filter(o=>o.removidoEm===void 0).map(o=>[o.id,o.visto]))}async gravarVisto(o,t){let r=await this.vistosCol.obter(o);if(r&&r.removidoEm===void 0&&Ft(r.visto,t))return!1;let a=this.carimbo(),n={...t};return delete n.recebidoNaLeitura,await this.vistosCol.gravar(o,{id:o,visto:n,atualizadoEm:a.agora,dispositivo:a.dispositivo}),!0}async marcarVisto(o){let t=await this.atuais(),r=0;for(let a of o){let n=t.get(a),i=await this.obter(a);!n||!i||i.removidoEm!==void 0||(await this.gravarVisto(a,n),r++)}return r}async instantaneoCompleto(){let o=Object.entries(await Io(this.area,this.base)),t=r=>o.filter(([a])=>a.startsWith(this.base+r)).map(([,a])=>a);return{todos:t("f/"),pastas:t("p/"),etiquetas:t("e/"),vistos:t("v/")}}todos(){return this.favoritos.listar()}async ativos(){return(await this.todos()).filter(o=>o.removidoEm===void 0)}obter(o){return this.favoritos.obter(o)}async contem(o){let t=await this.obter(o);return!!t&&t.removidoEm===void 0}async proximaOrdem(){return go(Vt(await this.todos()),null)}async adicionar(o){let t=this.carimbo(),r=await this.obter(o.id),a;if(!r)a=$t(o,await this.proximaOrdem(),t);else{let n=o.sigiloso===void 0?r.sigiloso:o.sigiloso?!0:void 0,i={sigiloAConfirmar:o.sigiloso!==void 0?void 0:r.sigiloAConfirmar,protocolo:o.protocolo||r.protocolo,tipo:o.tipo||r.tipo,sigiloso:n,especificacao:n?void 0:o.especificacao||r.especificacao};r.removidoEm!==void 0&&Object.assign(i,{removidoEm:void 0,ordem:await this.proximaOrdem()}),a=K(r,i,t)}return await this.favoritos.gravar(a.id,a),a}async editar(o,t){let r=await this.obter(o);if(!r)throw new Error(`O monitorado ${o} n\xE3o existe nesta lista.`);let a={...t};a.etiquetas&&(a.etiquetas=[...new Set(a.etiquetas)].slice(0,8)),typeof a.nota=="string"&&(a.nota=a.nota.slice(0,2e3).trim()?a.nota.slice(0,2e3):void 0),typeof a.titulo=="string"&&(a.titulo=a.titulo.trim()||void 0);let n=K(r,a,this.carimbo());return await this.favoritos.gravar(o,n),n}async remover(o){let t=this.carimbo(),r=(await Promise.all(o.map(a=>this.obter(a)))).filter(a=>!!a&&a.removidoEm===void 0);return await this.favoritos.gravarVarios(r.map(a=>[a.id,ko(a,t)])),r.length}async restaurar(o){let t=this.carimbo(),r=(await Promise.all(o.map(a=>this.obter(a)))).filter(a=>!!a&&a.removidoEm!==void 0);return await this.favoritos.gravarVarios(r.map(a=>[a.id,Ht(a,t)])),r.length}async mover(o,t,r){let a=t?await this.obter(t):void 0,n=r?await this.obter(r):void 0,i;try{i=go(a?.ordem??null,n?.ordem??null)}catch{i=go(a?.ordem??null,null)}await this.editar(o,{ordem:i})}async pastasAtivas(){return(await this.pastas.listar()).filter(o=>o.removidoEm===void 0).sort((o,t)=>Ut(o,t))}async criarPasta(o,t){let r=o.trim();if(!r)throw new Error("Informe o nome da pasta.");let a=await this.pastas.listar(),n=a.find(c=>c.removidoEm===void 0&&I(c.nome)===I(r));if(n)return n;let i=this.carimbo(),s={id:po(),nome:r,ordem:go(Vt(a),null),atualizadoEm:i.agora,dispositivo:i.dispositivo};return t&&(s.cor=t),await this.pastas.gravar(s.id,s),s}async editarPasta(o,t){let r=await this.pastas.obter(o);r&&await this.pastas.gravar(o,K(r,t,this.carimbo()))}async removerPasta(o){let t=await this.pastas.obter(o);if(!t)return;let r=this.carimbo();await this.pastas.gravar(o,ko(t,r));let a=(await this.todos()).filter(n=>n.pasta===o);await this.favoritos.gravarVarios(a.map(n=>[n.id,K(n,{pasta:void 0},r)]))}async etiquetasAtivas(){return(await this.etiquetas.listar()).filter(o=>o.removidoEm===void 0).sort(le)}async criarEtiqueta(o,t){let r=o.trim();if(!r)throw new Error("Informe o nome da etiqueta.");let a=(await this.etiquetas.listar()).find(s=>s.removidoEm===void 0&&I(s.nome)===I(r));if(a)return a;let n=this.carimbo(),i={id:po(),nome:r,cor:t??Lo(r),atualizadoEm:n.agora,dispositivo:n.dispositivo};return await this.etiquetas.gravar(i.id,i),i}async editarEtiqueta(o,t){let r=await this.etiquetas.obter(o);r&&await this.etiquetas.gravar(o,K(r,t,this.carimbo()))}async removerEtiqueta(o){let t=await this.etiquetas.obter(o);if(!t)return;let r=this.carimbo();await this.etiquetas.gravar(o,ko(t,r));let a=(await this.todos()).filter(n=>n.etiquetas.includes(o));await this.favoritos.gravarVarios(a.map(n=>[n.id,K(n,{etiquetas:n.etiquetas.filter(i=>i!==o)},r)]))}async importar(o){let t=await this.mesclarEm(this.favoritos,o.favoritos??[],_a);return await this.mesclarEm(this.pastas,o.pastas??[]),await this.mesclarEm(this.etiquetas,o.etiquetas??[]),await this.mesclarEm(this.vistosCol,o.vistos??[]),t}async mesclarEm(o,t,r=a=>a){let a=new Map((await o.listar()).map(c=>[c.id,c])),n=[],i=0,s=0;for(let c of t){let l=a.get(c.id);l?qt(c,l)&&(s+=1,n.push([c.id,r(c,l)])):(i+=1,n.push([c.id,r(c,void 0)]))}return await o.gravarVarios(n),{novos:i,atualizados:s}}async limpar(o=Date.now()){for(let t of[this.favoritos,this.pastas,this.etiquetas]){let r=await t.listar(),a=new Set(Rt(r,o,90).map(n=>n.id));await t.apagar(r.filter(n=>!a.has(n.id)).map(n=>n.id))}}aoMudarAtuais(o){return this.atuaisCol.aoMudar(o)}aoMudar(o){let t=[this.favoritos.aoMudar(o),this.pastas.aoMudar(o),this.etiquetas.aoMudar(o),this.vistosCol.aoMudar(o)];return()=>{for(let r of t)r()}}};function Ut(e,o){return e.ordem!==o.ordem?e.ordem<o.ordem?-1:1:le(e,o)}async function Bt(e,o,t){let r=await e.obter(t);if(!r||r.removidoEm!==void 0)return null;await o.adicionar({id:r.id,protocolo:r.protocolo,tipo:r.tipo,especificacao:r.especificacao,sigiloso:r.sigiloso});let a=await o.editar(t,{titulo:r.titulo,nota:r.nota,prazo:r.prazo,local:r.local,pasta:void 0,etiquetas:[]});return await e.remover([t]),a}function _a(e,o){if(!e.resumido||!o?.protocolo)return e;let t={...o,atualizadoEm:e.atualizadoEm,dispositivo:e.dispositivo,removidoEm:e.removidoEm,sigiloso:e.sigiloso??o.sigiloso};return delete t.resumido,t.removidoEm===void 0&&delete t.removidoEm,t.sigiloso?(delete t.especificacao,delete t.sigiloAConfirmar):delete t.sigiloso,t}var bo=class extends Error{constructor(o){super(`O conte\xFAdo descompactado passa de ${Math.round(o/1024/1024)} MB.`),this.name="ErroConteudoGrande"}};async function $a(e,o){let t=new Blob([e]).stream().pipeThrough(o);return new Uint8Array(await new Response(t).arrayBuffer())}function Ha(e){let o="";for(let t=0;t<e.length;t+=32768)o+=String.fromCharCode(...e.subarray(t,t+32768));return btoa(o).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"")}function Va(e){if(!/^[A-Za-z0-9_-]*$/.test(e))throw new Error("Conte\xFAdo fora do formato base64url.");let o=e.replace(/-/g,"+").replace(/_/g,"/").padEnd(Math.ceil(e.length/4)*4,"="),t=atob(o),r=new Uint8Array(t.length);for(let a=0;a<t.length;a++)r[a]=t.charCodeAt(a);return r}async function jt(e){let o=new TextEncoder().encode(JSON.stringify(e));return Ha(await $a(o,new CompressionStream("gzip")))}async function Ua(e,o){let t=new Blob([e]).stream().pipeThrough(new DecompressionStream("gzip")).getReader(),r=[],a=0;for(;;){let{done:s,value:c}=await t.read();if(s)break;if(a+=c.byteLength,a>o)throw await t.cancel().catch(()=>{}),new bo(o);r.push(c)}let n=new Uint8Array(a),i=0;for(let s of r)n.set(s,i),i+=s.byteLength;return n}async function Gt(e,o=8388608){let t=await Ua(Va(e),o);return JSON.parse(new TextDecoder().decode(t))}var Ba=e=>e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");function Xt(e,o,t=2e3){let r=[`<p>${Ba(e)}</p>`];for(let a=0;a<o.length;a+=t)r.push(`<p>${o.slice(a,a+t)}</p>`);return r.join(`
`)}function ja(e){let o=e;for(let t=0;t<2&&/&lt;\s*\/?p[\s>&]/i.test(o);t++)o=o.replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&quot;/g,'"').replace(/&amp;/g,"&");return o}function xo(e){let t=[...ja(e).matchAll(/<p\b[^>]*>([\s\S]*?)<\/p>/gi)].map(r=>(r[1]??"").trim()).slice(1);return!t.length||!t.every(r=>/^[A-Za-z0-9_-]+$/.test(r))?null:t.join("")}var qo="[_SEIPRO_",Kt=50;function Wt(e,o){let t=`${qo}${e}_`,r=`${t}${o}]`;if(r.length<=Kt)return r;let a=Kt-t.length-1-8-1;return`${t}${o.slice(0,a)}~${no(o).slice(0,8)}]`}async function de(e,o){return Xt(e,await jt(o))}async function ue(e,o=8388608){let t=xo(e);if(!t)return{invalido:"o texto n\xE3o tem os dados do SEI Pro (foi editado ou est\xE1 vazio)"};try{return{bruto:await Gt(t,o)}}catch(r){return r instanceof bo?{invalido:"os dados do texto descompactados passam do limite"}:{invalido:"os dados do texto est\xE3o corrompidos"}}}function Jt(e,o,t){let r=e;return r?.formato===o&&typeof r.versao=="number"&&r.versao>t}var k=e=>e&&typeof e=="object"&&!Array.isArray(e)?e:null,T=e=>typeof e=="string",U=e=>typeof e=="number"&&Number.isFinite(e),pe=/^\d{4}-\d{2}-\d{2}$/;var Ro=e=>T(e.id)&&e.id!==""&&U(e.atualizadoEm)&&T(e.dispositivo)&&(e.removidoEm===void 0||U(e.removidoEm));function Xa(e){let o=k(e),t=k(o?.referencia);if(!o||!t||!["ate","desde","desdeUteis"].includes(String(o.exibicao)))return!1;let r=t.de==="novoDocumento"?[t.desde]:t.de==="data"||t.de==="documento"?[t.data]:[];if(!r.length||!r.every(n=>T(n)&&pe.test(n))||t.de==="novoDocumento"&&!(Array.isArray(t.tipos)&&t.tipos.length&&t.tipos.every(T)))return!1;let a=k(o.vencimento);return o.vencimento===void 0||a?.em==="data"&&T(a.data)&&pe.test(a.data)||a?.em==="dias"&&U(a.n)&&Math.abs(a.n)<=3650&&(a.contagem==="corridos"||a.contagem==="uteis")}function Ka(e){let o=k(e);if(!o||!Ro(o)||!T(o.protocolo)||!T(o.ordem)||!U(o.criadoEm)||!Array.isArray(o.etiquetas))return null;let t={...o,etiquetas:o.etiquetas.filter(T)};t.prazo!==void 0&&!Xa(t.prazo)&&delete t.prazo;for(let n of["titulo","tipo","especificacao","pasta","nota"])t[n]!==void 0&&!T(t[n])&&delete t[n];ho(t.ordem)||(t.ordem="a0"),t.fixado!==!0&&delete t.fixado,t.sigiloso!==!0?delete t.sigiloso:delete t.especificacao;let r=k(t.lembrete);if(t.lembrete!==void 0&&(r&&T(r.em)&&pe.test(r.em)?t.lembrete=T(r.texto)?{em:r.em,texto:r.texto}:{em:r.em}:delete t.lembrete),t.documentos!==void 0){let n=Array.isArray(t.documentos)?t.documentos.map(k).filter(i=>!!i&&T(i.id)&&T(i.numero)&&T(i.titulo)).map(i=>({id:i.id,numero:i.numero,titulo:i.titulo,criadoEm:U(i.criadoEm)?i.criadoEm:0,...T(i.nota)?{nota:i.nota}:{}})):[];n.length?t.documentos=n:delete t.documentos}t.visto!==void 0&&!(k(t.visto)&&U(k(t.visto).quando))&&delete t.visto;let a=k(t.local);return t.local!==void 0&&!(a&&U(a.lat)&&U(a.lng)&&Math.abs(a.lat)<=90&&Math.abs(a.lng)<=180)&&delete t.local,t.sigiloAConfirmar!==!0&&delete t.sigiloAConfirmar,t.resumido!==!0&&delete t.resumido,t}var Zt=/^#[0-9a-f]{3,8}$/i,Wa=e=>{let o=k(e);if(!o||!Ro(o)||!T(o.nome)||!T(o.ordem))return null;let t={...o,ordem:ho(o.ordem)?o.ordem:"a0"};return t.cor!==void 0&&!(T(t.cor)&&Zt.test(t.cor))&&delete t.cor,t},Ja=e=>{let o=k(e);return!o||!Ro(o)||!T(o.nome)?null:{...o,cor:T(o.cor)&&Zt.test(o.cor)?o.cor:Lo(o.nome)}},Za=e=>{let o=k(e);return o&&Ro(o)&&k(o.visto)&&U(k(o.visto).quando)?o:null},Ya=e=>{let o=k(e);return!o||!T(o.host)||!T(o.login)?!1:o.lista==="pessoal"||o.lista==="unidade"&&T(k(o.unidade)?.id)&&k(o.unidade)?.id!==""};function Yt(e){let o=k(e);if(!o||o.formato!=="seipro-favoritos"||o.versao!==1||!Array.isArray(o.escopos))return null;let t=0,r=(n,i)=>{let s=Array.isArray(n)?n:[],c=s.map(i).filter(l=>l!==null);return t+=s.length-c.length,c},a=[];for(let n of o.escopos){let i=k(n);if(!i||!Ya(i.escopo)){t+=1;continue}a.push({escopo:i.escopo,favoritos:r(i.favoritos,Ka),pastas:r(i.pastas,Wa),etiquetas:r(i.etiquetas,Ja),vistos:r(i.vistos,Za)})}return{envelope:{formato:"seipro-favoritos",versao:1,escopos:a,gravadoEm:U(o.gravadoEm)?o.gravadoEm:0,dispositivo:T(o.dispositivo)?o.dispositivo:"",revisao:U(o.revisao)?o.revisao:0},descartados:t}}var or=100*1024,er=80*1024;function tr(e){return Wt("FAV",e.trim().toLowerCase())}var rr="Dados internos do SEI Pro (monitorados). N\xE3o use em documentos nem edite.";function Qt(e,o){return{id:e.id,protocolo:"",etiquetas:[],ordem:"a0",criadoEm:e.criadoEm,atualizadoEm:e.atualizadoEm,dispositivo:e.dispositivo,resumido:!0,...o}}async function ar(e,o,t,r=new Set){let{todos:a,pastas:n,etiquetas:i,vistos:s}=await e.instantaneoCompleto(),c=[];for(let l of a)if(!(l.sigiloAConfirmar&&!l.removidoEm)){if(l.sigiloso){r.has(l.id)&&c.push(Qt(l,{sigiloso:!0,...l.removidoEm!==void 0?{removidoEm:l.removidoEm}:{}}));continue}c.push(l.removidoEm!==void 0||l.resumido?Qt(l,l.removidoEm!==void 0?{removidoEm:l.removidoEm}:{}):l)}return{formato:"seipro-favoritos",versao:1,escopos:[{escopo:o,favoritos:c,pastas:n,etiquetas:i,vistos:s.filter(l=>c.some(u=>u.id===l.id&&!u.resumido&&!u.removidoEm))}],gravadoEm:t.agora,dispositivo:t.dispositivo,revisao:0}}function nr(e){return`Dados internos do SEI Pro \u2014 monitorados de ${e}. N\xE3o use em documentos nem edite: o SEI Pro regrava este texto sozinho.`}var Qa=(e,o)=>e.host===o.host&&e.login.toLowerCase()===o.login.toLowerCase()&&e.lista===o.lista&&(e.unidade?.id??"")===(o.unidade?.id??"");function ir(e,o){if(Jt(e,"seipro-favoritos",1))return{maisNovo:!0};let t=Yt(e);if(!t)return{invalido:"o texto n\xE3o est\xE1 no formato dos monitorados"};let r=t.envelope.escopos;return r.length!==1||!Qa(r[0].escopo,o)?{invalido:"o texto \xE9 de outro usu\xE1rio ou de outra unidade"}:{ok:t.envelope}}async function on(e,o){let t=await e.listarCaixa(o),r=new Map;for(let c of e.repos)for(let l of await c.ativos()){if(l.sigiloso||l.sigiloAConfirmar||l.resumido||t.has(l.id))continue;let u=r.get(l.id)??{protocolo:l.protocolo,repos:[]};u.repos.push(c),r.set(l.id,u)}let a=r.size,n=0,i=0,s=0;await e.progresso({feitos:n,total:a});for(let[c,l]of r){if(o.aborted)break;await e.progresso({feitos:n,total:a,atual:l.protocolo});try{let u=await e.localizar(l.protocolo,o);if(u!==c||t.has(u))throw new Error("O n\xFAmero n\xE3o leva a este processo.");let m=await e.lerProcesso(l.protocolo,o);m.abertoNaUnidade&&s++;for(let d of l.repos){let p=(await d.atuais()).get(c),f={...p,quando:Date.now(),fonte:"atualizar",qtdDocumentos:m.qtdDocumentos,ultimoAndamento:m.ultimoAndamento??p?.ultimoAndamento,abertoNaUnidade:m.abertoNaUnidade,recebidoNaLeitura:m.abertoNaUnidade?!0:void 0};await d.gravarAtual(c,f),(await d.vistos()).has(c)||await d.gravarVisto(c,f)}}catch{if(o.aborted)break;i++}n++,n<a&&!o.aborted&&await e.esperar(e.intervalo??3e3,o).catch(()=>{})}return await e.progresso({feitos:n,total:a,fim:!0,cancelado:o.aborted,erros:i,chegaram:s}),{lidos:n,erros:i,chegaram:s}}var sr=(e,o)=>`favoritos/atualizando/${e}|${o.toLowerCase()}`,en=(e,o)=>`favoritos/atualizarCancelar/${e}|${o.toLowerCase()}`;var No=class{constructor(o,t,r){this.criarDeps=o;this.gravarProgresso=t;this.ouvir=r}emCurso=null;async iniciar(){if(this.emCurso)throw Object.assign(new Error("J\xE1 h\xE1 uma atualiza\xE7\xE3o em andamento nesta aba."),{codigo:"EM_ANDAMENTO"});let o=new AbortController;this.emCurso=o;let t=this.ouvir?en(this.ouvir.host,this.ouvir.login):"",r=this.ouvir?.area.aoMudar(a=>{t in a&&a[t]?.novo!==void 0&&o.abort()});try{return await on({...this.criarDeps(),progresso:a=>this.gravarProgresso(a)},o.signal)}finally{r?.(),this.emCurso=null}}cancelar(){return this.emCurso?.abort(),!!this.emCurso}};function cr(e,o){return Me(e,o,"spro-fav")}var lr=new Set;var tn=null;function rn(e){let o=e.closest?.("dialog[open]");if(o)return o;let t=e.getRootNode?.(),r=e.ownerDocument;return t&&t!==r&&t.host?t:r.body??r.documentElement}function dr(e,o){let t=e;try{t?.CustomEvent&&t.dispatchEvent(new t.CustomEvent("spro-popover",{detail:{fundo:o}}))}catch{}}function ur(e,o,t){let r=e.ownerDocument,a=r.defaultView;rn(e).append(o);let n=!0,i=()=>{if(!n)return;let d=e.getBoundingClientRect?.();if(!d)return;let p=a?.innerHeight??0,f=a?.innerWidth??0,g=Math.min(t.largura??Math.max(d.width,t.larguraMinima??0),Math.max(180,f-16)),b=t.alinharDireita?d.right-g:d.left,E=Math.max(8,Math.min(b,f-g-8)),x=t.alturaMaxima??360;o.style.maxHeight="none";let C=Math.min(o.scrollHeight||x,x),B=p-d.bottom-8,to=d.top-8,$=tn?.()??!1,H=!$&&B<Math.min(C,200)&&to>B;o.style.left=`${E}px`,o.style.width=`${g}px`,o.style.maxHeight=`${$?x:Math.max(140,Math.min(x,H?to:B>140?B:x))}px`,o.classList.toggle("spro-flutuante-cima",H),H?(o.style.top="",o.style.bottom=`${p-d.top+4}px`):(o.style.bottom="",o.style.top=`${d.bottom+4}px`),dr(a,H?0:Math.ceil(d.bottom+4+C+12))},s=d=>{let p=d.composedPath?.()??[],f=d.target,g=b=>p.includes(b)||!!f&&!!b.contains?.(f);g(o)||g(e)||t.aoFechar()},c=()=>{e.isConnected?i():t.aoFechar()},l=d=>{d.target instanceof Node&&o.contains(d.target)||c()},u=()=>t.aoFechar();r.addEventListener("pointerdown",s,!0),a?.addEventListener("scroll",l,!0),a?.addEventListener("resize",c),a?.addEventListener("blur",u);let m={ancora:e,fechar:()=>t.aoFechar()};return lr.add(m),i(),{posicionar:i,fechar(){n&&(n=!1,lr.delete(m),r.removeEventListener("pointerdown",s,!0),a?.removeEventListener("scroll",l,!0),a?.removeEventListener("resize",c),a?.removeEventListener("blur",u),o.remove(),dr(a,0))}}}function pr(e,o){let t=I(o);if(!t)return[...e];let r=t.split(" "),a=[];return e.forEach((n,i)=>{let s=I(n.rotulo),c=`${s} ${I(n.descricao??"")}`;if(!r.every(u=>c.includes(u)))return;let l=s.startsWith(t)?0:s.split(" ").some(u=>u.startsWith(r[0]))?1:2;a.push({o:n,nota:l,i})}),a.sort((n,i)=>n.nota-i.nota||n.i-i.i).map(n=>n.o)}function an(e,o){let t=e.normalize("NFC"),r=I(o).split(" ").filter(Boolean);if(!r.length)return[{texto:t,marcado:!1}];let a=[...t],n="",i=[];a.forEach((l,u)=>{let m=l.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase();for(let d of m)n+=d,i.push(u)});let s=new Array(a.length).fill(!1);for(let l of r){let u=n.indexOf(l);if(!(u<0))for(let m=u;m<u+l.length;m++)s[i[m]]=!0}let c=[];return a.forEach((l,u)=>{let m=c[c.length-1];m&&m.marcado===s[u]?m.texto+=l:c.push({texto:l,marcado:s[u]})}),c}var nn=0;function yo(e){let o=`spro-combo-${++nn}`,t=()=>typeof e.opcoes=="function"?e.opcoes():e.opcoes,r=new Map,a=h=>t().find(y=>y.valor===h)??r.get(h),n=[...e.valor??[]],i=null,s="",c=0,l=[],u=null,m=v("button",{type:"button",class:`spro-combo${e.classe?` ${e.classe}`:""}`,role:"combobox","aria-haspopup":"listbox","aria-expanded":"false","aria-label":e.rotulo,title:e.rotulo}),d=()=>e.aoMudar?.([...n]);function p(){let h=[];e.icone&&h.push(S(e.icone,15));let y=n.map(D=>a(D)).filter(D=>!!D),A=v("span",{class:"spro-combo-texto"});if(!y.length)A.classList.add("spro-combo-vazio"),A.append(e.vazio??"Escolher\u2026");else{let D=y[0];D.cor&&A.append(v("span",{class:"spro-combo-cor",style:`background:${D.cor}`})),A.append(v("span",{class:"spro-combo-rotulo"},D.rotulo)),y.length>1&&A.append(v("span",{class:"spro-combo-mais"},`+${y.length-1}`))}h.push(A,S("chevron",14)),m.classList.toggle("spro-combo-ativo",e.multiplo===!0&&y.length>0),m.replaceChildren(...h)}let f=()=>e.busca??(t().length>7||!!e.multiplo||!!e.criar);function g(h){if(e.multiplo){n=n.includes(h.valor)?n.filter(A=>A!==h.valor):[...n,h.valor],d(),p(),C();return}let y=n.length!==1||n[0]!==h.valor;n=[h.valor],p(),H(!0),y&&d()}async function b(){if(!e.criar)return;let h=s.trim();if(!h)return;let y=await e.criar(h);if(y){if(r.set(y.valor,y),s="",i){let A=i.querySelector(".spro-combo-busca");A&&(A.value="")}e.multiplo&&n.includes(y.valor)?C():g(y)}}function E(h,y){let A=n.includes(h.valor),D=v("span",{class:"spro-combo-op-rotulo"});for(let M of an(h.rotulo,s))D.append(M.marcado?v("mark",{},M.texto):M.texto);let N=v("li",{role:"option",id:`${o}-op-${y}`,class:`spro-combo-op${y===c?" spro-combo-op-ativa":""}`,"data-valor":h.valor,"aria-selected":A?"true":"false"},e.multiplo?v("span",{class:"spro-combo-caixa","aria-hidden":"true"},A?S("check",12):null):null,h.cor?v("span",{class:"spro-combo-cor",style:`background:${h.cor}`}):null,h.icone?S(h.icone,15):null,v("span",{class:"spro-combo-op-textos"},D,h.descricao?v("span",{class:"spro-combo-op-desc"},h.descricao):null),h.contagem!==void 0?v("span",{class:"spro-combo-conta"},String(h.contagem)):null,!e.multiplo&&A?v("span",{class:"spro-combo-marca"},S("check",14)):null);return N.addEventListener("pointerdown",M=>M.preventDefault()),N.addEventListener("click",()=>{c=y,g(h)}),N.addEventListener("pointermove",()=>{c!==y&&(c=y,x())}),N}function x(){if(!i)return;let h=[...i.querySelectorAll('[role="option"]')];h.forEach((N,M)=>{N.classList.toggle("spro-combo-op-ativa",M===c)});let y=h[c],D=i.querySelector(".spro-combo-busca")??i.querySelector('[role="listbox"]');y?(D?.setAttribute("aria-activedescendant",y.id),y.scrollIntoView?.({block:"nearest"})):D?.removeAttribute("aria-activedescendant")}function C(){if(!i)return;l=pr(t(),s),c>=l.length&&(c=Math.max(0,l.length-1)),i.querySelector('[role="listbox"]').replaceChildren(...l.map(E));let y=i.querySelector(".spro-combo-extras");y.replaceChildren();let A=s.trim();l.length||y.append(v("p",{class:"spro-combo-nada"},A?"Nada encontrado.":"Nenhuma op\xE7\xE3o."));let D=t().some(M=>I(M.rotulo)===I(A));if(e.criar&&A&&!D){let M=v("button",{type:"button",class:"spro-combo-criar"},S("mais",14),v("span",{},e.rotuloCriar?e.rotuloCriar(A):`Criar \u201C${A}\u201D`));M.addEventListener("pointerdown",O=>O.preventDefault()),M.addEventListener("click",()=>void b()),y.append(M)}let N=i.querySelector(".spro-combo-rodape");if(N){let M=l.filter(io=>!n.includes(io.valor)),O=v("button",{type:"button",class:"spro-combo-acao",disabled:!A||!M.length},`Marcar os filtrados${A&&M.length?` (${M.length})`:""}`);O.addEventListener("click",()=>{n=[...n,...M.map(io=>io.valor)],d(),p(),C()});let Uo=v("button",{type:"button",class:"spro-combo-acao spro-combo-limpar",disabled:!n.length},"Limpar");Uo.addEventListener("click",()=>{n=[],d(),p(),C()}),N.replaceChildren(v("span",{class:"spro-combo-total"},n.length?`${n.length} marcado${n.length>1?"s":""}`:""),O,Uo)}x()}let B=()=>u?.posicionar();function to(h){let y=l.length,A=h.target,D=i?[...i.querySelectorAll(".spro-combo-rodape button:not(:disabled)")]:[],N=!!A?.closest?.(".spro-combo-rodape, .spro-combo-criar");if(h.key==="Tab"){let O=D.indexOf(A);if(!h.shiftKey&&O<D.length-1)D[O+1]?.focus();else if(h.shiftKey&&O>=0)O>0?D[O-1]?.focus():(i?.querySelector(".spro-combo-busca")??i?.querySelector('[role="listbox"]'))?.focus();else{H(!0);return}h.preventDefault(),h.stopPropagation();return}if(N&&h.key!=="Escape")return;let M=!i?.querySelector(".spro-combo-busca");if(M&&h.key===" "){let O=l[c];O&&g(O),h.preventDefault(),h.stopPropagation();return}if(M&&h.key.length===1&&!h.ctrlKey&&!h.metaKey&&!h.altKey){let O=I(h.key),io=[...l.keys()].map(Bo=>(c+1+Bo)%Math.max(1,y)).find(Bo=>I(l[Bo]?.rotulo??"").startsWith(O));io!==void 0&&(c=io,x()),h.preventDefault(),h.stopPropagation();return}switch(h.key){case"ArrowDown":c=y?(c+1)%y:0,x();break;case"ArrowUp":c=y?(c-1+y)%y:0,x();break;case"Home":if(h.target?.classList?.contains("spro-combo-busca")&&s)return;c=0,x();break;case"End":if(h.target?.classList?.contains("spro-combo-busca")&&s)return;c=Math.max(0,y-1),x();break;case"Enter":{let O=l[c];O?g(O):b();break}case"Escape":H(!0);break;case"Backspace":if(!e.multiplo||s||!n.length)return;n=n.slice(0,-1),d(),p(),C();break;default:return}h.preventDefault(),h.stopPropagation()}function $(h=""){if(i)return;s=h,c=h?0:(()=>{let N=pr(t(),s).findIndex(M=>M.valor===n[n.length-1]);return N<0?0:N})();let A=f()?v("input",{type:"text",class:"spro-combo-busca",placeholder:e.criar?"Buscar ou criar\u2026":"Buscar\u2026","aria-label":`Filtrar ${e.rotulo.toLowerCase()}`,"aria-controls":`${o}-lista`,"aria-autocomplete":"list",autocomplete:"off",spellcheck:"false",value:h}):null;if(A&&(A.value=h,A.addEventListener("input",()=>{s=A.value,c=0,C(),B()})),i=v("div",{class:`spro-combo-pop${e.multiplo?" spro-combo-pop-multi":""}`},A?v("div",{class:"spro-combo-cabeca"},S("busca",15),A):null,v("ul",{role:"listbox",id:`${o}-lista`,class:"spro-combo-lista",tabindex:A?void 0:"-1","aria-label":e.rotulo,"aria-multiselectable":e.multiplo?"true":void 0}),v("div",{class:"spro-combo-extras"}),e.multiplo?v("div",{class:"spro-combo-rodape"}):null),i.addEventListener("keydown",to),u=ur(m,i,{larguraMinima:e.larguraLista??220,alturaMaxima:360,aoFechar:()=>H(!1)}),m.setAttribute("aria-expanded","true"),m.setAttribute("aria-controls",`${o}-lista`),m.classList.add("spro-combo-aberto"),C(),B(),!i)return;(A??i.querySelector('[role="listbox"]'))?.focus?.({preventScroll:!0}),A&&h&&A.setSelectionRange?.(h.length,h.length)}function H(h=!1){i&&(u?.fechar(),u=null,i=null,s="",m.setAttribute("aria-expanded","false"),m.removeAttribute("aria-controls"),m.classList.remove("spro-combo-aberto"),h&&m.focus?.({preventScroll:!0}))}return m.addEventListener("click",()=>i?H(!0):$()),m.addEventListener("keydown",h=>{i||(h.key==="ArrowDown"||h.key==="ArrowUp"?(h.preventDefault(),$()):h.key.length===1&&h.key!==" "&&!h.ctrlKey&&!h.metaKey&&!h.altKey&&f()&&(h.preventDefault(),$(h.key)))}),p(),{el:m,valor:()=>[...n],definir(h,y=!1){n=[...h],p(),C(),y&&d()},atualizar(){p(),C()},abrir:$,fechar:()=>H(!1)}}function mr(e,o,t,r="spro-campo"){let a=[["",o?`Lembrete em ${o.em.split("-").reverse().join("/")}`:"Sem lembrete"],["1","Lembrar amanh\xE3"],["7","Lembrar em 1 semana"],["30","Lembrar em 1 m\xEAs"],...o?[["0","Tirar o lembrete"]]:[]],n=v("select",{class:r,"aria-label":"Lembrete"},...a.map(([i,s])=>v("option",{value:i},s)));return n.addEventListener("change",()=>{let i=n.value;i!==""&&t(i==="0"?void 0:{...o,em:fo(e,Number(i))})}),n}function fr(e,o,t){let r=o,a=i=>Eo(fo(e,i)),n=yo({rotulo:"Lembrete",icone:"sino",vazio:"Sem lembrete",busca:!1,larguraLista:240,opcoes:()=>[...r?[{valor:"atual",rotulo:`Lembrete em ${Eo(r.em)}`,icone:"sino"}]:[],{valor:"1",rotulo:"Amanh\xE3",descricao:a(1),icone:"calendario"},{valor:"7",rotulo:"Em 1 semana",descricao:a(7),icone:"calendario"},{valor:"30",rotulo:"Em 1 m\xEAs",descricao:a(30),icone:"calendario"},...r?[{valor:"0",rotulo:"Tirar o lembrete",icone:"fechar"}]:[]],valor:r?["atual"]:[],aoMudar:i=>{let s=i[0];!s||s==="atual"||(r=s==="0"?void 0:{...r,em:fo(e,Number(s))},n.definir(r?["atual"]:[]),t(r))}});return n.el}var sn=`:host{all:initial}
.fav-balao{box-sizing:border-box;width:340px;display:grid;gap:10px;padding:14px;font:13px/1.4 var(--spro-fonte);color:var(--spro-texto);background:var(--spro-fundo);border:1px solid var(--spro-borda);border-radius:var(--spro-raio-xg);box-shadow:var(--spro-sombra-3);animation:spro-surgir 160ms var(--spro-curva)}
.fav-balao-topo{display:flex;align-items:center;gap:10px}
.fav-balao-estrela{display:inline-flex;align-items:center;justify-content:center;width:30px;height:30px;border-radius:var(--spro-raio);color:var(--spro-estrela);background:color-mix(in srgb,var(--spro-estrela) 16%,transparent)}
.fav-balao-titulo{flex:1;min-width:0;display:grid;line-height:1.25}
.fav-balao-titulo strong{font-size:14px}
.fav-balao-titulo span{font-size:11.5px;color:var(--spro-suave);font-variant-numeric:tabular-nums;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.fav-campo{display:grid;gap:5px}
.fav-rotulo{font-size:11.5px;font-weight:600;color:var(--spro-suave);letter-spacing:.01em}
.fav-campo .spro-combo{width:100%}
.fav-campo .spro-combo-ativo{color:var(--spro-texto);background:var(--spro-fundo);border-color:var(--spro-borda-forte)}
.fav-chips-sel{display:flex;flex-wrap:wrap;gap:5px}
.fav-chips-sel:empty{display:none}
.fav-chips-sel .spro-chip .spro-icone{opacity:.6}
.fav-balao-rodape{display:flex;justify-content:flex-end;padding-top:2px}
textarea.spro-campo{resize:vertical;width:100%}`;function cn(e){let o=e.favorito,t=[...e.etiquetas],r=async d=>{o=await e.editar(d)},a=(d,p)=>v("button",{type:"button","aria-pressed":String(e.lista===p),title:p==="pessoal"?"Mover para a sua lista Pessoal":`Mover para a lista da ${d}`,onclick:()=>{e.lista!==p&&e.moverPara(p)}},d),n=e.siglaUnidade?v("div",{class:"spro-segmentado fav-balao-listas",role:"group","aria-label":"Lista"},a(e.siglaUnidade,"unidade"),a("Pessoal","pessoal")):null,i=[...e.pastas],s=yo({rotulo:"Pasta",icone:"pasta",vazio:"(sem pasta)",busca:!0,opcoes:()=>[{valor:"",rotulo:"(sem pasta)"},...i.map(d=>({valor:d.id,rotulo:d.nome,cor:d.cor}))],valor:o.pasta?[o.pasta]:[],criar:async d=>{let p=await e.criarPasta(d.slice(0,60));return i=[...i.filter(f=>f.id!==p.id),p],{valor:p.id,rotulo:p.nome,cor:p.cor}},rotuloCriar:d=>`Criar a pasta \u201C${d}\u201D`,aoMudar:d=>void r({pasta:d[0]||void 0}),larguraLista:260}),c=v("div",{class:"fav-chips-sel"}),l=yo({rotulo:"Etiquetas",icone:"etiqueta",vazio:"Nenhuma",multiplo:!0,opcoes:()=>t.map(d=>({valor:d.id,rotulo:d.nome,cor:d.cor})),valor:o.etiquetas.filter(d=>t.some(p=>p.id===d)),criar:async d=>{let p=await e.criarEtiqueta(d.slice(0,40));return t=[...t.filter(f=>f.id!==p.id),p],{valor:p.id,rotulo:p.nome,cor:p.cor}},rotuloCriar:d=>`Criar a etiqueta \u201C${d}\u201D`,aoMudar:d=>{u();let p=o.etiquetas.filter(f=>!t.some(g=>g.id===f));r({etiquetas:[...d,...p]})},larguraLista:260}),u=()=>c.replaceChildren(...l.valor().map(d=>{let p=t.find(f=>f.id===d);return v("button",{type:"button",class:"spro-chip",style:`--cor:${p?.cor??"#ccc"}`,title:"Tirar esta etiqueta","aria-label":`Tirar a etiqueta ${p?.nome??""}`,onclick:()=>l.definir(l.valor().filter(f=>f!==d),!0)},p?.nome??"",S("fechar",11))}));u();let m=v("textarea",{class:"spro-campo",rows:"2",maxlength:String(2e3),placeholder:"Nota pessoal","aria-label":"Nota",value:o.nota??""});return m.addEventListener("change",()=>void r({nota:m.value})),v("div",{class:"fav-balao",role:"dialog","aria-label":`Monitorado ${o.protocolo}`},v("div",{class:"fav-balao-topo"},v("span",{class:"fav-balao-estrela"},S("alvoAtivo",16)),v("span",{class:"fav-balao-titulo"},v("strong",{},"Monitorado"),v("span",{},o.protocolo)),n,v("button",{type:"button",class:"spro-botao-icone pequeno","aria-label":"Fechar",onclick:()=>e.fechar()},S("fechar",14))),v("div",{class:"fav-campo"},v("span",{class:"fav-rotulo"},"Pasta"),s.el),v("div",{class:"fav-campo"},v("span",{class:"fav-rotulo"},"Etiquetas"),l.el,c),v("label",{class:"fav-campo"},v("span",{class:"fav-rotulo"},"Nota"),m),e.hoje?v("div",{class:"fav-campo"},v("span",{class:"fav-rotulo"},"Lembrete"),fr(e.hoje,o.lembrete,d=>void r({lembrete:d}))):null,v("div",{class:"fav-balao-rodape"},v("button",{type:"button",class:"spro-botao primario",onclick:()=>e.fechar()},S("check",14),"Pronto")))}var zo=null;function vr(e,o,t){zo?.();let r=e.ownerDocument,a=r.defaultView,n=r.createElement("div");n.setAttribute("data-tema",o.temaEscuro?"escuro":"claro");let i=n.attachShadow({mode:"open"}),s=r.createElement("style");s.textContent=`${t}
${sn}`;let c=f=>{f.composedPath().includes(n)||u()},l=f=>{f.key==="Escape"&&!i.querySelector(".spro-combo-pop")&&u()};function u(){n.remove(),r.removeEventListener("pointerdown",c,!0),r.removeEventListener("keydown",l,!0),zo===u&&(zo=null)}let m=cn({...o,fechar:u});i.append(s,m);let d=e.getBoundingClientRect(),p=Math.max(8,Math.min(d.left,(a?.innerWidth??1024)-340))+(a?.scrollX??0);return n.style.cssText=`position:absolute;z-index:2147483000;left:${Math.round(p)}px;top:${Math.round(d.bottom+(a?.scrollY??0)+4)}px`,r.body.append(n),r.addEventListener("pointerdown",c,!0),r.addEventListener("keydown",l,!0),m.querySelector(".spro-combo")?.focus(),zo=u,u}function gr(e,o){let t=e.querySelector("#divBotoesControleProcessos, #divComandos");if(!t||t.querySelector(".spro-fav-botao"))return null;let r=v("a",{href:"#",role:"button",class:"botaoSEI spro-fav-botao",title:"Monitorados","aria-label":"Monitorados",tabindex:"452",style:"cursor: pointer;"},v("img",{class:"infraCorBarraSistema",src:o.url("icons/menu/favoritos.svg"),alt:"Monitorados",title:"Monitorados"}));return r.addEventListener("click",a=>{a.preventDefault(),o.destino()==="lateral"?o.abrirLateral():o.rolarAtePainel()}),t.append(r),r}function hr(e,o){let t=e.querySelector("#topmenu .spro-fav-estrela");if(!t||t.parentElement?.querySelector(".spro-fav-abrir"))return null;let r="Abrir a lista de monitorados no painel lateral",a=v("button",{type:"button",class:"spro-fav-abrir",title:r,"aria-label":r},S("painel",16));return a.addEventListener("click",n=>{n.preventDefault(),n.stopPropagation(),o.abrirLateral()}),t.after(a),a}function br(e,o,t){e({tipo:"abrirPainel",aba:"favoritos"}).catch(()=>o(t))}async function xr(e,o){let t=0;for(let r of e){let[a,n,i]=await Promise.all([r.ativos(),r.atuais(),r.vistos()]);t+=a.filter(s=>ce(s,o)||zt(i.get(s.id)??s.visto,n.get(s.id)).length>0).length}return t}function yr(e,o){e.querySelector(".spro-fav-contador")?.remove(),e.title=o?`Monitorados: ${o} ${o===1?"monitorado pede":"monitorados pedem"} aten\xE7\xE3o (lembrete ou novidade)`:"Monitorados",o&&e.append(v("span",{class:"spro-fav-contador","aria-hidden":"true"},String(o)))}function R(e,o=e.location?.href??"https://sei.invalido/sei/controlador.php"){return{url:o,status:200,get html(){return e.documentElement.outerHTML},doc:e}}function me(){try{return window.top?.document??document}catch{return document}}function Ar(e,o,t){let r=te(R(e,t));return r.usuario.login?{host:r.host,login:r.usuario.login.toLowerCase(),nome:r.usuario.nome,unidade:r.unidade.id?{id:r.unidade.id,sigla:r.unidade.sigla,nome:r.unidade.nome}:null,versao:r.versao,temaEscuro:o}:null}async function wr(e,o,t){let r=await e.unidade?.contem(o.id)?e.unidade:await e.pessoal.contem(o.id)?e.pessoal:null;r||(r=e.unidade??e.pessoal,await r.adicionar(o));let n=(await r.obter(o.id))?.documentos??[];if(n.some(s=>s.id===t.id))return await r.editar(o.id,{documentos:n.filter(s=>s.id!==t.id)}),!1;let i={id:t.id,numero:t.numero,titulo:t.titulo,criadoEm:Date.now()};return await r.editar(o.id,{documentos:[...n,i]}),!0}function Er(e,o){let t=o?"Tirar dos documentos monitorados":"Guardar este documento nos monitorados";e.setAttribute("aria-pressed",String(o)),e.setAttribute("aria-label",t),e.title=t,e.replaceChildren(S(o?"alvoAtivo":"alvo",15))}function Pr(e,o,t){let r=new Map(o.map(l=>[l.id,l])),a=()=>{let l=new Set([...e.querySelectorAll(".spro-fav-doc")].map(u=>u.dataset.doc));for(let u of o){let m=e.getElementById(`anchor${u.id}`);if(!m||l.has(u.id))continue;let d=m;for(;d.nextElementSibling?.classList.contains("action-doc");)d=d.nextElementSibling;let p=v("button",{type:"button",class:"spro-fav-doc","data-doc":u.id});Er(p,t.marcado(u.id)),d.after(p)}},n=()=>{for(let l of e.querySelectorAll(".spro-fav-doc"))Er(l,t.marcado(l.dataset.doc??""))};e.addEventListener("click",l=>{let u=l.target?.closest?.(".spro-fav-doc");if(!u)return;l.preventDefault(),l.stopPropagation();let m=r.get(u.dataset.doc??"");!m||u.getAttribute("aria-busy")==="true"||(u.setAttribute("aria-busy","true"),t.alternar(m).catch(d=>console.warn("[SEI Pro] favoritos: documento",d)).finally(()=>{u.removeAttribute("aria-busy"),n()}))}),a();let i=e.querySelector("#divArvore")??e.body,s,c=typeof MutationObserver=="function"?new MutationObserver(()=>{clearTimeout(s),s=setTimeout(a,150)}):null;return c?.observe(i,{childList:!0,subtree:!0}),{parar:()=>{c?.disconnect(),clearTimeout(s)},repintar:n}}var Sr=/^\d{4}-\d{2}-\d{2}$/;function Tr(e){if(e.modo==="nenhum"||!Sr.test(e.referencia))return;if(e.modo==="proximo"){let t=(e.tipos??"").split(",").map(a=>a.trim()).filter(Boolean),r=Math.trunc(Math.abs(e.n));return!t.length||!Number.isFinite(r)||r===0?void 0:{referencia:{de:"novoDocumento",tipos:t,desde:e.referencia},vencimento:{em:"dias",n:r,contagem:e.contagem},exibicao:"ate"}}let o=e.documento&&e.modo!=="data"?{de:"documento",idDocumento:e.documento.id,data:e.referencia}:{de:"data",data:e.referencia};if(e.modo==="data")return Sr.test(e.vencimento)?{referencia:o,vencimento:{em:"data",data:e.vencimento},exibicao:"ate"}:void 0;if(e.modo==="dias"){let t=Math.trunc(Math.abs(e.n));return!Number.isFinite(t)||t===0?void 0:{referencia:o,vencimento:{em:"dias",n:e.sentido==="antes"?-t:t,contagem:e.contagem},exibicao:"ate"}}return{referencia:o,exibicao:e.contagem==="uteis"?"desdeUteis":"desde"}}var Mr='#frmAtividadeListar[action*="acao=procedimento_enviar"]';function ln(e){return[...e.querySelectorAll(`${Mr} #selProcedimentos option`)].map(o=>{let t=(o.textContent??"").trim(),r=t.indexOf(" - "),a=(r>=0?t.slice(0,r):t).trim(),n=r>=0?t.slice(r+3).trim():"";return{id:o.value.trim(),protocolo:a,especificacao:n||void 0}}).filter(o=>/^\d+$/.test(o.id)&&o.protocolo)}async function Cr(e,o){let t=e.querySelector(Mr);if(!t||t.querySelector(".spro-fav-envio"))return null;let r=ln(e);if(!r.length)return null;let a=r.length>1,n=v("input",{type:"checkbox",id:"chkSproManterFavoritos",style:"appearance:auto;opacity:1;position:static;width:auto;height:auto;margin:0"});n.checked=r.every(p=>o.ativo(p.id));let i=v("select",{class:"infraSelect",style:"width:auto;min-width:12em"}),s=v("input",{type:"date",class:"infraText",style:"width:auto"}),c=v("div",{class:"spro-fav-envio-opcoes",style:"display:flex;flex-wrap:wrap;gap:12px;align-items:center;margin:6px 0 0 22px"},v("label",{style:"display:inline-flex;gap:6px;align-items:center"},"Pasta:",i),v("label",{style:"display:inline-flex;gap:6px;align-items:center"},"Prazo at\xE9:",s),mr(o.hoje(),void 0,p=>u({lembrete:p}),"infraSelect"));c.hidden=!n.checked;let l=async()=>{let[p,f]=await Promise.all([o.pastas(),o.obter(r[0].id)]);if(i.replaceChildren(v("option",{value:""},"(sem pasta)"),...p.map(g=>v("option",{value:g.id},g.nome))),!a&&f&&f.removidoEm===void 0){for(let g of i.options)g.selected=g.value===(f.pasta??"");s.value=f.prazo?.vencimento?.em==="data"?f.prazo.vencimento.data:""}};await l(),n.addEventListener("change",()=>{c.hidden=!n.checked,(async()=>{if(n.checked){for(let p of r)o.ativo(p.id)||await o.adicionar(p);await l()}else await o.remover(r.map(p=>p.id))})().catch(p=>console.warn("[SEI Pro] favoritos: n\xE3o foi poss\xEDvel gravar no envio",p))});let u=p=>void Promise.all(r.map(f=>o.editar(f.id,p))).catch(f=>console.warn("[SEI Pro] favoritos: n\xE3o foi poss\xEDvel gravar no envio",f));i.addEventListener("change",()=>u({pasta:i.value||void 0})),s.addEventListener("change",()=>{let p=s.value?Tr({modo:"data",referencia:o.hoje(),vencimento:s.value,n:0,contagem:"corridos",sentido:"depois"}):void 0;u({prazo:p})});let m=a?`Manter os ${r.length} processos em Monitorados`:"Manter processo em Monitorados",d=v("div",{class:"infraAreaDados spro-fav-envio",style:"position:relative;clear:both;height:auto;margin:10px 0;padding:0"},v("label",{for:"chkSproManterFavoritos",style:"display:inline-flex;gap:6px;align-items:center;cursor:pointer"},n,m),c);return t.append(d),d}var Dr="spro-fav-estilo",dn=`.spro-fav-estrela{background:none;border:0;padding:0 3px;margin:0 2px;cursor:pointer;color:#8a8a8a;vertical-align:middle;line-height:0}
.spro-fav-estrela:hover{color:#5f5f5f}
.spro-fav-estrela[aria-pressed="true"]{color:#e0a100}
.spro-fav-estrela[data-erro]{color:#c62828}
.spro-fav-estrela[aria-busy="true"]{opacity:.5}
.spro-fav-estrela:focus-visible{outline:2px solid #1a73e8;outline-offset:1px;border-radius:3px}
.spro-fav-abrir{background:none;border:0;padding:0 3px;margin:0 2px;cursor:pointer;color:#8a8a8a;vertical-align:middle;line-height:0}
.spro-fav-abrir:hover{color:#5f5f5f}
.spro-fav-abrir:focus-visible{outline:2px solid #1a73e8;outline-offset:1px;border-radius:3px}
.spro-fav-doc{background:none;border:0;padding:3px;margin:0;border-radius:5px;cursor:pointer;color:#a0a0a0;vertical-align:super;line-height:0}
.spro-fav-doc[aria-pressed="true"]{color:#e0a100}
.spro-fav-doc:hover{color:#fff;background:#017fff}
.spro-fav-doc[aria-busy="true"]{opacity:.5}
.spro-fav-doc:focus-visible{outline:2px solid #1a73e8;outline-offset:1px;border-radius:3px}
.seiSlim.dark-mode .spro-fav-estrela,.seiSlim.dark-mode .spro-fav-abrir{color:#9aa0a8}
.seiSlim.dark-mode .spro-fav-estrela:hover,.seiSlim.dark-mode .spro-fav-abrir:hover{color:#d0d3d8}
.seiSlim.dark-mode .spro-fav-estrela[aria-pressed="true"],.seiSlim.dark-mode .spro-fav-doc[aria-pressed="true"]{color:#f0b429}
.seiSlim.dark-mode .spro-fav-estrela[data-erro]{color:#ef5350}
.seiSlim.dark-mode .spro-fav-doc:not([aria-pressed="true"]):not(:hover){color:#9aa0a8}
.seiSlim.dark-mode .spro-fav-estrela svg,.seiSlim.dark-mode .spro-fav-estrela svg *,.seiSlim.dark-mode .spro-fav-abrir svg,.seiSlim.dark-mode .spro-fav-abrir svg *,.seiSlim.dark-mode .spro-fav-doc svg,.seiSlim.dark-mode .spro-fav-doc svg *{color:inherit}
.spro-fav-icone{display:inline-block;width:28px;height:24px;padding:0;margin:0;line-height:0;vertical-align:baseline}
.spro-fav-icone svg{display:block;width:20px;height:20px;margin:2px auto}
#topmenu .spro-fav-estrela,#topmenu .spro-fav-abrir{display:inline-block;width:27px;height:24px;padding:0;margin:0;line-height:0;vertical-align:baseline}
#topmenu .spro-fav-estrela svg,#topmenu .spro-fav-abrir svg{display:block;width:20px;height:20px;margin:2px auto}
.spro-fav-botao{position:relative}
.spro-fav-contador{position:absolute;top:-4px;right:-6px;min-width:16px;height:16px;padding:0 4px;border-radius:8px;background:#d93025;color:#fff;font:600 10px/16px sans-serif;text-align:center;box-sizing:border-box}
.spro-fav-titulo{display:flex!important;align-items:center;gap:8px}
.spro-fav-recolher{margin-left:4px;background:none;border:0;cursor:pointer;color:inherit;line-height:0;padding:2px;border-radius:4px}
.spro-fav-recolher:hover{background:rgb(127 127 127 / 14%)}
.spro-fav-recolher:focus-visible{outline:2px solid #1a73e8;outline-offset:1px}
@keyframes spro-fav-aviso{from{opacity:0;transform:translate(-50%,10px)}}
@media (prefers-reduced-motion:reduce){.spro-fav-aviso{animation:none!important}}`;function _(e){if(e.getElementById(Dr))return;let o=e.createElement("style");o.id=Dr,o.textContent=dn,(e.head??e.documentElement).append(o)}var Ir=new WeakMap;function oo(e,o,t){let r=Ir.get(e);if(r){r.push(t);return}let a=[t];Ir.set(e,a),e.addEventListener("click",n=>{let s=(n.composedPath?.()[0]??n.target)?.closest?.(".spro-fav-estrela");if(s&&(n.preventDefault(),n.stopPropagation(),s.getAttribute("aria-busy")!=="true"))for(let c of a){let l=c(s);if(l){un(o,l,s);return}}},!0)}async function un(e,o,t){t.setAttribute("aria-busy","true");try{await e.alternar(o,t),t.removeAttribute("data-erro")}catch(r){console.warn("[SEI Pro] favoritos: n\xE3o foi poss\xEDvel gravar",r);let a="N\xE3o foi poss\xEDvel gravar o monitorado. Tente de novo.";t.setAttribute("data-erro","1"),t.setAttribute("aria-label",a),t.title=a,e.carregar().catch(()=>{})}finally{t.removeAttribute("aria-busy")}}function Lr(e,o,t=200){let r=Date.now();return new Promise(a=>{let n=()=>{let i=e();if(i)return a(i);if(Date.now()-r>=o)return a(null);setTimeout(n,t)};n()})}function eo(e,o=!1){let t=v("button",{type:"button",class:o?"spro-fav-estrela spro-fav-icone":"spro-fav-estrela"});return W(t,e),t}function W(e,o){if(e.getAttribute("aria-pressed")===String(o)&&e.firstChild)return;let t=o?"Remover dos monitorados":"Adicionar aos monitorados";e.setAttribute("aria-pressed",String(o)),e.setAttribute("aria-label",t),e.title=t,e.replaceChildren(S(o?"alvoAtivo":"alvo",16))}var pn='#topmenu a[target="ifrVisualizacao"], #topmenu a[target="ifrConteudoVisualizacao"]';function mn(e,o){try{let t=X(R(e,o));return{id:t.idProcedimento,protocolo:t.protocolo,tipo:t.tipo||void 0,sigiloso:t.nivel==="sigiloso"}}catch{return null}}async function kr(e,o,t){let r=mn(e,t);if(!r)return!1;let a=await Lr(()=>e.querySelector(pn),1e4);if(!a||a.parentElement?.querySelector(".spro-fav-estrela"))return!1;_(e),oo(e,o,i=>i.closest("#topmenu")?r:null);let n=eo(o.ativo(r.id));return a.after(n),o.aoMudar(()=>W(n,o.ativo(r.id))),!0}var Or="tr[id^='P']";function qr(e){let o=oe(e,e.closest("#tblProcessosGerados")?"gerados":"recebidos");return o?.idProcedimento?{id:o.idProcedimento,protocolo:o.protocolo,tipo:o.tipo||void 0,especificacao:o.especificacao||void 0,sigiloso:o.sigiloso}:null}function Rr(e,o){_(e),oo(e,o,s=>{let c=s.closest(Or)??e.getElementById(`P${s.getAttribute("data-spro-id")??""}`);return c?qr(c):null});let t=()=>{for(let s of e.querySelectorAll(Or)){let c=s.querySelector(".spro-fav-estrela");if(c){W(c,o.ativo(s.id.slice(1)));continue}let l=qr(s),u=s.querySelectorAll("td")[1];!l||!u||u.prepend(eo(o.ativo(l.id),!0))}},r=!1,a=typeof MutationObserver=="function"?new MutationObserver(()=>{r||(r=!0,setTimeout(()=>{r=!1,t()},50))}):null,n=e.querySelector("#frmProcedimentoControlar")??e.body;a&&n&&a.observe(n,{childList:!0,subtree:!0});let i=o.aoMudar(t);return t(),{atualizar:t,desligar(){a?.disconnect(),i()}}}var Nr="#frmRelBlocoProtocoloLista .infraTable, #frmAcompanhamentoLista .infraTable, #frmProcedimentoSobrestar .infraTable";function zr(e){let o=e.querySelectorAll("td")[2]?.querySelector("a[href*='acao=procedimento_trabalhar']");if(!o)return null;let t=z(o.getAttribute("href")??"").get("id_procedimento"),r=P(o);return!t||!r?null:{id:t,protocolo:r,sigiloso:/Sigiloso/i.test(o.getAttribute("class")??"")}}function Fr(e,o){_(e),oo(e,o,a=>{let n=a.closest("tr");return n?.closest(Nr)?zr(n):null});let t=()=>{for(let a of e.querySelectorAll(Nr))for(let n of a.querySelectorAll("tr")){let i=zr(n),s=n.querySelectorAll("td")[2];if(!i||!s)continue;let c=s.querySelector(".spro-fav-estrela");c?W(c,o.ativo(i.id)):s.prepend(eo(o.ativo(i.id),!0))}},r=o.aoMudar(t);return t(),{atualizar:t,desligar:r}}var _r="table.pesquisaResultado tr.pesquisaTituloRegistro";function $r(e){let o=e.querySelector("a.protocoloNormal[href*='acao=procedimento_trabalhar']");if(!o)return null;let t=z((o.getAttribute("href")??"").replace(/&amp;/g,"&")).get("id_procedimento"),r=P(o);return!t||!r?null:{id:t,protocolo:r,tipo:o.getAttribute("title")?.trim()||void 0,sigiloAConfirmar:!0}}function Hr(e,o){_(e),oo(e,o,r=>{let a=r.closest("tr");return a?.matches(_r)?$r(a):null});let t=()=>{for(let r of e.querySelectorAll(_r)){let a=$r(r),n=r.querySelector("a.protocoloNormal[href*='acao=procedimento_trabalhar']");if(!a||!n)continue;let i=r.querySelector(".spro-fav-estrela");i?W(i,o.ativo(a.id)):n.after(eo(o.ativo(a.id)))}};o.aoMudar(t),t()}function fn(e,o){let t=o.replace(/\D/g,""),r=t?e.querySelector(`tr[id="P${t}"] a[href*="procedimento_trabalhar"]`):null;if(r)return{tipo:"linha",link:r};let a=e.querySelector("#frmProtocoloPesquisaRapida"),n=e.querySelector("#txtPesquisaRapida");return a&&n?{tipo:"pesquisa",form:a,campo:n}:null}function Vr(e,o,t,r){let a=fn(e,o);if(!a)throw new L("SEM_PESQUISA","Esta tela do SEI n\xE3o tem a pesquisa r\xE1pida para abrir o processo.");if(a.tipo==="linha")return r?e.defaultView?.open(a.link.href,"_blank","noopener"):a.link.click(),"linha";let n=a.form.getAttribute("target");a.campo.value=t,r&&a.form.setAttribute("target","_blank");try{typeof a.form.requestSubmit=="function"?a.form.requestSubmit():a.form.submit()}finally{n===null?a.form.removeAttribute("target"):a.form.setAttribute("target",n)}return"pesquisa"}var vn=/(\d{2})\/(\d{2})\/(\d{4})/;function fe(e){let o=[];for(let t of e.querySelectorAll("#tblDocumentos tr")){let r=t.querySelector('a[href*="id_documento="]');if(!r)continue;let a=/id_documento=(\d+)/.exec((r.getAttribute("href")??"").replace(/&amp;/g,"&"))?.[1],n=[...t.querySelectorAll("td")],i=n.findIndex(l=>l.contains(r)),s=(n[i+1]?.textContent??"").trim(),c=n.slice(i+2).map(l=>vn.exec(l.textContent??"")).find(Boolean);!a||!c||o.push({id:a,numero:(r.textContent??"").trim(),nome:s,data:`${c[3]}-${c[2]}-${c[1]}`})}return o}async function Ur(e,o){let t="arvore-aberta",r=o.arvoreAberta(e.id);if(!r){if(!e.buscar)throw new L("PRECISA_BUSCAR","Para listar os documentos, o SEI Pro precisa abrir a \xE1rvore deste processo. Se ele estiver aberto na sua unidade, o SEI pode registrar o andamento \u201CProcesso recebido\u201D em seu nome, ou marc\xE1-lo como visualizado, como se voc\xEA o abrisse.");t="busca",r=await o.arvoreBuscada(e.protocolo)}if(!r.acaoGerarPdf)throw new L("SEM_LISTA_DOCUMENTOS","O SEI n\xE3o oferece a lista de documentos deste processo para voc\xEA (falta \u201CGerar Arquivo PDF do Processo\u201D).");return{documentos:fe(await o.obter(r.acaoGerarPdf)),origem:t}}function ve(e){return{contexto:()=>e.ctx,...qe(e),abrirProcesso:o=>{let t=o??{};return Vr(e.doc,String(t.id??""),String(t.protocolo??""),t.novaAba===!0)},lerLegado:async()=>({local:mt(e.armazenamento),arquivo:e.lerArquivo?await e.lerArquivo():null}),atualizarForaDaUnidade:()=>{if(!e.atualizar)throw new L("SEM_ATUALIZAR","Abra uma tela do SEI para atualizar.");return e.atualizar.iniciar()},cancelarAtualizacao:()=>e.atualizar?.cancelar()??!1,sincronizarAgora:()=>{if(!e.sincronia)throw new L("SEM_SINCRONIA","A sincronia pelo Texto Padr\xE3o s\xF3 funciona numa tela do SEI com unidade.");return e.sincronia.agora()},apagarDoSei:()=>{if(!e.sincronia)throw new L("SEM_SINCRONIA","A sincronia pelo Texto Padr\xE3o s\xF3 funciona numa tela do SEI com unidade.");return e.sincronia.apagar()},documentosAssinados:o=>{let t=o??{};return Ur({id:String(t.id??""),protocolo:String(t.protocolo??""),buscar:t.buscar===!0},gn(e.doc))}}}function gn(e){let o=null,t=()=>(o??=new ao(e.location?.href??location.href,()=>R(e)),o);return{arvoreAberta(r){try{let a=e.querySelector("#ifrArvore")?.contentDocument;if(!a?.querySelector("#divArvore"))return null;let n=X(R(a,a.location.href));return n.idProcedimento===r?{acaoGerarPdf:ro(n,"procedimento_gerar_pdf")}:null}catch{return null}},async arvoreBuscada(r){let a=await t().arvore(r);return{acaoGerarPdf:ro(a,"procedimento_gerar_pdf")}},async obter(r){return(await t().http.obter(r)).doc}}}function Fo(e){let o=n=>e.querySelector(n)?.getAttribute("value")?.trim()??"",t=o("#hdnTipoVisualizacao");if(t&&t!=="R")return"visualiza\xE7\xE3o detalhada (use a resumida)";let r=o("#hdnMeusProcessos");if(r&&r!=="T")return"s\xF3 os processos atribu\xEDdos a voc\xEA";for(let[n,i]of[["hdnIdMarcador","filtro por marcador"],["hdnIdTipoProcedimento","filtro por tipo de processo"],["hdnIdTipoPrioridade","filtro por prioridade"]])if([...e.querySelectorAll(`input[id^="${n}"]`)].some(s=>(s.getAttribute("value")??"").trim()))return i;let a=[...e.querySelectorAll(".caixaFiltroControle")].map(n=>(n.textContent??"").trim()).filter(Boolean);if(a.length)return`filtro ativo: ${a.join(", ")}`;if(e.querySelector("#btnLiberarMarcador"))return"filtro por marcador";if(e.querySelector("#tblMarcadores"))return"caixa agrupada por marcadores";for(let n of["#tblProcessosRecebidos","#tblProcessosGerados"]){let i=e.querySelector(`${n} caption b`);if(i)return`filtro do painel: ${(i.textContent??"").trim()}`}return e.querySelector("#divFiltro")&&!e.querySelector("#lnkAtribuidosMim, #divFiltroMeusProcessos")?"filtro do painel de controle":null}var hn="data-seipro-favoritos";function Br(e){e.documentElement?.setAttribute(hn,"1")}function bn(e){if(!e.querySelector("#divRecebidos")||!e.querySelector("#divGerados"))return!1;for(let o of["#tblProcessosRecebidos","#tblProcessosGerados"]){let t=e.querySelector(o);if(!t)continue;let r=Number(/\((\d+)\s+registro/.exec(t.querySelector("caption")?.textContent??"")?.[1]??Number.NaN);if(!Number.isFinite(r)||r>t.querySelectorAll("tr[id^='P']").length)return!1}return!0}var xn=(e,o)=>!!e&&e.abertoNaUnidade===o.abertoNaUnidade&&e.naoVisualizado===o.naoVisualizado&&e.documentoNovo===o.documentoNovo&&e.atribuido===o.atribuido&&JSON.stringify(e.marcadores??[])===JSON.stringify(o.marcadores??[]);async function jr(e,o,t=Date.now()){if(o.escopo.lista!=="unidade")return 0;let r=new Map(et(R(e)).map(u=>[u.idProcedimento,u])),a=bn(e)&&!Fo(e),[n,i,s]=await Promise.all([o.ativos(),o.atuais(),o.vistos()]),c=[],l=[];for(let u of n){let m=r.get(u.id);m&&(u.sigiloAConfirmar||!!u.sigiloso!==m.sigiloso)&&await o.editar(u.id,m.sigiloso?{sigiloso:!0,especificacao:void 0,sigiloAConfirmar:void 0}:{sigiloso:void 0,sigiloAConfirmar:void 0});let d=i.get(u.id),p;if(m)p={...d,quando:t,fonte:"caixa",abertoNaUnidade:!0,naoVisualizado:m.novo,documentoNovo:m.documentoNovo,atribuido:m.atribuido||void 0,marcadores:m.sinais.filter(f=>/marcador/i.test(f)),recebidoNaLeitura:void 0};else if(a)p={...d,quando:t,fonte:"caixa",abertoNaUnidade:!1,naoVisualizado:void 0,documentoNovo:void 0,recebidoNaLeitura:void 0};else continue;xn(d,p)||c.push([u.id,p]),!s.has(u.id)&&!u.visto&&l.push([u.id,p])}c.length&&await o.gravarAtuais(c);for(let[u,m]of l)await o.gravarVisto(u,m);return c.length}async function Gr(e,o,t,r,a=Date.now()){let n;try{n=X(R(e,o))}catch{return 0}if(!n.idProcedimento)return 0;let i=[];for(let d of t)await d.contem(n.idProcedimento)&&i.push(d);if(!i.length)return 0;let s=n.nivel==="sigiloso";for(let d of i){let p=await d.obter(n.idProcedimento);p&&(p.sigiloAConfirmar||!!p.sigiloso!==s)&&await d.editar(n.idProcedimento,s?{sigiloso:!0,especificacao:void 0,sigiloAConfirmar:void 0}:{sigiloso:void 0,sigiloAConfirmar:void 0})}if(s)return 0;let c=G(n.links,"procedimento_consultar_historico")??/consultarAndamento\('([^']+)'/.exec(e.querySelector("#divConsultarAndamento a")?.getAttribute("onclick")??"")?.[1]?.replace(/&amp;/g,"&")??null,l;if(c)try{let d=Mo(await r(c))[0];d&&(l={data:d.data,unidade:d.unidade,descricao:d.descricao})}catch{}let u=[];for(let d of i){let p=await d.obter(n.idProcedimento);p?.prazo?.referencia.de==="novoDocumento"&&u.push({r:d,prazo:p.prazo})}let m=u.length?G(n.links,"procedimento_gerar_pdf"):null;if(m)try{let d=fe((await r(m)).doc);for(let{r:p,prazo:f}of u){let g=yn(f,d);g&&await p.editar(n.idProcedimento,{prazo:g})}}catch{}for(let d of i){let p=(await d.atuais()).get(n.idProcedimento),f={...p,quando:a,fonte:"arvore",qtdDocumentos:n.documentos.length,ultimoAndamento:l??p?.ultimoAndamento,recebidoNaLeitura:void 0};await d.gravarAtual(n.idProcedimento,f),await d.marcarVisto([n.idProcedimento])}return i.length}function yn(e,o){if(e.referencia.de!=="novoDocumento")return null;let{tipos:t,desde:r}=e.referencia,a=t.map(i=>I(i)).filter(Boolean),n=[...o].filter(i=>i.data>=r&&a.some(s=>I(i.nome).startsWith(s))).sort((i,s)=>i.data<s.data?-1:i.data>s.data?1:0)[0];return n?{...e,referencia:{de:"documento",idDocumento:n.id,data:n.data}}:null}var Xr="favoritesPro";function Kr(e){return De(e,Xr)}function Wr(e,o){return Oe(e,{...o,id:Xr,titulo:"Monitorados",tituloIframe:"Monitorados do SEI Pro",prefixo:"spro-fav",rotulos:{mostrar:"Mostrar monitorados",recolher:"Recolher monitorados"},icone:()=>{let t=S("alvoAtivo",20);return t.setAttribute("style","color:#e0a100"),t},estilo:_})}var _o=class{constructor(o){this.d=o;for(let t of[o.unidade,o.pessoal])t?.aoMudar(()=>this.agendarRecarga())}ids=new Set;ouvintes=new Set;agendado=!1;async carregar(){let o=await Promise.all([this.d.unidade?this.d.unidade.ativos():Promise.resolve([]),this.d.pessoal.ativos()]);this.ids=new Set(o.flat().map(t=>t.id)),this.avisar()}ativo(o){return this.ids.has(o)}aoMudar(o){return this.ouvintes.add(o),()=>this.ouvintes.delete(o)}async alternar(o,t){if(this.ids.has(o.id))return await Promise.all([this.d.unidade?.remover([o.id]),this.d.pessoal.remover([o.id])]),this.ids.delete(o.id),this.avisar(),!1;let r=this.d.unidade??this.d.pessoal,a=await r.adicionar(o);return this.ids.add(o.id),this.avisar(),this.d.aoAdicionar?.(a,r,t),!0}avisar(){for(let o of[...this.ouvintes])o()}agendarRecarga(){this.agendado||(this.agendado=!0,setTimeout(()=>{this.agendado=!1,this.carregar()},30))}};var An={maisNovo:"Os dados no SEI foram gravados por uma vers\xE3o mais nova do SEI Pro. Atualize a extens\xE3o neste computador; o texto n\xE3o foi alterado.",grandeDemais:(e,o)=>`Os dados ficaram grandes demais para o Texto Padr\xE3o (${e} KB de ${o} KB).`,pertoDoTeto:e=>`Os dados est\xE3o perto do limite do Texto Padr\xE3o (${e} KB).`,invalidoRegravado:e=>`O texto no SEI estava inv\xE1lido (${e}) e foi regravado a partir deste computador.`,mudouDuranteGravacao:"O texto no SEI mudou enquanto era gravado (outra pessoa sincronizando). Nova tentativa na pr\xF3xima rodada.",soLeitura:"Indispon\xEDvel nesta unidade: o SEI n\xE3o deixa gravar este Texto Padr\xE3o com o seu perfil."},En={definir:(e,o)=>setTimeout(e,o),cancelar:e=>clearTimeout(e)},Jr=5*6e4,wn=864e5,ge=(e,o)=>`seipro-${e}-sync|${o}`;function Zr(e,o){if(e===o)return!0;if(e===null||o===null)return!1;let t=xo(e),r=xo(o);return t!==null&&r!==null&&t===r}function Yr(e){let o=e?.codigo;return o==="SEI_SESSAO_EXPIRADA"?{estado:"erro",mensagem:"Sess\xE3o do SEI expirada. Entre de novo no SEI."}:o==="SEI_ACAO_INDISPONIVEL"?{estado:"indisponivel",mensagem:"Indispon\xEDvel nesta unidade: o SEI n\xE3o oferece Textos Padr\xE3o para voc\xEA aqui."}:{estado:"erro",mensagem:e instanceof Error?e.message:String(e)}}var Ao=class{constructor(o){this.d=o}espera;geracao=0;desistencias=0;parado=!1;filaStatus=Promise.resolve();get temporizador(){return this.d.temporizador??En}get atrasoEnvio(){return this.d.atrasoEnvio??15e3}agora(){return this.d.agora?.()??Date.now()}async status(){let o=this.d.adaptador.chaveStatus;return(await this.d.area.obter(o))[o]??{estado:"nunca",quando:0,pendente:!1}}gravarStatus(o){let t=this.filaStatus.then(async()=>{let r={...await this.status(),aguardandoPermissao:void 0,...o};return await this.d.area.gravar({[this.d.adaptador.chaveStatus]:r}),r});return this.filaStatus=t.catch(()=>{}),t}async marcarPendente(){this.geracao++,(await this.status()).pendente||await this.gravarStatus({pendente:!0})}agendarEnvio(){return this.parado=!1,this.armar(this.atrasoEnvio),this.marcarPendente()}parar(){this.parado=!0,this.espera!==void 0&&this.temporizador.cancelar(this.espera),this.espera=void 0}armar(o){this.espera!==void 0&&this.temporizador.cancelar(this.espera),this.espera=this.temporizador.definir(()=>{this.espera=void 0,this.enviarAgendado().catch(()=>{})},o)}rearmar(o){this.parado||this.armar(o)}async enviarAgendado(){let o=!(this.d.lerNoRecuo&&this.noRecuo(await this.status(),this.agora()));await this.executar(o)===null&&this.rearmar(this.atrasoEnvio)}noRecuo(o,t){return o.estado==="indisponivel"&&(o.indisponivelAte??0)>t}async sincronizar(o={}){return this.parado=!1,await this.executar(o.forcar===!0)??await this.status()}async executar(o){let t=this.agora(),r=await this.status(),a=this.d.intervaloPuxar??Jr,n=this.d.adaptador,i=ge(n.modulo,n.chaveStatus);if(!o){if(this.noRecuo(r,t))return!this.d.lerNoRecuo||r.ultimoPuxar&&t-r.ultimoPuxar<a?r:this.d.travar(i,()=>this.soLer(t));if(!r.pendente&&r.ultimoPuxar&&t-r.ultimoPuxar<a)return r}return this.d.travar(i,()=>this.rodada(t))}async soLer(o){try{let t=await this.d.destino.ler();if(t!==null){let r=await this.validar(t);"ok"in r&&await this.d.adaptador.importar(r.ok)}return this.gravarStatus({ultimoPuxar:o,tamanho:t?.length})}catch{return this.gravarStatus({ultimoPuxar:o})}}async desistir(o,t){this.desistencias++;let r=await this.gravarStatus({estado:"erro",quando:o,ultimoPuxar:o,pendente:!0,mensagem:t.mudouDuranteGravacao});return this.rearmar(this.esperaDepoisDeDesistir()),r}esperaDepoisDeDesistir(){let o=Math.min(this.atrasoEnvio*2**Math.max(0,this.desistencias-1),Jr);return o+Math.floor((this.d.aleatorio??Math.random)()*(o/2))}async concluir(o,t){this.desistencias=0;let r=await this.gravarStatus({...t,pendente:this.geracao!==o});return!r.pendente&&this.geracao!==o&&(r=await this.gravarStatus({pendente:!0})),r.pendente&&this.rearmar(this.atrasoEnvio),r}async validar(o){let t=await ue(o);return"invalido"in t?t:this.d.adaptador.validar(t.bruto)}async rodada(o){let t=this.d.adaptador,r={...An,...t.mensagens},a=this.d.releituras??3,n=!1;try{let i=await this.d.destino.ler();n=!0;for(let s=0;;s++){let c=null,l=null;if(i!==null){let g=await this.validar(i);if("maisNovo"in g)return this.gravarStatus({estado:"erro",quando:o,ultimoPuxar:o,mensagem:r.maisNovo});"ok"in g?(await t.importar(g.ok),c=g.ok):l=g.invalido}let u=this.geracao,m=await t.exportar({remoto:c,agora:o,invalido:l!==null});if(i!==null&&c!==null&&t.assinatura(m)===t.assinatura(c))return this.concluir(u,{estado:"ok",quando:o,ultimoOk:o,ultimoPuxar:o,mensagem:void 0,tamanho:i.length});if(i===null&&t.vazio?.(m))return this.concluir(u,{estado:"ok",quando:o,ultimoOk:o,ultimoPuxar:o,mensagem:void 0,tamanho:0});let d=await de(t.legivel(),m),p=Math.ceil(d.length/1024);if(d.length>t.teto)return this.gravarStatus({estado:"erro",quando:o,ultimoPuxar:o,tamanho:d.length,mensagem:r.grandeDemais(p,Math.round(t.teto/1024))});if(this.d.permitido&&!await this.d.permitido())return c!==null&&t.normalizar&&t.assinatura(m)===t.assinatura(await t.normalizar(c,o))?this.concluir(u,{estado:"ok",quando:o,ultimoOk:o,ultimoPuxar:o,mensagem:void 0,tamanho:i?.length??0}):this.gravarStatus({estado:"nunca",quando:o,ultimoPuxar:o,pendente:!1,mensagem:void 0,aguardandoPermissao:!0});i!==null&&l!==null&&await t.antesDeRegravarInvalido?.(l,i);let f=a>0?this.d.destino.gravarConferindo?.bind(this.d.destino):void 0;if(a>0&&!f){let g=await this.d.destino.ler();if(!Zr(g,i)){if(s+1>=a)return this.desistir(o,r);i=g;continue}}if(f){let g=await f(d,{anterior:i,mesmo:Zr});if(!g.gravado){if(s+1>=a)return this.desistir(o,r);i=g.atual;continue}}else await this.d.destino.gravar(d);return this.concluir(u,{estado:"ok",quando:o,ultimoOk:o,ultimoPuxar:o,tamanho:d.length,mensagem:l?r.invalidoRegravado(l):d.length>t.aviso?r.pertoDoTeto(p):void 0})}}catch(i){let s=Yr(i);return s.estado==="indisponivel"&&n&&(s.mensagem=r.soLeitura),this.gravarStatus({estado:s.estado,mensagem:s.mensagem,quando:o,indisponivelAte:s.estado==="indisponivel"?o+wn:void 0})}}};function he(e){let o=0;for(let t of e.querySelectorAll('select#selTextoPadrao option, select[name="selTextoPadrao"] option'))(t.textContent??"").trim().startsWith(qo)&&(t.remove(),o++);return o}var $o=class{constructor(o){this.d=o}motor=null;pararMudancas=null;pararConsentimento=null;ultimoEstado=null;criarMotor(){let o=this.d.armazem(),t={ler:()=>o.ler(),gravar:r=>o.gravar(r)};return o.gravarConferindo&&(t.gravarConferindo=(r,a)=>o.gravarConferindo(r,a)),new Ao({adaptador:this.d.adaptador,destino:t,area:this.d.area,travar:this.d.travar,agora:this.d.agora,atrasoEnvio:this.d.atrasoEnvio,intervaloPuxar:this.d.intervaloPuxar,releituras:this.d.releituras,lerNoRecuo:this.d.lerNoRecuo,permitido:this.d.permitido??(async()=>await this.d.consentimento.estado()==="ligado")})}rodar(o){return this.motor??=this.criarMotor(),this.motor.sincronizar({forcar:o})}ligar(o){this.pararMudancas||(this.motor??=this.criarMotor(),this.pararMudancas=this.d.aoMudarLocal(()=>void this.motor?.agendarEnvio()),o&&this.rodar(!1).catch(()=>{}))}desligar(){this.pararMudancas?.(),this.pararMudancas=null,this.motor?.parar()}async pendenteGravado(){let o=this.d.adaptador.chaveStatus;return(await this.d.area.obter(o))[o]?.pendente===!0}async iniciar(o){let t=await this.d.consentimento.estado();this.ultimoEstado=t,(t==="ligado"||this.d.lerSemConsentimento)&&this.ligar(o.puxar||await this.pendenteGravado()),this.pararConsentimento?.(),this.pararConsentimento=this.d.consentimento.aoMudar(()=>{this.d.consentimento.estado().then(r=>{let a=this.ultimoEstado;if(this.ultimoEstado=r,r==="ligado"){let n=this.pararMudancas!==null;this.ligar(!1),(!n||a!=="ligado")&&this.rodar(!0).catch(()=>{})}else this.d.lerSemConsentimento||this.desligar()})})}async puxar(){return this.pararMudancas?this.rodar(!1):null}agora(){return this.rodar(!0)}async apagar(){this.desligar(),await this.d.consentimento.definir("desligado");let o=this.d.armazem(),t=async()=>{let n=await o.excluir();return o.localizar&&await o.localizar()&&(n=await o.excluir()||n),n},r=ge(this.d.adaptador.modulo,this.d.adaptador.chaveStatus),a=this.d.travarEsperando?await this.d.travarEsperando(r,t):await t();return await this.d.area.gravar({[this.d.adaptador.chaveStatus]:{estado:"nunca",quando:Date.now(),pendente:!1}}),a}parar(){this.desligar(),this.pararConsentimento?.()}};function be(e){if(Array.isArray(e))return`[${e.map(be).join(",")}]`;if(e&&typeof e=="object"){let o=e;return`{${Object.keys(o).sort().filter(t=>o[t]!==void 0).map(t=>`${JSON.stringify(t)}:${be(o[t])}`).join(",")}}`}return JSON.stringify(e)}function Ho(e){return[...e].sort((o,t)=>o.id<t.id?-1:o.id>t.id?1:0)}function Qr(e){let o=be(e);return`${no(o)}${no(o.split("").reverse().join(""))}`}function oa(e){let o=[...e.escopos].map(t=>({k:so(t.escopo),f:Ho(t.favoritos),p:Ho(t.pastas),e:Ho(t.etiquetas)})).sort((t,r)=>t.k<r.k?-1:t.k>r.k?1:0);return Qr(o)}function ea(e){return{modulo:"favoritos",chaveStatus:e.chaveStatus,teto:e.teto??or,aviso:e.teto?e.teto*.8:er,legivel:()=>nr(e.nomeUsuario),validar:o=>ir(o,e.escopo),importar:async o=>{await e.repo.importar(o.escopos[0])},exportar:({remoto:o})=>ar(e.repo,e.escopo,e.carimbo(),new Set((o?.escopos[0]?.favoritos??[]).map(t=>t.id))),assinatura:oa,mensagens:{maisNovo:"Os monitorados no SEI foram gravados por uma vers\xE3o mais nova do SEI Pro. Atualize a extens\xE3o neste computador; o texto n\xE3o foi alterado.",grandeDemais:(o,t)=>`A lista ficou grande demais para o Texto Padr\xE3o (${o} KB de ${t} KB). Use a sincroniza\xE7\xE3o por arquivo.`,pertoDoTeto:o=>`A lista est\xE1 perto do limite do Texto Padr\xE3o (${o} KB).`}}}var Pn=e=>`favoritos/sync/tp/${so(e)}`,Vo=class{controle;constructor(o){let t=o.escopo.unidade?.id??"";this.controle=new $o({area:o.area,adaptador:ea({repo:o.repo,escopo:o.escopo,carimbo:o.carimbo,nomeUsuario:o.ctx.nome||o.ctx.login,chaveStatus:Pn(o.escopo)}),armazem:o.armazem,consentimento:{estado:async()=>Et(await Y(o.sync),o.ctx.host,o.ctx.login,t),definir:r=>wt(o.sync,o.ctx.host,o.ctx.login,t,r),aoMudar:r=>o.sync.aoMudar(a=>{Z in a&&r()})},aoMudarLocal:r=>o.repo.aoMudar(r),travar:o.travar,travarEsperando:o.travarEsperando,atrasoEnvio:o.atrasoEnvio,releituras:0})}iniciar(o){return this.controle.iniciar({puxar:o==="caixa"})}agora(){return this.controle.agora()}apagar(){return this.controle.apagar()}parar(){this.controle.parar()}};Br(document);var ta=window;if(!ta.__seiProFavoritos){ta.__seiProFavoritos=!0;let e=()=>void Tn().catch(o=>console.warn("[SEI Pro] favoritos:",o));document.readyState==="loading"?document.addEventListener("DOMContentLoaded",e,{once:!0}):e()}function Sn(e){return e.querySelector("#frmProcedimentoControlar")?"caixa":e.querySelector("table.pesquisaResultado")?"pesquisa":e.querySelector('#frmAtividadeListar[action*="acao=procedimento_enviar"]')?"enviar":e.querySelector("#topmenu")&&e.querySelector("#divArvore")?"arvore":e.querySelector("#frmRelBlocoProtocoloLista, #frmAcompanhamentoLista, #frmProcedimentoSobrestar")?"listas":null}async function Tn(){he(document);let e=window===window.top,o=Sn(document);if(!o&&!e||!await Ae("gerenciarfavoritos"))return;let t=me(),r=Ar(t,Go(localStorage),t.location?.href);if(!r)return;let a=Xo(t);a&&(r.corTema=a);let n=jo(chrome.storage.local,"local"),i=jo(chrome.storage.sync,"sync"),s=xt(chrome.runtime.getManifest()),c=()=>br(b=>chrome.runtime.sendMessage(b),b=>void window.open(b,"seiProPainel","popup,width=420,height=760"),chrome.runtime.getURL("html/painel.html#aba=favoritos")),l=await xe(n),u=()=>({agora:Date.now(),dispositivo:l}),m=ht(r),d={unidade:m.unidade?new uo(n,m.unidade,u):null,pessoal:new uo(n,m.pessoal,u)},p=e&&d.unidade&&m.unidade?new Vo({ctx:r,area:n,sync:i,repo:d.unidade,escopo:m.unidade,carimbo:u,travar:_e,travarEsperando:$e,armazem:()=>it(new ao(location.href,()=>R(document)),{nome:tr(r.login),descricao:rr})}):null;p&&await p.iniciar(o);let f=e?In(r,n,d):null;if(e&&Mn(r,n,p,f),!o)return;let g=new _o({...d,aoAdicionar:(b,E,x)=>void ra(b,E,x,d,r,i)});if(await g.carregar(),o==="caixa"){if(Rr(document,g),d.unidade&&jr(document,d.unidade).catch(b=>console.warn("[SEI Pro] favoritos: captura da caixa",b)),e){let b=await Cn(r,i,s,c,p,f);b&&Ln(b,[d.unidade,d.pessoal].filter(E=>!!E))}}else if(o==="arvore"){await kr(document,g,location.href)&&s&&hr(document,{url:E=>chrome.runtime.getURL(E),abrirLateral:c}),kn(d);let b=Do(location.href);Gr(document,location.href,[d.unidade,d.pessoal].filter(E=>!!E),E=>b.obter(E)).catch(E=>console.warn("[SEI Pro] favoritos: captura da \xE1rvore",E))}else if(o==="pesquisa")Hr(document,g);else if(o==="enviar"){let b=async x=>await d.unidade?.contem(x)?d.unidade:await d.pessoal.contem(x)?d.pessoal:null,E=d.unidade??d.pessoal;await Cr(document,{ativo:x=>g.ativo(x),adicionar:x=>E.adicionar(x),remover:x=>Promise.all([d.unidade?.remover(x),d.pessoal.remover(x)]),editar:async(x,C)=>(await b(x))?.editar(x,C),obter:async x=>(await b(x))?.obter(x),pastas:()=>E.pastasAtivas(),hoje:()=>mo()})}else Fr(document,g)}function Mn(e,o,t,r){let a=document.hasFocus()?Date.now():0,n=ze({area:o,chave:gt,conectar:()=>chrome.runtime.connect({name:vt}),tratadores:ve({doc:document,ctx:e,iframe:null,armazenamento:localStorage,lerArquivo:()=>re(),sincronia:t,atualizar:r}),estado:()=>({visivel:document.visibilityState==="visible",foco:a,chave:bt(e)})}),i=()=>{a=Date.now(),n.apresentar()};window.addEventListener("focus",i),document.addEventListener("visibilitychange",()=>document.visibilityState==="visible"?i():n.apresentar()),setInterval(()=>n.verificar(),5e3)}async function ra(e,o,t,r,a,n){if(!(await Y(n)).perguntarAoFavoritar)return;let i=o===r.unidade?"unidade":"pessoal",[s,c]=await Promise.all([o.pastasAtivas(),o.etiquetasAtivas()]);vr(t,{favorito:e,lista:i,siglaUnidade:r.unidade?a.unidade?.sigla??"Unidade":null,pastas:s,etiquetas:c,temaEscuro:a.temaEscuro,hoje:mo(),editar:l=>o.editar(e.id,l),criarPasta:l=>o.criarPasta(l),criarEtiqueta:l=>o.criarEtiqueta(l),moverPara:async l=>{let u=l==="unidade"?r.unidade:r.pessoal;if(!u||u===o)return;let m=await Bt(o,u,e.id);m&&await ra(m,u,t,r,a,n)}},He)}async function Cn(e,o,t,r,a,n){let i=await Y(o),s=null,c=()=>{let u=ae(i.exibir,t);u.abaixo&&!s?s=Dn(e,o,i.recolhido,a,n):!u.abaixo&&s&&(s.fechar(),s=null)};c();let l=gr(document,{url:u=>chrome.runtime.getURL(u),destino:()=>ae(i.exibir,t).lateral?"lateral":"abaixo",abrirLateral:r,rolarAtePainel:()=>{if(!s)return r();s.corpo.hidden&&s.painel.querySelector(".spro-fav-recolher")?.click(),s.painel.scrollIntoView({behavior:"smooth",block:"start"})}});return o.aoMudar(u=>{Z in u&&Y(o).then(m=>{i=m,c()})}),l}function Dn(e,o,t,r,a){let n=Wr(document,{urlApp:chrome.runtime.getURL("html/favoritos.html"),temaEscuro:e.temaEscuro,recolhido:t,ordem:Kr(localStorage),aoRecolher:c=>void ie(o,{recolhido:c})});if(!n)return null;let i=ve({doc:document,ctx:e,iframe:n.iframe,armazenamento:localStorage,lerArquivo:()=>re(),sincronia:r,atualizar:a,sobreposicao:n.sobreposicao,avisar:cr(document,e.temaEscuro)}),s=Re(n,()=>chrome.runtime.connect({name:ft}),i);return{painel:n.painel,corpo:n.corpo,fechar:s.fechar}}function In(e,o,t){return new No(()=>{let r=new ao(location.href,()=>R(document));return{repos:[t.unidade,t.pessoal].filter(a=>!!a),listarCaixa:async a=>{let n=await r.http.obter(r.linkMenu("procedimento_controlar"),{sinal:a,aceitarValidacao:!0}),i=Fo(n.doc);if(i)throw new L("CAIXA_FILTRADA",`A caixa do Controle de Processos est\xE1 com ${i}. Tire o filtro e tente de novo: sem a caixa inteira, o SEI Pro n\xE3o sabe quais processos est\xE3o na sua unidade.`);let s=await tt(r,{limite:Number.MAX_SAFE_INTEGER,sinal:a});if(s.processos.length<s.total)throw new L("CAIXA_INCOMPLETA","N\xE3o foi poss\xEDvel ler a caixa inteira; nada foi atualizado.");return new Set(s.processos.map(c=>c.idProcedimento))},localizar:async(a,n)=>(await r.localizar(a,{sinal:n})).idProcedimento,lerProcesso:async(a,n)=>{let i=await r.arvore(a,{sinal:n,forcar:!0}),s=ro(i,"procedimento_consultar_historico"),c=s?Mo(await r.http.obter(s,{sinal:n}))[0]:void 0;return{qtdDocumentos:i.documentos.length,abertoNaUnidade:!!ro(i,"procedimento_enviar"),ultimoAndamento:c?{data:c.data,unidade:c.unidade,descricao:c.descricao}:void 0}},esperar:(a,n)=>new Promise(i=>{let s=setTimeout(i,a);n.addEventListener("abort",()=>{clearTimeout(s),i()},{once:!0})})}},r=>o.gravar({[sr(e.host,e.login)]:{...r,quando:Date.now()}}),{area:o,host:e.host,login:e.login})}function Ln(e,o){let t=!1,r=()=>{t||(t=!0,setTimeout(()=>{t=!1,xr(o,mo()).then(a=>yr(e,a)).catch(()=>{})},100))};for(let a of o)a.aoMudar(r),a.aoMudarAtuais(r);r()}function kn(e){let o;try{o=X(R(document,location.href))}catch{return}if(!o.idProcedimento||!o.documentos.length)return;let t={id:o.idProcedimento,protocolo:o.protocolo,tipo:o.tipo||void 0,sigiloso:o.nivel==="sigiloso"},r=new Set,a=async()=>{let n=await e.unidade?.obter(t.id)??await e.pessoal.obter(t.id);r=new Set(n&&n.removidoEm===void 0?(n.documentos??[]).map(i=>i.id):[])};a().then(()=>{_(document);let n=Pr(document,o.documentos.map(i=>({id:i.id,numero:i.numero,titulo:i.titulo})),{marcado:i=>r.has(i),alternar:async i=>{await wr(e,t,i),await a()}});for(let i of[e.unidade,e.pessoal])i?.aoMudar(()=>void a().then(()=>n.repintar()))})}})();
