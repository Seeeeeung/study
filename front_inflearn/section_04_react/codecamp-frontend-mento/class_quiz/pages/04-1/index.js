import axios from 'axios'

export default function RestAPiSet() {


	const onClickGetApi = async () => {
		const result = await axios.get('https://koreanjson.com/users')
		console.log(result)
	}

	return <button onClick={onClickGetApi}>API요청, 비동기처리</button>
}