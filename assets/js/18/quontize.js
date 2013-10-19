(function() {

	var src = 'img2.jpg';

	var canvas1 = document.getElementById('panel'),
		context1 = canvas1.getContext('2d'),
		w = canvas1.width,
		h = canvas1.height;

	var canvas2 = document.createElement('canvas'),
		context2 = canvas2.getContext('2d');
	canvas2.width = w;
	canvas2.height = h;

	var panel2Container = document.getElementById('panel2-container')

	var image = new Image();

	
	// 画像要素を生成します
	image.src = src;
	image.onload = function() {
		context2.drawImage(image, 0, 0, image.width, image.height);

		var imageData = context2.getImageData(0, 0, image.width, image.height);
		
		// 減色処理 ~ 均等量子化法
		for (var x=0; x<w; x++) {
			for (var y=0; y<h; y++) {
				var targetPixel = (x + y * w) * 4;
				imageData.data[targetPixel + 0] = imageData.data[targetPixel + 0] & -(0x100/8);
				imageData.data[targetPixel + 1] = imageData.data[targetPixel + 1] & -(0x100/8);
				imageData.data[targetPixel + 2] = imageData.data[targetPixel + 2] & -(0x100/4);
				imageData.data[targetPixel + 3] = 255;
			}
		}
		context2.putImageData(imageData, 0, 0);

		// オリジナル画像をカンバス上に表示します
		context1.drawImage(image, 0, 0, image.width, image.height);
		// 減色画像を画面に表示します
		panel2Container.appendChild(canvas2);
	}

})();
