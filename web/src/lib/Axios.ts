import axios from 'axios';

var url = `http://localhost:5000`;
export const requestAPI = axios.create({
  baseURL: url,
});
