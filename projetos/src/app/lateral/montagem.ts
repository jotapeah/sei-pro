/**
 * A aba "Projetos" do painel lateral liga-se à aba do SEI que está na frente
 * nesta janela (ponte do `sei-comum`) e monta o app com os projetos da unidade
 * DELA (spec 7): a chave de roteamento é host|login|u:<unidade>, então trocar
 * de unidade, de usuário ou de SEI (o SEI recarrega a página e a aba se
 * reapresenta com outra chave) desmonta o app e monta outro — nada é gravado
 * no escopo antigo. Trocar de aba na mesma unidade não remonta.
 *
 * Cada montagem tem o SEU RPC, preso à chave dela: vai só para uma aba dessa
 * chave (`daChave`), nunca para a da frente só porque ela ganhou o foco, e
 * depois de desmontar recusa tudo (um pedido atrasado do app velho não chega à
 * aba de outra unidade, nem à da própria).
 *
 * Também atende o "Abrir no painel" que a árvore deixa no armazenamento
 * (`projetos/foco`, alvo "lateral"): abre o projeto (e o balão da etapa) assim
 * que o app da mesma chave estiver de pé. O pedido vale uma vez.
 */

import type { Area } from "@comum/armazenamento/area";
import { ErroRpc, type Rpc } from "@comum/ponte/rpc";
import { h, icone } from "@comum/ui/dom";
import { CHAVE_FOCO, type ContextoProjetos, chaveDaAba, lerPedidoDeFoco } from "../../ponte/tipos";

/** O que a montagem usa da `PonteLateral` (`@comum/ponte/lateral`). */
export interface PonteDoLateral {
  atual(): { chave: string; rpc: Pick<Rpc, "chamar"> } | null;
  daChave(chave: string): { rpc: Pick<Rpc, "chamar"> } | null;
  aoMudar(cb: () => void): () => void;
}

/** O app montado para uma unidade (o `ligarApp` no modo lateral: `lateral/criar.ts`). */
export interface AppDoLateral {
  focarProjeto(id: string, etapa?: string): boolean;
  aoGanharFoco?(): void;
  destruir(): void;
}

export interface DepsMontagem {
  raiz: HTMLElement;
  ponte: PonteDoLateral;
  /** chrome.storage.local: o pedido de foco da árvore. */
  area: Area;
  agora(): number;
  /** Monta o app da unidade do contexto; `rpc` é o desta montagem (só fala com abas da chave dela). */
  criar(ctx: ContextoProjetos, rpc: Pick<Rpc, "chamar">): Promise<AppDoLateral>;
}

/** Uma montagem: a chave dela e se ainda vale (o RPC dela recusa depois de desmontar). */
interface Vez {
  chave: string;
  viva: boolean;
}

const MENSAGEM_SEM_ABA = "A aba do SEI destes projetos não está mais aberta nesta janela. Abra o SEI na unidade e tente de novo.";

function aviso(...linhas: string[]): HTMLElement {
  const [primeira = "", ...resto] = linhas;
  return h(
    "div",
    { class: "prj-lat-sem-aba" },
    icone("gantt", 28),
    h("p", {}, primeira),
    ...resto.map((t) => h("p", { class: "prj-lat-dica" }, t)),
  );
}

export class MontagemLateral {
  private montado: { vez: Vez; app: AppDoLateral } | null = null;
  private fila: Promise<void> = Promise.resolve();
  private paradas: Array<() => void> = [];
  private parado = false;

  /** O RPC da unidade montada agora (cada app recebe o da montagem dele, que não muda de chave). */
  readonly rpc: Pick<Rpc, "chamar"> = {
    chamar: <T>(op: string, args?: unknown, prazo?: number) =>
      this.chamarNa<T>(this.montado?.vez ?? { chave: "", viva: false }, op, args, prazo),
  };

  constructor(private readonly d: DepsMontagem) {}

  iniciar(): void {
    this.d.raiz.replaceChildren(h("p", { class: "prj-lat-dica" }, "Procurando o SEI nesta janela…"));
    this.paradas.push(
      this.d.ponte.aoMudar(() => void this.reagir()),
      this.d.area.aoMudar((m) => {
        // A remoção do próprio pedido (já atendido) também avisa: só um pedido gravado interessa.
        if (m[CHAVE_FOCO]?.novo !== undefined) this.enfileirar(() => this.atenderFoco());
      }),
    );
  }

  /** A aba da frente mudou (ou se apresentou): remonta só se a chave mudou. Devolve a volta da fila. */
  reagir(): Promise<void> {
    return this.enfileirar(() =>
      this.trocar().catch((e: unknown) => {
        if (this.parado) return;
        this.d.raiz.replaceChildren(
          h("p", { class: "prj-erro" }, `Não foi possível abrir os projetos: ${e instanceof Error ? e.message : String(e)}`),
        );
      }),
    );
  }

  aoGanharFoco(): void {
    this.montado?.app.aoGanharFoco?.();
  }

  parar(): void {
    this.parado = true;
    for (const p of this.paradas.splice(0)) p();
    this.desmontar();
  }

  /** Uma coisa por vez: a troca de unidade e o pedido de foco nunca se cruzam. */
  private enfileirar(f: () => Promise<void>): Promise<void> {
    this.fila = this.fila.then(f, f);
    return this.fila;
  }

  private chamarNa<T>(vez: Vez, op: string, args?: unknown, prazo?: number): Promise<T> {
    const a = vez.viva && !this.parado ? this.d.ponte.daChave(vez.chave) : null;
    return a ? a.rpc.chamar<T>(op, args, prazo) : Promise.reject(new ErroRpc("SEM_ABA", MENSAGEM_SEM_ABA));
  }

  private desmontar(): void {
    const m = this.montado;
    this.montado = null;
    if (!m) return;
    m.vez.viva = false;
    try {
      m.app.destruir();
    } catch (e) {
      console.warn("[SEI Pro] projetos: o lateral não desmontou direito:", e);
    }
  }

  private async trocar(): Promise<void> {
    if (this.parado) return;
    const a = this.d.ponte.atual();
    const chave = a?.chave ?? "";
    if (this.montado && this.montado.vez.chave === chave) return;
    this.desmontar();
    if (!a) {
      this.d.raiz.replaceChildren(
        aviso("Abra o SEI nesta janela para ver seus projetos.", "Se o SEI já está aberto e nada aparece, recarregue a página dele (F5)."),
      );
      return;
    }
    const ctx = await a.rpc.chamar<ContextoProjetos>("contexto");
    if (this.parado) return;
    // A chave que a aba apresentou tem de ser a do contexto dela: senão não monta (a próxima volta da fila corrige).
    if (chaveDaAba(ctx) !== chave) return;
    if (!ctx.unidade) {
      this.d.raiz.replaceChildren(aviso("Abra o SEI numa unidade para ver os projetos."));
      return;
    }
    // O RPC já vale durante a montagem (o app pede à aba enquanto abre), preso à chave desta montagem.
    const vez: Vez = { chave, viva: true };
    let app: AppDoLateral;
    try {
      app = await this.d.criar(ctx, { chamar: (op, args, prazo) => this.chamarNa(vez, op, args, prazo) });
    } catch (e) {
      vez.viva = false;
      throw e;
    }
    this.montado = { vez, app };
    // Parou enquanto montava: o app que acabou de abrir sai já (relógio, ouvintes, arquivo ligado).
    if (this.parado) {
      this.desmontar();
      return;
    }
    await this.atenderFoco();
  }

  /** O "Abrir no painel" da árvore: vale uma vez, só para a chave montada e dentro do prazo. Nunca derruba o app. */
  private async atenderFoco(): Promise<void> {
    const m = this.montado;
    if (!m) return;
    try {
      const bruto = (await this.d.area.obter(CHAVE_FOCO))[CHAVE_FOCO];
      if (this.montado !== m) return;
      const p = lerPedidoDeFoco(bruto, "lateral", m.vez.chave, this.d.agora());
      if (!p) return;
      await this.d.area.remover(CHAVE_FOCO);
      if (this.montado === m) m.app.focarProjeto(p.projeto, p.etapa);
    } catch (e) {
      console.warn("[SEI Pro] projetos: o pedido de foco não foi atendido:", e);
    }
  }
}
