export interface LinhaLote {
  especificacao: string;
  interessado?: string;
  observacao?: string;
  /** "0" = publico, "1" = restrito (valores do campo do SEI). */
  nivelAcesso?: "0" | "1";
}

const NOMES_SEM_CABECALHO = ["especificacao", "interessado", "observacao", "nivel"];

/** Minuscula e sem acento, para reconhecer cabecalhos e niveis escritos de qualquer jeito. */
function normalizar(s: string): string {
  return s
    .normalize("NFD")
    .replace(/[\u0300-\u036F]/g, "")
    .toLowerCase()
    .trim();
}

/** Nome canonico da coluna a partir do texto do cabecalho (ou o proprio texto normalizado). */
function nomeColuna(celula: string): string {
  const n = normalizar(celula);
  if (n === "descricao") return "especificacao";
  if (n === "observacoes") return "observacao";
  if (n === "nivel de acesso") return "nivel";
  return n;
}

/**
 * Separa o texto em linhas de celulas. Celulas separadas por tabulacao; uma celula que
 * comeca com aspas (como o Excel exporta quando ha tabulacao ou quebra de linha dentro
 * dela) vai ate as aspas de fechamento, e "" dentro dela e uma aspa.
 */
function separarCelulas(texto: string): string[][] {
  const linhas: string[][] = [];
  let linha: string[] = [];
  let celula = "";
  let i = 0;
  const n = texto.length;
  const fecharCelula = () => {
    linha.push(celula.trim());
    celula = "";
  };
  const fecharLinha = () => {
    fecharCelula();
    linhas.push(linha);
    linha = [];
  };
  while (i < n) {
    const c = texto[i] as string;
    if (c === '"' && celula.trim() === "") {
      // Celula entre aspas
      celula = "";
      i++;
      while (i < n) {
        const d = texto[i] as string;
        if (d === '"') {
          if (texto[i + 1] === '"') {
            celula += '"';
            i += 2;
            continue;
          }
          i++;
          break;
        }
        celula += d;
        i++;
      }
      continue;
    }
    if (c === "\t") {
      fecharCelula();
    } else if (c === "\n" || c === "\r") {
      if (c === "\r" && texto[i + 1] === "\n") i++;
      fecharLinha();
    } else {
      celula += c;
    }
    i++;
  }
  if (celula !== "" || linha.length > 0) fecharLinha();
  return linhas;
}

function lerNivel(valor: string): "0" | "1" | undefined {
  const n = normalizar(valor);
  if (n === "publico" || n === "0") return "0";
  if (n === "restrito" || n === "1") return "1";
  return undefined;
}

/**
 * Le o texto colado (ou o CSV/planilha) em linhas de processo e diz quais colunas encontrou.
 * Sem tabulacao em nenhuma linha vale o comportamento do legado: uma especificacao por linha.
 */
export function lerLinhas(texto: string): { linhas: LinhaLote[]; colunas: string[] } {
  const bruto = separarCelulas(texto).filter((cs) => cs.some((c) => c !== ""));
  if (bruto.length === 0) return { linhas: [], colunas: ["especificacao"] };

  const temTab = /\t/.test(texto);
  if (!temTab) {
    // Aspas nao tem significado especial fora de planilha; mantem o texto como veio.
    const simples = texto
      .split(/\r?\n/)
      .map((l) => l.trim())
      .filter((l) => l !== "");
    return { linhas: simples.map((especificacao) => ({ especificacao })), colunas: ["especificacao"] };
  }

  const primeira = bruto[0] as string[];
  const temCabecalho = primeira.length > 1 && nomeColuna(primeira[0] as string) === "especificacao";
  const largura = Math.min(Math.max(...bruto.map((r) => r.length)), NOMES_SEM_CABECALHO.length);
  const colunas = temCabecalho ? primeira.map(nomeColuna) : NOMES_SEM_CABECALHO.slice(0, Math.max(largura, 1));
  const dados = temCabecalho ? bruto.slice(1) : bruto;

  const linhas: LinhaLote[] = dados.map((cs) => {
    const linha: LinhaLote = { especificacao: "" };
    colunas.forEach((nome, k) => {
      const v = cs[k] ?? "";
      if (nome === "especificacao") linha.especificacao = v;
      else if (v === "") return;
      else if (nome === "interessado") linha.interessado = v;
      else if (nome === "observacao") linha.observacao = v;
      else if (nome === "nivel") {
        const nivel = lerNivel(v);
        if (nivel) linha.nivelAcesso = nivel;
      }
    });
    return linha;
  });
  return { linhas, colunas };
}
