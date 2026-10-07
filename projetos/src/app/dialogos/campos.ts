/**
 * Peças dos formulários (tela 2): campo com rótulo, linha de campos, seção
 * recolhida com resumo à direita, caixa de erros e o campo de processo SEI
 * (seletor com os processos da caixa e qualquer número digitado).
 */

import { normalizarTexto } from "@comum/texto";
import { type Combo, criarCombo, type OpcaoCombo } from "@comum/ui/combobox";
import { h, icone } from "@comum/ui/dom";
import type { Vinculo } from "../../modelo/tipos";
import type { DocumentoConferido, ProcessoDaCaixa } from "../../ponte/tipos";

type Filho = Node | string | null | undefined | false;

export function campo(rotulo: string, controle: Node, o: { opcional?: string; dica?: string; classe?: string } = {}): HTMLElement {
  return h(
    "div",
    { class: `prj-campo${o.classe ? ` ${o.classe}` : ""}` },
    h("span", { class: "prj-rotulo" }, rotulo, o.opcional ? h("span", { class: "prj-opcional" }, ` ${o.opcional}`) : null),
    controle,
    o.dica ? h("div", { class: "prj-dica" }, o.dica) : null,
  );
}

export function linhaDeCampos(...filhos: Filho[]): HTMLElement {
  return h("div", { class: "prj-linha" }, ...filhos);
}

export interface Secao {
  el: HTMLElement;
  /** Recalcula o resumo à direita. */
  resumir(): void;
  abrir(): void;
}

/** Seção recolhida (tela 2): botão com ícone, título e resumo; o conteúdo aparece ao abrir. */
export function secao(id: string, ic: Element, titulo: string, resumo: () => string, conteudo: HTMLElement, aberta = false): Secao {
  const res = h("span", { class: "prj-sec-res" });
  const botao = h(
    "button",
    { type: "button", "aria-expanded": String(aberta) },
    h("span", { class: "prj-sec-seta" }, icone("chevron", 14)),
    ic,
    h("span", { class: "prj-sec-tit" }, titulo),
    res,
  );
  const el = h(
    "div",
    { class: `prj-sec${aberta ? " prj-sec-aberta" : ""}`, "data-secao": id },
    botao,
    h("div", { class: "prj-sec-conteudo" }, conteudo),
  );
  const alternar = (abrir: boolean) => {
    el.classList.toggle("prj-sec-aberta", abrir);
    botao.setAttribute("aria-expanded", String(abrir));
  };
  botao.addEventListener("click", () => alternar(!el.classList.contains("prj-sec-aberta")));
  const resumir = () => {
    res.textContent = resumo();
  };
  resumir();
  return { el, resumir, abrir: () => alternar(true) };
}

export function caixaDeErros(): { el: HTMLElement; mostrar(m: readonly string[]): void } {
  const el = h("div", { class: "prj-erros", role: "alert", hidden: true });
  return {
    el,
    mostrar(m) {
      el.replaceChildren(...m.map((t) => h("div", {}, t)));
      el.hidden = !m.length;
    },
  };
}

/** Mensagens de um erro do repositório (ErroValidacao) ou de qualquer outro. */
export function mensagensDoErro(e: unknown): string[] {
  const m = (e as { mensagens?: unknown })?.mensagens;
  if (Array.isArray(m) && m.length) return m.map(String);
  return [`Não foi possível salvar: ${e instanceof Error ? e.message : String(e)}`];
}

const VALOR_DIGITADO = "digitado:";

/** Só os dígitos e a pontuação do número do processo; nada além de 40 caracteres. */
const protocoloLimpo = (t: string): string => t.replace(/[^\d./-]/g, "").slice(0, 40);

/** Número de processo aceito: começa e termina em dígito, só com dígitos . / - e ao menos 8 dígitos (os formatos variam por órgão). */
export function protocoloValido(p: string): boolean {
  const t = p.trim();
  return /^[0-9][0-9./-]*[0-9]$/.test(t) && t.replace(/\D/g, "").length >= 8;
}

export const ERRO_PROTOCOLO = "Número de processo inválido.";

export interface CampoProcesso {
  combo: Combo;
  /** O vínculo escolhido; undefined = nenhum (no da etapa: herda o do projeto). */
  vinculo(): Vinculo | undefined;
  /** O vínculo escolhido tem número que não passa em `protocoloValido` (só vale para o número digitado). */
  invalido(): boolean;
}

/**
 * Seletor de processo: os da caixa (carregados quando chegam) e qualquer
 * número digitado ("Criar"). Processo sigiloso da caixa vem marcado; número
 * digitado que é de um processo da caixa herda os dados dele.
 */
export function campoProcesso(o: {
  rotulo: string;
  atual?: Vinculo;
  vazio: string;
  processos: () => Promise<ProcessoDaCaixa[]>;
  aoMudar?: () => void;
}): CampoProcesso {
  let caixa: ProcessoDaCaixa[] = [];
  const digitados = new Map<string, Vinculo>();
  const opcoes = (): OpcaoCombo[] => {
    const lista: OpcaoCombo[] = [{ valor: "", rotulo: o.vazio }];
    if (o.atual?.protocolo && !caixa.some((p) => p.protocolo === o.atual?.protocolo))
      lista.push({ valor: o.atual.protocolo, rotulo: o.atual.protocolo, icone: o.atual.sigiloso ? "cadeado" : "pasta" });
    for (const p of caixa)
      lista.push({
        valor: p.protocolo,
        rotulo: p.protocolo,
        descricao: p.sigiloso ? "Sigiloso" : [p.tipo, p.especificacao].filter(Boolean).join(" · ") || undefined,
        icone: p.sigiloso ? "cadeado" : "pasta",
      });
    for (const [valor, v] of digitados) lista.push({ valor, rotulo: v.protocolo, icone: "pasta" });
    return lista;
  };
  const combo = criarCombo({
    rotulo: o.rotulo,
    opcoes,
    valor: [o.atual?.protocolo ?? ""],
    vazio: o.vazio,
    icone: "pasta",
    busca: true,
    larguraLista: 320,
    criar: (texto) => {
      const protocolo = protocoloLimpo(texto);
      if (!protocolo) return null;
      const daCaixa = caixa.find((p) => normalizarTexto(p.protocolo) === normalizarTexto(protocolo));
      if (daCaixa) return { valor: daCaixa.protocolo, rotulo: daCaixa.protocolo };
      digitados.set(`${VALOR_DIGITADO}${protocolo}`, { protocolo });
      return { valor: `${VALOR_DIGITADO}${protocolo}`, rotulo: protocolo };
    },
    rotuloCriar: (t) => `Usar o número “${protocoloLimpo(t)}”`,
    aoMudar: () => o.aoMudar?.(),
  });
  void o
    .processos()
    .then((lista) => {
      caixa = lista;
      combo.atualizar();
    })
    .catch(() => undefined);
  return {
    combo,
    invalido() {
      const digitado = digitados.get(combo.valor()[0] ?? "");
      return !!digitado && !protocoloValido(digitado.protocolo);
    },
    vinculo() {
      const v = combo.valor()[0] ?? "";
      if (!v) return undefined;
      const digitado = digitados.get(v);
      if (digitado) return digitado;
      const p = caixa.find((x) => x.protocolo === v);
      if (p) return { protocolo: p.protocolo, idProcedimento: p.idProcedimento, ...(p.sigiloso ? { sigiloso: true } : {}) };
      return o.atual?.protocolo === v ? o.atual : { protocolo: v };
    },
  };
}

/** Campo do número SEI com a conferência pela pesquisa rápida (sem abrir a árvore). */
export function campoDocumento(
  valor: string,
  conferir?: (numero: string) => Promise<DocumentoConferido | null>,
  aoMudar?: () => void,
): { el: HTMLElement; numero(): string } {
  const input = h("input", {
    type: "text",
    class: "spro-campo",
    name: "documento",
    inputmode: "numeric",
    placeholder: "Número SEI",
    maxlength: "30",
    value: valor,
  });
  const ok = h("div", { class: "prj-docok", hidden: true });
  const numero = () => input.value.replace(/\D/g, "");
  let pedido = 0;
  input.addEventListener("change", () => {
    aoMudar?.();
    const n = numero();
    const meu = ++pedido;
    if (!n || !conferir) {
      ok.hidden = true;
      return;
    }
    void conferir(n)
      .then((r) => {
        if (meu !== pedido) return;
        ok.hidden = false;
        ok.classList.toggle("prj-docok-falta", !r);
        ok.replaceChildren(
          ...(r
            ? [icone("check", 14), r.protocolo ? `Documento encontrado no processo ${r.protocolo}` : "Documento encontrado no SEI"]
            : [icone("alerta", 14), "Não encontrado no SEI: confira o número."]),
        );
      })
      .catch(() => {
        if (meu === pedido) ok.hidden = true;
      });
  });
  return { el: h("div", {}, input, ok), numero };
}
