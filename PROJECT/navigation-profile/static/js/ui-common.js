// layer-lock
const btnActive = document.querySelector('.btn-lock');
const layerActive = document.querySelector('.layer-lock')
btnActive.addEventListener('click', function() {
	layerActive.classList.add('active');
});

// 7월 6일 할거 className 도 만들어보기, layer-login 1. input == null error(완료) , 2. input == not friend popup, 3. input == true login -> nextpage, 4. 이름찾기-> 이름입력 -> 회원정보 미등록 / 등록 => 이름나옴 , 5. 회원가입 -> 이름 등록+사진등록
// 모달 웹접근성 고려해서 수정하기 **********

// login
let reqLabel = document.querySelectorAll('.inp-label');
const $inp = document.querySelectorAll('.ui-input');
// 인풋 박스 포커스 기능
for (let i=0; i < $inp.length; i++) {
	for(let j=0; j<reqLabel.length; j++){
		$inp[i].onfocus = function() {
			reqLabel[j].classList.add('on');
		}
		
		$inp[i].onblur = function() {
			reqLabel[j].classList.remove('on')
		}
	}
}

// 유저 데이터베이스
var userData = [
	{
		"name":"김승연",
		"id":"김승연id"
	},
	{
		"name":"김승연1",
		"id":"김승연id3"
	},
	{
		"name":"김승연2",
		"id":"김승연2"
	}
];

const $popup = document.getElementById('layer-popup');
const $wrongAccount = document.getElementById('wrong-account');
const $noAccount = document.getElementById('no-account');
const $searchUser = document.getElementById('search-name');

// 모달창 오픈
const openLayer = function() {$popup.classList.add('active');}
// 모달창 닫기(리셋)
let $btnCloseLayer = document.querySelectorAll('.layer-close')
function closeLayer() {
	$popup.classList.remove('active');
	$noAccount.classList.remove('on');
	$wrongAccount.classList.remove('on');
	$searchUser.classList.remove('on');
}
for (let i = 0; i < $btnCloseLayer.length; i++) {
	$btnCloseLayer[i].addEventListener('click', closeLayer);
}

// 1. 로그인 메인
for (let i=0; i < $inp.length; i++) {	
	let activeInput = function() {
		let $currentUserName = $inp[i].value;
		console.log($currentUserName);

		// 공백 에러 클래스 작동
		let $this = $inp[i];
		let $inpWrap = document.querySelectorAll('.inp-wrap');
		const toastTarget = document.querySelector('.ui-toast');
		function activeError() {
			// 전체 에러 클래스 제거
			for (let index=0; index<$inpWrap.length; index++) {
				$inpWrap[index].classList.remove('error');
			}
			console.log($this)
			$this.closest('.inp-wrap').classList.add('error')
			if ($this.classList.contains('login-form')) { // login form 부분일때
				toastTarget.classList.add('active');
			}
		}
		// 공백 에러 클래스 제거
		function removeError() {
			$this.closest('.inp-wrap').classList.remove('error');
			toastTarget.classList.remove('active');
		}
		
	
		
		// 로그인 인풋
		function loginFormHandler() {
			for (let j=0; j < userData.length; j++) {
				if(userData[j].id == $currentUserName) {
					console.log($this)
					console.log('로그인 성공')
				} else if (!$currentUserName) {
					activeError()
					console.log('공백')
				} else if (userData[j].id.includes($currentUserName)) {
					console.log('몇글자는 맞아요');
					removeError();
					openLayer();
					$noAccount.classList.remove('on');
					$wrongAccount.classList.add('on');
				} else {
					console.log($currentUserName)
					console.log('없는 계정');
					openLayer();
					removeError();
					$wrongAccount.classList.remove('on');
					$noAccount.classList.add('on');
				}
			}
		}
		// 닉네임 찾기
		function searchformHandler () {
			for (let j=0; j < userData.length; j++) {
				if(userData[j].name == $currentUserName) {
					removeError();
					let searchResultUl = document.querySelector('.result');
					let searchResult = document.createElement('li');
					searchResult.innerHTML = `<strong>${$currentUserName}</strong>님의 계정은 <span class="fw700 color-dark-green">${userData[j].id}</span> 입니다`
					searchResultUl.appendChild(searchResult);
				} else if (!$currentUserName) {
					activeError()
					console.log('공백')
				} else if (userData[j].name.includes($currentUserName)) {
					removeError();
					console.log('몇글자는 맞아요');
				} else {
					removeError();
					console.log('없는 계정');
				}
			}
		}

		
		if ($this.classList.contains('login-form')) {
			console.log($this)
			closeLayer();
			loginFormHandler();
			console.log('지금 실행되는건 로그인창입니다'+$this)
		} else if ($this.classList.contains('search-form')) {
			searchformHandler();
			console.log('지금 실행되는건 검색창입니다');
			console.log($this)
		}
	} // activeinput
	
	// 인풋 서브밋
	$inp[i].addEventListener('keyup',function (e) {
		if (e.keyCode === 13) activeInput();
	});
	let btnLogin = document.querySelector('.btn-login');
			btnLogin.addEventListener('click', function() {
				console.log('로그인 버튼 클릭')
				activeInput()
			})
	let btnOpenSearchLayer = document.querySelector('.btn-open-layer-search');
	btnOpenSearchLayer.addEventListener('click', function() {
		openLayer();
		$searchUser.classList.add('on');
	})
} // for



// 로그인 버튼 클릭시 다른 인풋 요소 동작 막기******************