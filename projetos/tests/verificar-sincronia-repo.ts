/**
 * O que a sincronia pede ao repositório (P4): a importação não regrava o que
 * ficaria igual (senão cada rodada ouviria a própria gravação e leria de novo,
 * sem fim), o documento de etapa sigilosa que chega vazio fica, a linha de base
 * segue a regra da etapa e o modelo não passa de 2100.
 */

import { areaMemoria } from "@comum/armazenamento/area";
import { LIMITE_DIAS_ETAPA } from "../src/modelo/calendario";
import type { Etapa, Projeto } from "../src/modelo/tipos";
import { MODELOS_EMBUTIDOS } from "../src/modelos/embutidos";
import { entidadeValida, manterDocumentoSigiloso } from "../src/repositorio";
import { ESCOPO_UN, novoRepo } from "./apoioRepositorio";
import { etapa, projeto } from "./fabrica";
import { checar, lanca, secao } from "./util";

/** O que o Texto Padrão leva de um vínculo sigiloso: nada do número. */
const semNumero = <T extends { processo?: { protocolo: string; sigiloso?: boolean } }>(x: T): T =>
  x.processo?.sigiloso ? { ...x, processo: { protocolo: "", sigiloso: true } } : x;

export async function verificarSincroniaRepo(): Promise<void> {
  secao("sincronia no repositorio: a importacao nao regrava o que ficaria igual");
  const area = areaMemoria();
  const { repo } = novoRepo(ESCOPO_UN, area, "s");
  const p = await repo.criarProjeto({ nome: "Sindicância", processo: { protocolo: "50300.000777/2026-10", sigiloso: true } });
  const e = await repo.criarEtapa({
    projeto: p.id,
    nome: "Oitiva",
    inicio: "2026-10-06",
    fim: "2026-10-09",
    documento: { numero: "1234567", titulo: "Termo" },
  });
  const ent = await repo.entidades();
  let avisos = 0;
  const parar = repo.aoMudar(() => avisos++);
  // A cópia que foi ao Texto Padrão: mesmos carimbos, sem o número do processo e sem o documento.
  const doTexto = {
    ...ent,
    p: ent.p.map(semNumero),
    e: ent.e.map((x) => {
      const { documento: _d, ...resto } = x;
      return resto as Etapa;
    }),
  };
  const r1 = await repo.importar(doTexto);
  checar(
    "a propria copia do Texto Padrao volta: nada gravado e nenhum aviso (sem laco de rodadas)",
    r1.novos === 0 && r1.atualizados === 0 && avisos === 0,
    { r1, avisos },
  );
  const local = await repo.obterEtapa(e.id);
  checar(
    "o numero do processo e o documento continuam aqui",
    (await repo.obterProjeto(p.id))?.processo?.protocolo === "50300.000777/2026-10" && local?.documento?.numero === "1234567",
    local,
  );
  const r2 = await repo.importar(await repo.entidades());
  checar("importar o proprio estado: nada gravado", r2.novos === 0 && r2.atualizados === 0 && avisos === 0);
  parar();

  secao("sincronia no repositorio: documento de etapa sigilosa que chega sem numero");
  const colega = {
    ...(local as Etapa),
    nome: "Oitiva das testemunhas",
    atualizadoEm: (local as Etapa).atualizadoEm + 50,
    dispositivo: "dev-b",
  };
  delete (colega as Partial<Etapa>).documento;
  await repo.importar({ e: [colega] });
  const depois = await repo.obterEtapa(e.id);
  checar(
    "o colega mudou o nome (projeto sigiloso): o nome vem, o documento daqui fica",
    depois?.nome === "Oitiva das testemunhas" && depois.documento?.numero === "1234567",
    depois,
  );
  {
    // Só parte mudou: a cópia de A (sem documento, mesmo carimbo) vence o desempate e volta igual; B mudou de verdade.
    const base = areaMemoria();
    const gravacoes: string[][] = [];
    const espiao = {
      ...base,
      gravar: async (i: Record<string, unknown>) => {
        gravacoes.push(Object.keys(i));
        return base.gravar(i);
      },
      aoMudar: base.aoMudar.bind(base),
    } as typeof base;
    const { repo: r5 } = novoRepo(ESCOPO_UN, espiao, "q");
    const p5 = await r5.criarProjeto({ nome: "Apuração", processo: { protocolo: "50300.000888/2026-10", sigiloso: true } });
    const a = await r5.criarEtapa({ projeto: p5.id, nome: "A", inicio: "2026-10-06", fim: "2026-10-09", documento: { numero: "111" } });
    const b = await r5.criarEtapa({ projeto: p5.id, nome: "B", inicio: "2026-10-06", fim: "2026-10-09" });
    const ent5 = await r5.entidades();
    gravacoes.length = 0;
    let avisos5 = 0;
    const parar5 = r5.aoMudar(() => avisos5++);
    const { documento: _semDoc, ...copiaA } = a;
    const bColega: Etapa = { ...b, nome: "B revisada", atualizadoEm: b.atualizadoEm + 50, dispositivo: "dev-b" };
    const r5r = await r5.importar({ p: ent5.p.map(semNumero), e: [copiaA as Etapa, bColega], h: ent5.h });
    checar(
      "so parte mudou: grava so ela, numa gravacao, e avisa uma vez",
      r5r.novos === 0 &&
        r5r.atualizados === 1 &&
        avisos5 === 1 &&
        gravacoes.length === 1 &&
        gravacoes[0]?.join() === r5.etapas.chave(b.id) &&
        (await r5.obterEtapa(a.id))?.documento?.numero === "111",
      { r5r, avisos5, gravacoes },
    );
    parar5();
  }
  const comum = etapa({ id: "x1", projeto: "p9", documento: { numero: "999" }, atualizadoEm: 10 });
  const semDoc = etapa({ id: "x1", projeto: "p9", atualizadoEm: 20 });
  checar("etapa comum: o colega tirou o documento e ele sai", manterDocumentoSigiloso(semDoc, comum, false).documento === undefined);
  const propria = etapa({ id: "x2", processo: { protocolo: "", sigiloso: true }, atualizadoEm: 20 });
  const propriaLocal = etapa({ id: "x2", processo: { protocolo: "50300.1/2026-1", sigiloso: true }, documento: { numero: "55" } });
  checar(
    "processo proprio sigiloso: o documento daqui fica",
    manterDocumentoSigiloso(propria, propriaLocal, false).documento?.numero === "55",
  );
  const propriaComum = etapa({ id: "x3", processo: { protocolo: "50300.2/2026-1" }, atualizadoEm: 20 });
  checar(
    "processo proprio NAO sigiloso num projeto sigiloso: vale o que chegou",
    manterDocumentoSigiloso(propriaComum, etapa({ id: "x3", documento: { numero: "66" } }), true).documento === undefined,
  );

  secao("sincronia no repositorio: linha de base com a regra da etapa");
  const torta = etapa({ id: "t1", inicio: "2026-10-10", fim: "2026-10-08", base: { inicio: "2026-10-10", fim: "2026-10-08" } });
  checar("etapa torta com a base torta (arraste do planejamento) e aceita", entidadeValida(torta, "e"));
  checar(
    "base de mais de ~10 anos continua recusada",
    !entidadeValida(etapa({ id: "t2", base: { inicio: "2000-01-01", fim: "2015-01-01" } }), "e") && LIMITE_DIAS_ETAPA < 5000,
  );
  const { repo: r3 } = novoRepo(ESCOPO_UN, areaMemoria(), "t");
  const pt: Projeto = projeto({ id: "pt" });
  const rt = await r3.importar({ p: [pt], e: [{ ...torta, projeto: "pt" }] });
  checar("e a importacao a aceita (os outros computadores tambem)", rt.novos === 2 && rt.ignorados === 0, rt);

  secao("sincronia no repositorio: processo e documento so com forma de numero (dado de colega)");
  const comProcesso = (processo: unknown) => projeto({ id: "pp", processo: processo as Projeto["processo"] });
  checar(
    "numero de processo comum e aceito",
    entidadeValida(comProcesso({ protocolo: "50300.000777/2026-10", idProcedimento: "77" }), "p"),
  );
  checar("vinculo sigiloso vazio (o do texto) e aceito", entidadeValida(comProcesso({ protocolo: "", sigiloso: true }), "p"));
  checar("protocolo com letras ou marcacao e recusado", !entidadeValida(comProcesso({ protocolo: "<img src=x onerror=alert(1)>" }), "p"));
  checar("protocolo de 41 caracteres e recusado", !entidadeValida(comProcesso({ protocolo: "1".repeat(41) }), "p"));
  checar("idProcedimento que nao e numero e recusado", !entidadeValida(comProcesso({ protocolo: "123", idProcedimento: "abc" }), "p"));
  checar(
    "documento com numero de 41 caracteres e recusado; titulo longo tambem",
    !entidadeValida(etapa({ id: "d1", documento: { numero: "1".repeat(41) } }), "e") &&
      !entidadeValida(etapa({ id: "d2", documento: { numero: "1", titulo: "t".repeat(201) } }), "e"),
  );

  secao("sincronia no repositorio: modelo nao passa de 2100");
  const modelo = MODELOS_EMBUTIDOS[0]!;
  const { repo: r4 } = novoRepo(ESCOPO_UN, areaMemoria(), "m");
  const fora = await lanca(() => r4.criarProjetoDeModelo({ nome: "Fora" }, modelo, "2101-01-03"));
  checar("comeco depois de 2100: recusado", /2000 e 2100/.test(String((fora as { mensagens?: string[] })?.mensagens)), fora);
  const passa = await lanca(() => r4.criarProjetoDeModelo({ nome: "Quase" }, modelo, "2100-12-20"));
  checar(
    "comeco em 20/12/2100 empurra etapas para 2101: recusado",
    /passaria de 2100/.test(String((passa as { mensagens?: string[] })?.mensagens)),
    passa,
  );
  checar("nada gravado", (await r4.dados()).projetos.length === 0);
  const ok = await r4.criarProjetoDeModelo({ nome: "Dentro" }, modelo, "2026-10-06");
  checar("comeco normal: cria", !!ok.id && (await r4.dados()).etapas.length === modelo.etapas.length);
}
