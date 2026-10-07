/**
 * O adaptador do Texto Padrão dos projetos (spec 6.1): nomes, validação,
 * privacidade dos sigilosos, poda, assinatura, relatório da leitura e, com o
 * motor genérico de verdade, o texto editado à mão, de versão mais nova e
 * perto ou acima do teto (Review Focus 1 do plano-mestre).
 */

import { areaMemoria } from "@comum/armazenamento/area";
import { type DestinoTexto, MotorTextoPadrao, type StatusSync } from "@comum/sincronia/motor";
import { gerarConteudoTexto, lerConteudoTexto } from "@comum/sincronia/textoPadraoCodec";
import type { EnvelopeProjetos, Registro } from "../src/modelo/tipos";
import {
  adaptadorProjetos,
  assinaturaProjetos,
  chaveRelatorio,
  chaveSubstituido,
  contarFuturos,
  descricaoDoTexto,
  nomeDoTexto,
  paraOTexto,
  type RelatorioImportacao,
  SIGILOSO_DOCUMENTO,
  SIGILOSO_PROCESSO,
  TETO_TEXTO,
  type TextoSubstituido,
  validarEnvelope,
} from "../src/sincronia/textoPadrao";
import { ESCOPO_EU, ESCOPO_UN, novoRepo } from "./apoioRepositorio";
import { etapa, projeto } from "./fabrica";
import { checar, secao } from "./util";

const DIA = 86_400_000;
const AGORA = Date.UTC(2026, 9, 6, 12);
const SIGILO = "50300.000777/2026-10";

function envelope(m: Partial<EnvelopeProjetos> = {}): EnvelopeProjetos {
  return {
    formato: "seipro-projetos",
    versao: 1,
    host: ESCOPO_UN.host,
    unidade: ESCOPO_UN.unidade,
    vis: "unidade",
    gerado: AGORA,
    entidades: { p: [], f: [], e: [], h: [], m: [] },
    ...m,
  };
}

function registro(m: Partial<Registro> & { id: string }): Registro {
  return { alvo: "e1", projeto: "p1", quando: AGORA, por: "ana", campo: "nome", atualizadoEm: AGORA, dispositivo: "dev-a", ...m };
}

/** O Texto Padrão "no SEI", que confere a gravação como o armazém do núcleo. */
function noSei(html: string | null = null) {
  const t = {
    html,
    gravadas: 0,
    async ler() {
      return t.html;
    },
    async gravar(h: string) {
      t.gravadas++;
      t.html = h;
    },
  };
  return t;
}

function motorDe(
  repo: ReturnType<typeof novoRepo>["repo"],
  area: ReturnType<typeof areaMemoria>,
  destino: DestinoTexto,
  ajuste: Partial<ReturnType<typeof adaptadorProjetos>> = {},
) {
  return new MotorTextoPadrao<EnvelopeProjetos>({
    adaptador: { ...adaptadorProjetos({ repo, area, sigla: "SEPRO", nomeUsuario: "Ana Lima" }), ...ajuste },
    destino,
    area,
    travar: (_n, fn) => fn(),
    releituras: 3,
    temporizador: { definir: () => 0, cancelar: () => undefined },
  });
}

export async function verificarSincroniaTexto(): Promise<void> {
  secao("sincronia: nomes e descricoes dos textos");
  checar("o da unidade", nomeDoTexto("unidade", "Ana") === "[_SEIPRO_PRJ_UNIDADE]");
  checar("o pessoal, com o login em minusculas", nomeDoTexto("eu", " Ana.Lima ") === "[_SEIPRO_PRJ_ana.lima]");
  const longo = nomeDoTexto("eu", "fulano.de.tal.com.um.login.enorme@orgao.gov.br");
  checar("login longo: cabe nos 50 do SEI, com ~ e hash", longo.length <= 50 && longo.includes("~"), longo);
  checar("descricoes ate 300 caracteres", descricaoDoTexto("unidade").length < 300 && /unidade/.test(descricaoDoTexto("unidade")));

  secao("sincronia: validacao do envelope");
  checar("o da unidade casa", "ok" in validarEnvelope(envelope(), ESCOPO_UN));
  checar("outro SEI: invalido", "invalido" in validarEnvelope(envelope({ host: "outro.gov.br" }), ESCOPO_UN));
  checar("outra unidade: invalido", "invalido" in validarEnvelope(envelope({ unidade: "999" }), ESCOPO_UN));
  checar("visibilidade trocada: invalido", "invalido" in validarEnvelope(envelope({ vis: "eu", login: "ana" }), ESCOPO_UN));
  checar("pessoal de outro login: invalido", "invalido" in validarEnvelope(envelope({ vis: "eu", login: "bia" }), ESCOPO_EU));
  checar("pessoal sem login: invalido", "invalido" in validarEnvelope(envelope({ vis: "eu" }), ESCOPO_EU));
  checar("pessoal do proprio login (caixa diferente): ok", "ok" in validarEnvelope(envelope({ vis: "eu", login: "ANA" }), ESCOPO_EU));
  checar("versao 2: mais novo (nao e invalido)", "maisNovo" in validarEnvelope(envelope({ versao: 2 as 1 }), ESCOPO_UN));
  checar("outro formato: invalido", "invalido" in validarEnvelope({ formato: "seipro-favoritos", versao: 1 }, ESCOPO_UN));
  const torto = envelope();
  (torto.entidades as unknown as Record<string, unknown>).e = "nada";
  checar("lista que nao e lista: invalido", "invalido" in validarEnvelope(torto, ESCOPO_UN));
  const lotado = envelope();
  lotado.entidades.h = Array.from({ length: 5001 }, (_, i) => registro({ id: `r${i}` }));
  checar("itens demais (alem do que cabe em 100 KB): invalido", "invalido" in validarEnvelope(lotado, ESCOPO_UN));
  const parcial = validarEnvelope({ ...envelope(), entidades: { p: [] } }, ESCOPO_UN);
  checar("lista que falta vira lista vazia", "ok" in parcial && parcial.ok.entidades.m.length === 0);

  secao("sincronia: privacidade dos sigilosos no texto");
  const env = envelope({
    entidades: {
      p: [
        projeto({ id: "p1", processo: { protocolo: SIGILO, idProcedimento: "777", sigiloso: true } }),
        projeto({ id: "p2", processo: { protocolo: "50300.000001/2026-01" } }),
      ],
      f: [],
      e: [
        etapa({ id: "e1", projeto: "p1", documento: { numero: "1234567", titulo: "Termo" } }),
        etapa({ id: "e2", projeto: "p2", processo: { protocolo: "50300000777202610" }, documento: { numero: "7654321" } }),
        etapa({ id: "e3", projeto: "p2", documento: { numero: "1111111" } }),
      ],
      h: [
        registro({ id: "h1", alvo: "p1", projeto: "p1", campo: "processo", depois: SIGILO }),
        registro({ id: "h2", alvo: "e1", projeto: "p1", campo: "documento", depois: "1234567" }),
        registro({ id: "h3", alvo: "e3", projeto: "p2", campo: "documento", depois: "1111111" }),
        registro({ id: "h4", alvo: "p2", projeto: "p2", campo: "processo", depois: "50300.000001/2026-01" }),
      ],
      m: [],
    },
  });
  const saida = paraOTexto(env, AGORA);
  const json = JSON.stringify(saida);
  checar(
    "o numero sigiloso nao aparece em lugar nenhum (nem sem pontuacao)",
    !json.includes("000777") && !json.includes("777202610"),
    json,
  );
  checar("nem o idProcedimento", !json.includes('"777"'));
  checar(
    "o vinculo vai vazio e marcado",
    saida.entidades.p[0]?.processo?.protocolo === "" && saida.entidades.p[0]?.processo?.sigiloso === true,
    saida.entidades.p[0],
  );
  checar("o mesmo processo noutra etapa (sem a marca) tambem vai vazio", saida.entidades.e[1]?.processo?.protocolo === "");
  checar(
    "documento de etapa sigilosa (herdada do projeto ou propria) nao vai",
    saida.entidades.e[0]?.documento === undefined && saida.entidades.e[1]?.documento === undefined,
  );
  checar("documento de etapa comum vai", saida.entidades.e[2]?.documento?.numero === "1111111");
  checar(
    "registro antigo com o numero vira 'processo sigiloso'",
    saida.entidades.h.find((r) => r.id === "h1")?.depois === SIGILOSO_PROCESSO,
  );
  checar(
    "registro do documento da etapa sigilosa fica sem o numero",
    saida.entidades.h.find((r) => r.id === "h2")?.depois === SIGILOSO_DOCUMENTO,
  );
  checar(
    "os registros comuns ficam como estao",
    saida.entidades.h.find((r) => r.id === "h3")?.depois === "1111111" &&
      saida.entidades.h.find((r) => r.id === "h4")?.depois === "50300.000001/2026-01",
  );
  checar("o envelope de entrada nao muda", env.entidades.p[0]?.processo?.protocolo === SIGILO && !!env.entidades.e[0]?.documento);
  const h1 = env.entidades.h[0] as Registro;
  const h1Saida = saida.entidades.h.find((r) => r.id === "h1");
  checar(
    "o registro raspado mantem o id e o carimbo do original (na volta, fica o daqui)",
    h1Saida?.atualizadoEm === h1.atualizadoEm && h1Saida.dispositivo === h1.dispositivo && h1Saida.quando === h1.quando,
    h1Saida,
  );

  secao("sincronia: poda na exportacao");
  const velha = (dias: number) => AGORA - dias * DIA;
  const comLapides = envelope({
    entidades: {
      p: [projeto({ id: "p-ok" }), projeto({ id: "p-181", removidoEm: velha(181), atualizadoEm: velha(181) })],
      f: [],
      e: [etapa({ id: "e-100", removidoEm: velha(100), atualizadoEm: velha(100) })],
      h: Array.from({ length: 305 }, (_, i) => registro({ id: `h${String(i).padStart(3, "0")}`, quando: AGORA - i })),
      m: [],
    },
  });
  const podado = paraOTexto(comLapides, AGORA);
  checar(
    "unidade: lapide de 181 dias sai, a de 100 fica",
    !podado.entidades.p.some((x) => x.id === "p-181") && podado.entidades.e.length === 1,
  );
  checar(
    "historico: so os 300 mais recentes",
    podado.entidades.h.length === 300 && !podado.entidades.h.some((r) => r.id === "h304"),
    podado.entidades.h.length,
  );
  const pessoal = paraOTexto({ ...comLapides, vis: "eu", login: "ana" }, AGORA);
  checar("pessoal: lapide de 100 dias sai (prazo de 90)", pessoal.entidades.e.length === 0);
  const sigilosaPodada = paraOTexto(
    envelope({
      entidades: {
        p: [
          projeto({ id: "p-velho", processo: { protocolo: SIGILO, sigiloso: true }, removidoEm: velha(181), atualizadoEm: velha(181) }),
          projeto({ id: "p-vivo", processo: { protocolo: SIGILO } }),
        ],
        f: [],
        e: [],
        h: [],
        m: [],
      },
    }),
    AGORA,
  );
  checar(
    "a marca de sigilo de uma lapide que a poda tira ainda vale para os outros",
    !sigilosaPodada.entidades.p.some((x) => x.id === "p-velho") && sigilosaPodada.entidades.p[0]?.processo?.protocolo === "",
    sigilosaPodada.entidades.p,
  );

  secao("sincronia: assinatura e futuro");
  const a1 = assinaturaProjetos(envelope({ gerado: 1 }));
  checar("sem o 'gerado' (quem gravou e quando nao contam)", a1 === assinaturaProjetos(envelope({ gerado: 999 })));
  const ordemA = envelope({ entidades: { p: [projeto({ id: "a" }), projeto({ id: "b" })], f: [], e: [], h: [], m: [] } });
  const ordemB = envelope({ entidades: { p: [projeto({ id: "b" }), projeto({ id: "a" })], f: [], e: [], h: [], m: [] } });
  checar("a ordem das listas nao conta", assinaturaProjetos(ordemA) === assinaturaProjetos(ordemB));
  checar(
    "conta o que vem de mais de 1 dia no futuro",
    contarFuturos({ p: [projeto({ id: "x", atualizadoEm: AGORA + 2 * DIA })], e: [etapa({ id: "y", atualizadoEm: AGORA })] }, AGORA) === 1,
  );

  secao("sincronia: o adaptador com o motor (editado a mao, versao nova, teto)");
  const area = areaMemoria();
  const relogio = { agora: AGORA };
  const { repo } = novoRepo(ESCOPO_UN, area, "a", relogio);
  const p = await repo.criarProjeto({ nome: "Plano anual" });
  await repo.criarEtapa({ projeto: p.id, nome: "Diagnóstico", inicio: "2026-10-06", fim: "2026-10-09" });
  const editadoAMao = `${await gerarConteudoTexto("Dados", envelope())}\n<p>Colei isto aqui sem querer.</p>`;
  const sei1 = noSei(editadoAMao);
  const s1 = await motorDe(repo, area, sei1).sincronizar();
  const guardado = (await area.obter(chaveSubstituido(ESCOPO_UN)))[chaveSubstituido(ESCOPO_UN)] as TextoSubstituido | undefined;
  checar("editado a mao: o texto antigo fica guardado neste navegador", guardado?.html === editadoAMao && !guardado.cortado, guardado);
  checar(
    "e e regravado a partir do local, com aviso",
    sei1.gravadas === 1 && s1.estado === "ok" && /inválido/.test(s1.mensagem ?? "") && /guardado neste navegador/.test(s1.mensagem ?? ""),
    s1,
  );
  const lido = await lerConteudoTexto(sei1.html ?? "");
  checar(
    "o texto regravado tem os projetos daqui",
    "bruto" in lido && (lido.bruto as EnvelopeProjetos).entidades.p.some((x) => x.id === p.id),
  );
  checar("os dados locais ficaram como estavam", (await repo.dados()).etapas.length === 1);
  const maisNovo = await gerarConteudoTexto("Dados", envelope({ versao: 2 as 1 }));
  const sei2 = noSei(maisNovo);
  const s2 = await motorDe(repo, area, sei2).sincronizar({ forcar: true });
  checar(
    "versao mais nova: nao grava e pede para atualizar o SEI Pro",
    sei2.gravadas === 0 && sei2.html === maisNovo && s2.estado === "erro" && /versão mais nova/.test(s2.mensagem ?? ""),
    s2,
  );
  const sei3 = noSei(null);
  const s3 = await motorDe(repo, area, sei3, { teto: 400, aviso: 200 }).sincronizar({ forcar: true });
  checar(
    "acima do teto: nao grava e explica o que fazer",
    sei3.gravadas === 0 &&
      s3.estado === "erro" &&
      /passaram do limite/.test(s3.mensagem ?? "") &&
      /Exclua projetos/.test(s3.mensagem ?? ""),
    s3,
  );
  const sei4 = noSei(null);
  const s4 = await motorDe(repo, area, sei4, { aviso: 300 }).sincronizar({ forcar: true });
  checar("perto do teto: grava e avisa", sei4.gravadas === 1 && /perto do limite/.test(s4.mensagem ?? ""), s4);
  checar("o teto e de 100 KB", TETO_TEXTO === 102_400);

  secao("sincronia: texto que nao existe e escopo vazio");
  const areaV = areaMemoria();
  const { repo: vazio } = novoRepo(ESCOPO_UN, areaV, "v", { agora: AGORA });
  const sei5 = noSei(null);
  const s5 = await motorDe(vazio, areaV, sei5).sincronizar();
  checar("sem projetos da unidade: le e nao cria o texto", sei5.gravadas === 0 && s5.estado === "ok", s5);

  secao("sincronia: relatorio da leitura (relogio atrasado)");
  const areaR = areaMemoria();
  const { repo: r6 } = novoRepo(ESCOPO_UN, areaR, "r", { agora: AGORA });
  const doColega = envelope({
    entidades: { p: [projeto({ id: "futuro", atualizadoEm: AGORA + 3 * DIA })], f: [], e: [], h: [], m: [] },
  });
  await motorDe(r6, areaR, noSei(await gerarConteudoTexto("Dados", doColega))).sincronizar();
  const rel = (await areaR.obter(chaveRelatorio(ESCOPO_UN)))[chaveRelatorio(ESCOPO_UN)] as RelatorioImportacao | undefined;
  checar("o projeto do colega 3 dias no futuro fica de fora e e contado", rel?.futuros === 1 && rel.ignorados === 1, rel);
  checar("e nao entrou", (await r6.dados()).projetos.length === 0);
  const st = (await areaR.obter("projetos/sync/tp/sei.x.gov.br|ana|u:110/un"))["projetos/sync/tp/sei.x.gov.br|ana|u:110/un"] as
    | StatusSync
    | undefined;
  checar("o status fica na chave da spec (projetos/sync/tp/<escopo>)", !!st, st);

  secao("sincronia: a propria copia sigilosa que volta do texto (com o motor)");
  const areaS = areaMemoria();
  const { repo: rs } = novoRepo(ESCOPO_UN, areaS, "s", { agora: AGORA });
  const ps = await rs.criarProjeto({ nome: "Apuração", processo: { protocolo: SIGILO, idProcedimento: "777", sigiloso: true } });
  const es = await rs.criarEtapa({ projeto: ps.id, nome: "Oitiva", inicio: "2026-10-06", fim: "2026-10-09" });
  await rs.concluirEtapa(es.id, "2026-10-09", { numero: "1234567" });
  // Outro projeto com o mesmo número, sem a marca: o registro "processo" dele leva o número (o envelope raspa).
  const pc = await rs.criarProjeto({ nome: "Acompanhamento" });
  await rs.editarProjeto(pc.id, { processo: { protocolo: SIGILO } });
  const seiS = noSei(null);
  await motorDe(rs, areaS, seiS).sincronizar({ forcar: true });
  const lidoS = await lerConteudoTexto(seiS.html ?? "");
  const jsonS = "bruto" in lidoS ? JSON.stringify(lidoS.bruto) : "";
  checar(
    "o texto gravado nao leva o numero, o idProcedimento nem o documento",
    seiS.gravadas === 1 && !!jsonS && !jsonS.includes("000777") && !jsonS.includes('"777"') && !jsonS.includes("1234567"),
    jsonS,
  );
  let avisos = 0;
  const pararS = rs.aoMudar(() => avisos++);
  const sS = await motorDe(rs, areaS, seiS).sincronizar({ forcar: true });
  checar(
    "na rodada seguinte a copia volta: nada regravado aqui (nenhum aviso) nem no SEI",
    seiS.gravadas === 1 && avisos === 0 && sS.estado === "ok" && !sS.pendente,
    { gravadas: seiS.gravadas, avisos, sS },
  );
  pararS();
  const hS = (await rs.entidades()).h;
  checar(
    "e quem tinha os numeros os mantem (vinculo, documento e registros)",
    (await rs.obterProjeto(ps.id))?.processo?.protocolo === SIGILO &&
      (await rs.obterEtapa(es.id))?.documento?.numero === "1234567" &&
      hS.some((r) => r.campo === "documento" && r.depois === "1234567") &&
      hS.some((r) => r.campo === "processo" && r.depois === SIGILO),
  );
}
