angular.module("serveModule", []).
	controller("orderWaterCtrl", ["$scope", "$http", "globalData", function($scope, $http, globalData) {
		globalData.navState.main = false;
		globalData.navState.serve = true;
		globalData.navState.user = false;
		
		$http.get("/fsy/order/remainWater.hs", {params: {userId: globalData.user.userId}}).
			success(function(data) {
				$scope.remainCount = data.remainCount;
			}).
			error(function() {
				// do something ..
				console.log("error");
			});
		$http.submit = function() {
			// do something...
		};
	}]).
	controller("deliverWaterCtrl", ["$scope", "$http", "globalData", function($scope, $http, globalData) {
		
		globalData.navState.main = false;
		globalData.navState.serve = true;
		globalData.navState.user = false;
		//alert(globalData.user.userId);
		$http.get("/fsy/order/remainWater.hs", {params: {userId: globalData.user.userId}}).
			success(function(data) {
				$scope.remainCount = data.remainCount;
			}).
			error(function() {
				// do something ..
				console.log("error");
			});
		$http.get("/fsy/user/defaultAddr.hs", {params: {userId: globalData.user.userId}}).
			success(function(data) {
				$scope.label_area = data.addr3;
				$scope.addrDetail = data.addrDetail;
				$scope.linkRelName = data.linkRelName;
				$scope.linkPhone = data.linkPhone;
				/*for(var prop in data) {
					if(data.hasOwnProperty(prop)) {
						$scope[prop] = data[prop];
						console.log($scope[prop]);
					}
				}*/
			}).
			error(function() {
				// do something...
				console.log("error");
			});
			
		$http.submit = function() {
			// do something...
		};
		
	}]).
	controller("afterSaleCtrl", ["$scope", "$http", "globalData", function($scope, $http, globalData) {
		globalData.navState.main = false;
		globalData.navState.serve = false;
		globalData.navState.user = true;
		
		$http.submit = function() {
			// do something...
		};
	}]);