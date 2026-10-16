import { extrairProtocolos } from "../src/texto/protocolos";
import { checar, secao } from "./util";

export function verificarProtocolos(): void {
  secao("extrair protocolos de texto livre");
  const so = (t: string) => extrairProtocolos(t).map((p) => `${p.tipo}:${p.texto}`);

  checar(
    "processo no formato federal",
    JSON.stringify(extrairProtocolos("08027.000123/2026-10")) === JSON.stringify([{ texto: "08027.000123/2026-10", tipo: "processo" }]),
  );
  checar("processo no formato de SP", so("99906.713-630.000005/2026-91").join() === "processo:99906.713-630.000005/2026-91");

  const misto = so("Veja o SEI 12345678 e o processo 50300.018905/2018-67, depois o 12345678 de novo.");
  checar("misto: ordem de aparicao e sem repeticao", misto.join("|") === "sei:12345678|processo:50300.018905/2018-67", misto);

  checar(
    "telefone, CNPJ e data nao sao no SEI",
    extrairProtocolos("Ligue 61 99999-1234, CNPJ 12.345.678/0001-90, dia 16/10/2026").length === 0,
  );

  checar("linha solta curta sem espaco vira outro", so("Contrato-77").join() === "outro:Contrato-77");
  checar("linha com espacos e sem padrao e ignorada", extrairProtocolos("isto e uma frase qualquer").length === 0);
  checar("linha longa sem padrao e ignorada", extrairProtocolos("A".repeat(41)).length === 0);
  checar("linha de 40 caracteres ainda vale", extrairProtocolos("A".repeat(40)).length === 1);

  const zeros = so("00123456\n123456\n00123456");
  checar("zeros a esquerda nao unificam", zeros.join("|") === "sei:00123456|sei:123456", zeros);
  const caixa = so("abc\nABC");
  checar("caixa nao unifica", caixa.join("|") === "outro:abc|outro:ABC", caixa);

  const linhas = so("12345678\nContrato-77\n50300.018905/2018-67");
  checar("varias linhas em ordem", linhas.join("|") === "sei:12345678|outro:Contrato-77|processo:50300.018905/2018-67", linhas);
  checar("sem nº SEI dentro de processo", so("50300.018905/2018-67").length === 1);
}
