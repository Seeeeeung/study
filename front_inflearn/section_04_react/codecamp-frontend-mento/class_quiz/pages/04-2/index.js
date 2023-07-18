import { useMutation, gql } from "@apollo/client";
import { useState } from "react";

const MyFn = gql`
	mutation createProduct($seller:String, 
		$createProductInput: CreateProductInput!) {
			createProduct(seller:$seller,
				createProductInput : $createProductInput) {
					_id,
					number
					message
				
		}
	}
`


export default function GraphqlMutationPage() {
	const [name, setName] = useState('')
	const [detail, setDetail] = useState('')
	const [price, setPrice] = useState('')
	const [나의함수] = useMutation(MyFn);

	const onClickCreate = async () => {
		const result = await 나의함수({
			variables: {
				name: name,
				detail: detail,
				price: price
			}
		})
	}

	const nameFn = (event) => {
		setName(event.target.value)
	}
	const detailFn = (event) => {
		setDetail(event.target.value)
	}
	const priceFn = (event) => {
		setPrice(event.target.value)
	}

	return (
		<div>
			이름 <input type="text" onClick={nameFn} />
			디데일 <input type="text" onClick={detailFn} />
			가격 <input type="text" onClick={priceFn} />
			<button onClick={onClickCreate}>GRAPHQL-API 요청하기</button>
		</div>
	)
}