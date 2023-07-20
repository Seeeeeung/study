import { useQuery, gql, useMutation } from "@apollo/client"

const FETCH_BOARDS = gql`
query {
  fetchBoards{
    number
    writer
    title
    contents
  }
}
`

const DELETE_BOARD = gql`
	mutation deleteBoard($number:Int) {
		deleteBoard(number: $number) {
			message
		}
	}
`

export default function StaticRoutingMovedPage() {
	const { data } = useQuery(FETCH_BOARDS)
	const [deleteBoard] = useMutation(DELETE_BOARD)
	console.log(data?.fetchBoards)

	const mystyles = {
		margin: "10px",
		padding: "0px"
	}

	const onClickDelete = (event) => {
		Number(event.target.id)
		deleteBoard({
			variables: {number : Number(event.target.id)},
			refetchQueries: [{query: FETCH_BOARDS}]
		})
	}

	return (
		<div>
			{data?.fetchBoards.map(el => (
				// 특별한 이유가 없으면 Fragment 로 감싸는게 좋음
				// 1. 프레그먼트란? <></> , <Fragment></Fragment>
				// 2. 프레그먼트에 key 입력하는 방법? <Fragment key={}></Fragment>
				<div key={el.number}> {/* index 는 게시글을 삭제할때, 다음 게시글이 올라오면서 기존 index와 동일한 값을 갖게됨. 즉, 유일하지 않음. */}
					<span><input type="checkbox" /></span>
					<span style={{ margin:"10px", padding:"0px" }}>{el.number}</span>
					<span style={{ margin:"10px" }}>{el.title}</span>
					<span style={mystyles}> {el.writer}</span>
					<span><button type="button" onClick={onClickDelete} id={el.number}>삭제</button></span>
				</div>
			))}
		</div>
	)
}