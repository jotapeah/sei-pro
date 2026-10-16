import { areaMemoria } from "@comum/armazenamento/area";
import { TETO } from "../src/modelo/constantes";
import { type LoteEmAndamento, RepositorioLote } from "../src/repositorio";
import { checar, igual, secao } from "./util";

function exemplo(login = "ana"): LoteEmAndamento {
  return {
    id: "l1",
    host: "sei.exemplo.gov.br",
    login,
    iniciadoEm: 1000,
    parametros: { idTipo: "100", nomeTipo: "Tipo X", nivelAcesso: "0", hipoteseLegal: "", nomeHipotese: "", pausa: 500 },
    linhas: [{ especificacao: "A" }, { especificacao: "B" }, { especificacao: "C" }, { especificacao: "D" }],
    itens: [{ situacao: "pendente" }, { situacao: "pendente" }, { situacao: "pendente" }, { situacao: "pendente" }],
  };
}

// Dado corrompido nao respeita os tipos: o teste mexe nele livremente.
// biome-ignore lint/suspicious/noExplicitAny: fixture de dado corrompido
type Mutavel = any;

export async function verificarRepositorio(): Promise<void> {
  secao("RepositorioLote");
  const escopo = "sei.exemplo.gov.br|ana";

  const area = areaMemoria();
  const repo = new RepositorioLote(area, escopo);
  igual("vazio le null", await repo.ler(), null);
  await repo.gravar(exemplo());
  igual("ida e volta", await repo.ler(), exemplo());
  checar("chave lote/<escopo>/atual", `lote/${escopo}/atual` in (await area.obter()));

  const criado = { numero: "1/2026", idProcedimento: "9", url: "u" };
  await repo.marcar(1, { situacao: "ok", criado });
  const l = await repo.ler();
  igual(
    "marcar so o indice pedido",
    l?.itens.map((i) => i.situacao),
    ["pendente", "ok", "pendente", "pendente"],
  );
  igual("marcar guarda criado", l?.itens[1]?.criado, criado);

  // Sequencial: a releitura enxerga o que a outra instancia gravou antes (nao prova corrida simultanea).
  const outra = new RepositorioLote(area, escopo);
  await outra.marcar(3, { situacao: "erro", erro: "falhou" });
  await repo.marcar(0, { situacao: "ok", criado });
  igual(
    "marcar rele o gravado antes (sequencial)",
    (await repo.ler())?.itens.map((i) => i.situacao),
    ["ok", "ok", "pendente", "erro"],
  );

  const mix = exemplo();
  mix.itens = [{ situacao: "ok" }, { situacao: "erro" }, { situacao: "pendente" }, { situacao: "ok" }];
  igual("pendentes inclui erro e pendente, em ordem", repo.pendentes(mix), [1, 2]);

  await new RepositorioLote(area, "sei.exemplo.gov.br|bia").gravar(exemplo("bia"));
  igual("escopos nao se misturam", (await repo.ler())?.login, "ana");
  igual("outro escopo", (await new RepositorioLote(area, "sei.exemplo.gov.br|bia").ler())?.login, "bia");

  await repo.descartar();
  igual("descartar", await repo.ler(), null);
  igual("descartar nao afeta outro escopo", (await new RepositorioLote(area, "sei.exemplo.gov.br|bia").ler())?.login, "bia");
  await repo.marcar(0, { situacao: "ok" });
  igual("marcar sem lote nao cria", await repo.ler(), null);

  const k = `lote/${escopo}/atual`;
  const sem = exemplo() as unknown as Record<string, unknown>;
  sem.parametros = { nomeTipo: "x" };
  igual("sem idTipo le null", await new RepositorioLote(areaMemoria({ [k]: sem }), escopo).ler(), null);
  const itensRuins = { ...exemplo(), itens: "x" };
  igual("itens nao-array le null", await new RepositorioLote(areaMemoria({ [k]: itensRuins }), escopo).ler(), null);
  const tam = { ...exemplo(), itens: [{ situacao: "ok" }] };
  igual("itens.length != linhas.length le null", await new RepositorioLote(areaMemoria({ [k]: tam }), escopo).ler(), null);
  igual("lixo le null", await new RepositorioLote(areaMemoria({ [k]: 42 }), escopo).ler(), null);

  // Concorrencia na mesma instancia: sem fila, a ultima escrita perderia as outras.
  const conc = new RepositorioLote(areaMemoria(), escopo);
  await conc.gravar(exemplo());
  const ok = (n: string) => ({ situacao: "ok" as const, criado: { numero: n, idProcedimento: n, url: "u" } });
  await Promise.all([conc.marcar(1, ok("1")), conc.marcar(2, ok("2")), conc.marcar(3, ok("3"))]);
  igual(
    "marcar concorrente persiste os tres",
    (await conc.ler())?.itens.map((i) => i.situacao),
    ["pendente", "ok", "ok", "ok"],
  );
  const base = areaMemoria();
  let falhar = true;
  const aposErro = new RepositorioLote({ ...base, gravar: (i) => (falhar ? Promise.reject(new Error("falha")) : base.gravar(i)) }, escopo);
  let rejeitou = false;
  await aposErro.gravar(exemplo()).catch(() => {
    rejeitou = true;
  });
  checar("erro chega a quem chamou", rejeitou);
  falhar = false;
  await aposErro.gravar(exemplo());
  checar("fila segue viva apos erro", (await aposErro.ler()) !== null);

  const invalido = async (nome: string, mexer: (l: Mutavel) => void) => {
    const l = JSON.parse(JSON.stringify(exemplo())) as Mutavel;
    mexer(l);
    igual(nome, await new RepositorioLote(areaMemoria({ [k]: l }), escopo).ler(), null);
  };
  await invalido("situacao invalida le null", (l) => {
    l.itens[0].situacao = "feito";
  });
  await invalido("ok sem criado le null", (l) => {
    l.itens[0] = { situacao: "ok" };
  });
  await invalido("ok com criado sem numero le null", (l) => {
    l.itens[0] = { situacao: "ok", criado: { idProcedimento: "1", url: "u" } };
  });
  await invalido("criado sem numero em erro le null", (l) => {
    l.itens[0] = { situacao: "erro", criado: {} };
  });
  await invalido("null em linhas le null", (l) => {
    l.linhas[1] = null;
  });
  await invalido("pausa NaN le null", (l) => {
    l.parametros.pausa = Number.NaN;
  });
  await invalido("nivelAcesso invalido le null", (l) => {
    l.parametros.nivelAcesso = "2";
  });
  await invalido("mais de TETO linhas le null", (l) => {
    l.linhas = Array.from({ length: TETO + 1 }, () => ({ especificacao: "x" }));
    l.itens = l.linhas.map(() => ({ situacao: "pendente" }));
  });

  for (const ruim of ["", "|", "host|", "|login", "semBarra"]) {
    let lancou = false;
    try {
      new RepositorioLote(areaMemoria(), ruim);
    } catch {
      lancou = true;
    }
    checar(`escopo invalido "${ruim}" lanca`, lancou);
  }
}
