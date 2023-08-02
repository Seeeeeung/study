import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { useRouter } from 'next/router.js'
import { CREATE_BOARD } from './BoardWrite.queries'
import BoardWriteUI from './BoardWrite.presenter'



export default function BoardWrite() {
	const router = useRouter();
	const [isActive, setIsActive] = useState(true);
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
			password && title && contents && event.target.value ? setIsActive(false) : setIsActive(true);
		}
		if (_checkTarget.includes('비밀번호')) {
			setPassword(savedData);
			if (savedData !== '') setPasswordError('')
			writer && title && contents && event.target.value ? setIsActive(false) : setIsActive(true);
		}
		if (_checkTarget.includes('제목')) {
			setTitle(savedData);
			if (savedData !== '') setTitleError('')
			writer && password && contents && event.target.value ? setIsActive(false) : setIsActive(true);
		}
		if (_checkTarget.includes('내용')) {
			setContents(savedData);
			if (savedData !== '') setContentsError('')
			writer && password && title && event.target.value ? setIsActive(false) : setIsActive(true);
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

	console.log(isActive)

	return (
		<BoardWriteUI
				errorWriter = {errorWriter}
				errorPassword = {errorPassword}
				errorTtitle = {errorTtitle}
				errorContents = {errorContents}
				onChangeValue = {onChangeValue}
				onClickSubmit = {onClickSubmit}
				isActive = {isActive}
		/>
	)
}