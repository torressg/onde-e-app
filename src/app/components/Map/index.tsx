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
            center: [0, 0],
            zoom: 2
        });

        mapInstance.on('load', () => {
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
            mapInstance.on('click', 'geojson1-layer', (e) => {
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
