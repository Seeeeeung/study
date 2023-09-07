import { useMutation, useQuery } from "@apollo/client";
import BoardCommentListUI from "./commentsList.presenter";
import { DELETE_BOARD_COMMENTS, FETCH_BOARD_COMMENTS } from "./commentsList.queries";
import { useState } from "react";

export default function BoardCommentList(props) {
	console.log(props.pageId)
	const { data } = useQuery(FETCH_BOARD_COMMENTS, {
		variables: {
			boardId : props.pageId
		}
	})
	const [deleteComment] = useMutation(DELETE_BOARD_COMMENTS);
	const [myPassword, setMyPassword] = useState('')

	console.log(data)

	const onClickDel = async (event) => {
		console.log(event.target.id)
		const myPassword = prompt('비밀번호를 입력해주세요.', '')
		setMyPassword(myPassword)
		console.log(myPassword)

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

	return <BoardCommentListUI data={data} onClickDel={onClickDel} />
}