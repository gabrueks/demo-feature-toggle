import axios from 'axios';

export const API_URL = 'http://localhost:8080';

const apiInstance = axios.create({ baseURL: API_URL, timeout: 30000 });

export default apiInstance;
