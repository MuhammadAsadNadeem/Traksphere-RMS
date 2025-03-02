import React, { useEffect, useState, useCallback, useMemo } from "react";
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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [selectedUser, setSelectedUser] = useState<UserResponse | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch users when component mounts
  useEffect(() => {
    dispatch(fetchAllUsers({}));
  }, [dispatch]);

  // Handlers
  const handleEditUser = useCallback((user: UserResponse) => {
    setSelectedUser(user);
    setOpenDialog(true);
  }, []);

  const handleDeleteUser = useCallback((userId: string) => {
    setUserToDelete(userId);
    setDeleteDialogOpen(true);
  }, []);

  const confirmDelete = useCallback(() => {
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
  }, [userToDelete, dispatch]);

  const handleUpdateUser = useCallback(() => {
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
  }, [selectedUser, dispatch]);

  // Memoized filtering of users based on search query
  const filteredUsers = useMemo(() => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    return (users || [])
      .map((user, index) => ({
        ...user,
        displayId: index + 1,
      }))
      .filter(
        (user) =>
          user.fullName.toLowerCase().includes(lowerCaseQuery) ||
          user.email.toLowerCase().includes(lowerCaseQuery) ||
          user.phoneNumber.toLowerCase().includes(lowerCaseQuery) ||
          user.registrationNumber.toLowerCase().includes(lowerCaseQuery)
      );
  }, [users, searchQuery]);

  // Define DataGrid columns and adjust for mobile view
  const columns: GridColDef[] = useMemo(() => {
    const commonColumns: GridColDef[] = [
      { field: "displayId", headerName: "ID", width: 80 },
      { field: "fullName", headerName: "Full Name", width: 150 },
      { field: "email", headerName: "Email", width: 150 },
      { field: "phoneNumber", headerName: "Contact No", width: 120 },
    ];

    // Show extra columns on larger screens
    if (!isMobile) {
      commonColumns.push(
        {
          field: "registrationNumber",
          headerName: "Registration No",
          width: 150,
        },
        { field: "departmentName", headerName: "Department", width: 150 },
        { field: "routeNumber", headerName: "Route No", width: 150 },
        { field: "stopArea", headerName: "Stop Area", width: 150 }
      );
    }

    // Action column with edit and delete buttons
    commonColumns.push({
      field: "actions",
      headerName: "Actions",
      width: 120,
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
    });

    return commonColumns;
  }, [handleEditUser, handleDeleteUser, isMobile]);

  return (
    <Box sx={{ height: "90vh", p: isMobile ? 1 : 3 }}>
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
          placeholder="Search By Name, Email, Contact Number"
          isMobile={isMobile}
        />
      </Box>
      <Typography
        variant="h4"
        sx={{ mb: 2, mt: 2, color: indigo[700], width: "95%" }}
      >
        Manage Users
      </Typography>
      <Paper sx={{ height: 400, width: "90%" }}>
        <DataGrid
          rows={filteredUsers}
          columns={columns}
          initialState={{
            pagination: { paginationModel: { pageSize: 10, page: 0 } },
          }}
          pageSizeOptions={[5, 10]}
          sx={{
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
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle
          sx={{ backgroundColor: indigo[500], color: "#fff", fontSize: "20px" }}
        >
          Update User
        </DialogTitle>
        <UserForm
          selectedUser={selectedUser}
          onFieldChange={(field, value) =>
            setSelectedUser((prev) =>
              prev ? { ...prev, [field]: value } : prev
            )
          }
        />
        <DialogActions sx={{ backgroundColor: indigo[50], p: "10px" }}>
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
