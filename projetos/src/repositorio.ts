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
import { normalizarTexto } from "@comum/texto";
import { LIMITES } from "./modelo/constantes";
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
  Escopo,
  Etapa,
  Fase,
  Modelo,
  MudancaDeDatas,
  Projeto,
  Registro,
} from "./modelo/tipos";
import { checklistLimpo, ErroValidacao, etiquetasLimpas, nomeLimpo, problemasDaEtapa, problemasDoProjeto } from "./modelo/validacao";

/** O que está vivo no escopo (sem lápides), numa leitura só. */
export interface Dados {
  projetos: Projeto[];
  fases: Fase[];
  etapas: Etapa[];
  modelos: Modelo[];
}

export type MudancasProjeto = Partial<Pick<Projeto, "nome" | "processo" | "etiquetas">>;
export type MudancasEtapa = Partial<
  Pick<
    Etapa,
    | "nome"
    | "inicio"
    | "fim"
    | "marco"
    | "fase"
    | "dependeDe"
    | "responsavel"
    | "medida"
    | "progresso"
    | "checklist"
    | "processo"
    | "documento"
    | "etiquetas"
    | "observacoes"
  >
>;

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
    return {
      projetos: t.p.filter(vivo).sort(porOrdem),
      fases: t.f.filter(vivo).sort(porOrdem),
      etapas: t.e.filter(vivo).sort(porOrdem),
      modelos: t.m.filter(vivo).sort((a, b) => a.nome.localeCompare(b.nome, "pt-BR")),
    };
  }

  // ---------- histórico ----------

  /** Registros vivos, do mais recente ao mais antigo (de um projeto, se informado). */
  async historico(projeto?: string): Promise<Registro[]> {
    return (await this.registros.listar())
      .filter((r) => vivo(r) && (!projeto || r.projeto === projeto))
      .sort((a, b) => b.quando - a.quando || (a.id < b.id ? 1 : a.id > b.id ? -1 : 0));
  }

  private async anotar(novos: RegistroNovo[], c: Carimbo): Promise<void> {
    if (!novos.length) return;
    const regs = carimbarRegistros(novos, c, this.gerarId);
    await this.registros.gravarVarios(regs.map((r) => [r.id, r]));
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
    await this.projetos.gravar(p.id, p);
    await this.anotar(registrosDeProjeto(undefined, p), c);
    return p;
  }

  async editarProjeto(id: string, m: MudancasProjeto): Promise<Projeto> {
    const atual = await this.exigirProjeto(id);
    const mud: MudancasProjeto = { ...m };
    if (typeof mud.nome === "string") mud.nome = nomeLimpo(mud.nome);
    if (mud.etiquetas) mud.etiquetas = etiquetasLimpas(mud.etiquetas);
    const problemas = problemasDoProjeto({ ...atual, ...mud });
    if (problemas.length) throw new ErroValidacao(problemas);
    const c = this.carimbo();
    const p = editar(atual, mud, c);
    await this.projetos.gravar(id, p);
    await this.anotar(registrosDeProjeto(atual, p), c);
    return p;
  }

  async arquivarProjeto(id: string): Promise<Projeto> {
    const atual = await this.exigirProjeto(id);
    if (atual.arquivadoEm !== undefined) return atual;
    const c = this.carimbo();
    const p = editar(atual, { arquivadoEm: c.agora }, c);
    await this.projetos.gravar(id, p);
    await this.anotar(registrosDeProjeto(atual, p), c);
    return p;
  }

  async reativarProjeto(id: string): Promise<Projeto> {
    const atual = await this.exigirProjeto(id);
    if (atual.arquivadoEm === undefined) return atual;
    await this.exigirVagaDeProjeto();
    const c = this.carimbo();
    const p = editar(atual, { arquivadoEm: undefined }, c);
    await this.projetos.gravar(id, p);
    await this.anotar(registrosDeProjeto(atual, p), c);
    return p;
  }

  /** Lápide no projeto, nas fases e nas etapas vivas dele, com o MESMO instante (o "Desfazer" usa). */
  async removerProjeto(id: string): Promise<void> {
    const atual = await this.exigirProjeto(id);
    const c = this.carimbo();
    const [fases, etapas] = await Promise.all([this.fases.listar(), this.etapas.listar()]);
    await this.fases.gravarVarios(fases.filter((f) => vivo(f) && f.projeto === id).map((f) => [f.id, remover(f, c)]));
    await this.etapas.gravarVarios(etapas.filter((e) => vivo(e) && e.projeto === id).map((e) => [e.id, remover(e, c)]));
    const p = remover(atual, c);
    await this.projetos.gravar(id, p);
    await this.anotar(registrosDeProjeto(atual, p), c);
  }

  /** Desfaz `removerProjeto`: volta o projeto e o que foi removido junto com ele. */
  async restaurarProjeto(id: string): Promise<Projeto | undefined> {
    const atual = await this.projetos.obter(id);
    if (!atual || atual.removidoEm === undefined) return atual;
    const quando = atual.removidoEm;
    const c = this.carimbo();
    const [fases, etapas] = await Promise.all([this.fases.listar(), this.etapas.listar()]);
    await this.fases.gravarVarios(fases.filter((f) => f.projeto === id && f.removidoEm === quando).map((f) => [f.id, restaurar(f, c)]));
    await this.etapas.gravarVarios(etapas.filter((e) => e.projeto === id && e.removidoEm === quando).map((e) => [e.id, restaurar(e, c)]));
    const p = restaurar(atual, c);
    await this.projetos.gravar(id, p);
    await this.anotar(registrosDeProjeto(atual, p), c);
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
    await this.projetos.gravar(p.id, p);
    await this.fases.gravarVarios([...novasFases.values()].map((f) => [f.id, f]));
    await this.etapas.gravarVarios(novas.map((e) => [e.id, e]));
    await this.anotar(registrosDeProjeto(undefined, p), c);
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
    await this.fases.gravar(f.id, f);
    await this.anotar(registrosDeFase(undefined, f), c);
    return f;
  }

  async renomearFase(id: string, nome: string): Promise<Fase> {
    const atual = await this.fases.obter(id);
    if (!vivo(atual)) throw new ErroValidacao(["A fase não existe mais."]);
    const limpo = nomeLimpo(nome);
    if (!limpo) throw new ErroValidacao(["Informe o nome da fase."]);
    const c = this.carimbo();
    const f = editar(atual, { nome: limpo.slice(0, LIMITES.nome) }, c);
    await this.fases.gravar(id, f);
    await this.anotar(registrosDeFase(atual, f), c);
    return f;
  }

  /** As etapas da fase ficam sem fase (não somem). */
  async removerFase(id: string): Promise<void> {
    const atual = await this.fases.obter(id);
    if (!vivo(atual)) return;
    const c = this.carimbo();
    const afetadas = (await this.etapas.listar()).filter((e) => vivo(e) && e.fase === id);
    await this.etapas.gravarVarios(afetadas.map((e) => [e.id, editar(e, { fase: undefined }, c)]));
    const f = remover(atual, c);
    await this.fases.gravar(id, f);
    await this.anotar(registrosDeFase(atual, f), c);
  }

  // ---------- etapas ----------

  async obterEtapa(id: string): Promise<Etapa | undefined> {
    const e = await this.etapas.obter(id);
    return vivo(e) ? e : undefined;
  }

  private async etapasDoProjeto(projeto: string): Promise<Etapa[]> {
    return (await this.etapas.listar()).filter((e) => vivo(e) && e.projeto === projeto);
  }

  private async conferirEtapa(e: Etapa, doProjeto: Etapa[]): Promise<void> {
    const problemas = problemasDaEtapa(e);
    const dep = validarDependencias(e, doProjeto);
    if (dep) problemas.push(dep);
    if (e.fase) {
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
    await this.etapas.gravar(e.id, e);
    await this.anotar(registrosDeEtapa(undefined, e), c);
    return e;
  }

  async editarEtapa(id: string, m: MudancasEtapa, hoje: DataISO): Promise<Etapa> {
    const atual = await this.obterEtapa(id);
    if (!atual) throw new ErroValidacao(["A etapa não existe mais."]);
    const mud: MudancasEtapa = { ...m };
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
    await this.conferirEtapa(semVazios({ ...atual, ...final }), doProjeto);
    const c = this.carimbo();
    const e = editar(atual, final, c);
    await this.etapas.gravar(id, e);
    await this.anotar(registrosDeEtapa(atual, e, await this.apoio(atual.projeto)), c);
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
    await this.etapas.gravarVarios(gravadas.map((e) => [e.id, e]));
    const registros = gravadas.flatMap((e) => registrosDeEtapa(porId.get(e.id), e));
    await this.anotar(registros, c);
    return gravadas;
  }

  async concluirEtapa(id: string, hoje: DataISO, documento?: DocumentoSei): Promise<Etapa> {
    const atual = await this.obterEtapa(id);
    if (!atual) throw new ErroValidacao(["A etapa não existe mais."]);
    const c = this.carimbo();
    const e = concluir(atual, hoje, c, documento);
    await this.etapas.gravar(id, e);
    await this.anotar(registrosDeEtapa(atual, e), c);
    return e;
  }

  async reabrirEtapa(id: string): Promise<Etapa> {
    const atual = await this.obterEtapa(id);
    if (!atual) throw new ErroValidacao(["A etapa não existe mais."]);
    const c = this.carimbo();
    const e = reabrir(atual, c);
    await this.etapas.gravar(id, e);
    await this.anotar(registrosDeEtapa(atual, e), c);
    return e;
  }

  async removerEtapa(id: string): Promise<void> {
    const atual = await this.obterEtapa(id);
    if (!atual) return;
    const c = this.carimbo();
    const e = remover(atual, c);
    await this.etapas.gravar(id, e);
    await this.anotar(registrosDeEtapa(atual, e), c);
  }

  async restaurarEtapa(id: string): Promise<Etapa | undefined> {
    const atual = await this.etapas.obter(id);
    if (!atual || atual.removidoEm === undefined) return atual;
    const c = this.carimbo();
    const e = restaurar(atual, c);
    await this.etapas.gravar(id, e);
    await this.anotar(registrosDeEtapa(atual, e), c);
    return e;
  }

  /** "Redefinir plano original" (menu do projeto): a base de cada etapa replanejada passa a ser as datas atuais. */
  async redefinirPlanoOriginal(projeto: string): Promise<number> {
    const alvos = (await this.etapasDoProjeto(projeto)).filter((e) => replanejada(e) || !e.base);
    if (!alvos.length) return 0;
    const c = this.carimbo();
    const gravadas = alvos.map((e) => editar(e, { base: e.base ? redefinirBase(e) : baseInicial(e.inicio, e.fim) }, c));
    await this.etapas.gravarVarios(gravadas.map((e) => [e.id, e]));
    await this.anotar(
      gravadas.flatMap((e, i) => registrosDeEtapa(alvos[i], e)),
      c,
    );
    return gravadas.length;
  }

  aoMudar(cb: () => void): () => void {
    const parar = [this.projetos, this.fases, this.etapas, this.registros, this.modelos].map((col) =>
      (col as Colecao<Entidade>).aoMudar(cb),
    );
    return () => {
      for (const p of parar) p();
    };
  }
}
