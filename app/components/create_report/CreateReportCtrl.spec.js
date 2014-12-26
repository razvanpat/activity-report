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
    it('defaults $scope.number to highest report number +1', function() {
        var $scope = {};
        var $location = {};
        var SettingsService = SpecUtils.mockSettingsService();
        var ReportsService = SpecUtils.mockReportService();

        new CreateReportCtrl($scope, $location, SettingsService, ReportsService);

        expect($scope.number).to.eql(SpecUtils.lastReportNumber + 1);
    });
});