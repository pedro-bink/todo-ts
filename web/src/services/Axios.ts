import axios from 'axios';

var url = `https://todo-ts-be.up.railway.app/`;
export const requestAPI = axios.create({
  baseURL: url,
});
