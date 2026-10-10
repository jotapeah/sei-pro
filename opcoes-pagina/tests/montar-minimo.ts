import { h } from "@comum/ui/dom";
import { PREFIXO_ID } from "../src/config";
import { OPCOES_COMPLEMENTOS, type Opcao, SECOES_GERAL } from "../src/schema";

export interface Ctx {
  lab: boolean;
  foraAntaq: boolean;
}

function linha(o: Opcao, c: Ctx): HTMLElement {
  const base = { id: PREFIXO_ID + o.nome, "data-name": o.nome, "data-tipo": o.tipo };
  const ctrl =
    o.tipo === "chave"
      ? h("input", { ...base, type: "checkbox", checked: o.padrao === true })
      : o.tipo === "selecao"
        ? h("select", base, ...(o.escolhas ?? []).map((e) => h("option", { value: e.valor }, e.rotulo)))
        : h("input", { ...base, type: o.tipo === "numero" ? "number" : "text", value: String(o.padrao ?? "") });
  const escondida = o.oculta || (o.visivelEm === "lab" && !c.lab) || (o.visivelEm === "fora-antaq" && !c.foraAntaq);
  const depende = o.dependencias?.map((d) => `${d.de}:${d.quando ? 1 : 0}:${d.limparAoEsconder ? 1 : 0}`).join(",");
  return h(
    "div",
    { class: "opcao", "data-opcao": o.nome, "data-tipo": o.tipo, "data-depende": depende, hidden: escondida || undefined },
    h("i", { class: "ico" }),
    ctrl,
  );
}

export function montarMinimo(c: Ctx): HTMLElement {
  const raiz = h(
    "div",
    {},
    h(
      "div",
      { "data-aba": "geral" },
      ...SECOES_GERAL.map((s) =>
        h("details", { class: "secao", "data-secao": s.id }, h("span", { class: "contagem" }), ...s.opcoes.map((o) => linha(o, c))),
      ),
    ),
    h("div", { "data-aba": "complementos" }, ...OPCOES_COMPLEMENTOS.map((o) => linha(o, c))),
  );
  document.body.append(raiz);
  return raiz;
}
