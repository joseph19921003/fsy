angular.module("serveModule", []).
	controller("orderWaterCtrl", ["$scope", "$http", "$timeout", "globalData", function($scope, $http, $timeout, globalData) {
		globalData.navState.main = false;
		globalData.navState.serve = true;
		globalData.navState.user = false;
		$scope.waterPrice = globalData.user.waterPrice;
		$scope.orderNum = "10";
		$scope.disabled = false;
		$http.get("/fsy/order/remainWater.hs", {params: {userId: globalData.user.userId}}).
			success(function(data) {
				$scope.remainCount = data.remainCount;
			}).
			error(function() {
				// do something ...
				console.log("error");
			});
			
			
		$scope.modalAlert = function(info, fn) {
			$scope.alertInfo = info;
			$scope.alertState = true;
			$timeout(function() {
				$scope.alertState = false;
				if(Object.prototype.toString.call(fn) === "[object Function]") {
					fn();
				}
			}, 1200);
		};
		
		$scope.submit = function() {
			$scope.disabled = true;
			var getData = {"userId":globalData.user.userId,"num":$scope.orderNum,"money":($scope.waterPrice * $scope.orderNum),"openId":globalData.user.openId};
			var postData = null;
			$http.get("http://tuo.cjoy.cn/fsy/topayServlet", {params: getData}).
				success(function(data) {
					var appid2=data.appId;
					var timestamp=data.timeStamp;
					var nonceStr2=data.nonceStr;
					var packages=data.mypackage;
					var finalsign=data.sign;
					$scope.callpay({
						"appId": data.appId,
						"timeStamp": data.timeStamp,
						"nonceStr": data.nonceStr,
						"package": data.mypackage,
						"signType": "MD5",
						"signType": data.sign,
						
					}, function() {
						$http.post("/fsy/order/save.hs", {
							"userId": globalData.user.userId,
							"num": $scope.orderNum
						}, {
							transformRequest: function(request) {
								return $.param(request);
							},
							headers: {"Content-Type": "application/x-www-form-urlencoded"}
						}).
						success(function(data) {
							alert('微信支付成功，订水完成!'); 
							$location.path("/serve/deliverWater");
						}).
						error(function() {
							alert('订水失败!'); 
						});
					});
					$scope.disabled = false;
				}).
				error(function() {
					// do something...
					$scope.disabled = false;
					$scope.modalAlert("订水失败，请重试！");
				});
		};
		
		/*
			//$.post("order/save.hs",postData,function(data){
					//showModal(data);
				//});
			$.get("http://tuo.cjoy.cn/fsy/topayServlet",postData,function(data){
					var appid2=data.appId;
					var timestamp=data.timeStamp;
					var nonceStr2=data.nonceStr;
					var packages=data.mypackage;
					var finalsign=data.sign;
					window.location.href = "http://tuo.cjoy.cn/fsy/pay.jsp?appid="+appid2+"&timeStamp="+timestamp+"&nonceStr="+nonceStr2+"&package="+packages+"&sign="+finalsign+"&userId="+userId+"&num="+orderNum+"&money="+(waterPrice*orderNum);
				});*/
		
		
		
		$scope.callpay = function(payObj, orderObj, fn){
		 WeixinJSBridge.invoke('getBrandWCPayRequest', payObj, function(res){
				WeixinJSBridge.log(res.err_msg);
// 				alert(res.err_code + res.err_desc + res.err_msg);
	            if(res.err_msg == "get_brand_wcpay_request:ok"){  
	    			fn();
	            }else if(res.err_msg == "get_brand_wcpay_request:cancel"){  
	                alert("用户取消支付!");  
	            }else{  
	               alert("支付失败!");  
	            }  
			})
		}
	}]).
	controller("deliverWaterCtrl", ["$scope", "$http", "$location", "$timeout", "globalData", function($scope, $http, $location, $timeout, globalData) {
		
		globalData.navState.main = false;
		globalData.navState.serve = true;
		globalData.navState.user = false;
		//alert(globalData.user.userId);
		
		$scope.deliverNum = 2;
		$scope.label_city = "上海";
		$scope.deliverTime = "请选择";
		$scope.disabled = false;
		$scope.alertState = false;
		$scope.alertInfo = false;
		
		$http.get("/fsy/order/remainWater.hs", {params: {userId: globalData.user.userId}}).
			success(function(data) {
				$scope.remainCount = data.remainCount;
			}).
			error(function() {
				// do something ..
				console.log("error");
			});
		$http.get("/fsy/user/defaultAddr.hs", {params: {userId: globalData.user.userId}}).
			success(function(data) {
				$scope.label_area = data.addr3;
				$scope.addrDetail = data.addrDetail;
				$scope.linkRelName = data.linkRelName;
				$scope.linkPhone = data.linkPhone;
				/*for(var prop in data) {
					if(data.hasOwnProperty(prop)) {
						$scope[prop] = data[prop];
						console.log($scope[prop]);
					}
				}*/
			}).
			error(function() {
				// do something...
				console.log("error");
			});
		
		$scope.modalAlert = function(info, fn) {
			$scope.alertInfo = info;
			$scope.alertState = true;
			$timeout(function() {
				$scope.alertState = false;
				if(Object.prototype.toString.call(fn) === "[object Function]") {
					fn();
				}
			}, 1200);
		};
		
		$scope.deliverSubmit = function() {
			$scope.disabled = true;
			if(!$scope.deliverNum || Number($scope.deliverNum) < 2) {
				$scope.modalAlert("两桶起送，请重新输入送水桶数！");
				$scope.disabled = false;
			} else if(!$scope.label_area.trim() || !$scope.addrDetail.trim() || !$scope.linkRelName || !$scope.linkPhone) {
				$scope.modalAlert("请填写完整信息！");
				$scope.disabled = false;
			} else {
				$http.post("/fsy/bill/save.hs", {
					userId: globalData.user.userId,
					sendNum: $scope.deliverNum,
					linkName: $scope.linkRelName,
					linkPhone: $scope.linkPhone,
					addr: $scope.label_city + "市" + $scope.label_area + "区" + $scope.addrDetail,
					sendDate: $scope.sendDate,
					sendTime: "请选择" === $scope.sendTime ? "" : $scope.sendTime,
				}, {
					transformRequest: function(request) {
						return $.param(request);
					},
					headers: {"Content-Type": "application/x-www-form-urlencoded"}
				}).
				success(function(data) {
					$scope.modalAlert("下单成功！", function() {
						$timeout(function() {
							$location.path("/main");
						}, 350);
					});
				}).
				error(function() {
					$scope.modalAlert("下单失败，请重试！");
					$scope.disabled = false;
				});
			}
			
		};
	}]).
	controller("afterSaleCtrl", ["$scope", "$http", "$timeout", "$location", "globalData", function($scope, $http, $timeout, $location, globalData) {
		globalData.navState.main = false;
		globalData.navState.serve = false;
		globalData.navState.user = true;
		
		
		$scope.modalAlert = function(info, fn) {
			$scope.alertInfo = info;
			$scope.alertState = true;
			$timeout(function() {
				$scope.alertState = false;
				if(Object.prototype.toString.call(fn) === "[object Function]") {
					fn();
				}
			}, 1200);
		};
		$scope.disabled = false;
		$scope.stateObj = {
			pb_1: "饮水机不出水", 
			pb_2: "饮水机漏水", 
			pb_3: "饮水机冷水按键弹不会来"
		};
		$scope.submit = function() {
			console.log($route.current);
			console.log($scope.repair);
			// console.log($scope.repair.pb_1, $scope.repair.pb_2, $scope.repair.pb_3, $scope.repair);
			if($scope.repair) {
				$scope.disabled = true;
				$http.post("/fsy/repair/save.hs", {
					userId: globalData.user.userId,
					status: 0,
					normal: function() {
						var str = "";
						for(var prop in $scope.repair) {
							if($scope.repair.hasOwnProperty(prop)) {
								str += $scope.stateObj[prop];
							}
						}
						return str;
					}(),
					other: $scope.pb_other
				}, {
					transformRequest: function(request) {
						return $.param(request);
					},
					headers: {"Content-Type": "application/x-www-form-urlencoded"}
				}).
				success(function(data) {
					$scope.disabled = false;
					$scope.modalAlert("保修成功！", function() {
						$timeout(function() {
							$location.path("/home");
						}, 350);
					});
				}).
				error(function() {
					$scope.disabled = false;
					$scope.modalAlert("保修失败，请重试！");
				});
			} else {
				$scope.modalAlert("请输入保修问题！");
			}
			
			
			/*var postData = {userId:$("#userId").val(),status:$("#status").val(),normal:$("#normal").val(),other:$("#other").val()};
	    	$.post("repair/save.hs",postData,function(data){
	    		showModal(data);
	    	});*/
		};
	}]);