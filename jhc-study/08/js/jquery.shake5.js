/**
 * @fileOverview	要素をガクブルさせる - コールバック関数に対応
 * @author	Naoki Yamada
 * @version	1.0.0
 */

;(function($) {

	$.fn.shake = function(options, callback) {

		// 要素を退避
		var elements = this;
		//var callbacks = $.Callbacks();

		// 要素をひとつずつ処理
		elements.each(function(i) {
			// 渡されたオプションおよび独自データ属性をデフォルトにマージする
			var opts = $.extend({}, $.fn.shake.defaults, options, $(this).data());
			doshake($(this), opts);

			if (!--elements.length) {
				console.log('ok');
			}
		});

		// 内部用関数 - ガクブル実行
		function doshake($obj, opts) {
			for (var i=0; i<opts.shakes; i++) {
				$obj.animate({marginLeft: opts.x}, opts.speed)
				.animate({marginLeft: opts.x * -1}, opts.speed);
			}

			// 要素を元に戻す
			$obj.animate({marginLeft: 0}, opts.speed);
		};
		//callback.apply(this);

		// method chain用に要素を返す
		return this;
	};

	// shakeプラグインのデフォルトオプション
	$.fn.shake.defaults = {
		speed: 'slow',
		shakes: 2,
		x: 10
	};

}) (jQuery);