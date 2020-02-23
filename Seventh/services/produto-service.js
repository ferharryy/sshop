APP.factory('ProdutoService', ProdutoService);

function ProdutoService($http) {

	$http.defaults.headers.put = {
		'Content-Type': 'application/json;charset=utf-8'
	};

	var mensagens = [];
	var mensagem = {};
	mensagem.level = "error";
	mensagem.msg = "Falha na requisição do serviço.";
	mensagens.push(mensagem);
	var uri = `https://s-shop-test.herokuapp.com`;

	return {

		inserirCarrinho: function (produto) {
			localStorage.carrinho = angular.toJson(produto);
		},

		buscarCarrinho: function () {
			return angular.fromJson(localStorage.carrinho);
		},

		selecionarTodos: function (sucesso, falha) {

			var uriProdutos = uri + `/product`;

			$http.get(uriProdutos).success(
				function (data, status, headers, config) {

					sucesso(data);

				}).error(function (data, status, headers, config) {
					falha(mensagens);
				});
		},

		buscarPorId: function (produtoId, sucesso, falha) {

			var uriProduto = uri + `/product/${produtoId}`;

			$http.get(uriProduto).success(
				function (data, status, headers, config) {

					sucesso(data);

				}).error(function (data, status, headers, config) {
					falha(mensagens);
				});
		},

		incluir: function (produto, sucesso, falha) {

			var uriIncluir = uri + `/product`;

			$http.post(uriIncluir, produto).success(

				function (data, status, headers, config) {

					sucesso(data);

				}).error(function (data, status, headers, config) {
					falha(mensagens);
				});
		},

		editar: function (produto, id, sucesso, falha) {

			var uriEditar = uri + `/product/${id}`;

			$http.put(uriEditar, produto).success(

				function (data, status, headers, config) {

					sucesso(data);

				}).error(function (data, status, headers, config) {
					falha(mensagens);
				});
		},

		excluir: function (produto, sucesso, falha) {

			var uriExcluir = uri + `/product/${produto}`;

			$http.delete(uriExcluir, produto).success(

				function (data, status, headers, config) {

					sucesso(data);

				}).error(function (data, status, headers, config) {
					falha(mensagens);
				});
		}
	}
}