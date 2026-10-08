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
 * vão, e o texto livre (nomes, fase, observações, checklist) sai sem os números
 * que este computador conhece (vínculos, documentos, registros e a memória, com
 * ou sem pontuação, espaço ou invisível no meio) e sem os que têm a forma de
 * número de processo.
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
 * Os caracteres fora do ASCII destas classes são montados por `String.fromCharCode`/`fromCodePoint`: o fonte dos regex
 * fica em ASCII (o esbuild não escapa literal de regex, e o pacote não pode ganhar byte acima de 0x7f).
 */
/**
 * Um dígito de qualquer escrita: os decimais (\p{Nd}: ASCII, largura total, arábico-índicos, devanágari, negrito
 * matemático...) e os outros números (\p{No}: sobrescritos, subscritos, circulados). O valor sai de `digitosDe`.
 */
const DIGITO = "[\\p{Nd}\\p{No}]";
/**
 * O que fica no meio de um número sem aparecer: formatação (\p{Cf}: zero-width, BOM, marcas de direção, hífen suave),
 * marcas combinantes (\p{M}), os preenchimentos do hangul e as Unicode tags (U+E0000 a U+E007F). Contém os INVISIVEIS do
 * `varrer` (que só os tira DEPOIS). Uma classe só, sem nada em comum com DIGITO e SEPARADOR: sem ambiguidade no retrocesso.
 */
const OCULTO = `[\\p{Cf}\\p{M}${String.fromCharCode(0x115f, 0x1160, 0x3164, 0xffa0)}${String.fromCodePoint(0xe0000)}-${String.fromCodePoint(0xe007f)}]`;
/** Espaço (inclusive o NBSP) ou oculto, sem ambiguidade (o BOM é os dois: sem o `(?!)`, o retrocesso explode). */
const BRANCO = `(?:(?!${OCULTO})\\s|${OCULTO})`;
/**
 * A pontuação entre os blocos: ponto, barra, sublinhado, os traços (\p{Pd}: o hífen, U+2010 a U+2015, os de largura
 * total), o menos (U+2212), o ponto médio, as barras de divisão (U+2215), de fração e de largura total, o ponto de
 * largura total, os pontos de líder e de hifenização, o ponto pequeno, a barra grande, o ponto médio do katakana e os
 * separadores decimal e de milhar do árabe.
 */
const SEPARADOR = `[./_\\p{Pd}${String.fromCharCode(0x2212, 0xb7, 0x2215, 0x2044, 0xff0f, 0xff0e, 0x2024, 0x2027, 0xfe52, 0x29f8, 0x30fb, 0x66b, 0x66c)}]`;
/**
 * Uma sequência de dígitos com pontuação ou oculto no meio: "50300.000001/2026-01", "50300000001202601", "0123456",
 * e também com oculto, espaço colado à pontuação, travessão ou dígito de outra escrita ("50300.000001 / 2026–01").
 * Dígitos separados SÓ por espaço não se juntam ("1234 5678" são dois).
 */
const RE_NUMERO = new RegExp(`${DIGITO}(?:${OCULTO}*${DIGITO}|${BRANCO}*${SEPARADOR}${BRANCO}*${DIGITO})*`, "gu");
const RE_DECIMAL = /\p{Nd}/u;

/**
 * Os dígitos ASCII de um caractere da sequência ("" se não é dígito): o NFKC resolve largura total, sobrescrito,
 * circulado e o negrito matemático ("⑳" dá "20"); os outros decimais do Unicode vêm em blocos seguidos de 0 a 9 (às
 * vezes dois blocos juntos), e o valor é a distância até o começo da sequência, módulo 10.
 */
function digitosDe(ch: string): string {
  if (ch.length === 1 && ch >= "0" && ch <= "9") return ch;
  const k = ch.normalize("NFKC");
  if (/^[0-9]+$/.test(k)) return k;
  const cp = ch.codePointAt(0) ?? 0;
  if (!RE_DECIMAL.test(ch)) return "";
  let v = 0;
  while (v < 100 && cp - v - 1 >= 0 && RE_DECIMAL.test(String.fromCodePoint(cp - v - 1))) v++;
  return String(v % 10);
}

/** Os grupos de dígitos seguidos da sequência `m`, com a posição em `m` e os dígitos em ASCII. */
function gruposDe(m: string): Array<{ ini: number; fim: number; d: string }> {
  const grupos: Array<{ ini: number; fim: number; d: string }> = [];
  let atual: { ini: number; fim: number; d: string } | null = null;
  let i = 0;
  for (const ch of m) {
    const d = digitosDe(ch);
    if (!d) atual = null;
    else if (atual) {
      atual.d += d;
      atual.fim = i + ch.length;
    } else {
      atual = { ini: i, fim: i + ch.length, d };
      grupos.push(atual);
    }
    i += ch.length;
  }
  return grupos;
}
/** Com menos dígitos é dia, quantidade, item: nunca sai do texto. */
const MIN_DIGITOS = 4;
/** Com tantos dígitos tem a forma de número de processo (o NUP tem 17; o do SEI-RJ, 16), mesmo desconhecido daqui. */
const DIGITOS_DE_PROCESSO = 15;

/** Os números que este computador conhece: processos pelos dígitos (`chaveProtocolo`), documentos pela `chaveDocumento`. */
interface NumerosConhecidos {
  processos: ReadonlySet<string>;
  documentos: ReadonlySet<string>;
  /** Quantos dígitos tem o maior deles: nenhum trecho mais longo bate. */
  maior: number;
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
  // Sem espalhar em `Math.max`: a memória pode ter dezenas de milhares de números.
  let maior = 0;
  for (const k of [...processos, ...documentos]) if (k.length > maior) maior = k.length;
  return { processos, documentos, maior };
}

/** O marcador do trecho de dígitos `d` que `n` conhece (processo pelos dígitos, documento pela `chaveDocumento`), ou null. */
function marcadorDe(d: string, n: NumerosConhecidos): string | null {
  if (d.length < MIN_DIGITOS) return null;
  if (n.processos.has(d)) return SEM_NUMERO_PROCESSO;
  return n.documentos.has(chaveDocumento(d)) ? SEM_NUMERO_DOCUMENTO : null;
}

/** Os invisíveis de `t`, juntos: vão logo depois do marcador, e o `varrer` ainda os acusa no relatório (e os tira). */
const invisiveisDe = (t: string): string => (t.match(INVISIVEIS) ?? []).join("");

/** O texto livre sem número de processo nem de documento (o que `n` conhece e o que tem a forma de processo). */
function semNumeros(t: string, n: NumerosConhecidos): string {
  return t.replace(RE_NUMERO, (m) => {
    const grupos = gruposDe(m);
    const digitos = grupos.map((g) => g.d).join("");
    if (digitos.length < MIN_DIGITOS) return m;
    if (digitos.length >= DIGITOS_DE_PROCESSO) return `${SEM_NUMERO_PROCESSO}${invisiveisDe(m)}`;
    // O número conhecido pode estar colado a outro ("120031234202 - 5", "5 / 12003/1234-202", "0123 - 12345678"): cada
    // trecho de grupos de dígitos seguidos (comparados em ASCII) é conferido, do mais longo ao mais curto a partir de cada grupo, e só o trecho
    // que bate sai (o resto fica). A sequência inteira é um desses trechos.
    let saida = "";
    let desde = 0;
    for (let i = 0; i < grupos.length; ) {
      let achado: { ate: number; marca: string } | null = null;
      let d = "";
      for (let j = i; j < grupos.length; j++) {
        const g = grupos[j] as { ini: number; fim: number; d: string };
        if (d.length + g.d.length > n.maior) break;
        d += g.d;
        const marca = marcadorDe(d, n);
        if (marca) achado = { ate: j, marca };
      }
      if (!achado) {
        i++;
        continue;
      }
      const ini = (grupos[i] as { ini: number }).ini;
      const fim = (grupos[achado.ate] as { fim: number }).fim;
      saida += `${m.slice(desde, ini)}${achado.marca}${invisiveisDe(m.slice(ini, fim))}`;
      desde = fim;
      i = achado.ate + 1;
    }
    return saida + m.slice(desde);
  });
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
