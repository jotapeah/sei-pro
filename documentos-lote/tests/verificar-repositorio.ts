import { areaMemoria } from "@comum/armazenamento/area";
import { VALIDADE_LOTE_MS } from "../src/modelo/constantes";
import type { ConfigLote } from "../src/modelo/lote";
import { type LoteDocumentos, RepositorioLote } from "../src/repositorio";
import { checar, igual, secao } from "./util";

const CHAVE = "docslote/lote";
const HOST = "sei.exemplo.gov.br";

const config: ConfigLote = {
  camposCruzados: { nome: "Nome" },
  colunaNome: "Nome",
  modeloDescricao: "Ofício ##nome##",
  destino: { tipo: "tela" },
  pausa: 500,
  modelo: { origem: "documento", numero: "123", titulo: "Ofício", tipoId: "5", tipoNome: "Ofício", campos: ["nome"] },
};

function exemplo(login = "ana"): LoteDocumentos {
  return {
    id: "l1",
    host: HOST,
    login,
    iniciadoEm: 1000,
    atualizadoEm: 1000,
    config,
    linhas: [0, 1, 2].map((indice) => ({ indice, dados: { Nome: `N${indice}` } })),
    itens: [{ situacao: "pendente" }, { situacao: "pendente" }, { situacao: "pendente" }],
    verificacoes: { "1/2026": { numero: "1/2026", status: "ok", idProcedimento: "9" } as LoteDocumentos["verificacoes"][string] },
  };
}

// Dado corrompido não respeita os tipos: o teste mexe nele livremente.
// biome-ignore lint/suspicious/noExplicitAny: fixture de dado corrompido
type Mutavel = any;

export async function verificarRepositorio(): Promise<void> {
  secao("RepositorioLote");
  const area = areaMemoria();
  let relogio = 5000;
  const repo = new RepositorioLote(area, () => relogio);

  igual("vazio carrega null", await repo.carregar(HOST, "ana"), null);
  await repo.gravar(exemplo());
  checar("chave docslote/lote", CHAVE in (await area.obter()));
  igual("ida e volta (atualizadoEm da gravação)", await repo.carregar(HOST, "ana"), { ...exemplo(), atualizadoEm: 5000 });
  igual("outro login não carrega", await repo.carregar(HOST, "bia"), null);
  checar("outro login não apaga o lote da ana", (await repo.carregar(HOST, "ana")) !== null);
  igual("outro host não carrega", await repo.carregar("outro.gov.br", "ana"), null);

  // marcar: só o índice pedido muda; as demais linhas e itens ficam como estavam.
  relogio = 6000;
  const criado = { numero: "10/2026", idDocumento: "77", link: "https://x/?acao=procedimento_trabalhar&id_documento=77" };
  await repo.marcar("l1", 1, { situacao: "criada", criado });
  const l = await repo.carregar(HOST, "ana");
  igual(
    "marcar só o índice",
    l?.itens.map((i) => i.situacao),
    ["pendente", "criada", "pendente"],
  );
  igual("marcar guarda criado", l?.itens[1]?.criado, criado);
  igual("marcar não mexe nas linhas", l?.linhas, exemplo().linhas);
  igual("marcar não mexe na config nem nas verificações", [l?.config, l?.verificacoes], [config, exemplo().verificacoes]);
  igual("marcar renova atualizadoEm", l?.atualizadoEm, 6000);
  await repo.marcar("outro", 0, { situacao: "erro", erro: "x" });
  igual("marcar de outro lote (id) não grava", (await repo.carregar(HOST, "ana"))?.itens[0], { situacao: "pendente" });
  await repo.marcar("l1", 9, { situacao: "erro", erro: "x" });
  igual("marcar índice fora não grava", (await repo.carregar(HOST, "ana"))?.itens.length, 3);
  await repo.marcar("l1", 2, { situacao: "erro", erro: "falhou", incerto: true, idDocumento: "88" });
  igual("erro incerto guarda o que se sabe", (await repo.carregar(HOST, "ana"))?.itens[2], {
    situacao: "erro",
    erro: "falhou",
    incerto: true,
    idDocumento: "88",
  });
  await repo.marcar("l1", 0, { situacao: "fora" });
  igual("situação fora é válida", (await repo.carregar(HOST, "ana"))?.itens[0]?.situacao, "fora");

  // linkArvore nunca é guardado (ruling 13), mesmo que venha na verificação.
  const comLink = exemplo();
  (comLink.verificacoes["1/2026"] as Mutavel).linkArvore = "https://x/?infra_hash=abc";
  await repo.gravar(comLink);
  igual("gravar remove linkArvore das verificações", (await repo.carregar(HOST, "ana"))?.verificacoes, exemplo().verificacoes);

  // Validade: 7 dias.
  await repo.gravar(exemplo());
  relogio = 5000 + VALIDADE_LOTE_MS - 1;
  checar("dentro da validade carrega", (await repo.carregar(HOST, "ana")) !== null);
  relogio = 5000 + VALIDADE_LOTE_MS + 1;
  await area.gravar({ [CHAVE]: { ...exemplo(), iniciadoEm: 5000, atualizadoEm: 5000 } });
  igual("lote de mais de 7 dias é descartado", await repo.carregar(HOST, "ana"), null);
  checar("lote vencido é removido", !(CHAVE in (await area.obter())));
  // A validade conta da última escrita: lote retomado e marcado há pouco continua vivo.
  relogio = 1000 + VALIDADE_LOTE_MS + 1;
  await area.gravar({ [CHAVE]: { ...exemplo(), atualizadoEm: relogio - 1000 } });
  checar("validade conta da última escrita", (await repo.carregar(HOST, "ana")) !== null);

  // Forma inválida: descarta e apaga.
  relogio = 7000;
  const invalidos: Array<[string, (v: Mutavel) => void]> = [
    ["criada sem criado", (v) => (v.itens[1] = { situacao: "criada" })],
    ["criada sem número", (v) => (v.itens[1] = { situacao: "criada", criado: { idDocumento: "1", link: "l" } })],
    ["criada com número vazio", (v) => (v.itens[1] = { situacao: "criada", criado: { numero: "", idDocumento: "1", link: "l" } })],
    ["criada sem idDocumento", (v) => (v.itens[1] = { situacao: "criada", criado: { numero: "1", link: "l" } })],
    ["situação desconhecida", (v) => (v.itens[0].situacao = "ok")],
    ["itens de outro tamanho", (v) => v.itens.pop()],
    ["sem config", (v) => (v.config = undefined)],
    ["config sem colunaNome", (v) => (v.config.colunaNome = 3)],
    ["pausa não numérica", (v) => (v.config.pausa = "500")],
    ["sem verificações", (v) => (v.verificacoes = null)],
    ["linhas não é lista", (v) => (v.linhas = {})],
    ["erro incerto com tipo errado", (v) => (v.itens[0] = { situacao: "erro", incerto: "sim" })],
    ["id vazio", (v) => (v.id = "")],
  ];
  for (const [nome, mutar] of invalidos) {
    const v: Mutavel = exemplo();
    mutar(v);
    await area.gravar({ [CHAVE]: v });
    igual(`inválido (${nome}) carrega null`, await repo.carregar(HOST, "ana"), null);
    checar(`inválido (${nome}) é apagado`, !(CHAVE in (await area.obter())));
  }
  await area.gravar({ [CHAVE]: "texto" });
  igual("valor que não é objeto carrega null", await repo.carregar(HOST, "ana"), null);

  // apagar.
  await repo.gravar(exemplo());
  await repo.apagar("outro");
  checar("apagar de outro lote não remove", CHAVE in (await area.obter()));
  await repo.apagar("l1");
  checar("apagar remove a chave", !(CHAVE in (await area.obter())));
}
