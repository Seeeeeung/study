import { gql } from "@apollo/client"

export const CREATE_BOARD_COMMENT = gql`
mutation createBoardComment($boardId: ID!,$createBoardCommentInput : CreateBoardCommentInput!) {
	createBoardComment(boardId: $boardId,createBoardCommentInput: $createBoardCommentInput) {
		_id
		writer
		contents
		createdAt
		updatedAt
		rating
	}
}
`
export const UPDATE_BOARD_COMMENT = gql`
	mutation updateBoardComment(
		$updateBoardCommentInput: UpdateBoardCommentInput!,
		$password: String,
		$boardCommentId: ID!
	) {
		updateBoardComment(
			updateBoardCommentInput: $updateBoardCommentInput,
			password: $password,
			boardCommentId: $boardCommentId
		) {
			_id
			writer
			contents
			rating
			createdAt
			updatedAt
		}
	}
`