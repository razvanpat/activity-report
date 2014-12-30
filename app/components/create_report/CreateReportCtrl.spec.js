/* global describe, it, beforeEach */
/* jshint expr: true */

(function () {
    'use strict';
}());

var chai = require('chai');
var expect = chai.expect;
var SpecUtils = require('../utils.spec');
var CreateReportCtrl = require('./CreateReportCtrl');


//TODO Get rid of this jQuery mock
$ = function(){
    return {
        datepicker: function() {
            return this;
        }
    };
};

describe('CreateReportCtrl', function() {
    it('initializes fields to default values', function() {
        var $scope = {};
        var $location = {};
        var SettingsService = SpecUtils.mockSettingsService();
        var ReportsService = SpecUtils.mockReportService();
        var lastReportNumber = ReportsService.getLastReportNumber();
        var lastInvoiceNumber = ReportsService.getLastInvoiceNumber();

        new CreateReportCtrl($scope, $location, SettingsService, ReportsService);


        var expectedDefaultReportNumber = lastReportNumber + 1;
        expect($scope.number).to.eql(expectedDefaultReportNumber);

        var expectedInvoiceNumber = lastInvoiceNumber + 1;
        expect($scope.invoiceNumber).to.eql(expectedInvoiceNumber);



    });
});