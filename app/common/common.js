angular.module("commonModule", []).
	controller("commonCtrl", ["$scope", "globalData", function() {
		$scope.data = globalData;
	}]);