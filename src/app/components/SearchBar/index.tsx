"use client"

import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import SendIcon from '@mui/icons-material/Send';
import { LocalStorageService } from '../../../services/LocalStorageService';

const SearchBar: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleClickSearchToStorageLocal = () => {
    if (inputValue.trim()) {
      LocalStorageService.setRecentDestination(inputValue);
      console.log('Search icon clicked and destination saved');
    }
  };

  return (
    <TextField
      variant="outlined"
      placeholder="Para onde?"
      value={inputValue}
      onChange={handleInputChange}
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
        endAdornment: inputValue && (
          <InputAdornment position="end">
            <div onClick={handleClickSearchToStorageLocal} style={{ cursor: 'pointer' }}>
              <SendIcon style={{ color: "#F8A801", width: "28px" }} />
            </div>
          </InputAdornment>
        )
      }}
      className="w-80"
    />
  );
};

export default SearchBar;