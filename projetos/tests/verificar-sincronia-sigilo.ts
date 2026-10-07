/**
 * Rodada 5 da Tarefa 4 (a última): quem só tem o vínculo vazio do texto salva os diálogos sem apagar o processo
 * de quem tem o número (os diálogos de verdade, ligados ao repositório como o app os liga, e o motor com dois
 * computadores).
 */

import type { AbrirModal } from "@comum/ui/dialogo";
import type { ProjetoNaTela } from "../src/app/dados";
import { abrirDialogoEtapa, type ResultadoEtapa } from "../src/app/dialogos/etapa";
import { abrirDialogoProjeto } from "../src/app/dialogos/projeto";
import { resumoDoProjeto } from "../src/modelo/resumo";
import type { Etapa } from "../src/modelo/tipos";
import { type MudancasEtapa, moverEntreEscopos, type RepositorioProjetos } from "../src/repositorio";
import { telaDoApp } from "./apoioApp";
import { botao, checar, secao, tique } from "./util";
import { computador, jsonDe, noSei } from "./verificar-sincronia-documento";

const AGORA = Date.UTC(2026, 9, 6, 12);
const HOJE = "2026-10-06";
const ETAPA = { inicio: "2026-10-06", fim: "2026-10-09" } as const;
const X = "50300.000777/2026-10";
const Y = "50300.000888/2026-10";
const DOC = "1234567";
const DOC2 = "2345678";
const VV = JSON.stringify({ protocolo: "", sigiloso: true });

/** Os números sigilosos no texto (nenhum pode estar). */
async function noTextoHa(html: string | null) {
  const t = await jsonDe(html);
  return { X: t.includes("000777"), Y: t.includes("000888"), DOC: t.includes(DOC), DOC2: t.includes(DOC2) };
}

/** O projeto como a tela o recebe, a partir do repositório (o que o app monta em `dados.ts`). */
async function naTela(repo: RepositorioProjetos, id: string): Promise<ProjetoNaTela> {
  const d = await repo.dados();
  const projeto = d.projetos.find((x) => x.id === id);
  if (!projeto) throw new Error(`projeto ${id} nao esta vivo`);
  const etapas = d.etapas.filter((e) => e.projeto === id);
  return { projeto, vis: repo.escopo.vis, fases: d.fases.filter((f) => f.projeto === id), etapas, resumo: resumoDoProjeto(etapas, HOJE) };
}

/** O resultado do diálogo da etapa como o app o grava (`mudancasDoDialogo`: as opcionais vão, `undefined` quando ausentes). */
const mudancas = (r: ResultadoEtapa): MudancasEtapa => ({
  nome: r.nome,
  inicio: r.inicio,
  fim: r.fim,
  marco: r.marco,
  dependeDe: r.dependeDe,
  medida: r.medida,
  checklist: r.checklist,
  etiquetas: r.etiquetas,
  fase: r.fase,
  responsavel: r.responsavel,
  processo: r.processo,
  documento: r.documento,
  observacoes: r.observacoes,
});

const abrirModal: AbrirModal = (o) => {
  document.body.append(o.conteudo);
  return { fechar: () => o.conteudo.remove() };
};

/** A Ana tem X (projeto) e Y (processo próprio de E1, com DOC); E2 herda, com DOC2. A Bia só recebe os marcadores. */
async function cena() {
  const sei = noSei();
  const ana = computador("ana", "pc-ana");
  const bia = computador("bia", "pc-bia", AGORA + 5);
  const p = await ana.un.criarProjeto({ nome: "Apuração", processo: { protocolo: X, sigiloso: true } });
  const e1 = await ana.un.criarEtapa({ projeto: p.id, nome: "E1", ...ETAPA, processo: { protocolo: Y, sigiloso: true } });
  await ana.un.editarEtapa(e1.id, { documento: { numero: DOC } }, HOJE);
  const e2 = await ana.un.criarEtapa({ projeto: p.id, nome: "E2", ...ETAPA });
  await ana.un.editarEtapa(e2.id, { documento: { numero: DOC2 } }, HOJE);
  await ana.rodada(ana.un, sei);
  await bia.rodada(bia.un, sei);
  return { sei, ana, bia, p, e1, e2 };
}

/** Rodadas alternadas (a Bia primeiro); devolve quantas gravações cada uma fez. */
async function rodadas(c: Awaited<ReturnType<typeof cena>>, n = 3): Promise<number[]> {
  const g: number[] = [];
  for (let i = 0; i < n; i++) {
    for (const x of [c.bia, c.ana]) {
      const antes = c.sei.gravadas;
      await x.rodada(x.un, c.sei);
      g.push(c.sei.gravadas - antes);
    }
  }
  return g;
}

/** O diálogo "Editar projeto" da Bia ligado ao repositório como o `salvarProjeto` do app (edita e, se mudou, move). */
async function editarProjetoNaBia(c: Awaited<ReturnType<typeof cena>>, mexer: (f: HTMLElement) => void): Promise<void> {
  telaDoApp();
  const { bia, p } = c;
  abrirDialogoProjeto({
    abrirModal,
    hoje: HOJE,
    sigla: "S",
    projeto: await naTela(bia.un, p.id),
    modelos: [],
    processos: async () => [],
    salvar: async (r) => {
      await bia.un.editarProjeto(p.id, { nome: r.nome, processo: r.processo });
      if (r.vis !== "unidade") await moverEntreEscopos(bia.un, bia.eu, p.id);
    },
  });
  await tique();
  const f = document.querySelector(".prj-form-projeto") as HTMLElement;
  mexer(f);
  botao(f, "Salvar")!.click();
  await tique(40);
}

/** O diálogo da etapa da Bia ligado ao repositório como o `salvarEtapa` do app. */
async function editarEtapaNaBia(c: Awaited<ReturnType<typeof cena>>, e: Etapa, mexer: (f: HTMLElement) => void): Promise<void> {
  telaDoApp();
  const { bia, p } = c;
  const atual = (await bia.un.obterEtapa(e.id))!;
  abrirDialogoEtapa({
    abrirModal,
    projeto: await naTela(bia.un, p.id),
    etapa: atual,
    hoje: HOJE,
    agora: AGORA,
    usuarios: async () => [],
    processos: async () => [],
    etiquetas: [],
    salvar: async (r) => void (await bia.un.editarEtapa(e.id, mudancas(r), HOJE)),
  });
  await tique();
  const f = document.querySelector(".prj-form-etapa") as HTMLElement;
  mexer(f);
  botao(f, "Salvar")!.click();
  await tique(40);
}

const renomear = (nome: string) => (f: HTMLElement) => {
  const i = f.querySelector<HTMLInputElement>("input[name='nome']")!;
  i.value = nome;
};

export async function verificarSincroniaSigilo(): Promise<void> {
  secao("vinculo vazio nos dialogos (rodada 5): quem so tem o marcador renomeia o projeto sem apagar o processo de quem tem o numero");
  {
    const c = await cena();
    checar(
      "premissa: a bia so tem o vinculo vazio no projeto e na etapa, e o marcador do documento",
      JSON.stringify((await c.bia.un.obterProjeto(c.p.id))?.processo) === VV &&
        JSON.stringify((await c.bia.un.obterEtapa(c.e1.id))?.processo) === VV &&
        (await c.bia.un.obterEtapa(c.e1.id))?.documento?.numero === "",
    );
    await editarProjetoNaBia(c, renomear("Apuração 2"));
    const g = await rodadas(c);
    const ap = await c.ana.un.obterProjeto(c.p.id);
    checar(
      "a ana recebe o nome novo e mantem o processo dela (X, marcado)",
      ap?.nome === "Apuração 2" && ap.processo?.protocolo === X && ap.processo.sigiloso === true,
      ap?.processo,
    );
    checar(
      "a etapa que herda continua sigilosa na ana: o DOC2 dela segue marcado",
      (await c.ana.un.obterEtapa(c.e2.id))?.documento?.sigiloso === true,
      (await c.ana.un.obterEtapa(c.e2.id))?.documento,
    );
    checar("a bia segue com o vinculo vazio", JSON.stringify((await c.bia.un.obterProjeto(c.p.id))?.processo) === VV);
    checar(
      "nenhum numero sigiloso no texto, e converge (a ultima volta nao regrava)",
      Object.values(await noTextoHa(c.sei.html)).every((v) => !v) && g.slice(-2).every((x) => x === 0),
      { texto: await noTextoHa(c.sei.html), g },
    );
  }

  secao("vinculo vazio nos dialogos (rodada 5): renomear a etapa de processo proprio marcador");
  {
    const c = await cena();
    await editarEtapaNaBia(c, c.e1, renomear("E1 renomeada"));
    const g = await rodadas(c);
    const ea = await c.ana.un.obterEtapa(c.e1.id);
    checar(
      "a ana recebe o nome novo e mantem o processo proprio (Y) e o documento (DOC), marcados",
      ea?.nome === "E1 renomeada" && ea.processo?.protocolo === Y && ea.processo.sigiloso === true && ea.documento?.numero === DOC,
      ea,
    );
    checar(
      "a bia segue com o vinculo vazio e o marcador",
      JSON.stringify((await c.bia.un.obterEtapa(c.e1.id))?.processo) === VV &&
        (await c.bia.un.obterEtapa(c.e1.id))?.documento?.numero === "",
    );
    checar(
      "nenhum numero sigiloso no texto, e converge",
      Object.values(await noTextoHa(c.sei.html)).every((v) => !v) && g.slice(-2).every((x) => x === 0),
      { texto: await noTextoHa(c.sei.html), g },
    );
  }

  secao("vinculo vazio nos dialogos (rodada 5): mudar Quem ve leva o vinculo vazio (nao a remocao)");
  {
    const c = await cena();
    await editarProjetoNaBia(c, (f) => {
      const eu = f.querySelector<HTMLInputElement>("input[value='eu']")!;
      eu.checked = true;
    });
    await rodadas(c);
    checar(
      "no Só eu da bia, o projeto e a etapa seguem com o vinculo vazio",
      JSON.stringify((await c.bia.eu.obterProjeto(c.p.id))?.processo) === VV &&
        JSON.stringify((await c.bia.eu.obterEtapa(c.e1.id))?.processo) === VV,
      [(await c.bia.eu.obterProjeto(c.p.id))?.processo, (await c.bia.eu.obterEtapa(c.e1.id))?.processo],
    );
    const lapide = (await c.ana.un.entidades()).p.find((x) => x.id === c.p.id);
    checar(
      "a lapide que chega a ana mantem o processo dela (X): saiu da unidade, nao perdeu o processo",
      lapide?.removidoEm !== undefined && lapide.processo?.protocolo === X,
      lapide?.processo,
    );
    checar(
      "nenhum numero sigiloso no texto",
      Object.values(await noTextoHa(c.sei.html)).every((v) => !v),
      await noTextoHa(c.sei.html),
    );
  }
}
