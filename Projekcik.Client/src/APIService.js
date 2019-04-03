import axios from 'axios';

const API_URL = "https://projekcik-prz.azurewebsites.net";

export default class APIService {

    static get (address) {

        const authHeader = {
            headers: { 
                'Authorization': `Bearer ${window.localStorage.getItem('token')}`
            }
        };

        return axios.get(`${API_URL}/${address}`, authHeader)
        .then(response => response.data);
    }

    static post (address, data) {
        return axios.post(`${API_URL}/${address}`, data)
        .then(response => response.data);
    }
};
