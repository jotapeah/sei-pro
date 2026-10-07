import type { AbrirModal } from "@comum/ui/dialogo";
import type { ProjetoNaTela } from "../src/app/dados";
import { abrirArquivados, abrirInformarDocumento, pedirNomeDoModelo } from "../src/app/dialogos/apoio";
import { abrirDialogoProjeto, type ContextoDialogoProjeto, type ResultadoProjeto } from "../src/app/dialogos/projeto";
import { resumoDoProjeto } from "../src/modelo/resumo";
import { ErroValidacao } from "../src/modelo/validacao";
import { MODELOS_EMBUTIDOS } from "../src/modelos/embutidos";
import { criarNoCombo, digitar, escolherCombo, itemDoMenu, itensDoMenu, marcar, opcoesDoCombo, telaDoApp, texto } from "./apoioApp";
import { HOSTIL } from "./cenarioGantt";
import { etapa, HOJE, projeto } from "./fabrica";
import { botao, checar, secao, tique } from "./util";

function modais(doc: Document) {
  const titulos: string[] = [];
  const abrirModal: AbrirModal = (o) => {
    titulos.push(o.titulo);
    doc.body.append(o.conteudo);
    return {
      fechar: () => {
        o.conteudo.remove();
        o.aoFechar?.();
      },
    };
  };
  return { abrirModal, titulos };
}

const p1: ProjetoNaTela = {
  projeto: projeto({ id: "p1", nome: HOSTIL, processo: { protocolo: "50300.001234/2026-11", idProcedimento: "77" } }),
  vis: "unidade",
  fases: [],
  etapas: [etapa({ id: "e1" })],
  resumo: resumoDoProjeto([etapa({ id: "e1" })], HOJE),
};

export async function verificarAppProjeto(): Promise<void> {
  secao("app: novo projeto (em branco e de um modelo)");
  const doc = telaDoApp();
  const m = modais(doc);
  const salvos: ResultadoProjeto[] = [];
  let recusar: string[] | null = null;
  const base: ContextoDialogoProjeto = {
    abrirModal: m.abrirModal,
    hoje: HOJE,
    sigla: "TESTE",
    modelos: MODELOS_EMBUTIDOS,
    processos: async () => [
      { protocolo: "50300.004410/2026-02", idProcedimento: "44", tipo: "Licitação", especificacao: "Notebooks", sigiloso: false },
    ],
    salvar: async (r) => {
      if (recusar) throw new ErroValidacao(recusar);
      salvos.push(r);
    },
  };
  abrirDialogoProjeto(base);
  await tique();
  const f = () => doc.querySelector(".prj-form-projeto") as HTMLElement;
  checar("titulo e campos", m.titulos.at(-1) === "Novo projeto" && !!f().querySelector("input[name='nome']"));
  const cartoes = [...f().querySelectorAll(".prj-opcao")].map((c) => texto(c));
  checar(
    "Quem ve em cartoes com a sigla e a explicacao",
    cartoes[0] === "Toda a unidade (TESTE) Quem usa o SEI Pro na TESTE vê e edita. Fica no Texto Padrão da unidade." &&
      cartoes[1] === "Só eu Aparece só para você, nesta unidade. Dá para mudar depois.",
    cartoes,
  );
  checar(
    "comeca em branco (sem o bloco do modelo)",
    botao(f(), "Em branco")?.getAttribute("aria-pressed") === "true" && (f().querySelector(".prj-bloco-modelo") as HTMLElement).hidden,
  );
  botao(f(), "Criar projeto")!.click();
  await tique();
  checar("nome obrigatorio", texto(f().querySelector(".prj-erros")) === "Informe o nome do projeto." && !salvos.length);
  digitar(f().querySelector("input[name='nome']"), "  Pregão de notebooks ");
  escolherCombo(f(), "Processo SEI", "50300.004410/2026-02");
  marcar(f().querySelector("input[value='eu']"));
  botao(f(), "Criar projeto")!.click();
  await tique();
  checar(
    "em branco: nome, processo da caixa e Só eu",
    salvos[0]?.nome === "Pregão de notebooks" &&
      salvos[0]?.processo?.idProcedimento === "44" &&
      salvos[0]?.vis === "eu" &&
      !salvos[0]?.modelo,
    salvos[0],
  );
  checar("fecha ao criar", !f());

  abrirDialogoProjeto({ ...base, comecarDeModelo: true });
  await tique();
  checar(
    "pelo 'Comecar de um modelo': ja no modelo",
    botao(f(), "De um modelo")?.getAttribute("aria-pressed") === "true" && !(f().querySelector(".prj-bloco-modelo") as HTMLElement).hidden,
  );
  checar("modelos embutidos no seletor", opcoesDoCombo(f(), "Modelo").join() === MODELOS_EMBUTIDOS.map((x) => x.id).join());
  escolherCombo(f(), "Modelo", MODELOS_EMBUTIDOS[0]!.id);
  digitar(f().querySelector("input[name='comeca']"), "2026-08-03");
  const previa = texto(f().querySelector(".prj-previa"));
  checar(
    "previa: 9 etapas em 3 fases, termino e as 3 primeiras (tela 2)",
    previa.startsWith("9 etapas em 3 fases · datas em dias úteis, pulando feriados termina em 10/12/2026") &&
      previa.includes("Nota técnica preliminar 03/08 → 21/08") &&
      previa.includes("Análise jurídica 24/08 → 11/09") &&
      previa.endsWith("… e mais 6 etapas"),
    previa,
  );
  digitar(f().querySelector("input[name='comeca']"), "2026-13-40");
  checar("data invalida: a previa avisa", texto(f().querySelector(".prj-previa")) === "Informe uma data válida (entre 2000 e 2100).");
  digitar(f().querySelector("input[name='comeca']"), "2026-08-03");
  digitar(f().querySelector("input[name='nome']"), "Revisão da Resolução nº 5.432");
  recusar = ["Limite de 100 projetos ativos em “Toda a unidade”. Arquive ou exclua algum."];
  botao(f(), "Criar projeto")!.click();
  await tique();
  checar("erro do repositorio fica no dialogo", texto(f().querySelector(".prj-erros")).startsWith("Limite de 100") && !!f());
  recusar = null;
  botao(f(), "Criar projeto")!.click();
  await tique();
  checar(
    "de um modelo: leva o modelo e a data",
    salvos[1]?.modelo?.modelo.id === MODELOS_EMBUTIDOS[0]!.id && salvos[1]?.modelo?.inicio === "2026-08-03" && salvos[1]?.vis === "unidade",
  );

  secao("app: editar projeto");
  const feitos: string[] = [];
  abrirDialogoProjeto({
    ...base,
    projeto: p1,
    arquivar: async () => void feitos.push("arquivar"),
    duplicar: async () => void feitos.push("duplicar"),
    salvarComoModelo: () => void feitos.push("modelo"),
    excluir: async () => void feitos.push("excluir"),
  });
  await tique();
  checar(
    "titulo e nome hostil no campo",
    m.titulos.at(-1) === "Editar projeto" && (f().querySelector("input[name='nome']") as HTMLInputElement).value === HOSTIL,
  );
  checar("sem 'Comecar' ao editar", !botao(f(), "Em branco"));
  checar(
    "acoes no menu do rodape",
    itensDoMenu(f(), "Mais ações do projeto").join("|") === "Arquivar|Duplicar|Salvar como modelo…|Excluir",
  );
  itemDoMenu(f(), "Mais ações do projeto", "Salvar como modelo…");
  checar("salvar como modelo", feitos.join() === "modelo");
  marcar(f().querySelector("input[value='eu']"));
  botao(f(), "Salvar")!.click();
  await tique();
  checar(
    "editar: mudar Quem ve vai no resultado",
    salvos.at(-1)?.vis === "eu" && salvos.at(-1)?.processo?.protocolo === "50300.001234/2026-11",
  );
  abrirDialogoProjeto({
    ...base,
    projeto: { ...p1, projeto: { ...p1.projeto, arquivadoEm: 5 } },
    reativar: async () => void feitos.push("reativar"),
  });
  checar("arquivado: Reativar no lugar de Arquivar", itensDoMenu(f(), "Mais ações do projeto")[0] === "Reativar");
  itemDoMenu(f(), "Mais ações do projeto", "Reativar");
  await tique();
  checar("reativar fecha", feitos.at(-1) === "reativar" && !f());

  secao("app: projetos arquivados");
  const docA = telaDoApp();
  const ma = modais(docA);
  const arq: ProjetoNaTela = { ...p1, projeto: { ...p1.projeto, arquivadoEm: new Date(2026, 8, 30, 12).getTime() } };
  const acoes: string[] = [];
  abrirArquivados({
    abrirModal: ma.abrirModal,
    arquivados: [arq],
    reativar: async (id) => void acoes.push(`reativar:${id}`),
    excluir: async (id) => void acoes.push(`excluir:${id}`),
  });
  const lista = docA.querySelector(".prj-arquivados")!;
  checar(
    "lista com nome (texto) e data",
    texto(lista).includes(HOSTIL) && texto(lista).includes("arquivado em 30/09/2026") && !lista.querySelector("img"),
  );
  botao(lista, "Reativar")!.click();
  await tique();
  checar(
    "reativar tira da lista",
    acoes.join() === "reativar:p1" && texto(docA.querySelector(".prj-arquivados")) === "Nenhum projeto arquivado.",
  );

  secao("app: informar documento e nome do modelo");
  const docD = telaDoApp();
  const md = modais(docD);
  const docs: string[] = [];
  abrirInformarDocumento({
    abrirModal: md.abrirModal,
    etapa: etapa({ id: "x", concluidaEm: "2026-10-06" }),
    hoje: HOJE,
    conferirDocumento: async (n) => ({ numero: n, protocolo: "50300.001234/2026-11" }),
    salvar: async (numero, data) => void docs.push(`${numero}:${data}`),
  });
  checar("titulo da tela 2", md.titulos.at(-1) === "Documento que comprova a conclusão");
  const cd = docD.querySelector(".prj-form-documento")!;
  digitar(cd.querySelector("input[name='documento']"), "1240001");
  await tique();
  checar("conferencia", texto(cd.querySelector(".prj-docok")) === "Documento encontrado no processo 50300.001234/2026-11");
  digitar(cd.querySelector("input[name='concluida']"), "2026-10-05");
  botao(cd, "Salvar")!.click();
  await tique();
  checar("salva numero e data da conclusao", docs.join() === "1240001:2026-10-05" && !docD.querySelector(".prj-form-documento"));
  const nomes: string[] = [];
  pedirNomeDoModelo({ abrirModal: md.abrirModal, sugestao: "Revisão normativa", salvar: async (n) => void nomes.push(n) });
  const cm = docD.querySelector(".prj-form-modelo")!;
  checar("sugere o nome do projeto", (cm.querySelector("input") as HTMLInputElement).value === "Revisão normativa");
  botao(cm, "Salvar modelo")!.click();
  await tique();
  checar("salva o modelo com o nome", nomes.join() === "Revisão normativa");

  secao("app: falhas assincronas ficam no dialogo");
  const falha = async () => {
    throw new ErroValidacao(["Não foi possível gravar agora."]);
  };
  abrirDialogoProjeto({ ...base, projeto: p1, arquivar: falha, duplicar: falha, excluir: falha });
  await tique();
  for (const item of ["Arquivar", "Duplicar", "Excluir"]) {
    itemDoMenu(f(), "Mais ações do projeto", item);
    await tique();
    checar(`${item} falho: erro no dialogo e aberto`, texto(f()?.querySelector(".prj-erros")) === "Não foi possível gravar agora.");
  }
  botao(f(), "Cancelar")!.click();
  abrirDialogoProjeto({ ...base, projeto: p1, arquivar: async () => void feitos.push("arquivar-ok") });
  itemDoMenu(f(), "Mais ações do projeto", "Arquivar");
  await tique();
  checar("arquivar com sucesso fecha", feitos.at(-1) === "arquivar-ok" && !f());

  const docF = telaDoApp();
  const mf = modais(docF);
  abrirArquivados({ abrirModal: mf.abrirModal, arquivados: [arq], reativar: falha, excluir: falha });
  botao(docF.querySelector(".prj-arquivados")!, "Excluir")!.click();
  await tique();
  checar(
    "arquivados: falha avisa e mantem o projeto na lista",
    texto(docF.body).includes("Não foi possível gravar agora.") && texto(docF.querySelector(".prj-arquivados")).includes(HOSTIL),
  );
  abrirInformarDocumento({ abrirModal: mf.abrirModal, etapa: etapa({ id: "y" }), hoje: HOJE, salvar: falha });
  botao(docF.querySelector(".prj-form-documento")!, "Salvar")!.click();
  await tique();
  checar(
    "informar documento: falha fica aberto",
    !!docF.querySelector(".prj-form-documento") &&
      texto(docF.querySelector(".prj-form-documento")).includes("Não foi possível gravar agora."),
  );
  digitar(docF.querySelector(".prj-form-documento input[name='concluida']"), "2026-02-30");
  botao(docF.querySelector(".prj-form-documento")!, "Salvar")!.click();
  await tique();
  checar(
    "informar documento: data impossivel nao chega ao salvar",
    texto(docF.querySelector(".prj-form-documento")).includes("Informe uma data válida"),
  );
  pedirNomeDoModelo({ abrirModal: mf.abrirModal, sugestao: "X", salvar: falha });
  botao(docF.querySelector(".prj-form-modelo")!, "Salvar modelo")!.click();
  await tique();
  checar("nome do modelo: falha fica aberto", texto(docF.querySelector(".prj-form-modelo")).includes("Não foi possível gravar agora."));

  secao("app: processo digitado e clique duplo");
  const antes = salvos.length;
  abrirDialogoProjeto(base);
  await tique();
  digitar(f().querySelector("input[name='nome']"), "Com número livre");
  for (const ruim of ["-", "1", "12.34"]) {
    await criarNoCombo(f(), "Processo SEI", ruim);
    botao(f(), "Criar projeto")!.click();
    await tique();
    checar(
      `numero "${ruim}" e recusado`,
      texto(f().querySelector(".prj-erros")) === "Número de processo inválido." && salvos.length === antes,
    );
  }
  await criarNoCombo(f(), "Processo SEI", " 99906.713-630.000032/2025-82 ");
  botao(f(), "Criar projeto")!.click();
  await tique();
  checar("numero livre valido vai no vinculo", salvos[antes]?.processo?.protocolo === "99906.713-630.000032/2025-82", salvos[antes]);
  const docC = telaDoApp();
  const mc = modais(docC);
  let chamadas = 0;
  let solta: () => void = () => undefined;
  const lenta = () =>
    new Promise<void>((r) => {
      chamadas++;
      solta = r;
    });
  pedirNomeDoModelo({ abrirModal: mc.abrirModal, sugestao: "Dup", salvar: lenta });
  const bm = botao(docC.querySelector(".prj-form-modelo")!, "Salvar modelo")!;
  bm.click();
  bm.click();
  await tique();
  solta();
  await tique();
  checar("salvar modelo: dois cliques, uma chamada", chamadas === 1);
  chamadas = 0;
  abrirInformarDocumento({ abrirModal: mc.abrirModal, etapa: etapa({ id: "z" }), hoje: HOJE, salvar: lenta });
  const bd = botao(docC.querySelector(".prj-form-documento")!, "Salvar")!;
  bd.click();
  bd.click();
  await tique();
  solta();
  await tique();
  checar("informar documento: dois cliques, uma chamada", chamadas === 1);
}
