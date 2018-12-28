import axios from 'axios';

import { API_TOKEN } from './secrets';

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
    },
    google_sheets() {
        return {
            getLocation: (locationName) => api.get(
                `/get_climbing_sheet`,
                {
                    params: {locationName: locationName},
                    headers: getDefaultHeader().headers
                }
            )
        }
    }
}

function getDefaultHeader() {
    return {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': API_TOKEN,
        }
    }
}