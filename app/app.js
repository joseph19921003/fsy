angular.module('fsy', ["ngRoute", "commonModule", "userModule", "serveModule"]).
	config(["$routeProvider", function($routeProvider) {
		$routeProvider.
			when("/user", {
				templateUrl: "user/controllers/user.html"
			}).
			when("/user/register", {
				templateUrl: "user/controllers/register.html"
			}).
			when("/user/order", {
				templateUrl: "user/controllers/order.html",
				controller: "orderCtrl"
			}).when("/serve/orderWater", {
				templateUrl: "serve/controllers/orderWater.html"/*,
				controller: "orderWter"*/
			}).when("/serve/deliverWater", {
				templateUrl: "serve/controllers/deliverWater.html"/*,
				controller: "deliverWater"*/
			});
	}]);