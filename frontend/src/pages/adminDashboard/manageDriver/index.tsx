import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { indigo } from "@mui/material/colors";
import { useFormik } from "formik";
import { driverSchema } from "../../../validationSchema";
import { DriverType } from "../../../types/driver.types";

const ManageDriver: React.FC = () => {
  const [drivers, setDrivers] = useState<DriverType[]>([]);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [editDriver, setEditDriver] = useState<DriverType | null>(null);

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 0.5, minWidth: 80 },
    { field: "fullName", headerName: "Driver Name", flex: 1, minWidth: 150 },
    { field: "busNumber", headerName: "Bus Number", flex: 1, minWidth: 150 },
    {
      field: "routeNumber",
      headerName: "Route Number",
      flex: 1,
      minWidth: 150,
    },
    {
      field: "contactNumber",
      headerName: "Contact Number",
      flex: 1,
      minWidth: 150,
    },
    { field: "cnicNumber", headerName: "CNIC Number", flex: 1, minWidth: 150 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      minWidth: 200,
      renderCell: (params: { row: DriverType }) => (
        <>
          <Button
            variant="contained"
            color="primary"
            size="small"
            sx={{ marginRight: 1 }}
            onClick={() => handleEdit(params.row)}
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

  const formik = useFormik({
    initialValues: {
      id: 0,
      fullName: "",
      cnicNumber: "",
      busNumber: "",
      routeNumber: "",
      contactNumber: "",
    },
    validationSchema: driverSchema,
    onSubmit: (values) => {
      if (editDriver) {
        setDrivers((prevDrivers) =>
          prevDrivers.map((driver) =>
            driver.id === values.id ? values : driver
          )
        );
      } else {
        setDrivers((prevDrivers) => [
          ...prevDrivers,
          { ...values, id: prevDrivers.length + 1 },
        ]);
      }
      handleCloseDialog();
    },
  });

  const handleAddDriver = (): void => {
    setEditDriver(null);
    formik.resetForm();
    setOpenDialog(true);
  };

  const handleEdit = (driver: DriverType): void => {
    setEditDriver(driver);
    formik.setValues(driver);
    setOpenDialog(true);
  };

  const handleDelete = (id: number): void => {
    setDrivers((prevDrivers) =>
      prevDrivers.filter((driver) => driver.id !== id)
    );
  };

  const handleCloseDialog = (): void => {
    setOpenDialog(false);
    formik.resetForm();
  };

  return (
    <Box m={4}>
      <Button
        variant="contained"
        color="primary"
        sx={{ mb: 2 }}
        onClick={handleAddDriver}
      >
        Add New Driver
      </Button>

      <DataGrid
        rows={drivers}
        columns={columns}
        autoHeight
        sx={{
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: indigo[400],
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: indigo[500],
          },
        }}
      />

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <form onSubmit={formik.handleSubmit}>
          <DialogTitle>
            {editDriver ? "Edit Driver" : "Add New Driver"}
          </DialogTitle>
          <DialogContent>
            <TextField
              label="Driver Name"
              name="fullName"
              value={formik.values.fullName}
              onChange={formik.handleChange}
              error={formik.touched.fullName && Boolean(formik.errors.fullName)}
              helperText={formik.touched.fullName && formik.errors.fullName}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Bus Number"
              name="busNumber"
              value={formik.values.busNumber}
              onChange={formik.handleChange}
              error={
                formik.touched.busNumber && Boolean(formik.errors.busNumber)
              }
              helperText={formik.touched.busNumber && formik.errors.busNumber}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Route Number"
              name="routeNumber"
              value={formik.values.routeNumber}
              onChange={formik.handleChange}
              error={
                formik.touched.routeNumber && Boolean(formik.errors.routeNumber)
              }
              helperText={
                formik.touched.routeNumber && formik.errors.routeNumber
              }
              fullWidth
              margin="normal"
              select
            >
              {Array.from({ length: 15 }, (_, i) => (
                <MenuItem key={i + 1} value={(i + 1).toString()}>
                  {i + 1}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="Contact Number"
              name="contactNumber"
              value={formik.values.contactNumber}
              onChange={formik.handleChange}
              error={
                formik.touched.contactNumber &&
                Boolean(formik.errors.contactNumber)
              }
              helperText={
                formik.touched.contactNumber && formik.errors.contactNumber
              }
              fullWidth
              margin="normal"
            />
            <TextField
              label="CNIC Number"
              name="cnicNumber"
              value={formik.values.cnicNumber}
              onChange={formik.handleChange}
              error={
                formik.touched.cnicNumber && Boolean(formik.errors.cnicNumber)
              }
              helperText={formik.touched.cnicNumber && formik.errors.cnicNumber}
              fullWidth
              margin="normal"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button type="submit" color="primary">
              Save
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};

export default ManageDriver;
