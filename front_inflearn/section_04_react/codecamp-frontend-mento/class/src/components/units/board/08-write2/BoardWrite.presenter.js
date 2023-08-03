import { RedInput, BlueButton } from './BoardWrite.styles'

export default function BoardWriteUI(props) {
	// console.log(props.data)
	return (
		<div>
			<div>@@@ 여기는 presenter 입니다 @@@</div>
			<div>
				<h1>{props.isEdit ? "수정페이지" : "등록페이지"}</h1>
				작성자 : <RedInput type="text" onChange={props.onChangeWriter} defaultValue={props.data?.fetchBoard.writer} />
				제목 : <input type="text" onChange={props.onChangeTitle} defaultValue={props.data?.fetchBoard.title} />
				내용 : <input type="text" onChange={props.onChangeContents} defaultValue={props.data?.fetchBoard.contents} />
				<BlueButton	BlueButton onClick={props.isEdit ? props.onClickUpdate : props.onClickSubmit}>{props.isEdit ? "수정" : "등록"}하기</BlueButton> 
			</div>
			<div>@@@ 여기는 presenter 입니다 @@@</div>
		</div>
	)

}

export const apple = 3;