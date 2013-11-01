(function($) {

	// デフォルトオプション
	var defaults = {
		show: 'unclear',
		toggleEvent: 'click',
		states: {
			shown: {
				eventName: 'passwordShown',
				inputClass: 'toggle-password-visible-shown',
				toggleClass: 'toggle-password-visible-hide',
				attr: {
					type: 'text',
					autocapitalize: 'off',
					autocomplete: 'off',
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

	var TogglePasswordVisible = function(element, options){
		this.element = $(element);
		this.init(options);
	};

	TogglePasswordVisible.prototype = {
		
		init: function(options) {
			this.update(options, defaults, (this.element.attr('type') === 'password'));
			this.initInnerToggle(this.element, this.options);
		},

		update: function(options, optionsBase, toggleFallback) {
			optionsBase = optionsBase || this.options;
			toggleFallback = toggleFallback || !this.options.show;
			if (typeof options !== 'Object') {
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

		currentStateKey: function() {
			return this.options.show ? 'shown' : 'hidden';
		},

		initInnerToggle: function(element, options) {
			var wrapper,
				toggle,
				wrapperCSS = {
					position: 'relative'
				},
				toggleCSS = {
					position: 'absolute',
					top: 0,
					right: 0,
					bottom: 0,
					width: '30px',
					backgroundColor: 'red'
				},
				eventName = '';

			element.wrap('<div class="toggle-password-visible-wrapper"/>');
			wrapper = element.parent();
			wrapper.css(wrapperCSS);
			toggle = $('<div class="toggle-password-visible-toggle"/>').css(toggleCSS);

			toggle.appendTo(wrapper);

			toggle.on(options.toggleEvent, $.proxy(function(event) {
				this.update('toggle');
			}, this));

			$.each(this.options.states, function(key, state) {
				eventName+= state.eventName + ' ';
			});
			element.on(eventName, $.proxy(function() {
				this.updateInnerToggle(toggle, this.currentStateKey(), options)
			}, this));
		},

		updateInnerToggle: function(element, currentKey, states) {
			$.each(this.options.states, function(key, state) {
				if (currentKey == key) {
					element.addClass(state.toggleClass);
				} else {
					element.removeClass(state.toggleClass);
				}
			});
		}
	};


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

	// Example 1
	// $('#password').hideShowPassword({
	// 	// Creates a wrapper and toggle element with minimal styles.
	// 	innerToggle: true,
	// 	// Makes the toggle functional in touch browsers without
	// 	// the element losing focus.
	// 	// touchSupport: Modernizr.touch
	// });

	$('#password').togglePasswordVisible();
})(jQuery);