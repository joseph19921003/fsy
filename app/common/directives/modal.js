angular.module("commonModule").
	directive("modal", function() {
		return {
			restrict: "EA",
			templateUrl: "common/directives/modal.html",
			replace: true,
			transclude: true,
			scope: {
				visible: "=",
				password: "=",
				username: "="
			},
			link: function(scope, element, attrs) {
		        scope.title = attrs.title;
		        scope.$watch("visible", function(value){
		          if(value == true)
		            $(element).modal('show');
		          else
		            $(element).modal('hide');
		        });
		        $(element).on('shown.bs.modal', function(){
		         	scope.$apply(function(){
		            	scope.$parent[attrs.visible] = true;
		          	});
		        });

		        $(element).on('hidden.bs.modal', function(){
		          	scope.$apply(function(){
		            	scope.$parent[attrs.visible] = false;
		          	});
		        });
		        scope.warning = attrs.warning;
		    }
		};
	});