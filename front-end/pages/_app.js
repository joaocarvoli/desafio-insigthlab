import 'bootstrap/dist/css/bootstrap.css'
// Esse é o avô responsável por gerenciar todas as páginas, ele pega todos os componentes.

// Quando esse _app.js é usado, por padrão estamos desabilitando a capacidade de renderização automática do lado do cliente
// e passamos o trabalho para o servidor que será o responsável por fazer a renderização DE CADA PÁGINA, gerar um HTML simples e enviar 
// para o cliente. SERVER SIDE RENDER


export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}
