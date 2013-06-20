/**
 * @fileOverview	要素をガクブル - 静的関数を追加
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

	// 追加するためのベースを定義
	$.shake = {};

	// 静的関数 1
	$.shake.yurayura = function($obj) {
		var opts = {
			speed: 1000,
			shakes: 10,
			x: 20
		};
		doshake($obj, opts);
	};

	// 静的関数 2
	$.shake.gakuburu = function($obj) {
		var opts = {
			speed: 25,
			shakes: 100,
			x: 10
		};
		doshake($obj, opts);
	};

	// shakeプラグインのデフォルトオプション
	$.fn.shake.defaults = {
		speed: 'slow',
		shakes: 2,
		x: 10
	};

}) (jQuery);