import { verificarModelo } from './verificar-modelo';

let n = 0;
async function teste(nome: string, fn: () => void | Promise<void>) { await fn(); console.log(`OK ${++n}: ${nome}`); }

await verificarModelo(teste);

console.log(`${n} verificações passaram.`);
