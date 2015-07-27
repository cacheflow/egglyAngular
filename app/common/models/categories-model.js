var app = angular.module('eggly.models.categories', []);

app.service("CategoriesModel", function($http, $q){
  var model = this;
  var urls = {
    fetch: "app/data/categories.json"
  };
  var categories;
  var currentCategory;

  function extract(result){
    return result.data;
  }

  model.setCurrentCategory = function(categoryName){
    return model.getCategoryByName(categoryName)
    .then(function(category) {
      currentCategory = category;
    });
  };

  model.getCurrentCategory = function(){
    return currentCategory;
  };


  model.getCurrentCategoryName = function(){
    return currentCategory ? currentCategory.name : '';
  };



  function cacheCategories(result){
    categories = extract(result);
    return categories;
  }
  

  model.getCategories = function(){
   return (categories) ? $q.when(categories) : $http.get('app/data/categories.json').then(cacheCategories);
  };

  model.getCategoryByName = function(categoryName) {
    var deferred = $q.defer();

    function findCategory() {
      return _.find(categories, function(c){
        return c.name == categoryName;
      });
    }

    if(categories) {
      deferred.resolve(findCategory());
    }
    else {
      model.getCategories()
      .then(function(result){
        deferred.resolve(findCategory());
      });
     }
    return deferred.promise;
  };
});
