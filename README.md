# Cruzadinha de Arquitetura Computacional

Jogo de cruzadinha que roda no navegador para treinar os termos de
Arquitetura Computacional. O jogador lê a pista, descobre a palavra e digita
as letras direto nas casas do tabuleiro.

Projeto da **Atividade Avaliativa III — Sprint 3**.

> **Antes de publicar:** as pistas ainda estão em branco. Elas ficam no arquivo
> `pistas.js` e precisam ser escritas por você, com as suas palavras.
> O guia de escrita e a tabela de rascunho estão em [PISTAS.md](PISTAS.md).

## Como jogar

1. Leia as pistas de **Horizontais** e **Verticais**.
2. Clique em uma pista (ou em uma casa) para começar a escrever.
3. Digite as letras: o cursor avança sozinho para a próxima casa.
4. Use as setas do teclado para se mover e **Backspace** para apagar.
5. Clique de novo em uma casa para alternar entre a palavra horizontal e a vertical.
6. Clique em **Conferir** para ver quais palavras estão certas (verde) e quais
   têm letra errada (vermelho). O contador mostra quantas palavras você acertou.
7. Clique em **Reiniciar** para limpar o tabuleiro e jogar de novo.

Regras das pistas (as mesmas do PDF da atividade):

- no máximo **15 palavras** por pista;
- a pista **não pode conter a resposta**, nem parte dela, nem a sigla por extenso;
- a pista precisa estar correta segundo o e-book e levar a **uma única resposta**;
- a pista deve ser escrita com as suas palavras.

## Palavras e pistas

O tabuleiro usa as 16 palavras da lista. As pistas abaixo estão **em branco de
propósito**: copie para cá a mesma pista que você escreveu em `pistas.js`.

| Nº | Termo | No tabuleiro | Direção | Pista |
|----|-------|--------------|---------|-------|
| 1 | CPU | `CPU` | Vertical | _(escreva aqui a sua pista)_ |
| 2 | ULA | `ULA` | Horizontal | _(escreva aqui a sua pista)_ |
| 3 | UC (Unidade de Controle) | `UC` | Vertical | _(escreva aqui a sua pista)_ |
| 4 | registradores | `REGISTRADORES` | Vertical | _(escreva aqui a sua pista)_ |
| 5 | RAM | `RAM` | Horizontal | _(escreva aqui a sua pista)_ |
| 6 | ROM | `ROM` | Horizontal | _(escreva aqui a sua pista)_ |
| 7 | EEPROM | `EEPROM` | Vertical | _(escreva aqui a sua pista)_ |
| 8 | Flash | `FLASH` | Horizontal | _(escreva aqui a sua pista)_ |
| 9 | cache | `CACHE` | Vertical | _(escreva aqui a sua pista)_ |
| 10 | memória de massa (armazenamento) | `MEMORIADEMASSA` | Horizontal | _(escreva aqui a sua pista)_ |
| 11 | DMA | `DMA` | Horizontal | _(escreva aqui a sua pista)_ |
| 12 | address bus (barramento de endereço) | `ADDRESSBUS` | Vertical | _(escreva aqui a sua pista)_ |
| 13 | data bus (barramento de dados) | `DATABUS` | Vertical | _(escreva aqui a sua pista)_ |
| 14 | microcontrolador | `MICROCONTROLADOR` | Vertical | _(escreva aqui a sua pista)_ |
| 15 | dual core | `DUALCORE` | Horizontal | _(escreva aqui a sua pista)_ |
| 16 | quad core | `QUADCORE` | Vertical | _(escreva aqui a sua pista)_ |

## Estrutura do projeto

```
arqcomp-cruzadinha/
├── index.html   → página do jogo (na raiz, como pede a atividade)
├── style.css    → visual do tabuleiro, das casas e das pistas
├── script.js    → posição das palavras, navegação e correção
├── pistas.js    → as pistas (é aqui que você escreve)
├── PISTAS.md    → regras + tabela de rascunho das pistas
└── README.md    → este arquivo
```

Feito com **HTML, CSS e JavaScript puros**, sem bibliotecas e sem build.

## Rodar no seu computador

Basta abrir o `index.html` no navegador (duplo clique). Se preferir um servidor
local:

```bash
npx serve .
```

## Publicar no GitHub Pages

1. Crie um repositório **público** chamado `arqcomp-cruzadinha`.
2. Envie o projeto:

   ```bash
   git remote add origin https://github.com/SEU-USUARIO/arqcomp-cruzadinha.git
   git branch -M main
   git push -u origin main
   ```

3. No repositório: **Settings → Pages → Source: Deploy from a branch**,
   branch `main`, pasta `/ (root)`, e clique em **Save**.
4. Em alguns minutos o site fica em:
   `https://SEU-USUARIO.github.io/arqcomp-cruzadinha/`
5. Teste o link em uma **janela anônima**. Se abrir lá, abre para o professor.

**Link publicado:** _(preencha depois de publicar)_
`https://SEU-USUARIO.github.io/arqcomp-cruzadinha/`

## Versionamento

As mensagens de commit seguem o padrão `tipo: descrição curta`, com os tipos
`feat`, `fix`, `style` e `docs`.

## O que eu aprendi escrevendo as pistas

_(Escreva aqui, com as suas palavras, a explicação de pelo menos 3 termos que
você teve mais dificuldade de definir. Este trecho é seu: escrever com as
próprias palavras é o que faz o conceito ficar.)_

- **Termo 1 —**
- **Termo 2 —**
- **Termo 3 —**
