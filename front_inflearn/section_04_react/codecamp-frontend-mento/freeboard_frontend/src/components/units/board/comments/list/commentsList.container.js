import { useMutation, useQuery } from "@apollo/client";
import BoardCommentListUI from "./commentsList.presenter";
import { DELETE_BOARD_COMMENTS, FETCH_BOARD_COMMENTS, UPDATE_BOARD_COMMENT } from "./commentsList.queries";
import { useState } from "react";

export default function BoardCommentList(props) {
	console.log(props.pageId)

	// const [isEdit, setIsEdit] = useState(false)

	const { data } = useQuery(FETCH_BOARD_COMMENTS, {
		variables: {
			boardId : props.pageId
		}
	})
	const [deleteComment] = useMutation(DELETE_BOARD_COMMENTS);
	// const [myPassword, setMyPassword] = useState('')

	console.log(data)

	// const [updateBoardComment] = useMutation(UPDATE_BOARD_COMMENT)

	// console.log(isEdit)
	const onClickDel = async (event) => {
		console.log('d?d')
		console.log(event.target.id)
		const myPassword = prompt('비밀번호를 입력해주세요.', '')
		// setMyPassword(myPassword)
		// console.log(myPassword)

		try {
			const result = await deleteComment({
				variables: {
					password:myPassword,
					boardCommentId: event.target.id
				},
				refetchQueries : [
					{
						query: FETCH_BOARD_COMMENTS,
						variables: {
							boardId: props.pageId
						}
					}
				]
			})
		} catch(error) {
			alert(error.message)
		}
	}

	
	// const onClickUpdateComment = async (event) => {
	// 	console.log('ddd')
	// 	try {
	// 		const result = await updateBoardComment({
	// 			variables : {
	// 				updateBoardCommentInput : {
	// 					contents: myContents,
	// 					rating: 1
	// 				},
	// 				password: checkPassword,
	// 				boardCommentId: event.target.id
	// 			}
	// 		})
	// 		console.log(result)

	// 	} catch (error) {
	// 		alert(error.message)
	// 	}
	// }

	return <BoardCommentListUI data={data} onClickDel={onClickDel} />
}