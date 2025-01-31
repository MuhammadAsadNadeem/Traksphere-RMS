import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { indigo } from "@mui/material/colors";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Header from "../../../components/Header";
import { UserResponse } from "../../../types/admin.types";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { fetchUsers } from "../../../store/thunks/adminThunk.ts";

const ManageUser: React.FC = () => {
  const [users, setUsers] = useState<UserResponse[]>();
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<UserResponse | null>(null);
  const [userToDelete, setUserToDelete] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Filter users based on search term
  const filteredUsers = users.filter((user) =>
    user.full_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Columns for DataGrid
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 1, minWidth: 50 },
    {
      field: "full_name",
      headerName: "Full Name",
      flex: 1,
      minWidth: 150,
      cellClassName: "name-column--cell",
    },
    {
      field: "department",
      headerName: "Department",
      flex: 1,
      minWidth: 150,
    },
    {
      field: "registration_number",
      headerName: "Registration No",
      flex: 1,
      minWidth: 150,
    },
    { field: "email", headerName: "Email", flex: 1, minWidth: 150 },
    { field: "gender", headerName: "Gender", flex: 1, minWidth: 100 },
    {
      field: "phone_number",
      headerName: "Contact Number",
      flex: 1,
      minWidth: 150,
    },
    { field: "route_no", headerName: "Route", flex: 1, minWidth: 100 },
    { field: "stop_area", headerName: "Stop Area", flex: 1, minWidth: 150 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      minWidth: isMobile ? 100 : 150,
      renderCell: (params: { row: MockUser }) => (
        <>
          <IconButton
            color="primary"
            onClick={() => handleEditUser(params.row)}
            aria-label="edit"
          >
            <EditIcon />
          </IconButton>
          <IconButton
            color="error"
            onClick={() => handleDeleteUser(params.row.id)}
            aria-label="delete"
          >
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  // Handle Delete User
  const handleDeleteUser = (id: number): void => {
    setUserToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = (): void => {
    if (userToDelete) {
      const updatedUsers = users.filter((user) => user.id !== userToDelete);
      setUsers(updatedUsers);
      setDeleteDialogOpen(false);
    }
  };

  // Handle Edit User
  const handleEditUser = (user: MockUser): void => {
    setSelectedUser(user);
    setOpenDialog(true);
  };

  // Handle Create User
  const handleCreateUser = (): void => {
    setSelectedUser({
      id: users.length + 1, // Generate a unique ID
      full_name: "",
      department: "",
      registration_number: "",
      email: "",
      gender: "",
      phone_number: "",
      route_no: "",
      stop_area: "",
    });
    setOpenDialog(true);
  };

  // Handle Close Dialog
  const handleCloseDialog = (): void => {
    setOpenDialog(false);
    setSelectedUser(null);
  };

  // Handle Update User
  const handleUpdateUser = (): void => {
    if (selectedUser) {
      const updatedUsers = users.map((user) =>
        user.id === selectedUser.id ? selectedUser : user
      );
      setUsers(updatedUsers);
      setOpenDialog(false);
    }
  };

  // Handle Input Change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    if (selectedUser) {
      setSelectedUser((prevState) => ({
        ...prevState!,
        [name]: value,
      }));
    }
  };

  return (
    <Box m="10px">
      <Header title="Manage Users" subtitle="List of All Users" />

      {/* Search Bar */}
      <TextField
        label="Search Users"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ mb: 2 }}
      />

      {/* DataGrid */}
      <Box
        mt="40px"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": { border: "none" },
          "& .MuiDataGrid-cell": { borderBottom: "none" },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: indigo[400],
            borderBottom: "none",
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: indigo[400],
          },
          "& .MuiCheckbox-root": {
            color: `${indigo[400]} !important`,
          },
          "& .MuiDataGrid-row:hover": {
            backgroundColor: indigo[50],
          },
          "& .MuiDataGrid-row:nth-of-type(odd)": {
            backgroundColor: indigo[100],
          },
        }}
      >
        <DataGrid
          rows={filteredUsers}
          columns={columns}
          checkboxSelection
          pagination
          pageSizeOptions={[5, 10, 25]}
        />
      </Box>

      {/* Edit User Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle color={indigo[500]}>
          {selectedUser?.id ? "Edit User" : "Create User"}
          <IconButton
            aria-label="close"
            onClick={handleCloseDialog}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {selectedUser?.id
              ? "Update the user details below."
              : "Enter the details for the new user."}
          </DialogContentText>
          <TextField
            label="Full Name"
            variant="outlined"
            fullWidth
            margin="normal"
            name="full_name"
            value={selectedUser?.full_name || ""}
            onChange={handleInputChange}
          />
          <TextField
            label="Department Name"
            variant="outlined"
            fullWidth
            margin="normal"
            name="department"
            value={selectedUser?.department || ""}
            onChange={handleInputChange}
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            name="email"
            value={selectedUser?.email || ""}
            onChange={handleInputChange}
          />
          <TextField
            label="Contact Number"
            variant="outlined"
            fullWidth
            margin="normal"
            name="phone_number"
            value={selectedUser?.phone_number || ""}
            onChange={handleInputChange}
          />
          <TextField
            label="Route No"
            variant="outlined"
            fullWidth
            margin="normal"
            name="route_no"
            value={selectedUser?.route_no || ""}
            onChange={handleInputChange}
          />
          <TextField
            label="Stop Area"
            variant="outlined"
            fullWidth
            margin="normal"
            name="stop_area"
            value={selectedUser?.stop_area || ""}
            onChange={handleInputChange}
          />
          <TextField
            label="Gender"
            variant="outlined"
            fullWidth
            margin="normal"
            name="gender"
            value={selectedUser?.gender || ""}
            onChange={handleInputChange}
          />
          <TextField
            label="Registration Number"
            variant="outlined"
            fullWidth
            margin="normal"
            name="registration_number"
            value={selectedUser?.registration_number || ""}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleUpdateUser} color="primary">
            {selectedUser?.id ? "Update" : "Create"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this user?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={confirmDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ManageUser;
