import React, { useState, useMemo } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Button, TextField, Box, Paper, IconButton } from "@mui/material";
import { Search, AddLocation, Delete } from "@mui/icons-material";
import axios from "axios";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import debounce from "lodash.debounce";
import toaster from "../../../utils/toaster";

// Define the structure of a location object
interface Location {
  id?: number; // Optional for stops
  name: string; // For stops
  lat: number;
  lng: number;
}

// Define the structure of a search result from the Nominatim API
interface NominatimResult {
  display_name: string;
  lat: string;
  lon: string;
}

// Custom component to handle map zoom and events
const MapComponent: React.FC<{
  searchedLocation: Location | null;
  stops: Location[];
  handleLocationSelect: (location: Location) => void;
}> = ({ searchedLocation, stops, handleLocationSelect }) => {
  const map = useMap();

  useMapEvents({
    click(e) {
      const confirmAdd = window.confirm("Do you want to add a stop here?");
      if (confirmAdd) {
        handleLocationSelect({
          name: "New Stop",
          lat: e.latlng.lat,
          lng: e.latlng.lng,
        });
        map.flyTo(e.latlng, map.getZoom()); // Zoom into the clicked location
        toaster.success("Location selected for a new stop.");
      }
    },
  });

  return (
    <>
      <TileLayer
        url="https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
        subdomains={["mt0", "mt1", "mt2", "mt3"]}
      />
      {searchedLocation && (
        <Marker position={[searchedLocation.lat, searchedLocation.lng]}>
          <Popup>{searchedLocation.name}</Popup>
        </Marker>
      )}
      {stops.map((stop) => (
        <Marker
          key={stop.id}
          position={[stop.lat, stop.lng]}
          eventHandlers={{
            click: () => handleLocationSelect(stop),
          }}
        >
          <Popup>{stop.name}</Popup>
        </Marker>
      ))}
    </>
  );
};

const StopManagement: React.FC = () => {
  const [stopName, setStopName] = useState<string>("");
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [stops, setStops] = useState<Location[]>([]);
  const [searchedLocation, setSearchedLocation] = useState<Location | null>(
    null
  );
  const [searchResults, setSearchResults] = useState<Location[]>([]);

  // Memoize the debounced search function
  const debouncedSearch = useMemo(
    () =>
      debounce(async (term: string) => {
        if (!term) {
          setSearchResults([]);
          setSearchedLocation(null); // Clear searched location when search term is empty
          return;
        }
        try {
          const response = await axios.get<NominatimResult[]>(
            `https://nominatim.openstreetmap.org/search?format=json&q=${term}&countrycodes=PK`
          );
          setSearchResults(
            response.data.map((result) => ({
              name: result.display_name,
              lat: parseFloat(result.lat),
              lng: parseFloat(result.lon),
            }))
          );
        } catch {
          toaster.error("Failed to search location. Please try again.");
        }
      }, 500),
    [] // No dependencies needed since axios and setSearchResults are stable
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    debouncedSearch(e.target.value);
  };

  const handleLocationSelect = (location: Location) => {
    const { lat, lng, name } = location;
    setLatitude(lat);
    setLongitude(lng);
    setStopName(name);
    setSearchedLocation({ lat, lng, name });
    setSearchResults([]); // Clear search results after selection
  };

  const addStop = () => {
    if (latitude !== null && longitude !== null && stopName) {
      const exists = stops.some(
        (stop) => stop.lat === latitude && stop.lng === longitude
      );
      if (exists) {
        toaster.warning("Stop already exists at this location!");
        return;
      }
      const newStop: Location = {
        id: Date.now(),
        name: stopName,
        lat: latitude,
        lng: longitude,
      };
      setStops([...stops, newStop]);
      setStopName("");
      setLatitude(null);
      setLongitude(null);
      toaster.success("Stop added successfully!");
    } else {
      toaster.error("Please fill in all fields to add a stop.");
    }
  };

  const deleteStop = (id: number) => {
    setStops(stops.filter((stop) => stop.id !== id));
    toaster.info("Stop deleted successfully!");
  };

  const columns: GridColDef[] = [
    { field: "name", headerName: "Stop Name", width: 130 },
    { field: "lat", headerName: "Latitude", width: 130 },
    { field: "lng", headerName: "Longitude", width: 130 },
    {
      field: "actions",
      headerName: "Actions",
      width: 80,
      renderCell: (params) => (
        <IconButton color="error" onClick={() => deleteStop(params.row.id)}>
          <Delete />
        </IconButton>
      ),
    },
  ];

  return (
    <Box sx={{ padding: 3 }}>
      <h2>Stop Map</h2>

      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <TextField
          label="Search for a location"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={handleSearchChange}
          InputProps={{
            endAdornment: (
              <IconButton onClick={() => debouncedSearch(searchTerm)}>
                <Search />
              </IconButton>
            ),
          }}
        />
      </Box>
      {searchResults.length > 0 && (
        <Paper sx={{ maxHeight: 200, overflow: "auto" }}>
          {searchResults.map((result, index) => (
            <Box
              key={index}
              sx={{
                padding: 1,
                cursor: "pointer",
                "&:hover": { backgroundColor: "#f5f5f5" },
              }}
              onClick={() => handleLocationSelect(result)}
            >
              {result.name}
            </Box>
          ))}
        </Paper>
      )}
      <MapContainer
        center={[30.3753, 69.3451]}
        zoom={5}
        style={{ width: "100%", height: "400px" }}
      >
        <MapComponent
          searchedLocation={searchedLocation}
          stops={stops}
          handleLocationSelect={handleLocationSelect}
        />
      </MapContainer>
      <Box sx={{ mt: 2 }}>
        <TextField
          label="Stop Name"
          variant="outlined"
          fullWidth
          value={stopName}
          onChange={(e) => setStopName(e.target.value)}
        />
        <Button
          variant="contained"
          onClick={addStop}
          sx={{ mt: 2 }}
          startIcon={<AddLocation />}
        >
          Add Stop
        </Button>
      </Box>
      <Box sx={{ mt: 3, height: 400, width: "auto" }}>
        <DataGrid rows={stops} columns={columns} />
      </Box>
    </Box>
  );
};

export default StopManagement;
