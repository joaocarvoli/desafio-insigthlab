module.exports = app => {
    const produto = require('../controllers/ProductsController');
  
    // rota
    var router = require("express").Router();
  
    // Cadastrar produto
    router.post("/cadastrar", produto.cadastrarProduto);
  
    //Listar produtos
    router.get("/listar", produto.listarProdutos);
  
    // Editar produto
    //router.put("/editar", produto.editarProduto);
  
    // Excluir produto
    //router.delete("/excluir", produto.excluirProduto);
  
    app.use('/api/produtos', router);
}