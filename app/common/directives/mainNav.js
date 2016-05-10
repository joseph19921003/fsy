angular.module("commonModule", []).
	directive("navigator", function() {
		return {
			restrict: "AE",
			templateUrl: "common/directives/mainNav.html",
			scope: {},
			replace: true
		};
	});