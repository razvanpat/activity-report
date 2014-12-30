var _ = require('lodash');

module.exports = function ReportCtrl($scope, $routeParams, $location, ReportsService) {
    $scope.report = ReportsService.getReport($routeParams.reportId);
    if(!$scope.report) {
        $location.url('/');
    }

    //TODO: Build this crap into a directive
    var dp = $('.input-group.date').datepicker({
        format: "dd MM yyyy",
        weekStart: 1,
        autoclose: true
    });

    dp.datepicker('update', new Date(2014, 0, 3));


    $scope.addEntry = function() {
        var date = dp.datepicker('getDate');

        ReportsService.addEntry($routeParams.reportId, {
            "dateDay": date.getDate(),
            "dateMonth": date.getMonth(),
            "dateYear": date.getFullYear(),
            "project": $scope.project,
            "description": $scope.description,
            "time": $scope.time
        });

        $('#myModal').modal('hide');
    };

    $scope.updateDeleteBtnState = function () {
        $scope.deleteDisabled = !_.reduce($scope.report.entries, function (result, entry) {
            return entry || entry.selected;
        }, false);
    };
    $scope.updateDeleteBtnState();

    $scope.deleteEntries = function () {
        if (confirm('Are you sure?')) {
            ReportsService.deleteSelectedEntries($scope.report);
        } else {
            ReportsService.resetReportSelectedState($scope.report);
        }
        $scope.updateDeleteBtnState();
    };


};
