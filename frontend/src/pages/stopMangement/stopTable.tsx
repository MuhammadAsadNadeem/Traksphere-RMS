import React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box, IconButton } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { indigo } from "@mui/material/colors";
import { BusStopType } from "../../../types/stop.types";

interface StopTableProps {
  stops: BusStopType[];
  onEdit: (stop: BusStopType) => void;
  onDelete: (id: string) => void;
  onRowClick: (stop: BusStopType) => void;
  isMobile: boolean;
}

const StopTable: React.FC<StopTableProps> = ({
  stops,
  onEdit,
  onDelete,
  onRowClick,
  isMobile,
}) => {
  const columns: GridColDef[] = isMobile
    ? [
        { field: "stopName", headerName: "Stop Name", flex: 1 },
        {
          field: "actions",
          headerName: "Actions",
          renderCell: (params) => (
            <>
              <IconButton onClick={() => onEdit(params.row)}>
                <Edit sx={{ color: indigo[500] }} />
              </IconButton>
              <IconButton onClick={() => onDelete(params.row.id)}>
                <Delete sx={{ color: "red" }} />
              </IconButton>
            </>
          ),
        },
      ]
    : [
        { field: "displayId", headerName: "ID", flex: 0.5 },
        { field: "stopName", headerName: "Stop Name", flex: 1, minWidth: 130 },
        { field: "latitude", headerName: "Latitude", flex: 1 },
        { field: "longitude", headerName: "Longitude", flex: 1 },
        {
          field: "actions",
          headerName: "Actions",
          minWidth: 130,
          renderCell: (params) => (
            <>
              <IconButton onClick={() => onEdit(params.row)}>
                <Edit sx={{ color: indigo[500] }} />
              </IconButton>
              <IconButton onClick={() => onDelete(params.row.id)}>
                <Delete sx={{ color: "red" }} />
              </IconButton>
            </>
          ),
        },
      ];

  return (
    <Box sx={{ flex: 1, height: 500, width: "100%" }}>
      <DataGrid
        rows={stops}
        columns={columns}
        getRowId={(row) => row.id}
        density={isMobile ? "compact" : "standard"}
        pageSizeOptions={[10, 25, 50]}
        onRowClick={(params) => onRowClick(params.row)}
        sx={{
          "& .MuiDataGrid-columnHeader": {
            bgcolor: indigo[50],
            color: indigo[900],
          },
        }}
      />
    </Box>
  );
};

export default StopTable;
