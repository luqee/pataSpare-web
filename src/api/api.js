import axios from 'axios';
import urls from '../config/config';

export default axios.create({
  baseURL: urls.baseURL,
  headers: {'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest'}
});