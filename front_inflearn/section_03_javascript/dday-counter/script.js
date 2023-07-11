
const msgContainer = document.querySelector('#d-day-msg');
const container = document.querySelector('#d-day-container');
// container.style.display = 'none';
msgContainer.innerHTML = '<h3>D-Day 를 입력해 주세요</h3>';

const dateFormMaker = function () {
const inputYear = document.querySelector('#target-year-input').value,
	inputMonth = document.querySelector('#target-month-input').value,
	inputDate = document.querySelector('#target-date-input').value

	const dateFormat = `${inputYear}-${inputMonth}-${inputDate}`;
	// => 템플릿 리터럴 이라 명칭함

	return dateFormat;
};

const counterMaker = () => {
	const targetDateInput = dateFormMaker();
	const nowDate = new Date();
	const targetDate = new Date(targetDateInput).setHours(0,0,0,0);
	const remaining = (targetDate - nowDate) / 1000;

	if (remaining <= 0) {
		msgContainer.innerHTML = '<h3>타이머가 종료되었습니다.</h3>';
	} else if (isNaN(remaining)) {
		msgContainer.innerHTML = '<h3>유효한 시간대가 아닙니다.</h3>';
	}

	// const remainingDate = Math.floor(remaining / 3600 / 24);
	// const remainingHours = Math.floor(remaining / 3600) % 24;
	// const remainingMin = Math.floor(remaining / 60) % 60;
	// const remainingSec = Math.floor(remaining) % 60;
	// console.log(`"${remainingDate} , ${remainingHours} , ${remainingMin} , ${remainingSec}"`);

	const remainingObj = {
		remainingDate: Math.floor(remaining / 3600 / 24),
		remainingHours: Math.floor(remaining / 3600) % 24,
		remainingMin: Math.floor(remaining / 60) % 60,
		remainingSec: Math.floor(remaining) % 60,
	}

	const days = document.querySelector('#days');
	const hours = document.querySelector('#hours');
	const min = document.querySelector('#min');
	const sec = document.querySelector('#sec');

	const dDayObj = {
		days: document.querySelector('#days'),
		hours: document.querySelector('#hours'),
		min: document.querySelector('#min'),
		sec: document.querySelector('#sec'),
	}

	// dDayObj['days'].textContent = remainingObj['remainingDate'];
	// dDayObj['hours'].textContent = remainingObj['remainingHours'];
	// dDayObj['min'].textContent = remainingObj['remainingMin'];
	// dDayObj['sec'].textContent = remainingObj['remainingSec'];

	console.log(dDayObj[0])
	for (let i=0; i<dDayObj.length; i++) {
		for (let j=0; j<remainingObj.length; j++) {
			dDayObj[i].textContent = remainingObj[j];
		}
	}

}