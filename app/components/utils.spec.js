/* global describe, it, beforeEach */
/* jshint expr: true */

(function () {
	'use strict';
}());

var chai = require('chai');
var expect = chai.expect;

var utils = {
	mockReportService: function () {
		return {
			lastReportNumber: 22,
			lastInvoiceNumber: 55,

			getLastReportNumber: function () {
				return this.lastReportNumber;
			},
			getLastInvoiceNumber: function () {
				return this.lastInvoiceNumber;
			}
		};
	},

	mockSettingsService: function () {
		return {
			getSettings: function () {
				return {
					defaultProvider: "test provider",
					reportNumberFormat: "TWD####",
					invoiceNumberFormat: "TWK####",
					averageTargetHours: 168,
					specialProjects: [
						"ProjectX"
					],
					customers: [
						"MegaCorp Inc."
					]
				};
			}
		};
	}
};

module.exports = utils;

/**
 * Some syntactic sugar for tests
 * @returns {*}
 */
Array.prototype.first = function () {
	return this[0];
};


/**
 * Util metods should have tests too
 */
describe('utils.spec', function () {
	describe('mockReportService', function () {
		var reportService;

		beforeEach(function () {
			reportService = utils.mockReportService();
		});

		it('returns an object', function () {
			expect(reportService).to.exist;
		});

		describe('getLastReportNumber', function () {
			it('returns lastReportNumber', function () {
				var result = reportService.getLastReportNumber();

				expect(result).to.eql(reportService.lastReportNumber);
			});
		});

		describe('getLastInvoiceNumber', function () {
			it('returns lastInvoiceNumber', function () {
				var result = reportService.getLastInvoiceNumber();

				expect(result).to.exist;
				expect(result).to.eql(reportService.lastInvoiceNumber);
			});
		});
	});

	describe('mockSettingsService', function () {
		describe('getSettings', function () {
			var settingsService;

			beforeEach(function () {
				settingsService = utils.mockSettingsService();
			});

			it('is a function', function () {
				var getSettings = settingsService.getSettings;

				expect(getSettings).to.be.an.instanceof(Function);
			});

			it('returns settings test fixture', function () {
				var settings = settingsService.getSettings();

				expect(settings).to.exist;
			});

		});

	});
});