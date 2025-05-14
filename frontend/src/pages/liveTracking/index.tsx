import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Box, Card, CardContent, Typography } from "@mui/material";
import BatteryState from "../../components/BatteryState";
import SignalStrength from "../../components/SignalStength";
import SpeedGuage from "../../components/SpeedGuage";
import theme from "../../theme";

// Constants
const busIcon = new L.Icon({
  iconUrl: "../../../src/assets/images/bus-stop.svg",
  iconSize: [60, 60],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});

const LiveTracking: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);
  const busMarker = useRef<L.Marker | null>(null);
  const [mapReady, setMapReady] = useState(false);

  const [internalBattery, setInternalBattery] = useState(100);
  const [externalBattery, setExternalBattery] = useState(100);
  const [signalStrength, setSignalStrength] = useState(20);
  const [speed, setSpeed] = useState(45.9);

  const initializeMap = (latLng: L.LatLngExpression) => {
    if (!mapRef.current) return;

    const map = L.map(mapRef.current).setView(latLng, 13);
    L.tileLayer("https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}", {
      maxZoom: 20,
      subdomains: ["mt0", "mt1", "mt2", "mt3"],
    }).addTo(map);

    const marker = L.marker(latLng, { icon: busIcon })
      .addTo(map)
      .bindPopup("Live Bus Location")
      .openPopup();

    mapInstance.current = map;
    busMarker.current = marker;
    setMapReady(true);
  };

  const updateMarkerPosition = (latLng: L.LatLngExpression) => {
    if (busMarker.current) {
      busMarker.current.setLatLng(latLng);
    }
  };

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:5000");

    socket.onopen = () => console.log("WebSocket connected");

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        const lat = parseFloat(data.latitude);
        const lng = parseFloat(data.longitude);
        if (isNaN(lat) || isNaN(lng)) return;

        const latLng = L.latLng(lat, lng);

        setInternalBattery(data.internal_battery_percent);
        setExternalBattery(data.external_battery_percent);
        setSignalStrength(data.signal_strength);
        setSpeed(data.speed);

        if (!mapReady) {
          initializeMap(latLng);
        } else {
          updateMarkerPosition(latLng);
        }
      } catch (err) {
        console.error("Error parsing WebSocket message:", err);
      }
    };

    socket.onclose = () => console.log("WebSocket disconnected");
    socket.onerror = (error) => console.error("WebSocket error", error);

    return () => socket.close();
  }, [mapReady]);

  return (
    <Box sx={{ p: 1 }}>
      {/* Status Info */}
      <Card sx={{ mt: 8, mb: 1, borderRadius: 3, boxShadow: 3 }}>
        <CardContent>
          <Typography
            sx={{ color: theme.palette.secondary.main }}
            variant="h5"
            mb={2}
          >
            Live Status
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 1,
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                rowGap: 1,
                columnGap: 1,
              }}
            >
              <Box
                sx={{
                  flex: { xs: "1 1 100%", sm: "1 1 22%" },
                  minWidth: "120px",
                }}
              >
                <BatteryState
                  value={internalBattery}
                  label="Internal Battery"
                />
              </Box>
              <Box
                sx={{
                  flex: { xs: "1 1 100%", sm: "1 1 30%" },
                  minWidth: "150px",
                }}
              >
                <BatteryState
                  value={externalBattery}
                  label="External Battery"
                />
              </Box>
              <Box
                sx={{
                  flex: { xs: "1 1 100%", sm: "1 1 20%" },
                  minWidth: "100px",
                }}
              >
                <SignalStrength value={signalStrength} />
              </Box>
              <Box
                sx={{
                  flex: { xs: "1 1 100%", sm: "1 1 20%" },
                  minWidth: "100px",
                }}
              >
                <SpeedGuage speed={speed} />
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Map Display */}
      <Card
        sx={{
          height: { xs: "50vh", sm: "60vh", md: "75vh" },
          borderRadius: 3,
          boxShadow: 3,
        }}
      >
        <CardContent sx={{ height: "100%", p: 0 }}>
          <div
            ref={mapRef}
            style={{ width: "100%", height: "100%", borderRadius: "12px" }}
          />
        </CardContent>
      </Card>
    </Box>
  );
};

export default LiveTracking;
