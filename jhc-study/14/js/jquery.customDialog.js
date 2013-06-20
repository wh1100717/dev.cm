;(function($) {
	// プラグインの定義 - オーバーライド
	$.widget('ui.customDialog', $.ui.dialog, {
		// デフォルトのオプションをオーバーライド
		options: {
			width: 500,
			height: 250,
			autoOpen: false
		},
		// createメソッドをオーバーライド
		_create: function() {
			// 継承元の_createメソッドを呼び出す
			// $.ui.dialog.prototype._create.apply(this, arguments);	※1.8までの書き方
			this._super('_create', this, arguments);	// 1.9以降の書き方

			// コンテンツを入れ替える
			this.element.find('p').text('Hi! My name is Wakamsha. I am a Web depeloper. My favourite languages are HTML5, CSS3, JavaScript etc...');
		},

		// openメソッドをオーバーライド
		open: function() {
			// 継承元のopenメソッドを呼び出す
			this._super('open', this, arguments);
			// 非表示にしてフェードイン表示させる
			this.element.hide().slideDown(1000);
		},

		// closeメソッドをオーバーライド
		close: function() {
			if (confirm('Is it closing time?')) {
				this._super('close', this, arguments);
			}
		}
	});
})(jQuery);