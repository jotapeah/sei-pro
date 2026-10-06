/**
 * Linhas → tarefas da Frappe. Cada linha vira exatamente UMA tarefa válida,
 * senão a lista à esquerda desalinha do Gantt: a Frappe descarta tarefa sem
 * data, com término antes do início ou com mais de 10 anos.
 */

import { somarDias } from "@comum/datas/dias";
import type { DataISO } from "../modelo/tipos";
import type { TarefaFrappe } from "../vendor/frappe-gantt/index";
import type { Linha } from "./linhas";

/** Teto de desenho (a Frappe recusa mais de 10 anos). */
const TETO_DIAS = 3650;

export function classesDaLinha(l: Linha): string {
  if (l.tipo === "fase") return l.resumo.total ? "st-fase" : "st-fase st-vazia";
  if (l.tipo === "projeto") {
    const s = l.resumo.situacao;
    const st =
      s === "concluido"
        ? "st-concluida"
        : s === "atrasado"
          ? "st-atrasada"
          : s === "andamento"
            ? "st-andamento"
            : s === "aIniciar"
              ? "st-futura"
              : "st-vazia";
    return `st-proj ${st}`;
  }
  return l.etapa.marco ? `st-marco st-${l.situacao}` : `st-${l.situacao}`;
}

function datasDesenhaveis(inicio: DataISO, fim: DataISO): { start: DataISO; end: DataISO } {
  const end = fim < inicio ? inicio : fim;
  const teto = somarDias(inicio, TETO_DIAS);
  return { start: inicio, end: end > teto ? teto : end };
}

export function tarefasDoGantt(linhas: readonly Linha[]): TarefaFrappe[] {
  return linhas.map((l) => {
    if (l.tipo === "etapa") {
      return {
        id: l.id,
        name: l.etapa.nome,
        ...datasDesenhaveis(l.etapa.inicio, l.etapa.fim),
        progress: l.etapa.marco ? 0 : l.progresso,
        dependencies: l.dependeDe.join(","),
        custom_class: classesDaLinha(l),
      };
    }
    const nome = l.tipo === "fase" ? l.fase.nome : l.projeto.nome;
    const progresso = l.resumo.progresso;
    return {
      id: l.id,
      name: nome,
      ...datasDesenhaveis(l.inicio, l.fim),
      progress: progresso,
      dependencies: "",
      custom_class: classesDaLinha(l),
    };
  });
}
