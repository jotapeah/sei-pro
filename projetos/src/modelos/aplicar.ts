/**
 * Modelo → projeto (spec 3.2): a primeira etapa começa no primeiro dia útil a
 * partir da data escolhida; cada etapa começa `aPartirDe` dias úteis depois e
 * dura `duracao` dias úteis, pulando fins de semana e feriados nacionais.
 */

import { indicesEntre } from "@comum/ordem/indice";
import { FERIADOS, fimPorDuracao, proximoUtil, somarUteis } from "../modelo/calendario";
import { novaEtapa, novaFase } from "../modelo/operacoes";
import type { Carimbo, DataISO, Etapa, Fase, Modelo } from "../modelo/tipos";

export interface DatasDaEtapa {
  inicio: DataISO;
  fim: DataISO;
}

export function datasDoModelo(modelo: Pick<Modelo, "etapas">, inicio: DataISO, feriados: ReadonlySet<DataISO> = FERIADOS): DatasDaEtapa[] {
  const base = proximoUtil(inicio, feriados);
  return modelo.etapas.map((e) => {
    const ini = e.aPartirDe > 0 ? somarUteis(base, Math.floor(e.aPartirDe), feriados) : base;
    return { inicio: ini, fim: e.marco ? ini : fimPorDuracao(ini, e.duracao, feriados) };
  });
}

export interface PreviaModelo {
  etapas: number;
  fases: number;
  termina?: DataISO;
  primeiras: Array<{ nome: string } & DatasDaEtapa>;
}

/** Prévia do diálogo "Novo projeto": N etapas em M fases, término e as 3 primeiras. */
export function previaDoModelo(
  modelo: Pick<Modelo, "etapas" | "fases">,
  inicio: DataISO,
  feriados: ReadonlySet<DataISO> = FERIADOS,
): PreviaModelo {
  const datas = datasDoModelo(modelo, inicio, feriados);
  const termina = datas.reduce<DataISO | undefined>((m, d) => (m === undefined || d.fim > m ? d.fim : m), undefined);
  const previa: PreviaModelo = {
    etapas: modelo.etapas.length,
    fases: modelo.fases.length,
    primeiras: modelo.etapas.slice(0, 3).map((e, i) => ({ nome: e.nome, ...datas[i]! })),
  };
  if (termina) previa.termina = termina;
  return previa;
}

export interface ContextoModelo {
  projeto: string;
  carimbo: Carimbo;
  novoId: () => string;
  feriados?: ReadonlySet<DataISO>;
}

/** Fases e etapas novas (ids novos; dependências e fases remapeadas; índices inválidos descartados). */
export function aplicarModelo(modelo: Modelo, inicio: DataISO, ctx: ContextoModelo): { fases: Fase[]; etapas: Etapa[] } {
  const c = ctx.carimbo;
  const ordensF = modelo.fases.length ? indicesEntre(null, null, modelo.fases.length) : [];
  const fases = modelo.fases.map((nome, i) => novaFase(ctx.projeto, nome, ctx.novoId(), ordensF[i]!, c));
  const ids = modelo.etapas.map(() => ctx.novoId());
  const ordensE = modelo.etapas.length ? indicesEntre(null, null, modelo.etapas.length) : [];
  const datas = datasDoModelo(modelo, inicio, ctx.feriados ?? FERIADOS);
  const etapas = modelo.etapas.map((e, i) =>
    novaEtapa(
      {
        projeto: ctx.projeto,
        nome: e.nome,
        inicio: datas[i]!.inicio,
        fim: datas[i]!.fim,
        marco: e.marco,
        fase: e.fase !== undefined ? fases[e.fase]?.id : undefined,
        dependeDe: e.dependeDe.filter((d) => d !== i && d >= 0 && d < ids.length).map((d) => ids[d]!),
        checklist: e.checklist.map((texto) => ({ id: ctx.novoId(), texto, feito: false })),
      },
      ids[i]!,
      ordensE[i]!,
      c,
    ),
  );
  return { fases, etapas };
}
