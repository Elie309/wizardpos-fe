import axios from "axios";


const api = axios.create({
    baseURL: 'http://34.155.85.219/api/',
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