"use client";

import React, { useRef } from "react";
import { LocalStorageService } from "../../../services/LocalStorageService";
import {
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";
import { SearchIcon, ArrowForwardIcon } from "@chakra-ui/icons";

const SearchBar: React.FC<{
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
}> = ({ inputValue, setInputValue }) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleClickSearchToStorageLocal = () => {
    if (inputValue.trim()) {
      // Adiciona o novo destino ao localStorage e garante o limite de 4 itens
      LocalStorageService.setRecentDestination(inputValue.trim());
      setInputValue(""); // Limpa o input após enviar
      console.log("Search icon clicked and destination saved");
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Evita o comportamento padrão do formulário
      handleClickSearchToStorageLocal(); // Chama a função de envio ao pressionar Enter
    }
  };

  return (
    <InputGroup size="md" className="w-80">
      <InputLeftElement
        pointerEvents="none"
        height="100%"
        display="flex"
      >
        <SearchIcon color="#F8A801" w="2rem" h="2rem" pl="0.813rem" />
      </InputLeftElement>
      <Input
        placeholder="Para onde?"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        type="search"
        enterKeyHint="go" 
        bg="#1c1c1c"
        borderRadius="30px"
        boxShadow="0 4px 10px rgba(0, 0, 0, 0.3)"
        pl="3rem"
        className="w-80 h-12"
      />
      {inputValue && (
        <InputRightElement
          width="3rem"
          height="100%"
          display="flex"
        >
          <div
            onClick={handleClickSearchToStorageLocal}
            style={{ cursor: "pointer" }}
          >
            <ArrowForwardIcon color="#F8A801" w="24px" h="24px" />
          </div>
        </InputRightElement>
      )}
    </InputGroup>
  );
};

export default SearchBar;