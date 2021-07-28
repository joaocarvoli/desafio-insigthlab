import api from '../../src/services/api';
import Menu from '../../components/Menu'
import Link from 'next/link'

// Esse arquivo com as listagem de produtos precisou ser criado dentro de uma outra pasta
// pois se usássemos ele no diretório anterior teríamos conflito devido as rotas dinâmicas (as queries)
// que estão sendo usadas para a pesquisa de valores dentro da planilha.
const ProductList = ({ products, error }) => {
  if (error) {
    return <div>An error occured: {error.message}</div>
  }

  async function deleteProduct(nome) {
    await api.delete(`/api/products/delete?nome=${nome}`).then(res => {
      alert("Produto apagado com sucesso")
    }).catch(err => {
      console.log(err)
    })
  }

  return (
    <>
      <Menu />
      <div className="container">
        <h1>Lista de produtos</h1>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Nome</th>
              <th scope="col">Valor</th>
              <th scope="col">Qtd</th>
              <th scope="col">Ações</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.nome}>
                <td>{product.nome}</td>
                <td>R$ {product.valor}</td>
                <td style={product.quantidade < 0 && {backgroundColor: 'red'}}>{product.quantidade}</td>
                <td>
                  <Link href={`/${product.nome}`}><button className="btn btn-primary text-white btn-small">Ver</button></Link>
                  &nbsp;<button className="btn btn-danger btn-small ml-3" onClick={() => deleteProduct(product.nome)}>Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

ProductList.getInitialProps = async ctx => {
  try {
    const res = await api.get('api/products/listAll');
    const products = res.data;
    
    return { products };
  } catch (error) {
    return { error };
  }
};

export default ProductList;
