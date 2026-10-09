import assert from 'node:assert/strict';
import { type Config, configVazia } from '../src/modelo';
import { iniciar } from '../src/controle';
import { ordemCss, paginaComPaineis } from './util';

const IDS = ['processosSEIPro', 'favoritesPro', 'atividadesPro'];
const cfg = (ordem: string[], ocultos: string[] = []): Config => ({ v: 1, ordem, ocultos });
const espera = (ms = 150) => new Promise(r => setTimeout(r, ms));
const botoes = (d: Document) => d.querySelectorAll('.spro-pnl-botao');

/** A barra de título do Controle de Processos, como o legado a monta. */
const comBarra = (ids: string[]) => {
  const d = paginaComPaineis(ids);
  const barra = d.querySelector('#processosSEIPro .titlePanelHome');
  if (barra) barra.setAttribute('id', 'divInfraBarraLocalizacao');
  return d;
};

export async function verificarControle(teste: (nome: string, fn: () => void | Promise<void>) => Promise<void>): Promise<void> {
  await teste('controle: configurar aplica a ordem e a visibilidade', async () => {
    const d = comBarra(IDS);
    const c = iniciar(d, () => {});
    c.configurar(cfg(['favoritesPro'], ['atividadesPro']));
    assert.equal(ordemCss(d.getElementById('favoritesPro')!), '0');
    assert.equal(d.getElementById('atividadesPro')!.hasAttribute('data-spro-oculto'), true);
    c.encerrar();
  });
  await teste('controle: painel que monta depois cai no lugar certo', async () => {
    const d = comBarra(['processosSEIPro']);
    const c = iniciar(d, () => {});
    c.configurar(cfg(['favoritesPro', 'processosSEIPro']));
    d.getElementById('panelHomePro')!.insertAdjacentHTML('beforeend', '<div class="panelHomePro" id="favoritesPro" style="display: inline-block; width: 100%;"></div>');
    await espera();
    assert.equal(ordemCss(d.getElementById('favoritesPro')!), '0');
    assert.equal(ordemCss(d.getElementById('processosSEIPro')!), '1');
    c.encerrar();
  });
  await teste('controle: o botão só existe com 2 ou mais painéis, na barra do Controle, uma vez só', async () => {
    const um = comBarra(['processosSEIPro']);
    const c1 = iniciar(um, () => {});
    c1.configurar(configVazia());
    assert.equal(botoes(um).length, 0);
    c1.encerrar();
    const d = comBarra(IDS);
    const c = iniciar(d, () => {});
    c.configurar(configVazia());
    c.configurar(configVazia());
    assert.equal(botoes(d).length, 1);
    assert.ok(d.querySelector('#processosSEIPro .titlePanelHome .spro-pnl-botao'));
    assert.equal(botoes(d)[0]!.getAttribute('aria-label'), 'Ordenar e ocultar painéis');
    d.getElementById('favoritesPro')!.remove();
    d.getElementById('atividadesPro')!.remove();
    await espera();
    assert.equal(botoes(d).length, 0, 'o botão some quando sobra um painel só');
    c.encerrar();
  });
  await teste('controle: o botão reaparece se o legado refizer a barra de título', async () => {
    const d = comBarra(IDS);
    const c = iniciar(d, () => {});
    c.configurar(configVazia());
    const barra = d.querySelector('#processosSEIPro .titlePanelHome')!;
    barra.innerHTML = 'Controle de Processos';
    await espera();
    assert.equal(botoes(d).length, 1);
    c.encerrar();
  });
  await teste('controle: salvar no modal grava uma vez e aplica na hora', async () => {
    const d = comBarra(IDS);
    const gravados: Config[] = [];
    const c = iniciar(d, nova => gravados.push(nova));
    c.configurar(configVazia());
    (botoes(d)[0] as HTMLElement).click();
    assert.equal(d.querySelectorAll('dialog').length, 1);
    d.querySelector<HTMLButtonElement>('.spro-pnl-item[data-id="atividadesPro"] .spro-pnl-subir')!.click();
    d.querySelector<HTMLButtonElement>('.spro-pnl-salvar')!.click();
    assert.equal(gravados.length, 1);
    assert.deepEqual(gravados[0]!.ordem, ['processosSEIPro', 'atividadesPro', 'favoritesPro']);
    assert.equal(ordemCss(d.getElementById('atividadesPro')!), '1');
    assert.equal(d.querySelector('dialog'), null);
    c.encerrar();
  });
  await teste('controle: ocioso, não gera mutações (sem laço de reaplicação)', async () => {
    const d = comBarra(IDS);
    const c = iniciar(d, () => {});
    c.configurar(cfg(['favoritesPro'], ['atividadesPro']));
    await espera();
    let mutacoes = 0;
    const obs = new (d.defaultView as unknown as { MutationObserver: typeof MutationObserver }).MutationObserver(m => { mutacoes += m.length; });
    obs.observe(d.body, { attributes: true, childList: true, subtree: true });
    await espera(400);
    obs.disconnect();
    assert.equal(mutacoes, 0);
    c.encerrar();
  });
  await teste('controle: encerrar desfaz ordem, ocultação e botão', async () => {
    const d = comBarra(IDS);
    const c = iniciar(d, () => {});
    c.configurar(cfg(['favoritesPro'], ['atividadesPro']));
    c.encerrar();
    assert.equal(ordemCss(d.getElementById('favoritesPro')!), '');
    assert.equal(d.getElementById('atividadesPro')!.hasAttribute('data-spro-oculto'), false);
    assert.equal(botoes(d).length, 0);
    assert.equal(d.getElementById('panelHomePro')!.classList.contains('spro-paineis-ativo'), false);
  });
  await teste('controle: configurar depois de encerrar não faz nada', async () => {
    const d = comBarra(IDS);
    const c = iniciar(d, () => {});
    c.encerrar();
    c.configurar(cfg(['favoritesPro']));
    assert.equal(ordemCss(d.getElementById('favoritesPro')!), '');
  });
}
