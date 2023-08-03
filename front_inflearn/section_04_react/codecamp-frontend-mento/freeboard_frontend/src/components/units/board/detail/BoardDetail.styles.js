import styled from '@emotion/styled'

export const WrapUserCont = styled.div`
	position:relative; padding:0 85px 20px 60px; margin-bottom:60px; 
	border-bottom:1px solid #bdbdbd;

	& .img-profile {display:block; position:absolute; left:0; top:0; width:56px; height:56px;}
	& > p {margin:0;}
	& > .user-name {font-size:20px; font-weight:bold; line-height:1.6}
	& > .date {font-size:16px; color:#828282;}

	& .right {position:absolute; right:0; top:calc(50% - 16px);}

	& .right i {overflow:hidden; display:inline-block; width:32px; height:32px; margin:-1px 15px 0 0; padding:0; font-size:1px; text-indent:-9999px; line-height:0; vertical-align:middle; background-position:0 0; background-repeat:no-repeat; background-size:32px auto;}
	& .right i:last-of-type {margin-right:0;}

`
export const LinkIcon = styled.i`
	background-image:url('/images/ico-link.png');
`
export const Location = styled.i`
	background-image:url('/images/ico-location.png');
`
export const BoardImage = styled.img`
	display:block; width:100%; max-height:480px; margin-top:25px;
`
export const BoardText = styled.div`
	margin-top:25px;

	& > * {width:100%;}
`
export const WrapVideo = styled.div`
	display:block; position:relative; padding-bottom:56.25%; height:0; min-height:240px; margin:80px auto 0;

	@media only screen and (min-width:1200px) {
		width:480px; height:240px; padding:0;
	}
`
export const BoardVideo = styled.iframe`
	display:block; position:absolute; top:0; left:0; width:100%; height:100%; 
`
export const UpAndDown = styled.div`
	display:flex; justify-content:space-between; max-width:120px; height:51px; margin:120px auto 0; font-size:18px; text-align:center;

	& > .wrap-up {color:#ffd600;}
	& .count {margin:8px 0 0;}
	& button {overflow:hidden; outline:none; display:block; width:24px; height:24px; margin:0 auto; border:none; background-position:center; background-repeat:no-repeat; background-size:24px auto; background-color:#fff; font-size:1px; text-indent:-9999px; line-height:0;}
`
export const UpBtn = styled.button`
	background-image:url('/images/btn-up.png'); 
`
export const DownBtn = styled.button`
	background-image:url('/images/btn-down.png');
`
