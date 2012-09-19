L.Control.MousePosition = L.Control.extend({
	options: {
		position: 'bottomleft'
	},

	onAdd: function (map) {
		var className = 'leaflet-control-mouseposition',
		    container = this._container = L.DomUtil.create('div', className);

		container.innerHTML = 'Cursor Position';
		map.on('mousemove', this._onMouseMove, this);
		this._map = map;

		return container;
	},

	onRemove: function (map) {
		this._map = null;
		map.off('mousemove', this._onMouseMove, this);
	},

	_onMouseMove: function (mouseEvent) {
		this._container.innerHTML = this._format(mouseEvent.latlng);
	},

	_format: function (latlng) {
		return this.__format(latlng.lat, '&deg;N', '&deg;S', 3) + ', ' +
				this.__format(latlng.lng, '&deg;E', '&deg;W', 3);
	},

	__format: function (val, pos, neg, precision) {
		var scale = Math.pow(10, precision),
		    extra = pos,
		    p_val = parseFloat(Math.round(val * scale) / scale);

		if (p_val < 0.0) {
			p_val *= -1.0;
			extra = neg;
		}

		return p_val.toFixed(precision) + extra;
	}
});

L.control.mouseposition = function (options) {
	return new L.Control.MousePosition(options);
};
