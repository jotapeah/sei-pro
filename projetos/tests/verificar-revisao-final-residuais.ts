/**
 * Os residuais da re-revisão da leva final da P4: o registro órfão fora do corte dos 300 (aqui e no texto) e tirado
 * pelo `limpar` (N1); o registro "do futuro" atrás dos outros no corte do texto (N2); a etapa de um projeto que este
 * computador recusa por vir do futuro, mas que o texto leva (N3); as bordas do restaurar a cópia (N4); o `limpar` numa
 * leitura só (N5); e o "Exportar planilha" sem rejeição solta (N6).
 */

import { type Area, areaMemoria } from "@comum/armazenamento/area";
import { copiasEmMemoria } from "@comum/sincronia/copias";
import { gerarConteudoTexto } from "@comum/sincronia/textoPadraoCodec";
import type { Escopo, Registro, Vis } from "../src/modelo/tipos";
import { moverEntreEscopos, RepositorioProjetos } from "../src/repositorio";
import { type EnvelopeArquivo, fazerCopiaDoDia, restaurarCopia } from "../src/sincronia/arquivo";
import { paraOTexto } from "../src/sincronia/textoPadrao";
import { itemDoMenu } from "./apoioApp";
import { etapa, projeto } from "./fabrica";
import { checar, secao, tique } from "./util";
import { abrirAba, montar as montarApp, textoDoAviso } from "./verificar-app";
import { envelopeDoTexto, pc } from "./verificar-revisao-final-p4";
import { noSei, noTexto } from "./verificar-sincronia-documento";

const DIA = 86_400_000;
const AGORA = Date.UTC(2026, 9, 6, 12);
const HOST = "sei.x.gov.br";
const DONO = { host: HOST, login: "ana" };
const HOJE = "2026-10-06";
const ETAPA = { inicio: "2026-10-06", fim: "2026-10-09" } as const;

const escopo = (vis: Vis): Escopo => ({ host: HOST, login: "ana", unidade: "110", vis });

/**
 * N1 (a cena da sonda `s2` da re-revisão): numa unidade de pouco movimento, os registros de um projeto podado ainda
 * estão entre os 300 mais recentes. Quem os tem não pode contá-los no corte (o texto não os leva), senão o corte
 * daqui e o de quem chega depois discordam: vai-e-volta, e a faixa do "Entendi" aparece para quem só lê.
 */
async function orfaosNoCorte(vis: Vis): Promise<void> {
  const dias = vis === "unidade" ? 181 : 91;
  const no = (c: ReturnType<typeof pc>) => (vis === "unidade" ? c.un : c.eu);
  const login = (outro: string) => (vis === "unidade" ? outro : "ana");
  const sei = noSei();
  const a = pc("ana", "pc-ana");
  const b = pc(login("bia"), "pc-b", AGORA + 5);
  const q = await no(a).criarProjeto({ nome: "Q" });
  for (let i = 0; i < 270; i++) await no(a).editarProjeto(q.id, { nome: `Q${i}` });
  const p = await no(a).criarProjeto({ nome: "P" });
  for (let i = 0; i < 15; i++) await no(a).editarProjeto(p.id, { nome: `P${i}` });
  await no(a).removerProjeto(p.id);
  await a.rodada(no(a), sei);
  await b.rodada(no(b), sei);
  for (const c of [a, b]) c.rel.agora += dias * DIA;
  await a.rodada(no(a), sei);
  await b.rodada(no(b), sei);
  await no(a).limpar(a.rel.agora);
  await no(b).limpar(b.rel.agora);
  checar(
    `${vis}: o limpar tira os registros do projeto podado`,
    !(await no(a).historico()).some((r) => r.projeto === p.id) && !(await no(b).historico()).some((r) => r.projeto === p.id),
  );
  const c = pc(login("caio"), "pc-c", a.rel.agora + 3);
  await c.rodada(no(c), sei);
  for (let i = 0; i < 30; i++) await no(a).editarProjeto(q.id, { nome: `Q novo ${i}` });
  const g0 = sei.gravadas;
  for (let volta = 0; volta < 3; volta++) for (const x of [a, b, c]) await x.rodada(no(x), sei);
  checar(
    `${vis}: 30 alteracoes novas, uma gravacao so (sem vai-e-volta com quem chegou depois)`,
    sei.gravadas - g0 === 1,
    sei.gravadas - g0,
  );
  const d = pc(login("davi"), "pc-d", a.rel.agora + 7);
  const sem = async () => false;
  await d.rodada(no(d), sei, sem);
  for (let i = 0; i < 10; i++) await no(a).editarProjeto(q.id, { nome: `Q mais ${i}` });
  await a.rodada(no(a), sei);
  const st = await d.rodada(no(d), sei, sem);
  checar(`${vis}: quem chega depois, so le e nada mudou ali: sem a faixa do Entendi`, !st.aguardandoPermissao, st);
}

/** N1: o mesmo predicado de órfão no texto e nos cortes daqui. */
async function n1(): Promise<void> {
  secao("residuais N1: o registro orfao nao conta no corte dos 300 (texto e local) e o limpar o tira");
  await orfaosNoCorte("unidade");
  await orfaosNoCorte("eu");
}

/** N2 (sonda `s1`): 300 registros com `quando` = 1e15 escritos à mão no texto não empurram os de verdade para fora. */
async function n2(): Promise<void> {
  secao("residuais N2: o registro do futuro fica atras dos outros no corte do texto");
  const sei = noSei();
  const a = pc("ana", "pc-ana");
  const b = pc("bia", "pc-bia", AGORA + 5);
  const p = await a.un.criarProjeto({ nome: "P" });
  for (let i = 0; i < 5; i++) await a.un.editarProjeto(p.id, { nome: `P${i}` });
  await a.rodada(a.un, sei);
  await b.rodada(b.un, sei);
  const legitimos = (await a.un.historico()).map((r) => r.id);
  const env = await envelopeDoTexto(sei.html);
  for (let i = 0; i < 300; i++) {
    const r: Registro = {
      id: `forj${i}`,
      alvo: p.id,
      projeto: p.id,
      quando: 1e15,
      por: "x",
      campo: "nome",
      antes: "a",
      depois: "b",
      atualizadoEm: AGORA,
      dispositivo: "pc-x",
    };
    env.entidades.h.push(r);
  }
  sei.html = await gerarConteudoTexto("Dados internos do SEI Pro.", env);
  for (const c of [a, b, a, b]) await c.rodada(c.un, sei);
  const t1 = await noTexto(sei.html);
  checar(
    "depois de 4 rodadas, os 6 registros de verdade continuam no texto",
    legitimos.length === 6 && legitimos.every((id) => t1.h.some((r) => r.id === id)),
    t1.h.filter((r) => !r.id.startsWith("forj")).length,
  );
  await a.un.editarProjeto(p.id, { nome: "Novo nome" });
  await a.rodada(a.un, sei);
  const t2 = await noTexto(sei.html);
  checar(
    "o registro novo chega ao texto",
    t2.h.some((r) => r.depois === "Novo nome"),
  );
  const c = pc("caio", "pc-caio", AGORA + 10);
  await c.rodada(c.un, sei);
  checar("quem chega depois recebe os 7 de verdade", (await c.un.historico()).length === 7, (await c.un.historico()).length);
  const g = sei.gravadas;
  for (const x of [a, b, c]) await x.rodada(x.un, sei);
  checar("e ninguem regrava", sei.gravadas === g, sei.gravadas - g);
}

/** N3 (sonda `s4`): o projeto que vem do futuro para este computador, mas não para o colega que pôs a etapa nele. */
async function n3(): Promise<void> {
  secao("residuais N3: a etapa de um projeto do futuro (que o texto leva) nao e orfa");
  const sei = noSei();
  const ana = pc("ana", "pc-ana", AGORA);
  const caio = pc("caio", "pc-caio", AGORA + 1.5 * DIA);
  const dani = pc("dani", "pc-dani", AGORA + 0.8 * DIA);
  const p = await caio.un.criarProjeto({ nome: "P" });
  await caio.rodada(caio.un, sei);
  await dani.rodada(dani.un, sei);
  const e = await dani.un.criarEtapa({ projeto: p.id, nome: "E", ...ETAPA });
  await dani.rodada(dani.un, sei);
  const g0 = sei.gravadas;
  for (let i = 0; i < 3; i++) for (const x of [ana, dani]) await x.rodada(x.un, sei);
  checar(
    "Ana (relogio atrasado) e Dani: nenhuma regravacao em 3 voltas, e a etapa fica no texto",
    sei.gravadas === g0 && (await noTexto(sei.html)).e.some((x) => x.id === e.id),
    sei.gravadas - g0,
  );
}

/** N4: as bordas do restaurar a cópia. */
async function n4(): Promise<void> {
  secao("residuais N4: restaurar nao devolve o que foi para o outro escopo, nem a etapa dele");
  {
    // Sonda `s3b`: P vai para "Só eu" depois da cópia e é excluído lá.
    const a = pc("ana", "pc-ana");
    const p = await a.un.criarProjeto({ nome: "Apuração interna" });
    await a.un.criarEtapa({ projeto: p.id, nome: "Oitiva", ...ETAPA });
    const copias = copiasEmMemoria<EnvelopeArquivo>();
    await fazerCopiaDoDia(a.area, DONO, copias, HOJE, a.carimbo);
    await moverEntreEscopos(a.un, a.eu, p.id);
    await a.eu.removerProjeto(p.id);
    const [copia] = await copias.listar(DONO);
    const r = await restaurarCopia(a.area, copia!, DONO, a.carimbo);
    const t = paraOTexto(await a.un.exportar(a.rel.agora), a.rel.agora);
    checar(
      "P levado para 'So eu' e excluido la: a copia de antes nao o devolve a unidade (nem ao texto dela)",
      r.projetos + r.etapas === 0 &&
        !(await a.un.obterProjeto(p.id)) &&
        ![...t.entidades.p, ...t.entidades.e].some((x) => x.removidoEm === undefined),
      r,
    );
  }
  {
    // A etapa excluída antes da mudança fica na unidade como lápide (o "Quem vê" só leva as vivas).
    const a = pc("ana", "pc-ana");
    const p = await a.un.criarProjeto({ nome: "P" });
    const e1 = await a.un.criarEtapa({ projeto: p.id, nome: "Excluida antes", ...ETAPA });
    await a.un.criarEtapa({ projeto: p.id, nome: "Foi junto", ...ETAPA });
    const copias = copiasEmMemoria<EnvelopeArquivo>();
    await fazerCopiaDoDia(a.area, DONO, copias, HOJE, a.carimbo);
    await a.un.removerEtapa(e1.id);
    await moverEntreEscopos(a.un, a.eu, p.id);
    const [copia] = await copias.listar(DONO);
    const r = await restaurarCopia(a.area, copia!, DONO, a.carimbo);
    const un = await a.un.entidades();
    const vivosP = new Set(un.p.filter((x) => x.removidoEm === undefined).map((x) => x.id));
    checar(
      "a etapa excluida antes da mudanca nao volta orfa a unidade",
      r.etapas === 0 && !(await a.un.obterEtapa(e1.id)) && !un.e.some((x) => x.removidoEm === undefined && !vivosP.has(x.projeto)),
      r,
    );
  }
  {
    // O contrário continua valendo: veio de "Só eu" antes da cópia e foi excluído aqui depois dela.
    const a = pc("ana", "pc-ana");
    const p = await a.eu.criarProjeto({ nome: "Veio de So eu" });
    await moverEntreEscopos(a.eu, a.un, p.id);
    const copias = copiasEmMemoria<EnvelopeArquivo>();
    await fazerCopiaDoDia(a.area, DONO, copias, HOJE, a.carimbo);
    await a.un.removerProjeto(p.id);
    const [copia] = await copias.listar(DONO);
    const r = await restaurarCopia(a.area, copia!, DONO, a.carimbo);
    checar(
      "excluido aqui depois de ter vindo do outro escopo: volta aqui (a lapide daqui e a mais nova)",
      r.projetos === 1 && !!(await a.un.obterProjeto(p.id)) && !(await a.eu.obterProjeto(p.id)),
      r,
    );
  }
}

/** N5: o `limpar` lê o escopo numa leitura só (uma gravação no meio não o faz apagar uma etapa viva). */
async function n5(): Promise<void> {
  secao("residuais N5: o limpar le tudo de uma vez");
  const base = areaMemoria();
  let armado = false;
  let chamadas = 0;
  let escrita: Promise<unknown> | null = null;
  const rel = { agora: AGORA };
  const outroPc = new RepositorioProjetos(base, escopo("unidade"), () => ({ agora: ++rel.agora, dispositivo: "outra-aba" }));
  const P = projeto({ id: "pnovo", nome: "Chegou agora", atualizadoEm: AGORA });
  const E = etapa({ id: "enova", projeto: "pnovo", atualizadoEm: AGORA });
  const escrever = () => {
    escrita ??= outroPc.importar({ p: [P], e: [E] });
    return escrita;
  };
  const area: Area = {
    ...base,
    chaves: async () => {
      // Outra aba grava o projeto e a etapa depois da primeira leitura deste `limpar`.
      if (armado && chamadas++ >= 1) await escrever();
      return (await base.chaves?.()) ?? [];
    },
    aoMudar: base.aoMudar.bind(base),
  };
  const repo = new RepositorioProjetos(area, escopo("unidade"), () => ({ agora: ++rel.agora, dispositivo: "pc-ana" }));
  await repo.criarProjeto({ nome: "Que ja estava" });
  armado = true;
  await repo.limpar(rel.agora);
  armado = false;
  await escrever();
  checar(
    "a etapa gravada por outra aba no meio do limpar continua viva (com o projeto dela)",
    !!(await repo.obterEtapa(E.id)) && !!(await repo.obterProjeto(P.id)),
  );
}

/** N6: o "Exportar planilha" (assíncrono) não deixa rejeição solta. */
async function n6(): Promise<void> {
  secao("residuais N6: o Exportar planilha nao deixa rejeicao solta");
  const soltas: unknown[] = [];
  const ouvir = (e: unknown) => void soltas.push(e);
  process.on("unhandledRejection", ouvir);
  try {
    const m = await montarApp();
    abrirAba(m, m.ids.q);
    await tique(20);
    m.un.sigilosConhecidos = async () => {
      throw new Error("Falha que nao e da memoria.");
    };
    itemDoMenu(m.raiz, "Ajustes dos projetos", "Exportar planilha (CSV)");
    await tique(20);
    checar(
      "erro que nao e da memoria: vira o aviso dele (nao o da memoria), nada baixado",
      textoDoAviso(m.doc) === "Falha que nao e da memoria." && m.t.baixados.length === 0,
      textoDoAviso(m.doc),
    );
    m.un.sigilosConhecidos = async () => ({ processos: new Set<string>(), documentos: new Set<string>() });
    (m.app as unknown as { d: { baixar(): void } }).d.baixar = () => {
      throw new Error("O navegador recusou o download.");
    };
    itemDoMenu(m.raiz, "Ajustes dos projetos", "Exportar planilha (CSV)");
    await tique(20);
    checar("o baixar que falha: aviso com o motivo", textoDoAviso(m.doc) === "O navegador recusou o download.", textoDoAviso(m.doc));
    checar("nenhuma rejeicao solta", soltas.length === 0, soltas.map(String));
    m.app.destruir();
  } finally {
    process.off("unhandledRejection", ouvir);
  }
}

export async function verificarRevisaoFinalResiduais(): Promise<void> {
  await n1();
  await n2();
  await n3();
  await n4();
  await n5();
  await n6();
}
