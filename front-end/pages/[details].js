import api from '../src/services/api';
import Link from 'next/link'
import Menu from '../components/Menu'

// Essa página está sendo responsável por fazer a pesquisa de um único produto com base no seu nome
// A requisição feita por essa página acontece quando ao listarmos um produto, temos a opção de ver e
// quando clicamos são mostradas mais informações sobre um determinado produto.

const ProductDetails = ({ products, error }) => {
  if (error) {
    return <div>An error occured: {error.message}</div>;
  }
  // Logo abaixo nos é retornado uma tabela com as devidas informações que foram solicitadas à API e retornadas.
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
              <td>{"R$ " + products.Valor}</td>
            </tr>
            <tr>
              <th scope="row">Quantidade</th>
              <td>{products.Quantidade + " unidades"}</td>
            </tr>
          </tbody>
        </table>
        <Link href="/product/listproducts"><button className="btn btn-primary">Voltar</button></Link>
      </div>
    </div>
  )
}

// Essa getInitialProps está sendo responsável em pegar o nome do produto que é passado para ela através da url.
// Isso é passado através da url quando nós clicamos em VER em algum determinado produto,
// na página de listar produtos.

ProductDetails.getInitialProps = async ({ query }) => {
  var q = ""
  if (query.details != 'favicon.ico') { // Aqui fazemos esse condicional pois por padrão nos é retornado um JSON
    q = query.details                  // com duas informações sendo que não queremos que essa que é retornada,
  }                                   // vamos usar somente a primeira.
  console.log(q)                     
  try {
    const res = await api.get(`api/products/list?nome=${q}`); // Aqui o nome do produto está sendo passado para ser acessado
    const products = res.data;                                // diretamente na API do Google Sheets através dessa rota.
    return { products };
  } catch (error) {
    return { error };
  }
};

export default ProductDetails;