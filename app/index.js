var angular  = require('angular');
require('angular-route');

var app = angular.module('ActivityReport', ['ngRoute'] );
require('./controllers');
//require('./services');

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
    templateUrl : '/components/home/home_view.html',
    controller : 'HomeCtrl'
    //resolve: resolver
  })
  .when('/report_list', {
    templateUrl : '/components/report_list/report_list_view.html',
    controller : 'ReportListCtrl'
  })
  .when('/create_report', {
    templateUrl : '/components/create_report/create_report_view.html',
    controller : 'CreateReportCtrl'
  })
  .otherwise({
    redirectTo : "/"
  });
}]);
