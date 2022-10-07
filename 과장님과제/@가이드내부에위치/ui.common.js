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

			// 좌우탭 버튼 클릭시 북마크이너탭 좌우 위치 이동
			bookmark.find('button').each(function() {
				console.log($(this).hasClass('prev'))
				$(this).on('click', function(e) {
					let currentBmInner = bmInner.scrollLeft();
					switch(true) {
						case $(this).hasClass('prev'):
							bmInner.scrollLeft(currentBmInner -= bookmark.innerWidth());
							break;
						case $(this).hasClass('next'):
							bmInner.scrollLeft(currentBmInner += bookmark.innerWidth());
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
					console.log(bmInner.scrollLeft())
				});
			}

			// 좌우 버튼 활성화, 비활성화
			function tabScrollX() {
				bmInner.scrollLeft() == 0 ? bookmark.find('.prev').addClass('hide') : bookmark.find('.prev').removeClass('hide');
				bmInner.scrollLeft() >= bmInner[0].scrollWidth - bmInner.scrollLeft() ? bookmark.find('.next').addClass('hide') : bookmark.find('.next').removeClass('hide');
			}

			// 상하 스크롤 이동시 탭이너 하이라이트
			function navHighlighter() {
				allMenu.on('scroll', function() {
					var scrollY = allMenu.scrollTop();

					scrollY >= gnb.offset().top - (fixHeight - bookmark.height()) ? bookmark.addClass('active') : bookmark.removeClass('active');

					sections.each(function() {
						var sectionHeight = $(this).height(),
						sectionTop = $(this).offset().top - fixHeight,
						sectionId = $(this).attr('id');
	
						// 리스트 위치가 안맞아서 스크롤과 버튼 클릭 기능이 다르게작동함
						// ** 여기서부터 다시 하기
						console.log(sectionTop)

						if (scrollY < gnb.offset().top) {
							bmInner.eq(0).addClass('active');
							console.log('작동')
						} else if (scrollY > sectionTop - 30 && scrollY <= sectionTop + sectionHeight + 15) {
							// 1. 현재 리스트의 아이디 찾기 -> sectionId
							console.log(sectionId + ' : 리스트 아이디')
							// 2. 1번과 같은 탭메뉴 버튼의 href찾기
							// 2-1. 탭메뉴버튼 전체 href 속성 반환
							const bmHref = bmInner.children().map(function() {
								return $(this).attr('href').split('#')[1]
							})
							console.log(bmHref)
							// 2-2. 그중에 리스트 아이디와 같은것 반환
							for (let i = 0; i < bmHref.length; i++) {
								if (bmHref[i] == sectionId) {

									bmInner.children().removeClass('active')
									bmInner.children().eq(i).addClass('active')
								} 
							}
							//2-3. 그 속성을 가진 객체 반환 .... 결론적으로 그 href의 객체를 반환하려면 검색을 해야하는데 어캐함
							// 다른방법이 있나
							// 인덱스 연동시키기?


							// 3. 찾은 버튼에 active 추가하기
							// 4. 나머지 버튼에 active제거하기

							
							bmInner.scrollLeft(gnb.find('.gnb-tab a.active').offset().left - parseInt(bmInner.attr('padding-left')))
						} else {
							// gnb.children('.gnb-tab').find('a').attr('href', sectionId).removeClass('active');
							// console.log($(this))
						}
					});

				});


				
				console.log(bookmark.height())
				console.log(gnb.offset().top)
				console.log(scrollY)

				tabScrollX();
			}

			bmInner.on('scroll', tabScrollX());
			allMenu.on('scroll', navHighlighter());
		}
	}
}); 