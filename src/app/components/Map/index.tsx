'use client'

import { useEffect } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { FeatureCollection, Geometry, Point, Polygon, MultiPolygon } from 'geojson';

const FullScreenMap = () => {

    useEffect(() => {
        const mapInstance = new maplibregl.Map({
            container: 'map',
            style: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json',
            center: [0, 0],
            zoom: 2
        });

        mapInstance.on('load', () => {
            // Adicione o primeiro GeoJSON
            mapInstance.addSource('geojson1', {
                type: 'geojson',
                data: '/data/uscsAmbientesMap.geojson'
            });

            mapInstance.addLayer({
                id: 'geojson1-layer',
                type: 'fill',
                source: 'geojson1',
                layout: {},
                paint: {
                    'fill-color': '#888888',
                    'fill-opacity': 0.5
                }
            });

            // Adicione o segundo GeoJSON
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
                    'fill-color': '#FF0000',
                    'fill-opacity': 0.5
                }
            });

            // Ajuste o foco do mapa para o bounding box dos dois GeoJSONs
            const bounds = new maplibregl.LngLatBounds();

            const extendBounds = (geometry: Geometry) => {
                if (geometry.type === 'Polygon' || geometry.type === 'MultiPolygon') {
                    const coords = geometry.coordinates as number[][][] | number[][][][];
                    coords.flat(2).forEach(coord => {
                        if (Array.isArray(coord) && coord.length === 2) {
                            bounds.extend(coord as [number, number]);
                        }
                    });
                }
            };

            fetch('/data/uscsAmbientesMap.geojson')
                .then(response => response.json())
                .then((geojson1: FeatureCollection<Geometry>) => {
                    geojson1.features.forEach(feature => extendBounds(feature.geometry));

                    fetch('/data/uscsCirculacaoMap.geojson')
                        .then(response => response.json())
                        .then((geojson2: FeatureCollection<Geometry>) => {
                            geojson2.features.forEach(feature => extendBounds(feature.geometry));

                            mapInstance.fitBounds(bounds, { padding: 20 });
                        });
                });
                
        });

        return () => mapInstance.remove();
    }, []);

    return (
        <div>
            <div id="map" style={{ width: '100vw', height: '100vh' }}></div>
        </div>
    );
};

export default FullScreenMap;
