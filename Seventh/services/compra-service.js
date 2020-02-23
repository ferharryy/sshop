APP.factory('CompraService', CompraService);

function CompraService($http) {

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

		buscarPorId: function (compraId, sucesso, falha) {

			var uriOrdem = uri + `/order/${compraId}`;

			$http.get(uriOrdem).success(
				function (data, status, headers, config) {

					sucesso(data);

				}).error(function (data, status, headers, config) {
					falha(mensagens);
				});
		}
	}
}