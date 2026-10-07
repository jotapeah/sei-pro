/**
 * O que o app do painel pede à aba do SEI (spec 7). Só o content script tem a
 * página: o cabeçalho (contexto), a caixa já carregada, a pesquisa rápida. Abrir
 * processo ou documento é o mesmo gesto do usuário. O que escreve no SEI (P4) é
 * só a sincronia dos Textos Padrão dos projetos (pagina/sincronia.ts), a pedido
 * do app ("Sincronizar agora", "Desligar e apagar do SEI" do texto pessoal).
 */

import { abrirProcesso } from "@comum/pagina/abrir";
import type { AvisarComAcoes, AvisarNaPagina } from "@comum/painel/aviso";
import { tratadoresDoPainel } from "@comum/painel/embutido";
import type { Sobreposicao } from "@comum/painel/sobreposicao";
import { ErroRpc, type Tratador } from "@comum/ponte/rpc";
import { lerCaixaDaPagina } from "@nucleo/dominio/caixa";
import { paginaDe } from "@nucleo/sessao/pagina";
import type { ContextoProjetos, DocumentoConferido, ProcessoDaCaixa, UsuarioDaUnidade } from "../ponte/tipos";
import type { ProjetosDoAtividades } from "./atividades";
import type { ResultadoSincronizar } from "./sincronia";

export interface DepsExecutor {
  doc: Document;
  ctx: ContextoProjetos;
  iframe: HTMLIFrameElement | null;
  sobreposicao?: Sobreposicao | null;
  avisar?: AvisarNaPagina | null;
  avisarAcoes?: AvisarComAcoes | null;
  usuarios(): Promise<UsuarioDaUnidade[]>;
  conferir(numero: string): Promise<DocumentoConferido | null>;
  /** P4: a sincronia por Texto Padrão desta aba (só na janela de topo, com unidade). */
  sincronia?: { agora(): Promise<ResultadoSincronizar>; apagarPessoal(): Promise<boolean> } | null;
  /** P4: os projetos do servidor do Atividades (só com servidor configurado). */
  atividades?: (() => Promise<ProjetosDoAtividades>) | null;
}

const SEM_SINCRONIA = "A sincronia pelo Texto Padrão só funciona numa tela do SEI com unidade.";

/** Os processos da página da caixa que está na tela (sem requisição). */
export function processosDaCaixa(doc: Document): ProcessoDaCaixa[] {
  try {
    return lerCaixaDaPagina(paginaDe(doc)).map((p) => {
      // O número como o SEI escreve, sem os espaços das pontas (o app ainda confere a forma).
      const item: ProcessoDaCaixa = { protocolo: p.protocolo.trim(), idProcedimento: p.idProcedimento.trim(), sigiloso: p.sigiloso };
      if (p.tipo) item.tipo = p.tipo;
      // Especificação de processo sigiloso não sai da aba (o núcleo já a deixa vazia; aqui de novo).
      if (!p.sigiloso && p.especificacao) item.especificacao = p.especificacao;
      return item;
    });
  } catch {
    return [];
  }
}

export function tratadoresProjetos(d: DepsExecutor): Record<string, Tratador> {
  return {
    contexto: () => d.ctx,
    // altura, sobrepor e aviso: os de todo painel embutido (sei-comum).
    ...tratadoresDoPainel(d),
    abrirProcesso: (args) => {
      const a = (args ?? {}) as { id?: unknown; protocolo?: unknown; novaAba?: unknown };
      return abrirProcesso(d.doc, String(a.id ?? ""), String(a.protocolo ?? ""), a.novaAba === true);
    },
    // Documento: a pesquisa rápida com o número SEI, numa aba nova (a tela atual fica).
    abrirDocumento: (args) => {
      const n = String((args as { numero?: unknown } | null)?.numero ?? "").replace(/\D/g, "");
      if (!n) throw new ErroRpc("ARGUMENTO_INVALIDO", "Informe o número SEI do documento.");
      return abrirProcesso(d.doc, "", n, true);
    },
    conferirDocumento: (args) => d.conferir(String((args as { numero?: unknown } | null)?.numero ?? "")),
    processosDaCaixa: () => processosDaCaixa(d.doc),
    usuariosDaUnidade: () => d.usuarios(),
    atividadesDisponivel: () => d.ctx.atividades,
    // P4: os dois textos (o pessoal só se ligado); o resultado volta ao app, que conferiu a forma.
    sincronizarAgora: () => {
      if (!d.sincronia) throw new ErroRpc("SEM_SINCRONIA", SEM_SINCRONIA);
      return d.sincronia.agora();
    },
    // Só o texto pessoal: o da unidade é de todos e não tem "apagar".
    apagarDoSei: () => {
      if (!d.sincronia) throw new ErroRpc("SEM_SINCRONIA", SEM_SINCRONIA);
      return d.sincronia.apagarPessoal();
    },
    importarAtividades: () => {
      if (!d.atividades) throw new ErroRpc("SEM_ATIVIDADES", "Não há servidor do Atividades configurado neste SEI.");
      return d.atividades();
    },
  };
}
