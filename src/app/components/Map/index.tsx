'use client'

import { useEffect, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

const FullScreenMap = () => {

    useEffect(() => {
        const mapInstance = new maplibregl.Map({
            container: 'map',
            style: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json',
            center: [0, 0],
            zoom: 2
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
