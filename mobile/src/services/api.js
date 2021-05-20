import axios from 'axios';
import {REACT_APP_API_URL} from '@env';
const api = axios.create({
    baseURL:`http://192.168.0.105:3335`  
});
export default api; 