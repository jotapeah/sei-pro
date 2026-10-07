/**
 * O painel "Projetos" abaixo da lista do Controle de Processos (montagem
 * genérica de `@comum/painel/embutido`) e as pílulas de alerta do título
 * ("N atrasada(s)", "N vence(m) nesta semana"), visíveis também com o painel
 * recolhido. A página do SEI não tem a base visual do SEI Pro: o estilo das
 * pílulas vai em linha numa folha própria, com cores fixas para os dois temas.
 */

import type { DataISO } from "@comum/datas/dias";
import { instalarEstiloPainel, montarPainelEmbutido, ordemLegada, type PainelMontado } from "@comum/painel/embutido";
import { h, icone } from "@comum/ui/dom";
import { alertasDaUnidade, carregarUnidade } from "../app/dados";
import type { Vis } from "../modelo/tipos";
import type { TipoAlerta } from "../ponte/tipos";
import type { RepositorioProjetos } from "../repositorio";

export const ID_PAINEL = "projetosPro";
/** Id do painel legado (sei-pro-projetos.js): a ordem dele vale para o novo até o usuário mexer. */
export const ID_LEGADO = "projetosGantt";
const PREFIXO = "spro-prj";

export function ordemDoPainel(armazenamento: Pick<Storage, "getItem">): number | null {
  return ordemLegada(armazenamento, ID_PAINEL) ?? ordemLegada(armazenamento, ID_LEGADO);
}

function instalarEstilo(doc: Document): void {
  instalarEstiloPainel(doc, PREFIXO);
  if (doc.getElementById(`${PREFIXO}-alertas-estilo`)) return;
  const s = doc.createElement("style");
  s.id = `${PREFIXO}-alertas-estilo`;
  s.textContent = [
    `.${PREFIXO}-alertas{display:inline-flex;gap:6px;margin-left:10px}`,
    `.${PREFIXO}-pilula{display:inline-flex;align-items:center;gap:4px;min-height:24px;padding:0 10px;font:600 12.5px/1 system-ui,-apple-system,'Segoe UI',Roboto,sans-serif;border:0;border-radius:999px;cursor:pointer}`,
    `.${PREFIXO}-pilula:focus-visible{outline:2px solid #1a73e8;outline-offset:1px}`,
    `.${PREFIXO}-atrasadas{color:#b42318;background:rgb(209 53 43 / 12%)}`,
    `.${PREFIXO}-semana{color:#8a4b08;background:rgb(180 92 10 / 13%)}`,
    `.${PREFIXO}-escuro .${PREFIXO}-atrasadas{color:#ff7d73;background:rgb(255 125 115 / 16%)}`,
    `.${PREFIXO}-escuro .${PREFIXO}-semana{color:#e8b04a;background:rgb(232 176 74 / 16%)}`,
  ].join("\n");
  (doc.head ?? doc.documentElement).append(s);
}

export interface OpcoesPainelProjetos {
  urlApp: string;
  temaEscuro?: boolean;
  recolhido: boolean;
  ordem: number | null;
  aoRecolher(recolhido: boolean): void;
}

export function montarPainelProjetos(doc: Document, o: OpcoesPainelProjetos): PainelMontado | null {
  return montarPainelEmbutido(doc, {
    ...o,
    id: ID_PAINEL,
    titulo: "Projetos",
    tituloIframe: "Projetos do SEI Pro",
    prefixo: PREFIXO,
    rotulos: { mostrar: "Mostrar projetos", recolher: "Recolher projetos" },
    icone: () => {
      const g = icone("gantt", 22);
      g.setAttribute("style", `color:${o.temaEscuro ? "#79acff" : "#1f5fbf"}`);
      return g;
    },
    estilo: instalarEstilo,
    alturaInicial: 160,
  });
}

/** Pílulas do título; sem alerta, nenhuma (a caixa some). */
export function pintarAlertas(
  titulo: HTMLElement,
  a: { atrasadas: number; semana: number },
  temaEscuro: boolean,
  aoClicar: (t: TipoAlerta) => void,
): void {
  let caixa = titulo.querySelector<HTMLElement>(`.${PREFIXO}-alertas`);
  if (!caixa) {
    caixa = h("span", { class: `${PREFIXO}-alertas` });
    titulo.append(caixa);
  }
  caixa.classList.toggle(`${PREFIXO}-escuro`, temaEscuro);
  const pilula = (tipo: TipoAlerta, texto: string, dica: string) =>
    h("button", { type: "button", class: `${PREFIXO}-pilula ${PREFIXO}-${tipo}`, title: dica, onclick: () => aoClicar(tipo) }, texto);
  caixa.replaceChildren(
    ...(a.atrasadas
      ? [pilula("atrasadas", `${a.atrasadas} ${a.atrasadas === 1 ? "atrasada" : "atrasadas"}`, "Mostra as etapas atrasadas")]
      : []),
    ...(a.semana
      ? [pilula("semana", `${a.semana} ${a.semana === 1 ? "vence" : "vencem"} nesta semana`, "Etapas que vencem até sexta-feira")]
      : []),
  );
  caixa.hidden = !a.atrasadas && !a.semana;
}

export interface OpcoesAlertas {
  temaEscuro: boolean;
  /** Os dois escopos da unidade (a mesma leitura do app: `carregarUnidade`). */
  repos: Readonly<Record<Vis, RepositorioProjetos>>;
  /** A porta com o app (`ligarPortaDoPainel(...).rpc`): null até o iframe carregar e ligar. */
  rpc(): { chamar(op: string, args?: unknown): Promise<unknown> } | null;
  hoje(): DataISO;
  /** Espera antes de repintar (gravações seguidas viram uma pintura). Padrão: 150 ms. */
  atraso?: number;
  /** Intervalo entre tentativas de pedir o alerta enquanto o app não ligou (até ~9 s). Padrão: 300 ms. */
  espera?: number;
}

/**
 * Pílulas do título ligadas aos projetos: contam as etapas dos dois escopos da
 * unidade e se refazem a cada gravação (e ao voltar para a aba: o dia pode ter
 * virado). O clique abre o painel (se recolhido), rola até ele e pede ao app o
 * filtro; se o app ainda não ligou, tenta de novo por alguns segundos.
 */
export function ligarAlertas(montado: Pick<PainelMontado, "painel" | "corpo">, o: OpcoesAlertas): void {
  const titulo = montado.painel.querySelector<HTMLElement>(`.${PREFIXO}-titulo`);
  if (!titulo) return;
  const espera = o.espera ?? 300;
  let tentativa: ReturnType<typeof setTimeout> | null = null;
  const pedir = (tipo: TipoAlerta, restam: number) => {
    tentativa = null;
    const r = o.rpc();
    if (r) void r.chamar("alerta", { tipo }).catch(() => undefined);
    else if (restam > 0) tentativa = setTimeout(() => pedir(tipo, restam - 1), espera);
  };
  const aoClicar = (tipo: TipoAlerta) => {
    if (montado.corpo.hidden) montado.painel.querySelector<HTMLButtonElement>(`.${PREFIXO}-recolher`)?.click();
    montado.painel.scrollIntoView?.({ behavior: "smooth", block: "start" });
    // Um clique novo substitui o pedido que ainda esperava o app.
    if (tentativa) clearTimeout(tentativa);
    pedir(tipo, Math.ceil(9000 / Math.max(1, espera)));
  };
  let agendado: ReturnType<typeof setTimeout> | null = null;
  const pintar = () => {
    if (agendado) clearTimeout(agendado);
    agendado = setTimeout(() => {
      agendado = null;
      const hoje = o.hoje();
      void carregarUnidade(o.repos, hoje)
        .then((d) => pintarAlertas(titulo, alertasDaUnidade(d.ativos, hoje), o.temaEscuro, aoClicar))
        .catch(() => undefined);
    }, o.atraso ?? 150);
  };
  for (const r of Object.values(o.repos)) r.aoMudar(pintar);
  const doc = montado.painel.ownerDocument;
  doc.addEventListener("visibilitychange", () => {
    if (doc.visibilityState === "visible") pintar();
  });
  pintar();
}
