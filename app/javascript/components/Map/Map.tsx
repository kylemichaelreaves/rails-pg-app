import * as React from "react";
import * as mapboxgl from "mapbox-gl";
import Container from 'react-bootstrap/Container';
import {useRef, useEffect, useState} from "react";

export default function Map() {
    const mapContainer = useRef<HTMLDivElement | null>(null);
    const map = useRef<mapboxgl.Map | null>(null);
    const [lng, setLng] = useState(-70.9);
    const [lat, setLat] = useState(42.35);
    const [zoom, setZoom] = useState(9);

    useEffect(() => {
        if (map.current || !mapContainer.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
            accessToken: import.meta.env.VITE_MAPBOX_ACCESS_TOKEN,
            container: mapContainer.current,
            style: "mapbox://styles/mapbox/streets-v11",
            center: [lng, lat],
            zoom: zoom,
        });
    });

    useEffect(() => {
        if (!map.current) return; // wait for map to initialize
        map.current.on("move", () => {
            if (!map.current) return;
            setLng(Number(map.current.getCenter().lng.toFixed(4)));
            setLat(Number(map.current.getCenter().lat.toFixed(4)));
            setZoom(Number(map.current.getZoom().toFixed(2)));
        });
    });
    return (
        <div>
            <div className="sidebar">
                Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
            </div>
            <div ref={mapContainer} className="map-container"/>
        </div>
    );
}
