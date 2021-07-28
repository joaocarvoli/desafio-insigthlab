import axios from "axios";

// Criando um url base para não ser preciso digitar em cada requisição

const api = axios.create({
  baseURL: "http://localhost:8080",
});

export default api;