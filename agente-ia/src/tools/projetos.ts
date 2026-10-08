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
 * ou sem pontuação) e sem os que têm a forma de número de processo.
 */

import { type Area, areaChrome } from "@comum/armazenamento/area";
import { formatarData, hojeISO } from "@comum/datas/dias";
import { lerOpcaoLegada } from "@comum/opcoes/legadas";
import { normalizarTexto } from "@comum/texto";
import { carregarUnidade, type ProjetoNaTela } from "@projetos/app/dados";
import { alertasDasEtapas } from "@projetos/modelo/alertas";
import { escoposDaUnidade, rotuloDaVis } from "@projetos/modelo/escopo";
import { ErroMemoriaSigilo } from "@projetos/modelo/memoriaSigilo";
import { progressoDaEtapa } from "@projetos/modelo/progresso";
import { resumoDoProjeto } from "@projetos/modelo/resumo";
import { etapaSigilosa, type SigiloDoEnvelope, type SigilosConhecidos, sigiloDoEnvelope } from "@projetos/modelo/sigilo";
import { ROTULO_MARCO, ROTULO_SITUACAO, situacaoEtapa, situacaoMarco } from "@projetos/modelo/situacao";
import type { DataISO, Entidades, Etapa } from "@projetos/modelo/tipos";
import { chaveDocumento, chaveProtocolo } from "@projetos/modelo/vinculos";
import { RepositorioProjetos } from "@projetos/repositorio";
import { s } from "../motor/esquema";
import { definirTool, type DefTool } from "../motor/tools";
import { varrerCamposLivres } from "../seguranca/injecao";

let fonteArea: () => Area = () => areaChrome(chrome.storage.local, "local");
// Mesma regra do content script e do app: a opção ausente (ou ilegível) conta como ligada.
let opcaoLigada: () => Promise<boolean> = () => lerOpcaoLegada("gerenciarprojetos").catch(() => true);

/** Para os testes: a área em memória no lugar do chrome.storage. */
export function definirAreaProjetos(f: () => Area): void {
  fonteArea = f;
}

/** Para os testes: a opção "Gerenciar Projetos" no lugar do chrome.storage.sync. */
export function definirOpcaoProjetos(f: () => Promise<boolean>): void {
  opcaoLigada = f;
}

/** O manifest da extensão traz o gestor de projetos novo (false sem `chrome`, como nos testes). */
export function projetosInstalado(): boolean {
  try {
    return (chrome.runtime.getManifest().content_scripts ?? []).some((c) => c.js?.includes("js/init_projetos.js"));
  } catch {
    return false;
  }
}

/** Teto de etapas na resposta (o motor corta o resultado em ~12 mil caracteres). */
export const MAX_ETAPAS = 300;

/** O que fica no texto livre no lugar de um número de processo e de um número de documento. */
export const SEM_NUMERO_PROCESSO = "[nº de processo]";
export const SEM_NUMERO_DOCUMENTO = "[nº de documento]";

/** Uma sequência de dígitos com ou sem pontuação no meio: "50300.000001/2026-01", "50300000001202601", "0123456". */
const RE_NUMERO = /\d(?:[\d./-]*\d)?/g;
/** Com menos dígitos é dia, quantidade, item: nunca sai do texto. */
const MIN_DIGITOS = 4;
/** Com tantos dígitos tem a forma de número de processo (o NUP tem 17; o do SEI-RJ, 16), mesmo desconhecido daqui. */
const DIGITOS_DE_PROCESSO = 15;

/** Os números que este computador conhece: processos pelos dígitos (`chaveProtocolo`), documentos pela `chaveDocumento`. */
interface NumerosConhecidos {
  processos: ReadonlySet<string>;
  documentos: ReadonlySet<string>;
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
  return { processos, documentos };
}

/** O texto livre sem número de processo nem de documento (o que `n` conhece e o que tem a forma de processo). */
function semNumeros(t: string, n: NumerosConhecidos): string {
  return t.replace(RE_NUMERO, (m) => {
    const digitos = m.replace(/\D/g, "");
    if (digitos.length < MIN_DIGITOS) return m;
    if (digitos.length >= DIGITOS_DE_PROCESSO || n.processos.has(digitos)) return SEM_NUMERO_PROCESSO;
    // Documento colado a outro ("0123456/0123457") também sai: cada pedaço conta.
    const pedacos = [digitos, ...m.split(/[./-]/)].filter((p) => p.length >= MIN_DIGITOS);
    return pedacos.some((p) => n.documentos.has(chaveDocumento(p))) ? SEM_NUMERO_DOCUMENTO : m;
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

type Filtro = "atrasadas" | "semana" | "todos";

function situacao(e: Etapa, hoje: DataISO): string {
  return e.marco ? ROTULO_MARCO[situacaoMarco(e, hoje)] : ROTULO_SITUACAO[situacaoEtapa(e, hoje)];
}

export const TOOL_PROJETOS: DefTool = definirTool({
  nome: "projetos_listar",
  descricao:
    "Lista os PROJETOS do usuário no SEI Pro (o gestor de projetos com Gantt) da unidade da tela, dos dois tipos: 'Toda a unidade' (compartilhados) e 'Só eu'. Traz os contadores (atrasadas, vencem nesta semana) e, de cada projeto, o progresso, o término e as etapas (nome, fase, situação, início, término, responsável, progresso, observações e checklist). Use para 'o que está atrasado nos meus projetos', 'o que vence esta semana', 'em que pé está o projeto X'. Somente leitura; não abre nada no SEI. Não traz número de processo nem de documento (no texto aparecem como [nº de processo] e [nº de documento]); projetos e etapas de processo sigiloso ficam de fora (só contados).",
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
    // Desligado nas opções: o agente não lê nada (nem a aba, nem o armazenamento).
    if (!(await opcaoLigada()))
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
    const [dados, deUn, deEu] = await Promise.all([carregarUnidade(repos, hoje), repos.unidade.entidades(), repos.eu.entidades()]);
    // Depois dos dados: a memória só cresce, então a lida por último sabe pelo menos o que eles marcam.
    const conhecidos = await memoriaDoSigilo(repos.unidade);
    // A regra do Texto Padrão sobre os dois escopos (vivos e lápides) e sobre o que a tela vai mostrar.
    const sigilo = sigiloDoEnvelope(
      [...deUn.p, ...deEu.p, ...dados.ativos.map((p) => p.projeto)],
      [...deUn.e, ...deEu.e, ...dados.ativos.flatMap((p) => p.etapas)],
      conhecidos,
    );
    const numeros = numerosConhecidos([deUn, deEu], sigilo);
    const livre = (t: string) => semNumeros(t, numeros);
    const projetoSigiloso = (p: ProjetoNaTela) => sigilo.projetos.has(p.projeto.id) || sigilo.vinculo(p.projeto.processo);
    const filtro: Filtro = a.filtro === "atrasadas" || a.filtro === "semana" ? a.filtro : "todos";
    // A busca vê o nome como ele sai: um número que não vai na resposta também não serve para achar.
    const busca = a.projeto ? normalizarTexto(String(a.projeto)) : "";
    // Sigiloso sai antes de qualquer outra coisa: só entra na contagem.
    const projetosSigilosos = dados.ativos.filter(projetoSigiloso).length;
    let etapasSigilosas = 0;
    const visiveis = dados.ativos
      .filter((p) => !projetoSigiloso(p) && (!busca || normalizarTexto(livre(p.projeto.nome)).includes(busca)))
      .map((p) => {
        const etapas = p.etapas.filter((x) => !sigilo.etapas.has(x.id) && !etapaSigilosa(x, p.projeto, sigilo));
        etapasSigilosas += p.etapas.length - etapas.length;
        // Progresso e término só das etapas que saem: a sigilosa não aparece nem pela conta.
        return { p, etapas, alertas: alertasDasEtapas(etapas, hoje), resumo: resumoDoProjeto(etapas, hoje) };
      });
    const atrasadas = visiveis.reduce((n, v) => n + v.alertas.atrasadas.length, 0);
    const semana = visiveis.reduce((n, v) => n + v.alertas.semana.length, 0);
    let restam = MAX_ETAPAS;
    let cortadas = 0;
    const responsaveis: string[] = [];
    const projetos = visiveis.flatMap(({ p, etapas, alertas, resumo }) => {
      const escolhidas = filtro === "atrasadas" ? alertas.atrasadas : filtro === "semana" ? alertas.semana : etapas;
      if (filtro !== "todos" && !escolhidas.length) return [];
      const cabem = escolhidas.slice(0, Math.max(0, restam));
      cortadas += escolhidas.length - cabem.length;
      restam -= cabem.length;
      const fases = new Map(p.fases.map((f) => [f.id, f.nome]));
      const item = {
        nome: livre(p.projeto.nome),
        vis: rotuloDaVis(p.vis),
        progresso: `${resumo.progresso}%`,
        ...(resumo.fim ? { termino: formatarData(resumo.fim) } : {}),
        atrasadas: alertas.atrasadas.length,
        etapas: cabem.map((x) => {
          const fase = x.fase ? fases.get(x.fase) : undefined;
          const responsavel = x.responsavel ? livre(x.responsavel.nome) : "";
          if (responsavel) responsaveis.push(responsavel);
          return {
            nome: livre(x.nome),
            ...(fase !== undefined ? { fase: livre(fase) } : {}),
            situacao: situacao(x, hoje),
            inicio: formatarData(x.inicio),
            termino: formatarData(x.fim),
            ...(responsavel ? { responsavel } : {}),
            ...(x.marco ? { marco: true } : { progresso: `${progressoDaEtapa(x, hoje)}%` }),
            ...(x.observacoes ? { observacoes: livre(x.observacoes) } : {}),
            ...(x.checklist.length ? { checklist: x.checklist.map((i) => `${i.feito ? "[x]" : "[ ]"} ${livre(i.texto)}`) } : {}),
          };
        }),
      };
      // Nome, fase, observações e checklist são texto livre digitado por gente (o "Toda a unidade" é escrito por
      // qualquer colega): a mesma marcação do conteúdo dos documentos (ver seguranca/injecao.ts).
      const varrido = varrerCamposLivres(item);
      if (varrido.achados.length) ctx.registrarAchados(`projeto ${item.nome.slice(0, 60)}`, varrido.achados);
      return [varrido.valor];
    });
    // Como processo_consultar: os responsáveis entram no dicionário da anonimização (o motor troca os
    // nomes por pseudônimos antes de mandar ao modelo).
    if (responsaveis.length) ctx.pessoasVistas([...new Set(responsaveis)]);
    // Os contadores ANTES da lista: o motor corta o resultado em ~12 mil caracteres, e no fim eles sumiriam.
    return {
      unidade: e.unidade.sigla,
      totalProjetos: visiveis.length,
      atrasadas,
      semana,
      sigilososOmitidos: projetosSigilosos + etapasSigilosas,
      ...(cortadas ? { etapasCortadas: cortadas } : {}),
      projetos,
    };
  },
});
