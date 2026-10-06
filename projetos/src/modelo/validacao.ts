/**
 * Validação dos dados que o usuário digita (spec 5.4 e 9). Devolve a lista de
 * mensagens; vazia = válido. O repositório lança `ErroValidacao` com ela, e o
 * diálogo mostra as mensagens como vieram.
 */

import { normalizarTexto } from "@comum/texto";
import { dataValida } from "./calendario";
import { LIMITES } from "./constantes";
import type { Etapa, ItemChecklist, Modelo, Projeto } from "./tipos";

export class ErroValidacao extends Error {
  constructor(readonly mensagens: string[]) {
    super(mensagens.join(" "));
    this.name = "ErroValidacao";
  }
}

/** Espaços nas pontas fora e espaços repetidos viram um. */
export function nomeLimpo(s: string): string {
  return s.replace(/\s+/g, " ").trim();
}

/** Sem vazias e sem repetidas (comparando sem acento e sem caixa); a primeira grafia fica. */
export function etiquetasLimpas(lista: readonly string[]): string[] {
  const vistas = new Set<string>();
  const saida: string[] = [];
  for (const bruta of lista) {
    const e = nomeLimpo(bruta);
    const chave = normalizarTexto(e);
    if (!e || vistas.has(chave)) continue;
    vistas.add(chave);
    saida.push(e);
  }
  return saida;
}

/** Itens sem texto saem; o texto perde os espaços das pontas. */
export function checklistLimpo(itens: readonly ItemChecklist[]): ItemChecklist[] {
  return itens.map((i) => ({ ...i, texto: nomeLimpo(i.texto) })).filter((i) => i.texto);
}

function problemasDoNome(nome: string, vazio: string): string[] {
  const n = nomeLimpo(nome);
  if (!n) return [vazio];
  if (n.length > LIMITES.nome) return [`O nome pode ter até ${LIMITES.nome} caracteres.`];
  return [];
}

function problemasDasEtiquetas(etiquetas: readonly string[]): string[] {
  const saida: string[] = [];
  if (etiquetas.length > LIMITES.etiquetas) saida.push(`Use até ${LIMITES.etiquetas} etiquetas.`);
  if (etiquetas.some((e) => e.length > LIMITES.etiquetaTexto))
    saida.push(`Cada etiqueta pode ter até ${LIMITES.etiquetaTexto} caracteres.`);
  return saida;
}

export function problemasDoProjeto(p: Pick<Projeto, "nome" | "etiquetas">): string[] {
  return [...problemasDoNome(p.nome, "Informe o nome do projeto."), ...problemasDasEtiquetas(p.etiquetas)];
}

export function problemasDaEtapa(
  e: Pick<Etapa, "nome" | "inicio" | "fim" | "progresso" | "checklist" | "etiquetas" | "observacoes">,
): string[] {
  const saida = problemasDoNome(e.nome, "Informe o nome da etapa.");
  if (!dataValida(e.inicio) || !dataValida(e.fim)) saida.push("Informe datas válidas.");
  else if (e.fim < e.inicio) saida.push("O término não pode ser antes do início.");
  if (!Number.isFinite(e.progresso) || e.progresso < 0 || e.progresso > 100) saida.push("O progresso vai de 0 a 100.");
  if (e.checklist.length > LIMITES.checklistItens) saida.push(`O checklist pode ter até ${LIMITES.checklistItens} itens.`);
  if (e.checklist.some((i) => i.texto.length > LIMITES.checklistTexto))
    saida.push(`Cada item do checklist pode ter até ${LIMITES.checklistTexto} caracteres.`);
  saida.push(...problemasDasEtiquetas(e.etiquetas));
  if ((e.observacoes ?? "").length > LIMITES.observacoes) saida.push("As observações podem ter até 2.000 caracteres.");
  return saida;
}

export function problemasDoModelo(m: Pick<Modelo, "nome" | "fases" | "etapas">): string[] {
  const saida = problemasDoNome(m.nome, "Informe o nome do modelo.");
  if (m.etapas.length > LIMITES.etapasPorProjeto) saida.push(`Um modelo pode ter até ${LIMITES.etapasPorProjeto} etapas.`);
  for (const e of m.etapas) {
    if (!nomeLimpo(e.nome)) saida.push("Toda etapa do modelo precisa de nome.");
    if (e.aPartirDe < 0 || e.duracao < 0) saida.push("As durações do modelo não podem ser negativas.");
    if (e.fase !== undefined && (e.fase < 0 || e.fase >= m.fases.length))
      saida.push("Etapa do modelo aponta para uma fase que não existe.");
  }
  return [...new Set(saida)];
}
