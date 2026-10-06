import { areaMemoria } from "@comum/armazenamento/area";
import { LIMITES } from "../src/modelo/constantes";
import { ErroValidacao } from "../src/modelo/validacao";
import { ESCOPO_EU, novoRepo } from "./apoioRepositorio";
import { HOJE } from "./fabrica";
import { checar, lanca, secao } from "./util";

const mensagens = (e: unknown) => (e instanceof ErroValidacao ? e.mensagens.join(" | ") : String(e));

export async function verificarRepositorio(): Promise<void> {
  secao("projetos: repositorio - projetos");
  const { repo, area } = novoRepo();
  const p = await repo.criarProjeto({ nome: "  Revisão da Resolução  ", etiquetas: ["Normativo"] });
  checar("chave por escopo e tipo", Object.keys(await area.obter(null)).includes(`projetos/sei.x.gov.br|ana|u:110/un/p/${p.id}`));
  checar("nome limpo e alteradoPor", p.nome === "Revisão da Resolução" && p.alteradoPor === "ana");
  const erroNome = await lanca(() => repo.criarProjeto({ nome: " " }));
  checar("projeto sem nome e recusado", mensagens(erroNome) === "Informe o nome do projeto.");
  const ed = await repo.editarProjeto(p.id, { nome: "Revisão 5.432", processo: { protocolo: "50300.001234/2026-11" } });
  checar("editar projeto", ed.nome === "Revisão 5.432" && ed.processo?.protocolo === "50300.001234/2026-11");
  checar("arquivar", (await repo.arquivarProjeto(p.id)).arquivadoEm !== undefined);
  checar("reativar", (await repo.reativarProjeto(p.id)).arquivadoEm === undefined);

  secao("projetos: repositorio - fases e etapas");
  const f1 = await repo.criarFase(p.id, "Instrução");
  checar("criarFase reusa a de mesmo nome (sem acento/caixa)", (await repo.criarFase(p.id, " instrucao ")).id === f1.id);
  const e1 = await repo.criarEtapa({ projeto: p.id, nome: "Nota técnica", inicio: "2026-10-07", fim: "2026-10-09", fase: f1.id });
  const e2 = await repo.criarEtapa({ projeto: p.id, nome: "Análise", inicio: "2026-10-13", fim: "2026-10-16", dependeDe: [e1.id] });
  checar("etapas ganham ordem crescente", e1.ordem < e2.ordem);
  checar("base nasce com as datas", e1.base?.inicio === "2026-10-07" && e1.base?.fim === "2026-10-09");
  const erroCiclo = await lanca(() => repo.editarEtapa(e1.id, { dependeDe: [e2.id] }, HOJE));
  checar(
    "ciclo recusado com os nomes",
    mensagens(erroCiclo) === "Dependência circular: “Nota técnica” → “Análise” → “Nota técnica”.",
    mensagens(erroCiclo),
  );
  const erroDatas = await lanca(() => repo.editarEtapa(e1.id, { fim: "2026-10-01" }, HOJE));
  checar("termino antes do inicio recusado", mensagens(erroDatas) === "O término não pode ser antes do início.");
  const erroFase = await lanca(() => repo.criarEtapa({ projeto: p.id, nome: "x", inicio: HOJE, fim: HOJE, fase: "nao-existe" }));
  checar("fase inexistente recusada", mensagens(erroFase) === "A fase escolhida não existe mais.");
  const planejada = await repo.editarEtapa(e1.id, { inicio: "2026-10-08", fim: "2026-10-14" }, HOJE);
  checar("em planejamento a base anda junto", planejada.base?.inicio === "2026-10-08" && planejada.base?.fim === "2026-10-14");
  const comResp = await repo.editarEtapa(e1.id, { responsavel: { nome: "Carla Dias" }, observacoes: "obs" }, HOJE);
  checar("responsavel gravado", comResp.responsavel?.nome === "Carla Dias");
  const semResp = await repo.editarEtapa(e1.id, { responsavel: undefined, observacoes: "  " }, HOJE);
  checar("responsavel: undefined apaga; observacao em branco some", !("responsavel" in semResp) && !("observacoes" in semResp));
  const marco = await repo.editarEtapa(e2.id, { marco: true }, HOJE);
  checar("virar marco iguala o termino ao inicio", marco.fim === marco.inicio && marco.marco);
  const andando = await repo.editarEtapa(e1.id, { inicio: "2026-10-01", fim: "2026-10-14" }, "2026-10-07");
  const replan = await repo.editarEtapa(e1.id, { fim: "2026-10-21" }, "2026-10-07");
  checar(
    "depois de comecar a base congela",
    andando.base?.fim === "2026-10-14" && replan.base?.fim === "2026-10-14" && replan.fim === "2026-10-21",
  );
  checar(
    "redefinir plano original",
    (await repo.redefinirPlanoOriginal(p.id)) === 1 && (await repo.obterEtapa(e1.id))?.base?.fim === "2026-10-21",
  );

  secao("projetos: repositorio - concluir, arrastar, remover");
  const conc = await repo.concluirEtapa(e1.id, HOJE, { numero: "1234567" });
  checar("concluir com data de hoje e documento", conc.concluidaEm === HOJE && conc.documento?.numero === "1234567");
  checar("reabrir", (await repo.reabrirEtapa(e1.id)).concluidaEm === undefined);
  const e3 = await repo.criarEtapa({ projeto: p.id, nome: "Minuta", inicio: "2026-11-02", fim: "2026-11-06", dependeDe: [e1.id] });
  const movidas = await repo.moverDatas([{ id: e3.id, inicio: "2026-11-09", fim: "2026-11-13" }], HOJE);
  checar("moverDatas grava e leva a base (planejamento)", movidas[0]?.inicio === "2026-11-09" && movidas[0]?.base?.inicio === "2026-11-09");
  const erroArraste = await lanca(() => repo.moverDatas([{ id: e3.id, inicio: "2026-09-01", fim: "2026-09-05" }], HOJE));
  checar("arraste para antes da dependencia recusado", mensagens(erroArraste).includes("não pode começar antes de “Nota técnica”"));
  checar("arraste recusado nao gravou", (await repo.obterEtapa(e3.id))?.inicio === "2026-11-09");
  const marcoArr = await repo.moverDatas([{ id: e2.id, inicio: "2026-10-20", fim: "2026-10-22" }], HOJE);
  checar("arrastar marco mantem uma data so", marcoArr[0]?.fim === "2026-10-20");
  await repo.removerEtapa(e3.id);
  checar("remover etapa grava lapide (sai dos dados)", !(await repo.dados()).etapas.some((e) => e.id === e3.id));
  checar("restaurar etapa", (await repo.restaurarEtapa(e3.id))?.removidoEm === undefined);
  await repo.removerFase(f1.id);
  checar("remover fase deixa a etapa sem fase", (await repo.obterEtapa(e1.id))?.fase === undefined);
  await repo.removerProjeto(p.id);
  const d0 = await repo.dados();
  checar("remover projeto leva fases e etapas", !d0.projetos.length && !d0.etapas.length);
  await repo.restaurarProjeto(p.id);
  const d1 = await repo.dados();
  checar("desfazer devolve projeto e etapas removidas junto", d1.projetos.length === 1 && d1.etapas.length === 3, d1.etapas.length);
  checar("etapa removida antes nao volta junto", (await repo.etapas.obter(e3.id))?.removidoEm === undefined);

  secao("projetos: repositorio - duplicar e historico");
  const dup = await repo.duplicarProjeto(p.id);
  const dd = await repo.dados();
  const copias = dd.etapas.filter((e) => e.projeto === dup.id);
  checar("duplicar: nome e quantidade de etapas", dup.nome === "Cópia de Revisão 5.432" && copias.length === 3);
  const minuta = copias.find((e) => e.nome === "Minuta");
  const nota = copias.find((e) => e.nome === "Nota técnica");
  checar("duplicar remapeia dependencias", !!nota && minuta?.dependeDe.join() === nota.id);
  checar(
    "duplicar recomeca a execucao",
    copias.every((e) => !e.concluidaEm && !e.documento),
  );
  const hist = await repo.historico(p.id);
  checar("historico do projeto em ordem decrescente", hist.length > 5 && hist[0]!.quando >= hist[hist.length - 1]!.quando);
  checar(
    "historico tem por e nome",
    hist.every((r) => r.por === "ana" && r.nome === "Ana Lima"),
  );
  checar(
    "historico registra a conclusao",
    hist.some((r) => r.campo === "conclusao" && r.depois === HOJE),
  );

  secao("projetos: repositorio - limites");
  const { repo: cheio } = novoRepo(ESCOPO_EU, areaMemoria());
  for (let i = 0; i < LIMITES.projetosAtivos; i++) await cheio.criarProjeto({ nome: `P${i}` });
  const erroLimite = await lanca(() => cheio.criarProjeto({ nome: "mais um" }));
  checar("101o projeto ativo recusado", mensagens(erroLimite) === "Limite de 100 projetos ativos em “Só eu”. Arquive ou exclua algum.");
  const primeiro = (await cheio.dados()).projetos[0]!;
  await cheio.arquivarProjeto(primeiro.id);
  checar("arquivado libera vaga", (await cheio.criarProjeto({ nome: "agora cabe" })).nome === "agora cabe");
  checar("reativar sem vaga e recusado", mensagens(await lanca(() => cheio.reativarProjeto(primeiro.id))).startsWith("Limite de 100"));
  const { repo: r2 } = novoRepo();
  const pp = await r2.criarProjeto({ nome: "Grande" });
  for (let i = 0; i < LIMITES.etapasPorProjeto; i++)
    await r2.etapas.gravar(`x${i}`, {
      id: `x${i}`,
      projeto: pp.id,
      ordem: "a0",
      nome: "x",
      inicio: HOJE,
      fim: HOJE,
      marco: false,
      dependeDe: [],
      medida: "manual",
      progresso: 0,
      checklist: [],
      etiquetas: [],
      criadoEm: 1,
      atualizadoEm: 1,
      dispositivo: "d",
    });
  checar(
    "301a etapa recusada",
    mensagens(await lanca(() => r2.criarEtapa({ projeto: pp.id, nome: "y", inicio: HOJE, fim: HOJE }))) ===
      "Um projeto pode ter até 300 etapas.",
  );
  const { repo: r3 } = novoRepo();
  const p3 = await r3.criarProjeto({ nome: "Hist" });
  for (let i = 0; i < 310; i++) await r3.editarProjeto(p3.id, { nome: `Hist ${i}` });
  checar("historico podado em 300 registros", (await r3.historico()).length === LIMITES.historico);
}
