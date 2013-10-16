/**
 * @fileOverview	要素をガクブル - 独自データ属性に対応
 * @author	Naoki Yamada
 * @version	1.0.0
 */

;(function($) {

	$.fn.shake = function(options) {

		// 要素を退避
		var elements = this;

		// 要素をひとつずつ処理
		elements.each(function() {
			// 渡されたオプションおよび独自データ属性をデフォルトにマージする
			var opts = $.extend({}, $.fn.shake.defaults, options, $(this).data());

			doshake($(this), opts);
		});

		// method chain用に要素を返す
		return this;
	};

	// 内部用関数 - ガクブル実行
	function doshake($obj, opts) {
		for (var i=0; i<opts.shakes; i++) {
			$obj.animate({marginLeft: opts.x}, opts.speed)
				.animate({marginLeft: opts.x * -1}, opts.speed);
		}

		// 要素を元に戻す
		$obj.animate({marginLeft: 0}, opts.speed);
	};

	// shakeプラグインのデフォルトオプション
	$.fn.shake.defaults = {
		speed: 'slow',
		shakes: 2,
		x: 10
	};

}) (jQuery);