// layer-lock
const btnActive = document.querySelector('.btn-lock');
const layerActive = document.querySelector('.layer-lock')
btnActive.addEventListener('click', function() {
	layerActive.classList.add('active');
});

// 7월 6일 할거 className 도 만들어보기, layer-login 1. input == null error(완료) , 2. input == not friend popup, 3. input == true login -> nextpage, 4. 이름찾기-> 이름입력 -> 회원정보 미등록 / 등록 => 이름나옴 , 5. 회원가입 -> 이름 등록+사진등록
// 모달 웹접근성 고려해서 수정하기 **********

// login
const $inp = document.querySelectorAll('.ui-input');
// 인풋 박스 포커스 기능
for (let i=0; i < $inp.length; i++) {
	$inp[i].onfocus = function() {
		this.closest('.inp-wrap').previousElementSibling.classList.add('on');
	}
	
	$inp[i].onblur = function() {
		this.closest('.inp-wrap').previousElementSibling.classList.remove('on')
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
let newUserData = {};

const $popup = document.getElementById('layer-popup');
const $wrongAccount = document.getElementById('wrong-account');
const $noAccount = document.getElementById('no-account');
const $searchUser = document.getElementById('search-name');
const $newUser = document.getElementById('join');

// 모달창 오픈
const openLayer = function() {$popup.classList.add('active');}


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
	// 공백 에러 클래스 제거
	function removeError() {
		$this.closest('.inp-wrap').classList.remove('error');
		toastTarget.classList.remove('active');
	}
	// 유효성 클래스 제거
	function removeValidate() {
		$this.closest('.inp-wrap').classList.remove('validate');
		$errorText.classList.remove('validate')
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
	// 회원 이름
	function joinFormNameHandler () {
		$currentUserName = $inp[i].value;
		for (let j=0; j < userData.length; j++) {
			console.log('유저이름')
			$errorText = $this.nextElementSibling;
			$errorText.innerText = '';
			
			if(userData[j].name == $currentUserName) {
				// removeError();
				removeValidate();
				$this.closest('.inp-wrap').classList.add('error')
				$errorText.classList.add('error')
				console.log($errorText);
				$errorText.innerText = '등록되어있는 계정입니다. 다른 이름을 입력해주세요'
				$this.focus();
				console.log('등록된 이름')
				console.log(userData[j].id)
				break;
			}	else if (!$currentUserName) {
				// removeError()
				removeValidate()
				
				$this.closest('.inp-wrap').classList.add('error')
				$errorText.classList.add('error')
				$errorText.innerText = '이름을 입력해주세요'
				$this.focus();
				console.log('공백')
			} else {
				removeError();
				$errorText.classList.remove('error');
				
				$this.closest('.inp-wrap').classList.add('validate');
				$errorText.classList.add('validate');
				
				$errorText.innerText = '사용가능한 이름입니다'
			}
			// console.log($this)
		
		} // for
	} // function

	// 회원 닉네임
	function joinFormNickNameHandler () {
		$currentUserName = $inp[i].value;
		for (let j=0; j < userData.length; j++) {
			console.log('유저닉네임')
			$errorText = $this.nextElementSibling;
			$errorText.innerText = '';
			
			if(userData[j].id == $currentUserName) {
				// removeError();
				removeValidate();
				$this.closest('.inp-wrap').classList.add('error')
				$errorText.classList.add('error')
				console.log($errorText);
				$errorText.innerText = '등록되어있는 닉네임입니다. 다른 닉네임을 입력해주세요'
				$this.focus();
				console.log('등록된 닉네임')
				console.log(userData[j].id)
				break;
			}	else if (!$currentUserName) {
				// removeError()
				removeValidate()
				
				$this.closest('.inp-wrap').classList.add('error')
				$errorText.classList.add('error')
				$errorText.innerText = '닉네임을 입력해주세요'
				$this.focus();
				console.log('공백')
			} else {
				removeError();
				$errorText.classList.remove('error');

				$this.closest('.inp-wrap').classList.add('validate');
				$errorText.classList.add('validate');
				$errorText.innerText = '사용가능한 닉네임입니다'
			}
			// console.log(newUserData)
		
		
		} // for
	} // function


	
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
			// closeLayer()
			searchFormHandler();
		})
	} else if ($this.classList.contains('new-user')) { // 현재 인풋이 회원가입 폼일때
		$inp[i].addEventListener('keyup',function (e) {
			if (e.keyCode === 13) {
				// console.log($this)
				if ($this.classList.contains('user-name')) {
					joinFormNameHandler();
				} else if ($this.classList.contains('user-nick-name')) {
					joinFormNickNameHandler()
				}
			}
		});

	}
	let btnPush = document.querySelector('.btn-push');
	btnPush.addEventListener('click', function(){
		if ($this.classList.contains('user-name')) {
			joinFormNameHandler();
		} else if ($this.classList.contains('user-nick-name')) {
			joinFormNickNameHandler();
			validatePush()
		}

		function validatePush() {
			if ($this.closest('.inp-wrap').classList.contains('validate')) {
				
				console.log($this)
				let userName = document.querySelector('.user-name').value;
				let userId = document.querySelector('.user-nick-name').value;
				userData.push({"name":userName, "id":userId});
				console.log(userData)
				closeLayer()
			}
		}
	})

	// join popup
	// 버튼 클릭시 팝업 화면 나오기
	let btnOpenJoinLayer = document.querySelector('.btn-join');
	btnOpenJoinLayer.addEventListener('click', function() {
		console.log('회원가입 창이 열였습니다')
		openLayer();
		$newUser.classList.add('on');
	})
	// openLayer();
	// $newUser.classList.add('on');
} // for

// 모달창 닫기(리셋)
let $btnCloseLayer = document.querySelectorAll('.layer-close')
function closeLayer() {
	$popup.classList.remove('active');
	$noAccount.classList.remove('on');
	$wrongAccount.classList.remove('on');
	$searchUser.classList.remove('on');
	$newUser.classList.remove('on');
}
for (let i = 0; i < $btnCloseLayer.length; i++) {
	$btnCloseLayer[i].addEventListener('click', closeLayer);
	$btnCloseLayer[i].addEventListener('click', function() {
		let reset = document.querySelectorAll('.ui-input');
		for (j=0; j<reset.length; j++) {
			reset[j].value =null;
		}
	});
}