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

    function resetSelectedState() {
        _.forEach($scope.reports, function (report) {
            report.selected = false;
        });

        $scope.deleteDisabled = true;
    }

    calculateHours();
    resetSelectedState();

    $scope.checkboxClicked = function () {
        $scope.deleteDisabled = !_.reduce($scope.reports, function (result, report) {
            return result || report.selected;
        }, false);
    };

    $scope.deleteReports = function () {
        if (confirm('Are you sure?')) {
            ReportsService.deleteSelectedReports();
            calculateHours();
        } else {
            resetSelectedState();
        }
    };

    $scope.createReport = function () {
        $location.url('/create_report');
    };
};
