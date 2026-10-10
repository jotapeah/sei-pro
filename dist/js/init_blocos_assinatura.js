/* GERADO por blocos-assinatura/build.mjs. NAO EDITE. Rode: npm run build */
"use strict";(()=>{var u=class extends Error{codigo;detalhe;constructor(o,r,t){super(r),this.name="ErroSei",this.codigo=o,this.detalhe=t}paraJSON(){return{codigo:this.codigo,mensagem:this.message,detalhe:this.detalhe}}};function Z(e){if(e instanceof u)return e;if(e instanceof DOMException&&e.name==="AbortError")return new u("CANCELADO","Opera\xE7\xE3o cancelada.");let o=e instanceof Error?e.message:String(e);return new u("SEI_REDE",`Falha ao falar com o SEI: ${o}`)}var Fo={AElig:198,Aacute:193,Acirc:194,Agrave:192,Aring:197,Atilde:195,Auml:196,Ccedil:199,ETH:208,Eacute:201,Ecirc:202,Egrave:200,Euml:203,Iacute:205,Icirc:206,Igrave:204,Iuml:207,Ntilde:209,Oacute:211,Ocirc:212,Ograve:210,Oslash:216,Otilde:213,Ouml:214,THORN:222,Uacute:218,Ucirc:219,Ugrave:217,Uuml:220,Yacute:221,aacute:225,acirc:226,acute:180,aelig:230,agrave:224,amp:38,apos:39,aring:229,atilde:227,auml:228,brvbar:166,bull:8226,ccedil:231,cedil:184,cent:162,copy:169,curren:164,deg:176,divide:247,eacute:233,ecirc:234,egrave:232,eth:240,euml:235,euro:8364,frac12:189,frac14:188,frac34:190,gt:62,hellip:8230,iacute:237,icirc:238,iexcl:161,igrave:236,iquest:191,iuml:239,laquo:171,ldquo:8220,lsquo:8216,lt:60,macr:175,mdash:8212,micro:181,middot:183,nbsp:160,ndash:8211,not:172,ntilde:241,oacute:243,ocirc:244,ograve:242,ordf:170,ordm:186,oslash:248,otilde:245,ouml:246,para:182,plusmn:177,pound:163,quot:34,raquo:187,rdquo:8221,reg:174,rsquo:8217,sect:167,shy:173,sup1:185,sup2:178,sup3:179,szlig:223,thorn:254,times:215,trade:8482,uacute:250,ucirc:251,ugrave:249,uml:168,uuml:252,yacute:253,yen:165,yuml:255};function S(e){return e.includes("&")?e.replace(/&(#x[0-9a-fA-F]+|#\d+|[a-zA-Z][a-zA-Z0-9]*);/g,(o,r)=>{let t=r[0]==="#"?r[1]==="x"||r[1]==="X"?parseInt(r.slice(2),16):parseInt(r.slice(1),10):Fo[r];return t===void 0||Number.isNaN(t)?o:String.fromCodePoint(t)}):e}var lo={128:8364,130:8218,131:402,132:8222,133:8230,134:8224,135:8225,136:710,137:8240,138:352,139:8249,140:338,142:381,145:8216,146:8217,147:8220,148:8221,149:8226,150:8211,151:8212,152:732,153:8482,154:353,155:8250,156:339,158:382,159:376};var uo=null;function G(e){return uo?uo(e):new DOMParser().parseFromString(e,"text/html")}function h(e){return(e?.textContent??"").replace(/\s+/g," ").trim()}var Go={n:`
`,r:"\r",t:"	",b:"\b",f:"\f",v:"\v",0:"\0"};function Y(e,o){let r=e[o],t="";for(o+=1;o<e.length;){let n=e[o];if(n==="\\"){let a=e[o+1];if(a==="u"&&/^[0-9a-fA-F]{4}$/.test(e.slice(o+2,o+6))){t+=String.fromCharCode(parseInt(e.slice(o+2,o+6),16)),o+=6;continue}t+=Go[a]??a,o+=2;continue}if(n===r)return[t,o+1];t+=n,o+=1}return[t,o]}function J(e,o){let r=[],t=o;for(;t<e.length;){let n=e[t];if(n===")")return[r,t+1];if(n===","||/\s/.test(n)){t+=1;continue}if(n==='"'||n==="'"){let[s,c]=Y(e,t);r.push(s),t=c;continue}let a=/^(null|true|false|-?\d+(?:\.\d+)?)/.exec(e.slice(t,t+32));if(a){let s=a[1];r.push(s==="null"?null:s==="true"?!0:s==="false"?!1:Number(s)),t+=s.length;continue}let i=0;for(;t<e.length;){let s=e[t];if(s==="(")i+=1;else if(s===")"){if(i===0)break;i-=1}else if(s===","&&i===0)break;t+=1}r.push(null)}return[r,t]}function b(e){return typeof e=="string"?S(e):e==null?"":String(e)}var Xo=/controlador(?:_ajax)?\.php\?acao=[^"'\s<>\\]*?infra_hash=[0-9a-f]{64,192}/g;function N(e){let o=new Set;for(let r of e.replace(/&amp;/g,"&").matchAll(Xo))o.add(r[0]);return[...o]}function y(e){let o=e.indexOf("?");return new URLSearchParams(o>=0?e.slice(o+1):"")}function H(e,o,r={}){let t=Array.isArray(e)?e:N(e);for(let n of t){let a=y(n),i=a.get("acao")??"";if(!(typeof o=="string"?i!==o:!o.test(i))&&Object.entries(r).every(([s,c])=>a.get(s)===c))return n}return null}function po(e,o){let r=[...e.doc.querySelectorAll("#infraMenu a[href], #main-menu a[href], .infraMenu a[href]")].map(i=>i.getAttribute("href")??"").join(`
`),t=N(r).filter(i=>y(i).get("acao")===o),a=(t.length?t:N(e.html).filter(i=>y(i).get("acao")===o)).sort((i,s)=>[...y(i).keys()].length-[...y(s).keys()].length)[0];if(!a)throw new u("SEI_ACAO_INDISPONIVEL",`O menu do SEI n\xE3o oferece "${o}" para este usu\xE1rio.`);return a}function Ko(e){let o=new Map;for(let r of e.matchAll(/Nos\[(\d+)\]\s*=\s*new\s+infraArvoreNo\(/g)){let[t]=J(e,r.index+r[0].length);o.set(Number(r[1]),{indice:Number(r[1]),args:t,props:{}})}for(let r of e.matchAll(/Nos\[(\d+)\]\.(\w+)\s*=\s*(['"])/g)){let t=o.get(Number(r[1]));if(!t)continue;let[n]=Y(e,r.index+r[0].length-1);t.props[r[2]]=n}return[...o.values()].sort((r,t)=>r.indice-t.indice)}function Zo(e){let o=[];for(let r of e.matchAll(/new\s+infraArvoreAcao\(/g)){let[t]=J(e,r.index+r[0].length);o.push({tipo:b(t[0]),idPai:b(t[2]),href:b(t[3]),titulo:b(t[5]),icone:b(t[6]),extra:t[8]==null?void 0:b(t[8])})}return o}function mo(e,o){let r=e.find(i=>i.tipo==="NIVEL_ACESSO"&&i.idPai===o);if(!r)return{nivel:"publico"};let[t,...n]=r.titulo.split(`
`);return{nivel:/sigilos/i.test(t)||/sigiloso/.test(r.icone)?"sigiloso":"restrito",hipotese:n.join(" ").trim()||void 0}}function fo(e){return[...new Set([...e.matchAll(/<img[^>]*\btitle="([^"]+)"/g)].map(o=>b(o[1])))]}var Yo=/\s*\(\d{5,}\)\s*$/;function Jo(e){let o=e.html,r=Ko(o),t=Zo(o),n=r.find(c=>c.args[0]==="PROCESSO");if(!n)throw new u("SEI_VERSAO_NAO_SUPORTADA","A \xE1rvore do processo n\xE3o tem o n\xF3 do processo.");let a=b(n.args[1]),i=mo(t,a),s=r.filter(c=>c.args[0]==="DOCUMENTO").map(c=>{let l=b(c.args[1]),p=b(c.args[5]),d=b(c.args[7]),m=(c.props.src??"").replace(/&amp;/g,"&"),f=t.find(A=>A.tipo==="ASSINATURA"&&A.idPai===l),{nivel:x,hipotese:v}=mo(t,l),L=(/documento_([a-z0-9]+)\.svg/.exec(d)?.[1]??"interno").replace("cancelado","interno");return{id:l,numero:b(c.args[15])||(/\((\d{5,})\)\s*$/.exec(p)?.[1]??""),titulo:p.replace(Yo,""),pasta:c.args[2]&&String(c.args[2]).startsWith("PASTA")?String(c.args[2]):null,externo:/documento_download_anexo/.test(m)||!/documento_interno|documento_cancelado|formulario|email/.test(d),formato:L,nivel:x,hipotese:v,assinado:!!f,assinaturas:f?f.titulo.split(`
`).slice(1).filter(Boolean):[],cancelado:/documento_cancelado/.test(d),unidadeGeradora:t.find(A=>A.tipo==="UNIDADE_GERADORA"&&A.idPai===l)?.extra,link:b(c.args[3]).replace(/&amp;/g,"&"),src:m,acoes:N(c.props.acoes??""),botoes:fo(c.props.acoes??"")}});return{idProcedimento:a,protocolo:b(n.args[5])||b(n.args[15]),tipo:b(n.args[6]),nivel:i.nivel,hipotese:i.hipotese,marcadores:t.filter(c=>c.tipo==="MARCADOR"&&c.idPai===a).map(c=>c.titulo.replace(/^Marcador\n/,"").replace(/\n/g," \u2014 ")),documentos:s,acoesProcesso:N(n.props.acoes??""),botoesProcesso:fo(n.props.acoes??""),linkProcesso:b(n.args[3]).replace(/&amp;/g,"&"),sinais:t.filter(c=>c.idPai===a),links:N(o),pagina:e}}async function go(e,o,r){let t=await e.obter(o,r);if(!/acao=procedimento_visualizar/.test(t.url)){let n=t.doc.querySelector("#ifrArvore")?.getAttribute("src");if(!n)throw new u("SEI_NAO_ENCONTRADO","N\xE3o foi poss\xEDvel abrir a \xE1rvore do processo.");t=await e.obter(n,r)}if(/infraArvoreNo\("PASTA"/.test(t.html)){let n=H(t.html,"procedimento_visualizar")&&N(t.html).find(a=>/abrir_pastas=1/.test(a));n&&(t=await e.obter(n,r))}return Jo(t)}var Eo="\xA5",W="\xB1";function ho(e){return e.map(o=>`${o.id}${W}${o.texto}`).join(Eo)}function Wo(e){return e?e.split(Eo).map(o=>{let[r,...t]=o.split(W);return{id:r,texto:t.join(W)}}):[]}function bo(e){let o=[];for(let r of e.matchAll(/new\s+infraLupaSelect\(\s*['"]([\w-]+)['"]\s*,\s*['"]([\w-]+)['"]/g))o.push([r[1],r[2]]);return o}var E=class e{constructor(o,r,t){this.http=o;this.pagina=r;this.elemento=t,this.id=t.id,this.action=(t.getAttribute("action")??"").replace(/&amp;/g,"&"),this.campos=Qo(t),this.sincronizarLupas()}id;action;campos;elemento;static async abrir(o,r,t,n){let a=await o.obter(r,n);return e.de(a,t,o)}static de(o,r,t=null){let n=o.doc.querySelector(r);if(!n)throw new u("SEI_VERSAO_NAO_SUPORTADA",`A tela do SEI n\xE3o tem o formul\xE1rio esperado (${r}).`,h(o.doc.querySelector("title")));return new e(t,o,n)}pares(){return this.campos.map(o=>[o.nome,o.valor])}valor(o){return this.campos.find(r=>r.nome===o)?.valor}tem(o){return this.elemento.querySelector(`[name="${o}"]`)!==null||this.campos.some(r=>r.nome===o)}opcoes(o){let r=this.elemento.querySelector(`select[name="${o}"], select#${vo(o)}`);return r?[...r.querySelectorAll("option")].map(t=>({valor:t.getAttribute("value")??h(t),texto:h(t),selecionada:t.hasAttribute("selected")})):[]}definir(o){for(let[r,t]of Object.entries(o)){if(t===void 0)continue;if(t===null){this.campos=this.campos.filter(a=>a.nome!==r);continue}let n=this.campos.find(a=>a.nome===r);n?n.valor=t:this.campos.push({nome:r,valor:t})}return this}escolher(o,r){let t=this.opcoes(o),n=T(r),a=t.find(i=>i.valor===r)??t.find(i=>T(i.texto)===n)??xo(t.filter(i=>T(i.texto).includes(n)));if(!a)throw new u("ARGUMENTO_INVALIDO",`"${r}" n\xE3o \xE9 uma op\xE7\xE3o de ${o}.`,t.slice(0,40).map(i=>i.texto).join(" | "));return this.definir({[o]:a.valor}),a}linhas(o){return[...this.elemento.querySelectorAll(`${o} tr`)].filter(r=>r.querySelector("input[type=checkbox]"))}itensLupa(o){let r=this.hiddenDaLupa(o);return r?Wo(this.valor(r)??""):[]}definirLupa(o,r){let t=this.hiddenDaLupa(o);if(!t)throw new u("SEI_VERSAO_NAO_SUPORTADA",`A lupa ${o} n\xE3o existe nesta tela.`);return this.definir({[t]:ho(r)}),this.campos=this.campos.filter(n=>n.nome!==o&&n.nome!==`${o}[]`),this}async enviar(o={}){if(!this.http)throw new u("SEI_RESPOSTA_INESPERADA","Formul\xE1rio sem transporte HTTP.");if(!this.action)throw new u("SEI_VERSAO_NAO_SUPORTADA",`O formul\xE1rio ${this.id} n\xE3o tem action.`);let r=this.pares();o.botao&&r.push(this.botaoDeEnvio(o.botao));let t=await this.http.enviar(this.action,r,o);if(o.sucesso&&!o.sucesso(t))throw new u("SEI_RESPOSTA_INESPERADA",`O SEI n\xE3o confirmou ${o.operacao??"a opera\xE7\xE3o"}.`,`${h(t.doc.querySelector("title"))} \u2014 ${t.url.replace(/infra_hash=\w+/,"infra_hash=\u2026")}`);return t}botaoDeEnvio(o){let r=this.elemento.querySelector(`[name="${o}"]`)??xo([...this.elemento.querySelectorAll('button[type="submit"][name^="sbm"], input[type="submit"][name^="sbm"]')]);return r?[r.getAttribute("name")??o,r.getAttribute("value")??h(r)??o]:[o,o]}hiddenDaLupa(o){let r=bo(this.pagina.html).find(([t])=>t===o);return r?r[1]:null}sincronizarLupas(){for(let[o,r]of bo(this.pagina.html)){let t=this.elemento.querySelector(`select#${vo(o)}`);if(!t)continue;let n=[...t.querySelectorAll("option")].map(a=>({id:a.getAttribute("value")??"",texto:h(a)}));(this.valor(r)??"")||this.definir({[r]:ho(n)}),this.campos=this.campos.filter(a=>a.nome!==o&&a.nome!==`${o}[]`)}}};function Qo(e){let o=[];for(let r of e.querySelectorAll("input, select, textarea")){let t=r.getAttribute("name");if(!t||r.hasAttribute("disabled"))continue;let n=r.tagName.toLowerCase();if(n==="input"){let a=(r.getAttribute("type")??"text").toLowerCase();if(["submit","button","image","reset","file"].includes(a)||(a==="checkbox"||a==="radio")&&!r.hasAttribute("checked"))continue;o.push({nome:t,valor:r.getAttribute("value")??(a==="checkbox"||a==="radio"?"on":"")})}else if(n==="textarea")o.push({nome:t,valor:r.textContent??""});else{let a=[...r.querySelectorAll("option")],i=a.filter(l=>l.hasAttribute("selected")),s=r.hasAttribute("multiple"),c=i.length?i:!s&&a.length?[a[0]]:[];for(let l of c)o.push({nome:t,valor:l.getAttribute("value")??h(l)})}}return o}function T(e){return e.normalize("NFD").replace(/[\u0300-\u036F]/g,"").toLowerCase().replace(/\s+/g," ").trim()}function xo(e){return e.length===1?e[0]:void 0}function vo(e){return e.replace(/([^\w-])/g,"\\$1")}var oe={"\u2010":"-","\u2011":"-","\u2012":"-","\u2013":"-","\u2014":"-","\u2015":"-","\u2212":"-","\u2018":"'","\u2019":"'","\u201A":"'","\u201B":"'","\u2032":"'","\u201C":'"',"\u201D":'"',"\u201E":'"',"\u201F":'"',"\u2033":'"',"\u2026":"...","\u2022":"-","\u2002":" ","\u2003":" ","\u2009":" ","\u202F":" ","\u205F":" ","\u200B":"","\u200C":"","\u200D":"","\u2060":"","\uFEFF":"","\u20AC":"EUR","\u2122":"(TM)","\u2192":"->","\u2190":"<-"};function Ao(e,o="texto"){let r="";for(let t of e){let n=t.codePointAt(0);if(n<=255){r+=t;continue}let a=oe[t];if(o==="html"){r+=a===""?"":`&#${n};`;continue}if(a!==void 0){r+=a;continue}let i=t.normalize("NFKD").replace(/[\u0300-\u036F]/g,"");r+=[...i].every(s=>s.codePointAt(0)<=255)?i:""}return r}var ee=/[A-Za-z0-9\-_.*]/;function wo(e){let o="";for(let r of e)r===" "?o+="+":ee.test(r)?o+=r:o+="%"+r.charCodeAt(0).toString(16).toUpperCase().padStart(2,"0");return o}function So(e,o={}){return e.map(([r,t])=>{let n=o[r]??"texto";return`${wo(Ao(r))}=${wo(Ao(t??"",n))}`}).join("&")}function Q(e){let o=e instanceof Uint8Array?e:new Uint8Array(e),r=[],t=16384;for(let n=0;n<o.length;n+=t){let a=o.subarray(n,n+t),i=new Array(a.length);for(let s=0;s<a.length;s+=1)i[s]=lo[a[s]]??a[s];r.push(String.fromCharCode(...i))}return r.join("")}var yo="application/x-www-form-urlencoded; charset=ISO-8859-1";function Io(e,o,r){let t=null;return{url:e,status:o,html:r,get doc(){return t??=G(r)}}}function Oo(e,o={}){if(/\/login\.php/i.test(e.url)||/[?&]acao=(?:infra_)?sair\b/.test(e.url))throw new u("SEI_SESSAO_EXPIRADA","A sess\xE3o do SEI foi encerrada. Fa\xE7a login de novo no SEI e repita o pedido.");if(e.status>=500)throw new u("SEI_EXCECAO",`O SEI respondeu com erro ${e.status}.`);if(e.html.includes('id="divInfraExcecao"')){let r=e.doc.querySelector("#divInfraExcecao");if(r){let t=h(r);throw new u("SEI_EXCECAO",t||"O SEI exibiu uma p\xE1gina de erro.",t)}}if(!o.aceitarValidacao&&e.html.includes("txaInfraValidacao")){let r=e.doc.querySelector("#txaInfraValidacao")?.textContent?.trim()??"";if(r)throw new u("SEI_VALIDACAO",r,r)}return e}function _o(e,o={}){let r=new URL(".",e),t=o.fetch??((...d)=>fetch(...d)),n=Math.max(1,o.concorrencia??3),a=0,i=[];async function s(d){a>=n&&await new Promise(m=>i.push(m)),a+=1;try{return await d()}finally{a-=1,i.shift()?.()}}let c=d=>new URL(d.replace(/&amp;/g,"&"),r).href;async function l(d,m,f){return s(async()=>{try{let x=await t(c(d),{credentials:"same-origin",redirect:"follow",...m,signal:f.sinal}),v=Q(await x.arrayBuffer());return Oo(Io(x.url||c(d),x.status,v),f)}catch(x){throw Z(x)}})}async function p(d,m={}){return s(async()=>{try{let f=await t(c(d),{credentials:"same-origin",redirect:"follow",signal:m.sinal}),x=new Uint8Array(await f.arrayBuffer()),v=(f.headers?.get("content-type")??"").split(";")[0].trim().toLowerCase();v==="text/html"&&Oo(Io(f.url||c(d),f.status,Q(x)),m);let L=f.headers?.get("content-disposition")??"",A=decodeURIComponent(/filename\*=UTF-8''([^;]+)/i.exec(L)?.[1]??/filename="?([^";]+)"?/i.exec(L)?.[1]??"");return{bytes:x,tipo:v,nome:A}}catch(f){throw Z(f)}})}return{base:r,absoluta:c,baixar:p,obter:(d,m={})=>l(d,{method:"GET"},m),enviar:(d,m,f={})=>l(d,{method:"POST",headers:{"Content-Type":yo},body:So(m,f.modos)},f)}}function re(e){let o=/Sistema Eletr(?:\u00F4|&ocirc;|\\u00F4)nico de Informa[^"]*?Vers(?:\u00E3|&atilde;)o\s*([\d.]+)/i.exec(e);return o?o[1]:/\.(?:js|svg|css)\?(\d+\.\d+\.\d+)-/.exec(e)?.[1]??""}function te(e){let o=e.doc.querySelector("#lnkInfraUnidade")?.getAttribute("onclick")??"",r=/infra_unidade_atual=(\d+)/.exec(o)?.[1];if(r)return r;let t=/[?&]infra_unidade_atual=(\d+)/.exec(e.url)?.[1];return t||(e.doc.querySelector("#selInfraUnidades option[selected]")?.getAttribute("value")??"")}function ae(e){let o=e.doc,r=o.querySelector("#lnkInfraUnidade"),t=o.querySelector("#lnkUsuarioSistema")?.getAttribute("title")??"",[,n="",a="",i=""]=/^(.*?)\s*\(([^/)]+)(?:\/([^)]+))?/.exec(t)??[],s=re(e.html);return{host:new URL(e.url).host,versao:s,maior:Number(s.split(".")[0])||0,unidade:{id:te(e),sigla:h(r)||h(o.querySelector("#selInfraUnidades option[selected]")),nome:r?.getAttribute("title")??""},usuario:{nome:n.trim(),login:a.trim(),orgao:i.trim()}}}var ne=3e4,X=class{constructor(o,r=null,t){this.paginaViva=r;this.http=_o(o,t)}http;paginaBase=null;arvores=new Map;localizados=new Map;base(){let o=this.paginaViva?.();if(o&&o.html.includes("frmProtocoloPesquisaRapida"))return o;if(this.paginaBase)return this.paginaBase;if(o)return o;throw new u("SEI_NAO_ENCONTRADO","Abra uma tela do SEI (por exemplo, Controle de Processos) nesta aba.")}contexto(){return ae(this.base())}linkMenu(o){return po(this.base(),o)}async renovarBase(o){return this.paginaBase=await this.http.obter(this.linkMenu("procedimento_controlar"),o),this.arvores.clear(),this.localizados.clear(),this.paginaBase}async localizar(o,r){let t=o.trim();if(!t)throw new u("ARGUMENTO_INVALIDO","Informe o n\xFAmero do processo ou o n\xBA SEI do documento.");let n=this.localizados.get(t);if(n)return n;let a=E.de(this.base(),"#frmProtocoloPesquisaRapida",this.http);a.definir({txtPesquisaRapida:t});let i=await a.enviar(r),s=y(i.url);if(s.get("acao")!=="procedimento_trabalhar")throw new u("SEI_NAO_ENCONTRADO",`Nada encontrado no SEI para "${t}", ou voc\xEA n\xE3o tem acesso a ele.`);let c=i.doc.querySelector("#ifrArvore")?.getAttribute("src");if(!c)throw new u("SEI_VERSAO_NAO_SUPORTADA","A tela do processo n\xE3o trouxe a \xE1rvore.");let p=y(S(c)).get("id_procedimento")??"",d=s.get("id_protocolo")??"",m={idProcedimento:p,idDocumento:d&&d!==p?d:void 0,linkArvore:S(c)};return this.localizados.set(t,m),m}async arvore(o,r={}){let t=await this.localizar(o,r),n=this.arvores.get(t.idProcedimento);if(n&&!r.forcar&&Date.now()-n.quando<ne)return n.arvore;let a=await go(this.http,t.linkArvore,r);return this.arvores.set(t.idProcedimento,{quando:Date.now(),arvore:a}),a}invalidar(o){o?this.arvores.delete(o):this.arvores.clear()}async ajax(o,r,t){let n=await this.http.enviar(o,r,{...t,aceitarValidacao:!0}),a=[];for(let i of n.html.matchAll(/<option[^>]*value="([^"]*)"[^>]*>([^<]*)<\/option>/g))a.push({id:S(i[1]),texto:S(i[2]).trim()});for(let i of n.html.matchAll(/<item\s+([^>]*)>/g)){let s=G(`<i ${i[1]}></i>`).querySelector("i");a.push({id:s?.getAttribute("id")??"",texto:s?.getAttribute("descricao")??s?.getAttribute("complemento")??""})}return a.filter(i=>i.id&&i.id!=="null")}};function Do(e,o=e.location?.href??"https://sei.invalido/sei/controlador.php"){return{url:o,status:200,get html(){return e.documentElement.outerHTML},doc:e}}function oo(){try{return window.top?.document??document}catch{return document}}function ie(e,o){let r=e;if(typeof e=="string"){if(!e.trim())return;try{r=JSON.parse(e)}catch{return}}return!Array.isArray(r)||r.length===0?void 0:r.map(n=>n?.configGeral).find(Array.isArray)?.find(n=>n?.name===o)?.value}function eo(e,o){let r=ie(e,o);return!(r===!1||r===0||r==="")}var ce={assinatura:"bloco_assinatura_listar",interno:"bloco_interno_listar"},le=e=>e.split(/[\n;/]|\s{2,}/).map(o=>o.trim()).filter(Boolean);function K(e){let o={};return[...([...e?.querySelectorAll("tr")??[]].find(t=>t.querySelector("th"))??e?.querySelector("tr"))?.querySelectorAll("th, td")??[]].forEach((t,n)=>{let a=T(h(t)).replace(/[^a-z0-9 ]/g,"").trim();a&&(o[a]=n)}),o}function de(e,o){let r=e.doc.querySelector("#tblBlocos"),t=K(r),n=[];for(let a of r?.querySelectorAll("tr")??[]){let s=a.querySelector("input[type=checkbox]")?.getAttribute("value")??"";if(!s)continue;let c=[...a.querySelectorAll("td")],l=d=>t[d]===void 0?"":h(c[t[d]]).replace(/\s+/g," ").trim(),p=[...a.querySelectorAll("a")].map(d=>d.getAttribute("href")??"").find(d=>d.includes("rel_bloco_protocolo_listar"));n.push({numero:s,tipo:o,estado:l("estado"),descricao:l("descricao"),geradora:l("geradora"),disponibilizado:le(l("disponibilizacao")),grupo:l("grupo"),atribuido:l("atribuicao"),link:(p??"").replace(/&amp;/g,"&")})}return n}async function ue(e,o,r){let t=await e.http.obter(e.linkMenu(ce[o]),{sinal:r,aceitarValidacao:!0});return{pagina:t,blocos:de(t,o)}}function ro(e){let o=[...e.doc.querySelector("#frmBlocoLista")?.querySelectorAll("table")??[]].find(n=>{let a=K(n);return(a.estado??a.situacao)!==void 0&&a.descricao!==void 0&&(a.numero??a.n)!==void 0});if(!o)throw new u("SEI_VERSAO_NAO_SUPORTADA","A listagem de blocos de assinatura n\xE3o foi reconhecida.");let r=K(o),t=[];for(let n of o.querySelectorAll("tr")){let a=[...n.querySelectorAll("td")];if(T(h(a[r.estado??r.situacao]))!=="disponibilizado")continue;let i=[...n.querySelectorAll("[onclick]")].map(l=>/\bacaoCancelarDisponibilizacao\(\s*['"]([^'"]+)['"]\s*\)/.exec(l.getAttribute("onclick")??"")?.[1]).find(Boolean);if(!i)continue;let s=n.querySelector('input[type="checkbox"]')?.getAttribute("value");if(s&&s!==i)continue;let c=r.numero??r.n;t.push({id:i,numero:h(a[c])||i,descricao:h(a[r.descricao])})}return t}async function Mo(e,o={}){return No(e,o,async r=>[...new Map(r.flatMap(ro).map(t=>[t.id,t])).values()])}async function No(e,o,r){let{pagina:t}=await ue(e,"assinatura",o.sinal),n=E.de(t,"#frmBlocoLista",e.http),a={},i=t.doc.querySelector("#chkSinEstadoDisponibilizado");i&&!i.hasAttribute("checked")&&(a.chkSinEstadoDisponibilizado="on");for(let l of t.doc.querySelectorAll("#frmBlocoLista input[name], #frmBlocoLista select[name], #frmBlocoLista textarea[name]")){let p=K(l.closest("table"));if(!((p.estado??p.situacao)!==void 0&&p.descricao!==void 0&&(p.numero??p.n)!==void 0)){if(/^(txt|txa)/.test(l.name)&&l.getAttribute("type")!=="hidden"&&n.valor(l.name))a[l.name]="";else if(/^sel(?!Infra)/.test(l.name)&&l.tagName.toLowerCase()==="select"){let d=n.opcoes(l.name).find(m=>m.valor===""||/^(todos?|todas?|selecione)(\b|$)/.test(T(m.texto)));d&&n.valor(l.name)!==d.valor&&(a[l.name]=d.valor)}}}n.tem("hdnInfraPaginaAtual")&&n.valor("hdnInfraPaginaAtual")!=="0"&&(a.hdnInfraPaginaAtual="0");let s=!1,c=async(l,p,d=!1)=>(s=!0,E.de(l,"#frmBlocoLista",e.http).definir({...p,hdnInfraItemId:"",hdnInfraItensSelecionados:""}).enviar({sinal:o.sinal,...d?{botao:"sbmPesquisar"}:{},aceitarValidacao:!0}));try{let l=Object.keys(a).length?await c(t,a,!0):t,p=[];for(let d=0;ro(l),p.push(l),!!/infraAcaoPaginar\(\s*['"]\+['"]/.test(l.html);d++){if(d>=199||!E.de(l,"#frmBlocoLista").tem("hdnInfraPaginaAtual"))throw new u("SEI_VERSAO_NAO_SUPORTADA","N\xE3o foi poss\xEDvel consultar todas as p\xE1ginas de blocos.");l=await c(l,{hdnInfraPaginaAtual:String(d+1)})}return await r(p)}finally{if(s)try{await E.de(t,"#frmBlocoLista",e.http).definir({hdnInfraItemId:"",hdnInfraItensSelecionados:""}).enviar({botao:"sbmPesquisar",aceitarValidacao:!0})}catch{let l="N\xE3o foi poss\xEDvel restaurar os filtros da listagem de blocos. Confira-os na tela de Blocos de Assinatura.";try{o.aoAviso?.(l)}catch{}}}}async function Lo(e,o,r,t={}){let n=new URL(e.http.absoluta(r));if(n.origin!==e.http.base.origin||n.searchParams.get("acao")!=="bloco_escolher"||!n.searchParams.get("infra_hash"))throw new u("ARGUMENTO_INVALIDO","A tela de inclus\xE3o deve pertencer \xE0 sess\xE3o atual do SEI.");return No(e,t,async a=>{let i=a.find(l=>ro(l).some(p=>p.id===o));if(!i)throw new u("SEI_ACAO_INDISPONIVEL","O SEI n\xE3o oferece cancelar a disponibiliza\xE7\xE3o deste bloco nesta unidade.");await me(e,i,o,"cancelar",t);let c=[...(await e.http.obter(n.href,t)).doc.querySelectorAll("#frmBlocoEscolher #selBloco option")].find(l=>l.getAttribute("value")===o&&!l.hasAttribute("disabled")&&!l.parentElement?.hasAttribute("disabled"));if(!c)throw new u("SEI_RESPOSTA_INESPERADA","O SEI n\xE3o confirmou o retorno do bloco na tela de inclus\xE3o. Confira seu estado antes de tentar novamente.");return{id:o,rotulo:h(c)}})}var pe={disponibilizar:{sei:"bloco_disponibilizar",vira:"Disponibilizado",ja:["Disponibilizado"],exige:["Gerado","Retornado"],frase:e=>`disponibilizar o bloco ${e}`},cancelar:{sei:"bloco_cancelar_disponibilizacao",vira:"Gerado",ja:["Gerado"],exige:["Disponibilizado"],frase:e=>`cancelar a disponibiliza\xE7\xE3o do bloco ${e}`},concluir:{sei:"bloco_concluir",vira:"Conclu\xEDdo",ja:["Conclu\xEDdo"],frase:e=>`concluir o bloco ${e}`},reabrir:{sei:"bloco_reabrir",vira:"Gerado",ja:["Gerado","Disponibilizado","Retornado"],exige:["Conclu\xEDdo"],frase:e=>`reabrir o bloco ${e}`},retornar:{sei:"bloco_retornar",vira:"Retornado",ja:["Retornado"],exige:["Disponibilizado"],frase:e=>`retornar o bloco ${e}`},excluir:{sei:"bloco_excluir",vira:"(exclu\xEDdo)",frase:e=>`excluir o bloco ${e}`}};async function me(e,o,r,t,n){let a=pe[t],i=H(o.html,a.sei);if(!i)throw new u("SEI_ACAO_INDISPONIVEL",`O SEI n\xE3o oferece ${a.frase(r)} nesta unidade.`);let s=E.de(o,"#frmBlocoLista",e.http).definir({hdnInfraItemId:r,hdnInfraItensSelecionados:""});await e.http.enviar(i,s.pares(),{sinal:n.sinal})}var I={fill:"currentColor",stroke:"none"},ko="M12 3.2l2.7 5.5 6 .9-4.35 4.25 1 6L12 17l-5.35 2.85 1-6L3.3 9.6l6-.9z",Ro={estrela:[["path",{d:ko}]],estrelaCheia:[["path",{d:ko,fill:"currentColor"}]],alvo:[["circle",{cx:"12",cy:"12",r:"7.5"}],["circle",{cx:"12",cy:"12",r:"3.2"}]],alvoAtivo:[["circle",{cx:"12",cy:"12",r:"6.6"}],["circle",{cx:"12",cy:"12",r:"2.4",fill:"currentColor"}],["path",{d:"M12 2.2v3.4M12 18.4v3.4M2.2 12h3.4M18.4 12h3.4"}]],pasta:[["path",{d:"M3.5 7.5a2 2 0 0 1 2-2h4l2 2h7a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2z"}]],etiqueta:[["path",{d:"M3.5 12.2V4.5a1 1 0 0 1 1-1h7.7l8.3 8.3a1 1 0 0 1 0 1.4l-7.1 7.1a1 1 0 0 1-1.4 0z"}],["circle",{cx:"8",cy:"8",r:"1.4",...I}]],relogio:[["circle",{cx:"12",cy:"12",r:"9"}],["path",{d:"M12 7.2V12l3.2 1.9"}]],nota:[["path",{d:"M6 3.5h9l3.5 3.5v13.5H6z"}],["path",{d:"M9 11h6"}],["path",{d:"M9 15h6"}]],lixeira:[["path",{d:"M4.5 6.5h15"}],["path",{d:"M9.5 6.5V4.8c0-.7.6-1.3 1.3-1.3h2.4c.7 0 1.3.6 1.3 1.3v1.7"}],["path",{d:"M6.8 6.5 7.6 19c0 .8.7 1.5 1.5 1.5h5.8c.8 0 1.5-.7 1.5-1.5l.8-12.5"}]],lapis:[["path",{d:"M17.5 3.5a2.1 2.1 0 0 1 3 3L9 18l-4.5 1.5L6 15z"}],["path",{d:"M15 6l3 3"}]],fechar:[["path",{d:"M18 6 6 18"}],["path",{d:"M6 6l12 12"}]],mais:[["path",{d:"M12 5v14"}],["path",{d:"M5 12h14"}]],busca:[["circle",{cx:"11",cy:"11",r:"6.5"}],["path",{d:"M20.5 20.5l-4.8-4.8"}]],baixar:[["path",{d:"M12 3.5v11"}],["path",{d:"M7.5 10.2 12 14.7l4.5-4.5"}],["path",{d:"M4.5 19.5h15"}]],subir:[["path",{d:"M12 14.5v-11"}],["path",{d:"M7.5 7.8 12 3.3l4.5 4.5"}],["path",{d:"M4.5 19.5h15"}]],copiar:[["rect",{x:"8.5",y:"8.5",width:"12",height:"12",rx:"2"}],["path",{d:"M15.5 8.5V5.5a2 2 0 0 0-2-2h-8a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h3"}]],restaurar:[["path",{d:"M9 14 4 9l5-5"}],["path",{d:"M4 9h9a7 7 0 0 1 7 7v4"}]],check:[["path",{d:"M20 6.5 9.2 17.3 4 12.1"}]],alerta:[["path",{d:"M10.3 4.4 2.8 17.6a2 2 0 0 0 1.7 3h15a2 2 0 0 0 1.7-3L13.7 4.4a2 2 0 0 0-3.4 0z"}],["path",{d:"M12 9.5v4"}],["circle",{cx:"12",cy:"16.8",r:"1",...I}]],menu:[["circle",{cx:"5",cy:"12",r:"1.4",...I}],["circle",{cx:"12",cy:"12",r:"1.4",...I}],["circle",{cx:"19",cy:"12",r:"1.4",...I}]],alca:[["circle",{cx:"9",cy:"6",r:"1.3",...I}],["circle",{cx:"15",cy:"6",r:"1.3",...I}],["circle",{cx:"9",cy:"12",r:"1.3",...I}],["circle",{cx:"15",cy:"12",r:"1.3",...I}],["circle",{cx:"9",cy:"18",r:"1.3",...I}],["circle",{cx:"15",cy:"18",r:"1.3",...I}]],ajustes:[["path",{d:"M4 7h5"}],["path",{d:"M13 7h7"}],["circle",{cx:"11",cy:"7",r:"2.1"}],["path",{d:"M4 17h9"}],["path",{d:"M17 17h3"}],["circle",{cx:"15",cy:"17",r:"2.1"}]],setaCima:[["path",{d:"M12 19V6"}],["path",{d:"M6 12l6-6 6 6"}]],setaBaixo:[["path",{d:"M12 5v13"}],["path",{d:"M18 12l-6 6-6-6"}]],recolher:[["path",{d:"M6 15l6-6 6 6"}]],expandir:[["path",{d:"M6 9l6 6 6-6"}]],local:[["path",{d:"M12 21s-6.5-6.1-6.5-11a6.5 6.5 0 0 1 13 0c0 4.9-6.5 11-6.5 11z"}],["circle",{cx:"12",cy:"10",r:"2.3"}]],sino:[["path",{d:"M6.5 16.5V11a5.5 5.5 0 0 1 11 0v5.5l1.5 1.5h-14z"}],["path",{d:"M10 20.5a2 2 0 0 0 4 0"}]],documento:[["path",{d:"M7 3.5h7l4 4v13H7z"}],["path",{d:"M14 3.5v4h4"}]],painel:[["rect",{x:"3.5",y:"4.5",width:"17",height:"15",rx:"2"}],["path",{d:"M14.5 4.5v15"}]],atualizar:[["path",{d:"M19.5 12a7.5 7.5 0 1 1-2.2-5.3"}],["path",{d:"M19.5 4.5v4h-4"}]],nuvem:[["path",{d:"M7 18.5h10a4 4 0 0 0 .6-7.95A5.5 5.5 0 0 0 7 9.5a4.5 4.5 0 0 0 0 9z"}]],chevron:[["path",{d:"M7 9.5l5 5 5-5"}]],pino:[["path",{d:"M9.5 3.5h5l-.8 5.2 3.3 3.1v1.7H7v-1.7l3.3-3.1z"}],["path",{d:"M12 13.5v7"}]],pinoCheio:[["path",{d:"M9.5 3.5h5l-.8 5.2 3.3 3.1v1.7H7v-1.7l3.3-3.1z",fill:"currentColor"}],["path",{d:"M12 13.5v7"}]],filtro:[["path",{d:"M4 5.5h16l-6.2 7.3v5.4l-3.6 1.8v-7.2z"}]],ordenar:[["path",{d:"M7.5 4.5v15"}],["path",{d:"M4 16l3.5 3.5L11 16"}],["path",{d:"M16.5 19.5v-15"}],["path",{d:"M13 8l3.5-3.5L20 8"}]],mapa:[["path",{d:"M9 4.5 3.5 6.6v13l5.5-2.1 6 2.1 5.5-2.1v-13L15 6.6z"}],["path",{d:"M9 4.5v13"}],["path",{d:"M15 6.6v13"}]],olho:[["path",{d:"M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z"}],["circle",{cx:"12",cy:"12",r:"2.8"}]],camadas:[["path",{d:"M12 3.5 20.5 8 12 12.5 3.5 8z"}],["path",{d:"M3.5 12 12 16.5 20.5 12"}],["path",{d:"M3.5 16 12 20.5 20.5 16"}]],historico:[["path",{d:"M3.8 12.5A8.3 8.3 0 1 0 6.2 6"}],["path",{d:"M3.8 4.2v4.3h4.3"}],["path",{d:"M12 8v4.2l2.8 1.7"}]],pessoa:[["circle",{cx:"12",cy:"8",r:"3.6"}],["path",{d:"M5 20c.9-3.7 3.6-5.6 7-5.6s6.1 1.9 7 5.6"}]],predio:[["path",{d:"M5 20.5v-15a1 1 0 0 1 1-1h7.5a1 1 0 0 1 1 1v15"}],["path",{d:"M14.5 9.5H18a1 1 0 0 1 1 1v10"}],["path",{d:"M3 20.5h18"}],["path",{d:"M8.5 8.5h3"}],["path",{d:"M8.5 12h3"}],["path",{d:"M8.5 15.5h3"}]],brilho:[["path",{d:"M12 3.5l1.9 5.1 5.1 1.9-5.1 1.9L12 17.5l-1.9-5.1L5 10.5l5.1-1.9z"}],["path",{d:"M18.5 16.5v4"}],["path",{d:"M16.5 18.5h4"}]],calendario:[["rect",{x:"4",y:"5.5",width:"16",height:"15",rx:"2"}],["path",{d:"M4 10h16"}],["path",{d:"M8.5 3.5v4"}],["path",{d:"M15.5 3.5v4"}]],cadeado:[["rect",{x:"5.5",y:"10.5",width:"13",height:"10",rx:"2"}],["path",{d:"M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5"}]],saida:[["path",{d:"M14 4.5h4.5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H14"}],["path",{d:"M10 16l4-4-4-4"}],["path",{d:"M14 12H4.5"}]],planilha:[["rect",{x:"4",y:"4",width:"16",height:"16",rx:"2"}],["path",{d:"M4 9.5h16"}],["path",{d:"M4 15h16"}],["path",{d:"M10 9.5V20"}]],mover:[["path",{d:"M4.5 12h14"}],["path",{d:"M13.5 6.5 19 12l-5.5 5.5"}]],sol:[["circle",{cx:"12",cy:"12",r:"3.8"}],["path",{d:"M12 2.8v2M12 19.2v2M2.8 12h2M19.2 12h2M5.5 5.5l1.4 1.4M17.1 17.1l1.4 1.4M5.5 18.5l1.4-1.4M17.1 6.9l1.4-1.4"}]],teclado:[["rect",{x:"3",y:"6.5",width:"18",height:"11",rx:"2"}],["path",{d:"M7 10h.01M10.3 10h.01M13.7 10h.01M17 10h.01M8 14h8"}]],gantt:[["path",{d:"M4 5h9M7 12h11M4 19h7"}],["path",{d:"M3 3v18"}]],demandas:[["circle",{cx:"10",cy:"7.8",r:"3.2"}],["path",{d:"M3.8 19.5a6.2 5.2 0 0 1 11.8-2.6"}],["circle",{cx:"17.6",cy:"17.6",r:"4.2"}],["path",{d:"m15.6 17.7 1.5 1.5 2.5-3"}]]},Sr=Object.keys(Ro);function to(e,o=18,r=document){let t="http://www.w3.org/2000/svg",n=r.createElementNS(t,"svg"),a={viewBox:"0 0 24 24",width:String(o),height:String(o),fill:"none",stroke:"currentColor","stroke-width":"1.8","stroke-linecap":"round","stroke-linejoin":"round","aria-hidden":"true",focusable:"false",class:"spro-icone"};for(let[i,s]of Object.entries(a))n.setAttribute(i,s);for(let[i,s]of Ro[e]){let c=r.createElementNS(t,i);for(let[l,p]of Object.entries(s))c.setAttribute(l,p);n.append(c)}return n}var $o="spro-blk-host";function O(e,o,r="",t){let n=e.createElement(o);return r&&(n.className=r),t!==void 0&&(n.textContent=t),n}function Co(e,o,r){let t=O(e,"button",o,r);return t.type="button",t}function To(e,o={}){e.querySelectorAll(`.${$o}`).forEach(A=>A.remove());let r=O(e,"div",$o);r.setAttribute("data-tema",o.escuro?"escuro":"claro");let t=r.attachShadow({mode:"open"}),n=e.createElement("style");n.textContent=o.css??"";let a=O(e,"dialog","spro-dialogo spro-blk-dialogo");a.setAttribute("aria-labelledby","spro-blk-titulo");let i=O(e,"h2","","Retornar bloco disponibilizado");i.id="spro-blk-titulo";let s=O(e,"span","spro-dialogo-icone");s.setAttribute("aria-hidden","true"),s.append(to("restaurar",18,e));let c=Co(e,"spro-botao-icone","");c.setAttribute("aria-label","Fechar"),c.title="Fechar (Esc)",c.dataset.sproFechar="",c.append(to("fechar",16,e));let l=e.createElement("header");l.append(s,i,c);let p=O(e,"p","spro-blk-texto","O retorno cancela a disponibiliza\xE7\xE3o para outras unidades e libera o bloco para incluir novos documentos. Depois da inclus\xE3o, voc\xEA pode disponibiliz\xE1-lo novamente."),d=O(e,"p","spro-blk-status","Carregando blocos disponibilizados\u2026");d.setAttribute("role","status"),d.setAttribute("aria-live","polite");let m=O(e,"fieldset","spro-blk-lista");m.hidden=!0,m.append(O(e,"legend","","Selecione o bloco"));let f=Co(e,"spro-botao primario","Retornar bloco");f.dataset.sproConfirmar="",f.disabled=!0;let x=O(e,"div","spro-dialogo-rodape");x.append(f);let v=O(e,"div","spro-dialogo-corpo");v.append(p,d,m,x),a.append(l,v),t.append(n,a);let L=()=>{typeof a.close=="function"&&a.open&&a.close(),r.remove()};return a.addEventListener("close",()=>r.remove()),{host:r,raiz:t,dialogo:a,titulo:i,explicacao:p,status:d,lista:m,confirmar:f,fecharX:c,remover:L,abrir(){(e.body??e.documentElement).append(r),typeof a.showModal=="function"?a.showModal():a.setAttribute("open","")}}}function qo({doc:e,url:o,sei:r,topo:t=e,css:n=""}){let a=!1,i=!1,s=!1,c=null,l=null,p=null,d=new Set,m=new URL(o).searchParams.get("acao")==="bloco_escolher";function f(){l?.abort(),l=null;let _=c;c=null,_?.remover(),p?.isConnected&&p.focus(),p=null}function x(){f();for(let _ of d)_.remove();d.clear()}function v(){if(!a||i||!m)return;let _=e.querySelector("#frmBlocoEscolher #selBloco");if(!_)return;for(let q of d)q.isConnected||d.delete(q);let k=[...e.querySelectorAll("#frmBlocoEscolher #divInfraBarraComandosSuperior, #frmBlocoEscolher #divInfraBarraComandosInferior")],U=k.length?k:[_.parentElement];for(let q of U){if(q.querySelector(".spro-blocos-retornar"))continue;let D=e.createElement("button");D.type="button",D.className="infraButton spro-blocos-retornar",D.textContent="Retornar bloco disponibilizado",D.disabled=s,D.addEventListener("click",()=>{L(D)}),q.append(D),d.add(D)}}async function L(_){if(!a||i||c||s)return;p=_;let k=To(t,{css:n,escuro:!!t.body?.classList.contains("dark-mode")}),{dialogo:U,titulo:q,explicacao:D,status:P,lista:R,confirmar:$,fecharX:j}=k;c=k;let no=()=>{s||f()};U.addEventListener("cancel",g=>{g.preventDefault(),no()}),U.addEventListener("close",()=>{c===k&&(c=null,l?.abort(),l=null)}),j.addEventListener("click",no),k.abrir(),j.focus();let F="",w="",io=g=>{w=g};R.addEventListener("change",()=>{F=R.querySelector("input:checked")?.value??"",$.disabled=!F||s});let so=new AbortController;l=so;let z=()=>!i&&a&&c===k;try{let g=await Mo(r,{sinal:so.signal,aoAviso:io});if(!z())return;if(l=null,!g.length){P.textContent="Nenhum bloco disponibilizado que possa retornar nesta unidade foi encontrado."+(w?` ${w}`:""),$.remove();return}for(let M of g){let C=t.createElement("label"),B=t.createElement("input");B.type="radio",B.name="spro-bloco-retorno",B.value=M.id;let V=t.createElement("span");V.textContent=`${M.numero} - ${M.descricao}`,C.append(B,V),R.append(C)}R.hidden=!1,P.textContent="Escolha um bloco e confirme o retorno."+(w?` ${w}`:""),R.querySelector("input")?.focus()}catch(g){if(!z())return;l=null,P.textContent=g instanceof Error?g.message:"N\xE3o foi poss\xEDvel carregar os blocos. Tente novamente.",w&&(P.textContent+=` ${w}`),$.remove()}$.addEventListener("click",()=>{Uo()});async function Uo(){if(!(!z()||s||!F||$.disabled)){s=!0,$.disabled=!0,j.disabled=!0,R.disabled=!0;for(let g of d)g.disabled=!0;P.textContent="Retornando o bloco e verificando a inclus\xE3o\u2026";try{let g=await Lo(r,F,o,{aoAviso:io});if(!z())return;let M=e.querySelector("#frmBlocoEscolher #selBloco");if(!M)P.textContent="Bloco retornado no SEI. A tela de inclus\xE3o mudou; atualize-a antes de continuar.";else{let C=[...M.options].find(V=>V.value===g.id);if(!C){C=e.createElement("option"),C.value=g.id;let V=[...M.options].find(co=>/^\d+$/.test(co.value)&&Number(co.value)<Number(g.id));M.insertBefore(C,V??null)}C.textContent=g.rotulo,M.value=g.id;let B=e.defaultView.Event;M.dispatchEvent(new B("chosen:updated",{bubbles:!0})),P.textContent="Bloco retornado e selecionado no campo Bloco. Voc\xEA pode incluir os documentos marcados."}w&&(P.textContent+=` ${w}`),q.textContent="Bloco retornado",D.remove(),R.remove(),$.remove()}catch(g){if(!z())return;P.textContent=g instanceof Error?g.message:"N\xE3o foi poss\xEDvel confirmar o retorno. Confira o bloco no SEI antes de tentar novamente.",w&&(P.textContent+=` ${w}`),$.disabled=!1}finally{s=!1;for(let g of d)g.disabled=!1;z()&&(j.disabled=!1,R.disabled=!1,j.focus())}}}}let A=e.defaultView.MutationObserver,ao=new A(v);return m&&ao.observe(e.body,{childList:!0,subtree:!0}),{configurar(_){i||(a=_,a?v():x())},fechar(){i=!0,a=!1,ao.disconnect(),x()}}}var zo=`/*
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
`;var Bo=`/*
 * O modal "Retornar bloco disponibilizado", dentro do Shadow DOM, depois do base.css do sei-comum (tokens,
 * bot\xF5es, dialog.spro-dialogo, cabe\xE7alho com ladrilho, rodap\xE9). Aqui s\xF3 a lista dos blocos.
 */
dialog.spro-blk-dialogo {
  width: min(520px, calc(100vw - 32px));
}
.spro-blk-texto,
.spro-blk-status {
  margin: 0;
  font-size: 13px;
  line-height: 1.5;
  color: var(--spro-suave);
}
.spro-blk-status:empty {
  display: none;
}
.spro-blk-lista {
  display: grid;
  gap: 6px;
  min-width: 0;
  max-height: 280px;
  margin: 0;
  padding: 0;
  overflow-y: auto;
  border: 0;
  scrollbar-width: thin;
}
.spro-blk-lista[hidden] {
  display: none;
}
.spro-blk-lista legend {
  margin-bottom: 6px;
  padding: 0;
  font-size: 12.5px;
  font-weight: 600;
  color: var(--spro-suave);
}
.spro-blk-lista label {
  display: flex;
  align-items: baseline;
  gap: 10px;
  padding: 8px 10px;
  background: var(--spro-fundo-2);
  border: 1px solid var(--spro-borda);
  border-radius: var(--spro-raio);
  cursor: pointer;
  transition:
    border-color var(--spro-dur),
    background var(--spro-dur);
}
.spro-blk-lista label:hover {
  border-color: var(--spro-borda-forte);
}
.spro-blk-lista label:has(input:checked) {
  background: var(--spro-destaque-suave);
  border-color: var(--spro-destaque);
}
.spro-blk-lista input {
  flex: none;
  accent-color: var(--spro-destaque);
}
.spro-blk-lista span {
  min-width: 0;
  overflow-wrap: anywhere;
}
.spro-blk-lista:disabled {
  opacity: 0.6;
}
/* Sem a\xE7\xE3o no rodap\xE9 (lista vazia, erro de leitura, retorno conclu\xEDdo): o X j\xE1 fecha. */
.spro-dialogo-rodape:empty {
  display: none;
}
`;var Vo=`/* S\xF3 o bot\xE3o na tela de inclus\xE3o (o modal tem o CSS pr\xF3prio, em modal.css, dentro do Shadow DOM). */
.spro-blocos-retornar { margin: 4px 0 4px 8px; }
.spro-blocos-retornar:focus-visible { outline: 2px solid #005ea8; outline-offset: 3px; }
`;var Ho="retornarblocodisponibilizado";function jo(){if(new URL(location.href).searchParams.get("acao")!=="bloco_escolher")return;let e=document.createElement("style");e.textContent=Vo,document.head.append(e);let o=new X(location.href,()=>{let a=oo();return Do(a,a.location?.href??location.href)}),r=qo({doc:document,url:location.href,sei:o,topo:oo(),css:`${zo}
${Bo}`}),t=!1,n=(a,i)=>{i!=="sync"||!("dataValues"in a)||(t=!0,r.configurar(eo(a.dataValues.newValue,Ho)))};chrome.storage.onChanged.addListener(n),chrome.storage.sync.get("dataValues").then(a=>{t||r.configurar(eo(a.dataValues,Ho))}).catch(()=>{}),window.addEventListener("pagehide",a=>{a.persisted||(r.fechar(),chrome.storage.onChanged.removeListener(n),e.remove())},{once:!0})}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",jo,{once:!0}):jo();})();
