import * as S from "./BoardDetail.styles"
import {Container, Contents, BoxShadow, Title, Button, ButtonGroup} from "../write/BoardWrite.styles"
import { getDate } from "../../../../commons/lib/utils"

export default function BoardDetailUI(props) {
	return (
		<Container>
			<Contents>
				<BoxShadow>
					<S.UserInterFace>
						<div className={'left'}>
							<img src='/images/img-profile.png' className={'img-profile'} />

							<p className={'user-name'}>{props.data?.fetchBoard?.writer}</p>
							<p className={'date'}>Date : {props.data?.fetchBoard?.createdAt}</p>
						</div>

						<div className={'right'}>
							<S.LinkIcon>링크</S.LinkIcon>
							<S.Location>위치</S.Location>
						</div>
					</S.UserInterFace>

					<Title className={'a-l'}>{props.data?.fetchBoard?.title}</Title>
					<S.BoardImage src="/images/img-example.png" />
					<S.BoardText>{props.data?.fetchBoard?.contents}</S.BoardText>

					<S.WrapVideo>
						<S.BoardVideo src="https://www.youtube.com/embed/1VQlZkjl58s" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></S.BoardVideo>
					</S.WrapVideo>

					<S.UpAndDown>
						<div className={'wrap-up'}>
							<S.UpIcon>추천 하기</S.UpIcon>
							<p className={'count'}>1920</p>
						</div>

						<div className={'wrap-down'}>
							<S.DownIcon>미추천 하기</S.DownIcon>
							<p className={'count'}>1920</p>
						</div>
					</S.UpAndDown>
				</BoxShadow>

				<ButtonGroup>
					<Button type="button" className={'white'}>목록으로</Button>
					<Button type="button" className={'white'}>수정하기</Button>
					<Button type="button" className={'white'}>삭제하기</Button>
				</ButtonGroup>
			</Contents>
		</Container>
	)
}