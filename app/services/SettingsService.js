var _ = require('lodash');
var fixtures = require('../../assets/fixtures.json');

module.exports = function SettingsService() {
	var settings = fixtures.settings;

	return {
		getSettings: function () {
			return settings;
		}
	};
};