angular.module("commonModule").
	service("globalData", ["$rootScope", function() {
		var data = {
			user: {
				username: "",
				userId: "",
				openId: "",
				userState: 0,
				password: "",
				rePassword: "",
				relName: "",
				phone: "",
				city: "",
				area: "",
				addrDetail: "",
				linkRelName: "",
				linkPhone: "",
				orderNum: "",
				deliverNumFirst: "",
				machineColor: "",
				waterPrice: "",
				machinePrice: ""
			},
			navState: {
				main: true,
				serve: false,
				user: false
			},
			authority: {
				arr: ["/serve/orderWater", "/user/order", "/user/after_sale", "/serve/deliverWater"],
				hasAuthority: function(str) {
					for(var i = 0; i < this.arr.length; i++) {
						if(this.arr[i] === str) {
							return true;
						}
					}
					return false;
				}
			}
		};
		return data;
	}]).
	service("validate", ["$rootScope", "$http", "globalData", function($rootScope, $http, globalData) {
		var validate = {
			isPhone: function(phone) {
				return reg_phone.test(phone);
			},
			isWord: function(word) {
				return reg_word.test(word);
			},
			isPassword: function(password) {

			}
		}
		var reg_word = /^[\u004e-\u9fa0a-zA-Z]+$/,
			reg_phone = /(^(13\d|15[^4,\D]|17[13678]|18\d)\d{8}|170[^346,\D]\d{7})$/,
			reg_password = /^[a-zA-Z]\w{5,17}$/;

		// $rootScope.isPhoneNumber = function() {};
		// $rootScope.isPhoneNumber = function() {};
		// $rootScope.isPhoneNumber = function() {};
		// $rootScope.isPhoneNumber = function() {};
		return validate;
	}]).
	filter("dateFormat", function() {
		return function(input) {
			input = Number(input);
			var date = new Date(input),
				Y = date.getFullYear() + "-",
				M = (date.getMonth() < 9 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1) + "-",
				D = (date.getDate() < 10 ? "0" + date.getDate() : date.getDate() + 1) + "  ",
				h = (date.getHours() < 10 ?  "0" + date.getHours() : date.getHours()) + ":",
				m = (date.getMinutes() < 10 ?  "0" + date.getMinutes() : date.getMinutes()) + ":",
				s = date.getSeconds() < 10 ?  "0" + date.getSeconds() : date.getSeconds();
			return Y + M + D + h + m + s;
		};
	}).// 指令的名字为scrollPage,用的时候为scroll-page
	directive("scrollPage", ["$window", "$timeout", "$http", "globalData", function($window, $timeout, $http, globalData) {
		return {
			controller: "orderCtrl",
			link: function(scope, element, attrs, controller) {
				var pageSize = 15;
				scope.height = document.documentElement.clientHeight;
				scope.updateList = function(obj, isOrder, upOrDown) {
					
				};
				scope.timeout = null;
				scope.getList = function(obj, isOrder) {
					// scope.scrollTop = 0;
					// scope.scrollHeight = 0;
					if(globalData.user.userState) {
						$http.get(obj.url, {params: {userId: globalData.user.userId, page: obj.nowPage}}).
						success(function(data) {
							console.log(data);
							if(isOrder) {
								if(data.dataList.length) {
									
									obj.list = obj.list.concat(data.dataList);
									obj.nowPage += 1; 
								} else {
									// do something...
								}
							} else {
								if(data.length) {
									obj.list = obj.list.concat(data);
									obj.nowPage += 1;
								} else {
									// do something...
								}
							}
						}).
						error(function() {
							// do something...
						});
					}
				};
				scope.getList(scope.deliverObj);
				scope.getList(scope.orderObj, true);
				$window.onscroll = function(event) {
					var top = $(document).scrollTop(),
						scrollHeight = $(document).height();
					if(scope.timeout) {
						$timeout.cancel(scope.timeout)
					}
					
					if(scrollHeight - top - 200 < scope.height) {
						scope.timeout = $timeout(function() {
							scope.getList(scope.deliver ? scope.deliverObj : scope.orderObj, scope.deliver ? false : true);
						}, 100);
					}
				};
			}
		};
	}]).
	directive("watchDire", function() {
		return {
			link: function(scope) {
				scope.$watch("username", function(value) {
					if(value) {
						scope.$parent.username = value;
					}
				}, true);
				scope.$watch("password", function(value) {
					if(value) {
						scope.$parent.password = value;
					}
				});
			}
		};
	});