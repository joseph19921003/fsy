angular.module("commonModule").
	directive("modal", function() {
		return {
			restrict: "E",
			templateUrl: "common/directives/modal.html",
			replace: true,
			transclude: true,
			scope: true,
			link: function(scope, element, attrs) {
		        scope.title = attrs.title;
		        alert(scope.title);

		        scope.$watch(attrs.visible, function(value){
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
		    }
		};
	});