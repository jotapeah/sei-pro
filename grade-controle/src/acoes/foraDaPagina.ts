/**
 * Acao em lote do SEI sobre processos que vieram da paginacao (nao estao na tabela nativa da tela).
 *
 * O SEI 4.1+/5 valida em todo POST em lote o par `hdn<Grupo>Itens` + `hdn<Grupo>ItensHash`: o hash so o servidor gera
 * e cobre os ids DAQUELA pagina, e todo id selecionado precisa constar no conjunto. Por isso um POST so aceita
 * processos de UMA pagina por grupo (Recebidos e Gerados tem paginacao propria e podem vir de paginas diferentes).
 * Guardamos o par de cada pagina que lemos e montamos o POST com o par certo, igual ao que a tela nativa envia.
 */
import type { Grupo, Processo, SelecaoDaPagina } from '../modelo/tipos';

const NOME: Record<Grupo, string> = { recebidos: 'Recebidos', gerados: 'Gerados' };

export const chavePagina = (grupo: Grupo, pagina: number): string => `${grupo}:${pagina}`;

export interface PlanoAcao {
  /** Por grupo: ids marcados e o par da pagina de onde vem. */
  porGrupo: Partial<Record<Grupo, { ids: string[]; pagina: number; selecao: SelecaoDaPagina }>>;
  /** Todos estao na pagina que o usuario esta vendo: vale o caminho nativo (clicar no botao). */
  todosNaPaginaAtual: boolean;
}

export type ResultadoPlano = { ok: true; plano: PlanoAcao } | { ok: false; motivo: string };

export function planejarAcao(selecionados: readonly Processo[], selecoes: ReadonlyMap<string, SelecaoDaPagina>): ResultadoPlano {
  const porGrupo: PlanoAcao['porGrupo'] = {};
  for (const grupo of ['recebidos', 'gerados'] as const) {
    const doGrupo = selecionados.filter((p) => p.grupo === grupo);
    if (!doGrupo.length) continue;
    const paginas = [...new Set(doGrupo.map((p) => p.pagina))].sort((a, b) => a - b);
    if (paginas.length > 1) {
      const nomes = paginas.map((n) => n + 1).join(' e ');
      return { ok: false, motivo: `O SEI só aceita, de uma vez, processos de uma mesma página em ${NOME[grupo]} (marcados nas páginas ${nomes}). Deixe só uma página marcada.` };
    }
    const pagina = paginas[0]!;
    const selecao = selecoes.get(chavePagina(grupo, pagina));
    if (!selecao?.itens || !selecao.hash) return { ok: false, motivo: `Os dados da página ${pagina + 1} de ${NOME[grupo]} ainda não foram lidos. Espere o carregamento terminar.` };
    porGrupo[grupo] = { ids: doGrupo.map((p) => p.id), pagina, selecao };
  }
  return { ok: true, plano: { porGrupo, todosNaPaginaAtual: selecionados.every((p) => p.naPaginaAtual) } };
}

/** Os pares de campos que mudam no POST (o resto do formulario vai como a tela nativa o enviaria). */
export function camposDoPlano(plano: PlanoAcao): Record<string, string> {
  const c: Record<string, string> = {};
  for (const grupo of ['recebidos', 'gerados'] as const) {
    const g = plano.porGrupo[grupo];
    const n = NOME[grupo];
    c[`hdn${n}ItemId`] = '';
    if (!g) {
      c[`hdn${n}ItensSelecionados`] = '';
      continue;
    }
    c[`hdn${n}ItensSelecionados`] = g.ids.join(',');
    c[`hdn${n}Itens`] = g.selecao.itens;
    c[`hdn${n}ItensHash`] = g.selecao.hash;
  }
  return c;
}

/** Envia a acao: um formulario a parte, com os campos da tela nativa e os do plano por cima, no mesmo `action` do botao. */
export function enviarAcao(doc: Document, urlAcao: string, plano: PlanoAcao): void {
  const nativo = doc.getElementById('frmProcedimentoControlar') as HTMLFormElement | null;
  if (!nativo) throw new Error('Formulário do Controle de Processos não encontrado.');
  const f = doc.createElement('form');
  f.setAttribute('method', 'post');
  f.setAttribute('action', urlAcao);
  f.style.display = 'none';
  const campos = new Map<string, string>();
  for (const el of Array.from(nativo.querySelectorAll<HTMLInputElement>('input, select, textarea'))) {
    if (!el.name || el.disabled || el.type === 'checkbox' || el.type === 'radio' || el.type === 'button' || el.type === 'submit') continue;
    campos.set(el.name, el.value);
  }
  for (const [k, v] of Object.entries(camposDoPlano(plano))) campos.set(k, v);
  for (const [nome, valor] of campos) {
    const i = doc.createElement('input');
    i.setAttribute('type', 'hidden');
    i.setAttribute('name', nome);
    i.setAttribute('value', valor);
    f.append(i);
  }
  doc.body.append(f);
  f.submit();
}

/** A mesma trava do SEI: acao que nao aceita sigiloso recusa se algum marcado e sigiloso. */
export const temSigiloso = (selecionados: readonly Processo[]): boolean => selecionados.some((p) => p.sigiloso);
