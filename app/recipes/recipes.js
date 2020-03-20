'use strict';

angular.module('myApp.recipes', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/recipes', {
    templateUrl: 'recipes/recipes.html',
    controller: 'RecipesCtrl'
  });
}])

.controller('RecipesCtrl', ['$scope','$http', function($scope,$http) {
  $scope.filters = {
    sort: localStorage.getItem('sort') || 'asc'
  };
  const fetch = () => {
    $http({
      method: 'GET',
      url: 'http://localhost:3000/recipes'
    }).then(data => {
      $scope.categories = Array.from(new Set(data.data.map(rec => rec.category)))
    });
  };
  fetch();
  $scope.onDelete = id => {
    $http({
      method: 'DELETE',
      url: `http://localhost:3000/recipes/${id}`,
    }).then(() => {
      fetch();
    })
  };
  $scope.sortChanged = value => {
    localStorage.setItem('sort', value);
  };
  $scope.search = (filters={}) => {
    $http({
      method: 'GET',
      url: 'http://localhost:3000/recipes',
      params: {
        name_like: filters.name || undefined,
        _sort: 'createDate',
        _order: filters.sort || localStorage.getItem('sort'),
        category: filters.category || undefined,
      }
    }).then(data => {
      $scope.recipes = data.data.map(t => {
        return {
          ...t,
          createDate: new Date(t.createDate).toString(),
        }
      });
    });
  };
  $scope.search();
}]);
