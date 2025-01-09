import { Box } from "@mui/material";
import Header from "../../../components/Header";
import { DataGrid } from "@mui/x-data-grid";
import { mockDataDrivers } from "../data/mockData";
import { indigo } from "@mui/material/colors";

const Drivers = () => {
  const columns = [
    { field: "id", headerName: "ID", flex: 0.5, minWidth: 80 },
    {
      field: "name",
      headerName: "Driver Name",
      flex: 1,
      minWidth: 150,
      cellClassName: "name-column--cell",
    },
    { field: "bus_number", headerName: "Bus No", flex: 1, minWidth: 120 },
    { field: "route_number", headerName: "Route", flex: 1, minWidth: 100 },
    { field: "contact_number", headerName: "Contact", flex: 1, minWidth: 120 },
  ];
  return (
    <Box m="20px">
      <Header title="Drivers" subtitle="List of All Drivers" />
      <Box
        mt="40px"
        height="75vh"
        maxWidth="100%"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            border: "none",
          },
          "& .name-column--cell": {
            color: indigo[900],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: indigo[400],
            borderBottom: "none",
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: indigo[500],
          },
          "& .MuiCheckbox-root": {
            color: `${indigo[400]} !important`,
          },
          "& .MuiDataGrid-iconSeparator": {
            color: `${indigo[400]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${indigo[400]} !important`,
          },
        }}
      >
        <DataGrid rows={mockDataDrivers} columns={columns} />
      </Box>
    </Box>
  );
};

export default Drivers;
