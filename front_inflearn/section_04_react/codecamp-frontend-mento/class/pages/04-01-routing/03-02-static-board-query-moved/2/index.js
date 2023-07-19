import { useQuery, gql } from "@apollo/client"

const FETCH_BOARD = gql`
query {
  fetchBoard(number:1){
    number
    writer
    title
    contents
  }
}
`


export default function StaticRoutingMovedPage() {
	const { data } = useQuery(FETCH_BOARD)
	console.log(data)

	return (
		<div>
			<div>2 페이지 이동이 완료되었습니다.</div>
			<div>작성자 : {data?.fetchBoard?.writer}</div>  {/* ? -> 옵셔널 체이닝 */}
			<div>제목 : {data?.fetchBoard?.title}</div> {/* null 일때 ? 넣어도 가능 */}
			<div>내용 : {data? data.fetchBoard?.contents : "로딩중 입니다."}</div>
		</div>
	)
}