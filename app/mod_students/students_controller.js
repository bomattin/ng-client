'use strict';

angular.module('nextgear.students', ['ngRoute']);
    angular.module('nextgear.students').constant("config", {
        "url": "http://localhost:3000"
    });

angular.module('nextgear.students').config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/students', {
        templateUrl: 'mod_students/students_view.html',
        controller: 'studentsCtrl'
    });
}]);

// Delete modal controller
angular.module('nextgear.students').controller('delModalCtrl', ["$scope", "$http", "config", function($scope, $http, config) {
    $scope.deleteStudent = function(id) {
        $http({
            method: 'DELETE',
            url: config.url + '/students/' + id
        }).then(function(response){
            $scope.$hide();
        }).catch(function(response){

        })
    }
}]);

// Update modal controller
angular.module('nextgear.students').controller('updateModalCtrl', ["$scope", "$http", "config", function($scope, $http, config) {
    $scope.updateStudent = function(id) {
        $http({
            method: 'PUT',
            url: config.url + '/students/' + id,
            data: $scope.student
        }).then(function(response){
            $scope.$hide();
        }).catch(function(response){

        })
    }
}]);

angular.module('nextgear.students').controller('studentsCtrl', ["$scope", "$http", "$modal", "config", function($scope, $http, $modal, config) {
    // Scope var initialization
    $scope.newStudent = {};
    $scope.students = [];

    $scope.allStudents = function() {
        $http({
            method: 'GET',
            url: config.url + '/students'
        }).then(function(response){
            $scope.students = response.data;
        }).catch(function(response){

        })
    };

    $scope.addStudent = function() {
        $http({
            method: 'POST',
            url: config.url + '/students',
            data: $scope.newStudent
        }).then(function(response){
            $scope.allStudents();
        }).catch(function(response){

        })
    };

    // Launch delete modal
    $scope.confirmDelete = function(student) {
        var mScope = $scope.$new(true);
        mScope.student = student;

        var m = $modal({
            scope: mScope,
            templateUrl: "mod_students/students_del_modal.tpl.html",
            controller: "delModalCtrl"
        });
    };


    // Launch update modal
    $scope.confirmUpdate= function(student) {
        var mScope = $scope.$new(true);
        mScope.student = student;

        var m = $modal({
            scope: mScope,
            templateUrl: "mod_students/students_update_modal.tpl.html",
            controller: "updateModalCtrl"
        });
    };

    $scope.allStudents();

}]);

