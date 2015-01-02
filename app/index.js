/* global require */

(function () {
    'use strict';
}());

var angular = require('angular');
require('angular-route');

var app = angular.module('ActivityReport', ['ngRoute']);
require('./controllers');
require('./services');
require('./directives');

/*
 var resolver = {
 load : function($location, LinkedInService){
 if(!LinkedInService.isAuthenticated()){
 $location.path('/login');
 }
 }
 };
 */
app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: '/components/home/home_view.html',
            controller: 'HomeCtrl'
            //resolve: resolver
        })
        .when('/report/:reportId', {
            templateUrl: '/components/report/report_view.html',
            controller: 'ReportCtrl'
        })
        .when('/report_list', {
            templateUrl: '/components/report_list/report_list_view.html',
            controller: 'ReportListCtrl'
        })
        .when('/create_report', {
            templateUrl: '/components/create_report/create_report_view.html',
            controller: 'CreateReportCtrl'
        })
        .otherwise({
            redirectTo: "/"
        });
}]);

app.filter('monthName', [function() {
    return function (monthNumber) { //1 = January
        var monthNames = [ 'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December' ];
        return monthNames[monthNumber];
    };
}]);

String.prototype.replaceCharacter = function(index, character) {
    return this.substr(0, index) + character + this.substr(index+character.length);
};