'use strict';

angular.module('myApp.recipe', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/recipes/:id', {
    templateUrl: 'recipe/recipe.html',
    controller: 'RecipeCtrl'
  });
}])

.controller('RecipeCtrl', ['$scope', '$http','$route', function($scope, $http, $route) {

  const fetch = () => {
    $http({
      method: 'GET',
      url: `http://localhost:3000/recipes/${$route.current.params.id}`
    }).then(data => {
      $scope.recipe = data.data;
    });
  };
  fetch();
}]);
