'use strict';

angular.module('myApp.edit', ['ngRoute'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/edit/:id', {
      templateUrl: 'edit/edit.html',
      controller: 'EditCtrl'
    });
  }])

  .controller('EditCtrl', ['$scope', '$http', '$route', function ($scope, $http, $route) {
    const id = $route.current.params.id;
    const fetch = () => {
      $http({
        method: 'GET',
        url: `http://localhost:3000/recipes/${id}`
      }).then(data => {
        $scope.recipe = data.data;
      });
    };
    fetch();
    $scope.update = function (recipe) {
      $http({
        method: 'PUT',
        url: `http://localhost:3000/recipes/${id}`,
        data: JSON.stringify(recipe),
        headers: {'Content-Type': 'application/json'}
      }).then(() => {
        window.alert('Recipe edited');
      });
    };
  }]);
