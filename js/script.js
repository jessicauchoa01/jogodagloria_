"use strict";

//Elementos de html
const btnRoll = document.querySelector(".lancar");
const pino0_ = document.querySelector(".pino0");
const pino1_ = document.querySelector(".pino1");
const diceEl = document.querySelector(".dado-img");
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const btnNew = document.querySelector(".recomecar");
const abrirModal = document.querySelector(".open");
const filtro = document.querySelector(".filtro");
const modal = document.querySelector(".modal");
const fechar = document.querySelector(".close");
const modalcampeao = document.querySelector(".modal-campeao");
const modalcasa = document.querySelector(".modal-casa");
const fecharCampeao = document.querySelector(".fechar-campeao");
const Campeao = document.querySelector(".vencedor");
const mensagem = document.querySelector(".mensagem");

//Botão para mostrar o modal e filtro
abrirModal.addEventListener("click", () => {
  filtro.style.opacity = 1;
  filtro.style.visibility = "visible";
  modal.classList.add("aberto");
});

//Botão para fechar o modal das regras
fechar.addEventListener("click", () => {
  filtro.style.opacity = 0;
  filtro.style.visibility = "hidden";
  modal.classList.remove("aberto");
});

//Botão para fechar o modal do campeão
fecharCampeao.addEventListener("click", () => {
  filtro.style.opacity = 0;
  filtro.style.visibility = "hidden";
  modalcampeao.classList.remove("aberto");
  init();
});

//Definindo as posições de cada casa
const posicaoCasa = {
  0: { topo: 140, esquerda: 130 },
  1: { topo: 220, esquerda: 130 },
  2: { topo: 300, esquerda: 130 },
  3: { topo: 380, esquerda: 130 },
  4: { topo: 460, esquerda: 130 },
  5: { topo: 540, esquerda: 130 },
  6: { topo: 540, esquerda: 210 },
  7: { topo: 540, esquerda: 290 },
  8: { topo: 540, esquerda: 370 },
  9: { topo: 540, esquerda: 450 },
  10: { topo: 540, esquerda: 530 },
  11: { topo: 460, esquerda: 530 },
  12: { topo: 380, esquerda: 530 },
  13: { topo: 300, esquerda: 530 },
  14: { topo: 220, esquerda: 530 },
  15: { topo: 140, esquerda: 530 },
  16: { topo: 140, esquerda: 450 },
  17: { topo: 140, esquerda: 370 },
  18: { topo: 140, esquerda: 290 },
  19: { topo: 140, esquerda: 210 },
  20: { topo: 220, esquerda: 210 },
  21: { topo: 300, esquerda: 210 },
  22: { topo: 380, esquerda: 210 },
  23: { topo: 460, esquerda: 210 },
  24: { topo: 460, esquerda: 290 },
  25: { topo: 460, esquerda: 370 },
  26: { topo: 460, esquerda: 450 },
  27: { topo: 380, esquerda: 450 },
  28: { topo: 300, esquerda: 450 },
  29: { topo: 220, esquerda: 450 },
  30: { topo: 220, esquerda: 370 },
  31: { topo: 220, esquerda: 290 },
  32: { topo: 300, esquerda: 290 },
  33: { topo: 380, esquerda: 290 },
  34: { topo: 380, esquerda: 370 },
  35: { topo: 300, esquerda: 370 },
  36: { topo: 300, esquerda: 370 },
  37: { topo: 300, esquerda: 370 },
  38: { topo: 300, esquerda: 370 },
  39: { topo: 300, esquerda: 370 },
  40: { topo: 300, esquerda: 370 },
};

//Definindo as casas dos carros
const casaCarro = [10, 20];
//Definindo as casas dos poços
const casaPoco = [8, 17, 24, 29];
//Definindo as casas dos caranguejos
const casaCaranguejo = [26, 15];
//Definindo as casas dos passaros
const casaPassaro = [4, 13, 22, 31];
//Definindo a casa do inferno
const casaInferno = [33];

// Definindo o número máximo de vezes que um jogador deve ficar sem jogar
const turnsSkippedMaxCarro = 3;
const turnsSkippedMaxPoco = 2;

// Objeto de jogadores e penalidades
let turns = { 0: { turnsSkipped: 0 }, 1: { turnsSkipped: 0 } };

//Iniciando as variáveis
let activePlayer, playing, posicao, currentPlayer;

//Iniciando o jogo
const init = function () {
  playing = true;
  activePlayer = 1;
  posicao = [0, 0];

  //Para que inicie sempre com o player1 ativo e o player2 transparente
  player0El.classList.add(`player--active`);
  player1El.classList.remove(`player--active`);

  ///Para os pinos ficarem na posição 0
  document.querySelector(`.pino0`).style.top = `140px`;
  document.querySelector(`.pino0`).style.left = `130px`;
  document.querySelector(`.pino1`).style.top = `140px`;
  document.querySelector(`.pino1`).style.left = `140px`;

  diceEl.classList.add("hide");
};

///************************************** SWITCH PLAYER *******************************************/
//Função para mudar de jogador
const switchPlayer = function () {
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle(`player--active`);
  player1El.classList.toggle(`player--active`);
};

//Modal para alerta
const modalCasas = function () {
  filtro.style.opacity = 1;
  filtro.style.visibility = "visible";
  modalcasa.classList.add("aberto");
};

//Função para fechar o modal de alerta
function fecharModal() {
  filtro.style.opacity = 0;
  filtro.style.visibility = "hidden";
  modalcasa.classList.remove("aberto");
}

//Função para verificar penalidades
const verificarPenalidade = function () {
  if (casaCarro.includes(posicao[activePlayer])) {
    turns[activePlayer].turnsSkipped = turnsSkippedMaxCarro;
    //Para escrever  a penalidade
    modalCasas();
    mensagem.textContent = `Caiu na casa ${posicao[activePlayer]} e ficará duas jogadas sem jogar`;
    setTimeout(fecharModal, 2000);
  }
  if (casaPoco.includes(posicao[activePlayer])) {
    turns[activePlayer].turnsSkipped = turnsSkippedMaxPoco;

    //Para escrever  a penalidade
    modalCasas();
    mensagem.textContent = `Caiu na casa ${posicao[activePlayer]} e ficará uma jogada sem jogar`;
    setTimeout(fecharModal, 2000);
  }

  //Verificar as penalidades caso caiam os dois em uma casa com penalidade
  if (turns[0].turnsSkipped > 0 && turns[1].turnsSkipped > 0) {
    if (turns[0].turnsSkipped > turns[1].turnsSkipped) {
      turns[1].turnsSkipped = 0;
    } else if (turns[0].turnsSkipped < turns[1].turnsSkipped) {
      turns[0].turnsSkipped = 0;
    } else {
      turns[0].turnsSkipped = 0;
      turns[1].turnsSkipped = 0;
    }
  }
};

function campeao() {
  //Verifica se o jogador chegou no troféu
  if (posicao[activePlayer] >= 35) {
    document.querySelector(`.pino${activePlayer}`).style.top = `300px`;
    document.querySelector(`.pino${activePlayer}`).style.left = `370px`;
    filtro.style.opacity = 1;
    filtro.style.visibility = "visible";
    modalcampeao.classList.add("aberto");
    posicao[0] = 0;
    posicao[1] = 0;
    switchPlayer();
    //Para escrever qual jogador venceu
    Campeao.textContent = `O jogador ${activePlayer + 1} venceu o jogo`;
  }
}
//Função para verificar as casas
function regras() {
  //Condições da casa do pássaro
  if (casaPassaro.includes(posicao[activePlayer])) {
    modalCasas();
    //Para escrever em qual casa caiu
    mensagem.textContent = `Caiu na casa ${posicao[activePlayer]} e avançou mais 3 casas`;
    posicao[activePlayer] = posicao[activePlayer] + 3;

    setTimeout(fecharModal, 2000);
  }
  //Condições da casa do caranguejo
  if (casaCaranguejo.includes(posicao[activePlayer])) {
    modalCasas();
    mensagem.textContent = `Caiu na casa ${posicao[activePlayer]} e voltou 3 casas`;
    setTimeout(fecharModal, 2000);
    posicao[activePlayer] = posicao[activePlayer] - 3;
  }
  //Condições da casa do fogo
  if (casaInferno.includes(posicao[activePlayer])) {
    modalCasas();

    mensagem.textContent = `Caiu na casa ${posicao[activePlayer]} e voltou ao início`;
    setTimeout(fecharModal, 2000);
    posicao[activePlayer] = 1;
  }

  verificarPenalidade();
}

//Função para movimentar o elemento
function moverElemento() {
  //Gerar o lançamento do dado
  const dado = Math.trunc(Math.random() * 6 + 1);
  //Muda a imagem do dado de acordo com o numero tirado
  diceEl.src = `../img/dado-${dado}.png`;
  //Mostrar dado
  diceEl.classList.remove("hide");
  let i = posicao[activePlayer];
  //Posição do jogador  mais a soma do dado
  posicao[activePlayer] = posicao[activePlayer] + dado;

  const intervaloAnimacao = setInterval(() => {
    //Para mudar as distancias
    let distanciaTopo = posicaoCasa[i].topo;
    let distanciaEsquerda = posicaoCasa[i].esquerda;

    //Para aumentar 10px em relação ao pino 0
    if (activePlayer == 1) {
      distanciaEsquerda = posicaoCasa[i].esquerda + 10;
    }
    //Para movimentar os pinos
    document.querySelector(
      `.pino${activePlayer}`
    ).style.top = `${distanciaTopo}px`;
    document.querySelector(
      `.pino${activePlayer}`
    ).style.left = `${distanciaEsquerda}px`;
    i++;

    //Para interromper a animação e mudar o jogador
    if (i > posicao[activePlayer]) {
      clearInterval(intervaloAnimacao);
      campeao();
      switchPlayer();
    }
  }, 500);
}

init();

//*********** Rodar o dado **************************************************/

btnRoll.addEventListener("click", function () {
  if (turns[activePlayer].turnsSkipped <= 0) {
    turns[0].turnsSkipped--;
    turns[1].turnsSkipped--;
    console.log(
      `O turn de 1 é ${turns[0].turnsSkipped} e O turn de 2 é ${turns[1].turnsSkipped}`
    );
    console.log(
      `O jogador é ${activePlayer} e a posição é ${posicao[activePlayer]}`
    );
    moverElemento();
    regras();
  } else {
    console.log(
      `O turn é ${turns[activePlayer].turnsSkipped} e não pode jogar `
    );
    switchPlayer();
  }
});

//Botão de novo jogo
btnNew.addEventListener("click", init);
