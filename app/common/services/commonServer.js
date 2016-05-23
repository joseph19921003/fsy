angular.module("commonModule").
	service("globalData", ["$rootScope", function() {
		var data = {
			user: {
				username: "",
				userId: "",
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
	filter("dataFormat", function() {
		return function(input) {
			input = Number(input);
			var date = new Date(input),
				Y = date.getFullYear + "-",
				M = (date.getMonth() < 9 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1) + "-",
				D = date.getDate() + " ",
				h = (date.getHours() < 9 ?  "0" + date.getHours() : date.getHours()) + ":",
				m = (date.getMinutes() < 9 ?  "0" + date.getMinutes() : date.getMinutes()) + ":",
				s = date.getSeconds() < 9 ?  "0" + date.getSeconds() : date.getSeconds();
			return Y + M + D + h + m + s;
		};
	});