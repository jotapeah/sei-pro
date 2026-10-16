# [![Home](../img/home.png)](../) |  SEI Pro ![Icone](../img/icon-32.png)

## ![SEI Pro Link Permanente](../img/icon-linkpermanente.png) Pesquisar Link Permanente

Essa ferramenta transforma uma lista de números de processo e de documentos do SEI em links permanentes, todos de uma só vez, e entrega o resultado numa tabela pronta para copiar.

Serve para quando é preciso citar dezenas de processos ou documentos num e-mail, numa mensagem do Teams ou numa planilha, e buscar o link de cada um à mão levaria a tarde inteira.

O acesso é feito pelo item **Pesquisar Link Permanente** do menu à esquerda do SEI.

### Como usar

1. Clique em **Pesquisar Link Permanente**, no menu à esquerda;

2. Cole na caixa de texto o que você tiver. Não precisa organizar nada: pode ser um e-mail inteiro, uma coluna de planilha ou uma lista solta. A ferramenta reconhece sozinha:

> **Números de processo** — como `50300.018905/2018-67`;
>
> **Números SEI de documentos** — como `0123456`;
>
> **Linhas soltas** — uma linha como `Contrato-77` não é um número, e por isso é pesquisada exatamente como está escrita.

3. Os números repetidos são removidos antes da pesquisa, então colar o mesmo número várias vezes não gera consulta em duplicidade;

4. Clique em **Pesquisar** (ou use Ctrl+Enter). A tabela é preenchida à medida que cada item é consultado.

### A coluna Situação

Cada linha da tabela mostra o resultado da consulta:

> **Encontrado** — o link permanente foi localizado;
>
> **Não encontrado** — o SEI não tem nenhum processo ou documento com esse número;
>
> **Sem acesso** — o item existe, mas o seu usuário ou a unidade atual não pode vê-lo;
>
> **Erro** — a consulta falhou (por exemplo, por queda de conexão ou sessão expirada).

Se houver linhas com erro, use o botão **Tentar de novo só as que falharam**. Os itens que já deram certo não são pesquisados outra vez.

### Copiar e baixar

> **Copiar com links** — copia a tabela com o número de cada item clicável. Ao colar no Teams, no Outlook ou no Word, o número aparece como link. Em destinos que não aceitam texto formatado, a cópia sai como texto simples;
>
> **Baixar CSV** — baixa a tabela como planilha, para guardar ou tratar em outro programa.

O botão **Limpar** esvazia a caixa de texto e a tabela para começar uma nova lista.

### Observações

> O link permanente não carrega o código de segurança (hash) da sessão, por isso continua valendo depois que você sai do SEI e pode ser enviado a outras pessoas. Quem abrir precisa, claro, ter acesso ao processo ou documento.
>
> A ferramenta funciona no SEI 4 e no SEI 5.

## Próximo item

> [Processos em Lote](../pages/PROCESSOSEMLOTE.md)
