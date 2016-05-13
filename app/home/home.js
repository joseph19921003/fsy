angular.module("mainModule", []).
	controller("homeCtrl", ["$scope", function($scope) {
		$('.carousel').carousel({
		  	interval: 5000
		});
	}]);