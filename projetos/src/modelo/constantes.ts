/** Limites da spec 5.4 e chaves de armazenamento da spec 5.1. */

export const LIMITES = {
  nome: 200,
  checklistItens: 50,
  checklistTexto: 200,
  etiquetas: 10,
  etiquetaTexto: 40,
  observacoes: 2000,
  projetosAtivos: 100,
  etapasPorProjeto: 300,
  historico: 300,
  modelos: 50,
} as const;

/**
 * Relógio de outro computador adiantado que a mesclagem ainda aceita (1 dia). Carimbo além disso é
 * recusado: venceria toda edição até o relógio daqui alcançá-lo, e a lápide nunca seria limpa.
 */
export const FOLGA_RELOGIO_MS = 86_400_000;

/** Lápides: a unidade tem usuários eventuais, que não podem ressuscitar exclusões (spec 6.1). */
export const DIAS_LAPIDE_UNIDADE = 180;
export const DIAS_LAPIDE_EU = 90;

/** Etapa nova pela última linha da lista: duração em dias úteis (spec 3.1). */
export const DIAS_ETAPA_NOVA = 5;

/** Valor do filtro de fase para as etapas sem fase (nenhum id real começa com "__"). */
export const SEM_FASE = "__sem__";

export const PREFIXO = "projetos/";
export const CHAVE_PREFERENCIAS = "projetos/preferencias";
export const CHAVE_CONTADOR_PAINEL = "projetos/contadorPainel";
export const CHAVE_LATERAL = "projetos/lateralAberto";
export const chaveSyncTexto = (chaveDoEscopo: string): string => `projetos/sync/tp/${chaveDoEscopo}`;
export const chaveSyncArquivo = (host: string, login: string): string => `projetos/sync/arquivo/${host}|${login.trim().toLowerCase()}`;
export const chaveUsuarios = (host: string, idUnidade: string): string => `projetos/usuarios/${host}|u:${idUnidade}`;
export const chaveImportacao = (host: string, login: string): string => `projetos/importacao/${host}|${login.trim().toLowerCase()}`;
/**
 * Memória local do sigilo do usuário (modelo/memoriaSigilo.ts), para todos os escopos dele: uma chave por
 * número, `projetos/sigilo/<host>|<login>/p/<chave do processo>` e `.../d/<número do documento>`, com a
 * origem no valor. Fora de todo escopo (`baseDoEscopo`): nem a exportação, nem o arquivo, nem a sincronia
 * a leem como dado.
 */
export const prefixoMemoriaSigilo = (host: string, login: string): string => `projetos/sigilo/${host}|${login.trim().toLowerCase()}/`;
/** A chave única da memória na rodada 2 (antes das entradas por número): só lida, nunca gravada. */
export const chaveMemoriaSigiloLegada = (host: string, login: string): string => `projetos/sigilo/${host}|${login.trim().toLowerCase()}`;
