/**
 * Vista do projeto em Gantt (tela 1, variante B): a lista de etapas à
 * esquerda, alinhada às barras (cabeçalho 64 px, linha 36 px: `MEDIDAS`), e o
 * Gantt à direita. Linhas de fase recolhem; passar o mouse numa linha realça a
 * barra e vice-versa; a última linha cria a etapa ao teclar Enter. Atualizar
 * não remonta a Frappe (a rolagem fica); esconder a lista ou mudar "mover
 * dependentes" remonta.
 */

import { avatar } from "@comum/ui/avatar";
import { h, icone } from "@comum/ui/dom";
import type { Escala } from "../../gantt/escalas";
import type { Linha, LinhaEtapa, LinhaFase } from "../../gantt/linhas";
import { type ControleGantt, montarGantt } from "../../gantt/montar";
import type { DataISO, MudancaDeDatas } from "../../modelo/tipos";
import { iconeSituacao } from "../icones";

export interface DadosVistaProjeto {
  linhas: Linha[];
  mostrarLista: boolean;
  escala: Escala;
  hoje: DataISO;
  moverDependentes: boolean;
  /** Dia que aparece à esquerda ao montar (padrão: hoje). */
  rolarPara?: DataISO;
}

export interface AcoesVistaProjeto {
  /** Injetável nas provas (a Frappe de verdade precisa de medidas). */
  montarGantt?: typeof montarGantt;
  aoClicarEtapa(id: string, ancora: Element): void;
  aoAlternarFase(faseId: string): void;
  aoAdicionar(nome: string): void;
  validar(mudancas: MudancaDeDatas[]): string | null;
  aoMudarDatas(mudancas: MudancaDeDatas[]): void;
  aoRecusar(mensagem: string): void;
  /** A Frappe não montou (spec 9): o app cai para a vista Lista. */
  aoFalharGantt(erro: unknown): void;
}

const ativar = (el: HTMLElement, fazer: () => void): HTMLElement => {
  el.addEventListener("click", fazer);
  el.addEventListener("keydown", (ev) => {
    if ((ev as KeyboardEvent).key !== "Enter" && (ev as KeyboardEvent).key !== " ") return;
    ev.preventDefault();
    fazer();
  });
  return el;
};

export class VistaProjeto {
  readonly el: HTMLElement;
  private readonly area: HTMLElement;
  private coluna: HTMLElement | null = null;
  private controle: ControleGantt | null = null;

  constructor(
    private d: DadosVistaProjeto,
    private readonly acoes: AcoesVistaProjeto,
  ) {
    this.el = h("div", { class: "prj-vista" });
    this.area = h("div", { class: "prj-gantt" });
    // Realce cruzado: a barra (no SVG da Frappe) acende a linha da lista.
    this.area.addEventListener("mouseover", (ev) =>
      this.realcarLinha((ev.target as Element | null)?.closest?.(".bar-wrapper")?.getAttribute("data-id") ?? null),
    );
    this.area.addEventListener("mouseout", () => this.realcarLinha(null));
    this.montar();
  }

  private realcarLinha(id: string | null): void {
    for (const l of this.coluna?.querySelectorAll(".prj-realce") ?? []) l.classList.remove("prj-realce");
    if (!id || !this.coluna) return;
    const alvo = [...this.coluna.querySelectorAll(".prj-lin-etapa")].find((l) => l.getAttribute("data-id") === id);
    alvo?.classList.add("prj-realce");
  }

  private linhaFase(l: LinhaFase): HTMLElement {
    const el = h(
      "div",
      { class: "prj-lin prj-lin-fase", "data-fase": l.fase.id, role: "button", tabindex: "0", "aria-expanded": String(!l.recolhida) },
      h("span", { class: "prj-lin-seta" }, icone("chevron", 14)),
      h("span", { class: "prj-lin-nome", title: l.fase.nome }, l.fase.nome),
      h("span", { class: "prj-lin-conta" }, `${l.resumo.feitas}/${l.resumo.total}`),
    );
    return ativar(el, () => this.acoes.aoAlternarFase(l.fase.id));
  }

  private linhaEtapa(l: LinhaEtapa): HTMLElement {
    const e = l.etapa;
    const el = h(
      "div",
      {
        class: `prj-lin prj-lin-etapa${l.situacao === "concluida" ? " prj-concluida" : ""}`,
        "data-id": l.id,
        role: "button",
        tabindex: "0",
        "aria-haspopup": "dialog",
      },
      iconeSituacao(l.situacao, e.marco),
      h("span", { class: "prj-lin-nome", title: e.nome }, e.nome),
      e.responsavel ? avatar(e.responsavel.nome, { tamanho: 22 }) : h("span", { class: "prj-av-vazio" }),
    );
    el.addEventListener("mouseenter", () => this.controle?.realcar(l.id, true));
    el.addEventListener("mouseleave", () => this.controle?.realcar(l.id, false));
    return ativar(el, () => this.acoes.aoClicarEtapa(l.id, el));
  }

  private desenharColuna(): HTMLElement {
    const nova = h("input", { type: "text", placeholder: "Adicionar etapa… (Enter)", "aria-label": "Adicionar etapa", maxlength: "200" });
    nova.addEventListener("keydown", (ev) => {
      if ((ev as KeyboardEvent).key !== "Enter") return;
      ev.preventDefault();
      const nome = nova.value.trim();
      if (!nome) return;
      nova.value = "";
      this.acoes.aoAdicionar(nome);
    });
    return h(
      "div",
      { class: "prj-lista" },
      h("div", { class: "prj-lista-cab" }, h("span", {}, "Etapa"), h("span", {}, "Resp.")),
      ...this.d.linhas.map((l) =>
        l.tipo === "fase" ? this.linhaFase(l) : l.tipo === "etapa" ? this.linhaEtapa(l) : h("div", { class: "prj-lin" }),
      ),
      h("div", { class: "prj-lin prj-lin-nova" }, icone("mais", 14), nova),
    );
  }

  private montar(): void {
    this.controle?.destruir();
    this.coluna = this.d.mostrarLista ? this.desenharColuna() : null;
    this.el.classList.toggle("prj-sem-lista", !this.d.mostrarLista);
    this.el.replaceChildren(...(this.coluna ? [this.coluna] : []), this.area);
    const montar = this.acoes.montarGantt ?? montarGantt;
    this.controle = montar(this.area, this.d.linhas, {
      escala: this.d.escala,
      hoje: this.d.hoje,
      mostrarLista: this.d.mostrarLista,
      moverDependentes: this.d.moverDependentes,
      rolarPara: this.d.rolarPara,
      aoClicar: (id, ancora) => this.acoes.aoClicarEtapa(id, ancora),
      validar: (m) => this.acoes.validar(m),
      aoMudarDatas: (m) => this.acoes.aoMudarDatas(m),
      aoRecusar: (msg) => this.acoes.aoRecusar(msg),
      aoFalhar: (erro) => this.acoes.aoFalharGantt(erro),
    });
  }

  atualizar(d: DadosVistaProjeto): void {
    const remontar = d.mostrarLista !== this.d.mostrarLista || d.moverDependentes !== this.d.moverDependentes || !this.controle;
    const escalaMudou = d.escala !== this.d.escala;
    this.d = d;
    if (remontar) {
      this.montar();
      return;
    }
    if (escalaMudou) this.controle?.trocarEscala(d.escala);
    this.controle?.atualizar(d.linhas);
    if (this.d.mostrarLista) {
      const nova = this.desenharColuna();
      this.coluna?.replaceWith(nova);
      this.coluna = nova;
    }
  }

  rolarParaHoje(): void {
    this.controle?.rolarParaHoje();
  }

  /** Volta o foco à última linha (depois de criar uma etapa, para digitar a próxima). */
  focarNova(): void {
    this.el.querySelector<HTMLInputElement>(".prj-lin-nova input")?.focus({ preventScroll: true });
  }

  destruir(): void {
    this.controle?.destruir();
    this.controle = null;
  }
}
