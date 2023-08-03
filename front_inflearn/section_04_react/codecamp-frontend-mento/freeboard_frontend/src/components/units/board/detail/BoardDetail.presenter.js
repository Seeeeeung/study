import * as S from "./BoardDetail.styles"
import {Container, Contents, BoxShadow, Title, Button, ButtonGroup} from "../write/BoardWrite.styles"
import { getDate } from "../../../../commons/lib/utils"
import BoardCommentWrite from "../comments/write/commentsWrite.container"
import BoardCommentList from "../comments/list/commentsList.container"

export default function BoardDetailUI(props) {
	return (
		<Container>
			<Contents>
				<BoxShadow>
					<S.WrapUserCont>
							<img src='/images/img-profile.png' className={'img-profile'} />
							<p className={'user-name'}>{props.data?.fetchBoard?.writer}</p>
							<p className={'date'}>Date : {getDate(props.data?.fetchBoard?.createdAt)}</p>
						{/* <div className={'left'}>

						</div> */}

						<div className={'right'}>
							<S.LinkIcon>링크</S.LinkIcon>
							<S.Location>위치</S.Location>
						</div>
					</S.WrapUserCont>

					<Title className={'a-l'}>{props.data?.fetchBoard?.title}</Title>
					<S.BoardImage src="/images/img-example.png" />
					<S.BoardText>{props.data?.fetchBoard?.contents}</S.BoardText>

					<S.WrapVideo>
						<S.BoardVideo src="https://www.youtube.com/embed/1VQlZkjl58s" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></S.BoardVideo>
					</S.WrapVideo>

					<S.UpAndDown>
						<div className={'wrap-up'}>
							<S.UpBtn>추천 하기</S.UpBtn>
							<p className={'count'}>1920</p>
						</div>

						<div className={'wrap-down'}>
							<S.DownBtn>미추천 하기</S.DownBtn>
							<p className={'count'}>1920</p>
						</div>
					</S.UpAndDown>
				</BoxShadow>

				<ButtonGroup>
					<Button type="button" className={'white'} onClick={props.onClickMoveBoardPage}>목록으로</Button>
					<Button type="button" className={'white'} onClick={props.onClickMoveUpdatePage}>수정하기</Button>
					<Button type="button" className={'white'} id={props.data?.fetchBoard?._id} onClick={props.onClickDelete}>삭제하기</Button>
				</ButtonGroup>

				<BoardCommentWrite />
				<BoardCommentList />
			</Contents>
		</Container>
	)
}