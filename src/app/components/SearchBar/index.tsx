import React from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";

const SearchBar: React.FC = () => {
  return (
    <TextField
      variant="outlined"
      placeholder="Para onde?"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon style={{ color: "#F8A801", width: "28px" }} />
          </InputAdornment>
        ),
        style: {
          backgroundColor: "#1c1c1c",
          color: "white",
          borderRadius: 30,
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)"
        },
      }}
      className="w-80"
    />
  );
};

export default SearchBar;
