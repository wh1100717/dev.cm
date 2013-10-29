(function($) {

	// ローカルストレージデータ読み込み
	var loadStorage = function() {
		$('#list').find('tbody').empty();
		var rec = '';
		for (var i=0; i<localStorage.length; i++) {
			var key = localStorage.key(i);	//keyを取得
			var value = localStorage.getItem(key);	//keyからJSON文字列を取得
			if (!value) {
				continue;
			}
			try {
				var data = JSON.parse(value);	//JSONオブジェクトに変換
			} catch (event) {
				continue;
			}

			var date = new Date();
			date.setTime(key);
			var dateStr = date.toDateString() + ' ' + date.toLocaleTimeString();

			rec += '<tr id="' + key + '">'
				 + '<td>' + data.name + '</td>'
				 + '<td>' + data.email + '</td>'
				 + '<td><time datetime="' + dateStr + '">' + dateStr + '</time></td>'
				 + '<td><button class="delete btn btn-sm btn-danger" href="#">delete</button></td>'
				 + '</tr>';
		}
		$('#list').find('tbody').append(rec);
		$('.delete').bind('click', delete_clickHandler);
	};

	// 削除処理
	var delete_clickHandler = function(event) {
		var target = $(event.target).parents('tr').attr('id');
		localStorage.removeItem(target);
		alert('対象者を削除しました。');
		loadStorage();
	};


	// 登録ボタンクリック
	$('#memberRegist').on('submit', function(e) {
		e.preventDefault();
		var time = new Date().getTime(),
			data = {};
		data.name = $('#name').val();
		data.email = $('#email').val();
		var str = JSON.stringify(data);
		//ローカルストレージ
		localStorage.setItem(time, str);
		alert("保存しました。");
		loadStorage();
	});

	// データクリアボタンクリック
	$('#clear').on('click', function() {
		localStorage.clear();
		alert("全てのデータを消去しました。");
		loadStorage();
	});

	// リロードボタンクリック
	$('#reload').on('click', localStorage);


	//登録済みデータ読み込み
	loadStorage();

})(jQuery);