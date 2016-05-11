angular.module('fsy', ["ngRoute", "commonModule", "userModule"]).
	config(["$routeProvider", function($routeProvider) {
		$routeProvider.
			when("/user", {
				templateUrl: "user/controllers/user.html"
			}).
			when("/user/register", {
				templateUrl: "user/controllers/register.html"
			});
	}]);