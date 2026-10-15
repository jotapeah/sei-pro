import { ATRIBUTO_DICA, converterTitulos, iniciarDicas, restaurarTitulos, temTooltipDoSei } from "../src/pagina/dicas";
import { checar, instalarDom, secao } from "./util";

export function verificarDicas(): void {
  secao("dicas (tooltips da casca)");
  const html = `<html><head></head><body>
<div id="divInfraBarraSistemaPadrao"><a id="a1" title="Controle de Processos"><img src="x.svg"></a><a id="a2" title="  ">vazio</a></div>
<div class="barraBotoesSEI"><a id="c1" onmouseover="return infraTooltipMostrar('Historico')"><img id="c1img" title="Historico"></a><a id="b1" title="Atribuir Processo" onmouseover="return infraTooltipMostrar('Atribuir')"></a><a id="b2" title="Enviar" aria-label="Enviar processo"></a><a id="b3">sem titulo</a></div>
<div id="infraMenu"><input id="campo" title="Pesquisar no Menu" placeholder="Pesquisar no Menu"></div>
<div id="fora"><a id="f1" title="Fora da casca"></a></div>
</body></html>`;
  const doc = instalarDom(html);
  const g = (id: string) => doc.getElementById(id) as HTMLElement;

  const n = converterTitulos(doc);
  checar("converte so os titulos dentro dos escopos da casca", n === 4, n);
  checar(
    "title sai e vira data-spro-dica",
    !g("a1").hasAttribute("title") && g("a1").getAttribute(ATRIBUTO_DICA) === "Controle de Processos",
  );
  checar("icone sem texto ganha aria-label", g("a1").getAttribute("aria-label") === "Controle de Processos");
  checar("aria-label existente e preservado", g("b2").getAttribute("aria-label") === "Enviar processo");
  checar("link com texto nao ganha aria-label", !g("a2").hasAttribute("aria-label"));
  checar("title vazio some sem criar dica", !g("a2").hasAttribute("title") && !g("a2").hasAttribute(ATRIBUTO_DICA));
  checar(
    "quem ja tem o tooltip do SEI perde o title mas segue com a dica registrada",
    !g("b1").hasAttribute("title") && g("b1").getAttribute("onmouseover")?.includes("infraTooltipMostrar") === true,
  );
  checar("fora da casca o title fica intacto", g("f1").getAttribute("title") === "Fora da casca");
  checar("campo de texto perde o title e nao ganha dica", !g("campo").hasAttribute("title") && !g("campo").hasAttribute(ATRIBUTO_DICA));
  checar("converter de novo nao duplica nem lanca", converterTitulos(doc) === 0);

  checar("title na <img> com tooltip do SEI no <a> pai: nao mostra o proprio", temTooltipDoSei(g("c1img")) && temTooltipDoSei(g("b1")));
  checar("botao sem tooltip do SEI continua com o proprio", !temTooltipDoSei(g("b2")) && !temTooltipDoSei(g("a1")));
  restaurarTitulos(doc);
  checar("restaurar devolve o title", g("a1").getAttribute("title") === "Controle de Processos" && !g("a1").hasAttribute(ATRIBUTO_DICA));

  const parar = iniciarDicas(doc);
  checar("iniciar converte", !g("a1").hasAttribute("title"));
  parar();
  checar(
    "desligar devolve os titulos e nao deixa caixa",
    g("a1").getAttribute("title") === "Controle de Processos" && doc.querySelector("[data-spro-dica-caixa]") === null,
  );
  checar(
    "desligar devolve tambem o title do botao que tinha o tooltip do SEI",
    g("b1").getAttribute("title") === "Atribuir Processo" && g("f1").getAttribute("title") === "Fora da casca",
  );
}
