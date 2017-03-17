
var allBooks = [];



if (window.XMLHttpRequest) { // Mozilla, Safari, IE7+ ...
  httpRequest = new XMLHttpRequest();

} else if (window.ActiveXObject) { // IE 6 and older
    httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
}


httpRequest.open('GET', 'books.json', true);
httpRequest.send(null);




/************  XHR **************/
httpRequest.onreadystatechange = function(){
    // process the server response

    if (httpRequest.readyState === XMLHttpRequest.DONE)
      {
    // everything is good, the response is received

      if(httpRequest.status==200)
        {

          processResults(httpRequest);
        }
      }
    else {
    // still not ready
          }
};
/*****************************/



/************PROCESS httpRequest ********/
function processResults(httpRequest)
{
  var resp=httpRequest.responseText;

  allBooks=JSON.parse(resp);
  //got the books...hallelujah!!

  //now to display them all
  // leftPanelPopulate(allBooks)
  rightPanelPopulate(allBooks)
}
/***************************************


/************FILL UP RIGHT PANEL*************/
function rightPanelPopulate(allBooks, filter){

  var container=document.getElementById('rightpanel'); //our right panel
  container.innerHTML="";

  allBooks=allBooks.books;
  if(filter!=undefined && filter!='All Titles'){



  for(var i=0; i<allBooks.length; i++){
    for(var j=0;j<allBooks[i].tags.length;j++){
      if(filter==allBooks[i].tags[j]){

    container.innerHTML+="<div class='col-md-4 col-sm-6 col-xs-12 tile'>"+"<b><i>"+allBooks[i].title+"</i></b><br/>"+allBooks[i].author+"   <br/><b>"+filter+"</div>";
    //container.innerHTML+="<div class='babyDiv'>"+filter+"</div></div>";
    //container.innerHTML+=filter+"</div>";
  }
  }//j
  }
}
else {
  for(var i=0; i<allBooks.length; i++){
    var bookTags=allBooks[i].tags;

    container.innerHTML+="<div class='col-md-4 col-sm-6 col-xs-12 tile' >"+"<b><i>"+allBooks[i].title+"</i></b><br/>"+allBooks[i].author+"   <br/><b>"+bookTags+"</div>";

    //container.innerHTML+="<div class='col-md-4 col-sm-6 col-xs-12 tile'>"+allBooks[i].title+" :"+allBooks[i].author+"</div>";
  }
  }

}
/*******************************************/

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}


/**********FILL UP LEFT PANEL************/
/*function leftPanelPopulate(allBooks){
allBooks=allBooks.books;
//here, we need to obtain unique tags
var allTags=new Array();
for(var i=0;i<allBooks.length;i++)
{

  allTags.push(allBooks[i].tags);

}
var merged = [].concat.apply([], allTags);
console.log(merged);
var unique = merged.filter(onlyUnique);
console.log(unique);

//phew....now to display unique in all its glory!!

var container=document.getElementById('leftpanel'); //our right panel
container.innerHTML="";
//console.log(allBooks.books[2]);
container.innerHTML+="<ul>";
container.innerHTML+="<li class='listStyle' onclick='filterit(event)'>All Titles</li>";
for(var i=0; i<unique.length; i++){
  container.innerHTML+="<li class='listStyle' onclick='filterit(event)'>"+unique[i]+"</li>";
}
container.innerHTML+="</ul>";     */

/******************************************/

// }

function filterit(event) {
  console.log();
  var filter = event.target.innerHTML;
  rightPanelPopulate(allBooks, filter)
}
