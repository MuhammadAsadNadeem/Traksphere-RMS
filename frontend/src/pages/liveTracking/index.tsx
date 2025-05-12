import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Box } from "@mui/material";

const busIcon = new L.Icon({
  iconUrl: "../../../src/assets/images/bus-stop.svg",
  iconSize: [100, 100],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});

const LiveTracking: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);
  const busMarker = useRef<L.Marker | null>(null);
  const [mapReady, setMapReady] = useState(false);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:5000");

    socket.onopen = () => {
      console.log("WebSocket connected");
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const lat = parseFloat(data.latitude);
      const lng = parseFloat(data.longitude);

      if (isNaN(lat) || isNaN(lng)) return;
      const latLng = L.latLng(lat, lng);

      // Initialize map on first coordinate
      if (!mapReady && mapRef.current) {
        const map = L.map(mapRef.current).setView(latLng, 13);
        mapInstance.current = map;
        setMapReady(true);

        L.tileLayer("https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}", {
          maxZoom: 20,
          subdomains: ["mt0", "mt1", "mt2", "mt3"],
        }).addTo(map);

        busMarker.current = L.marker(latLng, { icon: busIcon })
          .addTo(map)
          .bindPopup("Live Bus Location")
          .openPopup();
      }

      // Update marker position
      if (busMarker.current) {
        busMarker.current.setLatLng(latLng);
      }
    };

    socket.onclose = () => {
      console.log("WebSocket disconnected");
    };

    socket.onerror = (error) => {
      console.error("WebSocket error", error);
    };

    return () => socket.close();
  }, [mapReady]);

  return (
    <Box
      sx={{
        mt: 10,
        ml: 2,
        height: { xs: "50vh", sm: "60vh", md: "85vh" },
        width: "95%",
        border: "1px solid #ccc",
        borderRadius: "8px",
      }}
    >
      <div
        ref={mapRef}
        style={{ width: "100%", height: "100%", cursor: "pointer" }}
      />
    </Box>
  );
};

export default LiveTracking;
