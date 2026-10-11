import { readFileSync } from 'node:fs';
import { parseHTML } from 'linkedom';
import { definirAnalisador } from '../../sei-nucleo/src/sessao/dom';

definirAnalisador((html) => parseHTML(html).document as unknown as Document);

let n = 0;
export async function teste(nome: string, fn: () => void | Promise<void>) {
  try {
    await fn();
  } catch (e) {
    console.error(`FALHOU: ${nome}`);
    throw e;
  }
  console.log(`OK ${++n}: ${nome}`);
}

export const fixture = (nome: string): string => readFileSync(new URL(`./fixtures/sei41/${nome}`, import.meta.url), 'utf8');
export const docDe = (html: string): Document => parseHTML(html).document as unknown as Document;
export const docFixture = (nome: string): Document => docDe(fixture(nome));
