/**
 * Arquivo, cópias diárias e Exportar/Importar (spec 6.2): todos os escopos do
 * usuário num SEI (inclusive os números sigilosos, que são dele), mescla na
 * leitura, o que é de outro usuário fica, e restaurar traz de volta só o que
 * estava ativo na cópia. E a memória do sigilo do usuário (decisão da Tarefa 6):
 * o arquivo é dele, então ela vai junto num campo próprio e volta como "local"
 * num perfil novo, e um número que só sobrou nos registros não volta ao Texto
 * Padrão depois de importar ou restaurar.
 */

import { type Area, areaMemoria } from "@comum/armazenamento/area";
import { SincroniaArquivo } from "@comum/sincronia/arquivo";
import { copiasEmMemoria } from "@comum/sincronia/copias";
import { chaveMemoriaSigiloLegada, prefixoMemoriaSigilo } from "../src/modelo/constantes";
import { lerMemoria } from "../src/modelo/memoriaSigilo";
import type { Escopo } from "../src/modelo/tipos";
import { RepositorioProjetos } from "../src/repositorio";
import {
  adaptadorArquivoProjetos,
  type EnvelopeArquivo,
  escoposDoUsuario,
  exportarTudo,
  fazerCopiaDoDia,
  importarTudo,
  lerEnvelopeArquivo,
  nomeDoArquivo,
  restaurarCopia,
  TETO_SIGILO_ARQUIVO,
  VERSAO_SIGILO,
} from "../src/sincronia/arquivo";
import { checar, secao } from "./util";
import { computador, jsonDe, noSei } from "./verificar-sincronia-documento";

const AGORA = Date.UTC(2026, 9, 6, 12);
const HOST = "sei.x.gov.br";
const DONO = { host: HOST, login: "Ana" };
const X = "50300.000777/2026-10";
const CHAVE_X = "50300000777202610";
const OUTRO = "50300.000002/2026-11";
const ETAPA = { inicio: "2026-10-06", fim: "2026-10-09" } as const;
const HOJE = "2026-10-06";
const DOC = "1234567";

function repos(area: ReturnType<typeof areaMemoria>, relogio = { agora: AGORA }) {
  const carimbo = () => ({ agora: ++relogio.agora, dispositivo: "pc-ana", por: "ana", nome: "Ana" });
  const de = (e: Partial<Escopo>) =>
    new RepositorioProjetos(area, { host: HOST, login: "ana", unidade: "110", vis: "unidade", ...e }, carimbo);
  return { carimbo, de };
}

/** A memória do sigilo da ana na área, número → origem. */
async function memoriaDaAna(area: Area): Promise<{ p: Map<string, string>; d: Map<string, string>; chaves: number }> {
  const tudo = await area.obter(null);
  const m = lerMemoria(tudo, prefixoMemoriaSigilo(HOST, "ana"), chaveMemoriaSigiloLegada(HOST, "ana"));
  const chaves = Object.keys(tudo).filter((k) => k.startsWith(prefixoMemoriaSigilo(HOST, "ana"))).length;
  return { p: new Map(m.processos), d: new Map(m.documentos), chaves };
}

/** Área que falha ao gravar a memória do sigilo (o resto grava normalmente). */
function areaQueNaoGravaMemoria(): Area & { gravacoes: number } {
  const base = areaMemoria();
  const a = {
    ...base,
    gravacoes: 0,
    async gravar(itens: Record<string, unknown>) {
      if (Object.keys(itens).some((k) => k.startsWith("projetos/sigilo/"))) throw new Error("cota excedida");
      a.gravacoes++;
      await base.gravar(itens);
    },
  };
  return a;
}

export async function verificarSincroniaArquivo(): Promise<void> {
  secao("arquivo: todos os escopos do usuario neste SEI");
  const area = areaMemoria();
  const { carimbo, de } = repos(area);
  await de({}).criarProjeto({ nome: "Da unidade 110", processo: { protocolo: X, sigiloso: true } });
  await de({ vis: "eu" }).criarProjeto({ nome: "Meu na 110" });
  await de({ unidade: "220" }).criarProjeto({ nome: "Da unidade 220" });
  await new RepositorioProjetos(area, { host: HOST, login: "bia", unidade: "110", vis: "unidade" }, carimbo).criarProjeto({
    nome: "Da bia",
  });
  await new RepositorioProjetos(area, { host: "outro.gov.br", login: "ana", unidade: "110", vis: "unidade" }, carimbo).criarProjeto({
    nome: "Outro SEI",
  });
  const escopos = await escoposDoUsuario(area, DONO);
  checar(
    "acha os 3 escopos da ana neste SEI (e nao os da bia nem os do outro SEI)",
    escopos.map((e) => `${e.unidade}/${e.vis}`).join() === "110/eu,110/unidade,220/unidade",
    escopos,
  );
  const env = await exportarTudo(area, DONO, carimbo);
  checar("exporta os tres, com o formato da copia", env.tipo === "copia" && env.formato === "seipro-projetos" && env.escopos.length === 3);
  checar("leva o numero do sigiloso (o arquivo e do proprio usuario)", JSON.stringify(env).includes(X));
  checar("nome sugerido por login e SEI", nomeDoArquivo(DONO) === "projetos-seipro-ana-sei.x.gov.br.json");

  secao("arquivo: leitura e mescla");
  checar("le o envelope de volta", lerEnvelopeArquivo(JSON.parse(JSON.stringify(env)))?.escopos.length === 3);
  checar(
    "o do Texto Padrao (um escopo) nao e uma copia",
    lerEnvelopeArquivo({ formato: "seipro-projetos", versao: 1, host: HOST }) === null,
  );
  checar("escopo torto: recusado inteiro", lerEnvelopeArquivo({ ...env, escopos: [{ escopo: { host: HOST }, entidades: {} }] }) === null);
  checar(
    "unidade com barra (sairia do lugar das chaves): recusado inteiro",
    lerEnvelopeArquivo({ ...env, escopos: [{ ...env.escopos[0]!, escopo: { ...env.escopos[0]!.escopo, unidade: "110/un/p" } }] }) === null,
  );
  checar(
    "lista enorme: recusado inteiro",
    lerEnvelopeArquivo({
      ...env,
      escopos: [{ ...env.escopos[0]!, entidades: { ...env.escopos[0]!.entidades, m: Array.from({ length: 501 }, () => ({})) } }],
    }) === null,
  );
  const outraArea = areaMemoria();
  const r = await importarTudo(outraArea, env, DONO, repos(outraArea).carimbo);
  checar("importar mescla os tres escopos noutro navegador", r.novos >= 3 && (await escoposDoUsuario(outraArea, DONO)).length === 3, r);
  const daBia = await importarTudo(
    outraArea,
    { ...env, escopos: env.escopos.map((s) => ({ ...s, escopo: { ...s.escopo, login: "bia" } })) },
    DONO,
    repos(outraArea).carimbo,
  );
  checar(
    "o que e de outro login fica de fora",
    daBia.novos === 0 && (await escoposDoUsuario(outraArea, { host: HOST, login: "bia" })).length === 0,
  );
  {
    const comTorto = JSON.parse(JSON.stringify(env)) as EnvelopeArquivo;
    (comTorto.escopos[0]!.entidades.p as unknown[]).push(null, { id: "torto", nome: 7 });
    const lido = lerEnvelopeArquivo(comTorto);
    const area3 = areaMemoria();
    const r3 = lido ? await importarTudo(area3, lido, DONO, repos(area3).carimbo) : null;
    checar(
      "item torto numa lista: o envelope e lido, o item e ignorado (contado) e o resto entra",
      !!r3 &&
        r3.ignorados === 2 &&
        r3.novos >= 3 &&
        !(await new RepositorioProjetos(area3, env.escopos[0]!.escopo, carimbo).projetos.obter("torto")),
      r3,
    );
  }

  secao("arquivo: a sincronia generica com o adaptador dos projetos");
  const noDisco = { conteudo: "", gravacoes: 0 };
  const arquivo = {
    ler: async () => noDisco.conteudo,
    gravar: async (c: string) => {
      noDisco.gravacoes++;
      noDisco.conteudo = c;
    },
  };
  const outros: EnvelopeArquivo = {
    ...env,
    escopos: [{ ...env.escopos[0]!, escopo: { ...env.escopos[0]!.escopo, login: "bia" } }],
    sigilo: [{ versao: VERSAO_SIGILO, host: HOST, login: "bia", processos: ["98765"], documentos: [] }],
  };
  noDisco.conteudo = JSON.stringify(outros);
  const sinc = new SincroniaArquivo({
    area,
    chaveStatus: "projetos/sync/arquivo/t",
    arquivo,
    adaptador: adaptadorArquivoProjetos(area, DONO, carimbo),
  });
  const s1 = await sinc.sincronizar();
  const gravado = JSON.parse(noDisco.conteudo) as EnvelopeArquivo;
  checar(
    "grava os escopos da ana e mantem os da bia que ja estavam no arquivo",
    s1.estado === "ok" &&
      gravado.escopos.length === 4 &&
      gravado.escopos.some((s) => s.escopo.login === "bia") &&
      /mantidos/.test(s1.mensagem ?? ""),
    s1,
  );
  checar(
    "a memoria do sigilo da ana vai no arquivo, e a da bia que ja estava fica como estava",
    gravado.sigilo?.length === 2 &&
      gravado.sigilo.some((s) => s.login === "ana" && s.processos.includes(CHAVE_X)) &&
      gravado.sigilo.some((s) => s.login === "bia" && s.processos.join() === "98765"),
    gravado.sigilo,
  );
  checar(
    "e a memoria da bia nao entra na da ana nem vira memoria da bia neste navegador",
    !(await memoriaDaAna(area)).p.has("98765") &&
      !Object.keys(await area.obter(null)).some((k) => k.startsWith(prefixoMemoriaSigilo(HOST, "bia"))),
  );
  const n = noDisco.gravacoes;
  await sinc.sincronizar();
  checar("sem mudanca, nao regrava", noDisco.gravacoes === n);
  await de({}).lembrarSigilo({ processos: ["55555"], documentos: [] }, "local");
  await sinc.sincronizar();
  checar(
    "so a memoria do sigilo mudou: o arquivo e regravado com ela",
    noDisco.gravacoes === n + 1 &&
      !!(JSON.parse(noDisco.conteudo) as EnvelopeArquivo).sigilo?.some((s) => s.login === "ana" && s.processos.includes("55555")),
  );
  noDisco.conteudo = "{ isto nao e json";
  const s3 = await sinc.sincronizar();
  checar(
    "arquivo ilegivel: regravado, sem apagar nada daqui",
    s3.estado === "ok" && (s3.mensagem ?? "").includes("ilegível") && (await escoposDoUsuario(area, DONO)).length === 3,
  );
  const futuro = JSON.stringify({ ...env, versao: 2 });
  noDisco.conteudo = futuro;
  const s4 = await sinc.sincronizar();
  checar("arquivo de versao mais nova: nao e tocado", s4.estado === "erro" && noDisco.conteudo === futuro);
  {
    const comNulo = JSON.parse(JSON.stringify(env)) as EnvelopeArquivo;
    (comNulo.escopos[0]!.entidades.p as unknown[]).push(null);
    noDisco.conteudo = JSON.stringify(comNulo);
    const s5 = await sinc.sincronizar();
    checar(
      "item nulo no arquivo: a sincronia nao quebra e regrava o arquivo limpo",
      s5.estado === "ok" && !noDisco.conteudo.includes("null"),
      s5,
    );
  }

  secao("copias diarias e restaurar");
  const copias = copiasEmMemoria<EnvelopeArquivo>();
  checar("a primeira do dia e feita", await fazerCopiaDoDia(area, DONO, copias, "2026-10-06", carimbo));
  checar("a segunda no mesmo dia nao", !(await fazerCopiaDoDia(area, DONO, copias, "2026-10-06", carimbo)));
  const [copia] = await copias.listar(DONO);
  checar("a copia conta os projetos ativos (os 3)", copia?.quantidade === 3, copia?.quantidade);
  checar("a copia leva a memoria do sigilo", !!copia?.envelope.sigilo?.some((s) => s.login === "ana" && s.processos.includes(CHAVE_X)));
  for (let d = 7; d <= 21; d++) await fazerCopiaDoDia(area, DONO, copias, `2026-10-${String(d).padStart(2, "0")}`, carimbo);
  checar("ficam as 14 mais recentes", (await copias.listar(DONO)).length === 14);
  const un = de({});
  const [alvo] = (await un.dados()).projetos;
  await un.removerProjeto(alvo!.id);
  const novo = await un.criarProjeto({ nome: "Criado depois da copia" });
  const restaurados = await restaurarCopia(area, copia!, DONO, carimbo);
  checar(
    "restaurar traz de volta o excluido depois da copia e mantem o criado depois",
    restaurados >= 1 && !!(await un.obterProjeto(alvo!.id)) && !!(await un.obterProjeto(novo.id)),
    restaurados,
  );

  await verificarMemoriaNoArquivo();
}

/**
 * Decisão da Tarefa 6: o arquivo é do próprio usuário e leva também a memória do sigilo dele (campo `sigilo`,
 * versionado); importar e restaurar a devolvem como "local", sem tirar nada do que já está lá.
 */
async function verificarMemoriaNoArquivo(): Promise<void> {
  /** A ana: o X ficou só nos registros (o processo do projeto foi trocado) e o DOC só nos registros da etapa. */
  async function origem() {
    const a = computador("ana", "pc-ana");
    const p = await a.un.criarProjeto({ nome: "Fiscalização" });
    await a.un.editarProjeto(p.id, { processo: { protocolo: X } }); // digitado, sem marca: o registro leva o número
    await a.un.editarProjeto(p.id, { processo: { protocolo: X, sigiloso: true } }); // a caixa marcou
    const e = await a.un.criarEtapa({ projeto: p.id, nome: "Oitiva", ...ETAPA });
    await a.un.editarEtapa(e.id, { documento: { numero: DOC } }, HOJE); // etapa sigilosa: o DOC fica marcado
    await a.un.editarEtapa(e.id, { processo: { protocolo: OUTRO } }, HOJE); // a etapa deixa de ser sigilosa
    await a.un.editarEtapa(e.id, { documento: { numero: "7777009" } }, HOJE); // e o DOC sai do estado
    await a.un.editarProjeto(p.id, { processo: { protocolo: OUTRO } }); // a base do X sumiu
    let n = 0;
    const carimbo = () => ({ agora: AGORA + 500 + ++n, dispositivo: "pc-ana", por: "ana", nome: "ana" });
    return { a, p, e, carimbo };
  }
  /** Um perfil novo da ana (outro navegador), com o relógio adiante; o Texto Padrão da unidade gravado pelo motor de verdade. */
  async function textoNoPerfilNovo(area: Area) {
    const b = computador("ana", "pc-novo", AGORA + 1000, area);
    const sei = noSei();
    await b.rodada(b.un, sei);
    return { b, json: await jsonDe(sei.html) };
  }

  secao("memoria do sigilo no arquivo: vai junto e volta num perfil novo");
  {
    const { a, carimbo } = await origem();
    const memA = await memoriaDaAna(a.area);
    checar(
      "premissa: neste navegador a memoria sabe do X e do DOC (so nos registros)",
      memA.p.get(CHAVE_X) === "local" && memA.d.get(DOC) === "local",
      memA,
    );
    const env = await exportarTudo(a.area, DONO, carimbo);
    const minha = env.sigilo?.find((s) => s.login === "ana");
    checar(
      "o envelope leva a memoria da ana num campo proprio, versionado, por host e login",
      env.sigilo?.length === 1 &&
        minha?.versao === VERSAO_SIGILO &&
        minha.host === HOST &&
        minha.processos.includes(CHAVE_X) &&
        minha.documentos.includes(DOC),
      env.sigilo,
    );
    checar("e nada da memoria entra nas entidades dos escopos", !JSON.stringify(env.escopos).includes("projetos/sigilo"));

    // Sem o campo (um arquivo de antes), o perfil novo não sabe do sigilo: o número dos registros iria ao texto.
    const { sigilo: _sem, ...semCampo } = env;
    const lidoSem = lerEnvelopeArquivo(JSON.parse(JSON.stringify(semCampo)));
    checar("arquivo sem o campo (versao anterior): continua aceito", !!lidoSem && lidoSem.escopos.length === 1 && !lidoSem.sigilo);
    const areaSem = areaMemoria();
    await importarTudo(areaSem, lidoSem!, DONO, carimbo);
    const sem = await textoNoPerfilNovo(areaSem);
    checar(
      "premissa: sem a memoria, o perfil novo levaria o X e o DOC dos registros ao Texto Padrao",
      sem.json.includes("000777") && sem.json.includes(DOC),
    );

    const areaNova = areaMemoria();
    const lido = lerEnvelopeArquivo(JSON.parse(JSON.stringify(env)));
    await importarTudo(areaNova, lido!, DONO, carimbo);
    const memNova = await memoriaDaAna(areaNova);
    checar(
      "importar num perfil novo devolve a memoria, como local",
      memNova.p.get(CHAVE_X) === "local" && memNova.d.get(DOC) === "local",
      memNova,
    );
    const com = await textoNoPerfilNovo(areaNova);
    checar(
      "e o numero que so existe nos registros nao vai ao Texto Padrao (decodificado)",
      !!com.json && !com.json.includes("000777") && !com.json.includes(DOC) && com.json.includes("000002"),
      com.json,
    );
    checar(
      "e o historico do perfil novo tem os numeros (o arquivo e do usuario)",
      (await com.b.un.historico()).some((r) => r.campo === "processo" && r.depois === X),
    );
  }

  secao("memoria do sigilo no arquivo: restaurar uma copia num perfil novo");
  {
    const { a, carimbo } = await origem();
    const copias = copiasEmMemoria<EnvelopeArquivo>();
    await fazerCopiaDoDia(a.area, DONO, copias, HOJE, carimbo);
    const [copia] = await copias.listar(DONO);
    const areaNova = areaMemoria();
    const n = await restaurarCopia(areaNova, copia!, DONO, carimbo);
    const memNova = await memoriaDaAna(areaNova);
    checar(
      "restaurar devolve a memoria, como local",
      n >= 1 && memNova.p.get(CHAVE_X) === "local" && memNova.d.get(DOC) === "local",
      memNova,
    );
    const com = await textoNoPerfilNovo(areaNova);
    checar(
      "e depois da restauracao o numero dos registros nao volta ao Texto Padrao",
      !!com.json && !com.json.includes("000777") && !com.json.includes(DOC),
      com.json,
    );
  }

  secao("memoria do sigilo no arquivo: nada do que ja esta la sai nem muda; o teto das aprendidas fica como esta");
  {
    const prefixo = prefixoMemoriaSigilo(HOST, "ana");
    const cheias: Record<string, string> = {};
    for (let i = 0; i < 20_000; i++) cheias[`${prefixo}p/9${String(i).padStart(8, "0")}`] = "aprendida";
    const areaM = areaMemoria({ ...cheias, [`${prefixo}p/111`]: "aprendida", [`${prefixo}d/222`]: "local" });
    const antes = await memoriaDaAna(areaM);
    const env: EnvelopeArquivo = {
      formato: "seipro-projetos",
      versao: 1,
      tipo: "copia",
      gerado: AGORA,
      escopos: [],
      sigilo: [{ versao: VERSAO_SIGILO, host: HOST, login: "ana", processos: ["111", "333"], documentos: ["222", "0444"] }],
    };
    await importarTudo(areaM, env, DONO, repos(areaM).carimbo);
    const depois = await memoriaDaAna(areaM);
    const aprendidas = (m: Map<string, string>) => [...m.values()].filter((o) => o === "aprendida").length;
    checar(
      "a aprendida que ja estava fica aprendida (nao e promovida) e a local fica local",
      depois.p.get("111") === "aprendida" && depois.d.get("222") === "local",
    );
    checar(
      "o que faltava entra como local, mesmo com as aprendidas cheias (documento pela chave, sem zero a esquerda)",
      depois.p.get("333") === "local" && depois.d.get("444") === "local",
      [...depois.d],
    );
    checar(
      "nada sai e as aprendidas nao mudam",
      depois.chaves === antes.chaves + 2 && aprendidas(depois.p) === aprendidas(antes.p) && aprendidas(depois.p) === 20_001,
      [antes.chaves, depois.chaves],
    );
  }

  secao("memoria do sigilo no arquivo: campo torto e ignorado sem derrubar a importacao");
  {
    const { a, carimbo } = await origem();
    const env = await exportarTudo(a.area, DONO, carimbo);
    const valida = env.sigilo![0]!;
    const casos: Array<[string, unknown]> = [
      ["o campo nao e lista", "lixo"],
      ["entrada com numero que nao e texto", [{ ...valida, processos: [...valida.processos, 123] }]],
      ["entrada de versao mais nova", [{ ...valida, versao: VERSAO_SIGILO + 1 }]],
      ["entrada sem login", [{ ...valida, login: undefined }]],
      ["lista de numeros enorme", [{ ...valida, documentos: Array.from({ length: TETO_SIGILO_ARQUIVO + 1 }, (_, i) => String(i + 1)) }]],
    ];
    for (const [caso, sigilo] of casos) {
      const lido = lerEnvelopeArquivo(JSON.parse(JSON.stringify({ ...env, sigilo })));
      const areaT = areaMemoria();
      const r = lido ? await importarTudo(areaT, lido, DONO, carimbo) : null;
      const mem = await memoriaDaAna(areaT);
      checar(
        `${caso}: o envelope e lido, os projetos entram e a entrada torta nao chega a memoria`,
        !!lido && !lido.sigilo?.length && !!r && r.novos >= 1 && !mem.d.has(DOC) && !mem.p.has(CHAVE_X),
        { sigilo: lido?.sigilo, r, p: [...mem.p.keys()] },
      );
    }
    const lido = lerEnvelopeArquivo(
      JSON.parse(
        JSON.stringify({
          ...env,
          sigilo: [{ ...valida, processos: [1] }, valida, { versao: 1, host: HOST, login: "bia", processos: [], documentos: [] }],
        }),
      ),
    );
    checar(
      "so a entrada torta sai: as boas ficam (a da ana e a da bia)",
      lido?.sigilo?.length === 2 && lido.sigilo.some((s) => s.login === "ana") && lido.sigilo.some((s) => s.login === "bia"),
      lido?.sigilo,
    );
  }

  secao("memoria do sigilo no arquivo: a entrada do proprio usuario nunca e lida como torta (sem regravar em laco)");
  {
    const { a, carimbo } = await origem();
    // Uma chave do storage editada à mão, com um "número" maior do que a memória aceita.
    await a.area.gravar({ [`${prefixoMemoriaSigilo(HOST, "ana")}p/${"9".repeat(100)}`]: "local" });
    const env = await exportarTudo(a.area, DONO, carimbo);
    const lido = lerEnvelopeArquivo(JSON.parse(JSON.stringify(env)));
    checar(
      "a exportacao leva so os numeros que a leitura aceita, e a entrada volta inteira",
      lido?.sigilo?.length === 1 && lido.sigilo[0]!.processos.includes(CHAVE_X) && !JSON.stringify(env.sigilo).includes("9".repeat(100)),
      lido?.sigilo,
    );
    const disco = { conteudo: "", gravacoes: 0 };
    const sinc = new SincroniaArquivo({
      area: a.area,
      chaveStatus: "projetos/sync/arquivo/laco",
      arquivo: {
        ler: async () => disco.conteudo,
        gravar: async (c: string) => {
          disco.gravacoes++;
          disco.conteudo = c;
        },
      },
      adaptador: adaptadorArquivoProjetos(a.area, DONO, carimbo),
    });
    await sinc.sincronizar();
    await sinc.sincronizar();
    await sinc.sincronizar();
    checar("e a sincronia do arquivo grava uma vez so", disco.gravacoes === 1, disco.gravacoes);
  }

  secao("memoria do sigilo no arquivo: falha fechada (erro de leitura ou gravacao da memoria)");
  {
    const { a, carimbo } = await origem();
    const env = await exportarTudo(a.area, DONO, carimbo);
    const ilegivel = areaMemoria({ [chaveMemoriaSigiloLegada(HOST, "ana")]: { processos: 7 } });
    const erroLer = await importarTudo(ilegivel, env, DONO, carimbo).then(
      () => null,
      (e: Error) => e.name,
    );
    checar(
      "memoria ilegivel: a importacao falha e nada dos projetos e gravado",
      erroLer === "ErroMemoriaSigilo" && (await escoposDoUsuario(ilegivel, DONO)).length === 0,
      erroLer,
    );
    const semGravar = areaQueNaoGravaMemoria();
    const erroGravar = await importarTudo(semGravar, env, DONO, carimbo).then(
      () => null,
      (e: Error) => e.message,
    );
    checar(
      "a memoria nao grava: a importacao falha antes de gravar os projetos",
      erroGravar === "cota excedida" && semGravar.gravacoes === 0 && (await escoposDoUsuario(semGravar, DONO)).length === 0,
      erroGravar,
    );
    const semGravarCopia = areaQueNaoGravaMemoria();
    const [copia] = await (async () => {
      const c = copiasEmMemoria<EnvelopeArquivo>();
      await fazerCopiaDoDia(a.area, DONO, c, HOJE, carimbo);
      return c.listar(DONO);
    })();
    const erroRestaurar = await restaurarCopia(semGravarCopia, copia!, DONO, carimbo).then(
      () => null,
      (e: Error) => e.message,
    );
    checar("restaurar tambem falha fechado", erroRestaurar === "cota excedida" && semGravarCopia.gravacoes === 0, erroRestaurar);
    const erroExportar = await exportarTudo(ilegivel, DONO, carimbo).then(
      () => null,
      (e: Error) => e.name,
    );
    const copiasIlegivel = copiasEmMemoria<EnvelopeArquivo>();
    const fez = await fazerCopiaDoDia(ilegivel, DONO, copiasIlegivel, HOJE, carimbo).catch(() => "erro");
    checar(
      "exportar com a memoria ilegivel tambem para (o arquivo nao perde a memoria que ja tinha) e nenhuma copia e gravada",
      erroExportar === "ErroMemoriaSigilo" && fez === "erro" && (await copiasIlegivel.listar(DONO)).length === 0,
      [erroExportar, fez],
    );
  }
}
