/* global describe, it, beforeEach */
/* jshint expr: true */

(function () {
    'use strict';
}());

var chai = require('chai');
var expect = chai.expect;

var utils = {
    lastReportNumber: 22,
    lastInvoiceNumber: 55,

    mockReportService: function() {
        return {
            getLastReportNumber: function() {
                return utils.lastReportNumber;
            },
            getLastInvoiceNumber: function() {
                return utils.lastInvoiceNumber;
            }
        };
    },

    mockSettingsService: function() {
        return {
            getSettings: function() {
                return {
                    customers: [{}]
                };
            }
        };
    }
};

module.exports = utils;



describe('utils.spec', function() {
    describe('mockReportService', function() {
        var reportService;

        beforeEach(function() {
            reportService = utils.mockReportService();
        });

        it('returns an object', function() {
            expect(reportService).to.exist;
        });

        describe('getLastReportNumber', function() {
            it('returns lastReportNumber', function() {
                var result = reportService.getLastReportNumber();

                expect(result).to.eql(utils.lastReportNumber);
            });
        });

        describe('getLastInvoiceNumber', function() {
            it('returns lastInvoiceNumber', function() {
                var result = reportService.getLastInvoiceNumber();

                expect(result).to.exist;
                expect(result).to.eql(utils.lastInvoiceNumber);
            });
        });
    });

    describe('mockSettingsService', function() {
        describe('getSettings', function() {
            var settingsService;

            beforeEach(function() {
                settingsService = utils.mockSettingsService();
            });

            it('is a function', function() {
                var getSettings = settingsService.getSettings;

                expect(getSettings).to.be.an.instanceof(Function);
            });

            it('returns an object', function() {
                var settings = settingsService.getSettings();

                expect(settings).to.exist;
            });

            it('returns an object with customers property as array and at least one customer', function() {
                var settings = settingsService.getSettings();

                expect(settings.customers).to.exist;
                expect(settings.customers.length).to.be.above(0);
            });
        });

    });
});