import { WrapUserCont } from "../detail/BoardDetail.styles";
import { Container, Contents, Title, Button } from "../write/BoardWrite.styles"
import * as S from "./BoardList.styles"
import { getDate } from "../../../../commons/lib/utils"

export default function BoardListUI(props) {
	console.log(props.data)
	return (
		<Container>
			<Contents>
				<Title>베스트 게시글</Title>
				<S.CardWrap>
					{props.data?.fetchBoards.slice(0,4).map((el) => (
						<S.Card href="" id={el._id} onClick={props.moveTargetPage}>
							{/* a 태그가 밑으로 깔려서 a태그의 id 를 얻어올수 없어서 클릭이벤트가 먹히지 않는다.  */}
							<img src="/images/img-ex-boards.png" />
							<p className={'title-4'}>{el.title}</p>

							<WrapUserCont>
									<img src='/images/img-profile.png' className={'img-profile'} />
									<p className={'user-name'}>{el.writer}</p>
									<p className={'date'}>Date : {getDate(el.createdAt)}</p>

								<div className={'right'}>
									<S.UpIcon>추천 현황</S.UpIcon>
									<p className={'count'}>1920</p>
								</div>
							</WrapUserCont>
						</S.Card>
					))}
				</S.CardWrap>

				<S.BoardUtil>
					검색구간
				</S.BoardUtil>

				<S.BoardTable>
					<table>
						<caption>번호, 제목, 작성자, 날짜 가 있는 표입니다.</caption>
						<colgroup>
							<col style={{width:"13%"}} />
							<col style={{width:"50%"}} />
							<col />
							<col />
						</colgroup>
						<thead>
							<tr scope="row">
								<th>번호</th>
								<th>제목</th>
								<th>작성자</th>
								<th>날짜</th>
							</tr>
						</thead>
						<tbody>
							{props.data?.fetchBoards.map((el,index) => (
								<tr>
									<td>{index+1}</td>
									<td className={'ellipsis'}><a href="" id={el._id} onClick={props.moveTargetPage}>{el.title}</a></td>
									<td>{el.writer}</td>
									<td>{getDate(el.createdAt)}</td>
								</tr>
							))}
						</tbody>
					</table>
				</S.BoardTable>

				<Button className={'white border icon a-r'} onClick={props.moveBoardWrite}><S.WriteIcon></S.WriteIcon> 게시물 등록하기</Button>

				<S.Pagination>
						<a href="" class="control prev">이전으로</a>
						<strong title="현재 페이지" class="active">1</strong>
						<a href="">2</a>
						<a href="" class="control next">다음으로</a>
				</S.Pagination>
			</Contents>
		</Container>
	)
}