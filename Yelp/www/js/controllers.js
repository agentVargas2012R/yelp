angular.module('app.controllers', [])
  
.controller('yelpCtrl', ['$scope', '$http', 'YelpSrv', function($scope, $http, yelpSrv) {
	//http://www.tutorialspoint.com/ionic/ionic_geolocation.htm
	navigator.geolocation.getCurrentPosition
    (onGeoSuccess, onGeoError, { enableHighAccuracy: true });
	//debugger;

	$scope.searchCriteria = {};

	$scope.searchAction = function(keyEvent){
		if (keyEvent.which === 13){
			$scope.search();    
		}	
	}
		
	$scope.search = function(){
		yelpSrv.findBusinesses($scope.searchCriteria.searchTerm, $scope.searchCriteria.cityLocation).then(function(data){
	        $scope.businesses = [];
	        $scope.businesses = data;
	    });
	}
}])
   
.controller('detailsCtrl', function($scope) {

})
 

function onGeoSuccess(position){	
	localStorage.setItem("lat2", JSON.stringify(
		{ 
			"latitude"  : position.coords.latitude,
			"longitude" : position.coords.longitude 
		}
	));   
}

function onGeoError(){

}



