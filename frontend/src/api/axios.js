import axios from 'axios';

export const backendUrl = import.meta.env.VITE_BACKEND_URL;
console.log("backendUrl", backendUrl);

const instance = axios.create({
    baseURL: `${backendUrl}/api`,
    timeout: 20000,
    headers: {
        'Content-Type': 'application/json',
    },
    });

export default instance;