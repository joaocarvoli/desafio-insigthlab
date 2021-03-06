import Head from 'next/head' // Aqui, está sendo importado a função de cabeçalho do next
import Link from 'next/link' // O link que é responsável por permitir que usémos rotas como links
// para quando formos usar a nossa navbar do bootstrap


// Esse arquivo Menu é um componente. Os componentes são renderizados em todas as páginas, ou seja, eles aparecem em todas páginas.
// O navbar é importado direto do bootstrap e já vem "construído" no link: https://getbootstrap.com/docs/5.0/components/navbar/
// O navbar é responsivo por padrão.

export default function Menu() {
  return (
    <>
      <Head>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"></script>
      </Head>
      <nav className="navbar navbar-expand-lg navbar-light bg-light mb-2">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Fast Search</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
              <li className="nav-item">
              <Link href="/"><a className="nav-link" aria-current="page">Inicio</a></Link>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Produto
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                  <li><Link href="/product/listproducts"><a className="dropdown-item">Listar Produtos</a></Link></li>
                  <li><Link href="/product/create"><a className="dropdown-item">Cadastrar Produto</a></Link></li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}