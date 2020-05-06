// D'après le script dom-drag.js
// www.youngpup.net
var lequel="";
var Drag = {
obj : null,

init : function(o) {
		o.onmousedown = Drag.start;
		o.onDragEnd = new Function();
	},

	start : function(e) {
		e = Drag.fixE(e);
		var o = Drag.obj = this;
		lequel = o.id;
		o.lastMouseX = e.clientX;
		o.lastMouseY = e.clientY;
		document.onmousemove = Drag.drag;
		document.onmouseup = Drag.end;
		return false;
	},

	drag : function(e) {
		e = Drag.fixE(e);
		var o = Drag.obj;
		var newX = parseInt(o.style.left) + e.clientX - o.lastMouseX;
		var newY = parseInt(o.style.top) + e.clientY - o.lastMouseY;
		Drag.obj.style.left = newX + "px";
		Drag.obj.style.top = newY + "px";
		Drag.obj.lastMouseX = e.clientX;
		Drag.obj.lastMouseY = e.clientY;
		return false;
	},

	end : function(e) {
		verification(lequel);
		e = Drag.fixE(e);
		document.onmousemove = null;
		document.onmouseup = null;
		Drag.obj.onDragEnd(e.clientX, e.clientY);
		Drag.obj = null;
	},

	fixE : function(e) {
		if (typeof e == 'undefined') e = window.event;
		return e;
	}
};