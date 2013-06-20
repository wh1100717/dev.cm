/**
 * @fileOverview	要素をガクブルさせる
 * @author	Naoki Yamada
 * @version	1.0.0
 */

$.fn.shake = function(options) {

	// 要素を退避
	var elements = this;

	// 渡されたオプションとデフォルトをマージする
	var opts = $.extend({}, $.fn.shake.defaults, options);

	// 要素をひとつずつ処理
	elements.each(function() {
		for (var i=0; i<opts.shakes; i++) {
			$(this).animate({marginLeft: opts.x}, opts.speed)
				.animate({marginLeft: opts.x * -1}, opts.speed);
		}

		// 要素を元に戻す
		$(this).animate({marginLeft: 0}, opts.speed);
	});

	// method chain用に要素を返す
	return this;
};

// shakeプラグインのデフォルトオプション
$.fn.shake.defaults = {
	speed: 'slow',
	shakes: 2,
	x: 10
};
