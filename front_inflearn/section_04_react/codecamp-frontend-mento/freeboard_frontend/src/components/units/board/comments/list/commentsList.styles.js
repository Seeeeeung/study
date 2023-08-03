import styled from "@emotion/styled";

export const CommentListWrap = styled.div`
	& .wrap-comment {margin-bottom:20px;}
	& .wrap-comment:last-child {margin-bottom:0;}
	& .wrap-comment .img-profile {top:-3px; width:48px; height:48px;}
	& p {margin:0;}
	& .wrap-comment .img-profile + div {margin-bottom:10px;}
	& .wrap-comment .user-name {font-weight:bold; margin-right:15px;}
	& .wrap-comment .date {margin-top:20px; font-size:12px; }
	& .wrap-comment .right {top:0}
`