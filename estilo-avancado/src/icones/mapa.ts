/**
 * Qual desenho novo entra no lugar de cada ícone nativo do SEI (e do SEI Pro). A chave é o trecho do
 * `src` da imagem; o contexto diz onde ela aparece, porque o tamanho do ícone e o respiro mudam
 * (menu 24 px, barra superior 24 px, barras de ações 40 px, linhas de tabela 24 px).
 */
/** Tons semânticos (tokens --spro-tom-*, com variante clara e escura): a cor diferencia a função, como no SEI original. */
export type Tom = "perigo" | "azul" | "verde" | "ambar" | "laranja" | "roxo" | "rosa" | "ciano";

export type ContextoIcone = "menu" | "topo" | "barra" | "tabela";

export interface EntradaIcone {
  /** Trecho do `src` (casa com `img[src*="..."]`). */
  src: string;
  /** Nome no conjunto dos painéis (`ICONES`) ou em `ICONES_EXTRAS`. */
  icone: string;
  contexto: ContextoIcone;
  /** Seletor próprio (relativo ao escopo do contexto), para quem não tem um arquivo reconhecível no src (PNG embutido). */
  seletor?: string;
  /** Só aceita imagens da própria extensão (`src` começando por chrome-extension). */
  daExtensao?: boolean;
  /** Cor semântica do ícone; sem isto ele herda a cor do contexto. */
  tom?: Tom;
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
  b("processo_enviar", "enviar", { tom: "ciano" }),
  b("processo_atualizar_andamento", "atualizar", { tom: "ciano" }),
  b("processo_atribuir", "pessoaMais", { tom: "azul" }),
  b("bloco_incluir_protocolo", "blocoMais", { tom: "roxo" }),
  b("processo_sobrestar", "pausa", { tom: "ambar" }),
  b("processo_concluir", "concluir", { tom: "verde" }),
  b("anotacao_cadastro", "nota", { tom: "ambar" }),
  b("acompanhamento_especial_cadastro", "olho", { tom: "azul" }),
  b("documento_incluir", "documentoMais", { tom: "verde" }),
  b("marcador_adicionar", "etiquetaMais", { tom: "rosa" }),
  b("marcador_remover", "etiquetaMenos", { tom: "rosa" }),
  b("controle_prazo_gerenciar", "relogio", { tom: "ambar" }),
  b("credencial_consultar", "chave", { tom: "azul" }),
  b("comentario", "comentario", { tom: "ciano" }),
  b("documento_alterar", "documentoLupa", { tom: "azul" }),
  b("documento_editar_conteudo", "documentoLapis", { tom: "laranja" }),
  b("documento_assinar", "assinar", { tom: "roxo" }),
  b("documento_assinatura_externa", "link", { tom: "roxo" }),
  b("documento_gerar_pdf", "gerarPdf", { tom: "laranja" }),
  b("documento_modelo", "estrela", { tom: "ambar" }),
  b("documento_versoes", "historico", { tom: "azul" }),
  b("protocolo_excluir", "lixeira", { tom: "perigo" }),
  b("ciencia", "polegar", { tom: "ambar" }),
  b("documento_assinaturas_consultar", "selo", { tom: "roxo" }),
  b("documento_cancelar", "documentoX", { tom: "perigo" }),
  b("email_enviar", "email", { tom: "ciano" }),
  // Botões do SEI Pro nas barras de ações (imagens da extensão)
  b("favoritos", "alvo", { daExtensao: true, tom: "ambar" }),
  b("ferramentas_pdf", "pdf", { daExtensao: true, tom: "laranja" }),
  b("botpro_icon", "robo", { daExtensao: true, tom: "roxo" }),
  b("fluxos", "fluxo", { daExtensao: true, tom: "ciano" }),
  b("acao_lote", "camadas", { daExtensao: true, tom: "roxo" }),
  b("doc_lote", "documento", { daExtensao: true, tom: "verde" }),
  b("compare_doc", "duplicar", { daExtensao: true, tom: "ciano" }),
  // Historico de Processos Visitados na barra de acoes: icone embutido (data URI) com a marca <!--spro-historico-->
  { src: "spro-historico", icone: "historico", contexto: "barra", tom: "azul" },
  // Gerar Certidao de Documento Oficial: botao do SEI Pro com PNG embutido, so se acha pelo id do link
  { src: "#iconDocCertidao", seletor: "a#iconDocCertidao > img", icone: "certidao", contexto: "barra", tom: "verde" },
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
