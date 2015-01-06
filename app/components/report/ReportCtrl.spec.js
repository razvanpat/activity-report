/* global module, require */

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

describe('ReportCtrl', function() {
	var $scope;
	var $location;
	var $routeParams;

	beforeEach(function() {
		$scope = {};
		$location = {};
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

		new ReportCtrl($scope, $routeParams, $location, ReportsService);

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
				
			new ReportCtrl($scope, $routeParams, $location, ReportsService, Utils);

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
				
			new ReportCtrl($scope, $routeParams, $location, ReportsService, Utils);

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
				
			new ReportCtrl($scope, $routeParams, $location, ReportsService, Utils);

			var defaultDate = $scope.date;
			expect(defaultDate.getDate()).to.eql(19);
			expect(defaultDate.getMonth()).to.eql(2);
			expect(defaultDate.getFullYear()).to.eql(2015);
		});
	});
});

