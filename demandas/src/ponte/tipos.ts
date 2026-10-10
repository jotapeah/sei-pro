/**
 * O que atravessa a ponte entre a aba do SEI (content script) e o app do painel (página da extensão). Sem DOM e sem
 * `@nucleo`: o app importa daqui sem puxar o núcleo do SEI para o pacote dele.
 */

import type { ContextoDemandas } from "../app/tipos";

export type { ContextoDemandas };

/** Nome da porta `chrome.runtime.connect` do painel embutido. */
export const CANAL_DEMANDAS = "seipro-demandas";

/** Porta do painel lateral: a aba do SEI conecta quando o lateral anuncia que abriu (`demandas/lateralAberto`). */
export const CANAL_LATERAL = "seipro-demandas-lateral";

/** Pílula de alerta do título do painel. */
export type TipoAlerta = "atrasadas" | "semana";

/**
 * Chave de roteamento da aba no painel lateral: host|login|u:<id da unidade>. Trocar de unidade (ou de usuário, ou de
 * SEI) troca a chave, e o lateral remonta com as demandas da unidade nova (nunca grava na antiga). Sem unidade, vazia:
 * o lateral não monta, e a aba recusa qualquer pedido de sincronia.
 */
export function chaveDaAba(ctx: Pick<ContextoDemandas, "host" | "login" | "unidade">): string {
  return ctx.unidade ? `${ctx.host}|${ctx.login.trim().toLowerCase()}|u:${ctx.unidade.id}` : "";
}
