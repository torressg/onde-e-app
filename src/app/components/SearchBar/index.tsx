"use client"

import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";

import SendIconButton from "../SearchBar/sendIcon";
import SearchIconButton from "../SearchBar/searchIcon";

const SearchBar: React.FC = () => {

  const [inputValue, setInputValue] = useState<string>("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <TextField
      variant="outlined"
      placeholder="Para onde?"
      onChange={handleInputChange}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIconButton />
          </InputAdornment>
        ),
        style: {
          backgroundColor: "#1c1c1c",
          color: "white",
          borderRadius: 30,
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)"
        },
        endAdornment: inputValue && (
          <InputAdornment position="end">
            <SendIconButton />
          </InputAdornment>
        )
      }}
      className="w-80"
    />
  );
};

export default SearchBar;