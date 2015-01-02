/* global module, $ */

(function () {
    'use strict';
}());

var daySelectorConfiguration = {
    format: "dd MM yyyy",
    weekStart: 1,
    autoclose: true
};

var monthSelectorConfiguration = {
    format: "MM yyyy",
    weekStart: 1,
    startView: 1,
    minViewMode: 1,
    autoclose: true
};

var types = {
    'day': daySelectorConfiguration,
    'month': monthSelectorConfiguration
};

module.exports = function TwkCalendarInput() {
    var datePickerElement;

    function initCalendar(scope, element, attrs) {
        //initialize datepicker component
        if(!attrs.type || !types[attrs.type]) {
            attrs.type = 'day';
        }
        datePickerElement = $('.date', element).datepicker(types[attrs.type]);

        //update the date from the model
        datePickerElement.datepicker('update', scope.ngModel);

        //on date change update the model with the selected date
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