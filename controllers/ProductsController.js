const GoogleSpreadsheet = require('google-spreadsheet')          // Importando o nosso módulo
const credentials = require('../credentials.json')                    // Importando as nossas credenciais
const { promisify } = require('util')                           // Promisificando para tornar o código mais simples de ser escrito

const docId = '1Lxp6zToNLQ826BmD9DkFJkyOi3DBQan5vnIQK0GCwWc'    // Identificador da nossa planilha
const doc   = new GoogleSpreadsheet(docId)                      // Citando o documentado que será acessado


const SearchInSheet = async() => {
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


const InsertingSheet = async() => {
    const doc = new GoogleSpreadsheet(docId)
    await promisify(doc.useServiceAccountAuth)(credentials)
    const worksheet = info.worksheets[0]
    const rows = await promisify(worksheet.getRows)({})

    //Adicionando novos elementos
    await promisify (worksheet.addRow)({idProd: identificador, descricao: descr, preco: prec, quantidade: qtd})       
}

const DeletingInSheet = async() => {
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



// PAREI AQUI...

exports.listarProdutos = async (req, res) => {
    const doc = new GoogleSpreadsheet(docId)
    await promisify(doc.useServiceAccountAuth)(credentials)
    const info = await promisify(doc.getInfo)() // Obtendo as mesmas informações sobre a planilha que havia sido mostrada acima
    const worksheet = info.worksheets[0]
    const rows = await promisify(worksheet.getRows)({
        //query: `identificador = ${id_test}` // Usando essa query para fazer busca mas não foi possível acessar o valor de uma variável   
    })
    res.status(200).send(rows.valor);
};


exports.cadastrarProduto = (req, res) => {
    res.status(201).send(req.body)
};












