var _ = require('lodash');
var fixtures = require('../../assets/fixtures.json');

module.exports = function ReportsService() {
    var reports = fixtures.reports;
    var settings = fixtures.settings;

    function getTotalHoursForReport(report) {
        return _.reduce(report.entries, function (hours, entry) {
            hours += entry.time;
            return hours;
        }, 0);
    }

    function getSpecialHoursForReport(report) {
        var specialHours = _.reduce(settings.special_projects, function (result, project) {
            result[project] = 0;
            return result;
        }, {});
        return _.reduce(report.entries, function (result, entry) {
            _.forEach(settings.special_projects, function (project) {
                if (entry.project === project) {
                    result[project] += entry.time;
                }
            });
            return result;
        }, specialHours);
    }

    function formatNumber(format, number) {
        var nr = number.toString();
        var result = format;
        var i;
        var ni = nr.length - 1;
        for(i = result.length - 1; i > 0; i--) {
            if(result.charAt(i) == '#') {
                result = result.replaceCharacter(i, ni >= 0 ? nr.charAt(ni--) : '0');
            }
        }
        return result;
    }


    function calculateReportData(report) {
        report.created_at = new Date(report.created_at);
        report.totalHours = getTotalHoursForReport(report);
        report.specialHours = getSpecialHoursForReport(report);
        report.formatted_report_number = formatNumber(report.report_number_format, report.number);
        report.formatted_invoice_number = formatNumber(report.invoice_number_format, report.invoice_number);
    }

    _.forEach(reports, function (report) {
        calculateReportData(report);
    });

    return {
        getReports: function () {
            return reports;
        },

        getReport: function (reportNumber) {
            var result = null;
            _.forEach(reports, function (report) {
                if (report.number == reportNumber) {
                    result = report;
                }
            });
            return result;
        },

        addReport: function(report) {
            calculateReportData(report);
            reports.push(report);
        },

        deleteSelectedReports: function() {
            _.remove(reports, function(report) {
                return report.selected;
            });
        },

        deleteSelectedEntries: function(report) {
            _.remove(report.entries, function(entry) {
                return entry.selected;
            });
            calculateReportData(report);
        },

        addEntry: function(reportNumber, entryData) {
            var report = _.find(reports, function(r) {
                return r.number == reportNumber;
            });

            report.entries.push(entryData);
        },

        getLastReportNumber: function() {
            return _.reduce(reports, function(max, report) {
                if(report.number > max) {
                    max = report.number;
                }
                return max;
            }, 1);
        },

        getLastInvoiceNumber: function() {
            return _.reduce(reports, function(max, report) {
                if(report.invoice_number > max) {
                    max = report.invoice_number;
                }
                return max;
            }, 1);
        },

        resetSelectedState: function() {
            _.forEach(reports, function (report) {
                report.selected = false;
            });
        },

        resetReportSelectedState: function(report) {
            _.forEach(report.entries, function (entry) {
                entry.selected = false;
            });
        }
    };
};