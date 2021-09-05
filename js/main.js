var tempoDigitacao = $("#tempo-digitacao").text();
var campo = $(".campo-digitacao");
 
$(function(){
    atualizaTamanhoFrase();
    inicializaContadores();
    inicializaCronometro();
    inicializaMarcadores();
    reiniciaJogo();
    $("#botao-reiniciar").click(reiniciaJogo);
})

function atualizaTamanhoFrase(){
    var frase = $(".frase").text();
    var numPalavras = frase.split(" ").length;
    $("#tamanho-frase").text(numPalavras);
    
}


function inicializaContadores(){
    campo.on("input", function(){
        var conteudo = campo.val();
        var qtdPalavras = conteudo.split(/\S+/).length - 1;
        $("#contator-palavras").text(qtdPalavras)
        var qtdCaracteres = conteudo.length;
        $("#contador-caracteres").text(qtdCaracteres);
    });
}


function inicializaCronometro(){
    var tempoRestante = $("#tempo-digitacao").text();
    campo.one("focus", function(){ 
        $("#botao-reiniciar").attr("disabled", true);
        var cronometroID = setInterval(function(){
            $("#tempo-digitacao").text(tempoRestante--);
            if(tempoRestante < 0){
                campo.attr("disabled", true);
                clearInterval(cronometroID);
                $("#botao-reiniciar").attr("disabled", false);
                campo.toggleClass("campo-desativado");
                
            }
        }, 1000)
    });
}
function inicializaMarcadores(){
    var frase = $(".frase").text();
    campo.on("input", function(){
    var digitado = campo.val();
    var comparavel = frase.substr(0, digitado.length);
    console.log("digitado: " + digitado);
    console.log("Frase C..:  " + comparavel);

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
    $("#contator-palavras").text(0)
    $("#contador-caracteres").text(0);
    $("#tempo-digitacao").text(tempoDigitacao);
    inicializaCronometro();
    campo.toggleClass("campo-desativado");
    campo.removeClass("campo-correto");
    campo.removeClass("campo-incorreto")
}
