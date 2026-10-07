/**
 * O diálogo "Sincronização": as quatro seções, os botões de cada estado, o texto antigo guardado, a cópia que
 * RECUPERA (só o que sumiu volta; o aviso diz quantos itens voltaram de fato) e os erros como texto (a memória
 * do sigilo ilegível no arquivo e na cópia do dia, a aba do SEI fechada, a cópia danificada).
 */

import type { StatusArquivo } from "@comum/sincronia/arquivo";
import { criarAbrirModal } from "@comum/ui/dialogo";
import type { SituacaoSincronia } from "../src/app/colaboracao/estado";
import { type DepsSincronizacao, montarSincronizacao } from "../src/app/dialogos/sincronizacao";
import { ErroMemoriaSigilo } from "../src/modelo/memoriaSigilo";
import { ErroValidacao } from "../src/modelo/validacao";
import type { CopiaProjetos } from "../src/sincronia/arquivo";
import { rastrearFoco, telaDoApp, texto } from "./apoioApp";
import { HOSTIL } from "./cenarioGantt";
import { botao, checar, secao, tique } from "./util";

const AGORA = Date.UTC(2026, 9, 6, 12);
const MEMORIA = new ErroMemoriaSigilo().message;

function deps(m: Partial<DepsSincronizacao> = {}, situ?: Partial<SituacaoSincronia>) {
  const feitos: string[] = [];
  const baixados: Array<{ nome: string; conteudo: string }> = [];
  const perguntas: string[] = [];
  const resposta = { sim: true };
  let situacao: SituacaoSincronia = {
    unidade: {
      vis: "unidade",
      nome: "[_SEIPRO_PRJ_UNIDADE]",
      consentimento: "ligado",
      status: { estado: "ok", quando: AGORA, ultimoOk: AGORA, pendente: false },
    },
    eu: { vis: "eu", nome: "[_SEIPRO_PRJ_ana]", consentimento: "nao-perguntado" },
    ...situ,
  };
  const d: DepsSincronizacao = {
    sigla: "SEPRO",
    agora: () => AGORA + 60_000 * 3,
    situacao: async () => situacao,
    sincronizar: async () => void feitos.push("sincronizar"),
    pessoal: {
      ligar: async () => {
        feitos.push("ligar");
        situacao = { ...situacao, eu: { ...situacao.eu, consentimento: "ligado" } };
        return true;
      },
      desligar: async () => {
        feitos.push("desligar");
        situacao = { ...situacao, eu: { ...situacao.eu, consentimento: "desligado" } };
      },
      apagar: async () => {
        feitos.push("apagar");
        return true;
      },
    },
    arquivo: null,
    exportar: async () => void feitos.push("exportar"),
    importar: async () => void feitos.push("importar"),
    copias: null,
    baixar: (nome, conteudo) => baixados.push({ nome, conteudo }),
    confirmar: async (t) => {
      perguntas.push(t);
      return resposta.sim;
    },
    ...m,
  };
  return { d, feitos, baixados, perguntas, resposta };
}

const ARQUIVO_LIGADO = (status: () => StatusArquivo | null, extra: Partial<NonNullable<DepsSincronizacao["arquivo"]>> = {}) => ({
  status: async () => status(),
  configurado: async () => true,
  escolher: async () => undefined,
  reconectar: async () => undefined,
  agora: async () => undefined,
  esquecer: async () => undefined,
  ...extra,
});

const COPIA: CopiaProjetos = {
  id: "x|2026-10-06",
  dono: "x",
  dia: "2026-10-06",
  quando: AGORA,
  quantidade: 3,
  envelope: { formato: "seipro-projetos", versao: 1, tipo: "copia", gerado: 1, escopos: [] },
};

const aviso = (el: Element, s: string) => el.querySelector(`[data-secao='${s}'] .prj-sync-aviso`);

export async function verificarAppSincronizacao(): Promise<void> {
  secao("app: dialogo Sincronizacao");
  const doc = telaDoApp();
  rastrearFoco(doc);
  const a = deps({ sigla: HOSTIL });
  const el = await montarSincronizacao(a.d);
  // Na página (o foco do linkedom só vale para o que está no documento), como dentro do diálogo.
  doc.body.append(el);
  const secoes = [...el.querySelectorAll("section")].map((s) => s.getAttribute("data-secao"));
  checar("as secoes da spec (sem copias quando nao ha banco)", secoes.join() === "unidade,eu,arquivo", secoes);
  checar("a sigla aparece como texto", texto(el.querySelector("h3")).includes(HOSTIL) && !el.querySelector("img"));
  checar("a linha de situacao da unidade", /Sincronizado há 3 min/.test(texto(el.querySelector("[data-texto='unidade']"))));
  checar(
    "o pessoal desligado explica e oferece Ligar…",
    /Desligado/.test(texto(el.querySelector("[data-texto='eu']"))) && !!botao(el, "Ligar…"),
  );
  checar("o texto da unidade nao tem apagar (e de todos)", !texto(el.querySelector("[data-secao='unidade']")).includes("Apagar"));
  checar(
    "Sincronizar agora so na secao da unidade (vale para os dois textos)",
    !!botao(el.querySelector("[data-secao='unidade']")!, "Sincronizar agora") &&
      !botao(el.querySelector("[data-secao='eu']")!, "Sincronizar agora"),
  );
  botao(el, "Sincronizar agora")?.click();
  await tique();
  const ligar = botao(el, "Ligar…");
  ligar?.focus();
  ligar?.click();
  await tique();
  checar("ligar repinta com Desligar e Desligar e apagar", !!botao(el, "Desligar") && !!botao(el, "Desligar e apagar do SEI"));
  checar(
    "o foco do teclado fica na linha repintada (o botao clicado sumiu)",
    texto(doc.activeElement) === "Desligar",
    texto(doc.activeElement),
  );
  checar("a linha do pessoal ligado", /falta abrir o Controle de Processos/.test(texto(el.querySelector("[data-texto='eu']"))));
  botao(el, "Desligar e apagar do SEI")?.click();
  await tique();
  checar("acoes chegam a quem faz", a.feitos.join() === "sincronizar,ligar,apagar", a.feitos);
  checar(
    "apagar pergunta antes, com o nome do texto",
    a.perguntas.length === 1 && a.perguntas[0]!.includes("[_SEIPRO_PRJ_ana]") && /continuam neste navegador/.test(a.perguntas[0]!),
    a.perguntas,
  );
  checar("apagar diz o que fez", /foi apagado do SEI/.test(texto(aviso(el, "eu"))), texto(aviso(el, "eu")));
  a.resposta.sim = false;
  botao(el, "Desligar e apagar do SEI")?.click();
  await tique();
  checar("sem confirmar, nada e apagado", a.feitos.filter((f) => f === "apagar").length === 1, a.feitos);
  botao(el, "Desligar")?.click();
  await tique();
  checar("desligar repinta com Ligar…", a.feitos.at(-1) === "desligar" && !!botao(el, "Ligar…") && !!botao(el, "Apagar o texto do SEI"));
  botao(el, "Exportar tudo")?.click();
  botao(el, "Importar de um arquivo…")?.click();
  await tique();
  checar(
    "sem arquivo ligado: exportar e importar a mao",
    a.feitos.slice(-2).join() === "exportar,importar" && /não dá para manter/.test(texto(el)),
  );
  const abrir = criarAbrirModal();
  abrir({ titulo: "Sincronização", icone: "nuvem", conteudo: el });
  checar(
    "aberto no modal, o foco entra no dialogo (botao principal)",
    !!doc.activeElement?.closest("dialog") && texto(doc.activeElement) === "Ligar…",
    texto(doc.activeElement),
  );
  checar(
    "todo botao tem rotulo",
    [...el.querySelectorAll("button")].every((b) => texto(b) !== "" || !!b.getAttribute("aria-label")),
  );
  doc.querySelector("dialog")?.remove();

  secao("app: Sincronizacao com o texto antigo, arquivo e copias");
  telaDoApp();
  const status: StatusArquivo = { estado: "ok", quando: AGORA, nome: "projetos.json" };
  const restaurados: string[] = [];
  let voltam = 5;
  const b = deps(
    {
      arquivo: ARQUIVO_LIGADO(() => status),
      copias: {
        listar: async () => [COPIA],
        restaurar: async (c) => {
          restaurados.push(c.dia);
          return voltam;
        },
      },
    },
    {
      eu: {
        vis: "eu",
        nome: "[_SEIPRO_PRJ_ana]",
        consentimento: "ligado",
        status: { estado: "ok", quando: AGORA, pendente: false },
        substituido: { quando: AGORA, motivo: "o texto foi editado", html: "<p>antigo</p>", cortado: false },
      },
    },
  );
  const el2 = await montarSincronizacao(b.d);
  checar("com banco: a secao das copias", [...el2.querySelectorAll("section")].length === 4);
  checar(
    "arquivo ligado: o nome e a ultima sincronia",
    /Ligado a “projetos.json”/.test(texto(el2.querySelector("[data-secao='arquivo']"))),
  );
  checar("com o arquivo ligado, sem o exportar e importar a mao (um botao a menos)", !botao(el2, "Exportar tudo"));
  const doArquivo = botao(el2.querySelector("[data-secao='arquivo']")!, "Sincronizar agora");
  checar(
    "o Sincronizar agora do arquivo se distingue para o leitor de tela",
    doArquivo?.getAttribute("aria-label") === "Sincronizar agora o arquivo",
  );
  const subst = el2.querySelector(".prj-sync-substituido");
  checar("o texto pessoal que estava invalido: avisa e oferece baixar o antigo", /estava inválido/.test(texto(subst)));
  checar("sem corte, nao fala de pedaco", !/só o começo/.test(texto(subst)));
  botao(el2, "Baixar o texto antigo")?.click();
  checar(
    "baixa o html guardado",
    b.baixados[0]?.conteudo === "<p>antigo</p>" && /projetos-texto-antigo-2026-10-06\.html/.test(b.baixados[0]?.nome ?? ""),
    b.baixados,
  );
  checar("a copia mostra o dia e os projetos", /06\/10\/2026 — 3 projetos/.test(texto(el2.querySelector(".prj-copias"))));
  const dicaCopias = texto(el2.querySelector("[data-secao='copias']"));
  checar(
    "a dica das copias diz que restaurar recupera e nao volta no tempo",
    /excluído ou sumiu/.test(dicaCopias) &&
      /o que existe hoje não muda/i.test(dicaCopias) &&
      !/mantém o que entrou depois/.test(dicaCopias),
    dicaCopias,
  );
  const restaurar = botao(el2.querySelector(".prj-copias")!, "Restaurar");
  checar(
    "o Restaurar de cada copia diz o dia ao leitor de tela",
    restaurar?.getAttribute("aria-label") === "Restaurar a cópia de 06/10/2026",
  );
  b.resposta.sim = false;
  restaurar?.click();
  await tique();
  checar("sem confirmar, nada e restaurado", restaurados.length === 0 && texto(aviso(el2, "copias")) === "");
  checar(
    "a pergunta: o dia, o que volta e o que nao muda",
    b.perguntas.at(-1) ===
      "Restaurar a cópia de 06/10/2026? Traz de volta o que foi excluído ou sumiu desde então. O que existe hoje não muda.",
    b.perguntas,
  );
  b.resposta.sim = true;
  restaurar?.click();
  await tique();
  checar("restaurar (com confirmacao)", restaurados.join() === "2026-10-06");
  checar("o aviso com o numero real do que voltou", texto(aviso(el2, "copias")) === "5 itens voltaram.", texto(aviso(el2, "copias")));
  checar("o aviso e lido pelo leitor de tela", aviso(el2, "copias")?.getAttribute("role") === "status");
  voltam = 1;
  restaurar?.click();
  await tique();
  checar("um so item no singular", texto(aviso(el2, "copias")) === "1 item voltou.", texto(aviso(el2, "copias")));
  voltam = 0;
  restaurar?.click();
  await tique();
  checar(
    "nada voltou: diz que tudo ainda existe",
    texto(aviso(el2, "copias")) === "Nada para recuperar: tudo o que estava na cópia ainda existe.",
    texto(aviso(el2, "copias")),
  );

  secao("app: Sincronizacao mostra os erros como texto");
  telaDoApp();
  const ruim: StatusArquivo = { estado: "erro", quando: AGORA, nome: HOSTIL, mensagem: MEMORIA };
  let falhaRestaurar: Error = new ErroMemoriaSigilo();
  const c = deps(
    {
      sigla: "SEPRO",
      sincronizar: async () => {
        throw new Error("A aba do SEI foi fechada.");
      },
      arquivo: ARQUIVO_LIGADO(() => ruim, {
        escolher: async () => {
          throw new Error(HOSTIL);
        },
      }),
      copias: {
        listar: async () => [COPIA],
        restaurar: async () => {
          throw falhaRestaurar;
        },
        falhaDoDia: () => MEMORIA,
      },
    },
    {
      unidade: {
        vis: "unidade",
        nome: "[_SEIPRO_PRJ_UNIDADE]",
        consentimento: "ligado",
        status: { estado: "ok", quando: AGORA, pendente: false },
        substituido: { quando: AGORA, motivo: HOSTIL, html: "<p>x</p>", cortado: true },
      },
    },
  );
  const el3 = await montarSincronizacao(c.d);
  const arq = el3.querySelector("[data-secao='arquivo']");
  checar("arquivo parado pela memoria do sigilo: a mensagem como texto", texto(arq).includes(`Erro no arquivo: ${MEMORIA}`), texto(arq));
  checar("o erro do arquivo em destaque", !!arq?.querySelector(".prj-sync-erro"));
  checar("o texto substituido da unidade: motivo hostil como texto", texto(el3.querySelector(".prj-sync-substituido")).includes(HOSTIL));
  checar("cortado: diz que so o comeco ficou guardado", /só o começo/.test(texto(el3.querySelector(".prj-sync-substituido"))));
  checar("nada de html hostil vira elemento", !el3.querySelector("img"));
  const cps = el3.querySelector("[data-secao='copias']");
  checar(
    "a copia de hoje parada pela memoria: a mensagem como texto",
    texto(cps).includes(`A cópia de hoje não foi feita. ${MEMORIA}`),
    texto(cps),
  );
  const sinc = botao(el3, "Sincronizar agora");
  sinc?.click();
  await tique();
  checar("Sincronizar agora que falha: o erro na secao, como texto", texto(aviso(el3, "unidade")) === "A aba do SEI foi fechada.");
  checar("o botao volta a responder depois do erro", sinc?.getAttribute("aria-disabled") !== "true");
  botao(el3, "Trocar arquivo…")?.click();
  await tique();
  checar("o erro de escolher o arquivo como texto", texto(aviso(el3, "arquivo")) === HOSTIL && !el3.querySelector("img"));
  botao(el3.querySelector(".prj-copias")!, "Restaurar")?.click();
  await tique();
  checar("restaurar parado pela memoria do sigilo: a mensagem", texto(aviso(el3, "copias")) === MEMORIA, texto(aviso(el3, "copias")));
  falhaRestaurar = new ErroValidacao(["Esta cópia está danificada e não pode ser restaurada. Escolha a de outro dia."]);
  botao(el3.querySelector(".prj-copias")!, "Restaurar")?.click();
  await tique();
  checar("copia danificada: a mensagem do repositorio", /danificada/.test(texto(aviso(el3, "copias"))));

  secao("app: Sincronizacao sem arquivo ligado e com as copias ilegiveis");
  telaDoApp();
  const e = deps({
    exportar: async () => {
      throw new ErroMemoriaSigilo();
    },
    importar: async () => "3 projetos novos.",
    copias: {
      listar: async () => {
        throw new Error("IndexedDB fechado");
      },
      restaurar: async () => 0,
    },
  });
  const el4 = await montarSincronizacao(e.d);
  checar(
    "as copias que nao leem: explica, sem lista",
    /Não foi possível ler as cópias: IndexedDB fechado/.test(texto(el4)) && !el4.querySelector(".prj-copias"),
  );
  checar("sem falha do dia informada, nada sobre a copia de hoje", !/A cópia de hoje/.test(texto(el4)));
  botao(el4, "Exportar tudo")?.click();
  await tique();
  checar("exportar parado pela memoria do sigilo: a mensagem", texto(aviso(el4, "arquivo")) === MEMORIA, texto(aviso(el4, "arquivo")));
  botao(el4, "Importar de um arquivo…")?.click();
  await tique();
  checar("importar: a frase do resultado aparece", texto(aviso(el4, "arquivo")) === "3 projetos novos.");
  const vazio = deps({ copias: { listar: async () => [], restaurar: async () => 0 } });
  checar("sem copias ainda", /Ainda não há cópias/.test(texto(await montarSincronizacao(vazio.d))));
}
