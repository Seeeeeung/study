import { useRouter } from "next/router";import { useQuery, gql } from "@apollo/client"
import BoardWrite from "../../../../../src/components/units/board/08-write2/BoardWrite.container";

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

export default function GraphqlMutationPage() {
	const router = useRouter()
	const { data } = useQuery(FETCH_BOARD, {
		// $: {
		// 	number: 1
		// }
		variables : {number : Number(router.query.number)}
	})
	// console.log(data)
  return (
		<div>
			<div>##### 여기는 페이지 입니다. ####</div>
			<BoardWrite isEdit={true} data={data} />
			<div>##### 여기는 페이지 입니다. ####</div>
		</div>	
	)
	
}



