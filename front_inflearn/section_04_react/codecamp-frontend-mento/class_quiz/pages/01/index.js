import {
	Search,
	Header,
	User,
	UserImg,
	UserName,
	Nav,
	Gnb,
	Container,
	Contents,
	QuickBar
} from '../../styles/appMyPage';
import styles from '../../styles/appMyPage.module.css'

export default function appMyPage() {


	return (
		<>
			<Search>
					<button type='button'>검색하기</button>
			</Search>

			<Header>
				<h2 className={styles.title}>마이</h2>

				<User href='' title='내 프로필'>
					<UserImg>
					<img src='/img-profile.png' />
					</UserImg>

					<UserName>임정아</UserName>
					<i className='ico-arr-right'></i>
				</User>
			</Header>

			<Nav>
				<Gnb>
					<li>
						<a href=''>공지사항</a>
					</li>
					<li>
						<a href=''>이벤트</a>
					</li>
					<li className='active'>
						<a href=''>FAQ</a>
					</li>
					<li>
						<a href=''>Q&amp;A</a>
					</li>
				</Gnb>
			</Nav>

			<Container>
				<Contents>
					<ul className={[styles.accordion, styles.qna]}>
						<li>
							<div className='tit-area'>
								<button type='button' className={'btn-toggle tit'}>
									<span>Q. 01</span>
									리뷰 작성은 어떻게 하나요?
									<i className='ico-arr-btm'></i>
								</button>
							</div>
						</li>

						<li>
							<div className='tit-area'>
								<button type='button' className={'btn-toggle tit'}>
									<span>Q. 02</span>
									리뷰 수정/삭제는 어떻게 하나요?
									<i className='ico-arr-btm'></i>
								</button>
							</div>
						</li>

						<li>
							<div className='tit-area'>
								<button type='button' className={'btn-toggle tit'}>
									<span>Q. 03</span>
									아이디/비밀번호를 잊어버렸어요
									<i className='ico-arr-btm'></i>
								</button>
							</div>
						</li>

						<li>
							<div className='tit-area'>
								<button type='button' className={'btn-toggle tit'}>
									<span>Q. 04</span>
									회원탈퇴를 하고싶어요.
									<i className='ico-arr-btm'></i>
								</button>
							</div>
						</li>

						<li>
							<div className='tit-area'>
								<button type='button' className={'btn-toggle tit'}>
									<span>Q. 05</span>
									출발지 설정은 어떻게 하나요?
									<i className='ico-arr-btm'></i>
								</button>
							</div>
						</li>

						<li>
							<div className='tit-area'>
								<button type='button' className={'btn-toggle tit'}>
									<span>Q. 06</span>
									비밀번호를 변경하고 싶어요
									<i className='ico-arr-btm'></i>
								</button>
							</div>
						</li>
					</ul>
				</Contents>
			</Container>

			<QuickBar>
				<a href=''>
					<img src='/btn-home.png' />
					<span>홈</span>
				</a>

				<a href=''>
					<img src='/btn-islode.png' />
					<span>잇츠로드</span>
				</a>

				<a href=''>
					<img src='/btn-favorit.png' />
					<span>마이찜</span>
				</a>

				<a href='' className={styles.active}>
					<img src='/btn-mypage.png' />
					<span>마이</span>
				</a>
			</QuickBar>
		</>
	)
}