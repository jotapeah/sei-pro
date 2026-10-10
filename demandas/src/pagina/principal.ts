/**
 * O pacote da página (`js/demandas/pagina.js`, ESM): o carregador (`pagina/main.ts` + `pagina/carregador.ts`, o
 * `init_demandas.js` de todo frame) já marcou o <html>, conferiu a opção "Gestor de Demandas" e decidiu pela tela; ele
 * importa este módulo só onde há trabalho e chama `principalTopo`, na janela de topo de qualquer tela do SEI com
 * unidade:
 * - os repositórios com o dispositivo de verdade e a sincronia dos Textos Padrão da unidade (pagina/sincronia.ts: lê só
 *   no Controle de Processos; nas outras telas só envia o que mudou aqui, porque o app grava no storage);
 * - no Controle de Processos, também o painel embutido (o iframe do app) e as pílulas do título.
 *
 * Nada daqui BUSCA a árvore de um processo nem monta link do SEI: a lista de usuários é a parcial
 * (pagina/usuarios.ts), e o armazém dos Textos Padrão usa o link do menu da tela.
 */

import { type Area, areaChrome } from "@comum/armazenamento/area";
import { idDispositivo } from "@comum/armazenamento/dispositivo";
import { hojeISO } from "@comum/datas/dias";
import { corDoTemaSei, temaEscuroLegado } from "@comum/pagina/tema";
import { avisoComAcoesNaPagina, avisoNaPagina } from "@comum/painel/aviso";
import { ligarPortaDoPainel, type PainelMontado } from "@comum/painel/embutido";
import type { PortaRpc } from "@comum/ponte/rpc";
import { chaveUsuarios } from "@projetos/modelo/constantes";
import { carregarDados, responsaveisUsados } from "../app/dados";
import { escoposDaUnidade } from "../modelo/escopo";
import type { Carimbo, Vis } from "../modelo/tipos";
import { CANAL_DEMANDAS, type ContextoDemandas } from "../ponte/tipos";
import { gravarPreferencias, lerPreferencias } from "../preferencias";
import { RepositorioDemandas } from "../repositorio";
import { armazemDoTexto, armazemNaTela } from "./armazem";
import { contextoDemandas } from "./contexto";
import { tratadoresDemandas } from "./executor";
import { ligarAlertas, montarPainelDemandas, ordemDoPainel } from "./painel";
import { ligarSincronia, type SincroniaDemandas } from "./sincronia";
import { qualTela } from "./tela";
import { usuariosDaCaixa, usuariosDaUnidade } from "./usuarios";

type Repos = Readonly<Record<Vis, RepositorioDemandas>>;

/** O que esta janela de topo tem para o painel embutido. */
interface Aba {
  ctx: ContextoDemandas;
  unidade: { id: string; sigla: string; nome: string };
  area: Area;
  repos: Repos;
  sincronia: SincroniaDemandas | null;
}

/** Os dois escopos da unidade. O carimbo leva o dispositivo de verdade, o mesmo do app (mesclagem e origem do sigilo). */
async function reposDaUnidade(ctx: ContextoDemandas, unidade: { id: string }, area: Area): Promise<Repos> {
  const dispositivo = await idDispositivo(area);
  const carimbo = (): Carimbo => ({ agora: Date.now(), dispositivo, por: ctx.login, nome: ctx.nome });
  const escopos = escoposDaUnidade(ctx.host, ctx.login, unidade.id);
  return {
    unidade: new RepositorioDemandas(area, escopos.unidade, carimbo),
    eu: new RepositorioDemandas(area, escopos.eu, carimbo),
  };
}

/** A janela de topo de uma tela do SEI com unidade (o carregador já conferiu a tela e a opção). */
export async function principalTopo(): Promise<void> {
  const ctx = contextoDemandas(document, { temaEscuro: temaEscuroLegado(localStorage), corTema: corDoTemaSei(document) }, location.href);
  // Sem unidade no cabeçalho (login, janelas sem a barra do SEI): nem sincronia nem painel.
  if (!ctx?.unidade) return;
  const unidade = ctx.unidade;
  const naCaixa = qualTela(document) === "caixa";
  const area = areaChrome(chrome.storage.local, "local");
  const repos = await reposDaUnidade(ctx, unidade, area);
  // Os textos: o Controle de Processos lê ao abrir e ao ganhar foco; as outras telas só enviam, e só se têm o item
  // "Textos Padrão" no menu (senão o status "indisponível" valeria para todas as abas da unidade).
  const sincronia = ligarSincronia({
    ctx,
    unidade,
    area,
    sync: areaChrome(chrome.storage.sync, "sync"),
    repos,
    armazem: (vis, tabela) => armazemDoTexto(document, location.href, vis, tabela, ctx.login),
    janela: window,
    doc: document,
    puxar: naCaixa,
    temArmazem: naCaixa ? undefined : () => armazemNaTela(document, location.href),
  });
  const aba: Aba = { ctx, unidade, area, repos, sincronia };
  if (naCaixa) await montarNaCaixa(aba).catch((e) => console.warn("[SEI Pro] demandas: painel", e));
}

/** O painel embutido e as pílulas do título. Rejeita se a montagem falhar. */
async function montarNaCaixa(aba: Aba): Promise<void> {
  const { ctx, area, repos } = aba;
  const prefs = await lerPreferencias(area);
  const montado = montarPainelDemandas(document, {
    urlApp: chrome.runtime.getURL("html/demandas.html#modo=embutido"),
    temaEscuro: ctx.temaEscuro,
    recolhido: prefs.recolhido,
    ordem: ordemDoPainel(localStorage),
    aoRecolher: (r) => void gravarPreferencias(area, { recolhido: r }).catch(() => undefined),
  });
  if (!montado) return;
  // A cada carga do iframe, uma porta nova: o app só aceita a porta da própria aba (@comum/ponte/conexaoDaAba).
  const porta = ligarPortaDoPainel(
    montado,
    () => chrome.runtime.connect({ name: CANAL_DEMANDAS }) as unknown as PortaRpc,
    tratadores(aba, { iframe: montado.iframe, montado }),
  );
  ligarAlertas(montado, {
    temaEscuro: ctx.temaEscuro,
    repos,
    eu: { login: ctx.login, nome: ctx.nome || ctx.login },
    rpc: porta.rpc,
    hoje: () => hojeISO(),
  });
}

/** O que o app (do painel embutido) pede a esta aba. */
function tratadores(aba: Aba, o: { iframe: HTMLIFrameElement | null; montado?: PainelMontado }) {
  const { ctx, unidade, area, repos } = aba;
  return tratadoresDemandas({
    doc: document,
    ctx,
    iframe: o.iframe,
    sobreposicao: o.montado?.sobreposicao,
    // Os avisos na página são do painel embutido.
    avisar: o.montado ? avisoNaPagina(document, ctx.temaEscuro, "spro-dem") : null,
    avisarAcoes: o.montado ? avisoComAcoesNaPagina(document, ctx.temaEscuro, "spro-dem") : null,
    sincronia: aba.sincronia,
    usuarios: async () => {
      const dados = await carregarDados(repos, hojeISO()).catch(() => null);
      return usuariosDaUnidade({
        area,
        chave: chaveUsuarios(ctx.host, unidade.id),
        agora: Date.now(),
        daCaixa: usuariosDaCaixa(document),
        usados: dados ? responsaveisUsados(dados) : [],
        eu: { login: ctx.login, nome: ctx.nome || ctx.login },
        // A única lista completa conhecida exige abrir a árvore de um processo (grava "Processo recebido"): nunca.
        buscarCompleta: null,
      });
    },
  });
}
