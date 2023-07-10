const changeFocus = () => {
	const ph1 = document.getElementById('ph1').value;
	
	if (ph1.length === 3) ph2.focus();
}

const changeFocus2 = () => {
	const ph2 = document.getElementById('ph2').value;
	if (ph2.length === 4) ph3.focus();
}

const changeDisabled = () => {
	const ph1 = document.getElementById('ph1').value.length === 3;
	const ph2 = document.getElementById('ph2').value.length === 4;
	const ph3 = document.getElementById('ph3').value.length ===4;
	if (ph1 && ph2 && ph3) {
		console.log(document.getElementById('submit'))
		document.getElementById('submit').disabled = '';
	} else {
		document.getElementById('submit').disabled = 'true';
	}
}

function getToken() {
	document.getElementById('valid-num').innerText = String(Math.floor(Math.random() * 1000000)).padStart(6, '0');
	document.getElementById('submit').disabled = 'true';
	document.getElementById('validate').disabled = '';
	getTimer()
}

// 승연이 화나증말
let interval;
function getTimer() {
	let time = 180;
	interval = setInterval(function() {
		
		if (time >= 0) {
				let min = Math.floor(time / 60);
				let sec = String(time % 60).padStart(2, '0');
			document.getElementById('timer').innerText = min + ':' + sec;
			time = time - 1;

		} else {
			document.getElementById('validate').disabled = 'true';
			document.getElementById('submit').disabled = '';
			document.getElementById('valid-num').innerText = '000000';
			document.getElementById('timer').innerText = '3:00';
			clearInterval(interval)
		}
	}, 1000)
}

function clearTimer() {
	clearInterval(interval);
	alert('인증이 완료되었습니다.');
	document.getElementById('validate').disabled = 'true';
	document.getElementById('join').disabled = '';
}

function checkJoin() {
	let inp = document.getElementsByClassName('input-text');
	let email = document.getElementById('email'),
		pw = document.getElementById('pw'),
		pwCheck = document.getElementById('pwCheck');

	for (let i=0; i < inp.length; i++) {
		let parent = inp[i].parentElement;
		if (inp[i].value.length === 0) {
			parent.classList.add('err');
		} else {
				parent.classList.remove('err');
		}
	}

	if (!email.value.includes('@') && email.value.length > 0) {
		email.parentElement.classList.remove('err');
		email.parentElement.classList.add('warn');
	} else {
		email.parentElement.classList.remove('warn');
	}

	if (pwCheck.value !== pw.value) {
		pwCheck.parentElement.classList.remove('err');
		pwCheck.parentElement.classList.add('warn');
	} else {
		pwCheck.parentElement.classList.remove('warn');
	}

	let chkSec = document.getElementById('select');
	let option = chkSec.children;
	for (let j=1; j < option.length; j++) {
		if (option[j].selected === true) {
			chkSec.parentElement.classList.remove('err')
			break;
		} else {
			chkSec.parentElement.classList.add('err')
		}
	}

	let chkradio = document.getElementsByName('radio-01');
	for (let h=0; h < chkradio.length; h++) {
		if (chkradio[h].checked === true) {
			document.getElementById('box-check').classList.remove('err')
			break;
		} else {
			document.getElementById('box-check').classList.add('err')

		}
	}

	let checkAll = document.getElementById('form').children;
	let a = 0;



	for (let k=0; k < checkAll.length; k++) {
		let checkErr = checkAll[k].className.includes('err') === true || checkAll[k].className.includes('warn') === true;
		// console.log(checkAll[k].className)
		// console.log(checkAll[k].className.includes('err'))
		// console.log(checkAll[k].className.includes('warn'))
		if (checkErr === true) {
			// console.log('가입실패')
			// break
			a=1;
		} else {
			// break
			a=0;
		}
	}
	// break;

	if (a===0) {
		// alert('코드캠프 가입을 축하합니다.')
		console.log('가입완료')
	} else {
		console.log('가입실패')
	}

}
