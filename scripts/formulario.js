var anoAtual = document.getElementById("anoatual");
anoAtual.textContent = new Date().getFullYear();

var ultimaModificacao = document.getElementById("ultimaModificacao");
ultimaModificacao.textContent = "Última modificação: " + document.lastModified;

const produtos = [
  {
    id: "fc-1888",
    nome: "capacitor de fluxo",
    classificacaomedia: 4.5
  },
  {
    id: "fc-2050",
    nome: "fios elétricos",
    classificacaomedia: 4.7
  },
  {
    id: "fs-1987",
    nome: "circuitos de tempo",
    classificacaomedia: 3.5
  },
  {
    id: "ac-2000",
    nome: "reator de baixa tensão",
    classificacaomedia: 3.9
  },
  {
    id: "jj-1969",
    nome: "equalizador de distorção",
    classificacaomedia: 5.0
  }
];

var selectProduto = document.getElementById("produto");

for (var i = 0; i < produtos.length; i++) {
  var opcao = document.createElement("option");
  opcao.value = produtos[i].id;
  opcao.textContent = produtos[i].nome;
  selectProduto.appendChild(opcao);
}