import React from "react";
import { TextField, InputAdornment, Box } from "@mui/material";
import { Search } from "@mui/icons-material";
import { indigo } from "@mui/material/colors";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
  searchResults: [];
  onSelectResult: (result: any) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  onSearch,
  searchResults,
  onSelectResult,
}) => {
  return (
    <Box sx={{ position: "relative" }}>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search stops..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && onSearch()}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search sx={{ color: indigo[500] }} />
            </InputAdornment>
          ),
        }}
      />
      {searchResults.length > 0 && (
        <Box
          sx={{
            position: "absolute",
            zIndex: 1,
            width: "100%",
            bgcolor: "background.paper",
            boxShadow: 1,
            maxHeight: 200,
            overflowY: "auto",
          }}
        >
          {searchResults.map((result, index) => (
            <Box
              key={index}
              onClick={() => onSelectResult(result)}
              sx={{
                p: 1,
                cursor: "pointer",
                "&:hover": { bgcolor: indigo[50] },
              }}
            >
              {result.display_name}
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default SearchBar;
