import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { indigo } from "@mui/material/colors";
import { mockDataUsers } from "../data/mockData";
import Header from "../../../components/Header";

const ViewUsers = () => {
  const columns = [
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
  ];

  return (
    <Box m="20px">
      <Header title="Users" subtitle="List of All Users" />
      <Box
        mt="40px"
        height="75vh"
        maxWidth="100%"
        sx={{
          "& .MuiDataGrid-root": { border: "none" },
          "& .MuiDataGrid-cell": { border: "none" },
          "& .name-column--cell": { color: indigo[900] },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: indigo[400],
            borderBottom: "none",
          },
          "& .MuiDataGrid-footerContainer": { backgroundColor: indigo[400] },
          "& .MuiCheckbox-root": { color: `${indigo[400]} !important` },
          "& .MuiDataGrid-iconSeparator": { color: indigo[400] },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${indigo[400]} !important`,
          },
        }}
      >
        <DataGrid
          rows={mockDataUsers}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 10 },
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default ViewUsers;
