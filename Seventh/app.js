APP = angular.module('S-Shop', ['ngRoute', 'ngMaterial', 'angularUtils.directives.dirPagination']);

APP.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
	$routeProvider
	.when('/', {
		templateUrl: '/views/home.html'
		
	}).when('/cesta', {
		templateUrl: '/views/cesta.html'
		
	}).when('/produtos', {
		templateUrl: '/views/produtos.html'
		
	}).when('/compras', {
		templateUrl: '/views/compras.html'
		
	}).otherwise({redirectTo:'/erro'});
}]);