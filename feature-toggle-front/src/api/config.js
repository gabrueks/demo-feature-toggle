import axios from 'axios';

export const API_URL = 'https://feature-toggle-backend.herokuapp.com/';

const apiInstance = axios.create({ baseURL: API_URL, timeout: 30000 });

export default apiInstance;
