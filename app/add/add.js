'use strict';


angular.module('myApp.add', ['ngRoute'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/add', {
      templateUrl: 'add/add.html',
      controller: 'AddCtrl'
    });
  }])

  .controller('AddCtrl', ['$scope', '$http', function ($scope, $http) {

    $scope.create = function (recipe) {
      $http({
        method: 'POST',
        url: 'http://localhost:3000/recipes',
        data: JSON.stringify({
          ...recipe,
          createDate: Date.now(),
        }),
        headers: {'Content-Type': 'application/json'}
      }).then(() => {
        window.alert('Recipe added');
      });
    };
  }]);
