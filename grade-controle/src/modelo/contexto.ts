import type { DataISO } from '../../../sei-comum/src/datas/dias';

/** O que as regras puras precisam saber do momento e do usuário. Passado de fora: nada aqui lê relógio nem DOM. */
export interface Ctx {
  hoje: DataISO;
  /** Milissegundos desde a época. */
  agora: number;
  /** Login do usuário logado, para `resp:eu`. */
  eu?: string;
  /** Instante da visita anterior, para "novo desde a última visita". */
  visitaAnterior?: number;
}

export const DIA_MS = 86_400_000;
