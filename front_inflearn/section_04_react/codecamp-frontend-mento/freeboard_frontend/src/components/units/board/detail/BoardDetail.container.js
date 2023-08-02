import { useMutation, useQuery } from "@apollo/client"
import { useRouter } from "next/router"
import BoardDetailUI from "./BoardDetail.presenter"
import { FETCH_BOARD, DELETE_BOARD } from "./BoardDetail.queries"


export default function BoardDetail() {
	const router = useRouter()
	const { data } = useQuery(FETCH_BOARD, {
		variables: {boardId: router.query.boardId} // 여기서 query.boardId 의 boardId는 폴더명임
	});
	const [deleteBoard] = useMutation(DELETE_BOARD);
	const onClickDelete = async () => {
		try {
			console.log(router.query.boardId)
			await deleteBoard({
				variables: {boardId : router.query.boardId},
				// refetchQueries: [{query: FETCH_BOARDS}]
			})
			// console.log(result)

			router.push('/boards')

		} catch( error ) {
			console.log(error.message)
		}
	}


	return <BoardDetailUI data = {data} onClickDelete={onClickDelete} />
}