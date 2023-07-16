import {useState} from 'react';

export default function ReactHooksPage () {
	const [text, setText] = useState('안녕하세요');
	
	function onClickChangeTextLet() {
		let text = document.getElementById('btnLet');
		text.innerText = '반갑습니다'
	}

	function onClickChangeTextState() {
		setText('반갑습니다')
	}

	return (
		<>
			<button type='button' onClick={onClickChangeTextLet} id='btnLet'>안녕하세요</button>
			<button type='button' onClick={onClickChangeTextState}>{text}</button>
		</>
	)
}