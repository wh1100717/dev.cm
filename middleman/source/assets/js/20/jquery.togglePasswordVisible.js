;(function($) {

	// デフォルトオプション
	var defaults = {
		show: 'unclear',
		toggleEvent: 'click',
		touchSupport: false,
		toggleTouchEvent: 'touchstart mousedown',
		states: {
			shown: {
				eventName: 'passwordShown',
				inputClass: 'toggle-password-visible-shown',
				toggleClass: 'toggle-password-visible-hide',
				attr: {
					type: 'text',
					autocapitalize: 'off',
					autocomplete: 'off',
					autocorrect: 'off',
					spellcheck: false
				}
			},
			hidden: {
				eventName: 'passwordHidden',
				inputClass: 'toggle-password-visible-hidden',
				toggleClass: 'toggle-password-visible-show',
				attr: {
					type: 'password'
				}
			}
		}
	};

	// コンストラクタ
	var TogglePasswordVisible = function(element, options){
		this.element = $(element);
		this.init(options);
	};

	TogglePasswordVisible.prototype = {
		
		init: function(options) {
			this.update(options, defaults, (this.element.attr('type') === 'password'));
			this.initInnerToggle(this.element, this.options);
			this.dennyDoubleByteChar(this.element);
		},

		// オプション値、インプット要素を更新
		update: function(options, optionsBase, toggleFallback) {
			optionsBase = optionsBase || this.options;
			toggleFallback = toggleFallback || !this.options.show;
			if (typeof options !== 'object') {
				options = {show: options};
			}
			// オプションをマージ
			this.options = $.extend({}, optionsBase, options);

			if (this.options.show === 'unclear') {
				this.options.show = false;
			}
			if (this.options.show === 'toggle') {
				this.options.show = toggleFallback;
			}

			// 状態を適用する
			var currentKey = this.currentStateKey();
			$.each(this.options.states, $.proxy(function(key, state) {
				if (currentKey === key) {
					$.each(state.attr, $.proxy(function(key, value){
						this.element.attr(key, value);
					}, this));
					this.element.addClass(state.inputClass).trigger(state.eventName);
				} else {
					this.element.removeClass(state.inputClass).trigger(state.eventName);
				}
			}, this));
		},

		// 現在の状態をキーで返す
		currentStateKey: function() {
			return this.options.show ? 'shown' : 'hidden';
		},

		// トグルボタン初期化処理
		initInnerToggle: function(element, options) {
			var wrapper,
				toggle,
				eventName = '',
				toggleEventName = '';

			element.wrap('<div class="toggle-password-visible-wrapper"/>');
			wrapper = element.parent();
			toggle = $('<div class="toggle-password-visible-toggle"/>');
			this.updateInnerToggle(toggle, this.currentStateKey(), options.states);
			toggle.appendTo(wrapper);
			element.css({paddingRight: toggle.width()});

			// タッチデバイスにおいてはインプット要素全体に対してイベントハンドリングし、
			// タッチした座標からトグルボタンが押されたかどうかを判断する
			// トグルボタンが位置する座標上がタップされたらインプット要素更新処理を呼び出す
			// PCにおいてはトグルボタンのクリックイベントをハンドリングする
			if (options.touchSupport) {
				toggle.css('pointerEvents', 'none');
				element.on(options.toggleTouchEvent, $.proxy(function (event) {
					var toggleX = toggle.offset().left,
						eventX;
					if (toggleX) {
						eventX = event.pageX || event.originalEvent.pageX;
						if (eventX >= toggleX) {
							event.preventDefault();
							this.update('toggle');
						}
					}
				}, this));
			} else {
				toggle.on(options.toggleEvent, $.proxy(function(event) {
					this.update('toggle');
				}, this));
			}

			// イベント・ドリブン定義
			$.each(this.options.states, function(key, state) {
				eventName+= state.eventName + ' ';
			});
			element.on(eventName, $.proxy(function() {
				this.updateInnerToggle(toggle, this.currentStateKey(), options);
			}, this));
		},

		// トグルボタンを更新
		updateInnerToggle: function(element, currentKey, states) {
			$.each(this.options.states, function(key, state) {
				if (currentKey == key) {
					element.addClass(state.toggleClass);
				} else {
					element.removeClass(state.toggleClass);
				}
			});
		},

		// 入力制限 - 2バイト文字の入力を制限する
		dennyDoubleByteChar: function(element) {
			element.bind('copy', function(event){
				event.preventDefault();
			});
			element.bind('keyup blur', function(event) {
				var key = event.charCode ? event.charCode : event.keyCode ? event.keyCode : 0
				if (
					key == 8  /* backspace */
				 || key == 9  /* tab */
				 || key == 13 /* enter */
				 || key == 16 /* shift */
				 // || key == 17 /* ctrl */
				 || key == 18 /* alt */
				 || key == 35 /* end */
				 || key == 36 /* home */
				 || key == 37 /* left */
				 || key == 38 /* up */
				 || key == 39 /* right */
				 || key == 39 /* down */
				 || key == 46 /* del */
				 // || key == 91 /* command */
				) {
					return true;
				}

				$(this).val($(this).val().replace(/[^a-zA-Z0-9 !\"#$%&\'()*+,-.\/:;<=>?@\\\[\]\^_`{|}~]/g, ''));
			});
		}
	};

	// main
	$.fn.togglePasswordVisible = function(options) {
		// 要素を退避
		var elements = this;

		// 要素を1つずつ処理
		elements.each(function() {
			new TogglePasswordVisible(this, options);
		});

		// method chain用に要素を返す
		return this;
	};

})(jQuery);