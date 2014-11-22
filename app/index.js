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
  .otherwise({
    redirectTo : "/"
  });
}]);
