import {useState} from 'react';

export default function TockenPage() {
	const [number, setNumber] = useState('000000');

	function sendNumber() {
		let setNumber = String(Math.floor(Math.random() * 1000000)).padStart(6,'0')
		document.getElementById('number').innerText = setNumber;
	}

	function sendNumberState() {
		setNumber(String(Math.floor(Math.random() * 1000000)).padStart(6,'0'))
	}

	return (
		<>
			<div id='number'>000000</div>
			<button onClick={sendNumber}>인증번호 전송</button>

			<div>{number}</div>
			<button onClick={sendNumberState}>인증번호 전송</button>
		</>
	)
}