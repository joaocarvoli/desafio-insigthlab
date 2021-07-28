import 'bootstrap/dist/css/bootstrap.css'
// Esse é avô responsável por gerenciar todas as páginas, ele pega todos os componentes.


export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}
