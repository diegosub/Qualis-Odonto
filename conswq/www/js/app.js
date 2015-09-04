// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
var db = null;

angular.module('starter', ['ionic', 'starter.controllers','http.utils', 'starter.services', 'ngCordova'])

.run(function($ionicPlatform, $cordovaSQLite) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);      
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
    
    if(window.cordova) {
      // App syntax
      db = $cordovaSQLite.openDB({ name: "conswq.db", bgType: 1 });
    } else {
      // Ionic serve syntax
      db = window.openDatabase("conswq.db", "1.0", "My app", -1);
    }
   
    $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS tb_favorito (_id INTEGER NOT NULL, descricao CHAR(300) NOT NULL);");

    $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS tb_area_avaliacao (_id INTEGER PRIMARY KEY NOT NULL, descricao STRING (100) NOT NULL);");
    $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS tb_estrato (_id INTEGER PRIMARY KEY NOT NULL, descricao STRING (100) NOT NULL, id_area_avaliacao INTEGER NOT NULL);");
    
    $cordovaSQLite.execute(db, "INSERT INTO tb_area_avaliacao VALUES (1, 'ODONTOLOGIA');");

    $cordovaSQLite.execute(db, "INSERT INTO tb_estrato VALUES (1, 'A1', 1);");
    $cordovaSQLite.execute(db, "INSERT INTO tb_estrato VALUES (2, 'A2', 1);");
    $cordovaSQLite.execute(db, "INSERT INTO tb_estrato VALUES (3, 'B1', 1);");
    $cordovaSQLite.execute(db, "INSERT INTO tb_estrato VALUES (4, 'B2', 1);");
    $cordovaSQLite.execute(db, "INSERT INTO tb_estrato VALUES (5, 'B3', 1);");
    $cordovaSQLite.execute(db, "INSERT INTO tb_estrato VALUES (6, 'B4', 1);");
    $cordovaSQLite.execute(db, "INSERT INTO tb_estrato VALUES (7, 'B5', 1);");
    $cordovaSQLite.execute(db, "INSERT INTO tb_estrato VALUES (8, 'C', 1);");


  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
      cache: false,
      url: '/app',
      abstract: true,
      templateUrl: 'templates/menu.html',
      controller: 'AppCtrl'
  })

    .state('app.area_avaliacao', {
      cache: false,
      url: '/area_avaliacao',
      views: {
        'menuContent': {
          templateUrl: 'templates/area_avaliacao.html',
          controller: 'AreaAvaliacaoCtrl'
        }
      }
  })

    .state('app.estrato', {
      cache: false,
      url: '/estrato/:codigo',
      views: {
        'menuContent': {
          templateUrl: 'templates/estrato.html',          
          controller: 'EstratoCtrl'
        }
      }
  })

    .state('app.titulo', {
      cache: false,
      url: '/titulo/:codigo',
      views: {
        'menuContent': {
          templateUrl: 'templates/titulo.html',
          controller: 'TituloCtrl'
        }
      }
  })

    .state('app.detalhe', {
      cache: false,
      url: '/detalhe/:codigo',
      views: {
        'menuContent': {
          templateUrl: 'templates/detalhe.html',
          controller: 'DetalheCtrl'
        }
      }
  })

    .state('app.geral', {
      cache: false,
      url: '/geral',
      views: {
        'menuContent': {
          templateUrl: 'templates/geral.html',
          controller: 'GeralCtrl'
        }
      }
  })

    .state('app.favorito', {
      cache: false,
      url: '/favorito',
      views: {
        'menuContent': {
          templateUrl: 'templates/favorito.html',
          controller: 'FavoritoCtrl'
        }
      }
  })

    .state('app.sobre', {
      cache: false,
      url: '/sobre',
      views: {
        'menuContent': {
          templateUrl: 'templates/sobre.html',
          controller: 'SobreCtrl'
        }
      }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/area_avaliacao');
});