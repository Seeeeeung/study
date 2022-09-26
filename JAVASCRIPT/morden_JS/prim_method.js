console.log(' ** 모던자바스크립트 자료구조_숫자 ** ');
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

