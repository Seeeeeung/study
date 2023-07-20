import { RedInput, BlueButton } from './BoardWrite.styles'

export default function BoardWriteUI(props) {

	return (
		<div>
			<div>@@@ 여기는 presenter 입니다 @@@</div>
			<div>
				작성자 : <RedInput type="text" onChange={props.onChangeWriter} />
				제목 : <input type="text" onChange={props.onChangeTitle} />
				내용 : <input type="text" onChange={props.onChangeContents} />
				<BlueButton onClick={props.onClickSubmit} isActive={props.isActive}>GRAPHQL-API 요청하기</BlueButton> 
			</div>
			<div>@@@ 여기는 presenter 입니다 @@@</div>
		</div>
	)

}

export const apple = 3;