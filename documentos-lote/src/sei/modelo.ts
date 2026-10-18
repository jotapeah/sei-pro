/**
 * Modelo do lote: um documento da árvore ou um Texto Padrão da unidade (porta de docsLote_docAnalysis e
 * docsLote_fillModelAnalysis, dist/js/sei-pro-docs-lote.js; txtPadrao_getList, dist/js/sei-pro.js).
 *
 * Ler o modelo é SÓ LEITURA. Os campos do documento vêm da visualização (`documento_visualizar`, todas as seções
 * já montadas, como o legado), nunca do editor: abrir o editor de um documento assinado cancela a assinatura. O
 * tipo vem da tela "Alterar Documento" (`hdnIdSerie`, id exato), que só é aberta, não enviada.
 */

import { extrairCampos } from "@dl/modelo/campos";
import { MAX_TEXTO_PREVIA } from "@dl/modelo/constantes";
import { lerConteudo, localizarDocumento, tipoDoDocumento, tiposDocumento } from "@nucleo/dominio/documento";
import { textoDoHtml } from "@nucleo/dominio/editor";
import type { Sei } from "@nucleo/sei";
import { decodificarEntidades, textoDe } from "@nucleo/sessao/dom";
import { ErroSei } from "@nucleo/sessao/erros";
import type { OpcoesHttp } from "@nucleo/sessao/http";

/**
 * `texto` é o corpo do modelo em texto simples (até MAX_TEXTO_PREVIA caracteres), só para a prévia do app: a
 * criação copia o modelo pelo próprio SEI e não o usa. O app o tira antes de guardar o lote e de pedir `criar`.
 */
export type Modelo =
  | { origem: "documento"; numero: string; titulo: string; tipoId: string; tipoNome: string; campos: string[]; texto?: string }
  | { origem: "texto-padrao"; id: string; nome: string; tipoId?: string; tipoNome?: string; campos: string[]; texto?: string };

export interface ModelosDisponiveis {
  documentos: Array<{ numero: string; titulo: string }>;
  textosPadrao: Array<{ id: string; nome: string }>;
  tipos: Array<{ id: string; nome: string }>;
}

interface TextoPadraoListado {
  id: string;
  nome: string;
  consultar: string;
}

/** Textos "[_..." são dados internos do SEI Pro (favoritos, projetos, distribuição): não são modelo (legado). */
const INTERNO_SEI_PRO = /^\[_/;

/** Lista de Textos Padrão da unidade (primeira página, como o legado): id, nome e link de consultar. */
async function textosPadraoDaUnidade(sei: Sei, op?: OpcoesHttp): Promise<TextoPadraoListado[]> {
  const p = await sei.http.obter(sei.linkMenu("texto_padrao_interno_listar"), op);
  const lista: TextoPadraoListado[] = [];
  for (const tr of p.doc.querySelectorAll("table.infraTable tr")) {
    const caixa = tr.querySelector('input[type="checkbox"]');
    const id = caixa?.getAttribute("value") ?? "";
    const consultar = (tr.querySelector('a[href*="acao=texto_padrao_interno_consultar"]')?.getAttribute("href") ?? "").replace(
      /&amp;/g,
      "&",
    );
    // Coluna 3 (Nome), sem a coluna que as Anotações no controle acrescentam; na falta, o title da caixa.
    const tds = [...tr.querySelectorAll("td")].filter((td) => !td.classList.contains("spro-anotacao-coluna"));
    const nome = (tds[2] ? textoDe(tds[2]) : "") || (caixa?.getAttribute("title") ?? "").trim();
    if (!id || !nome || !consultar || INTERNO_SEI_PRO.test(nome)) continue;
    lista.push({ id, nome, consultar });
  }
  return lista;
}

/** O que pode ser modelo no processo `ref`: documentos internos da árvore, textos padrão e tipos de documento. */
export async function listarModelos(sei: Sei, ref: string, sinal?: AbortSignal): Promise<ModelosDisponiveis> {
  const arv = await sei.arvore(ref, { sinal });
  if (arv.nivel === "sigiloso") throw new ErroSei("SEI_SIGILOSO", "Processo sigiloso: o Documentos em Lote não atua nele.");
  const documentos = arv.documentos
    .filter((d) => !d.externo && !d.cancelado && d.nivel !== "sigiloso" && d.numero)
    .map((d) => ({ numero: d.numero, titulo: d.titulo }));
  const textosPadrao = (await textosPadraoDaUnidade(sei, { sinal })).map(({ id, nome }) => ({ id, nome }));
  const tipos = (await tiposDocumento(sei, ref, sinal)).filter((t) => t.id !== "-1");
  return { documentos, textosPadrao, tipos };
}

/**
 * Campos do HTML com as entidades decodificadas antes: a visualização do SEI escreve os acentos como entidade
 * (`##munic&iacute;pio##`), e o campo é o nome que o usuário digitou ("município"), o mesmo do cabeçalho do CSV.
 * Decodificar antes também desfaz `&#237;`, cujo `#` quebraria o `##…##`.
 */
const camposDoHtml = (html: string) => extrairCampos(decodificarEntidades(html));

/** O corpo em texto simples para a prévia (parágrafos em linhas), cortado em MAX_TEXTO_PREVIA. */
const textoDaPrevia = (html: string) => textoDoHtml(html).slice(0, MAX_TEXTO_PREVIA);

/** Só o corpo da página (o legado também cortava entre `<body>` e `</body>`): `##` no `<title>` não é campo. */
function corpoDa(html: string): string {
  const ini = html.search(/<body[\s>]/i);
  const fim = html.toLowerCase().lastIndexOf("</body>");
  return html.slice(ini >= 0 ? ini : 0, fim > ini ? fim : html.length);
}

export type EscolhaModelo = { documento: string } | { textoPadrao: string; tipoId: string; tipoNome?: string };

/**
 * Lê o modelo escolhido. Documento: tipo por `tipoDoDocumento` (id exato) e campos de todas as seções da
 * visualização. Texto Padrão: o conteúdo da consulta e o `tipoId` que o usuário escolheu (obrigatório, como no
 * legado: o texto padrão não tem tipo).
 */
export async function lerModelo(sei: Sei, escolha: EscolhaModelo, sinal?: AbortSignal): Promise<Modelo> {
  if ("textoPadrao" in escolha) {
    const tipoId = escolha.tipoId.trim();
    if (!tipoId) throw new ErroSei("ARGUMENTO_INVALIDO", "Escolha o tipo do documento a criar a partir do Texto Padrão.");
    const tp = (await textosPadraoDaUnidade(sei, { sinal })).find((t) => t.id === escolha.textoPadrao);
    if (!tp) throw new ErroSei("SEI_NAO_ENCONTRADO", `O Texto Padrão (id ${escolha.textoPadrao}) não está na lista da unidade.`);
    const consulta = await sei.http.obter(tp.consultar, { sinal });
    const conteudo = consulta.doc.querySelector('textarea[name="txaConteudo"], #txaConteudo')?.textContent ?? "";
    return {
      origem: "texto-padrao",
      id: tp.id,
      nome: tp.nome,
      tipoId,
      ...(escolha.tipoNome ? { tipoNome: escolha.tipoNome } : {}),
      campos: camposDoHtml(conteudo),
      // O HTML do texto padrão vem dentro do <textarea>: conforme o parser, ainda com as entidades (&lt;p&gt;).
      texto: textoDaPrevia(decodificarEntidades(conteudo)),
    };
  }

  const loc = await localizarDocumento(sei, escolha.documento, { sinal });
  if (loc.documento.externo) {
    throw new ErroSei("ARGUMENTO_INVALIDO", `O documento ${loc.documento.numero} é um anexo: só documento gerado no SEI serve de modelo.`);
  }
  // lerConteudo recusa sigiloso antes de baixar qualquer byte.
  const conteudo = await lerConteudo(sei, loc, { sinal });
  const html = conteudo.forma === "html" ? conteudo.html : "";
  const tipo = await tipoDoDocumento(sei, loc.documento.numero, sinal);
  return {
    origem: "documento",
    numero: loc.documento.numero,
    titulo: loc.documento.titulo,
    tipoId: tipo.id,
    tipoNome: tipo.nome,
    campos: camposDoHtml(corpoDa(html)),
    texto: textoDaPrevia(corpoDa(html)),
  };
}
