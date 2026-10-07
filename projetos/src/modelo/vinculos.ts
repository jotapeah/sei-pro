/**
 * Índice protocolo → vínculos, para o ícone da caixa e da árvore (spec 7):
 * um processo é "do projeto" (processo do projeto; as etapas sem processo
 * próprio vão junto) ou "de etapa" (só as etapas ligadas a ele). Projetos
 * arquivados e lápides ficam fora.
 */

import type { Etapa, Projeto, Vinculo, Vis } from "./tipos";

export interface VinculoProcesso {
  vis: Vis;
  projeto: Projeto;
  papel: "projeto" | "etapa";
  etapas: Etapa[];
}

/** Só os dígitos: "50300.001234/2026-11" e "50300001234202611" são o mesmo processo. */
export function chaveProtocolo(protocolo: string): string {
  return protocolo.replace(/\D/g, "");
}

/**
 * A chave do número de documento SEI: só os dígitos, sem os zeros à esquerda ("01234567" e "1234567" são o mesmo
 * documento; "000" é o documento "0"). A memória do sigilo, as marcas, o corte e a raspagem comparam por ela.
 */
export function chaveDocumento(numero: string): string {
  return numero.replace(/\D/g, "").replace(/^0+(?=\d)/, "");
}

/** Número de documento SEI guardado e compartilhado: só dígitos, de 1 a 20 (o vazio é "sem documento" ou o marcador). */
export const RE_DOCUMENTO = /^\d{1,20}$/;

/**
 * Forma do número de processo guardado e compartilhado: letras, dígitos, ponto, barra e hífen, até 40
 * (há SEI que escreve com letras, como o do RJ: "SEI-150016/000123/2021"; vazio no sigiloso que veio do
 * texto). Sem espaço nem `<>"'&`: o número vai à pesquisa rápida quando alguém clica.
 */
export const RE_PROTOCOLO = /^[A-Za-z0-9./-]{0,40}$/;
/** O id interno do processo no SEI: só dígitos. */
export const RE_ID_PROCEDIMENTO = /^\d{1,20}$/;

/**
 * Número de processo aceito (os formatos variam por órgão; o SEI-RJ escreve "SEI-150016/000123/2021"):
 * começa com letra ou dígito, termina em dígito, só letras, dígitos . / -, ao menos 8 dígitos e até 40
 * caracteres (a forma que o repositório aceita de um colega, `RE_PROTOCOLO`).
 */
export function protocoloValido(p: string): boolean {
  const t = p.trim();
  return t.length <= 40 && /^[A-Za-z0-9][A-Za-z0-9./-]*[0-9]$/.test(t) && t.replace(/\D/g, "").length >= 8;
}

/**
 * O número de processo num texto digitado, colado ou vindo de fora (o servidor do Atividades): o texto inteiro
 * (sem os espaços das pontas) quando ele passa em `protocoloValido`; senão, com rótulo ("Processo nº
 * 50300.000001/2026-11"), o ÚNICO pedaço separado por espaço que passa. Nenhum ou mais de um: null. Nada é
 * tirado do meio de um pedaço: com letras aceitas (SEI-RJ), limpar a marcação de "<b>12345678" fabricaria
 * um número que ninguém digitou.
 */
export function protocoloNoTexto(t: string): string | null {
  const inteiro = t.trim();
  if (protocoloValido(inteiro)) return inteiro;
  const pedacos = inteiro.split(/\s+/).filter(protocoloValido);
  return pedacos.length === 1 ? (pedacos[0] as string) : null;
}

const chaveDe = (v: Vinculo | undefined): string => (typeof v?.protocolo === "string" && v.protocolo ? chaveProtocolo(v.protocolo) : "");

export function indiceDeProcessos(
  escopos: ReadonlyArray<{ vis: Vis; projetos: readonly Projeto[]; etapas: readonly Etapa[] }>,
): Map<string, VinculoProcesso[]> {
  const indice = new Map<string, VinculoProcesso[]>();
  const pegar = (chave: string, vis: Vis, projeto: Projeto, papel: VinculoProcesso["papel"]): VinculoProcesso => {
    const lista = indice.get(chave) ?? [];
    let v = lista.find((x) => x.projeto.id === projeto.id && x.vis === vis);
    if (!v) {
      v = { vis, projeto, papel, etapas: [] };
      lista.push(v);
      indice.set(chave, lista);
    }
    if (papel === "projeto") v.papel = "projeto";
    return v;
  };
  for (const esc of escopos) {
    const projetos = new Map(esc.projetos.filter((p) => p.removidoEm === undefined && p.arquivadoEm === undefined).map((p) => [p.id, p]));
    for (const p of projetos.values()) {
      const k = chaveDe(p.processo);
      if (k) pegar(k, esc.vis, p, "projeto");
    }
    for (const e of esc.etapas) {
      const p = projetos.get(e.projeto);
      if (!p || e.removidoEm !== undefined) continue;
      const k = chaveDe(e.processo) || chaveDe(p.processo);
      if (!k) continue;
      pegar(k, esc.vis, p, e.processo ? "etapa" : "projeto").etapas.push(e);
    }
  }
  return indice;
}
