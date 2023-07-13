const todoInput = document.querySelector('#todoInput');
const todoList = document.querySelector('#todoList');

const savedTodoList = JSON.parse(localStorage.getItem('saved-items'));

// createTodo 호출을 선언문 위에하면 표현식이기때문에 오류반환 맨 밑으로 내려놓으면 작동함.

const createTodo = function (storageData) {
	let todoContents = todoInput.value;
	if (storageData) {
		todoContents = storageData.contents;
	}

	const newLi = document.createElement('li');
	const newSpan = document.createElement('span');
	const newBtn = document.createElement('button');

	newBtn.addEventListener('click', () => {
		newLi.classList.toggle('complete');
		saveItemsFn();
	});

	newLi.addEventListener('dblclick', () => {
		newLi.remove();
		saveItemsFn();
	})

	// complete 데이터 할당
	console.log(storageData)
	if (storageData?.complete) { // 옵셔널 체이닝을 풀어 쓰면 아래와 같아짐 (storageData 가 존재하고, complete 가 true 일때.)
		// if (storageData && storageData.complete) {
		newLi.classList.add('complete');
	}
	
	newSpan.textContent = todoContents;
	// newSpan.textContent = todoInput.value;
	newLi.appendChild(newBtn);
	newLi.appendChild(newSpan);
	todoList.appendChild(newLi);
	todoInput.value = '';
	saveItemsFn();
	// console.log(newLi)
}

const keyCodeCheck = function() {
	// console.log(window.event);
	if (window.event.keyCode === 13 && todoInput.value !== '') {
		createTodo();
	}
}


const deleteAll = function() {
	const liList = document.querySelectorAll('li');
	for (let i=0; i<liList.length; i++) {
		liList[i].remove();
	}
	saveItemsFn();
}

const saveItemsFn = function () {
	const saveItems = [];

	for (let i=0; i<todoList.children.length; i++) {
		// const todo = todoList.children[i].querySelector('span').textContent;
		const todoObj = {
			contents: todoList.children[i].querySelector('span').textContent,
			complete: todoList.children[i].classList.contains('complete')
		}
		saveItems.push(todoObj);
		// console.log(saveItems)
	}

	// 모든 리스트를 지웠을때 빈배열만 남는데 그 빈배열조차 있을 필요가 없기때문에 빈배열을 없애는 조건문을 작성해야함
	if (saveItems.length === 0) { 
		localStorage.removeItem('saved-items');
	} else {
		// console.log(JSON.stringify(saveItems))
		localStorage.setItem('saved-items', JSON.stringify(saveItems))
	}

}

if (savedTodoList) {
	for (let i=0; i<savedTodoList.length; i++) {
		createTodo(savedTodoList[i]);
	}
}

// 위치 반영 날씨
const weatherSearch = function(position) {
	// const openWeatherRes = 
	fetch( // one call 말고  weather 로 사용
		`https://api.openweathermap.org/data/2.5/weather?lat=${position.latitude}&lon=${position.longitude}&exclude={part}&appid=a541a22ceb7461514acf60015872654b`
		).then((res) => {
		// console.log(res.json())
		// JSON.parse 는 Response.body만 있을때 사용 가능하다. Res.header 가 있으면 사용이 불가능하기 때문에 .json 을 사용해야함
		return res.json()
	}).then((json) => {
		console.log(json.name, json.weather[0].description)
	}).catch((err) => { // 에러 발생시 에러 이유 확인 가능
		console.error(err)
	})
	
	// a541a22ceb7461514acf60015872654b
}

// 1
const accessToGeo = function (position) {
	const positionObj = {
		latitude: position.coords.latitude,
		longitude: position.coords.longitude,
	}
	console.log(positionObj)

	weatherSearch(positionObj)
}

// 2
// ((position) => { // 콜백함수 (:익명함수)
// 	console.log(position)
// })

// 1 === 2

const askForLocation = function () {
	// 4
	navigator.geolocation.getCurrentPosition(accessToGeo, (err) => {
		console.log(err)
	}) // 첫번째 매개변수는 위치 정보 허용 / 두번째 매개변수는 차단

	// 3
	// navigator.geolocation.getCurrentPosition((position) => { // 콜백함수 (:익명함수)
	// 	console.log(position)
	// })

	// 3 === 4
}
askForLocation();


// const promiseTest = function () {
// 	return new Promise((resolver, reject) => {
// 		setTimeout(() => {
// 			resolver(100);
// 			// reject('error')
// 		}, 2000)
// 	});
// }
// // promiseTest();
// console.log(promiseTest());

// promiseTest().then((res) => {
// 	console.log(res);
// })