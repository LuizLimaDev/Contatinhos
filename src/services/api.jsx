import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api-contacts.pedagogico.cubos.academy',
  timeout: 10000,
  headers: { 'Content-Type': 'Application/json' }
});

export default api;