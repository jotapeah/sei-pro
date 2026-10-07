/**
 * Menu geral do painel (botão "ajustes", tela 1). Os itens são montados a cada
 * abertura, com o estado do momento. O que depende do P4 (Sincronização,
 * Modelos, Enviar/Receber, Importar do Atividades, Histórico de alterações)
 * entra pelas extensões; sem elas, não aparece (nada de item desligado).
 */

import { criarMenu, type EntradaMenu } from "@comum/ui/menu";
import type { OrdemEtapas } from "../../modelo/operacoes";

export interface ExtensoesMenu {
  /** No começo: "Sincronização…", "Modelos de projeto…". */
  sincronia?: () => EntradaMenu[];
  /** Depois de Exportar/Imprimir: enviar, receber, importar. */
  arquivo?: () => EntradaMenu[];
  /** No fim: "Histórico de alterações". */
  fim?: () => EntradaMenu[];
}

export interface OpcoesMenuAjustes {
  mostrarLista: boolean;
  moverDependentes: boolean;
  ordemEtapas: OrdemEtapas;
  arquivados: number;
  /** Sem projeto ativo (primeiro uso, ou só arquivados): Exportar e Imprimir não têm o que levar. */
  semProjetos?: boolean;
  extensoes?: ExtensoesMenu;
  aoMostrarLista(v: boolean): void;
  aoMoverDependentes(v: boolean): void;
  aoOrdenar(o: OrdemEtapas): void;
  aoExportar(): void;
  aoImprimir(): void;
  aoArquivados(): void;
}

const ORDENS: ReadonlyArray<[OrdemEtapas, string]> = [
  ["inicio", "Ordenar por início"],
  ["nome", "Ordenar por nome"],
  ["cadastro", "Ordenar por cadastro"],
];

export function criarMenuAjustes(estado: () => OpcoesMenuAjustes): HTMLButtonElement {
  return criarMenu({
    rotulo: "Ajustes dos projetos",
    icone: "ajustes",
    largura: 270,
    itens: () => {
      const o = estado();
      const ext = o.extensoes ?? {};
      return [
        ...(ext.sincronia?.() ?? []),
        o.arquivados > 0 ? { rotulo: "Projetos arquivados", icone: "pasta", dica: String(o.arquivados), fazer: o.aoArquivados } : null,
        "-",
        {
          rotulo: "Mostrar lista de etapas",
          icone: o.mostrarLista ? "check" : undefined,
          fazer: () => o.aoMostrarLista(!o.mostrarLista),
        },
        {
          rotulo: "Mover dependentes ao arrastar",
          icone: o.moverDependentes ? "check" : undefined,
          fazer: () => o.aoMoverDependentes(!o.moverDependentes),
        },
        ...ORDENS.map(([valor, rotulo]) => ({
          rotulo,
          icone: o.ordemEtapas === valor ? ("check" as const) : undefined,
          fazer: () => o.aoOrdenar(valor),
        })),
        "-",
        o.semProjetos ? null : { rotulo: "Exportar planilha (CSV)", icone: "planilha", fazer: o.aoExportar },
        o.semProjetos ? null : { rotulo: "Imprimir / salvar PDF", icone: "documento", fazer: o.aoImprimir },
        ...(ext.arquivo?.() ?? []),
        "-",
        ...(ext.fim?.() ?? []),
      ];
    },
  });
}
