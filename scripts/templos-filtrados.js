var anoAtual = document.getElementById("anoatual");
anoAtual.textContent = new Date().getFullYear();

var ultimaModificacao = document.getElementById("ultimaModificacao");
ultimaModificacao.textContent = "Última modificação: " + document.lastModified;

var botaoMenu = document.getElementById("botao-menu");
var menuNav = document.querySelector("nav");

botaoMenu.addEventListener("click", function () {
  menuNav.classList.toggle("mostrar");

  if (menuNav.classList.contains("mostrar")) {
    botaoMenu.textContent = "X";
    botaoMenu.setAttribute("aria-label", "Fechar menu");
  } else {
    botaoMenu.textContent = "☰";
    botaoMenu.setAttribute("aria-label", "Abrir menu");
  }
});

const templos = [
  {
    nomeDoTemplo: "Aba Nigeria",
    localizacao: "Aba, Nigéria",
    consagracao: "2005, 7 de agosto",
    area: 11500,
    urlDaImagem: "imagens/templo-aba.webp"
  },
  {
    nomeDoTemplo: "Manti Utah",
    localizacao: "Manti, Utah, Estados Unidos",
    consagracao: "1888, 21 de maio",
    area: 74792,
    urlDaImagem: "imagens/templo-manti.webp"
  },
  {
    nomeDoTemplo: "Payson Utah",
    localizacao: "Payson, Utah, Estados Unidos",
    consagracao: "2015, 7 de junho",
    area: 96630,
    urlDaImagem: "imagens/templo-payson.webp"
  },
  {
    nomeDoTemplo: "Yigo Guam",
    localizacao: "Yigo, Guam",
    consagracao: "2020, 2 de maio",
    area: 6861,
    urlDaImagem: "imagens/templo-yigo.webp"
  },
  {
    nomeDoTemplo: "Washington D.C.",
    localizacao: "Kensington, Maryland, Estados Unidos",
    consagracao: "1974, 19 de novembro",
    area: 156558,
    urlDaImagem: "imagens/templo-washington.webp"
  },
  {
    nomeDoTemplo: "Lima Peru",
    localizacao: "Lima, Peru",
    consagracao: "1986, 10 de janeiro",
    area: 9600,
    urlDaImagem: "imagens/templo-lima.webp"
  },
  {
    nomeDoTemplo: "Cidade do México, México",
    localizacao: "Cidade do México, México",
    consagracao: "1983, 2 de dezembro",
    area: 116642,
    urlDaImagem: "imagens/templo-cidade-do-mexico.webp"
  },
  {
    nomeDoTemplo: "Rio de Janeiro Brasil",
    localizacao: "Rio de Janeiro, Brasil",
    consagracao: "2022, 8 de maio",
    area: 29966,
    urlDaImagem: "imagens/templo-rio-de-janeiro.webp"
  },
  {
    nomeDoTemplo: "São Paulo Brasil",
    localizacao: "São Paulo, Brasil",
    consagracao: "1978, 30 de outubro",
    area: 59246,
    urlDaImagem: "imagens/templo-sao-paulo.webp"
  },
  {
    nomeDoTemplo: "Cardston Alberta",
    localizacao: "Cardston, Alberta, Canadá",
    consagracao: "1923, 26 de agosto",
    area: 88562,
    urlDaImagem: "imagens/templo-alberta.webp"
  }
];

const galeria = document.getElementById("galeria-templos");
const tituloPagina = document.getElementById("titulo-pagina");

function mostrarTemplos(listaDeTemplos) {
  galeria.innerHTML = "";

  listaDeTemplos.forEach(function (templo) {
    const cartao = document.createElement("figure");

    const imagem = document.createElement("img");
    imagem.src = templo.urlDaImagem;
    imagem.alt = templo.nomeDoTemplo;
    imagem.loading = "lazy";

    const legenda = document.createElement("figcaption");
    legenda.innerHTML = `
      <h2>${templo.nomeDoTemplo}</h2>
      <p>${templo.localizacao}</p>
      <p>Consagrado em: ${templo.consagracao}</p>
      <p>${templo.area.toLocaleString("pt-BR")} pés quadrados</p>
    `;

    cartao.appendChild(imagem);
    cartao.appendChild(legenda);
    galeria.appendChild(cartao);
  });
}

function pegarAno(templo) {
  return parseInt(templo.consagracao.split(",")[0]);
}

function filtrarTodos() {
  tituloPagina.textContent = "Página Inicial";
  mostrarTemplos(templos);
}

function filtrarAntigos() {
  tituloPagina.textContent = "Templos Antigos";
  const antigos = templos.filter(function (templo) {
    return pegarAno(templo) < 1900;
  });
  mostrarTemplos(antigos);
}

function filtrarNovos() {
  tituloPagina.textContent = "Templos Novos";
  const novos = templos.filter(function (templo) {
    return pegarAno(templo) > 2000;
  });
  mostrarTemplos(novos);
}

function filtrarGrandes() {
  tituloPagina.textContent = "Templos Grandes";
  const grandes = templos.filter(function (templo) {
    return templo.area > 90000;
  });
  mostrarTemplos(grandes);
}

function filtrarPequenos() {
  tituloPagina.textContent = "Templos Pequenos";
  const pequenos = templos.filter(function (templo) {
    return templo.area < 10000;
  });
  mostrarTemplos(pequenos);
}

document.getElementById("link-inicio").addEventListener("click", filtrarTodos);
document.getElementById("link-antigo").addEventListener("click", filtrarAntigos);
document.getElementById("link-novo").addEventListener("click", filtrarNovos);
document.getElementById("link-grande").addEventListener("click", filtrarGrandes);
document.getElementById("link-pequeno").addEventListener("click", filtrarPequenos);

filtrarTodos();