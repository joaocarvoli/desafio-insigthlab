// -------------------------------------------------- CONEXÃO COM A API -----------------------------------------------


const GoogleSpreadsheet = require('google-spreadsheet')          // Carregando o nosso módulo através do require
const credentials = require('../credentials.json')              // Carreagando nossas credenciais
const { promisify } = require('util')                           // Promisificando para tornar o código mais simples de ser escrito

const docId = '1Lxp6zToNLQ826BmD9DkFJkyOi3DBQan5vnIQK0GCwWc'    // Identificador da nossa planilha
const doc   = new GoogleSpreadsheet(docId)                      // Citando o documentado que será acessado


// -------------------------------------------- FUNÇÕES QUE FAZEM OPERAÇÕES NA PLANILHA ------------------------------------


const SearchInSheet = async() => { // Função responsável por buscar produtos através do seu id
    const doc = new GoogleSpreadsheet(docId)
    await promisify(doc.useServiceAccountAuth)(credentials)
    // const info = await promisify(doc.getInfo)() // Obtendo informações sobre a planilha
    const worksheet = info.worksheets[0]
    const rows = await promisify(worksheet.getRows)({
        query: `identificador = ${id_test}` // Usando essa query para fazer busca através do Id   
    })
    rows.forEach(row => {
        console.log(row.descricao, row.nome) // Mostrando a descrição e o nome do produto
    })  
}


const InsertingSheet = async() => { // Função responsável por inserir um novo produto na nossa planilha
    const doc = new GoogleSpreadsheet(docId)
    await promisify(doc.useServiceAccountAuth)(credentials)
    const worksheet = info.worksheets[0]
    const rows = await promisify(worksheet.getRows)({})

    //Adicionando novos elementos
    await promisify (worksheet.addRow)({idProd: identificador, descricao: descr, preco: prec, quantidade: qtd, nome: nome})       
}


const DeletingInSheet = async() => { // Função responsável por deletar um produto baseado no seu id
    const doc = new GoogleSpreadsheet(docId)
    await promisify(doc.useServiceAccountAuth)(credentials)
    const worksheet = info.worksheets[0]
    const rows = await promisify(worksheet.getRows)({
        query: `identificador = ${id_test}` // Usando essa query para fazer buscar através do Id e excluir esse produto  
    })

    rows.forEach(row => {
        row.del()
    }) 
}



// Falta uma função para deletar uma quantidade de produtos específica. 


// ------------------------------------------------ EXPORTS ------------------------------------------------------------

// As funções abaixo são responsáveis por exportar as funções para que elas possam ser usadas em outros arquivos
// se isso não for feito, nossas funções ficarão limitadas a esse arquivo e não poderão ser usadas nas rotas.



exports.SearchInSheet = async (req, res) => {
    const doc = new GoogleSpreadsheet(docId)
    await promisify(doc.useServiceAccountAuth)(credentials)
    const info = await promisify(doc.getInfo)()
    const worksheet = info.worksheets[0]
    var {nome} = req.query
    const rows = await promisify(worksheet.getRows)({
        query: `nome = ${nome}`
    })
    
    const data = {
        Nome: rows[0].nome,
        Descricao: rows[0].descricao,
        Valor: rows[0].valor, 
        Quantidade: rows[0].quantidade
    }
    res.status(200).send(data); // Mostrando um retorno para o usuário e esse é o produto que foi buscado pelo vendedor
};

exports.ListInSheet = async (req, res) => {
    const doc = new GoogleSpreadsheet(docId)
    await promisify(doc.useServiceAccountAuth)(credentials)
    const info = await promisify(doc.getInfo)()
    const worksheet = info.worksheets[0]
    var {id, nome} = req.query
    const rows = await promisify(worksheet.getRows)({
    })
    
    const data = {
        Nome: rows.nome,
        Identificador: rows.identificador
    }
    res.status(200).send(rows); // Mostrando um retorno para o usuário e esse é o produto que foi buscado pelo vendedor
};



exports.InsertingSheet = async(req, res) => {
    const doc = new GoogleSpreadsheet(docId)
    await promisify(doc.useServiceAccountAuth)(credentials)
    const info = await promisify(doc.getInfo)()
    const worksheet = info.worksheets[0]
    const rows = await promisify(worksheet.getRows)({})

    //Adicionando novos elementos
    const data = {
        nome: req.body.nome,
        descricao: req.body.descricao,
        valor: req.body.valor,
        quantidade: req.body.quantidade
    }

    await promisify (worksheet.addRow)(data)
    res.status(201).send({message:'The product was successfully registered'}); 
}


exports.DeletingInSheet = async(req, res) => {
    const doc = new GoogleSpreadsheet(docId)
    await promisify(doc.useServiceAccountAuth)(credentials)
    const info = await promisify(doc.getInfo)()
    const worksheet = info.worksheets[0]
    var {nome} = req.query
    const rows = await promisify(worksheet.getRows)({
        query: `nome = ${nome}`        // Por enquanto, apenas essa query funciona
    })

    rows.forEach(row => {
        row.del()
    })
    res.status(201).send({message:'The product was successfully deleted'}); 
}












