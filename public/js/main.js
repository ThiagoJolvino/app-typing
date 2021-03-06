var tempoDigitacao = $("#tempo-digitacao").text();
var campo = $(".campo-digitacao");
 
$(function(){
    atualizaTamanhoFrase();
    inicializaContadores();
    inicializaCronometro();
    inicializaMarcadores();
    reiniciaJogo();
    $("#botao-reiniciar").click(reiniciaJogo);
    atualizaPlacar();

    $("#usuarios").selectize({
        create: true,
        sortField: "text"
    });

    $('.tooltip').tooltipster({
        trigger: 'custom'
    });

});

function atualizaTempoInicial(tempo){
    tempoDigitacao = tempo;
    $("#tempo-digitacao").text(tempo);
}
function atualizaTamanhoFrase(){
    var frase = $(".frase").text();
    var numPalavras = frase.split(" ").length;
    $("#tamanho-frase").text(numPalavras);
    
}


function inicializaContadores(){
    campo.on("input", function(){
        var conteudo = campo.val();
        var qtdPalavras = conteudo.split(/\S+/).length - 1;
        $("#contador-palavras").text(qtdPalavras)
        var qtdCaracteres = conteudo.length;
        $("#contador-caracteres").text(qtdCaracteres);
    });
}


function inicializaCronometro(){
    campo.one("focus", function(){ 
        var tempoRestante = $("#tempo-digitacao").text();
        $("#botao-reiniciar").attr("disabled", true);
        var cronometroID = setInterval(function(){
            $("#tempo-digitacao").text(tempoRestante--);
            if(tempoRestante < 0){
                clearInterval(cronometroID);
                finalizaJogo();
                inserePlacar();
            }
        }, 1000)
    });
}
function finalizaJogo(){
    campo.attr("disabled", true);
    
    $("#botao-reiniciar").attr("disabled", false);
    campo.toggleClass("campo-desativado");
}
function inicializaMarcadores(){
    campo.on("input", function(){
        var frase = $(".frase").text();
        var digitado = campo.val();
        var comparavel = frase.substr(0, digitado.length);

        if(digitado == comparavel){
            campo.addClass("campo-correto");
            campo.removeClass("campo-incorreto");
        }else{
            campo.addClass("campo-incorreto")
            campo.removeClass("campo-correto");
        }
    
});
}



function reiniciaJogo(){
    campo.attr("disabled", false);
    campo.val("");
    $("#contador-palavras").text(0)
    $("#contador-caracteres").text(0);
    $("#tempo-digitacao").text(tempoDigitacao);
    inicializaCronometro();
    campo.toggleClass("campo-desativado");
    campo.removeClass("campo-correto");
    campo.removeClass("campo-incorreto")
}

