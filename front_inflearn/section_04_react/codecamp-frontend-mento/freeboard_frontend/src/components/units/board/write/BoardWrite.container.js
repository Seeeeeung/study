import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { useRouter } from 'next/router.js'
import { CREATE_BOARD } from './BoardWrite.queries'
import BoardWriteUI from './BoardWrite.presenter'



export default function BoardWrite() {
	const router = useRouter()
	const [createBoard] = useMutation(CREATE_BOARD);
	
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
	}


	const onClickSubmit = async () => {
		if (!writer) setWriterError('작성자를 입력해주세요.');
		if (!password) setPasswordError('비밀번호를 입력해주세요.');
		if (!title) setTitleError('제목을 입력해주세요.');
		if (!contents) setContentsError('내용을 입력해주세요.');

		try {
			
		const result = await createBoard({
			variables: {
				createBoardInput : {
					writer:writer,
					title:title,
					password:password,
					contents:contents
				}
			}
		})
		if (writer && password && title && contents) {
			router.push(`/boards/${result.data.createBoard._id}`)
		}
		} catch (error) {
			console.log(error.message)
		}
	}

	return (
		<BoardWriteUI
				errorWriter = {errorWriter}
				errorPassword = {errorPassword}
				errorTtitle = {errorTtitle}
				errorContents = {errorContents}
				onChangeValue = {onChangeValue}
				onClickSubmit = {onClickSubmit}
		/>
	)
}