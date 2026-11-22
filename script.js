/* ==========================================================================
   CRUZADINHA DE ARQUITETURA COMPUTACIONAL
   --------------------------------------------------------------------------
   As pistas NÃO ficam neste arquivo: elas ficam em pistas.js, para você
   escrever com as suas palavras.

   Aqui ficam o tabuleiro (posição de cada palavra), o desenho da grade,
   a navegação pelo teclado e a correção.
   ========================================================================== */

/* Posição de cada palavra no tabuleiro.
   "linha" e "coluna" contam a partir de 0 (a primeira casa é 0). */
const PALAVRAS = [
  { palavra: 'CPU', linha: 7, coluna: 6, direcao: 'H' },
  { palavra: 'ULA', linha: 9, coluna: 9, direcao: 'H' },
  { palavra: 'UC', linha: 4, coluna: 3, direcao: 'V' },
  { palavra: 'REGISTRADORES', linha: 7, coluna: 13, direcao: 'V' },
  { palavra: 'RAM', linha: 10, coluna: 0, direcao: 'H' },
  { palavra: 'ROM', linha: 16, coluna: 8, direcao: 'H' },
  { palavra: 'EEPROM', linha: 13, coluna: 8, direcao: 'V' },
  { palavra: 'FLASH', linha: 19, coluna: 10, direcao: 'H' },
  { palavra: 'CACHE', linha: 0, coluna: 9, direcao: 'V' },
  { palavra: 'MEMORIADEMASSA', linha: 14, coluna: 0, direcao: 'H' },
  { palavra: 'DMA', linha: 2, coluna: 5, direcao: 'H' },
  { palavra: 'ADDRESSBUS', linha: 10, coluna: 1, direcao: 'V' },
  { palavra: 'DATABUS', linha: 8, coluna: 11, direcao: 'V' },
  { palavra: 'MICROCONTROLADOR', linha: 2, coluna: 6, direcao: 'V' },
  { palavra: 'DUALCORE', linha: 4, coluna: 2, direcao: 'H' },
  { palavra: 'QUADCORE', linha: 8, coluna: 4, direcao: 'V' },
];

const TOTAL_LINHAS = 20;
const TOTAL_COLUNAS = 15;

/* --------------------------------------------------------------------------
   Lógica pura (não depende do navegador)
   -------------------------------------------------------------------------- */

/** Cria o mapa de casas: chave "linha:coluna" -> { linha, coluna, letra, palavras }. */
function montarCelulas(palavras) {
  const celulas = new Map();

  for (const palavra of palavras) {
    for (let i = 0; i < palavra.palavra.length; i++) {
      const linha = palavra.direcao === 'V' ? palavra.linha + i : palavra.linha;
      const coluna = palavra.direcao === 'H' ? palavra.coluna + i : palavra.coluna;
      const chave = linha + ':' + coluna;

      if (!celulas.has(chave)) {
        celulas.set(chave, {
          linha,
          coluna,
          letra: palavra.palavra[i],
          palavras: [],
        });
      }

      celulas.get(chave).palavras.push(palavra);
    }
  }

  return celulas;
}

/** Numera as palavras na ordem de leitura (linha, depois coluna), como nas cruzadinhas. */
function numerarPalavras(palavras) {
  const inicios = [...new Set(palavras.map((p) => p.linha + ':' + p.coluna))]
    .map((chave) => chave.split(':').map(Number))
    .sort((a, b) => a[0] - b[0] || a[1] - b[1]);

  const numeros = new Map(inicios.map(([linha, coluna], indice) => [linha + ':' + coluna, indice + 1]));

  for (const palavra of palavras) {
    palavra.numero = numeros.get(palavra.linha + ':' + palavra.coluna);
  }

  return palavras;
}

/** Devolve a chave "linha:coluna" da casa na posição i da palavra. */
function chaveDaCasa(palavra, i) {
  const linha = palavra.direcao === 'V' ? palavra.linha + i : palavra.linha;
  const coluna = palavra.direcao === 'H' ? palavra.coluna + i : palavra.coluna;
  return linha + ':' + coluna;
}

/** true se todas as letras digitadas na palavra estão certas. */
function conferirPalavra(palavra, letras) {
  for (let i = 0; i < palavra.palavra.length; i++) {
    const digitada = (letras.get(chaveDaCasa(palavra, i)) || '').toUpperCase();
    if (digitada !== palavra.palavra[i]) return false;
  }
  return true;
}

/* --------------------------------------------------------------------------
   Verificações das pistas (as regras do PDF)
   -------------------------------------------------------------------------- */

function normalizarTexto(texto) {
  return texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

function contarPalavras(texto) {
  return texto.trim() === '' ? 0 : texto.trim().split(/\s+/).length;
}

/** true se a pista entrega a resposta (mesma palavra ou a resposta escrita por extenso). */
function pistaEntregaResposta(palavra, pista) {
  const alvo = normalizarTexto(palavra);
  const texto = normalizarTexto(pista);
  const comEspacos = ' ' + texto.replace(/[^a-z0-9]+/g, ' ') + ' ';
  const semEspacos = texto.replace(/[^a-z0-9]/g, '');

  if (comEspacos.includes(' ' + alvo + ' ')) return true;
  return alvo.length >= 6 && semEspacos.includes(alvo);
}

/** Devolve a lista de problemas da pista (vazia se estiver tudo certo). */
function problemasDaPista(palavra, pista) {
  const problemas = [];
  const texto = (pista || '').trim();

  if (texto === '') {
    problemas.push('pista em branco');
    return problemas;
  }
  if (contarPalavras(texto) > 15) {
    problemas.push('passa de 15 palavras');
  }
  if (pistaEntregaResposta(palavra, texto)) {
    problemas.push('entrega a resposta');
  }
  return problemas;
}

/* --------------------------------------------------------------------------
   Jogo (só roda no navegador)
   -------------------------------------------------------------------------- */

function iniciarJogo() {
  numerarPalavras(PALAVRAS);

  const celulas = montarCelulas(PALAVRAS);
  const grade = document.getElementById('grade');
  const contador = document.getElementById('contador');
  const mensagem = document.getElementById('mensagem');
  const avisoPistas = document.getElementById('aviso-pistas');
  const pistaAtual = document.getElementById('pista-atual');

  const entradas = new Map(); // "linha:coluna" -> input
  const casas = new Map();    // "linha:coluna" -> div da casa
  let ultimaCasa = null;      // casa que estava em foco antes
  let direcaoAtual = 'H';

  /* ---------- desenho do tabuleiro ---------- */

  grade.style.setProperty('--colunas', TOTAL_COLUNAS);
  grade.style.setProperty('--linhas', TOTAL_LINHAS);

  const chaves = [...celulas.keys()].sort((a, b) => {
    const [la, ca] = a.split(':').map(Number);
    const [lb, cb] = b.split(':').map(Number);
    return la - lb || ca - cb;
  });

  for (const chave of chaves) {
    const celula = celulas.get(chave);

    const casa = document.createElement('div');
    casa.className = 'casa';
    casa.dataset.chave = chave;
    casa.style.gridArea = (celula.linha + 1) + ' / ' + (celula.coluna + 1);

    const inicio = PALAVRAS.find((p) => p.linha === celula.linha && p.coluna === celula.coluna);
    if (inicio) {
      const numero = document.createElement('span');
      numero.className = 'casa__numero';
      numero.textContent = inicio.numero;
      casa.appendChild(numero);
    }

    const entrada = document.createElement('input');
    entrada.type = 'text';
    entrada.className = 'casa__entrada';
    entrada.maxLength = 1;
    entrada.autocomplete = 'off';
    entrada.autocapitalize = 'characters';
    entrada.spellcheck = false;
    entrada.setAttribute('aria-label', 'Linha ' + (celula.linha + 1) + ', coluna ' + (celula.coluna + 1));
    casa.appendChild(entrada);

    grade.appendChild(casa);
    entradas.set(chave, entrada);
    casas.set(chave, casa);

    entrada.addEventListener('focus', () => {
      ultimaCasa = chave;

      const disponiveis = celulas.get(chave).palavras.map((p) => p.direcao);
      if (!disponiveis.includes(direcaoAtual)) {
        direcaoAtual = disponiveis[0];
      }

      casa.classList.add('ativa');
      destacarPistaDoFoco(false);
    });

    // clicar de novo na casa que já está em foco troca entre horizontal e vertical
    entrada.addEventListener('pointerdown', () => {
      if (document.activeElement !== entrada) return;

      const disponiveis = celulas.get(chave).palavras.map((p) => p.direcao);
      if (disponiveis.length < 2) return;

      direcaoAtual = direcaoAtual === 'H' ? 'V' : 'H';
      destacarPistaDoFoco(false);
    });

    entrada.addEventListener('blur', () => {
      casa.classList.remove('ativa');
    });

    entrada.addEventListener('input', () => {
      entrada.value = entrada.value.toUpperCase().replace(/[^A-Z]/g, '').slice(-1);
      limparMarcacoes();

      if (entrada.value === '') return;

      const proxima = casaVizinhaNaPalavra(chave, direcaoAtual, 1);
      if (proxima) focar(proxima);
      destacarPistaDoFoco(true);
    });

    entrada.addEventListener('keydown', (evento) => {
      if (evento.key === 'Backspace') {
        evento.preventDefault();
        if (entrada.value !== '') {
          entrada.value = '';
        } else {
          const anterior = casaVizinhaNaPalavra(chave, direcaoAtual, -1);
          if (anterior) {
            focar(anterior);
            entradas.get(anterior).value = '';
          }
        }
        limparMarcacoes();
        return;
      }

      const setas = {
        ArrowLeft: [0, -1],
        ArrowRight: [0, 1],
        ArrowUp: [-1, 0],
        ArrowDown: [1, 0],
      };
      const delta = setas[evento.key];
      if (!delta) return;

      evento.preventDefault();
      direcaoAtual = delta[0] !== 0 ? 'V' : 'H';

      const destino = proximaCasaNaDirecao(chave, delta[0], delta[1]);
      if (destino) focar(destino);
    });
  }

  /** Casa seguinte (passo 1) ou anterior (passo -1) dentro da mesma palavra. */
  function casaVizinhaNaPalavra(chave, direcao, passo) {
    const palavra = celulas.get(chave).palavras.find((p) => p.direcao === direcao);
    if (!palavra) return null;

    let indice = -1;
    for (let i = 0; i < palavra.palavra.length; i++) {
      if (chaveDaCasa(palavra, i) === chave) {
        indice = i;
        break;
      }
    }

    const alvo = indice + passo;
    if (indice < 0 || alvo < 0 || alvo >= palavra.palavra.length) return null;

    return chaveDaCasa(palavra, alvo);
  }

  /** Primeira casa com entrada na direção indicada (pula as casas vazias). */
  function proximaCasaNaDirecao(chave, deltaLinha, deltaColuna) {
    let [linha, coluna] = chave.split(':').map(Number);

    for (let i = 0; i < Math.max(TOTAL_LINHAS, TOTAL_COLUNAS); i++) {
      linha += deltaLinha;
      coluna += deltaColuna;

      if (linha < 0 || coluna < 0 || linha >= TOTAL_LINHAS || coluna >= TOTAL_COLUNAS) break;

      const alvo = linha + ':' + coluna;
      if (entradas.has(alvo)) return alvo;
    }

    return null;
  }

  function focar(chave) {
    const entrada = entradas.get(chave);
    if (entrada) entrada.focus();
  }

  /* ---------- lista de pistas ---------- */

  const pendentes = [];

  // as pistas aparecem na ordem dos números da cruzadinha
  for (const palavra of [...PALAVRAS].sort((a, b) => a.numero - b.numero)) {
    const pista = (typeof PISTAS !== 'undefined' ? PISTAS[palavra.palavra] : '') || '';
    const problemas = problemasDaPista(palavra.palavra, pista);
    const vazia = problemas.includes('pista em branco');

    if (vazia) pendentes.push(palavra.palavra);

    const item = document.createElement('li');

    const botao = document.createElement('button');
    botao.type = 'button';
    botao.className = 'pista';
    botao.dataset.palavra = palavra.palavra;

    const numero = document.createElement('span');
    numero.className = 'pista__numero';
    numero.textContent = palavra.numero;

    const texto = document.createElement('span');
    texto.className = 'pista__texto' + (vazia ? ' pista__texto--vazia' : '');

    if (vazia) {
      texto.textContent = 'Pista em branco — escreva a sua em pistas.js.';
    } else {
      texto.textContent = pista;
    }

    botao.append(numero, texto);

    if (problemas.length > 0 && !vazia) {
      const aviso = document.createElement('span');
      aviso.className = 'pista__aviso';
      aviso.textContent = '⚠ ' + problemas.join(' · ');
      botao.appendChild(aviso);
    }

    botao.addEventListener('click', () => {
      direcaoAtual = palavra.direcao;
      focar(chaveDaCasa(palavra, 0));
      entradas.get(chaveDaCasa(palavra, 0)).select();
    });

    item.appendChild(botao);
    document
      .getElementById(palavra.direcao === 'H' ? 'pistas-horizontais' : 'pistas-verticais')
      .appendChild(item);
  }

  if (pendentes.length > 0) {
    avisoPistas.hidden = false;
    avisoPistas.textContent =
      '⚠ ' + pendentes.length + ' de ' + PALAVRAS.length + ' pistas ainda estão em branco. ' +
      'Abra o arquivo pistas.js e escreva cada uma com as suas palavras (regras em PISTAS.md).';
  }

  /* ---------- destacar a pista da casa em foco ---------- */

  function destacarPistaDoFoco(rolar) {
    const chave = ultimaCasa;
    if (!chave) return;

    const atual = direcaoAtual;
    const candidatas = celulas.get(chave).palavras;
    const palavra = candidatas.find((p) => p.direcao === atual) || candidatas[0];

    if (pistaAtual) {
      const texto = ((typeof PISTAS !== 'undefined' ? PISTAS[palavra.palavra] : '') || '').trim();
      const rotulo = palavra.direcao === 'H' ? 'Horizontal' : 'Vertical';

      pistaAtual.textContent =
        palavra.numero + ' · ' + rotulo + ' · ' + palavra.palavra.length + ' letras — ' +
        (texto === '' ? 'pista em branco: escreva a sua em pistas.js' : texto);
    }

    document.querySelectorAll('.pista').forEach((botao) => {
      botao.classList.toggle('pista--atual', botao.dataset.palavra === palavra.palavra);
    });

    if (rolar) {
      const botao = document.querySelector('.pista--atual');
      if (botao && botao.scrollIntoView) {
        botao.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      }
    }
  }

  /* ---------- conferir e reiniciar ---------- */

  function limparMarcacoes() {
    for (const casa of casas.values()) casa.classList.remove('certa', 'errada');
    for (const palavra of PALAVRAS) palavra.resolvida = false;
    document.querySelectorAll('.pista').forEach((botao) => {
      botao.classList.remove('pista--resolvida', 'pista--errada');
    });
    mensagem.textContent = '';
    contador.textContent = '0 de ' + PALAVRAS.length + ' palavras';
  }

  function conferir() {
    const letras = new Map();
    for (const [chave, entrada] of entradas) {
      if (entrada.value !== '') letras.set(chave, entrada.value.toUpperCase());
    }

    let acertos = 0;

    for (const palavra of PALAVRAS) {
      palavra.resolvida = conferirPalavra(palavra, letras);
      if (palavra.resolvida) acertos++;

      const botao = document.querySelector('.pista[data-palavra="' + palavra.palavra + '"]');
      if (botao) {
        botao.classList.toggle('pista--resolvida', palavra.resolvida);
        botao.classList.toggle('pista--errada', !palavra.resolvida);
      }
    }

    for (const [chave, casa] of casas) {
      casa.classList.remove('certa', 'errada');
      const valor = entradas.get(chave).value.toUpperCase();
      if (valor === '') continue;
      casa.classList.add(valor === celulas.get(chave).letra ? 'certa' : 'errada');
    }

    contador.textContent = acertos + ' de ' + PALAVRAS.length + ' palavras';

    if (acertos === PALAVRAS.length) {
      mensagem.textContent = 'Parabéns! Você completou a cruzadinha inteira.';
    } else {
      mensagem.textContent =
        'Você acertou ' + acertos + ' de ' + PALAVRAS.length + ' palavras. ' +
        'As casas em vermelho têm letra errada; as palavras ainda em branco contam como erradas.';
    }
  }

  function reiniciar() {
    for (const entrada of entradas.values()) entrada.value = '';
    limparMarcacoes();

    const primeira = [...entradas.keys()].sort((a, b) => {
      const [la, ca] = a.split(':').map(Number);
      const [lb, cb] = b.split(':').map(Number);
      return la - lb || ca - cb;
    })[0];

    focar(primeira);
  }

  document.getElementById('btn-conferir').addEventListener('click', conferir);
  document.getElementById('btn-reiniciar').addEventListener('click', reiniciar);

  contador.textContent = '0 de ' + PALAVRAS.length + ' palavras';
}

if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', iniciarJogo);
}

/* Permite testar a lógica com Node (não interfere no site). */
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    PALAVRAS,
    montarCelulas,
    numerarPalavras,
    chaveDaCasa,
    conferirPalavra,
    contarPalavras,
    pistaEntregaResposta,
    problemasDaPista,
  };
}
