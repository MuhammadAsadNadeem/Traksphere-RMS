import React, { useEffect, useState } from "react";
import {
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Typography,
  Autocomplete,
  Select,
  Button,
  List,
  ListItem,
  ListItemText,
  Paper,
  IconButton,
  Divider,
} from "@mui/material";
import { Add, Delete } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchAllDrivers, fetchAllBusStops } from "../../store/user/adminThunk";
import { BusStopType } from "../../types/stop.types";
import { DriverType } from "../../types/driver.types";

interface RouteFormProps {
  selectedRoute: {
    id: string;
    routeName: string;
    routeNumber: string;
    vehicleNumber: string;
    driver: DriverType;
    busStops: BusStopType[];
  } | null;
  onRouteChange: (
    field: string,
    value: string | DriverType | BusStopType[]
  ) => void;
}

const RouteForm: React.FC<RouteFormProps> = ({
  selectedRoute,
  onRouteChange,
}) => {
  const dispatch = useAppDispatch();
  const [routeNumberError, setRouteNumberError] = useState<string | null>(null);
  const [selectedBusStop, setSelectedBusStop] = useState<BusStopType | null>(
    null
  );

  // Fetch drivers and bus stops from the store
  const drivers = useAppSelector((state) => state.adminSlice.drivers) || [];
  const busStops = useAppSelector((state) => state.adminSlice.busStops) || [];

  // Fetch drivers and bus stops on component mount
  useEffect(() => {
    dispatch(fetchAllDrivers());
    dispatch(fetchAllBusStops());
  }, [dispatch]);

  // Handle route number validation
  const handleRouteNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const numberValue = parseInt(value, 10);

    if (isNaN(numberValue)) {
      setRouteNumberError("Route number must be a valid number.");
    } else if (numberValue < 1 || numberValue > 15) {
      setRouteNumberError("Route number must be between 1 and 15.");
    } else {
      setRouteNumberError(null);
    }

    onRouteChange("routeNumber", value);
  };

  // Handle driver selection change
  const handleDriverChange = (e: { target: { value: string } }) => {
    const selectedDriver = drivers.find(
      (driver) => driver && driver.id === e.target.value
    );
    if (selectedDriver) {
      onRouteChange("driver", selectedDriver);
    }
  };

  // Handle bus stop selection change
  const handleBusStopChange = (
    _: React.SyntheticEvent,
    newValue: BusStopType | null
  ) => {
    setSelectedBusStop(newValue);
  };

  // Handle adding a bus stop to the route
  const handleAddBusStop = () => {
    if (selectedBusStop && selectedRoute) {
      // Check if bus stop already exists in the route
      const alreadyExists = selectedRoute.busStops.some(
        (stop) => stop && stop.id === selectedBusStop.id
      );

      if (!alreadyExists) {
        const updatedStops = [...selectedRoute.busStops, selectedBusStop];
        onRouteChange("busStops", updatedStops);
      }

      setSelectedBusStop(null);
    }
  };

  // Handle removing a bus stop from the route
  const handleRemoveBusStop = (stopId: string) => {
    if (selectedRoute) {
      const updatedStops = selectedRoute.busStops.filter(
        (stop) => stop && stop.id !== stopId
      );
      onRouteChange("busStops", updatedStops);
    }
  };

  // If no route is selected, show a message
  if (!selectedRoute) {
    return <Typography padding={2}>No route selected.</Typography>;
  }

  // Ensure bus stops is a valid array
  const currentBusStops = selectedRoute.busStops || [];

  // Filter out available bus stops (not already selected)
  const availableBusStops = busStops.filter(
    (stop) =>
      stop && stop.id && !currentBusStops.some((s) => s && s.id === stop.id)
  );

  return (
    <Box sx={{ p: 3, display: "flex", flexDirection: "column", gap: 3 }}>
      {/* Route Name */}
      <TextField
        label="Route Name"
        value={selectedRoute.routeName || ""}
        onChange={(e) => onRouteChange("routeName", e.target.value)}
        fullWidth
        required
      />

      {/* Route Number */}
      <TextField
        label="Route Number"
        value={selectedRoute.routeNumber || ""}
        onChange={handleRouteNumberChange}
        fullWidth
        error={!!routeNumberError}
        helperText={routeNumberError}
        type="number"
        inputProps={{ min: 1, max: 15 }}
        required
      />

      {/* Vehicle Number */}
      <TextField
        label="Vehicle Number"
        value={selectedRoute.vehicleNumber || ""}
        onChange={(e) => onRouteChange("vehicleNumber", e.target.value)}
        fullWidth
        required
      />

      {/* Driver Selection */}
      <FormControl fullWidth required>
        <InputLabel id="driver-label">Driver</InputLabel>
        <Select
          labelId="driver-label"
          value={selectedRoute.driver?.id || ""}
          onChange={handleDriverChange}
          label="Driver"
        >
          {drivers.map((driver) =>
            driver && driver.id ? (
              <MenuItem key={driver.id} value={driver.id}>
                {driver.fullName || "Unknown Driver"}
              </MenuItem>
            ) : null
          )}
        </Select>
      </FormControl>

      {/* Bus Stops Section */}
      <Typography variant="h6" sx={{ mt: 2 }}>
        Bus Stops
      </Typography>
      <Divider />

      {/* Add new bus stop section */}
      <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
        <Autocomplete
          options={availableBusStops}
          getOptionLabel={(option) => option?.stopName || "Unknown Stop"}
          value={selectedBusStop}
          onChange={handleBusStopChange}
          isOptionEqualToValue={(option, value) =>
            option && value && option.id === value.id
          }
          renderInput={(params) => (
            <TextField
              {...params}
              label="Select Bus Stop"
              placeholder="Select a stop to add"
              fullWidth
            />
          )}
          sx={{ flexGrow: 1 }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddBusStop}
          disabled={!selectedBusStop}
          startIcon={<Add />}
        >
          Add Stop
        </Button>
      </Box>

      {/* Selected bus stops list */}
      <Paper
        variant="outlined"
        sx={{
          mt: 2,
          maxHeight: 200,
          overflow: "auto",
          p: currentBusStops.length ? 0 : 2,
        }}
      >
        {currentBusStops.length > 0 ? (
          <List dense>
            {currentBusStops.map((stop, index) =>
              stop && stop.id ? (
                <ListItem
                  key={stop.id}
                  secondaryAction={
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => handleRemoveBusStop(stop.id)}
                      size="small"
                    >
                      <Delete fontSize="small" color="error" />
                    </IconButton>
                  }
                >
                  <ListItemText
                    primary={`${index + 1}. ${stop.stopName || "Unknown Stop"}`}
                  />
                </ListItem>
              ) : null
            )}
          </List>
        ) : (
          <Typography variant="body2" color="text.secondary" align="center">
            No bus stops added yet. Add stops using the selector above.
          </Typography>
        )}
      </Paper>
    </Box>
  );
};

export default RouteForm;
