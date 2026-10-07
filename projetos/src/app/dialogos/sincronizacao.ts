/**
 * Diálogo "Sincronização" (spec 3.2, desenho do diálogo dos Favoritos): as
 * formas de não perder os projetos numa tela só — o Texto Padrão da unidade,
 * o Texto Padrão pessoal, o arquivo numa pasta da nuvem (com Exportar e
 * Importar, o caminho de quem não tem o arquivo ligado) e as cópias diárias
 * deste navegador. Poucos botões: "Sincronizar agora" (os dois textos) fica
 * no da unidade; o pessoal só liga, desliga e apaga; o da unidade não tem
 * "apagar" (é de todos).
 *
 * Restaurar uma cópia RECUPERA (sincronia/arquivo.ts): só volta o que foi
 * excluído ou sumiu depois dela, e o que existe hoje não muda. O aviso diz
 * quantos itens voltaram de fato.
 *
 * Tudo o que vem de fora entra como texto (`h()`): a sigla, o nome do arquivo,
 * o motivo do texto inválido e as mensagens de erro (inclusive a da memória do
 * sigilo ilegível, que para o arquivo e a cópia do dia). O erro de uma ação
 * aparece na própria seção, numa linha lida pelo leitor de tela.
 */

import { formatarData, hojeISO } from "@comum/datas/dias";
import type { StatusArquivo } from "@comum/sincronia/arquivo";
import { h } from "@comum/ui/dom";
import type { CopiaProjetos } from "../../sincronia/arquivo";
import type { TextoSubstituido } from "../../sincronia/textoPadrao";
import { linhaDoTexto, type SituacaoSincronia, type SituacaoTexto } from "../colaboracao/estado";
import { mensagemDoErro } from "../erros";
import { plural } from "../formato";

export interface DepsSincronizacao {
  sigla: string;
  agora(): number;
  /** Relê a situação dos dois textos (o content script grava o status). */
  situacao(): Promise<SituacaoSincronia>;
  /** "Sincronizar agora": os dois textos (o pessoal só se ligado), pela aba do SEI. */
  sincronizar(): Promise<void>;
  pessoal: {
    /** Pergunta o consentimento; true = ligado. */
    ligar(): Promise<boolean>;
    desligar(): Promise<void>;
    /** Desliga e exclui o texto pessoal do SEI; true = havia um texto e ele foi excluído. */
    apagar(): Promise<boolean>;
  };
  arquivo: {
    status(): Promise<StatusArquivo | null>;
    configurado(): Promise<boolean>;
    escolher(modo: "novo" | "existente"): Promise<void>;
    reconectar(): Promise<void>;
    agora(): Promise<void>;
    esquecer(): Promise<void>;
  } | null;
  /** A frase devolvida (se houver) aparece na seção do arquivo. */
  exportar(): Promise<string | undefined>;
  importar(): Promise<string | undefined>;
  copias: {
    listar(): Promise<CopiaProjetos[]>;
    /** Quantos itens voltaram de fato (`restaurarCopia`). */
    restaurar(c: CopiaProjetos): Promise<number>;
    /** A cópia de hoje que não pôde ser feita (a memória do sigilo ilegível): a mensagem do erro. */
    falhaDoDia?(): string | null;
  } | null;
  baixar(nome: string, conteudo: string, tipo: string): void;
  confirmar(texto: string, rotuloOk?: string): Promise<boolean>;
}

type Avisar = (t: string) => void;

/** A linha do resultado ou do erro de uma seção (vazia some; o leitor de tela lê quando muda). */
function linhaDeAviso(): { el: HTMLElement; avisar: Avisar } {
  const el = h("p", { class: "prj-dica prj-sync-aviso", role: "status" });
  return {
    el,
    avisar: (t) => {
      el.textContent = t;
    },
  };
}

/**
 * Botão de ação: limpa o aviso da seção, ignora outro clique enquanto a ação corre (com `aria-disabled`, que não
 * tira o foco do teclado como o `disabled`) e mostra o erro como texto.
 */
function botao(rotulo: string, fazer: () => Promise<unknown>, avisar: Avisar, classe = "spro-botao", aria?: string): HTMLButtonElement {
  const b = h("button", { type: "button", class: classe, "aria-label": aria }, rotulo);
  b.addEventListener("click", async () => {
    if (b.getAttribute("aria-disabled") === "true") return;
    b.setAttribute("aria-disabled", "true");
    avisar("");
    try {
      await fazer();
    } catch (e) {
      avisar(mensagemDoErro(e));
    } finally {
      b.removeAttribute("aria-disabled");
    }
  });
  return b;
}

/** Troca os botões de uma linha sem largar o foco do teclado (o botão clicado some ao repintar). */
function repor(alvo: HTMLElement, ...filhos: Node[]): void {
  const tinhaFoco = alvo.contains(document.activeElement);
  alvo.replaceChildren(...filhos);
  if (tinhaFoco) alvo.querySelector<HTMLElement>("button")?.focus();
}

const dica = (t: string, extra?: string) => h("p", { class: extra ? `prj-dica ${extra}` : "prj-dica" }, t);
const acoes = (...filhos: Node[]) => h("div", { class: "prj-sync-acoes" }, ...filhos);

function substituido(s: TextoSubstituido | undefined, baixar: DepsSincronizacao["baixar"]): HTMLElement | null {
  if (!s) return null;
  const dia = hojeISO(new Date(s.quando));
  return h(
    "p",
    { class: "prj-dica prj-sync-substituido" },
    `Em ${formatarData(dia)} o texto no SEI estava inválido (${s.motivo}) e foi regravado.${s.cortado ? " Ficou guardado só o começo dele, que era grande demais." : ""} `,
    h(
      "button",
      {
        type: "button",
        class: "spro-botao fantasma pequeno",
        onclick: () => baixar(`projetos-texto-antigo-${dia}.html`, s.html, "text/html;charset=utf-8"),
      },
      "Baixar o texto antigo",
    ),
  );
}

export async function montarSincronizacao(d: DepsSincronizacao): Promise<HTMLElement> {
  const avisoUn = linhaDeAviso();
  const avisoEu = linhaDeAviso();
  const linhaUn = h("p", { class: "prj-dica prj-sync-situacao", "data-texto": "unidade" });
  const linhaEu = h("p", { class: "prj-dica prj-sync-situacao", "data-texto": "eu" });
  const extrasUn = h("div", { class: "prj-sync-extra" });
  const extrasEu = h("div", { class: "prj-sync-extra" });
  const acoesEu = acoes();
  let situ = await d.situacao();

  const pintarTexto = (t: SituacaoTexto, linha: HTMLElement, extras: HTMLElement) => {
    linha.textContent = linhaDoTexto(t, d.agora());
    extras.replaceChildren(...[substituido(t.substituido, d.baixar)].filter((x): x is HTMLElement => !!x));
  };
  const apagar = async (pergunta: string) => {
    if (!(await d.confirmar(pergunta, "Apagar"))) return;
    const excluiu = await d.pessoal.apagar();
    await pintar();
    avisoEu.avisar(excluiu ? `O texto “${situ.eu.nome}” foi apagado do SEI.` : `Não havia o texto “${situ.eu.nome}” no SEI.`);
  };
  const pintar = async (reler = true) => {
    if (reler) situ = await d.situacao();
    pintarTexto(situ.unidade, linhaUn, extrasUn);
    pintarTexto(situ.eu, linhaEu, extrasEu);
    repor(
      acoesEu,
      ...(situ.eu.consentimento === "ligado"
        ? [
            botao(
              "Desligar",
              async () => {
                await d.pessoal.desligar();
                await pintar();
              },
              avisoEu.avisar,
            ),
            botao(
              "Desligar e apagar do SEI",
              () => apagar(`Apagar do SEI o texto “${situ.eu.nome}” e desligar? Os projetos continuam neste navegador.`),
              avisoEu.avisar,
              "spro-botao perigo",
            ),
          ]
        : [
            botao(
              "Ligar…",
              async () => {
                if (await d.pessoal.ligar()) await pintar();
              },
              avisoEu.avisar,
              "spro-botao primario",
            ),
            // Desligado não quer dizer apagado: um texto que ficou no SEI ainda pode ser excluído daqui.
            botao(
              "Apagar o texto do SEI",
              () => apagar(`Apagar do SEI o texto “${situ.eu.nome}”, se ele existir? Os projetos continuam neste navegador.`),
              avisoEu.avisar,
              "spro-botao perigo",
            ),
          ]),
    );
  };
  await pintar(false);

  const secoes: HTMLElement[] = [
    h(
      "section",
      { class: "prj-sync-secao", "data-secao": "unidade" },
      h("h3", {}, `Texto Padrão da ${d.sigla}`),
      dica(
        `Os projetos de “Toda a unidade” ficam no texto “${situ.unidade.nome}”, que todos da ${d.sigla} com SEI Pro leem e gravam. O número de processo sigiloso não vai.`,
      ),
      linhaUn,
      extrasUn,
      acoes(
        botao(
          "Sincronizar agora",
          async () => {
            await d.sincronizar();
            await pintar();
          },
          avisoUn.avisar,
        ),
      ),
      avisoUn.el,
    ),
    h(
      "section",
      { class: "prj-sync-secao", "data-secao": "eu" },
      h("h3", {}, "Texto Padrão pessoal"),
      dica(`Seus projetos de “Só eu” podem ficar no texto “${situ.eu.nome}”, para você vê-los em outro computador.`),
      linhaEu,
      extrasEu,
      acoesEu,
      avisoEu.el,
    ),
  ];

  const avisoArq = linhaDeAviso();
  const arq = h("section", { class: "prj-sync-secao", "data-secao": "arquivo" }, h("h3", {}, "Arquivo numa pasta da nuvem"));
  // Exportar e importar à mão: só quando não há arquivo ligado (com ele, seria um botão a mais para a mesma coisa).
  const manual = () =>
    acoes(
      botao(
        "Exportar tudo",
        async () => {
          const r = await d.exportar();
          if (r) avisoArq.avisar(r);
        },
        avisoArq.avisar,
      ),
      botao(
        "Importar de um arquivo…",
        async () => {
          const r = await d.importar();
          if (r) avisoArq.avisar(r);
        },
        avisoArq.avisar,
      ),
    );
  if (d.arquivo) {
    const a = d.arquivo;
    const corpo = h("div", { class: "prj-sync-corpo" });
    const pintarArquivo = async () => {
      let st: StatusArquivo | null;
      let ok: boolean;
      try {
        [st, ok] = await Promise.all([a.status(), a.configurado()]);
      } catch (e) {
        repor(corpo, dica(`Não foi possível ler o estado do arquivo: ${mensagemDoErro(e)}`, "prj-sync-erro"));
        return;
      }
      const linha = !ok
        ? dica(
            "Escolha um arquivo numa pasta que já sincroniza com a nuvem (OneDrive, Google Drive, Dropbox ou rede). Ele leva todos os seus projetos, de todas as unidades.",
          )
        : st?.estado === "ok"
          ? dica(
              `Ligado a “${st.nome ?? "arquivo"}”. Última sincronia: ${new Date(st.quando).toLocaleString("pt-BR")}.${st.mensagem ? ` ${st.mensagem}` : ""}`,
            )
          : st?.estado === "permissao"
            ? dica(`O navegador pede de novo a permissão de “${st.nome ?? "arquivo"}”.`)
            : dica(`Erro no arquivo: ${st?.mensagem ?? "tente de novo"}`, "prj-sync-erro");
      const acao = (f: () => Promise<void>) => async () => {
        try {
          await f();
        } finally {
          await pintarArquivo();
        }
      };
      repor(
        corpo,
        linha,
        acoes(
          ...(ok
            ? [
                st?.estado === "permissao"
                  ? botao("Reconectar arquivo", acao(a.reconectar), avisoArq.avisar, "spro-botao primario")
                  : botao("Sincronizar agora", acao(a.agora), avisoArq.avisar, "spro-botao", "Sincronizar agora o arquivo"),
                botao(
                  "Trocar arquivo…",
                  acao(() => a.escolher("existente")),
                  avisoArq.avisar,
                ),
                botao("Parar de usar o arquivo", acao(a.esquecer), avisoArq.avisar),
              ]
            : [
                botao(
                  "Criar arquivo…",
                  acao(() => a.escolher("novo")),
                  avisoArq.avisar,
                  "spro-botao primario",
                ),
                botao(
                  "Usar um arquivo existente…",
                  acao(() => a.escolher("existente")),
                  avisoArq.avisar,
                ),
              ]),
        ),
        ...(ok ? [] : [dica("Ou exporte e importe à mão (importar sempre junta, nunca apaga):"), manual()]),
      );
    };
    await pintarArquivo();
    arq.append(corpo);
  } else {
    arq.append(
      dica(
        "Aqui não dá para manter um arquivo ligado (o navegador não permite). Exporte e importe à mão; importar sempre junta, nunca apaga.",
      ),
      manual(),
    );
  }
  arq.append(avisoArq.el);
  secoes.push(arq);

  if (d.copias) {
    const c = d.copias;
    const avisoCp = linhaDeAviso();
    let lista: CopiaProjetos[] | null = null;
    let erroLista = "";
    try {
      lista = await c.listar();
    } catch (e) {
      erroLista = mensagemDoErro(e);
    }
    const falhaDoDia = c.falhaDoDia?.() ?? null;
    const item = (x: CopiaProjetos) => {
      const dia = formatarData(x.dia);
      return h(
        "li",
        {},
        h("span", {}, `${dia} — ${plural(x.quantidade, "projeto", "projetos")}`),
        botao(
          "Restaurar",
          async () => {
            const pergunta = `Restaurar a cópia de ${dia}? Traz de volta o que foi excluído ou sumiu desde então. O que existe hoje não muda.`;
            if (!(await d.confirmar(pergunta, "Restaurar"))) return;
            const n = await c.restaurar(x);
            avisoCp.avisar(
              n > 0 ? `${plural(n, "item voltou", "itens voltaram")}.` : "Nada para recuperar: tudo o que estava na cópia ainda existe.",
            );
          },
          avisoCp.avisar,
          "spro-botao",
          `Restaurar a cópia de ${dia}`,
        ),
      );
    };
    secoes.push(
      h(
        "section",
        { class: "prj-sync-secao", "data-secao": "copias" },
        h("h3", {}, "Cópias deste navegador"),
        dica(
          "Uma por dia, as 14 mais recentes. Restaurar traz de volta o que foi excluído ou sumiu desde a cópia; o que existe hoje não muda.",
        ),
        falhaDoDia ? dica(`A cópia de hoje não foi feita. ${falhaDoDia}`, "prj-sync-erro") : null,
        lista === null
          ? dica(`Não foi possível ler as cópias: ${erroLista}`, "prj-sync-erro")
          : lista.length
            ? h("ul", { class: "prj-copias" }, ...lista.map(item))
            : dica("Ainda não há cópias."),
        avisoCp.el,
      ),
    );
  }

  return h("div", { class: "prj-form prj-sync" }, ...secoes);
}
