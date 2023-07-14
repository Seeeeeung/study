import {useState} from 'react';

export default function SignUpStatePage() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const [emailError, setEmailError] = useState('');
	const [passwordError, setPasswordError] = useState('');

	function onChangeEmail(event) { // 이러한 함수들을 이벤트 핸들러라 칭함
		console.log(event) // 나의 행동
		console.log(event.target) //  작동된 태그
		console.log(event.target.value) // 작동된 태그에 입력된 값
		setEmail(event.target.value);
	}

	function onChangePassword(event) {
		setPassword(event.target.value);
	}

	function onClickSignUp() {
		// 진짜 포장이 잘 되었는지 확인해보기
		console.log(email)
		console.log(password)

		// 검증하기
		let isValid = true;
		if (email.includes('@') === false) {
			setEmailError('이메일이 올바르지 않습니다.')
			isValid = false;
		} else {
			setEmailError('')
		}
		
		if (password === '') {
			setPasswordError('비밀번호를 입력해 주세요.');
			isValid = false;
		} else {
			setPasswordError('');
		}

		if (isValid === true) {
			alert('회원가입을 축하합니다!')
		}
		console.log(isValid)
		// if (email.includes('@') === false) {
		// 	// alert('이메일이 올바르지 않습니다.')
		// 	// document.getElementById('error').innerText = '이메일이 올바르지 않습니다.'
		// 	setEmailError('이메일이 올바르지 않습니다.')
		// 	console.log(password === '')
		// 	console.log(email.includes('@') === false)
		// } else if (password === '') {
		// 	setPasswordError('비밀번호를 입력해 주세요.');
		// } else {
		// 	// 메시지 알림 이전, backend 컴퓨터에 API 함수 요청하기
		// 	alert('회원가입을 축하합니다!')
		// }
	}

	return (
		<>
			이메일 : <input type='email' onChange={onChangeEmail} />
			{/* <div id='error'></div> */}
			<div>{emailError}</div>
			비밀번호 : <input type='password' onChange={onChangePassword} />
			<div>{passwordError}</div>
			<button onClick={onClickSignUp}>회원가입</button>
		</>
	)
}