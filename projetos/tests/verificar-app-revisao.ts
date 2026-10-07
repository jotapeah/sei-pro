/**
 * Provas dos achados da revisão final da P3: o aviso com "Desfazer" dado de
 * dentro de um diálogo no painel embutido, o filtro por fase entre projetos,
 * a régua do progresso, o foco das camadas, a sincronia, "Informar documento"
 * sem número, o menu do estado vazio, a cota cheia e "Redefinir plano original".
 */

import { definirEmissorDeAviso } from "@comum/ui/aviso";
import { SEM_FASE } from "../src/modelo/constantes";
import { escolherCombo, itemDoMenu, texto } from "./apoioApp";
import { HOSTIL } from "./cenarioGantt";
import { botao, checar, secao, tique } from "./util";
import { abrirAba, balao, clicarLinha, etapasDoGantt, formProjeto, montar } from "./verificar-app";

export async function verificarAppRevisao(): Promise<void> {
  secao("app embutido: o Desfazer de acao feita dentro de dialogo vai para a pagina");
  const em = await montar({ embutido: true });
  try {
    abrirAba(em, em.ids.p);
    await tique();
    clicarLinha(em, em.ids.a);
    checar("o balao da etapa abriu", !!balao(em));
    botao(balao(em) ?? em.doc.createElement("div"), "Editar")?.click();
    await tique();
    const dialogo = () => em.doc.querySelector<HTMLElement>("dialog.spro-dialogo");
    checar(
      "dialogo da etapa aberto, com o iframe sobreposto",
      !!dialogo()?.querySelector(".prj-form-etapa") && em.doc.documentElement.dataset.sobreposto === "sim",
    );
    botao(dialogo()?.querySelector(".prj-form-etapa") ?? em.doc.createElement("div"), "Excluir")?.click();
    await tique(80);
    const pedido = em.naPagina.at(-1);
    checar(
      "excluir pelo dialogo: ao fechar, o aviso vai para a pagina com Desfazer e nao fica no app",
      !dialogo() &&
        !(await em.un.obterEtapa(em.ids.a)) &&
        pedido?.texto === "Etapa “Nota técnica” excluída." &&
        pedido.acao === "Desfazer" &&
        !em.doc.querySelector(".spro-aviso"),
      em.naPagina,
    );
    pedido?.responder(true);
    await tique(80);
    checar("Desfazer clicado na pagina restaura a etapa", !!(await em.un.obterEtapa(em.ids.a)));
    abrirAba(em, em.ids.q);
    await tique();
    botao(em.raiz, "Editar projeto")?.click();
    checar("dialogo do projeto aberto", !!formProjeto(em));
    itemDoMenu(formProjeto(em) ?? em.doc.createElement("div"), "Mais ações do projeto", "Arquivar");
    await tique(80);
    const arquivado = em.naPagina.at(-1);
    checar(
      "arquivar pelo dialogo: o aviso tambem vai para a pagina",
      !formProjeto(em) && arquivado?.texto === "Projeto “Plano 2027” arquivado." && arquivado.acao === "Desfazer",
      em.naPagina.map((x) => x.texto),
    );
    arquivado?.responder(true);
    await tique(80);
    checar("e o Desfazer reativa", (await em.eu.obterProjeto(em.ids.q))?.arquivadoEm === undefined);
    checar("nome hostil nao vira elemento no modo embutido", !em.doc.querySelector("img") && HOSTIL.includes("<img"));
  } finally {
    definirEmissorDeAviso(null);
    em.app.destruir();
  }

  secao("app: filtro por Fase vale so no projeto das fases (ids de fase sao por projeto)");
  const fl = await montar();
  const obra = await fl.un.criarProjeto({ nome: "Obra" });
  const licitacao = await fl.un.criarFase(obra.id, "Licitação");
  await fl.un.criarEtapa({ projeto: obra.id, nome: "Edital", fase: licitacao.id, inicio: "2026-10-13", fim: "2026-10-16" });
  await fl.un.criarEtapa({ projeto: obra.id, nome: "Contrato", inicio: "2026-10-19", fim: "2026-10-23" });
  await tique(80);
  const botaoFiltro = () => texto(fl.raiz.querySelector(".prj-filtro"));
  const nomesNoGantt = () => etapasDoGantt(fl).map((l) => l.etapa.nome);
  const noPopover = (fazer: (pop: HTMLElement) => void) => {
    fl.raiz.querySelector<HTMLButtonElement>(".prj-filtro")?.click();
    fazer(fl.doc.querySelector<HTMLElement>(".prj-filtro-pop") ?? fl.doc.createElement("div"));
    fl.raiz.querySelector<HTMLButtonElement>(".prj-filtro")?.click();
  };
  const filtrarFase = (valor: string) => noPopover((pop) => escolherCombo(pop, "Fase", valor));
  const abrir = async (id: string) => {
    if (id === "todos") abrirAba(fl, id);
    else fl.app.focarProjeto(id);
    await tique();
  };
  await abrir(fl.ids.p);
  filtrarFase(fl.ids.f);
  await tique();
  checar("no projeto A, a fase filtra e conta", botaoFiltro() === "Filtro · 1" && nomesNoGantt().length === 2, botaoFiltro());
  await abrir(obra.id);
  checar(
    "no projeto B, a fase de A nao vale: tudo aparece e o botao nao conta",
    !fl.raiz.querySelector(".prj-nada") && [...nomesNoGantt()].sort().join() === "Contrato,Edital" && botaoFiltro() === "Filtro",
    { nomes: nomesNoGantt(), botao: botaoFiltro(), nada: texto(fl.raiz.querySelector(".prj-nada")) },
  );
  noPopover((pop) =>
    checar(
      "no popover de B, sem 'Limpar filtro' (nenhum criterio vale aqui)",
      !!pop.querySelector(".prj-filtro-campos") && !botao(pop, "Limpar filtro"),
    ),
  );
  await abrir("todos");
  checar(
    "no Todos, a fase de A tambem nao vale: todos os projetos aparecem",
    !fl.raiz.querySelector(".prj-nada") && botaoFiltro() === "Filtro" && fl.raiz.querySelectorAll(".prj-lin-projeto").length === 3,
    { botao: botaoFiltro(), linhas: fl.raiz.querySelectorAll(".prj-lin-projeto").length },
  );
  await abrir(fl.ids.p);
  checar("de volta em A, o filtro dele continua", botaoFiltro() === "Filtro · 1" && nomesNoGantt().length === 2);
  await abrir(obra.id);
  itemDoMenu(fl.raiz, "Ajustes dos projetos", "Exportar planilha (CSV)");
  checar(
    "o CSV de B tambem ignora a fase de A",
    fl.t.baixados.at(-1)?.conteudo.includes("Edital") === true && fl.t.baixados.at(-1)?.conteudo.includes("Contrato") === true,
  );
  filtrarFase(SEM_FASE);
  await tique();
  checar("Sem fase em B: so a etapa sem fase", nomesNoGantt().join() === "Contrato" && botaoFiltro() === "Filtro · 1", nomesNoGantt());
  await abrir(fl.ids.p);
  checar(
    "Sem fase vale em qualquer projeto: em A (todas com fase) nada aparece, com Limpar filtro",
    texto(fl.raiz.querySelector(".prj-nada p")) === "Nenhuma etapa nesse filtro." && botaoFiltro() === "Filtro · 1",
  );
  await abrir("todos");
  checar(
    "no Todos so Sem fase vale: so o projeto com etapa sem fase",
    fl.raiz.querySelectorAll(".prj-lin-projeto").length === 1 && texto(fl.raiz.querySelector(".prj-lin-projeto .prj-lin-nome")) === "Obra",
    texto(fl.raiz.querySelector(".prj-lista")),
  );
  fl.app.destruir();
}
