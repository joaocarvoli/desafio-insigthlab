const express = require("express");           // A const ao invés de var é usado para evitar a sobrescrita de dados 
const bodyParser = require("body-parser");     // Esse módulo é responsável por extrair toda a parte do corpo de um fluxo de solicitação e isso é exposto em req.boy. 
// Ele analisa os dados codificados em JSON... enviados pela solicitação HTTP POST 
const cors = require("cors");                 // Esse módulo é responsável por fazer requisições de um website para outro no navegador

// O protocolo HTTP é responsável por fazer a comunicação do cliente com os servidores de sites.
// Pedir, enviar e receber dados são operações possíveis através desse protocolo 


const app = express(); // Instanciando uma cópia de todo o framework para a variável app
// O express é um framework minimalista (!= fullstack) usado para a criação de aplicações web usando o node

var corsOptions = {                          // Permissão para requisitar os dados da API
  origin: "http://localhost:3000" 
}; 

app.use(cors(corsOptions));                 // DÚVIDA: Oq isso está fazendo?


app.use(bodyParser.json());                // Esse use avisa ao sistema que você quer usar os arquivos JSON

app.use(bodyParser.urlencoded({ extended: true }));  // DÚVIDA: Oq isso está fazendo?


// Chamando as rotas
require("./routes/Products.routes")(app);

// Variável de ambiente
const PORT = process.env.PORT || 8080; // É passado a porta do ambiente mas se não houver nada, a 8080 é passada como a porta para o servidor.
// 8080 é um número de porta local para a aplicação rodar no node.
//  Se outro programa usar a mesma porta haverá um erro
app.listen(PORT, () => {               // O listen é responsável por colocar o servidor no ar
  console.log(`Server is running on port ${PORT}.`);
});
// A mensagem está rodando através de uma função de callback que é executada sempre que algum evento específico acontece.
