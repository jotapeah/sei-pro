/**
 * Inclusão de PROCESSOS em bloco interno.
 *
 * Não há link na árvore do processo para isso: o caminho do SEI é a tela do
 * Controle de Processos. O usuário marca as caixas das linhas, clica em
 * "Incluir em Bloco", escolhe o bloco na lupa (`bloco_selecionar_processo`) e o
 * `finalizarSelecao` da lupa troca o `action` do `#frmProcedimentoControlar`
 * para `rel_bloco_protocolo_cadastrar` e envia o formulário inteiro. Aqui se faz
 * o mesmo envio, sem a tela: todos os campos como estão (as assinaturas
 * `hdn{Lista}ItensHash` vão intactas), mais a seleção (`hdn{Lista}ItensSelecionados`
 * e a caixa de cada processo) e o `hdnIdBloco`. Comprovado no SEI 5.0.4 do MJ.
 *
 * Só entram processos que estão NA PÁGINA atual do Controle (as caixas da
 * página são o que o SEI aceita na seleção): quem não está nela é
 * "fora-da-pagina", e nunca se marca outro no lugar.
 *
 * Um POST só para todos os processos: se ele falha, falha para todos, e não há
 * o que repetir processo a processo.
 *
 * Substitui no legado: nada — o SEI Pro não incluía processos em bloco.
 */

import { normalizar, Formulario } from "../formulario/formulario";
import { linkDaAcao, parametros } from "../links/links";
import { textoDe } from "../sessao/dom";
import { comoErroSei, ErroSei } from "../sessao/erros";
import type { OpcoesHttp, Pagina } from "../sessao/http";
import type { Sei } from "../sei";

export interface BlocoInterno {
  /** Valor do radio na lupa: é o que vai em `hdnIdBloco`. */
  id: string;
  numero: string;
  descricao: string;
}

export type ResultadoInclusao = {
  idProcedimento: string;
  situacao: "incluido" | "ja-estava" | "fora-da-pagina" | "erro";
  erro?: string;
};

const FORM_CONTROLE = "#frmProcedimentoControlar";

/** Colunas pelo texto do cabeçalho ("Número", "Tipo", "Descrição"), nunca pela posição. */
function colunas(tabela: Element): Record<string, number> {
  const mapa: Record<string, number> = {};
  const cabecalho = [...tabela.querySelectorAll("tr")].find((tr) => tr.querySelector("th"));
  [...(cabecalho?.querySelectorAll("th, td") ?? [])].forEach((c, i) => {
    const nome = normalizar(textoDe(c)).replace(/[^a-z0-9 ]/g, "").trim();
    if (nome && mapa[nome] === undefined) mapa[nome] = i;
  });
  return mapa;
}

/** Blocos da lupa: só os de tipo "Interno" (a mesma lista traz os de Reunião). */
function lerBlocosDaLupa(pagina: Pagina): BlocoInterno[] {
  const raiz = pagina.doc.querySelector("#frmBlocoLista") ?? pagina.doc;
  const tabela = [...raiz.querySelectorAll("table")].find((t) => {
    const c = colunas(t);
    return (c.numero ?? c.n) !== undefined && c.tipo !== undefined && c.descricao !== undefined;
  });
  if (!tabela) {
    // Lista vazia o SEI mostra sem tabela; tabela sem as colunas esperadas é outra versão.
    if (!raiz.querySelector("input[name=chkInfraItem]")) return [];
    throw new ErroSei("SEI_VERSAO_NAO_SUPORTADA", "A lista de blocos para incluir processos não foi reconhecida.");
  }
  const col = colunas(tabela);
  const blocos: BlocoInterno[] = [];
  for (const tr of tabela.querySelectorAll("tr")) {
    const radio = tr.querySelector("input[name=chkInfraItem]");
    const id = radio?.getAttribute("value")?.trim() ?? "";
    if (!id) continue;
    const tds = [...tr.querySelectorAll("td")];
    const celula = (i: number | undefined) => (i === undefined ? "" : textoDe(tds[i]));
    if (normalizar(celula(col.tipo)) !== "interno") continue;
    blocos.push({ id, numero: celula(col.numero ?? col.n) || id, descricao: celula(col.descricao) });
  }
  return blocos;
}

async function abrirControle(sei: Sei, op: OpcoesHttp): Promise<Pagina> {
  return sei.http.obter(sei.linkMenu("procedimento_controlar"), { sinal: op.sinal, aceitarValidacao: true });
}

/** A lupa de blocos pelo link assinado que está no script do Controle (`objLupaBlocoPesquisa`). */
async function abrirLupa(sei: Sei, controle: Pagina, op: OpcoesHttp): Promise<{ pagina: Pagina; blocos: BlocoInterno[] }> {
  const link =
    linkDaAcao(controle.html, "bloco_selecionar_processo", { id_object: "objLupaBlocoPesquisa" }) ??
    linkDaAcao(controle.html, "bloco_selecionar_processo");
  if (!link) throw new ErroSei("SEI_ACAO_INDISPONIVEL", "O Controle de Processos não oferece incluir processos em bloco para este usuário.");
  const pagina = await sei.http.obter(link, { sinal: op.sinal, aceitarValidacao: true });
  return { pagina, blocos: lerBlocosDaLupa(pagina) };
}

/** Blocos internos que a unidade oferece para receber processos (a lupa do Controle). */
export async function listarBlocosInternosParaProcessos(sei: Sei, op: OpcoesHttp = {}): Promise<BlocoInterno[]> {
  return (await abrirLupa(sei, await abrirControle(sei, op), op)).blocos;
}

interface NaPagina {
  lista: string;
  /** Nome da caixa (`chkGeradosItem2`). */
  campo: string;
  /** Número do processo, para achá-lo na tela do bloco. */
  protocolo: string;
}

/**
 * Processos marcáveis da página: as caixas `chk{Lista}Item<N>` de cada lista
 * declarada em `hdnInfraSelecoes` ("Recebidos,Gerados"; "Detalhado" na
 * visualização detalhada). Um id em duas listas fica com a primeira.
 */
function processosDaPagina(form: Formulario): { listas: string[]; mapa: Map<string, NaPagina> } {
  const doc = form.pagina.doc;
  const declaradas = (form.valor("hdnInfraSelecoes") ?? "").split(",").map((x) => x.trim()).filter(Boolean);
  const listas = (declaradas.length ? declaradas : ["Recebidos", "Gerados"]).filter((l) => /^\w+$/.test(l));
  const mapa = new Map<string, NaPagina>();
  for (const lista of listas) {
    if (!form.tem(`hdn${lista}ItensSelecionados`)) continue;
    const padrao = new RegExp(`^chk${lista}Item\\d+$`);
    for (const chk of doc.querySelectorAll(`${FORM_CONTROLE} input[type=checkbox]`)) {
      const campo = chk.getAttribute("name") ?? "";
      const id = chk.getAttribute("value")?.trim() ?? "";
      if (!padrao.test(campo) || !id || mapa.has(id) || chk.hasAttribute("disabled")) continue;
      const linha = chk.closest("tr");
      const protocolo = chk.getAttribute("title")?.trim() || textoDe(linha?.querySelector("a[class^=processo]"));
      mapa.set(id, { lista, campo, protocolo });
    }
  }
  return { listas, mapa };
}

/**
 * O processo aparece na tela do bloco? Pelo `id_procedimento` de algum link da
 * linha ou pelo número do processo numa célula — a tela não tem um id por
 * linha garantido.
 */
function noBloco(pagina: Pagina, id: string, protocolo: string): boolean {
  const raiz = pagina.doc.querySelector("#tblProtocolosBlocos") ?? pagina.doc;
  const doId = new RegExp(`[?&]id_procedimento=${id}(?!\\d)`);
  return [...raiz.querySelectorAll("tr")].some(
    (tr) =>
      [...tr.querySelectorAll("[href], [onclick]")].some((el) =>
        doId.test(`${el.getAttribute("href") ?? ""} ${el.getAttribute("onclick") ?? ""}`.replace(/&amp;/g, "&")),
      ) || (!!protocolo && [...tr.querySelectorAll("td, a")].some((el) => textoDe(el) === protocolo)),
  );
}

/** Erros que impedem tudo (e que nenhum resultado por processo deve esconder). */
const fatal = (e: ErroSei) => e.codigo === "SEI_SESSAO_EXPIRADA" || e.codigo === "CANCELADO";

/**
 * A tela atual do bloco, para saber quem JÁ está nele antes de postar (o botão
 * clicado duas vezes não duplica nada). O link assinado `rel_bloco_protocolo_listar`
 * não vem garantido no Controle; a lista de blocos internos do menu o traz por
 * linha. Sem link, ou com qualquer falha que não seja de sessão, a conferência
 * é pulada e quem classifica é a tela devolvida pela inclusão.
 */
async function telaDoBloco(sei: Sei, idBloco: string, fontes: Pagina[], op: OpcoesHttp): Promise<Pagina | null> {
  try {
    let link = fontes.map((p) => linkDaAcao(p.html, "rel_bloco_protocolo_listar", { id_bloco: idBloco })).find(Boolean) ?? null;
    if (!link) {
      const internos = await sei.http.obter(sei.linkMenu("bloco_interno_listar"), { sinal: op.sinal, aceitarValidacao: true });
      link = linkDaAcao(internos.html, "rel_bloco_protocolo_listar", { id_bloco: idBloco });
    }
    if (!link) return null;
    const pagina = await sei.http.obter(link, { sinal: op.sinal, aceitarValidacao: true });
    return parametros(pagina.url).get("acao") === "rel_bloco_protocolo_listar" ? pagina : null;
  } catch (e) {
    const erro = comoErroSei(e);
    if (fatal(erro)) throw erro;
    return null;
  }
}

/**
 * Inclui processos num bloco interno, num POST só. Devolve um resultado por id
 * pedido (sem repetição, na ordem pedida). Só lança o que impede tudo: sessão
 * expirada, Controle sem o formulário ou sem a ação, bloco que não está na lista
 * de blocos internos.
 */
export async function incluirProcessosEmBlocoInterno(
  sei: Sei,
  idBloco: string,
  idsProcedimento: string[],
  op: OpcoesHttp = {},
): Promise<ResultadoInclusao[]> {
  const alvo = String(idBloco ?? "").trim();
  if (!alvo) throw new ErroSei("ARGUMENTO_INVALIDO", "Informe o bloco interno.");
  const pedidos = [...new Set(idsProcedimento.map((x) => String(x ?? "").trim()).filter(Boolean))];
  if (!pedidos.length) return [];

  const controle = await abrirControle(sei, op);
  const form = Formulario.de(controle, FORM_CONTROLE, sei.http);
  // Link do `finalizarSelecao` da lupa, no script: por isso o HTML cru.
  const link = linkDaAcao(controle.html, "rel_bloco_protocolo_cadastrar");
  if (!link) throw new ErroSei("SEI_ACAO_INDISPONIVEL", "O Controle de Processos não oferece incluir processos em bloco para este usuário.");
  const lupa = await abrirLupa(sei, controle, op);
  const bloco = lupa.blocos.find((b) => b.id === alvo);
  if (!bloco) throw new ErroSei("SEI_NAO_ENCONTRADO", `O bloco interno ${alvo} não está entre os blocos que a unidade pode usar para processos.`);

  const { listas, mapa } = processosDaPagina(form);
  // A tela recusa sigiloso no próprio JavaScript ("Operação não aplicável em processo sigiloso.").
  const sigilosos = new Set((controle.doc.querySelector("#hdnIdSigilosos")?.getAttribute("value") ?? "").split(",").map((x) => x.trim()).filter(Boolean));
  const resultado = new Map<string, ResultadoInclusao>();
  for (const id of pedidos) {
    if (!mapa.has(id)) resultado.set(id, { idProcedimento: id, situacao: "fora-da-pagina" });
    else if (sigilosos.has(id)) resultado.set(id, { idProcedimento: id, situacao: "erro", erro: "Processo sigiloso: o SEI não o inclui em bloco pelo Controle de Processos." });
  }

  let pendentes = pedidos.filter((id) => !resultado.has(id));
  if (pendentes.length) {
    const atual = await telaDoBloco(sei, alvo, [controle, lupa.pagina], op);
    if (atual) {
      for (const id of pendentes) {
        if (noBloco(atual, id, mapa.get(id)?.protocolo ?? "")) resultado.set(id, { idProcedimento: id, situacao: "ja-estava" });
      }
      pendentes = pendentes.filter((id) => !resultado.has(id));
    }
  }
  if (!pendentes.length) return pedidos.map((id) => resultado.get(id) as ResultadoInclusao);

  // Seleção como a tela a deixaria: só as caixas escolhidas (alguma que tenha
  // vindo marcada sai) e a lista escondida de cada lista do Controle.
  for (const [nome] of form.pares()) if (/^chk\w+Item\d+$/.test(nome)) form.definir({ [nome]: null });
  const valores: Record<string, string> = {};
  for (const lista of listas) {
    if (form.tem(`hdn${lista}ItensSelecionados`)) {
      valores[`hdn${lista}ItensSelecionados`] = pendentes.filter((id) => mapa.get(id)?.lista === lista).join(",");
    }
  }
  valores.hdnIdBloco = alvo;
  for (const id of pendentes) valores[mapa.get(id)?.campo ?? ""] = id;
  form.definir(valores);

  const falhar = (mensagem: string) => {
    for (const id of pendentes) resultado.set(id, { idProcedimento: id, situacao: "erro", erro: mensagem });
  };
  let resposta: Pagina | null = null;
  try {
    resposta = await sei.http.enviar(link, form.pares(), { sinal: op.sinal, aceitarValidacao: true });
  } catch (e) {
    const erro = comoErroSei(e);
    if (fatal(erro)) throw erro;
    falhar(`${erro.message} Confira o bloco ${bloco.numero} antes de repetir.`);
  }
  if (resposta) {
    const validacao = resposta.doc.querySelector("#txaInfraValidacao")?.textContent?.trim() ?? "";
    const p = parametros(resposta.url);
    const confirmou =
      p.get("acao") === "rel_bloco_protocolo_listar" && p.get("acao_origem") === "rel_bloco_protocolo_cadastrar" && p.get("id_bloco") === alvo;
    if (!confirmou) {
      falhar(validacao || `O SEI não confirmou a inclusão no bloco ${bloco.numero}.`);
    } else {
      for (const id of pendentes) {
        resultado.set(
          id,
          noBloco(resposta, id, mapa.get(id)?.protocolo ?? "")
            ? { idProcedimento: id, situacao: "incluido" }
            : { idProcedimento: id, situacao: "erro", erro: validacao || `O SEI não mostrou o processo no bloco ${bloco.numero} depois da inclusão.` },
        );
      }
    }
  }
  return pedidos.map((id) => resultado.get(id) as ResultadoInclusao);
}
