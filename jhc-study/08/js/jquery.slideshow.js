(function($) {

	$.fn.slideshow = function(options) {
		// 要素を退避
		var elements = this;

		// 渡されたオプションとデフォルトをマージ
		var opts = $.extend({}, $.fn.slideshow.defaults, options);

		// 要素をひとつずつ処理
		elements.each(function() {
			var $img = $(this);
			var current = 0;

			function show(index) {
				var total = opts.images.length;
				while (index < 0) {
					index += total;
				}
				while (index >= total) {
					index -= total;
				}
				current = index;
				$img.attr('src', opts.images[index]);

				if (auto) {
					start();
				}
			}

			function prev() {
				show(current - 1);
			}

			function next() {
				show(current + 1);
			}

			$img.bind('prev', prev)
				.bind('next', next)
				.bind('goto', function(event, index) {
					show(index);
				}
			);

			var auto = false;
			var id;

			function start() {
				stop();
				auto = true;
				id = setTimeout(next, opts.interval);
			}

			function stop() {
				auto = false;
				clearTimeout(id);
			}

			$img.bind('start', start).bind('stop', stop);
		});

		return this;
	};

	// デフォルトオプション
	$.fn.slideshow.defaults = {
		images: [],
		interval: 2000
	};


}) (jQuery);
