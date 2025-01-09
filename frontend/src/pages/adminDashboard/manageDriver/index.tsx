import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  DialogContentText,
} from "@mui/material";
import Header from "../../../components/Header";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { mockDataDrivers } from "../data/mockData";
import { indigo } from "@mui/material/colors";

// Define driver type
interface Driver {
  id: number;
  name: string;
  bus_number: string;
  route_number: number;
  contact_number: string;
}

const ManageDriver = () => {
  const [drivers, setDrivers] = useState<Driver[]>(mockDataDrivers); // Specify driver type
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [currentDriver, setCurrentDriver] = useState<Driver | null>(null); // Specify possible null type
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
  const [driverToDelete, setDriverToDelete] = useState<Driver | null>(null); // Specify possible null type

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 0.5, minWidth: 80 },
    {
      field: "name",
      headerName: "Driver Name",
      flex: 1,
      minWidth: 130,
      cellClassName: "name-column--cell",
    },
    { field: "bus_number", headerName: "Bus No", flex: 1, minWidth: 130 },
    { field: "route_number", headerName: "Route No", flex: 1, minWidth: 130 },
    {
      field: "contact_number",
      headerName: "Contact Number",
      flex: 1,
      minWidth: 130,
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      minWidth: 130,
      renderCell: (params: { row: Driver }) => (
        <>
          <Button
            variant="contained"
            color="primary"
            size="small"
            sx={{ marginRight: "2px" }}
            onClick={() => handleEdit(params.row)}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            color="error"
            size="small"
            sx={{ margin: "2px" }}
            onClick={() => handleDelete(params.row)}
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

  const handleEdit = (driver: Driver): void => {
    setCurrentDriver(driver);
    setOpenDialog(true);
  };

  const handleDelete = (driver: Driver): void => {
    setDriverToDelete(driver);
    setOpenDeleteDialog(true);
  };

  const confirmDelete = (): void => {
    if (driverToDelete) {
      setDrivers(drivers.filter((driver) => driver.id !== driverToDelete.id));
      setOpenDeleteDialog(false);
      setDriverToDelete(null);
    }
  };

  const handleCloseDialog = (): void => {
    setOpenDialog(false);
    setCurrentDriver(null);
  };

  const handleSaveDriver = (): void => {
    if (currentDriver) {
      setDrivers(
        drivers.map((driver) =>
          driver.id === currentDriver.id ? currentDriver : driver
        )
      );
      setOpenDialog(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (currentDriver) {
      const { name, value } = e.target;
      setCurrentDriver({
        ...currentDriver,
        [name]: value,
      });
    }
  };

  return (
    <Box
      ml="20px"
      mt="40px"
      height="85vh"
      maxWidth="100vw"
      sx={{ "& .MuiDataGrid-root": { border: "none" } }}
    >
      <Header title="Manage Drivers" subtitle="List of All Drivers" />

      <DataGrid
        rows={drivers}
        columns={columns}
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: indigo[400],
            borderBottom: "none",
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: indigo[500],
          },
          "& .MuiCheckbox-root": {
            color: `${indigo[400]} !important`,
          },
          "& .MuiDataGrid-iconSeparator": {
            color: indigo[400],
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${indigo[400]} !important`,
          },
        }}
      />

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle color={indigo[700]}>Edit Driver</DialogTitle>
        <DialogContent>
          <TextField
            label="Driver Name"
            variant="outlined"
            fullWidth
            margin="normal"
            name="name"
            value={currentDriver?.name || ""}
            onChange={handleChange}
          />
          <TextField
            label="Bus Number"
            variant="outlined"
            fullWidth
            margin="normal"
            name="bus_number"
            value={currentDriver?.bus_number || ""}
            onChange={handleChange}
          />
          <TextField
            label="Route Number"
            variant="outlined"
            fullWidth
            margin="normal"
            name="route_number"
            value={currentDriver?.route_number || ""}
            onChange={handleChange}
          />
          <TextField
            label="Contact Number"
            variant="outlined"
            fullWidth
            margin="normal"
            name="contact_number"
            value={currentDriver?.contact_number || ""}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button color="primary" onClick={handleSaveDriver}>
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
      >
        <DialogTitle>Delete Driver</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this driver?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ManageDriver;
