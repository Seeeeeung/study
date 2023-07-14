import {Email, EmailInput, Login, Title, LoginInput, InpLabel} from '../../styles/emotion'
import styles from '../../styles/EmotionPage.module.css'

export default function EmotionPage () {
	// 여기는 자바스크립트 쓰는곳


	return (
		<div>
			<Email>이메일</Email>
			<EmailInput type='text' />
			<button>클릭하세dd요dd</button>
			<img src='/vercel.svg' />
			
			{/* 실습 css-in-js */}
			<Login>
				<Title>로그인</Title>

				<InpLabel>아이디</InpLabel>
				<LoginInput type='text' />

				<InpLabel>비밀번호</InpLabel>
				<LoginInput type='password' />
			</Login>

			{/* 실습 기존 css */}
			<div className={styles.login}>
				<h2 className={styles.title}>로그인</h2>

				<p className={styles.label}>아이디</p>
				<input type='text' className={styles.input} />

				<p className={styles.label}>비밀번호</p>
				<input type='password' className={styles.input} />
			</div>
		</div>

	)
}