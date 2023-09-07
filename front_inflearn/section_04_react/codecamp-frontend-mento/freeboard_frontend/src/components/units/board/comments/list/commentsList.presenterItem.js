import * as S from "./commentsList.styles"
import { WrapUserCont } from "../../detail/BoardDetail.styles"
import { InterFace } from "../write/commentsWrite.styles"
import { getDate } from "../../../../../../src/commons/lib/utils"
import BoardCommentWriteUI from "../write/commentsWrite.presenter"
import { useState } from "react"

export default function BoardCommentListUItem(props) {
	console.log(props.data)
	
	const [isEdit, setIsEdit] = useState(false)
	const onClickEdit = () => {
		setIsEdit(true)
	}

	return (
		<>
			{!isEdit && (
				<WrapUserCont className={'wrap-comment'}>
					<img src='/images/img-profile.png' className={'img-profile'} />

					<InterFace>
						<p className={'user-name'}>
							{props.el?.writer}
						</p>
						<p className={'star'}>{props.el?.rating}</p>
					</InterFace>

					<p className={'comment'}>
						{props.el?.contents}
					</p>
					<p className={'date'}>{getDate(props.el?.createdAt)}</p>

					<div className={'right'}>
						<button className={'btn-comment btn-update'} onClick={onClickEdit}>수정하기</button>
						<button className={'btn-comment btn-delete'} onClick={props.onClickDel} id={props.el?._id}>삭제하기</button>
					</div>
				</WrapUserCont>
			)}
			{isEdit && <BoardCommentWriteUI isEdit={true} setIsEdit={setIsEdit} el={props.el} id={props.el?._id} />}
		</>
	)
}