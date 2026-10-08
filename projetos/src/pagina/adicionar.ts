/**
 * O que os balões da caixa e da árvore gravam (spec 3.3): "Adicionar a um
 * projeto" (nova etapa com o processo, ligar o processo a uma etapa ou
 * fazê-lo o processo do projeto) e "Concluir com documento…" (só etapa ainda
 * aberta: concluir de novo trocaria a data). Tudo passa pelo repositório, que
 * valida e anota o histórico; erro de validação volta com a mensagem dele.
 * Quem chama passa os repositórios com o "Entendi" da unidade (`comConsentimento`):
 * a pergunta vem antes da primeira gravação em "Toda a unidade".
 */

import { dataDeFormulario } from "../app/formato";
import { fimPorDuracao, MAX_DIAS_UTEIS } from "../modelo/calendario";
import { LIMITES } from "../modelo/constantes";
import type { DataISO, DocumentoSei, Vinculo, Vis } from "../modelo/tipos";
import { ErroValidacao } from "../modelo/validacao";
import { chaveProtocolo, RE_ID_PROCEDIMENTO, RE_PROTOCOLO } from "../modelo/vinculos";
import type { RepositorioProjetos } from "../repositorio";

export type ComoAdicionar = "etapa" | "ligar" | "projeto";

export interface PedidoAdicionar {
  vis: Vis;
  projeto: string;
  como: ComoAdicionar;
  /** O processo da tela (caixa: a linha; árvore: o nó do processo). */
  processo: Vinculo;
  /** Nova etapa. */
  nome?: string;
  inicio?: string;
  duracao?: number;
  /** Ligar a uma etapa. */
  etapa?: string;
}

type Repos = Readonly<Record<Vis, RepositorioProjetos>>;

/**
 * O vínculo do processo da tela na forma que os colegas aceitam (`RE_PROTOCOLO`: letras, dígitos e `./-`, como o
 * SEI-RJ; com ao menos um dígito), o id só com dígitos e a marca de sigilo da tela. Fora da forma: a mensagem.
 */
function vinculoDaTela(p: Vinculo): Vinculo {
  const protocolo = typeof p.protocolo === "string" ? p.protocolo.trim() : "";
  if (!RE_PROTOCOLO.test(protocolo) || !chaveProtocolo(protocolo))
    throw new ErroValidacao(["Não foi possível ler o número deste processo na tela do SEI."]);
  const v: Vinculo = { protocolo };
  if (typeof p.idProcedimento === "string" && RE_ID_PROCEDIMENTO.test(p.idProcedimento)) v.idProcedimento = p.idProcedimento;
  if (p.sigiloso === true) v.sigiloso = true;
  return v;
}

/** Grava e devolve a frase de sucesso. */
export async function adicionarAoProjeto(repos: Repos, p: PedidoAdicionar, hoje: DataISO): Promise<string> {
  const processo = vinculoDaTela(p.processo);
  const repo = repos[p.vis];
  const projeto = await repo.obterProjeto(p.projeto);
  if (!projeto) throw new ErroValidacao(["O projeto não existe mais."]);
  if (p.como === "projeto") {
    await repo.editarProjeto(projeto.id, { processo });
    return `Este é agora o processo do projeto “${projeto.nome}”.`;
  }
  if (p.como === "ligar") {
    const e = p.etapa ? await repo.obterEtapa(p.etapa) : undefined;
    if (!e || e.projeto !== projeto.id) throw new ErroValidacao(["Escolha a etapa."]);
    if (e.concluidaEm) throw new ErroValidacao(["Esta etapa já foi concluída."]);
    await repo.editarEtapa(e.id, { processo }, hoje);
    return `Processo ligado à etapa “${e.nome}”.`;
  }
  const nome = (p.nome ?? "").trim();
  if (!nome) throw new ErroValidacao(["Informe o nome da etapa."]);
  const inicio = dataDeFormulario(p.inicio ?? "");
  if (!inicio) throw new ErroValidacao(["Escolha a data de início (entre 2000 e 2100)."]);
  const n = Number(p.duracao);
  if (!Number.isInteger(n) || n < 1 || n > MAX_DIAS_UTEIS) throw new ErroValidacao([`A duração vai de 1 a ${MAX_DIAS_UTEIS} dias úteis.`]);
  const e = await repo.criarEtapa({ projeto: projeto.id, nome, inicio, fim: fimPorDuracao(inicio, n), processo });
  return `Etapa “${e.nome}” adicionada a “${projeto.nome}”.`;
}

/**
 * "Concluir com documento…": a data e o documento da árvore, pela regra da P4 (número vazio ou de 1 a 20 dígitos,
 * `problemasDoDocumento` no repositório); só a etapa ainda aberta (`concluirSeAberta`: a concluída por outra tela
 * fica com a data dela).
 */
export async function concluirComDocumento(
  repos: Repos,
  vis: Vis,
  etapa: string,
  documento: DocumentoSei | undefined,
  data: string,
): Promise<string> {
  const quando = dataDeFormulario(data);
  if (!quando) throw new ErroValidacao(["Escolha a data da conclusão (entre 2000 e 2100)."]);
  let doc: DocumentoSei | undefined;
  if (documento?.numero) {
    doc = { numero: documento.numero.trim() };
    const titulo = documento.titulo?.trim().slice(0, LIMITES.nome);
    if (titulo) doc.titulo = titulo;
  }
  const e = await repos[vis].concluirSeAberta(etapa, quando, doc);
  if (!e) throw new ErroValidacao(["Esta etapa já foi concluída (ou não existe mais)."]);
  return `“${e.nome}” ${e.marco ? "cumprido" : "concluída"} em ${quando.split("-").reverse().join("/")}.`;
}
