import {useRouter} from 'next/router'

export default function StaticRoutingPage() {
	const router = useRouter()

	const onClickMove1 = () => {
		router.push("/04-01-routing/03-02-static-board-query-moved/1")
	}
	const onClickMove2 = () => {
		router.push("/04-01-routing/03-02-static-board-query-moved/2")
	}
	const onClickMove3 = () => {
		router.push("/04-01-routing/03-02-static-board-query-moved/3")
	}

	return (
		<>
		<button onClick={onClickMove1}>페이지 이동하기1</button>
		<button onClick={onClickMove2}>페이지 이동하기2</button>
		<button onClick={onClickMove3}>페이지 이동하기3</button>
		</>
	)
}