/**
 * Content script isolado (`document_start`): a grade nova do Controle de Processos, com a opção `gradecontrole`
 * (desligada por padrão). Ligada, abre como padrão; o botão ao lado do chevron alterna na sessão.
 *
 * Ordem importa: a bandeira síncrona (localStorage) marca o `<html>` ANTES do corpo existir, e o CSS injetado
 * esconde a tabela nativa e desenha o esqueleto. Só depois, com o DOM pronto, a grade lê a tabela e se monta.
 * Falhou ou demorou: `desativar` devolve a nativa e o legado (que se cala enquanto o atributo existe).
 */
import { areaChrome } from '../../sei-comum/src/armazenamento/area';
import { hojeISO } from '../../sei-comum/src/datas/dias';
import { opcaoLegadaMarcada } from '../../sei-comum/src/opcoes/legadas';
import { temaEscuroLegado } from '../../sei-comum/src/pagina/tema';
import { novoId } from '../../sei-comum/src/id';
import cssBase from '../../sei-comum/src/ui/base.css';
import { baixar } from '../../sei-comum/src/ui/dialogo';
import { listarOpcoes } from '../../sei-nucleo/src/dominio/opcoes';
import { atribuirProcesso, definirMarcador } from '../../sei-nucleo/src/dominio/acoesProcesso';
import { Sei, lerContexto } from '../../sei-nucleo/src/sei';
import { paginaDe } from '../../sei-nucleo/src/sessao/pagina';
import { acoesDaBarra } from './leitura/barra';
import { ativarCedo, desativar, estaAtiva, gravarDica, lerDica, marcarPronta, vigiar } from './ativacao/inicio';
import { manterBotao } from './ativacao/botao';
import { lerTabelas, SELETOR_TABELAS } from './leitura/tabela';
import { criarFonteSei } from './paginas/carregar';
import { criarArmazem } from './persistencia/armazem';
import { criarApp, type App } from './ui/app';
import cssGrade from './style.css';
import cssPagina from './pagina.css';

const OPCAO = 'gradecontrole';

function noControle(): boolean {
  return new URL(location.href).searchParams.get('acao') === 'procedimento_controlar';
}

const escuro = (): boolean => !!document.body?.classList.contains('dark-mode') || temaEscuroLegado(localStorage);

let ligada = false;
let app: App | null = null;
let vigia: ReturnType<typeof vigiar> | null = null;
let pararBotao: (() => void) | null = null;
let domPronto = document.readyState !== 'loading';

function ancora(): Element | null {
  const tabela = document.querySelector(SELETOR_TABELAS);
  return document.getElementById('divTabelaProcesso') ?? tabela?.parentElement ?? null;
}

function voltarNativa(motivo?: string) {
  vigia?.pronta();
  app?.mostrar(false);
  desativar(document);
  if (motivo && motivo !== 'usuario') console.warn('[SEI Pro] Grade do controle indisponível, usando a visão nativa:', motivo);
}

function montar() {
  if (app || !ligada) return;
  const sei = new Sei(location.href, () => paginaDe(document, location.href));
  const contexto = lerContexto(paginaDe(document, location.href));
  const unidade = contexto.unidade.id;
  const armazem = criarArmazem({ local: areaChrome(chrome.storage.local, 'local'), sync: areaChrome(chrome.storage.sync, 'sync') }, String(unidade));
  const inicial = lerTabelas(document);
  if (!inicial.processos.length && !inicial.totais.recebidos && !inicial.totais.gerados) {
    // Caixa vazia: nada a projetar; a tela nativa já diz "nenhum processo".
    vigia?.pronta();
    return voltarNativa('caixa vazia');
  }
  const alvo = ancora();
  if (!alvo) return voltarNativa('sem ponto de encaixe');
  const primeiro = inicial.processos[0]?.id ?? '';
  app = criarApp({
    doc: document,
    inicial,
    agora: () => Date.now(),
    hoje: () => hojeISO(),
    eu: contexto.usuario.login || undefined,
    armazem,
    fonte: criarFonteSei(sei.http, paginaDe(document, location.href)),
    mover: {
      marcador: async (protocolo, m) => void (await definirMarcador(sei, protocolo, m, { aplicar: true })),
      atribuir: async (protocolo, usuario) => void (await atribuirProcesso(sei, protocolo, usuario, { aplicar: true })),
    },
    acoes: () => acoesDaBarra(document),
    css: `${cssBase}\n${cssGrade}`,
    escuro: escuro(),
    baixar: (n, c, t) => baixar(n, c, t),
    novoId: () => novoId(),
    extras: primeiro
      ? async () => {
          const [m, u] = await Promise.all([listarOpcoes(sei, 'marcadores', primeiro), listarOpcoes(sei, 'usuarios', primeiro)]);
          return { marcadores: m.map((x) => x.nome), responsaveis: u.map((x) => { const [sigla, ...resto] = x.nome.split(' - '); return { sigla: sigla!.trim(), nome: resto.join(' - ').trim() || sigla!.trim() }; }) };
        }
      : undefined,
    aoVoltarNativa: () => alternar(),
  });
  alvo.before(app.host);
  void app.iniciar().then(() => {
    vigia?.pronta();
    if (estaAtiva(document)) marcarPronta(document);
  }).catch((e) => voltarNativa(String(e)));
}

/** O botão: troca entre a visão nova e a nativa só nesta página. */
function alternar() {
  if (estaAtiva(document)) {
    app?.mostrar(false);
    desativar(document);
  } else {
    ativarCedo(document, escuro());
    if (app) {
      app.mostrar(true);
      marcarPronta(document);
    } else montar();
  }
  pararBotao?.();
  pararBotao = manterBotao(document, () => estaAtiva(document), alternar);
}

function configurar(valor: boolean) {
  if (valor === ligada) return;
  ligada = valor;
  gravarDica(localStorage, valor);
  if (valor) {
    ativarCedo(document, escuro());
    vigia = vigiar(voltarNativa);
    if (domPronto) { vigia.iniciarContagem(); montar(); }
    pararBotao = manterBotao(document, () => estaAtiva(document), alternar);
  } else {
    pararBotao?.(); pararBotao = null;
    app?.fechar(); app = null;
    vigia?.pronta();
    desativar(document);
  }
}

function partir() {
  if (!noControle()) return;
  const estilo = document.createElement('style');
  estilo.textContent = cssPagina;
  (document.head ?? document.documentElement).append(estilo);
  // Pré-pintura síncrona: a bandeira do localStorage decide antes do storage responder.
  if (lerDica(localStorage)) {
    ligada = true;
    ativarCedo(document, escuro());
    vigia = vigiar(voltarNativa);
  }
  const aoDom = () => {
    domPronto = true;
    if (ligada) {
      vigia?.iniciarContagem();
      montar();
      pararBotao ??= manterBotao(document, () => estaAtiva(document), alternar);
    }
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', aoDom, { once: true });
  else aoDom();

  const ler = (dataValues: unknown) => configurar(opcaoLegadaMarcada(dataValues, OPCAO));
  let mudou = false;
  chrome.storage.onChanged.addListener((m, area) => {
    if (area !== 'sync' || !('dataValues' in m)) return;
    mudou = true;
    ler(m.dataValues!.newValue);
  });
  chrome.storage.sync.get('dataValues').then((i) => { if (!mudou) ler(i.dataValues); }).catch(() => { if (ligada) voltarNativa('sem preferências'); });
}

partir();
