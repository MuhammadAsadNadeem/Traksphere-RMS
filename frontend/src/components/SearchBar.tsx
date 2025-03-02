import React from "react";
import { TextField, InputAdornment, useTheme } from "@mui/material";
import { Search } from "@mui/icons-material";

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
}) => {
  const theme = useTheme();

  return (
    <TextField
      fullWidth
      margin="normal"
      variant="outlined"
      placeholder={placeholder}
      value={searchQuery}
      onChange={(e) => onSearchChange(e.target.value)}
      sx={{
        width: isMobile ? "40%" : "20%",
        ml: 2,
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Search sx={{ color: theme.palette.secondary.main }} />
          </InputAdornment>
        ),
      }}
    />
  );
};

export default SearchBar;
