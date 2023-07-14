import styled from '@emotion/styled'

export const Search = styled.div`
	display:flex;
	align-items:center;
	justify-content:flex-end;
	width:100%;
	height:50px;
	padding:0 20px;
	box-sizing:border-box;

	& > button {
		overflow:hidden; 
		display:inline-block; 
		width:36px;
		height:36px;
		margin:-1px 0 0 0; 
		padding:0; 
		border:none;
		font-size:1px; 
		text-indent:-9999px; 
		line-height:0; 
		vertical-align:middle; 
		background:#fff url('/btn-search.png') no-repeat center;
		background-size:23px auto;
		// border:1px solid red;
		cursor:pointer;
	}
`
export const Header = styled.div`
	display:flex; justify-content:space-between; align-items:center; height:64px; padding:10px 20px;
`

export const User = styled.a`
	display:flex;
	justify-content:space-between;
	align-items:center;
	text-decoration:none;

	& > .ico-arr-right {width:28px; height:28px; background:url('/ico-arr-profile.png') no-repeat center; background-size:16.97px;}
`

export const UserImg = styled.div`
	width:60px; height:60px; margin-right:15px;

	& > img {display:block; width:100%; height:100%;}
`

export const UserName = styled.span`
	font-size:19px; font-weight:bold;
`

export const Nav = styled.div`
	height:50px; padding:20px; border-bottom:1px solid #cacaca;
`

export const Gnb = styled.ul`
	display:flex; justify-content:flex-start; align-items:center; list-style-type:none; height:100%; margin:0; padding:0;

	& > li  {
		margin-right:30px;
	}
	& > li:last-child {
		margin-right:0;
	}
	& > li a {position:relative; text-decoration:none; font-size:20px; font-weight:bold; color:#cacaca;}
	& > .active a {color:#ff1b6d;}
	& > .active a:after {content:''; position:absolute; bottom:-6px; left:0; width:100%; height:1px; background-color:#ff1b6d;}
`

export const Container = styled.div`

`

export const Contents = styled.div`

`

export const QuickBar = styled.div`

`