console.log(' ** 모던자바스크립트 객체_심볼 ** ');
let id1 = Symbol('id');
let id2 = Symbol('id');
console.log(id1 == id2); // false

console.log(id1);
// alert(id1); 오류 반환 -> 형 변환이 안되기 때문
// alert(id1.toString()); // Symbol(id) 출력
// alert(id1.description); // id 출력

let user111 = { // 서브파티 코드에서 가져온 객체
	name: 'John'
};

let id = Symbol('id');
user111[id] = 1;
// alert(user111[id]); //  심볼키로 데이터 접근 가능

let user1112 = {name: 'John'};
// 우리와 제3의 스크립트가 문자열을 이용해 식별자를 만들었다면 id식별자는 무의미해짐
user1112.id = '스크립트 id 값';
user1112.id = '제 3 스크립트 id 값';

// literal
let user1113 = {
	name: 'John',
	age: 30,
	[id]: 123 // 'id': 123 은 사용 불가능
}
console.log(user1113[id]);

for (let key in user1113) console.log(key); // name, age만 출력, 심볼 출력 X
// 심볼로 직접 접근하면 잘 작동함
console.log('직접 접근한 값: ' + user1113[id]);

// Object.assign 작동
let id3 = Symbol('id');
let user1114 = {
	[id]: 123
}
let clone333 = Object.assign({}, user1114);
console.log(clone333[id]); // 123
console.log(clone333);  // { Symbol(id): 123 }

// 전역심볼레지스트리
let id4 = Symbol.for('id'); // 심볼이 존재하지 않으면 새로운 심볼 생성
let idAgain = Symbol.for('id'); // 동일한 잉름을 이용해 심볼을 다시 읽음 (멀리 떨어진 코드에서도 가능)

console.log(id4 === idAgain); // true

// 심볼 이름 얻기
// 이름을 이요해 심볼찾기
let sym = Symbol.for('name');
let sym2 = Symbol.for('id');
console.log(sym,sym2);

// 심볼을 이용해 이름 찾기
console.log(Symbol.keyFor(sym), Symbol.keyFor(sym2));
console.log('');

// 전역심볼 + 일반심볼
let globalSymbol = Symbol.for('name');
let localSymbol = Symbol('name');

console.log(Symbol.keyFor(globalSymbol)); // name, 전역심볼
console.log(Symbol.keyFor(localSymbol)); // undefined , 전역심볼 X
console.log(localSymbol.description); // name

// toPrimitive 예시
let user1115 = {
	name: 'John',
	money: 1000,

	[Symbol.toPrimitive](hint) {
		alert(`hint: ${hint}`);
		return hint == 'string' ? `{name: '${this.name}'}` : this.money;
	}
};
// alert(user1115);
// alert(+user1115);
// alert(user1115 + 500);

let user1116 = {name: 'John'};
// alert(user1116); // [object Object]
// alert(user1116.valueOf() === user1116); // true

let user1117 = {
	name: 'John',
	money: 1000,

	// hint = 'string'
	toString() {
		// return `{name: '${this.name}'}`;
		return this.name;
	},

	// hint = 'number' , 'default'
	// valueOf() {
	// 	return this.money;
	// }
};

// alert(user1117);
// alert(+user1117);
// alert(user1117 + 500);

// 객체가 피연산자일때
let obj333 = {
	// 다른 메서드가 없으면 toString에서 모든형 변환 처리
	toString() {
		return '2';
	}
};
// alert(obj333 * 2) // 객체가 문자열 2 로 바뀌고, 곱센 연산 과정에서 문자열은 숫자로 변경됨
// alert(obj333 + 2); // 이항 덧셈은 문자열을 연결함 -> '2'2 반환