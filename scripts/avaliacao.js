var anoAtual = document.getElementById("anoatual");
anoAtual.textContent = new Date().getFullYear();

var ultimaModificacao = document.getElementById("ultimaModificacao");
ultimaModificacao.textContent = "Última modificação: " + document.lastModified;

var contadorSalvo = localStorage.getItem("contadorAvaliacoes");

var contador;
if (contadorSalvo === null) {
  contador = 0;
} else {
  contador = parseInt(contadorSalvo);
}

contador = contador + 1;

localStorage.setItem("contadorAvaliacoes", contador);

document.getElementById("contador").textContent = contador;