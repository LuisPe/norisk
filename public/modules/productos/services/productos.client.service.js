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
/* Upload file, no funciona
.service('fileUpload', ['$http', function ($http) {
    this.uploadFileToUrl = function(file){
        var fd = new FormData();
        fd.append('file', file);
		
		$http({
    	    	method:'POST',
    	    	url:'/imagen',
    	    	data: fd,
	            transformRequest: angular.identity,
	            headers: {'Content-Type': undefined}
       })
    
       .success(function(){
       		console.log('imagen subida');
       })
    
       .error(function(){
       		console.log('error al subir imagen');
       });
    }
 }]);
*/