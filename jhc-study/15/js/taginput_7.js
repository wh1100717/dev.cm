/*
* jQuery UI Tag input 7
* Comma, Enter, Tab, Space でタグ登録処理実行
* Backspace でタグ削除
* タグの重複チェック
* オプションでタグの上限数を設定
* オプションでスペース入力を許可
* デフォルト値から初期表示タグを生成
* 生成したタグをelement要素のvalue値に反映
* コールバック用のトリガーを定義
*
* Dependencies:
*   jQuery v1.9+
*   jQuery UI v1.10+
*/
;(function($) {
	// プラグインの定義
	$.widget('ui.taginput', {
		options: {
			tagLimit: 0,
			allowSpaces: false,
			// event callbacks
			tagAdding: null,
			tagAdded: null,
			tagRemoving: null,
			tagRemoved: null,
			tagLimitExceeded: null
		},
		// 初期化処理として一番最初に呼び出される
		_create: function() {
			var self = this,
				element = self.element;
			// タグリスト要素を生成し、指定元の要素を隠す
			self.tagList = $('<ul/>').insertAfter(element);
			element.css('display', 'none');
			// タグ入力フォームを生成
			self.tagInput = $('<input type="text" class=""ui-widget-content" />');
			//　タグリストとタグ入力フォームを生成
			self.tagList
				.addClass('taginput')
				.addClass('ui-widget ui-widget-content ui-corner-all')
				.append($('<li class="taginput-input" />').append(self.tagInput))
				.click(function(e) {
					var $this = $(this);
					if ($this.hasClass('taginput-label')) {
						var tag = $this.closest('taginput-tag');
					} else {
						self.tagInput.focus();
					}
				});

			// デフォルト値から初期表示タグを生成
			var defaultValues = self.element.val().split(',');
			for (var i=0,len=defaultValues.length; i<len; i++) {
				self.generateTag(defaultValues[i]);
			}

			// keydownイベント時の処理を定義
			self.tagInput.keydown(function(e) {
				// Backspace
				if (e.which == $.ui.keyCode.BACKSPACE && self.tagInput.val() == '') {
					self.removeTag(self._lastTag());
				}
				// Comma, Enter, Tab, Space
				if (e.which == $.ui.keyCode.COMMA || e.which == $.ui.keyCode.ENTER || e.which == $.ui.keyCode.TAB || (e.which == $.ui.keyCode.SPACE && !self.options.allowSpaces)) {
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

			// タグの上限数チェック
			var limit = self.options.tagLimit;
			if (limit && self._tags().length >= limit) {
				this._trigger('tagLimitExceeded', event, {
					label: value
				});
				self.tagInput.val('');
				return false;
			}

			// タグ生成
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

			// trigger
			self._trigger('tagAdding', event, {
				tag : tag,
				tagLabel: label.text()
			});

			self.tagInput.val('');
			self.tagInput.parent().before(tag);

			// trigger
			self._trigger('tagAdded', event, {
				tag : tag,
				tagLabel: label.text()
			});

			// タグをelement要素のvalue値に反映
			var assignedTags = [];
			self.tagList.find('.taginput-label').each(function() {
				assignedTags.push($(this).text());
			});
			this.element.val(assignedTags.join(','));
		},

		removeTag: function(tag) {
			// trigger
			this._trigger('tagRemoving', event, {
				tag: tag,
				tagLabel: tag.find('.taginput-label').text()
			});

			var $tag = $(tag);
			$tag.remove();

			// trigger
			this._trigger('tagRemoving', event, {
				tag: tag,
				tagLabel: tag.find('.taginput-label').text()
			});
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
			this._tags().each(function(index, value) {
				var $value = $(value),
					val = $value.find('.taginput-label').text();
				if (name == val) {
					tag = $value;
					return false;
				}
			});
			return tag;
		},

		// 登録済みタグ要素の一覧を取得
		_tags:function() {
			return this.tagList.find('.taginput-tag');
		}
	});
})(jQuery);