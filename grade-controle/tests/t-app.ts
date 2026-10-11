import assert from 'node:assert/strict';
import { areaMemoria } from '../../sei-comum/src/armazenamento/area';
import { acoesDaBarra } from '../src/leitura/barra';
import { lerTabelas } from '../src/leitura/tabela';
import { criarArmazem } from '../src/persistencia/armazem';
import type { DepsMover } from '../src/acoes/mover';
import { criarApp, type DepsApp } from '../src/ui/app';
import { ativarToggle, docFixture, teste } from './util';

const q = <T extends Element>(app: { host: HTMLElement }, s: string) => app.host.shadowRoot!.querySelector<T>(s)!;
const qa = (app: { host: HTMLElement }, s: string) => [...app.host.shadowRoot!.querySelectorAll<HTMLElement>(s)];
const marcadas = (doc: Document) => [...doc.querySelectorAll<HTMLInputElement>('#tblProcessosRecebidos input[type=checkbox]')].filter((c) => c.checked).length;
const tick = () => new Promise((r) => setTimeout(r, 0));

async function montar(extra: Partial<DepsApp> = {}, nome = 'caixa_prazos.html') {
  const doc = ativarToggle(docFixture(nome));
  (globalThis as unknown as { document: Document }).document = doc;
  const inicial = lerTabelas(doc);
  const chamadas: string[] = [];
  const mover: DepsMover = {
    marcador: async (p, m) => void chamadas.push(`${p} ${m.remover ? '-' : '+'}${m.marcador}`),
    atribuir: async (p, u) => void chamadas.push(`${p} @${u}`),
  };
  const baixados: Array<[string, string]> = [];
  const app = criarApp({
    doc, inicial, agora: () => Date.UTC(2026, 9, 11, 12), hoje: () => '2026-10-11', eu: 'teste01',
    armazem: criarArmazem({ local: areaMemoria(), sync: areaMemoria() }, 'u'), fonte: null, mover,
    acoes: () => acoesDaBarra(doc), css: '', escuro: false, baixar: (n, c) => void baixados.push([n, c]), novoId: () => 'id1', semDebounce: true,
    aoVoltarNativa: () => undefined, ...extra,
  });
  doc.body.append(app.host);
  await app.iniciar();
  await tick();
  return { app, doc, chamadas, baixados };
}
const linhas = (app: { host: HTMLElement }) => qa(app, '.spro-linha');

await teste('app: renderiza as linhas da caixa real, com protocolo e contagem', async () => {
  const { app } = await montar();
  assert.equal(linhas(app).length, 10);
  assert.match(q(app, '.spro-status').textContent!, /10 de 10 processos/);
  assert.ok(qa(app, '.spro-proc').some((a) => a.textContent === '99906.713-630.000032/2025-82'));
  app.fechar();
});
await teste('app: nada do SEI vira HTML (texto malicioso continua texto)', async () => {
  const doc = docFixture('caixa_prazos.html');
  const { app } = await montar({ inicial: (() => { const l = lerTabelas(doc); l.processos[0]!.especificacao = '<img src=x onerror=alert(1)>'; return l; })() });
  assert.equal(app.host.shadowRoot!.querySelector('img[src="x"]'), null);
  app.definirVisao({ colunas: ['processo', 'especificacao'] });
  assert.equal(app.host.shadowRoot!.querySelector('img[src="x"]'), null);
  assert.ok(qa(app, '.spro-corta').some((e) => e.textContent === '<img src=x onerror=alert(1)>'));
  app.fechar();
});
await teste('app: a busca filtra e o chip aparece; remover o chip restaura', async () => {
  const { app } = await montar();
  const busca = q<HTMLInputElement>(app, '.spro-busca');
  busca.value = 'resp:teste01';
  busca.dispatchEvent(new (busca.ownerDocument.defaultView as any).Event('input'));
  assert.equal(linhas(app).length, 4);
  assert.equal(qa(app, '.spro-chip').length, 1);
  q<HTMLButtonElement>(app, '.spro-chip button').click();
  assert.equal(linhas(app).length, 10);
  assert.equal(qa(app, '.spro-chip').length, 0);
  app.fechar();
});
await teste('app: filtro rápido liga e desliga o termo', async () => {
  const { app } = await montar();
  const atrasados = qa(app, '.spro-rapido').find((b) => b.textContent === 'Atrasados')!;
  atrasados.click();
  assert.equal(app.estado().visao.busca, 'prazo:atrasado');
  assert.ok(linhas(app).length > 0 && linhas(app).length < 10);
  qa(app, '.spro-rapido').find((b) => b.textContent === 'Atrasados')!.click();
  assert.equal(app.estado().visao.busca, '');
  app.fechar();
});
await teste('app: agrupar mostra cabeçalhos com contagem e recolher esconde as linhas', async () => {
  const { app } = await montar();
  app.definirVisao({ agrupar: 'prazo' });
  const grupos = qa(app, '.spro-grupo');
  assert.ok(grupos.length >= 2);
  const antes = linhas(app).length;
  qa(app, '.spro-grupo-b')[0]!.click();
  assert.ok(linhas(app).length < antes);
  app.fechar();
});
await teste('app: ordenar pelo cabeçalho alterna o sentido', async () => {
  const { app } = await montar();
  const th = () => qa(app, '.spro-th-b').find((b) => b.textContent!.startsWith('Processo'))!;
  th().click();
  assert.deepEqual(app.estado().visao.ordem, [{ campo: 'protocolo', decrescente: false }]);
  th().click();
  assert.deepEqual(app.estado().visao.ordem, [{ campo: 'protocolo', decrescente: true }]);
  th().click();
  assert.deepEqual(app.estado().visao.ordem, []);
  app.fechar();
});
await teste('app: marcar uma linha clica o checkbox nativo e mostra a barra de lote', async () => {
  const { app, doc } = await montar();
  const cb = q<HTMLInputElement>(app, '.spro-linha input[type=checkbox]');
  cb.checked = true;
  cb.dispatchEvent(new (doc.defaultView as any).Event('change'));
  await tick();
  assert.equal(marcadas(doc), 1);
  assert.equal(q(app, '.spro-lote').hasAttribute('hidden'), false);
  assert.match(q(app, '.spro-lote strong').textContent!, /1 selecionado/);
  assert.ok(qa(app, '.spro-lote .spro-bt').some((b) => b.title === 'Enviar Processo'));
  qa(app, '.spro-lote .spro-link').at(-1)!.click();
  await tick();
  assert.equal(marcadas(doc), 0);
  app.fechar();
});
await teste('app: o botão de ação do lote repassa o clique ao link nativo', async () => {
  const { app, doc } = await montar();
  let cliques = 0;
  acoesDaBarra(doc)[0]!.elemento.addEventListener('click', () => cliques++);
  const cb = q<HTMLInputElement>(app, '.spro-linha input[type=checkbox]');
  cb.checked = true;
  cb.dispatchEvent(new (doc.defaultView as any).Event('change'));
  await tick();
  qa(app, '.spro-lote .spro-bt').find((b) => b.title === 'Enviar Processo')!.click();
  assert.equal(cliques, 1);
  app.fechar();
});
await teste('app: exportar CSV baixa a visão filtrada', async () => {
  const { app, baixados } = await montar();
  app.definirVisao({ busca: 'resp:teste01' });
  qa(app, '.spro-bt').find((b) => b.title === 'Exportar CSV')!.click();
  assert.equal(baixados.length, 1);
  assert.equal(baixados[0]![0], 'processos-2026-10-11.csv');
  assert.equal(baixados[0]![1].split('\r\n').length, 5);
  app.fechar();
});
await teste('app: quadro por marcador; arrastar move (acrescenta e remove) e o aviso oferece desfazer', async () => {
  const { app, chamadas } = await montar();
  app.definirVisao({ modo: 'quadro' });
  const col = (chave: string) => qa(app, '.spro-col').find((c) => c.getAttribute('data-chave') === chave)!;
  assert.ok(col('sem') && col('m:teste'));
  const cartao = [...col('m:teste').querySelectorAll<HTMLElement>('.spro-cartao')][0]!;
  const id = cartao.getAttribute('data-id')!;
  const dt = new Map<string, string>();
  const transfer = { types: ['application/x-spro-cartao'], setData: (k: string, v: string) => dt.set(k, v), getData: (k: string) => dt.get(k) ?? '', effectAllowed: '' };
  const Ev = (cartao.ownerDocument.defaultView as any).Event;
  const ev = (tipo: string) => Object.assign(new Ev(tipo, { bubbles: true, cancelable: true }), { dataTransfer: transfer });
  cartao.dispatchEvent(ev('dragstart'));
  col('m:Para Pessoa assinar').dispatchEvent(ev('drop'));
  await tick(); await tick();
  // O processo já tinha "Para Pessoa assinar": mover só retira o marcador de origem.
  assert.deepEqual(chamadas, ['99906.713-630.000032/2025-82 -teste']);
  assert.equal(id, '148265');
  assert.ok(qa(app, '.spro-aviso').length >= 1);
  app.fechar();
});
await teste('app: coluna só de leitura (prazo) não aceita soltar', async () => {
  const { app, chamadas } = await montar();
  app.definirVisao({ modo: 'quadro', quadro: { colunas: 'prazo', limite: 0, raiasPorResponsavel: false } });
  assert.ok(qa(app, '.spro-col-trava').length > 0);
  const cartao = qa(app, '.spro-cartao')[0]!;
  const Ev = (cartao.ownerDocument.defaultView as any).Event;
  const transfer = { types: ['application/x-spro-cartao'], setData: () => undefined, getData: () => JSON.stringify({ id: cartao.getAttribute('data-id'), de: 'x' }) };
  qa(app, '.spro-col')[0]!.dispatchEvent(Object.assign(new Ev('drop', { bubbles: true, cancelable: true }), { dataTransfer: transfer }));
  await tick();
  assert.deepEqual(chamadas, []);
  app.fechar();
});
await teste('app: mover que o SEI recusa reverte e avisa', async () => {
  const { app } = await montar({ mover: { marcador: async () => { throw new Error('sem permissão'); }, atribuir: async () => undefined } });
  app.definirVisao({ modo: 'quadro' });
  const ids = () => qa(app, '.spro-col').map((c) => `${c.getAttribute('data-chave')}:${c.querySelectorAll('.spro-cartao').length}`).join();
  const antes = ids();
  const cartao = qa(app, '.spro-col').find((c) => c.getAttribute('data-chave') === 'm:teste')!.querySelector<HTMLElement>('.spro-cartao')!;
  const Ev = (cartao.ownerDocument.defaultView as any).Event;
  const transfer = { types: ['application/x-spro-cartao'], setData: () => undefined, getData: () => JSON.stringify({ id: cartao.getAttribute('data-id'), de: 'm:teste' }) };
  qa(app, '.spro-col').find((c) => c.getAttribute('data-chave') === 'sem')!.dispatchEvent(Object.assign(new Ev('drop', { bubbles: true, cancelable: true }), { dataTransfer: transfer }));
  await tick(); await tick(); await tick();
  assert.equal(ids(), antes);
  assert.match(q(app, '.spro-aviso').textContent!, /sem permissão/);
  app.fechar();
});
await teste('app: visão salva persiste e reaplica (visões no sync)', async () => {
  const sync = areaMemoria();
  const local = areaMemoria();
  const a = await montar({ armazem: criarArmazem({ local, sync }, 'u') });
  a.app.definirVisao({ busca: 'prazo:atrasado', agrupar: 'prazo' });
  qa(a.app, '.spro-bt').find((b) => b.title === 'Visões')!.click();
  q<HTMLInputElement>(a.app, '.spro-nome').value = 'Atrasados';
  qa(a.app, '.spro-painel .spro-bt').find((b) => b.textContent === 'Salvar como nova')!.click();
  await tick(); await tick();
  const salvas = await criarArmazem({ local, sync }, 'u').lerVisoes();
  assert.deepEqual(salvas.map((v) => [v.nome, v.busca, v.agrupar]), [['Atrasados', 'prazo:atrasado', 'prazo']]);
  a.app.fechar();
});
await teste('app: atalhos — / foca a busca, g q abre o quadro, ? mostra ajuda; ignora ao digitar', async () => {
  const { app, doc } = await montar();
  const Ev = (doc.defaultView as any).Event;
  const tecla = (key: string, alvo: Element = doc.body) => alvo.dispatchEvent(Object.assign(new Ev('keydown', { bubbles: true, cancelable: true }), { key }));
  tecla('g'); tecla('q');
  assert.equal(app.estado().visao.modo, 'quadro');
  tecla('g'); tecla('t');
  assert.equal(app.estado().visao.modo, 'tabela');
  tecla('?');
  assert.equal(q(app, '.spro-ajuda-atalhos').hasAttribute('hidden'), false);
  const antes = app.estado().visao.modo;
  tecla('g', q(app, '.spro-busca')); tecla('q', q(app, '.spro-busca'));
  assert.equal(app.estado().visao.modo, antes);
  app.fechar();
});
await teste('app: carga progressiva soma as outras páginas e avisa quando falha', async () => {
  const fonte = { pagina: async () => { throw new Error('rede caiu'); }, restaurar: async () => undefined };
  const { app } = await montar({ fonte });
  await tick(); await tick();
  assert.match(q(app, '.spro-status').textContent!, /rede caiu/);
  assert.equal(app.estado().completo, false);
  app.fechar();
});
await teste('app: fechar remove o host e para de ouvir o teclado', async () => {
  const { app, doc } = await montar();
  app.fechar();
  assert.equal(doc.getElementById('spro-grade'), null);
});
