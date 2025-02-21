import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
  Box,
  TextField,
  Typography,
  Paper,
  InputAdornment,
  SxProps,
  Theme,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import { indigo } from "@mui/material/colors";

interface TableProps {
  title: string;
  rows: any[];
  columns: GridColDef[];
  searchQuery: string;
  onSearchChange: (query: string) => void;
  sx?: SxProps<Theme>;
  searchPlaceholder?: string;
  height?: number;
}

const Table = ({
  title,
  rows,
  columns,
  searchQuery,
  onSearchChange,
  sx,
  searchPlaceholder = "Search...",
  height = 300,
}: TableProps) => {
  return (
    <Box sx={{ mt: 6, p: 2, ...sx }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Typography
          variant="h4"
          sx={{ mb: 2, color: indigo[700], width: "90%", textAlign: "left" }}
        >
          {title}
        </Typography>
        <TextField
          fullWidth
          margin="normal"
          variant="outlined"
          placeholder={searchPlaceholder}
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          sx={{
            mb: 3,
            mt: 2,
            width: "90%",
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search sx={{ color: indigo[500] }} />
              </InputAdornment>
            ),
          }}
        />
        <Paper
          sx={{
            height: height,
            mt: 3,
            width: "90%",
          }}
        >
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { pageSize: 10, page: 0 },
              },
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
      </Box>
    </Box>
  );
};

export default Table;
