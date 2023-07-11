let isStarted = false;


let varidate = () => {

	if (isStarted === false) {
		// 타이머가 작동 중이지 않을때
		isStarted = true;
		document.getElementById('compe').disabled = false;
		let number = String(Math.floor(Math.random() * 1000000)).padStart(6, "0");
	document.getElementById('varity').innerText = number;

	// timer
	let time = 180;
	let timer;
	timer = setInterval(function() {
		if (time >= 0) {
			let min = Math.floor(time / 60);
			let sec = String(time % 60).padStart(2, "0");
			time = time - 1;
			document.getElementById('timer').innerText = min + ':' + sec
		} else {
			// document.getElementById('compe').setAttribute('disabled',true)
			// 정답
			document.getElementById('compe').disabled = true;
			isStarted = false;
			clearInterval(timer);
		}
	}, 1000);

	} else {
		// 타이머가 작동 중일때
	}
	}

