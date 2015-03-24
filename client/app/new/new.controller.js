'use strict';

angular.module('Interviews')
  .controller('NewCtrl', ['$scope', '$http', 'geocoder', function ($scope, $http, geocoder) {
    
    // placeholder object for form values
    $scope.interview = {};
    // placeholder object for google location data provided by autocomplete directive
    $scope.placeData = {};

    $scope.newinterviewForm = $('.new-interview');

    $scope.isSubmitted = false;
    $scope.submissionSuccess = false;
    $scope.submissionError = false;

    $scope.save = function(){

      if($scope.placeData.hasOwnProperty('geometry')){
        $scope.interview.location = {
          lat: $scope.placeData.geometry.location.k,
          lng: $scope.placeData.geometry.location.D
        };
      }

      $scope.interview.dateCreated = new Date();

      $scope.isSubmitted = true;

      $http.post('/api/interviews', $scope.interview)
        .success( function(response){
          if(response){
            $scope.submissionSuccess = true;
          }
        })
        .error( function(err){
          $scope.submissionError = true;
          console.log(err);
        });
    };

    $scope.resetForm = function(){
      $scope.isSubmitted = false;
      $scope.submissionSuccess = false;
    }
  }])
