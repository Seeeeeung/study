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

			$(window).on('load', function(e) {
				if (allMenu.find('.input-search')) allMenu.find('.input-search').offset()
				else fixHeight = bookmark.offset().left + allMenu.find('.btn-group').offset().left
				// console.log(bookmark.offset().left)
				// console.log(allMenu.find('.btn-group').offset().left)
			});

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
				console.log(bmBtn[i])
				bmBtn[3].on('click', function(e) {

					// 아이디 # 이후로 자르기
					var linkId = $(this).attr('href').split('#')[1];
					// console.log(linkId)

					// 버튼 클릭시 모든 a 태그 active제거
					bmBtn.each(function() {
						$(this).removeClass('active');
					});
					// 클릭한 버튼에만 active 추가
					$(this).addClass('active');

					// 클릭한 버튼 앞으로 이동
					// console.log(parseInt(bmInner.css('padding-left'))) // 설정되어있는 위치
					// console.log(this.offsetLeft)
					left = $(this).offset().left - parseInt(bmInner.css('padding-left'));
					// console.log(bmInner.scrollLeft) // 스크롤 이동한 좌표
					// var allMenuTop = 
					var listTop = gnb.find('.gnb-list li[id*=' + linkId + ']').offset().top 
					allMenu.scrollTop(listTop - fixHeight + 1);
					console.log(listTop)
					console.log(allMenu.scrollTop())
				});
			}

			// 좌우 버튼 활성화, 비활성화
			function tabScrollX() {
				var bmIScrollT = bmInner.scrollTop()
				var bmIW = bmInner.innerWidth();
				left == 0 ? bookmark.find('.prev').addClass('hide') : bookmark.find('.prev').removeClass('hide');
				left == bmIScrollT - bmIW ? bookmark.find('.next').addClass('hide') : bookmark.find('.next').removeClass('hide');
			}

		}


	}
}); 