/**
 * O app de uma unidade no painel lateral, como o `MontagemLateral` pede
 * (`criar`): o MESMO `ligarApp` do painel embutido, em `modo: "lateral"` — a
 * mesma `Colaboracao` (sincronia, faixas, menu), o mesmo Proxy do "Entendi"
 * antes de gravar em "Toda a unidade" e o mesmo arquivo ligado. Sem impressão
 * (o Gantt completo é o do painel) e sem o tema do SEI (o lateral segue o
 * sistema, como os Favoritos).
 *
 * O que é de cada montagem fica com ela: os diálogos que o app abriu fecham
 * quando ele desmonta (um formulário ou o "Entendi" da unidade velha não fica
 * por cima dos projetos da unidade nova, nem grava nela depois), e a primeira
 * contagem de cada montagem vai para a aba do painel.
 */

import type { Area } from "@comum/armazenamento/area";
import type { DataISO } from "@comum/datas/dias";
import type { Rpc } from "@comum/ponte/rpc";
import { type AbrirModal, criarConfirmar } from "@comum/ui/dialogo";
import { CHAVE_CONTADOR_PAINEL, TETO_CONTADOR_PAINEL } from "../../modelo/constantes";
import type { Carimbo } from "../../modelo/tipos";
import type { ContextoProjetos } from "../../ponte/tipos";
import type { ArquivoLigado, DepsColaboracao } from "../colaboracao/colaboracao";
import { ligarApp } from "../ligacao";
import type { AppDoLateral } from "./montagem";

/** O navegador do lateral (o main.ts põe o chrome.storage, os diálogos e o seletor de arquivo). */
export interface NavegadorDoLateral {
  raiz: HTMLElement;
  /** chrome.storage.local (dados, contador) e chrome.storage.sync (consentimentos). */
  area: Area;
  sync: Area;
  abrirModal: AbrirModal;
  baixar(nome: string, conteudo: string, tipo: string): void;
  escolherArquivo: DepsColaboracao["escolherArquivo"];
  hoje(): DataISO;
  agora(): number;
  /** Id deste navegador (`idDispositivo`), no carimbo de cada gravação. */
  dispositivo: string;
  copias: DepsColaboracao["copias"];
  /** O arquivo ligado do usuário da aba; null onde o navegador não deixa escolher arquivo. */
  arquivo(ctx: ContextoProjetos, carimbo: () => Carimbo): ArquivoLigado | null;
}

/**
 * Os diálogos de UMA montagem: `fecharTodos` fecha os que ainda estão abertos (quem espera a resposta recebe o
 * "fechou", como no X: a confirmação responde "não", o "Entendi" responde "Agora não"). Depois disso nada mais
 * abre: um diálogo pedido pelo app que já saiu fecha na hora, sem aparecer.
 */
export function modaisDaVez(abrir: AbrirModal): { abrirModal: AbrirModal; fecharTodos(): void } {
  const abertos = new Set<{ fechar(): void }>();
  let encerrada = false;
  return {
    abrirModal: (o) => {
      if (encerrada) {
        queueMicrotask(() => o.aoFechar?.());
        return { fechar: () => undefined };
      }
      let controle: { fechar(): void } | null = null;
      const este = { fechar: () => controle?.fechar() };
      abertos.add(este);
      controle = abrir({
        ...o,
        aoFechar: () => {
          abertos.delete(este);
          o.aoFechar?.();
        },
      });
      return este;
    },
    fecharTodos: () => {
      encerrada = true;
      for (const m of [...abertos]) m.fechar();
      abertos.clear();
    },
  };
}

/**
 * O contador da aba "Projetos" do painel (`projetos/contadorPainel`): grava só quando muda, como inteiro de 0 até o
 * teto do selo (o shell mostra de 1 ao teto; 0 tira o número). Um por montagem: a primeira contagem da unidade
 * nova sempre grava (o content script de outra unidade pode ter gravado no meio). Gravação recusada tenta de novo
 * na próxima contagem, mesmo igual.
 */
export function gravadorDoContador(area: Area, teto = TETO_CONTADOR_PAINEL): (n: number) => void {
  let gravado: number | null = null;
  return (n) => {
    if (!Number.isFinite(n)) return;
    const v = Math.min(teto, Math.max(0, Math.trunc(n)));
    if (v === gravado) return;
    gravado = v;
    void area.gravar({ [CHAVE_CONTADOR_PAINEL]: v }).catch(() => {
      if (gravado === v) gravado = null;
    });
  };
}

/** O `criar` do `MontagemLateral`: o app da unidade do contexto pelo `ligarApp`, com o RPC desta montagem. */
export function criarAppDoLateral(n: NavegadorDoLateral): (ctx: ContextoProjetos, rpc: Pick<Rpc, "chamar">) => Promise<AppDoLateral> {
  return async (ctx, rpc) => {
    const modais = modaisDaVez(n.abrirModal);
    const carimbo = (): Carimbo => ({ agora: n.agora(), dispositivo: n.dispositivo, por: ctx.login, nome: ctx.nome });
    let ligado: Awaited<ReturnType<typeof ligarApp>>;
    try {
      ligado = await ligarApp({
        raiz: n.raiz,
        ctx,
        area: n.area,
        sync: n.sync,
        rpc,
        abrirModal: modais.abrirModal,
        confirmar: criarConfirmar(modais.abrirModal),
        baixar: n.baixar,
        escolherArquivo: n.escolherArquivo,
        hoje: n.hoje,
        agora: n.agora,
        carimbo,
        copias: n.copias,
        arquivo: n.arquivo(ctx, carimbo),
        // Sem `imprimir`: o menu do lateral não tem a impressão.
        modo: "lateral",
        aoContar: gravadorDoContador(n.area),
      });
    } catch (e) {
      modais.fecharTodos();
      throw e;
    }
    const { app, colab } = ligado;
    return {
      focarProjeto: (id, etapa) => app.focarProjeto(id, etapa),
      aoGanharFoco: () => colab.aoGanharFoco(),
      destruir: () => {
        // Primeiro o app (a resposta "não" de um diálogo fechado agora não redesenha nada), depois os diálogos.
        ligado.destruir();
        modais.fecharTodos();
      },
    };
  };
}
