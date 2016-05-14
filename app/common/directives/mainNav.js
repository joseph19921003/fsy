angular.module("commonModule").
	directive("navigator", ["$location", "globalData", function($location, globalData) {
		return {
			restrict: "AE",
			templateUrl: "common/directives/mainNav.html",
			scope: {
				warning: "=warning"
			},
			replace: true,
			link: function(scope, element, attrs) {
				scope.to_user = function() {
					location.hash = "/user";
					// $location.hash("/user");
				};
				scope.to_home = function() {
					location.hash = "/home";
				};
				scope.data = globalData;
			}
		};
	}]);