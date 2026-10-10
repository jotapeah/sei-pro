import assert from 'node:assert/strict';
import { formatarMarcador, lerMarcador } from '../src/modelo/marcador';
import { fundir } from '../src/modelo/fusao';
import { resumir } from '../src/modelo/situacao';
import type { PrazoNativo, PrazoProcesso } from '../src/modelo/tipos';

let n = 0;
async function teste(nome: string, fn: () => void | Promise<void>) { await fn(); console.log(`OK ${++n}: ${nome}`); }

// ---------------- Fase 1: marcador ----------------
await teste('marcador: "Até data hora texto" no formato que o SEI Pro escreve', () => {
  assert.deepEqual(lerMarcador('Ate 25/09/2026 23:59\nResponder ofício'), { data: '2026-09-25', hora: '23:59', vencimento: true, texto: 'Responder ofício' });
});
await teste('marcador: sem "ate" é data inicial; hora ausente fica indefinida', () => {
  assert.deepEqual(lerMarcador('01/10/2026'), { data: '2026-10-01', hora: undefined, vencimento: false, texto: '' });
});
await teste('marcador: "até" com acento e caixa alta; hora de um dígito', () => {
  assert.deepEqual(lerMarcador('ATÉ 5/10/2026 9:30'.replace('5/10', '05/10')), { data: '2026-10-05', hora: '09:30', vencimento: true, texto: '' });
});
await teste('marcador: "ate" dentro de outra palavra não é vencimento (o legado errava)', () => {
  assert.equal(lerMarcador('Atendimento 12/10/2026')?.vencimento, false);
  assert.equal(lerMarcador('Data limite 12/10/2026')?.vencimento, false);
});
await teste('marcador: data impossível ou ausente não é prazo', () => {
  assert.equal(lerMarcador('Ate 31/02/2026'), null);
  assert.equal(lerMarcador('Para Bruna assinar'), null);
  assert.equal(lerMarcador(''), null);
});
await teste('marcador: texto com data no meio guarda o resto sem a data', () => {
  assert.deepEqual(lerMarcador('Reunião em 30/10/2026 com a diretoria'), { data: '2026-10-30', hora: undefined, vencimento: false, texto: 'Reunião em com a diretoria' });
});
await teste('marcador: formatar e ler de volta é estável', () => {
  for (const p of [{ vencimento: true, data: '2026-12-31', hora: '08:00', texto: 'Enviar ao jurídico' }, { vencimento: false, data: '2026-01-02', texto: '' }]) {
    const txt = formatarMarcador(p);
    const volta = lerMarcador(txt)!;
    assert.equal(volta.data, p.data); assert.equal(volta.vencimento, p.vencimento); assert.equal(volta.texto, p.texto ?? '');
  }
  assert.equal(formatarMarcador({ vencimento: true, data: '2026-09-25', texto: 'Responder ofício' }), 'Ate 25/09/2026 23:59\nResponder ofício');
  assert.equal(formatarMarcador({ vencimento: false, data: '2026-09-25' }), '25/09/2026 23:59');
});

// ---------------- Fase 1: situação ----------------
const HOJE = '2026-10-10';
const venc = (v: string, extra: Partial<PrazoProcesso> = {}): PrazoProcesso => ({ idProcedimento: '1', origem: 'nativo', vencimento: v, ...extra });
await teste('situação: no prazo, hoje e atrasado, com singular e plural', () => {
  assert.deepEqual([resumir(venc('2026-10-11'), HOJE).texto, resumir(venc('2026-10-20'), HOJE).texto], ['vence em 1 dia', 'vence em 10 dias']);
  assert.equal(resumir(venc('2026-10-10'), HOJE).situacao, 'hoje');
  const a = resumir(venc('2026-10-09'), HOJE);
  assert.deepEqual([a.situacao, a.texto, a.ordem], ['atrasado', '1 dia de atraso', -1]);
  assert.equal(resumir(venc('2026-10-05'), HOJE).texto, '5 dias de atraso');
});
await teste('situação: sorter no contrato do legado, com hora do marcador ou 23:59', () => {
  assert.equal(resumir(venc('2026-10-20'), HOJE).sorter, '2026-10-20 23:59:00');
  assert.equal(resumir(venc('2026-10-20', { hora: '08:00' }), HOJE).sorter, '2026-10-20 08:00:00');
});
await teste('situação: data inicial mostra há quantos dias; sempre depois dos vencimentos na ordem', () => {
  const d = resumir({ idProcedimento: '1', origem: 'marcador', inicio: '2026-10-05' }, HOJE);
  assert.deepEqual([d.situacao, d.texto], ['desde', 'há 5 dias']);
  assert.ok(d.ordem > resumir(venc('2026-12-31'), HOJE).ordem);
  assert.equal(resumir({ idProcedimento: '1', origem: 'marcador', inicio: HOJE }, HOJE).texto, 'hoje');
});
await teste('situação: concluído é neutro e não conta como atrasado', () => {
  const c = resumir(venc('2026-10-01', { concluidoEm: '2026-10-08' }), HOJE);
  assert.deepEqual([c.situacao, c.texto], ['concluido', 'concluído em 08/10']);
  assert.equal(c.ordem, Number.MAX_SAFE_INTEGER);
});
await teste('situação: virada do dia à noite não antecipa o vencimento (data civil local)', () => {
  assert.equal(resumir(venc('2026-10-10'), '2026-10-10').situacao, 'hoje');
});
await teste('situação: a dica traz hora, texto e quem definiu', () => {
  const r = resumir(venc('2026-10-20', { hora: '14:00', texto: 'Responder', sigla: 'ana' }), HOJE);
  assert.match(r.dica, /Vence em 20\/10\/2026 às 14:00\./);
  assert.match(r.dica, /Responder/); assert.match(r.dica, /Definido por ana/);
});

// ---------------- Fase 1: fusão ----------------
const nat = (data: string, extra: Partial<PrazoNativo> = {}): PrazoNativo => ({ idControlePrazo: '9', idProcedimento: '1', sigla: 'ana', data, estado: 'noPrazo', ...extra });
await teste('fusão: sem nada, sem prazo', () => assert.equal(fundir('1', null, null), null));
await teste('fusão: só nativo', () => {
  assert.deepEqual(fundir('1', nat('2026-10-20')), { idProcedimento: '1', origem: 'nativo', vencimento: '2026-10-20', idControlePrazo: '9', sigla: 'ana' });
});
await teste('fusão: só marcador, vencimento ou data inicial', () => {
  assert.equal(fundir('1', null, { data: '2026-10-20', vencimento: true, texto: 'x', hora: '10:00' })?.vencimento, '2026-10-20');
  const d = fundir('1', null, { data: '2026-10-01', vencimento: false, texto: '' });
  assert.deepEqual([d?.inicio, d?.vencimento, d?.origem], ['2026-10-01', undefined, 'marcador']);
});
await teste('fusão: marcador de mesma data acrescenta hora e texto ao nativo', () => {
  const f = fundir('1', nat('2026-10-20'), { data: '2026-10-20', vencimento: true, hora: '14:00', texto: 'Responder' })!;
  assert.deepEqual([f.origem, f.vencimento, f.hora, f.texto, f.idControlePrazo], ['ambos', '2026-10-20', '14:00', 'Responder', '9']);
});
await teste('fusão: marcador de data diferente está defasado e não entra', () => {
  const f = fundir('1', nat('2026-10-25'), { data: '2026-10-20', vencimento: true, hora: '14:00', texto: 'velho' })!;
  assert.deepEqual([f.origem, f.vencimento, f.hora, f.texto], ['nativo', '2026-10-25', undefined, undefined]);
});
await teste('fusão: marcador "desde" não aparece quando há nativo', () => {
  const f = fundir('1', nat('2026-10-25'), { data: '2026-10-01', vencimento: false, texto: '' })!;
  assert.deepEqual([f.origem, f.inicio], ['nativo', undefined]);
});
await teste('fusão: concluído do nativo é preservado', () => {
  assert.equal(fundir('1', nat('2026-10-01', { estado: 'concluido', concluidoEm: '2026-10-08' }))?.concluidoEm, '2026-10-08');
});

console.log(`\n${n} testes OK`);
