/**
 * documento_baixar: o documento do SEI vira arquivo na pasta Downloads.
 *
 * Existe para o conector que roda na máquina do usuário e só lê do disco
 * (anexar o contrato num sistema, por exemplo): o modelo não carrega bytes
 * nos argumentos, então recebe um CAMINHO e o repassa em `mcp_chamar`.
 *
 * É `escrita` — só roda dentro de plano aprovado, com o cartão mostrando o
 * documento e o destino, e plano não tem "permitir sempre". O motivo: o
 * arquivo sai do SEI para o disco com os dados pessoais reais, sem máscara.
 *
 * Só documento EXTERNO (o anexo original: PDF, planilha, imagem). Documento
 * escrito no editor do SEI precisaria virar PDF, e a extensão não tem hoje um
 * gerador de PDF que o agente possa chamar: a recusa é explícita.
 *
 * Fábrica, e não entrada de `TOOLS_SEI`, porque gravar no disco depende do
 * `chrome.downloads` do painel — que os testes trocam.
 */

import { s } from "../motor/esquema";
import { definirTool, type ContextoTool, type DefTool } from "../motor/tools";
import type { PreviaItem } from "../motor/tipos";
import type { Baixado } from "../painel/baixados";

export interface OpcoesBaixar {
  /** Grava na pasta Downloads e devolve o caminho absoluto que o navegador deu. */
  salvar(a: { destino: string; bytes: Uint8Array; tipo: string }): Promise<{ id: number; caminho: string; tamanho: number; tipo: string }>;
  /** Anota o arquivo, para a limpeza e para o caminho passar intacto ao conector. */
  registrar(b: Baixado): Promise<void>;
  agora?(): number;
}

const MAX_NOME = 120;

const POR_TIPO: Record<string, string> = {
  "application/pdf": "pdf",
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/gif": "gif",
  "image/tiff": "tif",
  "text/plain": "txt",
  "text/csv": "csv",
  "application/zip": "zip",
  "application/msword": "doc",
  "application/vnd.ms-excel": "xls",
  "application/vnd.ms-powerpoint": "ppt",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "docx",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": "xlsx",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation": "pptx",
  "application/vnd.oasis.opendocument.text": "odt",
  "application/vnd.oasis.opendocument.spreadsheet": "ods",
};

/** Um pedaço de caminho que qualquer sistema aceita e que não fica oculto. */
function pedacoSeguro(texto: string): string {
  return texto
    .normalize("NFC")
    .replace(/[\u0000-\u001f\u007f\/\\:*?"<>|]+/g, "-")
    .replace(/\s+/g, " ")
    .replace(/^[.\s-]+/, "")
    .replace(/[.\s]+$/, "");
}

/**
 * Nome do arquivo: título do documento, nº SEI e extensão.
 *
 * Sem barra nem dois-pontos, sem ponto no início (arquivo oculto, que o
 * conector recusa), até 120 caracteres e SEMPRE com extensão. O nº SEI vai no
 * nome porque um processo costuma ter vários "Anexo": sem ele, um
 * sobrescreveria o outro.
 */
export function nomeDeArquivo(d: { titulo: string; numero: string; nomeOriginal: string; tipo: string }): string {
  const doOriginal = /\.([A-Za-z0-9]{1,8})$/.exec(d.nomeOriginal.trim())?.[1]?.toLowerCase();
  const extensao = doOriginal ?? POR_TIPO[d.tipo.toLowerCase().split(";")[0].trim()] ?? "bin";
  const fim = ` (${d.numero.replace(/\D/g, "") || "sem numero"}).${extensao}`;
  const base = pedacoSeguro(d.titulo).slice(0, MAX_NOME - fim.length).trimEnd() || "documento";
  return `${base}${fim}`;
}

/** Caminho relativo à pasta Downloads: "SEI Pro/<processo sem barras>/<nome>". */
export function destinoDoArquivo(processo: string, nome: string): string {
  return `SEI Pro/${pedacoSeguro(processo) || "processo"}/${nome}`;
}

interface Meta {
  numero: string;
  titulo: string;
  formato?: string;
  nivel?: string;
  processo: string;
  baixavel?: boolean;
}

const NATIVO = (numero: string) =>
  `O documento ${numero} foi escrito no editor do SEI, e o agente ainda não sabe gerar o PDF dele. Só documento externo (o arquivo anexado: PDF, planilha, imagem) pode ser baixado. Se precisar deste, peça ao usuário para gerar o PDF no SEI.`;

function base64ParaBytes(b64: string): Uint8Array {
  const bruto = atob(b64);
  const bytes = new Uint8Array(bruto.length);
  for (let i = 0; i < bruto.length; i += 1) bytes[i] = bruto.charCodeAt(i);
  return bytes;
}

export function toolsBaixar(o: OpcoesBaixar): DefTool[] {
  const baixar = definirTool({
    nome: "documento_baixar",
    descricao:
      "Baixa um documento do SEI para a pasta Downloads do usuário e devolve o caminho do arquivo. Use quando um conector precisar do arquivo em disco. Só documento externo (PDF e outros anexos); documento escrito no editor do SEI ainda não. O usuário aprova cada download. Passe o 'caminho' devolvido ao conector exatamente como veio.",
    parametros: s.objeto({ documento: s.texto({ descricao: "Nº SEI do documento." }) }),
    efeito: "escrita",
    rotulo: (a) => `Baixar o documento ${String(a.documento)} para o computador`,
    previsualizar: async (a, ctx: ContextoTool): Promise<PreviaItem[]> => {
      const m = await ctx.sei<Meta>("documento.baixar", { numero: String(a.documento), somenteMetadados: true });
      const alvo = `${m.titulo} (SEI ${m.numero})`;
      if (!m.baixavel) return [{ alvo, mudancas: [], resumo: "", erro: NATIVO(m.numero) }];
      // A extensão exata só se sabe ao baixar; o formato da árvore é a melhor pista antes disso.
      const pista = /^[a-z0-9]{1,8}$/i.test(m.formato ?? "") ? `x.${m.formato}` : "";
      const nome = nomeDeArquivo({ titulo: m.titulo, numero: m.numero, nomeOriginal: pista, tipo: "application/pdf" });
      return [
        {
          alvo,
          resumo: "Salvar uma cópia no computador",
          mudancas: [
            { campo: "Salvar em", antes: "", depois: `Downloads/${destinoDoArquivo(m.processo, nome)}` },
            ...(m.nivel && m.nivel !== "publico" ? [{ campo: "Nível de acesso no SEI", antes: "", depois: m.nivel }] : []),
            { campo: "Atenção", antes: "", depois: "a cópia sai do SEI com os dados pessoais reais, sem máscara, e fica no seu computador até você apagar" },
          ],
        },
      ];
    },
    executar: async (a, ctx: ContextoTool) => {
      const r = await ctx.sei<Meta & { arquivo: { base64: string; tipo: string; nome: string; tamanho: number } }>("documento.baixar", { numero: String(a.documento) });
      const nome = nomeDeArquivo({ titulo: r.titulo, numero: r.numero, nomeOriginal: r.arquivo.nome ?? "", tipo: r.arquivo.tipo ?? "" });
      const salvo = await o.salvar({ destino: destinoDoArquivo(r.processo, nome), bytes: base64ParaBytes(r.arquivo.base64), tipo: r.arquivo.tipo || "application/octet-stream" });
      await o.registrar({ id: salvo.id, caminho: salvo.caminho, nome, processo: r.processo, documento: r.numero, tamanho: salvo.tamanho, quando: (o.agora ?? Date.now)() });
      return {
        aplicado: true,
        documento: r.numero,
        titulo: r.titulo,
        processo: r.processo,
        caminho: salvo.caminho,
        tamanho: salvo.tamanho,
        tipo: salvo.tipo,
        como_usar: "Passe 'caminho' ao conector exatamente como está aqui.",
      };
    },
  });
  return [baixar];
}
