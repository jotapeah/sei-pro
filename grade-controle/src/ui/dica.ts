/**
 * Dica (tooltip) moderna no lugar do `title` nativo do navegador e do tooltip do SEI. Um unico balao, num Shadow DOM
 * proprio no fim do <html>, atende a grade inteira (inclusive o que mora dentro do Shadow DOM da grade, dos modais e
 * das listas) e o botao alternador do titulo. So age em elementos DA GRADE: o resto do SEI continua com os seus.
 *
 * O texto vem de `data-tip`. Quem ainda usa `title` e convertido na primeira vez que o mouse passa: o atributo sai
 * (o navegador nao mostra o dele) e o texto vira `data-tip`; sem nome acessivel, o `title` vira `aria-label`.
 */
export const ATRIBUTO_DICA = 'data-tip';
const ATRASO_MS = 350;
const CSS = `
:host { all: initial; }
.dica { position: fixed; z-index: 2147483647; max-width: 320px; padding: 6px 10px; font: 12px/1.45 system-ui, -apple-system, "Segoe UI", Roboto, sans-serif; color: #fff; white-space: pre-line; pointer-events: none; background: #1b1f24; border-radius: 8px; box-shadow: 0 6px 18px rgb(0 0 0 / 28%); opacity: 0; transform: translateY(2px); transition: opacity 120ms ease, transform 120ms ease; }
.dica.claro { color: #1b1f24; background: #fff; box-shadow: 0 6px 18px rgb(0 0 0 / 22%), 0 0 0 1px rgb(0 0 0 / 10%); }
.dica.on { opacity: 1; transform: none; }
.dica[hidden] { display: none; }
@media (prefers-reduced-motion: reduce) { .dica { transition: none; } }
`;

type Alvo = Element;

const ehElemento = (n: EventTarget): n is Element => (n as Node).nodeType === 1;

const daGrade = (caminho: EventTarget[]): boolean =>
  caminho.some((n) => ehElemento(n) && (n.id === 'spro-grade' || n.classList.contains('spro-grade-botao')));

export function acharDica(caminho: EventTarget[]): Alvo | null {
  if (!daGrade(caminho)) return null;
  for (const n of caminho) {
    if (!ehElemento(n)) continue;
    if (n.id === 'spro-grade') return null;
    if (n.hasAttribute(ATRIBUTO_DICA) || n.hasAttribute('title')) return n;
  }
  return null;
}

/** `title` -> `data-tip` (o navegador deixa de mostrar o dele). Devolve o texto. */
export function migrarTitulo(el: Element): string {
  const titulo = el.getAttribute('title');
  if (titulo) {
    if (!el.hasAttribute(ATRIBUTO_DICA)) el.setAttribute(ATRIBUTO_DICA, titulo);
    if (!el.hasAttribute('aria-label') && !(el.textContent ?? '').trim()) el.setAttribute('aria-label', titulo.split('\n')[0]!);
    el.removeAttribute('title');
  }
  return el.getAttribute(ATRIBUTO_DICA) ?? '';
}

export function posicionar(alvo: DOMRect, dica: { largura: number; altura: number }, janela: { w: number; h: number }): { x: number; y: number; acima: boolean } {
  const m = 8;
  let y = alvo.bottom + m;
  let acima = false;
  if (y + dica.altura > janela.h - 4 && alvo.top - m - dica.altura >= 4) {
    y = alvo.top - m - dica.altura;
    acima = true;
  }
  let x = alvo.left + alvo.width / 2 - dica.largura / 2;
  x = Math.max(4, Math.min(x, janela.w - dica.largura - 4));
  return { x: Math.round(x), y: Math.round(Math.max(4, y)), acima };
}

export function instalarDicas(doc: Document, escuro: () => boolean = () => false): () => void {
  const win = doc.defaultView;
  if (!win) return () => undefined;
  const host = doc.createElement('div');
  host.id = 'spro-dica-host';
  const sombra = host.attachShadow({ mode: 'open' });
  const estilo = doc.createElement('style');
  estilo.textContent = CSS;
  const balao = doc.createElement('div');
  balao.className = 'dica';
  balao.setAttribute('role', 'tooltip');
  balao.hidden = true;
  sombra.append(estilo, balao);
  doc.documentElement.append(host);

  let alvo: Alvo | null = null;
  let timer: ReturnType<typeof setTimeout> | undefined;

  function ocultar() {
    clearTimeout(timer);
    alvo = null;
    balao.classList.remove('on');
    balao.hidden = true;
  }
  function mostrar() {
    if (!alvo || !alvo.isConnected) return ocultar();
    const texto = migrarTitulo(alvo);
    if (!texto) return ocultar();
    balao.textContent = texto;
    balao.classList.toggle('claro', !escuro());
    balao.hidden = false;
    const r = alvo.getBoundingClientRect();
    const b = balao.getBoundingClientRect();
    const p = posicionar(r, { largura: b.width, altura: b.height }, { w: win!.innerWidth, h: win!.innerHeight });
    balao.style.left = `${p.x}px`;
    balao.style.top = `${p.y}px`;
    balao.classList.add('on');
  }
  const aoEntrar = (ev: Event) => {
    const el = acharDica(ev.composedPath());
    if (el === alvo) return;
    ocultar();
    if (!el) return;
    migrarTitulo(el); // tira o title ja: o balao nativo do navegador nao pode aparecer
    alvo = el;
    timer = setTimeout(mostrar, ATRASO_MS);
  };
  const aoSair = (ev: Event) => {
    if (!alvo) return;
    const para = (ev as PointerEvent).relatedTarget as Node | null;
    if (para && alvo.contains(para)) return;
    ocultar();
  };
  const aoFocar = (ev: Event) => {
    const el = acharDica(ev.composedPath());
    if (!el || !(el as HTMLElement).matches?.(':focus-visible')) return;
    ocultar();
    alvo = el;
    mostrar();
  };
  doc.addEventListener('pointerover', aoEntrar, true);
  doc.addEventListener('pointerout', aoSair, true);
  doc.addEventListener('focusin', aoFocar, true);
  doc.addEventListener('focusout', ocultar, true);
  doc.addEventListener('pointerdown', ocultar, true);
  doc.addEventListener('keydown', ocultar, true);
  doc.addEventListener('scroll', ocultar, true);
  return () => {
    ocultar();
    doc.removeEventListener('pointerover', aoEntrar, true);
    doc.removeEventListener('pointerout', aoSair, true);
    doc.removeEventListener('focusin', aoFocar, true);
    doc.removeEventListener('focusout', ocultar, true);
    doc.removeEventListener('pointerdown', ocultar, true);
    doc.removeEventListener('keydown', ocultar, true);
    doc.removeEventListener('scroll', ocultar, true);
    host.remove();
  };
}
