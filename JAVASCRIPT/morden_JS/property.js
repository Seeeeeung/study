console.log(' ** 모던자바스크립트 객체_프로퍼티 ** ');
let user = {
	name: 'John',
	age: 30,
	'likes birds': true, // 복수의 단어는 따옴표로 묶어야 한다, 마지막 프로퍼티 끝은 쉼표로 끝날 수 있다 -> 이런 쉼표를 trailing, hanging 쉼표라 부름
};
console.log(user.name);
console.log(user.age);

user.isAdmin = true; // 불린형 프로퍼티 추가
delete user.age; // 프로퍼티 삭제

// 확인용 console.log
console.log(user);

const user2 = {
	name: 'John'
};
user2.name = 'Pete';
// 상수 객체의 프로퍼티는 수정될 수 있다, 상수 객체는 수정할 수 없다
// user2 = { age: 30 }; -> Error
console.log(user2.name)

// 대괄호 표기법
let user3 = {};
user3['likes birds'] = true;
console.log(user3['likes birds']);
delete user3['likes birds'];
console.log(user3);

let key = 'likes birds';
user3[key] = true;
console.log(user3);

let user4 = {
	name: 'John',
	age: 30
};
// 사용자 입력값 변경 등에 따라 값이 변경될 수 있다/ 점 표기법은 이 방식을 사용할 수 없다
// let key2 = prompt('사용자의 어떤 정보를 얻고싶으신가요', 'name');

// console.log(user4[key2]);

let key3 = 'name';
console.log(user4.key);
console.log('');
/*
let fruit = prompt('어떤 과일을 구매하시겠습니까', 'apple');

let bag = {
	[fruit]: 5, // 변수 fruit에서 프로퍼티 이름을 동적으로 받아옴
}

console.log(bag.apple); // fruit에 'apple'이 할당되어 있다면 5가 출력
console.log(bag);
*/
// [fruit] 는 프로퍼티 이름을 변수 fruit에서 가져오겠다는 것을 의미
/* 아래 예시는 위와 동일하게 동작
let bag = {};
bag[fruit] = 5;
console.log(bag.apple) */

let fruit2 = 'apple';
let bag2 = {
	[fruit2 + 'Computers']: 5
};
console.log(bag2.appleComputers); // 5
console.log(bag2)
console.log('');

// 단축 프로퍼티

function makeUser(name, age) {
	// return {
	// 	name: name,
	// 	age: age,
	// };
	// 위 return문을 프로퍼티 값 단축 구문을 사용하여 코드를 짧게 줄일 수 있다 (name: name 대신 name만 적어도 설정가능)
	return {
		name,
		age,
	}
}

// let user5 = makeUser('John', 30);
// console.log(user5.name);
// 한 객체에서 일반 프로퍼티와 단축 프로퍼티를 함께 사용하는것도 가능
let user5 = {
	name, 
	age: 30
};
user5.name = 'John'
console.log(user5);
console.log('');

// 이름 제약사항
let obj = {
	0: 'test',
};
console.log(obj['0']);
console.log(obj[0]); // 위 결과값과 동일

let obj2 = {};
obj2.__proto__ = 5;
console.log(obj2.__proto__); // 할당된 값은 무시하고 객체가 반환된다.
console.log('');

// undefined 와 비교해서 존재여부 확인
let user6 = {};
console.log(user6.noSuchProperty === undefined); // true -> 프로퍼티가 존재하지 않음을 의미

// in 연산자 사용
let user7 = { name: 'John', age: 30};
console.log('age' in user7); // true 존재함
console.log('blabla' in user7); // false 존재하지 않음
// 따옴표 생략시 엉뚱한 변수가 조사 대상이 된다
// let key4 = 'age';
// console.log(key4 in user7); // true, ???????

let obj3 = {
	test: undefined
};
console.log(obj3.test) // undefined가 출력되지만 프로퍼티 test는 존재함
console.log('test' in obj3); // 프로퍼티 유무 확인 가능
console.log('');

// for in 반복문
let user8 = {
	name: 'John',
	age: 30,
	isAdmin: true,
};

for (let key in user8) {
	// 키
	console.log('user8의 key : ' + key);
	// 키에 해당하는 값
	console.log('user8의 key의 value : ' + user8[key]);
}

// 객체 정렬방식
// 숫자 앞에 +, 반환하려는 코드 변수앞에+를 추가하면 정수로 취급되지 않게됨(속임수)
let codes = {
	'+49': '독일',
	'+41': '스위스',
	'+44': '영국',
	'+1': '미국',
};

for (let code in codes) {
	console.log(+code);
}

// 예제
let user9 = {};

// 프로퍼티 추가방법 2가지
user9.name = 'John';
console.log(user9)

let key2 = 'surname'
user9['surname'] = 'Smith';
console.log(user9);

// 둘중 하나 사용 (변수값변경) user9.name = 'Pete';
user9['name'] = 'Pete'
console.log(user9);

delete user9.name;
console.log(user9);

// mocha_test 체크 가능 -> 빈 객체일때 true를 반환하느 코드
let obj1 = {};
console.log(isEmpty(obj1)); // true

obj1['property1'] = '1'
console.log(isEmpty(obj1)); // false

function isEmpty(obj1) {
	for (let key in obj1) {
		return false;
	}
	return true;
}

// 프로퍼티 값 모두 더하기
let salaries = {
	John: 100,
	Ann: 160,
	Pete:130
}
let sum3 = 0;
for (let value in salaries) {
	sum3 += salaries[value];
}
console.log(sum3)

// 값 두배
let menu = {
	width: 200,
	height: 300,
	title: 'My menu'
};

multiplyNumeric(menu)
console.log(menu)

function multiplyNumeric(menu) {
	for (let value in menu) {
		if (typeof(menu[value]) == 'number') {
			menu[value] *= 2
		}
		
	}
}

let prim = null;
let obj4 = {say: 'hello'};
let copy = prim;
copy = false;
let copyObj = obj4;
copyObj.say = 'not hello';
console.log(prim);
console.log(obj4);

// 객체를 복제(복사X)
let user10 = {
	name: 'John',
	age: 30
};

let clone = {}; // 새로운 빈 객체
for (let key in user10) {
	clone[key] = user10[key];
}
// 독립적인 복제본이 된 clone
clone.name = 'Pete';
console.log(user10.name);
console.log(clone.name);

console.log(user10 == clone); // false
console.log('');

let user11 = {name: 'John'};

let permissions1 = {canView: true};
let permissions2 = {canEdit: true};

Object.assign(user11, permissions1, permissions2);
console.log(user11)

// assign 사용
let user12 = {name: 'John'};
Object.assign(user12, {name: 'Pete'});
console.log(user12.name);

// 반복문 없이 객체 복사
let user13 = {
	name: 'John',
	age: 30
};
let clone2 = Object.assign({}, user13);
console.log(clone2);

// 중첩 객체 복사
let user14 = {
	name: 'John',
	sizes: {
		height: 182,
		width: 50
	}
};
console.log(user14.sizes.height)

let clone3 = Object.assign({}, user14);
clone3.sizes = user14.sizes;
console.log(clone3);
console.log( clone3.sizes === user14.sizes)

user14.sizes.width++;
console.log(clone3.sizes.width);
// sizes는 user객체에서 참조 (복제가 안되고 복사만 했음 -> 깊은복사를 해야 단독적인 객체가 될 수 있다.)

// 가비지 컬렉션 https://ko.javascript.info/garbage-collection
/*
mother = {
	woman: { // family 함수에서 대입 -> name: 'Ann'
		name: 'Ann',
		husband: man
	}
}
father = {
	man: {
		name: 'John',
		wife: woman
	}
}
*/
// 위 식을 함수로 만들어 풀면
function marry(man, woman) {
	woman.husband = man;
	man.wife = woman;
	/* 위 식을 대입 (서로 참조하게 만들었음)
	{name: 'Ann'}.husband = {name: 'John'};
	{name: 'John'}.wife = {name: 'Ann'};
	*/

	return { // 대입된 매개변수에 역할(결혼시켜서 father, mother을 부여)을 부여하기 위해 return문으로 반환해준다 -> 서로를 참조하는 (wife, husband) 새로운 객체가 만들어짐
		father: man,
		mother: woman
		/*
		father: {name: 'John'},
		mother: {name: 'Ann'}
		*/
	}
}

let family = marry({name: 'John'}, {name: 'Ann'}); // man, woman으로 된 매개변수에 대입한다

delete family.father;
delete family.mother.husband;
// name: 'John' 객체를 참조하고있는(참조당하는) 모든 화살표가 사라졌기때문에 휴지통으로 삭제된다 ** 객체에서 외부로 나가는 참조는 도달 가능한 상태에 영향을 주지 않는다 , (외부로 들어오는 참조만 (참조당할때만) 도달 가능한 상태에 영향을 준다.)

// 코드가 길어져 action_test_method.html로 분리