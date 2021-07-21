// -------------------------------------------------- CONEXÃO COM A API -----------------------------------------------


const GoogleSpreadsheet = require('google-spreadsheet')          // Importando o nosso módulo
const credentials = require('../credentials.json')                    // Importando as nossas credenciais
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
    await promisify (worksheet.addRow)({idProd: identificador, descricao: descr, preco: prec, quantidade: qtd})       
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


// ------------------------------------------------ EXPORTS ------------------------------------------------------------

// As funções abaixo são responsáveis por exportar as funções para que elas possam ser usadas em outros arquivos
// se isso não for feito, nossas funções ficarão limitadas a esse arquivo e não poderão ser usadas nas rotas.



exports.SearchInSheet = async (req, res) => {
    const doc = new GoogleSpreadsheet(docId)
    await promisify(doc.useServiceAccountAuth)(credentials)
    const info = await promisify(doc.getInfo)()
    const worksheet = info.worksheets[0]
    const rows = await promisify(worksheet.getRows)({
        query: `identificador = ${identificador}` // esse identificador é o id do produto
    })
    res.status(200).send(rows.valor); // Mostrando um retorno e esse é o produto que foi buscado pelo vendedor
};



exports.InsertingSheet = async() => {
    const doc = new GoogleSpreadsheet(docId)
    await promisify(doc.useServiceAccountAuth)(credentials)
    const worksheet = info.worksheets[0]
    const rows = await promisify(worksheet.getRows)({})

    //Adicionando novos elementos
    await promisify (worksheet.addRow)({idProd: identificador, descricao: descr, preco: prec, quantidade: qtd})
    // Precisa de algum res sendo que é uma inserção? 
}


exports.DeletingInSheet = async() => {
    const doc = new GoogleSpreadsheet(docId)
    await promisify(doc.useServiceAccountAuth)(credentials)
    const worksheet = info.worksheets[0]
    const rows = await promisify(worksheet.getRows)({
        query: `identificador = ${identificador}` // esse identificador é o id do produto
    })

    rows.forEach(row => {
        row.del()
    }) 
}












