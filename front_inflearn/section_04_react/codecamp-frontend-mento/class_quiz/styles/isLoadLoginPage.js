import styled from '@emotion/styled'

export const Wrapper = styled.div`
	width:100%;
	font-size:16px;
	& > * {box-sizing:border-box; word-break:keep-all;}
`
export const Login = styled.div`
	width:100%;
	padding:150px 30px 60px;
	background-image:url('/background.png');
	background-repeat:no-repeat;
	background-position:top right;
	background-color:#000;
	background-attachment: fixed;
	background-size:cover;
	text-align:center;

	& > button {margin-top:30px;}
	// & > button:first-of-type {margin-top:0;}
`
export const Logo = styled.div`
	display:flex; flex-direction:column; align-items:center;

	& > img {display:block; max-width:50px;}
	& > .title {color:#fff; font-size:40px; line-height:1.1;}
`
export const Form = styled.div`
	margin-top:60px;

	& > div {margin-top:30px;}
	& > div:first-of-type {margin-top:0;}
	& > p:last-of-type {margin-bottom:0}
`
export const WrapInp = styled.div`
	position:relative; 

	& > input {width:100%; height:30px; color:#fff; background-color:transparent; border:none; border-bottom:1px solid #7d7d7d; outline:none;}
	& > input:focus {border-bottom-color:#fff;}

	& > input + .btn-delete {
		overflow:hidden;
		position:absolute; right:0; top:7px;
		width:15px; height:15px;
		margin:-1px 0 0 0; padding:0; 
		border:none; font-size:1px; text-indent:-9999px; line-height:0; vertical-align:middle; 
		background:url('/btn-del.png') no-repeat center;
		background-size:15px auto;
		cursor:pointer;
	}

	& > input + .btn-delete {
		opacity:0; transform:scale(0);
		transition:opacity 0.2s, transform 0.2s;
	}
	
	& > input:focus + .btn-delete.on {
		opacity:1; transform:scale(1);
	}
`
export const ErrorMsg = styled.p`
	display:none;
	margin:5px 0 30px;
	color:#ff1b6d; font-size:13px; text-align:left; 
`
export const BtnLogin = styled.button`
	width:100%; height:70px; margin:0; padding:0 30px; border-radius:38px; border:none; font-size:20px; font-weight:bold; cursor:pointer;
`
export const ButtonGroup = styled.div`
	display:flex; align-items:center; justify-content:center; margin-top:30px;

	& > a {
		position:relative; margin-right:30px; text-decoration:none; color:#fff; font-size:15px;
	}
	& > a:last-child {
		margin-right:0;
	}
	& > a:after {
		content:''; display:block; position:absolute; right:-15px; top:calc(50% - 5px); width:1px; height:10px; background-color:#fff;
	}
	& > a:last-child:after {
		display:none;
	}
`