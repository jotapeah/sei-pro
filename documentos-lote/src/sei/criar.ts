/**
 * Criação do documento de UMA linha do lote (porta de docsLote_formNewDoc, docsLote_confirmDocData,
 * docsLote_editDocContent e docsLote_saveDoc, dist/js/sei-pro-docs-lote.js).
 *
 * 1. `criarDocumento` do núcleo: tipo do modelo por id exato, o modelo como texto inicial (documento →
 *    `txtProtocoloDocumentoTextoBase`; texto padrão → `selTextoPadrao`/`hdnIdTextoPadrao`), nome na árvore (e no
 *    Número, quando o tipo o exige), descrição, nível; observação vazia e os interessados que a tela traz.
 * 2. Uma abertura do editor do documento novo e UMA gravação (`editarSecoes`): em cada seção editável que tem `##`,
 *    só os campos cruzados são trocados pelo valor da linha, escapado (acentos mantidos). Seção sem campo cruzado
 *    não é regravada; nenhum campo cruzado no documento = nenhuma gravação.
 * 3. O link do documento no formato do Link Permanente (sem `infra_hash`).
 *
 * Se o documento nasceu e a troca falhou, o erro é `ErroDocumentoCriado` (um `ErroSei` com o mesmo código) e leva
 * o documento: o app mostra o link e não recria a linha.
 */

import { descricaoDoc, escaparValor, preencherTexto } from "@dl/modelo/campos";
import { nomeNaArvore } from "@dl/modelo/nomes";
import type { Modelo } from "@dl/sei/modelo";
import { criarDocumento, type DocumentoLocalizado } from "@nucleo/dominio/documento";
import { editarSecoes } from "@nucleo/dominio/editor";
import type { Sei } from "@nucleo/sei";
import { decodificarEntidades } from "@nucleo/sessao/dom";
import { comoErroSei, ErroSei } from "@nucleo/sessao/erros";

export interface PedidoCriar {
  /** Protocolo (ou referência aceita por `sei.arvore`) do processo de destino. */
  processo: string;
  /** Caminho até o `controlador.php` do SEI (como o `origemDoSei` do contexto), para o link do documento. */
  origem: string;
  modelo: Modelo;
  linha: Record<string, string>;
  colunaNome: string;
  /** Descrição com `##coluna##` (vazia = sem descrição). */
  modeloDescricao: string;
  nivel: "publico" | "restrito";
  hipotese?: string;
  /** campo do modelo → coluna do CSV. */
  camposCruzados: Record<string, string>;
}

export interface DocumentoCriado {
  idDocumento: string;
  numero: string;
  link: string;
}

/** O documento foi criado, mas o passo seguinte falhou: leva o documento para o app mostrar e não recriar. */
export class ErroDocumentoCriado extends ErroSei {
  readonly documentoCriado: DocumentoCriado;

  constructor(documento: DocumentoCriado, causa: ErroSei) {
    super(
      causa.codigo,
      `O documento ${documento.numero || documento.idDocumento} foi criado, mas os campos não foram preenchidos: ${causa.message}`,
      causa.detalhe,
    );
    this.name = "ErroDocumentoCriado";
    this.documentoCriado = documento;
  }
}

/** Link do documento como o Link Permanente: só o caminho até o controlador.php, sem `infra_hash`. */
export function linkDoDocumento(origem: string, idProcedimento: string, idDocumento: string): string {
  return `${origem}?acao=procedimento_trabalhar&id_procedimento=${encodeURIComponent(idProcedimento)}&id_documento=${encodeURIComponent(idDocumento)}`;
}

/** Valores por nome de campo, só dos campos cruzados cuja coluna existe na linha. */
function valoresDosCampos(camposCruzados: Record<string, string>, linha: Record<string, string>): Record<string, string> {
  const valores: Record<string, string> = {};
  for (const [campo, coluna] of Object.entries(camposCruzados)) {
    if (Object.hasOwn(linha, coluna)) valores[nomeDoCampo(campo)] = linha[coluna] as string;
  }
  return valores;
}

/** O nome como o `extrairCampos` do modelo o vê: entidades decodificadas e espaço não separável como espaço. */
const nomeDoCampo = (bruto: string) => decodificarEntidades(bruto).replace(/\u00A0/g, " ");

/**
 * Troca, no HTML de uma seção, só os `##campo##` cruzados, pelo valor escapado. O campo é casado pelo nome
 * normalizado (`##nome&nbsp;completo##` e `##munic&iacute;pio##` no HTML casam "nome completo" e "município");
 * o resto do HTML fica byte a byte como estava.
 */
function trocarCampos(html: string, valores: Record<string, string>): string {
  const daSecao: Record<string, string> = {};
  for (const m of html.matchAll(/##([^#]+?)##/g)) {
    const bruto = m[1] as string;
    const chave = nomeDoCampo(bruto);
    if (Object.hasOwn(valores, chave)) daSecao[bruto] = valores[chave] as string;
  }
  return preencherTexto(html, daSecao, escaparValor);
}

export async function criarDocumentoDaLinha(sei: Sei, p: PedidoCriar, sinal?: AbortSignal): Promise<DocumentoCriado> {
  const m = p.modelo;
  if (!m.tipoId) throw new ErroSei("ARGUMENTO_INVALIDO", "O modelo não tem o tipo do documento a criar.");
  const nome = nomeNaArvore(p.linha[p.colunaNome] ?? "");

  const r = await criarDocumento(
    sei,
    p.processo,
    {
      tipo: m.tipoNome ?? m.tipoId,
      tipoId: m.tipoId,
      nomeArvore: nome,
      numeroSeExigido: nome,
      descricao: p.modeloDescricao ? descricaoDoc(p.modeloDescricao, p.linha) : "",
      ...(m.origem === "documento" ? { documentoModelo: m.numero } : { textoPadraoId: m.id }),
      nivel: p.nivel,
      ...(p.hipotese ? { hipotese: p.hipotese } : {}),
    },
    { aplicar: true, sinal },
  );
  const idDocumento = String(r.dados?.idDocumento ?? "");
  const numero = String(r.dados?.numero ?? "");

  const arv = await sei.arvore(p.processo, { sinal }).catch(() => null);
  const documento: DocumentoCriado = {
    idDocumento,
    numero,
    link: arv && idDocumento ? linkDoDocumento(p.origem, arv.idProcedimento, idDocumento) : "",
  };
  const noNovo = arv?.documentos.find((d) => d.id === idDocumento);
  if (!arv || !noNovo) {
    throw new ErroDocumentoCriado(
      documento,
      new ErroSei("SEI_RESPOSTA_INESPERADA", "o documento novo não apareceu na árvore do processo."),
    );
  }

  const valores = valoresDosCampos(p.camposCruzados, p.linha);
  if (!Object.keys(valores).length) return documento;
  const local: DocumentoLocalizado = { arvore: arv, documento: noNovo };
  try {
    await editarSecoes(sei, local, (s) => (s.html.includes("##") ? trocarCampos(s.html, valores) : null), { aplicar: true, sinal });
  } catch (e) {
    throw new ErroDocumentoCriado(documento, comoErroSei(e));
  }
  return documento;
}
