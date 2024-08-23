'use client'

import { useEffect } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { FeatureCollection, Geometry } from 'geojson';

const FullScreenMap = () => {

    useEffect(() => {
        const mapInstance = new maplibregl.Map({
            container: 'map',
            style: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json',
            center: [-46.57924457368841,-23.618155335655388], // Substitua pelas coordenadas específicas-23.618155335655388, -46.57924457368841
            zoom: 15, // Ajuste o zoom para iniciar focado
            // bearing: 30, // Ângulo de rotação para alinhar o corredor
            pitch: 20, // Inclinação para uma visão mais tridimensional
        });

        mapInstance.on('load', () => {
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
                    'fill-extrusion-opacity': 1
                }
            });

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
                    'fill-opacity': 1
                }
            }, 'geojson3d-layer');

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

            // Adiciona evento de clique com Popup
            mapInstance.on('click', 'geojson3d-layer', (e) => {
                if (e.features && e.features.length > 0) {
                    const coordinates = e.features[0].geometry.type === "Point" ?
                        (e.features[0].geometry.coordinates as [number, number]) :
                        (e.lngLat.toArray() as [number, number]);

                    const properties = e.features[0].properties;
                    new maplibregl.Popup()
                        .setLngLat(coordinates)
                        .setHTML(`
                            <h3 style="color: black;">${properties.title || 'No Title'}</h3>
                            <p style="color: black;">${properties.subtitle || 'No Subtitle'}</p>
                        `)
                        .addTo(mapInstance);
                }
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
