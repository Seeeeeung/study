import { useRouter } from "next/router";
import BoardCommentWriteUI from "./commentsWrite.presenter";
import { useMutation } from "@apollo/client";
import { CREATE_BOARD_COMMENT } from "./commentsWrite.queries";
import { useState } from "react";
import { FETCH_BOARD_COMMENTS } from "../list/commentsList.queries";import * as S from "./commentsWrite.styles"

export default function BoardCommentWrite() {
	const router = useRouter()
	const [createBoardComment] = useMutation(CREATE_BOARD_COMMENT)
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
		console.log(event.target.value)
	}
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
			setMyWriter('')
			setMyPassword('')
			setMyContents('')
		} catch(error) {
			console.log(error.message)
		}
	} 

	return (
		<S.CommentWriteWrap>
			<S.CommentTitle>
				<i className={"iconset ico-comment"}></i>
				댓글
			</S.CommentTitle>

			<BoardCommentWriteUI
				onChangeValueWriter={onChangeValueWriter}
				onChangeValuePassword={onChangeValuePassword}
				onChangeValueContents={onChangeValueContents}
				onClickSubmitComment={onClickSubmitComment}
				myWriter={myWriter}
				myPassword={myPassword}
				myContents={myContents}
			 />
		</S.CommentWriteWrap>
	)
}