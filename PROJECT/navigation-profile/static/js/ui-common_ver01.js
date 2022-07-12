// layer-lock
const btnActive = document.querySelector('.btn-login');
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
} // 작동안함 에러있음

const btnLogin = document.getElementById('login');
let inp = document.querySelectorAll('.inp-wrap');
const currentUser = document.getElementById('user-name');
const toastTarget = document.querySelector('.ui-toast');


// 유저 데이터베이스
var userData = [
	{
		"name":"김승연",
		"id":"김승연id"
	},
	{
		"name":"김승연",
		"id":"김승연id3"
	},
	{
		"name":"김승연2",
		"id":"김승연2"
	}
];
function loginHandler() {

	const $popup = document.getElementById('layer-popup');
	const $wrongAccount = document.getElementById('wrong-account');
	const $noAccount = document.getElementById('no-account');
	// 모달창 오픈
	function openLayer() {
		$popup.classList.add('active');
		$noAccount.focus();
	}
	// 공백 에러
	function activeError() {
		for (let i = 0; i < inp.length; i++) {
			inp[i].classList.add('error');
		}
		toastTarget.classList.add('active');
	}
	// 공백에러제거
	function deletError() {
		for (let i = 0; i < inp.length; i++) {
			inp[i].classList.remove('error');
		}
		toastTarget.classList.remove('active');
	}

// 인풋 값 체크
	for (let i=0; i < userData.length; i++) {
		let	$UserName = currentUser.value;
		if (userData[i].id == $UserName) {
			alert('로그인 성공')
		} else if (!$UserName) {
			activeError();
		} else if (userData[i].id.includes($UserName)) {
			console.log('몇글자는 맞아요');
			deletError();
			openLayer();
			$noAccount.classList.remove('on');
			$wrongAccount.classList.add('on');
		} else  {
			deletError()
			openLayer();
			console.log('없는 계정')
			$wrongAccount.classList.remove('on');
			$noAccount.classList.add('on');
		}
	} 	

	// 닉네임 찾기


}
// 인풋 박스 값 전송+ 로그인 버튼 클릭
currentUser.addEventListener('keyup',function (e) {
	if (e.keyCode === 13) {
		// loginHandler();
		loginHandler();
	}
})
btnLogin.addEventListener('click',loginHandler)




	
	
	// 인풋 에러(로그인 메인+로그인버튼 클릭+토스트 , 이름 찾기팝업+검색버튼,  회원가입 인풋+확인버튼)
	let $inpWrap = document.querySelectorAll('.inp-wrap');
	
	// 공백 에러 클래스 작동
	
	// function activeError() {
		
	// 	let $this = $inp[i];
	// 	if (!$currentUserLogin)
	// 	$this.closest('.inp-wrap').classList.add('error')
	// 	}
	// }

// 	function $thisActiveError() {
			
// 			console.log(this)
// 				this.closest('.inp-wrap').classList.add('error');
// 				if (this.classList.contains('login-form')) { // login form 부분일때
// 					toastTarget.classList.add('active');
// 				} else { // 아닐때
// 					toastTarget.classList.remove('active');
// 				}
// 		// if (!this.closest('.inp-wrap').classList.contains('error')){ // error 클래스 없을때
// 		// } else {
// 		// 	console.log('값 있음')
// 		// 	this.closest('.inp-wrap').classList.remove('error');
		
// 		// }
// 			// if (!$currentUserLogin) { // 공백
// 			// 	} else { // error 클래스 있을때
// 			// 	}
// 			// } else { // 공백아닐때
// 			// 	this.closest('.inp-wrap').classList.remove('error');
// 			// 	// this.closest('.inp-wrap').classList.remove('error');
// 			// 	toastTarget.classList.remove('active');
// 			// }
		
// 	});
// }
	// let $thisRemoveError =	$inp[i].addEventListener('keyup',function () {
		
	// 		this.closest('.inp-wrap').classList.remove('error');
	// 			toastTarget.classList.remove('active');
	// });
