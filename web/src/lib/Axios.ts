import axios from "axios";

export const requestAPI = axios.create({baseURL: "http://localhost:5000"})