// As rotas são como caminhos para a nossa aplicação. 
// Uma rota para o cadastro, outra para a listagem de produtos, uma para deletar produtos...
module.exports = app => {
    const products = require('../controllers/ProductsController'); 
  
    // Métodos de requisição HTTP
    var router = require("express").Router();
  
    // Cadastrar produto
    router.post("/register", products.InsertingSheet); // Esse método é utilizado para submeter uma entidade (o próprio navegador) 
    // a um recurso específico, frequentemente causando uma mudança no estado do recurso ou efeitos colaterais no servidor. (definição formal)
  
    //Listar produtos
    router.get("/list", products.SearchInSheet); // Esse método é responsável por fazer solicitações específicas e
    //  deve receber como retorno, apenas dados.
  
    // Editar produto
    //router.put("/edit", produto.editarProduto); // Ainda não foi possível encontrar na API essa função.
  
    // Excluir produto
    router.delete("/delete", products.DeletingInSheet); // Esse método é responsável por remover algum recurso específico.
  
    app.use('/api/products', router);
}