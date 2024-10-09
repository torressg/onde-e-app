// @ts-ignore
import dijkstra from 'dijkstrajs';
import axios from 'axios';
import { API_KEY, API_URL_ROTAS, APP_ID } from '@/shared/Config';

// Definições de tipos para o GeoJSON
type GeoJsonFeature = {
    type: 'Feature';
    properties: {
        message?: string;
        iconSize?: number[];
    };
    geometry: {
        type: 'Point' | 'LineString';
        coordinates: [number, number] | [number, number][];
    };
};

type GeoJsonType = {
    type: 'FeatureCollection';
    features: GeoJsonFeature[];
};

type GraphType = {
    [key: string]: {
        [key: string]: number;
    };
};

const graph: GraphType = require('../../public/data/grafos.json');

// Função para encontrar o caminho mais curto usando Dijkstra
function findRoute(startNode: string, endNode: string): string[] {
    const formattedGraph: GraphType = {};

    Object.keys(graph).forEach(node => {
        formattedGraph[node] = {};
        Object.keys(graph[node]).forEach(neighbor => {
            formattedGraph[node][neighbor] = graph[node][neighbor];
        });
    });

    // Encontra o caminho mais curto usando dijkstrajs
    const caminho: string[] = dijkstra.find_path(formattedGraph, startNode, endNode);
    return caminho;
}

// Função para buscar as coordenadas no Back4App por nome
async function getCoordinatesByNames(names: string[]): Promise<[number, number][]> {
    const coordinates: [number, number][] = [];

    for (const name of names) {
        try {
            const response = await axios.get(`${API_URL_ROTAS}?where={"Name":"${name}"}`, {
                headers: {
                    'X-Parse-Application-Id': APP_ID,
                    'X-Parse-REST-API-Key': API_KEY,
                },
            });

            const results = response.data.results;
            if (results.length > 0) {
                const coord = results[0].Coordinates;

                // Verifica se o formato está correto
                if (Array.isArray(coord) && coord.length === 2) {
                    coordinates.push([coord[0], coord[1]]);
                } else {
                    console.error(`Coordenadas inválidas para o ponto: ${name}`, coord);
                }
            }
        } catch (error) {
            console.error(`Erro ao buscar coordenadas para o ponto: ${name}`, error);
        }
    }

    return coordinates;
}

// Função para montar o GeoJSON
function makeGeoJSON(coordinates: [number, number][]): GeoJsonType {
    const features: GeoJsonFeature[] = [];

    // Verifica se as coordenadas são válidas
    if (!Array.isArray(coordinates) || coordinates.length < 2) {
        throw new Error('Coordenadas inválidas');
    }

    // Adiciona o ponto de início com ícone personalizado
    features.push({
        type: 'Feature',
        properties: {
            message: 'Início',
            iconSize: [50, 50]
        },
        geometry: {
            type: 'Point',
            coordinates: coordinates[0]  // A primeira coordenada [longitude, latitude]
        }
    });

    // Adiciona a linha da rota (LineString)
    features.push({
        type: 'Feature',
        geometry: {
            type: 'LineString',
            coordinates: coordinates  // As coordenadas obtidas [longitude, latitude]
        },
        properties: {}  // Propriedades vazias para a linha
    });

    // Adiciona o ponto de fim com ícone personalizado
    features.push({
        type: 'Feature',
        properties: {
            message: 'Destino',
            iconSize: [50, 50]
        },
        geometry: {
            type: 'Point',
            coordinates: coordinates[coordinates.length - 1]  // Última coordenada [longitude, latitude]
        }
    });

    return {
        type: 'FeatureCollection',
        features
    };
}

// Função principal para encontrar o caminho e gerar o GeoJSON
export async function calculateRouteAndGeoJSON(startNode: string, endNode: string): Promise<GeoJsonType | undefined> {
    try {
        // 1. Encontrar o caminho mais curto
        const route = findRoute(startNode, endNode);

        // 2. Buscar as coordenadas dos nomes do caminho
        const coordinates = await getCoordinatesByNames(route);

        // 3. Montar o GeoJSON com as coordenadas
        const geoJson = makeGeoJSON(coordinates);

        return geoJson;
    } catch (error) {
        console.error('Erro ao calcular o caminho e gerar o GeoJSON:', error);
    }
}
