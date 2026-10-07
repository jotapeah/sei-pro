/**
 * Memória local do sigilo (rodadas 2 e 3 da Tarefa 4): o que este computador já soube sigiloso, por usuário
 * (`host|login`), valendo para TODOS os escopos dele ("Só eu" e "Toda a unidade"). Dois conjuntos: as chaves
 * de processo (`chaveProtocolo`) e os números de documento. O envelope raspa pela união dela com a regra
 * deduzida (`sigiloDoEnvelope`): o que o texto raspou uma vez continua raspado.
 *
 * - Nunca é enviada: fica sob `prefixoMemoriaSigilo(host, login)` = `projetos/sigilo/<host>|<login>/`,
 *   fora de todo escopo, UMA CHAVE POR NÚMERO (`p/<chave>`, `d/<número>`), com a origem no valor. Gravar
 *   uma entrada nunca reescreve as outras: dois contextos (o app e a aba) somando ao mesmo tempo não se
 *   apagam (com uma chave só, a última gravação levava o que a outra tinha somado).
 * - Origem: "local" (marcada aqui, pela caixa ou pelo vínculo, ou raspada na montagem do texto, na gravação
 *   ou na poda) ou "aprendida" (vinda de fora: cópia ou registro de um colega, na mescla). Uma aprendida que
 *   depois é vista numa gravação daqui vira local.
 * - Nada é despejado, nunca: um colega não consegue empurrar para fora um número sigiloso de verdade.
 *   As locais não têm teto. As aprendidas têm teto de `TETO_APRENDIDAS` (20000) por conjunto: com ele cheio,
 *   uma aprendida nova simplesmente não entra. Custo: este computador não fica sabendo do sigilo desse número
 *   pelo colega; se só o colega sabe (só ele o raspa), o número continua indo no texto gravado daqui e os dois
 *   regravam o texto a cada rodada (o vai-e-volta da rodada 1), até ele ser visto aqui.
 * - Falha fechada: a leitura que não dá (erro do storage) lança; a chave única da rodada 2
 *   (`chaveMemoriaSigiloLegada`) é lida como locais, e se estiver torta com algo dentro lança
 *   `ErroMemoriaSigilo` (só a torta sem nada dentro conta como vazia). Numa entrada por número, o valor torto
 *   não perde nada (o número está na chave): ela conta como local.
 */

import type { SigilosConhecidos } from "./sigilo";

export const TETO_APRENDIDAS = 20_000;

export type OrigemSigilo = "local" | "aprendida";

export interface MemoriaSigilo {
  processos: ReadonlyMap<string, OrigemSigilo>;
  documentos: ReadonlyMap<string, OrigemSigilo>;
}

export interface NumerosSigilosos {
  processos: Iterable<string>;
  documentos: Iterable<string>;
}

/** A memória do sigilo não pôde ser lida: a sincronia para (não monta o texto sem ela). */
export class ErroMemoriaSigilo extends Error {
  constructor() {
    super("A memória do sigilo dos projetos neste navegador está ilegível. A sincronia parou para não enviar número de processo sigiloso.");
    this.name = "ErroMemoriaSigilo";
  }
}

/** Número que cabe numa entrada: texto de 1 a 64 caracteres (os de verdade têm até 40). */
const numeroValido = (x: unknown): x is string => typeof x === "string" && x.length > 0 && x.length <= 64;

/** Há algo que poderia ser um número (texto ou número em qualquer nível)? */
function temConteudo(x: unknown): boolean {
  if (typeof x === "string") return x.length > 0;
  if (typeof x === "number") return true;
  if (Array.isArray(x)) return x.some(temConteudo);
  if (x && typeof x === "object") return Object.values(x).some(temConteudo);
  return false;
}

/** As chaves do storage que são da memória deste usuário (as entradas e a chave única da rodada 2). */
export function daMemoria(chave: string, prefixo: string, legada: string): boolean {
  return chave === legada || chave.startsWith(prefixo);
}

/**
 * A memória a partir das chaves lidas do storage (`itens` pode ter outras: são ignoradas). Lança
 * `ErroMemoriaSigilo` se a chave única da rodada 2 estiver torta com algo dentro.
 */
export function lerMemoria(itens: Record<string, unknown>, prefixo: string, legada: string): MemoriaSigilo {
  const processos = new Map<string, OrigemSigilo>();
  const documentos = new Map<string, OrigemSigilo>();
  const pos = (m: Map<string, OrigemSigilo>, n: string, o: OrigemSigilo) => {
    if (m.get(n) !== "local") m.set(n, o);
  };
  for (const [k, v] of Object.entries(itens)) {
    if (k === legada) {
      for (const [campo, m] of [
        ["processos", processos],
        ["documentos", documentos],
      ] as const) {
        for (const n of numerosDaLegada(v, campo)) pos(m, n, "local");
      }
      continue;
    }
    if (!k.startsWith(prefixo)) continue;
    const resto = k.slice(prefixo.length);
    const conjunto = resto.startsWith("p/") ? processos : resto.startsWith("d/") ? documentos : null;
    const numero = resto.slice(2);
    // Tipo que esta versão não conhece (de uma versão mais nova) ou número vazio: nada a usar aqui, e nunca é regravado.
    if (!conjunto || !numero) continue;
    pos(conjunto, numero, v === "aprendida" ? "aprendida" : "local");
  }
  return { processos, documentos };
}

/** Os números de uma lista da chave única da rodada 2; torta com conteúdo lança. */
function numerosDaLegada(v: unknown, campo: "processos" | "documentos"): string[] {
  if (v === undefined || v === null) return [];
  const o = v && typeof v === "object" && !Array.isArray(v) ? (v as Record<string, unknown>) : null;
  const forma =
    !!o &&
    Object.keys(o).every((k) => k === "processos" || k === "documentos" || !temConteudo(o[k])) &&
    ["processos", "documentos"].every((k) => o[k] === undefined || (Array.isArray(o[k]) && (o[k] as unknown[]).every(numeroValido)));
  if (!forma) {
    if (temConteudo(v)) throw new ErroMemoriaSigilo();
    return [];
  }
  return ((o[campo] as string[] | undefined) ?? []).slice();
}

/**
 * As entradas a gravar para guardar `novos` com a `origem`, sem nunca tirar nada:
 * - "local": entra o que falta; com `promover`, a aprendida que já estava vira local (vista aqui);
 * - "aprendida": entra o que falta, enquanto as aprendidas daquele conjunto não chegam ao `teto`.
 * Devolve só o que muda (chave completa → origem).
 */
export function entradasParaGravar(
  atual: MemoriaSigilo,
  novos: NumerosSigilosos,
  origem: OrigemSigilo,
  prefixo: string,
  o: { promover?: boolean; teto?: number } = {},
): Record<string, OrigemSigilo> {
  const teto = o.teto ?? TETO_APRENDIDAS;
  const saida: Record<string, OrigemSigilo> = {};
  for (const [letra, campo] of [
    ["p", "processos"],
    ["d", "documentos"],
  ] as const) {
    const m = new Map(atual[campo]);
    let aprendidas = [...m.values()].filter((x) => x === "aprendida").length;
    for (const n of novos[campo]) {
      if (!numeroValido(n)) continue;
      const ja = m.get(n);
      if (origem === "local") {
        if (ja === "local" || (ja === "aprendida" && !o.promover)) continue;
        if (ja === "aprendida") aprendidas--;
        m.set(n, "local");
        saida[`${prefixo}${letra}/${n}`] = "local";
      } else {
        if (ja !== undefined || aprendidas >= teto) continue;
        aprendidas++;
        m.set(n, "aprendida");
        saida[`${prefixo}${letra}/${n}`] = "aprendida";
      }
    }
  }
  return saida;
}

/** A memória com as `entradas` (de `entradasParaGravar`) aplicadas. */
export function comEntradas(atual: MemoriaSigilo, entradas: Record<string, OrigemSigilo>, prefixo: string): MemoriaSigilo {
  const processos = new Map(atual.processos);
  const documentos = new Map(atual.documentos);
  for (const [k, v] of Object.entries(entradas)) {
    const resto = k.slice(prefixo.length);
    (resto.startsWith("p/") ? processos : documentos).set(resto.slice(2), v);
  }
  return { processos, documentos };
}

export function conhecidosDe(m: MemoriaSigilo): SigilosConhecidos {
  return { processos: new Set(m.processos.keys()), documentos: new Set(m.documentos.keys()) };
}
