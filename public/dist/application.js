'use strict';

// Init the application configuration module for AngularJS application
var ApplicationConfiguration = (function() {
	// Init module configuration options
	var applicationModuleName = 'norisk';
	var applicationModuleVendorDependencies = ['ngResource', 'ngCookies',  'ngAnimate',  'ngTouch',  'ngSanitize',  'ui.router', 'ui.bootstrap', 'ui.utils'];

	// Add a new vertical module
	var registerModule = function(moduleName, dependencies) {
		// Create angular module
		angular.module(moduleName, dependencies || []);

		// Add the module to the AngularJS configuration file
		angular.module(applicationModuleName).requires.push(moduleName);
	};

	return {
		applicationModuleName: applicationModuleName,
		applicationModuleVendorDependencies: applicationModuleVendorDependencies,
		registerModule: registerModule
	};
})();
'use strict';

//Start by defining the main module and adding the module dependencies
angular.module(ApplicationConfiguration.applicationModuleName, ApplicationConfiguration.applicationModuleVendorDependencies);

// Setting HTML5 Location Mode
angular.module(ApplicationConfiguration.applicationModuleName).config(['$locationProvider',
	function($locationProvider) {
		$locationProvider.hashPrefix('!');
	}
]);

//Then define the init function for starting up the application
angular.element(document).ready(function() {
	//Fixing facebook bug with redirect
	if (window.location.hash === '#_=_') window.location.hash = '#!';

	//Then init the app
	angular.bootstrap(document, [ApplicationConfiguration.applicationModuleName]);
});
'use strict';

// Use application configuration module to register a new module
ApplicationConfiguration.registerModule('categorias');

'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('core');
'use strict';

// Use application configuration module to register a new module
ApplicationConfiguration.registerModule('empresas');

'use strict';

// Use application configuration module to register a new module
ApplicationConfiguration.registerModule('productos');

'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('users');
'use strict';

// Configuring the Articles module
angular.module('categorias').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Categorias', 'categorias', 'dropdown', '/categorias(/create)?');
		Menus.addSubMenuItem('topbar', 'categorias', 'Categorias', 'categorias');
		Menus.addSubMenuItem('topbar', 'categorias', 'Nueva Categoria', 'categorias/create');
	}
]);
'use strict';

//Setting up route
angular.module('categorias').config(['$stateProvider',
	function($stateProvider) {
		// Categories state routing
		$stateProvider.
		state('categorias', {
			url: '/categorias',
			templateUrl: 'modules/categorias/views/categorias.client.view.html'
		}).
		state('create-categoria', {
			url: '/categorias/create',
			templateUrl: 'modules/categorias/views/create-categoria.client.view.html'
		}).
		state('view-categoria', {
			url: '/categorias/:categoriaId',
			templateUrl: 'modules/categorias/views/view-categoria.client.view.html',
		}).
		state('edit-categoria', {
			url: '/categorias/:categoriaId/edit',
			templateUrl: 'modules/categorias/views/edit-categoria.client.view.html'
		});
	}
]);
'use strict';

// Categorias controller
angular.module('categorias').controller('CategoriasController', ['$scope', '$stateParams', '$location', 'Authentication', 'Categorias','Productos',
'$filter',
	function($scope, $stateParams, $location, Authentication, Categorias, Productos, $filter) {
		$scope.authentication = Authentication;
		$scope.productos = Productos.query();
	  	$scope.currentPage = 1;
	  	$scope.pageSize = 10;
	  	$scope.offset = 0;
	  	$scope.mostrar = false;
	  	$scope.image='';

	  	// Page changed handler
	  	$scope.pageChanged = function() {
	   	$scope.offset = ($scope.currentPage - 1) * $scope.pageSize;
	  	};

		// Create new Category
		$scope.create = function() {
			// Create new Category object
			var categoria = new Categorias ({
				categoria: this.categoria,
				nombre: this.nombre,
				descripcion: this.descripcion
			});

			/*if ($scope.image) {
       			$scope.upload($scope.image);
      		}*/

			// Redirect after save
			categoria.$save(function(response) {
				$location.path('categorias/' + response._id);

				// Clear form fields
				$scope.nombre = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		/*$scope.upload = function(image){
			Upload.upload({
            url: 'public/images',
            data: {file: image}
		        }).then(function (resp) {
		            console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
		        }, function (resp) {
		            console.log('Error status: ' + resp.status);
		        }, function (evt) {
		            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
		            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
		        });
		};*/

		// Remove existing Category
		$scope.remove = function(categoria) {
			if ( categoria ) { 
				categoria.$remove();

				for (var i in $scope.categorias) {
					if ($scope.categorias [i] === categoria) {
						$scope.categorias.splice(i, 1);
					}
				}
			} else {
				$scope.categoria.$remove(function() {
					$location.path('categorias');
				});
			}
		};

		// Update existing Category
		$scope.update = function() {
			var categoria = $scope.categoria;

			categoria.$update(function() {
				$location.path('categorias/' + categoria._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Categorias
		$scope.find = function() {
			$scope.categorias = Categorias.query();
		};

		// Find existing Category
		$scope.findOne = function() {
			$scope.categoria = Categorias.get({ 
				categoriaId: $stateParams.categoriaId
			});
		};

		// Search for a categoria
		$scope.categoriaSearch = function(producto) {
			$location.path('categorias/' + producto._id);
		};

		//Listado de productos
		$scope.listarProductos = function(categoria){
			$location.path('/categorias/' + categoria._id);
		};

		$scope.mostrar = function(){
			$scope.mostrar = !$scope.mostrar;
		};
	}
]);
'use strict';

angular.module('categorias').directive('carta',function(){
	return{
		restrict: 'E',
		templateUrl: 'modules/categorias/directives/carta.html'
	};
});
'use strict';

//Categorias service used to communicate Categorias REST endpoints
angular.module('categorias').factory('Categorias', ['$resource',
	function($resource) {
		return $resource('categorias/:categoriaId', { categoriaId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);

'use strict';

// Setting up route
angular.module('core').config(['$stateProvider', '$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
		// Redirect to home view when route not found
		$urlRouterProvider.otherwise('/');

		// Home state routing
		$stateProvider.
		state('home', {
			url: '/',
			templateUrl: 'modules/core/views/home.client.view.html'
		}).
		state('presupuesto',{
			url: '/presupuesto',
			templateUrl: 'modules/productos/views/productos.pedido.client.view.html'
		});
	}
]);
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
'use strict';


angular.module('core').controller('HomeController', ['$scope', 'Authentication',
	function($scope, Authentication) {
		// This provides Authentication context.
		$scope.authentication = Authentication;
	}
]);
'use strict';

//Menu service used for managing  menus
angular.module('core').service('Menus', [

	function() {
		// Define a set of default roles
		this.defaultRoles = ['*'];

		// Define the menus object
		this.menus = {};

		// A private function for rendering decision 
		var shouldRender = function(user) {
			if (user) {
				if (!!~this.roles.indexOf('*')) {
					return true;
				} else {
					for (var userRoleIndex in user.roles) {
						for (var roleIndex in this.roles) {
							if (this.roles[roleIndex] === user.roles[userRoleIndex]) {
								return true;
							}
						}
					}
				}
			} else {
				return this.isPublic;
			}

			return false;
		};

		// Validate menu existance
		this.validateMenuExistance = function(menuId) {
			if (menuId && menuId.length) {
				if (this.menus[menuId]) {
					return true;
				} else {
					throw new Error('Menu does not exists');
				}
			} else {
				throw new Error('MenuId was not provided');
			}

			return false;
		};

		// Get the menu object by menu id
		this.getMenu = function(menuId) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Return the menu object
			return this.menus[menuId];
		};

		// Add new menu object by menu id
		this.addMenu = function(menuId, isPublic, roles) {
			// Create the new menu
			this.menus[menuId] = {
				isPublic: isPublic || false,
				roles: roles || this.defaultRoles,
				items: [],
				shouldRender: shouldRender
			};

			// Return the menu object
			return this.menus[menuId];
		};

		// Remove existing menu object by menu id
		this.removeMenu = function(menuId) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Return the menu object
			delete this.menus[menuId];
		};

		// Add menu item object
		this.addMenuItem = function(menuId, menuItemTitle, menuItemURL, menuItemType, menuItemUIRoute, isPublic, roles, position) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Push new menu item
			this.menus[menuId].items.push({
				title: menuItemTitle,
				link: menuItemURL,
				menuItemType: menuItemType || 'item',
				menuItemClass: menuItemType,
				uiRoute: menuItemUIRoute || ('/' + menuItemURL),
				isPublic: ((isPublic === null || typeof isPublic === 'undefined') ? this.menus[menuId].isPublic : isPublic),
				roles: ((roles === null || typeof roles === 'undefined') ? this.menus[menuId].roles : roles),
				position: position || 0,
				items: [],
				shouldRender: shouldRender
			});

			// Return the menu object
			return this.menus[menuId];
		};

		// Add submenu item object
		this.addSubMenuItem = function(menuId, rootMenuItemURL, menuItemTitle, menuItemURL, menuItemUIRoute, isPublic, roles, position) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Search for menu item
			for (var itemIndex in this.menus[menuId].items) {
				if (this.menus[menuId].items[itemIndex].link === rootMenuItemURL) {
					// Push new submenu item
					this.menus[menuId].items[itemIndex].items.push({
						title: menuItemTitle,
						link: menuItemURL,
						uiRoute: menuItemUIRoute || ('/' + menuItemURL),
						isPublic: ((isPublic === null || typeof isPublic === 'undefined') ? this.menus[menuId].items[itemIndex].isPublic : isPublic),
						roles: ((roles === null || typeof roles === 'undefined') ? this.menus[menuId].items[itemIndex].roles : roles),
						position: position || 0,
						shouldRender: shouldRender
					});
				}
			}

			// Return the menu object
			return this.menus[menuId];
		};

		// Remove existing menu object by menu id
		this.removeMenuItem = function(menuId, menuItemURL) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Search for menu item to remove
			for (var itemIndex in this.menus[menuId].items) {
				if (this.menus[menuId].items[itemIndex].link === menuItemURL) {
					this.menus[menuId].items.splice(itemIndex, 1);
				}
			}

			// Return the menu object
			return this.menus[menuId];
		};

		// Remove existing menu object by menu id
		this.removeSubMenuItem = function(menuId, submenuItemURL) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Search for menu item to remove
			for (var itemIndex in this.menus[menuId].items) {
				for (var subitemIndex in this.menus[menuId].items[itemIndex].items) {
					if (this.menus[menuId].items[itemIndex].items[subitemIndex].link === submenuItemURL) {
						this.menus[menuId].items[itemIndex].items.splice(subitemIndex, 1);
					}
				}
			}

			// Return the menu object
			return this.menus[menuId];
		};

		//Adding the topbar menu
		this.addMenu('topbar');
	}
]);
'use strict';

// Empresas module config
angular.module('empresas').run(['Menus',
	function(Menus) {
		// Config logic
		// ...
	}
]);
'use strict';

//Setting up route
angular.module('empresas').config(['$stateProvider',
	function($stateProvider) {
		// Empresas state routing
		$stateProvider.
		state('create-empresa', {
			url: '/empresascreate',
			templateUrl: 'modules/empresas/views/create-empresa.client.view.html'
		}).
		state('empresas', {
			url: '/empresas',
			templateUrl: 'modules/empresas/views/empresas.client.view.html'
		});
	}
]);
'use strict';

angular.module('empresas').controller('EmpresasController', ['$scope',
	function($scope) {
		// Controller Logic
		// ...
	}
]);
'use strict';

angular.module('empresas').factory('Empresas', [
	function() {
		// Empresas service logic
		// ...

		// Public API
		return {
			someMethod: function() {
				return true;
			}
		};
	}
]);
'use strict';

// Configuring the Articles module
angular.module('productos').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Productos', 'productos', 'dropdown', '/productos(/create)?');
		Menus.addSubMenuItem('topbar', 'productos', 'Lista de Productos', 'productos');
		Menus.addSubMenuItem('topbar', 'productos', 'Nuevo Producto', 'productos/create');
	}
]);
'use strict';

//Setting up route
angular.module('productos').config(['$stateProvider',
	function($stateProvider) {
		// Products state routing
		$stateProvider.
		state('productos', {
			url: '/productos',
			templateUrl: 'modules/productos/views/productos.client.view.html'
		}).
		state('create-producto', {
			url: '/productos/create',
			templateUrl: 'modules/productos/views/create-producto.client.view.html'
		}).
		state('view-producto', {
			url: '/productos/:productoId',
			templateUrl: 'modules/productos/views/view-producto.client.view.html'
		}).
		state('edit-producto', {
			url: '/productos/:productoId/edit',
			templateUrl: 'modules/productos/views/edit-producto.client.view.html'
		});
	}
]);
'use strict';

// Productos controller
angular.module('productos').controller('ProductosController', ['$scope', '$stateParams', '$location', 'Authentication', 'Productos', 'Categorias', '$filter',
	function($scope, $stateParams, $location, Authentication, Productos, Categorias, $filter) {
		$scope.authentication = Authentication;
		$scope.categorias = Categorias.query();
		$scope.currentPage = 1;
		$scope.pageSize = 10;
		$scope.offset = 0;
		
		// Page changed handler
		$scope.pageChanged = function() {
			$scope.offset = ($scope.currentPage - 1) * $scope.pageSize;
		};

		// Create new Product
		$scope.create = function() {
			var producto = new Productos ({
				nombre: this.nombre,
				categoria: this.categoria,
				codigo: this.codigo,
				descripcion: this.descripcion,
				reflectivos: this.reflectivos,
				altura: this.altura,
				base: this.base,
				peso: this.peso,
				colores: this.colores,
				foto: this.foto
			});

			// Redirect after save
			producto.$save(function(response) {
				$location.path('productos/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Product
		$scope.remove = function(producto) {
			if ( producto ) {
				producto.$remove();

				for (var i in $scope.productos) {
					if ($scope.productos [i] === producto) {
						$scope.productos.splice(i, 1);
					}
				}
			} else {
				$scope.producto.$remove(function() {
					$location.path('productos');
				});
			}
		};

		// Update existing Product
		$scope.update = function() {
			var producto = $scope.producto;
			producto.categoria = producto.categoria._id;

			producto.$update(function() {
				$location.path('productos/' + producto._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		var appendCategory = function appendCategory(p) {
			// You could substitue use of filter here with underscore etc.
			p.categoria = $filter('filter')($scope.categorias, {_id: p.categoria})[0];
		};

		// Find a list of Productos
		$scope.find = function() {
			Productos.query(function loadedProductos(productos) {
				productos.forEach(appendCategory);
				$scope.productos = productos;
			});
		};

		// Find existing Product
		$scope.findOne = function() {
			$scope.producto = Productos.get({
				productoId: $stateParams.productoId
			}, appendCategory);
		};

		// Search for a producto
		$scope.productoSearch = function(producto) {
			$location.path('productos/' + producto._id);
		};
	}
]);
'use strict';

angular.module('productos').controller('PedidoController', ['PedidoService', '$scope', '$http',
	function(PedidoService,$scope,$http){
		$scope.Pedidos = PedidoService.pedido;

		$scope.agregarPedido = function(nombre,cantidad){
			if(PedidoService.existeProducto(nombre)){
				PedidoService.eliminarProducto(nombre);
				PedidoService.agregarProducto(nombre,cantidad);
			} else {
				PedidoService.agregarProducto(nombre,cantidad);
			}
		};

		$scope.editarProducto = function(nombre,cantidad){
			if(cantidad){
	    		PedidoService.editarProducto(nombre,cantidad);
			}
		};

		$scope.eliminarProducto = function(nombre){
			PedidoService.eliminarProducto(nombre);
		};

		$scope.$watch('pedido', function() {
	        PedidoService.pedido = $scope.Pedidos;
	    });

	    //SEND EMAIL
	    this.sendMail = function(){
	    	console.log(this.contactoNombre + this.contactoEmail + this.contactoTelefono);
		    var data = ({
		    	contactoNombre : this.contactoNombre,
		    	contactoEmail : this.contactoEmail,
		    	contactoTelefono : this.contactoTelefono,
		    	pedido : $scope.Pedidos
		    });

		    $http.post('/presupuesto', data)
		    	.success(function(data, status, headers, config){
		    		console.log('Se mando Julian');
		    	})
		    	.error(function(data, status, headers, config){
		    		console.log('No se mando ni mierda');
		    	});
		    };
		}
]);
'use strict';

angular.module('productos').directive('producto',function(){
	return{
		restrict: 'E',
		templateUrl: 'modules/productos/directives/producto.html'
	};
});
'use strict';

angular.module('productos').service('PedidoService', function(){
	var pedido = this;
	this.pedido = [];


	this.agregarProducto = function(nombre, cantidad){
		this.pedido.push({'producto':nombre,'cantidad':cantidad}); 
	};

	this.eliminarProducto = function(producto){
		var index = this.pedido.indexOf(producto);
		this.pedido.splice(index,1);
	};

	this.editarProducto = function(producto,cantidad){
		$.each(this.pedido, function() {
		    if (this.producto === producto) {
		        this.cantidad = cantidad;
		    }
		});
	};

	this.listarProductos = function(){
		return pedido;
	};

	this.existeProducto = function(producto){
		$.each(this.pedido, function() {
			if(this.producto === producto){
				return true;
			}
		});
		return false;
	};
});
'use strict';

//Productos service used to communicate Productos REST endpoints
angular.module('productos').factory('Productos', ['$resource',
	function($resource) {
		return $resource('productos/:productoId', { productoId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);

'use strict';

// Config HTTP Error Handling
angular.module('users').config(['$httpProvider',
	function($httpProvider) {
		// Set the httpProvider "not authorized" interceptor
		$httpProvider.interceptors.push(['$q', '$location', 'Authentication',
			function($q, $location, Authentication) {
				return {
					responseError: function(rejection) {
						switch (rejection.status) {
							case 401:
								// Deauthenticate the global user
								Authentication.user = null;

								// Redirect to signin page
								$location.path('/');
								break;
							case 403:
								// Add unauthorized behaviour 
								break;
						}

						return $q.reject(rejection);
					}
				};
			}
		]);
	}
]);
'use strict';

// Setting up route
angular.module('users').config(['$stateProvider',
	function($stateProvider) {
		// Users state routing
		$stateProvider.
		state('profile', {
			url: '/settings/profile',
			templateUrl: 'modules/users/views/settings/edit-profile.client.view.html'
		}).
		state('password', {
			url: '/settings/password',
			templateUrl: 'modules/users/views/settings/change-password.client.view.html'
		}).
		state('accounts', {
			url: '/settings/accounts',
			templateUrl: 'modules/users/views/settings/social-accounts.client.view.html'
		}).
		state('signup', {
			url: '/signup',
			templateUrl: 'modules/users/views/authentication/signup.client.view.html'
		}).
		state('signin', {
			url: '/signin',
			templateUrl: 'modules/users/views/authentication/signin.client.view.html'
		}).
		state('forgot', {
			url: '/password/forgot',
			templateUrl: 'modules/users/views/password/forgot-password.client.view.html'
		}).
		state('reset-invalid', {
			url: '/password/reset/invalid',
			templateUrl: 'modules/users/views/password/reset-password-invalid.client.view.html'
		}).
		state('reset-success', {
			url: '/password/reset/success',
			templateUrl: 'modules/users/views/password/reset-password-success.client.view.html'
		}).
		state('reset', {
			url: '/password/reset/:token',
			templateUrl: 'modules/users/views/password/reset-password.client.view.html'
		});
	}
]);
'use strict';

angular.module('users').controller('AuthenticationController', ['$scope', '$http', '$location', 'Authentication',
	function($scope, $http, $location, Authentication) {
		$scope.authentication = Authentication;

		// If user is signed in then redirect back home
		if ($scope.authentication.user) $location.path('/');

		$scope.signup = function() {
			$http.post('/auth/signup', $scope.credentials).success(function(response) {
				// If successful we assign the response to the global user model
				$scope.authentication.user = response;

				// And redirect to the index page
				$location.path('/');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};

		$scope.signin = function() {
			$http.post('/auth/signin', $scope.credentials).success(function(response) {
				// If successful we assign the response to the global user model
				$scope.authentication.user = response;

				// And redirect to the index page
				$location.path('/');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}
]);
'use strict';

angular.module('users').controller('PasswordController', ['$scope', '$stateParams', '$http', '$location', 'Authentication',
	function($scope, $stateParams, $http, $location, Authentication) {
		$scope.authentication = Authentication;

		//If user is signed in then redirect back home
		if ($scope.authentication.user) $location.path('/');

		// Submit forgotten password account id
		$scope.askForPasswordReset = function() {
			$scope.success = $scope.error = null;

			$http.post('/auth/forgot', $scope.credentials).success(function(response) {
				// Show user success message and clear form
				$scope.credentials = null;
				$scope.success = response.message;

			}).error(function(response) {
				// Show user error message and clear form
				$scope.credentials = null;
				$scope.error = response.message;
			});
		};

		// Change user password
		$scope.resetUserPassword = function() {
			$scope.success = $scope.error = null;

			$http.post('/auth/reset/' + $stateParams.token, $scope.passwordDetails).success(function(response) {
				// If successful show success message and clear form
				$scope.passwordDetails = null;

				// Attach user profile
				Authentication.user = response;

				// And redirect to the index page
				$location.path('/password/reset/success');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}
]);
'use strict';

angular.module('users').controller('SettingsController', ['$scope', '$http', '$location', 'Users', 'Authentication',
	function($scope, $http, $location, Users, Authentication) {
		$scope.user = Authentication.user;

		// If user is not signed in then redirect back home
		if (!$scope.user) $location.path('/');

		// Check if there are additional accounts 
		$scope.hasConnectedAdditionalSocialAccounts = function(provider) {
			for (var i in $scope.user.additionalProvidersData) {
				return true;
			}

			return false;
		};

		// Check if provider is already in use with current user
		$scope.isConnectedSocialAccount = function(provider) {
			return $scope.user.provider === provider || ($scope.user.additionalProvidersData && $scope.user.additionalProvidersData[provider]);
		};

		// Remove a user social account
		$scope.removeUserSocialAccount = function(provider) {
			$scope.success = $scope.error = null;

			$http.delete('/users/accounts', {
				params: {
					provider: provider
				}
			}).success(function(response) {
				// If successful show success message and clear form
				$scope.success = true;
				$scope.user = Authentication.user = response;
			}).error(function(response) {
				$scope.error = response.message;
			});
		};

		// Update a user profile
		$scope.updateUserProfile = function(isValid) {
			if (isValid) {
				$scope.success = $scope.error = null;
				var user = new Users($scope.user);

				user.$update(function(response) {
					$scope.success = true;
					Authentication.user = response;
				}, function(response) {
					$scope.error = response.data.message;
				});
			} else {
				$scope.submitted = true;
			}
		};

		// Change user password
		$scope.changeUserPassword = function() {
			$scope.success = $scope.error = null;

			$http.post('/users/password', $scope.passwordDetails).success(function(response) {
				// If successful show success message and clear form
				$scope.success = true;
				$scope.passwordDetails = null;
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}
]);
'use strict';

// Authentication service for user variables
angular.module('users').factory('Authentication', [
	function() {
		var _this = this;

		_this._data = {
			user: window.user
		};

		return _this._data;
	}
]);
'use strict';

// Users service used for communicating with the users REST endpoint
angular.module('users').factory('Users', ['$resource',
	function($resource) {
		return $resource('users', {}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);