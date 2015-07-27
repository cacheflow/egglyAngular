var app = angular.module("categories.bookmarks", [
  "categories.bookmarks.create",
  "categories.bookmarks.edit",
  "eggly.models.categories",
  "eggly.models.bookmarks"
])

  .config(function($stateProvider) {
    $stateProvider.state('eggly.categories.bookmarks', {
      url: 'categories/:category',
      views: {
        'bookmarks@': {
          templateUrl: 'app/categories/bookmarks/bookmarks.tmpl.html',
          controller: 'BookmarksListCtrl as bookmarksListCtrl'
        }
      }
    });
  })

  .controller('BookmarksListCtrl', function BookmarksListCtrl(BookmarksModel) {
    var bookmarksListCtrl = this;
    BookmarksModel.getBookmarks().then(function(result){
      bookmarksListCtrl.bookmarks = result;
    });
    // bookmarksListCtrl.currentCategoryName = $stateParams.category;
    // bookmarksListCtrl.bookmarks = BookmarksModel.getBookmarks();
  });
