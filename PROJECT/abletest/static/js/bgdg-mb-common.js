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

		$(document).on('click', '.ui-allmenu .gnb-wrap .depth1', function(e) {
			e.preventDefault();
			$(this).addClass('active').siblings().removeClass('active');
		})
	}

	
	// tab
	if ($('.tab-nav [role="tab"]').length) {
		$('.tab-area').each(function() {
			var tabNav = $(this).find('.tab-nav'),
				tabList = tabNav.find('[role="tab"]'),
				tabCont = [],
				_this = $(this);

			// 상단 고정탭일때 콘텐츠
			if ($(this).siblings('.contents').children('.tab-contents').length) {
				tabCont = $(this).siblings('.contents').children('.tab-contents');
				
				let id = $(this).find($('.tab-nav [aria-selected="true"]')).attr('aria-controls');
				
			$(this).siblings('.contents').children('.tab-contents').css('display',"none").siblings('#' + id).css('display','block');
			tabHandle(tabCont,_this);
			}

			// 콘텐츠 내부 탭일때 콘텐츠
			if ($(this).siblings('.tab-contents').length) {
				tabCont = $(this).siblings('.tab-contents');
				
				let id = _this.find($('.tab-nav [aria-selected="true"]')).attr('aria-controls');
				$(this).siblings('.tab-contents').css('display',"none").siblings('#' + id).css('display','block');
				tabHandle(tabCont,_this);
			}

			function tabHandle(tabCont,_this) {
				tabList.each(function() {
					$(this).on('click', function() {
						$(this).parent().addClass('active').siblings().removeClass('active');
						tabCont.css('display',"none").eq($(this).parent().index()).fadeIn();
						tabList.attr('aria-selected', 'false');
						$(this).attr('aria-selected','true');
					})
				})
			}
		});
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

	// 영상센터 swiper
	var swiper_video = new Swiper ('.swiper-video .swiper-container', {
		spaceBetween: 12,
		loop: true,
		slidesPerView: 'auto',
		centeredSlides: true,
		pagination: {
			el: ".swiper-video .swiper-pagination",
		},
	})


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

