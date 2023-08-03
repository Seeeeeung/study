import { useQuery } from "@apollo/client";
import BoardCommentListUI from "./commentsList.presenter";
import { FETCH_BOARD_COMMENTS } from "./commentsList.queries";

export default function BoardCommentList(props) {
	console.log(props.pageId)
	const { data } = useQuery(FETCH_BOARD_COMMENTS, {
		variables: {
			boardId : props.pageId
		}
	})

	console.log(data)

	return <BoardCommentListUI data={data} />
}