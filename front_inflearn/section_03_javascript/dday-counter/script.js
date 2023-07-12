
const msgContainer = document.querySelector('#d-day-msg');
const container = document.querySelector('#d-day-container');
const intervalIdArr = [];
const savedDate = localStorage.getItem('saved-date');
container.style.display = 'none';
msgContainer.innerHTML = '<h3>D-Day 를 입력해 주세요</h3>';

const dateFormMaker = function () {
const inputYear = document.querySelector('#target-year-input').value,
	inputMonth = document.querySelector('#target-month-input').value,
	inputDate = document.querySelector('#target-date-input').value;

	const dateFormat = `${inputYear}-${inputMonth}-${inputDate}`;
	// => 템플릿 리터럴 이라 명칭함

	return dateFormat;
};

const counterMaker = (data) => {
	console.log(data)
	console.log('반복 실행중') // => 쓸데없는 데이터 낭비를 하지 않기 위해 항상 체크하기(카운터가 작동하지 않을때 실행중인지 확인 // 오류있을경우도 마찬가지.)
	const nowDate = new Date();
	const targetDate = new Date(data).setHours(0,0,0,0);
	const remaining = (targetDate - nowDate) / 1000;

	const setText = () => {
		container.style.display = 'none';
		msgContainer.style.display = 'flex';
		setClearInterval();
	}

	/* 오류가 있을 경우 시작 */
	if (remaining <= 0) {
		setText();
		// setClearInterval() 때문에 h3 변경이 안먹힘 => setText에 넣으니까 작동함 => h3을 재설정하는게 setClearInterval 에도 있어서 그랬음. =>현재는 타이머 초기화 버튼과 clearinterval 을  분리시켜놓은 상태.
		msgContainer.innerHTML = '<h3>타이머가 종료되었습니다.</h3>';
		return;
	} else if (isNaN(remaining)) {
		setText();
		msgContainer.innerHTML = '<h3>유효한 시간대가 아닙니다.</h3>';
		return;
	}
	
	// return 값을 넣는 이유는 오류가떠서 타이머를 계산할 필요가 없기때문에 위 if 문 아래로는 불필요함에 의해 함수를 종료시키기 위해서이다.
	/* 오류가 있을 경우 끝 */


	/* 오류가 없을 경우 작동 시작 */
	// 1. 시간
	// const remainingDate = Math.floor(remaining / 3600 / 24);
	// const remainingHours = Math.floor(remaining / 3600) % 24;
	// const remainingMin = Math.floor(remaining / 60) % 60;
	// const remainingSec = Math.floor(remaining) % 60;
	// console.log(`"${remainingDate} , ${remainingHours} , ${remainingMin} , ${remainingSec}"`);

	const remainingObj = { // 1. 객체배열로 축약
		remainingDate: Math.floor(remaining / 3600 / 24),
		remainingHours: Math.floor(remaining / 3600) % 24,
		remainingMin: Math.floor(remaining / 60) % 60,
		remainingSec: Math.floor(remaining) % 60,
		// 한자리 숫자 2자리로 만들기 -> 축약 format()
		// remainingHours: String(Math.floor(remaining / 3600) % 24).padStart(2,'0'),
		// remainingMin: String(Math.floor(remaining / 60) % 60).padStart(2,'0'),
		// remainingSec: String(Math.floor(remaining) % 60).padStart(2,'0'),
	}

	// 2. 선택자(요소선택)
	// const days = document.querySelector('#days');
	// const hours = document.querySelector('#hours');
	// const min = document.querySelector('#min');
	// const sec = document.querySelector('#sec');

	// 2-1. 선택자 요소 배열로 축약
	// const documentObj = {
	// 	days: document.querySelector('#days'),
	// 	hours: document.querySelector('#hours'),
	// 	min: document.querySelector('#min'),
	// 	sec: document.querySelector('#sec'),
	// }

	// 3. 배열 키 사용
	// documentObj['days'].textContent = remainingObj['remainingDate'];
	// documentObj['hours'].textContent = remainingObj['remainingHours'];
	// documentObj['min'].textContent = remainingObj['remainingMin'];
	// documentObj['sec'].textContent = remainingObj['remainingSec'];

	const documentArr = ['days', 'hours', 'min', 'sec']; // 2-2. 요소 아이디 배열로 축약


	// 3 축약 /  1,2-1 배열 키 반환
	const timeKeys = Object.keys(remainingObj);
	// const docKeys = Object.keys(documentObj);

	const format = function (time) {
		if (time < 10) {
			return '0' + time;
		} else {
			return time;
		}
	}

	// 4. 3을 사용하여 타이머 제작
	// for (let j=0; j<timeKeys.length; j++) {
	// 	documentObj[docKeys[j]].textContent = remainingObj[timeKeys[j]];
	// 	// Bracket notation 괄호 표기법 접근(위 방식)
	// }

	// 5. 4 를 축약
	// let i = 0;
	// for (let key in documentObj) { // ** for in 문 => 객체에 사용 **
	// 	//  주어진 객체의 갯수만큼만 반복됨.
	// 	documentObj[key].textContent = remainingObj[timeKeys[i]];
	// 	i++;
	// }

	// 6. 5에서 사용하는 배열 중 반복되는 2-2 배열 축약하여 사용	
	let i = 0;
	for (let tag of documentArr) {
		const remainingTime = format(remainingObj[timeKeys[i]]);
		document.getElementById(tag).textContent = remainingTime;
		i++;
	}

	/* 오류가 없을 경우 작동 끝 */
}

const starter = function() {
	const getTargetDateInput = dateFormMaker(); // counterMaker 에 있었을때 setInterval 때문에 타이머가 진행되는 동안 계속 input의 값을 받아오기때문에 버튼을 눌렀을때만 실행시키기 위해 starter 함수에 넣음.

	// const intervalIdArr = [];
	// 함수가 실행할때마다 배열은 공백이 되기떄문에 아이디가 다 들어가지 않았다
	// 전역변수로 넣어주면 밖에서 불러오기떄문에 잘들어감.

	localStorage.setItem('saved-date', getTargetDateInput);

	container.style.display = 'flex';
	msgContainer.style.display = 'none';
	// counterMaker();

	// 타이머 자동 실행(제한있음 : 100번 횟수 제한, 화면상 깜빡임 존재)
	// for (let i = 0; i < 100; i++) {
	// 	setTimeout(() => { // 전달인자가 없는 경우에만 화살표함수 없이 함수 이름만(소괄호없이) 적어도 작동함
	// 		counterMaker();
	// 	}, 1000 * i)
	// }
	setClearInterval(); // 카운트 다운 시작 버튼만 눌렀을때(초기화 버튼 안누른 상태) 타이머 초기화가 안되있어서 타이머가 여러개 작동하기떄문에 화면상 오류를 띄우기때문에 초기화 한번 진행 시켜 줘야함 , intervalId 아래로 들어가면 작동안함^^

	counterMaker(getTargetDateInput);
	const intervalId =	setInterval(() => counterMaker(getTargetDateInput), 1000); // 1초 뒤에 시작되기때문에 앞에 함수를 한번 호출해줌 / 전달인자가 있는 경우 화살표 함수를 사용하여 수식을 표현하고 인자를 넣어줘야한다. 중괄호는 생략해도 됨{}
	console.log(intervalId)
	intervalIdArr.push(intervalId);
	console.log(intervalIdArr)
}

const setClearInterval = () => {
		for (let i=0; i < intervalIdArr.length; i++) {
			clearInterval(intervalIdArr[i]);
		}
		// console.log(intervalId)
}

const resetTimer = function() {
	container.style.display = 'none';
	msgContainer.style.display = 'flex';
	msgContainer.innerHTML = '<h3>D-Day 를 입력해 주세요</h3>';
	setClearInterval();
}

if (savedDate) { // truthy (true 와는 다름)
	// console.log(savedDate);
	starter(savedDate);
} else {
	console.log('data is null');
}
