import axios from 'axios';

const API_URL = "https://projekcik-prz.azurewebsites.net";

export default class APIService {

    static get (address) {

        let token = window.localStorage.getItem('token')
        const authHeader = {
            headers: { 
                'Authorization': `Bearer ${token}`
            }
        };

        return axios.get(`${API_URL}/${address}`, authHeader)
        .then(response => response.data);
    }

    static post (address, data) {
        
        let token = window.localStorage.getItem('token');
        const authHeader = {
            headers: { 
                'Authorization': `Bearer ${token}`
            }
        };

        return axios.post(`${API_URL}/${address}`, data, authHeader)
        .then(response => response.data);
    }
};
