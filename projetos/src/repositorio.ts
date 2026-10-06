/**
 * Projetos de UM escopo (host + login + unidade + "unidade"/"eu") no
 * `chrome.storage.local`, uma chave por entidade (molde:
 * `favoritos/src/repositorio.ts`). Remover grava lápide; toda gravação leva o
 * carimbo (quando, dispositivo, quem) e gera os registros do histórico.
 */

import type { Area } from "@comum/armazenamento/area";
import { Colecao, obterPorPrefixo } from "@comum/armazenamento/colecao";
import { novoId } from "@comum/id";
import { indiceEntre, indiceValido } from "@comum/ordem/indice";
import { mesclar, purgarLapides, type Versionada } from "@comum/sincronia/entidade";
import { normalizarTexto } from "@comum/texto";
import { dataValida } from "./modelo/calendario";
import { DIAS_LAPIDE_EU, DIAS_LAPIDE_UNIDADE, LIMITES } from "./modelo/constantes";
import { validarDependencias, violacoesDeDatas } from "./modelo/dependencias";
import { baseDoEscopo, chaveMeta, prefixoDe, rotuloDaVis } from "./modelo/escopo";
import {
  type ApoioHistorico,
  carimbarRegistros,
  excedentes,
  type RegistroNovo,
  registrosDeEtapa,
  registrosDeFase,
  registrosDeProjeto,
} from "./modelo/historico";
import { aplicarDatas, baseInicial, redefinirBase, replanejada } from "./modelo/linhaDeBase";
import {
  concluir,
  type DadosNovaEtapa,
  type DadosNovoProjeto,
  editar,
  novaEtapa,
  novaFase,
  novoProjeto,
  porOrdem,
  reabrir,
  remover,
  restaurar,
  semVazios,
} from "./modelo/operacoes";
import type {
  Carimbo,
  DataISO,
  DocumentoSei,
  Entidade,
  Entidades,
  EnvelopeProjetos,
  Escopo,
  Etapa,
  Fase,
  Modelo,
  MudancaDeDatas,
  Projeto,
  Registro,
  Vinculo,
} from "./modelo/tipos";
import { checklistLimpo, ErroValidacao, etiquetasLimpas, nomeLimpo, problemasDaEtapa, problemasDoProjeto } from "./modelo/validacao";
import { indiceDeProcessos, type VinculoProcesso } from "./modelo/vinculos";

/** O que está vivo no escopo (sem lápides), numa leitura só. */
export interface Dados {
  projetos: Projeto[];
  fases: Fase[];
  etapas: Etapa[];
  modelos: Modelo[];
}

/** Só campo opcional aceita `undefined` (apaga); nos obrigatórios ele é ignorado. */
type Mudanca<T, Obrigatorios extends keyof T, Opcionais extends keyof T> = {
  [K in Obrigatorios]?: Exclude<T[K], undefined>;
} & { [K in Opcionais]?: T[K] };

export type MudancasProjeto = Mudanca<Projeto, "nome" | "etiquetas", "processo">;
export type MudancasEtapa = Mudanca<
  Etapa,
  "nome" | "inicio" | "fim" | "marco" | "dependeDe" | "medida" | "progresso" | "checklist" | "etiquetas",
  "fase" | "responsavel" | "processo" | "documento" | "observacoes"
>;

const OBRIGATORIOS_PROJETO = ["nome", "etiquetas"] as const;
const OBRIGATORIOS_ETAPA = ["nome", "inicio", "fim", "marco", "dependeDe", "medida", "progresso", "checklist", "etiquetas"] as const;

/** Cópia sem as chaves obrigatórias que vieram `undefined` (o contrato "undefined apaga" é só dos opcionais). */
function semObrigatoriosVazios<T extends object>(m: T, obrigatorios: readonly string[]): T {
  const r = { ...m } as Record<string, unknown>;
  for (const k of obrigatorios) if (r[k] === undefined) delete r[k];
  return r as T;
}

// Chave inválida (dado antigo ou editado à mão) não entra na conta: senão nada novo grava.
const maiorOrdem = (itens: ReadonlyArray<{ ordem: string }>): string | null =>
  itens.reduce<string | null>((m, i) => (indiceValido(i.ordem) && (m === null || i.ordem > m) ? i.ordem : m), null);

const vivo = <T extends { removidoEm?: number }>(x: T | undefined): x is T => !!x && x.removidoEm === undefined;

export class RepositorioProjetos {
  readonly projetos: Colecao<Projeto>;
  readonly fases: Colecao<Fase>;
  readonly etapas: Colecao<Etapa>;
  readonly registros: Colecao<Registro>;
  readonly modelos: Colecao<Modelo>;
  private readonly base: string;

  constructor(
    private readonly area: Area,
    readonly escopo: Escopo,
    private readonly carimbo: () => Carimbo,
    private readonly gerarId: () => string = novoId,
  ) {
    this.base = baseDoEscopo(escopo);
    this.projetos = new Colecao<Projeto>(area, prefixoDe(escopo, "p"));
    this.fases = new Colecao<Fase>(area, prefixoDe(escopo, "f"));
    this.etapas = new Colecao<Etapa>(area, prefixoDe(escopo, "e"));
    this.registros = new Colecao<Registro>(area, prefixoDe(escopo, "h"));
    this.modelos = new Colecao<Modelo>(area, prefixoDe(escopo, "m"));
  }

  /** Guarda o escopo por extenso (a exportação e o arquivo usam). */
  async registrar(): Promise<void> {
    await this.area.gravar({ [chaveMeta(this.escopo)]: { escopo: this.escopo } });
  }

  /** Tudo do escopo, com lápides, numa leitura só (sincronia, arquivo). */
  async entidades(): Promise<Entidades> {
    const tudo = Object.entries(await obterPorPrefixo(this.area, this.base));
    const de = <T>(t: string) => tudo.filter(([k]) => k.startsWith(`${this.base}${t}/`)).map(([, v]) => v as T);
    return { p: de<Projeto>("p"), f: de<Fase>("f"), e: de<Etapa>("e"), h: de<Registro>("h"), m: de<Modelo>("m") };
  }

  /** O que está vivo: projetos, fases e etapas na ordem manual; modelos pelo nome. */
  async dados(): Promise<Dados> {
    const t = await this.entidades();
    const projetos = t.p.filter(vivo).sort(porOrdem);
    const ativos = new Set(projetos.map((p) => p.id));
    return {
      projetos,
      fases: t.f.filter((f) => vivo(f) && ativos.has(f.projeto)).sort(porOrdem),
      etapas: t.e.filter((e) => vivo(e) && ativos.has(e.projeto)).sort(porOrdem),
      modelos: t.m.filter(vivo).sort((a, b) => a.nome.localeCompare(b.nome, "pt-BR")),
    };
  }

  /** Carimbo para gravações feitas fora da classe (mover entre escopos). */
  carimboAtual(): Carimbo {
    return this.carimbo();
  }

  /** Registro "visibilidade" (mover entre "Só eu" e "Toda a unidade"). */
  async anotarVisibilidade(p: Projeto, antes: string, depois: string, c: Carimbo): Promise<void> {
    await this.salvar({}, [{ alvo: p.id, projeto: p.id, campo: "visibilidade", antes, depois }], c);
  }

  // ---------- histórico ----------

  /** Registros vivos, do mais recente ao mais antigo (de um projeto, se informado). */
  async historico(projeto?: string): Promise<Registro[]> {
    return (await this.registros.listar())
      .filter((r) => vivo(r) && (!projeto || r.projeto === projeto))
      .sort((a, b) => b.quando - a.quando || (a.id < b.id ? 1 : a.id > b.id ? -1 : 0));
  }

  private entradas<T>(col: Colecao<T>, itens: Array<[string, T]>): Record<string, unknown> {
    return Object.fromEntries(itens.map(([id, v]) => [col.chave(id), v]));
  }

  /**
   * Grava de uma vez as entidades e os registros do histórico (um `area.gravar` só: o
   * `chrome.storage.local.set` é atômico, então nenhum ouvinte nem unload vê meio estado e
   * `aoMudar` avisa uma vez). A poda de excedentes (`Area` só remove em outra chamada) vem depois,
   * e só quando passa do limite.
   */
  private async salvar(itens: Record<string, unknown>, novos: RegistroNovo[], c: Carimbo): Promise<void> {
    const regs = carimbarRegistros(novos, c, this.gerarId);
    await this.area.gravar({
      ...itens,
      ...this.entradas(
        this.registros,
        regs.map((r) => [r.id, r]),
      ),
    });
    if (!regs.length) return;
    const sobra = excedentes(await this.registros.listar(), LIMITES.historico);
    await this.registros.apagar(sobra);
  }

  private async apoio(projeto: string): Promise<ApoioHistorico> {
    const [fases, etapas] = await Promise.all([this.fases.listar(), this.etapas.listar()]);
    const nf = new Map(fases.filter((f) => f.projeto === projeto).map((f) => [f.id, f.nome]));
    const ne = new Map(etapas.filter((e) => e.projeto === projeto).map((e) => [e.id, e.nome]));
    return { nomeDaFase: (id) => nf.get(id), nomeDaEtapa: (id) => ne.get(id) };
  }

  // ---------- projetos ----------

  private async exigirVagaDeProjeto(): Promise<void> {
    const ativos = (await this.projetos.listar()).filter((p) => vivo(p) && p.arquivadoEm === undefined);
    if (ativos.length >= LIMITES.projetosAtivos)
      throw new ErroValidacao([
        `Limite de ${LIMITES.projetosAtivos} projetos ativos em “${rotuloDaVis(this.escopo.vis)}”. Arquive ou exclua algum.`,
      ]);
  }

  async obterProjeto(id: string): Promise<Projeto | undefined> {
    const p = await this.projetos.obter(id);
    return vivo(p) ? p : undefined;
  }

  private async exigirProjeto(id: string): Promise<Projeto> {
    const p = await this.obterProjeto(id);
    if (!p) throw new ErroValidacao(["O projeto não existe mais."]);
    return p;
  }

  async criarProjeto(d: DadosNovoProjeto): Promise<Projeto> {
    await this.exigirVagaDeProjeto();
    const c = this.carimbo();
    const p = novoProjeto(d, this.gerarId(), indiceEntre(maiorOrdem(await this.projetos.listar()), null), c);
    const problemas = problemasDoProjeto(p);
    if (problemas.length) throw new ErroValidacao(problemas);
    await this.salvar(this.entradas(this.projetos, [[p.id, p]]), registrosDeProjeto(undefined, p), c);
    return p;
  }

  async editarProjeto(id: string, m: MudancasProjeto): Promise<Projeto> {
    const atual = await this.exigirProjeto(id);
    const mud: MudancasProjeto = semObrigatoriosVazios(m, OBRIGATORIOS_PROJETO);
    if (typeof mud.nome === "string") mud.nome = nomeLimpo(mud.nome);
    if (mud.etiquetas) mud.etiquetas = etiquetasLimpas(mud.etiquetas);
    const problemas = problemasDoProjeto({ ...atual, ...mud });
    if (problemas.length) throw new ErroValidacao(problemas);
    const c = this.carimbo();
    const p = editar(atual, mud, c);
    await this.salvar(this.entradas(this.projetos, [[id, p]]), registrosDeProjeto(atual, p), c);
    return p;
  }

  async arquivarProjeto(id: string): Promise<Projeto> {
    const atual = await this.exigirProjeto(id);
    if (atual.arquivadoEm !== undefined) return atual;
    const c = this.carimbo();
    const p = editar(atual, { arquivadoEm: c.agora }, c);
    await this.salvar(this.entradas(this.projetos, [[id, p]]), registrosDeProjeto(atual, p), c);
    return p;
  }

  async reativarProjeto(id: string): Promise<Projeto> {
    const atual = await this.exigirProjeto(id);
    if (atual.arquivadoEm === undefined) return atual;
    await this.exigirVagaDeProjeto();
    const c = this.carimbo();
    const p = editar(atual, { arquivadoEm: undefined }, c);
    await this.salvar(this.entradas(this.projetos, [[id, p]]), registrosDeProjeto(atual, p), c);
    return p;
  }

  /** Lápide no projeto, nas fases e nas etapas vivas dele, com o MESMO instante (o "Desfazer" usa). */
  async removerProjeto(id: string): Promise<void> {
    const atual = await this.exigirProjeto(id);
    const c = this.carimbo();
    const [fases, etapas] = await Promise.all([this.fases.listar(), this.etapas.listar()]);
    const p = remover(atual, c);
    await this.salvar(
      {
        ...this.entradas(
          this.fases,
          fases.filter((f) => vivo(f) && f.projeto === id).map((f) => [f.id, remover(f, c)]),
        ),
        ...this.entradas(
          this.etapas,
          etapas.filter((e) => vivo(e) && e.projeto === id).map((e) => [e.id, remover(e, c)]),
        ),
        ...this.entradas(this.projetos, [[id, p]]),
      },
      registrosDeProjeto(atual, p),
      c,
    );
  }

  /** Desfaz `removerProjeto`: volta o projeto e o que foi removido junto com ele. */
  async restaurarProjeto(id: string): Promise<Projeto | undefined> {
    const atual = await this.projetos.obter(id);
    if (!atual || atual.removidoEm === undefined) return atual;
    const quando = atual.removidoEm;
    const c = this.carimbo();
    const [fases, etapas] = await Promise.all([this.fases.listar(), this.etapas.listar()]);
    const p = restaurar(atual, c);
    await this.salvar(
      {
        ...this.entradas(
          this.fases,
          fases.filter((f) => f.projeto === id && f.removidoEm === quando).map((f) => [f.id, restaurar(f, c)]),
        ),
        ...this.entradas(
          this.etapas,
          etapas.filter((e) => e.projeto === id && e.removidoEm === quando).map((e) => [e.id, restaurar(e, c)]),
        ),
        ...this.entradas(this.projetos, [[id, p]]),
      },
      registrosDeProjeto(atual, p),
      c,
    );
    return p;
  }

  /**
   * Cópia com ids novos ("Cópia de ..."): mesmas fases, etapas e dependências; a
   * execução recomeça (sem conclusão, progresso manual 0, checklist desmarcado,
   * sem documento, base = datas).
   */
  async duplicarProjeto(id: string): Promise<Projeto> {
    const origem = await this.exigirProjeto(id);
    await this.exigirVagaDeProjeto();
    const c = this.carimbo();
    const { fases, etapas } = await this.dados();
    const p = novoProjeto(
      { nome: `Cópia de ${origem.nome}`.slice(0, LIMITES.nome), processo: origem.processo, etiquetas: origem.etiquetas },
      this.gerarId(),
      indiceEntre(maiorOrdem(await this.projetos.listar()), null),
      c,
    );
    const novasFases = new Map<string, Fase>();
    for (const f of fases.filter((x) => x.projeto === id)) novasFases.set(f.id, novaFase(p.id, f.nome, this.gerarId(), f.ordem, c));
    const doProjeto = etapas.filter((e) => e.projeto === id);
    const novosIds = new Map(doProjeto.map((e) => [e.id, this.gerarId()]));
    const novas = doProjeto.map((e) =>
      novaEtapa(
        {
          projeto: p.id,
          nome: e.nome,
          inicio: e.inicio,
          fim: e.fim,
          fase: e.fase ? novasFases.get(e.fase)?.id : undefined,
          marco: e.marco,
          dependeDe: e.dependeDe.map((d) => novosIds.get(d)).filter((d): d is string => !!d),
          responsavel: e.responsavel,
          medida: e.medida,
          checklist: e.checklist.map((i) => ({ ...i, id: this.gerarId(), feito: false })),
          processo: e.processo,
          etiquetas: e.etiquetas,
          observacoes: e.observacoes,
        },
        novosIds.get(e.id)!,
        e.ordem,
        c,
      ),
    );
    await this.salvar(
      {
        ...this.entradas(this.projetos, [[p.id, p]]),
        ...this.entradas(
          this.fases,
          [...novasFases.values()].map((f) => [f.id, f]),
        ),
        ...this.entradas(
          this.etapas,
          novas.map((e) => [e.id, e]),
        ),
      },
      registrosDeProjeto(undefined, p),
      c,
    );
    return p;
  }

  // ---------- fases ----------

  /** "Combo que cria": se já existe fase viva com o mesmo nome (sem acento e sem caixa), devolve ela. */
  async criarFase(projeto: string, nome: string): Promise<Fase> {
    await this.exigirProjeto(projeto);
    const limpo = nomeLimpo(nome);
    if (!limpo) throw new ErroValidacao(["Informe o nome da fase."]);
    if (limpo.length > LIMITES.nome) throw new ErroValidacao([`O nome pode ter até ${LIMITES.nome} caracteres.`]);
    const todas = await this.fases.listar();
    const igual = todas.find((f) => vivo(f) && f.projeto === projeto && normalizarTexto(f.nome) === normalizarTexto(limpo));
    if (igual) return igual;
    const c = this.carimbo();
    const f = novaFase(projeto, limpo, this.gerarId(), indiceEntre(maiorOrdem(todas.filter((x) => x.projeto === projeto)), null), c);
    await this.salvar(this.entradas(this.fases, [[f.id, f]]), registrosDeFase(undefined, f), c);
    return f;
  }

  async renomearFase(id: string, nome: string): Promise<Fase> {
    const atual = await this.fases.obter(id);
    if (!vivo(atual)) throw new ErroValidacao(["A fase não existe mais."]);
    const limpo = nomeLimpo(nome);
    if (!limpo) throw new ErroValidacao(["Informe o nome da fase."]);
    const c = this.carimbo();
    const f = editar(atual, { nome: limpo.slice(0, LIMITES.nome) }, c);
    await this.salvar(this.entradas(this.fases, [[id, f]]), registrosDeFase(atual, f), c);
    return f;
  }

  /** As etapas da fase ficam sem fase (não somem). */
  async removerFase(id: string): Promise<void> {
    const atual = await this.fases.obter(id);
    if (!vivo(atual)) return;
    const c = this.carimbo();
    const afetadas = (await this.etapas.listar()).filter((e) => vivo(e) && e.fase === id);
    const f = remover(atual, c);
    await this.salvar(
      {
        ...this.entradas(
          this.etapas,
          afetadas.map((e) => [e.id, editar(e, { fase: undefined }, c)]),
        ),
        ...this.entradas(this.fases, [[id, f]]),
      },
      registrosDeFase(atual, f),
      c,
    );
  }

  // ---------- etapas ----------

  async obterEtapa(id: string): Promise<Etapa | undefined> {
    const e = await this.etapas.obter(id);
    return vivo(e) ? e : undefined;
  }

  private async etapasDoProjeto(projeto: string): Promise<Etapa[]> {
    return (await this.etapas.listar()).filter((e) => vivo(e) && e.projeto === projeto);
  }

  /**
   * `antigos`: dependências já salvas. As que apontam para etapa removida ficam (voltam a valer se ela
   * for restaurada) e não são validadas; só id novo precisa estar vivo. A fase só é conferida
   * quando está sendo escolhida agora (`conferirFase`): fase morta já salva conta como "sem fase".
   */
  private async conferirEtapa(e: Etapa, doProjeto: Etapa[], antigos: readonly string[] = [], conferirFase = true): Promise<void> {
    const vivas = new Set(doProjeto.map((x) => x.id));
    const alvo = { ...e, dependeDe: e.dependeDe.filter((d) => vivas.has(d) || !antigos.includes(d)) };
    const problemas = problemasDaEtapa(e);
    const dep = validarDependencias(alvo, doProjeto);
    if (dep) problemas.push(dep);
    if (e.fase && conferirFase) {
      const f = await this.fases.obter(e.fase);
      if (!vivo(f) || f.projeto !== e.projeto) problemas.push("A fase escolhida não existe mais.");
    }
    if (problemas.length) throw new ErroValidacao(problemas);
  }

  async criarEtapa(d: DadosNovaEtapa): Promise<Etapa> {
    await this.exigirProjeto(d.projeto);
    const doProjeto = await this.etapasDoProjeto(d.projeto);
    if (doProjeto.length >= LIMITES.etapasPorProjeto)
      throw new ErroValidacao([`Um projeto pode ter até ${LIMITES.etapasPorProjeto} etapas.`]);
    const c = this.carimbo();
    const e = novaEtapa(d, this.gerarId(), indiceEntre(maiorOrdem(doProjeto), null), c);
    await this.conferirEtapa(e, doProjeto);
    await this.salvar(this.entradas(this.etapas, [[e.id, e]]), registrosDeEtapa(undefined, e), c);
    return e;
  }

  async editarEtapa(id: string, m: MudancasEtapa, hoje: DataISO): Promise<Etapa> {
    const atual = await this.obterEtapa(id);
    if (!atual) throw new ErroValidacao(["A etapa não existe mais."]);
    const mud: MudancasEtapa = semObrigatoriosVazios(m, OBRIGATORIOS_ETAPA);
    if (typeof mud.nome === "string") mud.nome = nomeLimpo(mud.nome);
    if (mud.etiquetas) mud.etiquetas = etiquetasLimpas(mud.etiquetas);
    if (mud.checklist) mud.checklist = checklistLimpo(mud.checklist);
    if (mud.dependeDe) mud.dependeDe = [...new Set(mud.dependeDe)];
    if (typeof mud.progresso === "number") mud.progresso = Math.round(mud.progresso);
    if (typeof mud.observacoes === "string" && !mud.observacoes.trim()) mud.observacoes = undefined;
    const marco = mud.marco ?? atual.marco;
    const inicio = mud.inicio ?? atual.inicio;
    const fim = marco ? inicio : (mud.fim ?? atual.fim);
    const datas = inicio !== atual.inicio || fim !== atual.fim ? aplicarDatas(atual, inicio, fim, hoje) : { inicio, fim, base: atual.base };
    const final: MudancasEtapa & Pick<Etapa, "base"> = { ...mud, ...datas, marco };
    const doProjeto = await this.etapasDoProjeto(atual.projeto);
    await this.conferirEtapa(semVazios({ ...atual, ...final }), doProjeto, atual.dependeDe, mud.fase !== undefined);
    const c = this.carimbo();
    const e = editar(atual, final, c);
    await this.salvar(this.entradas(this.etapas, [[id, e]]), registrosDeEtapa(atual, e, await this.apoio(atual.projeto)), c);
    return e;
  }

  /**
   * Datas de um arraste no Gantt (ou de dependentes deslocadas). Aplica a regra
   * da linha de base; recusa (sem gravar nada) se sobrar violação de datas.
   */
  async moverDatas(mudancas: readonly MudancaDeDatas[], hoje: DataISO): Promise<Etapa[]> {
    const todas = (await this.etapas.listar()).filter(vivo);
    const porId = new Map(todas.map((e) => [e.id, e]));
    const novas = new Map<string, Etapa>();
    for (const m of mudancas) {
      const atual = porId.get(m.id);
      if (!atual) continue;
      const fim = atual.marco ? m.inicio : m.fim;
      novas.set(m.id, { ...atual, ...aplicarDatas(atual, m.inicio, fim, hoje) });
    }
    if (!novas.size) return [];
    const depois = todas.map((e) => novas.get(e.id) ?? e);
    const problemas = violacoesDeDatas(depois, new Set(novas.keys()));
    if (problemas.length) throw new ErroValidacao(problemas);
    const c = this.carimbo();
    const gravadas = [...novas.values()].map((e) => editar(porId.get(e.id)!, { inicio: e.inicio, fim: e.fim, base: e.base }, c));
    const registros = gravadas.flatMap((e) => registrosDeEtapa(porId.get(e.id), e));
    await this.salvar(
      this.entradas(
        this.etapas,
        gravadas.map((e) => [e.id, e]),
      ),
      registros,
      c,
    );
    return gravadas;
  }

  async concluirEtapa(id: string, hoje: DataISO, documento?: DocumentoSei): Promise<Etapa> {
    const atual = await this.obterEtapa(id);
    if (!atual) throw new ErroValidacao(["A etapa não existe mais."]);
    const c = this.carimbo();
    const e = concluir(atual, hoje, c, documento);
    await this.salvar(this.entradas(this.etapas, [[id, e]]), registrosDeEtapa(atual, e), c);
    return e;
  }

  async reabrirEtapa(id: string): Promise<Etapa> {
    const atual = await this.obterEtapa(id);
    if (!atual) throw new ErroValidacao(["A etapa não existe mais."]);
    const c = this.carimbo();
    const e = reabrir(atual, c);
    await this.salvar(this.entradas(this.etapas, [[id, e]]), registrosDeEtapa(atual, e), c);
    return e;
  }

  async removerEtapa(id: string): Promise<void> {
    const atual = await this.obterEtapa(id);
    if (!atual) return;
    const c = this.carimbo();
    const e = remover(atual, c);
    await this.salvar(this.entradas(this.etapas, [[id, e]]), registrosDeEtapa(atual, e), c);
  }

  async restaurarEtapa(id: string): Promise<Etapa | undefined> {
    const atual = await this.etapas.obter(id);
    if (!atual || atual.removidoEm === undefined) return atual;
    if (!(await this.obterProjeto(atual.projeto))) throw new ErroValidacao(["O projeto não existe mais."]);
    const fase = atual.fase ? await this.fases.obter(atual.fase) : undefined;
    const faseViva = vivo(fase) && fase.projeto === atual.projeto;
    const c = this.carimbo();
    const e = restaurar(faseViva ? atual : { ...atual, fase: undefined }, c);
    await this.salvar(this.entradas(this.etapas, [[id, e]]), registrosDeEtapa(atual, e), c);
    return e;
  }

  /** "Redefinir plano original" (menu do projeto): a base de cada etapa replanejada passa a ser as datas atuais. */
  async redefinirPlanoOriginal(projeto: string): Promise<number> {
    const alvos = (await this.etapasDoProjeto(projeto)).filter((e) => replanejada(e) || !e.base);
    if (!alvos.length) return 0;
    const c = this.carimbo();
    const gravadas = alvos.map((e) => editar(e, { base: e.base ? redefinirBase(e) : baseInicial(e.inicio, e.fim) }, c));
    await this.salvar(
      this.entradas(
        this.etapas,
        gravadas.map((e) => [e.id, e]),
      ),
      gravadas.flatMap((e, i) => registrosDeEtapa(alvos[i], e)),
      c,
    );
    return gravadas.length;
  }

  // ---------- sincronia, arquivo, limpeza ----------

  /** Envelope do escopo com TUDO (lápides inclusive). A privacidade dos sigilosos é do adaptador da sincronia (P4). */
  async exportar(agora: number = Date.now()): Promise<EnvelopeProjetos> {
    const env: EnvelopeProjetos = {
      formato: "seipro-projetos",
      versao: 1,
      host: this.escopo.host,
      unidade: this.escopo.unidade,
      vis: this.escopo.vis,
      gerado: agora,
      entidades: await this.entidades(),
    };
    if (this.escopo.vis === "eu") env.login = this.escopo.login.trim().toLowerCase();
    return env;
  }

  /**
   * Mescla entidades vindas de fora (Texto Padrão, arquivo, outro escopo): por
   * entidade vence a gravação mais recente (`mesclar` do sei-comum). Item
   * malformado é ignorado. Vínculo sigiloso que chega vazio (sem número) mantém
   * o número que este computador já tinha. Tudo vai num `area.gravar` só (um aviso
   * em `aoMudar`); `anotacoes` (registros do histórico a criar junto, com o carimbo)
   * entram nessa mesma gravação.
   */
  async importar(
    ent: Partial<Entidades>,
    anotacoes?: { registros: RegistroNovo[]; carimbo: Carimbo },
  ): Promise<{ novos: number; atualizados: number; ignorados: number }> {
    const soma = { novos: 0, atualizados: 0, ignorados: 0 };
    let itens: Record<string, unknown> = {};
    const mesclarCol = async <T extends Versionada>(
      col: Colecao<T>,
      lista: readonly unknown[] | undefined,
      tipo: keyof Entidades,
      combinar?: (vencedor: T, local: T | undefined) => T,
    ) => {
      const r = await this.mesclarEm(col, lista ?? [], tipo, combinar);
      soma.novos += r.novos;
      soma.atualizados += r.atualizados;
      soma.ignorados += r.ignorados;
      itens = { ...itens, ...this.entradas(col, r.gravar) };
    };
    await mesclarCol(this.projetos, ent.p, "p", manterNumeroSigiloso);
    await mesclarCol(this.fases, ent.f, "f");
    await mesclarCol(this.etapas, ent.e, "e", manterNumeroSigiloso);
    await mesclarCol(this.registros, ent.h, "h");
    await mesclarCol(this.modelos, ent.m, "m");
    if (anotacoes) await this.salvar(itens, anotacoes.registros, anotacoes.carimbo);
    else if (Object.keys(itens).length) await this.area.gravar(itens);
    return soma;
  }

  private async mesclarEm<T extends Versionada>(
    col: Colecao<T>,
    itens: readonly unknown[],
    tipo: keyof Entidades,
    combinar: (vencedor: T, local: T | undefined) => T = (v) => v,
  ): Promise<{ gravar: Array<[string, T]>; novos: number; atualizados: number; ignorados: number }> {
    const locais = await col.listar();
    const validos = itens.filter((x) => entidadeValida(x, tipo)) as T[];
    const porId = new Map(locais.map((i) => [i.id, i]));
    const gravar: Array<[string, T]> = [];
    let novos = 0;
    let atualizados = 0;
    // `mesclar` devolve o próprio objeto vencedor: se é o local, nada a gravar.
    for (const vencedor of mesclar(locais, validos)) {
      const atual = porId.get(vencedor.id);
      if (vencedor === atual) continue;
      gravar.push([vencedor.id, combinar(vencedor, atual)]);
      if (atual) atualizados += 1;
      else novos += 1;
    }
    return { gravar, novos, atualizados, ignorados: itens.length - validos.length };
  }

  /**
   * Lápide, numa gravação só, no projeto, nas fases, nas etapas e nos registros que
   * foram para outro escopo (mover entre escopos), com o carimbo `c`.
   */
  async lapidarMovidos(d: { p: Projeto; f: Fase[]; e: Etapa[]; h: Registro[] }, c: Carimbo): Promise<void> {
    await this.area.gravar({
      ...this.entradas(
        this.etapas,
        d.e.map((e) => [e.id, remover(e, c)]),
      ),
      ...this.entradas(
        this.fases,
        d.f.map((f) => [f.id, remover(f, c)]),
      ),
      ...this.entradas(
        this.registros,
        d.h.map((r) => [r.id, remover(r, c)]),
      ),
      ...this.entradas(this.projetos, [[d.p.id, remover(d.p, c)]]),
    });
  }

  /**
   * Apaga de vez as lápides velhas (180 dias na unidade, 90 no "só eu": um
   * usuário eventual da unidade não pode ressuscitar exclusões) e poda o
   * histórico em 300 registros. Devolve quantas chaves saíram. `Area` não tem
   * "gravar e remover" juntos: é uma única `remover` com todas as chaves.
   */
  async limpar(agora: number = Date.now()): Promise<number> {
    const dias = this.escopo.vis === "unidade" ? DIAS_LAPIDE_UNIDADE : DIAS_LAPIDE_EU;
    const chaves: string[] = [];
    const cols = [this.projetos, this.fases, this.etapas, this.modelos] as Array<Colecao<Versionada>>;
    for (const col of cols) {
      const todos = await col.listar();
      const manter = new Set(purgarLapides(todos, agora, dias).map((i) => i.id));
      for (const i of todos) if (!manter.has(i.id)) chaves.push(col.chave(i.id));
    }
    const regs = await this.registros.listar();
    const mantidos = purgarLapides(regs, agora, dias);
    const ficam = new Set(mantidos.map((i) => i.id));
    for (const r of regs) if (!ficam.has(r.id)) chaves.push(this.registros.chave(r.id));
    for (const id of excedentes(mantidos, LIMITES.historico)) chaves.push(this.registros.chave(id));
    if (chaves.length) await this.area.remover(chaves);
    return chaves.length;
  }

  /** Índice protocolo → vínculos deste escopo (para juntar os dois escopos, use `indiceDosEscopos`). */
  async vinculos(): Promise<Map<string, VinculoProcesso[]>> {
    const d = await this.dados();
    return indiceDeProcessos([{ vis: this.escopo.vis, projetos: d.projetos, etapas: d.etapas }]);
  }

  /** Um aviso por gravação no escopo (ouve a base, não cada coleção). */
  aoMudar(cb: () => void): () => void {
    return this.area.aoMudar((m) => {
      if (Object.keys(m).some((k) => k.startsWith(this.base))) cb();
    });
  }
}

/** Vínculo sigiloso que chegou sem número (Texto Padrão) mantém o número deste computador. */
export function manterNumeroSigiloso<T extends { processo?: Vinculo }>(vencedor: T, local: T | undefined): T {
  const v = vencedor.processo;
  const l = local?.processo;
  if (!v?.sigiloso || v.protocolo || !l?.sigiloso || !l.protocolo) return vencedor;
  return { ...vencedor, processo: semVazios({ ...v, protocolo: l.protocolo, idProcedimento: v.idProcedimento ?? l.idProcedimento }) };
}

const texto = (x: unknown): x is string => typeof x === "string";

/** Forma mínima de cada tipo (arquivo editado à mão ou de versão estranha não entra). */
export function entidadeValida(x: unknown, tipo: keyof Entidades): boolean {
  if (!x || typeof x !== "object") return false;
  const o = x as Record<string, unknown>;
  if (!texto(o.id) || !o.id || typeof o.atualizadoEm !== "number" || !Number.isFinite(o.atualizadoEm) || !texto(o.dispositivo))
    return false;
  if (o.removidoEm !== undefined && typeof o.removidoEm !== "number") return false;
  switch (tipo) {
    case "p":
      return texto(o.nome) && Array.isArray(o.etiquetas) && texto(o.ordem);
    case "f":
      return texto(o.projeto) && texto(o.nome) && texto(o.ordem);
    case "e":
      return (
        texto(o.projeto) &&
        texto(o.nome) &&
        texto(o.ordem) &&
        dataValida(o.inicio) &&
        dataValida(o.fim) &&
        Array.isArray(o.dependeDe) &&
        Array.isArray(o.checklist) &&
        Array.isArray(o.etiquetas)
      );
    case "h":
      return texto(o.alvo) && texto(o.projeto) && typeof o.quando === "number" && texto(o.campo);
    case "m":
      return texto(o.nome) && Array.isArray(o.fases) && Array.isArray(o.etapas);
  }
}

/** Junta o índice dos escopos da unidade (o painel e a caixa mostram os dois). */
export async function indiceDosEscopos(repos: readonly RepositorioProjetos[]): Promise<Map<string, VinculoProcesso[]>> {
  const dados = await Promise.all(repos.map(async (r) => ({ vis: r.escopo.vis, ...(await r.dados()) })));
  return indiceDeProcessos(dados);
}

/**
 * "Quem vê" mudou: leva projeto, fases, etapas e registros para o outro escopo
 * (mesmos ids, carimbo novo, para vencer na mesclagem) e deixa lápide no de
 * origem. Registra a mudança de visibilidade no histórico do destino. O destino
 * recebe tudo numa gravação só (`importar` com a anotação); a origem, noutra
 * (`lapidarMovidos`): se a segunda falhar, sobra uma cópia, nunca se perde dado.
 */
export async function moverEntreEscopos(origem: RepositorioProjetos, destino: RepositorioProjetos, id: string): Promise<Projeto> {
  const p = await origem.obterProjeto(id);
  if (!p) throw new ErroValidacao(["O projeto não existe mais."]);
  if (p.arquivadoEm === undefined) {
    const ativos = (await destino.dados()).projetos.filter((x) => x.arquivadoEm === undefined);
    if (ativos.length >= LIMITES.projetosAtivos)
      throw new ErroValidacao([
        `Limite de ${LIMITES.projetosAtivos} projetos ativos em “${rotuloDaVis(destino.escopo.vis)}”. Arquive ou exclua algum.`,
      ]);
  }
  const d = await origem.dados();
  const fases = d.fases.filter((f) => f.projeto === id);
  const etapas = d.etapas.filter((e) => e.projeto === id);
  const registros = await origem.historico(id);
  const cDestino = destino.carimboAtual();
  const recarimbar = <T extends Entidade>(x: T): T => editar(x, {} as Partial<Omit<T, "id" | "atualizadoEm" | "dispositivo">>, cDestino);
  await destino.importar(
    { p: [recarimbar(p)], f: fases.map(recarimbar), e: etapas.map(recarimbar), h: registros.map(recarimbar) },
    {
      registros: [
        {
          alvo: p.id,
          projeto: p.id,
          campo: "visibilidade",
          antes: rotuloDaVis(origem.escopo.vis),
          depois: rotuloDaVis(destino.escopo.vis),
        },
      ],
      carimbo: cDestino,
    },
  );
  await origem.lapidarMovidos({ p, f: fases, e: etapas, h: registros }, origem.carimboAtual());
  return (await destino.obterProjeto(id))!;
}
