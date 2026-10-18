import { extrairProtocolos } from "@comum/texto/protocolos";
import { TETO } from "@dl/modelo/constantes";
import { nomeNaArvore } from "@dl/modelo/nomes";

export type Destino =
  | { tipo: "tela" }
  | { tipo: "novo-processo"; idTipoProcesso: string; especificacao: string }
  | { tipo: "coluna"; coluna: string };

export interface LinhaDocumento {
  indice: number;
  dados: Record<string, string>;
  /** Nº do processo normalizado, só no destino coluna. */
  destino?: string;
  erroLinha?: string;
  nivel?: "publico" | "restrito";
  hipotese?: string;
}

export interface ConfigLinhas {
  destino: Destino;
  colunaNivel?: string;
  colunaHipotese?: string;
  colunaNome: string;
}

/** Primeiro protocolo do tipo "processo" da célula, sem espaços em volta; null se não houver. */
export function numeroDeProcesso(celula: string): string | null {
  const achado = extrairProtocolos(celula).find((p) => p.tipo === "processo");
  return achado ? achado.texto.trim() : null;
}

function lerNivel(valor: string): "publico" | "restrito" | null {
  const v = valor.trim().toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  if (v === "publico" || v === "0") return "publico";
  if (v === "restrito" || v === "1") return "restrito";
  return null;
}

/** Valida cada registro e monta as linhas; o erro de uma linha não barra as outras. */
export function prepararLinhas(registros: Record<string, string>[], cfg: ConfigLinhas): LinhaDocumento[] {
  if (registros.length > TETO) {
    throw new Error(`O arquivo tem ${registros.length} linhas; o máximo por execução é ${TETO}.`);
  }
  return registros.map((dados, indice) => {
    const linha: LinhaDocumento = { indice, dados, nivel: "publico" };
    if (cfg.destino.tipo === "coluna") {
      const numero = numeroDeProcesso(dados[cfg.destino.coluna] ?? "");
      if (numero === null) linha.erroLinha = "Processo inválido ou vazio";
      else linha.destino = numero;
    }
    if (!linha.erroLinha && !nomeNaArvore(dados[cfg.colunaNome] ?? "")) {
      linha.erroLinha = "Nome na árvore vazio";
    }
    if (cfg.colunaNivel) {
      const bruto = dados[cfg.colunaNivel] ?? "";
      const nivel = lerNivel(bruto);
      if (!nivel) {
        linha.erroLinha ??= `Nível de acesso inválido: "${bruto.trim()}"`;
      } else {
        linha.nivel = nivel;
        if (nivel === "restrito") {
          const hip = (cfg.colunaHipotese ? (dados[cfg.colunaHipotese] ?? "") : "").trim();
          if (hip) linha.hipotese = hip;
          else linha.erroLinha ??= "Nível restrito sem hipótese legal";
        }
      }
    }
    return linha;
  });
}

/** Nº do processo → índices das linhas; ignora as linhas sem destino (inválidas ou fora do destino coluna). */
export function agruparPorProcesso(linhas: LinhaDocumento[]): Map<string, number[]> {
  const grupos = new Map<string, number[]>();
  for (const l of linhas) {
    if (l.destino === undefined) continue;
    const lista = grupos.get(l.destino);
    if (lista) lista.push(l.indice);
    else grupos.set(l.destino, [l.indice]);
  }
  return grupos;
}
