let classmates = ["철수", "영희", '훈이'];

classmates
// (3) ['철수', '영희', '훈이']
classmates[0]
// '철수'
classmates[1]
// '영희'
classmates[2]
// '훈이'
classmates.includes("훈이")
// true
classmates.includes("맹구")
// false
classmates.length
// 3
classmates.push("맹구")
// 4
classmates.pop()
// '맹구'
classmates.length
// 3
classmates
// (3) ['철수', '영희', '훈이']


﻿
let developer
undefined
developer = ["재능", "지능", "풀이능력", "의지", "사회성"]
(5) ['재능', '지능', '풀이능력', '의지', '사회성']
developer[1]
'지능'
let dream = ["커리어점프", "성공", "할수있다"]
undefined
developer.push(dream);
6
developer
// (6) ['재능', '지능', '풀이능력', '의지', '사회성', Array(3)]
// 0
// : 
// "재능"
// 1
// : 
// "지능"
// 2
// : 
// "풀이능력"
// 3
// : 
// "의지"
// 4
// : 
// "사회성"
// 5
// : 
// (3) ['커리어점프', '성공', '할수있다']
// length
// : 
// 6
// [[Prototype]]
// : 
// Array(0)
developer.concat(dream)
// (9) ['재능', '지능', '풀이능력', '의지', '사회성', Array(3), '커리어점프', '성공', '할수있다']
developer.pop
// ƒ pop() { [native code] }
developer.pop()
// (3) ['커리어점프', '성공', '할수있다']
developer.pop()
// '사회성'
developer
// (4) ['재능', '지능', '풀이능력', '의지']
developer.push("사회성")
// 5
developer.concat(dream)
// (8) ['재능', '지능', '풀이능력', '의지', '사회성', '커리어점프', '성공', '할수있다']
let result = developer.concat(dream)
// undefined
result
// (8) ['재능', '지능', '풀이능력', '의지', '사회성', '커리어점프', '성공', '할수있다']

