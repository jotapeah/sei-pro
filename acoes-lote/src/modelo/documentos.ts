/** Linhas da tabela de documentos e a elegibilidade estática de cada ação. Funções puras, sem DOM. */

import type { Arvore, NivelAcesso } from "@nucleo/dominio/arvore";
import { ACOES, type AcaoId } from "./acoes";

export interface LinhaDoc {
  id: string;
  numero: string;
  titulo: string;
  /** O título sem o número final ("Despacho 12" vira "Despacho"). */
  tipo: string;
  externo: boolean;
  formato: string;
  nivel: NivelAcesso;
  assinado: boolean;
  assinaturas: string[];
  cancelado: boolean;
  /** Unidade geradora. */
  unidade: string;
  pasta: string | null;
  /** A árvore não traz a data; a prévia (Task 6) a preenche. */
  data?: string;
  /**
   * Link assinado do documento na árvore, colhido da página (para o resultado). Leva o infra_hash: só vive na
   * memória, o lote persistido nunca o grava.
   */
  link?: string;
}

/** "Despacho 12" -> "Despacho"; títulos sem número no fim ficam como estão. */
function tipoDoTitulo(titulo: string): string {
  const t = titulo.replace(/\s+\d+$/, "").trim();
  return t || titulo.trim();
}

export function linhasDaArvore(a: Arvore): LinhaDoc[] {
  return a.documentos.map((d) => ({
    id: d.id,
    numero: d.numero,
    titulo: d.titulo,
    tipo: tipoDoTitulo(d.titulo),
    externo: d.externo,
    formato: d.formato,
    nivel: d.nivel,
    assinado: d.assinado,
    assinaturas: d.assinaturas,
    cancelado: d.cancelado,
    unidade: d.unidadeGeradora ?? "",
    pasta: d.pasta,
    ...(d.link ? { link: d.link } : {}),
  }));
}

export type Elegibilidade = { ok: true } | { ok: false; motivo: string };

export const MOTIVO_SIGILOSO = "Sigiloso: fora das Ações em Lote";

/** Parte estática da elegibilidade; o resto o SEI decide na prévia. Ordem: sigiloso, cancelado, regra da ação. */
export function elegivel(acao: AcaoId, l: LinhaDoc, processoSigiloso: boolean): Elegibilidade {
  if (processoSigiloso || l.nivel === "sigiloso") return { ok: false, motivo: MOTIVO_SIGILOSO };
  if (l.cancelado && acao !== "baixar") return { ok: false, motivo: "Documento cancelado" };
  if (acao === "duplicar" && l.externo) return { ok: false, motivo: "Só documento interno pode ser duplicado" };
  if (acao === "cancelar-assinatura" && !l.assinado) return { ok: false, motivo: "Documento sem assinatura" };
  if (acao === "assinar" && l.externo) return { ok: false, motivo: "Documento externo não se assina no SEI" };
  return { ok: true };
}

export function contarPorAcao(sel: LinhaDoc[], processoSigiloso: boolean): Record<AcaoId, number> {
  const r = {} as Record<AcaoId, number>;
  for (const { id } of ACOES) r[id] = sel.filter((l) => elegivel(id, l, processoSigiloso).ok).length;
  return r;
}
