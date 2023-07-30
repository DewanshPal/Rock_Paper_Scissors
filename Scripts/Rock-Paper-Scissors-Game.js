let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};

/*
if (!score) {
  score = {
    wins: 0,
    losses: 0,
    ties: 0
  };
}
*/
updateScoreElement();
document.body.addEventListener('keydown',(event)=>{if(event.key == 'r'){playGame('rock')}});
document.body.addEventListener('keydown',(event)=>{if(event.key == 'p'){playGame('paper')}});
document.body.addEventListener('keydown',(event)=>{if(event.key == 's'){playGame('scissors')}});
document.querySelector('.move-button-rock').addEventListener('click',()=>{playGame('rock')});
document.querySelector('.move-button-paper').addEventListener('click',()=>{playGame('paper')});
document.querySelector('.move-button-scissors').addEventListener('click',()=>{playGame('scissors')});
document.querySelector('.reset-score-button').addEventListener('click',()=>{score.wins = 0;score.losses = 0;score.ties = 0;localStorage.removeItem('score');updateScoreElement();});
document.querySelector('.AutoPlay').addEventListener('click',()=>{autoPlay();});
function playGame(playerMove) {
  const computerMove = pickComputerMove();

  let result = '';

  if (playerMove === 'scissors') {
    if (computerMove === 'rock') {
      result = 'You lose.';
    } else if (computerMove === 'paper') {
      result = 'You win.';
    } else if (computerMove === 'scissors') {
      result = 'Tie.';
    }

  } else if (playerMove === 'paper') {
    if (computerMove === 'rock') {
      result = 'You win.';
    } else if (computerMove === 'paper') {
      result = 'Tie.';
    } else if (computerMove === 'scissors') {
      result = 'You lose.';
    }
    
  } else if (playerMove === 'rock') {
    if (computerMove === 'rock') {
      result = 'Tie.';
    } else if (computerMove === 'paper') {
      result = 'You lose.';
    } else if (computerMove === 'scissors') {
      result = 'You win.';
    }
  }

  if (result === 'You win.') {
    score.wins += 1;
  } else if (result === 'You lose.') {
    score.losses += 1;
  } else if (result === 'Tie.') {
    score.ties += 1;
  }

  localStorage.setItem('score', JSON.stringify(score));
  updateScoreElement();
  document.querySelector('.js-result').innerHTML = result;
  document.querySelector('.js-moves').innerHTML  = `You 
<img src="https://supersimple.dev/projects/rock-paper-scissors/images/${playerMove}-emoji.png" class="icon">
<img src="https://supersimple.dev/projects/rock-paper-scissors/images/${computerMove}-emoji.png" class="icon">
Computer`;
  // alert(`You picked ${playerMove}. Computer picked ${computerMove}. ${result}
  // Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`);
}

function autoPlay()
{
  if(document.querySelector('.AutoPlay').innerHTML === 'AutoPlay')
  {
    document.querySelector('.AutoPlay').innerHTML = 'Stop';
    intervalID=setInterval(function()
  {
    const randomNumber = Math.random();
    if (randomNumber >= 0 && randomNumber < 1 / 3)
    {
      playGame('rock');
    } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3)
    {
      playGame('paper');
    } 
    else if (randomNumber >= 2 / 3 && randomNumber < 1) 
    {
      playGame('scissors');
    }
  },1000);
  }
  else
  {
    document.querySelector('.AutoPlay').innerHTML = 'AutoPlay';
    clearInterval(intervalID)
  }
}

function updateScoreElement(){
  document.querySelector('.js-score').innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`
}
function pickComputerMove() {
  const randomNumber = Math.random();

  let computerMove = '';

  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = 'rock';
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = 'paper';
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove = 'scissors';
  }

  return computerMove;
}