L.Util.extend(L.DomEvent, {

	_touchstart: L.Browser.msTouch ? 'MSPointerDown' : 'touchstart',
	_touchend: L.Browser.msTouch ? 'MSPointerUp' : 'touchend',

	// inspired by Zepto touch code by Thomas Fuchs
	addDoubleTapListener: function (obj, handler, id) {
		var last,
			doubleTap = false,
			delay = 250,
			touch,
			pre = '_leaflet_',
			touchstart = this._touchstart,
			touchend = this._touchend,
			touchCount = 0;

		function onTouchStart(e) {
			touchCount++;
			if (touchCount > 1) {
				return;
			}

			var now = Date.now(),
				delta = now - (last || now);

			touch = e.touches ? e.touches[0] : e;
			doubleTap = (delta > 0 && delta <= delay);
			last = now;
		}

		function onTouchEnd(e) {
			touchCount--;
			if (doubleTap) {
				if (L.Browser.msTouch) {
					//Work around .type being readonly with MSPointer* events
					var newTouch = { };
					for (var i in touch) {
						if (true) { //Make JSHint happy, we want to copy all properties
							newTouch[i] = touch[i];
						}
					}
					delete newTouch.preventDefault;
					touch = newTouch;
				}
				touch.type = 'dblclick';
				handler(touch);
				last = null;
			}
		}
		obj[pre + touchstart + id] = onTouchStart;
		obj[pre + touchend + id] = onTouchEnd;

		// on msTouch we need to listen on the document, otherwise a drag starting on the map and moving off screen
		// will not come through to us, so we will lose track of how many touches are ongoing
		var endElement = L.Browser.msTouch ? document.documentElement : obj;

		obj.addEventListener(touchstart, onTouchStart, false);
		endElement.addEventListener(touchend, onTouchEnd, false);

		if (L.Browser.msTouch) {
			endElement.addEventListener('MSPointerCancel', onTouchEnd, false);
		}

		return this;
	},

	removeDoubleTapListener: function (obj, id) {
		var pre = '_leaflet_';
		obj.removeEventListener(obj, obj[pre + this._touchstart + id], false);
		obj.removeEventListener(obj, obj[pre + this._touchend + id], false);
		return this;
	}
});
