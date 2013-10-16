(function() {

	var src = 'img3.jpg';
	var canvas = document.getElementById('panel'),
		context = canvas.getContext('2d');

	var image = new Image();

	var delta = 50;	// RGB値の差分のしきい値


	var averageColorFor = function(data) {
		var result = [],
			totalPixels = data.length / 4;

		result.r = 0;
		result.g = 0;
		result.b = 0;

		for (var i=0; i<=totalPixels; i+=4) {
			result.r += data[i];
			result.g += data[i + 1];
			result.b += data[i + 2];
		}

		result.r = Math.round(result.r / totalPixels) * 4;
		result.r = (result.r > 255) ? 255 : result.r;
		result.g = Math.round(result.g / totalPixels) * 4;
		result.g = (result.g > 255) ? 255 : result.g;
		result.b = Math.round(result.b / totalPixels) * 4;
		result.b = (result.b > 255) ? 255 : result.b;

		return result;
	};


	// 隣接するピクセル同士の色情報を比較します
	// RGB値のそれぞれの絶対差が delta（しきい値）以下の場合は類似色と判定します
	var areSimilarColors = function(color1, color2) {
		if (
			(Math.abs(color1.r - color2.r) <= delta) &&
			(Math.abs(color1.g - color2.g) <= delta) &&
			(Math.abs(color1.b - color2.b) <= delta)
			) {
			return true;
		} else {
			return false;
		}
	};


	// 隣接するピクセル同士の色の平均値を取得します
	var getAverageColor = function(color1, color2) {
		var averageColor = [];
		averageColor.r = Math.round((color1.r + color2.r) / 2);
		averageColor.g = Math.round((color1.g + color2.g) / 2);
		averageColor.b = Math.round((color1.b + color2.b) / 2);

		return averageColor;
	};


	// カラーパレットとなるユニークな色情報を取得します
	// 画像をタテ・ヨコ20分割し、分割したセルの平均色情報を取得します
	// 平均色情報同士を比較してユニークないろ情報だけを取得します
	var getUniqueColors = function() {
		var averageColors = [],
			uniqueColors = [],
			rows = 20,
			cells = 20,
			cellWidth = (canvas.width / cells) >> 0,
			cellHeight = (canvas.height / rows) >> 0;

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
			html += '<td>#' + col.r.toString(16) + col.g.toString(16) + col.b.toString(16) + '</td></tr>';
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