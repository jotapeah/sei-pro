/**
 * Aviso (toast) do painel embutido no rodapé da TELA do SEI: dentro do iframe,
 * que cresce com a lista, um aviso preso embaixo ficaria fora da vista.
 *
 * Lado da aba (`avisoNaPagina`): estilo em linha (a página do SEI não tem a
 * base visual) e cores fixas, legíveis nos dois temas; a promessa diz se o
 * usuário clicou a ação ("Desfazer"). A animação `<prefixo>-aviso` vem do CSS
 * do painel (embutido.ts, `instalarEstiloPainel`).
 * Lado do app (`emissorDeAvisoPelaPagina`): manda o aviso para a aba; com
 * diálogo sobreposto, ou se a aba não responde, o app mostra ele mesmo.
 */

import type { Rpc } from "../ponte/rpc";
import { type EmissorAviso, mostrarAviso } from "../ui/aviso";
import { h } from "../ui/dom";

export type AvisarNaPagina = (texto: string, acao: string | undefined, ms: number) => Promise<boolean>;

const caixa = (prefixo: string) =>
  "position:fixed;left:50%;bottom:20px;transform:translateX(-50%);z-index:2147483646;display:flex;align-items:center;gap:12px;" +
  "max-width:min(560px,calc(100vw - 24px));box-sizing:border-box;padding:10px 10px 10px 16px;" +
  "font:13px/1.35 system-ui,-apple-system,'Segoe UI',Roboto,sans-serif;color:#f3f5f8;background:#1f2329;" +
  "border:1px solid rgb(255 255 255 / 8%);border-radius:12px;box-shadow:0 10px 24px -6px rgb(16 24 40 / 30%),0 24px 56px -12px rgb(16 24 40 / 35%);" +
  `animation:${prefixo}-aviso 220ms cubic-bezier(.2,.8,.2,1)`;
const BOTAO =
  "flex:none;padding:5px 10px;font:inherit;font-weight:600;color:#9cc3ff;background:rgb(255 255 255 / 7%);border:0;border-radius:6px;cursor:pointer";

/** Prefixo das classes do painel na página do SEI (entra em CSS: só letras minúsculas, dígitos e hífen). */
export function validarPrefixo(prefixo: string): string {
  if (!/^[a-z][a-z0-9-]*$/.test(prefixo)) throw new Error(`Prefixo de classe inválido: ${prefixo}`);
  return prefixo;
}

export function avisoNaPagina(doc: Document, temaEscuro: boolean, prefixo = "spro-painel"): AvisarNaPagina {
  const classe = `${validarPrefixo(prefixo)}-aviso`;
  return (texto, acao, ms) =>
    new Promise<boolean>((resolver) => {
      for (const velho of doc.querySelectorAll(`.${classe}`)) velho.remove();
      let feito = false;
      const terminar = (acionado: boolean) => {
        if (feito) return;
        feito = true;
        el.remove();
        resolver(acionado);
      };
      const el = h(
        "div",
        { class: classe, role: "status", style: caixa(prefixo) + (temaEscuro ? ";background:#2b3036" : "") },
        h("span", { style: "flex:1" }, texto),
        acao ? h("button", { type: "button", style: BOTAO, onclick: () => terminar(true) }, acao) : null,
      );
      (doc.body ?? doc.documentElement).append(el);
      setTimeout(() => terminar(false), Math.max(10, Math.min(ms, 60_000)));
    });
}

/** Emissor de avisos do app embutido (ui/aviso.ts `definirEmissorDeAviso`): o aviso vai para o rodapé da tela do SEI. */
export function emissorDeAvisoPelaPagina(rpc: Pick<Rpc, "chamar">, doc: Document = document): EmissorAviso {
  return (texto, acao, ms) => {
    // Com diálogo aberto, o iframe já cobre a tela: o aviso fica no próprio app.
    if (doc.documentElement.dataset.sobreposto) return false;
    rpc
      .chamar<boolean>("aviso", { texto, acao: acao?.rotulo, ms }, ms + 5000)
      .then((acionado) => acionado && acao?.fazer())
      .catch(() => mostrarAviso(doc, texto, acao, ms));
    return true;
  };
}
