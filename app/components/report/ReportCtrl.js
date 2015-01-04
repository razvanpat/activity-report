var _ = require('lodash');

module.exports = function ReportCtrl(
		$scope, $routeParams, $location, ReportsService) {

	$scope.report = ReportsService.getReport($routeParams.reportId);
	if (!$scope.report) {
		$location.url('/');
	}

	var firstd = new Date(
			$scope.report.periodYear,
			$scope.report.periodMonth,
 		 	1);
	
	while(firstd.getDay() === 0 || firstd.getDay() == 6) {
		firstd = new Date(
				firstd.getFullYear(),
				firstd.getMonth(),
				firstd.getDate() + 1
				);
	}

	$scope.date = firstd;	

	$scope.addEntry = function () {
		ReportsService.addEntry($routeParams.reportId, {
			"dateDay": $scope.date.getDate(),
			"dateMonth": $scope.date.getMonth(),
			"dateYear": $scope.date.getFullYear(),
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
