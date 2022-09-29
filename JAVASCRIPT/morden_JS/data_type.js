console.log(` 
			********
 모던자바스크립트 자료구조_원시값, 숫자
 			********
			 `);
let str = 'Hello';
console.log(str.toUpperCase()); // HELLO

let n = 1.23455;
console.log(n.toFixed(2)); // 1.23

console.log(typeof 0); // number
console.log(typeof new Number(0)); // object

let zero = new Number(0);
if (zero) { // zero는 객체이므로 조건문은 참이된다
	console.log('zero 가 참이라는 것에 동의합니까?');
}

let num = Number('123');
console.log(typeof num); // number -> 문자열을 숫자로 바꿔줌

// 예제
let str2 = 'Hello';
str2.test = 5;
console.log(str2);
console.log(str2.test);
console.log('')
// 엄격 -> Error / 비엄격 -> undefined

// 숫자형
// 10억 입력
// let billion = 10000000000;
// 10억 -> 1bn / 73억 -> 7.3bn = 숫자 옆에 e를 붙이고 0의 개수를 옆에 붙여 0의 개수를 줄임
let billion = 1e9; // 1과 9개의 0
console.log(billion); // 10 억 -> e왼쪽의 수에 e 오른쪽에 있는 수만큼의 10의 거듭제곱
console.log(7.3e9);
// 1e3 = 1 * 1000;
// 1.23e6 = 1.23 * 1000000
// 1마이크로초 let ms = 0.000001;
let ms = 1e-6; // 1에서 왼쪽으로 6번 소수점 이동
// 1e-3 = 1 / 100 -> 0.001
// 1.23e-6 = 1.23 / 1000000 -> 0.00000123

// 16, 2, 8 진수 
// 16 -> 0x
console.log(0xff); // 255
console.log(0xFF); // 대소문자 가리지 않고 동일값 반환
// 2, 8 진수 -> 0b, 0o
let a = 0b11111111; // 255의 2진수
let b = 0o377; // 255의 8진수
console.log(a == b); // true
console.log('');

// toString(base)
let num2 = 255;

console.log(num.toString(16)); // ff
console.log(num.toString(2)); // 11111111
console.log(123456..toString(36)); // 2n9c

let num3 = 1.23456;
console.log(Math.floor(num3 * 100) / 100); 
// 1.23456 -> 123.456 -> 123 -> 1.23

let num4 = 12.34;
console.log(num4.toFixed(1)); // 12.3
let num5 = 12.36;
console.log(num5.toFixed(1)); // 12.4
console.log(num4.toFixed(5)); // 12.34000
console.log(typeof num4.toFixed(5)); // string
console.log(typeof +num4.toFixed(5)); // number
console.log(typeof Number(num4.toFixed(5))); // number
console.log('')

// 부정확한 계산
console.log(1e500); // infinity
console.log(0.1 + 0.2 == 0.3); // false
console.log(0.1 + 0.2); // 0.3000000000000004

console.log(9999999999999999999); // 100000000000000000000이 출력

console.log(isNaN(NaN)); // true
console.log(isNaN('str')); // true
console.log(NaN === NaN) // false
console.log(isFinite('15')); // true
console.log(isFinite('str')); // false -> NaN 이기때문
console.log(isFinite(Infinity)); // false -> Infinity 이기 때문

// let numValidate = +prompt('숫자 입력', '');
// console.log(isFinite(numValidate)); 숫자입력시 true, 그 외 false

console.log(+'100px'); //NaN
console.log(parseInt('100px')); // 100
console.log(parseFloat('12.5em')); // 12.5
console.log(parseInt('12.3')); // 12 , 정수 부분만 반환
console.log(parseFloat('12.3.4')); // 12.3, 두번째 점에서 숫자읽기 멈춤
console.log(parseInt('a123')); // NaN

// 문자열 파싱
console.log(parseInt('0xff', 16)); // 255
console.log(parseInt('ff', 16)); // 255, 0x가 없어도 동작
console.log(parseInt('2n9c', 36)); // 123456

// 예제
// let firstNumber = +prompt('첫번째숫자 입력', '');
// let secondNumber = +prompt('두번째 숫자 입력', '');
// let resultSum = firstNumber + secondNumber;
// console.log(resultSum);
// console.log(typeof resultSum); // number

console.log( Math.round(6.35 * 10) / 10); 

// 예제
/*
function readNumber() {
	let promptNum;
	// do while 반복문을 사용해 숫자를 입력할때까지 반복함
	do {
		promptNum = prompt('숫자 입력', 0);
	} while (!isFinite(promptNum));
	// isFinite → 인수를 숫자로 변환하고 변환한 숫자가 NaN/Infinity/-Infinity 가 아닌 일반 숫자인 경우 true 반환
	// 문자열이 일반 숫자인지 검증하는데 사용

	// 취소나 공백을 넣었을때 null을 반환하고
	if (promptNum === null || promptNum === '') return null;
	// 아닐때는 사용자가 입력한 값을 (숫자로) 반환함
	return +promptNum; // else 생략
}
console.log(`Read: ${readNumber()}`); */

function random(min, max) {
	return min + Math.random() * (max - min);
	// max에서 min사이 랜덤숫자를 뽑는경우
	// Math.random() 은 소수점까지 나옴
	// Math.random() 에 max-min을 하면 사이 범위를 한정시킬수 있음
	// 출발점이 0 이라 사이범위를 계산한 식에 min을 더해줘야 출발선이 min이되고 마지막점이 max가 된다
}
console.log(random(1,5));
console.log(random(1,5));
console.log(random(1,5));

function randomInteger(min, max) {
	// rand from min-0.5, to max+0.5
	let rand = min - 0.5 + Math.random() * (max-min + 1);
	return Math.round(rand);

	//  다른 방법 min to max+1
	// let rand = min + Math.random() * (max + 1 - min);
	// return Math.floor(rand);
}
console.log(randomInteger(1,5));
console.log(randomInteger(1,5));
console.log(randomInteger(1,5));

console.log(` 
			********
 모던자바스크립트 자료구조_문자열
			 ******** 
			 `);
function bTSum(a,b) {
	return a + b;
}
console.log(`1 + 2 = ${bTSum(1,2)}.`);

let guestList = `손님:
	* John
	* Pete
	* Mary
	`;
	console.log(guestList);

let guestList2 = '손님:\n *John\n *Pete\n *Mary';
console.log(guestList2);

let str1 = 'Hello\nWorld';
let str3 = `Hello
World`;
console.log(str1 == str3);

console.log('\u00A9');
console.log('\u{20331}');
console.log('\u{1F60D}');

console.log(`My\n`.length); // 3

console.log(str1[0]); // H
console.log(str1.charAt(0)); // H
console.log(str1[str1.length - 1]); // d
console.log(str[1000]); // undefined
console.log(str1.charAt(1000)); // ' '

for (let char of 'Hello') {
	console.log(char); // H , e, l, l, o
}
console.log('');

// 문자열 불변성
let str4 = 'Hi';

str4[0] = 'h' // Error?????
console.log(str4[0]); // 동작하지 않는다 ????? H 반환함

str4 = 'h' + str4[1]; // 문자열 전체 교체
console.log(str4); // hi

// 부분 문자열
let str5 = 'Widget with id';
console.log(str5.indexOf('Widget')); // 0 , str5는 Widget으로 시작
console.log(str5.indexOf('widget')); // -1 , 대소문자를 따지므로 원하는 문자열 찾지못함
console.log(str5.indexOf('id')); // 1 , id는 첫번째 위치에서 발견 -> Widget의 id 임

console.log(str5.indexOf('id', 2)) // 12
console.log('');

// 반복문 내 indexOf
let str6 = 'As sly as a fox, as strong as an ox';
let targetStr = 'as'; //  as 찾기
let pos = 0;
while (true) {
	let foundPos = str6.indexOf(targetStr, pos);
	if (foundPos == -1) break;
	console.log(`위치: ${foundPos}`);
	pos = foundPos + 1; // 다음 위치를 기준으로 검색을 이어감
}
console.log('코드단축')
// 코드 단축
let pos2 = -1;
while ((pos2 = str6.indexOf(targetStr, pos2 + 1)) != -1) {
	console.log(`위치: ${pos2}`);
}

// 주의점
let str7 = 'Widget with id';
if (str7.indexOf('Widget')) {
	console.log('동작안함')
}
if (str7.indexOf('Widget') != -1) {
	console.log('정상동작');
}
console.log('');

// 비트NOT연산자 사용
console.log(~2); // -(2+1)
console.log(~1); // -(1+1)
console.log(~0); // -(0+1)
console.log(~-1); // -(-1+1)

let str8 = "Widget";
if (~str8.indexOf('Widget')) {
	console.log('작동!')
}

// 최근 나온 메서드
console.log('Widget with id'.includes('Widget')); // true
console.log('Hello'.includes('bye')); // false
console.log('Widget'.includes('id')); // true
console.log('Widget'.includes('id', 3)); // false ->세번째 위치엔 id가 없음
console.log('Widget'.startsWith('Wid')); // true -> Widget은 Wid로 시작
console.log('Widget'.endsWith('get')); // true -> get 으로 끝남

console.log('');
// 부분 문자열 추출
let str9 = 'stringify';
console.log(str9.slice(0,5)); // strin, 0번째 부터 5번째 위치까지 반환 -> 5번째 위치의 글자 미포함
console.log(str9.slice(0,1)); // s, 0번째 부터 1번째 위치까지 반환
console.log(str9.slice(2)); // ringify, 2번째부터 끝까지 반환
console.log(str9.slice(-4, -1)); // gif

console.log('');

// 동일 부분 문자열 반환
console.log(str9.substring(2, 6)); // ring
console.log(str9.substring(6, 2)); // ring

// slice를 사용하면 결과가 다름
console.log(str9.slice(2, 6)); // ring
console.log(str9.slice(6, 2) + '빈 문자열 반환'); // ' ' 빈 문자열

console.log('');

console.log(str9.substr(2, 4)); // ring , 두번째 부터 글자 네개
console.log(str9.substr(-4, 2)); // gi , 끝에서 네번째 위치부터 글자 두개

console.log('');

// 문자열 비교
console.log('a' > 'Z'); // true
console.log('Österreich' > 'Zealand'); // true

console.log('');

console.log('z'.codePointAt(0)); // 122
console.log('Z'.codePointAt(0)); // 90

console.log('');

console.log(String.fromCodePoint(90)); //Z
// 90을 16진수로 변환하면 5a 이다
console.log('\u005a'); // Z

let str10 = '';
for (let i = 65; i <= 220; i++) {
	str10 += String.fromCodePoint(i);
}
console.log(str10);

console.log('Österreich'.localeCompare('Zealand')); // -1

// 심화
console.log('𝒳'.length); // 2
console.log('𝒳'[0]); // 이상한 기호 출력
console.log('𝒳'[1]); // ??
console.log('😀'.length); // 2
console.log('𩷶'.length); // 2

// 정규화
console.log('A\u0307\u0323'.normalize() == 'A\u0323\u0307'.normalize()); // true
// -> 두 유니코드를 normalize() 하지 않으면 false 반환
console.log('A\u0307\u0323'.normalize().length); // 1
console.log('A\u0307\u0323'.normalize()); // Ạ̇
console.log('A\u0307\u0323'.normalize() == '\u1e68'); // true
// -> 세 유니코드 글자를 1개로 합쳐줌

// 예제
function ucFirst(result) {
	if (!result) return result;
	return result[0].toUpperCase() + result.slice(1);
}
console.log(ucFirst('john') == 'John');

function truncate(str, maxlength) {
	/* 내 답안
	if (str.length > maxlength) {
		let over = str.slice(maxlength - 1)
		over = '…';
		return str.slice(0, maxlength) + over;
	}
	return str; */
	return (str.length > maxlength) ? str.slice(0, maxlength - 1) + '…' : str;
}
console.log(truncate('What I\'d like to tell on this topic is: ', 20));
console.log(truncate('Hi everyon!', 20));

function extractCurrencyValue(str) {
	// return Number(str.slice(1)); // 내 정답
	return +str.slice(1);
}
console.log(extractCurrencyValue('$120') === 120)



console.log(` 
			********
 모던자바스크립트 자료구조_배열
			 ******** 
			 `);

let arr = ['사과', {name: '이보라'}, true, function() { console.log('하이');} ];
console.log(arr[1].name); // 이보라
arr[3]();