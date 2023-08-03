import { useMutation } from "@apollo/client";
import { useState } from "react";
import { 나의그래프큐엘셋팅, UPDATE_BOARD } from './BoardWrite.queries.js' // {} => export 로 내보내서 골라서 가져오기
import BoardUI from "./BoardWrite.presenter"; // default 로 내보내서 가져오는것 (1개)
import { useRouter } from "next/router.js";
// import Component from "./BoardWrite.presenter"; // export default 로 이름바꿔서 가져오기
// import Component, { apple } from "./BoardWrite.presenter"; // export default 와 export 함께 가져오기

// import * as QQQ from './BoardWrite.styles.js'; // export 한방에 다 가져오기
// QQQ.BlueButton
// QQQ.RedInput


export default function BoardWrite(props) {
	const router = useRouter()
	const [writer, setWriter] = useState("")
	const [title, seTtitle] = useState("")
	const [contents, setContents] = useState("")
  const [나의함수] = useMutation(나의그래프큐엘셋팅);
  const [updateBoard] = useMutation(UPDATE_BOARD);

	const onClickSubmit = async () => {
		const result = await 나의함수({
			variables : { // variables = $
				writer: writer,
				title: title,
				contents: contents
			}
		});
		// console.log(result.data)
		router.push(`/08-board-edit-new/08-04-boards/${result.data.createBoard.number}`)
		// 등록 후 상세페이지 이동.
	}

	const onClickUpdate = async () => {
		// 여기서 수정하기 하자 !

		const myvariables = {
			number :  Number(router.query.number)
		}
		if (writer) myvariables.writer = writer
		if (title) myvariables.title = title
		if (contents) myvariables.contents = contents


		console.log(myvariables)
		const result = await updateBoard({
			variables : myvariables
			// $ 로 표시하면 오류뜸
		})


		router.push(`/08-board-edit-new/08-04-boards/${result.data.updateBoard.number}`)
	}

	const onChangeWriter = (event) => {
		setWriter(event.target.value)
	}
	
	const onChangeTitle= (event) => {
		seTtitle(event.target.value)
	}
	
	const onChangeContents= (event) => {
		setContents(event.target.value)
	}


	return (
		<div>
			<div>$$$ 여기는 container 입니다 $$$</div>
			<BoardUI 
				onClickSubmit={onClickSubmit} 
				onClickUpdate={onClickUpdate}
				onChangeWriter={onChangeWriter}
				onChangeTitle={onChangeTitle}
				onChangeContents={onChangeContents} 
				isEdit={props.isEdit}
				data ={props.data} // undefined 거나, data 거나 둘중 하나.
			/>
			<div>$$$ 여기는 container 입니다 $$$</div>
		</div>
	)

}