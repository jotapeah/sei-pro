export interface CsvLido {
  colunas: string[];
  registros: Record<string, string>[];
  codificacao: "utf-8" | "windows-1252";
}

function decodificar(bytes: Uint8Array): { texto: string; codificacao: CsvLido["codificacao"] } {
  let texto: string;
  let codificacao: CsvLido["codificacao"] = "utf-8";
  try {
    texto = new TextDecoder("utf-8", { fatal: true }).decode(bytes);
  } catch {
    texto = new TextDecoder("windows-1252").decode(bytes);
    codificacao = "windows-1252";
  }
  return { texto: texto.replace(/^﻿/, ""), codificacao };
}

/** Separador pela primeira linha fora de aspas: o mais frequente entre `;` `,` e tab (empate: `;`). */
function detectarSeparador(texto: string): string {
  const cont: Record<string, number> = { ";": 0, ",": 0, "\t": 0 };
  let aspas = false;
  for (const c of texto) {
    if (c === '"') aspas = !aspas;
    else if (!aspas) {
      if (c === "\n" || c === "\r") break;
      if (c in cont) cont[c] = (cont[c] as number) + 1;
    }
  }
  let melhor = ";";
  for (const s of [",", "\t"]) if ((cont[s] as number) > (cont[melhor] as number)) melhor = s;
  return melhor;
}

/** Máquina de estados RFC 4180: aspas, aspas duplas escapadas e quebra de linha dentro da célula. */
function separarLinhas(texto: string, sep: string): string[][] {
  const linhas: string[][] = [];
  let linha: string[] = [];
  let cel = "";
  let aspas = false;
  const fecharLinha = (): void => {
    linha.push(cel);
    linhas.push(linha);
    linha = [];
    cel = "";
  };
  for (let i = 0; i < texto.length; i++) {
    const c = texto[i] as string;
    if (aspas) {
      if (c === '"') {
        if (texto[i + 1] === '"') {
          cel += '"';
          i++;
        } else aspas = false;
      } else cel += c;
    } else if (c === '"') aspas = true;
    else if (c === sep) {
      linha.push(cel);
      cel = "";
    } else if (c === "\n" || c === "\r") {
      if (c === "\r" && texto[i + 1] === "\n") i++;
      fecharLinha();
    } else cel += c;
  }
  if (cel !== "" || linha.length > 0) fecharLinha();
  return linhas;
}

/** Lê um CSV (UTF-8 estrito, senão Windows-1252) em colunas e registros. Nunca lança por conteúdo vazio. */
export function lerCsv(bytes: Uint8Array): CsvLido {
  const { texto, codificacao } = decodificar(bytes);
  const linhas = separarLinhas(texto, detectarSeparador(texto)).filter((l) => l.some((c) => c.trim() !== ""));
  const cabecalho = linhas.shift();
  if (!cabecalho) return { colunas: [], registros: [], codificacao };

  const contagem = new Map<string, number>();
  const mapa: { indice: number; nome: string }[] = [];
  cabecalho.forEach((bruto, indice) => {
    const base = bruto.trim();
    if (!base) return;
    const n = (contagem.get(base) ?? 0) + 1;
    contagem.set(base, n);
    mapa.push({ indice, nome: n === 1 ? base : `${base} (${n})` });
  });
  const registros = linhas.map((l) => {
    const reg: Record<string, string> = {};
    for (const { indice, nome } of mapa) reg[nome] = l[indice] ?? "";
    return reg;
  });
  return { colunas: mapa.map((m) => m.nome), registros, codificacao };
}
