var _ = require('lodash');

module.exports = function ReportListCtrl($scope, ReportsService) {
    $scope.reports = ReportsService.getReports();
    $scope.averageHours = _.reduce($scope.reports, function(total, report) {
        total += report.totalHours / $scope.reports.length;
        return total;
    }, 0);
    $scope.averageHypercare = _.reduce($scope.reports, function(total, report) {
        total += report.specialHours.Hypercare / $scope.reports.length;
        return total;
    }, 0);

};
