/**
 * Dias úteis do projeto: segunda a sexta, menos os feriados nacionais
 * (`@comum/datas/feriados`, os mesmos dos prazos dos Favoritos). Tudo em
 * `DataISO` local: `deISO` usa o meio-dia (sem efeito de horário de verão) e
 * `dataDe` lê getFullYear/getMonth/getDate. `toISOString()` daria o dia
 * seguinte a partir das 21h em Brasília.
 */

import { type DataISO, deISO, diasUteisEntre, ehDiaUtil, hojeISO, somarDias, somarDiasUteis } from "@comum/datas/dias";
import { conjuntoDeFeriados, type Feriado, feriadosNacionais } from "@comum/datas/feriados";

export const ANO_MIN = 2000;
export const ANO_MAX = 2100;

function anos(de: number, ate: number): number[] {
  return Array.from({ length: ate - de + 1 }, (_, i) => de + i);
}

/** Feriados nacionais de 2000 a 2100 (cerca de 1.400 datas, calculadas uma vez). */
export const FERIADOS: ReadonlySet<DataISO> = conjuntoDeFeriados(anos(ANO_MIN, ANO_MAX));

const RE_DATA = /^\d{4}-\d{2}-\d{2}$/;

/** "AAAA-MM-DD" que existe no calendário (2026-02-30 não passa). */
export function dataValida(iso: unknown): iso is DataISO {
  if (typeof iso !== "string" || !RE_DATA.test(iso)) return false;
  return hojeISO(deISO(iso)) === iso;
}

/** Date (qualquer hora) → dia civil LOCAL. */
export function dataDe(d: Date): DataISO {
  return hojeISO(d);
}

/** Dia civil → meia-noite local (o que a Frappe usa para posicionar barras). */
export function meiaNoite(iso: DataISO): Date {
  const d = deISO(iso);
  d.setHours(0, 0, 0, 0);
  return d;
}

export function ehUtil(iso: DataISO, feriados: ReadonlySet<DataISO> = FERIADOS): boolean {
  return ehDiaUtil(iso, feriados);
}

/** A própria data, se for dia útil; senão o próximo dia útil. */
export function proximoUtil(iso: DataISO, feriados: ReadonlySet<DataISO> = FERIADOS): DataISO {
  let d = iso;
  while (!ehDiaUtil(d, feriados)) d = somarDias(d, 1);
  return d;
}

/** Dias úteis em [inicio, fim], inclusive. 0 quando fim < inicio ou não há dia útil no período. */
export function duracaoUteis(inicio: DataISO, fim: DataISO, feriados: ReadonlySet<DataISO> = FERIADOS): number {
  if (fim < inicio) return 0;
  return (ehDiaUtil(inicio, feriados) ? 1 : 0) + diasUteisEntre(inicio, fim, feriados);
}

/**
 * Término de uma etapa que começa em `inicio` e dura `duracao` dias úteis
 * (inclusive). O início vai para o próximo dia útil; duração < 1 vale 1.
 */
export function fimPorDuracao(inicio: DataISO, duracao: number, feriados: ReadonlySet<DataISO> = FERIADOS): DataISO {
  const comeco = proximoUtil(inicio, feriados);
  const n = Math.max(1, Math.floor(duracao));
  return n === 1 ? comeco : somarDiasUteis(comeco, n - 1, feriados);
}

/** Dias úteis depois de `a` até `b` (inclusive); negativo quando b < a. */
export function uteisEntre(a: DataISO, b: DataISO, feriados: ReadonlySet<DataISO> = FERIADOS): number {
  return diasUteisEntre(a, b, feriados);
}

export function somarUteis(iso: DataISO, n: number, feriados: ReadonlySet<DataISO> = FERIADOS): DataISO {
  return somarDiasUteis(iso, n, feriados);
}

/** Feriados (com nome) entre duas datas, inclusive: para o destaque do Gantt na escala Dia. */
export function feriadosNoPeriodo(inicio: DataISO, fim: DataISO): Feriado[] {
  if (fim < inicio) return [];
  const de = Number(inicio.slice(0, 4));
  const ate = Number(fim.slice(0, 4));
  return anos(de, ate)
    .flatMap((ano) => feriadosNacionais(ano))
    .filter((f) => f.data >= inicio && f.data <= fim);
}

/** Sexta-feira da semana (segunda a domingo) de `hoje`. */
export function sextaDaSemana(hoje: DataISO): DataISO {
  const dia = deISO(hoje).getDay(); // 0 = domingo
  const desdeSegunda = (dia + 6) % 7;
  return somarDias(hoje, 4 - desdeSegunda);
}
