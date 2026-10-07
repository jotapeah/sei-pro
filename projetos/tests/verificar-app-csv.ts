import { areaMemoria } from "@comum/armazenamento/area";
import type { ProjetoNaTela } from "../src/app/dados";
import { hashDaImpressao, lerImpressao, montarImpressao } from "../src/app/impressao";
import { csvDosProjetos, nomeDoCsv } from "../src/arquivo/csv";
import { resumoDoProjeto } from "../src/modelo/resumo";
import { telaDoApp, texto } from "./apoioApp";
import { ESCOPO_EU, ESCOPO_UN, novoRepo } from "./apoioRepositorio";
import { HOSTIL } from "./cenarioGantt";
import { etapa, fase, HOJE, projeto } from "./fabrica";
import { ganttFalso } from "./ganttFalso";
import { checar, secao, tique } from "./util";

export async function verificarAppCsv(): Promise<void> {
  secao("app: exportar planilha (CSV)");
  const etapas = [
    etapa({
      id: "e1",
      nome: "=SOMA(A1)",
      fase: "f1",
      inicio: "2026-09-01",
      fim: "2026-10-02",
      responsavel: { nome: "Carla Dias" },
      processo: { protocolo: "50300.009999/2026-01", sigiloso: true },
      etiquetas: ["AIR", "TI"],
      observacoes: 'Diz "sim"; depois',
    }),
    etapa({
      id: "m1",
      nome: HOSTIL,
      marco: true,
      inicio: "2026-12-03",
      fim: "2026-12-03",
      concluidaEm: "2026-12-03",
      documento: { numero: "1240001" },
    }),
  ];
  const p: ProjetoNaTela = {
    projeto: projeto({ id: "p1", nome: "Revisão", processo: { protocolo: "50300.001234/2026-11" } }),
    vis: "unidade",
    fases: [fase({ id: "f1", nome: "Instrução" })],
    etapas,
    resumo: resumoDoProjeto(etapas, HOJE),
  };
  const sig: ProjetoNaTela = {
    ...p,
    projeto: projeto({ id: "p2", nome: "Sigiloso", processo: { protocolo: "50300.000777/2026-77", sigiloso: true } }),
    vis: "eu",
    etapas: [etapa({ id: "x", projeto: "p2" })],
  };
  const csv = csvDosProjetos([p, sig], HOJE);
  const BOM = String.fromCharCode(0xfeff);
  const linhas = csv.slice(1).split("\r\n");
  checar(
    "cabecalho das colunas",
    linhas[0] ===
      "Projeto;Quem vê;Processo;Fase;Etapa;Marco;Responsável;Início;Término;Dias úteis;Situação;Progresso (%);Concluída em;Documento SEI;Etiquetas;Observações",
  );
  checar("BOM para o Excel", csv.startsWith(BOM));
  const l1 = linhas[1] ?? "";
  checar("formula neutralizada", l1.includes(";'=SOMA(A1);"));
  checar(
    "processo sigiloso da etapa sai em branco (nem o do projeto entra no lugar)",
    !l1.includes("50300.009999") && l1.startsWith("Revisão;Toda a unidade;;Instrução;"),
    l1,
  );
  checar("aspas e ponto e virgula protegidos", l1.endsWith(';AIR, TI;"Diz ""sim""; depois"'), l1);
  checar("datas, dias uteis, situacao e progresso", l1.includes(";01/09/2026;02/10/2026;23;Atrasada;0;;;"), l1);
  const l2 = linhas[2] ?? "";
  checar(
    "marco: 'sim', sem termino; texto hostil como texto",
    l2.includes(`;"${HOSTIL.replace(/"/g, '""')}";sim;`) && l2.includes(";03/12/2026;;0;Marco cumprido;100;03/12/2026;1240001;"),
    l2,
  );
  checar("processo sigiloso do projeto em branco", (linhas[3] ?? "").startsWith("Sigiloso;Só eu;;"));
  checar(
    "nome do arquivo sem acento nem espaco",
    nomeDoCsv("Revisão da Resolução nº 5.432", HOJE) === "projeto-revisao-da-resolucao-n-5-432-2026-10-06.csv" &&
      nomeDoCsv(null, HOJE) === "projetos-2026-10-06.csv",
  );

  secao("app: imprimir / salvar PDF");
  const par = { host: "sei.x.gov.br", login: "ana", unidade: "110", projeto: "todos", escala: "Mês" as const, lista: true };
  const hash = hashDaImpressao(par);
  checar("parametros no endereco e de volta", JSON.stringify(lerImpressao(hash)) === JSON.stringify(par));
  checar("endereco estranho nao imprime", lerImpressao("#modo=impressao&host=x") === null && lerImpressao("#modo=embutido") === null);
  const area = areaMemoria();
  const { repo: un } = novoRepo(ESCOPO_UN, area, "u");
  const { repo: eu } = novoRepo(ESCOPO_EU, area, "e");
  const pr = await un.criarProjeto({ nome: HOSTIL });
  await un.criarEtapa({ projeto: pr.id, nome: "Etapa A", inicio: "2026-10-05", fim: "2026-10-09" });
  await eu.criarProjeto({ nome: "Meu" });
  const doc = telaDoApp();
  const g = ganttFalso();
  let impresso = 0;
  await montarImpressao(
    doc.getElementById("app")!,
    { ...par, host: "sei.x.gov.br", login: "ana" },
    { repos: { unidade: un, eu }, hoje: HOJE, montarGantt: g.montar, imprimir: () => (impresso += 1) },
  );
  await tique(20);
  const app = doc.getElementById("app")!;
  checar(
    "Todos: titulo, Gantt so leitura e tabela",
    texto(app.querySelector("h1")) === "Projetos" &&
      g.opcoes()?.somenteLeitura === true &&
      app.querySelectorAll("tr.prj-tab-linha").length === 2,
  );
  checar("abre a impressao do navegador", impresso === 1);
  const doc2 = telaDoApp();
  await montarImpressao(
    doc2.getElementById("app")!,
    { ...par, projeto: pr.id, escala: "Semana" },
    { repos: { unidade: un, eu }, hoje: HOJE, montarGantt: ganttFalso().montar, imprimir: () => undefined },
  );
  const app2 = doc2.getElementById("app")!;
  checar(
    "projeto: nome hostil como texto e etapas na tabela",
    texto(app2.querySelector("h1")) === HOSTIL && !app2.querySelector("img") && texto(app2).includes("Etapa A"),
  );
  const doc3 = telaDoApp();
  await montarImpressao(
    doc3.getElementById("app")!,
    { ...par, projeto: "sumiu" },
    { repos: { unidade: un, eu }, hoje: HOJE, imprimir: () => undefined },
  );
  checar("projeto que nao existe: aviso", texto(doc3.getElementById("app")) === "Projeto não encontrado nesta unidade.");
  const sg = await un.criarProjeto({ nome: "Reservado", processo: { protocolo: "50300.000555/2026-55", sigiloso: true } });
  const doc4 = telaDoApp();
  await montarImpressao(
    doc4.getElementById("app")!,
    { ...par, projeto: sg.id },
    { repos: { unidade: un, eu }, hoje: HOJE, montarGantt: ganttFalso().montar, imprimir: () => undefined },
  );
  checar("impressao: processo sigiloso do projeto nao aparece", !texto(doc4.getElementById("app")).includes("50300.000555"));
}
