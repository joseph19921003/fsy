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
	}]).
	controller("orderCtrl", ["$scope", function($scope) {
		$scope.order = false;
		$scope.all = true;
		$scope.deliver = false;
		$scope.order_query = function(type) {
			switch(type) {
				case "order": 
					$scope.order = true;
					$scope.all = false;
					$scope.deliver = false;
					break;
				case "deliver": 
					$scope.order = false;
					$scope.all = false;
					$scope.deliver = true;
					break;
				case "all": 
					$scope.order = false;
					$scope.all = true;
					$scope.deliver = false;
					break;
			}
		};
		$scope.title = "订单详情";

		$scope.showModal = false;

		$scope.order_info = function() {
			$scope.showModal = !$scope.showModal;
		};
	}]);

