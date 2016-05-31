angular.module("userModule", []).
	controller("userCtrl", ["$scope", "$http", "$timeout", "globalData", function($scope, $http, $timeout, globalData) {
		$scope.title = "用户登入";

		$scope.showModal = false;

		$scope.login_modal = function() {
			$scope.showModal = !$scope.showModal;
		};
		$scope.initGlobalData = function(obj) {
			for(var prop in obj) {
				if(obj.hasOwnProperty(prop)) {
					obj[prop] = "";
				}
			}
		};
		$scope.username = "";
		$scope.password = "";
		
		// 用户状态，0为未登入, 在commonServer中初始化
		$scope.userState = globalData.user.userState;
		$scope.loginTip = "";
		$scope.loginCSSTip = {
			tip_success: false,
			tip_error: false
		};
		$scope.to_login = function() {
			// 发起请求
			/*var xhr = new XMLHttpRequest();
			xhr.onreadystatechange = function() {
				if(xhr.readyState == "4" && xhr.status == "200") {
					console.log(xhr.responseText);
				}
			};
			xhr.open("POST", "/fsy/login/userLoginForMobile.hs");
			xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
			xhr.send("username="+encodeURIComponent("吴亮")+"&"+"password=123");
			*/
			
			console.log($scope.username, $scope.password);
			$http.post("/fsy/login/userLoginForMobile.hs", 
				{username: $scope.username, password: $scope.password, Authority: "2"}, 
					{transformRequest: function(request) {
						return $.param(request);
					},
					headers: {"Content-Type": "application/x-www-form-urlencoded"}}).
				success(function(data) {
					console.log(data);
					if(data.userId !== "") {
						globalData.user.userState = $scope.userState = 1;
						globalData.user.waterPrice = data.waterPrice.slice(0, data.waterPrice.length - 1);
						globalData.user.machinePrice = data.machinePrice.slice(0, data.machinePrice.length - 1);
						$scope.loginTip = "恭喜！登入成功！";
						$scope.loginCSSTip = {
							tip_success: true,
							tip_error: false
						};
						// 保存用户id
						globalData.user.userId = data.userId;
						
						$timeout(function() {
							$scope.showModal = !$scope.showModal;
							$scope.loginTip = "";
							$scope.loginCSSTip = {
								tip_success: false,
								tip_error: false
							};
							$scope.userState = 1;
								
							
						}, 500);
					} else {
						$scope.loginTip = "您输入的用户名或密码不正确！";
						$scope.loginCSSTip = {
							tip_success: false,
							tip_error: true
						};
					}
				}).
				error(function(data) {
					console.log("error");
				});
		};

		$scope.to_logout = function() {
			$http.get("/fsy/login/checkOutNoPage.hs").
				success(function(data) {
					if(data.status == "1") {
						$scope.initGlobalData(globalData.user);
						globalData.user.userState = $scope.userState = 0;
						console.log(globalData.user);
						// 清空所有的用户信息包括本地存储
					} else if(data.status == "0") {
						console.log("登出失败！请重试");
					}
				}).
				error(function() {
					console.log("登出失败！请重试");
				});
			
			
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
			deliverNumFirst: "2",
			waterPrice: 0.001,
			machinePrice: 0.01
		};
		$scope.paddingData = function() {
			for(prop in user) {
				globalData.user[prop] = user[prop];
			}
		};

		$scope.step = 1;

		$scope.alertState = false;
		$scope.alertInfo = "";
		$scope.timeout = null;
		// $scope.$watch("user.username" || fn, function(newValue, oldValue, scope) {}, bool);
		$scope.$watch(function() {
			return $scope.user.username;
		}, function(value) {
			if(value) {
				if(validate.isWord((value || "").trim())) {
					if($scope.timeout) {
						$timeout.cancel($scope.timeout);
					}
					$scope.timeout = $timeout(function() {
						$http.post("/fsy/user/checkUsername.hs", {username: value}, {
							transformRequest: function(request) {
								return $.param(request);
							},
							headers: {"Content-Type": "application/x-www-form-urlencoded"}}).
						success(function(data, status, headers, config) {
							if(data.resInfo === "success") {
								$scope.usernameCSSTip = {
									tip_success: true,
									tip_error: false
								};
								$scope.usernameTip = "恭喜！用户名可用！";
							} else if(data.resInfo === "fail") {
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
					}, 600);
				} else {
					$scope.usernameCSSTip = {
						tip_success: false,
						tip_error: true
					};
					$scope.usernameTip = "请输入中文或者字母！";
				}
			} else {
				$scope.usernameCSSTip = {
					tip_success: false,
					tip_error: false
				};
				$scope.usernameTip = "";
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
						$http.post("/fsy/user/checkPhoneWhenAddUser.hs", {phone: value}, {
							transformRequest: function(request) {
								return $.param(request);
							},
							headers: {"Content-Type": "application/x-www-form-urlencoded"}}).
						success(function(data, status, headers, config) {
							// alert(data.name);
							
							if(data.resInfo === "success") {
								$scope.phoneCSSTip = {
									tip_success: true,
									tip_error: false
								};
								$scope.phoneTip = "恭喜！号码可用！";
							} else if(data.resInfo === "fail") {
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
					}, 400);
				} else {
					// do something....
					$scope.phoneCSSTip = {
						tip_success: false,
						tip_error: true
					};
					$scope.phoneTip = "号码格式不正确！";
				}
			} else {
				$scope.phoneCSSTip = {
					tip_success: false,
					tip_error: false
				};
				$scope.phoneTip = "";
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
			} else if($scope.user.rePassword !== $scope.user.password) {
				$scope.modalAlert("两次密码输入不一致！");
			} else {
				$scope.user.linkPhone = $scope.user.phone;
				$scope.user.linkRelName = $scope.user.relName;
				$scope.step = 2;
			}
		};
		$scope.register = function() {
			if($scope.user.area.trim() == "" || $scope.user.addrDetail == "" ||
				$scope.user.linkPhone == "" || $scope.user.linkRelName == "") {
				$scope.modalAlert("请完善必填信息！");
			} else {
				$scope.step = 3;
				console.dir($scope.user);
			}
		};
		
		$scope.colorMap = {
				"白": 2001,
			  	"红": 2002,
			  	"黑": 2003,
			  	"金": 2004
		};
		$scope.commitInfo = function() {
			// do something...
			$scope.modalAlert("业务未开通");
			var postData = {
				"username":$scope.user.username,
				"password":$scope.user.password,
				"relName":$scope.user.relName,
				"phone":$scope.user.phone,
				"linkRelName":$scope.user.linkRelName,
				"linkPhone":$scope.user.linkPhone,
				"addr1":"-"+$scope.user.addr3,
				"addr2":$scope.user.addrDetail,
				"orderNum":$scope.user.orderNum,
				"orderNumFirst":$scope.user.orderNumFirst,
				"machineColor":$scope.user.machineColor,
				"isRegister":"0",
				"registerType":"1"
			}/*,
		    	payData = {"userId":"","num":orderNum,"money":(waterPrice*$scope.user.orderNum+machinePrice*1),"openId":openId};
		
			$http.get("http://tuo.cjoy.cn/fsy/topayServlet",{params: payData}).
				success(function(data) {
					var appid2=data.appId,
						timestamp=data.timeStamp,
						nonceStr2=data.nonceStr,
						packages=data.mypackage,
						finalsign=data.sign;
					callpay(appid2,timestamp,nonceStr2,packages,finalsign,postData);
				}).
				error(function() {
					// do something...
				});*/
		
			// 发起支付请求
			function callpay(appId,timeStamp,nonceStr,packageValue,paySign,postData){
				WeixinJSBridge.invoke('getBrandWCPayRequest',{
					"appId" : appId,
					"timeStamp" : timeStamp, 
					"nonceStr" : nonceStr, 
					"package" : packageValue,
					"signType" : "MD5", 
					"paySign" : paySign 
	  			},function(res){
					WeixinJSBridge.log(res.err_msg);
					//alert(res.err_code + res.err_desc + res.err_msg);
		            if(res.err_msg == "get_brand_wcpay_request:ok"){  
		                alert('微信支付成功!');  
		                /*
		               		 保存用户注册信息
		                */
		                $.post("/fsy/user/save.hs",postData,function(data){
							showModal(data);
						});
		            }else if(res.err_msg == "get_brand_wcpay_request:cancel"){  
		                alert("用户取消支付!");  
		            }else{  
		                alert("支付失败!");  
		            }  
				})
			}
		
		};
	}]).
	controller("orderCtrl", ["$scope", "globalData", function($scope, globalData) {
		$scope.deliverObj = {
			url: "/fsy/bill/detailBillListNew.hs",
			nowPage: 1,
			list: []
		};
		$scope.orderObj = {
			url: "/fsy/order/detailList.hs",
			nowPage: 1,
			list: []
		};
		
		$scope.order = false;
		$scope.all = false;
		$scope.deliver = true;
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

		$scope.order_info = function(index) {
			$scope.showModal = !$scope.showModal;
			$scope.index = index;
		};
		globalData.navState.main = false;
		globalData.navState.serve = true;
		globalData.navState.user = false;
	}]);

