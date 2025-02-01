import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  fetchAllUsers,
  editUserById,
  deleteUserById,
} from "../../../store/thunks/adminThunk";
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
} from "@mui/material";
import { Edit, Delete, Search } from "@mui/icons-material";
import toaster from "../../../utils/toaster"; // Import the custom toaster utility

const ManageUser: React.FC = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.adminSlice.users);
  const [selectedUser, setSelectedUser] = useState<UserResponse | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch users on component mount
  useEffect(() => {
    dispatch(fetchAllUsers({})); // Pass any filters if needed
  }, [dispatch]);

  // Add displayId to each user
  const usersWithDisplayId = (users || []).map((user, index) => ({
    ...user,
    displayId: index + 1,
  }));

  // Handle edit user
  const handleEditUser = (user: UserResponse) => {
    setSelectedUser(user);
    setOpenDialog(true);
  };

  // Handle delete user
  const handleDeleteUser = (userId: string) => {
    setUserToDelete(userId);
    setDeleteDialogOpen(true);
  };

  // Confirm delete
  const confirmDelete = () => {
    if (userToDelete) {
      dispatch(deleteUserById(userToDelete))
        .unwrap()
        .then(() => {
          toaster.success("User deleted successfully!"); // Show success toast
          setDeleteDialogOpen(false);
          dispatch(fetchAllUsers({})); // Refresh the list
        })
        .catch(() => {
          toaster.error("Failed to delete user."); // Show error toast
        });
    }
  };

  // Handle update user
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
          toaster.success("User updated successfully!"); // Show success toast
          setOpenDialog(false);
          dispatch(fetchAllUsers({})); // Refresh the list
        })
        .catch(() => {
          toaster.error("Failed to update user."); // Show error toast
        });
    }
  };

  // Filter users based on search query
  const filteredUsers = usersWithDisplayId.filter((user) => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    return (
      user.fullName.toLowerCase().includes(lowerCaseQuery) ||
      user.email.toLowerCase().includes(lowerCaseQuery) ||
      user.phoneNumber.toLowerCase().includes(lowerCaseQuery) ||
      user.registrationNumber.toLowerCase().includes(lowerCaseQuery)
    );
  });

  // Columns for DataGrid
  const columns: GridColDef[] = [
    { field: "displayId", headerName: "ID", flex: 1 }, // Use displayId for the ID column
    { field: "fullName", headerName: "Full Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "registrationNumber", headerName: "Registration No", flex: 1 },
    { field: "departmentName", headerName: "Department", flex: 1 },
    { field: "phoneNumber", headerName: "Phone No", flex: 1 },
    { field: "routeNumber", headerName: "Route No", flex: 1 },
    { field: "stopArea", headerName: "Stop Area", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <>
          <IconButton onClick={() => handleEditUser(params.row)}>
            <Edit sx={{ color: "blue" }} />
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
      {/* Heading */}
      <Typography variant="h4" sx={{ mb: 2 }}>
        Manage Users
      </Typography>

      {/* Search Bar with Icon */}
      <TextField
        fullWidth
        margin="normal"
        variant="outlined"
        placeholder="Search by full name, email, phone number, or registration number..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        sx={{ mb: 2 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
        }}
      />

      <DataGrid
        rows={filteredUsers}
        columns={columns}
        getRowId={(row) => row.id} // Use the actual database ID for row identification
        initialState={{
          pagination: {
            paginationModel: { pageSize: 10, page: 0 },
          },
        }}
      />

      {/* Edit Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          <TextField
            label="Full Name"
            value={selectedUser?.fullName || ""}
            onChange={(e) =>
              setSelectedUser({ ...selectedUser!, fullName: e.target.value })
            }
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email"
            value={selectedUser?.email || ""}
            onChange={(e) =>
              setSelectedUser({ ...selectedUser!, email: e.target.value })
            }
            fullWidth
            margin="normal"
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
          />
          <TextField
            label="Phone Number"
            value={selectedUser?.phoneNumber || ""}
            onChange={(e) =>
              setSelectedUser({ ...selectedUser!, phoneNumber: e.target.value })
            }
            fullWidth
            margin="normal"
          />
          <TextField
            label="Route Number"
            value={selectedUser?.routeNumber || ""}
            onChange={(e) =>
              setSelectedUser({ ...selectedUser!, routeNumber: e.target.value })
            }
            fullWidth
            margin="normal"
          />
          <TextField
            label="Stop Area"
            value={selectedUser?.stopArea || ""}
            onChange={(e) =>
              setSelectedUser({ ...selectedUser!, stopArea: e.target.value })
            }
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleUpdateUser}>Save</Button>
        </DialogActions>
      </Dialog>

      {/* Delete Dialog */}
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
