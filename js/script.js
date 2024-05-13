let currentPlayer = 'player1';
let player1Score = 0;
let player2Score = 0;
let player1Dice = [];
let player2Dice = [];
let gameFinished = false;

function rollDice() {
  if (gameFinished) return;
  rollForPlayer(currentPlayer);
  currentPlayer = currentPlayer === 'player1' ? 'player2' : 'player1';
  updateRollButton();
}

function rollForPlayer(player) {
  let diceContainer = document.getElementById(player + '-dice');
  diceContainer.innerHTML = '';
  let total = 0;
  let diceElements = [];
  let playerDice = player === 'player1' ? player1Dice : player2Dice;
  for (let i = 0; i < 4; i++) {
    let diceValue = rollUniqueDice(playerDice);
    total += diceValue;
    playerDice.push(diceValue);
    let diceDiv = document.createElement('div');
    diceDiv.classList.add('dice');
    diceDiv.textContent = diceValue;
    diceElements.push(diceDiv);
    diceContainer.appendChild(diceDiv);
  }
  animateDice(diceElements);
  setTimeout(function () {
    updateScore(player, total);
    if (player === 'player1') {
      player1Score = total;
    } else {
      player2Score = total;
      displayWinner();
    }
  }, 500); 
}


function rollUniqueDice(playerDice) {
  let diceValue = Math.floor(Math.random() * 6) + 1;
  while (playerDice.includes(diceValue)) {
    diceValue = Math.floor(Math.random() * 6) + 1;
  }
  return diceValue;
}

function animateDice(diceElements) {
  diceElements.forEach(function (diceDiv, index) {
    setTimeout(function () {
      diceDiv.style.transform = 'rotateX(360deg) rotateY(360deg)';
    }, index * 200);
  });
}

function updateScore(player, score) {
  let scoreElement = document.getElementById(player + '-score');
  scoreElement.textContent = 'Score: ' + score;
}

function displayWinner() {
  let winner;
  if (player1Score > player2Score) {
    winner = 'Player 1';
  } else if (player1Score < player2Score) {
    winner = 'Player 2';
  } else {
    winner = 'It\'s a tie!';
  }
  document.getElementById('winner').textContent = `Winner: ${winner}`;
  gameFinished = true;
  document.getElementById('roll-button').style.display = 'none';
  document.getElementById('refresh-button').style.display = 'block';
}

function resetGame() {
  currentPlayer = 'player1';
  player1Score = 0;
  player2Score = 0;
  player1Dice = [];
  player2Dice = [];
  gameFinished = false;
  document.getElementById('winner').textContent = '';
  document.getElementById('player1-score').textContent = 'Score: 0';
  document.getElementById('player2-score').textContent = 'Score: 0';
  document.getElementById('player1-dice').innerHTML = '';
  document.getElementById('player2-dice').innerHTML = '';
  document.getElementById('roll-button').textContent = 'Roll for Player 1';
  document.getElementById('roll-button').style.display = 'inline-block';
  document.getElementById('refresh-button').style.display = 'none';
}
