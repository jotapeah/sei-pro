/**
 * Memória local do sigilo (rodada 2 da Tarefa 4): o que este computador já soube sigiloso, por usuário
 * (`host|login`), valendo para TODOS os escopos dele ("Só eu" e "Toda a unidade"). Dois conjuntos: as
 * chaves de processo (`chaveProtocolo`) e os números de documento.
 *
 * - Entra: todo vínculo que fica (ou já está) marcado sigiloso, todo documento marcado e o número que um
 *   registro de mesmo carimbo chega raspado de fora (`aprendidoDosRegistros`). Nada sai.
 * - Nunca é enviada: fica em `chaveMemoriaSigilo(host, login)` = `projetos/sigilo/<host>|<login>`, fora de
 *   todo escopo; o envelope (Texto Padrão, arquivo, Agente) só a usa para raspar, junto da regra deduzida
 *   (`sigiloDoEnvelope`). Assim, trocar o último processo marcado, perder a lápide na poda ou ter o número
 *   num escopo e digitá-lo no outro não o solta de novo.
 * - Teto de `TETO_MEMORIA_SIGILO` (5000) por conjunto, do mais antigo ao mais novo: acima, saem os mais
 *   antigos. Um número que saiu e ainda está num vínculo ou documento marcado volta na gravação seguinte;
 *   um que só estava num registro volta quando o colega o devolve raspado.
 */

import type { SigilosConhecidos } from "./sigilo";

export const TETO_MEMORIA_SIGILO = 5000;

/** A forma guardada: cada lista do mais antigo ao mais novo, sem repetir. */
export interface MemoriaSigilo {
  processos: string[];
  documentos: string[];
}

/** O que está guardado (o que vier torto vira lista vazia; só textos não vazios, sem repetir). */
export function lerMemoria(bruto: unknown): MemoriaSigilo {
  const o = bruto && typeof bruto === "object" && !Array.isArray(bruto) ? (bruto as Record<string, unknown>) : {};
  const lista = (x: unknown): string[] =>
    Array.isArray(x) ? [...new Set(x.filter((v): v is string => typeof v === "string" && v.length > 0))] : [];
  return { processos: lista(o.processos), documentos: lista(o.documentos) };
}

/** A memória com os `novos` somados no fim (teto: saem os mais antigos), ou null se nada muda. */
export function somarMemoria(
  atual: MemoriaSigilo,
  novos: { processos: Iterable<string>; documentos: Iterable<string> },
  teto: number = TETO_MEMORIA_SIGILO,
): MemoriaSigilo | null {
  let mudou = false;
  const somar = (lista: readonly string[], mais: Iterable<string>): string[] => {
    const ja = new Set(lista);
    const r = [...lista];
    for (const x of mais) {
      if (!x || ja.has(x)) continue;
      ja.add(x);
      r.push(x);
      mudou = true;
    }
    if (r.length <= teto) return r;
    mudou = true;
    return r.slice(r.length - teto);
  };
  const processos = somar(atual.processos, novos.processos);
  const documentos = somar(atual.documentos, novos.documentos);
  return mudou ? { processos, documentos } : null;
}

export function conhecidosDe(m: MemoriaSigilo): SigilosConhecidos {
  return { processos: new Set(m.processos), documentos: new Set(m.documentos) };
}
