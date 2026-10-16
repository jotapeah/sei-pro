/**
 * Provas do app do Processos em Lote (a janela dentro do iframe), com DOM do linkedom, RPC falso e o
 * repositorio de verdade sobre `areaMemoria`. O que a aba responde a cada `criar` e decidido aqui, por
 * especificacao e pela vez da chamada (1, 2...), e cada resposta pode ser segurada para a prova agir no meio.
 *
 * Toda prova que cria processos confere quantas vezes cada linha foi POSTADA: duplicar processo num SEI real e
 * o defeito que este modulo nao pode ter.
 */

import { type Area, areaMemoria } from "@comum/armazenamento/area";
import { ErroRpc } from "@comum/ponte/rpc";
import { AppProcessosLote, type DepsApp } from "@pl/app/app";
import { partesEnviadas } from "@pl/app/previa";
import { CHAVE_ENTRADA_LINK } from "@pl/modelo/constantes";
import type { LinhaLote } from "@pl/modelo/linhas";
import { montarPrevia } from "@pl/modelo/previa";
import { NUMERO_INCERTO, type ResultadoCriar } from "@pl/pagina/executor";
import { type LoteEmAndamento, RepositorioLote } from "@pl/repositorio";
import { botao, checar, combo, disparar, escolherCombo, instalarDom, secao, tique } from "./util";

const ESCOPO = "sei.x.gov.br|ana";
const CHAVE_LOTE = `lote/${ESCOPO}/atual`;
const TIPOS = [
  { id: "10", nome: "Contrato: Gestão" },
  { id: "20", nome: "Licitação: Pregão" },
];
const HIPOTESES = [{ id: "7", nome: "Controle Interno (Art. 26, Lei 10.180/2001)" }];

/** Resposta da aba para o `criar` de uma especificacao; `vezes` = quantas chamadas ja houve para ela. */
type Roteiro = (esp: string, vezes: number, linha: LinhaLote) => ResultadoCriar | Error | Promise<ResultadoCriar | Error>;

const criado = (_esp: string, n: number): ResultadoCriar => ({
  situacao: "ok",
  criado: { numero: `00001.00000${n}/2026-1${n}`, idProcedimento: `${100 + n}`, url: `https://sei.x.gov.br/sei/p?id=${100 + n}` },
});
let numeroSeq = 0;
const okSempre: Roteiro = (esp) => criado(esp, ++numeroSeq);

interface OpcoesMontar {
  roteiro?: Roteiro;
  area?: Area;
  hipoteses?: typeof HIPOTESES;
  /** Chamado quando um `criar` chega a aba, antes da resposta (a prova age "no meio"). */
  aoCriar?: (esp: string, vezes: number) => void;
}

function montar(o: OpcoesMontar = {}) {
  const doc = instalarDom('<html><body><div id="app"></div></body></html>');
  const raiz = doc.getElementById("app")!;
  const area = o.area ?? areaMemoria();
  const repo = new RepositorioLote(area, ESCOPO);
  /** Linha do tempo de tudo o que importa a ordem: gravacoes do lote, POSTs, fechar etc. */
  const eventos: string[] = [];
  const gravarOriginal = repo.gravar.bind(repo);
  repo.gravar = (l: LoteEmAndamento) => {
    eventos.push("repo.gravar");
    return gravarOriginal(l);
  };
  const chamadas: Array<{ op: string; args: unknown; prazo?: number }> = [];
  const porEsp = new Map<string, number>();
  const roteiro = o.roteiro ?? okSempre;
  const t = { fechou: 0, minimizou: [] as boolean[], entradaLink: [] as string[], pausas: [] as number[], avisos: [] as string[] };
  const baixados: Array<{ nome: string; conteudo: string }> = [];
  const copiados: string[] = [];

  const deps: DepsApp = {
    rpc: {
      chamar: (async (op: string, args?: unknown, prazo?: number) => {
        chamadas.push({ op, args, prazo });
        eventos.push(op);
        if (op === "tipos") return TIPOS;
        if (op === "formTipo") {
          const idTipo = (args as { idTipo: string }).idTipo;
          return { idTipo, hipoteses: o.hipoteses ?? HIPOTESES, temAssuntos: true };
        }
        if (op === "criar") {
          const linha = (args as { linha: LinhaLote }).linha;
          const esp = linha.especificacao;
          const vezes = (porEsp.get(esp) ?? 0) + 1;
          porEsp.set(esp, vezes);
          o.aoCriar?.(esp, vezes);
          await tique(1);
          const r = await roteiro(esp, vezes, linha);
          if (r instanceof Error) throw r;
          return r;
        }
        return true;
      }) as DepsApp["rpc"]["chamar"],
    },
    ctx: { host: "sei.x.gov.br", login: "ana", temaEscuro: false },
    repo,
    area,
    abrirModal: () => ({ fechar: () => {} }),
    confirmar: async () => true,
    baixar: (nome, conteudo) => void baixados.push({ nome, conteudo }),
    clip: { writeText: async (texto) => void copiados.push(texto) },
    fechar: () => {
      t.fechou += 1;
      eventos.push("fechar-app");
    },
    minimizar: async (m) => {
      t.minimizou.push(m);
    },
    gravarEntradaLink: async (texto) => {
      t.entradaLink.push(texto);
      eventos.push("gravarEntradaLink");
    },
    esperar: async (ms) => {
      t.pausas.push(ms);
    },
    avisar: (texto) => void t.avisos.push(texto),
  };
  const app = new AppProcessosLote(raiz, deps);

  const caixa = () => raiz.querySelector<HTMLTextAreaElement>("textarea")!;
  const digitar = (texto: string) => {
    caixa().value = texto;
    disparar(caixa(), "input");
  };
  const campo = (id: string) => raiz.querySelector<HTMLInputElement>(`#${id}`)!;
  const preencher = (id: string, valor: string) => {
    campo(id).value = valor;
    disparar(campo(id), "input");
  };
  const nivel = (v: "0" | "1") => {
    const r = raiz.querySelector<HTMLInputElement>(`input[name="pl-nivel"][value="${v}"]`)!;
    for (const x of raiz.querySelectorAll<HTMLInputElement>('input[name="pl-nivel"]')) x.checked = x === r;
    disparar(r, "change");
  };
  const criarDe = (esp: string) => chamadas.filter((c) => c.op === "criar" && (c.args as { linha: LinhaLote }).linha.especificacao === esp);
  const quantas = (esp: string) => criarDe(esp).length;
  const visivel = (texto: string) => {
    const b = botao(raiz, texto);
    return !!b && !b.hidden && !b.closest("[hidden]");
  };
  const clicar = (texto: string) => {
    const b = botao(raiz, texto);
    if (!b) throw new Error(`botao "${texto}" nao encontrado`);
    disparar(b, "click");
  };
  const textoVisivel = (texto: string) =>
    [...raiz.querySelectorAll("p, span, div, strong, h2, td")].some(
      (el) => !el.closest("[hidden]") && (el.textContent ?? "").includes(texto),
    );
  const linhasResultado = () =>
    [...raiz.querySelectorAll(".pl-resultado table tbody tr")].map((tr) =>
      [...tr.querySelectorAll("td")].map((td) => (td.textContent ?? "").trim()),
    );
  const lote = async () => (await area.obter(CHAVE_LOTE))[CHAVE_LOTE] as LoteEmAndamento | undefined;
  /** Configura e vai ate a previa: tipo, texto e (opcional) restrito com hipotese. */
  const configurar = async (texto: string, opc: { restrito?: boolean; hipotese?: boolean } = {}) => {
    await ate(() => !!combo(raiz, "Tipo de processo"));
    escolherCombo(raiz, "Tipo de processo", "10");
    await ate(() => chamadas.some((c) => c.op === "formTipo") && !botao(raiz, "Ver prévia")?.disabled);
    if (opc.restrito) nivel("1");
    if (opc.hipotese) escolherCombo(raiz, "Hipótese legal", "7");
    digitar(texto);
  };
  return {
    doc,
    raiz,
    app,
    deps,
    area,
    repo,
    eventos,
    chamadas,
    t,
    baixados,
    copiados,
    caixa,
    digitar,
    preencher,
    campo,
    nivel,
    criarDe,
    quantas,
    visivel,
    clicar,
    textoVisivel,
    linhasResultado,
    lote,
    configurar,
  };
}

async function ate(cond: () => boolean, limite = 200): Promise<void> {
  for (let i = 0; i < limite && !cond(); i += 1) await tique(2);
}

/** Uma resposta segurada: a prova decide quando a aba "responde". */
function segurar<T>() {
  let soltar!: (v: T) => void;
  const p = new Promise<T>((r) => {
    soltar = r;
  });
  return { p, soltar };
}

export async function verificarApp(): Promise<void> {
  secao("App: ponta a ponta (repetida removida, erro uma vez, cancelar na 3a, fechar, reabrir, continuar)");
  {
    const area = areaMemoria();
    let a: ReturnType<typeof montar> | null = null;
    // Contagem propria: as vezes do `montar` sao por app, e Gamma falha so na 1a chamada somando os dois apps.
    let gamma = 0;
    const roteiro: Roteiro = (esp) => {
      if (esp === "Gamma" && ++gamma === 1) return { situacao: "erro", erro: "O SEI recusou o formulário." };
      return criado(esp, ++numeroSeq);
    };
    // Cancelar quando a 3a linha (Gamma) ja saiu para a aba: ela termina, as outras ficam pendentes.
    a = montar({
      area,
      roteiro,
      aoCriar: (esp) => {
        if (esp === "Gamma") a?.clicar("Cancelar");
      },
    });
    await a.app.iniciar();
    await a.configurar("Alfa\nBeta\nAlfa\nGamma\nDelta");
    a.clicar("Ver prévia");
    checar("prévia mostra as 5 linhas", a.raiz.querySelectorAll(".pl-previa .pl-tabela tbody tr").length === 5);
    checar("prévia diz que a 3a é repetida", a.textoVisivel("repetida"));
    a.clicar("Remover repetidas");
    checar("remover repetidas: sobram 4", a.raiz.querySelectorAll(".pl-previa .pl-tabela tbody tr").length === 4);
    checar("sem repetidas: botão some", !a.visivel("Remover repetidas"));
    a.clicar("Iniciar");
    await ate(() => !!a?.raiz.querySelector(".pl-resultado"));
    checar(
      "o lote foi gravado antes do primeiro POST",
      a.eventos.indexOf("repo.gravar") >= 0 && a.eventos.indexOf("repo.gravar") < a.eventos.indexOf("criar"),
      a.eventos,
    );
    checar("cancelou: Delta nunca saiu", a.quantas("Delta") === 0);
    checar("Alfa, Beta e Gamma uma vez cada", a.quantas("Alfa") === 1 && a.quantas("Beta") === 1 && a.quantas("Gamma") === 1);
    checar("resultado: execução interrompida", a.textoVisivel("Execução interrompida"));
    const gravado = await a.lote();
    checar(
      "registro mantido: ok, ok, erro, pendente",
      gravado?.itens.map((i) => i.situacao).join() === "ok,ok,erro,pendente",
      gravado?.itens,
    );
    checar("registro sem a repetida", gravado?.linhas.map((l) => l.especificacao).join() === "Alfa,Beta,Gamma,Delta");
    // Fechar (X) e reabrir: um app novo sobre a mesma area.
    a.clicar("Fechar");
    a.app.destruir();
    const antes = a.chamadas.filter((c) => c.op === "criar");
    const b = montar({ area, roteiro });
    await b.app.iniciar();
    checar("reaberto: oferece continuar", b.visivel("Continuar de onde parou") && b.visivel("Descartar"));
    b.clicar("Continuar de onde parou");
    await ate(() => !!b.raiz.querySelector(".pl-resultado"));
    checar(
      "continuar recarrega o formulário do tipo",
      b.chamadas.some((c) => c.op === "formTipo" && (c.args as { idTipo: string }).idTipo === "10"),
    );
    checar(
      "continuar: formTipo antes do primeiro criar",
      b.eventos.indexOf("formTipo") >= 0 && b.eventos.indexOf("formTipo") < b.eventos.indexOf("criar"),
      b.eventos,
    );
    checar("continuar não recria Alfa nem Beta", b.quantas("Alfa") === 0 && b.quantas("Beta") === 0);
    checar("continuar refaz Gamma e cria Delta, uma vez cada", b.quantas("Gamma") === 1 && b.quantas("Delta") === 1);
    // Sucessos por linha, somando os dois apps: exatamente 1 cada.
    const okPorLinha = (esp: string) =>
      (esp === "Gamma" ? 0 : antes.filter((c) => (c.args as { linha: LinhaLote }).linha.especificacao === esp).length) + b.quantas(esp);
    checar(
      "cada linha com exatamente 1 criar bem-sucedido",
      ["Alfa", "Beta", "Gamma", "Delta"].every((e) => okPorLinha(e) === 1),
      ["Alfa", "Beta", "Gamma", "Delta"].map(okPorLinha),
    );
    checar(
      "resultado: 4 linhas, todas criadas",
      b.linhasResultado().length === 4 && b.linhasResultado().every((l) => l[0] === "Criado"),
      b.linhasResultado(),
    );
    checar("concluído sem falhas: registro descartado", (await b.lote()) === undefined);
    b.app.destruir();
  }

  secao("App: prazo esgotado no criar = incerto, nunca repetido");
  {
    const roteiro: Roteiro = (esp) =>
      esp === "Beta" ? new ErroRpc("PRAZO", "A aba do SEI não respondeu a tempo (criar).") : criado(esp, ++numeroSeq);
    const m = montar({ roteiro });
    await m.app.iniciar();
    await m.configurar("Alfa\nBeta\nGamma");
    m.clicar("Ver prévia");
    m.clicar("Iniciar");
    await ate(() => m.visivel("Continuar"));
    checar(
      "criar com prazo de 60 s",
      m.chamadas.filter((c) => c.op === "criar").every((c) => c.prazo === 60_000),
      m.chamadas.map((c) => c.prazo),
    );
    checar("prazo esgotado pausa o lote", m.quantas("Gamma") === 0 && m.visivel("Continuar"));
    const g = await m.lote();
    const beta = g?.itens[1];
    checar("Beta gravada como ok com número incerto", beta?.situacao === "ok" && beta.criado?.numero === NUMERO_INCERTO, beta);
    m.clicar("Continuar");
    await ate(() => !!m.raiz.querySelector(".pl-resultado"));
    checar("Beta chamada exatamente 1 vez", m.quantas("Beta") === 1);
    checar("Gamma criada depois de continuar", m.quantas("Gamma") === 1);
    const linhaBeta = m.linhasResultado()[1] ?? [];
    checar(
      "tabela: Beta incerta com a dica",
      linhaBeta.join(" ").includes("Incerto") && linhaBeta.join(" ").includes("Controle de Processos"),
      linhaBeta,
    );
    checar("sem falhas: Tentar de novo oculto", !m.visivel("Tentar de novo as falhas"));
    checar("incerto conta como feito: concluído, registro descartado", (await m.lote()) === undefined);
    m.app.destruir();
  }

  secao("App: Tentar de novo só refaz as falhas (erro), nunca incerto nem ok");
  {
    const roteiro: Roteiro = (esp, vezes) => {
      if (esp === "Alfa" && vezes === 1) return { situacao: "erro", erro: "validação" };
      if (esp === "Beta")
        return {
          situacao: "ok",
          incerto: true,
          criado: { numero: NUMERO_INCERTO, idProcedimento: "", url: "" },
          aviso: "O processo pode ter sido criado",
        };
      return criado(esp, ++numeroSeq);
    };
    const m = montar({ roteiro });
    await m.app.iniciar();
    await m.configurar("Alfa\nBeta\nGamma");
    m.clicar("Ver prévia");
    m.clicar("Iniciar");
    await ate(() => m.visivel("Continuar"));
    checar("incerto da aba pausa o lote", m.quantas("Gamma") === 0 && m.textoVisivel("O SEI não confirmou"));
    m.clicar("Continuar");
    await ate(() => !!m.raiz.querySelector(".pl-resultado"));
    checar("falha: Tentar de novo visível", m.visivel("Tentar de novo as falhas"));
    checar("falha: registro mantido", (await m.lote()) !== undefined);
    m.clicar("Tentar de novo as falhas");
    await ate(() => m.quantas("Alfa") === 2 && !!m.raiz.querySelector(".pl-resultado"));
    await tique(10);
    checar("refez só Alfa", m.quantas("Alfa") === 2 && m.quantas("Beta") === 1 && m.quantas("Gamma") === 1);
    checar("Alfa agora criada", m.linhasResultado()[0]?.[0] === "Criado", m.linhasResultado());
    m.app.destruir();
  }

  secao("App: restrito exige hipótese carregada e escolhida (antes da prévia)");
  {
    const m = montar();
    await m.app.iniciar();
    await m.configurar("Alfa\nBeta", { restrito: true });
    m.clicar("Ver prévia");
    checar("sem hipótese: não abre a prévia", !m.raiz.querySelector(".pl-previa"));
    checar("sem hipótese: erro no formulário", m.textoVisivel("hipótese legal"));
    escolherCombo(m.raiz, "Hipótese legal", "7");
    m.clicar("Ver prévia");
    checar("com hipótese: abre a prévia", !!m.raiz.querySelector(".pl-previa"));
    checar("prévia mostra a hipótese", m.textoVisivel("Controle Interno"));
    m.clicar("Iniciar");
    await ate(() => !!m.raiz.querySelector(".pl-resultado"));
    const pedido = m.criarDe("Alfa")[0]?.args as { nivelAcesso: string; hipoteseLegal: string };
    checar("criar leva restrito e a hipótese", pedido?.nivelAcesso === "1" && pedido.hipoteseLegal === "7", pedido);
    m.app.destruir();

    const v = montar({ hipoteses: [] });
    await v.app.iniciar();
    await v.configurar("Alfa", { restrito: true });
    v.clicar("Ver prévia");
    checar("lista de hipóteses vazia: não abre a prévia", !v.raiz.querySelector(".pl-previa"));
    checar("lista vazia: diz que não carregou", v.textoVisivel("Não foi possível carregar as hipóteses legais"));
    v.app.destruir();

    // Lote público, mas uma linha restrita pela coluna de nível.
    const c = montar();
    await c.app.iniciar();
    await c.configurar("Especificação\tInteressado\tObservação\tNível\nAlfa\t\t\tRestrito\nBeta\t\t\tPúblico");
    c.clicar("Ver prévia");
    checar("linha restrita sem hipótese: bloqueia", !c.raiz.querySelector(".pl-previa") && c.textoVisivel("hipótese legal"));
    c.app.destruir();
  }

  secao("App: sessão expirada pausa o lote");
  {
    const roteiro: Roteiro = (esp) =>
      esp === "Beta" ? { situacao: "erro", erro: "Sessão expirada", parar: true } : criado(esp, ++numeroSeq);
    const m = montar({ roteiro });
    await m.app.iniciar();
    await m.configurar("Alfa\nBeta\nGamma");
    m.clicar("Ver prévia");
    m.clicar("Iniciar");
    await ate(() => m.textoVisivel("A sessão do SEI expirou"));
    await tique(10);
    checar("mensagem da sessão", m.textoVisivel("A sessão do SEI expirou. Entre de novo e tente outra vez."));
    checar("Gamma não saiu", m.quantas("Gamma") === 0);
    checar("pausado: Continuar visível", m.visivel("Continuar"));
    m.app.destruir();
  }

  secao("App: minimizar mostra a pastilha com feitos/total");
  {
    const s = segurar<ResultadoCriar>();
    const roteiro: Roteiro = (esp) => (esp === "Beta" ? s.p : criado(esp, ++numeroSeq));
    const m = montar({ roteiro });
    await m.app.iniciar();
    await m.configurar("Alfa\nBeta\nGamma");
    m.clicar("Ver prévia");
    m.clicar("Iniciar");
    await ate(() => m.quantas("Beta") === 1);
    m.clicar("Minimizar");
    await tique();
    checar("pediu à aba para minimizar", m.t.minimizou.join() === "true");
    const pastilha = m.raiz.querySelector(".pl-pastilha");
    checar("pastilha visível", !!pastilha && !pastilha.closest("[hidden]"));
    checar("pastilha: 1/3", (pastilha?.textContent ?? "").includes("1/3"), pastilha?.textContent);
    checar("minimizado: tela da execução oculta", !m.visivel("Cancelar"));
    s.soltar(criado("Beta", ++numeroSeq));
    await ate(() => (m.raiz.querySelector(".pl-pastilha")?.textContent ?? "").includes("3/3"));
    checar("pastilha acompanha: 3/3", (m.raiz.querySelector(".pl-pastilha")?.textContent ?? "").includes("3/3"));
    m.clicar("Restaurar");
    await tique();
    checar("restaurar pede tela cheia", m.t.minimizou.join() === "true,false");
    checar(
      "restaurado: resultado visível",
      !!m.raiz.querySelector(".pl-resultado") && !m.raiz.querySelector(".pl-resultado")?.closest("[hidden]"),
    );
    m.app.destruir();
  }

  secao("App: fechar durante a execução pausa e mantém o registro");
  {
    const s = segurar<ResultadoCriar>();
    const roteiro: Roteiro = (esp) => (esp === "Alfa" ? s.p : criado(esp, ++numeroSeq));
    const m = montar({ roteiro });
    await m.app.iniciar();
    await m.configurar("Alfa\nBeta");
    m.clicar("Ver prévia");
    m.clicar("Iniciar");
    await ate(() => m.quantas("Alfa") === 1);
    const emVoo = await m.lote();
    checar("antes da resposta: linha em voo já gravada como incerta", emVoo?.itens[0]?.criado?.numero === NUMERO_INCERTO, emVoo?.itens[0]);
    m.app.destruir();
    s.soltar(criado("Alfa", ++numeroSeq));
    await tique(20);
    const g = await m.lote();
    checar("a resposta em voo ainda é gravada", g?.itens[0]?.situacao === "ok" && g.itens[0].criado?.numero !== NUMERO_INCERTO, g?.itens);
    checar("Beta não saiu depois de fechar", m.quantas("Beta") === 0 && g?.itens[1]?.situacao === "pendente");
  }

  secao("App: resultado (CSV, copiar, links permanentes)");
  {
    const roteiro: Roteiro = (esp) =>
      esp === "Beta"
        ? { situacao: "ok", incerto: true, criado: { numero: NUMERO_INCERTO, idProcedimento: "", url: "" }, aviso: "incerto" }
        : criado(esp, ++numeroSeq);
    const m = montar({ roteiro });
    await m.app.iniciar();
    await m.configurar("Alfa\nBeta\nGamma");
    m.clicar("Ver prévia");
    m.clicar("Iniciar");
    await ate(() => m.visivel("Continuar"));
    m.clicar("Continuar");
    await ate(() => !!m.raiz.querySelector(".pl-resultado"));
    const cab = [...m.raiz.querySelectorAll(".pl-resultado table thead th")].map((th) => (th.textContent ?? "").trim());
    checar(
      "colunas",
      ["Situação", "Nº", "Número SEI", "Especificação", "Link"].every((c) => cab.includes(c)),
      cab,
    );
    checar("links clicáveis só dos criados", m.raiz.querySelectorAll(".pl-resultado table tbody a").length === 2);
    m.clicar("Baixar CSV");
    checar(
      "CSV processos-em-lote.csv",
      m.baixados[0]?.nome === "processos-em-lote.csv" && (m.baixados[0]?.conteudo ?? "").includes("Alfa"),
    );
    m.clicar("Copiar com links");
    await tique();
    checar("copiou o resultado", (m.copiados[0] ?? "").includes("Gamma"));
    m.clicar("Gerar links permanentes destes processos");
    await ate(() => m.t.fechou === 1);
    const numeros = m.t.entradaLink[0]?.split("\n") ?? [];
    checar(
      "entrada do Link Permanente: só os números criados, um por linha",
      numeros.length === 2 && !numeros.includes(NUMERO_INCERTO),
      numeros,
    );
    const i1 = m.eventos.indexOf("gravarEntradaLink");
    const i2 = m.eventos.indexOf("abrirLinkPermanente");
    const i3 = m.eventos.indexOf("fechar-app");
    checar("grava a entrada, abre o Link Permanente e fecha, nessa ordem", i1 >= 0 && i1 < i2 && i2 < i3, m.eventos);
    checar("chave da entrada igual à do Link Permanente", CHAVE_ENTRADA_LINK === "link-permanente/entrada");
    m.app.destruir();
  }

  secao("App: configuração (contador, quantidade, pausa, descartar)");
  {
    const m = montar();
    await m.app.iniciar();
    checar("aviso de cautela", m.textoVisivel("Use com cautela."));
    checar("Ver prévia desligado sem tipo", botao(m.raiz, "Ver prévia")?.disabled === true);
    await m.configurar("");
    m.preencher("pl-quantidade", "3");
    checar("contador da quantidade", m.textoVisivel("serão abertos 3 processos sem especificação"));
    m.digitar("Alfa\nBeta");
    checar("contador das linhas", m.textoVisivel("2 linhas preenchidas — serão abertos 2 processos."));
    checar("com linhas, quantidade desligada", m.campo("pl-quantidade").disabled);
    m.digitar("");
    m.preencher("pl-quantidade", "2001");
    m.clicar("Ver prévia");
    checar("acima do teto: erro", m.textoVisivel("2000") && !m.raiz.querySelector(".pl-previa"));
    m.preencher("pl-quantidade", "2");
    m.preencher("pl-pausa", "50");
    m.clicar("Ver prévia");
    checar("pausa limitada a 200 ms na prévia", m.textoVisivel("200 ms"));
    checar("modo quantidade na prévia", m.textoVisivel("2 processos sem especificação"));
    m.clicar("Voltar");
    checar("voltar mantém a quantidade", m.campo("pl-quantidade").value === "2");
    m.app.destruir();

    // Descartar um lote incompleto.
    const area = areaMemoria();
    const repo = new RepositorioLote(area, ESCOPO);
    await repo.gravar({
      id: "x",
      host: "sei.x.gov.br",
      login: "ana",
      iniciadoEm: 1,
      parametros: { idTipo: "10", nomeTipo: "Contrato", nivelAcesso: "0", hipoteseLegal: "", nomeHipotese: "", pausa: 500 },
      linhas: [{ especificacao: "A" }, { especificacao: "B" }],
      itens: [{ situacao: "ok", criado: { numero: "1", idProcedimento: "1", url: "" } }, { situacao: "pendente" }],
    });
    const d = montar({ area });
    await d.app.iniciar();
    checar("lote incompleto: oferece continuar", d.visivel("Continuar de onde parou"));
    checar("resumo do lote: 1 de 2", d.textoVisivel("1 de 2"));
    d.clicar("Descartar");
    await ate(() => !!combo(d.raiz, "Tipo de processo"));
    checar("descartado: registro removido", (await d.lote()) === undefined);
    checar("descartado: volta à configuração", !!combo(d.raiz, "Tipo de processo"));
    checar("nenhum criar ao descartar", d.quantas("A") + d.quantas("B") === 0);
    d.app.destruir();
  }

  secao("App: prévia com caracteres trocados e corte");
  {
    const m = montar();
    await m.app.iniciar();
    const longa = "x".repeat(120);
    await m.configurar(`Contrato — aditivo\n${longa}`);
    m.clicar("Ver prévia");
    checar("caracteres trocados", m.textoVisivel("caracteres trocados"));
    const marcas = [...m.raiz.querySelectorAll(".pl-previa mark")].map((x) => x.textContent);
    checar("trecho trocado em destaque", marcas.includes("-"), marcas);
    checar("cortada em 100 caracteres", m.textoVisivel("cortada em 100 caracteres"));
    m.app.destruir();
  }

  secao("App: trechos enviados = texto da prévia; modo quantidade cria sem especificação");
  {
    const casos = ["  \u00A0Contrato \u201Cx\u201D \u2014 y\u2026  ", `${"a".repeat(98)}\u2014\u2014\u2014`, "\u00A0\u00A0", "Ação 1"];
    for (const c of casos) {
      const junto = partesEnviadas(c)
        .map((p) => p.texto)
        .join("");
      const esperado = montarPrevia([{ especificacao: c }])[0]?.enviada;
      checar(`trechos juntos = enviada (${JSON.stringify(c).slice(0, 24)})`, junto === esperado, { junto, esperado });
    }
    const m = montar();
    await m.app.iniciar();
    await m.configurar("");
    m.preencher("pl-quantidade", "2");
    m.clicar("Ver prévia");
    m.clicar("Iniciar");
    await ate(() => !!m.raiz.querySelector(".pl-resultado"));
    checar(
      "quantidade 2: dois criar com especificação vazia",
      m.quantas("") === 2,
      m.chamadas.map((c) => c.op),
    );
    m.app.destruir();
  }
}
