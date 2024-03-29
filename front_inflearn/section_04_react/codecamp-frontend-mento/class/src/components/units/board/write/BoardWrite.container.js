import { useMutation } from "@apollo/client";
import { useState } from "react";
import { 나의그래프큐엘셋팅 } from './BoardWrite.queries.js' // {} => export 로 내보내서 골라서 가져오기
import BoardUI from "./BoardWrite.presenter"; // default 로 내보내서 가져오는것 (1개)
// import Component from "./BoardWrite.presenter"; // export default 로 이름바꿔서 가져오기
// import Component, { apple } from "./BoardWrite.presenter"; // export default 와 export 함께 가져오기

// import * as QQQ from './BoardWrite.styles.js'; // export 한방에 다 가져오기
// QQQ.BlueButton
// QQQ.RedInput


export default function BoardWrite() {
	const [writer, setWriter] = useState()
	const [title, seTtitle] = useState()
	const [contents, setContents] = useState()
  const [나의함수] = useMutation(나의그래프큐엘셋팅);

	const onClickSubmit = async () => {
		const result = await 나의함수({
			variables : { // variables = $
				writer: writer,
				title: title,
				contents: contents
			}
		});
		console.log(result.data)
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
				aaa={onClickSubmit} 
				bbb={onChangeWriter}
				ccc={onChangeTitle}
				ddd={onChangeContents} 
			/>
			<div>$$$ 여기는 container 입니다 $$$</div>
		</div>
	)

}