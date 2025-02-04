import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  fetchAllUsers,
  editUserById,
  deleteUserById,
} from "../../../store/user/adminThunk";
import { UserResponse, UpdateUserType } from "../../../types/admin.types";
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
import { Edit, Delete, Search } from "@mui/icons-material";
import toaster from "../../../utils/toaster";
import { indigo } from "@mui/material/colors";

const ManageUser: React.FC = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.adminSlice.users);
  const [selectedUser, setSelectedUser] = useState<UserResponse | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  useEffect(() => {
    dispatch(fetchAllUsers({}));
  }, [dispatch]);

  const usersWithDisplayId = (users || []).map((user, index) => ({
    ...user,
    displayId: index + 1,
  }));

  const handleEditUser = (user: UserResponse) => {
    setSelectedUser(user);
    setOpenDialog(true);
  };

  const handleDeleteUser = (userId: string) => {
    setUserToDelete(userId);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (userToDelete) {
      dispatch(deleteUserById(userToDelete))
        .unwrap()
        .then(() => {
          toaster.success("User deleted successfully!");
          setDeleteDialogOpen(false);
          dispatch(fetchAllUsers({}));
        })
        .catch(() => {
          toaster.error("Failed to delete user.");
        });
    }
  };

  const handleUpdateUser = () => {
    if (selectedUser) {
      const updatedUser: UpdateUserType = {
        id: selectedUser.id,
        email: selectedUser.email,
        fullName: selectedUser.fullName,
        registrationNumber: selectedUser.registrationNumber,
        departmentName: selectedUser.departmentName,
        phoneNumber: selectedUser.phoneNumber,
        routeNumber: selectedUser.routeNumber,
        gender: selectedUser.gender,
        stopArea: selectedUser.stopArea,
      };

      dispatch(editUserById({ userId: selectedUser.id, values: updatedUser }))
        .unwrap()
        .then(() => {
          toaster.success("User updated successfully!");
          setOpenDialog(false);
          dispatch(fetchAllUsers({}));
        })
        .catch(() => {
          toaster.error("Failed to update user.");
        });
    }
  };

  const filteredUsers = usersWithDisplayId.filter((user) => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    return (
      user.fullName.toLowerCase().includes(lowerCaseQuery) ||
      user.email.toLowerCase().includes(lowerCaseQuery) ||
      user.phoneNumber.toLowerCase().includes(lowerCaseQuery) ||
      user.registrationNumber.toLowerCase().includes(lowerCaseQuery)
    );
  });

  const columns: GridColDef[] = [
    { field: "displayId", headerName: "ID", flex: 0.5 },
    { field: "fullName", headerName: "Full Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "registrationNumber", headerName: "Registration No", flex: 1 },
    { field: "departmentName", headerName: "Department", flex: 1 },
    { field: "phoneNumber", headerName: "Contact No", flex: 1 },
    { field: "routeNumber", headerName: "Route No", flex: 1 },
    { field: "stopArea", headerName: "Stop Area", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <>
          <IconButton onClick={() => handleEditUser(params.row)}>
            <Edit sx={{ color: indigo[500] }} />
          </IconButton>
          <IconButton onClick={() => handleDeleteUser(params.row.id)}>
            <Delete sx={{ color: "red" }} />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 2, color: indigo[700] }}>
        Manage Users
      </Typography>

      <TextField
        fullWidth
        margin="normal"
        variant="outlined"
        placeholder="Search by full name, email, phone number, or registration number..."
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

      <Box sx={{ overflowX: "auto" }}>
        <DataGrid
          rows={filteredUsers}
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

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle
          sx={{ backgroundColor: indigo[500], color: "#fff", fontSize: "20px" }}
        >
          Update User
        </DialogTitle>
        <DialogContent sx={{ padding: "20px", fontSize: "16px" }}>
          <TextField
            label="Full Name"
            value={selectedUser?.fullName || ""}
            onChange={(e) =>
              setSelectedUser({ ...selectedUser!, fullName: e.target.value })
            }
            fullWidth
            margin="normal"
            sx={{ fontSize: "16px" }}
          />
          <TextField
            label="Email"
            value={selectedUser?.email || ""}
            onChange={(e) =>
              setSelectedUser({ ...selectedUser!, email: e.target.value })
            }
            fullWidth
            margin="normal"
            sx={{ fontSize: "16px" }}
          />
          <TextField
            label="Registration Number"
            value={selectedUser?.registrationNumber || ""}
            onChange={(e) =>
              setSelectedUser({
                ...selectedUser!,
                registrationNumber: e.target.value,
              })
            }
            fullWidth
            margin="normal"
            sx={{ fontSize: "16px" }}
          />
          <TextField
            label="Department Name"
            value={selectedUser?.departmentName || ""}
            onChange={(e) =>
              setSelectedUser({
                ...selectedUser!,
                departmentName: e.target.value,
              })
            }
            fullWidth
            margin="normal"
            sx={{ fontSize: "16px" }}
          />
          <TextField
            label="Phone Number"
            value={selectedUser?.phoneNumber || ""}
            onChange={(e) => {
              const value = e.target.value;
              if (/^\d{0,11}$/.test(value)) {
                setSelectedUser({ ...selectedUser!, phoneNumber: value });
              }
            }}
            fullWidth
            margin="normal"
            sx={{ fontSize: "16px" }}
            error={
              !!(
                selectedUser?.phoneNumber &&
                !/^\d{11}$/.test(selectedUser.phoneNumber)
              )
            }
            helperText={
              selectedUser?.phoneNumber &&
              !/^\d{11}$/.test(selectedUser.phoneNumber)
                ? "Phone number must be exactly 11 digits."
                : ""
            }
          />
          <TextField
            label="Route Number"
            value={selectedUser?.routeNumber || ""}
            onChange={(e) => {
              const value = e.target.value;
              if (
                /^\d{0,2}$/.test(value) &&
                (value === "" ||
                  (parseInt(value, 10) >= 1 && parseInt(value, 10) <= 15))
              ) {
                setSelectedUser({ ...selectedUser!, routeNumber: value });
              }
            }}
            fullWidth
            margin="normal"
            sx={{ fontSize: "16px" }}
            error={
              !!(
                selectedUser?.routeNumber &&
                !/^\d{1,2}$/.test(selectedUser.routeNumber)
              )
            }
            helperText={
              selectedUser?.routeNumber &&
              !/^\d{1,2}$/.test(selectedUser.routeNumber)
                ? "Route number must be between 1 and 15."
                : ""
            }
          />

          <TextField
            label="Stop Area"
            value={selectedUser?.stopArea || ""}
            onChange={(e) =>
              setSelectedUser({ ...selectedUser!, stopArea: e.target.value })
            }
            fullWidth
            margin="normal"
            sx={{ fontSize: "16px" }}
          />
        </DialogContent>
        <DialogActions sx={{ backgroundColor: indigo[50], padding: "10px" }}>
          <Button
            onClick={() => setOpenDialog(false)}
            sx={{ color: indigo[900] }}
          >
            Cancel
          </Button>
          <Button onClick={handleUpdateUser} sx={{ color: indigo[700] }}>
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this user?
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

export default ManageUser;
