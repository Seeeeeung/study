import {useState} from 'react';

export default function CounterPage() {
	const [count, setCount] = useState(0);

	function onClickUpLet() {
		let count = Number(document.getElementById('count').innerText);
		count = count + 1;
		document.getElementById('count').innerText = count;
	}

	function onClickUpState() {
		// count = count + 1
		setCount(count + 1);
	}

	return (
		<>
			<div id='count'>0</div>
			<button type='button' onClick={onClickUpLet}>카운트 증가</button>


			<div>{count}</div>
			<button type='button' onClick={onClickUpState}>카운트 증가</button>
		</>
	)
}