/**
 * Listas de lupa (interessados, assuntos) e o autocompletar das telas.
 *
 * `aplicarModo` decide a lista final a partir da atual; quem grava é
 * `Formulario.definirLupa`. O autocompletar usa o link que a própria tela
 * declara em `new infraAjaxAutoCompletar('hdnIdX','txtX','<link>')`: o link é
 * colhido, nunca montado.
 */

import type { ItemLupa } from "../formulario/formulario";
import { decodificarEntidades } from "../sessao/dom";
import type { Sei } from "../sei";

export type ModoLista = "acrescentar" | "remover" | "substituir";

export interface AlteracaoLista {
  modo: ModoLista;
  itens: ItemLupa[];
}

function semRepetir(itens: ItemLupa[]): ItemLupa[] {
  const vistos = new Set<string>();
  return itens.filter((i) => !vistos.has(i.id) && vistos.add(i.id));
}

/** Lista final da lupa. Ids comparados por igualdade exata. */
export function aplicarModo(atuais: ItemLupa[], modo: ModoLista, itens: ItemLupa[]): ItemLupa[] {
  if (modo === "substituir") return semRepetir(itens);
  const ids = new Set(itens.map((i) => i.id));
  if (modo === "remover") return atuais.filter((a) => !ids.has(a.id));
  return semRepetir([...atuais, ...itens]);
}

function escaparRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** Link do `infraAjaxAutoCompletar` cujo campo oculto é `hdnId` (ex.: `hdnIdInteressado`), ou null. */
export function linkAutoCompletar(html: string, hdnId: string): string | null {
  const re = new RegExp(`new\\s+infraAjaxAutoCompletar\\(\\s*['"]${escaparRegex(hdnId)}['"]\\s*,\\s*['"][\\w-]+['"]\\s*,\\s*['"]([^'"]+)['"]`);
  const m = re.exec(html);
  return m ? decodificarEntidades(m[1]) : null;
}

/** Pesquisa pelo autocompletar: o `prepararExecucao` da tela envia só `palavras_pesquisa`. */
export async function pesquisarNoAutoCompletar(sei: Sei, link: string, termo: string, sinal?: AbortSignal): Promise<ItemLupa[]> {
  const itens = await sei.ajax(link, [["palavras_pesquisa", termo]], { sinal });
  return semRepetir(itens);
}
