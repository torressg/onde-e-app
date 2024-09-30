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
                data: '/data/uscsAmbientesMap.geojson',
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
                },
            });

            // Adiciona a camada de circulação
            mapInstance.addSource('geojson2', {
                type: 'geojson',
                data: '/data/uscsCirculacaoMap.geojson',
            });

            mapInstance.addLayer({
                id: 'geojson2-layer',
                type: 'fill',
                source: 'geojson2',
                layout: {},
                paint: {
                    'fill-color': '#888888',
                    'fill-opacity': 1,
                },
            }, 'geojson3d-layer');

            mapInstance.on('click', 'geojson3d-layer', (e) => {
                if (e.features && e.features.length > 0) {
                    const coordinates = e.features[0].geometry.type === "Point" ?
                        (e.features[0].geometry.coordinates as [number, number]) :
                        (e.lngLat.toArray() as [number, number]);

                    const properties = e.features[0].properties;
                    new maplibregl.Popup()
                        .setLngLat(coordinates)
                        .setHTML(`
                            <strong><h3 style="color: black;">${properties.Name || 'Ambiente sem nomeação'}</h3></strong>
                            <p style="color: black;">${properties.TipoAmb || 'No Subtitle'}</p>
                        `)
                        .addTo(mapInstance);
                }
            });

            if (geoJson) {
                mapInstance.addSource('route', {
                    type: 'geojson',
                    data: geoJson, // O GeoJSON da rota
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
                        'line-color': '#1c1c1c',
                        'line-width': 5, 
                        
                    },
                });

                const bounds = new maplibregl.LngLatBounds();

                geoJson.features.forEach((feature: any) => {
                    if (feature.geometry.type === 'LineString') {
                        feature.geometry.coordinates.forEach((coord: any) => {
                            bounds.extend(coord);
                        });
                    }

                    if (feature.geometry.type === 'Point') {
                        const el = document.createElement('div');
                        el.className = 'marker';

                        // Definindo o tamanho do marcador com base no iconSize
                        el.style.width = `${feature.properties.iconSize[0]}px`;
                        el.style.height = `${feature.properties.iconSize[1]}px`;
                        el.style.backgroundSize = 'contain'; // Ajustar a imagem ao tamanho do marcador
                        el.style.backgroundRepeat = 'no-repeat';
                        el.style.backgroundPosition = 'center';

                        // Verificar se é o ponto de início ou fim e aplicar o ícone correspondente
                        if (feature.properties.message === 'Início') {
                            el.style.backgroundImage = 'url("/assets/start.svg")'; // Ícone personalizado de início
                        } else if (feature.properties.message === 'Destino') {
                            el.style.backgroundImage = 'url("/assets/end.svg")'; // Ícone personalizado de destino
                        }

                        // Adicionar o marcador ao mapa com âncora na base do ícone
                        new maplibregl.Marker({ element: el, anchor: 'bottom' })
                            .setLngLat(feature.geometry.coordinates)
                            .addTo(mapInstance);

                        // Adiciona o ponto de início/fim aos limites
                        bounds.extend(feature.geometry.coordinates);
                    }
                });

                // Ajusta o mapa para focar nos limites da rota
                mapInstance.fitBounds(bounds, { padding: 20, maxZoom: 19 })

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