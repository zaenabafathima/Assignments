var myModule = angular.module('myApp')


myModule.factory('bookFactory', function($http){

      return {
              getBooks:getBooks
            }


      function getBooks(){
        return $http.get("books.json").then(function(response){
          return response.data.books
        })

    }
})
