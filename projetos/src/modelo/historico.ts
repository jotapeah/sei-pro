/**
 * Histórico de alterações (spec 5.4): cada edição local vira registros por
 * campo relevante. Os valores são texto (datas em "AAAA-MM-DD"; a tela formata).
 * Processo sigiloso entra como "processo sigiloso": o registro vai para o
 * Texto Padrão da unidade e o número não pode ir junto.
 */

import type { CampoHistorico, Carimbo, Etapa, Fase, Projeto, Registro, Vinculo } from "./tipos";

export interface RegistroNovo {
  alvo: string;
  projeto: string;
  campo: CampoHistorico;
  antes?: string;
  depois?: string;
}

export interface ApoioHistorico {
  nomeDaFase(id: string): string | undefined;
  nomeDaEtapa(id: string): string | undefined;
}

export const SEM_APOIO: ApoioHistorico = { nomeDaFase: () => undefined, nomeDaEtapa: () => undefined };

export function textoDoVinculo(v: Vinculo | undefined): string | undefined {
  if (!v) return undefined;
  return v.sigiloso ? "processo sigiloso" : v.protocolo || undefined;
}

function ciclo<T extends { removidoEm?: number }>(
  antes: T | undefined,
  depois: T | undefined,
  alvo: string,
  projeto: string,
  nome: (x: T) => string,
): RegistroNovo[] | null {
  if (!antes && depois) return [{ alvo, projeto, campo: "criacao", depois: nome(depois) }];
  if (antes && depois && antes.removidoEm === undefined && depois.removidoEm !== undefined)
    return [{ alvo, projeto, campo: "exclusao", antes: nome(antes) }];
  if (antes && depois && antes.removidoEm !== undefined && depois.removidoEm === undefined)
    return [{ alvo, projeto, campo: "restauracao", depois: nome(depois) }];
  if (!antes || !depois) return [];
  return null;
}

function campo(saida: RegistroNovo[], alvo: string, projeto: string, c: CampoHistorico, antes?: string, depois?: string): void {
  if ((antes ?? "") !== (depois ?? "")) saida.push({ alvo, projeto, campo: c, antes, depois });
}

export function registrosDeEtapa(antes: Etapa | undefined, depois: Etapa | undefined, apoio: ApoioHistorico = SEM_APOIO): RegistroNovo[] {
  const ref = depois ?? antes;
  if (!ref) return [];
  const pronto = ciclo(antes, depois, ref.id, ref.projeto, (e) => e.nome);
  if (pronto) return pronto;
  const a = antes!;
  const d = depois!;
  const saida: RegistroNovo[] = [];
  const reg = (c: CampoHistorico, x?: string, y?: string) => campo(saida, d.id, d.projeto, c, x, y);
  reg("nome", a.nome, d.nome);
  reg("inicio", a.inicio, d.inicio);
  if (!d.marco) reg("fim", a.fim, d.fim);
  reg("responsavel", a.responsavel?.nome, d.responsavel?.nome);
  reg("conclusao", a.concluidaEm, d.concluidaEm);
  if (d.medida === "manual" && a.progresso !== d.progresso) reg("progresso", String(a.progresso), String(d.progresso));
  const nomeFase = (id?: string) => (id ? (apoio.nomeDaFase(id) ?? "") : undefined);
  reg("fase", nomeFase(a.fase), nomeFase(d.fase));
  const deps = (ids: string[]) =>
    ids.length
      ? ids
          .map((id) => apoio.nomeDaEtapa(id) ?? id)
          .sort((x, y) => x.localeCompare(y, "pt-BR"))
          .join("; ")
      : undefined;
  if ([...a.dependeDe].sort().join() !== [...d.dependeDe].sort().join()) reg("dependencias", deps(a.dependeDe), deps(d.dependeDe));
  reg("processo", textoDoVinculo(a.processo), textoDoVinculo(d.processo));
  reg("documento", a.documento?.numero, d.documento?.numero);
  const datasIguais = a.inicio === d.inicio && a.fim === d.fim;
  const textoBase = (e: Etapa) => (e.base ? `${e.base.inicio}/${e.base.fim}` : undefined);
  if (datasIguais) reg("base", textoBase(a), textoBase(d));
  return saida;
}

export function registrosDeProjeto(antes: Projeto | undefined, depois: Projeto | undefined): RegistroNovo[] {
  const ref = depois ?? antes;
  if (!ref) return [];
  const pronto = ciclo(antes, depois, ref.id, ref.id, (p) => p.nome);
  if (pronto) return pronto;
  const a = antes!;
  const d = depois!;
  const saida: RegistroNovo[] = [];
  campo(saida, d.id, d.id, "nome", a.nome, d.nome);
  campo(saida, d.id, d.id, "processo", textoDoVinculo(a.processo), textoDoVinculo(d.processo));
  if ((a.arquivadoEm === undefined) !== (d.arquivadoEm === undefined))
    saida.push({ alvo: d.id, projeto: d.id, campo: "arquivamento", depois: d.arquivadoEm === undefined ? "reativado" : "arquivado" });
  return saida;
}

export function registrosDeFase(antes: Fase | undefined, depois: Fase | undefined): RegistroNovo[] {
  const ref = depois ?? antes;
  if (!ref) return [];
  const pronto = ciclo(antes, depois, ref.id, ref.projeto, (f) => f.nome);
  if (pronto) return pronto;
  const saida: RegistroNovo[] = [];
  campo(saida, ref.id, ref.projeto, "nome", antes!.nome, depois!.nome);
  return saida;
}

export function carimbarRegistros(novos: readonly RegistroNovo[], c: Carimbo, novoId: () => string): Registro[] {
  return novos.map((r) => {
    const reg: Registro = {
      id: novoId(),
      ...r,
      quando: c.agora,
      por: c.por ?? "",
      atualizadoEm: c.agora,
      dispositivo: c.dispositivo,
    };
    if (c.nome) reg.nome = c.nome;
    if (c.por) reg.alteradoPor = c.por;
    if (reg.antes === undefined) delete reg.antes;
    if (reg.depois === undefined) delete reg.depois;
    return reg;
  });
}

/** Os `limite` mais recentes ficam; os ids dos outros saem (sem lápide: o histórico só acrescenta). */
export function excedentes(registros: readonly Registro[], limite: number): string[] {
  const vivos = registros.filter((r) => r.removidoEm === undefined);
  if (vivos.length <= limite) return [];
  const ordenados = [...vivos].sort((x, y) => y.quando - x.quando || (x.id < y.id ? -1 : x.id > y.id ? 1 : 0));
  return ordenados.slice(limite).map((r) => r.id);
}
