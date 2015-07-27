var app = angular.module('eggly.models.bookmarks', [

])
.service('BookmarksModel', function($http){
  var model = this;
  var bookmarks;

  function extract(result) {
    return result.data;
  }

  function cacheBookmarks(result){
    bookmarks = extract(result);
    return bookmarks;
  }

  model.getBookmarks = function(){
    return $http.get('app/data/bookmarks.json').then(cacheBookmarks);
  };
});
