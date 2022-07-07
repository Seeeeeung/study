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

const btnLogin = document.getElementById('btn-login');
let inp = document.querySelectorAll('.inp-wrap');
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

	const $popup = document.getElementById('layer-popup');
	// 모달창 오픈
	function openLayer() {
		$popup.classList.add('active');
		// $noAccount.focus();
	}
function loginHandler() {
	// // 공백 에러
	// function activeError() {
	// 	for (let i = 0; i < inp.length; i++) {
	// 		inp[i].classList.add('error');
	// 	}
	// 	toastTarget.classList.add('active');
	// }
	// // 공백에러제거
	// function deletError() {
	// 	for (let i = 0; i < inp.length; i++) {
	// 		inp[i].classList.remove('error');
	// 	}
	// 	toastTarget.classList.remove('active');
	// }
	
	// 인풋 값 체크(닉네임)
	const $wrongAccount = document.getElementById('wrong-account');
	const $noAccount = document.getElementById('no-account');

	// for (let i=0; i < userData.length; i++) {
	// 	let	$UserName = currentUser.value;
	// 	if (userData[i].id == $UserName) {
	// 		alert('로그인 성공')
	// 	} else if (!$UserName) {
	// 		activeError();
	// 	} else if (userData[i].id.includes($UserName)) {
	// 		console.log('몇글자는 맞아요');
	// 		deletError();
	// 		openLayer();
	// 		$noAccount.classList.remove('on');
	// 		$wrongAccount.classList.add('on');
	// 	} else  {
	// 		deletError()
	// 		openLayer();
	// 		console.log('없는 계정')
	// 		$wrongAccount.classList.remove('on');
	// 		$noAccount.classList.add('on');
	// 	}
	// } 

		
	// 인풋 값 체크 (이름)
	// for (let i=0; i < userData.length; i++) {
	// 	let	$UserName = currentUser.value;
	// 	if (userData[i].id == $UserName) {
	// 		alert('로그인 성공')
	// 	} else if (!$UserName) {
	// 		activeError();
	// 	} else if (userData[i].id.includes($UserName)) {
	// 		console.log('몇글자는 맞아요');
	// 		deletError();
	// 		openLayer();
	// 		$noAccount.classList.remove('on');
	// 		$wrongAccount.classList.add('on');
	// 	} else  {
	// 		deletError()
	// 		openLayer();
	// 		console.log('없는 계정')
	// 		$wrongAccount.classList.remove('on');
	// 		$noAccount.classList.add('on');
	// 	}
	// } 	

	// // 닉네임 찾기
	// const $searchLayer = document.getElementById('search-name');
	// const btnOpenSearch = document.getElementById('btn-open-search');
	// const btnSearchUser = document.querySelector('.btn-search');
	// const searchUserInput = document.getElementById('search-user');
	// btnOpenSearch.addEventListener('click', function() {
	// 	openLayer();
	// 	$searchLayer.classList.add('on');
	// });
	// btnSearchUser.addEventListener('click', function() {
	// 	let searchValue = searchUserInput.value;

	// });

	// // 모달창 닫기
	// let $btnCloseLayer = document.querySelectorAll('.layer-close')
	// // popup
	// function closeLayer() {
	// 	$popup.classList.remove('active');
	// 	$noAccount.classList.remove('on')
	// }
	// for (let i = 0; i < $btnCloseLayer.length; i++) {
	// 	$btnCloseLayer[i].addEventListener('click', closeLayer);
	// }
}
// loginHandler();
// 인풋 박스 값 전송+ 로그인 버튼 클릭
// currentUser.addEventListener('keyup',function (e) {
// 	if (e.keyCode === 13) {
// 		// loginHandler();
// 		loginHandler();
// 	}
// })
// btnLogin.addEventListener('click',loginHandler)


	// 로그인폼에 있는 인풋
	const currentUser = document.querySelectorAll('user-nick-name');
	const userName = document.querySelectorAll('user-name');

	for (let i=0; i<currentUser.length; i++) {
		let $UserName = currentUser[i];
		if ($UserName.closest('.contents-login')) {
			alert('작동')
		}
	}