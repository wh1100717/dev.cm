(function() {

	var src = 'img1.jpg';
	var canvas = document.getElementById('panel'),
		context = canvas.getContext('2d');

	var image = new Image();

	var DELTA = 50; // RGB値の差分のしきい値
	var RATIO = 20; // 画像の分割比


	// セルの平均色を算出します
	var averageColorFor = function(data) {
		var result = [],
			totalPixels = data.length / 4;  // セルあたりのピクセル数

		result.r = 0;
		result.g = 0;
		result.b = 0;

		// セル内の各ピクセルのRGB値の合計値を出します
		for (var i=0; i<=totalPixels; i+=4) {
			result.r += data[i];
			result.g += data[i + 1];
			result.b += data[i + 2];
		}

		// RGBそれぞれの値をセルあたりのピクセル数で割ることで、平均色値を算出します
	// Math関数 - 処理が重い
		// result.r = Math.round(result.r / totalPixels) * 4;
		// result.r = (result.r > 255) ? 255 : result.r;
		// result.g = Math.round(result.g / totalPixels) * 4;
		// result.g = (result.g > 255) ? 255 : result.g;
		// result.b = Math.round(result.b / totalPixels) * 4;
		// result.b = (result.b > 255) ? 255 : result.b;
		result.r = ((result.r / totalPixels + 0.5) | 0) * 4;
		result.r = (result.r > 255) ? 255 : result.r;
		result.g = ((result.g / totalPixels + 0.5) | 0) * 4;
		result.g = (result.g > 255) ? 255 : result.g;
		result.b = ((result.b / totalPixels + 0.5) | 0) * 4;
		result.b = (result.b > 255) ? 255 : result.b;

		return result;
	};


	// 隣接するピクセル同士の色情報を比較します
	// RGB値のそれぞれの絶対差が DELTA（しきい値）以下の場合は類似色と判定します
	var areSimilarColors = function(color1, color2) {
		if (
			(Math.abs(color1.r - color2.r) <= DELTA) &&
			(Math.abs(color1.g - color2.g) <= DELTA) &&
			(Math.abs(color1.b - color2.b) <= DELTA)
			) {
			return true;
		} else {
			return false;
		}
	};


	// 隣接するピクセル同士の色の平均値を取得します
	var getAverageColor = function(color1, color2) {
		var averageColor = [];
	// Math関数 - 処理が重い
		// averageColor.r = Math.round((color1.r + color2.r) / 2);
		// averageColor.g = Math.round((color1.g + color2.g) / 2);
		// averageColor.b = Math.round((color1.b + color2.b) / 2);

		averageColor.r = (((color1.r + color2.r) / 2) + 0.5) | 0;
		averageColor.g = (((color1.g + color2.g) / 2) + 0.5) | 0;
		averageColor.b = (((color1.b + color2.b) / 2) + 0.5) | 0;

		return averageColor;
	};


	// カラーパレットとなるユニークな色情報を取得します
	// 画像をタテ・ヨコ均等に分割し、分割したセルの平均色情報を取得します
	// 平均色情報同士を比較してユニークな色情報だけを取得します
	var getUniqueColors = function() {
		var averageColors = [],
			uniqueColors = [],
			rows = RATIO,
			cells = RATIO,
			cellWidth = (canvas.width / cells) | 0,  // 小数点以下切り捨て - Math.floor()より高速
			cellHeight = (canvas.height / rows) | 0;

		for (var i=0; i<rows; i++) {
			for (var j=0; j<cells; j++) {
				var colorArray = context.getImageData(cellWidth * j, cellHeight * i, cellWidth, cellHeight);
				var averageColor = averageColorFor(colorArray.data);
				averageColors.push(averageColor);
			}
		}

		while (averageColors.length > 0) {
			var baseCol = averageColors.shift(),
				avgColor = baseCol,
				k = 0;
			while (averageColors.length > k) {
				var secondCol = averageColors[k];
				if (areSimilarColors(baseCol, secondCol)) {
					avgColor = getAverageColor(avgColor, averageColors.splice(k, 1)[0]);
				} else {
					k++;
				}
			}
			uniqueColors.push(avgColor);

		}
		return uniqueColors;
	};


	// カラーパレットを生成します
	var generateColorPalette = function(colors) {
		var palette = document.querySelector('#color-palette tbody');
		var html = '';
		for (var i=0, len=colors.length; i<len; i++) {
			var col = colors[i];
			html += '<tr><th style="background:' + 'rgb(' + col.r + ',' + col.g + ',' + col.b + ')' + '"></th>';
			html += '<td>#' + fillZero(col.r) + fillZero(col.g) + fillZero(col.b) + '</td></tr>';
		}
		palette.innerHTML = html;
	};


	// 画像要素を生成します
	image.src = src;

	// 画像読み込み完了
	image.onload = function() {
		// 画像をカンバス上に表示します
		context.drawImage(image, 0, 0, image.width, image.height);

		var uniqueColors = getUniqueColors();

		generateColorPalette(uniqueColors);
	};



})();