/*
* jQuery UI Tag input 3
* Comma, Enter, Tab, Space でタグ登録処理実行
* Backspace でタグ削除
* タグの重複チェック
*
* Dependencies:
*   jQuery v1.9+
*   jQuery UI v1.10+
*/
;(function($) {
	// プラグインの定義
	$.widget('ui.taginput', {
		// 初期化処理として一番最初に呼び出される
		_create: function() {
			var self = this,
				element = self.element;
			// タグリスト要素を生成し、指定元の要素を隠す
			self.tagList = $('<ul/>').insertAfter(element);
			element.css('display', 'none');
			// タグ入力フォームを生成
			self.tagInput = $('<input type="text" class=""ui-widget-content" />');

			self.tagList
				.addClass('taginput')
				.addClass('ui-widget ui-widget-content ui-corner-all')
				.append($('<li class="taginput-input" />').append(self.tagInput))
				.click(function(e) {
					if (!$(this).hasClass('taginput-label')) {
						self.tagInput.focus();
					}
				});

			// keydownイベント時の処理を定義
			self.tagInput.keydown(function(e) {
				// Backspace
				if (e.which == $.ui.keyCode.BACKSPACE && self.tagInput.val() == '') {
					self.removeTag(self._lastTag());
				}
				// Comma, Enter, Tab, Space
				if (e.which == $.ui.keyCode.COMMA || e.which == $.ui.keyCode.ENTER || e.which == $.ui.keyCode.TAB || e.which == $.ui.keyCode.SPACE) {
					self.generateTag(self._cleanedInput());
					return false;
				}
			}).blur(function(e) {
				self.generateTag(self._cleanedInput());
			});
		},

		generateTag: function(value) {
			var self = this;
			value = $.trim(value);
			if (value == '') {
				return false;
			}
			// 重複チェック
			if (self._isExist(value)) {
				var existingTag = self._findTagByLabel(value);
				existingTag.effect('shake');
				return false;
			}
			// Generate tag
			var label = $('<span class="taginput-label"/>').text(value),
				tag = $('<li/>')
					.addClass('taginput-tag')
					.addClass('ui-widget-content ui-state-default ui-corner-all')
					.append(label),
				removeBtn = $('<a href="#"><span class="text-icon">\xd7</span></a>').
					addClass('taginput-close')
					.click(function(e) {
						e.preventDefault();
						self.removeTag(tag);
					});
				tag.append(removeBtn);

			self.tagInput.val('');
			self.tagInput.parent().before(tag);
		},

		removeTag: function(tag) {
			var $tag = $(tag);
			$tag.remove();
		},

		_cleanedInput: function() {
			return $.trim(this.tagInput.val().replace(/^"(.*)"$/, '$1'));
		},

		// 一番後ろのタグを取得
		_lastTag: function() {
			return this.tagList.find('.taginput-tag:last');
		},

		// タグの存在チェック
		_isExist: function(name) {
			return this._findTagByLabel(name);
		},

		// 文字列からタグを探し出す
		_findTagByLabel: function(name) {
			var tag = null;
			this.tagList.find('.taginput-tag').each(function(index, value) {
				var $value = $(value),
					val = $value.find('.taginput-label').text();
				if (name == val) {
					tag = $value;
					return false;
				}
			});
			return tag;
		}
	});
})(jQuery);