var app = angular.module('eggly.models.categories', []);

app.service("CategoriesModel", function($http){
  var model = this;
  var urls = {
    fetch: "app/data/categories.json"
  };
  var categories;

  function extract(result){
    return result.data;
  }



  function cacheCategories(result){
    categories = extract(result);
    return categories;
  }

  model.getCategories = function(){
   return $http.get('app/data/categories.json').then(cacheCategories);
  };
});
