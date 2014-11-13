/*
pieChart - 1.00 [13.11.14]
Author: vadimsva
Github: https://github.com/vadimsva/pieChart
*/
(function ($) {
	$.fn.pieChart = function(method){
	return this.each(function() {
	
		var el = $(this);
		var elClass = 'pieChart';		
		
		var methods = {
			init : function() {
				var _defaults = {
					dia : 100,
					val : 10,
					bg : '#fff',
					color : '#000',
					time : 1000,
					data : []
				};
				var _options = $.extend(_defaults, method);

				el.addClass(elClass).css({width: _options.dia + 'px', height:  _options.dia + 'px'});
				
				var degStart = 0;
				if (_options.data.length > 0) {
					for (var i = 0; i < _options.data.length; ++i) {
						_init(degStart, _options.data[i].val, _options.data[i].color, _options.data.length, i);
						degStart += _options.data[i].val;
					}
				} else {
					_init(degStart, _options.val, _options.color);
				}
				
				function _init(degStart, val, color, count, i) {
					if(count == undefined){
						var opacity = 1;
					} else {
						var opacity = (count - i)/count;
					}
					
					var elText = $('<div class="pieText">' + val + '%</div>');
					var elMask = $('<div class="pieMask" style="background:' + color + ';transform:rotate(' + degStart + 'deg);opacity:' + opacity + '"></div>');
					var elMaskL = $('<div class="pieMaskLeft" style="background:' + _options.bg + '"></div>');
					var elMaskR = $('<div class="pieMaskRight" style="background:' + _options.bg + '"></div>');
					
					val *= 3.6;
					
					elMask.append(elMaskL, elMaskR);
					el.append(elMask, elText);
					var k = _options.time / val;
					
					setTimeout(function () {
						if (val > 180) {
							elMask.addClass('lt');
							elMask.find('> .pieMaskRight').css({transform:'rotate(' + 180 + 'deg)'});
							elMask.find('> .pieMaskRight').css({transition:'transform ' + k * 180 + 'ms ease-in-out'});
							setTimeout(function () {
								elMask.removeClass('lt').addClass('gt');
								elMask.find('> .pieMaskRight').css({transition:'none'});
								elMask.find('> .pieMaskRight').css({background: color, transform:''});
								elMask.find('> .pieMaskLeft').css({transition:'transform ' + k * 180 + 'ms ease-in-out'});
								elMask.find('> .pieMaskLeft').css({transform:'rotate(' + parseInt(val - 180) + 'deg)'});
							}, k * 180 - 180);
						} else {
							elMask.addClass('lt');
							elMask.find('> .pieMaskRight').css({transition:'transform ' + _options.time + 'ms ease-in-out'});
							elMask.find('> .pieMaskRight').css({transform:'rotate(' + val + 'deg)'});
						}
					}, 100);
				}
				

			}
		};
		
		if ( methods[method] ) {
			return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof method === 'object' || ! method ) {
			return methods.init.apply( this, arguments );
		}

	});
	}
})(jQuery);
