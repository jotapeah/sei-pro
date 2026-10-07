/**
 * Content script do gestor de projetos (mundo isolado, todos os frames,
 * document_start). Primeiro marca o documento, de forma síncrona, para o
 * legado não carregar o sei-pro-projetos.js: o primeiro import (`./marcar`) é
 * um efeito que roda antes de todo o resto do pacote. Em todo frame, os Textos
 * Padrão de dados do SEI Pro saem do seletor de "Texto Padrão" ao gerar
 * documento (cosmético). Depois, com o DOM, decide pela tela (`qualTela`):
 * - janela de topo de qualquer tela do SEI com unidade: os repositórios com o
 *   dispositivo de verdade, a sincronia dos dois Textos Padrão da unidade
 *   (pagina/sincronia.ts: lê só no Controle de Processos; nas outras telas só
 *   envia o que mudou aqui, porque o lateral e a árvore gravam) e o lado da aba
 *   do painel lateral (pagina/lateral.ts, chave host|login|u:<unidade>);
 * - Controle de Processos (topo): o painel embutido, as pílulas (com o
 *   contador da aba do lateral) e o "Abrir no painel" que o lateral deixou;
 * - frames: nada ainda (a árvore do processo ganha o ícone, a faixa e o balão a
 *   seguir); nenhum trabalho pesado roda neles.
 *
 * Nada daqui abre a árvore de um processo nem monta link do SEI: a conferência
 * do número SEI vai pela pesquisa rápida da própria tela, a lista de usuários é
 * a parcial (pagina/usuarios.ts), e o armazém dos Textos Padrão e a ida ao
 * Controle de Processos usam o link do menu da tela.
 */

// Primeiro de tudo (efeito de importação): a marca do <html> antes de qualquer outro módulo.
import "./marcar";
import { type Area, areaChrome } from "@comum/armazenamento/area";
import { idDispositivo } from "@comum/armazenamento/dispositivo";
import { hojeISO } from "@comum/datas/dias";
import { lerOpcaoLegada } from "@comum/opcoes/legadas";
import { corDoTemaSei, temaEscuroLegado } from "@comum/pagina/tema";
import { avisoComAcoesNaPagina, avisoNaPagina } from "@comum/painel/aviso";
import { ligarPortaDoPainel, type PainelMontado } from "@comum/painel/embutido";
import type { PortaRpc } from "@comum/ponte/rpc";
import { ocultarTextosInternos } from "@comum/sincronia/controlePagina";
import { Formulario } from "@nucleo/formulario/formulario";
import { linkDoMenu } from "@nucleo/links/links";
import { criarHttp } from "@nucleo/sessao/http";
import { paginaDe } from "@nucleo/sessao/pagina";
import { gravadorDoContador } from "../app/contador";
import { carregarUnidade } from "../app/dados";
import { gravarPreferencias, lerPreferencias } from "../app/preferencias";
import { chaveUsuarios } from "../modelo/constantes";
import { escoposDaUnidade } from "../modelo/escopo";
import type { Carimbo, Vis } from "../modelo/tipos";
import { CANAL_LATERAL, CANAL_PROJETOS, type ContextoProjetos, chaveDaAba } from "../ponte/tipos";
import { RepositorioProjetos } from "../repositorio";
import { armazemDoTexto, armazemNaTela } from "./armazem";
import { atividadesDaAba } from "./atividades";
import { atividadesConfigurado, contextoProjetos } from "./contexto";
import { conferirDocumento } from "./documento";
import { tratadoresProjetos } from "./executor";
import { atenderPedidoDoLateral, focoDaAba, type PainelDaAba } from "./foco";
import { ligarLateralDaAba } from "./lateral";
import { ligarAlertas, montarPainelProjetos, ordemDoPainel } from "./painel";
import { ligarSincronia, type SincroniaPagina } from "./sincronia";
import { qualTela } from "./tela";
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

type Repos = Readonly<Record<Vis, RepositorioProjetos>>;

/** O que esta janela de topo tem para o painel embutido e o lateral. */
interface Aba {
  ctx: ContextoProjetos;
  unidade: { id: string; sigla: string; nome: string };
  area: Area;
  repos: Repos;
  sincronia: SincroniaPagina | null;
}

async function principal(): Promise<void> {
  // Nos frames, nada ainda (a árvore do processo vem a seguir): só a janela de topo segue.
  if (window !== window.top) return;
  if (!(await lerOpcaoLegada("gerenciarprojetos"))) return;
  const ctx = contextoProjetos(
    document,
    { temaEscuro: temaEscuroLegado(localStorage), corTema: corDoTemaSei(document), atividades: atividadesConfigurado(localStorage) },
    location.href,
  );
  // Sem unidade no cabeçalho (login, janelas sem a barra do SEI): nem sincronia nem lateral.
  if (!ctx?.unidade) return;
  const unidade = ctx.unidade;
  const naCaixa = qualTela(document) === "caixa";
  const area = areaChrome(chrome.storage.local, "local");
  // P5: o content script também grava (os balões da caixa e da árvore): o carimbo leva o dispositivo de verdade,
  // o mesmo do app (mesclagem e origem do sigilo).
  const dispositivo = await idDispositivo(area);
  const carimbo = (): Carimbo => ({ agora: Date.now(), dispositivo, por: ctx.login, nome: ctx.nome });
  const escopos = escoposDaUnidade(ctx.host, ctx.login, unidade.id);
  const repos: Repos = {
    unidade: new RepositorioProjetos(area, escopos.unidade, carimbo),
    eu: new RepositorioProjetos(area, escopos.eu, carimbo),
  };
  // Os dois Textos Padrão: o Controle de Processos lê ao abrir e ao ganhar foco; as outras telas só enviam, e só se
  // têm o item "Textos Padrão" no menu (senão o status "indisponível" valeria para todas as abas da unidade).
  const sincronia = ligarSincronia({
    ctx,
    unidade,
    area,
    sync: areaChrome(chrome.storage.sync, "sync"),
    repos,
    armazem: (vis) => armazemDoTexto(document, location.href, vis, ctx.login),
    janela: window,
    doc: document,
    puxar: naCaixa,
    temArmazem: naCaixa ? undefined : () => armazemNaTela(document, location.href),
  });
  const aba: Aba = { ctx, unidade, area, repos, sincronia };
  // null: a tela não recebe o painel (as outras telas e a visão por marcadores); rejeitada: a montagem falhou.
  const painel: Promise<PainelDaAba | null> = naCaixa ? montarNaCaixa(aba) : Promise.resolve(null);
  painel.catch((e) => console.warn("[SEI Pro] projetos: painel", e));
  // O lado da aba do lateral já (sem esperar o painel): a página recarregada volta antes do fim da carência.
  ligarLateralDaAba({
    doc: document,
    ctx,
    area,
    conectar: () => chrome.runtime.connect({ name: CANAL_LATERAL }) as unknown as PortaRpc,
    tratadores: tratadores(aba, {
      iframe: null,
      focarNoPainel: focoDaAba({
        painel,
        area,
        chave: chaveDaAba(ctx),
        agora: () => Date.now(),
        link: () => linkDoMenu(paginaDe(document, location.href), "procedimento_controlar"),
        ir: (u) => location.assign(u),
      }),
    }),
  });
}

/**
 * O painel embutido, as pílulas (com o contador do lateral) e o "Abrir no painel" que o lateral deixou. null quando
 * esta lista não recebe o painel (a visão por marcadores); rejeita se a montagem falhar.
 */
async function montarNaCaixa(aba: Aba): Promise<PainelDaAba | null> {
  const { ctx, area, repos } = aba;
  const prefs = await lerPreferencias(area);
  const montado = montarPainelProjetos(document, {
    urlApp: chrome.runtime.getURL("html/projetos.html#modo=embutido"),
    temaEscuro: ctx.temaEscuro,
    recolhido: prefs.recolhido,
    ordem: ordemDoPainel(localStorage),
    aoRecolher: (r) => void gravarPreferencias(area, { recolhido: r }).catch(() => undefined),
  });
  if (!montado) return null;
  // A cada carga do iframe, uma porta nova: o app só aceita a porta da própria aba (@comum/ponte/conexaoDaAba).
  const porta = ligarPortaDoPainel(
    montado,
    () => chrome.runtime.connect({ name: CANAL_PROJETOS }) as unknown as PortaRpc,
    tratadores(aba, { iframe: montado.iframe, montado }),
  );
  // As pílulas contam as atrasadas: o mesmo contador (e a mesma regra) que o app do lateral grava.
  ligarAlertas(montado, { temaEscuro: ctx.temaEscuro, repos, rpc: porta.rpc, hoje: () => hojeISO(), aoContar: gravadorDoContador(area) });
  const painel: PainelDaAba = { painel: montado.painel, corpo: montado.corpo, rpc: porta.rpc };
  void atenderPedidoDoLateral(area, chaveDaAba(ctx), Date.now(), painel).catch(() => undefined);
  return painel;
}

/** O que o app (do painel embutido ou do lateral) pede a esta aba. */
function tratadores(
  aba: Aba,
  o: {
    iframe: HTMLIFrameElement | null;
    montado?: PainelMontado;
    focarNoPainel?: (id: string, etapa?: string) => Promise<"painel" | "navegou">;
  },
) {
  const { ctx, unidade, area, repos } = aba;
  const http = criarHttp(location.href);
  return tratadoresProjetos({
    doc: document,
    ctx,
    iframe: o.iframe,
    sobreposicao: o.montado?.sobreposicao,
    // Os avisos na página são do painel embutido (o lateral mostra os seus).
    avisar: o.montado ? avisoNaPagina(document, ctx.temaEscuro, "spro-prj") : null,
    avisarAcoes: o.montado ? avisoComAcoesNaPagina(document, ctx.temaEscuro, "spro-prj") : null,
    sincronia: aba.sincronia,
    // A mesma requisição do painel legado, com o login do SEI desta tela (a chave de outro usuário é recusada).
    atividades: atividadesDaAba(ctx, localStorage, chrome.runtime.getManifest().version, (u, i) => fetch(u, i)),
    focarNoPainel: o.focarNoPainel ?? null,
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
}
