'use strict';

angular.module('Interviews')
  .controller('NewCtrl', function ($scope, $http) {
    
    $scope.interview = {};

    $scope.newinterviewForm = $('.new-interview');

    $scope.isSubmitted = false;
    $scope.submissionSuccess = false;
    $scope.submissionError = false;

    $scope.save = function(){

      $scope.interview.dateCreated = new Date();

      $scope.isSubmitted = true;
      
      // send to server
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
  });
