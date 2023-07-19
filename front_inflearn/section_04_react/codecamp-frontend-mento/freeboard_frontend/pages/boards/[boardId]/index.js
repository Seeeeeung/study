import { useQuery, gql } from "@apollo/client"
import { useState } from "react"
import {Container, Contents, BoxShadow, Title, Button, ButtonGroup} from '../../../styles/boardsNew'
import { UserInterFace, LinkIcon, Location, BoardImage, BoardText, WrapVideo, BoardVideo, UpAndDown, UpIcon, DownIcon } from '../../../styles/boardsDetail'
import { useRouter } from "next/router"

 const FETCH_BOARD = gql`
	query fetchBoard($boardId:ID!) {
		fetchBoard(boardId: $boardId) {
			_id
			writer
			title
			contents
		}
	}
`

export default function boardViewPage() {
	// const [] = useState('')
	const router = useRouter()
	const { data } = useQuery(FETCH_BOARD, {
		variables: {boardId: router.query.boardId}
	})
	console.log(data)

	return (
		<Container>
			<Contents>
				<BoxShadow>
					<UserInterFace>
						<div className={'left'}>
							<img src='/images/img-profile.png' className={'img-profile'} />

							<p className={'user-name'}>{data?.fetchBoard?.writer}</p>
							<p className={'date'}>Date : 2021.02.18</p>
						</div>

						<div className={'right'}>
							<LinkIcon>링크</LinkIcon>
							<Location>위치</Location>
						</div>
					</UserInterFace>

					<Title className={'a-l'}>{data?.fetchBoard?.title}</Title>
					<BoardImage src="/images/img-example.png" />
					<BoardText>{data?.fetchBoard?.contents}</BoardText>

					<WrapVideo>
						<BoardVideo src="https://www.youtube.com/embed/1VQlZkjl58s" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></BoardVideo>
					</WrapVideo>

					<UpAndDown>
						<div className={'wrap-up'}>
							<UpIcon>추천 하기</UpIcon>
							<p className={'count'}>1920</p>
						</div>

						<div className={'wrap-down'}>
							<DownIcon>미추천 하기</DownIcon>
							<p className={'count'}>1920</p>
						</div>
					</UpAndDown>
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