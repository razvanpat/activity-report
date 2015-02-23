var _ = require('lodash');

module.exports = function ReportsService($resource) {
	var ReportsResource = $resource(
			'http://localhost:5000/private/reports/:reportId', 
			{reportId: '@number'}
		);

	var reports = [];

	return {
		getReports: function () {
			reports = ReportsResource.query();
			console.log('Reports: ', reports);
			return reports;
		},

		getReport: function (reportNumber) {
			var result = null;
			_.forEach(reports, function(report) {
				if(report.number == reportNumber) {
					result = report;
				}
			});
			if(result === null) {
				result = ReportsResource.get({reportId: reportNumber});
			}
			return result;
		},

		addReport: function (report) {
			var newReport = new ReportsResource(report);
			newReport.$save();
			console.log('Writing report', newReport);
			reports.push(newReport);
		},

		deleteSelectedReports: function () {
		},

		deleteSelectedEntries: function (report) {
		},

		addEntry: function (reportNumber, entryData) {
		},

		getLastReportNumber: function () {
		},

		getLastInvoiceNumber: function () {
		},

		resetSelectedState: function () {
		},

		resetReportSelectedState: function (report) {
		},
	};
};
