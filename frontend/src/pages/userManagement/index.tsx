import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  Typography,
  Paper,
  useTheme,
  useMediaQuery,
  IconButton,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { indigo } from "@mui/material/colors";
import DeleteConfirmationDialog from "../../components/DeleteDialogBox";
import UserForm from "../../components/forms/UserForm";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  fetchAllUsers,
  deleteUserById,
  editUserById,
} from "../../store/user/adminThunk";
import { UserResponse } from "../../types/admin.types";
import toaster from "../../utils/toaster";
import SearchBar from "../../components/SearchBar";

const UserManagement: React.FC = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.adminSlice.users);
  const [selectedUser, setSelectedUser] = useState<UserResponse | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Fetch users on component mount
  useEffect(() => {
    dispatch(fetchAllUsers({}));
  }, [dispatch]);

  // Handle user edit
  const handleEditUser = (user: UserResponse) => {
    setSelectedUser(user);
    setOpenDialog(true);
  };

  // Handle user delete
  const handleDeleteUser = (userId: string) => {
    setUserToDelete(userId);
    setDeleteDialogOpen(true);
  };

  // Confirm delete action
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

  // Handle user update
  const handleUpdateUser = () => {
    if (selectedUser) {
      dispatch(editUserById({ userId: selectedUser.id, values: selectedUser }))
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

  // Filter users based on search query
  const filteredUsers = (users || [])
    .map((user, index) => ({
      ...user,
      displayId: index + 1,
    }))
    .filter((user) => {
      const lowerCaseQuery = searchQuery.toLowerCase();
      return (
        user.fullName.toLowerCase().includes(lowerCaseQuery) ||
        user.email.toLowerCase().includes(lowerCaseQuery) ||
        user.phoneNumber.toLowerCase().includes(lowerCaseQuery) ||
        user.registrationNumber.toLowerCase().includes(lowerCaseQuery)
      );
    });

  // Define columns for the DataGrid
  const columns: GridColDef[] = [
    { field: "displayId", headerName: "ID", width: 100 },
    { field: "fullName", headerName: "Full Name", width: 150 },
    { field: "email", headerName: "Email", width: 150 },
    { field: "registrationNumber", headerName: "Registration No", width: 150 },
    { field: "departmentName", headerName: "Department", width: 150 },
    { field: "phoneNumber", headerName: "Contact No", width: 150 },
    { field: "routeNumber", headerName: "Route No", width: 150 },
    { field: "stopArea", headerName: "Stop Area", width: 150 },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
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
    <Box sx={{ height: "90vh", p: isMobile ? 1 : 3 }}>
      {/* Search Bar */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          width: "100%",
          mt: 3,
          mb: 2,
        }}
      >
        <SearchBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          placeholder="Search By Name, Email, Contact Number"
          isMobile={isMobile}
        />
      </Box>

      {/* Page Title */}
      <Typography
        variant="h4"
        sx={{
          mb: 2,
          color: indigo[700],
          textAlign: "left",
        }}
      >
        Manage Users
      </Typography>

      {/* DataGrid */}
      <Paper sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={filteredUsers}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 10, page: 0 },
            },
          }}
          pageSizeOptions={[5, 10]}
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

      {/* Edit User Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle
          sx={{ backgroundColor: indigo[500], color: "#fff", fontSize: "20px" }}
        >
          Update User
        </DialogTitle>
        <UserForm
          selectedUser={selectedUser}
          onFieldChange={(field, value) =>
            setSelectedUser({ ...selectedUser!, [field]: value })
          }
        />
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

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={confirmDelete}
      />
    </Box>
  );
};

export default UserManagement;
