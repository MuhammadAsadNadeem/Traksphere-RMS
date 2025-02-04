import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  fetchAllDrivers,
  editDriverById,
  deleteDriverById,
  addNewDriver,
} from "../../../store/user/adminThunk";
import { DriverResponse } from "../../../types/admin.types";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  IconButton,
  Typography,
  InputAdornment,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Edit, Delete, Search, Add, Refresh } from "@mui/icons-material";
import toaster from "../../../utils/toaster";
import { indigo } from "@mui/material/colors";
import { UpdateDriverType } from "../../../types/driver.types";

const ManageDriver: React.FC = () => {
  const dispatch = useAppDispatch();
  const drivers = useAppSelector((state) => state.adminSlice.drivers);
  const [selectedDriver, setSelectedDriver] = useState<DriverResponse | null>(
    null
  );
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [driverToDelete, setDriverToDelete] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddMode, setIsAddMode] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    dispatch(fetchAllDrivers());
  }, [dispatch]);

  const driversWithDisplayId = (drivers || [])
    .filter((driver) => driver != null)
    .map((driver, index) => ({
      ...driver,
      displayId: index + 1,
      id: driver.id || `driver-${index + 1}`,
    }));

  const validatePhoneNumber = (phoneNumber: string): boolean => {
    return /^\d{11}$/.test(phoneNumber);
  };

  const validateCnicNumber = (cnicNumber: string): boolean => {
    return /^\d{13}$/.test(cnicNumber);
  };

  const handleEditDriver = (driver: DriverResponse | null) => {
    if (!driver) {
      toaster.error("Invalid driver data.");
      return;
    }

    setSelectedDriver(driver);
    setIsAddMode(false);
    setOpenDialog(true);
  };

  const handleAddDriver = () => {
    setSelectedDriver({
      id: "",
      fullName: "",
      cnicNumber: "",
      phoneNumber: "",
    });
    setIsAddMode(true);
    setOpenDialog(true);
  };

  const handleDeleteDriver = (driverId: string) => {
    setDriverToDelete(driverId);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (driverToDelete) {
      dispatch(deleteDriverById(driverToDelete))
        .unwrap()
        .then(() => {
          toaster.success("Driver deleted successfully!");
          setDeleteDialogOpen(false);
          dispatch(fetchAllDrivers());
        })
        .catch(() => {
          toaster.error("Failed to delete driver.");
        });
    }
  };

  const handleUpdateDriver = () => {
    if (!selectedDriver) {
      toaster.error("No driver selected for update.");
      return;
    }

    if (
      !selectedDriver.fullName ||
      !selectedDriver.cnicNumber ||
      !selectedDriver.phoneNumber
    ) {
      toaster.error("All fields are required.");
      return;
    }

    if (!validatePhoneNumber(selectedDriver.phoneNumber)) {
      toaster.error("Phone number must be exactly 11 digits.");
      return;
    }
    if (!validateCnicNumber(selectedDriver.cnicNumber)) {
      toaster.error("CNIC number must be exactly 13 digits.");
      return;
    }

    const updatedDriver: UpdateDriverType = {
      id: selectedDriver.id,
      fullName: selectedDriver.fullName,
      cnicNumber: selectedDriver.cnicNumber,
      phoneNumber: selectedDriver.phoneNumber,
    };

    dispatch(
      editDriverById({ userId: selectedDriver.id, values: updatedDriver })
    )
      .unwrap()
      .then(() => {
        toaster.success("Driver updated successfully!");
        setOpenDialog(false);
        dispatch(fetchAllDrivers());
      })
      .catch((error) => {
        console.error("Failed to update driver:", error);
        toaster.error("Failed to update driver.");
      });
  };

  const handleAddNewDriver = () => {
    if (selectedDriver) {
      if (
        !selectedDriver.fullName ||
        !selectedDriver.cnicNumber ||
        !selectedDriver.phoneNumber
      ) {
        toaster.error("All fields are required.");
        return;
      }

      if (!validatePhoneNumber(selectedDriver.phoneNumber)) {
        toaster.error("Phone number must be exactly 11 digits.");
        return;
      }
      if (!validateCnicNumber(selectedDriver.cnicNumber)) {
        toaster.error("CNIC number must be exactly 13 digits.");
        return;
      }

      const newDriver: UpdateDriverType = {
        id: selectedDriver.id,
        fullName: selectedDriver.fullName,
        cnicNumber: selectedDriver.cnicNumber,
        phoneNumber: selectedDriver.phoneNumber,
      };

      dispatch(addNewDriver(newDriver))
        .unwrap()
        .then(() => {
          toaster.success("Driver added successfully!");
          setOpenDialog(false);
          dispatch(fetchAllDrivers());
        })
        .catch((error) => {
          console.error("Failed to add driver:", error);
          toaster.error("Failed to add driver.");
        });
    }
  };

  const filteredDrivers = driversWithDisplayId.filter((driver) => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    return (
      (driver.fullName || "").toLowerCase().includes(lowerCaseQuery) ||
      (driver.cnicNumber || "").toLowerCase().includes(lowerCaseQuery) ||
      (driver.phoneNumber || "").toLowerCase().includes(lowerCaseQuery)
    );
  });

  const columns: GridColDef[] = [
    { field: "displayId", headerName: "ID", flex: 1 },
    { field: "fullName", headerName: "Full Name", flex: 1 },
    { field: "cnicNumber", headerName: "CNIC Number", flex: 1 },
    { field: "phoneNumber", headerName: "Contact Number", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <>
          <IconButton onClick={() => handleEditDriver(params.row)}>
            <Edit sx={{ color: indigo[500] }} />
          </IconButton>
          <IconButton onClick={() => handleDeleteDriver(params.row.id)}>
            <Delete sx={{ color: "red" }} />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 2, color: indigo[700] }}>
        Manage Drivers
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "flex-start", mt: 2 }}>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={handleAddDriver}
          sx={{
            backgroundColor: indigo[500],
            "&:hover": { backgroundColor: indigo[900] },
            minWidth: isMobile ? "20%" : "auto",
          }}
        >
          Add Driver
        </Button>
      </Box>
      <TextField
        fullWidth
        margin="normal"
        variant="outlined"
        placeholder="Search by Full name, CNIC, or Contact Number..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        sx={{ mb: 2 }}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <Search sx={{ color: indigo[500] }} />
              </InputAdornment>
            ),
          },
        }}
      />

      <Box sx={{ overflowX: "auto", mb: 2 }}>
        <DataGrid
          rows={filteredDrivers}
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

      <Box sx={{ display: "flex", justifyContent: "flex-start", mt: 2 }}>
        <Button
          variant="contained"
          startIcon={<Refresh />}
          onClick={() => dispatch(fetchAllDrivers())}
          sx={{
            backgroundColor: indigo[500],
            "&:hover": { backgroundColor: indigo[900] },
          }}
        >
          Refresh
        </Button>
      </Box>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle
          sx={{ backgroundColor: indigo[500], color: "#fff", fontSize: "20px" }}
        >
          {isAddMode ? "Add New Driver" : "Update Driver"}
        </DialogTitle>
        <DialogContent sx={{ padding: "20px", fontSize: "16px" }}>
          <TextField
            label="Full Name"
            value={selectedDriver?.fullName || ""}
            onChange={(e) =>
              setSelectedDriver({
                ...selectedDriver!,
                fullName: e.target.value,
              })
            }
            fullWidth
            margin="normal"
            sx={{ fontSize: "16px" }}
          />
          <TextField
            label="CNIC Number"
            value={selectedDriver?.cnicNumber || ""}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, "");
              setSelectedDriver({
                ...selectedDriver!,
                cnicNumber: value,
              });
            }}
            fullWidth
            margin="normal"
            sx={{ fontSize: "16px" }}
            inputProps={{ maxLength: 13 }}
          />
          <TextField
            label="Contact Number"
            value={selectedDriver?.phoneNumber || ""}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, "");
              setSelectedDriver({
                ...selectedDriver!,
                phoneNumber: value,
              });
            }}
            fullWidth
            margin="normal"
            sx={{ fontSize: "16px" }}
            inputProps={{ maxLength: 11 }}
          />
        </DialogContent>
        <DialogActions sx={{ backgroundColor: indigo[50], padding: "10px" }}>
          <Button
            onClick={() => setOpenDialog(false)}
            sx={{ color: indigo[900] }}
          >
            Cancel
          </Button>
          <Button
            onClick={isAddMode ? handleAddNewDriver : handleUpdateDriver}
            sx={{ color: indigo[700] }}
          >
            {isAddMode ? "Add" : "Save"}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this driver?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={confirmDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ManageDriver;
