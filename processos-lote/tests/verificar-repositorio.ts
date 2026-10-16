import { areaMemoria } from "@comum/armazenamento/area";
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

  // Outra instancia grava entre a leitura e a marcacao: a releitura preserva o que ela fez.
  const outra = new RepositorioLote(area, escopo);
  await outra.marcar(3, { situacao: "erro", erro: "falhou" });
  await repo.marcar(0, { situacao: "ok", criado });
  igual(
    "marcar rele antes de gravar",
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
}
