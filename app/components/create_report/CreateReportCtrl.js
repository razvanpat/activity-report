module.exports = function CreateReportCtrl($scope) {


    //TODO: Build this crap into a directive
    $('.input-group.date.days').datepicker({
        format: "dd MM yyyy",
        weekStart: 1,
        autoclose: true
    });

    $('.input-group.date.month-only').datepicker({
        format: "MM yyyy",
        weekStart: 1,
        startView: 1,
        minViewMode: 1,
        autoclose: true
    });
};
