(function() {

	var COUNT = 10000000;
	
	var mathRoundBenchmark = function(value) { 
		var count = COUNT,
			timeS = new Date();	// 計測開始時刻
		while (count--) {
			var hoge = Math.round(value);
		}
		var timeE = new Date();
		
		return timeE - timeS;	// 計測終了時刻
	};

	var bitBenchmark = function(value) {
		var count = COUNT,
			timeS = new Date();	// 計測開始時刻
		while (count--) {
			var hoge = ((value+0.5) >> 0);
		}
		var timeE = new Date();

		return timeE - timeS;
	};

	var orBenchmark = function(value) {
		var count = COUNT,
			timeS = new Date();	// 計測開始時刻
		while (count--) {
			var hoge = ((value+0.5) | 0);
		}
		var timeE = new Date();

		return timeE - timeS;
	};

	var contaienr = document.getElementById('contaienr');
	
	container.innerHTML = 
	'<table class="table"><tbody>'
		+ "<tr><th><tt>Math.round(42.195) * 10,000,000</tt></th><td class='value'>" + mathRoundBenchmark(42.195) + ' ms</td></tr>'
		+ "<tr><th><tt>((42.195 + 0.5) >> 0) * 10,000,000</tt></th><td class='value'>" + bitBenchmark(42.195) + ' ms</td></tr>'
		+ "<tr><th><tt>((42.195 + 0.5) | 0) * 10,000,000</tt></th><td class='value'>" + orBenchmark(42.195) + ' ms</td></tr>'
	+ '</tbody></table>';

	console.log('round', Math.round(42.195));
	console.log('bit', (42.195+0.5) >> 0);
	console.log('or', (42.195+0.5) | 0);
})();