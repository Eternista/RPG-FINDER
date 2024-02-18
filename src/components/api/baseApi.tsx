import axios, {AxiosResponse} from 'axios';

const apiUrl = 'http://rpg-finder.local/wp-json/wp/v2';

export const baseApi = (endpoint : string) => {
    return axios.get(`${apiUrl+endpoint}`)
        .then((response: AxiosResponse) => {
            return response.data;
        })
        .catch((error) => {
            console.log('Connection Error:', error)
            return error;
        })
}