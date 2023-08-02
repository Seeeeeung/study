import { useQuery } from "@apollo/client"
import { useRouter } from "next/router"
import BoardDetailUI from "./BoardDetail.presenter"
import { FETCH_BOARD } from "./BoardDetail.queries"


export default function BoardDetail() {
	const router = useRouter()
	const { data } = useQuery(FETCH_BOARD, {
		variables: {boardId: router.query.boardId} // 여기서 query.boardId 의 boardId는 폴더명임
	});
	// console.log(data?.fetchBoard?.writer)

	return <BoardDetailUI data = {data} />
}