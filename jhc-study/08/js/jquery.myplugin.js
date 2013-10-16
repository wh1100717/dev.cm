
$.fn.myplugin = function() {

	//要素を退避
	var elements = this;

	// 要素をひとつずつ処理
	elements.each(function() {
		$('body').append('<p>Welcome to the ' + this.innerHTML + ' world!</p>');
	});

	// method chain用に要素を返す
	return this;
};