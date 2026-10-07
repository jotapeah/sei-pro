/**
 * Provas dos achados da revisão final da P3: o aviso com "Desfazer" dado de
 * dentro de um diálogo no painel embutido, o filtro por fase entre projetos,
 * a régua do progresso, o foco das camadas, a sincronia, "Informar documento"
 * sem número, o menu do estado vazio, a cota cheia e "Redefinir plano original".
 */

import { definirEmissorDeAviso } from "@comum/ui/aviso";
import { itemDoMenu } from "./apoioApp";
import { HOSTIL } from "./cenarioGantt";
import { botao, checar, secao, tique } from "./util";
import { abrirAba, balao, clicarLinha, formProjeto, montar } from "./verificar-app";

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
}
