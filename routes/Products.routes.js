// As rotas são como caminhos para a nossa aplicação. 
// Uma rota para o cadastro, outra para a listagem de produtos, uma para deletar produtos...
module.exports = app => {
    const products = require('../controllers/ProductsController');
  
    // rota
    var router = require("express").Router();
  
    // Cadastrar produto
    router.post("/cadastrar", products.InsertingSheet);
  
    //Listar produtos
    router.get("/listar", products.SearchInSheet);
  
    // Editar produto
    //router.put("/editar", produto.editarProduto);
  
    // Excluir produto
    router.delete("/excluir", products.DeletingInSheet);
  
    app.use('/api/products', router);
}