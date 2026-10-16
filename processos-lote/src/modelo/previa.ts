import { MAX_ESPECIFICACAO } from "./constantes";
import { paraLatin1 } from "./latin1";
import type { LinhaLote } from "./linhas";

export { estimarDuracao, limitarPausa } from "./estimativa";

export type AvisoLinha = "duplicada" | "vazia" | "truncada" | "convertida";

export interface LinhaPrevia {
  /** Posicao da linha na lista, comecando em 1. */
  indice: number;
  original: string;
  /** O que sera de fato postado no SEI: ja em latin-1, cortado em 100 e sem espacos nas pontas. */
  enviada: string;
  avisos: AvisoLinha[];
}

/** Mostra, antes de criar, o que cada linha vira e o que merece atencao. */
export function montarPrevia(linhas: LinhaLote[]): LinhaPrevia[] {
  const vistas = new Set<string>();
  return linhas.map((l, i) => {
    const original = l.especificacao;
    const convertida = paraLatin1(original);
    const enviada = convertida.slice(0, MAX_ESPECIFICACAO).trim();
    const avisos: AvisoLinha[] = [];
    if (convertida !== original) avisos.push("convertida");
    if (convertida.trim().length > MAX_ESPECIFICACAO) avisos.push("truncada");
    if (enviada === "") avisos.push("vazia");
    else {
      // Duplicada = a segunda ocorrencia do que seria enviado; a primeira nao leva aviso.
      if (vistas.has(enviada)) avisos.push("duplicada");
      vistas.add(enviada);
    }
    return { indice: i + 1, original, enviada, avisos };
  });
}
