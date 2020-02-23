
var menuEscondido = false;

function configurarScrollTabelas(){
	
	var tam = $(".form-panel").width();
	tam = tam + "px";
	
	$(".form-panel .table-responsive").css("width", tam);
	$(".form-panel .table-responsive").css("overflow", "auto");
	
}

$(function() {
	
	if(screen.width < 769){
		$("#sidebar").hide();
		$("#main-content").css("margin-left", "0");
		$(".cadastro").css("padding", "0");
		menuEscondido = true;
	}else{
		$(".cadastro").css("padding", "0 10% 10%");
	}
	
	$("#main-content").css("margin-left", "210px");
	
	$("#toggle-button").click(function(){
		
		if(menuEscondido){
			$("#sidebar").show();
			$("#main-content").css("margin-left", "210px");
			menuEscondido = false;
		}else{
			$("#sidebar").hide();
			$("#main-content").css("margin-left", "0");
			menuEscondido = true;
		}
		
	});
	
	$("#toggle-button").click(function(){
		configurarScrollTabelas();
	});
	
});

function mostrarOuEsconderMenuLateral(val){
	
	if(val){
		
		if(menuEscondido){
			$("#sidebar").show();
			$("#main-content").css("margin-left", "210px");
			menuEscondido = false;
		}
		
	}else{
		
		if(!menuEscondido){
			$("#sidebar").hide();
			$("#main-content").css("margin-left", "0");
			menuEscondido = true;
		}
		
	}
	
	configurarScrollTabelas();
	
}

function somenteNumeros(num) {
    var er = /[^0-9.]/;
    er.lastIndex = 0;
    var campo = num;
    if (er.test(campo.value)) {
      campo.value = "";
    }
}

function removerTodosItensDeMenuAtivos(){
	
	$("#item-dashbard").removeClass("active");
	$("#item-apontamentos").removeClass("active");
	$("#item-notas").removeClass("active");
	$("#item-empresas").removeClass("active");
	$("#item-cidades").removeClass("active");
	$("#item-moedas").removeClass("active");	
	$("#item-status").removeClass("active");	
	$("#item-status-plan-projeto").removeClass("active");	
	$("#item-colaboradores").removeClass("active");
	$("#item-tipos-de-contato").removeClass("active");
	$("#item-planejamentos-de-projetos").removeClass("active");
	$("#item-projetos").removeClass("active");
	$("#item-gerentes-de-projeto").removeClass("active");
	$("#item-reservas-de-sala").removeClass("active");
	$("#item-consulta-horas-consultor").removeClass("active");
	$("#item-meus-dados").removeClass("active");
	$("#item-despesas").removeClass("active");
	$("#item-projetos").removeClass("active");
	$("#item-statusprojeto").removeClass("active");
	
}

function activeMenu(id){
	
	removerTodosItensDeMenuAtivos();
	$(id).addClass("active");
	
	if(screen.width < 769){
		$("#sidebar").hide();
		$("#main-content").css("margin-left", "0");
		menuEscondido = true;
	}
	
}


