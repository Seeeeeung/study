import { useMutation, gql } from "@apollo/client";
import { useState } from "react";

const CREATE_PRODUCT = gql`
	mutation createProduct ($seller: String, $createProductInput: CreateProductInput!) { # 변수의 타입 적는 곳
		createProduct(seller: $seller, createProductInput: $createProductInput){ # 실제 우리가 전달할 변수 적는 곳
			_id
			number
			message
		}
	}
`;
export default function GraphqlMutationPage() {
  const [createProduct] = useMutation(CREATE_PRODUCT);
	
  // console.log(createProduct);

	const onClickSubmit = async () => {
		const result = await createProduct({
			variables : { // variables = $
				seller : "쑹이",
				createProductInput: {
					name: "마우스",
					detail: "좋은 마숭스",
					price: 3000
				}
			}
		});
		console.log(result.data)
	}

  return (
		<div>
			<button onClick={onClickSubmit}>GRAPHQL-API 요청하기</button> 
		</div>
	)
	
}



