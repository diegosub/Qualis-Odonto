angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope) {

})

.controller('AreaAvaliacaoCtrl', function($scope, AreaAvaliacao) {
  	
})

.controller('EstratoCtrl', function($scope, $stateParams, Estrato) {	
	Estrato.get($stateParams.codigo).then(function(data){
        $scope.listaEstrato = data;
    });
})

.controller('TituloCtrl', function($scope, $stateParams, Titulo) {
	
      Titulo.retornarTitulo($stateParams.codigo).success(
        function(data) {
          $scope.listaTitulo = data;
        }
      );
     
})

.controller('GeralCtrl', function($scope, $stateParams, Detalhe) {
	
	Detalhe.retornarDetalhe().success(
	    function(data) {
	      $scope.listaGeral = data;
	    }
    );

})

.controller('FavoritoCtrl', function($scope, $stateParams, Favorito) {
	
	Favorito.all().then(function(data){
		$scope.listaFavorito = data;
	});
	
})

.controller('DetalheCtrl', function($scope, $stateParams, $state, Detalhe, Favorito) {	

	Detalhe.retornarDetalhe().success(function(data){
		$scope.lista = data;

		var i = 0;

		while(i < data.length)
		{
			if(data[i].id == $stateParams.codigo)
			{
				$scope.id   			= data[i].id;
				$scope.titulo   		= data[i].titulo;
				$scope.estrato   		= data[i].estrato;
				$scope.areaAvaliacao   	= data[i].areaAvaliacao;
				$scope.issn   			= data[i].issn;
				$scope.status 			= data[i].status;
				
				$scope.atualizarFavorito();

				return;
			}
			
			i++;
		}
	});

	$scope.atualizarFavorito = function() {
		Favorito.get($scope.id).then(function(data){
	     
	        if(data != null 
	        	&& data.length > 0)
	        {
	        	$scope.flgFavorito = 'S';
	        }
	        else
	        {
	        	$scope.flgFavorito = 'N';
	        }
	    })
	};


	$scope.favoritar = function() {
		Favorito.adicionar($scope.id, $scope.titulo);
		$scope.atualizarFavorito();	
	};
	
	$scope.desfavoritar = function(codigo) {		
		Favorito.remover($scope.id);
		$scope.atualizarFavorito();		
	};

	$scope.home = function() {
		alert('diego');
  		$state.go('app.area_avaliacao'); 
  	}
})

.controller('SobreCtrl', function($scope, $stateParams, Titulo) {
	
});
