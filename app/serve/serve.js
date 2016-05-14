angular.module("serveModule", []).
	controller("orderWaterCtrl", ["$scope", "globalData", function($scope, globalData) {
		globalData.navState.main = false;
		globalData.navState.serve = true;
		globalData.navState.user = false;
	}]).
	controller("deliverWaterCtrl", ["$scope", "globalData", function($scope, globalData) {
		globalData.navState.main = false;
		globalData.navState.serve = true;
		globalData.navState.user = false;
	}]).
	controller("afterSaleCtrl", ["$scope", "globalData", function($scope, globalData) {
		globalData.navState.main = false;
		globalData.navState.serve = false;
		globalData.navState.user = true;
	}]);