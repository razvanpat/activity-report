/* global module, require */

(function () {
	'use strict';

var _ = require('lodash');

module.exports = function ReportListCtrl(
		$scope, $location, ReportsService, Utils, WindowService) {

	$scope.reports = ReportsService.getReports();
	//TODO: Hour calculations should be someone else's responsibilty
/*
	function calculateHours() {
		$scope.averageHours = _.reduce($scope.reports, 
				function (total, report) {
					total += report.totalHours / $scope.reports.length;
					return total;
				}, 0);
		$scope.averageHypercare = _.reduce($scope.reports, 
				function (total, report) {
					total += report.specialHours.Hypercare / $scope.reports.length;
					return total;
				}, 0);
	}

	calculateHours();
*/

	$scope.updateDeleteBtnState = function () {
		$scope.deleteDisabled = Utils.getActionBtnStateFor($scope.reports);
	};
	$scope.updateDeleteBtnState();

	$scope.deleteReports = function () {
		if (WindowService.confirm('Are you sure?')) {
			ReportsService.deleteSelectedReports();
//			calculateHours();
		} else {
			ReportsService.resetSelectedState();
		}
		$scope.updateDeleteBtnState();
	};

	$scope.createReport = function () {
		$location.url('/create_report');
	};
};

}());
