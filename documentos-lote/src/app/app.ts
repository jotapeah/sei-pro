/**
 * O app dos Documentos em Lote: a janela em etapas (Modelo → Planilha → ...), com o indicador de etapas no topo e
 * o rodapé Voltar / Avançar. Não toca o navegador direto (aba do SEI, armazenamento, fechar e minimizar chegam por
 * `DepsApp`), e por isso roda inteiro nos testes com linkedom.
 *
 * Padrão das etapas (as tarefas seguintes acrescentam as suas em `ETAPAS`): cada uma é uma `TelaEtapa`
 * (./estado.ts) criada ao entrar e destruída ao sair, lendo e escrevendo o mesmo `EstadoApp`. O Avançar só
 * habilita com `completa()`; a tela chama `aoMudar()` quando isso pode ter mudado. Sem botão Cancelar: o X e o Esc
 * fecham (regra dos modais do SEI Pro).
 */

import type { Rpc } from "@comum/ponte/rpc";
import { h, icone } from "@comum/ui/dom";
import type { ContextoDocumentos } from "../pagina/contexto";
import type { RepositorioLote } from "../repositorio";
import { TelaCruzamento } from "./cruzamento";
import type { DefinicaoEtapa, EstadoApp, TelaEtapa } from "./estado";
import { TelaModelo } from "./modelo";
import { TelaPlanilha } from "./planilha";

/** O que o tratador `contexto` devolve: o da aba sem a base nem o link da árvore (levam o infra_hash). */
export type ContextoApp = Omit<ContextoDocumentos, "base" | "linkArvore">;

export interface DepsApp {
  /** `listarModelos`, `lerModelo`, ... e `fechar`/`minimizar` (pelo main), atendidos pela aba. */
  rpc: Pick<Rpc, "chamar">;
  ctx: ContextoApp;
  /** O lote em andamento (retomada: Tarefa 14; ainda não usado). */
  repo: RepositorioLote;
  fechar(): void;
  /** Pastilha (true) ou tela cheia (false), pedido à aba (execução: Tarefa 14). */
  minimizar(minimizado: boolean): Promise<void>;
}

/** As etapas, na ordem. */
export const ETAPAS: readonly DefinicaoEtapa[] = [
  { id: "modelo", rotulo: "Modelo", criar: (d) => new TelaModelo(d) },
  { id: "planilha", rotulo: "Planilha", criar: (d) => new TelaPlanilha(d) },
  { id: "cruzamento", rotulo: "Cruzamento", criar: (d) => new TelaCruzamento(d) },
];

export class AppDocumentosLote {
  /** O estado das etapas (as provas o leem; as telas o recebem por `DepsEtapa`). */
  readonly estado: EstadoApp = {};
  private indice = 0;
  private tela: TelaEtapa | null = null;
  private destruido = false;
  private readonly parar: Array<() => void> = [];
  private readonly etapas: HTMLElement;
  private readonly conteudo: HTMLElement;
  private readonly botaoVoltar: HTMLButtonElement;
  private readonly botaoAvancar: HTMLButtonElement;

  constructor(
    private readonly raiz: HTMLElement,
    private readonly d: DepsApp,
  ) {
    const cabecalho = h(
      "header",
      { class: "spro-lista-topo" },
      h("div", { class: "spro-lista-titulo" }, icone("documento", 18), h("h1", {}, "Documentos em Lote")),
      h(
        "div",
        { class: "spro-lista-topo-acoes" },
        h(
          "button",
          { type: "button", class: "spro-botao-icone", "aria-label": "Fechar", title: "Fechar (Esc)", onclick: () => this.d.fechar() },
          icone("fechar", 18),
        ),
      ),
    );
    this.etapas = h("ol", { class: "dl-etapas", "aria-label": "Etapas" });
    this.conteudo = h("div", { class: "dl-conteudo" });
    this.botaoVoltar = h("button", { type: "button", class: "spro-botao", hidden: true, onclick: () => this.voltar() }, "Voltar");
    this.botaoAvancar = h(
      "button",
      { type: "button", class: "spro-botao primario", disabled: true, onclick: () => this.avancar() },
      "Avançar",
    );
    const rodape = h("div", { class: "dl-acoes dl-rodape-etapa" }, this.botaoVoltar, h("span", { class: "dl-espaco" }), this.botaoAvancar);
    raiz.replaceChildren(cabecalho, this.etapas, this.conteudo, rodape);

    // Esc fecha. Um diálogo aberto por cima (que não é o do app) cuida do próprio teclado.
    const teclado = (ev: KeyboardEvent) => {
      if (ev.defaultPrevented || ev.key !== "Escape") return;
      const dialogo = (ev.target as HTMLElement | null)?.closest?.("dialog");
      if (dialogo && !dialogo.contains(this.raiz)) return;
      ev.preventDefault();
      this.d.fechar();
    };
    raiz.ownerDocument.addEventListener("keydown", teclado);
    this.parar.push(() => raiz.ownerDocument.removeEventListener("keydown", teclado));
  }

  /** Abre a primeira etapa. (A retomada de um lote guardado entra aqui na Tarefa 14.) */
  async iniciar(): Promise<void> {
    await this.irPara(0);
  }

  /** Fechar o modal: a tela atual para o que estiver pendente. */
  destruir(): void {
    this.destruido = true;
    this.tela?.destruir?.();
    this.tela = null;
    for (const p of this.parar.splice(0)) p();
  }

  /* ------------------------------------------------------------ etapas */

  private async irPara(i: number): Promise<void> {
    const def = ETAPAS[i];
    if (!def || this.destruido) return;
    this.tela?.destruir?.();
    this.indice = i;
    const tela = def.criar({ rpc: this.d.rpc, estado: this.estado, aoMudar: () => this.atualizarRodape() });
    this.tela = tela;
    this.conteudo.replaceChildren(tela.el);
    this.desenharEtapas();
    this.atualizarRodape();
    await tela.iniciar?.();
  }

  private avancar(): void {
    if (!this.tela?.completa()) return;
    void this.irPara(this.indice + 1);
  }

  private voltar(): void {
    if (this.indice > 0) void this.irPara(this.indice - 1);
  }

  private desenharEtapas(): void {
    this.etapas.replaceChildren(
      ...ETAPAS.map((e, i) =>
        h(
          "li",
          {
            class: i < this.indice ? "feita" : i === this.indice ? "atual" : undefined,
            "aria-current": i === this.indice ? "step" : undefined,
          },
          h("span", { class: "dl-etapa-num" }, String(i + 1)),
          e.rotulo,
        ),
      ),
    );
  }

  private atualizarRodape(): void {
    if (this.destruido) return;
    this.botaoVoltar.hidden = this.indice === 0;
    this.botaoAvancar.disabled = !this.tela?.completa();
    this.botaoAvancar.textContent = this.tela?.rotuloAvancar?.() ?? "Avançar";
  }
}
