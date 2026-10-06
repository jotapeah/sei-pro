/**
 * Validação dos dados que o usuário digita (spec 5.4 e 9). Devolve a lista de
 * mensagens; vazia = válido. O repositório lança `ErroValidacao` com ela, e o
 * diálogo mostra as mensagens como vieram.
 */

import { diferencaDias } from "@comum/datas/dias";
import { normalizarTexto } from "@comum/texto";
import { dataValida, LIMITE_DIAS_ETAPA, MAX_DIAS_UTEIS } from "./calendario";
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
  else if (diferencaDias(e.inicio, e.fim) > LIMITE_DIAS_ETAPA) saida.push("A etapa pode durar no máximo cerca de 10 anos.");
  if (!Number.isFinite(e.progresso) || e.progresso < 0 || e.progresso > 100) saida.push("O progresso vai de 0 a 100.");
  if (e.checklist.length > LIMITES.checklistItens) saida.push(`O checklist pode ter até ${LIMITES.checklistItens} itens.`);
  if (e.checklist.some((i) => i.texto.length > LIMITES.checklistTexto))
    saida.push(`Cada item do checklist pode ter até ${LIMITES.checklistTexto} caracteres.`);
  saida.push(...problemasDasEtiquetas(e.etiquetas));
  if ((e.observacoes ?? "").length > LIMITES.observacoes) saida.push("As observações podem ter até 2.000 caracteres.");
  return saida;
}

function inteiroNaFaixa(n: unknown, max: number): boolean {
  return typeof n === "number" && Number.isInteger(n) && n >= 0 && n <= max;
}

/**
 * Forma do conteúdo de um modelo, sem confiar nos tipos: o modelo pode vir de um
 * Texto Padrão da unidade editado à mão. É a mesma regra do cadastro e da importação.
 */
export function problemasDaEstruturaDoModelo(fases: unknown, etapas: unknown): string[] {
  if (!Array.isArray(fases) || !Array.isArray(etapas)) return ["O modelo precisa de lista de fases e de etapas."];
  const saida: string[] = [];
  if (fases.length > LIMITES.etapasPorProjeto) saida.push(`Um modelo pode ter até ${LIMITES.etapasPorProjeto} fases.`);
  if (fases.some((f) => typeof f !== "string")) saida.push("Toda fase do modelo precisa ser um texto.");
  if (etapas.length > LIMITES.etapasPorProjeto) {
    saida.push(`Um modelo pode ter até ${LIMITES.etapasPorProjeto} etapas.`);
    return saida;
  }
  etapas.forEach((e: unknown, i) => {
    if (!e || typeof e !== "object") {
      saida.push("Toda etapa do modelo precisa ser um objeto.");
      return;
    }
    const x = e as Record<string, unknown>;
    if (typeof x.nome !== "string" || !nomeLimpo(x.nome)) saida.push("Toda etapa do modelo precisa de nome.");
    if (!inteiroNaFaixa(x.aPartirDe, MAX_DIAS_UTEIS) || !inteiroNaFaixa(x.duracao, MAX_DIAS_UTEIS))
      saida.push(`As durações do modelo são números inteiros de 0 a ${MAX_DIAS_UTEIS} dias úteis.`);
    if (x.fase !== undefined && !(typeof x.fase === "number" && Number.isInteger(x.fase) && x.fase >= 0 && x.fase < fases.length))
      saida.push("Etapa do modelo aponta para uma fase que não existe.");
    if (
      !Array.isArray(x.dependeDe) ||
      x.dependeDe.some((d) => typeof d !== "number" || !Number.isInteger(d) || d < 0 || d >= etapas.length || d === i)
    )
      saida.push("Etapa do modelo depende de uma etapa que não existe ou dela mesma.");
    if (!Array.isArray(x.checklist) || x.checklist.some((t) => typeof t !== "string" || t.length > LIMITES.checklistTexto))
      saida.push(`Cada item do checklist do modelo é um texto de até ${LIMITES.checklistTexto} caracteres.`);
    else if (x.checklist.length > LIMITES.checklistItens) saida.push(`O checklist pode ter até ${LIMITES.checklistItens} itens.`);
  });
  return saida;
}

export function problemasDoModelo(m: Pick<Modelo, "nome" | "fases" | "etapas">): string[] {
  return [...new Set([...problemasDoNome(m.nome, "Informe o nome do modelo."), ...problemasDaEstruturaDoModelo(m.fases, m.etapas)])];
}
