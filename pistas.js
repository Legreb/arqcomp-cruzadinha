/* ==========================================================================
   PISTAS DA CRUZADINHA  —  É AQUI QUE VOCÊ ESCREVE
   ==========================================================================

   As pistas são escritas por você: explicar com as suas palavras é a parte
   da atividade que faz o conceito ficar na cabeça.

   O número do comentário é o mesmo número que aparece no tabuleiro.

   REGRAS (estão no PDF da atividade):
     - no máximo 15 palavras por pista;
     - a pista NÃO pode conter a resposta, nem parte dela, nem a sigla por extenso;
     - a pista precisa estar correta segundo o e-book e levar a uma única resposta;
     - escreva com as SUAS palavras.

   COMO PREENCHER:
     1. Troque o "" da palavra pela sua pista, entre as aspas.
        Exemplo de formato:  CPU: "aqui vai a sua pista",
     2. Deixe "" enquanto não escrever: o jogo avisa que a pista está pendente.
     3. Não mude o nome das chaves (CPU, ULA, ...): é por ele que o jogo
        encontra a pista de cada palavra.
     4. Antes de escrever, rascunhe em PISTAS.md. Lá tem a tabela para você
        contar as palavras e conferir cada regra.

   O jogo também avisa na tela quando:
     - a pista passa de 15 palavras;
     - a pista repete a resposta.

   PERGUNTAS QUE AJUDAM A ESCREVER (sem entregar a resposta):
     - O que é / para que serve?
     - Onde fica dentro do computador?
     - O que acontece se ela não existir?
     - Com qual outra palavra as pessoas costumam confundir?
   ========================================================================== */

const PISTAS = {
  /* 1  · cache */                                   CACHE: "Memória rápida, volátil que fica no processador que salva cópias de dados enviados para RAM",
  /* 2  · DMA */                                     DMA: "atalho que permite um dispositivo transferir dados direto até a memória",
  /* 3  · microcontrolador */                        MICROCONTROLADOR: "computador completo num único chip",
  /* 4  · dual core */                               DUALCORE: "Permite a execução de duas núcleos ao mesmo tempo",
  /* 5  · UC (Unidade de Controle) */                 UC: "Lê as instruções, decodifica o que fazer e manda pros outros componentes",
  /* 6  · CPU */                                     CPU: "Cérebro do computador responsável por buscar e executar as instruções dos programas",
  /* 7  · registradores */                           REGISTRADORES: "Memória mais rápida do computador, armazenam apenas o que está em uso direto",
  /* 8  · quad core */                               QUADCORE: "Permite a execução de 4 núcleos ao mesmo tempo",
  /* 9  · data bus (barramento de dados) */          DATABUS: "são os caminhos por onde passa o conteúdo entre processador, memória e periféricos",
  /* 10 · ULA */                                     ULA: "Parte encarregada de realizar cálculos matemáticos e operações lógicas",
  /* 11 · RAM */                                     RAM: "Memória volátil considerada a principal de trabalho do sistema",
  /* 12 · address bus (barramento de endereço) */    ADDRESSBUS: "são as vias por onde o processador informa o endereço da posição de memória que quer acessar",
  /* 13 · EEPROM */                                  EEPROM: "memória que não perde o conteúdo ao desligar e pode ser apagada e regravada eletricamente, sem tirar o chip do lugar",
  /* 14 · memória de massa (armazenamento) */        MEMORIADEMASSA: "Usado para guardar informações permanentemente que possui grande armazenamento",
  /* 15 · ROM */                                     ROM: "Memória não volátil usada pelos fabricantes para salvar instruções permanentes de inicialização",
  /* 16 · Flash */                                   FLASH: "Memória não volátil usada em microcontroladores/computadores para armazenar o firmware permanentemente",
};
