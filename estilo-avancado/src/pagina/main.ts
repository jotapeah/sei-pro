/**
 * Content script do Estilo Avançado 2 (mundo isolado, todos os frames, document_start).
 * Aplica o tema na primeira pintura pelo espelho síncrono, confirma pelo chrome.storage.sync
 * e acompanha mudanças (opções, esquema do sistema) sem recarregar a página.
 */

import { CHAVE_TEMA, type ConfigTema, esquemaResolvido, normalizarConfig } from "@comum/tema/config";
import baseCss from "../../estatico/base.css";
import cascaCss from "../../estatico/casca.css";
import { aplicarTema } from "./aplicar";
import { gravarCache, lerCache } from "./cache";
import { iniciarRemapeamento } from "./documentos";

const global = window as unknown as { __seiProEstilo2?: boolean };

if (!global.__seiProEstilo2) {
  global.__seiProEstilo2 = true;

  const consulta = typeof matchMedia === "function" ? matchMedia("(prefers-color-scheme: dark)") : null;
  let cfg: ConfigTema | null = null;

  // Telas que so mostram o corpo de um documento (leitura): so la o remapeamento de cores roda.
  // O editor e a edicao ficam de fora: o que ele grava nao pode carregar cor adaptada.
  const ehDocumentoDeLeitura = /[?&]acao=(documento_visualizar|documento_imprimir_web)\b/.test(location.search);
  let pararRemapeamento: (() => void) | null = null;

  const reaplicar = () => {
    if (!cfg) return;
    const sistemaEscuro = consulta?.matches ?? false;
    aplicarTema(document, cfg, sistemaEscuro, `${baseCss}\n${cascaCss}`);
    const querRemapear = ehDocumentoDeLeitura && cfg.ativo && cfg.escurecerDocumentos && esquemaResolvido(cfg, sistemaEscuro) === "escuro";
    if (querRemapear && !pararRemapeamento) {
      const ligar = () => {
        if (pararRemapeamento === null) return;
        pararRemapeamento = iniciarRemapeamento(document, { botao: true });
      };
      pararRemapeamento = () => {};
      if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", ligar, { once: true });
      else ligar();
    } else if (!querRemapear && pararRemapeamento) {
      pararRemapeamento();
      pararRemapeamento = null;
    }
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
