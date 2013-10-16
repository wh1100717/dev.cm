(function() {

	var canvas = document.getElementById('panel'),
		context = canvas.getContext('2d'),
		w = canvas.width,
		h = canvas.height,

		imageData = context.getImageData(0, 0, w, h);

	for (var x=0; x<w; x++) {
		for (var y=0; y<h; y++) {
			var targetPixel = (x + y * w) * 4;
			imageData.data[targetPixel + 0] = x       & -(0x100/8);
			imageData.data[targetPixel + 1] = y       & -(0x100/8);
			imageData.data[targetPixel + 2] = (x + y) & -(0x100/8);
			imageData.data[targetPixel + 3] = 255;
		}
	}

	context.putImageData(imageData, 0, 0);

})();