/**
 * Monta o link permanente de um processo ou documento. Parte so da origem e do
 * caminho ate `controlador.php` da base: a query (com o infra_hash, que expira
 * com a sessao) e o fragmento sao descartados, e o hash nunca e emitido.
 */
export function montarLink(base: string, idProcedimento: string, idDocumento?: string): string {
  const url = new URL(base);
  // Caminho ate o diretorio do SEI: tira um "controlador.php" final e barras sobrando.
  const diretorio = url.pathname.replace(/controlador\.php$/, "").replace(/\/+$/, "");
  let link = `${url.origin}${diretorio}/controlador.php?acao=procedimento_trabalhar&id_procedimento=${encodeURIComponent(idProcedimento)}`;
  if (idDocumento) link += `&id_documento=${encodeURIComponent(idDocumento)}`;
  return link;
}
