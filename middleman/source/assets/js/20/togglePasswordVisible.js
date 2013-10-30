(function($) {


	// Example 1
	$('#password').hideShowPassword({
		// Creates a wrapper and toggle element with minimal styles.
		innerToggle: true,
		// Makes the toggle functional in touch browsers without
		// the element losing focus.
		// touchSupport: Modernizr.touch
	});
})(jQuery);