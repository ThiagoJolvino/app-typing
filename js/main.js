var tempoDigitacao = $("#tempo-digitacao").text();
var campo = $(".campo-digitacao");
 
$(function(){
    atualizaTamanhoFrase();
    inicializaContadores();
    inicializaCronometro();
    reiniciaJogo();
    $("#botao-reiniciar").click(reiniciaJogo);
})

function atualizaTamanhoFrase(){
    var frase = $(".frase").text();
    var numPalavras = frase.split(" ").length;
    var tamanhoFrase = $("#tamanho-frase").text(numPalavras);
    
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
            }
        }, 1000)
    });

}

function reiniciaJogo(){
    campo.attr("disabled", false);
    campo.val("");
    $("#contator-palavras").text(0)
    $("#contador-caracteres").text(0);
    $("#tempo-digitacao").text(tempoDigitacao);
    inicializaCronometro();
}
