import { useQuery, gql } from "@apollo/client"
import { useRouter } from "next/router"

const FETCH_BOARD = gql`
query fetchBoard($number:Int) {
  fetchBoard(number:$number){
    number
    writer
    title
    contents
  }
}
`


export default function StaticRoutingMovedPage() {
	const router = useRouter()
	// console.log(router.query.qqq)
	const { data } = useQuery(FETCH_BOARD, {
		// $: {
		// 	number: 1
		// }
		variables : {number : Number(router.query.number)}
	})
	console.log(data)

	return (
		<div>
			<div>{router.query.number} 페이지 이동이 완료되었습니다.</div>
			<div>작성자 : {data?.fetchBoard?.writer}</div>  {/* ? -> 옵셔널 체이닝 */}
			<div>제목 : {data?.fetchBoard?.title}</div>
			<div>내용 : {data?.fetchBoard?.contents}</div>
		</div>
	)
}