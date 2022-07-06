// layer-lock
const btnActive = document.querySelector('.btn-login');
const layerActive = document.querySelector('.layer-lock')
btnActive.addEventListener('click', function() {
	layerActive.classList.add('active');
});

// 7월 6일 할거 className 도 만들어보기, layer-login 1. input == null error , 2. input == not friend popup, 3. input == true login -> nextpage, 4. 이름찾기-> 이름입력 -> 회원정보 미등록 / 등록 => 이름나옴 , 5. 회원가입 -> 이름 등록+사진등록

// inp-wrap
// 1. 닉네임 입력 인풋 == null => 에러css + 에러 토스트

// 유저 닉네임관련
const currentUser = document.getElementById('user-name');
const UserName = currentUser.value;
const btnLogin = document.getElementById('login');


// 에러 표시 객체
let wrapError = document.querySelectorAll('.inp-wrap');
const toastTarget = document.querySelector('.ui-toast');

function activeError() {
	for (let i = 0; i < wrapError.length; i++) {
		wrapError[i].classList.add('error');
	}
	toastTarget.classList.add('active');
}

function nullHandler (e) {
	if (e.keyCode === 13) {
		if(UserName == "") {
			activeError();
		}
	}
}

currentUser.addEventListener('keyup',nullHandler)
btnLogin.addEventListener('click',activeError)


// 포커스
let reqLabel = document.querySelectorAll('.inp-label');

// function focusHandler(e) {
// 	if (e.keyCode)
// }

const clickFocus = function() {
	for (i=0; i < reqLabel.length; i++) {
		reqLabel[i].classList.add('on');
		reqLabel[i].blur().classList.remove('on');
	}
	// 7일에 할거 함수 제거 이벤트 작동 수정하기(작동안함)
}

currentUser.addEventListener('click',clickFocus);
currentUser.removeEventListener('click', clickFocus);
// currentUser.onblur = function() {
// 	// alert('dd');
// }

function deletError() {
	currentUser.removeEventListener('keyup',nullHandler)
	btnLogin.removeEventListener('click',activeError)
}