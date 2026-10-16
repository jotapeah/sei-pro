/**
 * Entrada de html/acoes-lote.html. Esqueleto: conecta com a aba do SEI, abre o <dialog> do modal e mostra
 * "Carregando…". O app de verdade (telas, execucao) entra nas tarefas seguintes.
 *
 * So o modo modal (`#modo=modal&tema=claro|escuro`), como o Processos em Lote: iframe transparente sobre a tela
 * do SEI, ligado a PROPRIA aba (pagina/main.ts), com o app num <dialog> com veu.
 */

import { esperarConexaoDaAba } from "@comum/ponte/conexaoDaAba";
import type { Rpc, Tratador } from "@comum/ponte/rpc";
import { h } from "@comum/ui/dom";
import { CANAL_ACOES_LOTE } from "../modelo/constantes";

const parametros = new URLSearchParams(location.hash.slice(1));
document.documentElement.dataset.modo = "modal";
const temaDoEndereco = parametros.get("tema");
if (temaDoEndereco === "claro" || temaDoEndereco === "escuro") document.documentElement.dataset.tema = temaDoEndereco;
const raiz = document.getElementById("app")!;

// O ouvinte da porta e registrado ja, antes do `load` do iframe, que e quando o content script conecta.
const tratadoresDoApp: Record<string, Tratador> = {};
const conexao = esperarConexaoDaAba(CANAL_ACOES_LOTE, tratadoresDoApp);

void iniciarModal();

async function iniciarModal(): Promise<void> {
  const dlg = h("dialog", { class: "spro-dialogo al-modal", "aria-label": "Ações em Lote" });
  dlg.append(raiz);
  document.body.append(dlg);
  let rpc: Rpc | null = null;
  // Fechar o dialogo (X, Esc, veu) pede a aba que tire o iframe; sem o pedido a tela do SEI fica presa sob ele.
  dlg.addEventListener("close", () => {
    void rpc?.chamar("fechar", undefined, 3000).catch(() => undefined);
  });
  raiz.replaceChildren(h("p", {}, "Carregando…"));
  dlg.showModal();
  try {
    rpc = await conexao;
  } catch (e) {
    raiz.replaceChildren(
      h("p", { class: "spro-lista-erro" }, `Não foi possível abrir as Ações em Lote: ${e instanceof Error ? e.message : String(e)}`),
    );
  }
}
