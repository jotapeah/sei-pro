/**
 * A regra de sigilo do envelope (decisão 10 da P4), num lugar só: o que vai ao
 * Texto Padrão (`paraOTexto`) e a mescla que recebe de volta (`importar`) têm de
 * concordar sobre o que é sigiloso, senão quem tem o número o perde na volta.
 *
 * Um número marcado sigiloso em qualquer projeto ou etapa (viva ou lápide) é
 * sigiloso em todos, comparado pelos dígitos (`chaveProtocolo`): "50300.000777/2026-10"
 * sem marca num projeto é sigiloso se outro o marcou. Etapa sigilosa = processo
 * próprio sigiloso, ou nenhum processo próprio num projeto sigiloso.
 */

import type { Vinculo } from "./tipos";
import { chaveProtocolo } from "./vinculos";

export interface SigiloDoEnvelope {
  /** Os dígitos (`chaveProtocolo`) de cada número marcado sigiloso; o vínculo vazio do texto não entra. */
  chaves: ReadonlySet<string>;
  /** Ids dos projetos com vínculo sigiloso por esta regra. */
  projetos: ReadonlySet<string>;
  /** Ids das etapas sigilosas por esta regra. */
  etapas: ReadonlySet<string>;
  /** O vínculo é sigiloso: marcado, ou o mesmo número (pelos dígitos) marcado noutro lugar. */
  vinculo(v: Vinculo | undefined): boolean;
}

const objeto = (x: unknown): x is Record<string, unknown> => !!x && typeof x === "object" && !Array.isArray(x);

/** O vínculo de um item qualquer (o de fora pode vir torto): só quando tem a forma de vínculo. */
function vinculoDe(x: unknown): Vinculo | undefined {
  if (!objeto(x)) return undefined;
  const v = x.processo;
  return objeto(v) && typeof v.protocolo === "string" ? (v as unknown as Vinculo) : undefined;
}

/**
 * A regra aplicada a `projetos` e `etapas` (com lápides; item torto é ignorado, sem lançar). Todos os
 * itens entram nas chaves; um id que aparece mais de uma vez (a versão daqui e a de fora, na mescla)
 * é sigiloso se qualquer versão for.
 */
export function sigiloDoEnvelope(projetos: readonly unknown[], etapas: readonly unknown[]): SigiloDoEnvelope {
  const chaves = new Set<string>();
  for (const x of [...projetos, ...etapas]) {
    const v = vinculoDe(x);
    const k = v?.sigiloso === true ? chaveProtocolo(v.protocolo) : "";
    if (k) chaves.add(k);
  }
  const vinculo = (v: Vinculo | undefined): boolean => !!v && (v.sigiloso === true || chaves.has(chaveProtocolo(v.protocolo)));
  const idsProjetos = new Set<string>();
  for (const x of projetos) if (objeto(x) && typeof x.id === "string" && vinculo(vinculoDe(x))) idsProjetos.add(x.id);
  const idsEtapas = new Set<string>();
  for (const x of etapas) {
    if (!objeto(x) || typeof x.id !== "string") continue;
    const v = vinculoDe(x);
    if (v ? vinculo(v) : typeof x.projeto === "string" && idsProjetos.has(x.projeto)) idsEtapas.add(x.id);
  }
  return { chaves, projetos: idsProjetos, etapas: idsEtapas, vinculo };
}
