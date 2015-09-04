angular.module('starter.services', [])

.factory('DBA', function($cordovaSQLite, $q, $ionicPlatform) {
  var self = this;

  // Handle query's and potential errors
  self.query = function (query, parameters) {
    parameters = parameters || [];
    var q = $q.defer();

    $ionicPlatform.ready(function () {
      $cordovaSQLite.execute(db, query, parameters)
        .then(function (result) {
          q.resolve(result);
        }, function (error) {
          console.warn('I found an error');
          console.warn(error);
          q.reject(error);
        });
    });
    return q.promise;
  }

  // Proces a result set
  self.getData = function(result) {
    var output = [];

    for (var i = 0; i < result.rows.length; i++) {
      output.push(result.rows.item(i));
    }
    return output;
  }

  // Proces a single result
  self.getById = function(result) {
    var output = null;
    output = angular.copy(result.rows.item(0));
    return output;
  }

  return self;
})


.factory('AreaAvaliacao', function($cordovaSQLite, DBA) {
  var self = this;

  self.all = function() {
    return DBA.query("SELECT _id, descricao FROM tb_area_avaliacao")
      .then(function(result){
        return DBA.getData(result);
      });
  }

  return self;
})

.factory('Estrato', function($cordovaSQLite, DBA) {
  var self = this;

  self.all = function() {
    return DBA.query("SELECT _id, descricao FROM tb_estrato")
      .then(function(result){
        return DBA.getData(result);
      });
  }

  self.get = function(codigo) {    
    return DBA.query("SELECT * FROM tb_estrato WHERE id_area_avaliacao = ?", [codigo])
      .then(function(result){
        return DBA.getData(result);
      });
  }

  return self;
})

.factory('Titulo', function($httpUtils) {
  return {
    retornarTitulo: function(codigo) {
      
      if(codigo == 1)
      {
        return $httpUtils.get('data/A1.json');    
      }
     
      if(codigo == 2)
      {
        return $httpUtils.get('data/A2.json');    
      }

      if(codigo == 3)
      {
        return $httpUtils.get('data/B1.json');    
      }
      
      if(codigo == 4)
      {
        return $httpUtils.get('data/B2.json');    
      }

      if(codigo == 5)
      {
        return $httpUtils.get('data/B3.json');    
      }

      if(codigo == 6)
      {
        return $httpUtils.get('data/B4.json');    
      }

      if(codigo == 7)
      {
        return $httpUtils.get('data/B5.json');    
      }

      if(codigo == 8)
      {
        return $httpUtils.get('data/C.json');    
      }

    }
  }
})

.factory('Detalhe', function($httpUtils) {
  return {
    retornarDetalhe: function() {
      
        return $httpUtils.get('data/all.json');
    }
  }
})

.factory('Favorito', function($cordovaSQLite, DBA) {
  var self = this;

  self.get = function(codigo) {        
    return DBA.query("SELECT * FROM tb_favorito WHERE _id = ?", [codigo])
      .then(function(result){
        return DBA.getData(result);
      });
  }

  self.all = function() {        
    return DBA.query("SELECT * FROM tb_favorito ORDER BY descricao")
      .then(function(result){
        return DBA.getData(result);
      });
  }

  self.adicionar = function(codigo, descricao) {    
     return DBA.query("INSERT INTO tb_favorito (_id, descricao) VALUES (?, ?)", [codigo, descricao]);
  }

  self.remover = function(codigo) {    
    return DBA.query("DELETE FROM tb_favorito WHERE _id = (?)", [codigo]);
  }

  return self;
})