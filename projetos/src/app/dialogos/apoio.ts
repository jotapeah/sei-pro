/**
 * Diálogos pequenos do P3: projetos arquivados (reativar, excluir), o
 * documento que comprova a conclusão ("Informar documento", do aviso de
 * concluída) e o nome do modelo ("Salvar como modelo").
 */

import { hojeISO } from "@comum/datas/dias";
import type { AbrirModal } from "@comum/ui/dialogo";
import { h, icone } from "@comum/ui/dom";
import { LIMITES } from "../../modelo/constantes";
import type { DataISO, Etapa } from "../../modelo/tipos";
import type { DocumentoConferido } from "../../ponte/tipos";
import type { ProjetoNaTela } from "../dados";
import { dataDeFormulario, dataLonga } from "../formato";
import { caixaDeErros, campo, campoDocumento, linhaDeCampos, mensagensDoErro } from "./campos";

export function abrirArquivados(c: {
  abrirModal: AbrirModal;
  arquivados: readonly ProjetoNaTela[];
  reativar(id: string): Promise<void>;
  excluir(id: string): Promise<void>;
}): { fechar(): void } {
  const erros = caixaDeErros();
  const lista = h("div", { class: "prj-arquivados" });
  const raiz = h("div", {}, lista, erros.el);
  let restantes = [...c.arquivados];
  let ocupado = false;
  const pintar = () => {
    lista.replaceChildren(
      ...(restantes.length
        ? restantes.map((p) => {
            const tirar = (fazer: (id: string) => Promise<void>) => async () => {
              if (ocupado) return;
              ocupado = true;
              try {
                await fazer(p.projeto.id);
                erros.mostrar([]);
                restantes = restantes.filter((x) => x !== p);
                pintar();
              } catch (e) {
                erros.mostrar(mensagensDoErro(e));
              } finally {
                ocupado = false;
              }
            };
            return h(
              "div",
              { class: "prj-arquivado" },
              icone(p.vis === "unidade" ? "predio" : "pessoa", 15),
              h(
                "div",
                { class: "prj-arquivado-nome" },
                h("b", {}, p.projeto.nome),
                h("span", {}, ` arquivado em ${dataLonga(hojeISO(new Date(p.projeto.arquivadoEm ?? 0)))}`),
              ),
              h("button", { type: "button", class: "spro-botao pequeno", onclick: tirar(c.reativar) }, "Reativar"),
              h("button", { type: "button", class: "spro-botao fantasma perigo pequeno", onclick: tirar(c.excluir) }, "Excluir"),
            );
          })
        : [h("p", { class: "prj-dica" }, "Nenhum projeto arquivado.")]),
    );
  };
  pintar();
  return c.abrirModal({ titulo: "Projetos arquivados", icone: "pasta", conteudo: raiz });
}

export function abrirInformarDocumento(c: {
  abrirModal: AbrirModal;
  etapa: Etapa;
  hoje: DataISO;
  conferirDocumento?: (numero: string) => Promise<DocumentoConferido | null>;
  salvar(numero: string | undefined, concluidaEm: DataISO): Promise<void>;
}): { fechar(): void } {
  const erros = caixaDeErros();
  const doc = campoDocumento(c.etapa.documento?.numero ?? "", c.conferirDocumento);
  const data = h("input", { type: "date", class: "spro-campo", name: "concluida", value: c.etapa.concluidaEm ?? c.hoje });
  let modal: { fechar(): void } | null = null;
  const salvar = h("button", { type: "button", class: "spro-botao primario" }, "Salvar");
  let ocupado = false;
  salvar.addEventListener("click", async () => {
    if (ocupado) return;
    const d = dataDeFormulario(data.value);
    if (!d) return erros.mostrar(["Informe uma data válida (entre 2000 e 2100)."]);
    ocupado = true;
    try {
      await c.salvar(doc.numero() || undefined, d);
      modal?.fechar();
    } catch (e) {
      erros.mostrar(mensagensDoErro(e));
    } finally {
      ocupado = false;
    }
  });
  const conteudo = h(
    "div",
    { class: "prj-form prj-form-documento" },
    campo("Número SEI", doc.el),
    linhaDeCampos(campo("Concluída em", data), salvar),
    erros.el,
  );
  modal = c.abrirModal({ titulo: "Documento que comprova a conclusão", icone: "documento", conteudo });
  return { fechar: () => modal?.fechar() };
}

export function pedirNomeDoModelo(c: { abrirModal: AbrirModal; sugestao: string; salvar(nome: string): Promise<void> }): {
  fechar(): void;
} {
  const erros = caixaDeErros();
  const nome = h("input", { type: "text", class: "spro-campo", maxlength: String(LIMITES.nome), value: c.sugestao });
  let modal: { fechar(): void } | null = null;
  const salvar = h("button", { type: "button", class: "spro-botao primario" }, "Salvar modelo");
  let ocupado = false;
  salvar.addEventListener("click", async () => {
    if (ocupado) return;
    if (!nome.value.trim()) return erros.mostrar(["Informe o nome do modelo."]);
    ocupado = true;
    try {
      await c.salvar(nome.value.trim());
      modal?.fechar();
    } catch (e) {
      erros.mostrar(mensagensDoErro(e));
    } finally {
      ocupado = false;
    }
  });
  const conteudo = h(
    "div",
    { class: "prj-form prj-form-modelo" },
    campo("Nome do modelo", nome, { dica: "As datas viram dias úteis contados do início: dá para usar em outro projeto." }),
    erros.el,
    h(
      "div",
      { class: "spro-dialogo-rodape" },
      h("button", { type: "button", class: "spro-botao", onclick: () => modal?.fechar() }, "Cancelar"),
      salvar,
    ),
  );
  modal = c.abrirModal({ titulo: "Salvar como modelo", icone: "camadas", conteudo });
  return { fechar: () => modal?.fechar() };
}
