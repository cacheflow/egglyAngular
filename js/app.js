var app  = angular.module("Eggly", []);

app.controller("MainCtrl", function($scope){
  $scope.bookmarks = [
    {"id": 1, "title": "HipHopDx", "url": "www.hiphopdx.com", "category": "rap" },
    {"id": 2, "title": "AllHipHop", "url": "www.defsounds.com", "category": "blues"},
    {"id": 3, "title": "Country", "url": "http://www.cmt.com/", "category": "country"}
  ];

  $scope.categories = [
    {"id": 1, "title": "First", "name": "rap"},
    {"id": 2, "title": "Second", "name": "blues"},
    {"id": 3, "title": "Third", "name": "country"}
  ];

  $scope.isCreating = false;
  $scope.isEditing = false;
  $scope.currentCategory = null;
  $scope.editedBookmark = null;

  function startCreating() {
    $scope.isCreating = true;
    $scope.isEditing = false;
    resetCreateForm();
  }

  function cancelCreating() {
    $scope.isCreating = false;
  }

  function startEditing() {
    $scope.isCreating = false;
    $scope.isEditing = true;
  }

  function cancelEditing(){
    $scope.isEditing = false;
  }

  $scope.startCreating = startCreating;
  $scope.cancelEditing = cancelEditing;
  $scope.startEditing = startEditing;
  $scope.cancelCreating = cancelCreating;


  function setCurrentCategory(category) {
    $scope.currentCategory = category;

    cancelCreating();
    cancelEditing();
  }

  function shouldShowCreating() {
    return $scope.currentCategory && !$scope.isEditing;
  }

  function shouldShowEditing() {
    return $scope.isEditing && !$scope.isCreating;
  }

  function isCurrentCategory(category) {
    return $scope.currentCategory !== null && category.name === $scope.currentCategory.name;
  }

  $scope.setCurrentCategory = setCurrentCategory;
  $scope.isCurrentCategory = isCurrentCategory;
  $scope.shouldShowEditing = shouldShowEditing;
  $scope.shouldShowCreating = shouldShowCreating;
  $scope.createBookmark = createBookmark;
  //---------
    function resetCreateForm() {
      $scope.newBookmark = {
        title: '',
        url: '',
        name: $scope.currentCategory
      };
    }
    function createBookmark(bookmark) {
      bookmark.id = $scope.bookmarks.length;
      $scope.bookmarks.push(bookmark);
      console.log($scope.bookmarks);
       resetCreateForm();
    }

    function setEditedBookmark(bookmark) {
      $scope.editedBookmark = angular.copy(bookmark);
    }

    function updateBookmark(bookmark) {
      //this loops through the array and returns the bookmark where
      //the currentBookmark and bookmark id matches
      var index = _.findIndex($scope.bookmarks, function(currentBookmark){
        return currentBookmark.id == bookmark.id;
      });
      $scope.bookmarks[index] = bookmark;
      //right here since the bookmarks is an array of objects you can
      //pass the number that the index function returns as an array number/id

      $scope.editedBookmark = null;
      $scope.isEditing = false;
    }

    function isSelectedBookmark(bookmark) {
      return $scope.editedBookmark !== null && $scope.editedBookmark.id == bookmark;
    }



    function deleteBookmark(bookmark) {
      _.remove($scope.bookmarks, function(currentBookmark){
        return currentBookmark.id == bookmark.id;
      });
    }

    $scope.deleteBookmark = deleteBookmark;

    $scope.isSelectedBookmark = isSelectedBookmark;

    $scope.setEditedBookmark = setEditedBookmark;
    $scope.updateBookmark = updateBookmark;

});
