(function() {
	
	var width = 36,
		height = 36,
		boxCount = 16,
		step = Math.sqrt(boxCount);
	
	var Tile = function() {
		
		this.getEmpty = function() {
			var divs = this.getElementsByTagName('div');
			for (var i = 0; i < divs.length; i++) {
				if (divs[i].className == 'tile-empty') return divs[i];
			}
		};
		
		this.getBoxAt = function(index) {
			return this.getElementsByTagName('div')[index];
		};
		
		this.onclick = function(e) {
			e = e || window.event;
			var box = e.srcElement || e.target;
			if (box != this && !box.isEmpty) {
				var empty = this.getEmpty();
				if (box.col() == empty.col()) {
					var before = box.next();
					if (box.top() > empty.top()) {
						while (box != empty && box.index() - step >= 0) {
							var tmp = box.parent().getBoxAt(box.index() - step);
							box.before(tmp.next());
							box = tmp;
						}
					} else {						
						while (box != empty && box.index() + step < boxCount) {
							var tmp = box.parent().getBoxAt(box.index() + step);
							box.before(tmp);
							box = tmp;
						}
					}
					empty.before(before)
				} else if (box.row() == empty.row()) {
					box.left() > empty.left() ? empty.after(box) : empty.before(box);
				}
			}
		};
		
	};
	
	var Box = function() {
		
		this.isEmpty = this.className == 'tile-empty';
		
		this.top = function() {
			return this.offsetTop;
		};
		
		this.left = function() {
			return this.offsetLeft;
		};
		
		this.width = function() {
			return this.offsetWidth;
		};
		
		this.height = function() {
			return this.offsetHeight;
		};
		
		this.col = function() {
			return this.left() / width + 1;
		};
		
		this.row = function() {
			return this.top() / height + 1;
		};
		
		this.index = function() {
			var divs = this.parentNode.getElementsByTagName('div');
			for (var i = 0; i < divs.length; i++) {
				if (this == divs[i]) return i;
			}
		};
		
		this.after = function(box) {
			this.parentNode.insertBefore(this, box.nextSibling || null);
		};
		
		this.before = function(box) {
			this.parentNode.insertBefore(this, box);
		};
		
		this.parent = function() {
			return this.parentNode;
		};
		
		this.next = function() {
			return this.nextSibling;		
		};
		
		this.prev = function() {
			return this.previousSibling;		
		};
		
	};
	
	var extend = function(child, parent) {
		for (var i in parent) {
			child[i] = parent[i];
		}
	};
	
	var init = function() {
		
		var df = document.createDocumentFragment();
		var div = document.createElement('div');
		
		for (var i = 1; i <= boxCount; i++, div = div.cloneNode(true)) {
			if (i == boxCount) {
				div.innerHTML = '';
				div.className = 'tile-empty';
			} else {
				div.className = 'bg' + (i - 1);
			}
			extend(div, new Box());
			df.appendChild(div);
		}		
		
		var el = document.getElementById('tile');
		el.appendChild(df);
		extend(el, new Tile());
		
	}
	
	window.onload = function() {
		init();
	};
	
})();