/**
 * O que a aba do SEI pede ao app pela porta (RPC aba -> app): a pílula de alerta do título (`alerta {tipo}`). Os
 * tratadores entram na porta já na carga da página, antes de o app existir: até ele ficar pronto, os pedidos esperam
 * numa fila (com teto) e rodam na ordem em que chegaram. Pedido malformado é recusado (`false`) e não chega ao app.
 */

import type { Tratador } from "@comum/ponte/rpc";
import type { TipoAlerta } from "../ponte/tipos";

/** O que do app os pedidos usam. */
export interface AlvoDosPedidos {
  aplicarAlerta(tipo: TipoAlerta): void;
}

export interface PedidosDaAba {
  /** Para `esperarConexaoDaAba(CANAL_DEMANDAS, tratadores)`. */
  tratadores: Record<string, Tratador>;
  /** O app ficou pronto: roda a fila e, daí em diante, cada pedido na hora. */
  pronto(app: AlvoDosPedidos): void;
}

/** Pedidos guardados enquanto o app não fica pronto (cliques repetidos numa pílula não acumulam sem fim). */
const TETO_FILA = 20;

export function pedidosDaAba(): PedidosDaAba {
  let app: AlvoDosPedidos | null = null;
  const fila: Array<(a: AlvoDosPedidos) => void> = [];
  const quandoPronto = (f: (a: AlvoDosPedidos) => void) => {
    if (app) {
      f(app);
      return;
    }
    if (fila.length >= TETO_FILA) fila.shift();
    fila.push(f);
  };
  return {
    tratadores: {
      alerta: (args) => {
        const tipo = (args as { tipo?: unknown } | null)?.tipo;
        if (tipo !== "atrasadas" && tipo !== "semana") return false;
        quandoPronto((a) => a.aplicarAlerta(tipo));
        return true;
      },
    },
    pronto(a) {
      app = a;
      for (const f of fila.splice(0)) f(a);
    },
  };
}
