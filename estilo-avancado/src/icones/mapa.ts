/**
 * Qual desenho novo entra no lugar de cada ícone nativo do SEI (e do SEI Pro). A chave é o trecho do
 * `src` da imagem; o contexto diz onde ela aparece, porque o tamanho do ícone e o respiro mudam
 * (menu 24 px, barra superior 24 px, barras de ações 40 px, linhas de tabela 24 px).
 */
export type ContextoIcone = "menu" | "topo" | "barra" | "tabela";

export interface EntradaIcone {
  /** Trecho do `src` (casa com `img[src*="..."]`). */
  src: string;
  /** Nome no conjunto dos painéis (`ICONES`) ou em `ICONES_EXTRAS`. */
  icone: string;
  contexto: ContextoIcone;
  /** Só aceita imagens da própria extensão (`src` começando por chrome-extension). */
  daExtensao?: boolean;
  /** Cor semântica do ícone; sem isto ele herda a cor do contexto. */
  tom?: "perigo";
}

const m = (src: string, icone: string): EntradaIcone => ({ src: `menu/${src}.svg`, icone, contexto: "menu" });
const t = (src: string, icone: string): EntradaIcone => ({ src: `${src}.svg`, icone, contexto: "topo" });
const tb = (src: string, icone: string, extra: Partial<EntradaIcone> = {}): EntradaIcone => ({
  src: `svg/${src}.svg`,
  icone,
  contexto: "tabela",
  ...extra,
});
const b = (src: string, icone: string, extra: Partial<EntradaIcone> = {}): EntradaIcone => ({
  src: `${src}.svg`,
  icone,
  contexto: "barra",
  ...extra,
});

export const MAPA_ICONES: EntradaIcone[] = [
  // Menu lateral
  m("acompanhamento_especial", "olho"),
  m("administracao", "engrenagem"),
  m("base_conhecimento", "livro"),
  m("blocos", "camadas"),
  m("contatos", "pessoas"),
  m("controle_prazo", "relogio"),
  m("controle_processos", "lista"),
  m("favoritos", "estrela"),
  m("grupos", "pessoas"),
  m("iniciar_processo", "pastaMais"),
  m("inspecao_administrativa", "escudoCheck"),
  m("marcadores", "etiqueta"),
  m("painel_controle", "painel"),
  m("pesquisa", "busca"),
  m("pontos_controle", "bandeira"),
  m("processos_sobrestados", "pausa"),
  m("reabertura_programada", "historico"),
  m("relatorios", "planilha"),
  m("retorno_programado", "retorno"),
  m("texto_padrao", "documento"),
  m("infra", "codigo"),
  // Barra superior
  t("menu_pontos_topo", "menu"),
  t("pesquisa_rapida", "busca"),
  t("controle_processos_barra", "lista"),
  t("painel_controle_barra", "painel"),
  t("novidades", "megafone"),
  t("acessibilidade_topo", "acessibilidade"),
  t("configuracao", "engrenagem"),
  t("usuario_topo", "pessoa"),
  t("sair", "saida"),
  // Barras de ações do Controle e do processo
  b("processo_enviar", "enviar"),
  b("processo_atualizar_andamento", "atualizar"),
  b("processo_atribuir", "pessoaMais"),
  b("bloco_incluir_protocolo", "blocoMais"),
  b("processo_sobrestar", "pausa"),
  b("processo_concluir", "concluir"),
  b("anotacao_cadastro", "nota"),
  b("acompanhamento_especial_cadastro", "olho"),
  b("documento_incluir", "documentoMais"),
  b("marcador_adicionar", "etiquetaMais"),
  b("marcador_remover", "etiquetaMenos"),
  b("controle_prazo_gerenciar", "relogio"),
  b("credencial_consultar", "chave"),
  b("comentario", "comentario"),
  b("documento_alterar", "lapis"),
  b("documento_assinar", "escudoCheck"),
  b("documento_assinatura_externa", "link"),
  b("documento_gerar_pdf", "gerarPdf"),
  b("documento_modelo", "estrela"),
  b("documento_versoes", "historico"),
  b("protocolo_excluir", "lixeira", { tom: "perigo" }),
  b("ciencia", "polegar"),
  b("documento_assinaturas_consultar", "selo"),
  b("documento_cancelar", "documentoX", { tom: "perigo" }),
  b("email_enviar", "email"),
  // Botões do SEI Pro nas barras de ações (imagens da extensão)
  b("favoritos", "alvo", { daExtensao: true }),
  b("ferramentas_pdf", "pdf", { daExtensao: true }),
  b("botpro_icon", "robo", { daExtensao: true }),
  b("fluxos", "fluxo", { daExtensao: true }),
  b("acao_lote", "camadas", { daExtensao: true }),
  b("doc_lote", "documento", { daExtensao: true }),
  b("compare_doc", "duplicar", { daExtensao: true }),
  // Ações das linhas das tabelas (consultar, alterar, desativar, excluir...) e paginação
  tb("consultar", "olho"),
  tb("pre_visualizar", "olho"),
  tb("alterar", "lapis"),
  tb("desativar", "desativar"),
  tb("excluir", "lixeira", { tom: "perigo" }),
  tb("clonar", "duplicar"),
  tb("valores", "lista"),
  tb("historico", "historico"),
  tb("check", "check"),
  tb("federacao", "mapa"),
  tb("paginacao_anterior", "paginaAnterior"),
  tb("paginacao_proxima", "seta"),
  tb("paginacao_primeira", "paginaPrimeira"),
  tb("paginacao_ultima", "paginaUltima"),
];

/**
 * Itens que o SEI Pro injeta no menu lateral: não são <img> e sim <svg> inline com glifo preenchido,
 * então a troca é pelo id do link (o desenho vira a máscara do próprio <svg>).
 */
export const MAPA_MENU_PRO: { id: string; icone: string }[] = [
  { id: "seiProAgenteMenu", icone: "robo" },
  { id: "pesquisaLinkPermanentePro", icone: "link" },
  { id: "historicoProcessosPro", icone: "historico" },
  { id: "ferramentasPdfPro", icone: "pdf" },
  { id: "processosLotePro", icone: "camadas" },
];
