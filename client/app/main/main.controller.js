'use strict';

angular.module('Interviews')
  .controller('MainCtrl', ['$http', '$scope', function ($http, $scope) {
    $scope.interviews = [];

    $http.get('/api/interviews', $scope.newinterview)
      .success( function(response){
        $scope.updateResults(response);
      });

    $scope.map = {
      center: {
        latitude: '51.5056',
        longitude: '0.0756'
      },
      zoom: 14
    };

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