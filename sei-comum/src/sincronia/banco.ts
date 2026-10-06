/**
 * O IndexedDB da extensão (origem chrome-extension://): UM BANCO POR MÓDULO
 * (`seipro-favoritos`, `seipro-projetos`), versão 1, com dois depósitos:
 * `copias` (as cópias diárias, chave `id`, índice `dono`) e `arquivos` (o
 * handle do arquivo sincronizado, chave `host|login`). É exatamente o banco
 * que os Favoritos já tinham: abrir de novo com o mesmo nome não migra nada.
 *
 * Abre e fecha a cada operação (são poucas, e um banco aberto preso numa aba
 * impediria a próxima versão de criar depósitos).
 */

export const VERSAO_BANCO = 1;
export type Deposito = "copias" | "arquivos";

export function abrirBanco(nome: string, fabrica: IDBFactory = globalThis.indexedDB): Promise<IDBDatabase> {
  return new Promise<IDBDatabase>((ok, erro) => {
    const r = fabrica.open(nome, VERSAO_BANCO);
    r.onupgradeneeded = () => {
      const db = r.result;
      if (!db.objectStoreNames.contains("copias")) db.createObjectStore("copias", { keyPath: "id" }).createIndex("dono", "dono");
      if (!db.objectStoreNames.contains("arquivos")) db.createObjectStore("arquivos");
    };
    r.onsuccess = () => ok(r.result);
    r.onerror = () => erro(r.error);
  });
}

/** Uma operação num depósito, numa transação própria; resolve quando a transação termina. */
export function noDeposito<T>(
  nome: string,
  deposito: Deposito,
  modo: IDBTransactionMode,
  fazer: (s: IDBObjectStore) => IDBRequest<T>,
  fabrica?: IDBFactory,
): Promise<T> {
  return abrirBanco(nome, fabrica).then(
    (db) =>
      new Promise<T>((ok, erro) => {
        const t = db.transaction(deposito, modo);
        const r = fazer(t.objectStore(deposito));
        t.oncomplete = () => {
          ok(r.result);
          db.close();
        };
        t.onerror = () => {
          erro(t.error);
          db.close();
        };
      }),
  );
}
