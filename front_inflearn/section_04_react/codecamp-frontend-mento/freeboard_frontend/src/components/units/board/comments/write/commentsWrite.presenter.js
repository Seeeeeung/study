import * as S from "./commentsWrite.styles"
import { Button, Inp, TextArea } from "../../write/BoardWrite.styles"

export default function BoardCommentWriteUI(props) {
	// console.log(props.isEdit)
	
	console.log(props.el?._id)
	return (
			<S.CommentForm>
				<S.InterFace>
					<Inp type="text" title="작성자 입력" placeholder="작성자" onChange={props.onChangeValueWriter} defaultValue={props.el?.writer} />
					<Inp type="password" title="비밀번호 입력" placeholder="비밀번호" onChange={props.onChangeValuePassword} defaultValue={props?.el?.myPassword} />
					<p className={'star'}>별점넣는곳</p>
				</S.InterFace>

				<S.WrapTextArea>
					<TextArea cols="" rows="" title="댓글 내용을 입력" placeholder="개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다." onChange={props.onChangeValueContents} defaultValue={props.el?.contents}></TextArea>
					<p className={'limit'}>0/100</p>
					<Button className={props.isEdit? "yellow small" : 'black small'} onClick={props.isEdit ? props.onClickUpdateComment : props.onClickSubmitComment} id={props.isEdit ? props.el?._id : ''}>{props.isEdit ? "수정하기" : "등록하기"}</Button>
				</S.WrapTextArea>
			</S.CommentForm>
	)
}