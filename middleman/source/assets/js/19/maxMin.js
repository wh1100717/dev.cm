(function() {

	var COUNT = 10000000;
	
	var mathMaxBenchmark = function(value1, value2) { 
		var count = COUNT,
			timeS = new Date();	// 計測開始時刻
		while (count--) {
			var hoge = Math.max(value1, value2);
		}
		var timeE = new Date();
		
		return timeE - timeS;	// 計測終了時刻
	};

	var maxByOperatorBenchmark = function(value1, value2) {
		var count = COUNT,
			timeS = new Date();	// 計測開始時刻
		while (count--) {
			var hoge = (value1 > value2) ? value1 : value2;
		}
		var timeE = new Date();

		return timeE - timeS;
	};

	var mathMinBenchmark = function(value1, value2) { 
		var count = COUNT,
			timeS = new Date();	// 計測開始時刻
		while (count--) {
			var hoge = Math.min(value1, value2);
		}
		var timeE = new Date();
		
		return timeE - timeS;	// 計測終了時刻
	};

	var minByOperatorBenchmark = function(value1, value2) {
		var count = COUNT,
			timeS = new Date();	// 計測開始時刻
		while (count--) {
			var hoge = (value1 < value2) ? value1 : value2;
		}
		var timeE = new Date();

		return timeE - timeS;
	};

	var containerMax = document.getElementById('container-max');
	var containerMin = document.getElementById('container-min');
	
	containerMax.innerHTML = 
	'<table class="table table-striped"><tbody>'
		+ "<tr><th><tt>Math.max(42.195, 21.0975)</tt></th><td><tt>* 10,000,000</tt></th><td class='value'>" + mathMaxBenchmark(42.195, 21.0975) + ' ms</td></tr>'
		+ "<tr><th><tt>(42.195 > 21.0975) ? 42.195 : 21.0975</tt></th><td><tt>* 10,000,000</tt></th><td class='value'>" + maxByOperatorBenchmark(42.195, 21.0975) + ' ms</td></tr>'
	+ '</tbody></table>';

	containerMin.innerHTML = 
	'<table class="table table-striped"><tbody>'
		+ "<tr><th><tt>Math.min(42.195, 21.0975)</tt></th><td><tt>* 10,000,000</tt></th><td class='value'>" + mathMinBenchmark(42.195, 21.0975) + ' ms</td></tr>'
		+ "<tr><th><tt>(42.195 < 21.0975) ? 42.195 : 21.0975</tt></th><td><tt>* 10,000,000</tt></th><td class='value'>" + minByOperatorBenchmark(42.195, 21.0975) + ' ms</td></tr>'
	+ '</tbody></table>';
})();