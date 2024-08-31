import axios from 'axios';

const API_URL = 'https://parseapi.back4app.com/Classes/ambientes';
const APP_ID = ''; // Coloque o Application ID aqui
const API_KEY = ''; // Coloque a API Key aqui

export const fetchAmbientes = async (nome?: string) => {
    const query = nome ? `?where={"nome":"${nome}"}` : '';
    try {
        const response = await axios.get(`${API_URL}${query}`, {
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
