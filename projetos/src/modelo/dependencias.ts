/**
 * Dependências entre etapas do MESMO projeto (spec 5.4): sem ciclo; arrastar
 * com "mover dependentes" desloca as dependentes pelos mesmos dias corridos.
 * As mensagens nomeiam as etapas, para o usuário achar o problema.
 */

import { diferencaDias, somarDias } from "@comum/datas/dias";
import type { Etapa, MudancaDeDatas } from "./tipos";

type No = Pick<Etapa, "id" | "dependeDe">;

const aspas = (nome: string): string => `“${nome}”`;

/** Um ciclo de dependências, como lista de ids que começa e termina na mesma etapa; null se não há. */
export function encontrarCiclo(etapas: readonly No[]): string[] | null {
  const deps = new Map(etapas.map((e) => [e.id, e.dependeDe]));
  const cor = new Map<string, 1 | 2>(); // 1 = na pilha, 2 = terminado
  const pilha: string[] = [];
  const visitar = (id: string): string[] | null => {
    cor.set(id, 1);
    pilha.push(id);
    for (const d of deps.get(id) ?? []) {
      if (!deps.has(d)) continue;
      const c = cor.get(d);
      if (c === 1) return [...pilha.slice(pilha.indexOf(d)), d];
      if (c === undefined) {
        const achou = visitar(d);
        if (achou) return achou;
      }
    }
    pilha.pop();
    cor.set(id, 2);
    return null;
  };
  for (const e of etapas) {
    if (cor.has(e.id)) continue;
    const achou = visitar(e.id);
    if (achou) return achou;
  }
  return null;
}

export function mensagemDeCiclo(ciclo: readonly string[], nomes: ReadonlyMap<string, string>): string {
  return `Dependência circular: ${ciclo.map((id) => aspas(nomes.get(id) ?? id)).join(" → ")}.`;
}

/**
 * Confere as dependências de UMA etapa (nova ou editada) contra as do projeto.
 * Devolve a mensagem do problema ou null.
 */
export function validarDependencias(etapa: Pick<Etapa, "id" | "projeto" | "dependeDe">, doProjeto: readonly Etapa[]): string | null {
  if (etapa.dependeDe.includes(etapa.id)) return "Uma etapa não pode depender dela mesma.";
  const vivas = new Map(doProjeto.filter((e) => e.removidoEm === undefined).map((e) => [e.id, e]));
  for (const d of etapa.dependeDe) {
    const alvo = vivas.get(d);
    if (!alvo || alvo.projeto !== etapa.projeto) return "Uma etapa só pode depender de etapas do mesmo projeto.";
  }
  const grafo = [...vivas.values()].filter((e) => e.id !== etapa.id).map((e) => ({ id: e.id, dependeDe: e.dependeDe }));
  grafo.push({ id: etapa.id, dependeDe: etapa.dependeDe });
  const achado = encontrarCiclo(grafo);
  if (!achado) return null;
  // O ciclo começa pela etapa que está sendo editada: é por ela que o usuário procura.
  const aberto = achado.slice(0, -1);
  const i = Math.max(0, aberto.indexOf(etapa.id));
  const ciclo = [...aberto.slice(i), ...aberto.slice(0, i)];
  ciclo.push(ciclo[0]!);
  const nomes = new Map([...vivas.values()].map((e) => [e.id, e.nome]));
  if (!nomes.has(etapa.id)) nomes.set(etapa.id, "esta etapa");
  return mensagemDeCiclo(ciclo, nomes);
}

/** Dependentes diretos e indiretos de `id`, em ordem de largura (sem repetir). */
export function dependentesTransitivos(etapas: readonly No[], id: string): string[] {
  const filhos = new Map<string, string[]>();
  for (const e of etapas) for (const d of e.dependeDe) filhos.set(d, [...(filhos.get(d) ?? []), e.id]);
  const vistos = new Set<string>([id]);
  const fila = [id];
  const saida: string[] = [];
  while (fila.length) {
    const atual = fila.shift()!;
    for (const f of filhos.get(atual) ?? []) {
      if (vistos.has(f)) continue;
      vistos.add(f);
      saida.push(f);
      fila.push(f);
    }
  }
  return saida;
}

/** Datas novas das dependentes de `id` deslocadas `dias` corridos (positivo = para frente). */
export function deslocarDependentes(etapas: readonly Etapa[], id: string, dias: number): MudancaDeDatas[] {
  if (!dias) return [];
  const porId = new Map(etapas.map((e) => [e.id, e]));
  return dependentesTransitivos(etapas, id).flatMap((d) => {
    const e = porId.get(d);
    if (!e || e.removidoEm !== undefined) return [];
    return [{ id: d, inicio: somarDias(e.inicio, dias), fim: somarDias(e.fim, dias) }];
  });
}

/**
 * Completa as mudanças de um arraste com "mover dependentes" ligado: dependente
 * que não estava na tela (fase recolhida, filtro) anda o mesmo número de dias
 * corridos da primeira etapa movida da qual depende. As já presentes ficam como vieram.
 */
export function completarComDependentes(etapas: readonly Etapa[], mudancas: readonly MudancaDeDatas[]): MudancaDeDatas[] {
  const porId = new Map(etapas.map((e) => [e.id, e]));
  const saida = new Map(mudancas.map((m) => [m.id, m]));
  for (const m of mudancas) {
    const antes = porId.get(m.id);
    if (!antes) continue;
    const dias = diferencaDias(antes.inicio, m.inicio);
    for (const d of deslocarDependentes(etapas, m.id, dias)) if (!saida.has(d.id)) saida.set(d.id, d);
  }
  return [...saida.values()];
}

/**
 * Problemas de datas nas etapas `ids` (todas, se ausente): término antes do
 * início, marco com duas datas, e etapa que começa antes de uma etapa da qual
 * depende (a mesma regra que a Frappe aplica ao arrastar).
 */
export function violacoesDeDatas(etapas: readonly Etapa[], ids?: ReadonlySet<string>): string[] {
  const vivas = etapas.filter((e) => e.removidoEm === undefined);
  const porId = new Map(vivas.map((e) => [e.id, e]));
  const saida: string[] = [];
  for (const e of vivas) {
    if (ids && !ids.has(e.id)) continue;
    if (e.fim < e.inicio) saida.push(`${aspas(e.nome)} termina antes de começar.`);
    if (e.marco && e.fim !== e.inicio) saida.push(`O marco ${aspas(e.nome)} tem uma data só.`);
    for (const d of e.dependeDe) {
      const dep = porId.get(d);
      if (dep && e.inicio < dep.inicio) saida.push(`${aspas(e.nome)} não pode começar antes de ${aspas(dep.nome)}, da qual depende.`);
    }
  }
  return saida;
}
