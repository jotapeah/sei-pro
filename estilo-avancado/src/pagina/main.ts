/**
 * Content script do Estilo Avançado 2 (mundo isolado, todos os frames, document_start).
 * Aplica o tema na primeira pintura pelo espelho síncrono, confirma pelo chrome.storage.sync
 * e acompanha mudanças (opções, esquema do sistema) sem recarregar a página.
 */

import { CHAVE_TEMA, type ConfigTema, normalizarConfig } from "@comum/tema/config";
import baseCss from "../../estatico/base.css";
import { aplicarTema } from "./aplicar";
import { gravarCache, lerCache } from "./cache";

const global = window as unknown as { __seiProEstilo2?: boolean };

if (!global.__seiProEstilo2) {
  global.__seiProEstilo2 = true;

  const consulta = typeof matchMedia === "function" ? matchMedia("(prefers-color-scheme: dark)") : null;
  let cfg: ConfigTema | null = null;

  const reaplicar = () => {
    if (cfg) aplicarTema(document, cfg, consulta?.matches ?? false, baseCss);
  };

  cfg = lerCache(localStorage);
  reaplicar();

  consulta?.addEventListener("change", reaplicar);

  const receber = (valor: unknown) => {
    cfg = normalizarConfig(valor);
    gravarCache(localStorage, cfg);
    reaplicar();
  };

  chrome.storage.sync
    .get(CHAVE_TEMA)
    .then((r) => receber(r[CHAVE_TEMA]))
    .catch((e) => console.warn("[SEI Pro] estilo avancado 2:", e));

  chrome.storage.onChanged.addListener((mudancas, area) => {
    if (area === "sync" && mudancas[CHAVE_TEMA]) receber(mudancas[CHAVE_TEMA].newValue);
  });
}
