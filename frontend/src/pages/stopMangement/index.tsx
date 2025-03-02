import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
  Paper,
} from "@mui/material";
import { Delete, AddLocation, Edit } from "@mui/icons-material";
import { indigo } from "@mui/material/colors";
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
import SearchBar from "../../components/SearchBar";
import StopForm from "./stopForm";

interface Location {
  id?: string;
  stopName: string;
  latitude: number;
  longitude: number;
}

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
  const [stopToDelete, setStopToDelete] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddMode, setIsAddMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<Location[]>([]);
  const [searchedLocation, setSearchedLocation] = useState<Location | null>(
    null
  );

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    dispatch(fetchAllBusStops());
  }, [dispatch]);

  const stopsWithDisplayId = stops.map((stop, index) => ({
    ...stop,
    displayId: index + 1,
    id: stop.id || `stop-${index + 1}`,
  }));

  const handleEditStop = (stop: Location) => {
    setSelectedStop(stop);
    setIsAddMode(false);
    setOpenDialog(true);
  };

  const handleAddStop = () => {
    setSelectedStop({
      stopName: "",
      latitude: 0,
      longitude: 0,
    });
    setIsAddMode(true);
    setOpenDialog(true);
  };

  const handleDeleteStop = (stopId: string) => {
    setStopToDelete(stopId);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (stopToDelete) {
      dispatch(deleteStopById(stopToDelete))
        .unwrap()
        .then(() => {
          toaster.success("Stop deleted successfully!");
          dispatch(fetchAllBusStops());
        })
        .catch(() => {
          toaster.error("Failed to delete stop.");
        })
        .finally(() => setDeleteDialogOpen(false));
    }
  };

  const handleSaveStop = () => {
    if (!selectedStop) {
      toaster.error("No stop selected.");
      return;
    }

    if (!selectedStop.stopName) {
      toaster.error("Stop Name Field Required");
      return;
    }

    const stopData = {
      ...selectedStop,
      latitude: Number(selectedStop.latitude),
      longitude: Number(selectedStop.longitude),
    };

    const action = isAddMode ? addNewStop(stopData) : updateStopById(stopData);

    dispatch(action)
      .unwrap()
      .then(() => {
        toaster.success(
          `Stop ${isAddMode ? "added" : "updated"} successfully!`
        );
        setOpenDialog(false);
        dispatch(fetchAllBusStops());
      })
      .catch(() => {
        toaster.error(`Failed to ${isAddMode ? "add" : "update"} stop.`);
      });
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
    setSelectedStop((prev) => ({
      ...prev!,
      ...location,
      latitude: location.latitude,
      longitude: location.longitude,
    }));
    setSearchedLocation(location);
    setSearchResults([]);
  };

  const filteredStops = stopsWithDisplayId.filter((stop) =>
    Object.values(stop).some((value) =>
      value?.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const columns: GridColDef[] = [
    { field: "displayId", headerName: "ID", width: 100 },
    { field: "stopName", headerName: "Stop Name", width: 200 },
    { field: "latitude", headerName: "Latitude", width: 150 },
    { field: "longitude", headerName: "Longitude", width: 150 },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <>
          <IconButton onClick={() => handleEditStop(params.row)}>
            <Edit sx={{ color: indigo[500] }} />
          </IconButton>
          <IconButton onClick={() => handleDeleteStop(params.row.id)}>
            <Delete sx={{ color: "red" }} />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <Box sx={{ ml: 1, height: "80vh" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          width: "100%",
          p: 3,
          mt: 3,
          mb: 2,
        }}
      >
        <SearchBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          placeholder="Search by Stop Name or Coordinates"
          isMobile={isMobile}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            mb: 2,
            mt: 2,
            color: indigo[700],
            width: "95%",
          }}
        >
          Manage Stops
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "95%",
            mb: 2,
          }}
        >
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

        <Paper
          sx={{
            height: 300,
            mt: 2,
            width: "95%",
          }}
        >
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
              "& .MuiDataGrid-columnHeader": {
                backgroundColor: indigo[50],
                color: indigo[900],
              },
              "& .MuiDataGrid-footerContainer": {
                backgroundColor: indigo[50],
                color: indigo[900],
              },
            }}
          />
        </Paper>
      </Box>

      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle
          sx={{ backgroundColor: indigo[500], color: "#fff", fontSize: "20px" }}
        >
          {isAddMode ? "Add New Stop" : "Update Stop"}
        </DialogTitle>
        <StopForm
          selectedStop={selectedStop}
          searchTerm={searchTerm}
          searchResults={searchResults}
          searchedLocation={searchedLocation}
          onSearchChange={handleSearchChange}
          onLocationSelect={handleLocationSelect}
          onFieldChange={(field, value) =>
            setSelectedStop({ ...selectedStop!, [field]: value })
          }
        />
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
