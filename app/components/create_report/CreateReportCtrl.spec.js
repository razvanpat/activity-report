/* global describe, it, beforeEach */
/* jshint expr: true */

(function () {
	'use strict';
}());

var chai = require('chai');
var expect = chai.expect;
var SpecUtils = require('../utils.spec');
var CreateReportCtrl = require('./CreateReportCtrl');

var $scope;
var $location;
var SettingsService;
var settings;

describe('CreateReportCtrl', function () {
	beforeEach(function() {
		$scope = {};
		$location = SpecUtils.createLocationService();
		SettingsService = SpecUtils.createSettingsService();
		settings = SettingsService.getSettings();
	});

	it('initializes fields to default values', function () {
		var ReportsService = SpecUtils.createReportsServiceWithEntries();
		var today = new Date();
		var lastMonthDate = new Date(
			today.getFullYear(), 
			today.getMonth() - 1, 
			today.getDate());
		var lastReportNumber = ReportsService.returnedLastReportNumber = 42;
		var lastInvoiceNumber = ReportsService.returnedLastInvoiceNumber = 33;

		new CreateReportCtrl($scope, $location, SettingsService, ReportsService);

		var expectedDefaultReportNumber = lastReportNumber + 1;
		expect($scope.number).to.eql(expectedDefaultReportNumber);

		var expectedInvoiceNumber = lastInvoiceNumber + 1;
		expect($scope.invoiceNumber).to.eql(expectedInvoiceNumber);

		expect($scope.selectedProvider).to.eql(settings.defaultProvider);

		expect($scope.customers).to.eql(settings.customers);
		expect($scope.selectedCustomer).to.eql(settings.customers.first());

		expect($scope.reportPeriod.getFullYear())
				.to.eql(lastMonthDate.getFullYear());
		expect($scope.reportPeriod.getMonth())
				.to.eql(lastMonthDate.getMonth());
	});

	describe('$scope.submit', function() {
		it('uses ReportsService to create a new report', function() {
			var ReportsService = SpecUtils.createReportsServiceWithEntries();
			new CreateReportCtrl
					($scope, $location, SettingsService, ReportsService);
			$scope.reportPeriod = new Date(2014, 4, 20);
			$scope.selectedCustomer = 'Mandark';
			$scope.reportDate = new Date(2014, 6, 14);
			$scope.number = 15;
			$scope.invoiceNumber = 11;
			$scope.selectedProvider = 'Edd';

			$scope.submit();

			expect(ReportsService.addedReport).to.eql({
				periodMonth: 4,
				periodYear: 2014,
				client: $scope.selectedCustomer,
				createdAt: $scope.reportDate,
				number: $scope.number,
				invoiceNumber: $scope.invoiceNumber,
				reportNumberFormat: settings.reportNumberFormat,
				invoiceNumberFormat: settings.invoiceNumberFormat,
				provider: $scope.selectedProvider,
				entries: []
			});
		});

		it('navigates to report list afterwards', function() {
			var ReportsService = SpecUtils.createReportsServiceWithEntries();
			new CreateReportCtrl
					($scope, $location, SettingsService, ReportsService);
			
			$scope.submit();

			expect($location.navigatedToPath).to.equal('/report_list');
		});
	});
});
