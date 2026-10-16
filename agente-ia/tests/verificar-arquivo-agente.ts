/**
 * Núcleo da sincronia do Agente por arquivo: envelope, diário e mescla.
 *
 * O que não pode escapar: segredo não vai ao arquivo sem a caixa marcada, o
 * que foi apagado aqui não volta do arquivo, a leitura nunca apaga o que só
 * existe aqui, e a poda por idade é deste computador (não vira lápide).
 */

import {
  assinatura,
  carimbar,
  FORMATO,
  lerEnvelope,
  mesclar,
  TIPOS,
  VERSAO,
  type Diario,
  type EnvelopeAgente,
  type Retrato,
} from "../src/arquivo/envelope";
import type { Conector } from "../src/mcp/conectores";
import type { ConversaSalva } from "../src/painel/historico";
import type { Config } from "../src/painel/main";
import type { SkillUsuario } from "../src/painel/skills";
import { checar, resumo, secao } from "./util";

const DIA = 86_400_000;

const skill = (s: Partial<SkillUsuario> = {}): SkillUsuario => ({
  id: "s1",
  nome: "Despacho",
  slug: "despacho",
  descricao: "encaminhar",
  texto: "texto completo da skill",
  url: "https://github.com/o/r/blob/main/d.md",
  sincronizar: true,
  ...s,
});

const conector = (c: Partial<Conector> = {}): Conector => ({
  id: "c1",
  nome: "Compras",
  url: "https://mcp.exemplo.gov.br/mcp",
  ativo: true,
  auth: { tipo: "token", cabecalho: "Authorization", valor: "Bearer segredo" },
  padrao: "aprovar",
  permissoes: { buscar: "sempre" },
  ...c,
});

const conversa = (c: Partial<ConversaSalva> = {}): ConversaSalva => ({
  id: "v1",
  titulo: "Conversa",
  quando: 1,
  uso: { entrada: 1, saida: 1, custo: 0 },
  mensagens: 2,
  itens: [{ tipo: "usuario", texto: "oi" }],
  ...c,
});

const configPadrao = (c: Partial<Config> = {}): Config =>
  ({
    reais: true,
    guardar: true,
    dias: 30,
    servico: "openrouter",
    url: "",
    chave: "sk-aqui",
    modelo: "anthropic/claude-sonnet-4.5",
    nomes: true,
    cnpj: false,
    ajustes: {},
    instrucoes: "assim",
    limites: { porConversa: 0, porDia: 0 },
    cache: true,
    memoria: true,
    modeloAuxiliar: "",
    ...c,
  }) as Config;

type Listas = Retrato["listas"];

function retrato(p: Partial<Listas> & { config?: Partial<Config> } = {}): Retrato {
  const { config, ...listas } = p;
  return {
    config: configPadrao(config),
    ignorados: {},
    listas: {
      skills: [],
      colecoes: [],
      regras: [],
      memoria: [],
      rotinas: [],
      conectores: [],
      fluxos: [],
      colecoesFluxos: [],
      conversas: [],
      ...listas,
    },
  };
}

const diario = (): Diario => ({});

/** O diário do retrato com todas as marcas no carimbo `em` (como se editadas em `em`). */
function diarioEm(r: Retrato, em: number): Diario {
  const d = carimbar(r, diario(), 0);
  return Object.fromEntries(Object.entries(d).map(([t, marcas]) => [t, Object.fromEntries(Object.entries(marcas).map(([id, m]) => [id, { ...m, em }]))]));
}

/** O envelope que um computador com este retrato, tudo editado em `em`, gravaria. */
const envelopeEm = (r: Retrato, em: number): EnvelopeAgente => mesclar(r, diarioEm(r, em), null, { agora: em, segredos: false }).envelope;

export function verificarArquivoAgente(): void {
  secao("arquivo do agente: exportar, carimbar e lapides");
  // a) exportar do zero
  const r1 = mesclar(retrato({ skills: [skill()] }), diario(), null, { agora: 100, segredos: false });
  checar("skill vai ao arquivo", r1.envelope.registros.skills[0]?.id === "s1", r1.envelope.registros.skills);
  checar("skill vai com o texto inteiro", (r1.envelope.registros.skills[0]?.dado as SkillUsuario).texto === "texto completo da skill");
  checar("sem segredos por padrao", r1.envelope.segredos === undefined && !JSON.stringify(r1.envelope).includes("sk-aqui"));
  checar("envelope com formato, versao e todos os tipos", r1.envelope.formato === FORMATO && r1.envelope.versao === VERSAO && TIPOS.every((t) => Array.isArray(r1.envelope.registros[t])));
  checar("config vai sem a chave", r1.envelope.config !== undefined && !("chave" in (r1.envelope.config.dado as object)));
  checar("exportar do zero nao muda o local", !r1.mudouLocal);

  // b) carimbar é idempotente
  const d1 = carimbar(retrato({ skills: [skill()] }), diario(), 100);
  checar("primeira vista carimba 0 (sem data conhecida)", d1.skills.s1.em === 0 && d1.config._.em === 0 && d1.ignorados._.em === 0, d1);
  checar("carimbo estavel", carimbar(retrato({ skills: [skill()] }), d1, 200).skills.s1.em === 0);
  checar("edicao local carimba de novo", carimbar(retrato({ skills: [skill({ nome: "Outro" })] }), d1, 200).skills.s1.em === 200);
  checar("carimbar nao altera o diario recebido", d1.skills.s1.em === 0 && !d1.skills.s1.apagado);

  // c) exclusão local vira lápide e o arquivo não ressuscita
  const r2 = mesclar(retrato({ skills: [] }), d1, r1.envelope, { agora: 300, segredos: false });
  const lapide = r2.envelope.registros.skills[0];
  checar("lapide no envelope", lapide?.apagado === true && lapide.em === 300 && r2.retrato.listas.skills.length === 0, r2.envelope.registros.skills);
  checar("lapide vai sem dado", lapide?.dado === undefined);
  checar("lapide fica no diario", r2.diario.skills.s1.apagado === true);

  // d) lápide do arquivo mais nova apaga aqui
  const r3 = mesclar(retrato({ skills: [skill()] }), d1, r2.envelope, { agora: 400, segredos: false });
  checar("lapide remota apaga", r3.retrato.listas.skills.length === 0 && r3.mudouLocal);
  checar("e o diario recebe a lapide do arquivo", r3.diario.skills.s1.apagado === true && r3.diario.skills.s1.em === 300);

  secao("arquivo do agente: mais recente vence");
  {
    // e) edição mais nova do arquivo vence; mais velha perde
    const dLocal = diarioEm(retrato({ skills: [skill()] }), 100);
    const envNovo = envelopeEm(retrato({ skills: [skill({ nome: "De la" })] }), 500);
    const vence = mesclar(retrato({ skills: [skill()] }), dLocal, envNovo, { agora: 600, segredos: false });
    checar("edicao mais nova do arquivo entra", vence.retrato.listas.skills[0]?.nome === "De la" && vence.mudouLocal);
    checar("diario fica com o carimbo do arquivo", vence.diario.skills.s1.em === 500);
    checar("mescla seguinte nao muda mais nada", !mesclar(vence.retrato, vence.diario, vence.envelope, { agora: 700, segredos: false }).mudouLocal);
    checar(
      "e o carimbo segue o do arquivo",
      mesclar(vence.retrato, vence.diario, vence.envelope, { agora: 700, segredos: false }).diario.skills.s1.em === 500,
    );

    const envVelho = envelopeEm(retrato({ skills: [skill({ nome: "Antigo" })] }), 50);
    const perde = mesclar(retrato({ skills: [skill()] }), dLocal, envVelho, { agora: 600, segredos: false });
    checar("edicao mais velha do arquivo perde", perde.retrato.listas.skills[0]?.nome === "Despacho" && !perde.mudouLocal);
    checar("e o envelope leva a daqui", (perde.envelope.registros.skills[0]?.dado as SkillUsuario).nome === "Despacho" && perde.envelope.registros.skills[0]?.em === 100);

    const empate = mesclar(retrato({ skills: [skill()] }), dLocal, envelopeEm(retrato({ skills: [skill({ nome: "Empate" })] }), 100), { agora: 600, segredos: false });
    checar("empate fica com o local", empate.retrato.listas.skills[0]?.nome === "Despacho");

    const soLa = mesclar(retrato(), diario(), envNovo, { agora: 600, segredos: false });
    checar("registro que so existe no arquivo entra", soLa.retrato.listas.skills[0]?.id === "s1" && soLa.mudouLocal);
  }

  secao("arquivo do agente: primeira vista");
  {
    // 1) computador B recebeu s1 pelo storage.sync (sem texto) e nunca viu o arquivo
    const envA = mesclar(retrato({ skills: [skill()] }), diario(), null, { agora: 100, segredos: false }).envelope;
    checar("arquivo novo leva carimbo 0", envA.registros.skills[0]?.em === 0 && envA.config?.em === 0);
    const b = mesclar(retrato({ skills: [skill({ texto: "" })] }), diario(), envA, { agora: 200, segredos: false });
    checar("B recebe o texto da skill do arquivo", b.retrato.listas.skills[0]?.texto === "texto completo da skill" && b.mudouLocal, b.retrato.listas.skills[0]);
    checar("e o arquivo nao perde o texto", (b.envelope.registros.skills[0]?.dado as SkillUsuario).texto === "texto completo da skill");
    checar("mescla seguinte em B fica estavel", !mesclar(b.retrato, b.diario, b.envelope, { agora: 300, segredos: false }).mudouLocal);

    // 2) computador novo, config padrao, diario vazio
    const envX = mesclar(retrato({ config: { instrucoes: "X", chave: "sk-la" } }), diario(), null, { agora: 100, segredos: false }).envelope;
    const novo = mesclar(retrato(), diario(), envX, { agora: 200, segredos: false });
    checar("config do arquivo entra no computador novo", novo.retrato.config.instrucoes === "X");
    checar("com a chave local preservada", novo.retrato.config.chave === "sk-aqui");

    // 3) edição local depois da primeira vista vence o arquivo em 0
    const d0 = carimbar(retrato({ skills: [skill()] }), diario(), 100);
    const editado = mesclar(retrato({ skills: [skill({ nome: "Editado aqui" })] }), d0, envA, { agora: 400, segredos: false });
    checar("edicao local carimba agora", editado.diario.skills.s1.em === 400);
    checar("e vence o arquivo em 0", editado.retrato.listas.skills[0]?.nome === "Editado aqui" && (editado.envelope.registros.skills[0]?.dado as SkillUsuario).nome === "Editado aqui");
  }

  secao("arquivo do agente: conversas");
  {
    // f) poda: a marca velha sai do diário sem lápide
    const dConv = carimbar(retrato({ conversas: [conversa({ quando: 1 })] }), diario(), 1);
    const agora = 1 + 40 * DIA;
    const podado = carimbar(retrato(), dConv, agora);
    checar("poda nao gera lapide", podado.conversas?.v1 === undefined, podado.conversas);
    const exclusaoRecente = carimbar(retrato(), carimbar(retrato({ conversas: [conversa({ quando: agora - DIA })] }), diario(), agora - DIA), agora);
    checar("exclusao recente de conversa vira lapide", exclusaoRecente.conversas?.v1?.apagado === true);
    const semPrazo = carimbar(retrato({ config: { dias: 0 } }), dConv, agora);
    checar("com dias=0 a exclusao velha tambem vira lapide", semPrazo.conversas?.v1?.apagado === true);

    // g) guardar=false: não importa nem exporta as daqui
    const envConv = mesclar(retrato({ conversas: [conversa({ id: "la", quando: 900 })] }), diario(), null, { agora: 900, segredos: false }).envelope;
    // A config daqui tem data (editada em 950): senão a do arquivo, em 0, venceria e religaria o "guardar".
    const semGuardar = retrato({ config: { guardar: false }, conversas: [conversa({ id: "aqui", quando: 900 })] });
    const naoGuarda = mesclar(semGuardar, diarioEm(semGuardar, 950), envConv, {
      agora: 1000,
      segredos: false,
    });
    checar(
      "conversas do arquivo ficam no envelope",
      naoGuarda.envelope.registros.conversas.length === 1 && naoGuarda.envelope.registros.conversas[0].id === "la",
      naoGuarda.envelope.registros.conversas,
    );
    checar("e nao entram no retrato", !naoGuarda.retrato.listas.conversas.some((c) => c.id === "la"));
    checar("as daqui nao vao ao arquivo", !naoGuarda.envelope.registros.conversas.some((r) => r.id === "aqui"));
    checar("nem sao carimbadas", naoGuarda.diario.conversas === undefined || Object.keys(naoGuarda.diario.conversas).length === 0);
    checar("nao muda o local", !naoGuarda.mudouLocal);

    // h) conversa do arquivo mais velha que o prazo daqui
    const envVelha = mesclar(retrato({ config: { dias: 0 }, conversas: [conversa({ id: "velha", quando: 1 })] }), diario(), null, { agora: 2, segredos: false }).envelope;
    const prazo = mesclar(retrato(), diarioEm(retrato(), 5), envVelha, { agora: 1 + 40 * DIA, segredos: false });
    checar("conversa velha do arquivo nao entra no retrato", prazo.retrato.listas.conversas.length === 0 && !prazo.mudouLocal);
    checar("mas fica no envelope", prazo.envelope.registros.conversas[0]?.id === "velha" && prazo.envelope.registros.conversas[0].dado !== undefined);
    const quemGuarda = mesclar(retrato({ config: { dias: 0 } }), diario(), envVelha, { agora: 1 + 40 * DIA, segredos: false });
    checar("quem guarda para sempre recebe", quemGuarda.retrato.listas.conversas[0]?.id === "velha");
    checar("com a transcricao", JSON.stringify(quemGuarda.retrato.listas.conversas[0]?.itens) === '[{"tipo":"usuario","texto":"oi"}]');
  }

  secao("arquivo do agente: segredos");
  {
    // i) segredos=true
    const com = mesclar(retrato({ conectores: [conector()] }), diario(), null, { agora: 100, segredos: true });
    checar("chave vai aos segredos", com.envelope.segredos?.chave === "sk-aqui", com.envelope.segredos);
    checar("token vai aos segredos", com.envelope.segredos?.tokens?.c1 === "Bearer segredo");
    const registro = JSON.stringify(com.envelope.registros.conectores);
    checar("e nunca no registro do conector", !registro.includes("Bearer segredo") && registro.includes("Authorization"), registro);
    const sem = mesclar(retrato({ conectores: [conector()] }), diario(), null, { agora: 100, segredos: false });
    checar("sem a caixa, token nao vai a lugar nenhum", !JSON.stringify(sem.envelope).includes("Bearer segredo"));

    const repetido = mesclar(com.retrato, com.diario, com.envelope, { agora: 999, segredos: true });
    checar("segredos iguais mantem o carimbo (sem regravar)", repetido.envelope.segredos?.em === com.envelope.segredos?.em && assinatura(repetido.envelope) === assinatura(com.envelope));

    // importação: local vazio recebe do arquivo
    const outroPc = retrato({ config: { chave: "" }, conectores: [conector({ auth: { tipo: "token", cabecalho: "Authorization", valor: "" } })] });
    const recebe = mesclar(outroPc, diario(), com.envelope, { agora: 200, segredos: true });
    checar("chave do arquivo entra quando falta aqui", recebe.retrato.config.chave === "sk-aqui");
    const auth = recebe.retrato.listas.conectores[0]?.auth;
    checar("token do arquivo entra quando falta aqui", auth?.tipo === "token" && auth.valor === "Bearer segredo", auth);

    const viaSync = retrato({ config: { chave: "" }, conectores: [conector({ auth: { tipo: "nenhuma" } })] });
    const volta = mesclar(viaSync, diarioEm(viaSync, 300), com.envelope, { agora: 300, segredos: true });
    const auth2 = volta.retrato.listas.conectores[0]?.auth;
    checar("conector que chegou sem autenticacao volta a token", auth2?.tipo === "token" && auth2.cabecalho === "Authorization" && auth2.valor === "Bearer segredo", auth2);

    const minha = mesclar(retrato({ config: { chave: "sk-minha" } }), diario(), com.envelope, { agora: 200, segredos: true });
    checar("chave daqui nao e trocada pela do arquivo", minha.retrato.config.chave === "sk-minha" && minha.envelope.segredos?.chave === "sk-minha");

    // j) segredos=false com lido.segredos
    const intacto = mesclar(outroPc, diario(), com.envelope, { agora: 200, segredos: false });
    checar("copia os segredos do arquivo intactos", JSON.stringify(intacto.envelope.segredos) === JSON.stringify(com.envelope.segredos));
    checar("e nao importa a chave", intacto.retrato.config.chave === "");
    const authJ = intacto.retrato.listas.conectores[0]?.auth;
    checar("nem o token", authJ?.tipo === "token" && authJ.valor === "");

    // k) removerSegredos
    const removido = mesclar(retrato(), diario(), com.envelope, { agora: 200, segredos: true, removerSegredos: true });
    checar("remover segredos tira do envelope", removido.envelope.segredos === undefined && !JSON.stringify(removido.envelope).includes("sk-aqui"));

    // o token do conector daqui sobrevive à versão do arquivo que vence
    const dCon = diarioEm(retrato({ conectores: [conector()] }), 100);
    const envRenomeado = envelopeEm(retrato({ conectores: [conector({ nome: "Renomeado", auth: { tipo: "token", cabecalho: "Authorization", valor: "" } })] }), 500);
    const preservado = mesclar(retrato({ conectores: [conector()] }), dCon, envRenomeado, { agora: 600, segredos: false });
    const auth3 = preservado.retrato.listas.conectores[0];
    checar("versao do arquivo entra sem apagar o token daqui", auth3?.nome === "Renomeado" && auth3.auth.tipo === "token" && auth3.auth.valor === "Bearer segredo", auth3);
  }

  secao("arquivo do agente: config e ignorados");
  {
    // l) config: instruções mais novas do arquivo entram; chave local preservada
    const dCfg = diarioEm(retrato(), 100);
    const envCfg = envelopeEm(retrato({ config: { instrucoes: "de la", chave: "sk-de-la" } }), 500);
    const cfg = mesclar(retrato(), dCfg, envCfg, { agora: 600, segredos: false });
    checar("instrucoes mais novas do arquivo entram", cfg.retrato.config.instrucoes === "de la" && cfg.mudouLocal);
    checar("chave daqui preservada", cfg.retrato.config.chave === "sk-aqui");
    checar("a chave de la nao estava no arquivo", !JSON.stringify(envCfg).includes("sk-de-la"));
    const cfgVelha = mesclar(retrato(), dCfg, envelopeEm(retrato({ config: { instrucoes: "velha" } }), 50), {
      agora: 600,
      segredos: false,
    });
    checar("config mais velha do arquivo perde", cfgVelha.retrato.config.instrucoes === "assim");

    const ign = { f1: [{ etapaId: "e1", quando: 5 }] };
    const envIgn = envelopeEm({ ...retrato(), ignorados: ign }, 500);
    const comIgn = mesclar(retrato(), dCfg, envIgn, { agora: 600, segredos: false });
    checar("ignorados mais novos do arquivo entram", JSON.stringify(comIgn.retrato.ignorados) === JSON.stringify(ign));
  }

  secao("arquivo do agente: leitura e assinatura");
  {
    // m) lerEnvelope
    checar("arquivo dos favoritos nao e lido", lerEnvelope({ formato: "seipro-favoritos", versao: 1, registros: {} }) === null);
    checar("sem registros nao e lido", lerEnvelope({ formato: FORMATO, versao: 1 }) === null);
    checar("registros nao-objeto nao e lido", lerEnvelope({ formato: FORMATO, versao: 1, registros: "x" }) === null);
    checar("lixo nao e lido", lerEnvelope(null) === null && lerEnvelope("texto") === null);
    const lido = lerEnvelope({
      formato: FORMATO,
      versao: 1,
      geradoEm: 1,
      registros: { skills: [{ id: "s1", em: 1, dado: skill() }, { id: "s2" }, { em: 3 }, { id: 4, em: 4 }] },
    });
    checar("tipo ausente vira lista vazia", lido !== null && Array.isArray(lido.registros.fluxos) && lido.registros.fluxos.length === 0);
    checar("registro sem em ou sem id e descartado", lido?.registros.skills.length === 1 && lido.registros.skills[0].id === "s1", lido?.registros.skills);
    checar("o envelope gerado e lido de volta igual", JSON.stringify(lerEnvelope(JSON.parse(JSON.stringify(r1.envelope)))) === JSON.stringify(r1.envelope));

    // n) assinatura ignora geradoEm
    const e: EnvelopeAgente = r1.envelope;
    checar("assinatura ignora geradoEm", assinatura({ ...e, geradoEm: 1 }) === assinatura({ ...e, geradoEm: 2 }));
    checar("assinatura muda com o conteudo", assinatura(e) !== assinatura(r2.envelope));
  }
}

// Execução avulsa: `npx tsx tests/verificar-arquivo-agente.ts`.
if (process.argv[1]?.endsWith("verificar-arquivo-agente.ts")) {
  verificarArquivoAgente();
  resumo();
}
