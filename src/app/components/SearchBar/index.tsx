"use client"

import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import SendIcon from '@mui/icons-material/Send';
import { LocalStorageService } from '../../../services/LocalStorageService';

interface SearchBarProps {
  inputValue: string;
  setInputValue: (value: string) => void;

}

const SearchBar: React.FC<{ inputValue: string; setInputValue: React.Dispatch<React.SetStateAction<string>> }> = ({ inputValue, setInputValue }) => {


  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleClickSearchToStorageLocal = () => {
    if (inputValue.trim()) {
      // Adiciona o novo destino ao localStorage e garante o limite de 4 itens
      LocalStorageService.setRecentDestination(inputValue.trim());
      setInputValue(""); // Limpa o input após enviar
      console.log('Search icon clicked and destination saved');
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Evita o comportamento padrão do formulário
      handleClickSearchToStorageLocal(); // Chama a função de envio ao pressionar Enter
    }
  };

  return (
    <TextField
      variant="outlined"
      placeholder="Para onde?"
      value={inputValue}
      onChange={handleInputChange}
      onKeyDown={handleKeyDown}
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