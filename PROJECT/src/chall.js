const rangeValue = document.querySelector("#range");
const userPick = document.querySelector("#user__pick");
const computerPick = document.querySelector("#computer__pick");
const userPickNum = document.querySelector("#userPickNum");
const matchResult = document.querySelector("#result");
const showResultBtn = document.querySelector(".showResultBtn");

// userPick.addEventListener("change", () => {
//   console.log("value ==>");
// });

let num = 0;

const computerRandomPick = () => {
  num = Math.floor(Math.random() * rangeValue.value + 1);

  computerPick.innerHTML = `computer ==> ${num}`;
};

const handlerFunction = {
  setRangeValue: (e) => {
    e.preventDefault();
    userPick.max = rangeValue.value;

    if (parseInt(rangeValue.value) < 0) {
      rangeValue.value = 0;
    }
  },

  setUserPickValue: (e) => {
    e.preventDefault();
    if (parseInt(userPick.value) > parseInt(rangeValue.value)) {
      userPick.value = rangeValue.value;
    }
  },

  showResult: (e) => {
    if (userPick.value === "" || rangeValue.value === "") {
      e.preventDefault();
      computerPick.innerHTML = "";
      userPickNum.innerHTML = "";
      matchResult.innerHTML = "";
      alert("입력 값을 확인해주세요!");
      return;
    }

    computerRandomPick();
    e.preventDefault();

    userPickNum.innerHTML = `user ==> ${userPick.value}, `;

    if (parseInt(userPick.value) > num) {
      matchResult.innerHTML = `You Win!!`;
    } else if (parseInt(userPick.value) === num) {
      matchResult.innerHTML = `Draw o_o`;
    } else if (parseInt(userPick.value) < num) {
      matchResult.innerHTML = `You Lose.. ㅠㅠ`;
    }
  }
};

rangeValue.addEventListener(`change`, handlerFunction.setRangeValue);
userPick.addEventListener("change", handlerFunction.setUserPickValue);
showResultBtn.addEventListener(`click`, handlerFunction.showResult);
