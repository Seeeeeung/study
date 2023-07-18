import { useMutation, gql } from "@apollo/client";

const CREATE_BOARD = gql`
	mutation {
		createBoard (
			writer:"SY",
			title:"HI",
			contents:"안뇽용"
		) {
			_id
			number
			message
		}
	}

`

export default function GraphqlMutationPage() {
	const [나의함수] = useMutation(CREATE_BOARD);

	const onClickCreate = async () => {
		const result = await 나의함수();
		console.log(result)
	}

	return (
		<div>
			<button onClick={onClickCreate}>GRAPHQL-API 요청하기</button>
		</div>
	)
}