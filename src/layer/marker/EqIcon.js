L.EqIcon = L.Class.extend({
	options: {
		/*
		iconStyles: (Array)
		iconClasses: (Array)
		*/
		className: 'eq-icon'
	},

	initialize: function (options) {
		L.Util.setOptions(this, options);
	},

	createIcon: function () {
		var el = document.createElement('span');

		this._setIconClasses(el);
		this._setIconStyles(el);
		if ('iconId' in this.options) {
			el.setAttribute('id', this.options.iconId);
		}

		return el;
	},

	createShadow: function () {
		return null; // No shadow, but keep so we implement the API properly
	},

	_setIconStyles: function (el) {
		var styles = this.options.iconStyles;
		el.style.cssText = this.options.iconStyles.join(';');
	},

	_setIconClasses: function (el) {
		var classes = this.options.iconClasses;
		el.className = this.options.className + ' ' + this.options.iconClasses.join(' ');
	}
});

L.eqicon = function (options) {
	return new L.EqIcon(options);
};
