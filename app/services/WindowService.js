/* global module, require */

(function () {
	'use strict';
	
	module.exports = function WindowService() {
		return {
			confirm: function(msg) {
				return window.confirm(msg);
			}
		};
	};
}());
