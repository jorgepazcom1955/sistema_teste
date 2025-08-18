// ✅ Tela de boas-vindas
window.addEventListener("load", () => {
  setTimeout(() => {
    const splash = document.getElementById("splash");
    if (splash) splash.style.display = "none";
  }, 4000);
});
 
  // Banco de dados local (localStorage)

  document.getElementById("form-produto").reset();


function mostrarProdutos() {
  const lista = document.getElementById("lista-produtos");
  lista.innerHTML = "";
  produtos.forEach(p => {
    const item = document.createElement("li");
    item.textContent = `[${p.tipo}] ${p.id} - ${p.nome} - R$ ${p.preco.toFixed(2)}`;
    lista.appendChild(item);
  });
}

let produtos = JSON.parse(localStorage.getItem("produtos")) || [];

function cadastrarProduto() {
  const tipo = document.getElementById("tipo-codigo").value;
  const codigo = document.getElementById("codigo-produto").value.trim();
  const nome = document.getElementById("nome-produto").value.trim();
  const preco = parseFloat(document.getElementById("preco-produto").value);

  if (!codigo || !nome || isNaN(preco)) {
    alert("Preencha todos os campos corretamente.");
    return;
  }
  //Cadastrar Produto
  function cadastrarProduto() {
    const id = document.getElementById("codigo-produto").value.trim();
    const nome = document.getElementById("nome-produto").value.trim();
    const preco = parseFloat(document.getElementById("preco-produto").value);
  
    fetch("http://localhost:3000/cadastrar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, nome, preco, tipo: "manual" })
    })
    .then(res => res.text())
    .then(msg => alert(msg));
  }
  
  const produto = { id: codigo, nome, preco, tipo };
  produtos.push(produto);
  localStorage.setItem("produtos", JSON.stringify(produtos));

  mostrarProdutos();
  document.getElementById("form-produto").reset();
}

function calcularValor() {
  const peso = parseFloat(document.getElementById('peso-produto').value);
  const preco = parseFloat(document.getElementById('preco-kg').value);
  const total = peso * preco;
  document.getElementById('valor-total').innerText = `Valor Total: R$ ${total.toFixed(2)}`;
}

function mostrarProdutos() {
  const lista = document.getElementById("lista-produtos");
  lista.innerHTML = "";
  produtos.forEach(p => {
    const item = document.createElement("li");
    item.textContent = `[${p.tipo}] ${p.id} - ${p.nome} - R$ ${p.preco.toFixed(2)}`;
    lista.appendChild(item);
  });
}

mostrarProdutos();




const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { error } = require("console");
const sqlite3 = require("sqlite3").verbose();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = new sqlite3.Database("./produtos.db");

db.run(`CREATE TABLE IF NOT EXISTS produtos (
  id TEXT PRIMARY KEY,
  nome TEXT,
  preco REAL,
  tipo TEXT
)`);

app.post("/cadastrar", (req, res) => {
  const { id, nome, preco, tipo } = req.body;
  db.run(`INSERT INTO produtos (id, nome, preco, tipo) VALUES (?, ?, ?, ?)`,
    [id, nome, preco, tipo],
    err => {
      if (err) return res.status(500).send("Erro ao cadastrar");
      res.send("Produto cadastrado com sucesso");
    }
  );
});



function cadastrarProduto() {
  const tipo = document.getElementById("tipo-codigo").value;
  const id = document.getElementById("codigo-produto").value.trim();
  const nome = document.getElementById("nome-produto").value.trim();
  const preco = parseFloat(document.getElementById("preco-produto").value);

  if (!id || !nome || isNaN(preco)) {
    alert("Preencha todos os campos corretamente.");
    return;
  }

  fetch("http://localhost:3000/cadastrar", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, nome, preco, tipo })
  })
  .then(res => res.text())
  .then(msg => {
    alert(msg);
    document.getElementById("form-produto").reset();
    mostrarProdutos();
  });
}


app.listen(3001, () => console.log("Servidor rodando na porta 3001"));
function mostrarProdutos() {
  const lista = document.getElementById("lista-produtos");
  lista.innerHTML = "";
  produtos.forEach(p => {
    const item = document.createElement("li");
    item.textContent = `[${p.tipo}] ${p.id} - ${p.nome} - R$ ${p.preco.toFixed(2)}`;
    lista.appendChild(item);
  });
}

function mostrarProdutos() {
  fetch("http://localhost:3000/produtos")
    .then(res => res.json())
    .then(produtos => {
      const lista = document.getElementById("lista-produtos");
      lista.innerHTML = "";
      produtos.forEach(p => {
        const item = document.createElement("li");
        item.textContent = `[${p.tipo}] ${p.id} - ${p.nome} - R$ ${p.preco.toFixed(2)}`;
        lista.appendChild(item);
      });
    });
}
localStorage.clear(); // Apaga tudo
// ou
localStorage.removeItem("nomeDaChave"); // Apaga só uma chave

// Buscar produto por código
function buscarProduto() {
  const codigo = document.getElementById("buscaCodigo").value.trim();
  const produto = produtos.find(p => p.codigo === codigo);

  const resultado = document.getElementById("resultadoBusca");
  if (produto) {
    resultado.textContent = `Produto: ${produto.nome} | Preço: R$ ${produto.preco.toFixed(2)}`;
  } else {
    resultado.textContent = "Produto não encontrado.";
  }
}

// Simular balança (cálculo por peso)
function calcularPrecoPorPeso() {
  const codigo = document.getElementById("codigoPeso").value.trim();
  const peso = parseFloat(document.getElementById("peso").value);
  const produto = produtos.find(p => p.codigo === codigo);

  const resultado = document.getElementById("resultadoPeso");
  if (produto && !isNaN(peso)) {
    const total = produto.preco * peso;
    resultado.textContent = `Total a pagar: R$ ${total.toFixed(2)} (${peso}kg de ${produto.nome})`;
  } else {
    resultado.textContent = "Produto não encontrado ou peso inválido.";
  }
}
//Caixa
function calcularTroco() {
  const compra = parseFloat(document.getElementById("valor-compra").value);
  const pago = parseFloat(document.getElementById("valor-pago").value);
  const forma = document.getElementById("forma-pagamento").value;
  const resultado = document.getElementById("resultado-troco");

  if (isNaN(compra) || isNaN(pago)) {
    resultado.innerText = "Preencha os valores corretamente.";
    return;
  }

  const troco = pago - compra;
  if (troco >= 0) {
    resultado.innerHTML = `
      🧾 Venda registrada com sucesso!<br>
      Forma de pagamento: <strong>${forma}</strong><br>
      Troco: R$ ${troco.toFixed(2)}
    `;
  } else {
    resultado.innerText = `Valor insuficiente. Faltam R$ ${Math.abs(troco).toFixed(2)}.`;
  }
}

function imprimirRecibo() {
  const recibo = document.getElementById("recibo");
  recibo.style.display = "block";

  setTimeout(() => {
    window.print();
    recibo.style.display = "none";
  }, 100);
}

function imprimirRecibo() {
  const recibo = document.getElementById("recibo");

  // 🕒 Gerar data e hora atual
  const agora = new Date();
  const dataFormatada = agora.toLocaleDateString("pt-BR");
  const horaFormatada = agora.toLocaleTimeString("pt-BR", { hour: '2-digit', minute: '2-digit' });
  function imprimirRecibo() {
    const recibo = document.getElementById("recibo");
  
    // 🕒 Gerar data e hora atual
    const agora = new Date();
    const dataFormatada = agora.toLocaleDateString("pt-BR");
    const horaFormatada = agora.toLocaleTimeString("pt-BR", { hour: '2-digit', minute: '2-digit' });
  
    // 🧾 Atualizar no recibo
    document.getElementById("data-hora").textContent = `${dataFormatada} ${horaFormatada}`;
  
    // Mostrar e imprimir
    recibo.style.display = "block";
    setTimeout(() => {
      window.print();
      recibo.style.display = "none";
    }, 100);
  }
  // 🧾 Atualizar no recibo
  document.getElementById("data-hora").textContent = `${dataFormatada} ${horaFormatada}`;

  // Mostrar e imprimir
  recibo.style.display = "block";
  setTimeout(() => {
    window.print();
    recibo.style.display = "none";
  }, 100);
}












