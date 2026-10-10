/**
 * O carregador do content script: o `init_demandas.js` roda em TODO frame do SEI, então fica mínimo (a marca do
 * <html> e a decisão pela tela, com guardas baratas: o DOM que já está aí, sem serializar a página). Só a janela de
 * topo com unidade no cabeçalho (o Controle de Processos é uma delas) importa o pacote pesado
 * (`js/demandas/pagina.js`, por `import()` do endereço da extensão). Nos outros frames nada é importado, nem a opção é
 * lida. Não há parte da árvore do processo: o Gestor de Demandas não lê nem busca a árvore.
 */

import { lerContexto } from "@nucleo/sei";

/** O pacote da página (ESM), no `web_accessible_resources` do manifest Lab. */
export const PACOTE_PAGINA = "js/demandas/pagina.js";

export type Carga = "topo";

/** O que o pacote da página oferece ao carregador (os tipos vêm do próprio módulo: os dois não divergem). */
export type PacotePagina = Pick<typeof import("./principal"), "principalTopo">;

export interface DepsCarregador {
  /** Esta é a janela de topo (`window === window.top`). */
  topo: boolean;
  doc: Document;
  url: string;
  /** A opção "Gestor de Demandas" das configurações (lida só quando a tela pede o pacote). */
  opcaoLigada(): Promise<boolean>;
  /** `import(chrome.runtime.getURL(caminho))`. */
  importar(caminho: string): Promise<PacotePagina>;
}

/** Usuário e unidade no cabeçalho do SEI: o mesmo `lerContexto` do pacote pesado, sem o HTML da página. */
export function temUnidade(doc: Document, url: string): boolean {
  try {
    const c = lerContexto({ url, status: 200, html: "", doc });
    return !!c.usuario.login && !!c.unidade.id;
  } catch {
    return false;
  }
}

/** Qual parte do pacote esta tela liga: a de topo ou nenhuma. */
export function oQueCarregar(o: { topo: boolean; doc: Document; url: string }): Carga | null {
  if (!o.topo) return null;
  return temUnidade(o.doc, o.url) ? "topo" : null;
}

/** Decide, lê a opção e só então importa e liga. Erro de carga sobe (o main.ts o leva ao console). */
export async function carregarDemandas(d: DepsCarregador): Promise<Carga | null> {
  const carga = oQueCarregar(d);
  if (!carga) return null;
  if (!(await d.opcaoLigada())) return null;
  const pacote = await d.importar(PACOTE_PAGINA);
  await pacote.principalTopo();
  return carga;
}
