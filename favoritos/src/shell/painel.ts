/**
 * O painel lateral da extensão (html/painel.html): abas Favoritos | Histórico |
 * Projetos | Agente de IA. A casca genérica mora em `@comum/painel/shell`; aqui
 * só se decide quais abas existem neste pacote e como cada uma se chama.
 */

import type { Area } from "@comum/armazenamento/area";
import { CHAVE_ABA, type DefAba, montarAbas } from "@comum/painel/shell";

export { CHAVE_ABA };
export type AbaPainel = "favoritos" | "historico" | "projetos" | "agente";

export interface DepsShell {
  sessao: Area;
  temAgente: boolean;
  /** O favoritos novo está no manifest (no pacote oficial ainda com o antigo, a aba nunca conectaria). Padrão: true. */
  temFavoritos?: boolean;
  /** O histórico está no manifest (js/init_historico.js). Padrão: false. */
  temHistorico?: boolean;
  /** Os projetos novos estão no manifest (js/init_projetos.js). Padrão: false. */
  temProjetos?: boolean;
  url(caminho: string): string;
  /** Aba pedida pelo endereço (`#aba=agente`), quando o painel abre numa janela comum (Firefox). */
  abaDoEndereco?: AbaPainel | null;
  /** chrome.storage.local: o app grava as pendências (lembretes + novidades) em `favoritos/contadorPainel`. */
  local?: Area;
}

export const CHAVE_CONTADOR = "favoritos/contadorPainel";
/** O app dos projetos grava aqui as etapas atrasadas da unidade da aba (projetos/src/modelo/constantes.ts). */
export const CHAVE_CONTADOR_PROJETOS = "projetos/contadorPainel";
/**
 * O maior número de etapas atrasadas que existe: 2 escopos (Só eu e Toda a unidade) x 100 projetos ativos x 300
 * etapas (`LIMITES` em projetos/src/modelo/constantes.ts). Acima disso o valor do storage é torto e a aba fica sem
 * número. Literal, e não a conta: o esbuild não descarta `2 * 100 * 300` e a sobra entraria no bundle do
 * app, que importa daqui.
 */
export const TETO_CONTADOR_PROJETOS = 60000;

/** O que o manifest do pacote declara, só o que decide as abas. */
export interface ManifestoDoPacote {
  content_scripts?: ReadonlyArray<{ js?: readonly string[] }>;
}

/**
 * Quais ferramentas este pacote tem, pelos content scripts do manifest. O oficial (manifest_seipro.json) ainda não
 * tem init_favoritos, init_historico nem init_projetos: as abas que nunca conectariam não aparecem.
 */
export function ferramentasDoPacote(
  m: ManifestoDoPacote,
): Required<Pick<DepsShell, "temAgente" | "temFavoritos" | "temHistorico" | "temProjetos">> {
  const tem = (arquivo: string) => (m.content_scripts ?? []).some((c) => c.js?.includes(arquivo) === true);
  return {
    temAgente: tem("js/init_agente.js"),
    temFavoritos: tem("js/init_favoritos.js"),
    temHistorico: tem("js/init_historico.js"),
    temProjetos: tem("js/init_projetos.js"),
  };
}

const ABAS: readonly AbaPainel[] = ["favoritos", "historico", "projetos", "agente"];

/** A aba pedida pelo endereço (`#aba=projetos`), quando o painel abre numa janela comum (Firefox); outra coisa: nenhuma. */
export function abaPedidaNoEndereco(hash: string): AbaPainel | null {
  const v = new URLSearchParams(hash.replace(/^#/, "")).get("aba");
  return ABAS.find((x) => x === v) ?? null;
}

export async function montarShell(raiz: HTMLElement, d: DepsShell): Promise<{ mostrar(aba: AbaPainel): void; atual(): AbaPainel }> {
  const abas: DefAba[] = [
    ...(d.temFavoritos !== false
      ? [
          {
            id: "favoritos",
            rotulo: "Favoritos",
            icone: "estrela",
            caminho: "html/favoritos.html#modo=lateral",
            titulo: "Favoritos do SEI Pro",
            contador: {
              chave: CHAVE_CONTADOR,
              dica: (n: number) => `${n} ${n === 1 ? "favorito pede" : "favoritos pedem"} atenção (lembrete ou novidade)`,
            },
          } satisfies DefAba,
        ]
      : []),
    ...(d.temHistorico === true
      ? [
          {
            id: "historico",
            rotulo: "Histórico",
            icone: "historico",
            caminho: "html/historico.html#modo=lateral",
            titulo: "Histórico de processos visitados",
          } satisfies DefAba,
        ]
      : []),
    ...(d.temProjetos === true
      ? [
          {
            id: "projetos",
            rotulo: "Projetos",
            icone: "gantt",
            caminho: "html/projetos.html#modo=lateral",
            titulo: "Projetos do SEI Pro",
            contador: {
              chave: CHAVE_CONTADOR_PROJETOS,
              dica: (n: number) => `${n} ${n === 1 ? "etapa atrasada" : "etapas atrasadas"} nos projetos da unidade`,
              teto: TETO_CONTADOR_PROJETOS,
            },
          } satisfies DefAba,
        ]
      : []),
    ...(d.temAgente
      ? [
          {
            id: "agente",
            rotulo: "Agente de IA",
            icone: "brilho",
            caminho: "html/agente.html",
            titulo: "Agente de IA do SEI Pro",
          } satisfies DefAba,
        ]
      : []),
  ];
  const r = await montarAbas(raiz, { sessao: d.sessao, local: d.local, abas, url: d.url, abaDoEndereco: d.abaDoEndereco });
  return {
    mostrar: (aba) => r.mostrar(aba),
    atual: () => (r.atual() || "agente") as AbaPainel,
  };
}
