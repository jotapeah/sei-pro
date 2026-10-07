/**
 * "Exportar planilha (CSV)" (spec 3.1): uma linha por etapa dos projetos da
 * aba aberta, com o filtro aplicado. Processo sigiloso sai em branco (spec 9),
 * inclusive quando a etapa herdaria o do projeto. `gerarCsv` (sei-comum) põe
 * o BOM, o separador ";" e neutraliza fórmulas (= + - @).
 */

import { gerarCsv } from "@comum/csv";
import { formatarData } from "@comum/datas/dias";
import { normalizarTexto } from "@comum/texto";
import type { ProjetoNaTela } from "../app/dados";
import { duracaoUteis } from "../modelo/calendario";
import { rotuloDaVis } from "../modelo/escopo";
import { progressoDaEtapa } from "../modelo/progresso";
import { ROTULO_MARCO, ROTULO_SITUACAO, situacaoEtapa, situacaoMarco } from "../modelo/situacao";
import type { DataISO, Etapa, Vinculo } from "../modelo/tipos";

const CABECALHO = [
  "Projeto",
  "Quem vê",
  "Processo",
  "Fase",
  "Etapa",
  "Marco",
  "Responsável",
  "Início",
  "Término",
  "Dias úteis",
  "Situação",
  "Progresso (%)",
  "Concluída em",
  "Documento SEI",
  "Etiquetas",
  "Observações",
];

/** O número do processo, ou vazio se é sigiloso. */
const numero = (v: Vinculo | undefined): string => (v && !v.sigiloso ? v.protocolo : "");

function linhaDaEtapa(p: ProjetoNaTela, e: Etapa, hoje: DataISO): string[] {
  const fase = p.fases.find((f) => f.id === e.fase)?.nome ?? "";
  const situacao = e.marco ? ROTULO_MARCO[situacaoMarco(e, hoje)] : ROTULO_SITUACAO[situacaoEtapa(e, hoje)];
  return [
    p.projeto.nome,
    rotuloDaVis(p.vis),
    numero(e.processo ?? p.projeto.processo),
    fase,
    e.nome,
    e.marco ? "sim" : "",
    e.responsavel?.nome ?? "",
    formatarData(e.inicio),
    e.marco ? "" : formatarData(e.fim),
    e.marco ? "0" : String(duracaoUteis(e.inicio, e.fim)),
    situacao,
    String(progressoDaEtapa(e, hoje)),
    e.concluidaEm ? formatarData(e.concluidaEm) : "",
    e.documento?.numero ?? "",
    e.etiquetas.join(", "),
    e.observacoes ?? "",
  ];
}

/** `itens` já vêm com as etapas que passam no filtro. Projeto sem etapas sai numa linha só. */
export function csvDosProjetos(itens: readonly ProjetoNaTela[], hoje: DataISO): string {
  const linhas: string[][] = [CABECALHO];
  for (const p of itens) {
    if (!p.etapas.length) {
      linhas.push([p.projeto.nome, rotuloDaVis(p.vis), numero(p.projeto.processo), ...CABECALHO.slice(3).map(() => "")]);
      continue;
    }
    for (const e of p.etapas) linhas.push(linhaDaEtapa(p, e, hoje));
  }
  return gerarCsv(linhas);
}

/** "projeto-<nome>-<data>.csv" (aba de um projeto) ou "projetos-<data>.csv" (Todos). */
export function nomeDoCsv(nomeDoProjeto: string | null, hoje: DataISO): string {
  if (!nomeDoProjeto) return `projetos-${hoje}.csv`;
  const base =
    normalizarTexto(nomeDoProjeto)
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 50) || "projeto";
  return `projeto-${base}-${hoje}.csv`;
}
