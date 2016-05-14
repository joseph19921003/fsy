angular.module("userModule", []).
	controller("userCtrl", ["$scope", "$location", "globalData", "$timeout", function($scope, $location, globalData, $timeout) {
		$scope.title = "用户登入";

		$scope.showModal = false;

		$scope.login_modal = function() {
			$scope.showModal = !$scope.showModal;
		};
		$scope.to_register = function() {
			location.hash = "/user/register";
		};
		globalData.navState.main = false;
		globalData.navState.serve = false;
		globalData.navState.user = true;
	}]).
	controller("registerCtrl", ["$scope", "$http", "$timeout", "globalData", "validate", function($scope, $http, $timeout, globalData, validate) {
		$scope.title = "服务协议";

		$scope.service_agree = function() {
			$scope.showModal = !$scope.showModal;
		};

		$scope.agree_serve = function() {
			$scope.showModal = false;
			$scope.success = "btn-success";
		};
		$scope.user = {
			username: "",
			password: "",
			rePassword: "",
			relName: "",
			phone: "",
			city: "上海",
			area: "",
			addrDetail: "",
			linkRelName: "",
			linkPhone: "",
			orderNum: "10",
			machineColor: "白",
			deliverNumFirst: "2"
		};

		$scope.paddingData = function() {
			for(prop in user) {
				globalData.user[prop] = user[prop];
			}
		};

		$scope.alertState = false;
		$scope.alertInfo = "";
		$scope.timeout = null;
		$scope.$watch(function() {
			return $scope.user.username;
		}, function(value) {
			if(value) {
				if(validate.isWord((value || "").trim())) {
					if($scope.timeout) {
						$timeout.cancel($scope.timeout);
					}
					$scope.timeout = $timeout(function() {
						$http.get("test/test.json", {}).
						success(function(data, status, headers, config) {
							if(true) {
								$scope.usernameCSSTip = {
									tip_success: true,
									tip_error: false
								};
								$scope.usernameTip = "恭喜！用户名可用！";
							} else {
								$scope.usernameCSSTip = {
									tip_success: false,
									tip_error: true
								};
								$scope.usernameTip = "用户名已存在！";
							}
						}).
						error(function() {
							// do something...
						});
					}, 300);
				} else {
					$scope.usernameCSSTip = {
						tip_success: false,
						tip_error: true
					};
					$scope.usernameTip = "请输入中文或者字母！";
				}
			}
		});


		$scope.$watch(function() {
			return $scope.user.phone;
		}, function(value) {
			if(value) {
				if(validate.isPhone(value)) {
					
					if($scope.timeout) {
						$timeout.cancel($scope.timeout);
					}
					$scope.timeout = $timeout(function() {
						$http.get("test/test.json", {}).
						success(function(data, status, headers, config) {
							// alert(data.name);
							
							if(true) {
								$scope.phoneCSSTip = {
									tip_success: true,
									tip_error: false
								};
								$scope.phoneTip = "恭喜！号码可用！";
							} else {
								$scope.phoneCSSTip = {
									tip_success: false,
									tip_error: true
								};
								$scope.phoneTip = "号码已注册！";
							}
						}).
						error(function() {
							// do something...
						});
					}, 300);
				} else {
					// do something....
					$scope.phoneCSSTip = {
						tip_success: false,
						tip_error: true
					};
					$scope.phoneTip = "号码格式不正确！";
				}
			}
		});


		$scope.usernameCSSTip = {
			tip_success: false,
			tip_error: false
		};
		$scope.usernameTip = "";
		$scope.phoneCSSTip = {
			tip_success: false,
			tip_error: false
		};
		$scope.phoneTip = "";
		$scope.modalAlert = function(info) {
			$scope.alertInfo = info;
			$scope.alertState = true;
			$timeout(function() {
				$scope.alertState = false;
			}, 1200);
		};
		$scope.next_step = function() {
			if($scope.phoneCSSTip.tip_error || $scope.usernameCSSTip.tip_error || $scope.user.password.trim() == "" ||
				$scope.user.rePassword.trim() == "" || $scope.user.relName.trim() =="" ||
					$scope.user.username.trim() == "" || $scope.user.phone.toString().trim() == "") {
				$scope.modalAlert("请完善必填信息！");
			} else if(!$scope.success) {
				$scope.modalAlert("请同意服务协议！");
			} else if($scope.user.rePassword !== $scope.user.Password) {
				$scope.modalAlert("两次密码输入不一致！");
			} else {
				alert("success");
			}
		};
		$scope.register = function() {

		};
		$scope.commitInfo = function() {

		};
	}]).
	controller("orderCtrl", ["$scope", "globalData", function($scope, globalData) {
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
		globalData.navState.main = false;
		globalData.navState.serve = true;
		globalData.navState.user = false;
	}]);

