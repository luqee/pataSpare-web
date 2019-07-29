import axios from 'axios';
import urls from '../config/config';

const autoAPI = axios.create({
  baseURL: urls.baseURL,
  headers: {'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest'}
});

export default autoAPI;