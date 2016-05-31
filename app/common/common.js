angular.module("commonModule", []).
	controller("commonCtrl", ["$scope", "globalData", function($scope, globalData) {
		$scope.data = globalData;
	}]).
	controller("testCtrl", ["$scope", "a", function($scope, a) {
		console.log(a);
	}]);