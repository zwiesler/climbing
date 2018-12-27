import axios from 'axios';

const API_URL = 'http://localhost:5000/api';
export const api = axios.create({
    baseURL: API_URL,
    timeout: 600000
});

export default {
    locations() {
        return {
            getAll: () => api.get(`/locations`, getDefaultHeader()),
            getLocationCoordinates: (locationName) => api.get(
                `/get_location_coordinates`,
                {
                    params: {location_name: locationName},
                    headers: getDefaultHeader().headers
                    },
            )
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