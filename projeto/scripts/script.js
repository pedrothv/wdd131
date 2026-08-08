var manutencoes = [
  { nome: "Troca de óleo e filtro", km: 10000, meses: 6 },
  { nome: "Filtro de ar", km: 20000, meses: 12 },
  { nome: "Pastilhas de freio", km: 30000, meses: 24 },
  { nome: "Correia dentada", km: 60000, meses: 60 }
];

function pegarVeiculos() {
  var dados = localStorage.getItem("veiculos");
  if (dados) {
    return JSON.parse(dados);
  } else {
    return [];
  }
}

function salvarVeiculos(veiculos) {
  localStorage.setItem("veiculos", JSON.stringify(veiculos));
}

function calcularStatus(veiculo, item) {
  var kmRodado = veiculo.kmAtual - veiculo.kmTroca;
  var kmRestante = item.km - kmRodado;

  var dataTroca = new Date(veiculo.dataTroca);
  var hoje = new Date();
  var diffTempo = hoje - dataTroca;
  var mesesPassados = diffTempo / (1000 * 60 * 60 * 24 * 30);
  var mesesRestantes = item.meses - mesesPassados;

  var status = "ok";

  if (kmRestante <= 0 || mesesRestantes <= 0) {
    status = "atrasado";
  } else if (kmRestante <= 1000 || mesesRestantes <= 1) {
    status = "atencao";
  }

  return status;
}

function textoStatus(status) {
  if (status === "atrasado") {
    return "Atrasado";
  } else if (status === "atencao") {
    return "Atenção";
  } else {
    return "Em dia";
  }
}

function mostrarVeiculos() {
  var lista = document.getElementById("lista-veiculos");

  if (!lista) {
    return;
  }

  var veiculos = pegarVeiculos();

  if (veiculos.length === 0) {
    lista.innerHTML = `<div class="vazio"><p>Nenhum veículo cadastrado ainda.</p></div>`;
    return;
  }

  var html = "";

  veiculos.forEach(function (veiculo) {
    var itens = "";

    manutencoes.forEach(function (item) {
      var status = calcularStatus(veiculo, item);
      itens += `<li><span>${item.nome}</span><span class="badge ${status}">${textoStatus(status)}</span></li>`;
    });

    html += `
      <div class="veiculo">
        <h3>${veiculo.nome}</h3>
        <p>${veiculo.modelo} - ${veiculo.ano} - ${veiculo.kmAtual} km</p>
        <ul>${itens}</ul>
        <button class="botao botao-segundo" onclick="removerVeiculo(${veiculo.id})">Remover veículo</button>
      </div>
    `;
  });

  lista.innerHTML = html;
}

function removerVeiculo(id) {
  var veiculos = pegarVeiculos();
  var novaLista = veiculos.filter(function (veiculo) {
    return veiculo.id !== id;
  });
  salvarVeiculos(novaLista);
  mostrarVeiculos();
}

function cadastrarVeiculo(evento) {
  evento.preventDefault();

  var nome = document.getElementById("nome").value;
  var modelo = document.getElementById("modelo").value;
  var ano = document.getElementById("ano").value;
  var kmAtual = Number(document.getElementById("kmAtual").value);
  var kmTroca = Number(document.getElementById("kmTroca").value);
  var dataTroca = document.getElementById("dataTroca").value;

  var mensagem = document.getElementById("mensagem");

  if (kmTroca > kmAtual) {
    mensagem.innerHTML = `<p>A km da última troca não pode ser maior que a km atual.</p>`;
    return;
  }

  var veiculo = {
    id: Date.now(),
    nome: nome,
    modelo: modelo,
    ano: ano,
    kmAtual: kmAtual,
    kmTroca: kmTroca,
    dataTroca: dataTroca
  };

  var veiculos = pegarVeiculos();
  veiculos.push(veiculo);
  salvarVeiculos(veiculos);

  mensagem.innerHTML = `<p>${nome} foi cadastrado com sucesso!</p>`;

  evento.target.reset();
}

var formulario = document.getElementById("formulario");

if (formulario) {
  formulario.addEventListener("submit", cadastrarVeiculo);
}

mostrarVeiculos();