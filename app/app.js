angular.module('fsy', ["ngRoute", "commonModule", "userModule", "serveModule", "mainModule"]).
	config(["$routeProvider", function($routeProvider) {
		$routeProvider.
			when("/user", {
				templateUrl: "user/controllers/user.html"
			}).
			when("/test", {
				template: "<h1>我成功了！</h1>",
				controller: "testCtrl",
				resolve: {
					a: function() {
						return 1;
					}
				}
			}).
			when("/home", {
				templateUrl: "home/controllers/home.html",
				controller: "homeCtrl"
			}).
			when("/user/register", {
				templateUrl: "user/controllers/register.html"
			}).
			when("/user/order", {
				templateUrl: "user/controllers/order.html"
			}).when("/serve/orderWater", {
				templateUrl: "serve/controllers/orderWater.html"/*,
				controller: "orderWter"*/
			}).when("/serve/deliverWater", {
				templateUrl: "serve/controllers/deliverWater.html"/*,
				controller: "deliverWater"*/
			}).when("/user/after_sale", {
				templateUrl: "serve/controllers/afterSale.html"
			}).otherwise({
				redirectTo: "/home"
			});
	}]).
	run(["$rootScope", "$location", "$timeout", "globalData", function($rootScope, $location, $timeout, globalData) {
		$rootScope.userState = false;
		$rootScope.tip = "请先登入或注册！";
		$rootScope.$on("$routeChangeStart", function(event, next, current) {
			if(!globalData.user.userState && 
				globalData.authority.hasAuthority(next.originalPath
			)) {
				$location.path("/user");
				$rootScope.userState = !$rootScope.userState;
				$timeout(function() {
					$rootScope.userState = !$rootScope.userState;
				}, 1200);
			}
		});
	}]);