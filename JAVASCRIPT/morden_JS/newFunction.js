console.log(` 
			********
 모던자바스크립트 객체_생성자함수
 			******** 
			`);
// new연산자, 생성자 함수
function User(name) {
	this.name = name;
	this.isAdmin = false;
}

let user15 = new User('보라');
let user16 = new User('호진');

console.log(user15.name);
console.log(user16.name);
console.log(user15.isAdmin);

// 재사용하지 않는 익명 생성자 함수
let user17 = new function() {
	this.name = 'John';
	this.isAdmin = false;
}

// new 함수와 함께 호출했는지 아닌지 확인
function User2() {
	console.log(new.target);
}
User2(); // undefined
new User2(); // function User2() {...}

// 일반적인 방법으로도 new를 붙여 호출한 것과 같이 동작
function User3(name) {
	if (!new.target) { // new 없이 호출해도
		return new User3(name); // new 붙여줌
	}
	this.name = name;
}

let bora = User3('보라'); 
console.log(bora.name);

// 생성자와 return문

// this대신 return 반환
function BigUser() {
	this.name = '원숭이';
	return {name: '고릴라'}; // this가 아닌 새로운 객체 반환
}

console.log(new BigUser().name); // 고릴라

// 아무것도 return 하지 않는 예시
function SmallUser() {
	this.name = '원숭이';
	return; // this 반환
}

console.log(new SmallUser().name); // 원숭이
console.log('');

// 생성자 내 메소드
function User4(name) {
	this.name = name;
	
	this.sayHi = function() {
		console.log('제 이름은 ' + this.name + ' 입니다.');
	};
}

let bora2 = new User4('이보라');
bora2.sayHi(); // 제 이름은 이보라 입니다
/*
bora2 = {
	name: '이보라',
	sayHi: function() {...}
}
*/

// 예제
let obj5 = {};
function A() {
	return obj5;
}
function B() {
	return obj1;
}

// let a = new A();
// let b = new B();
console.log(new A() == new B()); // true
console.log('');

// 계산기
// function Calculator() {
// 	this.sum = function() {	
// 		return this.a + this.b;
// 	}
// 	this.mul = function() {
// 		return this.a * this.b;
// 	}
// 	this.read = function() {
// 		this.a = +prompt('첫번째 값',0);
// 		this.b = +prompt('두번째 값',0);
// 	}
// }
// let calculator = new Calculator();
// calculator.read();
// console.log('Sum = ' + calculator.sum());
// console.log('Mul = ' + calculator.mul());

// 누산기

function Accmulator(startingValue) {
	this.value = startingValue;

	this.read = function() {
		this.value += +prompt('입력값', '');
	};
}

let accmulator = new Accmulator(1);
// accmulator.read();
// accmulator.read();
console.log(accmulator.value);