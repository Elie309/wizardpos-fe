import axios from "axios";


const api = axios.create({
    baseURL: 'http://localhost:8080/api/',
    timeout: 1000,
    headers: {
        'Content-Type': 'application/form-data',
        'Accept': 'application/json',
    }
});


export default api;