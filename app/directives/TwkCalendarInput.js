/* global module, $ */

(function () {
    'use strict';
}());

module.exports = function TwkCalendarInput() {
    var datePickerElement;

    function initCalendar(scope, element, attrs) {
        datePickerElement = $('.date', element).datepicker({
            format: "dd MM yyyy",
            weekStart: 1,
            autoclose: true
        });

        datePickerElement.datepicker('update', scope.ngModel);

        datePickerElement.datepicker().on('changeDate', function(e) {
            scope.ngModel = e.date;
            scope.$apply();
        });
    }

    return {
        templateUrl: '/directives/TwkCalendarInput.html',
        link: initCalendar,
        scope: {
            ngModel: '='
        }
    };
};