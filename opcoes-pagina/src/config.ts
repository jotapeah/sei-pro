/**
 * O `configGeral` da pagina de opcoes: coletar o que o DOM mostra e aplicar o que
 * estava gravado. Os mesmos nomes, a mesma ordem e os mesmos tipos do options.js
 * legado (changeConfigGeral / restore_options), sem jQuery.
 *
 * Contrato de DOM (produzido por render.ts): ver o cabecalho daquele arquivo.
 */
import { h } from "@comum/ui/dom";

export const PREFIXO_ID = "itemConfigGeral_";

export interface ItemConfig {
  name: string;
  value: boolean | string | number;
}
export type Controle = HTMLInputElement | HTMLSelectElement;

/** Compara o atributo em vez de interpolar o nome num seletor: um `name` gravado com aspas ou colchete nao pode quebrar a busca. */
export const controleDe = (raiz: ParentNode, nome: string): Controle | null =>
  [...raiz.querySelectorAll<Controle>("[data-name]")].find((c) => c.getAttribute("data-name") === nome) ?? null;

const tipoDe = (c: Element): string => c.getAttribute("data-tipo") ?? "";
const nomeDe = (c: Element): string => c.getAttribute("data-name") ?? "";
const controlesDa = (raiz: ParentNode, aba: string): Controle[] => [...raiz.querySelectorAll<Controle>(`[data-aba="${aba}"] [data-name]`)];

/** Esvazia um controle como o legado fazia ao esconder uma linha dependente. */
function limpar(c: Controle): void {
  if (tipoDe(c) === "chave") (c as HTMLInputElement).checked = false;
  else if (c.tagName === "SELECT") c.replaceChildren(h("option", { value: "" }));
  else c.value = "";
}

interface Regra {
  de: string;
  quando: boolean;
  limpar: boolean;
}
const lerRegras = (v: string): Regra[] =>
  v
    .split(",")
    .filter(Boolean)
    .map((p) => {
      const [de, quando, lim] = p.split(":");
      return { de, quando: quando === "1", limpar: lim === "1" };
    });

/** Mostra/esconde as linhas que dependem de outra chave (atributo data-dep-oculta). */
export function atualizarDependencias(raiz: ParentNode): void {
  for (const linha of raiz.querySelectorAll<HTMLElement>("[data-depende]")) {
    const proprio = controleDe(linha, linha.getAttribute("data-opcao") ?? "");
    let visivel = true;
    for (const r of lerRegras(linha.getAttribute("data-depende") ?? "")) {
      const pai = controleDe(raiz, r.de) as HTMLInputElement | null;
      if ((pai?.checked ?? false) !== r.quando) {
        visivel = false;
        if (r.limpar && proprio) limpar(proprio);
      }
    }
    if (visivel) linha.removeAttribute("data-dep-oculta");
    else linha.setAttribute("data-dep-oculta", "");
  }
}

/** Icone azul (ligado) ou cinza (desligado) conforme o estado do controle. */
export function atualizarCores(raiz: ParentNode): void {
  for (const linha of raiz.querySelectorAll<HTMLElement>("[data-opcao]")) {
    const c = controleDe(linha, linha.getAttribute("data-opcao") ?? "");
    const ico = linha.querySelector(".ico");
    if (!c || !ico) continue;
    const ligado = tipoDe(c) === "chave" ? (c as HTMLInputElement).checked : c.value !== "";
    ico.classList.toggle("ligado", ligado);
    ico.classList.toggle("desligado", !ligado);
  }
}

/** "N de M ativas" no cabecalho de cada secao (so chaves visiveis no produto). */
export function atualizarContagens(raiz: ParentNode): void {
  for (const s of raiz.querySelectorAll<HTMLElement>("details.secao")) {
    const chaves = [...s.querySelectorAll<HTMLElement>('.opcao[data-tipo="chave"]')].filter((l) => !l.hasAttribute("hidden"));
    const ativas = chaves.filter((l) => (controleDe(l, l.getAttribute("data-opcao") ?? "") as HTMLInputElement | null)?.checked).length;
    const alvo = s.querySelector(".contagem");
    if (alvo) alvo.textContent = `${ativas} de ${chaves.length} ativas`;
  }
}

/** O mesmo array que o legado gravava em dataValues[].configGeral. */
export function coletarConfigGeral(raiz: ParentNode): ItemConfig[] {
  atualizarDependencias(raiz);
  const geral = controlesDa(raiz, "geral");
  const complementos = controlesDa(raiz, "complementos");
  const chaves = (cs: Controle[]): ItemConfig[] =>
    cs.filter((c) => tipoDe(c) === "chave").map((c) => ({ name: nomeDe(c), value: (c as HTMLInputElement).checked }));
  const preenchidos = (tipo: string) => geral.filter((c) => tipoDe(c) === tipo && c.value !== "");
  const numeros = preenchidos("numero")
    .map((c) => ({ name: nomeDe(c), value: Number.parseInt(c.value, 10) }))
    .filter((i) => !Number.isNaN(i.value));
  return [
    ...chaves(geral),
    ...chaves(complementos),
    ...preenchidos("texto").map((c) => ({ name: nomeDe(c), value: c.value })),
    ...numeros,
    ...preenchidos("selecao").map((c) => ({ name: nomeDe(c), value: c.value })),
  ];
}

/**
 * newdocsigilo guarda "id|nivel|rotulo" (lido pelo sei-functions-pro.js). O legado
 * criava a <option> com so o `id` e, ao salvar de novo, perdia nivel e rotulo; aqui o
 * valor inteiro e o value da <option>, e o rotulo e o texto.
 */
function definirSelecao(sel: HTMLSelectElement, nome: string, valor: unknown): void {
  if (typeof valor !== "string") return;
  if (nome === "newdocsigilo") {
    const partes = valor.split("|");
    if (partes.length < 3) return;
    sel.replaceChildren(h("option", { value: valor, selected: true }, partes[2]));
    return;
  }
  for (const o of sel.querySelectorAll("option")) o.selected = o.value === valor;
}

/** Aplica o que estava gravado. Item ausente fica no padrao; nome desconhecido e ignorado. */
export function aplicarConfigGeral(raiz: ParentNode, itens: ItemConfig[]): void {
  for (const { name, value } of itens) {
    const c = controleDe(raiz, name);
    if (!c) continue;
    const tipo = tipoDe(c);
    if (tipo === "chave") {
      if (typeof value === "boolean") (c as HTMLInputElement).checked = value;
    } else if (tipo === "selecao") definirSelecao(c as HTMLSelectElement, name, value);
    else if (value !== null && value !== undefined) c.value = String(value);
  }
  atualizarDependencias(raiz);
  atualizarCores(raiz);
  atualizarContagens(raiz);
}
