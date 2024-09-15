import axios from 'axios';
import { API_KEY, API_URL, APP_ID } from '@/shared/Config';

export const fetchAmbientes = async () => {
    try {
        const response = await axios.get(`${API_URL}`, {
            headers: {
                'X-Parse-Application-Id': APP_ID,
                'X-Parse-REST-API-Key': API_KEY,
                'Content-Type': 'application/json',
            },
        });
        return response.data.results;
    } catch (error) {
        console.error('Erro ao buscar ambientes:', error);
        throw error;
    }
};