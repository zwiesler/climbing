import axios from 'axios';

const API_URL = 'http://localhost:5000/api';
export const api = axios.create({
    baseURL: API_URL,
    timeout: 600000
});

export default {
    locations() {
        return {
            getAll: () => api.get(`/locations`, getDefaultHeader())
        }
    }
}

function getDefaultHeader() {
    return {
        headers: {
            'Content-Type': 'application/json',
        }
    }
}