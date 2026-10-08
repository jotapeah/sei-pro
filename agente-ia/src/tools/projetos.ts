/**
 * O agente lê os projetos do SEI Pro (gestor de projetos com Gantt, spec 7).
 * SOMENTE LEITURA.
 *
 * O painel do agente é página da extensão: lê o `chrome.storage.local` direto,
 * pelo repositório dos projetos, sem ponte. Da aba vem só o escopo (SEI,
 * usuário e unidade da tela ligada ao painel): os dois escopos da unidade,
 * "Toda a unidade" e "Só eu".
 *
 * Processo sigiloso nunca sai daqui, pela MESMA regra do Texto Padrão
 * (`sigiloDoEnvelope`, projetos/src/modelo/sigilo.ts: o número marcado em
 * qualquer projeto ou etapa, viva ou lápide, dos dois escopos) somada à memória
 * local do sigilo (`memoriaSigilo.ts`): o projeto de processo sigiloso e a etapa
 * de processo próprio sigiloso ficam de fora (só contados). Sem ler a memória,
 * nada é listado (falha fechada, como o texto e o arquivo).
 *
 * Nenhum número de processo nem de documento vai na resposta: os vínculos não
 * vão, e o texto livre (nomes, fase, observações, checklist; cada campo sozinho)
 * sai sem os números que este computador conhece (vínculos, documentos, registros
 * e a memória) e sem os que têm a forma de número de processo, escritos de
 * qualquer jeito que a pessoa leia como o número: qualquer pontuação ou símbolo
 * entre os blocos, invisível no meio, dígito de outra escrita, de trás para a
 * frente (ver `semNumeros`).
 */

import { type Area, areaChrome } from "@comum/armazenamento/area";
import { formatarData, hojeISO } from "@comum/datas/dias";
import { lerOpcaoLegada } from "@comum/opcoes/legadas";
import { normalizarTexto } from "@comum/texto";
import { montarUnidade, type ProjetoNaTela } from "@projetos/app/dados";
import { alertasDasEtapas } from "@projetos/modelo/alertas";
import { escoposDaUnidade, rotuloDaVis } from "@projetos/modelo/escopo";
import { ErroMemoriaSigilo } from "@projetos/modelo/memoriaSigilo";
import { porOrdem } from "@projetos/modelo/operacoes";
import { progressoDaEtapa } from "@projetos/modelo/progresso";
import { resumoDoProjeto } from "@projetos/modelo/resumo";
import { etapaSigilosa, type SigiloDoEnvelope, type SigilosConhecidos, sigiloDoEnvelope } from "@projetos/modelo/sigilo";
import { ROTULO_MARCO, ROTULO_SITUACAO, situacaoEtapa, situacaoMarco } from "@projetos/modelo/situacao";
import type { DataISO, Entidades, Etapa } from "@projetos/modelo/tipos";
import { chaveDocumento, chaveProtocolo } from "@projetos/modelo/vinculos";
import { type Dados, RepositorioProjetos } from "@projetos/repositorio";
import { s } from "../motor/esquema";
import { definirTool, type DefTool } from "../motor/tools";
import { type Achado, INVISIVEIS, varrerCamposLivres } from "../seguranca/injecao";

/**
 * A opção "Gerenciar Projetos" das opções do SEI Pro. Ausente conta como ligada (a regra do legado,
 * `opcaoLegadaLigada`); ILEGÍVEL conta como desligada: o content script e o app também não seguem sem lê-la.
 */
const opcaoDaExtensao = (): Promise<boolean> => lerOpcaoLegada("gerenciarprojetos").catch(() => false);

let fonteArea: () => Area = () => areaChrome(chrome.storage.local, "local");
let opcaoLigada: () => Promise<boolean> = opcaoDaExtensao;
/** O último valor lido da opção (null: ainda não lido). É o que a sugestão da caixa consulta. */
let opcaoVista: boolean | null = null;

/** Para os testes: a área em memória no lugar do chrome.storage. */
export function definirAreaProjetos(f: () => Area): void {
  fonteArea = f;
}

/** Para os testes: a opção "Gerenciar Projetos" no lugar do chrome.storage.sync (sem argumento, a da extensão). */
export function definirOpcaoProjetos(f: () => Promise<boolean> = opcaoDaExtensao): void {
  opcaoLigada = f;
  opcaoVista = null;
}

async function opcaoAgora(): Promise<boolean> {
  opcaoVista = await opcaoLigada();
  return opcaoVista;
}

/** O manifest da extensão traz o gestor de projetos novo (false sem `chrome`, como nos testes). */
export function projetosInstalado(): boolean {
  try {
    return (chrome.runtime.getManifest().content_scripts ?? []).some((c) => c.js?.includes("js/init_projetos.js"));
  } catch {
    return false;
  }
}

/** Para o painel, quando a tela muda: relê a opção (só no pacote com o módulo), para a sugestão da caixa. */
export async function atualizarOpcaoProjetos(): Promise<void> {
  if (projetosInstalado()) await opcaoAgora();
}

/** A ferramenta cumpre o pedido agora: o módulo no manifest e a opção ligada (a última lida). */
export function projetosDisponiveis(): boolean {
  return projetosInstalado() && opcaoVista === true;
}

/** Teto de etapas na resposta. */
export const MAX_ETAPAS = 300;

/**
 * Tamanho da resposta (JSON, em caracteres) que as etapas e os projetos podem ocupar. O motor corta o resultado
 * em 12 mil (`limiteResultado`) DEPOIS de trocar os nomes por pseudônimos; a folga cobre essa troca.
 */
const ORCAMENTO_PADRAO = 10_000;
let orcamento = ORCAMENTO_PADRAO;

/** Para os testes: outro tamanho máximo (sem argumento, o padrão). */
export function definirOrcamentoProjetos(n: number = ORCAMENTO_PADRAO): void {
  orcamento = n;
}

/** O que fica no texto livre no lugar de um número de processo e de um número de documento. */
export const SEM_NUMERO_PROCESSO = "[nº de processo]";
export const SEM_NUMERO_DOCUMENTO = "[nº de documento]";

/*
 * A leitura do número no texto livre, sem lista de separadores. Cada caractere é lido como a pessoa o vê, pela forma
 * normalizada (NFKC; o dígito de qualquer escrita pelo valor), mas a POSIÇÃO no texto original fica guardada: o texto
 * volta como era, só com o marcador no lugar do trecho do número (o modelo não precisa da forma normalizada, e os
 * invisíveis de dentro do trecho vão logo depois do marcador, para o `varrer` ainda os acusar no relatório).
 *
 * Os grupos de dígitos seguidos se ligam numa cadeia por QUALQUER trecho entre eles de 1 a 3 caracteres que não seja
 * letra (os espaços em volta não contam: " - - " liga) ou só por ocultos; o espaço entre palavras sozinho não liga
 * ("1234 5678" são dois). Na cadeia, 15 dígitos ou mais é a forma de processo e ela sai toda; abaixo disso, todo trecho
 * de grupos seguidos é conferido contra os números conhecidos (pela chave), também nas duas ordens que um controle de
 * direção mostra à pessoa (o RLO inverte os dígitos; o RLM antes de cada grupo inverte a ordem dos grupos), e sai a
 * união dos que batem. Uma passada pelo texto e, por cadeia de menos de 15 dígitos, no máximo 14 grupos: linear.
 */

/** Como um caractere conta na leitura: dígito (com o valor em ASCII), letra, espaço entre palavras, conector ou oculto. */
type Peca = { readonly k: "digito"; readonly d: string } | { readonly k: "letra" | "espaco" | "conector" | "oculto" };
const LETRA: Peca = { k: "letra" };
const ESPACO: Peca = { k: "espaco" };
const CONECTOR: Peca = { k: "conector" };
const OCULTO: Peca = { k: "oculto" };

/**
 * O espaço entre palavras: o comum, o NBSP, a tabulação e as quebras de linha. Os outros espaços (o fino, o de figura,
 * os de U+2000 a U+200A, U+202F, U+205F, U+3000) são o separador de milhar da tipografia e contam como conector, como o
 * U+1680, que aparece como traço.
 */
const espacoEntrePalavras = (c: number): boolean => c === 0x20 || (c >= 0x09 && c <= 0x0d) || c === 0xa0 || c === 0x2028 || c === 0x2029;

/** O caractere ASCII: dígito, letra, espaço entre palavras; o resto (pontuação, controle) é conector. */
function pecaAscii(c: number): Peca {
  if (c >= 0x30 && c <= 0x39) return { k: "digito", d: String.fromCharCode(c) };
  if ((c >= 0x41 && c <= 0x5a) || (c >= 0x61 && c <= 0x7a)) return LETRA;
  return espacoEntrePalavras(c) ? ESPACO : CONECTOR;
}
const ASCII: ReadonlyArray<readonly Peca[]> = Array.from({ length: 0x80 }, (_, c) => [pecaAscii(c)]);

const RE_OCULTO = /[\p{Cf}\p{M}]/u;
/**
 * O que fica no meio de um número sem aparecer: formatação (\p{Cf}: zero-width, BOM, marcas e controles de direção,
 * hífen suave), marcas combinantes (\p{M}: o "⃣" da tecla de emoji, seletores de variação), os preenchimentos do hangul
 * e as Unicode tags. Contém os INVISIVEIS do `varrer`.
 */
const oculto = (ch: string, c: number): boolean =>
  RE_OCULTO.test(ch) || c === 0x115f || c === 0x1160 || c === 0x3164 || c === 0xffa0 || (c >= 0xe0000 && c <= 0xe007f);

const RE_DECIMAL = /\p{Nd}/u;
/**
 * O valor de um decimal (\p{Nd}) que o NFKC não leva ao ASCII (arábico-índicos, persas, devanágari...): eles vêm em blocos
 * seguidos de 0 a 9 (às vezes dois blocos juntos), e o valor é a distância até o começo da sequência, módulo 10.
 */
function valorDecimal(c: number): string {
  let v = 0;
  while (v < 100 && c - v - 1 >= 0 && RE_DECIMAL.test(String.fromCodePoint(c - v - 1))) v++;
  return String(v % 10);
}

/**
 * Os dígitos que o NFKC não traduz e que não são decimais: os de Numeric_Type=Digit do Unicode 16 (etíope, New Tai Lue,
 * os duplamente circulados, os circulados negativos, os dingbats, kharoshthi, rumi, brahmi) e os números circulados de
 * 10 a 80 dos mesmos blocos ("❿", "⓫" a "⓴"). [primeiro, último, valor do primeiro, passo].
 */
const DIGITOS_SEM_DECOMPOSICAO: ReadonlyArray<readonly [number, number, number, number]> = [
  [0x1369, 0x1371, 1, 1],
  [0x19da, 0x19da, 1, 1],
  [0x24eb, 0x24f4, 11, 1],
  [0x24f5, 0x24fe, 1, 1],
  [0x24ff, 0x24ff, 0, 1],
  [0x2776, 0x277f, 1, 1],
  [0x2780, 0x2789, 1, 1],
  [0x278a, 0x2793, 1, 1],
  [0x3248, 0x324f, 10, 10],
  [0x10a40, 0x10a43, 1, 1],
  [0x10e60, 0x10e68, 1, 1],
  [0x11052, 0x1105a, 1, 1],
  [0x1f10b, 0x1f10c, 0, 0],
];
function valorTabelado(c: number): string | null {
  for (const [a, b, v, passo] of DIGITOS_SEM_DECOMPOSICAO) if (c >= a && c <= b) return String(v + (c - a) * passo);
  return null;
}

const RE_LETRA = /\p{L}/u;
const RE_LETRA_ASCII = /^[A-Za-z]/;
/**
 * Um caractere (já normalizado e fora do ASCII) da leitura. Letra é a do português: a que, sem o acento, é de A a Z
 * ("ç", "ã"; o "ª" e o "º" o NFKC já levou a "a" e "o"). As letras de outras escritas e as que parecem pontuação
 * ("ᐟ", "ᐧ", "ー") contam como conector: entre dois grupos de dígitos, a pessoa as lê como separador.
 */
function pecaNormalizada(x: string, c: number): Peca {
  if (RE_DECIMAL.test(x)) return { k: "digito", d: valorDecimal(c) };
  const t = valorTabelado(c);
  if (t !== null) return { k: "digito", d: t };
  if (oculto(x, c)) return OCULTO;
  if (RE_LETRA.test(x) && RE_LETRA_ASCII.test(x.normalize("NFD"))) return LETRA;
  return CONECTOR;
}

/** As peças de cada caractere fora do ASCII já lido (a mesma escrita se repete no texto). */
const PECAS = new Map<number, readonly Peca[]>();

/** Como o caractere `ch` (código `c`) conta: uma peça, ou várias quando o NFKC o abre ("⒈" dá "1.", "½" dá "1⁄2"). */
function pecasDe(ch: string, c: number): readonly Peca[] {
  if (c < 0x80) return ASCII[c] as readonly Peca[];
  const guardadas = PECAS.get(c);
  if (guardadas) return guardadas;
  let pecas: Peca[];
  if (oculto(ch, c)) pecas = [OCULTO];
  else if (espacoEntrePalavras(c)) pecas = [ESPACO];
  else {
    pecas = [];
    for (const x of ch.normalize("NFKC")) {
      const xc = x.codePointAt(0) as number;
      const p = xc < 0x80 ? ((ASCII[xc] as readonly Peca[])[0] as Peca) : pecaNormalizada(x, xc);
      // O espaço que sai da decomposição (os espaços tipográficos, "‗" e "´" dão espaço e marca) conta como conector.
      pecas.push(p.k === "espaco" ? CONECTOR : p);
    }
  }
  if (PECAS.size >= 4096) PECAS.clear();
  PECAS.set(c, pecas);
  return pecas;
}

/** Um grupo de dígitos seguidos: a posição no texto original e os dígitos, em ASCII. */
interface Grupo {
  ini: number;
  fim: number;
  d: string;
}

/** Quantos conectores, no máximo, ligam dois grupos (os espaços entre eles não contam). */
const MAX_CONECTORES = 3;
/** Com menos dígitos é dia, quantidade, item: nunca sai do texto. */
const MIN_DIGITOS = 4;
/** Com tantos dígitos tem a forma de número de processo (o NUP tem 17; o do SEI-RJ, 16), mesmo desconhecido daqui. */
const DIGITOS_DE_PROCESSO = 15;

/** As cadeias de grupos de dígitos de `t`, na ordem do texto (ver a leitura acima). */
function cadeiasDe(t: string): Grupo[][] {
  const cadeias: Grupo[][] = [];
  let cadeia: Grupo[] | null = null;
  let grupo: Grupo | null = null;
  // Desde o último dígito: quantos conectores, se houve espaço, e se a ligação já se quebrou (letra ou conector demais).
  let conectores = 0;
  let espaco = false;
  let quebrou = false;
  let i = 0;
  for (const ch of t) {
    const fim = i + ch.length;
    for (const p of pecasDe(ch, ch.codePointAt(0) as number)) {
      if (p.k === "digito") {
        if (grupo) {
          grupo.d += p.d;
          grupo.fim = fim;
        } else {
          grupo = { ini: i, fim, d: p.d };
          // Só ocultos desde o grupo anterior, ou de 1 a 3 conectores (com ou sem espaço): a mesma cadeia.
          if (cadeia && !quebrou && (conectores > 0 || !espaco)) cadeia.push(grupo);
          else {
            cadeia = [grupo];
            cadeias.push(cadeia);
          }
        }
        conectores = 0;
        espaco = false;
        quebrou = false;
        continue;
      }
      // O oculto fecha o grupo (os dois lados são conferidos também sozinhos) sem mudar a ligação.
      grupo = null;
      if (p.k === "espaco") espaco = true;
      else if (p.k === "conector") quebrou ||= ++conectores > MAX_CONECTORES;
      else if (p.k === "letra") quebrou = true;
    }
    i = fim;
  }
  return cadeias;
}

/** Os números que este computador conhece: processos pelos dígitos (`chaveProtocolo`), documentos pela `chaveDocumento`. */
interface NumerosConhecidos {
  processos: ReadonlySet<string>;
  documentos: ReadonlySet<string>;
  /** Os tamanhos das chaves: o trecho de outro tamanho nem é procurado (a conta é pela chave, não pelos dígitos crus). */
  tamanhosProcesso: ReadonlySet<number>;
  tamanhosDocumento: ReadonlySet<number>;
}

/** Os da regra e da memória (`s`) mais todo vínculo, documento e registro dos dois escopos (vivos e lápides). */
function numerosConhecidos(escopos: readonly Entidades[], s: SigiloDoEnvelope): NumerosConhecidos {
  const processos = new Set(s.chaves);
  const documentos = new Set(s.documentos);
  const processo = (t: unknown) => {
    const k = typeof t === "string" ? chaveProtocolo(t) : "";
    if (k) processos.add(k);
  };
  const documento = (t: unknown) => {
    const k = typeof t === "string" ? chaveDocumento(t) : "";
    if (k) documentos.add(k);
  };
  for (const x of escopos) {
    for (const i of [...x.p, ...x.e]) processo(i?.processo?.protocolo);
    for (const e of x.e) documento(e?.documento?.numero);
    for (const r of x.h) {
      if (r?.campo === "processo") for (const t of [r.antes, r.depois]) processo(t);
      if (r?.campo === "documento") for (const t of [r.antes, r.depois]) documento(t);
    }
  }
  const tamanhos = (xs: ReadonlySet<string>) => new Set(Array.from(xs, (k) => k.length));
  return { processos, documentos, tamanhosProcesso: tamanhos(processos), tamanhosDocumento: tamanhos(documentos) };
}

/** O marcador do trecho de dígitos `d` que `n` conhece (processo pelos dígitos, documento pela `chaveDocumento`), ou null. */
function marcadorDe(d: string, n: NumerosConhecidos): string | null {
  if (d.length < MIN_DIGITOS) return null;
  if (n.tamanhosProcesso.has(d.length) && n.processos.has(d)) return SEM_NUMERO_PROCESSO;
  // Só dígitos ASCII: sem zero à esquerda, a chave do documento é o próprio trecho.
  const k = d.charCodeAt(0) === 0x30 ? chaveDocumento(d) : d;
  return n.tamanhosDocumento.has(k.length) && n.documentos.has(k) ? SEM_NUMERO_DOCUMENTO : null;
}

const inverso = (d: string): string => d.split("").reverse().join("");

/**
 * Os trechos [primeiro grupo, último grupo, marcador] da cadeia (menos de 15 dígitos) que batem com um número conhecido:
 * cada trecho de grupos seguidos, na ordem do texto, com os dígitos ao contrário (RLO) e com os grupos ao contrário
 * (RLM). Os que se sobrepõem saem juntos ("5 - 12003/1234-202", com "512003" documento e "120031234202" processo, sai
 * inteiro); os vizinhos, cada um com o seu marcador.
 */
function trechosConhecidos(cadeia: readonly Grupo[], n: NumerosConhecidos): Array<[number, number, string]> {
  const achados: Array<[number, number, string]> = [];
  const invertidos = cadeia.map((g) => inverso(g.d));
  for (let i = 0; i < cadeia.length; i++) {
    let frente = "";
    let aoContrario = "";
    let gruposAoContrario = "";
    for (let j = i; j < cadeia.length; j++) {
      const d = (cadeia[j] as Grupo).d;
      frente += d;
      aoContrario = invertidos[j] + aoContrario;
      gruposAoContrario = d + gruposAoContrario;
      const marca = marcadorDe(frente, n) ?? marcadorDe(aoContrario, n) ?? (i < j ? marcadorDe(gruposAoContrario, n) : null);
      if (marca) achados.push([i, j, marca]);
    }
  }
  const unidos: Array<[number, number, string]> = [];
  for (const [i, j, marca] of achados) {
    const ultimo = unidos[unidos.length - 1];
    if (ultimo && i <= ultimo[1]) {
      ultimo[1] = Math.max(ultimo[1], j);
      if (marca === SEM_NUMERO_PROCESSO) ultimo[2] = marca;
    } else unidos.push([i, j, marca]);
  }
  return unidos;
}

/** Os invisíveis de `t`, juntos: vão logo depois do marcador, e o `varrer` ainda os acusa no relatório (e os tira). */
const invisiveisDe = (t: string): string => (t.match(INVISIVEIS) ?? []).join("");

/** O texto livre sem número de processo nem de documento (o que `n` conhece e o que tem a forma de processo). */
function semNumeros(t: string, n: NumerosConhecidos): string {
  let saida = "";
  let desde = 0;
  const trocar = (ini: number, fim: number, marca: string) => {
    // Dois grupos podem vir do mesmo caractere ("½" dá "1⁄2"): o que já saiu não sai de novo.
    const de = Math.max(ini, desde);
    if (fim <= de) return;
    saida += `${t.slice(desde, de)}${marca}${invisiveisDe(t.slice(de, fim))}`;
    desde = fim;
  };
  for (const cadeia of cadeiasDe(t)) {
    const total = cadeia.reduce((soma, g) => soma + g.d.length, 0);
    if (total < MIN_DIGITOS) continue;
    if (total >= DIGITOS_DE_PROCESSO) {
      trocar((cadeia[0] as Grupo).ini, (cadeia[cadeia.length - 1] as Grupo).fim, SEM_NUMERO_PROCESSO);
      continue;
    }
    for (const [i, j, marca] of trechosConhecidos(cadeia, n)) trocar((cadeia[i] as Grupo).ini, (cadeia[j] as Grupo).fim, marca);
  }
  return saida + t.slice(desde);
}

/** A memória do sigilo; ilegível, nada é listado (a regra sem ela deixaria sair o número que só ela conhece). */
async function memoriaDoSigilo(repo: RepositorioProjetos): Promise<SigilosConhecidos> {
  try {
    return await repo.sigilosConhecidos();
  } catch (e) {
    if (e instanceof ErroMemoriaSigilo)
      throw new Error(
        "Não foi possível ler a lista de processos sigilosos deste computador: por segurança, nenhum projeto foi listado. Tente de novo.",
        { cause: e },
      );
    throw e;
  }
}

/**
 * O `dados()` do repositório sobre as entidades já lidas (uma leitura por escopo): o que está vivo, na ordem
 * manual. Os modelos não interessam ao agente.
 */
function vivos(t: Entidades): Dados {
  const vivo = <T extends { removidoEm?: number }>(x: T | undefined): x is T => !!x && x.removidoEm === undefined;
  const projetos = t.p.filter(vivo).sort(porOrdem);
  const ativos = new Set(projetos.map((p) => p.id));
  return {
    projetos,
    fases: t.f.filter((f) => vivo(f) && ativos.has(f.projeto)).sort(porOrdem),
    etapas: t.e.filter((e) => vivo(e) && ativos.has(e.projeto)).sort(porOrdem),
    modelos: [],
  };
}

type Filtro = "atrasadas" | "semana" | "todos";

function situacao(e: Etapa, hoje: DataISO): string {
  return e.marco ? ROTULO_MARCO[situacaoMarco(e, hoje)] : ROTULO_SITUACAO[situacaoEtapa(e, hoje)];
}

/** Tamanho no JSON da resposta (com a vírgula que separa da próxima). */
const tamanho = (x: unknown): number => JSON.stringify(x).length + 1;

export const TOOL_PROJETOS: DefTool = definirTool({
  nome: "projetos_listar",
  descricao:
    "Lista os PROJETOS do usuário no SEI Pro (o gestor de projetos com Gantt) da unidade da tela, dos dois tipos: 'Toda a unidade' (compartilhados) e 'Só eu'. Traz os contadores (atrasadas, vencem nesta semana) e, de cada projeto, o progresso, o término e as etapas (nome, fase, situação, início, término, responsável, progresso, observações e checklist). Use para 'o que está atrasado nos meus projetos', 'o que vence esta semana', 'em que pé está o projeto X'. Somente leitura; não abre nada no SEI. Não traz número de processo nem de documento (no texto aparecem como [nº de processo] e [nº de documento]); projetos e etapas de processo sigiloso ficam de fora (só contados). Resposta grande sai cortada (etapasCortadas, projetosCortados): use o filtro ou o nome do projeto.",
  parametros: s.objeto({
    "filtro?": s.texto({
      enum: ["atrasadas", "semana", "todos"],
      descricao: "atrasadas = etapas com término vencido; semana = vencem até a sexta desta semana; todos = todas as etapas. Padrão: todos.",
    }),
    "projeto?": s.texto({ descricao: "Parte do nome do projeto (sem acento/caixa)." }),
  }),
  efeito: "leitura",
  rotulo: () => "Ler os projetos",
  executar: async (a, ctx) => {
    // Desligado (ou ilegível) nas opções: o agente não lê nada (nem a aba, nem o armazenamento).
    if (!(await opcaoAgora()))
      return {
        totalProjetos: 0,
        projetos: [],
        desligado: true,
        mensagem: "O gestor de projetos está desligado nas opções do SEI Pro (Gerenciar Projetos).",
      };
    const e = await ctx.sei<{ host: string; login: string; unidade: { id: string; sigla: string } | null }>("favoritos.escopo");
    if (!e.unidade) return { totalProjetos: 0, projetos: [], mensagem: "Abra o SEI numa unidade: os projetos são da unidade." };
    const esc = escoposDaUnidade(e.host, e.login, e.unidade.id);
    const area = fonteArea();
    const leitura = () => ({ agora: Date.now(), dispositivo: "agente" });
    const repos = { unidade: new RepositorioProjetos(area, esc.unidade, leitura), eu: new RepositorioProjetos(area, esc.eu, leitura) };
    const hoje = hojeISO();
    // Uma leitura por escopo, com as lápides (a regra do sigilo as conta); a tela e a regra veem o MESMO estado.
    const [deUn, deEu] = await Promise.all([repos.unidade.entidades(), repos.eu.entidades()]);
    // Depois: a memória só cresce, então a lida por último sabe pelo menos o que as entidades marcam.
    const conhecidos = await memoriaDoSigilo(repos.unidade);
    const dados = montarUnidade(
      [
        { vis: "unidade", dados: vivos(deUn) },
        { vis: "eu", dados: vivos(deEu) },
      ],
      hoje,
    );
    // A regra do Texto Padrão sobre os dois escopos juntos (vivos e lápides), mais a memória.
    const sigilo = sigiloDoEnvelope([...deUn.p, ...deEu.p], [...deUn.e, ...deEu.e], conhecidos);
    const numeros = numerosConhecidos([deUn, deEu], sigilo);
    const livre = (t: string) => semNumeros(t, numeros);
    const projetoSigiloso = (p: ProjetoNaTela) => sigilo.projetos.has(p.projeto.id) || sigilo.vinculo(p.projeto.processo);
    const filtro: Filtro = a.filtro === "atrasadas" || a.filtro === "semana" ? a.filtro : "todos";
    // A busca vê o nome como ele sai: um número que não vai na resposta também não serve para achar.
    const busca = a.projeto ? normalizarTexto(String(a.projeto)) : "";
    // Sigiloso sai antes de qualquer outra coisa: só entra na contagem, que é da unidade toda (a busca e o
    // filtro não a mudam).
    const projetosSigilosos = dados.ativos.filter(projetoSigiloso).length;
    let etapasSigilosas = 0;
    const abertos = dados.ativos
      .filter((p) => !projetoSigiloso(p))
      .map((p) => {
        const etapas = p.etapas.filter((x) => !sigilo.etapas.has(x.id) && !etapaSigilosa(x, p.projeto, sigilo));
        etapasSigilosas += p.etapas.length - etapas.length;
        return { p, etapas };
      });
    // Progresso e término só das etapas que saem: a sigilosa não aparece nem pela conta.
    const visiveis = abertos
      .filter(({ p }) => !busca || normalizarTexto(livre(p.projeto.nome)).includes(busca))
      .map(({ p, etapas }) => ({ p, etapas, alertas: alertasDasEtapas(etapas, hoje), resumo: resumoDoProjeto(etapas, hoje) }));
    const atrasadas = visiveis.reduce((n, v) => n + v.alertas.atrasadas.length, 0);
    const semana = visiveis.reduce((n, v) => n + v.alertas.semana.length, 0);
    const contadores = {
      unidade: e.unidade.sigla,
      totalProjetos: visiveis.length,
      atrasadas,
      semana,
      sigilososOmitidos: projetosSigilosos + etapasSigilosas,
    };
    // Cabe no corte do motor: os contadores (com os de corte no maior valor possível), cada projeto e cada etapa
    // entram pelo tamanho; o que não cabe sai inteiro e é contado. A ordem fica (nada depois do primeiro que não cabe).
    const todas = visiveis.reduce((n, v) => n + v.etapas.length, 0);
    let usado = tamanho({ ...contadores, etapasCortadas: todas, projetosCortados: visiveis.length, projetos: [] });
    let cheio = false;
    let restam = MAX_ETAPAS;
    let etapasCortadas = 0;
    let projetosCortados = 0;
    const responsaveis: string[] = [];
    const projetos: unknown[] = [];
    for (const { p, etapas, alertas, resumo } of visiveis) {
      const escolhidas = filtro === "atrasadas" ? alertas.atrasadas : filtro === "semana" ? alertas.semana : etapas;
      if (filtro !== "todos" && !escolhidas.length) continue;
      // Nome, fase, observações e checklist são texto livre digitado por gente (o "Toda a unidade" é escrito por
      // qualquer colega): a mesma marcação do conteúdo dos documentos (ver seguranca/injecao.ts).
      const nome = livre(p.projeto.nome);
      const cabeca = varrerCamposLivres({
        nome,
        vis: rotuloDaVis(p.vis),
        progresso: `${resumo.progresso}%`,
        ...(resumo.fim ? { termino: formatarData(resumo.fim) } : {}),
        atrasadas: alertas.atrasadas.length,
      });
      const custo = tamanho({ ...cabeca.valor, etapas: [] });
      if (cheio || usado + custo > orcamento) {
        cheio = true;
        projetosCortados++;
        etapasCortadas += escolhidas.length;
        continue;
      }
      usado += custo;
      const achados: Achado[] = [...cabeca.achados];
      const fases = new Map(p.fases.map((f) => [f.id, f.nome]));
      const lista: unknown[] = [];
      for (const x of escolhidas) {
        if (cheio || restam <= 0) {
          etapasCortadas++;
          continue;
        }
        const fase = x.fase ? fases.get(x.fase) : undefined;
        const responsavel = x.responsavel ? livre(x.responsavel.nome) : "";
        const etapa = varrerCamposLivres({
          nome: livre(x.nome),
          ...(fase !== undefined ? { fase: livre(fase) } : {}),
          situacao: situacao(x, hoje),
          inicio: formatarData(x.inicio),
          termino: formatarData(x.fim),
          ...(responsavel ? { responsavel } : {}),
          ...(x.marco ? { marco: true } : { progresso: `${progressoDaEtapa(x, hoje)}%` }),
          ...(x.observacoes ? { observacoes: livre(x.observacoes) } : {}),
          ...(x.checklist.length ? { checklist: x.checklist.map((i) => `${i.feito ? "[x]" : "[ ]"} ${livre(i.texto)}`) } : {}),
        });
        const c = tamanho(etapa.valor);
        if (usado + c > orcamento) {
          cheio = true;
          etapasCortadas++;
          continue;
        }
        usado += c;
        restam--;
        lista.push(etapa.valor);
        achados.push(...etapa.achados);
        if (responsavel) responsaveis.push(responsavel);
      }
      if (achados.length) ctx.registrarAchados(`projeto ${nome.slice(0, 60)}`, achados);
      projetos.push({ ...cabeca.valor, etapas: lista });
    }
    // Como processo_consultar: os responsáveis entram no dicionário da anonimização (o motor troca os
    // nomes por pseudônimos antes de mandar ao modelo).
    if (responsaveis.length) ctx.pessoasVistas([...new Set(responsaveis)]);
    // Os contadores ANTES da lista: o motor corta o resultado no fim, e eles sumiriam.
    return {
      ...contadores,
      ...(etapasCortadas ? { etapasCortadas } : {}),
      ...(projetosCortados ? { projetosCortados } : {}),
      projetos,
    };
  },
});
