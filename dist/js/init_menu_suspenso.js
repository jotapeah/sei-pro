/* GERADO por menu-suspenso/build.mjs. NAO EDITE. Rode: npm run build */
"use strict";(()=>{function q(e,t){let a=e;if(typeof e=="string"){if(!e.trim())return;try{a=JSON.parse(e)}catch{return}}return!Array.isArray(a)||a.length===0?void 0:a.map(o=>o?.configGeral).find(Array.isArray)?.find(o=>o?.name===t)?.value}function v(e,t){let a=q(e,t);return a===!0||a===1||a==="1"}var U={novo:"#divInfraBarraSistemaPadraoE, #lnkInfraMenuSistema",antigo:"#divInfraBarraSistemaE, #lnkInfraMenuSistema"};function L(e){return e.getElementById("divInfraAreaTelaE")?e.querySelector("#divInfraSidebarMenu ul#infraMenu")?"novo":"antigo":null}var B=e=>e==="novo"?"divInfraBarraSistemaPadraoE":"divInfraBarraSistemaE",m=e=>e.getElementById("divInfraAreaTelaE"),b=e=>U[e],I=768,C=e=>(e.defaultView?.innerWidth??I)>=I,O="div.barraBotoesSEI",N=8;function T(e,t,a,r){return!e||t.left>=r||t.bottom<=a?0:Math.ceil(t.bottom-a+N)}var D="data-spro-menu-suspenso",M="data-spro-menu",y="seiSlim_hidemenu",A="--spro-menu-recuo",J="Abrir ou fechar o menu";function P(e){let t=e.documentElement,a=null,r=!1,o=!1,d=new Map;function E(){return a?[...e.querySelectorAll(b(a))]:[]}function p(){t.setAttribute(M,r?"aberto":"fechado");for(let n of E())n.setAttribute("aria-expanded",String(r))}function u(){let n=m(e),i=e.defaultView;if(!n)return;let s=0;if(a==="novo"&&i){let l=n.getBoundingClientRect();for(let f of e.querySelectorAll(O)){let k=i.getComputedStyle(f).position,z=f.getBoundingClientRect();s=Math.max(s,T(k==="fixed"||k==="sticky",z,l.top,l.width))}}s?n.style.setProperty(A,`${s}px`):n.style.removeProperty(A)}function h(){a&&(r=!0,p(),u(),e.defaultView?.addEventListener("scroll",u,!0),e.defaultView?.addEventListener("resize",u))}function c(){a&&(r=!1,p(),e.defaultView?.removeEventListener("scroll",u,!0),e.defaultView?.removeEventListener("resize",u))}function g(){r?c():h()}function w(n){let i=n.target;!i||typeof i.closest!="function"||!a||!C(e)||(i.closest(b(a))?(n.preventDefault(),n.stopImmediatePropagation(),g()):r&&!m(e)?.contains(i)&&c())}function x(n){n.key==="Escape"&&r&&!n.defaultPrevented&&c();let i=n.target;(n.key==="Enter"||n.key===" ")&&a&&i?.id===B(a)&&(n.preventDefault(),g())}function G(){if(a=L(e),!!a){t.setAttribute(D,a);for(let n of E()){let i=[],s=(l,f)=>{n.hasAttribute(l)||(n.setAttribute(l,f),i.push(l))};s("aria-controls","divInfraAreaTelaE"),n.id.startsWith("divInfraBarra")&&(s("role","button"),s("tabindex","0"),s("aria-label",J)),d.set(n,i)}a==="antigo"&&e.body&&!e.body.classList.contains(y)&&(e.body.classList.add(y),o=!0),e.addEventListener("click",w,!0),e.addEventListener("keydown",x),r=!1,p()}}function S(){e.defaultView?.removeEventListener("scroll",u,!0),e.defaultView?.removeEventListener("resize",u),m(e)?.style.removeProperty(A),e.removeEventListener("click",w,!0),e.removeEventListener("keydown",x);for(let[n,i]of d){n.removeAttribute("aria-expanded");for(let s of i)n.removeAttribute(s)}d.clear(),o&&e.body?.classList.remove(y),o=!1,t.removeAttribute(D),t.removeAttribute(M),a=null,r=!1}return{configurar(n){n!==(a!==null)&&(n?G():S())},abrir:h,fechar:c,alternar:g,aberto:()=>r,encerrar:S}}var R=`/* Tudo vale s\xF3 com o atributo que o content script p\xF5e no <html>: desligada, a p\xE1gina \xE9 a do SEI. */

/* Abaixo de 768px o SEI usa o menu de celular dele e nada daqui vale. */
@media (min-width: 768px) {
  /* \u2630 no bloco do logo (o SEI novo e o antigo trazem o bloco; o \xEDcone \xE9 desenhado aqui, sem fonte de \xEDcones). */
  :root[data-spro-menu-suspenso] :is(#divInfraBarraSistemaPadraoE, #divInfraBarraSistemaE) {
    cursor: pointer;
  }
  :root[data-spro-menu-suspenso] :is(#divInfraBarraSistemaPadraoE, #divInfraBarraSistemaE)::before {
    content: '';
    display: inline-block;
    flex: none;
    align-self: center;
    vertical-align: middle;
    width: 30px;
    height: 30px;
    margin-right: 12px;
    background: #fff;
    -webkit-mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M3 6h18M3 12h18M3 18h18' stroke='black' stroke-width='2.4' stroke-linecap='round'/%3E%3C/svg%3E") center / contain no-repeat;
    mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M3 6h18M3 12h18M3 18h18' stroke='black' stroke-width='2.4' stroke-linecap='round'/%3E%3C/svg%3E") center / contain no-repeat;
  }
  /* O bot\xE3o nativo de exibir/ocultar menu do SEI 5 (link redondo ao lado do logo) d\xE1 lugar ao \u2630: um s\xF3 bot\xE3o. */
  :root[data-spro-menu-suspenso] #divInfraMenuSistema {
    display: none;
  }

  /* SEI 4.1+ e 5: a coluna do menu sai do fluxo e o conte\xFAdo ocupa a largura toda. */
  :root[data-spro-menu-suspenso='novo'] #divInfraAreaTela {
    position: relative;
  }
  :root[data-spro-menu-suspenso='novo'] #divInfraAreaTelaE {
    position: absolute;
    /* Ajuste fino medido: o menu e a barra de a\xE7\xF5es fixa terminam alinhados \xE0 borda da barra superior. */
    top: 4px;
    bottom: 0;
    left: 0;
    z-index: 1030;
    width: min(320px, 85vw) !important;
    min-width: 0 !important;
    max-width: none !important;
    overflow-y: auto !important;
    padding-top: var(--spro-menu-recuo, 0);
    transform: translateX(-100%);
    visibility: hidden;
    transition: transform 0.18s ease, visibility 0s linear 0.18s;
  }
  :root[data-spro-menu-suspenso='novo'][data-spro-menu='aberto'] #divInfraAreaTelaE {
    transform: none;
    visibility: visible;
    box-shadow: 4px 0 18px rgba(0, 0, 0, 0.35);
    transition: transform 0.18s ease;
  }
  :root[data-spro-menu-suspenso='novo'] div.barraBotoesSEI.fixed {
    margin-top: -2px !important;
  }
  :root[data-spro-menu-suspenso='novo'] #divInfraAreaTelaD {
    display: block !important;
    width: auto !important;
    min-width: 0 !important;
    max-width: none !important;
    padding-left: 1rem !important;
  }
  @media (prefers-reduced-motion: reduce) {
    :root[data-spro-menu-suspenso='novo'] #divInfraAreaTelaE,
    :root[data-spro-menu-suspenso='novo'][data-spro-menu='aberto'] #divInfraAreaTelaE {
      transition: none;
    }
  }
}

/* SEI 3 e 4.0: a coluna flutuante vira camada, como o legado fazia. */
:root[data-spro-menu-suspenso='antigo'] #divInfraAreaTelaE {
  position: absolute;
  z-index: 99999;
  background: #fff;
  box-shadow: 3px 3px 5px 0 #8686868a;
}
:root[data-spro-menu-suspenso='antigo'][data-spro-menu='fechado'] #divInfraAreaTelaE {
  display: none;
}
:root[data-spro-menu-suspenso='antigo'] #divInfraAreaTelaD {
  width: 99%;
}
`;var V="menususpenso";function _(){if(!document.getElementById("divInfraAreaTelaE"))return;let e=document.createElement("style");e.textContent=R,document.head.append(e);let t=P(document),a=!1,r=(o,d)=>{d!=="sync"||!("dataValues"in o)||(a=!0,t.configurar(v(o.dataValues.newValue,V)))};chrome.storage.onChanged.addListener(r),chrome.storage.sync.get("dataValues").then(o=>{a||t.configurar(v(o.dataValues,V))}).catch(()=>{}),window.addEventListener("pagehide",o=>{o.persisted||(chrome.storage.onChanged.removeListener(r),t.encerrar(),e.remove())})}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",_,{once:!0}):_();})();
