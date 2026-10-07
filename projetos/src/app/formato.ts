/** Textos curtos do painel: datas, plurais e as linhas do histórico de alterações. */

import { type DataISO, deISO, diferencaDias, formatarData, hojeISO } from "@comum/datas/dias";
import type { CampoHistorico, Registro } from "../modelo/tipos";

export { formatarData as dataLonga };

/** "06/10". */
export function dataCurta(iso: DataISO): string {
  const [, m, d] = iso.split("-");
  return `${d}/${m}`;
}

export function plural(n: number, um: string, varios: string): string {
  return `${n} ${n === 1 ? um : varios}`;
}

export function textoDiasUteis(n: number): string {
  return n === 1 ? "1 dia útil" : `${n} dias úteis`;
}

const ROTULO: Partial<Record<CampoHistorico, string>> = {
  nome: "nome",
  inicio: "início",
  fim: "término",
  responsavel: "responsável",
  progresso: "progresso",
  fase: "fase",
  dependencias: "dependências",
  processo: "processo",
  documento: "documento",
  base: "plano original",
};

const COM_ARTIGO: Partial<Record<CampoHistorico, string>> = {
  nome: "o nome",
  inicio: "o início",
  fim: "o término",
  responsavel: "o responsável",
  progresso: "o progresso",
  fase: "a fase",
  dependencias: "as dependências",
  processo: "o processo",
  documento: "o documento",
  base: "o plano original",
  visibilidade: "quem vê",
};

/**
 * O rótulo do campo, só das chaves da própria tabela: o campo vem do texto da unidade (versão mais nova ou
 * editado à mão) e "constructor" ou "toString" achariam a função do objeto ("function Object() …").
 */
const rotuloDe = (tabela: Partial<Record<CampoHistorico, string>>, campo: CampoHistorico): string =>
  (Object.hasOwn(tabela, campo) ? tabela[campo] : undefined) ?? campo;

const ehData = (s: string | undefined): boolean => !!s && /^\d{4}-\d{2}-\d{2}$/.test(s);

function valor(campo: CampoHistorico, v: string | undefined): string {
  if (v === undefined || v === "") return "—";
  if (ehData(v)) return dataCurta(v);
  if (campo === "progresso") return `${v}%`;
  if (campo === "base") {
    const [a = "", b = ""] = v.split("/");
    return ehData(a) && ehData(b) ? `${dataCurta(a)} a ${dataCurta(b)}` : v;
  }
  return v;
}

/** "término 25/09 → 02/10" (tela 2). `tipo` muda só a criação ("criou a etapa"). */
export function textoDoRegistro(r: Pick<Registro, "campo" | "antes" | "depois">, tipo?: "etapa" | "projeto" | "fase"): string {
  switch (r.campo) {
    case "criacao":
      return tipo ? `criou ${tipo === "fase" ? "a fase" : tipo === "etapa" ? "a etapa" : "o projeto"}` : "criou";
    case "exclusao":
      return "excluiu";
    case "restauracao":
      return "restaurou";
    case "conclusao":
      return r.depois ? `concluiu (${valor("conclusao", r.depois)})` : "reabriu";
    case "arquivamento":
      return r.depois === "arquivado" ? "arquivou" : "reativou";
    case "visibilidade":
      return `quem vê: ${valor(r.campo, r.antes)} → ${valor(r.campo, r.depois)}`;
    default:
      return `${rotuloDe(ROTULO, r.campo)} ${valor(r.campo, r.antes)} → ${valor(r.campo, r.depois)}`;
  }
}

/** "hoje", "ontem", "há 3 dias" (até 30) ou "em 01/07/2026". */
export function quandoRelativo(ms: number, agora: number): string {
  const dias = diferencaDias(hojeISO(new Date(ms)), hojeISO(new Date(agora)));
  if (dias <= 0) return "hoje";
  if (dias === 1) return "ontem";
  if (dias <= 30) return `há ${dias} dias`;
  return `em ${formatarData(hojeISO(new Date(ms)))}`;
}

/** Resumo da seção Histórico do diálogo da etapa: "Carla Dias alterou o término há 2 dias". */
export function resumoDoUltimoRegistro(r: Registro, agora: number): string {
  const quem = r.nome || r.por || "Alguém";
  let feito: string;
  if (r.campo === "criacao") feito = "criou a etapa";
  else if (r.campo === "conclusao") feito = r.depois ? "concluiu" : "reabriu";
  else if (r.campo === "exclusao") feito = "excluiu";
  else if (r.campo === "restauracao") feito = "restaurou";
  else feito = `alterou ${rotuloDe(COM_ARTIGO, r.campo)}`;
  return `${quem} ${feito} ${quandoRelativo(r.quando, agora)}`;
}

/** Data de formulário válida e dentro do calendário de feriados (2000 a 2100), ou null. */
export function dataDeFormulario(v: string): DataISO | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(v)) return null;
  const ano = Number(v.slice(0, 4));
  if (ano < 2000 || ano > 2100) return null;
  return hojeISO(deISO(v)) === v ? v : null;
}
