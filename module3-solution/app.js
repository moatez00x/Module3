(function(){
'use strict';
angular.module('NarrowItDownApp',[])
.controller('NarrowItDownController',NarrowItDownController)
.service('MenuSearchService',MenuSearchService)
.directive('menuSearchDirective',MenuSearchDirective);

function MenuSearchDirective() {
  var ddo ={
    templateUrl: 'code.html',
    scope:{
      list : '<'
    }
    };
  return ddo;
};
NarrowItDownController.$inject=['MenuSearchService'];
function NarrowItDownController (MenuSearchService){
var menu = this;
menu.term ="";
menu.items=[];
menu.msg="";

menu.search=function(){
  menu.msg="";
  if(menu.term ===""){menu.msg="nothing is found";}
  menu.items = MenuSearchService.getMatchedMenuItems(menu.term);
console.log("this is the term : ",menu.term);
for(var i=0;i<menu.items.length;i++){
if(menu.items[i].description.toLowerCase().indexOf(menu.term) !== -1)
menu.msg="";
if(menu.items[i].description.toLowerCase().indexOf(menu.term) !== 1) menu.msg="nothing is found";
}
console.log(menu.msg);
};



menu.delete=function (itemIndex){
MenuSearchService.delete(itemIndex);
}

}



MenuSearchService.$inject=['$http']
function MenuSearchService($http){
var service= this;
var found =[];
var msg="";


service.getMatchedMenuItems= function(searchTerm){
$http({
method: "GET",
url: ("https://davids-restaurant.herokuapp.com/menu_items.json")
}).then(function(response){
for (var i=0 ;i<response.data.menu_items.length ;i++){
if ((searchTerm !== "") && (response.data.menu_items[i].description.toLowerCase().indexOf(searchTerm) !== -1))
found.push(response.data.menu_items[i]);}

}).catch (function (error){console.log("something's wrong");
}
);
return found;
}

service.delete = function(itemIndex){
  found.splice(itemIndex,1);}

service.getTest=function () {return test;};

};



}  )();
