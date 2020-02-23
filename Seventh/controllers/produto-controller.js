APP.controller('ProdutoController', ProdutoController);

ProdutoController.$inject = ['$scope', 'ProdutoService'];

function ProdutoController($scope, ProdutoService) {
	
	var self = this;
    self.produtos = [];
    $scope.currentPage = 1;
    $scope.nome = '';
    $scope.descricao = '';
    $scope.preco = '';
    self.index = '';
    
	
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
    
    self.adicionarProduto = function(){
        const produto = {
            "name": $scope.nome,
            "description": $scope.descricao,
            "price": $scope.preco
          }

          var sucesso = function(data) {
            
            self.produtos.push(data);
            alert('Produto incluído com sucesso');
            self.limparCampos();
			
			this.configurarScrollTabelas();
			
        };
        
        var sucessoEditar = function(data) {
            self.produtos[self.index] = data;
            alert('Produto editado com sucesso');
            self.limparCampos();
			
			this.configurarScrollTabelas();
			
		};

        if(self.index){
          ProdutoService.editar(produto, self.produtos[self.index].id, sucessoEditar, falha)
        }else{
            ProdutoService.incluir(produto, sucesso, falha);
        }
    }

    self.editarProduto = function(index){      
        let cIndex = index + ($scope.currentPage - 1) * 5;
        self.index = cIndex;
        let produto = self.produtos[cIndex];
        $scope.nome = produto.name;
        $scope.descricao = produto.description;
        $scope.preco = produto.price;
    }

    self.deletarProduto = function(index){
        let cIndex = index + ($scope.currentPage - 1) * 5;
				
		var sucesso = function(data) {
            
            self.produtos.splice(cIndex, 1);
            alert('Produto excluído com sucesso');
			
			this.configurarScrollTabelas();
			
		};

		ProdutoService.excluir(self.produtos[cIndex].id, sucesso, falha);
    }

    self.limparCampos = function(){
        $scope.nome = '';
        $scope.descricao = '';
        $scope.preco = '';
        self.index = ''
    }

	function configurarScrollTabelas(){	
		var tam = $(".form-panel").width();
		tam = tam + "px";
		
		$(".form-panel .table-responsive").css("width", tam);
		$(".form-panel .table-responsive").css("overflow", "auto");		 
	}
}


