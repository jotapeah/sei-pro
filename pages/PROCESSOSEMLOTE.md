# [![Home](../img/home.png)](../) |  SEI Pro ![Icone](../img/icon-32.png)

## ![SEI Pro Processos em Lote](../img/icon-acoeslote.png) Processos em Lote

Essa ferramenta abre vários processos de um mesmo tipo de uma só vez, a partir de uma lista de especificações colada pelo usuário ou de uma quantidade informada.

> ![Tela Processos em Lote](../img/tela-processosemlote.png)

Serve para quando é preciso abrir dezenas de processos iguais — um por servidor, um por contrato, um por município — e abrir cada um à mão levaria a tarde inteira.

O acesso é feito pelo link **Processos em Lote**, no menu à esquerda do SEI. O link só aparece se a opção correspondente estiver marcada na tela de configurações da extensão.

### ⚠️ Antes de usar

> A abertura de processos em lote gera uma sequência longa de requisições ao servidor. Em alguns órgãos isso deixa o SEI lento **para todos os usuários**, não apenas para quem está executando a ferramenta.
>
> Recomenda-se executá-la **fora do horário comercial**, em blocos menores, aumentando a pausa entre processos caso perceba lentidão. Na dúvida, alinhe previamente com a área de tecnologia do seu órgão.

Os processos são abertos **na unidade que estiver selecionada** no momento da execução.

### Como usar

1. Selecione no SEI a unidade em que os processos devem ser abertos e clique em **Processos em Lote**, no menu à esquerda;

2. Na tela de configuração, informe:

> **Tipo de processo** — o mesmo tipo será usado em todos os processos da rodada;
>
> **Nível de acesso** — Público ou Restrito. Ao escolher Restrito, é obrigatório indicar a hipótese legal, que é carregada a partir do formulário real daquele tipo de processo;
>
> **Especificações** — uma por linha. É possível colar diretamente uma coluna de planilha. Cada linha gera um processo, e o texto é limitado a 100 caracteres, como no formulário do próprio SEI;
>
> **Quantidade** — usada apenas quando a caixa de especificações estiver vazia, para abrir N processos sem especificação;
>
> **Pausa entre um processo e outro** — em milissegundos, com mínimo de 200. Quanto maior a pausa, menor o impacto no servidor.

3. Na tela de confirmação, revise a quantidade, o tipo, o nível de acesso e o tempo estimado. Depois de iniciada, a execução não desfaz os processos já criados;

4. Durante a execução é exibido o progresso, com contagem de falhas e um botão para cancelar. **Não feche a janela nem navegue na aba** enquanto a rodada estiver em andamento;

5. Ao final, é apresentada uma tabela com o número de cada processo criado, a especificação correspondente, um link de acesso e a mensagem de erro das linhas que falharam. A tabela pode ser copiada ou baixada em CSV pelos botões no cabeçalho.

### Observações

> Linhas que falham não interrompem a execução: o erro é registrado na tabela final e a ferramenta segue para a próxima. Assim, basta reprocessar as linhas com erro.
>
> Assuntos e interessados recebem o padrão definido para o tipo de processo escolhido, não sendo possível preenchê-los individualmente por esta ferramenta.
>
> O limite é de 2.000 processos por rodada. Demandas maiores devem ser divididas em blocos.

## No SEI Pro Lab: nova versão

O SEI Pro Lab traz uma versão reescrita desta ferramenta. Nos demais pacotes, continua valendo a descrição acima. A versão nova funciona assim:

### Prévia antes de criar

Ao colar a lista, o SEI Pro mostra uma prévia e só cria os processos depois da sua confirmação. A prévia aponta:

> - linhas **repetidas**, com um botão para remover as repetidas;
> - linhas **vazias**, que são ignoradas;
> - especificações **cortadas em 100 caracteres**, que é o limite do SEI;
> - **caracteres trocados** (por exemplo, aspas e travessões vindos do Word), destacados na linha.

### Colunas coladas da planilha

É possível colar direto do Excel ou do Google Planilhas. A tabulação separa as colunas, nesta ordem: **especificação**, **interessado**, **observação** e **nível de acesso**. O cabeçalho é opcional e é reconhecido automaticamente.

### Retomar de onde parou

O lote fica salvo enquanto é executado. Se a janela for fechada ou a página recarregada, ao reabrir a ferramenta são oferecidas as opções **Continuar de onde parou** ou **Descartar**. Quando o lote parece estar rodando em outra aba, o SEI Pro avisa, para que o mesmo lote não seja executado em duplicidade.

### Ritmo, pausa e minimizar

A pausa entre um processo e outro se adapta sozinha ao tempo de resposta do SEI. Durante a execução há os botões **Pausar**, **Continuar** e **Cancelar**. O botão **Minimizar** recolhe a janela em uma pastilha de progresso no canto da tela, e o trabalho no SEI pode seguir normalmente.

### Resultado

Ao final, a tabela traz o número de cada processo, com os botões **Copiar com links** e **Baixar CSV**.

> - **Tentar de novo as falhas**: reprocessa somente as linhas que, com certeza, não foram criadas.
> - **Processos com situação incerta**: se a rede ou o SEI falhar no meio da criação, não há como saber se o processo foi criado. Para não gerar duplicidade, o SEI Pro **não tenta de novo** essas linhas: elas aparecem como incertas e pedem conferência no Controle de Processos.
> - **Gerar links permanentes destes processos**: abre a ferramenta Pesquisar Link Permanente já preenchida com os números criados.

## Próximo item

> [Ferramentas na tela de Pesquisa: visualização rápida, baixar e copiar resultados](../pages/PESQUISA.md)
