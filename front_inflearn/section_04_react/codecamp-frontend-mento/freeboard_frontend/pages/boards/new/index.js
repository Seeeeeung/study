// import styled from '@emotion/styled';
import { useState } from 'react'
import {Container, Contents, BoxShadow, Title, WrapForm, WrapInp, Inp, InpLabel, TextArea, Button, ButtonGroup, FileBox, FileUpLoad, BgChk, Radio, Error} from '../../../styles/emotion.js'

// const CREATE_BOARD = gql`
// 	mutation createBoard 
// `

export default function boardUpLoadPage() {
	const [writer, setWriter] = useState('')
	const [password, setPassword] = useState('')
	const [title, setTitle] = useState('')
	const [contents, setContents] = useState('')

	const [errorWriter, setWriterError] = useState('')
	const [errorPassword, setPasswordError] = useState('')
	const [errorTtitle, setTitleError] = useState('')
	const [errorContents, setContentsError] = useState('')

	function onChangeValue(event) {
		let savedData = event.target.value;
		let _checkTarget = event.target.attributes.title.value;

		if (_checkTarget.includes('작성자')) {
			setWriter(savedData);
			if (savedData !== '') setWriterError('')
		}
		if (_checkTarget.includes('비밀번호')) {
			setPassword(savedData);
			if (savedData !== '') setPasswordError('')
		}
		if (_checkTarget.includes('제목')) {
			setTitle(savedData);
			if (savedData !== '') setTitleError('')
		}
		if (_checkTarget.includes('내용')) {
			setContents(savedData);
			if (savedData !== '') setContentsError('')
	}

		// switch(true) {
		// 	case _checkTarget.includes('작성자') : setWriter(savedData);
		// 	// break;
		// 	case _checkTarget.includes('비밀번호') : setPassword(savedData);
		// 	// break;
		// 	case _checkTarget.includes('제목') : setTitle(savedData);
		// 	// break;
		// 	case _checkTarget.includes('내용') : setContents(savedData);
		// 	break;
		// }

		// if (savedData !== '') {
		// 	switch(true) {
		// 		case _checkTarget.includes('작성자') : setWriterError('');
		// 		break;
		// 		case _checkTarget.includes('비밀번호') : setPasswordError('');
		// 		break;
		// 		case _checkTarget.includes('제목') : setTitleError('');
		// 		break;
		// 		case _checkTarget.includes('내용') : setContentsError('');
		// 		break;
		// 	}
		// }

		// console.log(savedData)
		// console.log(writer)
		// console.log(errorWriter)
		// showError(_checkTarget)
		// console.log(errorWriter)
		// console.log(showError(_checkTarget))
	}


	function onClickSubmit() {
		if (!writer) setWriterError('작성자를 입력해주세요.');
		if (!password) setPasswordError('비밀번호를 입력해주세요.');
		if (!title) setTitleError('제목을 입력해주세요.');
		if (!contents) setContentsError('내용을 입력해주세요.');

		if (writer && password && title && contents) alert('게시글이 등록되었습니다.')
	
		// console.log(!title)
		// switch(true) {
		// 	case !writer : setWriterError('error');
		// 	break;
		// 	case !password : setPasswordError('error');
		// 	break;
		// 	case !title : setTitleError('error');
		// 	break;
		// 	case !contents : setContentsError('error');
		// 	break;
		// }
		// if (!writer) {
		// 	setWriterError('error')
		// }
	}

	return (
		<Container>
			<Contents>
				<BoxShadow>
					<Title>게시물 등록</Title>
					<WrapForm className={'col'}>
						<WrapInp>
							<InpLabel>작성자</InpLabel>
							<Inp type='text' title='작성자를 입력' placeholder='이름을 입력해주세요.' onChange={onChangeValue} />
							<Error>{errorWriter}</Error>
						</WrapInp>

						<WrapInp>
							<InpLabel>비밀번호</InpLabel>
							<Inp type='password' title='비밀번호를 입력해주세요.' placeholder='비밀번호를 입력해주세요..' onChange={onChangeValue} />
							<Error>{errorPassword}</Error>
						</WrapInp>
					</WrapForm>

					<WrapForm>
						<InpLabel>제목</InpLabel>
						<Inp type='text' title='제목을 작성' placeholder='제목을 작성해주세요.' onChange={onChangeValue} />
						<Error>{errorTtitle}</Error>
					</WrapForm>

					<WrapForm>
						<InpLabel>내용</InpLabel>
						<TextArea cols='' rows='' title='내용을 작성해주세요.' placeholder='내용을 작성해주세요.' onChange={onChangeValue}></TextArea>
						<Error>{errorContents}</Error>
					</WrapForm>

					<WrapForm className={'address'}>
						<InpLabel>주소</InpLabel>
						<WrapInp className={'col'}>
							<Inp type='number' title='우편번호 입력' placeholder='07250' readOnly />
							<Button type='button' className={'black small'}>우편번호 검색</Button>
						</WrapInp>

						<Inp type='text' title='주소를 입력해주세요.' placeholder='주소를 입력해주세요.' readOnly />
						<Inp type='text' title='상세주소 입력해주세요.' placeholder='상세주소 입력해주세요.' />
					</WrapForm>

					<WrapForm>
						<InpLabel>유튜브</InpLabel>
						<Inp type='text' title='유튜브 링크 복사' placeholder='링크를 복사해주세요.' />
					</WrapForm>

					<WrapForm>
						<InpLabel>사진 첨부</InpLabel>
						<FileBox className={'col'}>
							<div className={'wrap-file'}>
								<FileUpLoad type='file' title='사진 첨부' id='file_upload_0' />
								<label for='file_upload_0'></label>
							</div>

							<div className={'wrap-file'}>
								<FileUpLoad type='file' title='사진 첨부' id='file_upload_1' />
								<label for='file_upload_1'></label>
							</div>

							<div className={'wrap-file'}>
								<FileUpLoad type='file' title='사진 첨부' id='file_upload_2' />
								<label for='file_upload_2'></label>
							</div>
						</FileBox>
					</WrapForm>

					<WrapForm>
						<InpLabel>메인 설정</InpLabel>
						<BgChk>
							<Radio type='radio' name='radio-01' id='radio-01-01' checked />
							<label for='radio-01-01'>유튜브</label>
						</BgChk>

						<BgChk>
							<Radio type='radio' name='radio-01' id='radio-01-02' />
							<label for='radio-01-02'>사진</label>
						</BgChk>
					</WrapForm>

					<ButtonGroup>
						<Button type='button' className={'yellow'} onClick={onClickSubmit}>등록하기</Button>
					</ButtonGroup>

				</BoxShadow>
			</Contents>
		</Container>
	)
}