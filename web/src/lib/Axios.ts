import axios from 'axios';

var port = 5000;
var url = `http://localhost:/${port}`;
export const requestAPI = axios.create({
  baseURL: url,
});
