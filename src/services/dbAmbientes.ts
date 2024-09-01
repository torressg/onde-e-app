import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const APP_ID = process.env.NEXT_PUBLIC_APP_ID;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

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