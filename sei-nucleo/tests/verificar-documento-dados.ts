/**
 * Alterar dados do documento: interessados, assuntos e observação, e a
 * pesquisa de contatos e assuntos pelo autocompletar da própria tela.
 *
 * Tela real do SEI 4.1.5 (`sei41/despacho_alterar.html`, SEI SP Treinamento)
 * servida por um servidor falso por baixo do transporte de verdade.
 *
 * PENDENTE: prova no SEI 5.0.4 com `sei5/documento_alterar.html`, que será
 * capturada no SEI MJ de homologação (Tarefa 13). Nenhuma fixture do 5 foi
 * inventada aqui.
 */

import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { alterarDocumento, pesquisarAssuntos, pesquisarContatos } from "../src/dominio/documento";
import { aplicarModo, linkAutoCompletar } from "../src/dominio/lupas";
import type { Arvore, DocumentoArvore } from "../src/dominio/arvore";
import { lerLupa } from "../src/formulario/formulario";
import { Sei } from "../src/sei";
import { checar, fixture, lanca, secao } from "./util";

const AQUI = dirname(fileURLToPath(import.meta.url));
const bruto = (n: string) => readFileSync(join(AQUI, "fixtures", n), "utf8");
const urlDe = (n: string) => /^<!-- url: (.*?) -->/.exec(bruto(n))?.[1] ?? "";
const htmlDe = (n: string) => bruto(n).replace(/^<!-- url: .*? -->\n/, "");

const TELA = "sei41/despacho_alterar.html";
const LINK_ALTERAR = urlDe(TELA);

interface Post {
  url: string;
  pares: Array<[string, string]>;
}

function lerCorpo(corpo: string): Array<[string, string]> {
  const dec = (s: string) => s.replace(/\+/g, " ").replace(/%([0-9A-F]{2})/gi, (_, h: string) => String.fromCharCode(Number.parseInt(h, 16)));
  return corpo
    ? corpo.split("&").map((p) => {
        const i = p.indexOf("=");
        return [dec(p.slice(0, i)), dec(p.slice(i + 1))] as [string, string];
      })
    : [];
}

const XML_CONTATOS =
  '<?xml version="1.0" encoding="iso-8859-1"?><itens><item id="200001" descricao="Fulano de Tal" complemento=""></item><item id="200002" descricao="Fulana Silva" complemento=""></item></itens>';
const XML_ASSUNTOS =
  '<?xml version="1.0" encoding="iso-8859-1"?><itens><item id="300001" descricao="01.01 - Organiza&#231;&#227;o" complemento=""></item></itens>';

function montar(o: { sigiloso?: boolean } = {}) {
  const estado = { posts: [] as Post[], gets: [] as string[] };
  const resp = (url: string, html: string) => {
    const bytes = new Uint8Array([...html].map((c) => c.charCodeAt(0) & 0xff));
    return { url, status: 200, arrayBuffer: async () => bytes.buffer } as unknown as Response;
  };
  const fetch = (async (u: string, init?: RequestInit) => {
    if (init?.method !== "POST") {
      estado.gets.push(u);
      if (/acao=documento_alterar/.test(u)) return resp(u, htmlDe(TELA));
      return resp(u, "<html><body>?</body></html>");
    }
    const pares = lerCorpo(String(init.body ?? ""));
    estado.posts.push({ url: u, pares });
    if (/acao_ajax=contato_auto_completar/.test(u)) return resp(u, XML_CONTATOS);
    if (/acao_ajax=assunto_auto_completar/.test(u)) return resp(u, XML_ASSUNTOS);
    // Gravação: o SEI volta para a árvore.
    return resp(u.replace(/acao=documento_alterar/, "acao=arvore_visualizar"), "<html><body>ok</body></html>");
  }) as unknown as typeof globalThis.fetch;

  const sei = new Sei(LINK_ALTERAR, null, { fetch });
  const documento: DocumentoArvore = {
    id: "160173",
    numero: "0104100",
    titulo: "Despacho",
    pasta: null,
    externo: false,
    formato: "interno",
    nivel: o.sigiloso ? "sigiloso" : "publico",
    assinado: false,
    assinaturas: [],
    cancelado: false,
    link: "",
    src: "",
    acoes: [LINK_ALTERAR],
    botoes: [],
  };
  const arvore = { idProcedimento: "148265", protocolo: "99906.000001/2026-01", nivel: "publico", documentos: [documento] } as unknown as Arvore;
  Object.assign(sei, {
    localizar: async () => ({ idProcedimento: "148265", idDocumento: "160173", linkArvore: "" }),
    arvore: async () => arvore,
  });
  return { sei, estado };
}

const ESCRITA_PREVIA = { aplicar: false } as const;
const valorPost = (p: Post | undefined, nome: string) => p?.pares.find(([n]) => n === nome)?.[1];

export async function verificarDocumentoDados(): Promise<void> {
  secao("documento: links de autocompletar colhidos da tela (4.1)");
  const html = fixture(TELA).html;
  const lContato = linkAutoCompletar(html, "hdnIdInteressado");
  const lAssunto = linkAutoCompletar(html, "hdnIdAssunto");
  checar(
    "contato: link do interessado",
    !!lContato && lContato.startsWith("controlador_ajax.php?acao_ajax=contato_auto_completar_contexto_RI1225&") && lContato.includes("&infra_hash="),
    lContato,
  );
  checar("assunto: link do assunto", !!lAssunto && lAssunto.startsWith("controlador_ajax.php?acao_ajax=assunto_auto_completar_RI1223&"), lAssunto);
  checar("campo inexistente: null", linkAutoCompletar(html, "hdnIdNada") === null);
  const lExterno = linkAutoCompletar(fixture("sei41/pdf_alterar.html").html, "hdnIdInteressado");
  checar("documento externo tambem tem o autocompletar", !!lExterno && lExterno.includes("contato_auto_completar"), lExterno);

  secao("documento: modos da lista");
  const a = { id: "1", texto: "A" };
  const b = { id: "2", texto: "B" };
  const c = { id: "3", texto: "C" };
  checar("acrescentar sem duplicar", JSON.stringify(aplicarModo([a, b], "acrescentar", [b, c])) === JSON.stringify([a, b, c]));
  checar("remover por id", JSON.stringify(aplicarModo([a, b, c], "remover", [{ id: "2", texto: "outro nome" }])) === JSON.stringify([a, c]));
  checar("substituir troca tudo (sem duplicar)", JSON.stringify(aplicarModo([a, b], "substituir", [c, c])) === JSON.stringify([c]));
  checar("id comparado por igualdade exata", aplicarModo([{ id: "12", texto: "x" }], "remover", [{ id: "1", texto: "y" }]).length === 1);

  secao("documento: interessados (fixture com CGE-CAUD e Cliente 1)");
  {
    const { sei, estado } = montar();
    const novo = { id: "200001", texto: "Fulano de Tal" };
    const r = await alterarDocumento(sei, "0104100", { interessados: { modo: "acrescentar", itens: [{ id: "100014318", texto: "Cliente 1" }, novo] } }, ESCRITA_PREVIA);
    const m = r.mudancas.find((x) => x.campo === "Interessados");
    checar("previa: antes e depois dos interessados", m?.antes === "CGE-CAUD; Cliente 1" && m.depois === "CGE-CAUD; Cliente 1; Fulano de Tal", m);
    checar("previa nao envia", estado.posts.length === 0 && !r.aplicado, estado.posts);
  }
  {
    const { sei, estado } = montar();
    const novo = { id: "200001", texto: "Fulano de Tal" };
    const r = await alterarDocumento(sei, "0104100", { interessados: { modo: "acrescentar", itens: [novo] } }, { aplicar: true });
    const post = estado.posts[0];
    const itens = lerLupa(valorPost(post, "hdnInteressados") ?? "");
    checar("gravacao: acrescenta mantendo os antigos", r.aplicado && itens.map((i) => i.id).join(",") === "100013362,100014318,200001", itens);
    checar("gravacao: flag de cadastro 2", valorPost(post, "hdnFlagDocumentoCadastro") === "2");
  }
  {
    const { sei, estado } = montar();
    await alterarDocumento(sei, "0104100", { interessados: { modo: "remover", itens: [{ id: "100013362", texto: "" }] } }, { aplicar: true });
    const itens = lerLupa(valorPost(estado.posts[0], "hdnInteressados") ?? "");
    checar("remover tira por id", itens.length === 1 && itens[0].id === "100014318", itens);
  }
  {
    const { sei, estado } = montar();
    await alterarDocumento(sei, "0104100", { interessados: { modo: "substituir", itens: [{ id: "200002", texto: "Fulana Silva" }] } }, { aplicar: true });
    const itens = lerLupa(valorPost(estado.posts[0], "hdnInteressados") ?? "");
    checar("substituir troca a lista inteira", itens.length === 1 && itens[0].id === "200002" && itens[0].texto === "Fulana Silva", itens);
  }
  {
    const { sei, estado } = montar();
    const r = await alterarDocumento(sei, "0104100", { interessados: { modo: "remover", itens: [{ id: "999", texto: "" }] } }, { aplicar: true });
    checar("remover quem nao esta: nada a alterar, sem envio", r.mudancas.length === 0 && estado.posts.length === 0 && !r.aplicado, r);
  }

  secao("documento: assuntos e observacao");
  {
    const { sei, estado } = montar();
    const assunto = { id: "300001", texto: "01.01 - Organização" };
    const r = await alterarDocumento(
      sei,
      "0104100",
      { assuntos: { modo: "acrescentar", itens: [assunto] }, interessados: { modo: "substituir", itens: [{ id: "200002", texto: "Fulana Silva" }] } },
      ESCRITA_PREVIA,
    );
    const mA = r.mudancas.find((x) => x.campo === "Assuntos");
    const mI = r.mudancas.find((x) => x.campo === "Interessados");
    checar("previa: antes e depois dos assuntos", mA?.antes === "" && mA.depois === assunto.texto, mA);
    checar("previa: antes e depois dos interessados", mI?.antes === "CGE-CAUD; Cliente 1" && mI.depois === "Fulana Silva", mI);
    checar("previa com as duas listas nao envia", estado.posts.length === 0);
  }
  {
    const { sei, estado } = montar();
    const assunto = { id: "300001", texto: "01.01 - Organização" };
    await alterarDocumento(sei, "0104100", { assuntos: { modo: "acrescentar", itens: [assunto] } }, { aplicar: true });
    const itens = lerLupa(valorPost(estado.posts[0], "hdnAssuntos") ?? "");
    checar("gravacao: assunto no hdnAssuntos", itens.length === 1 && itens[0].id === "300001", itens);
  }
  {
    const { sei, estado } = montar();
    const r = await alterarDocumento(sei, "0104100", { observacao: "" }, { aplicar: true });
    checar("observacao vazia (ja vazia na tela) nao gera mudanca", r.mudancas.length === 0 && estado.posts.length === 0, r);
  }
  {
    const { sei, estado } = montar();
    const r = await alterarDocumento(sei, "0104100", { observacao: "Conferido pela unidade" }, { aplicar: true });
    checar("observacao preenchida gera mudanca", r.mudancas.some((x) => x.campo.startsWith("Observa") && x.depois === "Conferido pela unidade"), r.mudancas);
    checar("observacao vai no txaObservacoes", valorPost(estado.posts[0], "txaObservacoes") === "Conferido pela unidade");
  }
  {
    const { sei, estado } = montar();
    const r = await alterarDocumento(sei, "0104100", { descricao: "Nova descricao" }, { aplicar: true });
    const post = estado.posts[0];
    checar("descricao continua como antes", r.aplicado && valorPost(post, "txtDescricao") === "Nova descricao");
    checar("sem tocar nas listas, os interessados da tela seguem no POST", lerLupa(valorPost(post, "hdnInteressados") ?? "").length === 2);
  }
  {
    const { sei, estado } = montar({ sigiloso: true });
    const e = await lanca(() => alterarDocumento(sei, "0104100", { observacao: "x" }, { aplicar: true }));
    checar("sigiloso continua recusado", e?.codigo === "SEI_SIGILOSO" && estado.gets.length === 0, e);
  }

  secao("documento: pesquisa de contatos e assuntos");
  {
    const { sei, estado } = montar();
    const contatos = await pesquisarContatos(sei, "0104100", "fulan");
    const ajax = estado.posts.find((p) => p.url.includes("controlador_ajax.php"));
    checar("contatos pelo autocompletar da tela", contatos.length === 2 && contatos[0].id === "200001" && contatos[0].texto === "Fulano de Tal", contatos);
    checar("link colhido e nao montado", !!ajax && ajax.url.includes("acao_ajax=contato_auto_completar_contexto_RI1225") && ajax.url.includes("infra_hash="), ajax?.url);
    checar("parametro palavras_pesquisa", valorPost(ajax, "palavras_pesquisa") === "fulan", ajax?.pares);
  }
  {
    const { sei, estado } = montar();
    const assuntos = await pesquisarAssuntos(sei, "0104100", "organiza");
    const ajax = estado.posts.find((p) => p.url.includes("controlador_ajax.php"));
    checar("assuntos pelo autocompletar da tela", assuntos.length === 1 && assuntos[0].texto === "01.01 - Organização", assuntos);
    checar("assunto: acao do autocompletar de assunto", !!ajax && ajax.url.includes("acao_ajax=assunto_auto_completar_RI1223") && valorPost(ajax, "palavras_pesquisa") === "organiza", ajax);
  }
  {
    const { sei } = montar({ sigiloso: true });
    const e = await lanca(() => pesquisarContatos(sei, "0104100", "x"));
    checar("pesquisa em documento sigiloso recusada", e?.codigo === "SEI_SIGILOSO", e);
  }
}
