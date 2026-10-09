# Resultado do roteiro automatizado (09/10/2026)

Chrome for Testing 151 + puppeteer-core, extensão carregada de `dist/` (HEAD `0937081`+), opção "Gerenciar Projetos" ligada.
SP = treinamento.sei.sp.gov.br (4.1.5, CK4), unidade TESTE. MJ = **hmlsei.mj.gov.br** (5.0.4, CK5), unidade TESTE.
Os scripts ficaram no scratchpad da sessão (não versionados). Dados de teste apagados nos dois SEIs.

## Passos do `roteiro-teste.md`

| Passo | SP 4.1.5 | MJ 5.0.4 |
|---|---|---|
| 1 Ligar a opção; 2 painel no Controle | OK | OK |
| 3 Criar projeto (Só eu, com processo); 4 etapas (atrasada, marco) + pílula "1 atrasada" | OK | OK |
| 5 Gantt/Lista/Dia/Semana/Mês/Hoje sem erro | OK | OK |
| 6 Concluir e reabrir etapa (percentual e contagem mudam) | OK | OK |
| 7-8 Caixa: ícone só no processo ligado, balão com etapas | OK | OK |
| 9 Árvore: ícone + faixa "Etapa atrasada · projeto" | OK | OK |
| 10 Concluir com documento (combo vem da árvore já aberta) | OK | OK |
| 11 Lateral: aba Projetos com contador | OK | OK (com uma só aba SEI na janela) |
| 12-13 Agenda (Todas/Só as minhas, cartão, ações) e mini-Gantt | OK | Agenda OK; mini-Gantt não repetido |
| 14 Troca de unidade (TESTE → TESTE_1_1 → TESTE): lateral remonta, contador acompanha a unidade | OK | não testado |
| 15 Duas janelas: pedido de aba de uma janela não troca a outra (`painelAba` com `janela`) | OK | não testado |
| 16 "Entendi": nada vai ao Texto Padrão antes; depois cria `[_SEIPRO_PRJ_UNIDADE]` (1 linha) | OK | OK |
| 17 Outro computador (simulado apagando o `storage.local`): "Toda a unidade" volta do Texto Padrão; "Só eu" não | OK | não testado |
| 18 Sigiloso: Texto Padrão leva `protocolo:""`, `sigiloso:true`; na tela outro "computador" mostra "Processo sigiloso" | OK | não testável (sem processo sigiloso na caixa da TESTE) |
| 19 CSV com processo em branco; "Enviar projeto por arquivo" sem o número; Agente omite o projeto sigiloso | OK | não testado |
| 20 Limpeza (local + Texto Padrão) | feita | feita |

## Achados (nenhum bloqueia; decidir)

1. **Escala Semana: os rótulos "Setembro" e "Outubro" se sobrepõem** no cabeçalho do Gantt quando o mês muda no meio da semana (visual; SP e MJ).
2. **Árvore, "Abrir no painel": 3 mensagens `abrirPainel` por um clique** (vistas no service worker, tab/frames iguais). Inofensivo (todas gravam a mesma aba), mas indica 3 ligações do clique ou 3 instâncias do balão.
3. **Agente (`projetos_listar`) omite o projeto sigiloso inteiro** ("1 projeto sigiloso omitido") em vez de listá-lo sem o número. Mais restritivo que a spec 7 (que diz "sigilosos fora, só contados"); está de acordo, mas o usuário não vê o nome do projeto.
4. **Lateral no MJ: "A conexão com a aba do SEI caiu"** apareceu uma vez, com várias abas SEI de hosts diferentes e 5 abas de painel na mesma janela; após fechar as abas extras e recarregar, funcionou. Não reproduzido em ambiente limpo; vale repetir à mão.
5. "Abrir no painel" do balão da caixa (SP): o painel embutido ficou visível, mas não confirmei a rolagem (scrollY ficou em 0 com o painel já em tela).
6. O `Hash inválido` do SEI aparece se a URL do Controle for montada à mão (foi o meu script, não a extensão): sempre usar o link do menu.

## Fora do teste

- Chave do OpenRouter lida do `.env` do Eutropio (a pedido do autor) só para o passo do Agente (custo R$ 0,24); zerada do perfil de teste ao final. O modelo do `.env` do Eutropio NÃO foi usado (ficou o padrão da extensão).
- Não criei processo nenhum no SEI; só abri processos existentes.
