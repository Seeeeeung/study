import * as S from "./commentsList.styles"
import { WrapUserCont } from "../../detail/BoardDetail.styles"
import { InterFace } from "../write/commentsWrite.styles"
import { getDate } from "../../../../../../src/commons/lib/utils"

export default function BoardCommentListUI(props) {
	console.log(props.data)
	return (
		<S.CommentListWrap>
			{props.data?.fetchBoardComments.map((el) => (
				<WrapUserCont className={'wrap-comment'} key={el._id}>
						<img src='/images/img-profile.png' className={'img-profile'} />

						<InterFace>
							<p className={'user-name'}>
								{el.writer}
							</p>
							<p className={'star'}>{el.rating}</p>
						</InterFace>

						<p className={'comment'}>
							{el.contents}
						</p>
						<p className={'date'}>{getDate(el.createdAt)}</p>

					<div className={'right'}>
						<button className={'btn-comment btn-update'}>수정하기</button>
						<button className={'btn-comment btn-delete'} onClick={props.onClickDel} id={el._id}>삭제하기</button>
					</div>
				</WrapUserCont>
			))}
		</S.CommentListWrap>
	)
}