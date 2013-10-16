;(function($) {

	$.fn.circlemenu = function(options) {
		var elements = this;
		var opts = $.extend({}, $.fn.circlemenu.defaults, options);

		elements.each(function() {
			var $obj = $(this);
			var menuButton = $obj.children('.menu-button');
			var menuItems = $obj.children('.menu-option').children();
			var itemAngle = [];
			var xPos = [];
			var yPos = [];
			var angle = opts.angleDifference / (menuItems.length - 1);

			menuButton.unbind('click');

			function clickHandler(e) {
				e.preventDefault();
				if ($(this).parent().hasClass('active')) {
					$(this).parent().removeClass('active').addClass('inactive');
					setPosition(false);
				} else {
					$(this).parent().removeClass('inactive').addClass('active');
					setPosition(true);
				}
			}

			function setPosition(value) {
				menuItems.each(function(i, item) {
					var ele = $(this);
					delayTime = i * opts.delay;
					window.setTimeout(function() {
						$(item).css({
							'left': value ? xPos[i] : 0,
							'top' : value ? yPos[i]* -1: 0
						});
					}, delayTime);
				});
			}

			menuButton.bind('click', clickHandler);

			menuItems.each(function(i, item) {
				itemAngle[i] = (opts.startAngle + angle * i) * Math.PI / 180;
				xPos[i] = opts.radius * Math.cos(itemAngle[i]);
				yPos[i] = opts.radius * Math.sin(itemAngle[i]);
				$(item).css({'transform': 'rotate(' + (90-itemAngle[i]*180/Math.PI) + 'deg)'});
			});

		});

		return this;
	};

	// default options
	$.fn.circlemenu.defaults = {
		startAngle: 0,
		angleDifference: 90,
		radius: 200,
		delay: 40
	};

})(jQuery);
