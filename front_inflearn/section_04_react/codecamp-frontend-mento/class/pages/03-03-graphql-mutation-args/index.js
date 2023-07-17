import { useMutation, gql } from "@apollo/client";

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
  const [나의함수] = useMutation(나의그래프큐엘셋팅);
	
  // console.log(나의함수);

	const onClickSubmit = async () => {
		const result = await 나의함수({
			variables : { // variables = $
				writer: "훈이",
				title: "안녕",
				contents: "반갑"
			}
		});
		console.log(result.data)
	};


  return <button onClick={onClickSubmit}>GRAPHQL-API 요청하기</button>; // 한 줄 일때는 괄호() 팔요 없음
	
}



