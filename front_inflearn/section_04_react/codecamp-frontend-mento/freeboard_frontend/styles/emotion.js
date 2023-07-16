import styled from '@emotion/styled'

export const Container = styled.div`
	padding:80px 0 160px;

	// common
	input[type="number"]::-webkit-outer-spin-button,
	input[type="number"]::-webkit-inner-spin-button {
			-webkit-appearance: none;
			-moz-appearance: none;
			appearance: none;
	}

	// 파이어폭스에서의 초기화 방법 
	input[type=number] {
			-moz-appearance: textfield;
	}

	input:focus, textarea:focus, button:focus, [type='radio']:focus, a:focus {border:1px solid #000;}
`
export const Contents = styled.div`
	max-width:1200px; margin:0 auto;
	& input::placeholder, textarea::placeholder {color:#c4c4c4;}
	& button {cursor:pointer}
	& button.small {min-width:auto;}
	& button.black {color:#fff; background-color:#000;}
	& button.yellow {background-color:#ffd600;}
`
export const BoxShadow = styled.div`
	padding:70px 70px 130px; background-color:#fff; box-shadow:0 4px 20px 0 rgba(0,0,0,0.2);

	& > h2 + div {margin-top:80px;}
	& .col {display:flex;}
	& .col button {flex-shrink:0;}
	& > .col {justify-content:space-between;}
	& .col > div {margin-right:20px;}
	& .col > div:last-of-type {margin-right:0;}
	& .address .col {justify-content:flex-start;}
	& .address .col input {width:77px; margin-right:20px; text-align:center;}
	& .address .col ~ * {margin-top:20px}
`
export const Title = styled.h2`
	margin:0; font-size:36px; text-align:center;
`
export const WrapForm = styled.div`
	margin-top:35px; text-align:left; font-size:16px;
`
export const WrapInp = styled.div`
	width:100%;
`
export const InpLabel = styled.p`
	margin:0 0 10px;  font-weight:500; color:#000;
`
export const Inp = styled.input`
outline:none; width:100%; height:52px; padding:0 8px; border:1px solid #bdbdbd; box-sizing:border-box;
`
export const TextArea = styled.textarea`
outline:none; width:100%; height:480px; padding:16px 8px; border:1px solid #bdbdbd; box-sizing:border-box;  resize:none;
`
export const Button = styled.button`
	outline:none; min-width:179px; height:52px; padding:0 20px; font-weight:500; border:none; 
`
export const FileBox = styled.div`
	justify-content:flex-start;

	& .wrap-file {
		position:relative; width:78px; height:78px;
	}
	& .wrap-file label {
		display:block; position:absolute; top:0; width:78px; height:78px; z-index:1; background:#bdbdbd url('/img-file-upload.png') no-repeat center; background-size:24px auto; cursor:pointer;
	}
`
export const FileUpLoad = styled.input`
	overflow:hidden; display:inline-block; margin:-1px 0 0 0; padding:0; font-size:1px; text-indent:-9999px; line-height:0; vertical-align:middle; background-position:0 0; background-repeat:no-repeat; background-size:100% auto;

	position:absolute; left:0; top:0; z-index:0; width:78px; height:78px;
`
export const BgChk = styled.span`
	position:relative;

	& [type='radio'], [type='checkbox'] {
		opacity:0; position:absolute; left:0; top:0; width:24px; height:24px; padding:0; margin:0;
	}
	& label {position:relative; padding-left:30px; margin-right:20px; cursor:pointer;}
	&:last-child label {margin-right:0;}
	& [type='radio'] + label:before {
		content:''; display:block; position:absolute; left:0; top:0; width:24px; height:24px; background-image:url('/bg-radio.png'); background-repeat:no-repeat; background-position:center; background-size:24px;
	}
	& [type='radio']:checked + label:before {
		background-image:url('/bg-radio-on.png');
	}
	& [type='radio']:focus + label {
		outline:1px solid red;
	}
`
export const Radio = styled.input``
export const ButtonGroup = styled.div`
	margin-top:80px; text-align:center;
`