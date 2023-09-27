import * as S from "./commentsList.styles"
import { WrapUserCont } from "../../detail/BoardDetail.styles"
import { InterFace } from "../write/commentsWrite.styles"
import { getDate } from "../../../../../../src/commons/lib/utils"
import BoardCommentWriteUI from "../write/commentsWrite.presenter"
import { useState } from "react"
import BoardCommentWrite from "../write/commentsWrite.container"

export default function BoardCommentListUItem(props) {
	// console.log(props)
	
	const [isEdit, setIsEdit] = useState(false)
	const onClickEdit = (event) => {
		// console.log(event.target)
		setIsEdit(true)
		// console.log(isEdit)
	}

	console.log(props)
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
			{isEdit && (<BoardCommentWrite isEdit={true} setIsEdit={setIsEdit} el={props.el} />)}
		</>
	)
}