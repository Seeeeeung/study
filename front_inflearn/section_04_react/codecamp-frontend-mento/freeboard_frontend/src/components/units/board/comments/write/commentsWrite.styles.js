import styled from "@emotion/styled";

export const CommentWriteWrap = styled.div`
	margin:80px 0 50px; padding-top:30px; border-top:1px solid #bdbdbd;
`
export const CommentTitle = styled.p`
	position:relative; margin:0; padding-left:35px; font-size:18px; font-weight:bold;

	& > .ico-comment {position:absolute; left:0; top:0;}
`
export const CommentForm = styled.div`
	margin-top:30px;
`
export const InterFace = styled.div`
	display:flex; align-items:center; justify-content:flex-start; margin-bottom:20px;

	& input {width:180px; margin-right:20px;}
`
export const WrapTextArea = styled.div`
	overflow:hidden; position:relative; height:161px; border:1px solid #bdbdbd;

	& textarea {height:109px; border:none;}
	& textarea:focus {outline:none; border:none}
	& .limit {position:absolute; left:0; bottom:0; z-index:1; width:calc(100% - 93px); max-height:52px;; padding:16px 8px; margin:0; color:#bdbdbd; font-size:14px; border-top:1px solid #f2f2f2; background-color:#fff;}
	& button {position:absolute; right:0; bottom:0; z-index:2;}
`