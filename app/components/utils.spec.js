/* global describe, it, beforeEach */
/* jshint expr: true */

(function () {
    'use strict';
}());

var chai = require('chai');
var expect = chai.expect;

var utils = {
    mockReportService: function() {
        return {
            lastReportNumber: 22,
            lastInvoiceNumber: 55,

            getLastReportNumber: function() {
                return this.lastReportNumber;
            },
            getLastInvoiceNumber: function() {
                return this.lastInvoiceNumber;
            }
        };
    },

    mockSettingsService: function() {
        return {
            getSettings: function() {
                return {
                    defaultProvider: "Test Provider",
                    customers: ["Test Customer"]
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

                expect(result).to.eql(reportService.lastReportNumber);
            });
        });

        describe('getLastInvoiceNumber', function() {
            it('returns lastInvoiceNumber', function() {
                var result = reportService.getLastInvoiceNumber();

                expect(result).to.exist;
                expect(result).to.eql(reportService.lastInvoiceNumber);
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

            describe('returned object', function() {
                var settings;

                beforeEach(function() {
                    settings = settingsService.getSettings();
                });

                it('has customers property as array and at least one customer', function() {
                    expect(settings.customers).to.exist;
                    expect(settings.customers.length).to.be.above(0);
                });

                it('has defaultProvider', function() {
                    expect(settings.defaultProvider).to.be.ok;
                });
            });


        });

    });
});