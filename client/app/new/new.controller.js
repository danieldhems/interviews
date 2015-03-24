'use strict';

angular.module('Interviews')
  .controller('NewCtrl', ['$scope', '$http', 'geocoder', function ($scope, $http, geocoder) {
    
    $scope.interview = {};

    $scope.newinterviewForm = $('.new-interview');

    $scope.isSubmitted = false;
    $scope.submissionSuccess = false;
    $scope.submissionError = false;

    $scope.save = function(){

      geocoder.geocodeAddress( $scope.interview.address ) 
      .then( function(data){
        $scope.interview.location = {
          lat: data.lat,
          lng: data.lng
        };
        
        // console.log( $scope.interview.location );

        $scope.interview.dateCreated = new Date();

        $scope.isSubmitted = true;
        
        // send to server
        //*
        $http.post('/api/interviews', $scope.interview)
          .success( function(response){
            if(response){
              $scope.submissionSuccess = true;
              console.log(response);
            }
          })
          .error( function(err){
            $scope.submissionError = true;
            console.log(err);
          });
        //*/
      });

    };

    $scope.resetForm = function(){
      $scope.isSubmitted = false;
      $scope.submissionSuccess = false;
    }
  }])
