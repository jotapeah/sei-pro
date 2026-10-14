# Estilo Avançado 2: fundação do tema (sub-projeto 1 de 4)

Data: 2026-10-14 · Escopo: pacote novo `estilo-avancado/`, módulo `sei-comum/src/tema/`, seção "Aparência" em `dist/html/options.*`, entradas no `dist/manifest.json` (Lab MV3 apenas)

## Objetivo

Substituir, aos poucos, o Estilo Avançado artesanal (`dist/css/sei-slim.css`, 190 KB, 423 regras `dark-mode` escritas à mão, CSS injetado em strings dentro de `sei-functions-pro.js`) por um sistema em TypeScript baseado em tokens `--spro-*`, o mesmo das telas novas (controle, Favoritos, Demandas, Projetos, Histórico, Opções). Quem usar o novo vê o SEI inteiro coerente com essas telas, escolhe a cor da barra superior e tem um modo escuro feito do jeito correto, inclusive no corpo dos documentos.

Este spec cobre só a **fundação**. O trabalho todo se divide em quatro sub-projetos, cada um com spec, plano e entrega próprios:

| # | Sub-projeto | Entrega |
|---|---|---|
| 1 | **Fundação do tema** (este spec) | Modelo de configuração, paleta, tokens, aplicação em todos os frames, remapeamento de cores, tela de configuração, folha base mínima (barra, fundo, texto, links, tabelas, campos, botões) |
| 2 | Casca do SEI | Barra superior completa, menu, árvore, barra de ações |
| 3 | Telas nativas | Controle de processos, formulários, tabelas, diálogos jQuery UI/Bootstrap |
| 4 | Editor e documentos | CK4/CK5, visualizador e "Ver original" refinado |

O sub-projeto 1 já entrega algo visível e testável: a cor da barra escolhida pelo usuário, o claro/escuro/automático e o corpo dos documentos legível no escuro.

## Decisões do usuário (14/10/2026)

1. **Convivência:** o antigo continua intacto; o novo é opção separada ("Estilo Avançado 2"), primeiro só no Lab MV3 (como Favoritos e Projetos). O antigo some só quando o novo cobrir tudo.
2. **Cor da barra:** paletas prontas mais seletor de cor livre; o sistema deriva texto legível, hover e destaque.
3. **Modo escuro:** claro, escuro e automático (segue o sistema). O escuro vale **inclusive para o conteúdo dos documentos e o editor**.
4. **Técnica do escuro:** tokens para a interface e remapeamento adaptativo de luminosidade (preserva matiz) para cores inline de documentos, com "Ver original" para conferir antes de assinar. Descartados: filtro de inversão (distorce cores) e dois temas escritos à mão (repete o modelo atual).

## Não negociável

- **Nada de recurso externo**: sem Google Fonts nem CDN. Fontes do sistema (`--spro-fonte`). Aba Network sem host de terceiros (política de privacidade e auditoria da 2.2.2).
- **DOM seguro (Firefox)**: nada de `innerHTML` com dados. A folha entra como `textContent` de um `<style>` criado por DOM API; atributos por `setAttribute`.
- **JS sob `dist/` só com ASCII** (acentos como `\uXXXX`); o `build.mjs` confere byte a byte, como o do Favoritos.
- **Sem flash branco**: o tema é aplicado em `document_start`.
- **Compatibilidade**: SEI 4.1.5 e SEI 5.0.4; páginas principais, árvore, visualização e diálogos (iframes). O documento assinado/gravado **nunca** é alterado: o remapeamento é só de exibição.
- **Não mexer no legado**: `sei-slim.css`, `seiSlim`, `darkModePro` e o popup "Cor Principal do Layout" seguem como estão.

## 1. Modelo de configuração

Chave `spro_tema` em `chrome.storage.sync` (poucos bytes; a cota do `storage.sync` foi medida em `reference_cota_storage_sync`):

```ts
interface ConfigTema {
  versao: 1;
  ativo: boolean;              // "Estilo Avançado 2" ligado; padrão false
  modo: "claro" | "escuro" | "auto";   // padrão "auto"
  paleta: string;              // id de paleta pronta, ou "livre"
  corBarra: string;            // #RRGGBB (resolvida da paleta ou escolhida)
  escurecerDocumentos: boolean; // padrão true (decisão 3)
}
```

- Normalização defensiva (`normalizarConfig`): valor ausente, tipo errado, hex inválido ou versão desconhecida caem no padrão. Nunca lança.
- Fica fora do `dataValues` (que tem limite de 8 KB e perfis) para não competir com as opções antigas.
- O leitor faz `chrome.storage.sync.get("spro_tema")` e assina `storage.onChanged` (com `areaChrome`, para o mapeamento `newValue`→`novo` já corrigido).
- Não há migração automática do `seiSlim`/`colorSlimPro`: o novo é opt-in. A tela de configuração oferece "Usar a cor atual do Estilo Avançado" quando existir `colorSlimPro`.

## 2. Paleta (`sei-comum/src/tema/paleta.ts`)

Funções puras, sem DOM, testáveis em `sei-comum/tests`.

- Conversão sRGB ⇄ OKLCH (`paraOklch`, `deOklch`) e contraste WCAG (`contraste(a, b)`).
- `derivarBarra(corBase, esquema)` devolve `{ barra, texto, hover, borda, destaque }`:
  - `texto`: branco ou quase-preto (`#14181d`), o que atingir **contraste ≥ 4,5:1** sobre `barra`; se nenhum atingir, ajusta a luminosidade da barra (matiz e croma preservados) até atingir.
  - `hover`: barra com L ± 0,05 (clareia no escuro, escurece no claro).
  - `borda`: barra com L − 0,08.
  - `destaque`: cor de ação do conteúdo (botão primário, link, seleção), derivada do matiz da barra com L/C ajustados para ≥ 4,5:1 contra `--spro-fundo` do esquema. Cinza e cor sem croma caem no azul padrão do SEI Pro (`#1f5fbf`/`#79acff`).
  - No esquema escuro, a barra tem L reduzido (teto 0,42) e croma reduzido a 85%, para não ofuscar; o matiz é mantido.
- Paletas prontas (`PALETAS`, 10): SEI Pro (azul `#1f5fbf`), Oceano `#0b6e99`, Floresta `#1f7a4d`, Esmeralda `#0e7c66`, Grafite `#3a4350`, Vinho `#8a2a43`, Roxo `#5b43b8`, Âmbar `#a85d00`, Ardósia `#475c7a`, Preto `#14181d`. Cada uma tem `id`, `nome` e `cor`.
- `corLivre`: qualquer `#RRGGBB`; cores com contraste impossível (amarelo `#ffff00`) são ajustadas pela regra de `texto`, e a tela de configuração mostra "Ajustamos o tom para manter o texto legível".

## 3. Tokens e aplicação

### 3.1 Tokens (`sei-comum/src/tema/tokens.ts`)

`gerarFolha(cfg, esquema): string` produz o texto CSS. Reaproveita os nomes de `sei-comum/src/ui/base.css` (`--spro-fundo`, `--spro-fundo-2`, `--spro-fundo-3`, `--spro-pagina`, `--spro-texto`, `--spro-suave`, `--spro-borda`, `--spro-destaque`, `--spro-raio*`, `--spro-sombra-*`, `--spro-anel`) para que componentes novos funcionem sem mudança, e acrescenta:

`--spro-barra`, `--spro-barra-texto`, `--spro-barra-hover`, `--spro-barra-borda`.

O escuro redefine as superfícies em camadas (`pagina` < `fundo` < `fundo-2` < `fundo-3`), não inverte. Os valores escuros são os de `base.css` (`#141619`, `#1a1d21`, `#22262b`, `#2b3036`), para o SEI e as telas novas terem o mesmo escuro.

### 3.2 Aplicação (`estilo-avancado/src/pagina/aplicar.ts`)

- Injeta **um** `<style data-spro-tema>` no `<head>` (ou em `documentElement` se o `<head>` ainda não existir em `document_start`), com `textContent` = tokens + folha base (§6).
- Marca o `<html>` com `data-spro-tema="claro|escuro"` (esquema resolvido) e `style.colorScheme`, para controles nativos e barras de rolagem acompanharem.
- `modo: "auto"`: `matchMedia("(prefers-color-scheme: dark)")` com listener; o esquema muda em tempo real.
- `ativo: false`: remove o `<style>`, o atributo e o remapeamento; zero rastro.
- **Supressão do legado:** com `ativo`, o content script define `data-spro-tema-ativo` no `<html>`; a folha base prefixa `:root[data-spro-tema-ativo]` e usa especificidade suficiente para vencer `.seiSlim` sem `!important` espalhado. O `loadStyleDesign` do legado continua a funcionar se o usuário tiver os dois ligados; a tela de configuração avisa e o novo prevalece. (A remoção do legado quando o novo está ativo é decidida no sub-projeto 2, quando a casca estiver coberta.)

### 3.3 Frames

O content script `js/init_estilo.js` roda em **todos os frames** (`all_frames: true`, `document_start`), nos mesmos `matches` de `init_favoritos.js`. Cada frame lê a configuração e aplica sozinho; mudanças chegam por `storage.onChanged`. Iframes criados depois recebem o tema ao carregar. Sem `postMessage` entre frames.

## 4. Remapeamento de cores de documentos (`sei-comum/src/tema/adaptar.ts` + `estilo-avancado/src/pagina/documentos.ts`)

Objetivo: no esquema escuro, o corpo de documentos e o editor ficam legíveis **sem mudar o significado das cores** (vermelho continua vermelho; realce continua realce).

- **Núcleo puro** (`adaptarCor(css, papel, esquema)`): converte a cor para OKLCH e devolve outra com o mesmo matiz e croma (limitado ao gamut) e luminosidade reposta:
  - `papel: "texto"`: L alvo = `1 − L` mapeado para [0,62; 0,95]; garante contraste ≥ 4,5:1 contra o fundo escuro do documento.
  - `papel: "fundo"`: L alvo = mapeado para [0,18; 0,34], preservando a ordem relativa (branco → mais escuro; cinza `#ccc` → camada visivelmente distinta; amarelo de realce → amarelo escuro e saturado, ainda reconhecível como realce).
  - Preto e branco puros: preto de texto → `#e7e9ec`; branco de fundo → `--spro-fundo`.
  - Transparente e `inherit` passam inalterados.
- **Aplicação** (módulo de página): percorre o conteúdo do documento (`#divInfraAreaTelaD`, corpo do `iframe` de visualização, `body` do editor CK4/CK5), lê `getComputedStyle` dos elementos que têm `style` inline, atributo `bgcolor`/`color` ou `<font>`, e grava a cor adaptada como **variável própria** (`--spro-orig-cor`, `--spro-orig-fundo` guardam a original) e atributo `data-spro-adaptado`. A cor original nunca é sobrescrita no DOM do documento; o "Ver original" (§4.1) só remove o atributo.
- **Exclusões:** `img`, `canvas`, `svg` de conteúdo, `iframe` de PDF e QR code ficam intactos.
- **Dinâmico:** `MutationObserver` em lote (`requestIdleCallback`, fallback `setTimeout`), com teto de 400 elementos por ciclo, para não travar documentos grandes.
- **Documento aberto para edição:** o conteúdo salvo pelo editor **não** carrega as cores adaptadas (variáveis e atributo ficam de fora do `getData`); testado explicitamente no CK4 (SP) e CK5 (MJ).

### 4.1 "Ver original"

Botão na barra do visualizador (e no editor) com ícone `sun`: alterna o documento para fundo branco e cores originais enquanto estiver ativo, por documento, sem persistir. Rótulo "Ver original (como será assinado)". Com `escurecerDocumentos: false`, o remapeamento não roda e o botão não aparece.

## 5. Tela de configuração

Seção "Aparência" na página de opções (schema declarativo da `opcoes-redesign`), só no build Lab (`options.*`), com:

- toggle "Estilo Avançado 2 (novo)" e aviso "Experimental: pode ser combinado com o Estilo Avançado antigo, mas o novo prevalece";
- segmentado Claro / Escuro / Automático;
- grade das 10 paletas (botões de cor com `aria-pressed`, nome acessível) mais o seletor livre (`<input type="color">`), com a cor derivada de texto exibida na prévia;
- toggle "Escurecer também o conteúdo dos documentos";
- **prévia ao vivo** (miniatura de barra + cartão + tabela + botão) usando o mesmo `gerarFolha`, em Shadow DOM ou `data-` escopado;
- "Restaurar padrão" e "Usar a cor atual do Estilo Avançado" (quando houver `colorSlimPro`).

A página roda de três jeitos (aba própria, popup, iframe de 800 px no SEI): layout responsivo, foco visível, operação por teclado, `prefers-reduced-motion`.

## 6. Folha base (escopo mínimo desta etapa)

Cobre o suficiente para a cor da barra e o escuro serem demonstráveis no SEI real sem quebrar telas; o refinamento é dos sub-projetos 2 a 4.

- **Barra superior** (`#divInfraBarraSistema*`, `.infraBarraSistema`, `.infraCorBarraSistema`, `#divInfraBarraSuperior`): fundo `--spro-barra`, texto/ícones `--spro-barra-texto`, hover `--spro-barra-hover`, borda inferior `--spro-barra-borda`.
- **Página:** fundo `--spro-pagina`, texto `--spro-texto`, `color-scheme`.
- **Links** (`a`, `.ancoraPadraoAzul`): `--spro-destaque`.
- **Tabelas** (`table.infraTable`, `.infraTrClara/Escura`, `th`): superfícies em camadas, borda `--spro-borda`.
- **Campos** (`input`, `select`, `textarea`, `.infraText`, `.infraSelect`, `.chosen-container`): fundo `--spro-fundo`, borda `--spro-borda-forte`, anel de foco `--spro-anel`.
- **Botões** (`.infraButton`, `button`): primário `--spro-destaque`/`--spro-destaque-texto`, raio `--spro-raio`.
- **Diálogos** (`.ui-dialog`, `.modal-content`): superfície `--spro-fundo`, sombra `--spro-sombra-3`.
- **Barras de rolagem**: `scrollbar-color` por `--spro-borda-forte`.

Seletores são levantados no SEI 4.1.5 e no 5.0.4 (fontes locais em `/Users/phs/Documents/Git/ANTAQ/SEI`, ler com `grep -a`). A folha vive em `estilo-avancado/estatico/base.css` e entra no bundle como texto (`loader: text`).

## 7. Estrutura de arquivos

| Caminho | Responsabilidade |
|---|---|
| `sei-comum/src/tema/paleta.ts` | OKLCH, contraste, `derivarBarra`, `PALETAS` |
| `sei-comum/src/tema/config.ts` | `ConfigTema`, `normalizarConfig`, padrões |
| `sei-comum/src/tema/tokens.ts` | `gerarFolha(cfg, esquema)` |
| `sei-comum/src/tema/adaptar.ts` | `adaptarCor` (puro) |
| `estilo-avancado/src/pagina/main.ts` | content script: lê config, aplica, assina mudanças |
| `estilo-avancado/src/pagina/aplicar.ts` | `<style>`, atributos, `matchMedia` |
| `estilo-avancado/src/pagina/documentos.ts` | remapeamento no DOM, observer, "Ver original" |
| `estilo-avancado/src/opcoes/main.ts` | seção "Aparência" |
| `estilo-avancado/estatico/base.css` | folha base |
| `estilo-avancado/build.mjs` | gera `dist/js/init_estilo.js`, `dist/js/estilo-avancado/opcoes.js`, confere ASCII |
| `dist/manifest.json` | content script (`all_frames`, `document_start`) e `web_accessible_resources`, **só no Lab** |

O pacote segue o padrão do Favoritos (`package.json`, `tsconfig.json` com alias `@comum/*`, `biome.json`, `tests/`).

**Fora do release oficial e do Firefox nesta etapa:** `manifest_seipro*.json`, `manifest_v2.json` e whitelabels ficam sem alteração. A opção só aparece no Lab MV3 (Chrome/Edge).

## 8. Verificação

1. **Unitários** (`npm run verificar` em `sei-comum` e `estilo-avancado`):
   - `paleta`: para 2.000 cores aleatórias mais as 10 prontas, em claro e escuro, `contraste(texto, barra) ≥ 4,5` e `contraste(destaque, fundo) ≥ 4,5`; round-trip OKLCH ≤ 1/255; cinza cai no azul padrão.
   - `config`: lixo, tipos errados e versão futura normalizam sem lançar.
   - `tokens`: a folha contém todos os tokens, nenhum `undefined`, sem URL externa (`url(http`, `@import`).
   - `adaptar`: tabela de cores reais de documentos do SEI (`#ccc`, vermelho `#ff0000`, azul `#0000ff`, amarelo de realce `#ffff00`, preto e branco): contraste ≥ 4,5 de texto sobre o fundo escuro, matiz preservado (± 6°), ordem relativa dos fundos preservada.
   - `aplicar` (linkedom): cria um único `<style>`, `ativo:false` não deixa rastro, `auto` reage ao `matchMedia`.
2. **Estático:** `tsc --noEmit`, `biome check`, byte não-ASCII nos bundles (falha o build), manifest válido (JSON e chaves).
3. **Harness no Chrome real** (extensão carregada em perfil limpo; `reference_mcp_chrome_extensao`):
   - **SEI SP de Treinamento (4.1.5, CK4)** e **SEI MJ de homologação (5.0.4, CK5)**; o usuário faz o login e a troca de unidade (`reference_sei_sp_treinamento`, `reference_sei_mj_homologacao`; **nunca** produção do MJ).
   - Roteiro: ligar o Estilo Avançado 2; trocar paleta e cor livre (barra muda, texto legível); alternar claro/escuro/auto (com emulação de `prefers-color-scheme`); conferir barra, tabela do controle, formulário, diálogo, árvore, visualização de documento com tabela de fundo cinza e texto colorido; "Ver original"; editar um documento no editor (CK4 e CK5), salvar e confirmar que o HTML gravado **não** contém as cores adaptadas; recarregar e conferir ausência de flash; desligar e confirmar zero rastro.
   - Prints e GIF de cada etapa; Network sem hosts de terceiros; console sem erros novos.
4. **Regressão:** com o Estilo Avançado 2 desligado, o SEI renderiza byte a byte igual ao de antes (mesma comparação de DOM e de estilos computados nas páginas do roteiro).

## 9. Riscos e mitigação

| Risco | Mitigação |
|---|---|
| Documento escuro induz a assinar sem ver direito | "Ver original" visível; remapeamento só de exibição; nada é gravado |
| Vazamento das cores adaptadas ao salvar no editor | Variáveis e atributo fora do `getData`; teste explícito CK4/CK5 |
| Cores inline do SEI que ninguém previu | Remapeamento por estilo computado (não por classe); tabela de cores reais nos testes |
| Disputa de especificidade com `.seiSlim` | Prefixo `:root[data-spro-tema-ativo]`; avisar quando os dois estão ligados |
| Desempenho em documentos grandes | Lote com teto, `requestIdleCallback`, observer só no contêiner do conteúdo |
| Flash branco | `document_start`, leitura síncrona do último valor em `localStorage` (espelho `spro_tema_cache`) para a primeira pintura, `storage.sync` confirma em seguida |
| Firefox/DOMPurify | Fora desta etapa; só DOM API desde já, para a portabilidade futura |

## 10. Fora de escopo

- Visual completo da casca, telas nativas e editor (sub-projetos 2 a 4).
- Remover ou migrar o `sei-slim.css` e o popup antigo.
- Release oficial, Firefox e whitelabels.
- Fontes personalizadas e ajuste de densidade.
