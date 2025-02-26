import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  TextField,
  IconButton,
  Typography,
  InputAdornment,
  useMediaQuery,
  useTheme,
  Paper,
} from "@mui/material";
import { Delete, Search, AddLocation } from "@mui/icons-material";
import { indigo } from "@mui/material/colors";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import debounce from "lodash.debounce";
import axios from "axios";
import toaster from "../../utils/toaster";
import DeleteConfirmationDialog from "../../components/DeleteDialogBox";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  addNewStop,
  deleteStopById,
  fetchAllBusStops,
} from "../../store/user/adminThunk";

// Define the structure of a location object
interface Location {
  id?: string; // Optional for stops
  stopName: string; // For stops
  latitude: number;
  longitude: number;
}

// Define the structure of a search result from the Nominatim API
interface NominatimResult {
  display_name: string;
  latitude: string;
  longitude: string;
}

const StopManagement: React.FC = () => {
  const dispatch = useAppDispatch();
  const stops = useAppSelector((state) => state.adminSlice.busStops);
  const [selectedStop, setSelectedStop] = useState<Location | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [stopToDelete, setStopToDelete] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddMode, setIsAddMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Location[]>([]);
  const [searchedLocation, setSearchedLocation] = useState<Location | null>(
    null
  );

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    dispatch(fetchAllBusStops());
  }, [dispatch]);

  const stopsWithDisplayId = (stops || [])
    .filter((stop) => stop != null)
    .map((stop, index) => ({
      ...stop,
      displayId: index + 1,
      id: stop.id || `stop-${index + 1}`, // Ensure id is a string
    }));

  const handleAddStop = () => {
    setSelectedStop({
      id: Date.now().toString(), // Ensure id is a string
      stopName: "",
      latitude: 0, // Default latitude
      longitude: 0, // Default longitude
    });
    setIsAddMode(true);
    setOpenDialog(true);
  };

  const handleDeleteStop = (stopId: number) => {
    setStopToDelete(stopId);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (stopToDelete) {
      dispatch(deleteStopById(stopToDelete))
        .unwrap()
        .then(() => {
          toaster.success("Stop deleted successfully!");
          setDeleteDialogOpen(false);
          dispatch(fetchAllBusStops());
        })
        .catch(() => {
          toaster.error("Failed to delete stop.");
        });
    }
  };

  const handleSaveStop = () => {
    if (!selectedStop) {
      toaster.error("No stop selected.");
      return;
    }

    if (
      !selectedStop.stopName ||
      isNaN(selectedStop.latitude) ||
      isNaN(selectedStop.longitude)
    ) {
      toaster.error("All fields are required and must be valid.");
      return;
    }

    const stopData: Location = {
      id: selectedStop.id, // id is already a string
      stopName: selectedStop.stopName,
      latitude: selectedStop.latitude,
      longitude: selectedStop.longitude,
    };

    if (isAddMode) {
      dispatch(addNewStop(stopData))
        .unwrap()
        .then(() => {
          toaster.success("Stop added successfully!");
          setOpenDialog(false);
          dispatch(fetchAllBusStops());
        })
        .catch(() => {
          toaster.error("Failed to add stop.");
        });
    }
  };

  const debouncedSearch = debounce(async (term: string) => {
    if (!term) {
      setSearchResults([]);
      setSearchedLocation(null);
      return;
    }
    try {
      const response = await axios.get<NominatimResult[]>(
        `https://nominatim.openstreetmap.org/search?format=json&q=${term}&countrycodes=PK`
      );
      setSearchResults(
        response.data.map((result) => ({
          stopName: result.display_name,
          latitude: parseFloat(result.latitude),
          longitude: parseFloat(result.longitude),
        }))
      );
    } catch {
      toaster.error("Failed to search location. Please try again.");
    }
  }, 500);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    debouncedSearch(e.target.value);
  };

  const handleLocationSelect = (location: Location) => {
    const { latitude, longitude, stopName } = location;
    if (!isNaN(latitude) && !isNaN(longitude)) {
      setSelectedStop({ ...selectedStop!, latitude, longitude, stopName });
      setSearchedLocation({ latitude, longitude, stopName });
      setSearchResults([]);
    } else {
      toaster.error("Invalid latitude or longitude values.");
    }
  };

  const filteredStops = stopsWithDisplayId.filter((stop) => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    return (
      (stop.stopName || "").toLowerCase().includes(lowerCaseQuery) ||
      (stop.latitude || "").toString().includes(lowerCaseQuery) ||
      (stop.longitude || "").toString().includes(lowerCaseQuery)
    );
  });

  const columns: GridColDef[] = [
    { field: "displayId", headerName: "ID", flex: 1, width: 70 },
    { field: "stopName", headerName: "Stop Name", flex: 1 },
    { field: "latitude", headerName: "Latitude", flex: 1 },
    { field: "longitude", headerName: "Longitude", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      width: 100,
      renderCell: (params) => (
        <IconButton onClick={() => handleDeleteStop(params.row.id)}>
          <Delete sx={{ color: "red" }} />
        </IconButton>
      ),
    },
  ];

  return (
    <Box sx={{ mt: 6 }}>
      <Typography variant="h4" sx={{ mb: 2, color: indigo[700] }}>
        Manage Stops
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "flex-start", mt: 2 }}>
        <Button
          variant="contained"
          startIcon={<AddLocation />}
          onClick={handleAddStop}
          sx={{
            backgroundColor: indigo[500],
            "&:hover": { backgroundColor: indigo[900] },
            minWidth: isMobile ? "20%" : "auto",
          }}
        >
          Add Stop
        </Button>
      </Box>

      <TextField
        fullWidth
        margin="normal"
        variant="outlined"
        placeholder="Search by Stop Name, Latitude, or Longitude..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        sx={{ mb: 2 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search sx={{ color: indigo[500] }} />
            </InputAdornment>
          ),
        }}
      />

      <Box sx={{ overflowX: "auto", mb: 2 }}>
        <DataGrid
          rows={filteredStops}
          columns={columns}
          getRowId={(row) => row.id}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 10, page: 0 },
            },
          }}
          sx={{
            "& .MuiDataGrid-cell": {
              fontSize: isMobile ? "12px" : "14px",
            },
            "& .MuiDataGrid-columnHeader": {
              fontSize: isMobile ? "12px" : "14px",
              backgroundColor: indigo[50],
              color: indigo[900],
            },
            "& .MuiDataGrid-footerContainer": {
              backgroundColor: indigo[500],
              color: indigo[900],
              padding: "10px",
              fontSize: isMobile ? "12px" : "14px",
            },
          }}
        />
      </Box>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle
          sx={{ backgroundColor: indigo[500], color: "#fff", fontSize: "20px" }}
        >
          {isAddMode ? "Add New Stop" : "Update Stop"}
        </DialogTitle>
        <Box sx={{ p: 2 }}>
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
                  onClick={() => handleLocationSelect(result)}
                >
                  {result.stopName}
                </Box>
              ))}
            </Paper>
          )}
          <MapContainer
            center={[30.3753, 69.3451]} // Default center for Pakistan
            zoom={5}
            style={{ width: "100%", height: "300px", marginBottom: "16px" }}
          >
            <TileLayer
              url="https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
              subdomains={["mt0", "mt1", "mt2", "mt3"]}
            />
            {searchedLocation &&
              !isNaN(searchedLocation.latitude) &&
              !isNaN(searchedLocation.longitude) && (
                <Marker
                  position={[
                    searchedLocation.latitude,
                    searchedLocation.longitude,
                  ]}
                >
                  <Popup>{searchedLocation.stopName}</Popup>
                </Marker>
              )}
          </MapContainer>
          <TextField
            label="Stop Name"
            variant="outlined"
            fullWidth
            value={selectedStop?.stopName || ""}
            onChange={(e) =>
              setSelectedStop({ ...selectedStop!, stopName: e.target.value })
            }
            sx={{ mb: 2 }}
          />
        </Box>
        <DialogActions sx={{ backgroundColor: indigo[50], padding: "10px" }}>
          <Button
            onClick={() => setOpenDialog(false)}
            sx={{ color: indigo[900] }}
          >
            Cancel
          </Button>
          <Button onClick={handleSaveStop} sx={{ color: indigo[700] }}>
            {isAddMode ? "Add" : "Save"}
          </Button>
        </DialogActions>
      </Dialog>

      <DeleteConfirmationDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={confirmDelete}
      />
    </Box>
  );
};

export default StopManagement;
