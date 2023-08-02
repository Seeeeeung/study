import { useRouter } from "next/router";
import BoardListUI from "./BoardList.presenter";
import { FETCH_BOARDS } from "./BoardList.queries";
import { useQuery } from "@apollo/client";

export default function BoardList() {
	const router = useRouter();
	const { data } = useQuery(FETCH_BOARDS);
	// console.log(data?.fetchBoards)

	const moveTargetPage =  (event) => {
		event.preventDefault()
		console.log(event)
		router.push(`/boards/${event.target.id}`)
	}

	const moveBoardWrite = (event) => {
		event.preventDefault()
		router.push('/boards/new')
	}

	return (
		<BoardListUI 
				data = {data} 
				moveTargetPage = {moveTargetPage}
				moveBoardWrite = {moveBoardWrite}
		/>
	)
}