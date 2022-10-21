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

	// html 파일의 onclick 연동은 제이쿼리에서 할수 없는 기능?
	const button = $('button:not(.blue)')
	button.removeAttr('onclick')

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
				fixHeight = bookmark.outerHeight() + Math.ceil(allMenu.find('.btn-group').outerHeight());
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
			}
			// 클릭, 스크롤 동일기능
			// = left 스크롤 이동 밖으로 빼내기
			function moveLeftBmInner () {
				bmInner.scrollLeft(0);
				bmInner.scrollLeft(gnb.find('.tab-inner a.active').offset().left - parseInt(bmInner.css('padding-left')));
				// if (bmBtn.hasClass('active')) {
				// }
			}
			

			bmBtn.on('click', function() {
				let index = $(this).index(),
				linkList = sections.eq(index).offset().top - fixHeight;
				// allMenu.off('scroll');
				bookmark.addClass('active')
				bmBtn.removeClass('active')
				$(this).addClass('active')
				// 클릭으로 스크롤시 오류
				allMenu.scrollTop(0)
				allMenu.scrollTop(linkList)
				moveLeftBmInner()
				tabScrollX()
			})

			
			// 상하 스크롤 이동시 탭이너 하이라이트
			function navHighlighter() {
				var scrollY = Math.floor(allMenu.scrollTop());

				scrollY >= gnb.offset().top - (fixHeight - bookmark.height()) ? bookmark.addClass('active') : bookmark.removeClass('active');
				// default = bookmark에 class active 없을시 하이라이트 없음 (스크롤시 추가)
				
				var scrollY = Math.floor(allMenu.scrollTop());
				sections.each(function(index, element) {
					var sectionTop = Math.floor($(element).offset().top - fixHeight),
					sectionHeight = $(element).height()
					// console.log(sectionTop, index)
					// scrollY = 0;
					if (sectionTop <= 0) {
						bmBtn.removeClass('active')
						bmBtn.eq(index).addClass('active')
						// console.log(scrollY, 'y')
					} else if (sectionTop > 0 && scrollY == 2318) {
						// bmBtn.on('click', function() {
							console.log('작동')
							bmBtn.removeClass('active')
							bmBtn.eq(index-3).addClass('active')
							// clickfn()
						// })
					} else {
						bmBtn.on('click', function() {
							bmBtn.removeClass('active')
							$(this).addClass('active')
						})
					}
					
				});

				moveLeftBmInner()
				tabScrollX()
			}

			bmBtn.on('click', function(e) {e.preventDefault()});
			bmInner.on('scroll', tabScrollX);
			allMenu.on('mousewheel', navHighlighter);

		}// gnbwrap
		//  스크롤+버튼클릭 포기
		
	}// //allMenu


	// ui-accordion
	const accordion = $('.ui-accordion');
	accordion.each(function(index, element) {
		var $this = $(element),
			$btn = $this.find('.btn-toggle'),
			$cont = $btn.siblings('.toggle-target')

			function btnClickEvt(i) {
				$btn.eq(i).on('click', function() {
					if ($(this).hasClass('active')) {
						$(this).removeClass('active');
						$(this).attr('aria-expanded', 'false')
						$cont.eq(i).removeClass('active')
					} else {
						$(this).addClass('active');
						$(this).attr('aria-expanded','true');
						$cont.eq(i).addClass('active')
					}
				}); // click
			} // fn
			for (var i = 0; i < $btn.length; i++) btnClickEvt(i)
	})
	// //ui-accordion

	// ui-confirm
	const confirm = $('.btn-confirm-open'),
		closeConfirm = $('.ui-confirm button:not(.blue)');

	confirm.each(function(index, element) {
		$(element).on('click', function() {
			var $layer = $('.ui-confirm:not(.auto)');
			$layer.eq(index).addClass('active');
			open();
		})
	})
	
	closeConfirm.each(function(index, element) {
		$(element).on('click', function() {
			var $closeLayer = $('.ui-confirm');
			$closeLayer.eq(index).removeClass('active');
			close();
		})
	})
	// //ui-confirm

	// text field
	const inp = $('.input-wrap')
	inp.each(function(index, element) {
		var $delete = $(element).find('.btn-del'),
			$inp = $(element).find('.ui-input')

			for (var i = 0; i < $inp.length; i++) {
				$inp.eq(i).on('focus', function() {
					if ($(this).closest('.input-wrap').siblings('.inp-label')) $(this).closest('.input-wrap').siblings('.inp-label').addClass('on')
				})

				$inp.eq(i).on('blur', function() {
					if ($(this).closest('.input-wrap').siblings('.inp-label')) $(this).closest('.input-wrap').siblings('.inp-label').removeClass('on')
				})
			}

		if ($delete) {
			$delete.on('click', function() {
				console.log($(this).closest('.input-wrap').children('.ui-input').val())
				$(this).closest('.input-wrap').children('.ui-input').val('');
				$(this).closest('.input-wrap').children('.ui-input').focus();
			});

			$delete.on('mousedown, focus', deleteFocus)
		} 

		function deleteFocus() {
			if ($(element).prevAll() && $(element).prevAll().hasClass('.inp-label')) {
				setTimeout(function() {
					$delete.parent().prev().addClass('on')
					// 왜 있는 기능..?
				},0)
			}
		}
	})
	// //text field

	// textarea
	const textArea = $('.ui-textarea');
	textArea.each(function(index,element) {
		var $textArea = $(element).children('textarea');

		$textArea.on('focus', function() {
			$(element).addClass('on');
			if ($(element).prevAll() && $(element).prevAll().hasClass('inp-label')) $(this).parent().prev().addClass('on')
		});

		$textArea.on('blur', function() {
			$(element).removeClass('on');
			if ($(element).prevAll() && $(element).prevAll().hasClass('inp-label')) $(this).parent().prev().removeClass('on');
		});
	})
	// //textarea

	// selectbox
	const selectOpen = $('.btn-select-open'),
		closeSelectbox = $('.ui-selectbox button.ui-btn:not(.blue)');

	selectOpen.each(function(index, element) {
		var $this = $(element),
			$layer = $this.parent();
			// console.log($layer)

		$this.on('click', function() {
			$layer.addClass('active')
		});

		var $btn = $layer.find('.select-list button');
		for (var i = 0; i < $btn.length; i++) {
			$btn.eq(i).on('click', function() {
				if ($(this).closest('.select-list').parent().hasClass('select-wrap')) {
					if ($(this).closest('.select-list').find('.active')) $(this).closest('.select-list').find('.active').removeClass('active');

					$(this).addClass('active')
					$this.text($(this).text());
					$this.addClass('has-value')
				}
			})
		}
	});

	closeSelectbox.each(function(index, element) {
		$(element).on('click', function() {
			var $closeLayer = $('.ui-selectbox');
			$closeLayer.eq(index).removeClass('active');
			// close();
		})
	})
	// //selectbox

	// layer popup (botton sheet)
	const layerOpen = $('.btn-layer-open');
	layerOpen.each(function(index, element) {
		var $this = $(element),
			$layer = $this.parent(),
			$close = $this.next().children().last();

		$this.on('click', function() {
			$layer.addClass('active');
			open();
		});

		var $btn = $layer.find('.select-list button');
		for (var i = 0; i < $btn.length; i++) {
			$btn.eq(i).on('click', function() {
				if ($(this).closest('.select-list').parent().hasClass('layer-contents')) {
					if ($(this).closest('.select-list').find('.active').length) $(this).closest('.select-list').find('.active').removeClass('active')
					$(this).addClass('active');
					$this.text($(this).text());
					$this.addClass('has-value');
				}
			});
		}

		$close.on('click', function() {
			$(this).closest('.ui-layer.active').removeClass('active');
			close();
		});
	});

	$('.ui-layer.auto').each(function(index, element) {
		if ($(element).hasClass('active')) {
			open();
			var $close = $(element).children().first().children().last();

			$close.on('click', function() {
				$(element).removeClass('active');
				close()
			})
		}
	})
	// //layer popup (botton sheet)

	// tab
	const tabMenu = $('.ui-tab');
	tabMenu.each(function(index, element) {
		var $nav = $(element).first().children(),
			$li = $nav.find('[role="tab"]'),
			$cont = [],
			$only = false;

		// 노드를 얻어내서 하는 이유는..? 노드타입이 text인 것을 제거하기 위해서..?
		for (var i = 0; i < $(element).children().length; i++) {
			if ($(element).children().hasClass('tab-contents')) {
				$cont = $(element).children('.tab-contents')
			}
		}

		if ($cont.length <= 1) $only = true;

		for (var j = 0; j < $li.length; j++) {
			// (콘텐츠가 1개 이상)탭버튼 속성,설정
			$li.eq(j).on('click', function() {
				for (var k = 0; k < $li.length; k++) {
					$li.eq(k).removeClass('active');
					$li.eq(k).attr('aria-selected','false');
					if (!$only) $cont.eq(k).removeClass('active');
				}

				$(this).addClass('active');
				$(this).attr('aria-selected','true');
				
				if (!$only) {
					// 콘텐츠 1개이상 콘텐츠 내용 변경
					$cont.eq($(this).parent().index()).addClass('active');
				} else {
					// 콘텐츠 1개일때 콘텐츠 속성설정 (내용변동없음)
					$cont.eq(0).attr('aria-labelledby',$(this).attr('id'))
					$cont.eq(0).attr('id',$(this).attr('aria-controls'))
				}
			})
		}

	}) // each
	// //tab

	// tooltip
	const tooltip = $('.ui-tooltip');
	tooltip.each(function(index, element) {
		// find(자식+손자 태그에서 검색) , children(자식태그에서만)
		// element 의 자식중에 (손자X) 태그가 존재하면 find 말고 children으로 검색
		var $open = $(element).children('.btn-tooltip-open');
		console.log($open)
		
		$open.on('click', function() {
			console.log($(element))
			if ($(element).hasClass('active')) {
				$(element).removeClass('active');
			} else {
				for (var i = 0; i < tooltip.length; i++) tooltip.eq(i).removeClass('active');
				$(element).addClass('active')
			}
		})
	})
 
	body.on('click', clickBodyTooltip);
	function clickBodyTooltip(e) {
		var _target = $(e.target)
		var $open = $('.btn-tooltip-open');

		// [] 를 붙이이 않으면 모두 false 반환
		// 둘중에 하나만 붙여도 작동함
		// 왜..?......??????????????????
		for (var i = 0; i < $open.length; i++) {
			if ($open.eq(i) == _target) return;
			console.log($open.eq(i))
			console.log(_target)
			console.log($open.eq(i) == _target)
			
			var tags = $open.eq(i).parent().find('*');
			for (var j = 0; j < tags.length; j++) {
				console.log(typeof tags.eq(j))
				console.log(typeof _target)
				console.log(tags.eq(j) == $(this))
				if (tags.eq(j) == _target) return;}
		}
		for (var i = 0; i < tooltip.length; i++) tooltip.eq(i).removeClass('active')
	}
	// //tooltip
}); 