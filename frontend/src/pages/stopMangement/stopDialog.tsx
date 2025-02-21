import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogActions,
  TextField,
  Button,
  Box,
} from "@mui/material";
import { indigo } from "@mui/material/colors";
import { BusStopType } from "../../../types/stop.types";
import MapComponent from "./mapComponent";

interface StopDialogProps {
  open: boolean;
  onClose: () => void;
  stop: BusStopType | null;
  isAddMode: boolean;
  onSave: (stop: BusStopType) => void;
}

const StopDialog: React.FC<StopDialogProps> = ({
  open,
  onClose,
  stop,
  isAddMode,
  onSave,
}) => {
  const [localStop, setLocalStop] = useState<BusStopType | null>(stop);
  const [mapLocation, setMapLocation] = useState<[number, number]>(
    stop ? [stop.latitude, stop.longitude] : [30.3753, 69.3451]
  );

  useEffect(() => {
    if (stop) {
      setLocalStop(stop);
      setMapLocation([stop.latitude, stop.longitude]);
    }
  }, [stop]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle sx={{ bgcolor: indigo[500], color: "white" }}>
        {isAddMode ? "Add New Bus Stop" : "Edit Bus Stop"}
      </DialogTitle>
      <Box sx={{ p: 3 }}>
        <TextField
          fullWidth
          label="Stop Name"
          value={localStop?.stopName || ""}
          onChange={(e) =>
            setLocalStop((prev) => ({
              ...prev!,
              stopName: e.target.value,
            }))
          }
          sx={{ mb: 2 }}
        />
        <Box sx={{ height: 400 }}>
          <MapComponent
            stops={localStop ? [localStop] : []}
            center={mapLocation}
          />
        </Box>
      </Box>
      <DialogActions sx={{ bgcolor: indigo[50] }}>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          onClick={() => onSave(localStop!)}
          variant="contained"
          color="primary"
        >
          {isAddMode ? "Add Stop" : "Save Changes"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default StopDialog;
