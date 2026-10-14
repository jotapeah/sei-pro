import { CONFIG_PADRAO, esquemaResolvido, normalizarConfig } from "../src/tema/config";
import { gerarFolha } from "../src/tema/tokens";
import { checar, secao } from "./util";

export function verificarTema(): void {
  secao("tema/config");
  for (const lixo of [null, undefined, "", "{", "texto", 42, [], { versao: 9 }, { versao: "1" }]) {
    const c = normalizarConfig(lixo);
    checar(`lixo ${JSON.stringify(lixo)} -> padrao`, JSON.stringify(c) === JSON.stringify(CONFIG_PADRAO));
  }
  const c1 = normalizarConfig({
    versao: 1,
    ativo: true,
    modo: "escuro",
    paleta: "floresta",
    corBarra: "#ff0000",
    escurecerDocumentos: false,
  });
  checar("paleta pronta vence a cor", c1.corBarra === "#1f7a4d" && c1.paleta === "floresta");
  checar("campos validos preservados", c1.ativo && c1.modo === "escuro" && !c1.escurecerDocumentos);
  const c2 = normalizarConfig({ versao: 1, paleta: "livre", corBarra: "#AABBCC" });
  checar("cor livre em minuscula", c2.paleta === "livre" && c2.corBarra === "#aabbcc");
  const c3 = normalizarConfig({ versao: 1, paleta: "livre", corBarra: "vermelho", modo: "roxo", ativo: "sim" });
  checar("cor/modo invalidos caem no padrao", c3.corBarra === CONFIG_PADRAO.corBarra && c3.modo === "auto" && c3.ativo === false);
  checar("aceita JSON em string", normalizarConfig(JSON.stringify({ versao: 1, ativo: true })).ativo === true);
  checar("auto segue o sistema", esquemaResolvido(CONFIG_PADRAO, true) === "escuro" && esquemaResolvido(CONFIG_PADRAO, false) === "claro");
  checar(
    "claro/escuro ignoram o sistema",
    esquemaResolvido({ ...CONFIG_PADRAO, modo: "claro" }, true) === "claro" &&
      esquemaResolvido({ ...CONFIG_PADRAO, modo: "escuro" }, false) === "escuro",
  );

  secao("tema/tokens");
  for (const esq of ["claro", "escuro"] as const) {
    const css = gerarFolha(CONFIG_PADRAO, esq, "/*base*/");
    for (const t of [
      "--spro-barra",
      "--spro-barra-texto",
      "--spro-barra-hover",
      "--spro-barra-borda",
      "--spro-fundo",
      "--spro-pagina",
      "--spro-texto",
      "--spro-borda",
      "--spro-destaque",
      "--spro-anel",
      "--spro-raio",
    ])
      checar(`${esq}: define ${t}`, css.includes(`${t}:`));
    checar(`${esq}: sem undefined/NaN`, !/undefined|NaN/.test(css));
    checar(
      `${esq}: sem recurso externo`,
      !/@import|url\(\s*["']?https?:|\/\/[a-z0-9.-]+\.[a-z]{2,}/i.test(css.replace(/\/\*[\s\S]*?\*\//g, "")),
    );
    checar(`${esq}: color-scheme`, css.includes(`color-scheme: ${esq === "escuro" ? "dark" : "light"}`));
    checar(`${esq}: inclui a folha base depois dos tokens`, css.endsWith("/*base*/"));
  }
  const esc = gerarFolha(CONFIG_PADRAO, "escuro");
  checar(
    "escuro usa as superficies de base.css",
    ["#141619", "#1a1d21", "#22262b", "#2b3036"].every((c) => esc.includes(c)),
  );
}
