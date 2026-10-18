import type { Modelo } from "../sei/modelo";
import type { Destino } from "./destinos";

/** O que a tela de cruzamento decide e o lote carrega até o fim: modelo, colunas e pausa. */
export interface ConfigLote {
  /** Campo `##campo##` do modelo → coluna do arquivo. */
  camposCruzados: Record<string, string>;
  colunaNome: string;
  modeloDescricao: string;
  destino: Destino;
  colunaNivel?: string;
  colunaHipotese?: string;
  pausa: number;
  modelo: Modelo;
}
