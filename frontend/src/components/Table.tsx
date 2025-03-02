import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
  Box,
  TextField,
  Typography,
  Paper,
  InputAdornment,
  SxProps,
  Theme,
  useTheme,
} from "@mui/material";
import { Search } from "@mui/icons-material";

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
  const theme = useTheme();

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
          sx={{
            mb: 2,
            color: theme.palette.secondary[700],
            width: "90%",
            textAlign: "left",
          }}
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
                <Search sx={{ color: theme.palette.secondary[500] }} />
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
                backgroundColor: theme.palette.secondary[50],
                color: theme.palette.secondary[900],
              },
              "& .MuiDataGrid-footerContainer": {
                backgroundColor: theme.palette.secondary[50],
                color: theme.palette.secondary.main,
              },
            }}
          />
        </Paper>
      </Box>
    </Box>
  );
};

export default Table;
