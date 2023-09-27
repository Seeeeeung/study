import { useRouter } from "next/router";
import BoardCommentWriteUI from "./commentsWrite.presenter";
import { useMutation } from "@apollo/client";
import { CREATE_BOARD_COMMENT, UPDATE_BOARD_COMMENT } from "./commentsWrite.queries";
import { useState } from "react";
import { FETCH_BOARD_COMMENTS } from "../list/commentsList.queries";

export default function BoardCommentWrite(props) {
	const router = useRouter()
	const [createBoardComment] = useMutation(CREATE_BOARD_COMMENT)
	const [updateBoardComment] = useMutation(UPDATE_BOARD_COMMENT)
	const [myWriter, setMyWriter] = useState('')
	const [myPassword, setMyPassword] = useState('')
	const [myContents, setMyContents] = useState('')


	const onChangeValueWriter = (event) => {
		setMyWriter(event.target.value)
	}
	const onChangeValuePassword = (event) => {
		setMyPassword(event.target.value)
	}
	const onChangeValueContents = (event) => {
		setMyContents(event.target.value)
		// console.log(event.target.value)
	}

	
	console.log(myWriter)
	const onClickSubmitComment = async () => {
		console.log(router.query.boardId)
		console.log('dddd')

		try {
			const result = await createBoardComment({
				variables : {
					createBoardCommentInput : {
						writer: myWriter,
						password: myPassword,
						contents: myContents,
						rating: 1
					},
					boardId : router.query.boardId
				},
				refetchQueries : [
					{
						query : FETCH_BOARD_COMMENTS, 
						variables: {
							boardId : router.query.boardId
						}
					}
				]
			})
			console.log(result)

		} catch(error) {
			console.log(error.message)
		}

		setMyWriter('')
		setMyPassword('')
		setMyContents('')
	}
	
	const onClickUpdateComment = async (event) => {
		console.log('ddd')

		try {
			const result = await updateBoardComment({
				variables : {
					updateBoardCommentInput : {
						writer: myWriter,
						contents: myContents,
						rating: 1,
					},
					password: myPassword,
					boardCommentId: event.target.id
				}
			})
			console.log(result)

		} catch (error) {
			alert(error.message)
		}
	}
	console.log(props.el)


	return (
		<BoardCommentWriteUI
			onChangeValueWriter={onChangeValueWriter}
			onChangeValuePassword={onChangeValuePassword}
			onChangeValueContents={onChangeValueContents}
			onClickSubmitComment={onClickSubmitComment}
			onClickUpdateComment={onClickUpdateComment}
			myWriter={myWriter}
			myPassword={myPassword}
			myContents={myContents}
			isEdit={props.isEdit}
			el={props.el}
		/>
	)
}