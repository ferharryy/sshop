APP.controller('IndexController', IndexController);

IndexController.$inject = ['$scope', 'CestaService', 'ProdutoService'];

function IndexController($scope, CestaService, ProdutoService) {
	
	var self = this;

	$scope.totalCarrinho = CestaService.totalItens();

	$scope.totalCesta = CestaService.totalItens;

	self.logado = {};
	self.mensagens = [];
	
	var falha = function(msgs) {
		console.log(msgs);
	}
	
	
	self.init = function(){
		carrinho = ProdutoService.buscarCarrinho() ? ProdutoService.buscarCarrinho() : {};
        const keys = Object.keys(carrinho);

		CestaService.updateTotal(keys.length);
		
		$scope.totalCarrinho = keys.length;
	}

	$scope.$on("qtdeAtualizada", function(){
		$scope.totalCarrinho = CestaService.totalItens();
	});

	self.init();

}
