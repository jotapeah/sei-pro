/**
 * Provas dos achados da revisão final da P3: o aviso com "Desfazer" dado de
 * dentro de um diálogo no painel embutido, o filtro por fase entre projetos,
 * a régua do progresso, o foco das camadas, a sincronia, "Informar documento"
 * sem número, o menu do estado vazio, a cota cheia e "Redefinir plano original".
 */

import { definirEmissorDeAviso } from "@comum/ui/aviso";
import { abrirCamada } from "../src/app/componentes/camada";
import { SEM_FASE } from "../src/modelo/constantes";
import type { MudancasEtapa } from "../src/repositorio";
import { digitar, escolherCombo, itemDoMenu, rastrearFoco, tecla, telaDoApp, texto } from "./apoioApp";
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

  secao("app: camada (balao, popover) leva o foco para dentro e devolve a quem abriu");
  const docC = telaDoApp();
  rastrearFoco(docC);
  const appC = docC.getElementById("app") as HTMLElement;
  const abre = docC.createElement("button");
  const outro = docC.createElement("input");
  appC.append(abre, outro);
  const conteudoC = () => {
    const d = docC.createElement("div");
    const p1 = docC.createElement("button");
    p1.textContent = "Primeiro";
    const p2 = docC.createElement("button");
    p2.textContent = "Segundo";
    d.append(docC.createElement("span"), p1, p2);
    return { d, p1, p2 };
  };
  abre.focus();
  const c1 = conteudoC();
  const cam1 = abrirCamada(abre, c1.d, { classe: "prj-balao" });
  checar("ao abrir, o foco vai para o primeiro controle da camada", docC.activeElement === c1.p1);
  tecla(c1.p2, "Escape");
  checar("ao fechar (Esc), o foco volta para quem abriu", !cam1.el.isConnected && docC.activeElement === abre);
  const c2 = conteudoC();
  const cam2 = abrirCamada(abre, c2.d, { classe: "prj-balao" });
  outro.focus();
  cam2.fechar();
  checar("o foco ja tinha saido da camada (clique em outro campo): fechar nao o puxa de volta", docC.activeElement === outro);
  const c3 = conteudoC();
  const cam3 = abrirCamada(abre, c3.d, { classe: "prj-balao", foco: (el) => el.querySelectorAll<HTMLElement>("button")[1] ?? null });
  checar("o foco pedido (reabrir no mesmo controle)", docC.activeElement === c3.p2);
  cam3.fechar();
  const fo = await montar();
  rastrearFoco(fo.doc);
  abrirAba(fo, fo.ids.p);
  await tique();
  const linhaA = fo.raiz.querySelector<HTMLElement>(`.prj-lin[data-id='${fo.ids.a}']`);
  linhaA?.focus();
  clicarLinha(fo, fo.ids.a);
  checar(
    "balao da etapa: o foco entra nele",
    !!balao(fo) && !!fo.doc.activeElement && (balao(fo)?.contains(fo.doc.activeElement) ?? false),
    fo.doc.activeElement?.outerHTML,
  );
  tecla(balao(fo) ?? fo.doc.body, "Escape");
  checar("Esc fecha e o foco volta para a linha da etapa", !balao(fo) && fo.doc.activeElement === linhaA);
  fo.raiz.querySelector<HTMLButtonElement>(".prj-filtro")?.click();
  checar(
    "popover do filtro: o foco vai para o primeiro chip",
    texto(fo.doc.activeElement).startsWith("Atrasadas") && !!fo.doc.querySelector(".prj-filtro-pop")?.contains(fo.doc.activeElement),
  );
  tecla(fo.doc.body, "Escape");
  checar("e volta para o botao Filtro", fo.doc.activeElement === fo.raiz.querySelector(".prj-filtro"));
  fo.app.destruir();

  secao("app: regua do progresso grava quando o usuario para, e o balao fica aberto");
  const rg = await montar();
  rastrearFoco(rg.doc);
  const gravados: number[] = [];
  const editarEtapa = rg.un.editarEtapa.bind(rg.un);
  rg.un.editarEtapa = (id: string, m: MudancasEtapa, hoje: string) => {
    if (m.progresso !== undefined) gravados.push(m.progresso);
    return editarEtapa(id, m, hoje);
  };
  abrirAba(rg, rg.ids.p);
  await tique();
  clicarLinha(rg, rg.ids.b);
  const regua = () => balao(rg)?.querySelector<HTMLInputElement>("input[type='range']") ?? null;
  checar("balao com a regua (medida manual)", !!regua());
  regua()?.focus();
  for (const v of ["5", "10", "15"]) digitar(regua(), v);
  checar(
    "cada seta do teclado (um change cada) ainda nao grava; o valor aparece",
    gravados.length === 0 && texto(balao(rg)?.querySelector(".prj-balao-prog b")) === "15%",
    gravados,
  );
  await tique(700);
  checar("depois de parar, grava uma vez so, com o ultimo valor", gravados.join() === "15", gravados);
  await tique(100);
  checar(
    "o redesenho da gravacao nao fecha o balao: reabre na mesma etapa, com o valor gravado",
    texto(balao(rg)?.querySelector("h3")) === "Análise" && regua()?.value === "15" && (await rg.un.obterEtapa(rg.ids.b))?.progresso === 15,
    { h3: texto(balao(rg)?.querySelector("h3")), v: regua()?.value },
  );
  checar("e o foco continua na regua (teclado)", !!regua() && rg.doc.activeElement === regua());
  digitar(regua(), "20");
  tecla(balao(rg) ?? rg.doc.body, "Escape");
  checar("fechar o balao grava na hora o que ficou pendente", gravados.join() === "15,20" && !balao(rg), gravados);
  await tique(800);
  checar("e nada grava de novo depois", gravados.join() === "15,20", gravados);
  await tique(100);
  checar("Esc fechou: o redesenho nao reabre", !balao(rg));
  clicarLinha(rg, rg.ids.b);
  botao(balao(rg) ?? rg.doc.createElement("div"), "Concluir etapa")?.click();
  await tique(100);
  checar("acao do balao (concluir) fecha e o redesenho nao reabre", !balao(rg) && !!(await rg.un.obterEtapa(rg.ids.b))?.concluidaEm);
  clicarLinha(rg, rg.ids.a);
  await rg.un.editarEtapa(rg.ids.a, { nome: "Nota técnica revista" }, "2026-10-06");
  await tique(100);
  checar(
    "gravacao de outro lugar com o balao aberto: reabre com o dado novo",
    texto(balao(rg)?.querySelector("h3")) === "Nota técnica revista",
  );
  await rg.un.removerEtapa(rg.ids.a);
  await tique(100);
  checar("etapa excluida em outro lugar: o balao fecha", !balao(rg));
  rg.app.destruir();
}
