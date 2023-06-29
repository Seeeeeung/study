// function verity() {
// 	let number = String(Math.floor(Math.random() * 1000000)).padStart(6,"0");
// 	document.getElementById('number').innerText = number;
// }

// const verity = () => {
// 	let number = String(Math.floor(Math.random() * 1000000)).padStart(6,"0");
// 	document.getElementById('number').innerText = number;
// }

// 예제 2


// function auth() {
// 	const token = String(Math.floor(Math.random() * 1000000)).padStart(6, "0");
// 	document.getElementById('target').innerText = token;
// }

let auth = () => {
	const token = String(Math.floor(Math.random() * 1000000)).padStart(6, "0");
	document.getElementById('target').innerText = token;
	document.getElementById('target').style.color = `#${token}`;
}