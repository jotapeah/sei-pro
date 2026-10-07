/**
 * "Imprimir / salvar PDF" (spec 3.1): a mesma página do app em
 * `#modo=impressao&...`, numa janela nova, só leitura: título, o Gantt (da aba
 * aberta, na escala dela) e a tabela; depois abre a impressão do navegador.
 * Os parâmetros vão no endereço (a página da extensão lê o armazenamento direto).
 */

import { formatarData } from "@comum/datas/dias";
import { h } from "@comum/ui/dom";
import { type Escala, ehEscala } from "../gantt/escalas";
import { linhasDoPortfolio, linhasDoProjeto } from "../gantt/linhas";
import { montarGantt } from "../gantt/montar";
import { rotuloDaVis } from "../modelo/escopo";
import type { DataISO, Vis } from "../modelo/tipos";
import type { RepositorioProjetos } from "../repositorio";
import { montarTabelaEtapas } from "./componentes/tabelaEtapas";
import { montarTabelaProjetos } from "./componentes/vistaTodos";
import { carregarUnidade } from "./dados";
import { plural } from "./formato";

export interface ParametrosImpressao {
  host: string;
  login: string;
  unidade: string;
  /** "todos" ou o id do projeto. */
  projeto: string;
  escala: Escala;
  /** Lista de etapas à esquerda do Gantt. */
  lista: boolean;
}

export function hashDaImpressao(p: ParametrosImpressao): string {
  const q = new URLSearchParams({
    modo: "impressao",
    host: p.host,
    login: p.login,
    unidade: p.unidade,
    projeto: p.projeto,
    escala: p.escala,
    lista: p.lista ? "1" : "0",
  });
  return `#${q.toString()}`;
}

export function lerImpressao(hash: string): ParametrosImpressao | null {
  const q = new URLSearchParams(hash.replace(/^#/, ""));
  const escala = q.get("escala");
  const [host, login, unidade, projeto] = ["host", "login", "unidade", "projeto"].map((k) => q.get(k) ?? "");
  if (q.get("modo") !== "impressao" || !host || !login || !unidade || !projeto || !ehEscala(escala)) return null;
  return { host, login, unidade, projeto, escala, lista: q.get("lista") === "1" };
}

export interface DepsImpressao {
  repos: Readonly<Record<Vis, RepositorioProjetos>>;
  hoje: DataISO;
  montarGantt?: typeof montarGantt;
  /** `window.print` (depois de desenhar). */
  imprimir(): void;
}

export async function montarImpressao(raiz: HTMLElement, p: ParametrosImpressao, d: DepsImpressao): Promise<void> {
  const dados = await carregarUnidade(d.repos, d.hoje);
  const montar = d.montarGantt ?? montarGantt;
  const area = h("div", { class: "prj-gantt" });
  const opcoes = { escala: p.escala, hoje: d.hoje, mostrarLista: false, moverDependentes: false, somenteLeitura: true };
  if (p.projeto === "todos") {
    raiz.replaceChildren(
      h("h1", {}, "Projetos"),
      h(
        "p",
        { class: "prj-impressao-meta" },
        `${plural(dados.ativos.length, "projeto ativo", "projetos ativos")} · impresso em ${formatarData(d.hoje)}`,
      ),
      area,
      montarTabelaProjetos(dados.ativos, { aoAbrir: () => undefined }),
    );
    montar(
      area,
      linhasDoPortfolio(
        dados.ativos.map((i) => ({ projeto: i.projeto, vis: i.vis, etapas: i.etapas })),
        d.hoje,
      ),
      opcoes,
    );
  } else {
    const item = [...dados.ativos, ...dados.arquivados].find((x) => x.projeto.id === p.projeto);
    if (!item) {
      raiz.replaceChildren(h("p", {}, "Projeto não encontrado nesta unidade."));
      return;
    }
    const linhas = linhasDoProjeto(
      { projeto: item.projeto.id, fases: item.fases, etapas: item.etapas },
      { hoje: d.hoje, ordem: "inicio", recolhidas: new Set() },
    );
    const r = item.resumo;
    raiz.replaceChildren(
      h("h1", {}, item.projeto.nome),
      h(
        "p",
        { class: "prj-impressao-meta" },
        [
          item.projeto.processo && !item.projeto.processo.sigiloso ? item.projeto.processo.protocolo : null,
          rotuloDaVis(item.vis),
          `${r.feitas} de ${plural(r.total, "etapa concluída", "etapas concluídas")}`,
          r.fim ? `termina em ${formatarData(r.fim)}` : null,
          `impresso em ${formatarData(d.hoje)}`,
        ]
          .filter(Boolean)
          .join(" · "),
      ),
      area,
      montarTabelaEtapas(linhas, { hoje: d.hoje, aoClicar: () => undefined }),
    );
    montar(area, linhas, { ...opcoes, mostrarLista: p.lista });
  }
  // As barras e os rótulos da Frappe se ajustam no quadro seguinte.
  setTimeout(() => d.imprimir(), 10);
}
