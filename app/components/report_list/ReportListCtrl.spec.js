/* global module, require */
/* jshint expr: true */

(function () {
	'use strict';

var chai = require('chai');
var expect = chai.expect;
var SpecUtils = require('../utils.spec');
var ReportListCtrl = require('./ReportListCtrl');
var UtilsModule = require('../../services/Utils');
var Utils = new UtilsModule();

var $scope;
var $location;
var ReportsService;	
var WindowService;

function instantiateReportListCtrl(){
		return new ReportListCtrl($scope, $location, ReportsService, Utils,
			WindowService);
}

describe('ReportListCtrl', function() {
	beforeEach(function() {
		$scope = {};
		$location = SpecUtils.createLocationService();
		WindowService = {};
		ReportsService = SpecUtils.createReportsServiceWithEntries();
	});

	it('loads the reports from the ReportsService', function() {
		var expectedReportsList = [{test: 'obj'}];
		ReportsService.returnedReportList = expectedReportsList;

		instantiateReportListCtrl();

		expect($scope.reports).to.eql(expectedReportsList);
	});

	it('manages the $scope.deleteDisabled state', function() {
		var expectedReportsList = [{selected: true}];
		ReportsService.returnedReportList = expectedReportsList;

		instantiateReportListCtrl();
		
		expect($scope.deleteDisabled).to.be.false;

		$scope.reports[0].selected = false;
		$scope.updateDeleteBtnState();
		expect($scope.deleteDisabled).to.be.true;

		$scope.reports[0].selected = true;
		$scope.updateDeleteBtnState();
		expect($scope.deleteDisabled).to.be.false;
	});

	describe('$scope.deleteReports', function() {
		it('deletes if user confirms', function() {
			var reportsDeleted = false;
			ReportsService.deleteSelectedReports = function() {
				reportsDeleted = true;
			};
			WindowService.confirm = function() {
				return true;
			};
			instantiateReportListCtrl();

			$scope.deleteReports();

			expect(reportsDeleted).to.be.true;
		});

		it('resets selection state if user cancels', function() {
			var stateReset = false;	
			ReportsService.resetSelectedState = function() {
				stateReset = true;
			};
			WindowService.confirm = function() {
				return false;
			};
			instantiateReportListCtrl();

			$scope.deleteReports();

			expect(stateReset).to.be.true;
		});
	});

	describe('$scope.createReport', function() {
		it('navigates to create report page', function() {
			instantiateReportListCtrl();
			
			$scope.createReport();

			expect($location.navigatedToPath).equal('/create_report');
		});
	});
});
}());
