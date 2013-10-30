(function($) {

	var TogglePasswordVisible = function(element, opts){
		this.element = $(element);
		this.init(opts);
	};

	TogglePasswordVisible.prototype = {
		init: function(opts) {
			console.log('ok');
			this.initInnerToggle(this.element, opts);
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

			toggle.on(opts.toggleEvent, function() {
				console.log('toggled');
				var currentState = el.attr('type') == 'password' ? 'text' : 'password';
				el.attr('type', currentState);
			});
		},

		updateInnerToggle: function(el, current) {

		}
	};


	$.fn.togglePasswordVisible = function(options) {
		// 要素を退避
		var elements = this;

		// オプションをマージ
		var opts = $.extend({}, $.fn.togglePasswordVisible.defaults, options);

		// 要素を1つずつ処理
		elements.each(function() {
			new TogglePasswordVisible(this, opts);
		});

		// method chain用に要素を返す
		return this;
	};

	// デフォルトオプション
	$.fn.togglePasswordVisible.defaults = {
		toggleEvent: 'click'
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