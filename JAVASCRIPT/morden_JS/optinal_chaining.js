console.log(` 
			********
 모던자바스크립트 객체_체이닝
 			********
			 `);
// 옵셔널 체이닝
// let user29 ={}; // 주소 정보가 없는 사용자
// console.log(user29.address.street); // Error: street을 읽을 수 없다 	

// let html = document.querySelector('.my-element').innerHTML; // null

let user29 = {}; // 주소 정보가 없는 사용자
console.log(user29 && user29.address && user29.address.street); // undefined 에러발생안함

let user292 = {};
console.log(user29?.address?.street); // undefined

let user293 = null;
console.log(user293?.address); // undefined
console.log(user293?.address.street) // undefined
// user29가 null 이나 undefined가 아니고 값이 존재하는 경우 반드시 user29.address프로퍼티가 있어야한다.
console.log('');

// 단락평가 (왼쪽 평가대상에 값이 없으면 즉시 평가를 멈춤)
let user296 = null;
let x = 0;
user296?.sayHi(x++); // 아무일도 일어나지 않는다
console.log(x); // 0 , x는 증가하지 않는다.

let user294 = {
	admin() {
		console.log('관리자 계정입니다');
	}
}
let user295 = {};

user294.admin?.(); // 관리자 계정입니다.
user295.admin?.();

let user297 = {
	firstName: 'Violet'
};

let user298 = null; // user298은 권한이 없는 사용자라고 가정
let key10 = 'firstName';

console.log(user297?.[key10]); // Violet
console.log(user298?.[key10]); // undefined
console.log(user297?.[key10]?.somthing?.not?.existing); // undefined

// delete와 조합해서 사용가능
delete user297?.firstName;
console.log(user297);

// 쓰기엔 사용 불가능
// user297?.name = 'Violet'; // SyntaxError : undefined = 'violet'은 성립하지 않는다
