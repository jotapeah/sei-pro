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
import type { LoteDocumentos, RepositorioLote } from "../repositorio";
import { TelaCruzamento } from "./cruzamento";
import { conferirVerificacao, type DefinicaoEtapa, type EstadoApp, type TelaEtapa } from "./estado";
import { ExecucaoDocumentos, resumoDoLote, TelaExecucao } from "./execucao";
import { montarLote } from "./lote";
import { TelaModelo } from "./modelo";
import { TelaPlanilha } from "./planilha";
import { TelaPrevia } from "./previa";
import { TelaVerificacao } from "./verificacao";

/** O que o tratador `contexto` devolve: o da aba sem a base nem o link da árvore (levam o infra_hash). */
export type ContextoApp = Omit<ContextoDocumentos, "base" | "linkArvore">;

export interface DepsApp {
  /** `listarModelos`, `lerModelo`, ... e `fechar`/`minimizar` (pelo main), atendidos pela aba. */
  rpc: Pick<Rpc, "chamar">;
  ctx: ContextoApp;
  /** O lote em andamento: gravado ao Iniciar e a cada linha (a retomada ao abrir é da Tarefa 14b). */
  repo: RepositorioLote;
  fechar(): void;
  /** Pastilha (true) ou tela cheia (false), pedido à aba durante a execução. */
  minimizar(minimizado: boolean): Promise<void>;
  /** Injetáveis para as provas (pausa entre documentos e relógio do lote). */
  esperar?(ms: number): Promise<void>;
  agora?(): number;
}

/** As etapas, na ordem. */
export const ETAPAS: readonly DefinicaoEtapa[] = [
  { id: "modelo", rotulo: "Modelo", criar: (d) => new TelaModelo(d) },
  { id: "planilha", rotulo: "Planilha", criar: (d) => new TelaPlanilha(d) },
  { id: "cruzamento", rotulo: "Cruzamento", criar: (d) => new TelaCruzamento(d) },
  {
    id: "verificacao",
    rotulo: "Verificação",
    criar: (d) => new TelaVerificacao(d),
    aplicavel: (e) => e.config?.destino.tipo === "coluna",
  },
  // Do Cruzamento, os destinos tela e novo processo pulam a Verificação e caem aqui. O Iniciar da Prévia não
  // avança para outra etapa: chama `iniciarExecucao` (a execução e o resultado não são etapas).
  { id: "previa", rotulo: "Prévia", criar: (d) => new TelaPrevia(d) },
];

const aplicavel = (i: number, estado: EstadoApp): boolean => {
  const def = ETAPAS[i];
  return !!def && (def.aplicavel?.(estado) ?? true);
};

/**
 * A etapa depois de `atual` que vale para o estado (null: não há). É o ponto de extensão da navegação: uma etapa
 * nova entra em `ETAPAS` (com `aplicavel`, se for condicional) e o Avançar a encontra por aqui.
 */
export function proximaEtapa(estado: EstadoApp, atual: number): number | null {
  for (let i = atual + 1; i < ETAPAS.length; i += 1) if (aplicavel(i, estado)) return i;
  return null;
}

/** A etapa antes de `atual` que vale para o estado (null: é a primeira). */
export function etapaAnterior(estado: EstadoApp, atual: number): number | null {
  for (let i = atual - 1; i >= 0; i -= 1) if (aplicavel(i, estado)) return i;
  return null;
}

export class AppDocumentosLote {
  /** O estado das etapas (as provas o leem; as telas o recebem por `DepsEtapa`). */
  readonly estado: EstadoApp = {};
  private indice = 0;
  private tela: TelaEtapa | null = null;
  private destruido = false;
  private readonly parar: Array<() => void> = [];
  private readonly cabecalho: HTMLElement;
  private readonly etapas: HTMLElement;
  private readonly conteudo: HTMLElement;
  private readonly rodape: HTMLElement;
  private readonly pastilha: HTMLElement;
  private readonly botaoVoltar: HTMLButtonElement;
  private readonly botaoAvancar: HTMLButtonElement;
  /** A execução em curso (ou a última): o lote, o executor e a tela de progresso. */
  private execucao: ExecucaoDocumentos | null = null;
  private telaExecucao: TelaExecucao | null = null;
  private minimizado = false;

  constructor(
    private readonly raiz: HTMLElement,
    private readonly d: DepsApp,
  ) {
    this.cabecalho = h(
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
    this.rodape = h("div", { class: "dl-acoes dl-rodape-etapa" }, this.botaoVoltar, h("span", { class: "dl-espaco" }), this.botaoAvancar);
    this.pastilha = h("div", { class: "dl-pastilha", hidden: true });
    raiz.replaceChildren(this.cabecalho, this.etapas, this.conteudo, this.rodape, this.pastilha);

    // Esc fecha (minimizado, não: a página é do usuário). Um diálogo aberto por cima (que não é o do app) cuida do
    // próprio teclado.
    const teclado = (ev: KeyboardEvent) => {
      if (ev.defaultPrevented || ev.key !== "Escape" || this.minimizado) return;
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

  /** Fechar o modal: a tela atual para o que estiver pendente; a execução pausa (o lote fica, retomável). */
  destruir(): void {
    this.destruido = true;
    this.execucao?.parar();
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
    const tela = def.criar({
      rpc: this.d.rpc,
      estado: this.estado,
      aoMudar: () => this.atualizarRodape(),
      iniciarExecucao: () => this.iniciarExecucao(),
    });
    this.tela = tela;
    this.conteudo.replaceChildren(tela.el);
    this.atualizarRodape();
    await tela.iniciar?.();
  }

  private avancar(): void {
    if (!this.tela?.completa()) return;
    if (this.tela.avancar) {
      this.tela.avancar();
      return;
    }
    // Pular a Verificação (destino que não é a coluna) não pode deixar o resultado de uma verificação antiga.
    conferirVerificacao(this.estado);
    const i = proximaEtapa(this.estado, this.indice);
    if (i !== null) void this.irPara(i);
  }

  private voltar(): void {
    const i = etapaAnterior(this.estado, this.indice);
    if (i !== null) void this.irPara(i);
  }

  /** Só as etapas que valem para o estado atual (a Verificação aparece quando o destino é a coluna). */
  private desenharEtapas(): void {
    const visiveis = ETAPAS.map((e, i) => ({ e, i })).filter(({ i }) => i === this.indice || aplicavel(i, this.estado));
    this.etapas.replaceChildren(
      ...visiveis.map(({ e, i }, n) =>
        h(
          "li",
          {
            class: i < this.indice ? "feita" : i === this.indice ? "atual" : undefined,
            "aria-current": i === this.indice ? "step" : undefined,
          },
          h("span", { class: "dl-etapa-num" }, String(n + 1)),
          e.rotulo,
        ),
      ),
    );
  }

  /* ------------------------------------------------------------ execução */

  /** O Iniciar da Prévia: monta o lote, grava-o ANTES da primeira linha e mostra a execução. Rejeita sem enviar nada. */
  private async iniciarExecucao(): Promise<void> {
    const lote = montarLote(this.estado, this.d.ctx, { agora: this.d.agora });
    await this.d.repo.gravar(lote);
    if (this.destruido) return;
    this.executarLote(lote);
  }

  /**
   * Mostra a execução no lugar do corpo e roda uma rodada sobre `indices` (padrão: as linhas `pendente`). Ponto de
   * extensão da Tarefa 14b: a retomada ("Continuar de onde parou"), "Repetir só as que falharam" e "Gravar as que
   * ficaram de fora" chamam isto com o lote guardado e a lista fixa de linhas.
   */
  executarLote(lote: LoteDocumentos, indices?: number[]): void {
    if (this.destruido) return;
    if (this.execucao?.rodando) return;
    this.tela?.destruir?.();
    this.tela = null;
    const ex =
      this.execucao && this.execucao.lote.id === lote.id
        ? this.execucao
        : new ExecucaoDocumentos(lote, {
            rpc: this.d.rpc,
            repo: this.d.repo,
            aoMudar: () => this.aoMudarExecucao(),
            esperar: this.d.esperar,
            agora: this.d.agora,
          });
    this.execucao = ex;
    const tela = new TelaExecucao(ex, {
      pausar: () => ex.pausar(),
      continuar: () => {
        if (!ex.rodando) void this.acompanhar(ex, ex.continuar());
      },
      minimizar: () => void this.minimizar(true),
    });
    this.telaExecucao = tela;
    this.etapas.hidden = true;
    this.rodape.hidden = true;
    this.conteudo.replaceChildren(tela.el);
    void this.acompanhar(ex, ex.rodar(indices));
  }

  private async acompanhar(ex: ExecucaoDocumentos, rodada: Promise<void>): Promise<void> {
    this.aoMudarExecucao();
    await rodada;
    if (this.destruido || this.execucao !== ex) return;
    if (ex.estado === "concluido") {
      this.telaExecucao?.concluida();
      this.aoConcluir(ex.lote);
    }
    this.aoMudarExecucao();
  }

  /**
   * Todas as linhas da rodada processadas. Ponto de extensão da Tarefa 14b: mostrar a tela de resultado (e apagar
   * o lote ao fechá-lo ou descartá-lo). Aqui o lote concluído fica no repositório.
   */
  protected aoConcluir(_lote: LoteDocumentos): void {}

  private aoMudarExecucao(): void {
    if (this.destruido) return;
    this.telaExecucao?.atualizar();
    this.desenharPastilha();
  }

  /* ------------------------------------------------------------ pastilha */

  private async minimizar(m: boolean): Promise<void> {
    if (this.destruido || m === this.minimizado) return;
    try {
      // Primeiro a aba: se ela não encolher o iframe, o app não pode virar pastilha numa tela cheia.
      await this.d.minimizar(m);
    } catch (e) {
      console.warn("[SEI Pro] documentos em lote: não foi possível minimizar", e);
      return;
    }
    if (this.destruido) return;
    this.minimizado = m;
    const html = this.raiz.ownerDocument.documentElement;
    if (m) html.setAttribute("data-minimizado", "1");
    else html.removeAttribute("data-minimizado");
    this.cabecalho.hidden = m;
    this.conteudo.hidden = m;
    this.desenharPastilha();
  }

  private desenharPastilha(): void {
    this.pastilha.hidden = !this.minimizado;
    if (!this.minimizado) return;
    const ex = this.execucao;
    const p = ex?.progresso ?? { feitos: 0, total: 0, criadas: 0, erros: 0, fora: 0 };
    const estado =
      ex?.estado === "concluido" ? "Concluído" : ex?.motivo ? "Parado" : ex?.estado === "pausado" && !ex.rodando ? "Pausado" : "Gravando";
    this.pastilha.replaceChildren(
      h(
        "div",
        { class: "dl-pastilha-texto" },
        h("strong", {}, "Documentos em Lote"),
        h(
          "span",
          { class: "dl-pastilha-conta", role: "status", title: ex?.estado === "concluido" ? resumoDoLote(p) : (ex?.motivo ?? "") },
          `${p.feitos}/${p.total} · ${estado}`,
          p.erros ? ` (${p.erros} com erro)` : "",
        ),
      ),
      h(
        "button",
        {
          type: "button",
          class: "spro-botao pequeno",
          "aria-label": "Restaurar",
          title: "Restaurar a janela",
          onclick: () => void this.minimizar(false),
        },
        icone("expandir", 14),
        "Restaurar",
      ),
    );
  }

  private atualizarRodape(): void {
    if (this.destruido) return;
    this.desenharEtapas();
    this.botaoVoltar.hidden = etapaAnterior(this.estado, this.indice) === null;
    this.botaoAvancar.disabled = !this.tela?.completa();
    this.botaoAvancar.textContent = this.tela?.rotuloAvancar?.() ?? "Avançar";
  }
}
