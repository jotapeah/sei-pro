/** A opção "Gestor de Demandas" (`gerenciardemandas`) das configurações: DESLIGADA por padrão (é um módulo novo). */

import { opcaoLegadaMarcada } from "@comum/opcoes/legadas";

export const OPCAO_DEMANDAS = "gerenciardemandas";

export async function lerOpcaoDemandas(sync: Pick<chrome.storage.StorageArea, "get"> = chrome.storage.sync): Promise<boolean> {
  const itens = (await sync.get("dataValues")) as { dataValues?: unknown };
  return opcaoLegadaMarcada(itens.dataValues, OPCAO_DEMANDAS);
}
