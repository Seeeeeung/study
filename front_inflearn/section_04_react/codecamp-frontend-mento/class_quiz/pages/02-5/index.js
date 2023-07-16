import {useState} from 'react';
import styles from '../../styles/isLoadLoginPage.module.css'
import {
	Wrapper,
	Login,
	Logo,
	Form,
	WrapInp,
	ErrorMsg,
	BtnLogin,
	ButtonGroup
} from '../../styles/isLoadLoginPage.js'


export default function iSLoadLoginPage() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [ErrorEmail, setErrEmail] = useState('이메일 주소를 다시 확인해주세요.')
	const [ErrorPw, setErrPw] = useState('8~16자의 영문, 숫자, 특수 문자만 사용 가능합니다.')
	
	// function getEmailValue (event) {
	// }
	
	// function getPwValue (event) {
	// 	setPassword(event.target.value)
	// }
	
	function eventHandleFromInp(event) {
		const _target = event.target;
		if (_target.type === 'email') {
			setEmail(event.target.value)
		} else if (_target.type === 'password') {			
			setPassword(event.target.value)
		}
		
		showBtnDel(event)
	}

	function showBtnDel(event) {
		const _target = event.target;
		let _focusTarget = document.activeElement;
		if (_target === _focusTarget && _target.value !== '') {
			_target.nextSibling.classList.add('on')
		} else {
			_target.nextSibling.classList.remove('on')

		}
	// 	console.log(_target.nextSibling)
	// 	// console.log(_target)
	// 	// _target == _focusTarget || event.keyCode === 32 || _target.value !== '' ? _target.nextSibling.classList.add('on') : _target.nextSibling.classList.remove('on');

	// 	const input = document.getElementsByTagName('input');
	// 	const body = document.querySelector('body')
	// 	body.addEventListener('click', )
	// 	for (let i=0; i<input.length; i++) {
	// 		console.log(_target !== input[i])
	// 		// if (input[i] !== _focusTarget) {
	// 		// 	input[i].nextElementSibling.classList.remove('on')
	// 		// }
	// 	}

	}

	function checkLoginForm() {
		let isValid = true;
		const err_01 = document.getElementById('errEmail')
		const err_02 = document.getElementById('errPw')
		// console.log(err_01)
	
		if (email === '' || email.trim() === '' || email.includes('@') === false) {
			err_01.style.display = 'block';
			isValid = false;
		} else {
			err_01.style.display = 'none';
		}

		console.log(password.trim() === '')
		if (password === '' || password.trim() === '' || password.length < 8) {
			err_02.style.display = 'block';
			isValid = false;
		} else {
			err_02.style.display = 'none';
		}
	}

	return (
		<Wrapper>
			<Login>
				<Logo>
					<img src='/logo.png' />
					<h1 className={'title'}>잇츠로드</h1>
				</Logo>

				<Form>
					<WrapInp>
						<input type='email' title='이메일 입력' placeholder='이메일을 입력해주세요.' onFocus={showBtnDel} onChange={eventHandleFromInp} />
						<button type='button' className={'btn-delete'}>삭제</button>
					</WrapInp>
					<ErrorMsg id='errEmail'>{ErrorEmail}</ErrorMsg>

					<WrapInp>
						<input type='password' title='비밀번호 8자리 입력' placeholder='비밀번호 8자리를 입력해주세요.' onFocus={showBtnDel} onChange={eventHandleFromInp} />
						<button type='button' className={'btn-delete'}>삭제</button>
					</WrapInp>
					<ErrorMsg id='errPw'>{ErrorPw}</ErrorMsg>
				</Form>

					<BtnLogin onClick={checkLoginForm} className={styles.btnDefault}>로그인</BtnLogin>

					<ButtonGroup>
						<a href=''>이메일 찾기</a>
						<a href=''>비밀번호 찾기</a>
						<a href=''>회원가입</a>
					</ButtonGroup>

					<BtnLogin className={styles.btnKakao}><i className={`${styles['ico-kakao']}`}></i>카카오톡으로 로그인</BtnLogin>
			</Login>
		</Wrapper>
	)
}