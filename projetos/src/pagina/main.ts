/**
 * Content script do gestor de projetos (mundo isolado, todos os frames,
 * document_start). Primeiro marca o documento, de forma síncrona, para o
 * legado não carregar o sei-pro-projetos.js: o primeiro import (`./marcar`) é
 * um efeito que roda antes de todo o resto do pacote. Em todo frame, os Textos
 * Padrão de dados do SEI Pro saem do seletor de "Texto Padrão" ao gerar
 * documento (cosmético). Só a janela de topo do Controle de Processos faz o
 * resto: monta o painel embutido, atende o app pelo RPC, pinta as pílulas de
 * alerta no título e (P4) sincroniza os dois Textos Padrão da unidade
 * (pagina/sincronia.ts) e busca no servidor do Atividades a pedido do app.
 * (Caixa, árvore e lateral: P5.)
 *
 * Nada daqui abre a árvore de um processo nem monta link do SEI: a conferência
 * do número SEI vai pela pesquisa rápida da própria tela, a lista de usuários é
 * a parcial (pagina/usuarios.ts) e o armazém dos Textos Padrão usa o link do
 * menu da tela (pagina/armazem.ts).
 */

// Primeiro de tudo (efeito de importação): a marca do <html> antes de qualquer outro módulo.
import "./marcar";
import { areaChrome } from "@comum/armazenamento/area";
import { hojeISO } from "@comum/datas/dias";
import { lerOpcaoLegada } from "@comum/opcoes/legadas";
import { corDoTemaSei, temaEscuroLegado } from "@comum/pagina/tema";
import { avisoComAcoesNaPagina, avisoNaPagina } from "@comum/painel/aviso";
import { ligarPortaDoPainel } from "@comum/painel/embutido";
import type { PortaRpc } from "@comum/ponte/rpc";
import { ocultarTextosInternos } from "@comum/sincronia/controlePagina";
import { Formulario } from "@nucleo/formulario/formulario";
import { criarHttp } from "@nucleo/sessao/http";
import { paginaDe } from "@nucleo/sessao/pagina";
import { carregarUnidade } from "../app/dados";
import { gravarPreferencias, lerPreferencias } from "../app/preferencias";
import { chaveUsuarios } from "../modelo/constantes";
import { escoposDaUnidade } from "../modelo/escopo";
import { CANAL_PROJETOS } from "../ponte/tipos";
import { RepositorioProjetos } from "../repositorio";
import { armazemDoTexto } from "./armazem";
import { atividadesDaAba } from "./atividades";
import { atividadesConfigurado, contextoProjetos } from "./contexto";
import { conferirDocumento } from "./documento";
import { tratadoresProjetos } from "./executor";
import { ligarAlertas, montarPainelProjetos, ordemDoPainel } from "./painel";
import { ligarSincronia } from "./sincronia";
import { responsaveisUsados, usuariosDaCaixa, usuariosDaUnidade } from "./usuarios";

const global = window as unknown as { __seiProProjetos?: boolean };
if (!global.__seiProProjetos) {
  // O mesmo arquivo injetado duas vezes (matches que se sobrepõem) não monta dois painéis.
  global.__seiProProjetos = true;
  const iniciar = () => {
    // Cosmético e barato, em todo frame: os textos de dados do SEI Pro não aparecem como modelo ao gerar documento.
    try {
      ocultarTextosInternos(document);
    } catch (e) {
      console.warn("[SEI Pro] projetos: textos internos", e);
    }
    void principal().catch((e) => console.warn("[SEI Pro] projetos:", e));
  };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", iniciar, { once: true });
  else iniciar();
}

async function principal(): Promise<void> {
  if (window !== window.top) return;
  if (!document.querySelector("#frmProcedimentoControlar")) return;
  if (!(await lerOpcaoLegada("gerenciarprojetos"))) return;
  const ctx = contextoProjetos(
    document,
    { temaEscuro: temaEscuroLegado(localStorage), corTema: corDoTemaSei(document), atividades: atividadesConfigurado(localStorage) },
    location.href,
  );
  if (!ctx?.unidade) return;
  const unidade = ctx.unidade;
  const area = areaChrome(chrome.storage.local, "local");
  const prefs = await lerPreferencias(area);
  const montado = montarPainelProjetos(document, {
    urlApp: chrome.runtime.getURL("html/projetos.html#modo=embutido"),
    temaEscuro: ctx.temaEscuro,
    recolhido: prefs.recolhido,
    ordem: ordemDoPainel(localStorage),
    aoRecolher: (r) => void gravarPreferencias(area, { recolhido: r }).catch(() => undefined),
  });
  if (!montado) return;
  // Pílulas, responsáveis já usados e a mescla do que vem dos Textos Padrão (P4): o content script não edita projetos.
  const escopos = escoposDaUnidade(ctx.host, ctx.login, unidade.id);
  const carimbo = () => ({ agora: Date.now(), dispositivo: "pagina", por: ctx.login, nome: ctx.nome });
  const repos = {
    unidade: new RepositorioProjetos(area, escopos.unidade, carimbo),
    eu: new RepositorioProjetos(area, escopos.eu, carimbo),
  };
  // P4: o texto da unidade e o pessoal (lê ao abrir o Controle de Processos, puxa ao focar, grava 15 s depois de mudar).
  const sincronia = ligarSincronia({
    ctx,
    unidade,
    area,
    sync: areaChrome(chrome.storage.sync, "sync"),
    repos,
    armazem: (vis) => armazemDoTexto(document, location.href, vis, ctx.login),
    janela: window,
    doc: document,
  });
  const http = criarHttp(location.href);
  const tratadores = tratadoresProjetos({
    doc: document,
    ctx,
    iframe: montado.iframe,
    sobreposicao: montado.sobreposicao,
    avisar: avisoNaPagina(document, ctx.temaEscuro, "spro-prj"),
    avisarAcoes: avisoComAcoesNaPagina(document, ctx.temaEscuro, "spro-prj"),
    sincronia,
    // A mesma requisição do painel legado, com o login do SEI desta tela (a chave de outro usuário é recusada).
    atividades: atividadesDaAba(ctx, localStorage, chrome.runtime.getManifest().version, (u, i) => fetch(u, i)),
    usuarios: async () => {
      const dados = await carregarUnidade(repos, hojeISO()).catch(() => null);
      return usuariosDaUnidade({
        area,
        chave: chaveUsuarios(ctx.host, unidade.id),
        agora: Date.now(),
        daCaixa: usuariosDaCaixa(document),
        usados: dados ? responsaveisUsados([...dados.ativos, ...dados.arquivados]) : [],
        eu: { login: ctx.login, nome: ctx.nome || ctx.login },
        // Decisão do controlador (T12): a única lista completa conhecida exige abrir a árvore de um processo.
        buscarCompleta: null,
      });
    },
    conferir: (n) =>
      conferirDocumento(
        (ref) =>
          Formulario.de(paginaDe(document, location.href), "#frmProtocoloPesquisaRapida", http)
            .definir({ txtPesquisaRapida: ref })
            // Acesso negado ou nada encontrado volta como a tela da pesquisa: vira "não encontrado", não erro.
            .enviar({ aceitarValidacao: true }),
        n,
      ),
  });
  // A cada carga do iframe, uma porta nova: o app só aceita a porta da própria aba (@comum/ponte/conexaoDaAba).
  const porta = ligarPortaDoPainel(montado, () => chrome.runtime.connect({ name: CANAL_PROJETOS }) as unknown as PortaRpc, tratadores);
  ligarAlertas(montado, { temaEscuro: ctx.temaEscuro, repos, rpc: porta.rpc, hoje: () => hojeISO() });
}
