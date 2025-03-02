import React, { useState } from "react";
import {
  Box,
  Button,
  Paper,
  Typography,
  Dialog,
  DialogTitle,
  DialogActions,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
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
  const [selectedRoute, setSelectedRoute] = useState<RouteType | null>(null);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
  const [routeToDelete, setRouteToDelete] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isAddMode, setIsAddMode] = useState<boolean>(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Filter routes based on search query
  const filteredRoutes = routes.filter(
    (route) =>
      route.driverName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      route.routeName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handlers
  const handleAddRoute = () => {
    setSelectedRoute({
      id: 0,
      routeName: "",
      driverName: "",
      busNumber: "",
      stops: "",
    });
    setIsAddMode(true);
    setOpenDialog(true);
  };

  const handleEditRoute = (route: RouteType) => {
    setSelectedRoute(route);
    setIsAddMode(false);
    setOpenDialog(true);
  };

  const handleDeleteRoute = (id: number) => {
    setRouteToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (routeToDelete !== null) {
      setRoutes((prevRoutes) =>
        prevRoutes.filter((route) => route.id !== routeToDelete)
      );
      setDeleteDialogOpen(false);
      setRouteToDelete(null);
    }
  };

  const handleSaveRoute = (newRoute: RouteType) => {
    if (isAddMode) {
      setRoutes((prevRoutes) => [
        ...prevRoutes,
        { ...newRoute, id: prevRoutes.length + 1 },
      ]);
    } else {
      setRoutes((prevRoutes) =>
        prevRoutes.map((route) => (route.id === newRoute.id ? newRoute : route))
      );
    }
    setOpenDialog(false);
  };

  // Define columns for DataGrid
  const columns: GridColDef[] = [
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
            onClick={() => handleEditRoute(params.row)}
            sx={{ marginRight: 1 }}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            color="error"
            size="small"
            onClick={() => handleDeleteRoute(params.row.id)}
          >
            Delete
          </Button>
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
          mt: 10,
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
            color: theme.palette.primary.dark,
            width: "95%",
          }}
        >
          Manage Routes
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
            onClick={handleAddRoute}
            sx={{
              backgroundColor: theme.button.backgroundColor,
              color: theme.button.color,
              "&:hover": {
                backgroundColor: theme.button.hoverBackgroundColor,
              },
              minWidth: isMobile ? "20%" : "auto",
            }}
          >
            Add Route
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
                backgroundColor: theme.table.backgroundColor,
                color: theme.table.color,
              },
              "& .MuiDataGrid-footerContainer": {
                backgroundColor: theme.table.backgroundColor,
                color: theme.table.color,
              },
            }}
          />
        </Paper>
      </Box>

      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle
          sx={{
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
            fontSize: "20px",
          }}
        >
          {isAddMode ? "Add New Route" : "Update Route"}
        </DialogTitle>
        <RouteForm selectedRoute={selectedRoute} onSave={handleSaveRoute} />
        <DialogActions
          sx={{
            backgroundColor: theme.table.backgroundColor,
            padding: "10px",
          }}
        >
          <Button
            onClick={() => setOpenDialog(false)}
            sx={{ color: theme.button.backgroundColor }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => handleSaveRoute(selectedRoute!)}
            sx={{
              backgroundColor: theme.button.backgroundColor,
              color: theme.button.color,
              "&:hover": {
                backgroundColor: theme.button.hoverBackgroundColor,
              },
            }}
          >
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

export default RouteManagement;
