import React from "react";
import { TextField, InputAdornment } from "@mui/material";
import { Search } from "@mui/icons-material";
import { grey } from "@mui/material/colors";

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  placeholder?: string;
  isMobile?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  onSearchChange,
  placeholder = "Search...",
  isMobile = false,
}) => (
  <TextField
    value={searchQuery}
    onChange={(e) => onSearchChange(e.target.value)}
    placeholder={placeholder}
    variant="outlined"
    size="small"
    sx={{
      width: isMobile ? "100%" : "300px",
      backgroundColor: "#fff",
      "& .MuiOutlinedInput-root": {
        borderRadius: 2,
        "&:hover fieldset": {
          borderColor: grey[400],
        },
      },
    }}
    InputProps={{
      startAdornment: (
        <InputAdornment position="start">
          <Search sx={{ color: grey[500] }} />
        </InputAdornment>
      ),
    }}
  />
);

export default SearchBar;
