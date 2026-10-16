import {
  ATRIBUTO_COMPACTO,
  ATRIBUTO_LARGO,
  ATRIBUTO_ROTULO,
  aplicarLargura,
  CHAVE_LARGURA,
  CLASSE_ACAO,
  CLASSE_GRUPO,
  iniciarBotaoLargura,
  iniciarLarguraDoPapel,
  lerLargo,
  rotuloDoBotao,
} from "../src/pagina/largura";
import { checar, instalarDom, secao } from "./util";

const armazemFalso = () => {
  const m = new Map<string, string>();
  return {
    getItem: (k: string) => m.get(k) ?? null,
    setItem: (k: string, v: string) => void m.set(k, v),
    removeItem: (k: string) => void m.delete(k),
  };
};

export function verificarLargura(): void {
  secao("largura do documento e botoes do canto");
  checar("rotulo a partir do tooltip do SEI Pro", rotuloDoBotao("return infraTooltipMostrar('Baixar documento (DOCX)')") === "Baixar DOCX");
  checar("tooltip desconhecido nao gera rotulo", rotuloDoBotao("return infraTooltipMostrar('Outra coisa')") === "");

  const arm = armazemFalso();
  checar("padrao: estreito", !lerLargo(arm));
  const doc = instalarDom("<html><head></head><body></body></html>");
  const parar = iniciarLarguraDoPapel(doc, arm);
  checar("papel estreito: sem atributo", !doc.documentElement.hasAttribute(ATRIBUTO_LARGO));
  arm.setItem(CHAVE_LARGURA, "1");
  aplicarLargura(doc, lerLargo(arm));
  checar("escolha gravada vira atributo", doc.documentElement.hasAttribute(ATRIBUTO_LARGO));
  parar();
  checar("desligar tira o atributo", !doc.documentElement.hasAttribute(ATRIBUTO_LARGO));

  const tela = instalarDom(
    `<html><head></head><body><div id="pai"><a class="openNewTab" onmouseover="return infraTooltipMostrar('Abrir')">Abrir documento em nova aba</a><a class="openNewTab" onmouseover="return infraTooltipMostrar('Baixar documento (HTML)')"></a><a class="openNewTab" onmouseover="return infraTooltipMostrar('Baixar documento (DOCX)')"></a></div></body></html>`,
  );
  const arm2 = armazemFalso();
  const pararBotao = iniciarBotaoLargura(tela, arm2);
  const grupo = tela.querySelector(`.${CLASSE_GRUPO}`);
  checar("um grupo com o botao de largura na frente", !!grupo && grupo.firstElementChild?.tagName === "BUTTON");
  checar("os 3 botoes do SEI Pro entram no grupo", grupo?.querySelectorAll("a.openNewTab").length === 3);
  checar("todos ganham a classe de acao", tela.querySelectorAll(`.${CLASSE_ACAO}`).length === 4);
  const rotulos = [...tela.querySelectorAll("a.openNewTab")].map((a) => a.getAttribute(ATRIBUTO_ROTULO));
  checar("so os de icone ganham rotulo (HTML e DOCX)", rotulos[0] === null && rotulos[1] === "Baixar HTML" && rotulos[2] === "Baixar DOCX");
  const botao = grupo?.querySelector("button") as HTMLButtonElement;
  checar("rotulo inicial: Largura total", botao.textContent === "Largura total" && botao.getAttribute("aria-pressed") === "false");
  botao.click();
  checar("clicar grava a escolha e troca o rotulo", arm2.getItem(CHAVE_LARGURA) === "1" && botao.textContent === "Largura de página");
  botao.click();
  checar("clicar de novo volta ao estreito", arm2.getItem(CHAVE_LARGURA) === null && botao.textContent === "Largura total");
  // Rolagem da propria tela: so com ela passada do limite os botoes ficam so com o icone.
  const rolar = (n: number) => {
    Object.defineProperty(tela.documentElement, "scrollTop", { value: n, configurable: true });
    Object.defineProperty(tela, "scrollingElement", { value: tela.documentElement, configurable: true });
    tela.dispatchEvent(new (tela.defaultView as unknown as { Event: typeof Event }).Event("scroll"));
  };
  rolar(50);
  checar("rolou: o grupo marca compacto (so icones)", grupo?.hasAttribute(ATRIBUTO_COMPACTO) === true);
  rolar(2);
  checar("voltou ao topo: rotulos de volta", grupo?.hasAttribute(ATRIBUTO_COMPACTO) === false);
  pararBotao();
  checar(
    "desligar devolve as ancoras ao lugar e some com o grupo",
    !tela.querySelector(`.${CLASSE_GRUPO}`) &&
      tela.querySelectorAll("#pai > a.openNewTab").length === 3 &&
      tela.querySelectorAll(`.${CLASSE_ACAO}`).length === 0,
  );
}
