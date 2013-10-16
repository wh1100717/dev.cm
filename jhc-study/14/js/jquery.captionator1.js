;(function($) {
	// プラグインの定義
	$.widget('ui.captionator', {
		// 初期化処理として一番最初に呼び出される
		_create: function() {
			var self = this,	// ウィジェットインスタンスを変数に待避 - (※1)
				element = self.element;	// 要素を変数に待避 - (※2)
			alert(element.attr('alt'));
		},
		// _create の次に呼び出される
		_init: function() {
			var self = this,
				element = self.element;
			alert(element.attr('title'));
		}
	});
})(jQuery);