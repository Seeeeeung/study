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

			var bookmarkOffsetLeft = bookmark.outerHeight();
			var allMenuOffsetLeft = allMenu.find('.btn-group').outerHeight();
			console.log(bookmarkOffsetLeft)
			console.log(allMenuOffsetLeft)

			if ($('.input-search').length) {
				// console.log( allMenu.find('.input-search'))
				 allMenu.find('.input-search').outerHeight()
				//  console.log(allMenu.find('.input-search').offsetHeight)
				console.log('???왜 작동해...?')
			} else {
				fixHeight = bookmarkOffsetLeft + allMenuOffsetLeft;
				console.log('작동동')
				console.log(fixHeight)
			}

			// gnb-list 내부 아코디언 토글
			gnb.find('.gnb-list a').each(function() {
				$(this).on('click', function(e){
					e.preventDefault();
					if ($(this).next() != null) {
						$(this).parent().toggleClass('active');
					}
				});
			});

			// 좌우탭 버튼 클릭시 스크롤 위치이동
			bookmark.find('button').each(function() {
				console.log($(this).hasClass('prev'))
				$(this).on('click', function(e) {
					var left = bmInner.scrollLeft();
					switch(true) {
						case $(this).hasClass('prev'):
							left -= bookmark.innerWidth
							break;
						case $(this).hasClass('next'):
							left += bookmark.innerWidth
							break;
					}

					tabScrollX();
				});
			});

			// 버튼 클릭시 좌우 스크롤 기능
			for (var i = 0; i < bmBtn.length; i++) {
				bmBtn.eq(i).on('click', function(e) {
					// console.log(this)
					e.preventDefault()
					// 아이디 # 이후로 자르기
					var linkId = $(this).attr('href').split('#')[1];

					// 버튼 클릭시 모든 a 태그 active제거
					bmBtn.each(function() {
						$(this).removeClass('active');
					});
					// 클릭한 버튼에만 active 추가
					$(this).addClass('active');

					// 클릭한 버튼이 탭부분 맨 앞으로 이동
					// ??????작동이유 알아내기
					var tabLeft = this.offsetLeft - parseInt(bmInner.css('padding-left'));
					$(this).closest('.tab-inner').scrollLeft(tabLeft);

					// 버튼 클릭시 스크롤 탑 이동, 리스트 탑 이동
					var moveTop = gnb.children('.gnb-list').children('li#'+linkId).outerHeight(true);
					console.log(moveTop + ' : 1')
					allMenu.scrollTop(moveTop + 1);
					console.log(moveTop + ' : 2')
					console.log(allMenu.scrollTop())
					console.log(gnb.children('.gnb-list').children('li#'+linkId))
					// 왜 스크롤ㄹ이 두번 먹고.. 조금	밖에 안내려가?
					// console.log(this)
					// console.log(allMenu.offsetTop)
					
					// console.log(gnb.find(".gnb-list li[id*=" + linkId + "]").offset().top)
					// console.log( gnb.find(".gnb-list li[id*=" + linkId + "]"))
					// a링크 작동해서 scroll이벤트 안먹혔음 ^^ ㅗㅗㅗ
				});
			}

			// 좌우 버튼 활성화, 비활성화
			// function tabScrollX() {
			// 	var bmIScrollT = bmInner.scrollTop()
			// 	var bmIW = bmInner.innerWidth();
			// 	left == 0 ? bookmark.find('.prev').addClass('hide') : bookmark.find('.prev').removeClass('hide');
			// 	left == bmIScrollT - bmIW ? bookmark.find('.next').addClass('hide') : bookmark.find('.next').removeClass('hide');
			// }


			// bmInner.on('scroll', tabScrollX);
		}
	}
}); 