const GameForm = document.querySelector("#Game-form");
const maxInput = document.querySelector(".maxnumber input");
const guessInput = document.querySelector(".guessnumber input");
const GameScoreView = document.querySelector("#game-score");
const usernumView = document.querySelector(".usernum-view");
const machinenumView = document.querySelector(".machinenum-view");
const gameResult = document.querySelector(".game-result");

const HIDDEN_CLASS = "hidden";
const MAXNUM = "maxNum";

function playGameHandler(event) {
  event.preventDefault();
  const maxInputValue = parseInt(maxInput.value);
  const guessInputValue = parseInt(guessInput.value);
  const machinenumValue = Math.ceil(Math.random() * maxInputValue);

  GameScoreView.classList.remove(HIDDEN_CLASS);
  gameResult.classList.remove(HIDDEN_CLASS);
  usernumView.innerText = guessInputValue;
  machinenumView.innerText = machinenumValue;
  if (guessInputValue > machinenumValue) {
    gameResult.innerText = "You win";
  } else {
    gameResult.innerText = "You lose";
  }
}

//maxInput를 입력할때마다 guessInput의 max 값 갱신하기
function inputHandler() {
  localStorage.setItem(MAXNUM, maxInput.value);
  console.log(localStorage.getItem(MAXNUM));
  let saveMaxNum = localStorage.getItem(MAXNUM);
  guessInput.setAttribute("max", saveMaxNum);
}

GameForm.addEventListener("input", inputHandler);
GameForm.addEventListener("submit", playGameHandler);
