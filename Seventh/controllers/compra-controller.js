APP.controller('CompraController', CompraController);

CompraController.$inject = ['$scope', 'CompraService', 'ProdutoService'];

function CompraController($scope, CompraService, ProdutoService) {
	
	var self = this;
    self.ordens = [];
    $scope.currentPage = 1;
    $scope.id = '';  
	
	var falha = function(msgs) {
		console.log(msgs);
	}
		
	self.init = function(){
	}

	self.init();

	self.buscarPorId = function(){
		
        $(".loading").show();

        self.ordens = [];     
        
		var sucesso = function(data) {
            
            data.items.forEach((element) => {
                let ordem = {};
                var sucessoProduto = function(data){
                    ordem.nome = data.name;
                    ordem.total = data.price * element.amount;
                }
                ProdutoService.buscarPorId(element.product_id, sucessoProduto, falha);
                ordem.quantidade = element.amount;

                self.ordens.push(ordem);
            });
			
			$(".loading").hide();
			this.configurarScrollTabelas();
			
		};

		CompraService.buscarPorId($scope.id, sucesso, falha);

	};

	function configurarScrollTabelas(){	
		var tam = $(".form-panel").width();
		tam = tam + "px";
		
		$(".form-panel .table-responsive").css("width", tam);
		$(".form-panel .table-responsive").css("overflow", "auto");		 
	}
}


