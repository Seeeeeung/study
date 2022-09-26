console.log(' ** 모던자바스크립트 객체_메소드 ** ');
let user18 = {
	name: 'John',
	age: 30
};

user18.sayHi = function() {
	console.log('안녕하세요');
};
user18.sayHi();

// 이미 정의된 함수를 이용하여 할당
function sayHi2() {
	console.log('안녕하세요2');
};
// 선언된 함수 메서드로 등록
user18.sayHi2 = sayHi2;
user18.sayHi2();

// 메서드 단축
// 아래 두 객체는 동일하게 동작, function을 생략
// 내부 script일때는 let을 안넣어도 동작했는데 js소스로 빼니까 상수에 값을 넣을수 없다는 error 발생
let user25 = {
	sayHi3: function() {
		console.log('메서드/ 안녕하세요');
	}
};
user25.sayHi3();

let user24 = {
	sayHi3() {
		console.log('메서드 단축/ 안녕하세요');
	}
}
user24.sayHi3();

// 메서드와 this

let user19 = {
	name: 'John',
	age: 30,

	sayHi() {
		console.log(this.name); // this를 user3으로 바꿔도 동일한 작동
	}
}
user19.sayHi(); // John
console.log('');

// 외부변수 참조시 에러발생경우
let user20 = {
	name: 'John',
	age: 30,

	sayHi() {
		// console.log(user20.name); // 에러발생 (admin.sayHi()가 user객체를 읽어들임)
		console.log(this.name); // this를 사용하면 에러가 발생하지 않는다 
	}
};

// 객체 복사 할당
let admin = user20;
// admin.age = 20
user20 = null;
// console.log(user20 === admin)
// console.log(user20)
// console.log(admin)
admin.sayHi(); // John

// 자유로운 this
function sayHi4() {
	console.log(this.name); // ' '
	console.log(this); // window {}
	// 엄격모드에서 this만 호출하면 undefined 가 할당된다. 엄격모드가 아닐때는 window가 참조됨
}
sayHi4(); // ' ' 객체를 할당하지 않았기때문에 빈공간이 반환되지만 에러는 발생하지 않는다

let user21 = {name: 'John'};
let admin1 = {name: 'Admin'};

function sayHi5() {
	console.log(this.name);
}

// 별개의 객체에 동일한 함수 할당
user21.f = sayHi5;
admin1.f = sayHi5;

// 호출
user21.f();
admin1.f();
admin1['f'](); // . 과 [] 는 같은 동작을 수행한다.
console.log('');

// this가 없는 화살표 함수
let user22 = {
	firstName: '보라',
	sayHi6() {
		let arrow = () => console.log(this.firstName);
		arrow(); // 보라
		// console.log(this); // user22 = {...}
		// console.log('');

		// console.log(arrow()); // 보라, undefined
	}
};

user22.sayHi6(); // 보라
console.log('');

// 예제
function makeUser() {
	return {
		name: 'John',
		ref: this // 메서드로 호출되지 않고 함수(makeUser())로 호출되기때문에 makeUser()의 상위스코프인 window를 참조
	};
	// return this;
};
let user23 = makeUser();
console.log(user23.ref.name)
console.log(user23.ref)
console.log(makeUser())
// console.log(makeUser().name);

// undefiend가 발생하지 않게 수정
function makeUser2() {
	return {
		name: 'John',
		ref() {
			return this;
		}
	};
}
user23 = makeUser2();
console.log(user23.ref().name);
console.log(user23.ref());
console.log('');

let calculator = {
	sum() {
		return this.a + this.b;
	},
	mul() {
		return this.a * this.b;
	},
	read() {
		this.a = +prompt('첫번째 값', '0');
		this.b = +prompt('두번째 값', '0');
	}
}
// calculator.read();
// console.log(calculator.sum());
// console.log(calculator.mul());

let ladder = {
	step: 0,
	up() {
		this.step++;
		return this;
	},
	down() {
		this.step--;
		return this;
	},
	showStep: function() {
		console.log(this.step);
		return this;
	}
};
ladder.up().up().down().showStep();