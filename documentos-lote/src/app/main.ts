/**
 * Entrada de html/documentos-lote.html. Liga o app ao navegador: <dialog>, armazenamento e a ponte com a aba do SEI
 * (molde: processos-lote/src/app/main.ts).
 *
 * Só o modo modal (`#modo=modal&tema=claro|escuro`): iframe transparente sobre a tela do SEI, ligado à PRÓPRIA aba
 * (pagina/main.ts), com o app num <dialog> com véu. Minimizado (html[data-minimizado], posto pelo app na Tarefa 14),
 * o Esc não fecha: a página é do usuário e o lote segue rodando.
 */

import { areaChrome } from "@comum/armazenamento/area";
import { esperarConexaoDaAba } from "@comum/ponte/conexaoDaAba";
import type { Rpc, Tratador } from "@comum/ponte/rpc";
import { acompanharTemaDoPainel, aplicarTemaDoContexto } from "@comum/tema/painel";
import { h } from "@comum/ui/dom";
import { CANAL_DOCUMENTOS_LOTE } from "../modelo/constantes";
import { RepositorioLote } from "../repositorio";
import { AppDocumentosLote, type ContextoApp } from "./app";

const parametros = new URLSearchParams(location.hash.slice(1));
document.documentElement.dataset.modo = "modal";
// O tema do SEI já vem no endereço: sem ele, até o contexto chegar valeria o do sistema, e com esquema de cores
// diferente do iframe o Chrome pinta o fundo opaco sobre a tela do SEI.
const temaDoEndereco = parametros.get("tema");
if (temaDoEndereco === "claro" || temaDoEndereco === "escuro") document.documentElement.dataset.tema = temaDoEndereco;
const raiz = document.getElementById("app")!;

// O ouvinte da porta é registrado já, antes do `load` do iframe, que é quando o content script conecta. Os
// tratadores (o que a aba pede ao app) são lidos a cada pedido: a Tarefa 14 acrescenta o `restaurado`.
const tratadoresDoApp: Record<string, Tratador> = {};
const conexao = esperarConexaoDaAba(CANAL_DOCUMENTOS_LOTE, tratadoresDoApp);

const mensagem = (e: unknown): string => (e instanceof Error ? e.message : String(e));

void iniciarModal();

async function iniciarModal(): Promise<void> {
  const dlg = h("dialog", { class: "spro-dialogo dl-modal", "aria-label": "Documentos em Lote" });
  // O CSS do modal mira `dialog.dl-modal #app`.
  dlg.append(raiz);
  document.body.append(dlg);
  let rpc: Rpc | null = null;
  let app: AppDocumentosLote | null = null;
  const minimizado = () => document.documentElement.hasAttribute("data-minimizado");
  // Fechar o diálogo (X, Esc, véu) pede à aba que tire o iframe. O pedido vai PRIMEIRO: sem ele, a tela do SEI
  // fica presa sob o iframe transparente até o F5.
  dlg.addEventListener("close", () => {
    void rpc?.chamar("fechar", undefined, 3000).catch(() => undefined);
    try {
      app?.destruir();
    } catch (e) {
      console.warn("[SEI Pro] documentos em lote: falha ao desmontar o app", e);
    }
  });
  // Minimizado, o Esc nativo do <dialog> não fecha a pastilha.
  dlg.addEventListener("cancel", (ev) => {
    if (minimizado()) ev.preventDefault();
  });
  // Véu: o clique cai no próprio <dialog>, fora do retângulo dele. Começo e fim no véu, para uma seleção de texto
  // que termina fora não fechar a janela. Minimizado não há véu.
  const noVeu = (ev: MouseEvent) => {
    if (ev.target !== dlg || minimizado()) return false;
    const r = dlg.getBoundingClientRect();
    return ev.clientX < r.left || ev.clientX > r.right || ev.clientY < r.top || ev.clientY > r.bottom;
  };
  let comecouNoVeu = false;
  dlg.addEventListener("pointerdown", (ev) => {
    comecouNoVeu = noVeu(ev);
  });
  dlg.addEventListener("click", (ev) => {
    if (comecouNoVeu && noVeu(ev)) dlg.close();
    comecouNoVeu = false;
  });
  const mostrar = () => {
    if (!dlg.open) dlg.showModal();
  };
  try {
    rpc = await conexao;
    const ctx = await rpc.chamar<ContextoApp>("contexto");
    // Segue o SEI (modo noturno do SEI Pro e cor da barra), como o Processos em Lote.
    const html = document.documentElement;
    aplicarTemaDoContexto(html, ctx);
    const rpcAba = rpc;
    acompanharTemaDoPainel(document, {
      aoDesligar: async () => aplicarTemaDoContexto(html, await rpcAba.chamar<ContextoApp>("contexto")),
    });
    app = new AppDocumentosLote(raiz, {
      rpc,
      ctx,
      repo: new RepositorioLote(areaChrome(chrome.storage.local, "local")),
      fechar: () => dlg.close(),
      minimizar: async (m) => {
        await rpcAba.chamar("minimizar", { minimizado: m });
      },
    });
    mostrar();
    await app.iniciar();
  } catch (e) {
    app?.destruir();
    app = null;
    // Mesmo com erro o diálogo abre: é por ele que o usuário fecha o iframe que cobre a tela.
    raiz.replaceChildren(
      h("p", { class: "spro-lista-erro" }, `Não foi possível abrir o Documentos em Lote: ${mensagem(e)}`),
      h(
        "div",
        { class: "spro-dialogo-rodape" },
        h("button", { type: "button", class: "spro-botao", onclick: () => dlg.close() }, "Fechar"),
      ),
    );
    mostrar();
  }
}
