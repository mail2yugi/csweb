import axios from 'axios';
axios.defaults.baseURL = window['api_endpoint'];

const AuthApi = {
    getAppKey() {
        return axios("/assets/config.json");
    },
}

export default AuthApi;