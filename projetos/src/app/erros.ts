/**
 * Mensagens de erro das ações do app. A gravação no `chrome.storage.local`
 * recusada por falta de espaço (spec 9) vira uma explicação com o que fazer,
 * em vez do texto cru do navegador ("QUOTA_BYTES quota exceeded").
 */

export const TEXTO_COTA_CHEIA = "O espaço do navegador para o SEI Pro está cheio. Arquive ou exclua projetos antigos.";

/** O navegador recusou a gravação por cota: Chrome diz "QUOTA_BYTES quota exceeded"; outros, `QuotaExceededError`. */
export function cotaCheia(e: unknown): boolean {
  const x = e as { name?: unknown; message?: unknown } | null;
  const texto = `${typeof x?.name === "string" ? x.name : ""} ${typeof x?.message === "string" ? x.message : typeof e === "string" ? e : ""}`;
  return /quota/i.test(texto);
}
