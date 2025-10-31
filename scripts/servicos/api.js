import axios from 'axios';

const api = axios.create({
  baseURL: 'https://sua-api.com.br', // substitua pela URL real da sua API
});

export default api;
