var frase = $(".frase").text();
var numPalavras = frase.split(" ").length;
var tamanhoFrase = $("#tamanho-frase").text(numPalavras);

var campo = $(".campo-digitacao");
campo.on("input", function(){
    var conteudo = campo.val();
    var qtdPalavras = conteudo.split(/\S+/).length - 1;
    $("#contator-palavras").text(qtdPalavras)
    var qtdCaracteres = conteudo.length;
    $("#contador-caracteres").text(qtdCaracteres);
});
tempoRestante = $("#tempo-digitacao").text();
campo.one("focus", function(){ 
    var cronometroID = setInterval(function(){
        $("#tempo-digitacao").text(tempoRestante--);
        if(tempoRestante < 1){
            campo.attr("disabled", true);
            clearInterval(cronometroID);
        }
        
    }, 1000)
});
