import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5172/' });

export default API;
