import React, { useState } from "react";
import {
  Box,
  Button,
  Paper,
  Typography,
  Dialog,
  DialogTitle,
  DialogActions,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { indigo } from "@mui/material/colors";
import { Add } from "@mui/icons-material";
import DeleteConfirmationDialog from "../../components/DeleteDialogBox";
import RouteForm from "../../components/forms/DriverForm";
import SearchBar from "../../components/SearchBar";

interface RouteType {
  id: number;
  routeName: string;
  driverName: string;
  busNumber: string;
  stops: string;
}

const RouteManagement: React.FC = () => {
  const [routes, setRoutes] = useState<RouteType[]>([]);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [editRoute, setEditRoute] = useState<RouteType | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
  const [routeToDelete, setRouteToDelete] = useState<number | null>(null);
  const isMobile = false;

  const filteredRoutes = routes.filter(
    (route) =>
      route.driverName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      route.routeName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddRoute = (): void => {
    setEditRoute(null);
    setOpenDialog(true);
  };

  const handleEdit = (route: RouteType): void => {
    setEditRoute(route);
    setOpenDialog(true);
  };

  const handleDelete = (id: number): void => {
    setRouteToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = (): void => {
    if (routeToDelete !== null) {
      setRoutes((prevRoutes) =>
        prevRoutes.filter((route) => route.id !== routeToDelete)
      );
      setDeleteDialogOpen(false);
      setRouteToDelete(null);
    }
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
  const getColumns = (
    handleEdit: (route: RouteType) => void,
    handleDelete: (id: number) => void
  ): GridColDef[] => [
    { field: "id", headerName: "#", width: 50 },
    { field: "routeName", headerName: "Route", width: 150 },
    { field: "driverName", headerName: "Driver Name", width: 150 },
    { field: "busNumber", headerName: "Bus #", width: 150 },
    { field: "stops", headerName: "Stops", width: 150 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
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
  const columns: GridColDef[] = getColumns(handleEdit, handleDelete);

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
          placeholder="Search By Driver Name & Route Name"
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
          Manage Route
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={handleAddRoute}
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
          rows={filteredRoutes}
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

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle
          sx={{ backgroundColor: indigo[500], color: "#fff", fontSize: "20px" }}
        >
          {editRoute ? "Update Route" : "Add New Route"}
        </DialogTitle>
        <RouteForm selectedRoute={editRoute} onSave={handleSave} />
        <DialogActions sx={{ backgroundColor: indigo[50], padding: "10px" }}>
          <Button
            onClick={() => setOpenDialog(false)}
            sx={{ color: indigo[900] }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => handleSave(editRoute || ({} as RouteType))}
            sx={{ color: indigo[700] }}
          >
            {editRoute ? "Save" : "Add"}
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

// Helper function to define columns

export default RouteManagement;
