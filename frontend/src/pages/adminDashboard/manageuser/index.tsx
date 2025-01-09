import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import Header from "../../../components/Header";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { mockDataUsers } from "../data/mockData";
import { indigo } from "@mui/material/colors";

interface User {
  id: number;
  full_name: string;
  department: string;
  registration_number: string;
  email: string;
  phone_number: string;
  route_no: number;
  stop_area: string;
  gender: string;
}

const ManageUser: React.FC = () => {
  const [users, setUsers] = useState<User[]>(mockDataUsers);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 0.5, minWidth: 100 },
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
    { field: "gender", headerName: "Gender", flex: 1, minWidth: 150 },

    {
      field: "phone_number",
      headerName: "Phone Number",
      flex: 1,
      minWidth: 150,
    },
    { field: "route_no", headerName: "Route", flex: 0.5, minWidth: 100 },
    { field: "stop_area", headerName: "Stop Area", flex: 1, minWidth: 150 },

    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      minWidth: 200,
      renderCell: (params: { row: User }) => (
        <>
          <Button
            variant="contained"
            color="primary"
            size="small"
            sx={{ marginRight: "5px" }}
            onClick={() => handleEditUser(params.row)}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            color="error"
            size="small"
            sx={{ margin: "5px" }}
            onClick={() => handleDeleteUser(params.row.id)}
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

  const handleDeleteUser = (id: number): void => {
    const updatedUsers = users.filter((user) => user.id !== id);
    setUsers(updatedUsers);
  };

  const handleEditUser = (user: User): void => {
    setSelectedUser(user);
    setOpenDialog(true);
  };

  const handleCloseDialog = (): void => {
    setOpenDialog(false);
    setSelectedUser(null);
  };

  const handleUpdateUser = (): void => {
    if (selectedUser) {
      const updatedUsers = users.map((user) =>
        user.id === selectedUser.id ? selectedUser : user
      );
      setUsers(updatedUsers);
      setOpenDialog(false);
    }
  };

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
      <Header title=" Mange Users" subtitle="List of All Users" />

      <Box
        mt="40px"
        height="85vh"
        maxWidth="100vw"
        sx={{ "& .MuiDataGrid-root": { border: "none" } }}
      >
        <DataGrid
          rows={users}
          columns={columns}
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
            },
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
            "& .MuiDataGrid-iconSeparator": {
              color: indigo[400],
            },
            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
              color: `${indigo[400]} !important`,
            },
          }}
        />
      </Box>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle color={indigo[500]}>Edit User</DialogTitle>
        <DialogContent>
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
            label="Phone Number"
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
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ManageUser;
