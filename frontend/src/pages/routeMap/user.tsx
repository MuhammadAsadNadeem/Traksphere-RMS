import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine";
import { Box } from "@mui/material";

const LiveTracking: React.FC = () => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (mapRef.current && !mapInstanceRef.current) {
      const map = L.map(mapRef.current).setView([31.5497, 74.3436], 10);
      mapInstanceRef.current = map;

      L.tileLayer("https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}", {
        attribution: "",
        subdomains: ["mt0", "mt1", "mt2", "mt3"],
      }).addTo(map);
      const startlatitude = 31.74;

      const routingControl = L.Routing.control({
        waypoints: [L.latLng(startlatitude, 74.94), L.latLng(31.6792, 74.949)],
        routeWhileDragging: true,
      }).addTo(map);

      return () => {
        map.removeControl(routingControl);
        map.remove();
        mapInstanceRef.current = null;
      };
    }
  }, []);

  return (
    <Box
      sx={{
        mt: 10,
        height: { xs: "50vh", sm: "60vh", md: "85vh" }, // Adjust height as needed
        width: "100%",
        overflow: "hidden",
        border: "1px solid #ccc", // Optional: for visual clarity
        borderRadius: "8px",
      }}
    >
      <div
        id="map"
        style={{ width: "100vw", height: "100vh" }}
        ref={mapRef}
      ></div>
    </Box>
  );
};

export default LiveTracking;
