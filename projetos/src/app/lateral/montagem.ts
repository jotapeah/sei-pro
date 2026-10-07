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
 * aba de outra unidade, nem à da própria). A montagem não tem outro RPC.
 *
 * Se a troca fechou algo que estava aberto (um formulário, o "Entendi"), um
 * aviso só, já na unidade nova, diz que foi fechado sem gravar.
 *
 * Também atende o "Abrir no painel" que a árvore deixa no armazenamento
 * (`projetos/foco`, alvo "lateral"): abre o projeto (e o balão da etapa) assim
 * que o app da mesma chave estiver de pé. O pedido vale uma vez.
 */

import type { Area } from "@comum/armazenamento/area";
import { ErroRpc, type Rpc } from "@comum/ponte/rpc";
import { avisar } from "@comum/ui/aviso";
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
  /** Desmonta; devolve quantos diálogos abertos fechou sem gravar (nada: 0). */
  destruir(): number;
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

/** O que a desmontagem deixou para dizer: de que unidade e quantos diálogos fechou. */
interface Fechados {
  sigla: string;
  quantos: number;
}

const MENSAGEM_SEM_ABA = "A aba do SEI destes projetos não está mais aberta nesta janela. Abra o SEI na unidade e tente de novo.";

/** O aviso da troca que fechou algo aberto (mesma sigla: outro usuário ou outro SEI). */
function avisoDaTroca(antiga: string, nova: string): string {
  return antiga === nova
    ? `O SEI desta janela mudou. O que estava aberto na ${antiga} foi fechado sem gravar.`
    : `Você mudou para a ${nova}. O que estava aberto na ${antiga} foi fechado sem gravar.`;
}

function semAba(): HTMLElement {
  return h(
    "div",
    { class: "prj-lat-sem-aba" },
    icone("gantt", 28),
    h("p", {}, "Abra o SEI nesta janela para ver seus projetos."),
    h("p", { class: "prj-lat-dica" }, "Se o SEI já está aberto e nada aparece, recarregue a página dele (F5)."),
  );
}

export class MontagemLateral {
  private montado: { vez: Vez; app: AppDoLateral; sigla: string } | null = null;
  private fila: Promise<void> = Promise.resolve();
  private paradas: Array<() => void> = [];
  private parado = false;

  constructor(private readonly d: DepsMontagem) {}

  iniciar(): void {
    this.d.raiz.replaceChildren(h("p", { class: "prj-lat-dica" }, "Procurando o SEI nesta janela…"));
    this.paradas.push(
      this.d.ponte.aoMudar(() => void this.reagir()),
      this.d.area.aoMudar((m) => {
        // Pela chave (o valor é relido): a remoção do próprio pedido também avisa e não acha nada.
        if (CHAVE_FOCO in m) this.enfileirar(() => this.atenderFoco());
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

  private desmontar(): Fechados | null {
    const m = this.montado;
    this.montado = null;
    if (!m) return null;
    m.vez.viva = false;
    try {
      const quantos = m.app.destruir();
      return { sigla: m.sigla, quantos: Number.isFinite(quantos) ? quantos : 0 };
    } catch (e) {
      console.warn("[SEI Pro] projetos: o lateral não desmontou direito:", e);
      return { sigla: m.sigla, quantos: 0 };
    }
  }

  private async trocar(): Promise<void> {
    if (this.parado) return;
    const a = this.d.ponte.atual();
    const chave = a?.chave ?? "";
    if (this.montado && this.montado.vez.chave === chave) return;
    const fechados = this.desmontar();
    // Aba sem chave (sem unidade) não é aba para o lateral: a ponte real nem a oferece.
    if (!a || !chave) {
      this.d.raiz.replaceChildren(semAba());
      return;
    }
    const ctx = await a.rpc.chamar<ContextoProjetos>("contexto");
    if (this.parado) return;
    // A chave que a aba apresentou tem de ser a do contexto dela (e com unidade): senão não monta e diz o mesmo que
    // sem aba (a próxima volta da fila corrige, quando a aba se reapresentar).
    if (chaveDaAba(ctx) !== chave || !ctx.unidade) {
      this.d.raiz.replaceChildren(semAba());
      return;
    }
    const sigla = ctx.unidade.sigla || "unidade";
    // O RPC já vale durante a montagem (o app pede à aba enquanto abre), preso à chave desta montagem.
    const vez: Vez = { chave, viva: true };
    let app: AppDoLateral;
    try {
      app = await this.d.criar(ctx, { chamar: (op, args, prazo) => this.chamarNa(vez, op, args, prazo) });
    } catch (e) {
      vez.viva = false;
      throw e;
    }
    this.montado = { vez, app, sigla };
    // Parou enquanto montava: o app que acabou de abrir sai já (relógio, ouvintes, arquivo ligado).
    if (this.parado) {
      this.desmontar();
      return;
    }
    if (fechados?.quantos) avisar(avisoDaTroca(fechados.sigla, sigla));
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
