import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Box, TextField, Modal, Typography } from "@mui/material";

interface Stop {
  _id: string;
  name: string;
  latitude: number;
  longitude: number;
}

interface Route {
  id: string;
  name: string;
  location: {
    latitude: number;
    longitude: number;
  };
}

const TrackRoute = () => {
  const [stopsArray, setStopsArray] = useState<Stop[]>([]);
  const [routeArray, setRouteArray] = useState<Route[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [routesPassingThrough, setRoutesPassingThrough] = useState<Route[]>([]);
  const [selectedStop, setSelectedStop] = useState<Stop | null>(null);

  useEffect(() => {
    try {
      const dummyStops: Stop[] = [
        { _id: "1", name: "Stop A", latitude: 31.694, longitude: 74.248 },
        { _id: "2", name: "Stop B", latitude: 31.695, longitude: 74.249 },
        { _id: "3", name: "Stop C", latitude: 31.696, longitude: 74.25 },
      ];

      const dummyRoutes: Route[] = [
        {
          id: "1",
          name: "Route 1",
          location: { latitude: 31.693, longitude: 74.247 },
        },
        {
          id: "2",
          name: "Route 2",
          location: { latitude: 31.692, longitude: 74.246 },
        },
      ];

      setStopsArray(dummyStops);
      setRouteArray(dummyRoutes);
    } catch (error) {
      console.error("Error loading data:", error);
    }
  }, []);

  const filteredStops = stopsArray.filter((stop) =>
    stop.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSuggestionClick = (stop: Stop) => {
    try {
      const dummyRoutesPassingThrough: Route[] = [
        {
          id: "1",
          name: "Route 1",
          location: { latitude: 31.693, longitude: 74.247 },
        },
        {
          id: "2",
          name: "Route 2",
          location: { latitude: 31.692, longitude: 74.246 },
        },
      ];
      setRoutesPassingThrough(dummyRoutesPassingThrough);
      setSelectedStop(stop); // Save the selected stop to state
      setIsModalOpen(true); // Show modal when a stop is clicked
    } catch (error) {
      console.error("Error handling suggestion click:", error);
    }
  };

  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <Box sx={{ position: "relative", height: "89vh", width: "90.2vw" }}>
      {/* Search Bar */}
      <TextField
        label="Search Stops"
        variant="outlined"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        fullWidth
        sx={{ marginBottom: 2 }}
      />

      {/* Map */}
      <MapContainer
        center={[31.6935, 74.2472]}
        zoom={13}
        scrollWheelZoom
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {/* Stop Markers */}
        {filteredStops.map((stop: Stop) => (
          <Marker
            key={stop._id}
            position={[stop.latitude, stop.longitude]}
            icon={new L.Icon({ iconUrl: stopMarker, iconSize: [60, 60] })}
            eventHandlers={{
              click: () => handleSuggestionClick(stop), // Trigger modal when stop is clicked
            }}
          >
            <Popup>{stop.name}</Popup>
          </Marker>
        ))}

        {/* Route Markers */}
        {routeArray.map((route: Route) => (
          <Marker
            key={route.id}
            position={[route.location.latitude, route.location.longitude]}
            icon={new L.Icon({ iconUrl: markerPng, iconSize: [60, 60] })}
          >
            <Popup>{route.name}</Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Modal for routes passing through selected stop */}
      <Modal open={isModalOpen} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "white",
            p: 4,
            width: "300px",
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Routes Passing Through Stop: {selectedStop?.name}
          </Typography>
          {routesPassingThrough.length > 0 ? (
            routesPassingThrough.map((route) => (
              <div key={route.id}>{route.name}</div>
            ))
          ) : (
            <div>No routes available</div>
          )}
        </Box>
      </Modal>
    </Box>
  );
};

export default TrackRoute;
