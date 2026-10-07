/**
 * Balão da etapa (tela 1): o dia a dia sem abrir formulário. Situação (com os
 * dias úteis de atraso), nome, "Fase · Responsável", datas e duração em dias
 * úteis, aviso de replanejamento, checklist, documento e processo (links que
 * abrem no SEI), régua de progresso (só com medida manual) e as ações:
 * Concluir / Marcar como cumprido / Reabrir, Editar e o menu (duplicar, mover
 * de fase, histórico, excluir). Esc ou clique fora fecha.
 */

import { h, icone } from "@comum/ui/dom";
import { criarMenu, type EntradaMenu } from "@comum/ui/menu";
import { diasUteisDeAtraso } from "../../modelo/alertas";
import { duracaoUteis } from "../../modelo/calendario";
import { desvioUteis, replanejada } from "../../modelo/linhaDeBase";
import { progressoDaEtapa } from "../../modelo/progresso";
import { situacaoEtapa } from "../../modelo/situacao";
import type { DataISO, Etapa, Vinculo } from "../../modelo/tipos";
import type { ProjetoNaTela } from "../dados";
import { dataLonga, textoDiasUteis } from "../formato";
import { iconeProjetos } from "../icones";
import { abrirCamada, type Camada } from "./camada";
import { pilulaDaSituacao } from "./tabelaEtapas";

export interface DadosBalao {
  etapa: Etapa;
  projeto: ProjetoNaTela;
  hoje: DataISO;
}

export interface AcoesBalao {
  /** Concluir (ou "Marcar como cumprido", no marco). */
  aoConcluir(): void;
  aoReabrir(): void;
  aoEditar(secao?: "historico"): void;
  aoProgresso(pct: number): void;
  aoAbrirDocumento(numero: string): void;
  aoAbrirProcesso(v: Vinculo, ev: MouseEvent): void;
  aoDuplicar(): void;
  aoMoverFase(faseId: string | undefined): void;
  aoExcluir(): void;
}

const linha = (ic: Element, ...conteudo: Array<Node | string | null>) =>
  h("div", { class: "prj-balao-li" }, ic, h("div", {}, ...conteudo.filter((c): c is Node | string => c !== null)));

const link = (texto: string, titulo: string, fazer: (ev: MouseEvent) => void) =>
  h(
    "a",
    {
      href: "#",
      title: titulo,
      onclick: (ev: Event) => {
        ev.preventDefault();
        fazer(ev as MouseEvent);
      },
    },
    texto,
  );

function datas(e: Etapa): HTMLElement {
  if (e.marco) return linha(icone("calendario", 15), dataLonga(e.inicio));
  const desvio = replanejada(e) ? desvioUteis(e) : 0;
  const aviso =
    desvio && e.base
      ? h(
          "small",
          {},
          `Replanejada: o plano original terminava em ${dataLonga(e.base.fim)} (${desvio > 0 ? `+${textoDiasUteis(desvio)}` : `${textoDiasUteis(-desvio)} antes`})`,
        )
      : null;
  return linha(
    icone("calendario", 15),
    `${dataLonga(e.inicio)} → ${dataLonga(e.fim)} · ${textoDiasUteis(duracaoUteis(e.inicio, e.fim))}`,
    aviso,
  );
}

function regua(e: Etapa, aoProgresso: (n: number) => void): HTMLElement {
  const valor = h("b", {}, `${e.progresso}%`);
  const r = h("input", { type: "range", min: "0", max: "100", step: "5", value: String(e.progresso), "aria-label": "Progresso" });
  r.addEventListener("input", () => {
    valor.textContent = `${r.value}%`;
  });
  r.addEventListener("change", () => {
    valor.textContent = `${r.value}%`;
    aoProgresso(Number(r.value));
  });
  return h("div", { class: "prj-balao-prog" }, h("span", {}, "Progresso"), r, valor);
}

function menuDaEtapa(d: DadosBalao, a: AcoesBalao): HTMLButtonElement {
  return criarMenu({
    rotulo: "Mais ações da etapa",
    classe: "spro-botao-icone pequeno",
    largura: 250,
    itens: (): EntradaMenu[] => [
      { rotulo: "Duplicar", icone: "copiar", fazer: a.aoDuplicar },
      ...d.projeto.fases
        .filter((f) => f.id !== d.etapa.fase)
        .map((f) => ({ rotulo: `Mover para “${f.nome}”`, icone: "mover" as const, fazer: () => a.aoMoverFase(f.id) })),
      d.etapa.fase ? { rotulo: "Mover para “Sem fase”", icone: "mover", fazer: () => a.aoMoverFase(undefined) } : null,
      { rotulo: "Histórico", icone: "historico", fazer: () => a.aoEditar("historico") },
      "-",
      { rotulo: "Excluir", icone: "lixeira", perigo: true, fazer: a.aoExcluir },
    ],
  });
}

export function conteudoDoBalao(d: DadosBalao, a: AcoesBalao, fechar: () => void): HTMLElement {
  const e = d.etapa;
  const situacao = situacaoEtapa(e, d.hoje);
  const atraso = situacao === "atrasada" ? diasUteisDeAtraso(e, d.hoje) : 0;
  const fase = d.projeto.fases.find((f) => f.id === e.fase)?.nome ?? "Sem fase";
  const processo = e.processo?.protocolo ? e.processo : d.projeto.projeto.processo;
  const feitos = e.checklist.filter((i) => i.feito).length;
  const aberta = !e.concluidaEm;
  const nota =
    aberta && !e.marco && e.medida === "tempo"
      ? "Progresso automático pelo tempo decorrido"
      : aberta && !e.marco && e.medida === "checklist"
        ? "Progresso calculado pelo checklist"
        : null;
  const principal = aberta
    ? h(
        "button",
        { type: "button", class: "spro-botao primario pequeno", onclick: a.aoConcluir },
        icone("check", 14),
        e.marco ? "Marcar como cumprido" : "Concluir etapa",
      )
    : h("button", { type: "button", class: "spro-botao pequeno", onclick: a.aoReabrir }, "Reabrir");
  return h(
    "div",
    { class: "prj-balao-corpo" },
    h(
      "button",
      {
        type: "button",
        class: "spro-botao-icone pequeno prj-balao-fechar",
        "aria-label": "Fechar",
        title: "Fechar (Esc)",
        onclick: fechar,
      },
      icone("fechar", 14),
    ),
    pilulaDaSituacao({ etapa: e, situacao }, d.hoje, atraso ? ` · ${textoDiasUteis(atraso)}` : ""),
    h("h3", {}, e.nome),
    h("div", { class: "prj-balao-sub" }, e.responsavel ? `${fase} · ${e.responsavel.nome}` : fase),
    datas(e),
    e.concluidaEm ? linha(icone("check", 15), `Concluída em ${dataLonga(e.concluidaEm)}`) : null,
    e.checklist.length ? linha(iconeProjetos("checklist", 15), `Checklist: ${feitos} de ${e.checklist.length} itens`) : null,
    e.documento
      ? linha(
          icone("documento", 15),
          link(
            e.documento.titulo ? `${e.documento.titulo} (SEI ${e.documento.numero})` : `Documento SEI ${e.documento.numero}`,
            "Abrir o documento no SEI",
            () => a.aoAbrirDocumento(e.documento!.numero),
          ),
        )
      : null,
    processo?.protocolo
      ? linha(
          icone(processo.sigiloso ? "cadeado" : "pasta", 15),
          link(processo.protocolo, "Abrir o processo", (ev) => a.aoAbrirProcesso(processo, ev)),
        )
      : null,
    aberta && !e.marco && e.medida === "manual" ? regua({ ...e, progresso: progressoDaEtapa(e, d.hoje) }, a.aoProgresso) : null,
    nota ? h("div", { class: "prj-balao-nota" }, nota) : null,
    h(
      "div",
      { class: "prj-balao-acoes" },
      principal,
      h("button", { type: "button", class: "spro-botao pequeno", onclick: () => a.aoEditar() }, icone("lapis", 14), "Editar"),
      menuDaEtapa(d, a),
    ),
  );
}

export function abrirBalaoEtapa(ancora: Element, d: DadosBalao, a: AcoesBalao, aoFechar?: () => void): Camada {
  let camada: Camada | null = null;
  const fechar = () => camada?.fechar();
  // Toda ação fecha o balão antes (o diálogo, o aviso ou o redesenho vêm depois).
  const fechando = <F extends (...args: never[]) => void>(f: F) =>
    ((...args: Parameters<F>) => {
      fechar();
      f(...args);
    }) as F;
  const acoes: AcoesBalao = {
    ...a,
    aoConcluir: fechando(a.aoConcluir),
    aoReabrir: fechando(a.aoReabrir),
    aoEditar: fechando(a.aoEditar),
    aoDuplicar: fechando(a.aoDuplicar),
    aoMoverFase: fechando(a.aoMoverFase),
    aoExcluir: fechando(a.aoExcluir),
  };
  camada = abrirCamada(ancora, conteudoDoBalao(d, acoes, fechar), { classe: "prj-balao", largura: 330, rotulo: d.etapa.nome, aoFechar });
  return camada;
}
