/**
 * Diálogo "Histórico de alterações" (spec 3.2 e 5.4): quem mudou o quê, do
 * mais recente ao mais antigo, agrupado por dia e filtrável por projeto. Os
 * registros vêm dos dois escopos da unidade (os de "Toda a unidade" chegam
 * pelo Texto Padrão, com o nome de quem mudou). Campo que esta versão não
 * conhece (gravado por uma versão mais nova) aparece pelo nome, como texto.
 *
 * O registro não tem teto de tamanho no texto da unidade (repositorio.ts,
 * `entidadeValida`): o campo, os valores e o nome de quem mudou são cortados
 * aqui. Os textos de sigilo ("processo sigiloso", "documento de processo
 * sigiloso") são valores como os outros: aparecem como texto, sem link (este
 * diálogo não monta link nenhum).
 */

import { formatarData, hojeISO } from "@comum/datas/dias";
import { criarCombo } from "@comum/ui/combobox";
import type { AbrirModal } from "@comum/ui/dialogo";
import { h, icone } from "@comum/ui/dom";
import { rotuloDaVis } from "../../modelo/escopo";
import type { Registro, Vis } from "../../modelo/tipos";
import { mensagemDoErro } from "../erros";
import { textoDoRegistro } from "../formato";
import { caixaDeErros } from "./campos";

export interface RegistroNaTela extends Registro {
  vis: Vis;
}

export interface NomesDoHistorico {
  /** O que o registro alterou: projeto, fase ou etapa (vivos ou excluídos), pelo id. */
  alvo(id: string): { tipo: "projeto" | "fase" | "etapa"; nome: string } | undefined;
}

export interface ContextoHistorico {
  abrirModal: AbrirModal;
  projetos: ReadonlyArray<{ id: string; nome: string }>;
  registros(): Promise<RegistroNaTela[]>;
  nomes: NomesDoHistorico;
  /** Já filtrado num projeto (aberto pelo painel desse projeto). */
  projeto?: string;
}

const TODOS = "";
const MAX_CAMPO = 60;
const MAX_VALOR = 200;
const MAX_QUEM = 100;

const cortar = (t: string, max: number): string => (t.length > max ? `${t.slice(0, max)}…` : t);
const cortarValor = (t: string | undefined): string | undefined => (typeof t === "string" ? cortar(t, MAX_VALOR) : undefined);

const hora = (ms: number) => {
  const d = new Date(ms);
  return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
};

const TIPO = { projeto: "Projeto", fase: "Fase", etapa: "Etapa" } as const;

/**
 * A linha do registro; campo desconhecido entra pelo nome (curto), sempre como texto. Com `comProjeto`
 * (a lista de todos os projetos), a fase e a etapa dizem de que projeto são: “Análise” em “Pregão”.
 */
export function linhaDoRegistro(
  r: Registro,
  nomes: NomesDoHistorico,
  o: { comProjeto?: boolean } = {},
): { quem: string; onde: string; oque: string } {
  const alvo = nomes.alvo(r.alvo);
  const tipo = alvo?.tipo;
  const campo = typeof r.campo === "string" ? r.campo.slice(0, MAX_CAMPO) : "?";
  const oque = textoDoRegistro({ campo: campo as Registro["campo"], antes: cortarValor(r.antes), depois: cortarValor(r.depois) }, tipo);
  let onde = alvo && tipo ? `${TIPO[tipo]} “${alvo.nome}”` : "Item que não existe mais";
  if (o.comProjeto && r.alvo !== r.projeto) {
    const projeto = nomes.alvo(r.projeto);
    if (projeto?.tipo === "projeto") onde += ` em “${projeto.nome}”`;
  }
  return { quem: cortar(r.nome || r.por || "Alguém", MAX_QUEM), onde, oque };
}

export async function abrirHistorico(c: ContextoHistorico): Promise<{ fechar(): void }> {
  const erros = caixaDeErros();
  let todos: RegistroNaTela[] = [];
  let leu = true;
  try {
    todos = [...(await c.registros())].sort((a, b) => b.quando - a.quando || (a.id < b.id ? 1 : a.id > b.id ? -1 : 0));
  } catch (e) {
    leu = false;
    erros.mostrar([`Não foi possível ler o histórico: ${mensagemDoErro(e)}`]);
  }
  const lista = h("div", { class: "prj-historico" });
  const pintar = (projeto: string) => {
    const regs = projeto ? todos.filter((r) => r.projeto === projeto) : todos;
    if (!regs.length) {
      // Sem ler, "nenhuma alteração" seria falso: fica só o erro.
      lista.replaceChildren(...(leu ? [h("p", { class: "prj-dica" }, "Nenhuma alteração registrada.")] : []));
      return;
    }
    const grupos = new Map<string, RegistroNaTela[]>();
    for (const r of regs) {
      const dia = hojeISO(new Date(r.quando));
      const g = grupos.get(dia) ?? [];
      g.push(r);
      grupos.set(dia, g);
    }
    lista.replaceChildren(
      ...[...grupos].map(([dia, rs]) =>
        h(
          "section",
          { class: "prj-historico-dia" },
          h("h3", {}, formatarData(dia)),
          ...rs.map((r) => {
            const l = linhaDoRegistro(r, c.nomes, { comProjeto: !projeto });
            const onde = rotuloDaVis(r.vis);
            return h(
              "div",
              { class: "prj-historico-reg" },
              h("span", { class: "prj-historico-hora" }, hora(r.quando)),
              h(
                "span",
                { class: "prj-historico-vis", role: "img", "aria-label": onde, title: onde },
                icone(r.vis === "unidade" ? "predio" : "pessoa", 13),
              ),
              h("span", {}, h("b", {}, l.quem), ` · ${l.onde} · ${l.oque}`),
            );
          }),
        ),
      ),
    );
  };
  const inicial = c.projeto ?? TODOS;
  // Com um projeto só não há o que escolher: o filtro não aparece.
  const filtro =
    c.projetos.length > 1
      ? criarCombo({
          rotulo: "Projeto",
          opcoes: () => [{ valor: TODOS, rotulo: "Todos os projetos" }, ...c.projetos.map((p) => ({ valor: p.id, rotulo: p.nome }))],
          valor: [inicial],
          aoMudar: (v) => pintar(v[0] ?? TODOS),
        })
      : null;
  pintar(inicial);
  const conteudo = h(
    "div",
    { class: "prj-form prj-form-historico" },
    filtro ? h("div", { class: "prj-linha" }, filtro.el) : null,
    erros.el,
    lista,
  );
  return c.abrirModal({ titulo: "Histórico de alterações", icone: "historico", conteudo });
}
