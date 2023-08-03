import * as S from "./commentsList.styles"
import { WrapUserCont } from "../../detail/BoardDetail.styles"
import { InterFace } from "../write/commentsWrite.styles"

export default function BoardCommentListUI() {
	return (
		<S.CommentListWrap>
			<WrapUserCont className={'wrap-comment'}>
					<img src='/images/img-profile.png' className={'img-profile'} />

					<InterFace>
						<p className={'user-name'}>
							이름{/* {props.data?.fetchBoard?.writer} */}
						</p>
						<p className={'star'}>별점넣는곳</p>
					</InterFace>

					<p className={'comment'}>
						진짜 유익하고 정말 필요한 정보인 것 같아요~! 앞으로도 좋은 정보 부탁드립니다~!
					</p>
					<p className={'date'}>Date : 
					{/* {getDate(props.data?.fetchBoard?.createdAt)} */}
					</p>

				<div className={'right'}>
					<button className={'btn-comment btn-update'}>수정하기</button>
					<button className={'btn-comment btn-delete'}>삭제하기</button>
				</div>
			</WrapUserCont>
		</S.CommentListWrap>
	)
}