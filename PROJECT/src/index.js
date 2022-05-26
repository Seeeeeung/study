
const rangeInput = document.querySelector("#range input");
const userNumInput = document.querySelector("#write input");
const btn = document.querySelector("a");
const answer = document.querySelector("#progress");
const result = document.querySelector("#result");

function onGame(event) {
  event.preventDefault();
  const choice = "userNumber";
  const loadNum = parseInt(userNumInput.value);
  const maxNumber = parseInt(rangeInput.value);
  
  localStorage.setItem(choice, loadNum);
  localStorage.getItem(loadNum);
  const randomNumber = Math.ceil(Math.random() * maxNumber);

  answer.innerText = `You chose: ${loadNum}, the machine chose:${randomNumber}`;

  if (randomNumber === loadNum) {
    result.innerHTML = `You won!`;
  } else {
    result.innerHTML = `You lose!`
  }
}

btn.addEventListener("click", onGame);