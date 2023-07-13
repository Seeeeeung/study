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