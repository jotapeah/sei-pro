/**
 * Entrada de html/projetos.html. Liga o app ao navegador: <dialog>, download,
 * janela de impressão e a ponte com a aba do SEI. Modos, pelo hash da URL:
 * - embutido (padrão): iframe abaixo da lista do Controle de Processos, ligado
 *   à PRÓPRIA aba (o content script conecta a cada carga do iframe);
 * - impressao: página só leitura, aberta pelo menu "Imprimir / salvar PDF"
 *   (o endereço é validado em `lerImpressao`: qualquer um pode abri-lo);
 * - lateral: aba "Projetos" do painel lateral (P5).
 */

import { areaChrome } from "@comum/armazenamento/area";
import { idDispositivo } from "@comum/armazenamento/dispositivo";
import { hojeISO } from "@comum/datas/dias";
import { observarAltura } from "@comum/painel/altura";
import { emissorDeAvisoPelaPagina } from "@comum/painel/aviso";
import { sobreposicaoNoApp } from "@comum/painel/sobreposicao";
import { esperarConexaoDaAba } from "@comum/ponte/conexaoDaAba";
import type { Rpc } from "@comum/ponte/rpc";
import { definirEmissorDeAviso } from "@comum/ui/aviso";
import { baixar, criarAbrirModal, criarConfirmar } from "@comum/ui/dialogo";
import { h } from "@comum/ui/dom";
import { definirJanelaQueCresce } from "@comum/ui/flutuante";
import { escoposDaUnidade } from "../modelo/escopo";
import { CANAL_PROJETOS, type ContextoProjetos } from "../ponte/tipos";
import { RepositorioProjetos } from "../repositorio";
import { AppProjetos } from "./app";
import { hashDaImpressao, lerImpressao, montarImpressao } from "./impressao";
import { pedidosDaAba } from "./pedidos";

const html = document.documentElement;
const modo = new URLSearchParams(location.hash.slice(1)).get("modo") ?? "embutido";
html.dataset.modo = modo;
const raiz = document.getElementById("app")!;

// O que a aba pede ao app (pílula do título, "Abrir no painel" do P5): os tratadores entram na porta
// já; até o app ficar pronto, os pedidos esperam na fila.
const pedidos = pedidosDaAba();
// Embutido: o ouvinte da porta é registrado já, antes do `load` do iframe, que é quando o content script conecta.
const conexao = modo === "embutido" ? esperarConexaoDaAba(CANAL_PROJETOS, pedidos.tratadores) : null;

const erro = (texto: string) => raiz.replaceChildren(h("p", { class: "prj-erro" }, texto));
const mostrarErro = (e: unknown) => erro(`Não foi possível abrir os projetos: ${e instanceof Error ? e.message : String(e)}`);

if (modo === "impressao") void iniciarImpressao().catch(mostrarErro);
else if (conexao) void iniciarEmbutido(conexao).catch(mostrarErro);
else erro("Este modo do painel ainda não está disponível.");

async function iniciarEmbutido(conectar: Promise<Rpc>): Promise<void> {
  const rpc = await conectar;
  const ctx = await rpc.chamar<ContextoProjetos>("contexto");
  const unidade = ctx.unidade;
  if (!unidade) {
    erro("Abra o SEI numa unidade para ver os projetos.");
    return;
  }
  // Painel abaixo da lista: segue o SEI (modo noturno do SEI Pro e a cor da barra do sistema).
  html.dataset.tema = ctx.temaEscuro ? "escuro" : "claro";
  if (ctx.corTema) {
    html.style.setProperty("--spro-cor-sei", ctx.corTema);
    html.dataset.corSei = "";
  }
  const altura = observarAltura(rpc);
  // A lista de um seletor ou menu aberto perto do fim do painel: o iframe cresce até ela caber.
  addEventListener("spro-popover", (ev) => altura.extra(Number((ev as CustomEvent<{ fundo?: number }>).detail?.fundo) || 0));
  definirJanelaQueCresce(() => html.dataset.sobreposto !== "sim");
  // Diálogo no meio da tela visível: a aba põe o iframe por cima de tudo enquanto há diálogo aberto.
  const sobrepor = sobreposicaoNoApp(rpc, altura);
  // Aviso no rodapé da TELA do SEI (o do iframe ficaria lá embaixo, fora da vista).
  definirEmissorDeAviso(emissorDeAvisoPelaPagina(rpc));
  const area = areaChrome(chrome.storage.local, "local");
  const dispositivo = await idDispositivo(area);
  const carimbo = () => ({ agora: Date.now(), dispositivo, por: ctx.login, nome: ctx.nome });
  const esc = escoposDaUnidade(ctx.host, ctx.login, unidade.id);
  const abrirModal = criarAbrirModal({ aoAbrir: sobrepor.abrir, aoFechar: sobrepor.fechar });
  const app = new AppProjetos({
    raiz,
    ctx,
    area,
    repos: { unidade: new RepositorioProjetos(area, esc.unidade, carimbo), eu: new RepositorioProjetos(area, esc.eu, carimbo) },
    rpc,
    abrirModal,
    confirmar: criarConfirmar(abrirModal),
    baixar,
    hoje: () => hojeISO(),
    agora: () => Date.now(),
    imprimir: (p) => void window.open(chrome.runtime.getURL(`html/projetos.html${hashDaImpressao(p)}`), "_blank"),
    aoRedesenhar: () => altura.medir(),
  });
  await app.iniciar();
  pedidos.pronto(app);
  let espera: ReturnType<typeof setTimeout> | undefined;
  addEventListener("resize", () => {
    clearTimeout(espera);
    espera = setTimeout(() => app.aoRedimensionar(), 200);
  });
}

async function iniciarImpressao(): Promise<void> {
  // Papel é claro: os tokens da base valem no tema claro (fundo branco), seja qual for o do sistema.
  html.dataset.tema = "claro";
  const p = lerImpressao(location.hash);
  if (!p) {
    erro("Endereço de impressão incompleto ou inválido.");
    return;
  }
  const area = areaChrome(chrome.storage.local, "local");
  const esc = escoposDaUnidade(p.host, p.login, p.unidade);
  // Só leitura: o carimbo nunca grava nada.
  const leitura = () => ({ agora: Date.now(), dispositivo: "impressao" });
  await montarImpressao(raiz, p, {
    repos: { unidade: new RepositorioProjetos(area, esc.unidade, leitura), eu: new RepositorioProjetos(area, esc.eu, leitura) },
    hoje: hojeISO(),
    imprimir: () => window.print(),
  });
  // O nome do PDF sugerido pelo navegador vem do título.
  document.title = raiz.querySelector("h1")?.textContent || "Projetos";
}
