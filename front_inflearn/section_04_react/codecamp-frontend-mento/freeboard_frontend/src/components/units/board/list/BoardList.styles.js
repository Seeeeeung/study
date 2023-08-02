import styled from "@emotion/styled";

export const CardWrap = styled.div`
	display:flex; justify-content:space-between; height:257px; margin-top:50px;

	@media only screen and (max-width:1058px) {
		justify-content:center;
	}
	@media only screen and (max-width:1200px) {
		flex-wrap:wrap; gap:50px; height:auto; padding:0 50px;
	}
`
export const Card = styled.a`
	overflow:hidden; width:282px; height:100%; border-radius:20px; box-shadow:5px 5px 10px 0 rgba(0,0,0,0.1);

	& > img {display:block; width:100%; height:120px; border:20px 20px 0 0;}
	& .title-4 {overflow:hidden; margin:0; padding:20px; text-align:left; text-overflow:ellipsis; white-space:nowrap; font-size:18px;font-weight:500;}
	& .title-4 + div {height:72px; margin:0; padding:0 20px 20px; border:none; box-sizing:border-box;}
	& > div .left {width:100%; height:100%; min-width:95px; padding-left:30px;}
	& > div .left .img-profile {width:24px; height:24px; top:0;}
	& > div .left .user-name {font-size:16px; font-weight:400;}
	& > div .left .date {position:absolute; left:0; bottom:0; width:100%;}
	& .right {text-align:center; font-size:16px;}
	& .right .count {margin:0;}

	@media only screen and (max-width:1200px) {
		
	}
`
export const UpIcon = styled.i`
	overflow:hidden; outline:none; display:block; width:24px; height:24px; margin:0 auto; border:none; background-position:center; background-repeat:no-repeat; background-size:24px auto; background-color:#fff; font-size:1px; text-indent:-9999px; line-height:0; background-image:url('/images/btn-up.png');
`

export const BoardUtil = styled.div`
	border:1px solid red;
	width:100%; height:52px; margin:50px 0 30px;
`
export const BoardTable = styled.div`
	border:1px solid #000; border-left:none; border-right:none;

	& table thead tr th {padding:15px;}
	& table tbody tr {border:1px solid #bdbdbd; border-left:none; border-right:none;}
	& table tbody tr:last-child {border-bottom:none;}
	& table tbody tr td {padding:15px; text-align:center;}
	& table tbody tr td a {display:block; width:100%;}
	& table tbody tr td a:hover {text-decoration:underline;}
`
export const WriteIcon = styled.i`
	display:inline-block; width:24px; height:24px; margin-right:10px; background:url('/images/ico-write.png') no-repeat center; background-size:24px auto;
`

export const Pagination = styled.div`
	display:flex; justify-content:center; align-items:center;

	& a.control {overflow:hidden; outline:none; display:block; width:24px; height:24px; margin:0; border:none; background-position:center; background-repeat:no-repeat; background-size:24px auto; background-color:#fff; font-size:1px; text-indent:-9999px; line-height:0; background-image:url('/images/ico-pagination.png');}
	& a.control.next {transform:scaleX(-1)}
	& *:not(.control) {width:24px; height:24px; text-align:center;}
	& .active {color:#ffd600; text-decoration:underline;}
	& a:not(.control):hover {color:#ffd600;}
`