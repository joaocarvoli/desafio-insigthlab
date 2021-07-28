import api from '../../src/services/api';
import Menu from '../../components/Menu'
import Link from 'next/link'

import {useState} from 'react'

const ProductCreate = () => {
  const [nome, setNome] = useState('')
  const [valor, setValor] = useState('')
  const [quantidade, setQuantidade] = useState('')
  const [descricao, setDescricao] = useState('')

  async function sendData() {
    const data = {
      nome: nome,
      valor: valor,
      quantidade: quantidade,
      descricao: descricao,
    }

    await api.post('/api/products/register', data).then(res => {
      Alert("Produto cadastrado com sucesso")
    }).catch(err => {
      console.log(err)
    })
  }

  return (
    <>
      <Menu />
      <div className="container">
        <h1>Cadastrar produto</h1>
        <div className="row mt-2">
          <div className="col-6">
            <div className="mb-3">
              <label for="nome" className="form-label">Nome do produto</label>
              <input type="text" className="form-control" onChange={(e) => setNome(e.target.value)} id="nome" placeholder="Bolacha recheada" />
            </div>  
          </div>
          <div className="col-2">
            <div className="mb-3">
              <label for="valor" className="form-label">Valor do produto</label>
              <input type="number" className="form-control" onChange={(e) => setValor(e.target.value)}  id="valor" placeholder="Valor" />
            </div>  
          </div>
          <div className="col-4">
            <div className="mb-3">
              <label for="quantidade" className="form-label">Quantidade</label>
              <input type="number" className="form-control" id="quantidade" onChange={(e) => setQuantidade(e.target.value)} placeholder="Quantidade" />
            </div>  
          </div>
        </div>
        <div className="mb-3">
          <label for="descricao" className="form-label">Descrição</label>
          <textarea className="form-control" id="descricao" rows="3" onChange={(e) => setDescricao(e.target.value)} placeholder="Descrição do produto"></textarea>
        </div>
        {nome != '' &&  valor != '' && quantidade != '' && descricao != '' ? (
          <button className="btn btn-primary" onClick={() => sendData()}>Cadastrar produto</button>
        ) : (
          <button className="btn btn-primary disabled" disabled='disabled'>Cadastrar produto</button>
        )}&nbsp;
        <button className="btn btn-danger">Voltar</button>
      </div>
    </>
  )
}

export default ProductCreate;