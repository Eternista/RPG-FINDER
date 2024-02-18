import axios, {AxiosResponse} from 'axios';

const apiUrl = 'http://rpg-finder.local/wp-json/pages/v1';

export const pageApi = (endpoint : string) => {
    return axios.get(`${apiUrl+endpoint}`)
        .then((response: AxiosResponse) => {
            return response.data;
        })
        .catch((error) => {
            console.log('Connection Error:', error)
            return error;
        })
}