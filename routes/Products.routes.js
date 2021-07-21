module.exports = app => {
    const produto = require('../controllers/ProductsController');
  
    // rota
    var router = require("express").Router();
  
    // Cadastrar produto
    router.post("/cadastrar", produto.InsertingSheet);
  
    //Listar produtos
    router.get("/listar", produto.SearchInSheet);
  
    // Editar produto
    //router.put("/editar", produto.editarProduto);
  
    // Excluir produto
    router.delete("/excluir", produto.DeletingInSheet);
  
    app.use('/api/produtos', router);
}