$(function() {
	var area2PosTop = $('#area2').offset().top;
	var area3PosTop = $('#area3').offset().top;
	var ashPosTop = $('#ashColorArea').offset().top;

	$(window).scroll(function() {
		var value = $(this).scrollTop();	//スクロール値を取得
		$('#scrollValue').text(value);

		$('#area1').css('background-position-y', value);

		if (value > area2PosTop) {
			$('#area2').css('background-position-y', value - area2PosTop);
			console.log('area2 variable');
		} else {
		 	$('#area2').css('background-position-y', 'top');
		 	console.log('area2 top');
		 }

		if (value > area3PosTop) {
			$('#area3').css('background-position-y', (value - area3PosTop)*2);
			console.log('area3 variable');
		} else {
			$('#area3').css('background-position-y', 'top');
			console.log('area3 top');
		}

		if (value > ashPosTop) {
			var area4Top = value - ashPosTop - 800;
			$('#area4').css('background-position-y', area4Top);
		} else {
			$('#area4').css('background-position-y', -200);
		}

	});
});