/** Repositório de teste: área em memória, relógio que anda 1 ms por gravação e ids previsíveis. */

import { type Area, areaMemoria } from "@comum/armazenamento/area";
import type { Escopo } from "../src/modelo/tipos";
import { RepositorioProjetos } from "../src/repositorio";

export const ESCOPO_UN: Escopo = { host: "sei.x.gov.br", login: "ana", unidade: "110", vis: "unidade" };
export const ESCOPO_EU: Escopo = { ...ESCOPO_UN, vis: "eu" };

/** Relógio que dois repositórios podem compartilhar (como o Date.now() de um navegador). */
export interface Relogio {
  agora: number;
}

export function novoRepo(escopo: Escopo = ESCOPO_UN, area: Area = areaMemoria(), prefixoId = "id", relogio: Relogio = { agora: 1_000 }) {
  let n = 0;
  const repo = new RepositorioProjetos(
    area,
    escopo,
    () => ({ agora: ++relogio.agora, dispositivo: "dev-a", por: escopo.login, nome: "Ana Lima" }),
    () => `${prefixoId}${++n}`,
  );
  return { repo, area, relogio: () => relogio.agora };
}
