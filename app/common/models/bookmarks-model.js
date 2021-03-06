var app = angular.module('eggly.models.bookmarks', [

])
.service('BookmarksModel', function($http, $q){
  var model = this;
  var bookmarks;

  function extract(result) {
    return result.data;
  }

  function cacheBookmarks(result){
    bookmarks = extract(result);
    return bookmarks;
  }

  function findBookmark(bookmarkId){
    return _.find(bookmarks, function(bookmark) {
      return bookmark.id == parseInt(bookmark, 10);
    });
  }

  model.getBookmarkById = function(bookmarkId) {
    var deferred = $q.defer();

    if(bookmarks){
      deferred.resolve(findBookmark(bookmarkId));
    } else {
      model.getBookmarks().then(function(){
        deferred.resolve(findBookmark(bookmarkId));
      });
    }

    return deferred.promise;
  };

  model.createBookmark = function(bookmark){
    bookmark.id = bookmarks.length;
    bookmarks.push(bookmark);
  };

  model.getBookmarks = function(){
    var deferred = $q.defer();

    if(bookmarks){
      deferred.resolve(bookmarks);
    } else {
         $http.get('app/data/bookmarks.json')
        .then(function(bookmarks){
          deferred.resolve(cacheBookmarks(bookmarks));
        });
      }
  };

  model.updateBookmark = function(bookmark) {
    var index = _.findIndex(bookmarks, function(b){
      return b.id == bookmark.id;
    });
    bookmarks[index] = bookmark;
  };
});
