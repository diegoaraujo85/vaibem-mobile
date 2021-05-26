import axios from 'axios';

import apiConfig from '../config/apiConfig';

const { baseURL } = apiConfig;

const api = axios.create({
  baseURL,
});

export default api;
