import {
  type ColunaResultado,
  copiarResultado,
  type LinhaResultado,
  montarTabelaResultado,
  resultadoComoCsv,
  resultadoComoHtml,
  resultadoComoTexto,
  rotuloSituacao,
} from "../src/ui/tabelaResultado";
import { checar, instalarDom, secao } from "./util";

export async function verificarTabelaResultado(): Promise<void> {
  const doc = instalarDom();
  const colunas: ColunaResultado[] = [
    { chave: "numero", titulo: "Numero", comoLink: true },
    { chave: "nota", titulo: "Nota" },
  ];
  const linhas: LinhaResultado[] = [
    { situacao: "ok", campos: { numero: "50300.1/2026-10", nota: "=SOMA(1)" }, link: "https://sei/x?a=1&b=2" },
    { situacao: "nao-encontrado", campos: { numero: "<b>x</b>", nota: 'diz "oi" & tchau' }, link: 'https://sei/"><script>' },
    { situacao: "sem-acesso", campos: { numero: "3", nota: "" } },
  ];

  secao("tabela de resultado: rotulos e tabela");
  checar("rotulo de nao encontrado", rotuloSituacao("nao-encontrado") === "Não encontrado");
  checar("rotulo de pendente", rotuloSituacao("pendente") === "Pendente");
  const tab = montarTabelaResultado(doc, linhas, colunas);
  checar("uma linha de corpo por resultado", tab.querySelectorAll("tbody tr").length === 3);
  checar("situacao aparece como texto", (tab.querySelectorAll("tbody tr")[1]?.textContent ?? "").includes("Não encontrado"));
  checar("texto com marcacao nao vira elemento", tab.querySelector("b") === null);

  secao("tabela de resultado: texto, html e csv");
  const tsv = resultadoComoTexto(linhas, colunas).split("\n");
  checar("TSV tem cabecalho com situacao", tsv[0] === "Situação\tNumero\tNota", tsv[0]);
  checar("TSV com uma linha por resultado", tsv.length === 4);
  const html = resultadoComoHtml(linhas, colunas);
  checar("html escapa o texto", html.includes("&lt;b&gt;x&lt;/b&gt;") && !html.includes("<b>x"));
  checar("html escapa aspas e & no texto", html.includes("diz &quot;oi&quot; &amp; tchau"));
  checar("html escapa o href", html.includes('href="https://sei/&quot;&gt;&lt;script&gt;"') && !html.includes("<script>"));
  checar("html escapa & do href", html.includes('href="https://sei/x?a=1&amp;b=2"'));
  checar("coluna comoLink sem link fica texto", html.includes("<td>3</td>"));
  const csv = resultadoComoCsv(linhas, colunas);
  checar("csv neutraliza = inicial", csv.includes("'=SOMA(1)"));
  checar("csv tem BOM e separador ;", csv.startsWith("﻿") && csv.includes("Situação;Numero;Nota"));

  secao("tabela de resultado: copiar");
  const chamadas: string[] = [];
  class ItemFalso {
    constructor(public tipos: Record<string, Blob>) {}
  }
  const clip = {
    write: async (i: unknown[]) => {
      chamadas.push(`write:${Object.keys((i[0] as ItemFalso).tipos).join(",")}`);
    },
    writeText: async (t: string) => {
      chamadas.push(`texto:${t.split("\n").length}`);
    },
  };
  const r1 = await copiarResultado(linhas, colunas, clip, ItemFalso as unknown as typeof ClipboardItem);
  checar("copia rica com html e plain", r1 === "rico" && chamadas[0] === "write:text/html,text/plain", chamadas);
  const r2 = await copiarResultado(linhas, colunas, { writeText: clip.writeText });
  checar("sem write cai no texto", r2 === "texto" && chamadas[1] === "texto:4", chamadas);
  const r3 = await copiarResultado(linhas, colunas, clip);
  checar("sem Item cai no texto", r3 === "texto");
}
