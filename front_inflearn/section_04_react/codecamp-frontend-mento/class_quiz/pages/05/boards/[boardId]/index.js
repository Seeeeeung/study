import { useQuery, gql } from "@apollo/client"
import { useRouter } from "next/router"

const myData = gql`
	query fetchProduct($productId:ID) {
		fetchProduct(productId:$productId){
			seller,
			name,
			detail,
			price
		}
	}
`

export default function createProductRoutingMovedPage() {
	const router = useRouter()
	const { data } = useQuery(myData, {
		variables : {
			productId: router.query.boardId
		}
	})
	console.log(data)

	return (
		<div>
			페이지 이동 성공
			<div>{data?.fetchProduct?.name} 상품 페이지 이동이 완료되었습니다.</div>
			<div>판매자 : {data?.fetchProduct?.seller} </div>
			<div>상품명 : {data?.fetchProduct?.name}</div>
			<div>상품정보 : {data?.fetchProduct?.detail}</div>
			<div>가격 : {data?.fetchProduct?.price}</div>
		</div>
	)
}