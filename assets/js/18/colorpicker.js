(function() {

	var src = 'img1.jpg';

	var canvas = document.getElementById('panel'),
		context = canvas.getContext('2d');

	var image = new Image();

	var canvasOffset = $(canvas).offset(),
		canvasX = 0,
		canvasY = 0,
		imageData = {},
		pixel = [],
		rgba = '',
		hex = '',
		preview = $('#preview'),
		input_r = $('#color_r'),
		input_g = $('#color_g'),
		input_b = $('#color_b'),
		input_hex = $('#color_hex');

	
	// 画像要素を生成します
	image.src = src;
	image.onload = function() {
		// 画像をカンバス上に表示します
		context.drawImage(image, 0, 0, image.width, image.height);
	}


	// マウスカーソル上にあるピクセルの色情報を取得します
	$('#panel').on('mousemove', function(e) {
		canvasX = Math.floor(e.pageX - canvasOffset.left);
		canvasY = Math.floor(e.pageY - canvasOffset.top);

		imageData = context.getImageData(canvasX, canvasY, 1, 1);
		pixel = imageData.data;
		rgba = 'rgba(' + pixel[0] + ',' + pixel[1] + ',' + pixel[2] + ',' + pixel[3] + ')';
		hex = fillZero(pixel[0]) + fillZero(pixel[1]) + fillZero(pixel[2]);

		// 取得した色情報を画面側に渡します
		preview.css({backgroundColor: rgba});
		input_r.val(pixel[0]);
		input_g.val(pixel[1]);
		input_b.val(pixel[2]);
		input_hex.val(hex);
	});

})();
