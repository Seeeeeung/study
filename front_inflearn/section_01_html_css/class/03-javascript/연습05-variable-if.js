const profile = {
	name : "철수",
	age : 12,
	school : "다쥐초등학교"
}
// undefined
if (profile.age >= 20) {
	console.log("성인입니다")
} else if (profile.age >= 8 && profile.age <= 19) {
	console.log("학생입니다")
} else  {
	console.log("7세 이하 어린이 입니다")
}
// VM3937:4 학생입니다
// undefined
if (profile.age >= 20) {
	console.log("성인입니다")
} else if (profile.age >= 8) { // 축소화 (20세 이상까진 위에서 설정해놔서 굳이 다시 적을 필요없음)
	console.log("학생입니다")
} else  {
	console.log("7세 이하 어린이 입니다")
}
// VM3940:4 학생입니다
// undefined
if (profile.age >= 20) {
	console.log("성인입니다")
} else if (profile.age >= 8) {
	console.log("학생입니다")
} else if (profile.age > 0) { // 조건문 체크 (0세 이하로 쓰는 경우 거르기)
	console.log("7세 이하 어린이 입니다")
} else {
	console.log("잘못 입력하셨습니다.")
}
// VM4072:4 학생입니다