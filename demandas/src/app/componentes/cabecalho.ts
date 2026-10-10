/** Cabeçalho: título, escopo (As duas | Toda a unidade | Só eu), Nova demanda e o menu de ajustes. */

import { h, icone } from "@comum/ui/dom";
import type { PreferenciasDemandas } from "../../preferencias";

export type EscopoNaTela = PreferenciasDemandas["escopo"];

export interface OpcoesCabecalho {
  escopo: EscopoNaTela;
  /** Texto que explica por que "Nova demanda" está desabilitada; ausente = habilitada. */
  novaDesabilitada?: string;
  menu: HTMLElement;
  aoEscopo(e: EscopoNaTela): void;
  aoNova(): void;
}

const ESCOPOS: ReadonlyArray<[EscopoNaTela, string]> = [
  ["ambos", "As duas"],
  ["unidade", "Toda a unidade"],
  ["eu", "Só eu"],
];

export function montarCabecalho(o: OpcoesCabecalho): HTMLElement {
  return h(
    "div",
    { class: "dem-cab" },
    h("h2", { class: "dem-titulo" }, "Gestor de Demandas"),
    h(
      "div",
      { class: "dem-ctl" },
      h(
        "div",
        { class: "spro-segmentado", role: "group", "aria-label": "Quem vê" },
        ...ESCOPOS.map(([id, rotulo]) =>
          h(
            "button",
            { type: "button", "aria-pressed": String(id === o.escopo), "data-escopo": id, onclick: () => o.aoEscopo(id) },
            rotulo,
          ),
        ),
      ),
      h(
        "button",
        {
          type: "button",
          class: "spro-botao primario dem-nova",
          disabled: o.novaDesabilitada !== undefined,
          title: o.novaDesabilitada,
          onclick: o.aoNova,
        },
        icone("mais", 15),
        "Nova demanda",
      ),
      o.menu,
    ),
  );
}
