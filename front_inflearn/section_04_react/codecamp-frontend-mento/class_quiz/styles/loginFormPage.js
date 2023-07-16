import styled from '@emotion/styled'

export const Wrapper = styled.div`
	display:flex; flex-direction:column; justify-content:space-between;
	width:300px; margin:30px auto; padding:20px; background-color:#fff; border:1px solid #ccc; border-radius:10px; box-shadow:2px 2px 4px #ddd; box-sizing:border-box;

	& > input:focus {border:1px solid #27b8dc}
	& > * + * {margin-top:5px;}
`

export const InputText = styled.input`
	width:100%; height:35px; padding:0 10px; border:1px solid #ccc; border-radius:8px; font-size:14px; outline:none;
	box-sizing:border-box;
`

export const ErrorMsg = styled.p`
	margin:0; padding:0 0 3px; font-size:12px; color:red;
`

export const Join = styled.button`
	width:100%; padding:3px 10px; color:#fff; background-color:#9999ee; border:none; outline:none; border-radius:5px; cursor:pointer
`