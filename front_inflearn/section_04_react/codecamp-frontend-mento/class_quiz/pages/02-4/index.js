import {useState} from 'react';
// import styled from '../../styles/loginFormPage'
import {
	Wrapper,
	InputText,
	ErrorMsg,
	Join
} from '../../styles/loginFormPage'

export default function loginFormPage() {
	const [email, setEmail] = useState('')
	const [pw1, setPw1] = useState('')
	const [pw2, setPw2] = useState('')

	const [errEmail, setErrEmail] = useState('')
	const [errPw1, setErrPw1] = useState('')
	const [errPw2, setErrPw2] = useState('')

	function getEmail(event) {
		setEmail(event.target.value)
	}

	function getPw1(event) {
		setPw1(event.target.value)
	}

	function getPw2(event) {
		setPw2(event.target.value)
	}

	function onClickJoin() {
		let isValid = true;
		
		// console.log(email==='' || email.includes('@') === false)
		if (email==='' || email.includes('@') === false) {
			setErrEmail('이메일이 올바르지 않습니다.')
			// isValid = false;
		} else {
			setErrEmail('')
			console.log("/.")
		}

		if (pw1==='') {
			setErrPw1('비밀번호를 입력해주세요.');
			isValid = false;
		} else {
			setErrPw1('')
		}

		if (pw2==='') {
			setErrPw2('비밀번호를 입력해주세요.')
			isValid = false;
		} else if (pw1 !== pw2) {
			setErrPw2('비밀번호가 올바르지 않습니다.')
			isValid = false;
		} else {
			setErrPw2('')
		}

		if (isValid) {
			alert('가입 완료')
		}
	}

	return (
		<>
			<Wrapper>
				<InputText type='email' title='이메일을 입력' placeholder='이메일을 입력해주세요.' onChange={getEmail} />
				<ErrorMsg>{errEmail}</ErrorMsg>

				<InputText type='password' title='비밀번호를 입력' placeholder='비밀번호를 입력해주세요.' onChange={getPw1} />
				<ErrorMsg>{errPw1}</ErrorMsg>

				<InputText type='password' title='비밀번호 재확인 입력' placeholder='비밀번호를 다시 입력해주세요.' onChange={getPw2} />
				<ErrorMsg>{errPw2}</ErrorMsg>

				<Join onClick={onClickJoin}>가입하기</Join>
			</Wrapper>
		</>
	)
}