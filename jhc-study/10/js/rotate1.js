$(function() {
	$('#btnGo').click(function(e) {
		e.preventDefault();
		pageTransition('#page1', '#page2');
	});
	$('#btnBack').click(function(e) {
		e.preventDefault();
		pageTransition('#page2', '#page1');
	});

	function pageTransition(from, to) {
		var dfd = $.Deferred();
		dfd.then(function() {
			$(from).addClass('hiding');
		}).then(function() {
			setTimeout(function() {
				$(to).removeClass('hiding');
			}, 1000);
		});
		dfd.resolve();
	}
});