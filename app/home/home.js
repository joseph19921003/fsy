angular.module("mainModule", []).
	controller("homeCtrl", ["$scope", "validate","globalData", function($scope, validate, globalData) {
		$('.carousel').carousel({
		  	interval: 5000
		});
		globalData.navState.main = true;
		globalData.navState.serve = false;
		globalData.navState.user = false;
	}]);