/**
 * Tudo o que o usuário tem num SEI (todas as unidades, "Toda a unidade" e "Só
 * eu", inclusive o número dos sigilosos: é dele), num envelope só (spec 6.2):
 * a cópia diária deste navegador, o arquivo numa pasta da nuvem e o
 * Exportar/Importar manual. Ler sempre MESCLA (vence o mais recente por
 * entidade); o que o arquivo tem de outro SEI ou de outro login fica.
 *
 * O arquivo é do próprio usuário: leva também a memória do sigilo dele
 * (modelo/memoriaSigilo.ts), no campo `sigilo` do envelope, uma entrada por
 * usuário (host|login) com versão própria. Num perfil novo (outro navegador, a
 * extensão reinstalada), importar ou restaurar a devolve como "local", sem tirar
 * nem mudar o que já estava lá: um número que só sobrou nos registros do
 * histórico (o processo trocado, a lápide podada) continua fora do Texto Padrão.
 * Sem o campo (arquivo de antes), a importação segue; entrada torta é ignorada;
 * a memória que não lê ou não grava faz a importação e a exportação falharem
 * (falha fechada, como no Texto Padrão).
 *
 * A mecânica do arquivo (File System Access, handle no IndexedDB do módulo,
 * permissão, regravação do ilegível) e a das cópias são as genéricas do
 * sei-comum, no banco `seipro-projetos`; aqui fica o envelope.
 */

import type { Area } from "@comum/armazenamento/area";
import { obterPorPrefixo } from "@comum/armazenamento/colecao";
import type { DataISO } from "@comum/datas/dias";
import { type AdaptadorArquivo, ControleArquivo, escolherArquivoSync, handlesNoIndexedDB } from "@comum/sincronia/arquivo";
import { assinaturaEstavel } from "@comum/sincronia/assinatura";
import {
  type ArmazemCopias,
  type Copia,
  copiasNoIndexedDB,
  type Dono,
  fazerCopiaDoDia as fazerCopiaComum,
  recarimbarAtivos,
} from "@comum/sincronia/copias";
import { chaveMemoriaSigiloLegada, chaveSyncArquivo, prefixoMemoriaSigilo } from "../modelo/constantes";
import { chaveEscopo } from "../modelo/escopo";
import { entradasParaGravar, lerMemoria, type MemoriaSigilo } from "../modelo/memoriaSigilo";
import type { Carimbo, Entidades, Escopo } from "../modelo/tipos";
import { RepositorioProjetos, type ResultadoImportacao } from "../repositorio";
import { TETOS_ENVELOPE } from "./textoPadrao";

export const FORMATO_ARQUIVO = "seipro-projetos";
export const VERSAO_ARQUIVO = 1;
/** IndexedDB da extensão: depósitos `copias` e `arquivos` (sei-comum/sincronia/banco.ts). */
export const BANCO = "seipro-projetos";
/** Versão da entrada do campo `sigilo`: a forma da memória pode mudar sem mudar a do envelope. */
export const VERSAO_SIGILO = 1;
/**
 * Números por conjunto (processos, documentos) numa entrada do campo `sigilo`; acima disso a entrada é tratada
 * como torta. Fica acima do que a memória de verdade consegue guardar (uma chave por número no storage.local, de
 * 10 MB: umas 150 mil no total), para a entrada do próprio usuário nunca ser lida como torta (o arquivo seria
 * regravado a cada rodada); só um arquivo forjado passa dele.
 */
export const TETO_SIGILO_ARQUIVO = 200_000;
/** Entradas (usuários) no campo `sigilo`; acima disso o campo é tratado como torto. */
const TETO_DONOS_SIGILO = 100;

export interface EscopoNoArquivo {
  escopo: Escopo;
  entidades: Entidades;
}

/**
 * A memória do sigilo de um usuário no arquivo: as chaves de processo e de documento que a memória dele conhece
 * (as duas origens; a volta é sempre "local"). Nunca vai ao Texto Padrão nem ao "Enviar projeto".
 */
export interface SigiloNoArquivo {
  versao: typeof VERSAO_SIGILO;
  host: string;
  login: string;
  processos: string[];
  documentos: string[];
}

export interface EnvelopeArquivo {
  formato: typeof FORMATO_ARQUIVO;
  versao: typeof VERSAO_ARQUIVO;
  /** Distingue do envelope do Texto Padrão (um escopo) e do projeto enviado por arquivo. */
  tipo: "copia";
  gerado: number;
  escopos: EscopoNoArquivo[];
  /** A memória do sigilo de cada usuário cujos projetos estão no arquivo. Ausente nos arquivos de antes. */
  sigilo?: SigiloNoArquivo[];
}

export type CopiaProjetos = Copia<EnvelopeArquivo>;
export type ArmazemCopiasProjetos = ArmazemCopias<EnvelopeArquivo>;

const LISTAS = ["p", "f", "e", "h", "m"] as const;
const mesmoDono = (x: { host: string; login: string }, d: Dono) =>
  x.host === d.host && x.login.trim().toLowerCase() === d.login.trim().toLowerCase();

export const chaveStatusArquivo = (d: Dono): string => chaveSyncArquivo(d.host, d.login);
export const nomeDoArquivo = (d: Dono): string => `projetos-seipro-${d.login.trim().toLowerCase()}-${d.host}.json`;

const texto = (x: unknown): x is string => typeof x === "string" && x.length > 0 && x.length <= 300;
/** A unidade entra no nome das chaves (`…|u:<unidade>/un/…`): com barra, os itens cairiam noutro escopo. */
const unidadeValida = (x: unknown): x is string => texto(x) && !x.includes("/");

/** Os escopos que este usuário tem neste SEI (pelas chaves guardadas: `projetos/<host>|<login>|u:<id>/<un|eu>/…`). */
export async function escoposDoUsuario(area: Area, d: Dono): Promise<Escopo[]> {
  const login = d.login.trim().toLowerCase();
  const prefixo = `projetos/${d.host}|${login}|u:`;
  // Só os nomes das chaves (sem os valores), quando o navegador oferece.
  const chaves = area.chaves ? await area.chaves() : Object.keys(await area.obter(null));
  const achados = new Map<string, Escopo>();
  for (const k of chaves) {
    if (!k.startsWith(prefixo)) continue;
    const [unidade, vis] = k.slice(prefixo.length).split("/");
    if (!unidadeValida(unidade) || (vis !== "un" && vis !== "eu")) continue;
    const e: Escopo = { host: d.host, login, unidade, vis: vis === "un" ? "unidade" : "eu" };
    achados.set(chaveEscopo(e), e);
  }
  return [...achados.values()].sort((a, b) => (chaveEscopo(a) < chaveEscopo(b) ? -1 : 1));
}

const repoDe = (area: Area, e: Escopo, carimbo: () => Carimbo) => new RepositorioProjetos(area, e, carimbo);

/** Um número que cabe na memória do sigilo (a mesma regra de memoriaSigilo.ts: texto de 1 a 64 caracteres). */
const numeroDaMemoria = (x: unknown): x is string => typeof x === "string" && x.length > 0 && x.length <= 64;

/**
 * A memória do sigilo do usuário (de todos os escopos dele), numa leitura. A chave única da rodada 2 é o começo
 * de todas as entradas (`<legada>/p/…`): um prefixo pega as duas formas. Lança se não puder ser lida.
 */
async function memoriaDoDono(area: Area, d: Dono): Promise<MemoriaSigilo> {
  const legada = chaveMemoriaSigiloLegada(d.host, d.login);
  return lerMemoria(await obterPorPrefixo(area, legada), prefixoMemoriaSigilo(d.host, d.login), legada);
}

/**
 * A entrada do campo `sigilo` deste usuário: tudo o que a memória dele conhece, em ordem, só com os números que a
 * leitura aceita (uma chave do storage editada à mão não faz a entrada inteira ser lida como torta).
 */
function sigiloDoDono(d: Dono, m: MemoriaSigilo): SigiloNoArquivo {
  return {
    versao: VERSAO_SIGILO,
    host: d.host,
    login: d.login.trim().toLowerCase(),
    processos: [...m.processos.keys()].filter(numeroDaMemoria).sort(),
    documentos: [...m.documentos.keys()].filter(numeroDaMemoria).sort(),
  };
}

/**
 * Tudo deste usuário neste SEI, com lápides e números sigilosos, e a memória do sigilo dele. A memória é lida
 * primeiro: ilegível, lança e nada é exportado (o arquivo e a cópia ficam com a memória que já tinham).
 */
export async function exportarTudo(area: Area, d: Dono, carimbo: () => Carimbo): Promise<EnvelopeArquivo> {
  const memoria = await memoriaDoDono(area, d);
  const escopos: EscopoNoArquivo[] = [];
  for (const e of await escoposDoUsuario(area, d)) escopos.push({ escopo: e, entidades: await repoDe(area, e, carimbo).entidades() });
  return {
    formato: FORMATO_ARQUIVO,
    versao: VERSAO_ARQUIVO,
    tipo: "copia",
    gerado: carimbo().agora,
    escopos,
    sigilo: [sigiloDoDono(d, memoria)],
  };
}

const listaDeNumeros = (x: unknown): x is string[] => Array.isArray(x) && x.length <= TETO_SIGILO_ARQUIVO && x.every(numeroDaMemoria);

/**
 * As entradas boas do campo `sigilo`: a torta, a de outra versão e a acima do teto ficam de fora, sem derrubar o
 * resto. Campo ausente ou que não é lista: `undefined` (nenhuma entrada).
 */
function lerSigilo(bruto: unknown): SigiloNoArquivo[] | undefined {
  if (!Array.isArray(bruto) || bruto.length > TETO_DONOS_SIGILO) return undefined;
  const saida: SigiloNoArquivo[] = [];
  for (const x of bruto as unknown[]) {
    const s = x as Partial<Record<keyof SigiloNoArquivo, unknown>> | null;
    if (!s || typeof s !== "object" || s.versao !== VERSAO_SIGILO || !texto(s.host) || !texto(s.login)) continue;
    if (!listaDeNumeros(s.processos) || !listaDeNumeros(s.documentos)) continue;
    saida.push({ versao: VERSAO_SIGILO, host: s.host, login: s.login, processos: [...s.processos], documentos: [...s.documentos] });
  }
  return saida;
}

/**
 * O envelope do JSON lido (forma e tetos), ou null se não é uma cópia de projetos. A forma de cada item é do
 * `importar` (o item torto é ignorado e contado); o campo `sigilo` torto é ignorado sem recusar o envelope.
 */
export function lerEnvelopeArquivo(bruto: unknown): EnvelopeArquivo | null {
  const b = bruto as Partial<Record<keyof EnvelopeArquivo, unknown>> | null;
  if (!b || typeof b !== "object" || b.formato !== FORMATO_ARQUIVO || b.versao !== VERSAO_ARQUIVO || b.tipo !== "copia") return null;
  if (!Array.isArray(b.escopos) || b.escopos.length > 500) return null;
  const escopos: EscopoNoArquivo[] = [];
  for (const x of b.escopos as unknown[]) {
    const s = x as Partial<Record<keyof EscopoNoArquivo, unknown>> | null;
    const e = s?.escopo as Partial<Record<keyof Escopo, unknown>> | undefined;
    if (!e || !texto(e.host) || !texto(e.login) || !unidadeValida(e.unidade) || (e.vis !== "unidade" && e.vis !== "eu")) return null;
    const ent = s?.entidades as Partial<Record<keyof Entidades, unknown>> | undefined;
    if (!ent || typeof ent !== "object") return null;
    const entidades = {} as Record<keyof Entidades, unknown[]>;
    for (const k of LISTAS) {
      const lista = ent[k] ?? [];
      if (!Array.isArray(lista) || lista.length > TETOS_ENVELOPE[k]) return null;
      entidades[k] = lista;
    }
    // O escopo refeito campo a campo: nada além dos quatro passa adiante.
    const escopo: Escopo = { host: e.host, login: e.login, unidade: e.unidade, vis: e.vis };
    escopos.push({ escopo, entidades: entidades as unknown as Entidades });
  }
  const sigilo = lerSigilo(b.sigilo);
  return {
    formato: FORMATO_ARQUIVO,
    versao: VERSAO_ARQUIVO,
    tipo: "copia",
    gerado: Number(b.gerado) || 0,
    escopos,
    ...(sigilo ? { sigilo } : {}),
  };
}

/**
 * Devolve à memória do sigilo deste usuário o que as entradas dele no arquivo trazem, como "local" (o arquivo é
 * dele): só entra o que falta; o que já está (local ou aprendida) fica como está, e as aprendidas não mudam
 * (nem de número, nem de teto). Lança se a memória não lê ou não grava.
 */
async function devolverSigilo(area: Area, sigilo: unknown, d: Dono): Promise<void> {
  const meus = (lerSigilo(sigilo) ?? []).filter((s) => mesmoDono(s, d));
  if (!meus.length) return;
  const novos = { processos: meus.flatMap((s) => s.processos), documentos: meus.flatMap((s) => s.documentos) };
  const entradas = entradasParaGravar(await memoriaDoDono(area, d), novos, "local", prefixoMemoriaSigilo(d.host, d.login));
  if (Object.keys(entradas).length) await area.gravar(entradas);
}

/**
 * Mescla o que é deste usuário neste SEI (o de outros fica no arquivo, intocado). A memória do sigilo vem
 * antes dos projetos: se ela falha, nada é gravado; e a mescla dos projetos já a conhece (o sigilo gruda).
 */
export async function importarTudo(area: Area, env: EnvelopeArquivo, d: Dono, carimbo: () => Carimbo): Promise<ResultadoImportacao> {
  await devolverSigilo(area, env.sigilo, d);
  const soma: ResultadoImportacao = { novos: 0, atualizados: 0, ignorados: 0, excedentes: 0 };
  for (const s of env.escopos) {
    if (!mesmoDono(s.escopo, d)) continue;
    const e: Escopo = { host: s.escopo.host, login: s.escopo.login.trim().toLowerCase(), unidade: s.escopo.unidade, vis: s.escopo.vis };
    const r = await repoDe(area, e, carimbo).importar(s.entidades);
    soma.novos += r.novos;
    soma.atualizados += r.atualizados;
    soma.ignorados += r.ignorados;
    soma.excedentes += r.excedentes;
  }
  return soma;
}

/** O id de um item lido (o do arquivo pode vir torto: `null`, sem id), para ordenar sem lançar. */
const idDe = (x: unknown): string =>
  x && typeof x === "object" && typeof (x as { id?: unknown }).id === "string" ? (x as { id: string }).id : "";
const pelaId = (lista: readonly unknown[]): unknown[] => [...lista].sort((a, b) => (idDe(a) < idDe(b) ? -1 : idDe(a) > idDe(b) ? 1 : 0));
const pelaChave = <T extends { k: string }>(a: T, b: T) => (a.k < b.k ? -1 : a.k > b.k ? 1 : 0);

/**
 * Igual para o mesmo conteúdo em qualquer computador: escopos pela chave, listas pelo id, a memória do sigilo
 * por usuário e com os números em ordem, sem `gerado`. A memória conta: um número que ela ganhou regrava o arquivo.
 */
export function assinaturaArquivo(env: EnvelopeArquivo): string {
  const escopos = env.escopos
    .map((s) => ({
      k: chaveEscopo(s.escopo),
      p: pelaId(s.entidades.p),
      f: pelaId(s.entidades.f),
      e: pelaId(s.entidades.e),
      h: pelaId(s.entidades.h),
      m: pelaId(s.entidades.m),
    }))
    .sort(pelaChave);
  const sigilo = (env.sigilo ?? [])
    .map((s) => ({
      k: `${s.host}|${s.login.trim().toLowerCase()}|${s.versao}`,
      p: [...s.processos].sort(),
      d: [...s.documentos].sort(),
    }))
    .sort(pelaChave);
  return assinaturaEstavel({ escopos, sigilo });
}

export function adaptadorArquivoProjetos(area: Area, d: Dono, carimbo: () => Carimbo): AdaptadorArquivo<EnvelopeArquivo> {
  return {
    formato: FORMATO_ARQUIVO,
    versao: VERSAO_ARQUIVO,
    ler: lerEnvelopeArquivo,
    importar: (env) => importarTudo(area, env, d, carimbo),
    async exportar(lido) {
      const meu = await exportarTudo(area, d, carimbo);
      // Escopos de outro SEI ou login (o mesmo arquivo escolhido em dois lugares): ficam como estão, e a memória do
      // sigilo deles também. A deste usuário é a de agora, que já mesclou a do arquivo (a leitura vem antes).
      const outros = (lido?.escopos ?? []).filter((s) => !mesmoDono(s.escopo, d));
      const sigiloDeOutros = (lido?.sigilo ?? []).filter((s) => !mesmoDono(s, d));
      return {
        envelope: { ...meu, escopos: [...meu.escopos, ...outros], sigilo: [...(meu.sigilo ?? []), ...sigiloDeOutros] },
        outros: outros.length,
      };
    },
    assinatura: assinaturaArquivo,
    mensagens: {
      outros: (n) =>
        `O arquivo também tem ${n === 1 ? "projetos" : `${n} conjuntos de projetos`} de outro usuário ou outro SEI, que foram mantidos.`,
    },
  };
}

/** O arquivo ligado (Chrome/Edge): escolher, reconectar, sincronizar ao abrir e 15 s depois de mudar. */
export function controleArquivo(area: Area, d: Dono, carimbo: () => Carimbo): ControleArquivo<EnvelopeArquivo> {
  return new ControleArquivo<EnvelopeArquivo>({
    area,
    dono: d,
    chaveStatus: chaveStatusArquivo(d),
    handles: handlesNoIndexedDB(BANCO),
    escolher: (modo) => escolherArquivoSync(modo, nomeDoArquivo(d), "Projetos do SEI Pro"),
    adaptador: adaptadorArquivoProjetos(area, d, carimbo),
  });
}

export const copiasDosProjetos = (): ArmazemCopiasProjetos => copiasNoIndexedDB<EnvelopeArquivo>(BANCO);

/** Projetos ativos (não arquivados, sem lápide) numa cópia: é o que o diálogo mostra. */
export function projetosNaCopia(env: EnvelopeArquivo): number {
  return env.escopos.reduce((n, s) => n + s.entidades.p.filter((p) => p.removidoEm === undefined && p.arquivadoEm === undefined).length, 0);
}

/** A cópia de hoje, se ainda não há; só exporta quando vai mesmo copiar. */
export function fazerCopiaDoDia(
  area: Area,
  d: Dono,
  armazem: ArmazemCopiasProjetos,
  hoje: DataISO,
  carimbo: () => Carimbo,
): Promise<boolean> {
  return fazerCopiaComum(armazem, d, hoje, carimbo().agora, async () => {
    const envelope = await exportarTudo(area, d, carimbo);
    return { envelope, quantidade: projetosNaCopia(envelope) };
  });
}

/**
 * Restaurar não "volta no tempo": traz de volta o que estava ATIVO na cópia (projetos, fases, etapas
 * e modelos), com carimbo novo para vencer exclusões posteriores, e deixa em paz o que entrou depois.
 * O histórico mescla como está (só acrescenta). A memória do sigilo da cópia volta como no `importarTudo`.
 */
export async function restaurarCopia(area: Area, copia: CopiaProjetos, d: Dono, carimbo: () => Carimbo): Promise<number> {
  const c = carimbo();
  const env: EnvelopeArquivo = {
    ...copia.envelope,
    escopos: copia.envelope.escopos.map((s) => ({
      escopo: s.escopo,
      entidades: {
        p: recarimbarAtivos(s.entidades.p, c),
        f: recarimbarAtivos(s.entidades.f, c),
        e: recarimbarAtivos(s.entidades.e, c),
        h: s.entidades.h,
        m: recarimbarAtivos(s.entidades.m, c),
      },
    })),
  };
  const r = await importarTudo(area, env, d, () => c);
  return r.novos + r.atualizados;
}
