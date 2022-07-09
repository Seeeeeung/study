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
		"id":"김승연id2"
	}
];
userData.push({"name":"푸쉬"});
console.log(userData)

const $popup = document.getElementById('layer-popup');
const $wrongAccount = document.getElementById('wrong-account');
const $noAccount = document.getElementById('no-account');
const $searchUser = document.getElementById('search-name');
const $newUser = document.getElementById('join');

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


for (let i=0; i < $inp.length; i++) {	
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
	// 회원가입 에러 기능
	function joinError() {
		$this.closest('.inp-wrap').classList.add('error')
	}
	function hadName() {
		$this.closest('.inp-wrap').classList.add('had-user');
	}
	// 공백 에러 클래스 제거
	function removeError() {
		$this.closest('.inp-wrap').classList.remove('error');
		$this.closest('.inp-wrap').classList.remove('had-user');
		toastTarget.classList.remove('active');
	}
	
	// 로그인 인풋
	function loginFormHandler() {
		$currentUserName = $inp[i].value;
		for (let j=0; j < userData.length; j++) {
			if(userData[j].id == $currentUserName) {
				console.log($this)
				console.log('로그인 성공')
				closeLayer()
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
	function searchFormHandler () {
		$currentUserName = $inp[i].value;
		for (let j=0; j < userData.length; j++) {
			let searchResultUl = document.querySelector('.result');
			let searchResult = document.createElement('p');

			if(userData[j].name == $currentUserName) {
				removeError();
				console.log('등록된 계정')
				searchResultUl.innerHTML = '';
				searchResultUl.appendChild(searchResult);
				searchResult.innerHTML = `<strong>${$currentUserName}</strong>님의 계정은 <span class="fw700 color-dark-green">${userData[j].id}</span> 입니다`
				break;
			} else if (!$currentUserName) {
				activeError()
				console.log('공백')
				searchResultUl.innerHTML = '';
			} else {
				removeError();
				console.log('없는 계정');
				searchResultUl.innerHTML = '';
				searchResultUl.appendChild(searchResult);
				searchResult.innerHTML = `<span class="fw700 color-dark-green">등록되지 않은 이름입니다.</span>`
			}
		}
	}
	// 회원가입
	function joinFormHandler () {
		$currentUserName = $inp[i].value;
		for (let j=0; j < userData.length; j++) {

			if(userData[j].id == $currentUserName || userData[j].name == $currentUserName) {
				removeError();
				hadName();
				console.log('등록된 이름')
				break;
			}	else if (!$currentUserName) {
				removeError()
				joinError()
				console.log('공백')
			} else {
				removeError();
				console.log('푸쉬'); // 따로 푸쉬됨
				// 따로 푸쉬되는거 처리하기 ****************************
				if ($this.classList.contains('user-name')) {
					userData.push({"name":$currentUserName})
					console.log(userData);
					break;
				} else if($this.classList.contains('user-nick-name')) {
					userData.push({"id":$currentUserName})
					console.log(userData);
					// console.log('유저 닉네임 푸쉬')
				}
			}
		}
	}

	
	// 화면 구분
	if ($this.classList.contains('login-form')) { // 현재 인풋이 로그인 폼일때
		// 엔터 기능
		$inp[i].addEventListener('keyup',function (e) {
			if (e.keyCode === 13) {
				console.log($this)
				loginFormHandler();
			}
		});
		
		// 로그인 버튼 클릭
		let btnLogin = document.querySelector('.btn-login');
		btnLogin.addEventListener('click', function() {
			loginFormHandler();
		});
	} else if ($this.classList.contains('search-form')) { // 현재 인풋이 닉네임 찾기 폼일때
		let btnOpenSearchLayer = document.querySelector('.btn-open-layer-search');
		btnOpenSearchLayer.addEventListener('click', function() {
			openLayer();
			console.log('지금 실행되는건 검색창입니다');
			$searchUser.classList.add('on');
		});
		
		$inp[i].addEventListener('keyup',function (e) {
			if (e.keyCode === 13) {
				searchFormHandler();
				console.log($this)
			}
		});
		
		let btnSearch = document.querySelector('.btn-search');
		btnSearch.addEventListener('click', function() {
			searchFormHandler();
		})
	} else if ($this.classList.contains('new-user')) {
		// 회원가입
		$inp[i].addEventListener('keyup',function (e) {
			if (e.keyCode === 13) {
				console.log($this)
				joinFormHandler()
				console.log($this)
			}
		});
	}

	// join popup
	// 버튼 클릭시 팝업 화면 나오기
	let btnOpenJoinLayer = document.querySelector('.btn-join');
	btnOpenJoinLayer.addEventListener('click', function() {
		console.log('회원가입 창이 열였습니다')
		openLayer();
		$newUser.classList.add('on');
	})
	openLayer();
	$newUser.classList.add('on');

} // for