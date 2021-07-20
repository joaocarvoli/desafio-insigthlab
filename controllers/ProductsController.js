const GoogleSpreadsheet = require('google-spreadsheet')          // Importando o nosso módulo
const credentials = require('../credentials.json')                    // Importando as nossas credenciais
const { promisify } = require('util')                           // Promisificando para tornar o código mais simples de ser escrito

const docId = '1Lxp6zToNLQ826BmD9DkFJkyOi3DBQan5vnIQK0GCwWc'    // Identificador da nossa planilha
const doc   = new GoogleSpreadsheet(docId)                      // Citando o documentado que será acessado

/* Antes de fazer o promisify

doc.useServiceAccountAuth(credentials, err => { // Acessando a planilha
    doc.getInfo((err, info) => {
        console.log(info) // Mostrando informações sobre a planilha
    })
    console.log('err', err) //  Caso não seja possível, o acesso, um erro é retornado
}) 

*/

var identificador = 55
var descr = 'Creme de barbear'
var prec = 31
var qtd = 10

var id_test = 1

const accessSheet = async() => {
    const doc = new GoogleSpreadsheet(docId)
    await promisify(doc.useServiceAccountAuth)(credentials)
    const info = await promisify(doc.getInfo)() // Obtendo as mesmas informações sobre a planilha que havia sido mostrada acima
    const worksheet = info.worksheets[0]
    const rows = await promisify(worksheet.getRows)({
        query: `identificador = ${id_test}` // Usando essa query para fazer busca mas não foi possível acessar o valor de uma variável   
    })

    //console.log(rows)

    // Lendo colunas da planilha
    /*rows.forEach(row => {
        console.log('A descrição do produto é: ' + row.descricao + '\n' + 'O seu valor é: '+ row.valor + '\n' + 'A quantidade de itens é: ' + row.quantidade)
    }) */

    /* Adicionando novos elementos
        await promisify (worksheet.addRow)({idProd: identificador, descricao: descr, preco: prec, quantidade: qtd})    
    */

    rows.forEach(row => {
        console.log(row.descricao)
    })  
}

//accessSheet()


const InsertingSheet = async() => {
    const doc = new GoogleSpreadsheet(docId)
    await promisify(doc.useServiceAccountAuth)(credentials)
    const info = await promisify(doc.getInfo)() // Obtendo as mesmas informações sobre a planilha que havia sido mostrada acima
    const worksheet = info.worksheets[0]
    const rows = await promisify(worksheet.getRows)({})

    //Adicionando novos elementos
    await promisify (worksheet.addRow)({idProd: identificador, descricao: descr, preco: prec, quantidade: qtd})    

    rows.forEach(row => {
        console.log(row.descricao)
    })   
}

// InsertingSheet()


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












