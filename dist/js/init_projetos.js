/* GERADO por projetos/build.mjs. NAO EDITE ESTE ARQUIVO. Rode: npm run build */
"use strict";(()=>{var cs="data-seipro-projetos";function wr(o){o.documentElement?.setAttribute(cs,"1")}wr(document);function ds(o){let e={};for(let[t,r]of Object.entries(o)){let a={};r&&"newValue"in r&&(a.novo=r.newValue),r&&"oldValue"in r&&(a.antigo=r.oldValue),e[t]=a}return e}function Fe(o,e){return{obter:(t=null)=>o.get(t),gravar:t=>o.set(t),remover:t=>o.remove(t),chaves:typeof o.getKeys=="function"?()=>o.getKeys():void 0,aoMudar(t){let r=(a,n)=>{n===e&&t(ds(a))};return chrome.storage.onChanged.addListener(r),()=>chrome.storage.onChanged.removeListener(r)}}}function Pr(o={}){let e=new Map(Object.entries(structuredClone(o))),t=new Set,r=a=>{if(Object.keys(a).length)for(let n of[...t])n(a)};return{async obter(a=null){let n=a===null?[...e.keys()]:typeof a=="string"?[a]:a,i={};for(let s of n)e.has(s)&&(i[s]=structuredClone(e.get(s)));return i},async gravar(a){let n={};for(let[i,s]of Object.entries(a))n[i]={antigo:e.get(i),novo:structuredClone(s)},e.set(i,structuredClone(s));r(n)},async remover(a){let n={};for(let i of typeof a=="string"?[a]:a)e.has(i)&&(n[i]={antigo:e.get(i)},e.delete(i));r(n)},async chaves(){return[...e.keys()]},aoMudar(a){return t.add(a),()=>t.delete(a)}}}function He(o=crypto){if(typeof o.randomUUID=="function")return o.randomUUID();let e=o.getRandomValues(new Uint8Array(16));e[6]=(e[6]??0)&15|64,e[8]=(e[8]??0)&63|128;let t=[...e].map(r=>r.toString(16).padStart(2,"0")).join("");return`${t.slice(0,8)}-${t.slice(8,12)}-${t.slice(12,16)}-${t.slice(16,20)}-${t.slice(20)}`}async function Ar(o,e="seipro/dispositivo"){let t=(await o.obter(e))[e];if(typeof t=="string"&&t)return t;let r=He();return await o.gravar({[e]:r}),r}var Sr=o=>String(o).padStart(2,"0");function co(o=new Date){return`${o.getFullYear()}-${Sr(o.getMonth()+1)}-${Sr(o.getDate())}`}function oo(o){let e=/^(\d{4})-(\d{2})-(\d{2})$/.exec(o);if(!e)throw new Error(`Data inv\xE1lida: ${o}`);return new Date(Number(e[1]),Number(e[2])-1,Number(e[3]),12)}function z(o,e){let t=oo(o);return t.setDate(t.getDate()+e),co(t)}function po(o,e){return Math.round((oo(e).getTime()-oo(o).getTime())/864e5)}function ve(o,e){let t=oo(o).getDay();return t!==0&&t!==6&&!e.has(o)}function At(o,e,t){let r=e<0?-1:1,a=o,n=Math.abs(e);for(;n>0;)a=z(a,r),ve(a,t)&&(n-=1);return a}function St(o,e,t){if(o===e)return 0;let r=e>o?1:-1,a=o,n=0;for(;a!==e;)a=z(a,r),ve(r>0?a:z(a,1),t)&&(n+=1);return n*r}function ps(o,e){let t=o;if(typeof o=="string"){if(!o.trim())return!0;try{t=JSON.parse(o)}catch{return!0}}if(!Array.isArray(t)||t.length===0)return!0;let a=t.map(n=>n?.configGeral).find(Array.isArray)?.find(n=>n?.name===e)?.value;return!(a===!1||a===0||a==="")}async function Dr(o,e=chrome.storage.sync){let t=await e.get("dataValues");return ps(t.dataValues,o)}function jr(o){try{return!!o.getItem("darkModePro")}catch{return!1}}function Mr(o){let e=o.defaultView;for(let t of[".infraCorBarraSistema","#divInfraBarraSistema","#divInfraBarraSistemaE"]){let r=o.querySelector(t);if(r)try{let a=us(e?.getComputedStyle?.(r).backgroundColor??"");if(a)return a}catch{}}}function ls(o){let e=/^#?([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})/i.exec(o);if(!e)return"#1f2328";let[t,r,a]=[e[1],e[2],e[3]].map(n=>Number.parseInt(n??"0",16));return(t*299+r*587+a*114)/1e3>140?"#1f2328":"#ffffff"}function us(o){let e=o.trim().toLowerCase(),t=null,r=/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/.exec(e);r&&(t=[r[1],r[2],r[3]].map(l=>Number.parseInt(l??"0",16)));let a=/^rgba?\(\s*(\d+)[,\s]+(\d+)[,\s]+(\d+)(?:[,\s/]+([\d.]+%?))?\s*\)$/.exec(e);if(a){if((a[4]===void 0?1:a[4].endsWith("%")?Number.parseFloat(a[4])/100:Number.parseFloat(a[4]))<.9)return null;t=[a[1],a[2],a[3]].map(m=>Number(m))}if(!t||t.some(l=>!Number.isFinite(l)||l<0||l>255))return null;let[n,i,s]=t,c=Math.max(n,i,s),d=Math.min(n,i,s);if(c===0||(c-d)/c<.25)return null;let p=[n,i,s];for(let l=0;l<12&&ls(Or(p))!=="#ffffff";l++)p=p.map(m=>Math.round(m*.88));return Or(p)}function Or(o){return`#${o.map(e=>e.toString(16).padStart(2,"0")).join("")}`}function b(o,e={},...t){let r=document.createElement(o);for(let[a,n]of Object.entries(e))n===void 0||n===!1||(typeof n=="function"?r.addEventListener(a.replace(/^on/,""),n):n===!0?r.setAttribute(a,""):a==="class"?r.className=n:a==="value"&&o==="textarea"?r.value=n:r.setAttribute(a,n));for(let a of t)a!=null&&a!==!1&&r.append(a);return r}var eo={fill:"currentColor",stroke:"none"},Ir="M12 3.2l2.7 5.5 6 .9-4.35 4.25 1 6L12 17l-5.35 2.85 1-6L3.3 9.6l6-.9z",Tr={estrela:[["path",{d:Ir}]],estrelaCheia:[["path",{d:Ir,fill:"currentColor"}]],pasta:[["path",{d:"M3.5 7.5a2 2 0 0 1 2-2h4l2 2h7a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2z"}]],etiqueta:[["path",{d:"M3.5 12.2V4.5a1 1 0 0 1 1-1h7.7l8.3 8.3a1 1 0 0 1 0 1.4l-7.1 7.1a1 1 0 0 1-1.4 0z"}],["circle",{cx:"8",cy:"8",r:"1.4",...eo}]],relogio:[["circle",{cx:"12",cy:"12",r:"9"}],["path",{d:"M12 7.2V12l3.2 1.9"}]],nota:[["path",{d:"M6 3.5h9l3.5 3.5v13.5H6z"}],["path",{d:"M9 11h6"}],["path",{d:"M9 15h6"}]],lixeira:[["path",{d:"M4.5 6.5h15"}],["path",{d:"M9.5 6.5V4.8c0-.7.6-1.3 1.3-1.3h2.4c.7 0 1.3.6 1.3 1.3v1.7"}],["path",{d:"M6.8 6.5 7.6 19c0 .8.7 1.5 1.5 1.5h5.8c.8 0 1.5-.7 1.5-1.5l.8-12.5"}]],lapis:[["path",{d:"M17.5 3.5a2.1 2.1 0 0 1 3 3L9 18l-4.5 1.5L6 15z"}],["path",{d:"M15 6l3 3"}]],fechar:[["path",{d:"M18 6 6 18"}],["path",{d:"M6 6l12 12"}]],mais:[["path",{d:"M12 5v14"}],["path",{d:"M5 12h14"}]],busca:[["circle",{cx:"11",cy:"11",r:"6.5"}],["path",{d:"M20.5 20.5l-4.8-4.8"}]],baixar:[["path",{d:"M12 3.5v11"}],["path",{d:"M7.5 10.2 12 14.7l4.5-4.5"}],["path",{d:"M4.5 19.5h15"}]],subir:[["path",{d:"M12 14.5v-11"}],["path",{d:"M7.5 7.8 12 3.3l4.5 4.5"}],["path",{d:"M4.5 19.5h15"}]],copiar:[["rect",{x:"8.5",y:"8.5",width:"12",height:"12",rx:"2"}],["path",{d:"M15.5 8.5V5.5a2 2 0 0 0-2-2h-8a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h3"}]],restaurar:[["path",{d:"M9 14 4 9l5-5"}],["path",{d:"M4 9h9a7 7 0 0 1 7 7v4"}]],check:[["path",{d:"M20 6.5 9.2 17.3 4 12.1"}]],alerta:[["path",{d:"M10.3 4.4 2.8 17.6a2 2 0 0 0 1.7 3h15a2 2 0 0 0 1.7-3L13.7 4.4a2 2 0 0 0-3.4 0z"}],["path",{d:"M12 9.5v4"}],["circle",{cx:"12",cy:"16.8",r:"1",...eo}]],menu:[["circle",{cx:"5",cy:"12",r:"1.4",...eo}],["circle",{cx:"12",cy:"12",r:"1.4",...eo}],["circle",{cx:"19",cy:"12",r:"1.4",...eo}]],alca:[["circle",{cx:"9",cy:"6",r:"1.3",...eo}],["circle",{cx:"15",cy:"6",r:"1.3",...eo}],["circle",{cx:"9",cy:"12",r:"1.3",...eo}],["circle",{cx:"15",cy:"12",r:"1.3",...eo}],["circle",{cx:"9",cy:"18",r:"1.3",...eo}],["circle",{cx:"15",cy:"18",r:"1.3",...eo}]],ajustes:[["path",{d:"M4 7h5"}],["path",{d:"M13 7h7"}],["circle",{cx:"11",cy:"7",r:"2.1"}],["path",{d:"M4 17h9"}],["path",{d:"M17 17h3"}],["circle",{cx:"15",cy:"17",r:"2.1"}]],setaCima:[["path",{d:"M12 19V6"}],["path",{d:"M6 12l6-6 6 6"}]],setaBaixo:[["path",{d:"M12 5v13"}],["path",{d:"M18 12l-6 6-6-6"}]],recolher:[["path",{d:"M6 15l6-6 6 6"}]],expandir:[["path",{d:"M6 9l6 6 6-6"}]],local:[["path",{d:"M12 21s-6.5-6.1-6.5-11a6.5 6.5 0 0 1 13 0c0 4.9-6.5 11-6.5 11z"}],["circle",{cx:"12",cy:"10",r:"2.3"}]],sino:[["path",{d:"M6.5 16.5V11a5.5 5.5 0 0 1 11 0v5.5l1.5 1.5h-14z"}],["path",{d:"M10 20.5a2 2 0 0 0 4 0"}]],documento:[["path",{d:"M7 3.5h7l4 4v13H7z"}],["path",{d:"M14 3.5v4h4"}]],painel:[["rect",{x:"3.5",y:"4.5",width:"17",height:"15",rx:"2"}],["path",{d:"M14.5 4.5v15"}]],atualizar:[["path",{d:"M19.5 12a7.5 7.5 0 1 1-2.2-5.3"}],["path",{d:"M19.5 4.5v4h-4"}]],nuvem:[["path",{d:"M7 18.5h10a4 4 0 0 0 .6-7.95A5.5 5.5 0 0 0 7 9.5a4.5 4.5 0 0 0 0 9z"}]],chevron:[["path",{d:"M7 9.5l5 5 5-5"}]],pino:[["path",{d:"M9.5 3.5h5l-.8 5.2 3.3 3.1v1.7H7v-1.7l3.3-3.1z"}],["path",{d:"M12 13.5v7"}]],pinoCheio:[["path",{d:"M9.5 3.5h5l-.8 5.2 3.3 3.1v1.7H7v-1.7l3.3-3.1z",fill:"currentColor"}],["path",{d:"M12 13.5v7"}]],filtro:[["path",{d:"M4 5.5h16l-6.2 7.3v5.4l-3.6 1.8v-7.2z"}]],ordenar:[["path",{d:"M7.5 4.5v15"}],["path",{d:"M4 16l3.5 3.5L11 16"}],["path",{d:"M16.5 19.5v-15"}],["path",{d:"M13 8l3.5-3.5L20 8"}]],mapa:[["path",{d:"M9 4.5 3.5 6.6v13l5.5-2.1 6 2.1 5.5-2.1v-13L15 6.6z"}],["path",{d:"M9 4.5v13"}],["path",{d:"M15 6.6v13"}]],olho:[["path",{d:"M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z"}],["circle",{cx:"12",cy:"12",r:"2.8"}]],camadas:[["path",{d:"M12 3.5 20.5 8 12 12.5 3.5 8z"}],["path",{d:"M3.5 12 12 16.5 20.5 12"}],["path",{d:"M3.5 16 12 20.5 20.5 16"}]],historico:[["path",{d:"M3.8 12.5A8.3 8.3 0 1 0 6.2 6"}],["path",{d:"M3.8 4.2v4.3h4.3"}],["path",{d:"M12 8v4.2l2.8 1.7"}]],pessoa:[["circle",{cx:"12",cy:"8",r:"3.6"}],["path",{d:"M5 20c.9-3.7 3.6-5.6 7-5.6s6.1 1.9 7 5.6"}]],predio:[["path",{d:"M5 20.5v-15a1 1 0 0 1 1-1h7.5a1 1 0 0 1 1 1v15"}],["path",{d:"M14.5 9.5H18a1 1 0 0 1 1 1v10"}],["path",{d:"M3 20.5h18"}],["path",{d:"M8.5 8.5h3"}],["path",{d:"M8.5 12h3"}],["path",{d:"M8.5 15.5h3"}]],brilho:[["path",{d:"M12 3.5l1.9 5.1 5.1 1.9-5.1 1.9L12 17.5l-1.9-5.1L5 10.5l5.1-1.9z"}],["path",{d:"M18.5 16.5v4"}],["path",{d:"M16.5 18.5h4"}]],calendario:[["rect",{x:"4",y:"5.5",width:"16",height:"15",rx:"2"}],["path",{d:"M4 10h16"}],["path",{d:"M8.5 3.5v4"}],["path",{d:"M15.5 3.5v4"}]],cadeado:[["rect",{x:"5.5",y:"10.5",width:"13",height:"10",rx:"2"}],["path",{d:"M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5"}]],saida:[["path",{d:"M14 4.5h4.5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H14"}],["path",{d:"M10 16l4-4-4-4"}],["path",{d:"M14 12H4.5"}]],planilha:[["rect",{x:"4",y:"4",width:"16",height:"16",rx:"2"}],["path",{d:"M4 9.5h16"}],["path",{d:"M4 15h16"}],["path",{d:"M10 9.5V20"}]],mover:[["path",{d:"M4.5 12h14"}],["path",{d:"M13.5 6.5 19 12l-5.5 5.5"}]],sol:[["circle",{cx:"12",cy:"12",r:"3.8"}],["path",{d:"M12 2.8v2M12 19.2v2M2.8 12h2M19.2 12h2M5.5 5.5l1.4 1.4M17.1 17.1l1.4 1.4M5.5 18.5l1.4-1.4M17.1 6.9l1.4-1.4"}]],teclado:[["rect",{x:"3",y:"6.5",width:"18",height:"11",rx:"2"}],["path",{d:"M7 10h.01M10.3 10h.01M13.7 10h.01M17 10h.01M8 14h8"}]],gantt:[["path",{d:"M4 5h9M7 12h11M4 19h7"}],["path",{d:"M3 3v18"}]]},lp=Object.keys(Tr);function B(o,e=18){let t="http://www.w3.org/2000/svg",r=document.createElementNS(t,"svg"),a={viewBox:"0 0 24 24",width:String(e),height:String(e),fill:"none",stroke:"currentColor","stroke-width":"1.8","stroke-linecap":"round","stroke-linejoin":"round","aria-hidden":"true",focusable:"false",class:"spro-icone"};for(let[n,i]of Object.entries(a))r.setAttribute(n,i);for(let[n,i]of Tr[o]){let s=document.createElementNS(t,n);for(let[c,d]of Object.entries(i))s.setAttribute(c,d);r.append(s)}return r}var ms=o=>`position:fixed;left:50%;bottom:20px;transform:translateX(-50%);z-index:2147483646;display:flex;align-items:center;gap:12px;max-width:min(560px,calc(100vw - 24px));box-sizing:border-box;padding:10px 10px 10px 16px;font:13px/1.35 system-ui,-apple-system,'Segoe UI',Roboto,sans-serif;color:#f3f5f8;background:#1f2329;border:1px solid rgb(255 255 255 / 8%);border-radius:12px;box-shadow:0 10px 24px -6px rgb(16 24 40 / 30%),0 24px 56px -12px rgb(16 24 40 / 35%);animation:${o}-aviso 220ms cubic-bezier(.2,.8,.2,1)`,fs="flex:none;padding:5px 10px;font:inherit;font-weight:600;color:#9cc3ff;background:rgb(255 255 255 / 7%);border:0;border-radius:6px;cursor:pointer";function Be(o){if(!/^[a-z][a-z0-9-]*$/.test(o))throw new Error(`Prefixo de classe inv\xE1lido: ${o}`);return o}function Dt(o,e,t="spro-painel"){let r=`${Be(t)}-aviso`;return(a,n,i)=>new Promise(s=>{for(let l of o.querySelectorAll(`.${r}`))l.remove();let c=!1,d=l=>{c||(c=!0,p.remove(),s(l))},p=b("div",{class:r,role:"status",style:ms(t)+(e?";background:#2b3036":"")},b("span",{style:"flex:1"},a),...n.map((l,m)=>b("button",{type:"button",style:fs,onclick:()=>d(m)},l)));(o.body??o.documentElement).append(p),setTimeout(()=>d(-1),Math.max(10,Math.min(i,6e4)))})}function Cr(o,e,t="spro-painel"){let r=Dt(o,e,t);return(a,n,i)=>r(a,n?[n]:[],i).then(s=>s===0)}var _=class extends Error{constructor(t,r){super(r);this.codigo=t;this.name="ErroRpc"}};function Ge(o,e={}){let t=0,r=!0,a=new Map,n=[],i=()=>{if(r){r=!1;for(let[,c]of a)clearTimeout(c.timer),c.erro(new _("DESCONECTADO","A conex\xE3o com a aba do SEI caiu."));a.clear();for(let c of n)c()}},s=c=>{r&&o.postMessage(c)};return o.onMessage.addListener(c=>{let d=c;if(d?.rpc==="resposta"&&typeof d.id=="number"){let m=a.get(d.id);if(!m)return;a.delete(d.id),clearTimeout(m.timer),d.ok?m.ok(d.valor):m.erro(new _(d.erro?.codigo??"ERRO",d.erro?.mensagem??"Falha."));return}if(d?.rpc!=="pedido"||typeof d.id!="number"||typeof d.op!="string")return;let p=d.id,l=d.op;(async()=>{try{let m=e[l];if(!m)throw new _("OP_DESCONHECIDA",`Opera\xE7\xE3o desconhecida: ${l}`);s({rpc:"resposta",id:p,ok:!0,valor:await m(d.args)})}catch(m){let u=m.codigo;s({rpc:"resposta",id:p,ok:!1,erro:{codigo:typeof u=="string"?u:"ERRO",mensagem:m instanceof Error?m.message:String(m)}})}})()}),o.onDisconnect.addListener(i),{get aberta(){return r},chamar(c,d,p=15e3){if(!r)return Promise.reject(new _("DESCONECTADO","A conex\xE3o com a aba do SEI caiu."));let l=++t;return new Promise((m,u)=>{let f=setTimeout(()=>{a.delete(l),u(new _("PRAZO",`A aba do SEI n\xE3o respondeu a tempo (${c}).`))},p);a.set(l,{ok:m,erro:u,timer:f}),o.postMessage({rpc:"pedido",id:l,op:c,args:d})})},aoFechar(c){n.push(c)},fechar(){r&&(o.disconnect(),i())}}}var gs="position:fixed;inset:0;left:0;top:0;width:100vw;height:100vh;max-width:none;max-height:none;margin:0;z-index:2147483646;background:transparent;";function kr(o,e,t){let r=null,a=null,n=d=>{e.style.height=`${Math.max(80,Math.min(Math.round(d),2e4))}px`},i=()=>{let d=[o.documentElement];o.body&&d.push(o.body);let p=o.defaultView;for(let l=e.parentElement;l&&l!==o.body&&l!==o.documentElement;l=l.parentElement)try{let m=p?.getComputedStyle?.(l).overflowY??"";(m==="auto"||m==="scroll")&&l.scrollHeight>l.clientHeight&&d.push(l)}catch{}return d},s=()=>!e.isConnected||t.hidden||t.closest?.("[hidden]")?!1:typeof e.getClientRects!="function"||e.getClientRects().length>0,c={ligar(d){if(d&&!r&&!s())return!1;if(d&&!r){let p=e.getBoundingClientRect?.().height||Number.parseFloat(e.style.height)||0,l=i().map(m=>[m,m.style.overflow]);r={iframe:e.getAttribute("style")??"",reserva:t.style.minHeight,travados:l},p&&(t.style.minHeight=`${Math.round(p)}px`),e.setAttribute("style",`${r.iframe};${gs}`);for(let[m]of l)m.style.overflow="hidden"}else if(!d&&r){e.setAttribute("style",r.iframe),t.style.minHeight=r.reserva;for(let[p,l]of r.travados)p.style.overflow=l;r=null,a!==null&&n(a),a=null}return!0},altura(d){Number.isFinite(d)&&(r?a=d:n(d))}};return e.addEventListener("load",()=>c.ligar(!1)),c}function Ot(o,e){try{let t=JSON.parse(o.getItem("optionsPro")??"{}");if(!Array.isArray(t.orderPanelHome))return null;let r=t.orderPanelHome.find(n=>n?.name===e),a=Number(r?.index);return r&&Number.isFinite(a)?a:null}catch{return null}}function hs(o,e,t){if(t!==null)for(let r of[...o.children]){if(!r.classList.contains("panelHomePro"))continue;let a=Number.parseInt(r.getAttribute("data-order")??"",10);if(Number.isFinite(a)&&a>t){r.before(e);return}}o.append(e)}function vs(o,e,t=r=>xs(o,r)){e.style.setProperty("font-weight","600","important"),t(()=>bs(o,e))}function bs(o,e){let t=o.querySelector("#divInfraBarraLocalizacao"),r=o.defaultView;if(!(!t||!r?.getComputedStyle))try{let a=r.getComputedStyle(t);if(!(Number.parseFloat(a.fontSize)>16))return;e.style.fontSize=a.fontSize,a.fontFamily&&(e.style.fontFamily=a.fontFamily)}catch{}}function xs(o,e){let t=o.defaultView,r=()=>t?.setTimeout(e,1500);o.readyState==="complete"?r():t?.addEventListener("load",r,{once:!0})}function jt(o,e){let t=Be(e),r=`${t}-painel-estilo`;if(o.getElementById(r))return;let a=o.createElement("style");a.id=r,a.textContent=[`.${t}-titulo{display:flex!important;align-items:center;gap:8px}`,`.${t}-recolher{margin-left:4px;background:none;border:0;cursor:pointer;color:inherit;line-height:0;padding:2px;border-radius:4px}`,`.${t}-recolher:hover{background:rgb(127 127 127 / 14%)}`,`.${t}-recolher:focus-visible{outline:2px solid #1a73e8;outline-offset:1px}`,`@keyframes ${t}-aviso{from{opacity:0;transform:translate(-50%,10px)}}`,`@media (prefers-reduced-motion:reduce){.${t}-aviso{animation:none!important}}`].join(`
`),(o.head??o.documentElement).append(a)}function Rr(o,e){let t=o.querySelector("#frmProcedimentoControlar");if(!t||o.querySelector("#tblMarcadores")||o.getElementById(e.id))return null;let r=Be(e.prefixo);(e.estilo??(m=>jt(m,r)))(o);let a=o.querySelector("#panelHomePro");a||(a=b("div",{id:"panelHomePro",style:"display: inline-block; width: 100%;"}),t.after(a));let n=b("iframe",{src:e.urlApp,title:e.tituloIframe,allow:"clipboard-write",style:`width: 100%; height: ${e.alturaInicial??120}px; border: 0; display: block; color-scheme: ${e.temaEscuro?"dark":"light"};`}),i=b("div",{class:`${r}-corpo`,hidden:e.recolhido},n),s=b("button",{type:"button",class:`${r}-recolher`}),c=()=>{let m=i.hidden,u=m?e.rotulos.mostrar:e.rotulos.recolher;s.setAttribute("aria-expanded",String(!m)),s.setAttribute("aria-label",u),s.title=u,s.replaceChildren(B(m?"expandir":"recolher",18))};s.addEventListener("click",()=>{i.hidden=!i.hidden,c(),e.aoRecolher(i.hidden)}),c();let d=b("div",{class:`infraBarraLocalizacao titlePanelHome ${r}-titulo`},e.icone(),e.titulo,s);vs(o,d);let p=b("div",{class:"panelHomePro",id:e.id,"data-order":e.ordem===null?"":String(e.ordem),style:"display: inline-block; width: 100%;"},d,i);hs(a,p,e.ordem);let l=kr(o,n,i);return{painel:p,iframe:n,corpo:i,sobreposicao:l,fechar:()=>{l.ligar(!1),p.remove()}}}function Nr(o){return{altura:e=>{let t=Number(e?.px);return o.sobreposicao?o.sobreposicao.altura(t):o.iframe&&Number.isFinite(t)&&(o.iframe.style.height=`${Math.max(80,Math.min(Math.round(t),2e4))}px`),!0},sobrepor:e=>o.sobreposicao?o.sobreposicao.ligar(e?.ativo===!0):!1,aviso:e=>{let t=e??{},r=Number(t.ms),a=Number.isFinite(r)?r:7e3,n=String(t.texto??"").slice(0,400),i=Array.isArray(t.acoes)?t.acoes.slice(0,3).map(s=>String(s).slice(0,40)):[];return i.length>1&&o.avisarAcoes?o.avisarAcoes(n,i,a):o.avisar?o.avisar(n,t.acao?String(t.acao).slice(0,40):void 0,a):!1}}}function _r(o,e,t){let r=null;return o.iframe.addEventListener("load",()=>{r?.fechar(),r=Ge(e(),t),r.aoFechar(()=>o.sobreposicao.ligar(!1))}),{fechar:()=>{r?.fechar(),o.fechar()},rpc:()=>r?.aberta?r:null}}var be=class extends Error{constructor(e){super(`O conte\xFAdo descompactado passa de ${Math.round(e/1024/1024)} MB.`),this.name="ErroConteudoGrande"}};async function Es(o,e){let t=new Blob([o]).stream().pipeThrough(e);return new Uint8Array(await new Response(t).arrayBuffer())}function ys(o){let e="";for(let t=0;t<o.length;t+=32768)e+=String.fromCharCode(...o.subarray(t,t+32768));return btoa(e).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"")}function ws(o){if(!/^[A-Za-z0-9_-]*$/.test(o))throw new Error("Conte\xFAdo fora do formato base64url.");let e=o.replace(/-/g,"+").replace(/_/g,"/").padEnd(Math.ceil(o.length/4)*4,"="),t=atob(e),r=new Uint8Array(t.length);for(let a=0;a<t.length;a++)r[a]=t.charCodeAt(a);return r}async function Lr(o){let e=new TextEncoder().encode(JSON.stringify(o));return ys(await Es(e,new CompressionStream("gzip")))}async function Ps(o,e){let t=new Blob([o]).stream().pipeThrough(new DecompressionStream("gzip")).getReader(),r=[],a=0;for(;;){let{done:s,value:c}=await t.read();if(s)break;if(a+=c.byteLength,a>e)throw await t.cancel().catch(()=>{}),new be(e);r.push(c)}let n=new Uint8Array(a),i=0;for(let s of r)n.set(s,i),i+=s.byteLength;return n}async function qr(o,e=8388608){let t=await Ps(ws(o),e);return JSON.parse(new TextDecoder().decode(t))}var As=o=>o.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");function $r(o,e,t=2e3){let r=[`<p>${As(o)}</p>`];for(let a=0;a<e.length;a+=t)r.push(`<p>${e.slice(a,a+t)}</p>`);return r.join(`
`)}function Ss(o){let e=o;for(let t=0;t<2&&/&lt;\s*\/?p[\s>&]/i.test(e);t++)e=e.replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&quot;/g,'"').replace(/&amp;/g,"&");return e}function xe(o){let t=[...Ss(o).matchAll(/<p\b[^>]*>([\s\S]*?)<\/p>/gi)].map(r=>(r[1]??"").trim()).slice(1);return!t.length||!t.every(r=>/^[A-Za-z0-9_-]+$/.test(r))?null:t.join("")}function to(o){return o.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/\s+/g," ").trim()}function Ee(o){let e=2166136261;for(let t of o)e^=t.codePointAt(0)??0,e=Math.imul(e,16777619)>>>0;return e.toString(16).padStart(8,"0")}var Mt="[_SEIPRO_",Vr=50;function zr(o,e){let t=`${Mt}${o}_`,r=`${t}${e}]`;if(r.length<=Vr)return r;let a=Vr-t.length-1-8-1;return`${t}${e.slice(0,a)}~${Ee(e).slice(0,8)}]`}async function Ur(o,e){return $r(o,await Lr(e))}async function Fr(o,e=8388608){let t=xe(o);if(!t)return{invalido:"o texto n\xE3o tem os dados do SEI Pro (foi editado ou est\xE1 vazio)"};try{return{bruto:await qr(t,e)}}catch(r){return r instanceof be?{invalido:"os dados do texto descompactados passam do limite"}:{invalido:"os dados do texto est\xE3o corrompidos"}}}function Hr(o,e,t){let r=o;return r?.formato===e&&typeof r.versao=="number"&&r.versao>t}var Os={maisNovo:"Os dados no SEI foram gravados por uma vers\xE3o mais nova do SEI Pro. Atualize a extens\xE3o neste computador; o texto n\xE3o foi alterado.",grandeDemais:(o,e)=>`Os dados ficaram grandes demais para o Texto Padr\xE3o (${o} KB de ${e} KB).`,pertoDoTeto:o=>`Os dados est\xE3o perto do limite do Texto Padr\xE3o (${o} KB).`,invalidoRegravado:o=>`O texto no SEI estava inv\xE1lido (${o}) e foi regravado a partir deste computador.`,mudouDuranteGravacao:"O texto no SEI mudou enquanto era gravado (outra pessoa sincronizando). Nova tentativa na pr\xF3xima rodada.",soLeitura:"Indispon\xEDvel nesta unidade: o SEI n\xE3o deixa gravar este Texto Padr\xE3o com o seu perfil."},js={definir:(o,e)=>setTimeout(o,e),cancelar:o=>clearTimeout(o)},Br=5*6e4,Ms=864e5,It=(o,e)=>`seipro-${o}-sync|${e}`;function Gr(o,e){if(o===e)return!0;if(o===null||e===null)return!1;let t=xe(o),r=xe(e);return t!==null&&r!==null&&t===r}function Tt(o){let e=o?.codigo;return e==="SEI_SESSAO_EXPIRADA"?{estado:"erro",mensagem:"Sess\xE3o do SEI expirada. Entre de novo no SEI."}:e==="SEI_ACAO_INDISPONIVEL"?{estado:"indisponivel",mensagem:"Indispon\xEDvel nesta unidade: o SEI n\xE3o oferece Textos Padr\xE3o para voc\xEA aqui."}:{estado:"erro",mensagem:o instanceof Error?o.message:String(o)}}var Xe=class{constructor(e){this.d=e}espera;geracao=0;desistencias=0;parado=!1;filaStatus=Promise.resolve();get temporizador(){return this.d.temporizador??js}get atrasoEnvio(){return this.d.atrasoEnvio??15e3}agora(){return this.d.agora?.()??Date.now()}async status(){let e=this.d.adaptador.chaveStatus;return(await this.d.area.obter(e))[e]??{estado:"nunca",quando:0,pendente:!1}}gravarStatus(e){let t=this.filaStatus.then(async()=>{let r={...await this.status(),aguardandoPermissao:void 0,...e};return await this.d.area.gravar({[this.d.adaptador.chaveStatus]:r}),r});return this.filaStatus=t.catch(()=>{}),t}async marcarPendente(){this.geracao++,(await this.status()).pendente||await this.gravarStatus({pendente:!0})}agendarEnvio(){return this.parado=!1,this.armar(this.atrasoEnvio),this.marcarPendente()}parar(){this.parado=!0,this.espera!==void 0&&this.temporizador.cancelar(this.espera),this.espera=void 0}armar(e){this.espera!==void 0&&this.temporizador.cancelar(this.espera),this.espera=this.temporizador.definir(()=>{this.espera=void 0,this.enviarAgendado().catch(()=>{})},e)}rearmar(e){this.parado||this.armar(e)}async enviarAgendado(){let e=!(this.d.lerNoRecuo&&this.noRecuo(await this.status(),this.agora()));await this.executar(e)===null&&this.rearmar(this.atrasoEnvio)}noRecuo(e,t){return e.estado==="indisponivel"&&(e.indisponivelAte??0)>t}async sincronizar(e={}){return this.parado=!1,await this.executar(e.forcar===!0)??await this.status()}async executar(e){let t=this.agora(),r=await this.status(),a=this.d.intervaloPuxar??Br,n=this.d.adaptador,i=It(n.modulo,n.chaveStatus);if(!e){if(this.noRecuo(r,t))return!this.d.lerNoRecuo||r.ultimoPuxar&&t-r.ultimoPuxar<a?r:this.d.travar(i,()=>this.soLer(t));if(!r.pendente&&r.ultimoPuxar&&t-r.ultimoPuxar<a)return r}return this.d.travar(i,()=>this.rodada(t))}async soLer(e){try{let t=await this.d.destino.ler();if(t!==null){let r=await this.validar(t);"ok"in r&&await this.d.adaptador.importar(r.ok)}return this.gravarStatus({ultimoPuxar:e,tamanho:t?.length})}catch{return this.gravarStatus({ultimoPuxar:e})}}async desistir(e,t){this.desistencias++;let r=await this.gravarStatus({estado:"erro",quando:e,ultimoPuxar:e,pendente:!0,mensagem:t.mudouDuranteGravacao});return this.rearmar(this.esperaDepoisDeDesistir()),r}esperaDepoisDeDesistir(){let e=Math.min(this.atrasoEnvio*2**Math.max(0,this.desistencias-1),Br);return e+Math.floor((this.d.aleatorio??Math.random)()*(e/2))}async concluir(e,t){this.desistencias=0;let r=await this.gravarStatus({...t,pendente:this.geracao!==e});return!r.pendente&&this.geracao!==e&&(r=await this.gravarStatus({pendente:!0})),r.pendente&&this.rearmar(this.atrasoEnvio),r}async validar(e){let t=await Fr(e);return"invalido"in t?t:this.d.adaptador.validar(t.bruto)}async rodada(e){let t=this.d.adaptador,r={...Os,...t.mensagens},a=this.d.releituras??3,n=!1;try{let i=await this.d.destino.ler();n=!0;for(let s=0;;s++){let c=null,d=null;if(i!==null){let g=await this.validar(i);if("maisNovo"in g)return this.gravarStatus({estado:"erro",quando:e,ultimoPuxar:e,mensagem:r.maisNovo});"ok"in g?(await t.importar(g.ok),c=g.ok):d=g.invalido}let p=this.geracao,l=await t.exportar({remoto:c,agora:e,invalido:d!==null});if(i!==null&&c!==null&&t.assinatura(l)===t.assinatura(c))return this.concluir(p,{estado:"ok",quando:e,ultimoOk:e,ultimoPuxar:e,mensagem:void 0,tamanho:i.length});if(i===null&&t.vazio?.(l))return this.concluir(p,{estado:"ok",quando:e,ultimoOk:e,ultimoPuxar:e,mensagem:void 0,tamanho:0});let m=await Ur(t.legivel(),l),u=Math.ceil(m.length/1024);if(m.length>t.teto)return this.gravarStatus({estado:"erro",quando:e,ultimoPuxar:e,tamanho:m.length,mensagem:r.grandeDemais(u,Math.round(t.teto/1024))});if(this.d.permitido&&!await this.d.permitido())return c!==null&&t.normalizar&&t.assinatura(l)===t.assinatura(await t.normalizar(c,e))?this.concluir(p,{estado:"ok",quando:e,ultimoOk:e,ultimoPuxar:e,mensagem:void 0,tamanho:i?.length??0}):this.gravarStatus({estado:"nunca",quando:e,ultimoPuxar:e,pendente:!1,mensagem:void 0,aguardandoPermissao:!0});i!==null&&d!==null&&await t.antesDeRegravarInvalido?.(d,i);let f=a>0?this.d.destino.gravarConferindo?.bind(this.d.destino):void 0;if(a>0&&!f){let g=await this.d.destino.ler();if(!Gr(g,i)){if(s+1>=a)return this.desistir(e,r);i=g;continue}}if(f){let g=await f(m,{anterior:i,mesmo:Gr});if(!g.gravado){if(s+1>=a)return this.desistir(e,r);i=g.atual;continue}}else await this.d.destino.gravar(m);return this.concluir(p,{estado:"ok",quando:e,ultimoOk:e,ultimoPuxar:e,tamanho:m.length,mensagem:d?r.invalidoRegravado(d):m.length>t.aviso?r.pertoDoTeto(u):void 0})}}catch(i){let s=Tt(i);return s.estado==="indisponivel"&&n&&(s.mensagem=r.soLeitura),this.gravarStatus({estado:s.estado,mensagem:s.mensagem,quando:e,indisponivelAte:s.estado==="indisponivel"?e+Ms:void 0})}}};function Xr(o){let e=0;for(let t of o.querySelectorAll('select#selTextoPadrao option, select[name="selTextoPadrao"] option'))(t.textContent??"").trim().startsWith(Mt)&&(t.remove(),e++);return e}var Ke=class{constructor(e){this.d=e}motor=null;pararMudancas=null;pararConsentimento=null;ultimoEstado=null;criarMotor(){let e=this.d.armazem(),t={ler:()=>e.ler(),gravar:r=>e.gravar(r)};return e.gravarConferindo&&(t.gravarConferindo=(r,a)=>e.gravarConferindo(r,a)),new Xe({adaptador:this.d.adaptador,destino:t,area:this.d.area,travar:this.d.travar,agora:this.d.agora,atrasoEnvio:this.d.atrasoEnvio,intervaloPuxar:this.d.intervaloPuxar,releituras:this.d.releituras,lerNoRecuo:this.d.lerNoRecuo,permitido:this.d.permitido??(async()=>await this.d.consentimento.estado()==="ligado")})}rodar(e){return this.motor??=this.criarMotor(),this.motor.sincronizar({forcar:e})}ligar(e){this.pararMudancas||(this.motor??=this.criarMotor(),this.pararMudancas=this.d.aoMudarLocal(()=>void this.motor?.agendarEnvio()),e&&this.rodar(!1).catch(()=>{}))}desligar(){this.pararMudancas?.(),this.pararMudancas=null,this.motor?.parar()}async pendenteGravado(){let e=this.d.adaptador.chaveStatus;return(await this.d.area.obter(e))[e]?.pendente===!0}async iniciar(e){let t=await this.d.consentimento.estado();this.ultimoEstado=t,(t==="ligado"||this.d.lerSemConsentimento)&&this.ligar(e.puxar||await this.pendenteGravado()),this.pararConsentimento?.(),this.pararConsentimento=this.d.consentimento.aoMudar(()=>{this.d.consentimento.estado().then(r=>{let a=this.ultimoEstado;if(this.ultimoEstado=r,r==="ligado"){let n=this.pararMudancas!==null;this.ligar(!1),(!n||a!=="ligado")&&this.rodar(!0).catch(()=>{})}else this.d.lerSemConsentimento||this.desligar()})})}async puxar(){return this.pararMudancas?this.rodar(!1):null}agora(){return this.rodar(!0)}async apagar(){this.desligar(),await this.d.consentimento.definir("desligado");let e=this.d.armazem(),t=async()=>{let n=await e.excluir();return e.localizar&&await e.localizar()&&(n=await e.excluir()||n),n},r=It(this.d.adaptador.modulo,this.d.adaptador.chaveStatus),a=this.d.travarEsperando?await this.d.travarEsperando(r,t):await t();return await this.d.area.gravar({[this.d.adaptador.chaveStatus]:{estado:"nunca",quando:Date.now(),pendente:!1}}),a}parar(){this.desligar(),this.pararConsentimento?.()}};var Kr=`/*
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
`;var Ts={AElig:198,Aacute:193,Acirc:194,Agrave:192,Aring:197,Atilde:195,Auml:196,Ccedil:199,ETH:208,Eacute:201,Ecirc:202,Egrave:200,Euml:203,Iacute:205,Icirc:206,Igrave:204,Iuml:207,Ntilde:209,Oacute:211,Ocirc:212,Ograve:210,Oslash:216,Otilde:213,Ouml:214,THORN:222,Uacute:218,Ucirc:219,Ugrave:217,Uuml:220,Yacute:221,aacute:225,acirc:226,acute:180,aelig:230,agrave:224,amp:38,apos:39,aring:229,atilde:227,auml:228,brvbar:166,bull:8226,ccedil:231,cedil:184,cent:162,copy:169,curren:164,deg:176,divide:247,eacute:233,ecirc:234,egrave:232,eth:240,euml:235,euro:8364,frac12:189,frac14:188,frac34:190,gt:62,hellip:8230,iacute:237,icirc:238,iexcl:161,igrave:236,iquest:191,iuml:239,laquo:171,ldquo:8220,lsquo:8216,lt:60,macr:175,mdash:8212,micro:181,middot:183,nbsp:160,ndash:8211,not:172,ntilde:241,oacute:243,ocirc:244,ograve:242,ordf:170,ordm:186,oslash:248,otilde:245,ouml:246,para:182,plusmn:177,pound:163,quot:34,raquo:187,rdquo:8221,reg:174,rsquo:8217,sect:167,shy:173,sup1:185,sup2:178,sup3:179,szlig:223,thorn:254,times:215,trade:8482,uacute:250,ucirc:251,ugrave:249,uml:168,uuml:252,yacute:253,yen:165,yuml:255};function ye(o){return o.includes("&")?o.replace(/&(#x[0-9a-fA-F]+|#\d+|[a-zA-Z][a-zA-Z0-9]*);/g,(e,t)=>{let r=t[0]==="#"?t[1]==="x"||t[1]==="X"?parseInt(t.slice(2),16):parseInt(t.slice(1),10):Ts[t];return r===void 0||Number.isNaN(r)?e:String.fromCodePoint(r)}):o}var Yr={128:8364,130:8218,131:402,132:8222,133:8230,134:8224,135:8225,136:710,137:8240,138:352,139:8249,140:338,142:381,145:8216,146:8217,147:8220,148:8221,149:8226,150:8211,151:8212,152:732,153:8482,154:353,155:8250,156:339,158:382,159:376};var Jr=null;function Ct(o){return Jr?Jr(o):new DOMParser().parseFromString(o,"text/html")}function U(o){return(o?.textContent??"").replace(/\s+/g," ").trim()}var O=class extends Error{codigo;detalhe;constructor(e,t,r){super(t),this.name="ErroSei",this.codigo=e,this.detalhe=r}paraJSON(){return{codigo:this.codigo,mensagem:this.message,detalhe:this.detalhe}}};function Wr(o){return o instanceof O}function kt(o){if(o instanceof O)return o;if(o instanceof DOMException&&o.name==="AbortError")return new O("CANCELADO","Opera\xE7\xE3o cancelada.");let e=o instanceof Error?o.message:String(o);return new O("SEI_REDE",`Falha ao falar com o SEI: ${e}`)}var ta="\xA5",Nt="\xB1";function Zr(o){return o.map(e=>`${e.id}${Nt}${e.texto}`).join(ta)}function Cs(o){return o?o.split(ta).map(e=>{let[t,...r]=e.split(Nt);return{id:t,texto:r.join(Nt)}}):[]}function Qr(o){let e=[];for(let t of o.matchAll(/new\s+infraLupaSelect\(\s*['"]([\w-]+)['"]\s*,\s*['"]([\w-]+)['"]/g))e.push([t[1],t[2]]);return e}var ra=o=>e=>e.url.includes(o),ro=class o{constructor(e,t,r){this.http=e;this.pagina=t;this.elemento=r,this.id=r.id,this.action=(r.getAttribute("action")??"").replace(/&amp;/g,"&"),this.campos=ks(r),this.sincronizarLupas()}id;action;campos;elemento;static async abrir(e,t,r,a){let n=await e.obter(t,a);return o.de(n,r,e)}static de(e,t,r=null){let a=e.doc.querySelector(t);if(!a)throw new O("SEI_VERSAO_NAO_SUPORTADA",`A tela do SEI n\xE3o tem o formul\xE1rio esperado (${t}).`,U(e.doc.querySelector("title")));return new o(r,e,a)}pares(){return this.campos.map(e=>[e.nome,e.valor])}valor(e){return this.campos.find(t=>t.nome===e)?.valor}tem(e){return this.elemento.querySelector(`[name="${e}"]`)!==null||this.campos.some(t=>t.nome===e)}opcoes(e){let t=this.elemento.querySelector(`select[name="${e}"], select#${ea(e)}`);return t?[...t.querySelectorAll("option")].map(r=>({valor:r.getAttribute("value")??U(r),texto:U(r),selecionada:r.hasAttribute("selected")})):[]}definir(e){for(let[t,r]of Object.entries(e)){if(r===void 0)continue;if(r===null){this.campos=this.campos.filter(n=>n.nome!==t);continue}let a=this.campos.find(n=>n.nome===t);a?a.valor=r:this.campos.push({nome:t,valor:r})}return this}escolher(e,t){let r=this.opcoes(e),a=Rt(t),n=r.find(i=>i.valor===t)??r.find(i=>Rt(i.texto)===a)??oa(r.filter(i=>Rt(i.texto).includes(a)));if(!n)throw new O("ARGUMENTO_INVALIDO",`"${t}" n\xE3o \xE9 uma op\xE7\xE3o de ${e}.`,r.slice(0,40).map(i=>i.texto).join(" | "));return this.definir({[e]:n.valor}),n}linhas(e){return[...this.elemento.querySelectorAll(`${e} tr`)].filter(t=>t.querySelector("input[type=checkbox]"))}itensLupa(e){let t=this.hiddenDaLupa(e);return t?Cs(this.valor(t)??""):[]}definirLupa(e,t){let r=this.hiddenDaLupa(e);if(!r)throw new O("SEI_VERSAO_NAO_SUPORTADA",`A lupa ${e} n\xE3o existe nesta tela.`);return this.definir({[r]:Zr(t)}),this.campos=this.campos.filter(a=>a.nome!==e&&a.nome!==`${e}[]`),this}async enviar(e={}){if(!this.http)throw new O("SEI_RESPOSTA_INESPERADA","Formul\xE1rio sem transporte HTTP.");if(!this.action)throw new O("SEI_VERSAO_NAO_SUPORTADA",`O formul\xE1rio ${this.id} n\xE3o tem action.`);let t=this.pares();e.botao&&t.push(this.botaoDeEnvio(e.botao));let r=await this.http.enviar(this.action,t,e);if(e.sucesso&&!e.sucesso(r))throw new O("SEI_RESPOSTA_INESPERADA",`O SEI n\xE3o confirmou ${e.operacao??"a opera\xE7\xE3o"}.`,`${U(r.doc.querySelector("title"))} \u2014 ${r.url.replace(/infra_hash=\w+/,"infra_hash=\u2026")}`);return r}botaoDeEnvio(e){let t=this.elemento.querySelector(`[name="${e}"]`)??oa([...this.elemento.querySelectorAll('button[type="submit"][name^="sbm"], input[type="submit"][name^="sbm"]')]);return t?[t.getAttribute("name")??e,t.getAttribute("value")??U(t)??e]:[e,e]}hiddenDaLupa(e){let t=Qr(this.pagina.html).find(([r])=>r===e);return t?t[1]:null}sincronizarLupas(){for(let[e,t]of Qr(this.pagina.html)){let r=this.elemento.querySelector(`select#${ea(e)}`);if(!r)continue;let a=[...r.querySelectorAll("option")].map(n=>({id:n.getAttribute("value")??"",texto:U(n)}));(this.valor(t)??"")||this.definir({[t]:Zr(a)}),this.campos=this.campos.filter(n=>n.nome!==e&&n.nome!==`${e}[]`)}}};function ks(o){let e=[];for(let t of o.querySelectorAll("input, select, textarea")){let r=t.getAttribute("name");if(!r||t.hasAttribute("disabled"))continue;let a=t.tagName.toLowerCase();if(a==="input"){let n=(t.getAttribute("type")??"text").toLowerCase();if(["submit","button","image","reset","file"].includes(n)||(n==="checkbox"||n==="radio")&&!t.hasAttribute("checked"))continue;e.push({nome:r,valor:t.getAttribute("value")??(n==="checkbox"||n==="radio"?"on":"")})}else if(a==="textarea")e.push({nome:r,valor:t.textContent??""});else{let n=[...t.querySelectorAll("option")],i=n.filter(d=>d.hasAttribute("selected")),s=t.hasAttribute("multiple"),c=i.length?i:!s&&n.length?[n[0]]:[];for(let d of c)e.push({nome:r,valor:d.getAttribute("value")??U(d)})}}return e}function Rt(o){return o.normalize("NFD").replace(/[\u0300-\u036F]/g,"").toLowerCase().replace(/\s+/g," ").trim()}function oa(o){return o.length===1?o[0]:void 0}function ea(o){return o.replace(/([^\w-])/g,"\\$1")}var Rs=/controlador(?:_ajax)?\.php\?acao=[^"'\s<>\\]*?infra_hash=[0-9a-f]{64,192}/g;function Ye(o){let e=new Set;for(let t of o.replace(/&amp;/g,"&").matchAll(Rs))e.add(t[0]);return[...e]}function lo(o){let e=o.indexOf("?");return new URLSearchParams(e>=0?o.slice(e+1):"")}function Go(o,e){let t=[...o.doc.querySelectorAll("#infraMenu a[href], #main-menu a[href], .infraMenu a[href]")].map(i=>i.getAttribute("href")??"").join(`
`),r=Ye(t).filter(i=>lo(i).get("acao")===e),n=(r.length?r:Ye(o.html).filter(i=>lo(i).get("acao")===e)).sort((i,s)=>[...lo(i).keys()].length-[...lo(s).keys()].length)[0];if(!n)throw new O("SEI_ACAO_INDISPONIVEL",`O menu do SEI n\xE3o oferece "${e}" para este usu\xE1rio.`);return n}var Ns={"\u2010":"-","\u2011":"-","\u2012":"-","\u2013":"-","\u2014":"-","\u2015":"-","\u2212":"-","\u2018":"'","\u2019":"'","\u201A":"'","\u201B":"'","\u2032":"'","\u201C":'"',"\u201D":'"',"\u201E":'"',"\u201F":'"',"\u2033":'"',"\u2026":"...","\u2022":"-","\u2002":" ","\u2003":" ","\u2009":" ","\u202F":" ","\u205F":" ","\u200B":"","\u200C":"","\u200D":"","\u2060":"","\uFEFF":"","\u20AC":"EUR","\u2122":"(TM)","\u2192":"->","\u2190":"<-"};function aa(o,e="texto"){let t="";for(let r of o){let a=r.codePointAt(0);if(a<=255){t+=r;continue}let n=Ns[r];if(e==="html"){t+=n===""?"":`&#${a};`;continue}if(n!==void 0){t+=n;continue}let i=r.normalize("NFKD").replace(/[\u0300-\u036F]/g,"");t+=[...i].every(s=>s.codePointAt(0)<=255)?i:""}return t}var _s=/[A-Za-z0-9\-_.*]/;function na(o){let e="";for(let t of o)t===" "?e+="+":_s.test(t)?e+=t:e+="%"+t.charCodeAt(0).toString(16).toUpperCase().padStart(2,"0");return e}function ia(o,e={}){return o.map(([t,r])=>{let a=e[t]??"texto";return`${na(aa(t))}=${na(aa(r??"",a))}`}).join("&")}function _t(o){let e=o instanceof Uint8Array?o:new Uint8Array(o),t=[],r=16384;for(let a=0;a<e.length;a+=r){let n=e.subarray(a,a+r),i=new Array(n.length);for(let s=0;s<n.length;s+=1)i[s]=Yr[n[s]]??n[s];t.push(String.fromCharCode(...i))}return t.join("")}var sa="application/x-www-form-urlencoded; charset=ISO-8859-1";function ca(o,e,t){let r=null;return{url:o,status:e,html:t,get doc(){return r??=Ct(t)}}}function da(o,e={}){if(/\/login\.php/i.test(o.url)||/[?&]acao=(?:infra_)?sair\b/.test(o.url))throw new O("SEI_SESSAO_EXPIRADA","A sess\xE3o do SEI foi encerrada. Fa\xE7a login de novo no SEI e repita o pedido.");if(o.status>=500)throw new O("SEI_EXCECAO",`O SEI respondeu com erro ${o.status}.`);if(o.html.includes('id="divInfraExcecao"')){let t=o.doc.querySelector("#divInfraExcecao");if(t){let r=U(t);throw new O("SEI_EXCECAO",r||"O SEI exibiu uma p\xE1gina de erro.",r)}}if(!e.aceitarValidacao&&o.html.includes("txaInfraValidacao")){let t=o.doc.querySelector("#txaInfraValidacao")?.textContent?.trim()??"";if(t)throw new O("SEI_VALIDACAO",t,t)}return o}function we(o,e={}){let t=new URL(".",o),r=e.fetch??((...l)=>fetch(...l)),a=Math.max(1,e.concorrencia??3),n=0,i=[];async function s(l){n>=a&&await new Promise(m=>i.push(m)),n+=1;try{return await l()}finally{n-=1,i.shift()?.()}}let c=l=>new URL(l.replace(/&amp;/g,"&"),t).href;async function d(l,m,u){return s(async()=>{try{let f=await r(c(l),{credentials:"same-origin",redirect:"follow",...m,signal:u.sinal}),g=_t(await f.arrayBuffer());return da(ca(f.url||c(l),f.status,g),u)}catch(f){throw kt(f)}})}async function p(l,m={}){return s(async()=>{try{let u=await r(c(l),{credentials:"same-origin",redirect:"follow",signal:m.sinal}),f=new Uint8Array(await u.arrayBuffer()),g=(u.headers?.get("content-type")??"").split(";")[0].trim().toLowerCase();g==="text/html"&&da(ca(u.url||c(l),u.status,_t(f)),m);let x=u.headers?.get("content-disposition")??"",E=decodeURIComponent(/filename\*=UTF-8''([^;]+)/i.exec(x)?.[1]??/filename="?([^";]+)"?/i.exec(x)?.[1]??"");return{bytes:f,tipo:g,nome:E}}catch(u){throw kt(u)}})}return{base:t,absoluta:c,baixar:p,obter:(l,m={})=>d(l,{method:"GET"},m),enviar:(l,m,u={})=>d(l,{method:"POST",headers:{"Content-Type":sa},body:ia(m,u.modos)},u)}}function uo(o,e=o.location?.href??"https://sei.invalido/sei/controlador.php"){return{url:e,status:200,get html(){return o.documentElement.outerHTML},doc:o}}var Lt="projetos/contadorPainel";var h={nome:200,checklistItens:50,checklistTexto:200,etiquetas:10,etiquetaTexto:40,observacoes:2e3,projetosAtivos:100,etapasPorProjeto:300,historico:300,modelos:50,registroValor:400,rotulo:100,ordem:1e3},la=Date.UTC(2e3,0,1),Je=864e5,Ls=180,qs=90,Xo=o=>o==="unidade"?Ls:qs,qt=1e3;var We="projetos/preferencias",ua="projetos/lateralAberto",ma=o=>`projetos/sync/tp/${o}`;var fa=(o,e)=>`projetos/usuarios/${o}|u:${e}`;var ga=(o,e)=>`projetos/sigilo/${o}|${e.trim().toLowerCase()}/`;function ha(o,e=6e4){let t=null;return r=>{if(!Number.isFinite(r))return;let a=Math.min(e,Math.max(0,Math.trunc(r)));a!==t&&(t=a,o.gravar({[Lt]:a}).catch(()=>{t===a&&(t=null)}))}}function $s(o){let e=o%19,t=Math.floor(o/100),r=o%100,a=Math.floor(t/4),n=t%4,i=Math.floor((t+8)/25),s=Math.floor((t-i+1)/3),c=(19*e+t-a-s+15)%30,d=Math.floor(r/4),p=r%4,l=(32+2*n+2*d-c-p)%7,m=Math.floor((e+11*c+22*l)/451),u=Math.floor((c+l-7*m+114)/31),f=(c+l-7*m+114)%31+1;return`${o}-${String(u).padStart(2,"0")}-${String(f).padStart(2,"0")}`}function va(o){let e=$s(o),t=(r,a)=>({data:`${o}-${r}`,nome:a});return[t("01-01","Confraterniza\xE7\xE3o Universal"),{data:z(e,-48),nome:"Carnaval"},{data:z(e,-47),nome:"Carnaval"},{data:z(e,-2),nome:"Paix\xE3o de Cristo"},{data:e,nome:"P\xE1scoa"},t("04-21","Tiradentes"),t("05-01","Dia do Trabalho"),{data:z(e,60),nome:"Corpus Christi"},t("09-07","Independ\xEAncia do Brasil"),t("10-12","Nossa Senhora Aparecida"),t("11-02","Finados"),t("11-15","Proclama\xE7\xE3o da Rep\xFAblica"),t("11-20","Dia Nacional de Zumbi e da Consci\xEAncia Negra"),t("12-25","Natal")].sort((r,a)=>r.data<a.data?-1:1)}function ba(o,e=[]){let t=new Set;for(let r of o)for(let a of va(r))t.add(a.data);for(let r of e)t.add(r.data);return t}var Ko=2e3,Yo=2100,F=2600,xa=3700,Jo=Math.ceil(F*7/5);function $t(o,e,t,r){return typeof o!="number"||!Number.isFinite(o)?r:Math.min(t,Math.max(e,Math.trunc(o)))}function Vs(o,e){return Array.from({length:e-o+1},(t,r)=>o+r)}var L=ba(Vs(Ko,Yo)),zs=/^\d{4}-\d{2}-\d{2}$/;function J(o){return typeof o!="string"||!zs.test(o)?!1:co(oo(o))===o}function R(o){if(!J(o))return!1;let e=Number(o.slice(0,4));return e>=Ko&&e<=Yo}function qo(o,e=L){let t=o;for(let r=0;r<366&&!ve(t,e);r++)t=z(t,1);return t}function $o(o,e,t=L){return!J(o)||!J(e)||e<o?0:po(o,e)>xa?F:Math.min(F,(ve(o,t)?1:0)+St(o,e,t))}function Pe(o,e,t=L){let r=qo(o,t),a=$t(e,1,F,1);return a===1?r:At(r,a-1,t)}function Ae(o,e,t=L){if(!J(o)||!J(e))return 0;let r=po(o,e);return Math.abs(r)>xa?r>0?F:-F:$t(St(o,e,t),-F,F,0)}function Ea(o,e,t=L){let r=$t(e,-F,F,0);return r===0?o:At(o,r,t)}function Ze(o){let t=(oo(o).getDay()+6)%7;return z(o,4-t)}function Se(o,e){let t=Ze(e),r=z(e,30),a={atrasadas:[],semana:[],proximos30:[]};for(let n of o){if(n.removidoEm!==void 0||n.concluidaEm)continue;n.fim<e&&a.atrasadas.push(n),n.fim>=e&&n.fim<=t&&a.semana.push(n);let i=n.inicio>=e&&n.inicio<=r,s=n.fim>=e&&n.fim<=r;(i||s)&&a.proximos30.push(n)}return a}function Qe(o,e){return{inicio:o,fim:e}}function Vt(o,e,t,r){return o.inicio>r&&(o.base?.inicio??o.inicio)>r?{inicio:e,fim:t,base:{inicio:e,fim:t}}:{inicio:e,fim:t,base:o.base??{inicio:o.inicio,fim:o.fim}}}function ya(o){return{inicio:o.inicio,fim:o.fim}}function Us(o){return!!o.base&&(o.base.inicio!==o.inicio||o.base.fim!==o.fim)}function wa(o){return Us(o)||!o.base}function D(o){return o.replace(/\D/g,"")}function q(o){return o.replace(/\D/g,"").replace(/^0+(?=\d)/,"")}var Wo=/^\d{1,20}$/,Zo=/^[A-Za-z0-9./-]{0,40}$/,Do=/^\d{1,20}$/;var zt=o=>typeof o?.protocolo=="string"&&o.protocolo?D(o.protocolo):"",ot=o=>!!o&&typeof o.protocolo=="string"&&!D(o.protocolo)&&o.sigiloso!==!0;function De(o){if(!ot(o.processo))return o;let e={...o};return delete e.processo,e}var Fs=o=>!!o&&!ot(o);function Oe(o){let e=new Map,t=(r,a,n,i)=>{let s=e.get(r)??[],c=s.find(d=>d.projeto.id===n.id&&d.vis===a);return c||(c={vis:a,projeto:n,papel:i,etapas:[]},s.push(c),e.set(r,s)),i==="projeto"&&(c.papel="projeto"),c};for(let r of o){let a=new Map(r.projetos.filter(n=>n.removidoEm===void 0&&n.arquivadoEm===void 0).map(n=>[n.id,n]));for(let n of a.values()){let i=zt(n.processo);i&&t(i,r.vis,n,"projeto")}for(let n of r.etapas){let i=a.get(n.projeto);if(!i||n.removidoEm!==void 0)continue;let s=Fs(n.processo),c=zt(s?n.processo:i.processo);c&&t(c,r.vis,i,s?"etapa":"projeto").etapas.push(n)}}return e}var P=class extends Error{constructor(t){super(t.join(" "));this.mensagens=t;this.name="ErroValidacao"}},Hs=/^[A-Za-z0-9_-]{1,64}$/;function Oo(o){return typeof o=="string"&&Hs.test(o)}function H(o){return o.replace(/\s+/g," ").trim()}function Qo(o){let e=new Set,t=[];for(let r of o){let a=H(r),n=to(a);!a||e.has(n)||(e.add(n),t.push(a))}return t}function et(o){return o.map(e=>({...e,texto:H(e.texto)})).filter(e=>e.texto)}function Ut(o,e){let t=H(o);return t?t.length>h.nome?[`O nome pode ter at\xE9 ${h.nome} caracteres.`]:[]:[e]}function Aa(o){let e=[];return o.length>h.etiquetas&&e.push(`Use at\xE9 ${h.etiquetas} etiquetas.`),o.some(t=>t.length>h.etiquetaTexto)&&e.push(`Cada etiqueta pode ter at\xE9 ${h.etiquetaTexto} caracteres.`),e}function tt(o){return[...Ut(o.nome,"Informe o nome do projeto."),...Aa(o.etiquetas)]}function Bs(o,e){return!J(o)||!J(e)?["Informe datas v\xE1lidas."]:!R(o)||!R(e)?[`Use datas entre ${Ko} e ${Yo}.`]:e<o?["O t\xE9rmino n\xE3o pode ser antes do in\xEDcio."]:po(o,e)>Jo?["A etapa pode durar no m\xE1ximo cerca de 10 anos."]:[]}function Ft(o){let e=o;return!e||typeof e!="object"||typeof e.numero!="string"||e.numero!==""&&!Wo.test(e.numero)?["N\xFAmero de documento inv\xE1lido."]:e.titulo!==void 0&&(typeof e.titulo!="string"||e.titulo.length>h.nome)?[`O t\xEDtulo do documento pode ter at\xE9 ${h.nome} caracteres.`]:e.sigiloso!==void 0&&typeof e.sigiloso!="boolean"?["N\xFAmero de documento inv\xE1lido."]:[]}function Sa(o){let e=Ut(o.nome,"Informe o nome da etapa.");return e.push(...Bs(o.inicio,o.fim)),(!Number.isFinite(o.progresso)||o.progresso<0||o.progresso>100)&&e.push("O progresso vai de 0 a 100."),o.checklist.length>h.checklistItens&&e.push(`O checklist pode ter at\xE9 ${h.checklistItens} itens.`),o.checklist.some(t=>t.texto.length>h.checklistTexto)&&e.push(`Cada item do checklist pode ter at\xE9 ${h.checklistTexto} caracteres.`),e.push(...Aa(o.etiquetas)),(o.observacoes??"").length>h.observacoes&&e.push("As observa\xE7\xF5es podem ter at\xE9 2.000 caracteres."),(o.responsavel?.nome??"").length>h.nome&&e.push(`O nome do respons\xE1vel pode ter at\xE9 ${h.nome} caracteres.`),(o.responsavel?.login??"").length>h.rotulo&&e.push("O login do respons\xE1vel \xE9 longo demais."),o.documento!==void 0&&e.push(...Ft(o.documento)),e}function Pa(o,e){return typeof o=="number"&&Number.isInteger(o)&&o>=0&&o<=e}function Ht(o,e){if(!Array.isArray(o)||!Array.isArray(e))return["O modelo precisa de lista de fases e de etapas."];let t=[];return o.length>h.etapasPorProjeto&&t.push(`Um modelo pode ter at\xE9 ${h.etapasPorProjeto} fases.`),o.some(r=>typeof r!="string")?t.push("Toda fase do modelo precisa ser um texto."):o.some(r=>r.length>h.nome)&&t.push(`O nome pode ter at\xE9 ${h.nome} caracteres.`),e.length>h.etapasPorProjeto?(t.push(`Um modelo pode ter at\xE9 ${h.etapasPorProjeto} etapas.`),t):(e.forEach((r,a)=>{if(!r||typeof r!="object"){t.push("Toda etapa do modelo precisa ser um objeto.");return}let n=r;typeof n.nome!="string"||!H(n.nome)?t.push("Toda etapa do modelo precisa de nome."):n.nome.length>h.nome&&t.push(`O nome pode ter at\xE9 ${h.nome} caracteres.`),(!Pa(n.aPartirDe,F)||!Pa(n.duracao,F))&&t.push(`As dura\xE7\xF5es do modelo s\xE3o n\xFAmeros inteiros de 0 a ${F} dias \xFAteis.`),n.fase!==void 0&&!(typeof n.fase=="number"&&Number.isInteger(n.fase)&&n.fase>=0&&n.fase<o.length)&&t.push("Etapa do modelo aponta para uma fase que n\xE3o existe."),(!Array.isArray(n.dependeDe)||n.dependeDe.some(i=>typeof i!="number"||!Number.isInteger(i)||i<0||i>=e.length||i===a))&&t.push("Etapa do modelo depende de uma etapa que n\xE3o existe ou dela mesma."),!Array.isArray(n.checklist)||n.checklist.some(i=>typeof i!="string"||i.length>h.checklistTexto)?t.push(`Cada item do checklist do modelo \xE9 um texto de at\xE9 ${h.checklistTexto} caracteres.`):n.checklist.length>h.checklistItens&&t.push(`O checklist pode ter at\xE9 ${h.checklistItens} itens.`)}),t)}function rt(o){let e=[...Ut(o.nome,"Informe o nome do modelo."),...Ht(o.fases,o.etapas)];return(o.descricao??"").length>h.observacoes&&e.push("A descri\xE7\xE3o pode ter at\xE9 2.000 caracteres."),[...new Set(e)]}function Vo(o){for(let e of Object.keys(o))o[e]===void 0&&delete o[e];return o}function Gs(o,e){return Number.isFinite(o.atualizadoEm)?Math.max(e,o.atualizadoEm+1):e}function W(o,e,t){return Vo({...o,...e,atualizadoEm:Gs(o,t.agora),dispositivo:t.dispositivo,alteradoPor:t.por??o.alteradoPor})}function no(o,e){return W(o,{removidoEm:e.agora},e)}function je(o,e){return W(o,{removidoEm:void 0},e)}function ao(o,e){return o.ordem!==e.ordem?o.ordem<e.ordem?-1:1:o.id<e.id?-1:o.id>e.id?1:0}function Da(o){return o==="nome"?(e,t)=>e.nome.localeCompare(t.nome,"pt-BR",{sensitivity:"base"})||ao(e,t):o==="cadastro"?(e,t)=>e.criadoEm-t.criadoEm||ao(e,t):(e,t)=>e.inicio!==t.inicio?e.inicio<t.inicio?-1:1:e.fim!==t.fim?e.fim<t.fim?-1:1:ao(e,t)}function at(o,e,t,r){return Vo({id:e,nome:H(o.nome),processo:o.processo,etiquetas:Qo(o.etiquetas??[]),ordem:t,criadoEm:r.agora,arquivadoEm:o.arquivadoEm,origem:o.origem,atualizadoEm:r.agora,dispositivo:r.dispositivo,alteradoPor:r.por})}function Me(o,e,t,r,a){return Vo({id:t,projeto:o,nome:H(e),ordem:r,atualizadoEm:a.agora,dispositivo:a.dispositivo,alteradoPor:a.por})}function oe(o,e,t,r){let a=!!o.marco,n=a?o.inicio:o.fim,i=o.base??Qe(o.inicio,n);return Vo({id:e,projeto:o.projeto,fase:o.fase,ordem:t,nome:H(o.nome),inicio:o.inicio,fim:n,marco:a,dependeDe:[...new Set(o.dependeDe??[])],responsavel:o.responsavel,medida:o.medida??"manual",progresso:Math.min(100,Math.max(0,Math.round(o.progresso??0))),checklist:et(o.checklist??[]),processo:o.processo,documento:o.documento,etiquetas:Qo(o.etiquetas??[]),observacoes:o.observacoes?.trim()?o.observacoes:void 0,concluidaEm:o.concluidaEm,base:a?{inicio:i.inicio,fim:i.inicio}:i,criadoEm:r.agora,origem:o.origem,atualizadoEm:r.agora,dispositivo:r.dispositivo,alteradoPor:r.por})}function Oa(o,e,t,r){return W(o,{concluidaEm:e,documento:r===null?void 0:r??o.documento},t)}function ja(o,e){return W(o,{concluidaEm:void 0},e)}var Bt=o=>Math.min(100,Math.max(0,Math.round(Number.isFinite(o)?o:0)));function Xs(o,e,t,r=L){if(t<o)return 0;if(t>=e)return 100;let a=$o(o,e,r);if(a===0)return 0;let n=$o(o,z(t,-1),r);return Bt(n/a*100)}function Ks(o){return o.length?Bt(o.filter(e=>e.feito).length/o.length*100):0}function Ma(o,e,t=L){return o.concluidaEm?100:o.medida==="tempo"?Xs(o.inicio,o.fim,e,t):o.medida==="checklist"?Ks(o.checklist):Bt(o.progresso)}function Ie(o,e){return o.concluidaEm?"concluida":o.fim<e?"atrasada":o.inicio<=e||!o.marco&&o.medida==="manual"&&o.progresso>0?"andamento":"futura"}var Ia=o=>o.filter(e=>e.removidoEm===void 0);function Ys(o,e,t=L){let r=Ia(o);if(!r.length)return{progresso:0,feitas:0,total:0};let a,n,i=0,s=0,c=0;for(let l of r){J(l.inicio)&&(a===void 0||l.inicio<a)&&(a=l.inicio),J(l.fim)&&(n===void 0||l.fim>n)&&(n=l.fim),l.concluidaEm&&(c+=1);let m=l.marco?0:Math.max(1,$o(l.inicio,l.fim,t));i+=m*Ma(l,e,t),s+=m}let p={progresso:s>0?Math.round(i/s):Math.round(c/r.length*100),feitas:c,total:r.length};return a!==void 0&&(p.inicio=a),n!==void 0&&(p.fim=n),p}function Ta(o,e,t=L){let r=Ys(o,e,t),a=Ia(o),n=Se(a,e),i;return a.length?r.feitas===a.length?i="concluido":n.atrasadas.length?i="atrasado":a.some(s=>Ie(s,e)!=="futura")?i="andamento":i="aIniciar":i="semEtapas",{...r,atrasadas:n.atrasadas.length,semana:n.semana.length,situacao:i}}var G=(o,e,t,r,a=[],n=[])=>({nome:o,fase:e,aPartirDe:t,duracao:r,marco:!1,dependeDe:a,checklist:n}),jo=(o,e,t,r=[])=>({nome:o,fase:e,aPartirDe:t,duracao:0,marco:!0,dependeDe:r,checklist:[]}),Gt=(o,e,t,r,a)=>({id:o,nome:e,descricao:t,fases:r,etapas:a,criadoEm:0,atualizadoEm:0,dispositivo:"embutido"}),Xt="embutido:",Ca=[Gt(`${Xt}revisao-normativa`,"Revis\xE3o normativa","Instru\xE7\xE3o, consulta p\xFAblica e delibera\xE7\xE3o de uma norma.",["Instru\xE7\xE3o","Consulta p\xFAblica","Delibera\xE7\xE3o"],[G("Nota t\xE9cnica preliminar",0,0,15),G("An\xE1lise jur\xEDdica",0,15,14,[0]),G("Relat\xF3rio de AIR",0,21,18,[0],["Levantar dados do setor","Identificar alternativas regulat\xF3rias","Analisar custos e benef\xEDcios"]),jo("Aviso de consulta publicado",1,30,[1]),G("Per\xEDodo de contribui\xE7\xF5es",1,30,22,[3]),G("Consolida\xE7\xE3o das contribui\xE7\xF5es",1,52,15,[4]),G("Minuta final",2,67,14,[5,2]),jo("Reuni\xE3o de Diretoria",2,84,[6]),jo("Publica\xE7\xE3o no DOU",2,89,[7])]),Gt(`${Xt}pregao-eletronico`,"Contrata\xE7\xE3o por preg\xE3o eletr\xF4nico","Planejamento, sele\xE7\xE3o do fornecedor e contrato.",["Planejamento","Sele\xE7\xE3o","Contrato"],[G("Documento de formaliza\xE7\xE3o da demanda",0,0,5),G("Estudo t\xE9cnico preliminar",0,5,15,[0]),G("Pesquisa de pre\xE7os",0,10,10,[0]),G("Termo de refer\xEAncia",0,20,10,[1]),G("Parecer jur\xEDdico",0,30,10,[3,2]),jo("Edital publicado",1,40,[4]),jo("Sess\xE3o p\xFAblica do preg\xE3o",1,50,[5]),G("Julgamento e habilita\xE7\xE3o",1,50,5,[6]),jo("Adjudica\xE7\xE3o e homologa\xE7\xE3o",1,55,[7]),jo("Contrato assinado",2,60,[8]),G("Designa\xE7\xE3o da fiscaliza\xE7\xE3o",2,60,3,[9])]),Gt(`${Xt}plano-anual`,"Plano anual","Um ano de trabalho dividido em trimestres.",["1\xBA trimestre","2\xBA trimestre","3\xBA trimestre","4\xBA trimestre"],[0,1,2,3].flatMap(o=>{let e=o*63,t=o*3,r=o===0?[]:[t-1];return[G(`Planejamento do ${o+1}\xBA trimestre`,o,e,5,r),G(`Execu\xE7\xE3o do ${o+1}\xBA trimestre`,o,e+5,55,[t]),jo(`Relat\xF3rio do ${o+1}\xBA trimestre`,o,e+60,[t+1])]}))];function Js(o,e){let t=new Set(e.map(r=>r.id));return o.map(r=>{if(!r.fase||t.has(r.fase))return r;let{fase:a,...n}=r;return n})}function Kt(o,e){let t=[],r=[...Ca];for(let{vis:a,dados:n}of o){for(let i of n.projetos){let s=n.fases.filter(d=>d.projeto===i.id),c=Js(n.etapas.filter(d=>d.projeto===i.id),s);t.push({projeto:i,vis:a,fases:s,etapas:c,resumo:Ta(c,e)})}r.push(...n.modelos.map(i=>({...i,vis:a})))}return t.sort((a,n)=>ao(a.projeto,n.projeto)),{ativos:t.filter(a=>a.projeto.arquivadoEm===void 0),arquivados:t.filter(a=>a.projeto.arquivadoEm!==void 0),modelos:r}}async function nt(o,e){let[t,r]=await Promise.all([o.unidade.dados(),o.eu.dados()]);return Kt([{vis:"unidade",dados:t},{vis:"eu",dados:r}],e)}function ka(o,e){let t={atrasadas:0,semana:0,comAtraso:[],comSemana:[]};for(let{projeto:r,etapas:a}of o){if(r.arquivadoEm!==void 0)continue;let n=Se(a,e);t.atrasadas+=n.atrasadas.length,t.semana+=n.semana.length,n.atrasadas.length&&t.comAtraso.push(r.id),n.semana.length&&t.comSemana.push(r.id)}return t}var Ws=["Dia","Semana","M\xEAs","Ano"];function Yt(o){return typeof o=="string"&&Ws.includes(o)}function bo(o){return`${o.host}|${o.login.trim().toLowerCase()}|u:${o.unidade}/${o.vis==="unidade"?"un":"eu"}`}function it(o){return`projetos/${bo(o)}/`}function ee(o,e){return`${it(o)}${e}/`}function Ra(o){return`${it(o)}meta`}function st(o,e,t){let r={host:o,login:e.trim().toLowerCase(),unidade:t};return{unidade:{...r,vis:"unidade"},eu:{...r,vis:"eu"}}}function Te(o){return o==="unidade"?"Toda a unidade":"S\xF3 eu"}function Na(){return{situacoes:[],soMinhas:!1,mostrarConcluidas:!0,responsaveis:[],fases:[],etiquetas:[]}}var Zl=Object.freeze({situacoes:Object.freeze([]),soMinhas:!1,mostrarConcluidas:!0,responsaveis:Object.freeze([]),fases:Object.freeze([]),etiquetas:Object.freeze([])});var Zs={mostrarLista:!0,moverDependentes:!0,ordemEtapas:"inicio",escalas:{},escalaTodos:"M\xEAs",vista:"gantt",abertos:{},recolhidas:[],filtro:Na(),modoLateral:"agenda",soMinhas:!1,recolhido:!1},Qs=200,oc=500,ec=["atrasadas","andamento","semana","proximos30"],Ce=(o,e=oc)=>Array.isArray(o)?o.filter(t=>typeof t=="string").slice(-e):[];function _a(o,e){if(!o||typeof o!="object"||Array.isArray(o))return{};let t=Object.entries(o).filter(r=>e(r[1]));return Object.fromEntries(t.slice(-Qs))}function tc(o){let e=o&&typeof o=="object"?o:{};return{situacoes:Ce(e.situacoes).filter(t=>ec.includes(t)),soMinhas:e.soMinhas===!0,mostrarConcluidas:e.mostrarConcluidas!==!1,responsaveis:Ce(e.responsaveis),fases:Ce(e.fases),etiquetas:Ce(e.etiquetas)}}function La(o){let e=o&&typeof o=="object"?o:{},t=Zs,r=(a,n)=>typeof a=="boolean"?a:n;return{mostrarLista:r(e.mostrarLista,t.mostrarLista),moverDependentes:r(e.moverDependentes,t.moverDependentes),ordemEtapas:e.ordemEtapas==="nome"||e.ordemEtapas==="cadastro"?e.ordemEtapas:"inicio",escalas:_a(e.escalas,Yt),escalaTodos:Yt(e.escalaTodos)?e.escalaTodos:t.escalaTodos,vista:e.vista==="lista"?"lista":"gantt",abertos:_a(e.abertos,a=>typeof a=="string"),recolhidas:Ce(e.recolhidas),filtro:tc(e.filtro),modoLateral:e.modoLateral==="projetos"?"projetos":"agenda",soMinhas:r(e.soMinhas,t.soMinhas),recolhido:r(e.recolhido,t.recolhido)}}async function Jt(o){return La((await o.obter(We))[We])}async function qa(o,e){let t=La({...await Jt(o),...e});return await o.gravar({[We]:t}),t}var Va="seipro-projetos",za="seipro-projetos-lateral";function te(o){return o.unidade?`${o.host}|${o.login.trim().toLowerCase()}|u:${o.unidade.id}`:""}var re="projetos/foco",Wt=6e4,$a=o=>typeof o=="string"&&o.length>0&&o.length<=200;function Ua(o,e,t,r){if(!o||typeof o!="object"||Array.isArray(o))return null;let a=o;if(a.alvo!==e||!t||a.chave!==t||!$a(a.projeto)||typeof a.ate!="number"||!Number.isFinite(a.ate)||a.ate<r||a.ate>r+Wt)return null;let n={alvo:e,chave:t,projeto:a.projeto,ate:a.ate};return $a(a.etapa)&&(n.etapa=a.etapa),n}async function Zt(o,e){if(o.chaves){let r=(await o.chaves()).filter(a=>a.startsWith(e));return r.length?o.obter(r):{}}let t=await o.obter(null);return Object.fromEntries(Object.entries(t).filter(([r])=>r.startsWith(e)))}var Mo=class{constructor(e,t){this.area=e;this.prefixo=t}chave(e){return this.prefixo+e}async listar(){return Object.values(await Zt(this.area,this.prefixo))}async obter(e){let t=this.chave(e);return(await this.area.obter(t))[t]}async gravar(e,t){await this.area.gravar({[this.chave(e)]:t})}async gravarVarios(e){e.length&&await this.area.gravar(Object.fromEntries(e.map(([t,r])=>[this.chave(t),r])))}async apagar(e){e.length&&await this.area.remover(e.map(t=>this.chave(t)))}aoMudar(e){return this.area.aoMudar(t=>{Object.keys(t).some(r=>r.startsWith(this.prefixo))&&e()})}};var Ya="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",Fa=new Map;function rc(o){let e=Fa.get(o);if(e===void 0){e=new Uint8Array(256);for(let t=0;t<o.length;t++)e[o.charCodeAt(t)]=t;Fa.set(o,e)}return e}function ae(o,e,t,r){let a=t[0];if(e!=null&&o>=e)throw new Error(o+" >= "+e);if(o.slice(-1)===a||e&&e.slice(-1)===a)throw new Error("trailing zero");if(e){let s=0;for(;(o[s]||a)===e[s];)s++;if(s>0)return e.slice(0,s)+ae(o.slice(s),e.slice(s),t,r)}let n=o?r[o.charCodeAt(0)]:0,i=e!=null?r[e.charCodeAt(0)]:t.length;if(i-n>1){let s=Math.round(.5*(n+i));return t[s]}else return e&&e.length>1?e.slice(0,1):t[n]+ae(o.slice(1),null,t,r)}function Ja(o,e){if(o.length!==ne(o[0],e))throw new Error("invalid integer part of order key: "+o)}function ne(o,e){if(e===void 0){let t=o.charCodeAt(0);if(t>=97&&t<=122)return t-97+2;if(t>=65&&t<=90)return 90-t+2}else{let t=e.indexOf(o);if(t!==-1){let r=e.length/2;return t<r?r-t+1:t-r+2}}throw new Error("invalid order key head: "+o)}function ke(o,e){let t=ne(o[0],e);if(t>o.length)throw new Error("invalid order key: "+o);return o.slice(0,t)}function Ha(o,e,t){if(Wa(o,e,t))throw new Error("invalid order key: "+o);let r=ke(o,t);if(o.slice(r.length).slice(-1)===e[0])throw new Error("invalid order key: "+o)}function Ba(o,e,t,r){Ja(o,r);let a=o[0],n=e[0],i="";for(let p=o.length-1;p>=1;p--){let l=t[o.charCodeAt(p)]+1;if(l===e.length)i=n+i;else return a+o.slice(1,p)+e[l]+i}if(r===void 0){if(a==="Z")return"a"+n;if(a==="z")return null;let p=String.fromCharCode(a.charCodeAt(0)+1);return p+(p>"a"?i+n:i.slice(1))}let s=r.indexOf(a);if(s===r.length-1)return null;let c=r[s+1],d=ne(c,r)-ne(a,r);return c+(d>0?i+n:d<0?i.slice(1):i)}function ac(o,e,t,r){Ja(o,r);let a=o[0],n=e[e.length-1],i="";for(let p=o.length-1;p>=1;p--){let l=t[o.charCodeAt(p)]-1;if(l===-1)i=n+i;else return a+o.slice(1,p)+e[l]+i}if(r===void 0){if(a==="a")return"Z"+n;if(a==="A")return null;let p=String.fromCharCode(a.charCodeAt(0)-1);return p+(p<"Z"?i+n:i.slice(1))}let s=r.indexOf(a);if(s===0)return null;let c=r[s-1],d=ne(c,r)-ne(a,r);return c+(d>0?i+n:d<0?i.slice(1):i)}var Ga=new Map;function Wa(o,e,t=""){let r=Ga.get(t);r===void 0&&(r=new Map,Ga.set(t,r));let a=e.charCodeAt(0),n=r.get(a);return n===void 0&&(n=t===""?"A"+e[0].repeat(26):t[0]+e[0].repeat(t.length/2),r.set(a,n)),o===n}function Za(o){for(let e=1;e<o.length;e++)if(o.charCodeAt(e-1)>=o.charCodeAt(e))return!1;return!0}function Qa(o){for(let e=0;e<o.length;e++)if(o.charCodeAt(e)>255)return!1;return!0}var Xa=new Set;function on(o){if(!Xa.has(o)){if(o.length<2||!Za(o))throw new Error("digits must be at least 2 characters in strictly ascending character code order: "+o);if(!Qa(o))throw new Error("digits must be single-byte (char code 0-255): "+o);Xa.add(o)}}var Ka=new Set;function en(o){if(!Ka.has(o)){if(o.length<2||o.length%2!==0||!Za(o))throw new Error("intDigits must be an even number of at least 2 characters in strictly ascending character code order: "+o);if(!Qa(o))throw new Error("intDigits must be single-byte (char code 0-255): "+o);Ka.add(o)}}function xo(o,e,t=Ya,r=void 0){on(t),r!==void 0&&en(r);let a=rc(t);if(o!=null&&Ha(o,t,r),e!=null&&Ha(e,t,r),o!=null&&e!=null&&o>e){let p=o;o=e,e=p}if(o==null){if(e==null)return(r===void 0?"a":r[r.length/2])+t[0];let p=ke(e,r),l=e.slice(p.length);if(Wa(p,t,r))return p+ae("",l,t,a);if(p<e)return p;let m=ac(p,t,a,r);if(m==null)throw new Error("cannot decrement any more");return m}if(e==null){let p=ke(o,r),l=o.slice(p.length),m=Ba(p,t,a,r);return m??p+ae(l,null,t,a)}let n=ke(o,r),i=o.slice(n.length),s=ke(e,r),c=e.slice(s.length);if(n===s)return n+ae(i,c,t,a);let d=Ba(n,t,a,r);if(d==null)throw new Error("cannot increment any more");return d<e?d:n+ae(i,null,t,a)}function ct(o,e,t,r=Ya,a=void 0){if(on(r),a!==void 0&&en(a),t===0)return[];if(t===1)return[xo(o,e,r,a)];if(e==null){let s=xo(o,e,r,a),c=[s];for(let d=0;d<t-1;d++)s=xo(s,e,r,a),c.push(s);return c}if(o==null){let s=xo(o,e,r,a),c=[s];for(let d=0;d<t-1;d++)s=xo(o,s,r,a),c.push(s);return c.reverse(),c}let n=Math.floor(t/2),i=xo(o,e,r,a);return[...ct(o,i,n,r,a),i,...ct(i,e,t-n-1,r,a)]}function zo(o,e){return xo(o??null,e??null)}function tn(o){try{return xo(o,null),!0}catch{return!1}}function Qt(o,e,t){return ct(o,e,t)}function io(o){if(Array.isArray(o))return`[${o.map(io).join(",")}]`;if(o&&typeof o=="object"){let e=o;return`{${Object.keys(e).sort().filter(t=>e[t]!==void 0).map(t=>`${JSON.stringify(t)}:${io(e[t])}`).join(",")}}`}return JSON.stringify(o)}function ie(o){return[...o].sort((e,t)=>e.id<t.id?-1:e.id>t.id?1:0)}function rn(o){let e=io(o);return`${Ee(e)}${Ee(e.split("").reverse().join(""))}`}function nc(o,e){return o.atualizadoEm!==e.atualizadoEm?o.atualizadoEm>e.atualizadoEm:o.dispositivo!==e.dispositivo?o.dispositivo>e.dispositivo:JSON.stringify(o)>JSON.stringify(e)}function an(...o){let e=new Map;for(let t of o)for(let r of t){let a=e.get(r.id);(!a||nc(r,a))&&e.set(r.id,r)}return[...e.values()].sort((t,r)=>t.id<r.id?-1:t.id>r.id?1:0)}function mo(o,e,t=90){let r=e-t*864e5;return o.filter(a=>a.removidoEm===void 0||a.removidoEm>=r)}var Io=o=>`\u201C${o}\u201D`;function ic(o,e){let t=new Map(o.map(i=>[i.id,i.dependeDe]));if(e!==void 0)return sc(t,e);let r=new Map,a=[],n=i=>{r.set(i,1),a.push(i);for(let s of t.get(i)??[]){if(!t.has(s))continue;let c=r.get(s);if(c===1)return[...a.slice(a.indexOf(s)),s];if(c===void 0){let d=n(s);if(d)return d}}return a.pop(),r.set(i,2),null};for(let i of o){if(r.has(i.id))continue;let s=n(i.id);if(s)return s}return null}function sc(o,e){if(!o.has(e))return null;let t=new Set,r=[],a=n=>{t.add(n),r.push(n);for(let i of o.get(n)??[]){if(i===e)return[...r,e];if(!o.has(i)||t.has(i))continue;let s=a(i);if(s)return s}return r.pop(),null};return a(e)}function cc(o,e){return`Depend\xEAncia circular: ${o.map(t=>Io(e.get(t)??t)).join(" \u2192 ")}.`}function nn(o,e){if(o.dependeDe.includes(o.id))return"Uma etapa n\xE3o pode depender dela mesma.";let t=new Map(e.filter(d=>d.removidoEm===void 0).map(d=>[d.id,d]));for(let d of o.dependeDe){let p=t.get(d);if(!p||p.projeto!==o.projeto)return"Uma etapa s\xF3 pode depender de etapas do mesmo projeto."}let r=[...t.values()].filter(d=>d.id!==o.id).map(d=>({id:d.id,dependeDe:d.dependeDe}));r.push({id:o.id,dependeDe:o.dependeDe});let a=ic(r,o.id);if(!a)return null;let n=a.slice(0,-1),i=Math.max(0,n.indexOf(o.id)),s=[...n.slice(i),...n.slice(0,i)];s.push(s[0]);let c=new Map([...t.values()].map(d=>[d.id,d.nome]));return c.has(o.id)||c.set(o.id,"esta etapa"),cc(s,c)}function or(o,e){let t=o.filter(n=>n.removidoEm===void 0),r=new Map(t.map(n=>[n.id,n])),a=[];for(let n of t)if(!(e&&!e.has(n.id))){n.fim<n.inicio&&a.push({chave:`fim|${n.id}`,mensagem:`${Io(n.nome)} termina antes de come\xE7ar.`}),n.marco&&n.fim!==n.inicio&&a.push({chave:`marco|${n.id}`,mensagem:`O marco ${Io(n.nome)} tem uma data s\xF3.`});for(let i of n.dependeDe){let s=r.get(i);s&&n.inicio<s.inicio&&a.push({chave:`dep|${n.id}|${i}`,mensagem:`${Io(n.nome)} n\xE3o pode come\xE7ar antes de ${Io(s.nome)}, da qual depende.`})}}return a}function sn(o,e){return or(o,e).map(t=>t.mensagem)}function dc(o,e,t){let r=new Set(t);for(let n of e)n.dependeDe.some(i=>t.has(i))&&r.add(n.id);let a=new Set(or(o,r).map(n=>n.chave));return[...new Set(or(e,r).filter(n=>!a.has(n.chave)).map(n=>n.mensagem))]}function cn(o,e){let t=new Map(o.filter(n=>n.removidoEm===void 0).map(n=>[n.id,n])),r=new Map,a=[];for(let n of e){let i=t.get(n.id);if(!i)continue;let s=i.marco?n.inicio:n.fim;!J(n.inicio)||!J(s)?a.push(`Datas inv\xE1lidas para ${Io(i.nome)}.`):!R(n.inicio)||!R(s)?a.push(`${Io(i.nome)} s\xF3 pode ter datas entre ${Ko} e ${Yo}.`):po(n.inicio,s)>Jo?a.push(`${Io(i.nome)} pode durar no m\xE1ximo cerca de 10 anos.`):r.set(i.id,{...i,inicio:n.inicio,fim:s})}return a.length?[...new Set(a)]:dc(o,o.map(n=>r.get(n.id)??n),new Set(r.keys()))}var Co="processo sigiloso",To="documento de processo sigiloso",Re={processos:new Set,documentos:new Set},se=()=>({processos:[],documentos:[]}),Uo=(...o)=>({processos:o.flatMap(e=>e.processos),documentos:o.flatMap(e=>e.documentos)}),Eo=o=>!!o&&typeof o=="object"&&!Array.isArray(o);function dt(o){if(!Eo(o))return;let e=o.processo;return Eo(e)&&typeof e.protocolo=="string"?e:void 0}function un(o){if(!Eo(o))return;let e=o.documento;return Eo(e)&&typeof e.numero=="string"?e:void 0}function ko(o,e,t=Re){let r=new Set(t.processos);for(let c of[...o,...e]){let d=dt(c),p=d?.sigiloso===!0?D(d.protocolo):"";p&&r.add(p)}let a=c=>!!c&&(c.sigiloso===!0||typeof c.protocolo=="string"&&r.has(D(c.protocolo))),n=new Set;for(let c of o)Eo(c)&&typeof c.id=="string"&&a(dt(c))&&n.add(c.id);let i=new Set,s=new Set(t.documentos);for(let c of e){let d=un(c),p=d?.sigiloso===!0?q(d.numero):"";if(p&&s.add(p),!Eo(c)||typeof c.id!="string")continue;let l=dt(c);(l?a(l):typeof c.projeto=="string"&&n.has(c.projeto))&&i.add(c.id)}return{chaves:r,projetos:n,etapas:i,documentos:s,vinculo:a}}function pc(o,e,t){return o.processo?t.vinculo(o.processo):!!e&&t.vinculo(e.processo)}var dn={protocolo:"",sigiloso:!0};var lc={numero:"",sigiloso:!0},pt=o=>!!o&&o.numero===""&&o.sigiloso===!0,er=o=>({...o,sigiloso:!0}),tr=o=>({...o,sigiloso:!0}),mn=(o,e)=>Eo(e)&&e.atualizadoEm===o.atualizadoEm&&e.dispositivo===o.dispositivo;function uc(o,e){return o.idProcedimento&&e.idProcedimento&&o.idProcedimento!==e.idProcedimento?!1:!e.protocolo||D(e.protocolo)===D(o.protocolo)}function pn(o,e){let t=o.processo;if(!t||t.sigiloso)return o;for(let r of e){let a=mn(o,r)?dt(r):void 0;if(a?.sigiloso===!0&&uc(t,a))return{...o,processo:er(t)}}return o}function mc(o,e){let t=o.documento;if(!t||t.sigiloso||!t.numero)return o;for(let r of e){if(!mn(o,r))continue;let a=un(r);if(a?.sigiloso===!0&&(a.numero===""||q(a.numero)===q(t.numero)))return{...o,documento:tr(t)}}return o}function rr(o,e={},t=Re){let r=f=>{let g=new Map;for(let x of f??[])Eo(x)&&typeof x.id=="string"&&g.set(x.id,[...g.get(x.id)??[],x]);return g},a=r(e.p),n=r(e.e),i=o.p.map(f=>pn(f,a.get(f.id)??[])),s=o.e.map(f=>mc(pn(f,n.get(f.id)??[]),n.get(f.id)??[])),c=ko([...i,...e.p??[]],[...s,...e.e??[]],t),d=i.map(f=>f.processo&&!f.processo.sigiloso&&c.vinculo(f.processo)?{...f,processo:er(f.processo)}:f),p=new Map(d.map(f=>[f.id,f])),l=s.map(f=>{let g=f.processo&&!f.processo.sigiloso&&c.vinculo(f.processo)?{...f,processo:er(f.processo)}:f;return pc(g,p.get(g.projeto),c)&&g.documento&&!g.documento.sigiloso&&(g={...g,documento:tr(g.documento)}),g}),m=new Set([...c.documentos,...l.flatMap(f=>f.documento?.sigiloso?[q(f.documento.numero)]:[])]);m.delete("");let u=l.map(f=>f.documento&&!f.documento.sigiloso&&m.has(q(f.documento.numero))?{...f,documento:tr(f.documento)}:f);return{p:d.filter((f,g)=>f!==o.p[g]),e:u.filter((f,g)=>f!==o.e[g])}}function yo(o,e,t){let r=se();for(let a of[...o,...e]){if(t&&!t.processo(a))continue;let n=a.processo?.sigiloso===!0&&typeof a.processo.protocolo=="string"?D(a.processo.protocolo):"";n&&r.processos.push(n)}for(let a of e){if(t&&!t.documento(a))continue;let n=a.documento?.sigiloso===!0?q(a.documento.numero):"";n&&r.documentos.push(n)}return r}function fn(o,e){let t=new Map(o.map(n=>[n.id,n])),r=[],a=[];for(let n of e){if(!Eo(n)||typeof n.id!="string")continue;let i=t.get(n.id);if(!(!i||i.atualizadoEm!==n.atualizadoEm||i.dispositivo!==n.dispositivo||i.campo!==n.campo))for(let s of["antes","depois"]){let c=i[s];typeof c!="string"||!c||(i.campo==="processo"&&n[s]===Co&&D(c)&&r.push(D(c)),i.campo==="documento"&&n[s]===To&&c!==To&&q(c)&&a.push(q(c)))}}return{processos:r,documentos:a}}function Ro(o,e,t=()=>!0){let r=se(),a=p=>{let l=typeof p=="string"?D(p):"";l&&r.processos.push(l)},n=new Set(e.documentos);for(let p of o.e)e.etapas.has(p.id)&&p.documento?.numero&&n.add(q(p.documento.numero));for(let p of o.h)if(!(p.campo!=="documento"||!e.etapas.has(p.alvo)))for(let l of[p.antes,p.depois])l&&l!==To&&n.add(q(l));n.delete("");let i={...e,documentos:n},s=o.p.map(p=>i.projetos.has(p.id)?(t(p)&&a(p.processo?.protocolo),{...p,processo:dn}):p),c=o.e.map(p=>{let l=i.etapas.has(p.id),m=t(p),u=p,f=u.documento;return f&&(l||f.sigiloso||n.has(q(f.numero)))&&(q(f.numero)&&m&&r.documentos.push(q(f.numero)),u={...u,documento:lc}),l&&u.processo&&(m&&a(u.processo.protocolo),u={...u,processo:dn}),u}),d=o.h.map(p=>{let l=fc(p,i);if(l!==p&&t(p))for(let m of["antes","depois"]){let u=p[m];!u||l[m]===u||(p.campo==="processo"?a(u):q(u)&&r.documentos.push(q(u)))}return l});return{p:s,e:c,h:d,raspados:r}}function ln(o){let e={...o};for(let t of["antes","depois"])e[t]===void 0&&delete e[t];return e}function fc(o,e){if(o.campo==="processo"){let t=n=>n!==void 0&&e.chaves.has(D(n))?Co:n,r=t(o.antes),a=t(o.depois);return r===o.antes&&a===o.depois?o:ln({...o,antes:r,depois:a})}if(o.campo==="documento"){let t=e.etapas.has(o.alvo),r=i=>i&&(t||e.documentos.has(q(i)))?To:i,a=r(o.antes),n=r(o.depois);return a===o.antes&&n===o.depois?o:ln({...o,antes:a,depois:n})}return o}var gc={nomeDaFase:()=>{},nomeDaEtapa:()=>{}};function gn(o,e){if(o.length<=e)return o;let t=o.charCodeAt(e-2),r=t>=55296&&t<=56319?e-2:e-1;return`${o.slice(0,r)}\u2026`}function hn(o){if(o)return o.sigiloso?Co:o.protocolo||void 0}var vn=o=>pt(o)?To:o?.numero||void 0,bn=o=>o&&typeof o.protocolo=="string"?D(o.protocolo):"";function xn(o,e){let t=[hn(o),hn(e)];if(!o?.sigiloso&&!e?.sigiloso)return t;let r=bn(o),a=bn(e);return r!==a&&r&&a?t:[o?Co:void 0,e?Co:void 0]}function ar(o,e,t,r,a){return!o&&e?[{alvo:t,projeto:r,campo:"criacao",depois:a(e)}]:o&&e&&o.removidoEm===void 0&&e.removidoEm!==void 0?[{alvo:t,projeto:r,campo:"exclusao",antes:a(o)}]:o&&e&&o.removidoEm!==void 0&&e.removidoEm===void 0?[{alvo:t,projeto:r,campo:"restauracao",depois:a(e)}]:!o||!e?[]:null}function lt(o,e,t,r,a,n){(a??"")!==(n??"")&&o.push({alvo:e,projeto:t,campo:r,antes:a,depois:n})}function fo(o,e,t=gc){let r=e??o;if(!r)return[];let a=ar(o,e,r.id,r.projeto,u=>u.nome);if(a)return a;let n=o,i=e,s=[],c=(u,f,g)=>lt(s,i.id,i.projeto,u,f,g);c("nome",n.nome,i.nome),c("inicio",n.inicio,i.inicio),i.marco||c("fim",n.fim,i.fim),c("responsavel",n.responsavel?.nome,i.responsavel?.nome),c("conclusao",n.concluidaEm,i.concluidaEm),i.medida==="manual"&&n.progresso!==i.progresso&&c("progresso",String(n.progresso),String(i.progresso));let d=u=>u?t.nomeDaFase(u)??"":void 0;c("fase",d(n.fase),d(i.fase));let p=u=>u.length?u.map(f=>t.nomeDaEtapa(f)??f).sort((f,g)=>f.localeCompare(g,"pt-BR")).join("; "):void 0;[...n.dependeDe].sort().join()!==[...i.dependeDe].sort().join()&&c("dependencias",p(n.dependeDe),p(i.dependeDe)),c("processo",...xn(n.processo,i.processo)),c("documento",vn(n.documento),vn(i.documento));let l=n.inicio===i.inicio&&n.fim===i.fim,m=u=>u.base?`${u.base.inicio}/${u.base.fim}`:void 0;return l&&c("base",m(n),m(i)),s}function wo(o,e){let t=e??o;if(!t)return[];let r=ar(o,e,t.id,t.id,s=>s.nome);if(r)return r;let a=o,n=e,i=[];return lt(i,n.id,n.id,"nome",a.nome,n.nome),lt(i,n.id,n.id,"processo",...xn(a.processo,n.processo)),a.arquivadoEm===void 0!=(n.arquivadoEm===void 0)&&i.push({alvo:n.id,projeto:n.id,campo:"arquivamento",depois:n.arquivadoEm===void 0?"reativado":"arquivado"}),i}function ut(o,e){let t=e??o;if(!t)return[];let r=ar(o,e,t.id,t.projeto,n=>n.nome);if(r)return r;let a=[];return lt(a,t.id,t.projeto,"nome",o.nome,e.nome),a}function En(o,e,t){let r=n=>n===void 0?void 0:gn(n,h.registroValor),a=n=>gn(n,h.rotulo);return o.map(n=>{let i={id:t(),...n,antes:r(n.antes),depois:r(n.depois),quando:e.agora,por:a(e.por??""),atualizadoEm:e.agora,dispositivo:e.dispositivo};return e.nome&&(i.nome=a(e.nome)),e.por&&(i.alteradoPor=a(e.por)),i.antes===void 0&&delete i.antes,i.depois===void 0&&delete i.depois,i})}function ce(o,e,t){return new Set(mo([...o],e,t).map(r=>r.id))}var hc=30*864e5;function de(o,e,t){let r=o.filter(s=>s.removidoEm===void 0);if(r.length<=e)return[];let a=t===void 0?Number.POSITIVE_INFINITY:t+hc,n=s=>s.quando>a||s.atualizadoEm>a?Number.NEGATIVE_INFINITY:s.quando;return[...r].sort((s,c)=>{let d=n(s),p=n(c);return d!==p?d<p?1:-1:s.id<c.id?-1:s.id>c.id?1:0}).slice(e).map(s=>s.id)}var vc=2e4,mt=class extends Error{constructor(e){super("N\xE3o foi poss\xEDvel ler a lista de processos sigilosos deste computador. Nada foi gravado; tente de novo.",{cause:e}),this.name="ErroMemoriaSigilo"}},bc=o=>typeof o=="string"&&o.length>0&&o.length<=64;function Ne(o,e){let t=new Map,r=new Map,a=(n,i,s)=>{n.get(i)!=="local"&&n.set(i,s)};for(let[n,i]of Object.entries(o)){if(!n.startsWith(e))continue;let s=n.slice(e.length),c=s.startsWith("p/")?t:s.startsWith("d/")?r:null,d=c===r?q(s.slice(2)):s.slice(2);!c||!d||a(c,d,i==="aprendida"?"aprendida":"local")}return{processos:t,documentos:r}}function ft(o,e,t,r,a={}){let n=a.teto??vc,i={};for(let[s,c]of[["p","processos"],["d","documentos"]]){let d=new Map(o[c]),p=[...d.values()].filter(l=>l==="aprendida").length;for(let l of e[c]){let m=c==="documentos"&&typeof l=="string"?q(l):l;if(!bc(m))continue;let u=d.get(m);if(t==="local"){if(u==="local"||u==="aprendida"&&!a.promover)continue;u==="aprendida"&&p--,d.set(m,"local"),i[`${r}${s}/${m}`]="local"}else{if(u!==void 0||p>=n)continue;p++,d.set(m,"aprendida"),i[`${r}${s}/${m}`]="aprendida"}}}return i}function nr(o,e,t){let r=new Map(o.processos),a=new Map(o.documentos);for(let[n,i]of Object.entries(e)){let s=n.slice(t.length);(s.startsWith("p/")?r:a).set(s.slice(2),i)}return{processos:r,documentos:a}}function pe(o){return{processos:new Set(o.processos.keys()),documentos:new Set(o.documentos.keys())}}function yn(o){return o.etapas.slice(0,h.etapasPorProjeto)}function xc(o,e,t=L){let r=qo(e,t);return yn(o).map(a=>{let n=a.aPartirDe>0?Ea(r,Math.floor(a.aPartirDe),t):r;return{inicio:n,fim:a.marco?n:Pe(n,a.duracao,t)}})}function wn(o,e,t){let r=t.carimbo,a=o.fases.slice(0,h.etapasPorProjeto),n=yn(o),i=a.length?Qt(null,null,a.length):[],s=a.map((m,u)=>Me(t.projeto,m,t.novoId(),i[u],r)),c=n.map(()=>t.novoId()),d=n.length?Qt(null,null,n.length):[],p=xc(o,e,t.feriados??L),l=n.map((m,u)=>oe({projeto:t.projeto,nome:m.nome,inicio:p[u].inicio,fim:p[u].fim,marco:m.marco,fase:m.fase!==void 0?s[m.fase]?.id:void 0,dependeDe:m.dependeDe.filter(f=>f!==u&&f>=0&&f<c.length).map(f=>c[f]),checklist:m.checklist.map(f=>({id:t.novoId(),texto:f,feito:!1}))},c[u],d[u],r));return{fases:s,etapas:l}}function Pn(o,e,t,r,a,n=L){let i=o.fases.filter(u=>u.removidoEm===void 0).sort(ao),s=new Map(i.map((u,f)=>[u.id,f])),c=o.etapas.filter(u=>u.removidoEm===void 0).sort(Da("inicio")),d=new Map(c.map((u,f)=>[u.id,f])),p=c.length?qo(c[0].inicio,n):void 0,l=c.map(u=>{let f={nome:u.nome,aPartirDe:p?Math.max(0,Ae(p,qo(u.inicio,n),n)):0,duracao:u.marco?0:Math.max(1,$o(u.inicio,u.fim,n)),marco:u.marco,dependeDe:u.dependeDe.map(x=>d.get(x)).filter(x=>x!==void 0),checklist:u.checklist.map(x=>x.texto)},g=u.fase!==void 0?s.get(u.fase):void 0;return g!==void 0&&(f.fase=g),f}),m={id:t,nome:H(e),fases:i.map(u=>u.nome),etapas:l,criadoEm:r.agora,atualizadoEm:r.agora,dispositivo:r.dispositivo};return a?.trim()&&(m.descricao=a.trim()),r.por&&(m.alteradoPor=r.por),m}var Ec=["nome","etiquetas"],yc=["nome","inicio","fim","marco","dependeDe","medida","progresso","checklist","etiquetas"];function An(o,e){let t={...o};for(let r of e)t[r]===void 0&&delete t[r];return t}var le=o=>o.reduce((e,t)=>tn(t.ordem)&&(e===null||t.ordem>e)?t.ordem:e,null),C=o=>!!o&&o.removidoEm===void 0,Ho=class{constructor(e,t,r,a=He){this.area=e;this.escopo=t;this.carimbo=r;this.gerarId=a;this.base=it(t),this.projetos=new Mo(e,ee(t,"p")),this.fases=new Mo(e,ee(t,"f")),this.etapas=new Mo(e,ee(t,"e")),this.registros=new Mo(e,ee(t,"h")),this.modelos=new Mo(e,ee(t,"m"))}projetos;fases;etapas;registros;modelos;base;async registrar(){await this.area.gravar({[Ra(this.escopo)]:{escopo:this.escopo}})}async entidades(){return gt(await Zt(this.area,this.base),this.base)}async dados(){let e=await this.entidades(),t=e.p.filter(C).sort(ao),r=new Set(t.map(a=>a.id));return{projetos:t,fases:e.f.filter(a=>C(a)&&r.has(a.projeto)).sort(ao),etapas:e.e.filter(a=>C(a)&&r.has(a.projeto)).sort(ao),modelos:e.m.filter(C).sort((a,n)=>a.nome.localeCompare(n.nome,"pt-BR"))}}get prefixoMemoria(){return ga(this.escopo.host,this.escopo.login)}async lerChaves(e){let t=r=>e&&r.startsWith(this.base)||r.startsWith(this.prefixoMemoria);try{if(this.area.chaves){let r=(await this.area.chaves()).filter(t);return r.length?await this.area.obter(r):{}}return Object.fromEntries(Object.entries(await this.area.obter(null)).filter(([r])=>t(r)))}catch(r){throw new mt(r)}}async memoria(){return Ne(await this.lerChaves(!1),this.prefixoMemoria)}async sigilosConhecidos(){return pe(await this.memoria())}async lembrarSigilo(e,t,r={}){let a=ft(await this.memoria(),e,t,this.prefixoMemoria,r);Object.keys(a).length&&await this.area.gravar(a)}entradasPorOrigem(e,t){let r=ft(e,t.local,"local",this.prefixoMemoria,{promover:!0}),a=ft(nr(e,r,this.prefixoMemoria),t.aprendida,"aprendida",this.prefixoMemoria);return{...r,...a}}async exportarComConhecidos(e=Date.now()){let t=await this.lerChaves(!0),r=pe(Ne(t,this.prefixoMemoria));return{envelope:this.envelopeDe(gt(t,this.base),e),conhecidos:r}}carimboAtual(){return this.carimbo()}async anotarVisibilidade(e,t,r,a){await this.salvar({},[{alvo:e.id,projeto:e.id,campo:"visibilidade",antes:t,depois:r}],a)}async historico(e){return(await this.registros.listar()).filter(t=>C(t)&&(!e||t.projeto===e)).sort((t,r)=>r.quando-t.quando||(t.id<r.id?1:t.id>r.id?-1:0))}entradas(e,t){return Object.fromEntries(t.map(([r,a])=>[e.chave(r),a]))}async salvar(e,t,r,a=!1){let n=En(t,r,this.gerarId);await this.area.gravar({...e,...await this.marcasAoGravar(e,n,a,r.dispositivo),...this.entradas(this.registros,n.map(i=>[i.id,i]))}),n.length&&await this.podarHistorico(r.agora)}async marcasAoGravar(e,t,r,a){let n=j=>Object.entries(e).filter(([S])=>S.startsWith(j)),i=n(this.projetos.prefixo),s=n(this.etapas.prefixo);if(!i.length&&!s.length)return{};let c=await this.area.obter([...i,...s].map(([j])=>j)),d=(j,S)=>io(j?.[S]??null),p=(j,S)=>new Set(S.filter(([M,V])=>d(c[M],j)!==d(V,j)).map(([,M])=>M.id)),l=p("processo",[...i,...s]),m=p("documento",s);if(!l.size&&!m.size)return{};let[u,f,g,x]=await Promise.all([this.projetos.listar(),this.etapas.listar(),this.registros.listar(),this.memoria()]),E=Object.fromEntries(Object.entries(e).filter(([j,S])=>j.startsWith(this.prefixoMemoria)&&(S==="local"||S==="aprendida"))),v=nr(x,E,this.prefixoMemoria),y=pe(v),A={p:go(u,i),e:go(f,s)},T=rr(A,{p:u,e:f},y),I=go(A.p,T.p.map(j=>[j.id,j])),Q=go(A.e,T.e.map(j=>[j.id,j])),K=ko(I,Q,y),Lo={p:I,e:Q,h:[...g,...t]},so=Uo(yo(I,Q),Ro(Lo,K).raspados),Z=se();if(!r){let j=Ro({p:u,e:f,h:g},ko(u,f,y)),S=Uo(yo(u,f),j.raspados),M={processo:k=>l.has(k.id),documento:k=>m.has(k.id)},V=k=>k.dispositivo===a&&k.removidoEm===void 0,Ao=Uo(yo(I.filter(V),Q.filter(V)),Ro(Lo,K,V).raspados);Z=Uo(yo(I,Q,M),Dn(yo(u,f,M),so),Dn(Ao,S))}return{...this.entradas(this.projetos,T.p.map(j=>[j.id,j])),...this.entradas(this.etapas,T.e.map(j=>[j.id,j])),...this.entradasPorOrigem(v,{local:Z,aprendida:so})}}async podarHistorico(e){let t=await this.entidades(),r=ce(t.p,e,Xo(this.escopo.vis));await this.registros.apagar(de(t.h.filter(a=>r.has(a.projeto)),h.historico,e))}async apoio(e){let[t,r]=await Promise.all([this.fases.listar(),this.etapas.listar()]),a=new Map(t.filter(i=>i.projeto===e).map(i=>[i.id,i.nome])),n=new Map(r.filter(i=>i.projeto===e).map(i=>[i.id,i.nome]));return{nomeDaFase:i=>a.get(i),nomeDaEtapa:i=>n.get(i)}}async exigirVagaDeProjeto(){if((await this.projetos.listar()).filter(t=>C(t)&&t.arquivadoEm===void 0).length>=h.projetosAtivos)throw new P([Tn(this.escopo.vis)])}async obterProjeto(e){let t=await this.projetos.obter(e);return C(t)?t:void 0}async exigirProjeto(e){let t=await this.obterProjeto(e);if(!t)throw new P(["O projeto n\xE3o existe mais."]);return t}async criarProjeto(e){await this.exigirVagaDeProjeto();let t=this.carimbo(),r=at(e,this.gerarId(),zo(le(await this.projetos.listar()),null),t),a=tt(r);if(a.length)throw new P(a);return await this.salvar(this.entradas(this.projetos,[[r.id,r]]),wo(void 0,r),t),r}async editarProjeto(e,t){let r=await this.exigirProjeto(e),a=An(t,Ec);typeof a.nome=="string"&&(a.nome=H(a.nome)),a.etiquetas&&(a.etiquetas=Qo(a.etiquetas));let n=tt({...r,...a});if(n.length)throw new P(n);let i=this.carimbo(),s=W(r,a,i);return await this.salvar(this.entradas(this.projetos,[[e,s]]),wo(r,s),i),s}async arquivarProjeto(e){let t=await this.exigirProjeto(e);if(t.arquivadoEm!==void 0)return t;let r=this.carimbo(),a=W(t,{arquivadoEm:r.agora},r);return await this.salvar(this.entradas(this.projetos,[[e,a]]),wo(t,a),r),a}async reativarProjeto(e){let t=await this.exigirProjeto(e);if(t.arquivadoEm===void 0)return t;await this.exigirVagaDeProjeto();let r=this.carimbo(),a=W(t,{arquivadoEm:void 0},r);return await this.salvar(this.entradas(this.projetos,[[e,a]]),wo(t,a),r),a}async removerProjeto(e){let t=await this.exigirProjeto(e),r=this.carimbo(),[a,n]=await Promise.all([this.fases.listar(),this.etapas.listar()]),i=no(t,r);await this.salvar({...this.entradas(this.fases,a.filter(s=>C(s)&&s.projeto===e).map(s=>[s.id,no(s,r)])),...this.entradas(this.etapas,n.filter(s=>C(s)&&s.projeto===e).map(s=>[s.id,no(s,r)])),...this.entradas(this.projetos,[[e,i]])},wo(t,i),r)}async restaurarProjeto(e){let t=await this.projetos.obter(e);if(!t||t.removidoEm===void 0)return t;let r=t.removidoEm,a=this.carimbo(),[n,i]=await Promise.all([this.fases.listar(),this.etapas.listar()]),s=je(t,a);return await this.salvar({...this.entradas(this.fases,n.filter(c=>c.projeto===e&&c.removidoEm===r).map(c=>[c.id,je(c,a)])),...this.entradas(this.etapas,i.filter(c=>c.projeto===e&&c.removidoEm===r).map(c=>[c.id,je(c,a)])),...this.entradas(this.projetos,[[e,s]])},wo(t,s),a),s}async duplicarProjeto(e){let t=await this.exigirProjeto(e);await this.exigirVagaDeProjeto();let r=this.carimbo(),{fases:a,etapas:n}=await this.dados(),i=at({nome:`C\xF3pia de ${t.nome}`.slice(0,h.nome),processo:t.processo,etiquetas:t.etiquetas},this.gerarId(),zo(le(await this.projetos.listar()),null),r),s=new Map;for(let l of a.filter(m=>m.projeto===e))s.set(l.id,Me(i.id,l.nome,this.gerarId(),l.ordem,r));let c=n.filter(l=>l.projeto===e),d=new Map(c.map(l=>[l.id,this.gerarId()])),p=c.map(l=>oe({projeto:i.id,nome:l.nome,inicio:l.inicio,fim:l.fim,fase:l.fase?s.get(l.fase)?.id:void 0,marco:l.marco,dependeDe:l.dependeDe.map(m=>d.get(m)).filter(m=>!!m),responsavel:l.responsavel,medida:l.medida,checklist:l.checklist.map(m=>({...m,id:this.gerarId(),feito:!1})),processo:l.processo,etiquetas:l.etiquetas,observacoes:l.observacoes},d.get(l.id),l.ordem,r));return await this.salvar({...this.entradas(this.projetos,[[i.id,i]]),...this.entradas(this.fases,[...s.values()].map(l=>[l.id,l])),...this.entradas(this.etapas,p.map(l=>[l.id,l]))},wo(void 0,i),r,!0),i}async criarFase(e,t){await this.exigirProjeto(e);let r=H(t);if(!r)throw new P(["Informe o nome da fase."]);if(r.length>h.nome)throw new P([`O nome pode ter at\xE9 ${h.nome} caracteres.`]);let a=await this.fases.listar(),n=a.find(c=>C(c)&&c.projeto===e&&to(c.nome)===to(r));if(n)return n;let i=this.carimbo(),s=Me(e,r,this.gerarId(),zo(le(a.filter(c=>c.projeto===e)),null),i);return await this.salvar(this.entradas(this.fases,[[s.id,s]]),ut(void 0,s),i),s}async renomearFase(e,t){let r=await this.fases.obter(e);if(!C(r))throw new P(["A fase n\xE3o existe mais."]);let a=H(t);if(!a)throw new P(["Informe o nome da fase."]);let n=this.carimbo(),i=W(r,{nome:a.slice(0,h.nome)},n);return await this.salvar(this.entradas(this.fases,[[e,i]]),ut(r,i),n),i}async removerFase(e){let t=await this.fases.obter(e);if(!C(t))return;let r=this.carimbo(),a=(await this.etapas.listar()).filter(i=>C(i)&&i.fase===e),n=no(t,r);await this.salvar({...this.entradas(this.etapas,a.map(i=>[i.id,W(i,{fase:void 0},r)])),...this.entradas(this.fases,[[e,n]])},ut(t,n),r)}async obterEtapa(e){let t=await this.etapas.obter(e);return C(t)?t:void 0}async etapasDoProjeto(e){return(await this.etapas.listar()).filter(t=>C(t)&&t.projeto===e)}async conferirEtapa(e,t,r=[],a=!0){let n=new Set(t.map(d=>d.id)),i={...e,dependeDe:e.dependeDe.filter(d=>n.has(d)||!r.includes(d))},s=Sa(e),c=nn(i,t);if(c&&s.push(c),e.fase&&a){let d=await this.fases.obter(e.fase);(!C(d)||d.projeto!==e.projeto)&&s.push("A fase escolhida n\xE3o existe mais.")}if(s.length)throw new P(s)}async criarEtapa(e){await this.exigirProjeto(e.projeto);let t=await this.etapasDoProjeto(e.projeto);if(t.length>=h.etapasPorProjeto)throw new P([`Um projeto pode ter at\xE9 ${h.etapasPorProjeto} etapas.`]);let r=this.carimbo(),a=oe(e,this.gerarId(),zo(le(t),null),r);return await this.conferirEtapa(a,t),await this.salvar(this.entradas(this.etapas,[[a.id,a]]),fo(void 0,a),r),a}async duplicarEtapa(e){let t=await this.obterEtapa(e);if(!t)throw new P(["A etapa n\xE3o existe mais."]);await this.exigirProjeto(t.projeto);let r=await this.etapasDoProjeto(t.projeto);if(r.length>=h.etapasPorProjeto)throw new P([`Um projeto pode ter at\xE9 ${h.etapasPorProjeto} etapas.`]);let a=new Set(r.map(s=>s.id)),n=this.carimbo(),i=oe({projeto:t.projeto,nome:`C\xF3pia de ${t.nome}`.slice(0,h.nome),inicio:t.inicio,fim:t.fim,marco:t.marco,fase:t.fase,dependeDe:t.dependeDe.filter(s=>a.has(s)),responsavel:t.responsavel,medida:t.medida,checklist:t.checklist.map(s=>({...s,feito:!1})),processo:t.processo,etiquetas:t.etiquetas,observacoes:t.observacoes},this.gerarId(),zo(le(r),null),n);return await this.conferirEtapa(i,r),await this.salvar(this.entradas(this.etapas,[[i.id,i]]),fo(void 0,i),n,!0),i}async editarEtapa(e,t,r){let a=await this.obterEtapa(e);if(!a)throw new P(["A etapa n\xE3o existe mais."]);let n=An(t,yc);typeof n.nome=="string"&&(n.nome=H(n.nome)),n.etiquetas&&(n.etiquetas=Qo(n.etiquetas)),n.checklist&&(n.checklist=et(n.checklist)),n.dependeDe&&(n.dependeDe=[...new Set(n.dependeDe)]),typeof n.progresso=="number"&&(n.progresso=Math.round(n.progresso)),typeof n.observacoes=="string"&&!n.observacoes.trim()&&(n.observacoes=void 0);let i=n.marco??a.marco,s=n.inicio??a.inicio,c=i?s:n.fim??a.fim,d=s!==a.inicio||c!==a.fim?Vt(a,s,c,r):{inicio:s,fim:c,base:a.base},p={...n,...d,marco:i},l=await this.etapasDoProjeto(a.projeto);await this.conferirEtapa(Vo({...a,...p}),l,a.dependeDe,n.fase!==void 0);let m=this.carimbo(),u=W(a,p,m);return await this.salvar(this.entradas(this.etapas,[[e,u]]),fo(a,u,await this.apoio(a.projeto)),m),u}async moverDatas(e,t){let r=(await this.etapas.listar()).filter(C),a=cn(r,e);if(a.length)throw new P(a);let n=new Map(r.map(p=>[p.id,p])),i=new Map;for(let p of e){let l=n.get(p.id);if(!l)continue;let m=l.marco?p.inicio:p.fim;i.set(p.id,{...l,...Vt(l,p.inicio,m,t)})}if(!i.size)return[];let s=this.carimbo(),c=[...i.values()].map(p=>W(n.get(p.id),{inicio:p.inicio,fim:p.fim,base:p.base},s)),d=c.flatMap(p=>fo(n.get(p.id),p));return await this.salvar(this.entradas(this.etapas,c.map(p=>[p.id,p])),d,s),c}async concluirEtapa(e,t,r){let a=await this.obterEtapa(e);if(!a)throw new P(["A etapa n\xE3o existe mais."]);return this.gravarConclusao(a,t,r)}async concluirSeAberta(e,t,r){let a=await this.obterEtapa(e);return!a||a.concluidaEm?null:this.gravarConclusao(a,t,r)}async gravarConclusao(e,t,r){let a=r?Ft(r):[];if(a.length)throw new P(a);let n=this.carimbo(),i=Oa(e,t,n,r);return await this.salvar(this.entradas(this.etapas,[[e.id,i]]),fo(e,i),n),i}async marcarSigiloso(e){let t=typeof e=="string"?D(e):"";if(!t)return 0;let r=d=>!!d&&typeof d.protocolo=="string"&&D(d.protocolo)===t,[a,n]=await Promise.all([this.projetos.listar(),this.etapas.listar()]),i=d=>({...d,processo:{...d.processo,sigiloso:!0}}),s=a.filter(d=>r(d.processo)&&d.processo.sigiloso!==!0).map(i),c=n.filter(d=>r(d.processo)&&d.processo.sigiloso!==!0).map(i);if(!s.length&&!c.length){let d=p=>typeof p=="string"&&D(p)===t;return([...a,...n].some(p=>r(p.processo))||(await this.registros.listar()).some(p=>p.campo==="processo"&&(d(p.antes)||d(p.depois))))&&await this.lembrarSigilo({processos:[t],documentos:[]},"local",{promover:!0}),0}return await this.salvar({...this.entradas(this.projetos,s.map(d=>[d.id,d])),...this.entradas(this.etapas,c.map(d=>[d.id,d]))},[],this.carimbo()),s.length+c.length}async reabrirEtapa(e){let t=await this.obterEtapa(e);if(!t)throw new P(["A etapa n\xE3o existe mais."]);let r=this.carimbo(),a=ja(t,r);return await this.salvar(this.entradas(this.etapas,[[e,a]]),fo(t,a),r),a}async removerEtapa(e){let t=await this.obterEtapa(e);if(!t)return;let r=this.carimbo(),a=no(t,r);await this.salvar(this.entradas(this.etapas,[[e,a]]),fo(t,a),r)}async restaurarEtapa(e){let t=await this.etapas.obter(e);if(!t||t.removidoEm===void 0)return t;if(!await this.obterProjeto(t.projeto))throw new P(["O projeto n\xE3o existe mais."]);let r=t.fase?await this.fases.obter(t.fase):void 0,a=C(r)&&r.projeto===t.projeto,n=this.carimbo(),i=je(a?t:{...t,fase:void 0},n);return await this.salvar(this.entradas(this.etapas,[[e,i]]),fo(t,i),n),i}async redefinirPlanoOriginal(e){let t=(await this.etapasDoProjeto(e)).filter(wa);if(!t.length)return 0;let r=this.carimbo(),a=t.map(n=>W(n,{base:n.base?ya(n):Qe(n.inicio,n.fim)},r));return await this.salvar(this.entradas(this.etapas,a.map(n=>[n.id,n])),a.flatMap((n,i)=>fo(t[i],n)),r),a.length}async criarProjetoDeModelo(e,t,r){if(await this.exigirVagaDeProjeto(),!R(r))throw new P(["Use datas entre 2000 e 2100."]);let a=this.carimbo(),n=at(e,this.gerarId(),zo(le(await this.projetos.listar()),null),a),i=[...tt(n),...rt(t)];if(i.length)throw new P([...new Set(i)]);let{fases:s,etapas:c}=wn(t,r,{projeto:n.id,carimbo:a,novoId:this.gerarId});if(c.some(p=>!R(p.inicio)||!R(p.fim)))throw new P(["Com esse come\xE7o, o projeto passaria de 2100."]);let d=sn(c);if(d.length)throw new P(d);return await this.salvar({...this.entradas(this.projetos,[[n.id,n]]),...this.entradas(this.fases,s.map(p=>[p.id,p])),...this.entradas(this.etapas,c.map(p=>[p.id,p]))},wo(void 0,n),a),n}async salvarComoModelo(e,t,r){if(await this.exigirProjeto(e),(await this.modelos.listar()).filter(C).length>=h.modelos)throw new P([`Limite de ${h.modelos} modelos. Exclua algum.`]);let n=await this.dados(),i=this.carimbo(),s=Pn({fases:n.fases.filter(d=>d.projeto===e),etapas:n.etapas.filter(d=>d.projeto===e)},t,this.gerarId(),i,r),c=rt(s);if(c.length)throw new P(c);return await this.modelos.gravar(s.id,s),s}async renomearModelo(e,t){let r=await this.modelos.obter(e);if(!C(r))throw new P(["O modelo n\xE3o existe mais."]);let a={...r,nome:H(t)},n=rt(a);if(n.length)throw new P(n);let i=W(r,{nome:a.nome},this.carimbo());return await this.modelos.gravar(e,i),i}async removerModelo(e){let t=await this.modelos.obter(e);C(t)&&await this.modelos.gravar(e,no(t,this.carimbo()))}async exportar(e=Date.now()){return this.envelopeDe(await this.entidades(),e)}envelopeDe(e,t){let r={formato:"seipro-projetos",versao:1,host:this.escopo.host,unidade:this.escopo.unidade,vis:this.escopo.vis,gerado:t,entidades:e};return this.escopo.vis==="eu"&&(r.login=this.escopo.login.trim().toLowerCase()),r}async importar(e,t,r={}){let a=this.carimbo().agora,n={novos:0,atualizados:0,ignorados:0,excedentes:0},i=0,s={},c=!1,d=await this.lerChaves(!0),p=Ne(d,this.prefixoMemoria),l=gt(d,this.base),m=(w,Y,vo,Pt,ns,is,ss)=>{let So=this.mesclarEm(Y,vo??[],Pt,a,ns,is,ss);return n.novos+=So.novos,n.atualizados+=So.atualizados,n.ignorados+=So.ignorados,n.excedentes+=So.excedentes,Pt==="p"&&(i+=So.excedentes),Pt==="h"&&So.gravar.length&&(c=!0),s={...s,...this.entradas(w,So.gravar)},So.gravar},u=l.p,f=l.e,g=l.h,x=fn(g,e.h??[]),E=pe(p),v={processos:new Set([...E.processos,...x.processos]),documentos:new Set([...E.documentos,...x.documentos])},y=m(this.projetos,u,e.p,"p",(w,Y)=>ir(w,Y,vo=>C(vo)&&vo.arquivadoEm===void 0?"":null,h.projetosAtivos),Sn),A=(e.p??[]).filter(w=>me(w,"p")&&!me(w,"p",a)),T=new Set([...u.map(w=>w.id),...y.map(([w])=>w),...A.map(w=>w.id)]),I=w=>T.has(w.projeto),Q=ce([...go(u,y),...A],a,Xo(this.escopo.vis));m(this.fases,l.f,e.f,"f",()=>new Set,void 0,I);let K=m(this.etapas,f,e.e,"e",(w,Y)=>ir(w,Y,vo=>C(vo)?vo.projeto:null,h.etapasPorProjeto),(w,Y)=>wc(Sn(w,Y),Y),I),Lo=m(this.registros,g,e.h,"h",(w,Y)=>Dc(w,Y,Q,a),Pc,I);if(m(this.modelos,l.m,e.m,"m",(w,Y)=>ir(w,Y,vo=>C(vo)?"":null,h.modelos)),r.inteiro&&n.ignorados)throw new P([i?Tn(this.escopo.vis):"Nada foi gravado: h\xE1 itens inv\xE1lidos ou al\xE9m dos limites (300 etapas por projeto, 50 modelos)."]);let so={p:go(u,y),e:go(f,K)},Z=rr(so,{p:[...u,...e.p??[]],e:[...f,...e.e??[]]},v),j=new Set([...y,...K].map(([w])=>w)),S={...this.entradas(this.projetos,Z.p.map(w=>[w.id,w])),...this.entradas(this.etapas,Z.e.map(w=>[w.id,w]))};n.atualizados+=[...Z.p,...Z.e].filter(w=>!j.has(w.id)).length;for(let[w,Y]of Object.entries({...s,...S}))!w.startsWith(this.projetos.prefixo)&&!w.startsWith(this.etapas.prefixo)||!(w in d)||io(Y)!==io(d[w])||(delete s[w],delete S[w],n.atualizados-=1);let M=go(so.p,Z.p.map(w=>[w.id,w])),V=go(so.e,Z.e.map(w=>[w.id,w])),Ao=Ro({p:M,e:V,h:go(g,Lo)},ko(M,V,v)),k=this.entradasPorOrigem(p,{local:se(),aprendida:Uo(x,yo(u,f),yo(M,V),Ao.raspados)});return s={...s,...S,...k},t?await this.salvar(s,t.registros,t.carimbo,!0):Object.keys(s).length&&await this.area.gravar(s),c&&!t?.registros.length&&await this.podarHistorico(a),n}mesclarEm(e,t,r,a,n,i=c=>c,s=()=>!0){let c=t.filter(v=>me(v,r,a)).map(v=>Ac(v,r)),d=new Map(e.map(v=>[v.id,v])),p=an([...e],c).filter(v=>v!==d.get(v.id)),l=p.filter(s),m=p.length-l.length,u=n(d,l),f=[],g=0,x=0;for(let v of l){if(u.has(v.id))continue;let y=d.get(v.id),A=i(v,y);y&&io(A)===io(y)||(f.push([v.id,A]),y?x+=1:g+=1)}let E=t.length-c.length;return{gravar:f,novos:g,atualizados:x,ignorados:E+m+u.size,excedentes:u.size}}async lapidarMovidos(e,t){await this.area.gravar({...this.entradas(this.etapas,e.e.map(r=>[r.id,no(r,t)])),...this.entradas(this.fases,e.f.map(r=>[r.id,no(r,t)])),...this.entradas(this.registros,e.h.map(r=>[r.id,no(r,t)])),...this.entradas(this.projetos,[[e.p.id,no(e.p,t)]])})}async limpar(e=Date.now()){let t=Xo(this.escopo.vis),r=[],a=(v,y)=>{let A=mo(y,e,t),T=new Set(A.map(I=>I.id));for(let I of y)T.has(I.id)||r.push(v.chave(I.id));return A},n=await this.lerChaves(!0),i=Ne(n,this.prefixoMemoria),{p:s,f:c,e:d,m:p,h:l}=gt(n,this.base);a(this.projetos,s);let m=ce(s,e,t),u=(v,y)=>{for(let A of y)A.removidoEm===void 0&&!m.has(A.projeto)&&r.push(v.chave(A.id))};u(this.fases,a(this.fases,c)),u(this.etapas,a(this.etapas,d)),a(this.modelos,p);let f=[];for(let v of a(this.registros,l))m.has(v.projeto)?f.push(v):r.push(this.registros.chave(v.id));for(let v of de(f,h.historico,e))r.push(this.registros.chave(v));let g=pe(i),x=Ro({p:s,e:d,h:l},ko(s,d,g)),E=this.entradasPorOrigem(i,{local:se(),aprendida:Uo(yo(s,d),x.raspados)});return Object.keys(E).length&&await this.area.gravar(E),r.length&&await this.area.remover(r),r.length}async vinculos(){let e=await this.dados();return Oe([{vis:this.escopo.vis,projetos:e.projetos,etapas:e.etapas}])}aoMudar(e){return this.area.aoMudar(t=>{Object.keys(t).some(r=>r.startsWith(this.base))&&e()})}};function Sn(o,e){let t=o.processo,r=e?.processo;return!t?.sigiloso||t.protocolo||!r?.protocolo||t.idProcedimento&&r.idProcedimento&&t.idProcedimento!==r.idProcedimento?o:{...o,processo:Vo({...t,protocolo:r.protocolo,idProcedimento:t.idProcedimento??r.idProcedimento})}}function wc(o,e){let t=e?.documento;return!pt(o.documento)||!t?.numero?o:{...o,documento:t.sigiloso?t:{...t,sigiloso:!0}}}function Pc(o,e){return e&&e.atualizadoEm===o.atualizadoEm&&e.dispositivo===o.dispositivo?e:o}function Ac(o,e){if(e==="p")return De(o);if(e!=="e")return o;let t=De(o),r=[...new Set(t.dependeDe)];return r.length===t.dependeDe.length?t:{...t,dependeDe:r}}var Sc=(o,e)=>o.id<e.id?-1:o.id>e.id?1:0;function ir(o,e,t,r){let a=new Map,n=d=>a.set(d,(a.get(d)??0)+1),i=new Set(e.map(d=>d.id));for(let[d,p]of o){let l=i.has(d)?null:t(p);l!==null&&n(l)}let s=[];for(let d of e){let p=t(d);if(p===null)continue;let l=o.get(d.id);l&&t(l)===p?n(p):s.push(d)}let c=new Set;for(let d of s.sort(Sc)){let p=t(d);(a.get(p)??0)>=r?c.add(d.id):n(p)}return c}function Dc(o,e,t,r){let a=new Map(o);for(let s of e)a.set(s.id,s);let n=new Set(e.map(s=>s.id)),i=[...a.values()].filter(s=>t.has(s.projeto));return new Set(de(i,h.historico,r).filter(s=>n.has(s)))}function gt(o,e){let t=Object.entries(o),r=a=>t.filter(([n])=>n.startsWith(`${e}${a}/`)).map(([,n])=>n);return{p:r("p"),f:r("f"),e:r("e"),h:r("h"),m:r("m")}}function Dn(o,e){let t=new Set(e.processos),r=new Set(e.documentos);return{processos:o.processos.filter(a=>!t.has(a)),documentos:o.documentos.filter(a=>!r.has(a))}}function go(o,e){let t=new Map(o.map(r=>[r.id,r]));for(let[,r]of e)t.set(r.id,r);return[...t.values()]}var Le=o=>typeof o=="string",Po=o=>e=>Le(e)&&e.length<=o,Fo=o=>typeof o=="number"&&Number.isFinite(o),Bo=o=>!!o&&typeof o=="object"&&!Array.isArray(o),$=(o,e)=>o===void 0||e(o),cr=(o,e,t)=>Array.isArray(o)&&o.length<=e&&o.every(r=>t(r)),Oc=new Set(["manual","tempo","checklist"]),_e=Po(h.nome),ue=Po(h.rotulo),sr=Po(h.ordem),On=Po(h.registroValor),jn=o=>cr(o,h.etiquetas,Po(h.etiquetaTexto)),Mn=o=>$(o,e=>Bo(e)&&$(e.atividades,Fo)),jc=o=>$(o,e=>Bo(e)&&_e(e.nome)&&$(e.login,ue)),Mc=o=>Bo(o)&&Le(o.id)&&Po(h.checklistTexto)(o.texto)&&typeof o.feito=="boolean",Ic=o=>Fo(o)&&o>=0&&o<=100;function Cn(o,e,t){return!R(o)||!R(e)||t&&e<o?!1:po(o,e)<=Jo}var Tc=o=>$(o,e=>Bo(e)&&Cn(e.inicio,e.fim,!1));function In(o){return o===void 0?!0:Bo(o)?Le(o.protocolo)&&Zo.test(o.protocolo)&&$(o.idProcedimento,e=>Le(e)&&Do.test(e))&&$(o.sigiloso,e=>typeof e=="boolean"):!1}function Cc(o){return o===void 0?!0:Bo(o)?Le(o.numero)&&(o.numero===""||Wo.test(o.numero))&&$(o.titulo,Po(h.nome))&&$(o.sigiloso,e=>typeof e=="boolean"):!1}function me(o,e,t){if(!Bo(o))return!1;let r=o,a=t===void 0?Number.POSITIVE_INFINITY:t+Je,n=i=>Fo(i)&&i<=a;if(!Oo(r.id)||!n(r.atualizadoEm)||!ue(r.dispositivo)||!$(r.removidoEm,n)||!$(r.alteradoPor,ue))return!1;switch(e){case"p":return _e(r.nome)&&jn(r.etiquetas)&&sr(r.ordem)&&Fo(r.criadoEm)&&$(r.arquivadoEm,Fo)&&In(r.processo)&&Mn(r.origem);case"f":return Oo(r.projeto)&&_e(r.nome)&&sr(r.ordem);case"e":return Oo(r.projeto)&&$(r.fase,Oo)&&sr(r.ordem)&&_e(r.nome)&&Cn(r.inicio,r.fim,!1)&&typeof r.marco=="boolean"&&cr(r.dependeDe,h.etapasPorProjeto,Oo)&&jc(r.responsavel)&&Oc.has(r.medida)&&Ic(r.progresso)&&cr(r.checklist,h.checklistItens,Mc)&&In(r.processo)&&Cc(r.documento)&&jn(r.etiquetas)&&$(r.observacoes,Po(h.observacoes))&&$(r.concluidaEm,R)&&Tc(r.base)&&Fo(r.criadoEm)&&Mn(r.origem);case"h":return Oo(r.alvo)&&Oo(r.projeto)&&n(r.quando)&&r.quando>=la&&ue(r.por)&&$(r.nome,ue)&&ue(r.campo)&&$(r.antes,On)&&$(r.depois,On);case"m":return _e(r.nome)&&$(r.descricao,Po(h.observacoes))&&Fo(r.criadoEm)&&Ht(r.fases,r.etapas).length===0}}function Tn(o){return`Limite de ${h.projetosAtivos} projetos ativos em \u201C${Te(o)}\u201D. Arquive ou exclua algum.`}async function kn(o){let e=await Promise.all(o.map(async t=>({vis:t.escopo.vis,...await t.dados()})));return Oe(e)}function Rn(o,e,t,r){let a=`${o}|${e.trim().toLowerCase()}|${t}`;return r?`${a}|${r}`:a}function kc(o,e){return o?.[e]??"nao-perguntado"}var ht=o=>o&&typeof o=="object"&&!Array.isArray(o)?o:{};async function Rc(o,e,t,r){let a=ht((await o.obter(e))[e]);return kc(ht(a[t]),r)}async function Nc(o,e,t,r,a){let n=ht((await o.obter(e))[e]);await o.gravar({[e]:{...n,[t]:{...ht(n[t]),[r]:a}}})}function Nn(o){return{estado:()=>Rc(o.area,o.chavePreferencias,o.campo,o.chave),definir:e=>Nc(o.area,o.chavePreferencias,o.campo,o.chave,e),aoMudar:e=>o.area.aoMudar(t=>{o.chavePreferencias in t&&e()})}}var _c="projetos/consentimento",Lc="textoPadrao";function qc(o,e,t,r){return Rn(o,e,t,r==="unidade"?"un":"eu")}function vt(o,e,t,r,a){return Nn({area:o,chavePreferencias:_c,campo:Lc,chave:qc(e,t,r,a)})}var _n="#frmTextoPadraoInternoCadastro",Ln="#frmTextoPadraoInternoLista",$c='textarea[name="txaConteudo"], #txaConteudo',Vc=40,bt=o=>(o??"").replace(/&amp;/g,"&"),zc=(o,e)=>Number(o.id)-Number(e.id),qn=o=>o.doc.querySelector($c)?.textContent??"";function $n(o,e){let t=()=>{if(!e.nome.trim()||e.nome.length>50)throw new O("ARGUMENTO_INVALIDO","O nome do texto padr\xE3o deve ter de 1 a 50 caracteres.");if(e.descricao.length>300)throw new O("ARGUMENTO_INVALIDO","A descri\xE7\xE3o do texto padr\xE3o passa de 300 caracteres.")},r=u=>[...u.doc.querySelectorAll("table.infraTable tr")].filter(f=>[...f.querySelectorAll("td")].some(g=>(g.textContent??"").trim()===e.nome)),a=u=>{let f=u.querySelector('input[type="checkbox"]')?.getAttribute("value")??/acaoExcluir\(\s*['"](\d+)/.exec(u.querySelector('a[onclick*="acaoExcluir"]')?.getAttribute("onclick")??"")?.[1],g=bt(u.querySelector('a[href*="acao=texto_padrao_interno_consultar"]')?.getAttribute("href")),x=bt(u.querySelector('a[href*="acao=texto_padrao_interno_alterar"]')?.getAttribute("href"));return!f||!g?null:x?{id:f,consultar:g,alterar:x}:{id:f,consultar:g}},n=async u=>{t();let f=await o.http.obter(o.linkMenu("texto_padrao_interno_listar"),u),g=f;for(let x=0;x<Vc;x++){let E=r(g),v=E.map(a).filter(y=>y!==null).sort(zc);if(v.length)return{pagina:g,primeira:f,achado:v[0]??null,todos:v};if(E.length)throw new O("SEI_ACAO_INDISPONIVEL",`O texto padr\xE3o "${e.nome}" est\xE1 na lista, mas o SEI n\xE3o oferece a voc\xEA consult\xE1-lo nesta unidade.`);if(!/infraAcaoPaginar\(\s*['"]\+['"]/.test(g.html))break;g=await ro.de(g,Ln,o.http).definir({hdnInfraPaginaAtual:String(x+1)}).enviar(u)}return{pagina:g,primeira:f,achado:null,todos:[]}},i=async(u,f)=>qn(await o.http.obter(u.consultar,f)),s=u=>({...u,modos:{txaConteudo:"html"},sucesso:ra("texto_padrao_interno_listar")}),c=async(u,f)=>{if(!u.alterar)throw new O("SEI_ACAO_INDISPONIVEL","O SEI n\xE3o permite a voc\xEA alterar este texto padr\xE3o nesta unidade.");return ro.abrir(o.http,u.alterar,_n,f)},d=async(u,f,g)=>{await u.definir({txaConteudo:f}).enviar({...s(g),botao:"sbmAlterarTextoPadraoInterno",operacao:"a altera\xE7\xE3o do texto padr\xE3o"})},p=async(u,f,g)=>{let x=bt(/location\.href\s*=\s*'([^']+)'/.exec(u.doc.querySelector("#btnNovo")?.getAttribute("onclick")??"")?.[1]);if(!x)throw new O("SEI_ACAO_INDISPONIVEL","O SEI n\xE3o permite a voc\xEA criar textos padr\xE3o nesta unidade.");await(await ro.abrir(o.http,x,_n,g)).definir({txtNome:e.nome,txtDescricao:e.descricao,txaConteudo:f}).enviar({...s(g),botao:"sbmCadastrarTextoPadraoInterno",operacao:"o cadastro do texto padr\xE3o"})},l=async(u,f,g)=>{let x=bt(/['"](controlador\.php\?acao=texto_padrao_interno_excluir[^'"]+)['"]/.exec(u.html)?.[1]);if(!x)throw new O("SEI_ACAO_INDISPONIVEL","O SEI n\xE3o oferece a exclus\xE3o de textos padr\xE3o para voc\xEA nesta unidade.");let E=ro.de(u,Ln,o.http).definir({hdnInfraItemId:f});await o.http.enviar(x,E.pares(),{...g,aceitarValidacao:!0})},m=async(u,f,g)=>{let{todos:x,pagina:E}=await n(g),[v,...y]=x;if(!v||!y.length)return{gravado:!0};let A=await i(v,g);if(f.mesmo(A,u))return{gravado:!0};for(let T of y)if(f.mesmo(await i(T,g),u))try{await l(E,T.id,g)}catch(I){if(!(Wr(I)&&I.codigo==="SEI_ACAO_INDISPONIVEL"))throw I}return{gravado:!1,atual:A}};return{async localizar(u){return(await n(u)).achado},async ler(u){let{achado:f}=await n(u);return f?i(f,u):null},async gravar(u,f){let{achado:g,primeira:x}=await n(f);g?await d(await c(g,f),u,f):await p(x,u,f)},async gravarConferindo(u,f,g){let{achado:x,primeira:E}=await n(g);if(x){let v=await c(x,g),y=qn(v.pagina);return f.mesmo(y,f.anterior)?(await d(v,u,g),{gravado:!0}):{gravado:!1,atual:y}}return f.anterior!==null?{gravado:!1,atual:null}:(await p(E,u,g),m(u,f,g))},async excluir(u){let{achado:f,pagina:g}=await n(u);return f?(await l(g,f.id,u),!0):!1}}}var Vn=100*1024,Uc=80*1024,zn="seipro-projetos",Un=1,Fc={p:2e3,f:2e4,e:6e4,h:5e3,m:500},Hc="O SEI n\xE3o deixa gravar este Texto Padr\xE3o com o seu perfil nesta unidade; os projetos dos colegas continuam chegando.",Bc="O texto mudou enquanto era gravado (um colega sincronizando ao mesmo tempo). O SEI Pro tenta de novo em instantes.";function Hn(o,e){return zr("PRJ",o==="unidade"?"UNIDADE":e.trim().toLowerCase())}function Bn(o){return o==="unidade"?"Projetos da unidade (SEI Pro). Gerado automaticamente; n\xE3o edite.":"Projetos pessoais (SEI Pro). Gerado automaticamente; n\xE3o edite."}function Gc(o,e,t){let r=n=>n.replace(/[<>]/g,"");return`Dados internos do SEI Pro \u2014 projetos ${o==="unidade"?`da unidade ${r(e)}`:`de ${r(t)}`}. N\xE3o use em documentos nem edite: o SEI Pro regrava este texto sozinho.`}var Xc=o=>`projetos/sync/relatorio/${bo(o)}`,Kc=o=>`projetos/sync/substituido/${bo(o)}`,Yc=o=>ma(bo(o)),Fn=300*1024,xt=["p","f","e","h","m"];function Jc(o,e){if(Hr(o,zn,Un))return{maisNovo:!0};let t=o;if(!t||typeof t!="object"||t.formato!==zn||t.versao!==Un)return{invalido:"o texto n\xE3o est\xE1 no formato dos projetos"};if(t.host!==e.host||String(t.unidade)!==e.unidade||t.vis!==e.vis)return{invalido:"o texto \xE9 de outro SEI, de outra unidade ou de outra visibilidade"};if(e.vis==="eu"&&(typeof t.login!="string"||t.login.trim().toLowerCase()!==e.login.trim().toLowerCase()))return{invalido:"o texto \xE9 de outro usu\xE1rio"};let r=t.entidades;if(!r||typeof r!="object")return{invalido:"o texto n\xE3o tem os projetos"};let a={};for(let n of xt){let i=r[n]??[];if(!Array.isArray(i))return{invalido:"o texto n\xE3o tem os projetos"};if(i.length>Fc[n])return{invalido:"o texto tem itens demais"};a[n]=i}return{ok:{...t,entidades:a}}}function Gn(o,e,t=Re){let r=Xo(o.vis),a=o.entidades,n=ko(a.p,a.e,t),i=mo(a.p,e,r),s=ce(a.p,e,r),c=m=>m.filter(u=>s.has(u.projeto)),d=c(mo(a.h,e,r)),p=new Set(de(d,h.historico,e)),l=Ro({p:i,e:c(mo(a.e,e,r)),h:d.filter(m=>!p.has(m.id))},n);return{envelope:{...o,entidades:{p:l.p,f:c(mo(a.f,e,r)),e:l.e,h:l.h,m:mo(a.m,e,r)}},raspados:l.raspados}}function Wc(o,e,t=Re){return Gn(o,e,t).envelope}function Xn(o,e,t){if(!e)return o;let r={...o.entidades};for(let a of xt){let n=(e.entidades[a]??[]).filter(s=>me(s,a)&&!me(s,a,t)).map(s=>a==="p"||a==="e"?De(s):s);if(!n.length)continue;let i=new Set(n.map(s=>s.id));r[a]=[...r[a].filter(s=>!i.has(s.id)),...n]}return{...o,entidades:r}}async function Zc(o,e,t){let r=new Ho(Pr(),e,()=>({agora:t,dispositivo:"normalizar"}));await r.importar(o.entidades);let{envelope:a,conhecidos:n}=await r.exportarComConhecidos(t);return Wc(Xn(a,o,t),t,n)}function Qc(o){let e=o.entidades;return rn({p:ie(e.p),f:ie(e.f),e:ie(e.e),h:ie(e.h),m:ie(e.m)})}function od(o,e){let t=e+Je,r=0;for(let a of xt)for(let n of o[a]??[]){let i=n;(typeof i?.atualizadoEm=="number"&&i.atualizadoEm>t||typeof i?.removidoEm=="number"&&i.removidoEm>t)&&r++}return r}function Kn(o){let e=o.repo.escopo,t=e.vis==="unidade";return{modulo:"projetos",chaveStatus:Yc(e),teto:Vn,aviso:Uc,legivel:()=>Gc(e.vis,o.sigla,o.nomeUsuario),validar:r=>Jc(r,e),async importar(r){let a=o.repo.carimboAtual().agora,n=od(r.entidades,a),i=await o.repo.importar(r.entidades),s=Xc(e),c=(await o.area.obter(s))[s],d={quando:a,ignorados:i.ignorados,excedentes:i.excedentes,futuros:n},p=l=>l?io({...l,quando:0}):"";p(c)!==p(d)&&(c||i.ignorados||n)&&await o.area.gravar({[s]:d})},async exportar({remoto:r,agora:a}){let{envelope:n,conhecidos:i}=await o.repo.exportarComConhecidos(a),{envelope:s,raspados:c}=Gn(Xn(n,r,a),a,i);return await o.repo.lembrarSigilo(c,"aprendida"),s},assinatura:Qc,vazio:r=>xt.every(a=>r.entidades[a].length===0),normalizar:(r,a)=>Zc(r,e,a),async antesDeRegravarInvalido(r,a){let n={quando:o.repo.carimboAtual().agora,motivo:r,html:a.slice(0,Fn),cortado:a.length>Fn};await o.area.gravar({[Kc(e)]:n})},mensagens:{maisNovo:"Os projetos no SEI foram gravados por uma vers\xE3o mais nova do SEI Pro. Atualize a extens\xE3o neste computador; o texto n\xE3o foi alterado.",grandeDemais:(r,a)=>t?`Os projetos da unidade passaram do limite do Texto Padr\xE3o (${r} KB de ${a} KB) e n\xE3o foram gravados. Exclua projetos que n\xE3o usa mais (os arquivados tamb\xE9m ocupam espa\xE7o) ou leve alguns para \u201CS\xF3 eu\u201D.`:`Seus projetos passaram do limite do Texto Padr\xE3o (${r} KB de ${a} KB) e n\xE3o foram gravados. Exclua projetos que n\xE3o usa mais (os arquivados tamb\xE9m ocupam espa\xE7o).`,pertoDoTeto:r=>`Os projetos est\xE3o perto do limite do Texto Padr\xE3o (${r} KB de ${Math.round(Vn/1024)} KB).`,invalidoRegravado:r=>`O texto no SEI estava inv\xE1lido (${r}) e foi regravado a partir deste computador; o texto antigo ficou guardado neste navegador.`,mudouDuranteGravacao:Bc,...t?{soLeitura:Hc}:{}}}}function Yn(o,e){try{return Go(uo(o,e),"texto_padrao_interno_listar"),!0}catch{return!1}}function Jn(o,e,t,r){let a={http:we(e),linkMenu:i=>Go(uo(o,e),i)},n=$n(a,{nome:Hn(t,r),descricao:Bn(t)});return{ler:()=>n.ler(),gravar:i=>n.gravar(i),gravarConferindo:(i,s)=>n.gravarConferindo(i,s),excluir:()=>n.excluir(),localizar:()=>n.localizar()}}var ed=["id_projeto","nome_projeto","sigla_unidade","tipo_projeto","processo_sei","id_procedimento","data_inicio","data_fim","ativo"],td=["id_etapa","id_dependencia","nome_etapa","processo_sei","id_procedimento","responsavel","data_inicio_programado","data_fim_programado","data_inicio_progresso_automatico","observacoes","macroetapa","grupo","etiqueta","data_inicio_execucao","data_fim_execucao","progresso_execucao","documento_relacionado","documento_sei","data_inicio"],rd=["id_demanda","nome_atividade","assunto","data_entrega"],dr=o=>!!o&&typeof o=="object"&&!Array.isArray(o);function pr(o,e){let t={};for(let r of e)Object.hasOwn(o,r)&&(t[r]=o[r]);return t}function ad(o){return Array.isArray(o)?o.map(e=>dr(e)?pr(e,rd):e):o}function nd(o){if(!dr(o))return o;let e=pr(o,td);return Object.hasOwn(o,"id_demandas_titles")&&(e.id_demandas_titles=ad(o.id_demandas_titles)),e}function Wn(o){return o.map(e=>{if(!dr(e))return e;let t=pr(e,ed);return Object.hasOwn(e,"etapas")&&(t.etapas=Array.isArray(e.etapas)?e.etapas.map(nd):e.etapas),t})}function id(o){let e=/Sistema Eletr(?:\u00F4|&ocirc;|\\u00F4)nico de Informa[^"]*?Vers(?:\u00E3|&atilde;)o\s*([\d.]+)/i.exec(o);return e?e[1]:/\.(?:js|svg|css)\?(\d+\.\d+\.\d+)-/.exec(o)?.[1]??""}function sd(o){let e=o.doc.querySelector("#lnkInfraUnidade")?.getAttribute("onclick")??"",t=/infra_unidade_atual=(\d+)/.exec(e)?.[1];if(t)return t;let r=/[?&]infra_unidade_atual=(\d+)/.exec(o.url)?.[1];return r||(o.doc.querySelector("#selInfraUnidades option[selected]")?.getAttribute("value")??"")}function Zn(o){let e=o.doc,t=e.querySelector("#lnkInfraUnidade"),r=e.querySelector("#lnkUsuarioSistema")?.getAttribute("title")??"",[,a="",n="",i=""]=/^(.*?)\s*\(([^/)]+)(?:\/([^)]+))?/.exec(r)??[],s=id(o.html);return{host:new URL(o.url).host,versao:s,maior:Number(s.split(".")[0])||0,unidade:{id:sd(o),sigla:U(t)||U(e.querySelector("#selInfraUnidades option[selected]")),nome:t?.getAttribute("title")??""},usuario:{nome:a.trim(),login:n.trim(),orgao:i.trim()}}}function Qn(o,e,t){let r=Zn(uo(o,t));if(!r.usuario.login)return null;let a={host:r.host,login:r.usuario.login.toLowerCase(),nome:r.usuario.nome,unidade:r.unidade.id?{id:r.unidade.id,sigla:r.unidade.sigla,nome:r.unidade.nome}:null,versao:r.versao,temaEscuro:e.temaEscuro,atividades:e.atividades};return e.corTema&&(a.corTema=e.corTema),a}function qe(o){try{let e=JSON.parse(o.getItem("configBasePro_atividades")??"null");return!!e&&typeof e=="object"&&typeof e.URL_API=="string"&&e.URL_API!==""}catch{return!1}}var cd=40*1024*1024,dd=6e4,oi=300,pd="N\xE3o h\xE1 servidor do Atividades configurado neste SEI.",ld="O endere\xE7o do servidor do Atividades guardado neste SEI n\xE3o \xE9 v\xE1lido. Abra o painel do Atividades para configur\xE1-lo de novo.",ud="Falta a chave de acesso ao servidor do Atividades. No painel do Atividades, use \u201CSolicitar chave de acesso\u201D.",X=class extends Error{name="ErroAtividades"},fe=class extends X{name="ErroOutroUsuario"},ge=o=>!!o&&typeof o=="object"&&!Array.isArray(o);function $e(o,e){try{return JSON.parse(o.getItem(e)??"null")}catch{return null}}function md(o){if(!qe(o))return null;let e=$e(o,"configBasePro_atividades");if(!ge(e)||typeof e.URL_API!="string")return null;let t;try{t=new URL(e.URL_API)}catch{return null}if(t.protocol!=="https:"&&t.protocol!=="http:")return null;let r=$e(o,"optionsPro"),a=ge(r)?r.perfilAtividadesSelected:void 0,n=typeof a=="string"?a.slice(0,100):typeof a=="number"&&Number.isFinite(a)?String(a):"";return{url:t.href,chave:typeof e.KEY_USER=="string"?e.KEY_USER.trim():"",perfil:n}}function ti(o){return{projetos:Wn(o.slice(0,qt)),cortados:Math.max(0,o.length-qt)}}function fd(o){let e=$e(o,"configDataAtividadesPadraoPro");if(!Array.isArray(e)||!e.includes("projetos"))return null;let t=$e(o,"configDataAtividadesPadraoPro_projetos");return Array.isArray(t)?t:null}function gd(o){let e=$e(o,"configDataAtividadesPadraoPro_perfil");return ge(e)&&typeof e.login=="string"?e.login:""}function hd(o,e){return new URLSearchParams({action:"demandas",status:"ativas",lista:"self",self:"",hash:o.chave,version:e,perfil:o.perfil,last_update:"false",id_programa:"false",projetos:JSON.stringify({vigentes:!1}),prescricoes:"false"})}function ei(o){return typeof o!="string"?"":o.slice(0,oi*10).replace(/<[^>]*>/g," ").replace(/\s+/g," ").trim().slice(0,oi).trim()}function ri(o,e){let t=r=>r.trim().toLowerCase().replace(/[^a-z0-9]/g,"_");return t(o)!==""&&t(o)===t(e)}async function vd(o,e){let t=`A resposta do servidor do Atividades passa de ${Math.round(e/1048576)||1} MB; nada foi lido.`,r=Number(o.headers?.get("content-length")??"");if(Number.isFinite(r)&&r>e)throw new X(t);let a=o.body?.getReader();if(!a){let d=await o.text();if(d.length>e)throw new X(t);return d}let n=[],i=0;for(;;){let{done:d,value:p}=await a.read();if(d)break;if(i+=p.byteLength,i>e)throw a.cancel().catch(()=>{}),new X(t);n.push(p)}let s=new Uint8Array(i),c=0;for(let d of n)s.set(d,c),c+=d.byteLength;return new TextDecoder().decode(s)}async function bd(o,e,t,r){if(!o.chave)throw new X(ud);let a=r.limiteMs??dd,n=new AbortController,i=setTimeout(()=>n.abort(),a),s;try{let p=await t(o.url,{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded; charset=UTF-8"},body:hd(o,e).toString(),credentials:"omit",redirect:"error",signal:n.signal});if(!p.ok)throw new X(`O servidor do Atividades respondeu ${p.status}.`);s=await vd(p,r.limiteBytes??cd)}catch(p){throw n.signal.aborted?new X(`O servidor do Atividades n\xE3o respondeu em ${Math.max(1,Math.round(a/1e3))} segundos.`):p instanceof X?p:new X("N\xE3o foi poss\xEDvel falar com o servidor do Atividades (fora do ar ou bloqueado pela rede).")}finally{clearTimeout(i)}let c;try{c=JSON.parse(s.charCodeAt(0)===65279?s.slice(1):s)}catch{c=null}if(!ge(c))throw new X("O servidor do Atividades n\xE3o devolveu dados v\xE1lidos.");if(c.status===0||c.status==="0")throw new X(ei(c.status_txt)||"O servidor do Atividades recusou o acesso.");let d=ge(c.padrao)?c.padrao:{};if(r.login!==void 0&&ge(d.perfil)){let p=typeof d.perfil.login=="string"?d.perfil.login:"";if(!ri(p,r.login)){let l=ei(p).slice(0,60);throw new fe(`A chave do servidor do Atividades guardada neste navegador \xE9 de outro usu\xE1rio${l?` (${l})`:""}. No painel do Atividades, pe\xE7a a sua chave de acesso.`)}}return ti(Array.isArray(d.projetos)?d.projetos:[])}async function xd(o,e,t,r){if(!qe(o))throw new X(pd);try{let a=md(o);if(!a)throw new X(ld);let n=await bd(a,e,t,r);return{fonte:"servidor",projetos:n.projetos,...n.cortados?{cortados:n.cortados}:{}}}catch(a){if(a instanceof fe)throw a;let n=fd(o);if(!n)throw a;let i=a instanceof Error?a.message:String(a),s=gd(o);if(!s)throw new fe(`${i} A lista guardada neste navegador pelo painel do Atividades n\xE3o diz de quem \xE9 e n\xE3o foi usada.`);if(!ri(s,r.login))throw new fe(`${i} A lista guardada neste navegador pelo painel do Atividades \xE9 de outro usu\xE1rio e n\xE3o foi usada.`);let c=ti(n);return{fonte:"cache",projetos:c.projetos,aviso:i,...c.cortados?{cortados:c.cortados}:{}}}}function ai(o,e,t,r){return o.atividades?()=>xd(e,t,r,{login:o.login}):null}var Ed=new Set(["criarProjeto","editarProjeto","arquivarProjeto","reativarProjeto","removerProjeto","restaurarProjeto","duplicarProjeto","criarFase","renomearFase","removerFase","criarEtapa","duplicarEtapa","editarEtapa","moverDatas","concluirEtapa","concluirSeAberta","reabrirEtapa","removerEtapa","restaurarEtapa","redefinirPlanoOriginal","criarProjetoDeModelo","salvarComoModelo","renomearModelo","removerModelo","importar","anotarVisibilidade"]),yd="Sem o \u201CEntendi\u201D, os projetos de \u201CToda a unidade\u201D n\xE3o mudam. Para um projeto s\xF3 seu, escolha \u201CS\xF3 eu\u201D.",wd="N\xE3o foi poss\xEDvel guardar a sua confirma\xE7\xE3o. Tente de novo.",Pd="N\xE3o foi poss\xEDvel guardar a sua escolha. Tente de novo.",Ad="N\xE3o foi poss\xEDvel ler a sua confirma\xE7\xE3o. Tente de novo.";async function Sd(o){try{return await o.estado()}catch(e){throw console.warn("[SEI Pro] projetos: consentimento n\xE3o lido:",e instanceof Error?e.message:String(e)),new P([Ad])}}async function Dd(o,e){try{await o.definir(e)}catch(t){throw console.warn("[SEI Pro] projetos: consentimento n\xE3o gravado:",t instanceof Error?t.message:String(t)),new P([e==="ligado"?wd:Pd])}}function ni(o,e){return new Proxy(o,{get(t,r,a){let n=Reflect.get(t,r,a);if(typeof n!="function")return n;let i=n.bind(t);return typeof r!="string"||!Ed.has(r)?i:async(...s)=>{if(!await e())throw new P([yd]);return i(...s)}}})}function ii(o,e){let t=null;return async()=>await Sd(o)==="ligado"?!0:(t??=(async()=>{try{let r=await e();return r&&await Dd(o,"ligado"),r}finally{t=null}})(),t)}function lr(o){if(!/^\d{4}-\d{2}-\d{2}$/.test(o))return null;let e=Number(o.slice(0,4));return e<2e3||e>2100?null:co(oo(o))===o?o:null}function Od(o){let e=typeof o.protocolo=="string"?o.protocolo.trim():"";if(!Zo.test(e)||!D(e))throw new P(["N\xE3o foi poss\xEDvel ler o n\xFAmero deste processo na tela do SEI."]);let t={protocolo:e};return typeof o.idProcedimento=="string"&&Do.test(o.idProcedimento)&&(t.idProcedimento=o.idProcedimento),o.sigiloso===!0&&(t.sigiloso=!0),t}async function si(o,e,t){let r=Od(e.processo),a=o[e.vis],n=await a.obterProjeto(e.projeto);if(!n)throw new P(["O projeto n\xE3o existe mais."]);if(e.como==="projeto")return await a.editarProjeto(n.id,{processo:r}),`Este \xE9 agora o processo do projeto \u201C${n.nome}\u201D.`;if(e.como==="ligar"){let p=e.etapa?await a.obterEtapa(e.etapa):void 0;if(!p||p.projeto!==n.id)throw new P(["Escolha a etapa."]);if(p.concluidaEm)throw new P(["Esta etapa j\xE1 foi conclu\xEDda."]);return await a.editarEtapa(p.id,{processo:r},t),`Processo ligado \xE0 etapa \u201C${p.nome}\u201D.`}let i=(e.nome??"").trim();if(!i)throw new P(["Informe o nome da etapa."]);let s=lr(e.inicio??"");if(!s)throw new P(["Escolha a data de in\xEDcio (entre 2000 e 2100)."]);let c=Number(e.duracao);if(!Number.isInteger(c)||c<1||c>F)throw new P([`A dura\xE7\xE3o vai de 1 a ${F} dias \xFAteis.`]);return`Etapa \u201C${(await a.criarEtapa({projeto:n.id,nome:i,inicio:s,fim:Pe(s,c),processo:r})).nome}\u201D adicionada a \u201C${n.nome}\u201D.`}async function ci(o,e,t,r,a){let n=lr(a);if(!n)throw new P(["Escolha a data da conclus\xE3o (entre 2000 e 2100)."]);let i;if(r?.numero){i={numero:r.numero.trim()};let c=r.titulo?.trim().slice(0,h.nome);c&&(i.titulo=c)}let s=await o[e].concluirSeAberta(t,n,i);if(!s)throw new P(["Esta etapa j\xE1 foi conclu\xEDda (ou n\xE3o existe mais)."]);return`\u201C${s.nome}\u201D ${s.marco?"cumprido":"conclu\xEDda"} em ${n.split("-").reverse().join("/")}.`}var jd=`:host{all:initial}
.pb{box-sizing:border-box;width:340px;max-width:calc(100vw - 16px);display:grid;gap:8px;padding:12px 14px;font:13px/1.4 var(--spro-fonte);color:var(--spro-texto);background:var(--spro-fundo);border:1px solid var(--spro-borda);border-radius:12px;box-shadow:var(--spro-sombra-3)}
.pb-cab{display:flex;align-items:center;gap:10px}
.pb-ic{display:grid;place-items:center;width:32px;height:32px;flex:none;border-radius:8px;color:var(--spro-destaque);background:var(--spro-destaque-suave)}
.pb-tit{flex:1;min-width:0;display:grid;line-height:1.25}
.pb-tit b{font-size:13.5px}
.pb-tit small{color:var(--spro-suave);font-variant-numeric:tabular-nums;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.pb-vinc{display:grid;gap:4px;padding:8px 10px;border:1px solid var(--spro-borda);border-radius:10px}
.pb-proj{display:flex;align-items:center;gap:6px;min-width:0;color:var(--spro-suave);font-size:12px}
.pb-proj span{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.pb-etapa{display:flex;align-items:center;gap:8px;min-width:0;font-weight:600}
.pb-etapa .pb-nome{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.pb-data{margin-left:auto;color:var(--spro-suave);font-size:12px;font-weight:400;white-space:nowrap}
.pb-atrasada .pb-data{color:var(--spro-perigo)}
.pb-mais,.pb-vazio{color:var(--spro-suave);font-size:12px}
.pb-botoes{display:flex;flex-wrap:wrap;gap:6px;padding-top:4px}
.pb-rod{display:flex;flex-wrap:wrap;justify-content:flex-end;gap:8px;padding-top:4px}
.pb-form{display:grid;gap:10px;padding-top:10px;border-top:1px solid var(--spro-borda)}
.pb-vinc .pb-form{padding-top:8px}
.pb-form-como{display:grid;gap:10px}
.pb-campo{display:grid;gap:5px}
.pb-rotulo{font-size:12px;font-weight:600;color:var(--spro-suave)}
.pb-linha2{display:flex;gap:8px}
.pb-linha2>*{flex:1;min-width:0}
.pb-campo .spro-campo{box-sizing:border-box;width:100%}
.pb-dica{margin:0;color:var(--spro-suave);font-size:12px}
.pb-ok{margin:0;color:var(--spro-ok);font-size:12px}
.pb-erro{margin:0;color:var(--spro-perigo);font-size:12px}
.pb-erro:empty,.pb-slot:empty{display:none}
.pb-pergunta{display:grid;gap:8px;padding:8px 10px;border:1px solid color-mix(in srgb,var(--spro-aviso) 35%,transparent);border-radius:8px;background:color-mix(in srgb,var(--spro-aviso) 8%,var(--spro-fundo))}
.pb-pergunta p{margin:0}
.pb .spro-segmentado{justify-self:start;flex-wrap:wrap}
.prj-st{flex:none}
.prj-st .prj-st-cor{fill:none;stroke-width:1.6}
.prj-st-concluida .prj-st-cor,.prj-st-atrasada .prj-st-cor{stroke:none}
.prj-st-concluida .prj-st-cor{fill:var(--spro-ok)}
.prj-st-atrasada .prj-st-cor{fill:var(--spro-perigo)}
.prj-st-andamento .prj-st-cor{stroke:var(--spro-destaque)}
.prj-st-andamento .prj-st-meio{fill:var(--spro-destaque)}
.prj-st-futura .prj-st-cor{stroke:var(--spro-borda-forte);stroke-dasharray:2.4 2}
.prj-st-sinal{fill:none;stroke:var(--spro-fundo);stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round}
.prj-st-ponto{fill:var(--spro-fundo)}
.prj-st-marco.prj-st-andamento .prj-st-cor,.prj-st-marco.prj-st-futura .prj-st-cor{stroke:var(--spro-novidade);stroke-dasharray:none}
.prj-st-marco.prj-st-atrasada .prj-st-cor{fill:none;stroke:var(--spro-perigo)}`,Ve=null,Md="button:not([disabled]), select, input, textarea, a[href]";function di(o,e,t){Ve?.fechar();let r=o.ownerDocument,a=r.defaultView,n=r.createElement("div");n.setAttribute("data-tema",t.temaEscuro?"escuro":"claro"),n.className="spro-prj-balao";let i=n.attachShadow({mode:"open"}),s=r.createElement("style");s.textContent=`${t.cssBase}
${jd}`;let c=r.createElement("div");c.setAttribute("role","dialog"),c.setAttribute("aria-label",t.rotulo),c.append(e),i.append(s,c);let d=()=>c.querySelector(Md)?.focus?.({preventScroll:!0}),p=A=>{let T=A.composedPath();!T.includes(n)&&!T.includes(o)&&u.fechar()},l=A=>{A.key==="Escape"&&u.fechar()},m=!1,u={raiz:i,ancora:o,trocar(A){m||(c.replaceChildren(A),d())},fechar(){m||(m=!0,n.remove(),r.removeEventListener("pointerdown",p,!0),r.removeEventListener("keydown",l,!0),Ve===u&&(Ve=null),o.setAttribute("aria-expanded","false"),o.isConnected&&o.focus?.({preventScroll:!0}),t.aoFechar?.())}},f=o.getBoundingClientRect(),g=a?.innerWidth??1024,x=Math.max(8,Math.min(f.left,g-348))+(a?.scrollX??0),E=A=>{n.style.cssText=`position:absolute;z-index:2147483000;left:${Math.round(x)}px;top:${Math.round(A)}px`};E(f.bottom+(a?.scrollY??0)+6),r.body.append(n);let v=n.getBoundingClientRect().height,y=a?.innerHeight??0;return v&&y&&f.bottom+6+v>y&&f.top-6-v>0&&E(f.top+(a?.scrollY??0)-6-v),r.addEventListener("pointerdown",p,!0),r.addEventListener("keydown",l,!0),o.setAttribute("aria-expanded","true"),Ve=u,d(),u}function pi(){return Ve}var Id="O espa\xE7o do navegador para o SEI Pro est\xE1 cheio. Arquive ou exclua projetos antigos.";function Td(o){let e=o,t=`${typeof e?.name=="string"?e.name:""} ${typeof e?.message=="string"?e.message:typeof o=="string"?o:""}`;return/quota/i.test(t)}function ur(o){let e=o?.mensagens;return Array.isArray(e)&&e.length?e.map(String).join(" "):Td(o)?Id:o instanceof Error?o.message:String(o)}var li="http://www.w3.org/2000/svg",Cd={modelo:[["rect",{x:"4",y:"4",width:"16",height:"16",rx:"2"}],["path",{d:"M4 9.5h16M9.5 9.5V20"}]],checklist:[["path",{d:"m4 7 2 2 3.5-3.5M4 15l2 2 3.5-3.5M13 8h7M13 16h7"}]],progresso:[["path",{d:"M4 12a8 8 0 1 0 8-8"}],["path",{d:"M12 4v8l5 3"}]],voltar:[["path",{d:"m15 6-6 6 6 6"}]],abrir:[["path",{d:"M14 4h6v6M20 4l-9 9"}],["path",{d:"M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"}]]};function ui(o,e,t){let r=document.createElementNS(li,"svg"),a={viewBox:e,width:String(o),height:String(o),"aria-hidden":"true",focusable:"false",...t};for(let[n,i]of Object.entries(a))r.setAttribute(n,i);return r}function ho(o,e){let t=document.createElementNS(li,o);for(let[r,a]of Object.entries(e))t.setAttribute(r,a);return t}function mr(o,e=18){let t=ui(e,"0 0 24 24",{fill:"none",stroke:"currentColor","stroke-width":"1.8","stroke-linecap":"round","stroke-linejoin":"round",class:"spro-icone"});for(let[r,a]of Cd[o])t.append(ho(r,a));return t}function mi(o,e){let t=ui(16,"0 0 16 16",{class:`prj-st prj-st-${o}${e?" prj-st-marco":""}`});return e?(t.append(ho("path",{class:"prj-st-cor",d:o==="concluida"?"M8 1.5 14.5 8 8 14.5 1.5 8z":"M8 2 14 8 8 14 2 8z"})),t):(o==="concluida"?t.append(ho("circle",{class:"prj-st-cor",cx:"8",cy:"8",r:"7"}),ho("path",{class:"prj-st-sinal",d:"m4.8 8.2 2.1 2.1 4.3-4.4"})):o==="atrasada"?t.append(ho("circle",{class:"prj-st-cor",cx:"8",cy:"8",r:"7"}),ho("path",{class:"prj-st-sinal",d:"M8 4.2v4.6"}),ho("circle",{class:"prj-st-ponto",cx:"8",cy:"11.4",r:"1"})):o==="andamento"?t.append(ho("circle",{class:"prj-st-cor",cx:"8",cy:"8",r:"6.2"}),ho("path",{class:"prj-st-meio",d:"M8 1.8a6.2 6.2 0 0 1 0 12.4z"})):t.append(ho("circle",{class:"prj-st-cor",cx:"8",cy:"8",r:"6.2"})),t)}var kd=["dom","seg","ter","qua","qui","sex","s\xE1b"];function he(o,e){if(!R(o))return"sem data";let[t,r,a]=o.split("-");return o.slice(0,4)===e.slice(0,4)?`${a}/${r}`:`${a}/${r}/${t}`}function fi(o,e){if(o.concluidaEm){let t=R(o.concluidaEm)?` em ${he(o.concluidaEm,e)}`:"";return`${o.marco?"cumprido":"conclu\xEDda"}${t}`}return R(o.fim)?o.fim<e?`venceu ${he(o.fim,e)}`:o.marco?o.fim===e?"marco hoje":`marco ${he(o.fim,e)}`:o.fim===e?"vence hoje":R(o.inicio)&&o.inicio>e?`come\xE7a ${he(o.inicio,e)}`:o.fim<=Ze(e)?`at\xE9 ${kd[oo(o.fim).getDay()]??""} ${he(o.fim,e)}`:`at\xE9 ${he(o.fim,e)}`:"sem data"}var fr=4,vi=new WeakMap,_o=(o,e,t,...r)=>b("button",{type:"button",class:e,onclick:t},...r,o),No=(o,e)=>b("label",{class:"pb-campo"},b("span",{class:"pb-rotulo"},o),e),ze=(o,e,t=!1)=>b("option",{value:o,selected:t},e),gi=o=>R(o.fim)?o.fim:"9999-12-31",hi=o=>o.etapas.filter(e=>!e.concluidaEm).sort((e,t)=>gi(e).localeCompare(gi(t)));function Rd(o){return o.sigiloso?"":(o.especificacao||o.tipo||"").trim().slice(0,h.nome)}function bi(o,e){let t=()=>{},r=new Promise(c=>{t=c}),a=o.querySelector(".pb-slot");if(!a)return t(!1),{resposta:r,cancelar:()=>{}};let n=!1,i=c=>{if(n)return;n=!0,a.replaceChildren(),t(c);let d=vi.get(o);d?.isConnected&&d.focus?.({preventScroll:!0})},s=_o("Entendi","spro-botao primario pequeno",()=>i(!0));return a.replaceChildren(b("div",{class:"pb-pergunta",role:"alert"},b("p",{},`Os projetos de \u201CToda a unidade\u201D ficam guardados no pr\xF3prio SEI, num Texto Padr\xE3o da ${e}: todos da unidade que usam o SEI Pro veem e editam. O n\xFAmero de processo sigiloso n\xE3o vai.`),b("div",{class:"pb-botoes"},s,_o("Agora n\xE3o","spro-botao pequeno",()=>i(!1))))),s.focus?.({preventScroll:!0}),{resposta:r,cancelar:()=>i(!1)}}function xi(o,e){let t=b("div",{class:"pb"}),r=null,a=o.modo==="arvore",n=b("div",{class:"pb-slot"}),i=(l,m,...u)=>{let f=_o(l,"spro-botao primario pequeno",()=>{vi.set(t,f),m()},...u);return f},s=(l,m)=>{let u=b("p",{class:"pb-erro",role:"alert"}),f=b("select",{class:"spro-campo",name:"etapa"},...m.map((v,y)=>ze(v.id,v.nome,y===0))),g=b("select",{class:"spro-campo",name:"documento"},ze("",o.documentos.length?"(sem documento)":"Nenhum documento na \xE1rvore",!0),...o.documentos.map(v=>ze(v.numero,`${v.titulo} (${v.numero})`))),x=b("input",{class:"spro-campo",type:"date",name:"data",value:o.hoje}),E=()=>{let v=o.documentos.find(y=>y.numero===g.value);u.textContent="",e.concluir(l.vis,f.value,v?{numero:v.numero,titulo:v.titulo}:void 0,x.value).catch(y=>{u.textContent=ur(y)})};return b("div",{class:"pb-form"},m.length>1?No("Etapa",f):b("p",{class:"pb-dica"},`Concluir \u201C${m[0]?.nome??""}\u201D`),No("Documento",g),No("Conclu\xEDda em",x),u,b("div",{class:"pb-rod"},_o("Cancelar","spro-botao pequeno",()=>{r=null,p()}),i("Concluir",E,B("check",13))))},c=(l,m)=>{let u=hi(l),f=l.papel==="projeto"?"processo do projeto":l.etapas.length===1?"etapa":"etapas",g=`${l.vis}:${l.projeto.id}`;return b("div",{class:"pb-vinc","data-projeto":l.projeto.id},b("div",{class:"pb-proj",title:Te(l.vis)},B(l.vis==="unidade"?"predio":"pessoa",13),b("span",{},`${l.projeto.nome} \xB7 ${f}`)),...u.slice(0,fr).map(x=>{let E=Ie(x,o.hoje);return b("div",{class:`pb-etapa${E==="atrasada"?" pb-atrasada":""}`,"data-etapa":x.id},mi(E,x.marco),b("span",{class:"pb-nome"},x.nome),b("span",{class:"pb-data"},fi(x,o.hoje)))}),u.length>fr?b("div",{class:"pb-mais"},`e mais ${u.length-fr}`):null,u.length?null:b("div",{class:"pb-vazio"},l.etapas.length?"Todas as etapas ligadas est\xE3o conclu\xEDdas.":"Nenhuma etapa ligada ainda."),r===g?s(l,u):o.modo==="arvore"||m?b("div",{class:"pb-botoes"},o.modo==="arvore"&&u.length?_o("Concluir com documento\u2026","spro-botao primario pequeno",()=>{r=g,p()},B("documento",13)):null,_o("Abrir no painel","spro-botao pequeno",()=>e.abrirNoPainel(l.projeto.id,u[0]?.id),mr("abrir",13))):null)},d=()=>{if(!o.projetos.length)return b("div",{class:"pb-form"},b("p",{class:"pb-dica"},"Crie um projeto no painel do Controle de Processos para ligar este processo."));let l=new Set(o.vinculos.map(S=>`${S.vis}:${S.projeto.id}`)),m=S=>`${S.vis}:${S.projeto.id}`,u=o.projetos.find(S=>!l.has(m(S)))??o.projetos[0],f=m(u),g="etapa",x=b("p",{class:"pb-erro",role:"alert"}),E=b("select",{class:"spro-campo",name:"projeto"},...o.projetos.map(S=>ze(m(S),`${S.projeto.nome} (${Te(S.vis)})`,m(S)===f))),v=b("input",{class:"spro-campo",name:"nome",maxlength:String(h.nome),placeholder:"Nome da etapa",value:Rd(o.processo)}),y=b("input",{class:"spro-campo",type:"date",name:"inicio",value:o.hoje}),A=b("input",{class:"spro-campo",type:"number",name:"duracao",min:"1",max:"2600",step:"1",value:"10"}),T=b("select",{class:"spro-campo",name:"etapaLigar"}),I=b("div",{class:"pb-form-como"}),Q=()=>o.projetos.find(S=>m(S)===f)??u,K=[["etapa","Nova etapa"],["ligar","Ligar a uma etapa"],["projeto","Processo do projeto"]],Lo=b("div",{class:"spro-segmentado",role:"group","aria-label":"Como"}),so=D(o.processo.protocolo),Z=()=>{Lo.replaceChildren(...K.map(([M,V])=>b("button",{type:"button","aria-pressed":String(g===M),onclick:()=>{g=M,Z()}},V)));let S=Q();if(g==="etapa")I.replaceChildren(No("Nome da etapa",v),b("div",{class:"pb-linha2"},No("In\xEDcio",y),No("Dura\xE7\xE3o (dias \xFAteis)",A)));else if(g==="ligar"){let M=k=>!!so&&typeof k?.protocolo=="string"&&D(k.protocolo)===so,V=M(S.projeto.processo),Ao=S.etapas.filter(k=>!k.concluidaEm&&(k.processo&&!ot(k.processo)?!M(k.processo):!V));T.replaceChildren(...Ao.map((k,w)=>ze(k.id,k.processo?.protocolo||k.processo?.sigiloso?`${k.nome} (j\xE1 tem outro processo)`:k.nome,w===0))),I.replaceChildren(Ao.length?No("Etapa",T):b("p",{class:"pb-dica"},"Este projeto n\xE3o tem etapa aberta para ligar."))}else{let M=S.projeto.processo;I.replaceChildren(b("p",{class:"pb-dica"},M?.protocolo||M?.sigiloso?D(M.protocolo)===so&&M.protocolo?"Este j\xE1 \xE9 o processo do projeto.":`O projeto passa a ter este processo no lugar de ${M.sigiloso?"um processo sigiloso":M.protocolo}.`:"O projeto passa a ter este processo (as etapas sem processo pr\xF3prio v\xEAm junto)."))}};E.addEventListener("change",()=>{f=E.value,Z()}),Z();let j=()=>{let S=Q(),M={protocolo:o.processo.protocolo};o.processo.idProcedimento&&(M.idProcedimento=o.processo.idProcedimento),o.processo.sigiloso&&(M.sigiloso=!0);let V={vis:S.vis,projeto:S.projeto.id,como:g,processo:M};g==="etapa"&&Object.assign(V,{nome:v.value,inicio:y.value,duracao:Number(A.value)}),g==="ligar"&&(V.etapa=T.value),x.textContent="",e.adicionar(V).catch(Ao=>{x.textContent=ur(Ao)})};return b("div",{class:"pb-form"},o.modo==="arvore"?b("b",{},"Adicionar a um projeto"):null,No("Projeto",E),b("div",{class:"pb-campo"},b("span",{class:"pb-rotulo"},"Como"),Lo),I,x,b("div",{class:"pb-rod"},i("Adicionar",j,B("mais",13))))};function p(){let l=o.vinculos.length,m=o.modo==="arvore"?"Projetos deste processo":`Em ${l} ${l===1?"projeto":"projetos"}`,u=o.modo==="caixa"&&l===1,f=[b("div",{class:"pb-cab"},b("span",{class:"pb-ic"},B("gantt",17)),b("span",{class:"pb-tit"},b("b",{},m),b("small",{},o.processo.protocolo)),b("button",{type:"button",class:"spro-botao-icone pequeno","aria-label":"Fechar",title:"Fechar (Esc)",onclick:()=>e.fechar()},B("fechar",14))),o.mensagem?b("p",{class:"pb-ok",role:"status"},o.mensagem):null,n,...o.vinculos.map(g=>c(g,o.modo==="caixa"&&l>1)),o.modo==="arvore"&&!l?b("p",{class:"pb-dica"},"Este processo ainda n\xE3o est\xE1 em nenhum projeto."):null,a?d():b("div",{class:"pb-rod"},_o(l?"Adicionar a outro projeto":"Adicionar a um projeto","spro-botao pequeno",()=>{a=!0,p()}),u?_o("Abrir no painel","spro-botao primario pequeno",()=>e.abrirNoPainel(o.vinculos[0].projeto.id,hi(o.vinculos[0])[0]?.id),mr("abrir",13)):null)];t.replaceChildren(...f.filter(g=>g!==null))}return p(),t}async function Ei(o,e,t){let r=e.hoje(),[a,n]=await Promise.all([e.repos.unidade.dados(),e.repos.eu.dados()]),i=[{vis:"unidade",dados:a},{vis:"eu",dados:n}],s=Oe(i.map(d=>({vis:d.vis,projetos:d.dados.projetos,etapas:d.dados.etapas}))),c={modo:e.modo,processo:o,vinculos:s.get(D(o.protocolo))??[],projetos:Kt(i,r).ativos,documentos:e.modo==="arvore"?e.documentos():[],hoje:r};return t&&(c.mensagem=t),c}async function yi(o,e,t){let r=null,a=null,n=null,i=!1,s=()=>{if(i||!a)return Promise.resolve(!1);let m=bi(a,t.sigla);return n=m,m.resposta.finally(()=>{n===m&&(n=null)})},c={unidade:ni(t.repos.unidade,ii(t.consentimento,s)),eu:t.repos.eu},d=m=>(a=xi(m,l),a),p=async m=>{let u=await Ei(e,t,m);return i||r?.trocar(d(u)),m},l={fechar:()=>r?.fechar(),abrirNoPainel:(m,u)=>{r?.fechar(),t.abrirNoPainel(m,u)},adicionar:async m=>p(await si(c,m,t.hoje())),concluir:async(m,u,f,g)=>p(await ci(c,m,u,f,g))};return r=di(o,d(await Ei(e,t)),{cssBase:t.cssBase,temaEscuro:t.temaEscuro,rotulo:t.modo==="arvore"?"Projetos deste processo":`Projetos do processo ${e.protocolo}`,aoFechar:()=>{i=!0,n?.cancelar()}}),r}function gr(o,e){let t=o.querySelector("input[type=checkbox]"),r=o.querySelector("a[href*='procedimento_trabalhar']");if(!t||!r)return null;let a=t.getAttribute("aria-label")??"",n=/^Sigiloso\b/.test(a)||/Sigiloso/.test(r.getAttribute("class")??""),i=[...o.querySelectorAll("td")],s=n?[]:[...i[1]?.querySelectorAll("a[aria-label]")??[]].map(c=>c.getAttribute("aria-label")??"");return{idProcedimento:t.getAttribute("value")??lo(r.getAttribute("href")??"").get("id_procedimento")??"",protocolo:t.getAttribute("title")??U(r),grupo:e,tipo:/Tipo (.*?)(?: \/ Especifica|$)/.exec(a)?.[1]?.trim()??"",especificacao:n?"":/Especifica\S* (.*)$/.exec(a)?.[1]?.trim()??"",sigiloso:n,novo:/NaoVisualizado/.test(r.getAttribute("class")??""),atribuido:U(i[i.length-1]).replace(/^\(|\)$/g,""),sinais:s,documentoNovo:!!i[1]?.querySelector("img[src*='exclamacao']")||s.some(c=>/documento foi inclu/i.test(c))}}function wi(o,e){let t=e==="recebidos"?"#tblProcessosRecebidos":"#tblProcessosGerados",r=o.doc.querySelector(t),a=Number(/\((\d+)\s+registro/.exec(U(r?.querySelector("caption")))?.[1]??0),n=[];for(let i of r?.querySelectorAll("tr[id^='P']")??[]){let s=gr(i,e);s&&n.push(s)}return{itens:n,total:a}}function Pi(o){return[...wi(o,"recebidos").itens,...wi(o,"gerados").itens]}var Ai="spro-prj-estilo-sei",Nd=`.spro-prj-ic{position:relative;display:inline-grid;place-items:center;width:26px;height:24px;padding:0;margin:0 1px;border:0;border-radius:6px;background:none;color:#1f5fbf;cursor:pointer;vertical-align:middle;line-height:0}
.spro-prj-ic:hover,.spro-prj-ic[aria-expanded="true"]{background:rgb(31 95 191 / 12%)}
.spro-prj-ic:focus-visible{outline:2px solid #1a73e8;outline-offset:1px}
.spro-prj-ic svg{display:block;width:18px;height:18px}
.spro-prj-ic[data-atraso]::after{content:"";position:absolute;top:1px;right:1px;width:6px;height:6px;border-radius:50%;background:#d1352b;border:1.5px solid #fff}
.spro-prj-ic.spro-prj-escuro{color:#79acff}
.spro-prj-ic.spro-prj-escuro:hover,.spro-prj-ic.spro-prj-escuro[aria-expanded="true"]{background:rgb(121 172 255 / 16%)}
.spro-prj-ic.spro-prj-escuro[data-atraso]::after{background:#ff7d73;border-color:#1a1d21}
.spro-prj-faixa{display:flex;align-items:center;gap:6px;box-sizing:border-box;width:100%;margin:6px 0;padding:5px 8px;border:1px solid rgb(209 53 43 / 28%);border-radius:6px;background:rgb(209 53 43 / 8%);color:#1b1f24;font:12px/1.35 system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;text-align:left;cursor:pointer}
.spro-prj-faixa:focus-visible{outline:2px solid #1a73e8;outline-offset:1px}
.spro-prj-faixa svg{flex:none;color:#d1352b}
.spro-prj-faixa span{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.spro-prj-faixa b{font-weight:600}
.spro-prj-faixa.spro-prj-vence{border-color:rgb(180 92 10 / 30%);background:rgb(180 92 10 / 9%)}
.spro-prj-faixa.spro-prj-vence svg{color:#b45c0a}
.spro-prj-faixa.spro-prj-escuro{color:#e7e9ec;background:rgb(255 125 115 / 12%);border-color:rgb(255 125 115 / 30%)}
.spro-prj-faixa.spro-prj-escuro.spro-prj-vence{background:rgb(232 176 74 / 12%);border-color:rgb(232 176 74 / 30%)}`;function Si(o){if(o.getElementById(Ai))return;let e=o.createElement("style");e.id=Ai,e.textContent=Nd,(o.head??o.documentElement).append(e)}var Di="tr[id^='P']",Et="spro-prj-ic";function Oi(o){let e=gr(o,o.closest("#tblProcessosGerados")?"gerados":"recebidos"),t=e?.protocolo.trim()??"";if(!e||!D(t))return null;let r={protocolo:t,sigiloso:e.sigiloso};return Do.test(e.idProcedimento)&&(r.idProcedimento=e.idProcedimento),e.tipo&&(r.tipo=e.tipo),e.especificacao&&(r.especificacao=e.especificacao),r}function ji(o,e,t,r){let a=new Set(e.map(s=>`${s.vis}:${s.projeto.id}`)).size,n=e.some(s=>s.etapas.some(c=>!c.concluidaEm&&R(c.fim)&&c.fim<t)),i=`Em ${a} ${a===1?"projeto":"projetos"}${n?" \xB7 com etapa atrasada":""}`;o.hasAttribute("data-atraso")!==n&&o.toggleAttribute("data-atraso",n),o.classList.contains("spro-prj-escuro")!==r&&o.classList.toggle("spro-prj-escuro",r),o.getAttribute("aria-label")!==i&&(o.setAttribute("aria-label",i),o.title=i)}function _d(o){let e=o.createElement("button");return e.type="button",e.className=Et,e.setAttribute("data-spro-caixa",""),e.setAttribute("aria-haspopup","dialog"),e.setAttribute("aria-expanded","false"),e.append(B("gantt",18)),e}function Ld(o,e){let t=o.querySelectorAll("td")[1];if(!t)return!1;let r=t.querySelector(".spro-fav-estrela");return r?r.after(e):t.prepend(e),!0}var qd=o=>o.nodeType===1&&o.classList.contains(Et),$d=o=>o.type==="childList"&&(o.removedNodes.length>0||[...o.addedNodes].some(e=>!qd(e)));function Mi(o){Si(o.doc);let e=new Map,t=!1,r=new Set,a=Promise.resolve(),n=E=>{let v=D(E);!v||r.has(v)||(r.add(v),a=a.then(async()=>{for(let y of[o.repos.unidade,o.repos.eu]){if(t)return;try{await y.marcarSigiloso(E)}catch(A){console.warn("[SEI Pro] projetos: sigilo da linha",A instanceof Error?A.message:A)}}}))},i=o.doc.defaultView?.MutationObserver,s=()=>{if(t)return;let E=o.hoje();for(let v of o.doc.querySelectorAll(Di)){let y=Oi(v);y?.sigiloso&&n(y.protocolo);let A=[...v.querySelectorAll(`.${Et}`)],T=y?e.get(D(y.protocolo))??[]:[];if(!T.length){for(let K of A)K.remove();continue}let[I,...Q]=A;for(let K of Q)K.remove();if(I)ji(I,T,E,o.temaEscuro);else{let K=_d(o.doc);ji(K,T,E,o.temaEscuro),Ld(v,K)}}u?.takeRecords?.()},c=0,d=async()=>{let E=++c,v=await kn([o.repos.unidade,o.repos.eu]);t||E!==c||(e=v,s())},p=null,l=!1,m=E=>{t||(l||=E,!p&&(p=setTimeout(()=>{p=null,l?(l=!1,d().catch(v=>console.warn("[SEI Pro] projetos: \xEDcones da caixa",v))):s()},o.atraso??80)))},u=i?new i(E=>{E.some($d)&&m(!1)}):null,f=o.doc.querySelector("#frmProcedimentoControlar")??o.doc.body;u&&f&&u.observe(f,{childList:!0,subtree:!0});let g=Object.values(o.repos).map(E=>E.aoMudar(()=>m(!0))),x=E=>{let v=E.target?.closest?.(`.${Et}[data-spro-caixa]`);if(!v)return;E.preventDefault(),E.stopPropagation();let y=pi();if(y?.ancora===v){y.fechar();return}let A=v.closest(Di),T=A?Oi(A):null;T&&o.abrir(v,T)};return o.doc.addEventListener("click",x,!0),{atualizar:d,parar(){t=!0,u?.disconnect();for(let E of g)E();p&&clearTimeout(p),p=null,o.doc.removeEventListener("click",x,!0)}}}var Vd=20;async function Ii(o,e){let t=e.replace(/\D/g,"");if(!t||t.length>Vd)return null;let r;try{r=await o(t)}catch(d){if(d.codigo==="SEI_NAO_ENCONTRADO")return null;throw d}let a=lo(r.url);if(a.get("acao")!=="procedimento_trabalhar")return null;let n=ye(r.doc.querySelector("#ifrArvore")?.getAttribute("src")??""),i=lo(n).get("id_procedimento")??"",s=a.get("id_protocolo")??"";if(!s||s===i)return null;let c=/^SEI\s*-\s*(.+)$/.exec(r.doc.querySelector("title")?.textContent?.trim()??"")?.[1]?.trim();return c?{numero:t,protocolo:c}:{numero:t}}function zd(o,e){let t=e.replace(/\D/g,""),r=t?o.querySelector(`tr[id="P${t}"] a[href*="procedimento_trabalhar"]`):null;if(r)return{tipo:"linha",link:r};let a=o.querySelector("#frmProtocoloPesquisaRapida"),n=o.querySelector("#txtPesquisaRapida");return a&&n?{tipo:"pesquisa",form:a,campo:n}:null}function hr(o,e,t,r){let a=zd(o,e);if(!a)throw new _("SEM_PESQUISA","Esta tela do SEI n\xE3o tem a pesquisa r\xE1pida para abrir o processo.");if(a.tipo==="linha")return r?o.defaultView?.open(a.link.href,"_blank","noopener"):a.link.click(),"linha";let n=a.form.getAttribute("target");a.campo.value=t,r&&a.form.setAttribute("target","_blank");try{typeof a.form.requestSubmit=="function"?a.form.requestSubmit():a.form.submit()}finally{n===null?a.form.removeAttribute("target"):a.form.setAttribute("target",n)}return"pesquisa"}function Ud(o){if(typeof o!="string")return null;let e=o.trim();return e&&Zo.test(e)?e:null}var ki=o=>typeof o=="number"&&Number.isSafeInteger(o)&&o>=0?String(o):null;function Fd(o){if(o==null||o==="")return"";let e=typeof o=="string"?o:ki(o);return e!==null&&Do.test(e)?e:null}var Ti=o=>typeof o=="string"&&o.length>0&&o.length<=200?o:void 0,Ci="A sincronia pelo Texto Padr\xE3o s\xF3 funciona numa tela do SEI com unidade e com o item Textos Padr\xE3o no menu. Abra o Controle de Processos e tente de novo.";function Hd(o){try{return Pi(uo(o)).map(e=>{let t={protocolo:e.protocolo.trim(),idProcedimento:e.idProcedimento.trim(),sigiloso:e.sigiloso};return e.tipo&&(t.tipo=e.tipo),!e.sigiloso&&e.especificacao&&(t.especificacao=e.especificacao),t})}catch{return[]}}function Ri(o){return{contexto:()=>o.ctx,...Nr(o),abrirProcesso:e=>{let t=e??{},r=Fd(t.id),a=Ud(t.protocolo);if(r===null||a===null)throw new _("ARGUMENTO_INVALIDO","Este n\xE3o \xE9 um n\xFAmero de processo do SEI.");return hr(o.doc,r,a,t.novaAba===!0)},abrirDocumento:e=>{let t=e?.numero,r=(typeof t=="string"?t:ki(t)??"").replace(/\D/g,"");if(!Wo.test(r))throw new _("ARGUMENTO_INVALIDO","Informe o n\xFAmero SEI do documento (at\xE9 20 d\xEDgitos).");return hr(o.doc,"",r,!0)},conferirDocumento:e=>o.conferir(String(e?.numero??"")),processosDaCaixa:()=>Hd(o.doc),usuariosDaUnidade:()=>o.usuarios(),atividadesDisponivel:()=>o.ctx.atividades,sincronizarAgora:()=>{if(!o.sincronia)throw new _("SEM_SINCRONIA",Ci);return o.sincronia.agora()},apagarDoSei:()=>{if(!o.sincronia)throw new _("SEM_SINCRONIA",Ci);return o.sincronia.apagarPessoal()},importarAtividades:()=>{if(!o.atividades)throw new _("SEM_ATIVIDADES","N\xE3o h\xE1 servidor do Atividades configurado neste SEI.");return o.atividades()},focarNoPainel:e=>{let t=e??{},r=Ti(t.id);if(!r)throw new _("ARGUMENTO_INVALIDO","Projeto inv\xE1lido.");if(!o.focarNoPainel)throw new _("SEM_PAINEL","Abra o Controle de Processos nesta aba para ver o projeto no painel.");return o.focarNoPainel(r,Ti(t.etapa))}}}var yt=new WeakMap;function Ue(o,e,t,r={}){o.corpo.hidden&&o.painel.querySelector(".spro-prj-recolher")?.click(),o.painel.scrollIntoView?.({behavior:"smooth",block:"start"});let a=r.espera??300,n=yt.get(o.painel);n!==void 0&&clearTimeout(n),yt.delete(o.painel);let i=s=>{yt.delete(o.painel);let c=o.rpc();c?c.chamar("focarProjeto",t?{id:e,etapa:t}:{id:e}).catch(()=>{}):s>0&&yt.set(o.painel,setTimeout(()=>i(s-1),a))};return i(Math.ceil(9e3/Math.max(1,a))),"painel"}function Ni(o,e,t,r,a){let n={alvo:o,chave:e,projeto:t,ate:a+Wt};return r&&(n.etapa=r),n}async function Bd(o,e,t){let r;try{r=o.link()}catch{throw new _("SEM_MENU","Esta tela do SEI n\xE3o mostra o menu. Abra o Controle de Processos e tente de novo.")}return await o.area.gravar({[re]:Ni("painel",o.chave,e,t,o.agora)}),o.ir(r),"navegou"}async function _i(o,e,t,r,a={}){let n=Ua((await o.obter(re))[re],"painel",e,t);return n?(await o.remover(re),Ue(r,n.projeto,n.etapa,a),!0):!1}function Li(o){return o.painel.catch(()=>{}),async(e,t)=>{let r;try{r=await o.painel}catch{throw new _("SEM_PAINEL","O painel de projetos n\xE3o p\xF4de ser aberto nesta p\xE1gina. Recarregue o Controle de Processos e tente de novo.")}return r?Ue(r,e,t):Bd({area:o.area,chave:o.chave,agora:o.agora(),link:o.link,ir:o.ir},e,t)}}async function qi(o,e,t){let r=(async()=>o.abrir())().catch(()=>o.janela());await o.area.gravar({[re]:Ni("lateral",o.chave,e,t,o.agora)}),await r}function vr(o){if(typeof o=="number"&&o)return String(o);let e=o?.id;return typeof e=="string"&&e?e:null}function $i(o,e,t){let r=vr(o);return r?!e||!t.has(r):!1}function Vi(o){let e=null,t=!1,r=new Set,a=()=>{e?.aberta&&e.chamar("ola",o.estado(),5e3).catch(()=>{})},n=c=>{if(t||!$i(c,!!e?.aberta,r))return;e?.fechar();let d;try{d=Ge(o.conectar(),o.tratadores)}catch{e=null;return}e=d,d.aoFechar(()=>{e===d&&(e=null)});let p=vr(c);p&&r.add(p),a()},i=()=>{t||o.area.obter(o.chave).then(c=>n(c[o.chave])).catch(()=>{})},s=o.area.aoMudar(c=>{o.chave in c&&n(c[o.chave]?.novo)});return i(),{apresentar:a,verificar:i,parar(){t=!0,s(),e?.fechar(),e=null}}}function zi(o){let e=o.doc.defaultView,t=te(o.ctx),r=o.doc.hasFocus?.()?Date.now():0,a=Vi({area:o.area,chave:ua,conectar:o.conectar,tratadores:o.tratadores,estado:()=>({visivel:o.doc.visibilityState==="visible",foco:r,chave:t})}),n=()=>{r=Date.now(),a.apresentar()},i=()=>o.doc.visibilityState==="visible"?n():a.apresentar();e?.addEventListener("focus",n),o.doc.addEventListener("visibilitychange",i);let s=setInterval(()=>a.verificar(),o.intervalo??5e3);return{parar(){clearInterval(s),e?.removeEventListener("focus",n),o.doc.removeEventListener("visibilitychange",i),a.parar()}}}var Ui="projetosPro",Gd="projetosGantt",N="spro-prj";function Fi(o){return Ot(o,Ui)??Ot(o,Gd)}function Xd(o){if(jt(o,N),o.getElementById(`${N}-alertas-estilo`))return;let e=o.createElement("style");e.id=`${N}-alertas-estilo`,e.textContent=[`.${N}-alertas{display:inline-flex;gap:6px;margin-left:10px}`,`.${N}-alertas[hidden]{display:none}`,`.${N}-pilula{display:inline-flex;align-items:center;gap:4px;min-height:24px;padding:0 10px;font:600 12.5px/1 system-ui,-apple-system,'Segoe UI',Roboto,sans-serif;border:0;border-radius:999px;cursor:pointer}`,`.${N}-pilula:focus-visible{outline:2px solid #1a73e8;outline-offset:1px}`,`.${N}-pilula svg{flex:none}`,`.${N}-atrasadas{color:#b42318;background:rgb(209 53 43 / 12%)}`,`.${N}-semana{color:#8a4b08;background:rgb(180 92 10 / 13%)}`,`.${N}-escuro .${N}-atrasadas{color:#ff7d73;background:rgb(255 125 115 / 16%)}`,`.${N}-escuro .${N}-semana{color:#e8b04a;background:rgb(232 176 74 / 16%)}`].join(`
`),(o.head??o.documentElement).append(e)}function Hi(o,e){return Rr(o,{...e,id:Ui,titulo:"Projetos",tituloIframe:"Projetos do SEI Pro",prefixo:N,rotulos:{mostrar:"Mostrar projetos",recolher:"Recolher projetos"},icone:()=>{let t=B("gantt",22);return t.setAttribute("style",`color:${e.temaEscuro?"#79acff":"#1f5fbf"}`),t},estilo:Xd,alturaInicial:160})}function Kd(o,e,t,r){let a=o.querySelector(`.${N}-alertas`);a||(a=b("span",{class:`${N}-alertas`}),o.append(a)),a.classList.toggle(`${N}-escuro`,t);let n=(i,s,c)=>b("button",{type:"button",class:`${N}-pilula ${N}-${i}`,title:c,onclick:()=>r(i)},B(i==="atrasadas"?"alerta":"relogio",13),s);a.replaceChildren(...e.atrasadas?[n("atrasadas",`${e.atrasadas} ${e.atrasadas===1?"atrasada":"atrasadas"}`,"Mostra as etapas atrasadas")]:[],...e.semana?[n("semana",`${e.semana} ${e.semana===1?"vence":"vencem"} nesta semana`,"Etapas que vencem at\xE9 sexta-feira")]:[]),a.hidden=!e.atrasadas&&!e.semana}function Bi(o,e){let t=o.painel.querySelector(`.${N}-titulo`);if(!t)return{parar:()=>{}};let r=!1,a=e.espera??300,n=null,i=(u,f)=>{if(n=null,r)return;let g=e.rpc();g?g.chamar("alerta",{tipo:u}).catch(()=>{}):f>0&&(n=setTimeout(()=>i(u,f-1),a))},s=u=>{o.corpo.hidden&&o.painel.querySelector(`.${N}-recolher`)?.click(),o.painel.scrollIntoView?.({behavior:"smooth",block:"start"}),n&&clearTimeout(n),i(u,Math.ceil(9e3/Math.max(1,a)))},c=null,d=()=>{r||(c&&clearTimeout(c),c=setTimeout(()=>{c=null;let u=e.hoje();nt(e.repos,u).then(f=>{if(r)return;let g=ka(f.ativos,u);Kd(t,g,e.temaEscuro,s),e.aoContar?.(g.atrasadas)}).catch(()=>{})},e.atraso??150))},p=Object.values(e.repos).map(u=>u.aoMudar(d)),l=o.painel.ownerDocument,m=()=>{l.visibilityState==="visible"&&d()};return l.addEventListener("visibilitychange",m),d(),{parar(){r=!0;for(let u of p)u();l.removeEventListener("visibilitychange",m),c&&clearTimeout(c),n&&clearTimeout(n)}}}function Gi(){return globalThis.navigator?.locks??null}function Xi(o,e,t=Gi()){return t?t.request(o,{ifAvailable:!0},async r=>r?e():null):e()}function Ki(o,e,t=Gi()){return t?t.request(o,()=>e()):e()}var Yd=2*6e4,br=["unidade","eu"];function Jd(o){let e=Tt(o);return{estado:e.estado,mensagem:e.mensagem,quando:Date.now(),pendente:!1}}async function xr(o){try{return await o()}catch(e){return Jd(e)}}var Er=class{constructor(e){this.d=e;let t=st(e.host,e.login,e.unidade.id);for(let a of br)if(bo(e.repos[a].escopo)!==bo(t[a]))throw new Error(`Sincronia da aba: o reposit\xF3rio de "${a}" n\xE3o \xE9 desta unidade e deste usu\xE1rio.`);let r=a=>new Ke({area:e.area,adaptador:Kn({repo:e.repos[a],area:e.area,sigla:e.unidade.sigla,nomeUsuario:e.nomeUsuario}),armazem:()=>e.armazem(a),consentimento:this.consentimento(a),aoMudarLocal:n=>e.repos[a].aoMudar(n),travar:e.travar,travarEsperando:e.travarEsperando,atrasoEnvio:e.atrasoEnvio,intervaloPuxar:Yd,releituras:3,lerSemConsentimento:a==="unidade",lerNoRecuo:a==="unidade"});this.controles={unidade:r("unidade"),eu:r("eu")}}controles;naoIniciados=new Set;puxando=null;parado=!1;consentimento(e){return vt(this.d.sync,this.d.host,this.d.login,this.d.unidade.id,e)}async iniciar(e){this.parado=!1,await Promise.all(br.map(t=>this.iniciarTexto(t,e)))}async iniciarTexto(e,t){try{await this.controles[e].iniciar(t),this.naoIniciados.delete(e)}catch(r){this.naoIniciados.add(e),console.warn(`[SEI Pro] projetos: a sincronia do texto "${e}" n\xE3o iniciou:`,r)}}puxar(){return this.puxando??=this.puxarUmaVez().finally(()=>{this.puxando=null}),this.puxando}async puxarUmaVez(){await Promise.all(br.map(async e=>{if(this.naoIniciados.has(e)){this.parado||await this.iniciarTexto(e,{puxar:!0});return}await xr(()=>this.controles[e].puxar())}))}async agora(){let e=await xr(()=>this.controles.unidade.agora()),t=await xr(async()=>await this.consentimento("eu").estado()==="ligado"?await this.controles.eu.agora():null);return{unidade:e,eu:t}}apagarPessoal(){return this.controles.eu.apagar()}parar(){this.parado=!0,this.controles.unidade.parar(),this.controles.eu.parar()}};function Yi(o){if(o.temArmazem&&!o.temArmazem())return null;let e;try{e=new Er({host:o.ctx.host,login:o.ctx.login,nomeUsuario:o.ctx.nome||o.ctx.login,unidade:o.unidade,area:o.area,sync:o.sync,repos:o.repos,armazem:o.armazem,travar:Xi,travarEsperando:Ki,atrasoEnvio:o.atrasoEnvio})}catch(a){return console.warn("[SEI Pro] projetos: a sincronia n\xE3o foi ligada:",a),null}let t=o.puxar??!0;if(e.iniciar({puxar:t}).catch(a=>console.warn("[SEI Pro] projetos: sincronia",a)),!t)return e;let r=()=>void e.puxar().catch(()=>{});return o.janela.addEventListener("focus",r),o.doc.addEventListener("visibilitychange",()=>{o.doc.visibilityState==="visible"&&r()}),e}function Ji(o){return o.querySelector("#frmProcedimentoControlar")?"caixa":o.querySelector("#topmenu")&&o.querySelector("#divArvore")?"arvore":null}var Wd=864e5,Zi=2e3;function wt(o,e){let t=typeof e=="string"?e.trim().slice(0,h.nome):"";if(!t)return null;let r=typeof o=="string"?o.trim().toLowerCase().slice(0,h.nome):"";return r?{login:r,nome:t}:{nome:t}}function Qi(o){let e=[];for(let t of o.querySelectorAll("a[href*='procedimento_atribuicao_listar']")){let r=(t.textContent??"").trim(),a=(t.getAttribute("title")??"").replace(/^Atribu\S*\s+para\s+/i,""),n=r?wt(r,a):null;n?.login&&e.push(n)}return e}function os(o){return o.flatMap(e=>e.etapas.flatMap(t=>t.responsavel?[t.responsavel]:[]))}function es(o){let e=o.flatMap(n=>wt(n.login,n.nome)??[]),t=new Set,r=new Set,a=[];for(let n of e.filter(i=>i.login))t.has(n.login)||(t.add(n.login),r.add(to(n.nome)),a.push(n));for(let n of e.filter(i=>!i.login)){let i=to(n.nome);r.has(i)||(r.add(i),a.push(n))}return a}function Wi(o,e){let t=es([o,...e]),r=wt(o.login,o.nome),a=r?t.findIndex(i=>r.login?i.login===r.login:to(i.nome)===to(r.nome)):-1;return[...a>=0?t.splice(a,1):[],...t.sort((i,s)=>i.nome.localeCompare(s.nome,"pt-BR"))]}var Zd=o=>Array.isArray(o)?o.slice(0,Zi).flatMap(e=>!e||typeof e!="object"?[]:wt(e.login,e.nome)??[]):[];async function ts(o){let e=(await o.area.obter(o.chave))[o.chave],t=e&&typeof e.quando=="number"?o.agora-e.quando:Number.NaN,r=t>=0&&t<Wd,a=Zd(e?.lista);if(r&&e?.completa===!0)return Wi(o.eu,[...a,...o.daCaixa,...o.usados]);let n=r||e?.completa===!0?a:[],i=!1;if(o.buscarCompleta)try{let d=await o.buscarCompleta();d?.length&&(n=d,i=!0)}catch{}let s=es([...n,...o.daCaixa]).slice(0,Zi),c=!i&&r&&typeof e?.quando=="number"?e.quando:o.agora;return await o.area.gravar({[o.chave]:{quando:c,completa:i,lista:s}}),Wi(o.eu,[...s,...o.usados])}var rs=window;if(!rs.__seiProProjetos){rs.__seiProProjetos=!0;let o=()=>{try{Xr(document)}catch(e){console.warn("[SEI Pro] projetos: textos internos",e)}Qd().catch(e=>console.warn("[SEI Pro] projetos:",e))};document.readyState==="loading"?document.addEventListener("DOMContentLoaded",o,{once:!0}):o()}async function Qd(){if(window!==window.top||!await Dr("gerenciarprojetos"))return;let o=Qn(document,{temaEscuro:jr(localStorage),corTema:Mr(document),atividades:qe(localStorage)},location.href);if(!o?.unidade)return;let e=o.unidade,t=Ji(document)==="caixa",r=Fe(chrome.storage.local,"local"),a=await Ar(r),n=()=>({agora:Date.now(),dispositivo:a,por:o.login,nome:o.nome}),i=st(o.host,o.login,e.id),s={unidade:new Ho(r,i.unidade,n),eu:new Ho(r,i.eu,n)},c=Yi({ctx:o,unidade:e,area:r,sync:Fe(chrome.storage.sync,"sync"),repos:s,armazem:l=>Jn(document,location.href,l,o.login),janela:window,doc:document,puxar:t,temArmazem:t?void 0:()=>Yn(document,location.href)}),d={ctx:o,unidade:e,area:r,repos:s,sincronia:c},p=t?op(d):Promise.resolve(null);p.catch(l=>console.warn("[SEI Pro] projetos: painel",l)),t&&ep(d,p),zi({doc:document,ctx:o,area:r,conectar:()=>chrome.runtime.connect({name:za}),tratadores:as(d,{iframe:null,focarNoPainel:Li({painel:p,area:r,chave:te(o),agora:()=>Date.now(),link:()=>Go(uo(document,location.href),"procedimento_controlar"),ir:l=>location.assign(l)})})})}async function op(o){let{ctx:e,area:t,repos:r}=o,a=await Jt(t),n=Hi(document,{urlApp:chrome.runtime.getURL("html/projetos.html#modo=embutido"),temaEscuro:e.temaEscuro,recolhido:a.recolhido,ordem:Fi(localStorage),aoRecolher:c=>void qa(t,{recolhido:c}).catch(()=>{})});if(!n)return null;let i=_r(n,()=>chrome.runtime.connect({name:Va}),as(o,{iframe:n.iframe,montado:n}));Bi(n,{temaEscuro:e.temaEscuro,repos:r,rpc:i.rpc,hoje:()=>co(),aoContar:ha(t)});let s={painel:n.painel,corpo:n.corpo,rpc:i.rpc};return _i(t,te(e),Date.now(),s).catch(()=>{}),s}function ep(o,e){let{ctx:t,unidade:r,repos:a}=o,n;e.then(d=>{n=d},()=>{n=null});let i=(d,p)=>{n?Ue(n,d,p):n===null?yr(o,d,p):e.then(l=>l?void Ue(l,d,p):yr(o,d,p),()=>yr(o,d,p))},s=vt(Fe(chrome.storage.sync,"sync"),t.host,t.login,r.id,"unidade");Mi({doc:document,repos:a,hoje:()=>co(),temaEscuro:t.temaEscuro,abrir:(d,p)=>void yi(d,p,{modo:"caixa",repos:a,hoje:()=>co(),sigla:r.sigla||"unidade",temaEscuro:t.temaEscuro,cssBase:Kr,consentimento:s,documentos:()=>[],abrirNoPainel:i}).catch(l=>console.warn("[SEI Pro] projetos: bal\xE3o da caixa",l))}).atualizar().catch(d=>console.warn("[SEI Pro] projetos: \xEDcones da caixa",d))}function yr(o,e,t){qi({area:o.area,chave:te(o.ctx),agora:Date.now(),abrir:()=>chrome.runtime.sendMessage({tipo:"abrirPainel",aba:"projetos"}),janela:()=>void window.open(chrome.runtime.getURL("html/painel.html#aba=projetos"),"seiProPainel","popup,width=420,height=760")},e,t).catch(()=>{})}function as(o,e){let{ctx:t,unidade:r,area:a,repos:n}=o,i=we(location.href);return Ri({doc:document,ctx:t,iframe:e.iframe,sobreposicao:e.montado?.sobreposicao,avisar:e.montado?Cr(document,t.temaEscuro,"spro-prj"):null,avisarAcoes:e.montado?Dt(document,t.temaEscuro,"spro-prj"):null,sincronia:o.sincronia,atividades:ai(t,localStorage,chrome.runtime.getManifest().version,(s,c)=>fetch(s,c)),focarNoPainel:e.focarNoPainel??null,usuarios:async()=>{let s=await nt(n,co()).catch(()=>null);return ts({area:a,chave:fa(t.host,r.id),agora:Date.now(),daCaixa:Qi(document),usados:s?os([...s.ativos,...s.arquivados]):[],eu:{login:t.login,nome:t.nome||t.login},buscarCompleta:null})},conferir:s=>Ii(c=>ro.de(uo(document,location.href),"#frmProtocoloPesquisaRapida",i).definir({txtPesquisaRapida:c}).enviar({aceitarValidacao:!0}),s)})}})();
