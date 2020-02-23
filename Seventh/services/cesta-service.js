APP.factory('CestaService', CestaService);

function CestaService($http) {

	$http.defaults.headers.put = {
		'Content-Type' : 'application/json;charset=utf-8'
	};
    
    var totalItens = 0;

	var mensagens = [];
	var mensagem = {};
	mensagem.level = "error";
	mensagem.msg = "Falha na requisição do serviço.";
    mensagens.push(mensagem);
    var uri = `https://s-shop-test.herokuapp.com`;

	return{

        updateTotal : function(total) {
            totalItens = total;
        },

        totalItens : function() {
            return totalItens;
        },
		
		selecionarTodos : function(sucesso, falha){
			
			var uriProdutos = uri + `/product`;
			
			$http.get(uriProdutos).success(
			function(data, status, headers, config) {
				
					sucesso(data);
				
			}).error(function(data, status, headers, config) {
				falha(mensagens);
			});
		},
		
		
		enviarOrdem : function(ordem, sucesso, falha){
			
			var uriIncluir = uri + `/order`;
			
			$http.post(uriIncluir, ordem).success(
					
			function(data, status, headers, config) {
				sucesso(data);
			}).error(function(data, status, headers, config) {
				falha(mensagens);
			});
		}
	}
}