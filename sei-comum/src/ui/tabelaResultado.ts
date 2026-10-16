/**
 * Tabela de resultado de operações em lote (Link Permanente e Processos em
 * Lote): mostra, copia (com links) e exporta em CSV. A situação sempre vai como
 * TEXTO, não só como cor, para ler em tela cinza e em leitor de tela.
 */

import { gerarCsv } from "../csv";
import type { Situacao } from "../lote/executor";
import { h } from "./dom";

export interface LinhaResultado {
  situacao: Situacao;
  campos: Record<string, string>;
  link?: string;
  /** Texto da Situação no lugar do padrão (ex.: "Criado" no Processos em Lote, onde "Encontrado" não faz sentido). */
  rotulo?: string;
}
export interface ColunaResultado {
  chave: string;
  titulo: string;
  comoLink?: boolean;
}

const ROTULOS: Record<Situacao, string> = {
  ok: "Encontrado",
  "nao-encontrado": "Não encontrado",
  "sem-acesso": "Sem acesso",
  erro: "Erro",
  pulado: "Pulado",
  pendente: "Pendente",
};

export function rotuloSituacao(s: Situacao): string {
  return ROTULOS[s];
}

const rotuloDaLinha = (l: LinhaResultado): string => l.rotulo ?? rotuloSituacao(l.situacao);

const TITULO_SITUACAO = "Situação";

function cabecalho(colunas: ColunaResultado[]): string[] {
  return [TITULO_SITUACAO, ...colunas.map((c) => c.titulo)];
}

function celulas(l: LinhaResultado, colunas: ColunaResultado[]): string[] {
  return [rotuloDaLinha(l), ...colunas.map((c) => l.campos[c.chave] ?? "")];
}

export function montarTabelaResultado(doc: Document, linhas: LinhaResultado[], colunas: ColunaResultado[]): HTMLTableElement {
  const tabela = doc.createElement("table");
  tabela.className = "spro-resultado";
  const cab = h("tr", {}, ...cabecalho(colunas).map((t) => h("th", {}, t)));
  tabela.append(h("thead", {}, cab));
  const corpo = h("tbody", {});
  for (const l of linhas) {
    const tr = h("tr", { class: `spro-situacao-${l.situacao}` }, h("td", {}, rotuloDaLinha(l)));
    for (const c of colunas) {
      const texto = l.campos[c.chave] ?? "";
      const conteudo = c.comoLink && l.link ? h("a", { href: l.link, target: "_blank", rel: "noopener" }, texto) : texto;
      tr.append(h("td", {}, conteudo));
    }
    corpo.append(tr);
  }
  tabela.append(corpo);
  return tabela;
}

/** TSV: tabulação e quebra de linha dentro de célula quebrariam as colunas ao colar. */
export function resultadoComoTexto(linhas: LinhaResultado[], colunas: ColunaResultado[]): string {
  const limpa = (t: string) => t.replace(/[\t\r\n]+/g, " ");
  return [cabecalho(colunas), ...linhas.map((l) => celulas(l, colunas))].map((l) => l.map(limpa).join("\t")).join("\n");
}

/** Escapa texto e atributo: o HTML vai para a área de transferência e é colado em outros editores. */
function esc(t: string): string {
  return t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

export function resultadoComoHtml(linhas: LinhaResultado[], colunas: ColunaResultado[]): string {
  const cab = `<tr>${cabecalho(colunas)
    .map((t) => `<th>${esc(t)}</th>`)
    .join("")}</tr>`;
  const corpo = linhas.map((l) => {
    const tds = colunas.map((c) => {
      const texto = esc(l.campos[c.chave] ?? "");
      return `<td>${c.comoLink && l.link ? `<a href="${esc(l.link)}">${texto}</a>` : texto}</td>`;
    });
    return `<tr><td>${esc(rotuloDaLinha(l))}</td>${tds.join("")}</tr>`;
  });
  return `<table><thead>${cab}</thead><tbody>${corpo.join("")}</tbody></table>`;
}

export function resultadoComoCsv(linhas: LinhaResultado[], colunas: ColunaResultado[]): string {
  return gerarCsv([cabecalho(colunas), ...linhas.map((l) => celulas(l, colunas))]);
}

/** Cópia rica (HTML com links + texto) quando o navegador permite; senão só texto. */
export async function copiarResultado(
  linhas: LinhaResultado[],
  colunas: ColunaResultado[],
  clip: { write?: (i: ClipboardItem[]) => Promise<void>; writeText(t: string): Promise<void> },
  Item?: typeof ClipboardItem,
): Promise<"rico" | "texto"> {
  const texto = resultadoComoTexto(linhas, colunas);
  if (clip.write && Item) {
    const html = resultadoComoHtml(linhas, colunas);
    await clip.write([
      new Item({
        "text/html": new Blob([html], { type: "text/html" }),
        "text/plain": new Blob([texto], { type: "text/plain" }),
      }),
    ]);
    return "rico";
  }
  await clip.writeText(texto);
  return "texto";
}
