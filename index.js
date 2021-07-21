const express = require("express");           // A const ao invés de var é usado para evitar a sobrescrita de dados
const bodyParser = require("body-parser");
const cors = require("cors");

// O protocolo HTTP é responsável por fazer a comunicação do cliente com os servidores de sites.
// Pedir, enviar e receber dados são operações possíveis através desse protocolo 

const app = express(); // Instanciando uma cópia de todo o framework para a variável app
// O express é um framework minimalista (!= fullstack) usado para a criação de aplicações web usando o node

var corsOptions = {
  origin: "http://localhost:8081" 
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Chamando as rotas
require("./routes/Products.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080; // 8080 é um número de porta local para a aplicação rodar no node.
//  Se outro programa usar a mesma porta haverá um erro
app.listen(PORT, () => {               // O listen é responsável por colocar o servidor no ar
  console.log(`Server is running on port ${PORT}.`);
});
// A mensagem está rodando através de uma função de callback que é executada sempre que algum evento específico acontece.