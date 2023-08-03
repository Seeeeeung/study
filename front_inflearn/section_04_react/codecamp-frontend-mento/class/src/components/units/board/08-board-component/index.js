export default function BoardComponent(props) {
	return (
		<div>
			{/* 컴포넌트일 경우에는 div로 묶어주는게 좋다. */}
			<h1>{props.isEdit ? "수정" : "등록"}페이지</h1>
			{/* <h1>{props.name}페이지</h1> */}
			제목 : <input type="text" />
			내용 : <input type="text" />
			<button>{props.isEdit ? "수정" : "등록"}하기</button>
			{/* <button>{props.name}하기</button> */}
	</div>
	)
}