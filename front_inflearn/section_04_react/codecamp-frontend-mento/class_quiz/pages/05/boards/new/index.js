import { useMutation, gql } from "@apollo/client"
import { useRouter } from "next/router"
import { useState } from "react"

const CREATE_PRODUCT = gql`
mutation createProduct($seller:String, $createProductInput:CreateProductInput!) {
  createProduct(seller:$seller, createProductInput: $createProductInput) {
    _id
  }
}
`

export default function createProductUpLoadPage() {
	const router = useRouter()
	const [내함수] = useMutation(CREATE_PRODUCT)

	const [seller, setSeller] = useState('')
	const [name, setName] = useState('')
	const [detail, setDetail] = useState('')
	const [price, setPrice] = useState('')
	
	const onChangeSeller = (event) => {
		let _targetValue = event.target.value
		setSeller(_targetValue)
	}
	const onChangeName = (event) => {
		let _targetValue = event.target.value
		setName(_targetValue)
	}
	const onChangeDetail = (event) => {
		let _targetValue = event.target.value
		setDetail(_targetValue)
	}
	const onChangePrice = (event) => {
		let _targetValue = event.target.value
		setPrice(_targetValue)
	}

	const onClickSubmit = async () => {

		// const result = await createProduct({
		// 	variables : { // variables = $
		// 		seller : "쑹이",
		// 		createProductInput: {
		// 			name: "마우스",
		// 			detail: "좋은 마숭스",
		// 			price: 3000
		// 		}
		// 	}
		// });

		try {
				if (name && seller && detail && price) {
					const result = await 내함수({
						variables : {
							seller:seller,
							createProductInput: {
								name:name,
								detail:detail,
								price:Number(price) // 타입이 안맞아서 ApolloError 가뜬것임
							}
						}
					})
					console.log(result.data.createProduct._id)

					router.push(`/05/boards/${result.data.createProduct._id}`)

				} else {
					console.log('데이터 입력')
				}
				// console.log(seller, name, detail, price)

			} catch (error) {
				console.log(error.message)
			}
			
			
	}

	return (
		<div>
			판매자 : <input type="text" onChange={onChangeSeller} /><br />
			상품명 : <input type="text" onChange={onChangeName} /><br />
			상품내용 : <input type="text" onChange={onChangeDetail} /><br />
			상품가격 : <input type="text" onChange={onChangePrice} />

			<button onClick={onClickSubmit}>등록</button>
		</div>
	)
}