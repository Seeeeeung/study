import { useMutation, gql } from "@apollo/client";
import { useRouter } from "next/router";

const 나의그래프큐엘셋팅 = gql`
	mutation createBoard($writer:String, $title:String, $contents:String){
		createBoard(writer: $writer, title: $title , contents: $contents) {
			_id
			number
			message
		}
	}
`;
export default function GraphqlMutationPage() {
	const router = useRouter()
  const [나의함수] = useMutation(나의그래프큐엘셋팅);
	
  // console.log(나의함수);

	const onClickSubmit = async () => {

		try { // try 에 있는 내용을 시도하다가 실패하면, 다음에 있는 모든 줄들을 모두 무시하고, catch 에 있는 내용이 실행됨.
			const result = await 나의함수({
				variables : { // variables = $
					writer: "훈이",
					title: "안녕",
					contents: "반갑"
				}
			});
			console.log(result.data)
			console.log(result.data.createBoard.number)
			// router.push("/04-01-routing/05-02-dynamic-board-mutation-moved/" + result.data.createBoard.number)
			router.push(`/04-01-routing/05-02-dynamic-board-mutation-moved/${result.data.createBoard.number}`)

		} catch (error) {
			alert(error.message)
		}

	};


  return <button onClick={onClickSubmit}>GRAPHQL-API 요청하기</button>; // 한 줄 일때는 괄호() 팔요 없음
	
}



