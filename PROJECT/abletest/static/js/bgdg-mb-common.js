$(function(){ 
	// allmenu
	if ($('.ui-allmenu').length) {
		$(document).on('click', '.btn-allmenu', function() {
			$('.ui-allmenu').addClass('active');
			$('body').css('overflow','hidden');
		});
		$(document).on('click', '.ui-allmenu .btn-close', function() {
			$('.ui-allmenu').removeClass('active');
			$('body').css('overflow','auto');
		});

		$(document).on('click', '.ui-allmenu .gnb-wrap .depth1>a', function(e) {
			e.preventDefault();
			$(this).parent('.depth1').addClass('active').siblings().removeClass('active');
		})
	}

	
	// tab
	if ($('.tab-area').length) {
		$('.tab-area').each(function() {
			var tabSwipe = $(this),
					tabNav = tabSwipe.children('.tab-nav'),
					tabList = tabSwipe.find('li'),
					_scrollTarget = tabSwipe.find('li.active'),
					tabBtn = tabList.children('[role="tab"]'),
					tabCont = [];

			// 활성화 탭 공통(버튼형+링크형) 좌우 스크롤(처음 보이는 화면)
			function tabSwipingHandle(_active) {
				if (tabSwipe.outerWidth(true) < tabNav.prop('clientWidth')) {
					tabSwipe.scrollLeft(0)
					tabSwipe.hasClass('container-util') ? tabSwipe.scrollLeft(_active.offset().left - parseInt(tabSwipe.css('padding-left'))) : tabSwipe.scrollLeft(_active.offset().left - parseInt(tabSwipe.parents('.contents').css('padding-left')))
				}
			}
			tabSwipingHandle(_scrollTarget)
					
			// 버튼형 탭 기능 
			// @@ 링크형 탭은 기능이 들어가지 않습니다.(해당 탭에 class active 만 추가되는 형태입니다) @@
			tabBtn.each(function() {
				let _this = $(this),
						_scrollTarget = _this.parent('li');

				if (tabSwipe.hasClass('container-util')) { // 상단 고정 탭인 경우
					tabCont = tabSwipe.siblings('.contents').children('.tab-contents');
					tabClickHandle(tabCont);
				} else { // 콘텐츠 내부 탭인 경우
					tabCont = tabSwipe.siblings('.tab-contents');
					tabClickHandle(tabCont)
				}

				function tabClickHandle(cont) {
					let activeTarget = tabList.find('[aria-selected="true"]');
					cont.eq(activeTarget.parent('li').index()).fadeIn().siblings('.tab-contents').css('display','none');

					_this.on('click', function() {
						$(this).attr('aria-selected','true').parent().addClass('active').siblings().removeClass('active').children().attr('aria-selected','false');
						cont.eq($(this).parent('li').index()).fadeIn().siblings('.tab-contents').css('display','none');

						tabSwipingHandle(_scrollTarget)
					});
				};
			});
		})
	}

	//퀵배너 스크롤
	var $btn = $('.ui-btn.btn-top');
	$btn.on("click",function(e){
		e.preventDefault();
		$('html, body').animate({scrollTop:'0'}, 500);
	})
	
	if($(window).scroll(function(){ 
		if($(window).scrollTop() > 100){ 
			$btn.stop().animate({opacity:1},100).parent().stop().animate({height:'90px'},100);
		}else{
			$btn.stop().animate({opacity:0},100).parent().stop().animate({height:'40px'},100);
		}
	}))

	// 회사소개 스크롤이벤트
	if ($('.tip-area').length) {
		$('.tip-area').eq(0).addClass('active')
		function tipAreaEvent() {
			$('.tip-area').each(function() {
				let activeTop = $(this).offset().top - 129,
						scrollTop = $(window).scrollTop();

				scrollTop+129 <= activeTop -100 ? $(this).removeClass('active') : $(this).addClass('active');
				scrollTop >= $('.tip-area').eq(5).offset().top - 129 ? $('.tip-area').eq(6).addClass('active') : $('.tip-area').eq(6).removeClass('active');
			})
		}
		
		$(window).scroll(function() {
			tipAreaEvent()
		})
	}

	// 회사소개 swiper
	var swiper_intro01 = new Swiper ('.swiper-intro.type01 .swiper-container', {
		pagination: {
			el: ".intro-pagination.type01",
		},
	})

	var swiper_intro02 = new Swiper ('.swiper-intro.type02 .swiper-container', {
		pagination: {
			el: ".intro-pagination.type02",
		},
	})

	// TOP200상품안내 swiper
	var swiper_product = new Swiper ('.swiper-container.best-product', {
		slidesPerView: "auto",
		spaceBetween: -150,
		breakpoints: {
			500: {
				spaceBetween: -100,
			},
			435: {
				spaceBetween: -50,
			},
			385: {
				spaceBetween: 0,
			},
		},
	});

	// 영상센터 swiper
	var swiper_video = new Swiper ('.swiper-video .swiper-container', {
		spaceBetween: 12,
		loop: true,
		slidesPerView: 'auto',
		centeredSlides: true,
		pagination: {
			el: ".swiper-video .swiper-pagination",
			clickable:true
		},
	})

	// swiper 내부 iframe touchmove 오류
	if ($('.swiper-video').length) {
		$('body').attr('ontouchstart','')
	} else {
		$('body').removeAttr('ontouchstart')
	}


	// layer-popup swiper

	var thumbs = new Swiper ('.gallery-thumbs', {
		slidesPerView: 'auto',
		spaceBetween: 5,
		slideToClickedSlide: true,
		observer: true,
		observeParents: true,
		
	});

	var slider = new Swiper ('.gallery-slider', {
		slidesPerView: 1,
		centeredSlides: true,
		observer: true,
		observeParents: true,
		thumbs: {
			swiper:thumbs
		},
		on: {
			slideChangeTransitionEnd: function() {
				$('.gallery-thumbs .swiper-slide').removeClass('on');
				$('.gallery-thumbs .swiper-slide').eq(this.activeIndex).addClass('on');
				console.log(this.activeIndex)
			}
		}

		
	});


	// layer popup open & close
	$('.layer-modal-wrap > .bg-dim, .layer-modal').hide();

	$('.modal-bt').click(function(){
		$('.bg-dim, .layer-modal').stop().fadeIn();
	})

	$('.close-bt, .ico-close').click(function(){
		$('.bg-dim, .layer-modal').fadeOut();
	})
	

	// select popup open & close
	// $('.select-box > .bg-dim, .select-wrap').hide();

	// $('.select-open').click(function(){
	// 	$('.bg-dim, .select-wrap').stop().fadeIn();
	// })

	// $('.ico-close').click(function(){
	// 	$('.bg-dim, .select-wrap').fadeOut();
	// })

	// 숫자 카운팅
	$('.store-num .nums').each(function () {
		const $this = $(this),
			countTo = $this.attr('data-count');

		$({countNum: $this.text()}).animate({
			countNum: countTo
		}, 
		{
			duration: 3000,
			easing: 'linear',
			step: function () {
				$this.text(Math.floor(this.countNum));
			},
			complete: function () {
				$this.text(this.countNum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','));
			}
		});
	});

	// AOS plugin
	if ($('*[data-aos]').length) {
		AOS.init();
	}
})

// modal - confirm
let modal = document.querySelector("#confirm01");

let btn = document.querySelectorAll(".modal-open");

let closeModal = document.getElementsByClassName("modal-close")[0];

for (let i = 0; i < btn.length; i++) {
	btn[i].addEventListener("click", function () {
		modal.style.display = "block";
	});

	btn.onclick = function () {
		modal.style.display = "block";
	};

	closeModal.onclick = function () {
		modal.style.display = "none";
	};
};

