import axios from 'axios';

// var url = `https://todo-ts-be.up.railway.app/`;
var url = `http://localhost:3002/`;
export const requestAPI = axios.create({
  baseURL: url,
});
