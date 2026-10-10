/** Concluir: data (padrão hoje, nunca antes da distribuição), tempo gasto, observação e documento entregue (opcional). */

import { h } from "@comum/ui/dom";
import { RE_DOCUMENTO } from "@projetos/modelo/vinculos";
import { LIMITES } from "../../modelo/constantes";
import type { DadosConclusao } from "../../modelo/operacoes";
import type { Demanda } from "../../modelo/tipos";
import { dataDeFormulario, dataLonga, lerTempo } from "../formato";
import type { ContextoDialogo } from "../tipos";
import { caixaDeErros, campo, linhaDeCampos } from "./campos";
import { perguntar } from "./janela";

export function abrirDialogoConclusao(c: ContextoDialogo, d: Demanda): Promise<DadosConclusao | null> {
  return perguntar<DadosConclusao>(c, {
    titulo: "Concluir demanda",
    icone: "check",
    montar(responder) {
      const erros = caixaDeErros();
      const data = h("input", { type: "date", class: "spro-campo", name: "data", value: c.hoje() });
      const tempo = h("input", {
        type: "text",
        class: "spro-campo",
        name: "tempo",
        placeholder: "1h30",
        value: "",
      });
      const observacao = h("textarea", { class: "spro-campo", name: "observacao", rows: "3", maxlength: String(LIMITES.observacao) });
      const documento = h("input", {
        type: "text",
        class: "spro-campo",
        name: "documento",
        inputmode: "numeric",
        placeholder: "Número SEI",
        maxlength: "30",
      });
      const gravar = () => {
        const m: string[] = [];
        const dia = dataDeFormulario(data.value);
        if (!dia) m.push("Informe uma data de conclusão válida.");
        else if (dia < d.distribuidaEm) m.push(`A conclusão não pode ser antes da distribuição (${dataLonga(d.distribuidaEm)}).`);
        const min = lerTempo(tempo.value);
        if (min === null) m.push("Tempo gasto inválido. Use 1h30, 1:30, 45min ou só os minutos.");
        else if (min !== undefined && min > LIMITES.tempoMin) m.push("Tempo gasto grande demais.");
        const numero = documento.value.trim();
        if (numero && !RE_DOCUMENTO.test(numero)) m.push("Número de documento inválido (só dígitos, até 20).");
        erros.mostrar(m);
        if (m.length || !dia) return;
        const r: DadosConclusao = { data: dia };
        if (min !== undefined && min !== null) r.tempoGastoMin = min;
        if (observacao.value.trim()) r.observacao = observacao.value.trim();
        if (numero) r.documento = { numero };
        responder(r);
      };
      for (const i of [data, tempo, documento])
        i.addEventListener("keydown", (ev) => {
          if (ev.key === "Enter") {
            ev.preventDefault();
            gravar();
          }
        });
      return h(
        "div",
        { class: "dem-form dem-form-concluir" },
        h("p", { class: "dem-dialogo-titulo" }, d.titulo),
        linhaDeCampos(
          campo("Concluída em", data),
          campo("Tempo gasto", tempo, { opcional: "(opcional)", dica: "Ex.: 1h30, 1:30, 45min ou 90." }),
        ),
        campo("Observação", observacao, { opcional: "(opcional)" }),
        campo("Documento entregue", documento, { opcional: "(opcional)", dica: "Número SEI do documento." }),
        erros.el,
        h(
          "div",
          { class: "spro-dialogo-rodape" },
          h("button", { type: "button", class: "spro-botao primario", onclick: gravar }, "Concluir"),
        ),
      );
    },
  });
}
