import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  InputAdornment,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import "leaflet/dist/leaflet.css";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from "react-leaflet";
import { LatLng, LeafletMouseEvent } from "leaflet"; // Import Leaflet types

interface StopFormProps {
  selectedStop: {
    stopName: string;
    latitude: number;
    longitude: number;
  } | null;
  searchTerm: string;
  searchResults: Array<{
    stopName: string;
    latitude: number;
    longitude: number;
  }>;
  searchedLocation: {
    stopName: string;
    latitude: number;
    longitude: number;
  } | null;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onLocationSelect: (location: {
    stopName: string;
    latitude: number;
    longitude: number;
  }) => void;
  onFieldChange: (field: string, value: string | number) => void;
}

const StopForm: React.FC<StopFormProps> = ({
  selectedStop,
  searchTerm,
  searchResults,
  searchedLocation,
  onSearchChange,
  onLocationSelect,
  onFieldChange,
}) => {
  const [markerPosition, setMarkerPosition] = useState<LatLng | null>(null);

  // Update marker position when searchedLocation changes
  useEffect(() => {
    if (
      searchedLocation &&
      !isNaN(searchedLocation.latitude) &&
      !isNaN(searchedLocation.longitude)
    ) {
      setMarkerPosition(
        new LatLng(searchedLocation.latitude, searchedLocation.longitude)
      );
    } else {
      setMarkerPosition(null);
    }
  }, [searchedLocation]);

  const handleMapClick = (e: LeafletMouseEvent) => {
    const { lat, lng } = e.latlng;
    setMarkerPosition(new LatLng(lat, lng));
    onFieldChange("latitude", lat);
    onFieldChange("longitude", lng);
  };

  const MapClickHandler = () => {
    useMapEvents({
      click: handleMapClick,
    });
    return null;
  };

  return (
    <Box sx={{ p: 2 }}>
      <TextField
        label="Search for a location"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={onSearchChange}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton>
                <Search />
              </IconButton>
            </InputAdornment>
          ),
        }}
        sx={{ mb: 2 }}
      />

      {searchResults.length > 0 && (
        <Paper sx={{ maxHeight: 200, overflow: "auto", mb: 2 }}>
          {searchResults.map((result, index) => (
            <Box
              key={index}
              sx={{
                padding: 1,
                cursor: "pointer",
                "&:hover": { backgroundColor: "#f5f5f5" },
              }}
              onClick={() => onLocationSelect(result)}
            >
              <Typography>{result.stopName}</Typography>
            </Box>
          ))}
        </Paper>
      )}

      <MapContainer
        center={[30.3753, 69.3451]} // Default center (Pakistan coordinates)
        zoom={5} // Default zoom level
        style={{ width: "100%", height: "300px", marginBottom: "16px" }}
      >
        <TileLayer
          url="http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
          maxZoom={20}
          subdomains={["mt0", "mt1", "mt2", "mt3"]}
          attribution="&copy; Google"
        />
        <MapClickHandler />
        {markerPosition && (
          <Marker position={markerPosition}>
            <Popup>{selectedStop?.stopName || "New Stop"}</Popup>
          </Marker>
        )}
      </MapContainer>

      <TextField
        label="Stop Name"
        variant="outlined"
        fullWidth
        value={selectedStop?.stopName || ""}
        onChange={(e) => onFieldChange("stopName", e.target.value)}
        sx={{ mb: 2 }}
      />
    </Box>
  );
};

export default StopForm;
