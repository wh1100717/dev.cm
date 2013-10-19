(function() {

	// カンバスオブジェクトを作成
	// width, height を取得
	var canvas = document.getElementById('panel'),
		context = canvas.getContext('2d'),
		w = canvas.width,
		h = canvas.height,

		imageData = context.getImageData(0, 0, w, h);

	// 横方向のループ処理
	for (var x=0; x<w; x++) {
		//  縦方向のループ処理
		for (var y=0; y<h; y++) {
			var targetPixel = (x + y * w) * 4;
			imageData.data[targetPixel + 0] = x;
			imageData.data[targetPixel + 1] = y;
			imageData.data[targetPixel + 2] = (x + y);
			imageData.data[targetPixel + 3] = 255;
		}
	}

	for (var i=0; i<x*h; i++) {
		var targetPixel = i * 4;
		imageData.data[targetPixel + 0] = i / w;
		imageData.data[targetPixel + 1] = i / h;
		imageData.data[targetPixel + 2] = 255;
		imageData.data[targetPixel + 3] = 255;
	}

	context.putImageData(imageData, 0, 0);
})();
