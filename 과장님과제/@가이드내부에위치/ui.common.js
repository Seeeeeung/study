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

			

			// 좌우 버튼 활성화, 비활성화
			function tabScrollX() {
				bmInner.scrollLeft() == 0 ? bookmark.find('.prev').addClass('hide') : bookmark.find('.prev').removeClass('hide');
				Math.floor(bmInner.scrollLeft() + 1) >= Math.floor(bmInner[0].scrollWidth - bmInner.innerWidth()) ? bookmark.find('.next').addClass('hide') : bookmark.find('.next').removeClass('hide');
				// console.log(bmInner[0].scrollWidth - bmInner.outerWidth())
				// console.log(bmInner.scrollLeft()) 
			}
			// 클릭, 스크롤 동일기능
			// = left 스크롤 이동 밖으로 빼내기
			function moveLeftBmInner () {
			
				bmInner.scrollLeft(0);
				bmInner.scrollLeft(gnb.find('.tab-inner a.active').offset().left - parseInt(bmInner.css('padding-left')));
			}
			
			// 1-1. sections 위치 반환 (list 10 ->국민참여까지 작동)
			function moveScrollBar() {

				var list = sections.map(function() {
					var listIndex = console.log(sections)
					return listIndex
				})
				$('.tab-inner a').on('click', function() {
					var activeIndex = $('.tab-inner a.active').index(),
					thisSection = Math.ceil(sections.eq(activeIndex).offset().top - fixHeight + 1)
					$('.tab-inner a').removeClass('active')
					$(this).addClass('active')
					moveLeftBmInner()
					allMenu.scrollTop(0)
					allMenu.scrollTop(thisSection)
					allMenu.on('scroll', function() {
					})
					console.log(activeIndex)
					console.log(sections.eq(activeIndex))
				})
				// console.log(activeIndex)
				// // e.preventDefault()
				// for (let i = 0; i < sections.length - 2; i++) {
				// 	// 1-2. scroll 위치 반환
				// 	var scrollY = allMenu.scrollTop() ,
				// 	section = sections.eq(i),
				// 	thisBmBtn = bmBtn.eq(i),
				// 	sectionHeight = section.innerHeight() + 30,
				// 	sectionsLocation = section.offset().top + sectionHeight - fixHeight,
				// 	btnHref = thisBmBtn.attr('href').split('#')[1],
				// 	listId = section.attr('id'),
				// 	// 1-4. bmBtn href / sections id 값이 같은지 확인하는 변수선언
				// 	checkEle = btnHref == listId;
				// 	// currentSectionsLocation = sectionsLocation.top 
				// 	// ******여기부터 다시 
				// 	if (scrollY < gnb.offset().top) {
				// 		console.log('첫번째 리스트')
				// 		bmBtn.removeClass('active')
				// 		bmBtn.eq(0).addClass('active')
				// 		// 1-3. 1,2비교 근접 위치 지정
				// 	} else if (scrollY - sectionsLocation >= sectionsLocation - 15 && sectionsLocation > 0 && (sections.eq(i+1).offset().top + sectionHeight) - sectionsLocation > 0 && sectionsLocation < sectionHeight && scrollY < 2292) {
				// 		// console.log('**시작 근접')
				// 		// console.log(sections.eq(i).first(), '$(this)')
				// 		// console.log(btnHref, listId)
				// 		// console.log(thisBmBtn)
				// 		if (checkEle) {
				// 			bmBtn.removeClass('active')
				// 			thisBmBtn.addClass('active')
				// 			moveLeftBmInner()
							
				// 			// 클릭이벤트와 같이 동작함
				// 			$('.tab-inner a.active').on('click', function() {
				// 				var thisBmBtnIndex = $(this).index(),
				// 				thisSection = Math.ceil(sections.eq(thisBmBtnIndex).offset().top - fixHeight + 1)
				// 				// console.log(thisBmBtnIndex, 'thisbtnindex')
				// 				// console.log($(this))
				// 				// allMenu.scrollTop(thisSection)
				// 				console.log(scrollY, 'Y')
				// 				allMenu.scrollTop(0)
				// 				// if (thisSection == 0 || thisSection == -0 || thisSection == 1) {
				// 				// 	allMenu.scrollTop(scrollY - thisSection)
				// 				// 	console.log(thisSection, 'thisSection 위ㅣ치 == 0')
				// 				// 	// return false
				// 				// 	} else if (thisSection < 0 ) {
				// 				// 		allMenu.scrollTop(thisSection - scrollY)
				// 				// 		console.log(thisSection, 'thisSection 위ㅣ치 < 0')
				// 				// // 	// return false
				// 				// } else {
				// 				// 	// allMenu.scrollTop(0)
				// 				// 	allMenu.scrollTop(thisSection)
				// 				// 	console.log(thisSection, 'thisSection 위ㅣ치 else')
				// 				// 	// return false
				// 				// }
				// 				if (thisSection < 0 ) {
				// 					allMenu.scrollTop(thisSection - scrollY)
				// 					console.log(thisSection, 'thisSection 위ㅣ치 < 0')
				// 					// return false
				// 				// } else if () {
				// 					// 	// return false
				// 				} else {
				// 					allMenu.scrollTop(thisSection)
				// 					console.log(thisSection, 'thisSection 위ㅣ치 == 0')
				// 					// allMenu.scrollTop(0)
				// 					// allMenu.scrollTop(thisSection)
				// 					// console.log(thisSection, 'thisSection 위ㅣ치 else')
				// 					// // return false
				// 				}

				// 				// return false
				// 				// 반복문 멈추는법..?
								
				// 				// allMenu.scrollTop(0);
				// 				// if ($(this).hasClass('active')) {
				// 				// 	console.log(thisSection, 'thisSection 위ㅣ치')
				// 				// 	console.log(scrollY, 'scroll 위ㅣ치')
				// 				// 	console.log('현재 클릭한 버튼과 스크롤 active 가 같을때')
				// 				// } else {
				// 				// 	console.log('아닐떄')
				// 				// } 
								
				// 				// console.log(Math.floor(sections.eq(thisBmBtnIndex).offset().top), 'thisSectio 만')
				// 				// console.log(sections.eq(thisBmBtnIndex), 'section index')
								
								
				// 			}) // click
				// 		} // check 

				// 	}  // scrollY
				// 	// console.log(section)
				// 	// console.log(sectionHeight)
				// 	// console.log(sectionsLocation,$(this).index())
				// 	// console.log(scrollY)
				// 	// console.log(scrollY - sectionsLocation >= sectionsLocation - 15 && sectionsLocation > 0 && (sections.eq(i+1).offset().top + sectionHeight) - sectionsLocation > 0 && sectionsLocation < sectionHeight && scrollY < 2192, '마지막')

				// } // for
			} // function
			
			bmBtn.on('click', function(e) {
				e.preventDefault();
				// var index = $(this).index()
				// listTop = sections.eq(index).offset().top - fixHeight
				// console.log(listTop)
				// // console.log(index)
				// // // clickMoveScroll()
				// // console.log($(this))
				// bmBtn.removeClass('active')
				// $(this).addClass('active')
				// moveLeftBmInner()
			})
			
			// ******* 버튼 클릭시 위아래로 이동하는 것만 안댐
			function clickMoveScroll() {
			}
	
			// 상하 스크롤 이동시 탭이너 하이라이트
			function navHighlighter() {
				var scrollY = Math.floor(allMenu.scrollTop());

				scrollY >= gnb.offset().top - (fixHeight - bookmark.height()) ? bookmark.addClass('active') : bookmark.removeClass('active');
				// default = bookmark에 class active 없을시 하이라이트 없음 (스크롤시 추가)

			
				
				function addActive () {

				}

				// 1-5. bmBtn 에 class active 추가시 bmInner 이동 (moveLeftBmInner fn)

				// 1. 1-3으로 스크롤+스크롤바 드래그앤드롭 시 fn 활성화
				// fn = 1-1.과 동일한 href를 가지고 있는 버튼에 class active 추가
				// 		 + 1-5 실행

				// 2. bmBtn 클릭시 fn활성화
				// fn = 클릭한 this에 class active 추가 
				//		 + 1-5 실행
				//		 + 선택한 bmBtn의 href와 동일한 id를 가지고있는 sections의 1-3으로 스크롤이동

				// a태그 클릭시 좌우 스크롤 기능
				function clickBmBtn() {
					// for (var i = 0; i < bmBtn.length; i++) {
					// 	bmBtn.eq(i).on('click', function(e) {
					// 		e.preventDefault()

					// 		// 아이디 # 이후로 자르기 (리스트 아이디 링크)
					// 		var linkId = $(this).attr('href').split('#')[1];
							
					// 		// 버튼 클릭시 모든 a 태그 active제거
					// 		$('.tab-inner a').removeClass('active')
					// 		// bmInner.find('a').each(function() {
					// 		// 	console.log($(this))
					// 		// })
					// 		// 클릭한 버튼에만 active 추가
					// 		$(this).addClass('active')
					// 		// **********스크롤 안되는 부분 class추가 안됨 ************
							
					// 		// 클릭한 버튼이 탭부분 맨 앞으로 이동
					// 		// 스크롤 기준을 bmBtn으로 지정해서 적용이 안되었던것
					// 		bmInner.scrollLeft(0);
					// 		bmInner.scrollLeft($(this).offset().left - parseInt(bmInner.css('padding-left')));
	
					// 		// 클릭시 해당 리스트로 스크롤 이동
					// 		// 1. 현재 스크롤 위치 0으로 고정
					// 		allMenu.scrollTop(0);
					// 		// 2. 클릭한 버튼과 연동된 해당 리스트의 top에서부터의 위치 찾기
					// 		// 3. 해당 리스트의 위치에서 헤더높이값 빼기
					// 		allMenu.scrollTop(gnb.children('.gnb-list').children('li#'+linkId).offset().top - fixHeight + 1);
					// 		// console.log(bmInner.scrollLeft())
					// 	});
					// }
					console.log('클릭이벤트 실행')
				}

				function moveScrollBar() {
					console.log('스크롤 이동 이벤트 실행')
				}
				
				// 1. 스크롤+스크롤바 드래그&드롭 시 리스트 위치 반환
				// 2. 그 위치와 근접한 리스트 아이디와 bmBtn href 속성값이 동일하면
				// -> 전체 인덱스 검색 해당 객체 반환
				// 3. bmBtn 에 class active 추가
				// 4. class active 인 bmBtn이 bmInner left 0 으로 설정
				// 5. 리스트는 상위로 지정
				// -> bmBtn onclick function과는 별개로 작동해야함

				// for (let i = 0; i <= sections.length; i++) {
				// 	var $this = sections.eq(i),
				// 	sectionHeight = $this.height(),
				// 	sectionTop = scrollY + $this.offset().top - fixHeight,
				// 	sectionId = $(this).attr('id');
				// 	sectionIndex = $this.index();
				// 	console.log(sectionIndex)
				// 	// 스크롤 시작점 0으로 지정(고정)
				// 	// 0을 고정하지 않으면 현재 스크롤 위치에서부터 시작하기때문에 코드작동에 오류가 있다.
					
				// 	if (scrollY < gnb.offset().top) {
				// 		bmInner.find('a').eq(0).addClass('active');
						
				// 	} else if (scrollY > sectionTop - 15 && scrollY <= sectionTop + sectionHeight + 15) {
				// 		// bmInner.find('a').eq(sectionIndex - 1).removeClass('active')
				// 		bmInner.find('a').eq(sectionIndex).addClass('active')
				// bmInner.scrollLeft(0)
				// 		bmInner.scrollLeft(gnb.find('.gnb-tab a.active').offset().left - parseInt(bmInner.css('padding-left')))

				// 		// 반복문이 문제인거같은데.......................
				// 	} else {
				// 		bmInner.find('a').removeClass('active')
				// 		// return false
						
				// 	}
				// 	// return false
				// 	console.log(Math.floor(sectionTop-15))
				// 	console.log(Math.floor(sectionTop + sectionHeight + 15))
				// 	console.log(scrollY)

				// }
				// sections.each(function() {
				// });
				tabScrollX();
			}

			bmInner.on('scroll', tabScrollX);

			// if ($._data(bmBtn[0], 'events')) {
			// 	console.log('이벤트 있음')
			// 	allMenu.off('scroll', navHighlighter)
			// } else if ($._data(allMenu[0], 'events')) {
			// 	allMenu.on('scroll', navHighlighter)
			// 	console.log('?')

			// }
			allMenu.on('scroll', navHighlighter);
			allMenu.on('scroll', moveScrollBar);

		} // //allMenu
	}
}); 