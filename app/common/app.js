var app  = angular.module('Eggly', [
    "ui.router",
    "categories",
    "angular-toArrayFilter",
    "categories.bookmarks"
])

  .config(function($stateProvider, $urlRouterProvider){
    $stateProvider.state("eggly", {
      url: "",
      abstract: true
    });
    $urlRouterProvider.otherwise("/");
  });
