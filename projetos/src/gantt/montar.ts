/**
 * Monta a Frappe Gantt (ajustada) numa área e devolve um controlador. O app
 * (P3) só fala com este módulo: escala, linhas, rolar para hoje, realce,
 * clique e mudança de datas. Arraste: a Frappe avisa `on_date_change` a cada
 * passo do mouse; aqui só se marca "pendente" e, ao soltar o botão, as datas
 * de TODAS as barras de etapa são relidas da posição (em dias inteiros) e
 * comparadas com as linhas. Recusa (`validar`) redesenha como estava.
 */

import { diferencaDias, somarDias } from "@comum/datas/dias";
import { dataDe, feriadosNoPeriodo } from "../modelo/calendario";
import type { DataISO, MudancaDeDatas } from "../modelo/tipos";
import Gantt, { type BarraFrappe, type OpcoesFrappe } from "../vendor/frappe-gantt/index";
import { decorar, decorarBarra, pxPorDia } from "./decorar";
import { ESCALAS, type Escala, escalaEditavel, MEDIDAS, MODOS } from "./escalas";
import type { Linha } from "./linhas";
import { tarefasDoGantt } from "./tarefas";

export const COR_FERIADO = "color-mix(in srgb, var(--spro-aviso) 14%, var(--spro-fundo))";
/** Teto de colunas desenhadas: um projeto com etapas em décadas diferentes não pode travar a página. */
export const MAX_COLUNAS = 1500;
/** Dias por coluna em cada escala (mês = 30 e ano = 365, como a Frappe mede). */
const DIAS_POR_COLUNA: Record<Escala, number> = { Dia: 1, Semana: 7, Mês: 30, Ano: 365 };
/** Folga da Frappe nas duas pontas (o padding de cada escala, com sobra). */
const FOLGA_DIAS: Record<Escala, number> = { Dia: 20, Semana: 40, Mês: 80, Ano: 800 };
/** Clique logo depois de soltar um arraste é o fim do arraste, não um pedido de balão. */
const PAUSA_CLIQUE_MS = 400;

export interface OpcoesGantt {
  escala: Escala;
  hoje: DataISO;
  /** Com a lista à esquerda, a fase não repete o nome no Gantt. */
  mostrarLista: boolean;
  /** Preferência "Mover dependentes ao arrastar" (spec 5.4). */
  moverDependentes: boolean;
  /** Portfólio e impressão: sem arrastar nem redimensionar. */
  somenteLeitura?: boolean;
  /** Dia que aparece à esquerda ao montar; padrão: hoje. */
  rolarPara?: DataISO;
  /** Clique numa etapa ou projeto (fase não chama). `ancora` = o grupo SVG da barra. */
  aoClicar?: (id: string, ancora: Element) => void;
  /** Mensagem para recusar o arraste (o Gantt volta como estava); null aceita. */
  validar?: (mudancas: MudancaDeDatas[]) => string | null;
  aoMudarDatas?: (mudancas: MudancaDeDatas[]) => void;
  aoRecusar?: (mensagem: string) => void;
  /** A escala pedida teria colunas demais: o Gantt montou na mais fina que cabe (`escala` do controle). */
  aoAjustarEscala?: (escala: Escala) => void;
  /** Exceção da Frappe ao montar (spec 9: o app cai para a vista Lista). Sem ela, a exceção sobe. */
  aoFalhar?: (erro: unknown) => void;
}

export interface ControleGantt {
  readonly escala: Escala;
  /** A instância da Frappe (null depois de falhar ou destruir). */
  readonly gantt: Gantt | null;
  trocarEscala(e: Escala): void;
  /** Redesenha com linhas novas, mantendo a rolagem horizontal. */
  atualizar(linhas: readonly Linha[]): void;
  rolarParaHoje(): void;
  realcar(id: string, ligado: boolean): void;
  destruir(): void;
}

/** Datas de uma barra pela posição, em dias inteiros (só Dia e Semana; lá 1 coluna = 1 ou 7 dias). */
export function datasDaBarra(g: Gantt, barra: BarraFrappe): { inicio: DataISO; fim: DataISO } {
  const px = pxPorDia(g);
  const x = Number(barra.$bar.getAttribute("x")) || 0;
  const largura = Number(barra.$bar.getAttribute("width")) || px;
  const inicio = somarDias(dataDe(g.gantt_start), Math.round(x / px));
  return { inicio, fim: somarDias(inicio, Math.max(1, Math.round(largura / px)) - 1) };
}

function intervalo(linhas: readonly Linha[], hoje: DataISO): { inicio: DataISO; fim: DataISO } {
  let inicio = hoje;
  let fim = hoje;
  for (const l of linhas) {
    const i = l.tipo === "etapa" ? l.etapa.inicio : l.inicio;
    const f = l.tipo === "etapa" ? l.etapa.fim : l.fim;
    if (i < inicio) inicio = i;
    if (f > fim) fim = f;
  }
  return { inicio, fim };
}

/** A escala pedida, ou a mais fina que cabe em `MAX_COLUNAS` colunas (Dia, Semana, Mês, Ano). */
export function escalaQueCabe(pedida: Escala, linhas: readonly Linha[], hoje: DataISO): Escala {
  const { inicio, fim } = intervalo(linhas, hoje);
  const dias = diferencaDias(inicio, fim) + 1;
  for (const e of ESCALAS.slice(ESCALAS.indexOf(pedida))) {
    if ((dias + FOLGA_DIAS[e]) / DIAS_POR_COLUNA[e] <= MAX_COLUNAS) return e;
  }
  return "Ano";
}

/** Opções fixas da Frappe para o SEI Pro (exportada para as provas). */
export function opcoesFrappe(
  op: Pick<OpcoesGantt, "escala" | "hoje" | "moverDependentes" | "somenteLeitura" | "rolarPara">,
  linhas: readonly Linha[],
): OpcoesFrappe {
  const { inicio, fim } = intervalo(linhas, op.hoje);
  const feriados =
    op.escala === "Dia" ? feriadosNoPeriodo(somarDias(inicio, -31), somarDias(fim, 31)).map((f) => ({ date: f.data, name: f.nome })) : [];
  return {
    language: "pt-BR",
    // Cópia: a Frappe altera o objeto do modo (padding vira par, texto vazio vira função).
    view_modes: MODOS.map((m) => ({ ...m })),
    view_mode: op.escala,
    bar_height: MEDIDAS.barra,
    padding: MEDIDAS.espaco,
    upper_header_height: MEDIDAS.cabecalhoSuperior,
    lower_header_height: MEDIDAS.cabecalhoInferior,
    bar_corner_radius: 5,
    arrow_curve: 6,
    container_height: "auto",
    today_button: false,
    view_mode_select: false,
    popup: false,
    readonly: !!op.somenteLeitura,
    readonly_dates: !escalaEditavel(op.escala),
    readonly_progress: true,
    move_dependencies: op.moverDependentes,
    infinite_padding: false,
    lines: "both",
    scroll_to: op.rolarPara ?? op.hoje,
    holidays: op.escala === "Dia" ? { "var(--g-weekend-highlight-color)": "weekend", [COR_FERIADO]: feriados } : {},
  };
}

export function montarGantt(area: HTMLElement, linhas: readonly Linha[], op: OpcoesGantt): ControleGantt {
  let pedida = op.escala;
  let escala = escalaQueCabe(pedida, linhas, op.hoje);
  let avisada: Escala | null = null;
  let atuais: readonly Linha[] = linhas;
  let mapa = new Map(atuais.map((l) => [l.id, l]));
  let gantt: Gantt | null = null;
  let pendente = false;
  let ultimoArraste = 0;
  const doc = area.ownerDocument;
  const dec = { mostrarLista: op.mostrarLista };

  const confirmar = (g: Gantt): void => {
    const mudancas: MudancaDeDatas[] = [];
    for (const b of g.bars) {
      const l = mapa.get(b.task.id);
      if (l?.tipo !== "etapa") continue;
      const d = datasDaBarra(g, b);
      const fim = l.etapa.marco ? d.inicio : d.fim;
      if (d.inicio !== l.etapa.inicio || fim !== l.etapa.fim) mudancas.push({ id: l.id, inicio: d.inicio, fim });
    }
    ultimoArraste = Date.now();
    if (!mudancas.length) {
      desenhar(true);
      return;
    }
    const recusa = op.validar?.(mudancas) ?? null;
    if (recusa) {
      desenhar(true);
      op.aoRecusar?.(recusa);
      return;
    }
    op.aoMudarDatas?.(mudancas);
  };

  const aoSoltar = (): void => {
    if (!pendente || !gantt) return;
    pendente = false;
    confirmar(gantt);
  };

  function ajustarEscala(): void {
    escala = escalaQueCabe(pedida, atuais, op.hoje);
    if (escala !== pedida && escala !== avisada) op.aoAjustarEscala?.(escala);
    avisada = escala !== pedida ? escala : null;
  }

  function desenhar(manterRolagem: boolean): void {
    const rolagem = manterRolagem ? gantt?.$container.scrollLeft : undefined;
    gantt?.destroy();
    gantt = null;
    area.replaceChildren();
    try {
      gantt = new Gantt(area, tarefasDoGantt(atuais), {
        ...opcoesFrappe({ ...op, escala }, atuais),
        on_click: (t) => {
          if (Date.now() - ultimoArraste < PAUSA_CLIQUE_MS) return;
          const l = mapa.get(t.id);
          if (!l || l.tipo === "fase") return;
          op.aoClicar?.(t.id, gantt?.get_bar(t.id)?.group ?? area);
        },
        on_date_change: () => {
          pendente = true;
        },
        after_render: (g, barra) => (barra ? decorarBarra(g, barra, mapa.get(barra.task.id), dec) : decorar(g, mapa, dec)),
      });
      if (rolagem !== undefined) gantt.$container.scrollLeft = rolagem;
    } catch (erro) {
      gantt = null;
      area.replaceChildren();
      if (!op.aoFalhar) throw erro;
      op.aoFalhar(erro);
    }
  }

  // Escopo do gantt.css (tokens --spro-* e classes de situação).
  area.classList.add("spro-gantt");
  doc.addEventListener("mouseup", aoSoltar);
  ajustarEscala();
  desenhar(false);

  return {
    get escala() {
      return escala;
    },
    get gantt() {
      return gantt;
    },
    trocarEscala(e) {
      if (e === pedida) return;
      pedida = e;
      ajustarEscala();
      desenhar(false);
    },
    atualizar(novas) {
      atuais = novas;
      mapa = new Map(atuais.map((l) => [l.id, l]));
      ajustarEscala();
      desenhar(true);
    },
    rolarParaHoje() {
      gantt?.scroll_current();
    },
    realcar(id, ligado) {
      gantt?.get_bar(id)?.group.classList.toggle("realce", ligado);
    },
    destruir() {
      doc.removeEventListener("mouseup", aoSoltar);
      gantt?.destroy();
      gantt = null;
      area.replaceChildren();
    },
  };
}
