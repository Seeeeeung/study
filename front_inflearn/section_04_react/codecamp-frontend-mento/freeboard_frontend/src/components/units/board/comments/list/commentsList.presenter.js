import * as S from "./commentsList.styles"
import { WrapUserCont } from "../../detail/BoardDetail.styles"
import { InterFace } from "../write/commentsWrite.styles"
import { getDate } from "../../../../../../src/commons/lib/utils"
import BoardCommentListUItem from "./commentsList.presenterItem"
import BoardCommentWrite from "../write/commentsWrite.container"
import BoardCommentWriteUI from "../write/commentsWrite.presenter"

export default function BoardCommentListUI(props) {
	// console.log(props.isEdit)
	
	return (
		<>
		
		<BoardCommentWrite isEdit={false} />
		<S.CommentListWrap>
			{props.data?.fetchBoardComments.map((el) => (
				<BoardCommentListUItem key={el._id} el={el} onClickDel={props.onClickDel} />
			))}
		</S.CommentListWrap>
		</>
	)
}