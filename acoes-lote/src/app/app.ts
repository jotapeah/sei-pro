/**
 * O app das Ações em Lote (a janela dentro do iframe): estado compartilhado entre as telas e a troca delas.
 * Não toca o navegador direto (aba do SEI e fechar chegam por `DepsApp`), e por isso roda inteiro nos testes
 * com linkedom. Seleção e configuração existem; a prévia é um marcador que a Task 9 substitui.
 */

import type { Rpc } from "@comum/ponte/rpc";
import { h, icone } from "@comum/ui/dom";
import type { AcaoId } from "../modelo/acoes";
import type { LinhaDoc } from "../modelo/documentos";
import type { ParamsEtapa, PlanoDoc } from "../modelo/fila";
import type { Filtro } from "../modelo/filtros";
import type { ContextoAcoes } from "../pagina/contexto";
import { montarConfiguracao } from "./configuracao";
import { montarSelecao } from "./selecao";

export type Tela = "selecao" | "configuracao" | "previa" | "execucao" | "resultado";

/** O que o tratador `contexto` devolve: o da aba sem a base e o link da árvore (levam o infra_hash). */
export type ContextoApp = Omit<ContextoAcoes, "base" | "linkArvore">;

export interface EstadoApp {
  ctx: ContextoApp;
  protocolo: string;
  sigiloso: boolean;
  linhas: LinhaDoc[];
  /** Ids dos documentos marcados (inclui os que o filtro esconde agora). */
  selecionados: Set<string>;
  filtro: Filtro;
  etapas: ParamsEtapa[];
  planos: PlanoDoc[];
  /** A árvore não trouxe as datas: o filtro por período fica desligado. */
  datasIndisponiveis?: boolean;
  /** Último documento clicado, âncora da faixa por Shift. */
  ancora?: string | null;
}

export interface RespostaArvore {
  protocolo: string;
  sigiloso: boolean;
  linhas: LinhaDoc[];
  datasIndisponiveis?: boolean;
}

export function criarEstado(ctx: ContextoApp, a: RespostaArvore, anterior?: EstadoApp): EstadoApp {
  const e: EstadoApp = {
    ctx,
    protocolo: a.protocolo,
    sigiloso: a.sigiloso,
    linhas: a.linhas,
    selecionados: new Set(),
    filtro: anterior?.filtro ?? {},
    etapas: anterior?.etapas ?? [],
    planos: [],
  };
  if (a.datasIndisponiveis) e.datasIndisponiveis = true;
  // A seleção sobrevive à atualização, mas só com os documentos que ainda existem.
  if (anterior) for (const id of anterior.selecionados) if (a.linhas.some((l) => l.id === id)) e.selecionados.add(id);
  return e;
}

/** A etapa que uma ação nova ganha ao abrir a configuração: valores vazios, que a Task 8 pede ao usuário. */
export function etapaInicial(acao: AcaoId): ParamsEtapa {
  switch (acao) {
    case "baixar":
      return { acao, modo: "arquivos" };
    case "alterar-nivel":
      return { acao, nivel: "restrito" };
    case "assinar":
      return { acao, cargo: "" };
    case "cancelar-documento":
      return { acao, motivo: "" };
    case "incluir-bloco":
      return { acao, bloco: { novo: "" } };
    case "alterar-dados":
      return { acao };
    case "mover":
      return { acao, destino: { protocolo: "", idProcedimento: "", tipo: "" }, motivo: "" };
    case "ciencia":
    case "excluir":
    case "cancelar-assinatura":
    case "duplicar":
    case "pdf":
      return { acao };
  }
}

export interface DepsApp {
  /** `arvore`, mais as operações das telas seguintes. */
  rpc: Pick<Rpc, "chamar">;
  ctx: ContextoApp;
  fechar(): void;
}

const mensagem = (e: unknown): string => (e instanceof Error ? e.message : String(e));

export class AppAcoesLote {
  tela: Tela = "selecao";
  estado: EstadoApp | null = null;
  private readonly conteudo: HTMLElement;
  private readonly subtitulo: HTMLElement;

  constructor(
    private readonly raiz: HTMLElement,
    private readonly d: DepsApp,
  ) {
    this.conteudo = h("div", { class: "al-conteudo" });
    this.subtitulo = h("span", { class: "spro-lista-total" });
    const atualizar = h(
      "button",
      {
        type: "button",
        class: "spro-botao-icone",
        "aria-label": "Atualizar",
        title: "Reler a árvore do processo",
        onclick: () => void this.carregar(true),
      },
      icone("atualizar", 18),
    );
    const fechar = h(
      "button",
      { type: "button", class: "spro-botao-icone", "aria-label": "Fechar", title: "Fechar (Esc)", onclick: () => this.d.fechar() },
      icone("fechar", 18),
    );
    const cabecalho = h(
      "header",
      { class: "spro-lista-topo" },
      h("div", { class: "spro-lista-titulo" }, icone("documento", 18), h("h1", {}, "Ações em Lote"), this.subtitulo),
      h("div", { class: "spro-lista-topo-acoes" }, atualizar, fechar),
    );
    raiz.replaceChildren(cabecalho, this.conteudo);
    this.conteudo.replaceChildren(h("p", { class: "al-nota" }, "Carregando…"));
  }

  /** Primeira leitura da árvore e abertura da seleção. */
  async iniciar(): Promise<void> {
    await this.carregar(false);
  }

  private async carregar(forcar: boolean): Promise<void> {
    try {
      const a = await this.d.rpc.chamar<RespostaArvore>("arvore", forcar ? { forcar: true } : undefined);
      this.estado = criarEstado(this.d.ctx, a, this.estado ?? undefined);
      this.subtitulo.textContent = this.estado.protocolo;
      this.mostrar("selecao");
    } catch (e) {
      this.conteudo.replaceChildren(h("p", { class: "spro-lista-erro" }, `Não foi possível ler os documentos do processo: ${mensagem(e)}`));
    }
  }

  private mostrar(tela: Tela): void {
    this.tela = tela;
    const e = this.estado;
    if (!e) return;
    if (tela === "selecao") {
      this.conteudo.replaceChildren(
        montarSelecao(this.raiz.ownerDocument, e, {
          aoMudar: () => undefined,
          configurar: (acao) => this.configurar(acao),
        }),
      );
    } else if (tela === "configuracao") {
      this.conteudo.replaceChildren(
        montarConfiguracao(this.raiz.ownerDocument, e, {
          rpc: this.d.rpc,
          voltar: () => this.mostrar("selecao"),
          // A prévia é da Task 9: ela recebe a senha por aqui e a guarda só onde decidir (nunca em EstadoApp).
          previa: () => this.mostrar("previa"),
        }),
      );
    } else if (tela === "previa") {
      this.conteudo.replaceChildren(
        h("p", { class: "al-nota" }, "A prévia será montada na próxima etapa."),
        h("button", { type: "button", class: "spro-botao", onclick: () => this.mostrar("configuracao") }, "Voltar"),
      );
    }
  }

  private configurar(acao?: AcaoId): void {
    if (!this.estado) return;
    this.estado.etapas = acao ? [etapaInicial(acao)] : [];
    this.mostrar("configuracao");
  }
}
