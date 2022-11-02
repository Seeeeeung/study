"use strict";

// ie closest Polyfill
if(!Element.prototype.matches) Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
if(!Element.prototype.closest){
	Element.prototype.closest = function(s) {
		var el = this;
		do {
			if (Element.prototype.matches.call(el, s)) return el;
			el = el.parentElement || el.parentNode;
		}while (el !== null && el.nodeType === 1);
		return null;
	};
}

// getElementIndex
function getElementIndex(e, range){
	if (!!range) return [].indexOf.call(e, range);
	return [].indexOf.call(e.parentNode.children, e);
}

const body = document.querySelector("body");
var scrollT;
var bodyScroll = {
	open : function(){
		setTimeout(function(){
			scrollT = window.scrollY;
			body.classList.add("no-scroll");
			body.style.top = -scrollT+"px";
		},100)
	},
	close: function(){
		if(!document.querySelector('.ui-layer.active') && !document.querySelector('.ui-layer.active')){
			body.classList.remove("no-scroll");
			body.style.top = null;
			window.scrollTo(0, scrollT);
		}
	}
}

// 전체메뉴
const allMenuBtn = document.querySelector(".ui-header .btn-allmenu");
if(allMenuBtn){
	var allMenu = document.querySelector(".ui-allmenu");

	// 전체메뉴 열기
	allMenuBtn.addEventListener("click", function(){
		document.querySelector(".ui-header").classList.add('active');
		allMenu.classList.add("active");
		bodyScroll.open();
	})

	// 전체메뉴 닫기
	document.querySelector(".ui-allmenu .btn-close").addEventListener("click", function(){
		setTimeout(function(){
			document.querySelector(".ui-header").classList.remove('active');
		}, 200);
		allMenu.classList.remove("active");
		bodyScroll.close();
	})

	// 전체메뉴 tab / scroll
	if(allMenu.querySelector(".gnb-wrap")){
		var gnb = allMenu.querySelector(".gnb-wrap"),
			bookmark = gnb.querySelector(".gnb-tab"),
			bmInner = bookmark.querySelector(".tab-inner"),
			bmBtn = bookmark.querySelectorAll(".gnb-tab a"),
			sections = gnb.querySelectorAll(".gnb-list li[id]"),
			fixHeight;

		window.onload = function(e){
			if(allMenu.querySelector(".input-search")) allMenu.querySelector(".input-search").offsetHeight
			else fixHeight = bookmark.offsetHeight + allMenu.querySelector(".btn-group").offsetHeight
		};

		[].forEach.call(gnb.querySelectorAll(".gnb-list a"), function(e){
			e.addEventListener("click", function(e){
				if(e.currentTarget.nextElementSibling != null){
					e.preventDefault();
					e.currentTarget.parentNode.classList.toggle('active');
				}
			});
		});

		[].forEach.call(bookmark.querySelectorAll("button"), function(e){
			e.addEventListener("click", function(){
				var cls = this.classList;
				switch(true){
					case cls.contains("prev"):
						bmInner.scrollLeft -= bookmark.clientWidth;
						break;
					case cls.contains("next"):
						bmInner.scrollLeft += bookmark.clientWidth;
						break;
				}

				tabScrollX();
			});
		});

		for (var i = 0; i < bmBtn.length; i++){
			bmBtn[i].addEventListener("click", function(e){
				e.preventDefault();

				var linkiId = e.currentTarget.getAttribute("href").split("#")[1];

				[].forEach.call(bmInner.querySelectorAll("a"), function(ele){ele.classList.remove("active")})

				e.currentTarget.classList.add("active");
				bmInner.scrollLeft = e.currentTarget.offsetLeft - parseInt(window.getComputedStyle(bmInner).getPropertyValue('padding-left'));
				allMenu.scrollTop = gnb.querySelector(".gnb-list li[id*=" + linkiId + "]").offsetTop - fixHeight + 1;
			});
		}

		function tabScrollX(){
			bmInner.scrollLeft == 0 ? bookmark.querySelector('.prev').classList.add('hide') : bookmark.querySelector('.prev').classList.remove('hide');
			bmInner.scrollLeft == bmInner.scrollWidth - bmInner.clientWidth ? bookmark.querySelector('.next').classList.add('hide') : bookmark.querySelector('.next').classList.remove('hide');
		}

		function navHighlighter(){
			var scrollY = allMenu.scrollTop;

			scrollY >= gnb.offsetTop - (fixHeight - bookmark.offsetHeight) ? bookmark.classList.add("active") : bookmark.classList.remove("active");

			[].forEach.call(sections, function(active){
				var sectionHeight = active.offsetHeight,
					sectionTop = active.offsetTop - fixHeight,
					sectionId = active.getAttribute("id");

				if (scrollY < gnb.offsetTop){
					bmInner.firstElementChild.classList.add("active");

				}else if (scrollY > sectionTop - 15 && scrollY <= sectionTop + sectionHeight + 15){
					gnb.querySelector(".gnb-tab a[href*=" + sectionId + "]").classList.add("active");
					bmInner.scrollLeft = gnb.querySelector(".gnb-tab a.active").offsetLeft - parseInt(window.getComputedStyle(bmInner).getPropertyValue('padding-left'));

				}else{
					gnb.querySelector(".gnb-tab a[href*=" + sectionId + "]").classList.remove("active");
				}
			});

			tabScrollX();
		}

		bmInner.addEventListener("scroll", tabScrollX);
		allMenu.addEventListener("scroll", navHighlighter);
	}
}

// ui-accordion
const accordion = document.querySelectorAll(".ui-accordion");
[].forEach.call(accordion, function(e){
	var $this = e,
		$btn = $this.querySelectorAll(".btn-toggle"),
		$cont = $this.querySelectorAll(".toggle-target");
		// console.log($this)

	//var notToggle = $this.classList.contains("not-toggle") ? false : true;

	function btnClickEvt(i){
		$btn[i].addEventListener("click", function(el){
			// console.log(el.currentTarget)
			if(el.currentTarget.classList.contains("active")){
				el.currentTarget.classList.remove("active");
				el.currentTarget.setAttribute("aria-expanded","false");
				$cont[i].classList.remove("active");
			}else{
				/*if(notToggle){
					for(var k = 0; k < $btn.length; k++){
						$btn[k].classList.remove("active");
						$btn[k].setAttribute("aria-expanded","false");
						$cont[k].classList.remove("active");
					}
				}*/
				el.currentTarget.classList.add("active");
				el.currentTarget.setAttribute("aria-expanded","true");
				$cont[i].classList.add("active");
			}
		});
	}
	for(var i = 0; i < $btn.length; i++) btnClickEvt(i)
});

// ui-confirm
const confirm = document.querySelectorAll(".btn-confirm-open");
[].forEach.call(confirm, function(e,index){
	e.addEventListener("click", function(){
		var $layer = document.querySelectorAll(".ui-confirm:not(.auto)");
		$layer[index].classList.add('active');
		bodyScroll.open();
	})
});
function confirmClose(e){
	e.closest(".ui-confirm").classList.remove("active");
	bodyScroll.close();
}

// text field
const inp = document.querySelectorAll(".input-wrap");
[].forEach.call(inp, function(e){
	var $delete = e.querySelector(".btn-del"),
		$inp = e.querySelectorAll(".ui-input");

//	if(e.previousElementSibling && e.previousElementSibling.classList.contains("inp-label")){
		for(var i = 0; i < $inp.length; i++){
			$inp[i].onfocus = function(){
				if(this.closest(".input-wrap").parentNode.querySelector('.inp-label')) this.closest(".input-wrap").parentNode.querySelector('.inp-label').classList.add("on")
			}

			$inp[i].onblur = function(){
				if(this.closest(".input-wrap").parentNode.querySelector('.inp-label')) this.closest(".input-wrap").parentNode.querySelector('.inp-label').classList.remove("on")
			}
		}

	if($delete){
		$delete.addEventListener("click", function(){
			this.closest('.input-wrap').querySelector(".ui-input").value = "";
			this.closest('.input-wrap').querySelector(".ui-input").focus();
		})

		$delete.addEventListener("mousedown", deleteFocus);
		$delete.addEventListener("focus", deleteFocus);
	}
	function deleteFocus(){
		if(e.previousElementSibling && e.previousElementSibling.classList.contains("inp-label")){
			console.log(e.previousElementSibling)
			console.log(e.previousElementSibling.classList.contains("inp-label"))
			setTimeout(function(){
				$delete.parentNode.previousElementSibling.classList.add("on");
			},0)
		}
	}
});

// textarea
const textArea = document.querySelectorAll(".ui-textarea");
[].forEach.call(textArea, function(e){
	var $textArea = e.querySelector("textarea");

	//if($textArea.value !== "") e.classList.add("on");

	$textArea.onfocus = function(){
		e.classList.add("on");
		if(e.previousElementSibling && e.previousElementSibling.classList.contains("inp-label")) this.parentNode.previousElementSibling.classList.add("on");
	}

	$textArea.onblur = function(){
		//$textArea.value !== "" ? e.classList.add("on") : e.classList.remove("on");
		e.classList.remove("on");
		if(e.previousElementSibling && e.previousElementSibling.classList.contains("inp-label")) this.parentNode.previousElementSibling.classList.remove("on");
	}
});

// selectbox
const selectOpen = document.querySelectorAll(".btn-select-open");
[].forEach.call(selectOpen, function(e){
	var $this = e,
		$layer = $this.parentNode;

	$this.addEventListener("click", function(){
		$layer.classList.add("active");
		//bodyScroll.open()
	});
	
	var $btn = $layer.querySelectorAll(".select-list button");
	for(var i = 0; i < $btn.length; i++){
		$btn[i].addEventListener("click", function(el){
			if(this.closest('.select-list').parentNode.classList.contains('select-wrap')){
				if(this.closest(".select-list").querySelector(".active")) this.closest(".select-list").querySelector(".active").classList.remove("active");
				el.currentTarget.classList.add("active");
				$this.innerText = this.innerText;
				$this.classList.add("has-value");
				console.log(el.currentTarget)
			}
		});
	}
});
function selectClose(e){
	e.closest(".ui-selectbox").classList.remove("active");
	//bodyScroll.close();
}

// layer popup (bottom sheet)
const layerOpen = document.querySelectorAll(".btn-layer-open");
[].forEach.call(layerOpen, function(e){
	var $this = e,
		$layer = $this.parentNode,
		$close = $this.nextElementSibling.lastElementChild;
		//$close = $layer.querySelector(".btn-layer-close");

	$this.addEventListener("click", function(){
		$layer.classList.add("active");
		bodyScroll.open();
	});

	var $btn = $layer.querySelectorAll(".select-list button");
	for(var i = 0; i < $btn.length; i++){
		$btn[i].addEventListener("click", function(el){
			if(this.closest('.select-list').parentNode.classList.contains('layer-contents')){
				console.log(this.closest(".select-list").querySelector(".active"))
				if(this.closest(".select-list").querySelector(".active")) this.closest(".select-list").querySelector(".active").classList.remove("active");
				el.currentTarget.classList.add("active");
				$this.innerText = this.innerText;
				$this.classList.add("has-value");
			}
		});
	}

	$close.addEventListener("click", function(){
		this.closest(".ui-layer.active").classList.remove("active");
		bodyScroll.close();
	});
});
[].forEach.call(document.querySelectorAll(".ui-layer.auto"), function(e){
	if(e.classList.contains('active')){
		bodyScroll.open();
		var $close = e.firstElementChild.lastElementChild;

		$close.addEventListener("click", function(){
			e.classList.remove("active");
			bodyScroll.close();
		});
	}
})

/* full popup
const popupOpen = document.querySelectorAll(".btn-popup-open");
[].forEach.call(popupOpen, function(e){
	var $this = e,
		$layer = $this.parentNode,
		$close = $layer.querySelector(".btn-layer-close");
	

	$this.addEventListener("click", function(){
		$layer.classList.add("active");
		bodyScroll.open();
	});

	$close.addEventListener("click", function(){
		$layer.classList.remove("active");
		bodyScroll.close();
	});
});*/

// tab
const tabMenu = document.querySelectorAll(".ui-tab");
[].forEach.call(tabMenu , function(e){
	var $nav = e.firstElementChild,
		$li = $nav.querySelectorAll("[role='tab']"),
		$cont = [],
		$only = false;

		// console.log($nav)
		// console.log(e.childNodes)
		for(var i = 0; i < e.childNodes.length; i++) { // 해당 엘리먼트의 모든 노드 검색
			// console.log(e.childNodes[i].nodeType) // 텍스트가 아닌 엘리먼트 찾기, 
			// console.log(e.childNodes[i].nodeType === 1 && e.childNodes[i].className.indexOf('tab-contents'), 'indexof') // 노드중에 tab contents 인 엘리먼트 찾기
			if(e.childNodes[i].nodeType === 1 && e.childNodes[i].className.indexOf("tab-contents") !== -1) $cont.push(e.childNodes[i]);
			// console.log($cont) // 
			//찾으면 그 대상을 새로만든 배열 $cont 안에 넣기
	}

	if($cont.length<=1) $only = true;
	// console.log($cont.length,'length')

	for(var j = 0; j < $li.length; j++){
		// console.log(j)
		$li[j].addEventListener("click", function(el){
			for(var k = 0; k < $li.length; k++){
				$li[k].classList.remove("active");
				// console.log($li[k]) // 클릭한 리스트+같이있는 리스트
				$li[k].setAttribute("aria-selected","false");
				if(!$only) $cont[k].classList.remove("active");
			}
			// console.log(el.currentTarget,'0000000000')
			el.currentTarget.classList.add("active"); // 클릭한 버튼에 추가
			el.currentTarget.setAttribute("aria-selected","true");
			if(!$only){
				$cont[getElementIndex(el.target.parentNode)].classList.add("active"); // 클릭한 버튼의 리스트에 클래스 추가
			}else{
				// console.log($cont[0],'cont 0')
				// console.log(el.currentTarget,'target')
				$cont[0].setAttribute("aria-labelledby", el.currentTarget.getAttribute("id")); // 콘텐츠가 1개 일때 이 콘텐츠의 aria-label 을 클릭한 버튼의 아이디 값으로 변경
				$cont[0].setAttribute("id", el.currentTarget.getAttribute("aria-controls")); // 위와 동일한 콘텐츠의 id 값을 클릭한 버튼의 aria controls 로 변경
			}
		});
	}
})

// tooltip
const tooltip = document.querySelectorAll(".ui-tooltip");
[].forEach.call(tooltip, function(e){
	var $open = e.querySelector(".btn-tooltip-open");
	console.log($open)

	$open.addEventListener("click", function(){
		console.log(e)
		if(e.classList.contains("active")){
			e.classList.remove("active");
		}else{
			for(var i = 0; i < tooltip.length; i++) tooltip[i].classList.remove("active");
			e.classList.add("active");
			console.log(tooltip[i],e)
		}
	});
});

body.addEventListener("click", clickBodyTooltip);
// 분리시킨 이유는..?
function clickBodyTooltip(e){
	var _target = e.target;
	var $open = document.querySelectorAll(".btn-tooltip-open");
	
	for(var i = 0; i < $open.length; i++){
		// console.log($open[i],'open')
		console.log($open[i]==_target,'open')
		// console.log(_target,'target')
		if($open[i] == _target) return;
		
		var tags = $open[i].parentNode.getElementsByTagName("*");
		console.log(tags[j])
		for(var j=0; j < tags.length; j++){ 
			console.log(tags[j]==_target,'00')
			
			if(tags[j] == _target ) return;}
	}
	for(var i = 0; i < tooltip.length; i++) tooltip[i].classList.remove("active");
}

// input file
const inpFile = document.querySelectorAll(".input-wrap.file");
[].forEach.call(inpFile, function(e){
	e.querySelector('input').onchange= function(el){
		console.log(this.files[0])
		this.files[0] == undefined || this.value == "" ? this.parentNode.classList.remove('has-value') : this.parentNode.classList.add('has-value')
	}
})

// font resize
var defaultFont = 10;
if(document.querySelector("#fontResize")){
	document.querySelector("#fontResize").addEventListener("click", function(){
		this.checked == true ? defaultFont = 12 : defaultFont = 10
		body.style.fontSize = defaultFont+"px"
		document.querySelector("html").style.fontSize = defaultFont+"px"
	})
}