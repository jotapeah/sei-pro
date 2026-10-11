/** A tabela: cabeçalho ordenável, grupos recolhíveis e linhas virtualizadas (só as visíveis existem no DOM). */
import { h } from '../../../sei-comum/src/ui/dom';
import type { Ctx } from '../modelo/contexto';
import { diasNaCaixa, diasParado, resumoDoPrazo } from '../modelo/derivados';
import { sinaisDe, textoPrazo } from '../modelo/exportar';
import { DICA_IDADE, rotuloIdade } from '../modelo/idade';
import type { LinhaLista } from '../modelo/linhas';
import { calcularJanela } from '../modelo/janela';
import { type Coluna, type CampoOrdem, type CriterioOrdem, type Densidade, type Processo, ROTULO_COLUNA } from '../modelo/tipos';
import { corDoMarcador } from './cores';
import { iconeGrade } from './icones';

export const ALTURA: Record<Densidade, number> = { compacta: 34, confortavel: 48 };
const LARGURA: Record<Coluna, string> = {
  processo: 'minmax(220px, 240px)',
  tipo: 'minmax(120px, 1.2fr)',
  especificacao: 'minmax(140px, 1.6fr)',
  responsavel: 'minmax(90px, 130px)',
  marcadores: 'minmax(120px, 1.3fr)',
  prazo: 'minmax(120px, 150px)',
  anotacao: 'minmax(130px, 1.4fr)',
  caixa: '84px',
  parado: '84px',
  sinais: 'minmax(110px, 150px)',
};
export const ORDENAVEL: Partial<Record<Coluna, CampoOrdem>> = {
  processo: 'protocolo', tipo: 'tipo', responsavel: 'responsavel', marcadores: 'marcador', prazo: 'prazo', caixa: 'caixa', parado: 'parado', sinais: 'novo',
};

export interface PropsTabela {
  linhas: LinhaLista[];
  colunas: Coluna[];
  densidade: Densidade;
  ctx: Ctx;
  ordem: CriterioOrdem[];
  selecionados: ReadonlySet<string>;
  foco: string | null;
  aoOrdenar(campo: CampoOrdem, acrescentar: boolean): void;
  aoSelecionar(id: string, marcado: boolean): void;
  aoGrupo(chave: string): void;
  aoMarcarGrupo(ids: string[], marcado: boolean): void;
}

const el = (tag: 'div' | 'span', classe: string, texto?: string) => h(tag, { class: classe }, texto);

function celula(p: Processo, c: Coluna, ctx: Ctx): HTMLElement {
  const td = el('div', `spro-c spro-c-${c}`);
  switch (c) {
    case 'processo': {
      const a = h('a', { class: `spro-proc${p.naoVisualizado ? ' spro-novo' : ''}`, href: p.link ?? '#', title: 'Abrir o processo' }, p.protocolo);
      td.append(a);
      if (p.sigiloso) td.append(h('span', { class: 'spro-sigilo', title: 'Processo sigiloso' }, 'sigiloso'));
      break;
    }
    case 'tipo':
      td.append(el('span', 'spro-corta', p.tipo));
      td.title = p.tipo;
      break;
    case 'especificacao':
      td.append(el('span', 'spro-corta', p.especificacao));
      td.title = p.especificacao;
      break;
    case 'responsavel':
      if (p.atribuicao) {
        td.append(el('span', 'spro-corta', p.atribuicao.sigla));
        td.title = p.atribuicao.nome;
      }
      break;
    case 'marcadores':
      for (const m of p.marcadores) {
        const pil = h('span', { class: 'spro-marcador', title: m.texto ? `${m.nome}: ${m.texto}` : m.nome }, h('i', { style: `background:${corDoMarcador(m.cor)}` }), m.nome);
        td.append(pil);
      }
      break;
    case 'prazo': {
      const r = resumoDoPrazo(p, ctx);
      if (r) {
        td.append(el('span', `spro-prazo spro-prazo-${r.situacao}`, r.texto));
        td.title = `${textoPrazo(p, ctx)}\n${r.dica}`;
      }
      break;
    }
    case 'anotacao':
      if (p.anotacao) {
        td.append(el('span', `spro-corta${p.anotacao.prioridade ? ' spro-prio' : ''}`, p.anotacao.texto.replace(/\s*\n\s*/g, ' / ')));
        td.title = `${p.anotacao.texto}\n${p.anotacao.autor}`;
      }
      break;
    case 'caixa': {
      const t = rotuloIdade(diasNaCaixa(p, ctx));
      td.append(el('span', 'spro-suave', t));
      if (t) td.title = DICA_IDADE;
      break;
    }
    case 'parado': {
      const d = diasParado(p, ctx);
      td.append(el('span', 'spro-suave', rotuloIdade(d)));
      if (d !== null) td.title = 'Dias desde a última movimentação (visão detalhada do SEI).';
      break;
    }
    case 'sinais':
      for (const s of sinaisDe(p)) td.append(el('span', 'spro-sinal', s));
      break;
  }
  return td;
}

export function criarTabela(inicial: PropsTabela) {
  let p = inicial;
  const cabecalho = el('div', 'spro-cab');
  const corpo = el('div', 'spro-corpo');
  const rolagem = h('div', { class: 'spro-rolagem', tabindex: '-1' }, corpo);
  const raiz = h('div', { class: 'spro-tabela', role: 'table' }, cabecalho, rolagem);
  let ultimaChave = '';

  const modelo = () => `36px ${p.colunas.map((c) => LARGURA[c]).join(' ')}`;

  function desenharCabecalho() {
    cabecalho.replaceChildren();
    cabecalho.style.gridTemplateColumns = modelo();
    const todos = p.linhas.filter((l): l is Extract<LinhaLista, { tipo: 'processo' }> => l.tipo === 'processo' && l.processo.naPaginaAtual).map((l) => l.processo.id);
    const marcados = todos.filter((id) => p.selecionados.has(id)).length;
    const geral = h('input', { type: 'checkbox', class: 'spro-cb', 'aria-label': 'Marcar todos os processos visíveis', title: 'Marcar todos os visíveis (desta página do SEI)', disabled: !todos.length });
    geral.checked = todos.length > 0 && marcados === todos.length;
    geral.indeterminate = marcados > 0 && marcados < todos.length;
    geral.addEventListener('change', () => p.aoMarcarGrupo(todos, geral.checked));
    cabecalho.append(el('div', 'spro-c spro-c-cb'));
    cabecalho.firstElementChild!.append(geral);
    for (const c of p.colunas) {
      const campo = ORDENAVEL[c];
      const i = campo ? p.ordem.findIndex((o) => o.campo === campo) : -1;
      const celulaCab = h('div', { class: `spro-c spro-th${campo ? ' spro-ordenavel' : ''}`, role: 'columnheader', ...(i >= 0 ? { 'aria-sort': p.ordem[i]!.decrescente ? 'descending' : 'ascending' } : {}) });
      if (campo) {
        const b = h('button', { type: 'button', class: 'spro-th-b', title: 'Ordenar (Shift acrescenta outro critério)', onclick: (ev: Event) => p.aoOrdenar(campo, (ev as MouseEvent).shiftKey) }, ROTULO_COLUNA[c]);
        if (i >= 0) b.append(h('span', { class: 'spro-seta-ordem' }, `${p.ordem[i]!.decrescente ? '↓' : '↑'}${p.ordem.length > 1 ? i + 1 : ''}`));
        celulaCab.append(b);
      } else celulaCab.append(ROTULO_COLUNA[c]);
      cabecalho.append(celulaCab);
    }
  }

  function linhaProcesso(proc: Processo, grupo: string): HTMLElement {
    const sel = p.selecionados.has(proc.id);
    const cb = h('input', { type: 'checkbox', class: 'spro-cb', 'aria-label': `Marcar ${proc.protocolo}`, disabled: !proc.naPaginaAtual, title: proc.naPaginaAtual ? undefined : 'Este processo está em outra página do SEI; abra-o ou use o quadro para mover.' });
    cb.checked = sel;
    cb.addEventListener('change', () => p.aoSelecionar(proc.id, cb.checked));
    const tr = h('div', { class: `spro-linha${sel ? ' spro-sel' : ''}${p.foco === proc.id ? ' spro-foco' : ''}`, role: 'row', 'data-id': proc.id, 'data-grupo': grupo });
    tr.style.gridTemplateColumns = modelo();
    tr.style.height = `${ALTURA[p.densidade]}px`;
    const caixa = el('div', 'spro-c spro-c-cb');
    caixa.append(cb);
    tr.append(caixa, ...p.colunas.map((c) => celula(proc, c, p.ctx)));
    return tr;
  }

  function linhaGrupo(l: Extract<LinhaLista, { tipo: 'grupo' }>): HTMLElement {
    const ids = l.grupo.itens.filter((x) => x.naPaginaAtual).map((x) => x.id);
    const botao = h('button', { type: 'button', class: 'spro-grupo-b', 'aria-expanded': String(!l.recolhido), onclick: () => p.aoGrupo(l.grupo.chave) },
      h('span', { class: `spro-grupo-seta${l.recolhido ? ' spro-fechado' : ''}` }, iconeGrade('seta', 14)),
      h('span', { class: 'spro-grupo-nome' }, l.grupo.rotulo),
      h('span', { class: 'spro-grupo-n' }, String(l.grupo.itens.length)));
    const linha = h('div', { class: `spro-grupo${l.grupo.tom ? ` spro-tom-${l.grupo.tom}` : ''}`, role: 'row' }, botao);
    if (ids.length) {
      const todos = ids.every((id) => p.selecionados.has(id));
      linha.append(h('button', { type: 'button', class: 'spro-link', onclick: () => p.aoMarcarGrupo(ids, !todos) }, todos ? 'Desmarcar grupo' : 'Marcar grupo'));
    }
    linha.style.height = `${ALTURA[p.densidade]}px`;
    return linha;
  }

  function desenharJanela() {
    const altura = ALTURA[p.densidade];
    const j = calcularJanela(p.linhas.length, altura, rolagem.scrollTop || 0, rolagem.clientHeight || 0);
    corpo.style.paddingTop = `${j.antes}px`;
    corpo.style.paddingBottom = `${j.depois}px`;
    corpo.replaceChildren(...p.linhas.slice(j.inicio, j.fim).map((l) => (l.tipo === 'grupo' ? linhaGrupo(l) : linhaProcesso(l.processo, l.grupo))));
  }

  let quadro = 0;
  rolagem.addEventListener('scroll', () => {
    if (quadro) return;
    const win = rolagem.ownerDocument.defaultView;
    if (!win?.requestAnimationFrame) return desenharJanela();
    quadro = win.requestAnimationFrame(() => {
      quadro = 0;
      desenharJanela();
    });
  });

  function atualizar(novo: PropsTabela) {
    const mudouEstrutura = novo.colunas.join() !== p.colunas.join() || novo.ordem !== p.ordem || novo.selecionados !== p.selecionados;
    p = novo;
    const chave = `${p.colunas.join()}|${p.densidade}`;
    if (mudouEstrutura || chave !== ultimaChave) {
      desenharCabecalho();
      ultimaChave = chave;
    }
    if (!p.linhas.length) {
      corpo.style.paddingTop = corpo.style.paddingBottom = '0';
      corpo.replaceChildren(h('div', { class: 'spro-vazio' }, 'Nenhum processo corresponde ao filtro.'));
      return;
    }
    desenharJanela();
  }

  /** Rola até a linha (teclado) e devolve se existe. */
  function mostrar(id: string): boolean {
    const i = p.linhas.findIndex((l) => l.tipo === 'processo' && l.processo.id === id);
    if (i < 0) return false;
    const a = ALTURA[p.densidade];
    if (i * a < rolagem.scrollTop) rolagem.scrollTop = i * a;
    else if ((i + 1) * a > rolagem.scrollTop + rolagem.clientHeight && rolagem.clientHeight > 0) rolagem.scrollTop = (i + 1) * a - rolagem.clientHeight;
    desenharJanela();
    return true;
  }

  atualizar(inicial);
  return { el: raiz, atualizar, mostrar, rolagem };
}
