import { readFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { checar, secao } from "./util";

const DIST = resolve(dirname(fileURLToPath(import.meta.url)), "..", "..", "dist");

interface ScriptDeConteudo {
  js?: string[];
  matches?: string[];
  exclude_matches?: string[];
  all_frames?: boolean;
  run_at?: string;
}

export async function verificarManifest(): Promise<void> {
  secao("manifest Lab e legado");
  const m = JSON.parse(await readFile(join(DIST, "manifest.json"), "utf8")) as {
    content_scripts: ScriptDeConteudo[];
    web_accessible_resources: Array<{ resources: string[] }>;
  };
  const de = (arquivo: string) => m.content_scripts.find((c) => c.js?.length === 1 && c.js[0] === arquivo);
  const novo = de("js/init_projetos.js");
  const historico = de("js/init_historico.js");
  checar(
    "content script novo com os mesmos matches do historico, todos os frames, document_start",
    !!novo &&
      !!historico &&
      JSON.stringify(novo.matches) === JSON.stringify(historico.matches) &&
      JSON.stringify(novo.exclude_matches) === JSON.stringify(historico.exclude_matches) &&
      novo.all_frames === true &&
      novo.run_at === "document_start",
  );
  const war = m.web_accessible_resources.flatMap((w) => w.resources);
  checar(
    "pagina, app e CSS acessiveis ao iframe",
    ["html/projetos.html", "js/projetos/app.js", "css/projetos.css"].every((r) => war.includes(r)),
  );
  const init = await readFile(join(DIST, "js", "init.js"));
  const texto = init.toString("utf8");
  checar(
    "init.js: legado so sem o modulo novo ou com servidor do Atividades",
    texto.includes("hasAttribute('data-seipro-projetos')") &&
      texto.includes("configBasePro_atividades") &&
      texto.includes('getUrlExtension("js/sei-pro-projetos.js")'),
  );
  checar(
    "init.js continua so ASCII",
    init.every((b) => b <= 0x7f),
  );
  const legado = await readFile(join(DIST, "js", "sei-pro-projetos.js"));
  checar("legado vira 'Projetos (Atividades)' quando os dois aparecem", legado.toString("utf8").includes("'Projetos (Atividades)'"));
  checar(
    "sei-pro-projetos.js continua so ASCII",
    legado.every((b) => b <= 0x7f),
  );
}
