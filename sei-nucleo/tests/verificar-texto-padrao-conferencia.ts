/**
 * O texto que é de todos (o da unidade nos Projetos), contra as telas reais do
 * SEI 4.1.5: quem só lê (sem o link de alterar), a conferência do conteúdo
 * anterior no formulário de alterar, o texto que sumiu e a criação simultânea
 * (duplicata). Servidor falso com vários textos de mesmo nome.
 */

import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { type ConferenciaGravacao, criarArmazemTextoPadrao } from "../src/dominio/textoPadrao";
import { linkDoMenu } from "../src/links/links";
import { Sei } from "../src/sei";
import { checar, lanca, paginaSintetica, secao } from "./util";

const AQUI = dirname(fileURLToPath(import.meta.url));
const ler = (n: string) => readFileSync(join(AQUI, "fixtures", "sei41", n), "utf8").replace(/^<!-- url: .*? -->\n/, "");
const NOME = "[_SEIPRO_PRJ_UNIDADE]";
const RAIZ = "https://sei.exemplo.gov.br/sei/";

interface Texto {
  id: string;
  conteudo: string;
  alterar: boolean;
}

const escapar = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** Servidor falso: `textos` com o nosso nome (vários = duplicata); `colega` cria o dele junto do nosso cadastro. */
function servidor(textos: Texto[], o: { colega?: "antes" | "depois" } = {}) {
  const estado = { textos, posts: [] as Array<{ acao: string; corpo: string }>, alterarAberto: "" };
  const listar0 = ler("texto_padrao_listar.html");
  const modelo = listar0.split("\n").find((l) => l.includes('value="901"')) ?? "";
  const linha = (t: Texto) => {
    let l = modelo.replace(/901/g, t.id).replace(/ASSINATURA 2/g, NOME);
    if (!t.alterar) l = l.replace(/<a href="controlador\.php\?acao=texto_padrao_interno_alterar[^"]*"[^>]*>[\s\S]*?<\/a>/, "");
    return l;
  };
  const proximoId = () => String(Math.max(949, ...estado.textos.map((t) => Number(t.id))) + 1);
  const resp = (url: string, html: string) => {
    const bytes = new Uint8Array([...html].map((c) => c.charCodeAt(0) & 0xff));
    return { url, status: 200, arrayBuffer: async () => bytes.buffer } as unknown as Response;
  };
  const comConteudo = (html: string, c: string) => html.replace(/(<textarea[^>]*name="txaConteudo"[^>]*>)[\s\S]*?(<\/textarea>)/, `$1${escapar(c)}$2`);
  const idDe = (u: string) => /id_texto_padrao_interno=(\d+)/.exec(u)?.[1] ?? "";
  const lista = () =>
    resp(`${RAIZ}controlador.php?acao=texto_padrao_interno_listar&infra_hash=1`, listar0.replace(modelo, estado.textos.map(linha).join("\n")));
  const fetch = (async (u: string, init?: RequestInit) => {
    const acao = /[?&]acao=(\w+)/.exec(u)?.[1] ?? "";
    const corpo = String(init?.body ?? "");
    const post = init?.method === "POST";
    if (post) estado.posts.push({ acao, corpo });
    const campo = (n: string) => new URLSearchParams(corpo).get(n) ?? "";
    if (acao === "texto_padrao_interno_listar") return lista();
    if (acao === "texto_padrao_interno_cadastrar" && post) {
      const doColega = () => estado.textos.push({ id: proximoId(), conteudo: "<p>K</p>", alterar: true });
      if (o.colega === "antes") doColega();
      estado.textos.push({ id: proximoId(), conteudo: campo("txaConteudo"), alterar: true });
      if (o.colega === "depois") doColega();
      return lista();
    }
    if (acao === "texto_padrao_interno_alterar" && post) {
      const t = estado.textos.find((x) => x.id === estado.alterarAberto);
      if (t) t.conteudo = campo("txaConteudo");
      return lista();
    }
    if (acao === "texto_padrao_interno_excluir") {
      estado.textos = estado.textos.filter((t) => t.id !== campo("hdnInfraItemId"));
      return lista();
    }
    if (acao === "texto_padrao_interno_cadastrar") return resp(u, ler("texto_padrao_cadastrar.html"));
    if (acao === "texto_padrao_interno_alterar") {
      estado.alterarAberto = idDe(u);
      const t = estado.textos.find((x) => x.id === estado.alterarAberto);
      return resp(u, comConteudo(ler("texto_padrao_alterar.html"), t?.conteudo ?? ""));
    }
    if (acao === "texto_padrao_interno_consultar") {
      const t = estado.textos.find((x) => x.id === idDe(u));
      return resp(u, comConteudo(ler("texto_padrao_consultar.html"), t?.conteudo ?? ""));
    }
    return resp(u, "<html><body>?</body></html>");
  }) as unknown as typeof globalThis.fetch;
  const menu = `<a href="controlador.php?acao=texto_padrao_interno_listar&infra_item_menu=162&infra_hash=${"0".repeat(64)}">Textos Padrão</a>`;
  const base = paginaSintetica(`<div id="infraMenu">${menu}</div><form id="frmProtocoloPesquisaRapida"></form>`, `${RAIZ}controlador.php?acao=procedimento_controlar`);
  const sei = new Sei(base.url, () => base, { fetch });
  return { armazem: criarArmazemTextoPadrao(sei, { nome: NOME, descricao: "Projetos da unidade (SEI Pro)." }), estado, sei, base };
}

/** O `<textarea>` volta escapado (como o SEI 5 faz); quem compara desfaz, como o `mesmoConteudo` do sei-comum. */
const desfazer = (s: string | null) => (s === null ? null : s.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&"));
const conferencia = (anterior: string | null): ConferenciaGravacao => ({ anterior, mesmo: (a, b) => desfazer(a) === desfazer(b) });
const posts = (s: { estado: { posts: Array<{ acao: string }> } }, acao: string) => s.estado.posts.filter((p) => p.acao === acao).length;

export async function verificarTextoPadraoConferencia(): Promise<void> {
  secao("texto padrao: quem so le (sem o link de alterar)");
  const s1 = servidor([{ id: "901", conteudo: "<p>C</p>", alterar: false }]);
  const achado = await s1.armazem.localizar();
  checar("localiza pela consulta, sem o alterar", achado?.id === "901" && !!achado.consultar && achado.alterar === undefined, achado);
  checar("le o conteudo", desfazer(await s1.armazem.ler()) === "<p>C</p>");
  const e1 = await lanca(() => s1.armazem.gravar("<p>N</p>"));
  checar(
    "gravar sem poder alterar: SEI_ACAO_INDISPONIVEL e nada de cadastrar outro",
    e1?.codigo === "SEI_ACAO_INDISPONIVEL" && posts(s1, "texto_padrao_interno_cadastrar") === 0,
    e1,
  );
  const e2 = await lanca(() => s1.armazem.gravarConferindo("<p>N</p>", conferencia("<p>C</p>")));
  checar(
    "gravarConferindo idem (nem cadastra outro, nem posta alteracao)",
    e2?.codigo === "SEI_ACAO_INDISPONIVEL" &&
      posts(s1, "texto_padrao_interno_cadastrar") === 0 &&
      posts(s1, "texto_padrao_interno_alterar") === 0 &&
      s1.estado.textos.length === 1,
    { e2, posts: s1.estado.posts.map((p) => p.acao) },
  );

  secao("texto padrao: conferencia do anterior no formulario de alterar");
  const s2 = servidor([{ id: "901", conteudo: "<p>C</p>", alterar: true }]);
  const r2 = await s2.armazem.gravarConferindo("<p>N</p>", conferencia(await s2.armazem.ler()));
  checar(
    "ainda e o lido: posta a alteracao",
    r2.gravado && s2.estado.textos[0]?.conteudo === "<p>N</p>" && posts(s2, "texto_padrao_interno_alterar") === 1,
    { r2, textos: s2.estado.textos },
  );
  const s3 = servidor([{ id: "901", conteudo: "<p>do colega</p>", alterar: true }]);
  const r3 = await s3.armazem.gravarConferindo("<p>N</p>", conferencia("<p>C</p>"));
  checar(
    "mudou desde a leitura: nao posta e devolve o atual",
    !r3.gravado && desfazer(r3.atual) === "<p>do colega</p>" && posts(s3, "texto_padrao_interno_alterar") === 0,
    r3,
  );
  const s4 = servidor([]);
  const r4 = await s4.armazem.gravarConferindo("<p>N</p>", conferencia("<p>C</p>"));
  checar(
    "sumiu desde a leitura: devolve null e nao cria ainda (o motor mescla antes)",
    !r4.gravado && r4.atual === null && posts(s4, "texto_padrao_interno_cadastrar") === 0,
    r4,
  );
  const s5 = servidor([]);
  const r5 = await s5.armazem.gravarConferindo("<p>N</p>", conferencia(null));
  checar(
    "nao existia e continua nao existindo: cria, e sem duplicata fica",
    r5.gravado && s5.estado.textos.length === 1 && s5.estado.textos[0]?.conteudo === "<p>N</p>",
    s5.estado.textos,
  );

  secao("texto padrao: texto invalido (sem carga) e regravado pela conferencia");
  // Sem carga, o `mesmoConteudo` do sei-comum compara o HTML cru (igualdade estrita). Se a consulta e o
  // formulário de alterar fossem lidos por caminhos diferentes (um decodificado, outro cru), o texto
  // inválido da unidade nunca seria regravado. (O linkedom não desfaz as entidades do `<textarea>`,
  // por isso o lido é comparado com `desfazer`; a conferência, não: ela é estrita.)
  const invalido = '<p>editado a mao: 1 < 2 & "aspas"</p>';
  const s12 = servidor([{ id: "901", conteudo: invalido, alterar: true }]);
  const lido12 = await s12.armazem.ler();
  const r12 = await s12.armazem.gravarConferindo("<p>N</p>", { anterior: lido12, mesmo: (a, b) => a === b });
  checar(
    "a consulta e o alterar leem o txaConteudo do mesmo jeito: o invalido e substituido",
    desfazer(lido12) === invalido && r12.gravado && s12.estado.textos[0]?.conteudo === "<p>N</p>",
    { lido12, r12, textos: s12.estado.textos },
  );

  secao("texto padrao: dois usuarios criando ao mesmo tempo");
  const s6 = servidor([], { colega: "antes" });
  const r6 = await s6.armazem.gravarConferindo("<p>N</p>", conferencia(null));
  checar(
    "o colega criou primeiro (menor id): o nosso sai e o dele volta para a mescla",
    !r6.gravado && desfazer(r6.atual) === "<p>K</p>" && s6.estado.textos.length === 1 && s6.estado.textos[0]?.conteudo === "<p>K</p>",
    { r6, textos: s6.estado.textos },
  );
  checar(
    "a exclusao foi do nosso id",
    s6.estado.posts.some((p) => p.acao === "texto_padrao_interno_excluir" && /hdnInfraItemId=951/.test(p.corpo)),
    s6.estado.posts.map((p) => p.acao),
  );
  const s7 = servidor([], { colega: "depois" });
  const r7 = await s7.armazem.gravarConferindo("<p>N</p>", conferencia(null));
  checar(
    "o nosso ficou com o menor id: fica, e o do colega e ele quem apaga",
    r7.gravado && s7.estado.textos.length === 2 && posts(s7, "texto_padrao_interno_excluir") === 0,
    s7.estado.textos,
  );
  const s9 = servidor([
    { id: "960", conteudo: "<p>X</p>", alterar: true },
    { id: "955", conteudo: "<p>Y</p>", alterar: true },
  ]);
  const lido9 = await s9.armazem.ler();
  checar("duplicata antiga: ler escolhe o de menor id", desfazer(lido9) === "<p>Y</p>", lido9);
  await s9.armazem.gravarConferindo("<p>N</p>", conferencia(lido9));
  checar(
    "e grava nele, sem mexer no outro",
    s9.estado.textos.find((t) => t.id === "955")?.conteudo === "<p>N</p>" && s9.estado.textos.find((t) => t.id === "960")?.conteudo === "<p>X</p>",
    s9.estado.textos,
  );
  // Menor id NUMÉRICO: "1000" vem antes de "960" na ordem do texto, mas não é o menor.
  const s11 = servidor([
    { id: "1000", conteudo: "<p>M</p>", alterar: true },
    { id: "960", conteudo: "<p>Y</p>", alterar: true },
  ]);
  const achado11 = await s11.armazem.localizar();
  checar("localizar tambem escolhe o menor id (numerico, nao pelo texto)", achado11?.id === "960", achado11);
  await s11.armazem.gravar("<p>N</p>");
  checar(
    "gravar (sem conferir) tambem grava no menor id, sem mexer no outro",
    s11.estado.textos.find((t) => t.id === "960")?.conteudo === "<p>N</p>" && s11.estado.textos.find((t) => t.id === "1000")?.conteudo === "<p>M</p>",
    s11.estado.textos,
  );

  secao("texto padrao: so com o http e o link do menu (sem a classe Sei)");
  const s10 = servidor([{ id: "901", conteudo: "<p>C</p>", alterar: true }]);
  const leve = criarArmazemTextoPadrao(
    { http: s10.sei.http, linkMenu: (acao) => linkDoMenu(s10.base, acao) },
    { nome: NOME, descricao: "Projetos da unidade (SEI Pro)." },
  );
  checar("le pelo link do menu colhido da tela", desfazer(await leve.ler()) === "<p>C</p>");
  const semMenu = await lanca(() => linkDoMenu({ doc: s10.base.doc, html: "<html></html>" }, "nao_existe"));
  checar("acao fora do menu: SEI_ACAO_INDISPONIVEL", semMenu?.codigo === "SEI_ACAO_INDISPONIVEL", semMenu);
}
