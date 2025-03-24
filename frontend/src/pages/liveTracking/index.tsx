import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";
import { Box } from "@mui/material";
import SpanLoader from "../../components/SpanLoader";

const busIcon = new L.Icon({
  iconUrl: "../../../src/assets/images/bus-stop.png",
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});

const START_POINT = L.latLng(31.5799417, 74.35464377811556);
const END_POINT = L.latLng(31.694468449462903, 74.24724019481333);

const LiveTracking: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);
  const routingControl = useRef<L.Routing.Control | null>(null);
  const busMarker = useRef<L.Marker | null>(null);
  const routePolyline = useRef<L.Polyline | null>(null);
  const [routeCoordinates, setRouteCoordinates] = useState<L.LatLng[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!mapInstance.current && mapRef.current) {
      const map = L.map(mapRef.current).setView(START_POINT, 13);
      mapInstance.current = map;

      L.tileLayer("https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}", {
        maxZoom: 20,
        subdomains: ["mt0", "mt1", "mt2", "mt3"],
      }).addTo(map);

      busMarker.current = L.marker(START_POINT, { icon: busIcon })
        .addTo(map)
        .bindPopup("Route 1");

      routingControl.current = L.Routing.control({
        waypoints: [START_POINT, END_POINT],
        routeWhileDragging: false,
        addWaypoints: false,
        fitSelectedRoutes: true,
        lineOptions: {
          styles: [{ color: "transparent", weight: 4 }],
          extendToWaypoints: true,
          missingRouteTolerance: 10,
        } as L.Routing.LineOptions,
      }).addTo(map);

      routingControl.current.on("routesfound", (e) => {
        const coordinates = e.routes[0].coordinates;
        setRouteCoordinates(coordinates);

        routePolyline.current = L.polyline(coordinates, {
          color: "blue",
          weight: 4,
        }).addTo(map);
      });
    }

    return () => {
      mapInstance.current?.remove();
      mapInstance.current = null;
    };
  }, []);

  useEffect(() => {
    if (!routeCoordinates.length || currentIndex >= routeCoordinates.length)
      return;

    const interval = setInterval(() => {
      if (busMarker.current && routePolyline.current) {
        busMarker.current.setLatLng(routeCoordinates[currentIndex]);

        const remainingCoordinates = routeCoordinates.slice(currentIndex);
        routePolyline.current.setLatLngs(remainingCoordinates);

        setCurrentIndex((prev) => prev + 1);
      }
    }, 500);

    return () => clearInterval(interval);
  }, [routeCoordinates, currentIndex]);
  if (!routingControl) {
    return <SpanLoader></SpanLoader>;
  }

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
