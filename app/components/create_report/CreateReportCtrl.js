/* global module, $ */

(function () {
	'use strict';
}());

module.exports = function CreateReportCtrl (
		$scope, $location, SettingsService, ReportsService) {

	var settings = SettingsService.getSettings();

	var today = new Date();
	var lastMonth = new Date(
			today.getFullYear(), 
			today.getMonth() - 1, today.getDate()
			);

	$scope.number = ReportsService.getLastReportNumber() + 1;
	$scope.invoiceNumber = ReportsService.getLastInvoiceNumber() + 1;
	$scope.selectedProvider = settings.defaultProvider;
	$scope.customers = settings.customers;
	$scope.selectedCustomer = settings.customers[0];
	$scope.reportPeriod = lastMonth;
	$scope.reportDate = today;

	$scope.submit = function () {
		ReportsService.addReport({
			"periodMonth": $scope.reportPeriod.getMonth(),
			"periodYear": $scope.reportPeriod.getFullYear(),
			"client": $scope.selectedCustomer,
			"createdAt": $scope.reportDate,
			"number": $scope.number,
			"invoiceNumber": $scope.invoiceNumber,
			"reportNumberFormat": settings.reportNumberFormat,
			"invoiceNumberFormat": settings.invoiceNumberFormat,
			"provider": $scope.selectedProvider,
			"entries": []
		});

		$location.url('/report_list');
	};
};
