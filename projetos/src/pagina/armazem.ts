/**
 * O armazém de Texto Padrão do núcleo para os textos dos projetos (P4), com só o que ele usa da
 * sessão: o HTTP e o link do MENU (`linkDoMenu`) colhido da tela. Sem a classe `Sei`, o pacote do
 * content script não leva a leitura da árvore de processo (o portão do build confere), e o armazém
 * só usa o menu e os links da própria lista de Textos Padrão: nunca URL montada. O menu é lido na
 * hora de cada rodada (a tela de agora); tela sem o item "Textos Padrão" dá "indisponível".
 */

import type { ArmazemTexto } from "@comum/sincronia/controlePagina";
import { criarArmazemTextoPadrao } from "@nucleo/dominio/textoPadrao";
import { linkDoMenu } from "@nucleo/links/links";
import { criarHttp } from "@nucleo/sessao/http";
import { paginaDe } from "@nucleo/sessao/pagina";
import type { Vis } from "../modelo/tipos";
import { descricaoDoTexto, nomeDoTexto } from "../sincronia/textoPadrao";

export function armazemDoTexto(doc: Document, url: string, vis: Vis, login: string): ArmazemTexto {
  const sessao = { http: criarHttp(url), linkMenu: (acao: string) => linkDoMenu(paginaDe(doc, url), acao) };
  const a = criarArmazemTextoPadrao(sessao, { nome: nomeDoTexto(vis, login), descricao: descricaoDoTexto(vis) });
  return {
    ler: () => a.ler(),
    gravar: (h) => a.gravar(h),
    gravarConferindo: (h, c) => a.gravarConferindo(h, c),
    excluir: () => a.excluir(),
    localizar: () => a.localizar(),
  };
}
