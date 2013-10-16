;(function($) {
	$.fn.pinterestGrid = function(options) {
		elements = $(this);
		winObject = $(window);
		opts = $.extend({}, $.fn.pinterestGrid.defaults, options);

		setCol();
		applyPinterestGrid();

		winObject.unbind('resize').resize(function() {
			var containerWidth;
			var winWidth = winObject.width() - opts.offsetX * 2;
			if(winWidth < colwidth * numOfCol) {
				setCol();
				containerWidth =  colwidth * (numOfCol - 1);
			} else if (winWidth > colwidth * (numOfCol + 1)) {
				setCol();
				containerWidth =  colwidth * (numOfCol + 1);
			}
			if (containerWidth) {
				var current = elements.width();
				elements.width(colwidth * numOfCol);
				applyPinterestGrid();
			}
		});

		return this;
	}

	// デフォルトオプション
	$.fn.pinterestGrid.defaults = {
		offsetX: 5,
		offsetY: 5,
		gridElement: 'div'
	};

	var elements,
		winObject,
		numOfCol,
		opts = {},
		colwidth,
		gridArray = [];

	//IE用にArray.indexOfメソッドを追加
	if (!Array.prototype.indexOf) {
		Array.prototype.indexOf = function(elt /*, from*/) {
			var len = this.length >>> 0;

			var from = Number(arguments[1]) || 0;
			from = (from < 0) ? Math.ceil(from) : Math.floor(from);
			if (from < 0) {
				from += len;
			}

			for (; from < len; from++) {
				if (from in this && this[from] === elt) {
					return from;
				}
			}
			return -1;
		};
	}

	// 初期化
	function applyPinterestGrid() {
		createEmptyGridArray();

		elements.children(opts.gridElement).each(function(index) {
			setPosition($(this));
		});

		//最後にエレメントの高さを設定
		var heightarr = getHeightArray(0, gridArray.length);
		elements.height(heightarr.max + opts.offsetY);
	}

	// カラムの数とwidthを設定する
	function setCol() {
		colwidth = $(opts.gridElement).outerWidth() + opts.offsetX * 2;
		numOfCol = Math.floor((winObject.width() - opts.offsetX * 2) / colwidth);
	}

	//空のgridArrayを作成
	function createEmptyGridArray() {
		//最初にgridArrayを初期化
		gridArray = [];
		for(var i=0; i<numOfCol; i++) {
			pushGridArray(i, 0, 1, -opts.offsetY);
		}
	}

	//gridArrayに新しいgridを追加
	function pushGridArray(x, y, size, height) {
		//define grid object based on grid width
		for(var i=0; i<size; i++) {
			var grid = [];
			grid.x = x + i;
			grid.size = size;
			grid.endY = y + height + opts.offsetY*2;

			gridArray.push(grid);
		}
	}

	//gridArrayからgridを削除
	function removeGridArray(x, size) {
		for(var i=0; i<size; i++) {
			//remove grid beside
			var index = getGridIndex(x+i);
			gridArray.splice(index, 1);
		}
	}

	// gridのx値を基準にgridのインデックスを検索
	function getGridIndex(x) {
		for(var i=0; i<gridArray.length; i++) {
			var obj = gridArray[i];
			if(obj.x == x) {
				return i;
			}
		}
	}

	//gridのx値とサイズに基づいてgridArrayにある高さの最小値と最大値、最小値のあるx値を取得
	//retrun min and max height
	function getHeightArray(x, size) {
		var heightArray = [];
		var temps = [];
		for(var i=0; i<size; i++) {
			var idx = getGridIndex(x+i);
			temps.push(gridArray[idx].endY);
		}
		heightArray.min = Math.min.apply(Math, temps);
		heightArray.max = Math.max.apply(Math, temps);
		heightArray.x = temps.indexOf(heightArray.min);

		return heightArray;
	}

	//gridが配置されるx座標値、y座標値を取得
	function getGridPosition() {
		var pos = [];
		var tempHeight = getHeightArray(0, gridArray.length);
		pos.x = tempHeight.x;
		pos.y = tempHeight.min;
		return pos;
	}

	//gridを配置
	function setPosition(grid) {
		//check grid size
		if(!grid.data('size') || grid.data('size') < 0) {
			grid.data('size', 1);
		}

		//define grid data
		var pos = getGridPosition();
		var gridWidth = colwidth * grid.data('size') - (grid.outerWidth() - grid.width());

		//update style first before get grid height
		grid.css({
			'left': pos.x * colwidth,
			'top': pos.y,
			'position': 'absolute'
		});

		var gridHeight = grid.outerHeight();

		//gridArrayを新しいgridで更新
		removeGridArray(pos.x, grid.data('size'));
		pushGridArray(pos.x, pos.y, grid.data('size'), gridHeight);
	}

})(jQuery);