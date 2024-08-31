import axios from 'axios';

const API_URL = 'https://parseapi.back4app.com/Classes/ambientes';
const APP_ID = 'qjpu9raG0VLMuGLhjGEzIipAyQKSPX72kzkNuoLY';
const API_KEY = 'QWzvp6tmC6YbL7AcfhjVkp5QWSeS4UsXTgscSpHX';

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