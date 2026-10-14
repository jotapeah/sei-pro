import assert from "node:assert/strict";
import { toolsBaixar, nomeDeArquivo, hashArquivo } from "../src/tools/baixar";
import { toolsMcp } from "../src/mcp/tools";
import { conteudoDoBaixado } from "../src/mcp/arquivo";
import type { Baixado } from "../src/painel/baixados";
import type { ContextoTool } from "../src/motor/tools";
import type { Conector } from "../src/mcp/conectores";
import type { ClienteMcp } from "../src/mcp/cliente";

export async function verificarArquivoRemoto(): Promise<void> {
  const nome = nomeDeArquivo({ titulo: "Anexo", numero: "123", nomeOriginal: "tecnico.PDF", tipo: "application/pdf", nomeLegivel: "Contrato de Cessão de Uso - Porto de Itaqui.pdf" });
  assert.equal(nome, "Contrato de Cessão de Uso - Porto de Itaqui (123).pdf");
  assert.throws(() => nomeDeArquivo({ titulo: "A", numero: "123", nomeOriginal: "a.pdf", tipo: "", nomeLegivel: "../outro.pdf" }));
  assert.ok(nomeDeArquivo({ titulo: "Anexo", numero: "123", nomeOriginal: "a.pdf", tipo: "", nomeLegivel: "x".repeat(300) }).length <= 120);
  const bytes = new TextEncoder().encode("%PDF-teste");
  const base64 = btoa(String.fromCharCode(...bytes));
  const sha256 = await hashArquivo(bytes);
  const meta = { numero: "123", titulo: "Anexo", processo: "50300.000001/2026-01", baixavel: true, arquivo: { nome: "a.pdf", tipo: "application/pdf", tamanho: bytes.length, base64 } };
  const transferido = { numero: meta.numero, processo: meta.processo, arquivo: meta.arquivo };
  let b: Baixado | undefined;
  const [baixar] = toolsBaixar({ salvar: async (a) => ({ id: 1, caminho: "C:/Downloads/" + a.destino, tamanho: bytes.length, tipo: a.tipo }), registrar: async (a) => { b = a; } });
  const ctx = { sinal: new AbortController().signal, sei: async () => meta, anonimizar: (s: string) => s } as unknown as ContextoTool;
  const args = { documento: "123", nome_arquivo: "Contrato de Cessão de Uso - Porto de Itaqui.pdf" };
  const previa = await baixar.previsualizar!(args, ctx);
  await assert.rejects(() => baixar.executar({ ...args, nome_arquivo: "Outro.pdf" }, { ...ctx, previa }), /aprovado/);
  const result = await baixar.executar(args, { ...ctx, previa }) as Record<string, unknown>;
  assert.equal(b?.nome, nome); assert.equal(b?.sha256, sha256); assert.equal(result.nome_arquivo, nome);
  const ctxTransferencia = { ...ctx, sei: async () => transferido } as unknown as ContextoTool;
  assert.equal(await conteudoDoBaixado(b!, ctxTransferencia), base64);
  await assert.rejects(() => conteudoDoBaixado({ ...b!, sha256: undefined }, ctx), /novamente/);
  await assert.rejects(() => conteudoDoBaixado({ ...b!, sha256: "alterado" }, ctx), /mudou/);

  const c: Conector = { id: "a", nome: "Arrendamento", ativo: true, url: "http://127.0.0.1:8765/mcp", auth: { tipo: "nenhuma" }, padrao: "sempre", permissoes: {}, consentido: true,
    tools: [{ nome: "arrendamento_enviar_arquivo", descricao: "Enviar anexo", esquema: { type: "object", properties: { conteudo_base64: {}, nome_arquivo: {} } } }] };
  let autorizou = true; let lidos = 0; let cartoes = 0; let chamadas = 0; let enviado: Record<string, unknown> = {};
  const [, chamar] = toolsMcp({ conectores: () => [c], guardar: async () => {}, arquivos: () => [b!.caminho], baixados: () => [b!], autorizado: async () => true,
    cliente: () => ({ iniciar: async () => {}, chamar: async (_n: string, a: Record<string, unknown>) => { chamadas++; enviado = a; return "ok"; } }) as unknown as ClienteMcp });
  const contexto = { ...ctx, consentirConector: async () => true, sei: async () => { lidos++; return transferido; }, ui: { aprovarExterno: async (a: { argumentos: Record<string, unknown> }) => {
    cartoes++; assert.equal(a.argumentos.conteudo_base64, undefined); assert.equal(lidos, 0); return { permitido: autorizou, sempre: true };
  } } } as unknown as ContextoTool;
  const pedido = { servidor: "Arrendamento", tool: "arrendamento_enviar_arquivo", argumentos: { id_contrato: 7, caminho_arquivo: b!.caminho, confirmar: false } };
  assert.equal(await chamar.executar(pedido, contexto), "ok");
  assert.equal(enviado.conteudo_base64, base64); assert.equal(enviado.nome_arquivo, nome); assert.equal(enviado.caminho_arquivo, ""); assert.equal(enviado.confirmar, false);
  assert.equal(cartoes, 1); assert.equal(chamadas, 1);
  c.url = "https://casa7.tail3c84be.ts.net/mcp";
  lidos = 0;
  assert.equal(await chamar.executar(pedido, contexto), "ok");
  assert.equal(enviado.caminho_arquivo, ""); assert.equal(enviado.conteudo_base64, base64);
  autorizou = false; lidos = 0;
  await chamar.executar(pedido, contexto);
  assert.equal(lidos, 0); assert.equal(chamadas, 2);
  console.log("Arquivo remoto: nome aprovado, integridade e transferência após consentimento OK.");
}
