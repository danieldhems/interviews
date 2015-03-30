'use strict';

angular.module('Interviews')
  .controller('MainCtrl', ['$http', '$scope', function ($http, $scope) {
    $scope.interviews = [];

    $http.get('/api/interviews', $scope.newinterview)
      .success( function(response){
        $scope.updateResults(response);
      });

    $scope.mapDefaultSettings = {
      center: {
        latitude: '51.510830',
        longitude: '-0.076132'
      },
      zoom: 13
    };

    $scope.map = $scope.mapDefaultSettings;

    // Helper object required by google-map directive to gain control of it
    $scope.control = {};

    $scope.centerMap = function(location){
      // iIf latlng coords are not available, return
      // this handles the case when an interview is added but an address isn't provided
      if(location === undefined) return;

      // angular maps method for centering the map
      $scope.control.refresh({
        latitude: location.latitude,
        longitude: location.longitude
      });
      $scope.map.zoom = 14;

      // can't rememebr what this is for...
      $scope.currentInterviewCoords = {
        latitude: location.lat,
        longitude: location.lng
      };
    };

    $scope.resetMap = function(){
      $scope.map = $scope.mapDefaultSettings;
    }

    $scope.prependinterview = function(interview){
      $scope.interviews.unshift(interview);
    };

    $scope.updateResults = function(interviews){
      $scope.interviews = interviews;
    };

    $scope.delete = function(id) {
      $http.delete('/api/interviews/' + id)
      .success( function(data){
        _.forEach( $scope.interviews, function(interview, i){
          if(interview._id === id) $scope.interviews.splice(i,1);
        });
      });
    };

  }]);
