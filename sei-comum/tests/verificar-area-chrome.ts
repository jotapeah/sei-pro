/**
 * O `areaChrome` traduz o `onChanged` do Chrome (`{ newValue, oldValue }`) para
 * o `{ novo, antigo }` que os módulos leem. Sem a tradução, `.novo` vinha sempre
 * `undefined` em produção (as provas usavam o `areaMemoria`, que já fala
 * `{ novo, antigo }`): o selo das abas do painel sumia, o pedido de aba do
 * background não trocava a aba, e a aba do SEI só conectava ao lateral pela
 * rede de segurança. Tudo aqui passa por um `chrome.storage` no formato do
 * Chrome e pelo `areaChrome` real.
 */

import type { Mudancas } from "../src/armazenamento/area";
import { montarAbas } from "../src/painel/shell";
import { ligarLadoAba } from "../src/ponte/lateral";
import { parDePortas } from "../src/ponte/parDePortas";
import { instalarChromeStorage } from "./chromeFalso";
import { checar, instalarDom, secao, tique } from "./util";

export async function verificarAreaChrome(): Promise<void> {
  secao("areaChrome: as mudancas do Chrome viram { novo, antigo }");
  const c = instalarChromeStorage();
  try {
    const vistos: Mudancas[] = [];
    const parar = c.local.aoMudar((m) => vistos.push(m));
    await c.local.gravar({ a: 1 });
    await tique();
    await c.local.gravar({ a: 2, b: null });
    await tique();
    await c.local.remover("a");
    await tique();
    checar(
      "o falso entrega no formato do Chrome (newValue/oldValue)",
      JSON.stringify(c.entregues.map((e) => e.mudancas)) ===
        JSON.stringify([{ a: { newValue: 1 } }, { a: { newValue: 2, oldValue: 1 }, b: { newValue: null } }, { a: { oldValue: 2 } }]),
      c.entregues,
    );
    const [um, dois, tres] = vistos;
    checar("chave nova: novo, sem antigo", um?.a?.novo === 1 && !("antigo" in (um?.a ?? {})), um);
    checar("chave regravada: novo e antigo", dois?.a?.novo === 2 && dois.a.antigo === 1, dois);
    checar(
      "valor null gravado e novo (presente), nao chave removida",
      dois?.b !== undefined && "novo" in dois.b && dois.b.novo === null,
      dois,
    );
    checar("chave removida: so antigo (sem novo)", tres?.a?.antigo === 2 && !("novo" in (tres?.a ?? {})), tres);
    checar(
      "so os nomes novo/antigo (nada do formato cru)",
      vistos.every((m) => Object.values(m).every((x) => Object.keys(x).every((k) => k === "novo" || k === "antigo"))),
      vistos,
    );
    await c.sync.gravar({ s: 1 });
    await tique();
    checar("mudanca de outra area nao chega", vistos.length === 3);
    parar();
    await c.local.gravar({ a: 3 });
    await tique();
    checar("parar de ouvir", vistos.length === 3 && c.ouvintes() === 0);

    secao("areaChrome: a aba do SEI conecta quando o painel lateral anuncia depois");
    let conectou = 0;
    const lado = ligarLadoAba({
      area: c.local,
      chave: "x/lateral",
      conectar: () => {
        conectou++;
        return parDePortas()[0];
      },
      tratadores: {},
      estado: () => ({ visivel: true, foco: 1, chave: "k" }),
    });
    await tique();
    checar("sem anuncio: nao conecta", conectou === 0);
    await c.local.gravar({ "x/lateral": { id: "painel-1", quando: 1 } });
    await tique(10);
    checar("anuncio gravado com a aba aberta: conecta na hora (sem esperar a rede de seguranca)", conectou === 1, conectou);
    await c.local.remover("x/lateral");
    await tique(10);
    checar("anuncio retirado (o painel fechou): nao reconecta", conectou === 1, conectou);
    lado.parar();

    secao("areaChrome: o selo e a aba do painel seguem o storage");
    const doc = instalarDom('<html><body><div id="painel"></div></body></html>');
    const raiz = doc.getElementById("painel")!;
    await c.local.gravar({ "a/conta": 3 });
    await tique();
    const shell = await montarAbas(raiz, {
      sessao: c.session,
      local: c.local,
      url: (x) => `chrome-extension://id/${x}`,
      abas: [
        {
          id: "a",
          rotulo: "Aba A",
          icone: "estrela",
          caminho: "a.html",
          titulo: "A",
          contador: { chave: "a/conta", dica: (n) => `${n} na A` },
        },
        { id: "b", rotulo: "Aba B", icone: "historico", caminho: "b.html", titulo: "B" },
      ],
    });
    const rotuloA = () => raiz.querySelector('[role="tab"]')?.getAttribute("aria-label");
    checar("selo lido ao abrir", rotuloA() === "Aba A (3)", rotuloA());
    await c.local.gravar({ "a/conta": 5 });
    await tique(10);
    checar("selo novo gravado com o painel aberto: aparece", rotuloA() === "Aba A (5)", rotuloA());
    await c.local.remover("a/conta");
    await tique(10);
    checar("contador removido: sem numero", rotuloA() === "Aba A", rotuloA());
    await c.session.gravar({ painelAba: "b" });
    await tique(10);
    checar("pedido de aba do background com o painel aberto: troca a aba", shell.atual() === "b", shell.atual());
  } finally {
    c.restaurar();
  }
}
