/* global describe, it, beforeEach */
/* jshint expr: true */

(function () {
	'use strict';
}());

var chai = require('chai');
var expect = chai.expect;

var utils = {
	createLocationService: function() {
		return {
			url: function(path) {
				this.navigatedToPath = path;
			}
		};
	},
	createReportsServiceWithEntries: function() {
		return {
			returnedReportId: 123,
			returnedEntries: [
				{
					dateDay: 12,
					dateMonth: 2,
					dateYear: 2015
				},{
					dateDay: 18,
					dateMonth: 2,
					dateYear: 2015
				},{
					dateDay: 11,
					dateMonth: 2,
					dateYear: 2015
				}
			],
			returnedPeriodMonth: 2,
			returnedPeriodYear: 2015,	
			returnedLastReportNumber: 1,
			returnedLastInvoiceNumber: 1,
			returnedReportList: [],
			getReports: function() {
				return this.returnedReportList;
			},
			getReport: function() {
				return {
					id: this.returnedReportId,
					periodMonth: this.returnedPeriodMonth,
					periodYear: this.returnedPeriodYear,
					entries: this.returnedEntries
				};
			},
			addEntry: function(reportId, entryObj) {
				this.addEntryReportId = reportId;
				this.addEntryEntryObj = entryObj;
			},
			addReport: function(report) {
				this.addedReport = report;
			},
			deleteSelectedEntries: function (report) {
				this.entriesDeleted = report;
			},
			resetReportSelectedState: function (report) {
				this.selectionReset = report;
			},
			getLastReportNumber: function() {
				return this.returnedLastReportNumber;
			},
			getLastInvoiceNumber: function() {
				return this.returnedLastInvoiceNumber;
			}
		};
	},

	createSettingsService: function () {
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
	describe('createSettingsService', function () {
		describe('getSettings', function () {
			var settingsService;

			beforeEach(function () {
				settingsService = utils.createSettingsService();
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
