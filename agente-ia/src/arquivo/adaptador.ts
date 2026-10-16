/**
 * O adaptador do Agente para a sincronia por arquivo do módulo comum
 * (`@comum/sincronia/arquivo`): liga a mescla pura (`envelope.ts`) às fontes
 * reais (`retrato.ts`).
 *
 * Os dados do Agente não são separados por usuário nem por SEI: o arquivo é
 * todo deste "dono", e `outros` é sempre 0.
 */

import type { AdaptadorArquivo } from "@comum/sincronia/arquivo";
import { assinatura, FORMATO, lerEnvelope, mesclar, VERSAO, type EnvelopeAgente } from "./envelope";
import type { FontesRetrato } from "./retrato";

export type AdaptadorAgente = AdaptadorArquivo<EnvelopeAgente> & {
  /** O botão "Remover segredos do arquivo": vale para a próxima gravação só. */
  removerSegredosNaProxima(): void;
};

export function adaptadorAgente(f: FontesRetrato, agora: () => number = Date.now): AdaptadorAgente {
  let removerSegredos = false;

  /** Lê o local, mescla com o lido, aplica o que mudou aqui e guarda o diário. */
  async function rodar(lido: EnvelopeAgente | null, remover: boolean) {
    const [local, diario, segredos] = await Promise.all([f.lerRetrato(), f.lerDiario(), f.segredos()]);
    const r = mesclar(local, diario, lido, { agora: agora(), segredos, removerSegredos: remover });
    if (r.mudouLocal) await f.aplicar(local, r.retrato);
    await f.gravarDiario(r.diario);
    return r;
  }

  return {
    formato: FORMATO,
    versao: VERSAO,
    ler: lerEnvelope,
    assinatura,
    async importar(env) {
      await rodar(env, false);
    },
    async exportar(lido) {
      // Relê: o `importar` já pôs o arquivo no local, e esta mescla carimba o
      // que vai ao arquivo (com o arquivo vazio ou ilegível, é a única).
      const { envelope } = await rodar(lido, removerSegredos);
      removerSegredos = false;
      return { envelope, outros: 0 };
    },
    removerSegredosNaProxima() {
      removerSegredos = true;
    },
  };
}
