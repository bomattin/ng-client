'use strict';

// Declare app level module which depends on views, and components
angular.module('nextgear', [
  'ngRoute',
  'ngAnimate',
  'nextgear.students',
  'mgcrea.ngStrap'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/students'});
}]);
