import axios from 'axios';
axios.defaults.baseURL = window['api_endpoint'];

const AuthApi = {
    getBreedList(requestData) {
        const endpoint = '/v1/breeds';
        const headerConfig = {
            headers: {
                'x-api-key': requestData.apiKey
            }
        }
        return axios(endpoint, headerConfig);
    },

    getBreedDetails(requestData) {
        const endpoint = `/v1/images/search?breed_id=${requestData.id}`;
        const headerConfig = {
            headers: {
                'x-api-key': requestData.apiKey
            }
        }
        return axios(endpoint, headerConfig);
    }
}

export default AuthApi;