/* global describe, it, beforeEach */
/* jshint expr: true */

(function () {
	'use strict';
}());

var chai = require('chai');
var expect = chai.expect;
var SpecUtils = require('../utils.spec');
var CreateReportCtrl = require('./CreateReportCtrl');

describe('CreateReportCtrl', function () {
	it('initializes fields to default values', function () {
		var $scope = {};
		var $location = {};
		var SettingsService = SpecUtils.mockSettingsService();
		var ReportsService = SpecUtils.mockReportService();
		var lastReportNumber = ReportsService.getLastReportNumber();
		var lastInvoiceNumber = ReportsService.getLastInvoiceNumber();
		var settings = SettingsService.getSettings();
		var today = new Date();
		var lastMonthDate = new Date(
			today.getFullYear(), 
			today.getMonth() - 1, 
			today.getDate());

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
});
