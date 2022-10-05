'use strict';

// dispatchEvent ie polyfill
(function () {
	if ( typeof window.CustomEvent === 'function' ) return false; //If not IE
	
	function CustomEvent ( event, params ) {
		params = params || { bubbles: false, cancelable: false, detail: undefined};
		var evt = document.createEvent( 'CustomEvent' );
		evt.initCustomEvent( event, params.bubbles, params.cancelable, params.detail );
		return evt;
	}
	
	CustomEvent.prototype = window.Event.prototype;
	window.CustomEvent = CustomEvent;
})();

// forEach ie polyfill
if ('NodeList' in window && !NodeList.prototype.forEach) {
	NodeList.prototype.forEach = function (callback, thisArg) {
		thisArg = thisArg || window;
		for (var i = 0; i < this.length; i++) {
		callback.call(thisArg, this[i], i, this);
		}
	};
}


(function($){
	$.fn.extend({
		// S : fn_datepicker
		fn_datepicker : function(options){
			var defaults = {};
			var opts = $.extend(defaults, options);
			return this.each(function(){
				var $this = $(this),
					range = $this.attr('data-range'),
					from = $this.attr('data-from'),
					to = $this.attr('data-to'),
					minDate, maxDate, $elm, optDate,
					enableDates = opts.enableDates,
					onSelect = opts.onSelect;

				var dateOptions = {
					dafaultDate : new Date(),
					showMonthAfterYear : true,
					showOtherMonths : true,
					changeYear : true,
					changeMonth : true,
					yearRange : '1940 : +10',
					ignoreReadonly : true,
					showOn : 'button',
					buttonText : '날짜 선택',
					showButtonPanel : true,
					onClose : function(dateText, inst){
						$(inst.trigger).focus();
						dpAccessibility.closeCalendar(inst);

						if($elm !== undefined) $elm.datepicker('option', optDate, dateText);
					},
					beforeShow : function(input, inst){
						dpAccessibility.openCalendar(input, inst);
					}
				}
				if($this.attr('disabled') || $this.attr('readonly')) dateOptions.disabled = true

				if(range !== undefined && $.trim(range) != ''){
					var arrRange = range.split(',')
					dateOptions.minDate =$.trim(arrRange[0]);
					dateOptions.maxDate =$.trim(arrRange[1]);
				}

				if(from !== undefined && $.trim(from) != ''){
					$elm = $this.parent().addClass('items').closest('.date-picker').find($('[data-to]'));
					optDate = 'minDate';
				}

				if(to !== undefined && $.trim(to) != ''){
					$elm = $this.parent().addClass('items').closest('.date-picker').find('[data-from]');
					optDate = 'maxDate';
				}

				if(enableDates !== undefined){
					dateOptions.beforeShowDay = function(d){
						var dmy = d.getMonth() + 1;
						if(d.getMonth() < 9) dmy = '0' + dmy;
						dmy += '-';

						if(d.getDate()<10) dmy += '0';
						dmy = d.getFullYear() + '-' + dmy + d.getDate();

						if($.inArray(dmy, enableDates) != -1){
							return [true, 'ui-datepicker-current-day'];
						}else{
							return [false, ''];
						}
					}
				}

				if(onSelect !== undefined) dateOptions.onSelect = onSelect;

				var now = new Date(),
					day = ('0' + now.getDate()).slice(-2),
					month = ('0' + (now.getMonth() + 1)).slice(-2),
					today = now.getFullYear()+'-'+(month)+'-'+(day);

				//$this.val(today); // today default setting

				$.datepicker.regional['ko']={
					closeText:'닫기',
					prevText:'이전달',
					nextText:'다음달',
					currentText:'오늘',
					monthNames:['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
					monthNamesShort:['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
					dayNames:['일','월','화','수','목','금','토'],
					dayNamesShort:['일','월','화','수','목','금','토'],
					dayNamesMin:['일','월','화','수','목','금','토'],
					weekHeader:'Wk',
					dateFormat:'yy-mm-dd',
					firstDay:0,
				}

				$.datepicker.setDefaults($.datepicker.regional['ko']);
				$this.attr({'maxlength':'10','numberOnly':''}).datepicker('destroy').datepicker(dateOptions);
				if($this.attr('readonly')) $this.removeAttr('disabled').next().removeAttr('disabled').attr('readonly', true);

				$.datepicker._gotoToday = function(id){
					var target = $(id);
					var inst = this._getInst(target[0]);
					if(this._get(inst, 'gotoCurrent') && inst.currentDay){
						inst.selectedDay = inst.currentDay;
						inst.drawMonth = inst.selectedMonth = inst.currentMonth;
						inst.drawYear = inst.selectedYear = inst.currentYear;
					}else{
						var date = new Date();
						inst.selectedDay = date.getDate();
						inst.drawMonth = inst.selectedMonth = date.getMonth();
						inst.drawYear = inst.selectedYear = date.getFullYear();
						this._setDateDatepicker(target, date);
						this._selectDate(id, this._getDateDatepicker(target));
					}
					this._notifyChange(inst);
					this._adjustDate(target);

					this._setDateDatepicker(target, new Date());
					this._selectDate(id, this._getDateDatepicker(target));
				}

				$.datepicker._selectMonthYear = function(id, select, period){
					var target = $(id),
						inst = this._getInst(target[0]);

					inst['selected' + (period === 'M' ? 'Month' : 'Year')] =
					inst['draw' + (period === 'M' ? 'Month' : 'Year')] =
					parseInt(select.options[select.selectedIndex].value, 10);

					this._notifyChange(inst);
					this._adjustDate(target);

					period == 'Y' ? $('.ui-datepicker-year').focus() : $('.ui-datepicker-month').focus();
					$('.ui-datepicker-year').attr({'title':'연도 선택', 'data-select':inst.selectedYear});
					$('.ui-datepicker-month').attr({'title':'월 선택', 'data-select':inst.selectedMonth+1+'월'});
					$('.ui-datepicker-header a').attr({'role':'button','href':'javascript:void(0)'});
					dpAccessibility.prepHighlightState();
				}

				$this.on('keypress keyup', function(e){
					if(e.which < 48 || e.which > 57) e.preventDefault();
					this.value = this.value.replace(/[\ㄱ-ㅎㅏ-ㅣ가-힣]/g, '');
					var num_arr = [97, 98, 99, 100, 101, 102, 103, 104, 105, 96,48, 49, 50, 51, 52, 53, 54, 55, 56, 57];
					var key_code = (e.which) ? e.which : e.keyCode;
					if(num_arr.indexOf(Number(key_code)) != -1) if(this.value.length == 4 || this.value.length == 7) this.value += "-";
				});
			});
		},// E : fn_datepicker
	});
})(jQuery);

// S : datepicker 웹접근성
var dpAccessibility = {
	openCalendar : function(input, inst){
		$(inst.trigger).focus();
		$(inst.input).attr('disabled','disabled');
		setTimeout(function(){
			$(inst.input).removeAttr('disabled');
			var tabIdx = $(inst.dpDiv).find('a');
			tabIdx.each(function(){$(this).attr('tabindex','-1')});

			$('.ui-state-highlight').removeClass('ui-state-highlight');
			$('.ui-state-active').addClass('ui-state-highlight');

			if($('.ui-datepicker-today').lenght > 0) $('.ui-datepicker-today').hasClass('ui-state-disabled') ? $('.ui-datepicker-days-cell-over a').addClass('ui-state-highlight') : $('.ui-datepicker-today a').addClass('ui-state-highlight ui-state-active');
			else $('.ui-datepicker-days-cell-over a').addClass('ui-state-highlight');

			var today = $('.ui-datepicker-current-day a')[0];

			if(!today) today = $('.ui-datepicker-days-cell-over a')[0] || $('.ui-state-active')[0] || $('.ui-state-default')[0];
			else if($(inst.dpDiv).hasClass('onlyMonth')) today = $('.ui-datepicker-year')[0];

			today.focus();
			dpAccessibility.datePickHandler(inst);

			$(document).on('click', '.ui-datepicker-prev, .ui-datepicker-next', function(e){
				dpAccessibility.updateHeaderElements()
				$(e.target).hasClass('ui-datepicker-prev') || $(e.target).parent().hasClass('ui-datepicker-prev') ? dpAccessibility.handlePrevClicks() : dpAccessibility.handleNextClicks();
			});
		},0);
	},

	closeCalendar : function(inst){
		$(inst.dpDiv).off('keydown');
		var tabIdx = $(inst.dpDiv).find('a');
		tabIdx.each(function(){$(this).removeAttr('tabindex')});
	},

	datePickHandler : function(inst){
		var activeDate;
		var container = $(inst.dpDiv);
		var input = $('.datepicker, datepicker-month');

		if(!container || !input) return;

		container.attr({'role':'application', 'aria-label':'Calendar view date-picker'});

		var prev = $('.ui-datepicker-prev', container)[0];
		var next = $('.ui-datepicker-next', container)[0];

		next.href = 'javascript:void(0)';
		prev.href = 'javascript:void(0)';

		next.setAttribute('role', 'button');
		prev.setAttribute('role', 'button');

		dpAccessibility.appendOffscreenMonthText(next);
		dpAccessibility.appendOffscreenMonthText(prev);

		dpAccessibility.monthDayYearText();

		$(container).on('keydown', function calendarKeyboardListener(keyVent){
			var which = keyVent.which;
			var target = keyVent.target;
			var dateCurrent = dpAccessibility.getCurrentDate(container);
		
			if(!dateCurrent){
				dateCurrent = $('a.ui-state-default')[0];
				dpAccessibility.setHighlightState(dateCurrent, container);
			}

			if(27 === which){
				keyVent.stopPropagation();
				return $('.ui-datepicker-close').trigger('click');

			}else if(which === 9 && keyVent.shiftKey){ // SHIFT + TAB
				keyVent.preventDefault();
				if($(target).hasClass('ui-priority-secondary')){
					if($('.ui-datepicker-current-day').length>0){
						$('.ui-datepicker-current-day a')[0].focus();
						$('.ui-datepicker-current-day a').attr('tabindex','-1');
					}else{
						$('.ui-state-highlight')[0].focus();
						$('.ui-state-highlight').attr('tabindex','-1');
					}

				}else if($(target).hasClass('ui-datepicker-close')){
					if($('.ui-priority-secondary').length>0){
						$('.ui-priority-secondary')[0].focus();
					}else{
						if($('.ui-datepicker-current-day').length>0){
							$('.ui-datepicker-current-day a')[0].focus();
							$('.ui-datepicker-current-day a').attr('tabindex','-1');
						}else{
							$('.ui-state-highlight')[0].focus();
							$('.ui-state-highlight').attr('tabindex','-1');
						}
					}

				}else if($(target).hasClass('ui-state-default')){
					$('.ui-datepicker-next').attr('tabindex','-1').focus();

				}else if($(target).hasClass('ui-datepicker-year')){
					$('#ui-datepicker-div').hasClass('onlyMonth') ? activeDate = $('.ui-datepicker-close')[0] : activeDate = $('.ui-state-highlight') || $('.ui-state-active')[0];
					if(activeDate) $('.ui-datepicker-prev').attr('tabindex','-1').focus();

				}else if($(target).hasClass('ui-datepicker-month')){
					$('.ui-datepicker-year')[0].focus();

				}else if($(target).hasClass('ui-datepicker-prev')){
					$('.ui-datepicker-close')[0].focus();

				}else if($(target).hasClass('ui-datepicker-next')){
					$('.ui-datepicker-month')[0].focus();
				}

			}else if(which === 9){ // TAB
				keyVent.preventDefault();
				if($(target).hasClass('ui-priority-secondary')){
					$('.ui-datepicker-close')[0].focus();

				}else if($(target).hasClass('ui-datepicker-close')){
					$('#ui-datepicker-div').hasClass('onlyMonth') ? activeDate = $('.ui-datepicker-year')[0] : activeDate = $('.ui-state-highlight') || $('.ui-state-active')[0];
					if(activeDate) $('.ui-datepicker-prev').attr('tabindex','-1').focus();

				}else if($(target).hasClass('ui-state-default')){
					$('.ui-priority-secondary').length>0 ? $('.ui-priority-secondary')[0].focus() : $('.ui-datepicker-close')[0].focus();

				}else if($(target).hasClass('ui-datepicker-prev')){
					$('.ui-datepicker-year')[0].focus();

				}else if($(target).hasClass('ui-datepicker-year')){
					$('.ui-datepicker-month')[0].focus();

				}else if($(target).hasClass('ui-datepicker-month')){
					$('.ui-datepicker-next').attr('tabindex','-1').focus();

				}else if($(target).hasClass('ui-datepicker-next')){
					if($('.ui-datepicker-current-day').length>0){
						$('.ui-datepicker-current-day a')[0].focus();
						$('.ui-datepicker-current-day a').attr('tabindex','-1');
					}else{
						$('.ui-state-highlight')[0].focus();
						$('.ui-state-highlight').attr('tabindex','-1');
					}
				}

			}else if(which === 37){ // LEFT arrow key
				if(!$(target).hasClass('ui-datepicker-close') && $(target).hasClass('ui-state-default') && !$(target).hasClass('ui-priority-secondary')){
					keyVent.preventDefault();
					dpAccessibility.previousDay(target);
				}
			}else if(which === 39){ // RIGHT arrow key
				if(!$(target).hasClass('ui-datepicker-close') && $(target).hasClass('ui-state-default') && !$(target).hasClass('ui-priority-secondary')){
					keyVent.preventDefault();
					dpAccessibility.nextDay(target);
				}
			}else if(which === 38){ // UP arrow key
				if(!$(target).hasClass('ui-datepicker-close') && $(target).hasClass('ui-state-default') && !$(target).hasClass('ui-priority-secondary')){
					keyVent.preventDefault();
					dpAccessibility.upHandler(target, container, prev);
				}
			}else if(which === 40){ // DOWN arrow key
				if(!$(target).hasClass('ui-datepicker-close') && $(target).hasClass('ui-state-default') && !$(target).hasClass('ui-priority-secondary')){
					keyVent.preventDefault();
					dpAccessibility.downHandler(target, container, next);
				}
			}else if(which === 13){ // ENTER
				if($(target).hasClass('ui-datepicker-prev')){
					dpAccessibility.handlePrevClicks();
				}else if($(target).hasClass('ui-datepicker-next')){
					dpAccessibility.handleNextClicks();
				}
			}else if(32 === which){
				if($(target).hasClass('ui-datepicker-prev') || $(target).hasClass('ui-datepicker-next')){
					target.click();
				}
			}else if(33 === which){ // PAGE UP
				keyVent.preventDefault();
				dpAccessibility.moveOneMonth(target, 'prev');
			}else if(34 === which){ // PAGE DOWN
				keyVent.preventDefault();
				dpAccessibility.moveOneMonth(target, 'next');
			}else if(36 === which){ // HOME
				keyVent.preventDefault();
				var firstOfMonth = $(target).closest('tbody').find('a.ui-state-default')[0];
				if(firstOfMonth){
					$(firstOfMonth).attr('tabindex','-1').focus();
					dpAccessibility.setHighlightState(firstOfMonth, $('#ui-datepicker-div')[0]);
				}
			}else if(35 === which){ // END
				keyVent.preventDefault();
				var $daysOfMonth = $(target).closest('tbody').find('a.ui-state-default');
				var lastDay = $daysOfMonth[$daysOfMonth.length - 1];
				if(lastDay){
					$(lastDay).attr('tabindex','-1').focus();
					dpAccessibility.setHighlightState(lastDay, $('#ui-datepicker-div')[0]);
				}
			}
		});
	},
	
	moveOneMonth : function(currentDate, dir){
		var button = (dir === 'next') ? $('.ui-datepicker-next')[0] : $('.ui-datepicker-prev')[0];

		if(!button) return;

		var ENABLED_SELECTOR = '#ui-datepicker-div tbody td:not(.ui-state-disabled)';
		var $currentCells = $(ENABLED_SELECTOR);
		var currentIdx = $.inArray(currentDate.parentNode, $currentCells);

		button.click();
		setTimeout(function(){
			dpAccessibility.updateHeaderElements();

			var $newCells = $(ENABLED_SELECTOR);
			var newTd = $newCells[currentIdx];
			var newAnchor = newTd && $(newTd).find('a')[0];

			while (!newAnchor){
				currentIdx--;
				newTd = $newCells[currentIdx];
				newAnchor = newTd && $(newTd).find('a')[0];
			}

			dpAccessibility.setHighlightState(newAnchor, $('#ui-datepicker-div')[0]);
			$(newAnchor).attr('tabindex','-1').focus();
		}, 0);
	},

	handleNextClicks : function(){
		dpAccessibility.prepHighlightState();
		$('.ui-datepicker-next').attr('tabindex','-1').focus();
	},

	handlePrevClicks : function(){
		dpAccessibility.prepHighlightState();
		$('.ui-datepicker-prev').attr('tabindex','-1').focus();
	},

	previousDay : function(dateLink){
		var container = document.getElementById('ui-datepicker-div');
		if(!dateLink) return;

		var td = $(dateLink).closest('td');
		if(!td) return;

		var prevTd = $(td).prev();
		var prevDateLink = $('a.ui-state-default', prevTd)[0];

		if(prevTd && prevDateLink){
			dpAccessibility.setHighlightState(prevDateLink, container);
			$(prevDateLink).attr('tabindex','-1').focus();
		}else{
			dpAccessibility.handlePrevious(dateLink);
		}
	},

	handlePrevious : function(target){
		var container = document.getElementById('ui-datepicker-div');
		if(!target) return;

		var currentRow = $(target).closest('tr');
		if(!currentRow) return;
		
		var previousRow = $(currentRow).prev();

		if(!previousRow || previousRow.length === 0){
			dpAccessibility.previousMonth();
		}else{
			var prevRowDates = $('td a.ui-state-default', previousRow);
			var prevRowDate = prevRowDates[prevRowDates.length - 1];

			if(prevRowDate){
				setTimeout(function(){
					dpAccessibility.setHighlightState(prevRowDate, container);
					$(prevRowDate).attr('tabindex','-1').focus();
				}, 0);
			}
		}
	},

	previousMonth : function(){
		var prevLink = $('.ui-datepicker-prev')[0];
		var container = document.getElementById('ui-datepicker-div');
		prevLink.click();
		setTimeout(function(){
			var trs = $('tr', container);
			var lastRowTdLinks = $('td a.ui-state-default', trs[trs.length - 1]);
			var lastDate = lastRowTdLinks[lastRowTdLinks.length - 1];

			dpAccessibility.updateHeaderElements();

			dpAccessibility.setHighlightState(lastDate, container);
			$(lastDate).attr('tabindex','-1').focus();
		}, 0);
	},

	nextDay : function(dateLink){
		var container = document.getElementById('ui-datepicker-div');
		if(!dateLink) return;
		
		var td = $(dateLink).closest('td');
		if(!td) return;

		var nextTd = $(td).next();
		var nextDateLink = $('a.ui-state-default', nextTd)[0];

		if(nextTd && nextDateLink){
			dpAccessibility.setHighlightState(nextDateLink, container);
			$(nextDateLink).attr('tabindex','-1').focus();
		}else{
			dpAccessibility.handleNext(dateLink);
		}
	},

	handleNext : function(target){
		var container = document.getElementById('ui-datepicker-div');
		if(!target) return;
		
		var currentRow = $(target).closest('tr');
		var nextRow = $(currentRow).next();

		if(!nextRow || nextRow.length === 0){
			dpAccessibility.nextMonth();
		}else{
			var nextRowFirstDate = $('a.ui-state-default', nextRow)[0];
			if(nextRowFirstDate){
				dpAccessibility.setHighlightState(nextRowFirstDate, container);
				$(nextRowFirstDate).attr('tabindex','-1').focus();
			}
		}
	},

	nextMonth : function(){
		var nextMon = $('.ui-datepicker-next')[0];
		var container = document.getElementById('ui-datepicker-div');
		nextMon.click();
		setTimeout(function(){
			dpAccessibility.updateHeaderElements();

			var firstDate = $('a.ui-state-default', container)[0];
			dpAccessibility.setHighlightState(firstDate, container);
			$(firstDate).attr('tabindex','-1').focus();
		}, 0);
	},

	upHandler : function(target, cont, prevLink){
		prevLink = $('.ui-datepicker-prev')[0];
		var rowContext = $(target).closest('tr');
		if(!rowContext) return;

		var rowTds = $('td', rowContext),
			rowLinks = $('a.ui-state-default', rowContext),
			targetIndex = $.inArray(target, rowLinks),
			prevRow = $(rowContext).prev(),
			prevRowTds = $('td', prevRow),
			parallel = prevRowTds[targetIndex],
			linkCheck = $('a.ui-state-default', parallel)[0];

		if(prevRow && parallel && linkCheck){
			dpAccessibility.setHighlightState(linkCheck, cont);
			$(linkCheck).attr('tabindex','-1').focus();
		}else{
			prevLink.click();
			setTimeout(function(){
				dpAccessibility.updateHeaderElements();
				var newRows = $('tr', cont),
					lastRow = newRows[newRows.length - 1],
					lastRowTds = $('td', lastRow),
					tdParallelIndex = $.inArray(target.parentNode, rowTds),
					newParallel = lastRowTds[tdParallelIndex],
					newCheck = $('a.ui-state-default', newParallel)[0];

				if(lastRow && newParallel && newCheck){
					dpAccessibility.setHighlightState(newCheck, cont);
					$(newCheck).attr('tabindex','-1').focus();
				}else{
					var secondLastRow = newRows[newRows.length - 2],
						secondTds = $('td', secondLastRow),
						targetTd = secondTds[tdParallelIndex],
						linkCheck = $('a.ui-state-default', targetTd)[0];

					if(linkCheck){
						dpAccessibility.setHighlightState(linkCheck, cont);
						$(linkCheck).attr('tabindex','-1').focus();
					}
				}
			}, 0);
		}
	},

	downHandler : function(target, cont, nextLink){
		nextLink = $('.ui-datepicker-next')[0];
		var targetRow = $(target).closest('tr');
		if(!targetRow) return;

		var targetCells = $('td', targetRow),
			cellIndex = $.inArray(target.parentNode, targetCells), 
			nextRow = $(targetRow).next(),
			nextRowCells = $('td', nextRow),
			nextWeekTd = nextRowCells[cellIndex],
			nextWeekCheck = $('a.ui-state-default', nextWeekTd)[0];

		if(nextRow && nextWeekTd && nextWeekCheck){
			dpAccessibility.setHighlightState(nextWeekCheck, cont);
			$(nextWeekCheck).attr('tabindex','-1').focus();
		}else{
			nextLink.click();

			setTimeout(function(){
				dpAccessibility.updateHeaderElements();

				var nextMonthTrs = $('tbody tr', cont),
					firstTds = $('td', nextMonthTrs[0]),
					firstParallel = firstTds[cellIndex],
					firstCheck = $('a.ui-state-default', firstParallel)[0];

				if(firstParallel && firstCheck){
					dpAccessibility.setHighlightState(firstCheck, cont);
					$(firstCheck).attr('tabindex','-1').focus();
				}else{
					var secondRow = nextMonthTrs[1],
						secondTds = $('td', secondRow),
						secondRowTd = secondTds[cellIndex],
						secondCheck = $('a.ui-state-default', secondRowTd)[0];

					if(secondRow && secondCheck){
						dpAccessibility.setHighlightState(secondCheck, cont);
						$(secondCheck).attr('tabindex','-1').focus();
					}
				}
			}, 0);
		}
	},

	monthDayYearText : function(){
		var cleanUps = $('.amaze-date');

		$(cleanUps).each(function (clean){
			clean.parentNode.removeChild(clean);
		});

		var datePickDiv = document.getElementById('ui-datepicker-div');
		if(!datePickDiv) return;

		var dates = $('a.ui-state-default', datePickDiv);
		$(dates).attr('role', 'button').on('keydown', function (e){
			if(e.which === 32){
				e.preventDefault();
				e.target.click();
				setTimeout(function(){
					dpAccessibility.closeCalendar();
				}, 100);
			}
		});
		$(dates).each(function (index, date){
			var currentRow = $(date).closest('tr'),
				currentTds = $('td', currentRow),
				currentIndex = $.inArray(date.parentNode, currentTds),
				headThs = $('thead tr th', datePickDiv),
				dayIndex = headThs[currentIndex],
				daySpan = $('span', dayIndex)[0],
				monthName = $('.ui-datepicker-month option:selected').text(),
				year = $('.ui-datepicker-year option:selected').text(),
				number = date.innerHTML;

			if(!daySpan || !monthName || !number || !year) return;

			var dateText = year + '년 ' + monthName + ' ' + date.innerHTML + '일 ' + daySpan.title + '요일';
			date.setAttribute('aria-label', dateText);
		});
	},

	updateHeaderElements : function(){
		var context = document.getElementById('ui-datepicker-div');
		if(!context) return;

		var prev = $('.ui-datepicker-prev')[0];
		var next = $('.ui-datepicker-next')[0];

		next.href = 'javascript:void(0)';
		prev.href = 'javascript:void(0)';

		next.setAttribute('role','button');
		prev.setAttribute('role','button');

		dpAccessibility.appendOffscreenMonthText(next);
		dpAccessibility.appendOffscreenMonthText(prev);

		dpAccessibility.monthDayYearText();
	},

	prepHighlightState : function(){
		var highlight;
		var cage = document.getElementById('ui-datepicker-div');

		highlight = $('a.ui-state-active', cage)[0] || $('.ui-datepicker-today a', cage)[0] || $('a.ui-state-default', cage)[0] || $('.ui-state-highlight', cage)[0];

		if(highlight && cage) dpAccessibility.setHighlightState(highlight, cage);
	},

	setHighlightState : function(newHighlight, container){
		var prevHighlight = dpAccessibility.getCurrentDate(container);
		if($('.ui-state-highlight').length>0){
			$(prevHighlight).removeClass('ui-state-highlight');
			$(newHighlight).addClass('ui-state-highlight');
		}else{
			$(newHighlight).addClass('ui-state-highlight');
		}
	},

	getCurrentDate : function(container){
		var currentDate = $('.ui-state-highlight', container)[0];
		return currentDate;
	},

	appendOffscreenMonthText : function(button){
		var buttonText;
		var isNext = $(button).hasClass('ui-datepicker-next');
		var months = ['1월', '2월','3월', '4월','5월', '6월', '7월','8월', '9월','10월','11월', '12월'];

		$('.ui-datepicker-year').attr({'title':'연도 선택', 'data-select':$('.ui-datepicker-year option:selected').text()});
		$('.ui-datepicker-month').attr({'title':'월 선택', 'data-select':$('.ui-datepicker-month option:selected').text()});

		if($(button).closest('.ui-datepicker').find('.ui-datepicker-title select').hasClass('ui-datepicker-year')){
			var currentMonth = $('.ui-datepicker-title .ui-datepicker-month').attr('data-select').toLowerCase();
			var monthIndex = $.inArray(currentMonth.toLowerCase(), months);
			var currentYear = $('.ui-datepicker-title .ui-datepicker-year').attr('data-select').toLowerCase();
			var adjacentIndex = (isNext) ? monthIndex + 1 : monthIndex - 1;
		}else{
			var currentMonth = $('.ui-datepicker-title .ui-datepicker-month').text().toLowerCase();
			var monthIndex = $.inArray(currentMonth.toLowerCase(), months);
			var currentYear = $('.ui-datepicker-title .ui-datepicker-year').text().toLowerCase();
			var adjacentIndex = (isNext) ? monthIndex + 1 : monthIndex - 1;
		}

		if(isNext && currentMonth === '12월'){
			currentYear = parseInt(currentYear, 10);
			adjacentIndex = 0;
		}else if(!isNext && currentMonth === '1월'){
			currentYear = parseInt(currentYear, 10);
			adjacentIndex = months.length - 1;
		}

		buttonText = (isNext) ? '다음 달, ' + currentYear +'년 ' + dpAccessibility.firstToCap(months[adjacentIndex]) : '이전 달, '+ currentYear +'년 ' + dpAccessibility.firstToCap(months[adjacentIndex]);
		$(button).attr('title', buttonText).find('.ui-icon').html(buttonText);
	},

	firstToCap : function(s){
		return s.charAt(0).toUpperCase() + s.slice(1);
	},
}
// E : datepicker 웹접근성

/* 툴팁 : tooltipster http://calebjacob.github.io/tooltipster/
========================================================================== */
function fn_tooltip(){
	// 마우스 오버 툴팁 // 접근성 문제 있을 경우 **툴팁 접근성 부분 사용
	if( $(".tool-tip.hover").length > 0 ){
		$(document).on("click", ".tool-tip.hover", function(e){
			e.preventDefault();
		});
		
		$('.tool-tip.hover').tooltipster({
			contentAsHTML: true,
			theme: "tool-style",
			speed : 150,
			delay : 0,
			position : 'right',
		});
		
		$(document).on("focus", ".tool-tip.hover", function(){
			$(this).addClass("on");
			$(this).tooltipster('show');
		});
		
		$(document).on("blur", ".tool-tip.hover", function(){
			$(this).removeClass("on");
			$(this).tooltipster('hide');
		});
	}

	// click 툴팁
	if( $(".tool-tip.click").length > 0 ){
		$(document).on("click", ".tool-tip.click", function(e){
			e.preventDefault();
			$(this).addClass("on");
		});
		
		$(".tool-tip.click").tooltipster({
			trigger: "click",
			interactive: "true",
			autoClose: "false",
			theme: "tool-style",
			speed : 150,
			delay : 0,
			position : 'right',
			functionReady: function(e){
				var $tool = $("#"+e.__namespace),
					$toolTab = $tool.find('button, input:not([type="hidden"]), select, iframe, textarea, [href], [tabindex]:not([tabindex="-1"])'),
					$toolTabFirst = $toolTab && $toolTab.first(),
					$toolTabLast = $toolTab && $toolTab.last();
				 
				//$("#"+e.__namespace).attr("tabindex","0").focus();
				if( $toolTab.length ){
					// 레이어 열리자마자 초점 받을 수 있는 첫번째 요소로 초점 이동
					$toolTabFirst.focus().on("keydown", function(e) {
						// Shift + Tab키 : 초점 받을 수 있는 첫번째 요소에서 마지막 요소로 초점 이동 
						if (e.shiftKey && (e.keyCode || e.which) === 9) {
							e.preventDefault();
							$toolTabLast.focus();
						}
					})
				}
				
				// Tab키 : 초점 받을 수 있는 마지막 요소에서 첫번째 요소으로 초점 이동
				$toolTabLast.on("keydown", function(e) {
					if (!e.shiftKey && (e.keyCode || e.which) === 9) {
						e.preventDefault();
						$toolTabFirst.focus();
					}
				});

				$(".tooltip-close").click(function(e){
					e.preventDefault();
					$(".tool-tip.click").tooltipster("hide");
					$(".tool-tip.click.on").focus();
					$(".tool-tip.click").removeClass("on");
				});
			}
		});
	}

	// 헤더 > 알림 부분 영역툴팁만 사용하고 있음
	if( $(".tool-tip-top.click").length > 0 ){
		$(document).on("click", ".tool-tip-top.click", function(e){
			e.preventDefault();
			$(this).addClass("on");
		});
		
		$(".tool-tip-top.click").tooltipster({
			trigger: "click",
			interactive: "true",
			autoClose: "false",
			theme: "tool-style2",
			speed : 150,
			delay : 0,
			position : 'top',
			functionReady: function(e){
				var $tool = $("#"+e.__namespace),
					$toolTab = $tool.find('button, input:not([type="hidden"]), select, iframe, textarea, [href], [tabindex]:not([tabindex="-1"])'),
					$toolTabFirst = $toolTab && $toolTab.first(),
					$toolTabLast = $toolTab && $toolTab.last();
				 
				//$("#"+e.__namespace).attr("tabindex","0").focus();
				if( $toolTab.length ){
					// 레이어 열리자마자 초점 받을 수 있는 첫번째 요소로 초점 이동
					$toolTabFirst.focus().on("keydown", function(e) {
						// Shift + Tab키 : 초점 받을 수 있는 첫번째 요소에서 마지막 요소로 초점 이동 
						if (e.shiftKey && (e.keyCode || e.which) === 9) {
							e.preventDefault();
							$toolTabLast.focus();
						}
					})
				}
				
				// Tab키 : 초점 받을 수 있는 마지막 요소에서 첫번째 요소으로 초점 이동
				$toolTabLast.on("keydown", function(e) {
					if (!e.shiftKey && (e.keyCode || e.which) === 9) {
						e.preventDefault();
						$toolTabFirst.focus();
					}
				});

				$(".tooltip-close").click(function(e){
					e.preventDefault();
					$(".tool-tip-top.click").tooltipster("hide");
					$(".tool-tip-top.click.on").focus();
					$(".tool-tip-top.click").removeClass("on");
				});
			}
		});
	}
	
	// tooltipster mouseenter 기능이 접근성에 위반 될시 아래 주석안의 툴팁 사용 예정. 절대 삭제 금지
	/* **툴팁 접근성
	if( $(".tool-tip.hover").length > 0 ){
		$(document).on('click mouseenter mouseleave focus blur', '.tool-tip.hover', function(e) {
			var $this = $(this),
				$href = $($this.attr('data-tooltip-content')).parent(),
				$top = $this.offset().top,
				$left = $this.offset().left + 34;
	
			var config = {
				tooltipstyle : {
					position : 'absolute',
					top : $top,
					left : $left,
					zIndex: 9999
				}};
	
			$($href).css(config.tooltipstyle);
			
			if( e.type == 'click' ){
				e.preventDefault();
			}
			else if( e.type == 'mouseenter' || e.type == 'focus' ){
				console.log('over')
				$($href).fadeIn(200);
			}
			else if( e.type == 'mouseleave' || e.type == 'blur' ){
				$($href).fadeOut(200);
			}
		});
	}
	*/
}

// input file 디자인
function fn_file_upload(){
	$('.file-area').each(function(){
		$(this).find('.input-file').on('change', function(){
			if( $(this).val() == undefined || $(this).val() == '' ) {
				$(this).closest('.file-area').find('.text').attr("title", '첨부된 파일명 출력').text('선택된 파일 없음').css('color','#767676');
			}
			else {
				if(window.FileReader){
					if ($(this).val() != "") {
						var fileName = $(this)[0].files[0].name;
					}
				} else {
					var fileName = $(this).val().split('/').pop().split('\\').pop();
				}
				$(this).closest('.file-area').find('.text').attr("title", fileName + " 파일 입니다").text(fileName).css('color', '#333');
			}
		});
	});
};

$(document).on('click', '.file-area .text', function(){
	$(this).closest('.file-area').find('.label').trigger('click');
});

// 가이드 파일에만 적용
function fn_guide_copy() {
	$('.guide-block').each(function(){
		var _html = $(this).find('.copy').html();
		$(this).append(
			'<div class="paste">' +
			'<button type="button" class="button small navy">소스 보기</button>' +
			'<div class="code">' +
			'<xmp class="prettyprint linenums">' + _html +'</xmp>' +
			'</div>' +
			'</div>'
		);
		$(this).find('code').text(_html);
	});
	
	$(document).on('click', '.guide-block .paste button', function(){
		$(this).closest('.paste').toggleClass('on');
		$(this).closest('.paste').hasClass('on') ? $(this).text('소스 닫기') : $(this).text('소스 보기'); 
	});
}
if( $('.guide-block').length > 0 ) fn_guide_copy(); // 가이드 문서에만 적용

// document ready
$(function(){
	$(document).on('click', 'a.button.disabled', function(e){
		e.preventDefault();
	});
	
	var browserAgent = window.navigator.userAgent.toLowerCase();
	// 제이쿼리 3.6.0 애서 파이어폭스 의 body 태그에 transform scale 이 선언되어 position fixed 가 먹히지 않음.
	// 강제로 style을 삭제. 
	if (browserAgent.indexOf('firefox') >= 0) $('body').removeAttr('style'); 
	
	// 스킵 네이게이션
	$('.skip a').on({
		focus : function(){
			$('.skip').addClass('on');
		},
		blur : function(){
			$('.skip').removeClass('on');
		}
	});
	
	// header 접속권한 선택
	$(document).on('click', '.access-change .btn', function(e){
		e.preventDefault();
		
		$(this).closest('.access-change').toggleClass('on');
	});
	
	$(document).on('click', '.access-change ul li button', function(e){
		e.preventDefault();
		var _txt = $(this).text();
		
		$(this).closest('.access-change').removeClass('on');
		$(this).closest('.access-change').find('.btn').text(_txt);
	});
	
	// gnb
	$('#gnb ul.gnb > li > a').on({
		mouseenter : function(){
			$(this).next('.depth-wrap').show().closest('li').siblings().find('.depth-wrap').hide();
		},
		focus : function(){
			$(this).next('.depth-wrap').show().closest('li').siblings().find('.depth-wrap').hide();
		}
	});
	
	$(document).on('focus', '.header-notice button, .logo a, .header-mypage a', function(){
		$('#gnb .depth-wrap').hide();
	});
	
	$(document).on('mouseleave', '#gnb', function(){
		$('#gnb .depth-wrap').hide();
	});
	
	$(document).on('click', '#gnb .depth-3 > li.toggle > .btn-depth-toggle', function(e){
		e.preventDefault();
		
		if( $(this).closest('.toggle').hasClass('on') ){
			$(this).text('하위 메뉴 보기');
			$('#gnb .depth-3 > li.toggle').removeClass('on');
		}
		else {
			$(this).text('하위 메뉴 닫기');
			$(this).closest('#gnb').find('.toggle').removeClass('on');
			$(this).closest('.toggle').addClass('on');
		}
	});
	
	// 유의사항 box
	$(document).on('click', '.box-info .btn-more', function(){
		$(this).closest('.box-info').addClass('done on');
		$(this).closest('.box-info').find('.toggle').removeAttr('title').focus();
	});
	
	// 더보기 버튼 한번 누른 다음 or 더보기 없고 열어 놓은 경우
	$(document).on('click','.box-info.done .toggle', function(){
		$(this).closest('.box-info').toggleClass('on').find('.cont').stop().slideToggle(200);
	});
	
	// 일반 toggle box
	$('.box-toggle.on').find('.cont').stop().slideDown(0);

	$(document).on('click', '.box-toggle .toggle', function() {
		$(this).closest('.box-toggle').hasClass('on')
		? $(this).closest('.box-toggle').removeClass('on').find('.cont').stop().slideUp(100)
		: $(this).closest('.box-toggle').addClass('on').find('.cont').stop().slideDown(100);
	});
	
	// toggle check box
	if( $('.box-toggle-chk').length > 0 ){
		var _text = $(this).find('.tit label').text();
		
		$('.box-toggle-chk').each(function(){
			var _this = $(this);
			var _chkbox = $(this).find('.tit .bg-chk input[type="checkbox"]');
			
			_chkbox.on('change', function(){
				if( _chkbox.prop('checked') ) _this.addClass('on').find('.cont').stop().slideDown(100);
				_this.find('.tit .toggle').text(_text + ' 닫기');
			});
			
			if( _this.hasClass('on') ){
				_this.find('.cont').stop().slideDown(0);
				_this.find('.tit .toggle').text(_text + ' 닫기');
			}
			else {
				_this.find('.tit .toggle').text(_text + ' 열기');
			}
		});
		
		$(document).on('click', '.box-toggle-chk .toggle', function() {
			if( $(this).closest('.box-toggle-chk').hasClass('on') ){
				$(this).closest('.box-toggle-chk').removeClass('on').find('.cont').stop().slideUp(100);
				$(this).text(_text + ' 열기');
			}
			else {
				$(this).closest('.box-toggle-chk').addClass('on').find('.cont').stop().slideDown(100);
				$(this).text(_text + ' 닫기');
			}
		});
	}

	// 알림 notice toggle box
	$('.box-toggle-notice.on').find('.cont').stop().slideDown(0);

	$(document).on('click', '.box-toggle-notice .toggle', function() {
		$(this).closest('.box-toggle-notice').hasClass('on')
		? $(this).closest('.box-toggle-notice').removeClass('on').find('.cont').stop().slideUp(100)
		: $(this).closest('.box-toggle-notice').addClass('on').find('.cont').stop().slideDown(100);
	});
	
	// 카운팅 박스 토글
	if( $('.box-tax-counting.toggle') ){
		if( $('.box-tax-counting.toggle').hasClass('on') ){
			$(this).find('.bottom').slideDown(0);
		}
		
		$('.box-tax-counting.toggle .top .btn .button').on('click', function(){
			$(this).closest('.box-tax-counting.toggle').toggleClass('on');
			$(this).closest('.box-tax-counting.toggle').find('.bottom').slideToggle(150);
		});
	}


	// 카운팅 박스 토글
	if( $('.box-tax-counting.new') ){
		if( $('.box-tax-counting.new').hasClass('on') ){
			$(this).next('.box-tax-counting').slideDown(0);
		}
		
		$('.box-tax-counting.new .top .btn .button').on('click', function(){
			$(this).closest('.box-tax-counting.new').toggleClass('on');
			$(this).closest('.box-tax-counting.new').next('.box-tax-counting').slideToggle(150);
		});
	}

	// 카운팅박스 클릭
	$(document).on('click', '.tax-search-title .search-open', function(e) {
		e.preventDefault();

		var btnOpen = $(this),
			btnClose = btnOpen.siblings('.tax-search-pop').find('.search-close'),
			popup = btnOpen.siblings('.tax-search-pop'),
			popupCont = popup.find('button, input:not([type="hidden"]), select, iframe, textarea, [href], [tabindex]:not([tabindex="-1"])'),
			popupFirst = popupCont && popupCont.first(),
			popupLast = popupCont && popupCont.last();


		function taxBoxOpen() {
			popup.addClass('on');

			if( popup.length ){
				// 레이어 열리자마자 초점 받을 수 있는 첫번째 요소로 초점 이동
				popupFirst.focus().on("keydown", function(e) {

					// Shift + Tab키 : 초점 받을 수 있는 첫번째 요소에서 마지막 요소로 초점 이동 
					if (e.shiftKey && (e.keyCode || e.which) === 9) {
						e.preventDefault();
						popupLast.focus();
					}
				})
			}
			
			// Tab키 : 초점 받을 수 있는 마지막 요소에서 첫번째 요소으로 초점 이동
			popupLast.on("keydown", function(e) {
				if (!e.shiftKey && (e.keyCode || e.which) === 9) {
					e.preventDefault();
					popupFirst.focus();
				}
			});
		}

		taxBoxOpen();
		
		function taxBoxlClose() {
			btnOpen.focus();
			popup.removeClass('on')
		}
		
		// 닫기 버튼 클릭 시 레이어 닫기
		btnClose.on('click', function(){
			taxBoxlClose();
		});
	})
	
	
	

	// 로케이션 열고 닫기
	$(document).on('click','.container-util .location .depth button.btn', function(){
		if( $(this).closest('.depth').hasClass('on') ){
			$(this).closest('.depth').removeClass('on');
			$('.location .depth .siblings').stop().slideUp(100);
		}
		else {
			$(this).closest('.depth').addClass('on').siblings('.depth').removeClass('on');
			$('.location .depth .siblings').stop().slideUp(100);
			$(this).closest('.depth').find('.siblings').stop().slideDown(100);
			
		}
	});
	
	// 마우스 아웃시 location depth 닫기
	$(document).on('mouseleave', '.location .depth', function(){
		$(this).removeClass('on').find('.siblings').stop().slideUp(100);
	});
	
	// tab 이동시 location depth 부분 닫기
	$('.sns-share > a, .location .depth.home a').focus(function(){
		$('.location .depth').removeClass('on').find('.siblings').stop().slideUp(100);
	});
	
	// sns 공유하기 레이어 열고 닫기
	$(document).on('click','.container-util .util .sns-share > a', function(e){
		e.preventDefault();
		$(this).closest('.sns-share').toggleClass('on');
	});

	// footer 관련 사이트 열고 닫기
	$(document).on('click', '.footer-link .btn', function() {
		$(this).closest('.footer-link').toggleClass('on');
		$(this).closest('.footer-link').find('.list').stop().slideToggle(100);
	});

	// 메인 빠른남부 셀렉트 열고닫기
	$(document).on('click', '.select-area .btn', function() {
		$(this).closest('.select-area').toggleClass('on');
		$(this).closest('.select-area').find('.list').stop().slideToggle(100);
	});

	// 메인 로그인후 - 나의할일 레이어
	$(".main-mypage.login .btn").on("click", function(){
		$(this).toggleClass("on");
		$(".main-mypage.login .service-box").slideToggle(150);
		if ($(this).hasClass("on"))
		{
			$(this).find('span').html("닫기");
		}else{
			$(this).find('span').html("열기");
			$(this).focus();
		}
			
		// Tab키 : 초점 받을 수 있는 마지막 요소에서 첫번째 요소으로 초점 이동
		var serviceBoxlayer = $('.service-box'),
		serviceBoxlayerTab = serviceBoxlayer.find('button, input:not([type="hidden"]), select, iframe, textarea, [href], [tabindex]:not([tabindex="-1"])'),
		serviceBoxlayerTabFirst = serviceBoxlayerTab && serviceBoxlayerTab.first(),
		serviceBoxlayerTabLast = serviceBoxlayerTab && serviceBoxlayerTab.last();

		// Tab키 : 초점 받을 수 있는 마지막 요소에서 첫번째 요소으로 초점 이동
		serviceBoxlayerTabLast.on("keydown", function(e) {
			if (!e.shiftKey && (e.keyCode || e.which) === 9) {
				e.preventDefault();
				serviceBoxlayerTabFirst.focus();
			}
		});

		return false;
	});

	$(".service-box .btn-close").click(function(e){
		e.preventDefault();
		$(".main-mypage.login .service-box").hide();
		$(".main-mypage.login .btn").focus().removeClass('on');
		$(".main-mypage.login .btn span").html("열기");
	});


	// 기간 설정 버튼 활성화
	$(document).on('click', '.date-period .period .button', function(){
		$(this).addClass('on').siblings().removeClass('on');
	});
	
	// 하단 floating 되는 기능 있는 경우
	if( $('.bottom-floating').length > 0 ){
		
		//$('.bottom-floating').prepend('<div class="bg-mouse" title="스크롤을 해보세요"><span class="arr"></span></div>')
		
		$('#footer').addClass('has-bottom-floating');
		/*
		$(window).on('scroll', function() {
			if( $(window).scrollTop() == 0 ){
				$('.bg-mouse').fadeIn(150);
				$('.bottom-floating').stop().animate({
					bottom : -68
				}, 150);
			}
			else	{
				$('.bg-mouse').fadeOut(150);
				$('.bottom-floating').stop().animate({
					bottom : 0
				}, 150);
			}
		});
		*/
		// tab 키 이동시 레이어에 포커싱이 가려질 경우 강제 스크롤 이동 : 웹 접근성
		var $tabMove = $("button, input:not([type='hidden']), select, iframe, textarea, [href], [tabindex]:not([tabindex='-1'])");
		
		$($tabMove).on('focus', function(){
			var $this = $(this);
			var $offset = $this.offset().top;
			
			//$('html, body').animate({scrollTop : $offset - 80}, 10, 'easeInOutExpo');
		})
		
		/*
		$($tabMove).on('keydown', function(e) {
			if (e.shiftKey && (e.keyCode || e.which) === 9 || !e.shiftKey && (e.keyCode || e.which) === 9) {
				var $this = $(this);
				var $offset = $this.offset().top;
				//$('html, body').animate({scrollTop : $offset}, 0, 'easeInOutExpo');
			}
			else {
				return;
			}
		});
		*/
	}
	
	// body 클릭시 닫기
	$(document).on('click', function(e) {
		// 로케이션 닫기
		/*
		if(!$(e.target).closest('.location').hasClass('location')) {
			$('.location .depth').removeClass('on');
			$('.location .depth .siblings').slideUp(100);
		}
		*/
		// 관련 사이트 닫기
		if(!$(e.target).closest('.footer-link').hasClass('footer-link')) {
			$('.footer-link').removeClass('on');
			$('.footer-link').find('.list').stop().slideUp(100);
		}
		// 메인 빠른납부 레이어 닫기
		if(!$(e.target).closest('.select-area').hasClass('select-area')) {
			$('.select-area').removeClass('on');
			$('.select-area').find('.list').stop().slideUp(100);
		}
	});

	// tab layer
	$(document).on('click', '[role="tab"]', function(e){
		e.preventDefault();
		
		var targetId = $(this).attr('aria-controls');
		var $this = $('#'+targetId);
		
		$(this).closest('[role="tablist"]').find('[role="tab"]').attr('aria-selected', false);
		$(this).attr('aria-selected', true);
		
		if( $(this).closest('.tab-area').hasClass('inner-tab') ){
			$(this).closest('.tab-area').find('.inner-tab-cont').attr('hidden', true);
			$($this).removeAttr('hidden');
		}
		else {
			$(this).closest('.tab-area').find('.tab-cont').attr('hidden', true);
			$($this).removeAttr('hidden');
		}
		
		$('.recommended-menu-slide .wrap').slick('setPosition');
		
		// 신고 메인일때
		/*if( $(this).closest('.tab-area').hasClass('box-report-main') ){
			
		}*/
	});
	
	$(document).on('click', '.box-report-main .left-area .list a', function(e){
		e.preventDefault();
		
		$(this).addClass('on').closest('li').siblings().children('a').removeClass('on');
	});

	// tab Sort
	$('.tab-list.filter a').each(function(){
		var titleValue  = $(this).find('span').text();
		$(this).attr("title", titleValue + ' 목록이 보여집니다.');
	});
	
	$(document).on('click', '.tab-list.filter a', function(e){
		e.preventDefault();
		$(this).closest('.tab-list').find('a').removeClass('on');
		$(this).addClass('on');
	});

	// layer modal open
	$(document).on('click', '.btn-open-modal', function(e) {
		e.preventDefault();
		
		var btnOpen = $(this),
			layer = $('#' + $(this).attr('aria-controls')),
			btnClose = layer.find('.btn-close-modal'),
			btnClose02 = layer.find('.close-layer'),
			layerTab = layer.find('button, input:not([type="hidden"]), select, iframe, textarea, [href], [tabindex]:not([tabindex="-1"])'),
			layerTabFirst = layerTab && layerTab.first(),
			layerTabLast = layerTab && layerTab.last();
		
		function modalOpen() {
			// dimed 한번 만 열기
			if( $('.dimed').length > 0 ){
				$('body').addClass('overflow');
				
				btnOpen.closest('.layer-modal').addClass('over')
			}
			else {
				$('body').addClass('overflow').append('<div class="dimed"></div>');
			}
			
			layer.addClass('on').fadeIn(300);
			
			if( layerTab.length ){
				// 레이어 열리자마자 초점 받을 수 있는 첫번째 요소로 초점 이동
				layerTabFirst.focus().on("keydown", function(e) {
					// Shift + Tab키 : 초점 받을 수 있는 첫번째 요소에서 마지막 요소로 초점 이동 
					if (e.shiftKey && (e.keyCode || e.which) === 9) {
						e.preventDefault();
						layerTabLast.focus();
					}
				})
			}
			
			// Tab키 : 초점 받을 수 있는 마지막 요소에서 첫번째 요소으로 초점 이동
			layerTabLast.on("keydown", function(e) {
				if (!e.shiftKey && (e.keyCode || e.which) === 9) {
					e.preventDefault();
					layerTabFirst.focus();
				}
			});
		}
		
		
		if( $(this).hasClass('dev-event') ) {
			//layer.devModalOpen = modalOpen; // 개발 요청 여는 함수
		}
		else {
			modalOpen();
			
			function modalClose() {
				btnOpen.focus().closest('.layer-modal').removeClass('over');
				layer.removeClass('on').fadeOut(0);
				$('body').removeClass('overflow');
				
				if( $('.layer-modal.on').length === 0 ) $('.dimed').remove();
			}
			
			// 닫기 버튼 클릭 시 레이어 닫기
			btnClose.on('click', function(){
				modalClose();
			});
			
			btnClose02.on('click', function(){
				modalClose();
			});
			
			
			// 반투명 배경 클릭 시 레이어 닫기
			/* 개발 요청 dimed 클릭시 닫는거 없앰.
			layer.on('click', function(e){
				if (e.target === e.currentTarget) modalClose();
			});
			*/
			
			layer.devModalClose = modalClose; // 개발 요청 닫는 함수
		}

		$('.file-area-wrap').each(function(){
			if( $(this).hasClass('default') ){
				var _w = $(this).find('label').outerWidth();
				
				$(this).find('.file').css('padding-right', _w + 10)
			}
		});
	});

	// alert, 안내 레이어 (작은거)
	$(document).on('click', '.btn-close-layer, .close-layer', function(){
		$(this).closest('.layer-info').hide();
		$(this).closest('.layer-dimed').hide();
		$('body').removeClass('overflow')
	});
	
	if( $('.layer-dimed').length > 0 ){
		$('.layer-dimed').css('display') == 'block' ? $('body').addClass('overflow') : $('body').removeClass('overflow');
	}

	// box step 현재 진행중인거 전 step class="prev" 처리
	if( $('.box-step-top') ) {
		/*$('.box-step-top .list > li.on').prevAll('li').addClass('prev');
		
		if( $('.box-step-top').hasClass('process') ) {
			$('.box-step-top .list > li.on').nextAll('li').addClass('next');
		}*/
		
		$('.box-step-top').each(function(){
			$(this).find('.list > li.on').prevAll('li').addClass('prev');
			$(this).find('.list > li.on').nextAll('li').addClass('next');
		});
	}

	if( $('.box-step-left') ) $('.box-step-left .list li.on').prevAll('li').addClass('prev');
	
	// 첨부파일 영역 추가 하기
	if( $('.file-area-wrap').length > 0 ){
		
		// 파일 아이디 초기화
		$('.file-area-wrap').each(function(index){
			var _file_index = index;
			
			$(this).find('label.label').attr('for', 'file_upload_' + _file_index + '_');
			$(this).find('input[type="file"]').attr('id', 'file_upload_' + _file_index + '_');
		});
		
		var increaseFileCount = 0;
		
		$(document).on('click', '.file-area-wrap .button', function(e){
			e.preventDefault();
			
			increaseFileCount++;
			
			var $fileClone = $(this).closest('.file-area-wrap').find('.input-area').first().clone();
			
			var _for = $fileClone.find('label.label').attr('for');
			var _id = $fileClone.find('input[type="file"]').attr('id');
			
			$fileClone.find('.etc-input').remove();
			
			$fileClone.find('label.label').attr('for', _for + increaseFileCount);
			$fileClone.find('input[type="file"]').val('').attr('id', _id + increaseFileCount);
			
			$fileClone.find('.text').attr('title', '첨부된 파일명 출력').text('선택된 파일 없음');
			$fileClone.find('.file-area').append('<button type="button" title="클릭시 해당 파일첨부 영역이 삭제 됩니다" class="button small btn-file-area-del">삭제</button>');
	
			if ($(this).hasClass('btn-file-area-add')) {
				var idx = $(this).closest('.file-area-wrap').find('input[type="file"]').length - 1;
				var file = $(this).closest('.file-area-wrap').find('input[type="file"]').eq(idx); 
				
				if (file.val() == '' && !file.prop('skip')) { // prop 은 개발 요청 추가
					alert('파일을 먼저 등록해 주세요');
					return;
				}
				$(this).closest('.file-area-wrap').append($fileClone);
			}
	
			else if ($(this).hasClass('btn-file-area-del')) {
				if ($(this).closest('.file-area').find('input[type="file"]').val() != '') {
					var result = confirm('파일이 존재합니다. 삭제 하시겠습니까?');
	
					if (result) $(this).closest('.input-area').remove();
				}
				else {
					$(this).closest('.input-area').remove();
				}
			}
	
			fn_file_upload();
		});
	}

	// https://github.com/kenwheeler/slick/
	if( $('.slick').length ){
		$('.slick').each(function(){
			var $slickPage = $(this).find('.slick-page');
			
			$(this).find('.wrap').on('init reInit afterChange', function(event, slick, currentSlide, nextSlide){
				//currentSlide is undefined on init -- set it to 0 in this case (currentSlide is 0 based)
				var i = (currentSlide ? currentSlide : 0) + 1;
				//$slickPage.html('<em>' + + i + '</em>' + '/' + slick.slideCount); // 2/3 한자리일때
				$slickPage.html('<em>' + ('00' + i).slice(-2) + '</em>' + ' / ' + ('00' + slick.slideCount).slice(-2)); // 02/03 두자리수로 표현일때
			});
		})
	
		// slick 디폴트
		$('.slick-default .wrap').slick({
			arrows : true, // default == true
			dots: true, // default == false
			infinite: true, // default == true
			speed: 300,
			slidesToShow: 1, // 한번에 보여지는 갯수
			slidesToScroll: 1, // default == 1, : 한번에 움직이는 slide 갯수
			autoplay: true, // default == false
			autoplaySpeed : 3000, // default == 3000
			pauseOnHover : true, // default == true : 마우스 오버시 멈춤
			pauseOnFocus : true, // default == true : 포커스 됐을 때 멈춤
			pauseOnDotsHover : false, // default == false : 도트 페이징 됐을 때 멈춤
			focusOnChange : true, // default == false : 변경 후 슬라이드에 focus // 접근성
			touchThreshold : 50, // default == 5 : 슬라이드를 진행하려면 사용자가 (1/touchThreshold) 길이 * 슬라이더 너비를 스와이프해야 합니다.
		});

		// main 배너
		$('.main-top-banner .wrap').slick({
			arrows : false, // default == true
			dots: false, // default == false
			infinite: true, // default == true
			speed: 300,
			slidesToShow: 1, // 한번에 보여지는 갯수
			slidesToScroll: 1, // default == 1, : 한번에 움직이는 slide 갯수
			autoplay: true, // default == false
			autoplaySpeed : 3000, // default == 3000
			pauseOnHover : true, // default == true : 마우스 오버시 멈춤
			pauseOnFocus : true, // default == true : 포커스 됐을 때 멈춤
			pauseOnDotsHover : false, // default == false : 도트 페이징 됐을 때 멈춤
			focusOnChange : true, // default == false : 변경 후 슬라이드에 focus // 접근성
			touchThreshold : 50, // default == 5 : 슬라이드를 진행하려면 사용자가 (1/touchThreshold) 길이 * 슬라이더 너비를 스와이프해야 합니다.
		});

		// main 자주찾는배너 메뉴 슬라이드
		$('.favorites-menu .wrap').slick({
			arrows : true, // default == true
			dots: false, // default == false
			infinite: false, // default == true
			speed: 500,
			centerPadding: '60px',
			slidesToShow: 7, // 한번에 보여지는 갯수
			slidesToScroll: 7, // default == 1, : 한번에 움직이는 slide 갯수
			autoplay: false, // default == false
			autoplaySpeed : 3000, // default == 3000
			pauseOnHover : true, // default == true : 마우스 오버시 멈춤
			pauseOnFocus : true, // default == true : 포커스 됐을 때 멈춤
			pauseOnDotsHover : false, // default == false : 도트 페이징 됐을 때 멈춤
			focusOnChange : true, // default == false : 변경 후 슬라이드에 focus // 접근성
			touchThreshold : 50, // default == 5 : 슬라이드를 진행하려면 사용자가 (1/touchThreshold) 길이 * 슬라이더 너비를 스와이프해야 합니다.
		});

		// main 추천메뉴 슬라이드

		$('.recommended-menu-slide .wrap').slick({
			arrows : true, // default == true
			dots: true, // default == false
			infinite: false, // default == true
			speed: 300,
			slidesToShow: 1, // 한번에 보여지는 갯수
			slidesToScroll: 1, // default == 1, : 한번에 움직이는 slide 갯수
			autoplay: false, // default == false
			autoplaySpeed : 3000, // default == 3000
			pauseOnHover : true, // default == true : 마우스 오버시 멈춤
			pauseOnFocus : true, // default == true : 포커스 됐을 때 멈춤
			pauseOnDotsHover : false, // default == false : 도트 페이징 됐을 때 멈춤
			focusOnChange : true, // default == false : 변경 후 슬라이드에 focus // 접근성
			touchThreshold : 50, // default == 5 : 슬라이드를 진행하려면 사용자가 (1/touchThreshold) 길이 * 슬라이더 너비를 스와이프해야 합니다.
			setPosition: 0,
		});
		
		
		
		// 메인 그래프 slide
		$('.slick-main-graph .wrap').slick({
			arrows : true, // default == true
			dots: false, // default == false
			infinite: true, // default == true
			speed: 300,
			slidesToShow: 1, // 한번에 보여지는 갯수
			slidesToScroll: 1, // default == 1, : 한번에 움직이는 slide 갯수
			autoplay: false, // default == false
			autoplaySpeed : 3000, // default == 3000
			pauseOnHover : true, // default == true : 마우스 오버시 멈춤
			pauseOnFocus : true, // default == true : 포커스 됐을 때 멈춤
			pauseOnDotsHover : false, // default == false : 도트 페이징 됐을 때 멈춤
			focusOnChange : true, // default == false : 변경 후 슬라이드에 focus // 접근성
			touchThreshold : 50, // default == 5 : 슬라이드를 진행하려면 사용자가 (1/touchThreshold) 길이 * 슬라이더 너비를 스와이프해야 합니다.
			adaptiveHeight: false,
			draggable : false,
		});
		
		
		

	
		// slick 지방세 관련사이트
		$('.slick-local-wetax .wrap').slick({
			arrows : false, // default == true
			dots: false, // default == false
			infinite: true, // default == true
			speed: 300,
			slidesToShow: 1, // 한번에 보여지는 갯수
			slidesToScroll: 1, // default == 1, : 한번에 움직이는 slide 갯수
			autoplay: true, // default == false
			autoplaySpeed : 3000, // default == 3000
			pauseOnHover : true, // default == true : 마우스 오버시 멈춤
			pauseOnFocus : true, // default == true : 포커스 됐을 때 멈춤
			pauseOnDotsHover : false, // default == false : 도트 페이징 됐을 때 멈춤
			focusOnChange : true, // default == false : 변경 후 슬라이드에 focus // 접근성
			touchThreshold : 50, // default == 5 : 슬라이드를 진행하려면 사용자가 (1/touchThreshold) 길이 * 슬라이더 너비를 스와이프해야 합니다.
		});
		// slick 지방세 관련사이트 이전 다음 정지 재생 버튼
		$(document).on('click', '.slick-prev', function(){
			$(this).closest('.slick-local-wetax').find('.wrap').slick('slickPrev');
			$(this).closest('.main-top-banner').find('.wrap').slick('slickPrev');
		});

		$(document).on('click', '.slick-next', function(){
			$(this).closest('.slick-local-wetax').find('.wrap').slick('slickNext');
			$(this).closest('.main-top-banner').find('.wrap').slick('slickNext');
		});
		

		$(document).on('click', '.slick-local-wetax .slick-play', function(){
			$('.slick-pause').addClass('active').focus();
			$(this).removeClass('active');
		});

		$(document).on('click', '.slick-local-wetax .slick-pause', function(){
			$('.slick-play').addClass('active').focus();
			$(this).removeClass('active');
		});

		$(document).on('click', '.main-top-banner .slick-pause', function(){
			$('.slick-play').addClass('active').focus();
			$(this).removeClass('active');
		});
		$(document).on('click', '.main-top-banner .slick-play', function(){
			$('.slick-pause').addClass('active').focus();
			$(this).removeClass('active');
		});
		
		$('.slick-local-wetax').each(function(){
			var _leng1 = $(this).find('.slick-slide:not(.slick-cloned)').length;
			var _leng2 = $(this).find('.slick-active').length;
			
			if( _leng1 == _leng2 ) $(this).parent('.site-slide-area').addClass('no-padding');
		});

		/* 정지 재생버튼 */
		$(document).on('click', '.slick-play', function(){
			$(this).closest('.slick').find('.wrap').slick('slickPlay');
		});
	
		$(document).on('click', '.slick-pause', function(){
			$(this).closest('.slick').find('.wrap').slick('slickPause');
		});
		
		// slidesToShow 갯수와 마크업의 slide 갯수가 같을 때 // 소스상에서 위 slick 선언 된 후에 실행 되어야 함.
		$('.slick').each(function(){
			var _leng1 = $(this).find('.slick-slide:not(.slick-cloned)').length;
			var _leng2 = $(this).find('.slick-active').length;
			
			//if( _leng1 == _leng2 ) $(this).find('.slick-play, .slick-pause, .slick-page, .slick-prev, .slick-next').remove();
		});
		
		$('.brn-login-slick .wrap').slick({
			arrows : true, // default == true
			dots: false, // default == false
			infinite: false, // default == true
			speed: 300,
			slidesToShow: 1, // 한번에 보여지는 갯수
			slidesToScroll: 1, // default == 1, : 한번에 움직이는 slide 갯수
			autoplay: false, // default == false
			//autoplaySpeed : 3000, // default == 3000
			//pauseOnHover : true, // default == true : 마우스 오버시 멈춤
			//pauseOnFocus : true, // default == true : 포커스 됐을 때 멈춤
			//pauseOnDotsHover : false, // default == false : 도트 페이징 됐을 때 멈춤
			focusOnChange : true, // default == false : 변경 후 슬라이드에 focus // 접근성
			touchThreshold : 50, // default == 5 : 슬라이드를 진행하려면 사용자가 (1/touchThreshold) 길이 * 슬라이더 너비를 스와이프해야 합니다.
		});
	}
	// 알림 경고창 드레그 될때
	$('.drag-layer').draggable();
	
	// 함수 실행
	fn_file_upload();
	fn_tooltip();
	
	//date picker
	if($('.datepicker').length > 0){
		$('.datepicker span input').fn_datepicker();
		
		// readonly, disabled 일때 기능을 제외한 디자인적인 요소 변경
		setTimeout(function(){
			$(".datepicker input[readonly]").each(function(){
				$(this).closest(".datepicker").addClass("readonly");
				$(this).closest(".datepicker").find('button').attr('title', '읽기전용. 날짜 변경 불가')
			});
			
			$(".datepicker input[disabled]").each(function(){
				$(this).closest(".datepicker").addClass("disabled");
				$(this).closest(".datepicker").find('button').attr('disabled', true)
			});
		},1);
	}
	
	
	// month picker
	if( $('.monthpicker').length > 0 ){
		
		$(".monthpicker input").MonthPicker({
			Button: '<button type="button" class="btn-month">년 월 선택</button>'
		});
	}




	// accordian
	$(document).on('click', '.accordian .toggle', function(e){
		e.preventDefault();
		
		if( $(this).closest('.list').hasClass('on') ){
			$(this).closest('.list').removeClass('on');
			$(this).next(".cont").removeAttr('tabindex').slideUp(150);
		}
		else {
			$(this).closest('.list').addClass('on').siblings('.list').removeClass('on');
			$(this).closest('.accordian').find('.cont').slideUp(150)
			$(this).next(".cont").attr('tabindex','0').slideDown(150);
		}
	});
	
	/* 자체 토글 임시 주석. 기능 정의가 바뀔경우 대비
	$(".accordian .toggle").click(function(e){
		e.preventDefault();
		
		$(this).parent().toggleClass("on").find(".cont").slideToggle(150);
		if( $(this).parent().hasClass("on")){
			$(this).parent().find(".cont").attr('tabindex','0');
		}
		else {
			$(this).parent().find(".cont").removeAttr('tabindex');
		}
	});
 	*/

	$(document).on('click', '.my-menu-setting .depth .bg ul li .btn', function(){
		$(this).closest('li').addClass('on').siblings('li').removeClass('on');
	});
	
	if( $('.box-left-scroll') ){
		$(document).on('click', '.box-left-scroll .left-area .list .btn', function(){
			$(this).closest('li').addClass('on').siblings('li').removeClass('on');
		});
	}
	
	// 납부세액 토글 박스
	$('.box-toggle-tax').each(function(){
		$(this).hasClass('on') ? $(this).find('.cont-section').slideDown(0) : $(this).find('.cont-section').slideUp(0);
	});
	
	$(document).on('click', '.box-toggle-tax .btn-toggle', function(){
		if( $(this).closest('.box-toggle-tax').hasClass('on') ){
			$(this).closest('.box-toggle-tax').find('.cont-section').slideUp(150);
			$(this).closest('.box-toggle-tax').removeClass('on');
		}
		else {
			$(this).closest('.box-toggle-tax').find('.cont-section').slideDown(150);
			$(this).closest('.box-toggle-tax').addClass('on');
		}
	});
	
	// 버튼 하단 고정 여백 추가
	if ($(".button-group").hasClass('bottom-fixed')){
		$(".win-pop").addClass('pb100');
	}
	
	// 전체메뉴 닫기버튼
	$(".btn-search-close").click(function(){
		$(".result-wrap").css('display','none');
	});
	
	// 고액체납자 명단공개
	$(document).on('click', '.delinquent-taxpayer .left-area .sort .selected .button', function(){
		$(this).addClass('on').siblings().removeClass('on');
	});
	
	$(document).on('click', '.delinquent-taxpayer .bg-korea .btn', function(){
		$(this).addClass('on').siblings().removeClass('on');
		
		var district = $(this).attr('data-district');
		
		$('.delinquent-taxpayer .district .btn[data-district="'+district+'"]').addClass('on').siblings('.btn').removeClass('on');
		
		district === 'whole' ? $('.delinquent-taxpayer .district-sub').hide() : $('.delinquent-taxpayer .district-sub').show();
	});
	
	$(document).on('click', '.delinquent-taxpayer .district .btn', function(){
		$(this).addClass('on').siblings().removeClass('on');
		
		var district = $(this).attr('data-district');
		
		$('.delinquent-taxpayer .bg-korea .btn[data-district="'+district+'"]').addClass('on').siblings('.btn').removeClass('on');
		
		district === 'whole' ? $('.delinquent-taxpayer .district-sub').hide() : $('.delinquent-taxpayer .district-sub').show();
	});
	
	$(document).on('click', '.delinquent-taxpayer .district-sub .btn', function(){
		$(this).addClass('on').siblings().removeClass('on');
	});
	
	// 로그인 , 회원가입 이용약관 등 전용 아코디언
	$('.login-terms-agree .one-chk').each(function(){
		$(this).hasClass('on') ? $(this).find('.cont-area').slideDown(0) : $(this).find('.cont-area').slideUp(0);
	});
	
	$(document).on('click', '.login-terms-agree .btn-toggle', function(e){
		e.preventDefault();
		
		if( $(this).closest('.one-chk').hasClass('on') ){
			$(this).text('내용 보기');
			$(this).closest('.one-chk').removeClass('on');
			$(this).closest('.one-chk').find(".cont-area").removeAttr('tabindex').slideUp(150);
		}
		else {
			$(this).text('내용 닫기');
			$(this).closest('.one-chk').addClass('on').siblings('.one-chk').removeClass('on');
			$(this).closest('.login-terms-agree').find('.cont-area').slideUp(150)
			$(this).closest('.one-chk').find(".cont-area").attr('tabindex','0').slideDown(150);
		}
	})

	// 공통 동의 전용 아코디언
	$('.terms-agree .one-chk').each(function(){
		$(this).hasClass('on') ? $(this).find('.cont-area').slideDown(0) : $(this).find('.cont-area').slideUp(0);
	});
	
	$(document).on('click', '.terms-agree .btn-toggle', function(e){
		e.preventDefault();
		
		if( $(this).closest('.one-chk').hasClass('on') ){
			$(this).text('내용 보기');
			$(this).closest('.one-chk').removeClass('on');
			$(this).closest('.one-chk').find(".cont-area").removeAttr('tabindex').slideUp(150);
		}
		else {
			$(this).text('내용 닫기');
			$(this).closest('.one-chk').addClass('on').siblings('.one-chk').removeClass('on');
			$(this).closest('.terms-agree').find('.cont-area').slideUp(150)
			$(this).closest('.one-chk').find(".cont-area").attr('tabindex','0').slideDown(150);
		}
	})

	// 증지수수료 레이어팝업 클릭이벤트
	$(document).on('click', '.fee-select .depth .bg ul li .btn', function(){
		$(this).closest('li').addClass('on').siblings('li').removeClass('on');
	});

	// 퀵메뉴 GNB
	$('#quick-gnb > .list > li, .sub-bg').mouseenter(function(){
		$('#quick-gnb .depth, .sub-bg').show();
	  });

	$('#quick-gnb > .list > li, .sub-bg').mouseleave(function(){
		$('#quick-gnb .depth, .sub-bg').hide();
	  });

	$(document).on('focus', '#quick-gnb > .list > li, .sub-bg', function(){
		$('#quick-gnb .depth, .sub-bg').show();
	});

	$(document).on('blur', '#quick-gnb > .list > li:last .depth > li:last, .sub-bg', function(){
		$('#quick-gnb .depth, .sub-bg').hide();
	});


	// MY 위택스 - 나의이력 탭
	var myHistoryTab = $(".my-history-tab > ul > li > a"); //나의 이력 레이어 안에 탭 버튼
	var myHistoryTabCont = $(".my-history-tab .tab-cont"); //나의 이력 레이어 안에 탭 콘텐츠

	// 납부결과
	$('.my-history .btn-open-modal').eq(0).click(function(){
		$(myHistoryTab).attr('aria-selected', false).eq(0).attr('aria-selected', true);
		$(myHistoryTabCont).attr('hidden',true).eq(0).removeAttr('hidden');
	});

	// 위임이력
	$('.my-history .btn-open-modal').eq(1).click(function(){
		$(myHistoryTab).attr('aria-selected', false).eq(1).attr('aria-selected', true);
		$(myHistoryTabCont).attr('hidden',true).eq(1).removeAttr('hidden');
	});	

	// 체납관리이력
	$('.my-history .btn-open-modal').eq(2).click(function(){
		$(myHistoryTab).attr('aria-selected', false).eq(2).attr('aria-selected', true);
		$(myHistoryTabCont).attr('hidden',true).eq(2).removeAttr('hidden');
	});
	
	// 송달내역
	$('.my-history .btn-open-modal').eq(3).click(function(){
		$(myHistoryTab).attr('aria-selected', false).eq(3).attr('aria-selected', true);
		$(myHistoryTabCont).attr('hidden',true).eq(3).removeAttr('hidden');
	});

	// 취득유형 클릭이벤트
	$(document).on('click', '.acquisition-type-select .depth .bg ul li .btn', function(){
		$(this).closest('li').addClass('on').siblings('li').removeClass('on');
	});
	
	// 위임자와의 관계 설정 - 레이어
	$(document).on('click', '.mandator .btn-select .button', function(){
		$(this).closest('.mandator').find('.btn-select .button').removeClass('on');
		$(this).addClass('on');
	});
});
// document ready 끝

// window load
$(window).on('load', function(){
	$('.file-area-wrap').each(function(){
		if( $(this).hasClass('default') ){
			var _w = $(this).find('label').outerWidth();
			
			$(this).find('.file').css('padding-right', _w + 10)
		}
	});
	
	if( $('.quick-area').length > 0 ){
		var quickComponent = $('.quick-menu-cont').find('button, input:not([type="hidden"]), select, iframe, textarea, [href]');
		
		$('.quick-menu-cont').attr({
			'tabindex':'-1',
			'aria-selected': false,
			'hidden' : true
		});
		
		quickComponent.attr('tabindex','-1');

		$('.quick-area .list-area .td .report').on({
			mouseenter : function(){
				$('.quick-area .list-area').addClass('on');
			},
			mouseleave : function(){
				$('.quick-area .list-area').removeClass('on');
			}
		});
		
		$('.quick-area .list-area .td .report a').on({
			focus : function(){
				$('.quick-area .list-area').addClass('on');
			},
			blur : function(){
				$('.quick-area .list-area').removeClass('on');
			}
		});
		
		
		$('.quick-area .list-area .td .common a').on({
			mouseenter : function(){
				if( !$(this).hasClass('active') ){
					$(this).addClass('on');
					$('.quick-area .list-area .td .common').addClass('on');
				} 
			},
			mouseleave : function(){
				$(this).removeClass('on');
			}
		});
		
		$('.quick-area .list-area .td .common').on({
			mouseleave : function(){
				$(this).removeClass('on');
			}
		});
		
		
		$(document).on('click', '.quick-area .list-area .td .common a', function(e){
			e.preventDefault();
			
			if( $(this).hasClass('top') ) $('html, body').animate({scrollTop : 0}, 100);
						
			if( $(this).hasClass('menu') ){
				if( $(this).hasClass('active') ){
					$(this).removeClass('active');
					$('.quick-area').removeClass('on')
					$('.quick-menu-cont').attr({
						'tabindex':'-1',
						'aria-selected': false,
						'hidden' : true
					});
					quickComponent.attr('tabindex','-1');
					
					
					$(this).find('.txt .hidden').text('열기');
					console.log('닫기');
				}
				else {
					$(this).addClass('active');
					$('.quick-area').addClass('on');
					$('.quick-menu-cont').removeAttr('tabindex aria-selected hidden');
					
					quickComponent.removeAttr('tabindex');
					
					$(this).find('.txt .hidden').text('닫기');
					console.log('열기');
				}
			}
		});
		
		$(document).on('click', '.quick-area .quick-menu-cont .menu-toggle .toggle', function(){
			if( !$(this).hasClass('on') ){
				$(this).addClass('on').find('span').text('닫기');
				$(this).closest('.menu-toggle').find('.cont').slideDown(150);
				
				$(this).closest('.menu-toggle').siblings('.menu-toggle').find('.toggle').removeClass('on');
				$(this).closest('.menu-toggle').siblings('.menu-toggle').find('.cont').slideUp(150);
			}
			else {
				$(this).removeClass('on').find('span').text('열기');;
				$(this).closest('.menu-toggle').find('.cont').slideUp(150);
			}
		});
	}
	
	if( $('.box-taxpayer').length > 0 ) {
		
		$('.box-taxpayer').closest('.cont-area').addClass('padding');
		
		$(document).on('click','.box-taxpayer .toggle', function(){
			$(this).closest('.box-taxpayer').toggleClass('on');
			$(this).closest('.box-taxpayer').find('.taxpayer-cont').slideToggle(150);
		});
		
		var $box = $('.box-taxpayer'),
			$offset = $box.offset().top;
		var $scroll_box = $(window).scrollTop() + 65;
			
		if( $scroll_box > $offset ) $box.addClass('fix');
		
		$(window).on('scroll', function(){
			$scroll_box = $(window).scrollTop() + 65;
			
			$scroll_box > $offset ? $box.addClass('fix') : $box.removeClass('fix');
		});
	}

	// 스크롤시 제어 클래스
	function fixHeader() {
		if( $('.bg-header-banner').css('display') == 'block'  ){
			$(window).scrollTop() > 156 ? $('body').addClass('scroll') : $('body').removeClass('scroll');
		}
		else {
			$(window).scrollTop() > 36 ? $('body').addClass('scroll') : $('body').removeClass('scroll');
		}
	}
	$(window).on('scroll', function(){
		fixHeader();
	});
	fixHeader();
	
	
	$(document).on('click', '.btn-close-header-banner', function(){
		$('.bg-header-banner').slideUp(300, function(){
			//$('.bg-header-banner').remove();
			fixHeader();
		});
	})

	// 통합검색
	$("#header .btn-search").on("click", function(){
		$(this).toggleClass("on");
		$("#header .search-wrap").show();
		$(".search-wrap .form input").focus();
		if ($(this).hasClass("on"))
		{
			$(this).html("<span class='txt'>통합검색 <em class='hidden'>닫기</em></span>");
		}else{
			$("#header .search-wrap").hide();
			$(this).html("<span class='txt'>통합검색 <em class='hidden'>열기</em></span>");
			$(this).focus();
		}

		$(".search-wrap .tag-list a:last").blur(function(){
			$(".header-search .btn-search").focus();
		});

		$(".search-wrap .save-option button:last").blur(function(){
			$(".search-word-box").hide();
		});
	});

	// 통합검색 상세검색 레이어
	$(document).on('click','.search-option .btn-detail', function(){
		$(this).toggleClass('on');
		$('.detail-srch-layer').toggle();

		var srchlayer = $('.detail-srch-layer'),
		srchlayerTab = srchlayer.find('button, input:not([type="hidden"]), select, iframe, textarea, [href], [tabindex]:not([tabindex="-1"])'),
		srchlayerTabFirst = srchlayerTab && srchlayerTab.first(),
		srchlayerTabLast = srchlayerTab && srchlayerTab.last();

		// Tab키 : 초점 받을 수 있는 마지막 요소에서 첫번째 요소으로 초점 이동
		srchlayerTabLast.on("keydown", function(e) {
			if (!e.shiftKey && (e.keyCode || e.which) === 9) {
				e.preventDefault();
				srchlayerTabFirst.focus();
			}
		});
	});
	
	$(document).on('click', '.detail-srch-layer .btn-close', function(){
		$(this).closest('.detail-srch-layer').hide();
		$(".search-option .btn-detail").focus().removeClass('on');
	});

	// MY위택스 나의 혜택 
	$(document).on('click','.my-benefit .btn-more', function(){
		if( $(this).closest('.my-benefit').hasClass('on') ){
			$(this).closest('.my-benefit').removeClass('on').find('.list').animate({"height": "30px"}, 300);
			$(this).text("더보기");
		}
		else {
			$(this).closest('.my-benefit').addClass('on').find('.list').animate({"height": $('.list ul').height() }, 300);
			$(this).text("닫기");
		}
	});

	// MY위택스 자주 찾는 메뉴
	$(document).on('click','.favorite-menu-area .btn-more', function(){
		if( $(this).closest('.favorite-menu-area').hasClass('on') ){
			$(this).closest('.favorite-menu-area').removeClass('on').find('.menu-list').animate({"height": "55px"}, 300);
			$(this).text("더보기");
		}
		else {
			$(this).closest('.favorite-menu-area').addClass('on').find('.menu-list').animate({"height": $('.menu-list .inner').height() }, 300);
			$(this).text("닫기");
		}
	});

	//---------- 메인관련 ----------//
	//배너리스트
	$(".banner-area .item").on("mouseover focus", function(){
		$(this).addClass("active").siblings().removeClass('active');
	});
});
// window load 끝