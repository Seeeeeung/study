console.log(`
			 ********
 모던자바스크립트 info
 			******** 
			`);
// function showColnsole(from, text) {
// 	console.log(from + ': ' + text);
// }
// showColnsole('1','2');
// showColnsole('2','3');

// function showMessage(from, text = 'Hello') {
// 	from = '*' + from + '*';
// 	console.log(from+ ': ' + text);
// }
// let from = 'Ann';
// showMessage(from);
// console.log(from)


// function showMessage(from, text = anotherFunction()) {
// 	// anotherFunction();
// }

// function anotherFunction() {
// 	console.log(from + ': ' + 'Hello')
// }

// let from = 'Ann'
// showMessage();

// function showMessage(text) {
// 	// if (text === undefined) {
// 	// 	text = '빈 문자열';
// 	// }
// 	text = text || '빈문자열';
// 	console.log(text);
// }
// showMessage();

// function showCount(count) {
// 	console.log(count ?? 'unknown');
// }
// showCount(0);
// showCount(null);
// showCount();

// function sum(a,b) {
// 	return a + b;
// }
// let result = sum(1,2);
// console.log(result);

// function checkAge(age) {
// 	if (age >= 18) {
// 		return true;
// 	} else {
// 		return confirm('18세 미만입니다, 보호자 동의 필요')
// //	확인을 누르면 허용, 취소를 누르면 차단
// 	}
// }

// let age = prompt('나이',10);

// if (checkAge(age)) {
// 	console.log('접속허용');
// } else {
// 	console.log('접속차단');
// }

// function showMovie(age) {
// 	if (!checkAge(age)) {
// 		return;
// 		// 지시자만 명시하는것도 가능 , 지시자가 실행되면 console.log는 실행되지 않는다.
// 	}
// 	console.log('영화상영')
// }

function doNothing() {
	// return; 아무것도 쓰지 않았을때와 동일한 결과값이다.
}
console.log(doNothing() === undefined) // true

function test() {
	return (
		'some' + 'long' + 'expression' + 'or' + 'whatever' * 'f(a)' + 'f(b)'
	)
}
console.log(test())

// 예제
// function checkAge(age) {
	// if (age > 18) {
	// 	return true;
	// } else {
	// 	return confirm('보호자의 동의를 받으셨나요?');
	// }
	// 위와 동일한 동작을 하는 코드 ? 와 ||를 사용하여 만들기
	// return (age > 18) ? true : confirm ('보호자 동의 필요');
	// return (age > 18) || confirm('보호자 동의필요');
// }
// checkAge();

function min(a,b) {
	return console.log(a > b ? b : a);
}
min(2,5);
min(3,-1);
min(1,1);
/*
1. 프롬프트 상자
2. x값 입력
3. n값 입력
4. n값 1이상 알럿창 실행
5. x의 n제곱 반환 
*/

/* for 구문 이해..
let a=5;
let b=4;
let result2 = a
for (i=0; i<b; i++) {
	result2 = a+result2;
	console.log(result2,a) // 위의 수식 아래에 console.log가 있기때문에 첫번째 결과값은 10이 된다. 이 수식이 위의 수식보다 위에 있으면 결과값은 5가 된다. 이점을 잘 인지해야함
	console.log(result2 + '=' + a + '+' +result2)
}
*/
/*
function pow(x,n) {
	let result = x;
	for (i = 1; i < n; i++) {
		result = x * result;
		// 1 = 3*1, 3= 3*3. 9=3*9 27
	}
	console.log('pow 결과값 : ' + result)
}

let x = prompt('x?');
let n = prompt('n?');

if (n < 1) {
	confirm(`${n}은 양의 정수여야 한다`)
} else {
	pow(x,n)
}
*/

console.log('')

// function ask(question, yes, no) {
// 	if (confirm(question)) yes()
// 	else no();
// }
// // 여기까진 동일

// function showOk() {
// 	console.log('동의')
// }

// function showCancle() {
// 	console.log('취소')
// }
// 함수 showOk와 showCancle 가 ask함수의 인수로 전달된다.
// ask('동의?', showOk, showCancle);
/* 위 함수를 함수 표현식으로 사용하면 코드길이가 짧아진다.
ask(
	'동의?',
	function() {console.log('동의')},
	function() {console.log('취소')}
);
*/

let sum = (a,b) => a + b;
/* 위 함수는 아래 함수의 축약이다.
let sum = function (a,b) {
	return a + b;
};
*/
console.log(sum(1,2));

// 인수가 하나면 괄호 생략 가능
let double = n => n*2;
console.log(double(3))

// 인수가 하나도 없을땐 괄호를 비우면 됨 (이때 괄호를 생략할수 없다.)
let sayHi = () => console.log('하이!');
sayHi();

let age = 15;
let welcome = (age < 18) ?
	() => console.log('안녕') :
	() => console.log('안녕하세요');

welcome();

// 본문이 여러줄이면 중괄호를 사용하여 그 안에 넣어야 한다.
let sum2 = (a,b) => {
	let result = a + b;
	return result;
}
console.log(sum2(1,2));

// 예제
// let ask = (question, yes, no) => {
// 	if (confirm(question)) yes()
// 	else no();
// }
// // 표현식으로도 가능하지만 선언문으로 사용

// ask(
// 	'동의하십니까?',
// 	() => console.log('동의'),
// 	() => console.log('취소')
// );

console.log('');

console.log(typeof function() {} == "function");

console.log('');

// function pow(x, n) {
// 	if (n < 0) {
// 		console.log('n은 음수가 될 수 없습니다.');
// 	} else {
// 		let result = 1;

// 		for (let i = 0; i < n; i++) {
// 			result *= x;
// 		}

// 		return console.log(result);
// 	}
// }
// 아래 함수가 위 함수와 같은 동작을 수행한다. if 문 안에 return문을 추가해주면서 가독성이 좋아진다.
// function pow(x, n) {
// 	if (n < 0) {
// 		console.log('n은 음수가 될 수 없습니다.');
// 		return;
// 	} 
// 	let result = 1;

// 	for (let i = 0; i < n; i++) {
// 		result *= x;
// 	}

// 	return console.log(result);
// }
//  pow(1,-1)

// 예제
// function pow(x, n) {
// 	let result = 1;

// 	for (let i = 0; i < n; i++) {
// 		result *= x;
// 	}

// 	return result;
// }

// let x = prompt('x?', '');
// let n = prompt('n?', '');

// if (n <= 0) {
// 	console.log(`Power ${n} is not supported, please enter an integer number greter than zero`);
// } else {
// 	console.log(pow(x, n));
// }