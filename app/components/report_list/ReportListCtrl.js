var _ = require('lodash');

module.exports = function ReportListCtrl($scope, $location, ReportsService) {
    $scope.reports = ReportsService.getReports();

    function calculateHours() {
        $scope.averageHours = _.reduce($scope.reports, function (total, report) {
            total += report.totalHours / $scope.reports.length;
            return total;
        }, 0);
        $scope.averageHypercare = _.reduce($scope.reports, function (total, report) {
            total += report.specialHours.Hypercare / $scope.reports.length;
            return total;
        }, 0);
    }

    calculateHours();

    $scope.updateDeleteBtnState = function () {
        $scope.deleteDisabled = !_.reduce($scope.reports, function (result, report) {
            return result || report.selected;
        }, false);
    };
    $scope.updateDeleteBtnState();

    $scope.deleteReports = function () {
        if (confirm('Are you sure?')) {
            ReportsService.deleteSelectedReports();
            calculateHours();
        } else {
            ReportsService.resetSelectedState();
        }
        $scope.updateDeleteBtnState();
    };

    $scope.createReport = function () {
        $location.url('/create_report');
    };
};
