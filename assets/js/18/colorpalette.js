(function() {

	var src = 'img1.jpg';
	var canvas = document.getElementById('panel'),
		context = canvas.getContext('2d');

	var image = new Image();

	var RATIO = 20; // 画像の分割比
	var DELTA = 50; // RGB値の差分のしきい値


	// グリッドのサンプルカラーを生成します
	var generateSampleColor = function(data) {
		var result = [],
			totalPixels = data.length / 4;

		result.r = 0;
		result.g = 0;
		result.b = 0;

		// グリッド内の一部ピクセルのRGB値の合計値を出します
		for (var i=0; i<=totalPixels; i+=4) {
			result.r += data[i];
			result.g += data[i + 1];
			result.b += data[i + 2];
		}

		// RGBそれぞれの値をグリッドあたりのピクセル数で割り、
		// さらに4倍することでサンプルカラーを生成します
		result.r = ((result.r / totalPixels + 0.5) | 0) * 4;
		result.r = (result.r > 255) ? 255 : result.r;
		result.g = ((result.g / totalPixels + 0.5) | 0) * 4;
		result.g = (result.g > 255) ? 255 : result.g;
		result.b = ((result.b / totalPixels + 0.5) | 0) * 4;
		result.b = (result.b > 255) ? 255 : result.b;

		return result;
	};


	// 2つのグリッド同士の色情報を比較します
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


	// 2つのグリッド同士の色の平均値を取得します
	var getAverageColor = function(color1, color2) {
		var averageColor = [];

		averageColor.r = (((color1.r + color2.r) / 2) + 0.5) | 0;
		averageColor.g = (((color1.g + color2.g) / 2) + 0.5) | 0;
		averageColor.b = (((color1.b + color2.b) / 2) + 0.5) | 0;

		return averageColor;
	};


	// カラーパレットとなるユニークな色情報を取得します
	// 画像をタテ・ヨコ均等に分割し、分割したグリッドのサンプルカラーを取得します
	// サンプルカラー情報同士を比較してユニークな色情報だけを取得します
	var getUniqueColors = function() {
		var sampleColors = [],
			uniqueColors = [],
			rows = RATIO,
			cells = RATIO,
			cellWidth = (canvas.width / cells) | 0,
			cellHeight = (canvas.height / rows) | 0;

		for (var i=0; i<rows; i++) {
			for (var j=0; j<cells; j++) {
				var colorArray = context.getImageData(cellWidth * j, cellHeight * i, cellWidth, cellHeight);
				var sampleColor = generateSampleColor(colorArray.data);
				sampleColors.push(sampleColor);
			}
		}

		while (sampleColors.length > 0) {
			var baseCol = sampleColors.shift(),
				avgColor = baseCol,
				k = 0;
			while (sampleColors.length > k) {
				var secondCol = sampleColors[k];
				if (areSimilarColors(baseCol, secondCol)) {
					avgColor = getAverageColor(avgColor, sampleColors.splice(k, 1)[0]);
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
		// 画像をキャンバス上に表示します
		context.drawImage(image, 0, 0, image.width, image.height);

		var uniqueColors = getUniqueColors();

		generateColorPalette(uniqueColors);
	};



})();
