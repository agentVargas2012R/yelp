angular.module('app.services', [])

.factory('YelpSrv', ['$http', '$q', function($http, $q){

        var factory = {};
        
        factory.businesses = {};
        
        factory.findBusinesses = function(searchTerm, cityLocation) {
                var method = 'GET';
                var url = 'http://api.yelp.com/v2/search';
                var params = {
                        callback: 'angular.callbacks._0',
                        location:  cityLocation,
                        oauth_consumer_key: 'Ht9in18ph7zeNK9G7wQbQg', //Consumer Key
                        oauth_token: 'CnnVoR2Ljm6pbaZeNm5OefL6VrQ_mw_m', //Token
                        oauth_signature_method: "HMAC-SHA1",
                        oauth_timestamp: new Date().getTime(),
                        oauth_nonce: randomString(32, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'),
                        term: searchTerm
                    };
                var consumerSecret = 'TVv8-3aW64migr8CsjfbaV4GVjo'; //Consumer Secret
                var tokenSecret = 'wQYovAnkwBn3wvNqnKMZOerL7E8'; //Token Secret
                var signature = oauthSignature.generate(method, url, params, consumerSecret, tokenSecret, { encodeSignature: false});
                params['oauth_signature'] = signature;

                return $http.jsonp(url, {params: params}).then(function(result) {
                	  var businesses = result.data.businesses;
                	  //http://stackoverflow.com/questions/22000077/how-to-request-larger-images-from-yelp-api	 
                      for(counter in businesses){
                      		var unformatted_image = businesses[counter].image_url;
                      		businesses[counter].image_url = unformatted_image.replace("ms.", "l.");
                      		businesses[counter].distance = {};
                      		businesses[counter].distance = calculateDistance(businesses[counter].location.coordinate);
                      		//debugger;		

                      }
                      return businesses;
                });
                
        }

        return factory;
}]);
//http://stackoverflow.com/questions/365826/calculate-distance-between-2-gps-coordinates
function calculateDistance(lat1, lat2){	
	if(lat2 == null){
		//use the default location of the device. 
		 lat2 = JSON.parse(localStorage.getItem("lat2"));		 
	}
	
	var R = 6371; // km
	var dLat = (lat2.latitude-lat1.latitude).toRad();
	var dLon = (lat2.longitude-lat1.longitude).toRad();
	var lat1 = lat1.latitude.toRad();
	var lat2 = lat2.latitude.toRad();

	var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
	        Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
	var d = R * c;
	var miles = d * 0.621371192;
	return miles.toPrecision(2) + " mi";
}


function randomString(length, chars) {
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
    return result;
}

Number.prototype.toRad = function() { 
	return this * (Math.PI / 180); 
} 
