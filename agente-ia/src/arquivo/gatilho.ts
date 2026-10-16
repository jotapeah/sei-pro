/**
 * Quando o painel grava o arquivo do Agente, e os botões Exportar e Importar.
 *
 * O gatilho olha só as chaves do Agente que vão ao arquivo: as da própria
 * sincronia (status, diário, caixa dos segredos) ficam de fora, senão cada
 * sincronização agendaria a próxima; as de uso local (câmbio, gasto do dia,
 * baixados, aba aberta, cargo) não vão ao arquivo.
 */

import { MENSAGENS_ARQUIVO } from "@comum/sincronia/arquivo";
import { versaoMaisNova } from "@comum/sincronia/textoPadraoCodec";
import { CHAVE_COLECOES as CHAVE_COLECOES_FLUXOS } from "../fluxos/colecao";
import { CHAVE_FLUXOS, CHAVE_IGNORADOS } from "../fluxos/modelo";
import { CHAVE_CONECTORES } from "../mcp/conectores";
import { CHAVE_CONFIG } from "../painel/config";
import { CHAVE_MEMORIA } from "../painel/memoria";
import { CHAVE_REGRAS } from "../painel/regras";
import { CHAVE_ROTINAS } from "../painel/rotinas";
import { CHAVE_COLECOES, CHAVE_SKILLS } from "../painel/skills";
import type { AdaptadorAgente } from "./adaptador";
import { FORMATO, lerEnvelope, VERSAO } from "./envelope";
import { CHAVE_DIARIO, CHAVE_SEGREDOS, CHAVE_STATUS } from "./retrato";

/** O que, mudando no `chrome.storage.local`, precisa ir ao arquivo. */
export const CHAVES_DO_AGENTE: string[] = [
  CHAVE_CONFIG,
  CHAVE_MEMORIA,
  CHAVE_SKILLS,
  CHAVE_COLECOES,
  CHAVE_REGRAS,
  CHAVE_CONECTORES,
  CHAVE_ROTINAS,
  CHAVE_FLUXOS,
  CHAVE_IGNORADOS,
  CHAVE_COLECOES_FLUXOS,
];

const DA_SINCRONIA = new Set([CHAVE_STATUS, CHAVE_DIARIO, CHAVE_SEGREDOS]);
const DO_AGENTE = new Set(CHAVES_DO_AGENTE);

/** A mudança no local deve agendar a gravação do arquivo? Nunca para CHAVE_STATUS, CHAVE_DIARIO, CHAVE_SEGREDOS. */
export function deveAgendar(chavesMudadas: string[]): boolean {
  return chavesMudadas.some((k) => !DA_SINCRONIA.has(k) && DO_AGENTE.has(k));
}

export const NOME_DO_BACKUP = "sei-pro-agente.json";
export const MSG_NAO_E_BACKUP = "Este arquivo não é um backup do Agente do SEI Pro.";
export const MSG_IMPORTADO = "Backup importado: o que era mais novo no arquivo entrou; nada daqui foi apagado sem uma exclusão mais nova.";

/** O JSON do botão Exportar: o mesmo envelope que a sincronia gravaria. */
export async function exportarBackup(adaptador: AdaptadorAgente): Promise<string> {
  return JSON.stringify(await adaptador.exportarSemArquivo(), null, 2);
}

/** O botão Importar: mescla (nunca substitui) e devolve a mensagem para o usuário. */
export async function importarBackup(texto: string, adaptador: AdaptadorAgente): Promise<string> {
  let bruto: unknown;
  try {
    // O Bloco de Notas do Windows grava com BOM.
    bruto = JSON.parse(texto.charCodeAt(0) === 0xfeff ? texto.slice(1) : texto);
  } catch {
    return MSG_NAO_E_BACKUP;
  }
  // `lerEnvelope` aceitaria a versão mais nova; importá-la seria ler um formato que este SEI Pro não conhece.
  if (versaoMaisNova(bruto, FORMATO, VERSAO)) return MENSAGENS_ARQUIVO.maisNovo;
  const env = lerEnvelope(bruto);
  if (!env) return MSG_NAO_E_BACKUP;
  await adaptador.importar(env);
  return MSG_IMPORTADO;
}
