;(function($) {
	// プラグインの定義
	$.widget('ui.captionator', {
		// デフォルト値
		options: {
			backgroundColor: '#fff'
		},
		// 初期化処理として一番最初に呼び出される
		_create: function() {
			var self = this,	// ウィジェットインスタンスを変数に待避 - (※1)
				element = self.element,	// 要素を変数に待避 - (※2)
				opts = self.options;	// マージ済みのオプションを変数に待避 - (※3)

			element.addClass('polaroid')
				.css('backgroundColor', opts.backgroundColor);
		}
	});
})(jQuery);