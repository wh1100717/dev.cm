;(function($) {
	// プラグインの定義
	$.widget('ui.captionator', {
		// デフォルト値
		options: {
			location: 'bottom',
			color: '#fff',
			backgroundColor: '#000'
		},
		_captionClassName: 'ui-caption',

		// 初期化処理として一番最初に呼び出される
		_create: function() {
			var self = this,	// ウィジェットインスタンスを変数に待避 - (※1)
				element = self.element,	// 要素を変数に待避 - (※2)
				opts = self.options;	// マージ済みのオプションを変数に待避 - (※3)

			element.addClass('polaroid').wrap('<div class="ui-caption-container"/>');
			var container = element.parent().width(element.width()),
				cap = $('<span/>').text(element.attr('alt'))
					.addClass(this._captionClassName)
					.css({
						backgroundColor: opts.backgroundColor,
						color: opts.color,
						width: element.width()
					}).insertAfter(element),
				capWidth = element.width() - parseInt(cap.css('padding')) * 2,
				capHeight = cap.outerHeight();
			cap.css({
				width: capWidth,
				top: self._setTopCoordinate(opts.location, element, capHeight),
				left: (element.outerWidth() - element.width()) / 2
			});
		},
		// キャプションのtop値を算出
		_setTopCoordinate: function(value, element, capHeight) {
			var offset = (element.outerHeight() - element.height()) / 2;
			return (value === 'top') ? 0 : element.outerHeight() - offset - capHeight;
		},

		// キャプションのパラメータ値を取得
		getCaptionAttr: function(keys) {
			var vals = [],
				cap = this.element.next();
			for (var i=0, len=keys.length; i<len; i++) {
				vals.push($(cap).css(keys[i]));
			}
			return vals;
		}
	});
})(jQuery);