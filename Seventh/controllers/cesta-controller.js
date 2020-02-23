APP.controller('CestaController', CestaController);

CestaController.$inject = ['$scope', '$rootScope', 'ProdutoService', 'CestaService'];

function CestaController($scope, $rootScope, ProdutoService, CestaService) {

    var self = this;
    self.itemsCarrinho = [];

    var carrinho = {};

    $scope.nome = '';
    $scope.valorTotal = 0.0;
    $scope.currentPage = 1;

    var falha = function (msgs) {
        console.log(msgs);
    }

    self.init = function () {
        carregarCesta();
    }

    self.init();

    function carregarCesta() {
        carrinho = ProdutoService.buscarCarrinho() ? ProdutoService.buscarCarrinho() : {};
        const keys = Object.keys(carrinho);

        keys.forEach(element => {
            self.itemsCarrinho.push(carrinho[element]);
        });

        calculaValorTotal();

        console.log(self.itemsCarrinho);

    };

    function calculaValorTotal(){
        $scope.valorTotal = self.itemsCarrinho.reduce((a, b) => {
            return a + b.totalItem;
        }, 0);
    }

    self.alterarQtdProduto = function (index) {
        let produto = self.itemsCarrinho[index];
        if (produto.quantidade && produto.quantidade != '') {
            produto.totalItem = produto.price * produto.quantidade;

            carrinho[produto.id] = produto;

            ProdutoService.inserirCarrinho(carrinho);
        }

        calculaValorTotal();
    }

    self.deletarProduto = function (index) {
        let cIndex = index + ($scope.currentPage - 1) * 3;
        delete carrinho[self.itemsCarrinho[cIndex].id];

        self.itemsCarrinho.splice(cIndex, 1);

        ProdutoService.inserirCarrinho(carrinho);

        calculaValorTotal();

        CestaService.updateTotal(Object.keys(carrinho).length);
		$rootScope.$broadcast("qtdeAtualizada");
    }

    self.finalizarCompra = function () {
        if ($scope.nome != '') {
            const itensPersistencia = self.itemsCarrinho.map(e => {
                return {
                    "product_id": e.id,
                    "amount": e.quantidade
                };
            });

            const ordem = {
                "user_id": 1,
                "items": itensPersistencia
            };

            var sucesso = function (data) {
                alert(`Compra Finalizada com Sucesso com ID: ${data.id}`);
                $scope.nome = '';
                self.itemsCarrinho = [];
                localStorage.clear();
                CestaService.updateTotal(0);
                $rootScope.$broadcast("qtdeAtualizada");
                calculaValorTotal();

                this.configurarScrollTabelas();

            };

            if (self.itemsCarrinho.length > 0)
                CestaService.enviarOrdem(ordem, sucesso, falha);
        }else{
            alert('Campo nome obrigatório')
        }
    }

}