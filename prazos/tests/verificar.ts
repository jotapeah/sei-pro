import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { parseHTML } from 'linkedom';
import type { Http, OpcoesHttp, Pagina } from '../../sei-nucleo/src/sessao/http';
import { definirAnalisador } from '../../sei-nucleo/src/sessao/dom';
import { lerPrazoNativo, lerPrazosDaCaixa, temControleNativo } from '../src/nativo/leitura';
import { interpretarResposta } from '../src/nativo/resposta';
import { concluirPrazo, definirPrazo, excluirPrazo, grupoDaLinha, hrefDaBarra, obterAcaoDefinir } from '../src/nativo/formulario';
definirAnalisador(html => parseHTML(html).document as unknown as Document);
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

// ---------------- Fase 2: nativo (fixtures reais do SEI 4.1.5, treinamento SP) ----------------
const fx = (nome: string) => readFileSync(new URL(`./fixtures/sei41/${nome}`, import.meta.url), 'utf8');
const docDe = (html: string) => parseHTML(html).document as unknown as Document;
const pagina = (url: string, html: string): Pagina => { let d: Document | null = null; return { url, status: 200, html, get doc() { return (d ??= docDe(html)); } }; };
const SEI = 'https://treinamento.sei.sp.gov.br/sei/';

await teste('nativo: lê data, estado, sigla e ids do ícone de cada linha', () => {
  const p = lerPrazosDaCaixa(docDe(fx('caixa_prazos.html')));
  assert.equal(p.size, 6);
  assert.deepEqual(p.get('21831'), { idControlePrazo: '1332', idProcedimento: '21831', sigla: 'usuario01', data: '2023-05-20', estado: 'atrasado' });
  assert.deepEqual([p.get('150098')?.data, p.get('150098')?.estado, p.get('150098')?.idControlePrazo], ['2026-10-20', 'noPrazo', '8557']);
  assert.deepEqual([p.get('112825') ?? null], [null]);
  const hoje = [...p.values()].find(x => x.estado === 'hoje');
  assert.deepEqual([hoje?.data, hoje?.sigla], ['2026-10-10', 'usuario02']);
});
await teste('nativo: prazo concluído guarda a data da conclusão', () => {
  const p = lerPrazosDaCaixa(docDe(fx('caixa_concluido.html')));
  const c = p.get('150098');
  assert.deepEqual([c?.estado, c?.data, c?.concluidoEm], ['concluido', '2026-10-30', '2026-10-10']);
});
await teste('nativo: retorno programado e outros ícones com tooltip parecido não viram prazo', () => {
  const d = docDe(fx('caixa_sem_prazo_nativo.html'));
  const tr = d.querySelector('tr#P21831')!;
  assert.match(tr.innerHTML, /retorno_programado3/);
  assert.equal(lerPrazoNativo(tr)?.idControlePrazo, '1332');
  assert.equal(lerPrazoNativo(d.querySelector('tr#P150098') ?? tr.cloneNode(false) as Element), null);
});
await teste('nativo: sem aria-label, o tooltip basta; rótulo ilegível não vira prazo', () => {
  const linha = (extra: string) => docDe(`<table><tr id="P7"><td><a href="controlador.php?acao=controle_prazo_definir&amp;id_controle_prazo=3&amp;id_procedimento=7" ${extra}><img src="svg/controle_prazo1.svg"></a></td></tr></table>`).querySelector('tr')!;
  const t = lerPrazoNativo(linha(`onmouseover="return infraTooltipMostrar('ana 05/11/2026 (25 dias)','Controle de Prazo');"`));
  assert.deepEqual([t?.sigla, t?.data, t?.estado], ['ana', '2026-11-05', 'noPrazo']);
  assert.equal(lerPrazoNativo(linha(`aria-label="Controle de Prazo / ana quando der"`)), null);
});
await teste('nativo: detecta o botão da barra e acha o link assinado', () => {
  const d = docDe(fx('caixa_prazos.html'));
  assert.equal(temControleNativo(d), true);
  assert.match(hrefDaBarra(d, 'controle_prazo_definir')!, /^controlador\.php\?acao=controle_prazo_definir&acao_origem=procedimento_controlar&acao_retorno=procedimento_controlar&/);
  assert.equal(temControleNativo(docDe('<html><body><a onclick="return acaoControleProcessos(\'controlador.php?acao=outra\')">x</a></body></html>')), false);
});
await teste('nativo: o grupo (hdn*) vem da tabela da linha', () => {
  const d = docDe(fx('caixa_prazos.html'));
  assert.equal(grupoDaLinha(d, '150098'), 'Recebidos');
  assert.equal(grupoDaLinha(d, '7318'), 'Gerados');
  assert.equal(grupoDaLinha(d, '999'), null);
});
await teste('resposta: sucesso é sair do formulário; erro vem de #divInfraMensagens', () => {
  assert.deepEqual(interpretarResposta(pagina(`${SEI}controlador.php?acao=procedimento_controlar&acao_origem=controle_prazo_definir`, fx('caixa_prazos.html'))).ok, true);
  const e = interpretarResposta(pagina(`${SEI}controlador.php?acao=controle_prazo_definir&acao_origem=controle_prazo_definir`, fx('definir_erro_passado.html')));
  assert.deepEqual([e.ok, e.erro], [false, 'Data de prazo não pode estar no passado.']);
  const sem = interpretarResposta(pagina(`${SEI}controlador.php?acao=controle_prazo_definir&acao_origem=controle_prazo_definir`, fx('definir_form.html')));
  assert.equal(sem.ok, false);
});

/** Http de mentira: guarda o que foi enviado e responde pelo roteiro. */
function httpFalso(responder: (metodo: 'obter' | 'enviar', url: string, campos?: ReadonlyArray<readonly [string, string]>) => Pagina) {
  const chamadas: Array<{ metodo: string; url: string; campos?: Array<[string, string]> }> = [];
  const http: Http = {
    base: new URL(SEI),
    absoluta: (u: string) => new URL(u, SEI).href,
    async obter(url: string, _op?: OpcoesHttp) { chamadas.push({ metodo: 'obter', url }); return responder('obter', url); },
    async enviar(url: string, campos: ReadonlyArray<readonly [string, string]>, _op?: OpcoesHttp) { chamadas.push({ metodo: 'enviar', url, campos: campos.map(c => [c[0], c[1]] as [string, string]) }); return responder('enviar', url, campos); },
    async baixar() { throw new Error('não usado'); },
  };
  return { http, chamadas };
}
const valor = (campos: Array<[string, string]> | undefined, nome: string) => campos?.find(c => c[0] === nome)?.[1];

await teste('escrita: obtém o action assinado sem mexer na seleção da tela e o reaproveita', async () => {
  const doc = docDe(fx('caixa_prazos.html'));
  const { http, chamadas } = httpFalso(() => pagina(`${SEI}controlador.php?acao=controle_prazo_definir`, fx('definir_form.html')));
  const a1 = await obterAcaoDefinir(http, doc, `${SEI}controlador.php?acao=procedimento_controlar`, '150098');
  assert.match(a1, /acao=controle_prazo_definir&acao_origem=controle_prazo_definir/);
  const a2 = await obterAcaoDefinir(http, doc, `${SEI}controlador.php?acao=procedimento_controlar`, '7318');
  assert.equal(a2, a1);
  assert.equal(chamadas.length, 1);
  assert.match(chamadas[0]!.url, /acao=controle_prazo_definir&acao_origem=procedimento_controlar/);
  assert.equal(valor(chamadas[0]!.campos, 'hdnRecebidosItensSelecionados'), '150098');
  assert.equal(valor(chamadas[0]!.campos, 'hdnGeradosItensSelecionados'), '');
});
await teste('escrita: definir por data e por dias úteis monta os campos do formulário do SEI', async () => {
  const { http, chamadas } = httpFalso(() => pagina(`${SEI}controlador.php?acao=procedimento_controlar&acao_origem=controle_prazo_definir`, fx('caixa_prazos.html')));
  const r1 = await definirPrazo(http, 'controlador.php?acao=controle_prazo_definir&x=1', ['1', '2'], { tipo: 'data', data: '2026-10-20' });
  assert.equal(r1.ok, true);
  const c1 = chamadas[0]!.campos;
  assert.deepEqual([valor(c1, 'rdoPrazo'), valor(c1, 'txtPrazo'), valor(c1, 'txtDias'), valor(c1, 'hdnIdProcedimentos'), valor(c1, 'hdnIdControlePrazo'), valor(c1, 'sbmDefinirControlePrazo')], ['1', '20/10/2026', '', '1,2', '', 'Salvar']);
  await definirPrazo(http, 'a', ['3'], { tipo: 'dias', dias: 5, uteis: true });
  const c2 = chamadas[1]!.campos;
  assert.deepEqual([valor(c2, 'rdoPrazo'), valor(c2, 'txtPrazo'), valor(c2, 'txtDias'), valor(c2, 'chkSinDiasUteis')], ['2', '', '5', 'on']);
  await definirPrazo(http, 'a', ['3'], { tipo: 'dias', dias: 3, uteis: false });
  assert.equal(valor(chamadas[2]!.campos, 'chkSinDiasUteis'), undefined);
});
await teste('escrita: o erro de validação do SEI volta ao chamador, sem exceção', async () => {
  const { http } = httpFalso(() => pagina(`${SEI}controlador.php?acao=controle_prazo_definir&acao_origem=controle_prazo_definir`, fx('definir_erro_passado.html')));
  const r = await definirPrazo(http, 'a', ['1'], { tipo: 'data', data: '2020-01-01' });
  assert.deepEqual([r.ok, r.erro], [false, 'Data de prazo não pode estar no passado.']);
});
await teste('escrita: concluir usa rdoPrazo=3', async () => {
  const { http, chamadas } = httpFalso(() => pagina(`${SEI}controlador.php?acao=procedimento_controlar`, fx('caixa_concluido.html')));
  assert.equal((await concluirPrazo(http, 'a', ['150098'])).ok, true);
  assert.equal(valor(chamadas[0]!.campos, 'rdoPrazo'), '3');
});
await teste('escrita: excluir abre a edição pelo link do ícone e posta no action de exclusão', async () => {
  const { http, chamadas } = httpFalso((m) => m === 'obter' ? pagina(`${SEI}controlador.php?acao=controle_prazo_definir`, fx('definir_editar.html')) : pagina(`${SEI}controlador.php?acao=procedimento_controlar&acao_origem=controle_prazo_excluir`, fx('caixa_prazos.html')));
  const r = await excluirPrazo(http, 'controlador.php?acao=controle_prazo_definir&id_controle_prazo=8557&id_procedimento=150098');
  assert.equal(r.ok, true);
  assert.equal(chamadas[0]!.metodo, 'obter');
  assert.match(chamadas[1]!.url, /acao=controle_prazo_excluir&acao_origem=controle_prazo_definir&acao_retorno=procedimento_controlar&id_controle_prazo=8557/);
  assert.equal(valor(chamadas[1]!.campos, 'hdnIdControlePrazo'), '8557');
});
await teste('escrita: sem o link de exclusão (sem permissão), diz isso em vez de falhar calado', async () => {
  const { http } = httpFalso(() => pagina(`${SEI}controlador.php?acao=controle_prazo_definir`, fx('definir_form.html')));
  const r = await excluirPrazo(http, 'controlador.php?acao=controle_prazo_definir&id_controle_prazo=1');
  assert.equal(r.ok, false);
  assert.match(r.erro!, /permiss/);
});

console.log(`\n${n} testes OK`);
