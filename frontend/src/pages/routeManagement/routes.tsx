import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { indigo } from "@mui/material/colors";

interface RouteType {
  id: number;
  routeName: string;
  driverName: string;
  busNumber: string;
  stops: string;
}

const RouteManagement: React.FC = () => {
  const [routes, setRoutes] = useState<RouteType[]>([
    {
      id: 1,
      routeName: "Anarkali Route",
      driverName: "Shafeq Ahmad",
      busNumber: "FBR-1023",
      stops: "UET KSK Campus - Band Road",
    },
    {
      id: 2,
      routeName: "Route 01",
      driverName: "Ansar",
      busNumber: "FBR-10232",
      stops: "UET KSK Campus - UET KSK Campus",
    },
    {
      id: 3,
      routeName: "Route 10",
      driverName: "Maqsood Khan",
      busNumber: "FBR-12034",
      stops: "UET KSK Campus - Band Road",
    },
  ]);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [editRoute, setEditRoute] = useState<RouteType | null>(null);

  const columns: GridColDef[] = [
    { field: "id", headerName: "#", width: 50 },
    { field: "routeName", headerName: "Route", flex: 1 },
    { field: "driverName", headerName: "Driver Name", flex: 1 },
    { field: "busNumber", headerName: "Bus #", flex: 1 },
    { field: "stops", headerName: "Stops", flex: 2 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params: { row: RouteType }) => (
        <>
          <Button
            variant="contained"
            color="warning"
            size="small"
            onClick={() => handleEdit(params.row)}
            sx={{ marginRight: 1 }}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            color="error"
            size="small"
            onClick={() => handleDelete(params.row.id)}
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

  const handleAddRoute = (): void => {
    setEditRoute(null);
    setOpenDialog(true);
  };

  const handleEdit = (route: RouteType): void => {
    setEditRoute(route);
    setOpenDialog(true);
  };

  const handleDelete = (id: number): void => {
    setRoutes((prevRoutes) => prevRoutes.filter((route) => route.id !== id));
  };

  const handleSave = (newRoute: RouteType): void => {
    if (editRoute) {
      setRoutes((prevRoutes) =>
        prevRoutes.map((route) => (route.id === newRoute.id ? newRoute : route))
      );
    } else {
      setRoutes((prevRoutes) => [
        ...prevRoutes,
        { ...newRoute, id: prevRoutes.length + 1 },
      ]);
    }
    setOpenDialog(false);
  };

  return (
    <Box m={4}>
      <Button
        variant="contained"
        color="primary"
        sx={{ mb: 2 }}
        onClick={handleAddRoute}
      >
        Add New Route
      </Button>

      <DataGrid
        rows={routes}
        columns={columns}
        autoHeight
        //disableSelectionOnClick
        sx={{
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: indigo[500],
            color: "#fff",
          },
        }}
      />

      {openDialog && (
        <RouteDialog
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          onSave={handleSave}
          route={editRoute}
        />
      )}
    </Box>
  );
};

interface RouteDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (route: RouteType) => void;
  route: RouteType | null;
}

const RouteDialog: React.FC<RouteDialogProps> = ({
  open,
  onClose,
  onSave,
  route,
}) => {
  const [formValues, setFormValues] = useState<RouteType>(
    route || {
      id: 0,
      routeName: "",
      driverName: "",
      busNumber: "",
      stops: "",
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onSave(formValues);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{route ? "Edit Route" : "Add New Route"}</DialogTitle>
      <DialogContent>
        <TextField
          label="Route Name"
          name="routeName"
          value={formValues.routeName}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Driver Name"
          name="driverName"
          value={formValues.driverName}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Bus Number"
          name="busNumber"
          value={formValues.busNumber}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Stops"
          name="stops"
          value={formValues.stops}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RouteManagement;
