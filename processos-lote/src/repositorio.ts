import type { Area } from "@comum/armazenamento/area";
import type { LinhaLote } from "./modelo/linhas";

export interface Parametros {
  idTipo: string;
  nomeTipo: string;
  nivelAcesso: "0" | "1";
  hipoteseLegal: string;
  nomeHipotese: string;
  pausa: number;
}

export interface Criado {
  numero: string;
  idProcedimento: string;
  url: string;
}

export interface LoteEmAndamento {
  id: string;
  host: string;
  login: string;
  iniciadoEm: number;
  parametros: Parametros;
  linhas: LinhaLote[];
  itens: Array<{ situacao: "pendente" | "ok" | "erro"; criado?: Criado; erro?: string }>;
}

type Item = LoteEmAndamento["itens"][number];

/** Dado gravado por versao antiga, editado ou cortado nao pode derrubar o app: o que nao fecha vira "sem lote". */
function loteValido(v: unknown): v is LoteEmAndamento {
  if (!v || typeof v !== "object") return false;
  const l = v as Partial<LoteEmAndamento>;
  if (!l.parametros || typeof l.parametros !== "object" || typeof l.parametros.idTipo !== "string" || !l.parametros.idTipo) return false;
  if (!Array.isArray(l.itens) || !Array.isArray(l.linhas)) return false;
  return l.itens.length === l.linhas.length && l.itens.every((i) => !!i && typeof i === "object");
}

/** Um lote em andamento por `host|login`: e o que o app oferece como "Continuar de onde parou". */
export class RepositorioLote {
  private readonly chave: string;
  constructor(
    private readonly area: Area,
    escopo: string,
  ) {
    this.chave = `lote/${escopo}/atual`;
  }

  async gravar(l: LoteEmAndamento): Promise<void> {
    await this.area.gravar({ [this.chave]: l });
  }

  async ler(): Promise<LoteEmAndamento | null> {
    const v = (await this.area.obter(this.chave))[this.chave];
    return loteValido(v) ? v : null;
  }

  /** Rele antes de gravar: outra aba ou instancia pode ter marcado outro indice nesse meio-tempo. */
  async marcar(indice: number, item: Item): Promise<void> {
    const atual = await this.ler();
    if (!atual || indice < 0 || indice >= atual.itens.length) return;
    const itens = atual.itens.slice();
    itens[indice] = item;
    await this.gravar({ ...atual, itens });
  }

  async descartar(): Promise<void> {
    await this.area.remover(this.chave);
  }

  pendentes(l: LoteEmAndamento): number[] {
    const saida: number[] = [];
    l.itens.forEach((i, k) => {
      if (i.situacao !== "ok") saida.push(k);
    });
    return saida;
  }
}
