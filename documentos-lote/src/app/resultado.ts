/**
 * Tela de resultado do lote (spec §6.3). Não é uma etapa: o app a mostra ao concluir uma rodada e ao abrir um lote
 * sem linha pendente. A tabela tem TODAS as linhas da planilha (as colunas dela, na ordem do arquivo) mais o que foi
 * gerado: `processo_destino`, `nome_documento_gerado`, `numero_sei_gerado`, `link_documento_gerado` (os nomes do
 * legado no CSV exportado) e `observacao` (o erro, o motivo de ficar de fora ou a dica do incerto). A situação vai em
 * TEXTO (Criada / Erro / Incerto (confira no SEI) / Fora / Pendente), não só como cor.
 *
 * Ações: Baixar CSV, Copiar (com links), Repetir só as que falharam (as `erro` NÃO incertas: Ruling 16), Gravar as
 * que ficaram de fora (destino coluna, as `fora` por verificação), Gerar links permanentes destes documentos (só as
 * criadas) e Concluir (apaga o lote). As incertas ficam à parte, cada uma com "Repetir mesmo assim" (o app pede
 * confirmação explícita antes). Sem botão Cancelar: o X e o Esc fecham.
 *
 * Os números do resumo são do LOTE INTEIRO, acumulados entre as rodadas (os mesmos da execução).
 */

import { h, icone, type NomeIcone } from "@comum/ui/dom";
import { type ColunaResultado, type LinhaResultado, montarTabelaResultado } from "@comum/ui/tabelaResultado";
import { nomeNaArvore } from "../modelo/nomes";
import type { ItemLote, LoteDocumentos } from "../repositorio";

/** As colunas que o resultado acrescenta às da planilha (nomes do CSV do legado). */
export const COLUNAS_GERADAS = ["processo_destino", "nome_documento_gerado", "numero_sei_gerado", "link_documento_gerado"] as const;
const COLUNA_OBSERVACAO = "observacao";

export const ROTULO_INCERTO = "Incerto (confira no SEI)";
export const DICA_INCERTO = "O documento pode ter sido criado: confira no SEI antes de repetir esta linha.";

const ehIncerto = (i: ItemLote | undefined): boolean => i?.situacao === "erro" && i.incerto === true;

/** As colunas da planilha, na ordem em que aparecem nas linhas (a primeira linha manda; as demais acrescentam). */
export function colunasDaPlanilha(l: LoteDocumentos): string[] {
  const vistas = new Set<string>();
  for (const linha of l.linhas) for (const c of Object.keys(linha.dados)) vistas.add(c);
  return [...vistas];
}

/** Chave de uma coluna da planilha na tabela (prefixo: uma coluna "processo_destino" na planilha não colide). */
const chavePlanilha = (c: string) => `p:${c}`;

/** Títulos que o resultado já usa: a coluna da planilha com um deles ganha " (planilha)" (CSV reimportado). */
const RESERVADOS = new Set<string>(["Situação", ...COLUNAS_GERADAS, COLUNA_OBSERVACAO]);

export function colunasDoResultado(l: LoteDocumentos): ColunaResultado[] {
  return [
    ...colunasDaPlanilha(l).map((c) => ({ chave: chavePlanilha(c), titulo: RESERVADOS.has(c) ? `${c} (planilha)` : c })),
    { chave: "processo_destino", titulo: "processo_destino" },
    { chave: "nome_documento_gerado", titulo: "nome_documento_gerado" },
    { chave: "numero_sei_gerado", titulo: "numero_sei_gerado" },
    { chave: "link_documento_gerado", titulo: "link_documento_gerado", comoLink: true },
    { chave: COLUNA_OBSERVACAO, titulo: COLUNA_OBSERVACAO },
  ];
}

/** O processo em que o documento da linha vai (ou foi) gravado. */
function processoDestino(l: LoteDocumentos, k: number): string {
  const item = l.itens[k];
  const linha = l.linhas[k];
  switch (l.config.destino.tipo) {
    case "tela":
      return l.protocoloTela ?? "";
    case "coluna":
      return linha?.destino ?? "";
    default:
      return item?.processo ?? "";
  }
}

function rotuloDe(i: ItemLote | undefined): { situacao: LinhaResultado["situacao"]; rotulo: string } {
  switch (i?.situacao) {
    case "criada":
      return { situacao: "ok", rotulo: "Criada" };
    case "erro":
      return i.incerto ? { situacao: "erro", rotulo: ROTULO_INCERTO } : { situacao: "erro", rotulo: "Erro" };
    case "fora":
      return { situacao: "pulado", rotulo: "Fora" };
    default:
      return { situacao: "pendente", rotulo: "Pendente" };
  }
}

function observacao(i: ItemLote | undefined): string {
  if (!i) return "";
  if (ehIncerto(i)) return [i.erro, DICA_INCERTO].filter(Boolean).join(" ");
  if (i.situacao === "erro" || i.situacao === "fora") return i.erro ?? "";
  if (i.situacao === "pendente") return "Ainda não enviada.";
  return "";
}

export function linhasDoResultado(l: LoteDocumentos): LinhaResultado[] {
  const planilha = colunasDaPlanilha(l);
  const tipo = l.config.modelo.tipoNome ?? "";
  return l.linhas.map((linha, k) => {
    const i = l.itens[k];
    const { situacao, rotulo } = rotuloDe(i);
    const campos: Record<string, string> = {};
    for (const c of planilha) campos[chavePlanilha(c)] = linha.dados[c] ?? "";
    campos.processo_destino = processoDestino(l, k);
    // Como o legado: o tipo do documento e o nome na árvore. Só para o documento que existe (ou pode existir).
    const temDocumento = i?.situacao === "criada" || (ehIncerto(i) && !!i?.idDocumento);
    campos.nome_documento_gerado = temDocumento ? `${tipo} ${nomeNaArvore(linha.dados[l.config.colunaNome] ?? "")}`.trim() : "";
    const numero = i?.situacao === "criada" ? (i.criado?.numero ?? "") : ehIncerto(i) ? (i?.numero ?? "") : "";
    const link = i?.situacao === "criada" ? (i.criado?.link ?? "") : ehIncerto(i) ? (i?.link ?? "") : "";
    campos.numero_sei_gerado = numero;
    campos.link_documento_gerado = link;
    campos[COLUNA_OBSERVACAO] = observacao(i);
    const r: LinhaResultado = { situacao, rotulo, campos };
    if (link) r.link = link;
    return r;
  });
}

export interface ContagemLote {
  total: number;
  criadas: number;
  /** Erros que podem ser repetidos (não incertos). */
  erros: number;
  incertas: number;
  fora: number;
  pendentes: number;
}

/** A contagem do lote; `ignorar` é a linha com pedido em voo (o item dela é o incerto provisório: não conta). */
export function contagemDoLote(l: LoteDocumentos, ignorar: number | null = null): ContagemLote {
  const c: ContagemLote = { total: l.itens.length, criadas: 0, erros: 0, incertas: 0, fora: 0, pendentes: 0 };
  for (const [k, i] of l.itens.entries()) {
    if (k === ignorar) continue;
    if (i.situacao === "criada") c.criadas += 1;
    else if (ehIncerto(i)) c.incertas += 1;
    else if (i.situacao === "erro") c.erros += 1;
    else if (i.situacao === "fora") c.fora += 1;
    else c.pendentes += 1;
  }
  return c;
}

/** Índices das linhas que "Repetir só as que falharam" refaz: `erro` NÃO incerto (Ruling 16). */
export function repetiveis(l: LoteDocumentos): number[] {
  return l.itens.flatMap((i, k) => (i.situacao === "erro" && !i.incerto ? [k] : []));
}

/** Índices das linhas incertas (o documento pode existir): só com "Repetir mesmo assim" e confirmação. */
export function incertas(l: LoteDocumentos): number[] {
  return l.itens.flatMap((i, k) => (ehIncerto(i) ? [k] : []));
}

/**
 * Índices das linhas `fora` que "Gravar as que ficaram de fora" pode reverificar: só no destino coluna e sem erro na
 * planilha (`erroLinha` precisa de correção no arquivo).
 */
export function foraRegravaveis(l: LoteDocumentos): number[] {
  if (l.config.destino.tipo !== "coluna") return [];
  return l.itens.flatMap((i, k) => (i.situacao === "fora" && !l.linhas[k]?.erroLinha && l.linhas[k]?.destino ? [k] : []));
}

/**
 * Há o que fazer com o lote: linha pendente, com erro (repetível ou incerta, que o usuário confere) ou de fora por
 * verificação. Sem isso, fechar o resultado apaga o lote; com isso, ele fica (até 7 dias do último uso).
 */
export function temPendencia(l: LoteDocumentos): boolean {
  return l.itens.some((i) => i.situacao === "pendente" || i.situacao === "erro") || foraRegravaveis(l).length > 0;
}

/** Números SEI que o Link Permanente pode pesquisar: só os documentos criados e confirmados (sem os incertos). */
export function numerosParaLink(l: LoteDocumentos): string[] {
  return l.itens.flatMap((i) => (i.situacao === "criada" && i.criado?.numero ? [i.criado.numero] : []));
}

const plural = (n: number, um: string, varios: string) => (n === 1 ? um : varios.replace("#", String(n)));

/** As partes do resumo: "x criadas", "y com erro", e só se houver: incertas, de fora, não enviadas. */
function partesDoResumo(c: Pick<ContagemLote, "criadas" | "erros" | "incertas" | "fora"> & { pendentes?: number }): string[] {
  const partes = [
    c.criadas === 0 ? "nenhuma criada" : plural(c.criadas, "1 criada", "# criadas"),
    c.erros === 0 ? "nenhuma com erro" : plural(c.erros, "1 com erro", "# com erro"),
  ];
  if (c.incertas) partes.push(plural(c.incertas, "1 incerta", "# incertas"));
  if (c.fora) partes.push(plural(c.fora, "1 ficou de fora", "# ficaram de fora"));
  if (c.pendentes) partes.push(plural(c.pendentes, "1 não enviada", "# não enviadas"));
  return partes;
}

const comMaiuscula = (t: string) => `${t.charAt(0).toUpperCase()}${t.slice(1)}`;

/**
 * Resumo da execução e da pastilha: "X criadas, Y com erro, Z incertas, W ficaram de fora." — os mesmos números e
 * rótulos do resultado (as incertas à parte dos erros, Ruling 16).
 */
export function resumoDaContagem(c: Pick<ContagemLote, "criadas" | "erros" | "incertas" | "fora">): string {
  return `${comMaiuscula(partesDoResumo(c).join(", "))}.`;
}

/** O resumo do resultado: o da contagem, com as não enviadas e o total de linhas. */
export function resumoDoResultado(c: ContagemLote): string {
  return `${comMaiuscula(`${partesDoResumo(c).join(", ")} (de ${plural(c.total, "1 linha", "# linhas")})`)}.`;
}

export interface AcoesResultado {
  baixarCsv(): void;
  copiar(): void;
  repetirFalhas(): void;
  /** Uma linha incerta, depois da confirmação explícita (quem confirma é o app). */
  repetirIncerta(indice: number): void;
  gravarFora(): void;
  gerarLinks(): void;
  concluir(): void;
}

export class TelaResultado {
  readonly el: HTMLElement;
  private readonly erro: HTMLElement;
  private readonly botoes: HTMLButtonElement[] = [];

  constructor(
    readonly lote: LoteDocumentos,
    a: AcoesResultado,
  ) {
    const c = contagemDoLote(lote);
    const botao = (rotulo: string, nome: NomeIcone, fazer: () => void, classe = "") => {
      const b = h("button", { type: "button", class: `spro-botao pequeno ${classe}`.trim(), onclick: fazer }, icone(nome, 14), rotulo);
      this.botoes.push(b);
      return b;
    };
    this.erro = h("p", { class: "dl-erro", role: "alert", hidden: true });
    const tabela = montarTabelaResultado(document, linhasDoResultado(lote), colunasDoResultado(lote));
    // A cor só reforça: o incerto já diz "Incerto" na Situação.
    [...tabela.querySelectorAll("tbody tr")].forEach((tr, k) => {
      if (ehIncerto(lote.itens[k])) tr.classList.add("dl-incerto");
    });
    const pendencia = c.erros || c.incertas || c.pendentes || foraRegravaveis(lote).length;
    const listaIncertas = incertas(lote);
    this.el = h(
      "section",
      { class: "dl-resultado", "aria-label": "Resultado" },
      h(
        "h2",
        { class: "dl-resultado-titulo" },
        pendencia ? icone("alerta", 18) : icone("check", 18),
        pendencia ? "Lote concluído com pendências" : "Lote concluído",
      ),
      h("p", { class: "dl-resultado-resumo", role: "status" }, resumoDoResultado(c)),
      this.erro,
      listaIncertas.length
        ? h(
            "section",
            { class: "dl-resultado-incertas" },
            h(
              "p",
              { class: "dl-motivo" },
              icone("alerta", 16),
              `${plural(listaIncertas.length, "1 linha ficou incerta", "# linhas ficaram incertas")}: o SEI não confirmou a criação. Elas não são repetidas sozinhas: confira no SEI antes de repetir.`,
            ),
            h(
              "ul",
              {},
              ...listaIncertas.map((k) => {
                const i = lote.itens[k];
                return h(
                  "li",
                  {},
                  h("strong", {}, `Linha ${k + 2}`),
                  ` ${i?.erro ?? ""}`,
                  i?.link ? h("a", { href: i.link, target: "_blank", rel: "noopener" }, " (documento)") : null,
                  " ",
                  botao("Repetir mesmo assim", "atualizar", () => a.repetirIncerta(k), "fantasma"),
                );
              }),
            ),
          )
        : null,
      h(
        "div",
        { class: "dl-acoes" },
        c.erros ? botao("Repetir só as que falharam", "atualizar", () => a.repetirFalhas(), "primario") : null,
        foraRegravaveis(lote).length ? botao("Gravar as que ficaram de fora", "atualizar", () => a.gravarFora()) : null,
        numerosParaLink(lote).length ? botao("Gerar links permanentes destes documentos", "documento", () => a.gerarLinks()) : null,
        h("span", { class: "dl-espaco" }),
        botao("Copiar", "copiar", () => a.copiar()),
        botao("Baixar CSV", "baixar", () => a.baixarCsv()),
        botao("Concluir", "check", () => a.concluir()),
      ),
      h(
        "p",
        { class: "dl-nota" },
        "Concluir apaga o registro deste lote neste navegador (os documentos criados continuam no SEI). Fechado sem concluir, ele fica guardado por 7 dias se ainda houver linha a repetir, a conferir ou de fora.",
      ),
      h("div", { class: "dl-tabela" }, tabela),
    );
  }

  mostrarErro(texto: string): void {
    this.erro.replaceChildren(icone("alerta", 16), h("span", {}, texto));
    this.erro.hidden = !texto;
  }

  /** Enquanto uma ação prepara a próxima rodada, os botões não aceitam outro clique. */
  ocupado(sim: boolean): void {
    for (const b of this.botoes) b.disabled = sim;
  }
}
