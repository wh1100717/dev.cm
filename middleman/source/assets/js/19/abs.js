(function() {

	var COUNT = 10000000;
	
	var mathAbsBenchmark = function(value1, value2) { 
		var count = COUNT,
			timeS = new Date();	// 計測開始時刻
		while (count--) {
			var hoge = Math.abs(value1 - value2);
		}
		var timeE = new Date();
		
		return timeE - timeS;	// 計測終了時刻
	};

	var absByOperatorBenchmark = function(value1, value2) {
		var count = COUNT,
			timeS = new Date();	// 計測開始時刻
		while (count--) {
			var temp = value1 - value2;
			var hoge = (temp < 0) ? -temp : temp;
		}
		var timeE = new Date();

		return timeE - timeS;
	};

	var container = document.getElementById('container');
	
	container.innerHTML = 
	'<table class="table table-striped"><tbody>'
		+ "<tr><th><code>Math.abs(42.195  21.0975)</code></th><td><tt>* 10,000,000</tt></th><td class='value'>" + mathAbsBenchmark(42.195, 21.0975) + ' ms</td></tr>'
		+ "<tr><th><code>var temp = 42.195 - 21.0975;<br />(temp < 0) ? -temp : temp;</code></th><td><tt>* 10,000,000</tt></th><td class='value'>" + absByOperatorBenchmark(42.195, 21.0975) + ' ms</td></tr>'
	+ '</tbody></table>';

})();