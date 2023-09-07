import * as S from "./commentsList.styles"
import { WrapUserCont } from "../../detail/BoardDetail.styles"
import { InterFace } from "../write/commentsWrite.styles"
import { getDate } from "../../../../../../src/commons/lib/utils"
import BoardCommentListUItem from "./commentsList.presenterItem"

export default function BoardCommentListUI(props) {
	console.log(props.data)
	return (
		<S.CommentListWrap>
			{props.data?.fetchBoardComments.map((el) => (
				<BoardCommentListUItem key={el._id} el={el} onClickDel={props.onClickDel} />
			))}
		</S.CommentListWrap>
	)
}