import {useState} from 'react'

export default function CounterStatePage() {

	const [count, setCount] = useState(0); //  기본방식 : let count = 0;

	function handleClickCountUp () {
		setCount(count + 1) // 기본방식 : count = count + 1
	}

	function onClickCountDown () {
		setCount(count - 1) //  기본방식 : count = count - 1
	}

	return (
		<>	{/* -> 프래그먼트 */}	
			<div>{count}</div>
			<button onClick={handleClickCountUp}>카운트 올리기!!!!</button>
			<button onClick={onClickCountDown}>카운트 내리기!!!</button>
		</>
	)
}