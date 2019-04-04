import APIService from './APIService';


export default class AuthService {

    static register (userData) {
        return APIService.post('api/Auth/register', userData);
    }

    static login (userData) {
        return APIService.post('api/Auth/authenticate', userData);
    }

    static logout () {
        window.localStorage.clear();
    }
};