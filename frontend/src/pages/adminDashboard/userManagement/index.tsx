import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  fetchAllUsers,
  editUserById,
  deleteUserById,
} from "../../../store/user/adminThunk";
import { UserResponse } from "../../../types/admin.types";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
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
import UserForm from "../../../components/forms/UserForm";
import DeleteConfirmationDialog from "../../../components/DeleteDialogBox";

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
    { field: "displayId", headerName: "ID", flex: 0.5, width: 70 },
    { field: "fullName", headerName: "Full Name", flex: 1, width: 130 },
    { field: "email", headerName: "Email", flex: 1 },
    {
      field: "registrationNumber",
      headerName: "Registration No",
      flex: 1,
      width: 130,
    },
    { field: "departmentName", headerName: "Department", flex: 1, width: 130 },
    { field: "phoneNumber", headerName: "Contact No", flex: 1, width: 130 },
    { field: "routeNumber", headerName: "Route No", flex: 1, width: 130 },
    { field: "stopArea", headerName: "Stop Area", flex: 1, width: 130 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      width: 130,
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
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search sx={{ color: indigo[500] }} />
            </InputAdornment>
          ),
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

      <DeleteConfirmationDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={confirmDelete}
      />
    </Box>
  );
};

export default UserManagement;
