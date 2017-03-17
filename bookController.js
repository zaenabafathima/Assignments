var myModule =  angular.module('myApp', ['ui.bootstrap'])

myModule.directive('bookList', function(){
console.log("made it here!!!")


return{
  restrict:'EA',

  templateUrl:'tiledDisplay.html',
  scope:{
    books:'='

  }

  }


});


myModule.controller('bookController', function($scope, $http, bookFactory) {
    var $ctrl=this;
   var allBooks =[];
   console.log("state of sidebar is ", $scope.isCollapsedHorizontal)
   $scope.currentBooks=[];
   $scope.allTags=[];
   $scope.bookSearch;
   $scope.selected=0;





    bookFactory.getBooks() //retrieve books from json file books.json
    .then(function(response){
        allBooks = response
        allTagsWithRedundancy = getAllTags(allBooks)
        countEverything(allTagsWithRedundancy.slice(0))
        var merged = [].concat.apply([], allTagsWithRedundancy);
        var unique = merged.filter(onlyUnique);  //remove duplicate tags from merged
        $scope.allTags=unique
        $scope.currentBooks=allBooks

    })


/**********************************************
searchBooks: searches for key entered by user
under "filter by author" or "filter by title"
***********************************************/

    $scope.searchBooks=function(key){

      searchResults=[];

      $scope.currentBooks=allBooks
      $scope.selected=-1;


      if(!key){ //display all books if no search term entered

        return
      }


      for(var i=0;i<$scope.currentBooks.length;i++){
        if(key)
        regex=new RegExp(key, "gi") //create regular expression to search for key

          foundTitle = $scope.currentBooks[i].title.search(regex)

        foundAuthor = $scope.currentBooks[i].author.search(regex)


        if(foundTitle!=-1 || foundAuthor!=-1){

          searchResults.push($scope.currentBooks[i])
        }
      }


      $scope.currentBooks=searchResults

    }





    function getAllTags(bookList){

        var allTags=[];
        for(var i=0;i<bookList.length;i++){
            for(var j=0;j<bookList[i].tags.length;j++){
                  allTags.push(bookList[i].tags[j]);
                }
              }
        return allTags;
      }




function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}




      $scope.filterit=function(tag, index){
          $scope.selected=index;
          $scope.key=null;


          console.log("collapsed in filterit", $scope.isCollapsed)

          var filter=tag;
          if(filter=="All Titles"){
              $scope.currentBooks=allBooks;

              return;
          }

    $scope.currentBooks=[];
    for(var i=0;i<allBooks.length;i++){
        for(var j=0;j<allBooks[i].tags.length;j++){
            if(filter==allBooks[i].tags[j]){
                $scope.currentBooks.push(allBooks[i])
              }
            }//j
          }//i
        }



/*************************
Highcharts stuff----very messy...needs cleaning
*************************/
    function countEverything(tags){
      $scope.highchartsData=[];

      console.log("the tags are", tags)
      tags.sort();
      console.log("sorted tags are ,", tags)
      var genre, count=0;
      for(var i=0;i<tags.length;i++)
      {
        genre=tags[i];
        count=1;
        while(genre==tags[++i])
        {
          count++
        }
        --i;
        $scope.highchartsData.push({name: genre, y:count})

        }


      console.log($scope.highchartsData)
      piePlotter();
      barPlotter();

    }

function countEverythingForBar(){
  console.log("allbooks in bar counter is ", allBooks, allBooks.length)
  $scope.highchartsDataAuthors=[]
  $scope.highchartsDataAuthorCount=[]
  var allAuthorsWithRedundancy=[];

  for(var i=0;i<allBooks.length;i++){
    allAuthorsWithRedundancy.push(allBooks[i].author)
  }
  allAuthorsWithRedundancy.sort();
  console.log(allAuthorsWithRedundancy)

  var author, count=0;
  for(var i=0;i<allAuthorsWithRedundancy.length;i++)
  {
    author=allAuthorsWithRedundancy[i];
    count=1;
    while(author==allAuthorsWithRedundancy[++i])
    {
      count++
    }
    --i;
    $scope.highchartsDataAuthors.push(author);
    $scope.highchartsDataAuthorCount.push(count)

    }
    console.log("the bar plot details are ", $scope.highchartsDataAuthorCount)





}


    function barPlotter(){
       countEverythingForBar();

      Highcharts.chart('barContainer', {
        chart: {
            type: 'column'
        },
        legend: {
        enabled: false
    },
        title: {
            text: 'Author Book Count'
        },
        xAxis: {
        title:{
        text:'Authors'
        },
        plotOptions: {
        series: {
            dataLabels: {
                // enabled: true

            },
            pointPadding: 0.1,
                    groupPadding: 1
        }
    },
        categories:$scope.highchartsDataAuthors


        },
        yAxis: {
            title: {
                text: 'No of Books Written'
            }
        },
        series:[{
          name : 'Book Count',
          data:$scope.highchartsDataAuthorCount
        }]
    });


    }

    function piePlotter(){

      console.log($scope.highchartsData, "is what plotter gets")
      Highcharts.chart('container', {

          chart:{
            type:'pie'
          },

          title:{
            text: "Books Per Tag"
          },

          plotOptions: {
                                    pie: {
                                        allowPointSelect: true,
                                        cursor: 'pointer',
                                        dataLabels: {
                                            enabled: true,
                                            format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                                        }
                                    }
                                },

          series: [
              {
                name:'Book Count',
                data:$scope.highchartsData
              }

            ]
      });//closes highcharts api
    }//closes function plotter




});//close the controller
