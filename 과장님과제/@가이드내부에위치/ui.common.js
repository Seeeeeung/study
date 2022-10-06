$(function() {
	const body = $('body');
	var scrollT;

	function open() {
		setTimeout(function() {
			scrollT = $(document).scrollTop(); 
			body.addClass('no-scroll');
			body.css('top', (-scrollT+'px'));
		},100)
	}

	function close() {
		body.removeClass('no-scroll'); 
		console.log('닫기')
		body.css('top', null);
		$(document).scrollTop(scrollT);

		// if (!$('.ui-layer.active') && !$('.ui-layer.active')) { // 현재 결과값이 false기때문에 작동하지 않는다.
		// } else {
		// 	console.log('??')
		// }
	}

	// 전체메뉴
	const allMenuBtn = $('.ui-header .btn-allmenu');
	if(allMenuBtn) {
		var allMenu = $('.ui-allmenu');

		// 전체메뉴 열기
		allMenuBtn.on('click', function() {
			$('.ui-header').addClass('active');
			allMenu.addClass('active');
			open();
		});

		// 전체메뉴 닫기
		$('.ui-allmenu .btn-close').on('click', function() {
			setTimeout(function() {
				$('.ui-header').removeClass('active');
			},200);
			allMenu.removeClass('active');
			close();
		});

		// 전체메뉴 tab / scroll
		if (allMenu.find('.gnb-wrap')) {
			var gnb = allMenu.find('.gnb-wrap'),
			bookmark = gnb.find('.gnb-tab'),
			bmInner = bookmark.find('.tab-inner'),
			bmBtn = bmInner.find('a'),
			sections = gnb.find('.gnb-list li[id]'),
			fixHeight;
			// ???? input-search 기능은 무엇인가..!

			// input-search 콘텐츠 유무 확인
			if ($('.input-search').length) {
				 allMenu.find('.input-search').outerHeight();
			} else {
				fixHeight = bookmark.outerHeight() + allMenu.find('.btn-group').outerHeight();
			}

			// gnb-list 내부 아코디언 토글
			$('.gnb-list>li>ul>li').children('a').on('click', function(e){
				if ($(this).next().length) {
					e.preventDefault();
					$(this).parent().toggleClass('active');
				}
			});

			// 좌우탭 버튼 클릭시 북마크 좌우 위치 이동
			bookmark.find('button').each(function() {
				console.log($(this).hasClass('prev'))
				$(this).on('click', function(e) {
					var getBmInnerLocation = bmInner.scrollLeft();
					switch(true) {
						case $(this).hasClass('prev'):
							getBmInnerLocation -= bookmark.innerWidth()
							break;
						case $(this).hasClass('next'):
							getBmInnerLocation += bookmark.innerWidth()
							break;
					}

					tabScrollX();
				});
			});

			// a태그 클릭시 좌우 스크롤 기능
			for (var i = 0; i < bmBtn.length; i++) {
				bmBtn.eq(i).on('click', function(e) {
					e.preventDefault()
					// 아이디 # 이후로 자르기 (리스트 아이디 링크)
					var linkId = $(this).attr('href').split('#')[1];

					// 버튼 클릭시 모든 a 태그 active제거
					bmBtn.each(function() {
						$(this).removeClass('active');
					});
					// 클릭한 버튼에만 active 추가
					$(this).addClass('active');

					// 클릭한 버튼이 탭부분 맨 앞으로 이동
					// 스크롤 기준을 bmBtn으로 지정해서 적용이 안되었던것
					bmInner.scrollLeft(0);
					bmInner.scrollLeft($(this).offset().left - parseInt(bmInner.css('padding-left')));

					// 클릭시 해당 리스트로 스크롤 이동
					// 1. 현재 스크롤 위치 0으로 고정
					allMenu.scrollTop(0);
					// 2. 클릭한 버튼과 연동된 해당 리스트의 top에서부터의 위치 찾기
					// 3. 해당 리스트의 위치에서 헤더높이값 빼기
					allMenu.scrollTop(gnb.children('.gnb-list').children('li#'+linkId).offset().top - fixHeight + 1);
				});
			}
			console.log(bmInner.prop('scrollWidth'))
			console.log(bmInner[0].scrollWidth + ' : width')
			console.log(bmInner[0].offsetWidth + ' : width')
			console.log($(document).innerWidth())
			console.log($(window).innerWidth())
			console.log($(document).innerWidth() + $(window).innerWidth())
			console.log($(this).scrollLeft())
			// 좌우 버튼 활성화, 비활성화
			function tabScrollX() {
				var bmIScrollT = bmInner.scrollTop()
				var bmIW = bmInner.height();
				bmlnner.scrollLeft() == 0 ? bookmark.find('.prev').addClass('hide') : bookmark.find('.prev').removeClass('hide');
				// bmlInner.scrollLeft() == bmInner.scrollWidth - bmIW ? bookmark.find('.next').addClass('hide') : bookmark.find('.next').removeClass('hide');
			}


			// bmInner.on('scroll', tabScrollX);
		}
	}
}); 