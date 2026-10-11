/**
 * A grade: estado, barra de ferramentas, tabela/quadro, lote e atalhos, num Shadow DOM. Só lê o modelo e emite
 * intenções; quem fala com o SEI são as dependências recebidas (`DepsApp`), que os testes substituem.
 */
import { gerarCsv } from '../../../sei-comum/src/csv';
import { h } from '../../../sei-comum/src/ui/dom';
import { aplicarSelecao, lerSelecao, observarSelecao } from '../acoes/selecao';
import { executarAcaoNativa } from '../acoes/barra';
import { criarFila, type DepsMover } from '../acoes/mover';
import type { AcaoNativa } from '../leitura/barra';
import { acrescentar, interpretar, filtrarPorBusca, remover } from '../modelo/busca';
import type { Ctx } from '../modelo/contexto';
import { facetasDe } from '../modelo/facetas';
import { linhasCsv, nomeArquivo } from '../modelo/exportar';
import { agrupar, ROTULO_AGRUPAR } from '../modelo/grupos';
import { abrirVisita, comIdade, type EstadoIdade, registrarVistos } from '../modelo/idade';
import { achatar } from '../modelo/linhas';
import { alternarOrdem, ordenar } from '../modelo/ordem';
import { aplicarMovimento, type ExtrasQuadro, planejarMovimento } from '../modelo/quadro';
import { type AgruparPor, type CampoOrdem, COLUNAS, type Coluna, type LeituraTabela, type Processo, ROTULO_COLUNA, type Visao } from '../modelo/tipos';
import { excluirVisao, mudouDe, salvarVisao, visaoPadrao } from '../modelo/visoes';
import type { Fonte, Progresso } from '../paginas/carregar';
import { carregarRestante } from '../paginas/carregar';
import type { Armazem } from '../persistencia/armazem';
import { desenharQuadro } from './quadro';
import { iconeGrade } from './icones';
import { criarTabela } from './tabela';

export interface DepsApp {
  doc: Document;
  inicial: LeituraTabela;
  agora(): number;
  hoje(): string;
  eu?: string;
  armazem: Armazem;
  fonte: Fonte | null;
  mover: DepsMover;
  acoes(): AcaoNativa[];
  css: string;
  escuro: boolean;
  baixar(nome: string, conteudo: string, tipo: string): void;
  novoId(): string;
  /** Marcadores e usuários da unidade, para o quadro mostrar colunas vazias. Falha = só o que está carregado. */
  extras?(): Promise<ExtrasQuadro>;
  aoVoltarNativa(): void;
  /** Para os testes: não reagir ao relógio. */
  semDebounce?: boolean;
}

const ATALHOS: Array<[string, string]> = [
  ['/', 'Buscar'], ['j / k', 'Linha seguinte / anterior'], ['x', 'Marcar a linha'], ['Enter', 'Abrir o processo'],
  ['g t', 'Ver a tabela'], ['g q', 'Ver o quadro'], ['Esc', 'Limpar a busca ou a seleção'], ['?', 'Esta ajuda'],
];
const FILTROS_RAPIDOS: Array<[string, string]> = [['Meus', 'resp:eu'], ['Atrasados', 'prazo:atrasado'], ['Vencem na semana', 'prazo:semana'], ['Sem responsável', 'resp:sem'], ['Não visualizados', 'novo:sim'], ['Novos desde a última visita', 'novo:visita'], ['Parados há +30 dias', 'parado:>30d']];

/** `select.value = x` não existe em todo DOM (os testes usam linkedom); marcar a opção funciona em todos. */
function escolher(sel: HTMLSelectElement, valor: string) {
  for (const o of sel.querySelectorAll('option')) {
    if (o.getAttribute('value') === valor) o.setAttribute('selected', '');
    else o.removeAttribute('selected');
    (o as HTMLOptionElement).selected = o.getAttribute('value') === valor;
  }
}

export function criarApp(d: DepsApp) {
  const { doc } = d;
  let todos: Processo[] = d.inicial.processos;
  let visao: Visao = visaoPadrao();
  let salvas: Visao[] = [];
  let visaoSalvaId = '';
  let recolhidos = new Set<string>();
  let selecionados = new Set<string>(lerSelecao(doc));
  let foco: string | null = null;
  let idade: EstadoIdade = { vistoEm: {} };
  let visitaAnterior: number | undefined;
  let progresso: Progresso | null = null;
  let carregando = false;
  let completo = false;
  let erroCarga = '';
  let extras: ExtrasQuadro = {};
  let extrasPedido = false;
  let encerrado = false;
  let buscaTimer: ReturnType<typeof setTimeout> | undefined;
  let aguardandoG = false;
  const fila = criarFila(d.mover);
  const ctl = new AbortController();

  const ctx = (): Ctx => ({ hoje: d.hoje(), agora: d.agora(), ...(d.eu ? { eu: d.eu } : {}), ...(visitaAnterior !== undefined ? { visitaAnterior } : {}) });

  // ---------- DOM ----------
  const host = doc.createElement('div');
  host.id = 'spro-grade';
  host.setAttribute('data-spro-grade-host', '1');
  host.setAttribute('data-tema', d.escuro ? 'escuro' : 'claro');
  const sombra = host.attachShadow({ mode: 'open' });
  const estilo = doc.createElement('style');
  estilo.textContent = d.css;
  const raiz = h('div', { class: `spro-app${d.escuro ? ' spro-escuro' : ''}` });
  sombra.append(estilo, raiz);

  const busca = h('input', { type: 'search', class: 'spro-busca', placeholder: 'Buscar: texto, resp:ana, prazo:<7d, marcador:urgente...', 'aria-label': 'Buscar processos', spellcheck: 'false', autocomplete: 'off' });
  const chips = h('div', { class: 'spro-chips' });
  const rapidos = h('div', { class: 'spro-rapidos' });
  const status = h('div', { class: 'spro-status', role: 'status', 'aria-live': 'polite' });
  const lote = h('div', { class: 'spro-lote', hidden: true });
  const conteudo = h('div', { class: 'spro-conteudo' });
  const painel = h('div', { class: 'spro-painel', hidden: true });
  const avisos = h('div', { class: 'spro-avisos', 'aria-live': 'polite' });
  const ajuda = h('div', { class: 'spro-ajuda-atalhos', hidden: true }, h('strong', {}, 'Atalhos'), ...ATALHOS.map(([k, t]) => h('div', {}, h('kbd', {}, k), ` ${t}`)));

  const selAgrupar = h('select', { class: 'spro-sel-campo', 'aria-label': 'Agrupar por' }, ...(Object.keys(ROTULO_AGRUPAR) as AgruparPor[]).map((k) => h('option', { value: k }, k === 'nenhum' ? 'Sem agrupamento' : `Agrupar: ${ROTULO_AGRUPAR[k]}`)));
  const selOrdem = h('select', { class: 'spro-sel-campo', 'aria-label': 'Ordenar por' },
    h('option', { value: '' }, 'Ordem do SEI'),
    ...([['protocolo', 'Número do processo'], ['prazo', 'Prazo'], ['tipo', 'Tipo'], ['responsavel', 'Responsável'], ['marcador', 'Marcador'], ['caixa', 'Tempo na caixa'], ['parado', 'Parado há'], ['novo', 'Não visualizados']] as Array<[CampoOrdem, string]>).flatMap(([k, t]) => [h('option', { value: `${k}:a` }, `${t} ↑`), h('option', { value: `${k}:d` }, `${t} ↓`)]));
  const fResp = h('select', { class: 'spro-sel-campo', 'aria-label': 'Filtrar por responsável' });
  const fTipo = h('select', { class: 'spro-sel-campo', 'aria-label': 'Filtrar por tipo' });
  const fMarc = h('select', { class: 'spro-sel-campo', 'aria-label': 'Filtrar por marcador' });

  const botaoModo = (m: 'tabela' | 'quadro', rotulo: string) => h('button', { type: 'button', class: 'spro-seg-b', 'data-modo': m, title: rotulo, onclick: () => alterar({ modo: m }) }, iconeGrade(m === 'tabela' ? 'lista' : 'quadro', 16), h('span', {}, rotulo));
  const segmentado = h('div', { class: 'spro-seg', role: 'group', 'aria-label': 'Modo de exibição' }, botaoModo('tabela', 'Tabela'), botaoModo('quadro', 'Quadro'));
  const btn = (icone: Parameters<typeof iconeGrade>[0], rotulo: string, fn: () => void, classe = '') => h('button', { type: 'button', class: `spro-bt ${classe}`.trim(), title: rotulo, 'aria-label': rotulo, onclick: fn }, iconeGrade(icone, 16), h('span', {}, rotulo));
  const btnColunas = btn('colunas', 'Colunas', () => abrirPainel('colunas'));
  const btnVisoes = btn('disquete', 'Visões', () => abrirPainel('visoes'));
  const btnCsv = btn('lista', 'Exportar CSV', () => exportar());
  const btnAjuda = h('button', { type: 'button', class: 'spro-bt spro-bt-icone', title: 'Atalhos de teclado (?)', 'aria-label': 'Atalhos de teclado', onclick: () => { ajuda.hidden = !ajuda.hidden; } }, '?');
  const btnDensidade = btn('densidade', 'Densidade', () => alterar({ densidade: visao.densidade === 'compacta' ? 'confortavel' : 'compacta' }));
  const opcoesQuadro = h('div', { class: 'spro-quadro-cfg', hidden: true });

  raiz.append(
    h('div', { class: 'spro-barra' },
      segmentado,
      h('div', { class: 'spro-busca-caixa' }, busca),
      selAgrupar, selOrdem,
      btnColunas, btnDensidade, btnVisoes, btnCsv, btnAjuda),
    chips,
    h('div', { class: 'spro-faixa' }, rapidos, fResp, fTipo, fMarc),
    opcoesQuadro, ajuda, painel, status, lote, conteudo, avisos);

  selAgrupar.addEventListener('change', () => alterar({ agrupar: selAgrupar.value as AgruparPor }));
  selOrdem.addEventListener('change', () => {
    const [campo, sentido] = selOrdem.value.split(':');
    alterar({ ordem: campo ? [{ campo: campo as CampoOrdem, decrescente: sentido === 'd' }] : [] });
  });

  // ---------- estado ----------
  const comId = (): Processo[] => comIdade(todos, idade);
  const filtrados = (): Processo[] => filtrarPorBusca(comId(), visao.busca, ctx());
  const ordenados = (): Processo[] => ordenar(filtrados(), visao.ordem, ctx());

  function alterar(p: Partial<Visao>) {
    visao = { ...visao, ...p };
    if (p.busca === undefined) void d.armazem.gravarVisao(visao).catch(() => undefined);
    else agendarGravar();
    render();
  }
  let gravarTimer: ReturnType<typeof setTimeout> | undefined;
  function agendarGravar() {
    clearTimeout(gravarTimer);
    gravarTimer = setTimeout(() => void d.armazem.gravarVisao(visao).catch(() => undefined), 400);
  }

  function aviso(texto: string, acao?: { rotulo: string; fazer(): void }) {
    const el = h('div', { class: 'spro-aviso', role: 'status' }, h('span', {}, texto));
    if (acao) el.append(h('button', { type: 'button', class: 'spro-link', onclick: () => { acao.fazer(); el.remove(); } }, acao.rotulo));
    el.append(h('button', { type: 'button', class: 'spro-aviso-x', 'aria-label': 'Fechar aviso', onclick: () => el.remove() }, '×'));
    avisos.append(el);
    const t = setTimeout(() => el.remove(), acao ? 9000 : 6000);
    (t as unknown as { unref?: () => void }).unref?.();
  }

  // ---------- seleção ----------
  function selecionar(ids: string[], marcado: boolean) {
    const novo = new Set(selecionados);
    for (const id of ids) marcado ? novo.add(id) : novo.delete(id);
    selecionados = novo;
    aplicarSelecao(doc, novo);
    renderLote();
    renderConteudo();
  }

  // ---------- movimentos do quadro ----------
  function substituir(id: string, novo: Processo) {
    todos = todos.map((p) => (p.id === id ? novo : p));
  }
  async function mover(id: string, de: string, para: string) {
    const original = todos.find((p) => p.id === id);
    if (!original) return;
    const plano = planejarMovimento(visao.quadro.colunas, original, de, para);
    if (!plano.ok) return aviso(plano.motivo);
    const nomes = Object.fromEntries((extras.responsaveis ?? []).map((u) => [u.sigla, u.nome]));
    substituir(id, aplicarMovimento(original, plano.movimento, nomes));
    render();
    const r = await fila.mover(plano.movimento);
    if (encerrado) return;
    if (!r.ok) {
      substituir(id, original);
      render();
      return aviso(`Não foi possível mover ${original.protocolo}: ${r.erro}`);
    }
    aviso(`${original.protocolo} movido.`, {
      rotulo: 'Desfazer',
      fazer: () => {
        const atual = todos.find((p) => p.id === id) ?? original;
        substituir(id, aplicarMovimento(atual, r.desfazer, nomes));
        render();
        void fila.mover(r.desfazer).then((rr) => {
          if (rr.ok || encerrado) return;
          substituir(id, atual);
          render();
          aviso(`Não foi possível desfazer: ${rr.erro}`);
        });
      },
    });
  }

  // ---------- render ----------
  const tabela = criarTabela({
    linhas: [], colunas: visao.colunas, densidade: visao.densidade, ctx: ctx(), ordem: visao.ordem, selecionados, foco,
    aoOrdenar: (campo, mais) => alterar({ ordem: alternarOrdem(visao.ordem, campo, mais) }),
    aoSelecionar: (id, m) => selecionar([id], m),
    aoGrupo: (chave) => { const n = new Set(recolhidos); n.has(chave) ? n.delete(chave) : n.add(chave); recolhidos = n; void d.armazem.gravarRecolhidos([...n]).catch(() => undefined); renderConteudo(); },
    aoMarcarGrupo: (ids, m) => selecionar(ids, m),
  });

  function renderConteudo() {
    const lista = ordenados();
    if (visao.modo === 'quadro') {
      conteudo.replaceChildren(desenharQuadro({ processos: lista, cfg: visao.quadro, ctx: ctx(), extras, selecionados, aoMover: (i, a, b) => void mover(i, a, b), aoSelecionar: (i, m) => selecionar([i], m) }));
      return;
    }
    const grupos = agrupar(lista, visao.agrupar, ctx());
    tabela.atualizar({
      linhas: achatar(grupos, recolhidos, visao.agrupar !== 'nenhum'), colunas: visao.colunas, densidade: visao.densidade, ctx: ctx(), ordem: visao.ordem, selecionados, foco,
      aoOrdenar: (campo, mais) => alterar({ ordem: alternarOrdem(visao.ordem, campo, mais) }),
      aoSelecionar: (id, m) => selecionar([id], m),
      aoGrupo: (chave) => { const n = new Set(recolhidos); n.has(chave) ? n.delete(chave) : n.add(chave); recolhidos = n; void d.armazem.gravarRecolhidos([...n]).catch(() => undefined); renderConteudo(); },
      aoMarcarGrupo: (ids, m) => selecionar(ids, m),
    });
    if (conteudo.firstElementChild !== tabela.el) conteudo.replaceChildren(tabela.el);
  }

  function renderStatus(n: number) {
    const partes = [`${n} de ${todos.length} processo${todos.length === 1 ? '' : 's'}`];
    const totalSei = d.inicial.totais.recebidos + d.inicial.totais.gerados;
    if (carregando && progresso) partes.push(`carregando ${progresso.grupo} (${progresso.paginasLidas}/${progresso.paginasTotal})…`);
    else if (!completo && totalSei > todos.length) partes.push(`o SEI informa ${totalSei}; os demais não foram carregados`);
    if (erroCarga) partes.push(`aviso: ${erroCarga}`);
    status.replaceChildren(partes.join(' · '));
    status.classList.toggle('spro-status-alerta', !!erroCarga || (!completo && !carregando && totalSei > todos.length));
  }

  function renderLote() {
    const n = selecionados.size;
    lote.hidden = n === 0;
    if (!n) return lote.replaceChildren();
    const visiveis = new Set(filtrados().map((p) => p.id));
    const fora = [...selecionados].filter((id) => !visiveis.has(id)).length;
    lote.replaceChildren(
      h('strong', {}, `${n} selecionado${n === 1 ? '' : 's'}`),
      ...(fora ? [h('span', { class: 'spro-suave' }, `(${fora} fora do filtro atual)`)] : []),
      ...d.acoes().map((a) => h('button', { type: 'button', class: 'spro-bt', title: a.rotulo, onclick: () => { const r = executarAcaoNativa(a, selecionados.size); if (!r.ok && r.motivo) aviso(r.motivo); } }, h('img', { src: a.icone, alt: '', width: '16', height: '16' }), h('span', {}, a.rotulo))),
      h('button', { type: 'button', class: 'spro-link', onclick: () => selecionar([...selecionados], false) }, 'Limpar seleção'));
  }

  function renderChips() {
    const c = interpretar(visao.busca);
    chips.replaceChildren(...c.tokens.map((t) => h('span', { class: `spro-chip${t.termo.negado ? ' spro-chip-neg' : ''}` }, t.texto, h('button', { type: 'button', 'aria-label': `Remover ${t.texto}`, onclick: () => { alterar({ busca: remover(visao.busca, t.texto) }); busca.value = visao.busca; } }, '×'))));
    chips.hidden = !c.tokens.length;
    const ativos = new Set(c.tokens.map((t) => t.texto));
    rapidos.replaceChildren(...FILTROS_RAPIDOS.map(([rotulo, termo]) => h('button', { type: 'button', class: `spro-rapido${ativos.has(termo) ? ' spro-rapido-on' : ''}`, 'aria-pressed': String(ativos.has(termo)), onclick: () => { alterar({ busca: ativos.has(termo) ? remover(visao.busca, termo) : `${visao.busca} ${termo}`.trim() }); busca.value = visao.busca; } }, rotulo)));
  }

  function preencherFiltro(sel: HTMLSelectElement, titulo: string, campo: 'resp' | 'tipo' | 'marcador', itens: Array<{ valor: string; rotulo: string; n: number }>) {
    const atual = sel.querySelector('option[selected]')?.getAttribute('value') ?? '';
    sel.replaceChildren(h('option', { value: '' }, titulo), ...itens.map((f) => h('option', { value: f.valor }, `${f.rotulo} (${f.n})`)));
    escolher(sel, itens.some((f) => f.valor === atual) ? atual : '');
    sel.onchange = () => {
      const v = sel.value;
      if (!v) return;
      alterar({ busca: acrescentar(visao.busca, campo, v) });
      busca.value = visao.busca;
      escolher(sel, '');
    };
  }

  function render() {
    if (encerrado) return;
    const f = facetasDe(comId(), ctx());
    preencherFiltro(fResp, 'Responsável…', 'resp', f.responsaveis);
    preencherFiltro(fTipo, 'Tipo…', 'tipo', f.tipos);
    preencherFiltro(fMarc, 'Marcador…', 'marcador', f.marcadores);
    escolher(selAgrupar, visao.agrupar);
    selAgrupar.disabled = visao.modo === 'quadro';
    escolher(selOrdem, visao.ordem[0] ? `${visao.ordem[0].campo}:${visao.ordem[0].decrescente ? 'd' : 'a'}` : '');
    for (const b of segmentado.querySelectorAll<HTMLElement>('[data-modo]')) b.setAttribute('aria-pressed', String(b.getAttribute('data-modo') === visao.modo));
    btnDensidade.title = visao.densidade === 'compacta' ? 'Linhas confortáveis' : 'Linhas compactas';
    btnColunas.hidden = visao.modo === 'quadro';
    renderQuadroCfg();
    renderChips();
    renderConteudo();
    renderStatus(filtrados().length);
    renderLote();
    if (visao.modo === 'quadro' && !extrasPedido && d.extras) {
      extrasPedido = true;
      void d.extras().then((e) => { extras = e; if (!encerrado) renderConteudo(); }).catch(() => undefined);
    }
  }

  function renderQuadroCfg() {
    opcoesQuadro.hidden = visao.modo !== 'quadro';
    if (opcoesQuadro.hidden) return;
    const q = visao.quadro;
    const sel = h('select', { class: 'spro-sel-campo', 'aria-label': 'Colunas do quadro', onchange: (ev: Event) => { extrasPedido = false; alterar({ quadro: { ...q, colunas: (ev.target as HTMLSelectElement).value as typeof q.colunas } }); } },
      ...([['marcador', 'Colunas: marcador'], ['responsavel', 'Colunas: responsável'], ['prazo', 'Colunas: prazo (leitura)'], ['tipo', 'Colunas: tipo (leitura)']] as const).map(([v, t]) => h('option', { value: v }, t)));
    escolher(sel, q.colunas);
    const lim = h('input', { type: 'number', min: '0', max: '99', class: 'spro-num', value: String(q.limite), 'aria-label': 'Limite de cartões por coluna (0 = sem limite)', title: 'Limite de cartões por coluna (0 = sem limite)', onchange: (ev: Event) => alterar({ quadro: { ...q, limite: Math.max(0, Math.min(99, Number((ev.target as HTMLInputElement).value) || 0)) } }) });
    const raia = h('input', { type: 'checkbox', onchange: (ev: Event) => alterar({ quadro: { ...q, raiasPorResponsavel: (ev.target as HTMLInputElement).checked } }) });
    raia.checked = q.raiasPorResponsavel;
    opcoesQuadro.replaceChildren(sel, h('label', { class: 'spro-rotulo-inline' }, 'Limite ', lim), h('label', { class: 'spro-rotulo-inline' }, raia, ' Raias por responsável'),
      h('span', { class: 'spro-suave' }, q.colunas === 'marcador' || q.colunas === 'responsavel' ? 'Arraste os cartões entre as colunas.' : 'Esta divisão é só de leitura.'));
  }

  // ---------- painéis (colunas e visões) ----------
  function abrirPainel(qual: 'colunas' | 'visoes') {
    if (!painel.hidden && painel.getAttribute('data-qual') === qual) { painel.hidden = true; return; }
    painel.setAttribute('data-qual', qual);
    painel.hidden = false;
    if (qual === 'colunas') {
      painel.replaceChildren(h('strong', {}, 'Colunas'), ...COLUNAS.map((c) => {
        const cb = h('input', { type: 'checkbox', disabled: c === 'processo' });
        cb.checked = visao.colunas.includes(c);
        cb.addEventListener('change', () => {
          const novas = cb.checked ? COLUNAS.filter((x) => x === c || visao.colunas.includes(x)) : visao.colunas.filter((x) => x !== c);
          alterar({ colunas: novas as Coluna[] });
        });
        return h('label', { class: 'spro-rotulo-linha' }, cb, ` ${ROTULO_COLUNA[c]}`);
      }), h('button', { type: 'button', class: 'spro-link', onclick: () => alterar({ colunas: visaoPadrao().colunas }) }, 'Restaurar padrão'));
      return;
    }
    const nome = h('input', { type: 'text', class: 'spro-nome', maxlength: '40', placeholder: 'Nome da visão', 'aria-label': 'Nome da visão' });
    const atual = salvas.find((v) => v.id === visaoSalvaId);
    nome.value = atual?.nome ?? '';
    const gravar = async (lista: Visao[], anteriores = salvas) => { salvas = lista; await d.armazem.gravarVisoes(lista, anteriores).catch(() => aviso('Não foi possível sincronizar as visões.')); };
    const salvar = async (como: 'nova' | 'atualizar') => {
      const base = { ...visao, nome: nome.value.trim() || 'Minha visão', id: como === 'atualizar' ? visaoSalvaId : '' };
      const r = salvarVisao(salvas, base, d.novoId);
      if (!r) return aviso('Limite de visões salvas atingido.');
      visaoSalvaId = r.visao.id;
      await gravar(r.lista);
      aviso(`Visão "${r.visao.nome}" salva.`);
      abrirPainel('visoes'); abrirPainel('visoes');
    };
    painel.replaceChildren(
      h('strong', {}, 'Visões salvas'),
      salvas.length ? h('ul', { class: 'spro-lista-visoes' }, ...salvas.map((v) => h('li', {},
        h('button', { type: 'button', class: `spro-link${v.id === visaoSalvaId ? ' spro-ativa' : ''}`, onclick: () => { visaoSalvaId = v.id; busca.value = v.busca; alterar({ ...v, id: '' }); } }, v.nome),
        h('button', { type: 'button', class: 'spro-aviso-x', 'aria-label': `Excluir ${v.nome}`, title: 'Excluir', onclick: async () => { await gravar(excluirVisao(salvas, v.id), salvas); if (visaoSalvaId === v.id) visaoSalvaId = ''; abrirPainel('visoes'); abrirPainel('visoes'); } }, '×')))) : h('p', { class: 'spro-suave' }, 'Nenhuma visão salva ainda.'),
      h('div', { class: 'spro-linha-form' }, nome,
        h('button', { type: 'button', class: 'spro-bt', onclick: () => void salvar('nova') }, 'Salvar como nova'),
        atual && mudouDe(visao, atual) ? h('button', { type: 'button', class: 'spro-bt', onclick: () => void salvar('atualizar') }, 'Atualizar') : null));
  }

  function exportar() {
    const linhas = linhasCsv(ordenados(), visao.modo === 'quadro' ? [...COLUNAS] : visao.colunas, ctx());
    d.baixar(nomeArquivo(d.hoje()), gerarCsv(linhas), 'text/csv;charset=utf-8');
    aviso(`${linhas.length - 1} processos exportados.`);
  }

  // ---------- eventos ----------
  busca.addEventListener('input', () => {
    const v = busca.value;
    if (d.semDebounce) return alterar({ busca: v });
    clearTimeout(buscaTimer);
    buscaTimer = setTimeout(() => alterar({ busca: v }), 120);
  });
  busca.addEventListener('keydown', (ev) => {
    if (ev.key === 'Escape') { busca.value = ''; alterar({ busca: '' }); busca.blur(); }
  });

  function aoTeclar(ev: KeyboardEvent) {
    if (encerrado || ev.ctrlKey || ev.metaKey || ev.altKey) return;
    const alvo = ev.target as HTMLElement | null;
    const digitando = alvo && (/^(input|textarea|select)$/i.test(alvo.tagName) || alvo.isContentEditable);
    if (digitando || host.hidden) return;
    const k = ev.key;
    if (aguardandoG) {
      aguardandoG = false;
      if (k === 't') alterar({ modo: 'tabela' });
      else if (k === 'q') alterar({ modo: 'quadro' });
      return;
    }
    const ids = ordenados().map((p) => p.id);
    const i = foco ? ids.indexOf(foco) : -1;
    if (k === '/') { ev.preventDefault(); busca.focus(); }
    else if (k === '?') ajuda.hidden = !ajuda.hidden;
    else if (k === 'g') aguardandoG = true;
    else if (k === 'Escape') { if (selecionados.size) selecionar([...selecionados], false); }
    else if ((k === 'j' || k === 'k') && visao.modo === 'tabela' && ids.length) {
      foco = ids[Math.max(0, Math.min(ids.length - 1, i + (k === 'j' ? 1 : -1)))]!;
      renderConteudo();
      tabela.mostrar(foco);
    } else if (k === 'x' && foco) {
      const p = todos.find((x) => x.id === foco);
      if (p?.naPaginaAtual) selecionar([foco], !selecionados.has(foco));
    } else if (k === 'Enter' && foco) {
      const link = todos.find((x) => x.id === foco)?.link;
      if (link) doc.defaultView?.location.assign(link);
    }
  }
  doc.addEventListener('keydown', aoTeclar);
  const pararSelecao = observarSelecao(doc, (ids) => { selecionados = ids; renderLote(); renderConteudo(); });
  const pararVisoes = d.armazem.aoMudarVisoes(() => void d.armazem.lerVisoes().then((v) => { salvas = v; }).catch(() => undefined));

  // ---------- partida ----------
  async function carregarTudo() {
    if (!d.fonte) { completo = true; return finalizarCarga(true); }
    carregando = true;
    render();
    const r = await carregarRestante(d.inicial, d.fonte, {
      sinal: ctl.signal,
      aoProgresso: (p) => { progresso = p; renderStatus(filtrados().length); },
      aoPagina: (novos) => { todos = [...todos, ...novos]; render(); },
    });
    carregando = false;
    completo = r.completo;
    if (r.erro) erroCarga = r.erro;
    finalizarCarga(r.completo);
  }
  function finalizarCarga(completa: boolean) {
    idade = registrarVistos(idade, todos.map((p) => p.id), d.agora(), completa);
    void d.armazem.gravarIdade(idade).catch(() => undefined);
    render();
  }

  async function iniciar() {
    try {
      const e = await d.armazem.lerEstado();
      visao = e.visao; recolhidos = new Set(e.recolhidos);
      idade = abrirVisita(e.idade, d.agora());
      visitaAnterior = idade.visitaAnterior;
      salvas = await d.armazem.lerVisoes();
    } catch { /* sem preferências legíveis: segue com o padrão */ }
    idade = registrarVistos(idade, todos.map((p) => p.id), d.agora(), false);
    busca.value = visao.busca;
    render();
    void carregarTudo();
  }

  return {
    host,
    iniciar,
    render,
    estado: () => ({ visao, todos, selecionados, completo, carregando, filtrados: filtrados().length }),
    definirVisao: (v: Partial<Visao>) => { visao = { ...visao, ...v }; busca.value = visao.busca; render(); },
    fechar() {
      encerrado = true;
      ctl.abort();
      clearTimeout(buscaTimer); clearTimeout(gravarTimer);
      doc.removeEventListener('keydown', aoTeclar);
      pararSelecao(); pararVisoes();
      host.remove();
    },
    mostrar: (v: boolean) => { host.hidden = !v; },
  };
}

export type App = ReturnType<typeof criarApp>;
export type { Processo };
