'use client';

import { useEffect } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

const FullScreenMap = ({ geoJson }: { geoJson: any }) => {
    useEffect(() => {
        const mapInstance = new maplibregl.Map({
            container: 'map',
            style: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json',
            center: [-46.57924457368841, -23.618155335655388], // Coordenadas iniciais
            zoom: 18, // Ajuste o zoom inicial
            minZoom: 18,
            maxZoom: 20,
            pitch: 20, // Inclinação para uma visão 3D
        });

        mapInstance.on('load', () => {
            // Adiciona a camada de prédios (3D)
            mapInstance.addSource('geojson1', {
                type: 'geojson',
                data: '/data/uscsAmbientesMap.geojson'
            });

            mapInstance.addLayer({
                id: 'geojson3d-layer',
                type: 'fill-extrusion',
                source: 'geojson1',
                layout: {},
                paint: {
                    'fill-extrusion-color': '#F8A801',
                    'fill-extrusion-height': 5,
                    'fill-extrusion-base': 1,
                    'fill-extrusion-opacity': 1,
                }
            });

            // Adiciona a camada de circulação
            mapInstance.addSource('geojson2', {
                type: 'geojson',
                data: '/data/uscsCirculacaoMap.geojson'
            });

            mapInstance.addLayer({
                id: 'geojson2-layer',
                type: 'fill',
                source: 'geojson2',
                layout: {},
                paint: {
                    'fill-color': '#888888',
                    'fill-opacity': 1,
                }
            }, 'geojson3d-layer');

            // Adicionar rota como linha no mapa
            if (geoJson) {
                mapInstance.addSource('route', {
                    type: 'geojson',
                    data: geoJson // O GeoJSON da rota
                });

                mapInstance.addLayer({
                    id: 'route-layer',
                    type: 'line',
                    source: 'route',
                    layout: {
                        'line-join': 'round',
                        'line-cap': 'round',
                    },
                    paint: {
                        'line-color': '#ff0000', // Cor da linha
                        'line-width': 4,
                    }
                });
            }
        });

        return () => mapInstance.remove();
    }, [geoJson]); // Atualiza quando o geoJson muda

    return (
        <div>
            <div id="map" style={{ width: '100vw', height: '100vh' }}></div>
        </div>
    );
};

export default FullScreenMap;
