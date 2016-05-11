angular.module("userModule", []).
	controller("userCtrl", ["$scope", "$location", function($scope, $location) {
		$scope.title = "用户登入";

		$scope.showModal = false;

		$scope.login_modal = function() {
			$scope.showModal = !$scope.showModal;
		};
		$scope.to_register = function() {
			location.hash = "/user/register";
		};
	}]).
	controller("registerCtrl", ["$scope", function($scope) {
		$scope.title = "服务协议";

		$scope.service_agree = function() {
			$scope.showModal = !$scope.showModal;
		};

		$scope.agree_serve = function() {
			$scope.showModal = false;
			$scope.success = "btn-success";
		};
	}]);

