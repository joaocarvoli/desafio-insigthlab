import api from '../src/services/api';
import Link from 'next/link'
import Menu from '../components/Menu'

// Essa página está sendo responsável por fazer a pesquisa de um único produto com base no seu nome

const ProductDetails = ({ products, error }) => {
  if (error) {
    return <div>An error occured: {error.message}</div>;
  }

  return (
    <div> 
      <Menu />
      <div className="container">
        <h1>Detalhes do produto</h1>

        <table className="table">
          <tbody>
            <tr>
              <th scope="row">Nome</th>
              <td>{products.Nome}</td>
            </tr>
            <tr>
              <th scope="row">Descrição</th>
              <td>{products.Descricao}</td>
            </tr>
            <tr>
              <th scope="row">Valor</th>
              <td>{products.Valor}</td>
            </tr>
            <tr>
              <th scope="row">Quantidade</th>
              <td>{products.Quantidade}</td>
            </tr>
          </tbody>
        </table>
        <Link href="/product/listproducts"><button className="btn btn-primary">Voltar</button></Link>
      </div>
    </div>
  )
}

ProductDetails.getInitialProps = async ({ query }) => {
  var q = ""
  if (query.details != 'favicon.ico') {
    q = query.details
  }
  console.log(q)
  try {
    const res = await api.get(`api/products/list?nome=${q}`);
    const products = res.data;
    return { products };
  } catch (error) {
    return { error };
  }
};

export default ProductDetails;