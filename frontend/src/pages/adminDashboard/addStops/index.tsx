import React, { useState } from "react";
import {
  TextField,
  Button,
  CircularProgress,
  Typography,
  Box,
  MenuItem,
  Paper,
} from "@mui/material";
import { FaMapMarkerAlt } from "react-icons/fa";

interface StopDetails {
  name: string;
  latitude: number;
  longitude: number;
}

interface AddStopProps {
  setIsFormPageState: (state: string) => void;
  FormPageState: { INACTIVE: string; ACTIVE: string };
  stopDetails?: StopDetails;
  isAddNew?: boolean;
}

const AddStop: React.FC<AddStopProps> = ({
  setIsFormPageState,
  FormPageState,
  stopDetails = {
    name: "Uet Ksk Campus",
    latitude: 31.693515,
    longitude: 74.246157,
  },
  isAddNew = true,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isLoadingSuggestions] = useState<boolean>(false);
  const [suggestionData] = useState<
    { place_id: string; description: string }[]
  >([]);
  const [directions, setDirections] = useState<StopDetails>(stopDetails);
  const [isBtnLoading, setIsBtnLoading] = useState<boolean>(false);

  const ChangeSearchfield = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSearchQuery(e.target.value);
    // Logic to fetch suggestions can be added here
  };

  const getlangAndlat = (placeId: string) => {
    // Mock logic to fetch latitude and longitude
    console.log("Fetching location for place_id:", placeId);
    setDirections({
      name: "Sample Location",
      latitude: 31.5204,
      longitude: 74.3587,
    });
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsBtnLoading(true);
    // Handle form submission logic here
    setTimeout(() => {
      setIsBtnLoading(false);
      alert(
        isAddNew ? "Stop added successfully!" : "Stop edited successfully!"
      );
    }, 1000);
  };

  // Placeholder for MapSection component
  const MapSection = ({
    latitude,
    longitude,
    label,
  }: {
    latitude: number;
    longitude: number;
    label: string;
  }) => (
    <Box
      sx={{
        height: "200px",
        width: "100%",
        bgcolor: "#e0e0e0",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        mb: 2,
      }}
    >
      <Typography variant="body1">{`Map of ${label} (Lat: ${latitude}, Long: ${longitude})`}</Typography>
    </Box>
  );

  // Placeholder for Bttn component
  const Bttn = ({
    children,
    onClick,
    isLoading,
    type,
  }: {
    children: string;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    isLoading: boolean;
    type: "button" | "submit";
  }) => (
    <Button
      variant="contained"
      onClick={onClick}
      disabled={isLoading}
      type={type}
    >
      {isLoading ? <CircularProgress size={20} /> : children}
    </Button>
  );

  return (
    <Box sx={{ p: 4, bgcolor: "#f5f5f5", minHeight: "100vh" }}>
      <Paper sx={{ p: 4, maxWidth: "800px", margin: "auto" }} elevation={3}>
        <Typography variant="h4" sx={{ mb: 3 }}>
          {isAddNew ? "Add New Stop" : "Edit Stop"}
        </Typography>
        <Box component="form">
          <TextField
            fullWidth
            label="Search Stop"
            variant="outlined"
            value={searchQuery}
            onChange={ChangeSearchfield}
            placeholder="Search Stop here for map"
            InputProps={{
              endAdornment: isLoadingSuggestions && (
                <CircularProgress size={20} />
              ),
            }}
            sx={{ mb: 2 }}
          />
          {suggestionData.length > 0 && (
            <Box
              sx={{ bgcolor: "white", maxHeight: "200px", overflowY: "auto" }}
            >
              {suggestionData.map((suggestion, index) => (
                <MenuItem
                  key={index}
                  onClick={() => getlangAndlat(suggestion.place_id)}
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <FaMapMarkerAlt
                    style={{ marginRight: "8px", color: "blue" }}
                  />
                  {suggestion.description}
                </MenuItem>
              ))}
            </Box>
          )}
          <MapSection
            latitude={directions.latitude}
            longitude={directions.longitude}
            label={directions.name}
          />
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
            <Button
              variant="outlined"
              onClick={() => setIsFormPageState(FormPageState.INACTIVE)}
            >
              Back
            </Button>
            <Bttn
              type="submit"
              children={isAddNew ? "Add Stop" : "Edit Stop"}
              onClick={handleSubmit}
              isLoading={isBtnLoading}
            />
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default AddStop;
