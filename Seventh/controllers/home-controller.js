APP.controller('HomeController', HomeController);

HomeController.$inject = ['$scope', '$rootScope', 'ProdutoService', 'CestaService'];

function HomeController($scope, $rootScope, ProdutoService, CestaService) {
	
	var self = this;
	self.produtos = [];
    $scope.currentPage = 1;	
	
	var falha = function(msgs) {
		console.log(msgs);
	}
		
	self.init = function(){
		selecionarTodos();
	}

	self.init();

	function selecionarTodos(){
		
		$(".loading").show();
				
		var sucesso = function(data) {
			
			self.produtos = [];
			
			if(data.length > 0){
				self.produtos = data;
			}
			
			$(".loading").hide();
			this.configurarScrollTabelas();
			
		};

		ProdutoService.selecionarTodos(sucesso, falha);

	};
	
	self.adicionarProdutoNaCesta = function(produto, index) { 
		var carrinho = ProdutoService.buscarCarrinho() == null ? {} : ProdutoService.buscarCarrinho();
		produto.totalItem = produto.price * produto.quantidade;

		carrinho[produto.id] = produto;

		ProdutoService.inserirCarrinho(carrinho);

		self.produtos[index + ($scope.currentPage - 1) * 5].quantidade = null;

		CestaService.updateTotal(Object.keys(carrinho).length);

		$rootScope.$broadcast("qtdeAtualizada");
	};

	function configurarScrollTabelas(){	
		var tam = $(".form-panel").width();
		tam = tam + "px";
		
		$(".form-panel .table-responsive").css("width", tam);
		$(".form-panel .table-responsive").css("overflow", "auto");		 
	}
}


