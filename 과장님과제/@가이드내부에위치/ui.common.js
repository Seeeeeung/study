// 전역에서 쓰이거나 html 상에서 onClick="" 이벤트로 동작이 일어날경우 document.ready 밖으로 빠져야함
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
	body.css('top', null);
	$(document).scrollTop(scrollT);

	if (!$('.ui-layer.active') && !$('.ui-layer.active')) { 
		body.removeClass('no-scroll');
		body.css('top',null);
		$(window).scrollTo(0, scrollT)
	}
}

//confirm 닫기
function confirmClose(e){
	$(e).closest('.ui-confirm').removeClass('active');
	close();
}

function selectClose(e){
	$(e).closest('.ui-selectbox').removeClass('active');
}


$(function() {

	// 왜 제거..?
	// javascript 호출 onclick 제거
	/*const button = $('button:not(.blue)')
	button.removeAttr('onclick')*/

	// 전체메뉴
	const allMenuBtn = $('.ui-header .btn-allmenu');
	if(allMenuBtn.length) {
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
		if (allMenu.find('.gnb-wrap').length) {
			var gnb = allMenu.find('.gnb-wrap'),
			bookmark = gnb.children('.gnb-tab'),
			bmInner = bookmark.children('.tab-inner'),
			bmBtn = bmInner.children('a'),
			sections = gnb.children('.gnb-list').children('li[id]'),
			fixHeight;

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
			bookmark.children('button').each(function() {
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
				bmInner.scrollLeft() == 0 ? bookmark.children('.prev').addClass('hide') : bookmark.children('.prev').removeClass('hide');
				Math.floor(bmInner.scrollLeft() + 1) >= Math.floor(bmInner[0].scrollWidth - bmInner.innerWidth()) ? bookmark.children('.next').addClass('hide') : bookmark.children('.next').removeClass('hide');
			}

			// 클릭, 스크롤 시 좌우 스크롤이동
			function moveLeftBmInner () {
				bmInner.scrollLeft(0);
				bmInner.scrollLeft(gnb.find('.tab-inner a.active').offset().left - parseInt(bmInner.css('padding-left')));
			}

			// 버튼 클릭시 스크롤 이동(class 기능 없음)
			bmBtn.on('click', function() {
				let index = $(this).index(),
				linkList = sections.eq(index).offset().top - fixHeight;
				allMenu.scrollTop(allMenu.scrollTop() + linkList);
			});

			
			// 상하 스크롤 이동시(스크롤 이동 설정기능 없음) 탭이너 하이라이트, 버튼에 class 추가/제거
			function navHighlighter() {
				var scrollY = Math.floor(allMenu.scrollTop());

				scrollY >= gnb.offset().top - (fixHeight - bookmark.height()) ? bookmark.addClass('active') : bookmark.removeClass('active');
				// default = bookmark에 class active 없을시 하이라이트 없음 (스크롤시 추가)
				
				sections.each(function(index, element) {
					var sectionTop = Math.floor($(element).offset().top - fixHeight)

					if (sectionTop <= 0) {
						bmBtn.removeClass('active');
						bmBtn.eq(index).addClass('active');
					} else if (sectionTop > 0 && scrollY == 2318) {
							bmBtn.removeClass('active');
							bmBtn.eq(index-3).addClass('active');
					} else {
						bmBtn.on('click', function() {
							bmBtn.removeClass('active');
							$(this).addClass('active');
						});
					}

				}); // each

				moveLeftBmInner();
				tabScrollX();
			}

			bmBtn.on('click', function(e) {e.preventDefault()});
			bmInner.on('scroll', tabScrollX);
			allMenu.on('scroll', navHighlighter);

		}// gnbwrap
	}// //allMenu


	// ui-accordion
	const accordion = $('.ui-accordion');
	accordion.each(function() {
		var $this = $(this),
			$btn = $this.find('.btn-toggle');
			//$cont = $btn.siblings('.toggle-target');

		$btn.each(function(){
			$(this).on("click", function(){
				if ($(this).hasClass('active')) {
					$(this).removeClass('active');
					$(this).attr('aria-expanded', 'false');
					$(this).next('.toggle-target').removeClass('active');
				} else {
					$(this).addClass('active');
					$(this).attr('aria-expanded','true');
					$(this).next('.toggle-target').addClass('active');
				}

				// type-toggle
				if ($this.hasClass('type-toggle')) {
					var $toggle = $(this).parent().siblings().children('.btn-toggle');$toggle.removeClass('active');
					$toggle.next().removeClass('active');
					$toggle.attr('aria-expanded', 'false');
					$toggle.next('.toggle-target').removeClass('active');
				}
			})
		})


		/*
		function btnClickEvt(i) {
			$btn.eq(i).on('click', function() {
				if ($(this).hasClass('active')) {
					$(this).removeClass('active');
					$(this).attr('aria-expanded', 'false');
					$cont.eq(i).removeClass('active');
				} else {
					$(this).addClass('active');
					$(this).attr('aria-expanded','true');
					$cont.eq(i).addClass('active');
				}
			}); // click
		} // each
		for (var i = 0; i < $btn.length; i++) btnClickEvt(i);*/
	});
	// //ui-accordion

	// ui-confirm
	const confirm = $('.btn-confirm-open');
	confirm.each(function(){
		$(this).on('click', function(){
			var $layer = $(this).attr('aria-controls');
			$("#"+$layer).parent().addClass('active');
			open()
		});
	});
	/*
	const confirm = $('.btn-confirm-open'),
		closeConfirm = $('.ui-confirm button:not(.blue)');

	confirm.each(function(index, element) {
		$(element).on('click', function() {
			var $layer = $('.ui-confirm:not(.auto)');
			$layer.eq(index).addClass('active');
			open();
		});
	});
	
	closeConfirm.each(function(index, element) {
		$(element).on('click', function() {
			var $closeLayer = $('.ui-confirm');
			$closeLayer.eq(index).removeClass('active');
			close();
		});
	});*/
	// //ui-confirm

	// text field
	const inp = $('.input-wrap');
	inp.each(function() {
		var $delete = $(this).children('.btn-del'),
			$inp = $(this).children('.ui-input');

			$inp.each(function() {
				$(this).on('focus', function() {
					if ($(this).closest('.input-wrap').siblings('.inp-label').length) $(this).closest('.input-wrap').siblings('.inp-label').addClass('on');
				});

				$(this).on('blur', function() {
					if ($(this).closest('.input-wrap').siblings('.inp-label').length) $(this).closest('.input-wrap').siblings('.inp-label').removeClass('on');
				});

			})
			// for (var i = 0; i < $inp.length; i++) {
			// }

		if ($delete.length) {
			$delete.on('click', function() {
				$(this).closest('.input-wrap').children('.ui-input').val('');
				$(this).closest('.input-wrap').children('.ui-input').focus();
			});

			$delete.on('mousedown focus', deleteFocus);
		} 

		function deleteFocus() {
			if ($(this).prev().length && $(this).prev().hasClass('inp-label')) {
				setTimeout(function() {
					$delete.parent().prev().addClass('on');
				},0);
			}
		}
	});

	/*
	const inp = $('.input-wrap');
	inp.each(function(index, element) {
		var $delete = $(element).children('.btn-del'),
			$inp = $(element).children('.ui-input');

			for (var i = 0; i < $inp.length; i++) {
				$inp.eq(i).on('focus', function() {
					if ($(this).closest('.input-wrap').siblings('.inp-label').length) $(this).closest('.input-wrap').siblings('.inp-label').addClass('on');
				});

				$inp.eq(i).on('blur', function() {
					if ($(this).closest('.input-wrap').siblings('.inp-label').length) $(this).closest('.input-wrap').siblings('.inp-label').removeClass('on');
				});
			}

		if ($delete.length) {
			$delete.on('click', function() {
				$(this).closest('.input-wrap').children('.ui-input').val('');
				$(this).closest('.input-wrap').children('.ui-input').focus();
			});

			$delete.on('mousedown focus', deleteFocus);
		} 

		function deleteFocus() {
			if ($(element).prev().length && $(element).prev().hasClass('inp-label')) {
				setTimeout(function() {
					$delete.parent().prev().addClass('on');
				},0);
			}
		}
	});*/
	// //text field

	// textarea
	const textArea = $('.ui-textarea');
	textArea.each(function(index,element) {
		var $textArea = $(element).children('textarea');

		$textArea.on('focus', function() {
			$(element).addClass('on');
			if ($(element).prev().length && $(element).prev().hasClass('inp-label')) $(this).parent().prev().addClass('on');
		});

		$textArea.on('blur', function() {
			$(element).removeClass('on');
			if ($(element).prev().length && $(element).prev().hasClass('inp-label')) $(this).parent().prev().removeClass('on');
		});
	});
	// //textarea

	// selectbox
	var select = $('.ui-selectbox');
	select.each(function(){
		var _this = $(this);
		var selectOpen = _this.children('.btn-select-open');

		selectOpen.on("click", function(){
			_this.addClass('active');
		})

		var $btn = _this.find('.select-list button');
		$btn.each(function(){
			$(this).on('click', function(){
				if ($(this).closest('.select-list').parent().hasClass('select-wrap')) {
					if ($(this).closest('.select-list').find('.active').length) $(this).closest('.select-list').find('.active').removeClass('active');

					$(this).addClass('active');
					$this.text($(this).text());
					$this.addClass('has-value');
				}
			})
		})
	})
				/*
	const selectOpen = $('.btn-select-open'),
		closeSelectbox = $('.ui-selectbox button.ui-btn:not(.blue)');

	selectOpen.each(function(index, element) {
		var $this = $(element),
			$layer = $this.parent();

		$this.on('click', function() {
			$layer.addClass('active');
		});

		var $btn = $layer.find('.select-list button');
		for (var i = 0; i < $btn.length; i++) {
			$btn.eq(i).on('click', function() {
				if ($(this).closest('.select-list').parent().hasClass('select-wrap')) {
					if ($(this).closest('.select-list').find('.active').length) $(this).closest('.select-list').find('.active').removeClass('active');

					$(this).addClass('active');
					$this.text($(this).text());
					$this.addClass('has-value');
				}
			});
		}
	});

	closeSelectbox.each(function(index, element) {
		$(element).on('click', function() {
			var $closeLayer = $('.ui-selectbox');
			$closeLayer.eq(index).removeClass('active');
			// close();
		})
	});*/
	// //selectbox

	// layer popup (botton sheet)

	const layerOpen = $('.btn-layer-open');
	layerOpen.each(function() {
		var $this = $(this),
			$layer = $this.parent(),
			$close = $this.next().children().last();

		$this.on('click', function() {
			$layer.addClass('active');
			open();
		});

		var $btn = $layer.find('.select-list button');
		$btn.each(function() {
			$(this).on('click', function() {
				if ($(this).closest('.select-list').parent().hasClass('layer-contents')) {
					if ($(this).closest('.select-list').find('.active').length) $(this).closest('.select-list').find('.active').removeClass('active');
					$(this).addClass('active');
					$this.text($(this).text());
					$this.addClass('has-value');
				}
			})
		})

		$close.on('click', function() {
			$(this).closest('.ui-layer.active').removeClass('active');
			close();
		});
	});

	$('.ui-layer.auto').each(function() {
		if ($(this).hasClass('active')) {
			open();
			var $close = $(this).children().first().children().last();

			$close.on('click', function() {
				$(this).removeClass('active');
				close();
			});
		}
	});

	/*
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
					if ($(this).closest('.select-list').find('.active').length) $(this).closest('.select-list').find('.active').removeClass('active');
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
				close();
			});
		}
	});
	*/
	// //layer popup (botton sheet)

	// tab

	const tabMenu = $('.ui-tab');
	tabMenu.each(function() {
		var $nav = $(this).first().children(),
			$li = $nav.find('[role="tab"]'),
			$cont = [],
			$only = false;

		if ($(this).children().hasClass('tab-contents')) {
			$cont = $(this).children('.tab-contents');
		}

		if ($cont.length <= 1) $only = true;

		$li.each(function() {
			// (콘텐츠가 1개 이상)탭버튼 속성,설정
			$(this).on('click', function() {
				$li.removeClass('active');
				$li.attr('aria-selected','false');
				$(this).addClass('active');
				$(this).attr('aria-selected','true');
				
				if (!$only) {
					$cont.removeClass('active');
					// 콘텐츠 1개이상 콘텐츠 내용 변경
					$cont.eq($(this).parent().index()).addClass('active');
				} else {
					// 콘텐츠 1개일때 콘텐츠 속성설정 (내용변동없음)
					$cont.eq(0).attr('aria-labelledby',$(this).attr('id'));
					$cont.eq(0).attr('id',$(this).attr('aria-controls'));
				}

			});
		})
		// for (var j = 0; j < $li.length; j++) {
		// }

	}); // each

	/*
	const tabMenu = $('.ui-tab');
	tabMenu.each(function(index, element) {
		var $nav = $(element).first().children(),
			$li = $nav.find('[role="tab"]'),
			$cont = [],
			$only = false;

		for (var i = 0; i < $(element).children().length; i++) {
			if ($(element).children().hasClass('tab-contents')) {
				$cont = $(element).children('.tab-contents');
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
					$cont.eq(0).attr('aria-labelledby',$(this).attr('id'));
					$cont.eq(0).attr('id',$(this).attr('aria-controls'));
				}
			});
		}

	}); // each */
	// //tab

	// tooltip
	const tooltip = $('.ui-tooltip');
	tooltip.each(function() {
		var _this = $(this);
		var tooltipOpen = _this.children('.btn-tooltip-open');

		tooltipOpen.on('click', function() {
			// console.log($(this))
			if (_this.hasClass('active')) {
				_this.removeClass('active');
			} else {
				tooltip.each(function() {
					$(this).removeClass('active');
					_this.addClass('active')
				})
			}
		})
	})

	body.on('click', clickBodyTooltip);
	function clickBodyTooltip(e) {
		var tooltipOpen = $('.btn-tooltip-open')
		var _target = $(e.target).attr('aria-controls')
		tooltipOpen.each(function() {
			var $cont = $(this).attr('aria-controls')
			if ($cont == _target) {
				return;
			} else {
				$(this).parent().removeClass('active')
			}
		})
	}
	/*
	const tooltip = $('.ui-tooltip');
	tooltip.each(function(index, element) {
		// find(자식+손자 태그에서 검색) , children(자식태그에서만)
		// element 의 자식중에 (손자X) 태그가 존재하면 find 말고 children으로 검색
		var $open = $(element).children('.btn-tooltip-open');
		
		$open.on('click', function() {
			if ($(element).hasClass('active')) {
				$(element).removeClass('active');
			} else {
				for (var i = 0; i < tooltip.length; i++) tooltip.eq(i).removeClass('active');
				$(element).addClass('active');
			}
		});
	});
 
	body.on('click', clickBodyTooltip);
	function clickBodyTooltip(e) {
		var _target = e.target,
			$open = $('.btn-tooltip-open');

		for (var i = 0; i < $open.length; i++) {
			if ($open.eq(i)[0] == _target) return;
			
			var tags = $open.eq(i).parent().find('*')[0];
			for (var j = 0; j < tags.length; j++) {
				if (tags.eq(j) == _target) return;
			}
		}
		for (var i = 0; i < tooltip.length; i++) tooltip.eq(i).removeClass('active');
	}*/
	// //tooltip

	// input file
	const inpFile = $('.input-wrap.file');
	inpFile.each(function(index, element) {
		$(element).children('input').on('change', function() {
			$(this).val() == undefined || $(this).val() == '' ? $(this).parent().removeClass('has-value') : $(this).parent().addClass('has-value');
		});
	});
	// //input file

	// font resize
	var defaultFont = 10;
	if ($('#fontResize').length > 0) {
		$('#fontResize').on('click', function() {
			$(':checked').length == true ? defaultFont = 12 : defaultFont = 10
			body.css('font-size',defaultFont + 'px');
			$('html').css('font-size',defaultFont + 'px');
		});
	}
}); 

	