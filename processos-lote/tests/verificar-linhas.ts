import { contarConvertidas, paraLatin1 } from "../src/modelo/latin1";
import { lerLinhas } from "../src/modelo/linhas";
import { igual, secao } from "./util";

export function verificarLinhas(): void {
  secao("latin1");
  igual("travessao e aspas curvas", paraLatin1("Contrato — “teste” 1"), 'Contrato - "teste" 1');
  igual("nbsp vira espaco comum", paraLatin1("a b"), "a b");
  igual("acento latin-1 preservado", paraLatin1("Ação"), "Ação");
  igual("NFC antes de tudo", paraLatin1("á"), "á");
  igual("reticencias e euro", paraLatin1("x… 5€"), "x... 5EUR");
  igual("zero-width some", paraLatin1("a​b﻿c"), "abc");
  igual("fora do latin-1 tira acento", paraLatin1("ą"), "a");
  igual("sem base latin-1 some", paraLatin1("a中b"), "ab");
  igual("null vira vazio", paraLatin1(null as unknown as string), "");
  igual("contarConvertidas so as alteradas", contarConvertidas(["ok", "a — b", "Ação", "“x”"]), 2);

  secao("lerLinhas");
  const sem = lerLinhas("Contrato 1\n\n  Contrato 2  \r\nContrato 3");
  igual(
    "sem tabulacao: uma por linha",
    sem.linhas.map((l) => l.especificacao),
    ["Contrato 1", "Contrato 2", "Contrato 3"],
  );
  igual("sem tabulacao: colunas", sem.colunas, ["especificacao"]);

  const cab = lerLinhas(
    "Especificação\tInteressado\tObservações\tNível de acesso\nA\tFulano\tobs\trestrito\nB\tBeltrano\t\tpublico\nC\t\t\t1",
  );
  igual("cabecalho: colunas", cab.colunas, ["especificacao", "interessado", "observacao", "nivel"]);
  igual("cabecalho: nao vira linha", cab.linhas.length, 3);
  igual("cabecalho: linha 1", cab.linhas[0], { especificacao: "A", interessado: "Fulano", observacao: "obs", nivelAcesso: "1" });
  igual("cabecalho: publico", cab.linhas[1]?.nivelAcesso, "0");
  igual("cabecalho: celula vazia ausente", cab.linhas[1]?.observacao, undefined);
  igual("cabecalho: nivel 1", cab.linhas[2]?.nivelAcesso, "1");

  const desc = lerLinhas("descricao\tnivel\nX\t0");
  igual("descricao tambem e cabecalho", desc.linhas, [{ especificacao: "X", nivelAcesso: "0" }]);

  const sc = lerLinhas("A\tFulano\tobs\nB\tBeltrano\tobs2");
  igual(
    "sem cabecalho: 1a coluna e especificacao",
    sc.linhas.map((l) => l.especificacao),
    ["A", "B"],
  );
  igual("sem cabecalho: colunas", sc.colunas, ["especificacao", "interessado", "observacao"]);
  igual("sem cabecalho: interessado", sc.linhas[1]?.interessado, "Beltrano");
  igual("sem cabecalho: observacao", sc.linhas[0]?.observacao, "obs");

  const ex = lerLinhas('"Contrato\ta ""b"""\tFulano\nOutro\tBeltrano');
  igual("aspas do Excel", ex.linhas[0]?.especificacao, 'Contrato\ta "b"');
  igual("aspas: interessado", ex.linhas[0]?.interessado, "Fulano");
  igual("aspas: segunda linha", ex.linhas[1]?.especificacao, "Outro");

  const vz = lerLinhas("Especificacao\tInteressado\nA\tX\n\n   \nB\tY");
  igual(
    "linha vazia no meio descartada",
    vz.linhas.map((l) => l.especificacao),
    ["A", "B"],
  );
  igual("texto vazio", lerLinhas("").linhas, []);
}
