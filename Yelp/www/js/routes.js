angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

      .state('yelp', {
    url: '/page1',
    templateUrl: 'templates/yelp.html',
    controller: 'yelpCtrl'
  })

  .state('details', {
    url: '/page2',
    templateUrl: 'templates/details.html',
    controller: 'detailsCtrl'
  })

$urlRouterProvider.otherwise('/page1')

  

});