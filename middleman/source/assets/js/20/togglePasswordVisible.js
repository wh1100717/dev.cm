(function($) {

	var TogglePasswordVisible = function(element, opts){
		this.element = $(element);
		this.init(opts);
	};

	TogglePasswordVisible.prototype = {
		// デフォルトオプション
		defaults: {
			show: false,
			toggleEvent: 'click',
			states: {
				shown: {
					attr: {
						type: 'text',
						autocapitalize: 'off',
						autocomplete: 'off',
						autocorrect: 'off',
						spellcheck: false
					}
				},
				hidden: {
					attr: {
						type: 'password'
					}
				}
			}
		},
		
		init: function(opts) {
			console.log('init');
			this.update(opts);
			// this.initInnerToggle(this.element, opts);
		},

		update: function(opts, optsBase) {
			optsBase = optsBase || this.opts;
			if (typeof opts !== 'Object') {
				opts = {show: opts};
			}
			// オプションをマージ
			this.opts = $.extend({}, optsBase, opts);
			
			console.log(opts);
		},

		initInnerToggle: function(el, opts) {
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
				};
			el.wrap('<div class="toggle-password-visible-wrapper"/>');
			wrapper = el.parent();
			wrapper.css(wrapperCSS);
			toggle = $('<div class="toggle-password-visible-toggle"/>').css(toggleCSS);

			toggle.appendTo(wrapper);

			toggle.on(opts.toggleEvent, $.proxy(function(event) {
				this.update('toggle');
			}, this));
		},

		updateInnerToggle: function(el, current) {

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