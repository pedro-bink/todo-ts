import axios from 'axios';

var url = `http://localhost:3000`;
export const requestAPI = axios.create({
  baseURL: url,
});
