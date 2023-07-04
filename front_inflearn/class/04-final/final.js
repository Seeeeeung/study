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

const token = () => {
	const random = document.getElementById('valid-num').innerText = String(Math.floor(Math.random() * 1000000)).padStart(6, '0');

	let time = 180;
	let timer = setInterval(function() {
		if (time >= 0) {
			let min = Math.floor(time / 60);
			let sec = String(time % 60).padStart(2, '0');
			time = time - 1;
			document.getElementById('timer').innerText = min + ':' + sec;
		} else {
			clearInterval(timer);
		}
	},1000)
}