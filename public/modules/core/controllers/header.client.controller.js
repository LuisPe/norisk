'use strict';

angular.module('core').controller('HeaderController', ['$scope', 'Authentication', 'Menus',
	function($scope, Authentication, Menus) {
		$scope.authentication = Authentication;
		$scope.isCollapsed = false;
		$scope.menu = Menus.getMenu('topbar');
	    var trigger = $('.icono'),
	         overlay = $('.overlay'),
	         isClosed = false;

		$scope.toggleCollapsibleMenu = function() {
			$scope.isCollapsed = !$scope.isCollapsed;
		};

		// Collapsing the menu after navigation
		$scope.$on('$stateChangeSuccess', function() {
			$scope.isCollapsed = false;
		});

	        
        function icono_cross() {

          if (isClosed === true) {          
            overlay.hide();
            trigger.removeClass('is-open');
            trigger.addClass('is-closed');
            isClosed = false;
          } else {   
            overlay.show();
            trigger.removeClass('is-closed');
            trigger.addClass('is-open');	
            isClosed = true;
          }
      	}
	      
		$('[data-toggle="offcanvas"]').click(function () {
		    $('#wrapper').toggleClass('toggled');
		    icono_cross();
		});
	}
]);