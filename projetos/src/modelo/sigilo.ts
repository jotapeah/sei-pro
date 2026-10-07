/**
 * A regra de sigilo do envelope (decisão 10 da P4), num lugar só: o que vai ao
 * Texto Padrão (`paraOTexto`) e a mescla que recebe de volta (`importar`) têm de
 * concordar sobre o que é sigiloso, senão quem tem o número o perde na volta.
 *
 * Um número marcado sigiloso em qualquer projeto ou etapa (viva ou lápide) é
 * sigiloso em todos, comparado pelos dígitos (`chaveProtocolo`): "50300.000777/2026-10"
 * sem marca num projeto é sigiloso se outro o marcou. Etapa sigilosa = processo
 * próprio sigiloso, ou nenhum processo próprio num projeto sigiloso. Documento
 * marcado sigiloso não vai, e o número dele é sigiloso nos registros.
 *
 * O sigilo gruda (rodada 1 da Tarefa 4): o que a regra deduz vira marca GRAVADA
 * no vínculo e no documento daqui (`marcasDeSigilo`), sem mudar o carimbo (todo
 * computador que conhece o número chega à mesma marca), e ela não sai mais. Assim
 * trocar o processo do projeto, perder a lápide na poda ou receber só o vínculo
 * vazio de um colega não solta o número de novo.
 */

import type { DocumentoSei, Etapa, Projeto, Registro, Vinculo } from "./tipos";
import { chaveProtocolo } from "./vinculos";

/** O que vai no texto no lugar do número de um processo sigiloso (o histórico novo já nasce assim: historico.ts). */
export const SIGILOSO_PROCESSO = "processo sigiloso";
/** O que vai no texto no lugar do número de um documento de processo sigiloso. */
export const SIGILOSO_DOCUMENTO = "documento de processo sigiloso";

export interface SigiloDoEnvelope {
  /** Os dígitos (`chaveProtocolo`) de cada número marcado sigiloso; o vínculo vazio do texto não entra. */
  chaves: ReadonlySet<string>;
  /** Ids dos projetos com vínculo sigiloso por esta regra. */
  projetos: ReadonlySet<string>;
  /** Ids das etapas sigilosas por esta regra. */
  etapas: ReadonlySet<string>;
  /** Números dos documentos marcados sigilosos (em qualquer etapa, viva ou lápide). */
  documentos: ReadonlySet<string>;
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

/** O documento de um item qualquer: só quando tem a forma de documento. */
function documentoDe(x: unknown): DocumentoSei | undefined {
  if (!objeto(x)) return undefined;
  const d = x.documento;
  return objeto(d) && typeof d.numero === "string" ? (d as unknown as DocumentoSei) : undefined;
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
  // O vínculo pode vir de fora (texto editado à mão) com o número que não é texto: não é sigiloso, salvo marcado.
  const vinculo = (v: Vinculo | undefined): boolean =>
    !!v && (v.sigiloso === true || (typeof v.protocolo === "string" && chaves.has(chaveProtocolo(v.protocolo))));
  const idsProjetos = new Set<string>();
  for (const x of projetos) if (objeto(x) && typeof x.id === "string" && vinculo(vinculoDe(x))) idsProjetos.add(x.id);
  const idsEtapas = new Set<string>();
  const documentos = new Set<string>();
  for (const x of etapas) {
    const d = documentoDe(x);
    if (d?.sigiloso === true && d.numero) documentos.add(d.numero);
    if (!objeto(x) || typeof x.id !== "string") continue;
    const v = vinculoDe(x);
    if (v ? vinculo(v) : typeof x.projeto === "string" && idsProjetos.has(x.projeto)) idsEtapas.add(x.id);
  }
  return { chaves, projetos: idsProjetos, etapas: idsEtapas, documentos, vinculo };
}

const marcarVinculo = (v: Vinculo): Vinculo => ({ ...v, sigiloso: true });
const marcarDocumento = (d: DocumentoSei): DocumentoSei => ({ ...d, sigiloso: true });

/** A outra versão é a MESMA (mesmo instante e dispositivo): é o mesmo item, talvez raspado pelo envelope. */
const mesmaVersao = (x: Projeto | Etapa, o: unknown): boolean =>
  objeto(o) && o.atualizadoEm === x.atualizadoEm && o.dispositivo === x.dispositivo;

/** O vínculo de fora (marcado) fala do mesmo processo que o daqui: vazio (raspado) ou o mesmo número. */
function mesmoProcesso(aqui: Vinculo, fora: Vinculo): boolean {
  if (aqui.idProcedimento && fora.idProcedimento && aqui.idProcedimento !== fora.idProcedimento) return false;
  return !fora.protocolo || chaveProtocolo(fora.protocolo) === chaveProtocolo(aqui.protocolo);
}

/** A marca do vínculo que outra versão igual traz (quem gravou o texto sabia do sigilo; aqui, talvez não). */
function vinculoDaMesmaVersao<T extends Projeto | Etapa>(x: T, outras: readonly unknown[]): T {
  const v = x.processo;
  if (!v || v.sigiloso) return x;
  for (const o of outras) {
    const f = mesmaVersao(x, o) ? vinculoDe(o) : undefined;
    if (f?.sigiloso === true && mesmoProcesso(v, f)) return { ...x, processo: marcarVinculo(v) };
  }
  return x;
}

/** O documento que outra versão igual não traz (o envelope o tirou: era sigiloso) ou traz marcado. */
function documentoDaMesmaVersao(x: Etapa, outras: readonly unknown[]): Etapa {
  const d = x.documento;
  if (!d || d.sigiloso) return x;
  for (const o of outras) {
    if (!mesmaVersao(x, o)) continue;
    const f = (o as { documento?: unknown }).documento;
    const od = documentoDe(o);
    if (f === undefined || (od?.sigiloso === true && od.numero === d.numero)) return { ...x, documento: marcarDocumento(d) };
  }
  return x;
}

/**
 * As marcas de sigilo que faltam no estado `final` (projetos e etapas daqui, com lápides, depois da
 * gravação ou da mescla), sem mudar o carimbo. `outras` são as outras versões conhecidas dos mesmos
 * itens (as daqui antes de gravar, as que chegaram de fora): os números marcados nelas contam, e a
 * marca de uma versão igual (mesmo carimbo) vale aqui. Marca o vínculo cujo número é sigiloso, o
 * documento de etapa sigilosa e o documento cujo número foi marcado em qualquer lugar. Devolve só os
 * itens que mudaram; nunca tira marca.
 */
export function marcasDeSigilo(
  final: { p: readonly Projeto[]; e: readonly Etapa[] },
  outras: { p?: readonly unknown[]; e?: readonly unknown[] } = {},
): { p: Projeto[]; e: Etapa[] } {
  const porId = (lista: readonly unknown[] | undefined) => {
    const m = new Map<string, unknown[]>();
    for (const o of lista ?? []) if (objeto(o) && typeof o.id === "string") m.set(o.id, [...(m.get(o.id) ?? []), o]);
    return m;
  };
  const outrasP = porId(outras.p);
  const outrasE = porId(outras.e);
  const p1 = final.p.map((x) => vinculoDaMesmaVersao(x, outrasP.get(x.id) ?? []));
  const e1 = final.e.map((x) => documentoDaMesmaVersao(vinculoDaMesmaVersao(x, outrasE.get(x.id) ?? []), outrasE.get(x.id) ?? []));
  const s = sigiloDoEnvelope([...p1, ...(outras.p ?? [])], [...e1, ...(outras.e ?? [])]);
  const p2 = p1.map((x) =>
    x.processo && !x.processo.sigiloso && s.vinculo(x.processo) ? { ...x, processo: marcarVinculo(x.processo) } : x,
  );
  // A etapa herda do projeto como ele fica aqui (uma versão velha de fora não decide).
  const projetoSigiloso = new Set(p2.filter((x) => x.processo?.sigiloso).map((x) => x.id));
  const e2 = e1.map((x) => {
    let y = x.processo && !x.processo.sigiloso && s.vinculo(x.processo) ? { ...x, processo: marcarVinculo(x.processo) } : x;
    const sigilosa = y.processo ? y.processo.sigiloso === true : projetoSigiloso.has(y.projeto);
    if (sigilosa && y.documento && !y.documento.sigiloso) y = { ...y, documento: marcarDocumento(y.documento) };
    return y;
  });
  const documentos = new Set([...s.documentos, ...e2.flatMap((x) => (x.documento?.sigiloso ? [x.documento.numero] : []))]);
  const e3 = e2.map((x) =>
    x.documento && !x.documento.sigiloso && documentos.has(x.documento.numero) ? { ...x, documento: marcarDocumento(x.documento) } : x,
  );
  return { p: p2.filter((x, i) => x !== final.p[i]), e: e3.filter((x, i) => x !== final.e[i]) };
}

/** Cópia sem `antes`/`depois` indefinidos (a forma do registro gravado). */
function semIndefinidos(r: Registro): Registro {
  const x = { ...r } as Record<string, unknown>;
  for (const k of ["antes", "depois"]) if (x[k] === undefined) delete x[k];
  return x as unknown as Registro;
}

/**
 * O registro do histórico como pode ir a outra pessoa, mantendo id e carimbo (na volta, o `importar`
 * reconhece o mesmo registro e fica com o daqui): "processo" com o número sigiloso vira "processo
 * sigiloso"; "documento" de etapa sigilosa, ou com o número de um documento marcado, vira "documento
 * de processo sigiloso". O que não muda volta o próprio objeto.
 */
export function rasparRegistro(r: Registro, s: SigiloDoEnvelope): Registro {
  if (r.campo === "processo") {
    const lado = (t: string | undefined) => (t !== undefined && s.chaves.has(chaveProtocolo(t)) ? SIGILOSO_PROCESSO : t);
    const antes = lado(r.antes);
    const depois = lado(r.depois);
    return antes === r.antes && depois === r.depois ? r : semIndefinidos({ ...r, antes, depois });
  }
  if (r.campo === "documento") {
    const daEtapa = s.etapas.has(r.alvo);
    const lado = (t: string | undefined) => (t && (daEtapa || s.documentos.has(t)) ? SIGILOSO_DOCUMENTO : t);
    const antes = lado(r.antes);
    const depois = lado(r.depois);
    return antes === r.antes && depois === r.depois ? r : semIndefinidos({ ...r, antes, depois });
  }
  return r;
}
