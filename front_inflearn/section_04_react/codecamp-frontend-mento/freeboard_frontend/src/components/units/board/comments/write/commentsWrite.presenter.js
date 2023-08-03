import * as S from "./commentsWrite.styles"
import { Button, Inp, TextArea } from "../../write/BoardWrite.styles"

export default function BoardCommentWriteUI(props) {
	return (
		<S.CommentWriteWrap>
			<S.CommentTitle>
				<i className={"iconset ico-comment"}></i>
				댓글
			</S.CommentTitle>

			<S.CommentForm>
				<S.InterFace>
					<Inp type="text" title="작성자 입력" placeholder="작성자" onChange={props.onChangeValueWriter} />
					<Inp type="password" title="비밀번호 입력" placeholder="비밀번호" onChange={props.onChangeValuePassword} />
					<p className={'star'}>별점넣는곳</p>
				</S.InterFace>

				<S.WrapTextArea>
					<TextArea cols="" rows="" title="댓글 내용을 입력" placeholder="개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다." onChange={props.onChangeValueContents}></TextArea>
					<p className={'limit'}>0/100</p>
					<Button className={'black small'} onClick={props.onClickSubmitComment}>등록하기</Button>
				</S.WrapTextArea>
			</S.CommentForm>
		</S.CommentWriteWrap>
	)
}