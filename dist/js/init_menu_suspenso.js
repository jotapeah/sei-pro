/* GERADO por menu-suspenso/build.mjs. NAO EDITE. Rode: npm run build */
"use strict";(()=>{function z(e,a){let n=e;if(typeof e=="string"){if(!e.trim())return;try{n=JSON.parse(e)}catch{return}}return!Array.isArray(n)||n.length===0?void 0:n.map(i=>i?.configGeral).find(Array.isArray)?.find(i=>i?.name===a)?.value}function v(e,a){let n=z(e,a);return n===!0||n===1||n==="1"}var q={novo:"#divInfraBarraSistemaPadraoE, #lnkInfraMenuSistema",antigo:"#divInfraBarraSistemaE, #lnkInfraMenuSistema"};function k(e){return e.getElementById("divInfraAreaTelaE")?e.querySelector("#divInfraSidebarMenu ul#infraMenu")?"novo":"antigo":null}var S=e=>e==="novo"?"divInfraBarraSistemaPadraoE":"divInfraBarraSistemaE",f=e=>e.getElementById("divInfraAreaTelaE"),b=e=>q[e],L=768,B=e=>(e.defaultView?.innerWidth??L)>=L,C="#divBotoesControleProcessos",U=8;function T(e,a,n,r){return!e||a.left>=r||a.bottom<=n?0:Math.ceil(a.bottom-n+U)}var O="data-spro-menu-suspenso",P="data-spro-menu",y="seiSlim_hidemenu",A="--spro-menu-recuo",N="Abrir ou fechar o menu";function D(e){let a=e.documentElement,n=null,r=!1,i=!1,d=new Map;function h(){return n?[...e.querySelectorAll(b(n))]:[]}function m(){a.setAttribute(P,r?"aberto":"fechado");for(let t of h())t.setAttribute("aria-expanded",String(r))}function u(){let t=f(e),o=e.querySelector(C),s=e.defaultView;if(!t)return;let l=0;if(n==="novo"&&o&&s){let g=o.getBoundingClientRect(),G=s.getComputedStyle(o).position==="fixed";l=T(G,g,t.getBoundingClientRect().top,t.getBoundingClientRect().width)}l?t.style.setProperty(A,`${l}px`):t.style.removeProperty(A)}function E(){n&&(r=!0,m(),u(),e.defaultView?.addEventListener("scroll",u,!0),e.defaultView?.addEventListener("resize",u))}function c(){n&&(r=!1,m(),e.defaultView?.removeEventListener("scroll",u,!0),e.defaultView?.removeEventListener("resize",u))}function p(){r?c():E()}function w(t){let o=t.target;!o||typeof o.closest!="function"||!n||!B(e)||(o.closest(b(n))?(t.preventDefault(),t.stopImmediatePropagation(),p()):r&&!f(e)?.contains(o)&&c())}function x(t){t.key==="Escape"&&r&&!t.defaultPrevented&&c();let o=t.target;(t.key==="Enter"||t.key===" ")&&n&&o?.id===S(n)&&(t.preventDefault(),p())}function _(){if(n=k(e),!!n){a.setAttribute(O,n);for(let t of h()){let o=[],s=(l,g)=>{t.hasAttribute(l)||(t.setAttribute(l,g),o.push(l))};s("aria-controls","divInfraAreaTelaE"),t.id.startsWith("divInfraBarra")&&(s("role","button"),s("tabindex","0"),s("aria-label",N)),d.set(t,o)}n==="antigo"&&e.body&&!e.body.classList.contains(y)&&(e.body.classList.add(y),i=!0),e.addEventListener("click",w,!0),e.addEventListener("keydown",x),r=!1,m()}}function I(){e.defaultView?.removeEventListener("scroll",u,!0),e.defaultView?.removeEventListener("resize",u),f(e)?.style.removeProperty(A),e.removeEventListener("click",w,!0),e.removeEventListener("keydown",x);for(let[t,o]of d){t.removeAttribute("aria-expanded");for(let s of o)t.removeAttribute(s)}d.clear(),i&&e.body?.classList.remove(y),i=!1,a.removeAttribute(O),a.removeAttribute(P),n=null,r=!1}return{configurar(t){t!==(n!==null)&&(t?_():I())},abrir:E,fechar:c,alternar:p,aberto:()=>r,encerrar:I}}var M=`/* Tudo vale s\xF3 com o atributo que o content script p\xF5e no <html>: desligada, a p\xE1gina \xE9 a do SEI. */

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
    top: 0;
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
`;var R="menususpenso";function V(){if(!document.getElementById("divInfraAreaTelaE"))return;let e=document.createElement("style");e.textContent=M,document.head.append(e);let a=D(document),n=!1,r=(i,d)=>{d!=="sync"||!("dataValues"in i)||(n=!0,a.configurar(v(i.dataValues.newValue,R)))};chrome.storage.onChanged.addListener(r),chrome.storage.sync.get("dataValues").then(i=>{n||a.configurar(v(i.dataValues,R))}).catch(()=>{}),window.addEventListener("pagehide",i=>{i.persisted||(chrome.storage.onChanged.removeListener(r),a.encerrar(),e.remove())})}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",V,{once:!0}):V();})();
