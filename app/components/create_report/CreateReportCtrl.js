module.exports = function CreateReportCtrl($scope, $location, SettingsService, ReportsService) {

    var settings = SettingsService.getSettings();

    $scope.number = ReportsService.getLastReportNumber() + 1;
    $scope.invoice_number = ReportsService.getLastInvoiceNumber() + 1;
    $scope.selectedProvider = settings.default_provider;
    $scope.customers = settings.customers;
    $scope.selectedCustomer = settings.customers[0];

    //TODO: Build this crap into a directive
    var reportDate = $('.input-group.date.days').datepicker({
        format: "dd MM yyyy",
        weekStart: 1,
        autoclose: true
    });

    var reportPeriod = $('.input-group.date.month-only').datepicker({
        format: "MM yyyy",
        weekStart: 1,
        startView: 1,
        minViewMode: 1,
        autoclose: true
    });

    reportDate.datepicker('update', new Date());

    var today = new Date();
    var lastMonth = new Date(today.getFullYear(), today.getMonth()-1, today.getDate());
    reportPeriod.datepicker('update', new Date(lastMonth));

    $scope.submit = function() {
        var period = reportPeriod.datepicker('getDate');
        var date = reportDate.datepicker('getDate');

        console.log(date.toString());

        ReportsService.addReport({
            "period_month": period.getMonth(),
            "period_year": period.getFullYear(),
            "client": $scope.selectedCustomer,
            "created_at": date,
            "number": $scope.number,
            "invoice_number": $scope.invoice_number,
            "report_number_format": settings.report_number_format,
            "invoice_number_format": settings.invoice_number_format,
            "provider": $scope.selectedProvider,
            "entries": [
            ]
        });

        $location.url('/report_list');
    };
};
