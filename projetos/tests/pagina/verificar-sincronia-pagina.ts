/**
 * A sincronia do lado da aba (pagina/sincronia.ts): o texto da unidade lido sem
 * consentimento e gravado só depois do "Entendi"; o pessoal desligado até o
 * consentimento; "sincronizar agora" e "apagar" (só o pessoal); o número
 * sigiloso nunca chega ao texto (decodificado: passa pelo adaptador de verdade,
 * com a memória do sigilo); a memória ilegível não derruba a aba.
 */

import { type Area, areaMemoria } from "@comum/armazenamento/area";
import { definirConsentimento } from "@comum/sincronia/consentimento";
import type { ConferenciaTexto, ResultadoGravacao, StatusSync } from "@comum/sincronia/motor";
import { gerarConteudoTexto, lerConteudoTexto } from "@comum/sincronia/textoPadraoCodec";
import { prefixoMemoriaSigilo } from "../../src/modelo/constantes";
import { ErroMemoriaSigilo } from "../../src/modelo/memoriaSigilo";
import type { EnvelopeProjetos, Vis } from "../../src/modelo/tipos";
import { INTERVALO_PUXAR, SincroniaPagina } from "../../src/pagina/sincronia";
import { RepositorioProjetos } from "../../src/repositorio";
import { CHAVE_CONSENTIMENTO, chaveDoConsentimento } from "../../src/sincronia/consentimento";
import { chaveStatusTexto } from "../../src/sincronia/textoPadrao";
import { checar, secao, tique } from "./util";

const AGORA = Date.UTC(2026, 9, 6, 12);
const HOST = "sei.x.gov.br";
const SIGILO = "50300.000777/2026-10";

function textoNoSei(html: string | null = null) {
  const t = {
    html,
    lidas: 0,
    gravadas: 0,
    excluido: false,
    async ler() {
      t.lidas++;
      return t.html;
    },
    async gravar(h: string) {
      t.gravadas++;
      t.html = h;
    },
    async gravarConferindo(h: string, c: ConferenciaTexto): Promise<ResultadoGravacao> {
      if (!c.mesmo(t.html, c.anterior)) return { gravado: false, atual: t.html };
      t.gravadas++;
      t.html = h;
      return { gravado: true };
    },
    async excluir() {
      const havia = t.html !== null;
      t.html = null;
      t.excluido = true;
      return havia;
    },
  };
  return t;
}

function montar(
  textos: Record<Vis, ReturnType<typeof textoNoSei>>,
  inicial: Record<string, unknown> = {},
  embrulhar: (a: Area) => Area = (a) => a,
) {
  const area = embrulhar(areaMemoria(inicial));
  const sync = areaMemoria();
  const relogio = { agora: AGORA };
  const repo = (vis: Vis) =>
    new RepositorioProjetos(area, { host: HOST, login: "ana", unidade: "110", vis }, () => ({
      agora: ++relogio.agora,
      dispositivo: "pc-ana",
      por: "ana",
      nome: "Ana Lima",
    }));
  const repos = { unidade: repo("unidade"), eu: repo("eu") };
  const s = new SincroniaPagina({
    host: HOST,
    login: "ana",
    nomeUsuario: "Ana Lima",
    unidade: { id: "110", sigla: "SEPRO" },
    area,
    sync,
    repos,
    armazem: (vis) => textos[vis],
    travar: (_n, fn) => fn(),
    atrasoEnvio: 10,
  });
  const consentir = (vis: Vis, v: "ligado" | "desligado") =>
    definirConsentimento(sync, CHAVE_CONSENTIMENTO, "textoPadrao", chaveDoConsentimento(HOST, "ana", "110", vis), v);
  const status = async (vis: Vis) => {
    const k = chaveStatusTexto(repos[vis].escopo);
    return (await area.obter(k))[k] as StatusSync | undefined;
  };
  return { s, repos, area, sync, consentir, status };
}

/** O envelope gravado no texto, decodificado (null se não há texto ou ele é inválido). */
async function envelopeDoTexto(html: string | null): Promise<EnvelopeProjetos | null> {
  const r = html ? await lerConteudoTexto(html) : null;
  return r && "bruto" in r ? (r.bruto as EnvelopeProjetos) : null;
}

const doColega = (): EnvelopeProjetos => ({
  formato: "seipro-projetos",
  versao: 1,
  host: HOST,
  unidade: "110",
  vis: "unidade",
  gerado: AGORA,
  entidades: {
    p: [{ id: "pc1", nome: "Do colega", etiquetas: [], ordem: "a0", criadoEm: AGORA, atualizadoEm: AGORA, dispositivo: "pc-bia" }],
    f: [],
    e: [],
    h: [],
    m: [],
  },
});

export async function verificarSincroniaPagina(): Promise<void> {
  secao("pagina: o texto da unidade e lido sem consentimento");
  const un = textoNoSei(await gerarConteudoTexto("Dados", doColega()));
  const eu = textoNoSei(null);
  const m = montar({ unidade: un, eu });
  await m.s.iniciar({ puxar: true });
  await tique(40);
  checar("le e mescla o projeto do colega", (await m.repos.unidade.dados()).projetos.some((p) => p.id === "pc1") && un.gravadas === 0);
  checar("o pessoal, desligado, nem e lido", eu.lidas === 0);
  await m.repos.unidade.criarProjeto({ nome: "Meu da unidade", processo: { protocolo: SIGILO, sigiloso: true } });
  await tique(60);
  checar(
    "mudanca na unidade sem o 'Entendi': nao grava e fica aguardando",
    un.gravadas === 0 && (await m.status("unidade"))?.aguardandoPermissao === true,
  );
  await m.consentir("unidade", "ligado");
  await tique(60);
  checar("com o 'Entendi': grava na hora", un.gravadas === 1);
  // O texto é compactado: a prova decodifica o que foi gravado (o adaptador de verdade, com a memória do sigilo).
  const gravado = await envelopeDoTexto(un.html);
  const meu = gravado?.entidades.p.find((p) => p.nome === "Meu da unidade");
  checar(
    "e o numero sigiloso nao foi junto (no texto decodificado, o vinculo vai vazio e marcado)",
    !!gravado &&
      !/000777|50300000777202610/.test(JSON.stringify(gravado)) &&
      meu?.processo?.protocolo === "" &&
      meu.processo.sigiloso === true &&
      meu.processo.idProcedimento === undefined,
    gravado,
  );
  const r = await m.s.agora();
  checar("sincronizar agora: a unidade sim, o pessoal (desligado) nao", r.unidade.estado === "ok" && r.eu === null, r);
  const local = (await m.repos.unidade.dados()).projetos.find((p) => p.nome === "Meu da unidade");
  checar(
    "e quem tem o numero nao o perde quando o texto volta (sem regravar)",
    local?.processo?.protocolo === SIGILO && un.gravadas === 1,
    local,
  );

  secao("pagina: o texto pessoal so com consentimento");
  await m.repos.eu.criarProjeto({ nome: "Só meu" });
  await tique(40);
  checar("desligado: o pessoal nao vai", eu.gravadas === 0 && eu.lidas === 0);
  await m.consentir("eu", "ligado");
  await tique(60);
  checar("ligado: grava o pessoal", eu.gravadas === 1);
  const r2 = await m.s.agora();
  checar("sincronizar agora devolve os dois", r2.unidade.estado === "ok" && r2.eu?.estado === "ok", r2);
  const lidasAntes = un.lidas;
  await m.s.puxar();
  checar("puxar ao focar respeita os 2 min", un.lidas === lidasAntes && INTERVALO_PUXAR === 120_000);
  const apagou = await m.s.apagarPessoal();
  checar("apagar: so o pessoal, e desliga", apagou && eu.excluido && un.html !== null);
  const prefs = (await m.sync.obter(CHAVE_CONSENTIMENTO))[CHAVE_CONSENTIMENTO] as { textoPadrao: Record<string, string> };
  checar(
    "consentimentos por texto no storage.sync",
    prefs.textoPadrao[`${HOST}|ana|110|eu`] === "desligado" && prefs.textoPadrao[`${HOST}|ana|110|un`] === "ligado",
    prefs,
  );
  m.s.parar();

  secao("pagina: a memoria do sigilo ilegivel nao derruba a aba");
  {
    const MEMORIA = `${prefixoMemoriaSigilo(HOST, "ana")}p/50300000777202610`;
    const un2 = textoNoSei(await gerarConteudoTexto("Dados", doColega()));
    const eu2 = textoNoSei(null);
    // O storage não consegue ler a memória do sigilo (falha fechada): a única forma de ela ficar ilegível.
    const falha = { ler: true };
    const m2 = montar({ unidade: un2, eu: eu2 }, { [MEMORIA]: "local" }, (a) => ({
      ...a,
      async obter(ch?: string | string[] | null) {
        const ks = ch === null || ch === undefined ? ["projetos/sigilo/"] : typeof ch === "string" ? [ch] : ch;
        if (falha.ler && ks.some((k) => k.startsWith("projetos/sigilo/"))) throw new Error("falha simulada ao ler o storage");
        return a.obter(ch);
      },
    }));
    await m2.consentir("unidade", "ligado");
    let caiu: unknown = null;
    try {
      await m2.s.iniciar({ puxar: true });
      await tique(40);
    } catch (e) {
      caiu = e;
    }
    const st = await m2.status("unidade");
    checar(
      "iniciar nao lanca: a sincronia da unidade fica em erro, com o motivo, e nada e gravado nem mesclado",
      caiu === null &&
        st?.estado === "erro" &&
        st.mensagem === new ErroMemoriaSigilo().message &&
        un2.lidas >= 1 &&
        un2.gravadas === 0 &&
        !(await m2.repos.unidade.entidades()).p.some((p) => p.id === "pc1"),
      { caiu, st, lidas: un2.lidas, gravadas: un2.gravadas },
    );
    let caiuAgora: unknown = null;
    let r3: Awaited<ReturnType<SincroniaPagina["agora"]>> | null = null;
    try {
      r3 = await m2.s.agora();
      await m2.s.puxar();
    } catch (e) {
      caiuAgora = e;
    }
    checar(
      "sincronizar agora e puxar tambem nao lancam: devolvem o erro",
      caiuAgora === null && r3?.unidade.estado === "erro" && r3.eu === null && un2.gravadas === 0,
      { caiuAgora, r3 },
    );
    falha.ler = false;
    const r4 = await m2.s.agora();
    checar(
      "com a memoria legivel de novo, a rodada seguinte le e mescla",
      r4.unidade.estado === "ok" && (await m2.repos.unidade.dados()).projetos.some((p) => p.id === "pc1"),
      r4,
    );
    m2.s.parar();
  }
}
