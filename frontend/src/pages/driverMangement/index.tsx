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
import { Edit, Delete, Add } from "@mui/icons-material";
import { indigo } from "@mui/material/colors";
import { DriverResponse } from "../../types/admin.types";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import DeleteConfirmationDialog from "../../components/DeleteDialogBox";
import DriverForm from "../../components/forms/DriverForm";
import {
  fetchAllDrivers,
  deleteDriverById,
  addNewDriver,
  editDriverById,
} from "../../store/user/adminThunk";
import { UpdateDriverType } from "../../types/driver.types";
import toaster from "../../utils/toaster";
import SearchBar from "../../components/SearchBar";

const DriverManagement: React.FC = () => {
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

  const handleEditDriver = (driver: DriverResponse) => {
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

  const handleSaveDriver = () => {
    if (!selectedDriver) {
      toaster.error("No driver selected.");
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

    if (!/^\d{11}$/.test(selectedDriver.phoneNumber)) {
      toaster.error("Phone number must be exactly 11 digits.");
      return;
    }

    if (!/^\d{13}$/.test(selectedDriver.cnicNumber)) {
      toaster.error("CNIC number must be exactly 13 digits.");
      return;
    }

    const driverData: UpdateDriverType = {
      id: selectedDriver.id,
      fullName: selectedDriver.fullName,
      cnicNumber: selectedDriver.cnicNumber,
      phoneNumber: selectedDriver.phoneNumber,
    };

    if (isAddMode) {
      dispatch(addNewDriver(driverData))
        .unwrap()
        .then(() => {
          toaster.success("Driver added successfully!");
          setOpenDialog(false);
          dispatch(fetchAllDrivers());
        })
        .catch(() => {
          toaster.error("Failed to add driver.");
        });
    } else {
      dispatch(
        editDriverById({ userId: selectedDriver.id, values: driverData })
      )
        .unwrap()
        .then(() => {
          toaster.success("Driver updated successfully!");
          setOpenDialog(false);
          dispatch(fetchAllDrivers());
        })
        .catch(() => {
          toaster.error("Failed to update driver.");
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
    { field: "displayId", headerName: "ID", width: 100 },
    { field: "fullName", headerName: "Full Name", width: 200 },
    { field: "cnicNumber", headerName: "CNIC Number", width: 200 },
    {
      field: "phoneNumber",
      headerName: "Contact Number",
      width: 200,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
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
          placeholder="Search By CNIC"
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
          Manage Drivers
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

        <Paper
          sx={{
            height: 300,
            mt: 2,
            width: "95%",
          }}
        >
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
              "& .MuiDataGrid-cell": {},
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

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle
          sx={{ backgroundColor: indigo[500], color: "#fff", fontSize: "20px" }}
        >
          {isAddMode ? "Add New Driver" : "Update Driver"}
        </DialogTitle>
        <DriverForm
          selectedDriver={selectedDriver}
          onFieldChange={(field, value) =>
            setSelectedDriver({ ...selectedDriver!, [field]: value })
          }
        />
        <DialogActions sx={{ backgroundColor: indigo[50], padding: "10px" }}>
          <Button
            onClick={() => setOpenDialog(false)}
            sx={{ color: indigo[900] }}
          >
            Cancel
          </Button>
          <Button onClick={handleSaveDriver} sx={{ color: indigo[700] }}>
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

export default DriverManagement;
