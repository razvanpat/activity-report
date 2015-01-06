/* global module, require */
/* jshint expr: true */

(function () {
	'use strict';
}());

var chai = require('chai');
var expect = chai.expect;
var spies = require('chai-spies');
chai.use(spies);

var SpecUtils = require('../utils.spec');
var ReportCtrl = require('./ReportCtrl');
var UtilsModule = require('../../services/Utils');
var Utils = UtilsModule();

var $scope;
var $location;
var $routeParams;
var $document;

var documentTarget;
var modalParam;

describe('ReportCtrl', function() {

	beforeEach(function() {
		$scope = {};
		$location = {};
		$document = function(query) {
			documentTarget = query;
			return {
				modal: function(param) {
					modalParam = param;
				}
			};
		};
		$routeParams = {
			reportId: 15
		};
	});


	it('Loads the report specified by reportId param', function() {
		var ReportsService = {
			getReport: function(id) {
				return {
					id: id
				};
			}
		};	

		instantiateReportCtrlWith($scope, ReportsService);

		expect($scope.report.id).to.eql(15);
	});

	describe('default date for first entry', function() {
		it('is the first date of the period', function() {
			var ReportsService = {
				getReport: function() {
					return {
						"periodMonth": 0,
						"periodYear": 2015,
						"entries": []	
					};
				}
			};
				
			instantiateReportCtrlWith($scope, ReportsService);

			var defaultDate = $scope.date;
			expect(defaultDate.getDate()).to.eql(1);
			expect(defaultDate.getMonth()).to.eql(0);
			expect(defaultDate.getFullYear()).to.eql(2015);
		});

		it('skips over weekend days', function() {
			var ReportsService = {
				getReport: function() {
					return {
						"periodMonth": 2,
						"periodYear": 2015,
						"entries": []	
					};
				}
			};
				
			instantiateReportCtrlWith($scope, ReportsService);

			var defaultDate = $scope.date;
			expect(defaultDate.getDate()).to.eql(2);
			expect(defaultDate.getMonth()).to.eql(2);
			expect(defaultDate.getFullYear()).to.eql(2015);
		});
	});

	describe('default date for non first entry', function() {
		it('is the first date after latest entry', function() {
			var ReportsService = {
				getReport: function() {
					return {
						"periodMonth": 2,
						"periodYear": 2015,
						"entries": [
							{
								"dateDay": 12,
								"dateMonth": 2,
								"dateYear": 2015
							},{
								"dateDay": 18,
								"dateMonth": 2,
								"dateYear": 2015
							},{
								"dateDay": 11,
								"dateMonth": 2,
								"dateYear": 2015
							},
						]	
					};
				}
			};
				
			instantiateReportCtrlWith($scope, ReportsService);

			var defaultDate = $scope.date;
			expect(defaultDate.getDate()).to.eql(19);
			expect(defaultDate.getMonth()).to.eql(2);
			expect(defaultDate.getFullYear()).to.eql(2015);
		});
		
		it('skips over weekend days', function() {
			var ReportsService = {
				getReport: function() {
					return {
						"periodMonth": 2,
						"periodYear": 2015,
						"entries": [
							{
								"dateDay": 12,
								"dateMonth": 2,
								"dateYear": 2015
							},{
								"dateDay": 20,
								"dateMonth": 2,
								"dateYear": 2015
							},{
								"dateDay": 11,
								"dateMonth": 2,
								"dateYear": 2015
							},
						]	
					};
				}
			};
				
			instantiateReportCtrlWith($scope, ReportsService);

			var defaultDate = $scope.date;
			expect(defaultDate.getDate()).to.eql(23);
			expect(defaultDate.getMonth()).to.eql(2);
			expect(defaultDate.getFullYear()).to.eql(2015);
		});
	});

	describe('$scope.addEntry', function() {
		it('uses ReportsService to create entry', function() {
			var ReportsService = {
				addEntry: function(reportId, entryObj) {
					this.reportId = reportId;
					this.entryObj = entryObj;
				},
				getReport: function() {
					return {};
				}
			};
			instantiateReportCtrlWith($scope, ReportsService);

			$scope.date = new Date(2015, 2, 13);
			$scope.project = "asdfg";
			$scope.description = "gfdsa";
			$scope.time = 3;

			$scope.addEntry();

			expect(ReportsService.reportId).to.be.equal($routeParams.reportId);
			expect(ReportsService.entryObj).to.be.eql({
				dateDay: 13,
				dateMonth: 2,
				dateYear: 2015,
				project: 'asdfg',
				description: 'gfdsa',
				time: 3
			});
		});

		it('hides the #addEntry dialog', function() {
			var ReportsService = {
				addEntry: function(reportId, entryObj) {
				},
				getReport: function() {
					return {};
				}
			};
			instantiateReportCtrlWith($scope, ReportsService);

			$scope.addEntry();

			expect(documentTarget).to.equal('#addEntry');
			expect(modalParam).to.equal('hide');
		});
	});

	describe('$scope.deleteDisabled', function() {
		it('is true when no entry is selected', function() {
			var ReportsService = {
				getReport: function() {
					return {
						"periodMonth": 2,
						"periodYear": 2015,
						"entries": [
							{
								"dateDay": 12,
								"dateMonth": 2,
								"dateYear": 2015
							},{
								"dateDay": 18,
								"dateMonth": 2,
								"dateYear": 2015
							},{
								"dateDay": 11,
								"dateMonth": 2,
								"dateYear": 2015
							},
						]	
					};
				}
			};
				
			instantiateReportCtrlWith($scope, ReportsService);

			expect($scope.deleteDisabled).to.be.true;
		});

		it('is false when at least one entry is selected', function() {
			var ReportsService = {
				getReport: function() {
					return {
						"periodMonth": 2,
						"periodYear": 2015,
						"entries": [
							{
								"dateDay": 12,
								"dateMonth": 2,
								"dateYear": 2015
							},{
								"dateDay": 18,
								"dateMonth": 2,
								"dateYear": 2015,
								"selected": true
							},{
								"dateDay": 11,
								"dateMonth": 2,
								"dateYear": 2015
							},
						]	
					};
				}
			};
				
			instantiateReportCtrlWith($scope, ReportsService);

			expect($scope.deleteDisabled).to.be.false;
		});

		it('is updated when calling $scope.updateDeleteBtnState', function() {
			var ReportsService = {
				getReport: function() {
					return {
						"periodMonth": 2,
						"periodYear": 2015,
						"entries": [
							{
								"dateDay": 12,
								"dateMonth": 2,
								"dateYear": 2015
							},{
								"dateDay": 18,
								"dateMonth": 2,
								"dateYear": 2015,
								"selected": true
							},{
								"dateDay": 11,
								"dateMonth": 2,
								"dateYear": 2015
							},
						]	
					};
				}
			};
				
			instantiateReportCtrlWith($scope, ReportsService);
			$scope.report.entries[1].selected = false;
			$scope.updateDeleteBtnState();

			expect($scope.deleteDisabled).to.be.true;

			$scope.report.entries[1].selected = true;
			$scope.updateDeleteBtnState();

			expect($scope.deleteDisabled).to.be.false;
		});
	});

	describe('$scope.deleteEntries', function() {
		it('deletes selected entries if user confirms', function() {
			var entriesDeleted;
			var ReportsService = {
				getReport: function() {
					return {
						"periodMonth": 2,
						"periodYear": 2015,
						"entries": [
							{
								"dateDay": 12,
								"dateMonth": 2,
								"dateYear": 2015,
								"selected": true
							},{
								"dateDay": 18,
								"dateMonth": 2,
								"dateYear": 2015,
								"selected": true
							},{
								"dateDay": 11,
								"dateMonth": 2,
								"dateYear": 2015
							},
						]	
					};
				},
				deleteSelectedEntries: function (report) {
					entriesDeleted = report;
				}
			};
			confirm = function() {
				return true;
			};
				
			instantiateReportCtrlWith($scope, ReportsService);
			$scope.deleteEntries();
			
			expect(entriesDeleted).to.eql($scope.report);
		});

		it('resets selection if user cancels', function() {
			var selectionReset;
			var ReportsService = {
				getReport: function() {
					return {
						"periodMonth": 2,
						"periodYear": 2015,
						"entries": [
							{
								"dateDay": 12,
								"dateMonth": 2,
								"dateYear": 2015,
								"selected": true
							},{
								"dateDay": 18,
								"dateMonth": 2,
								"dateYear": 2015,
								"selected": true
							},{
								"dateDay": 11,
								"dateMonth": 2,
								"dateYear": 2015
							},
						]	
					};
				},
				resetReportSelectedState: function (report) {
					selectionReset = report;
				}
			};
			confirm = function() {
				return false;
			};
				
			instantiateReportCtrlWith($scope, ReportsService);
			$scope.deleteEntries();
			
			expect(selectionReset).to.eql($scope.report);
		});

		it('updates delete button state afterwards', function() {
			var selectionReset;
			var deleteStateUpdated = false;
			var ReportsService = {
				getReport: function() {
					return {
						"periodMonth": 2,
						"periodYear": 2015,
						"entries": [
							{
								"dateDay": 12,
								"dateMonth": 2,
								"dateYear": 2015,
								"selected": true
							},{
								"dateDay": 18,
								"dateMonth": 2,
								"dateYear": 2015,
								"selected": true
							},{
								"dateDay": 11,
								"dateMonth": 2,
								"dateYear": 2015
							},
						]	
					};
				},
				resetReportSelectedState: function (report) {
					selectionReset = report;
				}
			};
			confirm = function() {
				return false;
			};
				
			instantiateReportCtrlWith($scope, ReportsService);
			$scope.updateDeleteBtnState = function() {
				deleteStateUpdated = true;
			};
			$scope.deleteEntries();

			expect(deleteStateUpdated).to.be.true;
		});
	});
});

function instantiateReportCtrlWith(_scope, _ReportsService) {
	return new ReportCtrl(
			_scope, $routeParams, $location, $document, _ReportsService, Utils);
}
