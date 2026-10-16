/**
 * Criacao de UM processo com o formulario do tipo ja carregado (porta de procLote_criarUm,
 * procLote_montarPostData e procLote_extrairNumero, dist/js/sei-pro-proc-lote.js; createProc/extractProcId,
 * dist/js/sei-pro-docs-lote.js).
 *
 * Os valores vao como texto e quem codifica em ISO-8859-1 e o `http.enviar` do nucleo: nada de `escape()`, que
 * mandava `%u2014` e o SEI gravava o literal. A especificacao e a observacao passam antes por `paraLatin1`
 * (travessao vira hifen, aspas curvas viram retas) para o corte de 100 caracteres valer sobre o texto final.
 */

import { lerLupa } from "@nucleo/formulario/formulario";
import { parametros } from "@nucleo/links/links";
import type { Sei } from "@nucleo/sei";
import { decodificarEntidades, textoDe } from "@nucleo/sessao/dom";
import { ErroSei } from "@nucleo/sessao/erros";
import type { Pagina } from "@nucleo/sessao/http";
import { paraLatin1 } from "../modelo/latin1";
import type { Criado } from "../repositorio";
import { comCampos, type Pares } from "./campos";
import type { FormTipo } from "./formularioTipo";

export interface DadosProcesso {
  especificacao: string;
  interessado?: string;
  observacao?: string;
  nivelAcesso: "0" | "1";
  hipoteseLegal: string;
}

/** Prova de sucesso: o SEI so redireciona para a tela do processo quando o criou. */
export const PROVA_CRIACAO = "controlador.php?acao=procedimento_trabalhar&acao_origem=procedimento_gerar";

export const AVISO_INTERESSADO = "interessado ignorado";

/**
 * O interessado da linha so vale se for um nome EXATO que ja esta na lupa do formulario (e entao ja vai no
 * `hdnInteressados`). Qualquer outro nome exigiria o autocompletar de contatos (segunda etapa): a linha segue
 * sem ele, com aviso.
 */
function interessadoAceito(form: FormTipo, interessado: string | undefined): boolean {
  const nome = (interessado ?? "").trim();
  if (!nome) return true;
  const nomes = lerLupa(form.interessados).map((i) => i.texto.replaceAll("+", " "));
  return nomes.includes(nome) || nomes.includes(paraLatin1(nome));
}

export function montarCampos(form: FormTipo, p: DadosProcesso): Pares {
  return comCampos(form.params, [
    ["rdoNivelAcesso", p.nivelAcesso],
    ["selHipoteseLegal", p.nivelAcesso === "1" ? p.hipoteseLegal : ""],
    ["hdnFlagProcedimentoCadastro", "2"],
    ["rdoProtocolo", "M"],
    ["txaObservacoes", paraLatin1(p.observacao ?? "")],
    ["txtDescricao", paraLatin1(p.especificacao).slice(0, 100).trim()],
    ["hdnAssuntos", form.assuntos],
    ["hdnInteressados", form.interessados],
  ]);
}

/**
 * O protocolo formatado vem no `<title>` da resposta do proprio POST (sem requisicao extra). Regex na string
 * CRUA: ultimo trecho depois de " - "; "Processo" sozinho nao e numero.
 */
export function numeroDoTitulo(html: string): string {
  const titulo = decodificarEntidades(/<title>([\s\S]*?)<\/title>/i.exec(html)?.[1] ?? "");
  const numero = (titulo.split(" - ").pop() ?? "").trim();
  return numero && numero.toLowerCase() !== "processo" ? numero : "";
}

/** id do processo criado: o `src` do `#ifrArvore` (como o legado), ou a propria URL final. */
function idDoProcesso(resposta: Pagina): string {
  const arvore = resposta.doc.querySelector("#ifrArvore")?.getAttribute("src");
  const doIframe = arvore ? parametros(decodificarEntidades(arvore)).get("id_procedimento") : null;
  return doIframe ?? parametros(resposta.url).get("id_procedimento") ?? "";
}

export async function criarProcesso(sei: Sei, form: FormTipo, p: DadosProcesso): Promise<Criado & { aviso?: string }> {
  const aceito = interessadoAceito(form, p.interessado);
  const resposta = await sei.http.enviar(form.action, montarCampos(form, p));
  if (!resposta.url.includes(PROVA_CRIACAO)) {
    throw new ErroSei(
      "SEI_RESPOSTA_INESPERADA",
      "O SEI n\u00E3o confirmou a cria\u00E7\u00E3o do processo.",
      `${textoDe(resposta.doc.querySelector("title"))} \u2014 ${resposta.url.replace(/infra_hash=\w+/, "infra_hash=\u2026")}`,
    );
  }
  const id = idDoProcesso(resposta);
  if (!id) throw new ErroSei("SEI_RESPOSTA_INESPERADA", "Processo criado, mas o SEI n\u00E3o devolveu o identificador.");
  const criado: Criado & { aviso?: string } = {
    numero: numeroDoTitulo(resposta.html),
    idProcedimento: id,
    // Entrada no processo sem assinatura: a unica que o SEI aceita (links.ts). Um link assinado guardado no
    // lote valeria so nesta sessao, e hash invalido desloga.
    url: sei.http.absoluta(`controlador.php?acao=procedimento_trabalhar&id_procedimento=${id}`),
  };
  if (!aceito) criado.aviso = AVISO_INTERESSADO;
  return criado;
}
