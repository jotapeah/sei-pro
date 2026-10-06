import {
  completarComDependentes,
  dependentesTransitivos,
  deslocarDependentes,
  encontrarCiclo,
  mensagemDeCiclo,
  validarDependencias,
  violacoesDeDatas,
} from "../src/modelo/dependencias";
import { aplicarDatas, baseInicial, desvioUteis, redefinirBase, replanejada } from "../src/modelo/linhaDeBase";
import { etapa, HOJE } from "./fabrica";
import { checar, secao } from "./util";

export function verificarDependencias(): void {
  secao("projetos: dependencias e ciclo");
  const a = etapa({ id: "a", nome: "Nota técnica" });
  const b = etapa({ id: "b", nome: "Análise jurídica", dependeDe: ["a"] });
  const c = etapa({ id: "c", nome: "Minuta", dependeDe: ["b"] });
  checar("sem ciclo", encontrarCiclo([a, b, c]) === null);
  const ciclo = encontrarCiclo([{ ...a, dependeDe: ["c"] }, b, c]);
  checar("ciclo a -> c -> b -> a", ciclo?.join() === "a,c,b,a", ciclo);
  const nomes = new Map([a, b, c].map((e) => [e.id, e.nome]));
  checar(
    "mensagem nomeia o ciclo",
    mensagemDeCiclo(ciclo!, nomes) === "Dependência circular: “Nota técnica” → “Minuta” → “Análise jurídica” → “Nota técnica”.",
    mensagemDeCiclo(ciclo!, nomes),
  );
  checar("dependencia de id que nao existe nao e ciclo", encontrarCiclo([{ ...a, dependeDe: ["zzz"] }]) === null);
  checar(
    "depender de si mesma",
    validarDependencias({ id: "a", projeto: "p1", dependeDe: ["a"] }, [a]) === "Uma etapa não pode depender dela mesma.",
  );
  checar(
    "depender de outro projeto",
    validarDependencias({ id: "n", projeto: "p1", dependeDe: ["x"] }, [a, etapa({ id: "x", projeto: "p2" })]) ===
      "Uma etapa só pode depender de etapas do mesmo projeto.",
  );
  checar(
    "depender de etapa removida",
    validarDependencias({ id: "n", projeto: "p1", dependeDe: ["a"] }, [{ ...a, removidoEm: 5 }]) ===
      "Uma etapa só pode depender de etapas do mesmo projeto.",
  );
  checar(
    "editar a para depender de c fecha o ciclo e nomeia",
    validarDependencias({ id: "a", projeto: "p1", dependeDe: ["c"] }, [a, b, c])?.startsWith("Dependência circular: “Nota técnica”") ===
      true,
  );
  checar("etapa nova sem ciclo passa", validarDependencias({ id: "nova", projeto: "p1", dependeDe: ["a", "b"] }, [a, b, c]) === null);

  secao("projetos: dependentes e deslocamento");
  const d = etapa({ id: "d", dependeDe: ["b", "c"] });
  checar("transitivos em largura sem repetir", dependentesTransitivos([a, b, c, d], "a").join() === "b,c,d");
  checar("folha nao tem dependentes", dependentesTransitivos([a, b, c, d], "d").length === 0);
  const desl = deslocarDependentes([a, b, c], "a", 3);
  checar(
    "deslocar 3 dias corridos",
    desl.map((m) => `${m.id}:${m.inicio}:${m.fim}`).join() === "b:2026-10-08:2026-10-12,c:2026-10-08:2026-10-12",
    desl,
  );
  checar("deslocar 0 nao muda nada", deslocarDependentes([a, b, c], "a", 0).length === 0);
  checar(
    "removida nao anda",
    deslocarDependentes([a, { ...b, removidoEm: 1 }, c], "a", 2)
      .map((m) => m.id)
      .join() === "c",
  );
  const comp = completarComDependentes(
    [a, b, c],
    [
      { id: "a", inicio: "2026-10-07", fim: "2026-10-13" },
      { id: "b", inicio: "2026-10-07", fim: "2026-10-13" },
    ],
  );
  checar(
    "completar: c (escondida) anda +2 junto de a; b fica como veio",
    comp.map((m) => `${m.id}:${m.inicio}`).join() === "a:2026-10-07,b:2026-10-07,c:2026-10-07",
    comp,
  );
  checar(
    "violacao: comecar antes da etapa da qual depende",
    violacoesDeDatas([a, { ...b, inicio: "2026-10-01" }]).join() ===
      "“Análise jurídica” não pode começar antes de “Nota técnica”, da qual depende.",
  );
  checar(
    "violacao: termino antes do inicio",
    violacoesDeDatas([{ ...a, fim: "2026-10-01" }]).join() === "“Nota técnica” termina antes de começar.",
  );
  checar("violacao: marco com duas datas", violacoesDeDatas([{ ...a, marco: true }]).join() === "O marco “Nota técnica” tem uma data só.");
  checar("violacoes filtradas por ids", violacoesDeDatas([{ ...a, fim: "2026-10-01" }, b], new Set(["b"])).length === 0);

  secao("projetos: linha de base");
  checar("base inicial copia as datas", baseInicial("2026-10-07", "2026-10-09").fim === "2026-10-09");
  const plan = etapa({ id: "p", inicio: "2026-10-07", fim: "2026-10-09", base: { inicio: "2026-10-07", fim: "2026-10-09" } });
  const r1 = aplicarDatas(plan, "2026-10-13", "2026-10-16", HOJE);
  checar("em planejamento a base anda junto", r1.base.inicio === "2026-10-13" && r1.base.fim === "2026-10-16");
  const andando = etapa({ id: "q", inicio: "2026-09-01", fim: "2026-09-25", base: { inicio: "2026-09-01", fim: "2026-09-25" } });
  const r2 = aplicarDatas(andando, "2026-09-01", "2026-10-02", HOJE);
  checar("depois de comecar a base fica", r2.base.fim === "2026-09-25" && r2.fim === "2026-10-02");
  checar("inicio hoje ja conta como comecada", aplicarDatas({ ...plan, inicio: HOJE }, HOJE, "2026-10-20", HOJE).base.fim === "2026-10-09");
  const semBase = aplicarDatas({ inicio: "2026-09-01", fim: "2026-09-25" }, "2026-09-01", "2026-10-02", HOJE);
  checar("sem base e ja comecada: base nasce das datas de antes", semBase.base.fim === "2026-09-25");
  const replan = { ...andando, fim: "2026-10-02" };
  checar("replanejada", replanejada(replan) && !replanejada(andando) && !replanejada({ inicio: "x", fim: "y" }));
  checar("desvio da tela 1: 25/09 -> 02/10 = +5 dias uteis", desvioUteis(replan) === 5);
  checar("sem base, desvio 0", desvioUteis({ fim: "2026-10-02" }) === 0);
  checar("redefinir plano original", redefinirBase(replan).fim === "2026-10-02");
}
