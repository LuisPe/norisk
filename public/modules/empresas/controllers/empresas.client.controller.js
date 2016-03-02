'use strict';

angular.module('empresas').controller('EmpresasController', ['$scope','$http','$location',
	function($scope,$http,$location) {

    //SEND EMAIL
    $scope.sendMail = function(){
	    var data = ({
	    	contactoNombre : this.contactoNombre,
	    	contactoEmail : this.contactoEmail,
	    	contactoTelefono : this.contactoTelefono,
	    	contactoConsulta : this.contactoConsulta
	    });

	    $http({
	    	method:'POST',
	    	url:'/contacto',
	    	data: data,
	    }).then(function successCallback(response) {
	    		console.log("Se envió correctamente la consulta");
				toastr.options = {
				  "closeButton": true,
				  "progressBar": true,
				  "timeOut": "3000",
				  "extendedTimeOut": "1000"
				};
	    		toastr.success('Consulta enviada, muchas gracias!');
	    		$location.path('/');
		  }, function errorCallback(response) {
	    		console.log("No se ha enviado la consulta");
		  });
	};
	}
]);