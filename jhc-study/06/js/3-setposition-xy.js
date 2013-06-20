$(function() {
	var top = $('#item1').offset().top;	//y座標の初期値を取得
	var left1 = $('#item1').offset().left;	//item1のx座標の初期値
	var left2 = $('#item2').offset().left;	//item2のx座標の初期値
	var left3 = $('#item3').offset().left;	//item3のx座標の初期値
	var left4 = $('#item4').offset().left;	//item4のx座標の初期値
	var left5 = $('#item5').offset().left;	//item5のx座標の初期値

	$(window).scroll(function() {
		var value = $(this).scrollTop();	//スクロール値を取得
		$('#scrollValue').text(value);

		//取得したスクロール量を矩形のXY座標値に指定
		//スクロール値を除算して移動距離に変化をつける
		$('#item1').css({'top': top + value / 4});
		$('#item2').css({'top': top + value / 5, 'left': left2 + value / 8});
		$('#item3').css({'top': top + value / 6, 'left': left3 + value / 6});
		$('#item4').css({'top': top + value / 8, 'left': left4 + value / 5});
		$('#item5').css({'left': left5 + value / 4});
	});
});