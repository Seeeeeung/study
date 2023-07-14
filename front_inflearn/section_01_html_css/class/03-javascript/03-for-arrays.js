const fruits = [
	{number: 1, title: "레드향"},
	{number: 2, title: "샤인머스켓"},
	{number: 3, title: "산청딸기"},
	{number: 4, title: "한라봉"},
	{number: 5, title: "사과"},
	{number: 6, title: "애플망고"},
	{number: 7, title: "딸기"},
	{number: 8, title: "천혜향"},
	{number: 9, title: "과일선물세트"},
	{number: 10, title: "귤"}
	]

	for (let count = 0; count < fruits.length; count++) {
    console.log(fruits[count].number + fruits[count].title)
}
// VM4557:2 1레드향
// VM4557:2 2샤인머스켓
// VM4557:2 3산청딸기
// VM4557:2 4한라봉
// VM4557:2 5사과
// VM4557:2 6애플망고
// VM4557:2 7딸기
// VM4557:2 8천혜향
// VM4557:2 9과일선물세트
// VM4557:2 10귤

for (let count = 0; count < fruits.length; count++) {
	console.log(`${fruits[count].number} ${fruits[count].title}`)
}
// VM4581:2 1 레드향
// VM4581:2 2 샤인머스켓
// VM4581:2 3 산청딸기
// VM4581:2 4 한라봉
// VM4581:2 5 사과
// VM4581:2 6 애플망고
// VM4581:2 7 딸기
// VM4581:2 8 천혜향
// VM4581:2 9 과일선물세트
// VM4581:2 10 귤

for (let count = 0; count < fruits.length; count++) {
	console.log(`과일차트 ${fruits[count].number}위는 ${fruits[count].title}입니다`)
}
// VM4614:2 과일차트 1위는 레드향입니다
// VM4614:2 과일차트 2위는 샤인머스켓입니다
// VM4614:2 과일차트 3위는 산청딸기입니다
// VM4614:2 과일차트 4위는 한라봉입니다
// VM4614:2 과일차트 5위는 사과입니다
// VM4614:2 과일차트 6위는 애플망고입니다
// VM4614:2 과일차트 7위는 딸기입니다
// VM4614:2 과일차트 8위는 천혜향입니다
// VM4614:2 과일차트 9위는 과일선물세트입니다
// VM4614:2 과일차트 10위는 귤입니다

// 수학함수
Math.floor(Math.random() * 100000)
// 42519
String(Math.floor(Math.random() * 100000))
// '16138'
String(Math.floor(Math.random() * 100000)).padStart(6,"0") // -> 6자리 숫자가 오지않으면 맨 앞에 0 추가
// '032368'
String(Math.floor(Math.random() * 100000)).padStart(6,"0")
// '073692'
let result = String(Math.floor(Math.random() * 100000)).padStart(6,"0")
// undefined
result
// '003100'
result
// '003100'