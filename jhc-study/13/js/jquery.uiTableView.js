;(function($) {

	$.fn.uiTableView = function(options) {
		var elements = $(this);
		var opts = $.extend({}, $.fn.uiTableView.defaults, options);

		elements.each(function() {
			initUITableView(this, opts);
		});

		return this;
	}

	$.fn.uiTableView.defaults = {
		height: 300
	};

	// 初期化
	function initUITableView(element, options) {
		var $tableviewWrapper,
			$dummyHeader,
			$tableview,
			groups = [];

		$tableview = $(element);
		$tableview.wrap('<div class="tableview-wrapper" />');
		$tableviewWrapper = $tableview.parent().height(options.height);
		$tableviewWrapper.prepend('<h2 class="dummy-header" />');
		$dummyHeader = $tableviewWrapper.find('.dummy-header');

		$tableview.find('dl').each(function(index, element) {
			var $tempGroup = $(element),
				$tempHeader = $tempGroup.find('dt'),
				$tempGroupHeight = $tempGroup.height(),
				$tempGroupOffset = $tempGroup.position().top;
			groups.push({
				'group': $tempGroup,								// インデックスごとのグループ
				'header': $tempHeader,								// グループ内ヘッダー(インデックス部分)
				'groupHeight': $tempGroupHeight,						// グループの高さ
				'headerText': $tempHeader.text(),					// インデックス
				'headerHeight': $tempHeader.outerHeight(),			// グループ内ヘッダーの高さ
				'groupOffset': $tempGroupOffset,					// tableview-wrapperトップからグループトップまでの距離
				'groupEndY': $tempGroupHeight + $tempGroupOffset	// tableview-wrapperトップからグループボトムまでの距離
			});
		});

		$dummyHeader.text(groups[0].headerText);

		$tableview.scroll(function() {
			setDummyHeader();
		});

		var setDummyHeader = function() {
			var currentTop = $tableview.scrollTop(),
				topElement,			// 表示領域内で一番上に来ているグループ
				topElementBottom,	// topElementのbottomのY座標値
				offscreenElement,	// 表示領域外にフレームアウトしたグループ
				i = 0;
			while ((groups[i].groupOffset - currentTop) <= 0) {
				topElement = groups[i];
				topElementBottom = topElement.groupEndY - currentTop;
				if (topElementBottom < -topElement.headerHeight) {
					offscreenElement = topElement;
				}
				i++;
				// console.log('topElement.groupEndY', topElement.groupEndY, 'currentTop', currentTop);
				if (i >= groups.length) {
					break;
				}
			}

			if (topElementBottom < 0 && topElementBottom > -topElement.headerHeight) {
				$dummyHeader.addClass('hidden');
				$(topElement.group).addClass('animated');
			} else {
				$dummyHeader.removeClass('hidden');
				if (topElement) {
					$(topElement.group).removeClass('animated');
				}
			}

			if (topElement) {
				$dummyHeader.text(topElement.headerText);
			}
		};
	}

})(jQuery);