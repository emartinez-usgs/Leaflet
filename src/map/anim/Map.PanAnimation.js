/*
 * Extends L.Map to handle panning animations.
 */

L.Map.include({

	setView: function (center, zoom, options) {

		zoom = this._limitZoom(zoom);
		center = L.latLng(center);
		options = options || {};

		if (this._panAnim) {
			this._panAnim.stop();
		}

		if (this._loaded && !options.reset && options !== true) {

			if (this._panAnim) {
				this._panAnim.stop();
			}

			var done = (zoomChanged ?
			        this._zoomToIfClose && this._zoomToIfClose(center, zoom) :
			        this._panByIfClose(center));

			if (animated) {
				// prevent resize handler call, the view will refresh after animation anyway
				clearTimeout(this._sizeTimer);
				return this;
			}
		}

		// animation didn't start, just reset the map view
		this._resetView(center, zoom);

		return this;
	},

	panBy: function (offset, duration, easeLinearity) {
		offset = L.point(offset);

		if (!offset.x && !offset.y) {
			return this;
		}

		if (!this._panAnim) {
			this._panAnim = new L.PosAnimation();

			this._panAnim.on({
				'step': this._onPanTransitionStep,
				'end': this._onPanTransitionEnd
			}, this);
		}

		// don't fire movestart if animating inertia
		if (!options.noMoveStart) {
			this.fire('movestart');
		}

		// animate pan unless animate: false specified
		if (options.animate !== false) {
			L.DomUtil.addClass(this._mapPane, 'leaflet-pan-anim');

		var newPos = L.DomUtil.getPosition(this._mapPane).subtract(offset)._round();
		this._panAnim.run(this._mapPane, newPos, duration || 0.25, easeLinearity);

		return this;
	},

	_onPanTransitionStep: function () {
		this.fire('move');
	},

	_onPanTransitionEnd: function () {
		L.DomUtil.removeClass(this._mapPane, 'leaflet-pan-anim');
		this.fire('moveend');
	},

	_tryAnimatedPan: function (center, options) {
		// difference between the new and current centers in pixels
		var offset = this._getCenterOffset(center)._floor();

		// don't animate too far unless animate: true specified in options
		if ((options && options.animate) !== true && !this.getSize().contains(offset)) { return false; }

	_offsetIsWithinView: function (offset, multiplyFactor) {
		var m = multiplyFactor || 1,
		    size = this.getSize();

		return (Math.abs(offset.x) <= size.x * m) &&
		       (Math.abs(offset.y) <= size.y * m);
	}
});
