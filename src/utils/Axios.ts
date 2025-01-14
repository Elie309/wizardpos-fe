import axios from "axios";

export var BASE_URL = "https://posadmin.eliesaade.dev/"

const api = axios.create({
    baseURL: BASE_URL +'api/',
    timeout: 2000,
    headers: {
        'Content-Type': 'application/form-data',
        'Accept': 'application/json',
    }
});


api.interceptors.request.use(
    config => {
        const token = sessionStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        Promise.reject(error);
    }
);

// api.interceptors.response.use(
//     response => {
//         return response;
//     },
//     error => {
//         if (error.response.status === 401) {
//             window.location.href = '/login';
//         }
//         return Promise.reject(error);
//     }
// );


export default api;