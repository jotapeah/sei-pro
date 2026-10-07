/**
 * Rodada 5 da Tarefa 4 (a última): quem só tem o vínculo vazio do texto salva os diálogos sem apagar o processo
 * de quem tem o número (os diálogos de verdade, ligados ao repositório como o app os liga, e o motor com dois
 * computadores); e a origem na memória do sigilo: o que uma gravação daqui tira do estado é local, só a marca do
 * campo que ela mudou é local, e a cascata em lápide ou item de colega é aprendida.
 */

import { type Area, areaMemoria } from "@comum/armazenamento/area";
import type { AbrirModal } from "@comum/ui/dialogo";
import type { ProjetoNaTela } from "../src/app/dados";
import { abrirDialogoEtapa, type ResultadoEtapa } from "../src/app/dialogos/etapa";
import { abrirDialogoProjeto } from "../src/app/dialogos/projeto";
import { prefixoMemoriaSigilo } from "../src/modelo/constantes";
import { resumoDoProjeto } from "../src/modelo/resumo";
import type { Etapa } from "../src/modelo/tipos";
import { type MudancasEtapa, moverEntreEscopos, type RepositorioProjetos } from "../src/repositorio";
import { itemDoMenu, telaDoApp } from "./apoioApp";
import { botao, checar, secao, tique } from "./util";
import { abrirAba, balao, clicarLinha, montar } from "./verificar-app";
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

  // ---------- a origem na memoria do sigilo (itens 2 a 4 da rodada 5) ----------

  secao("memoria do sigilo (rodada 5): com as aprendidas cheias, o que uma gravacao daqui tira do estado entra como local");
  for (const encher of [false, true]) {
    // A Ana sabe o DOC sigiloso; a Bia o digitou numa etapa comum e o recebeu marcado; depois a Bia o tira.
    const sei = noSei();
    const ana = computador("ana", "pc-ana");
    const bia = computador("bia", "pc-bia", AGORA + 5, encher ? cheia("bia") : areaMemoria());
    const pa = await ana.un.criarProjeto({ nome: "Apuração", processo: { protocolo: X, sigiloso: true } });
    const e1 = await ana.un.criarEtapa({ projeto: pa.id, nome: "Oitiva", ...ETAPA });
    await ana.un.editarEtapa(e1.id, { documento: { numero: DOC } }, HOJE);
    await ana.rodada(ana.un, sei);
    const pb = await bia.un.criarProjeto({ nome: "Comum" });
    const e3 = await bia.un.criarEtapa({ projeto: pb.id, nome: "Referência", ...ETAPA });
    await bia.un.editarEtapa(e3.id, { documento: { numero: DOC } }, HOJE);
    for (const c of [bia, ana, bia]) await c.rodada(c.un, sei);
    checar(
      `cheia=${encher}: premissa: a bia tem o DOC marcado e o texto nao o leva`,
      (await bia.un.obterEtapa(e3.id))?.documento?.sigiloso === true && !(await jsonDe(sei.html)).includes(DOC),
    );
    await bia.un.editarEtapa(e3.id, { documento: undefined }, HOJE);
    const v: boolean[] = [];
    for (let i = 0; i < 2; i++)
      for (const c of [bia, ana]) {
        await c.rodada(c.un, sei);
        v.push((await jsonDe(sei.html)).includes(DOC));
      }
    checar(
      `cheia=${encher}: a bia tirou o DOC: ele nao vai ao texto em nenhuma rodada (os registros dela seguem raspados)`,
      v.every((x) => !x),
      v,
    );
    // Com vaga, o DOC já era aprendido e os registros seguem raspados por ele (não sai do estado); cheia, sai com a
    // gravação daqui, que o guarda como local.
    const esperado = encher ? "local" : "aprendida";
    checar(
      `cheia=${encher}: e o DOC fica na memoria da bia (${esperado})`,
      (await origem(bia.area, "bia", `d/${DOC}`)) === esperado,
      await origem(bia.area, "bia", `d/${DOC}`),
    );
  }
  for (const encher of [false, true]) {
    // O mesmo com o processo: a Bia tinha K numa etapa comum; a Ana o sabe sigiloso; a Bia o recebe marcado e o tira.
    const sei = noSei();
    const ana = computador("ana", "pc-ana");
    const bia = computador("bia", "pc-bia", AGORA + 5, encher ? cheia("bia") : areaMemoria());
    await ana.un.criarProjeto({ nome: "Apuração", processo: { protocolo: K, sigiloso: true } });
    await ana.rodada(ana.un, sei);
    const pb = await bia.un.criarProjeto({ nome: "Comum" });
    const e3 = await bia.un.criarEtapa({ projeto: pb.id, nome: "Referência", ...ETAPA, processo: { protocolo: K } });
    for (const c of [bia, ana, bia]) await c.rodada(c.un, sei);
    checar(
      `cheia=${encher}: premissa: a bia tem K marcado na etapa dela e o texto nao o leva`,
      (await bia.un.obterEtapa(e3.id))?.processo?.sigiloso === true && !(await jsonDe(sei.html)).includes("000555"),
    );
    await bia.un.editarEtapa(e3.id, { processo: undefined }, HOJE);
    const v: boolean[] = [];
    for (let i = 0; i < 2; i++)
      for (const c of [bia, ana]) {
        await c.rodada(c.un, sei);
        v.push((await jsonDe(sei.html)).includes("000555"));
      }
    checar(
      `cheia=${encher}: a bia tirou K: ele nao vai ao texto em nenhuma rodada`,
      v.every((x) => !x),
      v,
    );
    checar(`cheia=${encher}: e K fica na memoria da bia como local`, (await origem(bia.area, "bia", `p/${CHAVE_K}`)) === "local");
  }

  secao("memoria do sigilo (rodada 5): local e so a marca do campo que a gravacao mudou");
  {
    const c = await etapaDoColegaComK();
    checar("premissa: a ana recebeu K marcado, como aprendida", (await origem(c.ana.area, "ana", `p/${CHAVE_K}`)) === "aprendida");
    await c.ana.un.editarEtapa(c.e.id, { nome: "E revisada" }, HOJE);
    checar("renomear a etapa do colega nao promove K", (await origem(c.ana.area, "ana", `p/${CHAVE_K}`)) === "aprendida");
    await c.ana.un.editarEtapa(c.e.id, { documento: { numero: "4444444" } }, HOJE);
    checar(
      "digitar so o documento na etapa do colega: o documento (marcado, a etapa e sigilosa) e local; K continua aprendida",
      (await origem(c.ana.area, "ana", "d/4444444")) === "local" && (await origem(c.ana.area, "ana", `p/${CHAVE_K}`)) === "aprendida",
      [await origem(c.ana.area, "ana", "d/4444444"), await origem(c.ana.area, "ana", `p/${CHAVE_K}`)],
    );
    await c.ana.un.editarEtapa(c.e.id, { processo: { protocolo: K, sigiloso: true } }, HOJE);
    checar("regravar o mesmo processo (o campo nao muda) nao promove K", (await origem(c.ana.area, "ana", `p/${CHAVE_K}`)) === "aprendida");
  }
  {
    const c = await etapaDoColegaComK();
    const copia = await c.ana.un.duplicarEtapa(c.e.id);
    checar(
      "Duplicar a etapa do colega (balao) grava como copia: o vinculo copiado nao promove K",
      copia.nome === "Cópia de E" &&
        JSON.stringify(copia.processo) === JSON.stringify((await c.ana.un.obterEtapa(c.e.id))?.processo) &&
        (await origem(c.ana.area, "ana", `p/${CHAVE_K}`)) === "aprendida",
      [copia.nome, copia.processo, await origem(c.ana.area, "ana", `p/${CHAVE_K}`)],
    );
  }

  secao("memoria do sigilo (rodada 5): a cascata em lapide ou item de colega e aprendida; so o que o usuario marcou e local");
  {
    const sei = noSei();
    const ana = computador("ana", "pc-ana");
    const bia = computador("bia", "pc-bia", AGORA + 5);
    const p = await bia.un.criarProjeto({ nome: "Comum" });
    for (let i = 0; i < 200; i++) {
      const e = await bia.un.criarEtapa({
        projeto: p.id,
        nome: `E${i}`,
        ...ETAPA,
        processo: { protocolo: K },
        documento: { numero: String(6_000_000 + i) },
      });
      await bia.un.removerEtapa(e.id);
    }
    const viva = await bia.un.criarEtapa({
      projeto: p.id,
      nome: "Viva",
      ...ETAPA,
      processo: { protocolo: K },
      documento: { numero: "6999999" },
    });
    await bia.rodada(bia.un, sei);
    await ana.rodada(ana.un, sei);
    checar("premissa: as 200 lapides e a etapa viva da bia chegaram a ana com K em claro", !!(await ana.un.obterEtapa(viva.id)));
    await ana.un.criarProjeto({ nome: "Meu", processo: { protocolo: K, sigiloso: true } });
    const m = await contar(ana.area, "ana");
    checar("a ana marca K num projeto dela: so K e local (as 200 lapides e a etapa viva do colega, aprendidas)", m.locais === 1, m);
    checar(
      "e o que passou a ser raspado nelas entra como aprendida (K local, os documentos aprendidos)",
      (await origem(ana.area, "ana", `p/${CHAVE_K}`)) === "local" &&
        (await origem(ana.area, "ana", "d/6000000")) === "aprendida" &&
        (await origem(ana.area, "ana", "d/6999999")) === "aprendida",
    );
  }
  for (const meio of [true, false]) {
    // O que é do próprio usuário (os itens vivos e os registros dele) continua local, com as aprendidas cheias.
    const ana = computador("ana", "pc-ana", AGORA, cheia("ana"));
    const sei = noSei();
    const p = await ana.un.criarProjeto({ nome: "P1", processo: { protocolo: X } });
    const e = await ana.un.criarEtapa({ projeto: p.id, nome: "E1", ...ETAPA });
    await ana.un.editarEtapa(e.id, { documento: { numero: "7777001" } }, HOJE);
    await ana.un.editarEtapa(e.id, { documento: { numero: "7777002" } }, HOJE);
    await ana.rodada(ana.un, sei);
    await ana.un.editarProjeto(p.id, { processo: { protocolo: X, sigiloso: true } });
    if (meio) await ana.rodada(ana.un, sei);
    await ana.un.editarProjeto(p.id, { processo: { protocolo: "50300.000002/2026-11" } });
    await ana.rodada(ana.un, sei);
    const t = await jsonDe(sei.html);
    checar(
      `aprendidas cheias, rodada no meio ${meio}: o documento antigo e o atual da propria etapa e X nao voltam ao texto`,
      !t.includes("7777001") && !t.includes("7777002") && !t.includes("000777"),
    );
  }

  secao("Duplicar do balao no app: grava pelo repositorio como copia");
  {
    const m = await montar();
    let duplicadas = 0;
    const original = m.un.duplicarEtapa.bind(m.un);
    m.un.duplicarEtapa = async (id: string) => {
      duplicadas++;
      return original(id);
    };
    abrirAba(m, m.ids.p);
    await tique();
    clicarLinha(m, m.ids.a);
    itemDoMenu(balao(m)!, "Mais ações da etapa", "Duplicar");
    await tique(80);
    const copia = (await m.un.dados()).etapas.find((e) => e.nome === "Cópia de Nota técnica");
    checar(
      "o Duplicar do balao chama duplicarEtapa e a copia aparece no projeto",
      duplicadas === 1 && !!copia && copia.projeto === m.ids.p && copia.inicio === "2026-09-01",
      { duplicadas, copia },
    );
    m.app.destruir();
  }
}

const K = "50300.000555/2026-10";
const CHAVE_K = "50300000555202610";

/** Uma área com as aprendidas cheias (20000 processos e 20000 documentos de colegas). */
function cheia(login: string) {
  const a = areaMemoria();
  const PREF = prefixoMemoriaSigilo("sei.x.gov.br", login);
  const s: Record<string, string> = {};
  for (let i = 0; i < 20000; i++) {
    s[`${PREF}p/${10_000_000_000 + i}`] = "aprendida";
    s[`${PREF}d/${5_000_000 + i}`] = "aprendida";
  }
  void a.gravar(s);
  return a;
}

async function origem(area: Area, login: string, n: string): Promise<unknown> {
  const k = `${prefixoMemoriaSigilo("sei.x.gov.br", login)}${n}`;
  return (await area.obter(k))[k];
}

async function contar(area: Area, login: string) {
  const PREF = prefixoMemoriaSigilo("sei.x.gov.br", login);
  const ks = ((await area.chaves?.()) ?? []).filter((k) => k.startsWith(PREF));
  const v = Object.values(await area.obter(ks));
  return { total: ks.length, locais: v.filter((x) => x === "local").length };
}

/** A etapa da Bia tem o processo próprio K; a Ana a recebe em claro; depois a Bia marca K (a caixa) e a Ana recebe. */
async function etapaDoColegaComK() {
  const sei = noSei();
  const ana = computador("ana", "pc-ana");
  const bia = computador("bia", "pc-bia", AGORA + 5);
  const p = await bia.un.criarProjeto({ nome: "Comum" });
  const e = await bia.un.criarEtapa({ projeto: p.id, nome: "E", ...ETAPA, processo: { protocolo: K } });
  await bia.rodada(bia.un, sei);
  await ana.rodada(ana.un, sei);
  await bia.un.editarEtapa(e.id, { processo: { protocolo: K, sigiloso: true } }, HOJE);
  await bia.rodada(bia.un, sei);
  await ana.rodada(ana.un, sei);
  return { sei, ana, bia, p, e };
}
