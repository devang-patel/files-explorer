'use strict';

var destApp = angular.module('filesExplorer', ['ui.bootstrap']);

// Declare app level module which depends on filters, and services
destApp.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.when('/view1', {templateUrl: 'partial/1', controller: MyCtrl1});
    $routeProvider.when('/view2', {templateUrl: 'partial/2', controller: MyCtrl2});
    $routeProvider.when('/view', {templateUrl: 'partial/0', controller: MyCtrl3});
    $routeProvider.otherwise({redirectTo: '/view'});
    $locationProvider.html5Mode(true);
  }]);

destApp.controller('DestinationController', function ($scope, $http, $filter) {

    $http.get('data/server-data.json').success(function(data) {
        
        $scope.filters = { };
        $scope.destinations = data;
        $scope.filteredDestinations = [];
        $scope.pageSize = 10;
        $scope.maxSize = 10;
   
        $scope.FilterType = function(text) {
            $scope.filteredDestinations = $filter('filter')($scope.destinations, text);
        };
        $scope.FilterCate = function(cate) {
            $scope.filteredDestinations = $filter('filter')($scope.destinations, cate);
        };

        $scope.$watch('cityName', function (newCityName) {
            $scope.currentPage = 1;
            $scope.filteredDestinations = $filter('filter')($scope.destinations, $scope.cityName);
            $scope.noOfPages = Math.ceil($scope.filteredDestinations.length/$scope.pageSize); 
        });
    });
    
});

destApp.filter('startFrom', function () {
    return function (input, start) {
        start = +start; //parse to int
        return input.slice(start);
    };
});
