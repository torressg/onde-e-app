const dijkstra = require('dijkstrajs');
const axios = require('axios');

import { API_KEY, API_URL_ROTAS, APP_ID } from '@/shared/Config';


const graph = require('../../public/data/grafos.json');

// Função para encontrar o caminho mais curto usando Dijkstra
function encontrarCaminho(startNode, endNode) {
    // Formata o grafo para ser usado no Dijkstra.js
    const formattedGraph = {};
    Object.keys(graph).forEach(node => {
        formattedGraph[node] = {};
        Object.keys(graph[node]).forEach(neighbor => {
            formattedGraph[node][neighbor] = graph[node][neighbor];
        });
    });

    // Encontra o caminho mais curto usando dijkstrajs
    const caminho = dijkstra.find_path(formattedGraph, startNode, endNode);
    return caminho;
}

// Função para buscar as coordenadas no Back4App por nome
async function getCoordinatesByNames(names) {
    const coordinates = [];

    // Para cada nome, faz uma requisição ao Back4App
    for (const name of names) {
        try {
            const response = await axios.get(`${API_URL_ROTAS}?where={"Name":"${name}"}`, {
                headers: {
                    'X-Parse-Application-Id': APP_ID,
                    'X-Parse-REST-API-Key': API_KEY,
                },
            });

            // Verifica se encontrou resultados
            const results = response.data.results;
            if (results.length > 0) {
                const coord = results[0].Coordinates; // Pega a coluna "Coordinates"
                coordinates.push(coord); // Adiciona ao array de coordenadas
            } else {
            }
        } catch (error) {
            console.error(`Erro ao buscar coordenadas para o ponto: ${name}`, error);
        }
    }

    return coordinates;
}

// Função para montar o GeoJSON com as coordenadas obtidas
function montarGeoJSON(coordinates) {
    return {
        'type': 'FeatureCollection',
        'features': [
            {
                'type': 'Feature',
                'geometry': {
                    'type': 'LineString',
                    'properties': {},
                    'coordinates': coordinates // As coordenadas obtidas
                }
            }
        ]
    };
}

// Função principal para encontrar o caminho e gerar o GeoJSON
export async function calcularCaminhoEGeoJSON(startNode, endNode) {
    try {
        // 1. Encontrar o caminho mais curto
        const caminho = encontrarCaminho(startNode, endNode);

        // 2. Buscar as coordenadas dos nomes do caminho
        const coordinates = await getCoordinatesByNames(caminho);

        // 3. Montar o GeoJSON com as coordenadas
        const geoJson = montarGeoJSON(coordinates);
        return geoJson;
    } catch (error) {
        console.error('Erro ao calcular o caminho e gerar o GeoJSON:', error);
    }
}