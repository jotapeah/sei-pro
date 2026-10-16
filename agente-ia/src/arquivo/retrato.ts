/**
 * O retrato real do Agente neste navegador: ler tudo o que vai ao arquivo e
 * gravar de volta o que a mescla mudou.
 *
 * A mescla (`envelope.ts`) é pura; aqui fica só a leitura e a gravação, atrás
 * de `FontesRetrato`, para o adaptador ser testado com fontes em memória.
 *
 * As listas voltam pelas funções `guardar*` de cada armazenamento, que já
 * espelham no `storage.sync` — o que veio do arquivo propaga como qualquer
 * edição. A configuração vai direto ao `chrome.storage.local`: o painel a relê
 * pelo `storage.onChanged`.
 */

import { listarColecoesDeFluxos, guardarColecoesDeFluxos } from "../fluxos/colecao";
import { guardarFluxos, guardarIgnorados, listarFluxos, listarIgnorados } from "../fluxos/modelo";
import { guardarConectores, listarConectores } from "../mcp/conectores";
import { CHAVE_CONFIG, configPadrao } from "../painel/config";
import { gravarVarias, todas, type ConversaSalva } from "../painel/historico";
import type { Config } from "../painel/main";
import { guardarMemoria, listarMemoria } from "../painel/memoria";
import { guardarRegras, listarRegras } from "../painel/regras";
import { guardarRotinas, listarRotinas } from "../painel/rotinas";
import { guardarColecoes, guardarSkills, listarColecoes, listarSkills } from "../painel/skills";
import { TIPOS, type Diario, type Retrato, type TipoLista } from "./envelope";

/** O diário da mescla (o hash de cada registro como foi ao arquivo). Só deste computador. */
export const CHAVE_DIARIO = "agenteIA_arquivoDiario";
/** A caixa "Incluir chave de API e tokens" (boolean). Só deste computador: não vai ao sync nem ao arquivo. */
export const CHAVE_SEGREDOS = "agenteIA_arquivoSegredos";
/** O `StatusArquivo` da última sincronização. */
export const CHAVE_STATUS = "agenteIA_arquivoStatus";

export interface FontesRetrato {
  lerRetrato(): Promise<Retrato>;
  /** Grava o que mudou de `antes` para `depois`. */
  aplicar(antes: Retrato, depois: Retrato): Promise<void>;
  lerDiario(): Promise<Diario>;
  gravarDiario(d: Diario): Promise<void>;
  /** A caixa "Incluir chave de API e tokens" deste computador. */
  segredos(): Promise<boolean>;
}

type ListaSemConversas = Exclude<TipoLista, "conversas">;

export interface Mudancas {
  config: boolean;
  ignorados: boolean;
  /** As listas (fora as conversas) que mudaram. */
  listas: ListaSemConversas[];
  /** Conversas novas ou alteradas, e os ids das que saíram. */
  conversas: { novas: ConversaSalva[]; removidas: string[] };
}

const igual = (a: unknown, b: unknown): boolean => JSON.stringify(a) === JSON.stringify(b);

/** O que gravar para o local passar de `antes` a `depois`. */
export function mudancas(antes: Retrato, depois: Retrato): Mudancas {
  const listas = TIPOS.filter((t): t is ListaSemConversas => t !== "conversas" && !igual(antes.listas[t], depois.listas[t]));
  const velhas = new Map(antes.listas.conversas.map((c) => [c.id, c]));
  const ficam = new Set(depois.listas.conversas.map((c) => c.id));
  return {
    config: !igual(antes.config, depois.config),
    ignorados: !igual(antes.ignorados, depois.ignorados),
    listas,
    conversas: {
      novas: depois.listas.conversas.filter((c) => !igual(velhas.get(c.id), c)),
      removidas: [...velhas.keys()].filter((id) => !ficam.has(id)),
    },
  };
}

const GRAVAR: { [T in ListaSemConversas]: (lista: Retrato["listas"][T]) => Promise<void> } = {
  skills: guardarSkills,
  colecoes: guardarColecoes,
  regras: guardarRegras,
  memoria: guardarMemoria,
  rotinas: guardarRotinas,
  conectores: guardarConectores,
  fluxos: guardarFluxos,
  colecoesFluxos: guardarColecoesDeFluxos,
};

/** As fontes de verdade: `chrome.storage.local` e o histórico no IndexedDB. */
export function fontesDoNavegador(): FontesRetrato {
  return {
    async lerRetrato() {
      const salvo = (await chrome.storage.local.get(CHAVE_CONFIG))[CHAVE_CONFIG] as Partial<Config> | undefined;
      const [skills, colecoes, regras, memoria, rotinas, conectores, fluxos, colecoesFluxos, ignorados, conversas] = await Promise.all([
        listarSkills(),
        listarColecoes(),
        listarRegras(),
        listarMemoria(),
        listarRotinas(),
        listarConectores(),
        listarFluxos(),
        listarColecoesDeFluxos(),
        listarIgnorados(),
        // Sem `catch`: histórico indisponível derruba a sincronização, em vez
        // de parecer "todas as conversas apagadas" e virar lápide.
        todas(),
      ]);
      return {
        config: { ...configPadrao(), ...salvo },
        ignorados,
        listas: { skills, colecoes, regras, memoria, rotinas, conectores, fluxos, colecoesFluxos, conversas },
      };
    },
    async aplicar(antes, depois) {
      const m = mudancas(antes, depois);
      for (const t of m.listas) await (GRAVAR[t] as (l: unknown) => Promise<void>)(depois.listas[t]);
      if (m.ignorados) await guardarIgnorados(depois.ignorados);
      await gravarVarias(m.conversas.novas, m.conversas.removidas);
      if (m.config) await chrome.storage.local.set({ [CHAVE_CONFIG]: depois.config });
    },
    async lerDiario() {
      const d = (await chrome.storage.local.get(CHAVE_DIARIO))[CHAVE_DIARIO] as Diario | undefined;
      return d && typeof d === "object" ? d : {};
    },
    async gravarDiario(d) {
      await chrome.storage.local.set({ [CHAVE_DIARIO]: d });
    },
    async segredos() {
      return (await chrome.storage.local.get(CHAVE_SEGREDOS))[CHAVE_SEGREDOS] === true;
    },
  };
}
