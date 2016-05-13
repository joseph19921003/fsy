angular.module("commonModule").
	directive("navigator", ["$location", function($location) {
		return {
			restrict: "AE",
			templateUrl: "common/directives/mainNav.html",
			scope: {},
			replace: true,
			link: function(scope, element, attrs) {
				scope.to_user = function() {
					location.hash = "/user";
					// $location.hash("/user");
				};
				scope.to_home = function() {
					location.hash = "/home";
				};
			}
		};
	}]);